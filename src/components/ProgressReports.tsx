// Progress Reports Component - Comprehensive learning analytics dashboard
// Displays detailed progress tracking, accuracy trends, and performance insights

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Target, 
  BookOpen,
  AlertCircle,
  CheckCircle,
  Star,
  Download,
  Refresh,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { ProgressTrackerService } from '../services/progressTrackerService';
import { 
  UserProgressProfile, 
  ModuleProgressDetail, 
  PerformanceTrend,
  ReviewSuggestion,
  TimeWindow 
} from '../types/progressTypes';
import { ModuleUnlockStatus, getAllModuleStatuses } from '../utils/lessons/moduleUnlocking';

interface ProgressReportsProps {
  userId?: string;
  onClose?: () => void;
}

export function ProgressReports({ userId = 'guest', onClose }: ProgressReportsProps) {
  const [profile, setProfile] = useState<UserProgressProfile | null>(null);
  const [moduleStatuses, setModuleStatuses] = useState<ModuleUnlockStatus[]>([]);
  const [selectedTimeWindow, setSelectedTimeWindow] = useState<TimeWindow>('week');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  const progressTracker = ProgressTrackerService.getInstance();

  useEffect(() => {
    loadProgressData();
  }, [userId, selectedTimeWindow, selectedLevel]);

  const loadProgressData = async () => {
    setIsLoading(true);
    try {
      progressTracker.setUserId(userId);
      const userProfile = progressTracker.getUserProfile();
      const statuses = getAllModuleStatuses(selectedLevel === 'all' ? undefined : selectedLevel);
      
      setProfile(userProfile);
      setModuleStatuses(statuses);
    } catch (error) {
      console.error('Failed to load progress data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportProgress = () => {
    const data = progressTracker.exportUserData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `progress_export_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getTrendIcon = (trend: PerformanceTrend) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'declining': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-blue-600" />;
    }
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  const formatAccuracy = (accuracy: number) => accuracy.toFixed(1) + '%';

  if (isLoading || !profile) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        <span className="ml-2">Loading progress reports...</span>
      </div>
    );
  }

  const completedModules = moduleStatuses.filter(s => s.isCompleted);
  const inProgressModules = moduleStatuses.filter(s => s.isUnlocked && !s.isCompleted);
  const performanceTrend = progressTracker.getPerformanceTrend();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Progress Reports</h1>
          <p className="text-gray-600">Detailed learning analytics and performance insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadProgressData}>
            <Refresh className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={exportProgress}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Accuracy</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatAccuracy(profile.overallAccuracy)}
                </p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex items-center mt-2">
              {getTrendIcon(performanceTrend)}
              <span className="text-sm text-gray-600 ml-1">
                {performanceTrend === 'improving' ? 'Improving' : 
                 performanceTrend === 'declining' ? 'Declining' : 'Stable'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Modules Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {completedModules.length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {inProgressModules.length} in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Study Time</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatTime(profile.totalStudyTime)}
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {profile.currentStreak} day streak
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Questions Answered</p>
                <p className="text-2xl font-bold text-orange-600">
                  {profile.totalQuestionsAnswered}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {profile.totalCorrectAnswers} correct
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="modules">Module Progress</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="errors">Error Analysis</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Level Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Current Level: {profile.currentLevel}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Level Progress</span>
                      <span>{completedModules.filter(m => 
                        (profile.currentLevel === 'A1' && m.moduleId <= 50) ||
                        (profile.currentLevel === 'A2' && m.moduleId >= 51 && m.moduleId <= 100) ||
                        (profile.currentLevel === 'B1' && m.moduleId >= 101)
                      ).length} / 50 modules</span>
                    </div>
                    <Progress 
                      value={(completedModules.filter(m => 
                        (profile.currentLevel === 'A1' && m.moduleId <= 50) ||
                        (profile.currentLevel === 'A2' && m.moduleId >= 51 && m.moduleId <= 100) ||
                        (profile.currentLevel === 'B1' && m.moduleId >= 101)
                      ).length / 50) * 100} 
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    Currently on Module {profile.currentModule}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Learning Streak */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Learning Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">
                      {profile.currentStreak}
                    </p>
                    <p className="text-sm text-gray-600">Current Streak (days)</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-800">
                      {profile.longestStreak}
                    </p>
                    <p className="text-sm text-gray-600">Longest Streak (days)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Review Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Recommended Review Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {profile.reviewSuggestions.length === 0 ? (
                  <p className="text-gray-600">No specific review suggestions at this time. Keep up the great work!</p>
                ) : (
                  profile.reviewSuggestions.slice(0, 5).map((suggestion, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{suggestion.grammarTopic}</p>
                        <p className="text-sm text-gray-600">{suggestion.reason}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          suggestion.priority === 'high' ? 'destructive' :
                          suggestion.priority === 'medium' ? 'default' : 'secondary'
                        }>
                          {suggestion.priority}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          ~{suggestion.estimatedTime}min
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Module Progress Tab */}
        <TabsContent value="modules" className="space-y-6">
          <div className="flex gap-2 mb-4">
            <select 
              value={selectedLevel} 
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Levels</option>
              <option value="A1">A1 Beginner</option>
              <option value="A2">A2 Elementary</option>
              <option value="B1">B1 Intermediate</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {moduleStatuses.map((status) => (
              <Card key={status.moduleId} className={
                status.isCompleted ? 'border-green-200 bg-green-50' :
                status.isUnlocked ? 'border-blue-200 bg-blue-50' :
                'border-gray-200 bg-gray-50'
              }>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Module {status.moduleId}</h3>
                    <Badge variant={
                      status.isCompleted ? 'default' :
                      status.isUnlocked ? 'secondary' : 'outline'
                    }>
                      {status.isCompleted ? 'Completed' :
                       status.isUnlocked ? 'Available' : 'Locked'}
                    </Badge>
                  </div>
                  
                  {status.isUnlocked && (
                    <>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{status.questionsCompleted}/{status.totalQuestions}</span>
                        </div>
                        <Progress value={(status.questionsCompleted / status.totalQuestions) * 100} />
                      </div>
                      
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Accuracy:</span>
                          <span className={
                            status.currentAccuracy >= status.requiredAccuracy ? 
                            'text-green-600 font-semibold' : 'text-orange-600'
                          }>
                            {formatAccuracy(status.currentAccuracy)}
                          </span>
                        </div>
                        
                        {status.remainingQuestions > 0 && (
                          <div className="flex justify-between">
                            <span>Est. Time:</span>
                            <span>{status.estimatedTimeToComplete}min</span>
                          </div>
                        )}
                        
                        {status.needsReview && (
                          <div className="mt-2">
                            <Badge variant="outline" className="text-xs">
                              Needs Review
                            </Badge>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Consistency Score</span>
                  <div className="flex items-center">
                    <Progress value={profile.consistencyScore * 100} className="w-20 mr-2" />
                    <span className="text-sm font-medium">
                      {(profile.consistencyScore * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Retry Rate</span>
                  <span className="text-sm font-medium">{formatAccuracy(profile.retryRate)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Avg Response Time</span>
                  <span className="text-sm font-medium">
                    {Math.round(profile.averageResponseTime / 1000)}s
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Improvement Rate</span>
                  <span className="text-sm font-medium">
                    {profile.improvementRate > 0 ? '+' : ''}{profile.improvementRate.toFixed(1)}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  Learning Patterns
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Average Session Length</p>
                  <p className="text-lg font-semibold">
                    {Math.round(profile.averageSessionLength)}min
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-2">Total Study Time</p>
                  <p className="text-lg font-semibold">
                    {formatTime(profile.totalStudyTime)}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-2">Most Active Times</p>
                  <div className="flex gap-1">
                    {profile.preferredStudyTimes.slice(0, 3).map((hour, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {hour}:00
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Error Analysis Tab */}
        <TabsContent value="errors" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Most Common Errors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profile.mostCommonErrors.length === 0 ? (
                    <p className="text-gray-600">No error patterns detected yet.</p>
                  ) : (
                    profile.mostCommonErrors.map((error, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <p className="font-medium capitalize">
                            {error.category.replace('_', ' ')}
                          </p>
                          {error.description && (
                            <p className="text-sm text-gray-600">{error.description}</p>
                          )}
                        </div>
                        <Badge variant="destructive">
                          #{index + 1}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Areas of Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Strong Areas</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.improvedAreas.length === 0 ? (
                        <span className="text-gray-500 text-sm">Keep practicing to see improvements!</span>
                      ) : (
                        profile.improvedAreas.map((area, i) => (
                          <Badge key={i} variant="default" className="bg-green-100 text-green-800">
                            {area}
                          </Badge>
                        ))
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Needs Focus</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.persistentWeaknesses.length === 0 ? (
                        <span className="text-gray-500 text-sm">No persistent weak areas identified.</span>
                      ) : (
                        profile.persistentWeaknesses.map((weakness, i) => (
                          <Badge key={i} variant="destructive" className="bg-orange-100 text-orange-800">
                            {weakness}
                          </Badge>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}