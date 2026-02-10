import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Confetti from 'react-confetti';
import { narration } from '@/utils/narration';

interface LessonCompletionViewProps {
  selectedModule: number;
  correctAnswers: number;
  totalQuestions: number;
  attempts: number;
  showConfetti: boolean;
  width: number;
  height: number;
  onBackToModules: () => void;
}

export function LessonCompletionView({
  selectedModule,
  correctAnswers,
  totalQuestions,
  attempts,
  showConfetti,
  width,
  height,
  onBackToModules
}: LessonCompletionViewProps) {
  const handleBackToModules = () => {
    narration.cancel();
    onBackToModules();
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'hsl(var(--app-bg))' }}>
      {showConfetti && <Confetti width={width} height={height} />}
      
      <div className="relative z-10 p-4 max-w-sm mx-auto">
        <div className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-6 mt-safe text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-500/20 rounded-full p-4">
              <CheckCircle className="h-12 w-12 text-green-400" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">Congratulations!</h2>
          <p className="text-white/80 mb-4">You completed Module {selectedModule}!</p>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-white/90">
              <span>Sentences Completed:</span>
              <span className="font-semibold">{correctAnswers}/{totalQuestions}</span>
            </div>
            <div className="flex justify-between text-white/90">
              <span>Success Rate:</span>
              <span className="font-semibold">{Math.round((correctAnswers / attempts) * 100)}%</span>
            </div>
          </div>

          <Button 
            onClick={handleBackToModules}
            className="w-full bg-white/20 text-white border-white/30 hover:bg-white/30"
          >
            Back to Modules
          </Button>
        </div>
      </div>
    </div>
  );
}