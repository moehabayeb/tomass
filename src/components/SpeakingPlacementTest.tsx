import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Award, 
  Star, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { narration } from '../utils/narration';
import CanvasAvatar from './CanvasAvatar';
import { useGamification } from '@/hooks/useGamification';
import { configureUtterance } from '@/config/voice';
import { processPlacementResults } from './levelPlacementLogic';

interface SpeakingPlacementTestProps {
  onBack: () => void;
  onComplete: (level: string, score: number) => void;
}

// --------- Speaking Test (isolated) ----------
export function SpeakingPlacementTest({ onBack, onComplete }: SpeakingPlacementTestProps) {
  
  // ROUTING/UNLOCK HELPERS (use your existing app context if available)
  function unlockLevel(level: 'A1'|'A2'|'B1') {
    const key = 'unlocks';
    const data = JSON.parse(localStorage.getItem(key) || '{}');
    data[level] = true;
    localStorage.setItem(key, JSON.stringify(data));
  }
  function routeToLevel(level: 'A1'|'A2'|'B1') {
    const map = { A1: {lvl:'A1', mod:1}, A2: {lvl:'A2', mod:51}, B1: {lvl:'B1', mod:101} };
    const t = map[level];
    localStorage.setItem('currentLevel', t.lvl);
    localStorage.setItem('currentModule', String(t.mod));
    localStorage.setItem('userPlacement', JSON.stringify({ level: t.lvl, scores: {}, at: Date.now() }));
    localStorage.setItem('unlockedLevel', t.lvl);
    onComplete(t.lvl, 75);
  }

  // ---------- State + guards ----------
  type TestState = 'idle'|'prompting'|'ready'|'done';
  type MicState = 'idle'|'listening'|'processing'|'graded'|'error'|'done';
  
  const [testState, setTestState] = useState<TestState>('idle');
  const [micState, setMicState] = useState<MicState>('idle');
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<{ transcript: string; durationSec: number; wordsRecognized: number }[]>([]);
  const [result, setResult] = useState<null | {
    grammar: number; vocab: number; pron: number; level: 'A1'|'A2'|'B1'
  }>(null);
  
  // Status messages and transcript
  const [statusMessage, setStatusMessage] = useState('');
  const [transcript, setTranscript] = useState('');
  const [rawTranscript, setRawTranscript] = useState('');
  const [engineTranscript, setEngineTranscript] = useState('');
  const [permissionError, setPermissionError] = useState(false);

  // Feature flags
  const SPEAKING_TEST_RAW_CAPTURE = typeof window !== 'undefined' && 
    (localStorage.getItem('SPEAKING_TEST_RAW_CAPTURE') === 'true' || 
     new URLSearchParams(window.location.search).get('SPEAKING_TEST_RAW_CAPTURE') === 'true');
  
  const SPEAKING_TEST_STRICT_SESSION = typeof window !== 'undefined' && 
    (localStorage.getItem('SPEAKING_TEST_STRICT_SESSION') === 'true' || 
     new URLSearchParams(window.location.search).get('SPEAKING_TEST_STRICT_SESSION') === 'true');

  const runIdRef = useRef<string|null>(null);
  const ttsTimerRef = useRef<number|undefined>(undefined);
  const startTimeRef = useRef<number>(0);
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const retryCountRef = useRef<number>(0);
  const sessionStateRef = useRef<MicState>('idle');
  const debug = window.location.search.includes('sttdebug=1');

  
  function newRunId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
  }
  
  function isStale(id: string) {
    return runIdRef.current !== id;
  }
  
  function clearAllTimers() {
    if (ttsTimerRef.current) clearTimeout(ttsTimerRef.current); 
    ttsTimerRef.current = undefined;
  }
  
  const PROMPTS = useMemo(() => [
    "Tell me your name and where you are from. Speak clearly for about 15 seconds.",
    "Describe your typical weekday. What do you usually do?",
    "Talk about a past event. What did you do last weekend?",
    "What are your goals for learning English this year?"
  ], []);

  function saveAnswer(qIndex: number, transcript: string, durationSec: number) {
    const words = transcript.trim().split(/\s+/).filter(Boolean).length;
    
    if (debug) {
      console.log('[LevelTest] answer:saved', { qIndex, transcript: transcript.substring(0, 50), words, duration: durationSec });
    }
    
    setAnswers(prev => [...prev, { 
      transcript, 
      durationSec, 
      wordsRecognized: words 
    }]);
  }
  
  // Hard reset before starting a question - STRICT SESSION MANAGEMENT
  function hardResetSession() {
    if (debug) console.log('[SpeakingTest] hardResetSession');
    
    // Stop and dispose of any previous recognition/audio session
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore cleanup errors
      }
      recognitionRef.current = null;
    }
    
    // Clear all timers and event listeners
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    // Reset attempt state
    setRawTranscript('');
    setEngineTranscript('');
    setStatusMessage('');
    setPermissionError(false);
    
    // Reset session state
    sessionStateRef.current = 'idle';
    setMicState('idle');
    retryCountRef.current = 0;
    
    if (debug) console.log('[SpeakingTest] session reset complete');
  }

  // Clean up recognition instance (legacy)
  function cleanupRecognition() {
    hardResetSession();
  }
  
  // Handle audio context for TTS conflicts
  async function handleAudioContext(suspend: boolean) {
    try {
      const existingContext = (window as any)._audioCtx;
      if (existingContext) {
        if (suspend && existingContext.state === 'running') {
          await existingContext.suspend();
          if (debug) console.log('[LevelTest] suspended TTS audio context');
        } else if (!suspend && existingContext.state === 'suspended') {
          await existingContext.resume();
          if (debug) console.log('[LevelTest] resumed TTS audio context');
        }
      }
    } catch (error) {
      if (debug) console.warn('[LevelTest] audio context error:', error);
    }
  }

  function showResults() {
    const scored = scorePlacement(answers);
    console.log('[LevelTest] results:', { g: scored.grammar, v: scored.vocab, p: scored.pron, level: scored.level });
    setResult(scored);
    
    // Enhanced placement with new logic
    try {
      processPlacementResults(scored, answers, onComplete);
    } catch (error) {
      console.error('Placement processing failed, using fallback:', error);
      // Fallback to current behavior
      const placement = { level: scored.level, g: scored.grammar, v: scored.vocab, p: scored.pron, date: Date.now() };
      localStorage.setItem('placement', JSON.stringify(placement));
      localStorage.setItem('userPlacement', JSON.stringify({ level: scored.level, scores: scored, at: Date.now() }));
      localStorage.setItem('unlockedLevel', scored.level);
      unlockLevel(scored.level);
      
      // Clear progress
      localStorage.removeItem('speakingTestProgress');
      
      // @ts-ignore
      window.triggerConfetti?.();
      setTimeout(() => routeToLevel(scored.level), 1200);
    }
  }

  // Enhanced TTS with safety guardrails
  async function speakPrompt(text: string) {
    console.log('[LevelTest] speakPrompt:start', text.substring(0, 50) + '...');
    
    const id = newRunId();
    runIdRef.current = id;
    clearAllTimers();
    
    // Always cancel anything in progress
    try { window?.speechSynthesis?.cancel(); } catch {}
    try { narration.cancel(); } catch {}

    setTestState('prompting');              // lock mic visually
    
    console.log('[LevelTest] tts:locked, id:', id);

    // If we have Web Speech TTS, use it with onend
    const hasWebTTS = typeof window !== 'undefined' && 'speechSynthesis' in window;
    if (hasWebTTS) {
      try {
        const utter = new SpeechSynthesisUtterance(text);
        // Configure with consistent Thomas voice settings
        configureUtterance(utter, text);
        utter.onend = () => {
          console.log('[LevelTest] tts:onend');
          if (!isStale(id)) {
            clearAllTimers();
            setTestState('ready');            // UNLOCK the mic
            console.log('[LevelTest] mic:unlocked');
          }
        };
        utter.onerror = () => {
          console.log('[LevelTest] tts:error');
          if (!isStale(id)) {
            clearAllTimers();
            setTestState('ready');
          }
        };
        window.speechSynthesis.speak(utter);
        console.log('[LevelTest] tts:started');
      } catch (err) {
        console.log('[LevelTest] tts:catch-error', err);
        // Fall through to time-based unlock
      }
    } else {
      console.log('[LevelTest] no-web-tts, using narration');
      // If you use a custom narration engine, call it here (non-blocking)
      try { narration.speak(text); } catch {}
    }

    // SAFETY FALLBACK: unlock even if onend never fires (iOS quirks) - 6s maximum
    const ms = Math.min(Math.max(text.length * 45, 1200), 6000); // 1.2s–6s
    console.log('[LevelTest] tts:fallback-timer', ms + 'ms');
    ttsTimerRef.current = window.setTimeout(() => {
      console.log('[LevelTest] tts:timeout-unlock');
      if (!isStale(id)) {
        setTestState('ready');                // UNLOCK the mic
      }
    }, ms);
  }

  // Question change hygiene - hard reset on every question change
  useEffect(() => {
    console.log('[LevelTest] question-changed:', qIndex);
    
    // Hard reset before starting new question
    if (SPEAKING_TEST_STRICT_SESSION) {
      hardResetSession();
    }
    
    const text = PROMPTS[qIndex];
    if (!text) return;
    speakPrompt(text);
    
    // cleanup if user leaves screen
    return () => {
      console.log('[LevelTest] cleanup-question');
      try { window?.speechSynthesis?.cancel(); } catch {}
      try { narration.cancel(); } catch {}
      clearAllTimers();
      if (SPEAKING_TEST_STRICT_SESSION) {
        hardResetSession();
      }
      runIdRef.current = null;
    };
  }, [qIndex, PROMPTS, SPEAKING_TEST_STRICT_SESSION]);

  // Load saved progress on mount
  useEffect(() => {
    const saved = localStorage.getItem('speakingTestProgress');
    if (saved) {
      try {
        const { qIndex: savedQIndex, answers: savedAnswers } = JSON.parse(saved);
        if (savedQIndex < PROMPTS.length) {
          setQIndex(savedQIndex);
          setAnswers(savedAnswers || []);
        }
      } catch {}
    }
  }, [PROMPTS.length]);

  // Save progress whenever it changes
  useEffect(() => {
    if (answers.length > 0 || qIndex > 0) {
      localStorage.setItem('speakingTestProgress', JSON.stringify({
        qIndex,
        answers
      }));
    }
  }, [qIndex, answers]);

  // Mobile/iOS resilience - handle visibility changes
  useEffect(() => {
    if (!SPEAKING_TEST_STRICT_SESSION) return;
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (debug) console.log('[SpeakingTest] app backgrounded, stopping recognition');
        hardResetSession();
      }
    };
    
    const handlePageHide = () => {
      if (debug) console.log('[SpeakingTest] page hiding, stopping recognition');
      hardResetSession();
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, [SPEAKING_TEST_STRICT_SESSION]);

  // Complete cleanup on unmount
  useEffect(() => {
    return () => {
      if (debug) console.log('[LevelTest] component:unmounting');
      try { window?.speechSynthesis?.cancel(); } catch {}
      try { narration.cancel(); } catch {}
      clearAllTimers();
      if (SPEAKING_TEST_STRICT_SESSION) {
        hardResetSession();
      } else {
        cleanupRecognition();
      }
      runIdRef.current = null;
      handleAudioContext(false); // Resume any suspended context
    };
  }, [SPEAKING_TEST_STRICT_SESSION]);

  // Enhanced state logging
  useEffect(() => {
    if (debug) {
      console.log('[LevelTest] state-change:', {testState, qIndex, micState});
    }
  }, [testState, qIndex, micState]);

  // ---------- very light normalization helpers ----------
  function stripDiacritics(s: string) {
    return (s || '')
      .normalize('NFD').replace(/\p{Diacritic}/gu, '')
      .toLowerCase().replace(/[^a-z0-9\s']/g, ' ')
      .replace(/\s+/g, ' ').trim();
  }
  function tokenStats(text: string) {
    const t = stripDiacritics(text).split(' ').filter(Boolean);
    const unique = new Set(t);
    return { tokens: t, uniqueCount: unique.size, length: t.length };
  }

  // ---------- honest scoring (0–10 each) ----------
  function scorePronunciation(wordsRecognized: number, durationSec: number) {
    // proxy for clarity: words/second clamped 0.8–3.0 → 0–10
    const wps = wordsRecognized / Math.max(1, durationSec);
    return Math.round(10 * Math.min(1, Math.max(0, (wps-0.8)/(3.0-0.8))));
  }

  function scoreVocabulary(transcript: string) {
    const tokens = transcript.toLowerCase().replace(/[^a-z\s]/g,'').split(/\s+/).filter(Boolean);
    const stop = new Set(['i','you','he','she','it','we','they','a','the','and','or','but','to','for','of','in','on','at','my','your','his','her','their','is','am','are','was','were','do','did','have','had']);
    const content = tokens.filter(t => !stop.has(t));
    const unique = new Set(content);
    // 0 unique → 0, 12+ unique → 10
    return Math.min(10, Math.round((unique.size/12)*10));
  }

  function scoreGrammar(transcript: string) {
    // crude: count basic structures: subject + verb (past/present) + object/prep
    const t = transcript.toLowerCase();
    const past = /\b(went|did|had|was|were|ate|saw|made|took|said|studied|worked|visited)\b/.test(t);
    const present = /\b(go|do|have|am|is|are|eat|see|make|take|say|study|work|visit)\b/.test(t);
    const pronoun = /\b(i|you|he|she|we|they)\b/.test(t);
    const preps = (t.match(/\b(in|on|at|to|with|from|for|about|because)\b/g)||[]).length;
    let pts = 0;
    if (pronoun) pts += 3;
    if (past || present) pts += 3;
    pts += Math.min(4, preps);        // structure/phrases
    return Math.min(10, pts);
  }

  function decideLevel(g: number, v: number, p: number): 'A1'|'A2'|'B1' {
    const avg = (g+v+p)/3;
    if (avg >= 8) return 'B1';
    if (avg >= 5) return 'A2';
    return 'A1';
  }

  function scorePlacement(allAnswers: {transcript: string; durationSec: number; wordsRecognized: number}[]) {
    const grammarScores = allAnswers.map(a => scoreGrammar(a.transcript));
    const vocabScores = allAnswers.map(a => scoreVocabulary(a.transcript));
    const pronScores = allAnswers.map(a => scorePronunciation(a.wordsRecognized, a.durationSec));

    const grammar = Math.round(grammarScores.reduce((a,b) => a+b, 0) / Math.max(1, grammarScores.length));
    const vocab = Math.round(vocabScores.reduce((a,b) => a+b, 0) / Math.max(1, vocabScores.length));
    const pron = Math.round(pronScores.reduce((a,b) => a+b, 0) / Math.max(1, pronScores.length));
    
    const level = decideLevel(grammar, vocab, pron);
    return { grammar, vocab, pron, level };
  }

  // Telemetry logging (silent in production)
  function logTelemetry(finalState: 'graded' | 'error', rawText: string, durationMs: number, retryCount: number, errorType: string) {
    if (SPEAKING_TEST_STRICT_SESSION) {
      const sanitizedRaw = rawText.substring(0, 60);
      console.log(`[SpeakingTest] q=${qIndex + 1} state=${finalState} raw="${sanitizedRaw}" durMs=${durationMs} retry=${retryCount} err=${errorType || 'none'}`);
    }
  }

  // Handle mic button press - strict session management
  async function onMicPress() {
    if (debug) {
      console.log('[SpeakingTest] mic:press, testState:', testState, 'micState:', micState, 'sessionState:', sessionStateRef.current);
    }
    
    if (testState === 'prompting') {
      if (debug) console.log('[SpeakingTest] mic:override-tts');
      // user wants to start now → cancel TTS and go
      try { window?.speechSynthesis?.cancel(); } catch {}
      try { narration.cancel(); } catch {}
      clearAllTimers();
      setTestState('ready');
      if (debug) console.log('[SpeakingTest] mic:forced-ready');
    }
    
    // Strict session: only allow state transitions in proper order
    if (SPEAKING_TEST_STRICT_SESSION) {
      // Stop listening if currently listening
      if (sessionStateRef.current === 'listening') {
        if (debug) console.log('[SpeakingTest] mic:stop-listening');
        hardResetSession();
        return;
      }

      // Only start if we're in idle state
      if (sessionStateRef.current !== 'idle') {
        if (debug) console.log('[SpeakingTest] mic:not-idle, ignoring. State:', sessionStateRef.current);
        return;
      }

      if (testState !== 'ready') {
        if (debug) console.log('[SpeakingTest] mic:not-ready, ignoring');
        return;
      }
    } else {
      // Legacy behavior
      if (micState === 'listening') {
        if (debug) console.log('[SpeakingTest] mic:stop-listening');
        cleanupRecognition();
        setMicState('idle');
        setStatusMessage('');
        return;
      }

      if (testState !== 'ready' || micState !== 'idle') {
        if (debug) console.log('[SpeakingTest] mic:not-ready, ignoring');
        return;
      }
    }

    if (permissionError) {
      setPermissionError(false);
      setStatusMessage('');
    }

    await startRecording();
  }

  // Start clean recognition with strict session management
  async function startRecording() {
    if (debug) console.log('[SpeakingTest] recording:start, strict:', SPEAKING_TEST_STRICT_SESSION);
    
    // Check for speech recognition support
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      const errorMsg = "Speech recognition not supported";
      setStatusMessage(errorMsg);
      if (SPEAKING_TEST_STRICT_SESSION) {
        sessionStateRef.current = 'error';
        setMicState('error');
        logTelemetry('error', '', 0, 0, 'no_recognition_support');
      }
      return;
    }

    try {
      // State transition: idle → listening
      if (SPEAKING_TEST_STRICT_SESSION) {
        if (sessionStateRef.current !== 'idle') {
          if (debug) console.log('[SpeakingTest] invalid state transition from:', sessionStateRef.current);
          return;
        }
        sessionStateRef.current = 'listening';
      }

      // Initialize audio context on user gesture (iOS requirement)
      if (!audioContextRef.current) {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
          audioContextRef.current = new AudioContext();
          if (audioContextRef.current.state === 'suspended') {
            await audioContextRef.current.resume();
          }
        }
      }

      // Suspend TTS audio context if running
      await handleAudioContext(true);

      // Start clean - ensure no existing recognition
      if (SPEAKING_TEST_STRICT_SESSION) {
        if (recognitionRef.current) {
          try {
            recognitionRef.current.abort();
          } catch (e) {}
          recognitionRef.current = null;
        }
      } else {
        cleanupRecognition();
      }
      
      startTimeRef.current = Date.now();
      setMicState('listening');
      setStatusMessage('Listening...');
      setTranscript('');
      setRawTranscript('');
      setEngineTranscript('');
      setPermissionError(false);

      // Create new recognition instance with fresh listeners
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      
      // Configure recognition with raw capture options
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 5;

      // Clear grammars for clean recognition
      try {
        recognition.grammars = (window as any).webkitSpeechGrammarList?.() || null;
      } catch (e) {}

      // SPEAKING_TEST_RAW_CAPTURE: Disable normalization features
      if (SPEAKING_TEST_RAW_CAPTURE) {
        try {
          // Attempt to disable automatic features (vendor-specific)
          (recognition as any).webkitGrammar = false;
          (recognition as any).webkitSpeechGrammar = false;
          (recognition as any).serviceURI = null;
          // Note: Chrome/Safari don't expose all normalization controls
          // We'll get the most raw transcript available from alternatives
        } catch (e) {
          if (debug) console.log('[SpeakingTest] Raw capture config warnings (expected):', e);
        }
      }

      let hasAudioStarted = false;
      let hasSoundStarted = false;
      let hasSpeechStarted = false;
      let hasResult = false;
      let hasFinal = false;

      // 15 second maximum timeout
      timeoutRef.current = window.setTimeout(() => {
        if (!hasResult && recognitionRef.current && !hasFinal) {
          if (debug) console.log('[SpeakingTest] max timeout reached');
          try {
            recognition.stop();
          } catch (e) {}
        }
      }, 15000);

      // Attach fresh listeners only for this attempt
      recognition.onstart = () => {
        if (debug) console.log('[SpeakingTest] onstart');
      };

      recognition.onaudiostart = () => {
        hasAudioStarted = true;
        if (debug) console.log('[SpeakingTest] onaudiostart');
      };

      recognition.onsoundstart = () => {
        hasSoundStarted = true;
        if (debug) console.log('[SpeakingTest] onsoundstart');
      };

      recognition.onspeechstart = () => {
        hasSpeechStarted = true;
        if (debug) console.log('[SpeakingTest] onspeechstart');
      };

      recognition.onspeechend = () => {
        if (debug) console.log('[LevelTest] onspeechend');
        recognition.stop();
      };

      recognition.onresult = (event) => {
        if (hasResult || hasFinal) return; // Ignore duplicate results
        
        // State transition: listening → processing
        if (SPEAKING_TEST_STRICT_SESSION) {
          if (sessionStateRef.current !== 'listening') {
            if (debug) console.log('[SpeakingTest] ignoring late result, state:', sessionStateRef.current);
            return;
          }
          sessionStateRef.current = 'processing';
        }
        
        hasResult = true;
        const durationMs = Date.now() - startTimeRef.current;

        if (debug) console.log('[SpeakingTest] onresult:', { 
          resultIndex: event.resultIndex,
          results: event.results.length,
          isFinal: event.results[0]?.isFinal,
          transcript: event.results[0]?.[0]?.transcript
        });

        const result = event.results[0];
        if (result && result.isFinal) {
          hasFinal = true;
          if (debug) console.log('[SpeakingTest] final result received');
          
          let transcript = result[0].transcript;
          let rawTranscript = transcript;
          let engineTranscript = transcript;

          // For raw capture, try to get the most unprocessed alternative
          if (SPEAKING_TEST_RAW_CAPTURE && result.length > 1) {
            // Look for alternatives that might be less processed
            for (let i = 0; i < Math.min(result.length, 3); i++) {
              const alt = result[i].transcript;
              // Prefer alternatives with less punctuation/capitalization
              if (alt && (alt.toLowerCase() === alt || alt.indexOf('.') === -1)) {
                rawTranscript = alt;
                break;
              }
            }
          }

          if (debug) console.log('[SpeakingTest] transcripts:', { 
            display: transcript, 
            raw: rawTranscript, 
            engine: engineTranscript 
          });

          const finalTranscript = SPEAKING_TEST_RAW_CAPTURE ? rawTranscript.trim() : transcript.trim();
          
          // Finalization rules: proceed to scoring if we have valid content
          if (finalTranscript.length >= 2) {
            if (SPEAKING_TEST_STRICT_SESSION) {
              sessionStateRef.current = 'graded';
            }
            
            setMicState('processing');
            setStatusMessage('Processing...');
            setTranscript(finalTranscript);
            
            if (SPEAKING_TEST_RAW_CAPTURE) {
              setRawTranscript(rawTranscript);
              setEngineTranscript(engineTranscript);
            }

            // Clean up timers
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }

            // Resume TTS audio context
            handleAudioContext(false);

            const durationSec = durationMs / 1000;
            
            // Telemetry for QA
            logTelemetry('graded', finalTranscript, durationMs, retryCountRef.current, 'none');

            // Save the answer and proceed
            setTimeout(() => {
              saveAnswer(qIndex, finalTranscript, durationSec);
              setMicState('done');
              setStatusMessage('');
              
              // Auto advance after a brief delay
              setTimeout(() => {
                handleContinue();
              }, 800);
            }, 500);
          } else {
            // Short or empty result - trigger retry or show error
            handleNoCapture(durationMs, 'short_result');
          }
        }
      };

      recognition.onnomatch = () => {
        if (debug) console.log('[SpeakingTest] onnomatch');
        const durationMs = Date.now() - startTimeRef.current;
        handleNoCapture(durationMs, 'nomatch');
      };

      recognition.onerror = (event) => {
        if (debug) console.log('[SpeakingTest] onerror:', event.error);
        const durationMs = Date.now() - startTimeRef.current;
        handleSpeechError(event.error, durationMs);
      };

      recognition.onend = () => {
        if (debug) console.log('[SpeakingTest] onend, hasResult:', hasResult, 'hasFinal:', hasFinal);
        
        if (!hasResult && !hasFinal) {
          const durationMs = Date.now() - startTimeRef.current;
          if (debug) console.log('[SpeakingTest] onend without result');
          handleNoCapture(durationMs, 'no_results');
        }
        
        // Clean up recognition reference
        recognitionRef.current = null;
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        
        // Resume TTS audio context
        handleAudioContext(false);
      };

      // Start recognition
      recognition.start();
      if (debug) console.log('[SpeakingTest] recognition started');

    } catch (error) {
      if (debug) console.log('[SpeakingTest] recognition error:', error);
      
      const durationMs = Date.now() - startTimeRef.current;
      
      if (SPEAKING_TEST_STRICT_SESSION) {
        sessionStateRef.current = 'error';
      }
      setMicState('idle');
      
      if (error.name === 'NotAllowedError') {
        setPermissionError(true);
        setStatusMessage("Microphone access denied. Please allow microphone access and try again.");
        logTelemetry('error', '', durationMs, retryCountRef.current, 'not-allowed');
      } else {
        setStatusMessage("Could not start speech recognition. Please try again.");
        logTelemetry('error', '', durationMs, retryCountRef.current, 'start_error');
      }
      
      // Resume TTS audio context
      handleAudioContext(false);
    }
  }

  // Watchdog + one safe retry for no capture
  function handleNoCapture(durationMs: number, errorType: string) {
    if (debug) console.log('[SpeakingTest] handleNoCapture:', errorType, 'duration:', durationMs, 'retry:', retryCountRef.current);
    
    // Clean up timers
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    // Resume TTS audio context
    handleAudioContext(false);
    
    // Treat as no capture only if very short audio or specific errors
    const isNoCapture = durationMs < 600 || ['no-speech', 'nomatch', 'no_results'].includes(errorType);
    
    if (isNoCapture && retryCountRef.current === 0 && SPEAKING_TEST_STRICT_SESSION) {
      // One safe retry
      if (debug) console.log('[SpeakingTest] attempting retry');
      retryCountRef.current = 1;
      sessionStateRef.current = 'idle'; // Reset for retry
      setStatusMessage('Retrying...');
      
      // Brief delay before retry
      setTimeout(() => {
        startRecording();
      }, 500);
    } else {
      // Show error after retry fails or on first attempt if not strict
      if (SPEAKING_TEST_STRICT_SESSION) {
        sessionStateRef.current = 'error';
      }
      setMicState('idle');
      
      if (isNoCapture) {
        setStatusMessage("Didn't catch that—try again");
      } else {
        setStatusMessage("Please speak more clearly and try again");
      }
      
      logTelemetry('error', '', durationMs, retryCountRef.current, errorType);
    }
  }

  // Handle speech recognition errors (hard errors)
  function handleSpeechError(errorType: string, durationMs: number) {
    if (debug) console.log('[SpeakingTest] handleSpeechError:', errorType, 'duration:', durationMs);
    
    // Clean up timers
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    if (SPEAKING_TEST_STRICT_SESSION) {
      sessionStateRef.current = 'error';
    }
    setMicState('idle');
    
    // Resume TTS audio context immediately
    handleAudioContext(false);
    
    // Handle different error types
    switch (errorType) {
      case 'not-allowed':
        setPermissionError(true);
        setStatusMessage("Microphone access denied. Please allow microphone access and try again.");
        break;
      case 'network':
        setStatusMessage("Network error. Please check your connection and try again.");
        break;
      case 'audio-capture':
        setStatusMessage("Could not capture audio. Please check your microphone and try again.");
        break;
      default:
        setStatusMessage("Speech recognition error. Please try again.");
    }
    
    logTelemetry('error', '', durationMs, retryCountRef.current, errorType);
  }

  // Continue to next question
  function handleContinue() {
    if (!transcript) return;
    
    const duration = (Date.now() - startTimeRef.current) / 1000;
    saveAnswer(qIndex, transcript, duration);
    
    // Reset mic state
    setMicState('idle');
    setStatusMessage('');
    setTranscript('');
    
    // Clear raw capture states when feature flag is enabled
    if (SPEAKING_TEST_RAW_CAPTURE) {
      setRawTranscript('');
      setEngineTranscript('');
    }
    
    // Move to next question or show results  
    if (qIndex < PROMPTS.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      showResults();
    }
  }

  // ---------- UI ----------
  const progressPercentage = ((qIndex + 1) / PROMPTS.length) * 100;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 pt-safe">
      {/* Header with Progress */}
      <div className="p-4 bg-black/10">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <CanvasAvatar className="w-12 h-12" />
            <div>
              <Badge variant="outline" className="text-white border-white/30 bg-white/10">
                Level Test
              </Badge>
              <div className="text-white/70 text-sm mt-1">
                Question {qIndex + 1} of {PROMPTS.length}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-white/70 text-sm">
              {Math.round(progressPercentage)}% Complete
            </div>
            <Progress value={progressPercentage} className="w-24" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 max-w-2xl mx-auto" style={{ position: 'relative', zIndex: 3 }}>
        {!result ? (
          <Card key={qIndex} className="bg-white/10 border-white/20 backdrop-blur-sm mt-8">
            <CardHeader>
              <CardTitle className="text-white text-center">
                Speaking Prompt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white/5 rounded-xl p-6">
                <p className="text-white text-lg font-medium text-center leading-relaxed">
                  "{PROMPTS[qIndex]}"
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <Button
                  onClick={onMicPress}
                  disabled={testState === 'prompting' || micState === 'processing'}
                  size="lg"
                  className={`
                    relative h-24 w-24 rounded-full transition-all duration-300
                    ${micState === 'listening' 
                      ? 'bg-red-500 hover:bg-red-600 ring-4 ring-red-200 animate-pulse' 
                      : testState === 'prompting' 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : micState === 'processing'
                          ? 'bg-yellow-500 cursor-not-allowed'
                          : 'bg-blue-500 hover:bg-blue-600'
                    }
                  `}
                >
                  {micState === 'listening' ? (
                    <MicOff className="h-8 w-8 text-white" />
                  ) : testState === 'prompting' ? (
                    <Volume2 className="h-8 w-8 text-white animate-pulse" />
                  ) : micState === 'processing' ? (
                    <div className="h-8 w-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Mic className="h-8 w-8 text-white" />
                  )}
                </Button>
                
                {/* Single status chip */}
                <div className="text-center min-h-[1.5rem]">
                  {permissionError ? (
                    <div className="text-center">
                      <div className="text-red-300 text-sm mb-2">{statusMessage}</div>
                      <Button 
                        onClick={onMicPress} 
                        size="sm" 
                        variant="outline" 
                        className="text-white border-white/30 hover:bg-white/10"
                      >
                        Retry
                      </Button>
                    </div>
                  ) : statusMessage ? (
                    <div className="text-white/80 text-sm">{statusMessage}</div>
                  ) : testState === 'prompting' ? (
                    <div className="text-white/80 text-sm">Reading question...</div>
                  ) : testState === 'ready' && micState === 'idle' ? (
                    <div className="text-white/80 text-sm">Tap to start</div>
                  ) : null}
                </div>
                
                {/* Continue button when we have a transcript */}
                {micState === 'done' && transcript && (
                  <Button
                    onClick={handleContinue}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2"
                  >
                    Continue
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <ResultCard res={result} onStartLevel={() => routeToLevel(result.level)} />
        )}
      </div>
    </div>
  );
}

