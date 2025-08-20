// Dedicated microphone service for Speaking Placement Test
// Page-local singleton - no global side effects

type MicState = 'idle' | 'listening' | 'processing' | 'done';
type MicError = 'permission' | 'no-speech' | 'timeout' | 'network' | 'other';

interface MicResult {
  transcript: string;
  confidence: number;
  alternatives?: string[];
}

interface MicStateData {
  state: MicState;
  message: string;
  error?: MicError;
  transcript?: string;
  canRetry: boolean;
}

type StateListener = (data: MicStateData) => void;

class MicTestService {
  private recognition: any = null;
  private listeners: Set<StateListener> = new Set();
  private currentState: MicStateData = {
    state: 'idle',
    message: '',
    canRetry: true
  };
  private timeoutId: number | null = null;
  private isDestroyed = false;
  private audioContext: AudioContext | null = null;
  private wasAudioContextSuspended = false;

  private debug = false;

  constructor() {
    // Check for debug flag
    this.debug = window.location.search.includes('sttdebug=1');
    if (this.debug) {
      console.log('[MicTestService] Debug mode enabled');
    }
  }

  // Subscribe to state changes
  onStateChange(listener: StateListener): () => void {
    this.listeners.add(listener);
    // Immediately call with current state
    listener(this.currentState);
    
    return () => {
      this.listeners.delete(listener);
    };
  }

  private setState(newState: Partial<MicStateData>) {
    this.currentState = { ...this.currentState, ...newState };
    if (this.debug) {
      console.log('[MicTestService] State change:', this.currentState);
    }
    this.listeners.forEach(listener => listener(this.currentState));
  }

  private async setupAudioContext() {
    try {
      // Suspend existing TTS audio context if it exists
      const existingContext = (window as any)._audioCtx;
      if (existingContext && existingContext.state === 'running') {
        await existingContext.suspend();
        this.wasAudioContextSuspended = true;
        if (this.debug) {
          console.log('[MicTestService] Suspended existing audio context');
        }
      }
    } catch (error) {
      if (this.debug) {
        console.warn('[MicTestService] Failed to suspend audio context:', error);
      }
    }
  }

  private async restoreAudioContext() {
    try {
      // Resume TTS audio context if we suspended it
      if (this.wasAudioContextSuspended) {
        const existingContext = (window as any)._audioCtx;
        if (existingContext && existingContext.state === 'suspended') {
          await existingContext.resume();
          if (this.debug) {
            console.log('[MicTestService] Resumed audio context');
          }
        }
        this.wasAudioContextSuspended = false;
      }
    } catch (error) {
      if (this.debug) {
        console.warn('[MicTestService] Failed to resume audio context:', error);
      }
    }
  }

  async startListening(): Promise<MicResult | null> {
    if (this.isDestroyed) return null;

    // Clear any existing timeout
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    // Check for speech recognition support
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      this.setState({
        state: 'idle',
        message: 'Speech recognition not supported in this browser',
        error: 'other',
        canRetry: false
      });
      return null;
    }

