/**
 * React hooks for meetings functionality
 * Admin CRUD functionality removed - admins use Supabase Studio
 */

import { useState, useEffect, useCallback } from 'react';
import { MeetingsService, type AdminMeeting, type MeetingRSVP } from '@/services/meetingsService';

export function useUpcomingMeetings() {
  const [meetings, setMeetings] = useState<AdminMeeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUpcomingMeetings = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await MeetingsService.getUpcomingMeetings();
      setMeetings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load upcoming meetings');
      console.error('Error loading upcoming meetings:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUpcomingMeetings();

    // Refresh every minute to update countdowns
    const interval = setInterval(loadUpcomingMeetings, 60000);

    // Subscribe to realtime changes
    const subscription = MeetingsService.subscribeToMeetings(() => {
      loadUpcomingMeetings();
    });

    return () => {
      clearInterval(interval);
      subscription.unsubscribe();
    };
  }, [loadUpcomingMeetings]);

  return {
    upcomingMeetings: meetings,
    isLoading,
    error,
    refreshUpcomingMeetings: loadUpcomingMeetings
  };
}

export function useMeetingRSVP(meetingId: string) {
  const [rsvp, setRsvp] = useState<MeetingRSVP | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRSVP = useCallback(async () => {
    if (!meetingId) return;

    try {
      setIsLoading(true);
      setError(null);
      const data = await MeetingsService.getUserRSVP(meetingId);
      setRsvp(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load RSVP');
    } finally {
      setIsLoading(false);
    }
  }, [meetingId]);

  useEffect(() => {
    loadRSVP();
  }, [loadRSVP]);

  const setRSVPStatus = useCallback(async (status: 'yes' | 'no' | 'maybe') => {
    try {
      setError(null);
      const updatedRSVP = await MeetingsService.setRSVP(meetingId, status);
      setRsvp(updatedRSVP);
      return updatedRSVP;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update RSVP';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [meetingId]);

  return {
    rsvp,
    isLoading,
    error,
    setRSVPStatus,
    refreshRSVP: loadRSVP
  };
}