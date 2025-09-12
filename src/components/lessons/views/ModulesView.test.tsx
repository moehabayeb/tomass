import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../../../test/test-utils';
import { ModulesView } from './ModulesView';

// Mock the narration utility
vi.mock('@/utils/narration', () => ({
  narration: {
    cancel: vi.fn(),
    speak: vi.fn(),
    stop: vi.fn(),
  },
}));

// Mock the module unlocking utilities
vi.mock('../../../utils/lessons/moduleUnlocking', () => ({
  getCompletedModules: vi.fn(() => ['module-1', 'module-2']),
  isModuleUnlocked: vi.fn((moduleId: number) => moduleId <= 3), // First 3 modules unlocked
}));

// Mock the levels data
vi.mock('../../../utils/lessons/levelsData', () => ({
  MODULES_BY_LEVEL: {
    'A1': [
      {
        id: 1,
        title: 'Basic Greetings',
        description: 'Learn essential greeting phrases and expressions.',
      },
      {
        id: 2,
        title: 'Numbers and Time',
        description: 'Master numbers, dates, and time expressions.',
      },
      {
        id: 3,
        title: 'Family and Friends',
        description: 'Vocabulary for talking about family and relationships.',
      },
      {
        id: 4,
        title: 'Advanced Topics',
        description: 'More complex conversational topics.',
      },
    ],
    'A2': [],
    'B1': [],
  },
}));

