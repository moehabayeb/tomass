import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Mic, 
  MicOff, 
  Play, 
  Volume2, 
  ArrowLeft, 
  Award, 
  Star, 
  CheckCircle, 
  Target, 
  Zap, 
  MessageSquare, 
  Volume, 
  RotateCcw 
} from 'lucide-react';

// If you already have these in context, import them instead:
import { narration } from '../utils/narration'; // or your existing narration util

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
    // If your app uses a lessons view name, change 'lesson' accordingly:
    onComplete(t.lvl, 75);
  }

  // ---------- local, page-only state ----------
  const questions = useMemo(() => [
    "Tell me your name and where you are from. Speak clearly for about 15 seconds.",
    "Describe your typical weekday. What do you usually do?",
    "Talk about a past event. What did you do last weekend?",
    "What are your goals for learning English this year?"
  ], []);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<{ text: string; conf?: number }[]>([]);
  const [busy, setBusy] = useState(false);
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
    setBusy(false);
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

  // ---------- ASR integration (use your existing recognizer) ----------
  // Implement this wrapper with your current mic/ASR; return {text, confidence}
  async function recognizeOnce(): Promise<{text:string; confidence?:number}> {
    // Simple Web Speech API implementation
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) throw new Error('Speech recognition not supported');
    
    const rec = new SR();
    rec.lang = 'en-US';
    rec.continuous = false;
    rec.interimResults = false;
    
    return new Promise((resolve, reject) => {
      rec.onresult = (e: any) => {
        const text = e.results[0]?.[0]?.transcript || '';
        const confidence = e.results[0]?.[0]?.confidence || 0.8;
        resolve({ text, confidence });
      };
      rec.onerror = () => reject(new Error('Recognition failed'));
      rec.onend = () => resolve({ text: '', confidence: 0.5 });
      rec.start();
    });
  }

  // ---------- test turn ----------
  async function speakTurn() {
    if (busy || result) return;
    setBusy(true);
    narration?.cancel?.();

    const id = newRunId();
    runIdRef.current = id;
    abortRef.current = new AbortController();

    // Play prompt (non-blocking)
    try { narration?.speak?.(questions[qIndex]); } catch {}

    try {
      const { text, confidence } = await recognizeOnce();
      if (isStale(id)) return;

      setAnswers(prev => [...prev, { text, conf: confidence }]);
      if (qIndex < questions.length - 1) {
        setQIndex(q => q + 1);
      } else {
        const scored = scorePlacement([...answers, { text, conf: confidence }]);
        setResult(scored);
        // persist and unlock
        try {
          localStorage.setItem('placement.result', JSON.stringify(scored));
        } catch {}
        unlockLevel(scored.level);
        // fire confetti if your app exposes it
        // @ts-ignore
        window.triggerConfetti?.();
        setTimeout(() => routeToLevel(scored.level), 1200);
      }
    } catch (e) {
      // auto retry once after short backoff
      await new Promise(r => setTimeout(r, 500));
    } finally {
      if (!isStale(id)) setBusy(false);
    }
  }

  // ---------- UI ----------
  return (
    <div className="placement-screen">
      <div className="card">
        <div className="header">
          <h2>Speaking Prompt</h2>
          <span className="chip">A1</span>
        </div>

        {!result ? (
          <>
            <p className="prompt">{questions[qIndex]}</p>
            <div className={`mic ${busy ? 'busy' : ''}`} onClick={busy ? undefined : speakTurn} role="button" aria-disabled={busy} />
            <p className="hint">{busy ? 'Listening…' : 'Tap to speak'}</p>
            <div className="progress">{qIndex+1} / {questions.length}</div>
          </>
        ) : (
          <ResultCard res={result} />
        )}
      </div>
    </div>
  );
}

function ResultCard({ res }: { res: {grammar:number; vocab:number; pron:number; level:'A1'|'A2'|'B1'} }) {
  return (
    <div className="result">
      <h3>Your level: <span className="level">{res.level}</span></h3>
      <Meter label="Grammar" value={res.grammar} />
      <Meter label="Vocabulary" value={res.vocab} />
      <Meter label="Pronunciation" value={res.pron} />
      <p>We'll take you to the best starting module for {res.level}.</p>
    </div>
  );
}
function Meter({label, value}:{label:string; value:number}) {
  return (
    <div className="meter">
      <div className="row">
        <span>{label}</span><span>{value}/10</span>
      </div>
      <div className="bar"><div className="fill" style={{width: `${value*10}%`}} /></div>
    </div>
  );
}
