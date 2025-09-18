/**
 * Unified Text-to-Speech Service
 * Replaces TomasVoice, SimpleTTS, BilingualTTS, and TTSManager
 * Features proper memory management and resource cleanup
 */

import { getBestEnglishVoice, getBestTurkishVoice, VOICE_CONFIG } from '@/config/voice';

export interface TTSOptions {
  interrupt?: boolean;
  language?: 'auto' | 'en-US' | 'tr-TR';
  context?: string;
}

export interface TTSResult {
  completed: boolean;
  skipped: boolean;
  durationMs: number;
  segmentsSpoken: number;
  totalSegments: number;
}

interface TextSegment {
  text: string;
  language: 'tr-TR' | 'en-US';
  cleanText: string;
}

interface QueuedSpeech {
  segments: TextSegment[];
  options: TTSOptions;
  resolve: (result: TTSResult) => void;
  reject: (error: Error) => void;
  id: string;
}

class UnifiedTTSService {
  // Core state
  private soundEnabled = true;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private speechQueue: QueuedSpeech[] = [];
  private isProcessing = false;
  
  // Resource management
  private audioContext: AudioContext | null = null;
  private eventListeners: Array<{ element: EventTarget; event: string; handler: EventListener }> = [];
  private activeTimers: Set<number> = new Set();
  
  // Voice caching
  private voiceCache: Map<string, SpeechSynthesisVoice | null> = new Map();
  private lastVoiceCheck = 0;
  private readonly VOICE_CACHE_TTL = 30000; // 30 seconds
  
  // Deduplication
  private spokenMessages = new Set<string>();
  private processingMessages = new Set<string>();
  
  // Performance monitoring
  private startTime = 0;
  private currentSpeechId: string | null = null;
  
  constructor() {
    this.setupGlobalEventListeners();
    this.setupVoiceChangeListener();
  }

  /**
   * Setup global event listeners with proper cleanup tracking
   */
  private setupGlobalEventListeners(): void {
    if (typeof window === 'undefined') return;

    // Cleanup on page unload
    const unloadHandler = () => this.destroy();
    window.addEventListener('beforeunload', unloadHandler);
    this.trackEventListener(window, 'beforeunload', unloadHandler);

    // Cleanup on visibility change (prevent background resource waste)
    const visibilityHandler = () => {
      if (document.hidden && this.isProcessing) {
        console.log('[UnifiedTTS] Page hidden, stopping speech');
        this.stop();
      }
    };
    document.addEventListener('visibilitychange', visibilityHandler);
    this.trackEventListener(document, 'visibilitychange', visibilityHandler);
  }

  /**
   * Track event listeners for proper cleanup
   */
  private trackEventListener(element: EventTarget, event: string, handler: EventListener): void {
    this.eventListeners.push({ element, event, handler });
  }

  /**
   * Setup voice change detection
   */
  private setupVoiceChangeListener(): void {
    const voicesChangedHandler = () => {
      console.log('[UnifiedTTS] Voices changed, clearing cache');
      this.voiceCache.clear();
      this.lastVoiceCheck = 0;
    };
    
    speechSynthesis.addEventListener('voiceschanged', voicesChangedHandler);
    this.trackEventListener(speechSynthesis, 'voiceschanged', voicesChangedHandler);
  }

  /**
   * Create timer with automatic tracking for cleanup
   */
  private createTimer(callback: () => void, delay: number): number {
    const timerId = window.setTimeout(() => {
      this.activeTimers.delete(timerId);
      callback();
    }, delay);
    this.activeTimers.add(timerId);
    return timerId;
  }

  /**
   * Clear specific timer
   */
  private clearTimer(timerId: number): void {
    if (this.activeTimers.has(timerId)) {
      clearTimeout(timerId);
      this.activeTimers.delete(timerId);
    }
  }

