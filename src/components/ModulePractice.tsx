import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, RotateCcw, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import SampleAnswerButtonNew from '@/components/SampleAnswerButtonNew';
import { type LearningModule } from '@/data/learningModules';

interface ModulePracticeProps {
  module: LearningModule;
  onBackToModules: () => void;
  onStartChat: (prompt: string, sampleAnswers: string[]) => void;
}

export default function ModulePractice({ module, onBackToModules, onStartChat }: ModulePracticeProps) {
  const [completedPrompts, setCompletedPrompts] = useState<string[]>([]);

  useEffect(() => {
    // Load progress from localStorage
    const progress = localStorage.getItem(`module_progress_${module.id}`);
    if (progress) {
      const parsed = JSON.parse(progress);
      setCompletedPrompts(parsed.completed || []);
    }
  }, [module.id]);

  const markPromptCompleted = (promptId: string) => {
    const newCompleted = [...completedPrompts, promptId];
    setCompletedPrompts(newCompleted);
    
    // Save to localStorage
    const progress = {
      completed: newCompleted,
      total: module.prompts.length,
      lastUpdated: Date.now()
    };
    localStorage.setItem(`module_progress_${module.id}`, JSON.stringify(progress));
  };

  const resetProgress = () => {
    setCompletedPrompts([]);
    localStorage.removeItem(`module_progress_${module.id}`);
  };

  const completionPercentage = Math.round((completedPrompts.length / module.prompts.length) * 100);
  const isModuleCompleted = completedPrompts.length === module.prompts.length;

  const levelColors = {
    beginner: 'from-emerald-400 to-cyan-400',
    intermediate: 'from-blue-400 to-purple-400',
    advanced: 'from-purple-400 to-pink-400'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={onBackToModules}
            className="flex items-center gap-2 hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Modules
          </Button>
          {completedPrompts.length > 0 && (
            <Button 
              variant="outline" 
              onClick={resetProgress}
              className="flex items-center gap-2 bg-white/20 border-white/30 hover:bg-white/30"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Progress
            </Button>
          )}
        </div>

        {/* Module Header */}
        <Card className="border-0 bg-gradient-to-r shadow-elegant overflow-hidden" style={{
          background: `linear-gradient(135deg, ${levelColors[module.level]})`
        }}>
          <CardHeader className="text-white">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl font-bold">{module.title}</CardTitle>
                  <CardDescription className="text-white/90 text-lg mt-2">
                    {module.description}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {module.level.charAt(0).toUpperCase() + module.level.slice(1)}
                </Badge>
              </div>
              
              {/* Progress Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress: {completedPrompts.length}/{module.prompts.length} prompts</span>
                  <span>{completionPercentage}% complete</span>
                </div>
                <Progress value={completionPercentage} className="bg-white/20" />
                {isModuleCompleted && (
                  <div className="flex items-center gap-2 text-white font-medium">
                    <CheckCircle className="h-5 w-5" />
                    Module Completed! 🎉
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Instructions */}
        <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-primary mt-1" />
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">How to Practice</h3>
                <p className="text-muted-foreground">
                  Click on any prompt below to start speaking practice. You can view sample answers for guidance, 
                  then record your own response. The AI will provide feedback and ask follow-up questions to keep the conversation flowing naturally.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prompts Grid */}
        <div className="grid gap-4">
          {module.prompts.map((prompt, index) => {
            const isCompleted = completedPrompts.includes(prompt.id);
            
            return (
              <Card 
                key={prompt.id}
                className={`border-0 shadow-soft transition-all duration-300 hover:shadow-elegant ${
                  isCompleted 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white/60 backdrop-blur-sm hover:scale-[1.01]'
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          #{index + 1}
                        </Badge>
                        {isCompleted && <CheckCircle className="h-5 w-5 text-green-500" />}
                      </div>
                      <CardTitle className="text-lg text-foreground">
                        {prompt.text}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <SampleAnswerButtonNew 
                      sampleAnswers={prompt.sampleAnswers}
                      variant="outline"
                      className="bg-white/50 hover:bg-white/70"
                    />
                    <Button
                      onClick={() => {
                        onStartChat(prompt.text, prompt.sampleAnswers);
                        if (!isCompleted) {
                          markPromptCompleted(prompt.id);
                        }
                      }}
                      className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    >
                      {isCompleted ? 'Practice Again' : 'Start Speaking'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Completion Message */}
        {isModuleCompleted && (
          <Card className="border-0 bg-gradient-to-r from-green-100 to-emerald-100 shadow-elegant">
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <div className="text-6xl">🎉</div>
                <div>
                  <h3 className="text-2xl font-bold text-green-800">Congratulations!</h3>
                  <p className="text-green-700 mt-2">
                    You've completed all prompts in the {module.title} module. 
                    Keep practicing by repeating prompts or exploring other modules!
                  </p>
                </div>
                <Button 
                  onClick={onBackToModules}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Explore More Modules
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}