import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface FloatingToken {
  id: string;
  amount: number;
  timestamp: number;
  status: 'spawning' | 'traveling' | 'landing';
}

interface TokenOverlayProps {
  soundEnabled: boolean;
}

const TokenOverlay = ({ soundEnabled }: TokenOverlayProps) => {
  const [tokens, setTokens] = useState<FloatingToken[]>([]);

  // Listen for XP awarded events
  useEffect(() => {
    const handleXPAwarded = (event: CustomEvent) => {
      const { amount } = event.detail;
      // Ensure valid amount, default to 1 if invalid
      const validAmount = (typeof amount === 'number' && amount > 0) ? amount : 1;
      console.log('[TokenOverlay] XP awarded event:', { original: amount, valid: validAmount });

      const now = Date.now();
      
      setTokens(current => {
        // Check for recent tokens to batch with (within 1.5s)
        const recentTokens = current.filter(token => 
          now - token.timestamp < 1500 && 
          (token.status === 'spawning' || token.status === 'traveling')
        );

        // Max 2 concurrent tokens - merge into newest if exceeded
        if (recentTokens.length >= 2) {
          const latestToken = recentTokens[recentTokens.length - 1];
          return current.map(token => 
            token.id === latestToken.id 
              ? { ...token, amount: token.amount + validAmount, timestamp: now }
              : token
          );
        }

        // Create new token with valid amount
        const newToken: FloatingToken = {
          id: `token-${now}-${Math.random()}`,
          amount: validAmount,
          timestamp: now,
          status: 'spawning',
        };

        // Keep only recent tokens to prevent memory buildup
        const activeTokens = current.filter(token => now - token.timestamp < 3000);
        return [...activeTokens, newToken];
      });
    };

    window.addEventListener('xp:awarded', handleXPAwarded as EventListener);
    
    // Debug functionality (dev only)
    if (window.location.search.includes('debug=1')) {
      (window as any).__xpDebug = (amount: number) => {
        const debugEvent = new CustomEvent('xp:awarded', { detail: { amount } });
        window.dispatchEvent(debugEvent);
      };
    }

    return () => {
      window.removeEventListener('xp:awarded', handleXPAwarded as EventListener);
      if ((window as any).__xpDebug) {
        delete (window as any).__xpDebug;
      }
    };
  }, []);

  // Animate tokens
  useEffect(() => {
    tokens.forEach(token => {
      if (token.status === 'spawning') {
        // Start travel phase after spawn
        setTimeout(() => {
          setTokens(current => 
            current.map(t => t.id === token.id ? { ...t, status: 'traveling' } : t)
          );
        }, 250);

        // Land phase
        setTimeout(() => {
          setTokens(current => 
            current.map(t => t.id === token.id ? { ...t, status: 'landing' } : t)
          );

          // Find XP meter and pulse it
          const meterElement = document.querySelector('[data-xp-meter]');
          if (meterElement) {
            meterElement.classList.add('xp-meter-pulse');
            setTimeout(() => meterElement.classList.remove('xp-meter-pulse'), 250);
          }

          // Play sound if enabled
          if (soundEnabled) {
            playTokenSound();
          }
        }, 850);

        // Remove token
        setTimeout(() => {
          setTokens(current => current.filter(t => t.id !== token.id));
        }, 1400);
      }
    });
  }, [tokens, soundEnabled]);

  const playTokenSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.15);
    } catch (error) {
      // Ignore audio errors in environments where it's not supported
    }
  };

  const getTokenPosition = (token: FloatingToken) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const meterElement = document.querySelector('[data-xp-meter]');
    
    if (prefersReducedMotion || !meterElement) {
      // Reduced motion: show near top-center
      return {
        right: '50%',
        top: '6rem',
        transform: 'translateX(50%)',
      };
    }

    // Get meter position for destination
    const meterRect = meterElement.getBoundingClientRect();
    const meterX = meterRect.left + meterRect.width / 2;
    const meterY = meterRect.top + meterRect.height / 2;

    // Spawn position: top-right of viewport
    const spawnX = window.innerWidth - 80;
    const spawnY = 80;

    if (token.status === 'spawning') {
      return {
        left: `${spawnX}px`,
        top: `${spawnY}px`,
        transform: 'translate(-50%, -50%) scale(0.9)',
        opacity: '0',
      };
    }

    if (token.status === 'traveling') {
      // Calculate arc path (midpoint slightly above)
      const midX = (spawnX + meterX) / 2;
      const midY = Math.min(spawnY, meterY) - 40; // Arc upward

      return {
        left: `${meterX}px`,
        top: `${meterY}px`,
        transform: 'translate(-50%, -50%) scale(1)',
        opacity: '1',
        // Use CSS animation for smooth arc
        animation: 'token-travel 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
      };
    }

    if (token.status === 'landing') {
      return {
        left: `${meterX}px`,
        top: `${meterY}px`,
        transform: 'translate(-50%, -50%) scale(1.06)',
        opacity: '0',
        transition: 'all 0.12s ease-out',
      };
    }

    return {};
  };

  if (tokens.length === 0) {
    return null;
  }

  return createPortal(
    <div 
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ willChange: 'contents' }}
    >
      {tokens.map((token) => (
        <div
          key={token.id}
          className="absolute pointer-events-none"
          style={{
            ...getTokenPosition(token),
            willChange: 'transform, opacity',
          }}
        >
          <div 
            className="bg-[hsl(var(--primary))] text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg"
            style={{
              boxShadow: '0 0 15px hsl(var(--primary) / 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
          >
            +{token.amount} XP
          </div>
        </div>
      ))}
    </div>,
    document.body
  );
};

export default TokenOverlay;
