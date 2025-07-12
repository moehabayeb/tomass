import { useState, useEffect } from 'react';
import { Mic, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import avatarImage from '@/assets/avatar.png';
import { supabase } from '@/integrations/supabase/client';

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

// XP Progress Bar component
const XPProgressBar = ({ current, max, className }: { current: number; max: number; className?: string }) => {
  const percentage = (current / max) * 100;
  
  return (
    <div className={`relative ${className}`}>
      <div 
        className="w-full h-2.5 rounded-lg overflow-hidden" 
        style={{ background: '#111' }}
      >
        <div 
          className="h-full transition-all duration-500 ease-out"
          style={{ 
            width: `${percentage}%`,
            background: 'yellow'
          }}
        />
      </div>
      <span className="absolute right-0 top-3 text-xs text-yellow-300 font-bold">
        XP {current} / {max}
      </span>
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
  const [soundOn, setSoundOn] = useState(true);
  const [xp, setXp] = useState(230);
  const [level, setLevel] = useState(5);
  const [messages, setMessages] = useState([
    { text: "Hello! Ready to practice today? 🎤", isUser: false, isSystem: false },
    { text: "Yes, I had pizza today!", isUser: true, isSystem: false },
    { text: 'Great! You can also say: "I had a delicious pizza with friends." 🍕', isUser: false, isSystem: false },
    { text: "Next question: What do you usually eat for breakfast?", isUser: false, isSystem: false }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [history, setHistory] = useState<Array<{input: string; corrected: string; time: string}>>([]);
  const [showLevelUpPopup, setShowLevelUpPopup] = useState(false);
  
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
  const showLevelUp = () => {
    setShowLevelUpPopup(true);
    // Start fade out after 1.5 seconds
    setTimeout(() => {
      const popup = document.querySelector('[data-level-popup]') as HTMLElement;
      if (popup) {
        popup.style.opacity = "0";
        popup.style.transform = "translate(-50%, -50%) scale(0.9)";
        // Hide completely after fade animation
        setTimeout(() => {
          setShowLevelUpPopup(false);
        }, 500);
      }
    }, 1500);
  };

  const addXP = (points: number) => {
    setXp(prevXp => {
      const newXp = prevXp + points;
      
      if (newXp >= 500) {
        setLevel(prevLevel => {
          const newLevel = prevLevel + 1;
          showLevelUp();
          return newLevel;
        });
        return 0; // Reset XP to 0 after level up
      }
      
      return newXp;
    });
  };

  const addChatBubble = (text: string, type: "user" | "bot" | "system") => {
    const newMessage = { 
      text, 
      isUser: type === "user",
      isSystem: type === "system"
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const speak = (text: string) => {
    if (soundOn) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      speechSynthesis.speak(utterance);
    }
  };

  const startSpeaking = async () => {
    try {
      setIsRecording(true);
      
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

      const { data: transcribeData, error: transcribeError } = await supabase.functions.invoke('transcribe', {
        body: formData
      });

      if (transcribeError) throw transcribeError;

      const transcript = transcribeData.transcript;

      // Show user's transcribed text
      addChatBubble(transcript, "user");

      // Step 3: Send to GPT Grammar Feedback
      const { data: feedbackData, error: feedbackError } = await supabase.functions.invoke('feedback', {
        body: { text: transcript }
      });

      if (feedbackError) throw feedbackError;

      const corrected = feedbackData.corrected;

      // Step 4: Split correction and follow-up
      const parts = corrected.split("Next question:");
      const correction = parts[0].trim();
      const followup = parts[1]?.trim();

      addChatBubble(correction, "bot");
      if (followup) {
        addChatBubble("Next question: " + followup, "bot");
      }

      // Step 5: Speak correction aloud
      speak(correction);

      // Step 6: Log the session to history
      logSession(transcript, correction);

      // Step 7: Gain XP!
      addXP(20);

    } catch (error) {
      console.error('Error in startSpeaking:', error);
      addChatBubble("Sorry, there was an error. Please try again.", "system");
    } finally {
      setIsRecording(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'hsl(var(--app-bg))' }}>
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
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8 pt-8">
          <div className="flex items-center space-x-4">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center border-4 border-black/10"
              style={{ backgroundColor: 'hsl(var(--avatar-bg))' }}
            >
              <img 
                src={avatarImage} 
                alt="Avatar" 
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <h1 className="text-white font-extrabold text-2xl">Tomas<br />Hoca</h1>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-white font-extrabold text-xl mb-2">Level {level}</span>
            <XPProgressBar current={xp} max={500} />
          </div>
        </div>

        {/* Chat Area */}
        <div 
          className="space-y-2 mb-8 overflow-y-auto px-2"
          style={{ height: '300px' }}
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

        {/* XP Progress Bar (horizontal) */}
        <div className="mb-8">
          <div 
            className="w-full h-2.5 rounded-lg overflow-hidden" 
            style={{ background: '#111' }}
          >
            <div 
              className="h-full transition-all duration-500 ease-out"
              style={{ 
                width: `${Math.min((xp / 500) * 100, 100)}%`,
                background: 'yellow'
              }}
            />
          </div>
        </div>

        {/* Speaking Button */}
        <div className="flex flex-col items-center space-y-6">
          <Button 
            onClick={startSpeaking}
            disabled={isRecording}
            className={`w-full max-w-sm py-6 text-xl font-extrabold rounded-full border-4 border-black/20 hover:scale-105 transition-all duration-200 disabled:opacity-50 ${isRecording ? 'animate-pulse' : ''}`}
            size="lg"
            style={{
              backgroundColor: 'hsl(var(--mic-button))',
              color: 'hsl(var(--text-white))',
              boxShadow: isRecording ? '0 0 30px hsl(var(--mic-button))' : 'var(--shadow-button)'
            }}
          >
            {isRecording ? "🎙️ Recording..." : "🎤 Start Speaking"}
          </Button>

          {/* Sound Toggle */}
          <div 
            className="flex items-center space-x-3 bg-white rounded-full px-6 py-3 cursor-pointer transition-transform duration-200 hover:scale-105"
            onClick={() => setSoundOn(!soundOn)}
            style={{
              boxShadow: 'var(--shadow-soft)'
            }}
          >
            <Volume2 className="w-5 h-5 text-gray-700" />
            <span className="text-gray-700 font-bold text-lg">
              Sound {soundOn ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}