    try {
      // Setup audio context handling
      await this.setupAudioContext();

      this.setState({
        state: 'listening',
        message: 'Listening...',
        error: undefined,
        transcript: undefined,
        canRetry: false
      });

      return new Promise((resolve) => {
        // Create new recognition instance
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'en-US';
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 5;

        let hasResult = false;
        let hasAudioStarted = false;
        let hasSoundStarted = false;
        let hasSpeechStarted = false;

        // 12 second timeout
        this.timeoutId = window.setTimeout(() => {
          if (this.debug) {
            console.log('[MicTestService] Timeout reached');
          }
          
          if (!hasResult && this.recognition) {
            this.recognition.stop();
            
            // Only show "no speech" if truly silent (no audio/sound events)
            if (!hasAudioStarted && !hasSoundStarted) {
              this.setState({
                state: 'idle',
                message: 'No speech detected',
                error: 'no-speech',
                canRetry: true
              });
            } else {
              this.setState({
                state: 'idle',
                message: "Didn't catch that—try again (hold the mic close)",
                error: 'timeout',
                canRetry: true
              });
            }
            
            this.restoreAudioContext();
            resolve(null);
          }
        }, 12000);

        this.recognition.onstart = () => {
          if (this.debug) {
            console.log('[MicTestService] Recognition started');
          }
        };

        this.recognition.onaudiostart = () => {
          hasAudioStarted = true;
          if (this.debug) {
            console.log('[MicTestService] Audio started');
          }
        };

        this.recognition.onsoundstart = () => {
          hasSoundStarted = true;
          if (this.debug) {
            console.log('[MicTestService] Sound started');
          }
        };

        this.recognition.onspeechstart = () => {
          hasSpeechStarted = true;
          if (this.debug) {
            console.log('[MicTestService] Speech started');
          }
        };

        this.recognition.onspeechend = () => {
          if (this.debug) {
            console.log('[MicTestService] Speech ended');
          }
          // Don't stop here - wait for result or end event
        };

        this.recognition.onresult = (event: any) => {
          if (hasResult || this.isDestroyed) return;
          hasResult = true;

          if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
          }

          if (this.debug) {
            console.log('[MicTestService] Results received:', event.results);
          }

          try {
            const results = event.results[0];
            let bestTranscript = '';
            let bestConfidence = 0;
            const alternatives: string[] = [];

            // Iterate through alternatives properly (don't use Array.from)
            for (let i = 0; i < results.length; i++) {
              const alternative = results[i];
              alternatives.push(alternative.transcript);
              
              if (alternative.confidence > bestConfidence) {
                bestTranscript = alternative.transcript;
                bestConfidence = alternative.confidence;
              }
            }

            // Use first alternative if no confidence scores
            if (!bestTranscript && alternatives.length > 0) {
              bestTranscript = alternatives[0];
              bestConfidence = 0.8; // assume reasonable confidence
            }

            const cleanTranscript = bestTranscript.trim();

            if (this.debug) {
              console.log('[MicTestService] Best result:', {
                transcript: cleanTranscript,
                confidence: bestConfidence,
                alternatives
              });
            }

            this.setState({
              state: 'done',
              message: `Recognized: "${cleanTranscript}"`,
              transcript: cleanTranscript,
              error: undefined,
              canRetry: true
            });

            this.restoreAudioContext();
            resolve({
              transcript: cleanTranscript,
              confidence: bestConfidence,
              alternatives
            });

          } catch (error) {
            if (this.debug) {
              console.error('[MicTestService] Error processing results:', error);
            }
            
            this.setState({
              state: 'idle',
              message: "Didn't catch that—try again",
              error: 'other',
              canRetry: true
            });

            this.restoreAudioContext();
            resolve(null);
          }
        };

        this.recognition.onerror = (event: any) => {
          if (hasResult || this.isDestroyed) return;

          if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
          }

          if (this.debug) {
            console.log('[MicTestService] Recognition error:', event.error);
          }

          let errorType: MicError = 'other';
          let message = "Didn't catch that—try again";

          if (event.error === 'not-allowed' || event.error === 'permission-denied') {
            errorType = 'permission';
            message = 'Microphone blocked. Tap the address bar → Allow mic.';
          } else if (event.error === 'no-speech') {
            errorType = 'no-speech';
            message = "Didn't catch that—try again (hold the mic close)";
          } else if (event.error === 'network') {
            errorType = 'network';
            message = 'Network error. Check your connection and try again.';
          }

          this.setState({
            state: 'idle',
            message,
            error: errorType,
            canRetry: errorType !== 'permission' // Can't retry permission errors automatically
          });

          this.restoreAudioContext();
          resolve(null);
        };

        this.recognition.onend = () => {
          if (this.debug) {
            console.log('[MicTestService] Recognition ended');
          }

          if (!hasResult && !this.isDestroyed) {
            if (this.timeoutId) {
              clearTimeout(this.timeoutId);
              this.timeoutId = null;
            }

            // Only show "no speech" if truly silent
            if (!hasAudioStarted && !hasSoundStarted) {
              this.setState({
                state: 'idle',
                message: 'No speech detected',
                error: 'no-speech',
                canRetry: true
              });
            } else {
              this.setState({
                state: 'idle',
                message: "Didn't catch that—try again",
                error: 'other',
                canRetry: true
              });
            }

            this.restoreAudioContext();
            resolve(null);
          }
        };

        // Start recognition
        try {
          this.recognition.start();
        } catch (error) {
          if (this.debug) {
            console.error('[MicTestService] Failed to start recognition:', error);
          }
          
          this.setState({
            state: 'idle',
            message: 'Failed to start microphone',
            error: 'other',
            canRetry: true
          });

          this.restoreAudioContext();
          resolve(null);
        }
      });

    } catch (error) {
      if (this.debug) {
        console.error('[MicTestService] Setup error:', error);
      }

      this.setState({
        state: 'idle',
        message: 'Failed to access microphone',
        error: 'permission',
        canRetry: true
      });

      this.restoreAudioContext();
      return null;
    }
  }

  stopListening() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (error) {
        if (this.debug) {
          console.warn('[MicTestService] Error stopping recognition:', error);
        }
      }
      this.recognition = null;
    }

    this.restoreAudioContext();

    this.setState({
      state: 'idle',
      message: '',
      error: undefined,
      canRetry: true
    });
  }

  destroy() {
    this.isDestroyed = true;
    this.stopListening();
    this.listeners.clear();
    
    if (this.debug) {
      console.log('[MicTestService] Service destroyed');
    }
  }

  getCurrentState(): MicStateData {
    return this.currentState;
  }

  canStartListening(): boolean {
    return this.currentState.state === 'idle' && this.currentState.canRetry && !this.isDestroyed;
  }
}

// Page-local singleton
let micTestServiceInstance: MicTestService | null = null;

export function getMicTestService(): MicTestService {
  if (!micTestServiceInstance) {
    micTestServiceInstance = new MicTestService();
  }
  return micTestServiceInstance;
}

export function destroyMicTestService() {
  if (micTestServiceInstance) {
    micTestServiceInstance.destroy();
    micTestServiceInstance = null;
  }
}

export type { MicResult, MicStateData, MicError, MicState };