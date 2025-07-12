import { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DailyTipsBadgeProps {
  onClick: () => void;
}

export default function DailyTipsBadge({ onClick }: DailyTipsBadgeProps) {
  const [hasNewTip, setHasNewTip] = useState(false);

  useEffect(() => {
    // Check if today's tip has been viewed
    const checkForNewTip = () => {
      const today = new Date();
      const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
      const todaysTipId = (dayOfYear % 15) + 1; // Assuming 15 tips total, cycling

      const viewedTips = JSON.parse(localStorage.getItem('viewedDailyTips') || '[]');
      const hasViewedToday = viewedTips.includes(todaysTipId);

      setHasNewTip(!hasViewedToday);
    };

    checkForNewTip();
    
    // Check every hour for new tips
    const interval = setInterval(checkForNewTip, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Button
      onClick={onClick}
      variant="outline"
      size="sm"
      className={`
        relative transition-all duration-300 hover:scale-105
        ${hasNewTip 
          ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300 text-yellow-800 hover:from-yellow-200 hover:to-orange-200' 
          : 'bg-white/80 hover:bg-white'
        }
      `}
    >
      <Lightbulb className={`h-4 w-4 mr-2 ${hasNewTip ? 'text-yellow-600' : 'text-gray-600'}`} />
      {hasNewTip ? "💡 New Tip!" : "Daily Tips"}
      
      {/* Pulse animation for new tips */}
      {hasNewTip && (
        <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
      )}
    </Button>
  );
}