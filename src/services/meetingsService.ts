/**
 * Meetings Service
 * Handles all API calls for user-facing meetings functionality
 * Admin CRUD operations removed - admins use Supabase Studio for meeting management
 */

import { supabase } from '@/integrations/supabase/client';

export interface AdminMeeting {
  id: string;
  title: string;
  description: string | null;
  meeting_url: string;
  starts_at: string; // ISO timestamp
  ends_at: string | null; // ISO timestamp
  level_code: 'general' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'; // CEFR levels
  section_name: string; // Computed: "A1 / Apples", "B2 / Blueberry", etc.
  capacity: number; // Max attendees (1-100, default 20)
  scheduled_at: string; // Computed field for backward compatibility
  duration_minutes: number; // Computed field for backward compatibility
  created_by: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PublicMeeting {
  id: string;
  title: string;
  description: string | null;
  meeting_url: string;
  starts_at: string; // ISO timestamp
  ends_at: string | null; // ISO timestamp
  level_code: 'general' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'; // CEFR levels
  section_name: string; // Computed: "A1 / Apples", "B2 / Blueberry", etc.
  capacity: number; // Max attendees (1-100, default 20)
  scheduled_at: string; // Computed field for backward compatibility
  duration_minutes: number; // Computed field for backward compatibility
  teacher_name: string; // Computed field
  focus_topic: string; // Computed field
  zoom_link: string; // Computed field
  created_at: string;
}

export interface MeetingRSVP {
  id: string;
  meeting_id: string;
  user_id: string;
  status: 'yes' | 'no' | 'maybe';
  created_at: string;
  updated_at: string;
}

export class MeetingsService {
  /**
   * Get public meetings (active & upcoming, includes capacity, level_code, section_name if available)
   */
  static async getPublicMeetings(): Promise<PublicMeeting[]> {
    try {
      const { data, error } = await supabase
        .from('public_meetings')
        .select('*')
        .order('scheduled_at', { ascending: true })
        .limit(10);

      if (error) {
        console.error('Error fetching public meetings:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getPublicMeetings:', error);
      throw error;
    }
  }

  /**
   * Get upcoming meetings (next 7 days) - used by user-facing features
   */
  static async getUpcomingMeetings(): Promise<AdminMeeting[]> {
    try {
      const now = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(now.getDate() + 7);

      const { data, error } = await supabase
        .from('admin_meetings')
        .select('*')
        .eq('is_active', true)
        .gte('starts_at', now.toISOString())
        .lte('starts_at', nextWeek.toISOString())
        .order('starts_at', { ascending: true })
        .limit(5);

      if (error) {
        console.error('Error fetching upcoming meetings:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getUpcomingMeetings:', error);
      throw error;
    }
  }

  /**
   * Get user's RSVP for a meeting
   */
  static async getUserRSVP(meetingId: string): Promise<MeetingRSVP | null> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user?.id) return null;

      const { data, error } = await supabase
        .from('meeting_rsvps')
        .select('*')
        .eq('meeting_id', meetingId)
        .eq('user_id', user.user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // Not found is OK
        console.error('Error fetching RSVP:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in getUserRSVP:', error);
      throw error;
    }
  }

  /**
   * Set user's RSVP status
   */
  static async setRSVP(meetingId: string, status: 'yes' | 'no' | 'maybe'): Promise<MeetingRSVP> {
    try {
      const { data, error } = await supabase.rpc('upsert_rsvp', {
        p_meeting_id: meetingId,
        p_status: status
      });

      if (error) {
        console.error('Error setting RSVP:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in setRSVP:', error);
      throw error;
    }
  }

  /**
   * Subscribe to meeting changes (realtime)
   */
  static subscribeToMeetings(callback: (payload: any) => void) {
    return supabase
      .channel('meetings_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'admin_meetings'
        },
        callback
      )
      .subscribe();
  }

  /**
   * Format meeting time for display (supports both starts_at and scheduled_at)
   */
  static formatMeetingTime(isoTimestamp: string): string {
    const date = new Date(isoTimestamp);
    const now = new Date();

    // Check if it's today
    const isToday = date.toDateString() === now.toDateString();

    // Check if it's tomorrow
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const isTomorrow = date.toDateString() === tomorrow.toDateString();

    const timeString = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    if (isToday) {
      return `Today at ${timeString}`;
    } else if (isTomorrow) {
      return `Tomorrow at ${timeString}`;
    } else {
      return date.toLocaleDateString([], {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }
  }

  /**
   * Get time until meeting starts (for countdown) - supports both starts_at and scheduled_at
   */
  static getTimeUntilMeeting(isoTimestamp: string): {
    isLive: boolean;
    isUpcoming: boolean;
    isPast: boolean;
    canJoin: boolean; // New: Indicates if join button should be enabled
    timeString: string;
    minutesUntil: number; // New: Actual minutes until meeting for precise checks
  } {
    const meetingTime = new Date(isoTimestamp);
    const now = new Date();
    const diff = meetingTime.getTime() - now.getTime();
    const minutesUntil = Math.floor(diff / (1000 * 60));

    // Meeting is in the past (or currently running - up to 2 hours after start)
    const twoHoursInMs = 2 * 60 * 60 * 1000;
    if (diff < -twoHoursInMs) {
      return {
        isLive: false,
        isUpcoming: false,
        isPast: true,
        canJoin: false,
        timeString: 'Meeting ended',
        minutesUntil
      };
    }

    // Meeting is live (started up to 2 hours ago, or starting within 15 minutes)
    const fifteenMinutes = 15 * 60 * 1000;
    if (diff <= fifteenMinutes && diff >= -twoHoursInMs) {
      return {
        isLive: true,
        isUpcoming: false,
        isPast: false,
        canJoin: true,
        timeString: diff < 0 ? 'Live now' : 'Join now',
        minutesUntil
      };
    }

    // Calculate time until meeting
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const days = Math.floor(hours / 24);

    let timeString = '';
    if (days > 0) {
      timeString = `${days}d ${hours % 24}h`;
    } else if (hours > 0) {
      timeString = `${hours}h ${minutes}m`;
    } else {
      timeString = `${minutes}m`;
    }

    return {
      isLive: false,
      isUpcoming: true,
      isPast: false,
      canJoin: false,
      timeString: `in ${timeString}`,
      minutesUntil
    };
  }
}