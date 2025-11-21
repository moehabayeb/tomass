/**
 * Sentry Error Tracking Configuration
 * Catches and reports all production errors
 */

import * as Sentry from "@sentry/react";

export function initSentry() {
  // Only initialize in production or if DSN is explicitly set
  const dsn = import.meta.env.VITE_SENTRY_DSN;

  if (!dsn) {
    // Silent in production - no console output
    return;
  }

  Sentry.init({
    dsn,

    // Environment (development, staging, production)
    environment: import.meta.env.MODE,

    // Performance monitoring - sample 100% of transactions in development, 10% in production
    tracesSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 1.0,

    // Session replay - helps debug issues by recording user sessions
    // Reduced rates for privacy compliance
    replaysSessionSampleRate: 0.05, // 5% of sessions (reduced for privacy)
    replaysOnErrorSampleRate: 0.5, // 50% of sessions with errors (reduced)

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

      // Session replay for debugging - privacy compliant settings
      new Sentry.Replay({
        maskAllText: true, // Mask all text to protect user privacy
        blockAllMedia: true, // Block media for privacy compliance
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
        // Only log in dev mode
        if (import.meta.env.DEV) {
          console.error('Sentry captured error:', hint.originalException || hint.syntheticException);
        }
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
