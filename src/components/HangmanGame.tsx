import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Confetti from 'react-confetti';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Volume2, RotateCcw, Trophy, Lightbulb, Settings } from 'lucide-react';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useGamification } from '@/hooks/useGamification';
import { useGameVocabulary, type GameWord } from '@/hooks/useGameVocabulary';
import { HangmanSVG } from './HangmanSVG';
import { HangmanKeyboard } from './HangmanKeyboard';
import { useWindowSize } from '@react-hook/window-size';
import { audioManager } from '@/utils/audioContext';

interface HangmanGameProps {
  onBack: () => void;
}

type Difficulty = 'easy' | 'medium' | 'hard';

export const HangmanGame: React.FC<HangmanGameProps> = ({ onBack }) => {
  const [width, height] = useWindowSize();
  const isMobile = width < 768;
  const [word, setWord] = useState<string>('');
  const [currentWordData, setCurrentWordData] = useState<GameWord | null>(null);
  const [revealed, setRevealed] = useState<string[]>([]);
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [correctLetters, setCorrectLetters] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState(0);
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintLetter, setHintLetter] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [showSettings, setShowSettings] = useState(false);
  // 🔧 FIX #7: Prevent hint button double-tap
  const [isHintProcessing, setIsHintProcessing] = useState(false);

  // Refs for preventing race conditions and memory leaks
  const isInitialMount = useRef(true);
  const gameInitialized = useRef(false);
  // Phase 1.4: Track hint timeout to prevent memory leak
  const hintTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Phase 3.1: XP retry queue for network failures
  const xpRetryQueueRef = useRef<Array<{ amount: number; reason: string }>>([]);

  const difficultySettings = {
    easy: { maxWrong: 10, label: 'Easy', color: 'from-green-500 to-emerald-600' },
    medium: { maxWrong: 6, label: 'Medium', color: 'from-blue-500 to-purple-600' },
    hard: { maxWrong: 3, label: 'Hard', color: 'from-red-500 to-pink-600' }
  };

  const maxWrong = difficultySettings[difficulty].maxWrong;

  const { speak } = useTextToSpeech();
  const { addXP } = useGamification();
  const { getWordsForHangman, isLoading: vocabLoading } = useGameVocabulary();

  // Start new game - memoized to prevent recreations
  const startNewGame = useCallback(() => {
    const availableWords = getWordsForHangman();
    if (availableWords.length === 0) return;

    // 🔧 FIX #18: Add null safety check for random word selection
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const randomWord = availableWords[randomIndex];
    if (!randomWord || !randomWord.english) return;

    const gameWord = randomWord.english.toUpperCase();

    // Batch all state updates together to prevent multiple renders
    setWord(gameWord);
    setCurrentWordData(randomWord);
    setRevealed(gameWord.split('').map(() => '_'));
    setGuessed(new Set());
    setCorrectLetters(new Set());
    setWrong(0);
    setStatus('playing');
    setShowHint(false);
    setHintLetter(null);
    setIsHintProcessing(false); // 🔧 FIX #7: Reset hint processing lock
  }, [getWordsForHangman]);

  // 🔧 FIX #3: Initialize game ONCE on mount with proper dependencies
  useEffect(() => {
    if (!vocabLoading && !gameInitialized.current) {
      gameInitialized.current = true;
      startNewGame();
    }
  }, [vocabLoading, startNewGame]); // Safe now that getWordsForHangman is memoized

  // Check win/loss conditions
  useEffect(() => {
    if (status === 'playing' && word) {
      if (revealed.join('') === word) {
        setStatus('won');
        const baseXP = 50;
        const difficultyMultiplier = difficulty === 'hard' ? 2 : difficulty === 'medium' ? 1.5 : 1;
        const streakBonus = streak * 10;
        const xpEarned = Math.floor(baseXP * difficultyMultiplier) + streakBonus;

        setScore(prev => prev + 10);
        setStreak(prev => prev + 1);

        // Phase 3.1: Handle XP network errors gracefully with retry queue
        try {
          addXP(xpEarned, `Hangman victory! 🎉 Streak: ${streak + 1}`);
        } catch (error) {
          // Phase 3.1: Queue failed XP for retry - Apple Store compliance silent fail
          xpRetryQueueRef.current.push({
            amount: xpEarned,
            reason: `Hangman victory! 🎉 Streak: ${streak + 1}`
          });
          // User still sees success animation, XP will sync later
        }

        // Play success sound using singleton
        audioManager.playSuccessSound();
      } else if (wrong >= maxWrong) {
        setStatus('lost');
        setStreak(0);

        // Play failure sound using singleton
        audioManager.playFailureSound();
      }
    }
  }, [revealed, wrong, status, word, addXP, difficulty, streak, maxWrong]);

  // Cleanup audio context and timers on unmount
  useEffect(() => {
    return () => {
      // Phase 1.4: Clear hint timeout to prevent memory leak
      if (hintTimeoutRef.current) {
        clearTimeout(hintTimeoutRef.current);
        hintTimeoutRef.current = null;
      }
      audioManager.cleanup();
    };
  }, []);

  // Phase 3.1: Retry failed XP awards periodically
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

  // Process a letter guess - optimized with batched state updates and case normalization
  const processGuess = useCallback((letter: string) => {
    if (!word || status !== 'playing') return;

    // Normalize to lowercase for all internal operations
    const lowerLetter = letter.toLowerCase();
    const upperLetter = letter.toUpperCase();

    // Check if already guessed
    if (guessed.has(lowerLetter)) {
      // Light vibration for already guessed
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
      return;
    }

    // Light vibration on any click
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }

    // Check if letter is in word
    const isCorrect = word.includes(upperLetter);

    if (isCorrect) {
      // Correct guess - play success sound
      audioManager.playClickSound();

      // Reveal all instances of the letter
      const newRevealed = revealed.map((char, index) =>
        word[index] === upperLetter ? upperLetter : char
      );

      // Batch state updates to prevent multiple renders
      setGuessed(prev => new Set([...prev, lowerLetter]));
      setCorrectLetters(prev => new Set([...prev, lowerLetter]));
      setRevealed(newRevealed);
    } else {
      // Wrong guess - increment wrong guesses
      // Batch state updates
      setGuessed(prev => new Set([...prev, lowerLetter]));
      setWrong(prev => prev + 1);

      // Stronger vibration feedback on wrong guess
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
      }
    }
  }, [word, status, guessed, revealed]);

  // Handle word pronunciation - memoized
  const playWordPronunciation = useCallback(() => {
    if (!word) return;
    speak(word);
  }, [word, speak]);

  // Handle hint - reveals a random unrevealed letter
  const handleHint = useCallback(() => {
    // 🔧 FIX #7: Prevent double-tap by checking processing state
    if (isHintProcessing) return;

    if (showHint) {
      setShowHint(false);
      setHintLetter(null);
      setIsHintProcessing(false);
      return;
    }

    // Get unrevealed letters from the word
    const unrevealedLetters = word
      .split('')
      .filter(letter => !guessed.has(letter.toLowerCase()));

    if (unrevealedLetters.length > 0 && wrong + 1 < maxWrong) {
      // Lock to prevent double-tap
      setIsHintProcessing(true);

      // Pick a random unrevealed letter
      const randomLetter = unrevealedLetters[Math.floor(Math.random() * unrevealedLetters.length)];

      setWrong(prev => prev + 1);
      setShowHint(true);
      setHintLetter(randomLetter);

      // Phase 1.4: Store timeout ID for cleanup - Release lock after state updates
      hintTimeoutRef.current = setTimeout(() => setIsHintProcessing(false), 300);
    }
  }, [showHint, wrong, maxWrong, word, guessed, isHintProcessing]);

  // Handle keyboard letter click - already using processGuess which is memoized
  const handleLetterClick = processGuess;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      {/* Confetti on win - decorative, hidden from screen readers */}
      {status === 'won' && (
        <div className="fixed inset-0 pointer-events-none z-50" aria-hidden="true">
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={isMobile ? 50 : 150}
            gravity={0.4}
            tweenDuration={3000}
          />
        </div>
      )}

      {/* Decorative background - hidden from screen readers */}
      <div className="fixed inset-0 w-full h-full background-stars pointer-events-none -z-10"
           aria-hidden="true"
           style={{ backgroundImage: 'radial-gradient(2px 2px at 20px 30px, #fff, transparent), radial-gradient(2px 2px at 40px 70px, #fff, transparent), radial-gradient(1px 1px at 90px 40px, #fff, transparent)', backgroundSize: '100px 100px' }}
      />

      <main
           role="main"
           aria-label="Hangman word guessing game"
           className="relative container max-w-md mx-auto px-3 py-2"
           style={{
             paddingTop: 'max(0.5rem, env(safe-area-inset-top))',
             paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
             userSelect: 'none',
             WebkitUserSelect: 'none'
           }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            aria-label="Go back to main menu"
            className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 min-h-[44px]"
          >
            <ArrowLeft className="h-4 w-4 mr-1" aria-hidden="true" />
            Back
          </Button>

          <div className="flex items-center gap-2" role="status" aria-live="polite">
            {/* Streak */}
            {streak > 0 && (
              <div
                className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/50 rounded-full px-2 py-1 backdrop-blur-xl"
                aria-label={`Current win streak: ${streak}`}
              >
                <div className="text-white text-xs flex items-center gap-1">
                  <span aria-hidden="true">🔥</span> <span className="font-bold text-yellow-400">{streak}</span>
                </div>
              </div>
            )}

            {/* Score */}
            <div
              className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/20 rounded-full px-2 py-1 backdrop-blur-xl"
              aria-label={`Current score: ${score} points`}
            >
              <div className="text-white text-xs flex items-center gap-1">
                <Trophy className="h-3 w-3 text-yellow-400" aria-hidden="true" />
                <span className="font-bold text-yellow-400">{score}</span>
              </div>
            </div>

            {/* Settings */}
            <Button
              onClick={() => setShowSettings(!showSettings)}
              variant="ghost"
              size="sm"
              aria-label={showSettings ? 'Close settings' : 'Open difficulty settings'}
              aria-expanded={showSettings}
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-2 min-h-[44px] min-w-[44px]"
            >
              <Settings className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <Card
            className="mb-3 bg-gradient-to-br from-violet-500/20 to-purple-500/20 backdrop-blur-xl border border-purple-300/50 animate-fade-in"
            role="dialog"
            aria-labelledby="settings-title"
          >
            <CardContent className="p-3">
              <h3 id="settings-title" className="text-white font-bold text-base mb-3">Difficulty Level</h3>
              <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Select difficulty level">
                {(Object.keys(difficultySettings) as Difficulty[]).map((diff) => (
                  <Button
                    key={diff}
                    onClick={() => {
                      setDifficulty(diff);
                      setShowSettings(false);
                      startNewGame();
                    }}
                    role="radio"
                    aria-checked={difficulty === diff}
                    aria-label={`${difficultySettings[diff].label} difficulty with ${difficultySettings[diff].maxWrong} lives`}
                    className={`py-3 ${
                      difficulty === diff
                        ? `bg-gradient-to-r ${difficultySettings[diff].color} text-white`
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {difficultySettings[diff].label}
                    <br />
                    <span className="text-xs">({difficultySettings[diff].maxWrong} lives)</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Game Header */}
        <div className="text-center mb-3">
          <div className="flex items-center justify-center gap-2 mb-1">
            <h2 className="text-2xl font-bold text-white">Hangman</h2>
            <Badge className={`bg-gradient-to-r ${difficultySettings[difficulty].color} text-white px-2 py-0.5 text-xs`}>
              {difficultySettings[difficulty].label}
            </Badge>
          </div>
          <p className="text-white/70 text-sm">
            {status === 'playing' ? 'Tap letters to guess!' : 'Game Over'}
          </p>
        </div>

        <div className="flex flex-col gap-2 space-y-2">
          {/* Hangman Visual */}
          <Card className="bg-gradient-to-br from-violet-500/30 to-purple-500/20 backdrop-blur-xl border border-purple-300/50 text-white shadow-lg">
            <CardContent className="p-3">
              <HangmanSVG wrongCount={wrong} maxWrong={maxWrong} />

              {/* Lives Indicator */}
              <div
                className="mt-2 text-center"
                role="status"
                aria-live="polite"
                aria-label={`${maxWrong - wrong} ${maxWrong - wrong === 1 ? 'life' : 'lives'} remaining out of ${maxWrong}`}
              >
                <div className="flex justify-center gap-1.5 mb-1" aria-hidden="true">
                  {Array.from({ length: maxWrong }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        i < wrong
                          ? 'bg-red-500 shadow-lg shadow-red-500/50'
                          : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-white/60 text-xs">
                  {maxWrong - wrong} {maxWrong - wrong === 1 ? 'life' : 'lives'} left
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Word Display & Game Interface */}
          <div className="space-y-2">
            {/* Word Display */}
            <Card className="bg-gradient-to-br from-blue-500/30 to-purple-500/20 backdrop-blur-xl border border-blue-300/50 text-white shadow-lg">
              <CardContent className="p-3">
                <div className="text-center space-y-2">
                  {/* Word letters */}
                  <div
                    className="flex flex-wrap justify-center gap-1.5 items-center min-h-[50px]"
                    role="group"
                    aria-label={`Word to guess: ${revealed.map(l => l === '_' ? 'blank' : l).join(' ')}`}
                  >
                    {word.split('').map((char, index) => (
                      <div
                        key={index}
                        aria-label={revealed[index] !== '_' ? revealed[index] : 'blank letter'}
                        className={`
                          w-9 h-11 text-xl
                          flex items-center justify-center
                          font-bold
                          border-b-4 border-white/50
                          ${revealed[index] !== '_' ? 'animate-letter-reveal' : ''}
                        `}
                      >
                        {char === ' ' ? (
                          <span className="opacity-0">_</span>
                        ) : revealed[index] !== '_' ? (
                          <span className="text-white drop-shadow-lg">
                            {revealed[index]}
                          </span>
                        ) : (
                          <span className="text-white/20" aria-hidden="true">_</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Hint Display */}
                  {showHint && hintLetter && (
                    <div
                      className="bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border border-yellow-300/50 rounded-xl p-4 animate-fade-in"
                      role="alert"
                      aria-live="polite"
                    >
                      <p className="text-yellow-100 text-sm mb-1"><span aria-hidden="true">💡</span> Hint - Try this letter:</p>
                      <p className="text-white font-bold text-4xl tracking-wider" aria-label={`Hint letter is ${hintLetter}`}>{hintLetter}</p>
                    </div>
                  )}

                  {/* Hint Button */}
                  {status === 'playing' && !showHint && currentWordData && wrong + 1 < maxWrong && (
                    <Button
                      onClick={handleHint}
                      disabled={isHintProcessing}
                      variant="outline"
                      size="sm"
                      aria-label={isHintProcessing ? 'Getting hint' : 'Get a hint, costs one life'}
                      className="border-yellow-400/50 text-yellow-300 hover:bg-yellow-500/20 disabled:opacity-50"
                    >
                      <Lightbulb className="h-4 w-4 mr-2" aria-hidden="true" />
                      {isHintProcessing ? 'Getting hint...' : 'Need a hint? (-1 life)'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Main Game Interface */}
            {status === 'playing' && (
              <Card className="bg-gradient-to-br from-violet-500/30 to-purple-500/20 backdrop-blur-xl border border-purple-300/50 text-white shadow-lg">
                <CardContent className="p-3 space-y-2">
                  {/* Keyboard */}
                  <div className="pt-4" role="group" aria-label="Letter selection keyboard">
                    <HangmanKeyboard
                      guessedLetters={guessed}
                      correctLetters={correctLetters}
                      onLetterClick={handleLetterClick}
                      disabled={status !== 'playing'}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Game Over States */}
            {status !== 'playing' && (
              <Card
                className="bg-gradient-to-br from-violet-500/30 to-purple-500/20 backdrop-blur-xl border border-purple-300/50 text-white shadow-2xl animate-fade-in"
                role="alert"
                aria-live="assertive"
              >
                <CardContent className={isMobile ? 'p-4' : 'p-6 sm:p-8'}>
                  <div className={`text-center ${isMobile ? 'space-y-3' : 'space-y-6'}`}>
                    {status === 'won' ? (
                      <div>
                        <div className="text-6xl sm:text-8xl mb-4 animate-bounce" aria-hidden="true">🎉</div>
                        <h3 className="text-3xl sm:text-4xl font-bold text-green-200 mb-3">You Won!</h3>
                        <p className="text-white/90 text-lg sm:text-xl mb-4">
                          The word was: <span className="font-bold text-yellow-300 text-2xl">{word}</span>
                        </p>
                        {streak > 1 && (
                          <div className="bg-gradient-to-r from-orange-400/30 to-yellow-400/30 rounded-lg p-4 mb-4">
                            <p className="text-2xl font-bold text-orange-200"><span aria-hidden="true">🔥</span> {streak} Win Streak! <span aria-hidden="true">🔥</span></p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div className="text-6xl sm:text-8xl mb-4" aria-hidden="true">😔</div>
                        <h3 className="text-3xl sm:text-4xl font-bold text-red-200 mb-3">Game Over</h3>
                        <p className="text-white/90 text-lg mb-2">The word was:</p>
                        <p className="text-3xl sm:text-4xl font-bold text-white bg-black/20 rounded-lg p-4">{word}</p>
                        {currentWordData && (
                          <p className="text-white/70 text-base mt-3">
                            ({currentWordData.turkish})
                          </p>
                        )}
                      </div>
                    )}

                    <div className="space-y-3">
                      <Button
                        onClick={playWordPronunciation}
                        variant="outline"
                        aria-label={`Hear pronunciation of ${word}`}
                        className="w-full border-white/30 text-white hover:bg-white/20 py-4 text-base sm:text-lg"
                      >
                        <Volume2 className="h-5 w-5 mr-3" aria-hidden="true" />
                        Hear Pronunciation
                      </Button>

                      <Button
                        onClick={startNewGame}
                        aria-label="Start a new game with a different word"
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 py-4 text-base sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        <RotateCcw className="h-5 w-5 mr-3" aria-hidden="true" />
                        New Word
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
