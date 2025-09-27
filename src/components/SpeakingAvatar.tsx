import React from 'react';

interface SpeakingAvatarProps {
  isListening: boolean;
  isSpeaking: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export default function SpeakingAvatar({
  isListening,
  isSpeaking,
  onClick,
  disabled = false
}: SpeakingAvatarProps) {

  const getAnimationState = () => {
    if (isListening) return 'listening';
    if (isSpeaking) return 'speaking';
    return 'idle';
  };

  const animationState = getAnimationState();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      style={{
        pointerEvents: 'auto',
        zIndex: 5,
        touchAction: 'manipulation'
      }}
      className={`
        relative w-20 h-20 rounded-full transition-all duration-300 transform
        ${isListening
          ? 'bg-red-500 hover:bg-red-600 animate-pulse scale-110'
          : 'bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg'
        }
        ${!disabled ? 'cursor-pointer active:scale-95' : 'cursor-not-allowed opacity-75'}
        ${isSpeaking ? 'ring-4 ring-green-400/50 ring-pulse' : ''}
      `}
    >
      {/* Avatar Container */}
      <div className="absolute inset-2 rounded-full bg-white/10 backdrop-blur-sm overflow-hidden">

        {/* Male Avatar SVG */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
        >
          {/* Head/Face */}
          <circle
            cx="50"
            cy="45"
            r="25"
            fill="#F4C2A1"
            className={`${animationState === 'idle' ? 'animate-breathe' : ''}`}
          />

          {/* Hair */}
          <path
            d="M25 35 Q50 20 75 35 Q75 25 50 15 Q25 25 25 35"
            fill="#8B4513"
            className={`${animationState === 'idle' ? 'animate-breathe' : ''}`}
          />

          {/* Eyes */}
          <circle cx="42" cy="40" r="2" fill="#333" />
          <circle cx="58" cy="40" r="2" fill="#333" />

          {/* Eyebrows */}
          <path d="M38 35 L46 33" stroke="#654321" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M54 33 L62 35" stroke="#654321" strokeWidth="1.5" strokeLinecap="round" />

          {/* Nose */}
          <circle cx="50" cy="48" r="1" fill="#E6A584" />

          {/* Mouth - Animated based on state */}
          {animationState === 'speaking' ? (
            <ellipse
              cx="50"
              cy="55"
              rx="4"
              ry="6"
              fill="#8B0000"
              className="animate-speak"
            />
          ) : (
            <path
              d="M46 55 Q50 58 54 55"
              stroke="#333"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              className={`${animationState === 'idle' ? 'animate-subtle-smile' : ''}`}
            />
          )}

          {/* Neck/Collar suggestion */}
          <rect
            x="45"
            y="68"
            width="10"
            height="8"
            fill="#4A90E2"
            rx="2"
            className={`${animationState === 'idle' ? 'animate-breathe' : ''}`}
          />
        </svg>

        {/* Listening Visual Indicator */}
        {isListening && (
          <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping" />
        )}

        {/* Speaking Visual Indicator */}
        {isSpeaking && (
          <>
            <div className="absolute -inset-1 rounded-full border border-green-400/50 animate-pulse" />
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-1">
                <div className="w-1 h-3 bg-green-400/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1 h-3 bg-green-400/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1 h-3 bg-green-400/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Status text overlay for accessibility */}
      <div className="sr-only">
        {isListening ? 'Listening to your speech' :
         isSpeaking ? 'AI is speaking' :
         'Tap to speak'}
      </div>
    </button>
  );
}