import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Mic, Volume2, RotateCcw, Trophy, Target, Heart } from 'lucide-react';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useGamification } from '@/hooks/useGamification';
import { useGameVocabulary, type GameWord } from '@/hooks/useGameVocabulary';
import { useHangmanSpeechRecognition } from '@/hooks/useHangmanSpeechRecognition';

interface HangmanGameProps {
  onBack: () => void;
}

export const HangmanGame: React.FC<HangmanGameProps> = ({ onBack }) => {
  const [word, setWord] = useState<string>('');
  const [revealed, setRevealed] = useState<string[]>([]);
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState(0);
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [score, setScore] = useState(0);
  
  const maxWrong = 6;
  
  const { speak } = useTextToSpeech();
  const { addXP } = useGamification();
  const { getWordsForHangman, isLoading: vocabLoading } = useGameVocabulary();
  const { state: speechState, startListening, stopListening, confirmLetter, rejectConfirmation } = useHangmanSpeechRecognition();

  // Start new game
  const startNewGame = () => {
    const availableWords = getWordsForHangman();
    if (availableWords.length === 0) return;
    
    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    const gameWord = randomWord.english.toUpperCase();
    
    setWord(gameWord);
    setRevealed(gameWord.split('').map(() => '_'));
    setGuessed(new Set());
    setWrong(0);
    setStatus('playing');
  };

  // Initialize game
  useEffect(() => {
    if (!vocabLoading) {
      startNewGame();
    }
  }, [vocabLoading]);

  // Check win/loss conditions
  useEffect(() => {
    if (status === 'playing' && word) {
      if (revealed.join('') === word) {
        setStatus('won');
        const xpEarned = 50;
        setScore(prev => prev + 10);
        addXP(xpEarned, 'Hangman victory!');
      } else if (wrong >= maxWrong) {
        setStatus('lost');
      }
    }
  }, [revealed, wrong, status, word]);

  // Process a letter guess
  const processGuess = (letter: string) => {
    if (!word || status !== 'playing') return;
    
    const upperLetter = letter.toUpperCase();
    
    // Add to guessed letters
    setGuessed(prev => new Set([...prev, letter.toLowerCase()]));

    // Check if letter is in word
    if (word.includes(upperLetter)) {
      // Reveal all instances of the letter
      setRevealed(prev => 
        word.split('').map((char, index) => 
          char === upperLetter ? char : prev[index]
        )
      );
    } else {
      // Increment wrong guesses
      setWrong(prev => prev + 1);
      
      // Add vibration feedback on wrong guess
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
                {Array.from({ length: maxWrong }, (_, i) => (
                  <Heart
                    key={i}
                    className={`h-8 w-8 transition-all duration-300 ${
                      i < wrong 
                        ? 'text-red-500 fill-red-500' 
                        : 'text-gray-400 fill-transparent'
                    }`}
                  />
                ))}
              </div>
              <p className="text-white/60 text-sm">{wrong}/{maxWrong} wrong guesses</p>
            </div>

            {/* Word Display */}
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold tracking-wider text-white">
                {revealed.join(' ')}
              </div>
            </div>

            {/* Main Game Interface */}
            {status === 'playing' && (
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
                
                {/* Debug Info */}
                {process.env.NODE_ENV === 'development' && window.location.search.includes('debug=1') && (
                  <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-3 text-xs">
                    <p className="text-gray-300">Debug mode active - check console for speech details</p>
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
              </div>
            )}

            {/* Game Over States */}
            {status !== 'playing' && (
              <div className="text-center space-y-6">
                {status === 'won' ? (
                  <div className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 border border-green-300/50 rounded-xl p-6">
                    <div className="text-6xl mb-4 animate-bounce">🎉</div>
                    <h3 className="text-3xl font-bold text-green-200 mb-3">✅ You Got It!</h3>
                    <p className="text-white/90 text-xl mb-4">
                      Perfect! The word was: <span className="font-bold text-yellow-300">{word}</span>
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
                    <p className="text-3xl font-bold text-white bg-black/20 rounded-lg p-3">{word}</p>
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
                    🎮 New Word
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