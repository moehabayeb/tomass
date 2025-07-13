import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Flame, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakCounterProps {
  currentStreak: number;
  message: string;
  bestStreak: number;
  nextMilestone?: {
    day: number;
    daysLeft: number;
    xp: number;
  } | null;
  className?: string;
  compact?: boolean;
}

export const StreakCounter = ({ 
  currentStreak, 
  message, 
  bestStreak, 
  nextMilestone,
  className = '',
  compact = false
}: StreakCounterProps) => {
  const getStreakColor = () => {
    if (currentStreak >= 30) return 'from-yellow-400 to-orange-500';
    if (currentStreak >= 7) return 'from-orange-400 to-red-500';
    if (currentStreak >= 3) return 'from-red-400 to-pink-500';
    return 'from-pink-400 to-red-400';
  };

  if (compact) {
    return (
      <div className={cn(
        "flex items-center gap-2 bg-gradient-to-r p-2 rounded-lg text-white shadow-sm",
        getStreakColor(),
        className
      )}>
        <Flame className="w-4 h-4" />
        <span className="font-bold text-sm">{currentStreak}</span>
      </div>
    );
  }

  return (
    <Card className={cn(
      "relative overflow-hidden border-0 shadow-lg",
      className
    )}>
      <div className={cn(
        "bg-gradient-to-r p-4 text-white",
        getStreakColor()
      )}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-full">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-lg">{currentStreak} Days</div>
              <div className="text-sm opacity-90">Current Streak</div>
            </div>
          </div>
          
          {bestStreak > currentStreak && (
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              Best: {bestStreak}
            </Badge>
          )}
        </div>
        
        <div className="text-sm opacity-90 mb-3">
          {message}
        </div>
        
        {nextMilestone && (
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4" />
              <span className="font-medium text-sm">Next Milestone</span>
            </div>
            <div className="text-xs opacity-90">
              {nextMilestone.daysLeft} more days for +{nextMilestone.xp} XP bonus
            </div>
            <div className="w-full bg-white/20 rounded-full h-1.5 mt-2">
              <div 
                className="bg-white rounded-full h-1.5 transition-all duration-300"
                style={{ 
                  width: `${((nextMilestone.day - nextMilestone.daysLeft) / nextMilestone.day) * 100}%` 
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};