import { useState, useCallback } from 'react';

export interface DifficultyLevel {
  id: string;
  name: string;
  description: string;
  maxWrong: number;
  hints: number;
  showCategory: boolean;
  xpMultiplier: number;
  wordLengthRange: [number, number];
}

export interface GameCategory {
  id: string;
  name: string;
  emoji: string;
  description: string;
  words: Array<{
    word: string;
    hint?: string;
    difficulty: 'easy' | 'medium' | 'hard';
  }>;
}

export const DIFFICULTY_LEVELS: Record<string, DifficultyLevel> = {
  easy: {
    id: 'easy',
    name: '🟢 Easy',
    description: 'Perfect for beginners',
    maxWrong: 8,
    hints: 3,
    showCategory: true,
    xpMultiplier: 1,
    wordLengthRange: [3, 6]
  },
  medium: {
    id: 'medium',
    name: '🟡 Medium',
    description: 'Good challenge',
    maxWrong: 6,
    hints: 2,
    showCategory: true,
    xpMultiplier: 1.5,
    wordLengthRange: [5, 8]
  },
  hard: {
    id: 'hard',
    name: '🔴 Hard',
    description: 'For experts',
    maxWrong: 4,
    hints: 1,
    showCategory: false,
    xpMultiplier: 2,
    wordLengthRange: [6, 10]
  },
  extreme: {
    id: 'extreme',
    name: '🔥 Extreme',
    description: 'Insane difficulty',
    maxWrong: 3,
    hints: 0,
    showCategory: false,
    xpMultiplier: 3,
    wordLengthRange: [8, 15]
  }
};

export const GAME_CATEGORIES: Record<string, GameCategory> = {
  animals: {
    id: 'animals',
    name: 'Animals',
    emoji: '🐾',
    description: 'Creatures from around the world',
    words: [
      { word: 'CAT', difficulty: 'easy' },
      { word: 'DOG', difficulty: 'easy' },
      { word: 'LION', difficulty: 'easy', hint: 'King of the jungle' },
      { word: 'ELEPHANT', difficulty: 'medium', hint: 'Largest land animal' },
      { word: 'GIRAFFE', difficulty: 'medium', hint: 'Tallest animal' },
      { word: 'PENGUIN', difficulty: 'medium', hint: 'Cannot fly but swims well' },
      { word: 'RHINOCEROS', difficulty: 'hard', hint: 'Has a horn on its nose' },
      { word: 'HIPPOPOTAMUS', difficulty: 'extreme', hint: 'Spends most time in water' }
    ]
  },
  food: {
    id: 'food',
    name: 'Food',
    emoji: '🍕',
    description: 'Delicious dishes and ingredients',
    words: [
      { word: 'PIZZA', difficulty: 'easy', hint: 'Italian round bread with toppings' },
      { word: 'APPLE', difficulty: 'easy' },
      { word: 'BURGER', difficulty: 'easy', hint: 'Meat patty in a bun' },
      { word: 'CHOCOLATE', difficulty: 'medium', hint: 'Sweet brown treat' },
      { word: 'SPAGHETTI', difficulty: 'medium', hint: 'Long thin pasta' },
      { word: 'SANDWICH', difficulty: 'medium', hint: 'Food between bread slices' },
      { word: 'CROISSANT', difficulty: 'hard', hint: 'French crescent-shaped pastry' },
      { word: 'QUESADILLA', difficulty: 'extreme', hint: 'Mexican filled tortilla' }
    ]
  },
  countries: {
    id: 'countries',
    name: 'Countries',
    emoji: '🌍',
    description: 'Nations around the globe',
    words: [
      { word: 'USA', difficulty: 'easy' },
      { word: 'FRANCE', difficulty: 'easy', hint: 'Famous for the Eiffel Tower' },
      { word: 'JAPAN', difficulty: 'easy', hint: 'Land of the rising sun' },
      { word: 'BRAZIL', difficulty: 'medium', hint: 'Largest South American country' },
      { word: 'AUSTRALIA', difficulty: 'medium', hint: 'Island continent' },
      { word: 'SWITZERLAND', difficulty: 'hard', hint: 'Famous for chocolate and watches' },
      { word: 'MADAGASCAR', difficulty: 'hard', hint: 'Large island off Africa' },
      { word: 'AFGHANISTAN', difficulty: 'extreme', hint: 'Landlocked Asian country' }
    ]
  },
  technology: {
    id: 'technology',
    name: 'Technology',
    emoji: '💻',
    description: 'Modern tech and gadgets',
    words: [
      { word: 'PHONE', difficulty: 'easy' },
      { word: 'COMPUTER', difficulty: 'medium', hint: 'Electronic calculating machine' },
      { word: 'INTERNET', difficulty: 'medium', hint: 'Global network' },
      { word: 'SMARTPHONE', difficulty: 'hard', hint: 'Portable computer device' },
      { word: 'ARTIFICIAL', difficulty: 'hard', hint: 'Not natural, man-made' },
      { word: 'BLUETOOTH', difficulty: 'hard', hint: 'Wireless connection technology' },
      { word: 'CRYPTOCURRENCY', difficulty: 'extreme', hint: 'Digital currency' },
      { word: 'NANOTECHNOLOGY', difficulty: 'extreme', hint: 'Science of very small things' }
    ]
  },
  space: {
    id: 'space',
    name: 'Space',
    emoji: '🚀',
    description: 'Cosmic objects and exploration',
    words: [
      { word: 'SUN', difficulty: 'easy' },
      { word: 'MOON', difficulty: 'easy', hint: 'Earth\'s natural satellite' },
      { word: 'PLANET', difficulty: 'medium', hint: 'Celestial body orbiting a star' },
      { word: 'ASTEROID', difficulty: 'hard', hint: 'Rocky space object' },
      { word: 'TELESCOPE', difficulty: 'hard', hint: 'Device for viewing distant objects' },
      { word: 'CONSTELLATION', difficulty: 'extreme', hint: 'Pattern of stars' },
      { word: 'SUPERNOVA', difficulty: 'extreme', hint: 'Exploding star' }
    ]
  }
};

