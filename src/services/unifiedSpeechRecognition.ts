/**
 * Unified Speech Recognition Service
 *
 * Intelligently selects the best speech recognition API based on platform:
 * 1. Capacitor Speech Recognition (mobile native) - Best for iOS/Android apps
 * 2. Web Speech API (desktop/mobile web) - Good for Chrome/Edge
 * 3. MediaRecorder + Supabase (fallback) - Universal fallback
 */

import { SpeechRecognition, PluginListenerHandle } from '@capacitor-community/speech-recognition';
import { Capacitor } from '@capacitor/core';

export type RecognitionMode = 'capacitor' | 'web-speech-api' | 'media-recorder';

export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export interface UnifiedSpeechRecognitionConfig {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
}

class UnifiedSpeechRecognitionService {
  private mode: RecognitionMode;
  private webRecognition: any = null;
  private isListening = false;
  private onResultCallback: ((result: SpeechRecognitionResult) => void) | null = null;
  private onErrorCallback: ((error: Error) => void) | null = null;
  private onEndCallback: (() => void) | null = null;

  // PRODUCTION FIX: Request queue to prevent race conditions
  // Without this, rapid start/stop cycles can leave the speech recognizer in a bad state
  private requestQueue: Promise<void> = Promise.resolve();
  private lastStopTime: number = 0;
  private readonly MIN_RESTART_DELAY_MS = 200;

  // 🔧 v66 BULLETPROOF iOS FIX: Track listener handles for proper cleanup
  // This prevents listener accumulation (listener IDs jumping from 1 to 100+)
  private listenerHandles: PluginListenerHandle[] = [];
  private currentSessionId = 0; // Track sessions to ignore stale events

  constructor() {
    this.mode = this.detectBestMode();
    if (import.meta.env.DEV) {
      console.log('🎤 Unified Speech Recognition initialized with mode:', this.mode);
    }
  }

  /**
   * 🔧 v66 BULLETPROOF iOS FIX: Cleanup all tracked listener handles
   * This prevents listener accumulation that causes iOS audio session issues
   */
  private async cleanupListeners(): Promise<void> {
    console.log(`[SPEECH] v66: Cleaning up ${this.listenerHandles.length} listener handles...`);

    for (const handle of this.listenerHandles) {
      try {
        await handle.remove();
      } catch (e) {
        // Ignore errors - listener may already be removed
      }
    }
    this.listenerHandles = [];

    // Also call removeAllListeners as a safety net
    try {
      await SpeechRecognition.removeAllListeners();
    } catch (e) {
      // Ignore errors
    }

    console.log('[SPEECH] v66: Listeners cleaned up');
  }

  /**
   * 🔧 GOD-TIER v20: Extract transcript from Capacitor speech recognition data
   * Handles multiple possible data formats from different Android versions/devices
   * This fixes the issue where Lessons page shows "Listening" but captures nothing
   */
  private extractTranscript(data: any): string {
    // Format 1: data.matches (array or string) - most common
    if (data.matches) {
      if (Array.isArray(data.matches) && data.matches.length > 0) {
        return data.matches[0];
      }
      if (typeof data.matches === 'string') {
        return data.matches;
      }
    }

    // Format 2: data.value (used by some Android versions)
    if (data.value) {
      if (Array.isArray(data.value) && data.value.length > 0) {
        return data.value[0];
      }
      if (typeof data.value === 'string') {
        return data.value;
      }
    }

    // Format 3: data.results (rare but possible)
    if (data.results) {
      if (Array.isArray(data.results) && data.results.length > 0) {
        return data.results[0];
      }
      if (typeof data.results === 'string') {
        return data.results;
      }
    }

    // Format 4: Direct string (edge case)
    if (typeof data === 'string') {
      return data;
    }

    return '';
  }

