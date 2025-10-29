import { useState, useCallback } from 'react';
import { 
  getProgress, 
  setProgress, 
  keyFor, 
  ModuleProgress as StoreModuleProgress 
} from '../../utils/ProgressStore';
import { save as saveProgress, getModuleState } from '../../utils/progress';
import { LevelType } from '../../utils/lessons/levelsData';
import { ProgressTrackerService } from '../../services/progressTrackerService';

// Enhanced Progress Tracking with ProgressStore Integration
export type LessonPhaseType = 'intro' | 'listening' | 'speaking' | 'complete';
export type LessonPhase = 'intro' | 'teacher-reading' | 'listening' | 'speaking' | 'completed' | 'complete';

export interface ProgressState {
  phase: LessonPhaseType;
  questionIndex: number;
}

export function useProgressManager() {
  const progressTracker = ProgressTrackerService.getInstance();

  // Enhanced progress saving with new progress system
  const saveModuleProgress = useCallback((
    level: string, 
    moduleId: number, 
    phase: LessonPhaseType, 
    questionIndex: number = 0
  ) => {
    try {
      // Save to both old and new systems for compatibility
      const progressData: StoreModuleProgress = {
        level: level,
        module: moduleId,
        phase: phase as LessonPhase,
        listeningIndex: 0,
        speakingIndex: questionIndex,
        completed: phase === 'complete',
        totalListening: 0,
        totalSpeaking: 40, // All modules have 40 questions
        updatedAt: Date.now(),
        v: 1
      };
      
      setProgress(progressData);

      // Save to new progress system for exact resume
      const userId = 'guest'; // TODO: get from auth when available
      const total = 40; // All modules have 40 questions
      const correct = Math.min(questionIndex + 1, total); // questions answered correctly so far
      const completed = phase === 'complete';
      
      saveProgress(userId, level, String(moduleId), questionIndex, total, correct, completed);
      
      // Save snapshot to Progress Tracker
      if (completed) {
        progressTracker.saveCurrentProgress(level, moduleId);
      }
      
    } catch (error) {
      // Apple Store Compliance: Silent fail - progress save is non-critical
    }
  }, [progressTracker]);

  // Load progress using ProgressStore and Progress Tracker
  const loadModuleProgress = useCallback((
    level: string, 
    moduleId: number
  ): ProgressState => {
    try {
      // Try to load from Progress Tracker first
      const moduleProgressDetail = progressTracker.getModuleProgress(level, moduleId);
      if (moduleProgressDetail) {
        return {
          phase: moduleProgressDetail.isCompleted ? 'complete' : 'intro',
          questionIndex: moduleProgressDetail.questionsCompleted || 0
        };
      }
      
      // Fallback to old ProgressStore
      const progress = getProgress(level, moduleId);
      if (progress) {
        return {
          phase: progress.completed ? 'complete' : (progress.phase as LessonPhaseType) || 'intro',
          questionIndex: progress.speakingIndex || 0
        };
      }
    } catch (error) {
      // Apple Store Compliance: Silent fail - return default progress
    }

    return { phase: 'intro', questionIndex: 0 };
  }, [progressTracker]);

  // Get detailed progress analytics
  const getModuleAnalytics = useCallback((
    level: string,
    moduleId: number
  ) => {
    return progressTracker.getCompatibilityData(level, moduleId);
  }, [progressTracker]);

  // Check if module can be unlocked (90% accuracy requirement)
  const canUnlockModule = useCallback((
    level: string,
    moduleId: number
  ) => {
    return progressTracker.canUnlockNextModule(level, moduleId);
  }, [progressTracker]);

  return {
    saveModuleProgress,
    loadModuleProgress,
    getModuleAnalytics,
    canUnlockModule,
    // Expose Progress Tracker for advanced usage
    progressTracker
  };
}