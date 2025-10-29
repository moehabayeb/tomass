import { useEffect, useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Trophy, GraduationCap, ShirtIcon, PartyPopper, Sparkles, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LevelUpPopupProps {
  show: boolean;
  newLevel: number;
  onClose: () => void;
}

const getUnlockedReward = (level: number) => {
  switch (level) {
    case 3:
      return { icon: <GraduationCap className="w-8 h-8" />, name: 'Graduation Cap', description: 'You\'re becoming a scholar!' };
    case 5:
      return { icon: <ShirtIcon className="w-8 h-8" />, name: 'Smart Jacket', description: 'Looking professional!' };
    case 10:
      return { icon: <PartyPopper className="w-8 h-8" />, name: 'Party Mode', description: 'Time to celebrate!' };
    case 15:
      return { icon: <Sparkles className="w-8 h-8" />, name: 'Golden Glow', description: 'Legendary status achieved!' };
    default:
      return null;
  }
};

export const LevelUpPopup = ({ show, newLevel, onClose }: LevelUpPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const reward = getUnlockedReward(newLevel);

  // Track timers for proper cleanup
  const confettiTimerRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setShowConfetti(true);

      // Auto-hide confetti after animation with cleanup
      confettiTimerRef.current = setTimeout(() => setShowConfetti(false), 3000);
    }

    // Cleanup confetti timer on unmount or when show changes
    return () => {
      if (confettiTimerRef.current) {
        clearTimeout(confettiTimerRef.current);
        confettiTimerRef.current = null;
      }
    };
  }, [show]);

  const handleClose = () => {
    setIsVisible(false);

    // Clear any existing close timer
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    // Set new close timer with cleanup tracking
    closeTimerRef.current = setTimeout(() => {
      onClose();
      closeTimerRef.current = null;
    }, 300);
  };

  if (!show) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      data-level-popup
    >
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
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
                className="w-4 h-4 text-primary fill-current" 
                style={{ 
                  transform: `rotate(${Math.random() * 360}deg)`,
                  opacity: 0.7 + Math.random() * 0.3
                }}
              />
            </div>
          ))}
        </div>
      )}

      <Card 
        className={cn(
          "relative bg-gradient-to-br from-background via-background/95 to-primary/5 border-primary/20 shadow-2xl max-w-sm mx-4 transform transition-all duration-500 animate-scale-in",
          isVisible ? "scale-100 rotate-0" : "scale-95 rotate-3"
        )}
      >
        <div className="p-6 text-center space-y-4">
          {/* Trophy Icon */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-full animate-pulse">
              <Trophy className="w-12 h-12 text-primary-foreground" />
            </div>
          </div>

          {/* Level Up Message */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Level Up!
            </h2>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="secondary" className="text-lg px-3 py-1">
                Level {newLevel}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Congratulations! Your English skills are improving!
            </p>
          </div>

          {/* Reward Display */}
          {reward && (
            <div className="bg-muted/30 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-center gap-2">
                <Gift className="w-5 h-5 text-accent" />
                <span className="font-medium text-accent">New Unlock!</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="bg-gradient-to-br from-accent/20 to-primary/20 p-3 rounded-full">
                  {reward.icon}
                </div>
                <div>
                  <p className="font-semibold">{reward.name}</p>
                  <p className="text-sm text-muted-foreground">{reward.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Continue Button */}
          <Button 
            onClick={handleClose}
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          >
            Keep Learning! 🚀
          </Button>
        </div>

        {/* Sparkle Effects */}
        <div className="absolute -top-2 -right-2 animate-spin-slow">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <div className="absolute -bottom-2 -left-2 animate-bounce">
          <Star className="w-5 h-5 text-accent fill-current" />
        </div>
      </Card>
    </div>
  );
};