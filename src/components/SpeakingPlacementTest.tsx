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
  CheckCircle
} from 'lucide-react';
import { narration } from '../utils/narration';
import CanvasAvatar from './CanvasAvatar';
import { useGamification } from '@/hooks/useGamification';
import { configureUtterance } from '@/config/voice';

// Extend Window interface for audio context and speech recognition
declare global {
  interface Window {
    _audioCtx?: AudioContext;
    webkitAudioContext?: typeof AudioContext;
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

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
  type TestState = 'idle'|'prompting'|'initializing'|'ready'|'recording'|'processing'|'done';
  const [testState, setTestState] = useState<TestState>('idle');
  const [qIndex, setQIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState<number>(15);
  const [error, setError] = useState<string>('');
  const [retryCount, setRetryCount] = useState(0);
  const [answers, setAnswers] = useState<{ transcript: string; durationSec: number; wordsRecognized: number }[]>([]);
  const [result, setResult] = useState<null | {
    grammar: number; vocab: number; pron: number; level: 'A1'|'A2'|'B1'
  }>(null);

  const runIdRef = useRef<string|null>(null);
  const timerRef = useRef<number|undefined>(undefined);
  const retryTimerRef = useRef<number|undefined>(undefined);
  const ttsTimerRef = useRef<number|undefined>(undefined);
  const lastPromptRef = useRef<number>(-1);
  const abortRef = useRef<AbortController|null>(null);
  const recognizerRef = useRef<any>(null);
  const startTimeRef = useRef<number>(0);
  
  // ---- helpers (put near other hooks) ----
  const audioCtxRef = useRef<AudioContext | null>(null);
  const srcRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  // ---- TTS gating (prevents stuck disabled mic) ----
  const ttsRunRef = useRef<string | null>(null);

  // Constants with exact guardrails
  const MAX_SECONDS = 15;
  const INITIAL_SILENCE_MS = 4500;
  const SILENCE_TIMEOUT_MS = 2000;
  const INIT_DELAY_MS = 600;
  const MAX_RETRIES = 2;
  const RETRY_DELAYS = [400, 800];
  
  function newRunId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
  }
  
  function isStale(id: string) {
    return runIdRef.current !== id;
  }
  
  function clearAllTimers() {
    if (timerRef.current) clearInterval(timerRef.current); 
    timerRef.current = undefined;
    if (retryTimerRef.current) clearTimeout(retryTimerRef.current); 
    retryTimerRef.current = undefined;
    if (ttsTimerRef.current) clearTimeout(ttsTimerRef.current); 
    ttsTimerRef.current = undefined;
  }
  
  const PROMPTS = useMemo(() => [
    "Tell me your name and where you are from. Speak clearly for about 15 seconds.",
    "Describe your typical weekday. What do you usually do?",
    "Talk about a past event. What did you do last weekend?",
    "What are your goals for learning English this year?"
  ], []);

  function saveAnswer(qIndex: number, transcript: string) {
    const words = transcript.trim().split(/\s+/).filter(Boolean).length;
    const duration = (Date.now() - startTimeRef.current) / 1000;
    
    console.log('[LevelTest] answer:saved', { qIndex, transcript: transcript.substring(0, 50), words, duration });
    
    setAnswers(prev => [...prev, { 
      transcript, 
      durationSec: duration, 
      wordsRecognized: words 
    }]);
  }

  function showResults() {
    const scored = scorePlacement(answers);
    console.log('[LevelTest] results:', { g: scored.grammar, v: scored.vocab, p: scored.pron, level: scored.level });
    setResult(scored);
    
    // Save results and unlock
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
    ttsRunRef.current = id;
    
    console.log('[LevelTest] tts:locked, id:', id);

    // If we have Web Speech TTS, use it with onend
    const hasWebTTS = typeof window !== 'undefined' && 'speechSynthesis' in window;
    if (hasWebTTS) {
      try {
        const utter = new SpeechSynthesisUtterance(text);
        // Configure with consistent Thomas voice settings
        configureUtterance(utter, text);
        utter.onend = () => {
          console.log('[LevelTest] tts:onend, current:', ttsRunRef.current, 'my:', id);
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
    setRetryCount(0); // Reset retry count for new question
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
      ttsRunRef.current = null;
    };
  }, [qIndex]);

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

  function stopStream(stream?: MediaStream | null) {
    if (!stream) return;
    try { stream.getTracks().forEach(t => t.stop()); } catch {}
  }
  async function ensureAudioContext() {
    const Ctx: any = window.AudioContext || (window as any).webkitAudioContext;
    if (!Ctx) return null;
    if (!audioCtxRef.current) audioCtxRef.current = new Ctx();
    if (audioCtxRef.current.state === 'suspended') {
      try { await audioCtxRef.current.resume(); } catch {}
    }
    return audioCtxRef.current;
  }
  function attachStreamToContext(stream: MediaStream) {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    // Detach old
    try { gainRef.current?.disconnect(); } catch {}
    try { srcRef.current?.disconnect(); } catch {}
    // Attach new (silent path keeps input "alive" on iOS)
    srcRef.current = ctx.createMediaStreamSource(stream);
    gainRef.current = ctx.createGain();
    gainRef.current.gain.value = 0.0;
    srcRef.current.connect(gainRef.current);
    gainRef.current.connect(ctx.destination);
  }

  // Clean up when page is hidden (user switches app/tab)
  useEffect(() => {
    function handleHide() {
      try { abortRef.current?.abort(); } catch {}
      // stopStream(); // Remove this old call
    }
    function onVis() { if (document.hidden) handleHide(); }
    document.addEventListener('visibilitychange', onVis);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      handleHide();
    };
  }, []);

  // Complete cleanup on unmount
  useEffect(() => {
    return () => {
      console.log('[LevelTest] component:unmounting');
      try { abortRef.current?.abort(); } catch {}
      try { 
        streamRef.current?.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      } catch {}
      try { 
        gainRef.current?.disconnect();
        srcRef.current?.disconnect();
      } catch {}
      try { 
        if (audioCtxRef.current?.state !== 'closed') {
          audioCtxRef.current?.close();
        }
      } catch {}
      audioCtxRef.current = null;
      srcRef.current = null;
      gainRef.current = null;
      try { window?.speechSynthesis?.cancel(); } catch {}
      try { narration.cancel(); } catch {}
      clearAllTimers();
      runIdRef.current = null;
      ttsRunRef.current = null;
    };
  }, []);

  // Enhanced state logging
  useEffect(() => {
    console.log('[LevelTest] state-change:', {state: testState, qIndex, retryCount});
  }, [testState, qIndex, retryCount]);

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

  // Simple start/stop recording flow
  async function onMicPress() {
    console.log('[LevelTest] mic:press, state:', testState);
    
    if (testState === 'prompting') {
      console.log('[LevelTest] mic:override-tts');
      // user wants to start now → cancel TTS and go
      try { window?.speechSynthesis?.cancel(); } catch {}
      try { narration.cancel(); } catch {}
      clearAllTimers();
      ttsRunRef.current = null;
      setTestState('ready');
      console.log('[LevelTest] mic:forced-ready');
    }
    
    // tap-to-stop if already recording
    if (testState === 'recording') {
      console.log('[LevelTest] mic:stop-recording');
      try { abortRef.current?.abort(); } catch {}
      return;
    }

    if (testState !== 'ready') {
      console.log('[LevelTest] mic:not-ready, ignoring, state:', testState);
      return;
    }

    await startRecording();
  }

  // Start recording function with simple flow
  async function startRecording() {
    const id = newRunId();
    runIdRef.current = id;
    clearAllTimers();

    try {
      console.log('[LevelTest] recording:start');
      
      // Cancel any TTS that might block mic on iOS
      try { window?.speechSynthesis?.cancel(); } catch {}
      try { narration.cancel(); } catch {}

      setError('');
      setTestState('initializing');

      // iOS requirement: resume/create audio context on user gesture
      await ensureAudioContext();
      console.log('[LevelTest] audio-context:ready');

      // iOS Safari compatibility delay
      await new Promise(resolve => setTimeout(resolve, INIT_DELAY_MS));

      // Request mic permission
      console.log('[LevelTest] mic:requesting-permission');
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        }
      });
      
      if (!stream || !stream.getTracks().length) {
        throw new Error('NoAudioStream');
      }
      console.log('[LevelTest] mic:permission-granted');

      // Keep stream "hot" on iOS
      attachStreamToContext(stream);
      streamRef.current = stream;

      // Start recording state with countdown timer
      setTestState('recording');
      abortRef.current = new AbortController();
      
      startTimeRef.current = Date.now();
      setSecondsLeft(MAX_SECONDS);
      
      // Smooth countdown timer
      timerRef.current = window.setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const left = Math.max(0, MAX_SECONDS - elapsed);
        setSecondsLeft(left);
        
        if (left === 0) {
          console.log('[LevelTest] timer:expired, stopping recording');
          abortRef.current?.abort();
        }
      }, 100); // update 10x/sec for smooth countdown
      
      console.log('[LevelTest] recording:started');

      // Start ASR
      let transcript = '';
      try {
        transcript = await startASR({
          signal: abortRef.current.signal,
          maxSeconds: MAX_SECONDS,
          stream
        });
      } catch (err: any) {
        if (err?.message?.includes('Aborted')) {
          // User stopped recording or timer expired
          transcript = '';
        } else if (err?.message?.includes('no-speech') || err?.message?.includes('No speech detected')) {
          setError('No speech detected. Please try again.');
          setTestState('ready');
          setRetryCount(0);
          clearAllTimers();
          stopStream(stream);
          return;
        } else {
          // Other errors - allow retry
          if (retryCount < MAX_RETRIES) {
            const delay = RETRY_DELAYS[retryCount] || 800;
            setRetryCount(prev => prev + 1);
            setError(`Recording failed. Retrying in ${delay/1000}s...`);
            setTestState('ready');
            clearAllTimers();
            stopStream(stream);
            
            retryTimerRef.current = window.setTimeout(() => {
              if (!isStale(id)) {
                startRecording();
              }
            }, delay);
            return;
          } else {
            setError('Recording failed. Please try again.');
            setTestState('ready');
            setRetryCount(0);
            clearAllTimers();
            stopStream(stream);
            return;
          }
        }
      }

      // Always finalize with whatever transcript we captured
      clearAllTimers();
      stopStream(stream);
      setTestState('processing');
      
      // Show what was recognized to the user
      if (transcript.trim()) {
        console.log('[LevelTest] transcript captured:', transcript);
      } else {
        console.log('[LevelTest] no speech captured');
      }
      
      saveAnswer(qIndex, transcript);
      
      // Brief processing display, then advance
      setTimeout(() => {
        if (qIndex < PROMPTS.length - 1) {
          setQIndex(q => q + 1);
          setTestState('idle');
          setRetryCount(0);
        } else {
          showResults();
          setTestState('done');
        }
      }, 1000);

    } catch (err: any) {
      console.log('[LevelTest] recording:error', err?.name || err?.message);
      
      clearAllTimers();
      if (streamRef.current) {
        stopStream(streamRef.current);
      }
      
      if (err?.name === 'NotAllowedError' || err?.message?.includes('denied')) {
        setError('Microphone access denied. Please allow microphone access and try again.');
      } else {
        setError('Recording failed. Please try again.');
      }
      
      setTestState('ready');
      setRetryCount(0);
    } finally {
      abortRef.current = null;
    }
  }


  // Enhanced ASR with comprehensive audio flow detection and logging
  async function startASR({ signal, maxSeconds, stream }: {
    signal: AbortSignal;
    maxSeconds: number;
    stream?: MediaStream;
  }): Promise<string> {
    console.log('[LevelTest] asr:start');
    
    return new Promise((resolve, reject) => {
      // Use only webkitSpeechRecognition for reliability
      const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      if (!SR) {
        console.log('[LevelTest] asr:error - webkitSpeechRecognition not supported');
        reject(new Error('Speech recognition not supported'));
        return;
      }

      const rec = new SR();
      rec.lang = 'en-US';
      rec.continuous = true;
      rec.interimResults = true;
      rec.maxAlternatives = 1;
      recognizerRef.current = rec;

      let silenceTimer: NodeJS.Timeout;
      let maxTimer: NodeJS.Timeout;
      let speechStartTimer: NodeJS.Timeout;
      let finalTranscript = '';
      let isFinished = false;
      let audioDetected = false;
      let speechDetected = false;

      function cleanup() {
        clearTimeout(silenceTimer);
        clearTimeout(maxTimer);
        clearTimeout(speechStartTimer);
        recognizerRef.current = null;
      }

      function finishRecognition(transcript: string, reason: string) {
        if (isFinished) return;
        isFinished = true;
        cleanup();
        console.log('[LevelTest] asr:finish', { transcript, reason, audioDetected, speechDetected });
        resolve(transcript);
      }

      // Max time limit - stop ASR and use whatever transcript we have
      maxTimer = setTimeout(() => {
        console.log('[LevelTest] asr:timeout, final:', finalTranscript, 'audio:', audioDetected, 'speech:', speechDetected);
        try { rec.stop(); } catch {}
        if (!isFinished) {
          // Use whatever transcript we captured, even if partial
          const transcript = finalTranscript.trim();
          finishRecognition(transcript, 'timeout');
        }
      }, maxSeconds * 1000);

      // Signal abort
      signal.addEventListener('abort', () => {
        console.log('[LevelTest] asr:abort');
        try { rec.stop(); } catch {}
        if (!isFinished) {
          cleanup();
          reject(new Error('Aborted'));
        }
      }, { once: true });

      // Comprehensive event logging to detect audio flow issues
      rec.onstart = () => {
        console.log('[LevelTest] asr:onstart - recognition started');
        
        // If no speech detected after 5s, treat as no-speech (not mic error)
        speechStartTimer = setTimeout(() => {
          if (!speechDetected && !isFinished) {
            console.log('[LevelTest] asr:no-speech-detected - ASR running but no speech heard');
            try { rec.stop(); } catch {}
            finishRecognition('', 'no-speech');
          }
        }, 5000);
      };

      rec.onsoundstart = () => {
        console.log('[LevelTest] asr:onsoundstart - audio detected');
        audioDetected = true;
      };

      rec.onspeechstart = () => {
        console.log('[LevelTest] asr:onspeechstart - speech detected');
        speechDetected = true;
        clearTimeout(speechStartTimer); // Cancel no-speech timeout
      };

      rec.onaudioend = () => {
        console.log('[LevelTest] asr:onaudioend - audio ended');
      };

      rec.onspeechend = () => {
        console.log('[LevelTest] asr:onspeechend - speech ended');
      };

      rec.onresult = (event: any) => {
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
            console.log('[LevelTest] asr:final-result-chunk:', transcript);
          } else {
            interimTranscript += transcript;
          }
        }

        const fullTranscript = (finalTranscript + interimTranscript).trim();
        console.log('[LevelTest] asr:transcript-update:', fullTranscript);
        
        // Reset silence timer on any speech
        if (fullTranscript) {
          clearTimeout(silenceTimer);
          silenceTimer = setTimeout(() => {
            if (!isFinished && finalTranscript.trim()) {
              console.log('[LevelTest] asr:silence-finish:', finalTranscript);
              try { rec.stop(); } catch {}
              finishRecognition(finalTranscript.trim(), 'silence');
            }
           }, SILENCE_TIMEOUT_MS);
        }
      };

      rec.onerror = (event: any) => {
        console.log('[LevelTest] asr:onerror:', event.error, 'audio:', audioDetected, 'speech:', speechDetected);
        if (!isFinished) {
          cleanup();
          reject(new Error(`Recognition error: ${event.error}`));
        }
      };

      rec.onend = () => {
        console.log('[LevelTest] asr:onend, final:', finalTranscript, 'audio:', audioDetected, 'speech:', speechDetected);
        if (!isFinished) {
          // Always use whatever transcript we have, even if short
          const transcript = finalTranscript.trim();
          finishRecognition(transcript, 'ended');
        }
      };

      try {
        // Ensure audio context is active and cancel any TTS before starting
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
        
        // Resume audio context if suspended (critical for iOS)
        if (audioCtxRef.current?.state === 'suspended') {
          audioCtxRef.current.resume().catch(e => console.log('[LevelTest] audio-context-resume-error:', e));
        }

        console.log('[LevelTest] asr:starting-recognition');
        rec.start();
      } catch (err) {
        console.log('[LevelTest] asr:start-error:', err);
        cleanup();
        reject(err);
      }
    });
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
              
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-center">
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}
              
              <div className="text-center relative">
                {/* Circular progress ring */}
                {testState === 'recording' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="rgb(239,68,68)"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray={283}
                        strokeDashoffset={283 * (1 - (secondsLeft / MAX_SECONDS))}
                        className="transition-all duration-1000 ease-linear"
                      />
                    </svg>
                  </div>
                )}
                
                <Button
                  onClick={onMicPress}
                  disabled={testState === 'processing' || testState === 'initializing'}
                  aria-disabled={testState === 'processing' || testState === 'initializing'}
                  size="lg"
                  className={`mic-button rounded-full w-20 h-20 relative z-10 ${
                    testState === 'recording'
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                      : testState === 'ready'
                      ? 'bg-white/20 hover:bg-white/30'
                      : testState === 'prompting'
                      ? 'bg-white/10 hover:bg-white/20' // Allow tap during TTS to override
                      : 'bg-white/10 opacity-50 cursor-not-allowed'
                  }`}
                  style={{
                    pointerEvents: 'auto',
                    zIndex: 10,
                    touchAction: 'manipulation'
                  }}
                >
                  {testState === 'recording' ? (
                    <MicOff className="h-8 w-8 text-white" />
                  ) : testState === 'initializing' ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Mic className="h-8 w-8 text-white" />
                  )}
                </Button>
              </div>

              {/* Timer display */}
              {testState === 'recording' && (
                <div className="text-center">
                  <div className="text-white font-mono text-lg">
                    00:{String(secondsLeft).padStart(2, '0')}
                  </div>
                </div>
              )}

              <div className="text-center">
                <p className="text-white/70 text-sm" style={{ pointerEvents: 'none' }}>
                  {testState === 'prompting' ? 'Listen to the prompt… (tap to skip)' :
                   testState === 'recording' ? 'Recording… Tap to stop' :
                   testState === 'ready' ? 'Tap to start recording' : 
                   testState === 'processing' ? 'Processing...' :
                   error ? 'Tap to try again' : 'Preparing...'}
                </p>
              </div>

              {/* Show recognized text after processing */}
              {answers[qIndex] && (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                  <p className="text-green-200 text-sm text-center">
                    <strong>Recognized:</strong> "{answers[qIndex].transcript || 'No speech detected'}"
                  </p>
                </div>
              )}
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
