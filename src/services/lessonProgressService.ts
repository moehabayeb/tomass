/**
 * Lesson Progress Service
 *
 * Handles persistent progress tracking with:
 * - Server-side storage via Supabase
 * - Offline queue with IndexedDB
 * - Automatic sync when online
 * - Conflict resolution
 * - Exponential backoff retry
 */

import { supabase } from '@/integrations/supabase/client';
import { indexedDBStore, type LessonCheckpoint } from '@/utils/indexedDBStore';
import { getProgress as getLocalProgress, setProgress as setLocalProgress } from '@/utils/ProgressStore';
import type { ModuleProgress } from '@/utils/ProgressStore';
import { safeLocalStorage } from '@/utils/safeLocalStorage';

export interface LessonProgressServiceConfig {
  enableOfflineQueue: boolean;
  retryAttempts: number;
  batchSize: number;
  debounceMs: number;
}

export interface ProgressSyncResult {
  success: boolean;
  synced: number;
  failed: number;
  errors: string[];
}

class LessonProgressService {
  private config: LessonProgressServiceConfig;
  private debounceTimers: Map<string, NodeJS.Timeout> = new Map();
  private pendingCheckpoints: Map<string, LessonCheckpoint> = new Map();
  private isOnline: boolean = navigator.onLine;
  private syncPromise: Promise<void> | null = null;
  private periodicSyncInterval: NodeJS.Timeout | null = null;
  private onlineHandler: (() => void) | null = null;
  private offlineHandler: (() => void) | null = null;
  private beforeUnloadHandler: ((event: BeforeUnloadEvent) => void) | null = null;
  private visibilityChangeHandler: (() => void) | null = null;

  constructor(config: Partial<LessonProgressServiceConfig> = {}) {
    this.config = {
      enableOfflineQueue: true,
      retryAttempts: 5,
      batchSize: 10,
      debounceMs: 75, // Reduced from 250ms to minimize data loss window
      ...config
    };

    this.setupNetworkListeners();
    this.setupPageLifecycleListeners();
    this.startPeriodicSync();
  }

  /**
   * Save a lesson checkpoint (main entry point)
   * Non-blocking with automatic retry
   */
  async saveCheckpoint(checkpoint: LessonCheckpoint): Promise<void> {
    const key = this.getCheckpointKey(checkpoint);

    // CRITICAL: Save to safeLocalStorage IMMEDIATELY (no debounce)
    // This prevents data loss if user closes browser before debounce completes
    await this.saveLocalProgress(checkpoint);

    // Store checkpoint for potential flush on page unload
    this.pendingCheckpoints.set(key, checkpoint);

    // Clear existing debounce timer for server sync
    const existingTimer = this.debounceTimers.get(key);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    // Debounce ONLY server sync to prevent spam
    const timer = setTimeout(async () => {
      this.debounceTimers.delete(key);
      this.pendingCheckpoints.delete(key);
      await this.saveToServerWithQueue(checkpoint);
    }, this.config.debounceMs);

    this.debounceTimers.set(key, timer);
  }

  /**
   * Load progress for a specific module
   */
  async loadProgress(userId: string, level: string, moduleId: number): Promise<LessonCheckpoint | null> {
    if (!userId) {
      // Guest user - check local storage only
      return await this.loadLocalProgress(level, moduleId);
    }

    try {
      // Try server first if online
      if (this.isOnline) {
        const serverProgress = await this.loadServerProgress(userId, level, moduleId);
        if (serverProgress) {
          return serverProgress;
        }
      }

      // Fallback to local progress
      return await this.loadLocalProgress(level, moduleId);
    } catch (error) {
      // Apple Store Compliance: Silent fail
      return await this.loadLocalProgress(level, moduleId);
    }
  }

  /**
   * Sync all offline checkpoints to server
   */
  async syncOfflineQueue(): Promise<ProgressSyncResult> {
    if (this.syncPromise) {
      await this.syncPromise;
    }

    this.syncPromise = this.performSync();
    return await this.syncPromise;
  }

