import { useEffect, useRef, useState } from 'react';
import StreamingAvatar, { 
  AvatarQuality, 
  VoiceEmotion,
  TaskType,
  TaskMode
} from '@heygen/streaming-avatar';

interface HeygenAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  state?: 'idle' | 'talking' | 'listening' | 'thinking';
  className?: string;
  onSpeak?: (text: string) => void;
}

export default function HeygenAvatar({ 
  size = 'md', 
  state = 'idle',
  className = "",
  onSpeak
}: HeygenAvatarProps) {
  const mediaStream = useRef<HTMLVideoElement>(null);
  const avatar = useRef<StreamingAvatar | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [isLoadingRepeat, setIsLoadingRepeat] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [debug, setDebug] = useState<string>();
  const [sessionId, setSessionId] = useState('');

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-16 h-16';
      case 'lg': return 'w-32 h-32';
      default: return 'w-24 h-24';
    }
  };

  async function fetchAccessToken() {
    try {
      const response = await fetch('https://sgzhbiknaiqsuknwgvjr.supabase.co/functions/v1/get-access-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const token = await response.text();
      console.log('Access Token:', token);
      return token;
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
    return '';
  }

  async function startSession() {
    setIsLoadingSession(true);
    const newToken = await fetchAccessToken();
    
    avatar.current = new StreamingAvatar({
      token: newToken,
    });
    
    avatar.current.on('avatar_start_talking', (e) => {
      console.log('Avatar started talking', e);
    });
    
    avatar.current.on('avatar_stop_talking', (e) => {
      console.log('Avatar stopped talking', e);
    });

    avatar.current.on('stream_ready', (event) => {
      console.log('Stream ready:', event.detail);
      setStream(event.detail);
    });
    
    avatar.current.on('stream_disconnected', () => {
      console.log('Stream disconnected');
      setStream(undefined);
    });

    try {
      const res = await avatar.current.createStartAvatar({
        quality: AvatarQuality.Low,
        avatarName: 'Graham_Black_Shirt_public',
        knowledgeId: '', // Optional
        voice: {
          voiceId: 'bf991597-6c13-4ebf-9d86-8a8c27a9b73e', // English voice
          emotion: VoiceEmotion.EXCITED,
        },
        language: 'en',
        disableIdleTimeout: false,
      });

      setSessionId(res.session_id);
      console.log(res);
    } catch (error) {
      console.error('Error starting avatar:', error);
      setDebug(`Error starting avatar: ${error}`);
    } finally {
      setIsLoadingSession(false);
    }
  }

  async function handleSpeak(text: string) {
    if (!avatar.current) {
      setDebug('Avatar API not initialized');
      return;
    }
    
    setIsLoadingRepeat(true);
    try {
      await avatar.current.speak({
        text: text,
        taskType: TaskType.TALK,
        taskMode: TaskMode.ASYNC
      });
    } catch (error) {
      console.error('Error speaking:', error);
      setDebug(`Error speaking: ${error}`);
    } finally {
      setIsLoadingRepeat(false);
    }
  }

  async function endSession() {
    if (!avatar.current) {
      setDebug('Avatar API not initialized');
      return;
    }
    
    try {
      await avatar.current.stopAvatar();
      setStream(undefined);
      setSessionId('');
    } catch (error) {
      console.error('Error ending avatar:', error);
      setDebug(`Error ending avatar: ${error}`);
    }
  }

  useEffect(() => {
    if (mediaStream.current && stream) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current!.play();
        setDebug('Playing');
      };
    }
  }, [mediaStream, stream]);

  // Initialize session on component mount
  useEffect(() => {
    if (!avatar.current) {
      startSession();
    }
    
    return () => {
      endSession();
    };
  }, []);

  // Expose speak function to parent component
  useEffect(() => {
    if (onSpeak && avatar.current) {
      (window as any).heygenSpeak = handleSpeak;
    }
  }, [onSpeak, avatar.current]);

  return (
    <div className={`${getSizeClasses()} ${className} relative overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-white/30`}>
      {stream ? (
        <video
          ref={mediaStream}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          {isLoadingSession ? (
            <div className="text-white/60 text-xs">Loading...</div>
          ) : (
            <div className="text-white/60 text-xs">No video</div>
          )}
        </div>
      )}
      
      {/* State indicator overlay */}
      {state === 'listening' && (
        <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse" />
      )}
      {state === 'thinking' && (
        <div className="absolute inset-0 bg-yellow-500/20 rounded-full animate-pulse" />
      )}
      {state === 'talking' && (
        <div className="absolute inset-0 bg-green-500/20 rounded-full animate-pulse" />
      )}
      
      {debug && (
        <div className="absolute -bottom-6 left-0 text-xs text-white/60 truncate w-full">
          {debug}
        </div>
      )}
    </div>
  );
}