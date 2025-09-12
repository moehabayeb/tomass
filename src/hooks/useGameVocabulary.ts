import { useState, useEffect } from 'react';

export interface GameWord {
  english: string;
  turkish: string;
  difficulty?: number;
  source?: string; // which lesson/module this word came from
}

// CEFR A1-B1 English word list for Hangman
const getEnglishWordList = (): GameWord[] => {
  // English-only words suitable for Hangman (4-8 letters, common vocabulary)
  const englishWords = [
    // A1 Level (Basic)
    'book', 'home', 'work', 'time', 'hand', 'year', 'word', 'place', 
    'world', 'school', 'water', 'family', 'money', 'story', 'month',
    'right', 'study', 'group', 'music', 'night', 'point', 'house',
    'state', 'room', 'fact', 'money', 'light', 'sound', 'order',
    'power', 'heart', 'party', 'level', 'price', 'paper', 'space',
    
    // A2 Level
    'nature', 'peace', 'health', 'sister', 'brother', 'mother', 'father',
    'friend', 'happy', 'tired', 'strong', 'quick', 'clean', 'dark',
    'heavy', 'light', 'short', 'tall', 'wide', 'young', 'old',
    'smart', 'kind', 'nice', 'good', 'great', 'small', 'large',
    'first', 'last', 'early', 'late', 'today', 'green', 'blue',
    
    // B1 Level
    'energy', 'office', 'doctor', 'teacher', 'worker', 'garden', 
    'market', 'center', 'travel', 'future', 'change', 'choice',
    'chance', 'reason', 'season', 'person', 'animal', 'plant',
    'growth', 'create', 'build', 'start', 'finish', 'learn',
    'teach', 'watch', 'listen', 'speak', 'write', 'read'
  ];

  return englishWords.map((word, index) => ({
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

  return {
    vocabulary,
    isLoading,
    getRandomWords,
    getWordsForHangman,
    getWordsForFlashcards
  };
};