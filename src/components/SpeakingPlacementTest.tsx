import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mic, MicOff, Play, RotateCcw, Volume2, Award, Star, CheckCircle, Zap, Target, MessageSquare, Volume } from 'lucide-react';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { supabase } from '@/integrations/supabase/client';
import { useGamification } from '@/hooks/useGamification';
import { AvatarDisplay } from './AvatarDisplay';
import { useUserData } from '@/hooks/useUserData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface SpeakingPlacementTestProps {
  onBack: () => void;
  onComplete: (level: string, score: number) => void;
}

interface SpeakingScore {
  grammarScore: number;
  fluencyScore: number;
  vocabularyScore: number;
  pronunciationScore: number;
  totalScore: number;
  feedback: string;
}

const speakingPrompts = [
  {
    id: 1,
    level: 'A1',
    question: 'Tell me your name and where you are from. Speak clearly for about 15 seconds.',
    expectedTime: 15
  },
  {
    id: 2,
    level: 'A2',
    question: 'Describe what you did yesterday. Use past tense verbs. Speak for about 30 seconds.',
    expectedTime: 30
  },
  {
    id: 3,
    level: 'B1',
    question: 'What are your hobbies and why do you enjoy them? Explain your thoughts for about 45 seconds.',
    expectedTime: 45
  },
  {
    id: 4,
    level: 'B2',
    question: 'Describe a challenge you faced and how you overcame it. Share your experience for about 60 seconds.',
    expectedTime: 60
  }
];

