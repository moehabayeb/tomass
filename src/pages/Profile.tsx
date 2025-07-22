import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Edit2, LogOut, User, Mail, Trophy, Calendar, Upload, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthReady } from '@/hooks/useAuthReady';
import { useUserData } from '@/hooks/useUserData';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { AvatarDisplay } from '@/components/AvatarDisplay';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Reminder {
  id: string;
  meeting_title: string;
  scheduled_at: string;
  reminder_type: string;
}

interface ProfileData {
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
}

export default function Profile() {
  const { user, session, isAuthenticated, isLoading, signOut } = useAuthReady();
  const { userProfile } = useUserData();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [isLoadingReminders, setIsLoadingReminders] = useState(true);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use fallback values for gamification data since we're now auth-based
  const level = userProfile?.level || 1;
  const totalXP = userProfile?.xp || 0;
  const streakData = {
    currentStreak: userProfile?.currentStreak || 0,
    bestStreak: userProfile?.bestStreak || 0
  };
  
  const getXPProgress = () => {
    const xpPerLevel = 500;
    const currentLevelBase = (level - 1) * xpPerLevel;
    const nextLevelBase = level * xpPerLevel;
    const current = totalXP - currentLevelBase;
    const max = nextLevelBase - currentLevelBase;
    return {
      current: Math.max(0, current),
      max,
      percentage: Math.max(0, (current / max) * 100)
    };
  };

  const getStreakMessage = () => {
    const { currentStreak } = streakData;
    if (currentStreak === 0) return "Start your learning streak today!";
    if (currentStreak === 1) return "🔥 Day 1 - Great start!";
    if (currentStreak < 7) return `🔥 Day ${currentStreak} - Keep going!`;
    if (currentStreak === 7) return "🎉 Week completed! Amazing!";
    if (currentStreak < 30) return `🔥 ${currentStreak} days strong!`;
    return `👑 ${currentStreak} days - Legendary!`;
  };

  const xpProgress = getXPProgress();

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/auth', { 
        state: { returnTo: location.pathname }
      });
    }
  }, [isLoading, isAuthenticated, navigate, location.pathname]);

  // Load user reminders
  useEffect(() => {
    const loadReminders = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('user_reminders')
          .select(`
            id,
            reminder_type,
            meetings!inner(
              title,
              scheduled_at
            )
          `)
          .eq('user_id', user.id)
          .eq('is_sent', false)
          .order('meetings(scheduled_at)', { ascending: true });

        if (error) throw error;

        const formattedReminders = data?.map(reminder => ({
          id: reminder.id,
          meeting_title: reminder.meetings.title,
          scheduled_at: reminder.meetings.scheduled_at,
          reminder_type: reminder.reminder_type
        })) || [];

        setReminders(formattedReminders);
      } catch (error) {
        console.error('Error loading reminders:', error);
      } finally {
        setIsLoadingReminders(false);
      }
    };

    loadReminders();
  }, [user]);

  // Load user profile from Supabase
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('user_id, full_name, avatar_url')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        setProfile(data);
        if (data?.full_name) {
          setEditedName(data.full_name);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    loadProfile();
  }, [user]);

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) throw error;
      
      // Clear any stored state
      localStorage.removeItem('streakData');
      localStorage.removeItem('recommendedStartLevel');
      localStorage.removeItem('recommendedStartModule');
      
      toast({
        title: "Logged out successfully",
        description: "See you next time!",
      });
      
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error signing out",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateName = async () => {
    if (!user || !editedName.trim()) return;
    
    setIsUpdatingProfile(true);
    try {
      // Update the profiles table in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: editedName.trim() })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your name has been updated successfully.",
      });
      
      setIsEditingName(false);
      // Force a page refresh to update the UI
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error updating profile",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPG, PNG, or WebP image.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 2MB.",
        variant: "destructive",
      });
      return;
    }

    setIsUploadingAvatar(true);
    try {
      // Delete existing avatar if it exists
      if (profile?.avatar_url) {
        const oldPath = profile.avatar_url.split('/').pop();
        if (oldPath) {
          await supabase.storage
            .from('avatars')
            .remove([`${user.id}/${oldPath}`]);
        }
      }

      // Upload new avatar
      const fileExt = file.name.split('.').pop();
      const fileName = `avatar-${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      toast({
        title: "Avatar updated",
        description: "Your profile picture has been updated successfully.",
      });

      // Force a page refresh to update the UI
      window.location.reload();
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload avatar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploadingAvatar(false);
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveAvatar = async () => {
    if (!user || !profile?.avatar_url) return;

    setIsUploadingAvatar(true);
    try {
      // Delete from storage
      const oldPath = profile.avatar_url.split('/').pop();
      if (oldPath) {
        await supabase.storage
          .from('avatars')
          .remove([`${user.id}/${oldPath}`]);
      }

      // Update profile to remove avatar URL
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: null })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Avatar removed",
        description: "Your profile picture has been removed.",
      });

      // Force a page refresh to update the UI
      window.location.reload();
    } catch (error) {
      console.error('Error removing avatar:', error);
      toast({
        title: "Remove failed",
        description: "Failed to remove avatar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  if (isLoading || isLoadingProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || !user || !profile) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-blue-900 to-indigo-900">
      {/* Background Stars Animation */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(2px 2px at 20px 30px, #fff, transparent), radial-gradient(2px 2px at 40px 70px, #fff, transparent), radial-gradient(1px 1px at 90px 40px, #fff, transparent)', 
          backgroundSize: '100px 100px' 
        }} 
      />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate('/?tab=meetings')}
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Meetings
          </Button>
          
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
          
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="text-white border-white/20 hover:bg-white/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Info Card */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section with Upload */}
              <div className="space-y-4">
                <Label className="text-white/80">Profile Picture</Label>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <AvatarDisplay
                      level={level}
                      xp={Math.max(0, xpProgress.current)}
                      maxXP={xpProgress.max}
                      userName={profile.full_name || 'User'}
                      showXPBar={true}
                      size="lg"
                      avatarUrl={profile.avatar_url}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingAvatar}
                      size="sm"
                      variant="outline"
                      className="text-white border-white/20 hover:bg-white/10"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {isUploadingAvatar ? 'Uploading...' : 'Upload Photo'}
                    </Button>
                    {profile.avatar_url && (
                      <Button
                        onClick={handleRemoveAvatar}
                        disabled={isUploadingAvatar}
                        size="sm"
                        variant="outline"
                        className="text-red-300 border-red-300/20 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    )}
                  </div>
                  <p className="text-white/60 text-xs text-center">
                    JPG, PNG, or WebP up to 2MB
                  </p>
                </div>
              </div>

              {/* Name Field */}
              <div className="space-y-2">
                <Label className="text-white/80">Full Name</Label>
                {isEditingName ? (
                  <div className="flex gap-2">
                    <Input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="bg-white/5 border-white/20 text-white"
                      placeholder="Enter your name"
                    />
                    <Button
                      onClick={handleUpdateName}
                      disabled={isUpdatingProfile || !editedName.trim()}
                      size="sm"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditingName(false);
                        setEditedName(profile.full_name || '');
                      }}
                      variant="outline"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-md border border-white/20">
                     <span className="text-white">
                       {profile.full_name || 'No name set'}
                     </span>
                    <Button
                      onClick={() => setIsEditingName(true)}
                      variant="ghost"
                      size="sm"
                      className="text-white/70 hover:text-white"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label className="text-white/80">Email</Label>
                <div className="flex items-center gap-2 p-3 bg-white/5 rounded-md border border-white/20">
                  <Mail className="h-4 w-4 text-white/60" />
                  <span className="text-white">{user.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Learning Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Level & XP */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/5 rounded-lg border border-white/20">
                  <div className="text-2xl font-bold text-white">Level {level}</div>
                  <div className="text-white/60 text-sm">Current Level</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg border border-white/20">
                  <div className="text-2xl font-bold text-white">{totalXP}</div>
                  <div className="text-white/60 text-sm">Total XP</div>
                </div>
              </div>

              {/* Streak Info */}
              <div className="p-4 bg-white/5 rounded-lg border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Current Streak</span>
                  <Badge variant="secondary" className="bg-orange-500/20 text-orange-300">
                    {streakData.currentStreak} days
                  </Badge>
                </div>
                <div className="text-white/60 text-sm">{getStreakMessage()}</div>
                <Separator className="my-2 bg-white/20" />
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Best Streak</span>
                  <span className="text-white">{streakData.bestStreak} days</span>
                </div>
              </div>

              {/* XP Progress */}
              <div className="p-4 bg-white/5 rounded-lg border border-white/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">Progress to Level {level + 1}</span>
                  <span className="text-white/60 text-sm">
                    {Math.max(0, xpProgress.current)} / {xpProgress.max} XP
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.max(0, xpProgress.percentage)}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reminders Card */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Meeting Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingReminders ? (
                <div className="text-white/60 text-center py-4">Loading reminders...</div>
              ) : reminders.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-white/40 mx-auto mb-3" />
                  <div className="text-white/60">No upcoming reminders</div>
                  <div className="text-white/40 text-sm mt-1">
                    Set reminders for meetings to see them here
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {reminders.map((reminder) => (
                    <div
                      key={reminder.id}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/20"
                    >
                      <div>
                        <div className="text-white font-medium">{reminder.meeting_title}</div>
                        <div className="text-white/60 text-sm">
                          {formatDate(reminder.scheduled_at)}
                        </div>
                      </div>
                      <Badge variant="outline" className="border-white/20 text-white/70">
                        {reminder.reminder_type}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}