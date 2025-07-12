import { useState, useEffect } from 'react';
import { Mic, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
const avatarImage = '/lovable-uploads/dbfb3a2b-8dc9-44ae-8c2f-c0b3094f054f.png';
import { supabase } from '@/integrations/supabase/client';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useStreakTracker } from '@/hooks/useStreakTracker';
import { useXPSystem } from '@/hooks/useXPSystem';
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
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-5 ${className}`}>
    <div className="flex items-start space-x-2 max-w-[85%]">
      <div 
        className={`px-5 py-4 rounded-2xl font-medium text-base leading-relaxed transition-all duration-200 hover:scale-[1.02] flex-1 ${
          isUser 
            ? 'bg-white/95 text-gray-800 border border-yellow-200' 
            : 'text-gray-800'
        }`}
        style={{
          background: isUser ? 'var(--gradient-card)' : 'hsl(var(--chat-bubble-ai))',
          boxShadow: 'var(--shadow-bubble)'
        }}
      >
        {message}
      </div>
      
      {/* Bookmark button for non-user messages (AI responses) */}
      {!isUser && (
        <BookmarkButton
          content={message}
          type="message"
          className="mt-2 opacity-60 hover:opacity-100"
        />
      )}
    </div>
  </div>
);

export default function SpeakingApp() {
  const { speak, stopSpeaking, toggleSound, isSpeaking, soundEnabled } = useTextToSpeech();
  const { streakData, getStreakMessage } = useStreakTracker();
  const { xp, level, xpBoosts, showLevelUpPopup, addXP } = useXPSystem();
  
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
  
  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("chatHistory") || "[]");
    setHistory(savedHistory);
  }, []);

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
  };

  // Helper function to record and transcribe audio
  const sendToTranscribe = async (): Promise<string> => {
    // Step 1: Record Audio from Mic
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks: Blob[] = [];

    mediaRecorder.ondataavailable = event => {
      audioChunks.push(event.data);
    };

    mediaRecorder.start();

    // Show recording message
    addChatBubble("🎙️ Listening...", "system");

    await new Promise(resolve => setTimeout(resolve, 5000)); // Record 5 seconds
    mediaRecorder.stop();

    const audioBlob = await new Promise<Blob>(resolve => {
      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: 'audio/wav' });
        resolve(blob);
      };
    });

    // Stop all tracks to release microphone
    stream.getTracks().forEach(track => track.stop());

    // Step 2: Send Audio to Whisper Transcription
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.wav");

    const transcribeRes = await fetch("https://sgzhbiknaiqsuknwgvjr.supabase.co/functions/v1/transcribe", {
      method: "POST",
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnemhiaWtuYWlxc3VrbndndmpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNDkyNTUsImV4cCI6MjA2NzkyNTI1NX0.zi3agHTlckDVeDOQ-rFvC9X_TI21QOxiXzqbNs2UrG4',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnemhiaWtuYWlxc3VrbndndmpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNDkyNTUsImV4cCI6MjA2NzkyNTI1NX0.zi3agHTlckDVeDOQ-rFvC9X_TI21QOxiXzqbNs2UrG4'
      },
      body: formData
    });

    if (!transcribeRes.ok) {
      const errorData = await transcribeRes.json();
      throw new Error(errorData.error || 'Transcription failed');
    }

    const transcribeData = await transcribeRes.json();
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
  const showBotMessage = (message: string) => {
    addChatBubble(message, "bot");
    speak(message);
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
      
      // Step 1: Record and transcribe
      const transcript = await sendToTranscribe();
      addChatBubble(transcript, "user");

      // Calculate response time for XP bonus
      const responseTime = recordingStartTime ? Date.now() - recordingStartTime : 0;

      // Step 2: Get grammar feedback
      const feedback = await sendToFeedback(transcript);

      // Step 3: Display feedback with text-to-speech
      showBotMessage(feedback.message);

      // Step 4: Generate natural follow-up question
      const nextQuestion = await generateFollowUpQuestion(transcript);
      
      // Add delay before asking follow-up to feel more natural
      setTimeout(() => {
        showBotMessage(nextQuestion);
      }, 2000);

      // Step 5: Log the session to history
      logSession(transcript, feedback.corrected);

      // Step 6: Award XP with bonuses for speed and accuracy
      const isCorrect = !feedback.message.toLowerCase().includes('mistake') && 
                       !feedback.message.toLowerCase().includes('error');
      addXP(20, responseTime, isCorrect);

    } catch (error) {
      console.error('Error in startSpeaking:', error);
      addChatBubble("Sorry, there was an error. Please try again.", "system");
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

      <div className="relative z-10 p-4 max-w-sm mx-auto min-h-screen">
        {/* Premium Header & Profile Section */}
        <div 
          className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-6 mb-6 mt-safe-area-inset-top"
          style={{ boxShadow: 'var(--shadow-medium), inset 0 1px 0 rgba(255,255,255,0.1)' }}
        >
          <div className="flex items-center justify-center mb-6">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center border-4 border-white/20 transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: 'hsl(var(--avatar-bg))',
                boxShadow: 'var(--shadow-medium)'
              }}
            >
              <img 
                src={avatarImage} 
                alt="Avatar" 
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
          </div>
          
          <div className="text-center mb-4">
            <h1 className="text-white font-bold text-2xl mb-3 tracking-wide">Tomas Hoca</h1>
            <div className="inline-flex items-center bg-gradient-to-r from-white/25 to-white/15 backdrop-blur-sm rounded-full px-5 py-2.5 mb-5 border border-white/20">
              <span className="text-white font-bold text-lg">Level {level}</span>
            </div>
            <XPProgressBar current={xp} max={500} />
          </div>
        </div>

        {/* Streak Counter */}
        <StreakCounter 
          currentStreak={streakData.currentStreak}
          message={getStreakMessage()}
          bestStreak={streakData.bestStreak}
        />

        {/* Sample Answer Button */}
        <SampleAnswerButton 
          question={currentQuestion}
          onSpeak={speak}
        />

        {/* Premium Chat Area */}
        <div 
          className="bg-gradient-to-b from-white/8 to-white/3 backdrop-blur-sm rounded-3xl p-5 mb-6 overflow-y-auto border border-white/10"
          style={{ 
            height: '300px',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1), var(--shadow-soft)'
          }}
        >
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
        <div className="flex flex-col items-center space-y-5 pb-8">
          <Button 
            onClick={startSpeaking}
            disabled={isRecording}
            className={`w-full max-w-xs py-8 text-xl font-bold rounded-full border-0 hover:scale-105 transition-all duration-300 disabled:opacity-50 shadow-xl ${isRecording ? 'animate-pulse' : ''}`}
            size="lg"
            style={{
              backgroundColor: 'hsl(var(--mic-button))',
              color: 'hsl(var(--text-white))',
              background: isRecording 
                ? 'linear-gradient(45deg, hsl(var(--mic-button)), hsl(350, 85%, 75%))' 
                : 'linear-gradient(45deg, hsl(var(--mic-button)), hsl(350, 85%, 70%))',
              boxShadow: isRecording ? '0 0 40px hsl(var(--mic-button))' : 'var(--shadow-strong)',
              minHeight: '64px'
            }}
          >
            {isRecording ? "🎙️ Recording..." : "🎤 Start Speaking"}
          </Button>

          {/* Premium Controls */}
          <div className="flex flex-col items-center space-y-3">
            <div 
              className="flex items-center space-x-3 bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white border border-white/50"
              onClick={toggleSound}
              style={{ boxShadow: 'var(--shadow-medium)' }}
            >
              <Volume2 className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700 font-semibold text-base">
                Sound {soundEnabled ? 'ON' : 'OFF'}
              </span>
            </div>
            
            <select 
              value={userLevel}
              onChange={(e) => setUserLevel(e.target.value as typeof userLevel)}
              className="bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 text-gray-700 font-semibold border border-white/50 outline-none cursor-pointer transition-all duration-300 hover:bg-white hover:scale-105 text-base"
              style={{ boxShadow: 'var(--shadow-medium)' }}
            >
              <option value="beginner">🌱 Beginner</option>
              <option value="intermediate">🌿 Intermediate</option>
              <option value="advanced">🌳 Advanced</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}