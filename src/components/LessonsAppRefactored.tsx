import React, { useState, useEffect } from 'react';
import { useWindowSize } from '@react-hook/window-size';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useGamification } from '@/hooks/useGamification';
import { useBadgeSystem } from '@/hooks/useBadgeSystem';
import { useAvatarState } from '@/hooks/useAvatarState';
import { CelebrationOverlay } from './CelebrationOverlay';

// Import extracted views
import { LevelsView } from './lessons/views/LevelsView';
import { ModulesView } from './lessons/views/ModulesView';
import { LessonCompletionView } from './lessons/phases/LessonCompletionView';

// Import extracted hooks
import { useLessonState } from '../hooks/lessons/useLessonState';
import { useProgressManager } from '../hooks/lessons/useProgressManager';
import { useSpeechRecognition } from '../hooks/lessons/useSpeechRecognition';

// Import data
import { MODULES_BY_LEVEL, LevelType } from '../utils/lessons/levelsData';
import { getCompletedModules, isModuleUnlocked } from '../utils/lessons/moduleUnlocking';

// Import the original components for lesson content
import LessonsApp from './LessonsApp';

interface LessonsAppProps {
  onBack: () => void;
}

export default function LessonsAppRefactored({ onBack }: LessonsAppProps) {
  const [width, height] = useWindowSize();
  
  // Use extracted hooks
  const lessonState = useLessonState();
  const progressManager = useProgressManager();
  const speechRecognition = useSpeechRecognition();
  
  const {
    viewState,
    selectedLevel,
    selectedModule,
    currentPhase,
    correctAnswers,
    attempts,
    showCelebration,
    showConfetti,
    setViewState,
    setSelectedLevel,
    setSelectedModule,
    resetLessonState
  } = lessonState;

  // Additional hooks
  const { speak, isSpeaking, soundEnabled, toggleSound } = useTextToSpeech();
  const { earnXP, checkAchievements } = useGamification();
  const { awardBadge } = useBadgeSystem();
  const avatarState = useAvatarState({
    isListening: false,
    isSpeaking,
    isProcessing: false,
    lastMessageTime: 0
  });

  // Calculate total questions (temporary - should be dynamic based on module)
  const totalQuestions = 40;

  // Handle level selection
  const handleSelectLevel = (levelId: string) => {
    setSelectedLevel(levelId);
    setViewState('modules');
  };

  // Handle module selection
  const handleSelectModule = (moduleId: number) => {
    setSelectedModule(moduleId);
    setViewState('lesson');
    resetLessonState();
    
    // Load progress for the selected module
    const progress = progressManager.loadModuleProgress(selectedLevel, moduleId);
    // Apply loaded progress state here
  };

  // Handle back to modules
  const handleBackToModules = () => {
    setViewState('modules');
    resetLessonState();
  };

  // Handle back to levels
  const handleBackToLevels = () => {
    setViewState('levels');
    setSelectedLevel('');
    setSelectedModule(0);
    resetLessonState();
  };

  // Render appropriate view based on state
  if (viewState === 'levels') {
    return (
      <LevelsView
        onBack={onBack}
        onSelectLevel={handleSelectLevel}
      />
    );
  }

  if (viewState === 'modules') {
    return (
      <ModulesView
        selectedLevel={selectedLevel as LevelType}
        onBack={handleBackToLevels}
        onSelectModule={handleSelectModule}
      />
    );
  }

  // Handle lesson completion
  if (currentPhase === 'completed') {
    return (
      <LessonCompletionView
        selectedModule={selectedModule}
        correctAnswers={correctAnswers}
        totalQuestions={totalQuestions}
        attempts={attempts}
        showConfetti={showConfetti}
        width={width}
        height={height}
        onBackToModules={handleBackToModules}
      />
    );
  }

  // For lesson content, temporarily delegate to the original LessonsApp
  // This will be refactored in future iterations
  if (viewState === 'lesson') {
    return <LessonsApp onBack={onBack} />;
  }

  return null;
}