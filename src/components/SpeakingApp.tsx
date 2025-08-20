import { useState, useEffect } from 'react';
import { Mic, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DIDAvatar from './DIDAvatar';
import { useAvatarState } from '@/hooks/useAvatarState';
import { supabase } from '@/integrations/supabase/client';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useStreakTracker } from '@/hooks/useStreakTracker';
import { useBadgeSystem } from '@/hooks/useBadgeSystem';
import { useProgressStore } from '@/hooks/useProgressStore';
import { useXPBoostStore } from '@/hooks/useXPBoostStore';
import { XPBoostAnimation } from './XPBoostAnimation';
import { useAuthReady } from '@/hooks/useAuthReady';
import { StreakCounter } from './StreakCounter';
import { SampleAnswerButton } from './SampleAnswerButton';
import BookmarkButton from './BookmarkButton';
import { startRecording, stopRecording, getState, onState, cleanup, type MicState } from '@/lib/audio/micEngine';
import { useToast } from '@/hooks/use-toast';

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
  const { speak, stopSpeaking, toggleSound, isSpeaking, soundEnabled } = useTextToSpeech();
  const [didAvatarRef, setDIDAvatarRef] = useState<any>(null);
  const { streakData, getStreakMessage } = useStreakTracker();
  const { incrementSpeakingSubmissions } = useBadgeSystem();
  const { user } = useAuthReady();
  const { toast } = useToast();
  
  const { level, xp_current, next_threshold, awardXp, lastLevelUpTime, fetchProgress, resetLevelUpNotification, subscribeToProgress } = useProgressStore();
  const { addBoost } = useXPBoostStore();
  
  const [messages, setMessages] = useState([
    { text: "Hello! Ready to practice today? Let's start with a simple question.", isUser: false, isSystem: false }
  ]);
  const [micState, setMicState] = useState<MicState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [history, setHistory] = useState<Array<{input: string; corrected: string; time: string}>>([]);
  const [currentQuestion, setCurrentQuestion] = useState("What did you have for lunch today?");
  const [conversationContext, setConversationContext] = useState("");
  const [userLevel, setUserLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [isProcessingTranscript, setIsProcessingTranscript] = useState(false);
  const [lastTranscript, setLastTranscript] = useState<string>('');
  
  // Avatar state management
  const [lastMessageTime, setLastMessageTime] = useState<number>();
  const isRecording = micState === 'recording';
  const isProcessing = micState === 'processing' || isProcessingTranscript;
  const { avatarState } = useAvatarState({
    isRecording,
    isSpeaking,
    isProcessing,
    lastMessageTime
  });
  
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

  // Initialize component and progress store
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("chatHistory") || "[]");
    setHistory(savedHistory);

    // Ask initial question
    speak(currentQuestion);
    
    // Fetch initial progress
    if (user) {
      fetchProgress();
    }
    
    // Cleanup on unmount
    return () => {
      cleanup();
    };
  }, [user]);

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

  // Handle initial message from bookmarks
  useEffect(() => {
    if (initialMessage) {
      addChatBubble(`💬 Continuing from: "${initialMessage}"`, "system");
      const question = "Let's continue our conversation from here! What would you like to say about this?";
      setCurrentQuestion(question);
      addChatBubble(question, "bot");
    }
  }, [initialMessage]);

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

  const addChatBubble = (text: string, type: "user" | "bot" | "system") => {
    const newMessage = { 
      text, 
      isUser: type === "user",
      isSystem: type === "system"
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Update avatar state based on message type
    if (type === "bot") {
      setLastMessageTime(Date.now());
    }
  };


  // Helper function to send text for grammar feedback
  const sendToFeedback = async (text: string): Promise<{ message: string; corrected: string; isCorrect: boolean }> => {
    const feedbackRes = await supabase.functions.invoke('feedback', {
      body: { text }
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

  // Helper function to display bot messages with text-to-speech
  const showBotMessage = async (message: string) => {
    console.log('[Speaking] tts:start -', message.substring(0, 50) + '...');
    addChatBubble(message, "bot");
    
    if (soundEnabled) {
      // Try to use D-ID avatar first, fallback to browser TTS
      if ((window as any).avatarSpeak && typeof (window as any).avatarSpeak === 'function') {
        try {
          console.log('Using D-ID avatar for speech:', message.substring(0, 50) + '...');
          await (window as any).avatarSpeak(message);
        } catch (error) {
          console.error('D-ID avatar speak failed, falling back to browser TTS:', error);
          speak(message);
        }
      } else {
        console.log('D-ID avatar not available, using browser TTS');
        speak(message);
      }
    }
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
            context: conversationContext
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
          
          // Trigger XP boost animation
          addBoost(xp, complexity === 'complex' ? '🏆 Great!' : complexity === 'medium' ? '👏 Nice!' : '✨ Good!');
          
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
          {/* XP Boost Animation positioned in top-right */}
          <XPBoostAnimation />
          <div className="relative inline-block mb-4">
            <DIDAvatar 
              size="lg"
              state={avatarState}
              className="border-3 sm:border-4 border-white/30 shadow-lg transition-all duration-500 relative z-10"
              onSpeak={(text) => console.log('DID Avatar speaking:', text)}
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-3 border-white/30 animate-pulse z-20"></div>
          </div>
          <h1 className="text-white font-bold text-xl sm:text-2xl tracking-wide drop-shadow-lg">Tomas Hoca</h1>
          <div className="text-white/80 text-sm sm:text-base mt-1">Your English Teacher</div>
          {/* Compact status line with real-time XP */}
          {user && (
            <div className="text-white/60 text-xs sm:text-sm mt-2 truncate px-4">
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
              key={index}
              message={message.text} 
              isUser={message.isUser}
              className={message.isSystem ? "opacity-75 italic" : ""}
            />
          ))}
        </div>

        {/* Premium Speaking Button */}
        <div className="flex flex-col items-center space-y-4 sm:space-y-6 pb-6 sm:pb-8 relative z-10">
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
      </div>
    </div>
  );
}