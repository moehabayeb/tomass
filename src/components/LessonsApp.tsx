import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Play, Pause, Mic, MicOff, Volume2, RefreshCw, Star, CheckCircle, AlertCircle, Lock, BookOpen, Trophy } from 'lucide-react';
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

type ViewState = 'levels' | 'modules' | 'lesson';
type LessonPhase = 'intro' | 'listening' | 'speaking' | 'completed';

// Levels data
const LEVELS = [
  { id: 'A1', name: 'A1 - Beginner', description: 'Start your English journey', moduleCount: 50, color: 'bg-blue-500' },
  { id: 'A2', name: 'A2 - Elementary', description: 'Build basic skills', moduleCount: 50, color: 'bg-green-500', locked: true },
  { id: 'B1', name: 'B1 - Intermediate', description: 'Expand your knowledge', moduleCount: 50, color: 'bg-orange-500', locked: true },
  { id: 'B2', name: 'B2 - Upper Intermediate', description: 'Advanced concepts', moduleCount: 50, color: 'bg-purple-500', locked: true },
];

// A1 modules data (for now just Module 1 implemented)
const A1_MODULES = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: i === 0 ? 'Verb To Be - Positive Sentences' : `Module ${i + 1}`,
  description: i === 0 ? 'Learn to use am, is, and are' : 'Coming soon',
  completed: false,
  locked: i > 0, // Only Module 1 is unlocked initially
}));

// Module 1 Data: Verb To Be - Positive Sentences
const MODULE_1_DATA = {
  title: "Module 1: Verb To Be - Positive Sentences",
  description: "Learn to use 'am', 'is', and 'are' in positive sentences",
  intro: "Welcome! Today we are learning how to say simple sentences with 'am', 'is', and 'are'. For example: 'I am a student.' 'He is a doctor.' Let's practice!",
  tip: "Use 'am' with I, 'is' with he/she/it, and 'are' with we/you/they",
  
  listeningExamples: [
    "I am a student.",
    "He is a teacher.",
    "She is a doctor.",
    "It is a dog.",
    "We are happy.",
    "You are friends.",
    "They are engineers."
  ],
  
  speakingPractice: [
    "I am a student.",
    "He is a teacher.",
    "She is a doctor.",
    "It is a dog.",
    "We are happy.",
    "You are friends.",
    "They are engineers."
  ]
};

