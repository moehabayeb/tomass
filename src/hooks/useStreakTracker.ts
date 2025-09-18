import { useState, useEffect, useCallback } from 'react';
import { dataService, UserProfileData } from '@/services/dataService';

interface StreakData {
  currentStreak: number;
  lastVisitDate: string;
  bestStreak: number;
  lastXPRewardDay: number;
}

interface StreakReward {
  day: number;
  xp: number;
  message: string;
  showConfetti?: boolean;
}

const STREAK_REWARDS: StreakReward[] = [
  { day: 1, xp: 5, message: "Welcome back! 🔥" },
  { day: 3, xp: 15, message: "3-day streak! 🎯" },
  { day: 7, xp: 50, message: "Week warrior! 🏆", showConfetti: true },
  { day: 14, xp: 75, message: "Two weeks strong! 💪" },
  { day: 30, xp: 100, message: "Month mastery! 👑", showConfetti: true }
];

export const useStreakTracker = (
  addXP?: (points: number, activity: string) => Promise<number>,
  userProfile?: UserProfileData | null,
  updateProfile?: (updates: Partial<UserProfileData>) => Promise<void>
) => {
  // ENHANCED: Initialize from database if authenticated, else localStorage
  const [streakData, setStreakData] = useState<StreakData>(() => {
    if (userProfile) {
      console.log('[useStreakTracker] Initializing from user profile:', {
        currentStreak: userProfile.currentStreak,
        bestStreak: userProfile.bestStreak,
        lastVisitDate: userProfile.lastVisitDate
      });
      return {
        currentStreak: userProfile.currentStreak || 0,
        lastVisitDate: userProfile.lastVisitDate || '',
        bestStreak: userProfile.bestStreak || 0,
        lastXPRewardDay: 0
      };
    }

    // Fallback to localStorage for non-authenticated users
    console.log('[useStreakTracker] Falling back to localStorage');
    const saved = localStorage.getItem('streakData');
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log('[useStreakTracker] Loaded from localStorage:', parsed);
      return parsed;
    }

    console.log('[useStreakTracker] Using default streak data');
    return {
      currentStreak: 0,
      lastVisitDate: '',
      bestStreak: 0,
      lastXPRewardDay: 0
    };
  });
  
  const [streakReward, setStreakReward] = useState<StreakReward | null>(null);

  const getStreakReward = (streakDay: number): StreakReward | null => {
    return STREAK_REWARDS.find(reward => reward.day === streakDay) || null;
  };

  const updateStreak = useCallback(async () => {
    const today = new Date().toDateString();
    const saved = localStorage.getItem('streakData');
    
    let newData: StreakData;
    let rewardEarned: StreakReward | null = null;
    
    if (saved) {
      const data: StreakData = JSON.parse(saved);
      const lastVisit = new Date(data.lastVisitDate);
      const todayDate = new Date(today);
      const timeDiff = todayDate.getTime() - lastVisit.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

      if (daysDiff === 1) {
        // Consecutive day - increment streak
        const newStreak = data.currentStreak + 1;
        newData = {
          currentStreak: newStreak,
          lastVisitDate: today,
          bestStreak: Math.max(newStreak, data.bestStreak),
          lastXPRewardDay: data.lastXPRewardDay
        };
        
        // Check for streak rewards
        const reward = getStreakReward(newStreak);
        if (reward && newStreak > data.lastXPRewardDay) {
          rewardEarned = reward;
          newData.lastXPRewardDay = newStreak;
          if (addXP) {
            await addXP(reward.xp, 'streak');
          }
        }
      } else if (daysDiff === 0) {
        // Same day - keep current streak
        newData = data;
      } else {
        // Streak broken - reset to 1
        newData = {
          currentStreak: 1,
          lastVisitDate: today,
          bestStreak: data.bestStreak,
          lastXPRewardDay: 0
        };
        
        // Always give day 1 reward when starting new streak
        const day1Reward = getStreakReward(1);
        if (day1Reward && addXP) {
          rewardEarned = day1Reward;
          newData.lastXPRewardDay = 1;
          await addXP(day1Reward.xp, 'streak');
        }
      }
    } else {
      // First time user
      newData = {
        currentStreak: 1,
        lastVisitDate: today,
        bestStreak: 1,
        lastXPRewardDay: 1
      };
      
      // Give day 1 reward
      const day1Reward = getStreakReward(1);
      if (day1Reward && addXP) {
        rewardEarned = day1Reward;
        await addXP(day1Reward.xp, 'streak');
      }
    }
    
    setStreakData(newData);
    localStorage.setItem('streakData', JSON.stringify(newData));

    // ENHANCED: Save to database if authenticated user
    if (userProfile?.userId && updateProfile) {
      console.log('[useStreakTracker] Saving streak to database:', newData);
      try {
        await dataService.updateStreakData(
          userProfile.userId,
          newData.currentStreak,
          newData.bestStreak,
          newData.lastVisitDate
        );

        // Also update the local profile state
        await updateProfile({
          currentStreak: newData.currentStreak,
          bestStreak: newData.bestStreak,
          lastVisitDate: newData.lastVisitDate
        });

        console.log('[useStreakTracker] Streak saved to database successfully');
      } catch (error) {
        console.error('[useStreakTracker] Failed to save streak to database:', error);
        // Continue - don't break the flow if database save fails
      }
    }

    if (rewardEarned) {
      setStreakReward(rewardEarned);
      // Clear reward after showing it
      setTimeout(() => setStreakReward(null), 3000);
    }
  }, [addXP, userProfile, updateProfile]);

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  const getStreakMessage = () => {
    const { currentStreak } = streakData;
    if (currentStreak === 1) return "🔥 Day 1 - Great start!";
    if (currentStreak < 7) return `🔥 Day ${currentStreak} - Keep going!`;
    if (currentStreak === 7) return "🎉 Week completed! Amazing!";
    if (currentStreak < 30) return `🔥 ${currentStreak} days strong!`;
    return `👑 ${currentStreak} days - Legendary!`;
  };

  const getNextMilestone = () => {
    const { currentStreak } = streakData;
    const nextReward = STREAK_REWARDS.find(reward => reward.day > currentStreak);
    return nextReward ? {
      day: nextReward.day,
      daysLeft: nextReward.day - currentStreak,
      xp: nextReward.xp
    } : null;
  };

  return {
    streakData,
    updateStreak,
    getStreakMessage,
    getNextMilestone,
    streakReward
  };
};
