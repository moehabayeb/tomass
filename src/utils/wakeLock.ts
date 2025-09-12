/**
 * Screen Wake Lock utility for keeping screen awake during hands-free sessions
 */

interface WakeLock {
  release: () => Promise<void>;
}

class WakeLockManager {
  private wakeLock: WakeLock | null = null;
  private isSupported = 'wakeLock' in navigator;

  public async request(): Promise<boolean> {
    if (!this.isSupported) {
      return false;
    }

    try {
      this.wakeLock = await (navigator as any).wakeLock.request('screen');
      
      return true;
    } catch (error) {
      return false;
    }
  }

  public async release(): Promise<void> {
    if (this.wakeLock) {
      try {
        await this.wakeLock.release();
      } catch (error) {
      }
      this.wakeLock = null;
    }
  }

  public get isActive(): boolean {
    return this.wakeLock !== null;
  }

  public get supported(): boolean {
    return this.isSupported;
  }
}

export const wakeLockManager = new WakeLockManager();