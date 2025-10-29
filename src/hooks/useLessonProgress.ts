/**
 * React hook for lesson progress management
 *
 * Provides easy-to-use interface for:
 * - Saving progress checkpoints
 * - Loading progress state
 * - Resume/continue functionality
 * - Sync status monitoring
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuthReady } from './useAuthReady';
import { useSyncStatus } from './useNetworkStatus';
import { lessonProgressService, type LessonCheckpoint, type ProgressSyncResult } from '@/services/lessonProgressService';

export interface LessonProgressState {
  // Current progress data
  currentProgress: LessonCheckpoint | null;

  // State flags
  isLoading: boolean;
  hasProgress: boolean;
  canResume: boolean;

  // Sync status
  isSyncing: boolean;
  isOnline: boolean;
  lastSyncAt: number | null;
  syncError: string | null;

  // Stats
  pendingCheckpoints: number;
}

export interface LessonProgressActions {
  // Save progress checkpoint
  saveCheckpoint: (checkpoint: Omit<LessonCheckpoint, 'user_id' | 'timestamp'>) => Promise<void>;

  // Load progress for module
  loadProgress: (level: string, moduleId: number) => Promise<LessonCheckpoint | null>;

  // Resume/reset actions
  resumeProgress: () => void;
  startFromBeginning: (level: string, moduleId: number) => Promise<void>;

  // Sync actions
  triggerSync: () => Promise<ProgressSyncResult>;
  clearAllProgress: () => Promise<void>;

  // Merge on login
  mergeProgressOnLogin: () => Promise<ProgressSyncResult>;
}

export function useLessonProgress(level?: string, moduleId?: number) {
  const { user, isAuthenticated } = useAuthReady();
  const syncStatus = useSyncStatus();

  const [state, setState] = useState<LessonProgressState>({
    currentProgress: null,
    isLoading: false,
    hasProgress: false,
    canResume: false,
    isSyncing: false,
    isOnline: true,
    lastSyncAt: null,
    syncError: null,
    pendingCheckpoints: 0
  });

  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const lastCheckpointRef = useRef<LessonCheckpoint | null>(null);

  // Update state from sync status
  useEffect(() => {
    setState(prev => ({
      ...prev,
      isSyncing: syncStatus.isSyncing,
      isOnline: syncStatus.isOnline,
      lastSyncAt: syncStatus.lastSyncAt,
      syncError: syncStatus.syncError
    }));
  }, [syncStatus]);

  // Load progress when level/module changes
  useEffect(() => {
    if (level && moduleId !== undefined) {
      loadProgress(level, moduleId);
    }
  }, [level, moduleId, user?.id]);

  // Auto-sync on user login
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      try {
        const hasLocalProgress = localStorage.getItem('ll_progress_v1');
        if (hasLocalProgress) {
          // Offer to merge progress
          mergeProgressOnLogin();
        }
      } catch (error) {
        // Apple Store Compliance: Silent fail - Safari Private Mode support
      }
    }
  }, [isAuthenticated, user?.id]);

  // Listen for sync triggers
  useEffect(() => {
    const handleTriggerSync = () => {
      triggerSync();
    };

    window.addEventListener('trigger-sync', handleTriggerSync);
    return () => window.removeEventListener('trigger-sync', handleTriggerSync);
  }, []);

  /**
   * Save a progress checkpoint
   */
  const saveCheckpoint = useCallback(async (checkpoint: Omit<LessonCheckpoint, 'user_id' | 'timestamp'>) => {
    const fullCheckpoint: LessonCheckpoint = {
      ...checkpoint,
      user_id: user?.id,
      timestamp: Date.now()
    };

    try {
      await lessonProgressService.saveCheckpoint(fullCheckpoint);

      // Update local state if this is the current module
      if (level === checkpoint.level && moduleId === checkpoint.module_id) {
        setState(prev => ({
          ...prev,
          currentProgress: fullCheckpoint,
          hasProgress: true,
          canResume: !checkpoint.is_module_completed
        }));
      }

      lastCheckpointRef.current = fullCheckpoint;
      // Apple Store Compliance: Silent fail
    } catch (error) {
      // Apple Store Compliance: Silent fail
      throw error;
    }
  }, [user?.id, level, moduleId]);

  /**
   * Load progress for a specific module
   */
  const loadProgress = useCallback(async (targetLevel: string, targetModuleId: number): Promise<LessonCheckpoint | null> => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const progress = await lessonProgressService.loadProgress(
        user?.id || '',
        targetLevel,
        targetModuleId
      );

      setState(prev => ({
        ...prev,
        currentProgress: progress,
        hasProgress: !!progress,
        canResume: !!progress && !progress.is_module_completed,
        isLoading: false
      }));

      return progress;
    } catch (error) {
      // Apple Store Compliance: Silent fail
      setState(prev => ({
        ...prev,
        currentProgress: null,
        hasProgress: false,
        canResume: false,
        isLoading: false
      }));
      return null;
    }
  }, [user?.id]);

  /**
   * Resume from saved progress
   */
  const resumeProgress = useCallback(() => {
    setShowResumeDialog(false);
    // Progress is already loaded in state.currentProgress
    // Apple Store Compliance: Silent fail
  }, []);

  /**
   * Start module from beginning
   */
  const startFromBeginning = useCallback(async (targetLevel: string, targetModuleId: number) => {
    setShowResumeDialog(false);

    // Save a fresh checkpoint at question 0
    await saveCheckpoint({
      level: targetLevel,
      module_id: targetModuleId,
      question_index: 0,
      total_questions: 40,
      question_phase: 'MCQ',
      is_module_completed: false
    });

    // Apple Store Compliance: Silent fail
  }, [saveCheckpoint]);

  /**
   * Trigger manual sync
   */
  const triggerSync = useCallback(async (): Promise<ProgressSyncResult> => {
    if (!syncStatus.isOnline) {
      return { success: false, synced: 0, failed: 0, errors: ['Offline'] };
    }

    syncStatus.startSync();

    try {
      const result = await lessonProgressService.syncOfflineQueue();
      syncStatus.completeSync(result.success, result.errors[0]);
      return result;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Sync failed';
      syncStatus.completeSync(false, errorMsg);
      return { success: false, synced: 0, failed: 1, errors: [errorMsg] };
    }
  }, [syncStatus]);

  /**
   * Clear all progress
   */
  const clearAllProgress = useCallback(async () => {
    await lessonProgressService.clearAllProgress();
    setState(prev => ({
      ...prev,
      currentProgress: null,
      hasProgress: false,
      canResume: false
    }));
    // Apple Store Compliance: Silent fail
  }, []);

  /**
   * Merge local progress with server on login
   */
  const mergeProgressOnLogin = useCallback(async (): Promise<ProgressSyncResult> => {
    if (!user?.id) {
      return { success: false, synced: 0, failed: 0, errors: ['No user ID'] };
    }

    syncStatus.startSync();

    try {
      const result = await lessonProgressService.mergeProgressOnLogin(user.id);
      syncStatus.completeSync(result.success, result.errors[0]);

      // Reload current progress after merge
      if (level && moduleId !== undefined) {
        await loadProgress(level, moduleId);
      }

      return result;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Merge failed';
      syncStatus.completeSync(false, errorMsg);
      return { success: false, synced: 0, failed: 1, errors: [errorMsg] };
    }
  }, [user?.id, syncStatus, level, moduleId, loadProgress]);

  /**
   * Show resume dialog if there's saved progress
   */
  const checkAndShowResumeDialog = useCallback((targetLevel: string, targetModuleId: number) => {
    loadProgress(targetLevel, targetModuleId).then(progress => {
      if (progress && !progress.is_module_completed && progress.question_index > 0) {
        setShowResumeDialog(true);
      }
    });
  }, [loadProgress]);

  /**
   * Get progress percentage for a module
   */
  const getProgressPercentage = useCallback((progress: LessonCheckpoint | null): number => {
    if (!progress) return 0;
    if (progress.is_module_completed) return 100;
    return Math.round((progress.question_index / progress.total_questions) * 100);
  }, []);

  /**
   * Get user-friendly phase description
   */
  const getPhaseDescription = useCallback((phase: string): string => {
    switch (phase) {
      case 'MCQ': return 'Multiple Choice';
      case 'SPEAK_READY': return 'Ready to Speak';
      case 'AWAITING_FEEDBACK': return 'Processing Speech';
      case 'COMPLETED': return 'Completed';
      default: return 'In Progress';
    }
  }, []);

  return {
    // State
    ...state,
    showResumeDialog,

    // Actions
    saveCheckpoint,
    loadProgress,
    resumeProgress,
    startFromBeginning,
    triggerSync,
    clearAllProgress,
    mergeProgressOnLogin,
    checkAndShowResumeDialog,

    // Utilities
    getProgressPercentage,
    getPhaseDescription,

    // Dialog control
    setShowResumeDialog
  };
}

/**
 * Hook for global progress statistics
 */
export function useProgressStats() {
  const { user } = useAuthReady();
  const [stats, setStats] = useState({
    totalModulesStarted: 0,
    modulesCompleted: 0,
    levelsActive: [] as string[],
    lastActivity: null as Date | null,
    inProgressModules: [] as any[]
  });

  useEffect(() => {
    if (!user?.id) return;

    // TODO: Implement stats fetching from Supabase
    // This would call the get_user_progress_summary function

  }, [user?.id]);

  return stats;
}