import React, { useState, useEffect } from 'react';
import { X, Flame, Star } from 'lucide-react';

interface StreakWelcomePopupProps {
  currentStreak: number;
  bestStreak: number;
  isVisible: boolean;
  onClose: () => void;
}

export const StreakWelcomePopup: React.FC<StreakWelcomePopupProps> = ({
  currentStreak,
  bestStreak,
  isVisible,
  onClose
}) => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Small delay for smooth animation
      const timer = setTimeout(() => setShouldShow(true), 100);
      
      // Auto-close after 4 seconds
      const autoCloseTimer = setTimeout(() => {
        handleClose();
      }, 4000);

      return () => {
        clearTimeout(timer);
        clearTimeout(autoCloseTimer);
      };
    }
  }, [isVisible]);

  const handleClose = () => {
    setShouldShow(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  const getStreakMessage = () => {
    if (currentStreak >= 30) return "Incredible dedication! 🏆";
    if (currentStreak >= 14) return "You're on fire! 🔥";
    if (currentStreak >= 7) return "Amazing progress! ⭐";
    if (currentStreak >= 3) return "Great momentum! 💪";
    return "Welcome back! 👋";
  };

  const getNextMilestone = () => {
    if (currentStreak < 7) return { days: 7 - currentStreak, reward: "75 XP" };
    if (currentStreak < 14) return { days: 14 - currentStreak, reward: "150 XP" };
    if (currentStreak < 30) return { days: 30 - currentStreak, reward: "300 XP" };
    return null;
  };

  if (!isVisible) return null;

  const nextMilestone = getNextMilestone();

  return (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${shouldShow ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-8 shadow-2xl border border-white/20 max-w-sm w-full transform transition-all duration-300 ${shouldShow ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Main content */}
        <div className="text-center text-white space-y-6">
          {/* Streak display */}
          <div className="relative">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Flame className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <Star className="w-5 h-5 text-orange-600" />
            </div>
          </div>

          {/* Streak info */}
          <div>
            <h2 className="text-3xl font-bold mb-2">{currentStreak} Days</h2>
            <p className="text-white/90 text-lg">{getStreakMessage()}</p>
          </div>

          {/* Milestone progress */}
          {nextMilestone && (
            <div className="bg-white/10 rounded-2xl p-4">
              <div className="text-sm text-white/80 mb-2">Next Milestone</div>
              <div className="text-white font-medium">
                +{nextMilestone.reward} in {nextMilestone.days} days
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-yellow-300 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((currentStreak % 7) / 7 * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Best streak */}
          {bestStreak > currentStreak && (
            <div className="text-white/70 text-sm">
              🏆 Personal Best: {bestStreak} days
            </div>
          )}

          {/* Tap to dismiss hint */}
          <div className="text-white/70 text-xs">
            Tap anywhere to continue
          </div>
        </div>
      </div>
    </div>
  );
};