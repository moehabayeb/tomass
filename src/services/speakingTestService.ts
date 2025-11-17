import { supabase } from '@/integrations/supabase/client';

export interface TestPrompt {
  phase: number;
  phase_name: string;
  prompt_type: string;
  title: string;
  instructions: string;
  content?: string;
  image_url?: string;
  audio_url?: string;
  time_limit: number;
  evaluation_criteria: Record<string, string>;
}

export interface TestResult {
  id?: string;
  user_id?: string;
  test_date?: string;
  overall_score: number;
  recommended_level: string;
  pronunciation_score: number;
  grammar_score: number;
  vocabulary_score: number;
  fluency_score: number;
  comprehension_score: number;
  test_duration: number;
  transcript: any[];
  detailed_feedback: Record<string, any>;
  words_per_minute?: number;
  unique_words_count?: number;
  grammar_errors_count?: number;
  pronunciation_issues?: any[];
  test_type?: string;
}

export interface TestHistory {
  results: TestResult[];
  averageScores: {
    overall: number;
    pronunciation: number;
    grammar: number;
    vocabulary: number;
    fluency: number;
    comprehension: number;
  };
  improvement: {
    overall: number;
    pronunciation: number;
    grammar: number;
    vocabulary: number;
    fluency: number;
    comprehension: number;
  };
}

class SpeakingTestService {
  async getTestPrompts(): Promise<TestPrompt[]> {
    try {
      const { data, error } = await supabase.rpc('get_test_prompts');

      if (error) {
        // Apple Store Compliance: Silent operation
        throw new Error('Failed to fetch test prompts');
      }

      return data || [];
    } catch (error) {
      // Apple Store Compliance: Silent operation
      // Return fallback prompts if database fails
      return this.getFallbackPrompts();
    }
  }

  async saveTestResult(result: Omit<TestResult, 'id' | 'user_id' | 'test_date'>): Promise<TestResult> {
    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // 🔧 GUEST USER FALLBACK: Save to localStorage
        const guestResult: TestResult = {
          ...result,
          id: `guest_${Date.now()}`,
          user_id: undefined,
          test_date: new Date().toISOString()
        };

        // Save to localStorage for guest users
        localStorage.setItem('lastTestResult', JSON.stringify(guestResult));
        localStorage.setItem('guestPlacementTest', JSON.stringify(guestResult));

        return guestResult;
      }

      // Authenticated user - save to database
      const { data, error } = await supabase.rpc('save_speaking_test_result', {
        p_overall_score: result.overall_score,
        p_recommended_level: result.recommended_level,
        p_pronunciation_score: result.pronunciation_score,
        p_grammar_score: result.grammar_score,
        p_vocabulary_score: result.vocabulary_score,
        p_fluency_score: result.fluency_score,
        p_comprehension_score: result.comprehension_score,
        p_test_duration: result.test_duration,
        p_transcript: result.transcript,
        p_detailed_feedback: result.detailed_feedback,
        p_words_per_minute: result.words_per_minute || 0,
        p_unique_words_count: result.unique_words_count || 0,
        p_grammar_errors_count: result.grammar_errors_count || 0,
        p_pronunciation_issues: result.pronunciation_issues || [],
        p_test_type: result.test_type || 'full'
      });

      if (error) {
        // Apple Store Compliance: Silent operation
        throw new Error('Failed to save test result');
      }

