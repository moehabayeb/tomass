import { useState, useEffect, useRef } from 'react';

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
  const [isBlinking, setIsBlinking] = useState(false);
  const [mouthPhase, setMouthPhase] = useState(0);
  const [headTilt, setHeadTilt] = useState(0);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-12 h-12';
      case 'lg': return 'w-32 h-32';
      default: return 'w-20 h-20';
    }
  };

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Mouth movement for talking
  useEffect(() => {
    let mouthInterval: NodeJS.Timeout;
    
    if (state === 'talking') {
      mouthInterval = setInterval(() => {
        setMouthPhase(prev => (prev + 1) % 4);
      }, 200);
    } else {
      setMouthPhase(0);
    }

    return () => {
      if (mouthInterval) clearInterval(mouthInterval);
    };
  }, [state]);

  // Subtle head movement for engagement
  useEffect(() => {
    let headInterval: NodeJS.Timeout;
    
    if (state === 'listening') {
      headInterval = setInterval(() => {
        setHeadTilt(prev => prev === 0 ? 2 : 0);
      }, 1500);
    } else if (state === 'thinking') {
      headInterval = setInterval(() => {
        setHeadTilt(prev => (prev + 1) % 3 - 1);
      }, 800);
    } else {
      setHeadTilt(0);
    }

    return () => {
      if (headInterval) clearInterval(headInterval);
    };
  }, [state]);

  return (
    <div className={`relative ${getSizeClasses()} ${className}`}>
      {/* Main avatar container */}
      <div 
        className={`
          w-full h-full rounded-full overflow-hidden relative
          transition-all duration-300 ease-out
          ${state === 'talking' ? 'scale-105' : ''}
          ${state === 'listening' ? 'animate-pulse' : ''}
        `}
        style={{ 
          transform: `rotate(${headTilt}deg)`,
          boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      >
        {/* Base Tomas Image */}
        <img 
          src="/lovable-uploads/6e3efb4a-cd6e-4a8c-9fc3-d983b417a8b8.png"
          alt="Tomas Hoca"
          className="w-full h-full object-cover"
        />
        
        {/* Animated overlays */}
        <div className="absolute inset-0">
          {/* Glasses reflection */}
          <div 
            className={`
              absolute top-[35%] left-[25%] w-[50%] h-[20%] 
              bg-gradient-to-r from-transparent via-white/20 to-transparent
              rounded-full transition-opacity duration-200
              ${state === 'thinking' ? 'opacity-60 animate-pulse' : 'opacity-0'}
            `}
          />
          
          {/* Eyes overlay for blinking */}
          <div className="absolute top-[38%] left-[30%] w-[40%] h-[12%] flex justify-between">
            <div 
              className={`
                w-[35%] bg-gradient-to-b from-amber-100 to-amber-200 rounded-full
                transition-all duration-150 ease-out
                ${isBlinking ? 'h-[10%] opacity-90' : 'h-0 opacity-0'}
              `}
            />
            <div 
              className={`
                w-[35%] bg-gradient-to-b from-amber-100 to-amber-200 rounded-full
                transition-all duration-150 ease-out
                ${isBlinking ? 'h-[10%] opacity-90' : 'h-0 opacity-0'}
              `}
            />
          </div>
          
          {/* Mouth overlay for talking animation */}
          {state === 'talking' && (
            <div className="absolute top-[65%] left-[40%] w-[20%] h-[8%]">
              <div 
                className={`
                  w-full bg-gray-800 rounded-full transition-all duration-200
                  ${mouthPhase === 0 ? 'h-[30%]' : 
                    mouthPhase === 1 ? 'h-[60%] w-[80%] left-[10%]' : 
                    mouthPhase === 2 ? 'h-[40%] w-[90%] left-[5%]' : 
                    'h-[50%] w-[70%] left-[15%]'}
                `}
              />
            </div>
          )}
        </div>
      </div>

      {/* State indicator */}
      {state !== 'idle' && (
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border-2 border-primary flex items-center justify-center shadow-lg">
          {state === 'talking' && <span className="text-xs">🗣️</span>}
          {state === 'listening' && <span className="text-xs">👂</span>}
          {state === 'thinking' && <span className="text-xs">💭</span>}
        </div>
      )}

      {/* Speaking animation ring */}
      {state === 'talking' && (
        <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-60" />
      )}
      
      {/* Listening animation ring */}
      {state === 'listening' && (
        <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-pulse opacity-50" />
      )}
      
      {/* Thinking particles */}
      {state === 'thinking' && (
        <div className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center">
          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-1 h-1 bg-primary rounded-full animate-bounce ml-1" style={{ animationDelay: '150ms' }} />
          <div className="w-1 h-1 bg-primary rounded-full animate-bounce ml-1" style={{ animationDelay: '300ms' }} />
        </div>
      )}
    </div>
  );
}