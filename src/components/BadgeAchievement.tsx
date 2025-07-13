import { useEffect, useState } from 'react';
import { Badge } from '@/hooks/useBadgeSystem';

interface BadgeAchievementProps {
  badge: Badge | null;
  onClose: () => void;
}

export const BadgeAchievement = ({ badge, onClose }: BadgeAchievementProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (badge) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300); // Wait for animation to complete
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [badge, onClose]);

  if (!badge) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-all duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Achievement Card */}
      <div className={`relative bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md mx-4 pointer-events-auto transform transition-all duration-300 ${show ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        {/* Confetti Effect */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className="confetti-animation" />
        </div>
        
        {/* Badge Content */}
        <div className="relative text-center">
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          <h2 className="text-2xl font-bold text-white mb-2">Badge Unlocked!</h2>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl">{badge.icon}</span>
            <div>
              <h3 className="text-xl font-semibold text-white">{badge.name}</h3>
              <p className="text-white/80 text-sm">{badge.description}</p>
            </div>
          </div>
          
          <div className="text-primary font-medium text-sm">
            Achievement unlocked! 🏆
          </div>
        </div>
      </div>
    </div>
  );
};