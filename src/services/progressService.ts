// Unified Progress Service - Handles all progress saving across the platform
// Supports both authenticated users (database) and guests (localStorage)
// Provides cross-device sync, offline support, and data migration

import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

// ============================================
// TYPES AND INTERFACES
// ============================================

export interface BaseProgress {
  userId: string;
  updatedAt: number;
  version: number;
}

export interface LessonProgress extends BaseProgress {
  level: string;          // A1, A2, B1
  moduleId: number;       // 1-140
  phase: 'intro' | 'listening' | 'speaking' | 'complete';
  currentQuestionIndex: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;      // milliseconds
  completed: boolean;
  mcqCompleted: boolean;  // Multiple choice completed
  speakingCompleted: boolean;
}

export interface PlacementTestProgress extends BaseProgress {
  testType: 'speaking' | 'grammar' | 'integration';
  currentQuestionIndex: number;
  totalQuestions: number;
  answers: Array<{
    questionId: string;
    answer: string;
    isCorrect: boolean;
    timeSpent: number;
  }>;
  scores: Record<string, number>;
  completed: boolean;
  results?: {
    level: string;
    recommendedModule: number;
    strengths: string[];
    improvements: string[];
  };
}

export interface GameProgress extends BaseProgress {
  gameType: string;
  level: number;
  score: number;
  highScore: number;
  completedLevels: number[];
  achievements: string[];
  timeSpent: number;
}

export interface GamificationProgress extends BaseProgress {
  xp: number;
  level: number;
  currentStreak: number;
  bestStreak: number;
  lastVisitDate: string;
  badges: Array<{
    id: string;
    name: string;
    earnedAt: number;
    category: string;
  }>;
  milestones: Array<{
    id: string;
    type: string;
    achieved: boolean;
    achievedAt?: number;
  }>;
}

export interface UserPreferences extends BaseProgress {
  soundEnabled: boolean;
  language: string;
  theme: 'light' | 'dark' | 'system';
  notifications: {
    streakReminders: boolean;
    lessonReminders: boolean;
    weeklyReports: boolean;
  };
  privacy: {
    shareProgress: boolean;
    showInLeaderboard: boolean;
  };
}

export type ProgressType = 'lesson' | 'placement' | 'game' | 'gamification' | 'preferences';
export type ProgressData = LessonProgress | PlacementTestProgress | GameProgress | GamificationProgress | UserPreferences;

// ============================================
// UNIFIED PROGRESS SERVICE
// ============================================

class ProgressService {
  private syncQueue: Array<{ type: ProgressType; data: ProgressData }> = [];
  private isOnline = navigator.onLine;
  private syncInProgress = false;
  private currentUser: any = null;
  private sessionId = Math.random().toString(36).substring(2);

  constructor() {
    // Listen for online/offline status
    window.addEventListener('online', this.handleOnline.bind(this));
    window.addEventListener('offline', this.handleOffline.bind(this));
    
    // Initialize auth state
    this.initializeAuth();
    
    // Auto-sync every 30 seconds if online and authenticated
    setInterval(() => {
      if (this.isOnline && this.isAuthenticated()) {
        this.processSyncQueue();
      }
    }, 30000);
  }

  private async initializeAuth() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      this.currentUser = session?.user || null;

