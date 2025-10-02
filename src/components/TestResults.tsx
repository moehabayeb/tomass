import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Award,
  TrendingUp,
  TrendingDown,
  BookOpen,
  RotateCcw,
  Download,
  Share2,
  Trophy,
  Star,
  Clock,
  MessageSquare,
  Zap
} from 'lucide-react';
import { TestResult } from '@/services/speakingTestService';

interface TestResultsProps {
  result: TestResult;
  onRestart?: () => void;
  onBack?: () => void;
  onGoToLessons?: () => void;
}

export function TestResults({ result, onRestart, onBack, onGoToLessons }: TestResultsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const getLevelColor = (level: string): string => {
    switch (level) {
      case 'A1': return 'bg-red-500';
      case 'A2': return 'bg-orange-500';
      case 'B1': return 'bg-yellow-500';
      case 'B2': return 'bg-green-500';
      case 'C1': return 'bg-blue-500';
      case 'C2': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 85) return 'text-green-500';
    if (score >= 70) return 'text-blue-500';
    if (score >= 55) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getPerformanceLevel = (score: number): string => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Fair';
    if (score >= 45) return 'Needs Improvement';
    return 'Poor';
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const generateCertificate = () => {
    // This would generate a PDF certificate
    alert('Certificate generation feature coming soon!');
  };

  const shareResults = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My English Proficiency Test Results',
          text: `I scored ${result.overall_score}% on my English test and achieved ${result.recommended_level} level!`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      const text = `I scored ${result.overall_score}% on my English proficiency test and achieved ${result.recommended_level} level!`;
      navigator.clipboard.writeText(text);
      alert('Results copied to clipboard!');
    }
  };

  const skillAreas = [
    { key: 'pronunciation_score', label: 'Pronunciation', icon: MessageSquare },
    { key: 'grammar_score', label: 'Grammar', icon: BookOpen },
    { key: 'vocabulary_score', label: 'Vocabulary', icon: Star },
    { key: 'fluency_score', label: 'Fluency', icon: Zap },
    { key: 'comprehension_score', label: 'Comprehension', icon: Trophy }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-white hover:bg-white/10"
          >
            ← Back to Menu
          </Button>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Test Results</h1>
            <p className="text-blue-200">
              Completed on {new Date(result.test_date || Date.now()).toLocaleDateString()}
            </p>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={shareResults}
              className="text-white hover:bg-white/10"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              variant="ghost"
              onClick={generateCertificate}
              className="text-white hover:bg-white/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Certificate
            </Button>
          </div>
        </div>

        {/* Overall Score Card */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-8">
          <CardContent className="p-8">
            <div className="text-center">
              {/* Level Badge */}
              <div className="flex justify-center mb-4">
                <Badge className={`${getLevelColor(result.recommended_level)} text-white text-lg px-6 py-2`}>
                  CEFR Level: {result.recommended_level}
                </Badge>
              </div>

              {/* Overall Score */}
              <div className="mb-6">
                <div className={`text-6xl font-bold ${getScoreColor(result.overall_score)} mb-2`}>
                  {result.overall_score}%
                </div>
                <div className="text-white text-xl">
                  Overall Score - {getPerformanceLevel(result.overall_score)}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
                <div className="text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-blue-300" />
                  <div className="font-semibold">{formatDuration(result.test_duration)}</div>
                  <div className="text-sm text-blue-200">Duration</div>
                </div>
                <div className="text-center">
                  <Zap className="w-6 h-6 mx-auto mb-2 text-blue-300" />
                  <div className="font-semibold">{result.words_per_minute || 0} WPM</div>
                  <div className="text-sm text-blue-200">Words/Minute</div>
                </div>
                <div className="text-center">
                  <Star className="w-6 h-6 mx-auto mb-2 text-blue-300" />
                  <div className="font-semibold">{result.unique_words_count || 0}</div>
                  <div className="text-sm text-blue-200">Unique Words</div>
                </div>
                <div className="text-center">
                  <BookOpen className="w-6 h-6 mx-auto mb-2 text-blue-300" />
                  <div className="font-semibold">{result.grammar_errors_count || 0}</div>
                  <div className="text-sm text-blue-200">Grammar Errors</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-lg">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white/20">
              Overview
            </TabsTrigger>
            <TabsTrigger value="breakdown" className="text-white data-[state=active]:bg-white/20">
              Skill Breakdown
            </TabsTrigger>
            <TabsTrigger value="feedback" className="text-white data-[state=active]:bg-white/20">
              Detailed Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Skills Overview */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Skill Areas Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skillAreas.map(({ key, label, icon: Icon }) => {
                    const score = result[key as keyof TestResult] as number;
                    return (
                      <div key={key} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-white">
                            <Icon className="w-5 h-5 mr-3 text-blue-300" />
                            <span className="font-medium">{label}</span>
                          </div>
                          <div className={`font-bold ${getScoreColor(score)}`}>
                            {score}%
                          </div>
                        </div>
                        <Progress value={score} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-white">
                  {result.detailed_feedback.overall_assessment?.strengths?.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-green-300 mb-2">Your Strengths:</h4>
                      <ul className="list-disc list-inside space-y-1 text-blue-100">
                        {result.detailed_feedback.overall_assessment.strengths.map((strength: string, index: number) => (
                          <li key={index}>{strength}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.detailed_feedback.overall_assessment?.weaknesses?.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-orange-300 mb-2">Areas for Improvement:</h4>
                      <ul className="list-disc list-inside space-y-1 text-blue-100">
                        {result.detailed_feedback.overall_assessment.weaknesses.map((weakness: string, index: number) => (
                          <li key={index}>{weakness}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.detailed_feedback.overall_assessment?.suggestions?.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-blue-300 mb-2">Study Suggestions:</h4>
                      <ul className="list-disc list-inside space-y-1 text-blue-100">
                        {result.detailed_feedback.overall_assessment.suggestions.map((suggestion: string, index: number) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="breakdown" className="space-y-6">
            {/* Phase-by-Phase Results */}
            <div className="grid gap-6">
              {result.detailed_feedback.phase_breakdown?.map((phase: any, index: number) => (
                <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Phase {phase.phase}: {result.transcript[index]?.phase_name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                      {Object.entries(phase.scores).map(([skill, score]) => (
                        <div key={skill} className="text-center">
                          <div className={`text-2xl font-bold ${getScoreColor(score as number)}`}>
                            {score}%
                          </div>
                          <div className="text-white text-sm capitalize">{skill}</div>
                        </div>
                      ))}
                    </div>

                    {/* Transcript Preview */}
                    <div className="bg-white/5 rounded-lg p-4 mt-4">
                      <h4 className="text-white font-semibold mb-2">What you said:</h4>
                      <p className="text-blue-100 italic">
                        "{result.transcript[index]?.transcript.substring(0, 200)}..."
                      </p>
                    </div>

                    {/* Phase Feedback */}
                    {phase.feedback && phase.feedback.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-white font-semibold mb-2">Feedback:</h4>
                        <ul className="list-disc list-inside space-y-1 text-blue-100">
                          {phase.feedback.map((feedback: string, feedbackIndex: number) => (
                            <li key={feedbackIndex}>{feedback}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            {/* Detailed Linguistic Analysis */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Grammar Analysis</CardTitle>
                </CardHeader>
                <CardContent className="text-white">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Overall Grammar Score:</span>
                      <span className={`font-bold ${getScoreColor(result.grammar_score)}`}>
                        {result.grammar_score}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Grammar Errors Found:</span>
                      <span className="font-bold">{result.grammar_errors_count || 0}</span>
                    </div>
                    <div className="text-sm text-blue-200">
                      {result.grammar_score >= 80
                        ? "Excellent grammar usage with minimal errors."
                        : result.grammar_score >= 60
                        ? "Good grammar with some room for improvement."
                        : "Focus on basic grammar rules and sentence structure."}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Vocabulary Analysis</CardTitle>
                </CardHeader>
                <CardContent className="text-white">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Vocabulary Score:</span>
                      <span className={`font-bold ${getScoreColor(result.vocabulary_score)}`}>
                        {result.vocabulary_score}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Unique Words Used:</span>
                      <span className="font-bold">{result.unique_words_count || 0}</span>
                    </div>
                    <div className="text-sm text-blue-200">
                      {result.vocabulary_score >= 80
                        ? "Rich vocabulary with advanced word usage."
                        : result.vocabulary_score >= 60
                        ? "Good vocabulary range, try using more advanced words."
                        : "Work on expanding your vocabulary range."}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Full Transcript */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Complete Transcript</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {result.transcript.map((phase: any, index: number) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">
                        Phase {phase.phase}: {phase.phase_name}
                      </h4>
                      <p className="text-blue-100 italic">"{phase.transcript}"</p>
                      <div className="text-xs text-blue-200 mt-2">
                        Duration: {formatDuration(phase.duration / 1000)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <Button
            onClick={onRestart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Take Test Again
          </Button>

          <Button
            onClick={() => {
              if (onGoToLessons) {
                // Call the provided navigation callback
                onGoToLessons();
              } else {
                // Fallback: Store data and attempt to navigate
                localStorage.setItem('recommendedStartLevel', result.recommended_level);
                localStorage.setItem('currentLevel', result.recommended_level);

                // Enable access to the recommended level
                const unlocks = JSON.parse(localStorage.getItem('unlocks') || '{}');
                unlocks[result.recommended_level] = true;
                localStorage.setItem('unlocks', JSON.stringify(unlocks));

                // Alert user since navigation is broken
                alert('Test completed! Please navigate to lessons manually.');
              }
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Start Learning ({result.recommended_level})
          </Button>
        </div>
      </div>
    </div>
  );
}