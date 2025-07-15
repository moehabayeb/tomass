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
  dailyTipsViewed: number;
  bookmarksSaved: number;
  earlyRiserCount: number;
  partyModeUnlocked: boolean;
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
    completedModules: 0,
    dailyTipsViewed: 0,
    bookmarksSaved: 0,
    earlyRiserCount: 0,
    partyModeUnlocked: false
  });

  // Initialize badges with complete set
  useEffect(() => {
    const initialBadges: Badge[] = [
      {
        id: 'streak_starter',
        name: 'Streak Starter',
        description: 'Complete 3 days in a row',
        icon: '🔥',
        condition: 'Complete 3 days in a row',
        unlocked: false
      },
      {
        id: 'grammar_hero',
        name: 'Grammar Hero',
        description: 'Finish all modules in a grammar level',
        icon: '🧠',
        condition: 'Complete all A1 grammar modules',
        unlocked: false
      },
      {
        id: 'speaking_pro',
        name: 'Speaking Pro',
        description: 'Complete 10 Speaking practices',
        icon: '🎤',
        condition: 'Complete 10 speaking practices',
        unlocked: false
      },
      {
        id: 'daily_learner',
        name: 'Daily Learner',
        description: 'View 7 Daily Tips',
        icon: '📚',
        condition: 'View 7 daily tips',
        unlocked: false
      },
      {
        id: 'early_riser',
        name: 'Early Riser',
        description: 'Open the app before 9AM 3 times',
        icon: '✨',
        condition: 'Open app before 9AM 3 times',
        unlocked: false
      },
      {
        id: 'bookmark_master',
        name: 'Bookmark Master',
        description: 'Save 5 helpful messages',
        icon: '💾',
        condition: 'Save 5 bookmarks',
        unlocked: false
      },
      {
        id: 'level_up',
        name: 'Level Up',
        description: 'Reach XP Level 10',
        icon: '📈',
        condition: 'Reach Level 10',
        unlocked: false
      },
      {
        id: 'party_master',
        name: 'Party Master',
        description: 'Unlock Party Mode',
        icon: '👑',
        condition: 'Unlock Party Mode feature',
        unlocked: false
      },
      // Legacy badges for existing users
      {
        id: 'first_lesson',
        name: 'First Steps',
        description: 'Completed your first lesson',
        icon: '🎉',
        condition: 'Complete your first lesson',
        unlocked: false
      }
    ];

    // Load saved badges from localStorage
    const savedBadges = localStorage.getItem('user_badges');
    if (savedBadges) {
      const parsed = JSON.parse(savedBadges);
      // Merge with new badges for existing users
      const mergedBadges = initialBadges.map(newBadge => {
        const existingBadge = parsed.find((b: Badge) => b.id === newBadge.id);
        return existingBadge || newBadge;
      });
      setBadges(mergedBadges);
    } else {
      setBadges(initialBadges);
    }

    // Load badge progress
    const savedProgress = localStorage.getItem('badge_progress');
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      setBadgeProgress({
        grammarLessonsCompleted: parsed.grammarLessonsCompleted || 0,
        speakingSubmissions: parsed.speakingSubmissions || 0,
        totalExercises: parsed.totalExercises || 0,
        currentLevel: parsed.currentLevel || 1,
        currentStreak: parsed.currentStreak || 0,
        completedModules: parsed.completedModules || 0,
        dailyTipsViewed: parsed.dailyTipsViewed || 0,
        bookmarksSaved: parsed.bookmarksSaved || 0,
        earlyRiserCount: parsed.earlyRiserCount || 0,
        partyModeUnlocked: parsed.partyModeUnlocked || false
      });
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

  // Update progress based on user profile and localStorage
  useEffect(() => {
    if (userProfile) {
      const currentStreak = parseInt(localStorage.getItem('currentStreak') || '0');
      const totalExercises = parseInt(localStorage.getItem('totalExercises') || '0');
      const grammarLessons = parseInt(localStorage.getItem('grammarLessonsCompleted') || '0');
      const speakingSubmissions = parseInt(localStorage.getItem('speakingSubmissions') || '0');
      const completedModules = parseInt(localStorage.getItem('completedModules') || '0');
      const dailyTipsViewed = parseInt(localStorage.getItem('dailyTipsViewed') || '0');
      const bookmarksSaved = parseInt(localStorage.getItem('bookmarksSaved') || '0');
      const earlyRiserCount = parseInt(localStorage.getItem('earlyRiserCount') || '0');
      
      setBadgeProgress(prev => ({
        ...prev,
        grammarLessonsCompleted: grammarLessons,
        speakingSubmissions: speakingSubmissions,
        totalExercises: totalExercises,
        currentLevel: userProfile.level,
        currentStreak: currentStreak,
        completedModules: completedModules,
        dailyTipsViewed: dailyTipsViewed,
        bookmarksSaved: bookmarksSaved,
        earlyRiserCount: earlyRiserCount
      }));
    }
  }, [userProfile]);

  // Check for early riser on app open
  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    const today = now.toDateString();
    const lastEarlyRiserCheck = localStorage.getItem('lastEarlyRiserCheck');
    
    if (hour < 9 && lastEarlyRiserCheck !== today) {
      localStorage.setItem('lastEarlyRiserCheck', today);
      incrementEarlyRiser();
    }
  }, []);

  // Check and unlock badges
  useEffect(() => {
    const updatedBadges = badges.map(badge => {
      if (badge.unlocked) return badge;

      let shouldUnlock = false;

      switch (badge.id) {
        case 'streak_starter':
          shouldUnlock = badgeProgress.currentStreak >= 3;
          break;
        case 'grammar_hero':
          shouldUnlock = badgeProgress.completedModules >= 5; // All A1 modules
          break;
        case 'speaking_pro':
          shouldUnlock = badgeProgress.speakingSubmissions >= 10;
          break;
        case 'daily_learner':
          shouldUnlock = badgeProgress.dailyTipsViewed >= 7;
          break;
        case 'early_riser':
          shouldUnlock = badgeProgress.earlyRiserCount >= 3;
          break;
        case 'bookmark_master':
          shouldUnlock = badgeProgress.bookmarksSaved >= 5;
          break;
        case 'level_up':
          shouldUnlock = badgeProgress.currentLevel >= 10;
          break;
        case 'party_master':
          shouldUnlock = badgeProgress.partyModeUnlocked;
          break;
        case 'first_lesson':
          shouldUnlock = badgeProgress.grammarLessonsCompleted >= 1 || badgeProgress.totalExercises >= 1;
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

    if (JSON.stringify(updatedBadges) !== JSON.stringify(badges)) {
      setBadges(updatedBadges);
      localStorage.setItem('user_badges', JSON.stringify(updatedBadges));
    }
    localStorage.setItem('badge_progress', JSON.stringify(badgeProgress));
  }, [badgeProgress, badges]);

  // Update unlockable features based on level
  useEffect(() => {
    const updatedFeatures = unlockableFeatures.map(feature => {
      const wasUnlocked = feature.unlocked;
      const isNowUnlocked = badgeProgress.currentLevel >= feature.unlockLevel;
      
      // If party mode just unlocked, update badge progress
      if (feature.id === 'party_mode' && !wasUnlocked && isNowUnlocked) {
        setBadgeProgress(prev => ({ ...prev, partyModeUnlocked: true }));
      }
      
      return {
        ...feature,
        unlocked: isNowUnlocked
      };
    });
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

  const incrementDailyTips = () => {
    const newCount = badgeProgress.dailyTipsViewed + 1;
    localStorage.setItem('dailyTipsViewed', newCount.toString());
    setBadgeProgress(prev => ({ ...prev, dailyTipsViewed: newCount }));
  };

  const incrementBookmarks = () => {
    const newCount = badgeProgress.bookmarksSaved + 1;
    localStorage.setItem('bookmarksSaved', newCount.toString());
    setBadgeProgress(prev => ({ ...prev, bookmarksSaved: newCount }));
  };

  const incrementEarlyRiser = () => {
    const newCount = badgeProgress.earlyRiserCount + 1;
    localStorage.setItem('earlyRiserCount', newCount.toString());
    setBadgeProgress(prev => ({ ...prev, earlyRiserCount: newCount }));
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
    incrementDailyTips,
    incrementBookmarks,
    incrementEarlyRiser,
    closeBadgeNotification,
    getFeatureProgress
  };
};