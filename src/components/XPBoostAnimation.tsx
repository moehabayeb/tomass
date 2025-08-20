import { useXPBoostStore } from '@/hooks/useXPBoostStore';
import { useState, useEffect, useRef } from 'react';

interface ParticleProps {
  delay: number;
  angle: number;
  distance: number;
}

const XPParticle = ({ delay, angle, distance }: ParticleProps) => {
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;
  
  return (
    <div
      className="absolute w-1 h-1 bg-[hsl(var(--xp-green))] rounded-full xp-particle pointer-events-none"
      style={{
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
        animationDelay: `${delay}ms`,
      }}
    />
  );
};

interface AnimatedNumberProps {
  value: number;
  duration?: number;
}

const AnimatedNumber = ({ value, duration = 300 }: AnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const previousValue = useRef(0);

  useEffect(() => {
    if (value !== previousValue.current) {
      setIsAnimating(true);
      const startValue = previousValue.current;
      const difference = value - startValue;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth count-up
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(startValue + (difference * easeOut));
        
        setDisplayValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
          previousValue.current = value;
        }
      };

      requestAnimationFrame(animate);
    }
  }, [value, duration]);

  return (
    <span className={isAnimating ? 'xp-count-up' : ''}>
      {displayValue}
    </span>
  );
};

export const XPBoostAnimation = () => {
  const { boosts } = useXPBoostStore();
  const [animationStates, setAnimationStates] = useState<Map<string, 'enter' | 'hold' | 'exit'>>(new Map());

  useEffect(() => {
    boosts.forEach((boost) => {
      if (!animationStates.has(boost.id)) {
        // Start with enter animation
        setAnimationStates(prev => new Map(prev).set(boost.id, 'enter'));
        
        // Move to hold phase after enter animation
        setTimeout(() => {
          setAnimationStates(prev => new Map(prev).set(boost.id, 'hold'));
        }, 300);
        
        // Move to exit phase after hold time
        setTimeout(() => {
          setAnimationStates(prev => new Map(prev).set(boost.id, 'exit'));
        }, 1000); // 300ms enter + 700ms hold
      }
    });

    // Clean up removed boosts
    const boostIds = new Set(boosts.map(b => b.id));
    setAnimationStates(prev => {
      const newMap = new Map();
      prev.forEach((value, key) => {
        if (boostIds.has(key)) {
          newMap.set(key, value);
        }
      });
      return newMap;
    });
  }, [boosts, animationStates]);

  if (boosts.length === 0) return null;

  // Generate particles for micro-burst effect
  const particles = Array.from({ length: 8 }, (_, i) => ({
    delay: i * 50,
    angle: (i * Math.PI * 2) / 8,
    distance: 12 + Math.random() * 6, // 12-18px radius
  }));

  return (
    <div className="absolute top-2 right-2 pointer-events-none z-40">
      {boosts.map((boost, index) => {
        const animationState = animationStates.get(boost.id) || 'enter';
        
        return (
          <div
            key={boost.id}
            className={`absolute top-0 right-0 ${
              animationState === 'enter' ? 'xp-boost-enter' : 
              animationState === 'exit' ? 'xp-boost-exit' : ''
            }`}
            style={{
              transform: `translateY(${index * 36}px)`,
            }}
          >
            {/* Main XP Badge */}
            <div 
              className="relative bg-[hsl(var(--xp-green-bg))] backdrop-blur-sm rounded-full px-3 py-1.5 border border-[hsl(var(--xp-green))]/30 shadow-lg"
              style={{
                boxShadow: `0 0 20px var(--xp-green-glow), 0 4px 12px rgba(0, 0, 0, 0.15)`
              }}
            >
              <div className="text-white font-bold text-sm text-center">
                +<AnimatedNumber value={boost.points} /> XP
              </div>
              
              {/* Micro-burst particles - only show during enter phase */}
              {animationState === 'enter' && (
                <div className="absolute inset-0">
                  {particles.map((particle, i) => (
                    <XPParticle
                      key={i}
                      delay={particle.delay}
                      angle={particle.angle}
                      distance={particle.distance}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Optional message */}
            {boost.message && (
              <div className="text-xs text-white/80 mt-1 text-center truncate max-w-[100px]">
                {boost.message}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};