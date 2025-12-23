import { useState, useRef, useCallback, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { SpeechRecognition as CapacitorSpeechRecognition } from '@capacitor-community/speech-recognition';

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
  const isNative = Capacitor.isNativePlatform();

  // Request permissions on native platforms
  useEffect(() => {
    if (isNative) {
      CapacitorSpeechRecognition.requestPermissions().catch(err => {
        console.error('[useSpeechRecognition] Permission request failed:', err);
      });
    }
  }, [isNative]);

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

  // Create or reuse a SpeechRecognition with our settings (Web only)
  const getRecognizer = useCallback((): SpeechRecognition | null => {
    if (isNative) return null; // Use Capacitor on native
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
  }, [isNative]);

  // Generate unique run ID and check if stale
  const newRunId = useCallback(() => `${Date.now()}-${Math.random().toString(36).slice(2,8)}`, []);
  const isStale = useCallback((id: string) => speechRunIdRef.current !== id, []);

  // Main speech recognition function
  const startSpeechRecognition = useCallback(async (options: Abortable = {}): Promise<string> => {
    const { signal: abortSignal } = options;
    await unlockAudioOnce();

    // Use Capacitor on native platforms
    if (isNative) {
      return new Promise<string>(async (resolve, reject) => {
        let settled = false;
        let transcript = '';
        let timeoutId: ReturnType<typeof setTimeout> | null = null;
        let abortHandler: (() => void) | null = null;

        // Cleanup function - guaranteed to run
        const cleanup = async () => {
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          if (abortHandler && abortSignal) {
            abortSignal.removeEventListener('abort', abortHandler);
            abortHandler = null;
          }
          try {
            await CapacitorSpeechRecognition.removeAllListeners();
          } catch (e) {
            // Ignore cleanup errors
          }
        };

        const done = async (success: boolean, result: string | Error) => {
          if (settled) return;
          settled = true;
          await cleanup();
          if (success) resolve(result as string);
          else reject(result as Error);
        };

        if (abortSignal?.aborted) {
          return done(false, new Error('aborted'));
        }

        try {
          // Check if available
          const { available } = await CapacitorSpeechRecognition.available();
          if (!available) {
            return done(false, new Error('Speech recognition not available on this device'));
          }

          // Request permissions
          const permResult = await CapacitorSpeechRecognition.requestPermissions();
          if (permResult.speechRecognition !== 'granted') {
            return done(false, new Error('Microphone permission denied'));
          }

          // Set up event listeners BEFORE starting
          await CapacitorSpeechRecognition.addListener('partialResults', (data: any) => {
            if (data.matches && data.matches.length > 0) {
              transcript = data.matches[0];
            }
          });

          // Listen for recognition end event (fired when user stops speaking)
          await CapacitorSpeechRecognition.addListener('listeningState', (data: any) => {
            if (data.status === 'stopped' && !settled) {
              if (transcript) {
                done(true, transcript);
              } else {
                done(false, new Error('No speech detected'));
              }
            }
          });

          // Handle abort signal
          if (abortSignal) {
            abortHandler = async () => {
              try {
                await CapacitorSpeechRecognition.stop();
              } catch (e) {
                // Ignore stop errors during abort
              }
              done(false, new Error('aborted'));
            };
            abortSignal.addEventListener('abort', abortHandler);
          }

          // Start recognition
          await CapacitorSpeechRecognition.start({
            language: 'en-US',
            maxResults: 5,
            prompt: 'Speak now',
            partialResults: true,
            popup: false,
          });

          // Safety timeout - 15 seconds max listening time
          timeoutId = setTimeout(async () => {
            if (!settled) {
              try {
                await CapacitorSpeechRecognition.stop();
              } catch (e) {
                // Ignore stop errors
              }
              if (transcript) {
                done(true, transcript);
              } else {
                done(false, new Error('No speech detected - timeout'));
              }
            }
          }, 15000);

        } catch (error: any) {
          done(false, new Error(error.message || 'Speech recognition failed'));
        }
      });
    }

    // Web Speech API for browsers
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
  }, [unlockAudioOnce, getRecognizer, isNative]);

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