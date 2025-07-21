import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mic, MicOff, Volume2, RotateCcw, Star, ChevronRight, Trophy, BookOpen } from 'lucide-react';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { supabase } from '@/integrations/supabase/client';
import { useGamification } from '@/hooks/useGamification';
import { useGameVocabulary, type GameWord } from '@/hooks/useGameVocabulary';

interface FlashcardsGameProps {
  onBack: () => void;
}

export const FlashcardsGame: React.FC<FlashcardsGameProps> = ({ onBack }) => {
  const [flashcardWords, setFlashcardWords] = useState<GameWord[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [gamePhase, setGamePhase] = useState<'front' | 'back' | 'speaking' | 'feedback'>('front');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userResponse, setUserResponse] = useState('');
  const [pronunciationFeedback, setPronunciationFeedback] = useState('');
  const [cardResults, setCardResults] = useState<Array<{
    word: GameWord;
    userSaid: string;
    feedback: string;
    score: number;
    success: boolean;
    xpEarned: number;
  }>>([]);
  const [roundComplete, setRoundComplete] = useState(false);
  const [totalXPEarned, setTotalXPEarned] = useState(0);
  
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  
  const { speak } = useTextToSpeech();
  const { addXP } = useGamification();
  const { getWordsForFlashcards, isLoading: vocabLoading } = useGameVocabulary();

  // Initialize vocabulary when loaded
  useEffect(() => {
    if (!vocabLoading) {
      const words = getWordsForFlashcards();
      const selectedWords = words.slice(0, 8); // Limit to 8 cards for better experience
      setFlashcardWords(selectedWords);
    }
  }, [vocabLoading, getWordsForFlashcards]);

  const currentCard = flashcardWords[currentCardIndex];
  const progress = flashcardWords.length > 0 ? ((currentCardIndex + 1) / flashcardWords.length) * 100 : 0;

  const playCardPronunciation = () => {
    if (!currentCard) return;
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
        const xpEarned = isCorrect ? 20 : 5; // Reward even small attempts
        
        setCardResults(prev => [...prev, { 
          word: currentCard, 
          userSaid: transcription,
          feedback: evaluation.feedback,
          score: evaluation.score,
          success: isCorrect,
          xpEarned
        }]);

        setTotalXPEarned(prev => prev + xpEarned);

        if (isCorrect) {
          addXP(20, 'Perfect pronunciation!');
        } else {
          addXP(5, 'Good effort!'); // Encourage even failed attempts
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
    setTotalXPEarned(0);
    
    // Reload fresh vocabulary
    const words = getWordsForFlashcards();
    const selectedWords = words.slice(0, 8);
    setFlashcardWords(selectedWords);
  };

  const getStarRating = () => {
    const correctCount = cardResults.filter(result => result.success).length;
    const totalCount = cardResults.length;
    const percentage = totalCount > 0 ? (correctCount / totalCount) * 100 : 0;
    
    if (percentage >= 90) return { stars: 3, label: 'Gold', color: 'text-yellow-400' };
    if (percentage >= 70) return { stars: 2, label: 'Silver', color: 'text-gray-300' };
    if (percentage >= 50) return { stars: 1, label: 'Bronze', color: 'text-orange-400' };
    return { stars: 0, label: 'Try Again', color: 'text-gray-500' };
  };

  const getAIAnalysis = () => {
    const correctCount = cardResults.filter(result => result.success).length;
    const totalCount = cardResults.length;
    const averageScore = cardResults.reduce((sum, result) => sum + result.score, 0) / totalCount;
    
    let analysis = '';
    if (averageScore >= 4.5) {
      analysis = 'Excellent pronunciation! Your accent is very clear and natural.';
    } else if (averageScore >= 3.5) {
      analysis = 'Good pronunciation overall. Focus on speaking more slowly for clarity.';
    } else if (averageScore >= 2.5) {
      analysis = 'Your pronunciation needs some practice. Try listening more to native speakers.';
    } else {
      analysis = 'Keep practicing! Focus on individual sounds and word stress patterns.';
    }
    
    const percentage = (correctCount / totalCount) * 100;
    let level = '';
    if (percentage >= 80) level = 'B1-B2 level based on clear pronunciation';
    else if (percentage >= 60) level = 'A2-B1 level with room for improvement';
    else level = 'A1-A2 level, keep practicing basics';
    
    return { analysis, level };
  };

  if (roundComplete) {
    const rating = getStarRating();
    const correctCount = cardResults.filter(result => result.success).length;
    const { analysis, level } = getAIAnalysis();
    
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

              <div className="bg-white/10 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <h3 className="text-lg font-bold mb-1">✅ Correct</h3>
                    <p className="text-2xl font-bold text-green-400">{correctCount}/{cardResults.length}</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold mb-1">⭐ XP Earned</h3>
                    <p className="text-2xl font-bold text-yellow-400">{totalXPEarned}</p>
                  </div>
                </div>
              </div>

              {/* Detailed Results Table */}
              <div className="bg-white/5 rounded-xl p-4 max-h-48 overflow-y-auto">
                <h4 className="font-bold mb-3 text-center">📊 Detailed Results</h4>
                <div className="space-y-2">
                  {cardResults.map((result, index) => (
                    <div 
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        result.success ? 'bg-green-500/20' : 'bg-orange-500/20'
                      }`}
                    >
                      <div className="flex-1 text-left">
                        <div className="font-medium">{result.word.english}</div>
                        <div className="text-sm text-white/70">You said: "{result.userSaid}"</div>
                        <div className="text-xs text-white/60">{result.feedback}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg">{result.success ? '✅' : '❌'}</div>
                        <div className="text-xs text-white/70">{result.score}/5</div>
                        <div className="text-xs text-yellow-400">+{result.xpEarned} XP</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Analysis */}
              <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/20 rounded-xl p-4">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  🤖 AI Analysis
                </h4>
                <p className="text-sm text-white/90 mb-3">{analysis}</p>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-xs text-white/80 font-medium">📈 Your Level: {level}</p>
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
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 rounded-full px-4 py-2 backdrop-blur-xl">
            <div className="text-white text-sm font-medium">
              Card {currentCardIndex + 1} of {flashcardWords.length}
            </div>
          </div>
        </div>

        {/* Game Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            🃏 Smart Flashcards
            <BookOpen className="h-8 w-8 text-green-400 animate-pulse" />
          </h2>
          <p className="text-white/70 text-lg">Listen, learn, and speak with confidence!</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/80 text-sm font-medium">Card Progress</span>
              <span className="text-white font-bold">{currentCardIndex + 1}/{flashcardWords.length}</span>
            </div>
            <Progress value={progress} className="h-3 bg-white/20" />
          </div>
        </div>

        <Card className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/30 text-white shadow-2xl">
          <CardContent className="space-y-6">
            {/* Enhanced Flashcard */}
            {currentCard && (
              <div 
                className={`relative h-80 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-2xl border-2 border-white/30 cursor-pointer group transition-all duration-500 hover:scale-105 shadow-2xl ${
                  gamePhase === 'front' ? 'hover:shadow-blue-500/20' : ''
                }`}
                onClick={gamePhase === 'front' ? flipCard : undefined}
              >
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 p-8">
                {gamePhase === 'front' ? (
                  <>
                    <div className="text-5xl font-bold text-center text-white drop-shadow-lg">
                      {currentCard.english}
                    </div>
                    <div className="bg-white/20 rounded-full px-6 py-2 backdrop-blur-sm border border-white/30">
                      <p className="text-white/90 text-base font-medium text-center">
                        🔄 Click to reveal meaning
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-4xl font-bold text-center text-white mb-2">
                      {currentCard.english}
                    </div>
                    <div className="text-3xl text-cyan-200 text-center font-semibold">
                      {currentCard.turkish}
                    </div>
                    {currentCard.source && (
                      <p className="text-white/60 text-sm">From: {currentCard.source}</p>
                    )}
                    <Button
                      onClick={playCardPronunciation}
                      size="lg"
                      variant="outline"
                      className="border-white/40 text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm py-3 px-6"
                    >
                      <Volume2 className="h-5 w-5 mr-3" />
                      🔊 Listen to Pronunciation
                    </Button>
                  </>
                )}
              </div>
              
              {/* Card flip animation indicator */}
              {gamePhase === 'front' && (
                <div className="absolute top-4 right-4 bg-white/20 rounded-full p-2 group-hover:scale-110 transition-transform">
                  <div className="text-white/80 text-lg">🔄</div>
                </div>
                )}
              </div>
            )}

            {/* Game Phases */}
            {gamePhase === 'back' && (
              <div className="text-center space-y-6">
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-white/20 rounded-xl p-6 backdrop-blur-sm">
                  <div className="text-2xl mb-2">🎯</div>
                  <p className="text-white text-lg font-medium mb-2">Ready for the challenge?</p>
                  <p className="text-white/80 text-base">Say the word clearly and get instant AI feedback!</p>
                </div>
                <Button
                  onClick={startSpeakingChallenge}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 py-4 px-8 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  🎤 Start Speaking Challenge
                </Button>
              </div>
            )}

            {gamePhase === 'speaking' && (
              <div className="text-center space-y-6">
                {currentCard && (
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/20 rounded-xl p-4 backdrop-blur-sm">
                    <p className="text-white text-xl font-bold mb-2">🎯 Say this word:</p>
                    <p className="text-3xl font-bold text-yellow-300">"{currentCard.english}"</p>
                  </div>
                )}
                
                {userResponse && (
                  <div className="bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-300/50 rounded-xl p-4 animate-fade-in">
                    <p className="text-cyan-200 text-lg font-medium">
                      We heard: <span className="font-bold text-cyan-100 text-xl">"{userResponse}"</span>
                    </p>
                  </div>
                )}

                <div className="relative">
                  <Button
                    onClick={isRecording ? stopRecording : startRecording}
                    disabled={isProcessing}
                    className={`w-44 h-44 rounded-full shadow-2xl transition-all duration-300 ${
                      isRecording 
                        ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 animate-pulse scale-110' 
                        : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-105'
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin h-16 w-16 border-4 border-white border-t-transparent rounded-full" />
                        <p className="text-sm mt-3 font-bold">Analyzing...</p>
                      </>
                    ) : isRecording ? (
                      <>
                        <MicOff className="h-20 w-20" />
                        <p className="text-sm mt-3 font-bold">Recording</p>
                      </>
                    ) : (
                      <>
                        <Mic className="h-20 w-20" />
                        <p className="text-sm mt-3 font-bold">Tap to Speak</p>
                      </>
                    )}
                  </Button>
                  
                  {isRecording && (
                    <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping opacity-75"></div>
                  )}
                </div>
                
                <p className="text-white/80 text-lg">
                  {isRecording ? '🎵 Recording your pronunciation... (5 seconds)' : '💡 Speak clearly and confidently!'}
                </p>
              </div>
            )}

            {gamePhase === 'feedback' && (
              <div className="text-center space-y-6">
                <div className={`border-2 rounded-xl p-6 backdrop-blur-sm animate-fade-in ${
                  cardResults[cardResults.length - 1]?.success 
                    ? 'bg-green-500/30 border-green-300/50' 
                    : 'bg-orange-500/30 border-orange-300/50'
                }`}>
                  <div className="text-4xl mb-3">
                    {cardResults[cardResults.length - 1]?.success ? '🎉' : '💪'}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">
                    {cardResults[cardResults.length - 1]?.success ? 'Excellent!' : 'Keep Growing!'}
                  </h3>
                  <p className="text-lg leading-relaxed">{pronunciationFeedback}</p>
                  
                  {cardResults[cardResults.length - 1]?.success && (
                    <div className="mt-4 text-yellow-400 text-lg font-bold">
                      +{cardResults[cardResults.length - 1]?.xpEarned || 20} XP Earned! ⭐
                    </div>
                  )}
                </div>
                
                <Button
                  onClick={nextCard}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {currentCardIndex < flashcardWords.length - 1 ? (
                    <>
                      🚀 Next Card <ChevronRight className="h-5 w-5 ml-2" />
                    </>
                  ) : (
                    '📊 View Final Results'
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