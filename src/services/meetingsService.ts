/**
 * Meetings Service
 * Handles all API calls for admin meetings system
 */

import { supabase } from '@/integrations/supabase/client';

export interface AdminMeeting {
  id: string;
  title: string;
  description: string | null;
  meeting_url: string;
  scheduled_at: string; // ISO timestamp
  duration_minutes: number;
  created_by: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
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
}

export interface UpdateMeetingData extends CreateMeetingData {
  is_active: boolean;
}

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
   * Get all active meetings for users, all meetings for admins
   */
  static async getMeetings(): Promise<AdminMeeting[]> {
    try {
      const isAdmin = await this.isAdmin();

      let query = supabase
        .from('meetings')
        .select('*')
        .order('scheduled_at', { ascending: true });

      // Non-admins only see active meetings
      if (!isAdmin) {
        query = query.eq('is_active', true);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching meetings:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getMeetings:', error);
      throw error;
    }
  }

  /**
   * Get upcoming meetings (next 7 days)
   */
  static async getUpcomingMeetings(): Promise<AdminMeeting[]> {
    try {
      const now = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(now.getDate() + 7);

      const { data, error } = await supabase
        .from('meetings')
        .select('*')
        .eq('is_active', true)
        .gte('scheduled_at', now.toISOString())
        .lte('scheduled_at', nextWeek.toISOString())
        .order('scheduled_at', { ascending: true })
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

      const { data, error } = await supabase.rpc('create_meeting', {
        p_title: meetingData.title.trim(),
        p_description: meetingData.description?.trim() || null,
        p_meeting_url: meetingData.meeting_url.trim(),
        p_scheduled_at: meetingData.scheduled_at,
        p_duration_minutes: meetingData.duration_minutes
      });

      if (error) {
        console.error('Error creating meeting:', error);
        // Provide user-friendly error messages
        if (error.message?.includes('Permission denied')) {
          throw new Error('You do not have permission to create meetings. Admin access required.');
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

      const { data, error } = await supabase.rpc('update_meeting', {
        p_meeting_id: meetingId,
        p_title: meetingData.title.trim(),
        p_description: meetingData.description?.trim() || null,
        p_meeting_url: meetingData.meeting_url.trim(),
        p_scheduled_at: meetingData.scheduled_at,
        p_duration_minutes: meetingData.duration_minutes,
        p_is_active: meetingData.is_active
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
   * Delete meeting (admin only)
   */
  static async deleteMeeting(meetingId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase.rpc('delete_meeting', {
        p_meeting_id: meetingId
      });

      if (error) {
        console.error('Error deleting meeting:', error);
        throw error;
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
   * Format meeting time for display
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
   * Get time until meeting starts (for countdown)
   */
  static getTimeUntilMeeting(isoTimestamp: string): {
    isLive: boolean;
    isUpcoming: boolean;
    isPast: boolean;
    timeString: string;
  } {
    const meetingTime = new Date(isoTimestamp);
    const now = new Date();
    const diff = meetingTime.getTime() - now.getTime();

    // Meeting is in the past
    if (diff < 0) {
      return {
        isLive: false,
        isUpcoming: false,
        isPast: true,
        timeString: 'Meeting ended'
      };
    }

    // Meeting is starting soon (within 5 minutes)
    const fiveMinutes = 5 * 60 * 1000;
    if (diff <= fiveMinutes) {
      return {
        isLive: true,
        isUpcoming: false,
        isPast: false,
        timeString: 'Join now'
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
      timeString: `in ${timeString}`
    };
  }
}