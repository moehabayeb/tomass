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

        {/* Instructions - Friendly Tutor Style */}
        <Card className="border-0 bg-gradient-to-r from-blue-50 to-cyan-50 shadow-soft rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-primary mt-1" />
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">🎯 Your Learning Journey</h3>
                <p className="text-muted-foreground text-sm">
                  I'm here to help you practice speaking! Choose any topic below to start a conversation. 
                  Don't worry about making mistakes - that's how we learn! I'll give you gentle feedback and ask follow-up questions to keep our chat flowing naturally.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prompts List - One at a Time Flow */}
        <div className="space-y-4">
          {module.prompts.map((prompt, index) => {
            const isCompleted = completedPrompts.includes(prompt.id);
            const isCurrentPrompt = index === 0 || completedPrompts.includes(module.prompts[index - 1]?.id);
            const isLocked = index > 0 && !completedPrompts.includes(module.prompts[index - 1]?.id);
            
            return (
              <Card 
                key={prompt.id}
                className={`border-0 shadow-soft transition-all duration-300 rounded-2xl ${
                  isCompleted 
                    ? 'bg-green-50 border-green-200' 
                    : isLocked
                    ? 'bg-gray-50 opacity-60'
                    : 'bg-white/70 backdrop-blur-md hover:shadow-elegant hover:scale-[1.01]'
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={`px-2 py-1 text-xs ${
                          isCompleted ? 'bg-green-100 text-green-700 border-green-300' :
                          isLocked ? 'bg-gray-100 text-gray-500 border-gray-300' :
                          'bg-primary/10 text-primary border-primary/20'
                        }`}>
                          #{index + 1}
                        </Badge>
                        {isCompleted && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {isLocked && <span className="text-gray-400 text-xs">🔒 Complete previous task first</span>}
                      </div>
                      <CardTitle className={`text-lg ${isLocked ? 'text-gray-400' : 'text-foreground'}`}>
                        {prompt.text}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4 pt-0">
                  {!isLocked && (
                    <div className="flex items-center gap-3">
                      <SampleAnswerButtonNew 
                        sampleAnswers={prompt.sampleAnswers}
                        variant="outline"
                        className="bg-white/50 hover:bg-white/80 text-xs"
                      />
                      <Button 
                        onClick={() => {
                          onStartChat(prompt.text, prompt.sampleAnswers);
                          if (!isCompleted) {
                            markPromptCompleted(prompt.id);
                          }
                        }}
                        className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300 text-sm py-2"
                        disabled={isLocked}
                      >
                        {isCompleted ? '🔄 Practice Again' : '🎤 Start Speaking'}
                      </Button>
                    </div>
                  )}
                  
                  {isLocked && (
                    <div className="text-center py-2">
                      <p className="text-gray-500 text-sm">Complete the previous speaking task to unlock this one! 😊</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Completion Celebration - Motivational */}
        {isModuleCompleted && (
          <Card className="border-0 bg-gradient-to-r from-green-100 to-emerald-100 shadow-elegant rounded-2xl">
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <div className="text-5xl">🎉</div>
                <div>
                  <h3 className="text-2xl font-bold text-green-800">Amazing Work!</h3>
                  <p className="text-green-700 mt-2 text-sm">
                    You've completed all speaking tasks in the <strong>{module.title}</strong> module! 
                    Your English speaking skills are getting stronger every day. 
                    Keep exploring more modules to continue your learning journey! 🌟
                  </p>
                </div>
                <Button 
                  onClick={onBackToModules}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 text-sm"
                >
                  🚀 Explore More Modules
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}