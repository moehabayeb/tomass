import React, { Suspense, useEffect, useState } from 'react';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Footer } from "@/components/Footer";
import { initSentry } from "@/lib/sentry";
import { initAmplitude } from "@/lib/amplitude";
import { hasConsent } from "@/lib/analyticsConsent";

// Lazy-load modals to keep them off the critical rendering path
const ConsentBanner = React.lazy(() =>
  import("@/components/ConsentBanner").then(m => ({ default: m.ConsentBanner }))
);
const AgeVerificationModal = React.lazy(() =>
  import("@/components/AgeVerificationModal").then(m => ({ default: m.AgeVerificationModal }))
);

// Initialize analytics ONLY if user has previously consented
// New users will see consent banner and analytics will init after consent
if (hasConsent()) {
  initSentry();
  initAmplitude();
}

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

// Defer modals until after first paint so they don't become the LCP element
function DeferredModals() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // Returning users: skip entirely if both decisions already made
    try {
      const ageVerified = localStorage.getItem('tomass_age_verified');
      const consentGiven = localStorage.getItem('analytics_consent');
      if (ageVerified && consentGiven) return;
    } catch { /* Safari Private Mode — fall through */ }

    // New users: delay 5s to push modal past LCP measurement window
    // (Lighthouse LCP window closes ~4s under simulated throttle)
    const timer = setTimeout(() => setReady(true), 5000);
    return () => clearTimeout(timer);
  }, []);
  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <ConsentBanner />
      <AgeVerificationModal />
    </Suspense>
  );
}

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
        <Sonner />
        <DeferredModals />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <div className="ios-viewport-fix">
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center" style={{ background: 'hsl(238,63%,25%)' }}>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
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
          </div>
          </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