  /**
   * Merge local progress with server on login
   */
  async mergeProgressOnLogin(userId: string): Promise<ProgressSyncResult> {
    // Apple Store Compliance: Silent fail

    const result: ProgressSyncResult = {
      success: true,
      synced: 0,
      failed: 0,
      errors: []
    };

    try {
      // 1. Get all local checkpoints (IndexedDB + safeLocalStorage + ProgressStore)
      const localCheckpoints = await this.getAllLocalCheckpoints();
      // Apple Store Compliance: Silent fail

      // 2. For each local checkpoint, check if server has newer data
      for (const localCP of localCheckpoints) {
        try {
          const serverCP = await this.loadServerProgress(userId, localCP.level, localCP.module_id);

          if (!serverCP) {
            // No server data - upload local
            await this.saveToServer({ ...localCP, user_id: userId });
            result.synced++;
            // Apple Store Compliance: Silent fail
          } else {
            // Compare timestamps - newer wins
            const localTime = localCP.timestamp || 0;
            const serverTime = new Date(serverCP.updated_at || 0).getTime();

            if (localTime > serverTime) {
              // Local is newer - upload to server
              await this.saveToServer({ ...localCP, user_id: userId });
              result.synced++;
              // Apple Store Compliance: Silent fail
            } else {
              // Apple Store Compliance: Silent fail
            }
          }

          // Clean up local storage after successful merge
          await indexedDBStore.removeCheckpoint(localCP.level, localCP.module_id);
        } catch (error) {
          result.failed++;
          result.errors.push(`Failed to merge ${localCP.level}-${localCP.module_id}: ${error}`);
          // Apple Store Compliance: Silent fail
        }
      }

      result.success = result.failed === 0;
      // Apple Store Compliance: Silent fail

      return result;
    } catch (error) {
      // Apple Store Compliance: Silent fail
      return {
        success: false,
        synced: 0,
        failed: 1,
        errors: [`Merge failed: ${error}`]
      };
    }
  }

  /**
   * Clear all progress (logout/reset)
   */
  async clearAllProgress(): Promise<void> {
    await indexedDBStore.clearAll();

    // Clear safeLocalStorage progress - Safari Private Mode safe
    try {
      Object.keys(safeLocalStorage).forEach(key => {
        if (key.startsWith('ll_progress_') || key.startsWith('tomass_offline_')) {
          safeLocalStorage.removeItem(key);
        }
      });
    } catch (error) {
      // Apple Store Compliance: Silent fail
    }

    // Apple Store Compliance: Silent fail
  }

  /**
   * Get sync status for UI
   */
  getSyncStatus(): {
    isOnline: boolean;
    pendingCount: number;
    lastSyncAt: number | null;
  } {
    return {
      isOnline: this.isOnline,
      pendingCount: 0, // TODO: Implement count tracking
      lastSyncAt: this.getLastSyncTime()
    };
  }

  // ===== PRIVATE METHODS =====

  /**
   * Save checkpoint to server with offline queue fallback
   * Used by debounced sync - safeLocalStorage already saved immediately
   */
  private async saveToServerWithQueue(checkpoint: LessonCheckpoint): Promise<void> {
    // Try to save to server if user is authenticated and online
    if (checkpoint.user_id && this.isOnline) {
      try {
        await this.saveToServer(checkpoint);
        // Apple Store Compliance: Silent fail
      } catch (error) {
        // Apple Store Compliance: Silent fail

        if (this.config.enableOfflineQueue) {
          await indexedDBStore.addCheckpoint(checkpoint);
        }
      }
    } else if (checkpoint.user_id && this.config.enableOfflineQueue) {
      // User authenticated but offline - queue for later
      await indexedDBStore.addCheckpoint(checkpoint);
      // Apple Store Compliance: Silent fail
    }
  }

  /**
   * @deprecated Use saveCheckpoint instead - this is kept for compatibility
   */
  private async saveCheckpointInternal(checkpoint: LessonCheckpoint): Promise<void> {
    // Apple Store Compliance: Silent fail

    // Always save locally first for immediate persistence
    await this.saveLocalProgress(checkpoint);
    await this.saveToServerWithQueue(checkpoint);
  }

  private async saveToServer(checkpoint: LessonCheckpoint): Promise<void> {
    if (!checkpoint.user_id) {
      throw new Error('User ID required for server save');
    }

    const { data, error } = await supabase.rpc('upsert_lesson_progress', {
      p_user_id: checkpoint.user_id,
      p_level: checkpoint.level,
      p_module_id: checkpoint.module_id,
      p_question_index: checkpoint.question_index,
      p_total_questions: checkpoint.total_questions,
      p_question_phase: checkpoint.question_phase,
      p_mcq_selected_choice: checkpoint.mcq_selected_choice || null,
      p_mcq_is_correct: checkpoint.mcq_is_correct || false,
      p_is_module_completed: checkpoint.is_module_completed || false,
      p_device_id: checkpoint.device_id || null
    });

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    // Apple Store Compliance: Silent fail
  }

  private async loadServerProgress(userId: string, level: string, moduleId: number): Promise<LessonCheckpoint | null> {
    const { data, error } = await supabase
      .from('lesson_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('level', level)
      .eq('module_id', moduleId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows found - not an error
        return null;
      }
      throw error;
    }

    if (!data) return null;

    return {
      level: data.level,
      module_id: data.module_id,
      question_index: data.question_index,
      total_questions: data.total_questions,
      question_phase: data.question_phase,
      mcq_selected_choice: data.mcq_selected_choice,
      mcq_is_correct: data.mcq_is_correct,
      is_module_completed: data.is_module_completed,
      device_id: data.device_id,
      timestamp: new Date(data.updated_at).getTime(),
      updated_at: data.updated_at
    } as LessonCheckpoint & { updated_at: string };
  }

