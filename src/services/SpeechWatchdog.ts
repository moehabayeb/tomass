/**
 * SpeechWatchdog - Detects stuck states and auto-recovers
 * v67: Apple-Ready - Ensures app NEVER gets permanently stuck
 */

type WatchdogState = 'idle' | 'listening' | 'processing' | 'speaking';

class SpeechWatchdogService {
  private currentState: WatchdogState = 'idle';
  private stateStartTime = 0;
  private watchdogTimer: number | null = null;
  private onStuckCallback: (() => void) | null = null;

  // Maximum time allowed in each state (milliseconds)
  private readonly STATE_TIMEOUTS: Record<WatchdogState, number> = {
    idle: Infinity,        // Can stay idle forever
    listening: 60000,      // 60s max listening
    processing: 30000,     // 30s max processing
    speaking: 120000,      // 2min max speaking (long responses)
  };

  setState(state: WatchdogState): void {
    this.currentState = state;
    this.stateStartTime = Date.now();
    this.startWatchdog();
    console.log(`[Watchdog] v67: State: ${state}`);
  }

  onStuck(callback: () => void): void {
    this.onStuckCallback = callback;
  }

  private startWatchdog(): void {
    if (this.watchdogTimer) {
      clearTimeout(this.watchdogTimer);
    }

    const timeout = this.STATE_TIMEOUTS[this.currentState];
    if (timeout === Infinity) return;

    this.watchdogTimer = window.setTimeout(() => {
      const elapsed = Date.now() - this.stateStartTime;
      console.error(`[Watchdog] v67: STUCK DETECTED! State: ${this.currentState}, Duration: ${elapsed}ms`);

      if (this.onStuckCallback) {
        this.onStuckCallback();
      }
    }, timeout);
  }

  reset(): void {
    if (this.watchdogTimer) {
      clearTimeout(this.watchdogTimer);
      this.watchdogTimer = null;
    }
    this.currentState = 'idle';
    this.stateStartTime = 0;
  }

  getStatus(): { state: WatchdogState; duration: number } {
    return {
      state: this.currentState,
      duration: this.stateStartTime > 0 ? Date.now() - this.stateStartTime : 0,
    };
  }

  /**
   * Manually extend the timeout for current state
   * Useful when user is actively speaking/processing
   */
  extendTimeout(additionalMs: number = 30000): void {
    if (this.watchdogTimer) {
      clearTimeout(this.watchdogTimer);
    }

    const baseTimeout = this.STATE_TIMEOUTS[this.currentState];
    if (baseTimeout === Infinity) return;

    const elapsed = Date.now() - this.stateStartTime;
    const remaining = Math.max(0, baseTimeout - elapsed);
    const newTimeout = remaining + additionalMs;

    this.watchdogTimer = window.setTimeout(() => {
      const totalElapsed = Date.now() - this.stateStartTime;
      console.error(`[Watchdog] v67: STUCK DETECTED (extended)! State: ${this.currentState}, Duration: ${totalElapsed}ms`);

      if (this.onStuckCallback) {
        this.onStuckCallback();
      }
    }, newTimeout);

    console.log(`[Watchdog] v67: Extended timeout by ${additionalMs}ms, new remaining: ${newTimeout}ms`);
  }
}

export const speechWatchdog = new SpeechWatchdogService();
