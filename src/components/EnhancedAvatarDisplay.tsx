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
      <div className="glass-card glass-card-hover rounded-2xl p-4 sm:p-5">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className={`${getAvatarSize()} rounded-full glass-card border-2 border-white/30 flex items-center justify-center overflow-hidden transition-all duration-500 hover:border-white/50 hover:scale-105`}>
              {avatarUrl ? (
                <img 
                  src={avatarUrl} 
                  alt={userName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className={`${getTextSize()} font-bold text-white drop-shadow-sm`}>
                  {userName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            
            {/* Level Badge */}
            <div className={`absolute -top-1 -right-1 ${getLevelBadgeSize()} bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30 transition-all duration-500 ${isAnimating ? 'animate-pulse scale-110 shadow-orange-500/50' : ''} hover:scale-110 hover:rotate-6`}>
              <span className="text-white font-bold drop-shadow-sm">{level}</span>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`${getTextSize()} font-semibold text-white truncate drop-shadow-sm`}>
                {userName}
              </h3>
              {/* Streak Badge */}
              {streakCount > 0 && (
                <div className="pill-button bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 px-3 py-1 flex items-center gap-1.5 min-h-[28px]">
                  <span className="text-white text-xs font-bold drop-shadow-sm">
                    🔥 {streakCount}
                  </span>
                </div>
              )}
            </div>
            
            {/* XP Progress */}
            {showXPBar && (
              <div className="mt-3">
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