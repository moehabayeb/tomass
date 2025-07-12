import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, BookOpen, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// A1 Grammar Topics
const grammarTopics = [
  {
    id: 1,
    title: "The Verb 'To Be' (Present)",
    description: "Learn how to use am, is, and are correctly",
    lesson: "The verb 'to be' is one of the most important verbs in English.\n\n✓ Use 'am' with 'I' (I am happy)\n✓ Use 'is' with he/she/it (She is a teacher)\n✓ Use 'are' with you/we/they (They are students)\n\nThis verb helps us describe people, places, and things!",
    exercises: [
      {
        question: "Complete: I ___ happy today.",
        options: ["am", "is", "are"],
        correct: 0,
        explanation: "Use 'am' with 'I'"
      },
      {
        question: "Complete: She ___ a teacher.",
        options: ["am", "is", "are"],
        correct: 1,
        explanation: "Use 'is' with 'she'"
      },
      {
        question: "Complete: They ___ students.",
        options: ["am", "is", "are"],
        correct: 2,
        explanation: "Use 'are' with 'they'"
      }
    ]
  },
  {
    id: 2,
    title: "Personal Pronouns",
    description: "Master I, you, he, she, it, we, they",
    lesson: "Personal pronouns replace nouns to avoid repetition.\n\n📝 Subject pronouns: I, you, he, she, it, we, they\n📝 Object pronouns: me, you, him, her, it, us, them\n\nExample: John likes pizza → He likes pizza",
    exercises: [
      {
        question: "Replace 'John': ___ is my friend.",
        options: ["He", "She", "It"],
        correct: 0,
        explanation: "John is male, so use 'He'"
      },
      {
        question: "Replace 'the book': ___ is interesting.",
        options: ["He", "She", "It"],
        correct: 2,
        explanation: "Books are things, so use 'It'"
      },
      {
        question: "Replace 'my sister and I': ___ like pizza.",
        options: ["We", "They", "You"],
        correct: 0,
        explanation: "Including yourself, use 'We'"
      }
    ]
  },
  {
    id: 3,
    title: "Articles (a, an, the)",
    description: "When to use a, an, and the correctly",
    lesson: "Articles help us specify nouns.\n\n🔹 Use 'a' before consonant sounds (a car, a house)\n🔹 Use 'an' before vowel sounds (an apple, an elephant)\n🔹 Use 'the' for specific things (the sun, the book on the table)\n\nTip: It's about the SOUND, not just the letter!",
    exercises: [
      {
        question: "Choose: I have ___ apple.",
        options: ["a", "an", "the"],
        correct: 1,
        explanation: "Apple starts with a vowel sound, so use 'an'"
      },
      {
        question: "Choose: ___ sun is bright today.",
        options: ["A", "An", "The"],
        correct: 2,
        explanation: "There's only one sun, so use 'the'"
      },
      {
        question: "Choose: She bought ___ car.",
        options: ["a", "an", "the"],
        correct: 0,
        explanation: "Car starts with a consonant sound, so use 'a'"
      }
    ]
  }
];

interface GrammarModulesProps {
  onBack: () => void;
}

