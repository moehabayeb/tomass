import { configureUtterance } from '@/config/voice';

export class NarrationController {
  private synth: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    // Guard for SSR or environments without window
    this.synth = typeof window !== 'undefined' && window.speechSynthesis
      ? window.speechSynthesis
      : ({} as SpeechSynthesis);
  }

  speak(text: string) {
    if (!text || !text.trim()) return;
    this.cancel();
    try {
      this.utterance = new SpeechSynthesisUtterance(text);
      // Configure with consistent Thomas voice settings
      configureUtterance(this.utterance, text);
      this.synth.speak(this.utterance);
    } catch (e) {
      // noop - fallback to hook TTS flows
      console.warn('NarrationController speak error:', e);
    }
  }

  cancel() {
    try {
      if ((this.synth as any)?.speaking || (this.synth as any)?.pending) {
        this.synth.cancel();
      }
    } catch (e) {
      // ignore
    }
    this.utterance = null;
  }
}

export const narration = new NarrationController();
