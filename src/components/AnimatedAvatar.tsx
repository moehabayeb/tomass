import { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';

interface AnimatedAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  state?: 'idle' | 'talking' | 'listening' | 'thinking';
  className?: string;
}

export default function AnimatedAvatar({ 
  size = 'md', 
  state = 'idle',
  className = "" 
}: AnimatedAvatarProps) {
  const [animationData, setAnimationData] = useState(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const lottieRef = useRef<any>(null);

  // Simple breathing/idle animation data
  const idleAnimation = {
    v: "5.7.0",
    fr: 30,
    ip: 0,
    op: 120,
    w: 200,
    h: 200,
    nm: "Avatar Idle",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Face",
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [100, 100, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: { 
            a: 1,
            k: [
              { i: { x: 0.833, y: 0.833 }, o: { x: 0.167, y: 0.167 }, t: 0, s: [100, 100, 100] },
              { i: { x: 0.833, y: 0.833 }, o: { x: 0.167, y: 0.167 }, t: 60, s: [102, 98, 100] },
              { t: 120, s: [100, 100, 100] }
            ]
          }
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ty: "el",
                d: 1,
                s: { a: 0, k: [120, 120] },
                p: { a: 0, k: [0, 0] }
              },
              {
                ty: "fl",
                c: { a: 0, k: [0.96, 0.87, 0.8, 1] },
                o: { a: 0, k: 100 }
              }
            ]
          }
        ]
      }
    ]
  };

  const talkingAnimation = {
    ...idleAnimation,
    nm: "Avatar Talking",
    layers: [
      ...idleAnimation.layers,
      {
        ddd: 0,
        ind: 2,
        ty: 4,
        nm: "Mouth",
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [100, 120, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: { 
            a: 1,
            k: [
              { t: 0, s: [100, 50, 100] },
              { t: 15, s: [120, 80, 100] },
              { t: 30, s: [100, 50, 100] },
              { t: 45, s: [110, 70, 100] },
              { t: 60, s: [100, 50, 100] }
            ]
          }
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ty: "el",
                d: 1,
                s: { a: 0, k: [20, 10] },
                p: { a: 0, k: [0, 0] }
              },
              {
                ty: "fl",
                c: { a: 0, k: [0.2, 0.2, 0.2, 1] },
                o: { a: 0, k: 100 }
              }
            ]
          }
        ]
      }
    ]
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-12 h-12';
      case 'lg': return 'w-32 h-32';
      default: return 'w-20 h-20';
    }
  };

  // Set animation based on state
  useEffect(() => {
    switch (state) {
      case 'talking':
        setAnimationData(talkingAnimation);
        break;
      case 'listening':
        setAnimationData(idleAnimation);
        break;
      case 'thinking':
        setAnimationData(idleAnimation);
        break;
      default:
        setAnimationData(idleAnimation);
    }
  }, [state]);

  // Blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000); // Random blink every 3-5 seconds

    return () => clearInterval(blinkInterval);
  }, []);

  // Create a simple CSS-based avatar since Lottie animations are complex to create inline
  return (
    <div className={`relative ${getSizeClasses()} ${className}`}>
      {/* Avatar container with background */}
      <div 
        className={`
          w-full h-full rounded-full bg-gradient-to-br from-amber-100 to-amber-200 
          border-4 border-white/30 shadow-xl flex items-center justify-center
          transition-all duration-300
          ${state === 'talking' ? 'scale-105 animate-pulse' : ''}
          ${state === 'listening' ? 'animate-bounce' : ''}
        `}
        style={{ 
          backgroundColor: 'hsl(var(--avatar-bg))',
          animation: state === 'thinking' ? 'pulse 2s infinite' : undefined
        }}
      >
        {/* Face emoji as avatar */}
        <div className="relative text-center">
          {/* Eyes */}
          <div className="flex space-x-2 mb-1 justify-center">
            <div 
              className={`w-2 h-2 bg-gray-800 rounded-full transition-all duration-150 ${
                isBlinking ? 'h-0.5' : 'h-2'
              }`}
            />
            <div 
              className={`w-2 h-2 bg-gray-800 rounded-full transition-all duration-150 ${
                isBlinking ? 'h-0.5' : 'h-2'
              }`}
            />
          </div>
          
          {/* Mouth */}
          <div className="flex justify-center">
            {state === 'talking' ? (
              <div className="w-3 h-2 bg-gray-800 rounded-full animate-pulse" />
            ) : (
              <div className="w-2 h-1 bg-gray-800 rounded-full" />
            )}
          </div>
        </div>
      </div>

      {/* State indicator */}
      {state !== 'idle' && (
        <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-primary flex items-center justify-center">
          {state === 'talking' && <span className="text-xs">🗣️</span>}
          {state === 'listening' && <span className="text-xs">👂</span>}
          {state === 'thinking' && <span className="text-xs">💭</span>}
        </div>
      )}

      {/* Speaking animation overlay */}
      {state === 'talking' && (
        <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-75" />
      )}
    </div>
  );
}