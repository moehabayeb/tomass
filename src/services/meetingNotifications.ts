/**
 * Meeting Notifications Service
 * Handles browser notifications for upcoming meetings
 */

import { MeetingsService, type AdminMeeting } from './meetingsService';

export class MeetingNotificationsService {
  private static instance: MeetingNotificationsService;
  private checkInterval: number | null = null;
  private notificationPermission: NotificationPermission = 'default';
  private shownNotifications = new Set<string>();

  static getInstance(): MeetingNotificationsService {
    if (!this.instance) {
      this.instance = new MeetingNotificationsService();
    }
    return this.instance;
  }

  private constructor() {
    this.initializePermissions();
    this.loadShownNotifications();
  }

  /**
   * Request notification permission and initialize
   */
  async initializePermissions(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('Browser does not support notifications');
      return false;
    }

    this.notificationPermission = Notification.permission;

    if (this.notificationPermission === 'default') {
      try {
        this.notificationPermission = await Notification.requestPermission();
      } catch (error) {
        console.error('Error requesting notification permission:', error);
        return false;
      }
    }

    return this.notificationPermission === 'granted';
  }

  /**
   * Start checking for upcoming meetings
   */
  async startNotificationService(): Promise<void> {
    const hasPermission = await this.initializePermissions();
    if (!hasPermission) {
      console.warn('Notification permission not granted');
      return;
    }

    // Check every 2 minutes
    this.checkInterval = window.setInterval(() => {
      this.checkUpcomingMeetings();
    }, 2 * 60 * 1000);

    // Initial check
    await this.checkUpcomingMeetings();
    console.log('📅 Meeting notification service started');
  }

  /**
   * Stop the notification service
   */
  stopNotificationService(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
    console.log('📅 Meeting notification service stopped');
  }

  /**
   * Check for meetings starting soon and show notifications
   */
  private async checkUpcomingMeetings(): Promise<void> {
    try {
      const upcomingMeetings = await MeetingsService.getUpcomingMeetings();
      const now = new Date();

      for (const meeting of upcomingMeetings) {
        const meetingTime = new Date(meeting.scheduled_at);
        const timeUntilMeeting = meetingTime.getTime() - now.getTime();

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
      console.error('Error checking upcoming meetings:', error);
    }
  }

  /**
   * Show browser notification for a meeting
   */
  private showMeetingNotification(meeting: AdminMeeting): void {
    if (this.notificationPermission !== 'granted') return;

    const timeInfo = MeetingsService.getTimeUntilMeeting(meeting.scheduled_at);
    const title = `Meeting Starting Soon: ${meeting.title}`;
    const body = `Meeting starts ${timeInfo.timeString}. Click to join.`;

    try {
      const notification = new Notification(title, {
        body,
        icon: '/favicon.ico', // Use app favicon
        badge: '/favicon.ico',
        tag: `meeting_${meeting.id}`, // Prevent duplicate notifications
        requireInteraction: true, // Keep notification visible until user interacts
        actions: [
          {
            action: 'join',
            title: 'Join Meeting'
          },
          {
            action: 'dismiss',
            title: 'Dismiss'
          }
        ]
      });

      // Handle notification click
      notification.onclick = () => {
        window.focus();
        window.open(meeting.meeting_url, '_blank');
        notification.close();
      };

      // Auto-close after 30 seconds if no interaction
      setTimeout(() => {
        notification.close();
      }, 30 * 1000);

      console.log(`📅 Notification shown for meeting: ${meeting.title}`);
    } catch (error) {
      console.error('Error showing notification:', error);
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
    try {
      const stored = localStorage.getItem('meeting_notifications_shown');
      if (stored) {
        const data = JSON.parse(stored);
        this.shownNotifications = new Set(data.notifications || []);
      }
    } catch (error) {
      console.error('Error loading shown notifications:', error);
      this.shownNotifications = new Set();
    }
  }

  /**
   * Save shown notifications to localStorage
   */
  private saveShownNotifications(): void {
    try {
      const data = {
        notifications: Array.from(this.shownNotifications),
        lastCleanup: Date.now()
      };
      localStorage.setItem('meeting_notifications_shown', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving shown notifications:', error);
    }
  }

  /**
   * Clean up old notification records
   */
  private cleanupOldNotifications(): void {
    try {
      const stored = localStorage.getItem('meeting_notifications_shown');
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
        console.log('📅 Cleaned up old notification records');
      }
    } catch (error) {
      console.error('Error cleaning up notifications:', error);
    }
  }

  /**
   * Test notification (for debugging)
   */
  async testNotification(): Promise<void> {
    const hasPermission = await this.initializePermissions();
    if (!hasPermission) {
      alert('Notification permission required for testing');
      return;
    }

    const notification = new Notification('Test Notification', {
      body: 'This is a test notification from the meeting system.',
      icon: '/favicon.ico'
    });

    setTimeout(() => notification.close(), 5000);
  }

  /**
   * Get notification permission status
   */
  getPermissionStatus(): NotificationPermission {
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

// Auto-start when imported (only if permission is already granted)
if (typeof window !== 'undefined' && Notification.permission === 'granted') {
  meetingNotifications.startNotificationService();
}