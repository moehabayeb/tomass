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
    console.log('HF_SOUND', { enabled, resumed });
    return { enabled, resumed };
  };

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
      console.warn('HF_SOUND: Failed to enable AudioContext:', error);
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

  // Helper function to generate turn token (authoritative current turn)
  const generateTurnToken = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    const token = `turn-${timestamp}-${random}`;
    console.log('HF_TURN_TOKEN_GENERATED:', token);
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
      console.log('HF_ADVANCE: stopping TTS for new turn');
      TTSManager.stop();
      setIsSpeaking(false);
      setAvatarState('idle');
    }
    
    // Stop recording if active
    if (micState === 'recording') {
      console.log('HF_ADVANCE: stopping recording for new turn');
      stopRecording();
    }
  };

  // 2) When starting a turn, always pass a token and always call completion
  const startNewTurn = () => {
    const tok = `turn-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`;
    cancelOldListeners();
    setCurrentTurnToken(tok);
    setReplayCounter(0);
    setFlowState('IDLE');
    console.log('HF_NEW_TURN', { newToken: tok });
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
      if (!resolved) console.warn('HF_TTS_WATCHDOG: forcing completion');
    }, 12000);

    try {
      if (enabled) {
        await TTSManager.speak(text, { canSkip: false }).finally(() => {
          resolved = true; 
          clearTimeout(watchdog);
        });
      } else {
        console.log('HF_PROMPT_SKIP (muted)');
        resolved = true; 
        clearTimeout(watchdog);
      }
    } catch (e) {
      console.warn('HF_TTS_ERROR', e); 
      resolved = true; 
      clearTimeout(watchdog);
    } finally {
      await handleTTSCompletion(token);   // ← ALWAYS
    }
  };

  // Append user/assistant messages (unified with sequence counter)
  const addChatBubble = (text: string, type: "user" | "bot" | "system", messageId?: string, messageKey?: string) => {
    const seq = messageSeqCounter;
    setMessageSeqCounter(prev => prev + 1);
    
    const id = messageId || `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newMessage = {
      id,
      text: text.trim(),
      isUser: type === "user",
      isSystem: type === "system",
      role: type === "user" ? "user" as const : "assistant" as const,
      content: text.trim(),
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

  // 5) Append one user bubble on FINAL and move to PROCESSING
  const onUserFinalTranscript = (finalText: string, token: string) => {
    if (!finalText.trim() || token !== currentTurnToken) return;
    addChatBubble(finalText, 'user');     // restored
    setFlowState('PROCESSING');
    // existing evaluator/save path continues as before
  };

  // 3) Completion: always go to LISTENING and open mic (no HF gate)
  const handleTTSCompletion = async (token: string) => {
    if (!token || token !== currentTurnToken) { 
      console.log('HF_TTS_COMPLETE_STALE'); 
      return; 
    }
    setFlowState('LISTENING');             // move state first to avoid races
    await startHandsFreeMicCapture({ token });
  };

  // 3) Mic opener: be idempotent, don't pre-require LISTENING, append one user bubble, call evaluator
  const startHandsFreeMicCapture = async ({ token }: { token?: string } = {}) => {
    const tok = token ?? currentTurnToken ?? startNewTurn();

    // Normalize state and clear leftovers
    if (flowState !== 'LISTENING') setFlowState('LISTENING');
    if (TTSManager.isSpeaking()) return; // one voice at a time
    if (!tok) return;

    console.log('HF_MIC_OPEN', { turnToken: tok, state: flowState });
    
    try { 
      cleanup(); 
    } catch {}

    console.log('HF_LISTENING_EARCON');
    
    try {
      const result = await startRecording();      // existing micEngine
      const final = (result?.transcript || '').trim();

      if (final) {
        addChatBubble(final, 'user');             // ← show user text again
        setFlowState('PROCESSING');               // mic closed now
        await executeTeacherLoop(final);          // ← existing evaluator/teacher loop
        // message observer will notice the new assistant bubble and speak it
      } else {
        // Nothing captured: gently resume listening or auto-pause per your existing policy
        setFlowState('LISTENING');
        await startHandsFreeMicCapture({ token: tok });
      }
    } catch (err: any) {
      console.warn('HF_MIC_ERROR', err);
      setFlowState('PAUSED');                     // safe fallback
    }
  };

  // Mock executeTeacherLoop function for this demo
  const executeTeacherLoop = async (transcript: string) => {
    console.log('Executing teacher loop with transcript:', transcript);
    // This would normally contain the actual teacher loop logic
  };

  // Mascot Header Component  
  const MascotHeader = () => {
    const { level, xp_current, next_threshold } = useProgressStore();
    
    // Format XP with thousands separator
    const formatXP = (xp: number) => {
      return xp ? xp.toLocaleString() : "—";
    };
    
    return (
      <div className="mx-auto mt-6 flex flex-col items-center gap-2" style={{ zIndex: 10 }}>
        {/* Avatar */}
        <div 
          className="h-24 w-24 rounded-full ring-2 ring-white/20 shadow-lg relative"
          role="img"
          aria-label="Tutor avatar"
        >
          <DIDAvatar 
            className={cn(
              "w-full h-full rounded-full object-cover transition-all duration-300",
              isSpeaking && "ring-4 ring-primary/50 shadow-glow"
            )}
          />
        </div>
        
        {/* XP Chip */}
        <div className="px-3 py-1 rounded-full text-sm bg-white/10 text-white/90 backdrop-blur-sm">
          XP: {formatXP(xp_current)}
        </div>
      </div>
    );
  };

  // Component return with locked minimal UI
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="w-full max-w-4xl mx-auto space-y-6">
        
        {/* Mascot Header */}
        <MascotHeader />
        
        {/* Chat messages container */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 min-h-[400px] max-h-[500px] overflow-y-auto">
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
            
            {/* Live captions */}
            {flowState === 'LISTENING' && interimCaption && (
              <div className="text-white/60 italic text-sm text-center">
                "{interimCaption}"
              </div>
            )}
          </div>
        </div>

        {/* Status chip under conversation */}
        <div className="text-center">
          <div 
            className="hf-status-chip inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm"
            aria-live="polite"
          >
            <div className={`w-3 h-3 rounded-full ${
              flowState === 'READING' ? 'bg-blue-400 animate-pulse' :
              flowState === 'LISTENING' ? 'bg-green-400 animate-pulse' :
              flowState === 'PROCESSING' ? 'bg-yellow-400 animate-pulse' :
              flowState === 'PAUSED' ? 'bg-orange-400' :
              'bg-gray-400'
            }`} />
            <span className="text-white text-sm">
              {flowState === 'READING' ? 'Reading…' :
               flowState === 'LISTENING' ? 'Listening…' :
               flowState === 'PROCESSING' ? 'Thinking…' :
               flowState === 'PAUSED' ? 'Paused' :
               'Ready'}
            </span>
          </div>
        </div>

        {/* Primary control (always mounted, opacity for hide/reveal) */}
        <div className="flex justify-center items-center gap-4">
          <Button
            className="hf-primary w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
            onClick={async () => {
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
                  // Resume from where we left off
                  const latestMessage = findLatestEligibleAssistantMessage();
                  if (latestMessage && unreadAssistantExists()) {
                    const messageKey = stableMessageKey(latestMessage.text, latestMessage.id);
                    await playAssistantOnce(latestMessage.text, messageKey);
                  }
                }
              } else if (flowState === 'READING' || flowState === 'LISTENING' || flowState === 'PROCESSING') {
                // Pause current state
                setPausedFrom(flowState);
                setFlowState('PAUSED');
                
                // Stop TTS if speaking
                if (TTSManager.isSpeaking()) {
                  TTSManager.stop();
                  setIsSpeaking(false);
                  setAvatarState('idle');
                }
                
                // Stop mic if listening
                if (micState === 'recording') {
                  stopRecording();
                }
              }
            }}
          >
            {flowState === 'IDLE' ? <Play className="w-6 h-6" /> :
             flowState === 'PAUSED' ? <Play className="w-6 h-6" /> :
             <Pause className="w-6 h-6" />}
          </Button>

          {/* Overflow menu (optional) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hf-overflow text-white/60 hover:text-white hover:bg-white/10">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/90 backdrop-blur-sm border-white/20 text-white">
              <DropdownMenuItem 
                onClick={async () => {
                  // Again - replay current message
                  const latestMessage = findLatestEligibleAssistantMessage();
                  if (latestMessage) {
                    const messageKey = stableMessageKey(latestMessage.text, latestMessage.id);
                    await playAssistantOnce(latestMessage.text, messageKey);
                  }
                }}
                className="hover:bg-white/10 focus:bg-white/10"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Again
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/20" />
              <DropdownMenuItem 
                onClick={() => {
                  setFlowState('IDLE');
                  setMessages([]);
                  setEphemeralAssistant(null);
                  setCurrentTurnToken('');
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
                End
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Sound toggle (speaker icon only - in top bar semantically) */}
        <div className="flex justify-center">
          <button
            onClick={toggleSpeakingSound}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
          >
            {speakingSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-red-500/20 text-red-300 rounded-lg backdrop-blur-sm">
              {errorMessage}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
