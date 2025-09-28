/**
 * Admin Meetings Management Page
 * Full CRUD interface for managing meetings
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, Clock, Users, ExternalLink, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useMeetings, useAdminRole } from '@/hooks/useMeetings';
import { MeetingsService, type AdminMeeting, type CreateMeetingData, type UpdateMeetingData } from '@/services/meetingsService';
import { meetingNotifications } from '@/services/meetingNotifications';

export default function MeetingsAdminPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin, isLoading: adminLoading } = useAdminRole();
  const { meetings, isLoading, error, createMeeting, updateMeeting, deleteMeeting } = useMeetings();

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState<AdminMeeting | null>(null);
  const [formData, setFormData] = useState<CreateMeetingData>({
    title: '',
    description: '',
    meeting_url: '',
    scheduled_at: '',
    duration_minutes: 60
  });

  // Redirect non-admins
  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      navigate('/');
      toast({
        title: 'Access Denied',
        description: 'Admin privileges required to access this page.',
        variant: 'destructive'
      });
    }
  }, [isAdmin, adminLoading, navigate, toast]);

  // Don't render anything while checking admin status
  if (adminLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect via useEffect
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      meeting_url: '',
      scheduled_at: '',
      duration_minutes: 60
    });
    setEditingMeeting(null);
  };

  const handleCreateMeeting = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createMeeting(formData);
      setShowCreateDialog(false);
      resetForm();
      toast({
        title: 'Success',
        description: 'Meeting created successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create meeting.',
        variant: 'destructive'
      });
    }
  };

  const handleUpdateMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMeeting) return;

    try {
      const updateData: UpdateMeetingData = {
        ...formData,
        is_active: editingMeeting.is_active
      };
      await updateMeeting(editingMeeting.id, updateData);
      setEditingMeeting(null);
      resetForm();
      toast({
        title: 'Success',
        description: 'Meeting updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update meeting.',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteMeeting = async (meetingId: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await deleteMeeting(meetingId);
      toast({
        title: 'Success',
        description: 'Meeting deleted successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete meeting.',
        variant: 'destructive'
      });
    }
  };

  const handleToggleActive = async (meeting: AdminMeeting) => {
    try {
      const updateData: UpdateMeetingData = {
        title: meeting.title,
        description: meeting.description || '',
        meeting_url: meeting.meeting_url,
        scheduled_at: meeting.scheduled_at,
        duration_minutes: meeting.duration_minutes,
        is_active: !meeting.is_active
      };
      await updateMeeting(meeting.id, updateData);
      toast({
        title: 'Success',
        description: `Meeting ${updateData.is_active ? 'activated' : 'deactivated'} successfully.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update meeting.',
        variant: 'destructive'
      });
    }
  };

  const openEditDialog = (meeting: AdminMeeting) => {
    setEditingMeeting(meeting);
    setFormData({
      title: meeting.title,
      description: meeting.description || '',
      meeting_url: meeting.meeting_url,
      scheduled_at: meeting.scheduled_at,
      duration_minutes: meeting.duration_minutes
    });
  };

  const formatDateTime = (isoString: string) => {
    return new Date(isoString).toLocaleString();
  };

  const getStatusBadge = (meeting: AdminMeeting) => {
    const timeInfo = MeetingsService.getTimeUntilMeeting(meeting.scheduled_at);

    if (!meeting.is_active) {
      return <Badge variant="secondary">Inactive</Badge>;
    }

    if (timeInfo.isLive) {
      return <Badge className="bg-green-600">Live</Badge>;
    }

    if (timeInfo.isPast) {
      return <Badge variant="outline">Ended</Badge>;
    }

    return <Badge className="bg-blue-600">Upcoming</Badge>;
  };

  const testNotifications = async () => {
    try {
      await meetingNotifications.testNotification();
      toast({
        title: 'Test Notification',
        description: 'Check your browser for the test notification.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send test notification.',
        variant: 'destructive'
      });
    }
  };

  if (error) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-600">
              <p>Error loading meetings: {error}</p>
              <Button onClick={() => window.location.reload()} className="mt-4">
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin: Meetings Management</h1>
          <p className="text-gray-600 mt-1">Create and manage scheduled meetings</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={testNotifications}
            className="hidden sm:flex"
          >
            Test Notifications
          </Button>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Create Meeting
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Meeting</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateMeeting} className="space-y-4">
                <div>
                  <Label htmlFor="title">Meeting Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Weekly team standup"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Discuss weekly goals and blockers..."
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="meeting_url">Meeting URL</Label>
                  <Input
                    id="meeting_url"
                    type="url"
                    value={formData.meeting_url}
                    onChange={(e) => setFormData({...formData, meeting_url: e.target.value})}
                    placeholder="https://meet.google.com/abc-def-ghi"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="scheduled_at">Scheduled Time</Label>
                  <Input
                    id="scheduled_at"
                    type="datetime-local"
                    value={formData.scheduled_at}
                    onChange={(e) => setFormData({...formData, scheduled_at: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Select
                    value={formData.duration_minutes.toString()}
                    onValueChange={(value) => setFormData({...formData, duration_minutes: parseInt(value)})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">Create Meeting</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateDialog(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{meetings.length}</p>
                <p className="text-sm text-gray-600">Total Meetings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {meetings.filter(m => {
                    const timeInfo = MeetingsService.getTimeUntilMeeting(m.scheduled_at);
                    return timeInfo.isUpcoming && m.is_active;
                  }).length}
                </p>
                <p className="text-sm text-gray-600">Upcoming</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{meetings.filter(m => m.is_active).length}</p>
                <p className="text-sm text-gray-600">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meetings List */}
      <Card>
        <CardHeader>
          <CardTitle>All Meetings</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : meetings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No meetings scheduled yet.</p>
              <p className="text-sm">Create your first meeting to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {meetings.map((meeting) => (
                <Card key={meeting.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{meeting.title}</h3>
                          {getStatusBadge(meeting)}
                        </div>

                        <div className="text-sm text-gray-600 space-y-1">
                          <p className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {formatDateTime(meeting.scheduled_at)}
                          </p>
                          <p className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {meeting.duration_minutes} minutes
                          </p>
                          {meeting.description && (
                            <p className="mt-2 text-gray-700">{meeting.description}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(meeting.meeting_url, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Join
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditDialog(meeting)}
                        >
                          <Edit2 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleActive(meeting)}
                        >
                          {meeting.is_active ? (
                            <><EyeOff className="h-4 w-4 mr-1" />Hide</>
                          ) : (
                            <><Eye className="h-4 w-4 mr-1" />Show</>
                          )}
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteMeeting(meeting.id, meeting.title)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      {editingMeeting && (
        <Dialog open={!!editingMeeting} onOpenChange={() => setEditingMeeting(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Meeting</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdateMeeting} className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Meeting Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="edit-meeting_url">Meeting URL</Label>
                <Input
                  id="edit-meeting_url"
                  type="url"
                  value={formData.meeting_url}
                  onChange={(e) => setFormData({...formData, meeting_url: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-scheduled_at">Scheduled Time</Label>
                <Input
                  id="edit-scheduled_at"
                  type="datetime-local"
                  value={formData.scheduled_at}
                  onChange={(e) => setFormData({...formData, scheduled_at: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-duration">Duration (minutes)</Label>
                <Select
                  value={formData.duration_minutes.toString()}
                  onValueChange={(value) => setFormData({...formData, duration_minutes: parseInt(value)})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-active"
                  checked={editingMeeting.is_active}
                  onCheckedChange={(checked) =>
                    setEditingMeeting({...editingMeeting, is_active: checked})
                  }
                />
                <Label htmlFor="edit-active">Meeting is active</Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">Update Meeting</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingMeeting(null)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}