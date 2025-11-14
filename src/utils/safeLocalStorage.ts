/**
 * Safe localStorage wrapper with QuotaExceededError handling
 * Bug #5 Fix: Global error handler for storage operations
 *
 * Features:
 * - Graceful degradation when storage is full
 * - Safari Private Mode support
 * - User notifications via toast
 * - Memory fallback when localStorage unavailable
 */

import { toast } from '@/hooks/use-toast';

// Memory fallback when localStorage is unavailable
const memoryStorage = new Map<string, string>();
let storageAvailable = true;
let userNotified = false;

/**
 * Check if localStorage is available and not full
 */
function checkStorageAvailability(): boolean {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Notify user about storage issues (only once per session)
 */
function notifyStorageIssue(error: Error): void {
  if (userNotified) return;

  const isQuotaError = error.name === 'QuotaExceededError' ||
                       error.message.includes('quota') ||
                       error.message.includes('storage');

  if (isQuotaError) {
    toast({
      title: 'Storage Full',
      description: 'Your device storage is full. Some progress may not be saved. Please free up space.',
      variant: 'destructive',
    });
  } else {
    toast({
      title: 'Storage Unavailable',
      description: 'Storage is unavailable (Private Mode?). Progress will be saved in memory only.',
      variant: 'default',
    });
  }

  userNotified = true;
  storageAvailable = false;
}

/**
 * Attempt to free up space by removing old data
 */
function attemptCleanup(): void {
  try {
    // Remove old/unused keys
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (
        key.startsWith('tomass_offline_') || // Old offline queue
        key.startsWith('old_') || // Legacy keys
        key.includes('_cache_') // Cache entries
      )) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach(key => localStorage.removeItem(key));

    // Check if we freed up space
    storageAvailable = checkStorageAvailability();
  } catch (error) {
    // Cleanup failed, stay in degraded mode
  }
}

/**
 * Safe localStorage wrapper
 */
export const safeLocalStorage = {
  /**
   * Get item from localStorage with fallback to memory
   */
  getItem(key: string): string | null {
    try {
      if (storageAvailable) {
        return localStorage.getItem(key);
      }
      return memoryStorage.get(key) || null;
    } catch (error) {
      // Apple Store Compliance: Silent fail with memory fallback
      return memoryStorage.get(key) || null;
    }
  },

  /**
   * Set item in localStorage with error handling
   */
  setItem(key: string, value: string): boolean {
    // Try localStorage first
    if (storageAvailable) {
      try {
        localStorage.setItem(key, value);
        return true;
      } catch (error) {
        // Storage might be full or unavailable
        if (error instanceof Error) {
          notifyStorageIssue(error);

          // Try cleanup and retry once
          if (error.name === 'QuotaExceededError') {
            attemptCleanup();

            try {
              localStorage.setItem(key, value);
              storageAvailable = true;
              return true;
            } catch (retryError) {
              // Still failed, fall through to memory storage
            }
          }
        }

        storageAvailable = false;
      }
    }

    // Fallback to memory storage
    memoryStorage.set(key, value);
    return false; // Indicate that localStorage failed
  },

  /**
   * Remove item from both localStorage and memory
   */
  removeItem(key: string): void {
    try {
      if (storageAvailable) {
        localStorage.removeItem(key);
      }
    } catch (error) {
      // Apple Store Compliance: Silent fail
    }

    memoryStorage.delete(key);
  },

  /**
   * Clear all storage
   */
  clear(): void {
    try {
      if (storageAvailable) {
        localStorage.clear();
      }
    } catch (error) {
      // Apple Store Compliance: Silent fail
    }

    memoryStorage.clear();
  },

  /**
   * Get all keys
   */
  keys(): string[] {
    const keys: string[] = [];

    try {
      if (storageAvailable) {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key) keys.push(key);
        }
      }
    } catch (error) {
      // Apple Store Compliance: Silent fail
    }

    // Add memory keys
    memoryStorage.forEach((_, key) => {
      if (!keys.includes(key)) {
        keys.push(key);
      }
    });

    return keys;
  },

  /**
   * Check if storage is available
   */
  isAvailable(): boolean {
    return storageAvailable;
  },

  /**
   * Get storage usage information (approximate)
   */
  getStorageInfo(): { used: number; available: boolean; mode: 'localStorage' | 'memory' } {
    let used = 0;

    try {
      if (storageAvailable) {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key) {
            const value = localStorage.getItem(key);
            if (value) {
              used += key.length + value.length;
            }
          }
        }
        return { used, available: true, mode: 'localStorage' };
      }
    } catch (error) {
      // Fall through to memory mode
    }

    // Memory storage size
    memoryStorage.forEach((value, key) => {
      used += key.length + value.length;
    });

    return { used, available: false, mode: 'memory' };
  },

  /**
   * Force a storage availability check
   */
  recheckAvailability(): void {
    storageAvailable = checkStorageAvailability();
  }
};

/**
 * Initialize storage wrapper
 */
storageAvailable = checkStorageAvailability();

// Export default for backward compatibility
export default safeLocalStorage;