function ResultCard({ res, onStartLevel }: { 
  res: {grammar:number; vocab:number; pron:number; level:'A1'|'A2'|'B1'}; 
  onStartLevel: () => void;
}) {
  return (
    <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white text-center flex items-center justify-center space-x-2">
          <Award className="h-6 w-6" />
          <span>Placement Complete!</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="mb-4">
            <Badge variant="secondary" className="text-2xl px-4 py-2 bg-white/20 text-white border-white/30">
              Level {res.level}
            </Badge>
          </div>
          
          <div className="space-y-3 mb-6">
            <Meter label="Grammar" value={res.grammar} />
            <Meter label="Vocabulary" value={res.vocab} />
            <Meter label="Pronunciation" value={res.pron} />
          </div>
          
          <p className="text-white/80 mb-6">
            Great! We'll take you to the best starting module for {res.level}.
          </p>
          
          <Button 
            onClick={onStartLevel}
            size="lg"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            Start {res.level} Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Meter({label, value}:{label:string; value:number}) {
  return (
    <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
      <span className="text-white/80 font-medium">{label}</span>
      <div className="flex items-center space-x-3">
        <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-500"
            style={{width: `${value*10}%`}} 
          />
        </div>
        <span className="text-white font-semibold min-w-[3rem]">{value}/10</span>
      </div>
    </div>
  );
}