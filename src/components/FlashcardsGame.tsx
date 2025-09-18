import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Volume2, RotateCcw, Star, ChevronRight, Trophy, BookOpen } from 'lucide-react';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { supabase } from '@/integrations/supabase/client';
import { useGamification } from '@/hooks/useGamification';
import { useGameVocabulary } from '@/hooks/useGameVocabulary';
import { useHangmanAchievements } from '@/hooks/useHangmanAchievements';
import type { GameWord } from '@/hooks/useGameVocabulary';

interface FlashcardsGameProps {
  onBack: () => void;
}

export const FlashcardsGame: React.FC<FlashcardsGameProps> = ({ onBack }) => {
  const [flashcardWords, setFlashcardWords] = useState<GameWord[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [, setShowBack] = useState(false);
  const [gamePhase, setGamePhase] = useState<'front' | 'back' | 'speaking' | 'feedback'>('front');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userResponse, setUserResponse] = useState('');
  const [, setPronunciationFeedback] = useState('');
  const [cardResults, setCardResults] = useState<Array<{
    word: GameWord;
    userSaid: string;
    feedback: string;
    score: number;
    success: boolean;
    xpEarned: number;
    motivationalText?: string;
  }>>([]);
  const [roundComplete, setRoundComplete] = useState(false);
  const [totalXPEarned, setTotalXPEarned] = useState(0);
  
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  
  const { speak, soundEnabled, isSpeaking } = useTextToSpeech();
  const { addXP } = useGamification();
  const { getWordsForFlashcards, isLoading: vocabLoading } = useGameVocabulary();
  const {
    checkAchievements,
    recordGameStart,
    recordGameWin,
    recordGameLoss
  } = useHangmanAchievements();

  // Initialize vocabulary when loaded
  useEffect(() => {
    if (!vocabLoading) {
      const words = getWordsForFlashcards();
      const selectedWords = words.slice(0, 8); // Limit to 8 cards for better experience
      setFlashcardWords(selectedWords);

      // Record game start for achievements
      if (selectedWords.length > 0) {
        recordGameStart();
      }
    }
  }, [vocabLoading, getWordsForFlashcards, recordGameStart]);

  const currentCard = flashcardWords[currentCardIndex];
  const progress = flashcardWords.length > 0 ? ((currentCardIndex + 1) / flashcardWords.length) * 100 : 0;

  const playCardPronunciation = () => {
    if (!currentCard) {
      console.log('🔊 No current card available for pronunciation');
      return;
    }

    console.log('🔊 Playing pronunciation for:', currentCard.english);
    console.log('🔊 Sound enabled:', soundEnabled);
    console.log('🔊 Currently speaking:', isSpeaking);

    // Try the speak function first
    speak(currentCard.english);

    // Fallback to direct Web Speech API (always runs as backup)
    setTimeout(() => {
      if ('speechSynthesis' in window) {
        console.log('🔊 Using fallback Web Speech API');

        // Clear any existing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(currentCard.english);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        utterance.onstart = () => console.log('🔊 Fallback speech started');
        utterance.onend = () => console.log('🔊 Fallback speech ended');
        utterance.onerror = (error) => console.error('🔊 Fallback speech error:', error);

        window.speechSynthesis.speak(utterance);
      } else {
        console.error('🔊 Speech synthesis not supported in this browser');
      }
    }, 100); // Small delay to avoid conflicts
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
      console.log('🎤 Requesting microphone access...');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 44100,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      
      console.log('✅ Microphone access granted!', {
        streamId: stream.id,
        audioTracks: stream.getAudioTracks().length,
        trackSettings: stream.getAudioTracks()[0]?.getSettings()
      });

      const options = {
        mimeType: 'audio/webm;codecs=opus',
        audioBitsPerSecond: 128000
      };

      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.log('📱 Fallback: Using default audio format');
        mediaRecorder.current = new MediaRecorder(stream);
      } else {
        console.log('📱 Using MIME type:', options.mimeType);
        mediaRecorder.current = new MediaRecorder(stream, options);
      }

      audioChunks.current = [];
      console.log('🎤 MediaRecorder initialized successfully');

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
          console.log('📊 Audio chunk received:', event.data.size, 'bytes');
        }
      };

      mediaRecorder.current.onstop = async () => {
        console.log('⏹️ Recording stopped, processing', audioChunks.current.length, 'chunks');
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        console.log('🔊 Final audio blob size:', audioBlob.size, 'bytes');
        
        if (audioBlob.size > 0) {
          await processAudio(audioBlob);
        } else {
          console.error('❌ Empty audio blob');
          setUserResponse('❌ No audio recorded');
          setIsProcessing(false);
        }
        
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.current.onerror = (event) => {
        console.error('🚨 MediaRecorder error:', event);
        setUserResponse('❌ Recording error occurred');
        setIsProcessing(false);
      };

      mediaRecorder.current.start(100); // Collect data every 100ms
      setIsRecording(true);
      console.log('🎙️ Recording started');

      // Auto-stop recording after 5 seconds for better word capture
      setTimeout(() => {
        if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
          console.log('⏰ Auto-stopping recording after 5 seconds');
          stopRecording();
        }
      }, 5000);

    } catch (error) {
      console.error('❌ Error accessing microphone:', error);
      setUserResponse('❌ Microphone access denied');
      setIsProcessing(false);
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
      console.log('🔄 Starting audio processing...');

      // Create FormData with the audio file (as expected by transcribe function)
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');

      console.log('📤 Sending audio for transcription, blob size:', audioBlob.size);

      // First transcribe using FormData
      const { data: transcribeData, error: transcribeError } = await supabase.functions.invoke('transcribe', {
        body: formData
      });

      if (transcribeError) {
        console.error('❌ Transcription error:', transcribeError);
        throw transcribeError;
      }

      const transcription = transcribeData?.text || transcribeData?.transcript || '';
      console.log('✅ Raw transcription received:', transcription);

      if (!transcription.trim()) {
        setUserResponse('❌ No audio detected - please try speaking louder');
        setIsProcessing(false);
        setTimeout(() => {
          setUserResponse('');
        }, 3000);
        return;
      }

      // Show what the user actually said first
      setUserResponse(`What you said: "${transcription}"`);
      console.log('🗣️ User said:', transcription);

      // SIMPLIFIED WORD MATCHING (no more conversation AI)
      const cleanedUserInput = transcription.toLowerCase().trim().replace(/[^\w\s]/g, '');
      const cleanedExpected = currentCard.english.toLowerCase().trim();

      console.log('🔍 STRICT Word comparison:', {
        originalSpoken: transcription,
        cleanedUserInput: cleanedUserInput,
        cleanedExpected: cleanedExpected,
        exactMatch: cleanedUserInput === cleanedExpected,
        isSingleWord: !cleanedUserInput.includes(' '),
        currentCardData: currentCard
      });

      // BULLETPROOF: Only accept if it's an exact single-word match
      const isCorrect = cleanedUserInput === cleanedExpected && !cleanedUserInput.includes(' ');

      console.log('🎯 FINAL DECISION:', {
        isCorrect,
        reason: isCorrect ? 'Exact match found' : `"${cleanedUserInput}" !== "${cleanedExpected}" or contains spaces`
      });
      const xpEarned = isCorrect ? 20 : 5;

      // Enhanced feedback for gamified experience
      let finalFeedback;
      let motivationalText = '';

      if (isCorrect) {
        finalFeedback = `Perfect! You correctly said "${currentCard.english}"!`;
      } else {
        if (cleanedUserInput.includes(' ')) {
          finalFeedback = `Please say only one word! You said "${transcription}" but the correct answer is just "${currentCard.english}".`;
          motivationalText = "You're close! Try again!";
        } else {
          finalFeedback = `Wrong word! You said "${transcription}" but the correct answer is "${currentCard.english}".`;
          motivationalText = "Almost there, keep going!";
        }
      }

      setCardResults(prev => [...prev, {
        word: currentCard,
        userSaid: transcription,
        feedback: finalFeedback,
        score: isCorrect ? 5 : 2, // Simplified scoring
        success: isCorrect,
        xpEarned,
        motivationalText
      }]);

      setPronunciationFeedback(finalFeedback);
      setTotalXPEarned(prev => prev + xpEarned);

      if (isCorrect) {
        addXP(20, 'Perfect pronunciation!');
      } else {
        addXP(5, 'Good effort!'); // Encourage even failed attempts
      }

      setGamePhase('feedback');
      setIsProcessing(false);
    } catch (error) {
      console.error('❌ Audio processing error:', error);
      setUserResponse('❌ Audio processing failed');
      setIsProcessing(false);
      setTimeout(() => {
        setUserResponse('');
      }, 3000);
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

      // Record game completion for achievements
      const correctCount = cardResults.filter(result => result.success).length;
      const percentage = (correctCount / cardResults.length) * 100;

      if (percentage >= 70) {
        recordGameWin();
      } else {
        recordGameLoss();
      }

      // Check for new achievements
      checkAchievements();
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
          <Card className="bg-gradient-to-b from-indigo-500/30 to-purple-500/20 backdrop-blur-xl border border-purple-300/50 text-white">
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

               <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-white/20 rounded-lg p-4 space-y-3 backdrop-blur-sm">
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
               <div className="bg-gradient-to-r from-slate-500/20 to-gray-500/20 border border-white/10 rounded-xl p-4 max-h-48 overflow-y-auto backdrop-blur-sm">
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
                 <div className="bg-gradient-to-r from-indigo-500/20 to-blue-500/20 border border-white/20 rounded-lg p-3 backdrop-blur-sm">
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
           <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl p-4 backdrop-blur-sm border border-purple-300/30">
             <div className="flex justify-between items-center mb-2">
               <span className="text-white/80 text-sm font-medium">Card Progress</span>
               <span className="text-white font-bold">{currentCardIndex + 1}/{flashcardWords.length}</span>
             </div>
             <Progress value={progress} className="h-3 bg-white/20" />
           </div>
         </div>

        <Card className="bg-gradient-to-br from-emerald-500/30 to-teal-500/20 backdrop-blur-xl border border-emerald-300/50 text-white shadow-2xl">
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
                    <div className="text-5xl font-bold text-center text-cyan-200 drop-shadow-lg">
                      {currentCard.turkish}
                    </div>
                     <div className="bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full px-6 py-2 backdrop-blur-sm border border-emerald-300/40">
                       <p className="text-white/90 text-base font-medium text-center">
                         🔄 Click to reveal English word
                       </p>
                     </div>
                  </>
                ) : (
                  <>
                    <div className="text-3xl text-cyan-200 text-center font-semibold mb-2">
                      {currentCard.turkish}
                    </div>
                    <div className="text-4xl font-bold text-center text-white">
                      {currentCard.english}
                    </div>
                    {currentCard.source && (
                      <p className="text-white/60 text-sm">From: {currentCard.source}</p>
                    )}
                     <Button
                       onClick={(e) => {
                         e.stopPropagation();
                         e.preventDefault();
                         console.log('🔊 Pronunciation button clicked');
                         playCardPronunciation();
                       }}
                       type="button"
                       size="lg"
                       variant="outline"
                       className="border-white/40 text-white hover:bg-white/20 bg-gradient-to-r from-white/15 to-white/5 backdrop-blur-sm py-3 px-6 transition-all duration-200 hover:scale-105"
                     >
                       <Volume2 className="h-5 w-5 mr-3" />
                       🔊 Listen to Pronunciation
                     </Button>
                  </>
                )}
              </div>
              
              {/* Card flip animation indicator */}
              {gamePhase === 'front' && (
                 <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-white/20 rounded-full p-2 group-hover:scale-110 transition-transform backdrop-blur-sm">
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
                      <p className="text-white text-xl font-bold mb-2">🎯 Say the English word for:</p>
                      <p className="text-3xl font-bold text-cyan-300">"{currentCard.turkish}"</p>
                      <p className="text-white/60 text-sm mt-2">🎤 Speak the correct English translation</p>
                    </div>
                )}
                
                 {userResponse && (
                   <div className="bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-300/50 rounded-xl p-4 animate-fade-in">
                     <p className="text-cyan-200 text-lg font-medium">
                       {userResponse}
                     </p>
                   </div>
                 )}

                 {/* Enhanced Recording Button with Visual Feedback */}
                 <div className="flex flex-col items-center space-y-4">
                   {/* Microphone Level Indicator */}
                   {isRecording && (
                     <div className="flex items-center space-x-2 mb-4">
                       <div className="text-red-400 text-sm font-medium">Recording:</div>
                       <div className="flex space-x-1">
                         {[...Array(5)].map((_, i) => (
                           <div
                             key={i}
                             className={`w-2 h-6 bg-red-400 rounded-full animate-pulse`}
                             style={{
                               animationDelay: `${i * 0.1}s`,
                               animationDuration: '0.8s'
                             }}
                           />
                         ))}
                       </div>
                     </div>
                   )}

                   <Button
                     onClick={isRecording ? stopRecording : startRecording}
                     disabled={isProcessing}
                     className={`w-52 h-20 text-xl font-bold transition-all duration-300 rounded-2xl shadow-2xl ${
                       isRecording
                         ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white animate-pulse border-4 border-red-300'
                         : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white hover:scale-105'
                     } ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}`}
                   >
                     {isProcessing ? (
                       <>
                         <div className="animate-spin mr-3 text-2xl">⚙️</div>
                         Processing Audio...
                       </>
                     ) : isRecording ? (
                       <>
                         🛑 Stop Recording
                       </>
                     ) : (
                       <>
                         🎤 Start Recording
                       </>
                     )}
                   </Button>

                   <div className="text-center space-y-2">
                     <div className="text-sm text-white/80 font-medium">
                       {isRecording ? '🔴 Listening... Speak the English word clearly!' : '💡 Tap to record your pronunciation'}
                     </div>
                     {isRecording && (
                       <div className="text-xs text-white/60">
                         Auto-stop in 5 seconds
                       </div>
                     )}
                   </div>
                 </div>
                
                <p className="text-white/80 text-lg">
                  {isRecording ? '🎵 Recording your pronunciation... (5 seconds)' : '💡 Speak clearly and confidently!'}
                </p>
              </div>
            )}

            {gamePhase === 'feedback' && (
              <div className="text-center space-y-6">
                {cardResults[cardResults.length - 1]?.success ? (
                  // ✅ CORRECT ANSWER - Success Screen
                  <div className="bg-gradient-to-br from-green-400/30 to-emerald-500/30 border-2 border-green-300/60 rounded-2xl p-8 backdrop-blur-sm animate-scale-in shadow-2xl">
                    <div className="text-6xl mb-4 animate-bounce">🎉</div>
                    <h3 className="text-3xl font-bold mb-4 text-green-100">Excellent!</h3>
                    <div className="bg-white/10 rounded-xl p-4 mb-4 backdrop-blur-sm">
                      <p className="text-lg text-white/90">Perfect! You correctly said</p>
                      <p className="text-2xl font-bold text-green-200 mt-1">"{cardResults[cardResults.length - 1]?.word.english}"</p>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-300/40 rounded-xl p-4 mb-6">
                      <div className="text-yellow-200 text-2xl font-bold flex items-center justify-center gap-2">
                        <Star className="h-6 w-6 fill-current" />
                        +{cardResults[cardResults.length - 1]?.xpEarned || 20} XP Earned!
                        <Star className="h-6 w-6 fill-current" />
                      </div>
                    </div>
                  </div>
                ) : (
                  // ❌ WRONG ANSWER - Retry Screen  
                  <div className="bg-gradient-to-br from-orange-400/30 to-red-500/30 border-2 border-orange-300/60 rounded-2xl p-8 backdrop-blur-sm animate-scale-in shadow-2xl">
                    <div className="text-6xl mb-4 animate-pulse">💪</div>
                    <h3 className="text-3xl font-bold mb-4 text-orange-100">Keep Growing!</h3>
                    <div className="bg-white/10 rounded-xl p-4 mb-4 backdrop-blur-sm">
                      <p className="text-lg text-white/80 mb-2">We heard: <span className="font-bold text-red-200">"{cardResults[cardResults.length - 1]?.userSaid}"</span></p>
                      <p className="text-lg text-white/80 mb-2">Correct answer: <span className="font-bold text-green-200">"{cardResults[cardResults.length - 1]?.word.english}"</span></p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-400/20 to-pink-400/20 border border-purple-300/40 rounded-xl p-4 mb-6">
                      <p className="text-xl font-semibold text-purple-200">
                        {cardResults[cardResults.length - 1]?.motivationalText || "Almost there, keep going!"}
                      </p>
                    </div>
                    <div className="text-yellow-400 text-lg font-medium">
                      +{cardResults[cardResults.length - 1]?.xpEarned || 5} XP for trying! ⭐
                    </div>
                  </div>
                )}
                
                <Button
                  onClick={nextCard}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-4 text-xl font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  {currentCardIndex < flashcardWords.length - 1 ? (
                    <>
                      🚀 Next Card <ChevronRight className="h-6 w-6 ml-2" />
                    </>
                  ) : (
                    <>
                      <Trophy className="h-6 w-6 mr-2" />
                      📊 View Final Results
                    </>
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