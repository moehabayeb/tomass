/**
 * Meeting Notifications Service
 * Handles browser notifications for upcoming meetings
 * 🔧 REFACTORED: Fixed all critical bugs (#1, #2, #3, #4, #5, #6, #7)
 */

import { MeetingsService, type AdminMeeting } from './meetingsService';

// 🔧 FIX BUG #4: Safe localStorage wrapper
const safeStorage = {
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      // Storage read error - silent fail for Apple Store compliance
      return null;
    }
  },
  set: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        // Storage quota exceeded - attempt to clear old data
        try {
          // Clear old data and retry
          const data = JSON.parse(localStorage.getItem(key) || '{}');
          if (data.notifications?.length > 10) {
            data.notifications = data.notifications.slice(-5); // Keep only last 5
            localStorage.setItem(key, JSON.stringify(data));
          }
          localStorage.setItem(key, value);
          return true;
        } catch {
          return false;
        }
      }
      // Storage write error - silent fail for Apple Store compliance
      return false;
    }
  }
};

export class MeetingNotificationsService {
  private static instance: MeetingNotificationsService;
  private checkInterval: number | null = null;
  private notificationPermission: NotificationPermission = 'default';
  private shownNotifications = new Set<string>();

  // 🔧 FIX BUG #3: Retry mechanism for failed API calls
  private failedChecks = 0;
  private maxRetries = 3;
  private retryDelay = 60000; // 1 minute

  // 🔧 FIX BUG #2: Track active notification timers for cleanup
  private activeTimers = new Map<string, NodeJS.Timeout>();

  static getInstance(): MeetingNotificationsService {
    if (!this.instance) {
      this.instance = new MeetingNotificationsService();
    }
    return this.instance;
  }

