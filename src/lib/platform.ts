/**
 * Platform Detection Utility
 * Detects whether the app is running on web, iOS, or Android
 */

export type Platform = 'web' | 'ios' | 'android';

/**
 * Detect the current platform
 */
export function detectPlatform(): Platform {
  // Check if running in Capacitor (mobile app wrapper)
  if (typeof window !== 'undefined' && (window as any).Capacitor) {
    const platform = (window as any).Capacitor.getPlatform();

    if (platform === 'ios') {
      return 'ios';
    } else if (platform === 'android') {
      return 'android';
    }
  }

  // Check user agent for mobile indicators (fallback if Capacitor not available)
  if (typeof navigator !== 'undefined') {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

    // iOS detection
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      return 'ios';
    }

    // Android detection
    if (/android/i.test(userAgent)) {
      return 'android';
    }
  }

  // Default to web
  return 'web';
}

/**
 * Check if running on iOS
 */
export function isIOS(): boolean {
  return detectPlatform() === 'ios';
}

/**
 * Check if running on Android
 */
export function isAndroid(): boolean {
  return detectPlatform() === 'android';
}

/**
 * Check if running on mobile (iOS or Android)
 */
export function isMobile(): boolean {
  const platform = detectPlatform();
  return platform === 'ios' || platform === 'android';
}

/**
 * Check if running on web
 */
export function isWeb(): boolean {
  return detectPlatform() === 'web';
}

/**
 * Get platform display name
 */
export function getPlatformName(): string {
  const platform = detectPlatform();
  switch (platform) {
    case 'ios':
      return 'iOS';
    case 'android':
      return 'Android';
    case 'web':
      return 'Web';
    default:
      return 'Unknown';
  }
}

/**
 * Check if in-app purchases are available (mobile only)
 */
export function supportsInAppPurchases(): boolean {
  return isMobile();
}

/**
 * Get app store name for the current platform
 */
export function getAppStoreName(): string {
  const platform = detectPlatform();
  switch (platform) {
    case 'ios':
      return 'App Store';
    case 'android':
      return 'Google Play Store';
    case 'web':
      return 'Web';
    default:
      return 'Unknown';
  }
}

/**
 * Get subscription management URL for the current platform
 */
export function getSubscriptionManagementUrl(): string {
  const platform = detectPlatform();

  switch (platform) {
    case 'ios':
      // Opens iOS Settings → Subscriptions
      return 'https://apps.apple.com/account/subscriptions';
    case 'android':
      // Opens Google Play Store subscriptions
      return 'https://play.google.com/store/account/subscriptions';
    case 'web':
      // Web users would manage subscriptions in-app
      return '/profile';
    default:
      return '/profile';
  }
}

/**
 * Check if platform supports specific features
 */
export function supportsFeature(feature: 'push_notifications' | 'biometrics' | 'camera' | 'geolocation'): boolean {
  const platform = detectPlatform();

  switch (feature) {
    case 'push_notifications':
      // Mobile platforms support native push, web supports web push
      return true;

    case 'biometrics':
      // Only mobile supports FaceID/TouchID/Fingerprint
      return isMobile();

    case 'camera':
      // All platforms can access camera, but mobile has better integration
      return true;

    case 'geolocation':
      // All platforms support geolocation
      return true;

    default:
      return false;
  }
}
