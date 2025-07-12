import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Loader2, RotateCcw, Sparkles, Trophy, Target, BookOpen, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { SampleAnswerButton } from './SampleAnswerButton';
import { StreakCounter } from './StreakCounter';
import { XPBoostAnimation } from './XPBoostAnimation';
import LearningPaths from './LearningPaths';
import ModulePractice from './ModulePractice';
import { useStreakTracker } from '@/hooks/useStreakTracker';
import { useXPSystem } from '@/hooks/useXPSystem';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { type LearningModule } from '@/data/learningModules';
import avatarImage from '@/assets/avatar.png';

export default function SpeakingAppNew() {
  const [currentView, setCurrentView] = useState<'chat' | 'learning' | 'module'>('chat');
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [currentSampleAnswers, setCurrentSampleAnswers] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [conversation, setConversation] = useState<Array<{role: 'user' | 'ai', content: string}>>([
    { role: 'ai', content: "Hello! I'm here to help you practice English speaking. What would you like to talk about today? You can speak about anything - your day, hobbies, dreams, or ask me questions!" }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();
  const { streakData, updateStreak } = useStreakTracker();
  const { level, xp, xpBoosts, showLevelUpPopup, addXP } = useXPSystem();
  const { soundEnabled, toggleSound, speak } = useTextToSpeech();
  
  const xpForNextLevel = (level + 1) * 100; // Simple formula

  const resetConversation = () => {
    setConversation([
      { role: 'ai', content: "Hello! I'm here to help you practice English speaking. What would you like to talk about today? You can speak about anything - your day, hobbies, dreams, or ask me questions!" }
    ]);
  };

  const handleModuleSelect = (module: LearningModule) => {
    setSelectedModule(module);
    setCurrentView('module');
  };

  const handleStartModuleChat = (prompt: string, sampleAnswers: string[]) => {
    setCurrentPrompt(prompt);
    setCurrentSampleAnswers(sampleAnswers);
    setConversation([
      { role: 'ai', content: `Let's practice speaking about: "${prompt}". Take your time to think about your response, and feel free to use the sample answers as inspiration. When you're ready, press the microphone button and start speaking!` }
    ]);
    setCurrentView('chat');
  };

  const handleBackToChat = () => {
    setCurrentView('chat');
    setSelectedModule(null);
    setCurrentPrompt('');
    setCurrentSampleAnswers([]);
  };

  const handleBackToModules = () => {
    setCurrentView('learning');
    setSelectedModule(null);
  };

  // Show different views based on currentView state
  if (currentView === 'learning') {
    return (
      <LearningPaths 
        onModuleSelect={handleModuleSelect}
        onBackToChat={handleBackToChat}
      />
    );
  }

  if (currentView === 'module' && selectedModule) {
    return (
      <ModulePractice 
        module={selectedModule}
        onBackToModules={handleBackToModules}
        onStartChat={handleStartModuleChat}
      />
    );
  }

  // Main chat interface here...
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-4">
      <div className="max-w-sm mx-auto space-y-6">
        {/* XP Boost Animations */}
        <XPBoostAnimation boosts={xpBoosts} />
        
        {/* Level Up Popup */}
        {showLevelUpPopup && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="bg-gradient-to-r from-primary to-primary-glow text-white border-0 shadow-elegant max-w-sm w-full">
              <CardContent className="p-8 text-center space-y-4">
                <div className="text-6xl">🌟</div>
                <div>
                  <h2 className="text-3xl font-bold">Level Up!</h2>
                  <p className="text-xl opacity-90">You reached Level {level}!</p>
                </div>
                <div className="text-4xl">🎉</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Header with Profile */}
        <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-16 w-16 border-4 border-white shadow-elegant">
                    <AvatarImage src={avatarImage} alt="User" />
                    <AvatarFallback className="bg-gradient-primary text-white text-xl font-bold">
                      U
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-gradient-primary rounded-full p-1">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-foreground">English Learner</h2>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-gradient-primary text-white font-medium">
                      <Trophy className="h-3 w-3 mr-1" />
                      Level {level}
                    </Badge>
                    <span className="text-sm text-muted-foreground font-medium">
                      ⚡ {xp} / {xpForNextLevel} XP
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Learning Paths Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentView('learning')}
                  className="bg-white/50 hover:bg-white/70 border-primary/20 text-primary"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Learning Paths
                </Button>
                
                {/* Sound Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleSound}
                  className="bg-white/50 hover:bg-white/70 border-primary/20"
                >
                  {soundEnabled ? (
                    <Volume2 className="h-4 w-4 text-primary" />
                  ) : (
                    <VolumeX className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* XP Progress Bar */}
        <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-soft">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground font-medium">Progress to Level {level + 1}</span>
                <span className="text-primary font-bold">{xp}/{xpForNextLevel} XP</span>
              </div>
              <div className="relative">
                <Progress 
                  value={(xp / xpForNextLevel) * 100} 
                  className="h-3 bg-muted border border-white/50"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow rounded-full opacity-75" 
                     style={{ width: `${(xp / xpForNextLevel) * 100}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Streak Counter */}
        <StreakCounter 
          currentStreak={streakData.currentStreak}
          message="🔥 Keep your streak going!"
          bestStreak={streakData.bestStreak}
        />

        {/* Module Context */}
        {currentPrompt && (
          <Card className="border-0 bg-gradient-to-r from-primary/10 to-primary-glow/10 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-primary mt-1" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Practice Topic</h3>
                  <p className="text-foreground">{currentPrompt}</p>
                  {currentSampleAnswers.length > 0 && (
                    <SampleAnswerButton 
                      question={currentPrompt}
                      onSpeak={speak}
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Chat Area */}
        <Card className="border-0 bg-white/40 backdrop-blur-sm shadow-soft">
          <CardContent className="p-4 space-y-4 max-h-80 overflow-y-auto">
            {conversation.map((message, index) => (
              <div 
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-4 rounded-2xl font-medium transition-all duration-200 ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-r from-primary/20 to-primary-glow/20 text-foreground' 
                    : 'bg-gradient-to-r from-blue-50 to-cyan-50 text-foreground border border-blue-100'
                }`}>
                  {message.content}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Controls */}
        <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-soft">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-center gap-4">
              {!currentPrompt && (
                <SampleAnswerButton 
                  question="What do you enjoy doing in your free time?"
                  onSpeak={speak}
                />
              )}
              
              <div className="relative">
                <Button
                  size="lg"
                  onClick={() => {
                    if (isRecording) {
                      // Stop recording logic
                      setIsRecording(false);
                    } else {
                      // Start recording logic
                      setIsRecording(true);
                    }
                  }}
                  disabled={isProcessing}
                  className={`w-20 h-20 rounded-full transition-all duration-300 ${
                    isRecording 
                      ? 'bg-red-500 hover:bg-red-600 shadow-red-glow scale-110' 
                      : 'bg-gradient-primary hover:shadow-glow'
                  }`}
                >
                  {isProcessing ? (
                    <Loader2 className="h-8 w-8 animate-spin text-white" />
                  ) : isRecording ? (
                    <MicOff className="h-8 w-8 text-white" />
                  ) : (
                    <Mic className="h-8 w-8 text-white" />
                  )}
                </Button>
                
                {isRecording && (
                  <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75" />
                )}
              </div>
              
              <Button
                variant="outline"
                size="lg"
                onClick={resetConversation}
                className="bg-white/50 hover:bg-white/70 border-primary/20 p-3"
              >
                <RotateCcw className="h-5 w-5 text-primary" />
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {isRecording ? 'Recording... Click again to stop' : 
                 isProcessing ? 'Processing your speech...' : 
                 'Click the microphone to start speaking'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}