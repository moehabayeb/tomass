import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../test/test-utils';
import LessonsAppRefactored from './LessonsAppRefactored';

// Mock the sub-views
vi.mock('./lessons/views/LevelsView', () => ({
  LevelsView: ({ onBack, onSelectLevel }: { onBack: () => void; onSelectLevel: (level: string) => void }) => (
    <div data-testid="levels-view">
      <button onClick={onBack}>Back</button>
      <button onClick={() => onSelectLevel('A1')}>Select A1 Level</button>
      Levels View
    </div>
  ),
}));

vi.mock('./lessons/views/ModulesView', () => ({
  ModulesView: ({ selectedLevel, onBack, onSelectModule }: { 
    selectedLevel: string; 
    onBack: () => void; 
    onSelectModule: (moduleId: number) => void;
  }) => (
    <div data-testid="modules-view">
      <span>Level: {selectedLevel}</span>
      <button onClick={onBack}>Back to Levels</button>
      <button onClick={() => onSelectModule(1)}>Select Module 1</button>
      Modules View
    </div>
  ),
}));

vi.mock('./lessons/phases/LessonCompletionView', () => ({
  LessonCompletionView: ({ selectedModule, correctAnswers, totalQuestions, onBackToModules }: {
    selectedModule: number;
    correctAnswers: number;
    totalQuestions: number;
    onBackToModules: () => void;
  }) => (
    <div data-testid="lesson-completion-view">
      <span>Module {selectedModule} Complete: {correctAnswers}/{totalQuestions}</span>
      <button onClick={onBackToModules}>Back to Modules</button>
      Lesson Completion View
    </div>
  ),
}));

vi.mock('./LessonsApp', () => ({
  default: ({ onBack }: { onBack: () => void }) => (
    <div data-testid="legacy-lessons-app">
      <button onClick={onBack}>Back from Legacy</button>
      Legacy Lessons App
    </div>
  ),
}));

vi.mock('./CelebrationOverlay', () => ({
  CelebrationOverlay: () => <div data-testid="celebration-overlay" />,
}));

// Mock custom hooks
vi.mock('../hooks/lessons/useLessonState', () => ({
  useLessonState: vi.fn(() => ({
    viewState: 'levels',
    selectedLevel: '',
    selectedModule: 0,
    currentPhase: 'practice',
    correctAnswers: 0,
    attempts: 0,
    showCelebration: false,
    showConfetti: false,
    setViewState: vi.fn(),
    setSelectedLevel: vi.fn(),
    setSelectedModule: vi.fn(),
    resetLessonState: vi.fn(),
  })),
}));

vi.mock('../hooks/lessons/useProgressManager', () => ({
  useProgressManager: vi.fn(() => ({
    loadModuleProgress: vi.fn(() => ({ completed: false, score: 0 })),
    saveModuleProgress: vi.fn(),
    getProgressSummary: vi.fn(),
  })),
}));

vi.mock('../hooks/lessons/useSpeechRecognition', () => ({
  useSpeechRecognition: vi.fn(() => ({
    isListening: false,
    transcript: '',
    confidence: 0,
    startListening: vi.fn(),
    stopListening: vi.fn(),
  })),
}));

// Mock other hooks
vi.mock('@/hooks/useTextToSpeech', () => ({
  useTextToSpeech: vi.fn(() => ({
    speak: vi.fn(),
    isSpeaking: false,
    soundEnabled: true,
    toggleSound: vi.fn(),
  })),
}));

vi.mock('@/hooks/useGamification', () => ({
  useGamification: vi.fn(() => ({
    earnXP: vi.fn(),
    checkAchievements: vi.fn(),
  })),
}));

vi.mock('@/hooks/useBadgeSystem', () => ({
  useBadgeSystem: vi.fn(() => ({
    awardBadge: vi.fn(),
  })),
}));

vi.mock('@/hooks/useAvatarState', () => ({
  useAvatarState: vi.fn(() => ({
    currentEmotion: 'happy',
    isAnimating: false,
  })),
}));

vi.mock('@react-hook/window-size', () => ({
  useWindowSize: () => [800, 600],
}));

