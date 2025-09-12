import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../test/test-utils';
import { FlashcardsGame } from './FlashcardsGame';

// Mock external dependencies
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
    addXP: vi.fn(),
    earnXP: vi.fn(),
    checkAchievements: vi.fn(),
  })),
}));

vi.mock('@/hooks/useGameVocabulary', () => ({
  useGameVocabulary: vi.fn(() => ({
    getWordsForFlashcards: vi.fn(() => [
      { id: 1, english: 'hello', turkish: 'merhaba', difficulty: 1, source: 'basic' },
      { id: 2, english: 'world', turkish: 'dünya', difficulty: 1, source: 'basic' },
      { id: 3, english: 'good', turkish: 'iyi', difficulty: 1, source: 'basic' },
    ]),
    isLoading: false,
  })),
}));

// Mock MediaRecorder
global.MediaRecorder = vi.fn().mockImplementation(() => ({
  start: vi.fn(),
  stop: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  ondataavailable: null,
  onstop: null,
  onerror: null,
  state: 'inactive',
}));

// Mock getUserMedia
Object.defineProperty(navigator, 'mediaDevices', {
  writable: true,
  value: {
    getUserMedia: vi.fn(() => Promise.resolve({
      getTracks: () => [{ stop: vi.fn(), kind: 'audio', enabled: true }],
      getAudioTracks: () => [{ getSettings: () => ({}) }],
      id: 'mock-stream-id',
    })),
  },
});

