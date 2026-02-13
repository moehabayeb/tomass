import React from 'react';
import tomasAvatar from '../assets/tomas-avatar-512.webp';

interface TomasAvatarImageProps {
  isSpeaking?: boolean;
  className?: string;
}

/**
 * Tomas AI Avatar Component
 * Displays the professional avatar image with speaking animations
 */
export const TomasAvatarImage: React.FC<TomasAvatarImageProps> = ({
  isSpeaking = false,
  className = ''
}) => {
  return (
    <img
      src={tomasAvatar}
      alt="Tomas AI"
      className={className}
      style={{
        transition: 'transform 0.2s ease-in-out, filter 0.2s ease-in-out',
        transform: isSpeaking ? 'scale(1.05)' : 'scale(1)',
        filter: isSpeaking ? 'brightness(1.1) drop-shadow(0 0 8px rgba(139, 92, 246, 0.3))' : 'brightness(1)',
        animation: isSpeaking ? 'speaking-pulse 0.6s ease-in-out infinite' : 'none',
      }}
    />
  );
};

export default TomasAvatarImage;
