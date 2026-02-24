import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Mic, Volume2, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { supabase } from '@/integrations/supabase/client';
import { hasAIConsent, needsAIConsentDialog } from '@/lib/aiConsent';
import { AIConsentModal } from '@/components/AIConsentModal';

interface Question {
  id: number;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  type: 'multiple-choice' | 'listening' | 'reading' | 'speaking';
  question: string;
  options?: string[];
  correctAnswer: number | string;
  audio?: string;
  text?: string;
  speakingPrompt?: string;
}

interface PlacementTestProps {
  onBack: () => void;
  onComplete: (level: string, recommendedModule: number) => void;
}

const questions: Question[] = [
  {
    id: 1,
    level: 'A1',
    type: 'multiple-choice',
    question: 'Choose the correct sentence:',
    options: ['He am a teacher.', 'He is a teacher.', 'He are a teacher.'],
    correctAnswer: 1
  },
  {
    id: 2,
    level: 'A1',
    type: 'multiple-choice',
    question: 'I ______ breakfast every morning.',
    options: ['have', 'has', 'haves'],
    correctAnswer: 0
  },
  {
    id: 3,
    level: 'A2',
    type: 'multiple-choice',
    question: 'Choose the correct sentence:',
    options: ['She can to swim.', 'She can swim.', 'She cans swim.'],
    correctAnswer: 1
  },
  {
    id: 4,
    level: 'A2',
    type: 'multiple-choice',
    question: 'They ______ to the market yesterday.',
    options: ['goes', 'gone', 'went'],
    correctAnswer: 2
  },
  {
    id: 5,
    level: 'B1',
    type: 'multiple-choice',
    question: 'Choose the sentence with correct tense:',
    options: ['I have saw that movie.', 'I have seen that movie.', 'I seen that movie.'],
    correctAnswer: 1
  },
  {
    id: 6,
    level: 'B2',
    type: 'multiple-choice',
    question: 'Choose the correct sentence:',
    options: [
      'Despite of the rain, we played outside.',
      'In spite the rain, we played outside.',
      'In spite of the rain, we played outside.'
    ],
    correctAnswer: 2
  },
  {
    id: 7,
    level: 'A1',
    type: 'listening',
    question: 'Where is the dog?',
    audio: 'Where is the dog?',
    options: ['Under the table.', 'In the car.', 'On the chair.'],
    correctAnswer: 0
  },
  {
    id: 8,
    level: 'A2',
    type: 'listening',
    question: 'He works in a hospital. What is his job?',
    audio: 'He works in a hospital. What is his job?',
    options: ['Chef', 'Doctor', 'Driver'],
    correctAnswer: 1
  },
  {
    id: 9,
    level: 'B1',
    type: 'reading',
    question: 'What does John do after breakfast?',
    text: 'John usually wakes up at 7 a.m. He eats breakfast and takes the bus to work.',
    options: ['Goes back to sleep', 'Takes the bus to work', 'Eats lunch'],
    correctAnswer: 1
  },
  {
    id: 10,
    level: 'B2',
    type: 'reading',
    question: 'What does the sentence mean?',
    text: 'Although the traffic was heavy, she managed to arrive on time.',
    options: ['She was late.', 'She arrived early.', 'She was on time despite the traffic.'],
    correctAnswer: 2
  },
  {
    id: 11,
    level: 'A2',
    type: 'speaking',
    question: 'Introduce yourself in 2-3 sentences.',
    speakingPrompt: 'Introduce yourself in 2-3 sentences.',
    correctAnswer: 'My name is [name]. I am [age] years old. I live in [place].'
  },
  {
    id: 12,
    level: 'B1',
    type: 'speaking',
    question: 'Describe what you did yesterday.',
    speakingPrompt: 'Describe what you did yesterday.',
    correctAnswer: 'Yesterday I [activity]. Then I [activity]. In the evening I [activity].'
  }
];

