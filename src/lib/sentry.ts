/**
 * Sentry Error Tracking Configuration
 * Catches and reports all production errors
 */

import * as Sentry from "@sentry/react";

export function initSentry() {
  // Only initialize in production or if DSN is explicitly set
  const dsn = import.meta.env.VITE_SENTRY_DSN;

  if (!dsn) {
    console.info('Sentry DSN not configured - error tracking disabled');
    return;
  }

  Sentry.init({
    dsn,

    // Environment (development, staging, production)
    environment: import.meta.env.MODE,

    // Performance monitoring - sample 100% of transactions in development, 10% in production
    tracesSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 1.0,

    // Session replay - helps debug issues by recording user sessions
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors

    integrations: [
      // Browser performance tracking
      new Sentry.BrowserTracing({
        // Track React Router navigation
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          React.useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes
        ),
      }),

      // Session replay for debugging
      new Sentry.Replay({
        maskAllText: false, // Don't mask text (we want to see what users type)
        blockAllMedia: false, // Don't block media (images, videos)
      }),
    ],

    // Ignore common errors that aren't actionable
    ignoreErrors: [
      // Browser extensions
      'top.GLOBALS',
      'chrome-extension',
      'moz-extension',

      // Network errors (user's connection issues)
      'NetworkError',
      'Network request failed',

      // ResizeObserver errors (not actionable)
      'ResizeObserver loop limit exceeded',
    ],

    // Before sending error, add custom context
    beforeSend(event, hint) {
      // Filter out development errors
      if (import.meta.env.MODE === 'development') {
        console.error('Sentry captured error:', hint.originalException || hint.syntheticException);
        return null; // Don't send to Sentry in dev
      }

      return event;
    },
  });
}

// Re-export Sentry for easy access
export { Sentry };

// Import React Router hooks (needed for routing instrumentation)
import React, { useEffect } from "react";
import { useLocation, useNavigationType, createRoutesFromChildren, matchRoutes } from "react-router-dom";
