import { useState, useEffect } from 'react';
import { XPProgressBar } from './XPProgressBar';

interface EnhancedAvatarDisplayProps {
  level: number;
  xp: number;
  maxXP: number;
  userName: string;
  avatarUrl?: string;
  showXPBar?: boolean;
  size?: 'sm' | 'md' | 'lg';
  streakCount?: number;
}

export const EnhancedAvatarDisplay = ({
  level,
  xp,
  maxXP,
  userName,
  avatarUrl,
  showXPBar = true,
  size = 'md',
  streakCount = 0
}: EnhancedAvatarDisplayProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [previousXP, setPreviousXP] = useState(xp);

  // Trigger animation when XP changes
  useEffect(() => {
    if (xp > previousXP) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }
    setPreviousXP(xp);
  }, [xp, previousXP]);

  const getAvatarSize = () => {
    switch (size) {
      case 'sm': return 'w-12 h-12';
      case 'lg': return 'w-24 h-24';
      default: return 'w-16 h-16';
    }
  };

  const getLevelBadgeSize = () => {
    switch (size) {
      case 'sm': return 'w-6 h-6 text-xs';
      case 'lg': return 'w-10 h-10 text-lg';
      default: return 'w-8 h-8 text-sm';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm': return 'text-sm';
      case 'lg': return 'text-lg';
      default: return 'text-base';
    }
  };

  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative">
            <div className={`${getAvatarSize()} rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/30 flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-primary/50`}>
              {avatarUrl ? (
                <img 
                  src={avatarUrl} 
                  alt={userName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className={`${getTextSize()} font-bold text-primary`}>
                  {userName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            
            {/* Level Badge */}
            <div className={`absolute -top-1 -right-1 ${getLevelBadgeSize()} bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg border-2 border-background transition-all duration-300 ${isAnimating ? 'animate-pulse scale-110' : ''}`}>
              <span className="text-primary-foreground font-bold">{level}</span>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className={`${getTextSize()} font-semibold text-foreground truncate`}>
                {userName}
              </h3>
              {/* Streak Badge */}
              {streakCount > 0 && (
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full px-2 py-0.5 flex items-center gap-1 shadow-sm">
                  <span className="text-white text-xs font-bold">
                    🔥 {streakCount}
                  </span>
                </div>
              )}
            </div>
            
            {/* XP Progress */}
            {showXPBar && (
              <div className="mt-2">
                <XPProgressBar
                  currentXP={xp}
                  totalXP={maxXP}
                  showLabels={true}
                  size={size === 'lg' ? 'lg' : 'sm'}
                  className={isAnimating ? 'animate-pulse' : ''}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};