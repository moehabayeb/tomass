import React, { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { TooltipProvider } from '@/components/ui/tooltip';
import { vi } from 'vitest';

// Custom render function that includes all necessary providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[];
  queryClient?: QueryClient;
}

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
    mutations: {
      retry: false,
    },
  },
  logger: {
    log: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
});

function AllTheProviders({ 
  children, 
  queryClient = createTestQueryClient(),
  initialEntries = ['/']
}: { 
  children: ReactNode;
  queryClient?: QueryClient;
  initialEntries?: string[];
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <BrowserRouter>
            {children}
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const customRender = (
  ui: ReactElement,
  options?: CustomRenderOptions
) => {
  const { queryClient, initialEntries, ...renderOptions } = options || {};

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <AllTheProviders queryClient={queryClient} initialEntries={initialEntries}>
      {children}
    </AllTheProviders>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Mock user for authenticated tests
export const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  user_metadata: {
    full_name: 'Test User',
    avatar_url: 'https://example.com/avatar.jpg',
  },
  app_metadata: {},
  aud: '',
  created_at: '2023-01-01T00:00:00.000Z',
};

// Mock session for authenticated tests
export const mockSession = {
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  expires_in: 3600,
  token_type: 'bearer',
  user: mockUser,
};

// Helper to mock authenticated state
export const mockAuthenticatedState = async () => {
  const mockSupabase = vi.mocked(await import('@/integrations/supabase/client')).supabase;
  mockSupabase.auth.getSession.mockResolvedValue({
    data: { session: mockSession },
    error: null,
  });
  mockSupabase.auth.getUser.mockResolvedValue({
    data: { user: mockUser },
    error: null,
  });
};

// Helper to mock unauthenticated state
export const mockUnauthenticatedState = async () => {
  const mockSupabase = vi.mocked(await import('@/integrations/supabase/client')).supabase;
  mockSupabase.auth.getSession.mockResolvedValue({
    data: { session: null },
    error: null,
  });
  mockSupabase.auth.getUser.mockResolvedValue({
    data: { user: null },
    error: null,
  });
};

// Mock progress data
export const mockProgressData = {
  currentLevel: 1,
  currentModule: 1,
  completedLessons: [],
  totalXP: 100,
  streak: 5,
  badges: [],
  achievements: [],
};

// Mock lesson data
export const mockLessonData = {
  id: 'test-lesson-1',
  title: 'Test Lesson',
  level: 1,
  module: 1,
  type: 'vocabulary',
  content: {
    words: ['hello', 'world'],
    sentences: ['Hello, world!'],
  },
  difficulty: 'beginner',
  estimatedDuration: 10,
};

// Mock game data
export const mockGameData = {
  vocabulary: [
    { word: 'hello', translation: 'hola', difficulty: 1 },
    { word: 'world', translation: 'mundo', difficulty: 1 },
    { word: 'good', translation: 'bueno', difficulty: 1 },
  ],
  questions: [
    {
      id: '1',
      question: 'What is "hello" in Spanish?',
      options: ['hola', 'adios', 'gracias', 'por favor'],
      correct: 0,
    },
  ],
};

// Re-export everything from React Testing Library
export * from '@testing-library/react';
export { customRender as render };
export { createTestQueryClient };