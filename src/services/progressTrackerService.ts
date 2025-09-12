// Progress Tracker Service - Main service for tracking detailed user learning progress
// Integrates with existing lesson system to provide comprehensive analytics

import { 
  QuestionAttempt, 
  ModuleProgressDetail, 
  UserProgressProfile,
  LearningSession,
  ReviewSuggestion,
  GrammarError,
  ProgressSnapshot,
  PerformanceTrend
} from '../types/progressTypes';
import { EnhancedProgressStore } from '../utils/EnhancedProgressStore';
import { detectGrammarErrors, getReviewSuggestions } from '../utils/grammarErrorDetector';

export class ProgressTrackerService {
  private static instance: ProgressTrackerService;
  private store: EnhancedProgressStore;
  private currentSessionId: string | null = null;
  private questionStartTime: number = 0;
  private questionRetries: number = 0;
  private currentUserId: string = 'guest'; // TODO: Get from auth

  private constructor() {
    this.store = EnhancedProgressStore.getInstance();
  }

  public static getInstance(): ProgressTrackerService {
    if (!ProgressTrackerService.instance) {
      ProgressTrackerService.instance = new ProgressTrackerService();
    }
    return ProgressTrackerService.instance;
  }

  // Session Management
  public startLearningSession(moduleId: number, levelId: string): string {
    this.currentSessionId = this.store.startLearningSession(this.currentUserId, moduleId, levelId);
    
    // Create snapshot at session start
    const profile = this.store.getUserProfile(this.currentUserId);
    const snapshot: ProgressSnapshot = {
      timestamp: Date.now(),
      accuracy: profile.overallAccuracy,
      questionsCompleted: profile.totalCorrectAnswers,
      studyTime: profile.totalStudyTime,
      level: levelId,
      moduleId
    };
    this.store.saveProgressSnapshot(this.currentUserId, snapshot);
    
    return this.currentSessionId;
  }

  public endLearningSession(completedSuccessfully: boolean = true): void {
    if (this.currentSessionId) {
      this.store.endLearningSession(this.currentUserId, this.currentSessionId, completedSuccessfully);
      this.currentSessionId = null;
    }
  }

  // Question-level Tracking
  public startQuestion(questionId: string): void {
    this.questionStartTime = Date.now();
    this.questionRetries = 0;
  }

  public recordQuestionAttempt(
    questionId: string,
    moduleId: number,
    levelId: string,
    userAnswer: string,
    expectedAnswer: string,
    correct: boolean,
    questionContext?: string
  ): QuestionAttempt {
    const now = Date.now();
    this.questionRetries++;

    // Detect grammar errors if answer is incorrect
    let grammarErrors: GrammarError[] = [];
    if (!correct) {
      grammarErrors = detectGrammarErrors(userAnswer, expectedAnswer, questionContext);
    }

    const attempt: QuestionAttempt = {
      id: `attempt_${now}_${Math.random().toString(36).substr(2, 9)}`,
      questionId,
      moduleId,
      levelId,
      timestamp: now,
      startTime: this.questionStartTime,
      endTime: now,
      timeSpent: now - this.questionStartTime,
      attemptNumber: this.questionRetries,
      correct,
      userAnswer,
      expectedAnswer,
      grammarErrors,
      retryReason: correct ? undefined : (this.questionRetries > 1 ? 'incorrect' : undefined)
    };

    // Store the attempt
    this.store.recordQuestionAttempt(attempt);

    // Update user profile with this attempt
    this.updateUserProfileAfterAttempt(attempt);

    // Update module progress
    this.updateModuleProgress(levelId, moduleId);

    return attempt;
  }

  private updateUserProfileAfterAttempt(attempt: QuestionAttempt): void {
    const profile = this.store.getUserProfile(this.currentUserId);
    
    // Update basic counters
    profile.totalQuestionsAnswered++;
    if (attempt.correct) {
      profile.totalCorrectAnswers++;
    }
    
    // Update accuracy (weighted toward recent performance)
    profile.overallAccuracy = (profile.totalCorrectAnswers / profile.totalQuestionsAnswered) * 100;
    
    // Update study time
    profile.totalStudyTime += attempt.timeSpent;
    
    // Update average response time (rolling average)
    const weight = 0.1; // How much new data affects the average
    profile.averageResponseTime = profile.averageResponseTime * (1 - weight) + attempt.timeSpent * weight;
    
    // Track grammar errors
    if (attempt.grammarErrors && attempt.grammarErrors.length > 0) {
      profile.recentErrors.push(...attempt.grammarErrors);
      
      // Keep only last 100 errors
      if (profile.recentErrors.length > 100) {
        profile.recentErrors = profile.recentErrors.slice(-100);
      }
      
      // Update most common errors
      this.updateMostCommonErrors(profile);
    }
    
    // Update retry rate
    const totalAttempts = this.getTotalAttemptsCount(profile.userId);
    profile.retryRate = totalAttempts > 0 ? 
      ((totalAttempts - profile.totalQuestionsAnswered) / totalAttempts) * 100 : 0;
    
    // Update consistency score based on recent performance
    profile.consistencyScore = this.calculateConsistencyScore(profile.userId);
    
    // Update current position
    profile.currentLevel = attempt.levelId;
    profile.currentModule = attempt.moduleId;
    
    // Generate new review suggestions
    profile.reviewSuggestions = this.store.generateReviewSuggestions(this.currentUserId);
    
    this.store.saveUserProfile(profile);
  }

