// User Data Hook - Integrated with Supabase Auth
import { useState, useEffect } from 'react';
import { dataService, UserProfileData } from '@/services/dataService';
import { useAuthReady } from '@/hooks/useAuthReady';

export const useUserData = () => {
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuthReady();

  // Load user data when auth state changes
  useEffect(() => {
    if (isAuthenticated && user) {
      loadUserData();
    } else {
      setUserProfile(null);
      setIsLoading(false);
    }
  }, [user, isAuthenticated]);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      const userId = user?.id;

      if (!userId) {
        setUserProfile(null);
        return;
      }

      // Check if profile creation is already in progress
      const creationLockKey = `profile_creation_lock_${userId}`;
      const existingLock = sessionStorage.getItem(creationLockKey);

      if (existingLock && Date.now() - parseInt(existingLock) < 5000) {
        console.log('[useUserData] Profile creation in progress, waiting...');
        // Wait and retry
        setTimeout(() => loadUserData(), 1000);
        return;
      }

      const profile = await dataService.getUserProfile(userId);

      if (profile) {
        setUserProfile(profile);
      } else {
        // Create default profile for new authenticated user with race condition protection
        const defaultProfile: UserProfileData = {
          userId,
          name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student',
          level: 1,
          xp: 0,
          currentStreak: 0,
          bestStreak: 0,
          lastVisitDate: new Date().toDateString(),
          userLevel: 'beginner',
          soundEnabled: true
        };

        try {
          // The dataService now handles all race conditions and duplicate key errors
          await dataService.saveUserProfile(defaultProfile);
          setUserProfile(defaultProfile);
        } catch (error) {
          // Handle any remaining errors gracefully
          if (error instanceof Error && (error.message.includes('duplicate') || error.message.includes('unique constraint'))) {
            console.log('[useUserData] Profile already exists - refetching...');
            // Profile was created by another process, fetch it
            const existingProfile = await dataService.getUserProfile(userId);
            if (existingProfile) {
              setUserProfile(existingProfile);
            }
          } else {
            console.error('Error creating user profile:', error);
            // Set a minimal profile to prevent app breakage
            setUserProfile(defaultProfile);
          }
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfileData>) => {
    if (!userProfile) return;
    
    try {
      const updatedProfile = { ...userProfile, ...updates };
      await dataService.saveUserProfile(updatedProfile);
      setUserProfile(updatedProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const logout = async () => {
    try {
      await dataService.clearUserData();
      setUserProfile(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return {
    userProfile,
    isLoading,
    updateProfile,
    logout,
    refreshData: loadUserData
  };
};