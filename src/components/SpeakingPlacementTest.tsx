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
import { TTSManager } from '@/services/TTSManager';
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
    
    // Single Source of Truth - set localStorage
    localStorage.setItem('currentLevel', t.lvl);
    localStorage.setItem('currentModule', String(t.mod));
    localStorage.setItem('userPlacement', JSON.stringify({ level: t.lvl, scores: {}, at: Date.now() }));
    localStorage.setItem('unlockedLevel', t.lvl);
    
    // Mark level as unlocked
    const unlocks = JSON.parse(localStorage.getItem('unlocks') || '{}');
    unlocks[t.lvl] = true;
    localStorage.setItem('unlocks', JSON.stringify(unlocks));
    
    // Navigate to Lessons with URL parameters for safety
    const url = new URL(window.location.origin + '/lessons');
    url.searchParams.set('level', t.lvl);
    url.searchParams.set('module', String(t.mod));
    url.searchParams.set('q', '0');
    
    // Telemetry logging
    console.log(`🎯 Placement -> ${t.lvl}`);
    console.log(`🧭 Route -> level=${t.lvl} module=${t.mod} q=1 reason=placed`);
    
    // Replace current URL to avoid back navigation issues
    window.history.replaceState(null, '', url.pathname + url.search);
    
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
  
  // Live transcript states
  const [displayTranscript, setDisplayTranscript] = useState('');
  const [finalRawTranscript, setFinalRawTranscript] = useState('');

  // Feature flags - default to true in both Preview & Production
  const SPEAKING_TEST_RAW_CAPTURE = typeof window !== 'undefined' ? 
    (localStorage.getItem('SPEAKING_TEST_RAW_CAPTURE') !== 'false' && 
     new URLSearchParams(window.location.search).get('SPEAKING_TEST_RAW_CAPTURE') !== 'false') : true;
  
  const SPEAKING_TEST_STRICT_SESSION = typeof window !== 'undefined' ? 
    (localStorage.getItem('SPEAKING_TEST_STRICT_SESSION') !== 'false' && 
     new URLSearchParams(window.location.search).get('SPEAKING_TEST_STRICT_SESSION') !== 'false') : true;

  const SPEAKING_TEST_LIVE_TRANSCRIPT = typeof window !== 'undefined' ? 
    (localStorage.getItem('SPEAKING_TEST_LIVE_TRANSCRIPT') !== 'false' && 
     new URLSearchParams(window.location.search).get('SPEAKING_TEST_LIVE_TRANSCRIPT') !== 'false') : true;

  const SPEAKING_TEST_VAD_ENDPOINTING = typeof window !== 'undefined' ? 
    (localStorage.getItem('SPEAKING_TEST_VAD_ENDPOINTING') !== 'false' && 
     new URLSearchParams(window.location.search).get('SPEAKING_TEST_VAD_ENDPOINTING') !== 'false') : true;

  const SPEAKING_TEST_VAD_TOLERANT_PAUSE = typeof window !== 'undefined' ? 
    (localStorage.getItem('SPEAKING_TEST_VAD_TOLERANT_PAUSE') !== 'false' && 
     new URLSearchParams(window.location.search).get('SPEAKING_TEST_VAD_TOLERANT_PAUSE') !== 'false') : true;

  const runIdRef = useRef<string|null>(null);
  const ttsTimerRef = useRef<number|undefined>(undefined);
  const startTimeRef = useRef<number>(0);
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const retryCountRef = useRef<number>(0);
  const sessionStateRef = useRef<MicState>('idle');
  const isInitialMountRef = useRef<boolean>(true);
  const debug = typeof window !== 'undefined' && window.location.search.includes('sttdebug=1');

  // VAD (Voice Activity Detection) refs
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const vadIntervalRef = useRef<number | null>(null);
  const voicedStartTimeRef = useRef<number>(0);
  const lastVoiceActivityRef = useRef<number>(0);
  const totalVoicedDurationRef = useRef<number>(0);

  // Tolerant VAD state
  const shortPauseCountRef = useRef<number>(0);
  const ambientNoiseThresholdRef = useRef<number>(25); // Dynamic threshold based on calibration
  const calibrationStartRef = useRef<number>(0);
  const calibrationCompleteRef = useRef<boolean>(false);
  const lastWordCountRef = useRef<number>(0);
  const [pauseStatus, setPauseStatus] = useState<string>('');

  
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
  
  // ENHANCED: Comprehensive CEFR-aligned speaking assessment questions
  const PROMPTS = useMemo(() => [
    // A1 Level - Basic personal information
    "Tell me your name, where you are from, and your age. Speak clearly for about 15 seconds.",

    // A1-A2 Level - Daily routines
    "Describe your typical weekday. What time do you wake up? What do you eat for breakfast?",

    // A2 Level - Past experiences
    "Talk about something interesting you did last weekend. Where did you go and who did you meet?",

    // A2-B1 Level - Future plans
    "What are your goals for learning English? How will you use English in the future?",

    // B1 Level - Opinions and preferences
    "Do you prefer living in a big city or a small town? Explain your reasons with specific examples.",

    // B1 Level - Hypothetical situations
    "If you could travel anywhere in the world, where would you go and why? What would you do there?",

    // B1-B2 Level - Abstract concepts
    "What role does technology play in your daily life? Do you think it makes life better or worse?",

    // B2 Level - Complex opinions
    "Some people say that learning languages is becoming less important because of translation technology. What is your opinion on this?"
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
    
    // Clean up VAD
    cleanupVAD();
    
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
    
    // Reset live transcript states
    if (SPEAKING_TEST_LIVE_TRANSCRIPT) {
      setDisplayTranscript('');
      setFinalRawTranscript('');
    }
    
    // ENHANCED: Reset ALL session state for bulletproof transitions
    sessionStateRef.current = 'idle';
    setMicState('idle');
    retryCountRef.current = 0;

    // Reset VAD tracking variables
    voicedStartTimeRef.current = 0;
    lastVoiceActivityRef.current = 0;
    totalVoicedDurationRef.current = 0;
    shortPauseCountRef.current = 0;
    calibrationCompleteRef.current = false;
    lastWordCountRef.current = 0;

    // Clear pause status
    setPauseStatus('');

    // Clear transcript display
    setTranscript('');

    if (debug) console.log('[SpeakingTest] BULLETPROOF session reset complete');
  }

  // Clean up VAD resources
  function cleanupVAD() {
    if (vadIntervalRef.current) {
      clearInterval(vadIntervalRef.current);
      vadIntervalRef.current = null;
    }
    
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    
    analyserRef.current = null;
    voicedStartTimeRef.current = 0;
    lastVoiceActivityRef.current = 0;
    totalVoicedDurationRef.current = 0;
    
    // Reset tolerant VAD state
    shortPauseCountRef.current = 0;
    ambientNoiseThresholdRef.current = 25;
    calibrationStartRef.current = 0;
    calibrationCompleteRef.current = false;
    lastWordCountRef.current = 0;
    setPauseStatus('');
  }

  // Setup VAD audio analysis
  async function setupVAD() {
    if (!SPEAKING_TEST_VAD_ENDPOINTING) return null;
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: false
        } 
      });
      
      if (!audioContextRef.current) {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContext();
      }
      
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      
      const analyser = audioContextRef.current.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.8;
      
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyser);
      
      mediaStreamRef.current = stream;
      analyserRef.current = analyser;
      
      return { analyser, stream };
    } catch (error) {
      if (debug) console.log('[SpeakingTest] VAD setup failed:', error);
      return null;
    }
  }

  // Analyze voice activity using RMS
  function analyzeVoiceActivity(): { hasVoice: boolean; rms: number } {
    if (!analyserRef.current) return { hasVoice: false, rms: 0 };
    
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    // Calculate RMS (Root Mean Square) for voice activity detection
    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i] * dataArray[i];
    }
    const rms = Math.sqrt(sum / bufferLength);
    
    // Voice threshold - adjust based on typical background noise
    const voiceThreshold = 25; // Adjusted for better sensitivity
    const hasVoice = rms > voiceThreshold;
    
    return { hasVoice, rms };
  }

  // Enhanced VAD-based end-of-speech detection with tolerant pause handling
  function startVADMonitoring() {
    if (!SPEAKING_TEST_VAD_ENDPOINTING || !analyserRef.current || !recognitionRef.current) return;
    
    voicedStartTimeRef.current = 0;
    lastVoiceActivityRef.current = Date.now();
    totalVoicedDurationRef.current = 0;
    
    // Reset tolerant VAD state
    shortPauseCountRef.current = 0;
    calibrationStartRef.current = Date.now();
    calibrationCompleteRef.current = false;
    lastWordCountRef.current = 0;
    setPauseStatus('');
    
    let calibrationSum = 0;
    let calibrationCount = 0;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Tolerant thresholds
    const silenceThreshold = SPEAKING_TEST_VAD_TOLERANT_PAUSE ? (isMobile ? 2000 : 1700) : (isMobile ? 1150 : 800);
    const hardCap = SPEAKING_TEST_VAD_TOLERANT_PAUSE ? 22000 : 20000;
    const minVoicedTime = SPEAKING_TEST_VAD_TOLERANT_PAUSE ? 4000 : 3000;
    const minWordCount = SPEAKING_TEST_VAD_TOLERANT_PAUSE ? 8 : 0;
    const maxShortPauses = 2;
    
    if (debug) {
      console.log('[SpeakingTest] VAD tolerant mode:', SPEAKING_TEST_VAD_TOLERANT_PAUSE, 'thresholds:', {
        silenceThreshold,
        hardCap,
        minVoicedTime,
        minWordCount,
        isMobile
      });
    }
    
    // Check voice activity every 200ms
    vadIntervalRef.current = window.setInterval(() => {
      const now = Date.now();
      const { hasVoice, rms } = analyzeVoiceActivity();
      const totalRecordingTime = now - startTimeRef.current;
      
      // Ambient noise calibration (first 600-800ms)
      if (SPEAKING_TEST_VAD_TOLERANT_PAUSE && !calibrationCompleteRef.current) {
        const calibrationDuration = now - calibrationStartRef.current;
        
        if (calibrationDuration <= 700) {
          calibrationSum += rms;
          calibrationCount++;
        } else {
          // Complete calibration
          if (calibrationCount > 0) {
            const avgNoise = calibrationSum / calibrationCount;
            ambientNoiseThresholdRef.current = Math.max(15, avgNoise + 8); // Dynamic threshold
            if (debug) {
              console.log('[SpeakingTest] VAD calibration complete:', {
                avgNoise: avgNoise.toFixed(1),
                threshold: ambientNoiseThresholdRef.current.toFixed(1)
              });
            }
          }
          calibrationCompleteRef.current = true;
        }
      }
      
      // Use calibrated threshold in tolerant mode
      const effectiveThreshold = SPEAKING_TEST_VAD_TOLERANT_PAUSE && calibrationCompleteRef.current ? 
        rms > ambientNoiseThresholdRef.current : rms > 25;
      
      const hasVoiceActivity = SPEAKING_TEST_VAD_TOLERANT_PAUSE ? effectiveThreshold : hasVoice;
      
      if (hasVoiceActivity) {
        if (voicedStartTimeRef.current === 0) {
          voicedStartTimeRef.current = now;
          if (debug) console.log('[SpeakingTest] VAD: voice started');
        }
        lastVoiceActivityRef.current = now;
        setPauseStatus(''); // Clear pause status when voice is detected
      } else if (voicedStartTimeRef.current > 0) {
        // Calculate total voiced duration
        totalVoicedDurationRef.current = now - voicedStartTimeRef.current;
      }
      
      // Calculate current metrics
      const silenceDuration = now - lastVoiceActivityRef.current;
      
      // Get word count from current transcript
      let currentWordCount = 0;
      if (SPEAKING_TEST_VAD_TOLERANT_PAUSE) {
        const currentTranscript = displayTranscript || finalRawTranscript || '';
        currentWordCount = currentTranscript.trim().split(/\s+/).filter(Boolean).length;
        lastWordCountRef.current = currentWordCount;
      }
      
      // Check for short pause (less than threshold)
      const isShortPause = silenceDuration > 600 && silenceDuration < silenceThreshold && 
                          totalVoicedDurationRef.current > 1000; // Must have some voice first
      
      if (SPEAKING_TEST_VAD_TOLERANT_PAUSE && isShortPause && shortPauseCountRef.current < maxShortPauses) {
        // Show pause status but don't stop
        if (pauseStatus !== 'short_pause') {
          setPauseStatus('short_pause');
          if (debug) {
            console.log('[SpeakingTest] VAD: short pause detected', {
              pauseNum: shortPauseCountRef.current + 1,
              silenceDuration,
              wordCount: currentWordCount
            });
          }
        }
        return; // Continue listening
      }
      
      // Grace window for early pauses (before sufficient content)
      const hasMinContent = totalVoicedDurationRef.current >= 2000 || currentWordCount >= 5;
      if (SPEAKING_TEST_VAD_TOLERANT_PAUSE && !hasMinContent && silenceDuration >= silenceThreshold) {
        // Extend listening time automatically
        lastVoiceActivityRef.current = now - (silenceThreshold - 1500); // Give extra 1.5s
        setPauseStatus('grace_period');
        if (debug) {
          console.log('[SpeakingTest] VAD: grace period applied', {
            voicedTime: totalVoicedDurationRef.current,
            wordCount: currentWordCount
          });
        }
        return;
      }
      
      // Check main stopping conditions
      const hasLongSilence = silenceDuration >= silenceThreshold;
      const hasMinVoiced = totalVoicedDurationRef.current >= minVoicedTime;
      const hasMinWords = currentWordCount >= minWordCount;
      const isHardCap = totalRecordingTime >= hardCap;
      
      // Stop conditions for tolerant mode:
      // 1. Long silence AND (min voiced time OR min words)
      // 2. Hard cap
      let shouldStop = false;
      let stopReason = '';
      
      if (isHardCap) {
        shouldStop = true;
        stopReason = 'duration_limit';
      } else if (SPEAKING_TEST_VAD_TOLERANT_PAUSE) {
        if (hasLongSilence && (hasMinVoiced || hasMinWords)) {
          shouldStop = true;
          stopReason = 'voice_silence';
          
          // Count this as a final pause if we had short pauses before
          if (silenceDuration > silenceThreshold) {
            shortPauseCountRef.current++;
          }
        }
      } else {
        // Original logic for non-tolerant mode
        if (hasLongSilence && hasMinVoiced) {
          shouldStop = true;
          stopReason = 'voice_silence';
        }
      }
      
      if (shouldStop && recognitionRef.current) {
        // Telemetry logging with enhanced data
        if (debug) {
          console.log('[SpeakingTest] VAD stopping:', {
            reason: stopReason,
            silenceDuration,
            totalVoiced: totalVoicedDurationRef.current,
            totalRecording: totalRecordingTime,
            wordCount: currentWordCount,
            shortPauses: shortPauseCountRef.current,
            deviceType: isMobile ? 'mobile' : 'desktop',
            thresholdUsed: silenceThreshold,
            tolerantMode: SPEAKING_TEST_VAD_TOLERANT_PAUSE
          });
        }
        
        cleanupVAD();
        
        try {
          recognitionRef.current.stop();
        } catch (e) {
          if (debug) console.log('[SpeakingTest] VAD stop error:', e);
        }
      }
      
      // Debug logging
      if (debug && hasVoiceActivity) {
        console.log('[SpeakingTest] VAD:', { 
          rms: rms.toFixed(1), 
          threshold: (SPEAKING_TEST_VAD_TOLERANT_PAUSE ? ambientNoiseThresholdRef.current : 25).toFixed(1),
          silenceDuration, 
          totalVoiced: totalVoicedDurationRef.current,
          wordCount: currentWordCount,
          shortPauses: shortPauseCountRef.current
        });
      }
    }, 200);
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
      // Fallback to current behavior - REMOVED AUTO-NAVIGATION
      const placement = { level: scored.level, g: scored.grammar, v: scored.vocab, p: scored.pron, date: Date.now() };
      localStorage.setItem('placement', JSON.stringify(placement));
      localStorage.setItem('userPlacement', JSON.stringify({ level: scored.level, scores: scored, at: Date.now() }));
      localStorage.setItem('unlockedLevel', scored.level);
      unlockLevel(scored.level);

      // Clear progress
      localStorage.removeItem('speakingTestProgress');

      // Trigger celebration but don't auto-navigate
      // @ts-ignore
      window.triggerConfetti?.();

      // Let user control navigation with the button
      console.log('[LevelTest] Results displayed - waiting for user to click "Direct me to my level"');
    }
  }

  // Enhanced TTS with complete playback guarantee using TTSManager
  async function speakPrompt(text: string) {
    console.log('[LevelTest] speakPrompt:start', text.substring(0, 50) + '...');
    
    const id = newRunId();
    if (testState === 'done') return;
    if (!text.trim()) {
      console.log('[LevelTest] empty prompt, unlocking immediately');
      setTestState('ready');
      return;
    }
    
    runIdRef.current = id;
    setTestState('prompting');              // lock mic visually
    
    console.log('[LevelTest] tts:locked, id:', id);

    try {
      const result = await TTSManager.speak(text, {
        canSkip: true,
        onProgress: (chunk) => {
          if (debug) {
            console.log('[LevelTest] tts:chunk', `${chunk.index}/${chunk.total}:`, 
              chunk.text.substring(0, 30) + '...');
          }
        },
        onSkip: () => {
          console.log('[LevelTest] tts:skipped by user');
        }
      });

      console.log('[LevelTest] tts:complete', result);
      
      // Only unlock if this is still the current operation
      if (!isStale(id)) {
        clearAllTimers();
        setTestState('ready');                // UNLOCK the mic
      }
    } catch (error) {
      console.error('[LevelTest] tts:error', error);
      // Unlock on error
      if (!isStale(id)) {
        clearAllTimers();
        setTestState('ready');
      }
    }
  }

  // Question change hygiene - bulletproof reset on every question change
  useEffect(() => {
    console.log('[LevelTest] question-changed:', qIndex, 'isInitialMount:', isInitialMountRef.current);

    // Skip TTS on initial mount if we're resuming from saved progress
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;

      // Only speak if we're starting from question 0 (fresh start)
      if (qIndex === 0) {
        console.log('[LevelTest] Fresh start - will speak question');
      } else {
        console.log('[LevelTest] Resuming from question', qIndex, '- skipping TTS');

        // Just reset state without speaking for resumed questions
        if (SPEAKING_TEST_STRICT_SESSION) {
          hardResetSession();
          setTimeout(() => {
            if (sessionStateRef.current !== 'idle') {
              sessionStateRef.current = 'idle';
              setMicState('idle');
            }
            setTestState('ready'); // Set ready state without TTS
          }, 50);
        } else {
          setTestState('ready');
        }
        return;
      }
    }

    // Normal question transition - speak the prompt
    console.log('[LevelTest] Normal transition - will speak question');

    // BULLETPROOF: Force complete reset before starting new question
    if (SPEAKING_TEST_STRICT_SESSION) {
      hardResetSession();

      // Wait briefly to ensure reset is complete before proceeding
      setTimeout(() => {
        // Validate state is clean before starting
        if (sessionStateRef.current !== 'idle') {
          console.log('[LevelTest] ⚠️ State not clean after reset, forcing:', sessionStateRef.current);
          sessionStateRef.current = 'idle';
          setMicState('idle');
        }

        const text = PROMPTS[qIndex];
        if (text) {
          speakPrompt(text);
        }
      }, 50);
    } else {
      const text = PROMPTS[qIndex];
      if (text) {
        speakPrompt(text);
      }
    }

    // cleanup if user leaves screen
    return () => {
      console.log('[LevelTest] cleanup-question');
      TTSManager.stop();
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
      TTSManager.stop();
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
      // user wants to start now → skip TTS and go
      TTSManager.skip();
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

    // ENHANCED: Validate state before starting recording
    if (SPEAKING_TEST_STRICT_SESSION) {
      if (sessionStateRef.current !== 'idle') {
        if (debug) console.log('[SpeakingTest] ❌ Invalid state for recording:', sessionStateRef.current);
        setStatusMessage('Please wait for microphone to be ready');
        return;
      }

      if (testState !== 'ready') {
        if (debug) console.log('[SpeakingTest] ❌ Test not ready for recording:', testState);
        setStatusMessage('Please wait for question to finish');
        return;
      }
    }

    // Check for speech recognition support
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      const errorMsg = "Speech recognition not supported in this browser";
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
      recognition.continuous = SPEAKING_TEST_VAD_ENDPOINTING ? true : false;
      recognition.interimResults = SPEAKING_TEST_LIVE_TRANSCRIPT ? true : false;
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

      // Setup VAD for voice-sensitive end-of-speech
      let vadSetup = null;
      if (SPEAKING_TEST_VAD_ENDPOINTING) {
        vadSetup = await setupVAD();
        if (vadSetup) {
          if (debug) console.log('[SpeakingTest] VAD setup successful');
        }
      }

      let hasAudioStarted = false;
      let hasSoundStarted = false;
      let hasSpeechStarted = false;
      let hasResult = false;
      let hasFinal = false;

      // Timeout - adjusted for VAD endpointing (20s max vs 15s)
      const maxTimeout = SPEAKING_TEST_VAD_ENDPOINTING ? 20000 : 15000;
      timeoutRef.current = window.setTimeout(() => {
        if (!hasResult && recognitionRef.current && !hasFinal) {
          if (debug) console.log('[SpeakingTest] max timeout reached');
          try {
            recognition.stop();
          } catch (e) {}
        }
      }, maxTimeout);

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
        // Handle interim results for live transcript display
        if (SPEAKING_TEST_LIVE_TRANSCRIPT && event.results.length > 0) {
          const lastResult = event.results[event.results.length - 1];
          if (lastResult && !lastResult.isFinal) {
            // Update live display transcript with interim results
            let interimTranscript = lastResult[0]?.transcript || '';
            
            // For raw capture, get the most unprocessed alternative for interim display
            if (SPEAKING_TEST_RAW_CAPTURE && lastResult.length > 1) {
              for (let i = 0; i < Math.min(lastResult.length, 3); i++) {
                const alt = lastResult[i].transcript;
                if (alt && (alt.toLowerCase() === alt || alt.indexOf('.') === -1)) {
                  interimTranscript = alt;
                  break;
                }
              }
            }
            
            setDisplayTranscript(interimTranscript.trim());
            return; // Don't process as final result yet
          }
        }
        
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
          
          // Clean up VAD when we get final result
          cleanupVAD();
          
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
          
          // Update live transcript states for final result
          if (SPEAKING_TEST_LIVE_TRANSCRIPT) {
            setFinalRawTranscript(finalTranscript);
            setDisplayTranscript(finalTranscript); // Lock to final transcript
          }
          
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
            
            // Enhanced telemetry for VAD
            if (SPEAKING_TEST_VAD_ENDPOINTING || SPEAKING_TEST_LIVE_TRANSCRIPT) {
              const voicedMs = totalVoicedDurationRef.current;
              const vadSilenceMs = Date.now() - lastVoiceActivityRef.current;
              const interimLen = displayTranscript.length;
              const finalLen = finalTranscript.length;
              
              console.log(`[SpeakingTest] q=${qIndex + 1} durMs=${durationMs} voicedMs=${voicedMs} vadSilenceMs=${vadSilenceMs} interimLen=${interimLen} finalLen=${finalLen} retry=${retryCountRef.current} state=final`);
            } else {
              logTelemetry('graded', finalTranscript, durationMs, retryCountRef.current, 'none');
            }

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

      // Start VAD monitoring after recognition begins
      if (SPEAKING_TEST_VAD_ENDPOINTING && vadSetup) {
        // Wait briefly for recognition to stabilize, then start VAD
        setTimeout(() => {
          if (recognitionRef.current === recognition) {
            startVADMonitoring();
            if (debug) console.log('[SpeakingTest] VAD monitoring started');
          }
        }, 500);
      }

    } catch (error) {
      if (debug) console.log('[SpeakingTest] recognition error:', error);
      
      const durationMs = Date.now() - startTimeRef.current;
      
      if (SPEAKING_TEST_STRICT_SESSION) {
        sessionStateRef.current = 'error';
      }
      setMicState('idle');
      
      if (error instanceof Error && error.name === 'NotAllowedError') {
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

  // Handle speech recognition errors with retry logic
  function handleSpeechError(errorType: string, durationMs: number) {
    if (debug) console.log('[SpeakingTest] handleSpeechError:', errorType, 'duration:', durationMs, 'retry:', retryCountRef.current);

    // Clean up timers
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Resume TTS audio context immediately
    handleAudioContext(false);

    // ENHANCED: Automatic retry for recoverable errors
    const recoverableErrors = ['audio-capture', 'network', 'aborted'];
    const isRecoverable = recoverableErrors.includes(errorType);

    if (isRecoverable && retryCountRef.current === 0 && SPEAKING_TEST_STRICT_SESSION) {
      if (debug) console.log('[SpeakingTest] ⚡ Auto-retry for recoverable error:', errorType);

      retryCountRef.current = 1;
      sessionStateRef.current = 'idle'; // Reset for retry
      setStatusMessage('Connection issue, retrying...');

      // Brief delay before retry
      setTimeout(() => {
        if (sessionStateRef.current === 'idle') { // Still in valid state
          startRecording();
        }
      }, 1000);
      return;
    }

    // Set error state after retry fails or for non-recoverable errors
    if (SPEAKING_TEST_STRICT_SESSION) {
      sessionStateRef.current = 'error';
    }
    setMicState('idle');

    // Handle different error types with enhanced messaging
    switch (errorType) {
      case 'not-allowed':
        setPermissionError(true);
        setStatusMessage("Microphone access denied. Please allow microphone access and try again.");
        break;
      case 'network':
        setStatusMessage(retryCountRef.current > 0
          ? "Network connection failed. Please check your internet and try again."
          : "Network error. Please check your connection and try again.");
        break;
      case 'audio-capture':
        setStatusMessage(retryCountRef.current > 0
          ? "Microphone unavailable. Please check your microphone and try again."
          : "Could not capture audio. Please check your microphone and try again.");
        break;
      case 'aborted':
        setStatusMessage("Recording was interrupted. Please try again.");
        break;
      default:
        setStatusMessage(retryCountRef.current > 0
          ? "Recording failed after retry. Please try again."
          : "Speech recognition error. Please try again.");
    }

    logTelemetry('error', '', durationMs, retryCountRef.current, errorType);
  }

  // Continue to next question
  function handleContinue() {
    if (!transcript) return;
    
    const duration = (Date.now() - startTimeRef.current) / 1000;
    const durationMs = duration * 1000;
    
    // Log telemetry for manual continue action
    if (debug || SPEAKING_TEST_VAD_TOLERANT_PAUSE) {
      const currentWordCount = transcript.trim().split(/\s+/).filter(Boolean).length;
      console.log('[SpeakingTest] VAD manual continue:', {
        reason: 'user_continue',
        silenceMs: Date.now() - lastVoiceActivityRef.current,
        voicedMs: totalVoicedDurationRef.current,
        totalRecording: durationMs,
        wordCount: currentWordCount,
        shortPauses: shortPauseCountRef.current,
        deviceType: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        thresholdUsed: SPEAKING_TEST_VAD_TOLERANT_PAUSE ? 
          (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 2000 : 1700) : 
          (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 1150 : 800),
        tolerantMode: SPEAKING_TEST_VAD_TOLERANT_PAUSE
      });
    }
    
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
    
    // Clear live transcript states when feature flag is enabled
    if (SPEAKING_TEST_LIVE_TRANSCRIPT) {
      setDisplayTranscript('');
      setFinalRawTranscript('');
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
              
              {/* Live transcript display */}
              {SPEAKING_TEST_LIVE_TRANSCRIPT && (displayTranscript || finalRawTranscript) && (
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-white/60 text-xs font-medium mb-2 text-center">
                    {micState === 'listening' ? 'You\'re saying:' : 'You said:'}
                  </div>
                  <div 
                    className="text-white text-base leading-relaxed text-center max-h-20 overflow-y-auto"
                    style={{ 
                      wordBreak: 'break-word',
                      scrollbarWidth: 'thin',
                      scrollbarColor: 'rgba(255,255,255,0.3) transparent'
                    }}
                  >
                    "{displayTranscript || finalRawTranscript}"
                  </div>
                </div>
              )}
              
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
                  ) : sessionStateRef.current === 'error' && SPEAKING_TEST_STRICT_SESSION ? (
                    <div className="text-center">
                      <div className="text-orange-300 text-sm mb-3">{statusMessage}</div>
                      <Button
                        onClick={() => {
                          // Manual retry - reset error state and retry count
                          retryCountRef.current = 0;
                          sessionStateRef.current = 'idle';
                          setMicState('idle');
                          setStatusMessage('');
                          setPermissionError(false);
                          // Start recording immediately
                          setTimeout(() => startRecording(), 100);
                        }}
                        size="sm"
                        variant="outline"
                        className="text-white border-orange-300/50 bg-orange-500/20 hover:bg-orange-500/30 transition-colors"
                      >
                        🔄 Try Again
                      </Button>
                    </div>
                  ) : statusMessage ? (
                    <div className="text-white/80 text-sm">{statusMessage}</div>
                  ) : SPEAKING_TEST_VAD_TOLERANT_PAUSE && pauseStatus === 'short_pause' ? (
                    <div className="text-white/80 text-sm">Listening… (short pause detected)</div>
                  ) : SPEAKING_TEST_VAD_TOLERANT_PAUSE && pauseStatus === 'grace_period' ? (
                    <div className="text-white/80 text-sm">Listening… (grace period)</div>
                  ) : testState === 'prompting' ? (
                    <div className="text-white/80 text-sm">
                      Reading question... {TTSManager.isSpeaking() && <span className="opacity-60">(tap to skip)</span>}
                    </div>
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
  // Enhanced feedback based on level
  const getLevelDescription = (level: string) => {
    switch(level) {
      case 'A1':
        return {
          title: 'Beginner Level',
          description: 'You can understand and use familiar everyday expressions. Perfect foundation to build upon!',
          nextSteps: 'Focus on basic vocabulary, simple present tense, and everyday conversations.'
        };
      case 'A2':
        return {
          title: 'Elementary Level',
          description: 'You can communicate in simple tasks requiring basic information exchange. Good progress!',
          nextSteps: 'Work on past tense, future plans, and expressing opinions.'
        };
      case 'B1':
        return {
          title: 'Intermediate Level',
          description: 'You can handle most situations when traveling and express opinions. Excellent level!',
          nextSteps: 'Develop complex grammar, advanced vocabulary, and nuanced expressions.'
        };
      default:
        return {
          title: 'Your Level',
          description: 'Based on your speaking assessment, we\'ve determined your English proficiency.',
          nextSteps: 'Continue practicing to improve your skills.'
        };
    }
  };

  const levelInfo = getLevelDescription(res.level);
  const averageScore = Math.round((res.grammar + res.vocab + res.pron) / 3 * 10);

  return (
    <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white text-center flex items-center justify-center space-x-2">
          <Award className="h-8 w-8 text-yellow-400" />
          <span className="text-2xl">Speaking Assessment Complete!</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          {/* Level Badge with Animation */}
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-4 mb-2">
              <Badge variant="secondary" className="text-3xl px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none">
                Level {res.level}
              </Badge>
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${
                      averageScore >= (i + 1) * 25
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{levelInfo.title}</h3>
            <p className="text-white/80 text-base">{levelInfo.description}</p>
          </div>

          {/* Detailed Score Breakdown */}
          <div className="bg-white/5 rounded-xl p-6 mb-6">
            <h4 className="text-white font-bold mb-4 flex items-center justify-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>Your Performance Breakdown</span>
            </h4>
            <div className="space-y-4">
              <EnhancedMeter label="Grammar & Structure" value={res.grammar} icon="📝" />
              <EnhancedMeter label="Vocabulary Range" value={res.vocab} icon="📚" />
              <EnhancedMeter label="Pronunciation & Fluency" value={res.pron} icon="🗣️" />
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-white/80 font-medium">Overall Score</span>
                <span className="text-2xl font-bold text-white">{averageScore}%</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 mb-6">
            <h4 className="text-white font-bold mb-3 flex items-center justify-center space-x-2">
              <AlertCircle className="h-5 w-5 text-blue-400" />
              <span>Recommended Focus Areas</span>
            </h4>
            <p className="text-white/90 text-sm">{levelInfo.nextSteps}</p>
          </div>

          {/* Action Button */}
          <Button
            onClick={() => {
              // Check for pending route first, fallback to onStartLevel
              const pendingRoute = localStorage.getItem('pendingRoute');
              if (pendingRoute) {
                try {
                  const route = JSON.parse(pendingRoute);
                  console.log('[LevelTest] Using stored route:', route);

                  // Use the enhanced routing information from levelPlacementLogic
                  // Set current level and module (Single Source of Truth)
                  localStorage.setItem('currentLevel', route.level);
                  localStorage.setItem('currentModule', String(route.moduleId));

                  // Mark level as unlocked
                  const unlocks = JSON.parse(localStorage.getItem('unlocks') || '{}');
                  unlocks[route.level] = true;
                  localStorage.setItem('unlocks', JSON.stringify(unlocks));
                  localStorage.setItem('unlockedLevel', route.level);

                  // Navigate to Lessons with comprehensive parameters
                  const url = new URL(window.location.origin + '/lessons');
                  url.searchParams.set('level', route.level);
                  url.searchParams.set('module', String(route.moduleId));
                  if (route.questionIndex > 0) {
                    url.searchParams.set('q', String(route.questionIndex));
                  }

                  // Navigation telemetry
                  const reason = route.questionIndex > 0 ? 'resume' : 'placed';
                  console.log(`🧭 Route -> level=${route.level} module=${route.moduleId} q=${route.questionIndex + 1} reason=${reason}`);

                  // Replace current URL to avoid back navigation issues
                  window.history.replaceState(null, '', url.pathname + url.search);

                  // Clean up
                  localStorage.removeItem('pendingRoute');

                  console.log(`🚀 Routed to ${route.level} Module ${route.moduleId}, Question ${route.questionIndex + 1}`);
                } catch (error) {
                  console.error('Failed to parse pending route, using fallback:', error);
                  onStartLevel();
                }
              } else {
                // Fallback to original behavior
                onStartLevel();
              }
            }}
            size="lg"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-none py-4 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            🚀 Direct me to my level ({res.level})
          </Button>

          <p className="text-white/60 text-sm mt-4">
            You'll be taken to {res.level} lessons tailored to your speaking ability
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// Enhanced meter component with better visual feedback
function EnhancedMeter({label, value, icon}:{label:string; value:number; icon:string}) {
  const getColorClass = (score: number) => {
    if (score >= 8) return 'from-green-400 to-emerald-500';
    if (score >= 6) return 'from-yellow-400 to-orange-500';
    if (score >= 4) return 'from-orange-400 to-red-500';
    return 'from-red-400 to-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Fair';
    return 'Needs Practice';
  };

  return (
    <div className="flex items-center justify-between bg-white/5 rounded-lg p-4">
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <span className="text-white font-medium">{label}</span>
          <div className="text-xs text-white/60">{getScoreLabel(value)}</div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-32 h-3 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getColorClass(value)} rounded-full transition-all duration-1000 ease-out`}
            style={{width: `${value*10}%`}}
          />
        </div>
        <span className="text-white font-bold min-w-[3rem] text-lg">{value}/10</span>
      </div>
    </div>
  );
}

// Legacy meter component (kept for compatibility)
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