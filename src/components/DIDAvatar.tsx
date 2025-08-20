import { useEffect, useRef, useState } from 'react';

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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [embedLoaded, setEmbedLoaded] = useState(false);
  const [embedFailed, setEmbedFailed] = useState(false);
  
  // HeyGen Guest Streaming embed URL
  const heygenEmbedUrl = "https://app.heygen.com/guest/streaming-embed?share=eyJhdmF0YXJJZCI6IkpYd3NQZWE5N25JMEZ0RFVKUzE1dCIsImtub3dsZWRnZUJhc2VJZCI6IjQ4ZjllYzI2LWQ0ZGUtNGVjZS1hZjM2LWRjOGZlODlhNzI1OCJ9";

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-16 h-16';
      case 'lg': return 'w-32 h-32 sm:w-40 sm:h-40';
      default: return 'w-24 h-24';
    }
  };

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      
      iframe.onload = () => {
        console.log('HeyGen embed loaded successfully');
        setEmbedLoaded(true);
      };
      
      iframe.onerror = () => {
        console.error('HeyGen embed failed to load');
        setEmbedFailed(true);
      };
      
      // Set a timeout to detect failed loading
      const timeout = setTimeout(() => {
        if (!embedLoaded) {
          console.warn('HeyGen embed loading timeout');
          setEmbedFailed(true);
        }
      }, 10000); // 10 second timeout
      
      return () => clearTimeout(timeout);
    }
  }, [embedLoaded]);

  return (
    <div className={`${getSizeClasses()} ${className} relative`}>
      <div className="w-full h-full relative overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-white/30">
        {!embedFailed ? (
          <iframe
            ref={iframeRef}
            src={heygenEmbedUrl}
            className="absolute inset-0 w-full h-full object-cover"
            allow="camera; microphone; autoplay"
            frameBorder="0"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/60 text-xs">Voice only</div>
          </div>
        )}
        
        {!embedLoaded && !embedFailed && (
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