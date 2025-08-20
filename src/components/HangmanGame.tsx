import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Mic, Volume2, RotateCcw, Trophy, Target, Settings, Heart } from 'lucide-react';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { supabase } from '@/integrations/supabase/client';
import { useGamification } from '@/hooks/useGamification';
import { useGameVocabulary, type GameWord } from '@/hooks/useGameVocabulary';

interface HangmanGameProps {
  onBack: () => void;
}

export const HangmanGame: React.FC<HangmanGameProps> = ({ onBack }) => {
  const [currentWord, setCurrentWord] = useState<GameWord | null>(null);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [isRecording, setIsRecording] = useState(false);
  const [heardLetter, setHeardLetter] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [score, setScore] = useState(0);
  const [showDebug, setShowDebug] = useState(false);
  
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const maxWrongGuesses = 6;
  
  const { speak } = useTextToSpeech();
  const { addXP } = useGamification();
  const { getWordsForHangman, isLoading: vocabLoading } = useGameVocabulary();

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
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameStatus('playing');
    setHeardLetter('');
  };

  const displayWord = () => {
    if (!currentWord) return '';
    return currentWord.english
      .split('')
      .map(letter => (guessedLetters.includes(letter.toLowerCase()) ? letter : '_'))
      .join(' ');
  };

  const isWordComplete = () => {
    if (!currentWord) return false;
    return currentWord.english
      .toLowerCase()
      .split('')
      .every(letter => guessedLetters.includes(letter));
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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
        audioBitsPerSecond: 128000
      });
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        await processAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.current.start(250);
      setIsRecording(true);
      setHeardLetter('🎤 Listening...');

      setTimeout(() => {
        if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
          stopRecording();
        }
      }, 3000);

    } catch (error) {
      setHeardLetter('❌ Microphone access denied');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    try {
      setIsProcessing(true);
      setHeardLetter('🔄 Processing...');
      
      if (audioBlob.size === 0 || audioBlob.size < 1000) {
        setHeardLetter('❌ Speech not understood');
        setIsProcessing(false);
        setTimeout(() => setHeardLetter(''), 3000);
        return;
      }
      
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        try {
          const base64data = reader.result as string;
          const audioData = base64data.split(',')[1];

          const { data, error } = await supabase.functions.invoke('transcribe', {
            body: { audio: audioData }
          });

          if (error) {
            setHeardLetter('❌ Speech not understood');
            setIsProcessing(false);
            setTimeout(() => setHeardLetter(''), 3000);
            return;
          }

          const transcription = data?.transcript || '';
          const extractedLetter = extractLetterFromSpeech(transcription);
          
          if (extractedLetter) {
            setHeardLetter(extractedLetter.toUpperCase());
            processGuess(extractedLetter);
            setTimeout(() => setHeardLetter(''), 3000);
          } else {
            setHeardLetter('❌ Speech not understood');
            setTimeout(() => setHeardLetter(''), 3000);
          }
          
        } catch (innerError) {
          setHeardLetter('❌ Speech not understood');
          setTimeout(() => setHeardLetter(''), 3000);
        } finally {
          setIsProcessing(false);
        }
      };
      
      reader.onerror = () => {
        setHeardLetter('❌ Speech not understood');
        setIsProcessing(false);
        setTimeout(() => setHeardLetter(''), 3000);
      };
      
    } catch (error) {
      setHeardLetter('❌ Speech not understood');
      setIsProcessing(false);
      setTimeout(() => setHeardLetter(''), 3000);
    }
  };

  const extractLetterFromSpeech = (text: string): string => {
    const letterMappings: Record<string, string> = {
      'a': 'a', 'ay': 'a', 'eh': 'a', 'letter a': 'a', 'the letter a': 'a',
      'b': 'b', 'bee': 'b', 'be': 'b', 'letter b': 'b', 'the letter b': 'b',
      'c': 'c', 'see': 'c', 'sea': 'c', 'letter c': 'c', 'the letter c': 'c',
      'd': 'd', 'dee': 'd', 'de': 'd', 'letter d': 'd', 'the letter d': 'd',
      'e': 'e', 'ee': 'e', 'letter e': 'e', 'the letter e': 'e',
      'f': 'f', 'ef': 'f', 'eff': 'f', 'letter f': 'f', 'the letter f': 'f',
      'g': 'g', 'gee': 'g', 'ji': 'g', 'letter g': 'g', 'the letter g': 'g',
      'h': 'h', 'aitch': 'h', 'ach': 'h', 'letter h': 'h', 'the letter h': 'h',
      'i': 'i', 'eye': 'i', 'ai': 'i', 'letter i': 'i', 'the letter i': 'i',
      'j': 'j', 'jay': 'j', 'jey': 'j', 'letter j': 'j', 'the letter j': 'j',
      'k': 'k', 'kay': 'k', 'key': 'k', 'letter k': 'k', 'the letter k': 'k',
      'l': 'l', 'el': 'l', 'ell': 'l', 'letter l': 'l', 'the letter l': 'l',
      'm': 'm', 'em': 'm', 'letter m': 'm', 'the letter m': 'm',
      'n': 'n', 'en': 'n', 'letter n': 'n', 'the letter n': 'n',
      'o': 'o', 'oh': 'o', 'letter o': 'o', 'the letter o': 'o',
      'p': 'p', 'pee': 'p', 'pe': 'p', 'letter p': 'p', 'the letter p': 'p',
      'q': 'q', 'que': 'q', 'queue': 'q', 'letter q': 'q', 'the letter q': 'q',
      'r': 'r', 'are': 'r', 'ar': 'r', 'letter r': 'r', 'the letter r': 'r',
      's': 's', 'es': 's', 'ess': 's', 'letter s': 's', 'the letter s': 's',
      't': 't', 'tee': 't', 'te': 't', 'letter t': 't', 'the letter t': 't',
      'u': 'u', 'you': 'u', 'yu': 'u', 'letter u': 'u', 'the letter u': 'u',
      'v': 'v', 'vee': 'v', 've': 'v', 'letter v': 'v', 'the letter v': 'v',
      'w': 'w', 'double u': 'w', 'double you': 'w', 'letter w': 'w', 'the letter w': 'w',
      'x': 'x', 'ex': 'x', 'letter x': 'x', 'the letter x': 'x',
      'y': 'y', 'why': 'y', 'wai': 'y', 'letter y': 'y', 'the letter y': 'y',
      'z': 'z', 'zee': 'z', 'zed': 'z', 'letter z': 'z', 'the letter z': 'z'
    };

    // First try exact mapping
    if (letterMappings[text]) {
      return letterMappings[text];
    }

    // Try to find letter phrases in the text
    for (const [key, value] of Object.entries(letterMappings)) {
      if (text.includes(key)) {
        return value;
      }
    }

    // Extract single alphabetic characters
    const singleLetters = text.match(/[a-z]/g);
    if (singleLetters && singleLetters.length === 1) {
      return singleLetters[0];
    }

    // If multiple letters, use first one
    if (singleLetters && singleLetters.length > 1) {
      return singleLetters[0];
    }

    return '';
  };

  const processGuess = (letter: string) => {
    if (!currentWord) return;
    
    const lowerLetter = letter.toLowerCase();
    
    if (guessedLetters.includes(lowerLetter)) {
      return; // Already guessed
    }

    setGuessedLetters(prev => [...prev, lowerLetter]);

    const isLetterInWord = currentWord.english.toLowerCase().includes(lowerLetter);
    
    if (!isLetterInWord) {
      setWrongGuesses(prev => {
        const newWrongGuesses = prev + 1;
        if (newWrongGuesses >= 6) {
          setGameStatus('lost');
        }
        return newWrongGuesses;
      });
    } else {
      // Check if word is complete after this guess
      setTimeout(() => {
        const wordLetters = currentWord.english.toLowerCase().split('');
        const allLettersGuessed = wordLetters.every(l => 
          l === ' ' || [...guessedLetters, lowerLetter].includes(l)
        );
        
        if (allLettersGuessed) {
          setGameStatus('won');
        }
      }, 100);
    }
  };

  const playWordPronunciation = () => {
    if (!currentWord) return;
    speak(`${currentWord.english}. In Turkish: ${currentWord.turkish}`);
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
                
                {/* Speech Result Display */}
                {heardLetter && (
                  <div className="bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border border-blue-300/50 rounded-xl p-4">
                    <p className="text-cyan-100 text-lg">
                      {heardLetter.includes('❌') ? heardLetter : `We heard: ${heardLetter}`}
                    </p>
                  </div>
                )}

                {/* Main Speech Button */}
                <Button 
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isProcessing}
                  className={`w-full max-w-md py-8 text-2xl font-bold rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50 shadow-2xl ${
                    isRecording ? 'animate-pulse bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin h-6 w-6 border-3 border-white border-t-transparent rounded-full mr-3" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Mic className="h-8 w-8 mr-3" />
                      🎤 Tap to Speak a Letter
                    </>
                  )}
                </Button>

                {/* Debug Toggle and Input */}
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