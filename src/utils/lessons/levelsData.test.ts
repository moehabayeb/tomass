import { describe, it, expect } from 'vitest';
import { 
  ORDER_A1, 
  ORDER_A2, 
  ORDER_B1, 
  getOrderForLevel, 
  getNextModuleId,
  LEVELS,
  type LevelType
} from './levelsData';

describe('levelsData', () => {
  describe('module order constants', () => {
    it('defines correct A1 module order', () => {
      expect(ORDER_A1).toEqual([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50]);
      expect(ORDER_A1).toHaveLength(50);
      expect(ORDER_A1[0]).toBe(1);
      expect(ORDER_A1[49]).toBe(50);
    });

    it('defines correct A2 module order', () => {
      expect(ORDER_A2).toEqual([51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100]);
      expect(ORDER_A2).toHaveLength(50);
      expect(ORDER_A2[0]).toBe(51);
      expect(ORDER_A2[49]).toBe(100);
    });

    it('defines correct B1 module order', () => {
      expect(ORDER_B1).toEqual([101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140]);
      expect(ORDER_B1).toHaveLength(40);
      expect(ORDER_B1[0]).toBe(101);
      expect(ORDER_B1[39]).toBe(140);
    });
  });

  describe('getOrderForLevel', () => {
    it('returns correct order for A1 level', () => {
      const order = getOrderForLevel('A1');
      expect(order).toEqual(ORDER_A1);
      expect(order).toHaveLength(50);
    });

    it('returns correct order for A2 level', () => {
      const order = getOrderForLevel('A2');
      expect(order).toEqual(ORDER_A2);
      expect(order).toHaveLength(50);
    });

    it('returns correct order for B1 level', () => {
      const order = getOrderForLevel('B1');
      expect(order).toEqual(ORDER_B1);
      expect(order).toHaveLength(40);
    });

    it('returns empty array for unimplemented levels', () => {
      expect(getOrderForLevel('B2')).toEqual([]);
      expect(getOrderForLevel('C1')).toEqual([]);
      expect(getOrderForLevel('C2')).toEqual([]);
    });
  });

  describe('getNextModuleId', () => {
    it('returns next module ID for A1 level', () => {
      expect(getNextModuleId('A1', 1)).toBe(2);
      expect(getNextModuleId('A1', 10)).toBe(11);
      expect(getNextModuleId('A1', 49)).toBe(50);
    });

    it('returns null for last module in A1', () => {
      expect(getNextModuleId('A1', 50)).toBe(null);
    });

    it('returns next module ID for A2 level', () => {
      expect(getNextModuleId('A2', 51)).toBe(52);
      expect(getNextModuleId('A2', 75)).toBe(76);
      expect(getNextModuleId('A2', 99)).toBe(100);
    });

    it('returns null for last module in A2', () => {
      expect(getNextModuleId('A2', 100)).toBe(null);
    });

    it('returns next module ID for B1 level', () => {
      expect(getNextModuleId('B1', 101)).toBe(102);
      expect(getNextModuleId('B1', 120)).toBe(121);
      expect(getNextModuleId('B1', 139)).toBe(140);
    });

    it('returns null for last module in B1', () => {
      expect(getNextModuleId('B1', 140)).toBe(null);
    });

    it('returns null for module not in level order', () => {
      expect(getNextModuleId('A1', 51)).toBe(null); // A2 module in A1
      expect(getNextModuleId('A2', 1)).toBe(null);  // A1 module in A2
      expect(getNextModuleId('A1', 999)).toBe(null); // Non-existent module
    });

    it('returns null for unimplemented levels', () => {
      expect(getNextModuleId('B2', 1)).toBe(null);
      expect(getNextModuleId('C1', 1)).toBe(null);
      expect(getNextModuleId('C2', 1)).toBe(null);
    });
  });

  describe('LEVELS constant', () => {
    it('defines all 6 levels', () => {
      expect(LEVELS).toHaveLength(6);
      
      const levelIds = LEVELS.map(level => level.id);
      expect(levelIds).toEqual(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']);
    });

    it('has correct A1 level definition', () => {
      const a1Level = LEVELS.find(level => level.id === 'A1');
      expect(a1Level).toEqual({
        id: 'A1',
        name: 'A1 - Beginner',
        description: 'Start your English journey',
        moduleCount: 50,
        color: 'bg-blue-500'
      });
    });

    it('has correct A2 level definition', () => {
      const a2Level = LEVELS.find(level => level.id === 'A2');
      expect(a2Level).toEqual({
        id: 'A2',
        name: 'A2 - Elementary',
        description: 'Build basic skills',
        moduleCount: 50,
        color: 'bg-green-500'
      });
    });

    it('has correct B1 level definition', () => {
      const b1Level = LEVELS.find(level => level.id === 'B1');
      expect(b1Level).toEqual({
        id: 'B1',
        name: 'B1 - Intermediate',
        description: 'Expand your knowledge',
        moduleCount: 50,
        color: 'bg-orange-500'
      });
    });

    it('has correct B2 level definition', () => {
      const b2Level = LEVELS.find(level => level.id === 'B2');
      expect(b2Level).toEqual({
        id: 'B2',
        name: 'B2 - Upper Intermediate',
        description: 'Advanced concepts',
        moduleCount: 50,
        color: 'bg-purple-500'
      });
    });

    it('has correct C1 level definition', () => {
      const c1Level = LEVELS.find(level => level.id === 'C1');
      expect(c1Level).toEqual({
        id: 'C1',
        name: 'C1 - Advanced',
        description: 'Master complex concepts',
        moduleCount: 50,
        color: 'bg-red-500'
      });
    });

    it('has correct C2 level definition', () => {
      const c2Level = LEVELS.find(level => level.id === 'C2');
      expect(c2Level).toEqual({
        id: 'C2',
        name: 'C2 - Proficiency',
        description: 'Near-native fluency',
        moduleCount: 50,
        color: 'bg-indigo-500'
      });
    });

    it('all levels have required properties', () => {
      LEVELS.forEach(level => {
        expect(level).toHaveProperty('id');
        expect(level).toHaveProperty('name');
        expect(level).toHaveProperty('description');
        expect(level).toHaveProperty('moduleCount');
        expect(level).toHaveProperty('color');
        
        expect(typeof level.id).toBe('string');
        expect(typeof level.name).toBe('string');
        expect(typeof level.description).toBe('string');
        expect(typeof level.moduleCount).toBe('number');
        expect(typeof level.color).toBe('string');
        
        expect(level.moduleCount).toBeGreaterThan(0);
        expect(level.color).toMatch(/^bg-\w+-\d{3}$/);
      });
    });

    it('each level has a unique ID', () => {
      const ids = LEVELS.map(level => level.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(LEVELS.length);
    });

    it('each level has a unique color', () => {
      const colors = LEVELS.map(level => level.color);
      const uniqueColors = new Set(colors);
      expect(uniqueColors.size).toBe(LEVELS.length);
    });

    it('levels are ordered by difficulty', () => {
      const expectedOrder: LevelType[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
      const actualOrder = LEVELS.map(level => level.id);
      expect(actualOrder).toEqual(expectedOrder);
    });
  });

  describe('type safety', () => {
    it('LevelType includes all expected levels', () => {
      // This is tested implicitly by the function usage above
      const levelTypes: LevelType[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
      levelTypes.forEach(level => {
        expect(() => getOrderForLevel(level)).not.toThrow();
      });
    });
  });

  describe('module continuity', () => {
    it('A1 modules are sequential from 1 to 50', () => {
      for (let i = 0; i < ORDER_A1.length - 1; i++) {
        expect(ORDER_A1[i + 1]).toBe(ORDER_A1[i] + 1);
      }
    });

    it('A2 modules are sequential from 51 to 100', () => {
      for (let i = 0; i < ORDER_A2.length - 1; i++) {
        expect(ORDER_A2[i + 1]).toBe(ORDER_A2[i] + 1);
      }
    });

    it('B1 modules are sequential from 101 to 140', () => {
      for (let i = 0; i < ORDER_B1.length - 1; i++) {
        expect(ORDER_B1[i + 1]).toBe(ORDER_B1[i] + 1);
      }
    });

    it('levels have non-overlapping module ranges', () => {
      const allA1 = new Set(ORDER_A1);
      const allA2 = new Set(ORDER_A2);
      const allB1 = new Set(ORDER_B1);

      // No overlap between A1 and A2
      ORDER_A1.forEach(id => {
        expect(allA2.has(id)).toBe(false);
      });

      // No overlap between A1 and B1
      ORDER_A1.forEach(id => {
        expect(allB1.has(id)).toBe(false);
      });

      // No overlap between A2 and B1
      ORDER_A2.forEach(id => {
        expect(allB1.has(id)).toBe(false);
      });
    });
  });
});