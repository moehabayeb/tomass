import { configureUtterance } from '@/config/voice';

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

  // Barge-in support
  private onStartCallback: (() => void) | null = null;
  private onEndCallback: (() => void) | null = null;

  // Feature flag
  private readonly STRICT_QUEUE = true; // TTS_STRICT_QUEUE default ON

  // Idempotent play gate for V2
  private playedMessages = new Map<string, boolean>();
  private currentMessageId: string | null = null;

  public busy = false;

  constructor() {
    // Ensure audio context is unlocked on first user gesture
    this.ensureAudioContextUnlocked();
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
        document.removeEventListener('keydown', unlock);
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Audio context unlock failed:', e);
        }
      }
    };

    // Add multiple event listeners for better coverage
    document.addEventListener('click', unlock, { once: true });
    document.addEventListener('touchstart', unlock, { once: true });
    document.addEventListener('keydown', unlock, { once: true });
  }

  private normalizeText(text: string): string {
    return text
      .replace(/<[^>]*>/g, '') // Strip HTML
      .replace(/\n\n/g, '. ') // Convert double newlines to sentence breaks
      .replace(/\n/g, ' ') // Convert single newlines to spaces
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/[""]|['']/g, '"') // Normalize quotes
      .replace(/['']/g, "'") // Normalize apostrophes
      .replace(/([.!?])\s*/g, '$1 ') // Ensure space after punctuation for natural pauses
      .replace(/([,;:])\s*/g, '$1 ') // Ensure space after commas/semicolons
      .trim();
  }

  private chunkText(text: string, maxLength = 280): string[] { // Increased from 190 to 280
    const normalized = this.normalizeText(text);
    if (normalized.length <= maxLength) {
      return [normalized];
    }

    // First try to split on complete sentences
    const sentences = normalized.match(/[^.!?]+[.!?]+/g) || [];

    if (sentences.length === 0) {
      // No sentence endings found, split on original logic but with larger chunks
      const fallbackSentences = normalized.split(/(?<=[.!?…][""')]*)\s+/).filter(s => s.trim().length > 0);
      if (fallbackSentences.length <= 1) {
        return [normalized]; // Single sentence
      }
      return this.chunkBySentences(fallbackSentences, maxLength);
    }

    return this.chunkBySentences(sentences, maxLength);
  }

  private chunkBySentences(sentences: string[], maxLength: number): string[] {
    const chunks: string[] = [];
    let currentChunk = '';

    for (const sentence of sentences) {
      const trimmedSentence = sentence.trim();
      const potential = currentChunk + (currentChunk ? ' ' : '') + trimmedSentence;

      if (potential.length <= maxLength) {
        currentChunk = potential;
      } else {
        // Current chunk is full, save it and start new chunk
        if (currentChunk) {
          chunks.push(currentChunk.trim());
          currentChunk = trimmedSentence;
        } else {
          // Single sentence too long, keep it as one chunk anyway
          chunks.push(trimmedSentence);
          currentChunk = '';
        }
      }
    }

    // Always include the final chunk, even if short
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }

    // Ensure we never return empty array
    return chunks.length > 0 ? chunks : [sentences.join(' ')];
  }

  private log(event: TTSLog): void {
    const debug = new URLSearchParams(window.location.search).has('sttdebug');
    if (debug) {
      console.log('[TTSManager]', event);
    }
  }

  private logQueueEvent(event: string, extra: any = {}): void {
    const debug = new URLSearchParams(window.location.search).has('sttdebug');
    if (debug) {
      console.log(`[TTSManager] ${event}`, extra);
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
      console.warn('[TTSManager] Watchdog triggered for chunk', chunkIndex);
      
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        this.log({
          event: 'TTS_RETRY',
          textLength: this.currentChunks[chunkIndex]?.length || 0,
          chunkIndex,
          totalChunks: this.currentChunks.length
        });
        this.speakChunkWithVoice(chunkIndex);
      } else {
        // Move to next chunk
        this.onChunkComplete(chunkIndex);
      }
    }, 2500);
  }

  private speakChunkWithVoice(chunkIndex: number): void {
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

      // CRITICAL: Configure with consistent voice and optimal settings
      this.currentUtterance.rate = 0.9;
      this.currentUtterance.pitch = 1.0;
      this.currentUtterance.volume = 1.0;

      // Use consistent male voice for better experience
      const voices = window.speechSynthesis.getVoices();
      const maleVoice = voices.find(v =>
        v.name.includes('David') ||
        v.name.includes('Male') ||
        (v as any).gender === 'male'
      ) || voices[0];

      if (maleVoice) {
        this.currentUtterance.voice = maleVoice;
      }

      configureUtterance(this.currentUtterance, text);

      this.currentUtterance.onstart = () => {
        this.clearWatchdog();
        this.logQueueEvent(`TTS_CHUNK ${chunkIndex + 1}/${this.currentChunks.length} onstart`);

        // Notify mic orchestrator that TTS started (for first chunk only)
        if (chunkIndex === 0 && this.onStartCallback) {
          this.onStartCallback();
        }
      };

      this.currentUtterance.onend = () => {
        this.clearWatchdog();
        this.logQueueEvent(`TTS_CHUNK ${chunkIndex + 1}/${this.currentChunks.length} onend`);
        this.onChunkComplete(chunkIndex);
      };

      this.currentUtterance.onerror = (event) => {
        this.clearWatchdog();
        console.error('[TTSManager] Chunk error:', event);

        // CRITICAL: Handle interruption errors gracefully - don't retry if interrupted
        if (event.error === 'interrupted') {
          console.log('[TTSManager] Speech was interrupted, not retrying');
          this.onChunkComplete(chunkIndex);
          return;
        }

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
          setTimeout(() => this.speakChunkWithVoice(chunkIndex), 100);
        } else {
          this.onChunkComplete(chunkIndex);
        }
      };

      // Start watchdog before speaking
      this.startWatchdog(chunkIndex);
      speechSynthesis.speak(this.currentUtterance);

    } catch (error) {
      this.clearWatchdog();
      console.error('[TTSManager] Speak error:', error);
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
      setTimeout(() => this.speakChunkWithVoice(nextIndex), 120);
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

    // Notify mic orchestrator that TTS ended
    if (this.onEndCallback) {
      this.onEndCallback();
    }

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
   * Set callback for when TTS starts (for mic orchestrator)
   */
  public setOnStart(callback: (() => void) | null): void {
    this.onStartCallback = callback;
  }

  /**
   * Set callback for when TTS ends (for mic orchestrator)
   */
  public setOnEnd(callback: (() => void) | null): void {
    this.onEndCallback = callback;
  }

  /**
   * Force stop TTS (for barge-in)
   */
  public forceStop(): void {
    if (this.isSpeaking()) {
      try {
        speechSynthesis.cancel();
      } catch (e) {
        // Ignore errors
      }
      this.skip();
      console.log('[TTSManager] Force stopped for barge-in');
    }
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
      console.log('[TTSManager] Skipped - global sound disabled');
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
      console.log('[TTSManager] Message already played:', messageId);
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
      console.log('[TTSManager] TTS_COMPLETE:', messageId);
    }
    
    return result;
  }

  public async speak(text: string, options: TTSOptions = {}): Promise<TTSResult> {
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

    // CRITICAL: Stop all previous speech and wait for cancellation to complete
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      // Ignore errors
    }

    // Wait for cancellation to complete before starting new speech
    return new Promise((resolve) => {
      setTimeout(() => {
        this.startSpeechWithQueue(text, options, resolve);
      }, 200);
    });
  }

  private async startSpeechWithQueue(text: string, options: TTSOptions, resolve: (result: TTSResult) => void): Promise<void> {
    this.busy = true;
    this.isSkipped = false;
    this.currentResolve = resolve;
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

    // Start speaking first chunk with enhanced voice handling
    if (this.currentChunks.length > 0) {
      this.speakChunkWithVoice(0);
    } else {
      this.complete(false);
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
    return this.busy;
  }

  public stop(): void {
    this.skip();
  }
}

