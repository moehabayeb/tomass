import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

interface MultipleChoiceCardProps {
  cloze: string;
  options: string[];
  correct: number;
  questionIndex: number;
  onCorrect: () => void;
}

export default function MultipleChoiceCard({
  cloze,
  options,
  correct,
  questionIndex,
  onCorrect
}: MultipleChoiceCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(false);
  }, [questionIndex, cloze]);

  // Cleanup timeout on unmount or question change
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [questionIndex]);

  const handleOptionClick = (optionIndex: number) => {
    if (showFeedback) return; // Prevent clicking after answering

    setSelectedOption(optionIndex);
    const isAnswerCorrect = optionIndex === correct; // Fixed: Use different variable name to avoid shadowing
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);

    if (isAnswerCorrect) {
      // Auto-advance after showing success feedback with proper cleanup
      timeoutRef.current = setTimeout(() => {
        onCorrect();
        timeoutRef.current = null;
      }, 1500);
    }
  };

  const handleSkip = () => {
    onCorrect();
  };

  const getOptionLabel = (index: number) => {
    return String.fromCharCode(65 + index); // A, B, C, D
  };

  const getButtonClass = (optionIndex: number) => {
    const baseClass = "w-full p-4 text-left text-lg font-medium rounded-lg transition-all duration-300 transform";

    if (!showFeedback) {
      return `${baseClass} bg-white/10 hover:bg-white/20 hover:scale-102 text-white border-2 border-white/20`;
    }

    // Show feedback
    if (optionIndex === correct) {
      return `${baseClass} bg-green-500 text-white border-2 border-green-400 scale-105`;
    }

    if (optionIndex === selectedOption && !isCorrect) {
      return `${baseClass} bg-red-500 text-white border-2 border-red-400 animate-shake`;
    }

    return `${baseClass} bg-white/5 text-white/50 border-2 border-white/10`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Question with blank */}
      <Card className="bg-white/10 border-white/20 p-6">
        <p className="text-white/70 text-sm mb-2">Complete the sentence:</p>
        <p className="text-2xl md:text-3xl font-semibold text-white leading-relaxed">
          {cloze}
        </p>
      </Card>

      {/* Options */}
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            disabled={showFeedback}
            className={getButtonClass(index)}
          >
            <div className="flex items-center gap-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 font-bold">
                {getOptionLabel(index)}
              </span>
              <span className="flex-1">{option}</span>
              {showFeedback && index === correct && (
                <CheckCircle className="h-6 w-6 text-white" />
              )}
              {showFeedback && index === selectedOption && !isCorrect && (
                <XCircle className="h-6 w-6 text-white" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Feedback message */}
      {showFeedback && (
        <div className={`text-center p-4 rounded-lg ${isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
          {isCorrect ? (
            <p className="text-green-200 font-semibold">
              ✓ Correct! Moving to speaking practice...
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-red-200 font-semibold">
                ✗ Not quite. The correct answer is: {options[correct]}
              </p>
              <Button
                onClick={handleSkip}
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20"
              >
                Continue to Speaking Practice
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Skip button (before answering) */}
      {!showFeedback && (
        <div className="text-center">
          <Button
            onClick={handleSkip}
            variant="ghost"
            size="sm"
            className="text-white/50 hover:text-white hover:bg-white/10"
          >
            Skip MCQ (Go to Speaking)
          </Button>
        </div>
      )}

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
