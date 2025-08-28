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

  // Feature flag
  private readonly STRICT_QUEUE = true; // TTS_STRICT_QUEUE default ON

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
      configureUtterance(this.currentUtterance, text);

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
        console.error('[TTSManager] Chunk error:', event);
        
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

  public async speak(text: string, options: TTSOptions = {}): Promise<TTSResult> {
    // If sound is disabled, resolve immediately
    if (!this.isEnabled) {
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

// Export singleton instance
export const TTSManager = new TTSManagerService();

// Convenience function for basic usage
export const speakText = (text: string, options?: TTSOptions): Promise<TTSResult> => {
  return TTSManager.speak(text, options);
};