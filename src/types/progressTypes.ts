// Enhanced Progress Tracking Types for detailed user learning analytics

export type GrammarErrorCategory = 
  | 'verb_tense'         // Present simple, past, future, etc.
  | 'article'            // a, an, the
  | 'pronoun'            // I, me, he, him, they, them
  | 'word_order'         // Sentence structure issues
  | 'contraction'        // I'm, don't, won't, etc.
  | 'preposition'        // in, on, at, etc.
  | 'plural_singular'    // Cat vs cats, is vs are
  | 'possessive'         // 's, my, his, their
  | 'adjective_order'    // Big red car vs red big car
  | 'negation'           // Don't, doesn't, didn't
  | 'question_formation' // Do you vs You do
  | 'other';             // Unclassified errors

export interface GrammarError {
  category: GrammarErrorCategory;
  specific?: string;         // More detailed error type, e.g., "present_simple_third_person"
  confidence: number;        // 0-1 confidence in error detection
  description?: string;      // Human-readable description
  reviewTopic?: string;      // Link to grammar module for review
}

export interface QuestionAttempt {
  id: string;                // Unique identifier for this attempt
  questionId: string;        // Identifier for the specific question
  moduleId: number;          // Module number (e.g., 51, 52)
  levelId: string;           // Level (A1, A2, B1)
  timestamp: number;         // When the attempt was made
  startTime: number;         // When user started this question
  endTime: number;           // When user finished/submitted
  timeSpent: number;         // Milliseconds spent on question
  attemptNumber: number;     // Which attempt this is (1, 2, 3...)
  correct: boolean;          // Whether answer was correct
  userAnswer: string;        // What user said/typed
  expectedAnswer: string;    // Correct answer
  grammarErrors?: GrammarError[]; // Detected errors if incorrect
  retryReason?: 'incorrect' | 'unclear_speech' | 'timeout'; // Why retry was needed
  confidenceScore?: number;  // Speech recognition confidence (0-1)
}

export interface QuestionStats {
  questionId: string;
  moduleId: number;
  levelId: string;
  totalAttempts: number;
  correctAttempts: number;
  averageTime: number;       // Average time to answer correctly
  fastestTime: number;       // Fastest correct answer
  commonErrors: GrammarError[]; // Most frequent errors
  lastAttemptDate: number;
  needsReview: boolean;      // Based on performance patterns
}

export interface ModuleProgressDetail {
  moduleId: number;
  levelId: string;
  startDate: number;         // When module was first started
  completionDate?: number;   // When module was completed (90%+ accuracy)
  totalQuestions: number;    // Usually 40 per module
  questionsAttempted: number;
  questionsCompleted: number; // Questions answered correctly
  totalAttempts: number;     // Sum of all attempts across questions
  correctFirstTry: number;   // Questions correct on first attempt
  averageAttempts: number;   // Average attempts per question
  totalTimeSpent: number;    // Total milliseconds in module
  averageTimePerQuestion: number;
  currentAccuracy: number;   // Current percentage (0-100)
  requiredAccuracy: number;  // Required to unlock next (usually 90)
  isCompleted: boolean;      // Met accuracy requirement
  canUnlockNext: boolean;    // Based on accuracy threshold
  commonErrorTypes: GrammarError[]; // Most frequent errors
  weakAreas: string[];       // Grammar topics needing review
  strongAreas: string[];     // Grammar topics mastered
  lastActivity: number;      // Last question attempt timestamp
  studyStreak: number;       // Days of consecutive activity
}

export interface UserProgressProfile {
  userId: string;            // User identifier
  createdAt: number;         // When profile was created
  lastUpdated: number;       // Last activity
  
  // Overall statistics
  totalModulesStarted: number;
  totalModulesCompleted: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  overallAccuracy: number;   // Weighted recent performance
  totalStudyTime: number;    // Total milliseconds spent learning
  currentLevel: string;      // A1, A2, B1
  currentModule: number;     // Currently working on
  
  // Learning patterns
  averageSessionLength: number; // Minutes per study session
  preferredStudyTimes: number[]; // Hours of day when most active
  longestStreak: number;     // Longest daily study streak
  currentStreak: number;     // Current daily study streak
  
  // Performance metrics
  improvementRate: number;   // How accuracy changes over time
  retryRate: number;         // Percentage of questions requiring retries
  averageResponseTime: number; // Time to answer questions
  consistencyScore: number;  // How consistent performance is (0-1)
  
  // Error analysis
  mostCommonErrors: GrammarError[];
  recentErrors: GrammarError[]; // Last 50 errors
  improvedAreas: string[];   // Grammar topics that got better
  persistentWeaknesses: string[]; // Areas needing continued focus
  
  // Module-specific data
  moduleProgress: Record<string, ModuleProgressDetail>; // Key: "level:moduleId"
  reviewSuggestions: ReviewSuggestion[];
}

export interface ReviewSuggestion {
  id: string;
  grammarTopic: string;      // Topic needing review
  priority: 'high' | 'medium' | 'low';
  reason: string;            // Why this review is suggested
  moduleId?: number;         // Grammar module to review
  errorCount: number;        // How many times this error occurred
  lastErrorDate: number;     // Most recent occurrence
  suggestedAction: string;   // What user should do
  estimatedTime: number;     // Estimated minutes to complete review
}

export interface ProgressSnapshot {
  timestamp: number;
  accuracy: number;
  questionsCompleted: number;
  studyTime: number;
  level: string;
  moduleId: number;
}

export interface LearningSession {
  id: string;
  startTime: number;
  endTime: number;
  duration: number;          // Milliseconds
  moduleId: number;
  levelId: string;
  questionsAttempted: number;
  questionsCorrect: number;
  averageAccuracy: number;
  totalAttempts: number;
  breaks: number;            // How many times user paused
  completedSuccessfully: boolean; // Did user finish the session
}

// Export utility types
export type ProgressKey = `${string}:${number}`; // "level:moduleId"
export type TimeWindow = 'day' | 'week' | 'month' | 'all';
export type PerformanceTrend = 'improving' | 'declining' | 'stable';

// Configuration
export interface ProgressTrackerConfig {
  accuracyThreshold: number;     // Default 90%
  maxRetries: number;            // Default 3
  timeoutSeconds: number;        // Default 30
  enableGrammarDetection: boolean;
  enableTimingAnalytics: boolean;
  syncWithSupabase: boolean;     // Future feature
}