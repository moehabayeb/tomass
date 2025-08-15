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
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ text: string; conf?: number }[]>([]);
  const [speakStatus, setSpeakStatus] = useState<'idle'|'prompting'|'recording'|'evaluating'|'advancing'>('idle');
  const [result, setResult] = useState<null | {
    grammar: number; vocab: number; pron: number; level: 'A1'|'A2'|'B1'
  }>(null);

  // ASR guards only for this page
  const runIdRef = useRef<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  function newRunId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
  }
  function isStale(id: string) {
    return runIdRef.current !== id;
  }
  function resetRun() {
    try { abortRef.current?.abort(); } catch {}
    abortRef.current = null;
    runIdRef.current = null;
    setSpeakStatus('idle');
  }
  useEffect(() => () => resetRun(), []);

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

  // ---------- scoring (0–10 each) ----------
  function scorePlacement(all: {text: string; conf?: number}[]) {
    const joined = all.map(a => a.text).join(' . ');
    const { tokens, uniqueCount, length } = tokenStats(joined);

    // Grammar proxy: diversity of bigrams + presence of verbs/aux + sentence markers
    const verbs = ['am','is','are','was','were','do','does','did','have','has','had',
                   'go','went','come','came','eat','ate','like','play','work','study',
                   'want','wanted','live','lived','visit','visited','be','been','being'];
    const auxHits = tokens.filter(t => verbs.includes(t)).length;
    const sentences = joined.split(/[.!?]/).map(s => s.trim()).filter(Boolean).length;
    const bigrams = new Set(tokens.slice(1).map((t,i)=>tokens[i]+' '+t)).size;

    let grammar = 0;
    grammar += Math.min(4, auxHits / 2);          // up to 4
    grammar += Math.min(3, bigrams / 12);         // up to 3
    grammar += Math.min(3, sentences / 3);        // up to 3
    grammar = Math.max(0, Math.min(10, grammar));

    // Vocabulary proxy: type/token ratio + length
    let vocab = 0;
    vocab += Math.min(6, (uniqueCount / Math.max(1, length)) * 12); // up to 6
    vocab += Math.min(4, length / 20);                               // up to 4
    vocab = Math.max(0, Math.min(10, vocab));

    // Pronunciation proxy: ASR confidence if present; fallback from kept tokens
    const avgConf = all.map(a => a.conf ?? 0.75).reduce((a,b)=>a+b,0) / Math.max(1,all.length);
    let pron = Math.round(Math.max(0, Math.min(10, avgConf * 10)));

    // Level decision (keep simple & transparent)
    const avgCore = (grammar + vocab) / 2;
    const level: 'A1'|'A2'|'B1' =
      avgCore < 4 ? 'A1' : avgCore < 7 ? 'A2' : 'B1';

    return { grammar: Math.round(grammar), vocab: Math.round(vocab), pron, level };
  }

  // ---------- ASR integration ----------
  async function recognizeOnce(): Promise<{text:string; confidence?:number}> {
    // Simple Web Speech API implementation with timeout
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) throw new Error('Speech recognition not supported');
    
    const rec = new SR();
    rec.lang = 'en-US';
    rec.continuous = false;
    rec.interimResults = false;
    
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        rec.stop();
        resolve({ text: '', confidence: 0.5 });
      }, 12000); // 12 second timeout
      
      rec.onresult = (e: any) => {
        clearTimeout(timeout);
        const text = e.results[0]?.[0]?.transcript || '';
        const confidence = e.results[0]?.[0]?.confidence || 0.8;
        resolve({ text, confidence });
      };
      rec.onerror = () => {
        clearTimeout(timeout);
        reject(new Error('Recognition failed'));
      };
      rec.onend = () => {
        clearTimeout(timeout);
      };
      rec.start();
    });
  }

  // ---------- test turn ----------
  async function speakTurn() {
    if (speakStatus !== 'idle' || result) return;
    setSpeakStatus('recording');
    narration?.cancel?.();

    const id = newRunId();
    runIdRef.current = id;
    abortRef.current = new AbortController();

    // Play prompt (non-blocking)
    try { narration?.speak?.(questions[questionIndex]); } catch {}

    try {
      const { text, confidence } = await recognizeOnce();
      if (isStale(id)) return;

      setSpeakStatus('evaluating');
      
      setAnswers(prev => [...prev, { text, conf: confidence }]);
      if (questionIndex < questions.length - 1) {
        setSpeakStatus('advancing');
        setTimeout(() => {
          setQuestionIndex(q => q + 1);
          setSpeakStatus('idle');
        }, 500);
      } else {
        const scored = scorePlacement([...answers, { text, conf: confidence }]);
        setResult(scored);
        // persist and unlock
        try {
          localStorage.setItem('placement.result', JSON.stringify(scored));
          localStorage.setItem('userPlacement', JSON.stringify({ level: scored.level, scores: scored, at: Date.now() }));
          localStorage.setItem('unlockedLevel', scored.level);
        } catch {}
        unlockLevel(scored.level);
        // fire confetti if your app exposes it
        // @ts-ignore
        window.triggerConfetti?.();
        setTimeout(() => routeToLevel(scored.level), 1200);
      }
    } catch (e) {
      // silent retry after short backoff
      await new Promise(r => setTimeout(r, 350));
      try {
        const { text, confidence } = await recognizeOnce();
        if (isStale(id)) return;
        
        setAnswers(prev => [...prev, { text, conf: confidence }]);
        if (questionIndex < questions.length - 1) {
          setSpeakStatus('advancing');
          setTimeout(() => {
            setQuestionIndex(q => q + 1);
            setSpeakStatus('idle');
          }, 500);
        } else {
          const scored = scorePlacement([...answers, { text, conf: confidence }]);
          setResult(scored);
        }
      } catch {
        // Final failure - just continue
        setSpeakStatus('idle');
      }
    } finally {
      if (!isStale(id) && !result) {
        setSpeakStatus('idle');
      }
    }
  }

  // ---------- UI ----------
  const progressPercentage = ((questionIndex + 1) / questions.length) * 100;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
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
      <div className="p-4 max-w-2xl mx-auto">
        {!result ? (
          <Card key={questionIndex} className="bg-white/10 border-white/20 backdrop-blur-sm">
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
              
              <div className="text-center">
                <Button
                  onClick={speakTurn}
                  disabled={speakStatus !== 'idle'}
                  size="lg"
                  className={`mic-button rounded-full w-20 h-20 ${
                    speakStatus === 'recording' 
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                  style={{
                    pointerEvents: 'auto',
                    zIndex: 5,
                    touchAction: 'manipulation'
                  }}
                >
                  {speakStatus === 'recording' ? (
                    <MicOff className="h-8 w-8 text-white" />
                  ) : (
                    <Mic className="h-8 w-8 text-white" />
                  )}
                </Button>
              </div>

              <div className="text-center">
                <p className="text-white/70 text-sm">
                  {speakStatus === 'recording' ? 'Listening...' : 
                   speakStatus === 'evaluating' ? 'Processing...' :
                   speakStatus === 'advancing' ? 'Moving to next question...' :
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
