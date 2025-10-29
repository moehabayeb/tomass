// Review Suggestions Component - Smart recommendations based on error patterns
// Analyzes user's grammar mistakes and suggests targeted review lessons

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  AlertCircle, 
  BookOpen, 
  Clock, 
  Target,
  CheckCircle,
  ArrowRight,
  RefreshCw,
  TrendingUp,
  Brain,
  Zap,
  Star
} from 'lucide-react';
import { ProgressTrackerService } from '../services/progressTrackerService';
import { ReviewSuggestion, GrammarError } from '../types/progressTypes';

interface ReviewSuggestionsProps {
  userId?: string;
  onStartReview?: (topic: string) => void;
  maxSuggestions?: number;
  showHeader?: boolean;
}

interface GrammarTopicInfo {
  title: string;
  description: string;
  moduleId?: number;
  estimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  relatedTopics: string[];
}

// Grammar topic information for better UX
const GRAMMAR_TOPICS: Record<string, GrammarTopicInfo> = {
  'verb_tense': {
    title: 'Verb Tenses',
    description: 'Master present, past, and future verb forms',
    moduleId: 1,
    estimatedTime: 15,
    difficulty: 'beginner',
    relatedTopics: ['verb_to_be', 'present_simple', 'past_simple']
  },
  'article': {
    title: 'Articles (a, an, the)',
    description: 'Learn when and how to use articles correctly',
    moduleId: 6,
    estimatedTime: 10,
    difficulty: 'beginner',
    relatedTopics: ['nouns', 'determiners']
  },
  'pronoun': {
    title: 'Personal Pronouns',
    description: 'Subject vs object pronouns (I/me, he/him, etc.)',
    moduleId: 5,
    estimatedTime: 12,
    difficulty: 'beginner',
    relatedTopics: ['possessive_pronouns', 'reflexive_pronouns']
  },
  'word_order': {
    title: 'Sentence Structure',
    description: 'Basic English word order patterns',
    moduleId: 8,
    estimatedTime: 20,
    difficulty: 'intermediate',
    relatedTopics: ['questions', 'negatives', 'adverbs']
  },
  'contraction': {
    title: 'Contractions',
    description: "Shortened forms like I'm, don't, won't",
    moduleId: 4,
    estimatedTime: 8,
    difficulty: 'beginner',
    relatedTopics: ['apostrophes', 'informal_speech']
  },
  'plural_singular': {
    title: 'Plural Forms & Agreement',
    description: 'Singular/plural nouns and verb agreement',
    moduleId: 7,
    estimatedTime: 15,
    difficulty: 'beginner',
    relatedTopics: ['countable_nouns', 'subject_verb_agreement']
  },
  'question_formation': {
    title: 'Question Formation',
    description: 'How to form questions correctly',
    moduleId: 3,
    estimatedTime: 18,
    difficulty: 'intermediate',
    relatedTopics: ['auxiliary_verbs', 'wh_questions', 'yes_no_questions']
  },
  'preposition': {
    title: 'Prepositions',
    description: 'Using in, on, at, by, for, etc.',
    moduleId: 12,
    estimatedTime: 25,
    difficulty: 'intermediate',
    relatedTopics: ['time_expressions', 'place_expressions']
  }
};

