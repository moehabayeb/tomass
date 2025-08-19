import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface DIDStreamData {
  sessionId: string;
  streamingUrl: string;
  avatarIdOrSource: string;
}

interface DIDAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  state?: 'idle' | 'talking' | 'listening' | 'thinking';
  className?: string;
  onSpeak?: (text: string) => void;
}

export default function DIDAvatar({ 
  size = 'md', 
  state = 'idle',
  className = "",
  onSpeak
}: DIDAvatarProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [debug, setDebug] = useState<string>();
  const [streamData, setStreamData] = useState<DIDStreamData | null>(null);
  const [useTTSFallback, setUseTTSFallback] = useState(false);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-16 h-16';
      case 'lg': return 'w-32 h-32 sm:w-40 sm:h-40';
      default: return 'w-24 h-24';
    }
  };

  const fallbackTTS = (text: string) => {
    console.log('Using TTS fallback for:', text);
    setUseTTSFallback(true);
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Try to find an English voice
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
      if (englishVoice) utterance.voice = englishVoice;
      
      window.speechSynthesis.speak(utterance);
      onSpeak?.(text);
    }
  };

  async function fetchStreamData() {
    try {
      console.log('Fetching D-ID stream data from Supabase function...');
      const { data, error } = await supabase.functions.invoke('did-start-stream');
      
      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Stream fetch failed: ${error.message}`);
      }
      
      if (!data || !data.sessionId || !data.streamingUrl) {
        console.error('Invalid stream data received:', data);
        throw new Error('Invalid stream data received');
      }
      
      console.log('D-ID stream data received successfully');
      return data as DIDStreamData;
    } catch (error) {
      console.error('Error fetching D-ID stream data:', error);
      throw error;
    }
  }

  async function startSession() {
    setIsLoadingSession(true);
    setDebug('Fetching D-ID stream...');
    
    try {
      const data = await fetchStreamData();
      setStreamData(data);
      
      setDebug('Setting up WebRTC...');
      
      // Create WebRTC peer connection
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });
      
      pc.ontrack = (event) => {
        console.log('Received remote stream from D-ID');
        if (event.streams[0]) {
          setStream(event.streams[0]);
          setDebug('Avatar ready');
        }
      };
      
      pc.oniceconnectionstatechange = () => {
        console.log('ICE connection state:', pc.iceConnectionState);
        if (pc.iceConnectionState === 'failed') {
          console.error('WebRTC connection failed');
          setDebug('Connection failed, using voice only');
          setUseTTSFallback(true);
        }
      };
      
      // Create offer for WebRTC
      const offer = await pc.createOffer({ 
        offerToReceiveVideo: true, 
        offerToReceiveAudio: true 
      });
      await pc.setLocalDescription(offer);
      
      setDebug('Connecting to D-ID...');
      
      // Send offer to D-ID streaming endpoint
      const didApiKey = await getDIDApiKey();
      const response = await fetch(data.streamingUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${didApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answer: offer,
          session_id: data.sessionId
        })
      });
      
      if (!response.ok) {
        throw new Error(`D-ID WebRTC setup failed: ${response.status}`);
      }
      
      const answerData = await response.json();
      if (answerData.answer) {
        await pc.setRemoteDescription(answerData.answer);
      }
      
      peerConnectionRef.current = pc;
      setDebug('D-ID avatar connected');
      console.log('D-ID WebRTC session established successfully');
    } catch (error) {
      console.error('Error starting D-ID session:', error);
      const friendlyMessage = "Couldn't start avatar (invalid API key or no credits). Using voice only.";
      setDebug(friendlyMessage);
      setUseTTSFallback(true);
    } finally {
      setIsLoadingSession(false);
    }
  }

  async function getDIDApiKey(): Promise<string> {
    // In production, the API key should come from the server
    // For now, we'll assume it's handled server-side
    return 'server-handled';
  }

  async function handleSpeak(text: string) {
    if (!streamData || useTTSFallback) {
      fallbackTTS(text);
      return;
    }
    
    try {
      setDebug('Avatar speaking...');
      
      const didApiKey = await getDIDApiKey();
      const response = await fetch(`https://api.d-id.com/v1/streams/${streamData.sessionId}/talks`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${didApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          script: {
            type: 'text',
            input: text
          },
          session_id: streamData.sessionId
        })
      });
      
      if (response.ok) {
        onSpeak?.(text);
        setDebug('Avatar spoke successfully');
      } else {
        throw new Error(`D-ID speak failed: ${response.status}`);
      }
    } catch (error) {
      console.error('Error making D-ID avatar speak, falling back to TTS:', error);
      setDebug('Using voice only');
      fallbackTTS(text);
    }
  }

  async function endSession() {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    
    if (streamData && !useTTSFallback) {
      try {
        const didApiKey = await getDIDApiKey();
        await fetch(`https://api.d-id.com/v1/streams/${streamData.sessionId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Basic ${didApiKey}`,
            'Content-Type': 'application/json',
          }
        });
        console.log('D-ID session ended successfully');
      } catch (error) {
        console.error('Error ending D-ID session:', error);
      }
      setStreamData(null);
    }
    
    setStream(undefined);
    setDebug('Session ended');
  }

  useEffect(() => {
    if (videoRef.current && stream) {
      console.log('Setting up D-ID video stream');
      videoRef.current.srcObject = stream;
      
      // Ensure proper video settings for autoplay
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      
      videoRef.current.onloadedmetadata = () => {
        console.log('D-ID video metadata loaded, starting playback');
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().then(() => {
            setDebug('Avatar video playing');
            console.log('D-ID video playback started successfully');
          }).catch((error) => {
            console.error('D-ID video playback failed:', error);
            setDebug('Video playback failed, using voice only');
            setUseTTSFallback(true);
          });
        }
      };
    }
  }, [stream]);

  // Initialize session on component mount
  useEffect(() => {
    startSession();
    
    return () => {
      endSession();
    };
  }, []);

  // Expose speak function to parent component
  useEffect(() => {
    if (onSpeak) {
      (window as any).heygenSpeak = handleSpeak;
    }
  }, [onSpeak, streamData, useTTSFallback]);

  return (
    <div className={`${getSizeClasses()} ${className} relative`}>
      {/* Show circular container if we have stream or are loading */}
      {(stream || isLoadingSession) && !useTTSFallback && (
        <div className="w-full h-full relative overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-white/30">
          {stream ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              {isLoadingSession && (
                <div className="text-white/60 text-xs">Loading...</div>
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
      )}
      
      {/* Fallback message when avatar failed to load or using TTS */}
      {(useTTSFallback || (!stream && !isLoadingSession)) && (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full border-2 border-white/20">
          <div className="text-white/60 text-xs text-center px-2">
            Voice only
          </div>
        </div>
      )}
      
      {debug && (
        <div className="absolute -bottom-6 left-0 text-xs text-white/60 truncate w-full">
          {debug}
        </div>
      )}
    </div>
  );
}