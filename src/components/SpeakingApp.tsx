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
  const percentage = Math.min((current / max) * 100, 100);
  
  return (
    <div className={`relative ${className}`}>
      <div className="xp-progress-container h-4 w-full">
        <div 
          className="xp-progress-fill h-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex items-center justify-between mt-2 px-1">
        <div className="flex items-center space-x-1">
          <span className="text-lg">⚡</span>
          <span className="text-sm font-semibold text-gray-600">XP</span>
        </div>
        <span className="text-sm font-bold text-gray-700">
          {current} / {max}
        </span>
      </div>
    </div>
  );
};

// Chat Bubble component
const ChatBubble = ({ 
  message, 
  isUser = false, 
  className 
}: { 
  message: string; 
  isUser?: boolean; 
  className?: string; 
}) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 ${className}`}>
    <div 
      className={`max-w-[85%] px-6 py-4 rounded-3xl font-bold text-lg leading-relaxed ${
        isUser ? 'chat-bubble-user' : 'chat-bubble-ai'
      }`}
      style={{
        boxShadow: 'var(--shadow-bubble)'
      }}
    >
      {message}
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
      
      {/* Level Up Popup */}
      <div 
        data-level-popup
        style={{
          display: showLevelUpPopup ? 'block' : 'none',
          position: 'fixed',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(1)',
          fontSize: '32px',
          background: 'yellow',
          color: 'black',
          padding: '20px 30px',
          borderRadius: '20px',
          fontWeight: 'bold',
          zIndex: 999,
          opacity: '1',
          transition: 'all 0.4s ease'
        }}
      >
        🌟 Level Up!
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

      <div className="relative z-10 p-6 max-w-md mx-auto">
        {/* Premium Header & Profile Section */}
        <div className="profile-card p-6 mb-6 mt-8 fade-in-up">
          <div className="flex flex-col items-center space-y-4">
            {/* Centered Avatar */}
            <div className="avatar-premium w-24 h-24 rounded-full flex items-center justify-center">
              <img 
                src={avatarImage} 
                alt="AI Tutor" 
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
            
            {/* User Info */}
            <div className="text-center">
              <h1 className="font-inter font-bold text-2xl text-gray-800 mb-1">Tomas Hoca</h1>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Level {level}
                </span>
              </div>
            </div>
            
            {/* Premium XP Progress */}
            <div className="w-full">
              <XPProgressBar current={xp} max={500} />
            </div>
          </div>
        </div>

        {/* Enhanced Streak Counter */}
        <div className="streak-container p-4 mb-6 fade-in-up">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-2xl">🔥</span>
            <span className="font-inter font-bold text-lg">
              Day {streakData.currentStreak} - {getStreakMessage()}
            </span>
          </div>
        </div>

        {/* Enhanced Sample Answer Button */}
        <div className="mb-6 fade-in-up">
          <button 
            className="sample-button w-full py-3 px-6 flex items-center justify-center space-x-2"
            onClick={() => speak(`Sample answer for: ${currentQuestion}`)}
          >
            <span className="text-xl">💡</span>
            <span className="font-inter font-semibold">See Sample Answers</span>
          </button>
        </div>

        {/* Chat Area */}
        <div 
          className="space-y-4 mb-8 overflow-y-auto px-2 fade-in-up"
          style={{ height: '320px' }}
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
        <div className="flex flex-col items-center space-y-6 fade-in-up">
          <button 
            onClick={startSpeaking}
            disabled={isRecording}
            className={`mic-button w-full max-w-sm py-6 px-8 text-xl font-inter font-bold ${isRecording ? 'glow animate-pulse' : ''}`}
          >
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl">{isRecording ? "🎙️" : "🎤"}</span>
              <span>{isRecording ? "Recording..." : "Start Speaking"}</span>
            </div>
          </button>

          {/* Premium Control Panel */}
          <div className="flex flex-col items-center space-y-3">
            <button 
              className="sample-button flex items-center space-x-3 px-6 py-3"
              onClick={toggleSound}
            >
              <Volume2 className="w-5 h-5 text-gray-700" />
              <span className="font-inter font-semibold text-gray-700">
                Sound {soundEnabled ? 'ON' : 'OFF'}
              </span>
            </button>
            
            {/* Premium Level Selector */}
            <select 
              value={userLevel}
              onChange={(e) => setUserLevel(e.target.value as typeof userLevel)}
              className="sample-button px-4 py-2 font-inter font-semibold text-gray-700 border-none outline-none cursor-pointer"
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