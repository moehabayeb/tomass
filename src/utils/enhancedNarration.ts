// Enhanced Narration Controller with Voice Command Support
// Extends the existing narration system with pause/resume, barge-in, and advanced controls

import { configureUtterance } from '@/config/voice';
import { SpeechState, BargeInEvent } from '../types/voiceCommands';
import { telemetry, trackBargeIn } from './telemetry';

interface NarrationSegment {
  id: string;
  text: string;
  startTime?: number;
  endTime?: number;
  duration?: number;
}

interface NarrationQueue {
  segments: NarrationSegment[];
  currentIndex: number;
  totalDuration: number;
}

export class EnhancedNarrationController {
  private synth: SpeechSynthesis;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isPaused: boolean = false;
  private isPlaying: boolean = false;
  private currentSegment: NarrationSegment | null = null;
  private queue: NarrationQueue = { segments: [], currentIndex: 0, totalDuration: 0 };
  private volume: number = 1.0;
  private rate: number = 1.0;
  private pitch: number = 1.0;
  private pausedAt: number = 0;
  private resumePosition: number = 0;
  private sessionId: string = '';

  // Event callbacks
  private onStateChange?: (state: SpeechState) => void;
  private onBargeIn?: (event: BargeInEvent) => void;
  private onSegmentStart?: (segment: NarrationSegment) => void;
  private onSegmentEnd?: (segment: NarrationSegment) => void;
  private onComplete?: () => void;
  private onError?: (error: Error) => void;

