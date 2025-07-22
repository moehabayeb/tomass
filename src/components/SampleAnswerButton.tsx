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
    <div className="mb-6 sm:mb-8">
      <Button
        onClick={() => setShowSamples(!showSamples)}
        className="pill-button w-full glass-card glass-card-hover text-white font-semibold py-4 px-6 border border-white/30"
      >
        {showSamples ? (
          <>
            <X className="w-5 h-5 mr-2" />
            <span className="drop-shadow-sm">Hide Sample Answers</span>
          </>
        ) : (
          <>
            <Lightbulb className="w-5 h-5 mr-2" />
            <span className="drop-shadow-sm">💡 See Sample Answers</span>
          </>
        )}
      </Button>
      
      {showSamples && (
        <div className="mt-5 space-y-3 animate-in slide-in-from-top duration-300">
          {sampleAnswers.map((answer, index) => (
            <div 
              key={index}
              className="conversation-bubble bg-gradient-to-br from-white/95 to-white/85 text-gray-800 p-4 border-l-4 border-blue-400"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium flex-1">{answer}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSpeak(answer)}
                  className="pill-button text-blue-600 hover:text-blue-800 hover:bg-blue-50/80 px-3 py-2 ml-3 shrink-0"
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