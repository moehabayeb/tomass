// Singleton AudioContext manager to prevent memory leaks
// Browser limit is 6 concurrent AudioContexts - we need to reuse one instance

class AudioManager {
  private context: AudioContext | null = null;
  private isSupported: boolean = true;

  private getContext(): AudioContext | null {
    if (!this.isSupported) return null;

    try {
      if (!this.context) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) {
          this.isSupported = false;
          return null;
        }
        this.context = new AudioContextClass();
      }

      // Resume context if suspended (browser autoplay policy)
      if (this.context.state === 'suspended') {
        this.context.resume();
      }

      return this.context;
    } catch (error) {
      // Apple Store Compliance: Silent operation
      this.isSupported = false;
      return null;
    }
  }

  playSuccessSound(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // C5-E5-G5 chord progression
      oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.3);
    } catch (error) {
      // Apple Store Compliance: Silent operation
    }
  }

  playFailureSound(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Descending tone
      oscillator.frequency.setValueAtTime(400, ctx.currentTime);
      oscillator.frequency.setValueAtTime(200, ctx.currentTime + 0.2);

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.3);
    } catch (error) {
      // Apple Store Compliance: Silent operation
    }
  }

  playClickSound(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
    } catch (error) {
      // Apple Store Compliance: Silent operation
    }
  }

  cleanup(): void {
    if (this.context) {
      try {
        this.context.close();
      } catch (error) {
        // Apple Store Compliance: Silent operation
      }
      this.context = null;
    }
  }
}

// Export singleton instance
export const audioManager = new AudioManager();
