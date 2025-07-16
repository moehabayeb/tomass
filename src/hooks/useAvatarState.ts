import { useState, useEffect } from 'react';

type AvatarState = 'idle' | 'talking' | 'listening' | 'thinking';

interface UseAvatarStateProps {
  isRecording?: boolean;
  isSpeaking?: boolean;
  isProcessing?: boolean;
  lastMessageTime?: number;
}

export function useAvatarState({ 
  isRecording = false, 
  isSpeaking = false, 
  isProcessing = false,
  lastMessageTime 
}: UseAvatarStateProps = {}) {
  const [avatarState, setAvatarState] = useState<AvatarState>('idle');

  useEffect(() => {
    if (isProcessing) {
      setAvatarState('thinking');
    } else if (isSpeaking) {
      setAvatarState('talking');
    } else if (isRecording) {
      setAvatarState('listening');
    } else {
      // Return to idle after a brief delay
      const timer = setTimeout(() => {
        setAvatarState('idle');
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isRecording, isSpeaking, isProcessing]);

  // React to new messages with a brief talking animation
  useEffect(() => {
    if (lastMessageTime) {
      setAvatarState('talking');
      const timer = setTimeout(() => {
        setAvatarState('idle');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [lastMessageTime]);

  return { avatarState, setAvatarState };
}