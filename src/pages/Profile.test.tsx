import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../test/test-utils';
import Profile from './Profile';
import { mockAuthenticatedState, mockUnauthenticatedState } from '../test/test-utils';

// Mock the complex components
vi.mock('@/components/AvatarDisplay', () => ({
  AvatarDisplay: ({ userName, level }: { userName: string; level: number }) => (
    <div data-testid="avatar-display">
      Avatar for {userName} - Level {level}
    </div>
  ),
}));

// Mock hooks
vi.mock('@/hooks/useAuthReady', () => ({
  useAuthReady: vi.fn(),
}));

vi.mock('@/hooks/useUserData', () => ({
  useUserData: vi.fn(() => ({
    userProfile: {
      level: 3,
      xp: 750,
      currentStreak: 5,
      bestStreak: 12,
    },
  })),
}));

vi.mock('@/hooks/use-toast', () => ({
  useToast: vi.fn(() => ({
    toast: vi.fn(),
  })),
}));

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: '/profile' }),
}));

describe('Profile', () => {
  const mockUser = {
    id: 'test-user-id',
    email: 'test@example.com',
    user_metadata: {
      full_name: 'Test User',
    },
  };

  const mockProfile = {
    user_id: 'test-user-id',
    full_name: 'Test User',
    avatar_url: 'https://example.com/avatar.jpg',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock Supabase responses
    const mockSupabase = vi.mocked(await import('@/integrations/supabase/client')).supabase;
    mockSupabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(() => Promise.resolve({ data: mockProfile, error: null })),
      then: vi.fn((callback) => callback({ data: [], error: null })),
    } as any);

    // Mock file input
    Object.defineProperty(HTMLInputElement.prototype, 'files', {
      value: null,
      writable: true,
    });
  });

  it('shows loading state initially', () => {
    const { useAuthReady } = vi.mocked(await import('@/hooks/useAuthReady'));
    useAuthReady.mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      session: null,
      signOut: vi.fn(),
    });

    render(<Profile />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('redirects unauthenticated users', () => {
    const mockNavigate = vi.fn();
    vi.mocked(await import('react-router-dom')).useNavigate.mockReturnValue(mockNavigate);
    
    const { useAuthReady } = vi.mocked(await import('@/hooks/useAuthReady'));
    useAuthReady.mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      session: null,
      signOut: vi.fn(),
    });

    render(<Profile />);
    
    // Component should attempt navigation to auth
    expect(mockNavigate).toHaveBeenCalledWith('/auth', {
      state: { returnTo: '/profile' }
    });
  });

  it('renders profile information for authenticated user', async () => {
    const { useAuthReady } = vi.mocked(await import('@/hooks/useAuthReady'));
    useAuthReady.mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      session: null,
      signOut: vi.fn(),
    });

    render(<Profile />);
    
    await waitFor(() => {
      expect(screen.getByText('My Profile')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
      expect(screen.getByTestId('avatar-display')).toBeInTheDocument();
    });
  });

  it('displays user stats correctly', async () => {
    const { useAuthReady } = vi.mocked(await import('@/hooks/useAuthReady'));
    useAuthReady.mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      session: null,
      signOut: vi.fn(),
    });

    render(<Profile />);
    
    await waitFor(() => {
      expect(screen.getByText('Level 3')).toBeInTheDocument();
      expect(screen.getByText('750')).toBeInTheDocument(); // Total XP
      expect(screen.getByText('5 days')).toBeInTheDocument(); // Current streak
      expect(screen.getByText('12 days')).toBeInTheDocument(); // Best streak
    });
  });

  it('handles name editing', async () => {
    const mockToast = vi.fn();
    vi.mocked(await import('@/hooks/use-toast')).useToast.mockReturnValue({ toast: mockToast });
    
    const { useAuthReady } = vi.mocked(await import('@/hooks/useAuthReady'));
    useAuthReady.mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      session: null,
      signOut: vi.fn(),
    });

    // Mock successful update
    const mockSupabase = vi.mocked(await import('@/integrations/supabase/client')).supabase;
    const mockUpdate = vi.fn(() => Promise.resolve({ error: null }));
    mockSupabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      update: mockUpdate,
      eq: vi.fn(() => Promise.resolve({ error: null })),
      single: vi.fn(() => Promise.resolve({ data: mockProfile, error: null })),
    } as any);

    render(<Profile />);
    
    await waitFor(() => {
      const editButton = screen.getByRole('button', { name: /edit/i });
      fireEvent.click(editButton);
    });

    const nameInput = screen.getByPlaceholderText('Enter your name');
    fireEvent.change(nameInput, { target: { value: 'Updated Name' } });
    
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalled();
    });
  });

  it('handles sign out', async () => {
    const mockSignOut = vi.fn(() => Promise.resolve({ error: null }));
    const mockToast = vi.fn();
    const mockNavigate = vi.fn();
    
    vi.mocked(await import('@/hooks/use-toast')).useToast.mockReturnValue({ toast: mockToast });
    vi.mocked(await import('react-router-dom')).useNavigate.mockReturnValue(mockNavigate);
    
    const { useAuthReady } = vi.mocked(await import('@/hooks/useAuthReady'));
    useAuthReady.mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      session: null,
      signOut: mockSignOut,
    });

    render(<Profile />);
    
    await waitFor(() => {
      const signOutButton = screen.getByText('Sign Out');
      fireEvent.click(signOutButton);
    });

    expect(mockSignOut).toHaveBeenCalled();
  });

  it('calculates XP progress correctly', async () => {
    const { useAuthReady } = vi.mocked(await import('@/hooks/useAuthReady'));
    useAuthReady.mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      session: null,
      signOut: vi.fn(),
    });

    render(<Profile />);
    
    await waitFor(() => {
      // Level 3 with 750 XP should show progress: 750 - (2 * 500) = 750 - 1000 = 250 XP toward level 4
      expect(screen.getByText('Progress to Level 4')).toBeInTheDocument();
      expect(screen.getByText('250 / 500 XP')).toBeInTheDocument();
    });
  });

  it('shows appropriate streak message', async () => {
    const { useAuthReady } = vi.mocked(await import('@/hooks/useAuthReady'));
    useAuthReady.mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      session: null,
      signOut: vi.fn(),
    });

    render(<Profile />);
    
    await waitFor(() => {
      // With 5 days streak, should show "Day 5 - Keep going!"
      expect(screen.getByText('🔥 Day 5 - Keep going!')).toBeInTheDocument();
    });
  });

  it('handles avatar upload validation', async () => {
    const mockToast = vi.fn();
    vi.mocked(await import('@/hooks/use-toast')).useToast.mockReturnValue({ toast: mockToast });
    
    const { useAuthReady } = vi.mocked(await import('@/hooks/useAuthReady'));
    useAuthReady.mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      session: null,
      signOut: vi.fn(),
    });

    render(<Profile />);
    
    await waitFor(() => {
      const uploadButton = screen.getByText('Upload');
      expect(uploadButton).toBeInTheDocument();
    });

    // Test file size validation (would need to mock file input properly for full test)
  });

  it('displays no reminders message when no reminders exist', async () => {
    const { useAuthReady } = vi.mocked(await import('@/hooks/useAuthReady'));
    useAuthReady.mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      session: null,
      signOut: vi.fn(),
    });

    // Mock empty reminders response
    const mockSupabase = vi.mocked(await import('@/integrations/supabase/client')).supabase;
    mockSupabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn(() => Promise.resolve({ data: [], error: null })),
      single: vi.fn(() => Promise.resolve({ data: mockProfile, error: null })),
    } as any);

    render(<Profile />);
    
    await waitFor(() => {
      expect(screen.getByText('No upcoming reminders')).toBeInTheDocument();
    });
  });

  it('handles back navigation', async () => {
    const mockNavigate = vi.fn();
    vi.mocked(await import('react-router-dom')).useNavigate.mockReturnValue(mockNavigate);
    
    const { useAuthReady } = vi.mocked(await import('@/hooks/useAuthReady'));
    useAuthReady.mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      session: null,
      signOut: vi.fn(),
    });

    render(<Profile />);
    
    await waitFor(() => {
      const backButton = screen.getByText('Back to Meetings');
      fireEvent.click(backButton);
      expect(mockNavigate).toHaveBeenCalledWith('/?tab=meetings');
    });
  });
});