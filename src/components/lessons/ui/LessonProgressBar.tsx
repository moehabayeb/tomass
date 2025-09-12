import React from 'react';
import { Progress } from '@/components/ui/progress';

interface LessonProgressBarProps {
  progress: number;
  className?: string;
}

export function LessonProgressBar({ progress, className = '' }: LessonProgressBarProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between text-sm text-white/80">
        <span>Progress</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}