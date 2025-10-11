/**
 * Meetings Service
 * Handles all API calls for admin meetings system
 * Updated for new schema with proper parameter ordering
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

export interface CreateMeetingData {
  title: string;
  description?: string;
  meeting_url: string;
  scheduled_at: string; // ISO timestamp
  duration_minutes: number;
  level_code: 'general' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'; // CEFR levels
  capacity: number; // Max attendees (1-100), default 20
}

export interface UpdateMeetingData {
  title: string;
  description?: string;
  meeting_url: string;
  scheduled_at: string; // ISO timestamp
  duration_minutes: number;
  level_code: 'general' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'; // CEFR levels
  capacity: number; // Max attendees (1-100)
}

// Level to section mapping
export const LEVEL_SECTIONS = {
  'general': 'General',
  'A1': 'A1 / Apples',
  'A2': 'A2 / Avocado',
  'B1': 'B1 / Banana',
  'B2': 'B2 / Blueberry',
  'C1': 'C1 / Cherry',
  'C2': 'C2 / Coconut'
} as const;

export type LevelCode = 'general' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export const LEVEL_OPTIONS = [
  { value: 'general' as LevelCode, label: 'General', section: 'General' },
  { value: 'A1' as LevelCode, label: 'A1 (Beginner I)', section: 'A1 / Apples' },
  { value: 'A2' as LevelCode, label: 'A2 (Beginner II)', section: 'A2 / Avocado' },
  { value: 'B1' as LevelCode, label: 'B1 (Intermediate I)', section: 'B1 / Banana' },
  { value: 'B2' as LevelCode, label: 'B2 (Intermediate II)', section: 'B2 / Blueberry' },
  { value: 'C1' as LevelCode, label: 'C1 (Advanced I)', section: 'C1 / Cherry' },
  { value: 'C2' as LevelCode, label: 'C2 (Advanced II)', section: 'C2 / Coconut' }
];

export class MeetingsService {
  /**
   * Check if current user is admin
   */
  static async isAdmin(): Promise<boolean> {
    try {
      // Use zero-arg version for simpler call
      const { data, error } = await supabase.rpc('is_admin');

      if (error) {
        console.error('Error checking admin status:', error);
        return false;
      }

      return data || false;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  }

  /**
   * Get all meetings for admin (admin view v2 with capacity, level_code, section_name)
   */
  static async getMeetings(): Promise<AdminMeeting[]> {
    try {
      const { data, error } = await supabase
        .from('admin_meetings_v2')
        .select('*')
        .order('starts_at', { ascending: false });

      if (error) {
        console.error('Error fetching admin meetings:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getMeetings:', error);
      throw error;
    }
  }

  /**
   * Get public meetings (active & upcoming for public page with v2 fields)
   */
  static async getPublicMeetings(): Promise<PublicMeeting[]> {
    try {
      const { data, error } = await supabase
        .from('public_meetings_v2')
        .select('id, title, description, meeting_url, scheduled_at, duration_minutes, capacity, level_code, section_name')
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
   * Get upcoming meetings (next 7 days) - for admin
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
   * Create new meeting (admin only)
   * Uses ALPHABETICAL parameter order: p_capacity, p_description, p_duration_minutes, p_level_code, p_meeting_url, p_scheduled_at, p_title
   */
  static async createMeeting(meetingData: CreateMeetingData): Promise<AdminMeeting> {
    try {
      // Client-side validation
      if (!meetingData.title?.trim() || meetingData.title.trim().length < 3) {
        throw new Error('Meeting title must be at least 3 characters long');
      }

      if (!meetingData.meeting_url?.trim() || !meetingData.meeting_url.match(/^https?:\/\//)) {
        throw new Error('Please provide a valid meeting URL (must start with http:// or https://)');
      }

      if (!meetingData.scheduled_at) {
        throw new Error('Please select a date and time for the meeting');
      }

      // Check if meeting is scheduled for the future
      const scheduledDate = new Date(meetingData.scheduled_at);
      const now = new Date();
      if (scheduledDate <= now) {
        throw new Error('Meeting must be scheduled for a future date and time');
      }

      if (!meetingData.duration_minutes || meetingData.duration_minutes <= 0 || meetingData.duration_minutes > 480) {
        throw new Error('Meeting duration must be between 1 and 480 minutes (8 hours)');
      }

      if (!meetingData.level_code || !['general', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'].includes(meetingData.level_code)) {
        throw new Error('Please select a valid level (general, A1, A2, B1, B2, C1, or C2)');
      }

      if (!meetingData.capacity || meetingData.capacity < 1 || meetingData.capacity > 100) {
        throw new Error('Meeting capacity must be between 1 and 100 attendees');
      }

      // RPC call with parameters matching database function signature
      const { data, error} = await supabase.rpc('create_meeting', {
        p_description: meetingData.description?.trim() || null,
        p_duration_minutes: meetingData.duration_minutes,
        p_meeting_url: meetingData.meeting_url.trim(),
        p_scheduled_at: meetingData.scheduled_at,
        p_title: meetingData.title.trim(),
        p_capacity: meetingData.capacity,
        p_level_code: meetingData.level_code
      });

      if (error) {
        console.error('Error creating meeting:', error);
        // Provide user-friendly error messages
        if (error.message?.includes('Permission denied')) {
          throw new Error('You do not have permission to create meetings. Admin access required.');
        }
        if (error.message?.includes('Meeting is full')) {
          throw new Error(error.message);
        }
        throw new Error(error.message || 'Failed to create meeting. Please try again.');
      }

      if (!data) {
        throw new Error('Meeting was created but no data was returned. Please refresh the page.');
      }

      return data;
    } catch (error) {
      console.error('Error in createMeeting:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred while creating the meeting');
    }
  }

  /**
   * Update meeting (admin only)
   * Uses ALPHABETICAL parameter order: p_capacity, p_description, p_duration_minutes, p_level_code, p_meeting_id, p_meeting_url, p_scheduled_at, p_title
   */
  static async updateMeeting(meetingId: string, meetingData: UpdateMeetingData): Promise<AdminMeeting> {
    try {
      // Client-side validation
      if (!meetingData.title?.trim() || meetingData.title.trim().length < 3) {
        throw new Error('Meeting title must be at least 3 characters long');
      }

      if (!meetingData.meeting_url?.trim() || !meetingData.meeting_url.match(/^https?:\/\//)) {
        throw new Error('Please provide a valid meeting URL (must start with http:// or https://)');
      }

      if (!meetingData.scheduled_at) {
        throw new Error('Please select a date and time for the meeting');
      }

      if (!meetingData.duration_minutes || meetingData.duration_minutes <= 0 || meetingData.duration_minutes > 480) {
        throw new Error('Meeting duration must be between 1 and 480 minutes (8 hours)');
      }

      if (!meetingData.level_code || !['general', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'].includes(meetingData.level_code)) {
        throw new Error('Please select a valid level (general, A1, A2, B1, B2, C1, or C2)');
      }

      if (!meetingData.capacity || meetingData.capacity < 1 || meetingData.capacity > 100) {
        throw new Error('Meeting capacity must be between 1 and 100 attendees');
      }

      // RPC call with parameters matching database function signature
      const { data, error } = await supabase.rpc('update_meeting', {
        p_description: meetingData.description?.trim() || null,
        p_duration_minutes: meetingData.duration_minutes,
        p_meeting_url: meetingData.meeting_url.trim(),
        p_scheduled_at: meetingData.scheduled_at,
        p_title: meetingData.title.trim(),
        p_capacity: meetingData.capacity,
        p_level_code: meetingData.level_code,
        p_meeting_id: meetingId
      });

      if (error) {
        console.error('Error updating meeting:', error);
        // Provide user-friendly error messages
        if (error.message?.includes('Permission denied')) {
          throw new Error('You do not have permission to update meetings. Admin access required.');
        }
        if (error.message?.includes('not found')) {
          throw new Error('Meeting not found or you do not have permission to update it.');
        }
        if (error.message?.includes('Meeting is full')) {
          throw new Error(error.message);
        }
        throw new Error(error.message || 'Failed to update meeting. Please try again.');
      }

      if (!data) {
        throw new Error('Meeting was updated but no data was returned. Please refresh the page.');
      }

      return data;
    } catch (error) {
      console.error('Error in updateMeeting:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred while updating the meeting');
    }
  }

  /**
   * Hide meeting (admin only)
   */
  static async hideMeeting(meetingId: string): Promise<AdminMeeting> {
    try {
      const { data, error } = await supabase.rpc('hide_meeting', {
        p_meeting_id: meetingId
      });

      if (error) {
        console.error('Error hiding meeting:', error);
        throw new Error(error.message || 'Failed to hide meeting. Please try again.');
      }

      return data;
    } catch (error) {
      console.error('Error in hideMeeting:', error);
      throw error;
    }
  }

  /**
   * Unhide meeting (admin only)
   */
  static async unhideMeeting(meetingId: string): Promise<AdminMeeting> {
    try {
      const { data, error } = await supabase.rpc('unhide_meeting', {
        p_meeting_id: meetingId
      });

      if (error) {
        console.error('Error unhiding meeting:', error);
        throw new Error(error.message || 'Failed to unhide meeting. Please try again.');
      }

      return data;
    } catch (error) {
      console.error('Error in unhideMeeting:', error);
      throw error;
    }
  }

  /**
   * Delete meeting (admin only)
   */
  static async deleteMeeting(meetingId: string): Promise<AdminMeeting> {
    try {
      const { data, error } = await supabase.rpc('delete_meeting', {
        p_meeting_id: meetingId
      });

      if (error) {
        console.error('Error deleting meeting:', error);
        throw new Error(error.message || 'Failed to delete meeting. Please try again.');
      }

      return data;
    } catch (error) {
      console.error('Error in deleteMeeting:', error);
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
   * Get RSVP counts for a meeting (admin only)
   */
  static async getMeetingRSVPs(meetingId: string): Promise<{
    yes: number;
    no: number;
    maybe: number;
    total: number;
  }> {
    try {
      const { data, error } = await supabase
        .from('meeting_rsvps')
        .select('status')
        .eq('meeting_id', meetingId);

      if (error) {
        console.error('Error fetching meeting RSVPs:', error);
        throw error;
      }

      const counts = {
        yes: 0,
        no: 0,
        maybe: 0,
        total: data?.length || 0
      };

      data?.forEach(rsvp => {
        counts[rsvp.status as keyof typeof counts]++;
      });

      return counts;
    } catch (error) {
      console.error('Error in getMeetingRSVPs:', error);
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