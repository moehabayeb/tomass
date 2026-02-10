import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, BookOpen, Lock, Trophy, CheckCircle, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
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
  // Phase 3.2: Accessibility announcement for screen readers
  const [accessibilityAnnouncement, setAccessibilityAnnouncement] = useState('');

  useEffect(() => {
    setCompletedModules(getCompletedModules());
  }, []);

  let modules = MODULES_BY_LEVEL[selectedLevel] || [];

  // Apple Store Compliance: Silent operation

  if (selectedLevel === 'B2') {
    // Apple Store Compliance: Silent operation

    // NUCLEAR OPTION: If somehow less than 18, force it
    if (modules.length < 18) {
      // Apple Store Compliance: Silent fail - regenerating fallback
      // Force regenerate to guarantee 18 modules
      modules = Array.from({ length: 18 }, (_, i) => ({
        id: i + 151,
        title: `B2 Module ${i + 151} (Fallback)`,
        description: 'Module data loading...',
        completed: false,
        locked: false
      }));
      // Apple Store Compliance: Silent operation
    }
  }

  const handleModuleSelect = (moduleId: number) => {
    const isUnlocked = isModuleUnlocked(moduleId, completedModules);
    const isImplemented = (moduleId >= 1 && moduleId <= 50) ||
                          (moduleId >= 51 && moduleId <= 100) ||
                          (moduleId >= 101 && moduleId <= 150) ||
                          (moduleId >= 151 && moduleId <= 200) ||
                          (moduleId >= 201 && moduleId <= 213);

    // Show locked module feedback
    if (!isUnlocked) {
      const previousModuleId = moduleId - 1;
      // Phase 3.2: Announce to screen readers
      setAccessibilityAnnouncement(`Module ${moduleId} is locked. Complete Module ${previousModuleId} first to unlock this module.`);
      toast.error(`Module ${moduleId} is Locked 🔒`, {
        description: `Complete Module ${previousModuleId} first to unlock this module`,
        duration: 3000,
      });
      return;
    }

    if (isUnlocked && isImplemented) {
      // Phase 3.2: Announce module loading to screen readers
      const module = modules.find(m => m.id === moduleId);
      setAccessibilityAnnouncement(`Loading ${module?.title || `Module ${moduleId}`}. Please wait.`);
      narration.cancel();
      onSelectModule(moduleId);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'hsl(var(--app-bg))' }}>
      <div className="relative z-10 p-4 max-w-sm mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-b from-white/15 to-white/5 rounded-3xl p-6 mb-6 mt-safe">
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
                                  (module.id >= 151 && module.id <= 200) ||
                                  (module.id >= 201 && module.id <= 213);
              const isCompleted = completedModules.includes(`module-${module.id}`);
              const previousModuleId = module.id - 1;

              const cardContent = (
                <Card
                  key={module.id}
                  className={`
                    bg-white/10 border-white/20 transition-all
                    ${!isUnlocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-white/15 hover:scale-[1.02]'}
                    ${isCompleted ? 'border-green-500/40' : ''}
                    ${isUnlocked && !isCompleted ? 'border-blue-500/40' : ''}
                  `}
                  onClick={() => handleModuleSelect(module.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
                        ${!isUnlocked ? 'bg-gray-500/20' : isCompleted ? 'bg-green-500/20' : 'bg-blue-500/20'}
                      `}>
                        {!isUnlocked ? (
                          <Lock className="h-6 w-6 text-gray-400" />
                        ) : isCompleted ? (
                          <Trophy className="h-6 w-6 text-yellow-400 animate-pulse" />
                        ) : (
                          <BookOpen className="h-6 w-6 text-blue-400" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`font-semibold text-sm ${isUnlocked ? 'text-white' : 'text-white/50'}`}>
                            {module.title}
                          </h3>
                          {isCompleted && (
                            <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-300 border-green-500/30">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Complete
                            </Badge>
                          )}
                          {!isUnlocked && (
                            <Badge variant="outline" className="text-xs bg-gray-500/20 text-gray-300 border-gray-500/30">
                              <Lock className="h-3 w-3 mr-1" />
                              Locked
                            </Badge>
                          )}
                          {!isImplemented && <Badge variant="outline" className="text-xs">Coming Soon</Badge>}
                        </div>
                        <p className={`text-xs line-clamp-2 ${isUnlocked ? 'text-white/70' : 'text-white/70'}`}>
                          {module.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );

              // Wrap locked modules with tooltip
              if (!isUnlocked) {
                return (
                  <TooltipProvider key={module.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {cardContent}
                      </TooltipTrigger>
                      <TooltipContent className="bg-gray-900 text-white border-gray-700">
                        <p className="font-semibold">🔒 Module Locked</p>
                        <p className="text-sm">Complete Module {previousModuleId} to unlock</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              }

              return cardContent;
            })
          )}
        </div>

        {/* Phase 3.2: Accessibility - Screen reader announcements */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {accessibilityAnnouncement}
        </div>
      </div>
    </div>
  );
}