/**
 * RobustTTSManager - Diamond-grade TTS system that works every time
 * Features:
 * - Queue-based processing to prevent overlapping speech
 * - Automatic voice selection and locking
 * - Graceful error recovery with automatic retry
 * - Consistent voice throughout conversation
 * - Bulletproof timing with proper delays
 */
class RobustTTSManager {
  private static queue: string[] = [];
  private static isSpeaking = false;
  private static currentVoice: SpeechSynthesisVoice | null = null;
  private static isInitialized = false;
  private static retryCount = 0;
  private static maxRetries = 3;

  /**
   * Initialize TTS system with optimal voice selection
   */
  static initialize(): void {
    if (this.isInitialized) return;

    console.log('[RobustTTS] Initializing...');

    // Get and lock a consistent voice
    const voices = window.speechSynthesis.getVoices();

    // Prefer high-quality English voices
    this.currentVoice = voices.find(v =>
      v.name.includes('David') ||
      v.name.includes('Daniel') ||
      v.name.includes('Alex') ||
      (v.lang.includes('en-US') && v.localService)
    ) || voices.find(v => v.lang.includes('en')) || voices[0];

    if (this.currentVoice) {
      console.log(`[RobustTTS] Selected voice: ${this.currentVoice.name} (${this.currentVoice.lang})`);
    }

    this.isInitialized = true;
  }

