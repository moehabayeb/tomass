/**
 * Meeting Notifications Service
 * v50: Fixed blocking permission check that caused Speaking page timeout on Android
 * v49: Updated to use native Capacitor notifications for Android/iOS
 * Falls back to browser notifications for web
 */

import { MeetingsService, type AdminMeeting } from './meetingsService';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

// Safe localStorage wrapper
const safeStorage = {
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  },
  set: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '{}');
          if (data.notifications?.length > 10) {
            data.notifications = data.notifications.slice(-5);
            localStorage.setItem(key, JSON.stringify(data));
          }
          localStorage.setItem(key, value);
          return true;
        } catch {
          return false;
        }
      }
      return false;
    }
  }
};

export class MeetingNotificationsService {
  private static instance: MeetingNotificationsService;
  private checkInterval: number | null = null;
  private notificationPermission: NotificationPermission | 'granted' | 'denied' | 'default' = 'default';
  private shownNotifications = new Set<string>();
  private failedChecks = 0;
  private maxRetries = 3;
  private retryDelay = 60000;
  private activeTimers = new Map<string, NodeJS.Timeout>();
  private isNative: boolean;

  static getInstance(): MeetingNotificationsService {
    if (!this.instance) {
      this.instance = new MeetingNotificationsService();
    }
    return this.instance;
  }

