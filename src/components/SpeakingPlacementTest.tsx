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

  // ---------- local, page-only state ----------
  const questions = useMemo(() => [
    "Tell me your name and where you are from. Speak clearly for about 15 seconds.",
    "Describe your typical weekday. What do you usually do?",
    "Talk about a past event. What did you do last weekend?",
    "What are your goals for learning English this year?"
  ], []);

  // New state for improved mic handling
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(15);
  const [runId, setRunId] = useState<string|null>(null);
  const [error, setError] = useState<string>('');
  const [answers, setAnswers] = useState<{ transcript: string; durationSec: number; wordsRecognized: number }[]>([]);
  const [result, setResult] = useState<null | {
    grammar: number; vocab: number; pron: number; level: 'A1'|'A2'|'B1'
  }>(null);

  // Constants
  const MAX_SECONDS = 15;
  const SILENCE_MS = 2000;

  // ASR guards and timers
  const recognizerRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const newRun = () => `${Date.now()}-${Math.random().toString(36).slice(2,7)}`;

  function stopSafely(reason: 'time'|'silence'|'manual'|'error') {
    try { 
      recognizerRef.current?.stop?.(); 
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    } catch {}
    setIsRecording(false);
    setRunId(null);
    setSecondsLeft(MAX_SECONDS);
  }

  // Load saved progress on mount
  useEffect(() => {
    const saved = localStorage.getItem('speakingTestProgress');
    if (saved) {
      try {
        const { qIndex, answers: savedAnswers } = JSON.parse(saved);
        if (qIndex < questions.length) {
          setQuestionIndex(qIndex);
          setAnswers(savedAnswers || []);
        }
      } catch {}
    }
  }, [questions.length]);

  // Save progress whenever it changes
  useEffect(() => {
    if (answers.length > 0 || questionIndex > 0) {
      localStorage.setItem('speakingTestProgress', JSON.stringify({
        qIndex: questionIndex,
        answers
      }));
    }
  }, [questionIndex, answers]);

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
    stopSafely('manual');
  }, []);

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

  // ---------- mic controls ----------
  async function handleStart() {
    if (isRecording) return;
    setError('');
    const id = newRun(); 
    setRunId(id);
    setIsRecording(true);
    setSecondsLeft(MAX_SECONDS);
    startTimeRef.current = Date.now();

    // UI timer
    let tick = MAX_SECONDS;
    timerRef.current = setInterval(() => {
      tick -= 1;
      setSecondsLeft(tick);
      if (tick <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        stopSafely('time');
      }
    }, 1000);

    // Start recognizer with silence auto-stop
    try {
      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SR) {
        setError('Speech recognition not supported');
        stopSafely('error');
        return;
      }

      const rec = new SR();
      rec.lang = 'en-US';
      rec.continuous = true;
      rec.interimResults = false;
      recognizerRef.current = rec;

      let silenceTimer: NodeJS.Timeout;
      let hasResult = false;

      rec.onresult = (e: any) => {
        hasResult = true;
        clearTimeout(silenceTimer);
        const transcript = e.results[e.results.length - 1]?.[0]?.transcript || '';
        
        // Process the final result
        const duration = (Date.now() - startTimeRef.current) / 1000;
        const words = transcript.trim().split(/\s+/).filter(Boolean).length;
        
        setAnswers(prev => [...prev, { 
          transcript, 
          durationSec: duration, 
          wordsRecognized: words 
        }]);

        if (questionIndex < questions.length - 1) {
          setQuestionIndex(q => q + 1);
        } else {
          // Final question - compute results
          const allAnswers = [...answers, { transcript, durationSec: duration, wordsRecognized: words }];
          const scored = scorePlacement(allAnswers);
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
        
        stopSafely('manual');
      };

      rec.onerror = () => {
        setError('Microphone error. Please try again.');
        stopSafely('error');
      };

      rec.onstart = () => {
        // Start silence detection
        silenceTimer = setTimeout(() => {
          if (!hasResult) {
            stopSafely('silence');
          }
        }, SILENCE_MS);
      };

      rec.start();
    } catch (err) {
      setError('Microphone error. Please try again.');
      stopSafely('error');
    }
  }

  async function handleStop() {
    if (!isRecording) return;
    stopSafely('manual');
  }

  // Play prompt on question change
  useEffect(() => {
    if (!isRecording && !result) {
      narration?.cancel?.();
      try { 
        narration?.speak?.(questions[questionIndex]); 
      } catch {}
    }
  }, [questionIndex, questions, isRecording, result]);

  // ---------- UI ----------
  const progressPercentage = ((questionIndex + 1) / questions.length) * 100;
  
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
                Question {questionIndex + 1} of {questions.length}
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
          <Card key={questionIndex} className="bg-white/10 border-white/20 backdrop-blur-sm mt-8">
            <CardHeader>
              <CardTitle className="text-white text-center">
                Speaking Prompt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white/5 rounded-xl p-6">
                <p className="text-white text-lg font-medium text-center leading-relaxed">
                  "{questions[questionIndex]}"
                </p>
              </div>
              
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-center">
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}
              
              <div className="text-center relative">
                {/* Circular progress ring */}
                {isRecording && (
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
                  onClick={isRecording ? handleStop : handleStart}
                  disabled={runId !== null && !isRecording}
                  size="lg"
                  className={`mic-button rounded-full w-20 h-20 relative z-10 ${
                    isRecording 
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                  style={{
                    pointerEvents: 'auto',
                    zIndex: 10,
                    touchAction: 'manipulation'
                  }}
                >
                  {isRecording ? (
                    <MicOff className="h-8 w-8 text-white" />
                  ) : (
                    <Mic className="h-8 w-8 text-white" />
                  )}
                </Button>
              </div>

              {/* Timer display */}
              {isRecording && (
                <div className="text-center">
                  <div className="text-white font-mono text-lg">
                    00:{String(secondsLeft).padStart(2, '0')}
                  </div>
                </div>
              )}

              <div className="text-center">
                <p className="text-white/70 text-sm" style={{ pointerEvents: 'none' }}>
                  {isRecording ? 'Recording... Tap to stop' : 
                   error ? 'Tap to try again' :
                   'Listen to the prompt, then tap to speak'}
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
