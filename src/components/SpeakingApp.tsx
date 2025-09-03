import { useState, useEffect, useRef } from 'react';
import { Mic, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DIDAvatar from './DIDAvatar';
import { useAvatarState } from '@/hooks/useAvatarState';
import { supabase } from '@/integrations/supabase/client';
import { useStreakTracker } from '@/hooks/useStreakTracker';
import { useBadgeSystem } from '@/hooks/useBadgeSystem';
import { useProgressStore } from '@/hooks/useProgressStore';
import TokenOverlay from './TokenOverlay';
import { useAuthReady } from '@/hooks/useAuthReady';
import { StreakCounter } from './StreakCounter';
import { SampleAnswerButton } from './SampleAnswerButton';
import BookmarkButton from './BookmarkButton';
import { startRecording, stopRecording, cleanup, onState, type MicState } from '@/lib/audio/micEngine';
import { useToast } from '@/hooks/use-toast';
import { TTSManager } from '@/services/TTSManager';
import { wakeLockManager } from '@/utils/wakeLock';
import { Play, Pause, MoreHorizontal, RotateCcw, Square } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

// Finite state machine: IDLE | READING | LISTENING | PROCESSING | PAUSED
type FlowState = 'IDLE' | 'READING' | 'LISTENING' | 'PROCESSING' | 'PAUSED';

// Message interface
interface Message {
  id: string;
  text: string;
  role: 'user' | 'assistant';
  content: string;
  isUser: boolean;
  isSystem: boolean;
  seq: number;
}

// Premium Chat Bubble component
const ChatBubble = ({ 
  message, 
  isUser = false, 
  className,
  isGhost = false
}: { 
  message: string; 
  isUser?: boolean; 
  className?: string; 
  isGhost?: boolean;
}) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 sm:mb-4 ${className}`}>
    <div className="flex items-start space-x-2 sm:space-x-3 max-w-[90%] sm:max-w-[85%]">
      <div 
        className={`conversation-bubble px-4 py-3 sm:px-5 sm:py-4 font-medium text-sm sm:text-base leading-relaxed flex-1 ${
          isUser 
            ? 'bg-gradient-to-br from-white/95 to-white/85 text-gray-800 border-l-4 border-orange-400' 
            : isGhost
            ? 'bg-gradient-to-br from-gray-50/50 to-gray-100/40 text-gray-600 border-l-4 border-gray-300 opacity-70'
            : 'bg-gradient-to-br from-blue-50/90 to-blue-100/80 text-gray-800 border-l-4 border-blue-400'
        }`}
      >
        {message}
      </div>
      
      {/* Bookmark button for non-user messages (AI responses) */}
      {!isUser && !isGhost && (
        <BookmarkButton
          content={message}
          type="message"
          className="mt-2 sm:mt-3 opacity-60 hover:opacity-100 text-xs sm:text-sm pill-button"
        />
      )}
    </div>
  </div>
);

interface SpeakingAppProps {
  initialMessage?: string;
}

export default function SpeakingApp({ initialMessage }: SpeakingAppProps = {}) {
  const { avatarState, setAvatarState } = useAvatarState({ isSpeaking: false });
  const { streakData, getStreakMessage } = useStreakTracker();
  const { incrementSpeakingSubmissions } = useBadgeSystem();
  const { user } = useAuthReady();
  const { toast } = useToast();
  
  // Single controller state machine
  const [flowState, setFlowState] = useState<FlowState>('IDLE');
  const [messages, setMessages] = useState<Message[]>([]);
  const [spokenKeys, setSpokenKeys] = useState<Set<string>>(new Set());
  const [currentTurnToken, setCurrentTurnToken] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [micState, setMicState] = useState<MicState>('idle');
  const [interimCaption, setInterimCaption] = useState('');
  const [ghostBubble, setGhostBubble] = useState<{ key: string; text: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Sound handling via localStorage
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('speaking.sound.enabled') !== 'false';
  });
  
  // Progress tracking
  const { level, xp_current, next_threshold, awardXp, fetchProgress } = useProgressStore();
  
  // TTS watchdog and completion handler refs
  const ttsWatchdogRef = useRef<NodeJS.Timeout>();
  const currentControllerRef = useRef<AbortController>();

  // Message key generation for deduplication
  const generateMessageKey = (text: string, serverId?: string): string => {
    if (serverId) return `server:${serverId}`;
    const hash = text.substring(0, 200).split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return `msg-${Math.abs(hash)}`;
  };

  // Turn token generation
  const generateTurnToken = (): string => {
    return `turn-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  };

  // Sound ready helper
  const ensureSoundReady = async (): Promise<{ enabled: boolean }> => {
    const enabled = localStorage.getItem('speaking.sound.enabled') !== 'false';
    if (enabled) {
      try {
        if (typeof window !== 'undefined' && window.AudioContext) {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          if (audioContext.state === 'suspended') {
            await audioContext.resume();
          }
        }
      } catch (error) {
        console.warn('Failed to enable AudioContext:', error);
      }
    }
    console.log('HF_SOUND', { enabled });
    return { enabled };
  };

  // Clean up previous operations
  const cleanupPreviousOperations = () => {
    // Cancel current controller
    if (currentControllerRef.current) {
      currentControllerRef.current.abort();
    }
    currentControllerRef.current = new AbortController();

    // Clear TTS watchdog
    if (ttsWatchdogRef.current) {
      clearTimeout(ttsWatchdogRef.current);
    }

    // Stop TTS if speaking
    if (TTSManager.isSpeaking()) {
      TTSManager.stop();
      setIsSpeaking(false);
      setAvatarState('idle');
    }

    // Stop mic if recording
    if (micState === 'recording') {
      cleanup();
    }
  };

  // Start new turn with token
  const startNewTurn = (): string => {
    const token = generateTurnToken();
    cleanupPreviousOperations();
    setCurrentTurnToken(token);
    setFlowState('IDLE');
    console.log('Starting new turn:', token);
    return token;
  };

  // TTS completion handler
  const handleTTSCompletion = async (token: string) => {
    if (token !== currentTurnToken) {
      console.log('Stale TTS completion, ignoring');
      return;
    }
    console.log('TTS completed, transitioning to LISTENING');
    setFlowState('LISTENING');
    await startMicCapture(token);
  };

  // Main play function - single entry point
  const playAssistantMessage = async (text: string, messageKey: string) => {
    const token = startNewTurn();
    setFlowState('READING');

    const { enabled } = await ensureSoundReady();

    // Mark as spoken to prevent duplicates
    setSpokenKeys(prev => new Set([...prev, messageKey]));

    // Show ghost bubble if no server message exists
    if (!hasServerMessage(messageKey)) {
      setGhostBubble({ key: messageKey, text });
    }

    // Set up TTS watchdog
    let completed = false;
    ttsWatchdogRef.current = setTimeout(() => {
      if (!completed) {
        console.warn('TTS watchdog triggered - forcing completion');
        completed = true;
        handleTTSCompletion(token);
      }
    }, 12000);

    try {
      if (enabled) {
        setIsSpeaking(true);
        setAvatarState('talking');
        await TTSManager.speak(text, { canSkip: false });
      } else {
        console.log('Sound disabled, skipping TTS');
      }
    } catch (error) {
      console.warn('TTS error:', error);
    } finally {
      completed = true;
      if (ttsWatchdogRef.current) {
        clearTimeout(ttsWatchdogRef.current);
      }
      setIsSpeaking(false);
      setAvatarState('idle');
      await handleTTSCompletion(token);
    }
  };

  // Check if server message exists for key
  const hasServerMessage = (key: string): boolean => {
    return messages.some(m => 
      m.role === 'assistant' && generateMessageKey(m.text, m.id) === key
    );
  };

  // Start mic capture
  const startMicCapture = async (token: string) => {
    if (token !== currentTurnToken) return;
    if (TTSManager.isSpeaking()) return; // One voice at a time
    
    setMicState('recording');
    setInterimCaption('');

    // Set up interim caption listener
    const unsubscribe = onState((newState) => {
      setMicState(newState);
    });

    try {
      const result = await startRecording();
      const finalTranscript = result?.transcript?.trim() || '';

      // Clear interim caption
      setInterimCaption('');
      if (unsubscribe) unsubscribe();

      if (finalTranscript) {
        // Add user message
        addMessage(finalTranscript, 'user');
        setFlowState('PROCESSING');
        
        // Execute teacher loop (existing evaluator)
        await executeTeacherLoop(finalTranscript);
      } else {
        // No input captured, restart listening
        console.log('No input captured, restarting');
        await startMicCapture(token);
      }
    } catch (error) {
      console.warn('Mic capture error:', error);
      if (unsubscribe) unsubscribe();
      setFlowState('PAUSED');
      setErrorMessage(error instanceof Error ? error.message : 'Recording failed');
    }
  };

  // Add message to conversation
  const addMessage = (text: string, role: 'user' | 'assistant', serverId?: string): Message => {
    const message: Message = {
      id: serverId || `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      text: text.trim(),
      content: text.trim(),
      role,
      isUser: role === 'user',
      isSystem: false,
      seq: messages.length + 1
    };

    setMessages(prev => [...prev, message]);
    return message;
  };

  // Get latest unspoken assistant message
  const getLatestUnspokenAssistant = (): { message: Message; key: string } | null => {
    const assistantMessages = messages.filter(m => 
      m.role === 'assistant' && !m.isSystem && m.text.trim()
    );
    
    if (assistantMessages.length === 0) return null;
    
    const latest = assistantMessages[assistantMessages.length - 1];
    const key = generateMessageKey(latest.text, latest.id);
    
    if (spokenKeys.has(key)) return null;
    
    return { message: latest, key };
  };

  // Play button handler
  const handlePlay = async () => {
    if (flowState === 'PAUSED') {
      // Resume from pause
      setFlowState('LISTENING');
      await startMicCapture(currentTurnToken);
      return;
    }

    // Check for unspoken assistant message
    const unspoken = getLatestUnspokenAssistant();
    if (unspoken) {
      await playAssistantMessage(unspoken.message.text, unspoken.key);
    } else {
      // Play starter prompt
      const starterText = "What would you like to talk about?";
      const starterKey = generateMessageKey(starterText);
      await playAssistantMessage(starterText, starterKey);
    }
  };

  // Pause handler
  const handlePause = () => {
    cleanupPreviousOperations();
    setFlowState('PAUSED');
    setInterimCaption('');
  };

  // Sound toggle
  const toggleSound = () => {
    const newEnabled = !soundEnabled;
    setSoundEnabled(newEnabled);
    localStorage.setItem('speaking.sound.enabled', newEnabled.toString());
    
    if (!newEnabled && isSpeaking) {
      TTSManager.stop();
      setIsSpeaking(false);
      setAvatarState('idle');
    }
  };

  // Execute teacher loop (placeholder - implement your existing logic)
  const executeTeacherLoop = async (userInput: string) => {
    try {
      setErrorMessage('');
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response - replace with your actual evaluator logic
      const responses = [
        "That's interesting! Can you tell me more about that?",
        "Great! I'd like to know more details about your experience.",
        "Wonderful! What made that special for you?",
        "Fascinating! How did that make you feel?",
        "Nice! Can you describe that in more detail?"
      ];
      
      const response = responses[Math.floor(Math.random() * responses.length)];
      
      // Add assistant response
      addMessage(response, 'assistant');
      
      // Award XP for participation
      await awardXp(10);
      
    } catch (error) {
      console.warn('Teacher loop error:', error);
      setErrorMessage('Failed to process your input. Please try again.');
      setFlowState('PAUSED');
    }
  };

  // Message observer - watch for new assistant messages and speak them
  useEffect(() => {
    if (!['PROCESSING', 'IDLE'].includes(flowState)) return;
    
    const unspoken = getLatestUnspokenAssistant();
    if (unspoken && flowState === 'PROCESSING') {
      // Clear ghost bubble if we have a real message
      if (ghostBubble && hasServerMessage(ghostBubble.key)) {
        setGhostBubble(null);
      }
      
      // Speak the new assistant message
      playAssistantMessage(unspoken.message.text, unspoken.key);
    }
  }, [messages, flowState]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      cleanupPreviousOperations();
      cleanup();
    };
  }, []);

  // Barge-in handling - stop TTS if user starts talking during READING
  useEffect(() => {
    if (flowState === 'READING' && micState === 'recording') {
      console.log('Barge-in detected, stopping TTS');
      if (TTSManager.isSpeaking()) {
        TTSManager.stop();
        setIsSpeaking(false);
        setAvatarState('idle');
      }
    }
  }, [flowState, micState]);

  // Voice commands handling
  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    if (lowerCommand.includes('again') || lowerCommand.includes('repeat')) {
      const latest = getLatestUnspokenAssistant();
      if (latest) {
        // Remove from spoken keys to allow replay
        setSpokenKeys(prev => {
          const newSet = new Set(prev);
          newSet.delete(latest.key);
          return newSet;
        });
        playAssistantMessage(latest.message.text, latest.key);
      }
    }
  };

  // State display helpers
  const getStateChip = () => {
    switch (flowState) {
      case 'IDLE': return { text: 'Ready', color: 'bg-gray-500' };
      case 'READING': return { text: 'Speaking', color: 'bg-blue-500' };
      case 'LISTENING': return { text: 'Listening', color: 'bg-green-500' };
      case 'PROCESSING': return { text: 'Processing', color: 'bg-yellow-500' };
      case 'PAUSED': return { text: 'Paused', color: 'bg-red-500' };
      default: return { text: 'Unknown', color: 'bg-gray-500' };
    }
  };

  const stateChip = getStateChip();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <div className="p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Speaking Practice</h1>
            <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${stateChip.color}`}>
              {stateChip.text}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <StreakCounter 
              currentStreak={streakData?.currentStreak || 0}
              message={getStreakMessage()}
              bestStreak={streakData?.bestStreak || 0}
              compact={true}
            />
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleSound}
              className="text-white border-white/20 hover:bg-white/10"
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </Button>
          </div>
        </div>

        {/* Conversation area */}
        <div className="flex-1 px-4 sm:px-6 pb-6 flex flex-col">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 flex-1 flex flex-col">
            
            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20">
                <DIDAvatar 
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto max-h-96 mb-6">
              {messages.map((msg) => (
                <ChatBubble
                  key={msg.id}
                  message={msg.text}
                  isUser={msg.isUser}
                />
              ))}
              
              {/* Ghost bubble */}
              {ghostBubble && (
                <ChatBubble
                  message={ghostBubble.text}
                  isUser={false}
                  isGhost={true}
                />
              )}
              
              {/* Interim caption */}
              {interimCaption && (
                <div className="text-center text-white/70 text-sm italic mb-2">
                  "{interimCaption}"
                </div>
              )}
            </div>

            {/* Error message */}
            {errorMessage && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-4 text-red-200 text-sm">
                {errorMessage}
              </div>
            )}

            {/* Controls */}
            <div className="flex justify-center gap-4">
              {flowState === 'PAUSED' ? (
                <Button
                  onClick={handlePlay}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full"
                >
                  <Play size={20} className="mr-2" />
                  Resume
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handlePlay}
                    disabled={flowState === 'READING' || flowState === 'PROCESSING'}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full disabled:opacity-50"
                  >
                    <Play size={20} className="mr-2" />
                    {flowState === 'IDLE' ? 'Start' : 'Play'}
                  </Button>
                  
                  <Button
                    onClick={handlePause}
                    disabled={flowState === 'IDLE'}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-full disabled:opacity-50"
                  >
                    <Pause size={20} className="mr-2" />
                    Pause
                  </Button>
                </>
              )}
            </div>

            {/* Additional controls */}
            <div className="flex justify-center mt-4 gap-2">
              <SampleAnswerButton 
                question="What would you like to talk about?"
                onSpeak={(text) => {
                  const key = generateMessageKey(text);
                  playAssistantMessage(text, key);
                }}
              />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    <MoreHorizontal size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => {
                    setMessages([]);
                    setSpokenKeys(new Set());
                    setGhostBubble(null);
                    setFlowState('IDLE');
                  }}>
                    <RotateCcw size={16} className="mr-2" />
                    Clear Conversation
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        {user && (
          <div className="p-4 sm:p-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/90 text-sm font-medium">Level {level}</span>
                <span className="text-white font-bold text-sm">
                  {xp_current} / {next_threshold} XP
                </span>
              </div>
              <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${(xp_current / next_threshold) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        <TokenOverlay soundEnabled={soundEnabled} />
      </div>
    </div>
  );
}