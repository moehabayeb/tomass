import { useState, useEffect } from 'react';

export interface GameWord {
  english: string;
  turkish: string;
  difficulty?: number;
  source?: string; // which lesson/module this word came from
}

// Extract vocabulary from lesson data
const extractVocabularyFromLessons = (): GameWord[] => {
  const vocabulary: GameWord[] = [];
  
  // Get user's lesson progress from localStorage
  const progress = JSON.parse(localStorage.getItem('lessonProgress') || '{}');
  
  // Extract words from completed lessons
  // This is a simplified approach - in a real app, this would come from a proper vocabulary database
  
  // Module 1 vocabulary (To Be verbs)
  if (progress.module1?.completed || progress.currentModule >= 1) {
    vocabulary.push(
      { english: 'student', turkish: 'öğrenci', difficulty: 1, source: 'Module 1' },
      { english: 'teacher', turkish: 'öğretmen', difficulty: 1, source: 'Module 1' },
      { english: 'doctor', turkish: 'doktor', difficulty: 1, source: 'Module 1' },
      { english: 'happy', turkish: 'mutlu', difficulty: 1, source: 'Module 1' },
      { english: 'tired', turkish: 'yorgun', difficulty: 1, source: 'Module 1' },
      { english: 'friend', turkish: 'arkadaş', difficulty: 1, source: 'Module 1' },
      { english: 'cold', turkish: 'soğuk', difficulty: 1, source: 'Module 1' },
      { english: 'engineer', turkish: 'mühendis', difficulty: 2, source: 'Module 1' }
    );
  }
  
  // Module 2 vocabulary (Negative sentences)
  if (progress.module2?.completed || progress.currentModule >= 2) {
    vocabulary.push(
      { english: 'nurse', turkish: 'hemşire', difficulty: 1, source: 'Module 2' },
      { english: 'busy', turkish: 'meşgul', difficulty: 1, source: 'Module 2' },
      { english: 'ready', turkish: 'hazır', difficulty: 1, source: 'Module 2' },
      { english: 'strong', turkish: 'güçlü', difficulty: 1, source: 'Module 2' },
      { english: 'careful', turkish: 'dikkatli', difficulty: 2, source: 'Module 2' }
    );
  }
  
  // Module 3 vocabulary (Questions)
  if (progress.module3?.completed || progress.currentModule >= 3) {
    vocabulary.push(
      { english: 'beautiful', turkish: 'güzel', difficulty: 1, source: 'Module 3' },
      { english: 'expensive', turkish: 'pahalı', difficulty: 2, source: 'Module 3' },
      { english: 'married', turkish: 'evli', difficulty: 1, source: 'Module 3' },
      { english: 'available', turkish: 'müsait', difficulty: 2, source: 'Module 3' },
      { english: 'welcome', turkish: 'hoş geldin', difficulty: 2, source: 'Module 3' }
    );
  }
  
  // Always include some basic vocabulary for new users
  if (vocabulary.length === 0) {
    vocabulary.push(
      { english: 'book', turkish: 'kitap', difficulty: 1, source: 'Basic' },
      { english: 'house', turkish: 'ev', difficulty: 1, source: 'Basic' },
      { english: 'water', turkish: 'su', difficulty: 1, source: 'Basic' },
      { english: 'school', turkish: 'okul', difficulty: 1, source: 'Basic' },
      { english: 'family', turkish: 'aile', difficulty: 1, source: 'Basic' },
      { english: 'morning', turkish: 'sabah', difficulty: 1, source: 'Basic' },
      { english: 'evening', turkish: 'akşam', difficulty: 2, source: 'Basic' }
    );
  }
  
  return vocabulary;
};

export const useGameVocabulary = () => {
  const [vocabulary, setVocabulary] = useState<GameWord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadVocabulary = () => {
      try {
        setIsLoading(true);
        const words = extractVocabularyFromLessons();
        setVocabulary(words);
      } catch (error) {
        console.error('Error loading vocabulary:', error);
        // Fallback to basic vocabulary
        setVocabulary([
          { english: 'book', turkish: 'kitap', difficulty: 1, source: 'Basic' },
          { english: 'house', turkish: 'ev', difficulty: 1, source: 'Basic' },
          { english: 'water', turkish: 'su', difficulty: 1, source: 'Basic' }
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