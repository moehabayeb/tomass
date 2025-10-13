import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Lock, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MODULES_BY_LEVEL } from '../../../utils/lessons/moduleData';
import { LevelType } from '../../../utils/lessons/levelsData';
import { getCompletedModules, isModuleUnlocked } from '../../../utils/lessons/moduleUnlocking';
import { narration } from '@/utils/narration';

interface ModulesViewProps {
  selectedLevel: LevelType;
  onBack: () => void;
  onSelectModule: (moduleId: number) => void;
}

export function ModulesView({ selectedLevel, onBack, onSelectModule }: ModulesViewProps) {
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  useEffect(() => {
    setCompletedModules(getCompletedModules());
  }, []);

  let modules = MODULES_BY_LEVEL[selectedLevel] || [];

  // NUCLEAR DEBUG LOGGING
  console.log(`📊 ModulesView rendered for level: ${selectedLevel}`);
  console.log(`📊 Raw MODULES_BY_LEVEL[${selectedLevel}]:`, MODULES_BY_LEVEL[selectedLevel]);
  console.log(`📊 Modules length: ${modules.length}`);

  if (selectedLevel === 'B2') {
    console.log('🔍 B2 MODULES DEBUG:');
    console.log('Total B2 modules:', modules.length);
    console.log('Module IDs:', modules.map(m => m.id));
    console.log('First module:', modules[0]?.title);
    console.log('Last module:', modules[modules.length - 1]?.title);

    // NUCLEAR OPTION: If somehow less than 18, force it
    if (modules.length < 18) {
      console.error('🚨 CRITICAL: B2 modules array has only', modules.length, 'modules! Expected 18!');
      console.error('🚨 FORCING fallback generation...');
      // Force regenerate to guarantee 18 modules
      modules = Array.from({ length: 18 }, (_, i) => ({
        id: i + 151,
        title: `B2 Module ${i + 151} (Fallback)`,
        description: 'Module data loading...',
        completed: false,
        locked: false
      }));
      console.log('✅ Generated fallback modules:', modules.map(m => m.id));
    }
  }

  const handleModuleSelect = (moduleId: number) => {
    const isUnlocked = isModuleUnlocked(moduleId, completedModules);
    
    if (isUnlocked && (
      (moduleId >= 1 && moduleId <= 50) ||
      (moduleId >= 51 && moduleId <= 100) ||
      (moduleId >= 101 && moduleId <= 150) ||
      (moduleId >= 151 && moduleId <= 168)
    )) {
      narration.cancel();
      onSelectModule(moduleId);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'hsl(var(--app-bg))' }}>
      <div className="relative z-10 p-4 max-w-sm mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-6 mb-6 mt-safe-area-inset-top">
          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="text-center">
              <h1 className="text-lg font-bold text-white">{selectedLevel} Modules</h1>
              <p className="text-sm text-white/70">Choose a module to start</p>
            </div>
            <div className="w-10"></div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="space-y-3">
          {modules.length === 0 ? (
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-8 text-center">
                <div className="text-white/70 space-y-2">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-white/50" />
                  <h3 className="text-lg font-semibold text-white">Content Coming Soon</h3>
                  <p className="text-sm">
                    {selectedLevel} modules are currently being developed. Please check back later or try A1 level.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            modules.map((module) => {
              const isUnlocked = isModuleUnlocked(module.id, completedModules);
              const isImplemented = (module.id >= 1 && module.id <= 50) ||
                                  (module.id >= 51 && module.id <= 100) ||
                                  (module.id >= 101 && module.id <= 150) ||
                                  (module.id >= 151 && module.id <= 168);
              const isCompleted = completedModules.includes(`module-${module.id}`);

              return (
                <Card
                  key={module.id}
                  className={`bg-white/10 border-white/20 cursor-pointer transition-all hover:bg-white/15 ${!isUnlocked ? 'opacity-50' : ''}`}
                  onClick={() => handleModuleSelect(module.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        {!isUnlocked ? (
                          <Lock className="h-6 w-6 text-white/50" />
                        ) : isCompleted ? (
                          <Trophy className="h-6 w-6 text-yellow-400" />
                        ) : (
                          <BookOpen className="h-6 w-6 text-white/80" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-white text-sm">{module.title}</h3>
                          {isCompleted && <Badge variant="secondary" className="text-xs">Complete</Badge>}
                          {!isImplemented && <Badge variant="outline" className="text-xs">Coming Soon</Badge>}
                        </div>
                        <p className="text-white/70 text-xs line-clamp-2">{module.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}