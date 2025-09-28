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

  constructor(config: Partial<LessonProgressServiceConfig> = {}) {
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
    const key = this.getCheckpointKey(checkpoint);

    // Clear existing debounce timer
    const existingTimer = this.debounceTimers.get(key);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    // Debounce saves to prevent spam
    const timer = setTimeout(async () => {
      this.debounceTimers.delete(key);
      await this.saveCheckpointInternal(checkpoint);
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
      console.error('❌ Failed to load progress:', error);
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
    console.log('🔄 Merging local progress with server for user:', userId);

    const result: ProgressSyncResult = {
      success: true,
      synced: 0,
      failed: 0,
      errors: []
    };

    try {
      // 1. Get all local checkpoints (IndexedDB + localStorage + ProgressStore)
      const localCheckpoints = await this.getAllLocalCheckpoints();
      console.log(`📱 Found ${localCheckpoints.length} local checkpoints`);

      // 2. For each local checkpoint, check if server has newer data
      for (const localCP of localCheckpoints) {
        try {
          const serverCP = await this.loadServerProgress(userId, localCP.level, localCP.module_id);

          if (!serverCP) {
            // No server data - upload local
            await this.saveToServer({ ...localCP, user_id: userId });
            result.synced++;
            console.log(`⬆️ Uploaded local progress: ${localCP.level}-${localCP.module_id}`);
          } else {
            // Compare timestamps - newer wins
            const localTime = localCP.timestamp || 0;
            const serverTime = new Date(serverCP.updated_at || 0).getTime();

            if (localTime > serverTime) {
              // Local is newer - upload to server
              await this.saveToServer({ ...localCP, user_id: userId });
              result.synced++;
              console.log(`🔄 Local newer, uploaded: ${localCP.level}-${localCP.module_id}`);
            } else {
              console.log(`⬇️ Server newer, keeping server data: ${localCP.level}-${localCP.module_id}`);
            }
          }

          // Clean up local storage after successful merge
          await indexedDBStore.removeCheckpoint(localCP.level, localCP.module_id);
        } catch (error) {
          result.failed++;
          result.errors.push(`Failed to merge ${localCP.level}-${localCP.module_id}: ${error}`);
          console.error('❌ Failed to merge checkpoint:', error);
        }
      }

      result.success = result.failed === 0;
      console.log(`✅ Merge complete: ${result.synced} synced, ${result.failed} failed`);

      return result;
    } catch (error) {
      console.error('❌ Merge failed:', error);
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

    // Clear localStorage progress
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('ll_progress_') || key.startsWith('tomass_offline_')) {
        localStorage.removeItem(key);
      }
    });

    console.log('🧹 All progress cleared');
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

  private async saveCheckpointInternal(checkpoint: LessonCheckpoint): Promise<void> {
    console.log(`💾 Saving checkpoint: ${checkpoint.level}-${checkpoint.module_id} Q${checkpoint.question_index} (${checkpoint.question_phase})`);

    // Always save locally first for immediate persistence
    await this.saveLocalProgress(checkpoint);

    // Try to save to server if user is authenticated and online
    if (checkpoint.user_id && this.isOnline) {
      try {
        await this.saveToServer(checkpoint);
        console.log(`☁️ Checkpoint synced to server: ${checkpoint.level}-${checkpoint.module_id}`);
      } catch (error) {
        console.error('❌ Failed to sync to server, queuing for retry:', error);

        if (this.config.enableOfflineQueue) {
          await indexedDBStore.addCheckpoint(checkpoint);
        }
      }
    } else if (checkpoint.user_id && this.config.enableOfflineQueue) {
      // User authenticated but offline - queue for later
      await indexedDBStore.addCheckpoint(checkpoint);
      console.log(`📦 Checkpoint queued for sync: ${checkpoint.level}-${checkpoint.module_id}`);
    }
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

    console.log(`✅ Server save successful:`, data);
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
      console.log(`🔄 Syncing ${checkpoints.length} queued checkpoints`);

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
      console.log(`✅ Sync complete: ${result.synced} synced, ${result.failed} failed`);

    } catch (error) {
      result.success = false;
      result.errors.push(`Sync failed: ${error}`);
      console.error('❌ Sync failed:', error);
    }

    this.setLastSyncTime(Date.now());
    return result;
  }

  private setupNetworkListeners(): void {
    window.addEventListener('online', () => {
      this.isOnline = true;
      console.log('🌐 Network online - triggering sync');
      setTimeout(() => this.syncOfflineQueue(), 1000);
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      console.log('📡 Network offline');
    });
  }

  private startPeriodicSync(): void {
    // Sync every 5 minutes when online
    setInterval(() => {
      if (this.isOnline) {
        this.syncOfflineQueue();
      }
    }, 5 * 60 * 1000);
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
    const time = localStorage.getItem('tomass_last_sync_time');
    return time ? parseInt(time, 10) : null;
  }

  private setLastSyncTime(time: number): void {
    localStorage.setItem('tomass_last_sync_time', time.toString());
  }
}

// Import the missing function
function getAllProgress() {
  try {
    const raw = localStorage.getItem('ll_progress_v1');
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