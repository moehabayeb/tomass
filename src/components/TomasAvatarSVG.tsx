export default function TomasAvatarSVG() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* Background circle with orange gradient */}
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: '#FFC04D', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#FF9500', stopOpacity: 1 }} />
        </radialGradient>
        <radialGradient id="faceGrad" cx="50%" cy="40%" r="50%">
          <stop offset="0%" style={{ stopColor: '#FFDAB5', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#FFB385', stopOpacity: 1 }} />
        </radialGradient>
      </defs>

      {/* Background circle */}
      <circle cx="100" cy="100" r="100" fill="url(#bgGrad)" />

      {/* Face */}
      <circle cx="100" cy="100" r="80" fill="url(#faceGrad)" />

      {/* Hair - modern style */}
      <path d="M 35 55 Q 45 15 100 25 Q 155 15 165 55 L 160 70 Q 150 50 100 55 Q 50 50 40 70 Z" fill="#4A4A4A" />

      {/* Glasses frame - thicker, more visible */}
      <ellipse cx="70" cy="85" rx="20" ry="16" fill="none" stroke="#000" strokeWidth="4" />
      <ellipse cx="130" cy="85" rx="20" ry="16" fill="none" stroke="#000" strokeWidth="4" />
      <line x1="90" y1="85" x2="110" y2="85" stroke="#000" strokeWidth="4" />
      <line x1="50" y1="85" x2="30" y2="80" stroke="#000" strokeWidth="3" />
      <line x1="150" y1="85" x2="170" y2="80" stroke="#000" strokeWidth="3" />

      {/* Eyes behind glasses with animated pupils and eyelids */}
      <g id="left-eye">
        {/* Eye white */}
        <circle cx="70" cy="85" r="7" fill="#FFF" />
        {/* Animated pupil */}
        <circle className="pupil-left" cx="70" cy="85" r="4" fill="#000" />
        {/* Eye highlight */}
        <circle cx="73" cy="83" r="2" fill="#FFF" />
        {/* Animated eyelid (for blinking) */}
        <ellipse className="eyelid-left" cx="70" cy="85" rx="7" ry="7" fill="url(#faceGrad)" />
      </g>

      <g id="right-eye">
        {/* Eye white */}
        <circle cx="130" cy="85" r="7" fill="#FFF" />
        {/* Animated pupil */}
        <circle className="pupil-right" cx="130" cy="85" r="4" fill="#000" />
        {/* Eye highlight */}
        <circle cx="133" cy="83" r="2" fill="#FFF" />
        {/* Animated eyelid (for blinking) */}
        <ellipse className="eyelid-right" cx="130" cy="85" rx="7" ry="7" fill="url(#faceGrad)" />
      </g>

      {/* Nose */}
      <ellipse cx="100" cy="105" rx="8" ry="12" fill="#E6B896" />

      {/* Animated Mouth Group */}
      <g id="mouth">
        {/* Mouth Closed (default) */}
        <path className="mouth-closed" d="M 70 120 Q 100 128 130 120" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />

        {/* Mouth Slightly Open (hidden by default) */}
        <g className="mouth-slightly-open" style={{ opacity: 0 }}>
          <path d="M 70 120 Q 100 135 130 120" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="100" cy="128" rx="18" ry="6" fill="#8B4545" opacity="0.6" />
        </g>

        {/* Mouth Open (hidden by default) */}
        <g className="mouth-open" style={{ opacity: 0 }}>
          <ellipse cx="100" cy="128" rx="20" ry="12" fill="#8B4545" />
          <ellipse cx="100" cy="122" rx="16" ry="4" fill="#FFF" opacity="0.3" />
        </g>

        {/* Mouth Wide (hidden by default) */}
        <g className="mouth-wide" style={{ opacity: 0 }}>
          <path d="M 70 120 Q 100 140 130 120" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="100" cy="130" rx="22" ry="10" fill="#8B4545" opacity="0.7" />
        </g>

        {/* Smile highlight */}
        <path className="smile-highlight" d="M 75 122 Q 100 133 125 122" fill="#FFF" opacity="0.2" stroke="none" />
      </g>

      {/* Ears */}
      <ellipse cx="30" cy="100" rx="14" ry="20" fill="url(#faceGrad)" />
      <ellipse cx="170" cy="100" rx="14" ry="20" fill="url(#faceGrad)" />
      <ellipse cx="30" cy="100" rx="7" ry="10" fill="#FFB385" />
      <ellipse cx="170" cy="100" rx="7" ry="10" fill="#FFB385" />

      {/* Shirt/Body - modern blue */}
      <path d="M 30 165 Q 40 155 55 160 L 60 200 L 140 200 L 145 160 Q 160 155 170 165 L 170 200 L 30 200 Z" fill="#4169E1" />
      <path d="M 100 160 L 100 200" stroke="#2555CC" strokeWidth="2" />

      {/* Collar */}
      <path d="M 55 160 L 75 170 L 100 165 L 125 170 L 145 160" fill="none" stroke="#FFF" strokeWidth="2" opacity="0.5" />
    </svg>
  );
}
