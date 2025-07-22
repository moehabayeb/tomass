import { useState, useEffect } from 'react';
import { Mic, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CanvasAvatar from './CanvasAvatar';
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
  const { streakData, getStreakMessage } = useStreakTracker();
  const { xp, level, xpBoosts, showLevelUpPopup, addXP } = useXPSystem();
  const { incrementSpeakingSubmissions } = useBadgeSystem();
  
  const [messages, setMessages] = useState([
    { text: "Hello! Ready to practice today? 🎤", isUser: false, isSystem: false },
    { text: "Yes, I had pizza today!", isUser: true, isSystem: false },
    { text: 'Great! You can also say: "I had a delicious pizza with friends." 🍕', isUser: false, isSystem: false },
    { text: "Next question: What do you usually eat for breakfast?", isUser: false, isSystem: false }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [history, setHistory] = useState<Array<{input: string; corrected: string; time: string}>>([]);
  const [currentQuestion, setCurrentQuestion] = useState("What do you usually eat for breakfast?");
  const [conversationContext, setConversationContext] = useState("");
  const [userLevel, setUserLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(null);
  
  // Avatar state management
  const [lastMessageTime, setLastMessageTime] = useState<number>();
  const [isProcessing, setIsProcessing] = useState(false);
  const { avatarState } = useAvatarState({
    isRecording,
    isSpeaking,
    isProcessing,
    lastMessageTime
  });
  
  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("chatHistory") || "[]");
    setHistory(savedHistory);
  }, []);

  // Handle initial message from bookmarks
  useEffect(() => {
    if (initialMessage) {
      addChatBubble(`💬 Continuing from: "${initialMessage}"`, "system");
      addChatBubble("Let's continue our conversation from here! What would you like to say about this?", "bot");
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

  // Helper function to record and transcribe audio
  const sendToTranscribe = async (): Promise<string> => {
    // Step 1: Record Audio from Mic with optimized settings for Whisper
    const stream = await navigator.mediaDevices.getUserMedia({ 
      audio: {
        sampleRate: 16000, // Optimal for Whisper
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      } 
    });
    
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'audio/webm;codecs=opus' // Better compression and quality
    });
    const audioChunks: Blob[] = [];

    mediaRecorder.ondataavailable = event => {
      audioChunks.push(event.data);
    };

    mediaRecorder.start();

    // Show recording message
    addChatBubble("🎙️ Listening...", "system");

    // Use voice activity detection with longer timeout for complete sentences
    await new Promise(resolve => {
      let silenceTimeout: NodeJS.Timeout;
      let recordingTimeout: NodeJS.Timeout;
      
      // Create an audio context for voice activity detection
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      let isCurrentlySpeakingLocal = false;
      let speechStartTime = 0;
      
      const checkAudio = () => {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
        
        // Voice activity threshold
        const isCurrentlySpeaking = average > 30;
        
        if (isCurrentlySpeaking && !isCurrentlySpeakingLocal) {
          // Speech started
          isCurrentlySpeakingLocal = true;
          speechStartTime = Date.now();
          clearTimeout(silenceTimeout);
          console.log('Speech detected, recording...');
        } else if (!isCurrentlySpeaking && isCurrentlySpeakingLocal) {
          // Potential silence detected
          silenceTimeout = setTimeout(() => {
            // Stop recording after 1.5 seconds of silence
            if (Date.now() - speechStartTime > 1000) { // Minimum 1 second of speech
              console.log('Silence detected, stopping recording');
              mediaRecorder.stop();
              audioContext.close();
              resolve(undefined);
            }
          }, 1500);
        }
        
        if (mediaRecorder.state === 'recording') {
          requestAnimationFrame(checkAudio);
        }
      };
      
      // Start voice activity detection
      checkAudio();
      
      // Maximum recording time (10 seconds for complete sentences)
      recordingTimeout = setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          console.log('Maximum recording time reached, stopping');
          mediaRecorder.stop();
          audioContext.close();
          resolve(undefined);
        }
      }, 10000);
      
      // Cleanup on stop
      mediaRecorder.onstop = () => {
        clearTimeout(silenceTimeout);
        clearTimeout(recordingTimeout);
        audioContext.close();
      };
    });

    const audioBlob = await new Promise<Blob>(resolve => {
      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: 'audio/webm' });
        resolve(blob);
      };
    });

    // Stop all tracks to release microphone
    stream.getTracks().forEach(track => track.stop());

    // Step 2: Send Audio to Whisper Transcription
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");

    console.log('Sending audio for transcription, size:', audioBlob.size, 'bytes');

    const transcribeRes = await fetch("https://sgzhbiknaiqsuknwgvjr.supabase.co/functions/v1/transcribe", {
      method: "POST",
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnemhiaWtuYWlxc3VrbmdndmpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNDkyNTUsImV4cCI6MjA2NzkyNTI1NX0.zi3agHTlckDVeDOQ-rFvC9X_TI21QOxiXzqbNs2UrG4',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnemhiaWtuYWlxc3VrbndndmpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNDkyNTUsImV4cCI6MjA2NzkyNTI1NX0.zi3agHTlckDVeDOQ-rFvC9X_TI21QOxiXzqbNs2UrG4'
      },
      body: formData
    });

    if (!transcribeRes.ok) {
      const errorData = await transcribeRes.json();
      throw new Error(errorData.error || 'Transcription failed');
    }

    const transcribeData = await transcribeRes.json();
    console.log('Transcription result:', transcribeData.transcript);
    return transcribeData.transcript;
  };

  // Helper function to send text for grammar feedback
  const sendToFeedback = async (text: string): Promise<{ message: string; corrected: string }> => {
    const feedbackRes = await fetch("https://sgzhbiknaiqsuknwgvjr.supabase.co/functions/v1/feedback", {
      method: "POST",
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnemhiaWtuYWlxc3VrbndndmpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNDkyNTUsImV4cCI6MjA2NzkyNTI1NX0.zi3agHTlckDVeDOQ-rFvC9X_TI21QOxiXzqbNs2UrG4',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnemhiaWtuYWlxc3VrbndndmpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNDkyNTUsImV4cCI6MjA2NzkyNTI1NX0.zi3agHTlckDVeDOQ-rFvC9X_TI21QOxiXzqbNs2UrG4',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });

    if (!feedbackRes.ok) {
      const errorData = await feedbackRes.json();
      throw new Error(errorData.error || 'Feedback failed');
    }

    const feedbackData = await feedbackRes.json();
    return {
      message: feedbackData.corrected,
      corrected: feedbackData.corrected
    };
  };

  // Helper function to display bot messages with text-to-speech
  const showBotMessage = (message: string, onComplete?: () => void) => {
    addChatBubble(message, "bot");
    speak(message, onComplete);
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

  const startSpeaking = async () => {
    try {
      setIsRecording(true);
      setRecordingStartTime(Date.now());
      
      // Step 1: Record and transcribe (verbatim)
      const transcript = await sendToTranscribe();
      addChatBubble(`💭 What you said: "${transcript}"`, "user");

      // Set processing state while getting feedback
      setIsProcessing(true);

      // Calculate response time for XP bonus
      const responseTime = recordingStartTime ? Date.now() - recordingStartTime : 0;

      // Step 2: Get grammar feedback with potential corrections
      const feedback = await sendToFeedback(transcript);
      
      setIsProcessing(false);

      // Step 3: Display feedback with text-to-speech, wait for completion
      // Show if there are errors or improvements
      let feedbackMessage = feedback.message;
      
      // If the response contains corrections, show both the feedback and the corrected version
      if (feedback.corrected && feedback.corrected !== transcript) {
        feedbackMessage = `${feedback.message} You could also say: "${feedback.corrected}"`;
      }
      
      await new Promise<void>((resolve) => {
        showBotMessage(feedbackMessage, () => {
          console.log('Feedback TTS completed');
          resolve();
        });
      });

      // Set processing state while generating follow-up
      setIsProcessing(true);

      // Step 4: Generate natural follow-up question
      const nextQuestion = await generateFollowUpQuestion(transcript);
      
      setIsProcessing(false);
      
      // Step 5: Add delay before asking follow-up question to prevent overlap
      setTimeout(() => {
        showBotMessage(nextQuestion, () => {
          console.log('Follow-up question TTS completed');
          // Add delay before re-enabling recording to prevent accidental triggering
          setTimeout(() => {
            console.log('Ready for next input');
          }, 1500);
        });
      }, 2000);

      // Step 6: Log the session to history
      logSession(transcript, feedback.corrected);

      // Step 7: Award XP with bonuses for speed and accuracy
      const isCorrect = !feedback.message.toLowerCase().includes('mistake') && 
                       !feedback.message.toLowerCase().includes('error');
      addXP(20, responseTime, isCorrect);

      // Step 8: Track speaking submission for badges
      incrementSpeakingSubmissions();

    } catch (error) {
      console.error('Error in startSpeaking:', error);
      addChatBubble("Sorry, there was an error. Please try again.", "system");
      setIsProcessing(false);
    } finally {
      setIsRecording(false);
      setRecordingStartTime(null);
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
        {/* Premium Header & Profile Section */}
        <div 
          className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 mt-safe-area-inset-top"
          style={{ boxShadow: 'var(--shadow-medium), inset 0 1px 0 rgba(255,255,255,0.1)' }}
        >
          {/* Teacher Card */}
          <div className="glass-card glass-card-hover rounded-3xl p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="relative">
                <CanvasAvatar 
                  size="lg"
                  state={avatarState}
                  className="border-3 sm:border-4 border-white/30 shadow-lg transition-all duration-500 hover:scale-105 hover:rotate-1"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-3 border-white/30 animate-pulse"></div>
              </div>
              
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-white font-bold text-xl sm:text-2xl mb-2 tracking-wide drop-shadow-lg">Tomas Hoca</h1>
                <div className="pill-button bg-gradient-to-r from-orange-500/20 to-orange-400/15 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 mb-4 border border-white/20 inline-block">
                  <span className="text-white font-semibold text-sm sm:text-base drop-shadow-sm">📚 Level {level} Teacher</span>
                </div>
                <div className="max-w-sm">
                  <XPProgressBar current={xp} max={500} />
                </div>
              </div>
            </div>
          </div>
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
            onClick={startSpeaking}
            disabled={isRecording}
            className={`pill-button w-full max-w-sm py-6 sm:py-8 text-lg sm:text-xl font-bold border-0 shadow-xl min-h-[64px] ${isRecording ? 'animate-pulse' : ''}`}
            size="lg"
            style={{
              background: isRecording 
                ? 'linear-gradient(135deg, #ff4f80, #ff6b9d, #c084fc)' 
                : 'linear-gradient(135deg, #ff4f80, #ff6b9d)',
              color: 'white',
              boxShadow: isRecording 
                ? '0 0 60px rgba(255, 79, 128, 0.6), 0 8px 32px rgba(255, 107, 157, 0.4)' 
                : '0 8px 32px rgba(255, 79, 128, 0.3), 0 4px 16px rgba(255, 107, 157, 0.2)',
            }}
          >
            <div className="flex items-center gap-3">
              {isRecording ? "🎙️" : "🎤"}
              <span className="drop-shadow-sm">
                {isRecording ? "Recording..." : "Start Speaking"}
              </span>
            </div>
          </Button>

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