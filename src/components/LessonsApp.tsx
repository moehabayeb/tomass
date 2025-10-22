import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { ArrowLeft, Mic, MicOff, Volume2, RefreshCw, Star, CheckCircle, AlertCircle, Lock, BookOpen } from 'lucide-react';
import {
  getProgress, setProgress, clearProgress, ModuleProgress as StoreModuleProgress
} from '../utils/ProgressStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useGamification } from '@/hooks/useGamification';
import { useBadgeSystem } from '@/hooks/useBadgeSystem';
import CanvasAvatar from './CanvasAvatar';
import AnimatedAvatar from './AnimatedAvatar';
import { useAvatarState } from '@/hooks/useAvatarState';
import { supabase } from '@/integrations/supabase/client';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
import { narration } from '@/utils/narration';
// Voice Commands Integration
import { useLessonVoiceCommands } from '../hooks/useVoiceCommands';
import VoiceControls from './lessons/VoiceControls';
import ResumeChip from './lessons/ResumeChip';
import { CelebrationOverlay } from './CelebrationOverlay';
import { LessonAutoReader, type LessonContent, type ReadingProgress } from '@/utils/lessonAutoReader';
import MobileCompactIntro from './MobileCompactIntro';
import { useIsMobile } from '@/hooks/use-mobile';
// Import QA test for browser console access
import '../utils/placementQA';
// Progress checkpointing imports
import { useLessonCheckpoints } from '../hooks/useLessonCheckpoints';
import { ResumeProgressDialog, SyncStatusIndicator } from './ResumeProgressDialog';
// A1, A2, B1 Modules Data (1-150) - Extracted to reduce file size
import {
  MODULE_1_DATA, MODULE_2_DATA, MODULE_3_DATA, MODULE_4_DATA, MODULE_5_DATA,
  MODULE_6_DATA, MODULE_7_DATA, MODULE_8_DATA, MODULE_9_DATA, MODULE_10_DATA,
  MODULE_11_DATA, MODULE_12_DATA, MODULE_13_DATA, MODULE_14_DATA, MODULE_15_DATA,
  MODULE_16_DATA, MODULE_17_DATA, MODULE_18_DATA, MODULE_19_DATA, MODULE_20_DATA,
  MODULE_21_DATA, MODULE_22_DATA, MODULE_23_DATA, MODULE_24_DATA, MODULE_25_DATA,
  MODULE_26_DATA, MODULE_27_DATA, MODULE_28_DATA, MODULE_29_DATA, MODULE_30_DATA,
  MODULE_31_DATA, MODULE_32_DATA, MODULE_33_DATA, MODULE_34_DATA, MODULE_35_DATA,
  MODULE_36_DATA, MODULE_37_DATA, MODULE_38_DATA, MODULE_39_DATA, MODULE_40_DATA,
  MODULE_41_DATA, MODULE_42_DATA, MODULE_43_DATA, MODULE_44_DATA, MODULE_45_DATA,
  MODULE_46_DATA, MODULE_47_DATA, MODULE_48_DATA, MODULE_49_DATA, MODULE_50_DATA,
  MODULE_51_DATA, MODULE_52_DATA, MODULE_53_DATA, MODULE_54_DATA, MODULE_55_DATA,
  MODULE_56_DATA, MODULE_57_DATA, MODULE_58_DATA, MODULE_59_DATA, MODULE_60_DATA,
  MODULE_61_DATA, MODULE_62_DATA, MODULE_63_DATA, MODULE_64_DATA, MODULE_65_DATA,
  MODULE_66_DATA, MODULE_67_DATA,
  MODULE_88_DATA, MODULE_89_DATA, MODULE_90_DATA, MODULE_91_DATA, MODULE_92_DATA,
  MODULE_93_DATA, MODULE_94_DATA, MODULE_95_DATA, MODULE_96_DATA, MODULE_97_DATA,
  MODULE_98_DATA, MODULE_99_DATA, MODULE_100_DATA,
  MODULE_101_DATA, MODULE_102_DATA, MODULE_103_DATA, MODULE_104_DATA, MODULE_105_DATA,
  MODULE_106_DATA, MODULE_107_DATA, MODULE_108_DATA, MODULE_109_DATA, MODULE_110_DATA,
  MODULE_111_DATA, MODULE_112_DATA, MODULE_113_DATA, MODULE_114_DATA, MODULE_115_DATA,
  MODULE_116_DATA, MODULE_117_DATA, MODULE_118_DATA, MODULE_119_DATA, MODULE_120_DATA,
  MODULE_121_DATA, MODULE_122_DATA, MODULE_123_DATA, MODULE_124_DATA, MODULE_125_DATA,
  MODULE_126_DATA, MODULE_127_DATA, MODULE_128_DATA, MODULE_129_DATA, MODULE_130_DATA,
  MODULE_131_DATA, MODULE_132_DATA, MODULE_133_DATA, MODULE_134_DATA, MODULE_135_DATA,
  MODULE_136_DATA, MODULE_137_DATA, MODULE_138_DATA, MODULE_139_DATA, MODULE_140_DATA,
  MODULE_141_DATA, MODULE_142_DATA, MODULE_143_DATA, MODULE_144_DATA, MODULE_145_DATA,
  MODULE_146_DATA, MODULE_147_DATA, MODULE_148_DATA, MODULE_149_DATA, MODULE_150_DATA,
} from './A1A2B1ModulesData';
// B2 Modules Data (151-200)
import { MODULE_151_DATA, MODULE_152_DATA, MODULE_153_DATA, MODULE_154_DATA, MODULE_155_DATA, MODULE_156_DATA, MODULE_157_DATA, MODULE_158_DATA, MODULE_159_DATA, MODULE_160_DATA, MODULE_161_DATA, MODULE_162_DATA, MODULE_163_DATA, MODULE_164_DATA, MODULE_165_DATA, MODULE_166_DATA, MODULE_167_DATA, MODULE_168_DATA, MODULE_169_DATA, MODULE_170_DATA, MODULE_171_DATA, MODULE_172_DATA, MODULE_173_DATA, MODULE_174_DATA, MODULE_175_DATA, MODULE_176_DATA, MODULE_177_DATA, MODULE_178_DATA, MODULE_179_DATA, MODULE_180_DATA, MODULE_181_DATA, MODULE_182_DATA, MODULE_183_DATA, MODULE_184_DATA, MODULE_185_DATA, MODULE_186_DATA, MODULE_187_DATA, MODULE_188_DATA, MODULE_189_DATA, MODULE_190_DATA, MODULE_191_DATA, MODULE_192_DATA, MODULE_193_DATA, MODULE_194_DATA, MODULE_195_DATA, MODULE_196_DATA, MODULE_197_DATA, MODULE_198_DATA, MODULE_199_DATA, MODULE_200_DATA } from './B2ModulesData';

// ---------- Module Order and Next Module Logic ----------
const ORDER_A1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];
const ORDER_A2 = [51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100];
const ORDER_B1 = [101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150];
const ORDER_B2 = [151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200];

function getOrderForLevel(level: 'A1'|'A2'|'B1'|'B2'): number[] {
  if (level === 'A1') return ORDER_A1;
  if (level === 'A2') return ORDER_A2;
  if (level === 'B2') return ORDER_B2;
  return ORDER_B1;
}

function getNextModuleId(level: 'A1'|'A2'|'B1'|'B2', current: number): number | null {
  const order = getOrderForLevel(level);
  const idx = order.indexOf(current);
  if (idx === -1) return null;
  return idx < order.length - 1 ? order[idx + 1] : null;
}

// Enhanced Progress Tracking with ProgressStore Integration
type LessonPhaseType = 'intro' | 'speaking' | 'complete';

// Import enhanced multiple choice types and generator
import { 
  generateMultipleChoiceQuestion, 
  type MultipleChoiceQuestion, 
  validateMultipleChoiceQuestion,
  type MultipleChoiceOption 
} from '../utils/multipleChoiceGenerator';

type SpeakingPracticeItem = {
  question: string;
  answer: string;
  multipleChoice?: MultipleChoiceQuestion;
};

// New phase for multiple choice selection
type EnhancedLessonPhase = LessonPhaseType | 'multiple-choice';

// Question state tracking
type QuestionState = {
  selectedChoice?: 'A' | 'B' | 'C';
  choiceCorrect: boolean;
  speechCompleted: boolean;
};

// Import robust evaluator and progress system
import { evaluateAnswer, evaluateAnswerDetailed, EvalOptions, EvaluationResult, GrammarCorrection } from '../utils/evaluator';
import { save as saveProgress, resumeLastPointer, clearProgress as clearModuleProgress } from '../utils/progress';
import { ProgressTrackerService } from '../services/progressTrackerService';
import { detectGrammarErrors } from '../utils/grammarErrorDetector';
import { useVoiceActivityDetection } from '../hooks/useVoiceActivityDetection';

// Enhanced progress saving with new progress system
function saveModuleProgress(level: string, moduleId: number, phase: LessonPhaseType, questionIndex: number = 0) {
  try {
    // Save to both old and new systems for compatibility
    const progressData: StoreModuleProgress = {
      level: level,
      module: moduleId,
      phase: phase as LessonPhase,
      listeningIndex: 0,
      speakingIndex: questionIndex,
      completed: phase === 'complete',
      totalListening: 0,
      totalSpeaking: 40, // All modules have 40 questions
      updatedAt: Date.now(),
      v: 1
    };
    
    setProgress(progressData);

    // Save to new progress system for exact resume
    const userId = 'guest'; // TODO: get from auth when available
    const total = 40; // All modules have 40 questions
    const correct = Math.min(questionIndex + 1, total); // questions answered correctly so far
    const completed = phase === 'complete';
    
    saveProgress(userId, level, String(moduleId), questionIndex, total, correct, completed);
    
  } catch (error) {
  }
}

// Load progress using ProgressStore
function loadModuleProgress(level: string, moduleId: number): { phase: LessonPhaseType; questionIndex: number } {
  try {
    const progress = getProgress(level, moduleId);
    if (progress) {
      return {
        phase: progress.completed ? 'complete' : (progress.phase as LessonPhaseType) || 'intro',
        questionIndex: progress.speakingIndex || 0
      };
    }
  } catch (error) {
  }
  
  return { phase: 'intro', questionIndex: 0 };
}

