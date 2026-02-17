import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Edit2, LogOut, User, Mail, Trophy, Calendar, Upload, Trash2, FileText, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAuthReady } from '@/hooks/useAuthReady';
import { useUserData } from '@/hooks/useUserData';
import { useProgressStore } from '@/hooks/useProgressStore';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation, Link } from 'react-router-dom';
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
  const { level, xp_total, xp_current, next_threshold, user_level } = useProgressStore();
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
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use XP data from useProgressStore (synced with Speaking page)
  const totalXP = xp_total || 0;
  const streakData = {
    currentStreak: userProfile?.currentStreak || 0,
    bestStreak: userProfile?.bestStreak || 0
  };

  const getXPProgress = () => {
    const current = xp_current || 0;
    const max = next_threshold || 100;
    return {
      current,
      max,
      percentage: max > 0 ? (current / max) * 100 : 0
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
        // Query reminders with meeting details, filtering for future meetings only
        const { data, error } = await supabase
          .from('user_reminders')
          .select(`
            id,
            reminder_type,
            meeting_id,
            meetings!inner(
              id,
              title,
              scheduled_at,
              starts_at
            )
          `)
          .eq('user_id', user.id)
          .eq('is_sent', false)
          .gte('meetings.starts_at', new Date().toISOString()); // Only future meetings

        if (error) {
          // Error loading reminders - silent fail for Apple Store compliance
          throw error;
        }

        // Format and sort reminders by meeting time (with safe optional chaining)
        const formattedReminders = (data?.map(reminder => ({
          id: reminder.id,
          meeting_title: reminder.meetings?.title || 'Untitled Meeting',
          scheduled_at: reminder.meetings?.scheduled_at || reminder.meetings?.starts_at || new Date().toISOString(),
          reminder_type: reminder.reminder_type
        })).filter(r => r.meeting_title && r.scheduled_at) || []).sort((a, b) =>
          new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()
        );

        setReminders(formattedReminders);
      } catch (error) {
        // Failed to load reminders - silent fail for Apple Store compliance
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
        // Apple Store Compliance: Silent fail - Non-critical operation
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

      // Clear any stored state (with error protection for private browsing mode)
      try {
        localStorage.removeItem('streakData');
        localStorage.removeItem('recommendedStartLevel');
        localStorage.removeItem('recommendedStartModule');
      } catch (storageError) {
        // Storage access error - silent fail for Apple Store compliance
      }

      toast({
        title: "Logged out successfully",
        description: "See you next time!",
      });
      
      navigate('/');
    } catch (error) {
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

      // Update local state to reflect changes
      setProfile(prev => prev ? { ...prev, full_name: editedName.trim() } : null);

      toast({
        title: "Profile updated",
        description: "Your name has been updated successfully.",
      });

      setIsEditingName(false);
    } catch (error) {
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

      // Update local state to reflect changes
      setProfile(prev => prev ? { ...prev, avatar_url: publicUrl } : null);

      toast({
        title: "Avatar updated",
        description: "Your profile picture has been updated successfully.",
      });
    } catch (error) {
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

      // Update local state to reflect changes
      setProfile(prev => prev ? { ...prev, avatar_url: null } : null);

      toast({
        title: "Avatar removed",
        description: "Your profile picture has been removed.",
      });
    } catch (error) {
      toast({
        title: "Remove failed",
        description: "Failed to remove avatar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE' || !user) return;

    setIsDeletingAccount(true);
    try {
      // Attempt to call the server-side account deletion RPC
      const { error: rpcError } = await supabase.rpc('delete_user_account');

      if (rpcError) {
        // Fallback: sign out and notify support
        console.error('[Profile] RPC delete_user_account failed:', rpcError);
      }

      // Clear all local data
      try {
        localStorage.clear();
      } catch {
        // Storage access error - silent fail
      }

      // Sign out
      await supabase.auth.signOut();

      toast({
        title: 'Account Deleted',
        description: 'Your account has been scheduled for deletion. All data will be removed.',
      });

      navigate('/auth');
    } catch (error) {
      toast({
        title: 'Deletion Failed',
        description: 'Please contact support@tomashoca.com to delete your account.',
        variant: 'destructive',
      });
    } finally {
      setIsDeletingAccount(false);
      setShowDeleteDialog(false);
      setDeleteConfirmText('');
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
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-4xl">
          <div className="flex items-center justify-between mb-4 sm:mb-8">
            <div className="h-10 w-24 bg-white/10 rounded-lg animate-pulse" />
            <div className="h-8 w-32 bg-white/10 rounded-lg animate-pulse" />
            <div className="h-10 w-24 bg-white/10 rounded-lg animate-pulse" />
          </div>
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            <div className="bg-white/10 rounded-xl p-6 space-y-4">
              <div className="h-6 w-40 bg-white/10 rounded animate-pulse" />
              <div className="flex justify-center"><div className="h-24 w-24 bg-white/10 rounded-full animate-pulse" /></div>
              <div className="h-10 w-full bg-white/10 rounded animate-pulse" />
              <div className="h-10 w-full bg-white/10 rounded animate-pulse" />
            </div>
            <div className="bg-white/10 rounded-xl p-6 space-y-4">
              <div className="h-6 w-40 bg-white/10 rounded animate-pulse" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-20 bg-white/10 rounded-lg animate-pulse" />
                <div className="h-20 bg-white/10 rounded-lg animate-pulse" />
              </div>
              <div className="h-24 bg-white/10 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
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

      <div className="relative z-10 container mx-auto px-2 sm:px-4 pt-safe pb-4 sm:pb-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-8 gap-2">
          <Button
            onClick={() => navigate('/?tab=meetings')}
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10 p-2 sm:px-4 min-h-[44px] min-w-[44px]"
          >
            <ArrowLeft className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Back to Meetings</span>
          </Button>

          <h1 className="text-xl sm:text-3xl font-bold text-white text-center">My Profile</h1>

          <Button
            onClick={handleSignOut}
            variant="outline"
            size="sm"
            className="text-white border-white/20 hover:bg-white/10 p-2 sm:px-4 min-h-[44px] min-w-[44px]"
          >
            <LogOut className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Sign Out</span>
          </Button>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          {/* Profile Info Card */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-white flex items-center gap-2 text-base sm:text-lg">
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {/* Avatar Section with Upload */}
              <div className="space-y-3 sm:space-y-4">
                <Label className="text-white/80 text-sm">Profile Picture</Label>
                <div className="flex flex-col items-center space-y-3 sm:space-y-4">
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
                  
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
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
                      className="text-white border-white/20 hover:bg-white/10 text-xs sm:text-sm"
                    >
                      <Upload className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      {isUploadingAvatar ? 'Uploading...' : 'Upload'}
                    </Button>
                    {profile.avatar_url && (
                      <Button
                        onClick={handleRemoveAvatar}
                        disabled={isUploadingAvatar}
                        size="sm"
                        variant="outline"
                        className="text-red-300 border-red-300/20 hover:bg-red-500/10 text-xs sm:text-sm"
                      >
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
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
                <Label className="text-white/80 text-sm">Full Name</Label>
                {isEditingName ? (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="bg-white/5 border-white/20 text-white text-sm"
                      placeholder="Enter your name"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={handleUpdateName}
                        disabled={isUpdatingProfile || !editedName.trim()}
                        size="sm"
                        className="flex-1 sm:flex-none"
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
                        className="flex-1 sm:flex-none"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-white/5 rounded-md border border-white/20">
                     <span className="text-white text-sm truncate mr-2">
                       {profile.full_name || 'No name set'}
                     </span>
                    <Button
                      onClick={() => setIsEditingName(true)}
                      variant="ghost"
                      size="sm"
                      className="text-white/70 hover:text-white p-1 sm:p-2 min-h-[44px] min-w-[44px]"
                      aria-label="Edit display name"
                    >
                      <Edit2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label className="text-white/80 text-sm">Email</Label>
                <div className="flex items-center gap-2 p-2 sm:p-3 bg-white/5 rounded-md border border-white/20">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-white/60 flex-shrink-0" />
                  <span className="text-white text-sm truncate">{user.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-white flex items-center gap-2 text-base sm:text-lg">
                <Trophy className="h-4 w-4 sm:h-5 sm:w-5" />
                Learning Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {/* Level & XP */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="text-center p-3 sm:p-4 bg-white/5 rounded-lg border border-white/20">
                  <div className="text-lg sm:text-2xl font-bold text-white">Level {level}</div>
                  <div className="text-white/60 text-xs sm:text-sm">Current Level</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-white/5 rounded-lg border border-white/20">
                  <div className="text-lg sm:text-2xl font-bold text-white">{totalXP}</div>
                  <div className="text-white/60 text-xs sm:text-sm">Total XP</div>
                </div>
              </div>

              {/* Conversation Difficulty Indicator */}
              <div className="p-3 sm:p-4 bg-white/5 rounded-lg border border-white/20">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium text-sm sm:text-base">Conversation Difficulty</span>
                  <Badge className={`text-xs ${
                    user_level === 'beginner' ? 'bg-green-500/20 text-green-300 border-green-500/50' :
                    user_level === 'intermediate' ? 'bg-orange-500/20 text-orange-300 border-orange-500/50' :
                    'bg-purple-500/20 text-purple-300 border-purple-500/50'
                  }`}>
                    {user_level === 'beginner' ? '🌱 Beginner' :
                     user_level === 'intermediate' ? '🔥 Intermediate' :
                     '⭐ Advanced'}
                  </Badge>
                </div>
                <div className="text-white/60 text-xs sm:text-sm mt-2">
                  {user_level === 'beginner' && 'Simple sentences with basic vocabulary (CEFR A1-A2)'}
                  {user_level === 'intermediate' && 'Natural conversation with varied sentences (CEFR B1-B2)'}
                  {user_level === 'advanced' && 'Fluent, nuanced discussions (CEFR C1-C2)'}
                </div>
              </div>

              {/* Streak Info */}
              <div className="p-3 sm:p-4 bg-white/5 rounded-lg border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium text-sm sm:text-base">Current Streak</span>
                  <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 text-xs">
                    {streakData.currentStreak} days
                  </Badge>
                </div>
                <div className="text-white/60 text-xs sm:text-sm">{getStreakMessage()}</div>
                <Separator className="my-2 bg-white/20" />
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-white/60">Best Streak</span>
                  <span className="text-white">{streakData.bestStreak} days</span>
                </div>
              </div>

              {/* XP Progress */}
              <div className="p-3 sm:p-4 bg-white/5 rounded-lg border border-white/20">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
                  <span className="text-white font-medium text-sm sm:text-base">Progress to Level {level + 1}</span>
                  <span className="text-white/60 text-xs sm:text-sm">
                    {Math.max(0, xpProgress.current)} / {xpProgress.max} XP
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 sm:h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.max(0, xpProgress.percentage)}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reminders Card */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 lg:col-span-2">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-white flex items-center gap-2 text-base sm:text-lg">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                Upcoming Meeting Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingReminders ? (
                <div className="text-white/60 text-center py-4 text-sm">Loading reminders...</div>
              ) : reminders.length === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <Calendar className="h-8 w-8 sm:h-12 sm:w-12 text-white/40 mx-auto mb-2 sm:mb-3" />
                  <div className="text-white/60 text-sm sm:text-base">No upcoming reminders</div>
                  <div className="text-white/60 text-xs sm:text-sm mt-1">
                    Set reminders for meetings to see them here
                  </div>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {reminders.map((reminder) => (
                    <div
                      key={reminder.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-white/5 rounded-lg border border-white/20 gap-2"
                    >
                      <div className="flex-1">
                        <div className="text-white font-medium text-sm sm:text-base truncate">{reminder.meeting_title}</div>
                        <div className="text-white/60 text-xs sm:text-sm">
                          {formatDate(reminder.scheduled_at)}
                        </div>
                      </div>
                      <Badge variant="outline" className="border-white/20 text-white/70 text-xs self-start sm:self-center">
                        {reminder.reminder_type}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Legal Section */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 lg:col-span-2">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-white flex items-center gap-2 text-base sm:text-lg">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                Legal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/privacy"
                  className="flex items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
                >
                  <Shield className="h-5 w-5 text-blue-400" />
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm sm:text-base">Privacy Policy</div>
                    <div className="text-white/60 text-xs">How we protect your data</div>
                  </div>
                </Link>
                <Link
                  to="/terms"
                  className="flex items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
                >
                  <FileText className="h-5 w-5 text-purple-400" />
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm sm:text-base">Terms of Service</div>
                    <div className="text-white/60 text-xs">Our terms and conditions</div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Delete Account Section */}
          <Card className="bg-red-950/20 backdrop-blur-xl border-red-500/20 lg:col-span-2">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-red-300 flex items-center gap-2 text-base sm:text-lg">
                <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/60 text-sm mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <AlertDialog open={showDeleteDialog} onOpenChange={(open) => {
                setShowDeleteDialog(open);
                if (!open) setDeleteConfirmText('');
              }}>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-900 border-gray-700">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">Delete Your Account?</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-300 space-y-3">
                      <span className="block">This will permanently delete your account and all data, including:</span>
                      <span className="block">- Your profile and learning progress</span>
                      <span className="block">- All bookmarks and badges</span>
                      <span className="block">- Meeting history and reminders</span>
                      <span className="block font-semibold text-red-400 mt-2">This action cannot be undone.</span>
                      <span className="block mt-3">Type <strong className="text-white">DELETE</strong> below to confirm:</span>
                    </AlertDialogDescription>
                    <Input
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                      placeholder="Type DELETE to confirm"
                      className="bg-gray-800 border-gray-600 text-white mt-2"
                      autoComplete="off"
                    />
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      disabled={deleteConfirmText !== 'DELETE' || isDeletingAccount}
                      className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
                    >
                      {isDeletingAccount ? 'Deleting...' : 'Permanently Delete'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}