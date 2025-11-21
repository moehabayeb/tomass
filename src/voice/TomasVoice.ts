import { configureUtterance } from '@/config/voice';
import { BilingualTTS } from './BilingualTTS';

interface SpeechOptions {
  interrupt?: boolean;
}

interface SpeechResult {
  durationMs: number;
}

class TomasVoiceService {
  private audioContext: AudioContext | null = null;
  private isInitialized = false;
  private speechQueue: Array<{ text: string; resolve: (result: SpeechResult) => void; reject: (error: Error) => void; options?: SpeechOptions }> = [];
  private isProcessing = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private soundEnabled = true;
  private spokenMessageIds = new Set<string>();

  constructor() {
    // Initialize voices immediately
    this.ensureVoicesLoaded();
  }

  initIfNeeded(): void {
    if (this.isInitialized) return;
    
    try {
      // Initialize audio context for iOS Safari compatibility
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
      this.isInitialized = true;
    } catch (error) {
      this.isInitialized = true; // Continue without AudioContext
    }
  }

  private ensureVoicesLoaded(): void {
    // Wait for voices to be loaded if they aren't already
    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.addEventListener('voiceschanged', () => {
      }, { once: true });
    }
  }

  setSoundEnabled(enabled: boolean): void {
    this.soundEnabled = enabled;
    BilingualTTS.setSoundEnabled(enabled); // Sync with bilingual TTS
    if (!enabled) {
      this.stop();
    } else {
      // Initialize TTS when sound is first enabled
      this.initIfNeeded();
      // Test TTS immediately
      this.testVoice();
    }
  }

  private testVoice(): void {
    // Quick test to ensure TTS is working
    const testText = "Sound is now on";
    this.speak(testText, { interrupt: true }).catch(error => {
    });
  }

  getSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  speak(text: string, options: SpeechOptions = {}): Promise<SpeechResult> {
    return new Promise(async (resolve, reject) => {
      if (!this.soundEnabled) {
        resolve({ durationMs: 0 });
        return;
      }

      if (!text || !text.trim()) {
        resolve({ durationMs: 0 });
        return;
      }

      this.initIfNeeded();

      // Try bilingual TTS first
      try {
        const result = await BilingualTTS.speak(text, { interrupt: options.interrupt });
        resolve({ durationMs: result.durationMs });
        return;
      } catch (error) {
        // Apple Store Compliance: Silent fail - Graceful degradation
      }

      // Fallback to original TTS logic
      // If interrupt requested, clear queue and stop current
      if (options.interrupt) {
        this.stop();
        this.speechQueue = [];
      }

      // Add to queue
      this.speechQueue.push({ text: text.trim(), resolve, reject, options });
      this.processQueue();
    });
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.speechQueue.length === 0) return;
    
    this.isProcessing = true;
    
    while (this.speechQueue.length > 0 && this.soundEnabled) {
      const item = this.speechQueue.shift()!;
      
      try {
        const result = await this.speakText(item.text);
        item.resolve(result);
      } catch (error) {
        item.reject(error as Error);
      }
    }
    
    this.isProcessing = false;
  }

  private speakText(text: string): Promise<SpeechResult> {
    return new Promise((resolve, reject) => {
      // Wait for voices to be ready
      const speakWhenReady = () => {
        try {
          const utterance = new SpeechSynthesisUtterance(text);
          configureUtterance(utterance, text);
          
          const startTime = Date.now();
          
          utterance.onstart = () => {
            this.emitEvent('speech:start', { text });
            this.emitEvent('avatar:talking:start');
          };
          
          utterance.onend = () => {
            const duration = Date.now() - startTime;
            this.currentUtterance = null;
            this.emitEvent('speech:end', { text, duration });
            this.emitEvent('avatar:talking:end');
            resolve({ durationMs: duration });
          };
          
          utterance.onerror = (event) => {
            this.currentUtterance = null;
            this.emitEvent('speech:end', { text, error: event.error });
            this.emitEvent('avatar:talking:end');
            // Don't reject - fallback gracefully
            resolve({ durationMs: 0 });
          };
          
          this.currentUtterance = utterance;
          speechSynthesis.speak(utterance);
          
        } catch (error) {
          this.emitEvent('avatar:talking:end');
          resolve({ durationMs: 0 }); // Graceful fallback
        }
      };

      // Check if voices are loaded
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        speakWhenReady();
      } else {
        // Wait for voices to load, with timeout
        let timeoutId: NodeJS.Timeout;
        const voicesHandler = () => {
          clearTimeout(timeoutId);
          speechSynthesis.removeEventListener('voiceschanged', voicesHandler);
          speakWhenReady();
        };
        
        speechSynthesis.addEventListener('voiceschanged', voicesHandler);
        
        // Fallback timeout - speak anyway after 1 second
        timeoutId = setTimeout(() => {
          speechSynthesis.removeEventListener('voiceschanged', voicesHandler);
          speakWhenReady();
        }, 1000);
      }
    });
  }

  stop(): void {
    try {
      BilingualTTS.stop(); // Stop bilingual TTS too
      if (speechSynthesis.speaking || speechSynthesis.pending) {
        speechSynthesis.cancel();
      }
      this.currentUtterance = null;
      this.emitEvent('speech:end', { interrupted: true });
      this.emitEvent('avatar:talking:end');
    } catch (error) {
      // Apple Store Compliance: Silent fail - User experience preservation
    }
  }

  // Track spoken messages to avoid duplicates
  markAsSpoken(messageId: string): void {
    this.spokenMessageIds.add(messageId);
  }

  hasBeenSpoken(messageId: string): boolean {
    return this.spokenMessageIds.has(messageId);
  }

  clearSpokenHistory(): void {
    this.spokenMessageIds.clear();
  }

  private emitEvent(eventName: string, detail?: any): void {
    try {
      const event = new CustomEvent(eventName, { detail });
      window.dispatchEvent(event);
    } catch (error) {
      // Apple Store Compliance: Silent fail - Non-critical operation
    }
  }

  // Get speaking status
  get isSpeaking(): boolean {
    return speechSynthesis.speaking || this.currentUtterance !== null;
  }
}

// Singleton instance
export const TomasVoice = new TomasVoiceService();

// Helper function for components
export const speakAssistantMessage = (text: string, messageId?: string): Promise<SpeechResult> => {
  // Don't speak if already spoken
  if (messageId && TomasVoice.hasBeenSpoken(messageId)) {
    return Promise.resolve({ durationMs: 0 });
  }

  // Mark as spoken
  if (messageId) {
    TomasVoice.markAsSpoken(messageId);
  }

  // Truncate very long messages to keep conversational
  const maxLength = 200;
  let spokenText = text;
  if (text.length > maxLength) {
    // Find the last sentence within limit
    const truncated = text.substring(0, maxLength);
    const lastPeriod = truncated.lastIndexOf('.');
    const lastExclamation = truncated.lastIndexOf('!');
    const lastQuestion = truncated.lastIndexOf('?');
    const lastSentenceEnd = Math.max(lastPeriod, lastExclamation, lastQuestion);
    
    if (lastSentenceEnd > maxLength * 0.7) {
      spokenText = text.substring(0, lastSentenceEnd + 1);
    } else {
      spokenText = truncated + '...';
    }
  }

  return TomasVoice.speak(spokenText);
};
