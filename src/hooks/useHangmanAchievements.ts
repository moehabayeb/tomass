import { useState, useCallback, useEffect } from 'react';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (stats: GameStats) => boolean;
  xpReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
}

export interface GameStats {
  totalGames: number;
  totalWins: number;
  totalLosses: number;
  perfectGames: number; // won without any wrong guesses
  currentStreak: number;
  longestStreak: number;
  totalXP: number;
  difficultiesPlayed: Set<string>;
  categoriesPlayed: Set<string>;
  powerUpsUsed: number;
  lettersGuessed: number;
  hintsUsed: number;
}

const ACHIEVEMENTS: Achievement[] = [
  // Beginner Achievements
  {
    id: 'first_win',
    name: 'First Victory',
    description: 'Win your first game',
    icon: '🎉',
    condition: (stats) => stats.totalWins >= 1,
    xpReward: 50,
    rarity: 'common'
  },
  {
    id: 'first_perfect',
    name: 'Flawless',
    description: 'Win a game without any wrong guesses',
    icon: '💎',
    condition: (stats) => stats.perfectGames >= 1,
    xpReward: 100,
    rarity: 'rare'
  },

  // Streak Achievements
  {
    id: 'streak_3',
    name: 'On Fire',
    description: 'Win 3 games in a row',
    icon: '🔥',
    condition: (stats) => stats.longestStreak >= 3,
    xpReward: 150,
    rarity: 'rare'
  },
  {
    id: 'streak_5',
    name: 'Unstoppable',
    description: 'Win 5 games in a row',
    icon: '⚡',
    condition: (stats) => stats.longestStreak >= 5,
    xpReward: 250,
    rarity: 'epic'
  },
  {
    id: 'streak_10',
    name: 'Legendary Streak',
    description: 'Win 10 games in a row',
    icon: '👑',
    condition: (stats) => stats.longestStreak >= 10,
    xpReward: 500,
    rarity: 'legendary'
  },

  // Volume Achievements
  {
    id: 'games_10',
    name: 'Getting Started',
    description: 'Play 10 games',
    icon: '🎮',
    condition: (stats) => stats.totalGames >= 10,
    xpReward: 100,
    rarity: 'common'
  },
  {
    id: 'games_50',
    name: 'Dedicated Player',
    description: 'Play 50 games',
    icon: '🎯',
    condition: (stats) => stats.totalGames >= 50,
    xpReward: 300,
    rarity: 'rare'
  },
  {
    id: 'games_100',
    name: 'Century Club',
    description: 'Play 100 games',
    icon: '🏆',
    condition: (stats) => stats.totalGames >= 100,
    xpReward: 500,
    rarity: 'epic'
  },

  // Difficulty Achievements
  {
    id: 'all_difficulties',
    name: 'Challenge Seeker',
    description: 'Play on all difficulty levels',
    icon: '🌟',
    condition: (stats) => stats.difficultiesPlayed.size >= 4,
    xpReward: 200,
    rarity: 'rare'
  },
  {
    id: 'extreme_master',
    name: 'Extreme Master',
    description: 'Win 5 games on Extreme difficulty',
    icon: '💀',
    condition: (stats) => stats.difficultiesPlayed.has('extreme') && stats.totalWins >= 5,
    xpReward: 400,
    rarity: 'epic'
  },

  // Category Achievements
  {
    id: 'category_explorer',
    name: 'Explorer',
    description: 'Play all categories',
    icon: '🗺️',
    condition: (stats) => stats.categoriesPlayed.size >= 5,
    xpReward: 150,
    rarity: 'rare'
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Achieve 5 perfect games',
    icon: '✨',
    condition: (stats) => stats.perfectGames >= 5,
    xpReward: 300,
    rarity: 'epic'
  },

  // Power-up Achievements
  {
    id: 'power_user',
    name: 'Power User',
    description: 'Use 20 power-ups',
    icon: '⚡',
    condition: (stats) => stats.powerUpsUsed >= 20,
    xpReward: 150,
    rarity: 'rare'
  },

  // XP Achievements
  {
    id: 'xp_1000',
    name: 'Rising Star',
    description: 'Earn 1,000 XP',
    icon: '🌟',
    condition: (stats) => stats.totalXP >= 1000,
    xpReward: 200,
    rarity: 'rare'
  },
  {
    id: 'xp_5000',
    name: 'Word Master',
    description: 'Earn 5,000 XP',
    icon: '🏅',
    condition: (stats) => stats.totalXP >= 5000,
    xpReward: 500,
    rarity: 'epic'
  },
  {
    id: 'xp_10000',
    name: 'Hangman Legend',
    description: 'Earn 10,000 XP',
    icon: '👑',
    condition: (stats) => stats.totalXP >= 10000,
    xpReward: 1000,
    rarity: 'legendary'
  }
];

