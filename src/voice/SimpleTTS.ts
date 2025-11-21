/**
 * Simple, reliable TTS for Speaking App
 * Single voice source, hard-coded male voice, message deduplication
 * Now with bilingual Turkish/English support
 */

import { BilingualTTS } from './BilingualTTS';

class SimpleTTSService {
  private isInitialized = false;
  private spokenMessages = new Set<string>();
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private soundEnabled = false;

  // Hard-coded preferred male voices for consistency
  private preferredVoices = [
    'Microsoft David Desktop',
    'Microsoft Mark Desktop', 
    'Daniel',
    'Alex',
    'Google UK English Male',
    'Google US English Male'
  ];

  initialize(): void {
    if (this.isInitialized) return;

    // Wait for voices to load
    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.addEventListener('voiceschanged', () => {
      }, { once: true });
    }
    
    this.isInitialized = true;
  }

  private getBestMaleVoice(): SpeechSynthesisVoice | null {
    const voices = speechSynthesis.getVoices();
    
    // Try preferred voices first
    for (const preferredName of this.preferredVoices) {
      const voice = voices.find(v => 
        v.name.includes(preferredName) && v.lang.startsWith('en')
      );
      if (voice) {
        return voice;
      }
    }
    
    // Fallback to any male voice
    const maleVoice = voices.find(v => 
      v.lang.startsWith('en') && 
      (v.name.toLowerCase().includes('male') || 
       v.name.toLowerCase().includes('david') ||
       v.name.toLowerCase().includes('mark'))
    );
    
    if (maleVoice) {
      return maleVoice;
    }
    
    // Last resort: first English voice
    const englishVoice = voices.find(v => v.lang.startsWith('en'));
    if (englishVoice) {
      return englishVoice;
    }
    
    return null;
  }

  private truncateToSentences(text: string, maxSentences: number = 2): string {
    // Split by sentence endings and take first 1-2 sentences
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    return sentences.slice(0, maxSentences).join('. ') + (sentences.length > maxSentences ? '.' : '');
  }

  setSoundEnabled(enabled: boolean): void {
    this.soundEnabled = enabled;
    BilingualTTS.setSoundEnabled(enabled); // Sync with bilingual TTS
    
    if (!enabled && this.currentUtterance) {
      this.stop();
    }
  }

  getSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  stop(): void {
    BilingualTTS.stop(); // Stop bilingual TTS too
    if (this.currentUtterance) {
      speechSynthesis.cancel();
      this.currentUtterance = null;
      
      // Emit avatar stop event
      window.dispatchEvent(new CustomEvent('avatar:talking:end'));
    }
  }

  async speak(text: string, messageId: string): Promise<void> {
    if (!this.soundEnabled) {
      return;
    }

    if (this.spokenMessages.has(messageId)) {
      return;
    }

    if (!text.trim()) {
      return;
    }

    this.initialize();

    // Mark as spoken immediately to prevent duplicates
    this.spokenMessages.add(messageId);

    // Truncate long messages
    const truncatedText = this.truncateToSentences(text);

    // Stop any current speech
    this.stop();

    try {
      // Try bilingual TTS first
      const result = await BilingualTTS.speak(truncatedText, { interrupt: true });
      if (result.segmentsSpoken > 0) {
        return;
      }
    } catch (error) {
      // Apple Store Compliance: Silent fail - Graceful degradation
    }

    // Fallback to legacy TTS
    return new Promise((resolve, reject) => {
      try {
        const utterance = new SpeechSynthesisUtterance(truncatedText);
        const voice = this.getBestMaleVoice();
        
        if (voice) {
          utterance.voice = voice;
        }
        
        // Configure for mature male voice
        utterance.rate = 0.9;
        utterance.pitch = 0.7;
        utterance.volume = 1.0;
        utterance.lang = 'en-US';

        utterance.onstart = () => {
          window.dispatchEvent(new CustomEvent('avatar:talking:start'));
        };

        utterance.onend = () => {
          this.currentUtterance = null;
          window.dispatchEvent(new CustomEvent('avatar:talking:end'));
          resolve();
        };

        utterance.onerror = (event) => {
          this.currentUtterance = null;
          window.dispatchEvent(new CustomEvent('avatar:talking:end'));
          reject(new Error(event.error));
        };

        this.currentUtterance = utterance;
        speechSynthesis.speak(utterance);
        
      } catch (error) {
        reject(error);
      }
    });
  }

  clearHistory(): void {
    this.spokenMessages.clear();
  }
}

// Export singleton instance
export const SimpleTTS = new SimpleTTSService();

// Helper function for easy use
export const speakAssistantMessage = async (text: string, messageId: string): Promise<void> => {
  try {
    await SimpleTTS.speak(text, messageId);
  } catch (error) {
    // Fail soft - don't crash the UI
  }
};