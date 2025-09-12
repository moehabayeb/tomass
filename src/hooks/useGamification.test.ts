import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGamification } from './useGamification';

// Mock dependencies
vi.mock('./useUserData', () => ({
  useUserData: vi.fn(),
}));

vi.mock('@/services/dataService', () => ({
  dataService: {
    updateUserProfile: vi.fn(),
  },
}));

describe('useGamification', () => {
  const mockUserProfile = {
    id: 'test-user',
    level: 1,
    xp: 100,
    streak: 3,
    totalLessons: 5,
  };

  const mockUpdateProfile = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    const { useUserData } = vi.mocked(await import('./useUserData'));
    useUserData.mockReturnValue({
      userProfile: mockUserProfile,
      updateProfile: mockUpdateProfile,
      isLoading: false,
    });
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useGamification());

    expect(result.current.userProfile).toEqual(mockUserProfile);
    expect(result.current.xpBoosts).toEqual([]);
    expect(result.current.showLevelUpPopup).toBe(false);
    expect(result.current.pendingLevelUp).toBe(null);
    expect(typeof result.current.addXP).toBe('function');
    expect(typeof result.current.showLevelUp).toBe('function');
    expect(typeof result.current.closeLevelUpPopup).toBe('function');
    expect(typeof result.current.getXPProgress).toBe('function');
    expect(typeof result.current.earnXP).toBe('function');
    expect(typeof result.current.checkAchievements).toBe('function');
  });

  it('calculates XP progress correctly', () => {
    const { result } = renderHook(() => useGamification());

    const progress = result.current.getXPProgress();
    
    // Level 1 with 100 XP
    // Level 1 base: 0, Level 2 base: 500
    // Current: 100 - 0 = 100
    // Max: 500 - 0 = 500
    // Percentage: 100/500 * 100 = 20%
    expect(progress.current).toBe(100);
    expect(progress.max).toBe(500);
    expect(progress.percentage).toBe(20);
  });

  it('shows level up popup when level changes', () => {
    const { result } = renderHook(() => useGamification());

    act(() => {
      result.current.showLevelUp(2);
    });

    expect(result.current.showLevelUpPopup).toBe(true);
    expect(result.current.pendingLevelUp).toBe(2);
  });

  it('closes level up popup correctly', () => {
    const { result } = renderHook(() => useGamification());

    // First show the popup
    act(() => {
      result.current.showLevelUp(2);
    });

    expect(result.current.showLevelUpPopup).toBe(true);

    // Then close it
    act(() => {
      result.current.closeLevelUpPopup();
    });

    expect(result.current.showLevelUpPopup).toBe(false);
    expect(result.current.pendingLevelUp).toBe(null);
  });

  it('calculates XP for different levels correctly', () => {
    const { result } = renderHook(() => useGamification());

    // Test level progression calculations
    const XP_PER_LEVEL = 500;

    // Level 1: 0 XP base
    expect(result.current.getXPProgress().max).toBe(XP_PER_LEVEL);

    // Test with user at higher level
    const { useUserData } = vi.mocked(await import('./useUserData'));
    useUserData.mockReturnValue({
      userProfile: { ...mockUserProfile, level: 3, xp: 1200 },
      updateProfile: mockUpdateProfile,
      isLoading: false,
    });

    const { result: result2 } = renderHook(() => useGamification());
    const progress2 = result2.current.getXPProgress();

    // Level 3 with 1200 XP
    // Level 3 base: 1000, Level 4 base: 1500
    // Current: 1200 - 1000 = 200
    // Max: 1500 - 1000 = 500
    expect(progress2.current).toBe(200);
    expect(progress2.max).toBe(500);
    expect(progress2.percentage).toBe(40);
  });

  it('handles user with no profile gracefully', () => {
    const { useUserData } = vi.mocked(await import('./useUserData'));
    useUserData.mockReturnValue({
      userProfile: null,
      updateProfile: mockUpdateProfile,
      isLoading: false,
    });

    const { result } = renderHook(() => useGamification());

    expect(result.current.userProfile).toBe(null);
    expect(result.current.xpBoosts).toEqual([]);
    expect(result.current.showLevelUpPopup).toBe(false);
  });

  it('provides all necessary gamification functions', () => {
    const { result } = renderHook(() => useGamification());

    // Check that all expected methods are available
    expect(result.current).toHaveProperty('addXP');
    expect(result.current).toHaveProperty('earnXP');
    expect(result.current).toHaveProperty('checkAchievements');
    expect(result.current).toHaveProperty('showLevelUp');
    expect(result.current).toHaveProperty('closeLevelUpPopup');
    expect(result.current).toHaveProperty('getXPProgress');

    // Check state properties
    expect(result.current).toHaveProperty('userProfile');
    expect(result.current).toHaveProperty('xpBoosts');
    expect(result.current).toHaveProperty('showLevelUpPopup');
    expect(result.current).toHaveProperty('pendingLevelUp');
  });

  it('calculates progress at level boundaries correctly', () => {
    // Test user exactly at level boundary
    const { useUserData } = vi.mocked(await import('./useUserData'));
    useUserData.mockReturnValue({
      userProfile: { ...mockUserProfile, level: 2, xp: 500 }, // Exactly at level 2
      updateProfile: mockUpdateProfile,
      isLoading: false,
    });

    const { result } = renderHook(() => useGamification());
    const progress = result.current.getXPProgress();

    // Level 2 with 500 XP (start of level 2)
    // Level 2 base: 500, Level 3 base: 1000
    // Current: 500 - 500 = 0
    // Max: 1000 - 500 = 500
    expect(progress.current).toBe(0);
    expect(progress.max).toBe(500);
    expect(progress.percentage).toBe(0);
  });

  it('handles edge case of level 1 with 0 XP', () => {
    const { useUserData } = vi.mocked(await import('./useUserData'));
    useUserData.mockReturnValue({
      userProfile: { ...mockUserProfile, level: 1, xp: 0 },
      updateProfile: mockUpdateProfile,
      isLoading: false,
    });

    const { result } = renderHook(() => useGamification());
    const progress = result.current.getXPProgress();

    expect(progress.current).toBe(0);
    expect(progress.max).toBe(500);
    expect(progress.percentage).toBe(0);
  });

  it('maintains consistent level up popup state', () => {
    const { result } = renderHook(() => useGamification());

    // Initially no popup
    expect(result.current.showLevelUpPopup).toBe(false);
    expect(result.current.pendingLevelUp).toBe(null);

    // Show popup for level 2
    act(() => {
      result.current.showLevelUp(2);
    });

    expect(result.current.showLevelUpPopup).toBe(true);
    expect(result.current.pendingLevelUp).toBe(2);

    // Show popup for different level (should update)
    act(() => {
      result.current.showLevelUp(3);
    });

    expect(result.current.showLevelUpPopup).toBe(true);
    expect(result.current.pendingLevelUp).toBe(3);

    // Close popup
    act(() => {
      result.current.closeLevelUpPopup();
    });

    expect(result.current.showLevelUpPopup).toBe(false);
    expect(result.current.pendingLevelUp).toBe(null);
  });

  it('uses consistent XP_PER_LEVEL calculation', () => {
    const { result } = renderHook(() => useGamification());

    // Test that the calculation is consistent
    const progress1 = result.current.getXPProgress();

    // All levels should have the same XP requirement (500)
    expect(progress1.max).toBe(500);

    // Test with higher level user
    const { useUserData } = vi.mocked(await import('./useUserData'));
    useUserData.mockReturnValue({
      userProfile: { ...mockUserProfile, level: 5, xp: 2250 },
      updateProfile: mockUpdateProfile,
      isLoading: false,
    });

    const { result: result2 } = renderHook(() => useGamification());
    const progress2 = result2.current.getXPProgress();

    // Level 5 should also have 500 XP requirement per level
    expect(progress2.max).toBe(500);
  });
});