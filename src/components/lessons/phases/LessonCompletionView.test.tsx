import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../../../test/test-utils';
import { LessonCompletionView } from './LessonCompletionView';

// Mock the Confetti component
vi.mock('react-confetti', () => ({
  default: ({ width, height }: { width: number; height: number }) => (
    <div data-testid="confetti" data-width={width} data-height={height}>
      Confetti Animation
    </div>
  ),
}));

// Mock the narration utility
vi.mock('@/utils/narration', () => ({
  narration: {
    cancel: vi.fn(),
    speak: vi.fn(),
    stop: vi.fn(),
  },
}));

describe('LessonCompletionView', () => {
  const mockOnBackToModules = vi.fn();
  
  const defaultProps = {
    selectedModule: 1,
    correctAnswers: 8,
    totalQuestions: 10,
    attempts: 12,
    showConfetti: false,
    width: 800,
    height: 600,
    onBackToModules: mockOnBackToModules,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders completion message with correct module number', () => {
    render(<LessonCompletionView {...defaultProps} />);
    
    expect(screen.getByText('Congratulations!')).toBeInTheDocument();
    expect(screen.getByText('You completed Module 1!')).toBeInTheDocument();
  });

  it('displays correct statistics', () => {
    render(<LessonCompletionView {...defaultProps} />);
    
    expect(screen.getByText('Sentences Completed:')).toBeInTheDocument();
    expect(screen.getByText('8/10')).toBeInTheDocument();
    
    expect(screen.getByText('Success Rate:')).toBeInTheDocument();
    expect(screen.getByText('67%')).toBeInTheDocument(); // 8/12 * 100 = 66.67% rounded to 67%
  });

  it('calculates success rate correctly for perfect score', () => {
    const props = {
      ...defaultProps,
      correctAnswers: 10,
      attempts: 10,
    };
    
    render(<LessonCompletionView {...props} />);
    
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('calculates success rate correctly for low score', () => {
    const props = {
      ...defaultProps,
      correctAnswers: 3,
      attempts: 20,
    };
    
    render(<LessonCompletionView {...props} />);
    
    expect(screen.getByText('15%')).toBeInTheDocument(); // 3/20 * 100 = 15%
  });

  it('shows confetti when showConfetti is true', () => {
    const props = {
      ...defaultProps,
      showConfetti: true,
    };
    
    render(<LessonCompletionView {...props} />);
    
    const confetti = screen.getByTestId('confetti');
    expect(confetti).toBeInTheDocument();
    expect(confetti).toHaveAttribute('data-width', '800');
    expect(confetti).toHaveAttribute('data-height', '600');
  });

  it('does not show confetti when showConfetti is false', () => {
    render(<LessonCompletionView {...defaultProps} />);
    
    expect(screen.queryByTestId('confetti')).not.toBeInTheDocument();
  });

  it('calls onBackToModules and cancels narration when back button is clicked', () => {
    const { narration } = vi.mocked(await import('@/utils/narration'));
    
    render(<LessonCompletionView {...defaultProps} />);
    
    const backButton = screen.getByText('Back to Modules');
    fireEvent.click(backButton);
    
    expect(narration.cancel).toHaveBeenCalledTimes(1);
    expect(mockOnBackToModules).toHaveBeenCalledTimes(1);
  });

  it('displays check circle icon', () => {
    render(<LessonCompletionView {...defaultProps} />);
    
    // The CheckCircle icon is rendered, we can verify the completion structure
    expect(screen.getByText('Congratulations!')).toBeInTheDocument();
    
    // Check for the green success styling
    const successIndicator = document.querySelector('.bg-green-500\\/20');
    expect(successIndicator).toBeInTheDocument();
  });

  it('handles different module numbers correctly', () => {
    const props = {
      ...defaultProps,
      selectedModule: 25,
    };
    
    render(<LessonCompletionView {...props} />);
    
    expect(screen.getByText('You completed Module 25!')).toBeInTheDocument();
  });

  it('handles edge case with zero attempts', () => {
    const props = {
      ...defaultProps,
      correctAnswers: 0,
      attempts: 0,
    };
    
    render(<LessonCompletionView {...props} />);
    
    // Should handle division by zero gracefully
    expect(screen.getByText('0/10')).toBeInTheDocument();
    // Success rate should show NaN or 0% for zero attempts
    const successRate = screen.getByText(/\d+%/);
    expect(successRate).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    const { container } = render(<LessonCompletionView {...defaultProps} />);
    
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass('min-h-screen');
    expect(mainDiv).toHaveClass('relative');
    expect(mainDiv).toHaveClass('overflow-hidden');
  });

  it('renders with proper visual hierarchy', () => {
    render(<LessonCompletionView {...defaultProps} />);
    
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Congratulations!');
    expect(heading).toHaveClass('text-2xl');
    expect(heading).toHaveClass('font-bold');
  });

  it('has accessible button', () => {
    render(<LessonCompletionView {...defaultProps} />);
    
    const button = screen.getByRole('button', { name: 'Back to Modules' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('w-full');
  });

  it('displays statistics in proper format', () => {
    render(<LessonCompletionView {...defaultProps} />);
    
    // Check that statistics are displayed in a structured way
    const statsContainer = document.querySelector('.space-y-3');
    expect(statsContainer).toBeInTheDocument();
    
    // Verify flex layout for statistics
    const statRows = document.querySelectorAll('.flex.justify-between');
    expect(statRows.length).toBeGreaterThanOrEqual(2);
  });

  it('passes correct dimensions to confetti', () => {
    const props = {
      ...defaultProps,
      showConfetti: true,
      width: 1200,
      height: 800,
    };
    
    render(<LessonCompletionView {...props} />);
    
    const confetti = screen.getByTestId('confetti');
    expect(confetti).toHaveAttribute('data-width', '1200');
    expect(confetti).toHaveAttribute('data-height', '800');
  });

  it('handles floating point success rates correctly', () => {
    const props = {
      ...defaultProps,
      correctAnswers: 7,
      attempts: 9,
    };
    
    render(<LessonCompletionView {...props} />);
    
    // 7/9 * 100 = 77.77... should round to 78%
    expect(screen.getByText('78%')).toBeInTheDocument();
  });

  it('maintains responsive design with proper padding and margins', () => {
    render(<LessonCompletionView {...defaultProps} />);
    
    const contentContainer = document.querySelector('.max-w-sm.mx-auto');
    expect(contentContainer).toBeInTheDocument();
    
    const cardContainer = document.querySelector('.bg-gradient-to-b');
    expect(cardContainer).toBeInTheDocument();
  });
});