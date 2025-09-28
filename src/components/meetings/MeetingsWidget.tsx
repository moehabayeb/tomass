/**
 * Meetings Widget - User-facing component
 * Shows upcoming meetings with countdown and join button
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ExternalLink, Users, Bell, BellOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUpcomingMeetings, useMeetingRSVP } from '@/hooks/useMeetings';
import { MeetingsService, type AdminMeeting } from '@/services/meetingsService';
import { meetingNotifications } from '@/services/meetingNotifications';

interface MeetingCardProps {
  meeting: AdminMeeting;
  onJoin: (url: string) => void;
}

function MeetingCard({ meeting, onJoin }: MeetingCardProps) {
  const [timeInfo, setTimeInfo] = useState(MeetingsService.getTimeUntilMeeting(meeting.scheduled_at));
  const { rsvp, setRSVPStatus } = useMeetingRSVP(meeting.id);

  // Update countdown every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeInfo(MeetingsService.getTimeUntilMeeting(meeting.scheduled_at));
    }, 60000);

    return () => clearInterval(interval);
  }, [meeting.scheduled_at]);

  const handleRSVP = async (status: 'yes' | 'no' | 'maybe') => {
    try {
      await setRSVPStatus(status);
    } catch (error) {
      console.error('Failed to update RSVP:', error);
    }
  };

  const getRSVPButton = () => {
    const currentStatus = rsvp?.status;

    return (
      <div className="flex gap-1">
        <Button
          size="sm"
          variant={currentStatus === 'yes' ? 'default' : 'outline'}
          onClick={() => handleRSVP('yes')}
          className="text-xs px-2 py-1"
        >
          ✓
        </Button>
        <Button
          size="sm"
          variant={currentStatus === 'maybe' ? 'default' : 'outline'}
          onClick={() => handleRSVP('maybe')}
          className="text-xs px-2 py-1"
        >
          ?
        </Button>
        <Button
          size="sm"
          variant={currentStatus === 'no' ? 'default' : 'outline'}
          onClick={() => handleRSVP('no')}
          className="text-xs px-2 py-1"
        >
          ✗
        </Button>
      </div>
    );
  };

  const getStatusBadge = () => {
    if (timeInfo.isLive) {
      return <Badge className="bg-green-600 animate-pulse">Live Now</Badge>;
    }
    if (timeInfo.isUpcoming) {
      return <Badge className="bg-blue-600">{timeInfo.timeString}</Badge>;
    }
    return <Badge variant="outline">Ended</Badge>;
  };

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-sm leading-tight">{meeting.title}</h4>
              <p className="text-xs text-gray-600 mt-1">
                {MeetingsService.formatMeetingTime(meeting.scheduled_at)}
              </p>
            </div>
            {getStatusBadge()}
          </div>

          {/* Description */}
          {meeting.description && (
            <p className="text-xs text-gray-700 line-clamp-2">
              {meeting.description}
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between">
            {getRSVPButton()}
            <Button
              size="sm"
              onClick={() => onJoin(meeting.meeting_url)}
              disabled={timeInfo.isPast}
              className={timeInfo.isLive ? 'bg-green-600 hover:bg-green-700 animate-pulse' : ''}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              {timeInfo.isLive ? 'Join Now' : 'Join'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface MeetingsWidgetProps {
  className?: string;
  showHeader?: boolean;
  maxMeetings?: number;
}

export function MeetingsWidget({
  className = '',
  showHeader = true,
  maxMeetings = 3
}: MeetingsWidgetProps) {
  const { upcomingMeetings, isLoading, error } = useUpcomingMeetings();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Check notification permission status
  useEffect(() => {
    const checkNotificationStatus = () => {
      setNotificationsEnabled(meetingNotifications.getPermissionStatus() === 'granted');
    };

    checkNotificationStatus();

    // Check every few seconds in case permission changes
    const interval = setInterval(checkNotificationStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleJoinMeeting = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleToggleNotifications = async () => {
    if (notificationsEnabled) {
      meetingNotifications.stopNotificationService();
      setNotificationsEnabled(false);
    } else {
      const started = await meetingNotifications.startNotificationService();
      setNotificationsEnabled(started);
    }
  };

  // Don't render if no meetings and loading finished
  if (!isLoading && upcomingMeetings.length === 0) {
    return null;
  }

  // Don't render if there's an error
  if (error) {
    console.error('Meetings widget error:', error);
    return null;
  }

  const displayMeetings = upcomingMeetings.slice(0, maxMeetings);

  return (
    <Card className={className}>
      {showHeader && (
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Meetings
            </CardTitle>

            {/* Notification toggle */}
            <Button
              size="sm"
              variant="outline"
              onClick={handleToggleNotifications}
              className="flex items-center gap-1"
            >
              {notificationsEnabled ? (
                <Bell className="h-4 w-4" />
              ) : (
                <BellOff className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">
                {notificationsEnabled ? 'On' : 'Off'}
              </span>
            </Button>
          </div>
        </CardHeader>
      )}

      <CardContent className={showHeader ? 'pt-0' : ''}>
        {isLoading ? (
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
        ) : displayMeetings.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No upcoming meetings</p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayMeetings.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
                onJoin={handleJoinMeeting}
              />
            ))}

            {upcomingMeetings.length > maxMeetings && (
              <div className="text-center pt-2">
                <p className="text-xs text-gray-500">
                  +{upcomingMeetings.length - maxMeetings} more meetings
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Compact meetings notification badge
 * Shows in header/navigation
 */
interface MeetingsNotificationBadgeProps {
  className?: string;
}

export function MeetingsNotificationBadge({ className = '' }: MeetingsNotificationBadgeProps) {
  const { upcomingMeetings, isLoading } = useUpcomingMeetings();
  const [liveMeetings, setLiveMeetings] = useState<AdminMeeting[]>([]);

  useEffect(() => {
    const updateLiveMeetings = () => {
      const live = upcomingMeetings.filter(meeting => {
        const timeInfo = MeetingsService.getTimeUntilMeeting(meeting.scheduled_at);
        return timeInfo.isLive;
      });
      setLiveMeetings(live);
    };

    updateLiveMeetings();

    // Update every minute
    const interval = setInterval(updateLiveMeetings, 60000);

    return () => clearInterval(interval);
  }, [upcomingMeetings]);

  if (isLoading || upcomingMeetings.length === 0) {
    return null;
  }

  const nextMeeting = upcomingMeetings[0];
  const timeInfo = MeetingsService.getTimeUntilMeeting(nextMeeting.scheduled_at);

  return (
    <div className={`relative ${className}`}>
      <Button
        size="sm"
        variant={timeInfo.isLive ? 'default' : 'outline'}
        className={`${timeInfo.isLive ? 'bg-green-600 hover:bg-green-700 animate-pulse' : ''}`}
        onClick={() => window.open(nextMeeting.meeting_url, '_blank')}
      >
        <Calendar className="h-4 w-4 mr-1" />
        {timeInfo.isLive ? 'Join Live Meeting' : `Meeting ${timeInfo.timeString}`}
      </Button>

      {liveMeetings.length > 0 && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold animate-pulse">
          {liveMeetings.length}
        </div>
      )}
    </div>
  );
}

export default MeetingsWidget;