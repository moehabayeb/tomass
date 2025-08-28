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
      console.log('[WakeLock] Not supported');
      return false;
    }

    try {
      this.wakeLock = await (navigator as any).wakeLock.request('screen');
      console.log('[WakeLock] Acquired');
      
      return true;
    } catch (error) {
      console.warn('[WakeLock] Failed to acquire:', error);
      return false;
    }
  }

  public async release(): Promise<void> {
    if (this.wakeLock) {
      try {
        await this.wakeLock.release();
        console.log('[WakeLock] Released manually');
      } catch (error) {
        console.warn('[WakeLock] Failed to release:', error);
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