export const SpeakingPlacementTest: React.FC<SpeakingPlacementTestProps> = ({ onBack, onComplete }) => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showScoreAnimation, setShowScoreAnimation] = useState(false);
  const [finalScores, setFinalScores] = useState<SpeakingScore[]>([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const recordingTimer = useRef<NodeJS.Timeout | null>(null);
  
  const { speak, isSpeaking } = useTextToSpeech();
  const { userProfile, getXPProgress } = useGamification();
  const { updateProfile } = useUserData();
  const xpProgress = getXPProgress();

  const currentPrompt = speakingPrompts[currentPromptIndex];
  const progress = ((currentPromptIndex + 1) / speakingPrompts.length) * 100;

  useEffect(() => {
    if (testStarted && currentPrompt && !isRecording && !isEvaluating) {
      const timer = setTimeout(() => {
        playPrompt();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentPromptIndex, testStarted]);

  const playPrompt = () => {
    setIsPlaying(true);
    speak(currentPrompt.question, () => {
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
        await processAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      recordingTimer.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= currentPrompt.expectedTime) {
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

  const processAudio = async (audioBlob: Blob) => {
    try {
      setIsEvaluating(true);
      
      // Transcribe audio
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        const audioData = base64data.split(',')[1];

        const { data: transcriptionData, error: transcriptionError } = await supabase.functions.invoke('transcribe', {
          body: { audio: audioData }
        });

        if (transcriptionError) throw transcriptionError;

        const transcription = transcriptionData.transcript || '';
        setCurrentResponse(transcription);

        if (transcription.trim().length < 5) {
          setIsEvaluating(false);
          return;
        }

        // Evaluate with new scoring system
        const { data: evaluationData, error: evaluationError } = await supabase.functions.invoke('evaluate-speaking', {
          body: {
            question: currentPrompt.question,
            answer: transcription,
            level: currentPrompt.level
          }
        });

        if (evaluationError) throw evaluationError;

        const scores: SpeakingScore = evaluationData;
        setFinalScores(prev => [...prev, scores]);
        
        // Show scores with animation
        setShowScoreAnimation(true);
        
        setTimeout(() => {
          setShowScoreAnimation(false);
          if (currentPromptIndex < speakingPrompts.length - 1) {
            setCurrentPromptIndex(prev => prev + 1);
            setCurrentResponse('');
          } else {
            calculateFinalResults();
          }
          setIsEvaluating(false);
        }, 4000);
      };
    } catch (error) {
      console.error('Error processing audio:', error);
      setIsEvaluating(false);
    }
  };

  const calculateFinalResults = async () => {
    if (finalScores.length === 0) return;
    
    const avgGrammar = finalScores.reduce((sum, score) => sum + score.grammarScore, 0) / finalScores.length;
    const avgFluency = finalScores.reduce((sum, score) => sum + score.fluencyScore, 0) / finalScores.length;
    const avgVocabulary = finalScores.reduce((sum, score) => sum + score.vocabularyScore, 0) / finalScores.length;
    const avgPronunciation = finalScores.reduce((sum, score) => sum + score.pronunciationScore, 0) / finalScores.length;
    const totalAverage = (avgGrammar + avgFluency + avgVocabulary + avgPronunciation) / 4;
    
    // Determine level based on average score
    let level = 'A1';
    if (totalAverage >= 8.5) level = 'C1';
    else if (totalAverage >= 7.0) level = 'B2';
    else if (totalAverage >= 5.5) level = 'B1';
    else if (totalAverage >= 4.0) level = 'A2';
    
    // Update user profile
    if (userProfile) {
      let userLevel: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
      if (level === 'C1' || level === 'B2') userLevel = 'advanced';
      else if (level === 'B1') userLevel = 'intermediate';
      
      await updateProfile({ userLevel });
    }
    
    setShowResults(true);
    onComplete(level, Math.round((totalAverage / 10) * 100));
  };

  const resetTest = () => {
    setCurrentPromptIndex(0);
    setShowResults(false);
    setTestStarted(false);
    setFinalScores([]);
    setCurrentResponse('');
    setShowScoreAnimation(false);
    setIsEvaluating(false);
    setIsRecording(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-blue-400';
    if (score >= 4) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getProgressColor = (score: number) => {
    if (score >= 8) return 'from-green-500 to-green-600';
    if (score >= 6) return 'from-blue-500 to-blue-600';
    if (score >= 4) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const calculateOverallLevel = () => {
    if (finalScores.length === 0) return 'A1';
    const totalAverage = finalScores.reduce((sum, score) => 
      sum + (score.grammarScore + score.fluencyScore + score.vocabularyScore + score.pronunciationScore) / 4
    , 0) / finalScores.length;
    
    if (totalAverage >= 8.5) return 'C1';
    if (totalAverage >= 7.0) return 'B2';
    if (totalAverage >= 5.5) return 'B1';
    if (totalAverage >= 4.0) return 'A2';
    return 'A1';
  };

  const calculateAverageScores = () => {
    if (finalScores.length === 0) return { grammar: 0, fluency: 0, vocabulary: 0, pronunciation: 0 };
    
    return {
      grammar: finalScores.reduce((sum, score) => sum + score.grammarScore, 0) / finalScores.length,
      fluency: finalScores.reduce((sum, score) => sum + score.fluencyScore, 0) / finalScores.length,
      vocabulary: finalScores.reduce((sum, score) => sum + score.vocabularyScore, 0) / finalScores.length,
      pronunciation: finalScores.reduce((sum, score) => sum + score.pronunciationScore, 0) / finalScores.length,
    };
  };

  // Score Animation Component
  const ScoreDisplay = ({ scores }: { scores: SpeakingScore }) => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-gradient-to-b from-purple-900/90 to-indigo-900/90 backdrop-blur-xl border border-purple-500/30 max-w-md w-full">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center">
              <CheckCircle className="h-16 w-16 text-green-400 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-white">✅ Scores Collected!</h3>
            <p className="text-white/80">Here's how you did:</p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/90 flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-400" />
                  Grammar
                </span>
                <span className={`text-xl font-bold ${getScoreColor(scores.grammarScore)}`}>
                  {scores.grammarScore}/10
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-white/90 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  Speaking Fluency
                </span>
                <span className={`text-xl font-bold ${getScoreColor(scores.fluencyScore)}`}>
                  {scores.fluencyScore}/10
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-white/90 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-green-400" />
                  Vocabulary
                </span>
                <span className={`text-xl font-bold ${getScoreColor(scores.vocabularyScore)}`}>
                  {scores.vocabularyScore}/10
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-white/90 flex items-center gap-2">
                  <Volume className="h-5 w-5 text-purple-400" />
                  Pronunciation
                </span>
                <span className={`text-xl font-bold ${getScoreColor(scores.pronunciationScore)}`}>
                  {scores.pronunciationScore}/10
                </span>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-green-300 text-sm">✨ {scores.feedback}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (showResults) {
    const averageScores = calculateAverageScores();
    const overallLevel = calculateOverallLevel();
    const totalScore = Math.round((averageScores.grammar + averageScores.fluency + averageScores.vocabulary + averageScores.pronunciation) / 4 * 10);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="absolute inset-0 w-full h-full background-stars pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(2px 2px at 20px 30px, #fff, transparent), radial-gradient(2px 2px at 40px 70px, #fff, transparent), radial-gradient(1px 1px at 90px 40px, #fff, transparent)', backgroundSize: '100px 100px' }} 
        />
        
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

        <div className="relative max-w-2xl mx-auto pt-20">
          <Card className="bg-gradient-to-b from-purple-900/80 to-indigo-900/80 backdrop-blur-xl border border-purple-500/30 text-white">
            <CardContent className="p-8">
              <div className="text-center space-y-8">
                <div className="relative">
                  <Award className="h-20 w-20 mx-auto mb-4 text-yellow-400" />
                  <div className="absolute -top-2 -right-2">
                    <Star className="h-8 w-8 text-yellow-300 animate-pulse" />
                  </div>
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold mb-2">🎉 Speaking Test Complete!</h2>
                  <p className="text-white/80">Here's your detailed breakdown:</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4">
                    <h3 className="text-lg font-bold">Your Level</h3>
                    <div className="text-2xl font-bold">{overallLevel}</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-4">
                    <h3 className="text-lg font-bold">Total Score</h3>
                    <div className="text-2xl font-bold">{totalScore}%</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Score Breakdown</h3>
                  
                  {/* Grammar Score */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-blue-400" />
                        Grammar
                      </span>
                      <span className={`font-bold ${getScoreColor(averageScores.grammar)}`}>
                        {averageScores.grammar.toFixed(1)}/10
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full bg-gradient-to-r ${getProgressColor(averageScores.grammar)} transition-all duration-1000`}
                        style={{ width: `${(averageScores.grammar / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Fluency Score */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-yellow-400" />
                        Speaking Fluency
                      </span>
                      <span className={`font-bold ${getScoreColor(averageScores.fluency)}`}>
                        {averageScores.fluency.toFixed(1)}/10
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full bg-gradient-to-r ${getProgressColor(averageScores.fluency)} transition-all duration-1000`}
                        style={{ width: `${(averageScores.fluency / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Vocabulary Score */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-green-400" />
                        Vocabulary
                      </span>
                      <span className={`font-bold ${getScoreColor(averageScores.vocabulary)}`}>
                        {averageScores.vocabulary.toFixed(1)}/10
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full bg-gradient-to-r ${getProgressColor(averageScores.vocabulary)} transition-all duration-1000`}
                        style={{ width: `${(averageScores.vocabulary / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Pronunciation Score */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <Volume className="h-5 w-5 text-purple-400" />
                        Pronunciation
                      </span>
                      <span className={`font-bold ${getScoreColor(averageScores.pronunciation)}`}>
                        {averageScores.pronunciation.toFixed(1)}/10
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full bg-gradient-to-r ${getProgressColor(averageScores.pronunciation)} transition-all duration-1000`}
                        style={{ width: `${(averageScores.pronunciation / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 pt-6">
                  <Button
                    onClick={() => onComplete(overallLevel, totalScore)}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 rounded-xl"
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
          <Card className="bg-gradient-to-b from-purple-900/80 to-indigo-900/80 backdrop-blur-xl border border-purple-500/30">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <Mic className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">🎤 Speaking Assessment</h2>
                  <p className="text-white/80">
                    Test your English speaking skills with our AI-powered assessment. We'll evaluate your grammar, fluency, vocabulary, and pronunciation.
                  </p>
                </div>
                <Button 
                  onClick={() => setTestStarted(true)}
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-8 py-3"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Speaking Test
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Test Content */}
        {testStarted && !showResults && (
          <div className="space-y-6">
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-white/80">
                <span>Question {currentPromptIndex + 1} of {speakingPrompts.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="bg-white/20" />
            </div>

            {/* Question Card */}
            <Card className="bg-gradient-to-b from-purple-900/80 to-indigo-900/80 backdrop-blur-xl border border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Speaking Prompt</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={playPrompt}
                      disabled={isPlaying || isSpeaking}
                      variant="ghost"
                      size="sm"
                      className="text-white/80 hover:text-white hover:bg-white/10"
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      {currentPrompt.level}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-white/90 text-lg leading-relaxed bg-white/5 rounded-lg p-4">
                  {currentPrompt.question}
                </div>

                {/* Recording Controls */}
                <div className="flex flex-col items-center space-y-4">
                  {isRecording && (
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">
                        {Math.max(0, currentPrompt.expectedTime - recordingTime)}s
                      </div>
                      <div className="text-white/60 text-sm">Time remaining</div>
                      <Progress 
                        value={(recordingTime / currentPrompt.expectedTime) * 100} 
                        className="w-40 mt-2 bg-white/20"
                      />
                    </div>
                  )}

                  <Button
                    onClick={isRecording ? stopRecording : startRecording}
                    disabled={isEvaluating || isPlaying || isSpeaking}
                    size="lg"
                    className={`w-24 h-24 rounded-full transition-all duration-300 ${
                      isRecording 
                        ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 animate-pulse shadow-lg shadow-red-500/30' 
                        : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-lg shadow-purple-500/30'
                    }`}
                  >
                    {isRecording ? (
                      <MicOff className="w-10 h-10" />
                    ) : (
                      <Mic className="w-10 h-10" />
                    )}
                  </Button>

                  <div className="text-center text-white/80 text-sm max-w-xs">
                    {isRecording ? 'Recording... Click to stop when finished' : 
                     isEvaluating ? 'Processing your response...' :
                     (isPlaying || isSpeaking) ? 'Listen to the prompt...' :
                     'Click the microphone to start recording'}
                  </div>
                </div>

                {/* Response Display */}
                {currentResponse && !showScoreAnimation && (
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Your Response:</h4>
                    <p className="text-white/80 text-sm">{currentResponse}</p>
                  </div>
                )}

                {/* Evaluation Status */}
                {isEvaluating && !showScoreAnimation && (
                  <div className="text-center text-white/60">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto mb-2"></div>
                    Analyzing your speaking...
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Score Animation Overlay */}
        {showScoreAnimation && finalScores.length > 0 && (
          <ScoreDisplay scores={finalScores[finalScores.length - 1]} />
        )}
      </div>
    </div>
  );
};