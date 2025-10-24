import { useState, useEffect, useMemo } from 'react';
import { Mic, Volume2, VolumeX, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import DIDAvatar from './DIDAvatar';
import AnimatedAvatar from './AnimatedAvatar';
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
import { runVoiceConsistencyTestSuite } from '@/utils/voiceConsistencyTest';
import { wakeLockManager } from '@/utils/wakeLock';
import { Play, Pause, MoreHorizontal, RotateCcw, Square } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { LevelUpModal } from './LevelUpModal';

// Feature flags
const SPEAKING_HANDS_FREE = true;
const HF_BARGE_IN = true;
const HF_VOICE_COMMANDS = true;
const SPEAKING_HF_MINUI = true;
const SPEAKING_HANDS_FREE_V2 = true;
const SPEAKING_HANDS_FREE_MINIMAL = true;

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

// 🔧 FIX #11: Floating XP Gain Animation Component with ARIA
const FloatingXP = ({ amount, onComplete }: { amount: number; onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000); // Animation duration
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
      style={{
        animation: 'floatUpFade 2s ease-out forwards'
      }}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 text-white font-bold text-lg shadow-2xl">
        <span className="text-2xl">⚡</span>
        <span>+{amount} XP</span>
      </div>
      <style>{`
        @keyframes floatUpFade {
          0% {
            opacity: 0;
            transform: translateY(0) translateX(-50%) scale(0.8);
          }
          20% {
            opacity: 1;
            transform: translateY(-10px) translateX(-50%) scale(1);
          }
          80% {
            opacity: 1;
            transform: translateY(-50px) translateX(-50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-80px) translateX(-50%) scale(0.8);
          }
        }
      `}</style>
    </div>
  );
};

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

// Mobile-First Chat Bubble component (iPhone optimized)
const ChatBubble = ({
  message,
  isUser = false,
  className
}: {
  message: string;
  isUser?: boolean;
  className?: string;
}) => (
  <div
    className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2 animate-slide-in-up ${className}`}
    style={{ animation: 'slideInUp 0.4s ease-out' }}
  >
    <div className={`flex items-end gap-2 max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        className={`px-3 py-2 rounded-[18px] text-[15px] leading-[1.4] shadow-md ${
          isUser
            ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-br-[4px]'
            : 'bg-white text-gray-800 rounded-bl-[4px]'
        }`}
      >
        {message}
      </div>

      {/* Compact bookmark button for AI messages */}
      {!isUser && (
        <button
          onClick={() => {
            // Trigger bookmark action
          }}
          className="opacity-0 group-hover:opacity-60 hover:opacity-100 transition-opacity p-1"
          aria-label="Bookmark message"
        >
          <BookmarkButton
            content={message}
            type="message"
            className="w-5 h-5"
          />
        </button>
      )}
    </div>
  </div>
);

interface SpeakingAppProps {
  initialMessage?: string;
}

