import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Mic, Volume2, RotateCcw, Trophy, Target, Heart, Zap, Eye, HelpCircle, Star, Flame } from 'lucide-react';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useGamification } from '@/hooks/useGamification';
import { useHangmanDifficulty } from '@/hooks/useHangmanDifficulty';
import { useHangmanSpeechRecognition } from '@/hooks/useHangmanSpeechRecognition';
import { useHangmanAchievements } from '@/hooks/useHangmanAchievements';

interface HangmanGameProps {
  onBack: () => void;
}

export const HangmanGame: React.FC<HangmanGameProps> = ({ onBack }) => {
  const [word, setWord] = useState<string>('');
  const [hint, setHint] = useState<string>('');
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [revealed, setRevealed] = useState<string[]>([]);
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState(0);
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('won');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [powerUps, setPowerUps] = useState({ revealVowels: 1, eliminateWrong: 1, showHint: 1 });
  const [animations, setAnimations] = useState<{ [key: string]: boolean }>({});
  const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, emoji: string }>>([]);

  // Difficulty and Category state (moved from hook for proper state management)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('medium');
  const [selectedCategory, setSelectedCategory] = useState<string>('animals');

  // Track used words to ensure variety
  const usedWordsRef = useRef<Set<string>>(new Set());

  const audioContextRef = useRef<AudioContext | null>(null);
  const particleIdRef = useRef(0);

  // Sound Effects Functions
  const initAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  };

  const playSound = (frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.1) => {
    initAudioContext();
    if (!audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + duration);

    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration);
  };

  const playCorrectSound = () => {
    // Happy chord progression
    playSound(523.25, 0.15, 'sine', 0.1); // C5
    setTimeout(() => playSound(659.25, 0.15, 'sine', 0.1), 100); // E5
    setTimeout(() => playSound(783.99, 0.2, 'sine', 0.1), 200); // G5
  };

  const playWrongSound = () => {
    // Descending sad tone
    playSound(392, 0.3, 'sawtooth', 0.08);
    setTimeout(() => playSound(349.23, 0.3, 'sawtooth', 0.08), 150);
  };

  const playWinSound = () => {
    // Victory fanfare
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((note, i) => {
      setTimeout(() => playSound(note, 0.3, 'sine', 0.12), i * 100);
    });
    setTimeout(() => playSound(1046.5, 0.5, 'sine', 0.15), 400);
  };

  const playLoseSound = () => {
    // Game over tone
    playSound(196, 0.8, 'square', 0.1);
  };

  const playPowerUpSound = () => {
    // Magical power-up sound
    playSound(880, 0.1, 'sine', 0.1);
    setTimeout(() => playSound(1174.66, 0.1, 'sine', 0.1), 50);
    setTimeout(() => playSound(1479.98, 0.2, 'sine', 0.1), 100);
  };

  // Animation Functions
  const triggerAnimation = (type: string) => {
    setAnimations(prev => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setAnimations(prev => ({ ...prev, [type]: false }));
    }, 1000);
  };

  const addParticle = (emoji: string) => {
    const id = particleIdRef.current++;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    setParticles(prev => [...prev, { id, x, y, emoji }]);

    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== id));
    }, 2000);
  };

  const { speak } = useTextToSpeech();
  const { addXP } = useGamification();
  const {
    getWordsForDifficulty,
    getDifficultyConfig,
    getCategoryConfig,
    allDifficulties,
    allCategories
  } = useHangmanDifficulty();

  // Debug logging for state changes
  useEffect(() => {
    console.log('🎯 Difficulty changed to:', selectedDifficulty);
  }, [selectedDifficulty]);

  useEffect(() => {
    console.log('🌟 Category changed to:', selectedCategory);
  }, [selectedCategory]);

  // Local getRandomWord function with unique word selection
  const getRandomWord = useCallback(() => {
    const allWords = getWordsForDifficulty(selectedDifficulty, selectedCategory);
    if (allWords.length === 0) return null;

    // Filter out recently used words
    const availableWords = allWords.filter(wordObj => !usedWordsRef.current.has(wordObj.word));

    // If all words have been used, reset the used words list (keep only last 5)
    if (availableWords.length === 0) {
      console.log('🔄 All words used, resetting used words list');
      const wordsArray = Array.from(usedWordsRef.current);
      const recentWords = wordsArray.slice(-5); // Keep last 5 words
      usedWordsRef.current = new Set(recentWords);

      // Filter again with reduced used words
      const newAvailableWords = allWords.filter(wordObj => !recentWords.includes(wordObj.word));
      return newAvailableWords.length > 0
        ? newAvailableWords[Math.floor(Math.random() * newAvailableWords.length)]
        : allWords[Math.floor(Math.random() * allWords.length)];
    }

    return availableWords[Math.floor(Math.random() * availableWords.length)];
  }, [selectedDifficulty, selectedCategory, getWordsForDifficulty]);
  const { state: speechState, startListening, stopListening, confirmLetter, rejectConfirmation } = useHangmanSpeechRecognition();
  const {
    gameStats,
    recentAchievements,
    checkAchievements,
    recordGameStart,
    recordGameWin,
    recordGameLoss,
    recordPowerUpUse,
    recordLetterGuess,
    recordHintUse,
    getAchievementProgress
  } = useHangmanAchievements();

  // Start new game
  const startNewGame = () => {
    console.log('🎮 Starting new game with:', { selectedDifficulty, selectedCategory });

    const wordObj = getRandomWord();
    if (!wordObj) {
      console.error('❌ No word found for difficulty/category combination!');
      return;
    }

    const gameWord = wordObj.word.toUpperCase();
    const category = getCategoryConfig(selectedCategory);
    const difficulty = getDifficultyConfig(selectedDifficulty);

    // Add word to used words list
    usedWordsRef.current.add(gameWord);

    console.log('🎯 Selected word:', {
      word: gameWord,
      difficulty: selectedDifficulty,
      category: selectedCategory,
      hint: wordObj.hint,
      maxWrong: difficulty?.maxWrong,
      hints: difficulty?.hints,
      usedWordsCount: usedWordsRef.current.size
    });

    setWord(gameWord);
    setHint(wordObj.hint || '');
    setCurrentCategory(category?.name || '');
    setRevealed(gameWord.split('').map(() => '_'));
    setGuessed(new Set());
    setWrong(0);
    setStatus('playing');

    // Reset power-ups based on difficulty
    setPowerUps({
      revealVowels: difficulty?.hints >= 2 ? 1 : 0,
      eliminateWrong: difficulty?.hints >= 1 ? 1 : 0,
      showHint: difficulty?.hints >= 3 ? 1 : 0
    });

    // Record game start for achievements
    recordGameStart(selectedDifficulty, selectedCategory);
  };

  // Initialize game - removed automatic start on difficulty/category change
  // Now users must click "Start Game" button to begin

  // Check win/loss conditions
  useEffect(() => {
    if (status === 'playing' && word) {
      const difficulty = getDifficultyConfig(selectedDifficulty);
      const maxWrong = difficulty?.maxWrong || 6;

      if (revealed.join('') === word) {
        setStatus('won');
        setStreak(prev => prev + 1);

        // Enhanced scoring system
        const baseXP = 50;
        const difficultyMultiplier = difficulty?.xpMultiplier || 1;
        const streakBonus = Math.min(streak * 10, 50);
        const speedBonus = Math.max(10 - wrong, 0) * 5;
        const totalXP = Math.floor((baseXP + streakBonus + speedBonus) * difficultyMultiplier);

        setScore(prev => prev + totalXP);
        addXP(totalXP, `Hangman victory! (${difficulty?.name})`);

        // Record achievement data
        const isPerfect = wrong === 0;
        recordGameWin(isPerfect, totalXP);

        // Victory effects
        playWinSound();
        triggerAnimation('win');
        for (let i = 0; i < 5; i++) {
          setTimeout(() => addParticle('🎉'), i * 200);
        }

        // Check for achievements after victory
        setTimeout(() => {
          const newAchievements = checkAchievements();
          newAchievements.forEach((achievement, index) => {
            setTimeout(() => {
              addXP(achievement.xpReward, `Achievement Unlocked: ${achievement.name}!`);
              addParticle('🏆');
            }, index * 1000);
          });
        }, 1000);

      } else if (wrong >= maxWrong) {
        setStatus('lost');
        setStreak(0);
        recordGameLoss();
        playLoseSound();
        triggerAnimation('lose');
        addParticle('💀');

        // Check for achievements even on loss (volume achievements)
        setTimeout(() => {
          checkAchievements();
        }, 500);
      }
    }
  }, [revealed, wrong, status, word, streak]);

  // Process a letter guess
  const processGuess = (letter: string) => {
    if (!word || status !== 'playing') {
      console.log('🎤 processGuess blocked:', { word: !!word, status, letter });
      return;
    }

    const upperLetter = letter.toUpperCase();
    console.log('🎤 Processing guess:', { letter, upperLetter, word, currentRevealed: revealed.join('') });

    // Check if already guessed
    if (guessed.has(letter.toLowerCase())) {
      console.log('🎤 Letter already guessed:', letter);
      return;
    }

    // Add to guessed letters
    setGuessed(prev => {
      const newGuessed = new Set([...prev, letter.toLowerCase()]);
      console.log('🎤 Updated guessed letters:', Array.from(newGuessed));
      return newGuessed;
    });

    // Record letter guess for achievements
    recordLetterGuess();

    // Check if letter is in word
    if (word.includes(upperLetter)) {
      console.log('🎤 CORRECT LETTER! Revealing all instances of:', upperLetter);
      // Reveal all instances of the letter
      setRevealed(prev => {
        const newRevealed = word.split('').map((char, index) =>
          char === upperLetter ? char : prev[index]
        );
        console.log('🎤 New revealed state:', newRevealed.join(''));
        return newRevealed;
      });

      // Correct guess effects
      playCorrectSound();
      triggerAnimation('correct');
      addParticle('✨');

    } else {
      console.log('🎤 WRONG LETTER:', upperLetter, 'not in word:', word);
      // Increment wrong guesses
      setWrong(prev => {
        const newWrong = prev + 1;
        console.log('🎤 Wrong count now:', newWrong);
        return newWrong;
      });

      // Wrong guess effects
      playWrongSound();
      triggerAnimation('wrong');
      addParticle('💥');

      // Add vibration feedback on wrong guess
      if ('vibrate' in navigator) {
        navigator.vibrate(200);
      }
    }
  };

  // Power-up functions
  const usePowerUp = (type: 'revealVowels' | 'eliminateWrong' | 'showHint') => {
    if (powerUps[type] <= 0 || status !== 'playing') return;

    playPowerUpSound();
    triggerAnimation('powerup');
    addParticle('⚡');

    setPowerUps(prev => ({ ...prev, [type]: prev[type] - 1 }));

    // Record power-up usage for achievements
    recordPowerUpUse();

    switch (type) {
      case 'revealVowels':
        const vowels = ['A', 'E', 'I', 'O', 'U'];
        setRevealed(prev =>
          word.split('').map((char, index) =>
            vowels.includes(char) ? char : prev[index]
          )
        );
        // Mark vowels as guessed
        vowels.forEach(vowel => {
          if (word.includes(vowel)) {
            setGuessed(prev => new Set([...prev, vowel.toLowerCase()]));
          }
        });
        break;

      case 'eliminateWrong':
        // Remove half of wrong letters from alphabet picker
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const wrongLetters = alphabet.filter(letter =>
          !word.includes(letter) && !guessed.has(letter.toLowerCase())
        );
        const lettersToRemove = wrongLetters.slice(0, Math.ceil(wrongLetters.length / 2));
        setGuessed(prev => {
          const newGuessed = new Set([...prev]);
          lettersToRemove.forEach(letter => newGuessed.add(letter.toLowerCase()));
          return newGuessed;
        });
        break;

      case 'showHint':
        if (hint) {
          speak(`Hint: ${hint}`);
          recordHintUse();
        }
        break;
    }
  };

  // Handle speech recognition with continuous processing
  const handleSpeechRecognition = async () => {
    const letter = await startListening(guessed, (recognizedLetter) => {
      // CRITICAL: Process EVERY letter that's recognized in continuous mode
      console.log('🎤 Processing recognized letter:', recognizedLetter);
      processGuess(recognizedLetter);
    });

    // Also process the first letter returned via promise (backward compatibility)
    if (letter) {
      console.log('🎤 Processing promise letter:', letter);
      processGuess(letter);
    }
  };

  // Handle confirmation
  const handleConfirmYes = () => {
    const letter = confirmLetter();
    if (letter) {
      processGuess(letter);
    }
  };

  // Handle word pronunciation
  const playWordPronunciation = () => {
    if (!word) return;
    speak(word);
  };

  // Enhanced visual speech feedback with audio levels
  const SpeechVisualizer = () => {
    if (!speechState.isListening) return null;

    const audioLevel = speechState.audioLevel || 0;
    const normalizedLevel = Math.min(audioLevel / 100, 1); // Normalize to 0-1

    return (
      <div className="mb-4 space-y-2">
        {/* Microphone Status */}
        <div className="flex justify-center items-center gap-3">
          <div className={`relative ${speechState.microphoneActive ? 'text-green-400' : 'text-red-400'}`}>
            <Mic className="h-6 w-6" />
            {speechState.microphoneActive && audioLevel > 10 && (
              <div className="absolute -inset-1 bg-green-400/30 rounded-full animate-ping" />
            )}
          </div>
          <div className="text-white/80 text-sm">
            {speechState.microphoneActive ? '🎤 Microphone Active' : '❌ Microphone Inactive'}
          </div>
        </div>

        {/* Audio Level Indicator */}
        {speechState.microphoneActive && (
          <div className="flex justify-center">
            <div className="bg-gray-700 rounded-full h-2 w-64 overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all duration-100 ${
                  audioLevel > 50 ? 'bg-green-400' :
                  audioLevel > 20 ? 'bg-yellow-400' :
                  'bg-blue-400'
                }`}
                style={{ width: `${normalizedLevel * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Animated Sound Waves */}
        <div className="flex justify-center items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`rounded-full animate-bounce ${
                audioLevel > 15 ? 'bg-green-400' : 'bg-blue-400'
              }`}
              style={{
                width: '6px',
                height: `${8 + i * 3 + Math.sin(Date.now() / 200 + i) * 2}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: audioLevel > 15 ? '0.4s' : '0.8s',
                opacity: speechState.microphoneActive ? 1 : 0.5
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  // Animated Hangman Drawing
  const HangmanDrawing = () => {
    const difficulty = getDifficultyConfig(selectedDifficulty);
    const maxWrong = difficulty?.maxWrong || 6;
    const parts = [
      '😵', // head
      '👔', // body
      '🦾', // left arm
      '🦾', // right arm
      '🦵', // left leg
      '🦵'  // right leg
    ];

    return (
      <div className="text-center mb-6">
        <div className="text-6xl font-mono leading-none mb-2">
          <div>┌─────┐</div>
          <div>│     {wrong >= 1 ? '😵' : '  '}</div>
          <div>│     {wrong >= 2 ? '👔' : '  '}</div>
          <div>│   {wrong >= 3 ? '🦾' : '  '}{wrong >= 2 ? '👔' : '  '}{wrong >= 4 ? '🦾' : '  '}</div>
          <div>│     {wrong >= 5 ? '🦵' : '  '}{wrong >= 6 ? '🦵' : '  '}</div>
          <div>└─────</div>
        </div>
        <p className="text-white/60 text-sm">
          {wrong}/{maxWrong} wrong {wrong === 1 ? 'guess' : 'guesses'}
        </p>
      </div>
    );
  };

  // Power-ups Panel
  const PowerUpsPanel = () => {
    if (status !== 'playing') return null;

    return (
      <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-300/50 rounded-xl p-4 mb-6">
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-400" />
          Power-ups
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <Button
            onClick={() => usePowerUp('revealVowels')}
            disabled={powerUps.revealVowels <= 0}
            className="bg-green-500/20 border border-green-400/50 text-green-200 hover:bg-green-500/30 p-2 text-xs flex flex-col items-center gap-1"
          >
            <Eye className="h-4 w-4" />
            Vowels ({powerUps.revealVowels})
          </Button>
          <Button
            onClick={() => usePowerUp('eliminateWrong')}
            disabled={powerUps.eliminateWrong <= 0}
            className="bg-red-500/20 border border-red-400/50 text-red-200 hover:bg-red-500/30 p-2 text-xs flex flex-col items-center gap-1"
          >
            <Zap className="h-4 w-4" />
            Eliminate ({powerUps.eliminateWrong})
          </Button>
          <Button
            onClick={() => usePowerUp('showHint')}
            disabled={powerUps.showHint <= 0 || !hint}
            className="bg-blue-500/20 border border-blue-400/50 text-blue-200 hover:bg-blue-500/30 p-2 text-xs flex flex-col items-center gap-1"
          >
            <HelpCircle className="h-4 w-4" />
            Hint ({powerUps.showHint})
          </Button>
        </div>
      </div>
    );
  };

  // Difficulty Selector
  const DifficultySelector = () => {
    // Only show when no game has started (no word set)
    if (word) return null;

    return (
      <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-blue-300/50 text-white shadow-xl mb-6 relative z-10">
        <CardContent className="p-6">
          <h3 className="text-white font-bold mb-4 text-center flex items-center justify-center gap-2">
            <Target className="h-5 w-5 text-blue-400" />
            Choose Difficulty
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {allDifficulties.map((diff) => (
              <button
                type="button"
                key={diff.id}
                onClick={() => {
                  console.log('🎯 Difficulty clicked:', diff.id);
                  setSelectedDifficulty(diff.id);
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  console.log('🎯 Difficulty clicked (backup):', diff.id);
                  setSelectedDifficulty(diff.id);
                }}
                className={`p-4 text-sm border transition-all duration-200 hover:scale-105 cursor-pointer rounded-md ${
                  selectedDifficulty === diff.id
                    ? 'bg-blue-500 border-blue-400 text-white shadow-lg scale-105'
                    : 'bg-white/10 border-white/30 text-white/80 hover:bg-white/20 hover:border-white/50'
                }`}
              >
                <div className="text-center pointer-events-none">
                  <div className="font-bold">{diff.name}</div>
                  <div className="text-xs opacity-80 mt-1">{diff.description}</div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  // Category Selector
  const CategorySelector = () => {
    // Only show when no game has started (no word set)
    if (word) return null;

    return (
      <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-300/50 text-white shadow-xl mb-6 relative z-10">
        <CardContent className="p-6">
          <h3 className="text-white font-bold mb-4 text-center flex items-center justify-center gap-2">
            <Star className="h-5 w-5 text-purple-400" />
            Choose Category
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {allCategories.map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => {
                  console.log('🌟 Category clicked:', cat.id);
                  setSelectedCategory(cat.id);
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  console.log('🌟 Category clicked (backup):', cat.id);
                  setSelectedCategory(cat.id);
                }}
                className={`p-4 text-sm border transition-all duration-200 hover:scale-105 cursor-pointer rounded-md ${
                  selectedCategory === cat.id
                    ? 'bg-purple-500 border-purple-400 text-white shadow-lg scale-105'
                    : 'bg-white/10 border-white/30 text-white/80 hover:bg-white/20 hover:border-white/50'
                }`}
              >
                <div className="text-center pointer-events-none">
                  <div className="text-2xl mb-1">{cat.emoji}</div>
                  <div className="font-bold">{cat.name}</div>
                  <div className="text-xs opacity-80 mt-1">{cat.description}</div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  // Particle Effects
  const ParticleEffects = () => {
    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute text-2xl animate-ping"
            style={{
              left: particle.x,
              top: particle.y,
              animationDuration: '2s'
            }}
          >
            {particle.emoji}
          </div>
        ))}
      </div>
    );
  };

  // Achievement Notifications
  const AchievementNotifications = () => {
    return (
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {recentAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`bg-gradient-to-r border rounded-xl p-4 backdrop-blur-xl animate-slide-in-right shadow-2xl max-w-sm ${
              achievement.rarity === 'legendary' ? 'from-yellow-500/30 to-orange-500/30 border-yellow-400/50' :
              achievement.rarity === 'epic' ? 'from-purple-500/30 to-pink-500/30 border-purple-400/50' :
              achievement.rarity === 'rare' ? 'from-blue-500/30 to-cyan-500/30 border-blue-400/50' :
              'from-green-500/30 to-emerald-500/30 border-green-400/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`text-2xl ${
                achievement.rarity === 'legendary' ? 'animate-pulse' : ''
              }`}>
                {achievement.icon}
              </div>
              <div>
                <div className="text-white font-bold text-sm">Achievement Unlocked!</div>
                <div className="text-white/90 font-semibold">{achievement.name}</div>
                <div className="text-white/70 text-xs">{achievement.description}</div>
                <div className="text-yellow-300 text-xs">+{achievement.xpReward} XP</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Stats Panel
  const StatsPanel = () => {
    const progress = getAchievementProgress();

    return (
      <div className="bg-gradient-to-r from-slate-600/30 to-gray-600/30 border border-slate-400/50 rounded-xl p-4 mb-6">
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-400" />
          Game Stats
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-200">{gameStats.totalWins}</div>
            <div className="text-xs text-blue-100">Wins</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-200">{gameStats.longestStreak}</div>
            <div className="text-xs text-orange-100">Best Streak</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-200">{progress.unlockedCount}/{progress.totalAchievements}</div>
            <div className="text-xs text-yellow-100">Achievements</div>
          </div>
        </div>

        {/* Achievement Progress Bar */}
        <div className="mt-3">
          <div className="bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <div className="text-xs text-white/60 mt-1 text-center">
            {progress.percentage}% Achievements Unlocked
          </div>
        </div>
      </div>
    );
  };

  // Alternative input - visual alphabet picker
  const AlphabetPicker = () => {
    if (speechState.isListening || speechState.isProcessing) return null;

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const availableLetters = alphabet.filter(letter => !guessed.has(letter.toLowerCase()));

    return (
      <div className="mt-6">
        <p className="text-white/70 text-sm text-center mb-3">Or click a letter:</p>
        <div className="grid grid-cols-6 gap-2 max-w-sm mx-auto">
          {availableLetters.slice(0, 12).map(letter => (
            <button
              key={letter}
              onClick={() => processGuess(letter)}
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-1 rounded text-sm transition-all duration-200 hover:scale-105"
              disabled={status !== 'playing'}
            >
              {letter}
            </button>
          ))}
        </div>
        {availableLetters.length > 12 && (
          <div className="grid grid-cols-6 gap-2 max-w-sm mx-auto mt-2">
            {availableLetters.slice(12).map(letter => (
              <button
                key={letter}
                onClick={() => processGuess(letter)}
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-1 rounded text-sm transition-all duration-200 hover:scale-105"
                disabled={status !== 'playing'}
              >
                {letter}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Get button content based on state with enhanced feedback
  const getButtonContent = () => {
    if (speechState.isProcessing) {
      return (
        <>
          <div className="animate-spin h-6 w-6 border-3 border-white border-t-transparent rounded-full mr-3" />
          Processing...
        </>
      );
    }

    if (speechState.isListening) {
      const audioLevel = speechState.audioLevel || 0;
      return (
        <>
          <div className="relative mr-3">
            <Mic className="h-8 w-8 text-white" />
            <div className={`absolute -inset-1 rounded-full animate-ping ${
              audioLevel > 20 ? 'bg-green-500/50' : 'bg-blue-500/30'
            }`} />
          </div>
          {speechState.microphoneActive ? (
            audioLevel > 15 ? '🎙️ Listening - I hear you!' : '🎤 Listening - Say "Alpha", "Bravo"...'
          ) : (
            '⚠️ Microphone not active'
          )}
        </>
      );
    }

    return (
      <>
        <Mic className="h-8 w-8 mr-3" />
        🎤 Start Continuous Listening
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <ParticleEffects />
      <AchievementNotifications />

      <div className="absolute inset-0 w-full h-full background-stars pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(2px 2px at 20px 30px, #fff, transparent), radial-gradient(2px 2px at 40px 70px, #fff, transparent), radial-gradient(1px 1px at 90px 40px, #fff, transparent)', backgroundSize: '100px 100px' }}
      />

      <div className="relative max-w-2xl mx-auto pt-8 z-20">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Games
          </Button>

          <div className="flex items-center gap-4">
            {/* Streak Display */}
            {streak > 0 && (
              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-white/20 rounded-full px-3 py-1 backdrop-blur-xl">
                <div className="text-white text-sm flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-400" />
                  <span className="font-bold text-orange-400">{streak}</span>
                </div>
              </div>
            )}

            {/* Score Display */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-white/20 rounded-full px-4 py-2 backdrop-blur-xl">
              <div className="text-white text-sm flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-400" />
                Score: <span className="font-bold text-yellow-400">{score}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Game Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            🧩 Word Hangman
            <Target className="h-8 w-8 text-blue-400 animate-pulse" />
          </h2>
          <p className="text-white/70 text-lg">
            {status === 'playing'
              ? `${currentCategory} • ${getDifficultyConfig(selectedDifficulty)?.name || 'Medium'} Difficulty`
              : 'Configure your game and start playing!'
            }
          </p>
        </div>

        {/* Stats Panel (always visible) */}
        <StatsPanel />

        {/* Difficulty & Category Selectors (shown when not playing) */}
        <DifficultySelector />
        <CategorySelector />

        {/* Start Game Button - only show when both difficulty and category are selected but no game started */}
        {!word && selectedDifficulty && selectedCategory && (
          <div className="mb-6 text-center">
            <Button
              onClick={startNewGame}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-8 py-4 text-xl font-bold rounded-xl shadow-2xl hover:scale-105 transition-all duration-200"
            >
              <Target className="h-6 w-6 mr-3" />
              🎮 Start Game
            </Button>
            <p className="text-white/60 text-sm mt-2">
              {getDifficultyConfig(selectedDifficulty)?.name} • {getCategoryConfig(selectedCategory)?.name}
            </p>
          </div>
        )}

        <Card className="bg-gradient-to-br from-violet-500/30 to-purple-500/20 backdrop-blur-xl border border-purple-300/50 text-white shadow-2xl">
          <CardContent className="space-y-8 p-8">

            {/* Animated Hangman Drawing (replaces hearts) */}
            {status === 'playing' && <HangmanDrawing />}

            {/* Power-ups Panel */}
            <PowerUpsPanel />

            {/* Word Display */}
            {status === 'playing' && (
              <div className="text-center space-y-4">
                <div className={`text-4xl font-bold tracking-wider text-white transition-all duration-300 ${
                  animations.correct ? 'animate-pulse text-green-400' :
                  animations.wrong ? 'animate-bounce text-red-400' :
                  'text-white'
                }`}>
                  {revealed.join(' ')}
                </div>
                {hint && currentCategory && (
                  <div className="text-white/60 text-sm">
                    Category: {currentCategory}
                    {getDifficultyConfig(selectedDifficulty)?.showCategory && hint && (
                      <span className="ml-2 opacity-50">• Hint available</span>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Main Game Interface */}
            {status === 'playing' && (
              <div className="text-center space-y-6">

                {/* Visual Speech Feedback */}
                <SpeechVisualizer />

                {/* Confirmation Dialog */}
                {speechState.needsConfirmation && (
                  <div className="bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-300/50 rounded-xl p-6">
                    <p className="text-white text-lg mb-4">{speechState.message}</p>
                    <div className="flex gap-4 justify-center">
                      <Button
                        onClick={handleConfirmYes}
                        className="bg-green-500 hover:bg-green-600 px-6 py-2"
                      >
                        Yes
                      </Button>
                      <Button
                        onClick={rejectConfirmation}
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/20 px-6 py-2"
                      >
                        No, try again
                      </Button>
                    </div>
                  </div>
                )}

                {/* Speech Result Display */}
                {speechState.message && !speechState.needsConfirmation && (
                  <div className={`border rounded-xl p-3 transition-all duration-300 ${
                    speechState.error 
                      ? 'bg-gradient-to-r from-red-500/30 to-orange-500/30 border-red-300/50' 
                      : speechState.message.includes('Already tried')
                      ? 'bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border-yellow-300/50'
                      : speechState.message.startsWith('Heard:')
                      ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-green-300/50'
                      : 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-blue-300/50'
                  }`}>
                    <p className={`text-base font-medium ${
                      speechState.error 
                        ? 'text-red-100' 
                        : speechState.message.includes('Already tried')
                        ? 'text-yellow-100'
                        : 'text-white'
                    }`}>
                      {speechState.message}
                    </p>
                  </div>
                )}
                
                {/* Microphone Test Button */}
                {!speechState.isListening && !speechState.microphoneActive && (
                  <div className="mt-4 text-center">
                    <Button
                      onClick={handleSpeechRecognition}
                      variant="outline"
                      className="border-yellow-400/50 text-yellow-300 hover:bg-yellow-400/20 px-6 py-2 text-sm"
                    >
                      🔧 Test Microphone
                    </Button>
                    <div className="text-white/60 text-xs mt-2">
                      Click to verify microphone access and audio levels
                    </div>
                  </div>
                )}

                {/* Debug Info - Enhanced */}
                {window.location.search.includes('debug=1') && (
                  <div className="bg-gray-800/80 border border-gray-500 rounded-lg p-4 text-xs space-y-2">
                    <div className="text-green-400 font-bold">🔧 Speech Debug Mode Active</div>
                    <div className="text-gray-300 space-y-1">
                      <div>• Check browser console for detailed speech logs</div>
                      <div>• Speech alternatives and confidence scores shown</div>
                      <div>• Multi-stage matching process visible</div>
                      <div>• Audio level: <span className="text-green-400">{speechState.audioLevel?.toFixed(0) || 0}</span></div>
                      <div className="text-blue-300 mt-2">
                        <strong>Test these common problem letters:</strong>
                      </div>
                      <div className="grid grid-cols-6 gap-1 mt-1">
                        {['I', 'A', 'E', 'O', 'U', 'H'].map(letter => (
                          <div key={letter} className="bg-blue-600/30 text-center py-1 rounded text-white font-bold">
                            {letter}
                          </div>
                        ))}
                      </div>
                      <div className="text-yellow-300 mt-2">
                        Try: "India", "Alpha", "Echo", "Oscar", "Uniform", "Hotel"
                      </div>
                    </div>
                  </div>
                )}

                {/* Main Speech Button */}
                <Button
                  onClick={speechState.isListening ? stopListening : handleSpeechRecognition}
                  disabled={speechState.isProcessing || speechState.needsConfirmation}
                  className={`w-full max-w-md py-8 text-2xl font-bold rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50 shadow-2xl ${
                    speechState.isListening
                      ? 'animate-pulse bg-red-500 hover:bg-red-600'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {getButtonContent()}
                </Button>

                {/* Phonetic Alphabet Helper */}
                {!speechState.isProcessing && !speechState.needsConfirmation && (
                  <div className="mt-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-400/30 rounded-xl p-4">
                    <h3 className="text-white font-bold mb-3 text-center flex items-center justify-center gap-2">
                      <Mic className="h-4 w-4" />
                      Say These for Perfect Recognition
                    </h3>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="space-y-1">
                        <div className="text-white/90"><strong>A-I:</strong></div>
                        <div className="text-blue-200">Alpha, Bravo, Charlie</div>
                        <div className="text-blue-200">Delta, Echo, Foxtrot</div>
                        <div className="text-blue-200">Golf, Hotel, India</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-white/90"><strong>J-R:</strong></div>
                        <div className="text-blue-200">Juliet, Kilo, Lima</div>
                        <div className="text-blue-200">Mike, November, Oscar</div>
                        <div className="text-blue-200">Papa, Quebec, Romeo</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-white/90"><strong>S-Z:</strong></div>
                        <div className="text-blue-200">Sierra, Tango, Uniform</div>
                        <div className="text-blue-200">Victor, Whiskey, Xray</div>
                        <div className="text-blue-200">Yankee, Zulu</div>
                      </div>
                    </div>
                    <div className="mt-3 text-center text-yellow-300 text-xs">
                      Or try: "A for Apple", "B for Boy", etc.
                    </div>
                  </div>
                )}

                {/* Alternative Input - Alphabet Picker */}
                <AlphabetPicker />
              </div>
            )}

            {/* Game Over States */}
            {status !== 'playing' && word && (
              <div className="text-center space-y-6">
                {status === 'won' ? (
                  <div className={`bg-gradient-to-r from-green-500/30 to-emerald-500/30 border border-green-300/50 rounded-xl p-6 ${
                    animations.win ? 'animate-pulse' : ''
                  }`}>
                    <div className="text-6xl mb-4 animate-bounce">🎉</div>
                    <h3 className="text-3xl font-bold text-green-200 mb-3">✅ Victory!</h3>
                    <p className="text-white/90 text-xl mb-4">
                      The word was: <span className="font-bold text-yellow-300">{word}</span>
                    </p>

                    {/* Enhanced Victory Stats */}
                    <div className="bg-gradient-to-r from-yellow-400/30 to-green-400/30 rounded-lg p-4 mb-4">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-yellow-200">
                            🌟 +{Math.floor((50 + Math.min(streak * 10, 50) + Math.max(10 - wrong, 0) * 5) * (getDifficultyConfig(selectedDifficulty)?.xpMultiplier || 1))} XP
                          </div>
                          <div className="text-sm text-yellow-100">Total Earned</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-orange-200">
                            🔥 {streak}
                          </div>
                          <div className="text-sm text-orange-100">Win Streak</div>
                        </div>
                      </div>
                      <div className="mt-3 text-xs text-white/80">
                        Difficulty: {getDifficultyConfig(selectedDifficulty)?.name} ({getDifficultyConfig(selectedDifficulty)?.xpMultiplier}x XP)
                      </div>
                    </div>

                    {hint && (
                      <div className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-3 text-sm text-blue-200">
                        💡 <strong>Fun Fact:</strong> {hint}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={`bg-gradient-to-r from-red-500/30 to-orange-500/30 border border-red-300/50 rounded-xl p-6 ${
                    animations.lose ? 'animate-pulse' : ''
                  }`}>
                    <div className="text-6xl mb-4">💀</div>
                    <h3 className="text-3xl font-bold text-red-200 mb-3">❌ Game Over!</h3>
                    <p className="text-white/90 text-lg mb-2">The word was:</p>
                    <p className="text-3xl font-bold text-white bg-black/20 rounded-lg p-3 mb-4">{word}</p>

                    {hint && (
                      <div className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-3 text-sm text-blue-200">
                        💡 <strong>Hint was:</strong> {hint}
                      </div>
                    )}
                  </div>
                )}
                
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      console.log('🔊 Pronunciation button clicked for word:', word);
                      playWordPronunciation();
                    }}
                    className="w-full border border-white/30 text-white hover:bg-white/20 py-3 text-lg rounded-md transition-all duration-200 flex items-center justify-center gap-3"
                  >
                    <Volume2 className="h-5 w-5" />
                    🔊 Hear Pronunciation
                  </button>
                  
                  <div className="space-y-3">
                    <Button
                      onClick={startNewGame}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 py-4 text-lg font-bold rounded-xl"
                    >
                      <RotateCcw className="h-5 w-5 mr-3" />
                      🎮 Play Again
                    </Button>
                    <Button
                      onClick={() => {
                        setWord('');
                        setHint('');
                        setCurrentCategory('');
                        setRevealed([]);
                        setGuessed(new Set());
                        setWrong(0);
                      }}
                      variant="outline"
                      className="w-full border-white/30 text-white hover:bg-white/20 py-3"
                    >
                      <Target className="h-4 w-4 mr-2" />
                      Change Difficulty/Category
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};