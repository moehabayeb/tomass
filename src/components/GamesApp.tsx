import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Gamepad2, BookOpen, Target } from 'lucide-react';
import { HangmanGame } from './HangmanGame';
import { FlashcardsGame } from './FlashcardsGame';

interface GamesAppProps {
  onBack: () => void;
}

export const GamesApp: React.FC<GamesAppProps> = ({ onBack }) => {
  const [selectedGame, setSelectedGame] = useState<'menu' | 'hangman' | 'flashcards'>('menu');

  if (selectedGame === 'hangman') {
    return <HangmanGame onBack={() => setSelectedGame('menu')} />;
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
        <div className="flex items-center mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Gamepad2 className="h-8 w-8 text-purple-400" />
            English Learning Games
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Hangman Game Card */}
          <Card 
            className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/20 cursor-pointer hover:from-white/20 hover:to-white/10 transition-all duration-300 group"
            onClick={() => setSelectedGame('hangman')}
          >
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full w-fit">
                <Target className="h-8 w-8 text-blue-400" />
              </div>
              <CardTitle className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                🧩 Hangman
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-3">
              <p className="text-white/80 text-sm">
                Guess words by speaking letters aloud! Perfect for learning spelling and pronunciation.
              </p>
              <div className="space-y-2 text-xs text-white/60">
                <div>🎙️ Say letters instead of typing</div>
                <div>📚 Words from your current lessons</div>
                <div>🏆 6 tries to guess the word</div>
              </div>
              <Button 
                className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium"
                onClick={() => setSelectedGame('hangman')}
              >
                Start Hangman
              </Button>
            </CardContent>
          </Card>

          {/* Flashcards Game Card */}
          <Card 
            className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/20 cursor-pointer hover:from-white/20 hover:to-white/10 transition-all duration-300 group"
            onClick={() => setSelectedGame('flashcards')}
          >
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full w-fit">
                <BookOpen className="h-8 w-8 text-green-400" />
              </div>
              <CardTitle className="text-xl font-bold text-white group-hover:text-green-300 transition-colors">
                🃏 Flashcards
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-3">
              <p className="text-white/80 text-sm">
                Practice pronunciation with interactive flashcards and speaking challenges.
              </p>
              <div className="space-y-2 text-xs text-white/60">
                <div>🔊 Listen to correct pronunciation</div>
                <div>🎙️ Practice speaking each word</div>
                <div>⭐ Get feedback on your pronunciation</div>
              </div>
              <Button 
                className="w-full mt-4 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-medium"
                onClick={() => setSelectedGame('flashcards')}
              >
                Start Flashcards
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm">
            🎯 Both games use vocabulary from your current lesson progress
          </p>
          <p className="text-white/40 text-xs mt-2">
            Practice speaking and listening to improve your English skills!
          </p>
        </div>
      </div>
    </div>
  );
};