describe('LessonsAppRefactored', () => {
  const mockOnBack = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders levels view by default', () => {
    render(<LessonsAppRefactored onBack={mockOnBack} />);
    
    expect(screen.getByTestId('levels-view')).toBeInTheDocument();
    expect(screen.getByText('Levels View')).toBeInTheDocument();
  });

  it('handles back navigation from levels view', () => {
    render(<LessonsAppRefactored onBack={mockOnBack} />);
    
    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);
    
    expect(mockOnBack).toHaveBeenCalled();
  });

  it('transitions from levels to modules view on level selection', () => {
    const mockUseLessonState = vi.mocked(await import('../hooks/lessons/useLessonState')).useLessonState;
    const mockSetViewState = vi.fn();
    const mockSetSelectedLevel = vi.fn();
    
    // Initially in levels view
    mockUseLessonState.mockReturnValue({
      viewState: 'levels',
      selectedLevel: '',
      selectedModule: 0,
      currentPhase: 'practice',
      correctAnswers: 0,
      attempts: 0,
      showCelebration: false,
      showConfetti: false,
      setViewState: mockSetViewState,
      setSelectedLevel: mockSetSelectedLevel,
      setSelectedModule: vi.fn(),
      resetLessonState: vi.fn(),
    });

    render(<LessonsAppRefactored onBack={mockOnBack} />);
    
    const selectLevelButton = screen.getByText('Select A1 Level');
    fireEvent.click(selectLevelButton);
    
    expect(mockSetSelectedLevel).toHaveBeenCalledWith('A1');
    expect(mockSetViewState).toHaveBeenCalledWith('modules');
  });

  it('shows modules view when viewState is modules', () => {
    const mockUseLessonState = vi.mocked(await import('../hooks/lessons/useLessonState')).useLessonState;
    
    mockUseLessonState.mockReturnValue({
      viewState: 'modules',
      selectedLevel: 'A1',
      selectedModule: 0,
      currentPhase: 'practice',
      correctAnswers: 0,
      attempts: 0,
      showCelebration: false,
      showConfetti: false,
      setViewState: vi.fn(),
      setSelectedLevel: vi.fn(),
      setSelectedModule: vi.fn(),
      resetLessonState: vi.fn(),
    });

    render(<LessonsAppRefactored onBack={mockOnBack} />);
    
    expect(screen.getByTestId('modules-view')).toBeInTheDocument();
    expect(screen.getByText('Level: A1')).toBeInTheDocument();
  });

  it('handles module selection and loads progress', () => {
    const mockUseLessonState = vi.mocked(await import('../hooks/lessons/useLessonState')).useLessonState;
    const mockUseProgressManager = vi.mocked(await import('../hooks/lessons/useProgressManager')).useProgressManager;
    
    const mockSetViewState = vi.fn();
    const mockSetSelectedModule = vi.fn();
    const mockResetLessonState = vi.fn();
    const mockLoadModuleProgress = vi.fn(() => ({ completed: false, score: 85 }));
    
    mockUseLessonState.mockReturnValue({
      viewState: 'modules',
      selectedLevel: 'A1',
      selectedModule: 0,
      currentPhase: 'practice',
      correctAnswers: 0,
      attempts: 0,
      showCelebration: false,
      showConfetti: false,
      setViewState: mockSetViewState,
      setSelectedLevel: vi.fn(),
      setSelectedModule: mockSetSelectedModule,
      resetLessonState: mockResetLessonState,
    });

    mockUseProgressManager.mockReturnValue({
      loadModuleProgress: mockLoadModuleProgress,
      saveModuleProgress: vi.fn(),
      getProgressSummary: vi.fn(),
    });

    render(<LessonsAppRefactored onBack={mockOnBack} />);
    
    const selectModuleButton = screen.getByText('Select Module 1');
    fireEvent.click(selectModuleButton);
    
    expect(mockSetSelectedModule).toHaveBeenCalledWith(1);
    expect(mockSetViewState).toHaveBeenCalledWith('lesson');
    expect(mockResetLessonState).toHaveBeenCalled();
    expect(mockLoadModuleProgress).toHaveBeenCalledWith('A1', 1);
  });

  it('shows lesson completion view when phase is completed', () => {
    const mockUseLessonState = vi.mocked(await import('../hooks/lessons/useLessonState')).useLessonState;
    
    mockUseLessonState.mockReturnValue({
      viewState: 'lesson',
      selectedLevel: 'A1',
      selectedModule: 1,
      currentPhase: 'completed',
      correctAnswers: 8,
      attempts: 10,
      showCelebration: false,
      showConfetti: true,
      setViewState: vi.fn(),
      setSelectedLevel: vi.fn(),
      setSelectedModule: vi.fn(),
      resetLessonState: vi.fn(),
    });

    render(<LessonsAppRefactored onBack={mockOnBack} />);
    
    expect(screen.getByTestId('lesson-completion-view')).toBeInTheDocument();
    expect(screen.getByText('Module 1 Complete: 8/40')).toBeInTheDocument();
  });

  it('delegates to legacy LessonsApp when in lesson view', () => {
    const mockUseLessonState = vi.mocked(await import('../hooks/lessons/useLessonState')).useLessonState;
    
    mockUseLessonState.mockReturnValue({
      viewState: 'lesson',
      selectedLevel: 'A1',
      selectedModule: 1,
      currentPhase: 'practice',
      correctAnswers: 0,
      attempts: 0,
      showCelebration: false,
      showConfetti: false,
      setViewState: vi.fn(),
      setSelectedLevel: vi.fn(),
      setSelectedModule: vi.fn(),
      resetLessonState: vi.fn(),
    });

    render(<LessonsAppRefactored onBack={mockOnBack} />);
    
    expect(screen.getByTestId('legacy-lessons-app')).toBeInTheDocument();
  });

  it('handles back navigation from modules to levels', () => {
    const mockUseLessonState = vi.mocked(await import('../hooks/lessons/useLessonState')).useLessonState;
    const mockSetViewState = vi.fn();
    const mockSetSelectedLevel = vi.fn();
    const mockSetSelectedModule = vi.fn();
    const mockResetLessonState = vi.fn();
    
    mockUseLessonState.mockReturnValue({
      viewState: 'modules',
      selectedLevel: 'A1',
      selectedModule: 0,
      currentPhase: 'practice',
      correctAnswers: 0,
      attempts: 0,
      showCelebration: false,
      showConfetti: false,
      setViewState: mockSetViewState,
      setSelectedLevel: mockSetSelectedLevel,
      setSelectedModule: mockSetSelectedModule,
      resetLessonState: mockResetLessonState,
    });

    render(<LessonsAppRefactored onBack={mockOnBack} />);
    
    const backToLevelsButton = screen.getByText('Back to Levels');
    fireEvent.click(backToLevelsButton);
    
    expect(mockSetViewState).toHaveBeenCalledWith('levels');
    expect(mockSetSelectedLevel).toHaveBeenCalledWith('');
    expect(mockSetSelectedModule).toHaveBeenCalledWith(0);
    expect(mockResetLessonState).toHaveBeenCalled();
  });

  it('handles back navigation from completion to modules', () => {
    const mockUseLessonState = vi.mocked(await import('../hooks/lessons/useLessonState')).useLessonState;
    const mockSetViewState = vi.fn();
    const mockResetLessonState = vi.fn();
    
    mockUseLessonState.mockReturnValue({
      viewState: 'lesson',
      selectedLevel: 'A1',
      selectedModule: 1,
      currentPhase: 'completed',
      correctAnswers: 8,
      attempts: 10,
      showCelebration: false,
      showConfetti: true,
      setViewState: mockSetViewState,
      setSelectedLevel: vi.fn(),
      setSelectedModule: vi.fn(),
      resetLessonState: mockResetLessonState,
    });

    render(<LessonsAppRefactored onBack={mockOnBack} />);
    
    const backToModulesButton = screen.getByText('Back to Modules');
    fireEvent.click(backToModulesButton);
    
    expect(mockSetViewState).toHaveBeenCalledWith('modules');
    expect(mockResetLessonState).toHaveBeenCalled();
  });

  it('initializes all required hooks correctly', () => {
    render(<LessonsAppRefactored onBack={mockOnBack} />);
    
    // Verify all hooks are called
    expect(vi.mocked(await import('../hooks/lessons/useLessonState')).useLessonState).toHaveBeenCalled();
    expect(vi.mocked(await import('../hooks/lessons/useProgressManager')).useProgressManager).toHaveBeenCalled();
    expect(vi.mocked(await import('../hooks/lessons/useSpeechRecognition')).useSpeechRecognition).toHaveBeenCalled();
    expect(vi.mocked(await import('@/hooks/useTextToSpeech')).useTextToSpeech).toHaveBeenCalled();
    expect(vi.mocked(await import('@/hooks/useGamification')).useGamification).toHaveBeenCalled();
    expect(vi.mocked(await import('@/hooks/useBadgeSystem')).useBadgeSystem).toHaveBeenCalled();
    expect(vi.mocked(await import('@/hooks/useAvatarState')).useAvatarState).toHaveBeenCalled();
  });

  it('returns null for invalid view states', () => {
    const mockUseLessonState = vi.mocked(await import('../hooks/lessons/useLessonState')).useLessonState;
    
    mockUseLessonState.mockReturnValue({
      viewState: 'invalid' as any,
      selectedLevel: '',
      selectedModule: 0,
      currentPhase: 'practice',
      correctAnswers: 0,
      attempts: 0,
      showCelebration: false,
      showConfetti: false,
      setViewState: vi.fn(),
      setSelectedLevel: vi.fn(),
      setSelectedModule: vi.fn(),
      resetLessonState: vi.fn(),
    });

    const { container } = render(<LessonsAppRefactored onBack={mockOnBack} />);
    
    expect(container.firstChild).toBeNull();
  });
});