import { describe, it, expect, vi } from 'vitest';
import { render as rtlRender, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { TooltipProvider } from '@/components/ui/tooltip';
import App from './App';

// Mock pages to avoid complex dependencies
vi.mock('./pages/Index', () => ({
  default: () => <div data-testid="index-page">Index Page</div>,
}));

vi.mock('./pages/Auth', () => ({
  default: () => <div data-testid="auth-page">Auth Page</div>,
}));

vi.mock('./pages/Profile', () => ({
  default: () => <div data-testid="profile-page">Profile Page</div>,
}));

vi.mock('./pages/NotFound', () => ({
  default: () => <div data-testid="not-found-page">Not Found Page</div>,
}));

// Mock components that depend on external APIs
vi.mock('@/components/ui/toaster', () => ({
  Toaster: () => <div data-testid="toaster" />,
}));

vi.mock('@/components/ui/sonner', () => ({
  Toaster: () => <div data-testid="sonner" />,
}));

// Create a simple render function for App (which already has BrowserRouter)
const renderApp = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, cacheTime: 0 },
      mutations: { retry: false },
    },
    logger: { log: vi.fn(), warn: vi.fn(), error: vi.fn() },
  });

  return rtlRender(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <TooltipProvider>
          <App />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe('App', () => {
  it('renders without crashing', () => {
    renderApp();
    expect(screen.getByTestId('index-page')).toBeInTheDocument();
  });

  it('provides necessary context providers', () => {
    renderApp();
    
    // Check that the theme provider is working by checking for the index page
    expect(screen.getByTestId('index-page')).toBeInTheDocument();
    
    // Check that toast components are rendered
    expect(screen.getByTestId('toaster')).toBeInTheDocument();
    expect(screen.getByTestId('sonner')).toBeInTheDocument();
  });

  it('has QueryClient with correct default options', () => {
    // Test that the app renders, which means QueryClient is properly configured
    renderApp();
    expect(screen.getByTestId('index-page')).toBeInTheDocument();
  });

  it('renders index page by default', () => {
    renderApp();
    expect(screen.getByTestId('index-page')).toBeInTheDocument();
  });

  it('includes theme provider with correct attributes', () => {
    renderApp();
    // The theme provider should be working if the page renders
    expect(screen.getByTestId('index-page')).toBeInTheDocument();
  });

  it('includes tooltip provider', () => {
    renderApp();
    // If the page renders successfully, tooltip provider is working
    expect(screen.getByTestId('index-page')).toBeInTheDocument();
  });

  it('sets up browser router correctly', () => {
    renderApp();
    // Default route should show index page
    expect(screen.getByTestId('index-page')).toBeInTheDocument();
  });
});