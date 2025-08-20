import { useEffect, useRef, useState } from 'react';

interface DIDAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  state?: 'idle' | 'talking' | 'listening' | 'thinking';
  className?: string;
  isSpeaking?: boolean; // Controls animation state
}

export default function DIDAvatar({ 
  size = 'md', 
  state = 'idle',
  className = "",
  isSpeaking = false
}: DIDAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [agentLoaded, setAgentLoaded] = useState(false);
  const [agentFailed, setAgentFailed] = useState(false);
  const agentRef = useRef<any>(null);
  const [avatarState, setAvatarState] = useState<'idle' | 'talking' | 'listening' | 'thinking'>('idle');

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-16 h-16';
      case 'lg': return 'w-32 h-32 sm:w-40 sm:h-40';
      default: return 'w-24 h-24';
    }
  };

  // Listen for avatar events from TomasVoice
  useEffect(() => {
    const handleTalkingStart = () => setAvatarState('talking');
    const handleTalkingEnd = () => setAvatarState('idle');
    
    window.addEventListener('avatar:talking:start', handleTalkingStart);
    window.addEventListener('avatar:talking:end', handleTalkingEnd);
    
    return () => {
      window.removeEventListener('avatar:talking:start', handleTalkingStart);
      window.removeEventListener('avatar:talking:end', handleTalkingEnd);
    };
  }, []);

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

  // D-ID is now purely visual - no speaking functionality
  useEffect(() => {
    // Initialize D-ID agent for visual animation only
    initializeDIDAgent();
    
    return () => {
      // Cleanup - remove the script and agent
      const script = document.querySelector('script[src*="agent.d-id.com"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  // Update visual state - prioritize avatar events over props
  const currentState = avatarState !== 'idle' ? avatarState : (isSpeaking ? 'talking' : state);

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
            {/* Animated fallback avatar */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              {/* Face circle */}
              <div 
                className={`w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center transition-transform duration-300 ${
                  currentState === 'talking' ? 'scale-105' : 'scale-100'
                }`}
              >
                {/* Eyes */}
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
              
              {/* Mouth animation */}
              <div 
                className={`absolute bottom-3 w-3 h-1.5 rounded-full transition-all duration-200 ${
                  currentState === 'talking' 
                    ? 'bg-white animate-pulse scale-110' 
                    : 'bg-white/70 scale-100'
                }`}
              ></div>
              
              {/* Speaking indicator rings */}
              {currentState === 'talking' && (
                <>
                  <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div>
                  <div className="absolute inset-1 rounded-full border border-white/20 animate-pulse"></div>
                </>
              )}
            </div>
          </div>
        )}
        
        {!agentLoaded && !agentFailed && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/60 text-xs">Loading...</div>
          </div>
        )}
        
        {/* State indicator overlay */}
        {currentState === 'listening' && (
          <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse" />
        )}
        {currentState === 'thinking' && (
          <div className="absolute inset-0 bg-yellow-500/20 rounded-full animate-pulse" />
        )}
        {currentState === 'talking' && (
          <div className="absolute inset-0 bg-green-500/20 rounded-full animate-pulse" />
        )}
      </div>
    </div>
  );
}