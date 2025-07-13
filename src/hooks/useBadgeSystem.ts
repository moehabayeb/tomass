import { useState, useEffect } from 'react';
import { useUserData } from './useUserData';
import { toast } from '@/hooks/use-toast';

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
  speakingSubmissions: number;
  totalExercises: number;
  currentLevel: number;
  currentStreak: number;
  completedModules: number;
}

export const useBadgeSystem = () => {
  const { userProfile } = useUserData();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [unlockableFeatures, setUnlockableFeatures] = useState<UnlockableFeature[]>([]);
  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<Badge | null>(null);
  const [badgeProgress, setBadgeProgress] = useState<BadgeProgress>({
    grammarLessonsCompleted: 0,
    speakingSubmissions: 0,
    totalExercises: 0,
    currentLevel: 1,
    currentStreak: 0,
    completedModules: 0
  });

  // Initialize badges
  useEffect(() => {
    const initialBadges: Badge[] = [
      {
        id: 'first_lesson',
        name: 'First Lesson',
        description: 'Completed your first lesson',
        icon: '🎉',
        condition: 'Complete your first lesson',
        unlocked: false
      },
      {
        id: 'a1_master',
        name: 'A1 Master',
        description: 'Completed all A1 grammar lessons',
        icon: '🎓',
        condition: 'Complete all A1 grammar lessons',
        unlocked: false
      },
      {
        id: 'three_day_streak',
        name: '3-Day Streak',
        description: 'Maintained a 3-day daily streak',
        icon: '🔥',
        condition: 'Reach 3-day streak',
        unlocked: false
      },
      {
        id: 'level_5_achieved',
        name: 'Level 5 Achieved',
        description: 'Reached Level 5',
        icon: '💪',
        condition: 'Reach Level 5',
        unlocked: false
      },
      {
        id: 'grammar_guru',
        name: 'Grammar Guru',
        description: 'Completed all grammar modules in A1',
        icon: '📘',
        condition: 'Complete all A1 modules',
        unlocked: false
      },
      {
        id: 'speaking_champ',
        name: 'Speaking Champ',
        description: 'Completed 10 speaking submissions',
        icon: '🎤',
        condition: 'Complete 10 speaking submissions',
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
      const speakingSubmissions = parseInt(localStorage.getItem('speakingSubmissions') || '0');
      const completedModules = parseInt(localStorage.getItem('completedModules') || '0');
      
      setBadgeProgress({
        grammarLessonsCompleted: grammarLessons,
        speakingSubmissions: speakingSubmissions,
        totalExercises: totalExercises,
        currentLevel: userProfile.level,
        currentStreak: currentStreak,
        completedModules: completedModules
      });
    }
  }, [userProfile]);

  // Check and unlock badges
  useEffect(() => {
    const updatedBadges = badges.map(badge => {
      if (badge.unlocked) return badge;

      let shouldUnlock = false;

      switch (badge.id) {
        case 'first_lesson':
          shouldUnlock = badgeProgress.grammarLessonsCompleted >= 1 || badgeProgress.totalExercises >= 1;
          break;
        case 'a1_master':
          shouldUnlock = badgeProgress.grammarLessonsCompleted >= 10;
          break;
        case 'three_day_streak':
          shouldUnlock = badgeProgress.currentStreak >= 3;
          break;
        case 'level_5_achieved':
          shouldUnlock = badgeProgress.currentLevel >= 5;
          break;
        case 'grammar_guru':
          shouldUnlock = badgeProgress.completedModules >= 5; // All A1 modules
          break;
        case 'speaking_champ':
          shouldUnlock = badgeProgress.speakingSubmissions >= 10;
          break;
      }

      if (shouldUnlock) {
        const unlockedBadge = { ...badge, unlocked: true, unlockedAt: new Date() };
        
        // Show toast notification
        toast({
          title: "🏅 Badge Unlocked!",
          description: `You earned the "${badge.name}" badge!`,
          duration: 4000,
        });
        
        setNewlyUnlockedBadge(unlockedBadge);
        return unlockedBadge;
      }

      return badge;
    });

    setBadges(updatedBadges);
    localStorage.setItem('user_badges', JSON.stringify(updatedBadges));
    localStorage.setItem('badge_progress', JSON.stringify(badgeProgress));
  }, [badgeProgress, badges]);

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

  const incrementSpeakingSubmissions = () => {
    const newCount = badgeProgress.speakingSubmissions + 1;
    localStorage.setItem('speakingSubmissions', newCount.toString());
    setBadgeProgress(prev => ({ ...prev, speakingSubmissions: newCount }));
  };

  const incrementCompletedModules = () => {
    const newCount = badgeProgress.completedModules + 1;
    localStorage.setItem('completedModules', newCount.toString());
    setBadgeProgress(prev => ({ ...prev, completedModules: newCount }));
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
    incrementSpeakingSubmissions,
    incrementCompletedModules,
    closeBadgeNotification,
    getFeatureProgress
  };
};