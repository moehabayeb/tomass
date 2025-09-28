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

    try {
      await progress.saveCheckpoint({
        level: options.level,
        module_id: options.moduleId,
        question_index: options.questionIndex,
        total_questions: options.totalQuestions || 40,
        question_phase: 'MCQ',
        is_module_completed: false
      });

      lastCheckpointRef.current = key;
      console.log(`📍 Checkpoint: MCQ shown for Q${options.questionIndex + 1}`);
    } catch (error) {
      console.error('❌ Failed to save MCQ checkpoint:', error);
    }
  }, [progress.saveCheckpoint]);

  /**
   * Save checkpoint when MCQ is answered correctly
   */
  const checkpointMCQCorrect = useCallback(async (options: CheckpointOptions) => {
    const key = `${options.level}-${options.moduleId}-${options.questionIndex}-SPEAK_READY`;
    if (lastCheckpointRef.current === key) return;

    try {
      await progress.saveCheckpoint({
        level: options.level,
        module_id: options.moduleId,
        question_index: options.questionIndex,
        total_questions: options.totalQuestions || 40,
        question_phase: 'SPEAK_READY',
        mcq_selected_choice: options.mcqChoice,
        mcq_is_correct: options.mcqCorrect,
        is_module_completed: false
      });

      lastCheckpointRef.current = key;
      console.log(`✅ Checkpoint: MCQ answered correctly for Q${options.questionIndex + 1}`);
    } catch (error) {
      console.error('❌ Failed to save MCQ correct checkpoint:', error);
    }
  }, [progress.saveCheckpoint]);

  /**
   * Save checkpoint when speech recording starts
   */
  const checkpointSpeechStarted = useCallback(async (options: CheckpointOptions) => {
    const key = `${options.level}-${options.moduleId}-${options.questionIndex}-AWAITING_FEEDBACK`;
    if (lastCheckpointRef.current === key) return;

    try {
      await progress.saveCheckpoint({
        level: options.level,
        module_id: options.moduleId,
        question_index: options.questionIndex,
        total_questions: options.totalQuestions || 40,
        question_phase: 'AWAITING_FEEDBACK',
        mcq_selected_choice: options.mcqChoice,
        mcq_is_correct: options.mcqCorrect,
        is_module_completed: false
      });

      lastCheckpointRef.current = key;
      console.log(`🎤 Checkpoint: Speech started for Q${options.questionIndex + 1}`);
    } catch (error) {
      console.error('❌ Failed to save speech checkpoint:', error);
    }
  }, [progress.saveCheckpoint]);

  /**
   * Save checkpoint when advancing to next question
   */
  const checkpointQuestionComplete = useCallback(async (options: CheckpointOptions) => {
    const nextIndex = options.questionIndex + 1;
    const isLastQuestion = nextIndex >= (options.totalQuestions || 40);

    try {
      if (isLastQuestion) {
        // Module completed
        await progress.saveCheckpoint({
          level: options.level,
          module_id: options.moduleId,
          question_index: options.questionIndex,
          total_questions: options.totalQuestions || 40,
          question_phase: 'COMPLETED',
          is_module_completed: true
        });

        console.log(`🎉 Checkpoint: Module ${options.moduleId} completed!`);
      } else {
        // Advance to next question's MCQ phase
        await progress.saveCheckpoint({
          level: options.level,
          module_id: options.moduleId,
          question_index: nextIndex,
          total_questions: options.totalQuestions || 40,
          question_phase: 'MCQ',
          is_module_completed: false
        });

        console.log(`➡️ Checkpoint: Advanced to Q${nextIndex + 1}`);
      }

      // Reset checkpoint tracking for new question
      lastCheckpointRef.current = '';
    } catch (error) {
      console.error('❌ Failed to save completion checkpoint:', error);
    }
  }, [progress.saveCheckpoint]);

  /**
   * Load and restore progress state for current module
   */
  const restoreProgress = useCallback(async () => {
    if (!level || moduleId === undefined) return null;

    const savedProgress = await progress.loadProgress(level, moduleId);
    if (savedProgress && !savedProgress.is_module_completed) {
      console.log(`📍 Restored progress: ${level}-${moduleId} Q${savedProgress.question_index + 1} (${savedProgress.question_phase})`);
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
      progressPercentage: Math.round((progress.currentProgress.question_index / progress.currentProgress.total_questions) * 100)
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
        console.warn('Unknown checkpoint phase:', phase);
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
    isSyncing: progress.isSyncing,
    isOnline: progress.isOnline,
    showResumeDialog: progress.showResumeDialog,
    setShowResumeDialog: progress.setShowResumeDialog,

    // Actions
    resumeProgress: progress.resumeProgress,
    startFromBeginning: progress.startFromBeginning,
    triggerSync: progress.triggerSync
  };
}