export default function GrammarModules({ onBack }: GrammarModulesProps) {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  // Load completed modules from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('grammarModulesCompleted');
    if (saved) {
      setCompletedModules(JSON.parse(saved));
    }
  }, []);

  const markModuleComplete = (moduleId: number) => {
    const updated = [...completedModules, moduleId];
    setCompletedModules(updated);
    localStorage.setItem('grammarModulesCompleted', JSON.stringify(updated));
  };

  if (selectedModule !== null) {
    return (
      <ModulePractice 
        module={grammarTopics.find(m => m.id === selectedModule)!}
        onComplete={() => markModuleComplete(selectedModule)}
        onBack={() => setSelectedModule(null)}
      />
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'hsl(var(--app-bg))' }}>
      <div className="relative z-10 p-4 max-w-sm mx-auto">
        {/* Header */}
        <div 
          className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-6 mb-6 mt-safe-area-inset-top"
          style={{ boxShadow: 'var(--shadow-medium), inset 0 1px 0 rgba(255,255,255,0.1)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-white font-bold text-xl">Grammar Lessons</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
          
          <div className="text-center">
            <p className="text-white/80 text-sm">
              Master A1 grammar step by step
            </p>
            <div className="mt-3 text-white/60 text-xs">
              {completedModules.length} / {grammarTopics.length} completed
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="space-y-4 pb-8">
          {grammarTopics.map((topic) => {
            const isCompleted = completedModules.includes(topic.id);
            
            return (
              <Card 
                key={topic.id}
                className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/25 transition-all duration-300 cursor-pointer hover:scale-[1.02] shadow-lg"
                onClick={() => setSelectedModule(topic.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5 text-blue-200" />
                      {isCompleted && <CheckCircle className="h-4 w-4 text-green-300" />}
                    </div>
                    <span className="text-white text-lg">📚</span>
                  </div>
                  <CardTitle className="text-white text-lg font-bold leading-tight mt-2">
                    {topic.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-white/90 text-sm mb-4 leading-relaxed">
                    {topic.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-xs font-medium">
                      {topic.exercises.length} exercises
                    </span>
                    {isCompleted ? (
                      <span className="text-green-300 text-xs font-bold bg-green-500/20 px-2 py-1 rounded-full">
                        ✅ Completed
                      </span>
                    ) : (
                      <span className="text-blue-200 text-xs font-bold bg-blue-500/20 px-2 py-1 rounded-full">
                        Start →
                      </span>
                    )}
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

// Module Practice Component
interface ModulePracticeProps {
  module: typeof grammarTopics[0];
  onComplete: () => void;
  onBack: () => void;
}

function ModulePractice({ module, onComplete, onBack }: ModulePracticeProps) {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showLesson, setShowLesson] = useState(true);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // ENHANCED DEBUG LOGGING
  console.log('🚨🚨🚨 MODULEPRACTICE COMPONENT IS LOADING! 🚨🚨🚨');
  console.log('🔍 Module data:', module);
  console.log('🔍 Module exercises:', module?.exercises);
  console.log('🔍 Module lesson length:', module?.lesson?.length);
  console.log('🔍 Show lesson state:', showLesson);

  if (!module || !module.exercises || module.exercises.length === 0) {
    return (
      <div className="min-h-screen bg-red-500 text-white p-4">
        <div>Error: Module data is missing</div>
        <div>Module: {JSON.stringify(module)}</div>
        <Button onClick={onBack} className="mt-4">Go Back</Button>
      </div>
    );
  }

  const exercise = module.exercises[currentExercise];
  const isLastExercise = currentExercise === module.exercises.length - 1;
  const isCorrect = selectedAnswer === exercise?.correct;

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    if (answerIndex === exercise.correct) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastExercise) {
      onComplete();
      onBack();
    } else {
      setCurrentExercise(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setShowLesson(false);
    }
  };

  const startExercises = () => {
    setShowLesson(false);
  };

  if (showLesson) {
    return (
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'hsl(var(--app-bg))' }}>
        {/* SUPER OBVIOUS DEBUG INDICATOR */}
        <div className="bg-red-600 text-white text-center p-2 font-bold">
          🚨 DEBUG: MODULEPRACTICE COMPONENT IS ACTIVE! 🚨
        </div>
        <div className="relative z-10 p-4 max-w-sm mx-auto">
          {/* Header */}
          <div 
            className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-6 mb-6 mt-safe-area-inset-top"
            style={{ boxShadow: 'var(--shadow-medium), inset 0 1px 0 rgba(255,255,255,0.1)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <Button
                onClick={onBack}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <span className="text-white/60 text-sm">📚 Lesson</span>
              <div className="w-10" />
            </div>
            
            <h1 className="text-white font-bold text-lg mb-2 text-center">
              {module.title}
            </h1>
          </div>

          {/* Lesson Content */}
          <Card className="bg-white/20 backdrop-blur-sm border border-white/30 mb-6 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <Target className="h-8 w-8 text-yellow-300 mx-auto mb-2" />
                <h2 className="text-white font-bold text-lg">Let's Learn!</h2>
                {/* Debug info */}
                <div className="text-white/50 text-xs mt-1">
                  Module: {module?.title || 'No module'} | Lesson: {module?.lesson ? 'Found' : 'Missing'}
                </div>
              </div>
              <div className="text-white text-base leading-relaxed whitespace-pre-line bg-white/10 p-4 rounded-xl border border-white/20 min-h-[100px]">
                {module?.lesson || 'No lesson content available'}
              </div>
            </CardContent>
          </Card>

          {/* Start Button */}
          <Button
            onClick={startExercises}
            className="w-full py-6 text-lg font-bold rounded-2xl"
            style={{
              background: 'linear-gradient(45deg, hsl(var(--primary)), hsl(var(--primary-variant)))',
              color: 'white',
              boxShadow: 'var(--shadow-strong)'
            }}
          >
            🎯 Start Practice ({module.exercises.length} questions)
          </Button>
        </div>
      </div>
    );
  }

  // MORE DEBUG LOGGING FOR EXERCISE VIEW
  console.log('🎯 SHOWING EXERCISE VIEW! Current exercise:', currentExercise);
  console.log('🎯 Exercise data:', exercise);
  console.log('🎯 Show explanation:', showExplanation);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'hsl(var(--app-bg))' }}>
      {/* EXERCISE DEBUG INDICATOR */}
      <div className="bg-blue-600 text-white text-center p-2 font-bold">
        🎯 DEBUG: EXERCISE VIEW ACTIVE! Ex: {currentExercise + 1}/{module.exercises.length}
      </div>
      <div className="relative z-10 p-4 max-w-sm mx-auto">
        {/* Header */}
        <div 
          className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-6 mb-6 mt-safe-area-inset-top"
          style={{ boxShadow: 'var(--shadow-medium), inset 0 1px 0 rgba(255,255,255,0.1)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="text-white/60 text-sm">
              {currentExercise + 1} / {module.exercises.length}
            </span>
            <div className="w-10" />
          </div>
          
          <h1 className="text-white font-bold text-lg text-center">
            {module.title}
          </h1>
        </div>

        {/* Exercise Card */}
        <Card className="bg-white backdrop-blur-sm border-white/20 mb-6 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-gray-800 font-semibold text-base mb-2">
                {exercise.question}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-3 mb-6">
              {exercise.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => !showExplanation && handleAnswer(index)}
                  disabled={showExplanation}
                  variant="outline"
                  className={`w-full p-4 text-left justify-start rounded-xl transition-all duration-200 ${
                    showExplanation 
                      ? index === exercise.correct
                        ? 'bg-green-500/20 border-green-400 text-green-800'
                        : selectedAnswer === index && index !== exercise.correct
                        ? 'bg-red-500/20 border-red-400 text-red-800'
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                      : 'bg-gray-50 border-gray-300 text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {option}
                </Button>
              ))}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className={`p-4 rounded-xl mb-4 ${
                isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center mb-2">
                  {isCorrect ? (
                    <span className="text-green-700 text-sm font-medium">✅ Correct!</span>
                  ) : (
                    <span className="text-red-700 text-sm font-medium">❌ Not quite</span>
                  )}
                </div>
                <p className="text-gray-800 text-sm">
                  {exercise.explanation}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Button */}
        {showExplanation && (
          <Button
            onClick={handleNext}
            className="w-full py-6 text-lg font-bold rounded-2xl"
            style={{
              background: 'linear-gradient(45deg, hsl(var(--primary)), hsl(var(--primary-variant)))',
              color: 'white',
              boxShadow: 'var(--shadow-strong)'
            }}
          >
            {isLastExercise ? (
              <>🎉 Complete Module</>
            ) : (
              <>Next Question <ArrowRight className="ml-2 h-5 w-5" /></>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
