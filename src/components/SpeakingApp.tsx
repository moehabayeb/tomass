import { useState, useEffect, useMemo } from 'react';
import { Mic, Volume2 } from 'lucide-react';
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

// Feature flags
const SPEAKING_HANDS_FREE = false; // Default OFF
const HF_BARGE_IN = false; // Barge-in feature flag (optional)

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
  
  const { level, xp_current, next_threshold, awardXp, lastLevelUpTime, fetchProgress, resetLevelUpNotification, subscribeToProgress } = useProgressStore();
  
  const [messages, setMessages] = useState([
    { text: "Hello! Ready to practice today? Let's start with a simple question.", isUser: false, isSystem: false, id: 'initial-1', role: 'assistant', content: "Hello! Ready to practice today? Let's start with a simple question." }
  ]);

  // Convert messages for TTS
  const ttsMessages = messages.map(m => ({ 
    id: m.id || `msg-${Date.now()}`, 
    role: m.isUser ? 'user' : 'assistant', 
    content: m.text 
  })) as Array<{ id: string; role: 'user' | 'assistant'; content: string }>;
  
  const [soundEnabled, setSoundEnabled] = useState(false);
  const { isSpeaking, toggleSound: handleToggleSound, stopSpeaking, clearHistory: clearSpeechHistory } = useSpeakingTTS(ttsMessages, soundEnabled);
  
  const toggleSound = () => {
    const newEnabled = handleToggleSound();
    setSoundEnabled(newEnabled);
  };
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
    // Load from localStorage on initialization
    const saved = localStorage.getItem('hfEnabled');
    return saved === 'true';
  });
  const [hfActive, setHfActive] = useState(false);
  const [hfStatus, setHfStatus] = useState<'idle' | 'prompting' | 'listening' | 'processing'>('idle');
  const [hfNoInputTimer, setHfNoInputTimer] = useState<NodeJS.Timeout | null>(null);
  const [hfRePromptTimer, setHfRePromptTimer] = useState<NodeJS.Timeout | null>(null);
  const [hfIsReprompting, setHfIsReprompting] = useState(false);
  const [hfAutoPaused, setHfAutoPaused] = useState(false);
  
  // Persist hfEnabled to localStorage
  useEffect(() => {
    localStorage.setItem('hfEnabled', hfEnabled.toString());
  }, [hfEnabled]);
  
  // Check for hands-free mode availability (feature flag OR query param ?hf=1)
  const isHandsFreeModeAvailable = useMemo(() => {
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
    
    console.log('HF gate: off | reason: flag off & no param');
    return false;
  }, []);
  
  // Avatar state is now managed by useAvatarTTS hook
  
  // Subscribe to micEngine state changes
  useEffect(() => {
    const unsubscribe = onState((newState) => {
      console.log('[Speaking] micEngine state change:', newState);
      setMicState(newState);
      
      // Clear errors when transitioning out of idle
      if (newState !== 'idle') {
        setErrorMessage('');
      }
    });
    
    return unsubscribe;
  }, []);

  // Handle avatar state based on TTS speaking
  useEffect(() => {
    if (isSpeaking) {
      setAvatarState('talking'); // Use correct avatar state for speaking
    } else {
      setAvatarState('idle');
    }
  }, [isSpeaking, setAvatarState]);

  // Clean up speech history when starting new conversation
  useEffect(() => {
    clearSpeechHistory();
  }, []);

  // Helper function to add chat bubbles with proper message structure
  const addChatBubble = (text: string, type: "user" | "bot" | "system") => {
    const messageId = `msg-${Date.now()}-${Math.random()}`;
    const newMessage = {
      text,
      isUser: type === "user",
      isSystem: type === "system",
      id: messageId,
      role: type === "user" ? "user" : "assistant",
      content: text
    };
    
    setMessages(prev => [...prev, newMessage]);
    setLastMessageTime(Date.now());
    return messageId;
  };

  // Enhanced bot message function - immediate TTS trigger
  const showBotMessage = async (message: string) => {
    console.log('[Speaking] Adding bot message:', message.substring(0, 50) + '...');
    const messageId = addChatBubble(message, "bot");
    
    // Trigger TTS immediately if sound is enabled
    if (soundEnabled) {
      console.log('[Speaking] Triggering immediate TTS for message:', messageId);
      try {
        const { SimpleTTS } = await import('@/voice/SimpleTTS');
        await SimpleTTS.speak(message, messageId);
      } catch (error) {
        console.warn('[Speaking] Failed to speak message immediately:', error);
      }
    }
  };

  // Initialize component and progress store
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("chatHistory") || "[]");
    setHistory(savedHistory);
    
    // Fetch initial progress
    if (user) {
      fetchProgress();
    }
    
    // Cleanup on unmount
    return () => {
      cleanup();
    };
  }, [user]);

  // Handle initial message from props (bookmarks) - avoid duplicate
  useEffect(() => {
    if (initialMessage) {
      console.log('Adding continued message from bookmark:', initialMessage.substring(0, 50) + '...');
      const question = "Let's continue our conversation from here! What would you like to say about this?";
      setCurrentQuestion(question);
      // Use showBotMessage to ensure TTS is triggered
      setTimeout(() => {
        showBotMessage(question);
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

      // Step 3: Handle distress signals immediately
      if (intent === 'distress_signal') {
        console.log('[Speaking] distress signal detected - providing crisis support');
        showBotMessage(crisisResponse);
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
          showBotMessage(smallTalkResponse.data.response);
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

        // Show correction only if there's an actual mistake
        if (!feedback.isCorrect && feedback.message !== 'CORRECT') {
          showBotMessage(feedback.message);
        }

        // Generate and speak follow-up question naturally
        const nextQuestion = await generateFollowUpQuestion(originalTranscript);
        console.log('[Speaking] teacher-loop:next-question generated');
        
        showBotMessage(nextQuestion);

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

  // Hands-Free Mode handlers - Full orchestration
  const [hfPermissionBlocked, setHfPermissionBlocked] = useState(false);
  const [hfCurrentPrompt, setHfCurrentPrompt] = useState('');
  const [hfSessionActive, setHfSessionActive] = useState(false);
  const [hfTabVisible, setHfTabVisible] = useState(true);
  const [hfShowResume, setHfShowResume] = useState(false);
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
      // Auto-start the hands-free loop
      console.log('HF_AUTO_START: toggle enabled');
      setTimeout(() => handleHandsFreeStart(), 100); // Small delay to ensure state is stable
    }
  }, [hfEnabled, isHandsFreeModeAvailable]);

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
    };
  }, [hfNoInputTimer, hfRePromptTimer]);

  // Auto-advance after scoring completes in hands-free mode
  const handleHandsFreeAdvance = async () => {
    if (!hfActive || !hfSessionActive) return;
    
    console.log('HF_ADVANCE');
    
    // Small delay to let user process the feedback
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Get the latest AI message as the next prompt
    const lastAIMessage = messages.filter(m => !m.isUser && !m.isSystem).pop();
    const nextPrompt = lastAIMessage?.text || currentQuestion;
    
    if (nextPrompt && nextPrompt !== hfCurrentPrompt) {
      setHfCurrentPrompt(nextPrompt);
      
      try {
        // Continue the hands-free loop with the new prompt
        await startHandsFreePromptPlayback(nextPrompt);
      } catch (error: any) {
        console.log('HF_ERROR_ADVANCE:', error.message);
        setErrorMessage(error.message);
        setHfActive(false);
        setHfStatus('idle');
        setHfSessionActive(false);
      }
    } else {
      // No new prompt or same prompt - end session
      console.log('HF_SESSION_END: no new prompt');
      setHfActive(false);
      setHfStatus('idle');
      setHfSessionActive(false);
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
        await startHandsFreePromptPlayback(hfCurrentPrompt);
      } catch (error: any) {
        console.log('HF_ERROR_RESUME:', error.message);
        setErrorMessage(error.message);
      }
    }
  };
  
  const handleHandsFreeStart = async () => {
    // Prevent duplicate starts
    if (hfActive) return;
    
    console.log('HF_START');
    setHfActive(true);
    setHfSessionActive(true); // Start session
    setHfStatus('idle');
    setHfPermissionBlocked(false);
    setErrorMessage(''); // Clear any previous errors
    
    // Get the last AI message as the current prompt
    const lastAIMessage = messages.filter(m => !m.isUser && !m.isSystem).pop();
    const prompt = lastAIMessage?.text || currentQuestion;
    setHfCurrentPrompt(prompt);
    
    try {
      await startHandsFreePromptPlayback(prompt);
    } catch (error: any) {
      console.log('HF_ERROR_START:', error.message);
      setErrorMessage(error.message);
      setHfActive(false);
      setHfSessionActive(false);
      setHfStatus('idle');
    }
  };

  const startHandsFreePromptPlayback = async (prompt: string) => {
    if (!soundEnabled) {
      // Skip TTS if sound is off, go straight to mic
      console.log('HF_PROMPT_SKIP: sound disabled');
      setHfStatus('prompting'); // Show status briefly
      await new Promise(resolve => setTimeout(resolve, 500)); // Brief pause
      await startHandsFreeMicCapture();
      return;
    }

    console.log('HF_PROMPT_PLAY:', prompt.length);
    setHfStatus('prompting');
    
    // Setup barge-in detection if feature is enabled
    let bargeInDetected = false;
    let bargeInListener: (() => void) | null = null;
    
    if (HF_BARGE_IN) {
      // Setup voice activity detection during TTS
      bargeInListener = () => {
        if (!bargeInDetected && hfStatus === 'prompting') {
          console.log('HF_BARGE_IN: user voice detected during TTS');
          bargeInDetected = true;
          
          // Stop TTS early
          if (TTSManager.busy) {
            TTSManager.stop();
          }
          
          // Transition to listening immediately
          setTimeout(() => {
            if (hfActive && hfStatus === 'prompting') {
              startHandsFreeMicCapture();
            }
          }, 200);
        }
      };
      
      // Listen for voice activity events (if available)
      window.addEventListener('voice:activity:start', bargeInListener);
    }
    
    try {
      // Use TTSManager for complete prompt playback
      await TTSManager.speak(prompt, { 
        canSkip: true
      });
      
      console.log('HF_TTS_COMPLETE');
      
      // Clean up barge-in listener
      if (bargeInListener) {
        window.removeEventListener('voice:activity:start', bargeInListener);
      }
      
      // Only continue if barge-in didn't interrupt
      if (!bargeInDetected) {
        // Small delay before opening mic to prevent jarring transition
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Only start mic after TTS is completely done
        await startHandsFreeMicCapture();
      }
      
    } catch (error: any) {
      console.log('HF_ERROR_TTS:', error.message);
      
      // Clean up barge-in listener on error
      if (bargeInListener) {
        window.removeEventListener('voice:activity:start', bargeInListener);
      }
      
      throw error;
    }
  };

  const startHandsFreeMicCapture = async () => {
    console.log('HF_MIC_OPEN');
    setHfStatus('listening');
    setHfIsReprompting(false);
    setHfAutoPaused(false);
    
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
        console.log('HF_AUTO_PAUSE: no input after 12s total');
        
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
      const result = await startRecording();
      
      // Clear timers since we got input
      if (hfNoInputTimer) clearTimeout(hfNoInputTimer);
      if (hfRePromptTimer) clearTimeout(hfRePromptTimer);
      
      console.log('HF_RESULT_FINAL:', result.transcript.length);
      
      setHfStatus('processing');
      
      // Display verbatim transcript (exact ASR output)
      addChatBubble(`💭 You said: "${result.transcript}"`, "user");
      
      if (!result.transcript) {
        setErrorMessage("No speech detected, please try again.");
        setHfActive(false);
        setHfStatus('idle');
        setHfSessionActive(false);
        return;
      }
      
      // Check if user said "resume" to resume paused session
      if (hfAutoPaused && result.transcript.toLowerCase().includes('resume')) {
        console.log('HF_VOICE_RESUME: user said resume');
        setHfAutoPaused(false);
        setErrorMessage('');
        // Continue with current prompt
        await startHandsFreePromptPlayback(hfCurrentPrompt);
        return;
      }
      
      // Execute existing teacher loop (unchanged)
      await executeTeacherLoop(result.transcript);
      
      // Auto-advance handled by useEffect watching for new messages
      
    } catch (error: any) {
      console.log('HF_ERROR_MIC:', error.message);
      
      // Clear timers on error
      if (hfNoInputTimer) clearTimeout(hfNoInputTimer);
      if (hfRePromptTimer) clearTimeout(hfRePromptTimer);
      
      // Check if it's a permission issue
      if (error.message.includes('permission') || error.message.includes('NotAllowedError')) {
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
    
    // Hold at idle on same prompt
    setHfStatus('idle');
    setHfIsReprompting(false);
  };

  const handleHandsFreeRepeat = async () => {
    console.log('HF_REPEAT');
    
    // Stop any current activity
    if (TTSManager.busy) {
      TTSManager.stop();
    }
    if (micState === 'recording') {
      stopRecording();
    }
    
    // Replay current prompt
    if (hfCurrentPrompt) {
      try {
        await startHandsFreePromptPlayback(hfCurrentPrompt);
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

  const handleRecordingClick = async () => {
    if (micState === 'idle') {
      // Start recording
      console.log('[Speaking] recording:start-button-click');
      setErrorMessage('');
      
      try {
        const result = await startRecording();
        console.log('[Speaking] recording:completed, transcript:', result.transcript);
        
        // Display verbatim transcript (exact ASR output)
        addChatBubble(`💭 You said: "${result.transcript}"`, "user");
        
        if (!result.transcript) {
          setErrorMessage("No speech detected, please try again.");
          return;
        }
        
        // Execute teacher loop
        await executeTeacherLoop(result.transcript);

      } catch (error: any) {
        console.error('[Speaking] recording:error', error);
        setErrorMessage(error.message);
      }
    } else if (micState === 'recording') {
      // Stop recording
      console.log('[Speaking] recording:stop-button-click');
      stopRecording();
    }
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
        <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-6 sm:mb-8 overflow-y-auto min-h-[280px] max-h-[320px] space-y-2 relative z-10">
          <div className="text-center mb-4">
            <span className="text-white/80 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">💬 Conversation</span>
          </div>
          {messages.map((message, index) => (
            <ChatBubble 
              key={message.id || index}
              message={message.text} 
              isUser={message.isUser}
              className={message.isSystem ? "opacity-75 italic" : ""}
            />
          ))}
        </div>

        {/* Premium Speaking Button */}
        <div className="flex flex-col items-center space-y-4 sm:space-y-6 pb-6 sm:pb-8 relative z-10">
          {/* Hands-Free Mode Toggle (only when available) */}
          {isHandsFreeModeAvailable && (
            <div className="flex items-center gap-3 mb-2">
              <span className="text-white/80 text-sm font-medium">Hands-Free (beta)</span>
              <Switch
                checked={hfEnabled}
                onCheckedChange={setHfEnabled}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          )}
          
          {/* Hide the big Start Speaking button when hands-free is enabled */}
          {!hfEnabled && (
            <Button
              onClick={handleRecordingClick}
              disabled={micState === 'processing' || isProcessingTranscript}
              className={`pill-button w-full max-w-sm py-6 sm:py-8 text-lg sm:text-xl font-bold border-0 shadow-xl min-h-[64px] ${micState === 'recording' ? 'animate-pulse' : ''}`}
              size="lg"
              style={{
                background: micState === 'recording' 
                  ? 'linear-gradient(135deg, #ff4f80, #ff6b9d, #c084fc)' 
                  : 'linear-gradient(135deg, #ff4f80, #ff6b9d)',
                color: 'white',
                boxShadow: micState === 'recording' 
                  ? '0 0 60px rgba(255, 79, 128, 0.6), 0 8px 32px rgba(255, 107, 157, 0.4)' 
                  : '0 8px 32px rgba(255, 79, 128, 0.3), 0 4px 16px rgba(255, 107, 157, 0.2)',
              }}
            >
              <div className="flex items-center gap-3">
                {micState === 'recording' ? "🎙️" : 
                 (micState === 'processing' || isProcessingTranscript) ? "⏳" : "🎤"}
                <span className="drop-shadow-sm">
                  {micState === 'recording' ? "Recording... (tap to stop)" : 
                   micState === 'processing' ? "Processing..." : 
                   isProcessingTranscript ? "Thinking..." :
                   "Start Speaking"}
                </span>
              </div>
            </Button>
          )}

          {/* Hands-Free Control Bar (only when active) */}
          {hfEnabled && hfActive && (
            <div className="glass-card rounded-xl p-3 w-full max-w-sm">
              <div className="flex items-center justify-between gap-2">
                <Button
                  onClick={handleHandsFreePause}
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white hover:bg-white/10 focus:ring-2 focus:ring-white/30 focus:outline-none text-xs transition-all duration-200"
                  aria-label="Pause hands-free session"
                  title="Pause hands-free session"
                >
                  Pause
                </Button>
                <span className="text-white/60 text-xs">•</span>
                <Button
                  onClick={handleHandsFreeRepeat}
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white hover:bg-white/10 focus:ring-2 focus:ring-white/30 focus:outline-none text-xs transition-all duration-200"
                  aria-label="Repeat current prompt"
                  title="Repeat current prompt"
                >
                  Repeat
                </Button>
                <span className="text-white/60 text-xs">•</span>
                <Button
                  onClick={handleHandsFreeStop}
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white hover:bg-white/10 focus:ring-2 focus:ring-white/30 focus:outline-none text-xs transition-all duration-200"
                  aria-label="Stop hands-free session"
                  title="Stop hands-free session"
                >
                  Stop
                </Button>
              </div>
            </div>
          )}

          {/* Hands-Free Status Chip (only when active) */}
          {hfEnabled && hfActive && (
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-white/80 text-xs font-medium">
              {hfStatus === 'prompting' && (hfIsReprompting ? '🔄 Re-prompting...' : '📖 Reading...')}
              {hfStatus === 'listening' && '👂 Listening...'}
              {hfStatus === 'processing' && '🧠 Processing...'}
              {hfStatus === 'idle' && (hfAutoPaused ? '⏸️ Auto-paused' : '⏸️ Ready')}
            </div>
          )}

          {/* Resume Button (only when needed after backgrounding or auto-pause) */}
          {(hfShowResume || hfAutoPaused) && (
            <div className="bg-blue-500/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-blue-400/30 text-center">
              <p className="text-blue-200 text-sm font-medium mb-2">
                {hfShowResume ? '🔄 Session paused while tab was in background' : 
                 hfAutoPaused ? '⏸️ Paused due to no input' : ''}
              </p>
              <Button
                onClick={handleHandsFreeResume}
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 text-white text-xs"
              >
                Resume Hands-Free
              </Button>
            </div>
          )}

          {/* Permission Blocked Nudge (only when needed) */}
          {hfPermissionBlocked && (
            <div className="bg-orange-500/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-orange-400/30 text-center">
              <p className="text-orange-200 text-sm font-medium mb-2">
                🎤 Microphone access needed
              </p>
              <Button
                onClick={handlePermissionUnblock}
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

          {/* Premium Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <div 
              className="pill-button glass-card glass-card-hover flex items-center gap-3 px-5 py-3 cursor-pointer border border-white/20"
              onClick={toggleSound}
            >
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span className="text-white font-medium text-sm sm:text-base drop-shadow-sm">
                Sound {soundEnabled ? 'ON' : 'OFF'}
              </span>
            </div>
            
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
        </div>

        {/* Token overlay for XP animations */}
        <TokenOverlay soundEnabled={soundEnabled} />
      </div>
    </div>
  );
}