      return data;
    } catch (error) {
      // Apple Store Compliance: Silent operation
      throw error;
    }
  }

  async getUserTestHistory(limit: number = 10): Promise<TestHistory> {
    try {
      const { data, error } = await supabase.rpc('get_user_test_history', {
        p_limit: limit
      });

      if (error) {
        // Apple Store Compliance: Silent operation
        throw new Error('Failed to fetch test history');
      }

      const results = data || [];
      const averageScores = this.calculateAverageScores(results);
      const improvement = this.calculateImprovement(results);

      return {
        results,
        averageScores,
        improvement
      };
    } catch (error) {
      // Apple Store Compliance: Silent operation
      return {
        results: [],
        averageScores: {
          overall: 0,
          pronunciation: 0,
          grammar: 0,
          vocabulary: 0,
          fluency: 0,
          comprehension: 0
        },
        improvement: {
          overall: 0,
          pronunciation: 0,
          grammar: 0,
          vocabulary: 0,
          fluency: 0,
          comprehension: 0
        }
      };
    }
  }

  async checkVocabularyLevel(words: string[]): Promise<any> {
    try {
      const { data, error } = await supabase.rpc('check_vocabulary_level', {
        p_words: words
      });

      if (error) {
        // Apple Store Compliance: Silent operation
        throw new Error('Failed to check vocabulary level');
      }

      return data;
    } catch (error) {
      // Apple Store Compliance: Silent operation
      // Return fallback analysis
      return {
        total_words: words.length,
        recognized_words: 0,
        level_breakdown: {},
        average_level: 'A1'
      };
    }
  }

  private calculateAverageScores(results: TestResult[]): TestHistory['averageScores'] {
    if (results.length === 0) {
      return {
        overall: 0,
        pronunciation: 0,
        grammar: 0,
        vocabulary: 0,
        fluency: 0,
        comprehension: 0
      };
    }

    const totals = results.reduce(
      (acc, result) => ({
        overall: acc.overall + result.overall_score,
        pronunciation: acc.pronunciation + result.pronunciation_score,
        grammar: acc.grammar + result.grammar_score,
        vocabulary: acc.vocabulary + result.vocabulary_score,
        fluency: acc.fluency + result.fluency_score,
        comprehension: acc.comprehension + result.comprehension_score
      }),
      {
        overall: 0,
        pronunciation: 0,
        grammar: 0,
        vocabulary: 0,
        fluency: 0,
        comprehension: 0
      }
    );

    const count = results.length;

    return {
      overall: Math.round(totals.overall / count),
      pronunciation: Math.round(totals.pronunciation / count),
      grammar: Math.round(totals.grammar / count),
      vocabulary: Math.round(totals.vocabulary / count),
      fluency: Math.round(totals.fluency / count),
      comprehension: Math.round(totals.comprehension / count)
    };
  }

  private calculateImprovement(results: TestResult[]): TestHistory['improvement'] {
    if (results.length < 2) {
      return {
        overall: 0,
        pronunciation: 0,
        grammar: 0,
        vocabulary: 0,
        fluency: 0,
        comprehension: 0
      };
    }

    // Sort by test_date (most recent first)
    const sortedResults = [...results].sort(
      (a, b) => new Date(b.test_date || '').getTime() - new Date(a.test_date || '').getTime()
    );

    const latest = sortedResults[0];
    const previous = sortedResults[1];

    return {
      overall: latest.overall_score - previous.overall_score,
      pronunciation: latest.pronunciation_score - previous.pronunciation_score,
      grammar: latest.grammar_score - previous.grammar_score,
      vocabulary: latest.vocabulary_score - previous.vocabulary_score,
      fluency: latest.fluency_score - previous.fluency_score,
      comprehension: latest.comprehension_score - previous.comprehension_score
    };
  }

  private getFallbackPrompts(): TestPrompt[] {
    return [
      {
        phase: 1,
        phase_name: 'Introduction',
        prompt_type: 'introduction',
        title: 'Personal Introduction',
        instructions: 'Please introduce yourself. Tell me your name, where you are from, and what you like to do in your free time.',
        content: 'This is a warm-up to help you feel comfortable. Speak naturally and don\'t worry about making mistakes.',
        time_limit: 120,
        evaluation_criteria: {
          pronunciation: 'Clear articulation of basic words',
          grammar: 'Simple present tense usage',
          vocabulary: 'Basic personal vocabulary',
          fluency: 'Natural pace without long pauses'
        }
      },
      {
        phase: 2,
        phase_name: 'Description',
        prompt_type: 'description',
        title: 'Describe Your Day',
        instructions: 'Describe what you did yesterday from morning to evening. Include details about activities, people you met, and places you went.',
        content: 'Take your time to think about the sequence of events. Use descriptive language and try to paint a clear picture.',
        time_limit: 180,
        evaluation_criteria: {
          vocabulary: 'Range of descriptive vocabulary',
          grammar: 'Past tense accuracy and time expressions',
          organization: 'Logical flow and sequence',
          fluency: 'Natural storytelling pace'
        }
      },
      {
        phase: 3,
        phase_name: 'Storytelling',
        prompt_type: 'storytelling',
        title: 'Tell a Story',
        instructions: 'Tell me about a memorable experience you had. It could be a trip, celebration, or any interesting event from your life.',
        content: 'Focus on telling a complete story with a beginning, middle, and end. Include details about what happened and how you felt.',
        time_limit: 180,
        evaluation_criteria: {
          grammar: 'Past tense accuracy and narrative structures',
          narrative: 'Story structure and coherence',
          vocabulary: 'Range of descriptive and emotional vocabulary',
          engagement: 'Ability to maintain listener interest'
        }
      },
      {
        phase: 4,
        phase_name: 'Discussion',
        prompt_type: 'discussion',
        title: 'Share Your Opinion',
        instructions: 'Do you think social media has a positive or negative impact on society? Share your opinion and explain your reasons.',
        content: 'This is your chance to express your thoughts and support them with examples or personal experiences.',
        time_limit: 240,
        evaluation_criteria: {
          argumentation: 'Clear position and supporting reasons',
          vocabulary: 'Opinion-expressing language and advanced vocabulary',
          grammar: 'Complex sentence structures and conditionals',
          critical_thinking: 'Depth of analysis and examples'
        }
      },
      {
        phase: 5,
        phase_name: 'Comparison',
        prompt_type: 'comparison',
        title: 'Compare and Contrast',
        instructions: 'Compare living in a big city versus living in a small town. Which lifestyle do you prefer and why? Speak for at least 30 seconds.',
        content: 'Think about differences in lifestyle, opportunities, community, cost of living, and quality of life. Provide clear reasoning for your preference.',
        time_limit: 180,
        evaluation_criteria: {
          analysis: 'Clear comparison of both options with specific differences',
          reasoning: 'Logical explanation of preference with supporting arguments',
          examples: 'Use of concrete examples to illustrate points',
          clarity: 'Well-structured response with clear contrasts'
        }
      }
    ];
  }

  // Helper method to get level recommendations based on scores
  getLevelRecommendation(scores: {
    overall: number;
    pronunciation: number;
    grammar: number;
    vocabulary: number;
    fluency: number;
    comprehension: number;
  }): {
    recommendedLevel: string;
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  } {
    const { overall, pronunciation, grammar, vocabulary, fluency, comprehension } = scores;

    // Determine overall level
    let recommendedLevel: string;
    if (overall >= 85) recommendedLevel = 'C2';
    else if (overall >= 70) recommendedLevel = 'C1';
    else if (overall >= 55) recommendedLevel = 'B2';
    else if (overall >= 40) recommendedLevel = 'B1';
    else if (overall >= 25) recommendedLevel = 'A2';
    else recommendedLevel = 'A1';

    // Identify strengths (scores above 70)
    const strengths: string[] = [];
    if (pronunciation >= 70) strengths.push('Pronunciation');
    if (grammar >= 70) strengths.push('Grammar');
    if (vocabulary >= 70) strengths.push('Vocabulary');
    if (fluency >= 70) strengths.push('Fluency');
    if (comprehension >= 70) strengths.push('Comprehension');

    // Identify weaknesses (scores below 50)
    const weaknesses: string[] = [];
    if (pronunciation < 50) weaknesses.push('Pronunciation');
    if (grammar < 50) weaknesses.push('Grammar');
    if (vocabulary < 50) weaknesses.push('Vocabulary');
    if (fluency < 50) weaknesses.push('Fluency');
    if (comprehension < 50) weaknesses.push('Comprehension');

    // Generate suggestions based on weaknesses
    const suggestions: string[] = [];
    if (pronunciation < 50) {
      suggestions.push('Practice pronunciation with audio exercises and record yourself speaking');
    }
    if (grammar < 50) {
      suggestions.push('Focus on basic grammar rules and sentence structure');
    }
    if (vocabulary < 50) {
      suggestions.push('Build your vocabulary by learning 10 new words daily');
    }
    if (fluency < 50) {
      suggestions.push('Practice speaking regularly to improve fluency and confidence');
    }
    if (comprehension < 50) {
      suggestions.push('Listen to English podcasts and watch English videos with subtitles');
    }

    // Add level-specific suggestions
    if (recommendedLevel === 'A1' || recommendedLevel === 'A2') {
      suggestions.push('Focus on basic conversation skills and everyday vocabulary');
    } else if (recommendedLevel === 'B1' || recommendedLevel === 'B2') {
      suggestions.push('Work on expressing opinions and discussing complex topics');
    } else {
      suggestions.push('Practice advanced vocabulary and sophisticated expressions');
    }

    return {
      recommendedLevel,
      strengths,
      weaknesses,
      suggestions
    };
  }

  // Method to generate a practice test (shorter version)
  async getPracticeTest(): Promise<TestPrompt[]> {
    const fullPrompts = await this.getTestPrompts();

    // Return a subset for practice (phases 1, 2, and 4)
    return fullPrompts.filter(prompt => [1, 2, 4].includes(prompt.phase));
  }
}

export const speakingTestService = new SpeakingTestService();