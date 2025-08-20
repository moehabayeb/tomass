import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
  const [streamConnected, setStreamConnected] = useState(false);
  const [streamFailed, setStreamFailed] = useState(false);
  const [sessionData, setSessionData] = useState<{sessionId: string, sdpUrl: string, talkUrl: string, authHeader: string} | null>(null);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-16 h-16';
      case 'lg': return 'w-32 h-32 sm:w-40 sm:h-40';
      default: return 'w-24 h-24';
    }
  };

  const createStream = async () => {
    try {
      console.log('Creating D-ID stream...');
      const response = await supabase.functions.invoke('did-start-stream');
      
      if (response.error) {
        throw new Error(response.error.message);
      }
      
      const data = response.data;
      console.log('D-ID stream created:', data);
      setSessionData(data);
      
      // Setup WebRTC
      await setupWebRTC(data);
      
    } catch (error) {
      console.error('Failed to create D-ID stream:', error);
      setStreamFailed(true);
    }
  };

  const setupWebRTC = async (data: {sessionId: string, sdpUrl: string, talkUrl: string, authHeader: string}) => {
    try {
      console.log('Setting up WebRTC connection...');
      const peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });
      peerConnectionRef.current = peerConnection;

      // Create offer
      const offer = await peerConnection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true
      });
      await peerConnection.setLocalDescription(offer);

      console.log('Sending offer to D-ID...');
      // Send offer to D-ID (use 'offer' key, not 'answer')
      const response = await fetch(data.sdpUrl, {
        method: 'POST',
        headers: {
          'Authorization': data.authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          offer: offer,
          session_id: data.sessionId
        })
      });

      if (!response.ok) {
        throw new Error(`SDP request failed: ${response.status}`);
      }

      const sdpData = await response.json();
      console.log('Received answer from D-ID');
      
      // Set remote description with the answer
      await peerConnection.setRemoteDescription(new RTCSessionDescription(sdpData.answer));

      // Handle incoming stream
      peerConnection.ontrack = (event) => {
        console.log('Received remote stream');
        if (videoRef.current && event.streams[0]) {
          videoRef.current.srcObject = event.streams[0];
          videoRef.current.muted = true;
          videoRef.current.playsInline = true;
          setStreamConnected(true);
        }
      };

      peerConnection.oniceconnectionstatechange = () => {
        console.log('ICE connection state:', peerConnection.iceConnectionState);
        if (peerConnection.iceConnectionState === 'failed') {
          console.error('ICE connection failed');
          setStreamFailed(true);
        }
      };

      peerConnection.onconnectionstatechange = () => {
        console.log('Connection state:', peerConnection.connectionState);
        if (peerConnection.connectionState === 'failed') {
          console.error('Peer connection failed');
          setStreamFailed(true);
        }
      };

    } catch (error) {
      console.error('WebRTC setup failed:', error);
      setStreamFailed(true);
    }
  };

  const avatarSpeak = async (text: string) => {
    if (!sessionData || streamFailed) {
      // Fallback to browser TTS
      console.log('D-ID not available, using browser TTS');
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
      }
      return;
    }

    try {
      console.log('D-ID avatar speaking:', text);
      const response = await fetch(sessionData.talkUrl, {
        method: 'POST',
        headers: {
          'Authorization': sessionData.authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          script: {
            type: 'text',
            input: text
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Talk request failed: ${response.status}`);
      }

      console.log('D-ID talk request sent successfully');
      
    } catch (error) {
      console.error('D-ID speak failed, falling back to TTS:', error);
      // Fallback to browser TTS
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  useEffect(() => {
    // Expose global speak function
    (window as any).avatarSpeak = avatarSpeak;
    
    // Initialize stream
    createStream();
    
    return () => {
      // Cleanup WebRTC connection
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, []);

  return (
    <div className={`${getSizeClasses()} ${className} relative`}>
      <div className="w-full h-full relative overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-white/30">
        {!streamFailed ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover rounded-full"
            onLoadedMetadata={() => {
              if (videoRef.current) {
                console.log('Video metadata loaded, starting playback');
                videoRef.current.play().catch(console.error);
              }
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/60 text-xs">Voice only</div>
          </div>
        )}
        
        {!streamConnected && !streamFailed && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/60 text-xs">Loading...</div>
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
    </div>
  );
}