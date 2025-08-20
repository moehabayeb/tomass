import { useState, useEffect } from 'react';
import { Mic, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DIDAvatar from './DIDAvatar';
import { useAvatarState } from '@/hooks/useAvatarState';
import { supabase } from '@/integrations/supabase/client';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useStreakTracker } from '@/hooks/useStreakTracker';
import { useXPSystem } from '@/hooks/useXPSystem';
import { useBadgeSystem } from '@/hooks/useBadgeSystem';
import { XPBoostAnimation } from './XPBoostAnimation';
import { StreakCounter } from './StreakCounter';
import { SampleAnswerButton } from './SampleAnswerButton';
import BookmarkButton from './BookmarkButton';
import { startRecording, stopRecording, getState, onState, cleanup, type MicState } from '@/lib/audio/micEngine';

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
  const { xp, level, xpBoosts, showLevelUpPopup, addXP } = useXPSystem();
  const { incrementSpeakingSubmissions } = useBadgeSystem();
  
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

  // Initialize component
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("chatHistory") || "[]");
    setHistory(savedHistory);

    // Ask initial question
    speak(currentQuestion);
    
    // Cleanup on unmount
    return () => {
      cleanup();
    };
  }, []);

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
  const sendToFeedback = async (text: string): Promise<{ message: string; corrected: string }> => {
    const feedbackRes = await supabase.functions.invoke('feedback', {
      body: { text }
    });

    if (feedbackRes.error) {
      throw new Error(feedbackRes.error.message || 'Feedback failed');
    }

    return {
      message: feedbackRes.data.corrected,
      corrected: feedbackRes.data.corrected
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

  const executeTeacherLoop = async (transcript: string) => {
    console.log('[Speaking] teacher-loop:start with transcript:', transcript);
    setIsProcessingTranscript(true);
    
    try {
      // Step 1: Analyze & Correct using existing functions
      const feedback = await sendToFeedback(transcript);
      console.log('[Speaking] teacher-loop:feedback received:', feedback.message);

      // Step 2: Check if it's correct or needs correction
      const isCorrect = feedback.message.trim() === "CORRECT";
      
      // Step 3: Only show correction if there's an actual mistake
      if (!isCorrect) {
        showBotMessage(feedback.message);
      }

      // Step 4: Generate and speak follow-up question  
      const nextQuestion = await generateFollowUpQuestion(transcript);
      console.log('[Speaking] teacher-loop:next-question generated');
      
      showBotMessage(nextQuestion);

      // Step 5: Track session (non-blocking)
      logSession(transcript, feedback.corrected || transcript);
      
      // Step 6: Award XP
      addXP(20, 0, isCorrect);
      
      // Step 7: Track speaking submission for badges
      incrementSpeakingSubmissions();
      
      console.log('[Speaking] teacher-loop:completed successfully');
      
    } catch (error: any) {
      console.error('[Speaking] teacher-loop:error', error);
      setErrorMessage(error.message || "Sorry, there was an error. Please try again.");
    } finally {
      setIsProcessingTranscript(false);
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
        
        // Display transcript
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
      {/* XP Boost Animations */}
      <XPBoostAnimation boosts={xpBoosts} />
      
      {/* Premium Level Up Popup */}
      <div 
        data-level-popup
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-500 ${showLevelUpPopup ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}
        style={{
          background: 'linear-gradient(135deg, #ffd700, #ff6b9d)',
          borderRadius: '24px',
          padding: '32px 40px',
          boxShadow: '0 20px 60px rgba(255, 215, 0, 0.4)',
          border: '3px solid rgba(255, 255, 255, 0.3)'
        }}
      >
        <div className="text-center">
          <div className="text-4xl font-black text-white mb-2">🌟 LEVEL UP! 🌟</div>
          <div className="text-lg font-semibold text-white/90">You reached Level {level}!</div>
        </div>
      </div>
      
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
        <div className="text-center mb-6 sm:mb-8 mt-safe-area-inset-top">
          <div className="relative inline-block">
            <DIDAvatar 
              size="lg"
              state={avatarState}
              className="border-3 sm:border-4 border-white/30 shadow-lg transition-all duration-500"
              onSpeak={(text) => console.log('DID Avatar speaking:', text)}
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-3 border-white/30 animate-pulse"></div>
          </div>
          <h1 className="text-white font-bold text-xl sm:text-2xl mt-4 tracking-wide drop-shadow-lg">Tomas Hoca</h1>
          <div className="text-white/80 text-sm sm:text-base mt-1">Your English Teacher</div>
        </div>

        {/* Enhanced spacing for cleaner layout */}

        {/* Sample Answer Button */}
        <SampleAnswerButton 
          question={currentQuestion}
          onSpeak={speak}
        />

        {/* Premium Chat Area */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-6 sm:mb-8 overflow-y-auto min-h-[280px] max-h-[320px] space-y-2">
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
        <div className="flex flex-col items-center space-y-4 sm:space-y-6 pb-6 sm:pb-8">
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