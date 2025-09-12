import { vi } from 'vitest';

// Global test setup for micEngine tests

// Mock requestAnimationFrame and cancelAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => setTimeout(cb, 16) as any);
global.cancelAnimationFrame = vi.fn((id) => clearTimeout(id as any));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock URLSearchParams
global.URLSearchParams = class URLSearchParams {
  private params = new Map();
  
  has(key: string) { return this.params.has(key); }
  get(key: string) { return this.params.get(key); }
  set(key: string, value: string) { this.params.set(key, value); }
} as any;

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    functions: {
      invoke: vi.fn(() => Promise.resolve({
        data: { transcript: 'mock transcription' },
        error: null
      }))
    }
  }
}));