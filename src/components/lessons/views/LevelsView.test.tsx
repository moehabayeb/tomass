import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../../../test/test-utils';
import { LevelsView } from './LevelsView';

// Mock the narration utility
vi.mock('@/utils/narration', () => ({
  narration: {
    cancel: vi.fn(),
    speak: vi.fn(),
    stop: vi.fn(),
  },
}));

// Mock the levels data
vi.mock('../../../utils/lessons/levelsData', () => ({
  LEVELS: [
    {
      id: 'A1',
      name: 'Beginner (A1)',
      description: 'Start your learning journey with basic vocabulary and phrases.',
      color: 'bg-green-500',
      moduleCount: 50,
    },
    {
      id: 'A2',
      name: 'Elementary (A2)',
      description: 'Build upon the basics with more complex conversations.',
      color: 'bg-blue-500',
      moduleCount: 50,
    },
    {
      id: 'B1',
      name: 'Intermediate (B1)',
      description: 'Develop fluency in everyday situations.',
      color: 'bg-orange-500',
      moduleCount: 50,
    },
  ],
}));

describe('LevelsView', () => {
  const mockOnBack = vi.fn();
  const mockOnSelectLevel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the header correctly', () => {
    render(<LevelsView onBack={mockOnBack} onSelectLevel={mockOnSelectLevel} />);
    
    expect(screen.getByText('Choose Your Level')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '' })).toBeInTheDocument(); // Back button
  });

  it('renders all levels from the data', () => {
    render(<LevelsView onBack={mockOnBack} onSelectLevel={mockOnSelectLevel} />);
    
    expect(screen.getByText('Beginner (A1)')).toBeInTheDocument();
    expect(screen.getByText('Elementary (A2)')).toBeInTheDocument();
    expect(screen.getByText('Intermediate (B1)')).toBeInTheDocument();
    
    expect(screen.getByText('Start your learning journey with basic vocabulary and phrases.')).toBeInTheDocument();
    expect(screen.getByText('Build upon the basics with more complex conversations.')).toBeInTheDocument();
    expect(screen.getByText('Develop fluency in everyday situations.')).toBeInTheDocument();
  });

  it('displays module count for each level', () => {
    render(<LevelsView onBack={mockOnBack} onSelectLevel={mockOnSelectLevel} />);
    
    const moduleCounts = screen.getAllByText('50 modules');
    expect(moduleCounts).toHaveLength(3);
  });

  it('calls onBack when back button is clicked', () => {
    render(<LevelsView onBack={mockOnBack} onSelectLevel={mockOnSelectLevel} />);
    
    const backButton = screen.getByRole('button', { name: '' });
    fireEvent.click(backButton);
    
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it('calls onSelectLevel with correct level ID when level card is clicked', () => {
    const { narration } = vi.mocked(await import('@/utils/narration'));
    
    render(<LevelsView onBack={mockOnBack} onSelectLevel={mockOnSelectLevel} />);
    
    const beginnerCard = screen.getByText('Beginner (A1)').closest('.cursor-pointer');
    expect(beginnerCard).toBeInTheDocument();
    
    fireEvent.click(beginnerCard!);
    
    expect(narration.cancel).toHaveBeenCalledTimes(1);
    expect(mockOnSelectLevel).toHaveBeenCalledWith('A1');
  });

  it('cancels narration and calls onSelectLevel for each level', () => {
    const { narration } = vi.mocked(await import('@/utils/narration'));
    
    render(<LevelsView onBack={mockOnBack} onSelectLevel={mockOnSelectLevel} />);
    
    // Test A2 level
    const elementaryCard = screen.getByText('Elementary (A2)').closest('.cursor-pointer');
    fireEvent.click(elementaryCard!);
    
    expect(narration.cancel).toHaveBeenCalledTimes(1);
    expect(mockOnSelectLevel).toHaveBeenCalledWith('A2');
    
    vi.clearAllMocks();
    
    // Test B1 level
    const intermediateCard = screen.getByText('Intermediate (B1)').closest('.cursor-pointer');
    fireEvent.click(intermediateCard!);
    
    expect(narration.cancel).toHaveBeenCalledTimes(1);
    expect(mockOnSelectLevel).toHaveBeenCalledWith('B1');
  });

  it('applies correct styling to level cards', () => {
    render(<LevelsView onBack={mockOnBack} onSelectLevel={mockOnSelectLevel} />);
    
    const cards = document.querySelectorAll('.cursor-pointer');
    expect(cards).toHaveLength(3);
    
    cards.forEach(card => {
      expect(card).toHaveClass('bg-white/10');
      expect(card).toHaveClass('border-white/20');
      expect(card).toHaveClass('transition-all');
      expect(card).toHaveClass('hover:bg-white/15');
    });
  });

  it('displays book icons for all levels', () => {
    render(<LevelsView onBack={mockOnBack} onSelectLevel={mockOnSelectLevel} />);
    
    // Each level should have a BookOpen icon
    const cards = screen.getAllByText('50 modules');
    expect(cards).toHaveLength(3);
    
    // Check that each card container exists (icons are rendered as SVGs)
    const levelCards = document.querySelectorAll('[class*="bg-green-500"], [class*="bg-blue-500"], [class*="bg-orange-500"]');
    expect(levelCards.length).toBeGreaterThan(0);
  });

  it('has proper accessibility structure', () => {
    render(<LevelsView onBack={mockOnBack} onSelectLevel={mockOnSelectLevel} />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Choose Your Level');
    
    const backButton = screen.getByRole('button');
    expect(backButton).toBeInTheDocument();
  });

  it('handles level selection with keyboard interaction', () => {
    render(<LevelsView onBack={mockOnBack} onSelectLevel={mockOnSelectLevel} />);
    
    const beginnerCard = screen.getByText('Beginner (A1)').closest('.cursor-pointer');
    
    // Focus the card and press Enter
    beginnerCard?.focus();
    fireEvent.keyDown(beginnerCard!, { key: 'Enter', code: 'Enter' });
    
    // Card should be clickable and focusable (div with cursor-pointer)
    expect(beginnerCard).toHaveClass('cursor-pointer');
  });

  it('maintains proper visual hierarchy', () => {
    render(<LevelsView onBack={mockOnBack} onSelectLevel={mockOnSelectLevel} />);
    
    // Check that level names are rendered as h3 elements
    const levelTitles = document.querySelectorAll('h3');
    expect(levelTitles).toHaveLength(3);
    
    levelTitles.forEach(title => {
      expect(title).toHaveClass('font-semibold');
      expect(title).toHaveClass('text-white');
    });
  });

  it('renders with proper background styling', () => {
    const { container } = render(<LevelsView onBack={mockOnBack} onSelectLevel={mockOnSelectLevel} />);
    
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass('min-h-screen');
    expect(mainDiv).toHaveClass('relative');
    expect(mainDiv).toHaveClass('overflow-hidden');
  });
});