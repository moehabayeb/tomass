import { useState, useEffect } from 'react';
import { Mic, Play, Pause, RotateCcw, ArrowLeft, Star, Award, MicIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { XPProgressBar } from './XPProgressBar';
import { AvatarDisplay } from './AvatarDisplay';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useGamification } from '@/hooks/useGamification';
import { supabase } from '@/integrations/supabase/client';

interface Question {
  id: number;
  level: string;
  type: 'multiple-choice' | 'speaking';
  question: string;
  options?: string[];
  correctAnswer?: number;
  speakingPrompt?: string;
  expectedDuration?: number; // seconds
}

interface SpeakingPlacementTestProps {
  onBack: () => void;
  onComplete: (level: string, recommendedModule: number) => void;
}

const questions: Question[] = [
  // Quick warm-up MCQs
  {
    id: 1,
    level: 'A1',
    type: 'multiple-choice',
    question: 'What is your name?',
    options: ['My name is...', 'I am name...', 'Name me is...', 'Is my name...'],
    correctAnswer: 0
  },
  {
    id: 2,
    level: 'A2',
    type: 'multiple-choice',
    question: 'How do you ask for directions?',
    options: ['Where is the bathroom?', 'Bathroom where is?', 'Is where bathroom?', 'The bathroom where?'],
    correctAnswer: 0
  },
  
  // Speaking prompts
  {
    id: 3,
    level: 'A1',
    type: 'speaking',
    question: 'Let\'s start with something simple!',
    speakingPrompt: 'Please introduce yourself. Tell me your name and where you\'re from.',
    expectedDuration: 15
  },
  {
    id: 4,
    level: 'A2',
    type: 'speaking',
    question: 'Tell me about your daily routine',
    speakingPrompt: 'Describe what you do in a typical day. What time do you wake up? What do you do for work or study?',
    expectedDuration: 30
  },
  {
    id: 5,
    level: 'B1',
    type: 'speaking',
    question: 'Share a recent experience',
    speakingPrompt: 'Tell me about something interesting that happened to you last week. Give me details about what happened and how you felt.',
    expectedDuration: 45
  },
  {
    id: 6,
    level: 'B2',
    type: 'speaking',
    question: 'Express your opinion',
    speakingPrompt: 'What do you think about social media? Discuss both the positive and negative aspects of social media in our daily lives.',
    expectedDuration: 60
  },
  {
    id: 7,
    level: 'C1',
    type: 'speaking',
    question: 'Complex scenario',
    speakingPrompt: 'Imagine you\'re planning a business event for 100 people. Explain the challenges you might face and how you would solve them.',
    expectedDuration: 90
  }
];

