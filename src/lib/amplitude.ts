/**
 * Amplitude Analytics Configuration
 * Tracks user behavior and product analytics
 */

import * as amplitude from '@amplitude/analytics-browser';

let isInitialized = false;

export function initAmplitude() {
  const apiKey = import.meta.env.VITE_AMPLITUDE_API_KEY;

  if (!apiKey) {
    // Silent in production - no console output
    return;
  }

  if (isInitialized) {
    return; // Already initialized
  }

  amplitude.init(apiKey, {
    // Auto-track sessions, page views, and form interactions
    defaultTracking: {
      sessions: true,
      pageViews: true,
      formInteractions: false, // We'll track form submissions manually
      fileDownloads: false,
    },

    // Server zone (EU or US)
    serverZone: 'US',
  });

  isInitialized = true;
}

/**
 * Track a custom event
 * @param eventName - Name of the event (e.g., "lesson_completed")
 * @param properties - Additional data about the event
 */
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (!isInitialized) {
    return; // Silent fail - analytics not initialized
  }

  amplitude.track(eventName, properties);
}

/**
 * Set user properties (attributes that describe the user)
 * @param properties - User properties (e.g., { tier: "free", current_level: "A2" })
 */
export function setUserProperties(properties: Record<string, any>) {
  if (!isInitialized) {
    return; // Silent fail - analytics not initialized
  }

  const identify = new amplitude.Identify();

  Object.entries(properties).forEach(([key, value]) => {
    identify.set(key, value);
  });

  amplitude.identify(identify);
}

/**
 * Identify a user (call this after login/signup)
 * @param userId - Unique user ID
 * @param userProperties - Optional user properties
 */
export function identifyUser(userId: string, userProperties?: Record<string, any>) {
  if (!isInitialized) {
    return; // Silent fail - analytics not initialized
  }

  amplitude.setUserId(userId);

  if (userProperties) {
    setUserProperties(userProperties);
  }
}

/**
 * Clear user identity (call this after logout)
 */
export function resetUser() {
  if (!isInitialized) {
    return;
  }

  amplitude.reset();
}

// Re-export Amplitude for advanced usage
export { amplitude };
