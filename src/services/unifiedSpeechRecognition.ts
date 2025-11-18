/**
 * Unified Speech Recognition Service
 *
 * Intelligently selects the best speech recognition API based on platform:
 * 1. Capacitor Speech Recognition (mobile native) - Best for iOS/Android apps
 * 2. Web Speech API (desktop/mobile web) - Good for Chrome/Edge
 * 3. MediaRecorder + Supabase (fallback) - Universal fallback
 */

import { SpeechRecognition } from '@capacitor-community/speech-recognition';
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

  constructor() {
    this.mode = this.detectBestMode();
    if (import.meta.env.DEV) {
      console.log('🎤 Unified Speech Recognition initialized with mode:', this.mode);
    }
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
        console.error('Error checking Capacitor permissions:', error);
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
        console.error('Error requesting Capacitor permissions:', error);
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
        console.error('Capacitor speech recognition not available:', error);
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
   */
  async start(config: UnifiedSpeechRecognitionConfig = {}): Promise<void> {
    const language = config.language || 'en-US';

    if (this.isListening) {
      if (import.meta.env.DEV) {
        console.warn('Already listening, stopping first');
      }
      await this.stop();
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
   */
  private async startCapacitorRecognition(language: string): Promise<void> {
    try {
      await SpeechRecognition.start({
        language,
        maxResults: 5,
        prompt: 'Speak now',
        partialResults: true,
        popup: false,
      });

      // Listen for results
      SpeechRecognition.addListener('partialResults', (data: any) => {
        if (data.matches && data.matches.length > 0) {
          if (this.onResultCallback) {
            this.onResultCallback({
              transcript: data.matches[0],
              confidence: 1.0,
              isFinal: false,
            });
          }
        }
      });

      // Listen for final results
      SpeechRecognition.addListener('finalResults', (data: any) => {
        if (data.matches && data.matches.length > 0) {
          if (this.onResultCallback) {
            this.onResultCallback({
              transcript: data.matches[0],
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

      if (import.meta.env.DEV) {
        console.log('✅ Capacitor speech recognition started');
      }
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
   */
  async stop(): Promise<void> {
    if (!this.isListening) {
      return;
    }

    try {
      if (this.mode === 'capacitor') {
        await SpeechRecognition.stop();
        await SpeechRecognition.removeAllListeners();
      } else if (this.mode === 'web-speech-api' && this.webRecognition) {
        this.webRecognition.stop();
        this.webRecognition = null;
      }

      this.isListening = false;
      if (import.meta.env.DEV) {
        console.log('🛑 Speech recognition stopped');
      }
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
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
