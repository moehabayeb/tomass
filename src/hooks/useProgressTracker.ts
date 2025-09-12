// React hook for Progress Tracker integration
// Provides easy access to progress tracking functionality across components

import { useState, useEffect, useCallback } from 'react';
import { ProgressTrackerService } from '../services/progressTrackerService';
import { 
  UserProgressProfile, 
  ModuleProgressDetail, 
  ReviewSuggestion,
  PerformanceTrend,
  ProgressSnapshot
} from '../types/progressTypes';
import { ModuleUnlockStatus, getModuleUnlockStatus } from '../utils/lessons/moduleUnlocking';

interface UseProgressTrackerOptions {
  userId?: string;
  autoRefresh?: boolean;
  refreshInterval?: number; // in milliseconds
}

export function useProgressTracker({
  userId = 'guest',
  autoRefresh = false,
  refreshInterval = 30000 // 30 seconds
}: UseProgressTrackerOptions = {}) {
  const [progressTracker] = useState(() => ProgressTrackerService.getInstance());
  const [profile, setProfile] = useState<UserProgressProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize and load data
  useEffect(() => {
    progressTracker.setUserId(userId);
    loadProfile();
  }, [userId, progressTracker]);

  // Auto-refresh profile data
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      loadProfile();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  const loadProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const userProfile = progressTracker.getUserProfile();
      setProfile(userProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load progress data');
    } finally {
      setIsLoading(false);
    }
  }, [progressTracker]);

  // Question-level tracking
  const trackQuestionAttempt = useCallback((
    questionId: string,
    moduleId: number,
    levelId: string,
    userAnswer: string,
    expectedAnswer: string,
    correct: boolean,
    questionContext?: string
  ) => {
    return progressTracker.recordQuestionAttempt(
      questionId,
      moduleId,
      levelId,
      userAnswer,
      expectedAnswer,
      correct,
      questionContext
    );
  }, [progressTracker]);

  const startQuestion = useCallback((questionId: string) => {
    progressTracker.startQuestion(questionId);
  }, [progressTracker]);

  // Session management
  const startSession = useCallback((moduleId: number, levelId: string) => {
    return progressTracker.startLearningSession(moduleId, levelId);
  }, [progressTracker]);

  const endSession = useCallback((completedSuccessfully: boolean = true) => {
    progressTracker.endLearningSession(completedSuccessfully);
  }, [progressTracker]);

  // Progress queries
  const getModuleAccuracy = useCallback((levelId: string, moduleId: number) => {
    return progressTracker.getModuleAccuracy(levelId, moduleId);
  }, [progressTracker]);

  const canUnlockNextModule = useCallback((levelId: string, moduleId: number) => {
    return progressTracker.canUnlockNextModule(levelId, moduleId);
  }, [progressTracker]);

  const getModuleProgress = useCallback((levelId: string, moduleId: number) => {
    return progressTracker.getModuleProgress(levelId, moduleId);
  }, [progressTracker]);

  const getModuleStatus = useCallback((moduleId: number): ModuleUnlockStatus => {
    return getModuleUnlockStatus(moduleId);
  }, []);

  // Analytics
  const getPerformanceTrend = useCallback((): PerformanceTrend => {
    return progressTracker.getPerformanceTrend();
  }, [progressTracker]);

  const getReviewSuggestions = useCallback((): ReviewSuggestion[] => {
    return progressTracker.getReviewSuggestions();
  }, [progressTracker]);

  const getDetailedAnalytics = useCallback((timeWindow: 'day' | 'week' | 'month' | 'all' = 'week') => {
    return progressTracker.getDetailedAnalytics(timeWindow);
  }, [progressTracker]);

  // Progress snapshots
  const saveProgressSnapshot = useCallback((levelId: string, moduleId: number) => {
    progressTracker.saveCurrentProgress(levelId, moduleId);
  }, [progressTracker]);

  // Configuration
  const updateConfig = useCallback((updates: any) => {
    progressTracker.updateConfig(updates);
    loadProfile(); // Refresh profile after config change
  }, [progressTracker, loadProfile]);

  const getConfig = useCallback(() => {
    return progressTracker.getConfig();
  }, [progressTracker]);

  // Data management
  const exportData = useCallback(() => {
    return progressTracker.exportUserData();
  }, [progressTracker]);

  const importData = useCallback((jsonData: string) => {
    const success = progressTracker.importUserData(jsonData);
    if (success) {
      loadProfile(); // Refresh after import
    }
    return success;
  }, [progressTracker, loadProfile]);

  const clearAllData = useCallback(() => {
    progressTracker.clearAllData();
    loadProfile(); // Refresh after clearing
  }, [progressTracker, loadProfile]);

  // Computed values
  const overallAccuracy = profile?.overallAccuracy || 0;
  const totalModulesCompleted = profile?.totalModulesCompleted || 0;
  const currentLevel = profile?.currentLevel || 'A1';
  const currentModule = profile?.currentModule || 1;
  const studyStreak = profile?.currentStreak || 0;
  const totalStudyTime = profile?.totalStudyTime || 0;

  // Helper functions
  const formatTime = useCallback((ms: number) => {
    const minutes = Math.floor(ms / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  }, []);

  const formatAccuracy = useCallback((accuracy: number) => {
    return accuracy.toFixed(1) + '%';
  }, []);

  return {
    // Data
    profile,
    isLoading,
    error,
    
    // Computed values
    overallAccuracy,
    totalModulesCompleted,
    currentLevel,
    currentModule,
    studyStreak,
    totalStudyTime,
    
    // Actions
    loadProfile,
    trackQuestionAttempt,
    startQuestion,
    startSession,
    endSession,
    saveProgressSnapshot,
    
    // Queries
    getModuleAccuracy,
    canUnlockNextModule,
    getModuleProgress,
    getModuleStatus,
    getPerformanceTrend,
    getReviewSuggestions,
    getDetailedAnalytics,
    
    // Configuration
    updateConfig,
    getConfig,
    
    // Data management
    exportData,
    importData,
    clearAllData,
    
    // Utilities
    formatTime,
    formatAccuracy,
    
    // Direct access to service (for advanced usage)
    progressTracker
  };
}