export default function PlacementTest({ onBack, onComplete }: PlacementTestProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | string)[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userResponse, setUserResponse] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [finalLevel, setFinalLevel] = useState<string>('');
  const [recommendedModule, setRecommendedModule] = useState<number>(1);
  const [testProgress, setTestProgress] = useState(0);
  const [showAIConsent, setShowAIConsent] = useState(false);

  const { toast } = useToast();
  const { speak, isSpeaking } = useTextToSpeech();

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  useEffect(() => {
    setTestProgress((currentQuestionIndex / questions.length) * 100);
  }, [currentQuestionIndex]);

  const playAudio = async (text: string) => {
    try {
      await speak(text);
    } catch (error) {
      toast({
        title: "Audio Error",
        description: "Could not play audio. Please read the text.",
        variant: "destructive"
      });
    }
  };

  const handleMultipleChoice = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleAIConsentResult = (granted: boolean) => {
    setShowAIConsent(false);
    if (!granted) {
      toast({
        title: "Speaking exercises unavailable",
        description: "AI data processing consent is required for speaking questions.",
        variant: "destructive"
      });
    }
  };

  const startRecording = async () => {
    // Check AI consent before recording (audio sent to OpenAI Whisper)
    if (!hasAIConsent()) {
      if (needsAIConsentDialog()) {
        setShowAIConsent(true);
        return;
      }
      toast({
        title: "AI Consent Required",
        description: "Please enable AI data processing in Settings to use speaking exercises.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsRecording(true);
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        }
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        await sendToTranscribe(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();

      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
          setIsRecording(false);
        }
      }, 5000);

    } catch (error) {
      setIsRecording(false);
      toast({
        title: "Recording Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const sendToTranscribe = async (audioBlob: Blob) => {
    if (!hasAIConsent()) {
      toast({
        title: "Consent Required",
        description: "AI data processing consent is needed for speech transcription.",
        variant: "destructive"
      });
      return;
    }
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Audio = (reader.result as string).split(',')[1];
        
        const response = await supabase.functions.invoke('transcribe', {
          body: { audio: base64Audio }
        });

        if (response.error) {
          throw response.error;
        }

        const transcription = response.data?.transcript || '';
        if (transcription) {
          // Show verbatim transcription
          setUserResponse(transcription);
          toast({
            title: "Speech Recorded",
            description: `What you said: "${transcription}"`,
          });
        }
      };
      reader.readAsDataURL(audioBlob);
    } catch (error) {
      toast({
        title: "Transcription Error",
        description: "Could not process your speech. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleNext = () => {
    let answer: number | string;
    
    if (currentQuestion.type === 'speaking') {
      answer = userResponse;
    } else {
      answer = selectedOption !== null ? selectedOption : -1;
    }
    
    setAnswers([...answers, answer]);
    
    if (isLastQuestion) {
      calculateResults([...answers, answer]);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setUserResponse('');
    }
  };

  const calculateResults = (allAnswers: (number | string)[]) => {
    let correctCount = 0;
    let lastCorrectLevel = 'A1';
    
    // Check multiple choice and comprehension questions
    questions.forEach((question, index) => {
      if (question.type !== 'speaking') {
        if (allAnswers[index] === question.correctAnswer) {
          correctCount++;
          lastCorrectLevel = question.level;
        }
      }
    });

    // Evaluate speaking responses (simplified for demo)
    const speakingResponses = allAnswers.filter((_, index) => questions[index].type === 'speaking');
    const speakingScore = speakingResponses.length > 0 ? speakingResponses.filter(response => 
      typeof response === 'string' && response.length > 10
    ).length : 0;

    // Determine level based on performance
    let level = 'A1';
    let moduleStart = 1;

    if (correctCount >= 8 && speakingScore >= 2) {
      level = 'B2';
      moduleStart = 20;
    } else if (correctCount >= 6 && speakingScore >= 1) {
      level = 'B1';
      moduleStart = 15;
    } else if (correctCount >= 4) {
      level = 'A2';
      moduleStart = 8;
    } else {
      level = 'A1';
      moduleStart = 1;
    }

    setFinalLevel(level);
    setRecommendedModule(moduleStart);
    setShowResult(true);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'A1': return 'bg-green-100 text-green-800 border-green-200';
      case 'A2': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'B1': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'B2': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'C1': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-3 sm:p-4">
        <div className="max-w-xl sm:max-w-2xl mx-auto">
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center space-y-3 sm:space-y-4">
              <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Test Complete!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 text-center">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <p className="text-base sm:text-lg text-gray-600 mb-2">Your English level is:</p>
                  <Badge 
                    className={`text-xl sm:text-2xl py-2 sm:py-3 px-4 sm:px-6 font-bold ${getLevelColor(finalLevel)}`}
                  >
                    {finalLevel}
                  </Badge>
                </div>
                
                <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-gray-700 text-sm sm:text-base">
                    We recommend starting at: <strong>{finalLevel} - Module {recommendedModule}</strong>
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:gap-3 justify-center">
                <Button 
                  onClick={() => onComplete(finalLevel, recommendedModule)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2.5 sm:py-3 px-6 text-sm sm:text-base"
                >
                  Start Learning
                </Button>
                <Button 
                  onClick={() => {
                    setCurrentQuestionIndex(0);
                    setAnswers([]);
                    setShowResult(false);
                    setSelectedOption(null);
                    setUserResponse('');
                  }}
                  variant="outline"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 py-2.5 sm:py-3 text-sm sm:text-base"
                >
                  Take Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-3 sm:p-4">
      <div className="max-w-2xl sm:max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <Button 
            onClick={onBack}
            variant="ghost" 
            className="text-blue-600 hover:bg-blue-100 text-sm sm:text-base"
            size="sm"
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Back
          </Button>
          <Badge className={`text-xs sm:text-sm ${getLevelColor(currentQuestion.level)}`}>
            {currentQuestion.level} Level
          </Badge>
        </div>

        {/* Progress */}
        <div className="mb-4 sm:mb-6">
          <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(testProgress)}% Complete</span>
          </div>
          <Progress value={testProgress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl">
              {currentQuestion.type === 'listening' && (
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <Button
                    onClick={() => currentQuestion.audio && playAudio(currentQuestion.audio)}
                    variant="outline"
                    size="sm"
                    disabled={isSpeaking}
                    className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                  >
                    <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    {isSpeaking ? 'Playing...' : 'Play Audio'}
                  </Button>
                </div>
              )}
              
              {currentQuestion.type === 'reading' && currentQuestion.text && (
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-3 sm:mb-4 text-sm sm:text-base font-normal leading-relaxed">
                  {currentQuestion.text}
                </div>
              )}
              
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-3 sm:space-y-4">
            {currentQuestion.type === 'speaking' ? (
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-blue-800 font-medium text-sm sm:text-base">{currentQuestion.speakingPrompt}</p>
                </div>
                
                {userResponse && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-green-800 text-sm sm:text-base">
                      <strong>You said:</strong> "{userResponse}"
                    </p>
                  </div>
                )}
                
                <Button
                  onClick={startRecording}
                  disabled={isRecording}
                  className={`w-full py-4 sm:py-6 text-base sm:text-lg font-semibold ${
                    isRecording 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white`}
                >
                  <Mic className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  {isRecording ? 'Recording... (5s max)' : 'Start Recording'}
                </Button>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-3">
                {currentQuestion.options?.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleMultipleChoice(index)}
                    variant={selectedOption === index ? "default" : "outline"}
                    className={`w-full text-left justify-start p-3 sm:p-4 h-auto text-sm sm:text-base leading-relaxed ${
                      selectedOption === index 
                        ? 'bg-blue-500 text-white border-blue-500' 
                        : 'hover:bg-blue-50 border-gray-200'
                    }`}
                  >
                    <span className="font-semibold mr-2 sm:mr-3 flex-shrink-0">{String.fromCharCode(65 + index)}.</span>
                    <span className="flex-1">{option}</span>
                  </Button>
                ))}
              </div>
            )}
            
            <div className="pt-3 sm:pt-4">
              <Button
                onClick={handleNext}
                disabled={
                  currentQuestion.type === 'speaking' 
                    ? !userResponse 
                    : selectedOption === null
                }
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2.5 sm:py-3 text-sm sm:text-base"
              >
                {isLastQuestion ? 'Finish Test' : 'Next Question'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <AIConsentModal
        isOpen={showAIConsent}
        onConsent={handleAIConsentResult}
      />
    </div>
  );
}