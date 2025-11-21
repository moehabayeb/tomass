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

// 🔧 FIX #17: Simplified footer logic - explicit inclusion list only
// Footer should only appear on static/settings pages, not on interactive app pages
const ConditionalFooter = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Pages where footer SHOULD appear (static/legal/settings pages only)
  // Using explicit inclusion is safer than complex exclusion logic
  const footerPages = [
    '/auth',
    '/pricing',
    '/profile',
    '/privacy',
    '/terms',
    '/test-b2',
  ];

  // Simple check: show footer only on explicitly listed pages
  const shouldShowFooter = footerPages.some(page => pathname.startsWith(page));

  return shouldShowFooter ? <Footer /> : null;
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
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
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
                {/* 🔧 FIX #16: Only expose test route in development */}
                {import.meta.env.DEV && (
                  <Route path="/test-b2" element={<TestB2Modules />} />
                )}
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