  private constructor() {
    // 🔧 FIX BUG #5: Initialize permission status, will be refreshed on use
    if ('Notification' in window) {
      this.notificationPermission = Notification.permission;
    }
    this.loadShownNotifications();

    // 🔧 FIX BUG #6: Setup cleanup on page unload
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.cleanup();
      });

      // Also cleanup on visibility change (tab switch)
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.cleanup();
        }
      });
    }
  }

  /**
   * 🔧 FIX BUG #6: Comprehensive cleanup method
   */
  private cleanup(): void {
    // Clear interval
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }

    // Clear all active timers
    this.activeTimers.forEach(timer => clearTimeout(timer));
    this.activeTimers.clear();

    // Service cleaned up successfully
  }

  /**
   * Request notification permission (must be called from user action)
   * 🔧 FIX BUG #5: Always refresh permission status
   */
  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      // Browser does not support notifications
      return false;
    }

    // 🔧 FIX BUG #5: Refresh current permission status
    this.notificationPermission = Notification.permission;

    // Only request if not already decided
    if (this.notificationPermission === 'default') {
      try {
        this.notificationPermission = await Notification.requestPermission();
      } catch (error) {
        // Permission request error - silent fail for Apple Store compliance
        return false;
      }
    }

    return this.notificationPermission === 'granted';
  }

  /**
   * Start checking for upcoming meetings
   * 🔧 FIX BUG #1: Manual initialization only, returns boolean
   */
  async startNotificationService(): Promise<boolean> {
    // Check permission status (don't request, just check)
    if (!('Notification' in window)) {
      // Browser does not support notifications
      return false;
    }

    // 🔧 FIX BUG #5: Refresh permission before starting
    this.notificationPermission = Notification.permission;

    if (this.notificationPermission !== 'granted') {
      // Notification permission not granted
      return false;
    }

    // Stop existing interval if any (prevent multiple intervals)
    this.cleanup();

    // Check every 2 minutes
    this.checkInterval = window.setInterval(() => {
      this.checkUpcomingMeetings();
    }, 2 * 60 * 1000);

    // Initial check
    await this.checkUpcomingMeetings();
    // Service started successfully
    return true;
  }

  /**
   * Stop the notification service
   * 🔧 FIX BUG #6: Use cleanup method
   */
  stopNotificationService(): void {
    this.cleanup();
    // Service stopped successfully
  }

  /**
   * Check for meetings starting soon and show notifications
   * 🔧 FIX BUG #3: Added retry logic and error recovery
   * 🔧 FIX BUG #7: Fixed timezone handling
   */
  private async checkUpcomingMeetings(): Promise<void> {
    try {
      const upcomingMeetings = await MeetingsService.getUpcomingMeetings();

      // 🔧 FIX BUG #3: Reset failed checks on success
      this.failedChecks = 0;

      // 🔧 FIX BUG #7: Use UTC-aware date comparison
      const nowUtc = Date.now();

      for (const meeting of upcomingMeetings) {
        // scheduled_at is already in UTC from the server
        const meetingTimeUtc = new Date(meeting.scheduled_at).getTime();
        const timeUntilMeeting = meetingTimeUtc - nowUtc;

        // Show notification 10 minutes before
        const tenMinutes = 10 * 60 * 1000;
        const shouldNotify = timeUntilMeeting <= tenMinutes && timeUntilMeeting > 0;

        if (shouldNotify && !this.hasShownNotification(meeting.id)) {
          this.showMeetingNotification(meeting);
          this.markNotificationShown(meeting.id);
        }
      }

      // Clean up old notification records (older than 24 hours)
      this.cleanupOldNotifications();
    } catch (error) {
      // Error checking upcoming meetings - silent fail for Apple Store compliance

      // 🔧 FIX BUG #3: Retry logic
      this.failedChecks++;

      if (this.failedChecks >= this.maxRetries) {
        // Max retries reached, stopping service
        this.stopNotificationService();

        // Attempt restart after delay
        setTimeout(() => {
          // Attempting to restart service
          this.failedChecks = 0;
          this.startNotificationService();
        }, this.retryDelay);
      }
    }
  }

  /**
   * Show browser notification for a meeting
   * 🔧 FIX BUG #2: Proper timer cleanup with tracking
   */
  private showMeetingNotification(meeting: AdminMeeting): void {
    if (this.notificationPermission !== 'granted') return;

    const timeInfo = MeetingsService.getTimeUntilMeeting(meeting.scheduled_at);
    const title = `Meeting Starting Soon: ${meeting.title}`;
    const body = `Meeting starts ${timeInfo.timeString}. Click to join.`;

    try {
      // Safari-compatible options (no actions, badge, or requireInteraction)
      const notificationOptions: NotificationOptions = {
        body,
        icon: '/favicon.ico',
        tag: `meeting_${meeting.id}`, // Prevent duplicate notifications
        silent: false
      };

      const notification = new Notification(title, notificationOptions);

      // Handle notification click
      notification.onclick = () => {
        window.focus();
        window.open(meeting.meeting_url, '_blank');
        notification.close();
      };

      // 🔧 FIX BUG #2: Track timer for proper cleanup
      const timerId = meeting.id;
      const closeTimer = setTimeout(() => {
        notification.close();
        this.activeTimers.delete(timerId);
      }, 30 * 1000);

      // Store timer for cleanup
      this.activeTimers.set(timerId, closeTimer);

      // Clear timer if user closes notification manually
      notification.onclose = () => {
        const timer = this.activeTimers.get(timerId);
        if (timer) {
          clearTimeout(timer);
          this.activeTimers.delete(timerId);
        }
      };

      // Handle notification errors
      notification.onerror = (error) => {
        // Notification error - silent fail for Apple Store compliance
        const timer = this.activeTimers.get(timerId);
        if (timer) {
          clearTimeout(timer);
          this.activeTimers.delete(timerId);
        }
      };

      // Notification shown successfully
    } catch (error) {
      // Error showing notification - silent fail for Apple Store compliance
    }
  }

  /**
   * Check if notification was already shown for this meeting
   */
  private hasShownNotification(meetingId: string): boolean {
    return this.shownNotifications.has(meetingId);
  }

  /**
   * Mark notification as shown and persist to localStorage
   */
  private markNotificationShown(meetingId: string): void {
    this.shownNotifications.add(meetingId);
    this.saveShownNotifications();
  }

  /**
   * Load shown notifications from localStorage
   */
  private loadShownNotifications(): void {
    const stored = safeStorage.get('meeting_notifications_shown');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        this.shownNotifications = new Set(data.notifications || []);
      } catch (error) {
        // Error loading shown notifications - reset to empty set
        this.shownNotifications = new Set();
      }
    }
  }

  /**
   * Save shown notifications to localStorage
   */
  private saveShownNotifications(): void {
    const data = {
      notifications: Array.from(this.shownNotifications),
      lastCleanup: Date.now()
    };
    safeStorage.set('meeting_notifications_shown', JSON.stringify(data));
  }

  /**
   * Clean up old notification records
   */
  private cleanupOldNotifications(): void {
    try {
      const stored = safeStorage.get('meeting_notifications_shown');
      if (!stored) return;

      const data = JSON.parse(stored);
      const lastCleanup = data.lastCleanup || 0;
      const now = Date.now();

      // Clean up every 24 hours
      const oneDayMs = 24 * 60 * 60 * 1000;
      if (now - lastCleanup > oneDayMs) {
        // Clear all shown notifications (they're old now)
        this.shownNotifications.clear();
        this.saveShownNotifications();
        // Cleaned up old notification records successfully
      }
    } catch (error) {
      // Error cleaning up notifications - silent fail for Apple Store compliance
    }
  }

  /**
   * Test notification (for debugging)
   */
  async testNotification(): Promise<void> {
    const hasPermission = await this.requestPermission();
    if (!hasPermission) {
      alert('Notification permission required for testing');
      return;
    }

    const notification = new Notification('Test Notification', {
      body: 'This is a test notification from the meeting system.',
      icon: '/favicon.ico'
    });

    const closeTimer = setTimeout(() => notification.close(), 5000);

    // Clear timer if user closes notification manually
    notification.onclose = () => {
      clearTimeout(closeTimer);
    };
  }

  /**
   * Get notification permission status
   * 🔧 FIX BUG #5: Always return fresh status
   */
  getPermissionStatus(): NotificationPermission {
    if ('Notification' in window) {
      this.notificationPermission = Notification.permission;
    }
    return this.notificationPermission;
  }

  /**
   * Check if notifications are supported
   */
  static isSupported(): boolean {
    return 'Notification' in window;
  }
}

// Export singleton instance
export const meetingNotifications = MeetingNotificationsService.getInstance();

// 🔧 FIX BUG #1: Remove auto-start - must be manually initialized by user action
// No automatic initialization - service must be started explicitly by user interaction
