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
      case 'lg': return 'w-32 h-32 sm:w-40 sm:h-40';
      default: return 'w-24 h-24';
    }
  };

  async function fetchAccessToken() {
    try {
      console.log('Fetching access token from Supabase function...');
      const response = await fetch('https://sgzhbiknaiqsuknwgvjr.supabase.co/functions/v1/get-access-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Token fetch failed: ${response.status} ${errorText}`);
      }
      
      const token = await response.text();
      console.log('Access Token received:', token ? 'Success' : 'Empty');
      
      if (!token) {
        throw new Error('Empty token received');
      }
      
      return token;
    } catch (error) {
      console.error('Error fetching access token:', error);
      setDebug(`Token error: ${error?.message || error}`);
      throw error;
    }
  }

  async function startSession() {
    setIsLoadingSession(true);
    setDebug('Fetching access token...');
    
    try {
      const newToken = await fetchAccessToken();
      
      if (!newToken) {
        throw new Error('Failed to fetch access token');
      }
      
      setDebug('Initializing avatar...');
      avatar.current = new StreamingAvatar({
        token: newToken,
      });
      
      // Set up event listeners
      avatar.current.on('avatar_start_talking', (e) => {
        console.log('Avatar started talking', e);
        setDebug('Avatar talking');
      });
      
      avatar.current.on('avatar_stop_talking', (e) => {
        console.log('Avatar stopped talking', e);
        setDebug('Avatar stopped');
      });

      avatar.current.on('stream_ready', (event) => {
        console.log('Stream ready:', event.detail);
        setStream(event.detail);
        setDebug('Stream ready');
      });
      
      avatar.current.on('stream_disconnected', () => {
        console.log('Stream disconnected');
        setStream(undefined);
        setDebug('Stream disconnected');
      });

      avatar.current.on('user_start_talking', (e) => {
        console.log('User started talking', e);
      });

      avatar.current.on('user_stop_talking', (e) => {
        console.log('User stopped talking', e);
      });

      // Create and start avatar directly (no separate connect method needed)
      
      setDebug('Creating avatar session...');
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
      setDebug('Avatar session created successfully');
      console.log('Avatar session created:', res);
    } catch (error) {
      console.error('Error starting avatar:', error);
      setDebug(`Error: ${error?.message || error}`);
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
      console.log('Setting up video stream');
      mediaStream.current.srcObject = stream;
      
      // Ensure muted for iOS autoplay compatibility
      mediaStream.current.muted = true;
      mediaStream.current.playsInline = true;
      
      mediaStream.current.onloadedmetadata = () => {
        console.log('Video metadata loaded, starting playback');
        // Double-check muted state before playing
        if (mediaStream.current) {
          mediaStream.current.muted = true;
          mediaStream.current.play().then(() => {
            setDebug('Video playing');
            console.log('Video playback started successfully');
          }).catch((error) => {
            console.error('Video playback failed:', error);
            setDebug(`Playback error: ${error.message}`);
          });
        }
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
    <div className={`${getSizeClasses()} ${className} relative`}>
      {/* Circular container for avatar video */}
      <div className="w-full h-full relative overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-white/30">
        {stream ? (
          <video
            ref={mediaStream}
            autoPlay
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
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
      </div>
      
      {debug && (
        <div className="absolute -bottom-6 left-0 text-xs text-white/60 truncate w-full">
          {debug}
        </div>
      )}
    </div>
  );
}