export const useHangmanAchievements = () => {
  const [gameStats, setGameStats] = useState<GameStats>({
    totalGames: 0,
    totalWins: 0,
    totalLosses: 0,
    perfectGames: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalXP: 0,
    difficultiesPlayed: new Set(),
    categoriesPlayed: new Set(),
    powerUpsUsed: 0,
    lettersGuessed: 0,
    hintsUsed: 0
  });

  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());
  const [recentAchievements, setRecentAchievements] = useState<Achievement[]>([]);

  // Load data from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('hangman-stats');
    const savedAchievements = localStorage.getItem('hangman-achievements');

    if (savedStats) {
      const parsed = JSON.parse(savedStats);
      setGameStats({
        ...parsed,
        difficultiesPlayed: new Set(parsed.difficultiesPlayed || []),
        categoriesPlayed: new Set(parsed.categoriesPlayed || [])
      });
    }

    if (savedAchievements) {
      setUnlockedAchievements(new Set(JSON.parse(savedAchievements)));
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('hangman-stats', JSON.stringify({
      ...gameStats,
      difficultiesPlayed: Array.from(gameStats.difficultiesPlayed),
      categoriesPlayed: Array.from(gameStats.categoriesPlayed)
    }));
  }, [gameStats]);

  useEffect(() => {
    localStorage.setItem('hangman-achievements', JSON.stringify(Array.from(unlockedAchievements)));
  }, [unlockedAchievements]);

  // Check for newly unlocked achievements
  const checkAchievements = useCallback(() => {
    const newlyUnlocked: Achievement[] = [];

    ACHIEVEMENTS.forEach(achievement => {
      if (!unlockedAchievements.has(achievement.id) && achievement.condition(gameStats)) {
        newlyUnlocked.push(achievement);
        setUnlockedAchievements(prev => new Set([...prev, achievement.id]));
      }
    });

    if (newlyUnlocked.length > 0) {
      setRecentAchievements(newlyUnlocked);
      // Clear recent achievements after 5 seconds
      setTimeout(() => setRecentAchievements([]), 5000);
    }

    return newlyUnlocked;
  }, [gameStats, unlockedAchievements]);

  // Update stats functions
  const recordGameStart = useCallback((difficulty: string, category: string) => {
    setGameStats(prev => ({
      ...prev,
      totalGames: prev.totalGames + 1,
      difficultiesPlayed: new Set([...prev.difficultiesPlayed, difficulty]),
      categoriesPlayed: new Set([...prev.categoriesPlayed, category])
    }));
  }, []);

  const recordGameWin = useCallback((isPerfect: boolean, xpEarned: number) => {
    setGameStats(prev => {
      const newStreak = prev.currentStreak + 1;
      return {
        ...prev,
        totalWins: prev.totalWins + 1,
        perfectGames: prev.perfectGames + (isPerfect ? 1 : 0),
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        totalXP: prev.totalXP + xpEarned
      };
    });
  }, []);

  const recordGameLoss = useCallback(() => {
    setGameStats(prev => ({
      ...prev,
      totalLosses: prev.totalLosses + 1,
      currentStreak: 0
    }));
  }, []);

  const recordPowerUpUse = useCallback(() => {
    setGameStats(prev => ({
      ...prev,
      powerUpsUsed: prev.powerUpsUsed + 1
    }));
  }, []);

  const recordLetterGuess = useCallback(() => {
    setGameStats(prev => ({
      ...prev,
      lettersGuessed: prev.lettersGuessed + 1
    }));
  }, []);

  const recordHintUse = useCallback(() => {
    setGameStats(prev => ({
      ...prev,
      hintsUsed: prev.hintsUsed + 1
    }));
  }, []);

  const getAchievementProgress = useCallback(() => {
    const totalAchievements = ACHIEVEMENTS.length;
    const unlockedCount = unlockedAchievements.size;
    const totalXPFromAchievements = ACHIEVEMENTS
      .filter(a => unlockedAchievements.has(a.id))
      .reduce((total, a) => total + a.xpReward, 0);

    return {
      unlockedCount,
      totalAchievements,
      percentage: Math.round((unlockedCount / totalAchievements) * 100),
      totalXPFromAchievements
    };
  }, [unlockedAchievements]);

  const getAchievementsByRarity = useCallback(() => {
    const categorized = {
      common: [] as Achievement[],
      rare: [] as Achievement[],
      epic: [] as Achievement[],
      legendary: [] as Achievement[]
    };

    ACHIEVEMENTS.forEach(achievement => {
      const unlocked = unlockedAchievements.has(achievement.id);
      categorized[achievement.rarity].push({
        ...achievement,
        unlockedAt: unlocked ? new Date() : undefined
      });
    });

    return categorized;
  }, [unlockedAchievements]);

  return {
    gameStats,
    unlockedAchievements,
    recentAchievements,
    allAchievements: ACHIEVEMENTS,
    checkAchievements,
    recordGameStart,
    recordGameWin,
    recordGameLoss,
    recordPowerUpUse,
    recordLetterGuess,
    recordHintUse,
    getAchievementProgress,
    getAchievementsByRarity
  };
};