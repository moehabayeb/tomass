import { useState, useEffect } from 'react';
import { History, Lightbulb, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import BookmarkButton from './BookmarkButton';
import { useGamification } from '@/hooks/useGamification';
import { useBadgeSystem } from '@/hooks/useBadgeSystem';

// Collection of daily tips for A1-A2 learners
const dailyTips = [
  {
    id: 1,
    emoji: "🗣️",
    title: "Contractions are Natural!",
    content: "You can say 'I'm' instead of 'I am'. It's more natural and native speakers use it all the time!"
  },
  {
    id: 2,
    emoji: "📅",
    title: "Preposition Helper",
    content: "Use 'on' for dates: I was born on July 13. Use 'in' for months: I was born in July."
  },
  {
    id: 3,
    emoji: "😎",
    title: "Show Your Abilities",
    content: "'Can' shows ability: I can speak English! 'Can't' shows you cannot do something."
  },
  {
    id: 4,
    emoji: "👋",
    title: "Greeting Like a Pro",
    content: "'How are you?' is friendly! You can answer: 'I'm good, thanks!' or 'I'm fine, thank you!'"
  },
  {
    id: 5,
    emoji: "🏠",
    title: "At vs In",
    content: "Use 'at' for specific places: I'm at school. Use 'in' for cities/countries: I live in London."
  },
  {
    id: 6,
    emoji: "⏰",
    title: "Time Made Easy",
    content: "For time, use 'at': The meeting is at 3 PM. For days, use 'on': See you on Monday!"
  },
  {
    id: 7,
    emoji: "🎯",
    title: "Question Magic",
    content: "Turn any statement into a question by adding 'right?' at the end: You like coffee, right?"
  },
  {
    id: 8,
    emoji: "💪",
    title: "Present vs Past",
    content: "Add -ed to most verbs for past: walk → walked, play → played. Easy pattern to remember!"
  },
  {
    id: 9,
    emoji: "🤝",
    title: "Polite Requests",
    content: "'Could you please...' is super polite! Example: Could you please help me?"
  },
  {
    id: 10,
    emoji: "📚",
    title: "Articles Tip",
    content: "Use 'a' before consonant sounds (a book), 'an' before vowel sounds (an apple). Listen to the sound!"
  },
  {
    id: 11,
    emoji: "🌟",
    title: "Plural Power",
    content: "Most plurals just add -s: cat → cats, book → books. Some are irregular: child → children!"
  },
  {
    id: 12,
    emoji: "🎨",
    title: "Adjective Order",
    content: "Adjectives go before nouns: 'a big red car' not 'a car big red'. Practice this pattern!"
  },
  {
    id: 13,
    emoji: "🚀",
    title: "Future Plans",
    content: "Use 'going to' for plans: I'm going to study English. Use 'will' for promises: I will help you!"
  },
  {
    id: 14,
    emoji: "❓",
    title: "Question Words",
    content: "Who = person, What = thing, Where = place, When = time, Why = reason, How = method!"
  },
  {
    id: 15,
    emoji: "🎪",
    title: "This vs That",
    content: "'This' for near things (this book), 'that' for far things (that building over there)."
  }
];

interface DailyTipsProps {
  onClose: () => void;
}

// Get today's tip index based on system date
const getTodaysTipIndex = () => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  return dayOfYear % dailyTips.length;
};

// Get viewed tips with dates
const getViewedTipsHistory = () => {
  const saved = localStorage.getItem('viewedDailyTipsHistory');
  return saved ? JSON.parse(saved) : {};
};

// Save tip as viewed with today's date
const markTipAsViewed = (tipId: number) => {
  const history = getViewedTipsHistory();
  const today = new Date().toDateString();
  history[today] = tipId;
  localStorage.setItem('viewedDailyTipsHistory', JSON.stringify(history));
};

// Check if today's tip has been viewed
export const hasTodaysTipBeenViewed = () => {
  const today = new Date().toDateString();
  const history = getViewedTipsHistory();
  const todaysTipId = dailyTips[getTodaysTipIndex()].id;
  return history[today] === todaysTipId;
};

export default function DailyTips({ onClose }: DailyTipsProps) {
  const [showHistory, setShowHistory] = useState(false);
  const { earnXPForDailyTip } = useGamification();
  const { incrementDailyTips } = useBadgeSystem();

  const todaysTipIndex = getTodaysTipIndex();
  const todaysTip = dailyTips[todaysTipIndex];

  // Mark today's tip as viewed and award XP
  useEffect(() => {
    if (!hasTodaysTipBeenViewed()) {
      markTipAsViewed(todaysTip.id);
      earnXPForDailyTip();
      incrementDailyTips(); // Track for badge progress
    }
  }, [todaysTip.id, earnXPForDailyTip, incrementDailyTips]);

  // Get past viewed tips for history
  const getHistoryTips = () => {
    const history = getViewedTipsHistory();
    const today = new Date().toDateString();
    
    return Object.entries(history)
      .filter(([date]) => date !== today) // Exclude today
      .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime()) // Sort by date descending
      .map(([date, tipId]) => ({
        date,
        tip: dailyTips.find(tip => tip.id === tipId)
      }))
      .filter(item => item.tip); // Remove any tips that couldn't be found
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto bg-white shadow-2xl border-0 animate-scale-in">
          <CardContent className="p-0">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white relative">
              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-white hover:bg-white/20 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center space-x-2 mb-2">
                <Lightbulb className="h-6 w-6" />
                <h2 className="text-lg font-bold">💡 Today's Tip</h2>
              </div>
              
              <div className="text-white/80 text-sm">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>

            {/* Today's Tip Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">{todaysTip.emoji}</div>
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <h3 className="text-xl font-bold text-gray-800">
                    {todaysTip.title}
                  </h3>
                  <BookmarkButton
                    content={todaysTip.content}
                    type="tip"
                    title={todaysTip.title}
                    className="text-gray-600 hover:text-yellow-500"
                  />
                </div>
                <p className="text-gray-600 text-base leading-relaxed">
                  {todaysTip.content}
                </p>
              </div>

              {/* History Button */}
              <Button
                onClick={() => setShowHistory(true)}
                variant="outline"
                className="w-full flex items-center justify-center space-x-2 hover:bg-gray-50"
              >
                <History className="h-4 w-4" />
                <span>View Past Tips</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History Modal */}
      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <History className="h-5 w-5" />
              <span>Previous Tips</span>
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="max-h-96">
            <div className="space-y-3">
              {getHistoryTips().map(({ date, tip }, index) => (
                <Card key={index} className="p-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{tip.emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{tip.title}</h4>
                        <span className="text-xs text-gray-500">
                          {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {tip.content}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
              
              {getHistoryTips().length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Lightbulb className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p>No previous tips yet!</p>
                  <p className="text-sm">Come back tomorrow for another tip.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}