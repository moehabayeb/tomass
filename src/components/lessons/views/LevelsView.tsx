import React from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LEVELS } from '../../../utils/lessons/levelsData';
import { narration } from '@/utils/narration';

interface LevelsViewProps {
  onBack: () => void;
  onSelectLevel: (levelId: string) => void;
}

export function LevelsView({ onBack, onSelectLevel }: LevelsViewProps) {
  const handleLevelSelect = (levelId: string) => {
    narration.cancel();
    onSelectLevel(levelId);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'hsl(var(--app-bg))' }}>
      <div className="relative z-10 p-4 max-w-sm mx-auto">
        {/* Header */}
        <div className="rounded-3xl p-6 mb-6 mt-safe border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 rounded-full min-h-[44px] min-w-[44px]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <h1 className="text-lg font-bold text-white">Choose Your Level</h1>
            <div className="w-11"></div>
          </div>
        </div>

        {/* Levels Grid */}
        <div className="space-y-4">
          {LEVELS.map((level) => (
            <Card 
              key={level.id} 
              className="bg-white/10 border-white/20 cursor-pointer transition-all hover:bg-white/15"
              onClick={() => handleLevelSelect(level.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full ${level.color} flex items-center justify-center flex-shrink-0`}>
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{level.name}</h3>
                    <p className="text-white/70 text-sm">{level.description}</p>
                    <p className="text-white/70 text-xs">{level.moduleCount} modules</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}