import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Mic, MicOff, CheckCircle } from 'lucide-react';
import { SpeechAnalyzer } from '@/services/SpeechAnalyzer';
import { GrammarChecker } from '@/services/GrammarChecker';
import { VocabularyAnalyzer } from '@/services/VocabularyAnalyzer';
import { speakingTestService, TestPrompt, TestResult } from '@/services/speakingTestService';
import { TestResults } from './TestResults';
import { useToast } from '@/hooks/use-toast';

interface TestPhaseData {
  prompt: TestPrompt;
  transcript: string;
  analysisResult: {
    pronunciation: number;
    grammar: number;
    vocabulary: number;
    fluency: number;
    comprehension: number;
  };
  duration: number;
  grammarErrorCount: number; // Store to avoid recalculation
}

interface EnglishProficiencyTestProps {
  onComplete?: (result: TestResult) => void;
  onBack?: () => void;
  onGoToLessons?: () => void;
  testType?: 'full' | 'practice' | 'placement';
}

// Constants for scoring and timing
const PHASE_TRANSITION_DELAY = 1000; // 1 second delay before advancing to next phase
const DEFAULT_TIME_LIMIT = 120; // Default time limit in seconds if not specified
const MIN_WORD_LENGTH = 2; // Minimum word length for vocabulary counting

