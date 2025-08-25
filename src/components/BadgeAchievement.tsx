import { useEffect, useState, useRef } from 'react';
import { Badge } from '@/hooks/useBadgeSystem';
import { X } from 'lucide-react';

interface BadgeAchievementProps {
  badge: Badge | null;
  onClose: () => void;
}

export const BadgeAchievement = ({ badge, onClose }: BadgeAchievementProps) => {
  const [show, setShow] = useState(false);
  const [autoTimer, setAutoTimer] = useState<NodeJS.Timeout | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleClose = () => {
    console.log('🎖️ Badge popup closed');
    setShow(false);
    if (autoTimer) {
      clearTimeout(autoTimer);
      setAutoTimer(null);
    }
    setTimeout(() => {
      onClose();
      // Restore focus to previously focused element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }, 300);
  };

  const cancelAutoTimer = () => {
    if (autoTimer) {
      clearTimeout(autoTimer);
      setAutoTimer(null);
    }
  };

  useEffect(() => {
    if (badge) {
      console.log(`🎖️ Badge popup shown: ${badge.name}`);
      // Store currently focused element
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      setShow(true);
      
      // Focus the close button after animation
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
      
      // Auto-dismiss after 4 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 4000);
      setAutoTimer(timer);

      return () => {
        if (timer) clearTimeout(timer);
      };
    }
  }, [badge]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && show) {
        handleClose();
      }
    };

    if (show) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [show]);

  // Handle route changes - force close popup
  useEffect(() => {
    const handleRouteChange = () => {
      if (show) {
        handleClose();
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, [show]);

  if (!badge) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="badge-title"
      aria-describedby="badge-description"
    >
      {/* Backdrop - clickable to close */}
      <div 
        className="absolute inset-0 bg-black/30 cursor-pointer" 
        onClick={handleClose}
        aria-hidden="true"
      />
      
      {/* Achievement Card */}
      <div 
        className={`relative bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md mx-4 transform transition-all duration-300 ${show ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
        onMouseEnter={cancelAutoTimer}
        onMouseMove={cancelAutoTimer}
        onFocus={cancelAutoTimer}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Close"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClose();
            }
          }}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Confetti Effect */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          <div className="confetti-animation" />
        </div>
        
        {/* Badge Content */}
        <div className="relative text-center">
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          <h2 id="badge-title" className="text-2xl font-bold text-white mb-2">Badge Unlocked!</h2>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl">{badge.icon}</span>
            <div>
              <h3 className="text-xl font-semibold text-white">{badge.name}</h3>
              <p id="badge-description" className="text-white/80 text-sm">{badge.description}</p>
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