export const useHangmanDifficulty = () => {
  // State moved to component level for proper management

  const getWordsForDifficulty = useCallback((difficulty: string, category: string) => {
    const difficultyConfig = DIFFICULTY_LEVELS[difficulty];
    const categoryConfig = GAME_CATEGORIES[category];

    if (!difficultyConfig || !categoryConfig) return [];

    // Filter words by difficulty and length
    const suitableWords = categoryConfig.words.filter(wordObj => {
      const length = wordObj.word.length;
      const [minLength, maxLength] = difficultyConfig.wordLengthRange;

      // Match both difficulty level and word length
      return (
        (wordObj.difficulty === difficulty ||
         (difficulty === 'easy' && ['easy'].includes(wordObj.difficulty)) ||
         (difficulty === 'medium' && ['easy', 'medium'].includes(wordObj.difficulty)) ||
         (difficulty === 'hard' && ['easy', 'medium', 'hard'].includes(wordObj.difficulty)) ||
         (difficulty === 'extreme' && ['easy', 'medium', 'hard', 'extreme'].includes(wordObj.difficulty))
        ) &&
        length >= minLength && length <= maxLength
      );
    });

    return suitableWords;
  }, []);

  const getDifficultyConfig = useCallback((difficulty: string) => {
    return DIFFICULTY_LEVELS[difficulty];
  }, []);

  const getCategoryConfig = useCallback((category: string) => {
    return GAME_CATEGORIES[category];
  }, []);

  return {
    getWordsForDifficulty,
    getDifficultyConfig,
    getCategoryConfig,
    allDifficulties: Object.values(DIFFICULTY_LEVELS),
    allCategories: Object.values(GAME_CATEGORIES)
  };
};