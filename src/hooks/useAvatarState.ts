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
    let timer: NodeJS.Timeout | undefined;
    
    if (isProcessing) {
      setAvatarState('thinking');
    } else if (isSpeaking) {
      setAvatarState('talking');
    } else if (isRecording) {
      setAvatarState('listening');
    } else {
      // Return to idle after a brief delay
      timer = setTimeout(() => {
        setAvatarState('idle');
      }, 1000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isRecording, isSpeaking, isProcessing]);

  // React to new messages with a brief talking animation
  useEffect(() => {
    if (lastMessageTime) {
      setAvatarState('talking');
      // Extended talking duration to feel more natural
      const timer = setTimeout(() => {
        if (!isSpeaking) { // Only return to idle if not actually speaking
          setAvatarState('idle');
        }
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [lastMessageTime, isSpeaking]);

  // Method to manually trigger specific states for fine control
  const triggerState = (state: AvatarState, duration: number = 2000) => {
    setAvatarState(state);
    setTimeout(() => {
      if (!isRecording && !isSpeaking && !isProcessing) {
        setAvatarState('idle');
      }
    }, duration);
  };

  return { avatarState, setAvatarState, triggerState };
}