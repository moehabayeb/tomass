import { useState, useEffect, useMemo } from 'react';
import { Mic, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import DIDAvatar from './DIDAvatar';
import { useAvatarState } from '@/hooks/useAvatarState';
import { useSpeakingTTS } from '@/hooks/useSpeakingTTS';
import { supabase } from '@/integrations/supabase/client';
import { useStreakTracker } from '@/hooks/useStreakTracker';
import { useBadgeSystem } from '@/hooks/useBadgeSystem';
import { useProgressStore } from '@/hooks/useProgressStore';
import TokenOverlay from './TokenOverlay';
import { useAuthReady } from '@/hooks/useAuthReady';
import { StreakCounter } from './StreakCounter';
import { SampleAnswerButton } from './SampleAnswerButton';
import BookmarkButton from './BookmarkButton';
import { startRecording, stopRecording, getState, onState, cleanup, type MicState } from '@/lib/audio/micEngine';
import { useToast } from '@/hooks/use-toast';
import { TTSManager } from '@/services/TTSManager';
import { wakeLockManager } from '@/utils/wakeLock';
import { Play, Pause, MoreHorizontal, RotateCcw, Square } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

// Feature flags
const SPEAKING_HANDS_FREE = true; // Default ON for minimal UI
const HF_BARGE_IN = true; // Barge-in feature flag (enabled for V2)
const HF_VOICE_COMMANDS = true; // Voice commands feature flag (default ON)
const SPEAKING_HF_MINUI = true; // Minimal hands-free UI (default ON)
const SPEAKING_HANDS_FREE_V2 = true; // V2 features (default ON for speaking page)
const SPEAKING_HANDS_FREE_MINIMAL = true; // Enable minimal UI by default

// Sparkle component for background decoration
const Sparkle = ({ className, delayed = false }: { className?: string; delayed?: boolean }) => (
  <div 
    className={`absolute w-2 h-2 bg-yellow-300 rounded-full ${delayed ? 'sparkle-delayed' : 'sparkle'} ${className}`}
    style={{ 
      boxShadow: '0 0 8px currentColor',
      clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
    }}
  />
);

// Premium XP Progress Bar component
const XPProgressBar = ({ current, max, className }: { current: number; max: number; className?: string }) => {
  const percentage = (current / max) * 100;
  
  return (
    <div className={`relative ${className}`}>
      <div 
        className="w-full h-4 rounded-full overflow-hidden bg-black/20 backdrop-blur-sm"
        style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' }}
      >
        <div 
          className="h-full transition-all duration-700 ease-out rounded-full relative overflow-hidden"
          style={{ 
            width: `${percentage}%`,
            background: 'var(--gradient-xp)',
            boxShadow: 'var(--shadow-glow)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-white/90 text-sm font-medium">⚡ XP</span>
        <span className="text-white font-bold text-sm">
          {current} / {max}
        </span>
      </div>
    </div>
  );
};

// Premium Chat Bubble component
const ChatBubble = ({ 
  message, 
  isUser = false, 
  className 
}: { 
  message: string; 
  isUser?: boolean; 
  className?: string; 
}) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 sm:mb-4 ${className}`}>
    <div className="flex items-start space-x-2 sm:space-x-3 max-w-[90%] sm:max-w-[85%]">
      <div 
        className={`conversation-bubble px-4 py-3 sm:px-5 sm:py-4 font-medium text-sm sm:text-base leading-relaxed flex-1 ${
          isUser 
            ? 'bg-gradient-to-br from-white/95 to-white/85 text-gray-800 border-l-4 border-orange-400' 
            : 'bg-gradient-to-br from-blue-50/90 to-blue-100/80 text-gray-800 border-l-4 border-blue-400'
        }`}
      >
        {message}
      </div>
      
      {/* Bookmark button for non-user messages (AI responses) */}
      {!isUser && (
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
  console.log('SpeakingApp component loading...');  // Debug log to help identify syntax issues
  
  // Add simple syntax check
  const syntaxCheck = () => {
    return true;
  };
  syntaxCheck();
  
  const { avatarState, setAvatarState } = useAvatarState({ isSpeaking: false });
  const [didAvatarRef, setDIDAvatarRef] = useState<any>(null);
  const { streakData, getStreakMessage } = useStreakTracker();
  const { incrementSpeakingSubmissions } = useBadgeSystem();
  const { user } = useAuthReady();
  const { toast } = useToast();
  
  // G) Single source of truth: Speaking page sound state
  const [speakingSoundEnabled, setSpeakingSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('speaking.sound.enabled');
    return saved !== null ? saved === 'true' : true; // Default = true
  });
  const [audioContextResumed, setAudioContextResumed] = useState(false);
  
  // TTS listener authority state
  const [ttsListenerActive, setTtsListenerActive] = useState(false);
  
  const { level, xp_current, next_threshold, awardXp, lastLevelUpTime, fetchProgress, resetLevelUpNotification, subscribeToProgress } = useProgressStore();

  // Helper function to enable audio context for TTS (autoplay policy compliance)
  const enableAudioContext = async (): Promise<boolean> => {
    try {
      if (typeof window !== 'undefined' && window.AudioContext) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        if (audioContext.state === 'suspended') {
          await audioContext.resume();
          console.log('HF_SOUND: AudioContext resumed');
        }
        setAudioContextResumed(true);
        return true;
      }
      return false;
    } catch (error) {
      console.warn('Failed to resume AudioContext:', error);
      return false;
    }
  };

  // Keep icon and engine in sync: Persist sound state changes
  const toggleSpeakingSound = () => {
    const newEnabled = !speakingSoundEnabled;
    console.log('HF_SOUND_TOGGLE', { enabled: newEnabled });
    
    setSpeakingSoundEnabled(newEnabled);
    localStorage.setItem('speaking.sound.enabled', newEnabled.toString());
    
    // Immediately sync with TTS manager
    if (!newEnabled && TTSManager.isSpeaking()) {
      TTSManager.stop();
      setIsSpeaking(false);
      setAvatarState('idle');
    }
  };

  // On mount, sync TTS manager with localStorage state
  useEffect(() => {
    console.log('HF_SOUND: Initializing with state:', speakingSoundEnabled);
    // No explicit TTS manager sync needed - we check speakingSoundEnabled directly
  }, []);
  
  // A) Authoritative flow (finite-state machine)
  // States: IDLE / READING / LISTENING / PROCESSING / PAUSED
  const [flowState, setFlowState] = useState<'IDLE' | 'READING' | 'LISTENING' | 'PROCESSING' | 'PAUSED'>('IDLE');
  
  // A) Stop duplicates at the source: NO default/initial assistant message seeded
  // Feed must come only from conversation store/back-end
  const [messages, setMessages] = useState<Array<{
    text: string;
    isUser: boolean;
    isSystem: boolean;
    id: string;
    role: 'user' | 'assistant';
    content: string;
    seq: number;
  }>>([]);

  // B) No-duplicate rules + messageKey deduplication system
  const [spokenKeys, setSpokenKeys] = useState<Set<string>>(new Set()); // Track spoken message keys
  const [lastSpokenSeq, setLastSpokenSeq] = useState(0);
  const [messageSeqCounter, setMessageSeqCounter] = useState(1); // Start from 1 (no initial message)
  
  // C) Guard rails: Turn token system for preventing stale events
  const [currentTurnToken, setCurrentTurnToken] = useState<string>('');
  const [lastPlayedMessageIds, setLastPlayedMessageIds] = useState<Set<string>>(new Set());
  const [replayCounter, setReplayCounter] = useState(0);
  const [ttsCompletionTimeouts, setTtsCompletionTimeouts] = useState<Set<NodeJS.Timeout>>(new Set());
  const [micReopenTimeouts, setMicReopenTimeouts] = useState<Set<NodeJS.Timeout>>(new Set());
  
  // C) Remember where we paused (for correct Resume)
  const [pausedFrom, setPausedFrom] = useState<'READING' | 'LISTENING' | 'PROCESSING' | null>(null);

  // Helper function to compute stable messageKey for deduplication (fix regression)
  const stableMessageKey = (text: string, serverId?: string) => {
    // Use server ID if available, otherwise hash ONLY the assistant text (no timestamps, no counters)
    if (serverId) {
      console.log('HF_KEY', { key: `server:${serverId}`, hasServerId: true, previewText: text.substring(0, 30) });
      return `server:${serverId}`;
    }
    
    // Hash only the content for stability
    const hash = text.substring(0, 200).split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const key = `msg-${Math.abs(hash)}`;
    console.log('HF_KEY', { key, hasServerId: false, previewText: text.substring(0, 30) });
    return key;
  };

  // Helper for ephemeral keys (text-only, no server id)
  const stableKeyFromText = (text: string): string => {
    const hash = text.substring(0, 200).split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const key = `msg-${Math.abs(hash)}`;
    console.log('HF_KEY', { key, source: 'ephemeral', previewText: text.substring(0, 30) });
    return key;
  };

  // Legacy computeMessageKey (deprecated - use stableMessageKey instead)
  const computeMessageKey = (level: string, module: string, qIndex: number, text: string, serverId?: string) => {
    // Redirect to stable version
    return stableMessageKey(text, serverId);
  };

  // Unread assistant detection
  const unreadAssistantExists = () => {
    const latestMessage = findLatestEligibleAssistantMessage();
    if (!latestMessage) return false;
    
    const messageKey = stableMessageKey(latestMessage.text, latestMessage.id);
    const unread = !spokenKeys.has(messageKey);
    console.log('HF_PRIMARY', { action: 'check_unread', unread, messageKey, previewText: latestMessage.text.substring(0, 30) });
    return unread;
  };
  
  // Helper function to find newest eligible assistant message (B - Newest assistant only)
  const findLatestEligibleAssistantMessage = () => {
    // B) Eligible-to-speak filter: Only assistant messages (role=assistant), never user/meta
    const eligibleMessages = messages.filter(m => 
      m.role === 'assistant' && 
      !m.isUser && 
      !m.isSystem && 
      m.text.trim() &&
      !m.text.startsWith('💭 You said:') // Never speak echo messages
    );
    
    return eligibleMessages[eligibleMessages.length - 1]; // Latest only
  };

  // A) New state for ephemeral assistant ghost bubble and live captions
  const [ephemeralAssistant, setEphemeralAssistant] = useState<null | { key: string; text: string }>(null);
  const [interimCaption, setInterimCaption] = useState<string>(''); // live mic caption text
  const [speakingMessageKey, setSpeakingMessageKey] = useState<string | null>(null);

  // Helper to check if server bubble exists for a given key
  const hasServerAssistant = (key: string) =>
    messages.some(m => m.role === 'assistant' && stableMessageKey(m.text, m.id) === key);

  // Ephemeral speak for bootstrap (no append)
  const speakEphemeral = async (text: string) => {
    if (!text.trim()) return;
    
    const messageKey = stableKeyFromText(text);
    
    // Add to spoken keys to prevent re-reading when server appends same text
    setSpokenKeys(prev => new Set([...prev, messageKey]));
    
    // Set ephemeral ghost bubble
    setEphemeralAssistant({ key: messageKey, text });
    console.log('HF_GHOST', { key: messageKey, preview: text.slice(0, 40) });
    
    // Generate turn token for this speech - but don't clobber existing valid token
    const token = `turn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    if (!currentTurnToken) setCurrentTurnToken(token);
    
    console.log('HF_BOOTSTRAP', { path: 'ephemeral', text: text.substring(0, 50), messageKey, token });
    
    try {
      // Use existing TTS path - temporarily set state to READING for speakExistingMessage
      setFlowState('READING');
      await speakExistingMessage(text, messageKey, 'prompt', false);
    } catch (error) {
      console.warn('HF_BOOTSTRAP: ephemeral speak failed', error);
      // On error, still transition to LISTENING
      if (currentTurnToken === token) {
        setFlowState('LISTENING');
        startHandsFreeMicCapture();
      }
    }
  };
  
  // Remove useSpeakingTTS hook - we'll use strict turn-taking logic instead
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const [micState, setMicState] = useState<MicState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [history, setHistory] = useState<Array<{input: string; corrected: string; time: string}>>([]);
  const [currentQuestion, setCurrentQuestion] = useState("What did you have for lunch today?");
  const [conversationContext, setConversationContext] = useState("");
  const [userLevel, setUserLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [isProcessingTranscript, setIsProcessingTranscript] = useState(false);
  const [lastTranscript, setLastTranscript] = useState<string>('');
  const [lastMessageTime, setLastMessageTime] = useState<number>();
  
  // Hands-Free Mode state and logic
  const [hfEnabled, setHfEnabled] = useState(() => {
    // Enable by default for minimal UI
    return true;
  });
  const [hfActive, setHfActive] = useState(false);
  const [hfStatus, setHfStatus] = useState<'idle' | 'prompting' | 'listening' | 'processing'>('idle');
  const [hfNoInputTimer, setHfNoInputTimer] = useState<NodeJS.Timeout | null>(null);
  const [hfRePromptTimer, setHfRePromptTimer] = useState<NodeJS.Timeout | null>(null);
  const [hfIsReprompting, setHfIsReprompting] = useState(false);
  const [hfAutoPaused, setHfAutoPaused] = useState(false);
  
  // Minimal UI state
  const [hfControlsVisible, setHfControlsVisible] = useState(true);
  const [hfControlsTimeout, setHfControlsTimeout] = useState<NodeJS.Timeout | null>(null);
  const [hfLongPressTimeout, setHfLongPressTimeout] = useState<NodeJS.Timeout | null>(null);
  const [hfIsLongPressing, setHfIsLongPressing] = useState(false);
  const [hfShowOverflow, setHfShowOverflow] = useState(false);
  
  // V2 enhancements
  const hfV2Enabled = SPEAKING_HANDS_FREE_V2 || localStorage.getItem('SPEAKING_HANDS_FREE_V2') === 'true' || new URLSearchParams(window.location.search).has('hfv2');
  const [hfBargeInDetector, setHfBargeInDetector] = useState<{
    audioContext: AudioContext | null;
    analyser: AnalyserNode | null;
    stream: MediaStream | null;
    isActive: boolean;
  }>({ audioContext: null, analyser: null, stream: null, isActive: false });
  const [hfOverflowOpen, setHfOverflowOpen] = useState(false);
  
  // V2 Minimal UI state
  const [hfFirstRunHintShown, setHfFirstRunHintShown] = useState(() => {
    return localStorage.getItem('hfFirstRunHint') === 'shown';
  });
  const [hfShowFirstRunHint, setHfShowFirstRunHint] = useState(false);
  const [hfControlsMinimal, setHfControlsMinimal] = useState(true); // Default ON for speaking page - always minimal
  const [hfSessionActive, setHfSessionActive] = useState(false); // Track active session state
  const [hfShowResume, setHfShowResume] = useState(false); // Show resume banner
  const [hfPermissionBlocked, setHfPermissionBlocked] = useState(false); // Permission state
  const [hfEmptyTranscriptCount, setHfEmptyTranscriptCount] = useState(0); // Track empty transcripts
  
  
  // Persist hfEnabled to localStorage
  useEffect(() => {
    localStorage.setItem('hfEnabled', hfEnabled.toString());
  }, [hfEnabled]);

  // Auto-hide controls after 5 seconds of inactivity
  // TEMPORARILY DISABLED until QA passes
  /*
  useEffect(() => {
    if (hfActive && (hfStatus === 'prompting' || hfStatus === 'listening')) {
      // Clear existing timeout
      if (hfControlsTimeout) {
        clearTimeout(hfControlsTimeout);
      }
      
      // Set new timeout to hide controls
      const timeout = setTimeout(() => {
        setHfControlsVisible(false);
      }, 5000);
      
      setHfControlsTimeout(timeout);
      
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [hfActive, hfStatus, hfControlsTimeout]);
  */

  // Handle tap anywhere on lower 25% to reveal controls
  useEffect(() => {
    const handleRevealControls = (e: TouchEvent | MouseEvent) => {
      const windowHeight = window.innerHeight;
      const tapY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      // Check if tap is in lower 25% of screen
      if (tapY > windowHeight * 0.75) {
        setHfControlsVisible(true);
      }
    };

    if (hfActive && !hfControlsVisible) {
      document.addEventListener('touchstart', handleRevealControls);
      document.addEventListener('click', handleRevealControls);
      
      return () => {
        document.removeEventListener('touchstart', handleRevealControls);
        document.removeEventListener('click', handleRevealControls);
      };
    }
  }, [hfActive, hfControlsVisible]);
  
  // Check for hands-free mode availability (default ON for speaking page)
  const isHandsFreeModeAvailable = useMemo(() => {
    // Default ON for speaking page (V2)
    if (hfV2Enabled) {
      console.log('HF gate: on | reason: V2 enabled');
      return true;
    }
    
    if (SPEAKING_HANDS_FREE) {
      console.log('HF gate: on | reason: flag');
      return true;
    }
    
    // Check for query param ?hf=1
    const urlParams = new URLSearchParams(window.location.search);
    const hasParam = urlParams.get('hf') === '1';
    
    if (hasParam) {
      console.log('HF gate: on | reason: param');
      return true;
    }
    
    console.log('HF gate: off | reason: flag off & no param & no V2');
    return false;
  }, [hfV2Enabled]);

  // Check for minimal hands-free UI availability (always ON when hands-free is available)
  const isMinimalHFUIAvailable = useMemo(() => {
    if (SPEAKING_HANDS_FREE_MINIMAL) {
      console.log('HF MinUI gate: on | reason: flag');
      return true;
    }
    
    // Always enable when hands-free is available
    if (isHandsFreeModeAvailable) {
      console.log('HF MinUI gate: on | reason: hands-free available');
      return true;
    }
    
    // Check for query param ?hfui=1
    const urlParams = new URLSearchParams(window.location.search);
    const hasParam = urlParams.get('hfui') === '1';
    
    if (hasParam) {
      console.log('HF MinUI gate: on | reason: param');
      return true;
    }
    
    console.log('HF MinUI gate: off | reason: flag off & no param');
    return false;
  }, [isHandsFreeModeAvailable]);
  
  // Avatar state is now managed by useAvatarTTS hook
  
  // Subscribe to micEngine state changes and interim results
  useEffect(() => {
    const unsubscribe = onState((newState) => {
      console.log('[Speaking] micEngine state change:', newState);
      setMicState(newState);
      
      // Clear errors when transitioning out of idle
      if (newState !== 'idle') {
        setErrorMessage('');
      }
      
      // Clear interim caption when not recording
      if (newState !== 'recording') {
        setInterimCaption('');
      }
    });
    
  // Listen for interim speech results and clear captions when leaving LISTENING
  useEffect(() => {
    // Listen for interim speech results
    const handleInterimResult = (event: CustomEvent) => {
      if (flowState === 'LISTENING') {
        const transcript = event.detail?.transcript || '';
        setInterimCaption(transcript);
        console.log('HF_LISTEN_CAPTION', { len: transcript.length });
      }
    };
    
    window.addEventListener('speech:interim', handleInterimResult as EventListener);
    
    // Clear interim captions when leaving LISTENING state
    if (flowState !== 'LISTENING') {
      setInterimCaption('');
    }
    
    return () => {
      unsubscribe();
      window.removeEventListener('speech:interim', handleInterimResult as EventListener);
    };
  }, [flowState]);

  // Handle avatar state based on TTS speaking
  useEffect(() => {
    if (isSpeaking) {
      setAvatarState('talking'); // Use correct avatar state for speaking
    } else {
      setAvatarState('idle');
    }
  }, [isSpeaking, setAvatarState]);

  // Clean up speech history when starting new conversation - removed since we don't use useSpeakingTTS hook

  // Helper function to generate turn token (authoritative current turn)
  const generateTurnToken = () => {
    const timestamp = Date.now();
    const token = `turn-${timestamp}-${Math.random().toString(36).substr(2, 6)}`;
    console.log('HF_TURN_TOKEN_GENERATED:', token);
    return token;
  };

  // Helper function to compute messageId for turn token events
  const computeMessageId = (turnToken: string, phase: 'prompt' | 'feedback', text: string, replay = 0) => {
    const baseId = `${turnToken}:${phase}:${text.substring(0, 50)}`;
    const hash = baseId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const replaySuffix = replay > 0 ? `:replay${replay}` : '';
    return `msg-${Math.abs(hash)}-${phase}${replaySuffix}`;
  };

  // D) Turn token guard: On ADVANCE, create new token and cancel old listeners
  const cancelOldListeners = () => {
    console.log('HF_ADVANCE: canceling old listeners and timeouts');
    
    // Cancel TTS completion timeouts
    ttsCompletionTimeouts.forEach(timeout => clearTimeout(timeout));
    setTtsCompletionTimeouts(new Set());
    
    // Cancel mic reopen timeouts
    micReopenTimeouts.forEach(timeout => clearTimeout(timeout));
    setMicReopenTimeouts(new Set());
    
    // Cancel other hands-free timers
    if (hfNoInputTimer) clearTimeout(hfNoInputTimer);
    if (hfRePromptTimer) clearTimeout(hfRePromptTimer);
    if (hfControlsTimeout) clearTimeout(hfControlsTimeout);
    if (hfLongPressTimeout) clearTimeout(hfLongPressTimeout);
    
    // Stop any ongoing TTS from previous turn
    if (TTSManager.isSpeaking()) {
      console.log('HF_ADVANCE: stopping TTS from previous turn');
      TTSManager.stop();
      setIsSpeaking(false);
      setAvatarState('idle');
    }
    
    // Stop any recording from previous turn
    if (micState === 'recording') {
      console.log('HF_ADVANCE: stopping recording from previous turn');
      stopRecording();
    }
  };

  // Start a new turn with fresh token (C - Turn token guard)
  const startNewTurn = () => {
    const newToken = generateTurnToken();
    
    // D) Turn token guard: Cancel everything from the previous turn
    cancelOldListeners();
    
    setCurrentTurnToken(newToken);
    setReplayCounter(0);
    setFlowState('IDLE'); // Reset to idle when starting new turn
    
    console.log('HF_NEW_TURN', { newToken, state: 'IDLE' });
    return newToken;
  };

  // Helper function to add chat bubbles (separate from speaking logic)
  const addChatBubble = (text: string, type: "user" | "bot" | "system", messageId?: string, messageKey?: string) => {
    const id = messageId || `msg-${Date.now()}-${Math.random()}`;
    const seq = messageSeqCounter;
    setMessageSeqCounter(prev => prev + 1);
    
    const newMessage = {
      text,
      isUser: type === "user",
      isSystem: type === "system",
      id,
      role: (type === "user" ? "user" : "assistant") as "user" | "assistant",
      content: text,
      seq
    };
    
    setMessages(prev => [...prev, newMessage]);
    setLastMessageTime(Date.now());
    return { id, seq, messageKey };
  };

  // B) Separate "append" vs "speak": Only speak existing messages, never append when speaking
  type SpeakOpts = { token?: string };
  const speakExistingMessage = async (
    text: string, 
    messageKey: string, 
    phase: 'prompt' | 'feedback' = 'feedback', 
    isRepeat = false, 
    opts: SpeakOpts = {}
  ) => {
    console.log('[Speaking] Speaking existing message:', text.substring(0, 50) + '...', { flowState, messageKey });
    
    // Use ghost only when there's no server bubble; otherwise highlight the real bubble
    if (!hasServerAssistant(messageKey)) {
      setEphemeralAssistant({ key: messageKey, text });
      console.log('HF_GHOST', { key: messageKey, preview: text.slice(0, 40) });
    } else {
      setSpeakingMessageKey(messageKey);
      console.log('HF_SPEAKING', { key: messageKey });
    }
    
    // State machine: Only speak during READING state
    if (flowState !== 'READING' && !isRepeat) {
      console.log('HF_TTS_SKIP: not in READING state', { flowState });
      return messageKey;
    }
    
    // B) Deduplicate by messageKey: Only speak if messageKey not in spokenKeys  
    if (spokenKeys.has(messageKey) && !isRepeat) {
      console.log('HF_DROP_DUP: messageKey already spoken', { messageKey });
      return messageKey;
    }

    // Use explicit token or current turn token - NEVER mint a second token if one was given
    const turnToken = opts.token ?? currentTurnToken ?? startNewTurn();
    
    // Compute messageId for turn token events
    const replay = isRepeat ? replayCounter + 1 : 0;
    const messageId = computeMessageId(turnToken, phase, text, replay);
    
    // Check if already played by messageId (turn-level idempotency)
    if (lastPlayedMessageIds.has(messageId) && !isRepeat) {
      console.log('HF_DROP_STALE: messageId already played', { messageId, turnToken });
      await handleTTSCompletion(turnToken);
      return messageKey;
    }

    // D) One voice at a time: Stop any ongoing TTS before starting new one
    if (TTSManager.isSpeaking() && !isRepeat) {
      console.log('HF_TTS_COALESCE: stopping old TTS for newer message');
      TTSManager.skip();
      setIsSpeaking(false);
      setAvatarState('idle');
    }

    // Mark as spoken and played
    setSpokenKeys(prev => new Set([...prev, messageKey]));
    setLastPlayedMessageIds(prev => new Set([...prev, messageId]));
    if (isRepeat) {
      setReplayCounter(replay);
    }

    // C) Single authority: TTS can only be triggered by the hands-free controller when it has authority
    if (!ttsListenerActive) {
      console.log('HF_TTS_SKIP: no active TTS listener authority', { ttsListenerActive });
      return messageKey;
    }
    
    // Turn token guard: Ensure we're still on the correct turn
    if (turnToken !== currentTurnToken) {
      console.log('HF_DROP_STALE: turn token mismatch during TTS', { turnToken, currentTurnToken });
      return messageKey;
    }
    // D) Sound toggle compliance: Check if sound is enabled before TTS
    if (speakingSoundEnabled) {
      // On first Play: Autoplay policy compliance - resume AudioContext
      if (!audioContextResumed) {
        const resumed = await enableAudioContext();
        if (!resumed) {
          console.log('HF_SOUND_FAIL: AudioContext resume failed', { turnToken, messageId });
          // Show tooltip: "Tap Play to enable sound" but don't mark as complete
          setErrorMessage("Tap Play to enable sound");
          return messageKey;
        }
      }
      
      console.log('HF_PROMPT_PLAY', { turnToken, messageId, messageKey, phase, textHash: text.substring(0, 20), state: flowState });
      
      try {
        // A) State transition: Enter READING state for TTS
        setFlowState('READING');
        setIsSpeaking(true);
        setAvatarState('talking');

        // Watchdog (fallback) — 12s max read
        let resolved = false;
        const watchdog = setTimeout(() => {
          if (!resolved) {
            console.warn('HF_TTS_WATCHDOG: forcing completion');
            // fall through to finally; handleTTSCompletion will run
          }
        }, 12000);

        await TTSManager.speak(text, {
          canSkip: true
        }).finally(() => {
          resolved = true;
          clearTimeout(watchdog);
        });

        console.log('HF_TTS_COMPLETE', { turnToken, messageId, messageKey, state: flowState });
      } catch (error) {
        console.warn('[Speaking] Failed to speak message:', error);
      } finally {
        setIsSpeaking(false);
        setAvatarState('idle');
        
        // Clear speaking indicators on TTS completion
        setSpeakingMessageKey(null);
        setEphemeralAssistant(null);
        
        // Always drive the loop forward even if audio failed
        await handleTTSCompletion(turnToken);
      }
    } else {
      // D) Do not silently 'complete' when muted: log HF_PROMPT_SKIP instead (never HF_TTS_COMPLETE)
      console.log('HF_PROMPT_SKIP: sound disabled', { turnToken, messageId, messageKey, state: flowState });
      // Still proceed to mic opening
      await handleTTSCompletion(turnToken);
    }
    
    return messageKey;
  };

  // B) Separate "append" vs "speak": NEVER append when only speaking existing messages
  const speakLatestAssistantMessage = async (isRepeat = false) => {
    console.log('[Speaking] Finding latest assistant message to speak', { flowState });
    
    // B) Find newest eligible assistant message only
    const latestMessage = findLatestEligibleAssistantMessage();
    
    if (!latestMessage) {
      console.log('HF_TTS_SKIP: no eligible assistant message found');
      setFlowState('IDLE');
      return;
    }
    
    // Generate messageKey for deduplication (fix regression - use stable key)
    const messageKey = stableMessageKey(latestMessage.text, latestMessage.id);
    
    console.log('[Speaking] Latest assistant message found', { 
      messageKey, 
      text: latestMessage.text.substring(0, 50) + '...',
      spokenBefore: spokenKeys.has(messageKey)
    });
    
    // Speak without appending - this message already exists in chat
    const token = currentTurnToken || startNewTurn();
    await speakExistingMessage(latestMessage.text, messageKey, 'prompt', isRepeat, { token });
  };

  // Only append new messages from backend, never fabricate client-side
  const addAssistantMessage = async (message: string, phase: 'prompt' | 'feedback' = 'feedback') => {
    console.log('[Speaking] Adding new assistant message from backend:', message.substring(0, 50) + '...', { flowState });
    
    // Use current turn token or generate new one if missing
    const turnToken = currentTurnToken || startNewTurn();
    
    // Compute messageId for strict idempotency
    const messageId = computeMessageId(turnToken, phase, message, 0);
    
    // Add to chat and get sequence number - this is the ONLY place we append assistant messages
    const { id, seq } = addChatBubble(message, "bot", messageId);
    
    // Generate messageKey for this new message (use stable key)
    const messageKey = stableMessageKey(message, id);
    
    // Now speak this newly added message
    await speakExistingMessage(message, messageKey, phase, false, { token: turnToken });
    
    return messageId;
  };

  // 5) Single user bubble creation function
  const onUserFinalTranscript = (finalText: string, token: string) => {
    if (!finalText.trim()) return;
    addChatBubble(finalText, 'user');    // ← restore this
    setFlowState('PROCESSING');          // close mic; scoring runs as before
    // existing executeTeacherLoop(...) or whatever you already call
  };

  const handleTTSCompletion = async (token) => {
    if (token !== currentTurnToken) {
      console.log('HF_TTS_COMPLETE_STALE', { token, currentTurnToken });
      return;
    }
    
    console.log('HF_TTS_COMPLETE', { token, state: flowState });
    
    if (hfEnabled) {
      // small delay avoids race with setState batching
      setTimeout(async () => {
        if (token !== currentTurnToken) return;
        setFlowState('LISTENING');
        await startHandsFreeMicCapture({ token });
      }, 200);
    } else {
      setFlowState('IDLE'); // manual push-to-talk waits for the next tap
    }
  };

  // Message observer: Watch for new assistant messages and auto-speak them (no fabrication)
  useEffect(() => {
    if (!ttsListenerActive || messages.length === 0) return;
    
    // Only process when in the right states and we have authority
    if (!['IDLE', 'PROCESSING'].includes(flowState)) return;
    
    const latestMessage = findLatestEligibleAssistantMessage();
    if (!latestMessage) return;
    
    const messageKey = stableMessageKey(latestMessage.text, latestMessage.id);
    
    // Clear ephemeral ghost bubble if server message arrives with matching key
    if (ephemeralAssistant && ephemeralAssistant.key === messageKey) {
      setEphemeralAssistant(null);
      console.log('HF_GHOST_CLEAR', { reason: 'server-arrived', messageKey });
    }
    
    // Check if this is a NEW assistant bubble (messageKey not in spokenKeys)
    if (!spokenKeys.has(messageKey)) {
      console.log('[Speaking] Message observer: New assistant message detected', { 
        messageKey, 
        flowState,
        text: latestMessage.text.substring(0, 50) + '...'
      });
      
      // Auto-speak the new message with current or new token
      const handleNewMessage = async () => {
        try {
          const token = currentTurnToken || startNewTurn();
          setFlowState('READING');
          await speakExistingMessage(latestMessage.text, messageKey, 'feedback', false, { token });
        } catch (error: any) {
          console.log('HF_ERROR_AUTO_SPEAK:', error.message);
          setFlowState('IDLE');
        }
      };
      
      // Small delay to avoid race conditions
      setTimeout(handleNewMessage, 100);
    } else if (ephemeralAssistant && ephemeralAssistant.key === messageKey) {
      // Message already spoken ephemerally and now server bubble arrived - don't re-speak
      console.log('[Speaking] Message observer: Skipping re-speak of ephemeral message', { messageKey });
    }
  }, [messages, flowState, ttsListenerActive, spokenKeys, ephemeralAssistant]);

  // Initialize component and progress store with single subscription management
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("chatHistory") || "[]");
    setHistory(savedHistory);
    
    // Fetch initial progress
    if (user) {
      fetchProgress();
    }
    
    // Initialize with first turn token only once
    if (!currentTurnToken) {
      const initialToken = startNewTurn();
      console.log('[Speaking] Initial turn token created:', initialToken);
    }

    // C) Single authority + single listener: Ensure EXACTLY one active subscription per mount
    let isMounted = true;
    
    // Set TTS listener authority immediately on mount
    setTtsListenerActive(true);
    console.log('[Speaking] Component mounted - single TTS authority established');
    
    // Cleanup on unmount - single subscription management
    return () => {
      if (isMounted) {
        setTtsListenerActive(false);
        console.log('[Speaking] Unmounting - releasing TTS authority and cleaning up');
        
        // Cancel all ongoing operations
        cancelOldListeners();
        
        // Stop any active TTS
        if (TTSManager.isSpeaking()) {
          TTSManager.stop();
        }
        
        // Stop any active recording
        if (micState === 'recording') {
          stopRecording();
        }
        
        // Clean up mic engine
        cleanup();
      }
      isMounted = false;
    };
  }, [user]); // Remove ttsListenerActive dependency to prevent re-runs

  // Handle initial message from props (bookmarks) - Remove client-side appending
  useEffect(() => {
    if (initialMessage) {
      console.log('Setting contextual question for bookmark:', initialMessage.substring(0, 50) + '...');
      
      // Set contextual question but don't append - speak what's already in the feed
      const question = "Let's continue our conversation from here! What would you like to say about this?";
      setCurrentQuestion(question);
      
      // Start new turn but don't fabricate messages
      setTimeout(() => {
        const newTurnToken = startNewTurn();
        console.log('HF_BOOKMARK_START', { turnToken: newTurnToken });
        
        // Check if there are existing assistant messages to speak
        if (unreadAssistantExists()) {
          setFlowState('READING');
          speakLatestAssistantMessage();
        }
      }, 500);
    }
  }, [initialMessage]);

  // Set up realtime subscription for progress updates
  useEffect(() => {
    if (!user) return;
    
    const unsubscribe = subscribeToProgress(user.id);
    return unsubscribe;
  }, [user]);

  // Handle level up notifications
  useEffect(() => {
    if (lastLevelUpTime && Date.now() - lastLevelUpTime < 5000) {
      toast({
        title: "🌟 Level Up!",
        description: `You reached Level ${level}! Keep up the great work!`,
        duration: 4000,
      });
      
      // Clear the notification after showing
      const timer = setTimeout(resetLevelUpNotification, 5000);
      return () => clearTimeout(timer);
    }
  }, [lastLevelUpTime, level]);

  const logSession = (input: string, corrected: string) => {
    const newSession = {
      input,
      corrected,
      time: new Date().toLocaleString()
    };
    const updatedHistory = [...history, newSession];
    setHistory(updatedHistory);
    localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
  };


  // Helper function to send text for grammar feedback
  const sendToFeedback = async (text: string): Promise<{ message: string; corrected: string; isCorrect: boolean }> => {
    const feedbackRes = await supabase.functions.invoke('feedback', {
      body: { text, level: userLevel }
    });

    if (feedbackRes.error) {
      throw new Error(feedbackRes.error.message || 'Feedback failed');
    }

    return {
      message: feedbackRes.data.message || feedbackRes.data.corrected,
      corrected: feedbackRes.data.corrected || text,
      isCorrect: feedbackRes.data.isCorrect || false
    };
  };

  // Helper function to generate contextual follow-up questions
  const generateFollowUpQuestion = async (transcript: string): Promise<string> => {
    try {
      const response = await supabase.functions.invoke('follow-up-question', {
        body: { 
          text: transcript,
          previousContext: conversationContext,
          userLevel: userLevel
        }
      });

      if (response.error) {
        console.error('Error generating follow-up question:', response.error);
        return "Can you tell me more about that?";
      }

      const followUpQuestion = response.data?.followUpQuestion || "Can you tell me more about that?";
      setCurrentQuestion(followUpQuestion);
      
      // Update conversation context
      setConversationContext(prev => 
        prev + ` User said: "${transcript}". AI asked: "${followUpQuestion}".`
      );
      
      return followUpQuestion;
    } catch (error) {
      console.error('Error generating follow-up question:', error);
      return "Can you tell me more about that?";
    }
  };

  const executeTeacherLoop = async (originalTranscript: string) => {
    console.log('[Speaking] teacher-loop:start with transcript:', originalTranscript);
    setIsProcessingTranscript(true);
    
    // Optional developer toggle for QA
    const echoVerbatim = true; // Set to false to disable verbatim echo
    
    try {
      // Step 1: Echo verbatim - show exact ASR transcript
      if (echoVerbatim) {
        console.log('[Speaking] originalText:', originalTranscript);
        console.log('[Speaking] normalizedText:', originalTranscript.toLowerCase().replace(/[.,!?;:'"()-]/g, '').replace(/\s+/g, ' ').trim());
      }

      // Step 2: Classify intent and check for safety concerns
      const intentResponse = await supabase.functions.invoke('classify-intent', {
        body: { 
          text: originalTranscript,
          context: conversationContext
        }
      });

      if (intentResponse.error) {
        console.error('Intent classification error:', intentResponse.error);
        throw new Error(intentResponse.error.message || 'Intent classification failed');
      }

      const { intent, response: crisisResponse, skipCorrection, skipXP } = intentResponse.data;
      console.log('[Speaking] classified intent:', intent);

      // Step 3: Handle distress signals immediately (E - response from back-end)
      if (intent === 'distress_signal') {
        console.log('[Speaking] distress signal detected - providing crisis support');
        await addAssistantMessage(crisisResponse, 'feedback');
        // Skip all other processing for safety
        return;
      }

      // Step 4: Handle questions and small talk
      if (intent === 'question' || intent === 'small_talk') {
        console.log('[Speaking] handling question/small talk');
        const smallTalkResponse = await supabase.functions.invoke('handle-small-talk', {
          body: { 
            text: originalTranscript,
            intent: intent,
            context: conversationContext,
            level: userLevel
          }
        });

        if (smallTalkResponse.data?.response) {
          // E) Advance without fabricating messages: This response comes from back-end
          await addAssistantMessage(smallTalkResponse.data.response, 'feedback');
          // Update conversation context and continue
          setConversationContext(prev => 
            prev + ` User said: "${originalTranscript}". AI responded to ${intent}.`
          );
        }
        
        // Award XP based on sophisticated rules
        const success = await calculateAndAwardXP(originalTranscript);
        if (success && success.xp > 0) {
          console.log(`[Speaking] Awarded ${success.xp} XP for small talk: ${success.reason}`);
        }
        
        incrementSpeakingSubmissions();
        return;
      }

      // Step 5: Handle lesson answers (existing flow)
      if (intent === 'lesson_answer') {
        // Analyze & Correct using improved feedback system
        const feedback = await sendToFeedback(originalTranscript);
        console.log('[Speaking] teacher-loop:feedback received:', {
          isCorrect: feedback.isCorrect,
          message: feedback.message
        });

        // Show correction only if there's an actual mistake (E - comes from back-end)
        if (!feedback.isCorrect && feedback.message !== 'CORRECT') {
          await addAssistantMessage(feedback.message, 'feedback');
        }

      // E) Advance without fabricating messages: Wait for back-end to append the next assistant message
      // Generate follow-up question from back-end
      const nextQuestion = await generateFollowUpQuestion(originalTranscript);
      console.log('[Speaking] teacher-loop:next-question generated from backend');
      
      // D) Turn token guard: On ADVANCE, create new token and cancel old listeners
      console.log('HF_ADVANCE: advancing to new question');
      const newTurnToken = startNewTurn();
      
      // Remove client-side appending - wait for backend to post the next question
      // The message observer will detect and speak it when it arrives
      console.log('[Speaking] Waiting for backend to post next question...');

      // Track session (non-blocking)
      logSession(originalTranscript, feedback.corrected);
      
      // Award XP based on sophisticated rules
      await calculateAndAwardXP(originalTranscript);
      
      // Track speaking submission for badges
      incrementSpeakingSubmissions();
      }
      
      console.log('[Speaking] teacher-loop:completed successfully');
      
    } catch (error: any) {
      console.error('[Speaking] teacher-loop:error', error);
      setErrorMessage(error.message || "Sorry, there was an error. Please try again.");
    } finally {
      setIsProcessingTranscript(false);
    }
  };

  // Calculate and award XP based on sophisticated rules
  const calculateAndAwardXP = async (transcript: string) => {
    try {
      const xpResponse = await supabase.functions.invoke('calculate-xp', {
        body: { 
          transcript,
          previousTranscript: lastTranscript,
          level: userLevel
        }
      });

      if (xpResponse.error) {
        console.error('Error calculating XP:', xpResponse.error);
        return null;
      }

      const { xp, reason, complexity } = xpResponse.data;
      
      if (xp > 0) {
        // Award XP through the unified system
        const success = await awardXp(xp);
        
        if (success) {
          console.log(`[Speaking] Awarded ${xp} XP - ${reason} (${complexity})`);
          
          // Dispatch XP awarded event for animation with guaranteed valid amount
          const xpEvent = new CustomEvent('xp:awarded', { 
            detail: { amount: Math.max(1, xp || 1) } 
          });
          window.dispatchEvent(xpEvent);
          console.log('[Speaking] Dispatched XP event with amount:', Math.max(1, xp || 1));
          
          // Light haptic feedback if available
          if ('vibrate' in navigator) {
            navigator.vibrate(xp > 10 ? 100 : 50);
          }

          // Update last transcript for duplicate detection
          setLastTranscript(transcript);
          
          return { xp, reason, complexity };
        }
      } else {
        console.log(`[Speaking] No XP awarded - ${reason}`);
        setLastTranscript(transcript); // Still update to prevent re-attempts
      }

      return null;
    } catch (error) {
      console.error('Error in calculateAndAwardXP:', error);
      return null;
    }
  };

  // Helper function to detect voice commands
  const detectVoiceCommand = (transcript: string): string | null => {
    if (!HF_VOICE_COMMANDS || !transcript) return null;
    
    // Normalize: trim, lowercase, remove punctuation
    const normalized = transcript.trim().toLowerCase().replace(/[.,!?;:'"()-]/g, '');
    
    // Check for command matches with extended synonyms for V2
    if (hfV2Enabled) {
      // Again: "again", "repeat"
      if (/^(again|repeat)$/i.test(normalized)) {
        return 'repeat';
      }
      // Hold: "pause", "wait", "hold"
      if (/^(pause|wait|hold)$/i.test(normalized)) {
        return 'pause';
      }
      // Start: "continue", "resume", "start"
      if (/^(continue|resume|start)$/i.test(normalized)) {
        return 'resume';
      }
      // End: "stop", "finish", "end"
      if (/^(stop|finish|end)$/i.test(normalized)) {
        return 'stop';
      }
    } else {
      // Legacy command detection
      if (/^(pause|wait)$/i.test(normalized)) {
        return 'pause';
      }
      if (/^(resume|continue|go on)$/i.test(normalized)) {
        return 'resume';
      }
      if (/^(repeat|again)$/i.test(normalized)) {
        return 'repeat';
      }
      if (/^(stop|end)$/i.test(normalized)) {
        return 'stop';
      }
    }
    
    return null;
  };

  // Earcons and haptics helpers
  const playEarcon = (type: 'listening' | 'processing' | 'advance') => {
    if (!speakingSoundEnabled) return;
    
    try {
      // Simple beep tones using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Different frequencies for different events
      switch (type) {
        case 'listening':
          oscillator.frequency.value = 800; // Higher pitch for mic opening
          break;
        case 'processing':
          oscillator.frequency.value = 600; // Mid pitch for processing
          break;
        case 'advance':
          oscillator.frequency.value = 1000; // Highest for completion
          break;
      }
      
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
      
      console.log('HF_EARCON:', type);
    } catch (error) {
      console.warn('Earcon failed:', error);
    }
  };

  const playHaptic = (type: 'light' | 'medium') => {
    try {
      if ('vibrate' in navigator) {
        const pattern = type === 'light' ? 50 : 100;
        navigator.vibrate(pattern);
        console.log('HF_HAPTIC:', type);
      }
    } catch (error) {
      console.warn('Haptic failed:', error);
    }
  };

  // Enhanced telemetry
  const emitHFTelemetry = (event: string, data?: any) => {
    const telemetryData = {
      event,
      timestamp: Date.now(),
      device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
      browser: navigator.userAgent.includes('Chrome') ? 'chrome' : 
               navigator.userAgent.includes('Safari') ? 'safari' :
               navigator.userAgent.includes('Firefox') ? 'firefox' : 'other',
      hfStatus,
      hfActive,
      v2: hfV2Enabled,
      ...data
    };
    console.log('HF_TELEMETRY:', telemetryData);
  };

  // Barge-in VAD detector for V2
  const startBargeInDetector = async () => {
    if (!hfV2Enabled || hfBargeInDetector.isActive) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true 
        } 
      });
      
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);
      
      setHfBargeInDetector({ audioContext, analyser, stream, isActive: true });
      
      // Monitor for barge-in
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      let consecutiveHighSamples = 0;
      const threshold = 150;
      const requiredSamples = 15; // ~250ms at 60fps
      
      const checkForBargeIn = () => {
        if (!TTSManager.isSpeaking()) return;
        
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        
        if (average > threshold) {
          consecutiveHighSamples++;
          if (consecutiveHighSamples >= requiredSamples) {
            console.log('HF_BARGE_IN detected, RMS:', average);
            emitHFTelemetry('HF_BARGE_IN', { rms: average });
            TTSManager.skip();
            consecutiveHighSamples = 0;
          }
        } else {
          consecutiveHighSamples = 0;
        }
        
        if (hfBargeInDetector.isActive) {
          requestAnimationFrame(checkForBargeIn);
        }
      };
      
      requestAnimationFrame(checkForBargeIn);
      
    } catch (error) {
      console.warn('Barge-in detector failed:', error);
    }
  };

  const stopBargeInDetector = () => {
    if (hfBargeInDetector.stream) {
      hfBargeInDetector.stream.getTracks().forEach(track => track.stop());
    }
    if (hfBargeInDetector.audioContext) {
      hfBargeInDetector.audioContext.close();
    }
    setHfBargeInDetector({ audioContext: null, analyser: null, stream: null, isActive: false });
  };

  // Auto-hide controls functionality
  const showControls = () => {
    setHfControlsVisible(true);
    emitHFTelemetry('HF_UI_REVEAL');
    
    // TEMPORARILY DISABLED: auto-hide timeout until QA passes
    /*
    // Clear existing timeout
    if (hfControlsTimeout) {
      clearTimeout(hfControlsTimeout);
    }
    
    // Set new timeout to hide controls after 3s for V2, 2s for legacy
    const timeout = setTimeout(() => {
      setHfControlsVisible(false);
      emitHFTelemetry('HF_UI_AUTOHIDE');
    }, hfV2Enabled ? 3000 : 2000);
    setHfControlsTimeout(timeout);
    */
  };

  const hideControls = () => {
    if (hfControlsTimeout) {
      clearTimeout(hfControlsTimeout);
    }
    setHfControlsVisible(false);
  };

  // B) Single press handler with clear state transitions
  const onPrimaryPress = async () => {
    const prevState = flowState;
    
    // ALWAYS resume AudioContext on first gesture (autoplay policy compliance)
    if (!audioContextResumed) {
      const resumed = await enableAudioContext();
      console.log('HF_SOUND', { enabled: speakingSoundEnabled, resumed });
    }
    
    console.log(`HF_TAP_PRIMARY`, { from: prevState, to: 'pending' });
    
    // State map: Clear state transitions based on current flowState
    switch (flowState) {
      case 'IDLE':
      case 'PAUSED':
        // Fix primary button flow: check for unread assistant first
        if (pausedFrom === 'LISTENING') {
          // Resume listening
          console.log(`HF_PRIMARY`, { from: prevState, to: 'LISTENING', action: 'resume_listening', unread: false });
          setFlowState('LISTENING');
          setPausedFrom(null);
          try {
            await startHandsFreeMicCapture();
          } catch (error: any) {
            console.log('HF_ERROR_RESUME_LISTENING:', error.message);
            setErrorMessage(error.message);
            setFlowState('IDLE');
          }
        } else if (pausedFrom === 'PROCESSING') {
          // Wait for next assistant bubble; when it appears, speak it then auto-open mic
          console.log(`HF_PRIMARY`, { from: prevState, to: 'IDLE', action: 'resume_processing_wait', unread: false });
          setFlowState('IDLE');
          setPausedFrom(null);
          // Processing will continue naturally when backend responds
        } else {
          // New bootstrap logic
          const latest = findLatestEligibleAssistantMessage();
          const hasLatest = !!latest;
          const hasCurrentQuestion = !!currentQuestion?.trim();
          const unread = unreadAssistantExists();
          
          console.log('HF_BOOTSTRAP', { path: 'backend', hasLatest, hasCurrentQuestion });
          console.log('HF_PRIMARY', { from: prevState, to: 'pending', unread });
          
          if (latest) {
            // Speak existing assistant message
            console.log(`HF_PRIMARY`, { from: prevState, to: 'READING', action: 'read_existing', unread });
            setFlowState('READING');
            setPausedFrom(null);
            
            try {
              await speakLatestAssistantMessage();
            } catch (error: any) {
              console.log('HF_ERROR_START_READING:', error.message);
              setErrorMessage(error.message);
              setFlowState('IDLE');
            }
          } else if (hasCurrentQuestion) {
            // Bootstrap without fabricating a bubble
            console.log(`HF_PRIMARY`, { from: prevState, to: 'READING', action: 'bootstrap_ephemeral', unread });
            setFlowState('READING');
            setPausedFrom(null);
            
            try {
              await speakEphemeral(currentQuestion.trim());
            } catch (error: any) {
              console.log('HF_ERROR_BOOTSTRAP:', error.message);
              setErrorMessage(error.message);
              setFlowState('IDLE');
            }
          } else {
            // Nothing to read and no cached question: fallback to LISTENING
            console.log(`HF_PRIMARY`, { from: prevState, to: 'LISTENING', action: 'fallback_listening', unread });
            setFlowState('LISTENING');
            setPausedFrom(null);
            
            try {
              await startHandsFreeMicCapture();
            } catch (error: any) {
              console.log('HF_ERROR_FALLBACK_LISTENING:', error.message);
              setErrorMessage(error.message);
              setFlowState('IDLE');
            }
          }
        }
        break;
        
      case 'READING':
        // Pause reading
        console.log(`HF_PRIMARY`, { from: prevState, to: 'PAUSED', action: 'pause_reading', unread: false });
        if (TTSManager.isSpeaking()) {
          TTSManager.stop();
          setIsSpeaking(false);
          setAvatarState('idle');
        }
        setFlowState('PAUSED');
        setPausedFrom('READING');
        break;
        
      case 'LISTENING':
        // Pause listening
        console.log(`HF_PRIMARY`, { from: prevState, to: 'PAUSED', action: 'pause_listening', unread: false });
        if (micState === 'recording') {
          stopRecording();
        }
        // Clear interim caption on transition out of LISTENING
        setInterimCaption('');
        setFlowState('PAUSED');
        setPausedFrom('LISTENING');
        break;
        
      case 'PROCESSING':
        // Treat as pause: cancel mic reopen timers only; keep evaluator/save untouched
        console.log(`HF_PRIMARY`, { from: prevState, to: 'PAUSED', action: 'pause_processing', unread: false });
        
        // Cancel pending mic reopen timeouts but don't touch the evaluation process
        micReopenTimeouts.forEach(timeout => clearTimeout(timeout));
        setMicReopenTimeouts(new Set());
        
        setFlowState('PAUSED');
        setPausedFrom('PROCESSING');
        break;
        
      default:
        console.warn(`HF_TAP_PRIMARY: Unknown state`, { flowState });
    }
  };

  // Long-press functionality for repeat (B - Keep existing repeat functionality)
  const handlePrimaryButtonPress = () => {
    const timeout = setTimeout(() => {
      setHfIsLongPressing(true);
      playHaptic('medium');
      handleHandsFreeRepeat();
      emitHFTelemetry('HF_REPEAT', { method: 'longpress' });
    }, 800); // 800ms for long press
    setHfLongPressTimeout(timeout);
  };

  const handlePrimaryButtonRelease = () => {
    if (hfLongPressTimeout) {
      clearTimeout(hfLongPressTimeout);
      setHfLongPressTimeout(null);
    }
    
    if (!hfIsLongPressing) {
      // Short press - use new unified handler
      onPrimaryPress();
      emitHFTelemetry('HF_PRIMARY_PRESS', { method: 'button' });
      playHaptic('light');
    }
    
    setHfIsLongPressing(false);
  };

  const handleVoiceCommand = async (command: string) => {
    console.log('HF_VOICE_COMMAND:', command);
    
    // Strict cleanup before executing command
    try {
      cleanup();
    } catch (error) {
      console.warn('HF_COMMAND_CLEANUP_WARNING:', error);
    }
    
    switch (command) {
      case 'pause':
        console.log('HF_PAUSE');
        // Finish current step and hold at idle
        await handleHandsFreePause();
        break;
        
      case 'resume':
        console.log('HF_RESUME');
        // Resume from same prompt if paused
        if (hfStatus === 'idle' && (hfAutoPaused || !hfSessionActive)) {
          await handleHandsFreeResume();
        }
        break;
        
      case 'repeat':
        console.log('HF_REPEAT');
        // Replay last teacher message and re-open mic
        await handleHandsFreeRepeat();
        break;
        
      case 'stop':
        console.log('HF_STOP');
        // Graceful stop, keep HF toggle ON but session idle
        handleHandsFreeStop();
        break;
    }
  };

  // Hands-Free Mode handlers - Full orchestration
  const [hfCurrentPrompt, setHfCurrentPrompt] = useState('');
  const [hfTabVisible, setHfTabVisible] = useState(true);
  const [hfRetryCount, setHfRetryCount] = useState(0);
  // Tab visibility handling for hands-free pause/resume
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = !document.hidden;
      setHfTabVisible(isVisible);
      
      if (!isVisible && hfActive && hfSessionActive) {
        // Tab backgrounded during hands-free session - auto-pause
        console.log('HF_AUTO_PAUSE: tab backgrounded');
        handleHandsFreePause();
        setHfShowResume(true);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [hfActive, hfSessionActive]);

  // Auto-start hands-free mode when toggle is switched ON
  useEffect(() => {
    if (hfEnabled && !hfActive && isHandsFreeModeAvailable) {
      // Show first-run hint if V2 and never shown before
      if (hfV2Enabled && !hfFirstRunHintShown) {
        setHfShowFirstRunHint(true);
        localStorage.setItem('hfFirstRunHint', 'shown');
        setHfFirstRunHintShown(true);
        
        // Auto-hide hint after 5s
        setTimeout(() => {
          setHfShowFirstRunHint(false);
        }, 5000);
      }
      
      // Auto-start the hands-free loop
      console.log('HF_AUTO_START: toggle enabled');
      setTimeout(() => handleHandsFreeStart(), 100); // Small delay to ensure state is stable
    }
  }, [hfEnabled, isHandsFreeModeAvailable, hfV2Enabled, hfFirstRunHintShown]);

  // Auto-start hands-free mode on page load if enabled
  useEffect(() => {
    if (hfEnabled && isHandsFreeModeAvailable && messages.length > 0) {
      console.log('HF_AUTO_START: page load with toggle enabled');
      setTimeout(() => handleHandsFreeStart(), 500); // Delay to allow component to settle
    }
  }, [messages.length]); // Trigger when messages are loaded

  // Auto-advance when new teacher messages arrive in hands-free mode
  useEffect(() => {
    if (hfActive && hfSessionActive && hfStatus === 'processing') {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && !lastMessage.isUser && !lastMessage.isSystem) {
        console.log('HF_AUTO_ADVANCE: new teacher message detected');
        // Delay to let user read the response
        setTimeout(() => handleHandsFreeAdvance(), 2000);
      }
    }
  }, [messages, hfActive, hfSessionActive, hfStatus]);

  // Clear timers on cleanup
  useEffect(() => {
    return () => {
      if (hfNoInputTimer) clearTimeout(hfNoInputTimer);
      if (hfRePromptTimer) clearTimeout(hfRePromptTimer);
      if (hfControlsTimeout) clearTimeout(hfControlsTimeout);
      if (hfLongPressTimeout) clearTimeout(hfLongPressTimeout);
    };
  }, [hfNoInputTimer, hfRePromptTimer, hfControlsTimeout, hfLongPressTimeout]);

  // Auto-show controls on phase changes
  useEffect(() => {
    if (isMinimalHFUIAvailable && hfEnabled && hfActive) {
      showControls();
    }
  }, [hfStatus, isMinimalHFUIAvailable, hfEnabled, hfActive]);

  // Initial telemetry and controls setup for minimal UI
  useEffect(() => {
    if (isMinimalHFUIAvailable && hfEnabled) {
      emitHFTelemetry('HF_UI_SHOW');
      showControls();
    }
  }, [isMinimalHFUIAvailable, hfEnabled]);

  // Auto-advance after scoring completes in hands-free mode (C - Turn token guard)
  const handleHandsFreeAdvance = async () => {
    if (!hfActive || !hfSessionActive) return;
    
    console.log('HF_ADVANCE');
    emitHFTelemetry('HF_ADVANCE');
    playEarcon('advance');
    playHaptic('light');
    
    // C) Turn token guard: Cancel everything old before advancing
    const oldTurnToken = currentTurnToken;
    console.log('HF_ADVANCE', { oldTurnToken, oldState: flowState });
    
    // D) Turn token guard: On ADVANCE, cancel old listeners and create new token
    const newTurnToken = startNewTurn();
    
    // Small delay to let user process the feedback
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // A) Find newest assistant message (not user/meta) to speak
    const latestMessage = findLatestEligibleAssistantMessage();
    const nextPrompt = latestMessage?.text || currentQuestion;
    
    if (nextPrompt && nextPrompt !== hfCurrentPrompt) {
      setHfCurrentPrompt(nextPrompt);
      
      try {
        console.log('HF_ADVANCE: new turn started', { 
          newTurnToken, 
          oldTurnToken,
          nextPrompt: nextPrompt.substring(0, 50) + '...' 
        });
        
        // F) Hands-free loop: Remove client-side appending - wait for backend
        console.log('[Speaking] Waiting for backend to post next prompt, current:', nextPrompt.substring(0, 50) + '...');
        
        // The message observer will handle speaking when new content arrives
      } catch (error: any) {
        console.log('HF_ERROR_ADVANCE:', error.message);
        setErrorMessage(error.message);
        setHfActive(false);
        setHfStatus('idle');
        setHfSessionActive(false);
        setFlowState('IDLE');
      }
    } else {
      // No new prompt or same prompt - end session
      console.log('HF_SESSION_END: no new prompt');
      setHfActive(false);
      setHfStatus('idle');
      setHfSessionActive(false);
      setFlowState('IDLE');
    }
  };

  // Resume hands-free session
  const handleHandsFreeResume = async () => {
    console.log('HF_RESUME');
    setHfShowResume(false);
    setHfAutoPaused(false);
    setErrorMessage('');
    
    if (hfCurrentPrompt) {
      try {
        setHfActive(true);
        setHfSessionActive(true);
        await speakLatestAssistantMessage();
      } catch (error: any) {
        console.log('HF_ERROR_RESUME:', error.message);
        setErrorMessage(error.message);
      }
    }
  };
  
  const handleHandsFreeBootstrap = async () => {
    // Prevent duplicate starts
    if (hfActive) return;
    
    console.log('HF_BOOTSTRAP');
    emitHFTelemetry('HF_BOOTSTRAP');
    setHfPermissionBlocked(false);
    setErrorMessage(''); // Clear any previous errors
    
    // Autoplay policy compliance: Resume audio context on first Play/Resume tap
    const resumed = await enableAudioContext();
    console.log('HF_SOUND', { enabled: speakingSoundEnabled, resumed });
    
    try {
      // Resume audio context first (handle autoplay restrictions)
      if (typeof window !== 'undefined' && window.AudioContext) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        if (audioContext.state === 'suspended') {
          await audioContext.resume();
        }
      }
      
      // Request microphone permission proactively
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          // Close the stream immediately after getting permission
          stream.getTracks().forEach(track => track.stop());
        } catch (permissionError: any) {
          console.log('HF_ERROR_PERMISSION:', permissionError.message);
          emitHFTelemetry('HF_ERROR_permission', { error: permissionError.message });
          setHfPermissionBlocked(true);
          return;
        }
      }
      
      // Start the hands-free session
      await handleHandsFreeStart();
      
    } catch (error: any) {
      console.log('HF_ERROR_BOOTSTRAP:', error.message);
      emitHFTelemetry('HF_ERROR_bootstrap', { error: error.message });
      
      // Handle specific errors gracefully
      if (error.message.includes('autoplay') || error.message.includes('gesture')) {
        setErrorMessage("Tap to continue - browser requires user interaction");
      } else if (error.message.includes('microphone') || error.message.includes('permission')) {
        setHfPermissionBlocked(true);
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  const handleHandsFreeStart = async () => {
    // Prevent duplicate starts
    if (hfActive) return;
    
    console.log('HF_START');
    emitHFTelemetry('HF_START');
    setHfActive(true);
    setHfSessionActive(true); // Start session
    setHfStatus('idle');
    setHfPermissionBlocked(false);
    setErrorMessage(''); // Clear any previous errors
    
    // Start new turn for fresh session
    const turnToken = startNewTurn();
    
    // Acquire wake lock if V2 enabled
    if (hfV2Enabled) {
      await wakeLockManager.request();
    }
    
    // Start barge-in detector if V2 enabled
    if (hfV2Enabled) {
      await startBargeInDetector();
    }
    
    // Check for existing assistant messages first
    const eligibleMessages = messages.filter(m => !m.isUser && !m.isSystem);
    const latestAssistantMessage = eligibleMessages[eligibleMessages.length - 1];
    const hasAssistant = messages.some(m => m.role === 'assistant');
    
    if (latestAssistantMessage && unreadAssistantExists()) {
      // Speak existing assistant message
      setHfCurrentPrompt(latestAssistantMessage.text);
      console.log('HF_START_EXISTING', { turnToken, prompt: latestAssistantMessage.text.substring(0, 50) + '...' });
      setFlowState('READING');
      await speakLatestAssistantMessage();
    } else if (!hasAssistant) {
      // First Play from IDLE/PAUSED with no assistant bubbles yet - use starter prompt
      const text = 'What would you like to talk about?';
      const key = stableKeyFromText(text);
      setSpokenKeys(prev => new Set([...prev, key]));
      setEphemeralAssistant({ key, text });
      setHfCurrentPrompt(text);
      console.log('HF_START_STARTER', { turnToken, key, text });
      setFlowState('READING');
      await speakExistingMessage(text, key, 'prompt', false, { token: turnToken });
    } else {
      // No unread assistant messages - use fallback prompt but don't append it
      const prompt = currentQuestion || "Hello! Ready to practice today? Let's start with a simple question.";
      setHfCurrentPrompt(prompt);
      console.log('HF_START_FALLBACK', { turnToken, prompt: prompt.substring(0, 50) + '...' });
      
      // Speak fallback without appending to chat
      try {
        setFlowState('READING');
        setIsSpeaking(true);
        setAvatarState('talking');
        
        if (speakingSoundEnabled) {
          await TTSManager.speak(prompt, { canSkip: true });
        }
        
        setIsSpeaking(false);
        setAvatarState('idle');
        
        // After speaking fallback, open mic
        await handleTTSCompletion(turnToken);
      } catch (error: any) {
        console.log('HF_ERROR_START_FALLBACK:', error.message);
        emitHFTelemetry('HF_ERROR_start', { error: error.message });
        setErrorMessage(error.message);
        setHfActive(false);
        setHfSessionActive(false);
        setHfStatus('idle');
        
        // Clean up V2 features
        if (hfV2Enabled) {
          stopBargeInDetector();
          wakeLockManager.release();
        }
      }
    }
  };

  const startHandsFreePromptPlayback = async (prompt: string, useCurrentToken = false) => {
    if (!speakingSoundEnabled) {
      // Skip TTS if sound is off, go straight to mic
      console.log('HF_PROMPT_SKIP: sound disabled');
      setHfStatus('prompting'); // Show status briefly
      await new Promise(resolve => setTimeout(resolve, 500)); // Brief pause
      await startHandsFreeMicCapture();
      return;
    }

    // Use existing token or start new turn
    const turnToken = useCurrentToken && currentTurnToken ? currentTurnToken : startNewTurn();
    
    console.log('HF_PROMPT_PLAY', { turnToken, prompt: prompt.substring(0, 50) + '...' });
    setHfStatus('prompting');
    setHfCurrentPrompt(prompt);
    playEarcon('advance');
    emitHFTelemetry('HF_PROMPT_PLAY', { promptLength: prompt.length, turnToken });
    
    // Remove client-side appending - speak the prompt directly without adding to chat
    try {
      setFlowState('READING');
      setIsSpeaking(true);
      setAvatarState('talking');
      
      await TTSManager.speak(prompt, { canSkip: true });
      
      setIsSpeaking(false);
      setAvatarState('idle');
      
      // After TTS completion, auto-open mic
      await handleTTSCompletion(turnToken);
    } catch (error: any) {
      console.log('HF_ERROR_TTS:', error.message);
      throw error;
    }
  };

  // 4) startHandsFreeMicCapture must not early-return on state
  const startHandsFreeMicCapture = async (options = {}) => {
    const { token } = options;
    const tok = token ?? currentTurnToken ?? startNewTurn();

    // set state ourselves to avoid race
    if (flowState !== 'LISTENING') setFlowState('LISTENING');

    if (isSpeaking || TTSManager.isSpeaking()) return; // keep mutual exclusion
    if (!tok) return;
    playEarcon('listening');
    setHfStatus('listening');
    setHfIsReprompting(false);
    setHfAutoPaused(false);
    
    // Mic health check - show tooltip if mic doesn't start within 1s
    const micHealthTimer = setTimeout(() => {
      if (micState !== 'recording') {
        console.log('HF_MIC_HEALTH: microphone not active after 1s');
        // Show a small tooltip hint
        const tooltip = document.createElement('div');
        tooltip.textContent = 'Tap Allow to use microphone';
        tooltip.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.8); color: white; padding: 8px 12px; border-radius: 6px; font-size: 12px; z-index: 10000; pointer-events: none; opacity: 0; transition: opacity 0.2s;';
        document.body.appendChild(tooltip);
        setTimeout(() => tooltip.style.opacity = '1', 10);
        setTimeout(() => {
          tooltip.style.opacity = '0';
          setTimeout(() => tooltip.remove(), 200);
        }, 3000);
      }
    }, 1000);
    
    // Strict cleanup between steps - ensure clean microphone state
    try {
      cleanup(); // Clean up previous mic session
    } catch (error) {
      console.warn('HF_CLEANUP_WARNING:', error);
    }
    
    // Clear any existing timers
    if (hfNoInputTimer) clearTimeout(hfNoInputTimer);
    if (hfRePromptTimer) clearTimeout(hfRePromptTimer);
    
    // Start re-prompt timer (gentle nudge after 5s of no input)
    const rePromptTimer = setTimeout(async () => {
      if (hfStatus === 'listening' && !hfIsReprompting) {
        console.log('HF_REPROMPT: no input detected after 5s');
        setHfIsReprompting(true);
        
        // Play gentle re-prompt
        try {
          await TTSManager.speak("Take your time. I'm listening.", { canSkip: false });
        } catch (error) {
          console.log('HF_ERROR_REPROMPT:', error);
        }
        
        setHfIsReprompting(false);
      }
    }, 5000);
    setHfRePromptTimer(rePromptTimer);
    
    // Start auto-pause timer (pause session after 12-15s total)
    const noinputTimer = setTimeout(async () => {
      if (hfStatus === 'listening') {
        console.log('HF_AUTOPAUSE_NO_INPUT: no input after 12s total');
        
        // Stop recording and pause session
        if (micState === 'recording') {
          stopRecording();
        }
        
        setHfAutoPaused(true);
        setHfStatus('idle');
        setErrorMessage("Session paused due to no input. Say 'resume' or tap Resume to continue.");
      }
    }, 12000);
    setHfNoInputTimer(noinputTimer);
    
    try {
      // Start recording with hard cap (keep existing duration limit)
      const result = await startRecording();
      
      // Clear health timer and other timers since we got input
      clearTimeout(micHealthTimer);
      if (hfNoInputTimer) clearTimeout(hfNoInputTimer);
      if (hfRePromptTimer) clearTimeout(hfRePromptTimer);
      
      console.log('HF_RESULT_FINAL:', result.transcript.length);
      
      // Handle empty or too-short transcripts with retry logic
      if (!result.transcript || result.transcript.trim().length < 2) {
        console.log('HF_EMPTY_TRANSCRIPT:', hfEmptyTranscriptCount + 1);
        
        const newCount = hfEmptyTranscriptCount + 1;
        setHfEmptyTranscriptCount(newCount);
        
        if (newCount >= 2) {
          // After 2 empty transcripts, auto-repeat prompt once
          console.log('HF_AUTO_REPEAT: too many empty transcripts');
          setHfEmptyTranscriptCount(0); // Reset counter
          
          try {
            await startHandsFreePromptPlayback(hfCurrentPrompt);
            return;
          } catch (error) {
            console.log('HF_ERROR_AUTO_REPEAT:', error);
            // Fall through to auto-pause
          }
          
          // If repeat fails, auto-pause with nudge
          setHfAutoPaused(true);
          setHfStatus('idle');
          setErrorMessage("No clear speech detected. Say 'resume' or tap Resume to continue.");
          return;
        } else {
          // First empty transcript - retry once quickly
          console.log('HF_RETRY: empty transcript, retrying');
          setTimeout(() => {
            if (hfActive && hfStatus === 'listening') {
              startHandsFreeMicCapture();
            }
          }, 1000);
          return;
        }
      } else {
        // Reset empty transcript counter on successful input
        setHfEmptyTranscriptCount(0);
      }
      
      // Check for voice commands first (don't display or score these)
      const command = detectVoiceCommand(result.transcript);
      if (command) {
        await handleVoiceCommand(command);
        return; // Don't process as normal input
      }
      
      // D) State transition: Move to PROCESSING and close mic
      setFlowState('PROCESSING');
      setHfStatus('processing');
      emitHFTelemetry('HF_RESULT_FINAL', { transcriptLength: result.transcript.length, turnToken: currentTurnToken });
      playEarcon('processing');
      
      // 5) Append exactly one user bubble on ASR_FINAL
      onUserFinalTranscript(result?.transcript || '', tok);
      
      // Remove duplicate user bubble creation - handled by onUserFinalTranscript
      setInterimCaption('');
      
      // Check if user said "resume" to resume paused session (fallback for non-exact matches)
      if (hfAutoPaused && result.transcript.toLowerCase().includes('resume')) {
        console.log('HF_VOICE_RESUME: user said resume (fallback)');
        setHfAutoPaused(false);
        setErrorMessage('');
        // Continue with current prompt
        await startHandsFreePromptPlayback(hfCurrentPrompt);
        return;
      }
      
      // Execute existing teacher loop (unchanged)
      await executeTeacherLoop(result?.transcript || '');
      
      // Note: Auto-advance now handled by TTS completion in addAssistantMessage
      
    } catch (error: any) {
      console.log('HF_ERROR_MIC:', error.message);
      
      // Clear timers on error
      if (hfNoInputTimer) clearTimeout(hfNoInputTimer);
      if (hfRePromptTimer) clearTimeout(hfRePromptTimer);
      
      // Check if it's a permission issue
      if (error.message.includes('permission') || error.message.includes('NotAllowedError')) {
        console.log('HF_ERROR_PERMISSION:', error.message);
        setHfPermissionBlocked(true);
        setErrorMessage("Microphone access needed. Please allow and try again.");
      } else {
        setErrorMessage(error.message);
      }
      
      setHfActive(false);
      setHfStatus('idle');
      setHfSessionActive(false);
    }
  };

  const handleHandsFreePause = async () => {
    console.log('HF_PAUSE');
    emitHFTelemetry('HF_PAUSE');
    
    // Clear timers
    if (hfNoInputTimer) clearTimeout(hfNoInputTimer);
    if (hfRePromptTimer) clearTimeout(hfRePromptTimer);
    
    // Stop any current TTS
    if (TTSManager.busy) {
      TTSManager.stop();
    }
    
    // Stop any recording
    if (micState === 'recording') {
      stopRecording();
    }
    
    // Clean up V2 features
    if (hfV2Enabled) {
      stopBargeInDetector();
      wakeLockManager.release();
    }
    
    // Hold at idle on same prompt
    setHfStatus('idle');
    setHfIsReprompting(false);
  };

  const handleHandsFreeRepeat = async () => {
    console.log('HF_REPEAT');
    
    // Stop any current activity (D - One voice at a time)
    if (TTSManager.isSpeaking()) {
      TTSManager.skip();
      setIsSpeaking(false);
      setAvatarState('idle');
    }
    if (micState === 'recording') {
      stopRecording();
    }
    
      // Clear previous ghost and speaking indicators on advance
      if (ephemeralAssistant) {
        setEphemeralAssistant(null);
        console.log('HF_GHOST_CLEAR', { reason: 'advance' });
      }
      setSpeakingMessageKey(null);
    const currentAssistantMessage = messages.filter(m => !m.isUser && !m.isSystem).pop();
    
    if (currentAssistantMessage) {
      try {
        console.log('HF_REPEAT: replaying current assistant message');
        // Generate messageKey for the existing message (fix regression - use stable key)
        const messageKey = stableMessageKey(currentAssistantMessage.text, currentAssistantMessage.id);
        // Speak existing message without appending new bubble
        await speakExistingMessage(currentAssistantMessage.text, messageKey, 'prompt', true);
      } catch (error: any) {
        console.log('HF_ERROR_REPEAT:', error.message);
        setErrorMessage(error.message);
      }
    } else if (hfCurrentPrompt) {
      // Fallback to current prompt if no assistant message found
      try {
        // Increment replay counter for this turn
        const newReplayCount = replayCounter + 1;
        setReplayCounter(newReplayCount);
        
        // Create messageId with replay suffix 
        const turnToken = currentTurnToken || startNewTurn();
        const messageId = computeMessageId(turnToken, 'prompt', hfCurrentPrompt, newReplayCount);
        
        console.log('HF_REPEAT_PLAY', { turnToken, messageId, replayCount: newReplayCount });
        
        // Mark as played with replay suffix  
        setLastPlayedMessageIds(prev => new Set([...prev, messageId]));
        
        // Use current token to replay without starting new turn
        await startHandsFreePromptPlayback(hfCurrentPrompt, true);
      } catch (error: any) {
        console.log('HF_ERROR_REPEAT:', error.message);
        setErrorMessage(error.message);
      }
    }
  };

  const handleHandsFreeStop = () => {
    console.log('HF_STOP');
    
    // Clear timers
    if (hfNoInputTimer) clearTimeout(hfNoInputTimer);
    if (hfRePromptTimer) clearTimeout(hfRePromptTimer);
    
    // Stop any current TTS
    if (TTSManager.busy) {
      TTSManager.stop();
    }
    
    // Stop any recording
    if (micState === 'recording') {
      stopRecording();
    }
    
    setHfActive(false);
    setHfStatus('idle');
    setHfSessionActive(false);
    setHfPermissionBlocked(false);
    setHfShowResume(false);
    setHfAutoPaused(false);
    setHfIsReprompting(false);
  };

  // Permission handler for blocked autoplay/mic
  const handlePermissionUnblock = async () => {
    setHfPermissionBlocked(false);
    
    // Continue the hands-free flow
    if (hfActive && hfCurrentPrompt) {
      try {
        await startHandsFreePromptPlayback(hfCurrentPrompt);
      } catch (error: any) {
        console.log('HF_ERROR_UNBLOCK:', error.message);
        setErrorMessage(error.message);
      }
    }
  };

  // Legacy recording handler - now uses unified primary press logic
  const handleRecordingClick = async () => {
    // Use unified primary press handler for consistency
    await onPrimaryPress();
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'hsl(var(--app-bg))' }}>
      
      {/* Sparkly stars background */}
      <Sparkle className="top-16 left-8" />
      <Sparkle className="top-32 right-12" delayed />
      <Sparkle className="top-48 left-20" />
      <Sparkle className="top-64 right-32" delayed />
      <Sparkle className="top-80 left-16" />
      <Sparkle className="top-96 right-20" delayed />
      <Sparkle className="top-20 left-32" delayed />
      <Sparkle className="top-40 right-8" />
      <Sparkle className="bottom-32 left-12" />
      <Sparkle className="bottom-48 right-16" delayed />
      <Sparkle className="bottom-64 left-28" />
      <Sparkle className="bottom-80 right-24" delayed />

      <div className="relative z-10 p-3 sm:p-4 max-w-sm mx-auto min-h-screen">
        {/* Simplified Header for Speaking Focus */}
        <div className="text-center mb-6 sm:mb-8 mt-4 sm:mt-6 relative z-30">
          <div className="relative inline-block mb-4">
            <DIDAvatar 
              size="lg"
              state={micState === 'recording' ? 'listening' : micState === 'processing' || isProcessingTranscript ? 'thinking' : 'idle'}
              isSpeaking={isSpeaking}
              className="border-3 sm:border-4 border-white/30 shadow-lg transition-all duration-500 relative z-10"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-3 border-white/30 animate-pulse z-20"></div>
          </div>
          <h1 className="text-white font-bold text-xl sm:text-2xl tracking-wide drop-shadow-lg">Tomas Hoca</h1>
          <div className="text-white/80 text-sm sm:text-base mt-1">Your English Teacher</div>
          {/* Compact status line with real-time XP */}
          {user && (
            <div 
              data-xp-meter
              className="text-white/60 text-xs sm:text-sm mt-2 truncate px-4 transition-all duration-250"
            >
              Level {level} • {xp_current}/{next_threshold} XP
              {lastLevelUpTime && Date.now() - lastLevelUpTime < 3000 && (
                <span className="ml-2 text-yellow-300 animate-pulse">🌟 Level up!</span>
              )}
            </div>
          )}
        </div>

          {/* Premium Chat Area */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 overflow-y-auto min-h-[280px] max-h-[320px] space-y-2 relative z-10">
          <div className="text-center mb-4">
            <span className="text-white/80 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">💬 Conversation</span>
          </div>
          {messages.map((message, index) => {
            const messageKey = stableMessageKey(message.text, message.id);
            const isCurrentlySpeaking = speakingMessageKey === messageKey;
            return (
              <div 
                key={message.id || index}
                className={cn('bot-bubble', isCurrentlySpeaking && 'speaking')}
              >
                <ChatBubble 
                  message={message.text} 
                  isUser={message.isUser}
                  className={cn(
                    message.isSystem ? "opacity-75 italic" : ""
                  )}
                />
              </div>
            );
          })}
          
          {/* Ephemeral ghost bubble - shows what's being spoken without appending to history */}
          {ephemeralAssistant && (
            <div className="flex justify-start mb-3 sm:mb-4">
              <div className="flex items-start space-x-2 sm:space-x-3 max-w-[90%] sm:max-w-[85%]">
                <div className="conversation-bubble px-4 py-3 sm:px-5 sm:py-4 font-medium text-sm sm:text-base leading-relaxed flex-1 bg-gradient-to-br from-blue-50/60 to-blue-100/50 text-gray-800 border-l-4 border-blue-400/70 ghost">
                  {ephemeralAssistant.text}
                  <div className="hint">Speaking…</div>
                </div>
              </div>
            </div>
          )}
          
          {/* Live interim caption during listening */}
          {flowState === 'LISTENING' && interimCaption && (
            <div className="text-center mb-2">
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-white/80 text-sm italic">
                {interimCaption}
              </div>
            </div>
          )}
        </div>

        {/* Mic status indicator during listening */}
        {flowState === 'LISTENING' && (
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm rounded-full px-3 py-1 text-green-200 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Listening...
            </div>
          </div>
        )}

            {/* Bootstrap/Status Under Chat - Always Visible for Hands-Free Mode */}
            {hfEnabled && (
              <div className="text-center mb-4 relative z-10">
                {/* Show bootstrap pill when HF is enabled but not active */}
                {!hfActive && !hfAutoPaused && !hfShowResume && (
                  <button
                    onClick={onPrimaryPress}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onPrimaryPress();
                      }
                    }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/80 to-purple-500/80 hover:from-blue-600/90 hover:to-purple-600/90 backdrop-blur-sm rounded-full px-4 py-2 text-white font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent cursor-pointer shadow-lg hover:shadow-xl"
                    style={{ pointerEvents: 'auto' }}
                    aria-label="Start hands-free session"
                    title="Start hands-free conversation mode"
                  >
                    <span>▶︎</span>
                    <span>Start hands-free</span>
                  </button>
                )}
            
            {/* V2 Minimal Status Chip - Always visible while HF is on */}
            {(hfActive || hfAutoPaused) && hfV2Enabled && (
              <div 
                     className="inline-flex bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-white/80 text-xs font-medium transition-opacity duration-200 mt-2"
                     aria-live="polite"
                     aria-label="Hands-free status"
                   >
                     {flowState === 'READING' ? 'Reading…' :
                      flowState === 'LISTENING' ? 'Listening…' :
                      flowState === 'PROCESSING' ? 'Thinking…' :
                      flowState === 'PAUSED' ? 'Paused' :
                      'Ready'}
              </div>
            )}
            
            {/* Legacy status chip for non-V2 */}
            {!hfV2Enabled && (
              <div 
                className="inline-flex bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-white/80 text-xs font-medium transition-opacity duration-200"
                aria-live="polite"
                aria-label="Hands-free status"
              >
                {!hfActive ? (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    <span>Hands-Free Ready</span>
                  </span>
                ) : (
                  <>
                    {hfStatus === 'prompting' && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                        <span>{hfIsReprompting ? '🔄 Re-prompting...' : '📖 Reading...'}</span>
                      </span>
                    )}
                    {hfStatus === 'listening' && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        <span>👂 Listening...</span>
                      </span>
                    )}
                    {hfStatus === 'processing' && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                        <span>🧠 Processing...</span>
                      </span>
                    )}
                    {hfStatus === 'idle' && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                        <span>{hfAutoPaused ? '⏸️ Paused' : '⏸️ Ready'}</span>
                      </span>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Premium Speaking Button */}
        <div className="flex flex-col items-center space-y-4 sm:space-y-6 pb-6 sm:pb-8 relative z-10">
          {/* Hands-Free Mode Toggle removed for minimal UI */}
          
            {/* Hide the big Start Speaking button when hands-free is enabled */}
            {!hfEnabled && (
              <Button
                onClick={onPrimaryPress}
                className={`pill-button w-full max-w-sm py-6 sm:py-8 text-lg sm:text-xl font-bold border-0 shadow-xl min-h-[64px]`}
                size="lg"
                style={{
                  background: flowState === 'READING' || flowState === 'LISTENING'
                    ? 'linear-gradient(135deg, #ff4f80, #ff6b9d, #c084fc)' 
                    : 'linear-gradient(135deg, #ff4f80, #ff6b9d)',
                  color: 'white',
                  pointerEvents: 'auto',
                  boxShadow: flowState === 'READING' || flowState === 'LISTENING'
                    ? '0 0 60px rgba(255, 79, 128, 0.6), 0 8px 32px rgba(255, 107, 157, 0.4)' 
                    : '0 8px 32px rgba(255, 79, 128, 0.3), 0 4px 16px rgba(255, 107, 157, 0.2)',
                }}
              >
                <div className="flex items-center gap-3">
                  {flowState === 'READING' ? "🎙️" : 
                   flowState === 'LISTENING' ? "👂" :
                   flowState === 'PROCESSING' ? "⏳" : "🎤"}
                  <span className="drop-shadow-sm">
                    {flowState === 'READING' ? "Speaking... (tap to pause)" : 
                     flowState === 'LISTENING' ? "Listening... (tap to pause)" :
                     flowState === 'PROCESSING' ? "Thinking..." :
                     flowState === 'PAUSED' ? "Resume" :
                     "Start Speaking"}
                  </span>
                </div>
              </Button>
            )}

          {/* V2 Minimal Hands-Free Control - Single Primary Button (floating, bottom-center) */}
          {/* Control is always mounted, but hidden when not needed */}
          <div style={{ display: hfEnabled && hfV2Enabled ? 'block' : 'none' }}>
            <>
              {/* First-run hint tooltip */}
              {hfShowFirstRunHint && (
                <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 text-gray-800 text-sm font-medium shadow-lg border border-white/20 z-50 animate-fade-in">
                  <div className="text-center">
                    <p>Tap Start to begin. Say "again" to hear it again.</p>
                  </div>
                  <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white/90 rotate-45 border-r border-b border-white/20"></div>
                </div>
              )}
              
              {/* Main floating control (always present for tap reveal) */}
              <div 
                className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-40"
                onClick={(e) => {
                  e.stopPropagation();
                  if (hfShowFirstRunHint) setHfShowFirstRunHint(false);
                  showControls();
                }}
              >
                {/* Single primary control button */}
                <div className={`hf-primary transition-all duration-300 ${hfControlsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ pointerEvents: 'auto', zIndex: 9999 }}>
                  <div className="flex items-center gap-3">
                    {/* Main floating mic button */}
                    <button
                      onMouseDown={handlePrimaryButtonPress}
                      onMouseUp={handlePrimaryButtonRelease}
                      onMouseLeave={handlePrimaryButtonRelease}
                      onTouchStart={handlePrimaryButtonPress}
                      onTouchEnd={handlePrimaryButtonRelease}
                      className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white/30 active:scale-95"
                      aria-label={flowState === 'IDLE' || flowState === 'PAUSED' ? "Play" : "Pause"}
                      title={flowState === 'IDLE' || flowState === 'PAUSED' ? "Tap to play • Long-press for again" : "Tap to pause • Long-press for again"}
                      style={{ 
                        minWidth: '56px', 
                        minHeight: '56px',
                        pointerEvents: 'auto',
                        boxShadow: flowState === 'LISTENING' 
                          ? '0 0 20px rgba(59, 130, 246, 0.5), 0 4px 16px rgba(0, 0, 0, 0.2)' 
                          : '0 4px 16px rgba(0, 0, 0, 0.2)' 
                      }}
                    >
                      {flowState === 'IDLE' || flowState === 'PAUSED' ? (
                        <Play className="w-6 h-6" />
                      ) : (
                        <Pause className="w-6 h-6" />
                      )}
                    </button>
                    
                    {/* Overflow menu button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setHfOverflowOpen(!hfOverflowOpen);
                      }}
                      className="flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
                      aria-label="More options"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Overflow dropdown */}
                  {hfOverflowOpen && (
                    <div className="absolute bottom-16 left-0 bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20 shadow-lg min-w-[144px]">
                      <button
                        onClick={() => {
                          handleHandsFreeRepeat();
                          setHfOverflowOpen(false);
                          emitHFTelemetry('HF_REPEAT', { method: 'overflow' });
                        }}
                        className="w-full text-left px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-colors flex items-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Again
                      </button>
                      <button
                        onClick={() => {
                          handleHandsFreeStop();
                          setHfOverflowOpen(false);
                          emitHFTelemetry('HF_STOP', { method: 'overflow' });
                        }}
                        className="w-full text-left px-3 py-2 text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-lg text-sm transition-colors flex items-center gap-2"
                      >
                        <Square className="w-4 h-4" />
                        End
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Invisible tap area when controls are hidden - A) Button must always accept taps */}
                <div 
                  className="w-16 h-16 bg-transparent cursor-pointer"
                  style={{ pointerEvents: 'auto', zIndex: 9998 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    showControls();
                    // Also handle primary press if not active
                    if (!hfActive) {
                      onPrimaryPress();
                    }
                  }}
                  aria-label="Tap to show controls and start"
                />
              </div>
              
              {/* Click outside to close overflow */}
              {hfOverflowOpen && (
                <div 
                  className="fixed inset-0 z-30" 
                  onClick={() => setHfOverflowOpen(false)}
                />
              )}
            </>
          </div>

          {/* Legacy Minimal Hands-Free Controls (non-V2) */}
          {hfEnabled && hfActive && !hfV2Enabled && isMinimalHFUIAvailable && (
            <div 
              className={`transition-all duration-300 ${hfControlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              onClick={showControls}
            >
              <div className="relative glass-card rounded-xl p-3 w-full max-w-sm">
                <div className="flex items-center justify-center gap-3">
                  {/* Single Primary Control Button */}
                  <button
                    onMouseDown={handlePrimaryButtonPress}
                    onMouseUp={handlePrimaryButtonRelease}
                    onTouchStart={handlePrimaryButtonPress}
                    onTouchEnd={handlePrimaryButtonRelease}
                    className="flex-1 bg-gradient-to-r from-blue-500/80 to-purple-500/80 hover:from-blue-600/90 hover:to-purple-600/90 backdrop-blur-sm rounded-lg px-4 py-3 text-white font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
                    aria-label={hfStatus === 'idle' || hfAutoPaused ? "Resume hands-free" : "Pause hands-free"}
                    title="Tap to pause/resume • Long-press to repeat"
                  >
                    {hfStatus === 'idle' || hfAutoPaused ? '▶︎ Resume' : '⏸️ Pause'}
                  </button>
                  
                  {/* Overflow Menu */}
                  <button
                    onClick={() => setHfShowOverflow(!hfShowOverflow)}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg px-3 py-3 text-white/80 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
                    aria-label="More options"
                  >
                    ⋯
                  </button>
                </div>
                
                {/* Overflow Options */}
                {hfShowOverflow && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                    <button
                      onClick={() => {
                        handleHandsFreeRepeat();
                        setHfShowOverflow(false);
                        emitHFTelemetry('HF_REPEAT', { method: 'overflow' });
                      }}
                      className="w-full text-left px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded text-sm transition-colors"
                    >
                      Repeat
                    </button>
                    <button
                      onClick={() => {
                        handleHandsFreeStop();
                        setHfShowOverflow(false);
                        emitHFTelemetry('HF_STOP', { method: 'overflow' });
                      }}
                      className="w-full text-left px-3 py-2 text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded text-sm transition-colors"
                    >
                      Stop
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Legacy controls are removed - minimal UI is always used */}

          {/* Tap area to show controls when hidden */}
          {hfEnabled && hfActive && isMinimalHFUIAvailable && !hfControlsVisible && (
            <div 
              onClick={showControls}
              className="w-full max-w-sm h-12 bg-transparent cursor-pointer"
              aria-label="Tap to show controls"
            />
          )}


          {/* Simplified Resume Banner - only when auto-paused or backgrounded */}
          {(hfShowResume || hfAutoPaused) && (
            <div className="bg-blue-500/20 backdrop-blur-sm rounded-lg px-4 py-3 border border-blue-400/30 text-center w-full max-w-sm">
              <p className="text-blue-200 text-sm font-medium mb-2">
                {hfAutoPaused ? 'Paused' : 'Session paused'}
              </p>
              <button
                onClick={handleHandsFreeBootstrap}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg px-4 py-2 text-white font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 min-h-[44px]"
                aria-label="Resume hands-free session"
              >
                <Play className="w-4 h-4" />
                <span>Resume</span>
              </button>
            </div>
          )}

          {/* Permission Blocked Nudge (only when needed) */}
          {hfPermissionBlocked && (
            <div className="bg-orange-500/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-orange-400/30 text-center">
              <p className="text-orange-200 text-sm font-medium mb-2">
                🎤 Microphone access needed
              </p>
              <Button
                onClick={handleHandsFreeBootstrap}
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white text-xs"
              >
                Continue
              </Button>
            </div>
          )}
          
          {/* Error message display */}
          {errorMessage && (
            <div className="text-red-300 text-sm font-medium bg-red-500/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-red-400/30">
              {errorMessage}
            </div>
          )}

          {/* Premium Controls - Hidden when hands-free is active */}
          {!hfActive && (
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              {/* Sound Toggle */}
              <button
                onClick={toggleSpeakingSound}
                className="pill-button glass-card px-4 py-3 text-white font-medium border border-white/20 transition-all duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 flex items-center gap-2"
                aria-label={speakingSoundEnabled ? "Mute sound" : "Enable sound"}
              >
                {speakingSoundEnabled ? (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span className="hidden sm:inline">🔊 Sound On</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span className="hidden sm:inline">🔇 Muted</span>
                  </>
                )}
              </button>
              
              <select 
                value={userLevel}
                onChange={(e) => setUserLevel(e.target.value as typeof userLevel)}
                className="pill-button glass-card px-5 py-3 text-white font-medium border border-white/20 outline-none cursor-pointer text-sm sm:text-base appearance-none bg-transparent"
              >
                <option value="beginner" className="bg-gray-800 text-white">🌱 Beginner</option>
                <option value="intermediate" className="bg-gray-800 text-white">🌿 Intermediate</option>
                <option value="advanced" className="bg-gray-800 text-white">🌳 Advanced</option>
              </select>
            </div>
          )}
        </div>

        {/* Token overlay for XP animations */}
        <TokenOverlay soundEnabled={speakingSoundEnabled} />
      </div>
    </div>
  );
} // End of SpeakingApp component