import { useState } from 'react';
import { Mic, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import avatarImage from '@/assets/avatar.png';

// Sparkle component for background decoration
const Sparkle = ({ className, delayed = false }: { className?: string; delayed?: boolean }) => (
  <div 
    className={`absolute w-1 h-1 bg-yellow-300 rounded-full ${delayed ? 'sparkle-delayed' : 'sparkle'} ${className}`}
    style={{ 
      boxShadow: '0 0 4px currentColor'
    }}
  />
);

// XP Progress Bar component
const XPProgressBar = ({ current, max, className }: { current: number; max: number; className?: string }) => {
  const percentage = (current / max) * 100;
  
  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-3 xp-bar-bg rounded-full border border-slate-700">
        <div 
          className="h-full xp-bar-fill rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="absolute right-0 top-4 text-xs text-white font-medium">
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
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 ${className}`}>
    <div 
      className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-soft font-medium ${
        isUser ? 'chat-bubble-user' : 'chat-bubble-ai'
      }`}
    >
      {message}
    </div>
  </div>
);

export default function SpeakingApp() {
  const [soundOn, setSoundOn] = useState(true);

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

      <div className="relative z-10 p-4 max-w-md mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <div className="flex items-center space-x-3">
            <img 
              src={avatarImage} 
              alt="Avatar" 
              className="w-12 h-12 rounded-full border-2 border-white shadow-soft"
            />
            <h1 className="text-white font-bold text-lg">Tomas Hoca</h1>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-white font-bold text-sm mb-1">Level 5</span>
            <XPProgressBar current={230} max={500} />
          </div>
        </div>

        {/* Chat Area */}
        <div className="space-y-4 mb-6">
          <ChatBubble message="Hello! Ready to practice today? 🎤" />
          <ChatBubble message="Yes, I had pizza today!" isUser />
          <ChatBubble message="Great! You can also say: &quot;I had a delicious pizza with friends.&quot; 🍕" />
          <ChatBubble message="Next question: What do you usually eat for breakfast?" />
        </div>

        {/* XP Progress Bar (horizontal) */}
        <div className="mb-8">
          <XPProgressBar current={350} max={500} className="w-full" />
        </div>

        {/* Speaking Button */}
        <div className="flex flex-col items-center space-y-4">
          <Button 
            className="mic-button shadow-button w-full max-w-xs py-4 text-lg font-bold rounded-full border-none hover:scale-105 transition-transform duration-200"
            size="lg"
          >
            <Mic className="w-6 h-6 mr-2" />
            Start Speaking
          </Button>

          {/* Sound Toggle */}
          <div 
            className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 cursor-pointer shadow-soft hover:scale-105 transition-transform duration-200"
            onClick={() => setSoundOn(!soundOn)}
          >
            <Volume2 className="w-4 h-4 text-gray-700" />
            <span className="text-gray-700 font-medium text-sm">
              Sound {soundOn ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}