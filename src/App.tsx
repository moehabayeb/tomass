import React, { Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Footer } from "@/components/Footer";
import { initSentry } from "@/lib/sentry";
import { initAmplitude } from "@/lib/amplitude";

// Initialize Sentry for error tracking
initSentry();

// Initialize Amplitude for analytics
initAmplitude();

// Lazy load major components for better bundle splitting
const Index = React.lazy(() => import("./pages/Index"));
const Auth = React.lazy(() => import("./pages/Auth"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Pricing = React.lazy(() => import("./pages/Pricing"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = React.lazy(() => import("./pages/TermsOfService"));
// Admin panel removed for Apple App Store compliance - use web dashboard instead
const TestB2Modules = React.lazy(() => import("./pages/TestB2Modules"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Footer should only appear on static/settings pages, not on interactive app pages
const ConditionalFooter = () => {
  const location = useLocation();

  // Pages where footer SHOULD appear (static/legal/settings pages)
  const footerPages = [
    '/auth',
    '/pricing',
    '/profile',
    '/privacy',
    '/terms',
    '/test-b2',
  ];

  // Check if current path matches any footer page
  const shouldShowFooter = footerPages.some(page => location.pathname.startsWith(page)) ||
                           location.pathname === '/404' ||
                           !['/', '/lessons', '/meetings', '/speaking'].some(p => location.pathname.startsWith(p));

  // Don't show footer on main app pages (/, with tabs for speaking/lessons/meetings)
  if (location.pathname === '/' || location.pathname.startsWith('/?')) {
    return null;
  }

  // Show footer on static pages only
  if (shouldShowFooter) {
    return <Footer />;
  }

  return null;
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <>
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                {/* Admin route removed for Apple compliance - admins use web dashboard */}
                <Route path="/test-b2" element={<TestB2Modules />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <ConditionalFooter />
          </>
          </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