export default function SpeakingPlacementTest({ onBack, onComplete }: SpeakingPlacementTestProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | string)[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userResponse, setUserResponse] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [finalLevel, setFinalLevel] = useState('');
  const [recommendedModule, setRecommendedModule] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  
  const { speak } = useTextToSpeech();
  const { userProfile, getXPProgress } = useGamification();
  const xpProgress = getXPProgress();

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    setProgress((currentQuestionIndex / questions.length) * 100);
  }, [currentQuestionIndex]);

  // Recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const playPrompt = (text: string) => {
    setIsPlaying(true);
    speak(text, () => setIsPlaying(false));
  };

  const startRecording = async () => {
    setIsRecording(true);
    setRecordingDuration(0);
    setUserResponse('');
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        await sendToTranscribe(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();

      // Auto-stop based on expected duration
      const expectedDuration = currentQuestion.expectedDuration || 30;
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
          setIsRecording(false);
        }
      }, expectedDuration * 1000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const sendToTranscribe = async (audioBlob: Blob) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result?.toString().split(',')[1];
        if (base64Audio) {
          const { data, error } = await supabase.functions.invoke('transcribe', {
            body: { audio: base64Audio }
          });

          if (error) {
            console.error('Transcription error:', error);
            setUserResponse('Unable to transcribe audio. Please try again.');
          } else {
            setUserResponse(data.text || 'No transcription available');
          }
        }
      };
    } catch (error) {
      console.error('Error processing audio:', error);
      setUserResponse('Error processing audio. Please try again.');
    }
  };

  const handleMultipleChoice = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    
    if (currentQuestion.type === 'multiple-choice') {
      newAnswers[currentQuestionIndex] = selectedOption ?? -1;
    } else {
      newAnswers[currentQuestionIndex] = userResponse;
    }
    
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setUserResponse('');
      setRecordingDuration(0);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (allAnswers: (number | string)[]) => {
    let score = 0;
    
    // Score MCQs
    for (let i = 0; i < 2; i++) {
      if (allAnswers[i] === questions[i].correctAnswer) {
        score += 20;
      }
    }
    
    // Score speaking responses (simplified - in real app, use AI evaluation)
    for (let i = 2; i < allAnswers.length; i++) {
      const response = allAnswers[i] as string;
      if (response && response.length > 10) {
        const words = response.split(' ').length;
        if (words >= 10) score += 15;
        if (words >= 20) score += 10;
        if (words >= 30) score += 5;
      }
    }

    // Determine level and module
    let level = '';
    let module = 1;
    
    if (score >= 90) {
      level = 'C1';
      module = 7;
    } else if (score >= 75) {
      level = 'B2';
      module = 6;
    } else if (score >= 60) {
      level = 'B1';
      module = 4;
    } else if (score >= 40) {
      level = 'A2';
      module = 2;
    } else {
      level = 'A1';
      module = 1;
    }

    setFinalLevel(level);
    setRecommendedModule(module);
    setShowResult(true);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'A1': return 'from-green-400 to-green-600';
      case 'A2': return 'from-blue-400 to-blue-600';
      case 'B1': return 'from-purple-400 to-purple-600';
      case 'B2': return 'from-pink-400 to-pink-600';
      case 'C1': return 'from-orange-400 to-orange-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        {/* Background Stars */}
        <div className="absolute inset-0 w-full h-full background-stars pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(2px 2px at 20px 30px, #fff, transparent), radial-gradient(2px 2px at 40px 70px, #fff, transparent), radial-gradient(1px 1px at 90px 40px, #fff, transparent)', backgroundSize: '100px 100px' }} 
        />
        
        <div className="relative max-w-md mx-auto pt-20">
          <Card className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/20 text-white">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <Award className="h-16 w-16 mx-auto mb-4 text-yellow-400" />
                <h2 className="text-2xl font-bold mb-2">Speaking Test Complete!</h2>
                <p className="text-white/80">Great job! Here are your results:</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className={`bg-gradient-to-r ${getLevelColor(finalLevel)} rounded-xl p-4`}>
                  <h3 className="text-xl font-bold">Your Level: {finalLevel}</h3>
                </div>
                
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-sm text-white/80 mb-2">Recommended Starting Point</p>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    Module {recommendedModule}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button
                  onClick={() => onComplete(finalLevel, recommendedModule)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 rounded-xl"
                >
                  Start Learning Journey
                </Button>
                
                <Button
                  onClick={onBack}
                  variant="ghost"
                  className="w-full text-white/70 hover:text-white hover:bg-white/10"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Speaking
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
      {/* Background Stars */}
      <div className="absolute inset-0 w-full h-full background-stars pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(2px 2px at 20px 30px, #fff, transparent), radial-gradient(2px 2px at 40px 70px, #fff, transparent), radial-gradient(1px 1px at 90px 40px, #fff, transparent)', backgroundSize: '100px 100px' }} 
      />
      
      {/* Avatar Display */}
      {userProfile && (
        <div className="fixed top-4 left-4 z-20">
          <AvatarDisplay
            level={userProfile.level}
            xp={Math.max(0, xpProgress.current)}
            maxXP={xpProgress.max}
            userName={userProfile.name}
            showXPBar={true}
            size="sm"
          />
        </div>
      )}

      <div className="relative max-w-md mx-auto pt-20">
        {/* Header */}
        <div className="text-center mb-6">
          <MicIcon className="h-12 w-12 mx-auto mb-4 text-blue-400" />
          <h1 className="text-2xl font-bold text-white mb-2">Speaking Test</h1>
          <p className="text-white/80 text-sm">Let's test your English by speaking! Answer a few voice prompts and we'll find your level.</p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2 text-white/80 text-sm">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-white/20" />
        </div>

        {/* Question Card */}
        <Card className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/20 mb-6">
          <CardContent className="p-6">
            <div className="mb-4">
              <Badge variant="secondary" className="mb-3">
                {currentQuestion.level} Level
              </Badge>
              <h2 className="text-xl font-semibold text-white mb-4">
                {currentQuestion.question}
              </h2>
            </div>

            {currentQuestion.type === 'multiple-choice' ? (
              <div className="space-y-3">
                {currentQuestion.options?.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleMultipleChoice(index)}
                    variant={selectedOption === index ? "default" : "outline"}
                    className={`w-full text-left justify-start ${
                      selectedOption === index 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                    }`}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-white/90 text-sm mb-3">
                    {currentQuestion.speakingPrompt}
                  </p>
                  <Button
                    onClick={() => playPrompt(currentQuestion.speakingPrompt || '')}
                    variant="ghost"
                    size="sm"
                    disabled={isPlaying}
                    className="text-blue-300 hover:text-blue-200 hover:bg-blue-500/20"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {isPlaying ? 'Playing...' : 'Listen to prompt'}
                  </Button>
                </div>

                {/* Recording Controls */}
                <div className="text-center space-y-4">
                  {!isRecording ? (
                    <Button
                      onClick={startRecording}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-full w-20 h-20"
                    >
                      <Mic className="h-8 w-8" />
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <Button
                        onClick={stopRecording}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-full w-20 h-20 animate-pulse"
                      >
                        <Pause className="h-8 w-8" />
                      </Button>
                      <p className="text-white/80 text-sm">
                        Recording: {formatTime(recordingDuration)}
                      </p>
                    </div>
                  )}
                  
                  {userResponse && (
                    <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 mt-4">
                      <p className="text-green-300 text-sm font-medium mb-1">Your response:</p>
                      <p className="text-white text-sm">{userResponse}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex space-x-3">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={
              (currentQuestion.type === 'multiple-choice' && selectedOption === null) ||
              (currentQuestion.type === 'speaking' && !userResponse && !isRecording)
            }
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Complete Test' : 'Next Question'}
          </Button>
        </div>
      </div>
    </div>
  );
}