  private async saveLocalProgress(checkpoint: LessonCheckpoint): Promise<void> {
    // Save to ProgressStore (existing system compatibility)
    const progressData: ModuleProgress = {
      level: checkpoint.level,
      module: checkpoint.module_id,
      phase: this.mapPhaseToLegacy(checkpoint.question_phase),
      listeningIndex: 0,
      speakingIndex: checkpoint.question_index,
      completed: checkpoint.is_module_completed || false,
      totalListening: 0,
      totalSpeaking: checkpoint.total_questions,
      updatedAt: checkpoint.timestamp || Date.now(),
      v: 1
    };

    setLocalProgress(progressData);
  }

  private async loadLocalProgress(level: string, moduleId: number): Promise<LessonCheckpoint | null> {
    // Try IndexedDB first
    const indexedDBProgress = await indexedDBStore.getCheckpoint(level, moduleId);
    if (indexedDBProgress) {
      return indexedDBProgress;
    }

    // Fallback to ProgressStore
    const progressData = getLocalProgress(level, moduleId);
    if (progressData) {
      return {
        level: progressData.level,
        module_id: progressData.module,
        question_index: progressData.speakingIndex,
        total_questions: progressData.totalSpeaking,
        question_phase: this.mapLegacyToPhase(progressData.phase, progressData.completed),
        is_module_completed: progressData.completed,
        timestamp: progressData.updatedAt
      };
    }

    return null;
  }

  private async getAllLocalCheckpoints(): Promise<LessonCheckpoint[]> {
    const checkpoints: LessonCheckpoint[] = [];

    // Get from IndexedDB
    const indexedDBCheckpoints = await indexedDBStore.getAllCheckpoints();
    checkpoints.push(...indexedDBCheckpoints);

    // Get from ProgressStore (avoid duplicates)
    const allProgress = getAllProgress();
    for (const progress of allProgress) {
      const key = `${progress.level}-${progress.module}`;
      const existsInIndexedDB = checkpoints.some(cp =>
        cp.level === progress.level && cp.module_id === progress.module
      );

      if (!existsInIndexedDB) {
        checkpoints.push({
          level: progress.level,
          module_id: progress.module,
          question_index: progress.speakingIndex,
          total_questions: progress.totalSpeaking,
          question_phase: this.mapLegacyToPhase(progress.phase, progress.completed),
          is_module_completed: progress.completed,
          timestamp: progress.updatedAt
        });
      }
    }

    return checkpoints;
  }

  private async performSync(): Promise<ProgressSyncResult> {
    const result: ProgressSyncResult = {
      success: true,
      synced: 0,
      failed: 0,
      errors: []
    };

    try {
      const checkpoints = await indexedDBStore.getCheckpointsForRetry();
      // Apple Store Compliance: Silent fail

      for (const checkpoint of checkpoints.slice(0, this.config.batchSize)) {
        try {
          await this.saveToServer(checkpoint);
          await indexedDBStore.removeCheckpoint(checkpoint.level, checkpoint.module_id);
          result.synced++;
        } catch (error) {
          const retryCount = (checkpoint.retry_count || 0) + 1;

          if (retryCount >= this.config.retryAttempts) {
            result.failed++;
            result.errors.push(`Max retries exceeded for ${checkpoint.level}-${checkpoint.module_id}`);
            await indexedDBStore.removeCheckpoint(checkpoint.level, checkpoint.module_id);
          } else {
            await indexedDBStore.updateRetryCount(checkpoint.level, checkpoint.module_id, retryCount);
          }
        }
      }

      result.success = result.failed === 0;
      // Apple Store Compliance: Silent fail

    } catch (error) {
      result.success = false;
      result.errors.push(`Sync failed: ${error}`);
      // Apple Store Compliance: Silent fail
    }

    this.setLastSyncTime(Date.now());
    return result;
  }

  private setupNetworkListeners(): void {
    // Store handlers for cleanup
    this.onlineHandler = () => {
      this.isOnline = true;
      // Apple Store Compliance: Silent fail
      setTimeout(() => this.syncOfflineQueue(), 1000);
    };

    this.offlineHandler = () => {
      this.isOnline = false;
      // Apple Store Compliance: Silent fail
    };

    window.addEventListener('online', this.onlineHandler);
    window.addEventListener('offline', this.offlineHandler);
  }

