import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Flame, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakReward {
  day: number;
  xp: number;
  message: string;
  showConfetti?: boolean;
}

interface StreakRewardPopupProps {
  reward: StreakReward | null;
  onClose: () => void;
}

export const StreakRewardPopup = ({ reward, onClose }: StreakRewardPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (reward) {
      setIsVisible(true);
      if (reward.showConfetti) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
      // Auto close after 4 seconds
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 4000);
    }
  }, [reward, onClose]);

  if (!reward) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center transition-all duration-300",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            >
              <Star 
                className="w-3 h-3 text-yellow-400 fill-current" 
                style={{ 
                  transform: `rotate(${Math.random() * 360}deg)`,
                  opacity: 0.7 + Math.random() * 0.3
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div 
        className={cn(
          "bg-gradient-to-br from-orange-400 to-red-500 text-white p-6 rounded-2xl shadow-2xl max-w-sm mx-4 transform transition-all duration-500",
          isVisible ? "scale-100 rotate-0" : "scale-95 rotate-3"
        )}
      >
        <div className="text-center space-y-4">
          {/* Fire Icon */}
          <div className="flex justify-center">
            <div className="bg-white/20 p-4 rounded-full animate-pulse">
              <Flame className="w-8 h-8" />
            </div>
          </div>

          {/* Streak Reward Message */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Streak Reward!</h2>
            <Badge className="bg-white/20 text-white border-0 text-sm px-3 py-1">
              Day {reward.day}
            </Badge>
            <p className="text-white/90">{reward.message}</p>
          </div>

          {/* XP Reward */}
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-lg font-bold">+{reward.xp} XP</div>
            <div className="text-sm opacity-90">Streak bonus earned!</div>
          </div>
        </div>
      </div>
    </div>
  );
};