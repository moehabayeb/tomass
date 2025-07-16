import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Play, Pause, Mic, MicOff, Volume2, RefreshCw, Star, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useGamification } from '@/hooks/useGamification';
import { useBadgeSystem } from '@/hooks/useBadgeSystem';
import CanvasAvatar from './CanvasAvatar';
import { useAvatarState } from '@/hooks/useAvatarState';
import { supabase } from '@/integrations/supabase/client';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

interface LessonsAppProps {
  onBack: () => void;
}

// Module 1 Data: Verb To Be - Positive Sentences
const MODULE_1_DATA = {
  title: "Module 1: Verb To Be - Positive Sentences",
  description: "Learn to use 'am', 'is', and 'are' in positive sentences",
  intro: "Welcome! Today we are learning how to say simple sentences with 'am', 'is', and 'are'. For example: 'I am a student.' 'He is a doctor.' Let's practice!",
  tip: "Use 'am' with I, 'is' with he/she/it, and 'are' with we/you/they",
  
  listeningExamples: [
    "I am a student.",
    "She is a doctor.", 
    "They are friends.",
    "You are tired.",
    "We are happy."
  ],
  
  speakingQuestions: [
    { question: "Are you a student?", expected: "Yes, I am a student." },
    { question: "Is she your friend?", expected: "Yes, she is my friend." },
    { question: "Are they at home?", expected: "Yes, they are at home." },
    { question: "Are you happy today?", expected: "Yes, I am happy today." },
    { question: "Is he a teacher?", expected: "Yes, he is a teacher." },
    { question: "Are we ready to start?", expected: "Yes, we are ready to start." },
    { question: "Is it a beautiful day?", expected: "Yes, it is a beautiful day." },
    { question: "Are you learning English?", expected: "Yes, I am learning English." },
    { question: "Is this your book?", expected: "Yes, this is my book." },
    { question: "Are they your parents?", expected: "Yes, they are my parents." }
  ]
};

type LessonPhase = 'intro' | 'listening' | 'speaking' | 'completed';

