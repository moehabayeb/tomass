import React, { useState, useEffect, useCallback } from 'react';
import Confetti from 'react-confetti';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mic, Volume2, RotateCcw, Trophy, Lightbulb, Settings } from 'lucide-react';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useGamification } from '@/hooks/useGamification';
import { useGameVocabulary, type GameWord } from '@/hooks/useGameVocabulary';
import { useHangmanSpeechRecognition } from '@/hooks/useHangmanSpeechRecognition';
import { HangmanSVG } from './HangmanSVG';
import { HangmanKeyboard } from './HangmanKeyboard';
import { SpeechWaveform } from './SpeechWaveform';
import { useWindowSize } from '@react-hook/window-size';

interface HangmanGameProps {
  onBack: () => void;
}

type Difficulty = 'easy' | 'medium' | 'hard';

export const HangmanGame: React.FC<HangmanGameProps> = ({ onBack }) => {
  const [width, height] = useWindowSize();
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
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [showSettings, setShowSettings] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());

  const difficultySettings = {
    easy: { maxWrong: 10, label: 'Easy', color: 'from-green-500 to-emerald-600' },
    medium: { maxWrong: 6, label: 'Medium', color: 'from-blue-500 to-purple-600' },
    hard: { maxWrong: 3, label: 'Hard', color: 'from-red-500 to-pink-600' }
  };

  const maxWrong = difficultySettings[difficulty].maxWrong;

  const { speak } = useTextToSpeech();
  const { addXP } = useGamification();
  const { getWordsForHangman, isLoading: vocabLoading } = useGameVocabulary();
  const { state: speechState, startListening, stopListening, confirmLetter, rejectConfirmation } = useHangmanSpeechRecognition();

  // Start new game
  const startNewGame = useCallback(() => {
    const availableWords = getWordsForHangman();
    if (availableWords.length === 0) return;

    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    const gameWord = randomWord.english.toUpperCase();

    setWord(gameWord);
    setCurrentWordData(randomWord);
    setRevealed(gameWord.split('').map(() => '_'));
    setGuessed(new Set());
    setCorrectLetters(new Set());
    setWrong(0);
    setStatus('playing');
    setShowHint(false);
    setRevealedIndices(new Set());
  }, [getWordsForHangman]);

  // Initialize game
  useEffect(() => {
    if (!vocabLoading) {
      startNewGame();
    }
  }, [vocabLoading, startNewGame]);

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
        addXP(xpEarned, `Hangman victory! 🎉 Streak: ${streak + 1}`);

        // Play success sound
        playSuccessSound();
      } else if (wrong >= maxWrong) {
        setStatus('lost');
        setStreak(0);

        // Play failure sound
        playFailureSound();
      }
    }
  }, [revealed, wrong, status, word, addXP, difficulty, streak, maxWrong]);

  // Simple sound effects using Web Audio API
  const playSuccessSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const playFailureSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 0.2);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const playClickSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  // Process a letter guess
  const processGuess = (letter: string) => {
    if (!word || status !== 'playing') return;

    const upperLetter = letter.toUpperCase();
    const lowerLetter = letter.toLowerCase();

    // Check if already guessed
    if (guessed.has(lowerLetter)) {
      return;
    }

    // Add to guessed letters
    setGuessed(prev => new Set([...prev, lowerLetter]));

    // Check if letter is in word
    if (word.includes(upperLetter)) {
      // Correct guess - play success sound
      playClickSound();

      // Mark as correct
      setCorrectLetters(prev => new Set([...prev, lowerLetter]));

      // Reveal all instances of the letter with animation
      const newRevealed = [...revealed];
      const newRevealedIndices = new Set(revealedIndices);

      word.split('').forEach((char, index) => {
        if (char === upperLetter) {
          newRevealed[index] = char;
          newRevealedIndices.add(index);
        }
      });

      setRevealed(newRevealed);
      setRevealedIndices(newRevealedIndices);
    } else {
      // Wrong guess - increment wrong guesses
      setWrong(prev => prev + 1);

      // Vibration feedback on wrong guess
      if ('vibrate' in navigator) {
        navigator.vibrate(100);
      }
    }
  };

  // Handle speech recognition
  const handleSpeechRecognition = async () => {
    const letter = await startListening(guessed);
    if (letter) {
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

  // Handle hint
  const handleHint = () => {
    if (showHint) {
      setShowHint(false);
      return;
    }

    // Cost: 1 wrong guess
    if (wrong + 1 < maxWrong) {
      setWrong(prev => prev + 1);
      setShowHint(true);
    }
  };

  // Handle keyboard letter click
  const handleLetterClick = (letter: string) => {
    processGuess(letter);
  };

  // Get button content based on state
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
      return (
        <>
          <div className="animate-pulse bg-white/20 rounded-full p-2 mr-3">
            <Mic className="h-6 w-6" />
          </div>
          Listening...
        </>
      );
    }

    return (
      <>
        <Mic className="h-6 w-6 mr-2" />
        Speak a Letter
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 overflow-x-hidden">
      {/* Confetti on win */}
      {status === 'won' && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />
      )}

      <div className="absolute inset-0 w-full h-full background-stars pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(2px 2px at 20px 30px, #fff, transparent), radial-gradient(2px 2px at 40px 70px, #fff, transparent), radial-gradient(1px 1px at 90px 40px, #fff, transparent)', backgroundSize: '100px 100px' }}
      />

      <div className="relative max-w-5xl mx-auto pt-4 sm:pt-8 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="flex items-center gap-3">
            {/* Streak */}
            {streak > 0 && (
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/50 rounded-full px-4 py-2 backdrop-blur-xl">
                <div className="text-white text-sm flex items-center gap-2">
                  🔥 Streak: <span className="font-bold text-yellow-400">{streak}</span>
                </div>
              </div>
            )}

            {/* Score */}
            <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/20 rounded-full px-4 py-2 backdrop-blur-xl">
              <div className="text-white text-sm flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-400" />
                <span className="font-bold text-yellow-400">{score}</span>
              </div>
            </div>

            {/* Settings */}
            <Button
              onClick={() => setShowSettings(!showSettings)}
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-full"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <Card className="mb-6 bg-gradient-to-br from-violet-500/20 to-purple-500/20 backdrop-blur-xl border border-purple-300/50 animate-fade-in">
            <CardContent className="p-6">
              <h3 className="text-white font-bold text-lg mb-4">Difficulty Level</h3>
              <div className="grid grid-cols-3 gap-3">
                {(Object.keys(difficultySettings) as Difficulty[]).map((diff) => (
                  <Button
                    key={diff}
                    onClick={() => {
                      setDifficulty(diff);
                      setShowSettings(false);
                      startNewGame();
                    }}
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
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Word Hangman</h2>
            <Badge className={`bg-gradient-to-r ${difficultySettings[difficulty].color} text-white px-3 py-1`}>
              {difficultySettings[difficulty].label}
            </Badge>
          </div>
          <p className="text-white/70 text-base sm:text-lg">
            {status === 'playing' ? 'Speak or tap letters to guess the word!' : 'Game Over'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Hangman Visual */}
          <Card className="bg-gradient-to-br from-violet-500/30 to-purple-500/20 backdrop-blur-xl border border-purple-300/50 text-white shadow-2xl">
            <CardContent className="p-6 sm:p-8">
              <HangmanSVG wrongCount={wrong} maxWrong={maxWrong} />

              {/* Lives Indicator */}
              <div className="mt-6 text-center">
                <div className="flex justify-center gap-2 mb-2">
                  {Array.from({ length: maxWrong }, (_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        i < wrong
                          ? 'bg-red-500 shadow-lg shadow-red-500/50'
                          : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-white/60 text-sm">
                  {maxWrong - wrong} {maxWrong - wrong === 1 ? 'life' : 'lives'} remaining
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Game Interface */}
          <div className="space-y-6">
            {/* Word Display */}
            <Card className="bg-gradient-to-br from-blue-500/30 to-purple-500/20 backdrop-blur-xl border border-blue-300/50 text-white shadow-2xl">
              <CardContent className="p-6 sm:p-8">
                <div className="text-center space-y-6">
                  {/* Word letters */}
                  <div className="flex flex-wrap justify-center gap-2 sm:gap-3 min-h-[80px] items-center">
                    {word.split('').map((char, index) => (
                      <div
                        key={index}
                        className={`
                          w-10 h-12 sm:w-14 sm:h-16
                          flex items-center justify-center
                          text-2xl sm:text-4xl font-bold
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
                          <span className="text-white/20">_</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Hint Display */}
                  {showHint && currentWordData && (
                    <div className="bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border border-yellow-300/50 rounded-xl p-4 animate-fade-in">
                      <p className="text-yellow-100 text-sm mb-1">💡 Turkish Translation:</p>
                      <p className="text-white font-bold text-lg">{currentWordData.turkish}</p>
                    </div>
                  )}

                  {/* Hint Button */}
                  {status === 'playing' && !showHint && currentWordData && wrong + 1 < maxWrong && (
                    <Button
                      onClick={handleHint}
                      variant="outline"
                      size="sm"
                      className="border-yellow-400/50 text-yellow-300 hover:bg-yellow-500/20"
                    >
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Need a hint? (-1 life)
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Main Game Interface */}
            {status === 'playing' && (
              <Card className="bg-gradient-to-br from-violet-500/30 to-purple-500/20 backdrop-blur-xl border border-purple-300/50 text-white shadow-2xl">
                <CardContent className="p-4 sm:p-6 space-y-4">
                  {/* Speech Recognition Interface */}
                  <div className="space-y-4">
                    {/* Waveform Animation */}
                    {speechState.isListening && (
                      <SpeechWaveform isListening={speechState.isListening} />
                    )}

                    {/* Confirmation Dialog */}
                    {speechState.needsConfirmation && (
                      <div className="bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-300/50 rounded-xl p-4 animate-fade-in">
                        <p className="text-white text-base sm:text-lg mb-4">{speechState.message}</p>
                        <div className="flex gap-3 justify-center">
                          <Button
                            onClick={handleConfirmYes}
                            className="bg-green-500 hover:bg-green-600 px-6 py-2"
                          >
                            Yes ✓
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
                        <p className={`text-sm sm:text-base font-medium ${
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

                    {/* Main Speech Button */}
                    <Button
                      onClick={speechState.isListening ? stopListening : handleSpeechRecognition}
                      disabled={speechState.isProcessing || speechState.needsConfirmation}
                      className={`w-full py-6 text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 shadow-2xl ${
                        speechState.isListening
                          ? 'animate-pulse bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'
                          : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                      }`}
                    >
                      {getButtonContent()}
                    </Button>
                  </div>

                  {/* Keyboard */}
                  <div className="pt-4">
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
              <Card className="bg-gradient-to-br from-violet-500/30 to-purple-500/20 backdrop-blur-xl border border-purple-300/50 text-white shadow-2xl animate-fade-in">
                <CardContent className="p-6 sm:p-8">
                  <div className="text-center space-y-6">
                    {status === 'won' ? (
                      <div>
                        <div className="text-6xl sm:text-8xl mb-4 animate-bounce">🎉</div>
                        <h3 className="text-3xl sm:text-4xl font-bold text-green-200 mb-3">You Won!</h3>
                        <p className="text-white/90 text-lg sm:text-xl mb-4">
                          The word was: <span className="font-bold text-yellow-300 text-2xl">{word}</span>
                        </p>
                        {streak > 1 && (
                          <div className="bg-gradient-to-r from-orange-400/30 to-yellow-400/30 rounded-lg p-4 mb-4">
                            <p className="text-2xl font-bold text-orange-200">🔥 {streak} Win Streak! 🔥</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div className="text-6xl sm:text-8xl mb-4">😔</div>
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
                        className="w-full border-white/30 text-white hover:bg-white/20 py-4 text-base sm:text-lg"
                      >
                        <Volume2 className="h-5 w-5 mr-3" />
                        Hear Pronunciation
                      </Button>

                      <Button
                        onClick={startNewGame}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 py-4 text-base sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        <RotateCcw className="h-5 w-5 mr-3" />
                        New Word
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
