import { useState, useRef, useCallback } from 'react';

// TypeScript interfaces for Web Speech API
export interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: any) => void;
  onend: () => void;
}

export interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

export interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

export interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

export interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

export type RunStatus = 'idle' | 'prompting' | 'recording' | 'evaluating' | 'advancing';
export type Abortable = { signal?: AbortSignal };

const MAX_ASR_RETRIES = 3;

export function useSpeechRecognition() {
  const speechRunIdRef = useRef<string | null>(null);
  const speakStatusRef = useRef<RunStatus>('idle');
  const [speakStatus, setSpeakStatus] = useState<RunStatus>('idle');
  const recognizerRef = useRef<SpeechRecognition | null>(null);
  const retryCountRef = useRef(0);

  // Ensure user gesture unlocked audio on iOS
  const unlockAudioOnce = useCallback(async () => {
    const Ctx = (window.AudioContext || (window as any).webkitAudioContext);
    if (!Ctx) return;
    const ctx = (window as any).__appAudioCtx || ((window as any).__appAudioCtx = new Ctx());
    if (ctx.state === 'suspended') { 
      try {
        await ctx.resume();
      } catch (error) {
        // Apple Store Compliance: Silent fail - audio context resume is optional
      } 
    }
  }, []);

  // Create or reuse a SpeechRecognition with our settings
  const getRecognizer = useCallback((): SpeechRecognition | null => {
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return null;
    if (recognizerRef.current) return recognizerRef.current;
    const rec: SpeechRecognition = new SR();
    rec.lang = 'en-US';
    rec.continuous = false;
    rec.interimResults = false;
    (rec as any).maxAlternatives = 1;
    recognizerRef.current = rec;
    return rec;
  }, []);

  // Generate unique run ID and check if stale
  const newRunId = useCallback(() => `${Date.now()}-${Math.random().toString(36).slice(2,8)}`, []);
  const isStale = useCallback((id: string) => speechRunIdRef.current !== id, []);

  // Main speech recognition function
  const startSpeechRecognition = useCallback(async (options: Abortable = {}): Promise<string> => {
    const { signal: abortSignal } = options;
    await unlockAudioOnce();

    return new Promise<string>((resolve, reject) => {
      let settled = false;
      const done = (success: boolean, result: string | Error) => {
        if (settled) return;
        settled = true;
        if (success) resolve(result as string);
        else reject(result as Error);
      };

      if (abortSignal?.aborted) return done(false, new Error('aborted'));

      const rec = getRecognizer();
      if (!rec) return done(false, new Error('Speech recognition not supported'));

      let transcript = '';
      let hasResult = false;

      rec.onresult = (event) => {
        if (event.results.length > 0) {
          transcript = event.results[0][0].transcript.trim();
          hasResult = true;
        }
      };

      rec.onerror = (event) => {
        done(false, new Error(`Speech recognition error: ${event.error}`));
      };

      rec.onend = () => {
        if (hasResult && transcript) {
          done(true, transcript);
        } else {
          done(false, new Error('No speech detected'));
        }
      };

      if (abortSignal) {
        abortSignal.addEventListener('abort', () => {
          rec.stop();
          done(false, new Error('aborted'));
        });
      }

      try {
        rec.start();
      } catch (error) {
        done(false, error as Error);
      }
    });
  }, [unlockAudioOnce, getRecognizer]);

  const updateSpeakStatus = useCallback((status: RunStatus) => {
    speakStatusRef.current = status;
    setSpeakStatus(status);
  }, []);

  const resetSpeechRecognition = useCallback(() => {
    speechRunIdRef.current = null;
    updateSpeakStatus('idle');
    retryCountRef.current = 0;
  }, [updateSpeakStatus]);

  return {
    speakStatus,
    startSpeechRecognition,
    updateSpeakStatus,
    resetSpeechRecognition,
    newRunId,
    isStale,
    speechRunIdRef,
    retryCountRef,
    MAX_ASR_RETRIES
  };
}