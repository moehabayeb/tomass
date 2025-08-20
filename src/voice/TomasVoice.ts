import { getBestMaleVoice, configureUtterance } from '@/config/voice';

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
    // Initialize on first user interaction
    document.addEventListener('click', this.initIfNeeded.bind(this), { once: true });
    document.addEventListener('touchstart', this.initIfNeeded.bind(this), { once: true });
  }

  initIfNeeded(): void {
    if (this.isInitialized) return;
    
    try {
      // Initialize audio context for iOS Safari compatibility
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.isInitialized = true;
      console.log('🎙️ TomasVoice initialized');
      
      // Ensure voices are loaded
      this.ensureVoicesLoaded();
    } catch (error) {
      console.warn('🎙️ AudioContext initialization failed:', error);
      this.isInitialized = true; // Continue without AudioContext
    }
  }

  private ensureVoicesLoaded(): void {
    // Wait for voices to be loaded if they aren't already
    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.addEventListener('voiceschanged', () => {
        console.log('🎙️ Voices loaded, ready to speak');
      }, { once: true });
    }
  }

  setSoundEnabled(enabled: boolean): void {
    this.soundEnabled = enabled;
    if (!enabled) {
      this.stop();
    }
  }

  getSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  speak(text: string, options: SpeechOptions = {}): Promise<SpeechResult> {
    return new Promise((resolve, reject) => {
      if (!this.soundEnabled) {
        resolve({ durationMs: 0 });
        return;
      }

      if (!text || !text.trim()) {
        resolve({ durationMs: 0 });
        return;
      }

      this.initIfNeeded();

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
            console.log('🎙️ Thomas started speaking:', text.substring(0, 50) + '...');
            this.emitEvent('speech:start', { text });
            this.emitEvent('avatar:talking:start');
          };
          
          utterance.onend = () => {
            const duration = Date.now() - startTime;
            console.log('🎙️ Thomas finished speaking in', duration + 'ms');
            this.currentUtterance = null;
            this.emitEvent('speech:end', { text, duration });
            this.emitEvent('avatar:talking:end');
            resolve({ durationMs: duration });
          };
          
          utterance.onerror = (event) => {
            console.error('🎙️ TTS error:', event.error);
            this.currentUtterance = null;
            this.emitEvent('speech:end', { text, error: event.error });
            this.emitEvent('avatar:talking:end');
            // Don't reject - fallback gracefully
            resolve({ durationMs: 0 });
          };
          
          this.currentUtterance = utterance;
          speechSynthesis.speak(utterance);
          
        } catch (error) {
          console.error('🎙️ TomasVoice error:', error);
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
          console.warn('🎙️ Voices not loaded after timeout, speaking anyway');
          speechSynthesis.removeEventListener('voiceschanged', voicesHandler);
          speakWhenReady();
        }, 1000);
      }
    });
  }

  stop(): void {
    try {
      if (speechSynthesis.speaking || speechSynthesis.pending) {
        speechSynthesis.cancel();
      }
      this.currentUtterance = null;
      this.emitEvent('speech:end', { interrupted: true });
      this.emitEvent('avatar:talking:end');
    } catch (error) {
      console.warn('🎙️ Stop error:', error);
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
      console.warn('🎙️ Event emission failed:', error);
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
