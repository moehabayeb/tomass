import { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { hasTodaysTipBeenViewed } from './DailyTips';

interface DailyTipsBadgeProps {
  onClick: () => void;
}

export default function DailyTipsBadge({ onClick }: DailyTipsBadgeProps) {
  const [hasNewTip, setHasNewTip] = useState(false);

  useEffect(() => {
    // Check if today's tip has been viewed
    const checkForNewTip = () => {
      setHasNewTip(!hasTodaysTipBeenViewed());
    };

    checkForNewTip();
    
    // Check every hour for new tips (in case the day changes)
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
      <Lightbulb className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 ${hasNewTip ? 'text-yellow-600' : 'text-gray-600'}`} />
      <span className="text-xs sm:text-sm">{hasNewTip ? "💡 New Tip!" : "Daily Tips"}</span>
      
      {/* Pulse animation for new tips */}
      {hasNewTip && (
        <span className="absolute -top-1 -right-1 h-2 w-2 sm:h-3 sm:w-3 bg-red-500 rounded-full animate-pulse"></span>
      )}
    </Button>
  );
}