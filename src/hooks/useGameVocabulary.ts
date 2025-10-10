import { useState, useEffect } from 'react';

export interface GameWord {
  english: string;
  turkish: string;
  difficulty?: number;
  source?: string; // which lesson/module this word came from
}

// 5-TIER PROGRESSIVE WORD SYSTEM (75 words total)
// Each tier has 15 words, organized by CEFR level and difficulty

const FLASHCARD_TIERS: Record<number, string[]> = {
  // TIER 1: Beginner (A1 - Basic 4-5 letter words)
  1: [
    'book', 'home', 'work', 'time', 'hand',
    'year', 'word', 'place', 'house', 'room',
    'fact', 'light', 'sound', 'order', 'power'
  ],

  // TIER 2: Elementary (A1+ - 5-6 letter words)
  2: [
    'world', 'school', 'water', 'family', 'money',
    'story', 'month', 'right', 'study', 'group',
    'music', 'night', 'point', 'heart', 'party'
  ],

  // TIER 3: Intermediate (A2 - 6-7 letter words)
  3: [
    'nature', 'health', 'sister', 'brother', 'mother',
    'father', 'friend', 'strong', 'energy', 'office',
    'garden', 'market', 'center', 'travel', 'future'
  ],

  // TIER 4: Advanced (A2+ - Adjectives & concepts)
  4: [
    'happy', 'tired', 'quick', 'clean', 'heavy',
    'short', 'young', 'smart', 'first', 'early',
    'green', 'blue', 'large', 'small', 'great'
  ],

  // TIER 5: Master (B1 - Complex words & verbs)
  5: [
    'doctor', 'teacher', 'worker', 'change', 'choice',
    'chance', 'reason', 'season', 'person', 'animal',
    'growth', 'create', 'build', 'finish', 'listen'
  ]
};

// CEFR A1-B1 English word list for Hangman (all words combined)
const getEnglishWordList = (): GameWord[] => {
  const allWords: string[] = [];
  Object.values(FLASHCARD_TIERS).forEach(tierWords => {
    allWords.push(...tierWords);
  });

  return allWords.map((word) => ({
    english: word,
    turkish: '', // No Turkish translations needed for English-only game
    difficulty: word.length <= 4 ? 1 : word.length <= 6 ? 2 : 3,
    source: 'English Vocabulary'
  }));
};

export const useGameVocabulary = () => {
  const [vocabulary, setVocabulary] = useState<GameWord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadVocabulary = () => {
      try {
        setIsLoading(true);
        const words = getEnglishWordList();
        setVocabulary(words);
      } catch (error) {
        // Fallback to basic English vocabulary
        setVocabulary([
          { english: 'book', turkish: '', difficulty: 1, source: 'Basic' },
          { english: 'house', turkish: '', difficulty: 1, source: 'Basic' },
          { english: 'water', turkish: '', difficulty: 1, source: 'Basic' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadVocabulary();
  }, []);

  const getRandomWords = (count: number): GameWord[] => {
    if (vocabulary.length === 0) return [];
    
    const shuffled = [...vocabulary].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  };

  const getWordsForHangman = (): GameWord[] => {
    // For hangman, prefer shorter words that are easier to guess
    const suitableWords = vocabulary.filter(word => 
      word.english.length >= 3 && word.english.length <= 8
    );
    return suitableWords.length > 0 ? suitableWords : vocabulary;
  };

  const getWordsForFlashcards = (): GameWord[] => {
    // For flashcards, we can use all vocabulary
    return vocabulary;
  };

  const getWordsByTier = (tier: number): GameWord[] => {
    // Get words for specific tier (1-5)
    const tierWords = FLASHCARD_TIERS[tier] || [];
    return tierWords.map(word => ({
      english: word,
      turkish: '',
      difficulty: word.length <= 4 ? 1 : word.length <= 6 ? 2 : 3,
      source: `Tier ${tier}`
    }));
  };

  const getTierInfo = (tier: number) => {
    const tierNames = {
      1: 'Beginner',
      2: 'Elementary',
      3: 'Intermediate',
      4: 'Advanced',
      5: 'Master'
    };

    const tierDescriptions = {
      1: 'Basic 4-5 letter words',
      2: '5-6 letter everyday words',
      3: '6-7 letter common words',
      4: 'Adjectives & concepts',
      5: 'Complex words & verbs'
    };

    const tierColors = {
      1: 'from-green-500 to-emerald-600',
      2: 'from-blue-500 to-cyan-600',
      3: 'from-purple-500 to-pink-600',
      4: 'from-orange-500 to-red-600',
      5: 'from-yellow-500 via-pink-500 to-purple-600'
    };

    return {
      name: tierNames[tier as keyof typeof tierNames] || 'Unknown',
      description: tierDescriptions[tier as keyof typeof tierDescriptions] || '',
      gradient: tierColors[tier as keyof typeof tierColors] || 'from-gray-500 to-gray-600',
      wordCount: FLASHCARD_TIERS[tier]?.length || 0,
      passThreshold: tier === 5 ? 85 : 80
    };
  };

  return {
    vocabulary,
    isLoading,
    getRandomWords,
    getWordsForHangman,
    getWordsForFlashcards,
    getWordsByTier,
    getTierInfo
  };
};