// Data Service Layer - Uses Supabase for data persistence
import { supabase } from '@/integrations/supabase/client';

export interface UserProfileData {
  userId?: string;
  name: string;
  level: number;
  xp: number;
  currentStreak: number;
  bestStreak: number;
  lastVisitDate: string;
  userLevel: 'beginner' | 'intermediate' | 'advanced';
  soundEnabled: boolean;
}

export interface SessionRecord {
  input: string;
  corrected: string;
  time: string;
  userId?: string;
}

export interface ConversationMessage {
  text: string;
  isUser: boolean;
  isSystem: boolean;
  timestamp?: number;
  userId?: string;
}

class DataService {
  // Debouncing and singleton save protection
  private saveTimers: Map<string, NodeJS.Timeout> = new Map();
  private savingProfiles: Set<string> = new Set();
  private saveQueue: Map<string, UserProfileData> = new Map();

  // User Profile Management
  async getUserProfile(userId?: string): Promise<UserProfileData | null> {
    if (!userId) {
      // Fallback to localStorage for non-authenticated users
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        return JSON.parse(savedProfile);
      }
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      if (data) {
        return {
          userId: data.user_id,
          name: data.name,
          level: data.level || 1,
          xp: data.xp_current || 0,
          currentStreak: data.current_streak || 0,
          bestStreak: data.best_streak || 0,
          lastVisitDate: data.last_visit_date || '',
          userLevel: data.user_level as 'beginner' | 'intermediate' | 'advanced' || 'beginner',
          soundEnabled: data.sound_enabled !== false
        };
      }

      return null;
    } catch (error) {
      console.error('Error in getUserProfile:', error);
      return null;
    }
  }

  async saveUserProfile(profile: UserProfileData): Promise<void> {
    if (!profile.userId) {
      // Fallback to localStorage for non-authenticated users
      localStorage.setItem('userProfile', JSON.stringify(profile));
      return;
    }

    // BULLETPROOF: Debounced singleton save with queue processing
    return this.debouncedSaveUserProfile(profile);
  }

  private async debouncedSaveUserProfile(profile: UserProfileData): Promise<void> {
    const userId = profile.userId!;

    // Clear existing timer if any
    const existingTimer = this.saveTimers.get(userId);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    // Add to queue (latest profile wins)
    this.saveQueue.set(userId, profile);

    // Set new debounced timer
    const timer = setTimeout(async () => {
      await this.processSaveQueue(userId);
    }, 500); // 500ms debounce

    this.saveTimers.set(userId, timer);
  }

  private async processSaveQueue(userId: string): Promise<void> {
    // Check if already saving this profile
    if (this.savingProfiles.has(userId)) {
      console.log(`[DataService] Profile ${userId} already being saved, skipping`);
      return;
    }

    // Get profile from queue
    const profile = this.saveQueue.get(userId);
    if (!profile) {
      return;
    }

    // Mark as saving
    this.savingProfiles.add(userId);
    this.saveQueue.delete(userId);
    this.saveTimers.delete(userId);

    try {
      // Check for profile creation lock (prevent multiple tabs)
      const lockKey = `profile_creation_lock_${userId}`;
      const existingLock = sessionStorage.getItem(lockKey);

      if (existingLock && Date.now() - parseInt(existingLock) < 30000) {
        console.log(`[DataService] Profile creation locked for ${userId}, waiting...`);
        // Wait and retry with exponential backoff
        const retryDelay = Math.min(1000 + Math.random() * 1000, 3000);
        setTimeout(() => {
          this.savingProfiles.delete(userId);
          this.debouncedSaveUserProfile(profile);
        }, retryDelay);
        return;
      }

      // Set creation lock
      sessionStorage.setItem(lockKey, Date.now().toString());

      // BULLETPROOF: Use proper upsert with onConflict to handle duplicates
      const { error } = await supabase
        .from('user_profiles')
        .upsert(
          {
            user_id: profile.userId,
            name: profile.name,
            level: profile.level,
            xp_current: profile.xp,
            current_streak: profile.currentStreak,
            best_streak: profile.bestStreak,
            last_visit_date: profile.lastVisitDate,
            user_level: profile.userLevel,
            sound_enabled: profile.soundEnabled,
            updated_at: new Date().toISOString()
          },
          {
            onConflict: 'user_id',  // CRITICAL: Specify conflict column
            ignoreDuplicates: false  // Update on conflict instead of ignoring
          }
        );

      // Clear creation lock
      sessionStorage.removeItem(lockKey);

      // Handle duplicate key errors as success (profile already exists)
      if (error) {
        if (error.code === '23505' || error.message.includes('duplicate key') || error.message.includes('violates unique constraint')) {
          console.log(`[DataService] Profile ${userId} already exists - this is expected behavior`);
        } else {
          console.error('Error saving user profile:', error);
          throw error;
        }
      } else {
        console.log('[DataService] User profile saved successfully');
      }

    } catch (error) {
      console.error('Error in processSaveQueue:', error);

      // Enhanced retry logic with exponential backoff
      if (error instanceof Error &&
          (error.message.includes('duplicate') ||
           error.message.includes('unique constraint') ||
           error.code === '23505')) {
        console.log(`[DataService] Duplicate error for ${userId} - treating as success`);
      } else {
        // Retry with exponential backoff (max 3 retries)
        const retryCount = (profile as any).__retryCount || 0;
        if (retryCount < 3) {
          const backoffDelay = Math.pow(2, retryCount) * 1000 + Math.random() * 1000;
          console.log(`[DataService] Retrying save for ${userId}, attempt ${retryCount + 1}, delay: ${backoffDelay}ms`);

          const profileWithRetry = { ...profile, __retryCount: retryCount + 1 };
          setTimeout(() => {
            this.savingProfiles.delete(userId);
            this.debouncedSaveUserProfile(profileWithRetry);
          }, backoffDelay);
        } else {
          console.error(`[DataService] Max retries exceeded for ${userId}:`, error);
        }
        return;
      }
    } finally {
      this.savingProfiles.delete(userId);
    }
  }

  // Streak Management
  async getStreakData(userId?: string): Promise<{ currentStreak: number; lastVisitDate: string; bestStreak: number }> {
    // TODO: Replace with Supabase query when auth is implemented
    // const { data, error } = await supabase.from('streaks').select('*').eq('user_id', userId).single();
    
    const saved = localStorage.getItem('streakData');
    if (saved) {
      return JSON.parse(saved);
    }
    
    return {
      currentStreak: 0,
      lastVisitDate: '',
      bestStreak: 0
    };
  }

  async saveStreakData(streakData: any, userId?: string): Promise<void> {
    // TODO: Replace with Supabase upsert when auth is implemented
    // const { error } = await supabase.from('streaks').upsert({ ...streakData, user_id: userId });
    
    localStorage.setItem('streakData', JSON.stringify(streakData));
  }

  // Chat History Management
  async getChatHistory(userId?: string): Promise<SessionRecord[]> {
    // TODO: Replace with Supabase query when auth is implemented
    // const { data, error } = await supabase.from('chat_sessions').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    
    const saved = localStorage.getItem('chatHistory');
    return saved ? JSON.parse(saved) : [];
  }

  async saveChatSession(session: SessionRecord, userId?: string): Promise<void> {
    // TODO: Replace with Supabase insert when auth is implemented
    // const { error } = await supabase.from('chat_sessions').insert({ ...session, user_id: userId });
    
    const history = await this.getChatHistory();
    const updatedHistory = [...history, session];
    localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
  }

  // Conversation Messages Management
  async getConversationMessages(userId?: string): Promise<ConversationMessage[]> {
    // TODO: Replace with Supabase query when auth is implemented
    // const { data, error } = await supabase.from('conversations').select('*').eq('user_id', userId).order('created_at', { ascending: true });
    
    const saved = localStorage.getItem('conversationMessages');
    return saved ? JSON.parse(saved) : [
      { text: "Hello! Ready to practice today? 🎤", isUser: false, isSystem: false },
      { text: "Yes, I had pizza today!", isUser: true, isSystem: false },
      { text: 'Great! You can also say: "I had a delicious pizza with friends." 🍕', isUser: false, isSystem: false },
      { text: "Next question: What do you usually eat for breakfast?", isUser: false, isSystem: false }
    ];
  }

  async saveConversationMessage(message: ConversationMessage, userId?: string): Promise<void> {
    // TODO: Replace with Supabase insert when auth is implemented
    // const { error } = await supabase.from('conversations').insert({ ...message, user_id: userId });
    
    const messages = await this.getConversationMessages();
    const updatedMessages = [...messages, message];
    localStorage.setItem('conversationMessages', JSON.stringify(updatedMessages));
  }

  // XP and Level Management
  async updateXPAndLevel(xp: number, level: number, userId?: string): Promise<void> {
    // TODO: Replace with Supabase update when auth is implemented
    // const { error } = await supabase.from('user_profiles').update({ xp_current: xp, level }).eq('user_id', userId);

    const profile = await this.getUserProfile() || {} as UserProfileData;
    profile.xp = xp;
    profile.level = level;
    await this.saveUserProfile(profile);
  }

  // ENHANCED: Update streak data in database for authenticated users
  async updateStreakData(
    userId: string,
    currentStreak: number,
    bestStreak: number,
    lastVisitDate: string
  ): Promise<void> {
    if (!userId) {
      console.log('[DataService] No userId provided for streak update');
      return;
    }

    try {
      console.log(`[DataService] Updating streak for ${userId}: current=${currentStreak}, best=${bestStreak}`);

      const { error } = await supabase
        .from('user_profiles')
        .update({
          current_streak: currentStreak,
          best_streak: bestStreak,
          last_visit_date: lastVisitDate,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (error) {
        console.error('[DataService] Error updating streak data:', error);
        throw error;
      }

      console.log('[DataService] Streak data updated successfully');
    } catch (error) {
      console.error('[DataService] Failed to update streak data:', error);
      // Don't throw - streak updates should be non-blocking
    }
  }

  // Clear all data (for logout or reset)
  async clearUserData(): Promise<void> {
    // Clear localStorage data
    localStorage.removeItem('userProfile');
    localStorage.removeItem('streakData');
    localStorage.removeItem('chatHistory');
    localStorage.removeItem('conversationMessages');

    // Clear session storage
    sessionStorage.clear();
  }

  // COMPREHENSIVE: Clear ALL user-related data
  async clearAllUserData(): Promise<void> {
    console.log('[DataService] Clearing all user data for logout...');

    // Core profile and authentication data
    const coreItems = [
      'userProfile',
      'streakData',
      'chatHistory',
      'conversationMessages',
      'user_session',
      'auth_token'
    ];

    // Learning progress and placement data
    const learningItems = [
      'speakingTestProgress',
      'placement',
      'userPlacement',
      'pendingRoute',
      'currentLevel',
      'currentModule',
      'unlockedLevel',
      'unlocks',
      'recommendedStartLevel',
      'recommendedStartModule'
    ];

    // Game and activity data
    const gameItems = [
      'bookmarkedCards',
      'hangmanStats',
      'flashcardsProgress',
      'gameAchievements',
      'wordHangmanUsedWords'
    ];

    // Settings and preferences
    const settingsItems = [
      'soundEnabled',
      'voiceSettings',
      'tutorialCompleted',
      'dailyTipIndex',
      'lastDailyTipDate'
    ];

    // Progress tracking data
    const progressItems = [
      'lessonProgress',
      'moduleCompletions',
      'grammarProgress',
      'conversationHistory'
    ];

    // Combine all known items
    const knownItems = [
      ...coreItems,
      ...learningItems,
      ...gameItems,
      ...settingsItems,
      ...progressItems
    ];

    // Remove all known items
    knownItems.forEach(item => {
      localStorage.removeItem(item);
    });

    // COMPREHENSIVE: Scan for dynamic keys and patterns
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        // Check for pattern-based keys that contain user data
        if (
          key.startsWith('grammar_progress_') ||
          key.startsWith('module_') ||
          key.startsWith('lesson_') ||
          key.startsWith('user_') ||
          key.startsWith('profile_') ||
          key.startsWith('achievement_') ||
          key.startsWith('badge_') ||
          key.startsWith('streak_') ||
          key.startsWith('xp_') ||
          key.startsWith('level_') ||
          key.includes('bookmark') ||
          key.includes('progress') ||
          key.includes('completion') ||
          key.includes('score') ||
          key.includes('stats')
        ) {
          keysToRemove.push(key);
        }
      }
    }

    // Remove pattern-matched keys
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      console.log(`[DataService] Removed dynamic key: ${key}`);
    });

    // Clear all session storage (contains locks and temporary data)
    sessionStorage.clear();

    // Clear any profile creation locks that might be in sessionStorage
    const sessionKeys = Object.keys(sessionStorage);
    sessionKeys.forEach(key => {
      if (key.includes('profile_creation_lock') || key.includes('save_lock')) {
        sessionStorage.removeItem(key);
      }
    });

    console.log(`[DataService] Cleared ${knownItems.length} known items and ${keysToRemove.length} dynamic items`);
  }
}

export const dataService = new DataService();