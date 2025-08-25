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
  type MicState = 'idle'|'listening'|'processing'|'done';
  
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
  const [permissionError, setPermissionError] = useState(false);

  const runIdRef = useRef<string|null>(null);
  const ttsTimerRef = useRef<number|undefined>(undefined);
  const startTimeRef = useRef<number>(0);
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
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
  
  // Clean up recognition instance
  function cleanupRecognition() {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        if (debug) console.log('[LevelTest] cleanup error:', e);
      }
      recognitionRef.current = null;
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
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
    import('./levelPlacementLogic').then(({ processPlacementResults }) => {
      processPlacementResults(scored, answers, onComplete);
    }).catch(error => {
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
    });
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

  // Call speakPrompt(promptText) when you load each question
  useEffect(() => {
    console.log('[LevelTest] question-changed:', qIndex);
    const text = PROMPTS[qIndex];
    if (!text) return;
    speakPrompt(text);
    // cleanup if user leaves screen
    return () => {
      console.log('[LevelTest] cleanup-question');
      try { window?.speechSynthesis?.cancel(); } catch {}
      try { narration.cancel(); } catch {}
      clearAllTimers();
      runIdRef.current = null;
    };
  }, [qIndex, PROMPTS]);

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

  // Complete cleanup on unmount
  useEffect(() => {
    return () => {
      if (debug) console.log('[LevelTest] component:unmounting');
      try { window?.speechSynthesis?.cancel(); } catch {}
      try { narration.cancel(); } catch {}
      clearAllTimers();
      cleanupRecognition();
      runIdRef.current = null;
      handleAudioContext(false); // Resume any suspended context
    };
  }, []);

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

  // Handle mic button press
  async function onMicPress() {
    if (debug) {
      console.log('[LevelTest] mic:press, testState:', testState, 'micState:', micState);
    }
    
    if (testState === 'prompting') {
      if (debug) console.log('[LevelTest] mic:override-tts');
      // user wants to start now → cancel TTS and go
      try { window?.speechSynthesis?.cancel(); } catch {}
      try { narration.cancel(); } catch {}
      clearAllTimers();
      setTestState('ready');
      if (debug) console.log('[LevelTest] mic:forced-ready');
    }
    
    // Stop listening if currently listening
    if (micState === 'listening') {
      if (debug) console.log('[LevelTest] mic:stop-listening');
      cleanupRecognition();
      setMicState('idle');
      setStatusMessage('');
      return;
    }

    if (testState !== 'ready' || micState !== 'idle') {
      if (debug) console.log('[LevelTest] mic:not-ready, ignoring');
      return;
    }

    if (permissionError) {
      setPermissionError(false);
      setStatusMessage('');
    }

    await startRecording();
  }

  // Bulletproof speech recognition
  async function startRecording() {
    if (debug) console.log('[LevelTest] recording:start');
    
    // Check for speech recognition support
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      setStatusMessage("Speech recognition not supported");
      return;
    }

    try {
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

      // Clean up any existing recognition
      cleanupRecognition();
      
      startTimeRef.current = Date.now();
      setMicState('listening');
      setStatusMessage('Listening...');
      setTranscript('');
      setPermissionError(false);

      // Create new recognition instance
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 5;

      let hasAudioStarted = false;
      let hasSoundStarted = false;
      let hasSpeechStarted = false;
      let hasResult = false;

      // 15 second timeout
      timeoutRef.current = window.setTimeout(() => {
        if (!hasResult && recognitionRef.current) {
          if (debug) console.log('[LevelTest] timeout reached');
          recognition.stop();
        }
      }, 15000);

      recognition.onstart = () => {
        if (debug) console.log('[LevelTest] onstart');
      };

      recognition.onaudiostart = () => {
        hasAudioStarted = true;
        if (debug) console.log('[LevelTest] onaudiostart');
      };

      recognition.onsoundstart = () => {
        hasSoundStarted = true;
        if (debug) console.log('[LevelTest] onsoundstart');
      };

      recognition.onspeechstart = () => {
        hasSpeechStarted = true;
        if (debug) console.log('[LevelTest] onspeechstart');
      };

      recognition.onspeechend = () => {
        if (debug) console.log('[LevelTest] onspeechend');
        recognition.stop();
      };

      recognition.onresult = (event: any) => {
        if (hasResult) return;
        hasResult = true;

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }

        if (debug) console.log('[LevelTest] onresult:', event.results);

        try {
          const results = event.results[0];
          let bestTranscript = '';
          let bestConfidence = 0;

          // Find highest confidence alternative
          for (let i = 0; i < results.length; i++) {
            const alternative = results[i];
            if (alternative.confidence > bestConfidence) {
              bestTranscript = alternative.transcript;
              bestConfidence = alternative.confidence;
            }
          }

          // Use first result if no confidence scores
          if (!bestTranscript && results.length > 0) {
            bestTranscript = results[0].transcript;
          }

          bestTranscript = bestTranscript.trim();
          
          if (debug) {
            console.log('[LevelTest] best result:', { transcript: bestTranscript, confidence: bestConfidence });
          }

          if (bestTranscript) {
            setMicState('done');
            setTranscript(bestTranscript);
            setStatusMessage(`Recognized: "${bestTranscript}"`);
          } else {
            setMicState('idle');
            setStatusMessage("Didn't catch that—try again");
          }

        } catch (error) {
          if (debug) console.error('[LevelTest] result processing error:', error);
          setMicState('idle');
          setStatusMessage("Didn't catch that—try again");
        }

        handleAudioContext(false); // Resume TTS context
      };

      recognition.onerror = (event: any) => {
        if (hasResult) return;

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }

        if (debug) console.log('[LevelTest] onerror:', event.error);

        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          setPermissionError(true);
          setStatusMessage('Microphone blocked. Tap the address bar → Allow mic.');
        } else if (event.error === 'no-speech') {
          setStatusMessage("Didn't catch that—try again");
        } else {
          setStatusMessage("Didn't catch that—try again");
        }

        setMicState('idle');
        handleAudioContext(false); // Resume TTS context
      };

      recognition.onend = () => {
        if (debug) console.log('[LevelTest] onend, hasResult:', hasResult);

        if (!hasResult) {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }

          // Only show "no speech detected" if truly silent
          if (!hasAudioStarted && !hasSoundStarted) {
            setStatusMessage("Didn't catch that—try again");
          } else {
            setStatusMessage("Didn't catch that—try again");
          }

          setMicState('idle');
        }

        recognitionRef.current = null;
        handleAudioContext(false); // Resume TTS context
      };

      // Start recognition
      recognition.start();

    } catch (error: any) {
      if (debug) console.error('[LevelTest] setup error:', error);
      
      if (error.name === 'NotAllowedError') {
        setPermissionError(true);
        setStatusMessage('Microphone blocked. Tap the address bar → Allow mic.');
      } else {
        setStatusMessage("Didn't catch that—try again");
      }
      
      setMicState('idle');
      handleAudioContext(false); // Resume TTS context
    }
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