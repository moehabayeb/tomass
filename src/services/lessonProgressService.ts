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
import { getProgress as getLocalProgress, setProgress as setLocalProgress, getAllProgress } from '@/utils/ProgressStore';
import type { ModuleProgress } from '@/utils/ProgressStore';
import { logger } from '@/lib/logger';

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
  private isOnline: boolean = navigator.onLine;
  private syncPromise: Promise<void> | null = null;
  private periodicSyncInterval: NodeJS.Timeout | null = null;
  private onlineHandler: (() => void) | null = null;
  private offlineHandler: (() => void) | null = null;

  constructor(config: Partial<LessonProgressServiceConfig> = {}) {
    if (import.meta.env.DEV) {
      logger.log('🚀 LessonProgressService v3.0 - Production Ready');
    }

    this.config = {
      enableOfflineQueue: true,
      retryAttempts: 5,
      batchSize: 10,
      debounceMs: 250,
      ...config
    };

    this.setupNetworkListeners();
    this.startPeriodicSync();
  }

  /**
   * Save a lesson checkpoint (main entry point)
   * Non-blocking with automatic retry
   */
  async saveCheckpoint(checkpoint: LessonCheckpoint): Promise<void> {
    // Always save locally immediately — never lose data to debounce
    await this.saveLocalProgress(checkpoint);

    const key = this.getCheckpointKey(checkpoint);

    // Clear existing debounce timer
    const existingTimer = this.debounceTimers.get(key);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    // Only debounce the server save
    const timer = setTimeout(async () => {
      this.debounceTimers.delete(key);
      if (checkpoint.user_id && this.isOnline) {
        try {
          await this.saveToServer(checkpoint);
        } catch (error) {
          // Completion rows are the ones that gate module unlock — surface their
          // failure loudly in DEV so a lost completion is never invisible.
          if (import.meta.env.DEV && checkpoint.is_module_completed) {
            logger.warn('[lessonProgress] completion row failed to persist; queued offline:',
              checkpoint.level, checkpoint.module_id, error);
          }
          if (this.config.enableOfflineQueue) {
            await indexedDBStore.addCheckpoint(checkpoint);
          }
        }
      } else if (checkpoint.user_id && this.config.enableOfflineQueue) {
        await indexedDBStore.addCheckpoint(checkpoint);
      }
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
      // 1. Get all local checkpoints (IndexedDB + localStorage + ProgressStore)
      const localCheckpoints = await this.getAllLocalCheckpoints();
      // Apple Store Compliance: Silent fail

      // 2. For each local checkpoint, check if server has newer data
      for (const localCP of localCheckpoints) {
        // Skip empty placement seeds (index 0, no total, not completed) — nothing to
        // merge, and uploading them creates junk "module started" rows server-side.
        if (!localCP.is_module_completed && localCP.question_index === 0 &&
            (localCP.total_questions ?? 0) === 0) {
          continue;
        }
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

    // Clear localStorage progress - Safari Private Mode safe
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('ll_progress_') || key.startsWith('tomass_offline_')) {
          localStorage.removeItem(key);
        }
      });
      // Clear session resume keys so next user doesn't inherit stale data
      localStorage.removeItem('lastActiveLevel');
      localStorage.removeItem('lastActiveModule');
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
      pendingCount: 0, // Note: Pending count not tracked for simplicity
      lastSyncAt: this.getLastSyncTime()
    };
  }

  // ===== PRIVATE METHODS =====

  private async saveCheckpointInternal(checkpoint: LessonCheckpoint): Promise<void> {
    // Apple Store Compliance: Silent fail

    // Always save locally first for immediate persistence
    await this.saveLocalProgress(checkpoint);

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

  private async saveToServer(checkpoint: LessonCheckpoint): Promise<void> {
    if (!checkpoint.user_id) {
      throw new Error('User ID required for server save');
    }

    // FIX: failures MUST propagate. A previous "emergency fix" wrapped this in a
    // swallowing catch, which made every caller believe the save succeeded — the
    // IndexedDB offline queue and the retry counter became dead code, and any real
    // cloud failure (expired JWT, 5xx, RLS) silently lost the user's progress.
    // Callers all handle rejection: saveCheckpoint queues to IndexedDB,
    // mergeProgressOnLogin keeps the local copy, performSync counts the retry.
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
      if (import.meta.env.DEV) {
        logger.warn('Supabase RPC error (upsert_lesson_progress):', error.code, error.message);
      }
      // Throw so caller can queue to IndexedDB as fallback
      throw new Error(`RPC failed: ${error.message}`);
    }

    // DEV visibility: the RPC's backwards-progress guard keeps the newer server row
    // and reports it via the 'updated' flag (v2 migration). Not a failure — no queue.
    if (import.meta.env.DEV && data && (data as { updated?: boolean }).updated === false) {
      logger.warn('[lessonProgress] server kept newer row (backwards-progress guard):',
        checkpoint.level, checkpoint.module_id);
    }
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
      // PGRST116 = No rows found (normal)
      // PGRST204 = Table/relation doesn't exist
      // 42P01 = PostgreSQL "relation does not exist"
      if (error.code === 'PGRST116' || error.code === 'PGRST204' || error.code === '42P01') {
        return null;
      }
      // 🔧 GOD-LEVEL FIX: Don't throw - gracefully fallback to local storage
      // This prevents infinite loop when Supabase table doesn't exist
      if (import.meta.env.DEV) {
        logger.warn('Supabase progress load error:', error.code, error.message);
      }
      return null;
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
      v: 1,
      // Checkpoint fidelity: keep the granular phase + MCQ answer locally so the
      // exact position survives an app kill inside the 250ms server debounce.
      questionPhase: checkpoint.question_phase,
      mcqSelectedChoice: checkpoint.mcq_selected_choice ?? null,
      mcqIsCorrect: checkpoint.mcq_is_correct ?? false
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
        // Prefer the stored granular phase; mapLegacyToPhase is only the fallback
        // for pre-fidelity records (it can't do better than 'MCQ'/'COMPLETED').
        question_phase: progressData.questionPhase
          ?? this.mapLegacyToPhase(progressData.phase, progressData.completed),
        mcq_selected_choice: progressData.mcqSelectedChoice,
        mcq_is_correct: progressData.mcqIsCorrect,
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
          question_phase: progress.questionPhase
            ?? this.mapLegacyToPhase(progress.phase, progress.completed),
          mcq_selected_choice: progress.mcqSelectedChoice,
          mcq_is_correct: progress.mcqIsCorrect,
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
            // Park the checkpoint instead of deleting it: progress stays on-device
            // (recoverable / not silently lost) and getCheckpointsForRetry() stops
            // retrying it once retry_count hits the park threshold.
            result.failed++;
            result.errors.push(`Max retries exceeded (parked, not deleted) for ${checkpoint.level}-${checkpoint.module_id}`);
            if (import.meta.env.DEV) {
              console.warn(`[lessonProgress] checkpoint parked after ${retryCount} failed syncs:`, checkpoint.level, checkpoint.module_id, error);
            }
          }
          await indexedDBStore.updateRetryCount(checkpoint.level, checkpoint.module_id, retryCount);
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
      const time = localStorage.getItem('tomass_last_sync_time');
      return time ? parseInt(time, 10) : null;
    } catch (error) {
      // Apple Store Compliance: Silent fail - Safari Private Mode support
      return null;
    }
  }

  private setLastSyncTime(time: number): void {
    try {
      localStorage.setItem('tomass_last_sync_time', time.toString());
    } catch (error) {
      // Apple Store Compliance: Silent fail - Safari Private Mode support
    }
  }

  /**
   * PRODUCTION FIX: Load all progress from cloud and merge with local
   * Called on sign-in to get progress from other devices
   */
  async loadProgressFromCloud(userId: string): Promise<void> {
    if (!userId) return;

    logger.log('[LessonProgress] Loading progress from cloud for user:', userId);

    try {
      const { data, error } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        // Table might not exist or other error
        if (error.code !== 'PGRST116' && error.code !== '42P01') {
          logger.error('[LessonProgress] Cloud load error:', error);
        }
        return;
      }

      if (!data || data.length === 0) {
        logger.log('[LessonProgress] No cloud progress found');
        return;
      }

      logger.log(`[LessonProgress] Found ${data.length} modules in cloud`);

      // Convert to local format and save
      for (const row of data) {
        const checkpoint: LessonCheckpoint = {
          user_id: userId,
          level: row.level,
          module_id: row.module_id,
          question_index: row.question_index || 0,
          total_questions: row.total_questions || 0,
          question_phase: row.question_phase || 'MCQ',
          mcq_selected_choice: row.mcq_selected_choice,
          mcq_is_correct: row.mcq_is_correct,
          is_module_completed: row.is_module_completed || false,
          device_id: row.device_id,
          timestamp: new Date(row.updated_at || Date.now()).getTime()
        };

        // Timestamp guard: never overwrite strictly-newer local progress with older
        // cloud data (guest progress made before sign-in, or a slow multi-device
        // echo). Completions always land — they gate module unlock.
        const local = getLocalProgress(row.level, row.module_id);
        if (local && !checkpoint.is_module_completed &&
            local.updatedAt > new Date(row.updated_at || 0).getTime()) {
          continue;
        }

        // Save to local storage
        await this.saveLocalProgress(checkpoint);
      }

      // Rebuild completedModules array from ll_progress_v1 so ModulesView stays consistent
      const allProgress = getAllProgress();
      const completedModules: string[] = [];
      try {
        const existing = JSON.parse(localStorage.getItem('completedModules') || '[]');
        if (Array.isArray(existing)) completedModules.push(...existing);
      } catch {}

      for (const p of allProgress) {
        if (p.completed) {
          const key = `module-${p.module}`;
          if (!completedModules.includes(key)) {
            completedModules.push(key);
          }
        }
      }
      localStorage.setItem('completedModules', JSON.stringify(completedModules));

      logger.log('[LessonProgress] Cloud progress loaded successfully');
    } catch (err) {
      logger.error('[LessonProgress] Failed to load cloud progress:', err);
    }
  }

  /**
   * PRODUCTION FIX: Sync ALL local progress to cloud
   * Called on sign-in to upload local progress
   */
  async syncAllProgressToCloud(userId: string): Promise<void> {
    if (!userId) return;

    logger.log('[LessonProgress] Syncing all progress to cloud for user:', userId);

    try {
      // Get all local checkpoints
      const localCheckpoints = await this.getAllLocalCheckpoints();

      if (localCheckpoints.length === 0) {
        logger.log('[LessonProgress] No local progress to sync');
        return;
      }

      logger.log(`[LessonProgress] Found ${localCheckpoints.length} local checkpoints to sync`);

      // FIX: go through the upsert_lesson_progress RPC (per record) instead of a
      // direct batch .upsert. The direct upsert bypassed the server's
      // backwards-progress guard, so a stale local index at logout could overwrite
      // a higher cloud position. N is small (modules touched on this device) and
      // this path is already best-effort inside useAuthReady's try/catch.
      let failures = 0;
      for (const cp of localCheckpoints) {
        // Skip empty placement seeds — nothing to sync, avoids junk rows
        if (!cp.is_module_completed && cp.question_index === 0 &&
            (cp.total_questions ?? 0) === 0) {
          continue;
        }

        const { error } = await supabase.rpc('upsert_lesson_progress', {
          p_user_id: userId,
          p_level: cp.level,
          p_module_id: cp.module_id,
          p_question_index: cp.question_index || 0,
          p_total_questions: cp.total_questions || 0,
          p_question_phase: cp.question_phase || 'MCQ',
          p_mcq_selected_choice: cp.mcq_selected_choice || null,
          p_mcq_is_correct: cp.mcq_is_correct || false,
          p_is_module_completed: cp.is_module_completed || false,
          p_device_id: cp.device_id || null
        });

        if (error) {
          failures++;
          logger.error('[LessonProgress] Logout sync failed for', cp.level, cp.module_id, error);
          // Continue with remaining records instead of failing completely
        }
      }

      logger.log(`[LessonProgress] Cloud sync complete (${failures} failed)`);
    } catch (err) {
      logger.error('[LessonProgress] Failed to sync to cloud:', err);
    }
  }

  /**
   * Clean up resources and event listeners
   */
  public cleanup(): void {
    // Clear all debounce timers
    this.debounceTimers.forEach(timer => clearTimeout(timer));
    this.debounceTimers.clear();

    // Clear periodic sync interval
    if (this.periodicSyncInterval) {
      clearInterval(this.periodicSyncInterval);
      this.periodicSyncInterval = null;
    }

    // Remove event listeners
    if (this.onlineHandler) {
      window.removeEventListener('online', this.onlineHandler);
      this.onlineHandler = null;
    }
    if (this.offlineHandler) {
      window.removeEventListener('offline', this.offlineHandler);
      this.offlineHandler = null;
    }
  }
}

// NOTE: a duplicate local `function getAllProgress()` used to live here, shadowing
// the identical import from '@/utils/ProgressStore' (both read ll_progress_v1).
// Removed — the import is the single source of truth.

// Export singleton instance
export const lessonProgressService = new LessonProgressService();

// Export class for tests (construct isolated instances with custom config)
export { LessonProgressService };

// Export types
export type { LessonCheckpoint, ProgressSyncResult };