  /**
   * Detect the best available speech recognition mode
   */
  private detectBestMode(): RecognitionMode {
    // 1. Check if running in Capacitor (native app)
    if (Capacitor.isNativePlatform()) {
      return 'capacitor';
    }

    // 2. Check if Web Speech API is available (Chrome, Edge, Safari desktop)
    if (
      'webkitSpeechRecognition' in window ||
      'SpeechRecognition' in window
    ) {
      return 'web-speech-api';
    }

    // 3. Fallback to MediaRecorder (works everywhere but requires server transcription)
    return 'media-recorder';
  }

  /**
   * Get current recognition mode
   */
  getMode(): RecognitionMode {
    return this.mode;
  }

  /**
   * Check if permissions are granted
   */
  async checkPermissions(): Promise<boolean> {
    if (this.mode === 'capacitor') {
      try {
        const result = await SpeechRecognition.checkPermissions();
        return result.speechRecognition === 'granted';
      } catch (error) {
        if (import.meta.env.DEV) console.error('Error checking Capacitor permissions:', error);
        return false;
      }
    }

    // For web modes, permissions are checked when starting
    return true;
  }

  /**
   * Request permissions
   */
  async requestPermissions(): Promise<boolean> {
    if (this.mode === 'capacitor') {
      try {
        const result = await SpeechRecognition.requestPermissions();
        return result.speechRecognition === 'granted';
      } catch (error) {
        if (import.meta.env.DEV) console.error('Error requesting Capacitor permissions:', error);
        if (this.onErrorCallback) {
          this.onErrorCallback(new Error('Microphone permission denied'));
        }
        return false;
      }
    }

    // For web modes, permissions are requested when getUserMedia is called
    return true;
  }

  /**
   * Check if speech recognition is available
   */
  async isAvailable(): Promise<boolean> {
    if (this.mode === 'capacitor') {
      try {
        const result = await SpeechRecognition.available();
        return result.available;
      } catch (error) {
        if (import.meta.env.DEV) console.error('Capacitor speech recognition not available:', error);
        return false;
      }
    }

    if (this.mode === 'web-speech-api') {
      return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    }

    // MediaRecorder is generally available
    return 'MediaRecorder' in window;
  }

