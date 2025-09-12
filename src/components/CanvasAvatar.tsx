import { useEffect, useRef, useState } from 'react';

interface CanvasAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  state?: 'idle' | 'talking' | 'listening' | 'thinking';
  className?: string;
}

export default function CanvasAvatar({ 
  size = 'md', 
  state = 'idle',
  className = "" 
}: CanvasAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [baseImage, setBaseImage] = useState<HTMLImageElement | null>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  const getSizeValue = () => {
    switch (size) {
      case 'sm': return 48;
      case 'lg': return 128;
      default: return 80;
    }
  };

  const sizeValue = getSizeValue();

  // Load base image
  useEffect(() => {
    const img = new Image();
    img.onload = () => setBaseImage(img);
    img.src = "/lovable-uploads/6e3efb4a-cd6e-4a8c-9fc3-d983b417a8b8.png";
  }, []);

  // Animation loop
  useEffect(() => {
    if (!baseImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let blinkTimer = 0;
    let mouthTimer = 0;
    let idleTimer = 0;
    let isBlinking = false;

    const animate = () => {
      timeRef.current += 0.016; // ~60fps
      
      // Clear canvas
      ctx.clearRect(0, 0, sizeValue, sizeValue);
      
      // Save context for transformations
      ctx.save();
      ctx.translate(sizeValue / 2, sizeValue / 2);

      // Subtle head movement for different states
      let headRotation = 0;
      let headBob = 0;
      
      if (state === 'listening') {
        headRotation = Math.sin(timeRef.current * 0.8) * 0.05; // Gentle tilt
        headBob = Math.sin(timeRef.current * 1.2) * 2;
      } else if (state === 'thinking') {
        headRotation = Math.sin(timeRef.current * 0.5) * 0.08;
      } else if (state === 'idle') {
        // Occasional subtle movements
        idleTimer += 0.016;
        if (idleTimer > 8) { // Every 8 seconds
          headBob = Math.sin(timeRef.current * 2) * 1.5;
          if (idleTimer > 9) idleTimer = 0;
        }
      }

      ctx.rotate(headRotation);
      ctx.translate(0, headBob);

      // Draw base avatar (centered)
      ctx.drawImage(baseImage, -sizeValue / 2, -sizeValue / 2, sizeValue, sizeValue);

      // Eye blinking animation
      blinkTimer += 0.016;
      if (blinkTimer > (3 + Math.random() * 2)) { // Random blink interval
        isBlinking = true;
        if (blinkTimer > (3.15 + Math.random() * 2)) {
          isBlinking = false;
          blinkTimer = 0;
        }
      }

      if (isBlinking) {
        // Draw closed eyes (simple dark ellipses)
        ctx.fillStyle = '#8B7355'; // Skin tone color
        const eyeY = -sizeValue * 0.12;
        const eyeWidth = sizeValue * 0.08;
        const eyeHeight = sizeValue * 0.02;
        
        // Left eye
        ctx.beginPath();
        ctx.ellipse(-sizeValue * 0.12, eyeY, eyeWidth, eyeHeight, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Right eye
        ctx.beginPath();
        ctx.ellipse(sizeValue * 0.12, eyeY, eyeWidth, eyeHeight, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Mouth animation for talking
      if (state === 'talking') {
        mouthTimer += 0.016;
        const mouthCycle = Math.sin(mouthTimer * 8) * 0.5 + 0.5; // 0 to 1
        
        // Create different mouth shapes
        ctx.fillStyle = '#2D1810'; // Dark mouth color
        const mouthY = sizeValue * 0.15;
        
        if (mouthCycle < 0.25) {
          // Small 'o' shape
          ctx.beginPath();
          ctx.ellipse(0, mouthY, sizeValue * 0.025, sizeValue * 0.035, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (mouthCycle < 0.5) {
          // Medium oval
          ctx.beginPath();
          ctx.ellipse(0, mouthY, sizeValue * 0.04, sizeValue * 0.025, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (mouthCycle < 0.75) {
          // Wide open
          ctx.beginPath();
          ctx.ellipse(0, mouthY, sizeValue * 0.05, sizeValue * 0.04, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Slight smile
          ctx.beginPath();
          ctx.arc(0, mouthY - sizeValue * 0.01, sizeValue * 0.03, 0, Math.PI);
          ctx.fill();
        }
      }

      // Subtle glow effect based on state
      if (state === 'listening') {
        ctx.shadowColor = '#3B82F6';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      } else if (state === 'thinking') {
        ctx.shadowColor = '#8B5CF6';
        ctx.shadowBlur = 10;
      } else if (state === 'talking') {
        ctx.shadowColor = '#10B981';
        ctx.shadowBlur = 12;
      }

      ctx.restore();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [baseImage, state, sizeValue]);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        width={sizeValue}
        height={sizeValue}
        className="rounded-full"
        style={{
          width: sizeValue,
          height: sizeValue,
          filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.2))',
        }}
      />
      
      {/* State indicator with better design */}
      {state !== 'idle' && (
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-white to-gray-100 border border-white/50 flex items-center justify-center shadow-lg backdrop-blur-sm">
          {state === 'talking' && <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
          {state === 'listening' && <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />}
          {state === 'thinking' && <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" />}
        </div>
      )}

      {/* Floating speech particles for talking */}
      {state === 'talking' && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce opacity-70" style={{ animationDelay: '0ms', animationDuration: '800ms' }} />
            <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce opacity-70" style={{ animationDelay: '150ms', animationDuration: '800ms' }} />
            <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce opacity-70" style={{ animationDelay: '300ms', animationDuration: '800ms' }} />
          </div>
        </div>
      )}
    </div>
  );
}