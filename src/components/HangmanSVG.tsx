import React, { memo } from 'react';

interface HangmanSVGProps {
  wrongCount: number;
  maxWrong: number;
}

export const HangmanSVG = memo<HangmanSVGProps>(({ wrongCount, maxWrong }) => {
  const stages = [
    // Stage 0: Empty gallows
    [],
    // Stage 1: Head
    ['head'],
    // Stage 2: Body
    ['head', 'body'],
    // Stage 3: Left arm
    ['head', 'body', 'leftArm'],
    // Stage 4: Right arm
    ['head', 'body', 'leftArm', 'rightArm'],
    // Stage 5: Left leg
    ['head', 'body', 'leftArm', 'rightArm', 'leftLeg'],
    // Stage 6: Right leg (game over)
    ['head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg']
  ];

  const currentStage = Math.min(wrongCount, maxWrong);
  const visibleParts = new Set(stages[currentStage] || []);

  return (
    <svg
      viewBox="0 0 200 250"
      className="w-full max-w-[280px] max-h-[140px] sm:max-h-none mx-auto drop-shadow-2xl"
      style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))' }}
    >
      {/* Gallows structure */}
      <g className="gallows">
        {/* Base */}
        <rect
          x="10"
          y="230"
          width="180"
          height="8"
          fill="url(#woodGradient)"
          className="transition-all duration-300"
        />
        {/* Vertical pole */}
        <rect
          x="40"
          y="20"
          width="8"
          height="220"
          fill="url(#woodGradient)"
          className="transition-all duration-300"
        />
        {/* Top beam */}
        <rect
          x="40"
          y="20"
          width="120"
          height="8"
          fill="url(#woodGradient)"
          className="transition-all duration-300"
        />
        {/* Support beam */}
        <polygon
          points="48,28 48,60 76,28"
          fill="url(#woodGradient)"
          className="transition-all duration-300"
        />
        {/* Rope */}
        <line
          x1="156"
          y1="28"
          x2="156"
          y2="50"
          stroke="#8B4513"
          strokeWidth="2"
          className="transition-all duration-300"
        />
      </g>

      {/* Head */}
      {visibleParts.has('head') && (
        <g className="animate-swing-in">
          <circle
            cx="156"
            cy="70"
            r="20"
            fill="url(#skinGradient)"
            stroke="#FFD700"
            strokeWidth="2"
            className="transition-all duration-500"
          />
          {/* Face */}
          <circle cx="150" cy="65" r="2" fill="#333" /> {/* Left eye */}
          <circle cx="162" cy="65" r="2" fill="#333" /> {/* Right eye */}
          {currentStage >= maxWrong ? (
            // Sad face when game over
            <>
              <path
                d="M 148 78 Q 156 75 164 78"
                stroke="#333"
                strokeWidth="2"
                fill="none"
              />
            </>
          ) : (
            // Neutral/worried face
            <line x1="148" y1="78" x2="164" y2="78" stroke="#333" strokeWidth="2" />
          )}
        </g>
      )}

      {/* Body */}
      {visibleParts.has('body') && (
        <line
          x1="156"
          y1="90"
          x2="156"
          y2="140"
          stroke="url(#bodyGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          className="animate-draw-down"
        />
      )}

      {/* Left arm */}
      {visibleParts.has('leftArm') && (
        <line
          x1="156"
          y1="100"
          x2="130"
          y2="120"
          stroke="url(#bodyGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          className="animate-draw-diagonal-left"
        />
      )}

      {/* Right arm */}
      {visibleParts.has('rightArm') && (
        <line
          x1="156"
          y1="100"
          x2="182"
          y2="120"
          stroke="url(#bodyGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          className="animate-draw-diagonal-right"
        />
      )}

      {/* Left leg */}
      {visibleParts.has('leftLeg') && (
        <line
          x1="156"
          y1="140"
          x2="140"
          y2="180"
          stroke="url(#bodyGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          className="animate-draw-diagonal-left"
        />
      )}

      {/* Right leg */}
      {visibleParts.has('rightLeg') && (
        <line
          x1="156"
          y1="140"
          x2="172"
          y2="180"
          stroke="url(#bodyGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          className="animate-draw-diagonal-right"
        />
      )}

      {/* Gradients */}
      <defs>
        <linearGradient id="woodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B4513" />
          <stop offset="50%" stopColor="#A0522D" />
          <stop offset="100%" stopColor="#8B4513" />
        </linearGradient>

        <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFE4C4" />
          <stop offset="100%" stopColor="#FFDAB9" />
        </linearGradient>

        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4169E1" />
          <stop offset="100%" stopColor="#1E90FF" />
        </linearGradient>
      </defs>

      {/* Game over overlay */}
      {currentStage >= maxWrong && (
        <g className="animate-fade-in">
          <rect
            x="0"
            y="0"
            width="200"
            height="250"
            fill="rgba(0,0,0,0.3)"
          />
        </g>
      )}
    </svg>
  );
});
