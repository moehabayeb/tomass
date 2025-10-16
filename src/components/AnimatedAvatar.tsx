import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import TomasAvatarSVG from './TomasAvatarSVG';

interface AnimatedAvatarProps {
  isSpeaking: boolean;
  className?: string;
}

export default function AnimatedAvatar({ isSpeaking, className }: AnimatedAvatarProps) {
  const [isBlinking, setIsBlinking] = useState(false);

  // Random blinking effect (every 3-5 seconds)
  useEffect(() => {
    const scheduleNextBlink = () => {
      const delay = 3000 + Math.random() * 2000; // Random delay between 3-5 seconds
      return setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150); // Blink duration: 150ms
        scheduleNextBlink();
      }, delay);
    };

    const timer = scheduleNextBlink();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "relative transition-all duration-300 rounded-full overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600",
        isSpeaking && "avatar-speaking animate-speaking-bounce",
        isBlinking && "avatar-blinking",
        className
      )}
    >
      <TomasAvatarSVG />

      {/* Inline styles for SVG animation - applied when avatar-speaking class is active */}
      <style>{`
        /* Mouth animation - cycle through 4 states */
        .avatar-speaking .mouth-closed {
          animation: mouth-talking 0.8s steps(4) infinite;
        }

        @keyframes mouth-talking {
          0% { opacity: 1; }
          25% { opacity: 0; }
          50% { opacity: 0; }
          75% { opacity: 0; }
          100% { opacity: 1; }
        }

        .avatar-speaking .mouth-slightly-open {
          animation: mouth-slightly-open 0.8s steps(4) infinite;
        }

        @keyframes mouth-slightly-open {
          0% { opacity: 0; }
          25% { opacity: 1; }
          50% { opacity: 0; }
          75% { opacity: 0; }
          100% { opacity: 0; }
        }

        .avatar-speaking .mouth-open {
          animation: mouth-open 0.8s steps(4) infinite;
        }

        @keyframes mouth-open {
          0% { opacity: 0; }
          25% { opacity: 0; }
          50% { opacity: 1; }
          75% { opacity: 0; }
          100% { opacity: 0; }
        }

        .avatar-speaking .mouth-wide {
          animation: mouth-wide 0.8s steps(4) infinite;
        }

        @keyframes mouth-wide {
          0% { opacity: 0; }
          25% { opacity: 0; }
          50% { opacity: 0; }
          75% { opacity: 1; }
          100% { opacity: 0; }
        }

        /* Eyelid blink animation */
        .avatar-blinking .eyelid-left,
        .avatar-blinking .eyelid-right {
          animation: blink-eyelids 0.15s ease-in-out;
        }

        @keyframes blink-eyelids {
          0% { transform: scaleY(0); opacity: 0; }
          50% { transform: scaleY(1); opacity: 1; }
          100% { transform: scaleY(0); opacity: 0; }
        }

        /* Subtle pupil movement when speaking */
        .avatar-speaking .pupil-left,
        .avatar-speaking .pupil-right {
          animation: pupil-move 2s ease-in-out infinite;
        }

        @keyframes pupil-move {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(0.5px, 0); }
          50% { transform: translate(0, 0.5px); }
          75% { transform: translate(-0.5px, 0); }
        }

        /* Speaking bounce animation (defined in global CSS) */
        .animate-speaking-bounce {
          animation: speaking-bounce 0.6s ease-in-out infinite;
        }

        @keyframes speaking-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
}
