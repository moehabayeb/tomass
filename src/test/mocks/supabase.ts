import { vi } from 'vitest';

// Mock Supabase client with all commonly used methods
export const mockSupabase = {
  auth: {
    getSession: vi.fn(() => Promise.resolve({ data: { session: null }, error: null })),
    getUser: vi.fn(() => Promise.resolve({ data: { user: null }, error: null })),
    signInWithPassword: vi.fn(() => Promise.resolve({ 
      data: { user: null, session: null }, 
      error: null 
    })),
    signUp: vi.fn(() => Promise.resolve({ 
      data: { user: null, session: null }, 
      error: null 
    })),
    signOut: vi.fn(() => Promise.resolve({ error: null })),
    onAuthStateChange: vi.fn(() => ({
      data: { subscription: { unsubscribe: vi.fn() } },
    })),
  },
  from: vi.fn(() => ({
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    upsert: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    neq: vi.fn().mockReturnThis(),
    gt: vi.fn().mockReturnThis(),
    gte: vi.fn().mockReturnThis(),
    lt: vi.fn().mockReturnThis(),
    lte: vi.fn().mockReturnThis(),
    like: vi.fn().mockReturnThis(),
    ilike: vi.fn().mockReturnThis(),
    is: vi.fn().mockReturnThis(),
    in: vi.fn().mockReturnThis(),
    contains: vi.fn().mockReturnThis(),
    containedBy: vi.fn().mockReturnThis(),
    rangeGt: vi.fn().mockReturnThis(),
    rangeGte: vi.fn().mockReturnThis(),
    rangeLt: vi.fn().mockReturnThis(),
    rangeLte: vi.fn().mockReturnThis(),
    rangeAdjacent: vi.fn().mockReturnThis(),
    overlaps: vi.fn().mockReturnThis(),
    textSearch: vi.fn().mockReturnThis(),
    match: vi.fn().mockReturnThis(),
    not: vi.fn().mockReturnThis(),
    or: vi.fn().mockReturnThis(),
    filter: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    range: vi.fn().mockReturnThis(),
    abortSignal: vi.fn().mockReturnThis(),
    single: vi.fn(() => Promise.resolve({ data: null, error: null })),
    maybeSingle: vi.fn(() => Promise.resolve({ data: null, error: null })),
    csv: vi.fn(() => Promise.resolve({ data: '', error: null })),
    geojson: vi.fn(() => Promise.resolve({ data: null, error: null })),
    explain: vi.fn(() => Promise.resolve({ data: null, error: null })),
    rollback: vi.fn(() => Promise.resolve({ data: null, error: null })),
    returns: vi.fn().mockReturnThis(),
    then: vi.fn((callback) => callback({ data: [], error: null })),
  })),
  functions: {
    invoke: vi.fn(() => Promise.resolve({
      data: { transcript: 'mock transcription', text: 'mock text' },
      error: null,
    })),
  },
  storage: {
    from: vi.fn(() => ({
      upload: vi.fn(() => Promise.resolve({ data: { path: 'mock/path' }, error: null })),
      download: vi.fn(() => Promise.resolve({ data: new Blob(), error: null })),
      remove: vi.fn(() => Promise.resolve({ data: null, error: null })),
      list: vi.fn(() => Promise.resolve({ data: [], error: null })),
      update: vi.fn(() => Promise.resolve({ data: { path: 'mock/path' }, error: null })),
      move: vi.fn(() => Promise.resolve({ data: null, error: null })),
      copy: vi.fn(() => Promise.resolve({ data: null, error: null })),
      createSignedUrl: vi.fn(() => Promise.resolve({ 
        data: { signedUrl: 'https://mock-signed-url.com' }, 
        error: null 
      })),
      createSignedUrls: vi.fn(() => Promise.resolve({ 
        data: [{ signedUrl: 'https://mock-signed-url.com' }], 
        error: null 
      })),
      getPublicUrl: vi.fn(() => ({
        data: { publicUrl: 'https://mock-public-url.com' },
      })),
    })),
  },
  rpc: vi.fn(() => Promise.resolve({ data: null, error: null })),
  removeAllChannels: vi.fn(),
  getChannels: vi.fn(() => []),
};

// Helper function to mock authenticated user
export const mockAuthenticatedUser = {
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

// Helper function to mock authenticated session
export const mockAuthenticatedSession = {
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  expires_in: 3600,
  token_type: 'bearer',
  user: mockAuthenticatedUser,
};

// Mock functions for different auth states
export const mockAuthState = {
  authenticated: () => {
    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: mockAuthenticatedSession },
      error: null,
    });
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockAuthenticatedUser },
      error: null,
    });
  },
  
  unauthenticated: () => {
    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    });
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: null },
      error: null,
    });
  },
  
  error: (errorMessage: string) => {
    const error = new Error(errorMessage);
    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: null },
      error,
    });
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: null },
      error,
    });
  },
};

// Mock database responses
export const mockDatabaseResponses = {
  success: (data: any = []) => {
    mockSupabase.from().then.mockImplementation((callback) => 
      callback({ data, error: null })
    );
    return mockSupabase.from();
  },
  
  error: (errorMessage: string) => {
    const error = new Error(errorMessage);
    mockSupabase.from().then.mockImplementation((callback) => 
      callback({ data: null, error })
    );
    return mockSupabase.from();
  },
  
  single: (data: any = null) => {
    mockSupabase.from().single.mockResolvedValue({ data, error: null });
    return mockSupabase.from();
  },
  
  singleError: (errorMessage: string) => {
    const error = new Error(errorMessage);
    mockSupabase.from().single.mockResolvedValue({ data: null, error });
    return mockSupabase.from();
  },
};

// Mock edge functions
export const mockEdgeFunctions = {
  transcribe: (transcript: string = 'mock transcript') => {
    mockSupabase.functions.invoke.mockImplementation((functionName) => {
      if (functionName === 'transcribe') {
        return Promise.resolve({
          data: { transcript, text: transcript },
          error: null,
        });
      }
      return Promise.resolve({ data: null, error: null });
    });
  },
  
  evaluateSpeaking: (score: number = 4, feedback: string = 'Good job!') => {
    mockSupabase.functions.invoke.mockImplementation((functionName) => {
      if (functionName === 'evaluate-speaking') {
        return Promise.resolve({
          data: { score, feedback, isCorrect: score >= 3 },
          error: null,
        });
      }
      return Promise.resolve({ data: null, error: null });
    });
  },
  
  error: (errorMessage: string) => {
    mockSupabase.functions.invoke.mockRejectedValue(new Error(errorMessage));
  },
};

export default mockSupabase;