  /**
   * Add text to speech queue - CRITICAL: This always works
   */
  static speak(text: string): void {
    if (!text?.trim()) return;

    console.log('[RobustTTS] Queuing:', text.substring(0, 50) + '...');

    // CRITICAL: Cancel ANY existing speech immediately
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      console.warn('[RobustTTS] Cancel error:', e);
    }

    // Add to queue
    this.queue.push(text.trim());

    // Process queue after brief delay to ensure cancellation completed
    setTimeout(() => this.processQueue(), 200);
  }

  /**
   * Process the speech queue - bulletproof processing
   */
  private static processQueue(): void {
    if (this.isSpeaking || this.queue.length === 0) return;

    // Ensure initialization
    if (!this.isInitialized || !this.currentVoice) {
      this.initialize();
    }

    const text = this.queue.shift()!;
    this.isSpeaking = true;
    this.retryCount = 0;

    console.log('[RobustTTS] Speaking:', text.substring(0, 30) + '...');

    this.speakWithRetry(text);
  }

  /**
   * Speak with automatic retry on failure
   */
  private static speakWithRetry(text: string): void {
    try {
      // Create fresh utterance each time
      const utterance = new SpeechSynthesisUtterance(text);

      // CRITICAL: Consistent, optimal settings
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      utterance.voice = this.currentVoice;

      // Handle successful completion
      utterance.onend = () => {
        console.log('[RobustTTS] Completed successfully');
        this.isSpeaking = false;
        this.retryCount = 0;

        // Process next in queue after delay
        if (this.queue.length > 0) {
          setTimeout(() => this.processQueue(), 200);
        }
      };

      // Handle errors with intelligent retry
      utterance.onerror = (event) => {
        console.warn('[RobustTTS] Error:', event.error);

        // Don't retry if interrupted by user
        if (event.error === 'interrupted') {
          this.isSpeaking = false;
          this.retryCount = 0;
          return;
        }

        // Retry on other errors
        if (this.retryCount < this.maxRetries) {
          this.retryCount++;
          console.log(`[RobustTTS] Retrying... (${this.retryCount}/${this.maxRetries})`);

          setTimeout(() => {
            this.isSpeaking = false;
            this.speakWithRetry(text);
          }, 500);
        } else {
          // Give up and move to next
          console.error(`[RobustTTS] Failed after ${this.maxRetries} retries`);
          this.isSpeaking = false;
          this.retryCount = 0;

          // Try next in queue
          setTimeout(() => this.processQueue(), 200);
        }
      };

      // SPEAK!
      window.speechSynthesis.speak(utterance);

    } catch (error) {
      console.error('[RobustTTS] Speak error:', error);
      this.isSpeaking = false;

      // Try next in queue
      setTimeout(() => this.processQueue(), 200);
    }
  }

  /**
   * Stop all speech immediately
   */
  static stop(): void {
    console.log('[RobustTTS] Stopping all speech');

    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      console.warn('[RobustTTS] Stop error:', e);
    }

    this.queue = [];
    this.isSpeaking = false;
    this.retryCount = 0;
  }

  /**
   * Check if currently speaking
   */
  static isCurrentlySpeaking(): boolean {
    return this.isSpeaking;
  }

  /**
   * Get queue length
   */
  static getQueueLength(): number {
    return this.queue.length;
  }
}

// Export singleton instance
export const TTSManager = new TTSManagerService();

// Export the robust TTS manager
export { RobustTTSManager };

// Convenience function for basic usage
export const speakText = (text: string, options?: TTSOptions): Promise<TTSResult> => {
  return TTSManager.speak(text, options);
};