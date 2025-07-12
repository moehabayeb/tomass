import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, BookOpen, Target, Trophy, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Lottie from 'lottie-react';
import { supabase } from '@/integrations/supabase/client';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

// Simple confetti animation data (placeholder)
const confettiAnimation = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 120,
  w: 400,
  h: 400,
  nm: "Confetti",
  ddd: 0,
  assets: [],
  layers: [],
  markers: []
};

const A1Lessons = [
  "The Verb 'To Be' (Present)",
  "The Verb 'To Be' - Negative Sentences",
  "The Verb 'To Be' - Questions and Short Answers",
  "Contractions (I'm, you're, etc.)",
  "Personal Pronouns",
  "Articles (a, an, the)",
];

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
    title: "The Verb 'To Be' - Negative Sentences",
    description: "Learn how to make negative sentences with 'to be'",
    lesson: "To make negative sentences with 'to be', we add 'not' after the verb.\n\n✓ I am not tired\n✓ She is not (isn't) ready\n✓ They are not (aren't) here\n\nWe can use contractions: isn't, aren't\nNote: 'I am not' doesn't contract to 'I amn't'",
    exercises: [
      {
        question: "Choose the correct negative form: I ___ not tired.",
        options: ["am", "isn't", "aren't"],
        correct: 0,
        explanation: "With 'I', we use 'am not' for negatives. We don't contract 'am not' to 'amn't'."
      },
      {
        question: "Select the right negative: She ___ ready yet.",
        options: ["am not", "isn't", "aren't"],
        correct: 1,
        explanation: "'She isn't' or 'She is not' - both are correct for third person singular negatives."
      },
      {
        question: "Complete the negative sentence: We ___ late for class.",
        options: ["am not", "isn't", "aren't"],
        correct: 2,
        explanation: "'We aren't' or 'We are not' - use 'aren't' for plural subjects."
      }
    ]
  },
  {
    id: 3,
    title: "The Verb 'To Be' - Questions and Short Answers",
    description: "Learn to form questions and give short answers with 'to be'",
    lesson: "To make questions with 'to be', we put the verb before the subject.\n\n✓ Am I right?\n✓ Is she happy?\n✓ Are they coming?\n\nShort answers use the auxiliary verb:\n- Yes, I am. / No, I'm not.\n- Yes, she is. / No, she isn't.\n- Yes, they are. / No, they aren't.",
    exercises: [
      {
        question: "Form a question: ___ you ready?",
        options: ["Am", "Is", "Are"],
        correct: 2,
        explanation: "In questions, we invert the subject and verb: 'Are you ready?'"
      },
      {
        question: "What's the correct short answer to 'Is she a teacher?' (Yes)",
        options: ["Yes, she's", "Yes, she is", "Yes, is she"],
        correct: 1,
        explanation: "Short answers use the auxiliary verb: 'Yes, she is' or 'No, she isn't'."
      },
      {
        question: "Choose the question form: ___ they from Spain?",
        options: ["Am", "Is", "Are"],
        correct: 2,
        explanation: "For plural subjects like 'they', we use 'Are they from Spain?'"
      }
    ]
  },
  {
    id: 4,
    title: "Contractions (I'm, you're, etc.)",
    description: "Master common contractions with 'to be'",
    lesson: "Contractions make speaking more natural by combining words.\n\n✓ I am → I'm\n✓ You are → You're\n✓ He is → He's\n✓ She is → She's\n✓ It is → It's\n✓ We are → We're\n✓ They are → They're\n\nThe apostrophe (') replaces the missing letters!",
    exercises: [
      {
        question: "What's the contraction for 'I am'?",
        options: ["I'm", "I's", "Im"],
        correct: 0,
        explanation: "'I am' contracts to 'I'm'. The apostrophe replaces the 'a' in 'am'."
      },
      {
        question: "Choose the correct contraction: 'She is happy' = ___",
        options: ["She'm happy", "She's happy", "Shes happy"],
        correct: 1,
        explanation: "'She is' contracts to 'She's'. The apostrophe replaces the 'i' in 'is'."
      },
      {
        question: "What's the contraction for 'They are students'?",
        options: ["They'm students", "They's students", "They're students"],
        correct: 2,
        explanation: "'They are' contracts to 'They're'. The apostrophe replaces the 'a' in 'are'."
      }
    ]
  },
  {
    id: 5,
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
    id: 6,
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

// A2 Grammar Topics
const a2GrammarTopics = [
  {
    id: 7,
    title: "Simple Past Tense",
    description: "Learn how to talk about completed actions in the past",
    lesson: "The simple past tense is used for completed actions in the past.\n\n✓ Regular verbs: add -ed (walk → walked)\n✓ Irregular verbs: memorize forms (go → went)\n✓ Questions: Did + subject + base verb?\n✓ Negatives: didn't + base verb\n\nExamples:\n- I walked to school yesterday.\n- She didn't eat breakfast.\n- Did you see the movie?",
    exercises: [
      {
        question: "Complete: Yesterday, I ___ to the store.",
        options: ["walk", "walked", "walking"],
        correct: 1,
        explanation: "Use 'walked' for a completed past action"
      },
      {
        question: "Choose the correct negative: She ___ watch TV last night.",
        options: ["didn't", "doesn't", "don't"],
        correct: 0,
        explanation: "Use 'didn't' for past tense negatives"
      },
      {
        question: "Form a question: ___ you ___ your homework?",
        options: ["Do/finish", "Did/finish", "Did/finished"],
        correct: 1,
        explanation: "Use 'Did + base verb' for past tense questions"
      }
    ]
  },
  {
    id: 8,
    title: "Past Continuous Tense",
    description: "Express ongoing actions in the past",
    lesson: "Past continuous shows actions that were in progress at a specific time in the past.\n\n✓ Form: was/were + verb-ing\n✓ Use 'was' with I/he/she/it\n✓ Use 'were' with you/we/they\n\nExamples:\n- I was reading when you called.\n- They were playing football at 3 PM.\n- What were you doing yesterday?",
    exercises: [
      {
        question: "Complete: At 8 PM, I ___ dinner.",
        options: ["was eating", "were eating", "ate"],
        correct: 0,
        explanation: "Use 'was eating' for ongoing past action with 'I'"
      },
      {
        question: "Choose: They ___ when it started to rain.",
        options: ["was playing", "were playing", "played"],
        correct: 1,
        explanation: "Use 'were playing' with 'they' for ongoing past action"
      },
      {
        question: "What ___ you ___ at midnight?",
        options: ["was/doing", "were/doing", "did/do"],
        correct: 1,
        explanation: "Use 'were you doing' for past continuous questions"
      }
    ]
  },
  {
    id: 9,
    title: "Comparative and Superlative",
    description: "Compare things and express extremes",
    lesson: "Use comparatives to compare two things, superlatives for three or more.\n\n✓ Short adjectives: add -er/-est (tall → taller → tallest)\n✓ Long adjectives: more/most + adjective (beautiful → more beautiful → most beautiful)\n✓ Irregular forms: good → better → best, bad → worse → worst\n\nExamples:\n- This book is more interesting than that one.\n- She is the tallest in the class.",
    exercises: [
      {
        question: "Complete: This car is ___ than that one.",
        options: ["fast", "faster", "fastest"],
        correct: 1,
        explanation: "Use 'faster' to compare two cars"
      },
      {
        question: "Choose: She is the ___ student in class.",
        options: ["more intelligent", "most intelligent", "intelligenter"],
        correct: 1,
        explanation: "Use 'most intelligent' for superlative with long adjectives"
      },
      {
        question: "Which is correct for comparing two books?",
        options: ["This book is good", "This book is better", "This book is best"],
        correct: 1,
        explanation: "Use 'better' to compare two things"
      }
    ]
  },
  {
    id: 10,
    title: "Present Perfect Tense",
    description: "Connect past actions to the present",
    lesson: "Present perfect connects past actions to now.\n\n✓ Form: have/has + past participle\n✓ Use 'have' with I/you/we/they\n✓ Use 'has' with he/she/it\n✓ Common uses: experience, unfinished time, recent past\n\nExamples:\n- I have visited Paris. (experience)\n- She has lived here for 5 years. (unfinished time)\n- They have just arrived. (recent past)",
    exercises: [
      {
        question: "Complete: I ___ never ___ sushi.",
        options: ["have/eat", "have/eaten", "has/eaten"],
        correct: 1,
        explanation: "Use 'have eaten' for past experience with 'I'"
      },
      {
        question: "Choose: She ___ in London since 2010.",
        options: ["has lived", "have lived", "lived"],
        correct: 0,
        explanation: "Use 'has lived' with 'she' for unfinished time period"
      },
      {
        question: "Form the question: ___ you ___ your homework?",
        options: ["Do/finish", "Have/finished", "Did/finish"],
        correct: 1,
        explanation: "Use 'Have you finished' for present perfect questions"
      }
    ]
  }
];

// Combined topics based on current level
const getTopicsForLevel = (level: string) => {
  if (level === "A1") return grammarTopics;
  if (level === "A2") return a2GrammarTopics;
  return grammarTopics; // default to A1
};

interface GrammarModulesProps {
  onBack: () => void;
}

export default function GrammarModules({ onBack }: GrammarModulesProps) {
  const [width, height] = useWindowSize();
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [showCongrats, setShowCongrats] = useState(false);
  const [availableLevels, setAvailableLevels] = useState<string[]>(["A1"]);
  const [currentLevel, setCurrentLevel] = useState("A1");

  // Load completed modules from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('grammarModulesCompleted');
    if (saved) {
      setCompletedModules(JSON.parse(saved));
    }
  }, []);

  // Check for A1 completion and unlock A2
  useEffect(() => {
    const a1ModuleIds = [1, 2, 3, 4, 5, 6]; // All 6 A1 modules
    const completedA1Modules = completedModules.filter(id => a1ModuleIds.includes(id));
    
    if (completedA1Modules.length === a1ModuleIds.length) {
      // Unlock A2 if not already available
      if (!availableLevels.includes("A2")) {
        setAvailableLevels(prev => [...prev, "A2"]);
      }
      // Show congrats modal if not shown yet
      if (!showCongrats) {
        setShowCongrats(true);
      }
    }
  }, [completedModules, showCongrats, availableLevels]);

  const markModuleComplete = (moduleId: number) => {
    if (!completedModules.includes(moduleId)) {
      const updated = [...completedModules, moduleId];
      setCompletedModules(updated);
      localStorage.setItem('grammarModulesCompleted', JSON.stringify(updated));
    }
  };

  const markLessonComplete = (lessonTitle: string) => {
    const current = JSON.parse(localStorage.getItem("completedA1") || "[]");
    if (!current.includes(lessonTitle)) {
      const updated = [...current, lessonTitle];
      localStorage.setItem("completedA1", JSON.stringify(updated));
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const unlockA2Modules = () => {
    setAvailableLevels((prev) => [...prev, "A2"]);
    setCurrentLevel("A2");
  };

  if (selectedModule !== null) {
    const currentTopics = getTopicsForLevel(currentLevel);
    const selectedTopic = currentTopics.find(m => m.id === selectedModule);
    return (
      <ModulePractice 
        module={selectedTopic!}
        onComplete={() => {
          markModuleComplete(selectedModule);
          // Also keep lesson tracking for backward compatibility
          markLessonComplete(selectedTopic!.title);
        }}
        onBack={() => setSelectedModule(null)}
      />
    );
  }

  const currentTopics = getTopicsForLevel(currentLevel);

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
            <h1 className="text-white font-bold text-xl">Grammar Lessons - {currentLevel}</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
          
          {/* Level Switcher */}
          {availableLevels.length > 1 && (
            <div className="flex justify-center space-x-2 mb-4">
              {availableLevels.map(level => (
                <Button
                  key={level}
                  onClick={() => setCurrentLevel(level)}
                  variant={currentLevel === level ? "default" : "outline"}
                  size="sm"
                  className={currentLevel === level 
                    ? "bg-white text-blue-900 font-bold" 
                    : "bg-white/20 text-white border-white/30 hover:bg-white/30"
                  }
                >
                  {level}
                </Button>
              ))}
            </div>
          )}
          
          <div className="text-center">
            <p className="text-white/80 text-sm">
              Master {currentLevel} grammar step by step
            </p>
            <div className="mt-3 text-white/60 text-xs">
              {completedModules.filter(id => 
                currentLevel === "A1" ? id <= 6 : id > 6
              ).length} / {currentTopics.length} completed
              {currentLevel === "A1" && completedModules.filter(id => id <= 6).length === 6 && (
                <span className="ml-2 text-green-300 font-bold">🎉 A1 Complete!</span>
              )}
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="space-y-4 pb-8">
          {currentTopics.map((topic) => {
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

      {/* Congratulations Modal */}
      {showCongrats && (
        <>
          <Confetti width={width} height={height} numberOfPieces={300} />
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                maxWidth: '400px',
                width: '90%',
                boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                animation: 'pop 0.3s ease-out',
              }}
            >
              <h2 style={{ fontSize: '1.8rem', color: 'green', marginBottom: '1rem' }}>
                🎉 Congratulations!
              </h2>
              <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#333' }}>
                You've completed all A1 grammar lessons.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                  style={{
                    backgroundColor: '#3B82F6',
                    color: 'white',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '10px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setShowCongrats(false);
                    setCurrentLevel("A2");
                    scrollToTop();
                  }}
                >
                  Continue to A2
                </button>
                <button
                  style={{
                    backgroundColor: '#E5E7EB',
                    color: '#111827',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '10px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setShowCongrats(false);
                    setCurrentLevel("A1");
                    scrollToTop();
                  }}
                >
                  Review A1
                </button>
              </div>
            </div>
          </div>
        </>
      )}
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
