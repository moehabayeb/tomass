import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getCompletedModules, isModuleUnlocked, markModuleCompleted } from './moduleUnlocking';

describe('moduleUnlocking', () => {
  // Mock localStorage
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getCompletedModules', () => {
    it('returns empty array when localStorage is empty', () => {
      localStorageMock.getItem.mockReturnValue(null);
      
      const result = getCompletedModules();
      
      expect(result).toEqual([]);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('completedModules');
    });

    it('returns parsed array from localStorage', () => {
      const completedModules = ['module-1', 'module-2', 'module-5'];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(completedModules));
      
      const result = getCompletedModules();
      
      expect(result).toEqual(completedModules);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('completedModules');
    });

    it('returns empty array when JSON parsing fails', () => {
      localStorageMock.getItem.mockReturnValue('invalid json');
      
      const result = getCompletedModules();
      
      expect(result).toEqual([]);
    });

    it('returns empty array when stored value is not an array', () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify({ notAnArray: true }));
      
      const result = getCompletedModules();
      
      expect(result).toEqual([]);
    });

    it('returns empty array when localStorage throws an error', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('Storage error');
      });
      
      const result = getCompletedModules();
      
      expect(result).toEqual([]);
    });
  });

  describe('isModuleUnlocked', () => {
    it('module 1 is always unlocked', () => {
      const result = isModuleUnlocked(1, []);
      expect(result).toBe(true);
    });

    it('module 51 (first A2) is always unlocked for testing', () => {
      const result = isModuleUnlocked(51, []);
      expect(result).toBe(true);
    });

    it('module 101 (first B1) is always unlocked for testing', () => {
      const result = isModuleUnlocked(101, []);
      expect(result).toBe(true);
    });

    it('module is unlocked if previous module is completed', () => {
      const completedModules = ['module-1', 'module-2'];
      
      expect(isModuleUnlocked(2, completedModules)).toBe(true); // Previous module (1) completed
      expect(isModuleUnlocked(3, completedModules)).toBe(true); // Previous module (2) completed
    });

    it('module is locked if previous module is not completed', () => {
      const completedModules = ['module-1', 'module-3']; // Module 2 not completed
      
      expect(isModuleUnlocked(3, completedModules)).toBe(false); // Previous module (2) not completed
      expect(isModuleUnlocked(5, completedModules)).toBe(false); // Previous module (4) not completed
    });

    it('handles sequential unlocking correctly', () => {
      const completedModules = ['module-1', 'module-2', 'module-3'];
      
      expect(isModuleUnlocked(4, completedModules)).toBe(true); // Can proceed to 4
      expect(isModuleUnlocked(5, completedModules)).toBe(false); // Cannot skip to 5
    });

    it('handles A2 level modules correctly', () => {
      const completedModules = ['module-51', 'module-52'];
      
      expect(isModuleUnlocked(52, completedModules)).toBe(true); // 51 is completed
      expect(isModuleUnlocked(53, completedModules)).toBe(true); // 52 is completed
      expect(isModuleUnlocked(54, completedModules)).toBe(false); // 53 is not completed
    });

    it('handles B1 level modules correctly', () => {
      const completedModules = ['module-101', 'module-102'];
      
      expect(isModuleUnlocked(102, completedModules)).toBe(true); // 101 is completed
      expect(isModuleUnlocked(103, completedModules)).toBe(true); // 102 is completed
      expect(isModuleUnlocked(104, completedModules)).toBe(false); // 103 is not completed
    });

    it('works with large module numbers', () => {
      const completedModules = ['module-99', 'module-149'];
      
      expect(isModuleUnlocked(100, completedModules)).toBe(true); // Previous (99) completed
      expect(isModuleUnlocked(150, completedModules)).toBe(true); // Previous (149) completed
      expect(isModuleUnlocked(200, completedModules)).toBe(false); // Previous (199) not completed
    });
  });

  describe('markModuleCompleted', () => {
    it('adds new module to empty completed list', () => {
      localStorageMock.getItem.mockReturnValue('[]');
      
      markModuleCompleted(5);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'completedModules',
        JSON.stringify(['module-5'])
      );
    });

    it('adds new module to existing completed list', () => {
      const existingModules = ['module-1', 'module-2'];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingModules));
      
      markModuleCompleted(3);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'completedModules',
        JSON.stringify(['module-1', 'module-2', 'module-3'])
      );
    });

    it('does not add duplicate modules', () => {
      const existingModules = ['module-1', 'module-2', 'module-3'];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingModules));
      
      markModuleCompleted(2); // Already completed
      
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });

    it('handles localStorage errors gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('Storage error');
      });
      
      markModuleCompleted(1);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to mark module as completed:',
        expect.any(Error)
      );
      
      consoleSpy.mockRestore();
    });

    it('handles setItem errors gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      localStorageMock.getItem.mockReturnValue('[]');
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage full');
      });
      
      markModuleCompleted(1);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to mark module as completed:',
        expect.any(Error)
      );
      
      consoleSpy.mockRestore();
    });

    it('formats module key correctly', () => {
      localStorageMock.getItem.mockReturnValue('[]');
      
      markModuleCompleted(42);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'completedModules',
        JSON.stringify(['module-42'])
      );
    });

    it('handles corrupted localStorage data', () => {
      localStorageMock.getItem.mockReturnValue('invalid json');
      
      markModuleCompleted(1);
      
      // Should create new array since parsing failed
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'completedModules',
        JSON.stringify(['module-1'])
      );
    });
  });

  describe('integration tests', () => {
    it('markModuleCompleted updates getCompletedModules result', () => {
      localStorageMock.getItem.mockReturnValue('[]');
      
      // Mark module as completed
      markModuleCompleted(1);
      
      // Update mock to return the new value
      localStorageMock.getItem.mockReturnValue(JSON.stringify(['module-1']));
      
      const completed = getCompletedModules();
      expect(completed).toEqual(['module-1']);
      expect(isModuleUnlocked(2, completed)).toBe(true);
    });

    it('handles sequential module completion', () => {
      let storedModules: string[] = [];
      
      localStorageMock.getItem.mockImplementation(() => {
        return JSON.stringify(storedModules);
      });
      
      localStorageMock.setItem.mockImplementation((key, value) => {
        if (key === 'completedModules') {
          storedModules = JSON.parse(value);
        }
      });
      
      // Complete modules sequentially
      markModuleCompleted(1);
      expect(isModuleUnlocked(2, getCompletedModules())).toBe(true);
      expect(isModuleUnlocked(3, getCompletedModules())).toBe(false);
      
      markModuleCompleted(2);
      expect(isModuleUnlocked(3, getCompletedModules())).toBe(true);
      expect(isModuleUnlocked(4, getCompletedModules())).toBe(false);
      
      markModuleCompleted(3);
      expect(isModuleUnlocked(4, getCompletedModules())).toBe(true);
    });

    it('handles different level starting points', () => {
      const completedModules: string[] = [];
      
      // A1 level progression
      expect(isModuleUnlocked(1, completedModules)).toBe(true); // Always unlocked
      
      // A2 level progression  
      expect(isModuleUnlocked(51, completedModules)).toBe(true); // Always unlocked for testing
      
      // B1 level progression
      expect(isModuleUnlocked(101, completedModules)).toBe(true); // Always unlocked for testing
    });
  });

  describe('edge cases', () => {
    it('handles negative module IDs', () => {
      expect(isModuleUnlocked(-1, [])).toBe(false);
      expect(isModuleUnlocked(0, [])).toBe(false);
    });

    it('handles very large module IDs', () => {
      const completedModules = ['module-999'];
      expect(isModuleUnlocked(1000, completedModules)).toBe(true);
      expect(isModuleUnlocked(1001, completedModules)).toBe(false);
    });

    it('handles empty strings in completed modules array', () => {
      const completedModules = ['', 'module-1', ''];
      expect(isModuleUnlocked(2, completedModules)).toBe(true);
    });

    it('handles malformed module keys in completed modules', () => {
      const completedModules = ['not-a-module-key', 'module-1', 'module-abc'];
      expect(isModuleUnlocked(2, completedModules)).toBe(true);
    });
  });
});