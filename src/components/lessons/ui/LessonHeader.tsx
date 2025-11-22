import React from 'react';
import { ArrowLeft, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LessonProgressBar } from './LessonProgressBar';

interface LessonHeaderProps {
  title: string;
  description: string;
  progress: number;
  soundEnabled: boolean;
  onBack: () => void;
  onToggleSound: () => void;
}

export function LessonHeader({
  title,
  description,
  progress,
  soundEnabled,
  onBack,
  onToggleSound
}: LessonHeaderProps) {
  return (
    <div className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-6 mb-6 mt-safe-area-inset-top">
      <div className="flex items-center justify-between mb-4">
        <Button
          onClick={onBack}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 rounded-full"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <div className="text-center">
          <h1 className="text-lg font-bold text-white">{title}</h1>
          <p className="text-sm text-white/70">{description}</p>
        </div>
        
        <Button
          onClick={onToggleSound}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 rounded-full"
          aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
        >
          <Volume2 className={`h-5 w-5 ${!soundEnabled ? 'opacity-50' : ''}`} />
        </Button>
      </div>

      <LessonProgressBar progress={progress} />
    </div>
  );
}