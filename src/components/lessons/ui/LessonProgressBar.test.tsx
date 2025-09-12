import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import { LessonProgressBar } from './LessonProgressBar';

// Mock the Progress component from shadcn/ui
vi.mock('@/components/ui/progress', () => ({
  Progress: ({ value, className }: { value: number; className?: string }) => (
    <div 
      data-testid="progress-bar" 
      data-value={value}
      className={className}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      Progress: {value}%
    </div>
  ),
}));

describe('LessonProgressBar', () => {
  it('renders progress label and percentage', () => {
    render(<LessonProgressBar progress={75} />);
    
    expect(screen.getByText('Progress')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('displays progress bar with correct value', () => {
    render(<LessonProgressBar progress={42.7} />);
    
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('data-value', '42.7');
    expect(progressBar).toHaveAttribute('aria-valuenow', '42.7');
  });

  it('rounds progress percentage for display', () => {
    render(<LessonProgressBar progress={42.7} />);
    
    // Should display rounded value
    expect(screen.getByText('43%')).toBeInTheDocument();
  });

  it('handles 0% progress', () => {
    render(<LessonProgressBar progress={0} />);
    
    expect(screen.getByText('0%')).toBeInTheDocument();
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toHaveAttribute('data-value', '0');
  });

  it('handles 100% progress', () => {
    render(<LessonProgressBar progress={100} />);
    
    expect(screen.getByText('100%')).toBeInTheDocument();
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toHaveAttribute('data-value', '100');
  });

  it('applies custom className', () => {
    render(<LessonProgressBar progress={50} className="custom-class" />);
    
    const container = screen.getByText('Progress').closest('.space-y-2');
    expect(container).toHaveClass('custom-class');
  });

  it('has proper text styling', () => {
    render(<LessonProgressBar progress={60} />);
    
    const progressText = screen.getByText('Progress').closest('.flex');
    expect(progressText).toHaveClass('justify-between');
    expect(progressText).toHaveClass('text-sm');
    expect(progressText).toHaveClass('text-white/80');
  });

  it('passes correct className to Progress component', () => {
    render(<LessonProgressBar progress={30} />);
    
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toHaveClass('h-2');
  });

  it('handles decimal progress values correctly', () => {
    render(<LessonProgressBar progress={33.33} />);
    
    expect(screen.getByText('33%')).toBeInTheDocument(); // Rounded
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toHaveAttribute('data-value', '33.33'); // Actual value
  });

  it('handles edge case progress values', () => {
    const { rerender } = render(<LessonProgressBar progress={0.1} />);
    expect(screen.getByText('0%')).toBeInTheDocument();

    rerender(<LessonProgressBar progress={99.9} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<LessonProgressBar progress={75} />);
    
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toHaveAttribute('role', 'progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '75');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  it('maintains structure with different progress values', () => {
    const { rerender } = render(<LessonProgressBar progress={25} />);
    
    let container = screen.getByText('Progress').closest('.space-y-2');
    expect(container).toBeInTheDocument();
    
    rerender(<LessonProgressBar progress={75} />);
    
    container = screen.getByText('Progress').closest('.space-y-2');
    expect(container).toBeInTheDocument();
    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
  });
});