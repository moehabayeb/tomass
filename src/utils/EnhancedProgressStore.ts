// Enhanced Progress Store with detailed question-level tracking and analytics
// Extends the existing ProgressStore with comprehensive learning analytics
// Bug #5 Fix: Using safe safeLocalStorage wrapper

import {
  UserProgressProfile,
  ModuleProgressDetail,
  QuestionAttempt,
  QuestionStats,
  LearningSession,
  ReviewSuggestion,
  ProgressSnapshot,
  ProgressKey,
  TimeWindow,
  PerformanceTrend,
  ProgressTrackerConfig,
  GrammarError
} from '../types/progressTypes';
import { safeLocalStorage } from './safeLocalStorage';
import { supabase } from '@/integrations/supabase/client';

const STORAGE_KEYS = {
  userProfile: (userId: string) => `progress_tracker_v1:profile:${userId}`,
  questionAttempts: (userId: string) => `progress_tracker_v1:attempts:${userId}`,
  learningSessions: (userId: string) => `progress_tracker_v1:sessions:${userId}`,
  snapshots: (userId: string) => `progress_tracker_v1:snapshots:${userId}`,
  config: 'progress_tracker_v1:config'
};

const DEFAULT_CONFIG: ProgressTrackerConfig = {
  accuracyThreshold: 90,
  maxRetries: 3,
  timeoutSeconds: 30,
  enableGrammarDetection: true,
  enableTimingAnalytics: true,
  syncWithSupabase: true // Bug #9 Fix: Enable Supabase sync for question attempts
};

export class EnhancedProgressStore {
  private static instance: EnhancedProgressStore;
  private config: ProgressTrackerConfig;

  private constructor() {
    this.config = this.loadConfig();
  }

  public static getInstance(): EnhancedProgressStore {
    if (!EnhancedProgressStore.instance) {
      EnhancedProgressStore.instance = new EnhancedProgressStore();
    }
    return EnhancedProgressStore.instance;
  }

  // Configuration Management
  private loadConfig(): ProgressTrackerConfig {
    try {
      const stored = safeLocalStorage.getItem(STORAGE_KEYS.config);
      return stored ? { ...DEFAULT_CONFIG, ...JSON.parse(stored) } : DEFAULT_CONFIG;
    } catch {
      return DEFAULT_CONFIG;
    }
  }

  public updateConfig(updates: Partial<ProgressTrackerConfig>): void {
    this.config = { ...this.config, ...updates };
    safeLocalStorage.setItem(STORAGE_KEYS.config, JSON.stringify(this.config));
  }

  public getConfig(): ProgressTrackerConfig {
    return { ...this.config };
  }

  // User Profile Management
  public getUserProfile(userId: string): UserProgressProfile {
    try {
      const stored = safeLocalStorage.getItem(STORAGE_KEYS.userProfile(userId));
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      // Apple Store Compliance: Silent operation
    }

    // Return default profile
    return this.createDefaultProfile(userId);
  }

  private createDefaultProfile(userId: string): UserProgressProfile {
    const now = Date.now();
    return {
      userId,
      createdAt: now,
      lastUpdated: now,
      totalModulesStarted: 0,
      totalModulesCompleted: 0,
      totalQuestionsAnswered: 0,
      totalCorrectAnswers: 0,
      overallAccuracy: 0,
      totalStudyTime: 0,
      currentLevel: 'A1',
      currentModule: 1,
      averageSessionLength: 0,
      preferredStudyTimes: [],
      longestStreak: 0,
      currentStreak: 0,
      improvementRate: 0,
      retryRate: 0,
      averageResponseTime: 0,
      consistencyScore: 1,
      mostCommonErrors: [],
      recentErrors: [],
      improvedAreas: [],
      persistentWeaknesses: [],
      moduleProgress: {},
      reviewSuggestions: []
    };
  }

  public saveUserProfile(profile: UserProgressProfile): void {
    try {
      profile.lastUpdated = Date.now();
      safeLocalStorage.setItem(STORAGE_KEYS.userProfile(profile.userId), JSON.stringify(profile));
    } catch (error) {
      // Apple Store Compliance: Silent operation
    }
  }

  // Question Attempt Tracking
  public recordQuestionAttempt(attempt: QuestionAttempt): void {
    try {
      const attempts = this.getQuestionAttempts(attempt.moduleId, attempt.levelId);
      attempts.push(attempt);

      const key = STORAGE_KEYS.questionAttempts(attempt.moduleId + '_' + attempt.levelId);
      safeLocalStorage.setItem(key, JSON.stringify(attempts));

      // Update user profile
      this.updateProfileAfterAttempt(attempt);

      // Bug #9 Fix: Sync to Supabase if enabled
      if (this.config.syncWithSupabase) {
        this.syncQuestionAttemptToSupabase(attempt).catch(() => {
          // Apple Store Compliance: Silent fail - data already saved locally
        });
      }
    } catch (error) {
      // Apple Store Compliance: Silent operation
    }
  }