  /**
   * Start listening for speech
   * Uses request queue to prevent race conditions from rapid start/stop
   */
  async start(config: UnifiedSpeechRecognitionConfig = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      this.requestQueue = this.requestQueue.then(async () => {
        try {
          // Ensure minimum delay since last stop to let Android release resources
          const elapsed = Date.now() - this.lastStopTime;
          if (elapsed < this.MIN_RESTART_DELAY_MS) {
            console.log(`[SPEECH] Waiting ${this.MIN_RESTART_DELAY_MS - elapsed}ms before restart`);
            await new Promise(r => setTimeout(r, this.MIN_RESTART_DELAY_MS - elapsed));
          }

          await this.doStart(config);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  /**
   * Internal start implementation
   */
  private async doStart(config: UnifiedSpeechRecognitionConfig = {}): Promise<void> {
    const language = config.language || 'en-US';

    if (this.isListening) {
      console.log('[SPEECH] Already listening, stopping first');
      await this.doStop();
    }

    // Check availability
    const available = await this.isAvailable();
    if (!available) {
      const error = new Error(`Speech recognition not available in mode: ${this.mode}`);
      if (this.onErrorCallback) {
        this.onErrorCallback(error);
      }
      throw error;
    }

    // Request permissions if needed
    const hasPermission = await this.requestPermissions();
    if (!hasPermission) {
      const error = new Error('Microphone permission denied');
      if (this.onErrorCallback) {
        this.onErrorCallback(error);
      }
      throw error;
    }

    this.isListening = true;

    if (this.mode === 'capacitor') {
      await this.startCapacitorRecognition(language);
    } else if (this.mode === 'web-speech-api') {
      await this.startWebSpeechRecognition(config);
    } else {
      await this.startMediaRecorderRecognition(language);
    }
  }

  /**
   * Start Capacitor native speech recognition
   *
   * CRITICAL: On Android, we must listen for 'listeningState' event because
   * 'finalResults' may NEVER fire. When user stops speaking, Android fires
   * listeningState with status='stopped', and we need to capture whatever
   * partial results we have at that point.
   */
  private async startCapacitorRecognition(language: string): Promise<void> {
    // 🔧 v66 BULLETPROOF: Increment session ID to track and ignore stale events
    this.currentSessionId++;
    const sessionId = this.currentSessionId;
    console.log(`[SPEECH] v66: Starting session #${sessionId}`);

    // 🔧 v66 BULLETPROOF: ALWAYS cleanup listeners FIRST before adding new ones
    // This prevents listener accumulation that causes iOS issues
    await this.cleanupListeners();

    // PRODUCTION FIX: Small delay to ensure platform releases previous recognition resources
    // iOS needs more time than Android for audio session to settle
    const platform = Capacitor.getPlatform();
    const settleDelay = platform === 'ios' ? 150 : 100;
    await new Promise(resolve => setTimeout(resolve, settleDelay));

    // PRODUCTION DEBUG: Log all steps to track down why speech recognition fails
    console.log('[SPEECH] Starting Capacitor recognition for language:', language);

    // AVAILABILITY CHECK: Verify speech recognition service is available
    try {
      console.log('[SPEECH] Checking availability...');
      const availability = await SpeechRecognition.available();
      console.log('[SPEECH] Availability result:', availability);
      if (!availability.available) {
        const error = new Error('Speech recognition not available. Please install/enable Google app.');
        this.isListening = false;
        console.error('[SPEECH] ERROR: Service unavailable');
        if (this.onErrorCallback) {
          this.onErrorCallback(error);
        }
        throw error;
      }
      console.log('[SPEECH] Service is available');
    } catch (e: any) {
      console.warn('[SPEECH] Availability check failed:', e.message);
      // Continue anyway - the check itself might fail but recognition might work
    }

    // Track partial results to use when listeningState fires
    let currentTranscript = '';
    let hasReceivedFinalResult = false;

    try {
      console.log('[SPEECH] Setting up event listeners...');

      // Listen for partial results - save transcript for listeningState fallback
      // 🔧 GOD-TIER v20: Use extractTranscript() to handle all data formats
      // 🔧 v66: Track listener handle and check session ID
      const partialHandle = await SpeechRecognition.addListener('partialResults', (data: any) => {
        // 🔧 v66: Ignore events from stale sessions
        if (sessionId !== this.currentSessionId) {
          console.log(`[SPEECH] v66: Ignoring stale partialResults from session #${sessionId}`);
          return;
        }
        console.log('[SPEECH] EVENT: partialResults', JSON.stringify(data));
        const transcript = this.extractTranscript(data);
        if (transcript) {
          currentTranscript = transcript;
          console.log('[SPEECH] Partial transcript:', currentTranscript);
          if (this.onResultCallback) {
            this.onResultCallback({
              transcript: currentTranscript,
              confidence: 1.0,
              isFinal: false,
            });
          }
        }
      });
      this.listenerHandles.push(partialHandle);

      // Listen for final results (may not fire on all Android devices)
      // 🔧 GOD-TIER v20: Use extractTranscript() to handle all data formats
      // 🔧 v66: Track listener handle and check session ID
      const finalHandle = await SpeechRecognition.addListener('finalResults', (data: any) => {
        // 🔧 v66: Ignore events from stale sessions
        if (sessionId !== this.currentSessionId) {
          console.log(`[SPEECH] v66: Ignoring stale finalResults from session #${sessionId}`);
          return;
        }
        console.log('[SPEECH] EVENT: finalResults', JSON.stringify(data));
        hasReceivedFinalResult = true;
        const transcript = this.extractTranscript(data);
        if (transcript) {
          currentTranscript = transcript;
          console.log('[SPEECH] Final transcript:', currentTranscript);
          if (this.onResultCallback) {
            this.onResultCallback({
              transcript: currentTranscript,
              confidence: 1.0,
              isFinal: true,
            });
          }
        }
        this.isListening = false;
        if (this.onEndCallback) {
          this.onEndCallback();
        }
      });
      this.listenerHandles.push(finalHandle);

      // CRITICAL: Listen for listeningState - this fires when user stops speaking
      // 🔧 v66: Track listener handle and check session ID
      let startConfirmed = false;
      const stateHandle = await SpeechRecognition.addListener('listeningState', (data: any) => {
        // 🔧 v66: Ignore events from stale sessions
        if (sessionId !== this.currentSessionId) {
          console.log(`[SPEECH] v66: Ignoring stale listeningState from session #${sessionId}`);
          return;
        }
        console.log('[SPEECH] EVENT: listeningState', data.status);

        // Confirm recognition started when we get 'started' status
        if (data.status === 'started') {
          startConfirmed = true;
          console.log('[SPEECH] Recognition STARTED successfully');
        }

        if (data.status === 'stopped') {
          console.log('[SPEECH] Recognition STOPPED. isListening:', this.isListening, 'hasReceivedFinal:', hasReceivedFinalResult, 'transcript:', currentTranscript);
          if (this.isListening && !hasReceivedFinalResult) {
            // Use whatever transcript we captured from partial results
            if (currentTranscript && this.onResultCallback) {
              console.log('[SPEECH] Using partial as final:', currentTranscript);
              this.onResultCallback({
                transcript: currentTranscript,
                confidence: 1.0,
                isFinal: true,
              });
            } else {
              console.log('[SPEECH] No transcript captured!');
            }
            this.isListening = false;
            if (this.onEndCallback) {
              this.onEndCallback();
            }
          }
        }
      });
      this.listenerHandles.push(stateHandle);

      // CRITICAL: Listen for native errors
      // 🔧 v66: Track listener handle and check session ID
      const errorHandle = await SpeechRecognition.addListener('error', (data: any) => {
        // 🔧 v66: Ignore events from stale sessions
        if (sessionId !== this.currentSessionId) {
          console.log(`[SPEECH] v66: Ignoring stale error from session #${sessionId}`);
          return;
        }
        console.error('[SPEECH] EVENT: error', JSON.stringify(data));
        const errorMessage = data.message || data.error || 'Speech recognition failed';
        this.isListening = false;

        if (this.onErrorCallback) {
          this.onErrorCallback(new Error(errorMessage));
        }
        if (this.onEndCallback) {
          this.onEndCallback();
        }
      });
      this.listenerHandles.push(errorHandle);

      console.log('[SPEECH] All listeners registered. Starting recognition...');

      // Now start recognition
      await SpeechRecognition.start({
        language,
        maxResults: 5,
        prompt: 'Speak now',
        partialResults: true,
        popup: false,
      });

      console.log('[SPEECH] SpeechRecognition.start() completed');

      // START CONFIRMATION: Detect silent failures within 3 seconds
      setTimeout(async () => {
        if (!startConfirmed && this.isListening) {
          console.error('[SPEECH] TIMEOUT: No start event after 3s!');
          // Force stop and report error
          try {
            await this.stop();
          } catch (e) {
            // Ignore stop errors
          }
          if (this.onErrorCallback) {
            this.onErrorCallback(new Error('Speech recognition failed to start. Please try again or check Google app.'));
          }
          if (this.onEndCallback) {
            this.onEndCallback();
          }
        }
      }, 3000);
    } catch (error: any) {
      this.isListening = false;
      if (this.onErrorCallback) {
        this.onErrorCallback(new Error(error.message || 'Failed to start Capacitor recognition'));
      }
      throw error;
    }
  }

  /**
   * Start Web Speech API recognition
   */
  private async startWebSpeechRecognition(config: UnifiedSpeechRecognitionConfig): Promise<void> {
    try {
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.webRecognition = new SpeechRecognitionAPI();

      this.webRecognition.lang = config.language || 'en-US';
      this.webRecognition.continuous = config.continuous || false;
      this.webRecognition.interimResults = config.interimResults || true;
      this.webRecognition.maxAlternatives = config.maxAlternatives || 5;

      this.webRecognition.onresult = (event: any) => {
        const result = event.results[event.results.length - 1];
        const transcript = result[0].transcript;
        const confidence = result[0].confidence;
        const isFinal = result.isFinal;

        if (this.onResultCallback) {
          this.onResultCallback({
            transcript,
            confidence,
            isFinal,
          });
        }
      };

      this.webRecognition.onerror = (event: any) => {
        this.isListening = false;
        if (this.onErrorCallback) {
          this.onErrorCallback(new Error(event.error));
        }
      };

      this.webRecognition.onend = () => {
        this.isListening = false;
        if (this.onEndCallback) {
          this.onEndCallback();
        }
      };

      this.webRecognition.start();

      if (import.meta.env.DEV) {
        console.log('✅ Web Speech API started');
      }
    } catch (error: any) {
      this.isListening = false;
      if (this.onErrorCallback) {
        this.onErrorCallback(new Error('Failed to start Web Speech API'));
      }
      throw error;
    }
  }

  /**
   * Start MediaRecorder-based recognition (fallback)
   * This requires a server-side transcription service
   */
  private async startMediaRecorderRecognition(language: string): Promise<void> {
    // This is a placeholder for MediaRecorder implementation
    // In production, you would:
    // 1. Start recording audio
    // 2. Send to Supabase Edge Function or other transcription service
    // 3. Return transcript

    const error = new Error('MediaRecorder fallback not fully implemented yet. Please use Chrome or install the mobile app.');
    if (this.onErrorCallback) {
      this.onErrorCallback(error);
    }
    this.isListening = false;
    throw error;
  }

  /**
   * Stop listening
   * Uses request queue to prevent race conditions from rapid start/stop
   */
  async stop(): Promise<void> {
    return new Promise((resolve) => {
      this.requestQueue = this.requestQueue.then(async () => {
        await this.doStop();
        this.lastStopTime = Date.now();
        resolve();
      });
    });
  }

  /**
   * Internal stop implementation
   *
   * CRITICAL FIX: Always clean up listeners regardless of isListening state.
   * This handles edge cases where recognition ended naturally (listeningState fired)
   * but listeners weren't properly cleaned up.
   */
  private async doStop(): Promise<void> {
    try {
      if (this.mode === 'capacitor') {
        // ALWAYS stop and remove listeners, even if isListening is false
        // This ensures cleanup in all edge cases
        await SpeechRecognition.stop();
        // 🔧 v66: Use proper listener cleanup method
        await this.cleanupListeners();
      } else if (this.mode === 'web-speech-api' && this.webRecognition) {
        this.webRecognition.stop();
        this.webRecognition = null;
      }

      this.isListening = false;
      console.log('[SPEECH] v66: Stopped and cleaned up');
    } catch (error) {
      // Log but don't throw - cleanup should be best-effort
      console.error('[SPEECH] Error stopping:', error);
      this.isListening = false;
    }
  }

  /**
   * Set result callback
   */
  onResult(callback: (result: SpeechRecognitionResult) => void): void {
    this.onResultCallback = callback;
  }

  /**
   * Set error callback
   */
  onError(callback: (error: Error) => void): void {
    this.onErrorCallback = callback;
  }

  /**
   * Set end callback
   */
  onEnd(callback: () => void): void {
    this.onEndCallback = callback;
  }

  /**
   * Check if currently listening
   */
  getIsListening(): boolean {
    return this.isListening;
  }
}

// Export singleton instance
export const unifiedSpeechRecognition = new UnifiedSpeechRecognitionService();
