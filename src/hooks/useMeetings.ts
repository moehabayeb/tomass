/**
 * React hooks for meetings functionality
 */

import { useState, useEffect, useCallback } from 'react';
import { MeetingsService, type AdminMeeting, type MeetingRSVP, type CreateMeetingData, type UpdateMeetingData } from '@/services/meetingsService';

export function useMeetings() {
  const [meetings, setMeetings] = useState<AdminMeeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMeetings = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await MeetingsService.getMeetings();
      setMeetings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load meetings');
      console.error('Error loading meetings:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMeetings();

    // Subscribe to realtime changes
    const subscription = MeetingsService.subscribeToMeetings((payload) => {
      console.log('Meeting change:', payload);
      loadMeetings(); // Refresh data on any change
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [loadMeetings]);

  const createMeeting = useCallback(async (meetingData: CreateMeetingData) => {
    try {
      setError(null);
      const newMeeting = await MeetingsService.createMeeting(meetingData);
      await loadMeetings(); // Refresh list
      return newMeeting;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create meeting';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [loadMeetings]);

  const updateMeeting = useCallback(async (meetingId: string, meetingData: UpdateMeetingData) => {
    try {
      setError(null);
      const updatedMeeting = await MeetingsService.updateMeeting(meetingId, meetingData);
      await loadMeetings(); // Refresh list
      return updatedMeeting;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update meeting';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [loadMeetings]);

  const hideMeeting = useCallback(async (meetingId: string) => {
    try {
      setError(null);
      await MeetingsService.hideMeeting(meetingId);
      await loadMeetings(); // Refresh list
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to hide meeting';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [loadMeetings]);

  const unhideMeeting = useCallback(async (meetingId: string) => {
    try {
      setError(null);
      await MeetingsService.unhideMeeting(meetingId);
      await loadMeetings(); // Refresh list
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to unhide meeting';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [loadMeetings]);

  const deleteMeeting = useCallback(async (meetingId: string) => {
    try {
      setError(null);
      await MeetingsService.deleteMeeting(meetingId);
      await loadMeetings(); // Refresh list
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to delete meeting';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [loadMeetings]);

  return {
    meetings,
    isLoading,
    error,
    loadMeetings,
    createMeeting,
    updateMeeting,
    hideMeeting,
    unhideMeeting,
    deleteMeeting
  };
}

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

export function useAdminRole() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const adminStatus = await MeetingsService.isAdmin();
        setIsAdmin(adminStatus);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to check admin status');
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  return {
    isAdmin,
    isLoading,
    error
  };
}