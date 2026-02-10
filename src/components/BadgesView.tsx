import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBadgeSystem } from '@/hooks/useBadgeSystem';
import { useBadgeProgress } from '@/hooks/useBadgeProgress';
import { useEffect, useRef, useState } from 'react';

interface BadgesViewProps {
  onBack: () => void;
}

// 🔧 FIX BUG #20: Hook to track which badges are visible (for performance)
function useVisibleBadges(badgeIds: string[]) {
  const [visibleBadges, setVisibleBadges] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRefs = useRef<Map<string, Element>>(new Map());

  useEffect(() => {
    // Create intersection observer to track visible badges
    observerRef.current = new IntersectionObserver(
      (entries) => {
        setVisibleBadges(prev => {
          const next = new Set(prev);
          entries.forEach(entry => {
            const badgeId = entry.target.getAttribute('data-badge-id');
            if (badgeId) {
              if (entry.isIntersecting) {
                next.add(badgeId);
              } else {
                next.delete(badgeId);
              }
            }
          });
          return next;
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    // Observe all existing elements
    elementRefs.current.forEach(el => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
      // Phase 1.2: Clear Map to prevent memory leak when badges change
      elementRefs.current.clear();
    };
  }, [badgeIds]);

  const registerElement = (badgeId: string, element: Element | null) => {
    if (element) {
      elementRefs.current.set(badgeId, element);
      observerRef.current?.observe(element);
    } else {
      const existingElement = elementRefs.current.get(badgeId);
      if (existingElement) {
        observerRef.current?.unobserve(existingElement);
        elementRefs.current.delete(badgeId);
      }
    }
  };

  return { visibleBadges, registerElement };
}

export default function BadgesView({ onBack }: BadgesViewProps) {
  const { badges, badgeProgress } = useBadgeSystem();
  const { visibleBadges, registerElement } = useVisibleBadges(badges.map(b => b.id));
  // Phase 2.3: Use extracted hook for progress calculations
  const { getProgressText, getProgressPercentage } = useBadgeProgress(badgeProgress);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white relative">
      {/* Background Stars */}
      <div className="absolute inset-0 w-full h-full background-stars pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(2px 2px at 20px 30px, #fff, transparent), radial-gradient(2px 2px at 40px 70px, #fff, transparent), radial-gradient(1px 1px at 90px 40px, #fff, transparent)', backgroundSize: '100px 100px' }} 
      />
      
      {/* Header */}
      <div className="relative z-10 p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 rounded-xl p-2 sm:p-3"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold">🏅 Your Badges</h1>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-primary">{badges.filter(b => b.unlocked).length}</div>
            <div className="text-xs sm:text-sm text-white/70">Badges Earned</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-primary">{badgeProgress.currentLevel}</div>
            <div className="text-xs sm:text-sm text-white/70">Current Level</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-primary">{badgeProgress.currentStreak}</div>
            <div className="text-xs sm:text-sm text-white/70">Current Streak</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-primary">{badgeProgress.totalExercises}</div>
            <div className="text-xs sm:text-sm text-white/70">Total Exercises</div>
          </div>
        </div>

        {/* Phase 2.1: ARIA live region for screen reader support */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {badges.filter(b => b.unlocked).length} of {badges.length} badges unlocked.
          {badges.filter(b => !b.unlocked).length} badges remaining to unlock.
        </div>

        {/* Badges Grid */}
        {badges.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🏅</div>
            <h3 className="text-xl font-semibold text-white mb-2">No Badges Yet</h3>
            <p className="text-white/60 text-sm max-w-xs mx-auto">
              Complete lessons and challenges to earn badges. Keep practicing to unlock your first badge!
            </p>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {badges.map((badge) => {
          const isVisible = visibleBadges.has(badge.id);
          const shouldAnimate = badge.unlocked && isVisible;

          return (
          <div
            key={badge.id}
            ref={(el) => registerElement(badge.id, el)}
            data-badge-id={badge.id}
            className={`relative bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border transition-all duration-300 ${
              badge.unlocked
                ? 'border-primary/50 shadow-lg shadow-primary/20 scale-100 animate-fade-in'
                : 'border-white/20 opacity-60 grayscale hover:opacity-80'
            }`}
          >
            {/* 🔧 FIX BUG #20: Sparkle Effect - Only animate visible badges */}
            {shouldAnimate && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-2 right-2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-yellow-400 rounded-full opacity-80 animate-pulse"></div>
                <div className="absolute top-3 sm:top-4 right-5 sm:right-6 w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-4 sm:top-6 right-2 sm:right-3 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-pink-400 rounded-full opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
              </div>
            )}

            {/* Badge Icon */}
            <div className="text-center mb-3 sm:mb-4">
              <div className={`text-4xl sm:text-6xl mb-2 transition-all duration-300 ${
                shouldAnimate
                  ? 'animate-pulse filter drop-shadow-lg'
                  : badge.unlocked
                  ? 'filter drop-shadow-lg'
                  : 'filter grayscale blur-sm'
              }`}>
                {badge.unlocked ? badge.icon : '🔒'}
              </div>
              <h3 className={`text-lg sm:text-xl font-bold mb-1 transition-all duration-300 ${
                badge.unlocked ? 'text-white' : 'text-white/50 blur-sm'
              }`}>
                {badge.unlocked ? badge.name : '???'}
              </h3>
              <p className={`text-xs sm:text-sm transition-all duration-300 leading-relaxed ${
                badge.unlocked ? 'text-white/70' : 'text-white/40 blur-sm'
              }`}>
                {badge.unlocked ? badge.description : 'Complete the challenge to unlock'}
              </p>
            </div>

            {/* Progress Bar for Locked Badges */}
            {!badge.unlocked && (
              <div className="mb-3 sm:mb-4">
                <div className="flex justify-between text-xs text-white/70 mb-2">
                  <span>Progress</span>
                  <span className="text-xs">{getProgressText(badge.id)}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1.5 sm:h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-primary-glow h-1.5 sm:h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${getProgressPercentage(badge.id)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Glow Effect for High Progress */}
            {!badge.unlocked && getProgressPercentage(badge.id) > 70 && (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl pointer-events-none animate-pulse"></div>
            )}

            {/* Status Badge */}
            <div className="flex justify-center">
              {badge.unlocked ? (
                <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-400/30 font-medium text-xs sm:text-sm px-2 sm:px-3 py-1">
                  ✨ Unlocked
                </Badge>
              ) : (
                <Badge variant="outline" className="border-white/30 text-white/70 font-medium text-xs sm:text-sm px-2 sm:px-3 py-1">
                  🔒 <span className="truncate max-w-[120px] sm:max-w-none">{badge.condition}</span>
                </Badge>
              )}
            </div>

            {/* Unlock Date */}
            {badge.unlocked && badge.unlockedAt && (() => {
              // Phase 1.1: Validate date to prevent "Invalid Date" display
              try {
                const date = new Date(badge.unlockedAt);
                if (isNaN(date.getTime())) return null;
                return (
                  <div className="text-center mt-2 text-xs text-white/60">
                    Unlocked {date.toLocaleDateString()}
                  </div>
                );
              } catch {
                return null;
              }
            })()}
          </div>
          );
        })}
        </div>
        )}
      </div>
    </div>
  );
}