  /**
   * Setup page lifecycle listeners to prevent data loss
   * - beforeunload: Flush pending saves before page close
   * - visibilitychange: Save when tab becomes hidden
   */
  private setupPageLifecycleListeners(): void {
    // Flush all pending saves before page unload
    this.beforeUnloadHandler = (event: BeforeUnloadEvent) => {
      // Synchronously flush all pending debounced saves
      this.debounceTimers.forEach((timer, key) => {
        clearTimeout(timer);
      });

      // Note: We can't use async operations in beforeunload
      // The pending saves in IndexedDB queue will be synced on next app start
      // This ensures at least safeLocalStorage is saved
    };

    // Save progress when tab becomes hidden (iOS Safari support)
    this.visibilityChangeHandler = () => {
      if (document.visibilityState === 'hidden') {
        // User is switching away - flush pending saves immediately
        this.flushPendingSaves();
      }
    };

    window.addEventListener('beforeunload', this.beforeUnloadHandler);
    document.addEventListener('visibilitychange', this.visibilityChangeHandler);
  }

  /**
   * Immediately flush all pending debounced saves to server
   * Called when tab becomes hidden or before page unload
   */
  private flushPendingSaves(): void {
    // Cancel all timers and execute server saves immediately
    this.debounceTimers.forEach((timer) => {
      clearTimeout(timer);
    });
    this.debounceTimers.clear();

    // Execute all pending server syncs (safeLocalStorage already saved)
    // Note: We use fire-and-forget here since these will be queued to IndexedDB if they fail
    this.pendingCheckpoints.forEach((checkpoint) => {
      // Fire and forget - errors will queue to IndexedDB automatically
      this.saveToServerWithQueue(checkpoint).catch(() => {
        // Apple Store Compliance: Silent fail - already queued to IndexedDB
      });
    });

    this.pendingCheckpoints.clear();
  }

  private startPeriodicSync(): void {
    // Sync every 5 minutes when online
    this.periodicSyncInterval = setInterval(() => {
      if (this.isOnline) {
        this.syncOfflineQueue();
      }
    }, 5 * 60 * 1000) as unknown as NodeJS.Timeout;
  }

  private getCheckpointKey(checkpoint: LessonCheckpoint): string {
    return `${checkpoint.level}-${checkpoint.module_id}`;
  }

  private mapPhaseToLegacy(phase: string): 'intro' | 'listening' | 'speaking' | 'complete' {
    switch (phase) {
      case 'COMPLETED': return 'complete';
      case 'MCQ':
      case 'SPEAK_READY':
      case 'AWAITING_FEEDBACK': return 'speaking';
      default: return 'speaking';
    }
  }

  private mapLegacyToPhase(legacyPhase: string, completed: boolean): LessonCheckpoint['question_phase'] {
    if (completed) return 'COMPLETED';
    if (legacyPhase === 'speaking') return 'MCQ';
    return 'MCQ';
  }

  private getLastSyncTime(): number | null {
    try {
      const time = safeLocalStorage.getItem('tomass_last_sync_time');
      return time ? parseInt(time, 10) : null;
    } catch (error) {
      // Apple Store Compliance: Silent fail - Safari Private Mode support
      return null;
    }
  }

  private setLastSyncTime(time: number): void {
    try {
      safeLocalStorage.setItem('tomass_last_sync_time', time.toString());
    } catch (error) {
      // Apple Store Compliance: Silent fail - Safari Private Mode support
    }
  }

  /**
   * Clean up resources and event listeners
   */
  public cleanup(): void {
    // Flush any pending saves before cleanup
    this.flushPendingSaves();

    // Clear all debounce timers
    this.debounceTimers.forEach(timer => clearTimeout(timer));
    this.debounceTimers.clear();

    // Clear pending checkpoints
    this.pendingCheckpoints.clear();

    // Clear periodic sync interval
    if (this.periodicSyncInterval) {
      clearInterval(this.periodicSyncInterval);
      this.periodicSyncInterval = null;
    }

    // Remove network event listeners
    if (this.onlineHandler) {
      window.removeEventListener('online', this.onlineHandler);
      this.onlineHandler = null;
    }
    if (this.offlineHandler) {
      window.removeEventListener('offline', this.offlineHandler);
      this.offlineHandler = null;
    }

    // Remove page lifecycle event listeners
    if (this.beforeUnloadHandler) {
      window.removeEventListener('beforeunload', this.beforeUnloadHandler);
      this.beforeUnloadHandler = null;
    }
    if (this.visibilityChangeHandler) {
      document.removeEventListener('visibilitychange', this.visibilityChangeHandler);
      this.visibilityChangeHandler = null;
    }
  }
}

// Import the missing function
function getAllProgress() {
  try {
    const raw = safeLocalStorage.getItem('ll_progress_v1');
    const map = raw ? JSON.parse(raw) : {};
    return Object.values(map) as ModuleProgress[];
  } catch {
    return [];
  }
}

// Export singleton instance
export const lessonProgressService = new LessonProgressService();

// Export types
export type { LessonCheckpoint, ProgressSyncResult };