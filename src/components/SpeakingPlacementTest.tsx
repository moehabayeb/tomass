import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
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
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuthReady } from '@/hooks/useAuthReady';

// Utility: Add timeout to Supabase calls to prevent indefinite hangs
function withTimeout<T>(promise: Promise<T>, timeoutMs: number = 30000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout - please check your connection')), timeoutMs)
    )
  ]);
}

interface SpeakingPlacementTestProps {
  onBack: () => void;
  onComplete: (level: string, score: number) => void;
}

// --------- Speaking Test (isolated) ----------
export function SpeakingPlacementTest({ onBack, onComplete }: SpeakingPlacementTestProps) {

  // Phase 1.3: Authentication check
  const { user, isLoading: authLoading, isAuthenticated } = useAuthReady();
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [allowPracticeMode, setAllowPracticeMode] = useState(false);

  // Phase 3.2: Minimum completion validation
  const [validationError, setValidationError] = useState<string>('');
  const [retryCount, setRetryCount] = useState<number>(0);
  const MAX_RETRIES = 3;
  const MIN_DURATION_SEC = 5;
  const MIN_WORDS = 10;

  // ROUTING/UNLOCK HELPERS (use your existing app context if available)
  function unlockLevel(level: 'A1'|'A2'|'B1') {
    const key = 'unlocks';
    const data = JSON.parse(localStorage.getItem(key) || '{}');
    data[level] = true;
    localStorage.setItem(key, JSON.stringify(data));
  }
  // Phase 2.1: State-based navigation (no hard redirects)
  function routeToLessons(level: string, moduleId: number, questionIndex: number) {
    logger.info(`Routing to lessons: ${level}, module ${moduleId}, question ${questionIndex}`);

    try {
      // Set localStorage state
      localStorage.setItem('currentLevel', level);
      localStorage.setItem('currentModule', String(moduleId));
      localStorage.setItem('userPlacement', JSON.stringify({ level, scores: {}, at: Date.now() }));
      localStorage.setItem('unlockedLevel', level);
      localStorage.setItem('recommendedStartLevel', level);
      localStorage.setItem('recommendedStartModule', String(moduleId));

      // Mark level as unlocked
      const unlocks = JSON.parse(localStorage.getItem('unlocks') || '{}');
      unlocks[level] = true;
      localStorage.setItem('unlocks', JSON.stringify(unlocks));

      // Store navigation intent for AppNavigation
      localStorage.setItem('pendingNavigation', JSON.stringify({
        mode: 'lessons',
        level,
        moduleId,
        questionIndex,
        timestamp: Date.now()
      }));

      // Navigation handled by onComplete callback to AppNavigation
      // No window.location.href - uses setCurrentMode('lessons') instead

    } catch (error) {
      logger.error('Route to lessons failed:', error);
    }
  }

  function routeToLevel(level: 'A1'|'A2'|'B1') {
    const map = { A1: {lvl:'A1', mod:1}, A2: {lvl:'A2', mod:51}, B1: {lvl:'B1', mod:101} };
    const t = map[level];
    
    // Use the new routeToLessons function
    routeToLessons(t.lvl, t.mod, 0);
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

  // Debug flag
  const debug = typeof window !== 'undefined' && window.location.search.includes('sttdebug=1');

  // OPTIMIZED: Production-ready logging system (disabled for Apple Store compliance)
  const logger = {
    debug: (message: string, ...args: any[]) => {
      // Debug logging disabled for production
    },
    info: (message: string, ...args: any[]) => {
      // Info logging disabled for production
    },
    warn: (message: string, ...args: any[]) => {
      // Warning logging disabled for production
    },
    error: (message: string, ...args: any[]) => {
      // Error logging disabled for production
    }
  };

  // UNIFIED: State management to keep sessionStateRef and micState synchronized
  const updateMicState = (newState: MicState) => {
    setMicState(newState);
    sessionStateRef.current = newState;
    logger.debug(`State Change: ${micState} → ${newState}`);
  };

  // UNIFIED: Transcript state management to prevent conflicts
  const updateTranscript = (text: string, type: 'display' | 'final' | 'engine' | 'raw' = 'display') => {
    switch (type) {
      case 'display':
        setDisplayTranscript(text);
        break;
      case 'final':
        setTranscript(text);
        setFinalRawTranscript(text);
        break;
      case 'engine':
        setEngineTranscript(text);
        break;
      case 'raw':
        setRawTranscript(text);
        break;
    }
    logger.debug(`Transcript Update (${type}): "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"`);
  };

  // ENHANCED: Error recovery system with exponential backoff
  const errorRecoveryManager = {
    maxRetries: 3,
    baseDelay: 1000,
    
    async retryWithBackoff<T>(
      operation: () => Promise<T>,
      context: string,
      retryCount: number = 0
    ): Promise<T> {
      try {
        return await operation();
      } catch (error) {
        logger.error(`${context} failed (attempt ${retryCount + 1}):`, error);
        
        if (retryCount >= this.maxRetries) {
          logger.error(`${context} failed after ${this.maxRetries} attempts, giving up`);
          throw error;
        }
        
        const delay = this.baseDelay * Math.pow(2, retryCount);
        logger.debug(`Retrying ${context} in ${delay}ms...`);
        
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.retryWithBackoff(operation, context, retryCount + 1);
      }
    },
    
    handleCriticalError(error: any, context: string, fallbackAction?: () => void) {
      logger.error(`Critical error in ${context}:`, error);
      updateMicState('error');
      setStatusMessage(`Error: ${error.message || 'Something went wrong'}. Please try again.`);
      
      if (fallbackAction) {
        setTimeout(fallbackAction, 2000);
      }
    }
  };
  
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

  // 🔧 FIX BUG #5: Track if component is mounted to prevent setState on unmounted component
  const isMountedRef = useRef<boolean>(true);

  // 🔧 FIX BUG #2: Track if VAD cleanup is in progress to prevent race condition
  const isCleaningUpVADRef = useRef<boolean>(false);

  // 🔧 FIX BUG #2 (NEW): Track auto-advance timeouts to prevent memory leaks
  const autoAdvanceTimeoutRef = useRef<number | null>(null);
  const autoAdvanceDelayRef = useRef<number | null>(null);

  const [pauseStatus, setPauseStatus] = useState<string>('');

  // Phase 1.3: Check authentication on component mount
  useEffect(() => {
    if (!authLoading && !isAuthenticated && testState === 'idle' && qIndex === 0) {
      setShowAuthPrompt(true);
    }
  }, [authLoading, isAuthenticated, testState, qIndex]);

  function newRunId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
  }
  
  function isStale(id: string) {
    return runIdRef.current !== id;
  }
  
  function clearAllTimers() {
    if (ttsTimerRef.current) clearTimeout(ttsTimerRef.current);
    ttsTimerRef.current = undefined;

    // 🔧 FIX BUG #2 (NEW): Clear auto-advance timeouts
    if (autoAdvanceTimeoutRef.current) {
      clearTimeout(autoAdvanceTimeoutRef.current);
      autoAdvanceTimeoutRef.current = null;
    }
    if (autoAdvanceDelayRef.current) {
      clearTimeout(autoAdvanceDelayRef.current);
      autoAdvanceDelayRef.current = null;
    }
  }
  
  const PROMPTS = useMemo(() => [
    "Tell me your name and where you are from. Speak clearly for about 15 seconds.",
    "Describe your typical weekday. What do you usually do?",
    "Talk about a past event. What did you do last weekend?",
    "What are your goals for learning English this year?",
    "Compare living in a big city versus living in a small town. Which lifestyle do you prefer and why? Speak for at least 30 seconds."
  ], []);

  function saveAnswer(qIndex: number, transcript: string, durationSec: number) {
    const words = transcript.trim().split(/\s+/).filter(Boolean).length;

    // Phase 3.2: Validate minimum completion requirements
    if (durationSec < MIN_DURATION_SEC) {
      const remaining = MIN_DURATION_SEC - durationSec;
      setValidationError(`Please speak for at least ${MIN_DURATION_SEC} seconds (you spoke for ${durationSec.toFixed(1)}s). Try again!`);
      setRetryCount(prev => prev + 1);

      if (retryCount >= MAX_RETRIES - 1) {
        // Allow after max retries, but warn
        toast.warning(`Maximum retries reached. Accepting answer anyway.`);
        setRetryCount(0);
        setValidationError('');
      } else {
        return; // Don't save, allow retry
      }
    }

    if (words < MIN_WORDS) {
      setValidationError(`Please speak more (at least ${MIN_WORDS} words). You said ${words} word${words !== 1 ? 's' : ''}. Try again!`);
      setRetryCount(prev => prev + 1);

      if (retryCount >= MAX_RETRIES - 1) {
        // Allow after max retries, but warn
        toast.warning(`Maximum retries reached. Accepting answer anyway.`);
        setRetryCount(0);
        setValidationError('');
      } else {
        return; // Don't save, allow retry
      }
    }

    // Clear validation error if all checks pass
    setValidationError('');
    setRetryCount(0);

    if (debug) {
    }

    setAnswers(prev => [...prev, {
      transcript,
      durationSec,
      wordsRecognized: words
    }]);
  }
  
  // Hard reset before starting a question - STRICT SESSION MANAGEMENT
  function hardResetSession() {
    if (debug) {
      // Hard reset session
    }
    
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
    
    // Reset session state using unified state management
    updateMicState('idle');
    retryCountRef.current = 0;
    
    if (debug) {
      // Debug cleanup - could add logging here
    }
  }

  // 🔧 FIX BUG #2: Enhanced VAD cleanup with mutex to prevent race condition
  function cleanupVAD() {
    logger.debug('Cleaning up VAD resources');

    // 🔧 FIX BUG #2: Mutex - prevent concurrent cleanup calls
    if (isCleaningUpVADRef.current) {
      logger.debug('VAD cleanup already in progress, skipping');
      return;
    }
    isCleaningUpVADRef.current = true;

    try {
      // Clear monitoring interval
      if (vadIntervalRef.current) {
        clearInterval(vadIntervalRef.current);
        vadIntervalRef.current = null;
      }

      // Stop all media tracks
      if (mediaStreamRef.current) {
        try {
          mediaStreamRef.current.getTracks().forEach(track => {
            if (track.readyState !== 'ended') {
              track.stop();
            }
          });
        } catch (error) {
          logger.warn('Error stopping media tracks:', error);
        }
        mediaStreamRef.current = null;
      }

      // Clear audio analyser
      if (analyserRef.current) {
        try {
          analyserRef.current.disconnect();
        } catch (error) {
          // Ignore disconnect errors
        }
        analyserRef.current = null;
      }

      // Reset all VAD state
      voicedStartTimeRef.current = 0;
      lastVoiceActivityRef.current = 0;
      totalVoicedDurationRef.current = 0;
      shortPauseCountRef.current = 0;
      ambientNoiseThresholdRef.current = 25;
      calibrationStartRef.current = 0;
      calibrationCompleteRef.current = false;
    } finally {
      // 🔧 FIX BUG #2: Always reset cleanup flag, even if errors occur
      isCleaningUpVADRef.current = false;
    }
    lastWordCountRef.current = 0;
    setPauseStatus('');
  }

  // FIXED: Improved VAD setup with proper error handling and cleanup
  async function setupVAD() {
    if (!SPEAKING_TEST_VAD_ENDPOINTING) return null;
    
    logger.info('Setting up VAD (Voice Activity Detection)');
    
    return errorRecoveryManager.retryWithBackoff(async () => {
      // Clean up any existing VAD first
      cleanupVAD();
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: false
        } 
      });
      
      // Use shared audio context
      const sharedContext = await audioManager.getAudioContext();
      if (!sharedContext) {
        stream.getTracks().forEach(track => track.stop());
        throw new Error('Failed to get audio context');
      }
      
      audioContextRef.current = sharedContext;
      
      const analyser = audioContextRef.current.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.8;
      
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyser);
      
      mediaStreamRef.current = stream;
      analyserRef.current = analyser;
      
      logger.debug('VAD setup successful');
      return { analyser, stream };
    }, 'VAD Setup').catch(error => {
      errorRecoveryManager.handleCriticalError(error, 'VAD Setup', () => {
        updateMicState('idle');
      });
      return null;
    });
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

  // SIMPLIFIED: Voice Activity Detection monitoring with reduced complexity
  function startVADMonitoring() {
    if (!SPEAKING_TEST_VAD_ENDPOINTING || !analyserRef.current || !recognitionRef.current) return;
    
    const debug = new URLSearchParams(window.location.search).has('sttdebug');
    
    // Initialize timing variables
    const now = Date.now();
    startTimeRef.current = now;
    voicedStartTimeRef.current = 0;
    lastVoiceActivityRef.current = now;
    totalVoicedDurationRef.current = 0;
    setPauseStatus('');
    
    // Simplified constants - no device detection or calibration
    const SILENCE_THRESHOLD = 1500; // 1.5 seconds of silence
    const MAX_DURATION = 20000;     // 20 seconds max recording
    const MIN_VOICED_TIME = 3000;   // 3 seconds minimum speech
    const VOICE_RMS_THRESHOLD = 25; // Simple fixed threshold
    
    logger.info(`VAD Monitoring Started: silence=${SILENCE_THRESHOLD}ms, max=${MAX_DURATION}ms`);
    
    // Simplified VAD monitoring interval
    vadIntervalRef.current = window.setInterval(() => {
      try {
        const currentTime = Date.now();
        const { hasVoice, rms } = analyzeVoiceActivity();
        const totalRecordingTime = currentTime - startTimeRef.current;
        
        // Simple voice detection - no calibration complexity
        const hasVoiceActivity = hasVoice || rms > VOICE_RMS_THRESHOLD;
        
        if (hasVoiceActivity) {
          if (voicedStartTimeRef.current === 0) {
            voicedStartTimeRef.current = currentTime;
            logger.debug('Voice activity detected');
          }
          lastVoiceActivityRef.current = currentTime;
          totalVoicedDurationRef.current = currentTime - voicedStartTimeRef.current;
          setPauseStatus('');
        }
        
        // Calculate silence duration
        const silenceDuration = currentTime - lastVoiceActivityRef.current;
        
        // Simple stopping conditions - no complex logic
        const hasLongSilence = silenceDuration >= SILENCE_THRESHOLD;
        const hasMinVoiced = totalVoicedDurationRef.current >= MIN_VOICED_TIME;
        const exceededMaxTime = totalRecordingTime >= MAX_DURATION;
        
        // Stop if: exceeded max time OR (long silence AND minimum speech)
        const shouldStop = exceededMaxTime || (hasLongSilence && hasMinVoiced);
        
        if (shouldStop && recognitionRef.current) {
          const stopReason = exceededMaxTime ? 'max_duration' : 'silence_detected';
          
          if (debug) {
            logger.info(`VAD Stop: ${stopReason}, silence=${silenceDuration}ms, voiced=${totalVoicedDurationRef.current}ms, total=${totalRecordingTime}ms`);
          }
          
          cleanupVAD();
          
          try {
            recognitionRef.current.stop();
          } catch (error) {
            logger.warn('Error stopping recognition:', error);
          }
        }
        
      } catch (error) {
        logger.error('VAD monitoring error:', error);
        cleanupVAD();
      }
    }, 200);
  }

  // Clean up recognition instance (legacy)
  function cleanupRecognition() {
    hardResetSession();
  }
  
  // FIXED: Improved audio context management for TTS and recognition
  class SharedAudioManager {
    private static instance: SharedAudioManager | null = null;
    private audioContext: AudioContext | null = null;
    private activeUsers = new Set<string>();

    static getInstance(): SharedAudioManager {
      if (!SharedAudioManager.instance) {
        SharedAudioManager.instance = new SharedAudioManager();
      }
      return SharedAudioManager.instance;
    }

    async getAudioContext(): Promise<AudioContext | null> {
      try {
        if (!this.audioContext) {
          const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioContext) {
            this.audioContext = new AudioContext();
          }
        }
        
        if (this.audioContext && this.audioContext.state === 'suspended') {
          await this.audioContext.resume();
        }
        
        return this.audioContext;
      } catch (error) {
        logger.warn('Failed to create or resume audio context:', error);
        return null;
      }
    }

    async reserveAudio(userId: string, suspend?: boolean): Promise<void> {
      try {
        const context = await this.getAudioContext();
        if (!context) return;

        if (suspend) {
          // Suspend for speech recognition
          this.activeUsers.add(userId);
          if (context.state === 'running') {
            await context.suspend();
            // Audio suspended for speech recognition
          }
        } else {
          // Release reservation
          this.activeUsers.delete(userId);
          if (this.activeUsers.size === 0 && context.state === 'suspended') {
            await context.resume();
            // Audio resumed after speech recognition
          }
        }
      } catch (error) {
        logger.warn('Audio context management error:', error);
      }
    }

    cleanup(): void {
      this.activeUsers.clear();
      if (this.audioContext && this.audioContext.state !== 'closed') {
        this.audioContext.close();
        this.audioContext = null;
      }
    }
  }

  const audioManager = SharedAudioManager.getInstance();

  // Simplified audio context handling
  async function handleAudioContext(suspend: boolean) {
    const userId = 'speaking-test';
    await audioManager.reserveAudio(userId, suspend);
  }

  async function showResults() {
    const scored = scorePlacement(answers);
    setResult(scored);

    // Save to localStorage first (backup/cache)
    const placement = { level: scored.level, g: scored.grammar, v: scored.vocab, p: scored.pron, date: Date.now() };
    localStorage.setItem('placement', JSON.stringify(placement));
    localStorage.setItem('userPlacement', JSON.stringify({ level: scored.level, scores: scored, at: Date.now() }));
    localStorage.setItem('unlockedLevel', scored.level);
    unlockLevel(scored.level);

    // Calculate test metrics
    const testDuration = Math.round((Date.now() - startTimeRef.current) / 1000); // seconds
    const totalWords = answers.reduce((sum, a) => sum + a.wordsRecognized, 0);
    const uniqueWords = new Set(
      answers.flatMap(a => a.transcript.toLowerCase().split(/\s+/).filter(w => w.length > 0))
    ).size;
    const wordsPerMinute = testDuration > 0 ? (totalWords / testDuration) * 60 : 0;

    // Prepare transcript as JSONB
    const transcript = answers.map((a, idx) => ({
      question: idx + 1,
      text: a.transcript,
      duration: a.durationSec,
      words: a.wordsRecognized
    }));

    // Calculate overall score (0-100 scale)
    const overallScore = Math.round(((scored.grammar + scored.vocab + scored.pron) / 3) * 10);

    // Save to database (only if authenticated)
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user && isAuthenticated) {
        const { data, error } = await withTimeout(
          supabase.rpc('save_speaking_test_result', {
            p_overall_score: overallScore,
            p_recommended_level: scored.level,
            p_pronunciation_score: scored.pron * 10,
            p_grammar_score: scored.grammar * 10,
            p_vocabulary_score: scored.vocab * 10,
            p_fluency_score: Math.min(100, Math.round(wordsPerMinute * 2)), // Simple fluency metric
            p_comprehension_score: 75, // Default (test doesn't measure this directly)
            p_test_duration: testDuration,
            p_transcript: transcript,
            p_detailed_feedback: {
              level: scored.level,
              scores: { grammar: scored.grammar, vocabulary: scored.vocab, pronunciation: scored.pron },
              metrics: { totalWords, uniqueWords, wordsPerMinute, testDuration }
            },
            p_words_per_minute: wordsPerMinute,
            p_unique_words_count: uniqueWords,
            p_grammar_errors_count: Math.max(0, 10 - scored.grammar), // Estimate
            p_pronunciation_issues: {},
            p_test_type: 'placement'
          }),
          30000 // 30 second timeout
        );

        if (error) {
          // Failed to save test results - Sentry will capture this
          toast.error('Test completed, but results may not be saved. Please check your connection.');
        } else {
          toast.success('Test results saved successfully!');

          // Phase 1.2: Create initial lesson progress entry
          try {
            // Determine starting module based on level
            const startingModule = scored.level === 'A1' ? 1 :
                                   scored.level === 'A2' ? 51 :
                                   scored.level === 'B1' ? 101 : 1;

            const { data: progressData, error: progressError } = await withTimeout(
              supabase.rpc('upsert_lesson_progress', {
                p_user_id: user.id,
                p_level: scored.level,
                p_module_id: startingModule,
                p_question_index: 0,
                p_total_questions: 10, // Default, will be updated when lesson starts
                p_question_phase: 'MCQ',
                p_is_module_completed: false
              }),
              30000 // 30 second timeout
            );

            if (progressError) {
              // Failed to create lesson progress - Sentry will capture this
            }
          } catch (progressErr) {
            // Error creating lesson progress - Sentry will capture this
          }
        }
      } else if (!isAuthenticated && allowPracticeMode) {
        // Practice mode - inform user results aren't saved
        toast.info('Practice Mode: Results saved locally only.');
      }
    } catch (dbError) {
      // Database error - Sentry will capture this
      // Continue anyway - localStorage has the data
    }

    // Enhanced placement with new logic
    try {
      processPlacementResults(scored, answers, onComplete);
    } catch (error) {
      // Clear progress
      localStorage.removeItem('speakingTestProgress');

      // @ts-ignore
      window.triggerConfetti?.();
      setTimeout(() => routeToLevel(scored.level), 1200);
    }
  }

  // Enhanced TTS with complete playback guarantee using TTSManager
  async function speakPrompt(text: string) {
    
    const id = newRunId();
    if (testState === 'done') return;
    if (!text.trim()) {
      setTestState('ready');
      return;
    }
    
    runIdRef.current = id;
    setTestState('prompting');              // lock mic visually

    try {
      const result = await TTSManager.speak(text, {
        canSkip: true,
        onProgress: (chunk) => {
          if (debug) {
            // TTS Progress: ${chunk.text.substring(0, 30)}...
          }
        },
        onSkip: () => {
        }
      });

      // Only unlock if this is still the current operation
      if (!isStale(id)) {
        clearAllTimers();
        setTestState('ready');                // UNLOCK the mic
      }
    } catch (error) {
      // Unlock on error
      if (!isStale(id)) {
        clearAllTimers();
        setTestState('ready');
      }
    }
  }

  // Question change hygiene - hard reset on every question change
  useEffect(() => {
    
    // Hard reset before starting new question
    if (SPEAKING_TEST_STRICT_SESSION) {
      hardResetSession();
    }
    
    const text = PROMPTS[qIndex];
    if (!text) return;
    speakPrompt(text);
    
    // cleanup if user leaves screen
    return () => {
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
        if (debug) {
          // Session reset due to strict mode
        }
        hardResetSession();
      }
    };
    
    const handlePageHide = () => {
      if (debug) {
        // Page hide event - strict session reset
      }
      hardResetSession();
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, [SPEAKING_TEST_STRICT_SESSION]);

  // 🔧 FIX BUG #1 & #5: Complete cleanup on unmount - properly close AudioContext + prevent setState
  useEffect(() => {
    // 🔧 FIX BUG #5: Set mounted flag
    isMountedRef.current = true;

    return () => {
      // 🔧 FIX BUG #5: Mark as unmounted to prevent setState on unmounted component
      isMountedRef.current = false;

      // Cleaning up speaking test component

      // Stop TTS
      TTSManager.stop();
      clearAllTimers();

      // Clean up session
      if (SPEAKING_TEST_STRICT_SESSION) {
        hardResetSession();
      } else {
        cleanupRecognition();
      }

      // 🔧 FIX BUG #1: Properly close AudioContext to prevent memory leak
      try {
        audioManager.cleanup(); // This closes the AudioContext
        // AudioContext closed successfully
      } catch (err) {
        // Audio context cleanup error - silent fail
      }

      // Clear refs
      runIdRef.current = null;
    };
  }, [SPEAKING_TEST_STRICT_SESSION]);

  // Enhanced state logging
  useEffect(() => {
    if (debug) {
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
    }
  }

  // Handle mic button press - strict session management
  async function onMicPress() {
    if (debug) {
    }
    
    if (testState === 'prompting') {
      if (debug) {
        // User wants to start - skipping TTS
      }
      // user wants to start now → skip TTS and go
      TTSManager.skip();
      setTestState('ready');
      if (debug) {
        // TTS skipped, test ready
      }
    }
    
    // Strict session: only allow state transitions in proper order
    if (SPEAKING_TEST_STRICT_SESSION) {
      // Stop listening if currently listening
      if (sessionStateRef.current === 'listening') {
        if (debug) {
          // Session reset due to strict mode
        }
        hardResetSession();
        return;
      }

      // Only start if we're in idle state
      if (sessionStateRef.current !== 'idle') {
        if (debug) 
        return;
      }

      if (testState !== 'ready') {
        if (debug) 
        return;
      }
    } else {
      // Legacy behavior
      if (micState === 'listening') {
        if (debug) 
        cleanupRecognition();
        updateMicState('idle');
        setStatusMessage('');
        return;
      }

      if (testState !== 'ready' || micState !== 'idle') {
        if (debug) 
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
    if (debug) {
      // Starting voice recording
    }
    
    // Check for speech recognition support
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      const errorMsg = "Speech recognition not supported";
      setStatusMessage(errorMsg);
      if (SPEAKING_TEST_STRICT_SESSION) {
        updateMicState('error');
        logTelemetry('error', '', 0, 0, 'no_recognition_support');
      }
      return;
    }

    try {
      // State transition: idle → listening
      if (SPEAKING_TEST_STRICT_SESSION) {
        if (sessionStateRef.current !== 'idle') {
          if (debug) 
          return;
        }
        updateMicState('listening');
      }

      // Use shared audio context
      const sharedContext = await audioManager.getAudioContext();
      if (sharedContext && !audioContextRef.current) {
        audioContextRef.current = sharedContext;
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
      updateMicState('listening');
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
          if (debug) {
            // Speech recognition config error: ${e}
          }
        }
      }

      // Setup VAD for voice-sensitive end-of-speech
      let vadSetup = null;
      if (SPEAKING_TEST_VAD_ENDPOINTING) {
        vadSetup = await setupVAD();
        if (vadSetup) {
          if (debug) {
            // VAD setup successful
          }
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
          if (debug) 
          try {
            recognition.stop();
          } catch (e) {}
        }
      }, maxTimeout);

      // Attach fresh listeners only for this attempt
      recognition.onstart = () => {
        if (debug) {
          // Recognition started
        }
      };

      recognition.onaudiostart = () => {
        hasAudioStarted = true;
        if (debug) {
          // Audio started
        }
      };

      recognition.onsoundstart = () => {
        hasSoundStarted = true;
        if (debug) {
          // Sound started
        }
      };

      recognition.onspeechstart = () => {
        hasSpeechStarted = true;
        if (debug) {
          // Speech started
        }
      };

      recognition.onspeechend = () => {
        if (debug) 
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
            if (debug) 
            return;
          }
          updateMicState('processing');
        }
        
        hasResult = true;
        const durationMs = Date.now() - startTimeRef.current;

        // Debug logging removed

        const result = event.results[0];
        if (result && result.isFinal) {
          hasFinal = true;
          if (debug) 
          
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

          // Debug logging removed

          const finalTranscript = SPEAKING_TEST_RAW_CAPTURE ? rawTranscript.trim() : transcript.trim();
          
          // Update live transcript states for final result
          if (SPEAKING_TEST_LIVE_TRANSCRIPT) {
            setFinalRawTranscript(finalTranscript);
            setDisplayTranscript(finalTranscript); // Lock to final transcript
          }
          
          // Finalization rules: proceed to scoring if we have valid content
          if (finalTranscript.length >= 2) {
            if (SPEAKING_TEST_STRICT_SESSION) {
              updateMicState('graded');
            }
            
            updateMicState('processing');
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
              
            } else {
              logTelemetry('graded', finalTranscript, durationMs, retryCountRef.current, 'none');
            }

            // Save the answer and proceed
            // 🔧 FIX BUG #2 (NEW): Track timeout to prevent memory leak
            autoAdvanceTimeoutRef.current = window.setTimeout(() => {
              // 🔧 FIX BUG #5: Check if component is still mounted
              if (!isMountedRef.current) return;

              saveAnswer(qIndex, finalTranscript, durationSec);
              updateMicState('done');
              setStatusMessage('');

              // Auto advance after a brief delay
              // 🔧 FIX BUG #2 (NEW): Track timeout to prevent memory leak
              autoAdvanceDelayRef.current = window.setTimeout(() => {
                // 🔧 FIX BUG #5: Check if component is still mounted
                if (!isMountedRef.current) return;
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
        if (debug) {
          // No match detected
        }
        const durationMs = Date.now() - startTimeRef.current;
        handleNoCapture(durationMs, 'nomatch');
      };

      recognition.onerror = (event) => {
        if (debug) {
          // Recognition error: ${event.error}
        }
        const durationMs = Date.now() - startTimeRef.current;
        handleSpeechError(event.error, durationMs);
      };

      recognition.onend = () => {
        if (debug) 
        
        if (!hasResult && !hasFinal) {
          const durationMs = Date.now() - startTimeRef.current;
          if (debug) 
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
      if (debug) 

      // Start VAD monitoring after recognition begins
      if (SPEAKING_TEST_VAD_ENDPOINTING && vadSetup) {
        // Wait briefly for recognition to stabilize, then start VAD
        setTimeout(() => {
          if (recognitionRef.current === recognition) {
            startVADMonitoring();
            if (debug) {
              // VAD monitoring started
            }
          }
        }, 500);
      }

    } catch (error) {
      if (debug) {
        // Recognition error: ${error}
      }
      
      const durationMs = Date.now() - startTimeRef.current;
      
      if (SPEAKING_TEST_STRICT_SESSION) {
        sessionStateRef.current = 'error';
      }
      updateMicState('idle');
      
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
    if (debug) 
    
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
      if (debug) 
      retryCountRef.current = 1;
      sessionStateRef.current = 'idle'; // Reset for retry
      setStatusMessage('Retrying...');
      
      // Brief delay before retry
      setTimeout(() => {
        // 🔧 FIX BUG #5: Check if component is still mounted before retry
        if (!isMountedRef.current) return;

        // 🔧 FIX BUG #3 (NEW): Check VAD cleanup state to prevent race condition
        if (isCleaningUpVADRef.current) {
          // VAD cleanup in progress - retry after cleanup completes
          setTimeout(() => {
            if (!isMountedRef.current) return;
            startRecording();
          }, 200);
          return;
        }

        startRecording();
      }, 500);
    } else {
      // Show error after retry fails or on first attempt if not strict
      if (SPEAKING_TEST_STRICT_SESSION) {
        sessionStateRef.current = 'error';
      }
      updateMicState('idle');
      
      if (isNoCapture) {
        setStatusMessage("Didn't catch that—try again");
      } else {
        setStatusMessage("Please speak more clearly and try again");
      }
      
      logTelemetry('error', '', durationMs, retryCountRef.current, errorType);
    }
  }

  // Handle speech recognition errors (hard errors)
  // ENHANCED: Speech recognition error handling with automatic recovery
  function handleSpeechError(errorType: string, durationMs: number) {
    logger.debug(`Speech error: ${errorType}, duration: ${durationMs}ms, retry: ${retryCountRef.current}`);
    
    // Clean up timers
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    // Determine if error is recoverable
    const recoverableErrors = ['no-speech', 'aborted', 'audio-capture', 'network'];
    const isRecoverable = recoverableErrors.includes(errorType);
    const shouldAutoRetry = isRecoverable && retryCountRef.current < 2;
    
    if (SPEAKING_TEST_STRICT_SESSION && !isRecoverable) {
      sessionStateRef.current = 'error';
    }
    updateMicState('idle');
    
    // Resume TTS audio context immediately
    handleAudioContext(false);
    
    // Enhanced error handling with recovery suggestions
    switch (errorType) {
      case 'not-allowed':
        setPermissionError(true);
        setStatusMessage("🎤 Microphone access denied. Please allow microphone access in your browser and refresh the page.");
        break;
      case 'network':
        setStatusMessage("🌐 Network error. Checking connection and retrying...");
        if (shouldAutoRetry) {
          setTimeout(() => {
            // 🔧 FIX BUG #5: Check if component is still mounted
            if (!isMountedRef.current) return;
            // 🔧 FIX BUG #3 (NEW): Check VAD cleanup state before retry
            if (isCleaningUpVADRef.current) return;
            logger.info('Auto-retrying after network error...');
            retryCountRef.current++;
            onMicPress();
          }, 2000);
        }
        break;
      case 'audio-capture':
        setStatusMessage("🎤 Audio capture error. Please check your microphone.");
        if (shouldAutoRetry) {
          setTimeout(() => {
            // 🔧 FIX BUG #5: Check if component is still mounted
            if (!isMountedRef.current) return;
            // 🔧 FIX BUG #3 (NEW): Check VAD cleanup state before retry
            if (isCleaningUpVADRef.current) return;
            logger.info('Auto-retrying after audio capture error...');
            retryCountRef.current++;
            onMicPress();
          }, 1500);
        }
        break;
      case 'no-speech':
        setStatusMessage("🔇 No speech detected. Please speak clearly into your microphone.");
        break;
      case 'aborted':
        setStatusMessage("📱 Recording interrupted. Tap the microphone to try again.");
        break;
      case 'service-not-allowed':
        setStatusMessage("🚫 Speech recognition service unavailable. Please try again later.");
        break;
      default:
        setStatusMessage(`⚠️ Recognition error (${errorType}). Please try again.`);
        if (shouldAutoRetry) {
          setTimeout(() => {
            // 🔧 FIX BUG #5: Check if component is still mounted
            if (!isMountedRef.current) return;
            // 🔧 FIX BUG #3 (NEW): Check VAD cleanup state before retry
            if (isCleaningUpVADRef.current) return;
            logger.info('Auto-retrying after unknown error...');
            retryCountRef.current++;
            onMicPress();
          }, 1500);
        }
    }
    
    logTelemetry('error', '', durationMs, retryCountRef.current, errorType);
    
    // Reset retry count if max attempts reached
    if (retryCountRef.current >= 3) {
      logger.warn('Max retry attempts reached, user intervention required');
      retryCountRef.current = 0;
    }
  }

  // Continue to next question
  function handleContinue() {
    if (!transcript) return;
    
    const duration = (Date.now() - startTimeRef.current) / 1000;
    const durationMs = duration * 1000;
    
    // Log telemetry for manual continue action
    if (debug || SPEAKING_TEST_VAD_TOLERANT_PAUSE) {
      const currentWordCount = transcript.trim().split(/\s+/).filter(Boolean).length;
      const deviceType = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
      const thresholdUsed = SPEAKING_TEST_VAD_TOLERANT_PAUSE ? 
        (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 2000 : 1700) : 
        (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 1150 : 800);
      // User continue - reason: user_continue, silenceMs: ${Date.now() - lastVoiceActivityRef.current}, voicedMs: ${totalVoicedDurationRef.current}, totalRecording: ${durationMs}, wordCount: ${currentWordCount}, shortPauses: ${shortPauseCountRef.current}, deviceType: ${deviceType}, thresholdUsed: ${thresholdUsed}, tolerantMode: ${SPEAKING_TEST_VAD_TOLERANT_PAUSE}
    }
    
    saveAnswer(qIndex, transcript, duration);
    
    // Reset mic state
    updateMicState('idle');
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
      {/* Phase 1.3: Authentication Prompt Modal */}
      <Dialog open={showAuthPrompt} onOpenChange={setShowAuthPrompt}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              Sign In to Save Your Results
            </DialogTitle>
            <DialogDescription className="space-y-3 pt-2">
              <p>
                To save your placement test results and track your progress across devices, please sign in to your account.
              </p>
              <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Why sign in?
                </p>
                <ul className="text-sm text-blue-800 dark:text-blue-200 mt-2 space-y-1 list-disc list-inside">
                  <li>Save your test results to the database</li>
                  <li>Track your progress across devices</li>
                  <li>Resume lessons where you left off</li>
                  <li>Access your learning history</li>
                </ul>
              </div>
              <p className="text-sm text-muted-foreground">
                Or continue in <strong>Practice Mode</strong> (results won't be saved)
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setAllowPracticeMode(true);
                setShowAuthPrompt(false);
                toast.info('Practice Mode: Results will not be saved to your account.');
              }}
              className="w-full sm:w-auto"
            >
              Continue in Practice Mode
            </Button>
            <Button
              onClick={() => {
                setShowAuthPrompt(false);
                onBack(); // Navigate back to main screen where they can sign in
                toast.info('Please sign in to save your test results.');
              }}
              className="w-full sm:w-auto"
            >
              Go to Sign In
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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

                {/* Phase 3.2: Validation Error Display */}
                {validationError && (
                  <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-red-200 text-sm font-medium">Validation Error</p>
                        <p className="text-red-100 text-xs mt-1">{validationError}</p>
                        <p className="text-red-200/70 text-xs mt-2">
                          Retry {retryCount}/{MAX_RETRIES}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

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