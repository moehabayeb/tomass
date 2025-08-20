import { useEffect, useRef, useState } from 'react';
import { configureUtterance } from '@/config/voice';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [agentLoaded, setAgentLoaded] = useState(false);
  const [agentFailed, setAgentFailed] = useState(false);
  const agentRef = useRef<any>(null);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-16 h-16';
      case 'lg': return 'w-32 h-32 sm:w-40 sm:h-40';
      default: return 'w-24 h-24';
    }
  };

  const initializeDIDAgent = async () => {
    try {
      console.log('Initializing D-ID agent...');
      
      // Remove any existing script
      const existingScript = document.querySelector('script[src*="agent.d-id.com"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Create and load the D-ID agent script
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://agent.d-id.com/v2/index.js';
      script.setAttribute('data-mode', 'fabio');
      script.setAttribute('data-client-key', 'Z29vZ2xILW9hdXRoMnwxMTM5MTg0NTQ0NzE3Mz');
      script.setAttribute('data-agent-id', 'v2_agt_ZthBshyK');
      script.setAttribute('data-name', 'did-agent');
      script.setAttribute('data-monitor', 'true');
      script.setAttribute('data-orientation', 'horizontal');
      script.setAttribute('data-position', 'right');

      // Hide the default D-ID interface and embed in our container
      script.onload = () => {
        console.log('D-ID script loaded');
        
        // Wait for agent to initialize
        setTimeout(() => {
          try {
            const agent = (window as any)['did-agent'];
            if (agent) {
              agentRef.current = agent;
              
              // Try to find and move the D-ID element into our container
              const didElement = document.querySelector('[data-name="did-agent"]');
              if (didElement && containerRef.current) {
                // Style the D-ID element to fit our circular container
                (didElement as HTMLElement).style.width = '100%';
                (didElement as HTMLElement).style.height = '100%';
                (didElement as HTMLElement).style.borderRadius = '50%';
                (didElement as HTMLElement).style.overflow = 'hidden';
                
                // Move it into our container
                containerRef.current.appendChild(didElement);
                setAgentLoaded(true);
                console.log('D-ID agent initialized and embedded');
              } else {
                console.warn('D-ID element not found, agent may still work');
                setAgentLoaded(true);
              }
            } else {
              console.error('D-ID agent not found on window');
              setAgentFailed(true);
            }
          } catch (error) {
            console.error('Error accessing D-ID agent:', error);
            setAgentFailed(true);
          }
        }, 2000);
      };

      script.onerror = () => {
        console.error('Failed to load D-ID script');
        setAgentFailed(true);
      };

      document.head.appendChild(script);
      
    } catch (error) {
      console.error('Error initializing D-ID agent:', error);
      setAgentFailed(true);
    }
  };

  const avatarSpeak = async (text: string) => {
    if (!agentRef.current || agentFailed) {
      // Fallback to browser TTS with consistent Thomas voice
      console.log('D-ID agent not available, using browser TTS with Thomas voice');
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        configureUtterance(utterance, text);
        window.speechSynthesis.speak(utterance);
      }
      return;
    }

    try {
      console.log('D-ID agent speaking:', text);
      
      // Try different methods to make the agent speak
      if (agentRef.current.chat) {
        await agentRef.current.chat(text);
      } else if (agentRef.current.speak) {
        await agentRef.current.speak(text);
      } else if (agentRef.current.sendMessage) {
        await agentRef.current.sendMessage(text);
      } else {
        throw new Error('No speak method found on D-ID agent');
      }
      
      console.log('D-ID agent speak request sent successfully');
      
    } catch (error) {
      console.error('D-ID agent speak failed, falling back to TTS:', error);
      // Fallback to browser TTS with consistent Thomas voice
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        configureUtterance(utterance, text);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  useEffect(() => {
    // Expose global speak function
    (window as any).avatarSpeak = avatarSpeak;
    
    // Initialize D-ID agent
    initializeDIDAgent();
    
    return () => {
      // Cleanup - remove the script and agent
      const script = document.querySelector('script[src*="agent.d-id.com"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <div className={`${getSizeClasses()} ${className} relative`}>
      <div className="w-full h-full relative overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-white/30">
        {!agentFailed ? (
          <div 
            ref={containerRef}
            className="absolute inset-0 w-full h-full rounded-full overflow-hidden"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/60 text-xs">Voice only</div>
          </div>
        )}
        
        {!agentLoaded && !agentFailed && (
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