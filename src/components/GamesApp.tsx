import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Gamepad2, BookOpen, Target } from 'lucide-react';
import { HangmanGame } from './HangmanGame';
import { HangmanErrorBoundary } from './HangmanErrorBoundary';
import { FlashcardsGame } from './FlashcardsGame';

interface GamesAppProps {
  onBack: () => void;
}

export const GamesApp: React.FC<GamesAppProps> = ({ onBack }) => {
  const [selectedGame, setSelectedGame] = useState<'menu' | 'hangman' | 'flashcards'>('menu');
  // 🔧 FIX #6: Reset error boundary when game changes to prevent stale error state
  const [errorBoundaryKey, setErrorBoundaryKey] = useState(0);

  React.useEffect(() => {
    // Reset error boundary when switching games
    setErrorBoundaryKey(prev => prev + 1);
  }, [selectedGame]);

  if (selectedGame === 'hangman') {
    return (
      <HangmanErrorBoundary key={errorBoundaryKey} onReset={() => setSelectedGame('menu')}>
        <HangmanGame onBack={() => setSelectedGame('menu')} />
      </HangmanErrorBoundary>
    );
  }

  if (selectedGame === 'flashcards') {
    return <FlashcardsGame onBack={() => setSelectedGame('menu')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="absolute inset-0 w-full h-full background-stars pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(2px 2px at 20px 30px, #fff, transparent), radial-gradient(2px 2px at 40px 70px, #fff, transparent), radial-gradient(1px 1px at 90px 40px, #fff, transparent)', backgroundSize: '100px 100px' }} 
      />
      
      <div className="relative max-w-2xl mx-auto pt-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Animated Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="animate-fade-in">
            <Gamepad2 className="h-16 w-16 text-purple-400 mx-auto mb-4 animate-bounce" />
            <h1 className="text-4xl font-bold text-white mb-2">
              Let's Play to Practice! 🎮
            </h1>
            <p className="text-xl text-white/70">
              Fun English games to boost your skills
            </p>
          </div>
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/20 rounded-lg p-4 backdrop-blur-xl">
            <p className="text-white/80 text-sm">
              ✨ Practice speaking, improve pronunciation, and earn XP through interactive gameplay!
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Hangman Game Card */}
          <Card 
            className="relative overflow-hidden bg-gradient-to-br from-blue-500/20 via-white/10 to-purple-500/20 backdrop-blur-xl border border-white/30 cursor-pointer hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none"
            onClick={() => setSelectedGame('hangman')}
          >
            <CardHeader className="relative z-10 text-center pb-4">
              <div className="mx-auto mb-6 p-6 bg-gradient-to-r from-blue-400/40 to-purple-400/40 rounded-full w-fit group-hover:scale-110 transition-transform duration-300 shadow-xl backdrop-blur-sm border border-white/20">
                <Target className="h-12 w-12 text-blue-200 group-hover:text-blue-100 transition-colors drop-shadow-lg" />
              </div>
              <CardTitle className="text-3xl font-bold text-white group-hover:text-blue-200 transition-colors mb-3 drop-shadow-md">
                🧩 Word Hangman
              </CardTitle>
              <p className="text-base text-blue-200/90 font-semibold tracking-wide">Spelling + Speaking Challenge</p>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-white/90 text-base leading-relaxed">
                Guess words by speaking letters aloud! Perfect for learning spelling and pronunciation together.
              </p>
              <div className="bg-white/10 rounded-lg p-4 space-y-3">
                <div className="text-sm text-white/80 flex items-center justify-center gap-2">
                  🎙️ <span>Voice-controlled letter guessing</span>
                </div>
                <div className="text-sm text-white/80 flex items-center justify-center gap-2">
                  📚 <span>Vocabulary from your lessons</span>
                </div>
                <div className="text-sm text-white/80 flex items-center justify-center gap-2">
                  🏆 <span>6 attempts to solve each word</span>
                </div>
              </div>
              <Button 
                className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedGame('hangman');
                }}
              >
                ⚡ Start Playing
              </Button>
            </CardContent>
          </Card>

          {/* Flashcards Game Card */}
          <Card 
            className="relative overflow-hidden bg-gradient-to-br from-green-500/20 via-white/10 to-teal-500/20 backdrop-blur-xl border border-white/30 cursor-pointer hover:from-green-500/30 hover:to-teal-500/30 transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none"
            onClick={() => setSelectedGame('flashcards')}
          >
            <CardHeader className="relative z-10 text-center pb-4">
              <div className="mx-auto mb-6 p-6 bg-gradient-to-r from-green-400/40 to-teal-400/40 rounded-full w-fit group-hover:scale-110 transition-transform duration-300 shadow-xl backdrop-blur-sm border border-white/20">
                <BookOpen className="h-12 w-12 text-green-200 group-hover:text-green-100 transition-colors drop-shadow-lg" />
              </div>
              <CardTitle className="text-3xl font-bold text-white group-hover:text-green-200 transition-colors mb-3 drop-shadow-md">
                🃏 Smart Flashcards
              </CardTitle>
              <p className="text-base text-green-200/90 font-semibold tracking-wide">Pronunciation Mastery</p>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-white/90 text-base leading-relaxed">
                Master pronunciation with AI-powered flashcards that listen and give instant feedback.
              </p>
              <div className="bg-white/10 rounded-lg p-4 space-y-3">
                <div className="text-sm text-white/80 flex items-center justify-center gap-2">
                  🔊 <span>Native speaker pronunciation</span>
                </div>
                <div className="text-sm text-white/80 flex items-center justify-center gap-2">
                  🎙️ <span>AI pronunciation scoring</span>
                </div>
                <div className="text-sm text-white/80 flex items-center justify-center gap-2">
                  ⭐ <span>Star ratings & achievements</span>
                </div>
              </div>
              <Button 
                className="w-full mt-6 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedGame('flashcards');
                }}
              >
                🚀 Start Learning
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center space-y-6">
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-white/20 rounded-xl p-6 backdrop-blur-xl">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-2xl">🎯</span>
              <h3 className="text-white font-bold text-lg">Smart Learning</h3>
            </div>
            <p className="text-white/80 text-base leading-relaxed">
              Both games automatically adapt to your current lesson vocabulary and speaking level
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-3xl">🎤</div>
              <p className="text-white/70 text-sm font-medium">Voice Practice</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">🏆</div>
              <p className="text-white/70 text-sm font-medium">Earn XP</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">📈</div>
              <p className="text-white/70 text-sm font-medium">Track Progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};