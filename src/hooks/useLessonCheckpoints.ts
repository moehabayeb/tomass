/**
 * Custom hook for easy integration of checkpoint tracking into existing LessonsApp
 *
 * This hook provides checkpoint functions that can be called at key points
 * without requiring major refactoring of the existing component
 */

import { useCallback, useEffect, useRef } from 'react';
import { useLessonProgress } from './useLessonProgress';
import { useAuthReady } from './useAuthReady';

export interface CheckpointOptions {
  level: string;
  moduleId: number;
  questionIndex: number;
  totalQuestions?: number;
  mcqChoice?: 'A' | 'B' | 'C';
  mcqCorrect?: boolean;
  completed?: boolean;
}

export function useLessonCheckpoints(level?: string, moduleId?: number) {
  const { user } = useAuthReady();
  const progress = useLessonProgress(level, moduleId);
  const lastCheckpointRef = useRef<string>('');

  /**
   * Save checkpoint when MCQ is displayed
   */
  const checkpointMCQShown = useCallback(async (options: CheckpointOptions) => {
    const key = `${options.level}-${options.moduleId}-${options.questionIndex}-MCQ`;
    if (lastCheckpointRef.current === key) return; // Prevent duplicate saves

    // Never fabricate a total (was `|| 40`): a wrong total corrupts completion
    // math and resume clamping. If the module data isn't loaded yet, skip the
    // write — the next state change (data present) checkpoints correctly.
    const total = options.totalQuestions ?? 0;
    if (total <= 0) {
      if (import.meta.env.DEV) console.warn('[checkpoint] skipped: unknown total_questions', options.level, options.moduleId);
      return;
    }

    try {
      await progress.saveCheckpoint({
        level: options.level,
        module_id: options.moduleId,
        question_index: options.questionIndex,
        total_questions: total,
        question_phase: 'MCQ',
        is_module_completed: false
      });

      lastCheckpointRef.current = key;
      // Apple Store Compliance: Silent fail
    } catch (error) {
      // Apple Store Compliance: Silent fail
    }
  }, [progress.saveCheckpoint]);

  /**
   * Save checkpoint when MCQ is answered correctly
   */
  const checkpointMCQCorrect = useCallback(async (options: CheckpointOptions) => {
    const key = `${options.level}-${options.moduleId}-${options.questionIndex}-SPEAK_READY`;
    if (lastCheckpointRef.current === key) return;

    const total = options.totalQuestions ?? 0;
    if (total <= 0) {
      if (import.meta.env.DEV) console.warn('[checkpoint] skipped: unknown total_questions', options.level, options.moduleId);
      return;
    }

    try {
      await progress.saveCheckpoint({
        level: options.level,
        module_id: options.moduleId,
        question_index: options.questionIndex,
        total_questions: total,
        question_phase: 'SPEAK_READY',
        mcq_selected_choice: options.mcqChoice,
        mcq_is_correct: options.mcqCorrect,
        is_module_completed: false
      });

      lastCheckpointRef.current = key;
      // Apple Store Compliance: Silent fail
    } catch (error) {
      // Apple Store Compliance: Silent fail
    }
  }, [progress.saveCheckpoint]);

  /**
   * Save checkpoint when speech recording starts
   */
  const checkpointSpeechStarted = useCallback(async (options: CheckpointOptions) => {
    const key = `${options.level}-${options.moduleId}-${options.questionIndex}-AWAITING_FEEDBACK`;
    if (lastCheckpointRef.current === key) return;

    const total = options.totalQuestions ?? 0;
    if (total <= 0) {
      if (import.meta.env.DEV) console.warn('[checkpoint] skipped: unknown total_questions', options.level, options.moduleId);
      return;
    }

    try {
      await progress.saveCheckpoint({
        level: options.level,
        module_id: options.moduleId,
        question_index: options.questionIndex,
        total_questions: total,
        question_phase: 'AWAITING_FEEDBACK',
        mcq_selected_choice: options.mcqChoice,
        mcq_is_correct: options.mcqCorrect,
        is_module_completed: false
      });

      lastCheckpointRef.current = key;
      // Apple Store Compliance: Silent fail
    } catch (error) {
      // Apple Store Compliance: Silent fail
    }
  }, [progress.saveCheckpoint]);

  /**
   * Save checkpoint when advancing to next question
   */
  const checkpointQuestionComplete = useCallback(async (options: CheckpointOptions) => {
    const total = options.totalQuestions ?? 0;
    if (total <= 0) {
      // A fabricated 40 here is the worst case: isLastQuestion would be wrong for
      // any module whose real length isn't 40, breaking completion detection.
      if (import.meta.env.DEV) console.warn('[checkpoint] skipped: unknown total_questions', options.level, options.moduleId);
      return;
    }

    const nextIndex = options.questionIndex + 1;
    const isLastQuestion = nextIndex >= total;

    try {
      if (isLastQuestion) {
        // Module completed
        await progress.saveCheckpoint({
          level: options.level,
          module_id: options.moduleId,
          question_index: options.questionIndex,
          total_questions: total,
          question_phase: 'COMPLETED',
          is_module_completed: true
        });

        // Apple Store Compliance: Silent fail
      } else {
        // Advance to next question's MCQ phase
        await progress.saveCheckpoint({
          level: options.level,
          module_id: options.moduleId,
          question_index: nextIndex,
          total_questions: total,
          question_phase: 'MCQ',
          is_module_completed: false
        });

        // Apple Store Compliance: Silent fail
      }

      // Reset checkpoint tracking for new question
      lastCheckpointRef.current = '';
    } catch (error) {
      // Apple Store Compliance: Silent fail
    }
  }, [progress.saveCheckpoint]);

  /**
   * Load and restore progress state for current module
   */
  const restoreProgress = useCallback(async () => {
    if (!level || moduleId === undefined) return null;

    const savedProgress = await progress.loadProgress(level, moduleId);
    if (savedProgress && !savedProgress.is_module_completed) {
      // Apple Store Compliance: Silent fail
    }

    return savedProgress;
  }, [level, moduleId, progress.loadProgress]);

  /**
   * Check if we should show resume dialog
   */
  const shouldShowResumeDialog = useCallback(async () => {
    if (!level || moduleId === undefined) return false;

    const savedProgress = await progress.loadProgress(level, moduleId);
    return !!(savedProgress && !savedProgress.is_module_completed && savedProgress.question_index > 0);
  }, [level, moduleId, progress.loadProgress]);

  /**
   * Get resume information for UI
   */
  const getResumeInfo = useCallback(() => {
    if (!progress.currentProgress) return null;

    return {
      questionIndex: progress.currentProgress.question_index,
      totalQuestions: progress.currentProgress.total_questions,
      phase: progress.currentProgress.question_phase,
      canResume: progress.canResume,
      // Math.max guards legacy rows saved with total_questions = 0 (NaN%)
      progressPercentage: Math.round((progress.currentProgress.question_index / Math.max(1, progress.currentProgress.total_questions)) * 100)
    };
  }, [progress.currentProgress, progress.canResume]);

  /**
   * Simple wrapper to call appropriate checkpoint function
   */
  const checkpoint = useCallback((
    phase: 'mcq-shown' | 'mcq-correct' | 'speech-started' | 'question-complete',
    options: CheckpointOptions
  ) => {
    switch (phase) {
      case 'mcq-shown':
        return checkpointMCQShown(options);
      case 'mcq-correct':
        return checkpointMCQCorrect(options);
      case 'speech-started':
        return checkpointSpeechStarted(options);
      case 'question-complete':
        return checkpointQuestionComplete(options);
      default:
        // Apple Store Compliance: Silent fail
    }
  }, [checkpointMCQShown, checkpointMCQCorrect, checkpointSpeechStarted, checkpointQuestionComplete]);

  // Auto-restore progress when level/module changes
  useEffect(() => {
    if (level && moduleId !== undefined) {
      restoreProgress();
    }
  }, [level, moduleId, restoreProgress]);

  return {
    // Main checkpoint function
    checkpoint,

    // Individual checkpoint functions
    checkpointMCQShown,
    checkpointMCQCorrect,
    checkpointSpeechStarted,
    checkpointQuestionComplete,

    // Progress management
    restoreProgress,
    shouldShowResumeDialog,
    getResumeInfo,

    // State from useLessonProgress
    currentProgress: progress.currentProgress,
    canResume: progress.canResume,
    isLoading: progress.isLoading,
    // Settlement marker: "<level>-<moduleId>" once loadProgress resolved (or failed)
    // for that module — consumers must wait for it before deciding fresh-start vs resume.
    settledKey: progress.settledKey,
    isSyncing: progress.isSyncing,
    isOnline: progress.isOnline,
    lastSyncAt: progress.lastSyncAt,
    showResumeDialog: progress.showResumeDialog,
    setShowResumeDialog: progress.setShowResumeDialog,

    // Actions
    resumeProgress: progress.resumeProgress,
    startFromBeginning: progress.startFromBeginning,
    triggerSync: progress.triggerSync
  };
}