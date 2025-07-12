// User Data Hook - Prepares for easy Supabase Auth integration
// This hook will make it easy to switch from localStorage to Supabase when auth is added

import { useState, useEffect } from 'react';
import { dataService, UserProfileData } from '@/services/dataService';

export const useUserData = () => {
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data on mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      // TODO: Get userId from auth context when implemented
      const userId = undefined; // Will be: auth.user?.id
      
      const profile = await dataService.getUserProfile(userId);
      
      if (profile) {
        setUserProfile(profile);
      } else {
        // Create default profile for new user
        const defaultProfile: UserProfileData = {
          name: 'Tomas Hoca',
          level: 5,
          xp: 230,
          currentStreak: 1,
          bestStreak: 1,
          lastVisitDate: new Date().toDateString(),
          userLevel: 'beginner',
          soundEnabled: true
        };
        
        await dataService.saveUserProfile(defaultProfile);
        setUserProfile(defaultProfile);
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
      // TODO: Call supabase.auth.signOut() when auth is implemented
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