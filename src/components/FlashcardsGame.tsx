import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mic, MicOff, Volume2, RotateCcw, Star, ChevronRight, Trophy } from 'lucide-react';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { supabase } from '@/integrations/supabase/client';
import { useGamification } from '@/hooks/useGamification';

interface FlashcardsGameProps {
  onBack: () => void;
}

// Sample vocabulary - in real app this would come from user's current lessons
const flashcardWords = [
  { english: 'apple', turkish: 'elma' },
  { english: 'water', turkish: 'su' },
  { english: 'book', turkish: 'kitap' },
  { english: 'house', turkish: 'ev' },
  { english: 'friend', turkish: 'arkadaş' },
  { english: 'happy', turkish: 'mutlu' },
  { english: 'beautiful', turkish: 'güzel' },
  { english: 'morning', turkish: 'sabah' }
];

export const FlashcardsGame: React.FC<FlashcardsGameProps> = ({ onBack }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [gamePhase, setGamePhase] = useState<'front' | 'back' | 'speaking' | 'feedback'>('front');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userResponse, setUserResponse] = useState('');
  const [pronunciationFeedback, setPronunciationFeedback] = useState('');
  const [cardResults, setCardResults] = useState<Array<{word: string, success: boolean}>>([]);
  const [roundComplete, setRoundComplete] = useState(false);
  
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  
  const { speak } = useTextToSpeech();
  const { addXP } = useGamification();

  const currentCard = flashcardWords[currentCardIndex];
  const progress = ((currentCardIndex + 1) / flashcardWords.length) * 100;

  const playCardPronunciation = () => {
    speak(currentCard.english);
  };

  const flipCard = () => {
    setShowBack(true);
    setGamePhase('back');
    // Auto-play pronunciation when card is flipped
    setTimeout(() => {
      playCardPronunciation();
    }, 500);
  };

  const startSpeakingChallenge = () => {
    setGamePhase('speaking');
    setUserResponse('');
    setPronunciationFeedback('');
  };

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

      // Auto-stop recording after 5 seconds
      setTimeout(() => {
        if (isRecording) stopRecording();
      }, 5000);

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

        // First transcribe
        const { data: transcribeData, error: transcribeError } = await supabase.functions.invoke('transcribe', {
          body: { audio: audioData }
        });

        if (transcribeError) throw transcribeError;

        const transcription = transcribeData.transcript || '';
        setUserResponse(transcription);

        // Then evaluate pronunciation
        const { data: evaluateData, error: evaluateError } = await supabase.functions.invoke('evaluate-speaking', {
          body: {
            question: `Say the word "${currentCard.english}" correctly`,
            answer: transcription,
            level: 'A1'
          }
        });

        if (evaluateError) throw evaluateError;

        const evaluation = evaluateData;
        setPronunciationFeedback(evaluation.feedback);
        
        const isCorrect = evaluation.score >= 3; // 3/5 or higher is considered correct
        
        setCardResults(prev => [...prev, { 
          word: currentCard.english, 
          success: isCorrect 
        }]);

        if (isCorrect) {
          addXP(20, 'Perfect pronunciation!'); // Reward for correct pronunciation
        }

        setGamePhase('feedback');
        setIsProcessing(false);
      };
    } catch (error) {
      console.error('Error processing audio:', error);
      setIsProcessing(false);
    }
  };

  const nextCard = () => {
    if (currentCardIndex < flashcardWords.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setShowBack(false);
      setGamePhase('front');
      setUserResponse('');
      setPronunciationFeedback('');
    } else {
      setRoundComplete(true);
    }
  };

  const restartGame = () => {
    setCurrentCardIndex(0);
    setShowBack(false);
    setGamePhase('front');
    setUserResponse('');
    setPronunciationFeedback('');
    setCardResults([]);
    setRoundComplete(false);
  };

  const getStarRating = () => {
    const correctCount = cardResults.filter(result => result.success).length;
    const percentage = (correctCount / cardResults.length) * 100;
    
    if (percentage >= 90) return { stars: 3, label: 'Gold', color: 'text-yellow-400' };
    if (percentage >= 70) return { stars: 2, label: 'Silver', color: 'text-gray-300' };
    if (percentage >= 50) return { stars: 1, label: 'Bronze', color: 'text-orange-400' };
    return { stars: 0, label: 'Try Again', color: 'text-gray-500' };
  };

  if (roundComplete) {
    const rating = getStarRating();
    const correctCount = cardResults.filter(result => result.success).length;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="absolute inset-0 w-full h-full background-stars pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(2px 2px at 20px 30px, #fff, transparent), radial-gradient(2px 2px at 40px 70px, #fff, transparent), radial-gradient(1px 1px at 90px 40px, #fff, transparent)', backgroundSize: '100px 100px' }} 
        />
        
        <div className="relative max-w-2xl mx-auto pt-8">
          <Card className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/20 text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-400" />
                Round Complete!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="space-y-4">
                <div className="flex justify-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-8 w-8 ${i < rating.stars ? rating.color + ' fill-current' : 'text-gray-600'}`}
                    />
                  ))}
                </div>
                <Badge variant="outline" className={`${rating.color} border-current text-lg px-4 py-2`}>
                  {rating.label}
                </Badge>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-lg font-bold mb-2">Your Results</h3>
                <p className="text-2xl font-bold text-green-400">{correctCount}/{cardResults.length}</p>
                <p className="text-white/70 text-sm">Correct pronunciations</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold">Word Breakdown:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {cardResults.map((result, index) => (
                    <div 
                      key={index}
                      className={`flex items-center justify-between p-2 rounded ${
                        result.success ? 'bg-green-500/20' : 'bg-red-500/20'
                      }`}
                    >
                      <span>{result.word}</span>
                      <span>{result.success ? '✅' : '❌'}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={restartGame}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Play Again
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
            Card {currentCardIndex + 1} of {flashcardWords.length}
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <Progress value={progress} className="h-2 bg-white/20" />
          <p className="text-white/60 text-center text-sm">Progress: {Math.round(progress)}%</p>
        </div>

        <Card className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/20 text-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              🃏 Flashcards
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Flashcard */}
            <div 
              className="relative h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-white/20 cursor-pointer group"
              onClick={gamePhase === 'front' ? flipCard : undefined}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 p-6">
                {gamePhase === 'front' ? (
                  <>
                    <div className="text-4xl font-bold text-center">{currentCard.english}</div>
                    <p className="text-white/60 text-sm text-center">Click to reveal Turkish meaning</p>
                  </>
                ) : (
                  <>
                    <div className="text-3xl font-bold text-center">{currentCard.english}</div>
                    <div className="text-2xl text-blue-300 text-center">{currentCard.turkish}</div>
                    <Button
                      onClick={playCardPronunciation}
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <Volume2 className="h-4 w-4 mr-2" />
                      Listen
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Game Phases */}
            {gamePhase === 'back' && (
              <div className="text-center space-y-4">
                <p className="text-white/80">Ready to practice pronunciation?</p>
                <Button
                  onClick={startSpeakingChallenge}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  Start Speaking Challenge
                </Button>
              </div>
            )}

            {gamePhase === 'speaking' && (
              <div className="text-center space-y-4">
                <p className="text-white/80">Say "{currentCard.english}" clearly:</p>
                
                {userResponse && (
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-blue-300 text-sm">We heard: <span className="font-bold">"{userResponse}"</span></p>
                  </div>
                )}

                <Button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isProcessing}
                  className={`w-32 h-32 rounded-full ${
                    isRecording 
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                      : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
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
                  {isRecording ? 'Listening... (5 seconds)' : 'Tap to record your pronunciation'}
                </p>
              </div>
            )}

            {gamePhase === 'feedback' && (
              <div className="text-center space-y-4">
                <div className={`border rounded-lg p-4 ${
                  cardResults[cardResults.length - 1]?.success 
                    ? 'bg-green-500/20 border-green-500/30' 
                    : 'bg-orange-500/20 border-orange-500/30'
                }`}>
                  <h3 className="font-bold mb-2">
                    {cardResults[cardResults.length - 1]?.success ? '🎉 Great job!' : '📚 Keep practicing!'}
                  </h3>
                  <p className="text-sm">{pronunciationFeedback}</p>
                </div>
                
                <Button
                  onClick={nextCard}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  {currentCardIndex < flashcardWords.length - 1 ? (
                    <>
                      Next Card <ChevronRight className="h-4 w-4 ml-2" />
                    </>
                  ) : (
                    'View Results'
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};