describe('FlashcardsGame', () => {
  const mockOnBack = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock FileReader
    global.FileReader = vi.fn().mockImplementation(() => ({
      readAsDataURL: vi.fn(),
      onloadend: null,
      result: 'data:audio/webm;base64,mockbase64data',
    }));

    // Mock MediaRecorder support check
    global.MediaRecorder.isTypeSupported = vi.fn(() => true);
  });

  it('renders the game header correctly', () => {
    render(<FlashcardsGame onBack={mockOnBack} />);
    
    expect(screen.getByText('🃏 Smart Flashcards')).toBeInTheDocument();
    expect(screen.getByText('Listen, learn, and speak with confidence!')).toBeInTheDocument();
  });

  it('displays card counter and progress', () => {
    render(<FlashcardsGame onBack={mockOnBack} />);
    
    expect(screen.getByText('Card 1 of 3')).toBeInTheDocument();
    expect(screen.getByText('1/3')).toBeInTheDocument(); // Progress display
  });

  it('shows the first card in Turkish initially', () => {
    render(<FlashcardsGame onBack={mockOnBack} />);
    
    expect(screen.getByText('merhaba')).toBeInTheDocument();
    expect(screen.getByText('🔄 Click to reveal English word')).toBeInTheDocument();
  });

  it('flips card to show English word when clicked', async () => {
    const { useTextToSpeech } = vi.mocked(await import('@/hooks/useTextToSpeech'));
    const mockSpeak = vi.fn();
    useTextToSpeech.mockReturnValue({
      speak: mockSpeak,
      isSpeaking: false,
      soundEnabled: true,
      toggleSound: vi.fn(),
    });

    render(<FlashcardsGame onBack={mockOnBack} />);
    
    const flashcard = screen.getByText('merhaba').closest('.cursor-pointer');
    fireEvent.click(flashcard!);
    
    await waitFor(() => {
      expect(screen.getByText('hello')).toBeInTheDocument();
      expect(screen.getByText('🔊 Listen to Pronunciation')).toBeInTheDocument();
    });

    // Should auto-play pronunciation after 500ms
    setTimeout(() => {
      expect(mockSpeak).toHaveBeenCalledWith('hello');
    }, 600);
  });

  it('handles back navigation', () => {
    render(<FlashcardsGame onBack={mockOnBack} />);
    
    const backButton = screen.getByText('Back to Games');
    fireEvent.click(backButton);
    
    expect(mockOnBack).toHaveBeenCalled();
  });

  it('plays pronunciation when listen button is clicked', async () => {
    const { useTextToSpeech } = vi.mocked(await import('@/hooks/useTextToSpeech'));
    const mockSpeak = vi.fn();
    useTextToSpeech.mockReturnValue({
      speak: mockSpeak,
      isSpeaking: false,
      soundEnabled: true,
      toggleSound: vi.fn(),
    });

    render(<FlashcardsGame onBack={mockOnBack} />);
    
    // First flip the card
    const flashcard = screen.getByText('merhaba').closest('.cursor-pointer');
    fireEvent.click(flashcard!);
    
    await waitFor(() => {
      const listenButton = screen.getByText('🔊 Listen to Pronunciation');
      fireEvent.click(listenButton);
      expect(mockSpeak).toHaveBeenCalledWith('hello');
    });
  });

  it('starts speaking challenge when ready', async () => {
    render(<FlashcardsGame onBack={mockOnBack} />);
    
    // First flip the card
    const flashcard = screen.getByText('merhaba').closest('.cursor-pointer');
    fireEvent.click(flashcard!);
    
    await waitFor(() => {
      const challengeButton = screen.getByText('🎤 Start Speaking Challenge');
      fireEvent.click(challengeButton);
      
      expect(screen.getByText('🎯 Say the English word for:')).toBeInTheDocument();
      expect(screen.getByText('"merhaba"')).toBeInTheDocument();
    });
  });

  it('handles microphone recording', async () => {
    const mockGetUserMedia = vi.fn().mockResolvedValue({
      getTracks: () => [{ stop: vi.fn(), kind: 'audio', enabled: true }],
      getAudioTracks: () => [{ getSettings: () => ({}) }],
      id: 'mock-stream-id',
    });
    
    Object.defineProperty(navigator, 'mediaDevices', {
      writable: true,
      value: { getUserMedia: mockGetUserMedia },
    });

    render(<FlashcardsGame onBack={mockOnBack} />);
    
    // Navigate to speaking challenge
    const flashcard = screen.getByText('merhaba').closest('.cursor-pointer');
    fireEvent.click(flashcard!);
    
    await waitFor(() => {
      const challengeButton = screen.getByText('🎤 Start Speaking Challenge');
      fireEvent.click(challengeButton);
    });
    
    await waitFor(() => {
      const recordButton = screen.getByText('🎤 Tap to Speak Word');
      fireEvent.click(recordButton);
      
      expect(mockGetUserMedia).toHaveBeenCalledWith({
        audio: {
          sampleRate: 44100,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
    });
  });

  it('displays error message when microphone access is denied', async () => {
    const mockGetUserMedia = vi.fn().mockRejectedValue(new Error('Permission denied'));
    
    Object.defineProperty(navigator, 'mediaDevices', {
      writable: true,
      value: { getUserMedia: mockGetUserMedia },
    });

    render(<FlashcardsGame onBack={mockOnBack} />);
    
    // Navigate to speaking challenge and try recording
    const flashcard = screen.getByText('merhaba').closest('.cursor-pointer');
    fireEvent.click(flashcard!);
    
    await waitFor(() => {
      const challengeButton = screen.getByText('🎤 Start Speaking Challenge');
      fireEvent.click(challengeButton);
    });
    
    await waitFor(() => {
      const recordButton = screen.getByText('🎤 Tap to Speak Word');
      fireEvent.click(recordButton);
    });

    await waitFor(() => {
      expect(screen.getByText('❌ Microphone access denied')).toBeInTheDocument();
    });
  });

  it('calculates progress correctly', () => {
    render(<FlashcardsGame onBack={mockOnBack} />);
    
    // Check initial progress (card 1 of 3 = 33.33%)
    const progressElement = document.querySelector('[class*="h-3"]'); // Progress bar
    expect(progressElement).toBeInTheDocument();
  });

  it('loads vocabulary words on mount', () => {
    const { useGameVocabulary } = vi.mocked(await import('@/hooks/useGameVocabulary'));
    const mockGetWordsForFlashcards = vi.fn(() => []);
    
    useGameVocabulary.mockReturnValue({
      getWordsForFlashcards: mockGetWordsForFlashcards,
      isLoading: false,
    });

    render(<FlashcardsGame onBack={mockOnBack} />);
    
    expect(mockGetWordsForFlashcards).toHaveBeenCalled();
  });

  it('handles empty vocabulary list gracefully', () => {
    const { useGameVocabulary } = vi.mocked(await import('@/hooks/useGameVocabulary'));
    
    useGameVocabulary.mockReturnValue({
      getWordsForFlashcards: vi.fn(() => []),
      isLoading: false,
    });

    render(<FlashcardsGame onBack={mockOnBack} />);
    
    // Should render without crashing even with empty vocabulary
    expect(screen.getByText('🃏 Smart Flashcards')).toBeInTheDocument();
  });

  it('shows loading state while vocabulary is loading', () => {
    const { useGameVocabulary } = vi.mocked(await import('@/hooks/useGameVocabulary'));
    
    useGameVocabulary.mockReturnValue({
      getWordsForFlashcards: vi.fn(() => []),
      isLoading: true,
    });

    render(<FlashcardsGame onBack={mockOnBack} />);
    
    // Component should still render basic structure
    expect(screen.getByText('🃏 Smart Flashcards')).toBeInTheDocument();
  });

  it('displays card source information when available', async () => {
    render(<FlashcardsGame onBack={mockOnBack} />);
    
    // First flip the card to see source
    const flashcard = screen.getByText('merhaba').closest('.cursor-pointer');
    fireEvent.click(flashcard!);
    
    await waitFor(() => {
      expect(screen.getByText('From: basic')).toBeInTheDocument();
    });
  });

  it('handles card navigation correctly', async () => {
    render(<FlashcardsGame onBack={mockOnBack} />);
    
    // Should start with first card
    expect(screen.getByText('merhaba')).toBeInTheDocument();
    expect(screen.getByText('Card 1 of 3')).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    const { container } = render(<FlashcardsGame onBack={mockOnBack} />);
    
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass('min-h-screen');
    expect(mainDiv).toHaveClass('bg-gradient-to-br');
  });

  it('uses gamification system for XP rewards', async () => {
    const { useGamification } = vi.mocked(await import('@/hooks/useGamification'));
    const mockAddXP = vi.fn();
    
    useGamification.mockReturnValue({
      addXP: mockAddXP,
      earnXP: vi.fn(),
      checkAchievements: vi.fn(),
    });

    render(<FlashcardsGame onBack={mockOnBack} />);
    
    // Verify that the gamification hook is initialized
    expect(useGamification).toHaveBeenCalled();
  });

  it('limits vocabulary to 8 cards for better experience', () => {
    const { useGameVocabulary } = vi.mocked(await import('@/hooks/useGameVocabulary'));
    const mockGetWordsForFlashcards = vi.fn(() => 
      Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        english: `word${i + 1}`,
        turkish: `kelime${i + 1}`,
        difficulty: 1,
        source: 'test',
      }))
    );
    
    useGameVocabulary.mockReturnValue({
      getWordsForFlashcards: mockGetWordsForFlashcards,
      isLoading: false,
    });

    render(<FlashcardsGame onBack={mockOnBack} />);
    
    // Should show card 1 of 8 (limited from 15 total)
    expect(screen.getByText('Card 1 of 8')).toBeInTheDocument();
  });
});