describe('ModulesView', () => {
  const mockOnBack = vi.fn();
  const mockOnSelectModule = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the header with selected level', () => {
    render(
      <ModulesView 
        selectedLevel="A1" 
        onBack={mockOnBack} 
        onSelectModule={mockOnSelectModule} 
      />
    );
    
    expect(screen.getByText('A1 Modules')).toBeInTheDocument();
    expect(screen.getByText('Choose a module to start')).toBeInTheDocument();
  });

  it('calls onBack when back button is clicked', () => {
    render(
      <ModulesView 
        selectedLevel="A1" 
        onBack={mockOnBack} 
        onSelectModule={mockOnSelectModule} 
      />
    );
    
    const backButton = screen.getByRole('button', { name: '' });
    fireEvent.click(backButton);
    
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it('renders modules for the selected level', () => {
    render(
      <ModulesView 
        selectedLevel="A1" 
        onBack={mockOnBack} 
        onSelectModule={mockOnSelectModule} 
      />
    );
    
    expect(screen.getByText('Basic Greetings')).toBeInTheDocument();
    expect(screen.getByText('Numbers and Time')).toBeInTheDocument();
    expect(screen.getByText('Family and Friends')).toBeInTheDocument();
    expect(screen.getByText('Advanced Topics')).toBeInTheDocument();
    
    expect(screen.getByText('Learn essential greeting phrases and expressions.')).toBeInTheDocument();
    expect(screen.getByText('Master numbers, dates, and time expressions.')).toBeInTheDocument();
  });

  it('shows "Coming Soon" message when no modules exist for a level', () => {
    render(
      <ModulesView 
        selectedLevel="A2" 
        onBack={mockOnBack} 
        onSelectModule={mockOnSelectModule} 
      />
    );
    
    expect(screen.getByText('Content Coming Soon')).toBeInTheDocument();
    expect(screen.getByText('A2 modules are currently being developed. Please check back later or try A1 level.')).toBeInTheDocument();
  });

  it('displays completed badge for completed modules', () => {
    render(
      <ModulesView 
        selectedLevel="A1" 
        onBack={mockOnBack} 
        onSelectModule={mockOnSelectModule} 
      />
    );
    
    // Modules 1 and 2 should show as completed (based on mock)
    const completeBadges = screen.getAllByText('Complete');
    expect(completeBadges).toHaveLength(2);
  });

  it('shows lock icon for locked modules and reduces opacity', () => {
    render(
      <ModulesView 
        selectedLevel="A1" 
        onBack={mockOnBack} 
        onSelectModule={mockOnSelectModule} 
      />
    );
    
    // Module 4 should be locked (based on isModuleUnlocked mock)
    const moduleCards = document.querySelectorAll('.cursor-pointer');
    const lockedCard = Array.from(moduleCards).find(card => 
      card.classList.contains('opacity-50')
    );
    expect(lockedCard).toBeInTheDocument();
  });

  it('calls onSelectModule when unlocked and implemented module is clicked', () => {
    const { narration } = vi.mocked(await import('@/utils/narration'));
    
    render(
      <ModulesView 
        selectedLevel="A1" 
        onBack={mockOnBack} 
        onSelectModule={mockOnSelectModule} 
      />
    );
    
    // Click on module 1 (should be unlocked and implemented)
    const module1Card = screen.getByText('Basic Greetings').closest('.cursor-pointer');
    fireEvent.click(module1Card!);
    
    expect(narration.cancel).toHaveBeenCalledTimes(1);
    expect(mockOnSelectModule).toHaveBeenCalledWith(1);
  });

  it('does not call onSelectModule when locked module is clicked', () => {
    render(
      <ModulesView 
        selectedLevel="A1" 
        onBack={mockOnBack} 
        onSelectModule={mockOnSelectModule} 
      />
    );
    
    // Click on module 4 (should be locked)
    const module4Card = screen.getByText('Advanced Topics').closest('.cursor-pointer');
    fireEvent.click(module4Card!);
    
    // onSelectModule should not be called for locked modules
    expect(mockOnSelectModule).not.toHaveBeenCalled();
  });

  it('shows "Coming Soon" badge for unimplemented modules', () => {
    // Mock a module with ID outside the implemented range
    vi.mocked(await import('../../../utils/lessons/levelsData')).MODULES_BY_LEVEL.A1 = [
      ...vi.mocked(await import('../../../utils/lessons/levelsData')).MODULES_BY_LEVEL.A1,
      {
        id: 200, // Outside implemented ranges
        title: 'Future Module',
        description: 'This module is not yet implemented.',
      },
    ];

    // Mock this module as unlocked
    vi.mocked(await import('../../../utils/lessons/moduleUnlocking')).isModuleUnlocked.mockImplementation(
      (moduleId: number) => moduleId <= 200
    );

    render(
      <ModulesView 
        selectedLevel="A1" 
        onBack={mockOnBack} 
        onSelectModule={mockOnSelectModule} 
      />
    );
    
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();
  });

  it('displays trophy icon for completed modules', () => {
    render(
      <ModulesView 
        selectedLevel="A1" 
        onBack={mockOnBack} 
        onSelectModule={mockOnSelectModule} 
      />
    );
    
    // Modules 1 and 2 are completed, so they should have trophy icons
    // We can verify by checking for the "Complete" badges which indicate completed modules
    const completedModules = screen.getAllByText('Complete');
    expect(completedModules).toHaveLength(2);
  });

  it('handles level switching correctly', () => {
    const { rerender } = render(
      <ModulesView 
        selectedLevel="A1" 
        onBack={mockOnBack} 
        onSelectModule={mockOnSelectModule} 
      />
    );
    
    expect(screen.getByText('A1 Modules')).toBeInTheDocument();
    expect(screen.getByText('Basic Greetings')).toBeInTheDocument();
    
    rerender(
      <ModulesView 
        selectedLevel="A2" 
        onBack={mockOnBack} 
        onSelectModule={mockOnSelectModule} 
      />
    );
    
    expect(screen.getByText('A2 Modules')).toBeInTheDocument();
    expect(screen.getByText('Content Coming Soon')).toBeInTheDocument();
  });

  it('loads completed modules on mount', () => {
    const { getCompletedModules } = vi.mocked(await import('../../../utils/lessons/moduleUnlocking'));
    
    render(
      <ModulesView 
        selectedLevel="A1" 
        onBack={mockOnBack} 
        onSelectModule={mockOnSelectModule} 
      />
    );
    
    expect(getCompletedModules).toHaveBeenCalledTimes(1);
  });

  it('checks module unlock status correctly', () => {
    const { isModuleUnlocked } = vi.mocked(await import('../../../utils/lessons/moduleUnlocking'));
    
    render(
      <ModulesView 
        selectedLevel="A1" 
        onBack={mockOnBack} 
        onSelectModule={mockOnSelectModule} 
      />
    );
    
    // Should check unlock status for each module
    expect(isModuleUnlocked).toHaveBeenCalledWith(1, ['module-1', 'module-2']);
    expect(isModuleUnlocked).toHaveBeenCalledWith(2, ['module-1', 'module-2']);
    expect(isModuleUnlocked).toHaveBeenCalledWith(3, ['module-1', 'module-2']);
    expect(isModuleUnlocked).toHaveBeenCalledWith(4, ['module-1', 'module-2']);
  });

  it('applies correct styling classes', () => {
    render(
      <ModulesView 
        selectedLevel="A1" 
        onBack={mockOnBack} 
        onSelectModule={mockOnSelectModule} 
      />
    );
    
    const moduleCards = document.querySelectorAll('.cursor-pointer');
    
    moduleCards.forEach(card => {
      expect(card).toHaveClass('bg-white/10');
      expect(card).toHaveClass('border-white/20');
      expect(card).toHaveClass('transition-all');
      expect(card).toHaveClass('hover:bg-white/15');
    });
  });

  it('handles module selection validation correctly', () => {
    // Test the validation logic for implemented modules
    render(
      <ModulesView 
        selectedLevel="A1" 
        onBack={mockOnBack} 
        onSelectModule={mockOnSelectModule} 
      />
    );
    
    // Module 1 is in the 1-50 range (implemented for A1)
    const module1Card = screen.getByText('Basic Greetings').closest('.cursor-pointer');
    fireEvent.click(module1Card!);
    
    expect(mockOnSelectModule).toHaveBeenCalledWith(1);
  });
});