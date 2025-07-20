import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Mic, MicOff, Volume2, RotateCcw, Trophy } from 'lucide-react';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { supabase } from '@/integrations/supabase/client';
import { useGamification } from '@/hooks/useGamification';

interface HangmanGameProps {
  onBack: () => void;
}

// Sample vocabulary - in real app this would come from user's current lessons
const gameWords = [
  { english: 'book', turkish: 'kitap' },
  { english: 'house', turkish: 'ev' },
  { english: 'water', turkish: 'su' },
  { english: 'friend', turkish: 'arkadaş' },
  { english: 'school', turkish: 'okul' },
  { english: 'family', turkish: 'aile' },
  { english: 'happy', turkish: 'mutlu' },
  { english: 'beautiful', turkish: 'güzel' },
  { english: 'morning', turkish: 'sabah' },
  { english: 'evening', turkish: 'akşam' }
];

export const HangmanGame: React.FC<HangmanGameProps> = ({ onBack }) => {
  const [currentWord, setCurrentWord] = useState(gameWords[0]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [isRecording, setIsRecording] = useState(false);
  const [heardLetter, setHeardLetter] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [score, setScore] = useState(0);
  
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const maxWrongGuesses = 6;
  
  const { speak } = useTextToSpeech();
  const { addXP } = useGamification();

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomWord = gameWords[Math.floor(Math.random() * gameWords.length)];
    setCurrentWord(randomWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameStatus('playing');
    setHeardLetter('');
  };

  const displayWord = () => {
    return currentWord.english
      .split('')
      .map(letter => (guessedLetters.includes(letter.toLowerCase()) ? letter : '_'))
      .join(' ');
  };

  const isWordComplete = () => {
    return currentWord.english
      .toLowerCase()
      .split('')
      .every(letter => guessedLetters.includes(letter));
  };

  useEffect(() => {
    if (gameStatus === 'playing') {
      if (isWordComplete()) {
        setGameStatus('won');
        setScore(prev => prev + 10);
        addXP(50, 'Hangman victory!'); // Reward XP for winning
      } else if (wrongGuesses >= maxWrongGuesses) {
        setGameStatus('lost');
      }
    }
  }, [guessedLetters, wrongGuesses, gameStatus]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        await processAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setHeardLetter('');

      // Auto-stop recording after 3 seconds
      setTimeout(() => {
        if (isRecording) stopRecording();
      }, 3000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
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
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        const audioData = base64data.split(',')[1];

        const { data, error } = await supabase.functions.invoke('transcribe', {
          body: { audio: audioData }
        });

        if (error) throw error;

        const transcription = data.transcript?.toLowerCase().trim() || '';
        console.log('Heard:', transcription);
        
        // Extract first letter from transcription
        const extractedLetter = extractLetterFromSpeech(transcription);
        
        if (extractedLetter) {
          setHeardLetter(extractedLetter.toUpperCase());
          processGuess(extractedLetter);
        } else {
          setHeardLetter('?');
        }
        
        setIsProcessing(false);
      };
    } catch (error) {
      console.error('Error processing audio:', error);
      setIsProcessing(false);
    }
  };

  const extractLetterFromSpeech = (text: string): string => {
    // Handle common letter pronunciations
    const letterMappings: Record<string, string> = {
      'a': 'a', 'ay': 'a', 'eh': 'a',
      'b': 'b', 'bee': 'b', 'be': 'b',
      'c': 'c', 'see': 'c', 'sea': 'c',
      'd': 'd', 'dee': 'd', 'de': 'd',
      'e': 'e', 'ee': 'e',
      'f': 'f', 'ef': 'f', 'eff': 'f',
      'g': 'g', 'gee': 'g', 'ji': 'g',
      'h': 'h', 'aitch': 'h', 'ach': 'h',
      'i': 'i', 'eye': 'i', 'ai': 'i',
      'j': 'j', 'jay': 'j', 'jey': 'j',
      'k': 'k', 'kay': 'k', 'key': 'k',
      'l': 'l', 'el': 'l', 'ell': 'l',
      'm': 'm', 'em': 'm',
      'n': 'n', 'en': 'n',
      'o': 'o', 'oh': 'o',
      'p': 'p', 'pee': 'p', 'pe': 'p',
      'q': 'q', 'que': 'q', 'queue': 'q',
      'r': 'r', 'are': 'r', 'ar': 'r',
      's': 's', 'es': 's', 'ess': 's',
      't': 't', 'tee': 't', 'te': 't',
      'u': 'u', 'you': 'u', 'yu': 'u',
      'v': 'v', 'vee': 'v', 've': 'v',
      'w': 'w', 'double u': 'w', 'double you': 'w',
      'x': 'x', 'ex': 'x',
      'y': 'y', 'why': 'y', 'wai': 'y',
      'z': 'z', 'zee': 'z', 'zed': 'z'
    };

    // First try exact mapping
    if (letterMappings[text]) {
      return letterMappings[text];
    }

    // Try to find any single letter in the text
    for (const [key, value] of Object.entries(letterMappings)) {
      if (text.includes(key)) {
        return value;
      }
    }

    // If it's a single character and alphabetic, return it
    if (text.length === 1 && /[a-z]/.test(text)) {
      return text;
    }

    return '';
  };

  const processGuess = (letter: string) => {
    const lowerLetter = letter.toLowerCase();
    
    if (guessedLetters.includes(lowerLetter)) {
      return; // Already guessed
    }

    setGuessedLetters(prev => [...prev, lowerLetter]);

    if (!currentWord.english.toLowerCase().includes(lowerLetter)) {
      setWrongGuesses(prev => prev + 1);
    }
  };

  const playWordPronunciation = () => {
    speak(`${currentWord.english}. In Turkish: ${currentWord.turkish}`);
  };

  const getHangmanStage = () => {
    const stages = [
      '   +---+\n   |   |\n       |\n       |\n       |\n       |\n=========',
      '   +---+\n   |   |\n   O   |\n       |\n       |\n       |\n=========',
      '   +---+\n   |   |\n   O   |\n   |   |\n       |\n       |\n=========',
      '   +---+\n   |   |\n   O   |\n  /|   |\n       |\n       |\n=========',
      '   +---+\n   |   |\n   O   |\n  /|\\  |\n       |\n       |\n=========',
      '   +---+\n   |   |\n   O   |\n  /|\\  |\n  /    |\n       |\n=========',
      '   +---+\n   |   |\n   O   |\n  /|\\  |\n  / \\  |\n       |\n========='
    ];
    return stages[wrongGuesses] || stages[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="absolute inset-0 w-full h-full background-stars pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(2px 2px at 20px 30px, #fff, transparent), radial-gradient(2px 2px at 40px 70px, #fff, transparent), radial-gradient(1px 1px at 90px 40px, #fff, transparent)', backgroundSize: '100px 100px' }} 
      />
      
      <div className="relative max-w-2xl mx-auto pt-8">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Games
          </Button>
          <div className="text-white text-sm">
            Score: <span className="font-bold text-yellow-400">{score}</span>
          </div>
        </div>

        <Card className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/20 text-white mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
              🧩 Hangman Game
              {gameStatus === 'won' && <Trophy className="h-6 w-6 text-yellow-400" />}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Hangman Drawing */}
            <div className="text-center">
              <pre className="text-white font-mono text-xs bg-black/20 p-4 rounded-lg inline-block">
                {getHangmanStage()}
              </pre>
            </div>

            {/* Word Display */}
            <div className="text-center">
              <div className="text-3xl font-bold tracking-wider mb-2">
                {displayWord()}
              </div>
              <p className="text-white/60 text-sm">
                Turkish: {gameStatus !== 'playing' ? currentWord.turkish : '???'}
              </p>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Wrong guesses:</span>
                <span className="text-red-400">{wrongGuesses}/{maxWrongGuesses}</span>
              </div>
              <Progress 
                value={(wrongGuesses / maxWrongGuesses) * 100} 
                className="h-2 bg-white/20"
              />
            </div>

            {/* Guessed Letters */}
            {guessedLetters.length > 0 && (
              <div className="text-center">
                <p className="text-sm text-white/60 mb-2">Guessed letters:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {guessedLetters.map((letter, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded text-sm ${
                        currentWord.english.toLowerCase().includes(letter)
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {letter.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Speaking Interface */}
            {gameStatus === 'playing' && (
              <div className="text-center space-y-4">
                <p className="text-white/80">Speak a letter to guess:</p>
                
                {heardLetter && (
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-blue-300 text-sm">We heard: <span className="font-bold">{heardLetter}</span></p>
                  </div>
                )}

                <Button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isProcessing}
                  className={`w-32 h-32 rounded-full ${
                    isRecording 
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                  }`}
                >
                  {isProcessing ? (
                    <div className="animate-spin h-8 w-8 border-2 border-white border-t-transparent rounded-full" />
                  ) : isRecording ? (
                    <MicOff className="h-12 w-12" />
                  ) : (
                    <Mic className="h-12 w-12" />
                  )}
                </Button>
                
                <p className="text-white/60 text-xs">
                  {isRecording ? 'Listening... (3 seconds)' : 'Tap to speak a letter'}
                </p>
              </div>
            )}

            {/* Game Over */}
            {gameStatus !== 'playing' && (
              <div className="text-center space-y-4">
                {gameStatus === 'won' ? (
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                    <h3 className="text-xl font-bold text-green-300 mb-2">🎉 You Won!</h3>
                    <p className="text-white/80">Great job! You guessed the word.</p>
                  </div>
                ) : (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                    <h3 className="text-xl font-bold text-red-300 mb-2">😔 Game Over</h3>
                    <p className="text-white/80">The word was: <span className="font-bold">{currentWord.english}</span></p>
                  </div>
                )}
                
                <div className="space-y-3">
                  <Button
                    onClick={playWordPronunciation}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    Hear Pronunciation
                  </Button>
                  
                  <Button
                    onClick={startNewGame}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Play Again
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