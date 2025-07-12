import { useState } from 'react';
import { ArrowLeft, BookOpen, Users, Target, ChevronRight, CheckCircle, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { learningModules, getLevelModules, type LearningModule } from '@/data/learningModules';

interface LearningPathsProps {
  onModuleSelect: (module: LearningModule) => void;
  onBackToChat: () => void;
}

const levelInfo = {
  beginner: {
    title: 'Beginner',
    description: 'Build confidence with everyday conversations',
    icon: BookOpen,
    color: 'from-emerald-400 to-cyan-400',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700'
  },
  intermediate: {
    title: 'Intermediate', 
    description: 'Navigate real-world situations with ease',
    icon: Users,
    color: 'from-blue-400 to-purple-400',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700'
  },
  advanced: {
    title: 'Advanced',
    description: 'Express complex ideas and engage in debates',
    icon: Target,
    color: 'from-purple-400 to-pink-400',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700'
  }
};

export default function LearningPaths({ onModuleSelect, onBackToChat }: LearningPathsProps) {
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced' | null>(null);

  const getModuleProgress = (moduleId: string) => {
    const progress = localStorage.getItem(`module_progress_${moduleId}`);
    return progress ? JSON.parse(progress) : { completed: [], total: 0 };
  };

  const isModuleCompleted = (moduleId: string) => {
    const progress = getModuleProgress(moduleId);
    const module = learningModules.find(m => m.id === moduleId);
    return progress.completed.length === module?.prompts.length;
  };

  const getCompletionPercentage = (moduleId: string) => {
    const progress = getModuleProgress(moduleId);
    const module = learningModules.find(m => m.id === moduleId);
    if (!module) return 0;
    return Math.round((progress.completed.length / module.prompts.length) * 100);
  };

  if (selectedLevel) {
    const modules = getLevelModules(selectedLevel);
    const levelData = levelInfo[selectedLevel];
    const LevelIcon = levelData.icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedLevel(null)}
              className="flex items-center gap-2 hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Levels
            </Button>
            <Button 
              variant="outline" 
              onClick={onBackToChat}
              className="bg-white/20 border-white/30 hover:bg-white/30"
            >
              Free Chat
            </Button>
          </div>

          {/* Level Header */}
          <Card className="border-0 bg-gradient-to-r shadow-elegant overflow-hidden" style={{
            background: `linear-gradient(135deg, ${levelData.color.split(' ')[1]}, ${levelData.color.split(' ')[3]})`
          }}>
            <CardHeader className="text-white">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <LevelIcon className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">{levelData.title} Level</CardTitle>
                  <CardDescription className="text-white/90 text-lg">
                    {levelData.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Modules Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {modules.map((module) => {
              const completionPercentage = getCompletionPercentage(module.id);
              const isCompleted = isModuleCompleted(module.id);
              
              return (
                <Card 
                  key={module.id}
                  className="group cursor-pointer border-0 bg-white/70 backdrop-blur-md shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] overflow-hidden rounded-2xl"
                  onClick={() => onModuleSelect(module)}
                >
                  <CardHeader className="relative pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">💬</span>
                          <CardTitle className="text-lg font-bold text-foreground">
                            {module.title}
                          </CardTitle>
                          {isCompleted && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <CardDescription className="text-muted-foreground text-sm">
                          {module.description}
                        </CardDescription>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3 pt-0">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        🎯 {module.prompts.length} speaking tasks
                      </span>
                      <Badge variant="secondary" className="bg-primary/10 text-primary text-xs px-2 py-0.5">
                        {completionPercentage}% done
                      </Badge>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-muted/50 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-500 rounded-full"
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                    
                    <div className="flex items-center gap-2 text-primary">
                      <Play className="h-3 w-3" />
                      <span className="text-xs font-medium">
                        {isCompleted ? 'Practice Again' : 'Start Learning'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={onBackToChat}
              className="bg-white/20 border-white/30 hover:bg-white/30"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Free Chat
            </Button>
            <div></div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Learning Paths
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose your level and follow structured modules to improve your English speaking skills
            </p>
          </div>
        </div>

        {/* Level Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {Object.entries(levelInfo).map(([level, info]) => {
            const LevelIcon = info.icon;
            const levelModules = getLevelModules(level as 'beginner' | 'intermediate' | 'advanced');
            const totalCompleted = levelModules.filter(module => isModuleCompleted(module.id)).length;
            
            return (
              <Card 
                key={level}
                className="group cursor-pointer border-0 bg-white/70 backdrop-blur-md shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] overflow-hidden rounded-2xl"
                onClick={() => setSelectedLevel(level as 'beginner' | 'intermediate' | 'advanced')}
              >
                <CardHeader className="relative pb-3">
                  <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-5 rounded-2xl`} />
                  <div className="relative z-10 text-center space-y-3">
                    <div className={`mx-auto w-12 h-12 ${info.bgColor} rounded-xl flex items-center justify-center`}>
                      <LevelIcon className={`h-6 w-6 ${info.textColor}`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold">{info.title}</CardTitle>
                      <CardDescription className="text-muted-foreground mt-1 text-sm">
                        {info.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="text-center space-y-3 pt-0">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">🎯 {levelModules.length} modules</span>
                      <Badge variant="secondary" className="bg-primary/10 text-primary text-xs px-2 py-0.5">
                        {totalCompleted}/{levelModules.length} done
                      </Badge>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-muted/50 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-500 rounded-full"
                        style={{ width: `${levelModules.length > 0 ? (totalCompleted / levelModules.length) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <span className="text-xs font-medium">Explore Modules</span>
                    <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}