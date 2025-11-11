import { BadgeProgress } from './useBadgeSystem';

/**
 * Phase 3.1: Badge unlock thresholds as constants for maintainability
 */
export const BADGE_THRESHOLDS = {
  STREAK_STARTER: 3,
  GRAMMAR_HERO: 5,
  SPEAKING_PRO: 10,
  DAILY_LEARNER: 7,
  EARLY_RISER: 3,
  BOOKMARK_MASTER: 5,
  LEVEL_UP: 10,
  FIRST_LESSON: 1,
} as const;

/**
 * Phase 2.3: Hook to calculate badge progress text and percentage
 * Extracted from BadgesView.tsx to improve code organization
 */
export const useBadgeProgress = (badgeProgress: BadgeProgress) => {
  const getProgressText = (badgeId: string): string => {
    switch (badgeId) {
      case 'streak_starter':
        return `${Math.min(badgeProgress.currentStreak, BADGE_THRESHOLDS.STREAK_STARTER)}/${BADGE_THRESHOLDS.STREAK_STARTER} days`;
      case 'grammar_hero':
        return `${badgeProgress.completedModules}/${BADGE_THRESHOLDS.GRAMMAR_HERO} modules`;
      case 'speaking_pro':
        return `${badgeProgress.speakingSubmissions}/${BADGE_THRESHOLDS.SPEAKING_PRO} submissions`;
      case 'daily_learner':
        return `${badgeProgress.dailyTipsViewed}/${BADGE_THRESHOLDS.DAILY_LEARNER} tips`;
      case 'early_riser':
        return `${badgeProgress.earlyRiserCount}/${BADGE_THRESHOLDS.EARLY_RISER} times`;
      case 'bookmark_master':
        return `${badgeProgress.bookmarksSaved}/${BADGE_THRESHOLDS.BOOKMARK_MASTER} bookmarks`;
      case 'level_up':
        return `Level ${badgeProgress.currentLevel}/${BADGE_THRESHOLDS.LEVEL_UP}`;
      case 'party_master':
        return badgeProgress.partyModeUnlocked ? 'Unlocked!' : `Reach Level ${BADGE_THRESHOLDS.LEVEL_UP}`;
      case 'first_lesson':
        return badgeProgress.totalExercises >= BADGE_THRESHOLDS.FIRST_LESSON ? 'Completed!' : `0/${BADGE_THRESHOLDS.FIRST_LESSON} lessons`;
      default:
        return '';
    }
  };

  const getProgressPercentage = (badgeId: string): number => {
    switch (badgeId) {
      case 'streak_starter':
        return Math.min((badgeProgress.currentStreak / BADGE_THRESHOLDS.STREAK_STARTER) * 100, 100);
      case 'grammar_hero':
        return Math.min((badgeProgress.completedModules / BADGE_THRESHOLDS.GRAMMAR_HERO) * 100, 100);
      case 'speaking_pro':
        return Math.min((badgeProgress.speakingSubmissions / BADGE_THRESHOLDS.SPEAKING_PRO) * 100, 100);
      case 'daily_learner':
        return Math.min((badgeProgress.dailyTipsViewed / BADGE_THRESHOLDS.DAILY_LEARNER) * 100, 100);
      case 'early_riser':
        return Math.min((badgeProgress.earlyRiserCount / BADGE_THRESHOLDS.EARLY_RISER) * 100, 100);
      case 'bookmark_master':
        return Math.min((badgeProgress.bookmarksSaved / BADGE_THRESHOLDS.BOOKMARK_MASTER) * 100, 100);
      case 'level_up':
        return Math.min((badgeProgress.currentLevel / BADGE_THRESHOLDS.LEVEL_UP) * 100, 100);
      case 'party_master':
        return badgeProgress.partyModeUnlocked ? 100 : Math.min((badgeProgress.currentLevel / BADGE_THRESHOLDS.LEVEL_UP) * 100, 100);
      case 'first_lesson':
        return badgeProgress.totalExercises >= BADGE_THRESHOLDS.FIRST_LESSON ? 100 : 0;
      default:
        return 0;
    }
  };

  return { getProgressText, getProgressPercentage };
};
