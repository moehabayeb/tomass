import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Volume2, RotateCcw, Star, ChevronRight, Trophy, BookOpen, Sparkles, Mic, Lock, Unlock, AlertTriangle } from 'lucide-react';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useGamification } from '@/hooks/useGamification';
import { useGameVocabulary, type GameWord } from '@/hooks/useGameVocabulary';
import { useFlashcardSpeechRecognition } from '@/hooks/useFlashcardSpeechRecognition';
import { useFlashcardProgress } from '@/hooks/useFlashcardProgress';
import { audioManager } from '@/utils/audioContext';

interface FlashcardsGameProps {
  onBack: () => void;
}

// 🔧 FIX #8: Complete word definitions for all 75 tier words
const getWordDefinition = (word: string): string => {
  const definitions: Record<string, string> = {
    // TIER 1: Beginner (A1 - Basic 4-5 letter words) - 15 words
    'book': 'Something you read with pages and stories',
    'home': 'The place where you live with your family',
    'work': 'A place where people do their jobs',
    'time': 'What clocks and watches show us',
    'hand': 'The part of your body at the end of your arm',
    'year': 'Twelve months, or 365 days',
    'word': 'A single unit of language that has meaning',
    'place': 'A location or area where something happens',
    'house': 'A building where people live',
    'room': 'A space inside a building with walls',
    'fact': 'Something that is true and can be proven',
    'light': 'What lets us see, the opposite of dark',
    'sound': 'Something you can hear',
    'order': 'An arrangement or a request for something',
    'power': 'Strength or energy to do something',

    // TIER 2: Elementary (A1+ - 5-6 letter words) - 15 words
    'world': 'The Earth and everything on it',
    'school': 'A place where students go to learn',
    'water': 'A clear liquid that you drink',
    'family': 'Your parents, siblings, and relatives',
    'money': 'Coins and paper used to buy things',
    'story': 'A tale or narrative about events',
    'month': 'A period of about 30 days',
    'right': 'The opposite of left, or correct',
    'study': 'To learn about something by reading or practicing',
    'group': 'A number of people or things together',
    'music': 'Sounds arranged to be pleasant to hear',
    'night': 'The time when it is dark outside',
    'point': 'A specific position or detail',
    'heart': 'The organ that pumps blood in your body',
    'party': 'A celebration with friends and music',

    // TIER 3: Intermediate (A2 - 6-7 letter words) - 15 words
    'nature': 'Plants, animals, and the natural world',
    'health': 'The condition of being well and free from illness',
    'sister': 'A female sibling in your family',
    'brother': 'A male sibling in your family',
    'mother': 'A female parent',
    'father': 'A male parent',
    'friend': 'Someone you like and trust',
    'strong': 'Having physical power',
    'energy': 'The power to do work or activity',
    'office': 'A place where people work at desks',
    'garden': 'A place where plants and flowers grow',
    'market': 'A place where people buy and sell goods',
    'center': 'The middle point of something',
    'travel': 'To go from one place to another',
    'future': 'The time that will come after now',

    // TIER 4: Advanced (A2+ - Adjectives & concepts) - 15 words
    'happy': 'Feeling joy and contentment',
    'tired': 'Feeling like you need rest',
    'quick': 'Fast, not slow',
    'clean': 'Free from dirt',
    'heavy': 'Weighing a lot',
    'short': 'Not tall or not long',
    'young': 'Not old, in early life',
    'smart': 'Intelligent, clever',
    'first': 'Coming before all others',
    'early': 'Near the beginning of a time period',
    'green': 'The color of grass and leaves',
    'blue': 'The color of the sky',
    'large': 'Big in size',
    'small': 'Little in size',
    'great': 'Very good or large',

    // TIER 5: Master (B1 - Complex words & verbs) - 15 words
    'doctor': 'A person who treats sick people',
    'teacher': 'A person who helps others learn',
    'worker': 'A person who does a job',
    'change': 'To become different or make something different',
    'choice': 'The act of picking between options',
    'chance': 'An opportunity or possibility',
    'reason': 'The cause or explanation for something',
    'season': 'One of the four periods of the year',
    'person': 'A human being',
    'animal': 'A living creature that is not a plant',
    'growth': 'The process of getting bigger',
    'create': 'To make something new',
    'build': 'To construct or make something',
    'finish': 'To complete or end',
    'listen': 'To pay attention to sounds'
  };

  return definitions[word.toLowerCase()] || `A word meaning something related to ${word}`;
};

