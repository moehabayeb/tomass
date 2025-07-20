import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mic, MicOff, Play, RotateCcw, Volume2, Award, Star } from 'lucide-react';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { supabase } from '@/integrations/supabase/client';
import { useGamification } from '@/hooks/useGamification';
import { AvatarDisplay } from './AvatarDisplay';

interface SpeakingPlacementTestProps {
  onBack: () => void;
  onComplete: (level: string, score: number) => void;
}

const speakingQuestions = [
  {
    id: 1,
    level: 'A1',
    type: 'speaking',
    question: 'What is your name? Please answer in a full sentence.',
    expectedTime: 10
  },
  {
    id: 2,
    level: 'A1',
    type: 'speaking', 
    question: 'Where are you from? Tell me about your country.',
    expectedTime: 15
  },
  {
    id: 3,
    level: 'A2',
    type: 'speaking',
    question: 'Describe what you did yesterday. Use past tense.',
    expectedTime: 20
  },
  {
    id: 4,
    level: 'A2',
    type: 'speaking',
    question: 'What is your favorite food and why do you like it?',
    expectedTime: 20
  },
  {
    id: 5,
    level: 'B1',
    type: 'speaking',
    question: 'Tell me about a memorable trip or vacation you took.',
    expectedTime: 30
  },
  {
    id: 6,
    level: 'B1',
    type: 'speaking',
    question: 'What are your future plans? What do you want to achieve?',
    expectedTime: 30
  },
  {
    id: 7,
    level: 'B2',
    type: 'speaking',
    question: 'Describe a problem in your community and suggest a solution.',
    expectedTime: 45
  }
];

