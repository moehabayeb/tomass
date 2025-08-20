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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [debug, setDebug] = useState<string>('Loading test video...');
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  // Test video URL from D-ID share link
  const testVideoUrl = "https://studio.d-id.com/share?id=21027f5f886646b364bb92c73008435d";

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-16 h-16';
      case 'lg': return 'w-32 h-32 sm:w-40 sm:h-40';
      default: return 'w-24 h-24';
    }
  };

  const fallbackTTS = (text: string) => {
    console.log('Using TTS fallback for:', text);
    
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

  const handleSpeak = (text: string) => {
    setDebug('Avatar speaking...');
    // For testing, we'll just use TTS
    fallbackTTS(text);
    setTimeout(() => setDebug('Test video ready'), 2000);
  };

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      video.onloadedmetadata = () => {
        console.log('D-ID test video metadata loaded');
        setVideoLoaded(true);
        setDebug('Test video ready');
        
        video.muted = true;
        video.play().catch((error) => {
          console.error('Video playback failed:', error);
          setDebug('Video playback failed');
        });
      };
      
      video.onerror = () => {
        console.error('Video loading failed');
        setDebug('Video loading failed');
      };
      
      // Set the video source
      video.src = testVideoUrl;
    }
  }, []);

  // Expose speak function to parent component
  useEffect(() => {
    if (onSpeak) {
      (window as any).heygenSpeak = handleSpeak;
    }
  }, [onSpeak]);

  return (
    <div className={`${getSizeClasses()} ${className} relative`}>
      <div className="w-full h-full relative overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-white/30">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {!videoLoaded && (
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
      
      {debug && (
        <div className="absolute -bottom-6 left-0 text-xs text-white/60 truncate w-full">
          {debug}
        </div>
      )}
    </div>
  );
}