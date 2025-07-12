import { useState } from 'react';
import { Button } from './ui/button';
import { Lightbulb, X } from 'lucide-react';

interface SampleAnswerButtonNewProps {
  sampleAnswers: string[];
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
}

export default function SampleAnswerButtonNew({ sampleAnswers, variant = "default", className = "" }: SampleAnswerButtonNewProps) {
  const [showSamples, setShowSamples] = useState(false);

  return (
    <div className="space-y-3">
      <Button
        variant={variant}
        onClick={() => setShowSamples(!showSamples)}
        className={`flex items-center gap-2 ${className}`}
      >
        {showSamples ? (
          <>
            <X className="w-4 h-4" />
            Hide Samples
          </>
        ) : (
          <>
            <Lightbulb className="w-4 h-4" />
            💡 See Sample Answers
          </>
        )}
      </Button>
      
      {showSamples && (
        <div className="space-y-2 animate-in slide-in-from-top duration-300">
          {sampleAnswers.map((answer, index) => (
            <div 
              key={index}
              className="bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-primary/20 shadow-soft"
            >
              <span className="text-foreground text-sm">{answer}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}