  private updateMostCommonErrors(profile: UserProgressProfile): void {
    const errorCounts = new Map<string, { error: GrammarError; count: number }>();
    
    profile.recentErrors.forEach(error => {
      const key = `${error.category}:${error.specific || ''}`;
      if (!errorCounts.has(key)) {
        errorCounts.set(key, { error, count: 0 });
      }
      errorCounts.get(key)!.count++;
    });
    
    profile.mostCommonErrors = Array.from(errorCounts.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map(item => item.error);
  }

  private getTotalAttemptsCount(userId: string): number {
    // This would sum up all attempts across all modules
    // For now, return a placeholder calculation
    const sessions = this.store.getLearningSessions(userId);
    return sessions.reduce((total, session) => total + session.totalAttempts, 0);
  }

  private calculateConsistencyScore(userId: string): number {
    const snapshots = this.store.getProgressSnapshots(userId, 'week');
    if (snapshots.length < 2) return 1;
    
    // Calculate variance in accuracy
    const accuracies = snapshots.map(s => s.accuracy);
    const mean = accuracies.reduce((a, b) => a + b, 0) / accuracies.length;
    const variance = accuracies.reduce((sum, acc) => sum + Math.pow(acc - mean, 2), 0) / accuracies.length;
    const standardDeviation = Math.sqrt(variance);
    
    // Convert to consistency score (lower deviation = higher consistency)
    return Math.max(0, 1 - standardDeviation / 100);
  }

  // Module Progress Management
  private updateModuleProgress(levelId: string, moduleId: number): void {
    let progress = this.store.getModuleProgress(this.currentUserId, levelId, moduleId);
    
    if (!progress) {
      // Create new module progress
      progress = {
        moduleId,
        levelId,
        startDate: Date.now(),
        totalQuestions: 40, // Standard module size
        questionsAttempted: 0,
        questionsCompleted: 0,
        totalAttempts: 0,
        correctFirstTry: 0,
        averageAttempts: 0,
        totalTimeSpent: 0,
        averageTimePerQuestion: 0,
        currentAccuracy: 0,
        requiredAccuracy: this.store.getConfig().accuracyThreshold,
        isCompleted: false,
        canUnlockNext: false,
        commonErrorTypes: [],
        weakAreas: [],
        strongAreas: [],
        lastActivity: Date.now(),
        studyStreak: 0
      };
    }

    // Recalculate statistics based on all attempts for this module
    const attempts = this.store.getQuestionAttempts(moduleId, levelId, this.currentUserId);
    
    // Group by question to get final results
    const questionResults = new Map<string, QuestionAttempt[]>();
    attempts.forEach(attempt => {
      if (!questionResults.has(attempt.questionId)) {
        questionResults.set(attempt.questionId, []);
      }
      questionResults.get(attempt.questionId)!.push(attempt);
    });

    // Calculate statistics
    progress.questionsAttempted = questionResults.size;
    progress.totalAttempts = attempts.length;
    progress.totalTimeSpent = attempts.reduce((sum, a) => sum + a.timeSpent, 0);
    
    let correctCount = 0;
    let firstTryCorrect = 0;
    const allErrors: GrammarError[] = [];
    
    questionResults.forEach((questionAttempts) => {
      // Sort by timestamp to get chronological order
      questionAttempts.sort((a, b) => a.timestamp - b.timestamp);
      
      // Check if final attempt was correct
      const finalAttempt = questionAttempts[questionAttempts.length - 1];
      if (finalAttempt.correct) {
        correctCount++;
      }
      
      // Check if correct on first try
      if (questionAttempts[0].correct) {
        firstTryCorrect++;
      }
      
      // Collect errors
      questionAttempts.forEach(attempt => {
        if (attempt.grammarErrors) {
          allErrors.push(...attempt.grammarErrors);
        }
      });
    });

    progress.questionsCompleted = correctCount;
    progress.correctFirstTry = firstTryCorrect;
    progress.averageAttempts = progress.questionsAttempted > 0 ? 
      progress.totalAttempts / progress.questionsAttempted : 0;
    progress.averageTimePerQuestion = progress.questionsAttempted > 0 ?
      progress.totalTimeSpent / progress.questionsAttempted : 0;
    progress.currentAccuracy = progress.questionsAttempted > 0 ?
      (correctCount / progress.questionsAttempted) * 100 : 0;
    
    // Determine if module is completed
    progress.isCompleted = progress.currentAccuracy >= progress.requiredAccuracy;
    progress.canUnlockNext = progress.isCompleted;
    
    // Analyze common errors
    progress.commonErrorTypes = this.getTopErrors(allErrors, 5);
    progress.lastActivity = Date.now();

    // Determine weak and strong areas based on errors
    const errorSuggestions = getReviewSuggestions(allErrors);
    progress.weakAreas = errorSuggestions.slice(0, 3);
    
    // Strong areas are grammar topics with fewer errors (placeholder logic)
    const allTopics = ['verb_tense', 'article', 'pronoun', 'word_order', 'contraction'];
    progress.strongAreas = allTopics.filter(topic => 
      !progress.weakAreas.includes(topic)
    ).slice(0, 3);

    this.store.updateModuleProgress(this.currentUserId, progress);
  }

  private getTopErrors(errors: GrammarError[], count: number): GrammarError[] {
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
      .slice(0, count)
      .map(item => item.error);
  }

  // Analytics and Reporting
  public getModuleAccuracy(levelId: string, moduleId: number): number {
    return this.store.calculateModuleAccuracy(this.currentUserId, levelId, moduleId);
  }

  public canUnlockNextModule(levelId: string, moduleId: number): boolean {
    return this.store.canUnlockNextModule(this.currentUserId, levelId, moduleId);
  }

  public getUserProfile(): UserProgressProfile {
    return this.store.getUserProfile(this.currentUserId);
  }

  public getModuleProgress(levelId: string, moduleId: number): ModuleProgressDetail | null {
    return this.store.getModuleProgress(this.currentUserId, levelId, moduleId);
  }

  public getPerformanceTrend(): PerformanceTrend {
    return this.store.getPerformanceTrend(this.currentUserId);
  }

  public getReviewSuggestions(): ReviewSuggestion[] {
    return this.store.generateReviewSuggestions(this.currentUserId);
  }

  // Question Statistics
  public getQuestionStats(levelId: string, moduleId: number, questionId: string) {
    return this.store.getQuestionStats(this.currentUserId, levelId, moduleId, questionId);
  }

  // Progress Snapshots
  public saveCurrentProgress(levelId: string, moduleId: number): void {
    const profile = this.store.getUserProfile(this.currentUserId);
    const snapshot: ProgressSnapshot = {
      timestamp: Date.now(),
      accuracy: profile.overallAccuracy,
      questionsCompleted: profile.totalCorrectAnswers,
      studyTime: profile.totalStudyTime,
      level: levelId,
      moduleId
    };
    this.store.saveProgressSnapshot(this.currentUserId, snapshot);
  }

  // Configuration
  public updateConfig(updates: any): void {
    this.store.updateConfig(updates);
  }

  public getConfig() {
    return this.store.getConfig();
  }

  // Data Management
  public exportUserData(): string {
    return this.store.exportUserData(this.currentUserId);
  }

  public importUserData(jsonData: string): boolean {
    return this.store.importUserData(this.currentUserId, jsonData);
  }

  public clearAllData(): void {
    this.store.clearUserData(this.currentUserId);
  }

  // Utility Methods
  public setUserId(userId: string): void {
    this.currentUserId = userId;
  }

  public getCurrentUserId(): string {
    return this.currentUserId;
  }

  public getDetailedAnalytics(timeWindow: 'day' | 'week' | 'month' | 'all' = 'week') {
    const profile = this.getUserProfile();
    const sessions = this.store.getLearningSessions(this.currentUserId);
    const snapshots = this.store.getProgressSnapshots(this.currentUserId, timeWindow);
    
    return {
      profile,
      sessions: sessions.slice(-10), // Last 10 sessions
      snapshots,
      performanceTrend: this.getPerformanceTrend(),
      reviewSuggestions: this.getReviewSuggestions()
    };
  }

  // For integration with existing lesson system
  public getCompatibilityData(levelId: string, moduleId: number) {
    const accuracy = this.getModuleAccuracy(levelId, moduleId);
    const canUnlock = this.canUnlockNextModule(levelId, moduleId);
    const progress = this.getModuleProgress(levelId, moduleId);
    
    return {
      accuracy,
      canUnlock,
      completionPercentage: progress ? (progress.questionsCompleted / progress.totalQuestions) * 100 : 0,
      questionsAnswered: progress?.questionsCompleted || 0,
      totalQuestions: progress?.totalQuestions || 40,
      needsReview: (progress?.weakAreas.length || 0) > 0
    };
  }
}