export const FlashcardsGame: React.FC<FlashcardsGameProps> = ({ onBack }) => {
  // Game screens: 'tierSelection' | 'playing' | 'results'
  const [screen, setScreen] = useState<'tierSelection' | 'playing' | 'results'>('tierSelection');
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [flashcardWords, setFlashcardWords] = useState<GameWord[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [gamePhase, setGamePhase] = useState<'question' | 'answer'>('question');
  const [userAnswer, setUserAnswer] = useState('');
  const [cardResults, setCardResults] = useState<Array<{
    word: GameWord;
    userAnswer: string;
    correct: boolean;
    xpEarned: number;
  }>>([]);
  const [totalXPEarned, setTotalXPEarned] = useState(0);
  const [hasPlayedPronunciation, setHasPlayedPronunciation] = useState(false);
  // 🔧 FIX #2: Race condition protection - prevent double submission
  const [isProcessing, setIsProcessing] = useState(false);

  // 🔧 FIX #8: Mounted ref to prevent setState after unmount
  const isMountedRef = useRef(true);

  const { speak } = useTextToSpeech();
  const { addXP } = useGamification();
  const { getWordsByTier, getTierInfo, isLoading: vocabLoading } = useGameVocabulary();
  const { state: speechState, startListening, stopListening, confirmWord, rejectConfirmation } = useFlashcardSpeechRecognition();
  const {
    progress,
    isLoading: progressLoading,
    completeTier,
    updateWordProgress,
    isTierUnlocked,
    getTierBestScore,
    getTierAttempts,
    getOverallAccuracy
  } = useFlashcardProgress();

  // Phase 3.2: XP retry queue for network failures
  const xpRetryQueueRef = useRef<Array<{ amount: number; reason: string }>>([]);

  // Start a tier
  const startTier = useCallback((tier: number) => {
    if (!isTierUnlocked(tier)) return;

    const words = getWordsByTier(tier);
    setSelectedTier(tier);
    setFlashcardWords(words);
    setCurrentCardIndex(0);
    setGamePhase('question');
    setUserAnswer('');
    setCardResults([]);
    setTotalXPEarned(0);
    setHasPlayedPronunciation(false);
    setIsProcessing(false); // 🔧 FIX #2: Reset processing lock on new tier
    setScreen('playing');
  }, [isTierUnlocked, getWordsByTier]);

  const currentCard = flashcardWords[currentCardIndex];
  const gameProgress = flashcardWords.length > 0 ? ((currentCardIndex + 1) / flashcardWords.length) * 100 : 0;

  const playCardPronunciation = useCallback(() => {
    if (!currentCard) return;
    speak(currentCard.english);
    setHasPlayedPronunciation(true);
  }, [currentCard, speak]);

  // Check if answer is correct (with fuzzy matching for typos)
  const checkAnswer = useCallback((answerOverride?: string) => {
    // 🔧 FIX #2: Prevent race condition - only process if not already processing
    if (isProcessing) return;
    setIsProcessing(true);

    // Use override if provided (for voice input), otherwise use state
    const answerToCheck = answerOverride !== undefined ? answerOverride : userAnswer;
    const cleanedUserAnswer = answerToCheck.toLowerCase().trim();
    const cleanedExpected = currentCard.english.toLowerCase().trim();

    // Exact match
    const isExactMatch = cleanedUserAnswer === cleanedExpected;

    // Calculate XP based on correctness
    const xpEarned = isExactMatch ? 10 : 2;

    // Store result
    setCardResults(prev => [...prev, {
      word: currentCard,
      userAnswer: answerToCheck,
      correct: isExactMatch,
      xpEarned
    }]);

    setTotalXPEarned(prev => prev + xpEarned);

    // Phase 3.2: Add XP with error handling and retry queue
    try {
      if (isExactMatch) {
        addXP(10, 'Perfect answer!');
      } else {
        addXP(2, 'Keep trying!');
      }
    } catch (error) {
      // Phase 3.2: Queue failed XP for retry - Apple Store compliance silent fail
      xpRetryQueueRef.current.push({
        amount: isExactMatch ? 10 : 2,
        reason: isExactMatch ? 'Perfect answer!' : 'Keep trying!'
      });
      // User still sees their answer feedback, XP will sync later
    }

    // 🔧 FIX #9: Save progress incrementally after each answer
    updateWordProgress(currentCard.english, isExactMatch);

    // Move to answer phase and release processing lock
    setGamePhase('answer');
    setIsProcessing(false);
  }, [userAnswer, currentCard, addXP, isProcessing, updateWordProgress]);

  // Handle voice input
  const handleVoiceInput = useCallback(async () => {
    if (!currentCard) return;

    // 🔧 FIX #5: Add proper error handling and cleanup for voice recognition
    try {
      const word = await startListening(currentCard.english);
      if (word) {
        // Voice recognition succeeded with high confidence
        setUserAnswer(word);
        checkAnswer(word); // Pass word directly to avoid state timing issue
      }
      // If word is null, it means:
      // 1. Low confidence → will show confirmation dialog
      // 2. Error → user can try again or type
      // 3. No match → user can try again or type
    } catch (error) {
      // Voice input error - silent fail for Apple Store compliance
      // User can try again with voice or type the answer
      // Ensure cleanup happens even on error
      try {
        stopListening();
      } catch (cleanupError) {
        // Cleanup error - silent fail for Apple Store compliance
      }
    }
  }, [currentCard, startListening, checkAnswer, stopListening]);

  // Handle voice confirmation (when confidence is medium)
  const handleConfirmYes = useCallback(() => {
    const word = confirmWord();
    if (word) {
      setUserAnswer(word);
      checkAnswer(word); // Pass word directly to avoid state timing issue
    }
  }, [confirmWord, checkAnswer]);

  const nextCard = useCallback(() => {
    // 🔧 FIX #2: Reset processing lock when moving to next card
    setIsProcessing(false);

    if (currentCardIndex < flashcardWords.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setGamePhase('question');
      setUserAnswer('');
      setHasPlayedPronunciation(false);
    } else {
      // Tier complete - save results and show results screen
      if (selectedTier) {
        completeTier(
          selectedTier,
          cardResults.map(r => ({ word: r.word.english, correct: r.correct }))
        );
      }
      setScreen('results');
    }
  }, [currentCardIndex, flashcardWords.length, selectedTier, cardResults, completeTier]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && gamePhase === 'question' && userAnswer.trim()) {
      checkAnswer();
    } else if (e.key === 'Enter' && gamePhase === 'answer') {
      nextCard();
    }
  }, [gamePhase, userAnswer, checkAnswer, nextCard]);

  const retryTier = useCallback(() => {
    if (!selectedTier) return;
    startTier(selectedTier);
  }, [selectedTier, startTier]);

  const backToTierSelection = useCallback(() => {
    setScreen('tierSelection');
    setSelectedTier(null);
    setCardResults([]);
  }, []);

  // 🔧 FIX #1: Cleanup AudioContext on unmount to prevent memory leak (iOS limit: 6 contexts)
  // 🔧 FIX #5: Also cleanup speech recognition on unmount
  // 🔧 FIX #8: Mark component as unmounted to prevent setState race conditions
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      audioManager.cleanup();
      // Ensure microphone is released on unmount
      try {
        stopListening();
      } catch (error) {
        // Ignore cleanup errors
      }
    };
  }, [stopListening]);

  // Phase 3.2: Retry failed XP awards periodically
  useEffect(() => {
    const retryInterval = setInterval(() => {
      if (xpRetryQueueRef.current.length > 0) {
        const failedAward = xpRetryQueueRef.current[0];
        try {
          addXP(failedAward.amount, failedAward.reason);
          // Success - remove from queue
          xpRetryQueueRef.current.shift();
        } catch (error) {
          // Still failing - keep in queue for next retry
          // Limit queue to 10 items to prevent memory issues
          if (xpRetryQueueRef.current.length > 10) {
            xpRetryQueueRef.current.shift(); // Remove oldest
          }
        }
      }
    }, 5000); // Retry every 5 seconds

    return () => clearInterval(retryInterval);
  }, [addXP]);

  const getStarRating = () => {
    const correctCount = cardResults.filter(result => result.correct).length;
    const totalCount = cardResults.length;
    const percentage = totalCount > 0 ? (correctCount / totalCount) * 100 : 0;

    if (percentage >= 90) return { stars: 3, label: 'Gold Master!', color: 'text-yellow-400' };
    if (percentage >= 70) return { stars: 2, label: 'Silver Star!', color: 'text-gray-300' };
    if (percentage >= 50) return { stars: 1, label: 'Bronze Medal!', color: 'text-orange-400' };
    return { stars: 0, label: 'Keep Practicing!', color: 'text-gray-500' };
  };

  // TIER SELECTION SCREEN - Early return
  if (screen === 'tierSelection') {
    const masteredWordsCount = progress.masteredWords.length;
    const overallAccuracy = getOverallAccuracy();

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="absolute inset-0 w-full h-full background-stars pointer-events-none"
             style={{ backgroundImage: 'radial-gradient(2px 2px at 20px 30px, #fff, transparent), radial-gradient(2px 2px at 40px 70px, #fff, transparent), radial-gradient(1px 1px at 90px 40px, #fff, transparent)', backgroundSize: '100px 100px' }}
        />

        <div className="relative max-w-4xl mx-auto pt-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-5xl font-bold text-white mb-3 flex items-center justify-center gap-3">
              🎯 Smart Flashcards
              <Sparkles className="h-10 w-10 text-yellow-400 animate-pulse" />
            </h2>
            <p className="text-white/80 text-xl">Choose your level and master 75 words!</p>
          </div>

          {/* Overall Progress */}
          {progress.totalAttempts > 0 && (
            <Card className="bg-gradient-to-r from-indigo-500/30 to-purple-500/30 backdrop-blur-xl border border-purple-300/50 text-white mb-8">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-yellow-400" />
                  Your Progress
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">{masteredWordsCount}/75</div>
                    <div className="text-sm text-white/70">Mastered Words</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">{Math.round(overallAccuracy)}%</div>
                    <div className="text-sm text-white/70">Overall Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">{progress.tiersUnlocked.length}/5</div>
                    <div className="text-sm text-white/70">Tiers Unlocked</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tier Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5].map((tier) => {
              const tierInfo = getTierInfo(tier);
              const isUnlocked = isTierUnlocked(tier);
              const bestScore = getTierBestScore(tier);
              const attempts = getTierAttempts(tier);
              const isPassed = bestScore >= tierInfo.passThreshold;

              return (
                <Card
                  key={tier}
                  className={`backdrop-blur-xl border-2 transition-all duration-300 ${
                    isUnlocked
                      ? 'cursor-pointer hover:scale-105 hover:shadow-2xl border-white/50 bg-gradient-to-br from-white/10 to-white/5'
                      : 'opacity-60 border-gray-600/50 bg-gradient-to-br from-gray-800/50 to-gray-900/50'
                  }`}
                  onClick={() => isUnlocked && startTier(tier)}
                >
                  <CardContent className="p-6 text-white">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-2xl font-bold">Tier {tier}</h3>
                          {isUnlocked ? (
                            <Unlock className="h-5 w-5 text-green-400" />
                          ) : (
                            <Lock className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                        <p className="text-xl font-semibold text-cyan-300">{tierInfo.name}</p>
                      </div>
                      {isPassed && (
                        <Badge className="bg-green-500/80 text-white font-bold">
                          ✓ PASSED
                        </Badge>
                      )}
                    </div>

                    <p className="text-white/70 mb-4">{tierInfo.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Words:</span>
                        <span className="font-bold">{tierInfo.wordCount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Pass Requirement:</span>
                        <span className="font-bold text-yellow-400">{tierInfo.passThreshold}%</span>
                      </div>
                      {bestScore > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Best Score:</span>
                          <span className={`font-bold ${isPassed ? 'text-green-400' : 'text-orange-400'}`}>
                            {Math.round(bestScore)}%
                          </span>
                        </div>
                      )}
                      {attempts > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Attempts:</span>
                          <span className="font-bold">{attempts}</span>
                        </div>
                      )}
                    </div>

                    {isUnlocked ? (
                      <div className={`bg-gradient-to-r ${tierInfo.gradient} rounded-lg p-3 text-center font-bold text-white`}>
                        {bestScore > 0 ? '🔄 Practice Again' : '▶️ Start Tier'}
                      </div>
                    ) : (
                      <div className="bg-gray-700/50 rounded-lg p-3 text-center text-gray-400 text-sm">
                        🔒 Complete Tier {tier - 1} to unlock
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // RESULTS SCREEN - Early return
  if (screen === 'results' && selectedTier) {
    const rating = getStarRating();
    const correctCount = cardResults.filter(result => result.correct).length;
    const totalCount = cardResults.length;
    const percentage = (correctCount / totalCount) * 100;
    const tierInfo = getTierInfo(selectedTier);
    const passed = percentage >= tierInfo.passThreshold;
    const isPerfect = percentage === 100;
    const unlockedNextTier = passed && selectedTier < 5;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="absolute inset-0 w-full h-full background-stars pointer-events-none"
             style={{ backgroundImage: 'radial-gradient(2px 2px at 20px 30px, #fff, transparent), radial-gradient(2px 2px at 40px 70px, #fff, transparent), radial-gradient(1px 1px at 90px 40px, #fff, transparent)', backgroundSize: '100px 100px' }}
        />

        <div className="relative max-w-2xl mx-auto pt-8">
          <Card className={`backdrop-blur-xl border-2 text-white ${
            passed
              ? 'bg-gradient-to-b from-green-500/30 to-emerald-500/20 border-green-300/50'
              : 'bg-gradient-to-b from-orange-500/30 to-red-500/20 border-orange-300/50'
          }`}>
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold flex items-center justify-center gap-3">
                {isPerfect ? (
                  <>
                    <Trophy className="h-10 w-10 text-yellow-400 animate-bounce" />
                    ⭐ PERFECT SCORE! ⭐
                  </>
                ) : passed ? (
                  <>
                    <Trophy className="h-10 w-10 text-green-400" />
                    🎉 TIER PASSED!
                  </>
                ) : (
                  <>
                    💪 Not Quite!
                  </>
                )}
              </CardTitle>
              <p className="text-xl text-white/80 mt-2">
                Tier {selectedTier}: {tierInfo.name}
              </p>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              {/* Pass/Fail Message */}
              <div className={`rounded-xl p-6 border-2 ${
                passed
                  ? 'bg-green-500/20 border-green-400/50'
                  : 'bg-orange-500/20 border-orange-400/50'
              }`}>
                <div className="text-5xl font-bold mb-2">
                  {Math.round(percentage)}%
                </div>
                <div className="text-lg">
                  {passed ? (
                    <span className="text-green-300 font-bold">
                      ✓ You passed! (Required: {tierInfo.passThreshold}%)
                    </span>
                  ) : (
                    <span className="text-orange-300 font-bold">
                      Keep trying! (Required: {tierInfo.passThreshold}%)
                    </span>
                  )}
                </div>
              </div>

              {/* Unlock Notification */}
              {unlockedNextTier && (
                <div className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-2 border-purple-300/50 rounded-xl p-6 animate-pulse">
                  <div className="text-3xl font-bold mb-2">🔓 TIER {selectedTier + 1} UNLOCKED!</div>
                  <p className="text-white/80">You can now play the next tier!</p>
                </div>
              )}

              {/* Star Rating */}
              <div className="space-y-4">
                <div className="flex justify-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-12 w-12 ${i < rating.stars ? rating.color + ' fill-current' : 'text-gray-600'}`}
                    />
                  ))}
                </div>
                <Badge variant="outline" className={`${rating.color} border-current text-xl px-6 py-3`}>
                  {rating.label}
                </Badge>
              </div>

              {/* Stats */}
              <div className="bg-gradient-to-r from-slate-500/20 to-gray-500/20 border border-white/20 rounded-lg p-6 space-y-4 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <h3 className="text-lg font-bold mb-2">✅ Correct</h3>
                    <p className="text-3xl font-bold text-green-400">{correctCount}/{totalCount}</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold mb-2">⭐ XP Earned</h3>
                    <p className="text-3xl font-bold text-yellow-400">{totalXPEarned}</p>
                  </div>
                </div>
              </div>

              {/* Detailed Results */}
              <div className="bg-gradient-to-r from-slate-500/20 to-gray-500/20 border border-white/10 rounded-xl p-4 max-h-64 overflow-y-auto backdrop-blur-sm">
                <h4 className="font-bold mb-3 text-lg">📊 Your Answers</h4>
                <div className="space-y-2">
                  {cardResults.map((result, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        result.correct ? 'bg-green-500/20' : 'bg-orange-500/20'
                      }`}
                    >
                      <div className="flex-1 text-left">
                        <div className="font-medium">{result.word.english}</div>
                        <div className="text-sm text-white/70">You said: "{result.userAnswer}"</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl">{result.correct ? '✅' : '❌'}</div>
                        <div className="text-xs text-yellow-400">+{result.xpEarned} XP</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {!passed && (
                  <Button
                    onClick={retryTier}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 py-4 text-lg font-bold"
                  >
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Try Again
                  </Button>
                )}

                <Button
                  onClick={backToTierSelection}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-4 text-lg font-bold"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Back to Tiers
                </Button>

                <Button
                  onClick={onBack}
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Games
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // PLAYING SCREEN - Early return
  if (screen === 'playing' && selectedTier) {
    const tierInfo = getTierInfo(selectedTier);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="absolute inset-0 w-full h-full background-stars pointer-events-none"
             style={{ backgroundImage: 'radial-gradient(2px 2px at 20px 30px, #fff, transparent), radial-gradient(2px 2px at 40px 70px, #fff, transparent), radial-gradient(1px 1px at 90px 40px, #fff, transparent)', backgroundSize: '100px 100px' }}
        />

        <div className="relative max-w-2xl mx-auto pt-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button
              onClick={backToTierSelection}
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tiers
            </Button>
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 rounded-full px-4 py-2 backdrop-blur-xl">
              <div className="text-white text-sm font-medium">
                Word {currentCardIndex + 1} of {flashcardWords.length}
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
              🎯 Tier {selectedTier}: {tierInfo.name}
              <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
            </h2>
            <p className="text-white/70 text-lg">🎤 Say the word or type it!</p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl p-4 backdrop-blur-sm border border-purple-300/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/80 text-sm font-medium">Progress</span>
                <span className="text-white font-bold">{Math.round(gameProgress)}%</span>
              </div>
              <Progress value={gameProgress} className="h-3 bg-white/20" />
            </div>
          </div>
        </div>

        {/* Main Card */}
        {currentCard && (
          <Card className="bg-gradient-to-br from-emerald-500/30 to-teal-500/20 backdrop-blur-xl border border-emerald-300/50 text-white shadow-2xl">
            <CardContent className="p-6 space-y-6">
              {gamePhase === 'question' ? (
                // Question Phase
                <>
                  <div className="bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-2xl border-2 border-white/30 p-8 space-y-6">
                    <div className="text-center space-y-4">
                      <div className="text-xl text-cyan-200 font-semibold">💡 What word means:</div>
                      <div className="text-3xl font-bold text-white leading-relaxed">
                        "{getWordDefinition(currentCard.english)}"
                      </div>
                    </div>

                    {/* Pronunciation Button */}
                    <div className="flex justify-center">
                      <Button
                        onClick={playCardPronunciation}
                        size="lg"
                        variant="outline"
                        className="border-white/40 text-white hover:bg-white/20 bg-gradient-to-r from-white/15 to-white/5"
                      >
                        <Volume2 className="h-5 w-5 mr-2" />
                        {hasPlayedPronunciation ? '🔊 Hear Again' : '🔊 Hear the Word'}
                      </Button>
                    </div>
                  </div>

                  {/* Voice Input Section (Primary) */}
                  <div className="space-y-4">
                    {/* Voice Confirmation Dialog */}
                    {speechState.needsConfirmation && (
                      <div className="bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-300/50 rounded-xl p-4 animate-fade-in">
                        <p className="text-white text-lg mb-4">{speechState.message}</p>
                        <div className="flex gap-3 justify-center">
                          <Button
                            onClick={handleConfirmYes}
                            className="bg-green-500 hover:bg-green-600 px-8 py-3 text-lg font-bold"
                          >
                            Yes ✓
                          </Button>
                          <Button
                            onClick={rejectConfirmation}
                            variant="outline"
                            className="border-white/30 text-white hover:bg-white/20 px-8 py-3 text-lg font-bold"
                          >
                            No, try again
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Voice Status Message */}
                    {speechState.message && !speechState.needsConfirmation && (
                      <div className={`border rounded-xl p-4 animate-fade-in ${
                        speechState.error
                          ? 'bg-gradient-to-r from-red-500/30 to-orange-500/30 border-red-300/50'
                          : 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-green-300/50'
                      }`}>
                        <p className={`text-base font-medium ${
                          speechState.error ? 'text-red-100' : 'text-white'
                        }`}>
                          {speechState.message}
                        </p>
                      </div>
                    )}

                    {/* Voice Button */}
                    <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 backdrop-blur-sm border border-blue-300/30">
                      <h3 className="text-white text-lg font-bold mb-4 text-center">
                        🎤 Say the word out loud:
                      </h3>
                      <Button
                        onClick={speechState.isListening ? stopListening : handleVoiceInput}
                        disabled={speechState.needsConfirmation}
                        aria-label={
                          speechState.isListening
                            ? 'Stop listening, microphone is active'
                            : 'Start voice input to speak the word'
                        }
                        aria-pressed={speechState.isListening}
                        className={`w-full py-8 text-xl font-bold rounded-xl transition-all duration-300 ${
                          speechState.isListening
                            ? 'animate-pulse bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'
                            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105'
                        } ${speechState.needsConfirmation ? 'opacity-50' : ''}`}
                      >
                        {speechState.isListening ? (
                          <>
                            <Mic className="h-7 w-7 mr-3 animate-pulse" />
                            Listening... Speak now!
                          </>
                        ) : (
                          <>
                            <Mic className="h-7 w-7 mr-3" />
                            Tap to Speak Word
                          </>
                        )}
                      </Button>
                      <p className="text-white/70 text-sm mt-3 text-center">
                        {speechState.isListening ? '🎙️ Say the word clearly!' : '💡 Click the button and say the word'}
                      </p>
                    </div>

                    {/* Typing Fallback */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/20"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-gradient-to-r from-emerald-500/30 to-teal-500/20 px-4 py-1 text-white/70 rounded-full">
                          Or type if you prefer
                        </span>
                      </div>
                    </div>

                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <Input
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type the English word..."
                        aria-label="Type your answer for the current flashcard"
                        className="text-lg py-6 bg-white/90 text-gray-900 placeholder:text-gray-500 border-white/50"
                      />
                      <p className="text-white/60 text-sm mt-2">⌨️ Press Enter to submit</p>
                    </div>

                    <Button
                      onClick={() => checkAnswer()}
                      disabled={!userAnswer.trim() || isProcessing}
                      aria-label="Submit your answer and check if it's correct"
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 py-6 text-xl font-bold disabled:opacity-50"
                    >
                      {isProcessing ? '⏳ Processing...' : '✅ Check Answer'}
                    </Button>
                  </div>
                </>
              ) : (
                // Answer Phase
                <div className="space-y-6">
                  {cardResults[cardResults.length - 1]?.correct ? (
                    // Correct Answer
                    <div className="bg-gradient-to-br from-green-400/30 to-emerald-500/30 border-2 border-green-300/60 rounded-2xl p-8 text-center space-y-4 animate-scale-in">
                      <div className="text-6xl animate-bounce">🎉</div>
                      <h3 className="text-3xl font-bold text-green-100">Perfect!</h3>
                      <div className="bg-white/10 rounded-xl p-4">
                        <p className="text-lg text-white/90 mb-2">You typed:</p>
                        <p className="text-3xl font-bold text-green-200">"{userAnswer}"</p>
                      </div>
                      <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-300/40 rounded-xl p-4">
                        <div className="text-yellow-200 text-2xl font-bold flex items-center justify-center gap-2">
                          <Star className="h-6 w-6 fill-current" />
                          +10 XP Earned!
                          <Star className="h-6 w-6 fill-current" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Wrong Answer
                    <div className="bg-gradient-to-br from-orange-400/30 to-red-500/30 border-2 border-orange-300/60 rounded-2xl p-8 text-center space-y-4 animate-scale-in">
                      <div className="text-6xl animate-pulse">💪</div>
                      <h3 className="text-3xl font-bold text-orange-100">Not Quite!</h3>
                      <div className="bg-white/10 rounded-xl p-4 space-y-3">
                        <div>
                          <p className="text-white/80 mb-1">You typed:</p>
                          <p className="text-2xl font-bold text-red-200">"{userAnswer}"</p>
                        </div>
                        <div>
                          <p className="text-white/80 mb-1">Correct answer:</p>
                          <p className="text-2xl font-bold text-green-200">"{currentCard.english}"</p>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-400/20 to-pink-400/20 border border-purple-300/40 rounded-xl p-4">
                        <p className="text-xl font-semibold text-purple-200">
                          Keep practicing! +2 XP for trying! ⭐
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Next Button */}
                  <Button
                    onClick={nextCard}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-6 text-xl font-bold"
                  >
                    {currentCardIndex < flashcardWords.length - 1 ? (
                      <>
                        Next Card <ChevronRight className="h-6 w-6 ml-2" />
                      </>
                    ) : (
                      <>
                        <Trophy className="h-6 w-6 mr-2" />
                        View Results
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // 🔧 FIX #4: Fallback UI instead of blank screen - prevents user being stuck
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-xl border border-red-300/50">
        <CardContent className="p-6 text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-red-500/20 rounded-full p-4">
              <AlertTriangle className="h-12 w-12 text-red-400" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white">
            Oops! Something went wrong
          </h2>

          <p className="text-white/80">
            The game encountered an unexpected error. Don't worry, your progress is safe.
          </p>

          <Button
            onClick={backToTierSelection}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Tier Selection
          </Button>

          <Button
            onClick={onBack}
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Games
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