      // Listen for auth changes
      supabase.auth.onAuthStateChange((event, session) => {
        const newUser = session?.user || null;
        const wasAuthenticated = !!this.currentUser;
        const isNowAuthenticated = !!newUser;

        this.currentUser = newUser;

        // If user just logged in, migrate their data
        if (!wasAuthenticated && isNowAuthenticated) {
          this.migrateExistingData();
        }
        
        // If user logged out, clear sync queue
        if (wasAuthenticated && !isNowAuthenticated) {
          this.syncQueue = [];
        }
      });
    } catch (error) {
      console.error('Failed to initialize auth:', error);
    }
  }

  // ============================================
  // CORE SAVE/LOAD METHODS
  // ============================================

  async saveProgress<T extends ProgressData>(type: ProgressType, data: T): Promise<void> {
    try {
      // Always save to localStorage first for immediate persistence
      this.saveToLocalStorage(type, data);

      // For authenticated users, also save to database
      if (this.isAuthenticated()) {
        if (this.isOnline) {
          await this.saveToDatabase(type, data);
        } else {
          // Queue for later sync
          this.queueForSync(type, data);
        }
      }

      console.log(`💾 Progress saved: ${type}`, data);
    } catch (error) {
      console.error(`Error saving ${type} progress:`, error);
      // Ensure localStorage save succeeded even if database fails
      this.saveToLocalStorage(type, data);
    }
  }

  async loadProgress<T extends ProgressData>(type: ProgressType, identifier?: string): Promise<T | null> {
    try {
      let progress: T | null = null;

      // For authenticated users, try database first
      if (this.isAuthenticated() && this.isOnline) {
        progress = await this.loadFromDatabase<T>(type, identifier);
      }

      // Fallback to localStorage if no database data or if guest user
      if (!progress) {
        progress = this.loadFromLocalStorage<T>(type, identifier);
      }

      return progress;
    } catch (error) {
      console.error(`Error loading ${type} progress:`, error);
      // Always fallback to localStorage
      return this.loadFromLocalStorage<T>(type, identifier);
    }
  }

  // ============================================
  // SPECIFIC PROGRESS METHODS
  // ============================================

  async saveLessonProgress(progress: Omit<LessonProgress, 'userId' | 'updatedAt' | 'version'>): Promise<void> {
    const fullProgress: LessonProgress = {
      ...progress,
      userId: this.getUserId(),
      updatedAt: Date.now(),
      version: 1
    };
    
    await this.saveProgress('lesson', fullProgress);
  }

  async loadLessonProgress(level: string, moduleId: number): Promise<LessonProgress | null> {
    return await this.loadProgress<LessonProgress>('lesson', `${level}-${moduleId}`);
  }

  async saveGamificationProgress(progress: Omit<GamificationProgress, 'userId' | 'updatedAt' | 'version'>): Promise<void> {
    const fullProgress: GamificationProgress = {
      ...progress,
      userId: this.getUserId(),
      updatedAt: Date.now(),
      version: 1
    };
    
    await this.saveProgress('gamification', fullProgress);
  }

  async loadGamificationProgress(): Promise<GamificationProgress | null> {
    return await this.loadProgress<GamificationProgress>('gamification', this.getUserId());
  }

  // ============================================
  // DATABASE OPERATIONS
  // ============================================

  private async saveToDatabase<T extends ProgressData>(type: ProgressType, data: T): Promise<void> {
    const tableName = this.getTableName(type);
    const payload = this.serializeForDatabase(type, data);

    const { error } = await supabase
      .from(tableName as keyof Database['public']['Tables'])
      .upsert(payload, {
        onConflict: 'user_id',
        ignoreDuplicates: false
      });

    if (error) {
      throw error;
    }
  }

  private async loadFromDatabase<T extends ProgressData>(type: ProgressType, identifier?: string): Promise<T | null> {
    const tableName = this.getTableName(type);
    const userId = this.getUserId();

    let query = supabase
      .from(tableName as keyof Database['public']['Tables'])
      .select('*')
      .eq('user_id', userId);

    // Add specific identifiers for different progress types
    if (type === 'lesson' && identifier) {
      const [level, moduleId] = identifier.split('-');
      query = query.eq('level', level).eq('module_id', parseInt(moduleId));
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      throw error;
    }

    return data ? this.deserializeFromDatabase<T>(type, data) : null;
  }

  // ============================================
  // LOCALSTORAGE OPERATIONS
  // ============================================

  private saveToLocalStorage<T extends ProgressData>(type: ProgressType, data: T): void {
    const key = this.getLocalStorageKey(type, data);
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('LocalStorage quota exceeded:', error);
      // Try to clean up old data and retry
      this.cleanupOldLocalStorageData();
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (retryError) {
        console.error('Failed to save even after cleanup:', retryError);
      }
    }
  }

  private loadFromLocalStorage<T extends ProgressData>(type: ProgressType, identifier?: string): T | null {
    const keys = this.getLocalStorageKeys(type, identifier);
    
    for (const key of keys) {
      try {
        const data = localStorage.getItem(key);
        if (data) {
          return JSON.parse(data) as T;
        }
      } catch (error) {
        console.error(`Error parsing localStorage data for key ${key}:`, error);
        // Remove corrupted data
        localStorage.removeItem(key);
      }
    }
    
    return null;
  }

  // ============================================
  // MIGRATION AND SYNC
  // ============================================

  async migrateExistingData(): Promise<void> {
    if (!this.isAuthenticated()) {
      return; // Only migrate for authenticated users
    }

    console.log('🔄 Starting progress data migration...');

    try {
      // Migrate old progress data
      await this.migrateLegacyProgressData();
      await this.migrateBadgeData();
      await this.migrateGamificationData();
      await this.migrateUserPreferences();

      console.log('✅ Data migration completed successfully');
    } catch (error) {
      console.error('❌ Data migration failed:', error);
    }
  }

  private async migrateLegacyProgressData(): Promise<void> {
    // Migrate from ProgressStore.ts
    const oldProgressData = localStorage.getItem('ll_progress_v1');
    if (oldProgressData) {
      try {
        const parsed = JSON.parse(oldProgressData);
        for (const [key, progress] of Object.entries(parsed as Record<string, any>)) {
          const [level, moduleId] = key.split('-');
          const lessonProgress: LessonProgress = {
            userId: this.getUserId(),
            level,
            moduleId: parseInt(moduleId),
            phase: progress.phase || 'intro',
            currentQuestionIndex: progress.speakingIndex || 0,
            totalQuestions: progress.totalSpeaking || 40,
            correctAnswers: 0, // Not available in old format
            timeSpent: 0, // Not available in old format
            completed: progress.completed || false,
            mcqCompleted: false, // Not available in old format
            speakingCompleted: progress.completed || false,
            updatedAt: progress.updatedAt || Date.now(),
            version: 1
          };

          await this.saveProgress('lesson', lessonProgress);
        }
      } catch (error) {
        console.error('Failed to migrate legacy progress data:', error);
      }
    }

    // Migrate from progress.ts
    const newProgressData = localStorage.getItem(`speakflow:v2:${this.getUserId()}`);
    if (newProgressData) {
      try {
        const parsed = JSON.parse(newProgressData);
        for (const [key, state] of Object.entries(parsed as Record<string, any>)) {
          const [levelId, moduleId] = key.split(':');
          const lessonProgress: LessonProgress = {
            userId: this.getUserId(),
            level: levelId,
            moduleId: parseInt(moduleId),
            phase: state.completed ? 'complete' : 'speaking',
            currentQuestionIndex: state.pointer?.questionIndex || 0,
            totalQuestions: state.total || 40,
            correctAnswers: state.correct || 0,
            timeSpent: 0,
            completed: state.completed || false,
            mcqCompleted: false,
            speakingCompleted: state.completed || false,
            updatedAt: state.updatedAt || Date.now(),
            version: 1
          };

          await this.saveProgress('lesson', lessonProgress);
        }
      } catch (error) {
        console.error('Failed to migrate new progress data:', error);
      }
    }
  }

  // ============================================
  // UTILITY METHODS
  // ============================================

  private isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  private getUserId(): string {
    return this.currentUser?.id || this.sessionId;
  }

  private handleOnline(): void {
    this.isOnline = true;
    console.log('🌐 Back online - processing sync queue');
    this.processSyncQueue();
  }

  private handleOffline(): void {
    this.isOnline = false;
    console.log('📱 Offline mode - queueing saves');
  }

  private queueForSync<T extends ProgressData>(type: ProgressType, data: T): void {
    this.syncQueue.push({ type, data });
    console.log(`📦 Queued for sync: ${type}`);
  }

  private async processSyncQueue(): Promise<void> {
    if (this.syncInProgress || this.syncQueue.length === 0) {
      return;
    }

    this.syncInProgress = true;
    console.log(`🔄 Processing sync queue (${this.syncQueue.length} items)`);

    const queue = [...this.syncQueue];
    this.syncQueue = [];

    for (const { type, data } of queue) {
      try {
        await this.saveToDatabase(type, data);
      } catch (error) {
        console.error(`Failed to sync ${type}:`, error);
        // Re-queue failed items
        this.syncQueue.push({ type, data });
      }
    }

    this.syncInProgress = false;
  }

  private getTableName(type: ProgressType): string {
    const tableMap: Record<ProgressType, keyof Database['public']['Tables']> = {
      lesson: 'user_profiles',
      placement: 'user_profiles', 
      game: 'user_profiles',
      gamification: 'user_profiles',
      preferences: 'user_profiles'
    };
    return tableMap[type];
  }

  private getLocalStorageKey<T extends ProgressData>(type: ProgressType, data: T): string {
    const userId = this.getUserId();
    switch (type) {
      case 'lesson':
        const lesson = data as LessonProgress;
        return `progress:lesson:${userId}:${lesson.level}-${lesson.moduleId}`;
      case 'gamification':
        return `progress:gamification:${userId}`;
      case 'preferences':
        return `progress:preferences:${userId}`;
      default:
        return `progress:${type}:${userId}`;
    }
  }

  private getLocalStorageKeys(type: ProgressType, identifier?: string): string[] {
    const userId = this.getUserId();
    if (identifier) {
      return [`progress:${type}:${userId}:${identifier}`];
    }
    
    // Return possible legacy keys for migration
    const legacyKeys = [
      `progress:${type}:${userId}`,
      `ll_progress_v1`, // Legacy ProgressStore
      `speakflow:v2:${userId}`, // Legacy progress.ts
      `userProfile`, // Legacy profile
      `badge_progress`, // Legacy badges
      `grammarLessonsCompleted`,
      `completedModules`,
      `currentLevel`,
      `currentModule`
    ];

    return legacyKeys;
  }

  private cleanupOldLocalStorageData(): void {
    const keys = Object.keys(localStorage);
    const cutoffTime = Date.now() - (30 * 24 * 60 * 60 * 1000); // 30 days

    for (const key of keys) {
      if (key.startsWith('progress:')) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '{}');
          if (data.updatedAt && data.updatedAt < cutoffTime) {
            localStorage.removeItem(key);
            console.log(`🧹 Cleaned up old progress data: ${key}`);
          }
        } catch (error) {
          // Remove corrupted data
          localStorage.removeItem(key);
        }
      }
    }
  }

  private serializeForDatabase(type: ProgressType, data: ProgressData): any {
    // Convert client format to database format
    switch (type) {
      case 'lesson':
        const lesson = data as LessonProgress;
        return {
          user_id: lesson.userId,
          level: lesson.level,
          module_id: lesson.moduleId,
          phase: lesson.phase,
          current_question_index: lesson.currentQuestionIndex,
          total_questions: lesson.totalQuestions,
          correct_answers: lesson.correctAnswers,
          time_spent: lesson.timeSpent,
          completed: lesson.completed,
          mcq_completed: lesson.mcqCompleted,
          speaking_completed: lesson.speakingCompleted,
          updated_at: new Date(lesson.updatedAt).toISOString(),
          version: lesson.version
        };
      default:
        return data;
    }
  }

  private deserializeFromDatabase<T extends ProgressData>(type: ProgressType, data: any): T {
    // Convert database format to client format
    switch (type) {
      case 'lesson':
        return {
          userId: data.user_id,
          level: data.level,
          moduleId: data.module_id,
          phase: data.phase,
          currentQuestionIndex: data.current_question_index,
          totalQuestions: data.total_questions,
          correctAnswers: data.correct_answers,
          timeSpent: data.time_spent,
          completed: data.completed,
          mcqCompleted: data.mcq_completed,
          speakingCompleted: data.speaking_completed,
          updatedAt: new Date(data.updated_at).getTime(),
          version: data.version
        } as T;
      default:
        return data as T;
    }
  }

  private async migrateBadgeData(): Promise<void> {
    try {
      const badgeData = localStorage.getItem('badge_progress');
      if (badgeData) {
        const parsed = JSON.parse(badgeData);
        const gamificationProgress = await this.loadGamificationProgress();
        
        if (gamificationProgress) {
          const badges = Object.entries(parsed).map(([badgeId, earnedValue]) => ({
            id: badgeId,
            name: badgeId.replace(/_/g, ' '),
            earnedAt: Date.now(),
            category: 'legacy'
          })).filter((_, index) => Boolean(Object.values(parsed)[index]));

          const updatedProgress: GamificationProgress = {
            ...gamificationProgress,
            badges,
            updatedAt: Date.now()
          };

          await this.saveProgress('gamification', updatedProgress);
          localStorage.removeItem('badge_progress');
        }
      }
    } catch (error) {
      console.error('Failed to migrate badge data:', error);
    }
  }

  private async migrateGamificationData(): Promise<void> {
    try {
      // Migrate streak data
      const streakData = localStorage.getItem('streakData');
      if (streakData) {
        const parsed = JSON.parse(streakData);
        const gamificationProgress: GamificationProgress = {
          userId: this.getUserId(),
          xp: 0,
          level: 1,
          currentStreak: parsed.currentStreak || 0,
          bestStreak: parsed.bestStreak || 0,
          lastVisitDate: parsed.lastVisitDate || '',
          badges: [],
          milestones: [],
          updatedAt: Date.now(),
          version: 1
        };

        await this.saveProgress('gamification', gamificationProgress);
        localStorage.removeItem('streakData');
      }

      // Migrate old level and XP data
      const completedModules = localStorage.getItem('completedModules');
      const currentLevel = localStorage.getItem('currentLevel');
      if (completedModules || currentLevel) {
        const existingProgress = await this.loadGamificationProgress();
        if (existingProgress) {
          const updatedProgress: GamificationProgress = {
            ...existingProgress,
            xp: existingProgress.xp + (completedModules ? JSON.parse(completedModules).length * 50 : 0),
            level: Math.max(existingProgress.level, currentLevel ? parseInt(currentLevel) : 1),
            updatedAt: Date.now()
          };

          await this.saveProgress('gamification', updatedProgress);
        }
        
        localStorage.removeItem('completedModules');
        localStorage.removeItem('currentLevel');
        localStorage.removeItem('currentModule');
      }
    } catch (error) {
      console.error('Failed to migrate gamification data:', error);
    }
  }

  private async migrateUserPreferences(): Promise<void> {
    try {
      // Migrate from userProfile localStorage
      const userProfile = localStorage.getItem('userProfile');
      if (userProfile) {
        const parsed = JSON.parse(userProfile);
        const preferences: UserPreferences = {
          userId: this.getUserId(),
          soundEnabled: parsed.soundEnabled !== false,
          language: 'en',
          theme: 'system',
          notifications: {
            streakReminders: true,
            lessonReminders: true,
            weeklyReports: true
          },
          privacy: {
            shareProgress: false,
            showInLeaderboard: true
          },
          updatedAt: Date.now(),
          version: 1
        };

        await this.saveProgress('preferences', preferences);
      }

      // Also migrate gamification data from userProfile
      if (userProfile) {
        const parsed = JSON.parse(userProfile);
        const existingGamification = await this.loadGamificationProgress();
        
        if (!existingGamification) {
          const gamificationProgress: GamificationProgress = {
            userId: this.getUserId(),
            xp: parsed.xp || 0,
            level: parsed.level || 1,
            currentStreak: parsed.currentStreak || 0,
            bestStreak: parsed.bestStreak || 0,
            lastVisitDate: parsed.lastVisitDate || '',
            badges: [],
            milestones: [],
            updatedAt: Date.now(),
            version: 1
          };

          await this.saveProgress('gamification', gamificationProgress);
        }
      }
    } catch (error) {
      console.error('Failed to migrate user preferences:', error);
    }
  }
}

// ============================================
// SINGLETON EXPORT
// ============================================

export const progressService = new ProgressService();
export default progressService;