export default function LessonsApp({ onBack }: LessonsAppProps) {
  const [width, height] = useWindowSize();
  const [currentPhase, setCurrentPhase] = useState<LessonPhase>('intro');
  const [listeningIndex, setListeningIndex] = useState(0);
  const [speakingIndex, setSpeakingIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | 'info'>('info');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResponseTime, setLastResponseTime] = useState(0);
  
  const { speak, isSpeaking, soundEnabled, toggleSound } = useTextToSpeech();
  const { earnXPForGrammarLesson, addXP } = useGamification();
  const { incrementGrammarLessons, incrementTotalExercises } = useBadgeSystem();
  
  const { avatarState, triggerState } = useAvatarState({
    isRecording,
    isSpeaking,
    isProcessing,
    lastMessageTime: lastResponseTime
  });

  // Calculate progress
  const totalQuestions = MODULE_1_DATA.speakingQuestions.length;
  const overallProgress = ((speakingIndex + (correctAnswers > 0 ? 1 : 0)) / totalQuestions) * 100;

  // Speech recognition setup
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        handleUserResponse(transcript);
      };
      
      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        setIsProcessing(false);
        setFeedback('Sorry, I couldn\'t hear you clearly. Please try again.');
        setFeedbackType('error');
      };
      
      recognitionInstance.onend = () => {
        setIsRecording(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, []);

  // Start lesson with intro
  useEffect(() => {
    if (currentPhase === 'intro') {
      const timer = setTimeout(() => {
        speak(MODULE_1_DATA.intro, () => {
          setCurrentPhase('listening');
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentPhase, speak]);

  const handleUserResponse = useCallback(async (transcript: string) => {
    setIsProcessing(true);
    setAttempts(prev => prev + 1);
    
    const currentQuestion = MODULE_1_DATA.speakingQuestions[speakingIndex];
    const expected = currentQuestion.expected.toLowerCase();
    
    // Simple matching logic - check for key components
    const isCorrectStructure = (response: string): boolean => {
      // Remove punctuation and extra spaces
      const clean = response.replace(/[.,!?]/g, '').trim();
      
      // Check if it contains the main components of expected answer
      if (expected.includes('yes, i am')) {
        return clean.includes('yes') && clean.includes('i am');
      }
      if (expected.includes('yes, she is')) {
        return clean.includes('yes') && clean.includes('she is');
      }
      if (expected.includes('yes, they are')) {
        return clean.includes('yes') && clean.includes('they are');
      }
      if (expected.includes('yes, we are')) {
        return clean.includes('yes') && clean.includes('we are');
      }
      if (expected.includes('yes, he is')) {
        return clean.includes('yes') && clean.includes('he is');
      }
      if (expected.includes('yes, it is')) {
        return clean.includes('yes') && clean.includes('it is');
      }
      if (expected.includes('yes, this is')) {
        return clean.includes('yes') && clean.includes('this is');
      }
      
      // Fallback: check similarity
      return clean.length > 3 && expected.includes(clean.substring(0, Math.min(clean.length, 10)));
    };

    const isCorrect = isCorrectStructure(transcript);
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setFeedback('Great job! 🎉 Let\'s move to the next question.');
      setFeedbackType('success');
      
      // Award XP for correct answer
      await earnXPForGrammarLesson(true);
      await incrementTotalExercises();
      
      setTimeout(() => {
        if (speakingIndex < totalQuestions - 1) {
          setSpeakingIndex(prev => prev + 1);
          setFeedback('');
        } else {
          completeLesson();
        }
        setIsProcessing(false);
      }, 2000);
    } else {
      // Provide helpful feedback
      const helpfulResponse = generateHelpfulFeedback(transcript, currentQuestion.expected);
      setFeedback(helpfulResponse);
      setFeedbackType('error');
      
      setTimeout(() => {
        setFeedback('');
        setIsProcessing(false);
      }, 3000);
    }
    
    setLastResponseTime(Date.now());
  }, [speakingIndex, earnXPForGrammarLesson, incrementTotalExercises]);

  const generateHelpfulFeedback = (userResponse: string, expected: string): string => {
    const response = userResponse.toLowerCase().trim();
    
    // Check what's missing
    if (response === 'yes' || response === 'no') {
      return `Almost! Try again with a full sentence like: "${expected}"`;
    }
    
    if (response.includes('she') && response.includes('friend') && !response.includes('is')) {
      return `Good! But remember to use 'is': "${expected}"`;
    }
    
    if (response.includes('they') && response.includes('home') && !response.includes('are')) {
      return `Close! Don't forget 'are': "${expected}"`;
    }
    
    return `Almost! Try again with a full sentence like: "${expected}"`;
  };

  const completeLesson = async () => {
    setCurrentPhase('completed');
    setShowConfetti(true);
    
    // Award bonus XP for completion
    await addXP(100, 'grammar');
    await incrementGrammarLessons();
    
    // Save progress
    const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
    if (!completedModules.includes('module-1')) {
      completedModules.push('module-1');
      localStorage.setItem('completedModules', JSON.stringify(completedModules));
    }
    
    speak('Congratulations! You have completed Module 1. Well done!');
    
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  const startRecording = () => {
    if (recognition && !isRecording) {
      setIsRecording(true);
      setFeedback('');
      recognition.start();
    }
  };

  const stopRecording = () => {
    if (recognition && isRecording) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const speakExample = (text: string) => {
    speak(text);
  };

  const nextListeningExample = () => {
    if (listeningIndex < MODULE_1_DATA.listeningExamples.length - 1) {
      setListeningIndex(prev => prev + 1);
    } else {
      setCurrentPhase('speaking');
      speak('Now let\'s practice speaking! I\'ll ask you questions and you give full answers.');
    }
  };

  const repeatExample = () => {
    const currentExample = MODULE_1_DATA.listeningExamples[listeningIndex];
    speak(currentExample);
  };

  const speakCurrentQuestion = () => {
    const currentQuestion = MODULE_1_DATA.speakingQuestions[speakingIndex];
    speak(currentQuestion.question);
  };

  if (currentPhase === 'completed') {
    return (
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'hsl(var(--app-bg))' }}>
        {showConfetti && <Confetti width={width} height={height} />}
        
        <div className="relative z-10 p-4 max-w-sm mx-auto">
          <div className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-6 mt-safe-area-inset-top text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-500/20 rounded-full p-4">
                <CheckCircle className="h-12 w-12 text-green-400" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">Congratulations!</h2>
            <p className="text-white/80 mb-4">You completed Module 1!</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-white/90">
                <span>Questions Completed:</span>
                <span className="font-semibold">{correctAnswers}/{totalQuestions}</span>
              </div>
              <div className="flex justify-between text-white/90">
                <span>Success Rate:</span>
                <span className="font-semibold">{Math.round((correctAnswers / attempts) * 100)}%</span>
              </div>
            </div>

            <Button 
              onClick={onBack}
              className="w-full bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              Back to Lessons
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'hsl(var(--app-bg))' }}>
      <div className="relative z-10 p-4 max-w-sm mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-6 mb-6 mt-safe-area-inset-top">
          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="text-center">
              <h1 className="text-lg font-bold text-white">{MODULE_1_DATA.title}</h1>
              <p className="text-sm text-white/70">{MODULE_1_DATA.description}</p>
            </div>
            
            <Button
              onClick={toggleSound}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 rounded-full"
            >
              <Volume2 className={`h-5 w-5 ${!soundEnabled ? 'opacity-50' : ''}`} />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-white/80">
              <span>Progress</span>
              <span>{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <CanvasAvatar state={avatarState} size="lg" />
        </div>

        {/* Tip Card */}
        <Card className="mb-6 bg-white/10 border-white/20">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-500/20 rounded-full p-2 flex-shrink-0">
                <Star className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm mb-1">Grammar Tip</h3>
                <p className="text-white/80 text-sm">{MODULE_1_DATA.tip}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Listening Phase */}
        {currentPhase === 'listening' && (
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Volume2 className="h-5 w-5 mr-2" />
                Listening Practice
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="bg-white/5 rounded-xl p-4 mb-4">
                  <p className="text-white text-lg font-medium">
                    "{MODULE_1_DATA.listeningExamples[listeningIndex]}"
                  </p>
                </div>
                
                <div className="flex justify-center space-x-3">
                  <Button
                    onClick={repeatExample}
                    variant="outline"
                    size="sm"
                    className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                    disabled={isSpeaking}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Repeat
                  </Button>
                  
                  <Button
                    onClick={nextListeningExample}
                    className="bg-white/20 text-white hover:bg-white/30"
                    disabled={isSpeaking}
                  >
                    {listeningIndex < MODULE_1_DATA.listeningExamples.length - 1 ? 'Next' : 'Start Speaking'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Speaking Phase */}
        {currentPhase === 'speaking' && (
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  <Mic className="h-5 w-5 mr-2" />
                  Speaking Practice
                </div>
                <Badge variant="outline" className="text-white border-white/30">
                  {speakingIndex + 1} / {totalQuestions}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="bg-white/5 rounded-xl p-4 mb-4">
                  <p className="text-white text-lg font-medium mb-2">
                    "{MODULE_1_DATA.speakingQuestions[speakingIndex].question}"
                  </p>
                  <Button
                    onClick={speakCurrentQuestion}
                    variant="ghost"
                    size="sm"
                    className="text-white/70 hover:text-white hover:bg-white/10"
                    disabled={isSpeaking}
                  >
                    <Volume2 className="h-4 w-4 mr-1" />
                    Listen
                  </Button>
                </div>

                {/* Recording Button */}
                <div className="mb-4">
                  <Button
                    onClick={isRecording ? stopRecording : startRecording}
                    size="lg"
                    className={`rounded-full w-20 h-20 ${
                      isRecording 
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                        : 'bg-white/20 hover:bg-white/30'
                    }`}
                    disabled={isProcessing || isSpeaking}
                  >
                    {isRecording ? (
                      <MicOff className="h-8 w-8" />
                    ) : (
                      <Mic className="h-8 w-8" />
                    )}
                  </Button>
                </div>

                <p className="text-white/70 text-sm mb-4">
                  {isRecording ? 'Listening...' : 'Tap to speak your answer'}
                </p>

                {/* Feedback */}
                {feedback && (
                  <div className={`p-3 rounded-lg ${
                    feedbackType === 'success' ? 'bg-green-500/20 text-green-400' :
                    feedbackType === 'error' ? 'bg-red-500/20 text-red-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    <div className="flex items-center justify-center space-x-2">
                      {feedbackType === 'success' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : feedbackType === 'error' ? (
                        <AlertCircle className="h-4 w-4" />
                      ) : null}
                      <span className="text-sm">{feedback}</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}