export default function EnglishProficiencyTest({
  onComplete,
  onBack,
  onGoToLessons,
  testType = 'full'
}: EnglishProficiencyTestProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [testPrompts, setTestPrompts] = useState<TestPrompt[]>([]);
  const [phaseData, setPhaseData] = useState<TestPhaseData[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(DEFAULT_TIME_LIMIT);
  const [isLoading, setIsLoading] = useState(true);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [finalResult, setFinalResult] = useState<TestResult | null>(null);
  const [speechAnalyzer] = useState(() => new SpeechAnalyzer());
  const [grammarChecker] = useState(() => new GrammarChecker());
  const [vocabularyAnalyzer] = useState(() => new VocabularyAnalyzer());
  const [phaseStartTime, setPhaseStartTime] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  // 🔧 FIX #12: Use ref for timer to prevent dependency array issues
  const phaseTransitionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isMounted, setIsMounted] = useState(true);
  const { toast } = useToast();

  // Cleanup on unmount - prevent memory leaks
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
      // Clear phase transition timer using ref
      if (phaseTransitionTimerRef.current) {
        clearTimeout(phaseTransitionTimerRef.current);
        phaseTransitionTimerRef.current = null;
      }
      // Stop recording and release microphone
      if (speechAnalyzer) {
        try {
          speechAnalyzer.stopRecording();
        } catch {
          // Silent cleanup
        }
      }
    };
  }, [speechAnalyzer]);

  // Load test prompts on component mount
  useEffect(() => {
    const loadTestPrompts = async () => {
      try {
        setIsLoading(true);
        const prompts = testType === 'practice'
          ? await speakingTestService.getPracticeTest()
          : await speakingTestService.getTestPrompts();

        setTestPrompts(prompts);
        if (prompts.length > 0) {
          setTimeRemaining(prompts[0].time_limit);
        }
      } catch (error) {
        // Apple Store Compliance: Silent fail - error shown via toast
        toast({
          title: "Error",
          description: "Failed to load test prompts. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadTestPrompts();
  }, [testType, toast]);

  // Stable reference for handlePhaseComplete
  const handlePhaseComplete = useCallback(() => {
    if (currentPhase < testPrompts.length - 1) {
      // Move to next phase
      const nextPhase = currentPhase + 1;
      setCurrentPhase(nextPhase);
      setTimeRemaining(testPrompts[nextPhase].time_limit);
    } else {
      // Test complete
      completeTest();
    }
  }, [currentPhase, testPrompts]);

  // Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (timeRemaining > 0 && currentPhase < testPrompts.length && !isTestComplete) {
      timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && currentPhase < testPrompts.length) {
      // Time's up for current phase
      handlePhaseComplete();
    }

    return () => clearTimeout(timer);
  }, [timeRemaining, currentPhase, testPrompts.length, isTestComplete, handlePhaseComplete]);

  const startRecording = async () => {
    try {
      if (!speechAnalyzer.isSupported()) {
        toast({
          title: "Speech Recognition Not Supported",
          description: "Your browser doesn't support speech recognition. Please use Chrome or Edge.",
          variant: "destructive"
        });
        return;
      }

      await speechAnalyzer.startRecording();
      setIsRecording(true);
      setPhaseStartTime(Date.now());
    } catch (error) {
      // Apple Store Compliance: Silent fail - error shown via toast
      toast({
        title: "Recording Error",
        description: "Failed to start recording. Please check your microphone permissions.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      setIsAnalyzing(true);

      const speechResult = await speechAnalyzer.stopRecording();

      // Check if component is still mounted before state updates
      if (!isMounted) return;

      const transcript = speechResult.transcript;

      if (!transcript.trim()) {
        toast({
          title: "No Speech Detected",
          description: "Please try again and speak clearly into your microphone.",
          variant: "destructive"
        });
        setIsAnalyzing(false);
        return;
      }

      // Analyze the transcript
      const grammarResult = grammarChecker.analyzeGrammar(transcript);
      const vocabularyResult = vocabularyAnalyzer.analyzeVocabulary(transcript);

      // Check if still mounted before continuing
      if (!isMounted) return;

      // Calculate scores for this phase
      const pronunciationScore = speechResult.pronunciationScore;
      const grammarScore = grammarResult.score;
      const vocabularyScore = vocabularyResult.score;
      const fluencyScore = speechResult.fluencyScore;

      // Real comprehension scoring based on response accuracy
      const comprehensionScore = calculateComprehensionScore(
        transcript,
        testPrompts[currentPhase],
        vocabularyScore,
        grammarScore,
        fluencyScore
      );

      const phaseDuration = Date.now() - phaseStartTime;

      const newPhaseData: TestPhaseData = {
        prompt: testPrompts[currentPhase],
        transcript,
        analysisResult: {
          pronunciation: Math.round(pronunciationScore),
          grammar: Math.round(grammarScore),
          vocabulary: Math.round(vocabularyScore),
          fluency: Math.round(fluencyScore),
          comprehension: Math.round(comprehensionScore)
        },
        duration: phaseDuration,
        grammarErrorCount: grammarResult.totalErrors // Store for later use
      };

      // Final mounted check before state updates
      if (!isMounted) return;

      setPhaseData(prev => [...prev, newPhaseData]);
      setIsAnalyzing(false);

      // Auto-advance to next phase after a short delay
      phaseTransitionTimerRef.current = setTimeout(() => {
        if (isMounted) {
          handlePhaseComplete();
        }
      }, PHASE_TRANSITION_DELAY);

    } catch (error) {
      // Apple Store Compliance: Silent fail - error shown via toast
      setIsAnalyzing(false);
      toast({
        title: "Analysis Error",
        description: "Failed to analyze your speech. Please try again.",
        variant: "destructive"
      });
    }
  };

  const completeTest = async () => {
    if (phaseData.length === 0) {
      toast({
        title: "No Data",
        description: "No test data available. Please restart the test.",
        variant: "destructive"
      });
      return;
    }

    setIsTestComplete(true);

    // Calculate overall scores
    const scores = calculateOverallScores();
    const recommendation = speakingTestService.getLevelRecommendation(scores);

    // Calculate total test duration
    const totalDuration = phaseData.reduce((sum, phase) => sum + phase.duration, 0);

    // Build transcript array
    const transcript = phaseData.map((phase, index) => ({
      phase: index + 1,
      phase_name: phase.prompt.phase_name,
      transcript: phase.transcript,
      duration: phase.duration,
      scores: phase.analysisResult
    }));

    // Build detailed feedback
    const detailedFeedback = {
      overall_assessment: recommendation,
      phase_breakdown: phaseData.map((phase, index) => ({
        phase: index + 1,
        scores: phase.analysisResult,
        feedback: generatePhaseFeedback(phase)
      }))
    };

    const result: TestResult = {
      overall_score: scores.overall,
      recommended_level: recommendation.recommendedLevel,
      pronunciation_score: scores.pronunciation,
      grammar_score: scores.grammar,
      vocabulary_score: scores.vocabulary,
      fluency_score: scores.fluency,
      comprehension_score: scores.comprehension,
      test_duration: Math.round(totalDuration / 1000), // Convert to seconds
      transcript,
      detailed_feedback: detailedFeedback,
      words_per_minute: calculateAverageWPM(),
      unique_words_count: calculateUniqueWordsCount(),
      grammar_errors_count: calculateGrammarErrorsCount(),
      pronunciation_issues: collectPronunciationIssues(),
      test_type: testType
    };

    try {
      // Save to database
      const savedResult = await speakingTestService.saveTestResult(result);
      setFinalResult(savedResult);

      if (onComplete) {
        onComplete(savedResult);
      }
    } catch (error) {
      // Apple Store Compliance: Silent fail - error shown via toast
      setFinalResult(result);
      toast({
        title: "Save Error",
        description: "Test completed but failed to save to database. Your results are still available.",
        variant: "destructive"
      });

      // 🔧 DIVINE FIX: ALWAYS call onComplete so AppNavigation can handle localStorage
      if (onComplete) {
        onComplete(result);
      }
    }
  };

  const calculateComprehensionScore = (
    transcript: string,
    prompt: TestPrompt,
    vocabScore: number,
    grammarScore: number,
    fluencyScore: number
  ): number => {
    let score = 0;

    // Base responsiveness check (0-40 points)
    const responseLength = transcript.trim().split(/\s+/).length;
    const promptType = prompt.prompt_type;

    // Check if response length is appropriate for the task (CEFR-aligned word counts)
    const expectedLengths = {
      introduction: 15, // A1-A2: Brief self-introduction (name, interests)
      description: 30,  // A2-B1: Simple event description with details
      storytelling: 40, // B1-B2: Detailed narrative with sequence and emotions
      discussion: 50,   // B2-C1: Complex opinion with reasoning and examples
      comparison: 30    // A2-C2: Comparison with preference and reasoning
    };

    const expectedLength = expectedLengths[promptType as keyof typeof expectedLengths] || 30;
    const lengthRatio = Math.min(responseLength / expectedLength, 2); // Cap at 2x expected

    if (lengthRatio >= 0.7) {
      score += 25; // Good response length
    } else if (lengthRatio >= 0.5) {
      score += 15; // Acceptable length
    } else if (lengthRatio >= 0.3) {
      score += 8;  // Too brief
    }
    // Very short responses get 0 points

    // Content relevance check (0-30 points)
    const relevanceKeywords = {
      introduction: ['name', 'from', 'like', 'free time', 'hobby', 'work', 'study'],
      description: ['yesterday', 'morning', 'afternoon', 'evening', 'went', 'did', 'met'],
      storytelling: ['experience', 'happened', 'felt', 'remember', 'trip', 'celebration', 'event'],
      discussion: ['think', 'opinion', 'believe', 'positive', 'negative', 'impact', 'society', 'because'],
      comparison: ['compare', 'contrast', 'prefer', 'better', 'versus', 'difference', 'advantage', 'disadvantage', 'both', 'however', 'while', 'whereas']
    };

    const keywords = relevanceKeywords[promptType as keyof typeof relevanceKeywords] || [];
    const foundKeywords = keywords.filter(keyword =>
      transcript.toLowerCase().includes(keyword.toLowerCase())
    ).length;

    const keywordRatio = foundKeywords / keywords.length;
    if (keywordRatio >= 0.5) {
      score += 25; // Highly relevant
    } else if (keywordRatio >= 0.3) {
      score += 18; // Relevant
    } else if (keywordRatio >= 0.1) {
      score += 10; // Somewhat relevant
    }

    // Coherence and structure (0-20 points)
    const sentences = transcript.split(/[.!?]+/).filter(s => s.trim().length > 0);
    if (sentences.length >= 3) {
      score += 10; // Multiple sentences show structure

      // Check for connecting words
      const connectors = ['and', 'but', 'because', 'so', 'then', 'after', 'before', 'when', 'while'];
      const hasConnectors = connectors.some(connector =>
        transcript.toLowerCase().includes(connector)
      );

      if (hasConnectors) {
        score += 10; // Good use of connectors
      }
    }

    // Question answering accuracy (0-10 points)
    // Check if the response actually addresses what was asked
    const instructionWords = prompt.instructions.toLowerCase().split(/\s+/);
    const questionWords = ['what', 'where', 'when', 'why', 'how', 'describe', 'tell', 'explain'];
    const hasQuestionFocus = questionWords.some(qw =>
      instructionWords.includes(qw) &&
      transcript.toLowerCase().includes(qw.replace('describe', 'description').replace('explain', 'explanation'))
    );

    if (hasQuestionFocus || foundKeywords >= 2) {
      score += 10; // Addresses the question
    }

    // Apply minimum language competency requirements
    // Poor grammar/vocabulary should limit comprehension score
    if (grammarScore < 30) {
      score = Math.min(score, 30); // Grammar too poor for good comprehension
    } else if (grammarScore < 50) {
      score = Math.min(score, 50); // Limited grammar affects comprehension
    }

    if (vocabScore < 25) {
      score = Math.min(score, 25); // Vocabulary too limited
    } else if (vocabScore < 40) {
      score = Math.min(score, 40); // Limited vocabulary affects comprehension
    }

    // Very poor fluency also impacts comprehension
    if (fluencyScore < 30) {
      score = Math.min(score, 35); // Too hesitant to show good comprehension
    }

    return Math.max(0, Math.min(100, Math.round(score)));
  };

  const calculateOverallScores = () => {
    if (phaseData.length === 0) {
      return {
        overall: 0,
        pronunciation: 0,
        grammar: 0,
        vocabulary: 0,
        fluency: 0,
        comprehension: 0
      };
    }

    const totals = phaseData.reduce(
      (acc, phase) => ({
        pronunciation: acc.pronunciation + phase.analysisResult.pronunciation,
        grammar: acc.grammar + phase.analysisResult.grammar,
        vocabulary: acc.vocabulary + phase.analysisResult.vocabulary,
        fluency: acc.fluency + phase.analysisResult.fluency,
        comprehension: acc.comprehension + phase.analysisResult.comprehension
      }),
      { pronunciation: 0, grammar: 0, vocabulary: 0, fluency: 0, comprehension: 0 }
    );

    const count = phaseData.length;
    const scores = {
      pronunciation: Math.round(totals.pronunciation / count),
      grammar: Math.round(totals.grammar / count),
      vocabulary: Math.round(totals.vocabulary / count),
      fluency: Math.round(totals.fluency / count),
      comprehension: Math.round(totals.comprehension / count)
    };

    // Apply overall CEFR level caps based on weakest areas
    const weakestScore = Math.min(scores.pronunciation, scores.grammar, scores.vocabulary, scores.fluency, scores.comprehension);
    let overall = Math.round(
      (scores.pronunciation + scores.grammar + scores.vocabulary + scores.fluency + scores.comprehension) / 5
    );

    // Cap overall score based on weakest area
    if (weakestScore <= 25) {
      overall = Math.min(overall, 35); // A1 level cap
    } else if (weakestScore <= 40) {
      overall = Math.min(overall, 45); // A2 level cap
    } else if (weakestScore <= 55) {
      overall = Math.min(overall, 60); // B1 level cap
    } else if (weakestScore <= 70) {
      overall = Math.min(overall, 75); // B2 level cap
    }

    return { overall, ...scores };
  };

  const generatePhaseFeedback = (phase: TestPhaseData): string[] => {
    const feedback: string[] = [];
    const { analysisResult, transcript } = phase;

    // Grammar feedback
    if (analysisResult.grammar >= 80) {
      feedback.push("Excellent grammar usage!");
    } else if (analysisResult.grammar >= 60) {
      feedback.push("Good grammar with minor errors.");
    } else {
      feedback.push("Focus on improving grammar accuracy.");
    }

    // Vocabulary feedback
    if (analysisResult.vocabulary >= 80) {
      feedback.push("Great vocabulary range and usage!");
    } else if (analysisResult.vocabulary >= 60) {
      feedback.push("Good vocabulary, try to use more advanced words.");
    } else {
      feedback.push("Work on expanding your vocabulary.");
    }

    // Pronunciation feedback
    if (analysisResult.pronunciation >= 80) {
      feedback.push("Clear and understandable pronunciation!");
    } else if (analysisResult.pronunciation >= 60) {
      feedback.push("Generally clear pronunciation with some areas to improve.");
    } else {
      feedback.push("Focus on pronunciation clarity and accuracy.");
    }

    return feedback;
  };

  const calculateAverageWPM = (): number => {
    if (phaseData.length === 0) return 0;

    const totalWords = phaseData.reduce((sum, phase) => {
      return sum + phase.transcript.split(/\s+/).length;
    }, 0);

    const totalMinutes = phaseData.reduce((sum, phase) => {
      return sum + (phase.duration / 60000); // Convert ms to minutes
    }, 0);

    return totalMinutes > 0 ? Math.round(totalWords / totalMinutes) : 0;
  };

  const calculateUniqueWordsCount = (): number => {
    const allWords = phaseData.flatMap(phase =>
      phase.transcript.toLowerCase().split(/\s+/).filter(word => word.length > MIN_WORD_LENGTH)
    );
    return new Set(allWords).size;
  };

  const calculateGrammarErrorsCount = (): number => {
    // Use stored grammar error count to avoid duplicate analysis
    return phaseData.reduce((sum, phase) => sum + phase.grammarErrorCount, 0);
  };

  const collectPronunciationIssues = (): any[] => {
    // This would collect all pronunciation issues from speech analysis
    // For now, return empty array
    return [];
  };

  const restartTest = () => {
    setCurrentPhase(0);
    setPhaseData([]);
    setIsTestComplete(false);
    setFinalResult(null);
    setTimeRemaining(testPrompts[0]?.time_limit || DEFAULT_TIME_LIMIT);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Loading Test...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isTestComplete && finalResult) {
    return (
      <TestResults
        result={finalResult}
        onRestart={restartTest}
        onBack={onBack}
        onGoToLessons={onGoToLessons}
      />
    );
  }

  if (testPrompts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-4">Failed to load test prompts.</p>
            <Button onClick={() => {
              // Soft retry - reset state instead of hard reload
              setIsLoading(true);
              setTestPrompts([]);
              setPhaseData([]);
              setCurrentPhase(0);
              setIsTestComplete(false);
              setFinalResult(null);
            }} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentPrompt = testPrompts[currentPhase];
  const progress = ((currentPhase + 1) / testPrompts.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-white hover:bg-white/10"
          >
            ← Back
          </Button>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-2">
              {testType === 'practice' ? 'Practice Test' : 'English Proficiency Test'}
            </h1>
            <p className="text-blue-200">
              Phase {currentPhase + 1} of {testPrompts.length}: {currentPrompt.phase_name}
            </p>
          </div>

          <div className="text-right">
            <div className="text-white font-mono text-lg">
              {formatTime(timeRemaining)}
            </div>
            <div className="text-blue-200 text-sm">Time remaining</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-blue-200">
            {testPrompts.map((prompt, index) => (
              <span
                key={index}
                className={index <= currentPhase ? 'text-white font-semibold' : ''}
              >
                {prompt.phase_name}
              </span>
            ))}
          </div>
        </div>

        {/* Main Test Interface */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-xl">
              {currentPrompt.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Instructions */}
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">Instructions:</h3>
              <p className="text-blue-100 mb-3">{currentPrompt.instructions}</p>
              {currentPrompt.content && (
                <p className="text-blue-200 text-sm italic">{currentPrompt.content}</p>
              )}
            </div>

            {/* Evaluation Criteria */}
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">You will be evaluated on:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(currentPrompt.evaluation_criteria).map(([criterion, description]) => (
                  <div key={criterion} className="text-blue-100">
                    <span className="font-medium capitalize">{criterion}:</span> {description}
                  </div>
                ))}
              </div>
            </div>

            {/* Recording Interface */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-4">
                {!isRecording ? (
                  <Button
                    onClick={startRecording}
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-4"
                    disabled={isAnalyzing}
                    aria-label="Start recording your response"
                  >
                    <Mic className="w-6 h-6 mr-2" />
                    Start Recording
                  </Button>
                ) : (
                  <Button
                    onClick={stopRecording}
                    size="lg"
                    className="bg-red-800 hover:bg-red-900 text-white px-8 py-4 animate-pulse"
                    aria-label="Stop recording"
                  >
                    <MicOff className="w-6 h-6 mr-2" />
                    Stop Recording
                  </Button>
                )}
              </div>

              {isAnalyzing && (
                <div className="text-white" role="status" aria-live="polite">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-2"></div>
                  Analyzing your speech...
                </div>
              )}

              {isRecording && (
                <div className="text-white text-sm" role="status" aria-live="polite">
                  <span className="inline-block w-3 h-3 bg-red-600 rounded-full mr-2 animate-pulse" aria-hidden="true"></span>
                  Recording in progress... Speak clearly into your microphone
                </div>
              )}
            </div>

            {/* Current Phase Results */}
            {phaseData[currentPhase] && (
              <div className="bg-green-500/20 rounded-lg p-4">
                <div className="flex items-center text-green-200 mb-2">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Phase Complete!
                </div>
                <div className="grid grid-cols-5 gap-2 text-sm">
                  {Object.entries(phaseData[currentPhase].analysisResult).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-white font-semibold">{value}%</div>
                      <div className="text-green-200 capitalize text-xs">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}