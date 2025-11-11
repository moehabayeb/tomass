import { BadgeProgress } from './useBadgeSystem';

/**
 * Phase 2.3: Hook to calculate badge progress text and percentage
 * Extracted from BadgesView.tsx to improve code organization
 */
export const useBadgeProgress = (badgeProgress: BadgeProgress) => {
  const getProgressText = (badgeId: string): string => {
    switch (badgeId) {
      case 'streak_starter':
        return `${Math.min(badgeProgress.currentStreak, 3)}/3 days`;
      case 'grammar_hero':
        return `${badgeProgress.completedModules}/5 modules`;
      case 'speaking_pro':
        return `${badgeProgress.speakingSubmissions}/10 submissions`;
      case 'daily_learner':
        return `${badgeProgress.dailyTipsViewed}/7 tips`;
      case 'early_riser':
        return `${badgeProgress.earlyRiserCount}/3 times`;
      case 'bookmark_master':
        return `${badgeProgress.bookmarksSaved}/5 bookmarks`;
      case 'level_up':
        return `Level ${badgeProgress.currentLevel}/10`;
      case 'party_master':
        return badgeProgress.partyModeUnlocked ? 'Unlocked!' : 'Reach Level 10';
      case 'first_lesson':
        return badgeProgress.totalExercises >= 1 ? 'Completed!' : '0/1 lessons';
      default:
        return '';
    }
  };

  const getProgressPercentage = (badgeId: string): number => {
    switch (badgeId) {
      case 'streak_starter':
        return Math.min((badgeProgress.currentStreak / 3) * 100, 100);
      case 'grammar_hero':
        return Math.min((badgeProgress.completedModules / 5) * 100, 100);
      case 'speaking_pro':
        return Math.min((badgeProgress.speakingSubmissions / 10) * 100, 100);
      case 'daily_learner':
        return Math.min((badgeProgress.dailyTipsViewed / 7) * 100, 100);
      case 'early_riser':
        return Math.min((badgeProgress.earlyRiserCount / 3) * 100, 100);
      case 'bookmark_master':
        return Math.min((badgeProgress.bookmarksSaved / 5) * 100, 100);
      case 'level_up':
        return Math.min((badgeProgress.currentLevel / 10) * 100, 100);
      case 'party_master':
        return badgeProgress.partyModeUnlocked ? 100 : Math.min((badgeProgress.currentLevel / 10) * 100, 100);
      case 'first_lesson':
        return badgeProgress.totalExercises >= 1 ? 100 : 0;
      default:
        return 0;
    }
  };

  return { getProgressText, getProgressPercentage };
};