  private constructor() {
    // Check if running on native platform (Android/iOS)
    this.isNative = Capacitor.isNativePlatform();

    // v50: Removed initializePermissionStatus() - was blocking native bridge on Android
    // Permission is checked lazily in requestPermission(), startNotificationService(), getPermissionStatus()
    this.loadShownNotifications();

    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.cleanup();
      });

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.cleanup();
        }
      });
    }
  }

  private cleanup(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
    this.activeTimers.forEach(timer => clearTimeout(timer));
    this.activeTimers.clear();
  }

  /**
   * Request notification permission
   * v49: Uses native Capacitor permissions on Android/iOS
   */
  async requestPermission(): Promise<boolean> {
    if (this.isNative) {
      // Native Android/iOS - use Capacitor LocalNotifications
      try {
        const status = await LocalNotifications.checkPermissions();

        if (status.display === 'granted') {
          this.notificationPermission = 'granted';
          return true;
        }

        if (status.display === 'denied') {
          this.notificationPermission = 'denied';
          return false;
        }

        // Request permission
        const result = await LocalNotifications.requestPermissions();
        this.notificationPermission = result.display;
        return result.display === 'granted';
      } catch (error) {
        console.error('Error requesting native notification permission:', error);
        return false;
      }
    } else {
      // Web browser - use browser Notification API
      if (!('Notification' in window)) {
        return false;
      }

      this.notificationPermission = Notification.permission;

      if (this.notificationPermission === 'default') {
        try {
          this.notificationPermission = await Notification.requestPermission();
        } catch (error) {
          return false;
        }
      }

      return this.notificationPermission === 'granted';
    }
  }

  /**
   * Start checking for upcoming meetings
   */
  async startNotificationService(): Promise<boolean> {
    // Check permission based on platform
    if (this.isNative) {
      try {
        const status = await LocalNotifications.checkPermissions();
        this.notificationPermission = status.display;

        if (status.display !== 'granted') {
          return false;
        }
      } catch {
        return false;
      }
    } else {
      if (!('Notification' in window)) {
        return false;
      }
      this.notificationPermission = Notification.permission;
      if (this.notificationPermission !== 'granted') {
        return false;
      }
    }

    this.cleanup();

    // Check every 2 minutes
    this.checkInterval = window.setInterval(() => {
      this.checkUpcomingMeetings();
    }, 2 * 60 * 1000);

    await this.checkUpcomingMeetings();
    return true;
  }

  stopNotificationService(): void {
    this.cleanup();
  }

  private async checkUpcomingMeetings(): Promise<void> {
    try {
      const upcomingMeetings = await MeetingsService.getUpcomingMeetings();
      this.failedChecks = 0;

      const nowUtc = Date.now();

      for (const meeting of upcomingMeetings) {
        const meetingTimeUtc = new Date(meeting.scheduled_at).getTime();
        const timeUntilMeeting = meetingTimeUtc - nowUtc;

        const tenMinutes = 10 * 60 * 1000;
        const shouldNotify = timeUntilMeeting <= tenMinutes && timeUntilMeeting > 0;

        if (shouldNotify && !this.hasShownNotification(meeting.id)) {
          await this.showMeetingNotification(meeting);
          this.markNotificationShown(meeting.id);
        }
      }

      this.cleanupOldNotifications();
    } catch (error) {
      this.failedChecks++;

      if (this.failedChecks >= this.maxRetries) {
        this.stopNotificationService();

        setTimeout(() => {
          this.failedChecks = 0;
          this.startNotificationService();
        }, this.retryDelay);
      }
    }
  }

  /**
   * Show notification for a meeting
   * v49: Uses native notifications on Android/iOS
   */
  private async showMeetingNotification(meeting: AdminMeeting): Promise<void> {
    if (this.notificationPermission !== 'granted') return;

    const timeInfo = MeetingsService.getTimeUntilMeeting(meeting.scheduled_at);
    const title = `Meeting Starting Soon: ${meeting.title}`;
    const body = `Meeting starts ${timeInfo.timeString}. Tap to join.`;

    if (this.isNative) {
      // Native Android/iOS notification
      try {
        await LocalNotifications.schedule({
          notifications: [
            {
              id: this.generateNotificationId(meeting.id),
              title: title,
              body: body,
              largeBody: `${meeting.title} with ${meeting.teacher_name} starts ${timeInfo.timeString}. Tap to open the app and join.`,
              smallIcon: 'ic_launcher_foreground',
              largeIcon: 'ic_launcher',
              sound: 'default',
              actionTypeId: 'MEETING_REMINDER',
              extra: {
                meetingId: meeting.id,
                meetingUrl: meeting.meeting_url
              }
            }
          ]
        });
      } catch (error) {
        console.error('Error showing native notification:', error);
      }
    } else {
      // Browser notification (web fallback)
      try {
        const notificationOptions: NotificationOptions = {
          body,
          icon: '/favicon.ico',
          tag: `meeting_${meeting.id}`,
          silent: false
        };

        const notification = new Notification(title, notificationOptions);

        notification.onclick = () => {
          window.focus();
          window.open(meeting.meeting_url, '_blank');
          notification.close();
        };

        const timerId = meeting.id;
        const closeTimer = setTimeout(() => {
          notification.close();
          this.activeTimers.delete(timerId);
        }, 30 * 1000);

        this.activeTimers.set(timerId, closeTimer);

        notification.onclose = () => {
          const timer = this.activeTimers.get(timerId);
          if (timer) {
            clearTimeout(timer);
            this.activeTimers.delete(timerId);
          }
        };
      } catch (error) {
        console.error('Error showing browser notification:', error);
      }
    }
  }

  /**
   * Generate a numeric ID for native notifications
   */
  private generateNotificationId(meetingId: string): number {
    let hash = 0;
    for (let i = 0; i < meetingId.length; i++) {
      const char = meetingId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  private hasShownNotification(meetingId: string): boolean {
    return this.shownNotifications.has(meetingId);
  }

  private markNotificationShown(meetingId: string): void {
    this.shownNotifications.add(meetingId);
    this.saveShownNotifications();
  }

  private loadShownNotifications(): void {
    const stored = safeStorage.get('meeting_notifications_shown');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        this.shownNotifications = new Set(data.notifications || []);
      } catch (error) {
        this.shownNotifications = new Set();
      }
    }
  }

  private saveShownNotifications(): void {
    const data = {
      notifications: Array.from(this.shownNotifications),
      lastCleanup: Date.now()
    };
    safeStorage.set('meeting_notifications_shown', JSON.stringify(data));
  }

  private cleanupOldNotifications(): void {
    try {
      const stored = safeStorage.get('meeting_notifications_shown');
      if (!stored) return;

      const data = JSON.parse(stored);
      const lastCleanup = data.lastCleanup || 0;
      const now = Date.now();

      const oneDayMs = 24 * 60 * 60 * 1000;
      if (now - lastCleanup > oneDayMs) {
        this.shownNotifications.clear();
        this.saveShownNotifications();
      }
    } catch (error) {
      // Silent fail
    }
  }

  /**
   * Test notification
   */
  async testNotification(): Promise<void> {
    const hasPermission = await this.requestPermission();
    if (!hasPermission) {
      return;
    }

    if (this.isNative) {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 99999,
            title: 'Test Notification',
            body: 'This is a test notification from Tomas Hoca.',
            sound: 'default'
          }
        ]
      });
    } else {
      const notification = new Notification('Test Notification', {
        body: 'This is a test notification from the meeting system.',
        icon: '/favicon.ico'
      });

      const closeTimer = setTimeout(() => notification.close(), 5000);
      notification.onclose = () => clearTimeout(closeTimer);
    }
  }

  /**
   * Get notification permission status
   */
  async getPermissionStatus(): Promise<'granted' | 'denied' | 'default'> {
    if (this.isNative) {
      try {
        const status = await LocalNotifications.checkPermissions();
        this.notificationPermission = status.display;
        return status.display as 'granted' | 'denied' | 'default';
      } catch {
        return 'default';
      }
    } else if ('Notification' in window) {
      this.notificationPermission = Notification.permission;
      return Notification.permission;
    }
    return 'default';
  }

  /**
   * Check if notifications are supported
   */
  static isSupported(): boolean {
    if (Capacitor.isNativePlatform()) {
      return true; // Native always supports local notifications
    }
    return 'Notification' in window;
  }

  /**
   * Check if running on native platform
   */
  static isNativePlatform(): boolean {
    return Capacitor.isNativePlatform();
  }
}

// Export singleton instance
export const meetingNotifications = MeetingNotificationsService.getInstance();
