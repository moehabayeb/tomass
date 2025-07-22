import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Users, ChevronDown, ChevronUp, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from '@/hooks/use-toast';

interface MeetingsAppProps {
  onBack: () => void;
}

// Mock data - in a real app this would come from a database
const nextClass = {
  id: 1,
  title: "Weekly English Conversation",
  date: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
  focus: "Business English & Professional Communication",
  teacher: "Sarah Johnson",
  zoomLink: "https://zoom.us/j/1234567890",
  description: "Practice professional conversations and improve your business vocabulary"
};

const upcomingClasses = [
  {
    id: 2,
    title: "Grammar Workshop",
    date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    teacher: "Michael Chen",
    focus: "Advanced Tenses & Conditionals"
  },
  {
    id: 3,
    title: "Pronunciation Clinic", 
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    teacher: "Emma Rodriguez",
    focus: "American vs British Pronunciation"
  },
  {
    id: 4,
    title: "Weekly English Conversation",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    teacher: "Sarah Johnson", 
    focus: "Travel & Culture Discussions"
  }
];

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
  const [timeUntilClass, setTimeUntilClass] = useState<string>('');
  const [canJoin, setCanJoin] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hasSetReminder, setHasSetReminder] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const classTime = nextClass.date;
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
  }, []);

  const handleJoinClass = () => {
    if (canJoin) {
      window.open(nextClass.zoomLink, '_blank');
      toast({
        title: "Joining class...",
        description: "Opening Zoom in a new window. See you in class!",
      });
    }
  };

  const handleSetReminder = () => {
    if (!hasSetReminder) {
      setHasSetReminder(true);
      toast({
        title: "Reminder set!",
        description: "We'll notify you 15 minutes before class starts.",
      });
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
                {nextClass.title}
              </CardTitle>
              <Badge variant="secondary" className="bg-accent/20 text-accent-foreground border-accent/30">
                Next Class
              </Badge>
            </div>
            <CardDescription className="text-white/70">
              with {nextClass.teacher}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Date and Time */}
            <div className="flex items-center text-white/90">
              <Calendar className="h-5 w-5 mr-3" />
              <span className="text-lg">{formatDate(nextClass.date)}</span>
            </div>

            {/* This Week's Focus */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="font-semibold mb-2 text-accent-foreground">🧠 This Week's Focus:</h3>
              <p className="text-white/90">{nextClass.focus}</p>
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
                disabled={hasSetReminder}
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Bell className="h-4 w-4 mr-2" />
                {hasSetReminder ? 'Reminder Set ✓' : 'Set Reminder'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Classes */}
        <Card className="border-white/20 bg-white/10 backdrop-blur-xl text-white">
          <CardHeader>
            <CardTitle className="text-xl">📆 Upcoming Classes</CardTitle>
            <CardDescription className="text-white/70">
              Your next 3 scheduled sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingClasses.map((classItem) => (
                <div
                  key={classItem.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div>
                    <h4 className="font-semibold">{classItem.title}</h4>
                    <p className="text-sm text-white/80">{classItem.focus}</p>
                    <p className="text-sm text-white/60">with {classItem.teacher}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {formatDate(classItem.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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