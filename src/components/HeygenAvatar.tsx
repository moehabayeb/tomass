import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface DIDStreamData {
  streamId: string;
  sessionId: string;
  streamingUrl: string;
}

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [debug, setDebug] = useState<string>();
  const [streamData, setStreamData] = useState<DIDStreamData | null>(null);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-16 h-16';
      case 'lg': return 'w-32 h-32 sm:w-40 sm:h-40';
      default: return 'w-24 h-24';
    }
  };

  async function fetchStreamData() {
    try {
      console.log('Fetching D-ID stream data from Supabase function...');
      const { data, error } = await supabase.functions.invoke('get-access-token');
      
      if (error) {
        throw new Error(`Stream fetch failed: ${error.message}`);
      }
      
      if (!data) {
        throw new Error('Empty stream data received');
      }
      
      console.log('D-ID stream data received');
      return data as DIDStreamData;
    } catch (error) {
      console.error('Error fetching D-ID stream data:', error);
      setDebug(`Stream error: ${error?.message || error}`);
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
        console.log('Received remote stream');
        if (event.streams[0]) {
          setStream(event.streams[0]);
          setDebug('Avatar ready');
        }
      };
      
      pc.oniceconnectionstatechange = () => {
        console.log('ICE connection state:', pc.iceConnectionState);
        if (pc.iceConnectionState === 'failed') {
          setDebug('Connection failed');
        }
      };
      
      // Create offer
      const offer = await pc.createOffer({ 
        offerToReceiveVideo: true, 
        offerToReceiveAudio: true 
      });
      await pc.setLocalDescription(offer);
      
      setDebug('Connecting to D-ID...');
      
      // Send offer to D-ID
      const response = await fetch(`${data.streamingUrl}/sdp`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${await getDIDApiKey()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answer: offer,
          session_id: data.sessionId
        })
      });
      
      if (!response.ok) {
        throw new Error(`D-ID connection failed: ${response.status}`);
      }
      
      const answer = await response.json();
      await pc.setRemoteDescription(answer);
      
      peerConnectionRef.current = pc;
      setDebug('D-ID session created successfully');
      console.log('D-ID session created');
    } catch (error) {
      console.error('Error starting D-ID session:', error);
      const friendlyMessage = "Couldn't start avatar (invalid API key or no credits). Using regular voice for now.";
      setDebug(friendlyMessage);
    } finally {
      setIsLoadingSession(false);
    }
  }

  async function getDIDApiKey(): Promise<string> {
    // For now, we'll assume the API key is embedded in the stream data
    // In a real implementation, you might need to fetch this separately
    return 'dummy-key'; // This should be replaced with actual key handling
  }

  async function handleSpeak(text: string) {
    if (!streamData) {
      setDebug('D-ID stream not initialized');
      return;
    }
    
    try {
      setDebug('Speaking...');
      
      const response = await fetch(`${streamData.streamingUrl}/talks`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${await getDIDApiKey()}`,
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
        setDebug('Speaking complete');
      } else {
        throw new Error(`Speech failed: ${response.status}`);
      }
    } catch (error) {
      console.error('Error speaking:', error);
      setDebug(`Error speaking: ${error}`);
    }
  }

  async function endSession() {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    
    if (streamData) {
      try {
        await fetch(`${streamData.streamingUrl}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Basic ${await getDIDApiKey()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            session_id: streamData.sessionId
          })
        });
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
      console.log('Setting up video stream');
      videoRef.current.srcObject = stream;
      
      // Ensure muted for iOS autoplay compatibility
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      
      videoRef.current.onloadedmetadata = () => {
        console.log('Video metadata loaded, starting playback');
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().then(() => {
            setDebug('Video playing');
            console.log('Video playback started successfully');
          }).catch((error) => {
            console.error('Video playback failed:', error);
            setDebug(`Playback error: ${error.message}`);
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
  }, [onSpeak]);

  return (
    <div className={`${getSizeClasses()} ${className} relative`}>
      {/* Only show circular container if we have stream or are loading */}
      {(stream || isLoadingSession) && (
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
      
      {/* Fallback message when avatar failed to load */}
      {!stream && !isLoadingSession && debug?.includes("Couldn't start avatar") && (
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