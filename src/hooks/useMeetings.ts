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
      // Apple Store Compliance: Silent fail with error state
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
    // 🔧 CRITICAL FIX: loadUpcomingMeetings is stable (useCallback with empty deps)
    // Including it in deps causes infinite loop. Run only on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // 🔧 CRITICAL FIX: Depend directly on primitive meetingId instead of memoized function
    // This prevents unnecessary re-runs when loadRSVP reference changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingId]);

  const setRSVPStatus = useCallback(async (status: 'yes' | 'no' | 'maybe') => {
    // Store previous state for rollback on failure
    const previousRSVP = rsvp;

    try {
      setError(null);

      // Optimistic update: Update UI immediately for better UX
      setRsvp(prevRSVP => prevRSVP ? { ...prevRSVP, status } : null);

      // Make API call
      const updatedRSVP = await MeetingsService.setRSVP(meetingId, status);

      // Update with server response
      setRsvp(updatedRSVP);
      return updatedRSVP;
    } catch (err) {
      // Rollback to previous state on failure
      setRsvp(previousRSVP);

      const errorMsg = err instanceof Error ? err.message : 'Failed to update RSVP';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [meetingId, rsvp]);

  return {
    rsvp,
    isLoading,
    error,
    setRSVPStatus,
    refreshRSVP: loadRSVP
  };
}