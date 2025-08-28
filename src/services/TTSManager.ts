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

    const chunks: string[] = [];
    const sentences = normalized.split(/([.!?;:])\s+/);
    let currentChunk = '';

    for (let i = 0; i < sentences.length; i++) {
      const part = sentences[i];
      const potential = currentChunk + (currentChunk ? ' ' : '') + part;

      if (potential.length <= maxLength) {
        currentChunk = potential;
      } else {
        if (currentChunk) {
          chunks.push(currentChunk.trim());
          currentChunk = part;
        } else {
          // Single sentence too long, force split
          chunks.push(part.substring(0, maxLength).trim());
          currentChunk = part.substring(maxLength).trim();
        }
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk.trim());
    }

    return chunks.filter(chunk => chunk.length > 0);
  }

  private log(event: TTSLog): void {
    const debug = new URLSearchParams(window.location.search).has('sttdebug');
    if (debug) {
      console.log('[TTSManager]', event);
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

    try {
      this.currentUtterance = new SpeechSynthesisUtterance(text);
      configureUtterance(this.currentUtterance, text);

      this.currentUtterance.onstart = () => {
        this.clearWatchdog();
      };

      this.currentUtterance.onend = () => {
        this.clearWatchdog();
        this.onChunkComplete(chunkIndex);
      };

      this.currentUtterance.onerror = (event) => {
        this.clearWatchdog();
        console.error('[TTSManager] Chunk error:', event);
        
        if (this.retryCount < this.maxRetries) {
          this.retryCount++;
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
      // Small delay between chunks for natural flow
      setTimeout(() => this.speakChunk(nextIndex), 150);
    } else {
      this.complete(false);
    }
  }

  private complete(skipped: boolean): void {
    const duration = Date.now() - this.startTime;
    
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

    // Cancel any current speech
    this.skip();

    return new Promise((resolve, reject) => {
      this.busy = true;
      this.isSkipped = false;
      this.currentResolve = resolve;
      this.currentReject = reject;
      this.startTime = Date.now();
      this.onProgressCallback = options.onProgress || null;
      this.onSkipCallback = options.onSkip || null;

      // Prepare chunks
      this.currentChunks = this.chunkText(text);
      this.currentChunkIndex = 0;

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