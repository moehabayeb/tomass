import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Mic, Volume2, RotateCcw, Trophy, Target, Settings, Heart } from 'lucide-react';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useGamification } from '@/hooks/useGamification';
import { useGameVocabulary, type GameWord } from '@/hooks/useGameVocabulary';
import { useHangmanSpeech } from '@/hooks/useHangmanSpeech';

interface HangmanGameProps {
  onBack: () => void;
}

export const HangmanGame: React.FC<HangmanGameProps> = ({ onBack }) => {
  const [currentWord, setCurrentWord] = useState<GameWord | null>(null);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [score, setScore] = useState(0);
  const [showDebug, setShowDebug] = useState(false);
  
  const maxWrongGuesses = 6;
  
  const { speak } = useTextToSpeech();
  const { addXP } = useGamification();
  const { getWordsForHangman, isLoading: vocabLoading } = useGameVocabulary();
  const { state: speechState, startListening, stopListening, confirmLetter, rejectConfirmation } = useHangmanSpeech();

  useEffect(() => {
    if (!vocabLoading) {
      startNewGame();
    }
  }, [vocabLoading]);

  const startNewGame = () => {
    const availableWords = getWordsForHangman();
    if (availableWords.length === 0) return;
    
    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    setCurrentWord(randomWord);
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setGameStatus('playing');
  };

  const displayWord = () => {
    if (!currentWord) return '';
    return currentWord.english
      .split('')
      .map(letter => (guessedLetters.has(letter.toLowerCase()) ? letter : '_'))
      .join(' ');
  };

  const isWordComplete = () => {
    if (!currentWord) return false;
    return currentWord.english
      .toLowerCase()
      .split('')
      .every(letter => guessedLetters.has(letter));
  };

  useEffect(() => {
    if (gameStatus === 'playing' && currentWord) {
      if (isWordComplete()) {
        const xpEarned = 50;
        setGameStatus('won');
        setScore(prev => prev + 10);
        addXP(xpEarned, 'Hangman victory!');
      } else if (wrongGuesses >= maxWrongGuesses) {
        setGameStatus('lost');
      }
    }
  }, [guessedLetters, wrongGuesses, gameStatus, currentWord]);

  const processGuess = (letter: string) => {
    if (!currentWord || gameStatus !== 'playing') return;
    
    const lowerLetter = letter.toLowerCase();
    
    if (guessedLetters.has(lowerLetter)) {
      return; // Already guessed - this should not happen due to check in hook
    }

    // Add to guessed letters immediately
    setGuessedLetters(prev => new Set([...prev, lowerLetter]));

    const isLetterInWord = currentWord.english.toLowerCase().includes(lowerLetter);
    
    if (!isLetterInWord) {
      setWrongGuesses(prev => {
        const newWrongGuesses = prev + 1;
        if (newWrongGuesses >= maxWrongGuesses) {
          setGameStatus('lost');
        }
        return newWrongGuesses;
      });
    } else {
      // Check if word is complete after this guess
      const wordLetters = currentWord.english.toLowerCase().split('');
      const newGuessedSet = new Set([...guessedLetters, lowerLetter]);
      const allLettersGuessed = wordLetters.every(l => newGuessedSet.has(l));
      
      if (allLettersGuessed) {
        setGameStatus('won');
      }
    }
  };

  const handleSpeechRecognition = async () => {
    const letter = await startListening(guessedLetters);
    if (letter) {
      processGuess(letter);
    }
  };

  const handleConfirmYes = () => {
    if (speechState.possibleLetters.length > 0) {
      const letter = confirmLetter(speechState.possibleLetters[0]);
      if (letter) {
        processGuess(letter);
      }
    }
  };

  const handleConfirmNo = () => {
    rejectConfirmation();
  };

  const playWordPronunciation = () => {
    if (!currentWord) return;
    speak(`${currentWord.english}. In Turkish: ${currentWord.turkish}`);
  };

  // Remove getSpeechMessage - we'll use speechState.message directly

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
        <Mic className="h-8 w-8 mr-3" />
        🎤 Tap to Speak a Letter
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="absolute inset-0 w-full h-full background-stars pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(2px 2px at 20px 30px, #fff, transparent), radial-gradient(2px 2px at 40px 70px, #fff, transparent), radial-gradient(1px 1px at 90px 40px, #fff, transparent)', backgroundSize: '100px 100px' }} 
      />
      
      <div className="relative max-w-2xl mx-auto pt-8">
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
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-white/20 rounded-full px-4 py-2 backdrop-blur-xl">
            <div className="text-white text-sm flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-400" />
              Score: <span className="font-bold text-yellow-400">{score}</span>
            </div>
          </div>
        </div>

        {/* Game Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            🧩 Word Hangman
            <Target className="h-8 w-8 text-blue-400 animate-pulse" />
          </h2>
          <p className="text-white/70 text-lg">Speak letters to guess the word!</p>
        </div>

        <Card className="bg-gradient-to-br from-violet-500/30 to-purple-500/20 backdrop-blur-xl border border-purple-300/50 text-white shadow-2xl">
          <CardContent className="space-y-8 p-8">
            
            {/* Hearts Display for Wrong Guesses */}
            <div className="text-center">
              <div className="flex justify-center gap-2 mb-2">
                {Array.from({ length: maxWrongGuesses }, (_, i) => (
                  <Heart
                    key={i}
                    className={`h-8 w-8 transition-all duration-300 ${
                      i < wrongGuesses 
                        ? 'text-red-500 fill-red-500' 
                        : 'text-gray-400 fill-transparent'
                    }`}
                  />
                ))}
              </div>
              <p className="text-white/60 text-sm">{wrongGuesses}/{maxWrongGuesses} wrong guesses</p>
            </div>

            {/* Word Display */}
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold tracking-wider text-white">
                {displayWord()}
              </div>
              <p className="text-white/70 text-lg">
                Turkish: {gameStatus !== 'playing' && currentWord ? currentWord.turkish : '???'}
              </p>
            </div>

            {/* Main Game Interface */}
            {gameStatus === 'playing' && (
              <div className="text-center space-y-6">
                
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
                        onClick={handleConfirmNo}
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
                  <div className={`border rounded-xl p-4 ${
                    speechState.error 
                      ? 'bg-gradient-to-r from-red-500/30 to-orange-500/30 border-red-300/50' 
                      : speechState.message.includes('already tried')
                      ? 'bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border-yellow-300/50'
                      : 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-green-300/50'
                  }`}>
                    <p className={`text-lg ${
                      speechState.error 
                        ? 'text-red-100' 
                        : speechState.message.includes('already tried')
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
                  className={`w-full max-w-md py-8 text-2xl font-bold rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50 shadow-2xl ${
                    speechState.isListening 
                      ? 'animate-pulse bg-red-500 hover:bg-red-600' 
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {getButtonContent()}
                </Button>

                {/* Debug Toggle and Input - Hidden by default */}
                {process.env.NODE_ENV === 'development' && (
                  <>
                    <div className="flex justify-center">
                      <Button
                        onClick={() => setShowDebug(!showDebug)}
                        variant="ghost"
                        size="sm"
                        className="text-white/50 hover:text-white/80"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Debug
                      </Button>
                    </div>

                    {showDebug && (
                      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-300/50 rounded-xl p-4">
                        <p className="text-yellow-200 text-sm font-medium mb-2">🔧 Debug: Type a letter to test</p>
                        <input
                          type="text"
                          maxLength={1}
                          placeholder="A"
                          className="w-16 h-12 text-center text-2xl font-bold bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          onChange={(e) => {
                            const letter = e.target.value.toLowerCase();
                            if (letter && /^[a-z]$/.test(letter)) {
                              processGuess(letter);
                              e.target.value = '';
                            }
                          }}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Game Over States */}
            {gameStatus !== 'playing' && (
              <div className="text-center space-y-6">
                {gameStatus === 'won' ? (
                  <div className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 border border-green-300/50 rounded-xl p-6">
                    <div className="text-6xl mb-4 animate-bounce">🎉</div>
                    <h3 className="text-3xl font-bold text-green-200 mb-3">✅ You Got It!</h3>
                    <p className="text-white/90 text-xl mb-4">
                      Perfect! The word was: <span className="font-bold text-yellow-300">{currentWord?.english?.toUpperCase()}</span>
                    </p>
                    <div className="bg-gradient-to-r from-yellow-400/30 to-green-400/30 rounded-lg p-4">
                      <div className="text-2xl font-bold text-yellow-200">🌟 +50 XP Earned! 🌟</div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-red-500/30 to-orange-500/30 border border-red-300/50 rounded-xl p-6">
                    <div className="text-6xl mb-4">😔</div>
                    <h3 className="text-3xl font-bold text-red-200 mb-3">❌ Out of Guesses!</h3>
                    <p className="text-white/90 text-lg mb-2">The word was:</p>
                    <p className="text-3xl font-bold text-white bg-black/20 rounded-lg p-3 mb-3">{currentWord?.english?.toUpperCase()}</p>
                    <p className="text-lg text-blue-300">Turkish: {currentWord?.turkish}</p>
                  </div>
                )}
                
                <div className="space-y-4">
                  <Button
                    onClick={playWordPronunciation}
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/20 py-3 text-lg"
                  >
                    <Volume2 className="h-5 w-5 mr-3" />
                    🔊 Hear Pronunciation
                  </Button>
                  
                  <Button
                    onClick={startNewGame}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 py-4 text-lg font-bold rounded-xl"
                  >
                    <RotateCcw className="h-5 w-5 mr-3" />
                    🎮 Play Next Word
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};