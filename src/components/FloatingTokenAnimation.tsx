import { useFloatingTokenStore } from '@/hooks/useFloatingTokenStore';
import { useState, useEffect, useRef } from 'react';

interface SparkleProps {
  delay: number;
  angle: number;
  distance: number;
}

const MicroSparkle = ({ delay, angle, distance }: SparkleProps) => {
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;
  
  return (
    <div
      className="absolute w-1 h-1 bg-[hsl(var(--primary))] rounded-full token-sparkle pointer-events-none"
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

const AnimatedNumber = ({ value, duration = 600 }: AnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const previousValue = useRef(0);

  useEffect(() => {
    if (value !== previousValue.current) {
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
          previousValue.current = value;
        }
      };

      requestAnimationFrame(animate);
    }
  }, [value, duration]);

  return <span>{displayValue}</span>;
};

interface FloatingTokenProps {
  token: {
    id: string;
    points: number;
    message?: string;
    status: 'spawning' | 'traveling' | 'landing';
  };
  onLand: () => void;
  onComplete: (id: string) => void;
  soundEnabled: boolean;
}

const FloatingToken = ({ token, onLand, onComplete, soundEnabled }: FloatingTokenProps) => {
  const [phase, setPhase] = useState<'spawn' | 'travel' | 'land'>('spawn');
  const { updateTokenStatus } = useFloatingTokenStore();
  
  // Generate micro-sparkles for spawn effect
  const sparkles = Array.from({ length: 5 }, (_, i) => ({
    delay: i * 40,
    angle: (i * Math.PI * 2) / 5,
    distance: 8 + Math.random() * 4, // 8-12px radius
  }));

  useEffect(() => {
    // Spawn phase (200-250ms)
    const spawnTimer = setTimeout(() => {
      setPhase('travel');
      updateTokenStatus(token.id, 'traveling');
    }, 250);

    // Travel phase (600-800ms after spawn)
    const travelTimer = setTimeout(() => {
      setPhase('land');
      updateTokenStatus(token.id, 'landing');
      onLand();
      
      // Play coin sound if enabled
      if (soundEnabled) {
        // Create subtle coin sound using Web Audio API
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);
      }
    }, 850); // 250ms spawn + 600ms travel

    // Complete animation (120ms after land)
    const completeTimer = setTimeout(() => {
      onComplete(token.id);
    }, 1120); // 850ms + 120ms land

    return () => {
      clearTimeout(spawnTimer);
      clearTimeout(travelTimer);
      clearTimeout(completeTimer);
    };
  }, [token.id, onLand, onComplete, soundEnabled, updateTokenStatus]);

  const getPhaseClasses = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Reduced motion: simple fade near meter
      return phase === 'spawn' ? 'token-reduced-spawn' : 'token-reduced-land';
    }
    
    switch (phase) {
      case 'spawn':
        return 'token-spawn';
      case 'travel':
        return 'token-travel';
      case 'land':
        return 'token-land';
      default:
        return '';
    }
  };

  return (
    <div className="fixed pointer-events-none z-50">
      <div
        className={`absolute ${getPhaseClasses()}`}
        style={{
          // Spawn point: top-right area
          right: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? '50%' : '2rem',
          top: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? '6rem' : '2rem',
        }}
      >
        {/* Main Token */}
        <div 
          className="relative bg-[hsl(var(--primary))] backdrop-blur-sm rounded-full px-3 py-1.5 border border-[hsl(var(--primary))]/30 shadow-lg"
          style={{
            boxShadow: `0 0 15px hsl(var(--primary) / 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)`
          }}
        >
          <div className="text-white font-bold text-sm text-center whitespace-nowrap">
            +<AnimatedNumber value={token.points} /> XP
          </div>
          
          {/* Micro-sparkles - only show during spawn phase */}
          {phase === 'spawn' && (
            <div className="absolute inset-0">
              {sparkles.map((sparkle, i) => (
                <MicroSparkle
                  key={i}
                  delay={sparkle.delay}
                  angle={sparkle.angle}
                  distance={sparkle.distance}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Optional message */}
        {token.message && (
          <div className="text-xs text-white/80 mt-1 text-center truncate max-w-[80px]">
            {token.message}
          </div>
        )}
      </div>
    </div>
  );
};

interface FloatingTokenAnimationProps {
  onTokenLand: () => void;
  soundEnabled: boolean;
}

export const FloatingTokenAnimation = ({ onTokenLand, soundEnabled }: FloatingTokenAnimationProps) => {
  const { tokens, removeToken } = useFloatingTokenStore();

  const handleTokenComplete = (id: string) => {
    removeToken(id);
  };

  if (tokens.length === 0) return null;

  return (
    <>
      {tokens.map((token) => (
        <FloatingToken
          key={token.id}
          token={token}
          onLand={onTokenLand}
          onComplete={handleTokenComplete}
          soundEnabled={soundEnabled}
        />
      ))}
    </>
  );
};