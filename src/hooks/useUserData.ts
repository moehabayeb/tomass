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
      
      const profile = await dataService.getUserProfile(userId);
      
      if (profile) {
        setUserProfile(profile);
      } else if (userId) {
        // Create default profile for new authenticated user
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
        
        await dataService.saveUserProfile(defaultProfile);
        setUserProfile(defaultProfile);
      }
    } catch (error) {
      // Apple Store Compliance: Silent fail - Non-critical operation
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
      // Apple Store Compliance: Silent fail - Non-critical operation
    }
  };

  const logout = async () => {
    try {
      await dataService.clearUserData();
      setUserProfile(null);
    } catch (error) {
      // Apple Store Compliance: Silent fail - Non-critical operation
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