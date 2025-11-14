import { useState, useEffect, useCallback, useRef } from 'react';
import { useUserData } from './useUserData';
import { toast } from '@/hooks/use-toast';
import { BADGE_THRESHOLDS } from './useBadgeProgress';

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

// 🔧 FIX BUG #14: Safe localStorage wrapper with error handling
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      // Apple Store Compliance: Silent operation
      return null;
    }
  },
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      // 🔧 FIX BUG #4: Handle quota exceeded
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        // Apple Store Compliance: Silent operation - quota exceeded, clearing old data
        // Try to free up space by removing old notification data
        try {
          localStorage.removeItem('meeting_notifications_shown');
          localStorage.setItem(key, value);
          return true;
        } catch (retryError) {
          // Apple Store Compliance: Silent operation
          return false;
        }
      }
      // Apple Store Compliance: Silent operation
      return false;
    }
  },
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      // Apple Store Compliance: Silent operation
    }
  }
};

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

  // 🔧 FIX BUG #9: Track which badges were already shown to prevent spam
  const shownBadgeIds = useRef<Set<string>>(new Set());

  // 🔧 FIX BUG #8: Use ref to track if we're currently updating badges
  const isUpdatingBadges = useRef(false);

  // 🔧 FIX BUG #10: Use ref to batch progress updates
  const pendingProgressUpdates = useRef<Partial<BadgeProgress>>({});
  const updateTimeout = useRef<NodeJS.Timeout | null>(null);

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

    // 🔧 FIX BUG #14: Safely load and validate badges from localStorage
    const savedBadges = safeLocalStorage.getItem('user_badges');
    if (savedBadges) {
      try {
        const parsed = JSON.parse(savedBadges);

        // Phase 1.3: Define type guard for parsed badge validation
        interface ParsedBadge {
          id: string;
          unlocked?: boolean;
          unlockedAt?: Date | string;
          [key: string]: unknown;
        }

        const isParsedBadge = (b: unknown): b is ParsedBadge => {
          return typeof b === 'object' &&
                 b !== null &&
                 'id' in b &&
                 typeof (b as ParsedBadge).id === 'string';
        };

        // Validate structure
        if (Array.isArray(parsed)) {
          // Merge with new badges for existing users
          const mergedBadges = initialBadges.map(newBadge => {
            const existingBadge = parsed.find((b: unknown): b is ParsedBadge =>
              isParsedBadge(b) && b.id === newBadge.id
            );
            return existingBadge || newBadge;
          });
          setBadges(mergedBadges);
          return;
        }
      } catch (error) {
        // Apple Store Compliance: Silent operation
      }
    }

    setBadges(initialBadges);
  }, []);

  // Initialize unlockable features (only once)
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

  // Load badge progress from localStorage
  useEffect(() => {
    const savedProgress = safeLocalStorage.getItem('badge_progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);

        // 🔧 FIX BUG #19: Validate all numeric values are non-negative
        const validatedProgress = {
          grammarLessonsCompleted: Math.max(0, parsed.grammarLessonsCompleted || 0),
          speakingSubmissions: Math.max(0, parsed.speakingSubmissions || 0),
          totalExercises: Math.max(0, parsed.totalExercises || 0),
          currentLevel: Math.max(1, parsed.currentLevel || 1),
          currentStreak: Math.max(0, parsed.currentStreak || 0),
          completedModules: Math.max(0, parsed.completedModules || 0),
          dailyTipsViewed: Math.max(0, parsed.dailyTipsViewed || 0),
          bookmarksSaved: Math.max(0, parsed.bookmarksSaved || 0),
          earlyRiserCount: Math.max(0, parsed.earlyRiserCount || 0),
          partyModeUnlocked: Boolean(parsed.partyModeUnlocked)
        };

        setBadgeProgress(validatedProgress);
      } catch (error) {
        // Apple Store Compliance: Silent operation
      }
    }
  }, []);

  // 🔧 FIX BUG #13: Sync with userProfile when it changes
  useEffect(() => {
    if (userProfile?.level) {
      setBadgeProgress(prev => ({
        ...prev,
        currentLevel: Math.max(1, userProfile.level)
      }));
    }
  }, [userProfile?.level]);

  // 🔧 FIX BUG #12: Early riser check only once per day with proper dependency
  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    const today = now.toDateString();
    const lastEarlyRiserCheck = safeLocalStorage.getItem('lastEarlyRiserCheck');

    if (hour < 9 && lastEarlyRiserCheck !== today) {
      safeLocalStorage.setItem('lastEarlyRiserCheck', today);
      incrementEarlyRiser();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Phase 1.5: Cleanup timer on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (updateTimeout.current) {
        clearTimeout(updateTimeout.current);
        updateTimeout.current = null;
      }
    };
  }, []);

  // 🔧 FIX BUG #8 & #11: Check badges without triggering infinite loop
  const checkBadgeUnlocks = useCallback((progress: BadgeProgress, currentBadges: Badge[]) => {
    if (isUpdatingBadges.current) return currentBadges;

    isUpdatingBadges.current = true;

    const updatedBadges = currentBadges.map(badge => {
      if (badge.unlocked) return badge;

      let shouldUnlock = false;

      // Phase 3.1: Use constants for badge thresholds
      switch (badge.id) {
        case 'streak_starter':
          shouldUnlock = progress.currentStreak >= BADGE_THRESHOLDS.STREAK_STARTER;
          break;
        case 'grammar_hero':
          shouldUnlock = progress.completedModules >= BADGE_THRESHOLDS.GRAMMAR_HERO;
          break;
        case 'speaking_pro':
          shouldUnlock = progress.speakingSubmissions >= BADGE_THRESHOLDS.SPEAKING_PRO;
          break;
        case 'daily_learner':
          shouldUnlock = progress.dailyTipsViewed >= BADGE_THRESHOLDS.DAILY_LEARNER;
          break;
        case 'early_riser':
          shouldUnlock = progress.earlyRiserCount >= BADGE_THRESHOLDS.EARLY_RISER;
          break;
        case 'bookmark_master':
          shouldUnlock = progress.bookmarksSaved >= BADGE_THRESHOLDS.BOOKMARK_MASTER;
          break;
        case 'level_up':
          shouldUnlock = progress.currentLevel >= BADGE_THRESHOLDS.LEVEL_UP;
          break;
        case 'party_master':
          shouldUnlock = progress.partyModeUnlocked;
          break;
        case 'first_lesson':
          shouldUnlock = progress.grammarLessonsCompleted >= BADGE_THRESHOLDS.FIRST_LESSON || progress.totalExercises >= BADGE_THRESHOLDS.FIRST_LESSON;
          break;
      }

      if (shouldUnlock) {
        const unlockedBadge = { ...badge, unlocked: true, unlockedAt: new Date() };

        // 🔧 FIX BUG #9: Only show toast for newly unlocked badges
        if (!shownBadgeIds.current.has(badge.id)) {
          shownBadgeIds.current.add(badge.id);

          // Phase 3.2: Enhanced toast with badge description for better UX
          toast({
            title: "🏅 Badge Unlocked!",
            description: `You earned "${badge.name}" - ${badge.description}`,
            duration: 4000,
          });

          setNewlyUnlockedBadge(unlockedBadge);
        }

        return unlockedBadge;
      }

      return badge;
    });

    isUpdatingBadges.current = false;
    return updatedBadges;
  }, []);

  // Check badges when progress changes
  useEffect(() => {
    // Phase 1.4: Use functional setState to avoid race conditions
    setBadges(currentBadges => {
      const updatedBadges = checkBadgeUnlocks(badgeProgress, currentBadges);

      // Only update if actually changed
      const hasChanges = updatedBadges.some((badge, idx) =>
        badge.unlocked !== currentBadges[idx]?.unlocked
      );

      if (hasChanges) {
        safeLocalStorage.setItem('user_badges', JSON.stringify(updatedBadges));
        return updatedBadges;
      }

      return currentBadges;
    });

    // Always save progress
    safeLocalStorage.setItem('badge_progress', JSON.stringify(badgeProgress));
  }, [badgeProgress, checkBadgeUnlocks]);

  // 🔧 FIX BUG #11: Update features without infinite loop
  useEffect(() => {
    setUnlockableFeatures(prev => {
      const updated = prev.map(feature => {
        const wasUnlocked = feature.unlocked;
        const isNowUnlocked = badgeProgress.currentLevel >= feature.unlockLevel;

        // If party mode just unlocked, update badge progress
        if (feature.id === 'party_mode' && !wasUnlocked && isNowUnlocked) {
          // Use callback form to avoid race condition
          setBadgeProgress(current => ({ ...current, partyModeUnlocked: true }));
        }

        return {
          ...feature,
          unlocked: isNowUnlocked
        };
      });

      // Only return new array if something actually changed
      const hasChanges = updated.some((f, idx) => f.unlocked !== prev[idx].unlocked);
      return hasChanges ? updated : prev;
    });
  }, [badgeProgress.currentLevel]); // Only depend on level, not the full array

  // 🔧 FIX BUG #10: Batch progress updates to prevent race conditions
  const batchProgressUpdate = useCallback((updates: Partial<BadgeProgress>) => {
    // Accumulate updates
    pendingProgressUpdates.current = {
      ...pendingProgressUpdates.current,
      ...updates
    };

    // Clear existing timeout
    if (updateTimeout.current) {
      clearTimeout(updateTimeout.current);
    }

    // Batch updates after a short delay
    updateTimeout.current = setTimeout(() => {
      const updates = pendingProgressUpdates.current;
      pendingProgressUpdates.current = {};

      setBadgeProgress(prev => {
        const newProgress = { ...prev, ...updates };

        // Save each individual counter to localStorage for persistence
        Object.entries(updates).forEach(([key, value]) => {
          if (key !== 'partyModeUnlocked') {
            safeLocalStorage.setItem(key, String(value));
          }
        });

        return newProgress;
      });
    }, 50); // 50ms debounce
  }, []);

  // 🔧 FIX BUG #10 COMPLETE: Use batched updates to prevent race conditions
  const incrementGrammarLessons = useCallback(() => {
    const currentValue = pendingProgressUpdates.current.grammarLessonsCompleted ?? badgeProgress.grammarLessonsCompleted;
    batchProgressUpdate({ grammarLessonsCompleted: currentValue + 1 });
  }, [badgeProgress.grammarLessonsCompleted, batchProgressUpdate]);

  const incrementTotalExercises = useCallback(() => {
    const currentValue = pendingProgressUpdates.current.totalExercises ?? badgeProgress.totalExercises;
    batchProgressUpdate({ totalExercises: currentValue + 1 });
  }, [badgeProgress.totalExercises, batchProgressUpdate]);

  const incrementSpeakingSubmissions = useCallback(() => {
    const currentValue = pendingProgressUpdates.current.speakingSubmissions ?? badgeProgress.speakingSubmissions;
    batchProgressUpdate({ speakingSubmissions: currentValue + 1 });
  }, [badgeProgress.speakingSubmissions, batchProgressUpdate]);

  const incrementCompletedModules = useCallback(() => {
    const currentValue = pendingProgressUpdates.current.completedModules ?? badgeProgress.completedModules;
    batchProgressUpdate({ completedModules: currentValue + 1 });
  }, [badgeProgress.completedModules, batchProgressUpdate]);

  const incrementDailyTips = useCallback(() => {
    const currentValue = pendingProgressUpdates.current.dailyTipsViewed ?? badgeProgress.dailyTipsViewed;
    batchProgressUpdate({ dailyTipsViewed: currentValue + 1 });
  }, [badgeProgress.dailyTipsViewed, batchProgressUpdate]);

  const incrementBookmarks = useCallback(() => {
    const currentValue = pendingProgressUpdates.current.bookmarksSaved ?? badgeProgress.bookmarksSaved;
    batchProgressUpdate({ bookmarksSaved: currentValue + 1 });
  }, [badgeProgress.bookmarksSaved, batchProgressUpdate]);

  // BUG #3 FIX: Add decrement function to fix badge counter desync
  const decrementBookmarks = useCallback(() => {
    const currentValue = pendingProgressUpdates.current.bookmarksSaved ?? badgeProgress.bookmarksSaved;
    // Prevent negative values
    const newValue = Math.max(0, currentValue - 1);
    batchProgressUpdate({ bookmarksSaved: newValue });
  }, [badgeProgress.bookmarksSaved, batchProgressUpdate]);

  // BUG #18 FIX: Add sync function to reconcile badge counter with actual bookmark count
  const syncBookmarks = useCallback((actualCount: number) => {
    // Validate input
    if (typeof actualCount !== 'number' || actualCount < 0 || !isFinite(actualCount)) {
      return;
    }
    batchProgressUpdate({ bookmarksSaved: actualCount });
  }, [batchProgressUpdate]);

  const incrementEarlyRiser = useCallback(() => {
    const currentValue = pendingProgressUpdates.current.earlyRiserCount ?? badgeProgress.earlyRiserCount;
    batchProgressUpdate({ earlyRiserCount: currentValue + 1 });
  }, [badgeProgress.earlyRiserCount, batchProgressUpdate]);

  const closeBadgeNotification = useCallback(() => {
    setNewlyUnlockedBadge(null);
  }, []);

  const getFeatureProgress = useCallback((featureId: string) => {
    const feature = unlockableFeatures.find(f => f.id === featureId);
    if (!feature) return '';

    const currentLevel = badgeProgress.currentLevel;
    const levelsToGo = feature.unlockLevel - currentLevel;

    if (feature.unlocked) return 'Unlocked!';
    if (levelsToGo === 1) return `1 level to unlock!`;
    return `${levelsToGo} levels to unlock!`;
  }, [unlockableFeatures, badgeProgress.currentLevel]);

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
    decrementBookmarks, // BUG #3 FIX: Export decrement function
    syncBookmarks, // BUG #18 FIX: Export sync function for validation
    incrementEarlyRiser,
    closeBadgeNotification,
    getFeatureProgress
  };
};