// Specialized hook for module completion requirements
export function useModuleRequirements(levelId: string, moduleId: number) {
  const { getModuleAccuracy, getConfig, canUnlockNextModule } = useProgressTracker();
  const [requirements, setRequirements] = useState({
    currentAccuracy: 0,
    requiredAccuracy: 90,
    canUnlock: false,
    accuracyGap: 0
  });

  useEffect(() => {
    const currentAccuracy = getModuleAccuracy(levelId, moduleId);
    const config = getConfig();
    const canUnlock = canUnlockNextModule(levelId, moduleId);
    const accuracyGap = Math.max(0, config.accuracyThreshold - currentAccuracy);

    setRequirements({
      currentAccuracy,
      requiredAccuracy: config.accuracyThreshold,
      canUnlock,
      accuracyGap
    });
  }, [levelId, moduleId, getModuleAccuracy, getConfig, canUnlockNextModule]);

  return requirements;
}

// Hook for real-time progress updates during lessons
export function useLessonProgress(levelId: string, moduleId: number) {
  const progressTracker = useProgressTracker();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [currentRetries, setCurrentRetries] = useState<number>(0);

  const startLesson = useCallback(() => {
    const id = progressTracker.startSession(moduleId, levelId);
    setSessionId(id);
    return id;
  }, [progressTracker, moduleId, levelId]);

  const endLesson = useCallback((completed: boolean = true) => {
    if (sessionId) {
      progressTracker.endSession(completed);
      setSessionId(null);
    }
  }, [progressTracker, sessionId]);

  const startQuestion = useCallback((questionId: string) => {
    progressTracker.startQuestion(questionId);
    setQuestionStartTime(Date.now());
    setCurrentRetries(0);
  }, [progressTracker]);

  const recordAttempt = useCallback((
    questionId: string,
    userAnswer: string,
    expectedAnswer: string,
    correct: boolean,
    questionContext?: string
  ) => {
    setCurrentRetries(prev => prev + 1);
    
    return progressTracker.trackQuestionAttempt(
      questionId,
      moduleId,
      levelId,
      userAnswer,
      expectedAnswer,
      correct,
      questionContext
    );
  }, [progressTracker, moduleId, levelId]);

  const getQuestionStats = useCallback((questionId: string) => {
    return progressTracker.progressTracker.getQuestionStats(levelId, moduleId, questionId);
  }, [progressTracker, levelId, moduleId]);

  return {
    sessionId,
    questionStartTime,
    currentRetries,
    startLesson,
    endLesson,
    startQuestion,
    recordAttempt,
    getQuestionStats,
    ...progressTracker
  };
}