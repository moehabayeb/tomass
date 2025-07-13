import { useState, useEffect } from 'react';
import { useUserData } from './useUserData';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface UnlockableFeature {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockLevel: number;
  unlocked: boolean;
}

export interface BadgeProgress {
  grammarLessonsCompleted: number;
  speakingDaysStreak: number;
  totalExercises: number;
  currentLevel: number;
  currentStreak: number;
}

export const useBadgeSystem = () => {
  const { userProfile } = useUserData();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [unlockableFeatures, setUnlockableFeatures] = useState<UnlockableFeature[]>([]);
  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<Badge | null>(null);
  const [badgeProgress, setBadgeProgress] = useState<BadgeProgress>({
    grammarLessonsCompleted: 0,
    speakingDaysStreak: 0,
    totalExercises: 0,
    currentLevel: 1,
    currentStreak: 0
  });

  // Initialize badges
  useEffect(() => {
    const initialBadges: Badge[] = [
      {
        id: 'a1_master',
        name: 'A1 Master',
        description: 'Complete all A1 grammar lessons',
        icon: '📘',
        condition: 'Complete 10 grammar lessons',
        unlocked: false
      },
      {
        id: 'seven_day_speaker',
        name: '7-Day Speaker',
        description: 'Practice speaking 7 days in a row',
        icon: '🗣️',
        condition: 'Maintain 7-day speaking streak',
        unlocked: false
      },
      {
        id: 'level_up',
        name: 'Level Up!',
        description: 'Reach level 10',
        icon: '🚀',
        condition: 'Reach level 10',
        unlocked: false
      },
      {
        id: 'smart_learner',
        name: 'Smart Learner',
        description: 'Complete 50 total exercises',
        icon: '🧠',
        condition: 'Complete 50 exercises',
        unlocked: false
      },
      {
        id: 'daily_streaker',
        name: 'Daily Streaker',
        description: 'Maintain a 10-day streak',
        icon: '🎯',
        condition: 'Maintain 10-day streak',
        unlocked: false
      }
    ];

    // Load saved badges from localStorage
    const savedBadges = localStorage.getItem('user_badges');
    if (savedBadges) {
      setBadges(JSON.parse(savedBadges));
    } else {
      setBadges(initialBadges);
    }

    // Load badge progress
    const savedProgress = localStorage.getItem('badge_progress');
    if (savedProgress) {
      setBadgeProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Initialize unlockable features
  useEffect(() => {
    const features: UnlockableFeature[] = [
      {
        id: 'party_mode',
        name: 'Party Mode',
        description: 'Compete with friends in real-time',
        icon: '🎉',
        unlockLevel: 10,
        unlocked: false
      },
      {
        id: 'leaderboards',
        name: 'Leaderboards',
        description: 'See how you rank against others',
        icon: '🏆',
        unlockLevel: 15,
        unlocked: false
      }
    ];

    setUnlockableFeatures(features);
  }, []);

  // Update progress based on user profile
  useEffect(() => {
    if (userProfile) {
      const currentStreak = parseInt(localStorage.getItem('currentStreak') || '0');
      const totalExercises = parseInt(localStorage.getItem('totalExercises') || '0');
      const grammarLessons = parseInt(localStorage.getItem('grammarLessonsCompleted') || '0');
      
      setBadgeProgress({
        grammarLessonsCompleted: grammarLessons,
        speakingDaysStreak: currentStreak,
        totalExercises: totalExercises,
        currentLevel: userProfile.level,
        currentStreak: currentStreak
      });
    }
  }, [userProfile]);

  // Check and unlock badges
  useEffect(() => {
    const updatedBadges = badges.map(badge => {
      if (badge.unlocked) return badge;

      let shouldUnlock = false;

      switch (badge.id) {
        case 'a1_master':
          shouldUnlock = badgeProgress.grammarLessonsCompleted >= 10;
          break;
        case 'seven_day_speaker':
          shouldUnlock = badgeProgress.speakingDaysStreak >= 7;
          break;
        case 'level_up':
          shouldUnlock = badgeProgress.currentLevel >= 10;
          break;
        case 'smart_learner':
          shouldUnlock = badgeProgress.totalExercises >= 50;
          break;
        case 'daily_streaker':
          shouldUnlock = badgeProgress.currentStreak >= 10;
          break;
      }

      if (shouldUnlock) {
        const unlockedBadge = { ...badge, unlocked: true, unlockedAt: new Date() };
        setNewlyUnlockedBadge(unlockedBadge);
        return unlockedBadge;
      }

      return badge;
    });

    setBadges(updatedBadges);
    localStorage.setItem('user_badges', JSON.stringify(updatedBadges));
  }, [badgeProgress]);

  // Update unlockable features based on level
  useEffect(() => {
    const updatedFeatures = unlockableFeatures.map(feature => ({
      ...feature,
      unlocked: badgeProgress.currentLevel >= feature.unlockLevel
    }));
    setUnlockableFeatures(updatedFeatures);
  }, [badgeProgress.currentLevel, unlockableFeatures]);

  const incrementGrammarLessons = () => {
    const newCount = badgeProgress.grammarLessonsCompleted + 1;
    localStorage.setItem('grammarLessonsCompleted', newCount.toString());
    setBadgeProgress(prev => ({ ...prev, grammarLessonsCompleted: newCount }));
  };

  const incrementTotalExercises = () => {
    const newCount = badgeProgress.totalExercises + 1;
    localStorage.setItem('totalExercises', newCount.toString());
    setBadgeProgress(prev => ({ ...prev, totalExercises: newCount }));
  };

  const closeBadgeNotification = () => {
    setNewlyUnlockedBadge(null);
  };

  const getFeatureProgress = (featureId: string) => {
    const feature = unlockableFeatures.find(f => f.id === featureId);
    if (!feature) return '';

    const currentLevel = badgeProgress.currentLevel;
    const levelsToGo = feature.unlockLevel - currentLevel;

    if (feature.unlocked) return 'Unlocked!';
    if (levelsToGo === 1) return `1 level to unlock!`;
    return `${levelsToGo} levels to unlock!`;
  };

  return {
    badges,
    unlockableFeatures,
    newlyUnlockedBadge,
    badgeProgress,
    incrementGrammarLessons,
    incrementTotalExercises,
    closeBadgeNotification,
    getFeatureProgress
  };
};