  public getQuestionAttempts(moduleId: number, levelId: string, userId: string = 'guest'): QuestionAttempt[] {
    try {
      const key = STORAGE_KEYS.questionAttempts(moduleId + '_' + levelId);
      const stored = safeLocalStorage.getItem(key);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private updateProfileAfterAttempt(attempt: QuestionAttempt): void {
    // This would be called after each question attempt to keep profile updated
    // Implementation would update statistics, calculate new accuracy, etc.
    // For now, this is a placeholder
  }

  // Module Progress Management
  public getModuleProgress(userId: string, levelId: string, moduleId: number): ModuleProgressDetail | null {
    const profile = this.getUserProfile(userId);
    const key: ProgressKey = `${levelId}:${moduleId}`;
    return profile.moduleProgress[key] || null;
  }

  public updateModuleProgress(userId: string, progress: ModuleProgressDetail): void {
    const profile = this.getUserProfile(userId);
    const key: ProgressKey = `${progress.levelId}:${progress.moduleId}`;
    
    profile.moduleProgress[key] = progress;
    this.saveUserProfile(profile);
  }

  public calculateModuleAccuracy(userId: string, levelId: string, moduleId: number): number {
    const attempts = this.getQuestionAttempts(moduleId, levelId, userId);
    if (attempts.length === 0) return 0;

    // Group attempts by question, take only the final result for each question
    const questionResults = new Map<string, boolean>();
    
    attempts.forEach(attempt => {
      // Keep track of the latest result for each question
      const existing = questionResults.get(attempt.questionId);
      if (existing === undefined || attempt.timestamp > (attempts.find(a => 
        a.questionId === attempt.questionId && 
        questionResults.get(a.questionId) === existing
      )?.timestamp || 0)) {
        questionResults.set(attempt.questionId, attempt.correct);
      }
    });

    const correctCount = Array.from(questionResults.values()).filter(correct => correct).length;
    return (correctCount / questionResults.size) * 100;
  }

  public canUnlockNextModule(userId: string, levelId: string, moduleId: number): boolean {
    const accuracy = this.calculateModuleAccuracy(userId, levelId, moduleId);
    return accuracy >= this.config.accuracyThreshold;
  }

  // Question Statistics
  public getQuestionStats(userId: string, levelId: string, moduleId: number, questionId: string): QuestionStats {
    const attempts = this.getQuestionAttempts(moduleId, levelId, userId)
      .filter(attempt => attempt.questionId === questionId);

    if (attempts.length === 0) {
      return {
        questionId,
        moduleId,
        levelId,
        totalAttempts: 0,
        correctAttempts: 0,
        averageTime: 0,
        fastestTime: 0,
        commonErrors: [],
        lastAttemptDate: 0,
        needsReview: false
      };
    }

    const correctAttempts = attempts.filter(a => a.correct);
    const correctTimes = correctAttempts.map(a => a.timeSpent);
    const allErrors = attempts.flatMap(a => a.grammarErrors || []);

    return {
      questionId,
      moduleId,
      levelId,
      totalAttempts: attempts.length,
      correctAttempts: correctAttempts.length,
      averageTime: correctTimes.length > 0 ? correctTimes.reduce((a, b) => a + b, 0) / correctTimes.length : 0,
      fastestTime: correctTimes.length > 0 ? Math.min(...correctTimes) : 0,
      commonErrors: this.findMostCommonErrors(allErrors),
      lastAttemptDate: Math.max(...attempts.map(a => a.timestamp)),
      needsReview: correctAttempts.length === 0 || attempts.length > 2
    };
  }

  private findMostCommonErrors(errors: GrammarError[]): GrammarError[] {
    const errorCounts = new Map<string, { error: GrammarError; count: number }>();
    
    errors.forEach(error => {
      const key = `${error.category}:${error.specific || ''}`;
      if (!errorCounts.has(key)) {
        errorCounts.set(key, { error, count: 0 });
      }
      errorCounts.get(key)!.count++;
    });

    return Array.from(errorCounts.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
      .map(item => item.error);
  }

  // Learning Session Management
  public startLearningSession(userId: string, moduleId: number, levelId: string): string {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const session: LearningSession = {
      id: sessionId,
      startTime: Date.now(),
      endTime: 0,
      duration: 0,
      moduleId,
      levelId,
      questionsAttempted: 0,
      questionsCorrect: 0,
      averageAccuracy: 0,
      totalAttempts: 0,
      breaks: 0,
      completedSuccessfully: false
    };

    try {
      const sessions = this.getLearningSessions(userId);
      sessions.push(session);
      safeLocalStorage.setItem(STORAGE_KEYS.learningSessions(userId), JSON.stringify(sessions));
    } catch (error) {
      // Apple Store Compliance: Silent operation
    }

    return sessionId;
  }

  public endLearningSession(userId: string, sessionId: string, completedSuccessfully: boolean = true): void {
    try {
      const sessions = this.getLearningSessions(userId);
      const session = sessions.find(s => s.id === sessionId);
      
      if (session) {
        session.endTime = Date.now();
        session.duration = session.endTime - session.startTime;
        session.completedSuccessfully = completedSuccessfully;
        
        // Calculate session statistics
        const attempts = this.getQuestionAttempts(session.moduleId, session.levelId, userId)
          .filter(attempt => attempt.timestamp >= session.startTime && attempt.timestamp <= session.endTime);
        
        session.questionsAttempted = new Set(attempts.map(a => a.questionId)).size;
        session.questionsCorrect = attempts.filter(a => a.correct).length;
        session.totalAttempts = attempts.length;
        session.averageAccuracy = session.questionsAttempted > 0 ? 
          (session.questionsCorrect / session.questionsAttempted) * 100 : 0;

        safeLocalStorage.setItem(STORAGE_KEYS.learningSessions(userId), JSON.stringify(sessions));
      }
    } catch (error) {
      // Apple Store Compliance: Silent operation
    }
  }

  public getLearningSessions(userId: string): LearningSession[] {
    try {
      const stored = safeLocalStorage.getItem(STORAGE_KEYS.learningSessions(userId));
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  // Progress Snapshots for Trend Analysis
  public saveProgressSnapshot(userId: string, snapshot: ProgressSnapshot): void {
    try {
      const snapshots = this.getProgressSnapshots(userId);
      snapshots.push(snapshot);
      
      // Keep only last 100 snapshots to avoid storage bloat
      if (snapshots.length > 100) {
        snapshots.splice(0, snapshots.length - 100);
      }

      safeLocalStorage.setItem(STORAGE_KEYS.snapshots(userId), JSON.stringify(snapshots));
    } catch (error) {
      // Apple Store Compliance: Silent operation
    }
  }

  public getProgressSnapshots(userId: string, timeWindow?: TimeWindow): ProgressSnapshot[] {
    try {
      const stored = safeLocalStorage.getItem(STORAGE_KEYS.snapshots(userId));
      let snapshots: ProgressSnapshot[] = stored ? JSON.parse(stored) : [];
      
      if (timeWindow && timeWindow !== 'all') {
        const now = Date.now();
        const windowMs = this.getTimeWindowMs(timeWindow);
        snapshots = snapshots.filter(s => now - s.timestamp <= windowMs);
      }
      
      return snapshots.sort((a, b) => a.timestamp - b.timestamp);
    } catch {
      return [];
    }
  }

  private getTimeWindowMs(window: TimeWindow): number {
    const DAY_MS = 24 * 60 * 60 * 1000;
    switch (window) {
      case 'day': return DAY_MS;
      case 'week': return 7 * DAY_MS;
      case 'month': return 30 * DAY_MS;
      default: return Infinity;
    }
  }

  // Analytics and Insights
  public getPerformanceTrend(userId: string, timeWindow: TimeWindow = 'week'): PerformanceTrend {
    const snapshots = this.getProgressSnapshots(userId, timeWindow);
    if (snapshots.length < 2) return 'stable';

    const recent = snapshots.slice(-5); // Last 5 snapshots
    const older = snapshots.slice(0, -5);

    if (older.length === 0) return 'stable';

    const recentAvg = recent.reduce((sum, s) => sum + s.accuracy, 0) / recent.length;
    const olderAvg = older.reduce((sum, s) => sum + s.accuracy, 0) / older.length;

    const difference = recentAvg - olderAvg;
    
    if (difference > 5) return 'improving';
    if (difference < -5) return 'declining';
    return 'stable';
  }

  // Review Suggestions
  public generateReviewSuggestions(userId: string): ReviewSuggestion[] {
    const profile = this.getUserProfile(userId);
    const suggestions: ReviewSuggestion[] = [];

    // Analyze recent errors for suggestions
    const errorCounts = new Map<string, number>();
    profile.recentErrors.forEach(error => {
      const key = error.reviewTopic || error.category;
      errorCounts.set(key, (errorCounts.get(key) || 0) + 1);
    });

    // Convert to suggestions
    Array.from(errorCounts.entries())
      .sort(([,a], [,b]) => b - a) // Most frequent first
      .slice(0, 5) // Top 5
      .forEach(([topic, count], index) => {
        suggestions.push({
          id: `suggestion_${index}_${Date.now()}`,
          grammarTopic: topic,
          priority: count > 3 ? 'high' : count > 1 ? 'medium' : 'low',
          reason: `You've made ${count} error(s) in this area recently`,
          errorCount: count,
          lastErrorDate: Date.now(), // Would need to track this properly
          suggestedAction: `Review ${topic} lessons and practice exercises`,
          estimatedTime: Math.min(count * 5, 20) // 5 min per error, max 20 min
        });
      });

    return suggestions;
  }

  // Data Export/Import for backup
  public exportUserData(userId: string): string {
    const data = {
      profile: this.getUserProfile(userId),
      sessions: this.getLearningSessions(userId),
      snapshots: this.getProgressSnapshots(userId),
      config: this.getConfig(),
      exportDate: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  }

  public importUserData(userId: string, jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.profile) {
        this.saveUserProfile(data.profile);
      }
      
      if (data.sessions) {
        safeLocalStorage.setItem(STORAGE_KEYS.learningSessions(userId), JSON.stringify(data.sessions));
      }
      
      if (data.snapshots) {
        safeLocalStorage.setItem(STORAGE_KEYS.snapshots(userId), JSON.stringify(data.snapshots));
      }

      return true;
    } catch (error) {
      // Apple Store Compliance: Silent operation
      return false;
    }
  }

  /**
   * Bug #9 Fix: Sync question attempt to Supabase
   * Enables cross-device analytics and progress backup
   */
  private async syncQuestionAttemptToSupabase(attempt: QuestionAttempt): Promise<void> {
    // Get current authenticated user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      // Not authenticated - skip sync (data saved locally)
      return;
    }

    try {
      // Insert question attempt to Supabase
      const { error } = await supabase.from('question_attempts').insert({
        user_id: user.id,
        question_id: attempt.questionId,
        module_id: attempt.moduleId,
        level_id: attempt.levelId,
        attempt_number: attempt.attemptNumber,
        correct: attempt.correct,
        user_answer: attempt.userAnswer,
        expected_answer: attempt.expectedAnswer,
        start_time: attempt.startTime,
        end_time: attempt.endTime,
        time_spent: attempt.timeSpent,
        grammar_errors: attempt.grammarErrors || [],
        retry_reason: attempt.retryReason || null,
      });

      if (error) {
        // Log error but don't throw - data is already saved locally
        console.warn('Failed to sync question attempt to Supabase:', error);
      }
    } catch (error) {
      // Apple Store Compliance: Silent fail - localStorage already has the data
    }
  }

  /**
   * Bulk sync local question attempts to Supabase
   * Useful for migrating existing data or catching up after offline period
   */
  public async syncAllQuestionAttemptsToSupabase(userId: string): Promise<{ synced: number; failed: number }> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !this.config.syncWithSupabase) {
      return { synced: 0, failed: 0 };
    }

    let synced = 0;
    let failed = 0;

    try {
      // Get all attempts from localStorage
      const keys = safeLocalStorage.keys();
      const attemptKeys = keys.filter(key => key.includes('attempts'));

      for (const key of attemptKeys) {
        try {
          const stored = safeLocalStorage.getItem(key);
          if (!stored) continue;

          const attempts: QuestionAttempt[] = JSON.parse(stored);

          // Batch insert attempts
          for (const attempt of attempts) {
            try {
              await this.syncQuestionAttemptToSupabase(attempt);
              synced++;
            } catch (error) {
              failed++;
            }
          }
        } catch (error) {
          failed++;
        }
      }
    } catch (error) {
      // Apple Store Compliance: Silent fail
    }

    return { synced, failed };
  }

  // Clear all data (for testing or reset)
  public clearUserData(userId: string): void {
    try {
      safeLocalStorage.removeItem(STORAGE_KEYS.userProfile(userId));
      safeLocalStorage.removeItem(STORAGE_KEYS.learningSessions(userId));
      safeLocalStorage.removeItem(STORAGE_KEYS.snapshots(userId));

      // Clear question attempts for all modules
      // Note: This is a simplified approach - in production you'd want better key management
      const keys = Object.keys(safeLocalStorage);
      keys.forEach(key => {
        if (key.includes('attempts') && key.includes(userId)) {
          safeLocalStorage.removeItem(key);
        }
      });
    } catch (error) {
      // Apple Store Compliance: Silent operation
    }
  }
}