function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/["""'.!?]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Helper function to handle backward compatibility with old question format
function isSpeakingPracticeItem(item: any): item is SpeakingPracticeItem {
  return typeof item === 'object' && item.question && item.answer;
}

// Helper function to get speaking practice item with cached MCQ
// NOTE: This will be recreated as useCallback inside component to access mcqCache
function getSpeakingPracticeItemBase(item: any, questionIndex: number, mcqFromCache: MultipleChoiceQuestion | null | undefined): SpeakingPracticeItem {
  if (typeof item === 'string') {
    // Old format - use cached MCQ
    return {
      question: item,
      answer: item,
      multipleChoice: mcqFromCache || undefined
    };
  }

  const practiceItem = item as SpeakingPracticeItem;
  if (!practiceItem.multipleChoice) {
    // Use cached MCQ instead of regenerating
    practiceItem.multipleChoice = mcqFromCache || undefined;
  }

  // Ensure every item has multiple choice
  if (!practiceItem.multipleChoice) {
    console.warn('🚨 No multiple choice in cache for item:', practiceItem, 'index:', questionIndex);
  }

  return practiceItem;
}

interface LessonsAppProps {
  onBack: () => void;
  initialLevel?: string;
  initialModule?: number;
}

type ViewState = 'levels' | 'modules' | 'lesson';
type LessonPhase = 'intro' | 'teacher-reading' | 'speaking' | 'complete';
type SpeakStatus = 'idle'|'prompting'|'recording'|'transcribing'|'evaluating'|'advancing';

// Levels data - TEMPORARILY UNLOCKED FOR DEVELOPMENT
const LEVELS = [
  { id: 'A1', name: 'A1 - Beginner', description: 'Start your English journey', moduleCount: 50, color: 'bg-blue-500' },
  { id: 'A2', name: 'A2 - Elementary', description: 'Build basic skills', moduleCount: 50, color: 'bg-green-500' },
  { id: 'B1', name: 'B1 - Intermediate', description: 'Expand your knowledge', moduleCount: 50, color: 'bg-orange-500' },
  { id: 'B2', name: 'B2 - Upper Intermediate', description: 'Advanced concepts', moduleCount: 50, color: 'bg-purple-500' },
  { id: 'C1', name: 'C1 - Advanced', description: 'Master complex concepts', moduleCount: 50, color: 'bg-red-500' },
  { id: 'C2', name: 'C2 - Proficiency', description: 'Near-native fluency', moduleCount: 50, color: 'bg-indigo-500' },
];

// Modules data for each level - TEMPORARILY UNLOCKED FOR DEVELOPMENT
const MODULES_BY_LEVEL = {
   A1: Array.from({ length: 50 }, (_, i) => ({
     id: i + 1,
     title: i === 0 ? 'Verb To Be - Positive Sentences' : 
            i === 1 ? 'Negative Sentences' : 
            i === 2 ? 'Question Sentences' :
            i === 3 ? 'Subject Pronouns' :
            i === 4 ? 'Object Pronouns' :
            i === 5 ? 'Possessive Adjectives' :
            i === 6 ? 'Possessive Pronouns' :
            i === 7 ? 'This / That / These / Those' :
            i === 8 ? 'Articles (a / an / the)' :
             i === 9 ? 'Plural Nouns – Regular & Irregular' :
              i === 10 ? 'There is / There are – Positive Sentences' :
             i === 11 ? 'Prepositions of Place' :
             i === 12 ? 'Have got / Has got – Negative Sentences' :
              i === 13 ? 'Have got / Has got – Question Sentences' :
              i === 14 ? 'Simple Present – Positive Sentences (I / You / We / They)' :
              i === 15 ? 'Simple Present – Positive Sentences (He / She / It)' :
               i === 16 ? 'Simple Present – Negative Sentences (don\'t / doesn\'t)' :
               i === 17 ? 'Simple Present – Yes/No Questions' :
                i === 18 ? 'Simple Present – Wh- Questions (What, Where, Who, etc.)' :
                i === 19 ? 'Adverbs of Frequency (Sıklık Zarfları)' :
             i === 22 ? 'Can / Can\'t for Abilities' :
             i === 23 ? 'Can / Can\'t for Permission' :
             i === 24 ? 'A lot of / Lots of' :
             i === 25 ? 'How much / How many' :
             i === 26 ? 'Imperatives (Commands, Instructions)' :
             i === 27 ? 'Present Continuous – Affirmative' :
             i === 28 ? 'Present Continuous – Negative' :
             i === 29 ? 'Present Continuous – Questions' :
             i === 30 ? 'Present Simple vs Present Continuous' :
             i === 31 ? 'Like / Love / Hate + -ing' :
             i === 32 ? 'Demonstratives in Sentences' :
             i === 33 ? 'Whose / Possessive \'s' :
             i === 34 ? 'Question Words (Who, What, Where, When, Why, How)' :
             i === 35 ? 'Ordinal Numbers and Dates' :
             i === 36 ? 'Talking about Time (o\'clock, half past, quarter to)' :
             i === 37 ? 'Comparatives (-er / more)' :
             i === 38 ? 'Be Going To (Future Plans)' :
             i === 39 ? 'Would Like / Want' :
             i === 40 ? 'Must / Mustn\'t (Necessity, Prohibition)' :
             i === 41 ? 'Have to / Don\'t Have to (Obligation)' :
             i === 42 ? 'Daily Routines Vocabulary' :
             i === 43 ? 'Jobs and Occupations Vocabulary' :
             i === 44 ? 'Food and Drinks Vocabulary' :
             i === 45 ? 'Family Members Vocabulary' :
             i === 46 ? 'Directions and Places Vocabulary' :
             i === 47 ? 'Weather Vocabulary' :
             i === 48 ? 'Clothes Vocabulary' :
             i === 49 ? 'Hobbies and Free Time Vocabulary' :
             `A1 Module ${i + 1}`,
     description: i === 0 ? 'Learn to use am, is, and are' : 
                  i === 1 ? 'Learn to use "am", "is", and "are" with "not"' :
                  i === 2 ? 'Learn to form questions with "am", "is", and "are"' :
                  i === 3 ? 'Learn to use subject pronouns I, You, He, She, It, We, They' :
                  i === 4 ? 'Understand what object pronouns are and replace nouns with the correct object pronouns' :
                  i === 5 ? 'Learn to use possessive adjectives my, your, his, her, its, our, their' :
                  i === 6 ? 'Understand what possessive pronouns are and distinguish them from possessive adjectives' :
                  i === 7 ? 'Learn to use demonstrative words This, That, These, Those' :
                  i === 8 ? 'Understand the use of indefinite articles a/an and the definite article the' :
                   i === 9 ? 'Learn how to form regular plural nouns and become familiar with common irregular plurals' :
                   i === 10 ? 'Learn to use There is and There are in positive sentences' :
                   i === 11 ? 'Understand and use common prepositions of place to describe location of objects and people' :
                   i === 12 ? 'Learn to use Haven\'t got and Hasn\'t got in negative sentences' :
                   i === 13 ? 'Learn to ask questions with Have got and Has got' :
                   i === 14 ? 'Learn to form positive sentences using Simple Present tense with I, You, We, They' :
                   i === 15 ? 'Learn to form positive sentences using Simple Present tense with He, She, It (+s/es)' :
                    i === 16 ? 'Learn to form negative sentences using Simple Present tense with don\'t and doesn\'t' :
                    i === 17 ? 'Learn to form Yes/No questions using Simple Present tense with Do and Does' :
                     i === 18 ? 'Learn to form Wh- questions using Simple Present tense with What, Where, Who, When, Why, How' :
                     i === 19 ? 'Learn to use adverbs of frequency (always, usually, sometimes, never) in English sentences' :
                     i === 20 ? 'Learn to express abilities and inabilities using can and can\'t' :
                     i === 21 ? 'Learn to ask for and give permission using can and can\'t' :
                     i === 22 ? 'Learn to express likes, loves, and hates with -ing verbs' :
                     i === 23 ? 'Learn the difference between "a lot of" and "lots of" with both countable and uncountable nouns' :
                     i === 24 ? 'Learn the difference between "How much" (uncountable) and "How many" (countable)' :
                     i === 25 ? 'Understand the use of imperatives to give commands, instructions, advice, or suggestions' :
                     i === 26 ? 'Learn how to form the Present Continuous tense in affirmative sentences' :
                     i === 27 ? 'Learn how to form Present Continuous in the negative form' :
                     i === 28 ? 'Learn how to form Present Continuous tense in question form' :
                     i === 29 ? 'Learn when to use Present Simple vs Present Continuous' :
                     i === 30 ? 'Learn how to use like/love/hate + verb-ing to express preferences' :
                     i === 31 ? 'Learn to use demonstratives (this, that, these, those) correctly' :
                     i === 32 ? 'Learn to use whose to ask about ownership and possessive \'s' :
                     i === 33 ? 'Learn common question words: who, what, where, when, why, how' :
                     i === 34 ? 'Learn ordinal numbers and how to use them for dates' :
                     i === 35 ? 'Learn to tell time using o\'clock, half past, quarter past/to' :
                     i === 36 ? 'Learn how to form and use comparative adjectives (-er/more)' :
                     i === 38 ? 'Learn how to use "be going to" for future plans and intentions' :
                     i === 39 ? 'Learn the difference between "would like" (polite) and "want" (direct)' :
                     i === 40 ? 'Learn how to use must to express necessity and mustn\'t for prohibition' :
                     i === 41 ? 'Learn how to express obligation with "have to" and lack of necessity with "don\'t have to"' :
                     i === 42 ? 'Learn common daily routine verbs and use Present Simple to describe routines' :
                     i === 43 ? 'Learn common job and occupation vocabulary and ask questions about professions' :
                     i === 44 ? 'Learn common food and drink vocabulary and talk about eating habits' :
                     i === 45 ? 'Learn vocabulary for family members and practice talking about relationships' :
                     i === 46 ? 'Learn common direction words and vocabulary for places in a town or city' :
                     i === 47 ? 'Learn common weather vocabulary and practice describing weather conditions' :
                     i === 48 ? 'Learn common vocabulary for clothes and accessories and talk about what people wear' :
                     i === 49 ? 'Learn vocabulary related to hobbies and free time activities' :
                     'Coming soon',
    completed: false,
    locked: false, // TEMPORARILY UNLOCKED FOR DEVELOPMENT
  })),
  
  // A2 Level modules
  A2: Array.from({ length: 50 }, (_, i) => ({
    id: i + 51, // Starting from 51 for A2 level
    title: i === 0 ? 'Past Simple Affirmative' : 
           i === 1 ? 'Past Simple: Irregular Verbs (Affirmative)' : 
           i === 2 ? 'Past Simple: Negative Sentences' :
           i === 3 ? 'Past Simple: Questions (Yes/No & Wh-)' :
           i === 4 ? 'Used to (Past Habits)' :
           i === 5 ? 'Would for Politeness and Offers' :
           i === 6 ? 'Be Going To vs Will (Future)' :
           i === 7 ? 'Future Continuous' :
           i === 8 ? 'Present Perfect (Ever / Never)' :
           i === 9 ? 'Present Perfect: just / already / yet' :
           i === 10 ? 'Present Perfect: for / since' :
           i === 11 ? 'Present Perfect vs Past Simple' :
           i === 12 ? 'Too / Enough' :
           i === 13 ? 'So / Such' :
           i === 14 ? 'Modal Verbs: Should / Ought to' :
           i === 15 ? 'Modal Verb: "Could" (Possibility)' :
           i === 16 ? 'Modal Verbs: "May" and "Might" (Possibility)' :
           i === 17 ? 'Zero Conditional (If + Present, Present)' :
           i === 18 ? 'First Conditional (If + Present, Will)' :
           i === 19 ? 'Second Conditional (If + Past, Would)' :
           i === 20 ? 'Reflexive Pronouns (myself, yourself, etc.)' :
           i === 21 ? 'Gerunds and Infinitives (to do / doing)' :
           i === 22 ? 'Question Tags' :
           i === 23 ? 'Relative Clauses (who, which, that)' :
           i === 24 ? 'Either / Neither / Both / All' :
           i === 25 ? 'Each / Every' :
           i === 26 ? 'Too Much / Too Many / Enough' :
           i === 27 ? 'Reported Speech: Statements' :
           i === 28 ? 'Reported Speech: Questions' :
           i === 29 ? 'Passive Voice: Present Simple' :
           i === 30 ? 'Passive Voice: Past Simple' :
           i === 31 ? 'Expressing Opinions (I think / I believe)' :
           i === 32 ? 'Giving Advice (should / Why don\'t you...)' :
           i === 33 ? 'Making Suggestions (Let\'s / How about...)' :
           i === 34 ? 'Apologizing and Responding' :
           i === 35 ? 'Invitations and Responses' :
           i === 36 ? 'Making Requests (Could you / Would you mind)' :
           i === 37 ? 'Shopping Vocabulary and Phrases' :
           i === 38 ? 'Health Problems and Solutions Vocabulary' :
           i === 39 ? 'Travel and Transport Vocabulary' :
           i === 40 ? 'House and Furniture Vocabulary' :
           i === 41 ? 'Technology Vocabulary' :
           i === 42 ? 'School and Education Vocabulary' :
           i === 43 ? 'Festivals and Celebrations Vocabulary' :
           i === 44 ? 'Emotions and Feelings Vocabulary' :
           i === 45 ? 'Nature and Environment Vocabulary' :
           i === 46 ? 'Entertainment Vocabulary (Movies & Music)' :
           i === 47 ? 'Describing People (Appearance & Personality)' :
           i === 48 ? 'Describing Places (Towns, Cities, Nature)' :
           i === 49 ? 'Giving Directions and Instructions' :
           i === 50 ? 'Present Perfect Continuous (I\'ve been working)' :
           i === 51 ? 'Present Perfect Continuous vs Present Perfect' :
           i === 52 ? 'Past Perfect – Affirmative' :
           i === 53 ? 'Past Perfect – Negative' :
           i === 54 ? 'Past Perfect – Questions' :
           i === 55 ? 'Past Perfect Continuous' :
           i === 56 ? 'Future Perfect (I will have done)' :
           i === 57 ? 'Future Continuous vs Future Perfect' :
           i === 58 ? 'Modals of Deduction (must, might, can\'t)' :
           i === 59 ? 'Modals of Probability (could, may, might)' :
           `B1 Module ${i + 51}`,
    description: i === 0 ? 'Learn to form and use affirmative sentences in the past simple tense' : 
                 i === 1 ? 'Learn to form affirmative past simple sentences using irregular verbs' :
                 i === 2 ? 'Learn to form negative sentences in the past simple tense using "did not / didn\'t"' :
                 i === 3 ? 'Learn to form and answer yes/no and wh- questions in the past simple tense' :
                 i === 4 ? 'Use "used to" to describe past habits or states that no longer happen' :
                 i === 5 ? 'Use "Would" to make polite requests and offers' :
                 i === 6 ? 'Understand the difference between "will" and "be going to"' :
                  i === 7 ? 'Learn to use the Future Continuous Tense for actions in progress at a specific time in the future' :
                  i === 8 ? 'Use Present Perfect Tense to describe life experiences with "ever" and "never"' :
                  i === 9 ? 'Understand how to use just, already, and yet with the Present Perfect tense' :
                  i === 10 ? 'Understand how to use for and since with Present Perfect tense' :
                  i === 11 ? 'Distinguish between Present Perfect and Past Simple' :
                  i === 12 ? 'Learn to use "too" for excess and "enough" for sufficiency' :
                  i === 13 ? 'Learn to use "so" with adjectives/adverbs and "such" with nouns for emphasis' :
                  i === 14 ? 'Learn to give advice using "should" and "ought to"' :
                  i === 15 ? 'Learn to use "could" to express possibility and uncertainty' :
                  i === 16 ? 'Learn to use "may" and "might" to express different levels of possibility' :
                  i === 17 ? 'Understand and use the Zero Conditional to describe general truths and facts' :
                  i === 18 ? 'Understand and use the First Conditional to talk about future possibilities' :
                  i === 19 ? 'Understand and use the Second Conditional to talk about imaginary or unlikely situations' :
                  i === 20 ? 'Understand the use of reflexive pronouns when the subject and object are the same' :
                  i === 21 ? 'Understand the difference between gerunds (verb + ing) and infinitives (to + verb)' :
                  i === 22 ? 'Understand how to use question tags for confirmation and agreement' :
                  i === 23 ? 'Learn how to use relative clauses to give more information about nouns' :
                  i === 24 ? 'Understand the difference between either, neither, both, and all' :
                  i === 25 ? 'Understand the difference between each and every' :
                  i === 26 ? 'Understand the use of too much, too many, and enough' :
                  i === 27 ? 'Understand how to report statements using Reported Speech' :
                  i === 28 ? 'Learn how to report Yes/No and Wh- questions using reported speech' :
                  i === 29 ? 'Understand how to form passive voice sentences in the Present Simple tense' :
                  i === 30 ? 'Learn how to form passive voice structures using the Past Simple tense' :
                  i === 31 ? 'Learn to express personal thoughts and beliefs using polite structures' :
                  i === 32 ? 'Learn how to give polite suggestions and advice' :
                  i === 33 ? 'Learn how to make friendly and polite suggestions' :
                  i === 34 ? 'Learn how to apologize in everyday English situations' :
                  i === 35 ? 'Learn how to make polite invitations in English' :
                  i === 36 ? 'Practice making polite requests in English' :
                  i === 37 ? 'Learn basic shopping-related vocabulary' :
                  i === 38 ? 'Recognize common health problems in English' :
                  i === 39 ? 'Learn common transport and travel vocabulary' :
                  i === 40 ? 'Learn essential vocabulary for rooms and furniture' :
                  i === 41 ? 'Learn essential vocabulary for technology and digital tools' :
                  i === 42 ? 'Learn essential vocabulary related to school and education' :
                  i === 43 ? 'Learn key vocabulary related to holidays and celebrations' :
                  i === 44 ? 'Learn and use essential emotion and feeling vocabulary' :
                  i === 45 ? 'Learn essential nature and environment vocabulary' :
                  i === 46 ? 'Learn vocabulary related to movies and music' :
                  i === 47 ? 'Learn vocabulary to describe people\'s physical appearance and personality' :
                  i === 48 ? 'Learn vocabulary to describe different places' :
                  i === 49 ? 'Learn essential vocabulary for giving and understanding directions' :
                  i === 50 ? 'Learn the structure and use of the Present Perfect Continuous tense' :
                  i === 51 ? 'Understand the difference between Present Perfect and Present Perfect Continuous tenses' :
                  i === 52 ? 'Learn how to form Past Perfect Tense in affirmative sentences' :
                  i === 53 ? 'Learn how to form the negative of the Past Perfect tense' :
                  i === 54 ? 'Learn how to form questions in the Past Perfect tense' :
                  i === 55 ? 'Understand how to use the Past Perfect Continuous Tense' :
                  i === 56 ? 'Learn to use the Future Perfect tense to describe completed actions in the future' :
                  i === 57 ? 'Understand the difference between Future Continuous and Future Perfect tenses' :
                  i === 58 ? 'Understand how to express logical conclusions about present situations' :
                  i === 59 ? 'Understand how to express possibility and probability using modal verbs' :
                 'Coming soon',
    completed: false,
    locked: false, // TEMPORARILY UNLOCKED FOR DEVELOPMENT
  })),
  // B1 Level modules (101-148)
  B1: Array.from({ length: 50 }, (_, i) => ({
    id: i + 101, // Starting from 101 for B1 level
    title: i === 0 ? 'Present Perfect Continuous (I\'ve been working)' :
           i === 1 ? 'Present Perfect Continuous vs Present Perfect' :
           i === 2 ? 'Past Perfect – Affirmative' :
           i === 3 ? 'Past Perfect – Negative' :
           i === 4 ? 'Past Perfect – Questions' :
           i === 5 ? 'Past Perfect Continuous' :
           i === 6 ? 'Future Perfect (I will have done)' :
           i === 7 ? 'Future Continuous vs Future Perfect' :
           i === 8 ? 'Modals of Deduction (must, might, can\'t)' :
           i === 9 ? 'Modals of Probability (could, may, might)' :
           i === 10 ? 'Modals of Obligation (must, have to, should)' :
           i === 11 ? 'Modals of Prohibition (mustn\'t, can\'t)' :
           i === 12 ? 'Reported Speech: Requests and Commands' :
           i === 13 ? 'Reported Speech – Questions' :
           i === 14 ? 'Passive Voice – Present Perfect' :
           i === 15 ? 'Passive Voice – Future Simple' :
           i === 16 ? 'Conditionals – Review (Zero, First, Second, Third)' :
           i === 17 ? 'Third Conditional' :
           i === 18 ? 'Mixed Conditionals' :
           i === 19 ? 'Wish / If only + Past Simple (Present Regrets)' :
           i === 20 ? 'Wish / If only + Past Perfect (Past Regrets)' :
           i === 21 ? 'Used to / Be used to / Get used to' :
           i === 22 ? 'Causative – Have/Get Something Done' :
           i === 23 ? 'Relative Clauses – Defining & Non-defining' :
           i === 24 ? 'Gerunds and Infinitives – Review' :
           i === 25 ? 'Expressions with Get (get ready, get tired, etc.)' :
           i === 26 ? 'Expressions with Take (take part, take place, etc.)' :
           i === 27 ? 'Phrasal Verbs – Separable and Inseparable' :
           i === 28 ? 'Phrasal Verbs – Common Everyday Verbs' :
           i === 29 ? 'Collocations with Make and Do' :
           i === 30 ? 'Indirect Questions (Could you tell me ...?)' :
           i === 31 ? 'Giving Opinions and Agreeing/Disagreeing' :
           i === 32 ? 'Speculating and Expressing Possibility' :
           i === 33 ? 'Talking about Hypothetical Situations' :
           i === 34 ? 'Expressing Preferences (I\'d rather, I prefer)' :
           i === 35 ? 'Narratives – Sequencing Words (first, then)' :
           i === 36 ? 'Linking Words (however, although, despite)' :
           i === 37 ? 'Describing Experiences (Narratives)' :
           i === 38 ? 'Talking about Cause and Effect (so, because)' :
           i === 39 ? 'Talking about Purpose (to, in order to, so that)' :
           i === 40 ? 'Work Vocabulary – Roles, Tasks, and Workplaces' :
           i === 41 ? 'Education Vocabulary – Schools and Universities' :
           i === 42 ? 'Technology Vocabulary – Gadgets and Internet' :
           i === 43 ? 'Environment Vocabulary – Problems and Solutions' :
           i === 44 ? 'News and Media Vocabulary' :
           i === 45 ? 'Personality and Character Vocabulary' :
           i === 46 ? 'Crime and Law Vocabulary' :
           i === 47 ? 'Health and Fitness Vocabulary' :
           i === 48 ? 'Society and Social Issues Vocabulary (B1 Level)' :
           i === 49 ? 'Travel and Adventure Vocabulary (B1 Level)' :
           `B1 Module ${i + 101}`,
    description: i === 0 ? 'Learn the structure and use of the Present Perfect Continuous tense' :
                 i === 1 ? 'Understand the difference between Present Perfect and Present Perfect Continuous tenses' :
                 i === 2 ? 'Learn how to form Past Perfect Tense in affirmative sentences' :
                 i === 3 ? 'Learn how to form the negative of the Past Perfect tense' :
                 i === 4 ? 'Learn how to form questions in the Past Perfect tense' :
                 i === 5 ? 'Understand how to use the Past Perfect Continuous Tense' :
                 i === 6 ? 'Learn to use the Future Perfect tense to describe completed actions in the future' :
                 i === 7 ? 'Understand the difference between Future Continuous and Future Perfect tenses' :
                 i === 8 ? 'Understand how to express logical conclusions about present situations' :
                 i === 9 ? 'Understand how to express possibility and probability using modal verbs' :
                 i === 10 ? 'Understand how to express rules, duties, and advice using modal verbs' :
                 i === 11 ? 'Learn how to express prohibition and lack of permission using mustn\'t and can\'t' :
                 i === 12 ? 'Learn how to report commands and requests using correct reporting verbs' :
                 i === 13 ? 'Learn how to report both Yes/No and WH-Questions' :
                 i === 14 ? 'Learn how to use the passive voice in the present perfect tense' :
                 i === 15 ? 'Learn how to use the passive voice in the future simple tense' :
                 i === 16 ? 'Review and compare all four main conditional sentence types' :
                 i === 17 ? 'Learn how to use the third conditional to describe unreal situations in the past' :
                 i === 18 ? 'Learn how to use mixed conditionals for different time references' :
                 i === 19 ? 'Learn how to express present regrets using wish and if only' :
                 i === 20 ? 'Learn how to express regrets about the past using wish and if only with past perfect' :
                 i === 21 ? 'Understand the differences between used to, be used to, and get used to' :
                 i === 22 ? 'Learn how to use the causative structure to express arrangements with others' :
                 i === 23 ? 'Learn how to use defining and non-defining relative clauses' :
                 i === 24 ? 'Review and consolidate understanding of gerunds and infinitives' :
                 i === 25 ? 'Learn and practice common expressions with the verb get' :
                 i === 26 ? 'Learn and practice common expressions with the verb take' :
                 i === 27 ? 'Learn to distinguish between separable and inseparable phrasal verbs' :
                 i === 28 ? 'Learn and practice common phrasal verbs used in everyday English' :
                 i === 29 ? 'Learn common collocations with make and do and use them correctly in various contexts' :
                 i === 30 ? 'Learn how to form and use indirect questions to sound more polite and formal' :
                 i === 31 ? 'Learn how to express opinions and agree or disagree politely in conversation' :
                 i === 32 ? 'Learn how to express possibility and make logical guesses using modal verbs' :
                 i === 33 ? 'Learn how to talk about unreal or imaginary situations using the Second Conditional' :
                 i === 34 ? 'Learn how to express preferences using "I prefer" and "I\'d rather"' :
                 i === 35 ? 'Learn how to organize and describe a series of events using sequencing words' :
                 i === 36 ? 'Learn how to use linking words of contrast to show differences between ideas' :
                 i === 37 ? 'Learn how to describe personal experiences, memories, and past events' :
                 i === 38 ? 'Learn how to express reasons (causes) and results (effects) using connectors' :
                 i === 39 ? 'Learn how to express purpose or intent behind actions' :
                 i === 40 ? 'Learn vocabulary related to common job roles, tasks, and workplaces' :
                 i === 41 ? 'Expand academic vocabulary related to school and university settings' :
                 i === 42 ? 'Learn key vocabulary related to gadgets, the internet, and digital life' :
                 i === 43 ? 'Learn essential vocabulary about environmental problems and solutions' :
                 i === 44 ? 'Learn essential vocabulary related to the world of news and media' :
                 i === 45 ? 'Learn and practice advanced vocabulary related to personality and character' :
                 i === 46 ? 'Learn and apply vocabulary related to crime, court, and law enforcement' :
                 i === 47 ? 'Students will learn and practice vocabulary related to health, nutrition, and fitness' :
                 i === 48 ? 'Use B1 vocabulary to discuss society, inequality, and social issues' :
                 i === 49 ? 'Use B1 travel/adventure vocabulary to discuss trips, plans, and outdoor activities' :
                 'Coming soon',
    completed: false,
    locked: false, // TEMPORARILY UNLOCKED FOR DEVELOPMENT
  })),
  B2: Array.from({ length: 50 }, (_, i) => ({
    id: i + 151,
    title: i === 0 ? 'Future Perfect Continuous (will have been doing)' :
           i === 1 ? 'Passive Voice – Past Perfect and Future Perfect' :
           i === 2 ? 'Reported Speech – Mixed Tenses' :
           i === 3 ? 'Inversion for Emphasis (Never have I…)' :
           i === 4 ? 'Ellipsis and Substitution (so, do, one)' :
           i === 5 ? 'Nominalisation (changing verbs to nouns)' :
           i === 6 ? 'Advanced Linking Words (nonetheless, furthermore)' :
           i === 7 ? 'Complex Conditionals (if…were to, if…should)' :
           i === 8 ? 'Unreal Past for Present (I wish I knew)' :
           i === 9 ? 'Unreal Past for Past (I wish I had known)' :
           i === 10 ? 'Gerunds after Prepositions' :
           i === 11 ? 'Advanced Collocations (make an effort, heavy rain)' :
           i === 12 ? 'Advanced Phrasal Verbs (bring up, cut down on)' :
           i === 13 ? 'Idioms and Expressions (hit the nail on the head)' :
           i === 14 ? 'Expressing Certainty and Doubt' :
           i === 15 ? 'Hedging Language (Seems to / Appears to)' :
           i === 16 ? 'Modals in the Past (might have done, should have been)' :
           i === 17 ? 'Discursive Essays – Opinion Language' :
           i === 18 ? 'Describing Trends (Increase/Decrease/Fluctuate)' :
           i === 19 ? 'Talking About Statistics – Percentages & Fractions' :
           i === 20 ? 'Formal and Informal Registers' :
           i === 21 ? 'Direct and Indirect Speech Review' :
           i === 22 ? 'Politeness Strategies in English' :
           i === 23 ? 'Advanced Descriptions of People and Places' :
           i === 24 ? 'Speculating About the Past' :
           i === 25 ? 'Speculating About the Future' :
           i === 26 ? 'Hypothetical Past (Third Conditional)' :
           i === 27 ? 'Vocabulary – Business and Economics' :
           i === 28 ? 'Vocabulary – Science and Technology' :
           i === 29 ? 'Vocabulary – Health and Medicine' :
           i === 30 ? 'Vocabulary – Art and Literature' :
           i === 31 ? 'Vocabulary – Politics and Society' :
           i === 32 ? 'Vocabulary – Global Issues' :
           i === 33 ? 'Vocabulary – Sports and Leisure' :
           i === 34 ? 'Debating Skills – Expressing Agreement and Disagreement' :
           i === 35 ? 'Persuasion Techniques in Speaking' :
           i === 36 ? 'Making Complaints Politely' :
           i === 37 ? 'Clarifying and Confirming Information' :
           i === 38 ? 'Managing Conversations – Interruptions and Turn-taking' :
           i === 39 ? 'Advanced Writing Skills – Reports and Proposals' :
           i === 40 ? 'Advanced Grammar Review – Mixed Structures' :
           i === 41 ? 'Collocations with Advanced Verbs (take, put, set)' :
           i === 42 ? 'Idiomatic Expressions for Emotions' :
           i === 43 ? 'Expressing Nuance and Subtle Differences' :
           i === 44 ? 'Understanding Humor and Sarcasm' :
           i === 45 ? 'Summarizing and Paraphrasing Skills' :
           i === 46 ? 'Reading Between the Lines – Inferences' :
           i === 47 ? 'Cultural Awareness in Language' :
           i === 48 ? 'Formal Presentations – Language and Style' :
           i === 49 ? 'Advanced Listening and Note-Taking Skills' :
           'B2 Module',
    description: i === 0 ? 'Understand and form sentences using the Future Perfect Continuous tense' :
                 i === 1 ? 'Recognize and form passive structures in the Past Perfect and Future Perfect tenses' :
                 i === 2 ? 'Understand how to convert direct speech to reported speech using different tenses' :
                 i === 3 ? 'Understand how and when to use inversion for emphasis in English' :
                 i === 4 ? 'Learn ellipsis and substitution to avoid repetition' :
                 i === 5 ? 'Learn how to change verbs into nouns for more formal English' :
                 i === 6 ? 'Master advanced linking words for sophisticated expression' :
                 i === 7 ? 'Use complex conditional structures for hypothetical situations' :
                 i === 8 ? 'Express present regrets using unreal past structures' :
                 i === 9 ? 'Express past regrets using unreal past perfect structures' :
                 i === 10 ? 'Use gerunds correctly after prepositions' :
                 i === 11 ? 'Master natural word combinations' :
                 i === 12 ? 'Learn advanced phrasal verbs for fluency' :
                 i === 13 ? 'Understand and use common English idioms' :
                 i === 14 ? 'Express different levels of certainty' :
                 i === 15 ? 'Use hedging language for politeness' :
                 i === 16 ? 'Speculate about past events using modals' :
                 i === 17 ? 'Master formal opinion language for essays' :
                 i === 18 ? 'Learn how to describe and interpret changes over time using correct vocabulary' :
                 i === 19 ? 'Talk naturally about percentages, fractions, and proportions in everyday English' :
                 i === 20 ? 'Understand and use formal and informal English appropriately in different contexts' :
                 i === 21 ? 'Report what other people said using both direct and indirect speech' :
                 i === 22 ? 'Use polite, indirect, and respectful language for requests and suggestions' :
                 i === 23 ? 'Describe people and places vividly using advanced adjectives and expressions' :
                 i === 24 ? 'Express logical guesses about past events using modal verbs' :
                 i === 25 ? 'Express predictions and possibilities about the future using modal verbs' :
                 i === 26 ? 'Talk about imaginary situations in the past using third conditional' :
                 i === 27 ? 'Build vocabulary related to business, economics, and finance' :
                 i === 28 ? 'Build vocabulary for discussing science, innovation, and technology' :
                 i === 29 ? 'Build vocabulary for discussing health, medicine, and well-being' :
                 i === 30 ? 'Build vocabulary related to art forms, creative expression, and literature' :
                 i === 31 ? 'Learn vocabulary for discussing government, politics, human rights, and social issues' :
                 i === 32 ? 'Build vocabulary for discussing world problems like climate change, poverty, and globalization' :
                 i === 33 ? 'Expand vocabulary for discussing sports, fitness, hobbies, and leisure activities' :
                 i === 34 ? 'Learn to express agreement and disagreement politely and convincingly in debates' :
                 i === 35 ? 'Learn to persuade and influence others using logic, emotion, and credibility' :
                 i === 36 ? 'Learn to express dissatisfaction and solve problems politely and professionally' :
                 i === 37 ? 'Develop strategies for checking understanding and confirming details in conversations' :
                 i === 38 ? 'Master the art of interrupting politely, taking turns, and keeping discussions balanced' :
                 i === 39 ? 'Develop advanced writing skills for formal reports and proposals with clear structure and persuasive language' :
                 i === 40 ? 'Review and master advanced grammar structures including conditionals, passives, modals, and relative clauses' :
                 i === 41 ? 'Master natural collocations with take, put, and set to sound more fluent and native-like' :
                 i === 42 ? 'Learn idiomatic expressions to describe emotions vividly and naturally in conversation' :
                 i === 43 ? 'Express shades of meaning and subtle differences precisely using advanced modifiers' :
                 i === 44 ? 'Recognize and use humor and sarcasm appropriately with cultural awareness' :
                 i === 45 ? 'Master summarizing and paraphrasing to improve academic writing and comprehension' :
                 i === 46 ? 'Learn to make logical inferences and understand implied meanings in English texts' :
                 i === 47 ? 'Understand how culture influences communication and use language appropriately across contexts' :
                 i === 48 ? 'Deliver formal presentations confidently using appropriate language, structure, and professional tone' :
                 i === 49 ? 'Develop advanced listening comprehension and effective note-taking techniques for academic and professional contexts' :
                 'Advanced B2 grammar module',
    completed: false,
    locked: false,
  })),
  C1: [],
  C2: []
};

export default function LessonsApp({ onBack, initialLevel, initialModule }: LessonsAppProps) {
  // ===== STATE (must be first) =====
  const [width, height] = useWindowSize();
  const [viewState, setViewState] = useState<ViewState>('levels');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedModule, setSelectedModule] = useState<number>(0);
  const [currentPhase, setCurrentPhase] = useState<LessonPhase>('intro');
  const [isTeacherReading, setIsTeacherReading] = useState(false);
  const [readingComplete, setReadingComplete] = useState(false);
  const [hasBeenRead, setHasBeenRead] = useState<Record<string, boolean>>({});
  const [speakingIndex, setSpeakingIndex] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Progress tracking state
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [currentQuestionRetries, setCurrentQuestionRetries] = useState<number>(0);
  
  // Auto-reader state
  const [readingProgress, setReadingProgress] = useState<{
    isReading: boolean;
    currentSection: string;
    progress: number;
    currentText: string;
  } | null>(null);
  
  // UI state
  const [showCelebration, setShowCelebration] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | 'info'>('info');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResponseTime, setLastResponseTime] = useState(0);
  
  // Enhanced question state management for multiple choice
  const [questionStates, setQuestionStates] = useState<Record<number, QuestionState>>({});
  const [currentQuestionPhase, setCurrentQuestionPhase] = useState<'multiple-choice' | 'speaking'>('multiple-choice');

  // Keep a live ref of the phase for async flows (prevents stale closures)
  const phaseRef = useRef(currentPhase);
  useEffect(() => { phaseRef.current = currentPhase; }, [currentPhase]);

  // Initialize with props from test result
  useEffect(() => {
    if (initialLevel && initialModule) {
      setSelectedLevel(initialLevel);
      setSelectedModule(initialModule);
      setViewState('lesson');
    }
  }, [initialLevel, initialModule]);

  // ===== DERIVED VALUES (after state) =====
  // Initialize Progress Tracker Service
  const progressTracker = ProgressTrackerService.getInstance();

  // ===== VOICE COMMANDS (after state) =====
  const voiceCommands = useLessonVoiceCommands(
    selectedModule,
    selectedLevel,
    currentPhase,
    {
      enabled: viewState === 'lesson',
      autoStart: false,
      onCommandExecuted: (command, result) => {
        console.log('Voice command executed:', command.type, result);
      },
      onCommandFailed: (command, error) => {
        console.warn('Voice command failed:', command.type, error);
      }
    }
  );
  
  // Guards for module-scoped timers and safe progression
  const moduleGuardRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const lessonCompletedRef = useRef(false);
  
  // Track the live speaking index (no stale closures)
  const speakingIndexRef = useRef(0);

  // ---- Robust Web Speech recognizer (single instance with guarded retries) ----
  type RunStatus = 'idle' | 'prompting' | 'recording' | 'evaluating' | 'advancing';

  const speechRunIdRef = useRef<string | null>(null);
  const speakStatusRef = useRef<RunStatus>('idle');
  const [speakStatus, setSpeakStatus] = useState<RunStatus>('idle');
  const recognizerRef = useRef<SpeechRecognition | null>(null);
  const retryCountRef = useRef(0);
  const MAX_ASR_RETRIES = 3; // Maximum ASR retry attempts

  // ---- Voice Activity Detection for visual feedback ----
  const [vadVolume, setVadVolume] = useState(0);
  const [isSpeechDetected, setIsSpeechDetected] = useState(false);
  const vadRef = useRef<any>(null);

  // Initialize VAD hook (for visual feedback only)
  const vad = useVoiceActivityDetection({
    onSpeechStart: () => {
      setIsSpeechDetected(true);
    },
    onSpeechEnd: () => {
      setIsSpeechDetected(false);
    },
    onVolumeChange: (volume) => {
      setVadVolume(volume);
    },
    silenceThreshold: 20,
    silenceDuration: 1500, // 1.5 seconds of silence
    minSpeechDuration: 300, // 300ms minimum speech
  });

  // Store VAD reference for manual control
  useEffect(() => {
    vadRef.current = vad;
  }, [vad]);

  // ---- Mic + ASR utilities (robust) ----
  type Abortable = { signal?: AbortSignal };

  // TypeScript interfaces for Web Speech API
  interface SpeechRecognition extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    start(): void;
    stop(): void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: any) => void;
    onend: () => void;
  }

  interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList;
  }

  interface SpeechRecognitionResultList {
    length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
  }

  interface SpeechRecognitionResult {
    length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
    isFinal: boolean;
  }

  interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
  }

  // Ensure user gesture unlocked audio on iOS
  async function unlockAudioOnce() {
    const Ctx = (window.AudioContext || (window as any).webkitAudioContext);
    if (!Ctx) return;
    const ctx = (window as any).__appAudioCtx || ((window as any).__appAudioCtx = new Ctx());
    if (ctx.state === 'suspended') { try { await ctx.resume(); } catch (error) { /* Ignore audio context resume errors */ } }
  }

  // Create or reuse a SpeechRecognition with our settings
  function getRecognizer(): SpeechRecognition | null {
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return null;
    if (recognizerRef.current) return recognizerRef.current;
    const rec: SpeechRecognition = new SR();
    rec.lang = 'en-US';
    rec.continuous = false;
    rec.interimResults = false;
    (rec as any).maxAlternatives = 1;
    recognizerRef.current = rec;
    return rec;
  }

  // Promise wrapper: listen once, resolve transcript (empty string allowed), silent retry on transient errors
  async function recognizeOnce(abortSignal?: AbortSignal): Promise<string> {
    const rec = getRecognizer();
    if (!rec) throw new Error('no-web-speech');

    return new Promise<string>((resolve, reject) => {
      let settled = false;
      const done = (ok: boolean, value?: string) => {
        if (settled) return;
        settled = true;
        try { rec.stop(); } catch (error) { /* Recognition stop error ignored */ }
        ok ? resolve(value) : reject(value);
      };

      // Abort support
      if (abortSignal) {
        if (abortSignal.aborted) return done(false, new Error('aborted'));
        abortSignal.addEventListener('abort', () => done(false, new Error('aborted')), { once: true });
      }

      rec.onresult = (e: SpeechRecognitionEvent) => {
        const txt = Array.from(e.results).map(r => r[0]?.transcript ?? '').join(' ').trim();
        done(true, txt);
      };
      rec.onend = () => done(true, ''); // no speech → empty transcript (we'll handle above)
      rec.onerror = (e: any) => {
        const code = (e?.error || '').toString();
        // Transient issues we silently retry outside: network/audio-capture/no-speech/not-allowed (first tap)
        done(false, new Error(code || 'asr:error'));
      };

      try { rec.start(); } catch (err) { done(false, err); }
    });
  }

  // Guard helpers
  function newRunId() { return `${Date.now()}-${Math.random().toString(36).slice(2,8)}`; }
  function isStale(id: string) { return speechRunIdRef.current !== id; }

  // Cancel any live recognition on nav/module change
  useEffect(() => {
    speechRunIdRef.current = null;
    try { recognizerRef.current?.stop?.(); } catch (error) { /* Ignore recognizer stop errors */ }
  }, [selectedModule, selectedLevel, viewState]);

  // Cancel any narration the moment we enter speaking (no TTS fighting taps)
  useEffect(() => {
    if (currentPhase === 'speaking') {
      narration.cancel();          // nothing else should be talking now
      setIsProcessing(false);
    }
  }, [currentPhase]);

  // ---- Autosave helpers ----
  const SAVE_DEBOUNCE_MS = 250;
  const saveTimerRef = useRef<number | null>(null);
  const restoredOnceRef = useRef(false);
  const dialogShownRef = useRef(false);
  const autosaveTimeoutRef = useRef<number | null>(null);

  function snapshotProgress(): StoreModuleProgress | null {
    if (!currentModuleData || !selectedLevel || selectedModule == null) return null;

    const totalSpeaking  = currentModuleData?.speakingPractice?.length ?? 0;

    // Clamp speaking index in case content changed between sessions
    const safeSpeakingIndex  = Math.min(Math.max(speakingIndex ?? 0, 0), Math.max(totalSpeaking - 1, 0));

    return {
      level: String(selectedLevel),
      module: Number(selectedModule),
      phase: currentPhase as LessonPhase,
      listeningIndex: 0, // Legacy field for compatibility
      speakingIndex: safeSpeakingIndex,
      completed: currentPhase === 'complete',
      totalListening: 0, // No longer used
      totalSpeaking,
      updatedAt: Date.now(),
      v: 1,
    } as StoreModuleProgress;
  }

  function saveProgressDebounced() {
    if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
    saveTimerRef.current = window.setTimeout(() => {
      const snap = snapshotProgress();
      if (snap) setProgress(snap);
      saveTimerRef.current = null;
    }, SAVE_DEBOUNCE_MS) as unknown as number;
  }

  // --- Multiple Choice Handler ---
  function handleMultipleChoiceSelect(selectedLetter: 'A' | 'B' | 'C', isCorrect: boolean) {
    const currentState = questionStates[speakingIndex] || { selectedChoice: undefined, choiceCorrect: false, speechCompleted: false };
    
    // Don't allow selecting if already selected correctly
    if (currentState.selectedChoice && currentState.choiceCorrect) {
      return;
    }
    
    // Update the question state
    const newState = {
      ...currentState,
      selectedChoice: selectedLetter,
      choiceCorrect: isCorrect
    };
    
    setQuestionStates(prev => ({
      ...prev,
      [speakingIndex]: newState
    }));

    // Provide immediate feedback
    if (isCorrect) {
      setFeedback("✅ Correct! Now speak the complete sentence.");
      setFeedbackType('success');

      // Checkpoint: MCQ answered correctly
      checkpoints.checkpointMCQCorrect({
        level: selectedLevel,
        moduleId: selectedModule,
        questionIndex: speakingIndex,
        totalQuestions: 40,
        mcqChoice: selectedLetter,
        mcqCorrect: true
      });

      // Clear feedback after showing success message
      setTimeout(() => {
        setFeedback('');
      }, 2000);
    } else {
      setFeedback("❌ Incorrect. Try again!");
      setFeedbackType('error');
      
      // Clear selection after a delay to allow retry
      setTimeout(() => {
        setQuestionStates(prev => ({
          ...prev,
          [speakingIndex]: {
            ...prev[speakingIndex],
            selectedChoice: undefined,
            choiceCorrect: false
          }
        }));
        setFeedback('');
      }, 1500);
    }
  }

  // --- Module Completion Logic ---
  function completeLesson() {
    const total = currentModuleData?.speakingPractice?.length ?? 0;
    
    // Check if module meets accuracy requirement before completion
    const accuracy = progressTracker.getModuleAccuracy(selectedLevel, selectedModule);
    const config = progressTracker.getConfig();
    
    // persist completion
    setProgress({
      level: selectedLevel,
      module: selectedModule,
      phase: 'complete',
      listeningIndex: 0,
      speakingIndex: Math.max(0, total - 1),
      completed: true,
      totalListening: currentModuleData?.intro?.length ?? 0,
      totalSpeaking: total,
      updatedAt: Date.now(),
      v: 1
    });
    
    // End progress tracking session
    if (currentSessionId) {
      progressTracker.endLearningSession(currentSessionId, true);
      setCurrentSessionId(null);
    }
    
    // Save final progress snapshot
    progressTracker.saveCurrentProgress(selectedLevel, selectedModule);

    // celebration
    setShowCelebration(true);
    
    // Show accuracy-based completion message
    const completionMessage = accuracy >= config.accuracyThreshold 
      ? `🎉 Module completed with ${accuracy.toFixed(1)}% accuracy! Next module unlocked!`
      : `📚 Module finished with ${accuracy.toFixed(1)}% accuracy. You need ${config.accuracyThreshold}% to unlock the next module. Keep practicing!`;
    
    setTimeout(() => {
      setShowCelebration(false);
      setFeedback(completionMessage);
      setFeedbackType(accuracy >= config.accuracyThreshold ? 'success' : 'warning');

    // compute next module - only advance if accuracy requirement is met
    const nextId = getNextModuleId(selectedLevel as 'A1' | 'A2' | 'B1', selectedModule);
      if (nextId && accuracy >= config.accuracyThreshold) {
        setTimeout(() => {
          narration.cancel();
          // reset local UI state
          setSpeakingIndex(0);
          setCurrentPhase('intro');
          setSelectedModule(nextId);
          setFeedback('');
        }, 3000);
      } else if (nextId) {
        // Module exists but accuracy not met - stay on current module
        setTimeout(() => {
          setFeedback('Review the suggested topics and try again to improve your accuracy!');
          setFeedbackType('info');
        }, 3000);
      } else {
        // no next module: stay on completion screen or show a CTA to change level
      }
    }, 2000);
  }
  
  // --- Speaking evaluation helpers ---
  const expectedRef = useRef<string>('');  // live expected, never stale across timeouts

  function stripSayPrefix(s: string): string {
    if (!s) return '';
    return s
      .replace(/^say:\s*/i, '')   // drop "Say:"
      .replace(/^"|^"|\s*"$|\s*"$/g, '') // drop surrounding quotes
      .trim();
  }

  function getExpectedFromItem(
    item: string | { question?: string; answer?: string; say?: string }
  ): string {
    if (typeof item === 'string') return stripSayPrefix(item);
    const candidate = item?.answer ?? item?.say ?? item?.question ?? '';
    return stripSayPrefix(candidate);
  }

  // Strip accents, visual punctuation, and normalize spacing/case
  function normalizeAnswer(raw: string): string {
    if (!raw) return '';
    return raw
      // Unicode normalize, then strip combining marks (accents/diacritics)
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      // Unify quotes/apostrophes and dashes
      .replace(/[""„«»]/g, '"')
      .replace(/[''']/g, "'")
      .replace(/[–—]/g, '-')
      // Remove punctuation that shouldn't affect correctness
      .replace(/[.,!?;:()"]/g, '')
      // Remove apostrophes too (so cafe's vs cafes isn't conflated; we keep words strict,
      // but apostrophes in cafe/café or don't → dont won't matter visually)
      .replace(/'/g, '')
      // Collapse whitespace and lowercase
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  // Enhanced similarity matching for accepting variations (Module 51 standard)
  function calculateSimilarity(str1: string, str2: string): number {
    if (!str1 || !str2) return 0;
    
    const normalized1 = normalizeAnswer(str1);
    const normalized2 = normalizeAnswer(str2);
    
    // Exact match gets 100%
    if (normalized1 === normalized2) return 1;
    
    // Calculate Levenshtein distance-based similarity
    const maxLength = Math.max(normalized1.length, normalized2.length);
    if (maxLength === 0) return 1;
    
    const distance = levenshteinDistance(normalized1, normalized2);
    return (maxLength - distance) / maxLength;
  }

  function levenshteinDistance(a: string, b: string): number {
    const matrix = [];
    
    // Initialize first row and column
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    
    // Fill in the rest of the matrix
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }
    
    return matrix[b.length][a.length];
  }

  // Enhanced answer checking with detailed feedback and grammar corrections
  function isAnswerCorrect(spokenRaw: string, targetRaw: string, questionItem?: { question: string; answer: string }): boolean {
    // Create evaluation options
    const evalOptions: EvalOptions = {
      expected: targetRaw,
      accepted: questionItem?.acceptedAlternatives || [],
      requireAffirmationPolarity: questionItem?.requiresYesNo ?? true,
      keyLemmas: questionItem?.keyLemmas || []
    };

    // Use the enhanced evaluator with detailed feedback
    const detailedResult = evaluateAnswerDetailed(spokenRaw, evalOptions, currentAttemptNumber);

    // Store the detailed result for UI display
    setEvaluationResult(detailedResult);
    setGrammarCorrections(detailedResult.grammarCorrections || []);

    // Update feedback with the result
    if (detailedResult.isCorrect) {
      setFeedback(detailedResult.feedback);
      setFeedbackType('success');
      // Reset attempt number on success
      setCurrentAttemptNumber(1);
    } else {
      // Show hint if available
      const feedbackMessage = detailedResult.hint
        ? `${detailedResult.feedback}\n\n${detailedResult.hint}`
        : detailedResult.feedback;
      setFeedback(feedbackMessage);
      setFeedbackType('error');
      // Increment attempt number for next try
      setCurrentAttemptNumber(prev => prev + 1);
    }

    return detailedResult.isCorrect;
  }

  // Use the enhanced evaluator for all answer checking
  function isExactlyCorrect(spokenRaw: string, targetRaw: string, questionItem?: { question: string; answer: string }): boolean {
    return isAnswerCorrect(spokenRaw, targetRaw, questionItem);
  }

  function expandContractions(text: string): string {
    const contractions: { [key: string]: string } = {
      "i'm": "i am",
      "you're": "you are", 
      "he's": "he is",
      "she's": "she is",
      "it's": "it is",
      "we're": "we are",
      "they're": "they are",
      "isn't": "is not",
      "aren't": "are not",
      "won't": "will not",
      "don't": "do not",
      "doesn't": "does not",
      "didn't": "did not",
      "haven't": "have not",
      "hasn't": "has not",
      "hadn't": "had not",
      "can't": "cannot",
      "couldn't": "could not",
      "shouldn't": "should not",
      "wouldn't": "would not",
      "i'd": "i would",
      "you'd": "you would",
      "he'd": "he would",
      "she'd": "she would",
      "we'd": "we would",
      "they'd": "they would",
      "i'll": "i will",
      "you'll": "you will",
      "he'll": "he will",
      "she'll": "she will",
      "we'll": "we will",
      "they'll": "they will",
      "i've": "i have",
      "you've": "you have",
      "we've": "we have",
      "they've": "they have"
    };
    
    let result = text.toLowerCase();
    for (const [contraction, expansion] of Object.entries(contractions)) {
      result = result.replace(new RegExp(`\\b${contraction}\\b`, 'g'), expansion);
    }
    return result;
  }

  function removeArticles(text: string): string {
    return text.replace(/\b(a|an|the|my|your|his|her|its|our|their)\b/gi, ' ')
               .replace(/\s+/g, ' ')
               .trim();
  }

  function stripOuterQuotes(s: string) {
    const t = s.trim();
    if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
      return t.slice(1, -1).trim();
    }
    return t;
  }

  function computeTargetFromItem(item: { question: string; answer: string }): string {
    // Prefer explicit answer fields; otherwise fall back to the visible "Say:" text
    const raw =
      (item && (item.answer ?? item.say ?? item.sentence ?? item.target ?? item.expected ?? item.text ?? item.question)) || '';
    return stripOuterQuotes(String(raw));
  }

  // Guarantee we evaluate the right sentence for the current index
  function getCurrentPromptAndTarget() {
    const item = currentModuleData?.speakingPractice?.[speakingIndex];
    // if item is a string, it's both the prompt and target
    const prompt = typeof item === 'string' ? item : (item?.question ?? '');
    const target = typeof item === 'string' ? item : (item?.answer ?? item?.question ?? '');
    return { prompt, target };
  }

  // Stable ref for the target to avoid stale closures
  const evaluatorTargetRef = useRef<string>('');

  // Update the speaking index ref when it changes
  useEffect(() => { speakingIndexRef.current = speakingIndex; }, [speakingIndex]);

  // Reset attempt number and grammar corrections when question changes
  useEffect(() => {
    setCurrentAttemptNumber(1);
    setGrammarCorrections([]);
    setEvaluationResult(null);
  }, [speakingIndex, selectedModule]);

  const { isSpeaking, soundEnabled, toggleSound } = useTextToSpeech();
  const { earnXPForGrammarLesson, addXP } = useGamification();
  const { incrementGrammarLessons, incrementTotalExercises } = useBadgeSystem();
  
  const { avatarState, triggerState } = useAvatarState({
    isRecording,
    isSpeaking,
    isProcessing,
    lastMessageTime: lastResponseTime
  });

  // Progress checkpointing hook
  const checkpoints = useLessonCheckpoints(selectedLevel, selectedModule);

  // Checkpoint: Question started when entering speaking phase
  useEffect(() => {
    if (currentPhase === 'speaking' && selectedLevel && selectedModule) {
      checkpoints.checkpointMCQShown({
        level: selectedLevel,
        moduleId: selectedModule,
        questionIndex: speakingIndex,
        totalQuestions: 40
      });
    }
  }, [speakingIndex, currentPhase, selectedLevel, selectedModule, checkpoints.checkpointMCQShown]);

  // Completed modules state with localStorage sync
  const getCompletedModules = () => {
    try {
      const stored = localStorage.getItem('completedModules');
      const parsed = JSON.parse(stored || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  };
  
  const [completedModules, setCompletedModules] = useState<string[]>(getCompletedModules);

  // Check if module is unlocked
  const isModuleUnlocked = (moduleId: number) => {
    return true; // Unlock all modules for testing
  };

// A2 Level Modules (88-100)





  // Efficient module data lookup using object (O(1) vs O(n) with if-statements)
  const MODULE_DATA_MAP: Record<number, any> = {
    1: MODULE_1_DATA, 2: MODULE_2_DATA, 3: MODULE_3_DATA, 4: MODULE_4_DATA, 5: MODULE_5_DATA,
    6: MODULE_6_DATA, 7: MODULE_7_DATA, 8: MODULE_8_DATA, 9: MODULE_9_DATA, 10: MODULE_10_DATA,
    11: MODULE_11_DATA, 12: MODULE_12_DATA, 13: MODULE_13_DATA, 14: MODULE_14_DATA, 15: MODULE_15_DATA,
    16: MODULE_16_DATA, 17: MODULE_17_DATA, 18: MODULE_18_DATA, 19: MODULE_19_DATA, 20: MODULE_20_DATA,
    21: MODULE_21_DATA, 22: MODULE_22_DATA, 23: MODULE_23_DATA, 24: MODULE_24_DATA, 25: MODULE_25_DATA,
    26: MODULE_26_DATA, 27: MODULE_27_DATA, 28: MODULE_28_DATA, 29: MODULE_29_DATA, 30: MODULE_30_DATA,
    31: MODULE_31_DATA, 32: MODULE_32_DATA, 33: MODULE_33_DATA, 34: MODULE_34_DATA, 35: MODULE_35_DATA,
    36: MODULE_36_DATA, 37: MODULE_37_DATA, 38: MODULE_38_DATA, 39: MODULE_39_DATA, 40: MODULE_40_DATA,
    41: MODULE_41_DATA, 42: MODULE_42_DATA, 43: MODULE_43_DATA, 44: MODULE_44_DATA, 45: MODULE_45_DATA,
    46: MODULE_46_DATA, 47: MODULE_47_DATA, 48: MODULE_48_DATA, 49: MODULE_49_DATA, 50: MODULE_50_DATA,
    51: MODULE_51_DATA, 52: MODULE_52_DATA, 53: MODULE_53_DATA, 54: MODULE_54_DATA, 55: MODULE_55_DATA,
    56: MODULE_56_DATA, 57: MODULE_57_DATA, 58: MODULE_58_DATA, 59: MODULE_59_DATA, 60: MODULE_60_DATA,
    61: MODULE_61_DATA, 62: MODULE_62_DATA, 63: MODULE_63_DATA, 64: MODULE_64_DATA, 65: MODULE_65_DATA,
    66: MODULE_66_DATA, 67: MODULE_67_DATA,
    88: MODULE_88_DATA, 89: MODULE_89_DATA, 90: MODULE_90_DATA, 91: MODULE_91_DATA, 92: MODULE_92_DATA,
    93: MODULE_93_DATA, 94: MODULE_94_DATA, 95: MODULE_95_DATA, 96: MODULE_96_DATA, 97: MODULE_97_DATA,
    98: MODULE_98_DATA, 99: MODULE_99_DATA, 100: MODULE_100_DATA,
    101: MODULE_101_DATA, 102: MODULE_102_DATA, 103: MODULE_103_DATA, 104: MODULE_104_DATA, 105: MODULE_105_DATA,
    106: MODULE_106_DATA, 107: MODULE_107_DATA, 108: MODULE_108_DATA, 109: MODULE_109_DATA, 110: MODULE_110_DATA,
    111: MODULE_111_DATA, 112: MODULE_112_DATA, 113: MODULE_113_DATA, 114: MODULE_114_DATA, 115: MODULE_115_DATA,
    116: MODULE_116_DATA, 117: MODULE_117_DATA, 118: MODULE_118_DATA, 119: MODULE_119_DATA, 120: MODULE_120_DATA,
    121: MODULE_121_DATA, 122: MODULE_122_DATA, 123: MODULE_123_DATA, 124: MODULE_124_DATA, 125: MODULE_125_DATA,
    126: MODULE_126_DATA, 127: MODULE_127_DATA, 128: MODULE_128_DATA, 129: MODULE_129_DATA, 130: MODULE_130_DATA,
    131: MODULE_131_DATA, 132: MODULE_132_DATA, 133: MODULE_133_DATA, 134: MODULE_134_DATA, 135: MODULE_135_DATA,
    136: MODULE_136_DATA, 137: MODULE_137_DATA, 138: MODULE_138_DATA, 139: MODULE_139_DATA, 140: MODULE_140_DATA,
    141: MODULE_141_DATA, 142: MODULE_142_DATA, 143: MODULE_143_DATA, 144: MODULE_144_DATA, 145: MODULE_145_DATA,
    146: MODULE_146_DATA, 147: MODULE_147_DATA, 148: MODULE_148_DATA, 149: MODULE_149_DATA, 150: MODULE_150_DATA,
    151: MODULE_151_DATA, 152: MODULE_152_DATA, 153: MODULE_153_DATA, 154: MODULE_154_DATA, 155: MODULE_155_DATA,
    156: MODULE_156_DATA, 157: MODULE_157_DATA, 158: MODULE_158_DATA, 159: MODULE_159_DATA, 160: MODULE_160_DATA,
    161: MODULE_161_DATA, 162: MODULE_162_DATA, 163: MODULE_163_DATA, 164: MODULE_164_DATA, 165: MODULE_165_DATA,
    166: MODULE_166_DATA, 167: MODULE_167_DATA, 168: MODULE_168_DATA, 169: MODULE_169_DATA, 170: MODULE_170_DATA,
    171: MODULE_171_DATA, 172: MODULE_172_DATA, 173: MODULE_173_DATA, 174: MODULE_174_DATA, 175: MODULE_175_DATA,
    176: MODULE_176_DATA, 177: MODULE_177_DATA, 178: MODULE_178_DATA, 179: MODULE_179_DATA, 180: MODULE_180_DATA,
    181: MODULE_181_DATA, 182: MODULE_182_DATA, 183: MODULE_183_DATA, 184: MODULE_184_DATA, 185: MODULE_185_DATA,
    186: MODULE_186_DATA, 187: MODULE_187_DATA, 188: MODULE_188_DATA, 189: MODULE_189_DATA, 190: MODULE_190_DATA,
    191: MODULE_191_DATA, 192: MODULE_192_DATA, 193: MODULE_193_DATA, 194: MODULE_194_DATA, 195: MODULE_195_DATA,
    196: MODULE_196_DATA, 197: MODULE_197_DATA, 198: MODULE_198_DATA, 199: MODULE_199_DATA, 200: MODULE_200_DATA,
  };

  // Get current module data with O(1) lookup
  const getCurrentModuleData = () => {
    // Fallback for modules 68-87 (not yet implemented)
    if (selectedModule >= 68 && selectedModule <= 87) {
      return MODULE_DATA_MAP[51] || MODULE_1_DATA;
    }

    return MODULE_DATA_MAP[selectedModule] || MODULE_1_DATA;
  };

  // Calculate progress
  const currentModuleData = getCurrentModuleData();
  const totalQuestions = currentModuleData?.speakingPractice?.length ?? 0;
  const overallProgress = ((speakingIndex + (correctAnswers > 0 ? 1 : 0)) / totalQuestions) * 100;
  const lessonKey = `${selectedLevel}-${selectedModule}`;

  // Mobile detection using proper React hook
  const isMobile = useIsMobile();

  // Load progress on module change
  useEffect(() => {
    const p = getProgress(selectedLevel, selectedModule);
    if (p) {
      // resume at next unanswered item, but never past last
      const total = currentModuleData?.speakingPractice?.length ?? 0;
      const idx = Math.min(p.speakingIndex, total > 0 ? total - 1 : 0);
      setSpeakingIndex(idx);
    } else {
      setSpeakingIndex(0);
    }
  }, [selectedLevel, selectedModule, currentModuleData]);

  // MCQ Cache - generated once per module, prevents flicker across re-renders
  // MOVED HERE: Must come after getCurrentModuleData to avoid initialization error
  const mcqCache = useMemo(() => {
    const cache: Record<string, MultipleChoiceQuestion | null> = {};

    const moduleData = getCurrentModuleData();
    moduleData?.speakingPractice?.forEach((item, index) => {
      const key = `${selectedLevel}-${selectedModule}-${index}`;
      const practiceItem = typeof item === 'string'
        ? { question: item, answer: item }
        : item as SpeakingPracticeItem;

      // Generate MCQ with seeded shuffle using question index for deterministic ordering
      const mcq = generateMultipleChoiceQuestion(
        practiceItem.answer,
        index // Use index as seed for deterministic, stable shuffle
      );

      cache[key] = mcq;
    });

    // ========================================================================
    // MCQ VALIDATION - Ensure 100% coverage (should NEVER have nulls after fix)
    // ========================================================================
    const totalQuestions = moduleData?.speakingPractice?.length ?? 0;
    const successfulMCQs = Object.values(cache).filter(mcq => mcq !== null).length;
    const failedMCQs = Object.values(cache).filter(mcq => mcq === null).length;

    if (failedMCQs > 0) {
      console.error('🚨 CRITICAL: MCQs failed to generate!', {
        level: selectedLevel,
        module: selectedModule,
        total: totalQuestions,
        successful: successfulMCQs,
        failed: failedMCQs,
        coverage: `${((successfulMCQs / totalQuestions) * 100).toFixed(1)}%`
      });

      // Log which specific questions failed
      Object.entries(cache).forEach(([key, mcq]) => {
        if (!mcq) {
          const questionIndex = parseInt(key.split('-')[2]);
          const item = moduleData?.speakingPractice?.[questionIndex];
          const practiceItem = typeof item === 'string' ? { question: item, answer: item } : item;
          console.error(`  ❌ Question ${questionIndex + 1}:`, practiceItem?.answer || 'Unknown');
        }
      });
    } else {
      console.log(`✅ MCQ Coverage: ${successfulMCQs}/${totalQuestions} (100%) - Module ${selectedModule}`);
    }

    return cache;
  }, [selectedLevel, selectedModule]); // Only regenerate when module changes

  // Wrapper function to get speaking practice item using the cache
  const getSpeakingPracticeItem = useCallback((item: any, questionIndex: number): SpeakingPracticeItem => {
    const cacheKey = `${selectedLevel}-${selectedModule}-${questionIndex}`;
    const cachedMCQ = mcqCache[cacheKey];
    return getSpeakingPracticeItemBase(item, questionIndex, cachedMCQ);
  }, [selectedLevel, selectedModule, mcqCache]);

  // --- Visibility + narration guards ---
  const introRef = useRef<HTMLDivElement | null>(null);
  const introVisibleRef = useRef(false);
  const cancelAllNarration = useCallback(() => {
    try { narration.cancel(); } catch (error) { /* Ignore narration cancel errors */ }
  }, []);

  // Watch whether the actual Intro section is on screen
  useEffect(() => {
    if (!introRef.current || !('IntersectionObserver' in window)) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        // consider "visible" only when ≥60% of Intro is in view
        introVisibleRef.current = !!e && e.isIntersecting && e.intersectionRatio >= 0.6;
        if (!introVisibleRef.current) cancelAllNarration();
      },
      { threshold: [0, 0.6, 1] }
    );

    obs.observe(introRef.current);
    return () => obs.disconnect();
  }, [cancelAllNarration]);

  // Speak ONLY when Intro is the active phase AND the Intro block is visible.
  // Stop on any change.
  useEffect(() => {
    cancelAllNarration();

    const canRead =
      viewState === 'lesson' &&
      currentPhase === 'intro' &&
      selectedModule != null &&
      !!currentModuleData?.intro &&
      !hasBeenRead[lessonKey];
      // REMOVED: introVisibleRef.current dependency for immediate triggering

    console.log('🔍 Auto-reading check:', {
      viewState,
      currentPhase,
      selectedModule,
      hasIntro: !!currentModuleData?.intro,
      hasBeenRead: hasBeenRead[lessonKey],
      canRead
    });

    if (canRead) {
      console.log('🚀 Triggering auto-reading immediately for lesson:', currentModuleData?.title);
      
      // CRITICAL FIX: Run TTS test in parallel, don't block startAutoReading
      setTimeout(async () => {
        try {
          // Start reading immediately, don't wait for test
          console.log('🚀 Starting auto-reading immediately...');
          startAutoReading();
          
          // Run TTS test in parallel (non-blocking)
          console.log('🔧 Running TTS capability test in parallel...');
          Promise.race([
            testTTSCapabilities(),
            new Promise(resolve => setTimeout(resolve, 5000)) // 5 second timeout
          ]).then(() => {
            console.log('🔧 TTS capability test completed or timed out');
          }).catch(error => {
            console.warn('🔧 TTS capability test failed:', error);
          });
          
        } catch (error) {
          console.error('🚨 Critical error in auto-reading setup:', error);
          // Try to start reading anyway as fallback
          try {
            startAutoReading();
          } catch (fallbackError) {
            console.error('🚨 Fallback reading also failed:', fallbackError);
          }
        }
      }, 500);
    }

    return () => cancelAllNarration();
  }, [
    viewState,
    currentPhase,
    selectedModule,
    currentModuleData?.intro,
    hasBeenRead[lessonKey],
    cancelAllNarration
  ]);

  // Any phase that is not Intro must be silent
  useEffect(() => {
    if (currentPhase !== 'intro') cancelAllNarration();
  }, [currentPhase, cancelAllNarration]);

  // Cancel if menu opens or route/view changes
  useEffect(() => { cancelAllNarration(); }, [viewState, cancelAllNarration]);

  // Guard module changes and clear pending timers
  useEffect(() => {
    moduleGuardRef.current = selectedModule;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsProcessing(false);
  }, [selectedModule]);

  // Restore progress safely when a module opens
  const userId = 'anon'; // TODO: adapt to your auth; fallback to 'anon'
  const totals = {
    listening: currentModuleData?.listeningExamples?.length ?? 0,
    speaking: currentModuleData?.speakingPractice?.length ?? 0,
  };

  useEffect(() => {
    // Run when module changes; restore once.
    if (!selectedModule || !currentModuleData || restoredOnceRef.current) return;

    // Priority 1: Check checkpoint system first
    const checkpointProgress = checkpoints.currentProgress;
    if (checkpointProgress && !checkpointProgress.is_module_completed) {
      // Don't auto-restore from checkpoint - let user choose via dialog
      setCurrentPhase('intro'); // Start at intro, dialog will show resume option
      setSpeakingIndex(0);
    } else {
      // Priority 2: Fallback to old system if no checkpoint data
      const saved = loadModuleProgress(String(selectedLevel), selectedModule);
      if (saved && saved.phase !== 'complete') {
        // restore from old system
        setCurrentPhase(saved.phase);
        setSpeakingIndex(saved.questionIndex);
      } else {
        // fresh start for this module
        setCurrentPhase('intro');
        setSpeakingIndex(0);
      }
    }

    // Check if we should show resume dialog for checkpoint progress (ONCE per module load)
    if (checkpointProgress && !checkpointProgress.is_module_completed &&
        checkpointProgress.question_index > 0 && !dialogShownRef.current) {
      checkpoints.setShowResumeDialog(true);
      dialogShownRef.current = true;
    }

    restoredOnceRef.current = true;
    // also cancel any stray timers/narration here
    narration.cancel?.();
    if (timeoutRef?.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; }
  }, [selectedModule, currentModuleData, selectedLevel, checkpoints.currentProgress, checkpoints.setShowResumeDialog]);

  // Reset processing state when entering speaking phase (but don't change speakingIndex)
  useEffect(() => {
    if (currentPhase !== 'speaking') return;

    // Don't reset speakingIndex here - let restoration logic handle it
    // Just reset processing state
    lessonCompletedRef.current = false;
    if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; }
    setIsProcessing(false);
  }, [currentPhase]);

  // Save on any meaningful change (using old progress store)
  useEffect(() => {
    saveProgressDebounced();
  }, [selectedLevel, selectedModule, currentPhase, speakingIndex]);

  // Autosave on every meaningful change (debounced & guarded) - new progress store
  useEffect(() => {
    if (!selectedModule || !currentModuleData) return;

    // debounce a bit to avoid hammering storage
    if (autosaveTimeoutRef.current) window.clearTimeout(autosaveTimeoutRef.current);
    autosaveTimeoutRef.current = window.setTimeout(() => {
      saveModuleProgress(
        String(selectedLevel),
        selectedModule,
        currentPhase === 'speaking' ? 'speaking' as LessonPhaseType : 'intro',
        speakingIndex
      );
      autosaveTimeoutRef.current = null;
    }, 250);
  }, [userId, selectedLevel, selectedModule, currentPhase, speakingIndex, currentModuleData]);

  // Clean up on unmount
  useEffect(() => () => {
    if (autosaveTimeoutRef.current) clearTimeout(autosaveTimeoutRef.current);
  }, []);

  // Also save on tab hide/close
  useEffect(() => {
    const handler = () => {
      const snap = snapshotProgress();
      if (snap) setProgress(snap);
    };
    window.addEventListener('beforeunload', handler);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') handler();
    });
    return () => {
      window.removeEventListener('beforeunload', handler);
      document.removeEventListener('visibilitychange', handler as any);
    };
  }, []);

  // Hydration: Read from URL params, localStorage, or saved progress on mount
  useEffect(() => {
    if (isHydrated) return;
    
    const searchParams = new URLSearchParams(window.location.search);
    const urlLevel = searchParams.get('level');
    const urlModule = searchParams.get('module');
    const urlQuestion = searchParams.get('q');
    
    let hydratedLevel = '';
    let hydratedModule = 0;
    let hydratedQuestion = 0;
    let hydratedPhase: LessonPhase = 'intro';
    let hydratedViewState: ViewState = 'levels';
    let source = '';
    
    // Priority 1: URL parameters (wins over everything)
    if (urlLevel && urlModule) {
      hydratedLevel = urlLevel;
      hydratedModule = parseInt(urlModule);
      hydratedQuestion = urlQuestion ? parseInt(urlQuestion) : 0;
      hydratedPhase = hydratedQuestion > 0 ? 'speaking' : 'intro';
      hydratedViewState = 'lesson';
      source = 'params';
      
    }
    // Priority 2: Saved progress (resume functionality)
    else {
      const userId = 'guest'; // TODO: get from auth when available
      const lastPointer = resumeLastPointer(userId);
      
      if (lastPointer) {
        hydratedLevel = lastPointer.levelId;
        hydratedModule = parseInt(lastPointer.moduleId);
        hydratedQuestion = lastPointer.questionIndex;
        hydratedPhase = hydratedQuestion > 0 ? 'speaking' : 'intro';
        hydratedViewState = 'lesson';
        source = 'saved_progress';
        
      }
      // Priority 3: localStorage (placed level from Speaking Test)
      else {
        const storedLevel = localStorage.getItem('currentLevel');
        const storedModule = localStorage.getItem('currentModule');
        
        if (storedLevel && storedModule) {
          hydratedLevel = storedLevel;
          hydratedModule = parseInt(storedModule);
          hydratedQuestion = 0;
          hydratedPhase = 'intro';
          hydratedViewState = 'lesson';
          source = 'storage';
          
        }
        // Priority 4: Default fallback (A1/Module 1)
        else {
          hydratedLevel = 'A1';
          hydratedModule = 1;
          hydratedQuestion = 0;
          hydratedPhase = 'intro';
          hydratedViewState = 'levels';
          source = 'default';
          
        }
      }
    }
    
    // Apply hydrated state
    if (hydratedLevel && hydratedModule) {
      setSelectedLevel(hydratedLevel);
      setSelectedModule(hydratedModule);
      setViewState(hydratedViewState);
      
      if (hydratedQuestion > 0) {
        setCurrentPhase('speaking');
        setSpeakingIndex(hydratedQuestion);
      } else {
        setCurrentPhase('intro');
        setSpeakingIndex(0);
      }
    }
    
    setIsHydrated(true);
    
    // Show placement toast if this came from Speaking Test
    const userPlacement = localStorage.getItem('userPlacement');
    if (userPlacement && source === 'storage') {
      try {
        const placement = JSON.parse(userPlacement);
        const placedLevel = placement.level;
        const testTime = placement.at;
        const now = Date.now();
        
        // Show toast if placement was recent (within last 5 minutes)
        if (testTime && (now - testTime) < 300000) {
          setTimeout(() => {
            // Use toast import from hooks/use-toast
            import('@/hooks/use-toast').then(({ toast }) => {
              toast({
                title: `Starting at ${placedLevel} based on your Speaking Test`,
                description: `You've been placed in ${placedLevel} level. Good luck!`,
                duration: 3000,
              });
            }).catch(error => {
              // Fallback notification
            });
          }, 500);
        }
      } catch (e) {
      }
    }
  }, [isHydrated]);

  // Keep evaluator target fresh when index or module changes
  useEffect(() => {
    const item = currentModuleData?.speakingPractice?.[speakingIndex];
    evaluatorTargetRef.current = computeTargetFromItem(item);
    // QA log to confirm we're using the right target
  }, [selectedModule, speakingIndex, currentModuleData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      narration.cancel();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // QA logging
  useEffect(() => {
    const total = currentModuleData?.speakingPractice?.length ?? 0;
    const item = currentModuleData?.speakingPractice?.[speakingIndex];
    if (!item) {
      // No item found at current index
      return;
    }
  }, [speakingIndex, selectedModule, currentModuleData]);

  function celebrateAndAdvance() {
    // show confetti briefly
    setShowConfetti(true);

    // Award bonus XP for completion
    addXP(100, 'grammar');
    incrementGrammarLessons();

    // persist completion before moving
    try {
      const snap = snapshotProgress();
      if (snap) {
        setProgress({
          ...snap,
          speakingIndex: (currentModuleData?.speakingPractice?.length ?? 1) - 1,
          completed: true,
          phase: 'complete' as const
        });
      }
    } catch (error) { /* Ignore error */ }

    // persist completion in new progress store
    saveModuleProgress(
      String(selectedLevel),
      selectedModule,
      'complete',
      speakingIndexRef.current
    );

    // Save progress to completed modules
    const newCompletedModules = [...completedModules];
    const moduleKey = `module-${selectedModule}`;
    if (!newCompletedModules.includes(moduleKey)) {
      newCompletedModules.push(moduleKey);
      setCompletedModules(newCompletedModules);
      localStorage.setItem('completedModules', JSON.stringify(newCompletedModules));
    }

    narration.cancel();
    narration.speak(`Congratulations! You have completed Module ${selectedModule}. Well done!`);

    const nextModule = getNextModuleId(selectedLevel as 'A1' | 'A2' | 'B1', selectedModule);
    window.setTimeout(() => {
      setShowConfetti(false);

      if (nextModule != null) {
        // reset lesson state for the next module
        setSelectedModule(nextModule);
        // restoredOnceRef needs to be reset so the new module can be restored
        restoredOnceRef.current = false;
        // dialogShownRef needs to be reset so the new module can show dialog if needed
        dialogShownRef.current = false;
        setCurrentPhase('intro');
        setSpeakingIndex(0);
        setFeedback('');
        setFeedbackType('info');
        lessonCompletedRef.current = false;
      } else {
        // if there is no next module, go back to the modules list
        setViewState('modules');
      }
    }, 1600);
  }

  // Enhanced progress update every correct answer (Module 51 standard)
  // Now handles both multiple choice and speaking completion
  function advanceSpeakingOnce() {
    const total = currentModuleData?.speakingPractice?.length ?? 0;
    const curr = speakingIndexRef.current;
    const rawItem = currentModuleData?.speakingPractice?.[curr];
    const currentPracticeItem = rawItem ? getSpeakingPracticeItem(rawItem, curr) : null;
    const currentState = questionStates[curr] || { selectedChoice: undefined, choiceCorrect: false, speechCompleted: false };

    // Mark speech as completed for current question
    setQuestionStates(prev => ({
      ...prev,
      [curr]: { ...currentState, speechCompleted: true }
    }));

    // Check if this question is fully complete (both multiple choice and speech)
    const isQuestionComplete = !currentPracticeItem?.multipleChoice || (
      currentState.choiceCorrect && true // speech just completed
    );

    if (!isQuestionComplete) {
      // Question not fully complete, don't advance yet
      setSpeakStatus('idle');
      setIsProcessing(false);
      return;
    }

    // Checkpoint: Question completed
    checkpoints.checkpointQuestionComplete({
      level: selectedLevel,
      moduleId: selectedModule,
      questionIndex: curr,
      totalQuestions: total,
      completed: curr + 1 >= total
    });

    // Save progress after each question (exact resume point)
    saveModuleProgress(String(selectedLevel), selectedModule!, 'speaking', curr + 1);

    // still inside the range → move to next question
    if (curr + 1 < total) {
      setSpeakingIndex(curr + 1);
      setSpeakStatus('idle');
      setIsProcessing(false);
      
      // Clear feedback for next question
      setFeedback('');
      setFeedbackType('info');
      return;
    }

    // curr is the last index → celebrate and move on
    setSpeakStatus('idle');
    setIsProcessing(false);
    celebrateAndAdvance();
  }

  // Auto-reading functionality with language detection
  const startAutoReading = async () => {
    console.log('🎬 startAutoReading called!');
    setIsTeacherReading(true);
    // Keep phase as 'intro' during reading so content stays visible
    
    try {
      // IMMEDIATE FIX: Use simple language-aware reading
      console.log('🎯 Starting quick language-aware reading for lesson:', currentModuleData.title);
      
      // Set initial progress
      setReadingProgress({
        isReading: true,
        currentSection: 'Initializing',
        progress: 0,
        currentText: 'Preparing to read lesson...'
      });
      
      // Import language detection
      const { segmentMixedContent } = await import('@/utils/languageDetection');
      const { VoiceConsistencyManager } = await import('@/config/voice');
      
      // Initialize voice system
      await VoiceConsistencyManager.initialize();
      
      // Calculate total sections
      let totalSections = 0;
      if (currentModuleData.title) totalSections++;
      if (currentModuleData.description) totalSections++;
      if (currentModuleData.intro) totalSections++;
      if ('tip' in currentModuleData && currentModuleData.tip) totalSections++;
      
      let completedSections = 0;
      
      // Read title
      if (currentModuleData.title) {
        setReadingProgress({
          isReading: true,
          currentSection: 'Title',
          progress: (completedSections / totalSections) * 100,
          currentText: currentModuleData.title
        });
        
        console.log('📖 Reading title...');
        const titleSegments = segmentMixedContent(currentModuleData.title);
        for (let i = 0; i < titleSegments.length; i++) {
          const segment = titleSegments[i];
          console.log(`📝 Title segment ${i + 1}/${titleSegments.length}: "${segment.text}" (${segment.language})`);
          await speakSegmentWithRetry(segment.text, segment.language === 'tr' ? 'tr' : 'en');
          
          // Language-aware pausing for smooth transitions
          if (i < titleSegments.length - 1) {
            const nextSegment = titleSegments[i + 1];
            const needsLanguageSwitch = segment.language !== nextSegment.language;
            const pauseDuration = needsLanguageSwitch ? 400 : 150; // Longer pause for language switch
            await new Promise(resolve => setTimeout(resolve, pauseDuration));
          }
        }
        completedSections++;
        await new Promise(resolve => setTimeout(resolve, 800)); // Longer pause after title
      }
      
      // Read description  
      if (currentModuleData.description) {
        setReadingProgress({
          isReading: true,
          currentSection: 'Description',
          progress: (completedSections / totalSections) * 100,
          currentText: currentModuleData.description
        });
        
        console.log('📖 Reading description...');
        const descSegments = segmentMixedContent(currentModuleData.description);
        for (let i = 0; i < descSegments.length; i++) {
          const segment = descSegments[i];
          console.log(`📝 Description segment ${i + 1}/${descSegments.length}: "${segment.text}" (${segment.language})`);
          await speakSegmentWithRetry(segment.text, segment.language === 'tr' ? 'tr' : 'en');
          
          // Language-aware pausing for smooth transitions
          if (i < descSegments.length - 1) {
            const nextSegment = descSegments[i + 1];
            const needsLanguageSwitch = segment.language !== nextSegment.language;
            const pauseDuration = needsLanguageSwitch ? 400 : 150;
            await new Promise(resolve => setTimeout(resolve, pauseDuration));
          }
        }
        completedSections++;
        await new Promise(resolve => setTimeout(resolve, 800)); // Longer pause after description
      }
      
      // Read intro
      if (currentModuleData.intro) {
        setReadingProgress({
          isReading: true,
          currentSection: 'Introduction',
          progress: (completedSections / totalSections) * 100,
          currentText: currentModuleData.intro.substring(0, 100) + '...'
        });
        
        console.log('📖 Reading intro...');
        const introSegments = segmentMixedContent(currentModuleData.intro);
        for (let i = 0; i < introSegments.length; i++) {
          const segment = introSegments[i];
          console.log(`📝 Intro segment ${i + 1}/${introSegments.length}: "${segment.text}" (${segment.language})`);
          await speakSegmentWithRetry(segment.text, segment.language === 'tr' ? 'tr' : 'en');
          
          // Language-aware pausing for smooth transitions
          if (i < introSegments.length - 1) {
            const nextSegment = introSegments[i + 1];
            const needsLanguageSwitch = segment.language !== nextSegment.language;
            const pauseDuration = needsLanguageSwitch ? 400 : 150;
            await new Promise(resolve => setTimeout(resolve, pauseDuration));
          }
        }
        completedSections++;
      }
      
      // Read tip if available
      if ('tip' in currentModuleData && currentModuleData.tip) {
        setReadingProgress({
          isReading: true,
          currentSection: 'Grammar Tip',
          progress: (completedSections / totalSections) * 100,
          currentText: `Grammar tip: ${currentModuleData.tip}`
        });
        
        console.log('📖 Reading grammar tip...');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Pause before tip
        const tipText = `Grammar tip: ${currentModuleData.tip}`;
        const tipSegments = segmentMixedContent(tipText);
        for (let i = 0; i < tipSegments.length; i++) {
          const segment = tipSegments[i];
          console.log(`📝 Tip segment ${i + 1}/${tipSegments.length}: "${segment.text}" (${segment.language})`);
          await speakSegmentWithRetry(segment.text, segment.language === 'tr' ? 'tr' : 'en');
          
          if (i < tipSegments.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 200));
          }
        }
        completedSections++;
      }
      
      // Mark as completed
      setReadingProgress({
        isReading: false,
        currentSection: 'Completed',
        progress: 100,
        currentText: 'Lesson reading completed successfully!'
      });
      
      setIsTeacherReading(false);
      setReadingComplete(true);
      setCurrentPhase('listening');
      setHasBeenRead(prev => ({ ...prev, [lessonKey]: true }));
      
      console.log('✅ Language-aware reading completed successfully');
      
    } catch (error) {
      console.error('❌ Error during auto-reading:', error);
      console.error('❌ Error stack:', error.stack);
      setIsTeacherReading(false);
      // Fallback to old reading method if auto-reader fails
      console.log('🔄 Falling back to legacy reading...');
      startLegacyTeacherReading();
    }
  };
  
  // RETRY FUNCTION: Enhanced TTS with retry logic and fallbacks
  const speakSegmentWithRetry = async (text: string, language: 'en' | 'tr', maxRetries: number = 2): Promise<void> => {
    let attempt = 0;
    
    while (attempt <= maxRetries) {
      try {
        console.log(`🔧 Attempt ${attempt + 1}/${maxRetries + 1} for: "${text.substring(0, 30)}..."`);
        await speakSegmentCore(text, language);
        console.log(`🔧 ✅ Success on attempt ${attempt + 1} for: "${text.substring(0, 30)}..."`);
        return; // Success!
      } catch (error) {
        attempt++;
        console.error(`🔧 ❌ Attempt ${attempt} failed for: "${text.substring(0, 30)}...":`, error);
        
        if (attempt <= maxRetries) {
          console.log(`🔧 🔄 Retrying in 1 second... (attempt ${attempt + 1}/${maxRetries + 1})`);
          
          try {
            // Reset speechSynthesis state before retry
            speechSynthesis.cancel();
            await new Promise(resolve => setTimeout(resolve, 1000));
          } catch (resetError) {
            console.warn('🔧 Error during retry setup:', resetError);
          }
        } else {
          // Last resort: Try basic TTS without advanced features
          console.log(`🔧 🚨 Trying basic fallback TTS for: "${text.substring(0, 30)}..."`);
          try {
            await basicTTSFallback(text, language);
            console.log(`🔧 ✅ Basic fallback succeeded for: "${text.substring(0, 30)}..."`);
            return;
          } catch (fallbackError) {
            console.error(`🔧 💀 Even basic fallback failed for: "${text.substring(0, 30)}...":`, fallbackError);
          }
        }
      }
    }
    
    console.error(`🔧 💀 All attempts failed for: "${text.substring(0, 30)}..." - continuing anyway`);
    // Continue anyway to not block the entire reading process
  };

  // FALLBACK: Basic TTS without advanced features
  const basicTTSFallback = async (text: string, language: 'en' | 'tr'): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        const utterance = new SpeechSynthesisUtterance(text.trim());
        utterance.lang = language === 'tr' ? 'tr-TR' : 'en-US';
        utterance.rate = 0.9;
        utterance.volume = 1.0;
        utterance.pitch = 1.0;
        
        utterance.onend = () => resolve();
        utterance.onerror = (event) => reject(new Error(`Basic TTS error: ${event.error}`));
        
        speechSynthesis.speak(utterance);
        
        // Basic timeout
        setTimeout(() => {
          speechSynthesis.cancel();
          resolve(); // Don't reject to avoid blocking
        }, 5000);
        
      } catch (error) {
        reject(error);
      }
    });
  };

  // CRITICAL DEBUG: Enhanced TTS implementation with comprehensive logging
  const speakSegmentCore = async (text: string, language: 'en' | 'tr'): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      const debugId = Math.random().toString(36).substr(2, 9);
      console.log(`🔧 [${debugId}] speakSegment STARTED for ${language}: "${text.trim()}"`);
      
      try {
        // Skip empty or whitespace-only text
        if (!text || text.trim().length === 0) {
          console.log(`🔧 [${debugId}] SKIPPING empty text`);
          resolve();
          return;
        }

        // 1. DEBUG: Log speechSynthesis state before starting
        console.log(`🔧 [${debugId}] speechSynthesis.speaking: ${speechSynthesis.speaking}`);
        console.log(`🔧 [${debugId}] speechSynthesis.pending: ${speechSynthesis.pending}`);
        console.log(`🔧 [${debugId}] speechSynthesis.paused: ${speechSynthesis.paused}`);

        // Wait for any existing speech to complete first
        console.log(`🔧 [${debugId}] Waiting for speech to finish...`);
        await waitForSpeechToFinish();
        console.log(`🔧 [${debugId}] Speech wait completed`);

        // 2. DEBUG: Create utterance and log initial state
        const utterance = new SpeechSynthesisUtterance(text.trim());
        console.log(`🔧 [${debugId}] Utterance created for text: "${text.trim()}"`);
        
        const { VoiceConsistencyManager } = require('@/config/voice');
        
        // 3. DEBUG: Ensure voices are loaded with detailed logging
        console.log(`🔧 [${debugId}] Ensuring voices are loaded...`);
        await ensureVoicesLoaded();
        const voices = speechSynthesis.getVoices();
        console.log(`🔧 [${debugId}] Available voices count: ${voices.length}`);
        console.log(`🔧 [${debugId}] Available ${language} voices:`, 
          voices.filter(v => language === 'tr' ? v.lang.startsWith('tr') : v.lang.startsWith('en')).map(v => v.name));
        
        // 4. DEBUG: Configure voice with detailed logging
        console.log(`🔧 [${debugId}] Configuring voice for language: ${language}`);
        const success = VoiceConsistencyManager.configureUtterance(utterance, text, language);
        console.log(`🔧 [${debugId}] VoiceConsistencyManager.configureUtterance success: ${success}`);
        
        if (!success) {
          console.warn(`🔧 [${debugId}] Failed to configure ${language} voice, attempting fallback`);
          const fallbackVoice = language === 'tr' 
            ? voices.find(v => v.lang.startsWith('tr'))
            : voices.find(v => v.lang.startsWith('en'));
          if (fallbackVoice) {
            utterance.voice = fallbackVoice;
            console.log(`🔧 [${debugId}] Using fallback ${language} voice: ${fallbackVoice.name}`);
          } else {
            console.error(`🔧 [${debugId}] NO FALLBACK VOICE FOUND for language: ${language}`);
          }
        }

        // 5. DEBUG: Log final voice selection
        console.log(`🔧 [${debugId}] Final selected voice:`, utterance.voice ? utterance.voice.name : 'NULL');
        console.log(`🔧 [${debugId}] Final voice lang:`, utterance.voice ? utterance.voice.lang : 'N/A');

        // 6. DEBUG: Configure speech parameters with logging
        utterance.rate = language === 'tr' ? 0.85 : 0.9;
        utterance.volume = 1.0;
        utterance.pitch = language === 'tr' ? 1.0 : 0.95;
        console.log(`🔧 [${debugId}] Speech params - rate: ${utterance.rate}, volume: ${utterance.volume}, pitch: ${utterance.pitch}`);
        
        let completed = false;
        let startTriggered = false;

        // 7. DEBUG: Enhanced event handling with detailed logging
        utterance.onstart = () => {
          startTriggered = true;
          console.log(`🔧 [${debugId}] ✅ ONSTART triggered - Audio playback started!`);
          console.log(`🔧 [${debugId}] speechSynthesis.speaking during onstart: ${speechSynthesis.speaking}`);
        };

        utterance.onend = () => {
          if (!completed) {
            completed = true;
            clearInterval(monitor); // Stop monitoring
            console.log(`🔧 [${debugId}] ✅ ONEND triggered - Audio playback finished`);
            console.log(`🔧 [${debugId}] startTriggered was: ${startTriggered}`);
            resolve();
          }
        };

        utterance.onerror = (event) => {
          if (!completed) {
            completed = true;
            clearInterval(monitor); // Stop monitoring
            console.error(`🔧 [${debugId}] ❌ ONERROR triggered:`, event.error, event);
            console.log(`🔧 [${debugId}] startTriggered was: ${startTriggered}`);
            reject(new Error(`TTS Error: ${event.error}`)); // Properly throw error for retry
          }
        };

        utterance.onpause = () => {
          console.log(`🔧 [${debugId}] ⏸️ ONPAUSE triggered`);
        };

        utterance.onresume = () => {
          console.log(`🔧 [${debugId}] ▶️ ONRESUME triggered`);
        };

        utterance.onboundary = (event) => {
          console.log(`🔧 [${debugId}] 🏁 ONBOUNDARY triggered:`, event.name);
        };

        // 8. DEBUG: Log speechSynthesis state right before speak
        console.log(`🔧 [${debugId}] About to call speechSynthesis.speak()`);
        console.log(`🔧 [${debugId}] speechSynthesis state before speak:`, {
          speaking: speechSynthesis.speaking,
          pending: speechSynthesis.pending,
          paused: speechSynthesis.paused
        });

        // 9. DEBUG: Start monitoring and call speak with error handling
        const monitor = monitorSpeechSynthesis(debugId, 500); // Monitor every 500ms
        
        try {
          speechSynthesis.speak(utterance);
          console.log(`🔧 [${debugId}] ✅ speechSynthesis.speak() called successfully`);
        } catch (speakError) {
          console.error(`🔧 [${debugId}] ❌ speechSynthesis.speak() threw error:`, speakError);
          clearInterval(monitor);
          completed = true;
          resolve();
          return;
        }

        // 10. DEBUG: Log state immediately after speak call
        setTimeout(() => {
          console.log(`🔧 [${debugId}] speechSynthesis state after speak (100ms delay):`, {
            speaking: speechSynthesis.speaking,
            pending: speechSynthesis.pending,
            paused: speechSynthesis.paused
          });
          console.log(`🔧 [${debugId}] startTriggered so far: ${startTriggered}`);
        }, 100);

        // 11. DEBUG: Enhanced timeout with diagnostic info
        setTimeout(() => {
          if (!completed) {
            completed = true;
            clearInterval(monitor); // Stop monitoring
            console.error(`🔧 [${debugId}] ⏰ TIMEOUT REACHED (10s)`);
            console.log(`🔧 [${debugId}] Final diagnostic:`, {
              startTriggered,
              speechSynthesis_speaking: speechSynthesis.speaking,
              speechSynthesis_pending: speechSynthesis.pending,
              voice_name: utterance.voice?.name || 'NULL',
              voice_lang: utterance.voice?.lang || 'N/A',
              text_length: text.trim().length
            });
            speechSynthesis.cancel();
            
            // If onstart never triggered, this might be a voice/audio issue - retry
            if (!startTriggered) {
              reject(new Error('TTS Timeout - onstart never triggered (possible voice/audio issue)'));
            } else {
              // If onstart was triggered but onend didn't fire, continue without retry
              resolve();
            }
          }
        }, 10000);
        
      } catch (error) {
        console.error(`🔧 [${debugId}] ❌ speakSegment EXCEPTION:`, error);
        reject(error); // Propagate error for retry
      }
    });
  };

  // Helper: Wait for any existing speech to finish
  const waitForSpeechToFinish = (): Promise<void> => {
    return new Promise((resolve) => {
      if (!speechSynthesis.speaking) {
        resolve();
        return;
      }

      const checkSpeech = () => {
        if (!speechSynthesis.speaking) {
          resolve();
        } else {
          setTimeout(checkSpeech, 50);
        }
      };
      
      checkSpeech();
    });
  };

  // DIAGNOSTIC FUNCTION: Test TTS capabilities and voice selection (NON-BLOCKING)
  const testTTSCapabilities = async () => {
    try {
      console.log('🔧 ===== TTS CAPABILITY TEST =====');
      
      // 1. Test speechSynthesis availability
      console.log('🔧 speechSynthesis available:', 'speechSynthesis' in window);
      if (!('speechSynthesis' in window)) {
        throw new Error('speechSynthesis not available in this browser');
      }
      
      console.log('🔧 speechSynthesis state:', {
        speaking: speechSynthesis.speaking,
        pending: speechSynthesis.pending,
        paused: speechSynthesis.paused
      });
      
      // 2. Test voice loading with timeout
      console.log('🔧 Loading voices...');
      try {
        await Promise.race([
          ensureVoicesLoaded(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Voice loading timeout')), 2000))
        ]);
      } catch (error) {
        console.warn('🔧 Voice loading failed:', error.message);
      }
      
      const voices = speechSynthesis.getVoices();
      console.log('🔧 Total voices available:', voices.length);
      
      // 3. Test English voices
      const englishVoices = voices.filter(v => v.lang.startsWith('en'));
      console.log('🔧 English voices:', englishVoices.map(v => `${v.name} (${v.lang})`));
      
      // 4. Test Turkish voices
      const turkishVoices = voices.filter(v => v.lang.startsWith('tr'));
      console.log('🔧 Turkish voices:', turkishVoices.map(v => `${v.name} (${v.lang})`));
      
      // 5. Test VoiceConsistencyManager (with error handling)
      try {
        const { VoiceConsistencyManager } = require('@/config/voice');
        const testUtterance = new SpeechSynthesisUtterance('test');
        const success = VoiceConsistencyManager.configureUtterance(testUtterance, 'test', 'en');
        console.log('🔧 VoiceConsistencyManager configure success:', success);
        console.log('🔧 Selected voice after configure:', testUtterance.voice?.name || 'NULL');
      } catch (error) {
        console.warn('🔧 VoiceConsistencyManager test failed:', error.message);
      }
      
      // 6. Test simple TTS (quick, non-blocking)
      console.log('🔧 Testing simple TTS...');
      try {
        const simpleUtterance = new SpeechSynthesisUtterance('Test');
        simpleUtterance.volume = 0.1; // Very quiet for testing
        simpleUtterance.rate = 2.0;   // Very fast for testing
        simpleUtterance.pitch = 1.0;
        
        simpleUtterance.onstart = () => console.log('🔧 Simple TTS started successfully');
        simpleUtterance.onend = () => console.log('🔧 Simple TTS ended successfully');
        simpleUtterance.onerror = (e) => console.warn('🔧 Simple TTS error:', e.error);
        
        speechSynthesis.speak(simpleUtterance);
        console.log('🔧 Simple TTS speak() called without error');
      } catch (error) {
        console.warn('🔧 Simple TTS speak() threw error:', error.message);
      }
      
      console.log('🔧 ===== END TTS CAPABILITY TEST =====');
    } catch (error) {
      console.error('🔧 TTS Capability test failed:', error.message);
      throw error; // Re-throw for Promise.race timeout handling
    }
  };

  // DIAGNOSTIC FUNCTION: Monitor speechSynthesis state continuously
  const monitorSpeechSynthesis = (debugId: string, intervalMs: number = 1000) => {
    console.log(`🔧 [${debugId}] Starting speechSynthesis monitoring...`);
    
    const monitor = setInterval(() => {
      console.log(`🔧 [${debugId}] Monitor:`, {
        speaking: speechSynthesis.speaking,
        pending: speechSynthesis.pending,
        paused: speechSynthesis.paused,
        voicesLength: speechSynthesis.getVoices().length
      });
    }, intervalMs);
    
    // Auto-stop monitoring after 30 seconds
    setTimeout(() => {
      clearInterval(monitor);
      console.log(`🔧 [${debugId}] Stopped speechSynthesis monitoring`);
    }, 30000);
    
    return monitor;
  };

  // Helper: Ensure voices are loaded
  const ensureVoicesLoaded = (): Promise<void> => {
    return new Promise((resolve) => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        resolve();
        return;
      }

      const voicesChangedHandler = () => {
        const voices = speechSynthesis.getVoices();
        if (voices.length > 0) {
          speechSynthesis.removeEventListener('voiceschanged', voicesChangedHandler);
          resolve();
        }
      };

      speechSynthesis.addEventListener('voiceschanged', voicesChangedHandler);
      
      // Timeout fallback
      setTimeout(() => {
        speechSynthesis.removeEventListener('voiceschanged', voicesChangedHandler);
        resolve();
      }, 3000);
    });
  };

  // Legacy teacher reading (fallback)
  const startLegacyTeacherReading = async () => {
    setIsTeacherReading(true);
    setCurrentPhase('teacher-reading');
    narration.cancel();
    
    const introLines = currentModuleData.intro.split('\n');
    
    for (const line of introLines) {
      if (line.trim() && !line.includes('Tabela') && !line.includes('tablo')) {
        await new Promise<void>((resolve) => {
          narration.speak(line);
          const ms = Math.max(1200, line.split(' ').length * 350);
          setTimeout(resolve, ms);
        });
      }
    }
    
    if ('table' in currentModuleData && currentModuleData.table) {
      await new Promise<void>((resolve) => {
        narration.speak("Şimdi lütfen aşağıdaki tabloya göz atın.");
        setTimeout(resolve, 2000);
      });
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    setIsTeacherReading(false);
    setReadingComplete(true);
    setCurrentPhase('listening');
    setHasBeenRead(prev => ({ ...prev, [lessonKey]: true }));
  };

  // Audio recording setup
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [microphoneError, setMicrophoneError] = useState<string | null>(null);
  const [retryAttempts, setRetryAttempts] = useState(0);
  const [grammarCorrections, setGrammarCorrections] = useState<GrammarCorrection[]>([]);
  const [currentAttemptNumber, setCurrentAttemptNumber] = useState(1);
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);

  const initializeRecorder = useCallback(async (isRetry = false) => {
    try {
      setMicrophoneError(null);
      
      if (isRetry) {
      } else {
      }
      
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Browser does not support microphone access. Please use a modern browser like Chrome, Firefox, or Safari.');
      }
      
      // More permissive audio constraints for better compatibility
      const audioConstraints = {
        audio: {
          sampleRate: { ideal: 24000, min: 16000, max: 48000 },
          channelCount: { ideal: 1 },
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          // Remove specific device requirements for better compatibility
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(audioConstraints);
      
      // Stream info: streamId=${stream.id}, audioTracks=${stream.getAudioTracks().length}, trackSettings=${JSON.stringify(stream.getAudioTracks()[0]?.getSettings())}
      
      // Check MediaRecorder support with fallback mimeTypes
      let mimeType = 'audio/webm;codecs=opus';
      const supportedTypes = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/mp4',
        'audio/wav'
      ];
      
      const supportedType = supportedTypes.find(type => MediaRecorder.isTypeSupported(type));
      if (supportedType) {
        mimeType = supportedType;
      } else {
      }
      
      const recorder = new MediaRecorder(stream, { mimeType });
      
      let currentAudioChunks: Blob[] = [];
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          currentAudioChunks.push(event.data);
        }
      };
      
      recorder.onstart = () => {
        currentAudioChunks = [];
        setRetryAttempts(0); // Reset retry count on successful start
      };
      
      recorder.onstop = async () => {
        
        if (currentAudioChunks.length > 0) {
          const totalSize = currentAudioChunks.reduce((sum, chunk) => sum + chunk.size, 0);
          
          if (totalSize > 1000) { // Minimum 1KB for meaningful audio
            const audioBlob = new Blob(currentAudioChunks, { type: mimeType });
            // Audio blob created - size: ${audioBlob.size}, type: ${audioBlob.type}, chunks: ${currentAudioChunks.length}
            
            // Additional validation: check if blob is actually audio data
            if (audioBlob.size > 0 && audioBlob.type.includes('audio')) {
              await processAudioRecording(audioBlob);
            } else {
              setFeedback('Invalid audio format. Please try again.');
              setFeedbackType('error');
              setTimeout(() => {
                setFeedback('');
                setIsProcessing(false);
              }, 3000);
            }
          } else {
            setFeedback('Recording too short. Please speak for at least 2 seconds.');
            setFeedbackType('error');
            setTimeout(() => {
              setFeedback('');
              setIsProcessing(false);
            }, 3000);
          }
          currentAudioChunks = [];
        } else {
          setFeedback('No audio was captured. Please check your microphone and try again.');
          setFeedbackType('error');
          setTimeout(() => {
            setFeedback('');
            setIsProcessing(false);
          }, 3000);
        }
      };
      
      recorder.onerror = (event: any) => {
        // No generic error feedback - let the flow auto-retry
        setIsRecording(false);
        setIsProcessing(false);
      };
      
      setMediaRecorder(recorder);
      
    } catch (error: any) {
      
      let errorMessage = 'Unable to access microphone. ';
      let shouldRetry = false;
      
      // Detailed error handling for better user experience
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        errorMessage = 'Microphone access was denied. Please allow microphone access in your browser settings and refresh the page.';
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        errorMessage = 'No microphone found. Please connect a microphone and try again.';
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        errorMessage = 'Microphone is already in use by another application. Please close other apps and try again.';
        shouldRetry = true;
      } else if (error.name === 'OverconstrainedError' || error.name === 'ConstraintNotSatisfiedError') {
        errorMessage = 'Microphone settings not supported. Trying with different settings...';
        shouldRetry = true;
      } else if (error.name === 'AbortError') {
        errorMessage = 'Microphone access was aborted. Please try again.';
        shouldRetry = true;
      } else if (error.message) {
        errorMessage += error.message;
        shouldRetry = true;
      } else {
        errorMessage += 'Please check your browser permissions and try again.';
        shouldRetry = true;
      }
      
      setMicrophoneError(errorMessage);
      setFeedback(errorMessage);
      setFeedbackType('error');
      
      // Auto-retry with simpler constraints for compatibility issues
      if (shouldRetry && retryAttempts < 2) {
        setTimeout(() => {
          setRetryAttempts(prev => prev + 1);
          initializeRecorder(true);
        }, 2000);
      }
    }
  }, [retryAttempts]);

  useEffect(() => {
    // Initialize media recorder when component mounts
    initializeRecorder();
    
    // Cleanup function
    return () => {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
    };
  }, [initializeRecorder]);

  // Start lesson with intro - but don't auto-advance, let user control
  useEffect(() => {
    if (currentPhase === 'intro' && viewState === 'lesson') {
      // Don't auto-advance from intro phase, let user read and proceed manually
      
      // Start progress tracking session when entering a lesson
      if (selectedLevel && selectedModule && !currentSessionId) {
        const sessionId = progressTracker.startLearningSession(selectedModule, selectedLevel);
        setCurrentSessionId(sessionId);
      }
    }
  }, [currentPhase, viewState, selectedLevel, selectedModule, currentSessionId]);

  // Debug speakingIndex changes
  useEffect(() => {
    const total = currentModuleData?.speakingPractice?.length ?? 0;
    const item = currentModuleData?.speakingPractice?.[speakingIndex];
    
    // Safety: Ensure isProcessing is reset when moving to new question
    if (isProcessing) {
      setIsProcessing(false);
    }
  }, [speakingIndex, currentModuleData, isProcessing]);

  const processAudioRecording = useCallback(async (audioBlob: Blob) => {
    // 🔒 CRITICAL: Prevent concurrent processing and lock current state
    if (isProcessing) {
      return;
    }

    setIsProcessing(true);
    setAttempts(prev => prev + 1);
    setCurrentQuestionRetries(prev => prev + 1);

    // Checkpoint: Speech recording started
    checkpoints.checkpointSpeechStarted({
      level: selectedLevel,
      moduleId: selectedModule,
      questionIndex: speakingIndex,
      totalQuestions: 40,
      mcqChoice: questionStates[speakingIndex]?.selectedChoice,
      mcqCorrect: questionStates[speakingIndex]?.choiceCorrect
    });

    // Start question timing if this is the first attempt
    if (currentQuestionRetries === 0) {
      setQuestionStartTime(Date.now());
      const currentQuestion = currentModuleData?.speakingPractice?.[speakingIndex];
      if (currentQuestion) {
        const questionId = `${selectedLevel}_${selectedModule}_${speakingIndex}`;
        progressTracker.startQuestion(questionId);
      }
    }

    // Clear any previous feedback to prevent confusion
    setFeedback('');
    setFeedbackType('info');
    
    try {
      // Processing audio blob - size: ${audioBlob.size}, type: ${audioBlob.type}, isEmpty: ${audioBlob.size === 0}
      
      // Validate audio blob
      if (!audioBlob || audioBlob.size === 0) {
        setFeedback('No audio captured. Please speak louder and try again.');
        setFeedbackType('error');
        setTimeout(() => {
          setFeedback('');
          setIsProcessing(false);
        }, 3000);
        return;
      }
      
      // Check minimum audio size (should be at least a few KB for meaningful audio)
      if (audioBlob.size < 1000) {
        setFeedback('Audio recording too short. Please speak for at least 2 seconds.');
        setFeedbackType('error');
        setTimeout(() => {
          setFeedback('');
          setIsProcessing(false);
        }, 3000);
        return;
      }
      
      // Step 1: Transcribe the audio using FormData (as expected by the endpoint)
      const formData = new FormData();
      
      // Create a unique filename with timestamp to avoid caching issues
      const timestamp = Date.now();
      const filename = `recording_${timestamp}.webm`;
      formData.append('audio', audioBlob, filename);
      
      // Uploading audio - blobSize: ${audioBlob.size}, filename: ${filename}, type: ${audioBlob.type}
      
      const transcribeResponse = await supabase.functions.invoke('transcribe', {
        body: formData
      });

      if (transcribeResponse.error) {
        setFeedback('Failed to process audio. Please try again.');
        setFeedbackType('error');
        setTimeout(() => {
          setFeedback('');
          setIsProcessing(false);
        }, 3000);
        return;
      }

      const { transcript, text } = transcribeResponse.data || {};
      const finalTranscript = transcript || text || '';

      if (!finalTranscript || finalTranscript.trim() === '') {
        setFeedback('I couldn\'t understand what you said. Please speak clearly and try again.');
        setFeedbackType('error');
        setTimeout(() => {
          setFeedback('');
          setIsProcessing(false);
        }, 3000);
        return;
      }

      // Show the user exactly what they said (verbatim)
      setFeedback(`You said: "${finalTranscript}"`);
      setFeedbackType('info');

      // Step 2: Get feedback on the transcribed text
      const feedbackResponse = await supabase.functions.invoke('feedback', {
        body: { text: finalTranscript }
      });

      if (feedbackResponse.error) {
        throw new Error('Feedback analysis failed');
      }

      const { corrected } = feedbackResponse.data;

      // Use expectedRef for current question evaluation with Progress Tracker integration
      function evaluateSpoken(transcript: string) {
        const userRaw = transcript?.trim() || '';
        let target = evaluatorTargetRef.current;

        // If, for any reason, the ref is empty, compute on the fly from the live card
        if (!target) {
          const item = currentModuleData?.speakingPractice?.[speakingIndex];
          target = computeTargetFromItem(item);
        }

        const ok = isExactlyCorrect(userRaw, target); // uses the normalization that ignores diacritics and punctuation
        
        // Record the attempt with Progress Tracker
        const questionId = `${selectedLevel}_${selectedModule}_${speakingIndex}`;
        const currentQuestion = currentModuleData?.speakingPractice?.[speakingIndex];
        const questionContext = currentQuestion?.question || '';
        
        const attempt = progressTracker.recordQuestionAttempt(
          questionId,
          selectedModule,
          selectedLevel,
          userRaw,
          target,
          ok,
          questionContext
        );

        if (ok) {
          setCorrectAnswers(prev => prev + 1);
          setFeedback('🎉 Perfect! Moving to the next question...');
          setFeedbackType('success');
          earnXPForGrammarLesson(true);
          incrementTotalExercises();
          
          // Reset retry counter for next question
          setCurrentQuestionRetries(0);
          
          advanceSpeakingOnce();     // Use the centralized, guarded advance
        } else {
          // Show grammar error feedback if detected
          const grammarFeedback = attempt.grammarErrors && attempt.grammarErrors.length > 0 
            ? `\n\nTip: ${attempt.grammarErrors[0].description}` 
            : '';
            
          setFeedback(`❌ Not quite right. The correct answer is: "${target}"${grammarFeedback}`);
          setFeedbackType('error');
          setTimeout(() => {
            setFeedback('');
            setIsProcessing(false);
          }, 3000);
        }
      }

      evaluateSpoken(finalTranscript);
    } catch (error) {
      // No generic error feedback - let the flow auto-retry
    }
    
    setLastResponseTime(Date.now());
  }, [speakingIndex, earnXPForGrammarLesson, incrementTotalExercises]);

  // Optional: Reset progress for current module
  function resetThisModuleProgress() {
    if (selectedLevel && selectedModule != null) {
      clearProgress(selectedLevel, selectedModule);
      setCurrentPhase('intro');
      setSpeakingIndex(0);
    }
  }

  // Single-source speaking start with internal guard
  async function startSpeakingFlow() {
    // block parallel runs here (not via disabled button)
    if (speakStatus !== 'idle' || currentPhase !== 'speaking' || viewState !== 'lesson') return;

    try {
      setSpeakStatus('recording');

      // Start VAD for visual feedback
      await vad.startListening();

      await unlockAudioOnce();          // iOS resume AudioContext
      const transcript = await recognizeOnce(); // from our robust ASR helper

      // Stop VAD
      vad.stopListening();
      setVadVolume(0);
      setIsSpeechDetected(false);

      if (transcript == null) return;

      setSpeakStatus('evaluating');

      // Evaluate against the CURRENT card only
      const { prompt, target } = getCurrentPromptAndTarget();
      const ok = isExactlyCorrect(transcript, target);

      if (ok) {
        setCorrectAnswers(prev => prev + 1);
        setFeedback('🎉 Excellent! Moving to the next question...');
        setFeedbackType('success');
        earnXPForGrammarLesson(true);
        incrementTotalExercises();
        setSpeakStatus('advancing');
        advanceSpeakingOnce();              // centralized progression
      } else {
        setFeedback(`❌ Not quite right. The correct answer is: "${target}"`);
        setFeedbackType('error');
        setSpeakStatus('idle');
      }
    } catch {
      // silent failure; user can tap again
      vad.stopListening();
      setVadVolume(0);
      setIsSpeechDetected(false);
      setSpeakStatus('idle');
    }
  }

  const startRecording = async () => {
    
    // If there's a microphone error, try to reinitialize
    if (microphoneError || !mediaRecorder) {
      setFeedback('Reconnecting microphone...');
      setFeedbackType('info');
      await initializeRecorder(false);
      
      // Wait a moment for initialization
      setTimeout(() => {
        if (mediaRecorder && mediaRecorder.state === 'inactive') {
          startRecording();
        }
      }, 1000);
      return;
    }
    
    if (mediaRecorder && mediaRecorder.state === 'inactive') {
      try {
        setIsRecording(true);
        setFeedback('');
        setMicrophoneError(null);
        
        // Record minimum of 2 seconds, maximum of 10 seconds
        const startTime = Date.now();
        mediaRecorder.start(1000); // Collect data every 1 second
        
        // Store the start time for minimum duration check
        (mediaRecorder as any)._recordingStartTime = startTime;
        
        // Auto-stop after 10 seconds
        setTimeout(() => {
          if (mediaRecorder.state === 'recording') {
            stopRecording();
          }
        }, 10000);
        
      } catch (error: any) {
        setIsRecording(false);
        
        // More specific error handling
        let errorMessage = 'Failed to start recording. ';
        if (error.name === 'InvalidStateError') {
          errorMessage += 'Microphone is busy. Please try again.';
        } else if (error.name === 'NotSupportedError') {
          errorMessage += 'Your browser doesn\'t support audio recording.';
        } else {
          errorMessage += 'Please check your microphone and try again.';
        }
        
        setFeedback(errorMessage);
        setFeedbackType('error');
        
        // Auto-retry after 2 seconds
        setTimeout(() => {
          setFeedback('');
          initializeRecorder(true);
        }, 2000);
      }
    } else {
      setFeedback('Microphone not ready. Trying to reconnect...');
      setFeedbackType('info');
      
      // Try to reinitialize
      await initializeRecorder(true);
    }
  };

  const stopRecording = () => {
    
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      // Check minimum recording duration (2 seconds)
      const startTime = (mediaRecorder as any)._recordingStartTime;
      const currentTime = Date.now();
      const recordingDuration = currentTime - startTime;
      
      if (recordingDuration < 2000) { // Less than 2 seconds
        setFeedback('Please speak for at least 2 seconds. Keep recording...');
        setFeedbackType('info');
        return; // Don't stop recording yet
      }
      
      mediaRecorder.stop();
      setIsRecording(false);
    } else {
      setIsRecording(false);
    }
  };


  const speakCurrentSentence = () => {
    const { prompt } = getCurrentPromptAndTarget();
    narration.cancel();
    narration.speak(prompt);
  };

  // Set up lesson-specific voice command handlers (must be after handler functions are defined)
  useEffect(() => {
    const currentData = getCurrentModuleData();
    const totalQ = currentData?.speakingPractice?.length ?? 0;

    voiceCommands.setLessonHandlers({
      onNext: () => {
        if (currentPhase === 'speaking' && speakingIndex < totalQ - 1) {
          advanceSpeakingOnce();
        }
      },
      onPrevious: () => {
        if (currentPhase === 'speaking' && speakingIndex > 0) {
          setSpeakingIndex(prev => prev - 1);
        }
      },
      onSkip: () => {
        if (currentPhase === 'speaking') {
          advanceSpeakingOnce();
        }
      },
      onRepeat: () => {
        if (currentPhase === 'speaking') {
          speakCurrentSentence();
        }
      }
    });
  }, [currentPhase, speakingIndex, selectedModule, selectedLevel]);

  // Render levels view
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="p-4 max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-white/20 rounded mb-6"></div>
            <div className="h-64 bg-white/10 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (viewState === 'levels') {
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
              
              <h1 className="text-lg font-bold text-white">Choose Your Level</h1>
              <div className="w-10"></div>
            </div>
          </div>

          {/* Levels Grid */}
          <div className="space-y-4">
            {LEVELS.map((level) => (
              <Card 
                key={level.id} 
                className="bg-white/10 border-white/20 cursor-pointer transition-all hover:bg-white/15"
                onClick={() => {
                  narration.cancel();
                  setSelectedLevel(level.id);
                  setViewState('modules');
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full ${level.color} flex items-center justify-center flex-shrink-0`}>
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{level.name}</h3>
                      <p className="text-white/70 text-sm">{level.description}</p>
                      <p className="text-white/60 text-xs">{level.moduleCount} modules</p>
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

  // Render modules view
  if (viewState === 'modules') {
    return (
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'hsl(var(--app-bg))' }}>
        <div className="relative z-10 p-4 max-w-sm mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-6 mb-6 mt-safe-area-inset-top">
            <div className="flex items-center justify-between mb-4">
              <Button
                onClick={() => setViewState('levels')}
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
            {MODULES_BY_LEVEL[selectedLevel as keyof typeof MODULES_BY_LEVEL].length === 0 ? (
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
              MODULES_BY_LEVEL[selectedLevel as keyof typeof MODULES_BY_LEVEL].map((module) => {
                const isUnlocked = isModuleUnlocked(module.id);
                const isCompleted = completedModules.includes(`module-${module.id}`);
              
              return (
                <Card 
                  key={module.id} 
                  className={`bg-white/10 border-white/20 cursor-pointer transition-all hover:bg-white/15 ${!isUnlocked ? 'opacity-50' : ''}`}
                  onClick={() => {
                    if (isUnlocked && ((module.id >= 1 && module.id <= 50) || (module.id >= 51 && module.id <= 100) || (module.id >= 101 && module.id <= 150) || (module.id >= 151 && module.id <= 200))) { // All A1, A2, B1, B2 modules are implemented
                      narration.cancel();
                      setSelectedModule(module.id);
                      setViewState('lesson');
                      setCurrentPhase('intro');
                      setSpeakingIndex(0);
                      setCorrectAnswers(0);
                      setAttempts(0);
                      setFeedback('');
                    }
                  }}
                >
                   <CardContent className="p-4">
                     <div className="flex items-center space-x-4">
                       <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                         {!isUnlocked ? (
                           <Lock className="h-6 w-6 text-white/50" />
                         ) : isCompleted ? (
                           <CheckCircle className="h-6 w-6 text-green-400" />
                         ) : (
                           <span className="text-white font-bold">{module.id}</span>
                         )}
                       </div>
                       
                       <div className="flex-1">
                         <h3 className="font-semibold text-white">{module.title}</h3>
                         <p className="text-white/70 text-sm">{module.description}</p>
                         <div className="flex items-center justify-between mt-2">
                           <div>
                             {isCompleted && (
                               <Badge variant="outline" className="text-green-400 border-green-400">
                                 Completed
                               </Badge>
                             )}
                           </div>
                           {isCompleted && (
                             <Button
                               variant="ghost"
                               size="sm"
                               className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1 h-auto"
                               onClick={(e) => {
                                 e.stopPropagation();
                                 const userId = 'guest';
                                 clearModuleProgress(userId, selectedLevel, String(module.id));
                                 // Remove from completed modules
                                 const newCompleted = completedModules.filter(m => m !== `module-${module.id}`);
                                 setCompletedModules(newCompleted);
                                 localStorage.setItem('completedModules', JSON.stringify(newCompleted));
                               }}
                               title="Reset progress"
                             >
                               🔄
                             </Button>
                           )}
                         </div>
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

  // Lesson completion view
  if (currentPhase === 'completed') {
    return (
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'hsl(var(--app-bg))' }}>
        {showConfetti && <Confetti width={width} height={height} />}
        
        <div className="relative z-10 p-4 max-w-sm mx-auto">
          <div className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-6 mt-safe-area-inset-top text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-500/20 rounded-full p-4">
                <CheckCircle className="h-12 w-12 text-green-400" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">Congratulations!</h2>
            <p className="text-white/80 mb-4">You completed Module {selectedModule}!</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-white/90">
                <span>Sentences Completed:</span>
                <span className="font-semibold">{correctAnswers}/{totalQuestions}</span>
              </div>
              <div className="flex justify-between text-white/90">
                <span>Success Rate:</span>
                <span className="font-semibold">{Math.round((correctAnswers / attempts) * 100)}%</span>
              </div>
            </div>

            <Button 
              onClick={() => { narration.cancel(); setViewState('modules'); }}
              className="w-full bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              Back to Modules
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Render lesson content
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'hsl(var(--app-bg))' }}>
      {/* Resume Progress Dialog */}
      {checkpoints.showResumeDialog && checkpoints.getResumeInfo() && (
        <ResumeProgressDialog
          open={checkpoints.showResumeDialog}
          onOpenChange={checkpoints.setShowResumeDialog}
          level={selectedLevel}
          moduleId={selectedModule}
          {...checkpoints.getResumeInfo()}
          onResume={() => {
            // Actually restore the saved state
            const progress = checkpoints.currentProgress;
            if (progress) {
              checkpoints.setShowResumeDialog(false);
              setSpeakingIndex(progress.question_index);
              setCurrentPhase('speaking');
              console.log(`📍 Restored to Q${progress.question_index + 1} (${progress.question_phase})`);
            }
          }}
          onStartFresh={() => checkpoints.startFromBeginning(selectedLevel, selectedModule)}
        />
      )}

      <div className="relative z-10 p-3 max-w-sm mx-auto">
        {/* Compact Header - iPhone Optimized */}
        <div className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-2xl p-4 mb-4 mt-safe-area-inset-top shadow-lg shadow-black/20">
          <div className="flex items-center justify-between mb-3">
            <Button
              onClick={() => { narration.cancel(); setViewState('modules'); }}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 rounded-full w-10 h-10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            <div className="text-center flex-1 mx-3">
              <h1 className="text-base font-bold text-white truncate">Module {selectedModule}</h1>
              <p className="text-xs text-white/70">Progress: {Math.round(overallProgress)}%</p>
            </div>
            
            <div className="flex items-center gap-2">
              <SyncStatusIndicator
                isOnline={checkpoints.isOnline}
                isSyncing={checkpoints.isSyncing}
                lastSyncAt={checkpoints.lastSyncAt}
              />
              <Button
                onClick={toggleSound}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 rounded-full w-10 h-10"
              >
                <Volume2 className={`h-4 w-4 ${!soundEnabled ? 'opacity-50' : ''}`} />
              </Button>
            </div>
          </div>

          {/* Compact Progress Bar */}
          <Progress value={overallProgress} className="h-1.5" />
        </div>

        {/* Avatar - Hidden on mobile for space saving */}
        {!isMobile && (
          <div className="flex justify-center mb-4">
            <CanvasAvatar state={avatarState} size="md" />
          </div>
        )}

        {/* Tip Card - Hidden on mobile */}
        {/* Grammar Tip removed from here - now only shown during speaking practice (line ~11243) to avoid duplication */}

        {/* Removed duplicate "Tomas is Teaching" card - consolidated below */}

        {/* MOBILE COMPACT INTRO */}
        {(currentPhase === 'intro' || currentPhase === 'teacher-reading') && (
          <div ref={introRef}>
            <MobileCompactIntro
              title={currentModuleData.title}
              preview={currentModuleData.intro?.split('\n')[0] || ''}
              fullContent={currentModuleData.intro || ''}
              table={('table' in currentModuleData && currentModuleData.table) ? currentModuleData.table : []}
              tip={('tip' in currentModuleData && currentModuleData.tip) ? currentModuleData.tip : undefined}
              listeningExamples={currentModuleData.listeningExamples || []}
              moduleId={selectedModule}
              level={selectedLevel}
              onGoToQuestions={() => setCurrentPhase('speaking')}
            />
          </div>
        )}

        {/* Grammar Tip - Always Visible During Speaking Practice */}
        {currentPhase === 'speaking' && 'tip' in currentModuleData && currentModuleData.tip && (
          <Card className="mb-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-500/20 rounded-full p-2 flex-shrink-0 animate-pulse">
                  <Star className="h-4 w-4 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-300 text-base mb-2 flex items-center">
                    💡 Grammar Tip
                    <Badge variant="outline" className="ml-2 text-xs text-blue-300 border-blue-300/30">
                      Module {selectedModule}
                    </Badge>
                  </h3>
                  <p className="text-blue-100 text-sm leading-relaxed">{currentModuleData.tip}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Speaking Phase with Multiple Choice */}
        {currentPhase === 'speaking' && (
          <Card key={speakingIndex} className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  <Mic className="h-5 w-5 mr-2" />
                  Speaking Practice
                </div>
                <Badge variant="outline" className="text-white border-white/30">
                  {Math.min(speakingIndex + 1, totalQuestions)} / {totalQuestions}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                {(() => {
                  const rawItem = currentModuleData?.speakingPractice?.[speakingIndex];
                  const currentPracticeItem = rawItem ? getSpeakingPracticeItem(rawItem, speakingIndex) : null;
                  const currentState = questionStates[speakingIndex] || { selectedChoice: undefined, choiceCorrect: false, speechCompleted: false };
                  
                  if (!currentPracticeItem) {
                    return (
                      <p className="text-white/70 text-sm">Preparing next question...</p>
                    );
                  }

                  // Enhanced Question Display with Better Typography
                  return (
                    <>
                      {/* Question Header - Made Larger and More Prominent */}
                      <div className="bg-white/5 rounded-xl p-6 mb-6">
                        <p className="text-white/80 text-lg font-medium mb-3">
                          Soru (Question):
                        </p>
                        <p className="text-white text-3xl font-bold mb-4 leading-relaxed">
                          {currentPracticeItem.question}
                        </p>
                        
                        <Button
                          onClick={speakCurrentSentence}
                          variant="ghost"
                          size="sm"
                          className="text-white/70 hover:text-white hover:bg-white/10"
                          disabled={isSpeaking}
                        >
                          <Volume2 className="h-4 w-4 mr-2" />
                          Listen to Question
                        </Button>
                      </div>

                      {/* Multiple Choice Section - Show first if not completed */}
                      {currentPracticeItem.multipleChoice && !currentState.choiceCorrect && (
                        <div className="bg-blue-500/10 rounded-xl p-6 mb-6 border border-blue-500/20 relative">
                          {/* Step Indicator */}
                          <div className="absolute -top-3 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                            <span className="mr-1">1</span>
                            <div className="w-2 h-2 bg-white rounded-full ml-1"></div>
                            <div className="w-2 h-2 bg-blue-300 rounded-full ml-1"></div>
                          </div>
                          <h3 className="text-blue-300 text-lg font-semibold mb-4 text-center mt-2">
                            🎯 Multiple Choice Quiz
                          </h3>
                          <p className="text-white text-xl font-medium mb-6 text-center">
                            {currentPracticeItem.multipleChoice.prompt}
                          </p>
                          
                          <div className="grid grid-cols-1 gap-3 max-w-md mx-auto">
                            {currentPracticeItem.multipleChoice.options.map((option) => (
                              <Button
                                key={option.letter}
                                onClick={() => handleMultipleChoiceSelect(option.letter, option.correct)}
                                variant="outline"
                                size="lg"
                                className={`text-left justify-start p-4 h-auto ${
                                  currentState.selectedChoice === option.letter
                                    ? option.correct
                                      ? 'bg-green-500/20 border-green-500 text-green-300'
                                      : 'bg-red-500/20 border-red-500 text-red-300'
                                    : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                                }`}
                                disabled={!!currentState.selectedChoice}
                              >
                                <span className="font-bold mr-3 text-lg">
                                  {option.letter}.
                                </span>
                                <span className="text-lg">
                                  {option.text}
                                </span>
                              </Button>
                            ))}
                          </div>
                          
                          {currentState.selectedChoice && (
                            <div className="mt-4 text-center">
                              {currentState.choiceCorrect ? (
                                <p className="text-green-300 font-medium">
                                  ✅ Correct! Now speak the full sentence.
                                </p>
                              ) : (
                                <p className="text-red-300 font-medium">
                                  ❌ Try again! Choose the correct option.
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Speaking Section - Show after correct multiple choice */}
                      {currentState.choiceCorrect && (
                        <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/20 relative">
                          {/* Step Indicator */}
                          <div className="absolute -top-3 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                            <div className="w-2 h-2 bg-green-300 rounded-full mr-1"></div>
                            <span className="mx-1">2</span>
                            <div className="w-2 h-2 bg-white rounded-full ml-1 animate-pulse"></div>
                          </div>
                          <h3 className="text-green-300 text-lg font-semibold mb-4 text-center mt-2">
                            🎤 Speaking Practice
                          </h3>
                          <p className="text-white/80 text-base font-medium mb-2 text-center">
                            Cevap (Answer):
                          </p>
                          <p className="text-white text-lg font-medium mb-6 text-center leading-relaxed">
                            "{currentPracticeItem.answer}"
                          </p>
                          
                          <div className="text-center">
                            <Button
                              onClick={speakCurrentSentence}
                              variant="ghost"
                              size="sm"
                              className="text-white/70 hover:text-white hover:bg-white/10 mb-4"
                              disabled={isSpeaking}
                            >
                              <Volume2 className="h-4 w-4 mr-2" />
                              Listen to Answer
                            </Button>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>

              {/* Recording Button - Only show after correct multiple choice */}
              {(() => {
                const currentState = questionStates[speakingIndex] || { selectedChoice: undefined, choiceCorrect: false, speechCompleted: false };
                const rawItem = currentModuleData?.speakingPractice?.[speakingIndex];
                const currentPracticeItem = rawItem ? getSpeakingPracticeItem(rawItem, speakingIndex) : null;
                
                // Show microphone after multiple choice is correct, OR if no multiple choice exists
                // Questions without multiple choice can go directly to speaking
                const canProceedToSpeaking = currentPracticeItem?.multipleChoice
                  ? currentState.choiceCorrect === true
                  : true; // If no multiple choice, allow speaking immediately
                
                if (canProceedToSpeaking) {
                  return (
                    <>
                      <div className="mb-4 text-center">
                        <div className="relative inline-block">
                          {/* Pulsing rings when recording */}
                          {speakStatus === 'recording' && (
                            <>
                              <div className="absolute inset-0 rounded-full bg-red-500/30 animate-ping" style={{ animationDuration: '1s' }} />
                              <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" style={{ animationDuration: '1.5s' }} />
                            </>
                          )}

                          <Button
                            id="micButton"
                            key={`mic-${speakingIndex}`}
                            onClick={() => {
                              const canSpeak = viewState === 'lesson' && currentPhase === 'speaking';
                              if (!canSpeak) return;
                              // single-source speaking entry; safe-guard inside
                              startSpeakingFlow();
                            }}
                            disabled={false}
                            aria-disabled={false}
                            style={{
                              pointerEvents: 'auto',
                              zIndex: 5,
                              touchAction: 'manipulation',
                              transition: 'all 0.3s ease'
                            }}
                            size="lg"
                            className={`mic-button rounded-full w-20 h-20 shadow-lg transform transition-all duration-300 ${
                              speakStatus === 'recording'
                                ? 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 scale-110'
                                : 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:scale-105'
                            }`}
                          >
                            {speakStatus === 'recording' ? (
                              <MicOff className="h-8 w-8 animate-pulse" />
                            ) : (
                              <Mic className="h-8 w-8" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div style={{ pointerEvents: 'none' }}>
                        <p className="text-white/90 text-sm mb-2 font-medium">
                          {speakStatus === 'recording'
                            ? '🎤 Listening... Speak now!'
                            : '🎯 Press once and speak'}
                        </p>
                        <p className="text-white/60 text-xs mb-3">
                          {speakStatus === 'recording'
                            ? "I'll stop automatically when you finish"
                            : 'One press - hands free recording'}
                        </p>

                        {/* Volume Meter and Speech Detection - Show during recording */}
                        {speakStatus === 'recording' && (
                          <div className="mt-4 space-y-2">
                            {/* Volume Meter */}
                            <div className="bg-white/10 rounded-full h-2 w-48 mx-auto overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-150"
                                style={{
                                  width: `${Math.min((vadVolume / 100) * 100, 100)}%`,
                                  boxShadow: vadVolume > 30 ? '0 0 10px rgba(34, 197, 94, 0.5)' : 'none'
                                }}
                              />
                            </div>

                            {/* Speech Detection Indicator */}
                            <div className="flex items-center justify-center space-x-2">
                              <div
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                  isSpeechDetected
                                    ? 'bg-green-400 animate-pulse shadow-lg shadow-green-400/50'
                                    : 'bg-gray-500'
                                }`}
                              />
                              <span
                                className={`text-xs transition-colors duration-300 ${
                                  isSpeechDetected ? 'text-green-300 font-semibold' : 'text-white/50'
                                }`}
                              >
                                {isSpeechDetected ? 'Speech detected' : 'Waiting for speech...'}
                              </span>
                            </div>

                            {/* Timer */}
                            <p className="text-white/40 text-xs">
                              {Math.floor(vad.elapsedTime / 1000)}s
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  );
                }
                return null;
              })()}

              {/* Feedback with smooth animation */}
              {feedback && (
                <div
                  className={`p-4 rounded-xl shadow-lg transform transition-all duration-500 ease-out animate-in slide-in-from-bottom ${
                    feedbackType === 'success'
                      ? 'bg-gradient-to-br from-green-500/30 to-green-600/20 text-green-300 border border-green-500/30'
                      : feedbackType === 'error'
                      ? 'bg-gradient-to-br from-red-500/30 to-red-600/20 text-red-300 border border-red-500/30'
                      : 'bg-gradient-to-br from-blue-500/30 to-blue-600/20 text-blue-300 border border-blue-500/30'
                  }`}
                  style={{
                    animation: 'slideInUp 0.5s ease-out'
                  }}
                >
                  <div className="flex items-center justify-center space-x-3">
                    {feedbackType === 'success' ? (
                      <CheckCircle className="h-5 w-5 animate-bounce" style={{ animationDuration: '1s', animationIterationCount: '2' }} />
                    ) : feedbackType === 'error' ? (
                      <AlertCircle className="h-5 w-5 animate-pulse" />
                    ) : null}
                    <span className="text-sm font-medium whitespace-pre-line">{feedback}</span>
                  </div>
                </div>
              )}

              {/* Grammar Corrections - Show when answer is correct but has grammar issues */}
              {grammarCorrections.length > 0 && feedbackType === 'success' && (
                <div
                  className="mt-3 p-4 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border border-yellow-500/40 shadow-lg transform transition-all duration-500"
                  style={{
                    animation: 'slideInUp 0.6s ease-out 0.2s both'
                  }}
                >
                  <div className="flex items-start space-x-3 mb-3">
                    <Star className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-0.5 animate-pulse" style={{ animationDuration: '2s' }} />
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-yellow-300 mb-3 flex items-center">
                        Grammar Tips
                        <span className="ml-2 text-xs bg-yellow-500/20 px-2 py-0.5 rounded-full">Pro Tip</span>
                      </h4>
                      <div className="space-y-3">
                        {grammarCorrections.map((correction, index) => (
                          <div
                            key={index}
                            className="bg-black/30 p-3 rounded-lg border border-yellow-500/20 transform transition-all hover:scale-102 hover:border-yellow-500/40"
                            style={{
                              animation: `slideInUp 0.4s ease-out ${0.3 + index * 0.1}s both`
                            }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-red-300 line-through font-medium">{correction.userText}</span>
                              <span className="text-xs text-white/50 mx-3">→</span>
                              <span className="text-green-300 font-bold">{correction.correctedText}</span>
                            </div>
                            <p className="text-white/80 text-xs italic bg-white/5 p-2 rounded">{correction.explanation}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Voice Controls */}
      {viewState === 'lesson' && voiceCommands.isSupported && (
        <>
          <VoiceControls
            visible={true}
            position="bottom-right"
            autoHide={true}
            autoHideDelay={5000}
            showHelp={true}
            compact={false}
            onVisibilityChange={(visible) => {
              console.log('Voice controls visibility:', visible);
            }}
          />
          
          <ResumeChip
            visible={voiceCommands.speechState.isPaused}
            pausedSince={Date.now() - 1000} // Approximate pause time
            onResume={voiceCommands.resumeSpeech}
            onCancel={voiceCommands.stopSpeech}
            position="center"
            animated={true}
            showTimer={true}
          />
        </>
      )}

      {/* Celebration Overlay */}
      {showCelebration && (
        <CelebrationOverlay
          title="Great job!"
          subtitle="Module completed"
        />
      )}
    </div>
  );
}
