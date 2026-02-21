import { Capacitor } from '@capacitor/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { configureUtterance } from '@/config/voice';
import { logger } from '@/lib/logger';

/**
 * NarrationController - Cross-platform TTS for "Listen to Answer" and other narration
 *
 * PRODUCTION FIX: Now uses Capacitor TTS on native platforms (Android/iOS)
 * because window.speechSynthesis doesn't work reliably on Android WebView.
 */
export class NarrationController {
  private synth: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance | null = null;
  private isNative: boolean;
  private isSpeakingNative: boolean = false;

  constructor() {
    // Check if running on native platform (Android/iOS)
    this.isNative = Capacitor.isNativePlatform();

    // Guard for SSR or environments without window
    this.synth = typeof window !== 'undefined' && window.speechSynthesis
      ? window.speechSynthesis
      : ({} as SpeechSynthesis);
  }

  async speak(text: string) {
    if (!text || !text.trim()) return;
    await this.cancel();

    try {
      // Use Capacitor TTS on native platforms (Android/iOS)
      if (this.isNative) {
        this.isSpeakingNative = true;
        await TextToSpeech.speak({
          text,
          lang: 'en-US',
          rate: 0.9,
          pitch: 1.0,
          volume: 1.0,
          category: 'playback',
        });
        this.isSpeakingNative = false;
      } else {
        // Web Speech API for browsers
        this.utterance = new SpeechSynthesisUtterance(text);
        // Configure with consistent Thomas voice settings
        configureUtterance(this.utterance, text);
        this.synth.speak(this.utterance);
      }
    } catch (e) {
      logger.error('[Narration] TTS error:', e);
      this.isSpeakingNative = false;
      // noop - fallback to hook TTS flows
    }
  }

  async cancel() {
    try {
      if (this.isNative) {
        // Stop native TTS
        if (this.isSpeakingNative) {
          await TextToSpeech.stop();
          this.isSpeakingNative = false;
        }
      } else if ((this.synth as any)?.speaking || (this.synth as any)?.pending) {
        this.synth.cancel();
      }
    } catch (e) {
      // ignore
    }
    this.utterance = null;
  }
}

export const narration = new NarrationController();
