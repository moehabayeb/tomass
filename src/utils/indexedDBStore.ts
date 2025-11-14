/**
 * IndexedDB wrapper for offline lesson progress storage
 * Stores lesson checkpoints when network is unavailable
 */

export interface LessonCheckpoint {
  id?: string;
  user_id?: string; // Optional for offline storage
  level: string;
  module_id: number;
  question_index: number;
  total_questions: number;
  question_phase: 'MCQ' | 'SPEAK_READY' | 'AWAITING_FEEDBACK' | 'COMPLETED';
  mcq_selected_choice?: 'A' | 'B' | 'C' | null;
  mcq_is_correct?: boolean;
  is_module_completed?: boolean;
  device_id?: string;
  timestamp: number; // Local timestamp
  retry_count?: number; // For exponential backoff
  last_retry?: number; // Last retry timestamp
}

const DB_NAME = 'tomass_offline_progress';
const DB_VERSION = 1;
const STORE_NAME = 'checkpoints';

class IndexedDBStore {
  private db: IDBDatabase | null = null;
  private dbPromise: Promise<IDBDatabase> | null = null;
  private isInitializing: boolean = false; // Bug #10 Fix: Mutex for initialization

  constructor() {
    this.initDB();
  }

  private async initDB(): Promise<IDBDatabase> {
    // Bug #10 Fix: Check if already initialized or in progress
    if (this.dbPromise) {
      return this.dbPromise;
    }

    // Bug #10 Fix: Mutex - wait if initialization in progress
    if (this.isInitializing) {
      // Wait for current initialization to complete
      await new Promise(resolve => setTimeout(resolve, 50));
      // Retry - by now dbPromise should be set
      if (this.dbPromise) {
        return this.dbPromise;
      }
    }

    // Bug #10 Fix: Set mutex before starting initialization
    this.isInitializing = true;

    this.dbPromise = new Promise((resolve, reject) => {
      // Check if IndexedDB is available
      if (!window.indexedDB) {
        reject(new Error('IndexedDB not available'));
        return;
      }

      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        this.isInitializing = false; // Bug #10 Fix: Release mutex on error
        reject(new Error('Failed to open IndexedDB'));
      };

      request.onsuccess = () => {
        this.db = request.result;
        this.isInitializing = false; // Bug #10 Fix: Release mutex on success
        resolve(this.db);
      };

      request.onupgradeneeded = () => {
        const db = request.result;

        // Create checkpoints store
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, {
            keyPath: 'id',
            autoIncrement: true
          });

          // Indexes for efficient querying
          store.createIndex('level_module', ['level', 'module_id'], { unique: false });
          store.createIndex('timestamp', 'timestamp', { unique: false });
          store.createIndex('user_id', 'user_id', { unique: false });
          store.createIndex('retry_count', 'retry_count', { unique: false });
        }
      };
    });

    return this.dbPromise;
  }

  /**
   * Add a checkpoint to offline storage
   */
  async addCheckpoint(checkpoint: LessonCheckpoint): Promise<void> {
    try {
      const db = await this.initDB();
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      // Add timestamp if not present
      const checkpointWithMeta = {
        ...checkpoint,
        timestamp: checkpoint.timestamp || Date.now(),
        retry_count: checkpoint.retry_count || 0,
        device_id: checkpoint.device_id || this.getDeviceId()
      };

      // For offline storage, use a composite key to avoid duplicates
      const key = `${checkpoint.level}-${checkpoint.module_id}`;
      checkpointWithMeta.id = key;

      await new Promise<void>((resolve, reject) => {
        const request = store.put(checkpointWithMeta);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });

      // Apple Store Compliance: Silent operation
    } catch (error) {
      // Apple Store Compliance: Silent fail - operation continues
      // Fall back to localStorage as last resort
      this.fallbackToLocalStorage(checkpoint);
    }
  }

  /**
   * Get all pending checkpoints for sync
   */
  async getAllCheckpoints(): Promise<LessonCheckpoint[]> {
    try {
      const db = await this.initDB();
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);

      return new Promise<LessonCheckpoint[]>((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      // Apple Store Compliance: Silent fail - operation continues
      return this.fallbackGetFromLocalStorage();
    }
  }

  /**
   * Get checkpoint for specific module
   */
  async getCheckpoint(level: string, moduleId: number): Promise<LessonCheckpoint | null> {
    try {
      const db = await this.initDB();
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);

      const key = `${level}-${moduleId}`;

      return new Promise<LessonCheckpoint | null>((resolve, reject) => {
        const request = store.get(key);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      // Apple Store Compliance: Silent fail - operation continues
      return null;
    }
  }

  /**
   * Remove checkpoint after successful sync
   */
  async removeCheckpoint(level: string, moduleId: number): Promise<void> {
    try {
      const db = await this.initDB();
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      const key = `${level}-${moduleId}`;

      await new Promise<void>((resolve, reject) => {
        const request = store.delete(key);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });

      // Apple Store Compliance: Silent operation
    } catch (error) {
      // Apple Store Compliance: Silent fail - operation continues
    }
  }

  /**
   * Update retry count for failed sync attempts
   */
  async updateRetryCount(level: string, moduleId: number, retryCount: number): Promise<void> {
    try {
      const checkpoint = await this.getCheckpoint(level, moduleId);
      if (checkpoint) {
        checkpoint.retry_count = retryCount;
        checkpoint.last_retry = Date.now();
        await this.addCheckpoint(checkpoint);
      }
    } catch (error) {
      // Apple Store Compliance: Silent fail - operation continues
    }
  }

  /**
   * Clear all checkpoints (for logout/reset)
   */
  async clearAll(): Promise<void> {
    try {
      const db = await this.initDB();
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      await new Promise<void>((resolve, reject) => {
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });

      // Apple Store Compliance: Silent operation
    } catch (error) {
      // Apple Store Compliance: Silent fail - operation continues
    }
  }

  /**
   * Get checkpoints that need retry (with exponential backoff)
   */
  async getCheckpointsForRetry(): Promise<LessonCheckpoint[]> {
    const allCheckpoints = await this.getAllCheckpoints();
    const now = Date.now();

    return allCheckpoints.filter(checkpoint => {
      const retryCount = checkpoint.retry_count || 0;
      const lastRetry = checkpoint.last_retry || checkpoint.timestamp;

      // Exponential backoff: 1s, 2s, 4s, 8s, 16s, then 30s max
      const backoffMs = Math.min(Math.pow(2, retryCount) * 1000, 30000);

      return (now - lastRetry) >= backoffMs;
    });
  }

  /**
   * Generate a simple device ID for tracking
   */
  private getDeviceId(): string {
    let deviceId = localStorage.getItem('tomass_device_id');
    if (!deviceId) {
      deviceId = 'device_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('tomass_device_id', deviceId);
    }
    return deviceId;
  }

  /**
   * Fallback to localStorage if IndexedDB fails
   */
  private fallbackToLocalStorage(checkpoint: LessonCheckpoint): void {
    try {
      const key = `tomass_offline_${checkpoint.level}_${checkpoint.module_id}`;
      localStorage.setItem(key, JSON.stringify(checkpoint));
      // Apple Store Compliance: Silent operation
    } catch (error) {
      // Apple Store Compliance: Silent fail - operation continues
    }
  }

  /**
   * Get checkpoints from localStorage fallback
   */
  private fallbackGetFromLocalStorage(): LessonCheckpoint[] {
    const checkpoints: LessonCheckpoint[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('tomass_offline_')) {
        try {
          const checkpoint = JSON.parse(localStorage.getItem(key) || '{}');
          checkpoints.push(checkpoint);
        } catch (error) {
          // Apple Store Compliance: Silent fail - operation continues
        }
      }
    }

    return checkpoints;
  }

  /**
   * Get storage stats for debugging
   */
  async getStorageStats(): Promise<{
    indexedDBCount: number;
    localStorageCount: number;
    totalSize: number;
  }> {
    try {
      const indexedDBCheckpoints = await this.getAllCheckpoints();
      const localStorageCheckpoints = this.fallbackGetFromLocalStorage();

      return {
        indexedDBCount: indexedDBCheckpoints.length,
        localStorageCount: localStorageCheckpoints.length,
        totalSize: JSON.stringify([...indexedDBCheckpoints, ...localStorageCheckpoints]).length
      };
    } catch (error) {
      return { indexedDBCount: 0, localStorageCount: 0, totalSize: 0 };
    }
  }
}

// Singleton instance
export const indexedDBStore = new IndexedDBStore();

// Export types
export type { LessonCheckpoint };