export function ReviewSuggestions({ 
  userId = 'guest', 
  onStartReview,
  maxSuggestions = 5,
  showHeader = true 
}: ReviewSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<ReviewSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  const progressTracker = ProgressTrackerService.getInstance();

  useEffect(() => {
    loadSuggestions();
  }, [userId]);

  const loadSuggestions = () => {
    setIsLoading(true);
    try {
      progressTracker.setUserId(userId);
      const reviewSuggestions = progressTracker.getReviewSuggestions();
      setSuggestions(reviewSuggestions.slice(0, maxSuggestions));
    } catch (error) {
      // Apple Store Compliance: Silent operation
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="h-4 w-4" />;
      case 'medium': return <Target className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      default: return 'text-blue-600';
    }
  };

  const getDifficultyBadge = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    const variants = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={variants[difficulty]} variant="secondary">
        {difficulty}
      </Badge>
    );
  };

  const handleStartReview = (suggestion: ReviewSuggestion) => {
    setSelectedSuggestion(suggestion.id);
    if (onStartReview) {
      onStartReview(suggestion.grammarTopic);
    }
  };

  const getTopicInfo = (topicKey: string): GrammarTopicInfo => {
    // Try to find exact match first
    if (GRAMMAR_TOPICS[topicKey]) {
      return GRAMMAR_TOPICS[topicKey];
    }
    
    // Try to find partial match
    const partialMatch = Object.keys(GRAMMAR_TOPICS).find(key => 
      topicKey.toLowerCase().includes(key.toLowerCase()) || 
      key.toLowerCase().includes(topicKey.toLowerCase())
    );
    
    if (partialMatch) {
      return GRAMMAR_TOPICS[partialMatch];
    }
    
    // Return default info
    return {
      title: topicKey.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: 'Review this grammar topic to improve your accuracy',
      estimatedTime: 15,
      difficulty: 'intermediate',
      relatedTopics: []
    };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
        <span className="ml-2">Loading suggestions...</span>
      </div>
    );
  }

  if (suggestions.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Great job! No specific reviews needed
          </h3>
          <p className="text-gray-600">
            You're performing well across all grammar areas. Keep up the excellent work!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {showHeader && (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Smart Review Suggestions</h2>
          </div>
          <Button variant="outline" size="sm" onClick={loadSuggestions}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {suggestions.map((suggestion, index) => {
          const topicInfo = getTopicInfo(suggestion.grammarTopic);
          const isSelected = selectedSuggestion === suggestion.id;
          
          return (
            <Card 
              key={suggestion.id} 
              className={`transition-all duration-200 ${
                isSelected ? 'ring-2 ring-blue-500 shadow-md' : 'hover:shadow-md'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className={`mr-3 ${getPriorityColor(suggestion.priority)}`}>
                        {getPriorityIcon(suggestion.priority)}
                      </div>
                      <h3 className="font-semibold text-gray-900">
                        {topicInfo.title}
                      </h3>
                      <div className="ml-2">
                        {getDifficultyBadge(topicInfo.difficulty)}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">
                      {topicInfo.description}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{suggestion.estimatedTime} minutes</span>
                      <span className="mx-2">•</span>
                      <span>{suggestion.errorCount} recent error{suggestion.errorCount !== 1 ? 's' : ''}</span>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-md mb-3">
                      <p className="text-sm text-gray-700">
                        <strong>Why this review?</strong> {suggestion.reason}
                      </p>
                    </div>
                    
                    {topicInfo.relatedTopics.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">Related topics:</p>
                        <div className="flex flex-wrap gap-1">
                          {topicInfo.relatedTopics.slice(0, 3).map((topic, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {topic.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-4 flex flex-col items-end">
                    <Badge 
                      variant={
                        suggestion.priority === 'high' ? 'destructive' :
                        suggestion.priority === 'medium' ? 'default' : 'secondary'
                      }
                      className="mb-2"
                    >
                      {suggestion.priority} priority
                    </Badge>
                    
                    <Button 
                      onClick={() => handleStartReview(suggestion)}
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={isSelected}
                    >
                      {isSelected ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Started
                        </>
                      ) : (
                        <>
                          Start Review
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                {/* Progress indicator for this topic */}
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Improvement potential</span>
                    <span className="font-medium text-blue-600">
                      {suggestion.priority === 'high' ? 'High' : 
                       suggestion.priority === 'medium' ? 'Medium' : 'Low'}
                    </span>
                  </div>
                  <Progress 
                    value={
                      suggestion.priority === 'high' ? 80 :
                      suggestion.priority === 'medium' ? 60 : 30
                    } 
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {suggestions.length > 0 && showHeader && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start">
              <Zap className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">
                  Pro Tip: Focus on High Priority Items
                </h4>
                <p className="text-sm text-blue-800">
                  Start with high-priority suggestions for the biggest impact on your accuracy. 
                  Completing these reviews can help unlock more modules faster.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Compact version for sidebars or small spaces
export function CompactReviewSuggestions({ 
  userId = 'guest', 
  onStartReview,
  maxSuggestions = 3 
}: ReviewSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<ReviewSuggestion[]>([]);

  const progressTracker = ProgressTrackerService.getInstance();

  useEffect(() => {
    progressTracker.setUserId(userId);
    const reviewSuggestions = progressTracker.getReviewSuggestions();
    setSuggestions(reviewSuggestions.slice(0, maxSuggestions));
  }, [userId, maxSuggestions]);

  if (suggestions.length === 0) {
    return (
      <div className="text-center p-4">
        <Star className="h-8 w-8 text-green-600 mx-auto mb-2" />
        <p className="text-sm text-gray-600">All caught up!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {suggestions.map((suggestion) => {
        const topicInfo = getTopicInfo(suggestion.grammarTopic);
        
        return (
          <Card key={suggestion.id} className="bg-orange-50 border-orange-200">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{topicInfo.title}</p>
                  <p className="text-xs text-gray-600">
                    {suggestion.errorCount} errors • {suggestion.estimatedTime}min
                  </p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onStartReview?.(suggestion.grammarTopic)}
                >
                  Review
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}