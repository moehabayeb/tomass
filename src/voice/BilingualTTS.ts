import { getBestEnglishVoice, getBestTurkishVoice, configureUtterance, VOICE_CONFIG } from '@/config/voice';

// Feature flag for bilingual TTS (controlled by voice upgrade)
const TTS_MULTI_LANG_ENABLED = () => VOICE_CONFIG.UPGRADE_ENABLED;

interface TextSegment {
  text: string;
  language: 'tr-TR' | 'en-US';
  cleanText: string;
}

interface BilingualTTSOptions {
  interrupt?: boolean;
  context?: string; // Context like "Turkish explanation", "English prompt", etc.
}

interface TTSResult {
  durationMs: number;
  segmentsSpoken: number;
}

class BilingualTTSService {
  private soundEnabled = true;
  private speechQueue: TextSegment[] = [];
  private isProcessing = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private cachedTurkishVoice: SpeechSynthesisVoice | null = null;
  private cachedEnglishVoice: SpeechSynthesisVoice | null = null;
  private turkishVoiceWarningShown = false;
  private englishVoiceWarningShown = false;

  constructor() {
    this.ensureVoicesLoaded();
  }

  private ensureVoicesLoaded(): void {
    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.addEventListener('voiceschanged', () => {
        console.log('🎙️ [BilingualTTS] Voices loaded, clearing cache');
        this.clearVoiceCache();
      }, { once: true });
    }
  }

  private clearVoiceCache(): void {
    this.cachedTurkishVoice = null;
    this.cachedEnglishVoice = null;
  }

  setSoundEnabled(enabled: boolean): void {
    console.log('🎙️ [BilingualTTS] Sound enabled:', enabled);
    this.soundEnabled = enabled;
    if (!enabled) {
      this.stop();
    }
  }

  getSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  /**
   * Main speak function with bilingual support
   */
  async speak(text: string, options: BilingualTTSOptions = {}): Promise<TTSResult> {
    if (!TTS_MULTI_LANG_ENABLED()) {
      // Fallback to simple TTS when feature is disabled
      return this.fallbackToSimpleTTS(text);
    }

    if (!this.soundEnabled || !text?.trim()) {
      return { durationMs: 0, segmentsSpoken: 0 };
    }

    if (options.interrupt) {
      this.stop();
    }

    // Segment and detect language for each part
    const segments = this.segmentAndDetectLanguage(text, options.context);
    
    if (segments.length === 0) {
      return { durationMs: 0, segmentsSpoken: 0 };
    }

    // Add segments to queue
    this.speechQueue.push(...segments);

    // Process queue
    return this.processQueue();
  }

  /**
   * Segment text and detect language for each segment
   */
  private segmentAndDetectLanguage(text: string, context?: string): TextSegment[] {
    // Clean the text first
    const cleanedText = this.cleanTextForSpeech(text);
    
    if (!cleanedText.trim()) {
      return [];
    }

    // Split by sentences while preserving punctuation
    const sentences = cleanedText.split(/([.!?;:])\s+/).filter(Boolean);
    const segments: TextSegment[] = [];

    // Group sentences back together with their punctuation
    for (let i = 0; i < sentences.length; i += 2) {
      const sentence = sentences[i] || '';
      const punctuation = sentences[i + 1] || '';
      const fullSentence = (sentence + punctuation).trim();
      
      if (!fullSentence) continue;

      const language = this.detectLanguage(fullSentence, context);
      const cleanText = this.cleanTextForSpeech(fullSentence);
      
      if (cleanText.trim()) {
        segments.push({
          text: fullSentence,
          language,
          cleanText
        });

        console.log(`[TTS] lang=${language} len=${cleanText.length} text="${cleanText.substring(0, 50)}${cleanText.length > 50 ? '...' : ''}"`);
      }
    }

    return segments;
  }

  /**
   * Detect language for a text segment
   */
  private detectLanguage(text: string, context?: string): 'tr-TR' | 'en-US' {
    // Context rule - check for Turkish/English labeled sections
    if (context) {
      const contextLower = context.toLowerCase();
      if (contextLower.includes('türkçe') || contextLower.includes('turkish') || 
          contextLower.includes('açıklama') || contextLower.includes('konu anlatımı') ||
          contextLower.includes('örnek cümleler')) {
        return 'tr-TR';
      }
      if (contextLower.includes('english') || contextLower.includes('example sentences') ||
          contextLower.includes('speaking practice') || contextLower.includes('say:')) {
        return 'en-US';
      }
    }

    // Text-based context rules
    const textLower = text.toLowerCase();
    
    // Turkish section indicators
    if (textLower.includes('🟩 türkçe açıklama') || 
        textLower.includes('türkçe açıklama') ||
        textLower.includes('konu anlatımı') ||
        textLower.includes('örnek cümleler') && !textLower.includes('example sentences')) {
      return 'tr-TR';
    }

    // English section indicators  
    if (textLower.includes('example sentences') ||
        textLower.includes('speaking practice') ||
        textLower.startsWith('say:') ||
        textLower.includes('say: "')) {
      return 'en-US';
    }

    // Character rule - Turkish characters
    const turkishChars = /[ğĞşŞıİçÇöÖüÜ]/;
    if (turkishChars.test(text)) {
      return 'tr-TR';
    }

    // Turkish word patterns
    const turkishWords = /\b(bu|modülde|cümle|fiil|kullan|öğren|İngilizce|tabloya|bakın|lütfen|şimdi|aşağıdaki|için|ile|olan|olan|değil|var|yok|evet|hayır|ne|nasıl|nerede|kim|hangi)\b/i;
    if (turkishWords.test(text)) {
      return 'tr-TR';
    }

    // Default to English
    return 'en-US';
  }

  /**
   * Clean text for speech - remove UI tokens, emojis, etc.
   */
  private cleanTextForSpeech(text: string): string {
    let cleaned = text;

    // Remove UI tokens and prefixes
    cleaned = cleaned.replace(/^(Q:|A:|→|•|\*|-|\d+\.)\s*/gm, '');
    
    // Remove emojis and decorative elements
    cleaned = cleaned.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '');
    
    // Remove brackets with single letters/numbers [A], [1], etc.
    cleaned = cleaned.replace(/\[[A-Za-z0-9]\]/g, '');
    
    // Remove headings that shouldn't be read
    cleaned = cleaned.replace(/^(Objectives?|Page:\s*Lessons?|Module\s*\d+|Question\s*\d+)$/gim, '');
    
    // Remove multiple spaces and clean up
    cleaned = cleaned.replace(/\s+/g, ' ').trim();

    return cleaned;
  }

  /**
   * Get best Turkish voice using enhanced voice system
   */
  private getTurkishVoice(): SpeechSynthesisVoice | null {
    // Use the enhanced voice selection from voice.ts
    const voice = getBestTurkishVoice();
    if (voice && !this.turkishVoiceWarningShown) {
      this.cachedTurkishVoice = voice;
    } else if (!voice && !this.turkishVoiceWarningShown) {
      this.turkishVoiceWarningShown = true;
      console.warn('[TTS] unavailable tr → skipped');
    }
    return voice;
  }

  /**
   * Get best English voice using enhanced voice system
   */
  private getEnglishVoice(): SpeechSynthesisVoice | null {
    // Use the enhanced voice selection from voice.ts  
    const voice = getBestEnglishVoice();
    if (voice && !this.englishVoiceWarningShown) {
      this.cachedEnglishVoice = voice;
    } else if (!voice && !this.englishVoiceWarningShown) {
      this.englishVoiceWarningShown = true;
      console.warn('[TTS] unavailable en → skipped');
    }
    return voice;
  }

  /**
   * Configure utterance for specific language
   */
  private configureUtteranceForLanguage(utterance: SpeechSynthesisUtterance, segment: TextSegment): void {
    if (segment.language === 'tr-TR') {
      const turkishVoice = this.getTurkishVoice();
      if (turkishVoice) {
        utterance.voice = turkishVoice;
        utterance.lang = VOICE_CONFIG.TURKISH.LANG;
        utterance.rate = VOICE_CONFIG.TURKISH.RATE;
        utterance.pitch = VOICE_CONFIG.TURKISH.PITCH;
        utterance.volume = VOICE_CONFIG.TURKISH.VOLUME;
      } else {
        // Skip Turkish segments if no voice available
        return;
      }
    } else {
      // English - use enhanced configuration
      const englishVoice = this.getEnglishVoice();
      if (englishVoice) {
        utterance.voice = englishVoice;
        utterance.lang = VOICE_CONFIG.ENGLISH.LANG;
        utterance.rate = VOICE_CONFIG.ENGLISH.RATE;
        utterance.pitch = VOICE_CONFIG.ENGLISH.PITCH;
        utterance.volume = VOICE_CONFIG.ENGLISH.VOLUME;
      } else {
        // Skip English segments if no voice available
        return;
      }
    }
  }

  /**
   * Process the speech queue
   */
  private async processQueue(): Promise<TTSResult> {
    if (this.isProcessing || this.speechQueue.length === 0) {
      return { durationMs: 0, segmentsSpoken: 0 };
    }

    this.isProcessing = true;
    let totalDuration = 0;
    let segmentsSpoken = 0;

    while (this.speechQueue.length > 0 && this.soundEnabled) {
      const segment = this.speechQueue.shift()!;
      
      try {
        const duration = await this.speakSegment(segment);
        totalDuration += duration;
        segmentsSpoken++;
        
        // Small pause between segments
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error('🎙️ [BilingualTTS] Error speaking segment:', error);
      }
    }

    this.isProcessing = false;
    return { durationMs: totalDuration, segmentsSpoken };
  }

  /**
   * Speak a single segment
   */
  private speakSegment(segment: TextSegment): Promise<number> {
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(segment.cleanText);
      this.configureUtteranceForLanguage(utterance, segment);
      
      // If no suitable voice found, skip this segment
      if (!utterance.voice) {
        console.log(`🎙️ [BilingualTTS] Skipping ${segment.language} segment - no voice available`);
        resolve(0);
        return;
      }

      const startTime = Date.now();
      
      utterance.onstart = () => {
        console.log(`🎙️ [BilingualTTS] Speaking ${segment.language}:`, segment.cleanText.substring(0, 50));
      };
      
      utterance.onend = () => {
        const duration = Date.now() - startTime;
        this.currentUtterance = null;
        resolve(duration);
      };
      
      utterance.onerror = (event) => {
        console.error('🎙️ [BilingualTTS] Speech error:', event.error);
        this.currentUtterance = null;
        resolve(0); // Graceful fallback
      };

      this.currentUtterance = utterance;
      speechSynthesis.speak(utterance);
    });
  }

  /**
   * Stop all speech
   */
  stop(): void {
    try {
      if (speechSynthesis.speaking || speechSynthesis.pending) {
        speechSynthesis.cancel();
      }
      this.speechQueue = [];
      this.currentUtterance = null;
      this.isProcessing = false;
    } catch (error) {
      console.warn('🎙️ [BilingualTTS] Stop error:', error);
    }
  }

  /**
   * Fallback to simple TTS when bilingual feature is disabled
   */
  private async fallbackToSimpleTTS(text: string): Promise<TTSResult> {
    return new Promise((resolve) => {
      const cleanText = this.cleanTextForSpeech(text);
      if (!cleanText.trim()) {
        resolve({ durationMs: 0, segmentsSpoken: 0 });
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      configureUtterance(utterance, cleanText);
      
      const startTime = Date.now();
      
      utterance.onend = () => {
        const duration = Date.now() - startTime;
        resolve({ durationMs: duration, segmentsSpoken: 1 });
      };
      
      utterance.onerror = () => {
        resolve({ durationMs: 0, segmentsSpoken: 0 });
      };

      speechSynthesis.speak(utterance);
    });
  }

  get isSpeaking(): boolean {
    return speechSynthesis.speaking || this.currentUtterance !== null;
  }
}

// Singleton instance
export const BilingualTTS = new BilingualTTSService();

// Helper function for components to use bilingual TTS
export const speakBilingualText = (text: string, options: BilingualTTSOptions = {}): Promise<TTSResult> => {
  return BilingualTTS.speak(text, options);
};