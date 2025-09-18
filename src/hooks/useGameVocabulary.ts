import { useState, useEffect } from 'react';

export interface GameWord {
  english: string;
  turkish: string;
  difficulty?: number;
  source?: string; // which lesson/module this word came from
}

// Turkish-English vocabulary for Smart Flashcards
const getTurkishEnglishWordList = (): GameWord[] => {
  return [
    // A1 Level - Basic everyday words
    { english: 'book', turkish: 'kitap', difficulty: 1, source: 'Basic Vocabulary' },
    { english: 'home', turkish: 'ev', difficulty: 1, source: 'Basic Vocabulary' },
    { english: 'water', turkish: 'su', difficulty: 1, source: 'Basic Vocabulary' },
    { english: 'food', turkish: 'yemek', difficulty: 1, source: 'Basic Vocabulary' },
    { english: 'family', turkish: 'aile', difficulty: 1, source: 'Basic Vocabulary' },
    { english: 'friend', turkish: 'arkadaş', difficulty: 1, source: 'Basic Vocabulary' },
    { english: 'school', turkish: 'okul', difficulty: 1, source: 'Basic Vocabulary' },
    { english: 'house', turkish: 'ev', difficulty: 1, source: 'Basic Vocabulary' },
    { english: 'car', turkish: 'araba', difficulty: 1, source: 'Basic Vocabulary' },
    { english: 'dog', turkish: 'köpek', difficulty: 1, source: 'Basic Vocabulary' },
    { english: 'cat', turkish: 'kedi', difficulty: 1, source: 'Basic Vocabulary' },
    { english: 'baby', turkish: 'bebek', difficulty: 1, source: 'Basic Vocabulary' },
    { english: 'money', turkish: 'para', difficulty: 1, source: 'Basic Vocabulary' },
    { english: 'work', turkish: 'iş', difficulty: 1, source: 'Basic Vocabulary' },
    { english: 'time', turkish: 'zaman', difficulty: 1, source: 'Basic Vocabulary' },

    // A2 Level - Common vocabulary
    { english: 'mother', turkish: 'anne', difficulty: 2, source: 'Family' },
    { english: 'father', turkish: 'baba', difficulty: 2, source: 'Family' },
    { english: 'sister', turkish: 'kız kardeş', difficulty: 2, source: 'Family' },
    { english: 'brother', turkish: 'erkek kardeş', difficulty: 2, source: 'Family' },
    { english: 'teacher', turkish: 'öğretmen', difficulty: 2, source: 'Professions' },
    { english: 'doctor', turkish: 'doktor', difficulty: 2, source: 'Professions' },
    { english: 'student', turkish: 'öğrenci', difficulty: 2, source: 'Professions' },
    { english: 'happy', turkish: 'mutlu', difficulty: 2, source: 'Emotions' },
    { english: 'sad', turkish: 'üzgün', difficulty: 2, source: 'Emotions' },
    { english: 'beautiful', turkish: 'güzel', difficulty: 2, source: 'Adjectives' },
    { english: 'good', turkish: 'iyi', difficulty: 2, source: 'Adjectives' },
    { english: 'bad', turkish: 'kötü', difficulty: 2, source: 'Adjectives' },
    { english: 'big', turkish: 'büyük', difficulty: 2, source: 'Adjectives' },
    { english: 'small', turkish: 'küçük', difficulty: 2, source: 'Adjectives' },
    { english: 'new', turkish: 'yeni', difficulty: 2, source: 'Adjectives' },

    // B1 Level - Intermediate vocabulary
    { english: 'travel', turkish: 'seyahat', difficulty: 3, source: 'Activities' },
    { english: 'market', turkish: 'pazar', difficulty: 3, source: 'Places' },
    { english: 'office', turkish: 'ofis', difficulty: 3, source: 'Places' },
    { english: 'hospital', turkish: 'hastane', difficulty: 3, source: 'Places' },
    { english: 'restaurant', turkish: 'restoran', difficulty: 3, source: 'Places' },
    { english: 'computer', turkish: 'bilgisayar', difficulty: 3, source: 'Technology' },
    { english: 'telephone', turkish: 'telefon', difficulty: 3, source: 'Technology' },
    { english: 'internet', turkish: 'internet', difficulty: 3, source: 'Technology' },
    { english: 'nature', turkish: 'doğa', difficulty: 3, source: 'Environment' },
    { english: 'weather', turkish: 'hava', difficulty: 3, source: 'Environment' },
    { english: 'season', turkish: 'mevsim', difficulty: 3, source: 'Environment' },
    { english: 'question', turkish: 'soru', difficulty: 3, source: 'Communication' },
    { english: 'answer', turkish: 'cevap', difficulty: 3, source: 'Communication' },
    { english: 'problem', turkish: 'sorun', difficulty: 3, source: 'Communication' },
    { english: 'solution', turkish: 'çözüm', difficulty: 3, source: 'Communication' },

    // Colors
    { english: 'red', turkish: 'kırmızı', difficulty: 1, source: 'Colors' },
    { english: 'blue', turkish: 'mavi', difficulty: 1, source: 'Colors' },
    { english: 'green', turkish: 'yeşil', difficulty: 1, source: 'Colors' },
    { english: 'yellow', turkish: 'sarı', difficulty: 1, source: 'Colors' },
    { english: 'black', turkish: 'siyah', difficulty: 1, source: 'Colors' },
    { english: 'white', turkish: 'beyaz', difficulty: 1, source: 'Colors' },

    // Numbers (written out)
    { english: 'one', turkish: 'bir', difficulty: 1, source: 'Numbers' },
    { english: 'two', turkish: 'iki', difficulty: 1, source: 'Numbers' },
    { english: 'three', turkish: 'üç', difficulty: 1, source: 'Numbers' },
    { english: 'four', turkish: 'dört', difficulty: 1, source: 'Numbers' },
    { english: 'five', turkish: 'beş', difficulty: 1, source: 'Numbers' },

    // Body parts
    { english: 'head', turkish: 'kafa', difficulty: 2, source: 'Body Parts' },
    { english: 'hand', turkish: 'el', difficulty: 1, source: 'Body Parts' },
    { english: 'foot', turkish: 'ayak', difficulty: 1, source: 'Body Parts' },
    { english: 'eye', turkish: 'göz', difficulty: 1, source: 'Body Parts' },
    { english: 'ear', turkish: 'kulak', difficulty: 1, source: 'Body Parts' }
  ];
};

// English-only words for Hangman (keep original functionality)
const getEnglishWordList = (): GameWord[] => {
  const englishWords = [
    'book', 'home', 'work', 'time', 'hand', 'year', 'word', 'place',
    'world', 'school', 'water', 'family', 'money', 'story', 'month',
    'right', 'study', 'group', 'music', 'night', 'point', 'house',
    'state', 'room', 'fact', 'light', 'sound', 'order',
    'power', 'heart', 'party', 'level', 'price', 'paper', 'space'
  ];

  return englishWords.map((word) => ({
    english: word,
    turkish: '', // No Turkish translations needed for English-only Hangman
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
        // Use Turkish-English vocabulary as primary vocabulary
        const words = getTurkishEnglishWordList();
        setVocabulary(words);
      } catch (error) {
        console.error('Error loading vocabulary:', error);
        // Fallback to basic Turkish-English vocabulary
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
    // For hangman, use English-only vocabulary (no Turkish needed)
    const englishWords = getEnglishWordList();
    const suitableWords = englishWords.filter(word =>
      word.english.length >= 3 && word.english.length <= 8
    );
    return suitableWords.length > 0 ? suitableWords : englishWords;
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