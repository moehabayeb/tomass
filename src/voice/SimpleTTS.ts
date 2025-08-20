/**
 * Simple, reliable TTS for Speaking App
 * Single voice source, hard-coded male voice, message deduplication
 */

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
    
    console.log('🎙️ SimpleTTS initializing...');
    
    // Wait for voices to load
    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.addEventListener('voiceschanged', () => {
        console.log('🎙️ Voices loaded:', speechSynthesis.getVoices().length);
      }, { once: true });
    }
    
    this.isInitialized = true;
    console.log('🎙️ SimpleTTS initialized');
  }

  private getBestMaleVoice(): SpeechSynthesisVoice | null {
    const voices = speechSynthesis.getVoices();
    console.log('🎙️ Available voices:', voices.map(v => v.name));
    
    // Try preferred voices first
    for (const preferredName of this.preferredVoices) {
      const voice = voices.find(v => 
        v.name.includes(preferredName) && v.lang.startsWith('en')
      );
      if (voice) {
        console.log('🎙️ Selected preferred voice:', voice.name);
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
      console.log('🎙️ Selected fallback male voice:', maleVoice.name);
      return maleVoice;
    }
    
    // Last resort: first English voice
    const englishVoice = voices.find(v => v.lang.startsWith('en'));
    if (englishVoice) {
      console.log('🎙️ Selected English voice:', englishVoice.name);
      return englishVoice;
    }
    
    console.warn('🎙️ No suitable voice found');
    return null;
  }

  private truncateToSentences(text: string, maxSentences: number = 2): string {
    // Split by sentence endings and take first 1-2 sentences
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    return sentences.slice(0, maxSentences).join('. ') + (sentences.length > maxSentences ? '.' : '');
  }

  setSoundEnabled(enabled: boolean): void {
    console.log('🎙️ SimpleTTS sound enabled:', enabled);
    this.soundEnabled = enabled;
    
    if (!enabled && this.currentUtterance) {
      this.stop();
    }
  }

  getSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  stop(): void {
    if (this.currentUtterance) {
      speechSynthesis.cancel();
      this.currentUtterance = null;
      console.log('🎙️ Speech stopped');
      
      // Emit avatar stop event
      window.dispatchEvent(new CustomEvent('avatar:talking:end'));
    }
  }

  async speak(text: string, messageId: string): Promise<void> {
    if (!this.soundEnabled) {
      console.log('🎙️ Speech disabled, skipping:', text.substring(0, 30));
      return;
    }

    if (this.spokenMessages.has(messageId)) {
      console.log('🎙️ Message already spoken:', messageId);
      return;
    }

    if (!text.trim()) {
      console.log('🎙️ Empty text, skipping');
      return;
    }

    this.initialize();

    // Mark as spoken immediately to prevent duplicates
    this.spokenMessages.add(messageId);

    // Truncate long messages
    const truncatedText = this.truncateToSentences(text);
    console.log('🎙️ Speaking:', truncatedText);

    // Stop any current speech
    this.stop();

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
          console.log('🎙️ Speech started');
          window.dispatchEvent(new CustomEvent('avatar:talking:start'));
        };

        utterance.onend = () => {
          console.log('🎙️ Speech ended');
          this.currentUtterance = null;
          window.dispatchEvent(new CustomEvent('avatar:talking:end'));
          resolve();
        };

        utterance.onerror = (event) => {
          console.error('🎙️ Speech error:', event.error);
          this.currentUtterance = null;
          window.dispatchEvent(new CustomEvent('avatar:talking:end'));
          reject(new Error(event.error));
        };

        this.currentUtterance = utterance;
        speechSynthesis.speak(utterance);
        
      } catch (error) {
        console.error('🎙️ Speech setup error:', error);
        reject(error);
      }
    });
  }

  clearHistory(): void {
    this.spokenMessages.clear();
    console.log('🎙️ Speech history cleared');
  }
}

// Export singleton instance
export const SimpleTTS = new SimpleTTSService();

// Helper function for easy use
export const speakAssistantMessage = async (text: string, messageId: string): Promise<void> => {
  try {
    await SimpleTTS.speak(text, messageId);
  } catch (error) {
    console.warn('🎙️ Speech failed softly:', error);
    // Fail soft - don't crash the UI
  }
};