import { useState, useRef, useEffect, useCallback } from 'react';
import { LessonPhase } from './useProgressManager';

export type ViewState = 'levels' | 'modules' | 'lesson';

export interface LessonStateProps {
  onBack: () => void;
}

export function useLessonState() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [viewState, setViewState] = useState<ViewState>('levels');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedModule, setSelectedModule] = useState<number>(0);
  
  // Lesson state
  const [currentPhase, setCurrentPhase] = useState<LessonPhase>('intro');
  const [isTeacherReading, setIsTeacherReading] = useState(false);
  const [readingComplete, setReadingComplete] = useState(false);
  const [hasBeenRead, setHasBeenRead] = useState<Record<string, boolean>>({});
  const [listeningIndex, setListeningIndex] = useState(0);
  const [speakingIndex, setSpeakingIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | 'info'>('info');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResponseTime, setLastResponseTime] = useState(0);
  
  // Guards for module-scoped timers and safe progression
  const moduleGuardRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const lessonCompletedRef = useRef(false);
  
  // Track the live speaking index (no stale closures)
  const speakingIndexRef = useRef(0);

  // Update speaking index ref when state changes
  useEffect(() => {
    speakingIndexRef.current = speakingIndex;
  }, [speakingIndex]);

  // Hydration effect
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const resetLessonState = useCallback(() => {
    setCurrentPhase('intro');
    setIsTeacherReading(false);
    setReadingComplete(false);
    setListeningIndex(0);
    setSpeakingIndex(0);
    setShowCelebration(false);
    setCorrectAnswers(0);
    setAttempts(0);
    setIsRecording(false);
    setFeedback('');
    setFeedbackType('info');
    setShowConfetti(false);
    setIsProcessing(false);
    setLastResponseTime(0);
    lessonCompletedRef.current = false;
    speakingIndexRef.current = 0;
    
    // Clear any pending timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const setModuleGuard = useCallback((moduleId: number) => {
    moduleGuardRef.current = moduleId;
  }, []);

  const clearModuleGuard = useCallback(() => {
    moduleGuardRef.current = null;
  }, []);

  const isCurrentModule = useCallback((moduleId: number) => {
    return moduleGuardRef.current === moduleId;
  }, []);

  return {
    // State
    isHydrated,
    viewState,
    selectedLevel,
    selectedModule,
    currentPhase,
    isTeacherReading,
    readingComplete,
    hasBeenRead,
    listeningIndex,
    speakingIndex,
    showCelebration,
    correctAnswers,
    attempts,
    isRecording,
    feedback,
    feedbackType,
    showConfetti,
    isProcessing,
    lastResponseTime,
    
    // Refs
    moduleGuardRef,
    timeoutRef,
    lessonCompletedRef,
    speakingIndexRef,
    
    // Setters
    setViewState,
    setSelectedLevel,
    setSelectedModule,
    setCurrentPhase,
    setIsTeacherReading,
    setReadingComplete,
    setHasBeenRead,
    setListeningIndex,
    setSpeakingIndex,
    setShowCelebration,
    setCorrectAnswers,
    setAttempts,
    setIsRecording,
    setFeedback,
    setFeedbackType,
    setShowConfetti,
    setIsProcessing,
    setLastResponseTime,
    
    // Actions
    resetLessonState,
    setModuleGuard,
    clearModuleGuard,
    isCurrentModule
  };
}