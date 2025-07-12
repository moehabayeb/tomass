import { useState } from 'react';
import { Button } from './ui/button';
import { Eye, EyeOff } from 'lucide-react';

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
    <div className="mb-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowSamples(!showSamples)}
        className="bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all"
      >
        {showSamples ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
        {showSamples ? 'Hide' : 'See'} Sample Answers
      </Button>
      
      {showSamples && (
        <div className="mt-3 space-y-2">
          {sampleAnswers.map((answer, index) => (
            <div 
              key={index}
              className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-300"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-700 text-sm">{answer}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSpeak(answer)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  🔊 Hear it
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};