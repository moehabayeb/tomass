import { useState, useEffect, useCallback } from 'react';

export interface FlashcardProgress {
  currentTier: number;
  tiersUnlocked: number[];
  tierBestScores: Record<number, number>; // tier number -> percentage
  tierAttempts: Record<number, number>; // tier number -> attempt count
  masteredWords: string[]; // words user got correct 3+ times
  wordAttempts: Record<string, { correct: number; total: number }>; // word -> stats
  totalAttempts: number;
  totalCorrect: number;
  lastPlayedDate: string;
}

const STORAGE_KEY = 'tomass_flashcard_progress';

const DEFAULT_PROGRESS: FlashcardProgress = {
  currentTier: 1,
  tiersUnlocked: [1], // Tier 1 always unlocked
  tierBestScores: {},
  tierAttempts: {},
  masteredWords: [],
  wordAttempts: {},
  totalAttempts: 0,
  totalCorrect: 0,
  lastPlayedDate: new Date().toISOString()
};

export const useFlashcardProgress = () => {
  const [progress, setProgress] = useState<FlashcardProgress>(DEFAULT_PROGRESS);
  const [isLoading, setIsLoading] = useState(true);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setProgress(parsed);
      }
    } catch (error) {
      // Apple Store Compliance: Silent operation
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((newProgress: FlashcardProgress) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (error) {
      // Phase 2.2: Handle QuotaExceededError by clearing old data and retrying
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        try {
          // Clear old flashcard data to free up space
          localStorage.removeItem(STORAGE_KEY);

          // Retry with reduced data (keep only essential progress)
          const reducedProgress: FlashcardProgress = {
            ...newProgress,
            // Keep only recent word attempts (last 50)
            wordAttempts: Object.fromEntries(
              Object.entries(newProgress.wordAttempts).slice(-50)
            ),
          };

          localStorage.setItem(STORAGE_KEY, JSON.stringify(reducedProgress));
          setProgress(reducedProgress);
        } catch (retryError) {
          // If retry also fails, continue silently - Apple Store Compliance
          // User can still play, progress just won't persist
          setProgress(newProgress); // At least update in-memory state
        }
      } else {
        // Apple Store Compliance: Silent operation for other errors
        setProgress(newProgress); // Update in-memory state even if save fails
      }
    }
  }, []);

  // Complete a tier with results
  const completeTier = useCallback((
    tier: number,
    results: Array<{ word: string; correct: boolean }>
  ) => {
    const correctCount = results.filter(r => r.correct).length;
    const totalCount = results.length;
    const percentage = (correctCount / totalCount) * 100;

    const newProgress = { ...progress };

    // Update tier stats
    newProgress.tierBestScores[tier] = Math.max(
      newProgress.tierBestScores[tier] || 0,
      percentage
    );
    newProgress.tierAttempts[tier] = (newProgress.tierAttempts[tier] || 0) + 1;

    // Update word stats
    results.forEach(({ word, correct }) => {
      if (!newProgress.wordAttempts[word]) {
        newProgress.wordAttempts[word] = { correct: 0, total: 0 };
      }
      newProgress.wordAttempts[word].total += 1;
      if (correct) {
        newProgress.wordAttempts[word].correct += 1;
      }

      // Mark as mastered if correct 3+ times
      const stats = newProgress.wordAttempts[word];
      if (stats.correct >= 3 && !newProgress.masteredWords.includes(word)) {
        newProgress.masteredWords.push(word);
      }
    });

    // Update global stats
    newProgress.totalAttempts += totalCount;
    newProgress.totalCorrect += correctCount;
    newProgress.lastPlayedDate = new Date().toISOString();

    // Check if tier passed (unlock next tier)
    const passThreshold = tier === 5 ? 85 : 80; // Tier 5 requires 85%
    if (percentage >= passThreshold) {
      const nextTier = tier + 1;
      if (nextTier <= 5 && !newProgress.tiersUnlocked.includes(nextTier)) {
        newProgress.tiersUnlocked.push(nextTier);
        newProgress.tiersUnlocked.sort((a, b) => a - b);
      }
      // Update current tier if progressing
      if (tier >= newProgress.currentTier) {
        newProgress.currentTier = Math.min(nextTier, 5);
      }
    }

    saveProgress(newProgress);
    return {
      passed: percentage >= passThreshold,
      percentage,
      correctCount,
      totalCount,
      unlockedNextTier: percentage >= passThreshold && tier < 5
    };
  }, [progress, saveProgress]);

  // Check if tier is unlocked
  const isTierUnlocked = useCallback((tier: number) => {
    return progress.tiersUnlocked.includes(tier);
  }, [progress.tiersUnlocked]);

  // Get tier best score
  const getTierBestScore = useCallback((tier: number) => {
    return progress.tierBestScores[tier] || 0;
  }, [progress.tierBestScores]);

  // Get tier attempts
  const getTierAttempts = useCallback((tier: number) => {
    return progress.tierAttempts[tier] || 0;
  }, [progress.tierAttempts]);

  // Get overall accuracy
  const getOverallAccuracy = useCallback(() => {
    if (progress.totalAttempts === 0) return 0;
    return (progress.totalCorrect / progress.totalAttempts) * 100;
  }, [progress.totalAttempts, progress.totalCorrect]);

  // Reset all progress
  const resetProgress = useCallback(() => {
    saveProgress(DEFAULT_PROGRESS);
  }, [saveProgress]);

  // Reset specific tier (for practice)
  const resetTier = useCallback((tier: number) => {
    const newProgress = { ...progress };
    delete newProgress.tierBestScores[tier];
    delete newProgress.tierAttempts[tier];
    saveProgress(newProgress);
  }, [progress, saveProgress]);

  // 🔧 FIX #9: Incremental progress save - update after each card to prevent data loss
  const updateWordProgress = useCallback((word: string, correct: boolean) => {
    const newProgress = { ...progress };

    // Update word stats
    if (!newProgress.wordAttempts[word]) {
      newProgress.wordAttempts[word] = { correct: 0, total: 0 };
    }
    newProgress.wordAttempts[word].total += 1;
    if (correct) {
      newProgress.wordAttempts[word].correct += 1;
    }

    // Mark as mastered if correct 3+ times
    const stats = newProgress.wordAttempts[word];
    if (stats.correct >= 3 && !newProgress.masteredWords.includes(word)) {
      newProgress.masteredWords.push(word);
    }

    // Update global stats
    newProgress.totalAttempts += 1;
    if (correct) {
      newProgress.totalCorrect += 1;
    }
    newProgress.lastPlayedDate = new Date().toISOString();

    saveProgress(newProgress);
  }, [progress, saveProgress]);

  return {
    progress,
    isLoading,
    completeTier,
    updateWordProgress,
    isTierUnlocked,
    getTierBestScore,
    getTierAttempts,
    getOverallAccuracy,
    resetProgress,
    resetTier
  };
};
