import { useEffect, useState } from 'react';

interface DIDAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  state?: 'idle' | 'talking' | 'listening' | 'thinking';
  className?: string;
  isSpeaking?: boolean;
  hideLoadingText?: boolean;
}

export default function DIDAvatar({
  size = 'md',
  state = 'idle',
  className = "",
  isSpeaking = false,
  hideLoadingText = false
}: DIDAvatarProps) {
  const [avatarState, setAvatarState] = useState<'idle' | 'talking' | 'listening' | 'thinking'>('idle');

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-16 h-16';
      case 'lg': return 'w-32 h-32 sm:w-40 sm:h-40';
      default: return 'w-24 h-24';
    }
  };

  // Listen for avatar events from TTS system
  useEffect(() => {
    const handleTalkingStart = () => setAvatarState('talking');
    const handleTalkingEnd = () => setAvatarState('idle');

    window.addEventListener('avatar:talking:start', handleTalkingStart);
    window.addEventListener('avatar:talking:end', handleTalkingEnd);

    return () => {
      window.removeEventListener('avatar:talking:start', handleTalkingStart);
      window.removeEventListener('avatar:talking:end', handleTalkingEnd);
    };
  }, []);

  // Update visual state - prioritize avatar events over props
  const currentState = avatarState !== 'idle' ? avatarState : (isSpeaking ? 'talking' : state);

  return (
    <div className={`${getSizeClasses()} ${className} relative`}>
      <div className="w-full h-full relative overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-white/30">
        {/* Main animated avatar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Avatar container with breathing animation */}
            <div
              className={`relative flex items-center justify-center transition-all duration-500 ${
                currentState === 'talking' ? 'scale-105' : 'scale-100'
              }`}
              style={{
                width: '80%',
                height: '80%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                boxShadow: currentState === 'talking'
                  ? '0 0 30px rgba(102, 126, 234, 0.6), inset 0 0 20px rgba(255,255,255,0.1)'
                  : '0 0 15px rgba(102, 126, 234, 0.3), inset 0 0 20px rgba(255,255,255,0.1)'
              }}
            >
              {/* Face features */}
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                {/* Eyes */}
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={`bg-white rounded-full transition-all duration-200 ${
                      size === 'sm' ? 'w-1.5 h-1.5' : size === 'lg' ? 'w-3 h-3' : 'w-2 h-2'
                    } ${currentState === 'thinking' ? 'animate-pulse' : ''}`}
                  />
                  <div
                    className={`bg-white rounded-full transition-all duration-200 ${
                      size === 'sm' ? 'w-1.5 h-1.5' : size === 'lg' ? 'w-3 h-3' : 'w-2 h-2'
                    } ${currentState === 'thinking' ? 'animate-pulse' : ''}`}
                  />
                </div>

                {/* Mouth with speaking animation */}
                <div
                  className={`bg-white rounded-full transition-all duration-150 ${
                    size === 'sm' ? 'w-2 h-1' : size === 'lg' ? 'w-4 h-2' : 'w-3 h-1.5'
                  } ${
                    currentState === 'talking'
                      ? 'animate-pulse scale-110 bg-orange-300'
                      : currentState === 'listening'
                      ? 'bg-blue-300'
                      : 'bg-white/80'
                  }`}
                  style={{
                    transform: currentState === 'talking'
                      ? 'scaleY(1.5) scaleX(0.8)'
                      : 'scaleY(1) scaleX(1)',
                    borderRadius: currentState === 'talking' ? '50%' : '50%'
                  }}
                />
              </div>

              {/* Ambient glow effect */}
              <div
                className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
                  currentState === 'talking' ? 'opacity-60' : 'opacity-20'
                }`}
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                  animation: currentState === 'talking' ? 'pulse 1s ease-in-out infinite' : 'none'
                }}
              />
            </div>

            {/* State-specific effects */}
            {currentState === 'talking' && (
              <>
                {/* Ripple effects for talking */}
                <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
                <div className="absolute inset-2 rounded-full border border-white/20 animate-pulse" />
                <div className="absolute inset-4 rounded-full border border-orange-300/40 animate-ping" style={{ animationDelay: '0.2s' }} />
              </>
            )}

            {currentState === 'listening' && (
              <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-pulse" />
            )}

            {currentState === 'thinking' && (
              <>
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full animate-pulse" />
                {/* Thinking dots */}
                <div className="absolute top-1/4 right-1/4 flex gap-0.5">
                  <div className="w-1 h-1 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-1 h-1 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1 h-1 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Loading indicator (only shown briefly on first load if needed) */}
        {!hideLoadingText && currentState === 'idle' && (
          <div className="absolute bottom-0 left-0 right-0 text-center">
            <div className="text-white/40 text-xs">Ready</div>
          </div>
        )}
      </div>

    </div>
  );
}