import { useState, useEffect, useRef } from 'react';
import { History, Lightbulb, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import BookmarkButton from './BookmarkButton';
import { useGamification } from '@/hooks/useGamification';
import { useBadgeSystem } from '@/hooks/useBadgeSystem';
import { useAvatarTTS } from '@/hooks/useAvatarTTS';
import { TomasVoice } from '@/voice/TomasVoice';

// Configuration constants
const TTS_MODAL_DELAY_MS = 1000; // Delay before auto-speaking tip (allows modal to render)
const HISTORY_RETENTION_DAYS = 90; // Maximum days to keep in history

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

// Get today's tip index based on UTC date (timezone-safe)
const getTodaysTipIndex = () => {
  const now = new Date();
  // Use UTC to ensure consistent tip selection across timezones
  const start = new Date(Date.UTC(now.getUTCFullYear(), 0, 0));
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return dayOfYear % dailyTips.length;
};

// Get viewed tips with dates
const getViewedTipsHistory = () => {
  try {
    const saved = localStorage.getItem('viewedDailyTipsHistory');
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    // Corrupted data - reset to empty and log error
    console.error('Failed to parse Daily Tips history:', error);
    localStorage.removeItem('viewedDailyTipsHistory');
    return {};
  }
};

// Save tip as viewed with today's date
const markTipAsViewed = (tipId: number) => {
  try {
    const history = getViewedTipsHistory();
    const today = new Date().toDateString();
    history[today] = tipId;

    // Write to localStorage with error handling
    localStorage.setItem('viewedDailyTipsHistory', JSON.stringify(history));
  } catch (error) {
    // Handle quota exceeded or other storage errors
    console.error('Failed to save Daily Tip progress:', error);

    // Try to clean up old entries if quota exceeded
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      try {
        const history = getViewedTipsHistory();
        const today = new Date().toDateString();

        // Keep only last 30 days of history
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const cleanedHistory: Record<string, number> = {};
        Object.entries(history).forEach(([date, id]) => {
          if (new Date(date) >= thirtyDaysAgo) {
            cleanedHistory[date] = id as number;
          }
        });

        cleanedHistory[today] = tipId;
        localStorage.setItem('viewedDailyTipsHistory', JSON.stringify(cleanedHistory));
      } catch (retryError) {
        // Silent fail - progress not saved but app continues
        console.error('Failed to save even after cleanup:', retryError);
      }
    }
  }
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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { earnXPForDailyTip } = useGamification();
  const { incrementDailyTips } = useBadgeSystem();
  const { speakWithAvatar, soundEnabled } = useAvatarTTS();
  const isMountedRef = useRef(true);

  const todaysTipIndex = getTodaysTipIndex();
  const todaysTip = dailyTips[todaysTipIndex];

  // Track component mount status
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Track TTS speaking status for visual indicator
  useEffect(() => {
    const handleSpeechStart = () => setIsSpeaking(true);
    const handleSpeechEnd = () => setIsSpeaking(false);

    window.addEventListener('speech:start', handleSpeechStart);
    window.addEventListener('speech:end', handleSpeechEnd);

    return () => {
      window.removeEventListener('speech:start', handleSpeechStart);
      window.removeEventListener('speech:end', handleSpeechEnd);
    };
  }, []);

  // Function to stop TTS playback
  const stopSpeaking = () => {
    TomasVoice.stop();
    setIsSpeaking(false);
  };

  // Mark today's tip as viewed and award XP
  useEffect(() => {
    if (!hasTodaysTipBeenViewed()) {
      markTipAsViewed(todaysTip.id);

      // Award XP with error handling
      try {
        earnXPForDailyTip();
        incrementDailyTips(); // Track for badge progress
      } catch (error) {
        // Silent fail - XP not awarded but tip still marked as viewed
        console.error('Failed to award XP for daily tip:', error);
      }
    }
  }, [todaysTip.id, earnXPForDailyTip, incrementDailyTips]);

  // Auto-speak today's tip when Sound is ON
  useEffect(() => {
    if (soundEnabled && todaysTip && !showHistory) {
      // Delay to ensure modal is fully rendered
      const timeoutId = setTimeout(() => {
        const tipText = `Daily tip: ${todaysTip.content}`;
        speakWithAvatar(tipText);
      }, TTS_MODAL_DELAY_MS);

      // Cleanup: Cancel timeout and stop TTS on unmount
      return () => {
        clearTimeout(timeoutId);
        TomasVoice.stop();
      };
    }
  }, [todaysTip, soundEnabled, showHistory]);

  // ESC key handler to stop TTS (accessibility)
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        TomasVoice.stop();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);

    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  // Function to speak any tip content
  const speakTip = (tip: typeof todaysTip) => {
    // Only speak if component is still mounted and sound is enabled
    if (isMountedRef.current && soundEnabled) {
      const tipText = `Daily tip: ${tip.content}`;
      speakWithAvatar(tipText);
    }
  };

  // Get past viewed tips for history
  const getHistoryTips = () => {
    const history = getViewedTipsHistory();
    const today = new Date().toDateString();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - HISTORY_RETENTION_DAYS);

    return Object.entries(history)
      .filter(([date]) => {
        const entryDate = new Date(date);
        return date !== today && entryDate >= cutoffDate; // Exclude today and old entries
      })
      .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime()) // Sort by date descending
      .map(([date, tipId]) => ({
        date,
        tip: dailyTips.find(tip => tip.id === tipId)
      }))
      .filter(item => item.tip); // Remove any tips that couldn't be found
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
        <Card className="w-full max-w-sm sm:max-w-md mx-auto bg-white shadow-2xl border-0 animate-scale-in">
          <CardContent className="p-0">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 sm:p-4 text-white relative">
              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1 sm:top-2 sm:right-2 text-white hover:bg-white/20 rounded-full h-8 w-8 sm:h-10 sm:w-10"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              
              <div className="flex items-center space-x-2 mb-2 pr-8">
                <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6" />
                <h2 className="text-base sm:text-lg font-bold">💡 Today's Tip</h2>
              </div>
              
              <div className="text-white/80 text-xs sm:text-sm pr-8">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: window.innerWidth < 640 ? 'short' : 'long', 
                  year: 'numeric', 
                  month: window.innerWidth < 640 ? 'short' : 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>

            {/* Today's Tip Content */}
            <div className="p-4 sm:p-6">
              <div className="text-center mb-4 sm:mb-6">
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{todaysTip.emoji}</div>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 mb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 text-center">
                    {todaysTip.title}
                  </h3>
                  <BookmarkButton
                    content={todaysTip.content}
                    type="tip"
                    title={todaysTip.title}
                    className="text-gray-600 hover:text-yellow-500"
                  />
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed px-2">
                  {todaysTip.content}
                </p>
              </div>

              {/* History Button */}
              <Button
                onClick={() => setShowHistory(true)}
                variant="outline"
                className="w-full flex items-center justify-center space-x-2 hover:bg-gray-50 py-2 sm:py-3 text-sm sm:text-base"
              >
                <History className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>View Past Tips</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History Modal */}
      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="max-w-sm sm:max-w-md mx-2">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-base sm:text-lg">
              <History className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Previous Tips</span>
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="max-h-80 sm:max-h-96">
            <div className="space-y-2 sm:space-y-3">
              {getHistoryTips().map(({ date, tip }, index) => (
                <Card key={index} className="p-2 sm:p-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="text-lg sm:text-2xl shrink-0">{tip.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1 gap-2">
                        <h4 className="font-medium text-xs sm:text-sm truncate">{tip.title}</h4>
                        <span className="text-xs text-gray-500 shrink-0">
                          {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                        {tip.content}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
              
              {getHistoryTips().length === 0 && (
                <div className="text-center py-6 sm:py-8 text-gray-500 px-4">
                  <Lightbulb className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm sm:text-base">No previous tips yet!</p>
                  <p className="text-xs sm:text-sm">Come back tomorrow for another tip.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Floating TTS Indicator - Shows when audio is playing */}
      {isSpeaking && (
        <div className="fixed bottom-4 right-4 z-[60] animate-scale-in">
          <Button
            onClick={stopSpeaking}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg flex items-center gap-2 px-4 py-6 rounded-full"
            size="lg"
          >
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-8 h-8 bg-white/30 rounded-full animate-ping" />
                <div className="relative w-4 h-4 bg-white rounded-full" />
              </div>
              <span className="font-semibold">Stop Audio</span>
            </div>
          </Button>
        </div>
      )}
    </>
  );
}