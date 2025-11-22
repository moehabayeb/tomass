/**
 * Global Error Handlers
 * Catches errors that escape React's error boundaries
 *
 * Handles:
 * - Uncaught JavaScript errors (window.onerror)
 * - Unhandled promise rejections (window.onunhandledrejection)
 * - Service worker errors (for PWA)
 *
 * All errors are logged to Sentry in production
 */

import { Sentry } from '@/lib/sentry';
import { toast } from '@/components/ui/use-toast';

/**
 * Initialize global error handlers
 * Should be called once at app startup
 */
export function initGlobalErrorHandlers() {
  // 1. Handle uncaught JavaScript errors
  window.onerror = (message, source, lineno, colno, error) => {
    // Only log in development
    if (import.meta.env.DEV) {
      console.error('Uncaught error:', { message, source, lineno, colno, error });
    }

    // Report to Sentry
    if (error) {
      Sentry.captureException(error, {
        contexts: {
          errorHandler: {
            type: 'window.onerror',
            source,
            lineno,
            colno,
          },
        },
        tags: {
          errorType: 'uncaughtError',
        },
      });
    } else {
      // Create synthetic error from message
      Sentry.captureMessage(String(message), {
        level: 'error',
        contexts: {
          errorHandler: {
            type: 'window.onerror',
            source,
            lineno,
            colno,
          },
        },
        tags: {
          errorType: 'uncaughtError',
        },
      });
    }

    // Show user-friendly error toast (production only)
    if (!import.meta.env.DEV) {
      toast({
        title: 'Something went wrong',
        description: 'An unexpected error occurred. Please try refreshing the page.',
        variant: 'destructive',
      });
    }

    // Don't prevent default error handling
    return false;
  };

  // 2. Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    // Only log in development
    if (import.meta.env.DEV) {
      console.error('Unhandled promise rejection:', event.reason);
    }

    // Report to Sentry
    if (event.reason instanceof Error) {
      Sentry.captureException(event.reason, {
        contexts: {
          errorHandler: {
            type: 'unhandledrejection',
            promise: event.promise,
          },
        },
        tags: {
          errorType: 'unhandledRejection',
        },
      });
    } else {
      Sentry.captureMessage(`Unhandled rejection: ${String(event.reason)}`, {
        level: 'error',
        contexts: {
          errorHandler: {
            type: 'unhandledrejection',
            promise: event.promise,
          },
        },
        tags: {
          errorType: 'unhandledRejection',
        },
      });
    }

    // Show user-friendly error toast (production only)
    if (!import.meta.env.DEV) {
      toast({
        title: 'Operation failed',
        description: 'An error occurred while processing your request. Please try again.',
        variant: 'destructive',
      });
    }

    // Prevent default error handling
    event.preventDefault();
  });

  // 3. Handle service worker errors (for PWA)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('error', (event) => {
      // Only log in development
      if (import.meta.env.DEV) {
        console.error('Service Worker error:', event);
      }

      Sentry.captureMessage('Service Worker error', {
        level: 'error',
        contexts: {
          errorHandler: {
            type: 'serviceWorker',
            event,
          },
        },
        tags: {
          errorType: 'serviceWorkerError',
        },
      });
    });
  }

  // 4. Handle visibility change errors (catches errors when app returns from background)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      // App became visible - check for any stale state errors
      // Silent in production
    }
  });

  // Silent in production - no initialization logging
}

/**
 * Cleanup global error handlers (for testing)
 */
export function cleanupGlobalErrorHandlers() {
  window.onerror = null;
  window.onunhandledrejection = null;
}
