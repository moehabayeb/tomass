import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Users, ChevronDown, ChevronUp, Bell, AlertCircle, LogIn, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuthReady } from '@/hooks/useAuthReady';

interface MeetingsAppProps {
  onBack: () => void;
}

interface Meeting {
  id: string;
  title: string;
  description?: string;
  teacher_name: string;
  focus_topic: string;
  scheduled_at: string;
  zoom_link: string;
  duration_minutes?: number;
  max_participants?: number;
}

interface UserReminder {
  id: string;
  meeting_id: string;
  reminder_type: string;
}

const faqData = [
  {
    question: "How do I join a live class?",
    answer: "The 'Join Zoom Class' button will be enabled 15 minutes before class starts. Click it to join directly!"
  },
  {
    question: "What if I miss a class?",
    answer: "Don't worry! All classes are recorded and available in your Lessons tab within 24 hours."
  },
  {
    question: "Can I ask questions during class?",
    answer: "Absolutely! Our teachers encourage questions and interaction. Use the chat or unmute yourself to participate."
  },
  {
    question: "What equipment do I need?",
    answer: "Just a device with internet, camera, and microphone. We recommend using headphones for better audio quality."
  }
];

export default function MeetingsApp({ onBack }: MeetingsAppProps) {
  const [nextMeeting, setNextMeeting] = useState<Meeting | null>(null);
  const [upcomingMeetings, setUpcomingMeetings] = useState<Meeting[]>([]);
  const [userReminders, setUserReminders] = useState<UserReminder[]>([]);
  const [timeUntilClass, setTimeUntilClass] = useState<string>('');
  const [canJoin, setCanJoin] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user, signOut } = useAuthReady();
  const navigate = useNavigate();

  // Load meetings and user data
  useEffect(() => {
    loadMeetingsData();
  }, []);

  const loadMeetingsData = async () => {
    try {
      setLoading(true);
      
      // Get all upcoming meetings
      const { data: meetings, error } = await supabase
        .from('meetings')
        .select('*')
        .gte('scheduled_at', new Date().toISOString())
        .eq('is_active', true)
        .order('scheduled_at', { ascending: true });

      if (error) {
        toast({
          title: "Error loading meetings",
          description: "Please try again later.",
          variant: "destructive"
        });
        return;
      }

      if (meetings && meetings.length > 0) {
        setNextMeeting(meetings[0]);
        setUpcomingMeetings(meetings.slice(1, 4)); // Next 3 after the first one
      }

      // Load user reminders if user is logged in
      if (user) {
        const { data: reminders } = await supabase
          .from('user_reminders')
          .select('*')
          .eq('user_id', user.id);
        
        if (reminders) {
          setUserReminders(reminders);
        }
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // Update countdown timer
  useEffect(() => {
    if (!nextMeeting) return;
    
    const updateCountdown = () => {
      const now = new Date();
      const classTime = new Date(nextMeeting.scheduled_at);
      const timeDiff = classTime.getTime() - now.getTime();
      
      if (timeDiff <= 0) {
        setTimeUntilClass('Class has started!');
        setCanJoin(true);
        return;
      }

      // Enable join button 15 minutes before class
      const fifteenMinutes = 15 * 60 * 1000;
      setCanJoin(timeDiff <= fifteenMinutes);

      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (hours > 0) {
        setTimeUntilClass(`Starts in ${hours}h ${minutes}m`);
      } else {
        setTimeUntilClass(`Starts in ${minutes}m`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [nextMeeting]);

  const handleJoinClass = () => {
    if (canJoin && nextMeeting) {
      window.open(nextMeeting.zoom_link, '_blank');
      toast({
        title: "Joining class...",
        description: "Opening Zoom in a new window. See you in class!",
      });
    }
  };

  const hasReminderForMeeting = (meetingId: string) => {
    return userReminders.some(reminder => reminder.meeting_id === meetingId);
  };

  const handleSetReminder = async () => {
    if (!nextMeeting) return;

    if (!isAuthenticated || !user) {
      toast({
        title: "Login required",
        description: "Please sign in to set reminders for classes.",
        variant: "destructive"
      });
      navigate('/auth?redirectTo=' + encodeURIComponent('/?tab=meetings'));
      return;
    }

    if (hasReminderForMeeting(nextMeeting.id)) {
      toast({
        title: "Reminder already set",
        description: "You've already set a reminder for this class.",
      });
      return;
    }

    try {
      // Try to use browser notifications first
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        
        if (permission === 'granted') {
          // Schedule browser notification
          const classTime = new Date(nextMeeting.scheduled_at);
          const reminderTime = new Date(classTime.getTime() - 15 * 60 * 1000); // 15 minutes before
          const now = new Date();
          
          if (reminderTime > now) {
            setTimeout(() => {
              new Notification('English Class Starting Soon!', {
                body: `${nextMeeting.title} starts in 15 minutes. Click to join!`,
                icon: '/favicon.ico',
                tag: nextMeeting.id
              });
            }, reminderTime.getTime() - now.getTime());
          }
        }
      }

      // Save reminder to database
      const { error } = await supabase
        .from('user_reminders')
        .insert({
          user_id: user.id,
          meeting_id: nextMeeting.id,
          reminder_type: 'browser'
        });

      if (error) {
        toast({
          title: "Error setting reminder",
          description: "Please try again.",
          variant: "destructive"
        });
        return;
      }

      // Update local state
      setUserReminders(prev => [...prev, {
        id: Date.now().toString(),
        meeting_id: nextMeeting.id,
        reminder_type: 'browser'
      }]);

      toast({
        title: "Reminder set!",
        description: "We'll notify you 15 minutes before class starts.",
      });
    } catch (error) {
      toast({
        title: "Reminder saved!",
        description: "We'll remind you 15 minutes before class starts.",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary-glow to-accent p-4 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading meetings...</p>
        </div>
      </div>
    );
  }

  if (!nextMeeting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary-glow to-accent p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Live Classes with Real Teachers
          </h1>
          <p className="text-white/80 text-lg mb-8">
            Practice with certified English teachers in real-time
          </p>
          
          <Card className="border-white/20 bg-white/10 backdrop-blur-xl text-white max-w-2xl mx-auto">
            <CardContent className="py-12">
              <AlertCircle className="h-16 w-16 mx-auto mb-4 text-white/60" />
              <h2 className="text-2xl font-semibold mb-2">No Live Class Scheduled</h2>
              <p className="text-white/80">
                No live class scheduled for today. Please check back later for upcoming sessions!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-glow to-accent p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="text-white/80 hover:text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate('/profile')}
              variant="ghost"
              size="sm"
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button
              onClick={signOut}
              variant="ghost"
              size="sm"
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => navigate('/auth')}
            variant="ghost"
            size="sm"
            className="text-white/80 hover:text-white hover:bg-white/10 gap-2"
          >
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
        )}
      </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Live Classes with Real Teachers
            </h1>
            <p className="text-white/80 text-lg">
              Practice with certified English teachers in real-time
            </p>
          </div>

          {/* Next Class Card */}
          <Card className="border-white/20 bg-white/10 backdrop-blur-xl text-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl flex items-center">
                  <Users className="h-6 w-6 mr-2" />
                  {nextMeeting.title}
                </CardTitle>
                <Badge variant="secondary" className="bg-accent/20 text-accent-foreground border-accent/30">
                  Next Class
                </Badge>
              </div>
              <CardDescription className="text-white/70">
                with {nextMeeting.teacher_name}
              </CardDescription>
          </CardHeader>
            <CardContent className="space-y-4">
              {/* Date and Time */}
              <div className="flex items-center text-white/90">
                <Calendar className="h-5 w-5 mr-3" />
                <span className="text-lg">{formatDate(nextMeeting.scheduled_at)}</span>
              </div>

              {/* This Week's Focus */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="font-semibold mb-2 text-accent-foreground">🧠 This Week's Focus:</h3>
                <p className="text-white/90">{nextMeeting.focus_topic}</p>
              </div>

            {/* Countdown Timer */}
            <div className="text-center py-4">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 mr-2" />
                <span className="text-2xl font-bold">{timeUntilClass}</span>
              </div>
              {canJoin && (
                <p className="text-accent-foreground text-sm">✅ You're ready to join the class!</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleJoinClass}
                disabled={!canJoin}
                className={`flex-1 text-lg py-3 ${
                  canJoin 
                    ? 'bg-accent hover:bg-accent/90 text-accent-foreground' 
                    : 'bg-white/10 text-white/50 cursor-not-allowed'
                }`}
              >
                <Users className="h-5 w-5 mr-2" />
                {canJoin ? 'Join Zoom Class' : 'Available in 15 min'}
              </Button>
              
              <Button
                onClick={handleSetReminder}
                variant="outline"
                disabled={hasReminderForMeeting(nextMeeting.id)}
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Bell className="h-4 w-4 mr-2" />
                {hasReminderForMeeting(nextMeeting.id) ? 'Reminder Set ✓' : 'Set Reminder'}
              </Button>
            </div>
          </CardContent>
        </Card>

          {/* Upcoming Classes */}
          {upcomingMeetings.length > 0 && (
            <Card className="border-white/20 bg-white/10 backdrop-blur-xl text-white">
              <CardHeader>
                <CardTitle className="text-xl">📆 Upcoming Classes</CardTitle>
                <CardDescription className="text-white/70">
                  Your next {upcomingMeetings.length} scheduled sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingMeetings.map((meeting) => (
                    <div
                      key={meeting.id}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div>
                        <h4 className="font-semibold">{meeting.title}</h4>
                        <p className="text-sm text-white/80">{meeting.focus_topic}</p>
                        <p className="text-sm text-white/60">with {meeting.teacher_name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {formatDate(meeting.scheduled_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

        {/* FAQ Section */}
        <Card className="border-white/20 bg-white/10 backdrop-blur-xl text-white">
          <CardHeader>
            <CardTitle className="text-xl">ℹ️ Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {faqData.map((faq, index) => (
                <Collapsible key={index} open={openFaq === index} onOpenChange={() => setOpenFaq(openFaq === index ? null : index)}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-left hover:bg-white/5 text-white"
                    >
                      <span>{faq.question}</span>
                      {openFaq === index ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pb-4">
                    <p className="text-white/80">{faq.answer}</p>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}