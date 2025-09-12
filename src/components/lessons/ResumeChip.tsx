// Resume Chip Component
// Floating chip that appears when speech is paused, allowing quick resume

import { useState, useEffect, useRef } from 'react';
import { ResumeChipProps } from '../../types/voiceCommands';

function formatTime(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes > 0) {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${remainingSeconds}s`;
}

export function ResumeChip({
  visible,
  pausedSince,
  onResume,
  onCancel,
  position = 'center',
  animated = true,
  showTimer = true,
  className = ''
}: ResumeChipProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const chipRef = useRef<HTMLDivElement>(null);

  // Update elapsed time
  useEffect(() => {
    if (visible && pausedSince) {
      const updateElapsed = () => {
        setElapsedTime(Date.now() - pausedSince);
      };

      updateElapsed();
      intervalRef.current = window.setInterval(updateElapsed, 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setElapsedTime(0);
    }
  }, [visible, pausedSince]);

  // Handle animation entrance
  useEffect(() => {
    if (visible && animated) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [visible, animated]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!visible) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onResume();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [visible, onResume, onCancel]);

  if (!visible) {
    return null;
  }

  const getPositionClasses = () => {
    const positions = {
      top: 'resume-chip-top',
      bottom: 'resume-chip-bottom',
      center: 'resume-chip-center'
    };
    return positions[position] || positions.center;
  };

  const handleChipClick = (event: React.MouseEvent) => {
    // Prevent event bubbling
    event.stopPropagation();
    onResume();
  };

  const handleCancelClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onCancel();
  };

  return (
    <div 
      ref={chipRef}
      className={`
        resume-chip
        ${getPositionClasses()}
        ${animated ? 'animated' : ''}
        ${isAnimating ? 'entering' : ''}
        ${className}
      `}
      onClick={handleChipClick}
      role="button"
      tabIndex={0}
      aria-label="Resume speech"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onResume();
        }
      }}
    >
      {/* Main Chip Content */}
      <div className="resume-chip-content">
        {/* Play Icon */}
        <div className="resume-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>

        {/* Text Content */}
        <div className="resume-text">
          <span className="resume-label">Speech Paused</span>
          {showTimer && (
            <span className="resume-timer">
              {formatTime(elapsedTime)}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="resume-actions">
          <button
            className="resume-btn resume-btn-primary"
            onClick={handleChipClick}
            aria-label="Resume speech"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Resume
          </button>
          
          <button
            className="resume-btn resume-btn-secondary"
            onClick={handleCancelClick}
            aria-label="Cancel speech"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
            Stop
          </button>
        </div>
      </div>

      {/* Progress Ring (Optional) */}
      {animated && (
        <div className="resume-progress-ring">
          <svg className="progress-ring" width="60" height="60">
            <circle
              className="progress-ring-circle"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              r="28"
              cx="30"
              cy="30"
              style={{
                strokeDasharray: `${2 * Math.PI * 28}`,
                strokeDashoffset: `${2 * Math.PI * 28 * (1 - Math.min(elapsedTime / 30000, 1))}`,
                transform: 'rotate(-90deg)',
                transformOrigin: '50% 50%'
              }}
            />
          </svg>
        </div>
      )}

      {/* Pulse Animation */}
      <div className="resume-pulse"></div>
    </div>
  );
}

// Compact version for mobile
export function CompactResumeChip({
  visible,
  onResume,
  onCancel,
  className = ''
}: Pick<ResumeChipProps, 'visible' | 'onResume' | 'onCancel' | 'className'>) {
  if (!visible) return null;

  return (
    <div className={`resume-chip-compact ${className}`}>
      <button
        className="resume-chip-btn"
        onClick={onResume}
        aria-label="Resume speech"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </button>
      
      <button
        className="resume-chip-btn cancel"
        onClick={onCancel}
        aria-label="Stop speech"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 6h12v12H6z"/>
        </svg>
      </button>
    </div>
  );
}

// CSS Styles (to be added to global stylesheet or CSS module)
const resumeChipStyles = `
.resume-chip {
  position: fixed;
  z-index: 1001;
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  border-radius: 50px;
  box-shadow: 
    0 4px 20px rgba(74, 144, 226, 0.4),
    0 0 40px rgba(74, 144, 226, 0.2);
  cursor: pointer;
  user-select: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
  color: white;
  overflow: hidden;
}

.resume-chip:hover {
  transform: scale(1.05);
  box-shadow: 
    0 6px 25px rgba(74, 144, 226, 0.5),
    0 0 50px rgba(74, 144, 226, 0.3);
}

.resume-chip:active {
  transform: scale(0.95);
}

.resume-chip.animated.entering {
  animation: resumeChipEnter 0.3s ease-out;
}

.resume-chip-top {
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.resume-chip-bottom {
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.resume-chip-center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.resume-chip-content {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  position: relative;
  z-index: 2;
}

.resume-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: white;
}

.resume-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.resume-label {
  font-size: 14px;
  font-weight: 600;
  color: white;
}

.resume-timer {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  font-family: monospace;
}

.resume-actions {
  display: flex;
  gap: 8px;
  margin-left: 8px;
}

.resume-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: none;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.resume-btn-primary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.resume-btn-primary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.resume-btn-secondary {
  background: rgba(0, 0, 0, 0.2);
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.resume-btn-secondary:hover {
  background: rgba(0, 0, 0, 0.3);
  color: white;
}

.resume-progress-ring {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  opacity: 0.6;
}

.progress-ring {
  transform: rotate(-90deg);
}

.progress-ring-circle {
  transition: stroke-dashoffset 0.3s ease;
  stroke: rgba(255, 255, 255, 0.5);
}

.resume-pulse {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50px;
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  opacity: 0.6;
  animation: resumePulse 2s infinite;
  z-index: 1;
}

/* Compact Version */
.resume-chip-compact {
  position: fixed;
  bottom: 80px;
  right: 20px;
  z-index: 1001;
  display: flex;
  gap: 8px;
}

.resume-chip-btn {
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: #4a90e2;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
  transition: all 0.2s ease;
}

.resume-chip-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(74, 144, 226, 0.4);
}

.resume-chip-btn.cancel {
  background: #e74c3c;
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
}

.resume-chip-btn.cancel:hover {
  box-shadow: 0 6px 16px rgba(231, 76, 60, 0.4);
}

/* Animations */
@keyframes resumeChipEnter {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes resumePulse {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.3;
  }
  100% {
    transform: scale(1);
    opacity: 0.6;
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .resume-chip-content {
    padding: 10px 16px;
    gap: 10px;
  }
  
  .resume-icon {
    width: 28px;
    height: 28px;
  }
  
  .resume-label {
    font-size: 13px;
  }
  
  .resume-timer {
    font-size: 11px;
  }
  
  .resume-btn {
    padding: 5px 10px;
    font-size: 11px;
  }
  
  .resume-chip-compact {
    bottom: 20px;
    right: 16px;
  }
  
  .resume-chip-btn {
    width: 44px;
    height: 44px;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .resume-chip {
    border: 2px solid white;
  }
  
  .resume-btn-primary {
    border: 2px solid white;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .resume-chip,
  .resume-btn,
  .resume-chip-btn {
    transition: none;
  }
  
  .resume-chip.animated.entering {
    animation: none;
  }
  
  .resume-pulse {
    animation: none;
  }
}
`;

export default ResumeChip;