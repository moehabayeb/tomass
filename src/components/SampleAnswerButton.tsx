import { useState } from 'react';
import { Button } from './ui/button';
import { Lightbulb, X } from 'lucide-react';

interface SampleAnswerButtonProps {
  question: string;
  onSpeak: (text: string) => void;
}

export const SampleAnswerButton = ({ question, onSpeak }: SampleAnswerButtonProps) => {
  const [showSamples, setShowSamples] = useState(false);

  const generateSampleAnswers = (question: string): string[] => {
    // Simple sample answers based on common question patterns
    const samples: Record<string, string[]> = {
      'breakfast': [
        "I usually have cereal with milk.",
        "I like to eat toast and eggs."
      ],
      'hobby': [
        "I enjoy reading books in my free time.",
        "I like playing guitar and listening to music."
      ],
      'weekend': [
        "I spent time with my family.",
        "I went shopping and watched a movie."
      ],
      'food': [
        "It was really delicious!",
        "I had pasta with my friends."
      ],
      'routine': [
        "I wake up at 7 AM and go to work.",
        "I have lunch at noon and come home at 6 PM."
      ]
    };

    // Find matching category
    const questionLower = question.toLowerCase();
    for (const [key, answers] of Object.entries(samples)) {
      if (questionLower.includes(key)) {
        return answers;
      }
    }

    // Default samples
    return [
      "That's a good question. Let me think...",
      "I think it's very interesting."
    ];
  };

  const sampleAnswers = generateSampleAnswers(question);

  return (
    <div className="mb-6">
      <Button
        onClick={() => setShowSamples(!showSamples)}
        className="w-full bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 border-0 rounded-full py-3 px-6 font-semibold transition-all duration-300 hover:scale-105"
        style={{ boxShadow: 'var(--shadow-soft)' }}
      >
        {showSamples ? (
          <>
            <X className="w-5 h-5 mr-2" />
            Hide Sample Answers
          </>
        ) : (
          <>
            <Lightbulb className="w-5 h-5 mr-2" />
            💡 See Sample Answers
          </>
        )}
      </Button>
      
      {showSamples && (
        <div className="mt-4 space-y-3 animate-in slide-in-from-top duration-300">
          {sampleAnswers.map((answer, index) => (
            <div 
              key={index}
              className="bg-white/95 backdrop-blur-sm p-4 rounded-xl border border-blue-100"
              style={{ boxShadow: 'var(--shadow-soft)' }}
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">{answer}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSpeak(answer)}
                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full px-3 py-1 transition-all"
                >
                  🔊
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};