/**
 * Unified TTS Service
 *
 * Provides cross-platform text-to-speech functionality:
 * - Uses Capacitor native TTS on Android/iOS (better quality, always available)
 * - Uses Web Speech API on desktop browsers
 *
 * This is the recommended way to do TTS in the app.
 */

import { Capacitor } from '@capacitor/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { logger } from '@/lib/logger';

export interface TTSOptions {
  text: string;
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: string;
}

export interface TTSVoice {
  voiceURI: string;
  name: string;
  lang: string;
  localService: boolean;
  default: boolean;
}

class UnifiedTTSServiceClass {
  private isNative: boolean;
  private isSpeakingNative: boolean = false;
  private webUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    this.isNative = Capacitor.isNativePlatform();
    logger.log(`[UnifiedTTS] Platform: ${this.isNative ? 'Native (Capacitor)' : 'Web'}`);
  }

  /**
   * Check if TTS is available on this platform
   */
  async isAvailable(): Promise<boolean> {
    if (this.isNative) {
      // Native TTS is always available on Android/iOS
      return true;
    } else {
      // Check Web Speech API availability
      return typeof window !== 'undefined' &&
             'speechSynthesis' in window &&
             window.speechSynthesis.getVoices().length > 0;
    }
  }

  /**
   * Get available voices
   */
  async getVoices(): Promise<TTSVoice[]> {
    if (this.isNative) {
      try {
        const result = await TextToSpeech.getSupportedVoices();
        return result.voices.map(v => ({
          voiceURI: v.voiceURI,
          name: v.name,
          lang: v.lang,
          localService: true,
          default: false
        }));
      } catch (error) {
        logger.error('[UnifiedTTS] Error getting native voices:', error);
        return [];
      }
    } else {
      // Web Speech API
      const voices = window.speechSynthesis?.getVoices() || [];
      return voices.map(v => ({
        voiceURI: v.voiceURI,
        name: v.name,
        lang: v.lang,
        localService: v.localService,
        default: v.default
      }));
    }
  }

  /**
   * Speak text
   */
  async speak(options: TTSOptions): Promise<void> {
    const {
      text,
      lang = 'en-US',
      rate = 1.0,
      pitch = 1.0,
      volume = 1.0,
      voice
    } = options;

    if (!text || text.trim().length === 0) {
      return;
    }

    if (this.isNative) {
      // Use Capacitor native TTS
      try {
        this.isSpeakingNative = true;
        // Note: Don't pass voice parameter to native - let Android select best voice for language
        // The Capacitor plugin expects a numeric index, which is hard to manage across sessions
        await TextToSpeech.speak({
          text,
          lang,
          rate,
          pitch,
          volume
        });
        this.isSpeakingNative = false;
      } catch (error) {
        this.isSpeakingNative = false;
        logger.error('[UnifiedTTS] Native speak error:', error);
        throw error;
      }
    } else {
      // Use Web Speech API
      return new Promise((resolve, reject) => {
        if (!window.speechSynthesis) {
          reject(new Error('Web Speech API not available'));
          return;
        }

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.volume = volume;

        // Set voice if specified
        if (voice) {
          const voices = window.speechSynthesis.getVoices();
          const selectedVoice = voices.find(v => v.voiceURI === voice || v.name === voice);
          if (selectedVoice) {
            utterance.voice = selectedVoice;
          }
        }

        utterance.onend = () => {
          this.webUtterance = null;
          resolve();
        };

        utterance.onerror = (event) => {
          this.webUtterance = null;
          // Don't reject on 'interrupted' - that's expected when canceling
          if (event.error !== 'interrupted') {
            reject(new Error(`Speech synthesis error: ${event.error}`));
          } else {
            resolve();
          }
        };

        this.webUtterance = utterance;
        window.speechSynthesis.speak(utterance);
      });
    }
  }

  /**
   * Stop any ongoing speech
   */
  async stop(): Promise<void> {
    if (this.isNative) {
      try {
        await TextToSpeech.stop();
        this.isSpeakingNative = false;
      } catch (error) {
        logger.error('[UnifiedTTS] Native stop error:', error);
      }
    } else {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      this.webUtterance = null;
    }
  }

  /**
   * Check if currently speaking
   */
  isSpeaking(): boolean {
    if (this.isNative) {
      return this.isSpeakingNative;
    } else {
      return window.speechSynthesis?.speaking || this.webUtterance !== null;
    }
  }

  /**
   * Get supported languages
   */
  async getSupportedLanguages(): Promise<string[]> {
    if (this.isNative) {
      try {
        const result = await TextToSpeech.getSupportedLanguages();
        return result.languages;
      } catch (error) {
        logger.error('[UnifiedTTS] Error getting languages:', error);
        return ['en-US', 'en-GB', 'tr-TR'];
      }
    } else {
      const voices = window.speechSynthesis?.getVoices() || [];
      const langs = new Set(voices.map(v => v.lang));
      return Array.from(langs);
    }
  }

  /**
   * Open device TTS settings (native only)
   */
  async openSettings(): Promise<void> {
    if (this.isNative) {
      try {
        await TextToSpeech.openInstall();
      } catch (error) {
        logger.error('[UnifiedTTS] Error opening settings:', error);
      }
    }
  }

  /**
   * Check if running on native platform
   */
  isNativePlatform(): boolean {
    return this.isNative;
  }
}

// Export singleton instance
export const UnifiedTTSService = new UnifiedTTSServiceClass();

// Export class for testing
export { UnifiedTTSServiceClass };
