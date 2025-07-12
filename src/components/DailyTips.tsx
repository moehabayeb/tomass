import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Lightbulb, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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

export default function DailyTips({ onClose }: DailyTipsProps) {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [viewedTips, setViewedTips] = useState<number[]>([]);

  // Get today's tip based on date
  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const todaysTipIndex = dayOfYear % dailyTips.length;
    setCurrentTipIndex(todaysTipIndex);

    // Load viewed tips from localStorage
    const saved = localStorage.getItem('viewedDailyTips');
    if (saved) {
      setViewedTips(JSON.parse(saved));
    }
  }, []);

  // Mark current tip as viewed
  useEffect(() => {
    const currentTipId = dailyTips[currentTipIndex]?.id;
    if (currentTipId && !viewedTips.includes(currentTipId)) {
      const updated = [...viewedTips, currentTipId];
      setViewedTips(updated);
      localStorage.setItem('viewedDailyTips', JSON.stringify(updated));
    }
  }, [currentTipIndex, viewedTips]);

  const currentTip = dailyTips[currentTipIndex];
  const isFirstTip = currentTipIndex === 0;
  const isLastTip = currentTipIndex === dailyTips.length - 1;

  const goToPrevious = () => {
    if (!isFirstTip) {
      setCurrentTipIndex(prev => prev - 1);
    }
  };

  const goToNext = () => {
    if (!isLastTip) {
      setCurrentTipIndex(prev => prev + 1);
    }
  };

  const getTodaysTipIndex = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    return dayOfYear % dailyTips.length;
  };

  const isCurrentlyViewingTodaysTip = currentTipIndex === getTodaysTipIndex();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-white shadow-2xl border-0">
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
              <h2 className="text-lg font-bold">
                {isCurrentlyViewingTodaysTip ? "💡 Today's Tip" : "📚 Previous Tips"}
              </h2>
            </div>
            
            <div className="text-white/80 text-sm">
              Tip {currentTipIndex + 1} of {dailyTips.length}
              {isCurrentlyViewingTodaysTip && " • Fresh Today!"}
            </div>
          </div>

          {/* Tip Content */}
          <div className="p-6">
            <div className="text-center mb-4">
              <div className="text-4xl mb-3">{currentTip.emoji}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {currentTip.title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {currentTip.content}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <Button
                onClick={goToPrevious}
                disabled={isFirstTip}
                variant="outline"
                size="sm"
                className="flex items-center space-x-1"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              <div className="flex space-x-1">
                {dailyTips.slice(Math.max(0, currentTipIndex - 2), currentTipIndex + 3).map((_, index) => {
                  const dotIndex = Math.max(0, currentTipIndex - 2) + index;
                  return (
                    <div
                      key={dotIndex}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        dotIndex === currentTipIndex 
                          ? 'bg-blue-500 w-4' 
                          : 'bg-gray-300'
                      }`}
                    />
                  );
                })}
              </div>

              <Button
                onClick={goToNext}
                disabled={isLastTip}
                variant="outline"
                size="sm"
                className="flex items-center space-x-1"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Today's Tip Button */}
            {!isCurrentlyViewingTodaysTip && (
              <Button
                onClick={() => setCurrentTipIndex(getTodaysTipIndex())}
                className="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600"
              >
                🌟 Go to Today's Tip
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}