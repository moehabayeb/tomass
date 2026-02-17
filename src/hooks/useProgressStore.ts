import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ProgressState {
  level: number;
  xp_current: number;
  xp_total: number;
  next_threshold: number;
  user_level: 'beginner' | 'intermediate' | 'advanced';
  isLoading: boolean;
  lastLevelUpTime?: number;
}

interface ProgressStore extends ProgressState {
  // Actions
  setProgress: (progress: Partial<ProgressState>) => void;
  fetchProgress: () => Promise<void>;
  awardXp: (points: number) => Promise<boolean>;
  resetLevelUpNotification: () => void;
  
  // Realtime subscription
  subscribeToProgress: (userId: string) => () => void;
}

// Utility function to calculate XP threshold (matches database function)
export const getXpThreshold = (level: number): number => {
  return (level * 100) + ((level - 1) * 50);
};

export const useProgressStore = create<ProgressStore>((set, get) => ({
  // Initial state
  level: 1,
  xp_current: 0,
  xp_total: 0,
  next_threshold: 150, // Level 2 threshold
  user_level: 'beginner',
  isLoading: false,
  lastLevelUpTime: undefined,

  // Set progress data
  setProgress: (progress) => {
    set((state) => ({ ...state, ...progress }));
  },

  // Fetch user progress from database
  fetchProgress: async () => {
    set({ isLoading: true });
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        set({ isLoading: false });
        return;
      }

      const { data, error } = await supabase
        .from('user_profiles')
        .select('level, xp_current, xp_total, user_level')
        .eq('user_id', user.id)
        .single();

      if (error) {
        set({ isLoading: false });
        return;
      }

      if (data) {
        const next_threshold = getXpThreshold(data.level + 1);

        set({
          level: data.level,
          xp_current: data.xp_current,
          xp_total: data.xp_total,
          user_level: data.user_level as 'beginner' | 'intermediate' | 'advanced',
          next_threshold,
          isLoading: false,
        });
      }
    } catch (error) {
      set({ isLoading: false });
    }
  },

  // Award XP with atomic database update
  awardXp: async (points: number): Promise<boolean> => {
    try {
      
      const { data, error } = await supabase.functions.invoke('award-xp', {
        body: { points }
      });

      if (error || !data) {
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
      return false;
    }
  },

  // Reset level up notification
  resetLevelUpNotification: () => {
    set({ lastLevelUpTime: undefined });
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
            const { level, xp_current, xp_total, user_level } = payload.new as any;
            const next_threshold = getXpThreshold(level + 1);

            set({
              level,
              xp_current,
              xp_total,
              user_level: user_level as 'beginner' | 'intermediate' | 'advanced',
              next_threshold,
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
}));