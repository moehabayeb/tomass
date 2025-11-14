// User Data Hook - Thin wrapper around Zustand store (Bug #2 fix)
import { useEffect } from 'react';
import { useProgressStore } from '@/hooks/useProgressStore';
import { useAuthReady } from '@/hooks/useAuthReady';

/**
 * Thin wrapper around useProgressStore for backward compatibility
 * All state now lives in Zustand store (single source of truth)
 */
export const useUserData = () => {
  const { user, isAuthenticated } = useAuthReady();

  // Get all state and actions from Zustand store
  const {
    userId,
    name,
    soundEnabled,
    level,
    xp_current,
    xp_total,
    currentStreak,
    bestStreak,
    lastVisitDate,
    user_level,
    isLoading,
    fetchProgress,
    updateProfile,
    logout,
  } = useProgressStore();

  // Load user data when auth state changes
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchProgress();
    } else {
      // User logged out - handled by logout() call from auth context
    }
  }, [user, isAuthenticated, fetchProgress]);

  // Return compatible interface (maps new store to old interface)
  return {
    userProfile: userId
      ? {
          userId,
          name,
          level,
          xp: xp_current, // Map xp_current to old 'xp' field
          currentStreak,
          bestStreak,
          lastVisitDate,
          userLevel: user_level,
          soundEnabled,
        }
      : null,
    isLoading,
    updateProfile: async (updates: any) => {
      // Map old interface to new store format
      const storeUpdates = {
        name: updates.name,
        soundEnabled: updates.soundEnabled,
        currentStreak: updates.currentStreak,
        bestStreak: updates.bestStreak,
        lastVisitDate: updates.lastVisitDate,
      };
      return await updateProfile(storeUpdates);
    },
    logout,
    refreshData: fetchProgress,
  };
};

// Export type for compatibility
export type { UserProfileState as UserProfileData } from '@/hooks/useProgressStore';