  /**
   * Initialize AudioContext with proper lifecycle management
   */
  private async initializeAudioContext(): Promise<void> {
    if (this.audioContext && this.audioContext.state !== 'closed') {
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      return;
    }

    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      console.log('[UnifiedTTS] AudioContext initialized');
    } catch (error) {
      console.warn('[UnifiedTTS] AudioContext initialization failed:', error);
      this.audioContext = null;
    }
  }

  /**
   * Get cached voice or fetch new one
   */
  private getCachedVoice(language: 'en-US' | 'tr-TR'): SpeechSynthesisVoice | null {
    const now = Date.now();
    const cacheKey = language;
    
    // Return cached voice if still valid
    if (now - this.lastVoiceCheck < this.VOICE_CACHE_TTL && this.voiceCache.has(cacheKey)) {
      return this.voiceCache.get(cacheKey) || null;
    }

    // Refresh cache
    const voice = language === 'tr-TR' ? getBestTurkishVoice() : getBestEnglishVoice();
    this.voiceCache.set(cacheKey, voice);
    this.lastVoiceCheck = now;
    
    return voice;
  }

  /**
   * Detect language of text segment
   */
  private detectLanguage(text: string, context?: string): 'tr-TR' | 'en-US' {
    // Context-based detection
    if (context) {
      const contextLower = context.toLowerCase();
      if (contextLower.includes('türkçe') || contextLower.includes('turkish')) {
        return 'tr-TR';
      }
      if (contextLower.includes('english')) {
        return 'en-US';
      }
    }

    // Character-based detection
    const turkishChars = /[ğĞşŞıİçÇöÖüÜ]/;
    if (turkishChars.test(text)) {
      return 'tr-TR';
    }

    // Word-based detection
    const turkishWords = /\b(bu|modülde|cümle|fiil|kullan|öğren|İngilizce|tabloya|bakın|lütfen|şimdi|aşağıdaki|için|ile|olan|değil|var|yok|evet|hayır)\b/i;
    if (turkishWords.test(text)) {
      return 'tr-TR';
    }

    return 'en-US';
  }

  /**
   * Clean text for speech
   */
  private cleanText(text: string): string {
    return text
      // Remove UI tokens
      .replace(/^(Q:|A:|→|•|\*|-|\d+\.)\s*/gm, '')
      // Remove emojis
      .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
      // Remove single letter brackets
      .replace(/\[[A-Za-z0-9]\]/g, '')
      // Remove headers that shouldn't be read
      .replace(/^(Objectives?|Page:\s*Lessons?|Module\s*\d+|Question\s*\d+)$/gim, '')
      // Normalize spaces
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Segment text into language-specific parts
   */
  private segmentText(text: string, options: TTSOptions): TextSegment[] {
    const cleanedText = this.cleanText(text);
    if (!cleanedText) return [];

    // Force specific language if requested
    if (options.language && options.language !== 'auto') {
      return [{
        text: cleanedText,
        language: options.language,
        cleanText: cleanedText
      }];
    }

    // Split by sentences and detect language for each
    const sentences = cleanedText.split(/([.!?;:])\s+/).filter(Boolean);
    const segments: TextSegment[] = [];

    for (let i = 0; i < sentences.length; i += 2) {
      const sentence = sentences[i] || '';
      const punctuation = sentences[i + 1] || '';
      const fullSentence = (sentence + punctuation).trim();
      
      if (!fullSentence) continue;

      const language = this.detectLanguage(fullSentence, options.context);
      const cleanText = this.cleanText(fullSentence);
      
      if (cleanText) {
        segments.push({
          text: fullSentence,
          language,
          cleanText
        });
      }
    }

    return segments;
  }

  /**
   * Configure utterance for specific language
   */
  private configureUtterance(utterance: SpeechSynthesisUtterance, segment: TextSegment): boolean {
    const voice = this.getCachedVoice(segment.language);
    if (!voice) {
      console.warn(`[UnifiedTTS] No voice available for ${segment.language}`);
      return false;
    }

    utterance.voice = voice;
    
    if (segment.language === 'tr-TR') {
      utterance.lang = VOICE_CONFIG.TURKISH.LANG;
      utterance.rate = VOICE_CONFIG.TURKISH.RATE;
      utterance.pitch = VOICE_CONFIG.TURKISH.PITCH;
      utterance.volume = VOICE_CONFIG.TURKISH.VOLUME;
    } else {
      utterance.lang = VOICE_CONFIG.ENGLISH.LANG;
      utterance.rate = VOICE_CONFIG.ENGLISH.RATE;
      utterance.pitch = VOICE_CONFIG.ENGLISH.PITCH;
      utterance.volume = VOICE_CONFIG.ENGLISH.VOLUME;
    }

    return true;
  }

  /**
   * Speak a single text segment
   */
  private speakSegment(segment: TextSegment): Promise<number> {
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(segment.cleanText);
      
      if (!this.configureUtterance(utterance, segment)) {
        resolve(0);
        return;
      }

      const startTime = Date.now();
      let hasEnded = false;

      const cleanup = () => {
        if (hasEnded) return;
        hasEnded = true;
        this.currentUtterance = null;
        const duration = Date.now() - startTime;
        resolve(duration);
      };

      utterance.onstart = () => {
        console.log(`[UnifiedTTS] Speaking ${segment.language}: ${segment.cleanText.substring(0, 50)}...`);
        this.emitSpeechEvent('start', { language: segment.language, text: segment.text });
      };

      utterance.onend = cleanup;
      utterance.onerror = (event) => {
        console.error(`[UnifiedTTS] Speech error:`, event.error);
        cleanup();
      };

      this.currentUtterance = utterance;
      speechSynthesis.speak(utterance);
    });
  }

  /**
   * Process the speech queue
   */
  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.speechQueue.length === 0) return;

    this.isProcessing = true;
    
    while (this.speechQueue.length > 0 && this.soundEnabled) {
      const item = this.speechQueue.shift()!;
      
      try {
        let totalDuration = 0;
        let segmentsSpoken = 0;

        for (const segment of item.segments) {
          if (!this.soundEnabled) break;
          
          const duration = await this.speakSegment(segment);
          totalDuration += duration;
          if (duration > 0) segmentsSpoken++;
          
          // Small pause between segments
          if (segmentsSpoken < item.segments.length) {
            await new Promise(resolve => this.createTimer(resolve, 100));
          }
        }

        item.resolve({
          completed: true,
          skipped: false,
          durationMs: totalDuration,
          segmentsSpoken,
          totalSegments: item.segments.length
        });

      } catch (error) {
        item.reject(error as Error);
      }
    }
    
    this.isProcessing = false;
    this.emitSpeechEvent('end');
  }

  /**
   * Emit speech events for UI coordination
   */
  private emitSpeechEvent(type: 'start' | 'end', detail?: any): void {
    try {
      const eventName = type === 'start' ? 'speech:start' : 'speech:end';
      const avatarEvent = type === 'start' ? 'avatar:talking:start' : 'avatar:talking:end';
      
      window.dispatchEvent(new CustomEvent(eventName, { detail }));
      window.dispatchEvent(new CustomEvent(avatarEvent, { detail }));
    } catch (error) {
      console.warn('[UnifiedTTS] Event emission failed:', error);
    }
  }

  // =============================================
  // PUBLIC API
  // =============================================

  /**
   * Main speak method
   */
  async speak(text: string, options: TTSOptions = {}): Promise<TTSResult> {
    if (!this.soundEnabled || !text?.trim()) {
      return {
        completed: false,
        skipped: true,
        durationMs: 0,
        segmentsSpoken: 0,
        totalSegments: 0
      };
    }

    // Initialize audio context if needed
    await this.initializeAudioContext();

    // Stop current speech if interrupt requested
    if (options.interrupt) {
      this.stop();
    }

    // Segment the text
    const segments = this.segmentText(text, options);
    if (segments.length === 0) {
      return {
        completed: false,
        skipped: true,
        durationMs: 0,
        segmentsSpoken: 0,
        totalSegments: 0
      };
    }

    // Add to queue and process
    return new Promise((resolve, reject) => {
      const speechId = `speech-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      this.speechQueue.push({
        segments,
        options,
        resolve,
        reject,
        id: speechId
      });
      
      this.processQueue();
    });
  }

  /**
   * Speak with message deduplication
   */
  async speakMessage(text: string, messageId?: string): Promise<TTSResult> {
    // Deduplication logic
    if (messageId) {
      if (this.spokenMessages.has(messageId) || this.processingMessages.has(messageId)) {
        return {
          completed: true,
          skipped: false,
          durationMs: 0,
          segmentsSpoken: 0,
          totalSegments: 0
        };
      }
      this.processingMessages.add(messageId);
    }

    try {
      const result = await this.speak(text, { interrupt: false });
      
      // Mark as spoken on successful completion
      if (messageId && result.completed && !result.skipped) {
        this.spokenMessages.add(messageId);
      }
      
      return result;
    } finally {
      if (messageId) {
        this.processingMessages.delete(messageId);
      }
    }
  }

  /**
   * Stop all speech
   */
  stop(): void {
    try {
      if (speechSynthesis.speaking || speechSynthesis.pending) {
        speechSynthesis.cancel();
      }
      this.currentUtterance = null;
      this.speechQueue = [];
      this.isProcessing = false;
      this.emitSpeechEvent('end');
    } catch (error) {
      console.warn('[UnifiedTTS] Stop error:', error);
    }
  }

  /**
   * Enable/disable sound
   */
  setSoundEnabled(enabled: boolean): void {
    console.log(`[UnifiedTTS] Sound enabled: ${enabled}`);
    this.soundEnabled = enabled;
    if (!enabled) {
      this.stop();
    }
  }

  /**
   * Get sound enabled status
   */
  getSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  /**
   * Check if currently speaking
   */
  get isSpeaking(): boolean {
    return this.isProcessing || speechSynthesis.speaking || this.currentUtterance !== null;
  }

  /**
   * Clear spoken message history
   */
  clearHistory(): void {
    this.spokenMessages.clear();
    this.processingMessages.clear();
  }

  /**
   * Get diagnostics
   */
  getDiagnostics() {
    return {
      soundEnabled: this.soundEnabled,
      isProcessing: this.isProcessing,
      queueLength: this.speechQueue.length,
      isSpeaking: this.isSpeaking,
      spokenMessages: this.spokenMessages.size,
      processingMessages: this.processingMessages.size,
      activeTimers: this.activeTimers.size,
      eventListeners: this.eventListeners.length,
      audioContextState: this.audioContext?.state || 'none',
      voiceCacheSize: this.voiceCache.size
    };
  }

  /**
   * Complete cleanup and resource destruction
   */
  destroy(): void {
    console.log('[UnifiedTTS] Destroying service...');
    
    // Stop speech
    this.stop();
    
    // Clear all timers
    this.activeTimers.forEach(timerId => clearTimeout(timerId));
    this.activeTimers.clear();
    
    // Remove event listeners
    this.eventListeners.forEach(({ element, event, handler }) => {
      try {
        element.removeEventListener(event, handler);
      } catch (error) {
        console.warn('[UnifiedTTS] Failed to remove event listener:', error);
      }
    });
    this.eventListeners = [];
    
    // Close audio context
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
      this.audioContext = null;
    }
    
    // Clear caches
    this.voiceCache.clear();
    this.spokenMessages.clear();
    this.processingMessages.clear();
    
    console.log('[UnifiedTTS] Service destroyed');
  }
}

// Singleton instance
export const UnifiedTTS = new UnifiedTTSService();

// Convenience functions
export const speakText = (text: string, options?: TTSOptions): Promise<TTSResult> => {
  return UnifiedTTS.speak(text, options);
};

export const speakAssistantMessage = (text: string, messageId?: string): Promise<TTSResult> => {
  return UnifiedTTS.speakMessage(text, messageId);
};