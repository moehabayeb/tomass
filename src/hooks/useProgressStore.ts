import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Sentry } from '@/lib/sentry';

/**
 * Database row interface (snake_case from Supabase)
 * Bug #13 Fix: Type safety for realtime updates
 */
interface UserProfileRow {
  user_id: string;
  name: string;
  sound_enabled: boolean;
  level: number;
  xp_current: number;
  xp_total: number;
  user_level: 'beginner' | 'intermediate' | 'advanced';
  current_streak: number;
  best_streak: number;
  last_visit_date: string;
  profile_version: number;
}

/**
 * Consolidated User Profile & Progress State
 * Single source of truth for all user data
 */
export interface UserProfileState {
  // Authentication
  userId: string | null;

  // Profile Info
  name: string;
  soundEnabled: boolean;

  // XP & Level System
  level: number;
  xp_current: number;
  xp_total: number;
  next_threshold: number;
  user_level: 'beginner' | 'intermediate' | 'advanced';

  // Streaks
  currentStreak: number;
  bestStreak: number;
  lastVisitDate: string;

  // UI State
  isLoading: boolean;
  lastLevelUpTime?: number;
  profileVersion: number; // For optimistic locking (Bug #3 fix)
}

interface UserProfileStore extends UserProfileState {
  // Progress Actions
  setProgress: (progress: Partial<UserProfileState>) => void;
  fetchProgress: () => Promise<void>;
  awardXp: (points: number) => Promise<boolean>;
  resetLevelUpNotification: () => void;

  // Profile Actions
  updateProfile: (updates: Partial<UserProfileState>) => Promise<boolean>;
  initializeUser: (userId: string) => Promise<void>;
  logout: () => void;

  // Realtime subscription
  subscribeToProgress: (userId: string) => () => void;
}

// Utility function to calculate XP threshold (matches database function)
export const getXpThreshold = (level: number): number => {
  return (level * 100) + ((level - 1) * 50);
};

/**
 * Consolidated User Profile Store
 * Persists to localStorage and syncs with Supabase
 */
