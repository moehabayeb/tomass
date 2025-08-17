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
  type TestState = 'idle'|'prompting'|'ready'|'recording'|'processing'|'done';
  const [testState, setTestState] = useState<TestState>('idle');
  const [qIndex, setQIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState<number>(15);
  const [error, setError] = useState<string>('');
  const [answers, setAnswers] = useState<{ transcript: string; durationSec: number; wordsRecognized: number }[]>([]);
  const [result, setResult] = useState<null | {
    grammar: number; vocab: number; pron: number; level: 'A1'|'A2'|'B1'
  }>(null);

  const runIdRef = useRef<string|null>(null);
  const lastPromptRef = useRef<number>(-1);
  const abortRef = useRef<AbortController|null>(null);
  const timerRef = useRef<number|undefined>(undefined);
  const recognizerRef = useRef<any>(null);
  const startTimeRef = useRef<number>(0);
  
  // ---- helpers (put near other hooks) ----
  const audioCtxRef = useRef<AudioContext | null>(null);
  const srcRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Constants
  const MAX_SECONDS = 15;
  const SILENCE_MS = 1500;
  
  const PROMPTS = useMemo(() => [
    "Tell me your name and where you are from. Speak clearly for about 15 seconds.",
    "Describe your typical weekday. What do you usually do?",
    "Talk about a past event. What did you do last weekend?",
    "What are your goals for learning English this year?"
  ], []);

  function saveAnswer(qIndex: number, transcript: string) {
    const words = transcript.trim().split(/\s+/).filter(Boolean).length;
    const duration = (Date.now() - startTimeRef.current) / 1000;
    
    console.log('[Test] answer:saved', { qIndex, transcript, words, duration });
    
    setAnswers(prev => [...prev, { 
      transcript, 
      durationSec: duration, 
      wordsRecognized: words 
    }]);
  }

  function showResults() {
    const scored = scorePlacement(answers);
    console.log('[Test] results:', { g: scored.grammar, v: scored.vocab, p: scored.pron, level: scored.level });
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

  // Speak the current prompt once per question
  useEffect(() => {
    // speak only when question index actually changes
    if (qIndex === lastPromptRef.current) return;

    // cancel any earlier run
    abortRef.current?.abort();
    window.clearTimeout(timerRef.current);

    lastPromptRef.current = qIndex;
    runIdRef.current = `${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
    setTestState('prompting');

    narration.cancel();
    const text = PROMPTS[qIndex];
    narration.speak(text);

    // Wait a reasonable amount so TTS can finish before enabling mic
    const wait = Math.max(1200, Math.min(3000, text.length * 45));
    timerRef.current = window.setTimeout(() => {
      if (runIdRef.current) setTestState('ready');
    }, wait);
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

  function newRunId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }
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

  // ---- OPTIONAL (recommended): reset on unmount / route change ----
  useEffect(() => {
    return () => {
      try { abortRef.current?.abort(); } catch {}
      try { audioCtxRef.current?.close(); } catch {}
      audioCtxRef.current = null;
      srcRef.current = null;
      gainRef.current = null;
      narration.cancel();
      window.clearTimeout(timerRef.current);
      runIdRef.current = null;
    };
  }, []);

  // Optional: minimal logging to verify
  useEffect(() => {
    console.log('[TEST]', {state: testState, qIndex});
  }, [testState, qIndex]);

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

  // ---- REPLACE onMicPress with this version ----
  async function onMicPress() {
    // tap-to-stop if already recording
    if (testState === 'recording') {
      try { abortRef.current?.abort(); } catch {}
      return;
    }

    if (testState !== 'ready') return;

    // Cancel any TTS that might block mic on iOS
    try { window?.speechSynthesis?.cancel(); } catch {}
    try { narration.cancel(); } catch {}

    setError('');
    setSecondsLeft(MAX_SECONDS);

    const runId = newRunId();
    runIdRef.current = runId;

    try {
      // iOS requirement: resume/create audio context on user gesture
      await ensureAudioContext();

      // Request mic (single stream per attempt)
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        }
      });
      if (!stream || !stream.getTracks().length) throw new Error('NoAudioStream');

      // Keep stream "hot" on iOS
      attachStreamToContext(stream);

      // UI state + countdown
      setTestState('recording');
      abortRef.current = new AbortController();

      let tick = MAX_SECONDS;
      const timer = setInterval(() => {
        tick -= 1;
        setSecondsLeft(tick);
        if (tick <= 0) {
          clearInterval(timer);
          try { abortRef.current?.abort(); } catch {}
        }
      }, 1000);

      // Start ASR (pass stream; extra arg is ignored if not used)
      const transcript = await startASR({
        signal: abortRef.current.signal,
        maxSeconds: MAX_SECONDS,
        silenceTimeoutMs: SILENCE_MS,
        stream
      });

      clearInterval(timer);
      stopStream(stream);

      // Aborted or stale tap — exit quietly
      if (runIdRef.current !== runId) return;

      // Require some speech
      if (!transcript || transcript.trim().split(/\s+/).length < 3) {
        setTestState('ready');
        setError("I didn't hear you clearly. Please try again.");
        return;
      }

      // Save + advance
      setTestState('processing');
      saveAnswer(qIndex, transcript);

      if (qIndex < PROMPTS.length - 1) {
        setQIndex(qIndex + 1);
        setTestState('prompting');
      } else {
        setTestState('done');
        showResults();
      }
    } catch (err: any) {
      // Friendly message; keep user on same prompt
      console.log('[Mic] error', err?.name || err, err?.message);
      setTestState('ready');
      setError('Microphone error. Please try again.');
    } finally {
      abortRef.current = null;
    }
  }

  // ROBUST ASR for Native Apps
  async function startASR({ signal, maxSeconds, silenceTimeoutMs, stream }: {
    signal: AbortSignal;
    maxSeconds: number;
    silenceTimeoutMs: number;
    stream?: MediaStream;
  }): Promise<string> {
    console.log('[Test] asr:start');
    
    return new Promise((resolve, reject) => {
      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SR) {
        console.log('[Test] asr:error - not supported');
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
      let finalTranscript = '';
      let isFinished = false;

      function cleanup() {
        clearTimeout(silenceTimer);
        clearTimeout(maxTimer);
        recognizerRef.current = null;
      }

      function finishRecognition(transcript: string) {
        if (isFinished) return;
        isFinished = true;
        cleanup();
        console.log('[Test] asr:result:', transcript);
        resolve(transcript);
      }

      // Max time limit
      maxTimer = setTimeout(() => {
        console.log('[Test] asr:timeout');
        try { rec.stop(); } catch {}
        if (!isFinished) {
          cleanup();
          reject(new Error('Max time reached'));
        }
      }, maxSeconds * 1000);

      // Signal abort
      signal.addEventListener('abort', () => {
        console.log('[Test] asr:abort');
        try { rec.stop(); } catch {}
        if (!isFinished) {
          cleanup();
          reject(new Error('Aborted'));
        }
      }, { once: true });

      rec.onresult = (event: any) => {
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        const fullTranscript = (finalTranscript + interimTranscript).trim();
        
        // If we have a good final result, finish immediately
        if (finalTranscript.trim() && finalTranscript.trim().split(/\s+/).length >= 3) {
          console.log('[Test] asr:final-result:', finalTranscript);
          try { rec.stop(); } catch {}
          finishRecognition(finalTranscript.trim());
          return;
        }

        // Reset silence timer on any speech
        if (fullTranscript) {
          clearTimeout(silenceTimer);
          silenceTimer = setTimeout(() => {
            if (!isFinished && finalTranscript.trim()) {
              console.log('[Test] asr:silence-finish:', finalTranscript);
              try { rec.stop(); } catch {}
              finishRecognition(finalTranscript.trim());
            }
          }, silenceTimeoutMs);
        }
      };

      rec.onerror = (event: any) => {
        console.log('[Test] asr:error:', event.error);
        if (!isFinished) {
          cleanup();
          reject(new Error(`Recognition error: ${event.error}`));
        }
      };

      rec.onstart = () => {
        console.log('[Test] asr:started');
        // Start initial silence detection
        silenceTimer = setTimeout(() => {
          if (!isFinished && !finalTranscript.trim()) {
            console.log('[Test] asr:initial-silence');
            try { rec.stop(); } catch {}
            cleanup();
            reject(new Error('No speech detected'));
          }
        }, silenceTimeoutMs);
      };

      rec.onend = () => {
        console.log('[Test] asr:ended, final:', finalTranscript);
        if (!isFinished) {
          if (finalTranscript.trim()) {
            finishRecognition(finalTranscript.trim());
          } else {
            cleanup();
            reject(new Error('No speech recognized'));
          }
        }
      };

      try {
        rec.start();
      } catch (err) {
        console.log('[Test] asr:start-error:', err);
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
                  disabled={testState !== 'ready' && testState !== 'recording'}
                  size="lg"
                  className={`mic-button rounded-full w-20 h-20 relative z-10 ${
                    testState === 'recording'
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                      : testState === 'ready'
                      ? 'bg-white/20 hover:bg-white/30'
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
                  {testState === 'recording' ? 'Listening... Tap to stop' : 
                   testState === 'prompting' ? 'Listen to the prompt...' :
                   testState === 'processing' ? 'Processing...' :
                   error ? 'Tap to try again' :
                   testState === 'ready' ? 'Tap to speak' : 'Preparing...'}
                </p>
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
