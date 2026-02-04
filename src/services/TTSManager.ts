import { configureUtterance, VoiceConsistencyManager } from '@/config/voice';
import { Capacitor } from '@capacitor/core';
import { UnifiedTTSService } from './UnifiedTTSService';

interface TTSChunk {
  text: string;
  index: number;
  total: number;
}

interface TTSOptions {
  canSkip?: boolean;
  onProgress?: (chunk: TTSChunk) => void;
  onSkip?: () => void;
}

interface TTSResult {
  completed: boolean;
  skipped: boolean;
  chunksSpoken: number;
  totalChunks: number;
  durationMs: number;
}

interface TTSLog {
  event: 'TTS_START' | 'TTS_CHUNK_END' | 'TTS_COMPLETE' | 'TTS_SKIP' | 'TTS_RETRY' | 'TTS_ERROR';
  textLength: number;
  duration?: number;
  chunkIndex?: number;
  totalChunks?: number;
  error?: string;
}

class TTSManagerService {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentChunks: string[] = [];
  private currentChunkIndex = 0;
  private currentResolve: ((result: TTSResult) => void) | null = null;
  private currentReject: ((error: Error) => void) | null = null;
  private startTime = 0;
  private watchdogTimer: number | null = null;
  private retryCount = 0;
  private maxRetries = 1;
  private isSkipped = false;
  private isEnabled = true;
  private onProgressCallback: ((chunk: TTSChunk) => void) | null = null;
  private onSkipCallback: (() => void) | null = null;

  // Feature flag
  private readonly STRICT_QUEUE = true; // TTS_STRICT_QUEUE default ON

  // Idempotent play gate for V2
  private playedMessages = new Map<string, boolean>();
  private currentMessageId: string | null = null;

  public busy = false;

  // 🔧 v66 BULLETPROOF iOS FIX: Track speaking state for STT coordination
  // This prevents TTS/STT audio session conflicts on iOS
  private _isSpeakingInternal = false;
  private lastSpeakEndTime = 0;
  private readonly AUDIO_SESSION_SETTLE_MS = 150; // iOS needs time to switch audio modes

  constructor() {
    // Ensure audio context is unlocked on first user gesture
    this.ensureAudioContextUnlocked();
    
    // 🎯 CRITICAL: Initialize voice consistency on first use
    this.initializeVoiceConsistency();
  }

  private async initializeVoiceConsistency(): Promise<void> {
    try {
      // Apple Store Compliance: Silent initialization
      await VoiceConsistencyManager.initialize();
      const voiceInfo = VoiceConsistencyManager.getVoiceInfo();
      // Voice consistency initialized successfully
    } catch (error) {
      // Apple Store Compliance: Silent fail - voice consistency is optional enhancement
    }
  }