  constructor() {
    // Guard for SSR or environments without window
    this.synth = typeof window !== 'undefined' && window.speechSynthesis
      ? window.speechSynthesis
      : ({} as SpeechSynthesis);

    // Generate session ID for telemetry
    this.sessionId = `narration_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Event callback setters
  public setCallbacks(callbacks: {
    onStateChange?: (state: SpeechState) => void;
    onBargeIn?: (event: BargeInEvent) => void;
    onSegmentStart?: (segment: NarrationSegment) => void;
    onSegmentEnd?: (segment: NarrationSegment) => void;
    onComplete?: () => void;
    onError?: (error: Error) => void;
  }): void {
    this.onStateChange = callbacks.onStateChange;
    this.onBargeIn = callbacks.onBargeIn;
    this.onSegmentStart = callbacks.onSegmentStart;
    this.onSegmentEnd = callbacks.onSegmentEnd;
    this.onComplete = callbacks.onComplete;
    this.onError = callbacks.onError;
  }

  // Enhanced speak method with queuing support
  public speak(text: string | string[], options: {
    interrupt?: boolean;
    queue?: boolean;
    segmentId?: string;
  } = {}): void {
    const { interrupt = true, queue = false, segmentId } = options;

    if (!text || (Array.isArray(text) && text.length === 0)) return;

    try {
      // Convert to array for uniform handling
      const textArray = Array.isArray(text) ? text : [text];
      
      // Create segments
      const segments: NarrationSegment[] = textArray.map((t, index) => ({
        id: segmentId || `segment_${Date.now()}_${index}`,
        text: t.trim()
      }));

      // Handle interrupt or queue
      if (interrupt) {
        this.cancel();
        this.queue = { segments, currentIndex: 0, totalDuration: 0 };
      } else if (queue) {
        this.queue.segments.push(...segments);
      } else {
        // Replace current queue
        this.cancel();
        this.queue = { segments, currentIndex: 0, totalDuration: 0 };
      }

      // Start speaking if not already playing
      if (!this.isPlaying && this.queue.segments.length > 0) {
        this.startSpeaking();
      }
    } catch (error) {
      // Apple Store Compliance: Silent operation
      this.onError?.(error as Error);
    }
  }

  // Start speaking the current queue
  private startSpeaking(): void {
    if (this.queue.segments.length === 0) return;

    const segment = this.queue.segments[this.queue.currentIndex];
    if (!segment) return;

    this.currentSegment = segment;
    this.isPlaying = true;
    this.isPaused = false;

    try {
      this.currentUtterance = new SpeechSynthesisUtterance(segment.text);
      
      // Configure utterance
      configureUtterance(this.currentUtterance, segment.text);
      
      // Apply custom settings
      this.currentUtterance.volume = this.volume;
      this.currentUtterance.rate = this.rate;
      this.currentUtterance.pitch = this.pitch;

      // Set up event handlers
      this.currentUtterance.onstart = () => {
        segment.startTime = Date.now();
        this.onSegmentStart?.(segment);
        this.notifyStateChange();
      };

      this.currentUtterance.onend = () => {
        segment.endTime = Date.now();
        segment.duration = segment.endTime - (segment.startTime || segment.endTime);
        
        this.onSegmentEnd?.(segment);
        this.moveToNextSegment();
      };

      this.currentUtterance.onerror = (event: any) => {
        // Apple Store Compliance: Silent operation
        this.onError?.(new Error(`Speech synthesis error: ${event.error}`));
        this.moveToNextSegment();
      };

      // Start speaking
      this.synth.speak(this.currentUtterance);
      this.notifyStateChange();

    } catch (error) {
      // Apple Store Compliance: Silent operation
      this.onError?.(error as Error);
      this.isPlaying = false;
      this.notifyStateChange();
    }
  }

  // Move to next segment in queue
  private moveToNextSegment(): void {
    this.queue.currentIndex++;
    
    if (this.queue.currentIndex >= this.queue.segments.length) {
      // Queue completed
      this.isPlaying = false;
      this.currentSegment = null;
      this.currentUtterance = null;
      this.queue = { segments: [], currentIndex: 0, totalDuration: 0 };
      this.onComplete?.();
      this.notifyStateChange();
    } else {
      // Continue with next segment
      setTimeout(() => this.startSpeaking(), 100);
    }
  }

  // Pause current speech
  public pause(): boolean {
    if (!this.isPlaying || this.isPaused) return false;

    try {
      this.synth.pause();
      this.isPaused = true;
      this.pausedAt = Date.now();
      this.notifyStateChange();
      return true;
    } catch (error) {
      // Apple Store Compliance: Silent operation
      return false;
    }
  }

  // Resume paused speech
  public resume(): boolean {
    if (!this.isPaused) return false;

    try {
      this.synth.resume();
      this.isPaused = false;
      this.pausedAt = 0;
      this.notifyStateChange();
      return true;
    } catch (error) {
      // Apple Store Compliance: Silent operation
      return false;
    }
  }

  // Cancel all speech and clear queue
  public cancel(): void {
    try {
      if (this.synth.speaking || this.synth.pending) {
        this.synth.cancel();
      }
    } catch (error) {
      // Apple Store Compliance: Silent operation
    }

    this.currentUtterance = null;
    this.currentSegment = null;
    this.isPlaying = false;
    this.isPaused = false;
    this.pausedAt = 0;
    this.queue = { segments: [], currentIndex: 0, totalDuration: 0 };
    this.notifyStateChange();
  }

  // Handle barge-in interruption
  public bargeIn(commandType: string): BargeInEvent | null {
    if (!this.isPlaying && !this.isPaused) return null;

    const bargeInEvent: BargeInEvent = {
      interruptedAt: Date.now(),
      originalContent: this.currentSegment?.text || '',
      resumePosition: this.getCurrentPosition(),
      command: {
        type: commandType as any,
        confidence: 1.0,
        rawText: commandType,
        timestamp: Date.now(),
        context: 'narration',
        variations: [commandType]
      }
    };

    // Cancel current speech
    this.cancel();

    // Track telemetry
    trackBargeIn(
      this.sessionId,
      bargeInEvent.originalContent,
      bargeInEvent.interruptedAt,
      commandType,
      { phase: 'narration' }
    );

    this.onBargeIn?.(bargeInEvent);
    return bargeInEvent;
  }

  // Repeat current or last segment
  public repeat(): void {
    if (this.currentSegment) {
      // Repeat current segment
      this.cancel();
      this.speak(this.currentSegment.text, { segmentId: `repeat_${this.currentSegment.id}` });
    } else if (this.queue.segments.length > 0) {
      // Repeat last segment from queue
      const lastSegment = this.queue.segments[this.queue.segments.length - 1];
      this.speak(lastSegment.text, { segmentId: `repeat_${lastSegment.id}` });
    }
  }

  // Get current speech state
  public getState(): SpeechState {
    return {
      isPlaying: this.isPlaying,
      isPaused: this.isPaused,
      currentContent: this.currentSegment?.text || '',
      position: this.getCurrentPosition(),
      totalDuration: this.getTotalDuration(),
      volume: this.volume,
      rate: this.rate,
      canPause: this.isPlaying && !this.isPaused,
      canResume: this.isPaused,
      canStop: this.isPlaying || this.isPaused
    };
  }

  // Volume control
  public setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.currentUtterance) {
      this.currentUtterance.volume = this.volume;
    }
    this.notifyStateChange();
  }

  public getVolume(): number {
    return this.volume;
  }

  // Rate control
  public setRate(rate: number): void {
    this.rate = Math.max(0.1, Math.min(10, rate));
    // Note: Changing rate during speech requires restart
    if (this.isPlaying) {
      const currentText = this.currentSegment?.text;
      if (currentText) {
        this.cancel();
        this.speak(currentText);
      }
    }
    this.notifyStateChange();
  }

  public getRate(): number {
    return this.rate;
  }

  // Pitch control
  public setPitch(pitch: number): void {
    this.pitch = Math.max(0, Math.min(2, pitch));
    this.notifyStateChange();
  }

  public getPitch(): number {
    return this.pitch;
  }

  // Queue management
  public addToQueue(text: string | string[]): void {
    this.speak(text, { queue: true, interrupt: false });
  }

  public clearQueue(): void {
    this.queue.segments = [];
    this.queue.currentIndex = 0;
    this.queue.totalDuration = 0;
  }

  public getQueueLength(): number {
    return this.queue.segments.length - this.queue.currentIndex;
  }

  public getQueuedText(): string[] {
    return this.queue.segments
      .slice(this.queue.currentIndex + 1)
      .map(segment => segment.text);
  }

  // Position tracking (estimated)
  private getCurrentPosition(): number {
    if (!this.currentSegment || !this.currentSegment.startTime) return 0;
    
    const elapsed = Date.now() - this.currentSegment.startTime;
    return this.isPaused ? this.pausedAt - this.currentSegment.startTime : elapsed;
  }

  private getTotalDuration(): number {
    // Estimate based on character count and rate
    const totalChars = this.queue.segments
      .slice(this.queue.currentIndex)
      .reduce((sum, segment) => sum + segment.text.length, 0);
    
    // Rough estimation: ~10 chars per second at normal rate
    return (totalChars / 10) * (1 / this.rate) * 1000;
  }

  // Notify state change
  private notifyStateChange(): void {
    this.onStateChange?.(this.getState());
  }

  // Browser capability checks
  public isSupported(): boolean {
    return !!(this.synth && 'speak' in this.synth);
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.synth.getVoices();
  }

  // Debug methods
  public getDebugInfo() {
    return {
      isSupported: this.isSupported(),
      state: this.getState(),
      queue: {
        segments: this.queue.segments.length,
        currentIndex: this.queue.currentIndex,
        remaining: this.getQueueLength()
      },
      settings: {
        volume: this.volume,
        rate: this.rate,
        pitch: this.pitch
      },
      sessionId: this.sessionId
    };
  }
}

// Singleton instance replacing the original narration controller
let enhancedNarrationInstance: EnhancedNarrationController | null = null;

export function getEnhancedNarration(): EnhancedNarrationController {
  if (!enhancedNarrationInstance) {
    enhancedNarrationInstance = new EnhancedNarrationController();
  }
  return enhancedNarrationInstance;
}

// Export singleton instance
export const enhancedNarration = getEnhancedNarration();

// Backward compatibility - extends the existing narration interface
export class BackwardCompatibleNarration {
  private enhanced = enhancedNarration;

  public speak(text: string): void {
    this.enhanced.speak(text);
  }

  public cancel(): void {
    this.enhanced.cancel();
  }

  // Additional enhanced methods
  public pause = () => this.enhanced.pause();
  public resume = () => this.enhanced.resume();
  public repeat = () => this.enhanced.repeat();
  public setVolume = (volume: number) => this.enhanced.setVolume(volume);
  public setRate = (rate: number) => this.enhanced.setRate(rate);
  public getState = () => this.enhanced.getState();
  public bargeIn = (commandType: string) => this.enhanced.bargeIn(commandType);
}

// Replace the original narration export for backward compatibility
export const narration = new BackwardCompatibleNarration();