export default function LessonsApp({ onBack }: LessonsAppProps) {
  const [width, height] = useWindowSize();
  const [viewState, setViewState] = useState<ViewState>('levels');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedModule, setSelectedModule] = useState<number>(0);
  
  // Lesson state
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

  // Get completed modules from localStorage
  const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');

  // Check if module is unlocked
  const isModuleUnlocked = (moduleId: number) => {
    if (moduleId === 1) return true; // Module 1 is always unlocked
    return completedModules.includes(`module-${moduleId - 1}`);
  };

  // Calculate progress
  const totalQuestions = MODULE_1_DATA.speakingPractice.length;
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
        handleSpeechResponse(transcript);
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
    if (currentPhase === 'intro' && viewState === 'lesson') {
      const timer = setTimeout(() => {
        speak(MODULE_1_DATA.intro, () => {
          setCurrentPhase('listening');
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentPhase, viewState, speak]);

  const handleSpeechResponse = useCallback(async (transcript: string) => {
    setIsProcessing(true);
    setAttempts(prev => prev + 1);
    
    try {
      // Send to feedback edge function for analysis
      const response = await supabase.functions.invoke('feedback', {
        body: { 
          userSentence: transcript,
          expectedSentence: MODULE_1_DATA.speakingPractice[speakingIndex]
        }
      });

      if (response.error) {
        throw response.error;
      }

      const { feedback: aiAssessment, isCorrect } = response.data;
      
      if (isCorrect) {
        setCorrectAnswers(prev => prev + 1);
        setFeedback('Great job! 🎉 Let\'s move to the next sentence.');
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
        setFeedback(aiAssessment || 'Try again with the full sentence.');
        setFeedbackType('error');
        
        setTimeout(() => {
          setFeedback('');
          setIsProcessing(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error getting feedback:', error);
      // Fallback to simple logic if API fails
      const isCorrect = transcript.toLowerCase().includes(MODULE_1_DATA.speakingPractice[speakingIndex].toLowerCase().substring(0, 10));
      
      if (isCorrect) {
        setCorrectAnswers(prev => prev + 1);
        setFeedback('Great job! 🎉');
        setFeedbackType('success');
      } else {
        setFeedback(`Try saying: "${MODULE_1_DATA.speakingPractice[speakingIndex]}"`);
        setFeedbackType('error');
      }
      
      setTimeout(() => {
        setFeedback('');
        setIsProcessing(false);
      }, 3000);
    }
    
    setLastResponseTime(Date.now());
  }, [speakingIndex, earnXPForGrammarLesson, incrementTotalExercises]);

  const completeLesson = async () => {
    setCurrentPhase('completed');
    setShowConfetti(true);
    
    // Award bonus XP for completion
    await addXP(100, 'grammar');
    await incrementGrammarLessons();
    
    // Save progress
    const newCompletedModules = [...completedModules];
    if (!newCompletedModules.includes('module-1')) {
      newCompletedModules.push('module-1');
      localStorage.setItem('completedModules', JSON.stringify(newCompletedModules));
    }
    
    speak('Congratulations! You have completed Module 1. Well done!');
    
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  const startRecording = async () => {
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

  const nextListeningExample = () => {
    if (listeningIndex < MODULE_1_DATA.listeningExamples.length - 1) {
      setListeningIndex(prev => prev + 1);
    } else {
      setCurrentPhase('speaking');
      speak('Now let\'s practice speaking! Say each sentence clearly.');
    }
  };

  const repeatExample = () => {
    const currentExample = MODULE_1_DATA.listeningExamples[listeningIndex];
    speak(currentExample);
  };

  const speakCurrentSentence = () => {
    const currentSentence = MODULE_1_DATA.speakingPractice[speakingIndex];
    speak(currentSentence);
  };

  // Render levels view
  if (viewState === 'levels') {
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
              
              <h1 className="text-lg font-bold text-white">Choose Your Level</h1>
              <div className="w-10"></div>
            </div>
          </div>

          {/* Levels Grid */}
          <div className="space-y-4">
            {LEVELS.map((level) => (
              <Card 
                key={level.id} 
                className={`bg-white/10 border-white/20 cursor-pointer transition-all hover:bg-white/15 ${level.locked ? 'opacity-50' : ''}`}
                onClick={() => {
                  if (!level.locked) {
                    setSelectedLevel(level.id);
                    setViewState('modules');
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full ${level.color} flex items-center justify-center flex-shrink-0`}>
                      {level.locked ? (
                        <Lock className="h-6 w-6 text-white" />
                      ) : (
                        <BookOpen className="h-6 w-6 text-white" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{level.name}</h3>
                      <p className="text-white/70 text-sm">{level.description}</p>
                      <p className="text-white/60 text-xs">{level.moduleCount} modules</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render modules view
  if (viewState === 'modules') {
    return (
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'hsl(var(--app-bg))' }}>
        <div className="relative z-10 p-4 max-w-sm mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-6 mb-6 mt-safe-area-inset-top">
            <div className="flex items-center justify-between mb-4">
              <Button
                onClick={() => setViewState('levels')}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <div className="text-center">
                <h1 className="text-lg font-bold text-white">{selectedLevel} Modules</h1>
                <p className="text-sm text-white/70">Choose a module to start</p>
              </div>
              <div className="w-10"></div>
            </div>
          </div>

          {/* Modules Grid */}
          <div className="space-y-3">
            {A1_MODULES.map((module) => {
              const isUnlocked = isModuleUnlocked(module.id);
              const isCompleted = completedModules.includes(`module-${module.id}`);
              
              return (
                <Card 
                  key={module.id} 
                  className={`bg-white/10 border-white/20 cursor-pointer transition-all hover:bg-white/15 ${!isUnlocked ? 'opacity-50' : ''}`}
                  onClick={() => {
                    if (isUnlocked && module.id === 1) { // Only Module 1 is implemented
                      setSelectedModule(module.id);
                      setViewState('lesson');
                      setCurrentPhase('intro');
                      setListeningIndex(0);
                      setSpeakingIndex(0);
                      setCorrectAnswers(0);
                      setAttempts(0);
                      setFeedback('');
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        {!isUnlocked ? (
                          <Lock className="h-6 w-6 text-white/50" />
                        ) : isCompleted ? (
                          <CheckCircle className="h-6 w-6 text-green-400" />
                        ) : (
                          <span className="text-white font-bold">{module.id}</span>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{module.title}</h3>
                        <p className="text-white/70 text-sm">{module.description}</p>
                        {isCompleted && (
                          <Badge variant="outline" className="text-green-400 border-green-400 mt-1">
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Lesson completion view
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
                <span>Sentences Completed:</span>
                <span className="font-semibold">{correctAnswers}/{totalQuestions}</span>
              </div>
              <div className="flex justify-between text-white/90">
                <span>Success Rate:</span>
                <span className="font-semibold">{Math.round((correctAnswers / attempts) * 100)}%</span>
              </div>
            </div>

            <Button 
              onClick={() => setViewState('modules')}
              className="w-full bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              Back to Modules
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Render lesson content
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'hsl(var(--app-bg))' }}>
      <div className="relative z-10 p-4 max-w-sm mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-6 mb-6 mt-safe-area-inset-top">
          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={() => setViewState('modules')}
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
                    "{MODULE_1_DATA.speakingPractice[speakingIndex]}"
                  </p>
                  <Button
                    onClick={speakCurrentSentence}
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
                  {isRecording ? 'Listening...' : 'Tap to speak the sentence'}
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