export const useProgressStore = create<UserProfileStore>()(
  persist(
    (set, get) => ({
      // Initial state - Guest/Default values
      userId: null,
      name: 'Student',
      soundEnabled: true,
      level: 1,
      xp_current: 0,
      xp_total: 0,
      next_threshold: 150, // Level 2 threshold
      user_level: 'beginner',
      currentStreak: 0,
      bestStreak: 0,
      lastVisitDate: '',
      isLoading: false,
      lastLevelUpTime: undefined,
      profileVersion: 0,

      // Set progress data
      setProgress: (progress) => {
        set((state) => ({ ...state, ...progress }));
      },

      // Fetch complete user profile from database
      fetchProgress: async () => {
        set({ isLoading: true });

        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) {
            set({ isLoading: false });
            return;
          }

          // Fetch complete profile
          const { data, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();

          if (error) {
            // Profile doesn't exist - create default
            await get().initializeUser(user.id);
            return;
          }

          if (data) {
            const next_threshold = getXpThreshold(data.level + 1);

            set({
              userId: data.user_id,
              name: data.name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Student',
              soundEnabled: data.sound_enabled !== false,
              level: data.level,
              xp_current: data.xp_current,
              xp_total: data.xp_total,
              user_level: data.user_level as 'beginner' | 'intermediate' | 'advanced',
              next_threshold,
              currentStreak: data.current_streak || 0,
              bestStreak: data.best_streak || 0,
              lastVisitDate: data.last_visit_date || '',
              profileVersion: data.profile_version || 0,
              isLoading: false,
            });
          }
        } catch (error) {
          // Bug #12 Fix: Log to Sentry while maintaining silent UX
          Sentry.captureException(error, {
            tags: { function: 'fetchProgress' },
            extra: { userId: get().userId },
          });
          // Apple Store Compliance: Silent fail - no user-facing error
          set({ isLoading: false });
        }
      },

  // Award XP with atomic database update
  awardXp: async (points: number): Promise<boolean> => {
    try {
      
      const { data, error } = await supabase.functions.invoke('award-xp', {
        body: { points }
      });

      if (error) {
        return false;
      }

      // Update store state with the returned data (includes user_level now)
      const wasLevelUp = data.level_up_occurred;

      set({
        level: data.level,
        xp_current: data.xp_current,
        xp_total: data.xp_total,
        next_threshold: data.next_threshold,
        user_level: data.user_level as 'beginner' | 'intermediate' | 'advanced',
        lastLevelUpTime: wasLevelUp ? Date.now() : get().lastLevelUpTime,
      });

      return true;
    } catch (error) {
      // Bug #12 Fix: Log XP award failures to Sentry
      Sentry.captureException(error, {
        tags: { function: 'awardXp' },
        extra: { points, userId: get().userId },
      });
      return false;
    }
  },

      // Reset level up notification
      resetLevelUpNotification: () => {
        set({ lastLevelUpTime: undefined });
      },

      // Update user profile (name, soundEnabled, etc.)
      updateProfile: async (updates: Partial<UserProfileState>): Promise<boolean> => {
        const state = get();

        if (!state.userId) {
          // Guest user - only update local state
          set((current) => ({ ...current, ...updates }));
          return true;
        }

        try {
          // Optimistic update - update UI immediately
          const previousState = { ...state };
          set((current) => ({ ...current, ...updates }));

          // Sync to database
          const { error } = await supabase
            .from('user_profiles')
            .update({
              name: updates.name ?? state.name,
              sound_enabled: updates.soundEnabled ?? state.soundEnabled,
              current_streak: updates.currentStreak ?? state.currentStreak,
              best_streak: updates.bestStreak ?? state.bestStreak,
              last_visit_date: updates.lastVisitDate ?? state.lastVisitDate,
              // Increment version for optimistic locking (Bug #3 fix)
              profile_version: state.profileVersion + 1,
            })
            .eq('user_id', state.userId)
            .eq('profile_version', state.profileVersion); // Only update if version matches

          if (error) {
            // Rollback on error
            set(previousState);
            return false;
          }

          // Update version number locally
          set({ profileVersion: state.profileVersion + 1 });
          return true;
        } catch (error) {
          // Bug #12 Fix: Log profile update failures to Sentry
          Sentry.captureException(error, {
            tags: { function: 'updateProfile' },
            extra: { updates, userId: state.userId },
          });
          // Apple Store Compliance: Silent fail - no user-facing error
          return false;
        }
      },

      // Initialize user profile for new authenticated users
      initializeUser: async (userId: string): Promise<void> => {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return;

          const defaultProfile = {
            user_id: userId,
            name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Student',
            level: 1,
            xp_current: 0,
            xp_total: 0,
            user_level: 'beginner' as const,
            current_streak: 0,
            best_streak: 0,
            last_visit_date: new Date().toISOString(),
            sound_enabled: true,
            profile_version: 0,
          };

          const { error } = await supabase
            .from('user_profiles')
            .insert(defaultProfile);

          if (!error) {
            set({
              userId: userId,
              name: defaultProfile.name,
              soundEnabled: true,
              level: 1,
              xp_current: 0,
              xp_total: 0,
              next_threshold: 150,
              user_level: 'beginner',
              currentStreak: 0,
              bestStreak: 0,
              lastVisitDate: defaultProfile.last_visit_date,
              profileVersion: 0,
              isLoading: false,
            });
          }
        } catch (error) {
          // Bug #12 Fix: Log user initialization failures to Sentry
          Sentry.captureException(error, {
            tags: { function: 'initializeUser' },
            extra: { userId },
          });
          // Apple Store Compliance: Silent fail - no user-facing error
          set({ isLoading: false });
        }
      },

      // Logout - reset to guest state
      logout: () => {
        set({
          userId: null,
          name: 'Student',
          soundEnabled: true,
          level: 1,
          xp_current: 0,
          xp_total: 0,
          next_threshold: 150,
          user_level: 'beginner',
          currentStreak: 0,
          bestStreak: 0,
          lastVisitDate: '',
          isLoading: false,
          lastLevelUpTime: undefined,
          profileVersion: 0,
        });
      },

      // Subscribe to realtime progress updates
      subscribeToProgress: (userId: string) => {
        const channel = supabase
          .channel('user-progress-changes')
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'user_profiles',
              filter: `user_id=eq.${userId}`,
            },
            (payload) => {
              if (payload.new) {
                // Bug #13 Fix: Type-safe realtime update
                const data = payload.new as UserProfileRow;
                const next_threshold = getXpThreshold(data.level + 1);

                // Update all profile fields from realtime update
                set({
                  userId: data.user_id,
                  name: data.name,
                  soundEnabled: data.sound_enabled !== false,
                  level: data.level,
                  xp_current: data.xp_current,
                  xp_total: data.xp_total,
                  user_level: data.user_level as 'beginner' | 'intermediate' | 'advanced',
                  next_threshold,
                  currentStreak: data.current_streak || 0,
                  bestStreak: data.best_streak || 0,
                  lastVisitDate: data.last_visit_date || '',
                  profileVersion: data.profile_version || 0,
                });
              }
            }
          )
          .subscribe();

        // Return unsubscribe function
        return () => {
          supabase.removeChannel(channel);
        };
      },
    }),
    {
      name: 'user-profile-storage', // localStorage key
      partialize: (state) => ({
        // Only persist these fields to localStorage
        userId: state.userId,
        name: state.name,
        soundEnabled: state.soundEnabled,
        level: state.level,
        xp_current: state.xp_current,
        xp_total: state.xp_total,
        next_threshold: state.next_threshold,
        user_level: state.user_level,
        currentStreak: state.currentStreak,
        bestStreak: state.bestStreak,
        lastVisitDate: state.lastVisitDate,
        profileVersion: state.profileVersion,
      }),
    }
  )
);