export const SpeakingPlacementTest: React.FC<SpeakingPlacementTestProps> = ({ onBack, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [finalLevel, setFinalLevel] = useState('');
  const [finalScore, setFinalScore] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [userResponse, setUserResponse] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState('');
  const [answers, setAnswers] = useState<Array<{question: string, answer: string, score: number, feedback: string}>>([]);
  const [questionScores, setQuestionScores] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const recordingTimer = useRef<NodeJS.Timeout | null>(null);
  const progressTimer = useRef<NodeJS.Timeout | null>(null);
  
  const { speak, isSpeaking } = useTextToSpeech();
  const { userProfile, getXPProgress } = useGamification();
  const xpProgress = getXPProgress();

  const currentQuestion = speakingQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / speakingQuestions.length) * 100;

  useEffect(() => {
    if (testStarted && currentQuestion && !isRecording && !isEvaluating) {
      // Read the question aloud when it appears
      const timer = setTimeout(() => {
        playQuestion();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex, testStarted]);

  const playQuestion = () => {
    setIsPlaying(true);
    speak(currentQuestion.question, () => {
      setIsPlaying(false);
    });
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
        await sendToTranscribe(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start recording timer
      recordingTimer.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= currentQuestion.expectedTime) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      if (recordingTimer.current) {
        clearInterval(recordingTimer.current);
      }
    }
  };

  const sendToTranscribe = async (audioBlob: Blob) => {
    try {
      setIsEvaluating(true);
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        const audioData = base64data.split(',')[1];

        const { data, error } = await supabase.functions.invoke('transcribe', {
          body: { audio: audioData }
        });

        if (error) throw error;

        const transcription = data.transcript || '';
        setUserResponse(transcription);

        if (transcription.trim().length < 3) {
          setCurrentFeedback('Please try again with a longer answer.');
          setIsEvaluating(false);
          return;
        }

        // Evaluate the answer with GPT
        await evaluateAnswer(transcription);
      };
    } catch (error) {
      console.error('Error transcribing audio:', error);
      setIsEvaluating(false);
    }
  };

  const evaluateAnswer = async (transcription: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('evaluate-speaking', {
        body: {
          question: currentQuestion.question,
          answer: transcription,
          level: currentQuestion.level
        }
      });

      if (error) throw error;

      const evaluation = data;
      setCurrentFeedback(evaluation.feedback);
      
      // Store the answer and score
      const newAnswer = {
        question: currentQuestion.question,
        answer: transcription,
        score: evaluation.score,
        feedback: evaluation.feedback
      };
      
      setAnswers(prev => [...prev, newAnswer]);
      setQuestionScores(prev => [...prev, evaluation.score]);

      // Move to next question after showing feedback
      setTimeout(() => {
        if (currentQuestionIndex < speakingQuestions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setUserResponse('');
          setCurrentFeedback('');
          setIsEvaluating(false);
        } else {
          calculateFinalResults();
        }
      }, 3000);

    } catch (error) {
      console.error('Error evaluating answer:', error);
      setCurrentFeedback('Error evaluating your response. Please try again.');
      setIsEvaluating(false);
    }
  };

  const calculateFinalResults = () => {
    const totalScore = questionScores.reduce((sum, score) => sum + score, 0);
    const averageScore = totalScore / questionScores.length;
    
    let level = 'A1';
    if (averageScore >= 4.5) level = 'C1';
    else if (averageScore >= 3.5) level = 'B2';
    else if (averageScore >= 2.5) level = 'B1';
    else if (averageScore >= 1.5) level = 'A2';
    
    setFinalScore(Math.round(averageScore * 20)); // Convert to percentage
    setFinalLevel(level);
    setShowResult(true);
    onComplete(level, Math.round(averageScore * 20));
  };

  const resetTest = () => {
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setTestStarted(false);
    setUserResponse('');
    setCurrentFeedback('');
    setAnswers([]);
    setQuestionScores([]);
    setIsEvaluating(false);
    setIsRecording(false);
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

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
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
          <Card className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/20 text-white">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="relative">
                  <Award className="h-16 w-16 mx-auto mb-4 text-yellow-400" />
                  <div className="absolute -top-2 -right-2">
                    <Star className="h-6 w-6 text-yellow-300 animate-pulse" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">🎉 Speaking Test Complete!</h2>
                <p className="text-white/80">Amazing work! Here are your results:</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className={`bg-gradient-to-r ${getLevelColor(finalLevel)} rounded-xl p-4`}>
                  <h3 className="text-xl font-bold text-white">Your Level: {finalLevel}</h3>
                  <p className="text-white/90 text-sm">Score: {finalScore}%</p>
                </div>
                
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-sm text-white/80 mb-2">Questions Completed</p>
                  <div className="text-2xl font-bold text-white">{speakingQuestions.length}/7</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button
                  onClick={() => onComplete(finalLevel, finalScore)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 rounded-xl"
                >
                  Start Learning Journey
                </Button>
                
                <Button
                  onClick={resetTest}
                  variant="outline"
                  className="w-full border-white/20 text-white/70 hover:text-white hover:bg-white/10"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retake Test
                </Button>
                
                <Button
                  onClick={onBack}
                  variant="ghost"
                  className="w-full text-white/50 hover:text-white/70 hover:bg-white/5"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Menu
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
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-4 text-white/70 hover:text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Welcome Screen */}
        {!testStarted && (
          <Card className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/20">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <Mic className="w-12 h-12 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">🎤 Speaking Test</h2>
                  <p className="text-white/80">
                    Let's test your English by speaking! Answer a few voice prompts and we'll find your level.
                  </p>
                </div>
                <Button 
                  onClick={() => setTestStarted(true)}
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Speaking Test
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Test Content */}
        {testStarted && !showResult && (
          <div className="space-y-6">
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-white/80">
                <span>Question {currentQuestionIndex + 1} of {speakingQuestions.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="bg-white/20" />
            </div>

            {/* Question Card */}
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Speaking Question</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={playQuestion}
                      disabled={isPlaying || isSpeaking}
                      variant="ghost"
                      size="sm"
                      className="text-white/80 hover:text-white hover:bg-white/10"
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                    <Badge variant="secondary" className="bg-primary/20 text-primary">
                      {currentQuestion.level}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-white/90 text-lg leading-relaxed">
                  {currentQuestion.question}
                </div>

                {/* Recording Controls */}
                <div className="flex flex-col items-center space-y-4">
                  {isRecording && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {Math.max(0, currentQuestion.expectedTime - recordingTime)}s
                      </div>
                      <div className="text-white/60 text-sm">Recording time remaining</div>
                      <Progress 
                        value={(recordingTime / currentQuestion.expectedTime) * 100} 
                        className="w-32 mt-2 bg-white/20"
                      />
                    </div>
                  )}

                  <Button
                    onClick={isRecording ? stopRecording : startRecording}
                    disabled={isEvaluating || isPlaying || isSpeaking}
                    size="lg"
                    className={`w-20 h-20 rounded-full ${
                      isRecording 
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                        : 'bg-primary hover:bg-primary/90'
                    }`}
                  >
                    {isRecording ? (
                      <MicOff className="w-8 h-8" />
                    ) : (
                      <Mic className="w-8 h-8" />
                    )}
                  </Button>

                  <div className="text-center text-white/80 text-sm">
                    {isRecording ? 'Recording... Click to stop' : 
                     isEvaluating ? 'Processing your response...' :
                     (isPlaying || isSpeaking) ? 'Listen to the question...' :
                     'Click to start recording'}
                  </div>
                </div>

                {/* User Response */}
                {userResponse && (
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Your Response:</h4>
                    <p className="text-white/80">{userResponse}</p>
                  </div>
                )}

                {/* Feedback */}
                {currentFeedback && !isEvaluating && (
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                    <p className="text-green-300">✨ {currentFeedback}</p>
                    {currentQuestionIndex < speakingQuestions.length - 1 && (
                      <p className="text-white/60 text-sm mt-2">Moving to next question...</p>
                    )}
                  </div>
                )}

                {/* Evaluation Status */}
                {isEvaluating && (
                  <div className="text-center text-white/60">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                    Evaluating your response...
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};