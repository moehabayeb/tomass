import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Mic, MicOff, Volume2, RotateCcw, Trophy, Target } from 'lucide-react';
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
  const [gameHistory, setGameHistory] = useState<Array<{
    word: GameWord;
    status: 'won' | 'lost';
    wrongGuesses: number;
    xpEarned: number;
  }>>([]);
  
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
        
        setGameHistory(prev => [...prev, {
          word: currentWord,
          status: 'won',
          wrongGuesses,
          xpEarned
        }]);
      } else if (wrongGuesses >= maxWrongGuesses) {
        setGameStatus('lost');
        setGameHistory(prev => [...prev, {
          word: currentWord,
          status: 'lost',
          wrongGuesses,
          xpEarned: 0
        }]);
      }
    }
  }, [guessedLetters, wrongGuesses, gameStatus, currentWord]);

  const startRecording = async () => {
    console.log('🎙️ START RECORDING - Button clicked');
    try {
      // Enhanced audio constraints for better letter recognition
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000, // Optimal for Whisper
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      console.log('✅ Microphone access granted');
      
      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
        audioBitsPerSecond: 128000 // Higher quality for single letters
      });
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        console.log('📊 Audio data available:', event.data.size, 'bytes');
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = async () => {
        console.log('🛑 Recording stopped, processing audio...');
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        console.log('📦 Audio blob created:', audioBlob.size, 'bytes');
        await processAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      // Start recording with timeslice for better data collection
      mediaRecorder.current.start(250); // Collect data every 250ms
      setIsRecording(true);
      setHeardLetter('🎤 Listening...');
      console.log('🔴 Recording started - isRecording set to true');

      // Auto-stop recording after 3 seconds for single letters
      setTimeout(() => {
        console.log('⏰ 3 seconds elapsed, checking if still recording...');
        if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
          console.log('⏹️ Auto-stopping recording after 3 seconds');
          stopRecording();
        }
      }, 3000);

    } catch (error) {
      console.error('❌ Error accessing microphone:', error);
      setHeardLetter('❌ Microphone access denied');
    }
  };

  const stopRecording = () => {
    console.log('🛑 STOP RECORDING - Button clicked');
    if (mediaRecorder.current && isRecording) {
      console.log('✅ Stopping media recorder...');
      mediaRecorder.current.stop();
      setIsRecording(false);
      console.log('🔴 Recording stopped - isRecording set to false');
    } else {
      console.log('❌ Cannot stop recording - mediaRecorder:', !!mediaRecorder.current, 'isRecording:', isRecording);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    try {
      setIsProcessing(true);
      setHeardLetter('🔄 Processing...');
      console.log('📦 Processing audio blob, size:', audioBlob.size, 'bytes');
      
      if (audioBlob.size === 0 || audioBlob.size < 1000) {
        console.error('❌ Audio blob too small:', audioBlob.size, 'bytes');
        setHeardLetter('❌ No clear audio detected');
        setIsProcessing(false);
        // Clear message after 3 seconds
        setTimeout(() => setHeardLetter(''), 3000);
        return;
      }
      
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        try {
          const base64data = reader.result as string;
          const audioData = base64data.split(',')[1];
          
          console.log('📤 Sending audio data to transcription service, length:', audioData.length);

          const { data, error } = await supabase.functions.invoke('transcribe', {
            body: { audio: audioData }
          });

          if (error) {
            console.error('❌ Transcription error:', error);
            setHeardLetter('❌ Speech recognition failed');
            setIsProcessing(false);
            setTimeout(() => setHeardLetter(''), 3000);
            return;
          }

          const transcription = data?.transcript?.toLowerCase().trim() || '';
          console.log('🎯 Transcription received:', transcription);
          
          // Extract first letter from transcription with enhanced logic
          const extractedLetter = extractLetterFromSpeech(transcription);
          console.log('🔤 Extracted letter:', extractedLetter);
          
          if (extractedLetter) {
            setHeardLetter(`🎯 You said: "${extractedLetter.toUpperCase()}"`);
            console.log('⚡ Processing guess for letter:', extractedLetter);
            processGuess(extractedLetter);
            
            // Keep message visible for 3 seconds
            setTimeout(() => {
              setHeardLetter('');
            }, 3000);
          } else {
            setHeardLetter(`❓ Heard: "${transcription}" - Try saying just the letter`);
            console.log('❌ No valid letter extracted from:', transcription);
            setTimeout(() => setHeardLetter(''), 4000);
          }
          
        } catch (innerError) {
          console.error('❌ Inner processing error:', innerError);
          setHeardLetter('❌ Processing failed');
          setTimeout(() => setHeardLetter(''), 3000);
        } finally {
          setIsProcessing(false);
        }
      };
      
      reader.onerror = () => {
        console.error('❌ FileReader error');
        setHeardLetter('❌ Audio processing failed');
        setIsProcessing(false);
        setTimeout(() => setHeardLetter(''), 3000);
      };
      
    } catch (error) {
      console.error('❌ Error processing audio:', error);
      setHeardLetter('❌ Audio error');
      setIsProcessing(false);
      setTimeout(() => setHeardLetter(''), 3000);
    }
  };

  const extractLetterFromSpeech = (text: string): string => {
    console.log('🔍 Extracting letter from:', text);
    
    // Enhanced letter mappings with more variations
    const letterMappings: Record<string, string> = {
      // A variations
      'a': 'a', 'ay': 'a', 'eh': 'a', 'letter a': 'a', 'the letter a': 'a',
      // B variations  
      'b': 'b', 'bee': 'b', 'be': 'b', 'letter b': 'b', 'the letter b': 'b',
      // C variations
      'c': 'c', 'see': 'c', 'sea': 'c', 'letter c': 'c', 'the letter c': 'c',
      // D variations
      'd': 'd', 'dee': 'd', 'de': 'd', 'letter d': 'd', 'the letter d': 'd',
      // E variations
      'e': 'e', 'ee': 'e', 'letter e': 'e', 'the letter e': 'e',
      // F variations
      'f': 'f', 'ef': 'f', 'eff': 'f', 'letter f': 'f', 'the letter f': 'f',
      // G variations
      'g': 'g', 'gee': 'g', 'ji': 'g', 'letter g': 'g', 'the letter g': 'g',
      // H variations
      'h': 'h', 'aitch': 'h', 'ach': 'h', 'letter h': 'h', 'the letter h': 'h',
      // I variations
      'i': 'i', 'eye': 'i', 'ai': 'i', 'letter i': 'i', 'the letter i': 'i',
      // J variations
      'j': 'j', 'jay': 'j', 'jey': 'j', 'letter j': 'j', 'the letter j': 'j',
      // K variations
      'k': 'k', 'kay': 'k', 'key': 'k', 'letter k': 'k', 'the letter k': 'k',
      // L variations
      'l': 'l', 'el': 'l', 'ell': 'l', 'letter l': 'l', 'the letter l': 'l',
      // M variations
      'm': 'm', 'em': 'm', 'letter m': 'm', 'the letter m': 'm',
      // N variations
      'n': 'n', 'en': 'n', 'letter n': 'n', 'the letter n': 'n',
      // O variations
      'o': 'o', 'oh': 'o', 'letter o': 'o', 'the letter o': 'o',
      // P variations
      'p': 'p', 'pee': 'p', 'pe': 'p', 'letter p': 'p', 'the letter p': 'p',
      // Q variations
      'q': 'q', 'que': 'q', 'queue': 'q', 'letter q': 'q', 'the letter q': 'q',
      // R variations
      'r': 'r', 'are': 'r', 'ar': 'r', 'letter r': 'r', 'the letter r': 'r',
      // S variations
      's': 's', 'es': 's', 'ess': 's', 'letter s': 's', 'the letter s': 's',
      // T variations
      't': 't', 'tee': 't', 'te': 't', 'letter t': 't', 'the letter t': 't',
      // U variations
      'u': 'u', 'you': 'u', 'yu': 'u', 'letter u': 'u', 'the letter u': 'u',
      // V variations
      'v': 'v', 'vee': 'v', 've': 'v', 'letter v': 'v', 'the letter v': 'v',
      // W variations
      'w': 'w', 'double u': 'w', 'double you': 'w', 'letter w': 'w', 'the letter w': 'w',
      // X variations
      'x': 'x', 'ex': 'x', 'letter x': 'x', 'the letter x': 'x',
      // Y variations
      'y': 'y', 'why': 'y', 'wai': 'y', 'letter y': 'y', 'the letter y': 'y',
      // Z variations
      'z': 'z', 'zee': 'z', 'zed': 'z', 'letter z': 'z', 'the letter z': 'z'
    };

    // First try exact mapping (most common case)
    if (letterMappings[text]) {
      console.log('✅ Exact match found:', letterMappings[text]);
      return letterMappings[text];
    }

    // Try to find letter phrases in the text
    for (const [key, value] of Object.entries(letterMappings)) {
      if (text.includes(key)) {
        console.log('✅ Phrase match found:', key, '->', value);
        return value;
      }
    }

    // Extract single alphabetic characters
    const singleLetters = text.match(/[a-z]/g);
    if (singleLetters && singleLetters.length === 1) {
      console.log('✅ Single letter extracted:', singleLetters[0]);
      return singleLetters[0];
    }

    // If multiple letters, try to pick the most likely one
    if (singleLetters && singleLetters.length > 1) {
      console.log('⚠️ Multiple letters found:', singleLetters, 'using first one');
      return singleLetters[0];
    }

    console.log('❌ No letter found in:', text);
    return '';
  };

  const processGuess = (letter: string) => {
    console.log('=== PROCESS GUESS START ===');
    console.log('Input letter:', letter);
    console.log('Current word:', currentWord);
    console.log('Current guessed letters:', guessedLetters);
    console.log('Current wrong guesses:', wrongGuesses);
    
    if (!currentWord) {
      console.log('❌ No current word available');
      return;
    }
    
    const lowerLetter = letter.toLowerCase();
    console.log('Processing guess:', lowerLetter, 'for word:', currentWord.english);
    
    if (guessedLetters.includes(lowerLetter)) {
      console.log('❌ Letter already guessed:', lowerLetter);
      return; // Already guessed
    }

    console.log('✅ Adding letter to guessed letters:', lowerLetter);
    setGuessedLetters(prev => {
      const newGuessedLetters = [...prev, lowerLetter];
      console.log('Updated guessed letters:', newGuessedLetters);
      return newGuessedLetters;
    });

    const isLetterInWord = currentWord.english.toLowerCase().includes(lowerLetter);
    console.log('Is letter in word?', isLetterInWord);
    
    if (!isLetterInWord) {
      console.log('❌ Letter not in word, incrementing wrong guesses');
      setWrongGuesses(prev => {
        const newWrongGuesses = prev + 1;
        console.log('Updated wrong guesses:', newWrongGuesses);
        
        // Check if game should end
        if (newWrongGuesses >= 6) {
          console.log('🎮 GAME OVER - Max wrong guesses reached');
          setGameStatus('lost');
        }
        
        return newWrongGuesses;
      });
    } else {
      console.log('✅ Correct letter! Letter is in word:', currentWord.english);
      
      // Check if word is complete after this guess
      setTimeout(() => {
        const wordLetters = currentWord.english.toLowerCase().split('');
        const allLettersGuessed = wordLetters.every(l => 
          l === ' ' || [...guessedLetters, lowerLetter].includes(l)
        );
        
        console.log('Word letters:', wordLetters);
        console.log('All letters guessed?', allLettersGuessed);
        
        if (allLettersGuessed) {
          console.log('🎉 WORD COMPLETED - Player wins!');
          setGameStatus('won');
        }
      }, 100);
    }
    
    console.log('=== PROCESS GUESS END ===');
  };

  const playWordPronunciation = () => {
    if (!currentWord) return;
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
                Turkish: {gameStatus !== 'playing' && currentWord ? currentWord.turkish : '???'}
              </p>
              {currentWord?.source && (
                <p className="text-white/40 text-xs mt-1">
                  From: {currentWord.source}
                </p>
              )}
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
                      currentWord && currentWord.english.toLowerCase().includes(letter)
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
              <div className="text-center space-y-6">
                <div className="bg-gradient-to-r from-violet-500/30 to-purple-500/30 border border-purple-300/50 rounded-xl p-4 backdrop-blur-sm">
                  <p className="text-white text-lg font-medium">🎙️ Speak a letter to guess</p>
                </div>
                
                {heardLetter && (
                  <div className="bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border border-blue-300/50 rounded-xl p-4 animate-fade-in">
                    <p className="text-cyan-200 text-base font-medium">
                      We heard: <span className="font-bold text-cyan-100 text-xl">"{heardLetter}"</span>
                    </p>
                  </div>
                )}

                <Button 
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isProcessing}
                  className={`w-full max-w-xs py-8 text-xl font-bold rounded-full border-0 hover:scale-105 transition-all duration-300 disabled:opacity-50 shadow-xl ${isRecording ? 'animate-pulse' : ''}`}
                  size="lg"
                  style={{
                    backgroundColor: isRecording ? 'hsl(350, 85%, 60%)' : 'hsl(var(--mic-button))',
                    color: 'hsl(var(--text-white))',
                    background: isRecording 
                      ? 'linear-gradient(45deg, hsl(350, 85%, 60%), hsl(350, 85%, 75%))' 
                      : 'linear-gradient(45deg, hsl(var(--mic-button)), hsl(350, 85%, 70%))',
                    boxShadow: isRecording ? '0 0 40px hsl(350, 85%, 60%)' : 'var(--shadow-strong)',
                    minHeight: '64px'
                  }}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin h-6 w-6 border-3 border-white border-t-transparent rounded-full mr-3" />
                      Processing...
                    </>
                  ) : isRecording ? (
                    <>
                      <MicOff className="h-6 w-6 mr-3" />
                      🛑 Click to Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="h-6 w-6 mr-3" />
                      🎤 Tap to Speak Letter
                    </>
                  )}
                </Button>
                
                 <p className="text-white/70 text-base">
                   {isRecording ? '🎵 Listening for your letter... (3 seconds)' : '💡 Say any letter clearly: A, B, C...'}
                 </p>
                 
                 {/* Enhanced feedback message */}
                 {heardLetter && (
                   <div className="bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-300/50 rounded-xl p-4 backdrop-blur-sm mt-4 animate-fade-in">
                     <p className="text-white font-bold text-lg">{heardLetter}</p>
                   </div>
                 )}
                 
                 {/* Debug Input for Testing */}
                 <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-300/50 rounded-xl p-4 backdrop-blur-sm">
                   <p className="text-yellow-200 text-sm font-medium mb-2">🔧 Debug: Type a letter to test</p>
                   <input
                     type="text"
                     maxLength={1}
                     placeholder="A"
                     className="w-16 h-12 text-center text-2xl font-bold bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                     onChange={(e) => {
                       const letter = e.target.value.toLowerCase();
                       if (letter && /^[a-z]$/.test(letter)) {
                         console.log('Manual input letter:', letter);
                         processGuess(letter);
                         e.target.value = ''; // Clear input after processing
                       }
                     }}
                   />
                 </div>
              </div>
            )}

            {/* Game Over */}
            {gameStatus !== 'playing' && (
              <div className="text-center space-y-6">
                {gameStatus === 'won' ? (
                  <div className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 border border-green-300/50 rounded-xl p-6 animate-fade-in relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-green-400/20 animate-pulse"></div>
                    <div className="relative z-10">
                      <div className="text-6xl mb-4 animate-bounce">🎉</div>
                      <h3 className="text-3xl font-bold text-green-200 mb-3">✅ You Got It!</h3>
                      <p className="text-white/90 text-xl mb-4">Perfect! The word was: <span className="font-bold text-yellow-300">{currentWord?.english?.toUpperCase()}</span></p>
                      <div className="bg-gradient-to-r from-yellow-400/30 to-green-400/30 rounded-lg p-4 mb-4">
                        <div className="text-2xl font-bold text-yellow-200 animate-pulse">🌟 +50 XP Earned! 🌟</div>
                        <p className="text-white/80 text-sm mt-2">Excellent pronunciation and spelling!</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-red-500/30 to-orange-500/30 border border-red-300/50 rounded-xl p-6 animate-fade-in">
                    <div className="text-6xl mb-4">😔</div>
                    <h3 className="text-3xl font-bold text-red-200 mb-3">❌ Out of Guesses!</h3>
                    <p className="text-white/90 text-lg mb-2">The word was:</p>
                    <p className="text-3xl font-bold text-white bg-black/20 rounded-lg p-3 mb-3">{currentWord?.english?.toUpperCase()}</p>
                    <p className="text-lg text-blue-300 mb-2">Turkish: {currentWord?.turkish}</p>
                    {currentWord?.source && (
                      <p className="text-white/60 text-sm">From: {currentWord.source}</p>
                    )}
                    <div className="bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg p-3 mt-4">
                      <p className="text-white/80 text-sm">💡 Try again to improve your vocabulary!</p>
                    </div>
                  </div>
                )}
                
                <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-white/20 rounded-xl p-4 backdrop-blur-sm">
                  <h4 className="text-white font-bold mb-3">📖 Learn This Word</h4>
                  <Button
                    onClick={playWordPronunciation}
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/20 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm py-3 text-lg"
                  >
                    <Volume2 className="h-5 w-5 mr-3" />
                    🔊 Hear Pronunciation & Translation
                  </Button>
                </div>
                
                <Button
                  onClick={startNewGame}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <RotateCcw className="h-5 w-5 mr-3" />
                  🎮 Play Next Word
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};