export default function SpeakingApp({ initialMessage }: SpeakingAppProps = {}) {
  // Initialize isSpeaking state first
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { avatarState, setAvatarState } = useAvatarState({ isSpeaking });
  // 🔧 FIX #30: Removed dead code - didAvatarRef was never used
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

  // 🔧 FIX #7: iOS autoplay handling - detect iOS and show unlock prompt
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const [showAudioUnlockPrompt, setShowAudioUnlockPrompt] = useState(false);

  // 🔧 FIX #13: iOS haptic feedback utility
  const triggerHaptic = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (!isIOS || !navigator.vibrate) return;

    // Different vibration patterns for different feedback types
    const patterns = {
      light: [10],       // Quick tap
      medium: [20],      // Medium tap
      heavy: [30, 10, 30] // Double tap for important events
    };

    try {
      navigator.vibrate(patterns[type]);
    } catch (e) {
      // Vibration not supported or failed, silently ignore
    }
  };

  // 🔧 FIX #2: Store AudioContext in ref to prevent memory leaks
  const audioContextRef = useRef<AudioContext | null>(null);

  // 🔧 FIX #3: Track if component is mounted to prevent setState on unmounted component
  const isMountedRef = useRef(true);

  // 🔧 FIX #3: Safe setState wrapper - only call if component is still mounted
  const safeSetState = <T,>(setter: React.Dispatch<React.SetStateAction<T>>) => {
    return (value: React.SetStateAction<T>) => {
      if (isMountedRef.current) {
        setter(value);
      }
    };
  };

  // TTS listener authority state
  const [ttsListenerActive, setTtsListenerActive] = useState(false);
  
  const { level, xp_current, next_threshold, user_level, awardXp, lastLevelUpTime, fetchProgress, resetLevelUpNotification, subscribeToProgress } = useProgressStore();

  // 1) Helper to guarantee sound is ready
  const ensureSoundReady = async () => {
    const enabled = localStorage.getItem('speaking.sound.enabled') !== 'false';
    let resumed = false;
    if (enabled) {
      try { 
        resumed = await enableAudioContext(); 
      } catch { 
        resumed = false; 
      }
    }
    return { enabled, resumed };
  };

  // 🔧 FIX #2 & #7: Reuse AudioContext to prevent memory leaks + iOS autoplay handling
  const enableAudioContext = async (): Promise<boolean> => {
    try {
      if (typeof window !== 'undefined' && window.AudioContext) {
        // Reuse existing AudioContext if available
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        const audioContext = audioContextRef.current;

        if (audioContext.state === 'suspended') {
          // 🔧 FIX #7: On iOS, show unlock prompt before attempting resume
          if (isIOS && !audioContextResumed) {
            setShowAudioUnlockPrompt(true);
          }
          await audioContext.resume();
        }

        // 🔧 FIX #7: Hide prompt once audio is successfully unlocked
        if (audioContext.state === 'running') {
          setAudioContextResumed(true);
          setShowAudioUnlockPrompt(false);
          return true;
        }
      }
      return false;
    } catch (error) {
      // 🔧 FIX #7: Show prompt on error for iOS
      if (isIOS) {
        setShowAudioUnlockPrompt(true);
      }
      return false;
    }
  };

  // Keep icon and engine in sync: Persist sound state changes
  const toggleSpeakingSound = () => {
    const newEnabled = !speakingSoundEnabled;
    
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

  // 🔧 FIX #17: Message pagination - limit to most recent 100 messages for performance
  const MAX_MESSAGES = 100;
  const limitMessages = (msgs: typeof messages) => {
    if (msgs.length > MAX_MESSAGES) {
      return msgs.slice(-MAX_MESSAGES); // Keep only last 100
    }
    return msgs;
  };

  // 🔧 FIX #18: XSS protection - sanitize user input and AI responses
  const sanitizeText = (text: string): string => {
    // Escape HTML special characters to prevent XSS attacks
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  };

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
      return `server:${serverId}`;
    }
    
    // Hash only the content for stability
    const hash = text.substring(0, 200).split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const key = `msg-${Math.abs(hash)}`;
    return key;
  };

  // Helper for ephemeral keys (text-only, no server id)
  const stableKeyFromText = (text: string): string => {
    const hash = text.substring(0, 200).split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const key = `msg-${Math.abs(hash)}`;
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

  // Remove useSpeakingTTS hook - we'll use strict turn-taking logic instead
  
  const [micState, setMicState] = useState<MicState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [history, setHistory] = useState<Array<{input: string; corrected: string; time: string}>>([]);
  const [currentQuestion, setCurrentQuestion] = useState("What did you have for lunch today?");
  const [conversationContext, setConversationContext] = useState("");
  // ✨ CONNECTED: userLevel now comes from XP progression (useProgressStore)
  // No longer hardcoded! Automatically adjusts based on level (1-10=beginner, 11-25=intermediate, 26+=advanced)
  const [isProcessingTranscript, setIsProcessingTranscript] = useState(false);
  const [lastTranscript, setLastTranscript] = useState<string>('');
  const [lastMessageTime, setLastMessageTime] = useState<number>();
  
  // Hands-Free Mode state and logic
  const [hfEnabled, setHfEnabled] = useState(() => {
    // Enable by default for minimal UI
    return true;
  });

  // Helper function to strip emojis from text for TTS (keep visible in chat)
  const stripEmojisForTTS = (text: string): string => {
    return text
      .replace(/[\u{1F600}-\u{1F64F}]/gu, '') // Emoticons
      .replace(/[\u{1F300}-\u{1F5FF}]/gu, '') // Misc Symbols and Pictographs
      .replace(/[\u{1F680}-\u{1F6FF}]/gu, '') // Transport and Map
      .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, '') // Flags
      .replace(/[\u{2600}-\u{26FF}]/gu, '')   // Misc symbols
      .replace(/[\u{2700}-\u{27BF}]/gu, '')   // Dingbats
      .replace(/[\u{1F900}-\u{1F9FF}]/gu, '') // Supplemental Symbols
      .replace(/[\u{1FA70}-\u{1FAFF}]/gu, '') // Symbols and Pictographs Extended-A
      .trim();
  };

  // Helper function to generate turn token (authoritative current turn)
  const generateTurnToken = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    const token = `turn-${timestamp}-${random}`;
    return token;
  };

  // Helper function to compute messageId from turnToken + phase + text + replay
  const computeMessageId = (turnToken: string, phase: 'prompt' | 'feedback', text: string, replay = 0) => {
    const baseId = `${turnToken}-${phase}-${text.substring(0, 20).replace(/[^a-zA-Z0-9]/g, '')}`;
    const hash = baseId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const replaySuffix = replay > 0 ? `-r${replay}` : '';
    return `msg-${Math.abs(hash)}-${phase}${replaySuffix}`;
  };

  // Clear old state/timers on every new turn
  const cancelOldListeners = () => {
    // Clear TTS completion timeouts
    ttsCompletionTimeouts.forEach(clearTimeout);
    setTtsCompletionTimeouts(new Set());
    
    // Clear mic reopen timeouts
    micReopenTimeouts.forEach(clearTimeout);
    setMicReopenTimeouts(new Set());
    
    // Stop any current TTS (no coalesce)
    if (TTSManager.isSpeaking()) {
      TTSManager.stop();
      setIsSpeaking(false);
      setAvatarState('idle');
    }
    
    // Stop recording if active
    if (micState === 'recording') {
      stopRecording();
    }
  };

  // 🔧 FIX #5: Debounce turn token generation to prevent race conditions
  const lastTurnStartRef = useRef(0);
  const TURN_DEBOUNCE_MS = 300;

  // 2) When starting a turn, always pass a token and always call completion
  const startNewTurn = () => {
    // 🔧 FIX #5: Debounce to prevent rapid-fire token generation
    const now = Date.now();
    if (now - lastTurnStartRef.current < TURN_DEBOUNCE_MS) {
      // Too soon, return current token
      return currentTurnToken;
    }
    lastTurnStartRef.current = now;

    const tok = `turn-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`;
    cancelOldListeners();
    setCurrentTurnToken(tok);
    setReplayCounter(0);
    setFlowState('IDLE');
    return tok;
  };

  // First-play / resume path (starter or latest assistant)
  const playAssistantOnce = async (text: string, messageKey: string) => {
    const token = startNewTurn();
    setFlowState('READING');
    setTtsListenerActive(true); // Enable TTS listener authority

    const { enabled } = await ensureSoundReady();

    let resolved = false;
    const watchdog = setTimeout(() => {
      if (!resolved) {
        // Watchdog timeout - could implement recovery logic here
        resolved = true;
      }
    }, 12000);

    try {
      if (enabled) {
        await TTSManager.speak(stripEmojisForTTS(text), { canSkip: false }).finally(() => {
          resolved = true;
          clearTimeout(watchdog);
        });
      } else {
        resolved = true;
        clearTimeout(watchdog);
      }
    } catch (e) {
      resolved = true; 
      clearTimeout(watchdog);
    } finally {
      await handleTTSCompletion(token);   // ← ALWAYS
    }
  };

  // 🔧 FIX #18: Append user/assistant messages with XSS protection (unified with sequence counter)
  const addChatBubble = (text: string, type: "user" | "bot" | "system", messageId?: string, messageKey?: string) => {
    // Sanitize text to prevent XSS attacks
    const sanitizedText = sanitizeText(text);

    const seq = messageSeqCounter;
    setMessageSeqCounter(prev => prev + 1);

    const id = messageId || `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newMessage = {
      id,
      text: sanitizedText.trim(),
      isUser: type === "user",
      isSystem: type === "system",
      role: type === "user" ? "user" as const : "assistant" as const,
      content: sanitizedText.trim(),
      seq
    };

    setMessages(prev => limitMessages([...prev, newMessage]));
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
    
    // Use ghost only when there's no server bubble; otherwise highlight the real bubble
    if (!hasServerAssistant(messageKey)) {
      setEphemeralAssistant({ key: messageKey, text });
    } else {
      setSpeakingMessageKey(messageKey);
    }
    
    // State machine: Only speak during READING state
    if (flowState !== 'READING' && !isRepeat) {
      return messageKey;
    }
    
    // B) Deduplicate by messageKey: Only speak if messageKey not in spokenKeys  
    if (spokenKeys.has(messageKey) && !isRepeat) {
      return messageKey;
    }

    // Use explicit token or current turn token - NEVER mint a second token if one was given
    const turnToken = opts.token ?? currentTurnToken ?? startNewTurn();
    
    // Compute messageId for turn token events
    const replay = isRepeat ? replayCounter + 1 : 0;
    const messageId = computeMessageId(turnToken, phase, text, replay);
    
    // Check if already played by messageId (turn-level idempotency)
    if (lastPlayedMessageIds.has(messageId) && !isRepeat) {
      await handleTTSCompletion(turnToken, messageId);
      return messageKey;
    }

    // D) One voice at a time: Stop any ongoing TTS before starting new one
    if (TTSManager.isSpeaking() && !isRepeat) {
      TTSManager.stop();
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
      return messageKey;
    }
    
    // Turn token guard: Ensure we're still on the correct turn
    if (turnToken !== currentTurnToken) {
      return messageKey;
    }
    // D) Sound toggle compliance: Check if sound is enabled before TTS
    if (speakingSoundEnabled) {
      // On first Play: Autoplay policy compliance - resume AudioContext
      if (!audioContextResumed) {
        const resumed = await enableAudioContext();
        if (!resumed) {
          // Show tooltip: "Tap Play to enable sound" but don't mark as complete
          setErrorMessage("Tap Play to enable sound");
          return messageKey;
        }
      }

      // A) State transition: Enter READING state for TTS
      setFlowState('READING');
      setIsSpeaking(true);
      setAvatarState('talking');

      // Wrap TTSManager.speak with watchdog and always-finally
      let resolved = false;
      const wd = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          forceToListening('watchdog');
        }
      }, 45000); // 🚨 CRITICAL FIX: Extended to 45s to prevent AI speech cutoff

      try {
        await TTSManager.speak(stripEmojisForTTS(text), { canSkip: false }) // 🚨 CRITICAL FIX: Disabled skip to prevent interruption
          .then(() => {
            // TTS completed successfully
          })
          .catch((e) => {
            // TTS error handled
          })
          .finally(() => {
            resolved = true;
            clearTimeout(wd);
            forceToListening('tts-finally');
          });
      } catch (error) {
        resolved = true;
        clearTimeout(wd);
        forceToListening('tts-error');
      } finally {
        setIsSpeaking(false);
        setAvatarState('idle');
        
        // Clear speaking indicators
        setSpeakingMessageKey(null);
        setEphemeralAssistant(null);
      }
    } else {
      // When muted (we emit HF_PROMPT_SKIP) call forceToListening instead of setState-only
      
      // Clear speaking indicators  
      setSpeakingMessageKey(null);
      setEphemeralAssistant(null);
      
      // Force to listening with muted skip reason
      forceToListening('muted-skip');
    }
    
    return messageKey;
  };

  // B) Separate "append" vs "speak": NEVER append when only speaking existing messages
  const speakLatestAssistantMessage = async (isRepeat = false) => {
    
    // B) Find newest eligible assistant message only
    const latestMessage = findLatestEligibleAssistantMessage();
    
    if (!latestMessage) {
      setFlowState('IDLE');
      return;
    }
    
    // Generate messageKey for deduplication (fix regression - use stable key)
    const messageKey = stableMessageKey(latestMessage.text, latestMessage.id);
    
    // Debug info: messageKey=${messageKey}, text=${latestMessage.text.substring(0, 50)}..., spokenBefore=${spokenKeys.has(messageKey)}
    
    // Speak without appending - this message already exists in chat
    const token = currentTurnToken || startNewTurn();
    await speakExistingMessage(latestMessage.text, messageKey, 'prompt', isRepeat, { token });
  };

  // Only append new messages from backend, never fabricate client-side
  const addAssistantMessage = async (message: string, phase: 'prompt' | 'feedback' = 'feedback') => {
    
    // Use current turn token or generate new one if missing
    const turnToken = currentTurnToken || startNewTurn();
    
    // Compute messageId for strict idempotency
    const messageId = computeMessageId(turnToken, phase, message, 0);
    
    // Add to chat and get sequence number - this is the ONLY place we append assistant messages
    const { id, seq } = addChatBubble(message, "bot", messageId);
    
    // Generate messageKey for this new message (use stable key)
    const messageKey = stableMessageKey(message, id);
    
    // Transition to READING state before speaking (FSM requirement)
    setFlowState('READING');
    setTtsListenerActive(true); // Enable TTS authority so speakExistingMessage doesn't skip
    
    // Now speak this newly added message
    await speakExistingMessage(message, messageKey, phase, false, { token: turnToken });
    
    return messageId;
  };

  // 5) Append one user bubble on FINAL and move to PROCESSING
  const onUserFinalTranscript = (finalText: string, token: string) => {
    if (!finalText.trim() || token !== currentTurnToken) return;
    addChatBubble(finalText, 'user');     // restored
    setFlowState('PROCESSING');
    // existing evaluator/save path continues as before
  };

  // Helper: Force transition to LISTENING with mic activation (unconditional)
  const forceToListening = (reason: string) => {
    
    // Stop any lingering TTS state
    try { TTSManager.stop(); } catch {}
    setIsSpeaking(false);
    setAvatarState('idle');

    // Ensure we have a token; if missing, create a simple one
    if (!currentTurnToken) setCurrentTurnToken(`force-${Date.now()}`);

    // Enter LISTENING state first
    setFlowState('LISTENING');
    
    // Start mic with small delay to ensure state has updated (fix race condition)
    setTimeout(() => {
      startHandsFreeMicCaptureSafe(true); // pass force=true
    }, 50);
    
  };

  // A) TTS → LISTENING (always) - FSM enforced completion
  const handleTTSCompletion = async (token: string, messageId?: string) => {
    // Guard: Drop if token stale
    if (token !== currentTurnToken) { 
      return; 
    }
    
    // Guard: Drop if state === PAUSED
    if (flowState === 'PAUSED') {
      return;
    }
    
    // Guard: Drop if TTS still speaking
    if (TTSManager.isSpeaking()) {
      return;
    }
    
    // Always set state=LISTENING
    if (flowState !== 'LISTENING') {
      setFlowState('LISTENING');
    }
    
    // Call startHandsFreeMicCaptureSafe() within ≤200ms if not already recording
    if (micState !== 'recording') {
      await startHandsFreeMicCaptureSafe();
    }
  };

  // B) Mic + interim captions (LISTENING only) - FSM enforced guards
  const startHandsFreeMicCaptureSafe = async (force = false) => {

    // if not forced, keep existing guards; if forced, bypass
    if (!force) {
      if (flowState !== 'LISTENING') {
        return;
      }
      
      if (TTSManager.isSpeaking()) {
        return;
      }
      
      if (!currentTurnToken) {
        return;
      }
    }

    // Always make sure audio context is unlocked
    try { await enableAudioContext(); } catch {}

    // Clean mic channel between turns
    try { 
      cleanup(); 
    } catch {}

    // Start recording immediately
    setInterimCaption('');
    
    try {
      // Start recording using existing micEngine
      const result = await startRecording();
      const finalTranscript = (result?.transcript || '').trim();

      // C) Final ASR → single user bubble → evaluation
      if (finalTranscript) {
        // Append ONE user bubble with EXACT transcript (preserve accents like "café")
        addChatBubble(finalTranscript, 'user');
        
        // Set state=PROCESSING and call existing executeTeacherLoop
        setFlowState('PROCESSING');
        await executeTeacherLoop(finalTranscript);
      } else {
        // No input: resume listening
        setFlowState('LISTENING');
        setTimeout(() => startHandsFreeMicCaptureSafe(), 100);
      }
    } catch (err) {
      // 🔧 FIX #10: Fixed TypeScript error - catch type should not be annotated
      console.error('Mic capture error:', err);
      setFlowState('PAUSED');
    }
  };

  // E) Grammar correction rendering (no lexical policing) - Enhanced filtering
  const allowedForeign = new Set(['café','jalapeño','résumé','crème','piñata','tortilla','sushi','tapas']);
  
  const isProtectedToken = (word: string): boolean => {
    // Check for non-ASCII characters or words in allowedForeign set
    return /[^\u0000-\u007F]/.test(word) || allowedForeign.has(word.toLowerCase());
  };
  
  // E) Enhanced filter: suppress replacements of protected tokens, keep grammar fixes
  const filterCorrection = (originalText: string, correctedText: string): string => {
    if (!correctedText || correctedText === originalText) {
      return correctedText;
    }
    
    // Tokenize both texts into words (preserve punctuation context)
    const originalWords = originalText.toLowerCase().match(/\b\w+\b/g) || [];
    const correctedWords = correctedText.toLowerCase().match(/\b\w+\b/g) || [];
    
    // Check if any protected word is being replaced with a different word
    let hasProtectedReplacement = false;
    
    // Simple alignment check: if lengths are similar, do word-by-word comparison
    if (Math.abs(originalWords.length - correctedWords.length) <= 2) {
      for (let i = 0; i < Math.min(originalWords.length, correctedWords.length); i++) {
        const origWord = originalWords[i];
        const corrWord = correctedWords[i];
        
        // If original word is protected and gets replaced with different word, suppress
        if (isProtectedToken(origWord) && origWord !== corrWord) {
          hasProtectedReplacement = true;
          break;
        }
      }
    }
    
    // If protected replacement detected, suppress the entire correction
    if (hasProtectedReplacement) {
      return '';
    }
    
    // Otherwise allow the correction (tense, articles, word order fixes are kept)
    return correctedText;
  };

  // 🚨 CONTEXTUAL FOLLOW-UP GENERATOR
  const generateContextualFollowUp = (userResponse: string, level: string): string => {
    const response = userResponse.toLowerCase();
    
    // Sports/Activities
    if (response.includes('pingpong') || response.includes('ping pong')) {
      return level === 'beginner' ? "How long do you play pingpong?" : "How long have you been playing pingpong?";
    }
    if (response.includes('soccer') || response.includes('football')) {
      return level === 'beginner' ? "Do you play soccer often?" : "What position do you play in soccer?";
    }
    if (response.includes('basketball')) {
      return level === 'beginner' ? "Do you like basketball?" : "What's your favorite thing about basketball?";
    }
    if (response.includes('swimming')) {
      return level === 'beginner' ? "Where do you swim?" : "How often do you go swimming?";
    }
    
    // Food
    if (response.includes('pizza')) {
      return level === 'beginner' ? "What pizza do you like?" : "What's your favorite type of pizza?";
    }
    if (response.includes('cooking') || response.includes('cook')) {
      return level === 'beginner' ? "What do you cook?" : "What's your favorite dish to cook?";
    }
    if (response.includes('restaurant')) {
      return level === 'beginner' ? "What food do you eat there?" : "What kind of restaurant do you like?";
    }
    
    // Hobbies/Interests  
    if (response.includes('reading') || response.includes('book')) {
      return level === 'beginner' ? "What books do you read?" : "What's your favorite type of book?";
    }
    if (response.includes('music') || response.includes('singing')) {
      return level === 'beginner' ? "What music do you like?" : "What's your favorite type of music?";
    }
    if (response.includes('movie') || response.includes('film')) {
      return level === 'beginner' ? "What movies do you like?" : "What's your favorite movie genre?";
    }
    
    // Travel/Places
    if (response.includes('travel') || response.includes('trip')) {
      return level === 'beginner' ? "Where do you travel?" : "What's your favorite place to visit?";
    }
    if (response.includes('park')) {
      return level === 'beginner' ? "What do you do in the park?" : "What did you do at the park?";
    }
    
    // Work/School
    if (response.includes('work') || response.includes('job')) {
      return level === 'beginner' ? "What is your work?" : "What do you like about your work?";
    }
    if (response.includes('school') || response.includes('study')) {
      return level === 'beginner' ? "What do you study?" : "What's your favorite subject?";
    }
    
    // Weather/Time
    if (response.includes('weather') || response.includes('sunny') || response.includes('rain')) {
      return level === 'beginner' ? "What do you do in good weather?" : "What's your favorite thing to do in nice weather?";
    }
    
    // Family/Friends
    if (response.includes('family') || response.includes('brother') || response.includes('sister')) {
      return level === 'beginner' ? "Tell me about your family." : "What do you like to do with your family?";
    }
    if (response.includes('friend')) {
      return level === 'beginner' ? "What do you do with friends?" : "What do you and your friends like to do together?";
    }
    
    // General preferences (I like...)
    if (response.includes('i like') || response.includes('i love')) {
      return level === 'beginner' ? "Why do you like that?" : "What do you like most about it?";
    }
    
    // Default contextual responses
    const defaultResponses = [
      level === 'beginner' ? "Can you tell me more?" : "That's interesting! Can you tell me more about that?",
      level === 'beginner' ? "What do you think about it?" : "What's your opinion about that?",
      level === 'beginner' ? "How do you feel about it?" : "How does that make you feel?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  // State for grammar corrections display
  const [grammarCorrections, setGrammarCorrections] = useState<Array<{
    originalPhrase: string;
    correctedPhrase: string;
  }>>([]);

  // State for floating XP animation
  const [floatingXP, setFloatingXP] = useState<number | null>(null);

  // State for level-up celebration modal
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [levelUpValue, setLevelUpValue] = useState<number | null>(null);

  // Helper: Simple validation to prevent display issues (NOT grammar validation - AI handles that)
  const isValidGrammarCorrection = (original: string, corrected: string): boolean => {
    // Only check for basic display validity - trust the AI's grammar validation
    if (!original || !corrected) return false;
    if (original.trim() === '' || corrected.trim() === '') return false;
    if (original.trim() === corrected.trim()) return false;

    // Trust the AI backend - it has strict validation already
    return true;
  };

  // C) Smart executeTeacherLoop - unified conversational AI with grammar correction
  const executeTeacherLoop = async (transcript: string) => {

    try {
      setIsProcessingTranscript(true);
      setGrammarCorrections([]); // Clear previous corrections

      // 🔧 FIX #9: Check network connectivity before API call
      if (!navigator.onLine) {
        await addAssistantMessage("You appear to be offline. Please check your internet connection and try again.", 'feedback');
        return;
      }

      // Use the unified conversational-ai function
      // 🎯 AUTOMATIC DIFFICULTY: user_level is now synced with XP progression!
      const { data, error } = await supabase.functions.invoke('conversational-ai', {
        body: {
          userMessage: transcript,
          conversationHistory: conversationContext || '',
          userLevel: user_level // ✨ Dynamically adjusts based on XP level (beginner/intermediate/advanced)
        }
      });

      // 🔧 FIX #9: Comprehensive error handling with user-friendly messages
      if (error) {
        console.error('Supabase function error:', error);

        // Provide specific error messages based on error type
        let errorMessage = "I couldn't process your message right now. ";

        if (error.message?.includes('fetch')) {
          errorMessage += "Please check your internet connection and try again.";
        } else if (error.message?.includes('timeout')) {
          errorMessage += "The request timed out. Please try again.";
        } else {
          errorMessage += "Please try again in a moment.";
        }

        await addAssistantMessage(errorMessage, 'feedback');
        return;
      }

      const aiResponse = data;

      // Client-side validation: Only show if it's a REAL grammatical error
      if (aiResponse.hadGrammarIssue && aiResponse.originalPhrase && aiResponse.correctedPhrase) {
        // Validate before showing
        const isValid = isValidGrammarCorrection(aiResponse.originalPhrase, aiResponse.correctedPhrase);

        if (isValid) {
          setGrammarCorrections([{
            originalPhrase: aiResponse.originalPhrase,
            correctedPhrase: aiResponse.correctedPhrase
          }]);
        }
      }

      // Add the AI's response to chat
      await addAssistantMessage(aiResponse.response, 'feedback');

      // Update conversation context
      setConversationContext(prev => `${prev}\nUser: ${transcript}\nAssistant: ${aiResponse.response}`.trim());

      // Award XP for successful conversation turn
      const baseXP = 10; // Base XP per message
      const grammarBonus = !aiResponse.hadGrammarIssue ? 5 : 0; // +5 XP for correct grammar
      const xpToAward = baseXP + grammarBonus;

      const success = await awardXp(xpToAward);
      if (success) {
        // 🔧 FIX #30: Removed console.log for production (XP award logging)
        // Show floating XP animation
        setFloatingXP(xpToAward);
      }

    } catch (error) {
      await addAssistantMessage("Sorry, I encountered an error. Let's continue our conversation.", 'feedback');
    } finally {
      setIsProcessingTranscript(false);
    }
  };

  // Event listeners for mic state and interim captions (LISTENING only)
  useEffect(() => {
    // B) Listen for speech:interim events when flowState==='LISTENING' only
    const handleInterimCaption = (event: CustomEvent) => {
      if (flowState === 'LISTENING') {
        const transcript = event.detail?.transcript || '';
        setInterimCaption(transcript);
      }
    };
    
    // Listen for mic state changes to clear captions
    const handleMicStateChange = (newState: MicState) => {
      setMicState(newState);
      
      // Clear interim caption when mic stops or when not in LISTENING state
      if (newState !== 'recording' || flowState !== 'LISTENING') {
        setInterimCaption('');
      }
    };
    
    // Add event listeners
    window.addEventListener('speech:interim', handleInterimCaption as EventListener);
    const unsubscribeMicState = onState(handleMicStateChange);
    
    return () => {
      window.removeEventListener('speech:interim', handleInterimCaption as EventListener);
      unsubscribeMicState();
    };
  }, [flowState]); // Re-subscribe when flowState changes
   
  // Clear interim caption when flowState leaves LISTENING
  useEffect(() => {
    if (flowState !== 'LISTENING') {
      setInterimCaption('');
    }
  }, [flowState]);

  // Stuck state detection and debugging
  useEffect(() => {

    if (flowState === 'READING' && !isSpeaking) {
      // If we're in READING but not speaking for 3 seconds, transition to LISTENING
      const timer = setTimeout(() => {
        if (flowState === 'READING' && !isSpeaking) {
          forceToListening('stuck-reading-fallback');
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [flowState, isSpeaking, micState]);

  // Level-up detection: Show celebration modal when user levels up
  useEffect(() => {
    if (lastLevelUpTime && Date.now() - lastLevelUpTime < 1000) {
      // A level-up just occurred (within last second)
      setLevelUpValue(level);
      setShowLevelUpModal(true);
    }
  }, [lastLevelUpTime, level]);

  // 🔧 FIX #8: iOS audio session configuration - handle interruptions and visibility changes
  useEffect(() => {
    if (!isIOS) return; // Only needed for iOS

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden - pause TTS if speaking
        if (TTSManager.isSpeaking()) {
          TTSManager.stop();
        }
        // Suspend audio context to save resources
        if (audioContextRef.current && audioContextRef.current.state === 'running') {
          audioContextRef.current.suspend();
        }
      } else {
        // Page is visible - resume audio context if needed
        if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume().catch(() => {
            // Resume failed - may need user gesture
            setShowAudioUnlockPrompt(true);
          });
        }
      }
    };

    const handleAudioInterruption = () => {
      // Handle audio interruptions (phone calls, etc.)
      if (TTSManager.isSpeaking()) {
        TTSManager.stop();
      }
      if (micState === 'recording') {
        try {
          stopRecording();
        } catch (e) {
          // Ignore errors
        }
      }
    };

    // Listen for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Listen for audio interruptions (iOS Safari)
    window.addEventListener('pagehide', handleAudioInterruption);
    window.addEventListener('blur', handleAudioInterruption);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handleAudioInterruption);
      window.removeEventListener('blur', handleAudioInterruption);
    };
  }, [isIOS, micState]);

  // 🔧 FIX #12: Keyboard navigation support for accessibility
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case ' ':
        case 'Spacebar':
          e.preventDefault();
          // Space: Play/Pause/Resume
          if (flowState === 'IDLE') {
            const text = 'What would you like to talk about?';
            const messageKey = stableKeyFromText(text);
            setSpokenKeys(p => new Set([...p, messageKey]));
            setEphemeralAssistant({ key: messageKey, text });
            playAssistantOnce(text, messageKey);
          } else if (flowState === 'PAUSED') {
            if (pausedFrom === 'READING') {
              setFlowState('READING');
              setPausedFrom(null);
            } else if (pausedFrom === 'LISTENING') {
              setFlowState('LISTENING');
              setPausedFrom(null);
            }
          } else if (flowState === 'READING' || flowState === 'LISTENING' || flowState === 'PROCESSING') {
            setPausedFrom(flowState);
            setFlowState('PAUSED');
          }
          break;

        case 'Escape':
          e.preventDefault();
          // Escape: Stop/Reset
          if (flowState !== 'IDLE') {
            setFlowState('IDLE');
            setPausedFrom(null);
            if (TTSManager.isSpeaking()) {
              TTSManager.stop();
            }
          }
          break;

        case 'Enter':
          e.preventDefault();
          // Enter: Replay last message (when paused or idle)
          if (flowState === 'PAUSED' || flowState === 'IDLE') {
            const latestMessage = findLatestEligibleAssistantMessage();
            if (latestMessage && unreadAssistantExists()) {
              const messageKey = stableMessageKey(latestMessage.text, latestMessage.id);
              playAssistantOnce(latestMessage.text, messageKey);
            }
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [flowState, pausedFrom]);

  // 🔧 FIX #20: Global network status monitoring with user feedback
  useEffect(() => {
    const handleOnline = () => {
      toast({
        title: "Back online",
        description: "Your internet connection has been restored.",
        duration: 3000,
      });
    };

    const handleOffline = () => {
      toast({
        title: "You're offline",
        description: "Please check your internet connection.",
        variant: "destructive",
        duration: 5000,
      });

      // Pause any active TTS
      if (TTSManager.isSpeaking()) {
        TTSManager.stop();
      }

      // Reset to IDLE if in an active state
      if (flowState !== 'IDLE' && flowState !== 'PAUSED') {
        setFlowState('PAUSED');
        setPausedFrom(flowState);
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [flowState, toast]);

  // 🔧 FIX #1, #2, #3: Comprehensive cleanup on component unmount (prevents memory leaks)
  useEffect(() => {
    // Mark component as mounted
    isMountedRef.current = true;

    return () => {
      // 🔧 FIX #3: Mark component as unmounted to prevent setState
      isMountedRef.current = false;

      // Clear all pending timers
      ttsCompletionTimeouts.forEach(clearTimeout);
      micReopenTimeouts.forEach(clearTimeout);

      // Stop any active TTS
      if (TTSManager.isSpeaking()) {
        TTSManager.stop();
      }

      // Stop recording if active
      if (micState === 'recording') {
        try {
          stopRecording();
        } catch (e) {
          // Ignore errors during cleanup
        }
      }

      // 🔧 FIX #2: Close AudioContext to prevent memory leak
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
          audioContextRef.current = null;
        } catch (e) {
          // Ignore errors during cleanup
        }
      }

      // Release wake lock
      try {
        wakeLockManager.release();
      } catch (e) {
        // Ignore errors during cleanup
      }

      // Cleanup mic engine
      try {
        cleanup();
      } catch (e) {
        // Ignore errors during cleanup
      }
    };
  }, []); // Empty deps = run only on mount/unmount

  // Modern Floating Header - Minimal, Clean Design (No Background Container)
  const MobileHeader = () => {
    const formattedXP = useMemo(() => {
      return xp_current ? xp_current.toLocaleString() : "—";
    }, [xp_current]);

    // Get difficulty indicator data
    const difficultyData = useMemo(() => {
      switch (user_level) {
        case 'beginner':
          return { icon: '🌱', label: 'Beginner', color: 'from-green-500/20 to-green-600/10 border-green-500/50 text-green-50' };
        case 'intermediate':
          return { icon: '🔥', label: 'Intermediate', color: 'from-orange-500/20 to-orange-600/10 border-orange-500/50 text-orange-50' };
        case 'advanced':
          return { icon: '⭐', label: 'Advanced', color: 'from-purple-500/20 to-purple-600/10 border-purple-500/50 text-purple-50' };
        default:
          return { icon: '🌱', label: 'Beginner', color: 'from-green-500/20 to-green-600/10 border-green-500/50 text-green-50' };
      }
    }, [user_level]);

    return (
      <div className="fixed top-0 left-0 right-0 z-30 pointer-events-none">
        {/* Floating XP Display & Difficulty - Clean minimal header */}
        <div className="safe-top px-4 py-4 flex items-center justify-center gap-2 pointer-events-auto">
          <div className="px-4 py-2 rounded-full text-sm bg-white/15 text-white backdrop-blur-xl font-bold tracking-wide shadow-lg">
            ⚡ {formattedXP} XP
          </div>
          <div className={`px-3 py-1.5 rounded-full text-xs backdrop-blur-xl font-semibold tracking-wide shadow-lg border bg-gradient-to-br ${difficultyData.color}`}>
            {difficultyData.icon} {difficultyData.label}
          </div>
        </div>

        {/* Floating Avatar - Centered, No Container */}
        <div className="px-4 pt-6 flex flex-col items-center pointer-events-none">
          <div className="flex flex-col items-center gap-3">
            <div className="relative pointer-events-auto">
              {/* Floating Avatar Container - Dramatic shadow, no borders */}
              <div className={cn(
                "w-32 h-32 rounded-full relative transition-all duration-300",
                isSpeaking && "ring-4 ring-green-400/60 shadow-[0_0_40px_rgba(74,222,128,0.5)]",
                !isSpeaking && "shadow-[0_20px_60px_rgba(88,28,135,0.6)]"
              )}>
                {/* Animated Avatar */}
                <AnimatedAvatar isSpeaking={isSpeaking} className="w-full h-full" />

                {/* Animated Pulsing Rings - State-based */}
                {flowState === 'LISTENING' && (
                  <>
                    <div className="absolute -inset-3 rounded-full bg-green-400/30 animate-ping" style={{ animationDuration: '1.2s' }} />
                    <div className="absolute -inset-6 rounded-full bg-green-400/20 animate-ping" style={{ animationDuration: '1.8s' }} />
                    <div className="absolute -inset-9 rounded-full bg-green-400/10 animate-ping" style={{ animationDuration: '2.4s' }} />
                  </>
                )}
                {flowState === 'READING' && (
                  <>
                    <div className="absolute -inset-3 rounded-full bg-blue-400/30 animate-ping" style={{ animationDuration: '1.2s' }} />
                    <div className="absolute -inset-6 rounded-full bg-blue-400/20 animate-ping" style={{ animationDuration: '1.8s' }} />
                    <div className="absolute -inset-9 rounded-full bg-blue-400/10 animate-ping" style={{ animationDuration: '2.4s' }} />
                  </>
                )}
                {flowState === 'PROCESSING' && (
                  <>
                    <div className="absolute -inset-3 rounded-full bg-yellow-400/30 animate-ping" style={{ animationDuration: '1s' }} />
                    <div className="absolute -inset-6 rounded-full bg-yellow-400/20 animate-ping" style={{ animationDuration: '1.5s' }} />
                  </>
                )}
              </div>

              {/* Floating Status Indicator */}
              <div className={cn(
                "absolute bottom-1 right-1 w-7 h-7 rounded-full border-4 border-purple-900 flex items-center justify-center shadow-2xl transition-all duration-300",
                flowState === 'LISTENING' && 'bg-green-400 shadow-green-400/60 animate-pulse',
                flowState === 'READING' && 'bg-blue-400 shadow-blue-400/60 animate-pulse',
                flowState === 'PROCESSING' && 'bg-yellow-400 shadow-yellow-400/60 animate-pulse',
                flowState === 'IDLE' && 'bg-gray-400 shadow-gray-400/40',
                flowState === 'PAUSED' && 'bg-orange-400 shadow-orange-400/60'
              )}>
                <div className="w-3 h-3 rounded-full bg-white" />
              </div>
            </div>

            {/* Floating Name and Status Badge */}
            <div className="flex flex-col items-center gap-2 pointer-events-auto">
              <h2 className="text-white font-bold text-xl tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                Tomas AI
              </h2>
              <div
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-xl transition-all duration-300 shadow-lg",
                  flowState === 'LISTENING' && 'bg-green-400/25 text-green-50 shadow-green-400/30',
                  flowState === 'READING' && 'bg-blue-400/25 text-blue-50 shadow-blue-400/30',
                  flowState === 'PROCESSING' && 'bg-yellow-400/25 text-yellow-50 shadow-yellow-400/30',
                  flowState === 'PAUSED' && 'bg-orange-400/25 text-orange-50 shadow-orange-400/30',
                  flowState === 'IDLE' && 'bg-white/15 text-white/90 shadow-white/20'
                )}
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                {flowState === 'READING' ? '🗣️ Speaking...' :
                 flowState === 'LISTENING' ? '👂 Listening...' :
                 flowState === 'PROCESSING' ? '💭 Thinking...' :
                 flowState === 'PAUSED' ? '⏸️ Paused' :
                 '✨ Ready to chat'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Mobile-First Full-Screen Layout
  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Fixed Mobile Header */}
      <MobileHeader />

      {/* 🔧 FIX #7: iOS Audio Unlock Prompt - Prominent banner with clear CTA */}
      {showAudioUnlockPrompt && isIOS && (
        <div className="fixed top-20 left-4 right-4 z-50 animate-slide-in-up" role="alert" aria-live="assertive">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-2xl border-2 border-white/30 overflow-hidden">
            <div className="p-4 flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Volume2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-base mb-1">Enable Audio</h3>
                <p className="text-white/90 text-sm">Tap the button below to enable sound and start speaking practice</p>
              </div>
              <button
                onClick={async () => {
                  triggerHaptic('medium');
                  await enableAudioContext();
                }}
                className="flex-shrink-0 px-6 py-3 bg-white text-purple-600 rounded-full font-bold text-sm shadow-lg active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Enable audio for speaking practice"
              >
                Enable
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Scrollable Chat Area - adjusted for floating header */}
      <div className="flex-1 overflow-y-auto pt-[240px] pb-24 px-4 overscroll-behavior-contain">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <ChatBubble
                key={`${message.id}-${index}`}
                message={message.text}
                isUser={message.isUser}
              />
            ))}

            {/* Ephemeral ghost bubble */}
            {ephemeralAssistant && (
              <ChatBubble
                message={ephemeralAssistant.text}
                isUser={false}
                className="opacity-70"
              />
            )}

            {/* Live captions (Mobile optimized) */}
            {flowState === 'LISTENING' && interimCaption && (
              <div className="text-center py-2" role="status" aria-live="polite" aria-atomic="true">
                <div className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                  <span className="text-white/70 italic text-sm">"{interimCaption}"</span>
                </div>
              </div>
            )}

            {/* 🔧 FIX #11: Compact Grammar Corrections - Mobile Bottom Sheet Style with ARIA */}
            {grammarCorrections.length > 0 && (
              <div
                className="mt-3 p-3 rounded-2xl bg-gradient-to-br from-yellow-500/25 to-orange-500/15 border border-yellow-500/50 shadow-xl"
                style={{ animation: 'slideInUp 0.5s ease-out' }}
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                <div className="flex items-start gap-2">
                  <Star className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-yellow-200 mb-2">Grammar Tip ✨</h4>
                    {grammarCorrections.map((correction, index) => (
                      <div
                        key={index}
                        className="bg-black/20 p-2 rounded-lg border border-yellow-500/30 mb-2 last:mb-0"
                      >
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-red-300 line-through">{correction.originalPhrase}</span>
                          <span className="text-white/50">→</span>
                          <span className="text-green-300 font-semibold">{correction.correctedPhrase}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      {/* 🔧 FIX #12: Floating Action Button (FAB) - iPhone optimized with keyboard support */}
      <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
        <div className="safe-bottom pb-6 px-6 flex justify-center items-end gap-3">
          <button
            className="pointer-events-auto w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-2xl active:scale-95 transition-all duration-200 flex items-center justify-center relative focus:outline-none focus:ring-4 focus:ring-purple-400/50"
            style={{
              boxShadow: '0 10px 40px rgba(168, 85, 247, 0.4)'
            }}
            aria-label={
              flowState === 'IDLE' ? 'Start conversation' :
              flowState === 'PAUSED' ? 'Resume' :
              flowState === 'READING' || flowState === 'LISTENING' || flowState === 'PROCESSING' ? 'Pause' :
              'Conversation control'
            }
            onClick={async () => {
              triggerHaptic('light');
              if (flowState === 'IDLE') {
                const text = 'What would you like to talk about?';
                const messageKey = stableKeyFromText(text);
                setSpokenKeys(p => new Set([...p, messageKey]));
                setEphemeralAssistant({ key: messageKey, text });
                await playAssistantOnce(text, messageKey);
              } else if (flowState === 'PAUSED') {
                if (pausedFrom === 'READING') {
                  setFlowState('READING');
                  setPausedFrom(null);
                } else if (pausedFrom === 'LISTENING') {
                  setFlowState('LISTENING');
                  setPausedFrom(null);
                } else if (pausedFrom === 'PROCESSING') {
                  setFlowState('PROCESSING');
                  setPausedFrom(null);
                } else {
                  const latestMessage = findLatestEligibleAssistantMessage();
                  if (latestMessage && unreadAssistantExists()) {
                    const messageKey = stableMessageKey(latestMessage.text, latestMessage.id);
                    await playAssistantOnce(latestMessage.text, messageKey);
                  }
                }
              } else if (flowState === 'READING' || flowState === 'LISTENING' || flowState === 'PROCESSING') {
                setPausedFrom(flowState);
                setFlowState('PAUSED');
                if (TTSManager.isSpeaking()) {
                  TTSManager.stop();
                  setIsSpeaking(false);
                  setAvatarState('idle');
                }
                if (micState === 'recording') {
                  stopRecording();
                }
              }
            }}
          >
            {/* Pulsing ring when listening */}
            {flowState === 'LISTENING' && (
              <>
                <div className="absolute inset-0 rounded-full bg-green-400/30 animate-ping" style={{ animationDuration: '1.5s' }} />
                <div className="absolute inset-0 rounded-full bg-green-400/20 animate-ping" style={{ animationDuration: '2s' }} />
              </>
            )}

            {/* Icon */}
            {flowState === 'IDLE' ? <Play className="w-7 h-7" /> :
             flowState === 'PAUSED' ? <Play className="w-7 h-7" /> :
             flowState === 'LISTENING' ? <Mic className="w-7 h-7 animate-pulse" /> :
             <Pause className="w-7 h-7" />}
          </button>

          {/* Secondary menu button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="pointer-events-auto w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center"
                aria-label="More options"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-black/95 backdrop-blur-xl border-white/20 text-white mb-2 mr-4"
              align="end"
            >
              <DropdownMenuItem
                onClick={toggleSpeakingSound}
                className="hover:bg-white/10 focus:bg-white/10"
              >
                {speakingSoundEnabled ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
                {speakingSoundEnabled ? 'Mute' : 'Unmute'}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/20" />
              <DropdownMenuItem
                onClick={async () => {
                  const latestMessage = findLatestEligibleAssistantMessage();
                  if (latestMessage) {
                    const messageKey = stableMessageKey(latestMessage.text, latestMessage.id);
                    await playAssistantOnce(latestMessage.text, messageKey);
                  }
                }}
                className="hover:bg-white/10 focus:bg-white/10"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Repeat
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/20" />
              <DropdownMenuItem
                onClick={() => {
                  setFlowState('IDLE');
                  setMessages([]);
                  setEphemeralAssistant(null);
                  setCurrentTurnToken('');
                  setGrammarCorrections([]);
                  if (TTSManager.isSpeaking()) {
                    TTSManager.stop();
                    setIsSpeaking(false);
                    setAvatarState('idle');
                  }
                  if (micState === 'recording') {
                    stopRecording();
                  }
                }}
                className="hover:bg-white/10 focus:bg-white/10 text-red-400"
              >
                <Square className="w-4 h-4 mr-2" />
                End Chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Error Toast - Mobile optimized */}
      {errorMessage && (
        <div className="fixed bottom-32 left-4 right-4 z-50 animate-slide-in-up">
          <div className="bg-red-500/90 backdrop-blur-sm text-white px-4 py-3 rounded-xl shadow-2xl text-center text-sm">
            {errorMessage}
          </div>
        </div>
      )}

      {/* Floating XP Gain Animation */}
      {floatingXP !== null && (
        <FloatingXP
          amount={floatingXP}
          onComplete={() => setFloatingXP(null)}
        />
      )}

      {/* Level Up Celebration Modal */}
      {showLevelUpModal && levelUpValue && (
        <LevelUpModal
          level={levelUpValue}
          onClose={() => {
            setShowLevelUpModal(false);
            resetLevelUpNotification();
          }}
        />
      )}
    </div>
  );
}