  private ensureAudioContextUnlocked() {
    const unlock = () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        if (audioContext.state === 'suspended') {
          audioContext.resume();
        }
        audioContext.close();
        document.removeEventListener('click', unlock);
        document.removeEventListener('touchstart', unlock);
      } catch (e) {
        // Ignore errors
      }
    };

    document.addEventListener('click', unlock, { once: true });
    document.addEventListener('touchstart', unlock, { once: true });
  }

  private normalizeText(text: string): string {
    return text
      .replace(/<[^>]*>/g, '') // Strip HTML
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/[""]|['']/g, '"') // Normalize quotes
      .replace(/['']/g, "'") // Normalize apostrophes
      .trim();
  }

  private chunkText(text: string, maxLength = 190): string[] {
    const normalized = this.normalizeText(text);
    if (normalized.length <= maxLength) {
      return [normalized];
    }

    // Robust sentence splitting - keeps final sentence intact
    // Regex: (?<=[.!?…][""')]*)\s+ - splits after punctuation + optional quotes/brackets + whitespace
    const sentences = normalized.split(/(?<=[.!?…][""')]*)\s+/).filter(s => s.trim().length > 0);
    
    if (sentences.length <= 1) {
      return [normalized]; // Single sentence, don't split further
    }

    const chunks: string[] = [];
    let currentChunk = '';

    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i].trim();
      const potential = currentChunk + (currentChunk ? ' ' : '') + sentence;

      if (potential.length <= maxLength) {
        currentChunk = potential;
      } else {
        // Current chunk is full, save it and start new chunk
        if (currentChunk) {
          chunks.push(currentChunk.trim());
          currentChunk = sentence;
        } else {
          // Single sentence too long, keep it as one chunk anyway
          chunks.push(sentence);
          currentChunk = '';
        }
      }
    }

    // Always include the final chunk, even if short
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }

    // Ensure we never return empty array
    return chunks.length > 0 ? chunks : [normalized];
  }

  private log(event: TTSLog): void {
    const debug = new URLSearchParams(window.location.search).has('sttdebug');
    if (debug) {
    }
  }

  private logQueueEvent(event: string, extra: any = {}): void {
    const debug = new URLSearchParams(window.location.search).has('sttdebug');
    if (debug) {
    }
  }

  private clearWatchdog(): void {
    if (this.watchdogTimer) {
      clearTimeout(this.watchdogTimer);
      this.watchdogTimer = null;
    }
  }

  private startWatchdog(chunkIndex: number): void {
    this.clearWatchdog();
    this.watchdogTimer = window.setTimeout(() => {
      
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        this.log({
          event: 'TTS_RETRY',
          textLength: this.currentChunks[chunkIndex]?.length || 0,
          chunkIndex,
          totalChunks: this.currentChunks.length
        });
        this.speakChunk(chunkIndex);
      } else {
        // Move to next chunk
        this.onChunkComplete(chunkIndex);
      }
    }, 2500);
  }

  private speakChunk(chunkIndex: number): void {
    if (!this.currentChunks[chunkIndex] || this.isSkipped) {
      return;
    }

    const text = this.currentChunks[chunkIndex];
    this.retryCount = 0;

    this.logQueueEvent(`TTS_CHUNK ${chunkIndex + 1}/${this.currentChunks.length} starting`, {
      text: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
      length: text.length
    });

    try {
      this.currentUtterance = new SpeechSynthesisUtterance(text);
      
      // 🎯 CRITICAL: Use VoiceConsistencyManager for GUARANTEED voice consistency
      const voiceConfigured = VoiceConsistencyManager.configureUtterance(this.currentUtterance, text);
      if (!voiceConfigured) {
        // Apple Store Compliance: Silent fallback - voice configuration failed
        // Fallback to old method as last resort
        configureUtterance(this.currentUtterance, text);
      } else {
        // Validate that the utterance uses the correct voice
        const isValid = VoiceConsistencyManager.validateUtterance(this.currentUtterance);
        if (!isValid) {
          // Apple Store Compliance: Silent validation - voice may vary but TTS will continue
        }
      }

      this.currentUtterance.onstart = () => {
        this.clearWatchdog();
        this.logQueueEvent(`TTS_CHUNK ${chunkIndex + 1}/${this.currentChunks.length} onstart`);
      };

      this.currentUtterance.onend = () => {
        this.clearWatchdog();
        this.logQueueEvent(`TTS_CHUNK ${chunkIndex + 1}/${this.currentChunks.length} onend`);
        this.onChunkComplete(chunkIndex);
      };

      this.currentUtterance.onerror = (event) => {
        this.clearWatchdog();
        
        if (this.retryCount < this.maxRetries) {
          this.retryCount++;
          this.logQueueEvent(`TTS_RETRY ${chunkIndex + 1}`, { error: event.error });
          this.log({
            event: 'TTS_RETRY',
            textLength: text.length,
            chunkIndex,
            totalChunks: this.currentChunks.length,
            error: event.error
          });
          setTimeout(() => this.speakChunk(chunkIndex), 100);
        } else {
          this.onChunkComplete(chunkIndex);
        }
      };

      // Start watchdog before speaking
      this.startWatchdog(chunkIndex);
      speechSynthesis.speak(this.currentUtterance);

    } catch (error) {
      this.clearWatchdog();
      this.log({
        event: 'TTS_ERROR',
        textLength: text.length,
        chunkIndex,
        totalChunks: this.currentChunks.length,
        error: error instanceof Error ? error.message : String(error)
      });
      this.onChunkComplete(chunkIndex);
    }
  }

  private onChunkComplete(chunkIndex: number): void {
    if (this.isSkipped) {
      return;
    }

    this.log({
      event: 'TTS_CHUNK_END',
      textLength: this.currentChunks[chunkIndex]?.length || 0,
      chunkIndex,
      totalChunks: this.currentChunks.length
    });

    // Notify progress
    if (this.onProgressCallback) {
      this.onProgressCallback({
        text: this.currentChunks[chunkIndex] || '',
        index: chunkIndex + 1,
        total: this.currentChunks.length
      });
    }

    // Move to next chunk or complete
    const nextIndex = chunkIndex + 1;
    if (nextIndex < this.currentChunks.length) {
      this.currentChunkIndex = nextIndex;
      // Inter-chunk delay to avoid Safari missing final onend
      setTimeout(() => this.speakChunk(nextIndex), 120);
    } else {
      // All chunks complete
      this.logQueueEvent('TTS_COMPLETE', { chunks: this.currentChunks.length });
      this.complete(false);
    }
  }

  private complete(skipped: boolean): void {
    const duration = Date.now() - this.startTime;

    if (skipped) {
      this.logQueueEvent('TTS_SKIP');
    }

    this.log({
      event: skipped ? 'TTS_SKIP' : 'TTS_COMPLETE',
      textLength: this.currentChunks.join(' ').length,
      duration,
      totalChunks: this.currentChunks.length
    });

    this.busy = false;
    this.clearWatchdog();
    this.currentUtterance = null;

    // 🔧 v66 BULLETPROOF iOS FIX: Signal audio session release
    // This allows STT to safely start after TTS completes
    this._isSpeakingInternal = false;
    this.lastSpeakEndTime = Date.now();
    console.log('[TTSManager] v66: Audio session released, STT can start');

    if (this.currentResolve) {
      this.currentResolve({
        completed: !skipped,
        skipped,
        chunksSpoken: skipped ? this.currentChunkIndex : this.currentChunks.length,
        totalChunks: this.currentChunks.length,
        durationMs: duration
      });
      this.currentResolve = null;
      this.currentReject = null;
    }
  }

  public setSoundEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    if (!enabled) {
      this.skip();
    }
  }

  public getSoundEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * Check if global sound is enabled by looking at localStorage
   */
  private getGlobalSoundEnabled(): boolean {
    try {
      const saved = localStorage.getItem('app.sound.enabled');
      return saved !== null ? saved === 'true' : true; // Default true
    } catch {
      return true; // Default true if localStorage fails
    }
  }

  public async play(messageId: string, text: string, options: TTSOptions = {}): Promise<TTSResult> {
    // Check global sound setting first
    const globalSoundEnabled = this.getGlobalSoundEnabled();
    if (!globalSoundEnabled) {
      return {
        completed: false,
        skipped: true,
        chunksSpoken: 0,
        totalChunks: 0,
        durationMs: 0
      };
    }

    // Idempotent gate - return immediately if already played
    if (this.playedMessages.get(messageId)) {
      return {
        completed: true,
        skipped: false,
        chunksSpoken: 0,
        totalChunks: 0,
        durationMs: 0
      };
    }

    this.currentMessageId = messageId;
    const result = await this.speak(text, options);
    
    // Mark as played only after successful completion
    if (result.completed && !result.skipped) {
      this.playedMessages.set(messageId, true);
    }
    
    return result;
  }

  public async speak(text: string, options: TTSOptions = {}): Promise<TTSResult> {
    // 🎯 ANDROID FIX: Route to native TTS on Android/iOS
    if (Capacitor.isNativePlatform()) {
      return this.speakNative(text, options);
    }

    // 🎯 CRITICAL: Ensure voice consistency is initialized before speaking
    if (!VoiceConsistencyManager.getVoiceInfo().isInitialized) {
      // Apple Store Compliance: Silent initialization before first speak
      await VoiceConsistencyManager.initialize();
    }

    // Check global sound setting first
    const globalSoundEnabled = this.getGlobalSoundEnabled();
    if (!globalSoundEnabled || !this.isEnabled) {
      return {
        completed: false,
        skipped: true,
        chunksSpoken: 0,
        totalChunks: 0,
        durationMs: 0
      };
    }

    // Clear any previous synthesis before starting new prompt (but not during playback)
    try {
      speechSynthesis.cancel();
    } catch (e) {
      // Ignore errors
    }

    return new Promise((resolve, reject) => {
      this.busy = true;
      this.isSkipped = false;
      // 🔧 v66 BULLETPROOF iOS FIX: Track speaking state
      this._isSpeakingInternal = true;
      this.currentResolve = resolve;
      this.currentReject = reject;
      this.startTime = Date.now();
      this.onProgressCallback = options.onProgress || null;
      this.onSkipCallback = options.onSkip || null;

      // Prepare chunks with robust sentence splitting
      this.currentChunks = this.chunkText(text);
      this.currentChunkIndex = 0;

      this.logQueueEvent('TTS_QUEUE_START', { 
        len: text.length, 
        chunks: this.currentChunks.length,
        preview: text.substring(0, 100) + (text.length > 100 ? '...' : '')
      });

      this.log({
        event: 'TTS_START',
        textLength: text.length,
        totalChunks: this.currentChunks.length
      });

      // Start speaking first chunk
      if (this.currentChunks.length > 0) {
        this.speakChunk(0);
      } else {
        this.complete(false);
      }
    });
  }

  // 🎯 ANDROID FIX: Native TTS implementation using UnifiedTTSService
  private async speakNative(text: string, options: TTSOptions): Promise<TTSResult> {
    const startTime = Date.now();

    // Check global sound setting first
    const globalSoundEnabled = this.getGlobalSoundEnabled();
    if (!globalSoundEnabled || !this.isEnabled) {
      return {
        completed: false,
        skipped: true,
        chunksSpoken: 0,
        totalChunks: 0,
        durationMs: 0
      };
    }

    this.busy = true;
    this.isSkipped = false;
    // 🔧 v66 BULLETPROOF iOS FIX: Track speaking state for native TTS
    this._isSpeakingInternal = true;

    try {
      const normalizedText = this.normalizeText(text);

      await UnifiedTTSService.speak({
        text: normalizedText,
        lang: 'en-US',
        rate: 1.0,
        pitch: 1.0,
        volume: 1.0
      });

      this.busy = false;
      // 🔧 v66: Signal audio session release after native TTS completes
      this._isSpeakingInternal = false;
      this.lastSpeakEndTime = Date.now();
      console.log('[TTSManager] v66: Native TTS complete, audio session released');

      return {
        completed: true,
        skipped: false,
        chunksSpoken: 1,
        totalChunks: 1,
        durationMs: Date.now() - startTime
      };
    } catch (error) {
      console.error('[TTSManager] Native TTS error:', error);
      this.busy = false;
      // 🔧 v66: Also release on error
      this._isSpeakingInternal = false;
      this.lastSpeakEndTime = Date.now();
      return {
        completed: false,
        skipped: false,
        chunksSpoken: 0,
        totalChunks: 1,
        durationMs: Date.now() - startTime
      };
    }
  }

  public skip(): void {
    if (!this.busy) {
      return;
    }

    this.isSkipped = true;
    this.clearWatchdog();

    // Only cancel on explicit skip
    try {
      speechSynthesis.cancel();
    } catch (e) {
      // Ignore errors
    }

    if (this.onSkipCallback) {
      this.onSkipCallback();
    }

    this.complete(true);
  }

  public isSpeaking(): boolean {
    if (Capacitor.isNativePlatform()) {
      return UnifiedTTSService.isSpeaking() || this.busy;
    }
    return this.busy;
  }

  public stop(): void {
    if (Capacitor.isNativePlatform()) {
      UnifiedTTSService.stop();
      this.busy = false;
      this.isSkipped = true;
      return;
    }
    this.skip();
  }

  /**
   * 🔧 v66 BULLETPROOF iOS FIX: Wait for TTS to complete and audio session to settle
   * Call this before starting STT to prevent audio session conflicts
   * @param timeoutMs Maximum time to wait (default 5000ms)
   */
  public async waitForAudioSessionRelease(timeoutMs: number = 5000): Promise<void> {
    const startTime = Date.now();

    // Wait for TTS to stop speaking
    while (this.isSpeaking() && (Date.now() - startTime) < timeoutMs) {
      console.log('[TTSManager] v66: Waiting for TTS to complete...');
      await new Promise(r => setTimeout(r, 100));
    }

    // If still speaking after timeout, force stop
    if (this.isSpeaking()) {
      console.warn('[TTSManager] v66: TTS timeout, forcing stop');
      this.stop();
    }

    // Wait for audio session to settle (iOS needs time to switch modes)
    const timeSinceEnd = Date.now() - this.lastSpeakEndTime;
    if (timeSinceEnd < this.AUDIO_SESSION_SETTLE_MS) {
      const waitTime = this.AUDIO_SESSION_SETTLE_MS - timeSinceEnd;
      console.log(`[TTSManager] v66: Waiting ${waitTime}ms for audio session to settle`);
      await new Promise(r => setTimeout(r, waitTime));
    }

    console.log('[TTSManager] v66: Audio session ready for STT');
  }

  /**
   * 🔧 v66: Get time since last TTS ended (for debugging)
   */
  public getTimeSinceLastSpeak(): number {
    return Date.now() - this.lastSpeakEndTime;
  }
}

// Export singleton instance
export const TTSManager = new TTSManagerService();

// Convenience function for basic usage
export const speakText = (text: string, options?: TTSOptions): Promise<TTSResult> => {
  return TTSManager.speak(text, options);
};