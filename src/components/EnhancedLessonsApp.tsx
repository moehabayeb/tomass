/**
 * Enhanced LessonsApp wrapper with persistent progress tracking
 *
 * This wrapper adds checkpoint tracking without modifying the core LessonsApp logic
 */

import React, { useEffect, useCallback } from 'react';
import { useLessonProgress } from '../hooks/useLessonProgress';
import { useAuthReady } from '../hooks/useAuthReady';
import LessonsApp from './LessonsApp';

interface EnhancedLessonsAppProps {
  onBack: () => void;
}

// Create a context to share progress functions with the wrapped component
export const LessonProgressContext = React.createContext<{
  saveCheckpoint: (checkpoint: any) => Promise<void>;
  currentProgress: any;
  canResume: boolean;
} | null>(null);

export default function EnhancedLessonsApp({ onBack }: EnhancedLessonsAppProps) {
  const { user } = useAuthReady();
  const progress = useLessonProgress();

  // Create a higher-order component that injects progress tracking
  const LessonsAppWithProgress = useCallback((props: any) => {
    return (
      <LessonProgressContext.Provider value={{
        saveCheckpoint: progress.saveCheckpoint,
        currentProgress: progress.currentProgress,
        canResume: progress.canResume
      }}>
        <LessonsApp {...props} />
      </LessonProgressContext.Provider>
    );
  }, [progress.saveCheckpoint, progress.currentProgress, progress.canResume]);

  return <LessonsAppWithProgress onBack={onBack} />;
}