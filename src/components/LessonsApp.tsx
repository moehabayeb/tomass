import { useState, useEffect, useCallback, useRef } from 'react';
import { flushSync } from 'react-dom';
import { ArrowLeft, Play, Pause, Mic, MicOff, Volume2, RefreshCw, Star, CheckCircle, AlertCircle, Lock, BookOpen, Trophy, FastForward } from 'lucide-react';
import progressService from '../services/progressService';
import { getProgress, setProgress, ModuleProgress as StoreModuleProgress } from '../utils/ProgressStore';
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
import { CelebrationOverlay } from './CelebrationOverlay';
// Import QA test for browser console access
import '../utils/placementQA';
import MultipleChoiceCard from './MultipleChoiceCard';
import { buildClozeAndChoices } from '../lib/mcq';
import ErrorBoundary from './ErrorBoundary';

// ---------- Module Order and Next Module Logic ----------
const ORDER_A1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];
const ORDER_A2 = [51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100];
const ORDER_B1 = [101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150];

function getOrderForLevel(level: 'A1'|'A2'|'B1'): number[] {
  if (level === 'A1') return ORDER_A1;
  if (level === 'A2') return ORDER_A2;
  return ORDER_B1;
}

function getNextModuleId(level: 'A1'|'A2'|'B1', current: number): number | null {
  const order = getOrderForLevel(level);
  const idx = order.indexOf(current);
  if (idx === -1) return null;
  return idx < order.length - 1 ? order[idx + 1] : null;
}

// Enhanced Progress Tracking with ProgressStore Integration
type LessonPhaseType = 'intro' | 'listening' | 'speaking' | 'complete';

// Import robust evaluator and progress system
import { evaluateAnswer, EvalOptions } from '../utils/evaluator';
import { 
  save as saveProgress, 
  resumeLastPointer,
  getModuleState, 
  clearProgress as clearModuleProgress,
  getAllCompletedModules,
  getProgressSummary
} from '../utils/progress';

// Enhanced progress saving with unified progress service
async function saveModuleProgress(level: string, moduleId: number, phase: LessonPhaseType, questionIndex: number = 0, correctAnswers: number = 0, timeSpent: number = 0) {
  try {
    const total = 40; // All modules have 40 questions
    const completed = phase === 'complete';
    
    await progressService.saveLessonProgress({
      level,
      moduleId,
      phase,
      currentQuestionIndex: questionIndex,
      totalQuestions: total,
      correctAnswers,
      timeSpent,
      completed,
      mcqCompleted: phase === 'listening' || phase === 'complete',
      speakingCompleted: phase === 'complete'
    });
    
    if (process.env.NODE_ENV === 'development') console.log(`💾 Progress saved: ${level} Module ${moduleId}, Question ${questionIndex + 1}/${total}, Phase: ${phase}`);
  } catch (error) {
    console.error('Error saving progress:', error);
  }
}

// Load progress using unified progress service
async function loadModuleProgress(level: string, moduleId: number): Promise<{ phase: LessonPhaseType; questionIndex: number; correctAnswers: number; timeSpent: number }> {
  try {
    const progress = await progressService.loadLessonProgress(level, moduleId);
    if (progress) {
      if (process.env.NODE_ENV === 'development') console.log(`📚 Restored progress: ${level} Module ${moduleId}, Question ${progress.currentQuestionIndex + 1}/${progress.totalQuestions}`);
      return {
        phase: progress.completed ? 'complete' : progress.phase,
        questionIndex: progress.currentQuestionIndex,
        correctAnswers: progress.correctAnswers,
        timeSpent: progress.timeSpent
      };
    }
  } catch (error) {
    console.error('Error loading progress:', error);
  }
  
  return { phase: 'intro', questionIndex: 0, correctAnswers: 0, timeSpent: 0 };
}

function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/["""'.!?]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}


interface LessonsAppProps {
  onBack: () => void;
}

type ViewState = 'levels' | 'modules' | 'lesson';
type LessonPhase = 'intro' | 'teacher-reading' | 'listening' | 'speaking' | 'completed' | 'complete';
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
                 'Coming soon',
    completed: false,
    locked: false, // TEMPORARILY UNLOCKED FOR DEVELOPMENT
  })),
  B2: [],
  C1: [],
  C2: []
};

// Module 1 Data: Verb To Be - Positive Sentences
const MODULE_1_DATA = {
  title: "Modül 1 - Verb To Be (am, is, are) - Positive Sentences",
  description: "Bu modülde İngilizcede 'am, is, are' kullanarak olumlu cümleler kurmayı öğreneceğiz.",
  intro: `Bu modülde İngilizcede 'am, is, are' kullanarak olumlu cümleler kurmayı öğreneceğiz.

Konu Anlatımı:
"To Be" fiili İngilizcede 'olmak' anlamına gelir ve cümlenin öznesine göre değişir:
I → am
He/She/It → is  
We/You/They → are

Örnek Cümleler:
I am a teacher.
She is happy.
They are students.`,
  tip: "Use 'am' with I, 'is' with he/she/it, and 'are' with we/you/they",
  
  table: [
    { subject: "I", verb: "am", complement: "a student", example: "I am a student." },
    { subject: "He", verb: "is", complement: "tired", example: "He is tired." },
    { subject: "She", verb: "is", complement: "a doctor", example: "She is a doctor." },
    { subject: "It", verb: "is", complement: "cold", example: "It is cold." },
    { subject: "We", verb: "are", complement: "happy", example: "We are happy." },
    { subject: "You", verb: "are", complement: "teachers", example: "You are teachers." },
    { subject: "They", verb: "are", complement: "friends", example: "They are friends." }
  ],
  
  listeningExamples: [
    "I am a student.",
    "He is a teacher.",
    "She is a doctor.",
    "It is a dog.",
    "We are happy.",
    "You are friends.",
    "They are engineers."
  ],
  
  speakingPractice: [
    { question: "Are you a teacher?", answer: "Yes, I am a teacher." },
    { question: "Is she your friend?", answer: "Yes, she is my friend." },
    { question: "Are they students?", answer: "Yes, they are students." },
    { question: "Is he a doctor?", answer: "Yes, he is a doctor." },
    { question: "Are you happy?", answer: "Yes, I am happy." },
    { question: "Is it cold today?", answer: "Yes, it is cold today." },
    { question: "Are we friends?", answer: "Yes, we are friends." },
    { question: "Is she a nurse?", answer: "Yes, she is a nurse." },
    { question: "Are you ready?", answer: "Yes, I am ready." },
    { question: "Is he tall?", answer: "Yes, he is tall." },
    { question: "Are they at home?", answer: "Yes, they are at home." },
    { question: "Is she beautiful?", answer: "Yes, she is beautiful." },
    { question: "Are you tired?", answer: "Yes, I am tired." },
    { question: "Is it expensive?", answer: "Yes, it is expensive." },
    { question: "Are we late?", answer: "Yes, we are late." },
    { question: "Is he busy?", answer: "Yes, he is busy." },
    { question: "Are they married?", answer: "Yes, they are married." },
    { question: "Is she smart?", answer: "Yes, she is smart." },
    { question: "Are you hungry?", answer: "Yes, I am hungry." },
    { question: "Is it big?", answer: "Yes, it is big." },
    { question: "Are we correct?", answer: "Yes, we are correct." },
    { question: "Is he kind?", answer: "Yes, he is kind." },
    { question: "Are they engineers?", answer: "Yes, they are engineers." },
    { question: "Is she young?", answer: "Yes, she is young." },
    { question: "Are you a student?", answer: "Yes, I am a student." },
    { question: "Is it hot?", answer: "Yes, it is hot." },
    { question: "Are we early?", answer: "Yes, we are early." },
    { question: "Is he strong?", answer: "Yes, he is strong." },
    { question: "Are they rich?", answer: "Yes, they are rich." },
    { question: "Is she funny?", answer: "Yes, she is funny." },
    { question: "Are you safe?", answer: "Yes, I am safe." },
    { question: "Is it new?", answer: "Yes, it is new." },
    { question: "Are we together?", answer: "Yes, we are together." },
    { question: "Is he careful?", answer: "Yes, he is careful." },
    { question: "Are they happy?", answer: "Yes, they are happy." },
    { question: "Is she ready?", answer: "Yes, she is ready." },
    { question: "Are you excited?", answer: "Yes, I am excited." },
    { question: "Is it difficult?", answer: "Yes, it is difficult." },
    { question: "Are we successful?", answer: "Yes, we are successful." },
    { question: "Is he helpful?", answer: "Yes, he is helpful." }
  ]
};

// Module 2 Data: Negative Sentences
const MODULE_2_DATA = {
  title: "Modül 2 - Verb To Be (am, is, are) - Negative Sentences",
  description: "Bu modülde İngilizcede 'am, is, are' kullanarak olumsuz cümleler kurmayı öğreneceğiz.",
  intro: `Bu modülde İngilizcede 'am, is, are' kullanarak olumsuz cümleler kurmayı öğreneceğiz.

"To Be" fiilinin olumsuz hali 'not' eklenerek yapılır:

I → am not
He/She/It → is not (isn't)  
We/You/They → are not (aren't)

Örnek Cümleler:
I am not a student.
She isn't happy.
They aren't teachers.`,
  tip: "'To Be' fiilinin olumsuz hali 'not' eklenerek yapılır: I → am not, He/She/It → is not (isn't), We/You/They → are not (aren't)",
  
  table: [
    { subject: "I", verb: "am", not: "not", complement: "a student", example: "I am not a student." },
    { subject: "He", verb: "is", not: "not", complement: "tired", example: "He is not tired." },
    { subject: "She", verb: "is", not: "not", complement: "a doctor", example: "She isn't a doctor." },
    { subject: "It", verb: "is", not: "not", complement: "cold", example: "It isn't cold." },
    { subject: "We", verb: "are", not: "not", complement: "happy", example: "We aren't happy." },
    { subject: "You", verb: "are", not: "not", complement: "teachers", example: "You aren't teachers." },
    { subject: "They", verb: "are", not: "not", complement: "friends", example: "They aren't friends." }
  ],
  
  listeningExamples: [
    "I am not a student.",
    "She isn't happy.",
    "They aren't teachers."
  ],
  
  speakingPractice: [
    { question: "Are you a teacher?", answer: "No, I am not a teacher." },
    { question: "Is she your friend?", answer: "No, she isn't my friend." },
    { question: "Are they students?", answer: "No, they aren't students." },
    { question: "Is he a doctor?", answer: "No, he isn't a doctor." },
    { question: "Are we ready?", answer: "No, we aren't ready." },
    { question: "Am I late?", answer: "Yes, you are late." },
    { question: "Is it cold today?", answer: "No, it isn't cold today." },
    { question: "Are you from Turkey?", answer: "No, I am not from Turkey." },
    { question: "Are they happy?", answer: "No, they aren't happy." },
    { question: "Is she at school?", answer: "No, she isn't at school." },
    { question: "Am I in the right place?", answer: "No, you are not in the right place." },
    { question: "Are we on time?", answer: "No, we aren't on time." },
    { question: "Is he your brother?", answer: "No, he isn't my brother." },
    { question: "Is it a big city?", answer: "No, it isn't a big city." },
    { question: "Are you ready to start?", answer: "No, I am not ready to start." },
    { question: "Are they in the room?", answer: "No, they aren't in the room." },
    { question: "Am I correct?", answer: "No, you are not correct." },
    { question: "Is she a nurse?", answer: "No, she isn't a nurse." },
    { question: "Are we family?", answer: "No, we aren't family." },
    { question: "Is it your book?", answer: "No, it isn't my book." },
    { question: "Are you a teacher?", answer: "No, I am not a teacher." },
    { question: "Is she your friend?", answer: "No, she isn't my friend." },
    { question: "Are they students?", answer: "No, they aren't students." },
    { question: "Is he a doctor?", answer: "No, he isn't a doctor." },
    { question: "Are we ready?", answer: "No, we aren't ready." },
    { question: "Am I late?", answer: "Yes, you are late." },
    { question: "Is it cold today?", answer: "No, it isn't cold today." },
    { question: "Are you from Turkey?", answer: "No, I am not from Turkey." },
    { question: "Are they happy?", answer: "No, they aren't happy." },
    { question: "Is she at school?", answer: "No, she isn't at school." },
    { question: "Am I in the right place?", answer: "No, you are not in the right place." },
    { question: "Are we on time?", answer: "No, we aren't on time." },
    { question: "Is he your brother?", answer: "No, he isn't my brother." },
    { question: "Is it a big city?", answer: "No, it isn't a big city." },
    { question: "Are you ready to start?", answer: "No, I am not ready to start." },
    { question: "Are they in the room?", answer: "No, they aren't in the room." },
    { question: "Am I correct?", answer: "No, you are not correct." },
    { question: "Is she a nurse?", answer: "No, she isn't a nurse." },
    { question: "Are we family?", answer: "No, we aren't family." },
    { question: "Is it your book?", answer: "No, it isn't my book." }
  ]
};

// Module 3 Data: Question Sentences
const MODULE_3_DATA = {
  title: "Modül 3 - Verb To Be (am, is, are) - Question Sentences",
  description: "Bu modülde İngilizcede 'am, is, are' kullanarak soru cümleleri kurmayı öğreneceğiz.",
  intro: `Bu modülde İngilizcede 'am, is, are' kullanarak soru cümleleri kurmayı öğreneceğiz.

Konu Anlatımı:
"To Be" fiiliyle soru cümlesi kurarken, fiil cümlenin başına gelir:
Am I...?
Is he/she/it...?
Are we/you/they...?

Örnek Cümleler:
Am I late?
Is she happy?
Are they students?`,
  tip: "How to form questions with 'To Be': Move the verb before the subject. Am I...? Is he/she/it...? Are we/you/they...?",
  
  table: [
    { verb: "Am", subject: "I", complement: "a student?", example: "Am I a student?" },
    { verb: "Is", subject: "he", complement: "tired?", example: "Is he tired?" },
    { verb: "Is", subject: "she", complement: "a doctor?", example: "Is she a doctor?" },
    { verb: "Is", subject: "it", complement: "cold?", example: "Is it cold?" },
    { verb: "Are", subject: "we", complement: "happy?", example: "Are we happy?" },
    { verb: "Are", subject: "you", complement: "teachers?", example: "Are you teachers?" },
    { verb: "Are", subject: "they", complement: "friends?", example: "Are they friends?" }
  ],
  
  listeningExamples: [
    "Am I late?",
    "Is she happy?",
    "Are they students?"
  ],
  
  speakingPractice: [
    { question: "Am I a teacher?", answer: "Yes, you are a teacher." },
    { question: "Am I a teacher?", answer: "No, you are not a teacher." },
    { question: "Am I a student?", answer: "Yes, you are a student." },
    { question: "Am I a student?", answer: "No, you are not a student." },
    { question: "Am I happy?", answer: "Yes, you are happy." },
    { question: "Am I happy?", answer: "No, you are not happy." },
    { question: "Is he a doctor?", answer: "Yes, he is a doctor." },
    { question: "Is he a doctor?", answer: "No, he is not a doctor." },
    { question: "Is he tired?", answer: "Yes, he is tired." },
    { question: "Is he tired?", answer: "No, he is not tired." },
    { question: "Is he busy?", answer: "Yes, he is busy." },
    { question: "Is he busy?", answer: "No, he is not busy." },
    { question: "Is she a nurse?", answer: "Yes, she is a nurse." },
    { question: "Is she a nurse?", answer: "No, she is not a nurse." },
    { question: "Is she beautiful?", answer: "Yes, she is beautiful." },
    { question: "Is she beautiful?", answer: "No, she is not beautiful." },
    { question: "Is she ready?", answer: "Yes, she is ready." },
    { question: "Is she ready?", answer: "No, she is not ready." },
    { question: "Is it cold?", answer: "Yes, it is cold." },
    { question: "Is it cold?", answer: "No, it is not cold." },
    { question: "Is it big?", answer: "Yes, it is big." },
    { question: "Is it big?", answer: "No, it is not big." },
    { question: "Is it expensive?", answer: "Yes, it is expensive." },
    { question: "Is it expensive?", answer: "No, it is not expensive." },
    { question: "Are we friends?", answer: "Yes, we are friends." },
    { question: "Are we friends?", answer: "No, we are not friends." },
    { question: "Are we students?", answer: "Yes, we are students." },
    { question: "Are we students?", answer: "No, we are not students." },
    { question: "Are we ready?", answer: "Yes, we are ready." },
    { question: "Are we ready?", answer: "No, we are not ready." },
    { question: "Are you right?", answer: "Yes, I am right." },
    { question: "Are you right?", answer: "No, I am not right." },
    { question: "Are you late?", answer: "Yes, I am late." },
    { question: "Are you late?", answer: "No, I am not late." },
    { question: "Are you welcome?", answer: "Yes, I am welcome." },
    { question: "Are you welcome?", answer: "No, I am not welcome." },
    { question: "Are they engineers?", answer: "Yes, they are engineers." },
    { question: "Are they engineers?", answer: "No, they are not engineers." },
    { question: "Are they married?", answer: "Yes, they are married." },
    { question: "Are they available?", answer: "No, they are not available." }
  ]
};

// Module 4 Data: Subject Pronouns
const MODULE_4_DATA = {
  title: "Module 4 - Subject Pronouns",
  description: "Learn to use subject pronouns I, You, He, She, It, We, They",
  intro: `In this module, we teach subject pronouns in English:
I, You, He, She, It, We, They

Use them as the subject of a sentence.
Example sentences:

I am a student.
She is a teacher.  
They are friends.`,
  tip: "Subject pronouns replace the subject in a sentence. Use: I (for yourself), You (for the person you're talking to), He (for a male), She (for a female), It (for things/animals), We (for yourself and others), They (for other people or things).",
  
  table: [
    { pronoun: "I", example: "I am a student." },
    { pronoun: "You", example: "You are my friend." },
    { pronoun: "He", example: "He is a doctor." },
    { pronoun: "She", example: "She is happy." },
    { pronoun: "It", example: "It is a book." },
    { pronoun: "We", example: "We are teachers." },
    { pronoun: "They", example: "They are at school." }
  ],
  
  listeningExamples: [
    "I am a student.",
    "You are my friend.",
    "He is a doctor.",
    "She is happy.",
    "It is a book.",
    "We are teachers.",
    "They are at school."
  ],
  
  speakingPractice: [
    { question: "Who am I?", answer: "You are my teacher." },
    { question: "Who is he?", answer: "He is my brother." },
    { question: "Who is she?", answer: "She is my friend." },
    { question: "Who are they?", answer: "They are students." },
    { question: "Who are we?", answer: "We are classmates." },
    { question: "Who is it?", answer: "It is my cat." },
    { question: "Who are you?", answer: "I am your student." },
    { question: "Is he your father?", answer: "Yes, he is my father." },
    { question: "Is she your sister?", answer: "Yes, she is my sister." },
    { question: "Are they your friends?", answer: "Yes, they are my friends." },
    { question: "Am I your teacher?", answer: "Yes, you are my teacher." },
    { question: "Is it a dog?", answer: "Yes, it is a dog." },
    { question: "Who is speaking?", answer: "I am speaking." },
    { question: "Who is in the room?", answer: "She is in the room." },
    { question: "Are we late?", answer: "No, we are not late." },
    { question: "Are they ready?", answer: "Yes, they are ready." },
    { question: "Who is this?", answer: "This is my mother." },
    { question: "Who are those?", answer: "They are my neighbors." },
    { question: "Am I right?", answer: "Yes, you are right." },
    { question: "Is he a teacher?", answer: "Yes, he is a teacher." },
    { question: "Who am I?", answer: "You are my teacher." },
    { question: "Who is he?", answer: "He is my brother." },
    { question: "Who is she?", answer: "She is my friend." },
    { question: "Who are they?", answer: "They are students." },
    { question: "Who are we?", answer: "We are classmates." },
    { question: "Who is it?", answer: "It is my cat." },
    { question: "Who are you?", answer: "I am your student." },
    { question: "Is he your father?", answer: "Yes, he is my father." },
    { question: "Is she your sister?", answer: "Yes, she is my sister." },
    { question: "Are they your friends?", answer: "Yes, they are my friends." },
    { question: "Am I your teacher?", answer: "Yes, you are my teacher." },
    { question: "Is it a dog?", answer: "Yes, it is a dog." },
    { question: "Who is speaking?", answer: "I am speaking." },
    { question: "Who is in the room?", answer: "She is in the room." },
    { question: "Are we late?", answer: "No, we are not late." },
    { question: "Are they ready?", answer: "Yes, they are ready." },
    { question: "Who is this?", answer: "This is my mother." },
    { question: "Who are those?", answer: "They are my neighbors." },
    { question: "Am I right?", answer: "Yes, you are right." },
    { question: "Is he a teacher?", answer: "Yes, he is a teacher." }
  ]
};

// Module 5 Data: Subject Pronouns
const MODULE_5_DATA = {
  title: "Modül 5 - Subject Pronouns",
  description: "Bu modülde İngilizcede Subject Pronouns (özne zamirleri) konusunu öğreneceğiz.",
  intro: `Bu modülde İngilizcede Subject Pronouns (özne zamirleri) konusunu öğreneceğiz.

Subject Pronouns cümlenin öznesi olarak kullanılır:
I, You, He, She, It, We, They

Örnek Cümleler:
- I am a student.
- She is a teacher.
- They are friends.`,
  tip: "Subject Pronouns replace the subject in a sentence. Use: I (for yourself), You (for the person you're talking to), He (for a male), She (for a female), It (for things/animals), We (for yourself and others), They (for other people or things).",
  
  table: [
    { pronoun: "I", example: "I am a student." },
    { pronoun: "You", example: "You are my friend." },
    { pronoun: "He", example: "He is a doctor." },
    { pronoun: "She", example: "She is happy." },
    { pronoun: "It", example: "It is a book." },
    { pronoun: "We", example: "We are teachers." },
    { pronoun: "They", example: "They are at school." }
  ],
  
  listeningExamples: [
    "I am a student.",
    "You are my friend.",
    "He is a doctor."
  ],
  
  speakingPractice: [
    { question: "Who am I?", answer: "You are my teacher." },
    { question: "Who is he?", answer: "He is my brother." },
    { question: "Who is she?", answer: "She is my sister." },
    { question: "What is it?", answer: "It is a book." },
    { question: "Who are we?", answer: "We are students." },
    { question: "Who are they?", answer: "They are my friends." },
    { question: "Am I happy?", answer: "Yes, you are happy." },
    { question: "Is he tall?", answer: "Yes, he is tall." },
    { question: "Is she beautiful?", answer: "Yes, she is beautiful." },
    { question: "Is it big?", answer: "Yes, it is big." },
    { question: "Are we ready?", answer: "Yes, we are ready." },
    { question: "Are they here?", answer: "Yes, they are here." },
    { question: "Am I a student?", answer: "Yes, you are a student." },
    { question: "Is he a doctor?", answer: "Yes, he is a doctor." },
    { question: "Is she a teacher?", answer: "Yes, she is a teacher." },
    { question: "Is it a cat?", answer: "Yes, it is a cat." },
    { question: "Are we friends?", answer: "Yes, we are friends." },
    { question: "Are they busy?", answer: "Yes, they are busy." },
    { question: "Am I late?", answer: "No, you are not late." },
    { question: "Is he tired?", answer: "No, he is not tired." },
    { question: "Is she sad?", answer: "No, she is not sad." },
    { question: "Is it cold?", answer: "No, it is not cold." },
    { question: "Are we wrong?", answer: "No, we are not wrong." },
    { question: "Are they angry?", answer: "No, they are not angry." },
    { question: "Who am I to you?", answer: "You are my friend." },
    { question: "Who is he to you?", answer: "He is my father." },
    { question: "Who is she to you?", answer: "She is my mother." },
    { question: "What is it to you?", answer: "It is my phone." },
    { question: "Who are we to them?", answer: "We are their children." },
    { question: "Who are they to you?", answer: "They are my parents." },
    { question: "Am I your teacher?", answer: "Yes, you are my teacher." },
    { question: "Is he your friend?", answer: "Yes, he is my friend." },
    { question: "Is she your sister?", answer: "Yes, she is my sister." },
    { question: "Is it your book?", answer: "Yes, it is my book." },
    { question: "Are we your students?", answer: "Yes, we are your students." },
    { question: "Are they your family?", answer: "Yes, they are my family." },
    { question: "Am I right?", answer: "Yes, you are right." },
    { question: "Is he kind?", answer: "Yes, he is kind." },
    { question: "Is she smart?", answer: "Yes, she is smart." },
    { question: "Are they good people?", answer: "Yes, they are good people." }
  ]
};

// Module 6 Data: Possessive Adjectives
const MODULE_6_DATA = {
  title: "Module 6: Possessive Adjectives",
  description: "This module teaches possessive adjectives in English: my, your, his, her, its, our, their",
  intro: `This module teaches possessive adjectives in English:
my, your, his, her, its, our, their

These adjectives come before a noun and show ownership.

Example Sentences:
- This is my book.
- That is her car.
- These are their friends.`,
  tip: "Possessive adjectives show who something belongs to. They always come before a noun and show ownership.",
  
  table: [
    { pronoun: "I", possessive: "my", example: "This is my house." },
    { pronoun: "You", possessive: "your", example: "Your dog is cute." },
    { pronoun: "He", possessive: "his", example: "His phone is on the table." },
    { pronoun: "She", possessive: "her", example: "Her bag is blue." },
    { pronoun: "It", possessive: "its", example: "The cat is licking its paw." },
    { pronoun: "We", possessive: "our", example: "Our school is big." },
    { pronoun: "They", possessive: "their", example: "Their children are playing." }
  ],
  
  listeningExamples: [
    "This is my book.",
    "That is her car.",
    "These are their friends."
  ],
  
  speakingPractice: [
    { question: "Whose book is this?", answer: "It is my book." },
    { question: "Is this your pen?", answer: "Yes, it is my pen." },
    { question: "Where is his car?", answer: "His car is in the garage." },
    { question: "Whose house is that?", answer: "That is their house." },
    { question: "Is this her phone?", answer: "Yes, it is her phone." },
    { question: "Where is our classroom?", answer: "Our classroom is upstairs." },
    { question: "Whose dog is barking?", answer: "It is their dog." },
    { question: "Are these your shoes?", answer: "Yes, they are my shoes." },
    { question: "Is this his bag?", answer: "Yes, it is his bag." },
    { question: "Is her dress new?", answer: "Yes, her dress is new." },
    { question: "Where is its food?", answer: "Its food is in the bowl." },
    { question: "Do you like our garden?", answer: "Yes, I like your garden." },
    { question: "Are those their books?", answer: "Yes, those are their books." },
    { question: "Is my answer correct?", answer: "Yes, your answer is correct." },
    { question: "Who owns this house?", answer: "This is their house." },
    { question: "Is this our meeting room?", answer: "Yes, it is our meeting room." },
    { question: "Whose bag is on the chair?", answer: "It is her bag." },
    { question: "Is this his hat?", answer: "Yes, it is his hat." },
    { question: "Are these my keys?", answer: "Yes, they are your keys." },
    { question: "Where is its tail?", answer: "Its tail is short." },
    { question: "Whose book is this?", answer: "It is my book." },
    { question: "Is this your pen?", answer: "Yes, it is my pen." },
    { question: "Where is his car?", answer: "His car is in the garage." },
    { question: "Whose house is that?", answer: "That is their house." },
    { question: "Is this her phone?", answer: "Yes, it is her phone." },
    { question: "Where is our classroom?", answer: "Our classroom is upstairs." },
    { question: "Whose dog is barking?", answer: "It is their dog." },
    { question: "Are these your shoes?", answer: "Yes, they are my shoes." },
    { question: "Is this his bag?", answer: "Yes, it is his bag." },
    { question: "Is her dress new?", answer: "Yes, her dress is new." },
    { question: "Where is its food?", answer: "Its food is in the bowl." },
    { question: "Do you like our garden?", answer: "Yes, I like your garden." },
    { question: "Are those their books?", answer: "Yes, those are their books." },
    { question: "Is my answer correct?", answer: "Yes, your answer is correct." },
    { question: "Who owns this house?", answer: "This is their house." },
    { question: "Is this our meeting room?", answer: "Yes, it is our meeting room." },
    { question: "Whose bag is on the chair?", answer: "It is her bag." },
    { question: "Is this his hat?", answer: "Yes, it is his hat." },
    { question: "Are these my keys?", answer: "Yes, they are your keys." },
    { question: "Where is its tail?", answer: "Its tail is short." }
  ]
};

// Module 7 Data: This / That / These / Those
const MODULE_7_DATA = {
  title: "Modül 7 - This / That / These / Those",
  description: "Bu modülde İngilizcede This, That, These ve Those kullanımlarını öğreneceğiz.",
  intro: `Bu modülde İngilizcede This, That, These ve Those kullanımlarını öğreneceğiz.

Konu Anlatımı:
- This = Bu (yakında, tekil)
- That = Şu (uzakta, tekil)
- These = Bunlar (yakında, çoğul)
- Those = Şunlar (uzakta, çoğul)

Örnek Cümleler:
- This is my book.
- That is her car.
- These are our friends.
- Those are their houses.`,
  tip: "Use 'This' and 'These' for things that are near you. Use 'That' and 'Those' for things that are far from you. 'This/That' are singular, 'These/Those' are plural.",
  
  listeningExamples: [
    "This is my book.",
    "That is her car.",
    "These are our friends."
  ],
  
  speakingPractice: [
    { question: "What is this?", answer: "This is my phone." },
    { question: "What is that?", answer: "That is a car." },
    { question: "What are these?", answer: "These are my books." },
    { question: "What are those?", answer: "Those are trees." },
    { question: "Is this your pen?", answer: "Yes, this is my pen." },
    { question: "Is that your house?", answer: "Yes, that is my house." },
    { question: "Are these your friends?", answer: "Yes, these are my friends." },
    { question: "Are those your bags?", answer: "Yes, those are my bags." },
    { question: "What is this object?", answer: "This is a computer." },
    { question: "What is that building?", answer: "That is a school." },
    { question: "What are these items?", answer: "These are flowers." },
    { question: "What are those animals?", answer: "Those are dogs." },
    { question: "Is this book interesting?", answer: "Yes, this book is interesting." },
    { question: "Is that movie good?", answer: "Yes, that movie is good." },
    { question: "Are these apples fresh?", answer: "Yes, these apples are fresh." },
    { question: "Are those students smart?", answer: "Yes, those students are smart." },
    { question: "What color is this shirt?", answer: "This shirt is blue." },
    { question: "What color is that chair?", answer: "That chair is red." },
    { question: "What color are these shoes?", answer: "These shoes are black." },
    { question: "What color are those flowers?", answer: "Those flowers are yellow." },
    { question: "Is this your favorite food?", answer: "Yes, this is my favorite food." },
    { question: "Is that your best friend?", answer: "Yes, that is my best friend." },
    { question: "Are these your new clothes?", answer: "Yes, these are my new clothes." },
    { question: "Are those your old photos?", answer: "Yes, those are my old photos." },
    { question: "What size is this room?", answer: "This room is big." },
    { question: "What size is that window?", answer: "That window is small." },
    { question: "How are these cookies?", answer: "These cookies are delicious." },
    { question: "How are those people?", answer: "Those people are kind." },
    { question: "Is this place beautiful?", answer: "Yes, this place is beautiful." },
    { question: "Is that restaurant expensive?", answer: "Yes, that restaurant is expensive." },
    { question: "Are these exercises easy?", answer: "Yes, these exercises are easy." },
    { question: "Are those questions difficult?", answer: "Yes, those questions are difficult." },
    { question: "What is this made of?", answer: "This is made of wood." },
    { question: "What is that made of?", answer: "That is made of metal." },
    { question: "What are these used for?", answer: "These are used for writing." },
    { question: "What are those used for?", answer: "Those are used for cooking." },
    { question: "Is this the right answer?", answer: "Yes, this is the right answer." },
    { question: "Is that the wrong way?", answer: "Yes, that is the wrong way." },
    { question: "Are these the correct tools?", answer: "Yes, these are the correct tools." },
    { question: "Are those the final results?", answer: "Yes, those are the final results." }
  ]
};

// Module 8 Data: There is / There are - Positive Sentences
const MODULE_8_DATA = {
  title: "Module 8: This / That / These / Those",
  description: "Learn how to use demonstrative words in English: This, That, These, Those",
  intro: `In this module, students will learn how to use demonstrative words in English:

This = Bu (near, singular)
That = Şu (far, singular) 
These = Bunlar (near, plural)
Those = Şunlar (far, plural)

Example Sentences:
- This is my book.
- That is her car.
- These are our friends.
- Those are their houses.`,
  tip: "Use 'This' and 'These' for things that are near you. Use 'That' and 'Those' for things that are far from you. 'This/That' are singular, 'These/Those' are plural.",
  
  table: [
    { word: "This", usage: "Near, singular", example: "This is a chair." },
    { word: "That", usage: "Far, singular", example: "That is a tree." },
    { word: "These", usage: "Near, plural", example: "These are my shoes." },
    { word: "Those", usage: "Far, plural", example: "Those are birds." }
  ],
  
  listeningExamples: [
    "This is my book.",
    "That is her car.",
    "These are our friends."
  ],
  
  speakingPractice: [
    { question: "What is this?", answer: "This is my phone." },
    { question: "What is that?", answer: "That is her house." },
    { question: "What are these?", answer: "These are our books." },
    { question: "What are those?", answer: "Those are cars." },
    { question: "Is this your bag?", answer: "Yes, this is my bag." },
    { question: "Is that your dog?", answer: "No, that is not my dog." },
    { question: "Are these your keys?", answer: "Yes, these are my keys." },
    { question: "Are those your shoes?", answer: "No, those are not my shoes." },
    { question: "Which is this?", answer: "This is the blue one." },
    { question: "Which is that?", answer: "That is the red one." },
    { question: "Who are these?", answer: "These are my friends." },
    { question: "Who are those?", answer: "Those are teachers." },
    { question: "Is this a book?", answer: "Yes, it is a book." },
    { question: "Is that a school?", answer: "Yes, that is a school." },
    { question: "Are these apples?", answer: "Yes, these are apples." },
    { question: "Are those chairs?", answer: "No, those are tables." },
    { question: "What's this?", answer: "This is a pencil." },
    { question: "What's that?", answer: "That is a window." },
    { question: "What are these?", answer: "These are oranges." },
    { question: "What are those?", answer: "Those are buildings." },
    { question: "What is this?", answer: "This is my phone." },
    { question: "What is that?", answer: "That is her house." },
    { question: "What are these?", answer: "These are our books." },
    { question: "What are those?", answer: "Those are cars." },
    { question: "Is this your bag?", answer: "Yes, this is my bag." },
    { question: "Is that your dog?", answer: "No, that is not my dog." },
    { question: "Are these your keys?", answer: "Yes, these are my keys." },
    { question: "Are those your shoes?", answer: "No, those are not my shoes." },
    { question: "Which is this?", answer: "This is the blue one." },
    { question: "Which is that?", answer: "That is the red one." },
    { question: "Who are these?", answer: "These are my friends." },
    { question: "Who are those?", answer: "Those are teachers." },
    { question: "Is this a book?", answer: "Yes, it is a book." },
    { question: "Is that a school?", answer: "Yes, that is a school." },
    { question: "Are these apples?", answer: "Yes, these are apples." },
    { question: "Are those chairs?", answer: "No, those are tables." },
    { question: "What's this?", answer: "This is a pencil." },
    { question: "What's that?", answer: "That is a window." },
    { question: "What are these?", answer: "These are oranges." },
    { question: "What are those?", answer: "Those are buildings." }
  ]
};

// Module 9 Data: There is / There are - Negative Sentences
const MODULE_9_DATA = {
  title: "Modül 9 – There is / There are – Negative Sentences",
  description: "Bu modülde İngilizcede 'There isn't' ve 'There aren't' kullanarak olumsuz cümleler kurmayı öğreneceğiz.",
  intro: `Bu modülde İngilizcede 'There isn't' ve 'There aren't' kullanarak olumsuz cümleler kurmayı öğreneceğiz.

Konu Anlatımı:
- 'There isn't' = Tekil veya sayılamayan nesneler için olumsuz
- 'There aren't' = Çoğul nesneler için olumsuz

Örnek Cümleler:
- There isn't a book on the table.
- There aren't any cars in the garage.
- There isn't water in the glass.
- There aren't students in the classroom.`,
  tip: "Use 'There isn't' for singular and uncountable nouns, and 'There aren't' for plural nouns when making negative sentences.",
  
  table: [
    { structure: "There isn't + singular noun", example: "There isn't a dog in the garden." },
    { structure: "There aren't + plural noun", example: "There aren't flowers in the vase." },
    { structure: "There isn't + uncountable noun", example: "There isn't milk in the fridge." }
  ],
  
  listeningExamples: [
    "There isn't a book on the table.",
    "There aren't any cars in the garage.",
    "There isn't water in the glass."
  ],
  
  speakingPractice: [
    { question: "Is there a book on the table?", answer: "No, there isn't a book on the table." },
    { question: "Is there a cat in the garden?", answer: "No, there isn't a cat in the garden." },
    { question: "Is there a chair in the room?", answer: "No, there isn't a chair in the room." },
    { question: "Is there a picture on the wall?", answer: "No, there isn't a picture on the wall." },
    { question: "Is there an apple in the basket?", answer: "No, there isn't an apple in the basket." },
    { question: "Are there cars in the garage?", answer: "No, there aren't cars in the garage." },
    { question: "Are there people in the park?", answer: "No, there aren't people in the park." },
    { question: "Are there pens on the desk?", answer: "No, there aren't pens on the desk." },
    { question: "Are there toys in the box?", answer: "No, there aren't toys in the box." },
    { question: "Are there students in the classroom?", answer: "No, there aren't students in the classroom." },
    { question: "Is there water in the bottle?", answer: "No, there isn't water in the bottle." },
    { question: "Is there a notebook in the bag?", answer: "No, there isn't a notebook in the bag." },
    { question: "Are there books on the shelves?", answer: "No, there aren't books on the shelves." },
    { question: "Is there a box under the bed?", answer: "No, there isn't a box under the bed." },
    { question: "Is there a pillow on the sofa?", answer: "No, there isn't a pillow on the sofa." },
    { question: "Are there eggs in the fridge?", answer: "No, there aren't eggs in the fridge." },
    { question: "Are there sandwiches on the plate?", answer: "No, there aren't sandwiches on the plate." },
    { question: "Is there tea in the cup?", answer: "No, there isn't tea in the cup." },
    { question: "Is there a bag near the door?", answer: "No, there isn't a bag near the door." },
    { question: "Is there milk in the glass?", answer: "No, there isn't milk in the glass." },
    { question: "Are there flowers in the vase?", answer: "No, there aren't flowers in the vase." },
    { question: "Is there a computer on the desk?", answer: "No, there isn't a computer on the desk." },
    { question: "Are there children in the playground?", answer: "No, there aren't children in the playground." },
    { question: "Is there food in the kitchen?", answer: "No, there isn't food in the kitchen." },
    { question: "Are there clothes in the wardrobe?", answer: "No, there aren't clothes in the wardrobe." },
    { question: "Is there a phone on the table?", answer: "No, there isn't a phone on the table." },
    { question: "Are there birds in the tree?", answer: "No, there aren't birds in the tree." },
    { question: "Is there coffee in the machine?", answer: "No, there isn't coffee in the machine." },
    { question: "Are there magazines on the shelf?", answer: "No, there aren't magazines on the shelf." },
    { question: "Is there a lamp in the corner?", answer: "No, there isn't a lamp in the corner." },
    { question: "Are there guests in the hotel?", answer: "No, there aren't guests in the hotel." },
    { question: "Is there sugar in the bowl?", answer: "No, there isn't sugar in the bowl." },
    { question: "Are there papers on the floor?", answer: "No, there aren't papers on the floor." },
    { question: "Is there a key in the lock?", answer: "No, there isn't a key in the lock." },
    { question: "Are there shoes in the closet?", answer: "No, there aren't shoes in the closet." },
    { question: "Is there bread in the basket?", answer: "No, there isn't bread in the basket." },
    { question: "Are there cars in the parking lot?", answer: "No, there aren't cars in the parking lot." },
    { question: "Is there a window in the bathroom?", answer: "No, there isn't a window in the bathroom." },
    { question: "Are there tools in the garage?", answer: "No, there aren't tools in the garage." },
    { question: "Is there money in the wallet?", answer: "No, there isn't money in the wallet." }
  ]
};

// Module 10 Data: There is / There are - Question Sentences
const MODULE_10_DATA = {
  title: "Modül 10 - There is / There are – Question Sentences",
  description: "Bu modülde İngilizcede 'There is' ve 'There are' soru cümleleri kurmayı öğreneceğiz.",
  intro: `"There is" ve "There are" kalıplarını, bir şeyin bir yerde olup olmadığını sorarken de kullanırız.

Kullanımı:
Is there a... + tekil isim?
Are there any... + çoğul isim?

Örnekler:
Is there a pen on the desk? (Masada bir kalem var mı?)
Are there any books in your bag? (Çantanda kitap var mı?)`,
  tip: "Use 'Is there' with singular nouns and 'Are there' with plural nouns when asking questions about existence or location.",
  
  table: [
    { structure: "Is there a + singular noun?", example: "Is there a pen on the desk?" },
    { structure: "Are there any + plural noun?", example: "Are there any books in your bag?" },
    { structure: "Is there + uncountable noun?", example: "Is there water in the glass?" }
  ],
  
  listeningExamples: [
    "Is there a pen on the desk?",
    "Are there any books in your bag?",
    "Is there water in the glass?"
  ],
  
  speakingPractice: [
    { question: "Is there a pen on the desk?", answer: "Yes, there is a pen on the desk." },
    { question: "Is there a book in your bag?", answer: "Yes, there is a book in my bag." },
    { question: "Is there a dog in the garden?", answer: "Yes, there is a dog in the garden." },
    { question: "Is there a teacher in the classroom?", answer: "Yes, there is a teacher in the classroom." },
    { question: "Is there a phone on the table?", answer: "Yes, there is a phone on the table." },
    { question: "Is there an apple in the fridge?", answer: "Yes, there is an apple in the fridge." },
    { question: "Is there a window in the room?", answer: "Yes, there is a window in the room." },
    { question: "Is there a car in the garage?", answer: "Yes, there is a car in the garage." },
    { question: "Is there a student in the hall?", answer: "Yes, there is a student in the hall." },
    { question: "Is there a laptop on the chair?", answer: "Yes, there is a laptop on the chair." },
    { question: "Are there any books on the shelf?", answer: "Yes, there are books on the shelf." },
    { question: "Are there any pens in the pencil case?", answer: "Yes, there are pens in the pencil case." },
    { question: "Are there any students in the library?", answer: "Yes, there are students in the library." },
    { question: "Are there any chairs in the room?", answer: "Yes, there are chairs in the room." },
    { question: "Are there any cars on the street?", answer: "Yes, there are cars on the street." },
    { question: "Are there any apples on the tree?", answer: "Yes, there are apples on the tree." },
    { question: "Are there any cats under the bed?", answer: "Yes, there are cats under the bed." },
    { question: "Are there any people at the bus stop?", answer: "Yes, there are people at the bus stop." },
    { question: "Are there any shirts in the drawer?", answer: "Yes, there are shirts in the drawer." },
    { question: "Are there any bottles in the box?", answer: "Yes, there are bottles in the box." },
    { question: "Is there a television in the living room?", answer: "Yes, there is a television in the living room." },
    { question: "Is there a fridge in the kitchen?", answer: "Yes, there is a fridge in the kitchen." },
    { question: "Is there a mirror in the bathroom?", answer: "Yes, there is a mirror in the bathroom." },
    { question: "Is there a bed in the bedroom?", answer: "Yes, there is a bed in the bedroom." },
    { question: "Is there a clock on the wall?", answer: "Yes, there is a clock on the wall." },
    { question: "Are there any toys in the box?", answer: "Yes, there are toys in the box." },
    { question: "Are there any pictures on the wall?", answer: "Yes, there are pictures on the wall." },
    { question: "Are there any shoes under the bed?", answer: "Yes, there are shoes under the bed." },
    { question: "Are there any cups on the table?", answer: "Yes, there are cups on the table." },
    { question: "Are there any lamps in the room?", answer: "Yes, there are lamps in the room." },
    { question: "Is there a map on the wall?", answer: "Yes, there is a map on the wall." },
    { question: "Is there a bag on the chair?", answer: "Yes, there is a bag on the chair." },
    { question: "Is there a computer on the desk?", answer: "Yes, there is a computer on the desk." },
    { question: "Is there a magazine on the sofa?", answer: "Yes, there is a magazine on the sofa." },
    { question: "Is there a cat in the room?", answer: "Yes, there is a cat in the room." },
    { question: "Are there any notebooks in the bag?", answer: "Yes, there are notebooks in the bag." },
    { question: "Are there any bottles in the fridge?", answer: "Yes, there are bottles in the fridge." },
    { question: "Are there any pictures in the album?", answer: "Yes, there are pictures in the album." },
    { question: "Are there any people in the room?", answer: "Yes, there are people in the room." },
    { question: "Are there any sandwiches on the plate?", answer: "Yes, there are sandwiches on the plate." }
  ]
};

// Module 11 Data: Articles (a / an / the)
const MODULE_11_DATA = {
  title: "Module 11: There is / There are – Positive Sentences",
  description: "Learn how to use There is and There are in positive sentences",
  intro: `In this module, learners will practice how to use "There is" and "There are" in positive English sentences.

Use:
- There is for singular and uncountable nouns
- There are for plural nouns

Example Sentences:
- There is a book on the table.
- There are two cars in the garage.
- There is water in the glass.
- There are many people in the park.`,
  tip: "Use 'There is' for singular nouns and 'There are' for plural nouns. 'There is' can also be used with uncountable nouns.",
  
  table: [
    { structure: "There is + singular", example: "There is a dog in the garden." },
    { structure: "There are + plural", example: "There are flowers in the vase." },
    { structure: "There is + uncountable", example: "There is water in the glass." }
  ],
  
  listeningExamples: [
    "There is a book on the table.",
    "There are two cars in the garage.",
    "There is water in the glass."
  ],
  
  speakingPractice: [
    { question: "What is on the table?", answer: "There is a book on the table." },
    { question: "What is in the kitchen?", answer: "There is a fridge in the kitchen." },
    { question: "What is in the garden?", answer: "There is a cat in the garden." },
    { question: "What is in the room?", answer: "There is a chair in the room." },
    { question: "What is on the wall?", answer: "There is a picture on the wall." },
    { question: "What is in the basket?", answer: "There is an apple in the basket." },
    { question: "What are in the garage?", answer: "There are two cars in the garage." },
    { question: "What are in the park?", answer: "There are many people in the park." },
    { question: "What are on the desk?", answer: "There are some pens on the desk." },
    { question: "What are in the box?", answer: "There are toys in the box." },
    { question: "What is in the bottle?", answer: "There is water in the bottle." },
    { question: "What is in the bag?", answer: "There is a notebook in the bag." },
    { question: "What are in the classroom?", answer: "There are students in the classroom." },
    { question: "What are on the shelves?", answer: "There are books on the shelves." },
    { question: "What is under the bed?", answer: "There is a box under the bed." },
    { question: "What is on the sofa?", answer: "There is a pillow on the sofa." },
    { question: "What are in the fridge?", answer: "There are eggs in the fridge." },
    { question: "What are on the plate?", answer: "There are sandwiches on the plate." },
    { question: "What is in the cup?", answer: "There is tea in the cup." },
    { question: "What is near the door?", answer: "There is a bag near the door." },
    { question: "What is on the table?", answer: "There is a book on the table." },
    { question: "What is in the kitchen?", answer: "There is a fridge in the kitchen." },
    { question: "What is in the garden?", answer: "There is a cat in the garden." },
    { question: "What is in the room?", answer: "There is a chair in the room." },
    { question: "What is on the wall?", answer: "There is a picture on the wall." },
    { question: "What is in the basket?", answer: "There is an apple in the basket." },
    { question: "What are in the garage?", answer: "There are two cars in the garage." },
    { question: "What are in the park?", answer: "There are many people in the park." },
    { question: "What are on the desk?", answer: "There are some pens on the desk." },
    { question: "What are in the box?", answer: "There are toys in the box." },
    { question: "What is in the bottle?", answer: "There is water in the bottle." },
    { question: "What is in the bag?", answer: "There is a notebook in the bag." },
    { question: "What are in the classroom?", answer: "There are students in the classroom." },
    { question: "What are on the shelves?", answer: "There are books on the shelves." },
    { question: "What is under the bed?", answer: "There is a box under the bed." },
    { question: "What is on the sofa?", answer: "There is a pillow on the sofa." },
    { question: "What are in the fridge?", answer: "There are eggs in the fridge." },
    { question: "What are on the plate?", answer: "There are sandwiches on the plate." },
    { question: "What is in the cup?", answer: "There is tea in the cup." },
    { question: "What is near the door?", answer: "There is a bag near the door." }
  ]
};

// Module 12 Data: Plural Nouns – Regular and Irregular
const MODULE_12_DATA = {
  title: "Modül 12 - Plural Nouns – Regular and Irregular",
  description: "Bu modülde İngilizcede Plural Nouns (çoğul isimler) konusunu öğreneceğiz.",
  intro: `Bu modülde İngilizcede Plural Nouns (çoğul isimler) konusunu öğreneceğiz.

Konu Anlatımı:

Regular Plurals:
-s eklenir: cat → cats
-es eklenir: bus → buses
-y → -ies: baby → babies

Irregular Plurals:
man → men
child → children
tooth → teeth

Örnek Cümleler:
There are two cats in the garden.
The children are playing outside.
I saw three men at the park.
Brush your teeth every day.`,
  tip: "Regular plurals add -s, -es, or change -y to -ies. Irregular plurals have special forms like man→men, child→children, tooth→teeth.",
  
  table: [
    { singular: "cat", plural: "cats", type: "Regular (+s)", example: "There are cats on the roof." },
    { singular: "bus", plural: "buses", type: "Regular (+es)", example: "There are buses in the city." },
    { singular: "baby", plural: "babies", type: "Regular (y→ies)", example: "The babies are sleeping." },
    { singular: "man", plural: "men", type: "Irregular", example: "Three men are waiting." },
    { singular: "child", plural: "children", type: "Irregular", example: "The children are playing outside." },
    { singular: "tooth", plural: "teeth", type: "Irregular", example: "I brush my teeth every day." }
  ],
  
  listeningExamples: [
    "There are cats on the roof.",
    "The buses are in the city.",
    "The babies are sleeping."
  ],
  
  speakingPractice: [
    { question: "What are on the roof?", answer: "There are cats on the roof." },
    { question: "What are in the city?", answer: "There are buses in the city." },
    { question: "Who are sleeping?", answer: "The babies are sleeping." },
    { question: "Who are waiting?", answer: "Three men are waiting." },
    { question: "Who are playing outside?", answer: "The children are playing outside." },
    { question: "What do you brush every day?", answer: "I brush my teeth every day." },
    { question: "Are there cars in the garage?", answer: "Yes, there are cars in the garage." },
    { question: "Are there boxes on the floor?", answer: "Yes, there are boxes on the floor." },
    { question: "Who are in the park?", answer: "There are women in the park." },
    { question: "What are on the table?", answer: "There are sandwiches on the table." },
    { question: "Are there buses outside?", answer: "Yes, there are buses outside." },
    { question: "Are there babies in the house?", answer: "Yes, there are babies in the house." },
    { question: "Who are in the room?", answer: "There are men in the room." },
    { question: "Are there children at school?", answer: "Yes, there are children at school." },
    { question: "What are in the basket?", answer: "There are apples in the basket." },
    { question: "Are there books on the desk?", answer: "Yes, there are books on the desk." },
    { question: "Who are in the hall?", answer: "The women are in the hall." },
    { question: "What do you see?", answer: "I see geese in the field." },
    { question: "Who are outside?", answer: "The people are outside." },
    { question: "What are in the fridge?", answer: "There are eggs in the fridge." },
    { question: "What are on the roof?", answer: "There are cats on the roof." },
    { question: "What are in the city?", answer: "There are buses in the city." },
    { question: "Who are sleeping?", answer: "The babies are sleeping." },
    { question: "Who are waiting?", answer: "Three men are waiting." },
    { question: "Who are playing outside?", answer: "The children are playing outside." },
    { question: "What do you brush every day?", answer: "I brush my teeth every day." },
    { question: "Are there cars in the garage?", answer: "Yes, there are cars in the garage." },
    { question: "Are there boxes on the floor?", answer: "Yes, there are boxes on the floor." },
    { question: "Who are in the park?", answer: "There are women in the park." },
    { question: "What are on the table?", answer: "There are sandwiches on the table." },
    { question: "Are there buses outside?", answer: "Yes, there are buses outside." },
    { question: "Are there babies in the house?", answer: "Yes, there are babies in the house." },
    { question: "Who are in the room?", answer: "There are men in the room." },
    { question: "Are there children at school?", answer: "Yes, there are children at school." },
    { question: "What are in the basket?", answer: "There are apples in the basket." },
    { question: "Are there books on the desk?", answer: "Yes, there are books on the desk." },
    { question: "Who are in the hall?", answer: "The women are in the hall." },
    { question: "What do you see?", answer: "I see geese in the field." },
    { question: "Who are outside?", answer: "The people are outside." },
    { question: "What are in the fridge?", answer: "There are eggs in the fridge." }
  ]
};

// Module 13 Data: Have got / Has got – Positive Sentences
const MODULE_13_DATA = {
  title: "Modül 13 - Have got / Has got – Positive Sentences",
  description: "Bu modülde İngilizcede 'Have got' ve 'Has got' kullanarak olumlu cümleler kurmayı öğreneceğiz.",
  intro: `Bu modülde İngilizcede 'Have got' ve 'Has got' kullanarak olumlu cümleler kurmayı öğreneceğiz.

Kullanım Kuralları:

'Have got' → I, you, we, they için kullanılır.

'Has got' → He, she, it için kullanılır.

Örnek Cümleler:

I have got a new phone.

She has got two sisters.

We have got a big house.`,
  tip: "Use 'have got' with I, you, we, they and 'has got' with he, she, it to show possession.",
  
  table: [
    { subject: "I", verb: "have got", example: "I have got a car." },
    { subject: "You", verb: "have got", example: "You have got a bike." },
    { subject: "He", verb: "has got", example: "He has got a brother." },
    { subject: "She", verb: "has got", example: "She has got a cat." },
    { subject: "It", verb: "has got", example: "It has got four legs." },
    { subject: "We", verb: "have got", example: "We have got a garden." },
    { subject: "They", verb: "have got", example: "They have got a dog." }
  ],
  
  listeningExamples: [
    "I have got a new phone.",
    "She has got two sisters.",
    "We have got a big house."
  ],
  
  speakingPractice: [
    { question: "What do you have?", answer: "I have got a new car." },
    { question: "What has she got?", answer: "She has got a lovely dress." },
    { question: "What have they got?", answer: "They have got two dogs." },
    { question: "What has he got?", answer: "He has got a brother." },
    { question: "What have we got?", answer: "We have got a big house." },
    { question: "What have you got?", answer: "I have got a bicycle." },
    { question: "What has it got?", answer: "It has got a long tail." },
    { question: "What have your friends got?", answer: "They have got new phones." },
    { question: "What has Anna got?", answer: "She has got blue eyes." },
    { question: "What have your parents got?", answer: "They have got a car." },
    { question: "What has he got?", answer: "He has got a computer." },
    { question: "What have we got?", answer: "We have got a holiday next week." },
    { question: "What have the students got?", answer: "They have got exams tomorrow." },
    { question: "What has your dog got?", answer: "It has got a new toy." },
    { question: "What have you got in your bag?", answer: "I have got a book in my bag." },
    { question: "What has she got in her room?", answer: "She has got a big bed in her room." },
    { question: "What have they got in the kitchen?", answer: "They have got a fridge in the kitchen." },
    { question: "What has John got?", answer: "John has got a new watch." },
    { question: "What have we got for dinner?", answer: "We have got pizza for dinner." },
    { question: "What has your teacher got?", answer: "He has got a lot of books." },
    { question: "What do you have?", answer: "I have got a new car." },
    { question: "What has she got?", answer: "She has got a lovely dress." },
    { question: "What have they got?", answer: "They have got two dogs." },
    { question: "What has he got?", answer: "He has got a brother." },
    { question: "What have we got?", answer: "We have got a big house." },
    { question: "What have you got?", answer: "I have got a bicycle." },
    { question: "What has it got?", answer: "It has got a long tail." },
    { question: "What have your friends got?", answer: "They have got new phones." },
    { question: "What has Anna got?", answer: "She has got blue eyes." },
    { question: "What have your parents got?", answer: "They have got a car." },
    { question: "What has he got?", answer: "He has got a computer." },
    { question: "What have we got?", answer: "We have got a holiday next week." },
    { question: "What have the students got?", answer: "They have got exams tomorrow." },
    { question: "What has your dog got?", answer: "It has got a new toy." },
    { question: "What have you got in your bag?", answer: "I have got a book in my bag." },
    { question: "What has she got in her room?", answer: "She has got a big bed in her room." },
    { question: "What have they got in the kitchen?", answer: "They have got a fridge in the kitchen." },
    { question: "What has John got?", answer: "John has got a new watch." },
    { question: "What have we got for dinner?", answer: "We have got pizza for dinner." },
    { question: "What has your teacher got?", answer: "He has got a lot of books." }
  ]
};

// Module 14 Data: Have got / Has got – Negative Sentences
const MODULE_14_DATA = {
  title: "Modül 14 - Have got / Has got – Negative Sentences",
  description: "Bu modülde İngilizcede 'Have got' ve 'Has got' kullanarak olumsuz cümleler kurmayı öğreneceğiz.",
  intro: `Bu modülde İngilizcede "Have got" ve "Has got" kullanarak olumsuz cümleler kurmayı öğreneceğiz.

Konu Anlatımı:

haven't got = I, you, we, they için kullanılır.

hasn't got = He, she, it için kullanılır.

Örnek Cümleler:
I haven't got a car.
She hasn't got a sister.
They haven't got any money.`,
  tip: "Use 'haven't got' with I, you, we, they and 'hasn't got' with he, she, it for negative possession.",
  
  table: [
    { subject: "I", verb: "haven't got", example: "I haven't got a bike." },
    { subject: "You", verb: "haven't got", example: "You haven't got a dog." },
    { subject: "He", verb: "hasn't got", example: "He hasn't got a brother." },
    { subject: "She", verb: "hasn't got", example: "She hasn't got a car." },
    { subject: "It", verb: "hasn't got", example: "It hasn't got a tail." },
    { subject: "We", verb: "haven't got", example: "We haven't got a garden." },
    { subject: "They", verb: "haven't got", example: "They haven't got a house." }
  ],
  
  listeningExamples: [
    "I haven't got a car.",
    "She hasn't got a sister.",
    "They haven't got any money."
  ],
  
  speakingPractice: [
    { question: "Do you have a car?", answer: "No, I haven't got a car." },
    { question: "Has she got any brothers?", answer: "No, she hasn't got any brothers." },
    { question: "Have they got pets?", answer: "No, they haven't got any pets." },
    { question: "Has he got a computer?", answer: "No, he hasn't got a computer." },
    { question: "Have we got enough chairs?", answer: "No, we haven't got enough chairs." },
    { question: "Have you got a bike?", answer: "No, I haven't got a bike." },
    { question: "Has it got a name tag?", answer: "No, it hasn't got a name tag." },
    { question: "Have your friends got time?", answer: "No, they haven't got time." },
    { question: "Has Anna got blue eyes?", answer: "No, she hasn't got blue eyes." },
    { question: "Have your parents got a car?", answer: "No, they haven't got a car." },
    { question: "Has he got a mobile phone?", answer: "No, he hasn't got a mobile phone." },
    { question: "Have we got a holiday this week?", answer: "No, we haven't got a holiday this week." },
    { question: "Have the students got books?", answer: "No, they haven't got books." },
    { question: "Has your dog got a collar?", answer: "No, it hasn't got a collar." },
    { question: "Have you got anything in your bag?", answer: "No, I haven't got anything in my bag." },
    { question: "Has she got a television in her room?", answer: "No, she hasn't got a television in her room." },
    { question: "Have they got a fridge?", answer: "No, they haven't got a fridge." },
    { question: "Has John got a watch?", answer: "No, he hasn't got a watch." },
    { question: "Have we got any juice?", answer: "No, we haven't got any juice." },
    { question: "Has your teacher got a car?", answer: "No, he hasn't got a car." },
    { question: "Do you have a car?", answer: "No, I haven't got a car." },
    { question: "Has she got any brothers?", answer: "No, she hasn't got any brothers." },
    { question: "Have they got pets?", answer: "No, they haven't got any pets." },
    { question: "Has he got a computer?", answer: "No, he hasn't got a computer." },
    { question: "Have we got enough chairs?", answer: "No, we haven't got enough chairs." },
    { question: "Have you got a bike?", answer: "No, I haven't got a bike." },
    { question: "Has it got a name tag?", answer: "No, it hasn't got a name tag." },
    { question: "Have your friends got time?", answer: "No, they haven't got time." },
    { question: "Has Anna got blue eyes?", answer: "No, she hasn't got blue eyes." },
    { question: "Have your parents got a car?", answer: "No, they haven't got a car." },
    { question: "Has he got a mobile phone?", answer: "No, he hasn't got a mobile phone." },
    { question: "Have we got a holiday this week?", answer: "No, we haven't got a holiday this week." },
    { question: "Have the students got books?", answer: "No, they haven't got books." },
    { question: "Has your dog got a collar?", answer: "No, it hasn't got a collar." },
    { question: "Have you got anything in your bag?", answer: "No, I haven't got anything in my bag." },
    { question: "Has she got a television in her room?", answer: "No, she hasn't got a television in her room." },
    { question: "Have they got a fridge?", answer: "No, they haven't got a fridge." },
    { question: "Has John got a watch?", answer: "No, he hasn't got a watch." },
    { question: "Have we got any juice?", answer: "No, we haven't got any juice." },
    { question: "Has your teacher got a car?", answer: "No, he hasn't got a car." }
  ]
};

// Module 15 Data: Have got / Has got – Question Sentences
const MODULE_15_DATA = {
  title: "Modül 15 - Have got / Has got – Question Sentences",
  description: "Bu modülde İngilizcede 'Have got' ve 'Has got' kullanarak soru cümleleri kurmayı öğreneceğiz.",
  intro: `Bu modülde İngilizcede "Have got" ve "Has got" kullanarak soru cümleleri kurmayı öğreneceğiz.

Açıklama:
'Have you got...?' → I, you, we, they için soru

'Has he/she/it got...?' → He, she, it için soru

Örnek Cümleler:
Have you got a car?
Has she got a brother?
Have they got any money?`,
  tip: "Use 'Have' with I, you, we, they and 'Has' with he, she, it to ask questions about possession.",
  
  table: [
    { subject: "I/you/we/they", questionForm: "Have + subject + got?", example: "Have you got a pen?" },
    { subject: "He/she/it", questionForm: "Has + subject + got?", example: "Has she got a car?" }
  ],
  
  listeningExamples: [
    "Have you got a car?",
    "Has she got a brother?",
    "Have they got any money?"
  ],
  
  speakingPractice: [
    { question: "Have you got a bike?", answer: "Yes, I have got a bike." },
    { question: "Has she got a cat?", answer: "Yes, she has got a cat." },
    { question: "Have they got any books?", answer: "No, they haven't got any books." },
    { question: "Has he got a brother?", answer: "No, he hasn't got a brother." },
    { question: "Have we got enough chairs?", answer: "Yes, we have got enough chairs." },
    { question: "Have you got a car?", answer: "No, I haven't got a car." },
    { question: "Has it got a name tag?", answer: "Yes, it has got a name tag." },
    { question: "Have your friends got time?", answer: "No, they haven't got time." },
    { question: "Has Anna got blue eyes?", answer: "Yes, she has got blue eyes." },
    { question: "Have your parents got a house?", answer: "Yes, they have got a house." },
    { question: "Has John got a new phone?", answer: "Yes, he has got a new phone." },
    { question: "Have we got juice in the fridge?", answer: "No, we haven't got juice." },
    { question: "Have the students got notebooks?", answer: "Yes, they have got notebooks." },
    { question: "Has your dog got a toy?", answer: "Yes, it has got a toy." },
    { question: "Have you got your keys?", answer: "Yes, I have got my keys." },
    { question: "Has she got a television?", answer: "No, she hasn't got a television." },
    { question: "Have they got pets?", answer: "Yes, they have got pets." },
    { question: "Has your teacher got a car?", answer: "Yes, he has got a car." },
    { question: "Have we got an exam tomorrow?", answer: "Yes, we have got an exam." },
    { question: "Has he got a hat?", answer: "No, he hasn't got a hat." },
    { question: "Have you got a bike?", answer: "Yes, I have got a bike." },
    { question: "Has she got a cat?", answer: "Yes, she has got a cat." },
    { question: "Have they got any books?", answer: "No, they haven't got any books." },
    { question: "Has he got a brother?", answer: "No, he hasn't got a brother." },
    { question: "Have we got enough chairs?", answer: "Yes, we have got enough chairs." },
    { question: "Have you got a car?", answer: "No, I haven't got a car." },
    { question: "Has it got a name tag?", answer: "Yes, it has got a name tag." },
    { question: "Have your friends got time?", answer: "No, they haven't got time." },
    { question: "Has Anna got blue eyes?", answer: "Yes, she has got blue eyes." },
    { question: "Have your parents got a house?", answer: "Yes, they have got a house." },
    { question: "Has John got a new phone?", answer: "Yes, he has got a new phone." },
    { question: "Have we got juice in the fridge?", answer: "No, we haven't got juice." },
    { question: "Have the students got notebooks?", answer: "Yes, they have got notebooks." },
    { question: "Has your dog got a toy?", answer: "Yes, it has got a toy." },
    { question: "Have you got your keys?", answer: "Yes, I have got my keys." },
    { question: "Has she got a television?", answer: "No, she hasn't got a television." },
    { question: "Have they got pets?", answer: "Yes, they have got pets." },
    { question: "Has your teacher got a car?", answer: "Yes, he has got a car." },
    { question: "Have we got an exam tomorrow?", answer: "Yes, we have got an exam." },
    { question: "Has he got a hat?", answer: "No, he hasn't got a hat." }
  ]
};

// Module 16 Data: Simple Present – Positive Sentences (I / You / We / They)
const MODULE_16_DATA = {
  title: "Modül 16 - Simple Present – Positive Sentences (I / You / We / They)",
  description: "Bu modülde İngilizcede Simple Present Tense kullanarak olumlu cümleler kurmayı öğreneceğiz.",
  intro: `Bu modülde İngilizcede Simple Present Tense kullanarak olumlu cümleler kurmayı öğreneceğiz.

Konu Anlatımı:
Simple Present, alışkanlıkları, genel gerçekleri ve rutinleri ifade eder.
I / You / We / They özneleriyle fiil yalın halde kullanılır.

Örnek Cümleler:
I play football on Sundays.
You like coffee.
We watch TV at night.
They go to school by bus.`,
  tip: "Use the base form of verbs with I, you, we, they to express habits, general facts, and routines.",
  
  table: [
    { subject: "I", verb: "play", example: "I play tennis every weekend." },
    { subject: "You", verb: "like", example: "You like music." },
    { subject: "We", verb: "watch", example: "We watch movies on Fridays." },
    { subject: "They", verb: "go", example: "They go to the park every morning." }
  ],
  
  listeningExamples: [
    "I play football on Sundays.",
    "You like coffee.",
    "We watch TV at night."
  ],
  
  speakingPractice: [
    { question: "What do you do on Sundays?", answer: "I play football on Sundays." },
    { question: "Do you like tea?", answer: "Yes, I like tea." },
    { question: "Where do we go on Fridays?", answer: "We go to the cinema on Fridays." },
    { question: "What do they do after school?", answer: "They play basketball after school." },
    { question: "Do you watch TV at night?", answer: "Yes, I watch TV at night." },
    { question: "What do we eat for breakfast?", answer: "We eat eggs for breakfast." },
    { question: "Do they visit their grandparents?", answer: "Yes, they visit their grandparents." },
    { question: "Where do you live?", answer: "I live in Istanbul." },
    { question: "What do we do every morning?", answer: "We drink coffee every morning." },
    { question: "Do they walk to school?", answer: "Yes, they walk to school." },
    { question: "What do you read?", answer: "I read books every evening." },
    { question: "What do they play?", answer: "They play football every Saturday." },
    { question: "Where do we study?", answer: "We study at the library." },
    { question: "Do you go shopping?", answer: "Yes, I go shopping on Saturdays." },
    { question: "What do we clean?", answer: "We clean our rooms every week." },
    { question: "What do they watch?", answer: "They watch cartoons in the afternoon." },
    { question: "Do you like ice cream?", answer: "Yes, I like ice cream." },
    { question: "What do we cook?", answer: "We cook pasta for dinner." },
    { question: "Where do they swim?", answer: "They swim in the sea every summer." },
    { question: "What do you do in your free time?", answer: "I play chess in my free time." },
    { question: "What do you do on Sundays?", answer: "I play football on Sundays." },
    { question: "Do you like tea?", answer: "Yes, I like tea." },
    { question: "Where do we go on Fridays?", answer: "We go to the cinema on Fridays." },
    { question: "What do they do after school?", answer: "They play basketball after school." },
    { question: "Do you watch TV at night?", answer: "Yes, I watch TV at night." },
    { question: "What do we eat for breakfast?", answer: "We eat eggs for breakfast." },
    { question: "Do they visit their grandparents?", answer: "Yes, they visit their grandparents." },
    { question: "Where do you live?", answer: "I live in Istanbul." },
    { question: "What do we do every morning?", answer: "We drink coffee every morning." },
    { question: "Do they walk to school?", answer: "Yes, they walk to school." },
    { question: "What do you read?", answer: "I read books every evening." },
    { question: "What do they play?", answer: "They play football every Saturday." },
    { question: "Where do we study?", answer: "We study at the library." },
    { question: "Do you go shopping?", answer: "Yes, I go shopping on Saturdays." },
    { question: "What do we clean?", answer: "We clean our rooms every week." },
    { question: "What do they watch?", answer: "They watch cartoons in the afternoon." },
    { question: "Do you like ice cream?", answer: "Yes, I like ice cream." },
    { question: "What do we cook?", answer: "We cook pasta for dinner." },
    { question: "Where do they swim?", answer: "They swim in the sea every summer." },
    { question: "What do you do in your free time?", answer: "I play chess in my free time." }
  ]
};

// Module 17 Data: Simple Present – Positive Sentences (He / She / It)
const MODULE_17_DATA = {
  title: "Modül 17 - Simple Present – Positive Sentences (He / She / It)",
  description: "Bu modülde İngilizcede Simple Present Tense kullanarak olumlu cümleler kurmayı öğreneceğiz.",
  intro: `Bu modülde İngilizcede Simple Present Tense kullanarak olumlu cümleler kurmayı öğreneceğiz.

Konu Anlatımı:
Simple Present, alışkanlıkları, genel gerçekleri ve rutinleri ifade eder.
He / She / It özneleriyle fiile -s veya -es eklenir.

Örnek Cümleler:
- He plays football on Sundays.
- She likes coffee.
- It works very well.`,
  tip: "Add -s or -es to verbs when using He, She, or It to express habits, general facts, and routines.",
  
  table: [
    { subject: "He", verb: "plays", example: "He plays tennis every weekend." },
    { subject: "She", verb: "likes", example: "She likes music." },
    { subject: "It", verb: "works", example: "It works perfectly." },
    { subject: "He", verb: "watches", example: "He watches TV at night." }
  ],
  
  listeningExamples: [
    "He plays football on Sundays.",
    "She likes coffee.",
    "It works very well."
  ],
  
  speakingPractice: [
    { question: "What does he do on Sundays?", answer: "He plays football on Sundays." },
    { question: "Does she like tea?", answer: "Yes, she likes tea." },
    { question: "Where does he go on Fridays?", answer: "He goes to the cinema on Fridays." },
    { question: "What does she do after school?", answer: "She plays basketball after school." },
    { question: "Does he watch TV at night?", answer: "Yes, he watches TV at night." },
    { question: "What does she eat for breakfast?", answer: "She eats eggs for breakfast." },
    { question: "Does it rain in winter?", answer: "Yes, it rains a lot in winter." },
    { question: "Where does he live?", answer: "He lives in Ankara." },
    { question: "What does she do every morning?", answer: "She drinks coffee every morning." },
    { question: "Does it work well?", answer: "Yes, it works very well." },
    { question: "What does he read?", answer: "He reads books every evening." },
    { question: "What does she play?", answer: "She plays the piano every Saturday." },
    { question: "Where does he study?", answer: "He studies at the library." },
    { question: "Does she go shopping?", answer: "Yes, she goes shopping on Saturdays." },
    { question: "What does he clean?", answer: "He cleans his room every week." },
    { question: "What does it make?", answer: "It makes a loud noise." },
    { question: "Does she like ice cream?", answer: "Yes, she likes ice cream." },
    { question: "What does he cook?", answer: "He cooks pasta for dinner." },
    { question: "Where does she swim?", answer: "She swims in the sea every summer." },
    { question: "What does he do in his free time?", answer: "He plays chess in his free time." },
    { question: "What does he do on Sundays?", answer: "He plays football on Sundays." },
    { question: "Does she like tea?", answer: "Yes, she likes tea." },
    { question: "Where does he go on Fridays?", answer: "He goes to the cinema on Fridays." },
    { question: "What does she do after school?", answer: "She plays basketball after school." },
    { question: "Does he watch TV at night?", answer: "Yes, he watches TV at night." },
    { question: "What does she eat for breakfast?", answer: "She eats eggs for breakfast." },
    { question: "Does it rain in winter?", answer: "Yes, it rains a lot in winter." },
    { question: "Where does he live?", answer: "He lives in Ankara." },
    { question: "What does she do every morning?", answer: "She drinks coffee every morning." },
    { question: "Does it work well?", answer: "Yes, it works very well." },
    { question: "What does he read?", answer: "He reads books every evening." },
    { question: "What does she play?", answer: "She plays the piano every Saturday." },
    { question: "Where does he study?", answer: "He studies at the library." },
    { question: "Does she go shopping?", answer: "Yes, she goes shopping on Saturdays." },
    { question: "What does he clean?", answer: "He cleans his room every week." },
    { question: "What does it make?", answer: "It makes a loud noise." },
    { question: "Does she like ice cream?", answer: "Yes, she likes ice cream." },
    { question: "What does he cook?", answer: "He cooks pasta for dinner." },
    { question: "Where does she swim?", answer: "She swims in the sea every summer." },
    { question: "What does he do in his free time?", answer: "He plays chess in his free time." }
  ]
};

// Module 18 Data: Simple Present – Negative Sentences (don't / doesn't)
const MODULE_18_DATA = {
  title: "Modül 18 - Simple Present – Negative Sentences (don't / doesn't)",
  description: "Bu modülde İngilizcede Simple Present Tense kullanarak olumsuz cümleler kurmayı öğreneceğiz.",
  intro: `Bu modülde İngilizcede Simple Present Tense kullanarak olumsuz cümleler kurmayı öğreneceğiz.

Konu Anlatımı:
I / You / We / They → don't + verb
He / She / It → doesn't + verb

Örnek Cümleler:
I don't like coffee.
She doesn't play tennis.
They don't watch TV at night.`,
  tip: "Use don't with I, you, we, they and doesn't with he, she, it to make negative sentences.",
  
  table: [
    { subject: "I / You / We / They", negativeForm: "don't + verb", example: "We don't eat meat." },
    { subject: "He / She / It", negativeForm: "doesn't + verb", example: "She doesn't go to school on Sundays." }
  ],
  
  listeningExamples: [
    "I don't like coffee.",
    "She doesn't play tennis.",
    "They don't watch TV at night."
  ],
  
  speakingPractice: [
    { question: "Do you like coffee?", answer: "No, I don't like coffee." },
    { question: "Does she play football?", answer: "No, she doesn't play football." },
    { question: "Do they watch TV at night?", answer: "No, they don't watch TV at night." },
    { question: "Does he read books?", answer: "No, he doesn't read books." },
    { question: "Do we go to the park every day?", answer: "No, we don't go to the park every day." },
    { question: "Does it rain in summer?", answer: "No, it doesn't rain in summer." },
    { question: "Do you cook at home?", answer: "No, I don't cook at home." },
    { question: "Does Anna sing well?", answer: "No, she doesn't sing well." },
    { question: "Do your friends study hard?", answer: "No, they don't study hard." },
    { question: "Does John watch movies?", answer: "No, he doesn't watch movies." },
    { question: "Do we work on weekends?", answer: "No, we don't work on weekends." },
    { question: "Does your dog bark a lot?", answer: "No, it doesn't bark a lot." },
    { question: "Do they live in this city?", answer: "No, they don't live in this city." },
    { question: "Does she eat meat?", answer: "No, she doesn't eat meat." },
    { question: "Do you play the guitar?", answer: "No, I don't play the guitar." },
    { question: "Does he drive to work?", answer: "No, he doesn't drive to work." },
    { question: "Do we drink coffee in the morning?", answer: "No, we don't drink coffee in the morning." },
    { question: "Does it snow here?", answer: "No, it doesn't snow here." },
    { question: "Do they visit their grandparents?", answer: "No, they don't visit their grandparents." },
    { question: "Does she like swimming?", answer: "No, she doesn't like swimming." },
    { question: "Do you like coffee?", answer: "No, I don't like coffee." },
    { question: "Does she play football?", answer: "No, she doesn't play football." },
    { question: "Do they watch TV at night?", answer: "No, they don't watch TV at night." },
    { question: "Does he read books?", answer: "No, he doesn't read books." },
    { question: "Do we go to the park every day?", answer: "No, we don't go to the park every day." },
    { question: "Does it rain in summer?", answer: "No, it doesn't rain in summer." },
    { question: "Do you cook at home?", answer: "No, I don't cook at home." },
    { question: "Does Anna sing well?", answer: "No, she doesn't sing well." },
    { question: "Do your friends study hard?", answer: "No, they don't study hard." },
    { question: "Does John watch movies?", answer: "No, he doesn't watch movies." },
    { question: "Do we work on weekends?", answer: "No, we don't work on weekends." },
    { question: "Does your dog bark a lot?", answer: "No, it doesn't bark a lot." },
    { question: "Do they live in this city?", answer: "No, they don't live in this city." },
    { question: "Does she eat meat?", answer: "No, she doesn't eat meat." },
    { question: "Do you play the guitar?", answer: "No, I don't play the guitar." },
    { question: "Does he drive to work?", answer: "No, he doesn't drive to work." },
    { question: "Do we drink coffee in the morning?", answer: "No, we don't drink coffee in the morning." },
    { question: "Does it snow here?", answer: "No, it doesn't snow here." },
    { question: "Do they visit their grandparents?", answer: "No, they don't visit their grandparents." },
    { question: "Does she like swimming?", answer: "No, she doesn't like swimming." }
  ]
};

// Module 19 Data: Simple Present – Yes/No Questions
const MODULE_19_DATA = {
  title: "Modül 19 - Simple Present – Yes/No Questions",
  description: "İngilizcede Simple Present Tense kullanarak Evet/Hayır soruları kurmayı öğreniyoruz.",
  intro: `İngilizcede Simple Present Tense kullanarak Evet/Hayır soruları kurmayı öğreniyoruz.

Yapı:

I / You / We / They → Do + subject + verb?

He / She / It → Does + subject + verb?

Örnek Cümleler:

Do you play football? → Yes, I do. / No, I don't.

Does she like tea? → Yes, she does. / No, she doesn't.

Do they work on Mondays? → Yes, they do. / No, they don't.`,
  tip: "Yes/No sorularda I/You/We/They için 'Do', He/She/It için 'Does' kullanın",
  
  table: [
    { structure: "Do + I/You/We/They + verb?", example: "Do you play football?" },
    { structure: "Does + He/She/It + verb?", example: "Does she like coffee?" },
    { structure: "Answer: Yes, I/you/we/they do.", example: "Yes, I do." },
    { structure: "Answer: Yes, he/she/it does.", example: "Yes, she does." },
    { structure: "Answer: No, I/you/we/they don't.", example: "No, they don't." },
    { structure: "Answer: No, he/she/it doesn't.", example: "No, it doesn't." }
  ],
  
  listeningExamples: [
    "Do you play football?",
    "Does she like coffee?",
    "Do they watch TV at night?"
  ],
  
  speakingPractice: [
    { question: "Do you play football?", answer: "Yes, I do." },
    { question: "Does she like coffee?", answer: "Yes, she does." },
    { question: "Do they watch TV at night?", answer: "No, they don't." },
    { question: "Does he read books?", answer: "Yes, he does." },
    { question: "Do we go to the park every Sunday?", answer: "No, we don't." },
    { question: "Does it rain here in summer?", answer: "No, it doesn't." },
    { question: "Do you cook dinner every day?", answer: "Yes, I do." },
    { question: "Does Anna speak French?", answer: "Yes, she does." },
    { question: "Do your friends study hard?", answer: "No, they don't." },
    { question: "Does John work on weekends?", answer: "No, he doesn't." },
    { question: "Do we need more chairs?", answer: "Yes, we do." },
    { question: "Does your dog bark at night?", answer: "Yes, it does." },
    { question: "Do they live in Istanbul?", answer: "No, they don't." },
    { question: "Does she eat meat?", answer: "Yes, she does." },
    { question: "Do you play the piano?", answer: "No, I don't." },
    { question: "Does he drive to work?", answer: "Yes, he does." },
    { question: "Do we drink tea in the morning?", answer: "Yes, we do." },
    { question: "Does it snow here in winter?", answer: "Yes, it does." },
    { question: "Do they visit their grandparents?", answer: "No, they don't." },
    { question: "Does she like swimming?", answer: "No, she doesn't." },
    { question: "Do you play football?", answer: "Yes, I do." },
    { question: "Does she like coffee?", answer: "Yes, she does." },
    { question: "Do they watch TV at night?", answer: "No, they don't." },
    { question: "Does he read books?", answer: "Yes, he does." },
    { question: "Do we go to the park every Sunday?", answer: "No, we don't." },
    { question: "Does it rain here in summer?", answer: "No, it doesn't." },
    { question: "Do you cook dinner every day?", answer: "Yes, I do." },
    { question: "Does Anna speak French?", answer: "Yes, she does." },
    { question: "Do your friends study hard?", answer: "No, they don't." },
    { question: "Does John work on weekends?", answer: "No, he doesn't." },
    { question: "Do we need more chairs?", answer: "Yes, we do." },
    { question: "Does your dog bark at night?", answer: "Yes, it does." },
    { question: "Do they live in Istanbul?", answer: "No, they don't." },
    { question: "Does she eat meat?", answer: "Yes, she does." },
    { question: "Do you play the piano?", answer: "No, I don't." },
    { question: "Does he drive to work?", answer: "Yes, he does." },
    { question: "Do we drink tea in the morning?", answer: "Yes, we do." },
    { question: "Does it snow here in winter?", answer: "Yes, it does." },
    { question: "Do they visit their grandparents?", answer: "No, they don't." },
    { question: "Does she like swimming?", answer: "No, she doesn't." }
  ]
};

// Module 20 Data: Simple Present – Wh- Questions (What, Where, Who, etc.)
const MODULE_20_DATA = {
  title: "Modül 20 – Simple Present – Wh- Questions (What, Where, Who, etc.)",
  description: "Öğrencilere İngilizce'de Simple Present Tense ile Wh- Questions kurdurmak ve doğru cümleyle cevaplama pratiği yaptırmak.",
  intro: `Wh- soru kelimeleri: What, Where, Who, When, Why, How
Kalıplar:

I / You / We / They → Wh- + do + subject + verb?

He / She / It → Wh- + does + subject + verb?

Örnek Cümleler:

What do you eat for breakfast?

Where does she live?

Who plays football?

When do they study?`,
  tip: "Wh- sorularda I/You/We/They için 'do', He/She/It için 'does' kullanın",
  
  table: [
    { whWord: "What", questionForm: "What do/does + subject + verb?", example: "What do you do on Sundays?" },
    { whWord: "Where", questionForm: "Where do/does + subject + verb?", example: "Where does she work?" },
    { whWord: "Who", questionForm: "Who + verb (+s)?", example: "Who cooks dinner?" },
    { whWord: "When", questionForm: "When do/does + subject + verb?", example: "When do they visit their grandparents?" }
  ],
  
  listeningExamples: [
    "What do you eat for breakfast?",
    "Where does she live?",
    "Who plays football in your team?"
  ],
  
  speakingPractice: [
    { question: "What do you eat for breakfast?", answer: "I eat eggs and bread for breakfast." },
    { question: "Where does she live?", answer: "She lives in London." },
    { question: "Who plays football in your team?", answer: "John plays football in our team." },
    { question: "When do they go to school?", answer: "They go to school at 8 AM." },
    { question: "Why do you like this book?", answer: "Because it's very interesting." },
    { question: "How does he travel to work?", answer: "He travels by bus." },
    { question: "What does Anna cook for dinner?", answer: "Anna cooks pasta for dinner." },
    { question: "Where do you study English?", answer: "I study English at Grammar Chat." },
    { question: "Who watches TV every evening?", answer: "My parents watch TV every evening." },
    { question: "When does it snow here?", answer: "It snows in January." },
    { question: "What do they play on weekends?", answer: "They play basketball on weekends." },
    { question: "Where does your brother work?", answer: "He works at a bank." },
    { question: "Who sings very well?", answer: "Sarah sings very well." },
    { question: "When do you clean your room?", answer: "I clean my room every Saturday." },
    { question: "Why does she like swimming?", answer: "Because it's fun." },
    { question: "How do they go to school?", answer: "They go to school by bike." },
    { question: "What does your dog eat?", answer: "It eats dry food." },
    { question: "Where do we meet on Fridays?", answer: "We meet at the café." },
    { question: "Who cooks in your family?", answer: "My mother cooks in our family." },
    { question: "When does your teacher give homework?", answer: "She gives homework every Monday." },
    { question: "What do you eat for breakfast?", answer: "I eat eggs and bread for breakfast." },
    { question: "Where does she live?", answer: "She lives in London." },
    { question: "Who plays football in your team?", answer: "John plays football in our team." },
    { question: "When do they go to school?", answer: "They go to school at 8 AM." },
    { question: "Why do you like this book?", answer: "Because it's very interesting." },
    { question: "How does he travel to work?", answer: "He travels by bus." },
    { question: "What does Anna cook for dinner?", answer: "Anna cooks pasta for dinner." },
    { question: "Where do you study English?", answer: "I study English at Grammar Chat." },
    { question: "Who watches TV every evening?", answer: "My parents watch TV every evening." },
    { question: "When does it snow here?", answer: "It snows in January." },
    { question: "What do they play on weekends?", answer: "They play basketball on weekends." },
    { question: "Where does your brother work?", answer: "He works at a bank." },
    { question: "Who sings very well?", answer: "Sarah sings very well." },
    { question: "When do you clean your room?", answer: "I clean my room every Saturday." },
    { question: "Why does she like swimming?", answer: "Because it's fun." },
    { question: "How do they go to school?", answer: "They go to school by bike." },
    { question: "What does your dog eat?", answer: "It eats dry food." },
    { question: "Where do we meet on Fridays?", answer: "We meet at the café." },
    { question: "Who cooks in your family?", answer: "My mother cooks in our family." },
    { question: "When does your teacher give homework?", answer: "She gives homework every Monday." }
  ]
};

// Module 21 Data: Adverbs of Frequency (Sıklık Zarfları)
const MODULE_21_DATA = {
  title: "Modül 21 – Adverbs of Frequency (Sıklık Zarfları)",
  description: '"Adverbs of Frequency" (Sıklık Zarfları), bir eylemin ne sıklıkla yapıldığını ifade eder.',
  intro: `"Adverbs of Frequency" (Sıklık Zarfları), bir eylemin ne sıklıkla yapıldığını ifade eder.
En sık kullanılanlar şunlardır:

Always – Her zaman

Usually – Genellikle

Sometimes – Bazen

Never – Asla

Kullanım Kuralları:

Eğer cümlede "to be" fiili varsa, sıklık zarfı bu fiilden sonra gelir.
👉 Örnek: She is always happy.

Diğer fiillerde ise sıklık zarfı fiilden önce gelir.
👉 Örnek: They usually eat lunch at 1 pm.

Yardımcı fiil varsa, sıklık zarfı yardımcı fiilden sonra gelir.
👉 Örnek: You can sometimes see dolphins here.`,
  tip: "Sıklık zarfları 'to be' fiilinden sonra, diğer fiillerden önce gelir",
  
  table: [
    { adverb: "Always", meaning: "Her zaman", example: "I always wake up at 7 o'clock." },
    { adverb: "Usually", meaning: "Genellikle", example: "She usually drinks tea in the morning." },
    { adverb: "Sometimes", meaning: "Bazen", example: "We sometimes go to the cinema." },
    { adverb: "Never", meaning: "Asla", example: "He never eats fast food." }
  ],
  
  listeningExamples: [
    "I always eat breakfast at home.",
    "She usually drinks tea in the morning.",
    "We sometimes go to the cinema."
  ],
  
  speakingPractice: [
    { question: "Do you always eat breakfast?", answer: "Yes, I always eat breakfast at home." },
    { question: "What do you usually do on Sundays?", answer: "I usually visit my grandparents on Sundays." },
    { question: "Does your friend sometimes call you at night?", answer: "Yes, he sometimes calls me." },
    { question: "Do you never drink coffee?", answer: "No, I never drink coffee." },
    { question: "Does she always smile?", answer: "Yes, she always smiles." },
    { question: "What do you usually eat for lunch?", answer: "I usually eat salad or soup." },
    { question: "Do you sometimes play football?", answer: "Yes, I sometimes play football with my friends." },
    { question: "Does your teacher never give homework?", answer: "No, she never gives homework." },
    { question: "Do they always go to school by bus?", answer: "Yes, they always go by bus." },
    { question: "Do you usually watch TV at night?", answer: "I usually watch TV after dinner." },
    { question: "Do you sometimes listen to music in the morning?", answer: "Yes, I sometimes listen to music." },
    { question: "Does your brother never play computer games?", answer: "No, he never plays computer games." },
    { question: "What do you always carry in your bag?", answer: "I always carry my phone and wallet." },
    { question: "Do you usually wake up early?", answer: "Yes, I usually wake up at 6 am." },
    { question: "Do you never eat chocolate?", answer: "No, I never eat chocolate." },
    { question: "Do your parents always drink tea?", answer: "Yes, they always drink tea in the morning." },
    { question: "Do you sometimes go to the park?", answer: "Yes, I sometimes go to the park on weekends." },
    { question: "Does your dog never bark?", answer: "No, my dog never barks." },
    { question: "Do you always do your homework?", answer: "Yes, I always do my homework after school." },
    { question: "Do you usually read books before sleeping?", answer: "I usually read books before I sleep." },
    { question: "Do you always check your phone in the morning?", answer: "Yes, I always check my phone when I wake up." },
    { question: "What do you usually eat for dinner?", answer: "I usually eat vegetables and meat for dinner." },
    { question: "Does your sister sometimes watch cartoons?", answer: "Yes, she sometimes watches cartoons on weekends." },
    { question: "Do your friends never arrive late?", answer: "No, they never arrive late." },
    { question: "Do you always brush your teeth before bed?", answer: "Yes, I always brush my teeth at night." },
    { question: "What do you usually drink in the morning?", answer: "I usually drink tea or coffee in the morning." },
    { question: "Do you sometimes forget your keys?", answer: "Yes, I sometimes forget them." },
    { question: "Does your brother never eat vegetables?", answer: "No, he never eats vegetables." },
    { question: "Do you always wear a jacket in winter?", answer: "Yes, I always wear a warm jacket." },
    { question: "Do you usually clean your room on Saturdays?", answer: "Yes, I usually clean it on Saturdays." },
    { question: "Do your parents sometimes go shopping together?", answer: "Yes, they sometimes go shopping together." },
    { question: "Does your teacher never come late to class?", answer: "No, she never comes late." },
    { question: "What do you always take with you when you travel?", answer: "I always take my passport and phone." },
    { question: "Do you usually walk to school?", answer: "Yes, I usually walk when the weather is good." },
    { question: "Do you sometimes eat breakfast outside?", answer: "Yes, I sometimes eat breakfast at a café." },
    { question: "Do your friends never play basketball?", answer: "No, they never play basketball." },
    { question: "Do you always call your family on weekends?", answer: "Yes, I always call them on Sunday evenings." },
    { question: "Do you usually watch movies at night?", answer: "I usually watch a movie after dinner." },
    { question: "Does your cousin sometimes visit you?", answer: "Yes, he sometimes visits us in the summer." },
    { question: "Do you never drink fizzy drinks?", answer: "No, I never drink fizzy drinks." }
  ]
};

// Module 22 Data: Can / Can't for Abilities
const MODULE_22_DATA = {
  title: "Module 22: Can / Can't for Abilities",
  description: "Learn to use can and can't to express abilities and skills.",
  intro: `"Can" ve "Can't", bir kişinin yapabildiği ya da yapamadığı şeyleri anlatmak için kullanılır.

Can: Yapabilmek
Can't (Cannot): Yapamamak

Kullanımı:
Olumlu (Affirmative): Subject + can + verb (base form)
Örnek: I can swim. (Ben yüzebilirim.)

Olumsuz (Negative): Subject + can't + verb (base form)  
Örnek: She can't drive. (O araba süremez.)

Soru (Question): Can + subject + verb (base form)?
Örnek: Can you play the piano? (Sen piyano çalabilir misin?)

Cevap: Yes, I can. / No, I can't.`,
  tip: "Can kullanırken fiil kök halinde kullanılır (infinitive without 'to')",
  
  table: [
    { type: "Olumlu", form: "Subject + can + verb", example: "I can swim." },
    { type: "Olumsuz", form: "Subject + can't + verb", example: "She can't drive." },
    { type: "Soru", form: "Can + subject + verb?", example: "Can you play the piano?" },
    { type: "Cevap", form: "Yes, I can. / No, I can't.", example: "Yes, I can play the piano." }
  ],
  
  listeningExamples: [
    "I can swim very well.",
    "She can't drive a car.",
    "Can you speak English?"
  ],
  
  speakingPractice: [
    { question: "Can you swim?", answer: "Yes, I can swim." },
    { question: "Can your brother play the guitar?", answer: "No, he can't play the guitar." },
    { question: "Can your parents speak English?", answer: "Yes, they can speak English." },
    { question: "Can your best friend cook Italian food?", answer: "No, she can't cook Italian food." },
    { question: "Can they run five kilometers?", answer: "Yes, they can run five kilometers." },
    { question: "Can you ride a bike?", answer: "Yes, I can ride a bike." },
    { question: "Can she sing well?", answer: "Yes, she can sing well." },
    { question: "Can he play chess?", answer: "No, he can't play chess." },
    { question: "Can your teacher speak Spanish?", answer: "No, he can't speak Spanish." },
    { question: "Can we visit the museum today?", answer: "Yes, we can visit the museum." },
    { question: "Can they play tennis?", answer: "No, they can't play tennis." },
    { question: "Can you dance?", answer: "Yes, I can dance." },
    { question: "Can your father drive a truck?", answer: "Yes, he can drive a truck." },
    { question: "Can your sister play the piano?", answer: "No, she can't play the piano." },
    { question: "Can he swim fast?", answer: "Yes, he can swim fast." },
    { question: "Can we stay here?", answer: "Yes, we can stay here." },
    { question: "Can they climb the mountain?", answer: "No, they can't climb the mountain." },
    { question: "Can you run fast?", answer: "Yes, I can run fast." },
    { question: "Can your friend cook well?", answer: "No, he can't cook well." },
    { question: "Can she speak French?", answer: "Yes, she can speak French." },
    { question: "Can we park here?", answer: "No, we can't park here." },
    { question: "Can they help us?", answer: "Yes, they can help us." },
    { question: "Can you read this book?", answer: "Yes, I can read this book." },
    { question: "Can your brother drive a car?", answer: "No, he can't drive a car." },
    { question: "Can your friends play basketball?", answer: "Yes, they can play basketball." },
    { question: "Can she use a computer?", answer: "Yes, she can use a computer." },
    { question: "Can he run a marathon?", answer: "No, he can't run a marathon." },
    { question: "Can we eat in this restaurant?", answer: "Yes, we can eat here." },
    { question: "Can they speak German?", answer: "No, they can't speak German." },
    { question: "Can you paint pictures?", answer: "Yes, I can paint pictures." },
    { question: "Can your dog swim?", answer: "No, it can't swim." },
    { question: "Can your teacher play the guitar?", answer: "Yes, he can play the guitar." },
    { question: "Can she ride a horse?", answer: "Yes, she can ride a horse." },
    { question: "Can they fix the car?", answer: "No, they can't fix the car." },
    { question: "Can you play the drums?", answer: "Yes, I can play the drums." },
    { question: "Can your friend speak Chinese?", answer: "No, he can't speak Chinese." },
    { question: "Can he play football?", answer: "Yes, he can play football." },
    { question: "Can we go there?", answer: "Yes, we can go there." },
    { question: "Can they help us now?", answer: "No, they can't help us now." },
    { question: "Can she draw well?", answer: "Yes, she can draw well." }
  ]
};

// Module 23 Data: Can / Can't for Permission
const MODULE_23_DATA = {
  title: "Tomas Hoca – A1 Module 23: Can / Can't for Permission",
  description: '"Can" ve "Can\'t", birinden izin istemek veya izin vermek için kullanılır.',
  intro: `"Can" ve "Can't", birinden izin istemek veya izin vermek için kullanılır.

Can: İzin istemek veya izin vermek

Can't: İzin vermemek

🔹 Kullanımı:

Olumlu (Affirmative): Subject + can + verb (base form)
→ You can use my phone. (Telefonumu kullanabilirsin.)

Olumsuz (Negative): Subject + can't + verb (base form)
→ You can't park here. (Buraya park edemezsin.)

Soru (Question): Can + subject + verb (base form)?
→ Can I open the window? (Pencereyi açabilir miyim?)

Cevap: Yes, you can. / No, you can't.`,
  tip: "Can ile izin istemek ve vermek için kullanın",
  
  table: [
    { subject: "I", affirmative: "I can go out.", negative: "I can't go out.", question: "Can I go out?", answer: "Yes, you can. / No, you can't." },
    { subject: "You", affirmative: "You can use my pen.", negative: "You can't use my pen.", question: "Can I use your pen?", answer: "Yes, you can. / No, you can't." },
    { subject: "He", affirmative: "He can visit us today.", negative: "He can't visit us.", question: "Can he visit us today?", answer: "Yes, he can. / No, he can't." },
    { subject: "She", affirmative: "She can stay here.", negative: "She can't stay here.", question: "Can she stay here?", answer: "Yes, she can. / No, she can't." },
    { subject: "We", affirmative: "We can enter now.", negative: "We can't enter now.", question: "Can we enter now?", answer: "Yes, you can. / No, you can't." },
    { subject: "They", affirmative: "They can use the computer.", negative: "They can't use the computer.", question: "Can they use the computer?", answer: "Yes, they can. / No, they can't." }
  ],
  
  listeningExamples: [
    "Can I sit here?",
    "You can use my phone.",
    "No, you can't park here."
  ],
  
  speakingPractice: [
    { question: "Can I sit here?", answer: "Yes, you can sit here." },
    { question: "Can we eat in this room?", answer: "No, you can't eat here." },
    { question: "Can he borrow your book?", answer: "Yes, he can borrow my book." },
    { question: "Can they park here?", answer: "No, they can't park here." },
    { question: "Can I use your phone?", answer: "Yes, you can use my phone." },
    { question: "Can she come to the party?", answer: "No, she can't come to the party." },
    { question: "Can we take photos here?", answer: "Yes, you can take photos here." },
    { question: "Can he open the window?", answer: "Yes, he can open the window." },
    { question: "Can I leave early?", answer: "No, you can't leave early." },
    { question: "Can they visit us tomorrow?", answer: "Yes, they can visit us tomorrow." },
    { question: "Can we drink water here?", answer: "Yes, you can drink water here." },
    { question: "Can I call my friend?", answer: "Yes, you can call your friend." },
    { question: "Can she use your laptop?", answer: "No, she can't use my laptop." },
    { question: "Can I bring my dog?", answer: "No, you can't bring your dog." },
    { question: "Can they stay here tonight?", answer: "Yes, they can stay here tonight." },
    { question: "Can we play music here?", answer: "No, you can't play music here." },
    { question: "Can I open the door?", answer: "Yes, you can open the door." },
    { question: "Can he borrow your pen?", answer: "Yes, he can borrow my pen." },
    { question: "Can she watch TV now?", answer: "No, she can't watch TV now." },
    { question: "Can we go inside?", answer: "Yes, you can go inside." },
    { question: "Can they use this table?", answer: "No, they can't use this table." },
    { question: "Can I join the meeting?", answer: "Yes, you can join the meeting." },
    { question: "Can she park her car here?", answer: "No, she can't park her car here." },
    { question: "Can we leave our bags here?", answer: "Yes, you can leave your bags here." },
    { question: "Can I write on the board?", answer: "Yes, you can write on the board." },
    { question: "Can he take this chair?", answer: "No, he can't take this chair." },
    { question: "Can they use your bike?", answer: "Yes, they can use my bike." },
    { question: "Can we borrow your books?", answer: "No, you can't borrow my books." },
    { question: "Can she go to the library?", answer: "Yes, she can go to the library." },
    { question: "Can I eat here?", answer: "No, you can't eat here." },
    { question: "Can they visit us today?", answer: "Yes, they can visit us today." },
    { question: "Can we sit in this area?", answer: "No, you can't sit in this area." },
    { question: "Can I play with your dog?", answer: "Yes, you can play with my dog." },
    { question: "Can he use this pen?", answer: "Yes, he can use this pen." },
    { question: "Can we stay here longer?", answer: "No, you can't stay here longer." },
    { question: "Can she join the game?", answer: "Yes, she can join the game." },
    { question: "Can I talk to the teacher?", answer: "Yes, you can talk to the teacher." },
    { question: "Can they use this room?", answer: "No, they can't use this room." },
    { question: "Can we park here?", answer: "Yes, you can park here." },
    { question: "Can he sit next to you?", answer: "No, he can't sit next to me." }
  ]
};

// Module 24 Data: Like/Love/Hate + -ing
const MODULE_24_DATA = {
  title: "A1 – Module 24: Like/Love/Hate + -ing",
  description: '"Like", "Love" ve "Hate" fiilleri, bir eylemi sevdiğimizi, çok sevdiğimizi veya nefret ettiğimizi anlatmak için kullanılır.',
  intro: `"Like", "Love" ve "Hate" fiilleri, bir eylemi sevdiğimizi, çok sevdiğimizi veya nefret ettiğimizi anlatmak için kullanılır. Bu fiillerden sonra gelen fiil "-ing" takısı alır.

Kullanımı:
Subject + like/love/hate + verb-ing

Örnekler:

I like reading books. (Kitap okumayı severim.)

She loves cooking. (O yemek yapmayı çok sever.)

He hates running. (O koşmaktan nefret eder.)`,
  tip: "Like/Love/Hate fiillerinden sonra fiiller -ing takısı alır",
  
  table: [
    { verb: "Like", usage: "Subject + like + verb-ing", example: "I like reading books." },
    { verb: "Love", usage: "Subject + love + verb-ing", example: "She loves cooking." },
    { verb: "Hate", usage: "Subject + hate + verb-ing", example: "He hates running." },
    { verb: "Don't like", usage: "Subject + don't/doesn't like + verb-ing", example: "They don't like swimming." }
  ],
  
  listeningExamples: [
    "I like reading books.",
    "She loves cooking.",
    "He hates running."
  ],
  
  speakingPractice: [
    { question: "Do you like reading books?", answer: "Yes, I like reading books." },
    { question: "Does he love cooking?", answer: "Yes, he loves cooking." },
    { question: "Do they hate playing football?", answer: "No, they don't hate playing football." },
    { question: "Does she like swimming?", answer: "Yes, she likes swimming." },
    { question: "Do you love watching movies?", answer: "Yes, I love watching movies." },
    { question: "Does he hate dancing?", answer: "No, he doesn't hate dancing." },
    { question: "Do we like walking in the park?", answer: "Yes, we like walking in the park." },
    { question: "Do they love listening to music?", answer: "Yes, they love listening to music." },
    { question: "Does she hate cleaning the house?", answer: "Yes, she hates cleaning the house." },
    { question: "Do you like painting?", answer: "No, I don't like painting." },
    { question: "Does he love running?", answer: "Yes, he loves running." },
    { question: "Do they hate studying?", answer: "No, they don't hate studying." },
    { question: "Does she like writing stories?", answer: "Yes, she likes writing stories." },
    { question: "Do you love singing?", answer: "Yes, I love singing." },
    { question: "Does he hate eating vegetables?", answer: "Yes, he hates eating vegetables." },
    { question: "Do we like playing chess?", answer: "No, we don't like playing chess." },
    { question: "Do they love driving?", answer: "Yes, they love driving." },
    { question: "Does she hate working at night?", answer: "No, she doesn't hate working at night." },
    { question: "Do you like traveling?", answer: "Yes, I like traveling." },
    { question: "Does he love fishing?", answer: "Yes, he loves fishing." },
    { question: "Do they hate doing homework?", answer: "No, they don't hate doing homework." },
    { question: "Does she like going shopping?", answer: "Yes, she likes going shopping." },
    { question: "Do we love eating ice cream?", answer: "Yes, we love eating ice cream." },
    { question: "Do you hate waiting in line?", answer: "Yes, I hate waiting in line." },
    { question: "Does he like playing video games?", answer: "Yes, he likes playing video games." },
    { question: "Do they love baking cakes?", answer: "Yes, they love baking cakes." },
    { question: "Does she hate driving in traffic?", answer: "Yes, she hates driving in traffic." },
    { question: "Do you like gardening?", answer: "No, I don't like gardening." },
    { question: "Does he love hiking?", answer: "Yes, he loves hiking." },
    { question: "Do they hate cleaning their room?", answer: "No, they don't hate cleaning their room." },
    { question: "Does she like taking photos?", answer: "Yes, she likes taking photos." },
    { question: "Do we love watching football?", answer: "Yes, we love watching football." },
    { question: "Do you hate doing the dishes?", answer: "Yes, I hate doing the dishes." },
    { question: "Does he like shopping online?", answer: "Yes, he likes shopping online." },
    { question: "Do they love helping people?", answer: "Yes, they love helping people." },
    { question: "Does she hate studying at night?", answer: "No, she doesn't hate studying at night." },
    { question: "Do you like running in the morning?", answer: "Yes, I like running in the morning." },
    { question: "Does he love playing the guitar?", answer: "Yes, he loves playing the guitar." },
    { question: "Do they hate swimming in cold water?", answer: "Yes, they hate swimming in cold water." },
    { question: "Does she like watching cartoons?", answer: "Yes, she likes watching cartoons." }
  ]
};

// Module 25: How much / How many
const MODULE_25_DATA = {
  title: "Module 25: How much / How many",
  description: "Learn the difference between How much (uncountable) and How many (countable).",
  intro: `How much → Sayılamayan isimlerle kullanılır (su, para, süt, tuz).
How many → Sayılabilen isimlerle kullanılır (elma, kitap, öğrenci).
Örn: How much water do you drink? → "Ne kadar su içersin?"
How many apples do you want? → "Kaç tane elma istersin?"`,
  tip: "How much + uncountable nouns, How many + countable nouns",
  
  table: [
    { type: "How much", use: "Uncountable nouns", example: "How much money do you have?" },
    { type: "How many", use: "Countable nouns", example: "How many books are on the table?" }
  ],
  
  listeningExamples: [
    "How much water do you drink?",
    "How many brothers do you have?",
    "How much sugar do you take in your tea?"
  ],
  
  speakingPractice: [
    { question: "How much water do you drink every day?", answer: "I drink about two liters of water every day." },
    { question: "How many brothers do you have?", answer: "I have two brothers." },
    { question: "How much sugar do you take in your tea?", answer: "I take one spoon of sugar." },
    { question: "How many languages do you speak?", answer: "I speak three languages." },
    { question: "How much milk do you need?", answer: "I need one glass of milk." },
    { question: "How many students are in your class?", answer: "There are twenty students in my class." },
    { question: "How much coffee do you drink in the morning?", answer: "I drink one cup of coffee." },
    { question: "How many countries have you visited?", answer: "I have visited five countries." },
    { question: "How much salt do you use?", answer: "I use a little salt." },
    { question: "How many friends do you have?", answer: "I have a lot of friends." },
    { question: "How much bread do you eat?", answer: "I eat two slices of bread." },
    { question: "How many pens do you have?", answer: "I have five pens." },
    { question: "How much juice is in the bottle?", answer: "There is half a bottle of juice." },
    { question: "How many books do you read in a year?", answer: "I read about ten books." },
    { question: "How much money do you have?", answer: "I have a little money." },
    { question: "How many cousins do you have?", answer: "I have seven cousins." },
    { question: "How much time do we have?", answer: "We have ten minutes." },
    { question: "How many emails do you write every day?", answer: "I write about ten emails." },
    { question: "How much rice do you eat for lunch?", answer: "I eat one plate of rice." },
    { question: "How many sandwiches do you want?", answer: "I want two sandwiches." },
    { question: "How much butter do you use?", answer: "I use a small amount of butter." },
    { question: "How many cars do you see?", answer: "I see ten cars." },
    { question: "How much tea do you drink daily?", answer: "I drink three cups of tea." },
    { question: "How many shirts do you own?", answer: "I own twelve shirts." },
    { question: "How much oil do you use for cooking?", answer: "I use very little oil." },
    { question: "How many apples are in the basket?", answer: "There are six apples in the basket." },
    { question: "How much cheese do you eat per week?", answer: "I eat 200 grams of cheese." },
    { question: "How many people live in your house?", answer: "Four people live in my house." },
    { question: "How much soap do you need?", answer: "I need one bar of soap." },
    { question: "How many glasses do you need?", answer: "I need four glasses." },
    { question: "How much flour is in the bag?", answer: "There is one kilogram of flour." },
    { question: "How many eggs are in the fridge?", answer: "There are eight eggs in the fridge." },
    { question: "How much ketchup do you want?", answer: "Just a little ketchup, please." },
    { question: "How many chairs are in the room?", answer: "There are ten chairs in the room." },
    { question: "How much lemonade did you drink?", answer: "I drank one glass of lemonade." },
    { question: "How many pencils are on the table?", answer: "There are five pencils." },
    { question: "How much shampoo is left?", answer: "There is a little shampoo left." },
    { question: "How many bananas do you want?", answer: "I want three bananas." },
    { question: "How much pasta do you need?", answer: "I need 250 grams of pasta." },
    { question: "How many socks do you have?", answer: "I have ten pairs of socks." }
  ]
};

// Module 26: Imperatives (Commands, Instructions)
const MODULE_26_DATA = {
  title: "Module 26: Imperatives (Commands, Instructions)",
  description: "Learn to use imperatives to give commands, instructions, advice, or suggestions.",
  intro: `Imperatives (emir cümleleri) birine komut, talimat, tavsiye veya öneri vermek için kullanılır.
🔹 Yapı: Fiilin yalın hâli → Open the door.
🔹 Olumsuz: Don't + fiil → Don't run.
🔹 Daha kibar yapmak için please kullanılabilir → Please sit down. (Lütfen oturun.)`,
  tip: "Imperatives use base form of verb. Add please to be polite.",
  
  table: [
    { type: "Positive", form: "Base verb", example: "Open the window." },
    { type: "Negative", form: "Don't + base verb", example: "Don't be late." },
    { type: "Polite", form: "Please + base verb", example: "Please sit down." }
  ],
  
  listeningExamples: [
    "Turn off the lights.",
    "Don't run in the hallway.",
    "Please sit down."
  ],
  
  speakingPractice: [
    { question: "What's an imperative for opening a door?", answer: "Open the door." },
    { question: "How do you tell someone to close their book?", answer: "Close your book." },
    { question: "How do you politely ask someone to sit down?", answer: "Please sit down." },
    { question: "How do you tell someone to stand up?", answer: "Stand up." },
    { question: "What's an imperative for turning on the light?", answer: "Turn on the light." },
    { question: "How do you tell someone to turn off the TV?", answer: "Turn off the TV." },
    { question: "How do you tell someone not to shout?", answer: "Don't shout." },
    { question: "How do you tell someone to be quiet?", answer: "Be quiet." },
    { question: "How do you politely ask someone to write their name?", answer: "Please write your name." },
    { question: "How do you tell someone not to touch something?", answer: "Don't touch that!" },
    { question: "How do you tell someone to come here?", answer: "Come here." },
    { question: "How do you tell someone to go to the board?", answer: "Go to the board." },
    { question: "How do you tell someone to listen carefully?", answer: "Listen carefully." },
    { question: "How do you tell someone not to run?", answer: "Don't run!" },
    { question: "How do you tell someone to take out their notebook?", answer: "Take out your notebook." },
    { question: "How do you politely ask for help?", answer: "Please help me." },
    { question: "How do you tell someone not to be late?", answer: "Don't be late." },
    { question: "How do you tell someone to wash their hands?", answer: "Wash your hands." },
    { question: "How do you tell someone to wait here?", answer: "Wait here." },
    { question: "How do you tell someone to follow you?", answer: "Follow me." },
    { question: "How do you tell someone to read a page?", answer: "Read this page." },
    { question: "How do you tell someone not to speak Turkish?", answer: "Don't speak Turkish." },
    { question: "How do you ask someone to give you their pen?", answer: "Give me your pen." },
    { question: "How do you politely ask someone to repeat?", answer: "Please repeat after me." },
    { question: "How do you tell someone not to forget their homework?", answer: "Don't forget your homework." },
    { question: "How do you tell someone to look at the screen?", answer: "Look at the screen." },
    { question: "How do you tell someone not to eat in class?", answer: "Don't eat in class." },
    { question: "How do you tell someone to answer the question?", answer: "Answer the question." },
    { question: "How do you tell someone not to open the window?", answer: "Don't open the window." },
    { question: "How do you politely ask someone to clean the board?", answer: "Please clean the board." },
    { question: "How do you tell someone to put their phone away?", answer: "Put your phone away." },
    { question: "How do you tell someone to take a deep breath?", answer: "Take a deep breath." },
    { question: "How do you tell someone not to worry?", answer: "Don't worry." },
    { question: "How do you tell someone to try again?", answer: "Try again." },
    { question: "How do you tell someone to be polite?", answer: "Be polite." },
    { question: "How do you tell someone not to make noise?", answer: "Don't make noise." },
    { question: "How do you politely ask someone to be careful?", answer: "Please be careful." },
    { question: "How do you tell someone to turn the page?", answer: "Turn the page." },
    { question: "How do you tell someone to smile?", answer: "Smile!" },
    { question: "How do you politely ask someone to do their best?", answer: "Please do your best." }
  ]
};

// Module 27: Present Continuous – Affirmative
const MODULE_27_DATA = {
  title: "Module 27: Present Continuous – Affirmative",
  description: "Learn how to form the Present Continuous tense in affirmative sentences.",
  intro: `Present Continuous (şimdiki zaman) şu anda gerçekleşen ya da geçici durumları anlatmak için kullanılır.
🔹 Yapı: Özne + am/is/are + fiil-ing
Örn: I am reading. (Ben okuyorum.) / They are playing. (Onlar oynuyorlar.)`,
  tip: "Use Present Continuous for actions happening now or temporary situations",
  
  table: [
    { subject: "I", form: "am + verb-ing", example: "I am studying." },
    { subject: "He/She/It", form: "is + verb-ing", example: "She is watching TV." },
    { subject: "We/You/They", form: "are + verb-ing", example: "They are playing football." }
  ],
  
  listeningExamples: [
    "I am reading a book.",
    "She is cooking dinner.",
    "They are playing football."
  ],
  
  speakingPractice: [
    { question: "What are you doing?", answer: "I am studying English." },
    { question: "What is she doing?", answer: "She is watching TV." },
    { question: "What are they doing?", answer: "They are playing football." },
    { question: "What is he doing?", answer: "He is eating lunch." },
    { question: "What are you doing right now?", answer: "I am talking to you." },
    { question: "What is your mother doing?", answer: "She is cooking dinner." },
    { question: "What is your friend doing?", answer: "He is reading a book." },
    { question: "What are the children doing?", answer: "They are drawing pictures." },
    { question: "What are you wearing?", answer: "I am wearing a blue shirt." },
    { question: "What are your classmates doing?", answer: "They are writing their homework." },
    { question: "What is the cat doing?", answer: "The cat is sleeping." },
    { question: "What is your father doing?", answer: "He is working in the garden." },
    { question: "What are you eating?", answer: "I am eating a sandwich." },
    { question: "What is your teacher doing?", answer: "She is teaching English." },
    { question: "What are your friends doing?", answer: "They are listening to music." },
    { question: "What is your brother doing?", answer: "He is playing video games." },
    { question: "What are you drinking?", answer: "I am drinking water." },
    { question: "What is your sister doing?", answer: "She is doing her homework." },
    { question: "What is your dog doing?", answer: "It is running in the yard." },
    { question: "What are you reading?", answer: "I am reading a novel." },
    { question: "What is he wearing?", answer: "He is wearing jeans and a T-shirt." },
    { question: "What are you doing at the moment?", answer: "I am using my phone." },
    { question: "What are they watching?", answer: "They are watching a movie." },
    { question: "What is she eating?", answer: "She is eating an apple." },
    { question: "What are you learning?", answer: "I am learning English grammar." },
    { question: "What are your parents doing?", answer: "They are cleaning the house." },
    { question: "What are the students doing?", answer: "They are taking an exam." },
    { question: "What is your friend drinking?", answer: "She is drinking orange juice." },
    { question: "What is the baby doing?", answer: "The baby is crying." },
    { question: "What are your neighbors doing?", answer: "They are having a party." },
    { question: "What are you thinking about?", answer: "I am thinking about my weekend plans." },
    { question: "What is your friend wearing?", answer: "He is wearing a black jacket." },
    { question: "What is the bird doing?", answer: "It is flying in the sky." },
    { question: "What are the workers doing?", answer: "They are fixing the road." },
    { question: "What are you looking at?", answer: "I am looking at a painting." },
    { question: "What is the man doing?", answer: "He is talking on the phone." },
    { question: "What are the kids playing?", answer: "They are playing hide and seek." },
    { question: "What is she writing?", answer: "She is writing a letter." },
    { question: "What are you doing this evening?", answer: "I am meeting my friends." },
    { question: "What are your classmates reading?", answer: "They are reading a short story." }
  ]
};

// Module 28: Present Continuous – Negative
const MODULE_28_DATA = {
  title: "Module 28: Present Continuous – Negative",
  description: "Learn how to form Present Continuous in the negative form.",
  intro: `Present Continuous (şimdiki zaman) olumsuz formu, şu anda gerçekleşmeyen eylemleri anlatmak için kullanılır.
🔹 Yapı: Özne + am/is/are + not + fiil-ing
Örn: I am not watching TV. (Ben TV izlemiyorum.)
She isn't working now. (O şu anda çalışmıyor.)
They aren't playing football. (Onlar futbol oynamıyor.)
🔹 Kısaltmalar:
• is not → isn't
• are not → aren't`,
  tip: "Use contractions isn't and aren't in informal speech",
  
  table: [
    { subject: "I", form: "am not + verb-ing", example: "I'm not reading." },
    { subject: "He/She/It", form: "is not/isn't + verb-ing", example: "She isn't studying." },
    { subject: "We/You/They", form: "are not/aren't + verb-ing", example: "They aren't sleeping." }
  ],
  
  listeningExamples: [
    "I'm not playing football.",
    "She isn't cooking dinner.",
    "They aren't studying now."
  ],
  
  speakingPractice: [
    { question: "Are you watching TV?", answer: "No, I'm not watching TV." },
    { question: "Is she eating lunch?", answer: "No, she isn't eating lunch." },
    { question: "Are they playing football?", answer: "No, they aren't playing football." },
    { question: "Is he reading a book?", answer: "No, he isn't reading a book." },
    { question: "Are you using your phone?", answer: "No, I'm not using my phone." },
    { question: "Is your brother doing his homework?", answer: "No, he isn't doing his homework." },
    { question: "Are the children running?", answer: "No, they aren't running." },
    { question: "Is your teacher speaking?", answer: "No, she isn't speaking." },
    { question: "Are you wearing a jacket?", answer: "No, I'm not wearing a jacket." },
    { question: "Is the cat sleeping?", answer: "No, the cat isn't sleeping." },
    { question: "Are your parents cooking?", answer: "No, they aren't cooking." },
    { question: "Is she listening to music?", answer: "No, she isn't listening to music." },
    { question: "Are you reading now?", answer: "No, I'm not reading now." },
    { question: "Is he writing a letter?", answer: "No, he isn't writing a letter." },
    { question: "Are they studying English?", answer: "No, they aren't studying English." },
    { question: "Is your sister brushing her hair?", answer: "No, she isn't brushing her hair." },
    { question: "Are you eating dinner?", answer: "No, I'm not eating dinner." },
    { question: "Is your dog barking?", answer: "No, it isn't barking." },
    { question: "Are you drinking coffee?", answer: "No, I'm not drinking coffee." },
    { question: "Is she washing the dishes?", answer: "No, she isn't washing the dishes." },
    { question: "Are they watching a movie?", answer: "No, they aren't watching a movie." },
    { question: "Is your friend calling you?", answer: "No, he isn't calling me." },
    { question: "Are you sitting down?", answer: "No, I'm not sitting down." },
    { question: "Is the baby crying?", answer: "No, the baby isn't crying." },
    { question: "Are your classmates laughing?", answer: "No, they aren't laughing." },
    { question: "Is he fixing the car?", answer: "No, he isn't fixing the car." },
    { question: "Are you talking to your teacher?", answer: "No, I'm not talking to my teacher." },
    { question: "Is she wearing a dress?", answer: "No, she isn't wearing a dress." },
    { question: "Are they cleaning the house?", answer: "No, they aren't cleaning the house." },
    { question: "Is your friend waiting for you?", answer: "No, he isn't waiting for me." },
    { question: "Are you learning Spanish?", answer: "No, I'm not learning Spanish." },
    { question: "Is the bird flying?", answer: "No, it isn't flying." },
    { question: "Are you opening the window?", answer: "No, I'm not opening the window." },
    { question: "Is your mom making dinner?", answer: "No, she isn't making dinner." },
    { question: "Are your brothers playing outside?", answer: "No, they aren't playing outside." },
    { question: "Is she going to school now?", answer: "No, she isn't going to school now." },
    { question: "Are you brushing your teeth?", answer: "No, I'm not brushing my teeth." },
    { question: "Is your dad watching TV?", answer: "No, he isn't watching TV." },
    { question: "Are you doing your homework?", answer: "No, I'm not doing my homework." },
    { question: "Is your friend eating a sandwich?", answer: "No, he isn't eating a sandwich." }
  ]
};

// Module 29: Present Continuous – Questions
const MODULE_29_DATA = {
  title: "Module 29: Present Continuous – Questions",
  description: "Learn how to form Present Continuous tense in question form.",
  intro: `Present Continuous (şimdiki zaman) soru cümlelerinde, şu anda gerçekleşen eylemleri sormak için kullanılır.
🔹 Yapı: Am/Is/Are + özne + fiil-ing
Örn: Are you watching TV? / Is she working? / What are they doing?
🔹 Kısa cevaplar:
Yes, I am. / No, I'm not.
Yes, she is. / No, she isn't.
Yes, they are. / No, they aren't.`,
  tip: "Use short answers with Yes/No questions in Present Continuous",
  
  table: [
    { question: "Are you + verb-ing?", example: "Are you studying?" },
    { question: "Is he/she/it + verb-ing?", example: "Is she cooking?" },
    { question: "What + be + subject + verb-ing?", example: "What are they doing?" }
  ],
  
  listeningExamples: [
    "Are you watching TV?",
    "Is she working?",
    "What are they doing?"
  ],
  
  speakingPractice: [
    { question: "Are you studying now?", answer: "Yes, I am." },
    { question: "Is she cooking dinner?", answer: "Yes, she is." },
    { question: "Are they playing football?", answer: "No, they aren't." },
    { question: "Is he sleeping?", answer: "Yes, he is." },
    { question: "Are you watching TV?", answer: "No, I'm not." },
    { question: "Is your mother cleaning the house?", answer: "Yes, she is." },
    { question: "Are your friends listening to music?", answer: "Yes, they are." },
    { question: "Is your brother reading a book?", answer: "No, he isn't." },
    { question: "Are the children drawing?", answer: "Yes, they are." },
    { question: "Is the dog barking?", answer: "Yes, it is." },
    { question: "Are you eating lunch?", answer: "Yes, I am." },
    { question: "Is your teacher talking?", answer: "Yes, she is." },
    { question: "Are the students writing?", answer: "Yes, they are." },
    { question: "Is your sister doing her homework?", answer: "Yes, she is." },
    { question: "Are you using your phone?", answer: "Yes, I am." },
    { question: "Is he wearing a hat?", answer: "No, he isn't." },
    { question: "Are you drinking coffee?", answer: "No, I'm not." },
    { question: "Is she watching a movie?", answer: "Yes, she is." },
    { question: "Are your parents working?", answer: "Yes, they are." },
    { question: "Is the baby crying?", answer: "No, the baby is sleeping." },
    { question: "What are you doing?", answer: "I'm doing my homework." },
    { question: "What is she doing?", answer: "She is brushing her hair." },
    { question: "What are they doing?", answer: "They are playing a game." },
    { question: "What is your dad doing?", answer: "He is fixing the car." },
    { question: "What is your friend doing?", answer: "He is walking to school." },
    { question: "What are you wearing?", answer: "I'm wearing a white shirt." },
    { question: "What is the teacher doing?", answer: "She is writing on the board." },
    { question: "What are the boys doing?", answer: "They are playing basketball." },
    { question: "What is your sister doing?", answer: "She is reading a magazine." },
    { question: "What are you eating?", answer: "I'm eating a banana." },
    { question: "What is the cat doing?", answer: "It is sleeping on the sofa." },
    { question: "What are you drinking?", answer: "I'm drinking orange juice." },
    { question: "What is the man doing?", answer: "He is talking on the phone." },
    { question: "What are you thinking about?", answer: "I'm thinking about my weekend." },
    { question: "What is the dog doing?", answer: "It is running in the garden." },
    { question: "What are the children watching?", answer: "They are watching cartoons." },
    { question: "What is your friend wearing?", answer: "She is wearing a red dress." },
    { question: "What are you doing this evening?", answer: "I'm going out with my friends." },
    { question: "What are your classmates doing?", answer: "They are studying for the test." },
    { question: "What is your mom making?", answer: "She is making a cake." }
  ]
};

// Module 30: Present Simple vs Present Continuous
const MODULE_30_DATA = {
  title: "Module 30: Present Simple vs Present Continuous",
  description: "Learn when to use Present Simple (habits, facts) and Present Continuous (actions happening now, temporary situations).",
  intro: `Present Simple → alışkanlıklar, tekrar eden eylemler, genel doğrular için kullanılır.
Örn: I go to school every day. / The sun rises in the east.
Present Continuous → şu anda olan veya geçici durumlar için kullanılır.
Örn: I am studying now. / She is staying with her friend this week.
🔹 Yapı:
Present Simple → Özne + fiil (he/she/it → -s)
Present Continuous → Özne + am/is/are + fiil-ing`,
  tip: "Present Simple = routine/habit/fact | Present Continuous = now/temporary",
  
  table: [
    { tense: "Present Simple", use: "Habits/Facts", example: "I go to school every day." },
    { tense: "Present Continuous", use: "Now/Temporary", example: "I am studying now." }
  ],
  
  listeningExamples: [
    "I go to school every day.",
    "She plays the piano.",
    "I am studying now."
  ],
  
  speakingPractice: [
    { question: "Do you go to school every day?", answer: "Yes, I go to school every day." },
    { question: "Are you going to school right now?", answer: "No, I'm at home now." },
    { question: "Does she play the piano?", answer: "Yes, she plays the piano." },
    { question: "Is she playing the piano now?", answer: "Yes, she is playing the piano." },
    { question: "Do they eat lunch at 12?", answer: "Yes, they eat lunch at 12." },
    { question: "Are they eating lunch now?", answer: "No, they are working." },
    { question: "Does he work on weekends?", answer: "No, he doesn't work on weekends." },
    { question: "Is he working now?", answer: "Yes, he is working in his office." },
    { question: "Do you watch TV in the evenings?", answer: "Yes, I usually watch TV after dinner." },
    { question: "Are you watching TV now?", answer: "No, I'm studying." },
    { question: "Does your mom cook dinner every day?", answer: "Yes, she cooks every evening." },
    { question: "Is your mom cooking dinner now?", answer: "Yes, she is in the kitchen." },
    { question: "Do you study English?", answer: "Yes, I study English three times a week." },
    { question: "Are you studying English now?", answer: "Yes, I am studying it right now." },
    { question: "Does it rain a lot in winter?", answer: "Yes, it rains a lot in winter." },
    { question: "Is it raining now?", answer: "No, it's sunny." },
    { question: "Do you wear glasses?", answer: "Yes, I wear glasses." },
    { question: "Are you wearing your glasses now?", answer: "Yes, I am." },
    { question: "Do they play football on weekends?", answer: "Yes, they always play on Sundays." },
    { question: "Are they playing football now?", answer: "Yes, they are at the park." },
    { question: "Do you take the bus to work?", answer: "Yes, I take the bus every morning." },
    { question: "Are you taking the bus now?", answer: "No, I'm walking." },
    { question: "Does your sister clean her room every week?", answer: "Yes, she cleans it every Saturday." },
    { question: "Is your sister cleaning her room now?", answer: "Yes, she is cleaning it now." },
    { question: "Do you read books?", answer: "Yes, I read books every night." },
    { question: "Are you reading a book now?", answer: "Yes, I'm reading a novel." },
    { question: "Do you drink tea in the morning?", answer: "Yes, I usually drink tea." },
    { question: "Are you drinking tea now?", answer: "No, I'm drinking coffee." },
    { question: "Do your parents work in a hospital?", answer: "Yes, they work as doctors." },
    { question: "Are your parents working now?", answer: "Yes, they are at the hospital." },
    { question: "Do you listen to music often?", answer: "Yes, I listen every day." },
    { question: "Are you listening to music now?", answer: "No, I'm not." },
    { question: "Does she go to the gym?", answer: "Yes, she goes three times a week." },
    { question: "Is she going to the gym now?", answer: "Yes, she is on her way." },
    { question: "Do you do your homework in the evening?", answer: "Yes, I usually do it after dinner." },
    { question: "Are you doing your homework now?", answer: "Yes, I'm doing it." },
    { question: "Does your dad drive to work?", answer: "Yes, he drives every day." },
    { question: "Is your dad driving now?", answer: "Yes, he is on the road." },
    { question: "Do they clean the house on Saturdays?", answer: "Yes, they always do." },
    { question: "Are they cleaning the house now?", answer: "Yes, they are cleaning now." }
  ]
};

// Module 31: Like / Love / Hate + -ing
const MODULE_31_DATA = {
  title: "Module 31: Like / Love / Hate + -ing",
  description: "Learn how to use like / love / hate + verb-ing to express likes and dislikes.",
  intro: `Like, love, hate + verb-ing → sevmek, hoşlanmak, nefret etmek anlamında kullanılır.
Örn:
• I like reading books. (Kitap okumayı severim.)
• She loves cooking. (O yemek yapmayı sever.)
• They hate waking up early. (Onlar erken uyanmaktan nefret eder.)
Olumsuz:
• I don't like doing homework. (Ödev yapmayı sevmem.)
• He doesn't love running. (O koşmayı sevmez.)`,
  tip: "Use verb + -ing after like, love, and hate",
  
  table: [
    { verb: "like", structure: "Subject + like + verb-ing", example: "I like reading books." },
    { verb: "love", structure: "Subject + love + verb-ing", example: "She loves cooking." },
    { verb: "hate", structure: "Subject + hate + verb-ing", example: "They hate waking up early." }
  ],
  
  listeningExamples: [
    "I like reading books.",
    "She loves cooking.",
    "They hate waking up early."
  ],
  
  speakingPractice: [
    { question: "Do you like reading books?", answer: "Yes, I like reading books." },
    { question: "Do you love watching movies?", answer: "Yes, I love watching movies." },
    { question: "Do you hate cleaning your room?", answer: "Yes, I hate cleaning my room." },
    { question: "Does she like playing the piano?", answer: "Yes, she likes playing the piano." },
    { question: "Does he love swimming?", answer: "Yes, he loves swimming." },
    { question: "Do they hate studying?", answer: "Yes, they hate studying." },
    { question: "Do you like cooking?", answer: "Yes, I like cooking." },
    { question: "Do you love dancing?", answer: "No, I don't love dancing." },
    { question: "Do you hate doing homework?", answer: "Yes, I hate doing homework." },
    { question: "Does he like driving?", answer: "Yes, he likes driving." },
    { question: "Does she love singing?", answer: "Yes, she loves singing." },
    { question: "Do you like traveling?", answer: "Yes, I like traveling." },
    { question: "Do they love playing football?", answer: "Yes, they love playing football." },
    { question: "Do you hate waiting in line?", answer: "Yes, I hate waiting in line." },
    { question: "Does your sister like painting?", answer: "Yes, she likes painting." },
    { question: "Does your brother love watching TV?", answer: "Yes, he loves watching TV." },
    { question: "Do you like learning English?", answer: "Yes, I like learning English." },
    { question: "Do your friends like going to the cinema?", answer: "Yes, they like going to the cinema." },
    { question: "Does your mom love gardening?", answer: "Yes, she loves gardening." },
    { question: "Do you hate waking up early?", answer: "Yes, I hate waking up early." },
    { question: "Do you like listening to music?", answer: "Yes, I like listening to music." },
    { question: "Do you love playing games?", answer: "Yes, I love playing games." },
    { question: "Does your teacher like teaching English?", answer: "Yes, she likes teaching English." },
    { question: "Do you hate doing the dishes?", answer: "Yes, I hate doing the dishes." },
    { question: "Do you like taking photos?", answer: "Yes, I like taking photos." },
    { question: "Does he love playing basketball?", answer: "Yes, he loves playing basketball." },
    { question: "Do you like writing stories?", answer: "Yes, I like writing stories." },
    { question: "Do your parents love walking in the park?", answer: "Yes, they love walking in the park." },
    { question: "Do you hate studying grammar?", answer: "No, I don't hate studying grammar." },
    { question: "Does she like talking on the phone?", answer: "Yes, she likes talking on the phone." },
    { question: "Do you love eating pizza?", answer: "Yes, I love eating pizza." },
    { question: "Do they hate running?", answer: "Yes, they hate running." },
    { question: "Does your brother like playing computer games?", answer: "Yes, he likes playing computer games." },
    { question: "Do you like riding a bike?", answer: "Yes, I like riding a bike." },
    { question: "Do you hate cleaning the bathroom?", answer: "Yes, I hate cleaning the bathroom." },
    { question: "Does your dad love fixing things?", answer: "Yes, he loves fixing things." },
    { question: "Do you like watching cartoons?", answer: "Yes, I like watching cartoons." },
    { question: "Does she hate doing housework?", answer: "Yes, she hates doing housework." },
    { question: "Do your friends like eating out?", answer: "Yes, they like eating out." },
    { question: "Do you love going to the beach?", answer: "Yes, I love going to the beach." }
  ]
};

// Module 32: Demonstratives in Sentences
const MODULE_32_DATA = {
  title: "Module 32: Demonstratives in Sentences",
  description: "Learn to use demonstratives (this, that, these, those) correctly.",
  intro: `Demonstratives (işaret zamirleri) belirli kişi/nesneleri işaret etmek için kullanılır.
🔹 This → tekil, yakın: This is my pen.
🔹 That → tekil, uzak: That is your book.
🔹 These → çoğul, yakın: These are my friends.
🔹 Those → çoğul, uzak: Those are their shoes.
Yakın için → this / these
Uzak için → that / those`,
  tip: "This/these for near, that/those for far",
  
  table: [
    { demonstrative: "This", use: "Singular, near", example: "This is my phone." },
    { demonstrative: "That", use: "Singular, far", example: "That is my car." },
    { demonstrative: "These", use: "Plural, near", example: "These are my pencils." },
    { demonstrative: "Those", use: "Plural, far", example: "Those are my books." }
  ],
  
  listeningExamples: [
    "This is my bag.",
    "That is your house.",
    "These are my classmates."
  ],
  
  speakingPractice: [
    { question: "What is this?", answer: "This is my phone." },
    { question: "What is that?", answer: "That is a mountain." },
    { question: "Who are these?", answer: "These are my classmates." },
    { question: "Who are those?", answer: "Those are my neighbors." },
    { question: "Is this your bag?", answer: "Yes, this is my bag." },
    { question: "Is that your car?", answer: "No, that is my father's car." },
    { question: "Are these your shoes?", answer: "Yes, these are my shoes." },
    { question: "Are those your books?", answer: "No, those are Sarah's books." },
    { question: "What are these?", answer: "These are my pencils." },
    { question: "What are those?", answer: "Those are clouds." },
    { question: "Is this your teacher?", answer: "Yes, this is my English teacher." },
    { question: "Is that your house?", answer: "Yes, that is my house." },
    { question: "Are these your brothers?", answer: "Yes, these are my brothers." },
    { question: "Are those your dogs?", answer: "Yes, those are my dogs." },
    { question: "What is this sound?", answer: "This is the alarm." },
    { question: "What is that noise?", answer: "That is a train." },
    { question: "Who is this?", answer: "This is my friend Anna." },
    { question: "Who is that?", answer: "That is our neighbor." },
    { question: "Whose is this?", answer: "This is mine." },
    { question: "Whose is that?", answer: "That is his." },
    { question: "Whose are these?", answer: "These are ours." },
    { question: "Whose are those?", answer: "Those are theirs." },
    { question: "Do you like this shirt?", answer: "Yes, I like this shirt." },
    { question: "Do you want that hat?", answer: "No, I don't want that hat." },
    { question: "Are these your pens?", answer: "Yes, these are my pens." },
    { question: "Are those your jackets?", answer: "No, those are not mine." },
    { question: "What color is this car?", answer: "This car is red." },
    { question: "What color is that bike?", answer: "That bike is blue." },
    { question: "Are these apples fresh?", answer: "Yes, these apples are fresh." },
    { question: "Are those bananas ripe?", answer: "No, those bananas are not ripe." },
    { question: "Is this your seat?", answer: "Yes, this is my seat." },
    { question: "Is that your desk?", answer: "No, that is Tom's desk." },
    { question: "Are these your glasses?", answer: "Yes, these are my glasses." },
    { question: "Are those your children?", answer: "Yes, those are my children." },
    { question: "What's this?", answer: "This is a gift for you." },
    { question: "What's that?", answer: "That is a plane in the sky." },
    { question: "What are these?", answer: "These are my keys." },
    { question: "What are those?", answer: "Those are old coins." },
    { question: "Can I take this?", answer: "Yes, you can take this." },
    { question: "Can you give me that?", answer: "Sure, I'll give you that." }
  ]
};

// Module 33: Whose / Possessive 's
const MODULE_33_DATA = {
  title: "Module 33: Whose / Possessive 's",
  description: "Learn to use whose to ask about ownership and possessive 's to show possession.",
  intro: `Whose (kimin) sahipliği sormak için kullanılır.
İngilizce'de 's eklenerek bir şeye kimin ait olduğu gösterilir.
Örn: Whose book is this? → It's Anna's book.
That is the teacher's pen. → Bu öğretmenin kalemi.`,
  tip: "Use whose to ask about possession, use 's to show ownership",
  
  table: [
    { form: "Whose + noun", use: "Ask about possession", example: "Whose car is this?" },
    { form: "Noun + 's", use: "Show possession", example: "This is my friend's house." }
  ],
  
  listeningExamples: [
    "Whose shoes are these?",
    "This is my sister's bag.",
    "That's Jenny's hat."
  ],
  
  speakingPractice: [
    { question: "Whose bag is this?", answer: "It's my sister's bag." },
    { question: "Whose phone is ringing?", answer: "It's John's phone." },
    { question: "Whose car is in the driveway?", answer: "That's my neighbor's car." },
    { question: "Whose house is this?", answer: "It's my uncle's house." },
    { question: "Whose jacket is on the chair?", answer: "It's Sarah's jacket." },
    { question: "Whose books are these?", answer: "They're the teacher's books." },
    { question: "Whose dog is barking?", answer: "It's our friend's dog." },
    { question: "Whose pen is this?", answer: "It's Mark's pen." },
    { question: "Whose children are playing outside?", answer: "They're the Smiths' children." },
    { question: "Whose bike is that?", answer: "It's my brother's bike." },
    { question: "Is this your friend's notebook?", answer: "Yes, it's my friend's." },
    { question: "Whose hat is on the table?", answer: "That's Jenny's hat." },
    { question: "Whose laptop is this?", answer: "It's my father's laptop." },
    { question: "Whose shoes are those?", answer: "They're my sister's shoes." },
    { question: "Whose keys are on the desk?", answer: "They're my teacher's keys." },
    { question: "Whose idea was this?", answer: "It was Tom's idea." },
    { question: "Whose photos are in the album?", answer: "They're my grandma's photos." },
    { question: "Whose cup is this?", answer: "It's my friend's cup." },
    { question: "Whose parents are those?", answer: "They're Ali's parents." },
    { question: "Whose phone is on the bed?", answer: "It's Sarah's phone." },
    { question: "Is this your teacher's book?", answer: "Yes, it's hers." },
    { question: "Is that your father's car?", answer: "Yes, that's his car." },
    { question: "Is this the cat's toy?", answer: "Yes, it's the cat's." },
    { question: "Is that your sister's dress?", answer: "Yes, that's her dress." },
    { question: "Are these your parents' bags?", answer: "Yes, they are." },
    { question: "Are those the children's toys?", answer: "Yes, they are." },
    { question: "Whose wallet is this?", answer: "It's my friend's wallet." },
    { question: "Whose gloves are these?", answer: "They're my dad's gloves." },
    { question: "Whose birthday is it today?", answer: "It's Emma's birthday." },
    { question: "Whose homework is on the desk?", answer: "It's David's homework." },
    { question: "Whose car keys are these?", answer: "They're my mom's car keys." },
    { question: "Whose umbrella is that?", answer: "That's my aunt's umbrella." },
    { question: "Whose voice is that?", answer: "That's my cousin's voice." },
    { question: "Whose computer are you using?", answer: "I'm using my brother's." },
    { question: "Whose sandwich is this?", answer: "It's Sam's sandwich." },
    { question: "Whose game is he playing?", answer: "He's playing Paul's game." },
    { question: "Whose desk is near the window?", answer: "That's the manager's desk." },
    { question: "Whose water bottle is this?", answer: "It's my coach's bottle." },
    { question: "Whose job is it to clean the board?", answer: "It's the student's job." },
    { question: "Whose car is parked outside?", answer: "It's my neighbor's car." }
  ]
};

// Module 34: Question Words (Who, What, Where, When, Why, How)
const MODULE_34_DATA = {
  title: "Module 34: Question Words (Who, What, Where, When, Why, How)",
  description: "Learn common question words and how to form basic questions using them.",
  intro: `İngilizce'de soru kelimeleri bilgi almak için kullanılır:
• Who → kişi (Who is your teacher?)
• What → şey/bilgi (What is your name?)
• Where → yer (Where do you live?)
• When → zaman (When is your birthday?)
• Why → sebep (Why are you late?)
• How → nasıl/şekil (How are you?)`,
  tip: "Question word + auxiliary verb + subject + main verb",
  
  table: [
    { word: "Who", asks: "Person", example: "Who is your best friend?" },
    { word: "What", asks: "Thing/Information", example: "What is your favorite color?" },
    { word: "Where", asks: "Place", example: "Where do you live?" },
    { word: "When", asks: "Time", example: "When is your birthday?" },
    { word: "Why", asks: "Reason", example: "Why are you sad?" },
    { word: "How", asks: "Manner/Way", example: "How are you?" }
  ],
  
  listeningExamples: [
    "Who is your best friend?",
    "What is your favorite color?",
    "Where do you live?"
  ],
  
  speakingPractice: [
    { question: "Who is your best friend?", answer: "My best friend is Ayşe." },
    { question: "What is your favorite color?", answer: "My favorite color is blue." },
    { question: "Where do you live?", answer: "I live in Istanbul." },
    { question: "When is your birthday?", answer: "My birthday is in July." },
    { question: "Why are you sad?", answer: "Because I lost my keys." },
    { question: "How are you?", answer: "I'm fine, thank you." },
    { question: "Who is your English teacher?", answer: "Mr. Can is my English teacher." },
    { question: "What do you like to eat?", answer: "I like to eat pasta." },
    { question: "Where is your school?", answer: "My school is near the park." },
    { question: "When do you get up?", answer: "I get up at 7 o'clock." },
    { question: "Why do you study English?", answer: "Because I want to travel." },
    { question: "How do you go to school?", answer: "I go to school by bus." },
    { question: "Who lives in this house?", answer: "My grandparents live in this house." },
    { question: "What is your favorite sport?", answer: "My favorite sport is football." },
    { question: "Where do you go on weekends?", answer: "I go to the shopping mall." },
    { question: "When do you do your homework?", answer: "I do my homework in the evening." },
    { question: "Why is he angry?", answer: "Because he missed the bus." },
    { question: "How is the weather today?", answer: "It's sunny." },
    { question: "Who is that woman?", answer: "She is my aunt." },
    { question: "What is your hobby?", answer: "My hobby is painting." },
    { question: "Where is your phone?", answer: "It's on the table." },
    { question: "When is the meeting?", answer: "The meeting is at 2 p.m." },
    { question: "Why are they late?", answer: "Because there was traffic." },
    { question: "How old are you?", answer: "I'm 10 years old." },
    { question: "Who are they?", answer: "They are my cousins." },
    { question: "What time is it?", answer: "It's 5 o'clock." },
    { question: "Where are you from?", answer: "I'm from Turkey." },
    { question: "When do you go to bed?", answer: "I go to bed at 10." },
    { question: "Why is she crying?", answer: "Because she is tired." },
    { question: "How do you feel?", answer: "I feel great." },
    { question: "Who do you live with?", answer: "I live with my family." },
    { question: "What are you doing?", answer: "I'm reading a book." },
    { question: "Where is your backpack?", answer: "It's in my room." },
    { question: "When is the exam?", answer: "The exam is next Monday." },
    { question: "Why do you like summer?", answer: "Because I love swimming." },
    { question: "How do you spell your name?", answer: "C-A-G-A-T-A-Y." },
    { question: "Who is calling you?", answer: "My friend is calling me." },
    { question: "What do you want to do?", answer: "I want to play a game." },
    { question: "Where are your keys?", answer: "They are on the chair." },
    { question: "How do you make tea?", answer: "I boil water and add a tea bag." }
  ]
};

// Module 35: Ordinal Numbers and Dates
const MODULE_35_DATA = {
  title: "Module 35: Ordinal Numbers and Dates",
  description: "Learn ordinal numbers and how to use them to describe order, position, and dates.",
  intro: `Ordinal numbers (sıra sayıları) bir şeyin sırasını belirtmek için kullanılır: first (birinci), second (ikinci), third (üçüncü) …
Tarihlerde de ordinal numbers kullanılır: January 1st, February 14th.
Soru yapıları:
• What's the date today? → It's May 5th.
• When is your birthday? → It's on the 12th of June.`,
  tip: "Use ordinal numbers for dates and positions",
  
  table: [
    { number: "1st", ordinal: "first", example: "Today is the first of September." },
    { number: "2nd", ordinal: "second", example: "Monday is the second day." },
    { number: "3rd", ordinal: "third", example: "March is the third month." },
    { number: "4th", ordinal: "fourth", example: "Thursday is the fourth day." }
  ],
  
  listeningExamples: [
    "Today is the first of September.",
    "My birthday is on the twenty-second of July.",
    "October is the tenth month of the year."
  ],
  
  speakingPractice: [
    { question: "What's the date today?", answer: "It's the first of September." },
    { question: "When is your birthday?", answer: "My birthday is on the twenty-second of July." },
    { question: "What's the first month of the year?", answer: "January is the first month." },
    { question: "What's the second day of the week?", answer: "Monday is the second day." },
    { question: "When is New Year's Day?", answer: "It's on the first of January." },
    { question: "What comes after the third?", answer: "The fourth comes after the third." },
    { question: "When is Christmas?", answer: "It's on the twenty-fifth of December." },
    { question: "What is the tenth month of the year?", answer: "October is the tenth month." },
    { question: "What day is the national holiday?", answer: "It's on the twenty-ninth of October." },
    { question: "What is the fifth day of the week?", answer: "Thursday is the fifth day." },
    { question: "What is your favorite date?", answer: "My favorite date is the fourteenth of February." },
    { question: "When is Valentine's Day?", answer: "It's on the fourteenth of February." },
    { question: "What is the last month of the year?", answer: "December is the last month." },
    { question: "When is Republic Day in Turkey?", answer: "It's on the twenty-ninth of October." },
    { question: "What's the date of the school trip?", answer: "It's on the fifteenth of May." },
    { question: "What's the third month of the year?", answer: "March is the third month." },
    { question: "When is your exam?", answer: "It's on the sixth of November." },
    { question: "What is the seventh day of the week?", answer: "Sunday is the seventh day." },
    { question: "What's today's date?", answer: "Today is the eighth of August." },
    { question: "What's the date tomorrow?", answer: "It will be the ninth of August." },
    { question: "What is the second month of the year?", answer: "February is the second month." },
    { question: "When is Independence Day in the USA?", answer: "It's on the fourth of July." },
    { question: "What comes before the tenth?", answer: "The ninth comes before the tenth." },
    { question: "When is your mother's birthday?", answer: "It's on the thirtieth of March." },
    { question: "When is the test?", answer: "It's on the seventeenth of April." },
    { question: "What's the sixth month of the year?", answer: "June is the sixth month." },
    { question: "When is your teacher's birthday?", answer: "It's on the third of January." },
    { question: "What's the date of the party?", answer: "It's on the twenty-first of June." },
    { question: "What is the eleventh month of the year?", answer: "November is the eleventh month." },
    { question: "When is the concert?", answer: "It's on the twenty-fourth of September." },
    { question: "What is the fourth month of the year?", answer: "April is the fourth month." },
    { question: "What day is it today?", answer: "It's the twelfth of October." },
    { question: "What is the ninth month of the year?", answer: "September is the ninth month." },
    { question: "When is the dentist appointment?", answer: "It's on the twenty-sixth of August." },
    { question: "What comes after the first?", answer: "The second comes after the first." },
    { question: "What is the thirteenth day of the month?", answer: "It's the thirteenth." },
    { question: "When is the next holiday?", answer: "It's on the twenty-eighth of April." },
    { question: "What's the date of the wedding?", answer: "It's on the sixteenth of July." },
    { question: "What's the date next Monday?", answer: "It's the nineteenth of August." },
    { question: "What's the eighth month of the year?", answer: "August is the eighth month." }
  ]
};

// Module 36: Talking about Time (o'clock, half past, quarter to)
const MODULE_36_DATA = {
  title: "Module 36: Talking about Time (o'clock, half past, quarter to)",
  description: "Learn to tell the time using o'clock, half past, quarter past, and quarter to.",
  intro: `İngilizcede zamanı söylemek için şu ifadeler kullanılır:
• o'clock → tam saat (It's 3 o'clock = Saat 3)
• half past → yarım geçe (It's half past 4 = Saat 4:30)
• quarter past → çeyrek geçe (It's quarter past 7 = Saat 7:15)
• quarter to → çeyrek kala (It's quarter to 9 = Saat 8:45)
Soru örnekleri:
• What time is it? → Saat kaç?
• When does the class start? → Ders ne zaman başlıyor?`,
  tip: "Use o'clock for exact hours, half past for 30 minutes, quarter past/to for 15 minutes",
  
  table: [
    { time: "3:00", expression: "three o'clock", example: "It's 3 o'clock." },
    { time: "4:30", expression: "half past four", example: "It's half past 4." },
    { time: "7:15", expression: "quarter past seven", example: "It's quarter past 7." },
    { time: "8:45", expression: "quarter to nine", example: "It's quarter to 9." }
  ],
  
  listeningExamples: [
    "It's 3 o'clock.",
    "It's half past 4.",
    "It's quarter past 7."
  ],
  
  speakingPractice: [
    { question: "What time is it?", answer: "It's 3 o'clock." },
    { question: "What time is it now?", answer: "It's half past 4." },
    { question: "What time do you get up?", answer: "I get up at 7 o'clock." },
    { question: "What time do you go to bed?", answer: "I go to bed at 10 o'clock." },
    { question: "What time is your English class?", answer: "It's at quarter past 9." },
    { question: "When do you have breakfast?", answer: "I have breakfast at 8 o'clock." },
    { question: "What time is lunch?", answer: "Lunch is at half past 12." },
    { question: "What time is dinner?", answer: "Dinner is at quarter to 8." },
    { question: "Is it 5 o'clock?", answer: "No, it's quarter past 5." },
    { question: "What time do you leave home?", answer: "I leave home at 8 o'clock." },
    { question: "What time does the film start?", answer: "It starts at 6 o'clock." },
    { question: "When does school finish?", answer: "School finishes at half past 3." },
    { question: "What time do you start work?", answer: "I start work at 9 o'clock." },
    { question: "When is your appointment?", answer: "It's at quarter to 2." },
    { question: "What time is the meeting?", answer: "It's at quarter past 11." },
    { question: "Is it half past 2?", answer: "No, it's quarter to 3." },
    { question: "What time is your favorite TV show?", answer: "It's at 7 o'clock." },
    { question: "Do you wake up at 6 o'clock?", answer: "No, I wake up at half past 6." },
    { question: "Is the class at quarter to 10?", answer: "Yes, it is." },
    { question: "What time do you go shopping?", answer: "I go shopping at 5 o'clock." },
    { question: "What time is your piano lesson?", answer: "It's at quarter past 4." },
    { question: "When do you go running?", answer: "I go running at 6 o'clock." },
    { question: "Is it 9 o'clock now?", answer: "No, it's half past 9." },
    { question: "What time is your break?", answer: "It's at 10 o'clock." },
    { question: "What time does the bus arrive?", answer: "It arrives at quarter to 1." },
    { question: "When is your birthday party?", answer: "It's at 3 o'clock." },
    { question: "What time do you get home?", answer: "I get home at 4 o'clock." },
    { question: "Do you go to school at 7?", answer: "No, I go at half past 7." },
    { question: "What time is your doctor's appointment?", answer: "It's at quarter past 2." },
    { question: "Is lunch at quarter past 1?", answer: "Yes, it is." },
    { question: "When do you watch TV?", answer: "I watch TV at 8 o'clock." },
    { question: "What time does the game start?", answer: "It starts at half past 6." },
    { question: "What time do you study English?", answer: "I study at quarter to 5." },
    { question: "Is your train at 10 o'clock?", answer: "No, it's at quarter past 10." },
    { question: "When do you do your homework?", answer: "I do it at 6 o'clock." },
    { question: "What time do you eat breakfast?", answer: "I eat at 7 o'clock." },
    { question: "What time do you call your friend?", answer: "I call her at half past 8." },
    { question: "Is it quarter to 7 now?", answer: "Yes, it is." },
    { question: "What time do you go to the gym?", answer: "I go at quarter past 6." },
    { question: "When is the class over?", answer: "It's over at 12 o'clock." }
  ]
};

// Module 37: Comparatives (-er / more)
const MODULE_37_DATA = {
  title: "Module 37: Comparatives (-er / more)",
  description: "Learn how to form and use comparative adjectives to compare people, animals, and things.",
  intro: `Comparatives (karşılaştırma sıfatları) iki kişi, hayvan ya da nesneyi karşılaştırmak için kullanılır.
🔹 Kısa sıfatlar (1 hece veya -y ile biten 2 heceliler): sıfat + -er → tall → taller, easy → easier.
🔹 Uzun sıfatlar (2+ hece, -y ile bitmeyen): more + sıfat → more beautiful, more expensive.
Örn: My house is bigger than yours. / This book is more interesting than that one.`,
  tip: "Short adjectives add -er, long adjectives use more",
  
  table: [
    { type: "Short adjectives", rule: "adjective + -er + than", example: "She is taller than me." },
    { type: "Long adjectives", rule: "more + adjective + than", example: "This book is more interesting." }
  ],
  
  listeningExamples: [
    "My house is bigger than yours.",
    "English is easier than Chinese.",
    "A car is more expensive than a bicycle."
  ],
  
  speakingPractice: [
    { question: "Who is taller, you or your friend?", answer: "My friend is taller than me." },
    { question: "Is your house bigger than your school?", answer: "No, my school is bigger than my house." },
    { question: "Is English easier than Chinese?", answer: "Yes, English is easier than Chinese." },
    { question: "Which is more expensive, a car or a bicycle?", answer: "A car is more expensive than a bicycle." },
    { question: "Who is funnier, your dad or your mom?", answer: "My dad is funnier than my mom." },
    { question: "Is summer hotter than winter?", answer: "Yes, summer is hotter than winter." },
    { question: "Which is more comfortable, a sofa or a chair?", answer: "A sofa is more comfortable than a chair." },
    { question: "Are cats quieter than dogs?", answer: "Yes, cats are quieter than dogs." },
    { question: "Is a plane faster than a train?", answer: "Yes, a plane is faster than a train." },
    { question: "Who is older, you or your brother?", answer: "My brother is older than me." },
    { question: "Is your bag heavier than mine?", answer: "Yes, my bag is heavier." },
    { question: "Is football more popular than volleyball?", answer: "Yes, football is more popular." },
    { question: "Is chocolate sweeter than lemon?", answer: "Yes, chocolate is sweeter." },
    { question: "Is a lion more dangerous than a cat?", answer: "Yes, a lion is more dangerous." },
    { question: "Is your phone newer than mine?", answer: "No, my phone is older." },
    { question: "Is your town bigger than Istanbul?", answer: "No, Istanbul is bigger." },
    { question: "Which is more interesting, history or math?", answer: "History is more interesting." },
    { question: "Is your room cleaner than your brother's?", answer: "Yes, my room is cleaner." },
    { question: "Is running more tiring than walking?", answer: "Yes, running is more tiring." },
    { question: "Is this movie longer than the last one?", answer: "Yes, it's longer." },
    { question: "Is English more useful than Latin?", answer: "Yes, it's more useful." },
    { question: "Is your laptop lighter than your friend's?", answer: "Yes, it's lighter." },
    { question: "Who is younger, you or your cousin?", answer: "I'm younger than my cousin." },
    { question: "Which is more exciting, traveling or staying home?", answer: "Traveling is more exciting." },
    { question: "Is this chair more comfortable than that one?", answer: "Yes, it's more comfortable." },
    { question: "Is your dog noisier than your neighbor's dog?", answer: "Yes, he's noisier." },
    { question: "Which is healthier, fruit or candy?", answer: "Fruit is healthier." },
    { question: "Is this math problem harder than the last one?", answer: "Yes, it's harder." },
    { question: "Is gold more valuable than silver?", answer: "Yes, gold is more valuable." },
    { question: "Are you busier this week than last week?", answer: "Yes, I'm busier." },
    { question: "Is this shirt cheaper than that one?", answer: "Yes, it's cheaper." },
    { question: "Is your car faster than your friend's?", answer: "No, his car is faster." },
    { question: "Is your street quieter than the main road?", answer: "Yes, it is." },
    { question: "Is it colder today than yesterday?", answer: "Yes, it's colder." },
    { question: "Is reading more relaxing than working?", answer: "Yes, it is." },
    { question: "Is she more intelligent than her classmates?", answer: "Yes, she is." },
    { question: "Is this exam easier than the last one?", answer: "Yes, it is." },
    { question: "Is your job more stressful than mine?", answer: "Yes, it is." },
    { question: "Is this building taller than the one next to it?", answer: "Yes, it is." },
    { question: "Is it more difficult to learn German than English?", answer: "Yes, it is." }
  ]
};

// Module 38: Superlatives (the most, the best)
const MODULE_38_DATA = {
  title: "Module 38: Superlatives (the most, the best)",
  description: "Learn how to form and use superlative adjectives to describe the extreme degree of quality.",
  intro: `Superlatives (üstünlük derecesi) bir grup içindeki en üstün özelliği belirtmek için kullanılır.
🔹 Kısa sıfatlar: the + sıfat + -est → the tallest, the biggest
🔹 Uzun sıfatlar: the + most + sıfat → the most beautiful, the most expensive
🔹 Düzensiz sıfatlar: good → the best, bad → the worst, far → the farthest
Örn: She is the smartest student in the class. / This is the most interesting book I've ever read.`,
  tip: "Use 'the' before superlatives. Short adjectives add -est, long adjectives use 'most'",
  
  table: [
    { type: "Short adjectives", rule: "the + adjective + -est", example: "She is the tallest girl in class." },
    { type: "Long adjectives", rule: "the + most + adjective", example: "This is the most beautiful place." },
    { type: "Irregular adjectives", rule: "Special forms", example: "He is the best player on the team." }
  ],
  
  listeningExamples: [
    "This is the biggest house in the neighborhood.",
    "She is the most talented singer in the competition.",
    "Mount Everest is the highest mountain in the world."
  ],
  
  speakingPractice: [
    { question: "What's the tallest building in your city?", answer: "The tallest building is the Central Tower." },
    { question: "Who is the smartest student in your class?", answer: "Emma is the smartest student." },
    { question: "What's the most expensive car you've seen?", answer: "The most expensive car is a Ferrari." },
    { question: "Which is the best restaurant in town?", answer: "The Italian restaurant is the best." },
    { question: "What's the hottest month of the year?", answer: "August is the hottest month." },
    { question: "Who is the youngest person in your family?", answer: "My baby brother is the youngest." },
    { question: "What's the most difficult subject for you?", answer: "Mathematics is the most difficult." },
    { question: "Which is the fastest animal in the world?", answer: "The cheetah is the fastest animal." },
    { question: "What's the coldest place you've visited?", answer: "Alaska was the coldest place." },
    { question: "Who is the funniest person you know?", answer: "My uncle is the funniest person." },
    { question: "What's the longest river in the world?", answer: "The Nile is the longest river." },
    { question: "Which is the most popular sport in your country?", answer: "Football is the most popular sport." },
    { question: "What's the smallest room in your house?", answer: "The bathroom is the smallest room." },
    { question: "Who is the oldest teacher at your school?", answer: "Mr. Johnson is the oldest teacher." },
    { question: "What's the most interesting movie you've watched?", answer: "Inception was the most interesting." },
    { question: "Which is the cheapest way to travel?", answer: "The bus is the cheapest way." },
    { question: "What's the most beautiful city you've seen?", answer: "Paris is the most beautiful city." },
    { question: "Who is the strongest person you know?", answer: "My father is the strongest." },
    { question: "What's the worst food you've tasted?", answer: "Spinach is the worst food for me." },
    { question: "Which is the most comfortable chair?", answer: "The leather chair is the most comfortable." },
    { question: "What's the hardest language to learn?", answer: "Chinese is the hardest language." },
    { question: "Who is the kindest person in your neighborhood?", answer: "Mrs. Smith is the kindest." },
    { question: "What's the most exciting experience you've had?", answer: "Bungee jumping was the most exciting." },
    { question: "Which is the safest place in your city?", answer: "The park is the safest place." },
    { question: "What's the most useful app on your phone?", answer: "The map app is the most useful." },
    { question: "Who is the most famous person from your country?", answer: "The president is the most famous." },
    { question: "What's the busiest day of the week for you?", answer: "Monday is the busiest day." },
    { question: "Which is the most dangerous animal?", answer: "The lion is the most dangerous." },
    { question: "What's the heaviest thing you can lift?", answer: "A 20-kilogram box is the heaviest." },
    { question: "Who is the most creative person you know?", answer: "My art teacher is the most creative." },
    { question: "What's the most relaxing activity for you?", answer: "Reading is the most relaxing." },
    { question: "Which is the noisiest place in your town?", answer: "The market is the noisiest place." },
    { question: "What's the sweetest fruit you like?", answer: "Mango is the sweetest fruit." },
    { question: "Who is the most helpful person in your life?", answer: "My mother is the most helpful." },
    { question: "What's the most boring subject at school?", answer: "History is the most boring." },
    { question: "Which is the brightest star in the sky?", answer: "The Sun is the brightest star." },
    { question: "What's the most crowded place you've been to?", answer: "The shopping mall was the most crowded." },
    { question: "Who is the most patient teacher you've had?", answer: "Miss Johnson was the most patient." },
    { question: "What's the most refreshing drink in summer?", answer: "Cold lemonade is the most refreshing." },
    { question: "Which is the most peaceful place you know?", answer: "The library is the most peaceful place." }
  ]
};

// Module 39: Be Going To (Future Plans)
const MODULE_39_DATA = {
  title: "Module 39: Be Going To (Future Plans)",
  description: "Learn how to use \"be going to\" for future plans and intentions.",
  intro: `"Be going to" yapısı gelecekte yapılacak planları ve niyetleri anlatmak için kullanılır.
🔹 Yapı: Özne + am/is/are + going to + fiil
Örn:
• I am going to visit my grandmother. (Büyükannemi ziyaret edeceğim.)
• She is going to study medicine. (O tıp okuyacak.)
• They are going to play football tomorrow. (Onlar yarın futbol oynayacaklar.)
"Be going to" genellikle önceden karar verilen planlar için kullanılır.`,
  tip: "Use 'be going to' for future plans and intentions that were decided before speaking",
  
  table: [
    { form: "Positive", structure: "Subject + am/is/are + going to + verb", example: "I am going to eat. / She is going to study." },
    { form: "Negative", structure: "Subject + am/is/are + not + going to + verb", example: "I'm not going to eat. / He isn't going to study." },
    { form: "Question", structure: "Am/Is/Are + subject + going to + verb?", example: "Are you going to eat? / What are they going to do?" }
  ],
  
  listeningExamples: [
    "I am going to visit my cousin.",
    "She is going to watch a movie.",
    "They are going to travel to Italy."
  ],
  
  speakingPractice: [
    { question: "What are you going to do tomorrow?", answer: "I'm going to visit my cousin." },
    { question: "Are you going to watch a movie tonight?", answer: "Yes, I'm going to watch a comedy." },
    { question: "Is she going to travel next summer?", answer: "Yes, she is going to travel to Italy." },
    { question: "Are they going to play football on Saturday?", answer: "Yes, they are going to play in the park." },
    { question: "What is he going to eat for dinner?", answer: "He's going to eat pizza." },
    { question: "Where are you going to go this weekend?", answer: "I'm going to go to the beach." },
    { question: "Are you going to study tonight?", answer: "Yes, I'm going to study for my exam." },
    { question: "What are you going to buy at the market?", answer: "I'm going to buy vegetables and fruit." },
    { question: "Is your dad going to work tomorrow?", answer: "Yes, he's going to work in the morning." },
    { question: "Are your friends going to come to the party?", answer: "Yes, they're going to arrive at 8." },
    { question: "What are you going to wear to the wedding?", answer: "I'm going to wear a blue dress." },
    { question: "Is your mom going to cook tonight?", answer: "Yes, she's going to make pasta." },
    { question: "Where are they going to stay in Antalya?", answer: "They're going to stay at a hotel." },
    { question: "Are you going to visit your grandparents?", answer: "Yes, I'm going to visit them on Sunday." },
    { question: "What is your brother going to do this evening?", answer: "He's going to play video games." },
    { question: "Are you going to clean your room today?", answer: "Yes, I'm going to clean it after lunch." },
    { question: "What are you going to do this summer?", answer: "I'm going to take an English course." },
    { question: "Is she going to watch TV later?", answer: "Yes, she's going to watch a drama." },
    { question: "Where is your family going to travel?", answer: "We're going to travel to Cappadocia." },
    { question: "Are you going to learn Spanish?", answer: "Yes, I'm going to start next month." },
    { question: "What are you going to do after school?", answer: "I'm going to meet my friends." },
    { question: "Is your sister going to start university?", answer: "Yes, she's going to start in September." },
    { question: "What are you going to eat for lunch?", answer: "I'm going to eat a sandwich." },
    { question: "Are they going to play basketball later?", answer: "Yes, they are." },
    { question: "Are you going to take a holiday this year?", answer: "Yes, I'm going to visit the coast." },
    { question: "Is your teacher going to give homework?", answer: "Yes, she's going to give us a worksheet." },
    { question: "What are your parents going to do on the weekend?", answer: "They're going to visit friends." },
    { question: "Is your friend going to call you tonight?", answer: "Yes, he's going to call me at 9." },
    { question: "Are you going to do your homework?", answer: "Yes, I'm going to do it now." },
    { question: "What is your cousin going to study?", answer: "She's going to study architecture." },
    { question: "Are you going to cook dinner tonight?", answer: "No, I'm going to order food." },
    { question: "Where are you going to go in the holiday?", answer: "I'm going to go to Bursa." },
    { question: "Is he going to come with us?", answer: "Yes, he's going to join us." },
    { question: "What are you going to do this Friday night?", answer: "I'm going to go out with my friends." },
    { question: "Are you going to send an email to your teacher?", answer: "Yes, I'm going to send it tonight." },
    { question: "Is your sister going to join the competition?", answer: "Yes, she is." },
    { question: "What are you going to bring to the picnic?", answer: "I'm going to bring some snacks." },
    { question: "Are they going to move to a new house?", answer: "Yes, they're going to move next month." },
    { question: "Is your friend going to take the exam?", answer: "Yes, he's going to take it next week." },
    { question: "What are you going to do next weekend?", answer: "I'm going to relax at home." }
  ]
};

// Module 40: Would Like / Want
const MODULE_40_DATA = {
  title: "Module 40: Would Like / Want",
  description: "Learn the difference between \"would like\" (polite/formal) and \"want\" (direct/casual).",
  intro: `"Would like" ve "want" istek veya arzuları ifade etmek için kullanılır.
🔹 Would like → daha kibar ve resmî (I would like a coffee.)
🔹 Want → daha doğrudan ve günlük (I want a coffee.)
Yapı:
• I would like + isim/fiil → I would like a coffee. / I would like to go.
• I want + isim/fiil → I want a new phone. / I want to travel.`,
  tip: "Use 'would like' for polite requests and 'want' for direct statements of desire",
  
  table: [
    { form: "Positive", structure: "I would like some tea. / She wants to watch a movie.", example: "I would like some water, please." },
    { form: "Negative", structure: "I wouldn't like fish. / I don't want pizza.", example: "I wouldn't like fish for dinner." },
    { form: "Question", structure: "Would you like a coffee? / What do you want to eat?", example: "Would you like to come with us?" }
  ],
  
  listeningExamples: [
    "I would like some water, please.",
    "She wants to watch a movie.",
    "Would you like to come with us?"
  ],
  
  speakingPractice: [
    { question: "What would you like to eat?", answer: "I would like to eat pasta." },
    { question: "What do you want to drink?", answer: "I want to drink orange juice." },
    { question: "Would you like a cup of tea?", answer: "Yes, I would like a cup of tea." },
    { question: "Do you want some coffee?", answer: "Yes, I want some coffee." },
    { question: "What would she like for dinner?", answer: "She would like some chicken." },
    { question: "What does he want to buy?", answer: "He wants to buy a new phone." },
    { question: "Would you like to come with us?", answer: "Yes, I'd love to." },
    { question: "Do you want to go out tonight?", answer: "Yes, I want to go to the cinema." },
    { question: "Would they like some dessert?", answer: "Yes, they would like some ice cream." },
    { question: "Do you want to play a game?", answer: "Yes, I want to play chess." },
    { question: "Would you like to visit London?", answer: "Yes, I would love to visit London." },
    { question: "Do you want to take a break?", answer: "Yes, I need a break." },
    { question: "What would your friend like to do?", answer: "He would like to go shopping." },
    { question: "Would you like some water?", answer: "Yes, please." },
    { question: "Do you want to watch a movie?", answer: "Yes, I want to watch an action movie." },
    { question: "Would your sister like some cake?", answer: "Yes, she would." },
    { question: "What do you want to do tomorrow?", answer: "I want to relax at home." },
    { question: "What would you like for breakfast?", answer: "I would like eggs and toast." },
    { question: "Would your brother like to join us?", answer: "Yes, he would." },
    { question: "Do you want to listen to music?", answer: "Yes, I do." },
    { question: "Would you like to learn Spanish?", answer: "Yes, I would." },
    { question: "What would they like to order?", answer: "They would like two pizzas." },
    { question: "Do you want to play football later?", answer: "Yes, I want to play." },
    { question: "Would you like to go to the museum?", answer: "Yes, that sounds great." },
    { question: "What does your mother want to eat?", answer: "She wants to eat salad." },
    { question: "Would you like another drink?", answer: "No, thank you." },
    { question: "Do you want to call him now?", answer: "Yes, I want to call him." },
    { question: "What would you like to do this weekend?", answer: "I would like to visit my grandparents." },
    { question: "Would you like to go for a walk?", answer: "Yes, I'd love to." },
    { question: "Do you want to cook dinner together?", answer: "Yes, that's a good idea." },
    { question: "Would your friends like some tea?", answer: "Yes, they would." },
    { question: "What would you like to learn?", answer: "I'd like to learn how to play the guitar." },
    { question: "Would she like to see the movie?", answer: "Yes, she would." },
    { question: "Do you want to try this game?", answer: "Yes, I want to try." },
    { question: "Would you like to sit here?", answer: "Yes, thank you." },
    { question: "What do you want to wear?", answer: "I want to wear something comfortable." },
    { question: "Would you like to stay longer?", answer: "Yes, if possible." },
    { question: "Do you want to eat outside?", answer: "Yes, let's go to the garden." },
    { question: "Would you like to join the club?", answer: "Yes, I would." },
    { question: "What would you like to do after school?", answer: "I'd like to rest and read a book." }
  ]
};

// Module 41: Must / Mustn't (Necessity, Prohibition)
const MODULE_41_DATA = {
  title: "Module 41: Must / Mustn't (Necessity, Prohibition)",
  description: "Learn how to use must to express necessity or strong advice and mustn't to express prohibition.",
  intro: `Must → bir şeyin gerekli olduğunu, yapılması gerektiğini gösterir.
Mustn't → yasak veya yapılmaması gereken bir şeyi gösterir.
🔹 Yapı:
• Subject + must + fiil → You must study.
• Subject + mustn't + fiil → You mustn't smoke.
Örn:
• You must wear a seatbelt. (Emniyet kemeri takmalısın.)
• You mustn't talk during the exam. (Sınavda konuşmamalısın.)`,
  tip: "Use 'must' for strong necessity and 'mustn't' for prohibition (not allowed)",
  
  table: [
    { form: "Positive", structure: "Subject + must + base verb", example: "I must finish my homework." },
    { form: "Negative", structure: "Subject + mustn't + base verb", example: "You mustn't run here." },
    { form: "Question", structure: "Must + subject + base verb?", example: "Must we leave now?" }
  ],
  
  listeningExamples: [
    "You must do your homework.",
    "Students must listen to the teacher.",
    "You mustn't use your phone in class."
  ],
  
  speakingPractice: [
    { question: "What must you do every day?", answer: "I must brush my teeth." },
    { question: "What mustn't you do in the library?", answer: "I mustn't speak loudly." },
    { question: "Must students do their homework?", answer: "Yes, students must do their homework." },
    { question: "Mustn't children play with fire?", answer: "No, they mustn't play with fire." },
    { question: "What must you take to school?", answer: "I must take my books." },
    { question: "What mustn't you forget before an exam?", answer: "I mustn't forget my ID." },
    { question: "Must we wear uniforms?", answer: "Yes, we must wear uniforms." },
    { question: "Mustn't you use your phone in class?", answer: "Yes, I mustn't use my phone." },
    { question: "What must drivers do?", answer: "Drivers must follow the rules." },
    { question: "What mustn't you do in a museum?", answer: "I mustn't touch anything." },
    { question: "Must people pay taxes?", answer: "Yes, people must pay taxes." },
    { question: "What mustn't we do in exams?", answer: "We mustn't cheat." },
    { question: "What must you do if you're sick?", answer: "I must see a doctor." },
    { question: "Must you wear a mask in hospitals?", answer: "Yes, I must wear a mask." },
    { question: "Mustn't you run in the hall?", answer: "Yes, I mustn't run in the hall." },
    { question: "What must we do before bed?", answer: "We must brush our teeth." },
    { question: "Must we bring our homework to class?", answer: "Yes, we must bring it." },
    { question: "What must you do when the teacher speaks?", answer: "I must listen carefully." },
    { question: "Must visitors buy a ticket?", answer: "Yes, they must." },
    { question: "What mustn't children drink?", answer: "They mustn't drink coffee." },
    { question: "Must you speak English in class?", answer: "Yes, I must." },
    { question: "Mustn't people park here?", answer: "Yes, they mustn't park here." },
    { question: "What must you do when you cross the street?", answer: "I must look both ways." },
    { question: "Must you take medicine when you're sick?", answer: "Yes, I must." },
    { question: "What mustn't we do in a cinema?", answer: "We mustn't use our phones." },
    { question: "Must employees come on time?", answer: "Yes, they must." },
    { question: "What must you do when your phone rings in class?", answer: "I must turn it off." },
    { question: "Mustn't you eat in the computer lab?", answer: "Yes, I mustn't eat there." },
    { question: "What must tourists do when they visit a mosque?", answer: "They must dress respectfully." },
    { question: "Must we arrive early to meetings?", answer: "Yes, we must." },
    { question: "What must you do before a trip?", answer: "I must pack my bag." },
    { question: "Must you be quiet in the library?", answer: "Yes, I must." },
    { question: "Mustn't you smoke in public places?", answer: "Yes, I mustn't." },
    { question: "What must you wear in winter?", answer: "I must wear a coat." },
    { question: "Mustn't people feed animals in the zoo?", answer: "Yes, they mustn't." },
    { question: "What must you do before sleeping?", answer: "I must set my alarm." },
    { question: "Must you study for tests?", answer: "Yes, I must." },
    { question: "Mustn't we litter in the park?", answer: "Yes, we mustn't litter." },
    { question: "What must people do in emergencies?", answer: "They must call for help." },
    { question: "Must you do your best in school?", answer: "Yes, I must do my best." }
  ]
};

// Module 42: Have to / Don't Have to (Obligation)
const MODULE_42_DATA = {
  title: "Module 42: Have to / Don't Have to (Obligation)",
  description: "Learn how to express obligation with \"have to\" and lack of necessity with \"don't/doesn't have to\".",
  intro: `"Have to" → bir şeyin gerekli/ zorunlu olduğunu gösterir.
"Don't/Doesn't have to" → bir şeyin gerekli olmadığını, yapılmasına gerek olmadığını gösterir.
🔹 Yapı:
• Subject + have to + fiil → I have to study.
• Subject + don't/doesn't have to + fiil → She doesn't have to work.
Örn:
• I have to go to school every day. (Her gün okula gitmeliyim.)
• She doesn't have to work on Sundays. (Pazar günleri çalışmak zorunda değil.)`,
  tip: "Use 'have to' for obligation and 'don't have to' for lack of necessity (not required)",
  
  table: [
    { form: "Positive", structure: "Subject + have/has to + verb", example: "I have to finish my homework." },
    { form: "Negative", structure: "Subject + don't/doesn't have to + verb", example: "You don't have to come." },
    { form: "Question", structure: "Do/Does + subject + have to + verb?", example: "Do you have to wake up early?" }
  ],
  
  listeningExamples: [
    "I have to study for my exam.",
    "You don't have to wear a tie.",
    "She has to help her mom."
  ],
  
  speakingPractice: [
    { question: "Do you have to go to school today?", answer: "Yes, I have to go to school." },
    { question: "Do you have to do homework every night?", answer: "Yes, I have to do it." },
    { question: "Does she have to wear a uniform?", answer: "Yes, she has to wear a uniform." },
    { question: "Do we have to bring our books?", answer: "Yes, we have to bring them." },
    { question: "Do you have to wake up early?", answer: "Yes, I have to wake up at 6." },
    { question: "Do they have to take the test?", answer: "Yes, they have to take it." },
    { question: "Does he have to cook dinner?", answer: "No, he doesn't have to cook." },
    { question: "Do you have to clean your room?", answer: "Yes, I have to clean it." },
    { question: "Does she have to wash the dishes?", answer: "Yes, she has to wash them." },
    { question: "Do we have to go now?", answer: "No, we don't have to go yet." },
    { question: "Do I have to bring my ID?", answer: "Yes, you have to bring it." },
    { question: "Does your brother have to study?", answer: "Yes, he has to study a lot." },
    { question: "Do you have to work on weekends?", answer: "No, I don't have to work." },
    { question: "Do they have to pay for the tickets?", answer: "Yes, they have to pay." },
    { question: "Do you have to do everything alone?", answer: "No, I don't have to." },
    { question: "Does she have to wake up early tomorrow?", answer: "Yes, she has to wake up at 7." },
    { question: "Do we have to wear masks?", answer: "No, we don't have to anymore." },
    { question: "Do students have to pass the exam?", answer: "Yes, they have to pass it." },
    { question: "Do you have to answer all the questions?", answer: "Yes, I have to answer them." },
    { question: "Does your teacher have to check the homework?", answer: "Yes, she has to check it." },
    { question: "Do you have to buy a new phone?", answer: "No, I don't have to." },
    { question: "Do you have to finish today?", answer: "Yes, I have to finish it today." },
    { question: "Do children have to go to bed early?", answer: "Yes, they have to." },
    { question: "Does he have to work tonight?", answer: "Yes, he has to work late." },
    { question: "Do you have to take a bus?", answer: "Yes, I have to take a bus every day." },
    { question: "Do I have to do this exercise?", answer: "No, you don't have to." },
    { question: "Do we have to pay for the meal?", answer: "Yes, we have to." },
    { question: "Do you have to speak English in class?", answer: "Yes, I have to speak English." },
    { question: "Does your friend have to leave now?", answer: "No, he doesn't have to." },
    { question: "Do you have to call your manager?", answer: "Yes, I have to call her." },
    { question: "Does your sister have to work on Saturday?", answer: "No, she doesn't have to." },
    { question: "Do you have to listen carefully?", answer: "Yes, I have to." },
    { question: "Do students have to follow the rules?", answer: "Yes, they have to follow them." },
    { question: "Do you have to take your medicine?", answer: "Yes, I have to take it every morning." },
    { question: "Does he have to wear a suit?", answer: "Yes, he has to wear it at work." },
    { question: "Do we have to hurry?", answer: "Yes, we have to catch the train." },
    { question: "Do you have to stay late today?", answer: "No, I don't have to." },
    { question: "Does your friend have to clean the kitchen?", answer: "Yes, she has to." },
    { question: "Do they have to come to the meeting?", answer: "Yes, they do." },
    { question: "Do I have to finish this form?", answer: "Yes, you have to." }
  ]
};

// Module 43: Daily Routines Vocabulary
const MODULE_43_DATA = {
  title: "Module 43: Daily Routines Vocabulary",
  description: "Learn common daily routine verbs and activities using Present Simple tense.",
  intro: `Daily routines (günlük rutinler) günlük yaptığımız eylemleri anlatır.
🔹 Örnek fiiller: wake up (uyanmak), brush teeth (diş fırçalamak), have breakfast (kahvaltı yapmak), go to school (okula gitmek), do homework (ödev yapmak), go to bed (yatağa gitmek).
Rutinleri anlatırken Present Simple Tense kullanılır:
• I wake up at 7 o'clock. (Saat 7'de uyanırım.)
• She goes to school at 8. (O saat 8'de okula gider.)
Sıklık zarfları (frequency adverbs):
• always (her zaman), usually (genellikle), often (sık sık), sometimes (bazen), never (asla).
Örn: I usually have breakfast at 8. (Genellikle saat 8'de kahvaltı yaparım.)`,
  tip: "Use Present Simple for daily routines and frequency adverbs to show how often",
  
  table: [
    { structure: "Subject + base verb (Present Simple)", example: "I wake up at 7.", note: "For daily routines" },
    { structure: "Subject + frequency adverb + verb", example: "I usually eat breakfast at 8.", note: "With frequency adverbs" },
    { structure: "For he/she/it: verb + -s", example: "She gets up at 7.", note: "Third person singular" }
  ],
  
  listeningExamples: [
    "I wake up at 7 o'clock.",
    "She brushes her teeth every morning.",
    "They go to school at 8."
  ],
  
  speakingPractice: [
    { question: "What time do you wake up?", answer: "I wake up at 7 o'clock." },
    { question: "Do you brush your teeth every morning?", answer: "Yes, I brush my teeth every morning." },
    { question: "What do you do after you get up?", answer: "I take a shower." },
    { question: "Do you have breakfast every day?", answer: "Yes, I usually have breakfast." },
    { question: "What time do you go to school?", answer: "I go to school at 8." },
    { question: "Do you walk to school or take the bus?", answer: "I take the bus." },
    { question: "When do you get dressed?", answer: "I get dressed after I take a shower." },
    { question: "Do you make your bed in the morning?", answer: "Yes, I make my bed every day." },
    { question: "What do you usually eat for breakfast?", answer: "I usually eat eggs and toast." },
    { question: "Do you go to work every day?", answer: "Yes, I go to work from Monday to Friday." },
    { question: "When do you have lunch?", answer: "I have lunch at 12:30." },
    { question: "Where do you have lunch?", answer: "I usually have lunch at home." },
    { question: "What time do you finish school?", answer: "I finish school at 3:30." },
    { question: "What do you do after school?", answer: "I go home and relax." },
    { question: "Do you take a nap in the afternoon?", answer: "Sometimes I take a nap." },
    { question: "What time do you get home?", answer: "I get home at 4." },
    { question: "Do you help your parents at home?", answer: "Yes, I help with the dishes." },
    { question: "Do you do your homework in the evening?", answer: "Yes, I do my homework after dinner." },
    { question: "When do you have dinner?", answer: "I have dinner at 7 o'clock." },
    { question: "Do you watch TV at night?", answer: "Yes, I watch TV for one hour." },
    { question: "What time do you go to bed?", answer: "I go to bed at 10." },
    { question: "Do you read a book before sleeping?", answer: "Yes, I sometimes read a book." },
    { question: "Do you take a shower in the morning or evening?", answer: "I take a shower in the evening." },
    { question: "Do you check your phone in the morning?", answer: "Yes, I always check my phone." },
    { question: "What time do you usually sleep?", answer: "I usually sleep at 10:30." },
    { question: "Do you eat breakfast on weekends?", answer: "Yes, I love breakfast on weekends." },
    { question: "What do you do before going to bed?", answer: "I brush my teeth." },
    { question: "Do you drink coffee in the morning?", answer: "No, I drink tea." },
    { question: "Do you go to the gym in the morning?", answer: "No, I go in the evening." },
    { question: "Do you listen to music while studying?", answer: "Yes, I sometimes do." },
    { question: "How often do you go shopping?", answer: "I go shopping once a week." },
    { question: "Do you prepare your clothes the night before?", answer: "Yes, I usually do." },
    { question: "Do you iron your clothes?", answer: "No, my mom irons them." },
    { question: "Do you clean your room every day?", answer: "No, I clean it once a week." },
    { question: "Do you talk to your friends after school?", answer: "Yes, I talk to them online." },
    { question: "Do you walk your dog in the morning?", answer: "Yes, I walk my dog at 7." },
    { question: "Do you feed your pet in the evening?", answer: "Yes, I feed my cat at 6." },
    { question: "Do you set an alarm?", answer: "Yes, I set my alarm every night." },
    { question: "Do you stretch or exercise in the morning?", answer: "No, but I want to start." },
    { question: "Do you eat dinner with your family?", answer: "Yes, we always eat together." }
  ]
};

// Module 44: Jobs and Occupations Vocabulary
const MODULE_44_DATA = {
  title: "Module 44: Jobs and Occupations Vocabulary",
  description: "Learn common job and occupation vocabulary and ask questions about professions.",
  intro: `Bu konu yaygın mesleklerle ilgili kelimeleri tanıtır.
Örn: doctor (doktor), nurse (hemşire), teacher (öğretmen), firefighter (itfaiyeci).
Mesleklerle ilgili sorular:
• What do you do? → I'm a teacher. (Sen ne iş yapıyorsun?)
• What does he do? → He's a firefighter. (O ne iş yapıyor?)
• Where does she work? → She works in a hospital. (O nerede çalışıyor?)`,
  tip: "Use 'What do you do?' to ask about someone's job and 'Where do you work?' for workplace",
  
  table: [
    { question: "What do you do?", answer: "I'm a (job).", example: "I'm a teacher." },
    { question: "What does he/she do?", answer: "He/She is a (job).", example: "She's a nurse." },
    { question: "Where does he/she work?", answer: "He/She works in/at (place).", example: "He works in a hospital." }
  ],
  
  listeningExamples: [
    "I'm a doctor.",
    "She's a nurse.",
    "He's a firefighter."
  ],
  
  speakingPractice: [
    { question: "What do you do?", answer: "I'm a teacher." },
    { question: "What does your father do?", answer: "He's a doctor." },
    { question: "What does your mother do?", answer: "She's a nurse." },
    { question: "What does a firefighter do?", answer: "A firefighter puts out fires." },
    { question: "Where does a teacher work?", answer: "A teacher works at a school." },
    { question: "Where does a doctor work?", answer: "A doctor works in a hospital." },
    { question: "What does a pilot do?", answer: "A pilot flies airplanes." },
    { question: "What do chefs do?", answer: "Chefs cook food." },
    { question: "Where does a waiter work?", answer: "A waiter works in a restaurant." },
    { question: "What does an engineer do?", answer: "An engineer designs buildings or machines." },
    { question: "What do you want to be?", answer: "I want to be a police officer." },
    { question: "Is a nurse a hospital worker?", answer: "Yes, a nurse works in a hospital." },
    { question: "What does a driver do?", answer: "A driver drives vehicles." },
    { question: "Where does a dentist work?", answer: "A dentist works in a clinic." },
    { question: "What do artists do?", answer: "Artists paint or draw." },
    { question: "Is a lawyer a job?", answer: "Yes, a lawyer works in law." },
    { question: "What job do you want in the future?", answer: "I want to be an architect." },
    { question: "Where does a farmer work?", answer: "A farmer works on a farm." },
    { question: "What does a mechanic do?", answer: "A mechanic fixes cars." },
    { question: "What does a cleaner do?", answer: "A cleaner cleans buildings." },
    { question: "What does a police officer do?", answer: "A police officer protects people." },
    { question: "Do teachers work in hospitals?", answer: "No, they work in schools." },
    { question: "Does your friend want to be a pilot?", answer: "Yes, he wants to fly planes." },
    { question: "What does a musician do?", answer: "A musician plays music." },
    { question: "Where does an actor work?", answer: "An actor works in films or theatres." },
    { question: "Do you know any engineers?", answer: "Yes, my cousin is an engineer." },
    { question: "What does a scientist do?", answer: "A scientist does experiments and research." },
    { question: "Is a vet a doctor for animals?", answer: "Yes, a vet takes care of animals." },
    { question: "What does a builder do?", answer: "A builder builds houses." },
    { question: "Where does a hairdresser work?", answer: "A hairdresser works in a salon." },
    { question: "What job does your uncle do?", answer: "He is a chef." },
    { question: "What does a taxi driver do?", answer: "A taxi driver takes people to places." },
    { question: "Do police officers wear uniforms?", answer: "Yes, they do." },
    { question: "What does a baker do?", answer: "A baker makes bread and cakes." },
    { question: "Is a programmer a modern job?", answer: "Yes, a programmer writes code." },
    { question: "Where does a receptionist work?", answer: "A receptionist works at the front desk." },
    { question: "Do you want to be a scientist?", answer: "Yes, I want to work in a lab." },
    { question: "What job helps people at the airport?", answer: "An airport worker or a customs officer." },
    { question: "What does a tour guide do?", answer: "A tour guide shows places to visitors." },
    { question: "What does a photographer do?", answer: "A photographer takes pictures." }
  ]
};

// Module 45: Food and Drinks Vocabulary
const MODULE_45_DATA = {
  title: "Module 45: Food and Drinks Vocabulary",
  description: "Learn common food and drink vocabulary and talk about eating and drinking habits.",
  intro: `Bu konu yemek ve içeceklerle ilgili temel kelimeleri tanıtır.
🍴 Food (Yiyecekler): bread, cheese, meat, rice, chicken, eggs, soup, salad, pizza, pasta, fruits, vegetables
🥤 Drinks (İçecekler): water, tea, coffee, juice, milk, soda
Kullanışlı sorular:
• What do you like to eat? (Ne yemeyi seversin?)
• What's your favorite food? (En sevdiğin yemek ne?)
• What do you usually drink with dinner? (Akşam yemeğinde genelde ne içersin?)`,
  tip: "Use 'like' with food and drinks to express preferences and 'usually' for habits",
  
  table: [
    { question: "What's your favorite food?", answer: "My favorite food is pizza.", usage: "For preferences" },
    { question: "Do you like + food/drink?", answer: "Yes, I do. / No, I don't.", usage: "Yes/No questions" },
    { question: "What do you usually eat/drink?", answer: "I usually eat eggs. / I usually drink water.", usage: "For habits" }
  ],
  
  listeningExamples: [
    "My favorite food is pizza.",
    "I usually eat eggs and bread for breakfast.",
    "I like vegetables."
  ],
  
  speakingPractice: [
    { question: "What's your favorite food?", answer: "My favorite food is pizza." },
    { question: "What do you usually eat for breakfast?", answer: "I usually eat eggs and bread." },
    { question: "Do you like vegetables?", answer: "Yes, I like vegetables." },
    { question: "Do you eat meat?", answer: "Yes, I eat chicken and beef." },
    { question: "What kind of fruit do you like?", answer: "I like apples and bananas." },
    { question: "What do you drink in the morning?", answer: "I drink tea in the morning." },
    { question: "Do you like coffee?", answer: "No, I don't like coffee." },
    { question: "What do you usually drink with lunch?", answer: "I usually drink water." },
    { question: "Do you like spicy food?", answer: "Yes, I love spicy food." },
    { question: "What do you eat for dinner?", answer: "I eat rice and chicken." },
    { question: "Do you eat fish?", answer: "Yes, I sometimes eat fish." },
    { question: "What's your favorite drink?", answer: "My favorite drink is orange juice." },
    { question: "Do you drink milk?", answer: "Yes, I drink milk every day." },
    { question: "Do you like soup?", answer: "Yes, I like vegetable soup." },
    { question: "Do you eat pasta?", answer: "Yes, I eat pasta twice a week." },
    { question: "What's your favorite dessert?", answer: "My favorite dessert is chocolate cake." },
    { question: "Do you eat fast food?", answer: "Yes, but not every day." },
    { question: "What do you eat with rice?", answer: "I eat rice with vegetables or meat." },
    { question: "Do you like cheese?", answer: "Yes, I like cheese very much." },
    { question: "Do you drink soda?", answer: "No, I don't drink soda." },
    { question: "Do you eat fruit every day?", answer: "Yes, I eat fruit every day." },
    { question: "What do you put in your sandwich?", answer: "I put cheese, lettuce, and tomato." },
    { question: "Do you like sweet food?", answer: "Yes, I love sweet food." },
    { question: "What is your favorite snack?", answer: "My favorite snack is popcorn." },
    { question: "Do you like salad?", answer: "Yes, I eat salad with dinner." },
    { question: "Do you drink tea or coffee?", answer: "I drink tea." },
    { question: "Do you like chocolate?", answer: "Yes, I love chocolate." },
    { question: "What do you eat at school?", answer: "I eat a sandwich and fruit." },
    { question: "Do you drink water during the day?", answer: "Yes, I drink a lot of water." },
    { question: "Do you like hamburgers?", answer: "Yes, I like hamburgers with cheese." },
    { question: "What do you eat with eggs?", answer: "I eat bread and cheese with eggs." },
    { question: "Do you like orange juice?", answer: "Yes, it's my favorite." },
    { question: "Do you eat soup in winter?", answer: "Yes, I eat hot soup in winter." },
    { question: "What do you have for lunch on Sundays?", answer: "I have chicken and rice." },
    { question: "Do you eat chocolate every day?", answer: "No, just sometimes." },
    { question: "What food don't you like?", answer: "I don't like onions." },
    { question: "What's a typical Turkish breakfast?", answer: "It includes bread, cheese, olives, and tea." },
    { question: "What do you eat when you're hungry at night?", answer: "I eat a small snack like yogurt." },
    { question: "Do you eat ice cream in winter?", answer: "Yes, I eat it all year." },
    { question: "What do you usually cook?", answer: "I usually cook pasta or soup." }
  ]
};

// Module 46: Family Members Vocabulary
const MODULE_46_DATA = {
  title: "Module 46: Family Members Vocabulary",
  description: "Learn vocabulary for family members and practice talking about relationships.",
  intro: `Aile üyeleriyle ilgili temel kelimeler:
👨 father (baba), 👩 mother (anne), 👦 brother (erkek kardeş), 👧 sister (kız kardeş)
👴 grandfather (dede), 👵 grandmother (anneanne/babaanne)
👨‍👩‍👧‍👦 uncle (amca/dayı), aunt (hala/teyze), cousin (kuzen)
nephew (erkek yeğen), niece (kız yeğen), son (oğul), daughter (kız evlat)
husband (koca), wife (eş)
Kullanışlı Sorular:
• Who is your mother's father? → He is my grandfather.
• Do you have any brothers or sisters? (Kardeşin var mı?)
• How many people are there in your family? (Ailende kaç kişi var?)`,
  tip: "Use possessive forms to show relationships: 'my father', 'her sister', 'his brother'",
  
  table: [
    { question: "Who is your mother's mother?", answer: "She is my grandmother.", usage: "Family relationships" },
    { question: "Do you have any cousins?", answer: "Yes, I do.", usage: "Yes/No questions" },
    { question: "How many people are there in your family?", answer: "There are five people.", usage: "Counting family" }
  ],
  
  listeningExamples: [
    "My father is a doctor.",
    "She is my grandmother.",
    "I have three cousins."
  ],
  
  speakingPractice: [
    { question: "Do you have any brothers or sisters?", answer: "Yes, I have one sister." },
    { question: "How many people are there in your family?", answer: "There are five people in my family." },
    { question: "What does your father do?", answer: "He is a doctor." },
    { question: "Who is your mother's mother?", answer: "She is my grandmother." },
    { question: "Do you have any cousins?", answer: "Yes, I have three cousins." },
    { question: "What's your brother's name?", answer: "His name is Emre." },
    { question: "How old is your sister?", answer: "She is 15 years old." },
    { question: "Do you live with your parents?", answer: "Yes, I live with them." },
    { question: "Do you see your grandparents often?", answer: "Yes, every weekend." },
    { question: "Who is your uncle?", answer: "He is my dad's brother." },
    { question: "What does your aunt do?", answer: "She is a teacher." },
    { question: "Do you have any nephews or nieces?", answer: "Yes, I have one niece." },
    { question: "Is your cousin older than you?", answer: "Yes, he is older." },
    { question: "Do you get along with your siblings?", answer: "Yes, we get along well." },
    { question: "What's your mother's name?", answer: "Her name is Ayşe." },
    { question: "Who is the youngest in your family?", answer: "My little brother is the youngest." },
    { question: "Do you have a big family?", answer: "Yes, I have a big family." },
    { question: "Who do you look like in your family?", answer: "I look like my father." },
    { question: "Do your grandparents live near you?", answer: "Yes, they live close to us." },
    { question: "What do you call your father's sister?", answer: "I call her my aunt." },
    { question: "Who is your favorite family member?", answer: "My grandma is my favorite." },
    { question: "Do you visit your relatives often?", answer: "Yes, especially on holidays." },
    { question: "Is your sister married?", answer: "Yes, she has two children." },
    { question: "How many uncles do you have?", answer: "I have four uncles." },
    { question: "Do you help your parents at home?", answer: "Yes, I help them every day." },
    { question: "Is your cousin your age?", answer: "Yes, we're the same age." },
    { question: "Who is older, your mom or your dad?", answer: "My dad is older." },
    { question: "What does your grandfather do?", answer: "He is retired." },
    { question: "Do you play with your siblings?", answer: "Yes, we play games together." },
    { question: "What do you call your mother's brother?", answer: "He is my uncle." },
    { question: "Do you have a stepbrother or stepsister?", answer: "No, I don't." },
    { question: "Is your family close?", answer: "Yes, we are very close." },
    { question: "Do you know your great-grandparents?", answer: "No, I don't." },
    { question: "Who cooks in your family?", answer: "My mother usually cooks." },
    { question: "Do you live in the same house as your grandparents?", answer: "No, but we live nearby." },
    { question: "Is your dad funny?", answer: "Yes, he tells funny jokes." },
    { question: "Do your parents work?", answer: "Yes, they both work." },
    { question: "What's your daughter's name?", answer: "Her name is Elif." },
    { question: "Do you have children?", answer: "Yes, I have two children." },
    { question: "Who takes care of you when you're sick?", answer: "My mom does." }
  ]
};

// Module 47: Directions and Places Vocabulary
const MODULE_47_DATA = {
  title: "Module 47: Directions and Places Vocabulary",
  description: "Learn common direction words and vocabulary for places in a town or city.",
  intro: `Yön tarif ederken kullanılan ifadeler:
🔹 turn left (sola dön)
🔹 turn right (sağa dön)
🔹 go straight (düz git)
🔹 go past (geç)
🔹 cross (karşıya geç)
🔹 at the corner (köşede)
🔹 next to (yanında)
🔹 between (arasında)
🔹 opposite (karşısında)
Şehirdeki yaygın yerler:
bank (banka), supermarket (market), hospital (hastane), school (okul), post office (postane), police station (karakol), bus stop (otobüs durağı), park (park), restaurant (restoran), hotel (otel)`,
  tip: "Use prepositions like 'next to', 'opposite', 'between' to describe locations",
  
  table: [
    { question: "Where is the …?", example: "Where is the bank?", usage: "Asking for location" },
    { question: "How can I get to …?", example: "How can I get to the post office?", usage: "Asking for directions" },
    { answer: "It's next to … / It's opposite … / It's between …", example: "It's next to the supermarket.", usage: "Giving location" }
  ],
  
  listeningExamples: [
    "Where is the nearest bank? → It's next to the supermarket.",
    "How can I get to the police station? → Turn right at the traffic lights.",
    "The restaurant is opposite the bank."
  ],
  
  speakingPractice: [
    { question: "Where is the nearest bank?", answer: "It's next to the supermarket." },
    { question: "How do I get to the post office?", answer: "Go straight and turn left." },
    { question: "Is there a hospital near here?", answer: "Yes, it's behind the school." },
    { question: "Where is the school?", answer: "It's across from the park." },
    { question: "Can you tell me the way to the bus stop?", answer: "Yes, go straight and it's on the right." },
    { question: "How can I get to the police station?", answer: "Turn right at the traffic lights." },
    { question: "Is there a supermarket nearby?", answer: "Yes, it's next to the pharmacy." },
    { question: "Where's the nearest park?", answer: "It's behind the hotel." },
    { question: "Where is the restaurant?", answer: "It's opposite the bank." },
    { question: "Where's the cinema?", answer: "It's between the café and the bookstore." },
    { question: "How do I get to the hotel?", answer: "Go straight and turn right." },
    { question: "Is the bakery far from here?", answer: "No, it's very close." },
    { question: "Where is the coffee shop?", answer: "It's next to the library." },
    { question: "Can I walk to the museum?", answer: "Yes, it's just five minutes away." },
    { question: "Where's the bookshop?", answer: "It's opposite the school." },
    { question: "Is the gas station near here?", answer: "Yes, it's on the corner." },
    { question: "How do I go to the airport?", answer: "Take a taxi or go by bus." },
    { question: "Is the train station far?", answer: "No, it's just past the bridge." },
    { question: "Where can I find a pharmacy?", answer: "There's one near the hospital." },
    { question: "Where is the library?", answer: "It's next to the school." },
    { question: "Where's the zoo?", answer: "It's at the end of this street." },
    { question: "Is the bank on this street?", answer: "Yes, it's on the left." },
    { question: "Where can I find a taxi?", answer: "There's a taxi stand by the hotel." },
    { question: "How do I get to the stadium?", answer: "Go along this road and turn left." },
    { question: "Is there a church around here?", answer: "Yes, just go straight ahead." },
    { question: "Where's the shopping mall?", answer: "It's near the train station." },
    { question: "Where can I get a bus?", answer: "Go to the bus stop in front of the school." },
    { question: "How do I get to the market?", answer: "Walk down this street and turn right." },
    { question: "Is the hotel close to the beach?", answer: "Yes, just a 3-minute walk." },
    { question: "Where's the nearest ATM?", answer: "It's beside the grocery store." },
    { question: "Where is the fire station?", answer: "It's across from the police station." },
    { question: "Where can I buy stamps?", answer: "You can buy them at the post office." },
    { question: "Is the parking lot nearby?", answer: "Yes, it's behind the building." },
    { question: "Where's the entrance?", answer: "It's on the right side." },
    { question: "Where's the tourist office?", answer: "Next to the museum." },
    { question: "Is the bookstore far?", answer: "No, it's just around the corner." },
    { question: "Can I walk to the train station?", answer: "Yes, it's a short walk." },
    { question: "Where is the bridge?", answer: "It's over the river." },
    { question: "Where can I eat lunch?", answer: "There's a nice café across the street." },
    { question: "Where's the closest gym?", answer: "It's near the park." },
    { question: "Where is the swimming pool?", answer: "It's next to the sports center." }
  ]
};

// Module 48: Weather Vocabulary
const MODULE_48_DATA = {
  title: "Module 48: Weather Vocabulary",
  description: "Learn common weather vocabulary and practice describing weather conditions.",
  intro: `Hava durumunu anlatmak için kullanılan kelimeler:
🔹 sunny (güneşli), cloudy (bulutlu), rainy (yağmurlu), snowy (karlı), windy (rüzgarlı), foggy (sisli), hot (sıcak), cold (soğuk), warm (ılık), cool (serin), stormy (fırtınalı).
Kullanışlı ifadeler:
• What's the weather like? (Hava nasıl?)
• It's sunny today. (Bugün hava güneşli.)
• It's going to rain. (Yağmur yağacak.)
• It was very cold yesterday. (Dün hava çok soğuktu.)`,
  tip: "Use 'What's the weather like?' to ask about weather and 'It's...' to describe it",
  
  table: [
    { question: "What's the weather like?", answer: "It's sunny today.", usage: "Asking about weather" },
    { question: "Is it raining?", answer: "Yes, it is. / No, it isn't.", usage: "Yes/No questions" },
    { structure: "It's going to + weather word", example: "It's going to snow tomorrow.", usage: "Future weather" }
  ],
  
  listeningExamples: [
    "What's the weather like today? → It's sunny and warm.",
    "It's cold in winter.",
    "It's going to rain tomorrow."
  ],
  
  speakingPractice: [
    { question: "What's the weather like today?", answer: "It's sunny and warm." },
    { question: "Do you like rainy weather?", answer: "No, I don't like the rain." },
    { question: "Is it cold in winter?", answer: "Yes, it's very cold." },
    { question: "What do you do on snowy days?", answer: "I stay home and drink hot tea." },
    { question: "Is it hot in summer?", answer: "Yes, it's very hot." },
    { question: "What's your favorite weather?", answer: "I like cool and cloudy days." },
    { question: "Do you like sunny days?", answer: "Yes, I love the sunshine." },
    { question: "Is it windy today?", answer: "Yes, it's very windy." },
    { question: "What do you wear in cold weather?", answer: "I wear a coat and a scarf." },
    { question: "Is it foggy in the morning?", answer: "Yes, it's foggy near the river." },
    { question: "Do you like the snow?", answer: "Yes, I like playing in the snow." },
    { question: "What's the weather like in spring?", answer: "It's usually warm and rainy." },
    { question: "Is it stormy outside?", answer: "Yes, there is thunder and lightning." },
    { question: "What do you wear when it rains?", answer: "I wear a raincoat and use an umbrella." },
    { question: "Do you check the weather forecast?", answer: "Yes, every morning." },
    { question: "What's the weather like in your city?", answer: "It's mostly sunny." },
    { question: "Is it going to rain tomorrow?", answer: "Yes, it will rain in the afternoon." },
    { question: "Do you like hot weather?", answer: "No, I prefer cool weather." },
    { question: "What season is the coldest?", answer: "Winter is the coldest season." },
    { question: "What season do you like most?", answer: "I like spring." },
    { question: "Is it usually hot in July?", answer: "Yes, it's very hot in July." },
    { question: "What's the weather like in autumn?", answer: "It's cool and windy." },
    { question: "Do you wear boots in winter?", answer: "Yes, I wear boots when it snows." },
    { question: "What do you do when it's hot?", answer: "I go to the beach or drink cold water." },
    { question: "Is it snowing now?", answer: "No, it's not snowing." },
    { question: "What's your favorite season?", answer: "My favorite season is summer." },
    { question: "Do you like cloudy days?", answer: "Yes, they are calm and quiet." },
    { question: "What's the temperature today?", answer: "It's about 25 degrees." },
    { question: "Do you like the wind?", answer: "No, it makes me cold." },
    { question: "Is it raining now?", answer: "Yes, it's raining a lot." },
    { question: "Do you wear sunglasses?", answer: "Yes, when it's sunny." },
    { question: "Is it warm today?", answer: "Yes, it's warm and nice." },
    { question: "Do you stay inside during storms?", answer: "Yes, I stay safe inside." },
    { question: "What's the hottest month in your country?", answer: "August is the hottest." },
    { question: "What's the coldest month?", answer: "January is the coldest." },
    { question: "Do you like walking in the rain?", answer: "Sometimes, with an umbrella." },
    { question: "Is the weather important to you?", answer: "Yes, it affects my plans." },
    { question: "What weather do you hate?", answer: "I hate stormy weather." },
    { question: "What do you do on hot summer days?", answer: "I stay in the shade." },
    { question: "Do you check the weather before traveling?", answer: "Yes, always." }
  ]
};

// Module 49: Clothes Vocabulary
const MODULE_49_DATA = {
  title: "Module 49: Clothes Vocabulary",
  description: "Learn common vocabulary for clothes and accessories and talk about what people wear.",
  intro: `Clothes (giysiler) insanların giydiği şeylerdir.
Örnek kelimeler: shirt (gömlek), T-shirt (tişört), sweater (kazak), jacket (ceket), coat (mont), jeans (kot pantolon), dress (elbise), skirt (etek), shoes (ayakkabı), boots (bot), sandals (sandalet), socks (çorap), hat (şapka), scarf (atkı), gloves (eldiven).
Kullanışlı sorular:
• What are you wearing? (Ne giyiyorsun?)
• I'm wearing a blue shirt. (Mavi bir gömlek giyiyorum.)
• What do you wear in winter? (Kışın ne giyersin?)`,
  tip: "Use 'What are you wearing?' for current clothes and 'What do you wear?' for general habits",
  
  table: [
    { question: "What are you wearing?", answer: "I'm wearing jeans.", usage: "Current clothing" },
    { structure: "He/She is wearing + clothing item", example: "She is wearing a red dress.", usage: "Describing others" },
    { question: "Do you wear + clothing item?", answer: "Do you wear a jacket in winter?", usage: "General habits" }
  ],
  
  listeningExamples: [
    "I'm wearing a white T-shirt.",
    "She is wearing a red dress.",
    "I wear a coat in winter."
  ],
  
  speakingPractice: [
    { question: "What are you wearing today?", answer: "I'm wearing jeans and a white T-shirt." },
    { question: "Do you wear a jacket in winter?", answer: "Yes, I always wear a jacket." },
    { question: "What do you wear when it's hot?", answer: "I wear shorts and a T-shirt." },
    { question: "Do you like wearing hats?", answer: "Yes, I wear hats in summer." },
    { question: "What color are your shoes?", answer: "My shoes are black." },
    { question: "Do you wear glasses?", answer: "No, I don't." },
    { question: "What do you wear to school?", answer: "I wear a school uniform." },
    { question: "Do you wear socks at home?", answer: "Yes, I always wear socks." },
    { question: "What do you wear to a wedding?", answer: "I wear a suit and tie." },
    { question: "What do you wear in winter?", answer: "I wear a coat, gloves, and a scarf." },
    { question: "Do you wear sandals in summer?", answer: "Yes, they are comfortable." },
    { question: "What is your favorite piece of clothing?", answer: "I love my leather jacket." },
    { question: "Do you like wearing dresses?", answer: "Yes, especially in spring." },
    { question: "What do you wear to bed?", answer: "I wear pajamas." },
    { question: "Do you wear boots when it rains?", answer: "Yes, I wear rain boots." },
    { question: "What do you wear when you go running?", answer: "I wear sports clothes." },
    { question: "Do you wear a tie at work?", answer: "No, I don't have to." },
    { question: "Do you like colorful clothes?", answer: "Yes, I love bright colors." },
    { question: "What do you wear at the beach?", answer: "I wear a swimsuit and flip-flops." },
    { question: "Do you wear gloves in cold weather?", answer: "Yes, to keep my hands warm." },
    { question: "What color is your jacket?", answer: "It's dark blue." },
    { question: "Do you wear a watch?", answer: "Yes, I wear it every day." },
    { question: "Do you wear a uniform?", answer: "Yes, at my job." },
    { question: "What do you wear at home?", answer: "I wear comfortable clothes." },
    { question: "Do you wear long sleeves in winter?", answer: "Yes, always." },
    { question: "What kind of shoes do you like?", answer: "I like sneakers." },
    { question: "Do you wear skirts?", answer: "Sometimes, when the weather is warm." },
    { question: "What do you wear when it's cold?", answer: "I wear warm clothes." },
    { question: "Do you wear the same clothes every day?", answer: "No, I change my clothes daily." },
    { question: "What do you wear to a party?", answer: "I wear a nice shirt and trousers." },
    { question: "Do you wear earrings or jewelry?", answer: "Yes, I wear earrings." },
    { question: "What do you wear when it rains?", answer: "I wear a raincoat." },
    { question: "What color are your socks?", answer: "They are gray." },
    { question: "Do you wear new clothes often?", answer: "Only on special days." },
    { question: "Do you like wearing sweaters?", answer: "Yes, especially in autumn." },
    { question: "Do you wear a belt?", answer: "Yes, with my jeans." },
    { question: "What do you wear in the morning?", answer: "I wear my school clothes." },
    { question: "Do you wear warm clothes in spring?", answer: "No, spring is warmer." },
    { question: "Do you wear your favorite T-shirt often?", answer: "Yes, all the time." },
    { question: "What do you wear when you sleep?", answer: "I wear pajamas or a nightgown." }
  ]
};

// Module 50: Hobbies and Free Time Vocabulary
const MODULE_50_DATA = {
  title: "Module 50: Hobbies and Free Time Vocabulary",
  description: "Learn vocabulary related to hobbies and free time activities.",
  intro: `Hobbies (hobiler) ve free time activities (boş zaman aktiviteleri), insanların boş vakitlerinde yaptığı eğlenceli şeylerdir.
Örnek kelimeler:
🔹 Hobbies → reading (okuma), drawing (çizim), painting (resim yapma), cooking (yemek yapma), dancing (dans etme), singing (şarkı söyleme), gardening (bahçecilik), traveling (seyahat), fishing (balık tutma)
🔹 Free Time Activities → watching TV (TV izleme), listening to music (müzik dinleme), playing games (oyun oynama), using the computer (bilgisayar kullanma), going for a walk (yürüyüşe çıkma), meeting friends (arkadaşlarla buluşma)
Kullanışlı Sorular:
• What do you do in your free time? (Boş zamanında ne yaparsın?)
• Do you have any hobbies? (Hobin var mı?)
• I like reading books and playing the guitar. (Kitap okumayı ve gitar çalmayı severim.)`,
  tip: "Use 'like + verb-ing' or 'enjoy + verb-ing' to talk about hobbies and interests",
  
  table: [
    { structure: "I like + verb-ing", example: "I like reading.", usage: "Expressing likes" },
    { structure: "I enjoy + verb-ing", example: "I enjoy cooking.", usage: "Expressing enjoyment" },
    { question: "Do you + verb …?", answer: "Do you play video games?", usage: "Yes/No questions" },
    { question: "What's your favorite hobby?", answer: "My favorite hobby is painting.", usage: "Asking about preferences" }
  ],
  
  listeningExamples: [
    "I like reading books.",
    "She enjoys cooking in her free time.",
    "We play football every weekend."
  ],
  
  speakingPractice: [
    { question: "What do you do in your free time?", answer: "I read books or listen to music." },
    { question: "Do you have any hobbies?", answer: "Yes, I enjoy painting." },
    { question: "What's your favorite hobby?", answer: "My favorite hobby is gardening." },
    { question: "Do you like playing sports?", answer: "Yes, I love football." },
    { question: "Do you listen to music every day?", answer: "Yes, I listen to music every day." },
    { question: "What kind of music do you like?", answer: "I like pop music." },
    { question: "Do you play any instruments?", answer: "Yes, I play the guitar." },
    { question: "Do you like watching movies?", answer: "Yes, especially comedies." },
    { question: "What's your favorite movie?", answer: "My favorite movie is a science fiction one." },
    { question: "Do you go for walks?", answer: "Yes, I walk every evening." },
    { question: "Do you like dancing?", answer: "Yes, I love dancing." },
    { question: "Do you enjoy cooking?", answer: "Yes, I like trying new recipes." },
    { question: "What do you do on the weekend?", answer: "I meet my friends and relax." },
    { question: "Do you go shopping in your free time?", answer: "Sometimes, I go shopping." },
    { question: "Do you play video games?", answer: "Yes, I play on my computer." },
    { question: "Do you like taking photos?", answer: "Yes, especially when I travel." },
    { question: "Do you do any sports?", answer: "Yes, I play basketball." },
    { question: "Do you draw or paint?", answer: "Yes, I draw in my notebook." },
    { question: "What's a relaxing hobby for you?", answer: "Listening to music is relaxing." },
    { question: "Do you collect anything?", answer: "Yes, I collect stamps." },
    { question: "Do you read books?", answer: "Yes, I read every night." },
    { question: "Do you write a diary?", answer: "No, but I used to." },
    { question: "Do you enjoy traveling?", answer: "Yes, I love visiting new places." },
    { question: "Do you like fishing?", answer: "Yes, it's peaceful." },
    { question: "Do you often go to the cinema?", answer: "Not often, but I like it." },
    { question: "Do you watch series on Netflix?", answer: "Yes, I love binge-watching." },
    { question: "What do you do when you're bored?", answer: "I watch YouTube videos." },
    { question: "Do you do puzzles or crosswords?", answer: "Yes, to keep my mind active." },
    { question: "Do you do yoga?", answer: "Yes, twice a week." },
    { question: "Do you swim in your free time?", answer: "Yes, I go swimming on Sundays." },
    { question: "Do you go to the gym?", answer: "Yes, I go three times a week." },
    { question: "Do you knit or sew?", answer: "No, I don't." },
    { question: "Do you go cycling?", answer: "Yes, I ride my bike in the park." },
    { question: "What do you do at home for fun?", answer: "I play board games with my family." },
    { question: "Do you use social media?", answer: "Yes, I check it every day." },
    { question: "Do you watch TV every night?", answer: "Yes, after dinner." },
    { question: "Do you play chess?", answer: "Yes, I play with my brother." },
    { question: "What hobby would you like to try?", answer: "I'd like to learn photography." },
    { question: "Do you play cards?", answer: "Yes, with my friends." },
    { question: "What do you enjoy doing alone?", answer: "I enjoy reading and drawing." }
  ]
};

// A2 Level Module Data

// Module 51 Data: Past Simple Affirmative
const MODULE_51_DATA = {
  title: "Module 51: Past Simple Affirmative",
  description: "Students will learn how to form and use affirmative sentences in the past simple tense (regular and irregular verbs).",
  intro: `Geçmişte gerçekleşmiş olayları anlatmak için Past Simple Tense kullanılır.
Bu zamanda fiillerin 2. hali (V2) kullanılır.
• Düzenli fiillere "-ed" takısı gelir.
• Düzensiz fiillerin ikinci halleri ezberlenmelidir.

Use the past simple affirmative to describe actions that happened at a specific time in the past.
• Regular verbs → verb + -ed (e.g. play → played)
• Irregular verbs → second form (e.g. go → went, eat → ate)`,
  tip: "Use Past Simple for completed actions in the past. Regular verbs add -ed, irregular verbs have special forms.",
  
  table: [
    { subject: "I", verb: "watched", rest: "a movie.", example: "I watched a movie." },
    { subject: "She", verb: "went", rest: "to school.", example: "She went to school." },
    { subject: "They", verb: "cooked", rest: "pasta.", example: "They cooked pasta." },
    { subject: "We", verb: "cleaned", rest: "the room.", example: "We cleaned the room." }
  ],
  
  listeningExamples: [
    "I visited my grandparents.",
    "She went to the supermarket.",
    "They watched a comedy."
  ],
  
  speakingPractice: [
    { question: "What did you do last weekend?", answer: "I visited my grandparents." },
    { question: "Where did she go yesterday?", answer: "She went to the supermarket." },
    { question: "Did they watch a movie?", answer: "Yes, they watched a comedy." },
    { question: "What time did he arrive at the party?", answer: "He arrived at 8 p.m." },
    { question: "Who did you meet at the conference?", answer: "I met my old teacher." },
    { question: "Did you enjoy the concert?", answer: "Yes, I really enjoyed it." },
    { question: "Where did they travel last summer?", answer: "They traveled to Italy." },
    { question: "Did she call you last night?", answer: "Yes, she called me at 10." },
    { question: "What did you eat for dinner?", answer: "I ate chicken and rice." },
    { question: "How did he learn to swim?", answer: "He learned at a swimming course." },
    { question: "What did the children do at the park?", answer: "They played football." },
    { question: "Did your friend pass the exam?", answer: "Yes, he passed with a high score." },
    { question: "Where did you buy your shoes?", answer: "I bought them at the mall." },
    { question: "Did she like the gift?", answer: "Yes, she loved it." },
    { question: "When did they leave the office?", answer: "They left at 6 p.m." },
    { question: "Did you walk to school today?", answer: "Yes, I walked because the weather was nice." },
    { question: "Who cooked dinner last night?", answer: "My mother cooked dinner." },
    { question: "What did you write in the email?", answer: "I wrote about our meeting." },
    { question: "Did he fix the car?", answer: "Yes, he fixed it this morning." },
    { question: "What did you do on your birthday?", answer: "I had a small party at home." },
    { question: "Where did your parents grow up?", answer: "They grew up in a small village." },
    { question: "Did she bring her camera?", answer: "Yes, she brought it to take photos." },
    { question: "How did you feel after the match?", answer: "I felt very tired." },
    { question: "What did the teacher say?", answer: "He said we had a test tomorrow." },
    { question: "Did you sleep well?", answer: "Yes, I slept very well." },
    { question: "Where did they have lunch?", answer: "They had lunch at a café." },
    { question: "Who did you sit next to?", answer: "I sat next to my best friend." },
    { question: "Did he understand the lesson?", answer: "Yes, he understood everything." },
    { question: "What did she wear to the wedding?", answer: "She wore a beautiful dress." },
    { question: "Did you find your keys?", answer: "Yes, I found them under the table." },
    { question: "How did the story end?", answer: "It ended happily." },
    { question: "What games did you play?", answer: "We played chess and cards." },
    { question: "Did your brother enjoy the film?", answer: "Yes, he really enjoyed it." },
    { question: "When did they arrive?", answer: "They arrived yesterday morning." },
    { question: "What did your sister say?", answer: "She said she was busy." },
    { question: "Did you hear the news?", answer: "Yes, I heard it on the radio." },
    { question: "Where did he stay during his trip?", answer: "He stayed in a hotel." },
    { question: "Did she forget her umbrella?", answer: "Yes, she forgot it at home." },
    { question: "What songs did they sing?", answer: "They sang some classic songs." },
    { question: "Did you go out on Saturday?", answer: "Yes, I went to a restaurant." },
    { question: "What did he build in the garden?", answer: "He built a wooden bench." }
  ]
};

// Module 52 Data: Past Simple: Irregular Verbs (Affirmative)
const MODULE_52_DATA = {
  title: "Module 52: Past Simple: Irregular Verbs (Affirmative)",
  description: "Students will learn to form affirmative past simple sentences using irregular verbs in English.",
  intro: `Geçmişte gerçekleşmiş ve bitmiş olayları anlatmak için Past Simple (Geçmiş Zaman) kullanılır.
Düzenli fiiller "-ed" takısı alırken, irregular verbs (düzensiz fiiller) farklı şekillerde değişir.
Bu fiillerin ikinci halleri (V2) ezberlenmelidir.

Yapı: Özne + V2 (fiilin 2. hali) + nesne/tümleç

Past Simple affirmative is used to describe completed past actions. Irregular verbs do not follow a rule — each must be memorized in its V2 form.`,
  tip: "Irregular verbs have unique past forms that must be memorized: go→went, eat→ate, see→saw, etc.",
  
  table: [
    { baseForm: "go", pastSimple: "went", turkish: "gitmek", example: "I went to the park." },
    { baseForm: "eat", pastSimple: "ate", turkish: "yemek", example: "She ate an apple." },
    { baseForm: "see", pastSimple: "saw", turkish: "görmek", example: "We saw a movie last night." },
    { baseForm: "write", pastSimple: "wrote", turkish: "yazmak", example: "He wrote a letter." },
    { baseForm: "take", pastSimple: "took", turkish: "almak", example: "They took the bus." },
    { baseForm: "come", pastSimple: "came", turkish: "gelmek", example: "She came early." },
    { baseForm: "drink", pastSimple: "drank", turkish: "içmek", example: "I drank coffee." },
    { baseForm: "run", pastSimple: "ran", turkish: "koşmak", example: "He ran in the park." }
  ],
  
  listeningExamples: [
    "I wrote a book two days ago.",
    "She gave a gift an hour ago.",
    "We read the book last Monday."
  ],
  
  speakingPractice: [
    { question: "What did I write two days ago?", answer: "I wrote a book two days ago." },
    { question: "What did she give an hour ago?", answer: "She gave a gift an hour ago." },
    { question: "What did we read last Monday?", answer: "We read the book last Monday." },
    { question: "Where did you go last weekend?", answer: "I went to the movies last weekend." },
    { question: "What did we take last weekend?", answer: "We took a cake last weekend." },
    { question: "Who did they meet last Monday?", answer: "They met their teacher last Monday." },
    { question: "What did she see yesterday?", answer: "She saw a cat yesterday." },
    { question: "What did she give last weekend?", answer: "She gave her homework last weekend." },
    { question: "What did I drink a minute ago?", answer: "I drank coffee a minute ago." },
    { question: "What did they take last night?", answer: "They took a taxi last night." },
    { question: "What did we eat last night?", answer: "We ate a cake last night." },
    { question: "What did we speak two days ago?", answer: "We spoke about homework two days ago." },
    { question: "What did you drink a minute ago?", answer: "I drank tea a minute ago." },
    { question: "What did you drink in 2010?", answer: "I drank orange juice in 2010." },
    { question: "Where did you come this morning?", answer: "I came to school this morning." },
    { question: "What did you take last week?", answer: "I took a photo last week." },
    { question: "What did we take last week?", answer: "We took lunch last week." },
    { question: "What did I give a minute ago?", answer: "I gave a letter a minute ago." },
    { question: "What did she say two days ago?", answer: "She said something important two days ago." },
    { question: "When did I come an hour ago?", answer: "I came to the office an hour ago." },
    { question: "What did they know yesterday?", answer: "They knew the answer yesterday." },
    { question: "What did I leave this morning?", answer: "I left my keys this morning." },
    { question: "What did you make last Monday?", answer: "I made lunch last Monday." },
    { question: "What did you drink last Monday?", answer: "I drank tea last Monday." },
    { question: "What did she make yesterday?", answer: "She made a cake yesterday." },
    { question: "What did you make yesterday?", answer: "I made a letter yesterday." },
    { question: "What did we speak this morning?", answer: "We spoke about the meeting this morning." },
    { question: "Where did I come yesterday?", answer: "You came to the office yesterday." },
    { question: "What did I see last night?", answer: "I saw a movie last night." },
    { question: "What did they eat last Monday?", answer: "They ate lunch last Monday." },
    { question: "What did I have two days ago?", answer: "I had a gift two days ago." },
    { question: "What did you have last Monday?", answer: "I had coffee last Monday." },
    { question: "What did he write in 2010?", answer: "He wrote a letter in 2010." },
    { question: "What did we speak last week?", answer: "We spoke about a letter last week." },
    { question: "Where did he go last night?", answer: "He went to see a friend last night." },
    { question: "What did he write last Monday?", answer: "He wrote a story last Monday." },
    { question: "Who did I meet last Monday?", answer: "You met a friend last Monday." },
    { question: "What did you make yesterday?", answer: "I made a drawing yesterday." },
    { question: "What did I say last Monday?", answer: "You said something funny last Monday." },
    { question: "What did we write two days ago?", answer: "We wrote a gift card two days ago." }
  ]
};

// Module 53 Data: Past Simple: Negative Sentences
const MODULE_53_DATA = {
  title: "Module 53: Past Simple: Negative Sentences",
  description: "Students will learn how to form negative sentences in the past simple tense using \"did not / didn't\" + base verb (V1).",
  intro: `Geçmiş zamanda olumsuz cümle kurarken, "did not" (veya "didn't") kullanılır.
Fiil her zaman yalın hali (V1) ile kullanılır — ikinci hali (V2) kullanılmaz.

Yapı: Özne + didn't + fiil (V1) + nesne/zarf

In the past simple negative form, use "didn't" followed by the base verb (V1).
Never use V2 in negative sentences.`,
  tip: "Use didn't + base verb (V1) for negative past simple sentences. Never use V2 with didn't.",
  
  table: [
    { subject: "I", auxiliary: "didn't", verb: "eat", object: "dinner yesterday", example: "I didn't eat dinner yesterday." },
    { subject: "You", auxiliary: "didn't", verb: "see", object: "the movie", example: "You didn't see the movie." },
    { subject: "He", auxiliary: "didn't", verb: "write", object: "a letter", example: "He didn't write a letter." },
    { subject: "She", auxiliary: "didn't", verb: "go", object: "to the park", example: "She didn't go to the park." },
    { subject: "They", auxiliary: "didn't", verb: "take", object: "the test", example: "They didn't take the test." }
  ],
  
  listeningExamples: [
    "I didn't go to school yesterday.",
    "She didn't eat breakfast.",
    "They didn't see the movie."
  ],
  
  speakingPractice: [
    { question: "What didn't they say this morning?", answer: "They didn't say anything this morning." },
    { question: "What didn't you take a minute ago?", answer: "I didn't take a letter a minute ago." },
    { question: "What didn't she have yesterday?", answer: "She didn't have any coffee yesterday." },
    { question: "What didn't I drink an hour ago?", answer: "I didn't drink tea an hour ago." },
    { question: "What didn't we get yesterday?", answer: "We didn't get any messages yesterday." },
    { question: "What didn't he eat in 2010?", answer: "He didn't eat pizza in 2010." },
    { question: "What didn't they have an hour ago?", answer: "They didn't have a book an hour ago." },
    { question: "What didn't he eat in 2010?", answer: "He didn't eat a sandwich in 2010." },
    { question: "Where didn't you go two days ago?", answer: "I didn't go to the park two days ago." },
    { question: "What didn't they read last weekend?", answer: "They didn't read any books last weekend." },
    { question: "What didn't you leave last night?", answer: "I didn't leave my phone last night." },
    { question: "What didn't we find in 2010?", answer: "We didn't find the answer in 2010." },
    { question: "What didn't I eat last weekend?", answer: "I didn't eat lunch last weekend." },
    { question: "Where didn't he go last night?", answer: "He didn't go to the restaurant last night." },
    { question: "What didn't we make in 2010?", answer: "We didn't make a presentation in 2010." },
    { question: "What didn't he write in 2010?", answer: "He didn't write the report in 2010." },
    { question: "What didn't we get this morning?", answer: "We didn't get any calls this morning." },
    { question: "What didn't we take an hour ago?", answer: "We didn't take the paper an hour ago." },
    { question: "What didn't they buy in 2010?", answer: "They didn't buy a car in 2010." },
    { question: "What didn't they find last Monday?", answer: "They didn't find the keys last Monday." },
    { question: "Where didn't I go yesterday?", answer: "I didn't go to school yesterday." },
    { question: "What didn't I eat last week?", answer: "I didn't eat dinner last week." },
    { question: "Where didn't they go last weekend?", answer: "They didn't go to the cinema last weekend." },
    { question: "What didn't you find last night?", answer: "I didn't find my bag last night." },
    { question: "When didn't they come?", answer: "They didn't come a minute ago." },
    { question: "What didn't she run two days ago?", answer: "She didn't run in the park two days ago." },
    { question: "What didn't I speak about last weekend?", answer: "I didn't speak about the gift last weekend." },
    { question: "What didn't they have a minute ago?", answer: "They didn't have their homework a minute ago." },
    { question: "When didn't we come?", answer: "We didn't come an hour ago." },
    { question: "What didn't they run last Monday?", answer: "They didn't run a race last Monday." },
    { question: "What didn't they see yesterday?", answer: "They didn't see the news yesterday." },
    { question: "What didn't he say yesterday?", answer: "He didn't say anything yesterday." },
    { question: "What didn't you speak two days ago?", answer: "I didn't speak English two days ago." },
    { question: "What didn't she give in 2010?", answer: "She didn't give homework in 2010." },
    { question: "What didn't I give this morning?", answer: "I didn't give a photo this morning." },
    { question: "What didn't you write two days ago?", answer: "I didn't write a message two days ago." },
    { question: "What didn't I have two days ago?", answer: "I didn't have a gift two days ago." },
    { question: "What didn't she drink last Monday?", answer: "She didn't drink coffee last Monday." },
    { question: "What didn't they read last night?", answer: "They didn't read any books last night." },
    { question: "What didn't she see in 2010?", answer: "She didn't see the news in 2010." }
  ]
};

// Module 54 Data: Past Simple: Questions (Yes/No & Wh-)
const MODULE_54_DATA = {
  title: "Module 54: Past Simple: Questions (Yes/No & Wh-)",
  description: "Students will learn to form and answer yes/no and wh- questions in the past simple tense.",
  intro: `Past Simple Questions (Geçmiş Zaman Soru Cümleleri), geçmişteki eylemleri sorgulamak için kullanılır.
İki tür soru vardır:

1. Yes/No Questions (Evet/Hayır Soruları)
Yapı: Did + özne + fiil (V1) + nesne/zarf?
Örnek: Did you see the movie? → Yes, I did. / No, I didn't.

2. Wh- Questions (Bilgi Soruları)
Yapı: Wh- kelimesi + did + özne + fiil (V1)?
Örnek: What did you eat? → I ate pizza.

• Yes/No Questions: Did + subject + base verb (V1)?
→ Did she go to school? Yes, she did.
• Wh- Questions: Wh- + did + subject + V1?
→ What did they eat? They ate lunch.`,
  tip: "Form questions with Did + subject + base verb for Yes/No questions, or Wh-word + did + subject + base verb for information questions.",
  
  table: [
    { questionType: "Yes/No", structure: "Did + subject + V1 + ...?", example: "Did she write a letter?", answer: "Yes, she did. She wrote a letter." },
    { questionType: "Wh-", structure: "Wh- + did + subject + V1 + ...?", example: "What did they eat?", answer: "They ate lunch." }
  ],
  
  listeningExamples: [
    "Did he see a friend a minute ago?",
    "What did we speak about last week?",
    "Where did we find the gift last night?"
  ],
  
  speakingPractice: [
    { question: "Did he see a friend a minute ago?", answer: "Yes, he did. He saw a friend a minute ago." },
    { question: "Did he leave a letter two days ago?", answer: "Yes, he did. He left a letter two days ago." },
    { question: "Did she find a cake in 2010?", answer: "Yes, she did. She found a cake in 2010." },
    { question: "Did I get a gift last Monday?", answer: "Yes, I did. I got a gift last Monday." },
    { question: "Did we read something this morning?", answer: "Yes, we did. We read a story this morning." },
    { question: "Did we speak about something two days ago?", answer: "Yes, we did. We spoke about a topic two days ago." },
    { question: "Did she have a book yesterday?", answer: "Yes, she did. She had a book yesterday." },
    { question: "Did they read last night?", answer: "Yes, they did. They read a magazine last night." },
    { question: "Did I run yesterday?", answer: "Yes, I did. I ran yesterday." },
    { question: "Did I meet someone last week?", answer: "Yes, I did. I met a friend last week." },
    { question: "Did you find a photo last weekend?", answer: "Yes, I did. I found a photo last weekend." },
    { question: "Did she give a gift in 2010?", answer: "Yes, she did. She gave a gift in 2010." },
    { question: "Did I give a gift last weekend?", answer: "Yes, I did. I gave a gift last weekend." },
    { question: "Did I eat lunch last night?", answer: "Yes, I did. I ate lunch last night." },
    { question: "Did she eat something a minute ago?", answer: "Yes, she did. She ate a sandwich a minute ago." },
    { question: "Did we go to school this morning?", answer: "Yes, we did. We went to school this morning." },
    { question: "Did we go out a minute ago?", answer: "Yes, we did. We went out a minute ago." },
    { question: "Did they write to a friend yesterday?", answer: "Yes, they did. They wrote a letter yesterday." },
    { question: "Did you say something yesterday?", answer: "Yes, I did. I said something yesterday." },
    { question: "Did she drink something a minute ago?", answer: "Yes, she did. She drank water a minute ago." },
    { question: "Where did we make something this morning?", answer: "We made breakfast this morning." },
    { question: "What did I have last Monday?", answer: "I had some coffee last Monday." },
    { question: "When did he take something last week?", answer: "He took a photo last week." },
    { question: "Who did you drink with a minute ago?", answer: "I drank tea with my friend a minute ago." },
    { question: "Why did she give a gift this morning?", answer: "She gave it because it was his birthday." },
    { question: "When did they come last night?", answer: "They came at 9 p.m. last night." },
    { question: "How did I make something last weekend?", answer: "I made it with my hands last weekend." },
    { question: "Where did he see something in 2010?", answer: "He saw the Eiffel Tower in 2010." },
    { question: "Why did they know the answer an hour ago?", answer: "Because they studied before." },
    { question: "How did you go yesterday?", answer: "I went by bus yesterday." },
    { question: "What did we speak about last week?", answer: "We spoke about the project last week." },
    { question: "Where did we find the gift last night?", answer: "We found it under the table." },
    { question: "Where did I have coffee an hour ago?", answer: "I had it at the café an hour ago." },
    { question: "When did they eat a minute ago?", answer: "They ate lunch a minute ago." },
    { question: "Why did she take her notebook this morning?", answer: "Because she had class." },
    { question: "What did you come for last Monday?", answer: "I came for a meeting last Monday." },
    { question: "What did we read last weekend?", answer: "We read a novel last weekend." },
    { question: "How did I find the answer yesterday?", answer: "I found it online." },
    { question: "When did you find the book?", answer: "I found it a minute ago." },
    { question: "How did we come last Monday?", answer: "We came by car last Monday." }
  ]
};

// Module 55 Data: Used to (Past Habits)
const MODULE_55_DATA = {
  title: "Module 55: Used to (Past Habits)",
  description: "Use \"used to\" to describe past habits or states that no longer happen.",
  intro: `"Used to" geçmişte alışkanlık olan ama artık yapılmayan şeyler için kullanılır.
Örnek: "Eskiden sinemaya giderdim." → I used to go to the cinema.

Olumsuz hâli: "Eskiden yapmazdım." → I didn't use to…
Soru hâli: "Eskiden yapar mıydın?" → Did you use to…?

Affirmative: I used to play football when I was a child.
Negative: I didn't use to like vegetables.
Question: Did you use to watch cartoons?`,
  tip: "Use 'used to' for past habits that don't happen anymore. In questions and negatives, use 'use to' (without 'd').",
  
  table: [
    { sentenceType: "Affirmative", structure: "Subject + used to + V1", example: "I used to smoke." },
    { sentenceType: "Negative", structure: "Subject + didn't use to + V1", example: "I didn't use to smoke." },
    { sentenceType: "Question", structure: "Did + subject + use to + V1?", example: "Did you use to smoke?" }
  ],
  
  listeningExamples: [
    "I used to play with toys all the time.",
    "She used to go to ballet every Saturday.",
    "They used to live in a big house near the park."
  ],
  
  speakingPractice: [
    { question: "Did you use to play with toys when you were a child?", answer: "Yes, I used to play with toys all the time." },
    { question: "Did your sister use to go to ballet classes?", answer: "Yes, she used to go to ballet every Saturday." },
    { question: "Did they use to live in a big house?", answer: "Yes, they used to live in a big house near the park." },
    { question: "Did your father use to smoke?", answer: "Yes, he used to smoke, but he quit years ago." },
    { question: "Did you use to read comic books?", answer: "Yes, I used to read comic books after school." },
    { question: "Did she use to wear glasses?", answer: "Yes, she used to wear glasses before her eye surgery." },
    { question: "Did your teacher use to give a lot of homework?", answer: "Yes, he used to give us homework every day." },
    { question: "Did your family use to eat dinner together?", answer: "Yes, we used to eat dinner together every night." },
    { question: "Did you use to ride your bike to school?", answer: "Yes, I used to ride my bike every morning." },
    { question: "Did your grandparents use to tell you stories?", answer: "Yes, they used to tell me bedtime stories." },
    { question: "Did you use to like broccoli as a child?", answer: "No, I didn't use to like broccoli at all." },
    { question: "Did your brother use to clean his room?", answer: "No, he didn't use to clean it. It was always messy." },
    { question: "Did you use to play any musical instruments?", answer: "No, I didn't use to play any instruments." },
    { question: "Did they use to travel often?", answer: "No, they didn't use to travel much." },
    { question: "Did your mother use to drive a car?", answer: "No, she didn't use to drive. She took the bus." },
    { question: "Did you use to wake up early on weekends?", answer: "No, I didn't use to wake up early on weekends." },
    { question: "Did your friends use to watch horror movies?", answer: "No, they didn't use to watch horror movies." },
    { question: "Did your school use to have a library?", answer: "No, it didn't use to have a library." },
    { question: "Did you use to eat spicy food?", answer: "No, I didn't use to eat spicy food." },
    { question: "Did your sister use to play sports?", answer: "No, she didn't use to play any sports." },
    { question: "What did you use to do on summer holidays?", answer: "I used to go to my uncle's farm and ride horses." },
    { question: "Where did your parents use to live?", answer: "They used to live in a small village in the mountains." },
    { question: "What games did you use to play?", answer: "I used to play hide and seek and tag with my friends." },
    { question: "What subjects did you use to like in school?", answer: "I used to like math and science." },
    { question: "What did your best friend use to look like?", answer: "He used to have long hair and glasses." },
    { question: "Where did you use to go shopping?", answer: "I used to go shopping at the local market." },
    { question: "What food did you use to eat every day?", answer: "I used to eat rice and vegetables for lunch." },
    { question: "Where did your family use to go on Sundays?", answer: "We used to go to the beach or the park." },
    { question: "What did you use to do before bed?", answer: "I used to read a book before going to sleep." },
    { question: "What cartoons did you use to watch?", answer: "I used to watch Tom and Jerry and SpongeBob." },
    { question: "Did you use to wear a school uniform?", answer: "Yes, I used to wear a white shirt and black pants." },
    { question: "Did your parents use to work in the same city?", answer: "Yes, they used to work downtown." },
    { question: "What did your family use to do in the evenings?", answer: "We used to watch TV and talk together." },
    { question: "Did you use to sleep with a teddy bear?", answer: "Yes, I used to sleep with my favorite bear every night." },
    { question: "Where did you use to hang out with your friends?", answer: "We used to hang out at the playground near school." },
    { question: "Did your dog use to bark a lot?", answer: "Yes, he used to bark at everything!" },
    { question: "What did your teacher use to do when students were late?", answer: "She used to write their names on the board." },
    { question: "Did your city use to have a tram system?", answer: "No, it didn't use to have trams, only buses." },
    { question: "What kind of music did you use to listen to?", answer: "I used to listen to pop and rock music." },
    { question: "Did you use to believe in Santa Claus?", answer: "Yes, I used to believe in him when I was five." }
  ]
};

// Module 56 Data: Would for Politeness and Offers
const MODULE_56_DATA = {
  title: "Module 56: Would for Politeness and Offers",
  description: "Use \"Would\" to make polite requests and offers.",
  intro: `"Would" kelimesi, İngilizce'de tekliflerde ve kibar isteklerde kullanılır.
• "Would you like…?" → "İster misiniz?" anlamında teklif.
Örnek: Would you like some water? → Biraz su ister misiniz?
• "Would you…?" → "Yapar mısınız?" anlamında kibar rica.
Örnek: Would you carry this bag, please? → Bu çantayı taşır mısınız, lütfen?

Making Offers: Would you like some tea?
Making Polite Requests: Would you help me, please?
Responses: Yes, please. That would be great. / No, thank you. I'm fine.`,
  tip: "Use 'Would you like...?' for offers and 'Would you...?' for polite requests. Always be polite in responses.",
  
  table: [
    { sentenceType: "Offer", structure: "Would you like + noun/verb (to)", example: "Would you like a drink?" },
    { sentenceType: "Polite Request", structure: "Would you + base verb", example: "Would you help me, please?" },
    { sentenceType: "Response", structure: "Yes/No + polite reply", example: "Yes, please. / No, thank you." }
  ],
  
  listeningExamples: [
    "Would you like some coffee?",
    "Would you help me with this box?",
    "Would you close the window, please?"
  ],
  
  speakingPractice: [
    { question: "Would you like some coffee?", answer: "Yes, please. I'd love some." },
    { question: "Would you like a glass of water?", answer: "No, thank you. I'm not thirsty." },
    { question: "Would you like to sit down?", answer: "Yes, I've been standing all day." },
    { question: "Would you like a piece of cake?", answer: "Yes, please. It looks delicious." },
    { question: "Would you like to come with us?", answer: "Sure, I'd love to!" },
    { question: "Would you like some more soup?", answer: "No, thank you. I'm full." },
    { question: "Would you like to visit the museum?", answer: "Yes, I enjoy museums." },
    { question: "Would you like a sandwich or a salad?", answer: "I'd like a salad, please." },
    { question: "Would you like to watch a movie tonight?", answer: "Yes, that sounds great!" },
    { question: "Would you like to try this dessert?", answer: "No, thank you. I don't eat sugar." },
    { question: "Would you help me with this box?", answer: "Of course. Let me take it." },
    { question: "Would you close the window, please?", answer: "Sure. It's getting cold." },
    { question: "Would you lend me your pen?", answer: "No problem. Here you go." },
    { question: "Would you show me the way?", answer: "Yes, follow me." },
    { question: "Would you answer the phone for me?", answer: "Sure, I'll get it." },
    { question: "Would you turn down the music?", answer: "Okay, I'll lower the volume." },
    { question: "Would you check my homework?", answer: "Yes, I'd be happy to help." },
    { question: "Would you wait for me at the bus stop?", answer: "Yes, I'll be there." },
    { question: "Would you drive me to the airport?", answer: "I'm sorry, I'm busy at that time." },
    { question: "Would you mind helping me clean?", answer: "No, not at all." },
    { question: "Would you like to play a game with us?", answer: "Sure, what are you playing?" },
    { question: "Would you explain this question again?", answer: "Of course. Let me repeat it." },
    { question: "Would you like to join our team?", answer: "Yes, I'd be happy to!" },
    { question: "Would you pick up some milk on the way home?", answer: "No problem, I'll stop by the store." },
    { question: "Would you like to see my new phone?", answer: "Yes, show me!" },
    { question: "Would you take a photo of us, please?", answer: "Sure, say cheese!" },
    { question: "Would you come to the party on Friday?", answer: "I'd love to. What time is it?" },
    { question: "Would you please write your name here?", answer: "Yes, here it is." },
    { question: "Would you explain the homework again?", answer: "Sure. It's on page 35." },
    { question: "Would you like to dance?", answer: "No, thank you. I'm too tired." },
    { question: "Would you like anything else?", answer: "No, that's all for now. Thanks." },
    { question: "Would you please sign this form?", answer: "Yes, where should I sign?" },
    { question: "Would you like me to call a taxi?", answer: "Yes, please. That would be great." },
    { question: "Would you mind if I sat here?", answer: "Not at all. Go ahead." },
    { question: "Would you pass me the bread?", answer: "Here you go." },
    { question: "Would you like your coffee with milk?", answer: "No, black is fine." },
    { question: "Would you prefer tea or coffee?", answer: "I'd prefer coffee, please." },
    { question: "Would you help me move this table?", answer: "Sure, let's do it together." },
    { question: "Would you like a receipt?", answer: "Yes, please." },
    { question: "Would you stay for dinner?", answer: "I'd love to. Thank you." }
  ]
};

// Module 57 Data: Be Going To vs Will (Future)
const MODULE_57_DATA = {
  title: "Module 57: Be Going To vs Will (Future)",
  description: "Understand the difference between 'will' and 'be going to' for future expressions.",
  intro: `Will: Ani kararlar, teklifler, sözler ve tahmine dayalı gelecek olaylar için kullanılır.
Örnek: "Kapıyı ben açacağım." → I will open the door.

Be going to: Planlanmış gelecek olaylar ve güçlü kanıta dayalı tahminler için kullanılır.
Örnek: "Yarın annemi ziyaret edeceğim." → I am going to visit my mom tomorrow.

Will (instant decisions / predictions / offers): I will help you. / I think it will rain tomorrow.
Be going to (plans / evidence-based predictions): I am going to visit my aunt. / Look at the clouds. It's going to rain.`,
  tip: "Use 'will' for spontaneous decisions and predictions. Use 'be going to' for planned actions and evidence-based predictions.",
  
  table: [
    { tense: "Will (Aff.)", structure: "Subject + will + verb", example: "She will call you." },
    { tense: "Will (Neg.)", structure: "Subject + will not (won't) + verb", example: "He won't come." },
    { tense: "Will (Ques.)", structure: "Will + subject + verb?", example: "Will you help me?" },
    { tense: "Be Going To (Aff.)", structure: "Subject + be + going to + verb", example: "I'm going to study." },
    { tense: "Be Going To (Neg.)", structure: "Subject + be + not + going to + V", example: "We're not going to travel." },
    { tense: "Be Going To (Ques.)", structure: "Be + subject + going to + verb?", example: "Are you going to eat?" }
  ],
  
  listeningExamples: [
    "I'm going to visit my grandparents.",
    "I'll help you.",
    "Are you going to study tonight?"
  ],
  
  speakingPractice: [
    { question: "What are you going to do this weekend?", answer: "I'm going to visit my grandparents." },
    { question: "Will you help me with the dishes?", answer: "Sure, I'll help you." },
    { question: "Are you going to study tonight?", answer: "Yes, I'm going to study English." },
    { question: "Will she come to the party?", answer: "No, she won't come." },
    { question: "Is it going to rain today?", answer: "Yes, look at the clouds. It's going to rain." },
    { question: "What will you eat for lunch?", answer: "I think I'll eat a sandwich." },
    { question: "Are they going to play football tomorrow?", answer: "Yes, they're going to play at 4 PM." },
    { question: "Will you be at the meeting on time?", answer: "Yes, I'll be there at 9." },
    { question: "What are you going to wear to the wedding?", answer: "I'm going to wear a black dress." },
    { question: "Will your brother call you later?", answer: "Yes, he'll call me tonight." },
    { question: "Are we going to have homework today?", answer: "Yes, we're going to have a short task." },
    { question: "Will he pass the test?", answer: "I think he will. He studied hard." },
    { question: "Are you going to cook dinner tonight?", answer: "Yes, I'm going to cook pasta." },
    { question: "Will it be sunny tomorrow?", answer: "No, it won't. It'll be cloudy." },
    { question: "Is she going to start a new job?", answer: "Yes, she's going to start next Monday." },
    { question: "Will you carry this bag for me?", answer: "Of course, I'll carry it." },
    { question: "What are you going to buy at the store?", answer: "I'm going to buy some fruit." },
    { question: "Will your parents arrive early?", answer: "No, they won't arrive before 10." },
    { question: "Are they going to watch a movie?", answer: "Yes, they're going to watch a comedy." },
    { question: "Will you open the window, please?", answer: "Sure, I'll open it." },
    { question: "Is he going to fix the car?", answer: "Yes, he's going to fix it tomorrow." },
    { question: "Will you go out tonight?", answer: "No, I'll stay home." },
    { question: "Are we going to have lunch together?", answer: "Yes, we're going to eat at 1." },
    { question: "Will they understand the lesson?", answer: "I think they'll understand." },
    { question: "What are you going to do after the course?", answer: "I'm going to travel abroad." },
    { question: "Will you lend me your book?", answer: "Yes, I'll bring it tomorrow." },
    { question: "Is it going to be a long meeting?", answer: "Yes, it's going to take two hours." },
    { question: "Will she visit her cousin in Germany?", answer: "No, she won't go this year." },
    { question: "What are you going to eat for breakfast?", answer: "I'm going to eat eggs and toast." },
    { question: "Will we take a test next week?", answer: "Yes, we'll take a short test." },
    { question: "Are they going to build a new school?", answer: "Yes, they're going to build it next year." },
    { question: "Will he come with us to the cinema?", answer: "Maybe. He'll decide later." },
    { question: "What are you going to say in your speech?", answer: "I'm going to thank everyone." },
    { question: "Will you call me when you arrive?", answer: "Yes, I'll call you right away." },
    { question: "Is the teacher going to explain the topic again?", answer: "Yes, she's going to explain it tomorrow." },
    { question: "Will it snow this weekend?", answer: "I think it will. It's very cold." },
    { question: "What are you going to study at university?", answer: "I'm going to study engineering." },
    { question: "Will you bring your laptop to the meeting?", answer: "Yes, I'll bring it with me." },
    { question: "Are your friends going to come to the picnic?", answer: "Yes, they're going to join us." },
    { question: "Will the shop be open on Sunday?", answer: "No, it won't be open." }
  ]
};

// Module 58 Data: Future Continuous
const MODULE_58_DATA = {
  title: "Module 58: Future Continuous",
  description: "Learn to use the Future Continuous Tense to describe actions in progress at a specific time in the future.",
  intro: `Future Continuous Tense, gelecekte belirli bir zamanda devam etmekte olan eylemleri anlatmak için kullanılır.

Kullanımı:
1. Belirli bir zamanda devam eden gelecek eylemleri tanımlamak:
→ At 10 PM, I will be studying.
2. Kibar bir şekilde gelecek planlarını sormak:
→ Will you be using the car tonight?
3. O anda neler oluyor olabileceğini tahmin etmek:
→ She will be working now.

Yapı: Subject + will be + verb-ing
Örnek: I will be working.`,
  tip: "Use Future Continuous for actions that will be in progress at a specific time in the future: will be + verb-ing.",
  
  table: [
    { tense: "Future Cont.", exampleAff: "I will be working.", exampleNeg: "I will not be working.", exampleQuestion: "Will you be working?" },
    { tense: "Future Cont.", exampleAff: "She will be sleeping.", exampleNeg: "She will not be sleeping.", exampleQuestion: "Will she be sleeping?" },
    { tense: "Future Cont.", exampleAff: "They will be traveling.", exampleNeg: "They will not be traveling.", exampleQuestion: "Will they be traveling?" }
  ],
  
  listeningExamples: [
    "I will be watching a documentary.",
    "They will be going to the countryside.",
    "He will be arriving at 6 PM."
  ],
  
  speakingPractice: [
    { question: "What will you be doing at 10 PM tonight?", answer: "I will be watching a documentary." },
    { question: "Will she be attending the meeting tomorrow?", answer: "Yes, she will be attending the meeting." },
    { question: "Where will they be going next weekend?", answer: "They will be going to the countryside." },
    { question: "Who will be using the computer in the morning?", answer: "My brother will be using it." },
    { question: "What time will he be arriving?", answer: "He will be arriving at 6 PM." },
    { question: "Will you be working on Saturday?", answer: "No, I won't be working." },
    { question: "Why will she be crying?", answer: "She will be watching a sad movie." },
    { question: "Will they be sleeping when we arrive?", answer: "Yes, they will be sleeping." },
    { question: "What will your parents be doing at this time tomorrow?", answer: "They will be flying to Germany." },
    { question: "Will we be staying at a hotel?", answer: "Yes, we will be staying at a hotel." },
    { question: "What will John be cooking for dinner?", answer: "He will be cooking spaghetti." },
    { question: "Will you be using the car tonight?", answer: "No, I'll be walking." },
    { question: "Why will she be studying all night?", answer: "Because she has a big test tomorrow." },
    { question: "What will you be wearing to the party?", answer: "I'll be wearing a blue dress." },
    { question: "Will he be playing football this weekend?", answer: "No, he will be resting." },
    { question: "What will the kids be doing during the trip?", answer: "They'll be watching movies." },
    { question: "Will the teacher be explaining the new topic?", answer: "Yes, she will be explaining it." },
    { question: "What will you be reading this evening?", answer: "I'll be reading a mystery novel." },
    { question: "When will she be arriving at the station?", answer: "She'll be arriving at 4 PM." },
    { question: "Will Tom be joining us for lunch?", answer: "Yes, he will be joining." },
    { question: "What will the dog be doing at home?", answer: "It will be sleeping on the sofa." },
    { question: "Will we be traveling by plane?", answer: "No, we'll be going by train." },
    { question: "Why will they be shouting?", answer: "Because they will be at a football match." },
    { question: "What will your sister be doing at noon?", answer: "She'll be eating lunch." },
    { question: "Will your mom be using the kitchen at 8 AM?", answer: "Yes, she'll be making breakfast." },
    { question: "Who will be working the night shift?", answer: "James will be working it." },
    { question: "Will the sun be shining tomorrow?", answer: "Yes, the forecast says it will." },
    { question: "What will you be buying at the store?", answer: "I'll be buying some vegetables." },
    { question: "Will they be dancing at the party?", answer: "Yes, everyone will be dancing." },
    { question: "Where will you be staying in London?", answer: "I'll be staying at a friend's house." },
    { question: "Will it be raining in the morning?", answer: "Probably, yes." },
    { question: "What will the children be watching?", answer: "They'll be watching cartoons." },
    { question: "Who will be driving us to the airport?", answer: "My uncle will be driving us." },
    { question: "What time will the guests be arriving?", answer: "They'll be arriving at 7 PM." },
    { question: "Will your brother be studying during the summer?", answer: "No, he'll be relaxing." },
    { question: "Why will you be meeting your boss?", answer: "To discuss a new project." },
    { question: "What will Anna be doing in Italy?", answer: "She'll be visiting historical sites." },
    { question: "Will we be using Zoom for the meeting?", answer: "Yes, the link has already been sent." },
    { question: "Where will the musicians be performing?", answer: "They'll be performing in the park." },
    { question: "What will your friends be talking about?", answer: "They'll be discussing their travel plans." }
  ]
};

// Module 59 Data: Present Perfect (Ever / Never)
const MODULE_59_DATA = {
  title: "Module 59: Present Perfect (Ever / Never)",
  description: "Learn to use Present Perfect with 'ever' and 'never' to describe life experiences",
  intro: `Present Perfect Tense, geçmişte yaşanmış ancak etkisi hâlen devam eden olayları anlatmak için kullanılır.

Yapı: Subject + have/has + V3 (fiilin 3. hali)

"Ever": Sorularda, daha önce hiç anlamında.
Örnek: Have you ever eaten sushi? (Hiç sushi yedin mi?)

"Never": Hiçbir zaman anlamında, olumsuz cümlelerde.
Örnek: I have never flown in a helicopter. (Hiç helikoptere binmedim.)`,
  tip: "Use 'ever' in questions about life experiences. Use 'never' in negative statements about things you haven't done.",
  
  table: [
    { tense: "Present Perfect", affirmative: "I have visited London.", negative: "I have never visited London.", question: "Have you ever visited London?" },
    { tense: "Ever/Never", affirmative: "She has tried sushi.", negative: "She has never tried sushi.", question: "Has she ever tried sushi?" },
    { tense: "Ever/Never", affirmative: "They have seen that movie.", negative: "They have never seen that movie.", question: "Have they ever seen that movie?" }
  ],
  
  listeningExamples: [
    "I have climbed Mount Erciyes.",
    "She has never eaten octopus.",
    "Have you ever met a celebrity?"
  ],
  
  speakingPractice: [
    { question: "Have you ever climbed a mountain?", answer: "Yes, I have climbed Mount Erciyes." },
    { question: "Has she ever eaten octopus?", answer: "No, she has never eaten octopus." },
    { question: "Have they ever traveled to Asia?", answer: "Yes, they have been to Japan and Thailand." },
    { question: "Have you ever broken a bone?", answer: "No, I have never broken a bone." },
    { question: "Has he ever driven a sports car?", answer: "Yes, he has driven a Ferrari once." },
    { question: "Have you ever met a celebrity?", answer: "Yes, I have met a famous actor." },
    { question: "Have your parents ever flown in a helicopter?", answer: "No, they have never flown in one." },
    { question: "Has she ever gone scuba diving?", answer: "Yes, she has gone scuba diving in the Maldives." },
    { question: "Have you ever cooked Turkish kebab?", answer: "Yes, I have cooked it many times." },
    { question: "Has he ever been to New York?", answer: "No, he has never been to New York." },
    { question: "Have you ever watched a horror movie alone?", answer: "Yes, I have. It was scary!" },
    { question: "Has she ever written a poem?", answer: "Yes, she has written several poems." },
    { question: "Have they ever visited a museum in Paris?", answer: "No, they have never been to Paris." },
    { question: "Have you ever tried skiing?", answer: "Yes, I have tried skiing once." },
    { question: "Has he ever played the guitar?", answer: "Yes, he has played it for 5 years." },
    { question: "Have you ever failed an exam?", answer: "Yes, I have failed one math test." },
    { question: "Has your brother ever worked abroad?", answer: "No, he has never worked abroad." },
    { question: "Have you ever eaten something very spicy?", answer: "Yes, I have eaten extremely spicy curry." },
    { question: "Has she ever lived in another country?", answer: "Yes, she has lived in Spain." },
    { question: "Have you ever forgotten someone's birthday?", answer: "Yes, unfortunately I have." },
    { question: "Have they ever danced in the rain?", answer: "Yes, they have. It was fun." },
    { question: "Has he ever painted a picture?", answer: "No, he has never painted anything." },
    { question: "Have you ever lost your phone?", answer: "Yes, I have lost it twice." },
    { question: "Has she ever sung in public?", answer: "Yes, she has sung at a wedding." },
    { question: "Have you ever been late for a flight?", answer: "No, I have never been late." },
    { question: "Has he ever eaten raw fish?", answer: "Yes, he has tried sushi." },
    { question: "Have they ever seen snow?", answer: "No, they have never seen snow." },
    { question: "Has she ever read a Harry Potter book?", answer: "Yes, she has read all of them." },
    { question: "Have you ever cried during a movie?", answer: "Yes, I have cried many times." },
    { question: "Has your teacher ever shouted in class?", answer: "No, she has never shouted." },
    { question: "Have you ever played chess?", answer: "Yes, I have played with my uncle." },
    { question: "Has your dog ever run away?", answer: "No, he has never run away." },
    { question: "Have you ever taken a dance class?", answer: "Yes, I have taken salsa classes." },
    { question: "Has he ever flown a drone?", answer: "Yes, he has flown it in the park." },
    { question: "Have your friends ever tried Turkish delight?", answer: "Yes, they have loved it." },
    { question: "Has she ever forgotten her keys?", answer: "Yes, she has forgotten them a few times." },
    { question: "Have you ever painted your room?", answer: "Yes, I have painted it light blue." },
    { question: "Has he ever fallen asleep in class?", answer: "Yes, he has. It was embarrassing." },
    { question: "Have they ever ridden a horse?", answer: "Yes, they have ridden horses on a farm." },
    { question: "Has your dad ever made breakfast?", answer: "Yes, he has. He makes great omelets!" }
  ]
};

// Module 60 Data: Present Perfect: just / already / yet
const MODULE_60_DATA = {
  title: "Module 60: Present Perfect: just / already / yet",
  description: "Learn to use Present Perfect with time adverbs just, already, and yet",
  intro: `Present Perfect (have/has + V3) geçmişte tamamlanan ama etkisi şu ana kadar süren olayları anlatmak için kullanılır.

just → "Az önce / yeni" anlamında, çok kısa zaman önce yapılmış bir şey için.
already → "Zaten / çoktan" anlamında, beklenenden önce gerçekleşmiş bir eylem için.
yet → "Henüz" anlamında, sadece soru ve olumsuz cümlelerde kullanılır.

Yapı:
• Affirmative: S + have/has + V3 + just/already → She has already eaten.
• Negative: S + haven't/hasn't + V3 + yet → I haven't seen it yet.
• Question: Have/Has + S + V3 + yet? → Have you done your homework yet?`,
  tip: "Use 'just' for very recent actions, 'already' for earlier than expected completion, and 'yet' only in questions and negatives.",
  
  table: [
    { type: "just", structure: "have/has + just + V3", example: "I have just finished my homework." },
    { type: "already", structure: "have/has + already + V3", example: "She has already eaten lunch." },
    { type: "yet (question)", structure: "Have/Has + S + V3 + yet?", example: "Have you finished yet?" },
    { type: "yet (negative)", structure: "haven't/hasn't + V3 + yet", example: "I haven't seen it yet." }
  ],
  
  listeningExamples: [
    "I have already finished my homework.",
    "Have you called your friend yet?",
    "I have just arrived home."
  ],
  
  speakingPractice: [
    { question: "Have you already finished your homework?", answer: "Yes, I have already finished my homework." },
    { question: "Have you called your friend yet?", answer: "No, I haven't called my friend yet." },
    { question: "Have you just seen the new movie?", answer: "Yes, I have just seen the new movie." },
    { question: "Have you already cleaned your room?", answer: "Yes, I have already cleaned it." },
    { question: "Have you eaten dinner yet?", answer: "No, I haven't eaten yet." },
    { question: "Have you just arrived home?", answer: "Yes, I've just arrived." },
    { question: "Have you already paid the bill?", answer: "Yes, I've already paid it." },
    { question: "Has she called you yet?", answer: "No, she hasn't called me yet." },
    { question: "Have they just left the house?", answer: "Yes, they've just left." },
    { question: "Has he already started the project?", answer: "Yes, he has already started." },
    { question: "Have you washed the dishes yet?", answer: "No, not yet." },
    { question: "Have you just talked to your teacher?", answer: "Yes, I have." },
    { question: "Have you already finished the book?", answer: "Yes, I have already finished it." },
    { question: "Has your mom cooked dinner yet?", answer: "No, she hasn't." },
    { question: "Have you just woken up?", answer: "Yes, I've just woken up." },
    { question: "Have you already taken a shower?", answer: "Yes, I've already taken it." },
    { question: "Have you submitted your homework yet?", answer: "No, I haven't submitted it yet." },
    { question: "Have you just sent the email?", answer: "Yes, I've just sent it." },
    { question: "Have you already bought the tickets?", answer: "Yes, I've already bought them." },
    { question: "Have you seen the news yet?", answer: "No, I haven't seen it yet." },
    { question: "Has he just joined the meeting?", answer: "Yes, he has." },
    { question: "Has your teacher explained the topic yet?", answer: "No, not yet." },
    { question: "Have you already spoken to the manager?", answer: "Yes, I have." },
    { question: "Have they just finished their meal?", answer: "Yes, they have." },
    { question: "Have you cleaned your desk yet?", answer: "No, I haven't cleaned it yet." },
    { question: "Have you already chosen your course?", answer: "Yes, I have." },
    { question: "Have you sent the file yet?", answer: "No, not yet." },
    { question: "Have you just come back from work?", answer: "Yes, I have." },
    { question: "Have you already visited the museum?", answer: "Yes, I've already been there." },
    { question: "Have you written the report yet?", answer: "No, I haven't written it yet." },
    { question: "Have you already eaten lunch?", answer: "Yes, I've already eaten." },
    { question: "Have you called your mom yet?", answer: "No, not yet." },
    { question: "Have you just arrived at school?", answer: "Yes, just now." },
    { question: "Has he already gone to bed?", answer: "Yes, he has." },
    { question: "Have you checked your messages yet?", answer: "No, I haven't checked yet." },
    { question: "Have you already done your project?", answer: "Yes, I have." },
    { question: "Have they finished their homework yet?", answer: "No, not yet." },
    { question: "Have you just finished your tea?", answer: "Yes, I have." },
    { question: "Has she replied to the email yet?", answer: "No, she hasn't." },
    { question: "Have you already decided your vacation plan?", answer: "Yes, I've already planned it." }
  ]
};

// Module 61 Data: Present Perfect: for / since
const MODULE_61_DATA = {
  title: "Module 61: Present Perfect: for / since",
  description: "Learn to use Present Perfect with 'for' and 'since' to express duration",
  intro: `Present Perfect Tense (have/has + V3), geçmişte başlayıp şu ana kadar devam eden olayları anlatmak için kullanılır.

for → belirli bir zaman süresi boyunca
since → belli bir başlangıç zamanından beri

Yapı:
• Affirmative: S + have/has + V3 + for/since → I have lived here for 10 years.
• Negative: S + haven't/hasn't + V3 + for/since → She hasn't seen him since Monday.
• Question: Have/Has + S + V3 + for/since? → Have you worked here since 2020?`,
  tip: "Use 'for' with periods of time (for 3 years). Use 'since' with starting points in time (since 2020).",
  
  table: [
    { timeWord: "for", usage: "+ period of time", example: "I have lived here for 10 years." },
    { timeWord: "since", usage: "+ starting point", example: "She has worked here since 2015." },
    { timeWord: "for", usage: "+ duration", example: "They have been married for 5 years." },
    { timeWord: "since", usage: "+ specific time", example: "We have known each other since childhood." }
  ],
  
  listeningExamples: [
    "I have known my best friend since 2010.",
    "I have lived in this city for 5 years.",
    "She has worked here since June."
  ],
  
  speakingPractice: [
    { question: "How long have you known your best friend?", answer: "I have known my best friend since 2010." },
    { question: "How long have you lived in this city?", answer: "I have lived in this city for 5 years." },
    { question: "How long have you studied English?", answer: "I have studied English since 2018." },
    { question: "How long has she worked here?", answer: "She has worked here for 2 years." },
    { question: "Have you lived here since childhood?", answer: "Yes, I have lived here since I was a child." },
    { question: "How long have they been married?", answer: "They have been married for 10 years." },
    { question: "Have you known him for a long time?", answer: "Yes, I have known him for 7 years." },
    { question: "How long has he been sick?", answer: "He has been sick since yesterday." },
    { question: "How long have you had that phone?", answer: "I have had it since last summer." },
    { question: "Have you worked there for long?", answer: "Yes, for over 3 years." },
    { question: "How long has she lived in Paris?", answer: "Since 2020." },
    { question: "How long have you been awake?", answer: "I've been awake for 2 hours." },
    { question: "Has he stayed with you since Monday?", answer: "Yes, he has." },
    { question: "How long have they waited?", answer: "They've waited for 45 minutes." },
    { question: "Have you used this computer since morning?", answer: "Yes, I have." },
    { question: "How long have you had that dog?", answer: "I've had him since 2019." },
    { question: "How long have you loved music?", answer: "Since I was a kid." },
    { question: "Has your teacher taught you for a year?", answer: "Yes, she has." },
    { question: "How long has she worn glasses?", answer: "For 6 months." },
    { question: "Have you been at home since the morning?", answer: "Yes, I have." },
    { question: "How long has he played the piano?", answer: "Since high school." },
    { question: "How long have they had that car?", answer: "For 2 years." },
    { question: "Has she worked in that office since June?", answer: "Yes, she has." },
    { question: "How long have you been friends?", answer: "Since childhood." },
    { question: "Have you studied here for 3 years?", answer: "Yes, I have." },
    { question: "How long have they lived together?", answer: "For a few months." },
    { question: "Has your mom worked since morning?", answer: "Yes, nonstop!" },
    { question: "How long have you had your job?", answer: "Since 2021." },
    { question: "Have you lived in this house for long?", answer: "Yes, for 10 years." },
    { question: "How long has your dad driven trucks?", answer: "Since 2005." },
    { question: "How long have you played football?", answer: "For 6 years." },
    { question: "Have you known her since high school?", answer: "Yes, I have." },
    { question: "How long have you been in Turkey?", answer: "Since April." },
    { question: "How long have you waited in line?", answer: "For 30 minutes." },
    { question: "Has he worn that jacket since winter?", answer: "Yes, he loves it." },
    { question: "How long have you felt sick?", answer: "Since last night." },
    { question: "Have they watched that show for a week?", answer: "Yes, every day." },
    { question: "How long have you kept this secret?", answer: "Since last year." },
    { question: "How long has your grandma lived there?", answer: "Since 1990." },
    { question: "How long have you used this app?", answer: "For 2 months." }
  ]
};

// Module 62 Data: Present Perfect vs Past Simple
const MODULE_62_DATA = {
  title: "Module 62: Present Perfect vs Past Simple",
  description: "Learn the differences between Present Perfect and Past Simple tenses",
  intro: `Present Perfect (have/has + V3) → Geçmişte ne zaman olduğu önemli olmayan olaylar, sonucu şu anı etkiler.
Past Simple (V2) → Geçmişte belirli bir zamanda olan olaylar.

Present Perfect için kullanılan zaman ifadeleri: ever, never, just, already, yet, for, since
Past Simple için zaman ifadeleri: yesterday, last year, in 2020, two days ago, etc.

Örnek:
– I have eaten lunch. → Present Perfect (Ne zaman olduğu önemli değil.)
– I ate lunch at 12. → Past Simple (Zaman belli.)`,
  tip: "Use Present Perfect when time is not specified or continues to now. Use Past Simple when time is specified and finished.",
  
  table: [
    { tense: "Present Perfect", example: "I have seen that movie before.", explanation: "Zaman belirtilmemiş" },
    { tense: "Past Simple", example: "I saw that movie last week.", explanation: "Belirli zaman var" },
    { tense: "Present Perfect", example: "She has worked here for five years.", explanation: "Hala çalışıyor" },
    { tense: "Past Simple", example: "She worked here in 2010.", explanation: "Geçmişte tamamlanmış" }
  ],
  
  listeningExamples: [
    "I have visited London before.",
    "I visited London in 2023.",
    "Have you ever eaten sushi?"
  ],
  
  speakingPractice: [
    { question: "Have you ever visited London?", answer: "Yes, I have visited London before." },
    { question: "Did you visit London last year?", answer: "Yes, I visited London in 2023." },
    { question: "Have you ever eaten sushi?", answer: "Yes, I have eaten sushi before." },
    { question: "Did you eat sushi yesterday?", answer: "Yes, I ate it for dinner." },
    { question: "Have you ever met a famous person?", answer: "Yes, I have met one." },
    { question: "Did you meet anyone famous last week?", answer: "No, I didn't." },
    { question: "Have you traveled abroad?", answer: "Yes, I have traveled to Italy." },
    { question: "Did you travel last summer?", answer: "Yes, I went to Spain." },
    { question: "Have you ever broken a bone?", answer: "Yes, I have broken my arm." },
    { question: "Did you break your arm last year?", answer: "Yes, I did." },
    { question: "Have you seen this movie before?", answer: "Yes, I have seen it." },
    { question: "Did you see this movie on Monday?", answer: "Yes, I saw it." },
    { question: "Have you ever ridden a horse?", answer: "Yes, I have." },
    { question: "Did you ride a horse last weekend?", answer: "No, not last weekend." },
    { question: "Have you visited Paris?", answer: "Yes, I have visited it." },
    { question: "Did you visit Paris in 2020?", answer: "Yes, I did." },
    { question: "Have you ever lost your phone?", answer: "Yes, once." },
    { question: "Did you lose your phone yesterday?", answer: "No, not yesterday." },
    { question: "Have you read this book?", answer: "Yes, I have read it." },
    { question: "Did you read the book last week?", answer: "Yes, I did." },
    { question: "Have you heard this song before?", answer: "Yes, I've heard it." },
    { question: "Did you hear the song this morning?", answer: "Yes, I did." },
    { question: "Have you cleaned your room yet?", answer: "Yes, I have." },
    { question: "Did you clean your room yesterday?", answer: "No, I didn't." },
    { question: "Have you ever been to a concert?", answer: "Yes, I have." },
    { question: "Did you go to the concert on Saturday?", answer: "Yes, I went." },
    { question: "Have you ever tried Turkish food?", answer: "Yes, I have tried it." },
    { question: "Did you eat Turkish food last night?", answer: "No, I didn't." },
    { question: "Have you finished your homework?", answer: "Yes, I have." },
    { question: "Did you finish it this morning?", answer: "Yes, I did." },
    { question: "Have you seen Ali today?", answer: "No, not yet." },
    { question: "Did you see Ali yesterday?", answer: "Yes, I did." },
    { question: "Have you spoken to your boss?", answer: "Yes, I have." },
    { question: "Did you speak to him yesterday?", answer: "No, I didn't." },
    { question: "Have you written the email?", answer: "Yes, I've written it." },
    { question: "Did you write the email on Friday?", answer: "Yes, I did." },
    { question: "Have you ever been to Cappadocia?", answer: "Yes, I've been there once." },
    { question: "Did you go there last year?", answer: "No, I didn't." },
    { question: "Have you cleaned the kitchen?", answer: "Yes, I've already cleaned it." },
    { question: "Did you clean the kitchen last night?", answer: "Yes, I did." }
  ]
};

// Module 63 Data: Too / Enough
const MODULE_63_DATA = {
  title: "Module 63: Too / Enough",
  description: "Learn to use 'too' for excess and 'enough' for sufficiency",
  intro: `Too → Gereğinden fazla anlamına gelir. Genellikle olumsuz bir anlam taşır.
→ Yapı: too + sıfat/zarf
• Örnek: This coffee is too hot. (Bu kahve çok sıcak, içemem.)

Enough → Yeterli miktarda anlamına gelir. Olumlu veya olumsuz olabilir.
→ Yapılar:
• sıfat/zarf + enough (örn: tall enough)
• enough + isim (örn: enough money)
• Örnek: We have enough chairs. (Yeterince sandalyemiz var.)`,
  tip: "Use 'too' before adjectives/adverbs to show excess. Use 'enough' after adjectives or before nouns to show sufficiency.",
  
  table: [
    { structure: "too + adjective", example: "This coffee is too hot.", turkish: "Bu kahve çok sıcak." },
    { structure: "adjective + enough", example: "He isn't fast enough to win.", turkish: "Kazanacak kadar hızlı değil." },
    { structure: "enough + noun", example: "We don't have enough chairs.", turkish: "Yeterince sandalyemiz yok." },
    { structure: "too + adjective + to", example: "The bag is too heavy to carry.", turkish: "Çanta taşımak için çok ağır." }
  ],
  
  listeningExamples: [
    "The soup was too salty.",
    "It's too heavy for him.",
    "We have enough space for everyone."
  ],
  
  speakingPractice: [
    { question: "Why didn't she eat the soup?", answer: "Because it was too salty." },
    { question: "Can he lift that box?", answer: "No, it's too heavy for him." },
    { question: "Is there enough space in the car for everyone?", answer: "Yes, there is enough space for all of us." },
    { question: "Why can't you reach the shelf?", answer: "Because I'm not tall enough." },
    { question: "Did you buy the dress?", answer: "No, it was too expensive." },
    { question: "Can we start the meeting?", answer: "Yes, we have enough people here." },
    { question: "Why didn't you finish the marathon?", answer: "Because I wasn't fit enough." },
    { question: "Is the music too loud?", answer: "Yes, it's too loud for studying." },
    { question: "Do you have enough money for the trip?", answer: "Yes, I have enough money." },
    { question: "Why can't the child ride the bike?", answer: "Because he's too young." },
    { question: "Is the coffee hot enough?", answer: "Yes, it's hot enough to drink." },
    { question: "Why didn't you buy more bread?", answer: "Because we have enough bread." },
    { question: "Can you hear the teacher?", answer: "No, her voice is too quiet." },
    { question: "Is your English good enough for the job?", answer: "Yes, it's good enough." },
    { question: "Why didn't you eat all the food?", answer: "Because there was too much food." },
    { question: "Can the students understand the lesson?", answer: "No, it's too difficult for them." },
    { question: "Do we have enough time for lunch?", answer: "Yes, we have enough time." },
    { question: "Why didn't you wear the sweater?", answer: "Because it was too big." },
    { question: "Is the water warm enough for swimming?", answer: "Yes, it's warm enough." },
    { question: "Why can't you lift the table alone?", answer: "Because it's too heavy for one person." },
    { question: "Do you have enough chairs for the party?", answer: "Yes, we have enough chairs." },
    { question: "Why didn't you finish reading the book?", answer: "Because it was too boring." },
    { question: "Is your car fast enough for the highway?", answer: "Yes, it's fast enough." },
    { question: "Why didn't you go to the concert?", answer: "Because the tickets were too expensive." },
    { question: "Do we have enough ingredients for the cake?", answer: "Yes, we have enough ingredients." },
    { question: "Why can't you see the movie screen?", answer: "Because the person in front is too tall." },
    { question: "Is the room big enough for the meeting?", answer: "Yes, it's big enough for everyone." },
    { question: "Why didn't you buy the phone?", answer: "Because it was too complicated." },
    { question: "Do you have enough experience for this job?", answer: "Yes, I have enough experience." },
    { question: "Why can't the baby walk yet?", answer: "Because he's too young to walk." },
    { question: "Is the soup salty enough?", answer: "Yes, it's salty enough." },
    { question: "Why didn't you attend the party?", answer: "Because I was too tired." },
    { question: "Do we have enough gas for the trip?", answer: "Yes, we have enough gas." },
    { question: "Why can't you read that sign?", answer: "Because it's too far away." },
    { question: "Is your computer fast enough for gaming?", answer: "Yes, it's fast enough." },
    { question: "Why didn't you eat the pizza?", answer: "Because it was too spicy for me." },
    { question: "Do you have enough batteries for the remote?", answer: "Yes, I have enough batteries." },
    { question: "Why can't you solve this problem?", answer: "Because it's too difficult." },
    { question: "Is the weather warm enough for a picnic?", answer: "Yes, it's warm enough." },
    { question: "Why didn't you finish the race?", answer: "Because I was too exhausted." }
  ]
};

// Module 64 Data: So / Such
const MODULE_64_DATA = {
  title: "Module 64: So / Such",
  description: "Learn to use 'so' with adjectives/adverbs and 'such' with nouns for emphasis",
  intro: `So → Bir sıfat veya zarfla birlikte kullanılır, bir şeyin derecesini vurgular.
→ Yapı: so + sıfat/zarf
• Örnek: The movie was so interesting. (Film çok ilginçti.)

Such → Bir isimle birlikte kullanılır, genellikle önünde sıfat olur.
→ Yapı: such + (sıfat) + isim
• Örnek: It was such a beautiful day. (O kadar güzel bir gündü ki.)`,
  tip: "Use 'so' before adjectives and adverbs. Use 'such' before nouns (usually with adjectives).",
  
  table: [
    { structure: "so + adjective", example: "He is so tall.", turkish: "O çok uzun boylu." },
    { structure: "so + adverb", example: "They arrived so early.", turkish: "Çok erken geldiler." },
    { structure: "such + adj + noun", example: "It was such a cold night.", turkish: "O kadar soğuk bir geceydi ki." },
    { structure: "such + adj + noun", example: "She has such nice friends.", turkish: "Çok hoş arkadaşları var." }
  ],
  
  listeningExamples: [
    "She is such a good teacher.",
    "The concert was so exciting!",
    "It was such an amazing movie."
  ],
  
  speakingPractice: [
    { question: "What kind of teacher is she?", answer: "She is such a good teacher." },
    { question: "Why did you like the concert?", answer: "Because it was so exciting!" },
    { question: "How was the movie last night?", answer: "It was such an amazing movie." },
    { question: "Why are you so tired?", answer: "Because I worked so hard today." },
    { question: "What do you think of her house?", answer: "It's such a beautiful house." },
    { question: "How was the weather yesterday?", answer: "It was so sunny and warm." },
    { question: "Why didn't you finish the book?", answer: "Because it was such a boring story." },
    { question: "How did the students perform?", answer: "They did so well on the test." },
    { question: "What's your opinion of the restaurant?", answer: "They serve such delicious food." },
    { question: "Why are you laughing?", answer: "Because he told such a funny joke." },
    { question: "How was your vacation?", answer: "We had such a great time." },
    { question: "Why did you buy that car?", answer: "Because it was so affordable." },
    { question: "What do you think of her singing?", answer: "She has such a lovely voice." },
    { question: "How was the traffic this morning?", answer: "It was so heavy and slow." },
    { question: "Why do you like that café?", answer: "Because they make such good coffee." },
    { question: "How did you find the exam?", answer: "It was so difficult and long." },
    { question: "What's special about her garden?", answer: "She grows such beautiful flowers." },
    { question: "Why are you speaking quietly?", answer: "Because the baby is sleeping so peacefully." },
    { question: "How was the party last night?", answer: "We met such interesting people." },
    { question: "Why didn't you like the hotel?", answer: "Because the rooms were so small." },
    { question: "What impressed you about the city?", answer: "It has such amazing architecture." },
    { question: "How did you sleep last night?", answer: "I slept so deeply and comfortably." },
    { question: "Why do you recommend that book?", answer: "Because it has such an interesting plot." },
    { question: "How was the presentation?", answer: "The speaker was so clear and confident." },
    { question: "What do you think of their new house?", answer: "They have such a spacious kitchen." },
    { question: "Why are you worried about the test?", answer: "Because the questions are so challenging." },
    { question: "How was your first day at work?", answer: "I met such helpful colleagues." },
    { question: "Why did you enjoy the concert?", answer: "Because the music was so beautiful." },
    { question: "What makes her special as a friend?", answer: "She has such a kind heart." },
    { question: "How was the food at the wedding?", answer: "Everything was so delicious and fresh." },
    { question: "Why do you like living here?", answer: "Because it's such a peaceful neighborhood." },
    { question: "How did the children behave?", answer: "They were so well-behaved and polite." },
    { question: "What impressed you about the museum?", answer: "They have such rare artifacts." },
    { question: "Why are you excited about tomorrow?", answer: "Because we're going to such an amazing place." },
    { question: "How was the customer service?", answer: "The staff were so friendly and helpful." },
    { question: "What do you think of her new job?", answer: "She found such a perfect opportunity." },
    { question: "Why did you choose this university?", answer: "Because it has such excellent professors." },
    { question: "How was your hiking experience?", answer: "The views were so breathtaking." },
    { question: "What makes this restaurant unique?", answer: "They create such creative dishes." },
    { question: "Why are you proud of your team?", answer: "Because they worked so hard together." }
  ]
};

// Module 65 Data: Modal Verbs: Should / Ought to
const MODULE_65_DATA = {
  title: "Module 65: Modal Verbs: Should / Ought to",
  description: "Learn to give advice using 'should' and 'ought to'",
  intro: `Should → Tavsiye vermek için kullanılır.
→ Yapı: should + fiil
• Örnek: You should eat more vegetables. (Daha fazla sebze yemelisin.)

Ought to → "Should" ile aynı anlama gelir, ama daha resmidir.
→ Yapı: ought to + fiil
• Örnek: You ought to apologize. (Özür dilemelisin.)

Yapı:
• Affirmative: S + should/ought to + base verb → You should rest. / You ought to study.
• Negative: S + shouldn't + base verb → He shouldn't drive so fast.
• Question: Should + S + base verb? → Should we go now?`,
  tip: "Use 'should' and 'ought to' to give advice. 'Should' is more common in everyday conversation.",
  
  table: [
    { type: "Affirmative", structure: "S + should/ought to + base verb", example: "You should rest." },
    { type: "Negative", structure: "S + shouldn't + base verb", example: "He shouldn't drive so fast." },
    { type: "Question", structure: "Should + S + base verb?", example: "Should we go now?" },
    { type: "Ought to", structure: "S + ought to + base verb", example: "You ought to apologize." }
  ],
  
  listeningExamples: [
    "You should see a doctor.",
    "He should be more responsible.",
    "Should we leave now?"
  ],
  
  speakingPractice: [
    { question: "What should I do if I'm sick?", answer: "You should see a doctor." },
    { question: "Should he be more responsible?", answer: "Yes, he should be more responsible." },
    { question: "What ought I to say?", answer: "You ought to tell the truth." },
    { question: "Should we leave now?", answer: "Yes, we should leave before it gets dark." },
    { question: "What should I wear to the interview?", answer: "You should wear formal clothes." },
    { question: "Should she study more for the exam?", answer: "Yes, she should study harder." },
    { question: "What ought we to do about the problem?", answer: "We ought to discuss it with the manager." },
    { question: "Should I call him back?", answer: "Yes, you should call him immediately." },
    { question: "What should they bring to the party?", answer: "They should bring some snacks." },
    { question: "Should we book the tickets early?", answer: "Yes, you should book them now." },
    { question: "What should I eat for breakfast?", answer: "You should eat something healthy." },
    { question: "Should he apologize for his mistake?", answer: "Yes, he should apologize immediately." },
    { question: "What ought I to buy for her birthday?", answer: "You ought to buy something she likes." },
    { question: "Should we take an umbrella?", answer: "Yes, you should take one." },
    { question: "What should I do to improve my English?", answer: "You should practice speaking daily." },
    { question: "Should they save more money?", answer: "Yes, they should save for the future." },
    { question: "What ought we to tell the children?", answer: "We ought to tell them the truth." },
    { question: "Should I exercise more often?", answer: "Yes, you should exercise regularly." },
    { question: "What should she do about her job?", answer: "She should talk to her boss." },
    { question: "Should we invite more people?", answer: "Yes, you should invite your friends." },
    { question: "What should I cook for dinner?", answer: "You should cook something simple." },
    { question: "Should he drive more carefully?", answer: "Yes, he should be more careful." },
    { question: "What ought I to say in the meeting?", answer: "You ought to express your opinion clearly." },
    { question: "Should we arrive early?", answer: "Yes, you should arrive on time." },
    { question: "What should I do with my free time?", answer: "You should learn a new hobby." },
    { question: "Should she change her major?", answer: "She should think carefully about it." },
    { question: "What ought we to do for the environment?", answer: "We ought to recycle more." },
    { question: "Should I buy a new phone?", answer: "You should only if you need it." },
    { question: "What should they do for vacation?", answer: "They should visit somewhere relaxing." },
    { question: "Should we help our neighbors?", answer: "Yes, we should be helpful." },
    { question: "What should I read to improve my knowledge?", answer: "You should read educational books." },
    { question: "Should he quit his job?", answer: "He should consider all options first." },
    { question: "What ought I to do about my health?", answer: "You ought to see a specialist." },
    { question: "Should we trust him?", answer: "You should be careful about trust." },
    { question: "What should I do to make friends?", answer: "You should join social activities." },
    { question: "Should she learn a new language?", answer: "Yes, she should start with Spanish." },
    { question: "What ought we to do about the noise?", answer: "We ought to complain to the landlord." },
    { question: "Should I invest my money?", answer: "You should research investments first." },
    { question: "What should they do for their anniversary?", answer: "They should celebrate together." },
    { question: "Should we prepare for the presentation?", answer: "Yes, you should practice beforehand." }
  ]
};

// Module 66 Data: Modal Verb: "Could" (Possibility)
const MODULE_66_DATA = {
  title: "Module 66: Modal Verb: 'Could' (Possibility)",
  description: "Learn to use 'could' to express possibility and uncertainty",
  intro: `"Could" → Bir olayın mümkün olabileceğini ama kesin olmadığını anlatır.

Kullanım Alanları:
1. Olasılık Bildirme → It could rain tomorrow. (Yarın yağmur yağabilir.)
2. Varsayım Bildirme → He could be at home now. (Şu anda evde olabilir.)
3. Koşullu Cümleler → If we hurry, we could catch the train. (Acele edersek treni yakalayabiliriz.)

Yapı (Structure): Özne + could + fiil
(Not: Bu modülde "could" sadece olasılık anlamında kullanılır.)`,
  tip: "Use 'could' to express possibility when you're not certain about something.",
  
  table: [
    { subject: "I", could: "could", baseVerb: "win", exampleSentence: "I could win the game." },
    { subject: "She", could: "could", baseVerb: "be", exampleSentence: "She could be late." },
    { subject: "We", could: "could", baseVerb: "go", exampleSentence: "We could go to the cinema." },
    { subject: "They", could: "could", baseVerb: "arrive", exampleSentence: "They could arrive early." }
  ],
  
  listeningExamples: [
    "It could rain tomorrow.",
    "She could be at the office now.",
    "We could visit them next week."
  ],
  
  speakingPractice: [
    { question: "Could it rain tomorrow?", answer: "Yes, it could." },
    { question: "Could she be at the office now?", answer: "Yes, she could." },
    { question: "Could they come to the party?", answer: "Yes, they could." },
    { question: "Could he be tired after work?", answer: "Yes, he could." },
    { question: "Could we visit them next week?", answer: "Yes, we could." },
    { question: "Could you help me later?", answer: "Yes, I could." },
    { question: "Could the dog be hungry?", answer: "Yes, it could." },
    { question: "Could it be dangerous?", answer: "Yes, it could." },
    { question: "Could she win the contest?", answer: "Yes, she could." },
    { question: "Could he forget his keys?", answer: "Yes, he could." },
    { question: "Could I join the club?", answer: "Yes, you could." },
    { question: "Could they be lost?", answer: "Yes, they could." },
    { question: "Could it snow tonight?", answer: "Yes, it could." },
    { question: "Could she be sleeping?", answer: "Yes, she could." },
    { question: "Could the kids be at school?", answer: "Yes, they could." },
    { question: "Could we be wrong?", answer: "Yes, we could." },
    { question: "Could this be the solution?", answer: "Yes, it could." },
    { question: "Could you explain it again?", answer: "Yes, I could." },
    { question: "Could he be watching TV?", answer: "Yes, he could." },
    { question: "Could I talk to the manager?", answer: "Yes, you could." },
    { question: "Could she understand the question?", answer: "Yes, she could." },
    { question: "Could the train be late?", answer: "Yes, it could." },
    { question: "Could they call us tomorrow?", answer: "Yes, they could." },
    { question: "Could it happen again?", answer: "Yes, it could." },
    { question: "Could I try that?", answer: "Yes, you could." },
    { question: "Could he finish it today?", answer: "Yes, he could." },
    { question: "Could we meet at 6?", answer: "Yes, we could." },
    { question: "Could you wait a minute?", answer: "Yes, I could." },
    { question: "Could she be your teacher?", answer: "Yes, she could." },
    { question: "Could they be playing outside?", answer: "Yes, they could." },
    { question: "Could it be broken?", answer: "Yes, it could." },
    { question: "Could he be lying?", answer: "Yes, he could." },
    { question: "Could you do it alone?", answer: "Yes, I could." },
    { question: "Could she be your neighbor?", answer: "Yes, she could." },
    { question: "Could we win the game?", answer: "Yes, we could." },
    { question: "Could the weather change?", answer: "Yes, it could." },
    { question: "Could it be a mistake?", answer: "Yes, it could." },
    { question: "Could he be famous?", answer: "Yes, he could." },
    { question: "Could they know the answer?", answer: "Yes, they could." },
    { question: "Could I be wrong?", answer: "Yes, you could." }
  ]
};

// Module 67 Data: Modal Verbs: "May" and "Might" (Possibility)
const MODULE_67_DATA = {
  title: "Module 67: Modal Verbs: 'May' and 'Might' (Possibility)",
  description: "Learn to use 'may' and 'might' to express different levels of possibility",
  intro: `"May" ve "might", bir şeyin olabileceğini ifade eder (olasılık bildirir).

Farkları:
• May → Daha yüksek ihtimal
• Might → Daha düşük ihtimal (ama benzer anlamda kullanılır)

Günlük konuşmalarda birbirlerinin yerine kullanılabilirler.

Yapı (Structure): Özne + may/might + fiil

Örnekler:
• It may rain later. → Daha sonra yağmur yağabilir.
• She might come to the party. → Partiye gelebilir.`,
  tip: "Use 'may' and 'might' to express possibility. 'May' suggests slightly higher probability than 'might'.",
  
  table: [
    { subject: "I", modal: "may", baseVerb: "go", exampleSentence: "I may go home early." },
    { subject: "She", modal: "might", baseVerb: "be", exampleSentence: "She might be at work." },
    { subject: "They", modal: "may", baseVerb: "visit", exampleSentence: "They may visit us tomorrow." },
    { subject: "He", modal: "might", baseVerb: "call", exampleSentence: "He might call you." }
  ],
  
  listeningExamples: [
    "May I use your phone?",
    "It might rain later.",
    "They may visit us tomorrow."
  ],
  
  speakingPractice: [
    { question: "May I use your phone?", answer: "Yes, you may." },
    { question: "What might happen if it rains?", answer: "We might cancel the picnic." },
    { question: "Where may we meet tomorrow?", answer: "We may meet at the café." },
    { question: "Might he be late?", answer: "Yes, he might." },
    { question: "Who might visit us today?", answer: "My uncle might visit us." },
    { question: "May she call you tonight?", answer: "Yes, she may." },
    { question: "Why might they cancel the trip?", answer: "They might cancel it because of the weather." },
    { question: "May I come in?", answer: "Yes, you may." },
    { question: "When might she arrive?", answer: "She might arrive at 8 PM." },
    { question: "Might the movie be boring?", answer: "Yes, it might." },
    { question: "What may I bring to the party?", answer: "You may bring some snacks." },
    { question: "Might he win the race?", answer: "Yes, he might." },
    { question: "May she take a day off?", answer: "Yes, she may." },
    { question: "Where might we go this weekend?", answer: "We might go to the mountains." },
    { question: "May it snow today?", answer: "Yes, it may." },
    { question: "Who may join us later?", answer: "Alice may join us." },
    { question: "May we come with you?", answer: "Yes, you may." },
    { question: "Why might she be sad?", answer: "She might be sad because of bad news." },
    { question: "May they start early?", answer: "Yes, they may." },
    { question: "When might it stop raining?", answer: "It might stop raining in the evening." },
    { question: "May I help you?", answer: "Yes, you may." },
    { question: "What might he bring?", answer: "He might bring a cake." },
    { question: "May I stay here?", answer: "Yes, you may." },
    { question: "Where might she travel?", answer: "She might travel to Italy." },
    { question: "May we talk later?", answer: "Yes, you may." },
    { question: "What may I say in the meeting?", answer: "You may share your opinion." },
    { question: "May I borrow your pen?", answer: "Yes, you may." },
    { question: "Why might he be tired?", answer: "He might be tired after work." },
    { question: "May she answer the phone?", answer: "Yes, she may." },
    { question: "Where might we find the book?", answer: "We might find it in the library." },
    { question: "May I come tomorrow?", answer: "Yes, you may." },
    { question: "Who might come to dinner?", answer: "My cousins might come." },
    { question: "May we help you?", answer: "Yes, you may." },
    { question: "How might he know her?", answer: "He might know her from school." },
    { question: "May she be home now?", answer: "Yes, she may." },
    { question: "Why might they need help?", answer: "They might be lost." },
    { question: "May I ask something?", answer: "Yes, you may." },
    { question: "When might it start?", answer: "It might start at noon." },
    { question: "May he come in?", answer: "Yes, he may." },
    { question: "What might we need?", answer: "We might need more information." }
  ]
};

// Function to validate module data before navigation
function validateModuleData(moduleData: any): boolean {
  if (!moduleData) {
    console.error('Module data is null or undefined');
    return false;
  }

  if (!moduleData.title || !moduleData.description || !moduleData.intro || !moduleData.tip) {
    console.error('Module missing required fields');
    return false;
  }

  if (!moduleData.speakingPractice || !Array.isArray(moduleData.speakingPractice)) {
    console.error('Module missing speakingPractice array');
    return false;
  }

  if (moduleData.speakingPractice.length < 40) {
    console.error(`Module has only ${moduleData.speakingPractice.length} speaking questions, needs 40`);
    return false;
  }

  return true;
}

export default function LessonsApp({ onBack }: LessonsAppProps) {
  const [width, height] = useWindowSize();
  const [viewState, setViewState] = useState<ViewState>('levels');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedModule, setSelectedModule] = useState<number>(0);
  const [isHydrated, setIsHydrated] = useState(false);

  // Debug logging for component state
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') console.log('🔍 [LessonsApp] Component mounted/updated:', {
      viewState,
      selectedLevel,
      selectedModule,
      isHydrated,
      timestamp: new Date().toISOString()
    });
  }, [viewState, selectedLevel, selectedModule, isHydrated]);

  // Fallback hydration timer - ensure component doesn't get stuck in loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isHydrated) {
        if (process.env.NODE_ENV === 'development') console.warn('⚠️ [LessonsApp] Hydration timeout - forcing completion');
        setIsHydrated(true);
      }
    }, 2000); // 2 second timeout

    return () => clearTimeout(timer);
  }, []); // Run only once on mount
  
  // Lesson state
  const [currentPhase, setCurrentPhase] = useState<LessonPhase>('intro');
  const [isTeacherReading, setIsTeacherReading] = useState(false);
  const [readingComplete, setReadingComplete] = useState(false);
  const [hasBeenRead, setHasBeenRead] = useState<Record<string, boolean>>({});
  const [listeningIndex, setListeningIndex] = useState(0);
  const [speakingIndex, setSpeakingIndex] = useState(0);
  const [speakStep, setSpeakStep] = useState<'mcq' | 'speak'>('mcq');
  const [showCelebration, setShowCelebration] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | 'info'>('info');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResponseTime, setLastResponseTime] = useState(0);
  // Reset MCQ step when question changes
  useEffect(() => {
    setSpeakStep('mcq');
    // Removed automatic watchdog start - user must take action first
  }, [speakingIndex, selectedModule]);

  // Guards for module-scoped timers and safe progression
  const moduleGuardRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  // Simple in-flight guard and watchdog system
  const inFlightRef = useRef(false);
  const watchdogRef = useRef<number | null>(null);
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
  const MAX_ASR_RETRIES = 3;

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
    if (ctx.state === 'suspended') { try { await ctx.resume(); } catch {} }
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
      const done = (ok: boolean, value?: any) => {
        if (settled) return;
        settled = true;
        try { rec.stop(); } catch {}
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
    try { recognizerRef.current?.stop?.(); } catch {}
  }, [selectedModule, selectedLevel, viewState]);

  // Cancel any narration the moment we enter speaking (no TTS fighting taps)
  useEffect(() => {
    if (currentPhase === 'speaking') {
      cancelTTSSafe();
      setIsProcessing(false);
      // Removed automatic watchdog start - only start after user inactivity
    } else {
      clearWatchdog();             // Clear when leaving speaking phase
    }
  }, [currentPhase]);
  
  
  // ---- Autosave helpers ----
  const SAVE_DEBOUNCE_MS = 250;
  const saveTimerRef = useRef<number | null>(null);
  const restoredOnceRef = useRef(false);
  const autosaveTimeoutRef = useRef<number | null>(null);

  function snapshotProgress(): StoreModuleProgress | null {
    if (!currentModuleData || !selectedLevel || selectedModule == null) return null;

    const totalListening = currentModuleData?.listeningExamples?.length ?? 0;
    const totalSpeaking  = currentModuleData?.speakingPractice?.length ?? 0;

    // Clamp indexes in case content changed between sessions
    const safeListeningIndex = Math.min(Math.max(listeningIndex ?? 0, 0), Math.max(totalListening - 1, 0));
    const safeSpeakingIndex  = Math.min(Math.max(speakingIndex ?? 0, 0), Math.max(totalSpeaking - 1, 0));

    return {
      level: String(selectedLevel),
      module: Number(selectedModule),
      phase: currentPhase as any,
      listeningIndex: safeListeningIndex,
      speakingIndex: safeSpeakingIndex,
      completed: currentPhase === 'complete',
      totalListening,
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

  // --- Module Completion Logic ---
  function completeLesson() {
    const total = currentModuleData?.speakingPractice?.length ?? 0;

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

    // celebration
    setShowCelebration(true);
    setTimeout(() => {
      setShowCelebration(false);

    // compute next module
    const nextId = getNextModuleId(selectedLevel as 'A1' | 'A2' | 'B1', selectedModule);
      if (nextId) {
        cancelTTSSafe();
        // reset local UI state
        setSpeakingIndex(0);
        setCurrentPhase('intro');
        setSelectedModule(nextId);
      // The next module will be set, no need for separate lastVisited tracking
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
      .replace(/['„«»]/g, '"')
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

  // Robust answer checking using Module 51 proven logic
  function isAnswerCorrect(spokenRaw: string, targetRaw: string, questionItem?: any): boolean {
    // Create evaluation options
    const evalOptions: EvalOptions = {
      expected: targetRaw,
      accepted: questionItem?.acceptedAlternatives || [],
      requireAffirmationPolarity: questionItem?.requiresYesNo ?? true,
      keyLemmas: questionItem?.keyLemmas || []
    };
    
    const result = evaluateAnswer(spokenRaw, evalOptions);
    if (process.env.NODE_ENV === 'development') console.log(`🔍 Answer Check: "${spokenRaw}" vs "${targetRaw}" = ${result ? 'CORRECT' : 'INCORRECT'}`);
    
    return result;
  }

  // Use the enhanced evaluator for all answer checking
  function isExactlyCorrect(spokenRaw: string, targetRaw: string, questionItem?: any): boolean {
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

  function computeTargetFromItem(item: any): string {
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

  const { isSpeaking, soundEnabled, toggleSound } = useTextToSpeech();
  const { earnXPForGrammarLesson, addXP } = useGamification();
  const { incrementGrammarLessons, incrementTotalExercises } = useBadgeSystem();
  
  const { avatarState, triggerState } = useAvatarState({
    isRecording,
    isSpeaking,
    isProcessing,
    lastMessageTime: lastResponseTime
  });

  // Completed modules state with localStorage sync
  const getCompletedModules = () => {
    try {
      const stored = localStorage.getItem('completedModules');
      const parsed = JSON.parse(stored || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.warn('Error parsing completedModules from localStorage:', error);
      return [];
    }
  };
  
  const [completedModules, setCompletedModules] = useState<string[]>(getCompletedModules);

  // Check if module is unlocked
  const isModuleUnlocked = (moduleId: number) => {
    return true; // All modules unlocked for development/testing
    // Original progression logic (commented out):
    // if (moduleId === 1) return true; // Module 1 is always unlocked
    // if (moduleId === 51) return true; // Module 51 (first A2 module) is unlocked for testing
    // return completedModules.includes(`module-${moduleId - 1}`);
  };

// B1 Level Module Data (101-110)

// Module 101 Data
const MODULE_101_DATA = {
  title: "Present Perfect Continuous (I've been working) – B1 Level",
  description: "Learn to use Present Perfect Continuous to describe ongoing actions that started in the past and continue to the present",
  intro: `Present Perfect Continuous Tense, geçmişte başlayıp hâlen devam eden eylemleri anlatmak için kullanılır.

**Yapı:** Subject + have/has + been + verb-ing

**Kullanım Alanları:**
1. Geçmişte başlayıp hâlâ devam eden eylemler:
   → I have been studying English for three years. (Hâlâ İngilizce çalışıyorum)

2. Yakın zamanda bitmiş ama sonucu görünen eylemler:
   → You look tired. Have you been running? (Koşuyordun, şimdi yorgunsun)

3. Süreklilik ve süre vurgusu (how long?, for, since):
   → How long have you been waiting?

Present Perfect Continuous emphasizes the duration and continuity of an action that started in the past and is still happening or has just finished with visible results.`,
  tip: "Use Present Perfect Continuous with 'for' (duration) and 'since' (starting point) to emphasize how long an action has been happening.",

  table: [
    { form: "Affirmative", structure: "S + have/has been + V-ing", example: "I have been working for 5 hours." },
    { form: "Negative", structure: "S + have/has not been + V-ing", example: "She hasn't been feeling well lately." },
    { form: "Question", structure: "Have/Has + S + been + V-ing?", example: "Have you been waiting long?" },
    { form: "Wh-Question", structure: "Wh- + have/has + S + been + V-ing?", example: "How long have you been living here?" }
  ],

  listeningExamples: [
    "I've been learning Spanish for six months, and I can already have basic conversations.",
    "She's been working at the same company since 2015.",
    "They've been building that house for over a year now.",
    "We've been waiting for the bus for 30 minutes.",
    "He's been playing the guitar since he was a child.",
    "It's been raining all day, so the streets are flooded.",
    "You look exhausted. Have you been exercising?",
    "She's been crying. Her eyes are red."
  ],

  speakingPractice: [
    { question: "How long have you been studying English?", answer: "I've been studying English for three years." },
    { question: "What have you been doing all morning?", answer: "I've been cleaning the house all morning." },
    { question: "How long has she been working here?", answer: "She's been working here since January." },
    { question: "Why are your hands dirty?", answer: "Because I've been gardening." },
    { question: "How long have they been living in London?", answer: "They've been living in London for five years." },
    { question: "You look tired. What have you been doing?", answer: "I've been running in the park." },
    { question: "How long has it been raining?", answer: "It's been raining since this morning." },
    { question: "Why is the kitchen so messy?", answer: "Because I've been cooking." },
    { question: "How long have you been waiting for me?", answer: "I've been waiting for about 20 minutes." },
    { question: "What has your brother been doing lately?", answer: "He's been preparing for his exams." },
    { question: "How long has your sister been learning the piano?", answer: "She's been learning it for two years." },
    { question: "Why are you sweating?", answer: "Because I've been playing football." },
    { question: "How long have they been dating?", answer: "They've been dating for about six months." },
    { question: "What have you been reading recently?", answer: "I've been reading a mystery novel." },
    { question: "How long has he been sleeping?", answer: "He's been sleeping for three hours." },
    { question: "Why is your voice hoarse?", answer: "Because I've been singing at a concert." },
    { question: "How long have you been feeling sick?", answer: "I've been feeling sick since yesterday." },
    { question: "What have your parents been planning?", answer: "They've been planning a trip to Italy." },
    { question: "How long has the baby been crying?", answer: "She's been crying for half an hour." },
    { question: "Why are your clothes wet?", answer: "Because I've been washing the car." },
    { question: "How long have you been using this app?", answer: "I've been using it for a few weeks." },
    { question: "What has the company been developing?", answer: "They've been developing a new software product." },
    { question: "How long has your friend been traveling?", answer: "He's been traveling around Europe for a month." },
    { question: "Why do you smell like smoke?", answer: "Because I've been sitting near a fireplace." },
    { question: "How long have they been renovating their house?", answer: "They've been renovating it for six months." },
    { question: "What have you been watching on TV?", answer: "I've been watching a documentary series." },
    { question: "How long has she been attending yoga classes?", answer: "She's been attending them for a year." },
    { question: "Why are you out of breath?", answer: "Because I've been climbing stairs." },
    { question: "How long have you been following this diet?", answer: "I've been following it for two months." },
    { question: "What has your teacher been explaining?", answer: "She's been explaining grammar rules." },
    { question: "How long have they been discussing the project?", answer: "They've been discussing it all afternoon." },
    { question: "Why is the room so hot?", answer: "Because the heater has been running all day." },
    { question: "How long have you been practicing the guitar?", answer: "I've been practicing for an hour." },
    { question: "What has he been complaining about?", answer: "He's been complaining about the noise." },
    { question: "How long has your dog been barking?", answer: "It's been barking since the mailman came." },
    { question: "Why are your eyes red?", answer: "Because I've been crying at a sad movie." },
    { question: "How long have you been saving money?", answer: "I've been saving money since last year." },
    { question: "What have they been arguing about?", answer: "They've been arguing about where to go on vacation." },
    { question: "How long has the phone been ringing?", answer: "It's been ringing for five minutes." },
    { question: "Why are you smiling?", answer: "Because I've been thinking about good memories." }
  ]
};

// Module 102 Data
const MODULE_102_DATA = {
  title: "Present Perfect Continuous vs Present Perfect – B1 Level",
  description: "Understand the crucial difference between Present Perfect and Present Perfect Continuous tenses",
  intro: `Bu modülde, Present Perfect ve Present Perfect Continuous arasındaki farkı öğreneceksiniz.

**Present Perfect:** Sonuca ve tamamlanmaya odaklanır.
→ I have read the book. (Kitabı okudum - bitti, tamamlandı)

**Present Perfect Continuous:** Süreye ve devam eden eyleme odaklanır.
→ I have been reading the book. (Kitabı okuyorum - hâlâ okumaya devam ediyorum)

**Temel Farklar:**

1. **Tamamlanmış eylem vs Devam eden eylem:**
   - She has painted the room. (Oda boyandı - bitti)
   - She has been painting the room. (Odayı boyuyor - hâlâ devam ediyor)

2. **Sayılabilir sonuç vs Süre vurgusu:**
   - I have written three emails. (3 e-posta yazdım - sayılabilir sonuç)
   - I have been writing emails all morning. (Sabahtan beri e-posta yazıyorum - süre)

3. **Kalıcı durum vs Geçici aktivite:**
   - We have lived here for 10 years. (Kalıcı durum)
   - We have been living in a hotel. (Geçici durum)`,
  tip: "Use Present Perfect for completed results, Present Perfect Continuous for duration and ongoing actions. Both can use 'for' and 'since'.",

  table: [
    { tense: "Present Perfect", focus: "Result/Completion", example: "I have finished my homework.", meaning: "The homework is complete." },
    { tense: "Present Perfect Cont.", focus: "Duration/Process", example: "I have been doing my homework.", meaning: "Still working on it or just finished." },
    { tense: "Present Perfect", focus: "Countable result", example: "She has written three letters.", meaning: "3 letters completed." },
    { tense: "Present Perfect Cont.", focus: "Time emphasis", example: "She has been writing letters all day.", meaning: "Emphasizes how long she's been writing." },
    { tense: "Present Perfect", focus: "Permanent state", example: "They have lived here for 10 years.", meaning: "Permanent residence." },
    { tense: "Present Perfect Cont.", focus: "Temporary activity", example: "They have been living in a hotel.", meaning: "Temporary situation." }
  ],

  listeningExamples: [
    "I have cleaned the entire house. It looks perfect now. (Present Perfect - completed)",
    "I have been cleaning the house all morning. I'm exhausted. (Present Perfect Continuous - duration)",
    "She has learned French. She can speak it fluently. (Present Perfect - result)",
    "She has been learning French for two years, but she's still not fluent. (Present Perfect Continuous - ongoing)",
    "We have built a new website. It's live now. (Present Perfect - finished)",
    "We have been building a new website for six months. (Present Perfect Continuous - process)",
    "He has written five chapters of his book. (Present Perfect - countable result)",
    "He has been writing his book since last year. (Present Perfect Continuous - time emphasis)"
  ],

  speakingPractice: [
    { question: "Have you finished your homework?", answer: "Yes, I have finished it." },
    { question: "What have you been doing all day?", answer: "I've been working on a project." },
    { question: "How many books have you read this year?", answer: "I have read ten books so far." },
    { question: "Why are you tired?", answer: "Because I've been studying all night." },
    { question: "Has she completed the report?", answer: "Yes, she has completed it." },
    { question: "How long have you been waiting?", answer: "I've been waiting for an hour." },
    { question: "Have they painted the house?", answer: "Yes, they have. It looks great." },
    { question: "Why is the kitchen dirty?", answer: "Because I've been cooking for the party." },
    { question: "How many emails have you sent today?", answer: "I have sent about twenty emails." },
    { question: "What has he been doing in his room?", answer: "He's been playing video games." },
    { question: "Have you eaten lunch yet?", answer: "Yes, I have already eaten." },
    { question: "Why are your hands covered in paint?", answer: "Because I've been painting the fence." },
    { question: "How many countries have you visited?", answer: "I have visited fifteen countries." },
    { question: "Why is your voice so weak?", answer: "Because I've been talking on the phone all day." },
    { question: "Has the train arrived?", answer: "Yes, it has just arrived." },
    { question: "How long has she been living in Spain?", answer: "She's been living there for three years." },
    { question: "Have you seen that movie?", answer: "Yes, I have seen it twice." },
    { question: "What has your brother been studying?", answer: "He's been studying engineering." },
    { question: "How many cups of coffee have you drunk today?", answer: "I have drunk four cups." },
    { question: "Why is the grass wet?", answer: "Because it's been raining all morning." },
    { question: "Have you ever tried sushi?", answer: "Yes, I have tried it many times." },
    { question: "How long have you been working here?", answer: "I've been working here for two years." },
    { question: "Has your sister passed her driving test?", answer: "Yes, she has finally passed it." },
    { question: "Why are you out of breath?", answer: "Because I've been running." },
    { question: "How many languages have you learned?", answer: "I have learned three languages." },
    { question: "What has she been watching on TV?", answer: "She's been watching a drama series." },
    { question: "Have they finished building the bridge?", answer: "Yes, they have finished it." },
    { question: "Why is he so stressed?", answer: "Because he's been working long hours." },
    { question: "How many times have you been to Paris?", answer: "I have been there twice." },
    { question: "How long has your dog been barking?", answer: "It's been barking since you left." },
    { question: "Have you done your homework?", answer: "No, I haven't done it yet." },
    { question: "What have they been discussing?", answer: "They've been discussing the new policy." },
    { question: "Has the concert started?", answer: "No, it hasn't started yet." },
    { question: "Why is the baby crying?", answer: "She's been crying because she's hungry." },
    { question: "How many photos have you taken?", answer: "I have taken over a hundred photos." },
    { question: "How long have you been feeling ill?", answer: "I've been feeling ill since yesterday." },
    { question: "Have you met her before?", answer: "Yes, I have met her several times." },
    { question: "Why are you so happy?", answer: "Because I've been having a great day." },
    { question: "How many goals has he scored this season?", answer: "He has scored fifteen goals." },
    { question: "What have you been thinking about?", answer: "I've been thinking about my future." }
  ]
};

// Module 103 Data
const MODULE_103_DATA = {
  title: "Past Perfect – Affirmative (B1 Level)",
  description: "Learn to use Past Perfect to describe actions that happened before another past action",
  intro: `Past Perfect Tense, geçmişte iki olay varsa, daha önce gerçekleşen olayı anlatmak için kullanılır.

**Yapı:** Subject + had + past participle (V3)

**Kullanım:**
1. Geçmişte iki olay varsa, daha önce olan için Past Perfect kullanılır:
   → When I arrived, the movie had already started. (Film daha önce başladı)

2. Bir geçmiş sonucun nedenini açıklamak:
   → She was tired because she had worked all day.

3. "Before, after, when, by the time" ile birlikte kullanımı yaygındır.

The Past Perfect shows which action happened first when describing two past events. It emphasizes that one action was completed before another past action or time.`,
  tip: "Use Past Perfect for the earlier of two past actions. The later action uses Past Simple.",

  table: [
    { subject: "I / You / We / They", structure: "had + V3", example: "I had finished my work before she called." },
    { subject: "He / She / It", structure: "had + V3", example: "She had already left when I arrived." },
    { subject: "With 'before'", structure: "Past Perfect + before + Past Simple", example: "He had eaten before he went out." },
    { subject: "With 'after'", structure: "After + Past Perfect, Past Simple", example: "After she had studied, she took the test." },
    { subject: "With 'when'", structure: "When + Past Simple, Past Perfect", example: "When I got home, they had already eaten." }
  ],

  listeningExamples: [
    "When we arrived at the station, the train had already left.",
    "She had never seen the ocean before she visited California.",
    "They had lived in Paris for ten years before they moved to London.",
    "I had finished my homework before dinner.",
    "He was upset because he had lost his wallet.",
    "After they had eaten, they went for a walk.",
    "By the time the doctor arrived, the patient had already died.",
    "She had studied English for five years before she took the exam."
  ],

  speakingPractice: [
    { question: "What had happened when you arrived at the party?", answer: "Everyone had already left when I arrived." },
    { question: "Why was she upset?", answer: "Because she had failed the exam." },
    { question: "Had you ever been to Italy before last year?", answer: "No, I had never been there before." },
    { question: "What had they done before dinner?", answer: "They had cleaned the entire house." },
    { question: "Why was the room so clean?", answer: "Because someone had tidied it." },
    { question: "Had he finished his homework before going out?", answer: "Yes, he had already finished it." },
    { question: "What had you eaten for breakfast?", answer: "I had eaten toast and eggs." },
    { question: "Why were you so tired yesterday?", answer: "Because I had worked all night." },
    { question: "Had they met before the conference?", answer: "Yes, they had met several times before." },
    { question: "What had she studied before becoming a doctor?", answer: "She had studied biology and chemistry." },
    { question: "Why was the train late?", answer: "Because there had been a technical problem." },
    { question: "Had you seen that movie before?", answer: "No, I hadn't seen it before." },
    { question: "What had happened to his car?", answer: "Someone had stolen it during the night." },
    { question: "Why couldn't she open the door?", answer: "Because she had lost her keys." },
    { question: "Had they lived there long?", answer: "Yes, they had lived there for twenty years." },
    { question: "What had you done before the meeting started?", answer: "I had prepared all the documents." },
    { question: "Why was he so happy?", answer: "Because he had received good news." },
    { question: "Had you finished reading the book?", answer: "Yes, I had finished it the day before." },
    { question: "What had she told you about the project?", answer: "She had told me it was very important." },
    { question: "Why didn't they come to the party?", answer: "Because they had already made other plans." },
    { question: "Had he ever traveled abroad before?", answer: "No, he had never left the country." },
    { question: "What had you learned in school?", answer: "I had learned mathematics and science." },
    { question: "Why was the shop closed?", answer: "Because the owner had gone on vacation." },
    { question: "Had she called you before she arrived?", answer: "Yes, she had called me an hour earlier." },
    { question: "What had they built in the garden?", answer: "They had built a beautiful wooden deck." },
    { question: "Why was he angry?", answer: "Because someone had damaged his car." },
    { question: "Had you eaten sushi before?", answer: "No, I had never tried it before that day." },
    { question: "What had happened at the office?", answer: "There had been a small fire in the kitchen." },
    { question: "Why were they laughing?", answer: "Because someone had told a funny joke." },
    { question: "Had the concert started when you arrived?", answer: "No, it hadn't started yet." },
    { question: "What had you forgotten to bring?", answer: "I had forgotten to bring my notebook." },
    { question: "Why was she crying?", answer: "Because she had heard some sad news." },
    { question: "Had they finished the project on time?", answer: "Yes, they had completed it before the deadline." },
    { question: "What had he said to you?", answer: "He had said that he would help me." },
    { question: "Why was the street wet?", answer: "Because it had rained during the night." },
    { question: "Had you met her husband before?", answer: "Yes, I had met him at a previous event." },
    { question: "What had she cooked for dinner?", answer: "She had cooked a delicious pasta dish." },
    { question: "Why were you late?", answer: "Because I had missed the bus." },
    { question: "Had they won the match?", answer: "Yes, they had won by three goals." },
    { question: "What had you heard about the company?", answer: "I had heard that they were expanding." }
  ]
};

// Module 104 Data
const MODULE_104_DATA = {
  title: "Past Perfect – Negative (B1 Level)",
  description: "Learn to form negative sentences in Past Perfect tense",
  intro: `Past Perfect'in olumsuz formu, geçmişte belirli bir zamandan önce gerçekleşmemiş olayları anlatmak için kullanılır.

**Yapı:** Subject + had not (hadn't) + past participle (V3)

**Kullanım:**
1. Geçmişte bir şey olmadığını belirtmek:
   → I hadn't seen her before that day. (O güne kadar onu görmemiştim)

2. Bir geçmiş sonucun nedenini açıklamak (olumsuz):
   → He was hungry because he hadn't eaten all day.

3. İki geçmiş olay arasında, daha önceki olayın gerçekleşmediğini belirtmek:
   → When I arrived, they hadn't started eating yet.

The negative form of Past Perfect emphasizes that something did NOT happen before a specific past time or action.`,
  tip: "Use 'hadn't' (had not) + V3 to show that something did NOT happen before a past event.",

  table: [
    { form: "Full form", structure: "had not + V3", example: "She had not finished her work." },
    { form: "Contraction", structure: "hadn't + V3", example: "She hadn't finished her work." },
    { form: "Never (experience)", structure: "had never + V3", example: "I had never tried sushi before." },
    { form: "Not yet", structure: "had not + V3 + yet", example: "They hadn't arrived yet." },
    { form: "With 'before'", structure: "had not + V3 + before", example: "He hadn't been abroad before 2020." }
  ],

  listeningExamples: [
    "I hadn't seen that movie before last night.",
    "She hadn't told me about the problem.",
    "They hadn't finished the project when the deadline arrived.",
    "We hadn't met before the conference.",
    "He was lost because he hadn't brought a map.",
    "The teacher was angry because we hadn't done our homework.",
    "I hadn't been to that restaurant before.",
    "They hadn't expected so many people at the party."
  ],

  speakingPractice: [
    { question: "Had you been to Paris before last year?", answer: "No, I hadn't been there before." },
    { question: "Why was he so surprised?", answer: "Because he hadn't heard the news." },
    { question: "Had she finished her homework?", answer: "No, she hadn't finished it yet." },
    { question: "Why couldn't you find the place?", answer: "Because I hadn't written down the address." },
    { question: "Had they met before the wedding?", answer: "No, they hadn't met before that day." },
    { question: "Why was she so confused?", answer: "Because she hadn't read the instructions." },
    { question: "Had you ever tried Indian food before?", answer: "No, I hadn't tried it before yesterday." },
    { question: "Why were they late?", answer: "Because they hadn't checked the time." },
    { question: "Had he called you before he came?", answer: "No, he hadn't called me." },
    { question: "Why didn't you know about the meeting?", answer: "Because nobody hadn't told me." },
    { question: "Had you seen this film before?", answer: "No, I hadn't seen it." },
    { question: "Why was the room dirty?", answer: "Because we hadn't cleaned it." },
    { question: "Had she ever driven a car before?", answer: "No, she had never driven before." },
    { question: "Why did you fail the test?", answer: "Because I hadn't studied enough." },
    { question: "Had they visited that museum before?", answer: "No, they hadn't been there." },
    { question: "Why were you so tired?", answer: "Because I hadn't slept well." },
    { question: "Had you finished the book?", answer: "No, I hadn't finished it yet." },
    { question: "Why was he nervous?", answer: "Because he hadn't prepared for the presentation." },
    { question: "Had she told you about her plans?", answer: "No, she hadn't mentioned anything." },
    { question: "Why couldn't they enter?", answer: "Because they hadn't brought their tickets." },
    { question: "Had you ever been skiing before?", answer: "No, I had never tried it before." },
    { question: "Why was the food cold?", answer: "Because we hadn't heated it up." },
    { question: "Had he finished his work on time?", answer: "No, he hadn't completed it." },
    { question: "Why didn't she come?", answer: "Because she hadn't received the invitation." },
    { question: "Had they eaten dinner?", answer: "No, they hadn't eaten yet." },
    { question: "Why was everyone waiting?", answer: "Because the speaker hadn't arrived." },
    { question: "Had you met his family before?", answer: "No, I hadn't met them." },
    { question: "Why was the project delayed?", answer: "Because we hadn't received the materials." },
    { question: "Had she traveled abroad before?", answer: "No, she had never left the country." },
    { question: "Why were you unprepared?", answer: "Because I hadn't known about the quiz." },
    { question: "Had they seen the message?", answer: "No, they hadn't checked their phones." },
    { question: "Why was he disappointed?", answer: "Because his team hadn't won." },
    { question: "Had you heard about the accident?", answer: "No, I hadn't heard anything." },
    { question: "Why couldn't she answer?", answer: "Because she hadn't understood the question." },
    { question: "Had they started the meeting?", answer: "No, they hadn't started yet." },
    { question: "Why was the store closed?", answer: "Because they hadn't opened on Sundays." },
    { question: "Had you spoken to her before?", answer: "No, I had never spoken to her." },
    { question: "Why did he look confused?", answer: "Because he hadn't listened to the explanation." },
    { question: "Had she paid the bill?", answer: "No, she hadn't paid it yet." },
    { question: "Why were they surprised?", answer: "Because they hadn't expected such a large crowd." }
  ]
};

// Module 105 Data
const MODULE_105_DATA = {
  title: "Past Perfect – Questions (B1 Level)",
  description: "Learn to form Yes/No and Wh- questions in Past Perfect tense",
  intro: `Past Perfect soru formları, geçmişte belirli bir zamandan önce bir şey olup olmadığını sormak için kullanılır.

**Yapı:**
**Yes/No Questions:** Had + subject + past participle (V3)?
→ Had you finished your homework?

**Wh- Questions:** Wh- + had + subject + V3?
→ What had you done before that?

**Kullanım:**
1. Geçmişte bir deneyimi sormak:
   → Had you ever been to Japan before 2020?

2. Geçmişte ne olduğunu sormak:
   → What had happened before we arrived?

3. Bir geçmiş olayın nedenini sormak:
   → Why had they left so early?

Past Perfect questions help us inquire about events or experiences that occurred before a specific past time or action.`,
  tip: "For Yes/No questions, start with 'Had'. For Wh- questions, start with the question word, then 'had'.",

  table: [
    { type: "Yes/No Question", structure: "Had + S + V3?", example: "Had you seen her before?", answer: "Yes, I had. / No, I hadn't." },
    { type: "What question", structure: "What + had + S + V3?", example: "What had she done?", answer: "She had called the police." },
    { type: "Where question", structure: "Where + had + S + V3?", example: "Where had they gone?", answer: "They had gone to the cinema." },
    { type: "Why question", structure: "Why + had + S + V3?", example: "Why had he left?", answer: "Because he had felt ill." },
    { type: "How long question", structure: "How long + had + S + V3?", example: "How long had you lived there?", answer: "I had lived there for 5 years." }
  ],

  listeningExamples: [
    "Had you finished your homework before dinner?",
    "What had they told you about the project?",
    "Where had she been before she came here?",
    "Why had he left the meeting early?",
    "How long had you been studying before the exam?",
    "Had anyone called while I was out?",
    "Who had eaten all the cookies?",
    "Had you ever tried Thai food before that day?"
  ],

  speakingPractice: [
    { question: "Practice asking: Had she arrived before you?", answer: "Had she arrived before you?" },
    { question: "Ask where they had been.", answer: "Where had they been?" },
    { question: "Practice asking: What had he said?", answer: "What had he said?" },
    { question: "Ask if they had finished the work.", answer: "Had they finished the work?" },
    { question: "Practice asking: Why had you left early?", answer: "Why had you left early?" },
    { question: "Ask how long she had worked there.", answer: "How long had she worked there?" },
    { question: "Practice asking: Who had taken my pen?", answer: "Who had taken my pen?" },
    { question: "Ask if he had ever been abroad.", answer: "Had he ever been abroad?" },
    { question: "Practice asking: When had they met?", answer: "When had they met?" },
    { question: "Ask what she had cooked for dinner.", answer: "What had she cooked for dinner?" },
    { question: "Practice asking: Had you seen that movie before?", answer: "Had you seen that movie before?" },
    { question: "Ask where he had put the keys.", answer: "Where had he put the keys?" },
    { question: "Practice asking: Why had she been crying?", answer: "Why had she been crying?" },
    { question: "Ask how many books they had read.", answer: "How many books had they read?" },
    { question: "Practice asking: Had anyone told you about it?", answer: "Had anyone told you about it?" },
    { question: "Ask what time the train had left.", answer: "What time had the train left?" },
    { question: "Practice asking: Had you met her husband before?", answer: "Had you met her husband before?" },
    { question: "Ask why they had changed their plans.", answer: "Why had they changed their plans?" },
    { question: "Practice asking: Where had you learned English?", answer: "Where had you learned English?" },
    { question: "Ask if she had ever tried sushi.", answer: "Had she ever tried sushi?" },
    { question: "Practice asking: What had happened at the office?", answer: "What had happened at the office?" },
    { question: "Ask how long they had been waiting.", answer: "How long had they been waiting?" },
    { question: "Practice asking: Had he finished his homework?", answer: "Had he finished his homework?" },
    { question: "Ask who had broken the window.", answer: "Who had broken the window?" },
    { question: "Practice asking: Why had you called her?", answer: "Why had you called her?" },
    { question: "Ask where they had traveled before.", answer: "Where had they traveled before?" },
    { question: "Practice asking: Had you ever eaten Indian food?", answer: "Had you ever eaten Indian food?" },
    { question: "Ask what he had studied at university.", answer: "What had he studied at university?" },
    { question: "Practice asking: How many countries had she visited?", answer: "How many countries had she visited?" },
    { question: "Ask if they had lived there long.", answer: "Had they lived there long?" },
    { question: "Practice asking: Why had the meeting been cancelled?", answer: "Why had the meeting been cancelled?" },
    { question: "Ask where she had bought that dress.", answer: "Where had she bought that dress?" },
    { question: "Practice asking: Had you heard the news?", answer: "Had you heard the news?" },
    { question: "Ask what they had done the previous day.", answer: "What had they done the previous day?" },
    { question: "Practice asking: How long had he been ill?", answer: "How long had he been ill?" },
    { question: "Ask if she had seen the email.", answer: "Had she seen the email?" },
    { question: "Practice asking: Why had they been late?", answer: "Why had they been late?" },
    { question: "Ask who had invited them to the party.", answer: "Who had invited them to the party?" },
    { question: "Practice asking: Had you finished the book?", answer: "Had you finished the book?" },
    { question: "Ask where he had hidden the money.", answer: "Where had he hidden the money?" }
  ]
};

// Module 106 Data
const MODULE_106_DATA = {
  title: "Past Perfect Continuous (B1)",
  description: "Use Past Perfect Continuous for actions in progress before a past moment",
  intro: `Past Perfect Continuous, geçmişte belirli bir andan önce devam eden eylemleri anlatmak için kullanılır.

**Yapı:** had + been + V-ing
→ I had been waiting for an hour before the bus came. (Otobüs gelmeden önce bir saat bekliyordum)

**Kullanım:** Geçmişteki bir eylemden önce devam eden bir süreci vurgular.`,
  tip: "Use Past Perfect Continuous to show duration of an action that was happening before another past action.",
  table: [
    { form: "Affirmative", structure: "had been + V-ing", example: "She had been studying for hours." },
    { form: "Negative", structure: "had not been + V-ing", example: "They hadn't been playing long." },
    { form: "Question", structure: "Had + subject + been + V-ing?", example: "Had you been waiting long?" }
  ],
  listeningExamples: [
    "I had been working all day, so I was exhausted.",
    "She had been living in Paris for five years before she moved to London.",
    "They had been playing football when it started to rain.",
    "We had been waiting for two hours when the train finally arrived.",
    "He had been studying English for months before he took the exam."
  ],
  speakingPractice: [
    { question: "Why were you tired yesterday?", answer: "I had been working all day." },
    { question: "How long had you been waiting?", answer: "I had been waiting for an hour." },
    { question: "Why was she angry?", answer: "She had been waiting for me." },
    { question: "What had you been doing?", answer: "I had been studying for the test." },
    { question: "How long had they been living there?", answer: "They had been living there for five years." },
    { question: "Why were your eyes red?", answer: "I had been crying." },
    { question: "What had he been doing all morning?", answer: "He had been cleaning the house." },
    { question: "How long had you been learning English?", answer: "I had been learning English for two years." },
    { question: "Why were they so happy?", answer: "They had been celebrating all night." },
    { question: "What had she been reading?", answer: "She had been reading a mystery novel." },
    { question: "How long had it been raining?", answer: "It had been raining since morning." },
    { question: "Why was the road wet?", answer: "It had been raining." },
    { question: "What had you been watching?", answer: "I had been watching a documentary." },
    { question: "How long had he been running?", answer: "He had been running for thirty minutes." },
    { question: "Why were you late?", answer: "I had been looking for my keys." },
    { question: "What had they been discussing?", answer: "They had been discussing the project." },
    { question: "How long had she been cooking?", answer: "She had been cooking for two hours." },
    { question: "Why was he out of breath?", answer: "He had been running." },
    { question: "What had you been thinking about?", answer: "I had been thinking about my future." },
    { question: "How long had they been dating?", answer: "They had been dating for six months." },
    { question: "Why were your clothes dirty?", answer: "I had been working in the garden." },
    { question: "What had she been planning?", answer: "She had been planning a surprise party." },
    { question: "How long had it been snowing?", answer: "It had been snowing all night." },
    { question: "Why were you exhausted?", answer: "I had been exercising for hours." },
    { question: "What had he been writing?", answer: "He had been writing a novel." },
    { question: "How long had you been traveling?", answer: "I had been traveling for three weeks." },
    { question: "Why was the kitchen messy?", answer: "We had been baking." },
    { question: "What had they been building?", answer: "They had been building a treehouse." },
    { question: "How long had she been teaching?", answer: "She had been teaching for ten years." },
    { question: "Why were you nervous?", answer: "I had been preparing for the interview." },
    { question: "What had you been listening to?", answer: "I had been listening to music." },
    { question: "How long had he been practicing?", answer: "He had been practicing for months." },
    { question: "Why was she upset?", answer: "She had been arguing with her friend." },
    { question: "What had they been searching for?", answer: "They had been searching for the lost dog." },
    { question: "How long had it been burning?", answer: "It had been burning for hours." },
    { question: "Why were you smiling?", answer: "I had been thinking about happy memories." },
    { question: "What had she been designing?", answer: "She had been designing a new logo." },
    { question: "How long had you been sleeping?", answer: "I had been sleeping for eight hours." },
    { question: "Why was he hungry?", answer: "He had been working without eating." },
    { question: "What had they been rehearsing?", answer: "They had been rehearsing for the play." }
  ]
};

// Module 107 Data
const MODULE_107_DATA = {
  title: "Future Perfect (B1)",
  description: "Use Future Perfect to describe actions completed before a future time",
  intro: `Future Perfect Tense (will have + V3), gelecekte belirli bir zamana kadar tamamlanmış olacak eylemleri ifade etmek için kullanılır.

**Yapı:** Subject + will have + past participle (V3)
→ She will have graduated by June. (Haziran'a kadar mezun olmuş olacak)
→ They will have built the house before winter starts. (Kış başlamadan önce evi inşa etmiş olacaklar)`,
  tip: "Use Future Perfect to talk about completed actions before a specific future time. Use 'by' or 'before' to show the deadline.",
  table: [
    { form: "Affirmative", structure: "will have + V3", example: "I will have finished by 5 PM." },
    { form: "Negative", structure: "will not have + V3", example: "She won't have arrived yet." },
    { form: "Question", structure: "Will + subject + have + V3?", example: "Will you have eaten by then?" }
  ],
  listeningExamples: [
    "By 2026, I will have completed my master's degree.",
    "They will have arrived by the time the movie starts.",
    "You will have finished your homework before dinner.",
    "She will have graduated by June.",
    "We will have moved to the new house before summer."
  ],
  speakingPractice: [
    { question: "Will you have finished by 6 PM?", answer: "Yes, I will have finished by then." },
    { question: "What will you have done by tomorrow?", answer: "I will have completed my homework." },
    { question: "Will she have arrived by noon?", answer: "Yes, she will have arrived." },
    { question: "What will they have achieved?", answer: "They will have built the house." },
    { question: "Will we have learned everything?", answer: "We will have learned the basics." },
    { question: "What will he have done by Monday?", answer: "He will have fixed the computer." },
    { question: "Will you have graduated by next year?", answer: "Yes, I will have graduated." },
    { question: "What will she have cooked?", answer: "She will have cooked dinner." },
    { question: "Will they have moved by summer?", answer: "Yes, they will have moved." },
    { question: "What will you have read by then?", answer: "I will have read five books." },
    { question: "Will he have finished the report?", answer: "Yes, he will have finished it." },
    { question: "What will we have accomplished?", answer: "We will have reached our goal." },
    { question: "Will you have traveled by December?", answer: "Yes, I will have visited Paris." },
    { question: "What will she have written?", answer: "She will have written a novel." },
    { question: "Will they have completed the course?", answer: "Yes, they will have completed it." },
    { question: "What will he have learned?", answer: "He will have learned to drive." },
    { question: "Will you have saved enough money?", answer: "Yes, I will have saved $5000." },
    { question: "What will we have done by Sunday?", answer: "We will have cleaned the whole house." },
    { question: "Will she have recovered by then?", answer: "Yes, she will have recovered." },
    { question: "What will they have painted?", answer: "They will have painted three rooms." },
    { question: "Will you have prepared everything?", answer: "Yes, I will have prepared everything." },
    { question: "What will he have fixed?", answer: "He will have fixed the car." },
    { question: "Will we have eaten by 7?", answer: "Yes, we will have eaten." },
    { question: "What will she have decided?", answer: "She will have decided on a university." },
    { question: "Will they have returned by Friday?", answer: "Yes, they will have returned." },
    { question: "What will you have planted?", answer: "I will have planted flowers." },
    { question: "Will he have called by tonight?", answer: "Yes, he will have called." },
    { question: "What will we have organized?", answer: "We will have organized the event." },
    { question: "Will you have finished the book?", answer: "Yes, I will have finished it." },
    { question: "What will she have packed?", answer: "She will have packed her suitcase." },
    { question: "Will they have solved the problem?", answer: "Yes, they will have solved it." },
    { question: "What will he have built?", answer: "He will have built a website." },
    { question: "Will you have met everyone?", answer: "Yes, I will have met everyone." },
    { question: "What will we have discussed?", answer: "We will have discussed the plan." },
    { question: "Will she have left by 8 AM?", answer: "Yes, she will have left." },
    { question: "What will they have created?", answer: "They will have created a prototype." },
    { question: "Will you have watched the movie?", answer: "Yes, I will have watched it." },
    { question: "What will he have repaired?", answer: "He will have repaired the roof." },
    { question: "Will we have practiced enough?", answer: "Yes, we will have practiced." },
    { question: "What will she have chosen?", answer: "She will have chosen a name." }
  ]
};

// Module 108 Data
const MODULE_108_DATA = {
  title: "Future Continuous vs Future Perfect (B1)",
  description: "Understand the difference between Future Continuous and Future Perfect tenses",
  intro: `Future Continuous (will be + V-ing) gelecekte belirli bir zamanda devam etmekte olan eylemleri ifade ederken, Future Perfect (will have + V3) gelecekte belirli bir zamana kadar tamamlanmış olacak eylemleri anlatır.

**Future Continuous:** will be + V-ing → At 10 a.m., I will be driving to work.
**Future Perfect:** will have + V3 → By 10 a.m., I will have arrived at work.`,
  tip: "Future Continuous = action in progress AT a time. Future Perfect = action completed BY a time.",
  table: [
    { tense: "Future Continuous", use: "In progress at time", example: "At 3 PM, I will be working." },
    { tense: "Future Perfect", use: "Completed by time", example: "By 3 PM, I will have finished." }
  ],
  listeningExamples: [
    "This time next week, I will be lying on the beach.",
    "By next week, I will have finished all my exams.",
    "She will be working at 3 p.m.",
    "She will have completed the report by 3 p.m.",
    "Tomorrow at 8, they will be flying to Paris."
  ],

  speakingPractice: [
    { question: "What will you be doing at 8 PM?", answer: "I will be watching TV." },
    { question: "What will you have done by 8 PM?", answer: "I will have eaten dinner." },
    { question: "Where will she be working tomorrow?", answer: "She will be working at the office." },
    { question: "Will they have arrived by noon?", answer: "Yes, they will have arrived." },
    { question: "What will he be studying at 7?", answer: "He will be studying math." },
    { question: "Will you have finished by Friday?", answer: "Yes, I will have finished." },
    { question: "What will we be doing next week?", answer: "We will be traveling." },
    { question: "What will she have achieved by then?", answer: "She will have graduated." },
    { question: "Will you be sleeping at midnight?", answer: "Yes, I will be sleeping." },
    { question: "Will he have called by tomorrow?", answer: "Yes, he will have called." },
    { question: "What will they be planning?", answer: "They will be planning the event." },
    { question: "What will you have learned by June?", answer: "I will have learned French." },
    { question: "Will she be cooking at 6?", answer: "Yes, she will be cooking." },
    { question: "Will we have moved by summer?", answer: "Yes, we will have moved." },
    { question: "What will he be reading tonight?", answer: "He will be reading a novel." },
    { question: "What will they have built by December?", answer: "They will have built a house." },
    { question: "Will you be working tomorrow?", answer: "Yes, I will be working." },
    { question: "Will she have recovered by then?", answer: "Yes, she will have recovered." },
    { question: "What will we be celebrating?", answer: "We will be celebrating New Year." },
    { question: "What will you have saved by next year?", answer: "I will have saved $10,000." },
    { question: "Will he be attending the meeting?", answer: "Yes, he will be attending." },
    { question: "Will they have decided by Monday?", answer: "Yes, they will have decided." },
    { question: "What will she be wearing?", answer: "She will be wearing a blue dress." },
    { question: "What will you have completed?", answer: "I will have completed the course." },
    { question: "Will we be staying there long?", answer: "Yes, we will be staying." },
    { question: "Will he have fixed it by tonight?", answer: "Yes, he will have fixed it." },
    { question: "What will you be doing this weekend?", answer: "I will be relaxing at home." },
    { question: "What will she have written by then?", answer: "She will have written a book." },
    { question: "Will they be coming to the party?", answer: "Yes, they will be coming." },
    { question: "Will you have met him by Friday?", answer: "Yes, I will have met him." },
    { question: "What will he be teaching?", answer: "He will be teaching English." },
    { question: "What will we have discussed?", answer: "We will have discussed the plan." },
    { question: "Will she be driving there?", answer: "Yes, she will be driving." },
    { question: "Will they have left by 8 AM?", answer: "Yes, they will have left." },
    { question: "What will you be preparing?", answer: "I will be preparing dinner." },
    { question: "What will he have repaired?", answer: "He will have repaired the car." },
    { question: "Will we be meeting tomorrow?", answer: "Yes, we will be meeting." },
    { question: "Will you have practiced enough?", answer: "Yes, I will have practiced." },
    { question: "What will they be building?", answer: "They will be building a bridge." },
    { question: "What will she have chosen?", answer: "She will have chosen a university." }
  ]
};

// Module 109 Data
const MODULE_109_DATA = {
  title: "Modals of Deduction (B1)",
  description: "Express logical conclusions using must, might, and can't",
  intro: `Modals of Deduction, bir durumu değerlendirerek mantıksal çıkarım yapmak için kullanılır.

**must:** Kesin çıkarım (He must be hungry.)
**might:** Olası çıkarım (They might be on their way.)
**can't:** İmkansız çıkarım (She can't be the manager.)`,
  tip: "Use 'must' for strong certainty, 'might' for possibility, and 'can't' for impossibility based on evidence.",
  table: [
    { modal: "must", meaning: "Kesin çıkarım (90%)", example: "He must be tired. (Çok uyuyor.)" },
    { modal: "might", meaning: "Olası çıkarım (50%)", example: "She might be sleeping." },
    { modal: "can't", meaning: "İmkansız (0%)", example: "They can't be home. (Işıklar kapalı.)" }
  ],
  listeningExamples: [
    "He must be at work. His car is in the parking lot.",
    "She might be sleeping. It's still early.",
    "They can't be home. The lights are off.",
    "It must be expensive. It looks very new.",
    "He might know the answer. Let's ask him."
  ],

  speakingPractice: [
    { question: "His car is here. What do you think?", answer: "He must be at work." },
    { question: "The lights are off. Are they home?", answer: "They can't be home." },
    { question: "She's yawning a lot. What's wrong?", answer: "She must be tired." },
    { question: "I heard a noise upstairs. Who is it?", answer: "It might be the cat." },
    { question: "He's not answering. Where is he?", answer: "He might be sleeping." },
    { question: "The door is locked. Is anyone inside?", answer: "There can't be anyone inside." },
    { question: "She's smiling. How does she feel?", answer: "She must be happy." },
    { question: "The phone is ringing. Who could it be?", answer: "It might be your friend." },
    { question: "He scored 100%. Is he smart?", answer: "He must be very smart." },
    { question: "She's only 12. Can she drive?", answer: "She can't drive yet." },
    { question: "The store is closed. Are they open?", answer: "They can't be open." },
    { question: "He's carrying an umbrella. What's the weather?", answer: "It might be raining." },
    { question: "She's not in class. Where is she?", answer: "She might be sick." },
    { question: "The food smells good. What is it?", answer: "It must be dinner." },
    { question: "He's wearing a coat. Is it cold?", answer: "It must be cold outside." },
    { question: "The baby is crying. What does it need?", answer: "It might be hungry." },
    { question: "She's a doctor. Is she educated?", answer: "She must be well-educated." },
    { question: "The door is open. Did someone leave?", answer: "Someone might have left." },
    { question: "He's running. Is he late?", answer: "He must be late." },
    { question: "The TV is on. Is anyone watching?", answer: "Someone might be watching." },
    { question: "She didn't eat. Is she hungry?", answer: "She can't be hungry." },
    { question: "He's shouting. How does he feel?", answer: "He must be angry." },
    { question: "The window is broken. What happened?", answer: "Someone might have broken it." },
    { question: "She's 90 years old. Is she young?", answer: "She can't be young." },
    { question: "He studied all night. How does he feel?", answer: "He must be exhausted." },
    { question: "The grass is wet. Did it rain?", answer: "It must have rained." },
    { question: "She's laughing. Is she sad?", answer: "She can't be sad." },
    { question: "He's wearing sunglasses. Is it sunny?", answer: "It must be sunny." },
    { question: "The coffee is cold. Is it fresh?", answer: "It can't be fresh." },
    { question: "She has a new car. Is she rich?", answer: "She might be rich." },
    { question: "He's sneezing. What's wrong?", answer: "He might have a cold." },
    { question: "The sky is dark. Will it rain?", answer: "It might rain soon." },
    { question: "She passed the exam. Did she study?", answer: "She must have studied." },
    { question: "He's limping. Is he hurt?", answer: "He must be hurt." },
    { question: "The house is dark. Is anyone home?", answer: "There can't be anyone home." },
    { question: "She's a child. Can she vote?", answer: "She can't vote." },
    { question: "He's sweating. Is he hot?", answer: "He must be hot." },
    { question: "The road is icy. Is it dangerous?", answer: "It must be dangerous." },
    { question: "She's trembling. How does she feel?", answer: "She might be scared." },
    { question: "He won the lottery. Is he lucky?", answer: "He must be very lucky." }
  ]
};

// Module 110 Data
const MODULE_110_DATA = {
  title: "Modals of Probability (B1)",
  description: "Express possibility and probability using could, may, and might",
  intro: `'Could', 'may' ve 'might' modal fiilleri bir olayın olma ihtimali hakkında konuşurken kullanılır.

**Yapı:** Subject + could/may/might + base verb
→ I might go to the concert tonight. (Belki giderim.)
→ She may join us later. (Belki katılır.)
→ It could take a while. (Biraz zaman alabilir.)`,
  tip: "Use could/may/might to talk about future possibilities. They have similar meanings but 'may' is slightly more formal.",
  table: [
    { modal: "might", formality: "Informal", example: "I might be late." },
    { modal: "may", formality: "Formal", example: "It may rain tomorrow." },
    { modal: "could", formality: "Neutral", example: "That could be expensive." }
  ],
  listeningExamples: [
    "He could be at the supermarket.",
    "It may rain later this evening.",
    "She might be working from home today.",
    "I might go to the gym after work.",
    "They could arrive any minute now."
  ],

  speakingPractice: [
    { question: "Will you come tomorrow?", answer: "I might come tomorrow." },
    { question: "Is it going to rain?", answer: "It may rain later." },
    { question: "Where is Tom?", answer: "He could be at the library." },
    { question: "Will she call you?", answer: "She might call me tonight." },
    { question: "Is the store open?", answer: "It may be closed already." },
    { question: "Are they coming to the party?", answer: "They might not come." },
    { question: "Will he pass the exam?", answer: "He could pass if he studies." },
    { question: "Is this the right way?", answer: "It might be the wrong way." },
    { question: "Will the meeting be canceled?", answer: "It may be canceled." },
    { question: "Is she at home?", answer: "She could be at work." },
    { question: "Will they win the game?", answer: "They might win." },
    { question: "Is the food ready?", answer: "It may be ready soon." },
    { question: "Will you go to the gym?", answer: "I might go after work." },
    { question: "Is he coming?", answer: "He could arrive late." },
    { question: "Will it snow tomorrow?", answer: "It might snow." },
    { question: "Is she busy?", answer: "She may be in a meeting." },
    { question: "Will they move to London?", answer: "They might move next year." },
    { question: "Is this expensive?", answer: "It could be quite expensive." },
    { question: "Will you buy a car?", answer: "I may buy one soon." },
    { question: "Is he sick?", answer: "He might have a cold." },
    { question: "Will she accept the job?", answer: "She could accept it." },
    { question: "Is the train late?", answer: "It may be delayed." },
    { question: "Will you travel this summer?", answer: "I might go to Spain." },
    { question: "Is this seat taken?", answer: "It could be reserved." },
    { question: "Will he apologize?", answer: "He might not apologize." },
    { question: "Is the restaurant good?", answer: "It may be very good." },
    { question: "Will you join us?", answer: "I could join you later." },
    { question: "Is she angry?", answer: "She might be upset." },
    { question: "Will they change the plan?", answer: "They may change it." },
    { question: "Is this correct?", answer: "It could be wrong." },
    { question: "Will you need help?", answer: "I might need your help." },
    { question: "Is he available?", answer: "He may be free tomorrow." },
    { question: "Will she like the gift?", answer: "She might love it." },
    { question: "Is the project difficult?", answer: "It could be challenging." },
    { question: "Will you go out tonight?", answer: "I may stay home." },
    { question: "Is this the best option?", answer: "It might not be." },
    { question: "Will they agree?", answer: "They could disagree." },
    { question: "Is she ready?", answer: "She may need more time." },
    { question: "Will you watch the movie?", answer: "I might watch it later." },
    { question: "Is he telling the truth?", answer: "He could be lying." }
  ]
};

// Module 111 Data
const MODULE_111_DATA = {
  title: "Modals of Obligation (B1)",
  description: "Express obligation, necessity, and advice using must, have to, and should",
  intro: `'Must', 'have to' ve 'should' modal fiilleri zorunluluk, gereklilik ve tavsiye bildirmek için kullanılır.

**must:** Güçlü zorunluluk (You must bring your ID.)
**have to:** Dış zorunluluk (He has to finish by Friday.)
**should:** Tavsiye (You should see a doctor.)`,
  tip: "Use 'must' for strong personal obligation, 'have to' for external rules, and 'should' for advice.",
  table: [
    { modal: "must", meaning: "Güçlü zorunluluk", example: "You must wear a uniform." },
    { modal: "have to", meaning: "Dış zorunluluk", example: "She has to submit the form." },
    { modal: "should", meaning: "Tavsiye", example: "We should leave early." }
  ],
  listeningExamples: [
    "You must wear a uniform at this school.",
    "She has to submit the form by Monday.",
    "We should leave early to avoid traffic.",
    "You must bring your ID to the exam.",
    "He has to finish his report by Friday."
  ],

  speakingPractice: [
    { question: "What must you do at school?", answer: "I must wear a uniform." },
    { question: "What do you have to do today?", answer: "I have to finish my homework." },
    { question: "What should I do if I'm sick?", answer: "You should see a doctor." },
    { question: "Is it required to register?", answer: "Yes, you must register online." },
    { question: "What does she have to bring?", answer: "She has to bring her passport." },
    { question: "What's your advice?", answer: "You should study harder." },
    { question: "Is attendance mandatory?", answer: "Yes, you must attend all classes." },
    { question: "What do I have to pay?", answer: "You have to pay the fee." },
    { question: "Should I call him?", answer: "Yes, you should call him." },
    { question: "Is it necessary to book?", answer: "Yes, you must book in advance." },
    { question: "What does he have to do?", answer: "He has to submit the report." },
    { question: "What should we bring?", answer: "You should bring water." },
    { question: "Must I come early?", answer: "Yes, you must arrive by 8." },
    { question: "What do they have to wear?", answer: "They have to wear safety gear." },
    { question: "Should I apologize?", answer: "Yes, you should say sorry." },
    { question: "Is a visa required?", answer: "Yes, you must have a visa." },
    { question: "What does she have to complete?", answer: "She has to complete the form." },
    { question: "What should he do?", answer: "He should rest more." },
    { question: "Must we leave now?", answer: "Yes, we must leave immediately." },
    { question: "What do I have to sign?", answer: "You have to sign the contract." },
    { question: "Should they wait?", answer: "Yes, they should wait here." },
    { question: "Is it compulsory?", answer: "Yes, you must participate." },
    { question: "What does he have to check?", answer: "He has to check his email." },
    { question: "What should I wear?", answer: "You should wear formal clothes." },
    { question: "Must I pay now?", answer: "Yes, you must pay today." },
    { question: "What do we have to do?", answer: "We have to clean the room." },
    { question: "Should I tell her?", answer: "Yes, you should be honest." },
    { question: "Is ID required?", answer: "Yes, you must show your ID." },
    { question: "What does she have to finish?", answer: "She has to finish her work." },
    { question: "What should we eat?", answer: "You should eat healthy food." },
    { question: "Must they attend?", answer: "Yes, they must be there." },
    { question: "What do I have to do first?", answer: "You have to read the instructions." },
    { question: "Should we go now?", answer: "Yes, we should leave soon." },
    { question: "Is it obligatory?", answer: "Yes, you must comply." },
    { question: "What does he have to prepare?", answer: "He has to prepare a presentation." },
    { question: "What should I say?", answer: "You should tell the truth." },
    { question: "Must I answer?", answer: "Yes, you must respond." },
    { question: "What do they have to learn?", answer: "They have to learn the rules." },
    { question: "Should I wait?", answer: "Yes, you should be patient." },
    { question: "What must we remember?", answer: "We must remember the deadline." }
  ]
};

// Module 112 Data
const MODULE_112_DATA = {
  title: "Modals of Prohibition (B1)",
  description: "Express prohibition and lack of permission using mustn't and can't",
  intro: `'Mustn't' ve 'can't' modal fiilleri, yasaklama ve izin verilmediğini belirtmek için kullanılır.

**mustn't:** Yasak (You mustn't touch the wires.)
**can't:** İzin yok (She can't speak during the exam.)`,
  tip: "Use 'mustn't' for prohibition (don't do it!) and 'can't' for lack of permission (not allowed).",
  table: [
    { modal: "mustn't", meaning: "Yasak", example: "You mustn't park here." },
    { modal: "can't", meaning: "İzin yok", example: "They can't use phones in class." }
  ],
  listeningExamples: [
    "You mustn't park here.",
    "They can't use their phones in class.",
    "We mustn't forget to lock the door.",
    "You mustn't touch the wires.",
    "She can't speak during the exam."
  ],

  speakingPractice: [
    { question: "Can I park here?", answer: "No, you mustn't park here." },
    { question: "Can we use phones in class?", answer: "No, you can't use phones." },
    { question: "Can I smoke here?", answer: "No, you mustn't smoke here." },
    { question: "Can students leave early?", answer: "No, they can't leave early." },
    { question: "Can I touch this?", answer: "No, you mustn't touch it." },
    { question: "Can we eat in the library?", answer: "No, you can't eat there." },
    { question: "Can I be late?", answer: "No, you mustn't be late." },
    { question: "Can they take photos?", answer: "No, they can't take photos." },
    { question: "Can I forget my ID?", answer: "No, you mustn't forget it." },
    { question: "Can we make noise?", answer: "No, you can't make noise." },
    { question: "Can I run in the hallway?", answer: "No, you mustn't run." },
    { question: "Can she enter without a ticket?", answer: "No, she can't enter." },
    { question: "Can I tell anyone?", answer: "No, you mustn't tell anyone." },
    { question: "Can we swim here?", answer: "No, you can't swim here." },
    { question: "Can I open the window?", answer: "No, you mustn't open it." },
    { question: "Can they bring pets?", answer: "No, they can't bring pets." },
    { question: "Can I cheat on the exam?", answer: "No, you mustn't cheat." },
    { question: "Can we use the elevator?", answer: "No, you can't use it." },
    { question: "Can I speak loudly?", answer: "No, you mustn't speak loudly." },
    { question: "Can he go alone?", answer: "No, he can't go alone." },
    { question: "Can I skip class?", answer: "No, you mustn't skip class." },
    { question: "Can we park on the grass?", answer: "No, you can't park there." },
    { question: "Can I lie to them?", answer: "No, you mustn't lie." },
    { question: "Can they bring food?", answer: "No, they can't bring food." },
    { question: "Can I waste time?", answer: "No, you mustn't waste time." },
    { question: "Can we take pictures inside?", answer: "No, you can't take pictures." },
    { question: "Can I drive without a license?", answer: "No, you mustn't drive." },
    { question: "Can she wear jeans?", answer: "No, she can't wear jeans." },
    { question: "Can I disturb others?", answer: "No, you mustn't disturb them." },
    { question: "Can we drink alcohol here?", answer: "No, you can't drink alcohol." },
    { question: "Can I ignore the rules?", answer: "No, you mustn't ignore them." },
    { question: "Can they use the pool?", answer: "No, they can't use it." },
    { question: "Can I be rude?", answer: "No, you mustn't be rude." },
    { question: "Can we enter this area?", answer: "No, you can't enter." },
    { question: "Can I copy the test?", answer: "No, you mustn't copy it." },
    { question: "Can he walk on the grass?", answer: "No, he can't walk there." },
    { question: "Can I shout here?", answer: "No, you mustn't shout." },
    { question: "Can we bring bags inside?", answer: "No, you can't bring bags." },
    { question: "Can I break the rules?", answer: "No, you mustn't break them." },
    { question: "Can they play here?", answer: "No, they can't play here." }
  ]
};

// Module 113 Data
const MODULE_113_DATA = {
  title: "Reported Speech: Requests and Commands (B1)",
  description: "Report requests and commands using tell, ask, order",
  intro: `İstek ve emir cümleleri dolaylı anlatılırken genellikle 'ask', 'tell', 'order' ve 'request' gibi fiiller kullanılır.
• Emir: tell/ask + someone + to + verb
• Olumsuz emir: tell/ask + someone + not to + verb
• İstek: ask/request + someone + to + verb

**Örnekler:**
"Sit down." → He told me to sit down.
"Don't open the door." → She told me not to open the door.`,
  tip: "Use 'told' for commands and 'asked' for requests. Change 'you' to object pronouns and adjust time references.",

  table: [
    { pattern: "Affirmative command", example: "'Sit down.' → He told me to sit down." },
    { pattern: "Negative command", example: "'Don't open the door.' → She told me not to open the door." },
    { pattern: "Request", example: "'Could you send me the file?' → He asked me to send him the file." }
  ],

  listeningExamples: [
    "'Be quiet.' → She told us to be quiet.",
    "'Don't forget your homework.' → The teacher reminded him not to forget his homework.",
    "'Please help me.' → He asked me to help him.",
    "'Turn off the lights.' → She told me to turn off the lights.",
    "'Don't go outside.' → My mom told me not to go outside."
  ],

  speakingPractice: [
    { question: "'Open your books.' → (teacher to students)", answer: "The teacher told the students to open their books." },
    { question: "'Don't touch that.' → (mother to child)", answer: "The mother told the child not to touch that." },
    { question: "'Help me with the boxes.' → (he to me)", answer: "He asked me to help him with the boxes." },
    { question: "'Please close the window.' → (she to me)", answer: "She asked me to close the window." },
    { question: "'Don't run in the hallway.' → (teacher to students)", answer: "The teacher told the students not to run in the hallway." },
    { question: "'Could you call me later?' → (she to him)", answer: "She asked him to call her later." },
    { question: "'Turn off your phones.' → (exam supervisor to candidates)", answer: "The exam supervisor told the candidates to turn off their phones." },
    { question: "'Don't forget to feed the cat.' → (she to me)", answer: "She reminded me not to forget to feed the cat." },
    { question: "'Wait for me here.' → (he to her)", answer: "He told her to wait for him there." },
    { question: "'Please write your name.' → (receptionist to visitor)", answer: "The receptionist asked the visitor to write their name." },
    { question: "'Don't be late.' → (boss to employees)", answer: "The boss told the employees not to be late." },
    { question: "'Help your brother.' → (mother to child)", answer: "The mother told the child to help his brother." },
    { question: "'Please send the report.' → (manager to assistant)", answer: "The manager asked the assistant to send the report." },
    { question: "'Don't speak loudly.' → (librarian to students)", answer: "The librarian told the students not to speak loudly." },
    { question: "'Come here.' → (he to me)", answer: "He told me to come there." },
    { question: "'Don't go alone.' → (friend to friend)", answer: "The friend told his friend not to go alone." },
    { question: "'Take this medicine.' → (doctor to patient)", answer: "The doctor told the patient to take the medicine." },
    { question: "'Please don't tell anyone.' → (she to me)", answer: "She asked me not to tell anyone." },
    { question: "'Clean your room.' → (parent to child)", answer: "The parent told the child to clean their room." },
    { question: "'Call me tonight.' → (he to me)", answer: "He told me to call him that night." },
    { question: "'Don't play in the street.' → (parent to children)", answer: "The parent told the children not to play in the street." },
    { question: "'Pass me the salt.' → (he to her)", answer: "He told her to pass him the salt." },
    { question: "'Please don't forget the keys.' → (she to me)", answer: "She asked me not to forget the keys." },
    { question: "'Don't lie to me.' → (he to her)", answer: "He told her not to lie to him." },
    { question: "'Please be careful.' → (she to him)", answer: "She asked him to be careful." },
    { question: "'Don't open the door.' → (security guard to visitors)", answer: "The security guard told the visitors not to open the door." },
    { question: "'Get some rest.' → (friend to friend)", answer: "The friend told his friend to get some rest." },
    { question: "'Please take a seat.' → (host to guest)", answer: "The host asked the guest to take a seat." },
    { question: "'Turn left at the corner.' → (police officer to driver)", answer: "The police officer told the driver to turn left at the corner." },
    { question: "'Don't park here.' → (sign)", answer: "The sign told us not to park there." },
    { question: "'Please be on time.' → (manager to team)", answer: "The manager asked the team to be on time." },
    { question: "'Call the doctor.' → (wife to husband)", answer: "The wife told her husband to call the doctor." },
    { question: "'Don't worry.' → (he to me)", answer: "He told me not to worry." },
    { question: "'Take your umbrella.' → (mother to child)", answer: "The mother told the child to take their umbrella." },
    { question: "'Please don't shout.' → (she to him)", answer: "She asked him not to shout." },
    { question: "'Submit your homework.' → (teacher to student)", answer: "The teacher told the student to submit their homework." },
    { question: "'Don't forget your ID.' → (officer to applicant)", answer: "The officer told the applicant not to forget their ID." },
    { question: "'Don't disturb them.' → (manager to staff)", answer: "The manager told the staff not to disturb them." },
    { question: "'Please stay here.' → (nurse to patient)", answer: "The nurse asked the patient to stay there." },
    { question: "'Don't take pictures.' → (museum staff to visitor)", answer: "The museum staff told the visitor not to take pictures." }
  ]
};

// Module 114 Data
const MODULE_114_DATA = {
  title: "Reported Speech – Questions (B1)",
  description: "Report yes/no and WH- questions with correct word order",
  intro: `Dolaylı anlatımda soru cümleleri aktarılırken:
• Soru yapısı düz cümleye çevrilir (yardımcı fiil kaldırılır).
• 'asked', 'wanted to know' gibi fiiller kullanılır.
• Yes/No questions için 'if/whether', WH-questions için 'wh-word' kullanılır.

**Örnekler:**
"Do you like pizza?" → He asked if I liked pizza.
"Where is she going?" → He asked where she was going.`,
  tip: "Remember to use statement word order (subject + verb) after the question word or 'if/whether'.",

  table: [
    { pattern: "Yes/No Questions", example: "'Do you like pizza?' → He asked if I liked pizza." },
    { pattern: "WH- Questions", example: "'Where is she going?' → He asked where she was going." }
  ],

  listeningExamples: [
    "'Do you live here?' → He asked if I lived there.",
    "'What time does the train leave?' → She asked what time the train left.",
    "'Are you tired?' → He asked if I was tired.",
    "'Where did you go?' → She asked where I had gone.",
    "'Can you help me?' → He asked if I could help him."
  ],

  speakingPractice: [
    { question: "Do you like coffee?", answer: "She asked if I liked coffee." },
    { question: "Where do you work?", answer: "He asked where I worked." },
    { question: "Can you drive?", answer: "She asked if I could drive." },
    { question: "Did you go to the meeting?", answer: "He asked if I had gone to the meeting." },
    { question: "What are you doing?", answer: "She asked what I was doing." },
    { question: "Is it raining?", answer: "He asked if it was raining." },
    { question: "Why are you sad?", answer: "She asked why I was sad." },
    { question: "Do they live nearby?", answer: "He asked if they lived nearby." },
    { question: "When did you arrive?", answer: "She asked when I had arrived." },
    { question: "Have you ever been to London?", answer: "He asked if I had ever been to London." },
    { question: "Are you coming to the party?", answer: "She asked if I was coming to the party." },
    { question: "What time does the shop open?", answer: "He asked what time the shop opened." },
    { question: "Did you finish the project?", answer: "She asked if I had finished the project." },
    { question: "Where is your phone?", answer: "He asked where my phone was." },
    { question: "Will you be late?", answer: "She asked if I would be late." },
    { question: "Do you speak Spanish?", answer: "He asked if I spoke Spanish." },
    { question: "What did you say?", answer: "She asked what I had said." },
    { question: "Are they ready?", answer: "He asked if they were ready." },
    { question: "When will you return?", answer: "She asked when I would return." },
    { question: "How are you feeling?", answer: "He asked how I was feeling." },
    { question: "Do you have a pen?", answer: "She asked if I had a pen." },
    { question: "Why did she leave?", answer: "He asked why she had left." },
    { question: "Can I help you?", answer: "She asked if she could help me." },
    { question: "Where have you been?", answer: "He asked where I had been." },
    { question: "What does he want?", answer: "She asked what he wanted." },
    { question: "Is this your book?", answer: "He asked if that was my book." },
    { question: "Did you call her?", answer: "She asked if I had called her." },
    { question: "Where is the nearest bank?", answer: "He asked where the nearest bank was." },
    { question: "Are you free tomorrow?", answer: "She asked if I was free the next day." },
    { question: "Have you seen my keys?", answer: "He asked if I had seen his keys." },
    { question: "Why are you laughing?", answer: "She asked why I was laughing." },
    { question: "Can you swim?", answer: "He asked if I could swim." },
    { question: "When does the class start?", answer: "She asked when the class started." },
    { question: "Do you want something to drink?", answer: "He asked if I wanted something to drink." },
    { question: "What are you thinking about?", answer: "She asked what I was thinking about." },
    { question: "Did you read the book?", answer: "He asked if I had read the book." },
    { question: "Are they coming today?", answer: "She asked if they were coming that day." },
    { question: "Have you eaten lunch?", answer: "He asked if I had eaten lunch." },
    { question: "Where do you live now?", answer: "She asked where I lived then." },
    { question: "Why are you so quiet?", answer: "He asked why I was so quiet." },
    { question: "Is she your sister?", answer: "She asked if she was my sister." }
  ]
};

// Module 115 Data
const MODULE_115_DATA = {
  title: "Passive Voice – Present Perfect (B1)",
  description: "Form and use passive voice in present perfect tense",
  intro: `Present Perfect Passive: have/has + been + V3 (past participle)
Eylemi yapan kişinin önemli olmadığı durumlarda kullanılır.

**Yapı:** Subject + has/have + been + past participle
**Örnekler:**
Active: They have cleaned the classroom. → Passive: The classroom has been cleaned.`,
  tip: "Use the passive voice to focus on the action or result, not the doer. Perfect for formal writing and news reports.",

  table: [
    { form: "Affirmative", structure: "has/have + been + V3", example: "The house has been sold." },
    { form: "Negative", structure: "has/have + not + been + V3", example: "The email hasn't been sent." },
    { form: "Question", structure: "Has/Have + subject + been + V3?", example: "Has the report been completed?" }
  ],

  listeningExamples: [
    "The house has been sold.",
    "Many mistakes have been made.",
    "The package has been delivered.",
    "The invitations have been sent out.",
    "The report has been completed."
  ],

  speakingPractice: [
    { question: "They have repaired the road.", answer: "The road has been repaired." },
    { question: "She has written three poems.", answer: "Three poems have been written." },
    { question: "We have finished the project.", answer: "The project has been finished." },
    { question: "He has painted the kitchen.", answer: "The kitchen has been painted." },
    { question: "They have built a new school.", answer: "A new school has been built." },
    { question: "Someone has stolen my bike.", answer: "My bike has been stolen." },
    { question: "People have used this software.", answer: "This software has been used." },
    { question: "He has opened the door.", answer: "The door has been opened." },
    { question: "She has cooked dinner.", answer: "Dinner has been cooked." },
    { question: "We have cleaned the windows.", answer: "The windows have been cleaned." },
    { question: "They have canceled the concert.", answer: "The concert has been canceled." },
    { question: "She has organized the files.", answer: "The files have been organized." },
    { question: "The manager has approved the plan.", answer: "The plan has been approved." },
    { question: "He has fixed the computer.", answer: "The computer has been fixed." },
    { question: "They have signed the contract.", answer: "The contract has been signed." },
    { question: "Someone has closed the gate.", answer: "The gate has been closed." },
    { question: "We have watered the flowers.", answer: "The flowers have been watered." },
    { question: "She has designed a new logo.", answer: "A new logo has been designed." },
    { question: "He has cleaned the carpet.", answer: "The carpet has been cleaned." },
    { question: "They have delivered the package.", answer: "The package has been delivered." },
    { question: "The chef has prepared the meal.", answer: "The meal has been prepared." },
    { question: "The workers have finished the job.", answer: "The job has been finished." },
    { question: "Someone has taken the documents.", answer: "The documents have been taken." },
    { question: "She has composed a song.", answer: "A song has been composed." },
    { question: "They have repaired the machine.", answer: "The machine has been repaired." },
    { question: "We have posted the letters.", answer: "The letters have been posted." },
    { question: "He has printed the report.", answer: "The report has been printed." },
    { question: "She has cleaned her office.", answer: "Her office has been cleaned." },
    { question: "They have changed the schedule.", answer: "The schedule has been changed." },
    { question: "He has updated the website.", answer: "The website has been updated." },
    { question: "They have set the table.", answer: "The table has been set." },
    { question: "The engineer has tested the system.", answer: "The system has been tested." },
    { question: "We have collected the data.", answer: "The data has been collected." },
    { question: "She has translated the article.", answer: "The article has been translated." },
    { question: "The assistant has arranged the meeting.", answer: "The meeting has been arranged." },
    { question: "They have washed the cars.", answer: "The cars have been washed." },
    { question: "He has closed all the windows.", answer: "All the windows have been closed." },
    { question: "We have emailed the invitations.", answer: "The invitations have been emailed." },
    { question: "She has sent the photos.", answer: "The photos have been sent." },
    { question: "They have repaired the fence.", answer: "The fence has been repaired." }
  ]
};

// Module 116 Data
const MODULE_116_DATA = {
  title: "Passive Voice – Future (B1)",
  description: "Use future simple passive to describe future actions",
  intro: `Gelecekte edilgen yapı: will + be + V3 (past participle) — bir işin gelecekte yapılacağını belirtir.

**Yapı:** Subject + will + be + past participle
**Örnekler:**
Active: They will deliver the package tomorrow. → Passive: The package will be delivered tomorrow.`,
  tip: "Use future passive when the focus is on what will happen, not who will do it. Common in formal announcements.",

  table: [
    { form: "Affirmative", structure: "will + be + V3", example: "The room will be cleaned." },
    { form: "Negative", structure: "will + not + be + V3", example: "The meeting won't be canceled." },
    { form: "Question", structure: "Will + subject + be + V3?", example: "Will the report be finished?" }
  ],

  listeningExamples: [
    "The homework will be submitted tomorrow.",
    "A new product will be launched next month.",
    "The documents will be signed by the manager.",
    "The invitations will be sent out soon.",
    "The decision will be announced next week."
  ],

  speakingPractice: [
    { question: "They will paint the house.", answer: "The house will be painted." },
    { question: "She will bake a cake.", answer: "A cake will be baked." },
    { question: "We will hold the meeting at 10 a.m.", answer: "The meeting will be held at 10 a.m." },
    { question: "They will build a new mall.", answer: "A new mall will be built." },
    { question: "He will write a new article.", answer: "A new article will be written." },
    { question: "The workers will repair the road.", answer: "The road will be repaired." },
    { question: "She will organize the event.", answer: "The event will be organized." },
    { question: "They will send the package.", answer: "The package will be sent." },
    { question: "He will open the store.", answer: "The store will be opened." },
    { question: "We will announce the winner.", answer: "The winner will be announced." },
    { question: "They will clean the classroom.", answer: "The classroom will be cleaned." },
    { question: "She will submit the report.", answer: "The report will be submitted." },
    { question: "He will prepare the documents.", answer: "The documents will be prepared." },
    { question: "We will launch the campaign.", answer: "The campaign will be launched." },
    { question: "They will fix the printer.", answer: "The printer will be fixed." },
    { question: "He will give a presentation.", answer: "A presentation will be given." },
    { question: "We will arrange the chairs.", answer: "The chairs will be arranged." },
    { question: "She will deliver the speech.", answer: "The speech will be delivered." },
    { question: "They will finish the project.", answer: "The project will be finished." },
    { question: "We will send invitations.", answer: "Invitations will be sent." },
    { question: "He will draw the design.", answer: "The design will be drawn." },
    { question: "She will explain the process.", answer: "The process will be explained." },
    { question: "We will hold a press conference.", answer: "A press conference will be held." },
    { question: "They will close the road.", answer: "The road will be closed." },
    { question: "She will make a reservation.", answer: "A reservation will be made." },
    { question: "He will update the website.", answer: "The website will be updated." },
    { question: "We will replace the old signs.", answer: "The old signs will be replaced." },
    { question: "They will choose the new manager.", answer: "The new manager will be chosen." },
    { question: "He will check the results.", answer: "The results will be checked." },
    { question: "She will decorate the room.", answer: "The room will be decorated." },
    { question: "They will cancel the flight.", answer: "The flight will be canceled." },
    { question: "He will repair the car.", answer: "The car will be repaired." },
    { question: "We will paint the walls.", answer: "The walls will be painted." },
    { question: "They will conduct a survey.", answer: "A survey will be conducted." },
    { question: "He will answer all questions.", answer: "All questions will be answered." },
    { question: "She will serve dinner at 7.", answer: "Dinner will be served at 7." },
    { question: "We will hold a meeting.", answer: "A meeting will be held." },
    { question: "They will open a new office.", answer: "A new office will be opened." },
    { question: "He will lead the discussion.", answer: "The discussion will be led." },
    { question: "She will plan the trip.", answer: "The trip will be planned." }
  ]
};

// Module 117 Data
const MODULE_117_DATA = {
  title: "Conditionals – Review (B1)",
  description: "Review zero, first, second, and third conditionals",
  intro: `Koşul cümleleri (conditionals) sonuç belirtmek için kullanılır.
• **Zero:** If + present, present (genel gerçekler)
• **First:** If + present, will + V1 (gerçek gelecek)
• **Second:** If + past, would + V1 (hayali şimdi/gelecek)
• **Third:** If + past perfect, would have + V3 (hayali geçmiş)

**Örnekler:**
Zero: If water reaches 100°C, it boils.
First: If he calls me, I will answer.
Second: If I were you, I would apologize.
Third: If we had left on time, we would have arrived earlier.`,
  tip: "Each conditional type has a different time reference and level of reality. Master the form and meaning of each.",

  table: [
    { type: "Zero", structure: "If + present, present", example: "If water boils, it turns to steam." },
    { type: "First", structure: "If + present, will + V1", example: "If it rains, I will stay home." },
    { type: "Second", structure: "If + past, would + V1", example: "If I were rich, I would travel." },
    { type: "Third", structure: "If + past perfect, would have + V3", example: "If I had known, I would have helped." }
  ],

  listeningExamples: [
    "Zero: If water reaches 100°C, it boils.",
    "First: If he calls me, I will answer.",
    "Second: If I were you, I would apologize.",
    "Third: If we had left on time, we would have arrived earlier."
  ],

  speakingPractice: [
    { question: "If you heat ice, what happens?", answer: "It melts. (Zero Conditional)" },
    { question: "What will you do if it rains tomorrow?", answer: "I will stay home. (First Conditional)" },
    { question: "If you had studied, what would have happened?", answer: "I would have passed. (Third Conditional)" },
    { question: "If I were rich, what would I do?", answer: "You would buy a big house. (Second Conditional)" },
    { question: "If people don't drink water, what happens?", answer: "They get dehydrated. (Zero Conditional)" },
    { question: "If I finish early, what will I do?", answer: "You will go out. (First Conditional)" },
    { question: "If she knew the answer, what would she do?", answer: "She would tell us. (Second Conditional)" },
    { question: "If he had listened, what would have happened?", answer: "He would have avoided the mistake. (Third Conditional)" },
    { question: "What happens if you mix red and yellow?", answer: "You get orange. (Zero Conditional)" },
    { question: "If the sun shines tomorrow, what will we do?", answer: "We will go to the beach. (First Conditional)" },
    { question: "If I were taller, what sport would I play?", answer: "You would play basketball. (Second Conditional)" },
    { question: "If they had invited me, what would I have done?", answer: "You would have gone to the party. (Third Conditional)" },
    { question: "If you drop this glass, what happens?", answer: "It breaks. (Zero Conditional)" },
    { question: "If you study hard, what will happen?", answer: "You will succeed. (First Conditional)" },
    { question: "If I had more time, what would I do?", answer: "You would read more books. (Second Conditional)" },
    { question: "If she had worn a coat, what would have happened?", answer: "She wouldn't have gotten cold. (Third Conditional)" },
    { question: "If I don't eat, what happens?", answer: "You feel hungry. (Zero Conditional)" },
    { question: "If you call her, what will she do?", answer: "She will answer. (First Conditional)" },
    { question: "If we lived in Spain, what would we do?", answer: "We would speak Spanish. (Second Conditional)" },
    { question: "If they had studied, what would have happened?", answer: "They would have passed the exam. (Third Conditional)" },
    { question: "If fire gets no oxygen, what happens?", answer: "It goes out. (Zero Conditional)" },
    { question: "If I see him, what will I say?", answer: "You will say hello. (First Conditional)" },
    { question: "If I won the lottery, what would I do?", answer: "You would buy a car. (Second Conditional)" },
    { question: "If you had set an alarm, what would have happened?", answer: "You wouldn't have been late. (Third Conditional)" },
    { question: "If sugar dissolves in tea, what happens?", answer: "It becomes sweet. (Zero Conditional)" },
    { question: "If she comes, what will you do?", answer: "I will talk to her. (First Conditional)" },
    { question: "If he spoke slower, what would happen?", answer: "We would understand him. (Second Conditional)" },
    { question: "If we had known, what would we have done?", answer: "We would have changed our plan. (Third Conditional)" },
    { question: "If you boil water, what happens?", answer: "It turns into steam. (Zero Conditional)" },
    { question: "If I go shopping, what will I buy?", answer: "You will buy some bread. (First Conditional)" },
    { question: "If I were a bird, what would I do?", answer: "You would fly away. (Second Conditional)" },
    { question: "If she had asked for help, what would have happened?", answer: "She would have received it. (Third Conditional)" },
    { question: "If metal is heated, what happens?", answer: "It expands. (Zero Conditional)" },
    { question: "If you don't sleep enough, what will happen?", answer: "You will feel tired. (First Conditional)" },
    { question: "If I lived in New York, what would I do?", answer: "You would visit Central Park. (Second Conditional)" },
    { question: "If they had checked the weather, what would they have done?", answer: "They would have brought umbrellas. (Third Conditional)" },
    { question: "If plants don't get light, what happens?", answer: "They die. (Zero Conditional)" },
    { question: "If I pass the exam, what will I do?", answer: "You will celebrate. (First Conditional)" },
    { question: "If he were a teacher, what would he do?", answer: "He would explain things well. (Second Conditional)" },
    { question: "If she had taken notes, what would she have done?", answer: "She would have remembered the lesson. (Third Conditional)" }
  ]
};

// Module 118 Data
const MODULE_118_DATA = {
  title: "Third Conditional (B1)",
  description: "Describe unreal past situations and imagined results",
  intro: `3. tip koşul: If + past perfect, would have + V3 (geçmişte gerçekleşmemiş durumların hayali sonuçları).

**Yapı:** If + past perfect, would have + past participle
**Örnekler:**
If I had studied, I would have passed the exam.
If they had left earlier, they would have caught the train.`,
  tip: "Use third conditional for regrets and imagining different past outcomes. Both clauses refer to the past.",

  table: [
    { form: "Affirmative", example: "If I had known, I would have helped you." },
    { form: "Negative", example: "If she hadn't been late, she wouldn't have missed the bus." },
    { form: "Question", example: "What would you have done if you had seen him?" }
  ],

  listeningExamples: [
    "If I had gone to bed early, I wouldn't have been tired.",
    "If they had booked the tickets, they wouldn't have missed the concert.",
    "If you had reminded me, I wouldn't have forgotten.",
    "If she had checked the email, she would have seen the update.",
    "If we had studied more, we would have passed the test."
  ],

  speakingPractice: [
    { question: "If I had seen the sign, what would I have done?", answer: "You would have stopped." },
    { question: "If she had listened, what would have happened?", answer: "She wouldn't have made the mistake." },
    { question: "If we had left earlier, what would we have done?", answer: "We would have caught the bus." },
    { question: "If he had asked for help, what would you have done?", answer: "I would have helped him." },
    { question: "If they had practiced more, what would they have done?", answer: "They would have won the match." },
    { question: "If it had rained, what would have happened?", answer: "The ground would have been wet." },
    { question: "If you had taken your umbrella, what would have happened?", answer: "You wouldn't have gotten wet." },
    { question: "If she had studied, what would she have done?", answer: "She would have passed the exam." },
    { question: "If we had known the truth, what would we have done?", answer: "We would have acted differently." },
    { question: "If he had apologized, what would she have done?", answer: "She would have forgiven him." },
    { question: "If you had set an alarm, what would have happened?", answer: "You wouldn't have been late." },
    { question: "If they had trained harder, what would have happened?", answer: "They would have finished the race." },
    { question: "If I had charged my phone, what would have happened?", answer: "I would have called you." },
    { question: "If she had taken the medicine, what would have happened?", answer: "She would have felt better." },
    { question: "If we had made a reservation, what would have happened?", answer: "We would have had a table." },
    { question: "If he had driven carefully, what would have happened?", answer: "He wouldn't have had an accident." },
    { question: "If I had read the instructions, what would I have done?", answer: "You would have assembled it correctly." },
    { question: "If they had invited us, what would we have done?", answer: "We would have attended the wedding." },
    { question: "If you had remembered my birthday, what would you have done?", answer: "I would have bought you a gift." },
    { question: "If she had worn a coat, what would have happened?", answer: "She wouldn't have been cold." },
    { question: "If we had bought tickets earlier, what would we have done?", answer: "We would have seen the movie." },
    { question: "If he had called me, what would I have done?", answer: "You would have answered." },
    { question: "If you had paid attention, what would have happened?", answer: "You wouldn't have made that error." },
    { question: "If I had saved money, what would I have done?", answer: "You would have gone on vacation." },
    { question: "If she had joined the meeting, what would she have done?", answer: "She would have shared her ideas." },
    { question: "If we had followed the map, what would have happened?", answer: "We wouldn't have gotten lost." },
    { question: "If they had hired more staff, what would have happened?", answer: "The work would have been completed faster." },
    { question: "If you had locked the door, what would have happened?", answer: "The burglar wouldn't have entered." },
    { question: "If he had explained better, what would have happened?", answer: "We would have understood him." },
    { question: "If I had taken the earlier train, what would I have done?", answer: "You would have arrived on time." },
    { question: "If she had asked directions, what would have happened?", answer: "She wouldn't have gotten lost." },
    { question: "If they had chosen another hotel, what would have happened?", answer: "They would have been happier." },
    { question: "If we had planned ahead, what would have happened?", answer: "Everything would have gone smoothly." },
    { question: "If you had gone to the doctor, what would have happened?", answer: "You would have gotten better sooner." },
    { question: "If I had known the answer, what would I have done?", answer: "You would have told the teacher." },
    { question: "If he had prepared more, what would have happened?", answer: "He would have done better in the interview." },
    { question: "If you had eaten breakfast, what would have happened?", answer: "You wouldn't have been hungry." },
    { question: "If she had spoken up, what would have happened?", answer: "We would have heard her idea." },
    { question: "If we had checked the weather, what would we have done?", answer: "We would have brought umbrellas." },
    { question: "If they had arrived earlier, what would have happened?", answer: "They would have gotten better seats." }
  ]
};

// Module 119 Data
const MODULE_119_DATA = {
  title: "Mixed Conditionals (B1)",
  description: "Mix time references in conditional sentences",
  intro: `Mixed Conditionals, geçmiş/şimdi zamanlarını karıştırarak hayali senaryoları ifade eder.
**Tip 1** (geçmiş neden → şimdi sonuç): If + past perfect, would + V1
**Tip 2** (şimdi neden → geçmiş sonuç): If + past simple, would have + V3

**Örnekler:**
If I had studied medicine, I would be a doctor now. (geçmiş → şimdi)
If he were more responsible, he wouldn't have missed the deadline. (şimdi → geçmiş)`,
  tip: "Mix time references when a past action affects the present, or a present situation affects a past result.",

  table: [
    { type: "Past → Present", example: "If I had taken the job, I would be rich now." },
    { type: "Present → Past", example: "If I were taller, I would have joined the team." }
  ],

  listeningExamples: [
    "If I had gone to university, I would have a better job now.",
    "If she spoke French, she would have helped us in Paris.",
    "If they had arrived earlier, they would be sitting in the front row.",
    "If I weren't afraid of heights, I would have climbed the mountain.",
    "If he had trained harder, he would be playing in the national team now."
  ],

  speakingPractice: [
    { question: "If she had studied more, what would she be doing now?", answer: "She would be attending university." },
    { question: "If I were more organized, what would I have done?", answer: "You would have finished on time." },
    { question: "If we had left earlier, where would we be now?", answer: "We would be at the airport." },
    { question: "If he were taller, what would he have done?", answer: "He would have joined the basketball team." },
    { question: "If I had taken the other job, what would I be earning now?", answer: "You would be earning more money." },
    { question: "If they were more careful, what wouldn't have happened?", answer: "They wouldn't have made that mistake." },
    { question: "If I had learned coding earlier, what would I be working as now?", answer: "You would be a developer now." },
    { question: "If she were more confident, what would she have done?", answer: "She would have given the presentation." },
    { question: "If we had saved more money, what would we be doing now?", answer: "We would be traveling." },
    { question: "If he were a better listener, what would he have understood?", answer: "He would have understood the instructions." },
    { question: "If you had studied architecture, what would you be designing now?", answer: "I would be designing buildings." },
    { question: "If they weren't so tired, what would they have done yesterday?", answer: "They would have gone out." },
    { question: "If he had exercised regularly, how would he feel now?", answer: "He would feel healthier." },
    { question: "If I were a faster runner, what would I have done?", answer: "You would have won the race." },
    { question: "If she had gone to drama school, what would she be now?", answer: "She would be an actress." },
    { question: "If we weren't busy today, what would we have done?", answer: "We would have visited grandma." },
    { question: "If you had listened to me, how would things be now?", answer: "Things would be better." },
    { question: "If he weren't afraid of water, what would he have done?", answer: "He would have learned to swim." },
    { question: "If they had known about the traffic, where would they be now?", answer: "They would be here already." },
    { question: "If I had studied computer science, what would I be working as now?", answer: "You would be a software engineer." },
    { question: "If she weren't sick, what would she have done last night?", answer: "She would have come to the party." },
    { question: "If I had taken the train, where would I be now?", answer: "You would be home already." },
    { question: "If he were more ambitious, what would he have done?", answer: "He would have applied for that job." },
    { question: "If we had planned better, how would the project be now?", answer: "It would be in better shape." },
    { question: "If I weren't so lazy, what would I have done this weekend?", answer: "You would have cleaned the house." },
    { question: "If they had practiced more, how would they be playing now?", answer: "They would be playing better." },
    { question: "If you were friendlier, what would you have done?", answer: "I would have made more friends." },
    { question: "If I had gotten up earlier, what would I be doing now?", answer: "You would be at the office." },
    { question: "If she weren't so shy, what would she have done?", answer: "She would have joined the discussion." },
    { question: "If we had taken a taxi, where would we be now?", answer: "We would be at the restaurant." },
    { question: "If he had learned English earlier, what would he be doing now?", answer: "He would be working abroad." },
    { question: "If I were more confident, what would I have done?", answer: "You would have spoken up." },
    { question: "If they had taken the right road, where would they be now?", answer: "They would be at the hotel." },
    { question: "If I weren't scared of dogs, what would I have done?", answer: "You would have petted it." },
    { question: "If she had taken notes, what would she be doing now?", answer: "She would be studying effectively." },
    { question: "If he were stronger, what would he have carried?", answer: "He would have carried the box." },
    { question: "If we had brought jackets, how would we feel now?", answer: "We would feel warmer." },
    { question: "If I had accepted the offer, what would I be doing now?", answer: "You would be working in Germany." },
    { question: "If they were more polite, what would they have done?", answer: "They would have said thank you." },
    { question: "If he had told the truth, how would people feel now?", answer: "People would trust him more." }
  ]
};

// Module 120 Data
const MODULE_120_DATA = {
  title: "Wish / If only + Past Simple (B1)",
  description: "Express present regrets and hypothetical desires",
  intro: `Wish / If only + past simple: Şu an gerçek olmayan/istenen durumları ifade eder.

**Yapı:** Subject + wish / if only + past simple
**Örnekler:**
I wish I had a car. (Arabam yok ama keşke olsaydı)
If only I were taller. (Uzun değilim ama keşke uzun olsaydım)
He wishes he lived in London. (Londra'da yaşamıyor ama keşke yaşasaydı)`,
  tip: "Use 'wish' or 'if only' + past simple to express regret about present situations you want to change.",

  table: [
    { form: "Affirmative", example: "I wish I spoke Spanish." },
    { form: "Negative", example: "I wish I didn't live so far away." },
    { form: "With 'be'", example: "If only I were taller. (use 'were' for all persons)" }
  ],

  listeningExamples: [
    "I wish I spoke Spanish.",
    "If only I had more free time.",
    "She wishes she didn't live so far away.",
    "I wish we were on holiday.",
    "If only he knew the answer."
  ],

  speakingPractice: [
    { question: "You don't have a car. What do you say?", answer: "I wish I had a car." },
    { question: "You are not tall. What do you say?", answer: "If only I were taller." },
    { question: "He doesn't live near his school. What does he say?", answer: "He wishes he lived near his school." },
    { question: "It's raining. What do you say?", answer: "If only it weren't raining." },
    { question: "You don't know the answer. What do you say?", answer: "I wish I knew the answer." },
    { question: "She doesn't speak English. What does she say?", answer: "She wishes she spoke English." },
    { question: "You can't play the guitar. What do you say?", answer: "I wish I could play the guitar." },
    { question: "He doesn't have a pet. What does he say?", answer: "He wishes he had a pet." },
    { question: "She is always tired. What does she say?", answer: "If only I weren't always tired." },
    { question: "You are not good at math. What do you say?", answer: "I wish I were good at math." },
    { question: "He doesn't like his job. What does he say?", answer: "He wishes he had a different job." },
    { question: "She can't cook. What does she say?", answer: "She wishes she could cook." },
    { question: "You don't live in the city center. What do you say?", answer: "I wish I lived in the city center." },
    { question: "He is not rich. What does he say?", answer: "He wishes he were rich." },
    { question: "You are not good at sports. What do you say?", answer: "I wish I were better at sports." },
    { question: "She has no siblings. What does she say?", answer: "She wishes she had siblings." },
    { question: "You don't understand French. What do you say?", answer: "I wish I understood French." },
    { question: "He can't drive. What does he say?", answer: "He wishes he could drive." },
    { question: "You don't have enough time. What do you say?", answer: "If only I had more time." },
    { question: "She is not confident. What does she say?", answer: "She wishes she were more confident." },
    { question: "You are always busy. What do you say?", answer: "If only I weren't always busy." },
    { question: "He can't paint well. What does he say?", answer: "He wishes he could paint better." },
    { question: "You don't live near the beach. What do you say?", answer: "I wish I lived near the beach." },
    { question: "She doesn't have many friends. What does she say?", answer: "She wishes she had more friends." },
    { question: "He is shy. What does he say?", answer: "He wishes he weren't so shy." },
    { question: "You don't go out much. What do you say?", answer: "I wish I went out more." },
    { question: "She can't sing. What does she say?", answer: "She wishes she could sing." },
    { question: "You are not in shape. What do you say?", answer: "I wish I were in better shape." },
    { question: "He has a lot of homework. What does he say?", answer: "He wishes he had less homework." },
    { question: "You're always tired. What do you say?", answer: "If only I had more energy." },
    { question: "She doesn't have a passport. What does she say?", answer: "She wishes she had a passport." },
    { question: "You live far from work. What do you say?", answer: "I wish I lived closer to work." },
    { question: "He doesn't have any siblings. What does he say?", answer: "He wishes he had a brother or sister." },
    { question: "You are always late. What do you say?", answer: "I wish I were more punctual." },
    { question: "She can't swim. What does she say?", answer: "She wishes she could swim." },
    { question: "You are not creative. What do you say?", answer: "If only I were more creative." },
    { question: "He doesn't have any money. What does he say?", answer: "He wishes he had some money." },
    { question: "You're not good at drawing. What do you say?", answer: "I wish I could draw." },
    { question: "She doesn't enjoy her job. What does she say?", answer: "She wishes she had a more fun job." },
    { question: "You have to work this weekend. What do you say?", answer: "I wish I didn't have to work this weekend." }
  ]
};

// Module 121 Data
const MODULE_121_DATA = {
  title: "Wish / If only + Past Perfect (Past Regrets) – B1 Level",
  description: "Learn to express regrets about the past using 'wish' and 'if only' with past perfect",
  intro: `'Wish' ve 'If only' + past perfect yapıları, geçmişte gerçekleşmeyen olaylara duyulan pişmanlıkları ifade etmek için kullanılır.

**Yapı:**
- I wish + past perfect (had + V3)
- If only + past perfect (had + V3)

**Kullanım:**
Geçmişte yapmadığımız veya yaptığımız şeylerden pişmanlık duymak için kullanılır.

**Örnekler:**
- I wish I had taken that opportunity. (O fırsatı değerlendirseydim.)
- If only I had set an alarm. (Keşke alarm kurmuş olsaydım.)
- She wishes she had studied more. (Keşke daha çok çalışmış olsaydı.)

This structure expresses regrets about the past - things that did not happen or things we wish had happened differently.`,
  tip: "Use 'wish' or 'if only' + had + past participle to express regrets about past events.",

  table: [
    { structure: "wish + had + V3", example: "I wish I had studied harder.", meaning: "Regret about not studying (past)" },
    { structure: "if only + had + V3", example: "If only I had gone to the party.", meaning: "Strong regret about not going (past)" },
    { structure: "wish + hadn't + V3", example: "I wish I hadn't eaten so much.", meaning: "Regret about eating too much (past)" },
    { structure: "if only + hadn't + V3", example: "If only he hadn't forgotten.", meaning: "Strong regret about forgetting (past)" }
  ],

  listeningExamples: [
    "I wish I had taken that opportunity.",
    "If only I had set an alarm.",
    "She wishes she had studied more.",
    "If only we had checked the weather forecast.",
    "He wishes he hadn't forgotten her birthday."
  ],

  speakingPractice: [
    { question: "You didn't study for the exam. What do you say?", answer: "I wish I had studied for the exam." },
    { question: "She forgot his birthday. What does she say?", answer: "She wishes she hadn't forgotten his birthday." },
    { question: "You didn't go to the party. What do you say?", answer: "If only I had gone to the party." },
    { question: "He didn't take the job offer. What does he say?", answer: "He wishes he had taken the job offer." },
    { question: "They didn't book a table. What do they say?", answer: "They wish they had booked a table." },
    { question: "You spent too much money. What do you say?", answer: "I wish I hadn't spent so much money." },
    { question: "She didn't call her friend. What does she say?", answer: "If only she had called her friend." },
    { question: "You didn't arrive on time. What do you say?", answer: "I wish I had arrived on time." },
    { question: "He didn't bring his umbrella. What does he say?", answer: "He wishes he had brought his umbrella." },
    { question: "We didn't take any photos. What do we say?", answer: "We wish we had taken some photos." },
    { question: "They didn't listen to the teacher. What do they say?", answer: "If only they had listened to the teacher." },
    { question: "You didn't wear a coat. What do you say?", answer: "I wish I had worn a coat." },
    { question: "She didn't check the map. What does she say?", answer: "She wishes she had checked the map." },
    { question: "You didn't tell the truth. What do you say?", answer: "I wish I had told the truth." },
    { question: "He didn't prepare for the interview. What does he say?", answer: "If only he had prepared for the interview." },
    { question: "You didn't apply for the scholarship. What do you say?", answer: "I wish I had applied for the scholarship." },
    { question: "They didn't attend the wedding. What do they say?", answer: "They wish they had attended the wedding." },
    { question: "She didn't take the medicine. What does she say?", answer: "She wishes she had taken the medicine." },
    { question: "You didn't lock the door. What do you say?", answer: "If only I had locked the door." },
    { question: "He didn't save his work. What does he say?", answer: "He wishes he had saved his work." },
    { question: "We didn't see the announcement. What do we say?", answer: "We wish we had seen the announcement." },
    { question: "You didn't leave early. What do you say?", answer: "I wish I had left early." },
    { question: "She didn't practice the piano. What does she say?", answer: "She wishes she had practiced the piano." },
    { question: "They didn't water the plants. What do they say?", answer: "If only they had watered the plants." },
    { question: "You didn't bring your homework. What do you say?", answer: "I wish I had brought my homework." },
    { question: "He didn't buy the tickets. What does he say?", answer: "He wishes he had bought the tickets." },
    { question: "She didn't listen to her parents. What does she say?", answer: "If only she had listened to her parents." },
    { question: "You didn't ask for directions. What do you say?", answer: "I wish I had asked for directions." },
    { question: "They didn't catch the train. What do they say?", answer: "They wish they had caught the train." },
    { question: "He didn't read the email. What does he say?", answer: "He wishes he had read the email." },
    { question: "You didn't take the chance. What do you say?", answer: "If only I had taken the chance." },
    { question: "We didn't reserve a room. What do we say?", answer: "We wish we had reserved a room." },
    { question: "She didn't try harder. What does she say?", answer: "She wishes she had tried harder." },
    { question: "You didn't finish your project. What do you say?", answer: "I wish I had finished my project." },
    { question: "He didn't pay attention. What does he say?", answer: "He wishes he had paid attention." },
    { question: "They didn't back up the files. What do they say?", answer: "If only they had backed up the files." },
    { question: "You didn't visit your grandparents. What do you say?", answer: "I wish I had visited my grandparents." },
    { question: "She didn't bring her ID. What does she say?", answer: "She wishes she had brought her ID." },
    { question: "We didn't cancel the trip. What do we say?", answer: "We wish we had canceled the trip earlier." },
    { question: "You didn't wake up early. What do you say?", answer: "If only I had woken up earlier." }
  ]
};

// Module 122 Data
const MODULE_122_DATA = {
  title: "Used to / Be used to / Get used to – B1 Level",
  description: "Understand the differences between 'used to', 'be used to', and 'get used to'",
  intro: `Bu üç yapı İngilizce'de birbirinden farklı anlamlara gelir:

**1. USED TO + base verb** = Geçmiş alışkanlık/durum (artık yapılmıyor)
→ I used to play football. (Eskiden futbol oynardım, artık oynamıyorum)

**2. BE USED TO + noun/-ing** = Bir şeye alışık olmak (şu anda alışkın)
→ I am used to the noise. (Gürültüye alışığım)

**3. GET USED TO + noun/-ing** = Bir şeye alışma süreci (alışmaya çalışmak)
→ I'm getting used to waking up early. (Erken kalkmaya alışıyorum)

These three structures have different meanings and uses in English.`,
  tip: "'Used to' = past habits. 'Be used to' = accustomed now. 'Get used to' = becoming accustomed.",

  table: [
    { structure: "used to + base verb", example: "I used to smoke.", meaning: "Past habit (I don't smoke now)" },
    { structure: "be used to + noun/-ing", example: "I am used to the cold.", meaning: "Accustomed to it now" },
    { structure: "get used to + noun/-ing", example: "I'm getting used to the food.", meaning: "Becoming accustomed (process)" },
    { structure: "didn't use to", example: "I didn't use to like coffee.", meaning: "Past negative habit" }
  ],

  listeningExamples: [
    "I used to ride my bike every day.",
    "She is used to the cold weather.",
    "We are getting used to the new system.",
    "He used to eat meat, but now he's vegan.",
    "They got used to living in a small town."
  ],

  speakingPractice: [
    { question: "You played the guitar when you were younger. What do you say?", answer: "I used to play the guitar." },
    { question: "She doesn't find the noise strange anymore. What do you say?", answer: "She is used to the noise." },
    { question: "You are in the process of adjusting to early mornings. What do you say?", answer: "I'm getting used to waking up early." },
    { question: "He lived in the city before. What do you say?", answer: "He used to live in the city." },
    { question: "They didn't eat spicy food before, but now they're adapting. What do you say?", answer: "They are getting used to spicy food." },
    { question: "We were familiar with the cold winters. What do you say?", answer: "We were used to cold winters." },
    { question: "You didn't go to the gym before, but now you do. What do you say?", answer: "I'm getting used to going to the gym." },
    { question: "She drank coffee every day before. What do you say?", answer: "She used to drink coffee every day." },
    { question: "You don't mind the long hours anymore. What do you say?", answer: "I am used to working long hours." },
    { question: "He drove to work before. What do you say?", answer: "He used to drive to work." },
    { question: "We are adjusting to the new software. What do you say?", answer: "We're getting used to using the new software." },
    { question: "She is accustomed to wearing high heels. What do you say?", answer: "She is used to wearing high heels." },
    { question: "You no longer watch TV as you used to. What do you say?", answer: "I used to watch TV more often." },
    { question: "They are still adapting to the climate. What do you say?", answer: "They are getting used to the climate." },
    { question: "He is now okay with the food. What do you say?", answer: "He is used to the food." },
    { question: "I used to travel a lot. What does it mean?", answer: "I traveled a lot in the past, but not anymore." },
    { question: "She is not finding online learning strange anymore. What do you say?", answer: "She is used to online learning." },
    { question: "We are starting to feel okay with the noise. What do you say?", answer: "We are getting used to the noise." },
    { question: "You no longer live in your hometown. What do you say?", answer: "I used to live in my hometown." },
    { question: "He is learning to live alone. What do you say?", answer: "He is getting used to living alone." },
    { question: "She worked nights before. What do you say?", answer: "She used to work nights." },
    { question: "We feel comfortable with the heat now. What do you say?", answer: "We are used to the heat." },
    { question: "They are slowly adjusting to school routines. What do you say?", answer: "They are getting used to waking up early." },
    { question: "You were a meat-eater in the past. What do you say?", answer: "I used to eat meat." },
    { question: "He doesn't mind crowded buses anymore. What do you say?", answer: "He is used to crowded buses." },
    { question: "You are still learning to use the app. What do you say?", answer: "I'm getting used to using the app." },
    { question: "She often walked to school as a child. What do you say?", answer: "She used to walk to school." },
    { question: "We don't find the traffic stressful anymore. What do you say?", answer: "We are used to the traffic." },
    { question: "They used to live in a big city. What do you say?", answer: "They used to live in a big city." },
    { question: "He is trying to learn to cook. What do you say?", answer: "He is getting used to cooking." },
    { question: "You are okay with loud music now. What do you say?", answer: "I am used to loud music." },
    { question: "She had a pet dog before. What do you say?", answer: "She used to have a dog." },
    { question: "We're adapting to virtual meetings. What do you say?", answer: "We are getting used to virtual meetings." },
    { question: "He was accustomed to eating late. What do you say?", answer: "He was used to eating late." },
    { question: "They are learning to live with less space. What do you say?", answer: "They are getting used to living in a smaller house." },
    { question: "I no longer work at night. What do you say?", answer: "I used to work at night." },
    { question: "She doesn't find cold showers shocking anymore. What do you say?", answer: "She is used to cold showers." },
    { question: "We are learning to live without TV. What do you say?", answer: "We're getting used to living without TV." },
    { question: "He lived with his parents before. What do you say?", answer: "He used to live with his parents." },
    { question: "You're adjusting to your new job. What do you say?", answer: "I'm getting used to my new job." }
  ]
};

// Module 123 Data
const MODULE_123_DATA = {
  title: "Causative – Have/Get Something Done (B1)",
  description: "Express that someone else does a service for you",
  intro: `'Have/Get something done' yapısı, bir işin başkası tarafından yapıldığını ifade eder.

**Yapı:** Subject + have/get + object + V3
- I had my car washed. (Arabamı yıkattım)
- She got her nails done. (Tırnaklarını yaptırdı)`,
  tip: "Use have/get + object + past participle when someone does a service for you.",

  table: [
    { form: "have + object + V3", example: "I had my hair cut.", meaning: "Someone cut my hair" },
    { form: "get + object + V3", example: "She got her car repaired.", meaning: "Someone repaired her car" }
  ],

  listeningExamples: [
    "I had my car washed.",
    "She got her nails done.",
    "We're having the kitchen renovated.",
    "He had his bike repaired.",
    "They got the house cleaned."
  ],

  speakingPractice: [
    { question: "You paid someone to fix your roof. What do you say?", answer: "I had my roof fixed." },
    { question: "She went to the salon for a haircut. What do you say?", answer: "She got her hair cut." },
    { question: "They are hiring painters for their house. What do you say?", answer: "They're having their house painted." },
    { question: "You called a technician to fix your laptop. What do you say?", answer: "I got my laptop repaired." },
    { question: "He paid someone to clean his suit. What do you say?", answer: "He had his suit cleaned." },
    { question: "We hired a gardener to cut the grass. What do you say?", answer: "We had the grass cut." },
    { question: "She paid a vet to check her dog. What do you say?", answer: "She got her dog checked." },
    { question: "They arranged a mechanic to fix the brakes. What do you say?", answer: "They got the brakes fixed." },
    { question: "You went to a tailor to alter your dress. What do you say?", answer: "I had my dress altered." },
    { question: "He sent his car to be washed. What do you say?", answer: "He got his car washed." },
    { question: "We are hiring someone to decorate the living room. What do you say?", answer: "We're having the living room decorated." },
    { question: "She called someone to install the air conditioner. What do you say?", answer: "She had the air conditioner installed." },
    { question: "They asked a specialist to paint the ceiling. What do you say?", answer: "They got the ceiling painted." },
    { question: "You arranged for a locksmith to fix the door. What do you say?", answer: "I had the door fixed." },
    { question: "He is paying someone to fix the plumbing. What do you say?", answer: "He is getting the plumbing fixed." },
    { question: "We are sending the documents for translation. What do you say?", answer: "We're having the documents translated." },
    { question: "She asked a professional to take her photo. What do you say?", answer: "She got her photo taken." },
    { question: "You took your watch to be repaired. What do you say?", answer: "I had my watch repaired." },
    { question: "They went to the dentist for a cleaning. What do you say?", answer: "They got their teeth cleaned." },
    { question: "He took the suit to the dry cleaner. What do you say?", answer: "He had his suit dry-cleaned." },
    { question: "You are arranging someone to fix the internet. What do you say?", answer: "I'm getting the internet fixed." },
    { question: "She had her laptop upgraded. What does it mean?", answer: "Someone upgraded her laptop for her." },
    { question: "They hired a painter for the fence. What do you say?", answer: "They had the fence painted." },
    { question: "We asked a plumber to install a new sink. What do you say?", answer: "We got a new sink installed." },
    { question: "He is arranging for his shoes to be polished. What do you say?", answer: "He is getting his shoes polished." },
    { question: "You asked someone to clean your windows. What do you say?", answer: "I had my windows cleaned." },
    { question: "She arranged someone to fix the leak. What do you say?", answer: "She had the leak fixed." },
    { question: "They paid a specialist to clean the carpet. What do you say?", answer: "They got the carpet cleaned." },
    { question: "He hired a photographer for portraits. What do you say?", answer: "He had his portraits taken." },
    { question: "You called a technician to fix the TV. What do you say?", answer: "I got the TV fixed." },
    { question: "We are asking someone to check the heating. What do you say?", answer: "We're having the heating checked." },
    { question: "She is getting a new lock installed. What do you say?", answer: "She is getting a new lock installed." },
    { question: "They arranged for the garage door to be replaced. What do you say?", answer: "They had the garage door replaced." },
    { question: "You are having your documents copied. What do you say?", answer: "I'm having my documents copied." },
    { question: "He is sending his coat for repair. What do you say?", answer: "He is getting his coat repaired." },
    { question: "We are paying someone to fix the garden lights. What do you say?", answer: "We're having the garden lights fixed." },
    { question: "She asked the salon to do her nails. What do you say?", answer: "She got her nails done." },
    { question: "They hired workers to fix the roof. What do you say?", answer: "They had the roof repaired." },
    { question: "You are paying a mechanic to change the oil. What do you say?", answer: "I'm getting the oil changed." },
    { question: "He asked a technician to repair the fridge. What do you say?", answer: "He got the fridge repaired." }
  ]
};

// Module 124 Data
const MODULE_124_DATA = {
  title: "Relative Clauses – Defining & Non-defining (B1)",
  description: "Learn to use defining and non-defining relative clauses with who, which, that, whose, where, when",
  intro: `Relative clause (ilgi cümleciği), bir isim hakkında daha fazla bilgi vermek için kullanılır.

**Defining Relative Clause:** Gerekli bilgi verir, virgül kullanılmaz.
→ The woman who helped me is a nurse. (Hangi kadın olduğu önemli)

**Non-defining Relative Clause:** Ek bilgi ekler, virgül kullanılır.
→ My friend, who is a great cook, made this. (Arkadaşımın kim olduğu belli, ek bilgi)`,
  tip: "Use defining clauses (no commas) for essential info. Use non-defining clauses (with commas) for extra info.",
  table: [
    { pronoun: "who", use: "People", example: "The man who called is my uncle." },
    { pronoun: "which", use: "Things/Animals", example: "The book which won the prize is great." },
    { pronoun: "that", use: "People/Things (defining only)", example: "The car that I bought is red." },
    { pronoun: "whose", use: "Possession", example: "The girl whose father is a pilot lives here." }
  ],
  listeningExamples: [
    "The woman who helped me is a nurse.",
    "That's the restaurant where we had dinner.",
    "My friend, who is a great cook, made this dish.",
    "I visited Istanbul, which is my favorite city.",
    "The man whose car was stolen reported it to the police."
  ],
  speakingPractice: [
    { question: "Who is the man? He is talking to your sister.", answer: "The man who is talking to your sister is my uncle." },
    { question: "That's the restaurant. We had dinner there.", answer: "That's the restaurant where we had dinner." },
    { question: "She has a friend. Her father is a pilot.", answer: "She has a friend whose father is a pilot." },
    { question: "I met a woman. She speaks six languages.", answer: "I met a woman who speaks six languages." },
    { question: "This is the pen. I found it in the classroom.", answer: "This is the pen that I found in the classroom." },
    { question: "This house was built in 1880. It is very beautiful.", answer: "This house, which was built in 1880, is very beautiful." },
    { question: "My brother lives in Germany. He's an engineer.", answer: "My brother, who lives in Germany, is an engineer." },
    { question: "That's the girl. Her mother is a teacher.", answer: "That's the girl whose mother is a teacher." },
    { question: "The car belongs to my neighbor. It was stolen.", answer: "The car that belongs to my neighbor was stolen." },
    { question: "We stayed at a hotel. It had a beautiful view.", answer: "We stayed at a hotel which had a beautiful view." },
    { question: "Mr. Smith is very kind. He is our math teacher.", answer: "Mr. Smith, who is our math teacher, is very kind." },
    { question: "This is the town. I was born there.", answer: "This is the town where I was born." },
    { question: "The woman is an actress. She lives next door.", answer: "The woman who lives next door is an actress." },
    { question: "The students are smart. They passed the exam.", answer: "The students who passed the exam are smart." },
    { question: "I know a man. His daughter is a singer.", answer: "I know a man whose daughter is a singer." },
    { question: "That's the museum. I told you about it.", answer: "That's the museum which I told you about." },
    { question: "Our teacher is very patient. He helps everyone.", answer: "Our teacher, who helps everyone, is very patient." },
    { question: "The dog barked all night. It lives next door.", answer: "The dog that lives next door barked all night." },
    { question: "My aunt is a writer. She travels a lot.", answer: "My aunt, who travels a lot, is a writer." },
    { question: "The dress is lovely. She is wearing it.", answer: "The dress that she is wearing is lovely." },
    { question: "My friend invited me to his birthday. He is from Canada.", answer: "My friend, who is from Canada, invited me to his birthday." },
    { question: "They visited a castle. It was built in the 13th century.", answer: "They visited a castle which was built in the 13th century." },
    { question: "The man is a famous actor. We saw him at the airport.", answer: "The man whom we saw at the airport is a famous actor." },
    { question: "I read a book. It changed my life.", answer: "I read a book that changed my life." },
    { question: "We have a neighbor. His dog barks all day.", answer: "We have a neighbor whose dog barks all day." },
    { question: "This is the school. I studied there.", answer: "This is the school where I studied." },
    { question: "The children are noisy. They live upstairs.", answer: "The children who live upstairs are noisy." },
    { question: "Emma is my cousin. She works at a hospital.", answer: "Emma, who works at a hospital, is my cousin." },
    { question: "The film was amazing. You recommended it.", answer: "The film which you recommended was amazing." },
    { question: "He has a company. It sells organic products.", answer: "He has a company that sells organic products." },
    { question: "That's the teacher. I told you about her.", answer: "That's the teacher whom I told you about." },
    { question: "The computer is expensive. I want to buy it.", answer: "The computer that I want to buy is expensive." },
    { question: "Our neighbor is an artist. He paints landscapes.", answer: "Our neighbor, who paints landscapes, is an artist." },
    { question: "There is a street. Many famous people live there.", answer: "There is a street where many famous people live." },
    { question: "The girl is very polite. She helped me yesterday.", answer: "The girl who helped me yesterday is very polite." },
    { question: "He lost the keys. They open the garage door.", answer: "He lost the keys that open the garage door." },
    { question: "The book is on the table. It belongs to my sister.", answer: "The book that is on the table belongs to my sister." },
    { question: "The phone was broken. I bought it last week.", answer: "The phone which I bought last week was broken." },
    { question: "I saw a man. He looked exactly like your uncle.", answer: "I saw a man who looked exactly like your uncle." },
    { question: "She lives in a house. It has a red roof.", answer: "She lives in a house which has a red roof." }
  ]
};

// Module 125 Data
const MODULE_125_DATA = {
  title: "Gerunds and Infinitives – Review (B1)",
  description: "Review and consolidate gerunds and infinitives with verbs that change meaning",
  intro: `Gerund (fiil+ing) ve infinitive (to + fiil) yapıları fiillerden sonra kullanılır ve hangi fiilin hangisini aldığı ezberlenmelidir.

**Sadece Gerund alan fiiller:** enjoy, finish, avoid, can't stand, suggest
→ I enjoy swimming.

**Sadece Infinitive alan fiiller:** want, decide, hope, agree, promise
→ She decided to leave.

**Anlam değişen fiiller:** remember, forget, stop, try
→ I forgot to call. (aramayı unuttum - aramadım)
→ I forgot calling. (aradığımı unuttum - aradım ama hatırlamıyorum)`,
  tip: "Some verbs take only gerunds, some only infinitives, and some both with meaning changes.",
  table: [
    { verb: "enjoy/finish/avoid", pattern: "+ gerund (-ing)", example: "I enjoy cooking." },
    { verb: "want/decide/hope", pattern: "+ infinitive (to)", example: "She decided to leave." },
    { verb: "remember/forget", pattern: "+ both (meaning change)", example: "I forgot to lock / forgot locking" }
  ],
  listeningExamples: [
    "I enjoy swimming in the sea.",
    "She decided to leave early.",
    "He forgot to lock the door.",
    "They stopped smoking last year.",
    "We are planning to visit London."
  ],
  speakingPractice: [
    { question: "You like playing chess. What do you say?", answer: "I enjoy playing chess." },
    { question: "She plans to study abroad. What do you say?", answer: "She plans to study abroad." },
    { question: "They stopped watching TV. What do you say?", answer: "They stopped watching TV." },
    { question: "You forgot to call your mom. What do you say?", answer: "I forgot to call my mom." },
    { question: "He avoided answering the question. What do you say?", answer: "He avoided answering the question." },
    { question: "We decided to take the train. What do you say?", answer: "We decided to take the train." },
    { question: "She can't stand waiting in line. What do you say?", answer: "She can't stand waiting in line." },
    { question: "You want to learn Spanish. What do you say?", answer: "I want to learn Spanish." },
    { question: "He tried to fix the car. What do you say?", answer: "He tried to fix the car." },
    { question: "They finished cleaning the house. What do you say?", answer: "They finished cleaning the house." },
    { question: "You remembered locking the door. What do you say?", answer: "I remembered locking the door." },
    { question: "She hopes to meet him again. What do you say?", answer: "She hopes to meet him again." },
    { question: "He promised to help us. What do you say?", answer: "He promised to help us." },
    { question: "You enjoy cooking. What do you say?", answer: "I enjoy cooking." },
    { question: "They agreed to join the club. What do you say?", answer: "They agreed to join the club." },
    { question: "She avoided speaking in public. What do you say?", answer: "She avoided speaking in public." },
    { question: "You want to improve your English. What do you say?", answer: "I want to improve my English." },
    { question: "He began working out. What do you say?", answer: "He began working out." },
    { question: "We stopped to buy some snacks. What do you say?", answer: "We stopped to buy some snacks." },
    { question: "She forgot taking her medicine. What does that mean?", answer: "She took it, but she doesn't remember." },
    { question: "He remembered to lock the door. What does that mean?", answer: "He locked it, and he remembered to do it." },
    { question: "You prefer staying home. What do you say?", answer: "I prefer staying home." },
    { question: "They need to study harder. What do you say?", answer: "They need to study harder." },
    { question: "We continued talking for hours. What do you say?", answer: "We continued talking for hours." },
    { question: "She managed to finish on time. What do you say?", answer: "She managed to finish on time." },
    { question: "You agreed to help your friend. What do you say?", answer: "I agreed to help my friend." },
    { question: "He enjoys watching documentaries. What do you say?", answer: "He enjoys watching documentaries." },
    { question: "She suggested going out for dinner. What do you say?", answer: "She suggested going out for dinner." },
    { question: "They decided to take a break. What do you say?", answer: "They decided to take a break." },
    { question: "You like reading novels. What do you say?", answer: "I like reading novels." },
    { question: "He prefers to work alone. What do you say?", answer: "He prefers to work alone." },
    { question: "She finished writing her report. What do you say?", answer: "She finished writing her report." },
    { question: "They hope to win the match. What do you say?", answer: "They hope to win the match." },
    { question: "We tried restarting the computer. What do you say?", answer: "We tried restarting the computer." },
    { question: "He started to play football. What do you say?", answer: "He started to play football." },
    { question: "You want to be successful. What do you say?", answer: "I want to be successful." },
    { question: "She keeps talking during the movie. What do you say?", answer: "She keeps talking during the movie." },
    { question: "They promised to return the money. What do you say?", answer: "They promised to return the money." },
    { question: "You enjoy listening to music. What do you say?", answer: "I enjoy listening to music." },
    { question: "He hopes to travel the world. What do you say?", answer: "He hopes to travel the world." }
  ]
};

// Module 126 Data
const MODULE_126_DATA = {
  title: "Expressions with Get (B1)",
  description: "Learn common expressions and phrasal uses of 'get' in everyday English",
  intro: `'Get' fiili İngilizce'de birçok farklı anlam ve kullanımda yer alır; özellikle deyimsel ifadelerde yaygındır.

**Yapı:** Subject + get + adjective/state
→ I get tired every evening. (Yorgunum - durum değişimi)
→ She gets angry easily. (Kızıyor - durum değişimi)
→ We got lost. (Kaybolduk - sonuç)`,
  tip: "Use 'get + adjective' to describe state changes (get tired, get angry, get ready, etc.).",
  table: [
    { expression: "get ready/dressed", meaning: "hazırlanmak/giyinmek", example: "I'm getting ready for school." },
    { expression: "get tired/sick/better", meaning: "yorulmak/hastalanmak/iyileşmek", example: "She got sick last week." },
    { expression: "get lost/married/angry", meaning: "kaybolmak/evlenmek/kızmak", example: "We got lost in the city." }
  ],
  listeningExamples: [
    "I usually get tired in the evening.",
    "She gets angry when people are late.",
    "We got lost in the forest.",
    "He's getting ready for school.",
    "They got married in Italy."
  ],
  speakingPractice: [
    { question: "You're preparing to leave. What do you say?", answer: "I'm getting ready." },
    { question: "After a long day, you feel exhausted. What do you say?", answer: "I get tired after work." },
    { question: "You went to a foreign city and couldn't find your way. What do you say?", answer: "We got lost." },
    { question: "She became very upset. What do you say?", answer: "She got angry." },
    { question: "You are putting on your clothes. What do you say?", answer: "I'm getting dressed." },
    { question: "They improved after the flu. What do you say?", answer: "They got better." },
    { question: "He reached home. What do you say?", answer: "He got home." },
    { question: "She became ill. What do you say?", answer: "She got sick." },
    { question: "You and your partner had a wedding last year. What do you say?", answer: "We got married last year." },
    { question: "He began to feel cold. What do you say?", answer: "He got cold." },
    { question: "You are becoming nervous. What do you say?", answer: "I'm getting nervous." },
    { question: "The kids became excited. What do you say?", answer: "The kids got excited." },
    { question: "You felt sleepy during the film. What do you say?", answer: "I got sleepy during the movie." },
    { question: "She became famous after the movie. What do you say?", answer: "She got famous after that film." },
    { question: "He recovered from the flu. What do you say?", answer: "He got better." },
    { question: "You're dressing up for a party. What do you say?", answer: "I'm getting dressed for the party." },
    { question: "They moved to the city. What do you say?", answer: "They got to the city last week." },
    { question: "She became scared in the dark. What do you say?", answer: "She got scared in the dark." },
    { question: "You are going to be late. What do you say?", answer: "I need to get going." },
    { question: "The room became noisy. What do you say?", answer: "The room got noisy." },
    { question: "He became rich after winning the lottery. What do you say?", answer: "He got rich after the lottery." },
    { question: "You are beginning to feel hungry. What do you say?", answer: "I'm getting hungry." },
    { question: "She became bored during the lecture. What do you say?", answer: "She got bored during the lecture." },
    { question: "You are recovering from an illness. What do you say?", answer: "I'm getting better." },
    { question: "The baby became sleepy. What do you say?", answer: "The baby got sleepy." },
    { question: "He became interested in science. What do you say?", answer: "He got interested in science." },
    { question: "We became close friends. What do you say?", answer: "We got close." },
    { question: "You arrived at school. What do you say?", answer: "I got to school on time." },
    { question: "She became very happy. What do you say?", answer: "She got really happy." },
    { question: "He put on his suit. What do you say?", answer: "He got dressed." },
    { question: "You are excited about the trip. What do you say?", answer: "I'm getting excited about the trip." },
    { question: "The weather became colder. What do you say?", answer: "It's getting cold." },
    { question: "She got confused during the test. What do you say?", answer: "She got confused." },
    { question: "You became nervous before the presentation. What do you say?", answer: "I got nervous before the presentation." },
    { question: "The dog became aggressive. What do you say?", answer: "The dog got aggressive." },
    { question: "He's preparing for the interview. What do you say?", answer: "He's getting ready for the interview." },
    { question: "You were surprised by the news. What do you say?", answer: "I got surprised by the news." },
    { question: "We arrived home late. What do you say?", answer: "We got home late." },
    { question: "She became sick after eating seafood. What do you say?", answer: "She got sick after eating seafood." },
    { question: "He was scared by the movie. What do you say?", answer: "He got scared by the movie." }
  ]
};

// Module 127 Data
const MODULE_127_DATA = {
  title: "Expressions with Take (B1)",
  description: "Learn common expressions with 'take' in everyday and professional contexts",
  intro: `'Take' fiili İngilizce'de çok sayıda deyimsel ifadede kullanılır; anlamı bağlama göre değişir.

**Yapı:** Subject + take + noun/expression
→ take part (katılmak), take place (gerçekleşmek), take care (dikkat etmek/ilgilenmek), take a break (mola vermek)`,
  tip: "Learn 'take' expressions as fixed phrases: take part, take place, take care, take notes, etc.",
  table: [
    { expression: "take part", meaning: "katılmak", example: "I took part in the competition." },
    { expression: "take place", meaning: "gerçekleşmek/olmak", example: "The meeting took place yesterday." },
    { expression: "take care", meaning: "dikkat etmek/ilgilenmek", example: "Take care when driving." }
  ],
  listeningExamples: [
    "I took part in the competition.",
    "The meeting took place in the main hall.",
    "Take care when crossing the road.",
    "He took a break after working all day.",
    "She took responsibility for the mistake."
  ],
  speakingPractice: [
    { question: "You joined a project. What do you say?", answer: "I took part in the project." },
    { question: "The concert happened last night. What do you say?", answer: "The concert took place last night." },
    { question: "You're helping your grandmother. What do you say?", answer: "I'm taking care of my grandmother." },
    { question: "You're going on a short rest. What do you say?", answer: "I'm taking a break." },
    { question: "You want someone to look at something. What do you say?", answer: "Take a look at this." },
    { question: "You're benefiting from an opportunity. What do you say?", answer: "I'm taking advantage of the opportunity." },
    { question: "You're writing during a lecture. What do you say?", answer: "I'm taking notes." },
    { question: "You accepted a duty at work. What do you say?", answer: "I took responsibility." },
    { question: "The process needs a long time. What do you say?", answer: "It takes time." },
    { question: "You're reacting to a problem. What do you say?", answer: "We need to take action." },
    { question: "You're handling a child. What do you say?", answer: "I'm taking care of the child." },
    { question: "The seminar was held yesterday. What do you say?", answer: "The seminar took place yesterday." },
    { question: "You're using a chance. What do you say?", answer: "I took advantage of the situation." },
    { question: "You stopped working briefly. What do you say?", answer: "I took a break." },
    { question: "The exam occurred this morning. What do you say?", answer: "The exam took place this morning." },
    { question: "You joined a school activity. What do you say?", answer: "I took part in the school activity." },
    { question: "You made some quick notes. What do you say?", answer: "I took notes." },
    { question: "You accepted blame. What do you say?", answer: "I took responsibility." },
    { question: "You acted immediately. What do you say?", answer: "We took action." },
    { question: "You need to rest. What do you say?", answer: "I need to take a break." },
    { question: "You helped organize the event. What do you say?", answer: "I took part in organizing it." },
    { question: "You warned someone to be careful. What do you say?", answer: "Take care!" },
    { question: "You gave attention to your health. What do you say?", answer: "I'm taking care of my health." },
    { question: "You examined the report. What do you say?", answer: "I took a look at the report." },
    { question: "It required patience. What do you say?", answer: "It took time and effort." },
    { question: "The event will happen next week. What do you say?", answer: "The event will take place next week." },
    { question: "You jotted down key points. What do you say?", answer: "I took some notes." },
    { question: "You became responsible for a task. What do you say?", answer: "I took responsibility for it." },
    { question: "You decided to act. What do you say?", answer: "I decided to take action." },
    { question: "You're checking a document. What do you say?", answer: "Let me take a look at it." },
    { question: "You are caring for a plant. What do you say?", answer: "I'm taking care of the plant." },
    { question: "You paused during a lesson. What do you say?", answer: "We took a short break." },
    { question: "You joined a protest. What do you say?", answer: "I took part in the protest." },
    { question: "You got benefit from a discount. What do you say?", answer: "I took advantage of the discount." },
    { question: "You are writing during a lecture. What do you say?", answer: "I'm taking notes right now." },
    { question: "You planned a meeting. What do you say?", answer: "The meeting will take place at 3 PM." },
    { question: "You managed a responsibility. What do you say?", answer: "I took responsibility and handled it." },
    { question: "You acted quickly. What do you say?", answer: "I took action immediately." },
    { question: "You are reading a report. What do you say?", answer: "I'm taking a look at the report." },
    { question: "You are caring for your dog. What do you say?", answer: "I'm taking care of my dog." }
  ]
};

// Module 128 Data
const MODULE_128_DATA = {
  title: "Phrasal Verbs – Separable & Inseparable (B1)",
  description: "Distinguish between separable and inseparable phrasal verbs",
  intro: `Phrasal verbs (öbek fiiller) fiil + edat/zarf birleşimidir; bazıları ayrılabilen, bazıları ayrılamaz.

**Separable:** Nesne fiilin arasına girebilir → turn off the TV / turn the TV off
**Inseparable:** Nesne fiilden sonra gelir → look after the dog (NOT: look the dog after)`,
  tip: "Separable: turn off, pick up, give back. Inseparable: look after, get over, run into.",
  table: [
    { type: "Separable", examples: "turn off, pick up, put on", pattern: "V + obj + particle OR V + particle + obj" },
    { type: "Inseparable", examples: "look after, get over, run into", pattern: "V + particle + obj (only)" }
  ],
  listeningExamples: [
    "Please turn off the TV.",
    "I gave the book back to her.",
    "She looks after her little sister.",
    "We came across an interesting article.",
    "He picked the keys up from the ground."
  ],
  speakingPractice: [
    { question: "You stop the alarm. What do you say?", answer: "I turned off the alarm." },
    { question: "You returned the book. What do you say?", answer: "I gave the book back." },
    { question: "She takes care of her dog. What do you say?", answer: "She looks after her dog." },
    { question: "You picked up your pen. What do you say?", answer: "I picked the pen up." },
    { question: "They cancelled the meeting. What do you say?", answer: "They called off the meeting." },
    { question: "He found an old photo. What do you say?", answer: "He came across an old photo." },
    { question: "You are wearing your jacket. What do you say?", answer: "I put on my jacket." },
    { question: "She faced a difficult situation. What do you say?", answer: "She dealt with it well." },
    { question: "We overcame the problem. What do you say?", answer: "We got over the problem." },
    { question: "You answered the phone. What do you say?", answer: "I picked up the phone." },
    { question: "He found his keys by chance. What do you say?", answer: "He came across his keys." },
    { question: "She returned the call. What do you say?", answer: "She called him back." },
    { question: "You removed your shoes. What do you say?", answer: "I took off my shoes." },
    { question: "They cancelled the show. What do you say?", answer: "They called off the show." },
    { question: "You helped your friend recover. What do you say?", answer: "I helped him get over it." },
    { question: "He managed a tough client. What do you say?", answer: "He dealt with the client." },
    { question: "She found her bag in the closet. What do you say?", answer: "She came across her bag." },
    { question: "I need to remove my coat. What do you say?", answer: "I need to take off my coat." },
    { question: "You helped the child. What do you say?", answer: "I looked after the child." },
    { question: "He turned off the light. What do you say?", answer: "He turned the light off." },
    { question: "You put your coat on. What do you say?", answer: "I put on my coat." },
    { question: "They ran into trouble. What do you say?", answer: "They ran into some trouble." },
    { question: "You returned his call. What do you say?", answer: "I called him back." },
    { question: "You took off your glasses. What do you say?", answer: "I took off my glasses." },
    { question: "She dealt with the issue. What do you say?", answer: "She dealt with the issue effectively." },
    { question: "You canceled your appointment. What do you say?", answer: "I called off my appointment." },
    { question: "He found something interesting. What do you say?", answer: "He came across something interesting." },
    { question: "You gave the toy back. What do you say?", answer: "I gave the toy back to the child." },
    { question: "He helped a student recover. What do you say?", answer: "He helped the student get over it." },
    { question: "She looked after her niece. What do you say?", answer: "She looked after her niece." },
    { question: "You put on a hat. What do you say?", answer: "I put on a hat." },
    { question: "He turned off the heater. What do you say?", answer: "He turned the heater off." },
    { question: "You picked up the remote. What do you say?", answer: "I picked up the remote." },
    { question: "We came across an old letter. What do you say?", answer: "We came across an old letter." },
    { question: "He dealt with the complaint. What do you say?", answer: "He dealt with the complaint well." },
    { question: "She took off her jacket. What do you say?", answer: "She took her jacket off." },
    { question: "You gave the book to the teacher. What do you say?", answer: "I gave the book back to the teacher." },
    { question: "He ran into an old friend. What do you say?", answer: "He ran into an old friend at the mall." },
    { question: "We put on our shoes. What do you say?", answer: "We put on our shoes." },
    { question: "She called off the match. What do you say?", answer: "She called off the match due to rain." }
  ]
};

// Module 129 Data
const MODULE_129_DATA = {
  title: "Phrasal Verbs – Common Everyday Verbs (B1)",
  description: "Learn and practice phrasal verbs used in daily conversations",
  intro: `Günlük konuşmalarda çok kullanılan phrasal verbs listesi: wake up (uyanmak), get up (kalkmak), find out (öğrenmek), give up (vazgeçmek), look for (aramak), go out (dışarı çıkmak), come back (dönmek)`,
  tip: "Master these everyday phrasal verbs: wake up, get up, find out, give up, look for, turn on/off.",
  table: [
    { phrasal_verb: "wake up / get up", meaning: "uyanmak / kalkmak", example: "I wake up at 7, then get up at 7:15." },
    { phrasal_verb: "find out / give up", meaning: "öğrenmek / vazgeçmek", example: "He found out the truth. She gave up smoking." },
    { phrasal_verb: "look for / look after", meaning: "aramak / bakmak", example: "I'm looking for my keys. She looks after her dog." }
  ],
  listeningExamples: [
    "I wake up at 7 a.m. every day.",
    "She gave up smoking last year.",
    "We're looking for a new apartment.",
    "He found out the truth.",
    "Don't forget to turn off the lights."
  ],
  speakingPractice: [
    { question: "You stop trying to lose weight. What do you say?", answer: "I gave up losing weight." },
    { question: "You are searching for your glasses. What do you say?", answer: "I'm looking for my glasses." },
    { question: "She returned home late. What do you say?", answer: "She came back late." },
    { question: "You woke up at 6. What do you say?", answer: "I woke up at 6 o'clock." },
    { question: "He got out of bed. What do you say?", answer: "He got up at 7." },
    { question: "They discovered the secret. What do you say?", answer: "They found out the secret." },
    { question: "You exited the hotel. What do you say?", answer: "I checked out of the hotel." },
    { question: "He turned on the computer. What do you say?", answer: "He turned the computer on." },
    { question: "You took care of a child. What do you say?", answer: "I looked after a child." },
    { question: "She quit her bad habit. What do you say?", answer: "She gave up her bad habit." },
    { question: "You went outside. What do you say?", answer: "I went out for a walk." },
    { question: "He came back from Spain. What do you say?", answer: "He came back yesterday." },
    { question: "They checked in at the airport. What do you say?", answer: "They checked in at 2 PM." },
    { question: "She's searching for her keys. What do you say?", answer: "She's looking for her keys." },
    { question: "You turned off the radio. What do you say?", answer: "I turned off the radio." },
    { question: "He is taking care of his dog. What do you say?", answer: "He is looking after his dog." },
    { question: "You woke up early. What do you say?", answer: "I woke up early today." },
    { question: "They got up very late. What do you say?", answer: "They got up at noon." },
    { question: "You gave up drinking coffee. What do you say?", answer: "I gave up drinking coffee." },
    { question: "He came back from holiday. What do you say?", answer: "He came back last week." },
    { question: "She turned on the lights. What do you say?", answer: "She turned the lights on." },
    { question: "You checked in at the hotel. What do you say?", answer: "I checked in yesterday." },
    { question: "They looked after the baby. What do you say?", answer: "They looked after the baby all day." },
    { question: "You found out the truth. What do you say?", answer: "I found out the truth yesterday." },
    { question: "He got up early. What do you say?", answer: "He got up before sunrise." },
    { question: "You checked out this morning. What do you say?", answer: "I checked out this morning." },
    { question: "She looked for her notebook. What do you say?", answer: "She looked for it everywhere." },
    { question: "You gave up trying. What do you say?", answer: "I gave up trying to fix it." },
    { question: "He looked after his sick father. What do you say?", answer: "He looked after him for weeks." },
    { question: "You turned off your phone. What do you say?", answer: "I turned my phone off." },
    { question: "They went out to eat. What do you say?", answer: "They went out for dinner." },
    { question: "You came back home. What do you say?", answer: "I came back around 8 PM." },
    { question: "You looked for your passport. What do you say?", answer: "I looked for my passport everywhere." },
    { question: "He woke up with a headache. What do you say?", answer: "He woke up with a headache." },
    { question: "She gave up learning French. What do you say?", answer: "She gave up learning French." },
    { question: "You got up at 5 a.m. What do you say?", answer: "I got up at 5 a.m." },
    { question: "They found out the answer. What do you say?", answer: "They found out the correct answer." },
    { question: "You turned on the heating. What do you say?", answer: "I turned on the heating." },
    { question: "She checked out at 10. What do you say?", answer: "She checked out at 10 a.m." },
    { question: "You looked after your little sister. What do you say?", answer: "I looked after my little sister." }
  ]
};

// Module 130 Data
const MODULE_130_DATA = {
  title: "Collocations with Make and Do (B1)",
  description: "Learn common collocations with 'make' and 'do' in various contexts",
  intro: `'Make' üretim/sonuç; 'Do' eylem/yükümlülük/tekrar eden işler için kullanılır.

**MAKE:** make a decision, make a mistake, make money, make a phone call, make an effort
**DO:** do homework, do the dishes, do your best, do business, do the shopping`,
  tip: "MAKE = creating/producing. DO = actions/tasks. Learn fixed collocations.",
  table: [
    { verb: "make", collocations: "decision, mistake, money, call, effort", example: "I made a decision." },
    { verb: "do", collocations: "homework, dishes, best, shopping, cleaning", example: "I did the dishes." }
  ],
  listeningExamples: [
    "I made a cake for her birthday.",
    "He did the laundry last night.",
    "They made a big mistake.",
    "She is doing her best."
  ],
  speakingPractice: [
    { question: "You completed your homework. What do you say?", answer: "I did my homework." },
    { question: "She earned a lot last year. What do you say?", answer: "She made a lot of money." },
    { question: "They prepared a plan. What do you say?", answer: "They made a plan." },
    { question: "He cleaned the kitchen. What do you say?", answer: "He did the cleaning." },
    { question: "You tried very hard. What do you say?", answer: "I did my best." },
    { question: "She called her mother. What do you say?", answer: "She made a phone call." },
    { question: "He made a big mistake. What do you say?", answer: "He made a big mistake." },
    { question: "You helped with the shopping. What do you say?", answer: "I did the shopping." },
    { question: "They cooked a cake. What do you say?", answer: "They made a cake." },
    { question: "He completed the project. What do you say?", answer: "He did the project." },
    { question: "She broke a rule. What do you say?", answer: "She made a mistake." },
    { question: "I cleaned the dishes. What do you say?", answer: "I did the dishes." },
    { question: "They created a list. What do you say?", answer: "They made a list." },
    { question: "He worked hard. What do you say?", answer: "He did a great job." },
    { question: "You created a good impression. What do you say?", answer: "I made a good impression." },
    { question: "She did business with them. What do you say?", answer: "She did business with the company." },
    { question: "We prepared a reservation. What do you say?", answer: "We made a reservation." },
    { question: "They vacuumed the floor. What do you say?", answer: "They did the vacuuming." },
    { question: "He said something funny. What do you say?", answer: "He made a joke." },
    { question: "I tried hard. What do you say?", answer: "I did my best." },
    { question: "She created a piece of art. What do you say?", answer: "She made a beautiful painting." },
    { question: "He helped clean the windows. What do you say?", answer: "He did the windows." },
    { question: "They made a decision. What do you say?", answer: "They made an important decision." },
    { question: "You brushed your teeth. What do you say?", answer: "I did my teeth." },
    { question: "He created a presentation. What do you say?", answer: "He made a presentation." },
    { question: "She made a complaint. What do you say?", answer: "She made a complaint about the food." },
    { question: "You organized your closet. What do you say?", answer: "I did my closet." },
    { question: "They made a suggestion. What do you say?", answer: "They made a great suggestion." },
    { question: "She did her nails. What do you say?", answer: "She did her nails at the salon." },
    { question: "He made an effort. What do you say?", answer: "He made a big effort." },
    { question: "You finished the laundry. What do you say?", answer: "I did the laundry." },
    { question: "They made a toast. What do you say?", answer: "They made a toast at the wedding." },
    { question: "She made an excuse. What do you say?", answer: "She made an excuse for being late." },
    { question: "You created a schedule. What do you say?", answer: "I made a schedule for the week." },
    { question: "He did the ironing. What do you say?", answer: "He did all the ironing." },
    { question: "We made an agreement. What do you say?", answer: "We made an agreement yesterday." },
    { question: "You made your bed. What do you say?", answer: "I made my bed in the morning." },
    { question: "She did some yoga. What do you say?", answer: "She did yoga before work." },
    { question: "They made a mess. What do you say?", answer: "They made a mess in the kitchen." },
    { question: "He made a difference. What do you say?", answer: "He made a difference in their lives." }
  ]
};

// Module 131 Data
const MODULE_131_DATA = {
  title: "Indirect Questions (B1)",
  description: "Learn polite and formal indirect questions",
  intro: `Indirect questions (dolaylı sorular) doğrudan sorulara göre daha kibar ve formaldır; gömülü cümlede düz cümle sırası kullanılır.

**Yapı:** Could you tell me + where the bank is? (NOT: where is the bank?)
do/does/did gömülü kısımda KULLANILMAZ.`,
  tip: "Use statement word order after question starters: Could you tell me where it is? (not: where is it?)",
  table: [
    { starter: "Could you tell me...", example: "Could you tell me where the bank is?" },
    { starter: "Do you know...", example: "Do you know what time the class starts?" },
    { starter: "I was wondering...", example: "I was wondering why he is upset." }
  ],
  listeningExamples: [
    "Could you tell me where the bank is?",
    "Do you know what time the movie starts?",
    "I was wondering when the train arrives.",
    "Can you tell me how much this costs?",
    "Would you mind telling me where she went?"
  ],
  speakingPractice: [
    { question: "Where is the nearest bus stop?", answer: "Could you tell me where the nearest bus stop is?" },
    { question: "What time does the class start?", answer: "Do you know what time the class starts?" },
    { question: "Why is he so upset?", answer: "I was wondering why he is so upset." },
    { question: "When does the train arrive?", answer: "Can you tell me when the train arrives?" },
    { question: "How much does this cost?", answer: "Could you tell me how much this costs?" },
    { question: "Where did she go?", answer: "Do you know where she went?" },
    { question: "Why are they late?", answer: "Could you tell me why they are late?" },
    { question: "Who is that man?", answer: "Do you know who that man is?" },
    { question: "What does she want?", answer: "Can you tell me what she wants?" },
    { question: "How old is he?", answer: "I was wondering how old he is?" },
    { question: "Where is the library?", answer: "Could you tell me where the library is?" },
    { question: "When does the shop close?", answer: "Do you know when the shop closes?" },
    { question: "Why did he leave?", answer: "I was wondering why he left." },
    { question: "What time is it?", answer: "Can you tell me what time it is?" },
    { question: "How far is the station?", answer: "Could you tell me how far the station is?" },
    { question: "Who are those people?", answer: "Do you know who those people are?" },
    { question: "What did they say?", answer: "Can you tell me what they said?" },
    { question: "Where can I find help?", answer: "I was wondering where I can find help." },
    { question: "Why is this important?", answer: "Could you tell me why this is important?" },
    { question: "When will he come back?", answer: "Do you know when he will come back?" },
    { question: "How does it work?", answer: "Can you tell me how it works?" },
    { question: "What happened here?", answer: "I was wondering what happened here." },
    { question: "Where should I go?", answer: "Could you tell me where I should go?" },
    { question: "Who wrote this?", answer: "Do you know who wrote this?" },
    { question: "Why doesn't it work?", answer: "Can you tell me why it doesn't work?" },
    { question: "When did they arrive?", answer: "I was wondering when they arrived." },
    { question: "How many people came?", answer: "Could you tell me how many people came?" },
    { question: "What is her name?", answer: "Do you know what her name is?" },
    { question: "Where are we going?", answer: "Can you tell me where we are going?" },
    { question: "Why was he angry?", answer: "I was wondering why he was angry." },
    { question: "When is the meeting?", answer: "Could you tell me when the meeting is?" },
    { question: "How long will it take?", answer: "Do you know how long it will take?" },
    { question: "What should I bring?", answer: "Can you tell me what I should bring?" },
    { question: "Where did you put it?", answer: "I was wondering where you put it." },
    { question: "Who is in charge?", answer: "Could you tell me who is in charge?" },
    { question: "Why is she crying?", answer: "Do you know why she is crying?" },
    { question: "When does it open?", answer: "Can you tell me when it opens?" },
    { question: "How can I help?", answer: "I was wondering how I can help." },
    { question: "What are the rules?", answer: "Could you tell me what the rules are?" },
    { question: "Where is the exit?", answer: "Do you know where the exit is?" }
  ]
};

// Module 132 Data
const MODULE_132_DATA = {
  title: "Giving Opinions & Agreeing/Disagreeing (B1)",
  description: "Express opinions and agree or disagree politely in discussions",
  intro: `Fikir belirtme ve başkalarının fikirlerine katılma/karşı çıkma kalıpları; tartışma ve sohbetlerde kullanılır.

**Opinions:** I think..., In my opinion..., I believe..., From my point of view...
**Agreeing:** I agree, Exactly!, You're right, Absolutely!
**Disagreeing:** I disagree, I'm not sure about that, I see your point, but...`,
  tip: "Use polite phrases to agree/disagree: I see your point, but... / I'm afraid I don't agree.",
  table: [
    { function: "Giving opinion", examples: "I think..., In my opinion..., I believe...", sample: "I think it's a good idea." },
    { function: "Agreeing", examples: "I agree, Exactly!, Absolutely!", sample: "I agree with you." },
    { function: "Disagreeing", examples: "I disagree, I'm not sure, I see your point, but...", sample: "I see your point, but I prefer this." }
  ],
  listeningExamples: [
    "I think it's a good idea.",
    "In my opinion, school should start later.",
    "Exactly!",
    "I see your point, but I prefer this option."
  ],
  speakingPractice: [
    { question: "What do you think about this movie?", answer: "I think it's amazing!" },
    { question: "Do you agree with him?", answer: "Yes, I agree with him." },
    { question: "What's your opinion on this topic?", answer: "In my opinion, it's very important." },
    { question: "Do you believe it will work?", answer: "I believe it will work perfectly." },
    { question: "Do you think it's a good idea?", answer: "Yes, I think it's a great idea." },
    { question: "Do you agree or disagree?", answer: "I disagree because it's too risky." },
    { question: "What's your point of view?", answer: "From my point of view, it's not fair." },
    { question: "Do you think we should wait?", answer: "I'm not sure about that." },
    { question: "Is this a good solution?", answer: "Absolutely! It's perfect." },
    { question: "Can we try something else?", answer: "I see your point, but I prefer this option." },
    { question: "Do you think he's right?", answer: "Yes, I think so too." },
    { question: "What's your opinion about fast food?", answer: "I believe it's unhealthy." },
    { question: "Do you think money brings happiness?", answer: "That's not always true." },
    { question: "Do you agree that exams are necessary?", answer: "Yes, I agree." },
    { question: "Do you believe in ghosts?", answer: "No, I don't believe in them." },
    { question: "Is she correct?", answer: "You're right, she is." },
    { question: "Do you think it's safe?", answer: "I'm afraid I don't agree." },
    { question: "Do you agree with me?", answer: "Exactly!" },
    { question: "Is this a smart choice?", answer: "From my point of view, yes." },
    { question: "Do you think school uniforms are good?", answer: "In my opinion, they are useful." },
    { question: "Do you agree with the rules?", answer: "I don't agree with you." },
    { question: "What do you think about this law?", answer: "As far as I'm concerned, it's necessary." },
    { question: "Is the project ready?", answer: "I'm not sure about that." },
    { question: "Should we cancel the trip?", answer: "I see your point, but let's wait." },
    { question: "Do you think it's boring?", answer: "I think it's fun." },
    { question: "Do you like this design?", answer: "Absolutely!" },
    { question: "Is this the best option?", answer: "Yes, I agree." },
    { question: "Do you agree with her decision?", answer: "I disagree." },
    { question: "Do you think it's useful?", answer: "I believe it is." },
    { question: "What's your opinion on online education?", answer: "I think it's very flexible." },
    { question: "Is it good for children?", answer: "From my point of view, yes." },
    { question: "Do you think we should leave now?", answer: "I'm afraid I don't agree." },
    { question: "Do you agree with the teacher?", answer: "Yes, I agree with her." },
    { question: "What do you think about this food?", answer: "I think it tastes great." },
    { question: "Do you think it's cheap?", answer: "No, I think it's expensive." },
    { question: "Should we try it?", answer: "I see your point, but I don't think so." },
    { question: "Do you believe him?", answer: "Yes, I do." },
    { question: "Do you agree that English is important?", answer: "Absolutely!" },
    { question: "Do you think this idea will work?", answer: "I'm not sure about that." },
    { question: "What do you think about the plan?", answer: "In my opinion, it's risky." }
  ]
};

// Module 133 Data
const MODULE_133_DATA = {
  title: "Speculating & Expressing Possibility (B1)",
  description: "Express possibility, probability, and speculation using modal verbs and phrases",
  intro: `İhtimal ve tahmin ifade eden kalıplar: might, may, could (ihtimal), must (güçlü tahmin), can't (olumsuz tahmin), maybe, perhaps, I think, It's possible/likely.`,
  tip: "Use might/may/could for possibility, must for strong assumptions, can't for strong negatives.",
  table: [
    { modal: "might/may/could", meaning: "ihtimal/mümkün", example: "It might rain. / She may come." },
    { modal: "must", meaning: "kesin (güçlü tahmin)", example: "She must be tired. (Yorgun olmalı)" },
    { modal: "can't", meaning: "kesinlikle değil", example: "He can't be 80! (80 olamaz!)" }
  ],
  listeningExamples: [
    "It might rain tomorrow.",
    "She may come later.",
    "He must be tired.",
    "He can't be the thief.",
    "Maybe they are on vacation."
  ],
  speakingPractice: [
    { question: "Where is John?", answer: "He might be in the kitchen." },
    { question: "Is she coming to the party?", answer: "She may come later." },
    { question: "Do you think it will rain?", answer: "It could rain this evening." },
    { question: "Where are your keys?", answer: "They might be in my bag." },
    { question: "Is this information true?", answer: "Perhaps it's true." },
    { question: "Why is she crying?", answer: "She may be sad about something." },
    { question: "Will they be late?", answer: "It's possible that they'll be late." },
    { question: "Is he at home?", answer: "He could be at home." },
    { question: "Did she forget?", answer: "Maybe she forgot." },
    { question: "Is he the manager?", answer: "He might be." },
    { question: "Do you think he's tired?", answer: "He must be tired after work." },
    { question: "Did they travel abroad?", answer: "It's likely that they did." },
    { question: "Is this his phone?", answer: "It might be his." },
    { question: "Will she call you?", answer: "She may call me tonight." },
    { question: "Are they still at school?", answer: "They could still be there." },
    { question: "Is she sick?", answer: "Maybe she is." },
    { question: "Do you think it's dangerous?", answer: "It might be." },
    { question: "Why is the light on?", answer: "He may be in the room." },
    { question: "Is it true?", answer: "Perhaps it is." },
    { question: "Did he break the window?", answer: "He can't have done that." },
    { question: "Will it snow today?", answer: "It's unlikely, but possible." },
    { question: "Where is your phone?", answer: "It might be in the car." },
    { question: "Do you think they forgot the meeting?", answer: "They may have forgotten." },
    { question: "Did she leave already?", answer: "It's possible she did." },
    { question: "Are we lost?", answer: "We could be." },
    { question: "Is she angry?", answer: "She might be a little upset." },
    { question: "Is this your book?", answer: "It may be mine." },
    { question: "Do you think he lied?", answer: "He can't have lied." },
    { question: "Will they win the game?", answer: "It's likely they will." },
    { question: "Are they at the station?", answer: "They could be there now." },
    { question: "Is she nervous?", answer: "She might be." },
    { question: "Why didn't he answer?", answer: "He may be busy." },
    { question: "Is it his car?", answer: "Maybe it is." },
    { question: "Is this the right way?", answer: "It might be." },
    { question: "Where are they?", answer: "They could be stuck in traffic." },
    { question: "Is she the teacher?", answer: "She may be the new teacher." },
    { question: "Is it going to rain?", answer: "It's possible." },
    { question: "Why is he angry?", answer: "He might be having a bad day." },
    { question: "Do you think she's serious?", answer: "Perhaps she is." },
    { question: "Is this place safe?", answer: "It could be dangerous at night." }
  ]
};

// Module 134 Data
const MODULE_134_DATA = {
  title: "Hypothetical Situations – Second Conditional (B1)",
  description: "Talk about unreal or imaginary situations using Second Conditional",
  intro: `Varsayımsal durumlar için Second Conditional yapısı kullanılır: If + past simple, would + V.

**Yapı:** If + past simple, subject + would + base verb
→ If I had money, I would buy a car. (Param yok, ama olsaydı araba alırdım)`,
  tip: "Use Second Conditional for unreal/imaginary situations: If + past, would + verb.",
  table: [
    { structure: "If + past simple", result: "would + base verb", example: "If I won, I would celebrate." },
    { structure: "If I were you", meaning: "Tavsiye", example: "If I were you, I would study harder." }
  ],
  listeningExamples: [
    "If I won the lottery, I would buy a house.",
    "If she were here, I would say hello.",
    "What would you do if you lost your phone?",
    "If you could live anywhere, where would it be?",
    "If I had more time, I would learn a new language."
  ],
  speakingPractice: [
    { question: "What would you do if you won the lottery?", answer: "I would buy a house and travel." },
    { question: "If you were a bird, where would you fly?", answer: "I would fly over the mountains." },
    { question: "What would happen if it rained tomorrow?", answer: "We would cancel the picnic." },
    { question: "If he had more time, what would he do?", answer: "He would learn a new language." },
    { question: "If she were here, what would you say?", answer: "I would say hello." },
    { question: "What would you do if you lost your phone?", answer: "I would look for it everywhere." },
    { question: "If you met a celebrity, what would you ask?", answer: "I would ask for a photo." },
    { question: "If you could live anywhere, where would it be?", answer: "It would be Paris." },
    { question: "If I called you tonight, would you answer?", answer: "Yes, I would." },
    { question: "If they offered you a job, would you take it?", answer: "Yes, I would." },
    { question: "If you had a million dollars, what would you buy?", answer: "I would buy a new car." },
    { question: "If she saw a ghost, what would she do?", answer: "She would scream." },
    { question: "If you were invisible, what would you do?", answer: "I would sneak into places." },
    { question: "What would you do if you were the president?", answer: "I would help the poor." },
    { question: "If you could go anywhere, where would you go?", answer: "I would go to Japan." },
    { question: "If it snowed today, what would happen?", answer: "We would stay home." },
    { question: "If your friend needed help, what would you do?", answer: "I would help them." },
    { question: "If I asked you for advice, would you help me?", answer: "Of course I would." },
    { question: "If we had more money, what would we do?", answer: "We would go on vacation." },
    { question: "If they knew the answer, would they tell us?", answer: "Yes, they would." },
    { question: "If you didn't work, what would you do?", answer: "I would relax all day." },
    { question: "If you found a wallet, what would you do?", answer: "I would take it to the police." },
    { question: "If he had a car, would he drive to work?", answer: "Yes, he would." },
    { question: "If she didn't like the movie, what would she say?", answer: "She would say it's boring." },
    { question: "If you lived on the moon, what would you eat?", answer: "I would eat space food." },
    { question: "If we didn't have school today, what would we do?", answer: "We would go to the park." },
    { question: "If you could speak any language, which would it be?", answer: "It would be Spanish." },
    { question: "If you saw a bear, what would you do?", answer: "I would run away." },
    { question: "If it were your birthday, what would you want?", answer: "I would want a party." },
    { question: "If you were a teacher, what subject would you teach?", answer: "I would teach English." },
    { question: "If it were summer, what would you wear?", answer: "I would wear shorts." },
    { question: "If he were famous, what would he do?", answer: "He would act in movies." },
    { question: "If you had wings, where would you fly?", answer: "I would fly to the clouds." },
    { question: "If you broke your phone, what would you do?", answer: "I would buy a new one." },
    { question: "If we won the match, how would we celebrate?", answer: "We would have a party." },
    { question: "If your computer stopped working, what would you do?", answer: "I would call a technician." },
    { question: "If I gave you a gift, would you accept it?", answer: "Yes, I would." },
    { question: "If you were a cat, what would you do all day?", answer: "I would sleep." },
    { question: "If she missed the bus, what would happen?", answer: "She would be late." },
    { question: "If you had a superpower, what would it be?", answer: "It would be flying." }
  ]
};

// Module 135 Data
const MODULE_135_DATA = {
  title: "Expressing Preferences (B1)",
  description: "Use 'I prefer' and 'I'd rather' to express preferences",
  intro: `Tercih bildirmek için 'I prefer' ve 'I'd rather' kalıpları kullanılır.

**I prefer X to Y:** X'i Y'ye tercih ederim → I prefer coffee to tea.
**I'd rather + base verb:** ... yapmayı tercih ederim → I'd rather stay home.`,
  tip: "I prefer + noun/gerund. I'd rather + base verb (without 'to').",
  table: [
    { pattern: "I prefer X to Y", example: "I prefer coffee to tea." },
    { pattern: "I'd rather + verb", example: "I'd rather watch a movie." }
  ],
  listeningExamples: [
    "I prefer coffee to tea.",
    "I'd rather watch a movie than read a book.",
    "I prefer walking to cycling.",
    "I'd rather stay home tonight.",
    "I prefer dogs to cats."
  ],
  speakingPractice: [
    { question: "Do you prefer coffee or tea?", answer: "I prefer coffee to tea." },
    { question: "Would you rather watch a movie or read a book?", answer: "I'd rather watch a movie." },
    { question: "Do you prefer walking or cycling?", answer: "I prefer walking to cycling." },
    { question: "Would you rather go out or stay home?", answer: "I'd rather stay home." },
    { question: "Do you prefer dogs or cats?", answer: "I prefer dogs to cats." },
    { question: "Would you rather swim or run?", answer: "I'd rather swim." },
    { question: "Do you prefer summer or winter?", answer: "I prefer summer to winter." },
    { question: "Would you rather take the bus or drive?", answer: "I'd rather drive." },
    { question: "Do you prefer reading or watching TV?", answer: "I prefer reading to watching TV." },
    { question: "Would you rather eat out or cook at home?", answer: "I'd rather cook at home." },
    { question: "Do you prefer chocolate or vanilla?", answer: "I prefer chocolate to vanilla." },
    { question: "Would you rather travel alone or with friends?", answer: "I'd rather travel with friends." },
    { question: "Do you prefer city life or country life?", answer: "I prefer country life to city life." },
    { question: "Would you rather stay in a hotel or a tent?", answer: "I'd rather stay in a hotel." },
    { question: "Do you prefer pizza or pasta?", answer: "I prefer pizza to pasta." },
    { question: "Would you rather play football or basketball?", answer: "I'd rather play football." },
    { question: "Do you prefer watching movies or series?", answer: "I prefer movies to series." },
    { question: "Would you rather fly or take a train?", answer: "I'd rather fly." },
    { question: "Do you prefer texting or calling?", answer: "I prefer texting to calling." },
    { question: "Would you rather sleep early or stay up late?", answer: "I'd rather sleep early." },
    { question: "Do you prefer shopping online or in stores?", answer: "I prefer shopping online to shopping in stores." },
    { question: "Would you rather eat spicy food or sweet food?", answer: "I'd rather eat sweet food." },
    { question: "Do you prefer football or basketball?", answer: "I prefer football to basketball." },
    { question: "Would you rather go hiking or swimming?", answer: "I'd rather go swimming." },
    { question: "Do you prefer staying in or going out on weekends?", answer: "I prefer staying in." },
    { question: "Would you rather drink water or juice?", answer: "I'd rather drink water." },
    { question: "Do you prefer writing or speaking?", answer: "I prefer speaking to writing." },
    { question: "Would you rather live in a big city or a small town?", answer: "I'd rather live in a small town." },
    { question: "Do you prefer apples or bananas?", answer: "I prefer apples to bananas." },
    { question: "Would you rather listen to music or read a book?", answer: "I'd rather listen to music." },
    { question: "Do you prefer meat or vegetables?", answer: "I prefer meat to vegetables." },
    { question: "Would you rather eat fast food or homemade food?", answer: "I'd rather eat homemade food." },
    { question: "Do you prefer early mornings or late nights?", answer: "I prefer early mornings." },
    { question: "Would you rather go to the beach or the mountains?", answer: "I'd rather go to the beach." },
    { question: "Do you prefer Coke or Pepsi?", answer: "I prefer Coke to Pepsi." },
    { question: "Would you rather watch a horror or a comedy?", answer: "I'd rather watch a comedy." },
    { question: "Do you prefer flying or driving?", answer: "I prefer flying to driving." },
    { question: "Would you rather go to a concert or a play?", answer: "I'd rather go to a concert." },
    { question: "Do you prefer hot weather or cold weather?", answer: "I prefer hot weather." },
    { question: "Would you rather stay alone or be with people?", answer: "I'd rather be with people." }
  ]
};

// Module 136 Data
const MODULE_136_DATA = {
  title: "Narratives – Sequencing Words (B1)",
  description: "Tell stories using sequencing words: first, then, next, after that, finally",
  intro: `Hikaye anlatımında olayların sırasını belirtmek için sequencing words kullanılır: first (ilk), then (sonra), next (daha sonra), after that (ondan sonra), later (daha sonra), finally (sonunda), in the end (sonuçta).`,
  tip: "Use sequencing words to organize events: First... Then... After that... Finally...",
  table: [
    { word: "First / At first", meaning: "İlk olarak", example: "First, I woke up." },
    { word: "Then / Next / After that", meaning: "Sonra", example: "Then, I had breakfast." },
    { word: "Finally / In the end", meaning: "Sonunda", example: "Finally, I went to bed." }
  ],
  listeningExamples: [
    "First, I got out of bed. Then, I had a shower.",
    "After that, I got dressed. Next, I ate breakfast.",
    "Later, I went to school. Finally, I came back home.",
    "At the beginning, I was nervous. In the end, everything was fine.",
    "First, the boy found a map. Then, he followed the trail."
  ],
  speakingPractice: [
    { question: "What did you do first this morning?", answer: "First, I got out of bed." },
    { question: "What did you do then?", answer: "Then, I had a shower." },
    { question: "What did you do after that?", answer: "After that, I got dressed." },
    { question: "What happened next?", answer: "Next, I ate breakfast." },
    { question: "What did you do later?", answer: "Later, I went to school." },
    { question: "What did you do finally?", answer: "Finally, I came back home." },
    { question: "How did your day begin?", answer: "At the beginning, I was very sleepy." },
    { question: "What did you do after breakfast?", answer: "After breakfast, I brushed my teeth." },
    { question: "What happened in the end?", answer: "In the end, I watched a movie." },
    { question: "What did you do eventually?", answer: "Eventually, I went to sleep." },
    { question: "What happened first in the story?", answer: "First, the boy found a map." },
    { question: "What did the boy do next?", answer: "Next, he followed the trail." },
    { question: "What happened after that?", answer: "After that, he entered a dark cave." },
    { question: "What did he do later?", answer: "Later, he saw a treasure chest." },
    { question: "What happened finally?", answer: "Finally, he opened it and found gold." },
    { question: "How did your trip start?", answer: "At first, we packed our bags." },
    { question: "What happened then?", answer: "Then, we took a taxi to the airport." },
    { question: "What did you do next on holiday?", answer: "Next, we visited a museum." },
    { question: "What happened after the museum?", answer: "After that, we ate at a local restaurant." },
    { question: "How did the evening end?", answer: "In the end, we watched the sunset." },
    { question: "What do you do in your morning routine?", answer: "First, I wake up. Then, I check my phone." },
    { question: "What do you do before school?", answer: "After that, I get ready and leave the house." },
    { question: "What's your school routine?", answer: "First, we have English. Next, we have Math." },
    { question: "What do you do after lunch?", answer: "After lunch, I usually play with friends." },
    { question: "What happens later in the day?", answer: "Later, I do my homework." },
    { question: "How do you end your day?", answer: "Finally, I brush my teeth and sleep." },
    { question: "How did the movie start?", answer: "At the beginning, a girl was walking alone." },
    { question: "What happened then?", answer: "Then, she heard a strange noise." },
    { question: "What happened next?", answer: "Next, she ran into a forest." },
    { question: "What happened after that?", answer: "After that, she met an old man." },
    { question: "How did the story end?", answer: "In the end, she returned home safely." },
    { question: "What was the sequence of events?", answer: "First, he got lost. Then, he found a map." },
    { question: "What happened after school?", answer: "After school, I played football." },
    { question: "What happened before dinner?", answer: "Before dinner, I did my homework." },
    { question: "What did you do on your birthday?", answer: "First, I had cake. Later, we danced." },
    { question: "How did you travel?", answer: "First, by bus. Then, by train." },
    { question: "What happened on your trip?", answer: "We visited many places. Finally, we went home." },
    { question: "What was your weekend like?", answer: "First, I relaxed. Then, I met friends." },
    { question: "What did you do last night?", answer: "After that, I read a book." },
    { question: "How did the event end?", answer: "Eventually, everyone clapped and cheered." }
  ]
};

// Module 137 Data
const MODULE_137_DATA = {
  title: "Linking Words – Contrast (B1)",
  description: "Express contrast using however, although, despite, in spite of",
  intro: `Zıtlık ifade eden bağlaçlar: however (ancak), although/though/even though (rağmen - cümle), despite/in spite of (rağmen - isim).

**however:** Sentence. However, sentence. → I studied. However, I failed.
**although:** Although + clause → Although it rained, we went out.
**despite/in spite of:** despite + noun/gerund → Despite the rain, we went out.`,
  tip: "Although + clause. Despite/In spite of + noun/gerund. However = separate sentence.",
  table: [
    { linking_word: "although/though", usage: "+ clause", example: "Although it was raining, we hiked." },
    { linking_word: "despite/in spite of", usage: "+ noun/gerund", example: "Despite the rain, we hiked." },
    { linking_word: "however", usage: "sentence connector", example: "It rained. However, we hiked." }
  ],
  listeningExamples: [
    "We went hiking, although it was raining.",
    "He finished the job, despite being tired.",
    "The exam was difficult. However, I passed.",
    "She lives simply, though she is rich.",
    "They swam despite the cold."
  ],
  speakingPractice: [
    { question: "It was raining. What did you do?", answer: "We went hiking, although it was raining." },
    { question: "He was tired. Did he stop working?", answer: "No, he finished the job, despite being tired." },
    { question: "Did she come to school although she was sick?", answer: "Yes, she did. She came even though she was sick." },
    { question: "The exam was difficult. Did you pass?", answer: "Yes, I passed. However, it was very hard." },
    { question: "She is rich. Does she live a fancy life?", answer: "No, she lives simply, though she is rich." },
    { question: "He was busy. Did he help you?", answer: "Yes, he helped me, in spite of being busy." },
    { question: "It was cold. Did they go swimming?", answer: "Yes, they swam despite the cold." },
    { question: "She studied hard. Did she fail?", answer: "Yes, although she studied hard, she failed." },
    { question: "You were hungry. Did you eat?", answer: "No, I didn't. However, I was very hungry." },
    { question: "He didn't sleep. Was he energetic?", answer: "Yes, despite not sleeping, he was full of energy." },
    { question: "Was the movie good?", answer: "It was interesting. However, it was too long." },
    { question: "Did he join the team although he was injured?", answer: "Yes, he did." },
    { question: "Did she go outside despite the rain?", answer: "Yes, she went outside." },
    { question: "They were late. Did they apologize?", answer: "No, they didn't, although they were late." },
    { question: "Was it noisy?", answer: "Yes, despite the noise, we concentrated." },
    { question: "Did he understand?", answer: "Not really, even though he tried." },
    { question: "Was she confident?", answer: "She seemed nervous, although she was prepared." },
    { question: "Was the trip long?", answer: "Yes, but we enjoyed it. However, we were tired." },
    { question: "Were you cold?", answer: "Yes, in spite of wearing a jacket." },
    { question: "Did they complain?", answer: "No, despite the bad service." },
    { question: "He trained a lot. Did he win?", answer: "No, even though he trained hard." },
    { question: "The car is old. Does it run well?", answer: "Yes, it runs well, although it's old." },
    { question: "She was angry. Did she yell?", answer: "No, despite her anger." },
    { question: "Was it expensive?", answer: "Yes, however, it was worth it." },
    { question: "Did you like the food?", answer: "Yes, although it was a bit salty." },
    { question: "Did he call?", answer: "No, even though he promised." },
    { question: "Was she tired?", answer: "Yes, but she smiled. However, she was exhausted." },
    { question: "He was rich. Was he happy?", answer: "No, despite his wealth." },
    { question: "Did you buy the shoes?", answer: "Yes, although they were expensive." },
    { question: "He failed the test. Did he give up?", answer: "No, in spite of failing, he kept going." },
    { question: "She's young. Is she experienced?", answer: "Yes, even though she's young." },
    { question: "The path was dangerous. Did they continue?", answer: "Yes, despite the danger." },
    { question: "Did you enjoy the book?", answer: "Yes, although it was long." },
    { question: "Was the teacher strict?", answer: "Yes, but fair. However, I liked her." },
    { question: "Did you win the game?", answer: "Yes, in spite of the injury." },
    { question: "He is shy. Does he perform well?", answer: "Yes, although he's shy." },
    { question: "They had little money. Did they travel?", answer: "Yes, despite that." },
    { question: "It was raining. Did you cancel?", answer: "No, we went anyway. However, it rained all day." },
    { question: "Did she finish the marathon?", answer: "Yes, even though she was slow." },
    { question: "He was nervous. Did he speak?", answer: "Yes, in spite of being nervous." }
  ]
};

// Module 138 Data
const MODULE_138_DATA = {
  title: "Describing Experiences (B1)",
  description: "Tell past experiences using Past Simple and narrative language",
  intro: `Geçmiş deneyimleri Past Simple ve sıralama ifadeleriyle anlatma pratiği. Have you ever...? Did you...? Tell me about... kalıplarıyla sorular sorup deneyimler anlatılır.`,
  tip: "Use Past Simple to describe experiences. Answer with full stories using sequencing words.",
  table: [
    { question_type: "Have you ever...?", tense: "Present Perfect", answer: "Yes, I have. / No, I haven't." },
    { question_type: "Tell me about...", tense: "Past Simple", answer: "I went... It was..." },
    { question_type: "What happened?", tense: "Past Simple", answer: "First... Then... Finally..." }
  ],
  listeningExamples: [
    "Have you ever been abroad? Yes, I went to Italy last summer.",
    "What was your best holiday? It was in Spain. I went there with my family.",
    "Tell me about a funny memory. One day, I fell into a pool with my clothes on!",
    "Have you ever broken a bone? Yes, I broke my arm when I was ten.",
    "What did you do last weekend? I went to the cinema and saw a great movie."
  ],
  speakingPractice: [
    { question: "Have you ever been abroad?", answer: "Yes, I went to Italy last summer." },
    { question: "What was your best holiday?", answer: "It was in Spain. I went there with my family." },
    { question: "Tell me about a funny memory.", answer: "One day, I fell into a pool with my clothes on!" },
    { question: "Have you ever broken a bone?", answer: "Yes, I broke my arm when I was ten." },
    { question: "Did you ever try something new?", answer: "Yes, I tried sushi for the first time last week." },
    { question: "Tell me about your first day at school.", answer: "I cried a lot, but then I made friends." },
    { question: "What did you do last weekend?", answer: "I went to the cinema and saw a great movie." },
    { question: "Have you ever been scared?", answer: "Yes, once I got lost in a big city." },
    { question: "Did you enjoy your last birthday?", answer: "Yes, I had a big party with my friends." },
    { question: "Tell me about your last trip.", answer: "I went to Cappadocia. It was amazing." },
    { question: "Have you ever met a famous person?", answer: "Yes, I met a singer at a concert." },
    { question: "What was the most exciting day of your life?", answer: "The day I graduated from university." },
    { question: "Tell me about a time you helped someone.", answer: "I helped a lost child find their parents." },
    { question: "What happened yesterday?", answer: "I had a normal day. I worked and then relaxed." },
    { question: "Have you ever lost something important?", answer: "Yes, I lost my wallet on a bus." },
    { question: "Did anything interesting happen last week?", answer: "Yes, I saw a car accident." },
    { question: "Have you ever ridden a horse?", answer: "Yes, when I visited a village." },
    { question: "What did you do on your last holiday?", answer: "I went swimming and relaxed on the beach." },
    { question: "Tell me about your first job.", answer: "I worked in a café. It was hard but fun." },
    { question: "Have you ever tried extreme sports?", answer: "Yes, I went paragliding in Fethiye." },
    { question: "What was your worst travel experience?", answer: "My luggage was lost at the airport." },
    { question: "Did you have fun last weekend?", answer: "Yes, I went hiking with friends." },
    { question: "Have you ever forgotten something important?", answer: "Yes, I forgot my exam date once." },
    { question: "Tell me about a surprise you had.", answer: "My friends threw a party for me." },
    { question: "Have you ever been on a boat?", answer: "Yes, we went on a boat tour in Bodrum." },
    { question: "What was your last school project?", answer: "It was about animals. I made a poster." },
    { question: "Have you ever been in a competition?", answer: "Yes, I joined a quiz show at school." },
    { question: "What happened on your last birthday?", answer: "I had cake, gifts, and a lovely dinner." },
    { question: "Did you ever get lost?", answer: "Yes, once in a big shopping mall." },
    { question: "What's a memory from childhood?", answer: "Playing football in the street with my friends." },
    { question: "Have you ever seen snow?", answer: "Yes, many times in winter." },
    { question: "Tell me about your first flight.", answer: "I was nervous, but it was fun." },
    { question: "Have you ever cooked for others?", answer: "Yes, I made dinner for my family." },
    { question: "What was the most beautiful place you've visited?", answer: "Pamukkale. It was stunning." },
    { question: "Tell me about a funny school memory.", answer: "My teacher's wig fell off during class!" },
    { question: "What was your favorite day last year?", answer: "New Year's Eve. We had a big celebration." },
    { question: "Have you ever been very late?", answer: "Yes, I missed the bus and was late to work." },
    { question: "Tell me about a time you were proud.", answer: "When I won an English contest." },
    { question: "Have you ever been to a concert?", answer: "Yes, I saw my favorite band live." },
    { question: "What was the best gift you ever received?", answer: "A bicycle from my parents." }
  ]
};

// Module 139 Data
const MODULE_139_DATA = {
  title: "Talking about Cause and Effect (B1)",
  description: "Express cause and effect with 'so', 'because', and 'because of'",
  intro: `Neden-sonuç ilişkisi kurma: 'so' sonuç belirtir, 'because' neden belirtir, 'because of' isim veya -ing ile kullanılır.

**Yapı:** X, so Y (sonuç) | Y because X (neden) | Because of + noun/-ing, Y`,
  tip: "Use 'so' for result, 'because' for reason. 'Because of' takes a noun or -ing form.",
  table: [
    { connector: "so", use: "Result", example: "I was tired, so I went to bed early." },
    { connector: "because", use: "Reason", example: "I went to bed early because I was tired." },
    { connector: "because of", use: "Reason (noun/-ing)", example: "Because of the rain, we stayed inside." }
  ],
  listeningExamples: [
    "I was tired, so I went to bed early.",
    "She is happy because she passed the exam.",
    "It was raining, so we stayed inside.",
    "He didn't come because he was sick.",
    "Because of the storm, they canceled the trip."
  ],
  speakingPractice: [
    { question: "Why did you stay home?", answer: "Because I was sick." },
    { question: "You were tired. What did you do?", answer: "I was tired, so I took a nap." },
    { question: "Why are you happy?", answer: "Because I got good news." },
    { question: "He was hungry. What happened?", answer: "He was hungry, so he made a sandwich." },
    { question: "Why didn't she go to the party?", answer: "Because she was busy." },
    { question: "It was raining. What did you do?", answer: "It was raining, so I stayed inside." },
    { question: "Why is she crying?", answer: "Because she lost her phone." },
    { question: "He failed the test. Why?", answer: "Because he didn't study." },
    { question: "You missed the bus. What happened?", answer: "I missed the bus, so I walked to school." },
    { question: "Why did you leave early?", answer: "Because I had another meeting." },
    { question: "Why are they laughing?", answer: "Because the joke was funny." },
    { question: "He was cold. What did he do?", answer: "He was cold, so he put on a jacket." },
    { question: "Why did she run?", answer: "Because she was late." },
    { question: "It was late. What did you do?", answer: "It was late, so I went to sleep." },
    { question: "Why didn't he answer?", answer: "Because he was in a meeting." },
    { question: "The food was hot. What happened?", answer: "It was hot, so I waited before eating." },
    { question: "Why did you call her?", answer: "Because I needed help." },
    { question: "She was excited. Why?", answer: "Because she won a prize." },
    { question: "The road was icy. What did you do?", answer: "It was icy, so I drove slowly." },
    { question: "Why did they leave?", answer: "Because the movie was boring." },
    { question: "He got a gift. How did he feel?", answer: "He got a gift, so he was happy." },
    { question: "Why was she nervous?", answer: "Because she had a test." },
    { question: "You were thirsty. What did you do?", answer: "I was thirsty, so I drank water." },
    { question: "Why did they cancel the trip?", answer: "Because of the storm." },
    { question: "It was noisy. What did you do?", answer: "It was noisy, so I closed the window." },
    { question: "Why did you smile?", answer: "Because I saw my friend." },
    { question: "He was sleepy. What happened?", answer: "He was sleepy, so he took a nap." },
    { question: "Why was she absent?", answer: "Because she was sick." },
    { question: "The lights went out. What did you do?", answer: "The lights went out, so I used a flashlight." },
    { question: "Why were they tired?", answer: "Because they worked all day." },
    { question: "He had no umbrella. What happened?", answer: "He had no umbrella, so he got wet." },
    { question: "Why are you angry?", answer: "Because they didn't listen." },
    { question: "You were late. Why?", answer: "Because my alarm didn't ring." },
    { question: "Why did you laugh?", answer: "Because the story was funny." },
    { question: "The road was blocked. What happened?", answer: "The road was blocked, so we took another way." },
    { question: "Why did she scream?", answer: "Because she saw a spider." },
    { question: "He studied hard. What was the result?", answer: "He studied hard, so he passed." },
    { question: "Why were you surprised?", answer: "Because they remembered my birthday." },
    { question: "It was hot. What did you do?", answer: "It was hot, so I turned on the fan." },
    { question: "Why did they celebrate?", answer: "Because they won the game." },
    { question: "What advice would you give?", answer: "I would advise practicing a little every day." }
  ]
};

// Module 140 Data
const MODULE_140_DATA = {
  title: "Talking about Purpose (to, in order to, so that)",
  description: "Express purpose and reasons clearly with infinitives and clauses",
  intro: `Why do we do things? This module teaches you how to express purpose using 'to', 'in order to', and 'so that'. Learn to explain your reasons, goals, and intentions clearly in everyday conversations and formal contexts.`,
  tip: "Use 'to + verb' for informal purposes, 'in order to' for formal writing, and 'so that + clause' when mentioning a subject.",

  table: [
    { term: "Purpose Structure", definition: "Usage & Example" },
    { term: "to + verb", definition: "informal purpose: 'I study to pass the exam'" },
    { term: "in order to + verb", definition: "formal purpose: 'He works hard in order to succeed'" },
    { term: "so that + subject + verb", definition: "purpose with subject: 'I left early so that I could arrive on time'" }
  ],

  listeningExamples: [
    "I wake up early to exercise.",
    "She studies hard in order to pass the exam.",
    "They saved money so that they could buy a house.",
    "He called her to check if she was okay.",
    "We brought umbrellas in order to stay dry."
  ],

  speakingPractice: [
    { question: "Why do you study?", answer: "To get good grades." },
    { question: "Why did she go to the gym?", answer: "In order to lose weight." },
    { question: "Why are they saving money?", answer: "So that they can buy a house." },
    { question: "Why did you wake up early?", answer: "To catch the bus." },
    { question: "Why does he work two jobs?", answer: "In order to support his family." },
    { question: "Why did they build a fence?", answer: "So that the dog wouldn't run away." },
    { question: "Why are you learning English?", answer: "To travel easily." },
    { question: "Why did she buy flowers?", answer: "To decorate the house." },
    { question: "Why are you calling him?", answer: "So that we can talk about the project." },
    { question: "Why do they walk every day?", answer: "In order to stay healthy." },
    { question: "Why did you bring a map?", answer: "So that we don't get lost." },
    { question: "Why is she reading that book?", answer: "To learn more about history." },
    { question: "Why did he practice a lot?", answer: "In order to win the match." },
    { question: "Why are you studying tonight?", answer: "So that I can pass the exam." },
    { question: "Why did they hire a new teacher?", answer: "To improve education." },
    { question: "Why do you eat vegetables?", answer: "To be healthy." },
    { question: "Why did she take notes?", answer: "So that she could remember later." },
    { question: "Why are they painting the room?", answer: "In order to make it look new." },
    { question: "Why do you visit your grandparents?", answer: "To spend time with them." },
    { question: "Why did he stay up late?", answer: "So that he could finish his homework." },
    { question: "Why are you running?", answer: "To catch the train." },
    { question: "Why did she set an alarm?", answer: "So that she wouldn't be late." },
    { question: "Why do you drink water?", answer: "To stay hydrated." },
    { question: "Why did they turn on the lights?", answer: "In order to see better." },
    { question: "Why does she wear glasses?", answer: "So that she can see clearly." },
    { question: "Why do you cook at home?", answer: "To save money." },
    { question: "Why did they leave early?", answer: "In order to avoid traffic." },
    { question: "Why is he working so hard?", answer: "So that he can get promoted." },
    { question: "Why do you ask questions?", answer: "To understand the topic better." },
    { question: "Why did you take the medicine?", answer: "So that I could feel better." },
    { question: "Why do you take notes in class?", answer: "To remember the lesson." },
    { question: "Why did she move to the city?", answer: "In order to find a job." },
    { question: "Why are you practicing every day?", answer: "So that I can get better at piano." },
    { question: "Why do you sleep early?", answer: "To wake up fresh." },
    { question: "Why did they organize the event?", answer: "So that people can learn about recycling." },
    { question: "Why is he wearing a suit?", answer: "In order to look professional." },
    { question: "Why are you watching this video?", answer: "To improve my English." },
    { question: "Why did she take the test again?", answer: "So that she could improve her score." },
    { question: "Why do you listen to podcasts?", answer: "To learn new vocabulary." },
    { question: "Why did you choose this topic?", answer: "So that I could explain it easily." }
  ]
};

// Module 141 Data
const MODULE_141_DATA = {
  title: "Work Vocabulary – Roles, Tasks, and Workplaces",
  description: "Discuss jobs, workplace tasks, and professional environments using B1 vocabulary",
  intro: `The world of work is full of diverse roles and workplaces. This module teaches you essential vocabulary to talk about different jobs, what people do at work, and where they work. Learn to describe professions, tasks, and work environments confidently.`,
  tip: "Use this vocabulary to discuss careers, describe your job, or talk about what different professionals do every day.",

  table: [
    { term: "👷 ROLES & PROFESSIONS", definition: '' },
    { term: "manager", definition: "person who organizes and leads a team" },
    { term: "engineer", definition: "designs and builds technical things" },
    { term: "nurse", definition: "provides medical care to patients" },
    { term: "teacher", definition: "educates students" },
    { term: "chef", definition: "prepares and cooks food professionally" },
    { term: "mechanic", definition: "repairs vehicles and machinery" },
    { term: "police officer", definition: "maintains law and protects people" },
    { term: "secretary", definition: "handles office admin and communication" },
    { term: "🏢 WORKPLACES", definition: '' },
    { term: "office", definition: "place for business/administrative work" },
    { term: "hospital", definition: "medical care facility" },
    { term: "school", definition: "educational institution" },
    { term: "restaurant", definition: "food service establishment" },
    { term: "factory", definition: "manufacturing facility" },
    { term: "garage", definition: "vehicle repair shop" },
    { term: "police station", definition: "law enforcement headquarters" },
    { term: "construction site", definition: "building work location" },
    { term: "💼 TASKS & ACTIVITIES", definition: '' },
    { term: "answer phones", definition: "respond to telephone calls" },
    { term: "write emails", definition: "compose electronic messages" },
    { term: "attend meetings", definition: "participate in work discussions" },
    { term: "serve customers", definition: "help and assist clients" },
    { term: "fix machines", definition: "repair equipment" },
    { term: "prepare food", definition: "cook and make meals" }
  ],

  listeningExamples: [
    "A teacher works at a school.",
    "A chef prepares food in a restaurant.",
    "A nurse helps patients in a hospital.",
    "A driver drives a vehicle.",
    "A manager usually works in an office."
  ],

  speakingPractice: [
    { question: "Where does a teacher work?", answer: "A teacher works at a school." },
    { question: "What does a chef do?", answer: "A chef prepares food." },
    { question: "Where does a nurse work?", answer: "A nurse works at a hospital." },
    { question: "What does a driver do?", answer: "A driver drives a vehicle." },
    { question: "What does a cashier do?", answer: "A cashier takes payments and gives change." },
    { question: "Where does a mechanic work?", answer: "A mechanic works at a garage." },
    { question: "What does a secretary do?", answer: "A secretary answers phones and writes emails." },
    { question: "Where does a police officer work?", answer: "At a police station." },
    { question: "What does a teacher do?", answer: "A teacher teaches students." },
    { question: "Where does a manager usually work?", answer: "In an office." },
    { question: "What does an engineer do?", answer: "An engineer designs and builds things." },
    { question: "Where does a chef work?", answer: "In a restaurant." },
    { question: "What does a nurse do?", answer: "A nurse helps patients." },
    { question: "Where does a cleaner work?", answer: "A cleaner can work in offices or hotels." },
    { question: "What does a factory worker do?", answer: "A factory worker makes products." },
    { question: "Where does a hotel receptionist work?", answer: "At a hotel reception desk." },
    { question: "What does a police officer do?", answer: "A police officer protects people and enforces the law." },
    { question: "What does a construction worker do?", answer: "They build buildings." },
    { question: "Where does a construction worker work?", answer: "On a construction site." },
    { question: "What does a waiter do?", answer: "A waiter serves food and drinks." },
    { question: "What does a doctor do?", answer: "A doctor examines and treats patients." },
    { question: "Where does a doctor work?", answer: "At a hospital or clinic." },
    { question: "What does a fireman do?", answer: "A fireman puts out fires and saves people." },
    { question: "Where does a fireman work?", answer: "At a fire station." },
    { question: "What does a salesperson do?", answer: "A salesperson sells products to customers." },
    { question: "Where does a salesperson work?", answer: "In a store or shop." },
    { question: "What does a janitor do?", answer: "A janitor cleans buildings and schools." },
    { question: "Where does a janitor work?", answer: "In a school or office building." },
    { question: "What does an IT specialist do?", answer: "They fix computers and manage systems." },
    { question: "Where does an IT specialist work?", answer: "Usually in an office." },
    { question: "What does a bus driver do?", answer: "Drives a bus and takes passengers to places." },
    { question: "Where does a bus driver work?", answer: "On the road and at bus terminals." },
    { question: "What does a hairdresser do?", answer: "Cuts and styles hair." },
    { question: "Where does a hairdresser work?", answer: "In a salon." },
    { question: "What does a journalist do?", answer: "Writes news stories and reports." },
    { question: "Where does a journalist work?", answer: "In news agencies or on the field." },
    { question: "What does a librarian do?", answer: "Helps people find books and manage the library." },
    { question: "Where does a librarian work?", answer: "In a library." },
    { question: "What does a delivery person do?", answer: "Delivers packages and mail." },
    { question: "Where does a delivery person work?", answer: "On the road or at a warehouse." },
    { question: "What does a receptionist do?", answer: "Greets people and answers calls." },
    { question: "Where does a receptionist work?", answer: "In an office, hotel, or clinic." }
  ]
};

// Module 142 Data
const MODULE_142_DATA = {
  title: "Education Vocabulary – Schools and Universities (B2 Level)",
  description: "Build B2-level vocabulary to discuss schools, universities, and academic life",
  intro: `In this module, you will build strong B2-level vocabulary to discuss educational institutions, academic life, and higher education. From curriculum design to tuition fees, from lectures to scholarships, this module equips you with the essential terms needed for discussing education at an advanced level. Whether you're a student, teacher, or simply interested in academic topics, this vocabulary is crucial for engaging in meaningful conversations about education.`,
  tip: "Education vocabulary is particularly important if you plan to study abroad or work in academic environments. These terms frequently appear in IELTS and other English proficiency exams.",

  table: [
    { term: "🎓 ACADEMIC INSTITUTIONS", definition: '' },
    { term: "curriculum", definition: "the subjects and content taught at a school or university" },
    { term: "faculty", definition: "a department or group of related subjects, or the teaching staff" },
    { term: "campus", definition: "the grounds and buildings of a university or college" },
    { term: "📚 COURSES & STUDY", definition: '' },
    { term: "assignment", definition: "a task or piece of work given to students" },
    { term: "lecture", definition: "a formal presentation to a large group of students" },
    { term: "seminar", definition: "a small interactive class focused on discussion" },
    { term: "thesis", definition: "a long research paper written by postgraduate students" },
    { term: "internship", definition: "practical work experience for students" },
    { term: "💰 FEES & SCHOLARSHIPS", definition: '' },
    { term: "tuition fee", definition: "money paid for instruction at a school or university" },
    { term: "scholarship", definition: "financial aid awarded for academic excellence or need" },
    { term: "🎯 STUDENT STATUS", definition: '' },
    { term: "undergraduate", definition: "a student studying for their first degree (bachelor's)" },
    { term: "postgraduate", definition: "a student studying for a master's or doctoral degree" },
    { term: "graduate", definition: "to successfully complete a degree program" },
    { term: "enroll", definition: "to officially register for a course or institution" },
    { term: "drop out", definition: "to leave school or university before completing" },
    { term: "📊 PERFORMANCE & METHODS", definition: '' },
    { term: "academic performance", definition: "how well a student performs in their studies" },
    { term: "exam-oriented", definition: "focused mainly on passing exams rather than deep learning" },
    { term: "distance learning", definition: "education delivered remotely (online or by correspondence)" },
    { term: "extracurricular activities", definition: "activities outside regular classes (sports, clubs, music)" }
  ],

  listeningExamples: [
    "I enrolled at the beginning of the semester to start my undergraduate program.",
    "Our curriculum includes science, mathematics, and foreign languages at an advanced level.",
    "Tuition fees are particularly high for international students at most universities.",
    "She received a full scholarship based on her outstanding academic performance.",
    "He is currently writing his thesis as a postgraduate student in molecular biology.",
    "The campus has modern facilities including laboratories, libraries, and sports centers.",
    "I attend lectures in the morning and seminars in the afternoon for more interactive learning.",
    "Distance learning became essential during the pandemic and remains popular today."
  ],

  speakingPractice: [
    { question: "What is the curriculum like at your school?", answer: "It includes science, math, and foreign languages." },
    { question: "Do you have many assignments?", answer: "Yes, we have weekly assignments in most subjects." },
    { question: "Have you ever attended a lecture?", answer: "Yes, I attended a psychology lecture last week." },
    { question: "What's the difference between a lecture and a seminar?", answer: "A lecture is for large groups, while a seminar is more interactive." },
    { question: "Which faculty are you in?", answer: "I'm in the Faculty of Engineering." },
    { question: "What degree are you studying for?", answer: "I'm studying for a bachelor's degree in economics." },
    { question: "Do you receive a scholarship?", answer: "Yes, I have a full scholarship for academic performance." },
    { question: "Are tuition fees high at your university?", answer: "Yes, especially for international students." },
    { question: "When did you graduate?", answer: "I graduated two years ago." },
    { question: "Are you an undergraduate or a postgraduate student?", answer: "I'm a postgraduate student." },
    { question: "Have you written your thesis yet?", answer: "Yes, I submitted it last month." },
    { question: "Are internships mandatory in your program?", answer: "Yes, we must complete a summer internship." },
    { question: "How is your academic performance?", answer: "It's good. I have a GPA of 3.6." },
    { question: "Is your campus big?", answer: "Yes, the campus is large and modern." },
    { question: "When did you enroll in this course?", answer: "I enrolled at the beginning of the semester." },
    { question: "Did anyone drop out last year?", answer: "Yes, two students dropped out due to personal reasons." },
    { question: "Is the system exam-oriented?", answer: "Yes, it focuses mainly on exams and grades." },
    { question: "Have you tried distance learning?", answer: "Yes, during the pandemic we used online platforms." },
    { question: "Do you join any extracurricular activities?", answer: "Yes, I play in the university orchestra." },
    { question: "What is your favorite subject?", answer: "I enjoy literature because it's creative." },
    { question: "Do you think tuition fees should be free?", answer: "Yes, to make education accessible to all." },
    { question: "How many credits do you need to graduate?", answer: "I need 240 credits to complete my degree." },
    { question: "Are your professors supportive?", answer: "Yes, they're very helpful and experienced." },
    { question: "What's the hardest part of university?", answer: "Managing time between lectures and assignments." },
    { question: "Do you live on campus?", answer: "No, I rent a flat nearby." },
    { question: "Have you taken any online courses?", answer: "Yes, I completed a course on digital marketing." },
    { question: "What's your major?", answer: "My major is international relations." },
    { question: "Have you ever failed a course?", answer: "Yes, I failed statistics once but retook it." },
    { question: "Are there many student clubs?", answer: "Yes, we have clubs for sports, music, and debate." },
    { question: "What's your opinion on group projects?", answer: "They're useful, but sometimes hard to coordinate." },
    { question: "Do you plan to study abroad?", answer: "Yes, I'd like to do a semester in Germany." },
    { question: "How do you prepare for exams?", answer: "I review notes, read textbooks, and practice old exams." },
    { question: "What is your dream university?", answer: "I'd love to study at Oxford." },
    { question: "What's the student life like?", answer: "It's vibrant, especially on campus." },
    { question: "Is attendance compulsory?", answer: "Yes, for most of the courses." },
    { question: "What's your favorite place on campus?", answer: "The library. It's quiet and has all the resources." },
    { question: "What does your internship involve?", answer: "I assist with marketing and social media tasks." },
    { question: "Do you think education should be more practical?", answer: "Yes, especially at the university level." },
    { question: "Do you plan to do a master's degree?", answer: "Yes, after I graduate." },
    { question: "Is your course theoretical or practical?", answer: "It's a good mix of both." },
    { question: "What's the most challenging subject for you?", answer: "Probably advanced mathematics." }
  ]
};

// Module 143 Data
const MODULE_143_DATA = {
  title: "Technology Vocabulary – Gadgets and Internet (B1 Level+)",
  description: "Discuss technology, gadgets, internet use, and digital safety with B1+ vocabulary",
  intro: `In today's digital world, technology vocabulary is essential. In this B1+ module, you'll learn to discuss gadgets, internet use, cloud computing, cybersecurity, and smart devices. Whether you're talking about your smartphone, protecting your online privacy, or describing the latest tech trends, this module will give you the language skills you need to engage confidently in technology-related conversations.`,
  tip: "Technology changes rapidly, but core vocabulary remains essential. These terms will help you understand tech news, use digital services, and discuss modern life with confidence.",

  table: [
    { term: "📱 GADGETS & DEVICES", definition: '' },
    { term: "smartphone", definition: "mobile phone with advanced features and internet access" },
    { term: "tablet", definition: "portable touchscreen computer larger than a phone" },
    { term: "laptop", definition: "portable personal computer" },
    { term: "charger", definition: "device for recharging batteries" },
    { term: "headphones", definition: "audio device worn over or in the ears" },
    { term: "USB drive", definition: "portable data storage device" },
    { term: "wearable technology", definition: "electronic devices worn on the body (smartwatches, fitness trackers)" },
    { term: "touchscreen", definition: "display that responds to touch" },
    { term: "smart home device", definition: "internet-connected device for home automation" },
    { term: "🌐 INTERNET & CONNECTIVITY", definition: '' },
    { term: "Wi‑Fi connection", definition: "wireless internet network" },
    { term: "Bluetooth", definition: "short-range wireless technology for connecting devices" },
    { term: "search engine", definition: "tool for finding information online (Google, Bing)" },
    { term: "social media platform", definition: "online service for sharing content and connecting (Facebook, Instagram)" },
    { term: "streaming", definition: "watching or listening to content online in real-time" },
    { term: "download/upload", definition: "transfer data from/to the internet" },
    { term: "💾 DATA & SECURITY", definition: '' },
    { term: "data storage", definition: "keeping digital information on devices or services" },
    { term: "cloud computing", definition: "storing and accessing data via the internet instead of locally" },
    { term: "online privacy", definition: "protection of personal information on the internet" },
    { term: "cybersecurity", definition: "protection against digital attacks and threats" },
    { term: "software update", definition: "newer version of a program fixing bugs or adding features" }
  ],

  listeningExamples: [
    "I usually use my smartphone and laptop every day for work and entertainment.",
    "Cloud computing lets you store and access data online from any device.",
    "I install software updates to avoid bugs and improve security on all my devices.",
    "A fast Wi‑Fi connection helps with streaming videos and making video calls.",
    "Wearable technology like smartwatches can track your fitness data and heart rate.",
    "Online privacy is important, so I use strong passwords and avoid suspicious links.",
    "Smart home devices make life convenient, but raise concerns about data security.",
    "Cybersecurity protects your personal and financial information from digital attacks."
  ],

  speakingPractice: [
    { question: "What kind of gadgets do you use daily?", answer: "I usually use my smartphone, smartwatch, and wireless earbuds." },
    { question: "How often do you update your software?", answer: "I try to install every software update as soon as it's available to avoid bugs." },
    { question: "Do you prefer using a tablet or a laptop for studying?", answer: "I prefer using a laptop because it's more suitable for multitasking." },
    { question: "What do you usually store on your USB drive?", answer: "Mostly documents, presentations, and sometimes backup copies of my photos." },
    { question: "What is the most useful smart device in your home?", answer: "Probably the smart speaker. I use it for music, alarms, and even controlling the lights." },
    { question: "Have you ever had issues with your Wi‑Fi connection?", answer: "Yes, especially when there are too many devices connected at the same time." },
    { question: "How do you protect your online privacy?", answer: "I use strong passwords, avoid suspicious links, and regularly clear my browser history." },
    { question: "Which search engine do you usually use?", answer: "I usually use Google because it gives the most relevant results quickly." },
    { question: "Do you think social media platforms are addictive?", answer: "Yes, because they are designed to keep users engaged for hours." },
    { question: "What is cloud computing used for?", answer: "It's used for storing and accessing data online instead of on local devices." },
    { question: "Do you listen to music online or offline?", answer: "I stream music online, but I download playlists for offline use when I travel." },
    { question: "Have you ever experienced a cyber attack?", answer: "Fortunately, no, but I've received some suspicious phishing emails before." },
    { question: "How do you usually back up your data?", answer: "I use both an external hard drive and cloud services like Google Drive." },
    { question: "What is the downside of constantly using gadgets?", answer: "It can affect your posture, vision, and sometimes your concentration." },
    { question: "How important is cybersecurity in modern life?", answer: "It's absolutely essential to protect sensitive personal and financial information." },
    { question: "Do you use any wearable technology?", answer: "Yes, I use a fitness tracker to monitor my steps and heart rate." },
    { question: "How do you feel about smart home devices?", answer: "They're convenient, but I'm slightly concerned about data privacy." },
    { question: "Which apps do you use the most on your phone?", answer: "Messaging apps, a calendar, and news apps are what I use daily." },
    { question: "Do you often download large files?", answer: "Only when I need to install new software or watch offline videos." },
    { question: "Have you ever repaired a gadget by yourself?", answer: "Yes, I once replaced the battery in my old smartphone." },
    { question: "What is your opinion on online learning tools?", answer: "I think they're incredibly useful and flexible, especially for busy people." },
    { question: "Do you think children use technology too much?", answer: "Yes, and it may limit their social and physical development if uncontrolled." },
    { question: "How do you secure your home Wi‑Fi network?", answer: "By changing the default password and enabling encryption." },
    { question: "Do you prefer using Bluetooth headphones or wired ones?", answer: "Bluetooth headphones are more convenient, especially when commuting." },
    { question: "Have you ever used a 3D printer?", answer: "No, but I've seen demonstrations, and they are fascinating." },
    { question: "How do you use technology in your studies?", answer: "I use online dictionaries, grammar apps, and video lessons." },
    { question: "Do you trust online payment systems?", answer: "Yes, but I always check if the site is secure before entering my card details." },
    { question: "Have you ever used a digital assistant like Siri or Alexa?", answer: "Yes, I use it mostly for setting reminders or checking the weather." },
    { question: "Do you think technology makes life easier?", answer: "Yes, it helps us communicate, work, and learn more efficiently." },
    { question: "What's the main disadvantage of being online all the time?", answer: "It's easy to lose track of time and become mentally drained." },
    { question: "Do you use antivirus software?", answer: "Yes, I have one installed on both my laptop and smartphone." },
    { question: "How do you feel about online shopping?", answer: "It's convenient, but sometimes I worry about getting poor-quality products." },
    { question: "Have you ever tried learning a language through an app?", answer: "Yes, I used Duolingo and found it surprisingly effective." },
    { question: "Do you use email more for personal or professional communication?", answer: "Mostly professional, but I still receive newsletters and personal updates." },
    { question: "What do you think of smartwatches?", answer: "They're great for fitness tracking, notifications, and even answering calls." },
    { question: "Would you buy a smart fridge or smart oven?", answer: "Possibly, if it helps me save time and energy." },
    { question: "Do you worry about screen time?", answer: "Yes, I try to limit it, especially before bed." },
    { question: "How fast is your internet connection?", answer: "It's quite fast—enough for streaming HD videos and video conferencing." },
    { question: "Have you ever joined a virtual meeting?", answer: "Yes, we use Zoom for most of our classes and meetings." },
    { question: "What would life be like without the internet?", answer: "It would be slower and more difficult, especially for communication and work." }
  ]
};

// Module 144 Data
const MODULE_144_DATA = {
  title: "Environment Vocabulary – Problems and Solutions (B1+ Level)",
  description: "Build B1+ vocabulary to discuss environmental problems and solutions",
  intro: `Our planet faces serious environmental challenges. In this module, you'll learn essential B1+ vocabulary to discuss climate change, pollution, conservation, and sustainable living. Master the language needed to talk about environmental problems and their solutions confidently.`,
  tip: "Environmental issues affect everyone. Learning this vocabulary helps you participate in important conversations about our planet's future.",

  table: [
    { term: "🔴 ENVIRONMENTAL PROBLEMS", definition: '' },
    { term: "climate change", definition: "long-term changes in temperature and weather patterns" },
    { term: "global warming", definition: "the gradual increase in Earth's temperature" },
    { term: "pollution", definition: "harmful substances contaminating air, water, or land" },
    { term: "deforestation", definition: "cutting down forests on a large scale" },
    { term: "overconsumption", definition: "using more resources than necessary" },
    { term: "water scarcity", definition: "lack of sufficient available clean water" },
    { term: "extinction", definition: "when a species completely disappears" },
    { term: "landfill", definition: "site for disposing of waste by burying it" },
    { term: "🟢 SOLUTIONS & ACTIONS", definition: '' },
    { term: "renewable energy", definition: "power from sources that don't run out (solar, wind)" },
    { term: "recycling", definition: "converting waste into reusable material" },
    { term: "conservation", definition: "protection of natural resources and wildlife" },
    { term: "waste management", definition: "handling, processing, and disposal of trash" },
    { term: "eco-friendly products", definition: "items that don't harm the environment" },
    { term: "energy-efficient devices", definition: "appliances that use less electricity" },
    { term: "public transport", definition: "buses, trains shared by many people" },
    { term: "reforestation", definition: "planting trees to restore forests" },
    { term: "sustainable living", definition: "lifestyle that reduces environmental impact" }
  ],

  listeningExamples: [
    "Plastic pollution harms wildlife and takes centuries to decompose.",
    "Switching to renewable energy reduces greenhouse gas emissions.",
    "Recycling conserves natural resources and saves energy.",
    "Using energy-efficient appliances lowers electricity use and emissions.",
    "Protecting forests helps conserve biodiversity.",
    "Reducing our carbon footprint means using less electricity and driving less.",
    "Landfills release methane and can pollute land and water.",
    "Sustainable development meets present needs without harming future generations."
  ],

  speakingPractice: [
    { question: "What are the main causes of climate change?", answer: "Mainly greenhouse gas emissions from burning fossil fuels." },
    { question: "How can we reduce air pollution?", answer: "By promoting public transport and using cleaner energy sources." },
    { question: "What is the impact of deforestation?", answer: "It destroys habitats, reduces biodiversity, and contributes to global warming." },
    { question: "What does 'carbon footprint' mean?", answer: "The total amount of greenhouse gases we produce through our actions." },
    { question: "What are some renewable energy sources?", answer: "Solar, wind, hydroelectric, and geothermal energy." },
    { question: "How does recycling help the environment?", answer: "It reduces waste, saves energy, and conserves natural resources." },
    { question: "Why is biodiversity important?", answer: "It keeps ecosystems balanced and supports human life." },
    { question: "What can individuals do to live more sustainably?", answer: "Reduce waste, save energy, and choose eco-friendly products." },
    { question: "What is an environmentally friendly lifestyle?", answer: "One that minimizes harm to the planet using sustainable practices." },
    { question: "Why is plastic pollution a major problem?", answer: "Plastic takes hundreds of years to decompose and harms wildlife." },
    { question: "How can we save water in daily life?", answer: "Fix leaks, use water-efficient appliances, and turn off taps." },
    { question: "What are the dangers of overconsumption?", answer: "Resource depletion, more waste, and environmental damage." },
    { question: "Why should we switch to energy-efficient devices?", answer: "They reduce electricity use and lower carbon emissions." },
    { question: "What does 'waste management' include?", answer: "Collection, transport, recycling, and disposal of waste." },
    { question: "What are eco-friendly products?", answer: "Items made with sustainable materials that cause less harm to nature." },
    { question: "How can we protect endangered species?", answer: "Preserve habitats and implement conservation programs." },
    { question: "What is the role of governments in environmental protection?", answer: "Make laws, support green projects, and raise public awareness." },
    { question: "How does global warming affect sea levels?", answer: "It melts ice and raises oceans, threatening coasts." },
    { question: "What can schools do to promote environmental awareness?", answer: "Organize projects, campaigns, and eco-education programs." },
    { question: "How is climate change affecting agriculture?", answer: "It changes rainfall patterns and raises drought/flood risks." },
    { question: "Why are forests essential for the planet?", answer: "They absorb CO₂ and provide oxygen and habitats." },
    { question: "How can we reduce our carbon footprint?", answer: "Use less electricity, drive less, and eat local food." },
    { question: "What happens when biodiversity decreases?", answer: "Ecosystems become less resilient and may collapse." },
    { question: "How can technology help the environment?", answer: "By creating clean energy and improving efficiency." },
    { question: "What is meant by 'sustainable development'?", answer: "Meeting present needs without harming future generations." },
    { question: "Why are landfills problematic?", answer: "They release methane and can pollute land and water." },
    { question: "How can urban areas become greener?", answer: "Add parks, plant trees, and improve public transport." },
    { question: "What is water scarcity?", answer: "Not enough clean water for people's needs." },
    { question: "How can we reduce food waste?", answer: "Plan meals, store food properly, and donate excess." },
    { question: "What are the benefits of green buildings?", answer: "They use less energy and water and are healthier." },
    { question: "What role do students play in environmental protection?", answer: "Join eco-clubs and lead awareness campaigns." },
    { question: "What is the connection between consumption and pollution?", answer: "More consumption means more waste and pollution." },
    { question: "How can businesses be more eco-conscious?", answer: "Reduce packaging, recycle, and use renewable energy." },
    { question: "Why should we reduce single-use plastics?", answer: "They pollute land and oceans and harm marine life." },
    { question: "What is extinction and why is it serious?", answer: "A species disappears forever, upsetting ecological balance." },
    { question: "How does overfishing affect marine life?", answer: "It reduces fish populations and disrupts the food chain." },
    { question: "What are climate-friendly habits?", answer: "Use reusable bags, bike, and conserve water and energy." },
    { question: "How can governments encourage green energy?", answer: "Offer subsidies and invest in solar and wind power." },
    { question: "Why is environmental education important?", answer: "It teaches people to care for the planet and act responsibly." },
    { question: "What's your opinion on banning plastic bags?", answer: "It's a strong step to reduce plastic waste." }
  ]
};

// Module 145 Data
const MODULE_145_DATA = {
  title: "News and Media Vocabulary (B1+ Level)",
  description: "Use B1+ media vocabulary to discuss how news is produced and consumed",
  intro: `In today's digital age, understanding news and media is crucial. This module teaches you essential B1+ vocabulary to discuss journalism, breaking news, social media, and critical thinking about information. Learn to talk confidently about how we receive and evaluate news in the modern world.`,
  tip: "Media literacy is a vital skill. This vocabulary helps you discuss news sources, identify reliable information, and express opinions about media coverage.",

  table: [
    { term: "📰 NEWS PRODUCTION", definition: '' },
    { term: "headline", definition: "the title of a news article" },
    { term: "breaking news", definition: "urgent, just-reported information" },
    { term: "reporter", definition: "person who gathers news stories" },
    { term: "journalist", definition: "professional who investigates and writes news" },
    { term: "editor", definition: "person who reviews and prepares content" },
    { term: "news anchor", definition: "TV/radio presenter of news programs" },
    { term: "article", definition: "written news story" },
    { term: "interview", definition: "conversation to gather information" },
    { term: "📡 MEDIA & FORMATS", definition: '' },
    { term: "broadcast", definition: "transmission of programs on TV/radio" },
    { term: "live coverage", definition: "real-time reporting of events" },
    { term: "press", definition: "news media and journalists collectively" },
    { term: "media outlet", definition: "organization that publishes news" },
    { term: "tabloid", definition: "newspaper focused on sensational stories" },
    { term: "mainstream media", definition: "major, established news sources" },
    { term: "💻 DIGITAL & CRITICAL THINKING", definition: '' },
    { term: "social media", definition: "online platforms for sharing content" },
    { term: "go viral", definition: "spread rapidly online" },
    { term: "fake news", definition: "false information presented as news" },
    { term: "source", definition: "origin of information" },
    { term: "subscribe", definition: "sign up for regular content" },
    { term: "objective reporting", definition: "presenting facts without bias" }
  ],

  listeningExamples: [
    "I checked the headline before reading the full article.",
    "The reporter interviewed witnesses during the live coverage.",
    "Always verify the source to avoid fake news.",
    "The editor reviewed the story for accuracy and clarity.",
    "The video went viral on social media.",
    "Mainstream media covers international events extensively.",
    "Objective reporting presents facts without personal bias."
  ],

  speakingPractice: [
    { question: "Do you read the news every day?", answer: "Yes, I usually check news apps or websites every morning." },
    { question: "What type of news do you follow the most?", answer: "International news and current affairs." },
    { question: "Have you ever read a fake news story?", answer: "Yes, it seemed real at first." },
    { question: "What does a journalist do?", answer: "Investigates and writes news stories." },
    { question: "Do you prefer watching or reading the news?", answer: "Reading—I can choose the topics that interest me." },
    { question: "What's your favorite news outlet?", answer: "BBC—detailed and balanced reporting." },
    { question: "What does a headline usually tell you?", answer: "A brief summary of the main topic." },
    { question: "Have you ever watched a live news broadcast?", answer: "Yes, during elections and major events." },
    { question: "What's the role of a news anchor?", answer: "Presents news on TV or radio." },
    { question: "Do you trust mainstream media?", answer: "Mostly, but I cross-check with other sources." },
    { question: "What's the danger of fake news?", answer: "It spreads misinformation and causes confusion." },
    { question: "Do you follow news on social media?", answer: "Yes, but I verify content before believing it." },
    { question: "What is an interview in journalism?", answer: "A conversation to gather information or opinions." },
    { question: "Have you ever been interviewed?", answer: "Yes, once for a school magazine." },
    { question: "Reporter vs editor—difference?", answer: "Reporter gathers news; editor reviews and prepares it." },
    { question: "Do you like reading tabloids?", answer: "Not really; I prefer fact-based journalism." },
    { question: "What does 'go viral' mean?", answer: "A story or video spreads rapidly online." },
    { question: "Do you subscribe to any outlets?", answer: "Yes, a digital subscription to a weekly magazine." },
    { question: "How to identify reliable sources?", answer: "Check credibility and evidence." },
    { question: "What is objective reporting?", answer: "Facts without personal bias." },
    { question: "Does news influence public opinion?", answer: "Yes—framing affects how people view issues." },
    { question: "What is breaking news?", answer: "Urgent information reported immediately." },
    { question: "What are press conferences for?", answer: "Officials answer questions from the media." },
    { question: "Have you shared a news article online?", answer: "Yes, when it's important." },
    { question: "Role of editors?", answer: "Ensure accuracy, grammar, and clarity." },
    { question: "How has social media changed news?", answer: "More accessible, but more misinformation." },
    { question: "Opinion on citizen journalism?", answer: "Useful for speed, not always accurate." },
    { question: "Printed or digital newspapers?", answer: "Digital for convenience and updates." },
    { question: "Opinion on news apps?", answer: "Helpful with customizable topics and alerts." },
    { question: "Have you seen biased reporting?", answer: "Yes, especially in politics." },
    { question: "Are young people interested in news?", answer: "Some are—engaging formats help." },
    { question: "News vs opinion?", answer: "News = facts; opinion = views." },
    { question: "Benefits of live coverage?", answer: "Real-time updates." },
    { question: "Teach media literacy at schools?", answer: "Yes—critical thinking is essential." },
    { question: "Role of the press in democracy?", answer: "Inform, hold power accountable, ensure transparency." },
    { question: "How do you stay updated?", answer: "Apps and push notifications." },
    { question: "Do you turn off the news sometimes?", answer: "Yes, to avoid negativity overload." },
    { question: "View on sensational headlines?", answer: "Attention-grabbing but sometimes misleading." },
    { question: "International or local news?", answer: "Mostly international; I check local too." },
    { question: "Watched a documentary about journalism?", answer: "Yes—it showed newsroom pressures." }
  ]
};

// Module 146 Data
const MODULE_146_DATA = {
  title: "Personality and Character Vocabulary (B2)",
  description: "Use B2 adjectives to describe character precisely and answer complex questions",
  intro: `Understanding personality helps us connect with others and express ourselves better. This B2 module teaches you sophisticated vocabulary to describe character traits with precision. Learn to discuss positive, negative, and neutral personality characteristics, and explore how personality shapes our relationships and choices.`,
  tip: "Rich personality vocabulary allows you to describe people accurately and discuss human behavior with nuance. These words are essential for B2-level conversations.",

  table: [
    { term: "✨ POSITIVE TRAITS", definition: '' },
    { term: "empathetic", definition: "able to understand others' feelings" },
    { term: "reliable", definition: "can be trusted to do what they promise" },
    { term: "charismatic", definition: "naturally charming and inspiring" },
    { term: "witty", definition: "clever and amusing in conversation" },
    { term: "open-minded", definition: "willing to consider new ideas" },
    { term: "honest", definition: "truthful and sincere" },
    { term: "disciplined", definition: "able to control behavior and stay focused" },
    { term: "patient", definition: "able to wait calmly without frustration" },
    { term: "⚠️ NEGATIVE TRAITS", definition: '' },
    { term: "arrogant", definition: "exaggerating one's own importance" },
    { term: "manipulative", definition: "controlling others for selfish reasons" },
    { term: "impulsive", definition: "acting without thinking" },
    { term: "moody", definition: "frequently changing emotions" },
    { term: "stubborn", definition: "refusing to change one's mind" },
    { term: "⚖️ NEUTRAL/CONTEXT-DEPENDENT", definition: '' },
    { term: "ambitious", definition: "having strong desire for success" },
    { term: "introverted", definition: "preferring solitary activities" },
    { term: "extroverted", definition: "outgoing and energized by others" },
    { term: "cautious", definition: "careful to avoid risks" },
    { term: "perfectionist", definition: "wanting everything to be perfect" },
    { term: "adaptable", definition: "able to adjust to new conditions" },
    { term: "assertive", definition: "confident in expressing opinions" }
  ],

  listeningExamples: [
    "She's reliable and always keeps her promises.",
    "He can be impulsive and make quick decisions.",
    "A witty remark can lighten the mood.",
    "Open-minded people consider new ideas.",
    "Ambitious students set long-term goals.",
    "Empathetic leaders build strong teams.",
    "Being adaptable helps in changing situations."
  ],

  speakingPractice: [
    { question: "How would your best friend describe your personality?", answer: "Reliable, honest, and a good listener." },
    { question: "What is your strongest personality trait?", answer: "Dependability in every situation." },
    { question: "Which trait do you want to improve?", answer: "Patience under stress." },
    { question: "Are you more introverted or extroverted?", answer: "Introverted—I recharge alone." },
    { question: "Have you become more open-minded?", answer: "Yes, by listening to different views." },
    { question: "Are you a perfectionist?", answer: "Yes, I want things to be exactly right." },
    { question: "What makes someone charismatic?", answer: "Confidence, clear speech, and empathy." },
    { question: "Can a moody person be a good leader?", answer: "Yes, if they manage emotions." },
    { question: "Are you cautious when deciding?", answer: "Yes, to avoid mistakes." },
    { question: "What is emotional intelligence?", answer: "Understanding feelings and reacting calmly." },
    { question: "Prefer ambitious or relaxed coworkers?", answer: "Ambitious—they're focused and driven." },
    { question: "Is stubbornness always bad?", answer: "No, it helps defend values." },
    { question: "How do you deal with manipulative people?", answer: "Set boundaries and stay objective." },
    { question: "Can you trust impulsive people?", answer: "Only to a point—they act too fast." },
    { question: "Most reliable person you know?", answer: "My mother—she keeps her word." },
    { question: "Do you like witty people?", answer: "Yes, they make chats lively." },
    { question: "Met someone very arrogant?", answer: "Yes, he ignored others' opinions." },
    { question: "Can people change personality?", answer: "Yes, with reflection and practice." },
    { question: "Important traits in a partner?", answer: "Kindness, honesty, stability." },
    { question: "Do opposites attract?", answer: "Often—they complement each other." },
    { question: "Are people where you live extroverted?", answer: "Mostly, they enjoy socializing." },
    { question: "Traits admired in your culture?", answer: "Respect and hospitality." },
    { question: "Social media effects on personality?", answer: "More self-consciousness and comparison." },
    { question: "Teach emotional intelligence at school?", answer: "Yes, for empathy and self-control." },
    { question: "Traits for politicians?", answer: "Empathy, clarity, and resilience." },
    { question: "Are charismatic people always honest?", answer: "No, charisma can manipulate." },
    { question: "Why do people pretend?", answer: "To gain acceptance or hide insecurity." },
    { question: "Which personalities become famous easily?", answer: "Confident and entertaining ones." },
    { question: "Do leaders need empathy?", answer: "Yes, to build trust." },
    { question: "Cultural values and personality?", answer: "They shape expression and behavior." },
    { question: "What would you change?", answer: "Be calmer under pressure." },
    { question: "Intelligence or charisma?", answer: "Charisma for relationships." },
    { question: "Handling a stubborn child?", answer: "Stay calm and encourage flexibility." },
    { question: "Can open-mindedness be risky?", answer: "Yes, without limits it is." },
    { question: "Both introvert and extrovert?", answer: "Yes—depends on context." },
    { question: "Meeting your personality twin?", answer: "I'd be curious and learn." },
    { question: "Honest or kind feedback?", answer: "Both—honest yet respectful." },
    { question: "Hire for personality or skills?", answer: "Both—fit and competence." },
    { question: "Does personality affect success?", answer: "Yes—confidence and adaptability help." },
    { question: "Has work changed you?", answer: "Yes—more disciplined and organized." }
  ]
};

// Module 147 Data
const MODULE_147_DATA = {
  title: "Crime and Law Vocabulary (B2 Level)",
  description: "Discuss crime, legal procedures, and enforcement using B2 vocabulary",
  intro: `Understanding crime and law vocabulary is essential for discussing justice, safety, and legal processes. This B2 module covers criminal justice terminology, from crimes and investigations to trials and verdicts. Learn to talk about legal systems, rights, and the rule of law with confidence and precision.`,
  tip: "Legal vocabulary appears frequently in news, movies, and serious conversations. Mastering these terms helps you understand the justice system and discuss important social issues.",

  table: [
    { term: "⚖️ LEGAL PROCESS", definition: '' },
    { term: "investigation", definition: "systematic examination of a crime" },
    { term: "evidence", definition: "facts or information used in court" },
    { term: "witness", definition: "person who saw or knows about a crime" },
    { term: "suspect", definition: "person believed to have committed a crime" },
    { term: "arrest", definition: "taking someone into police custody" },
    { term: "charges", definition: "formal accusations of crime" },
    { term: "trial", definition: "legal examination of evidence in court" },
    { term: "verdict", definition: "jury's decision: guilty or innocent" },
    { term: "sentence", definition: "punishment decided by a judge" },
    { term: "👥 PEOPLE IN THE SYSTEM", definition: '' },
    { term: "judge", definition: "official who presides over a trial" },
    { term: "jury", definition: "group of citizens who decide guilt" },
    { term: "lawyer", definition: "legal professional representing clients" },
    { term: "prosecution", definition: "lawyers presenting the case against accused" },
    { term: "defense", definition: "lawyers representing the accused" },
    { term: "victim", definition: "person harmed by a crime" },
    { term: "criminal", definition: "person who committed a crime" },
    { term: "🚨 CRIMES & TERMS", definition: '' },
    { term: "crime", definition: "illegal action punishable by law" },
    { term: "robbery", definition: "stealing using force or threats" },
    { term: "burglary", definition: "illegal entry to steal" },
    { term: "murder", definition: "unlawful killing of a person" },
    { term: "fraud", definition: "deception for financial gain" },
    { term: "bail", definition: "money paid to release accused before trial" },
    { term: "appeal", definition: "request to review a court decision" },
    { term: "probation", definition: "supervised release instead of prison" },
    { term: "parole", definition: "early release under supervision" }
  ],

  listeningExamples: [
    "The witness described the suspect.",
    "The jury reached a guilty verdict.",
    "He received a suspended sentence.",
    "She was released on bail.",
    "The lawyer appealed the decision.",
    "Evidence must prove guilt beyond reasonable doubt.",
    "The defense argued for probation instead of prison."
  ],

  speakingPractice: [
    { question: "Have you ever witnessed a crime?", answer: "Yes, I saw shoplifting and reported it." },
    { question: "Most common crimes where you live?", answer: "Theft, online fraud, and vandalism." },
    { question: "Do you feel safe in your area?", answer: "Yes, because of police patrols." },
    { question: "How to prevent burglary?", answer: "Cameras, alarms, and community watch." },
    { question: "Should all crimes lead to prison?", answer: "Serious crimes yes; minor ones can use alternatives." },
    { question: "How does the legal system work?", answer: "Investigation, charges, trial, verdict, sentence." },
    { question: "View on death penalty?", answer: "Controversial and risks wrongful convictions." },
    { question: "Robbery vs burglary?", answer: "Robbery uses force; burglary is illegal entry." },
    { question: "Do you trust the police?", answer: "Generally, when they act transparently." },
    { question: "What to do if you witness a crime?", answer: "Call police, stay safe, give a statement." },
    { question: "What is strong evidence?", answer: "CCTV, forensics, and reliable witnesses." },
    { question: "Why are fair trials vital?", answer: "To protect rights and prevent injustice." },
    { question: "Presumption of innocence—meaning?", answer: "Innocent until proven guilty." },
    { question: "How to reduce crime locally?", answer: "Youth programs and better lighting." },
    { question: "What is cybercrime?", answer: "Hacking, phishing, and identity theft." },
    { question: "What are white-collar crimes?", answer: "Fraud, embezzlement, insider trading." },
    { question: "How does bail work?", answer: "Money/conditions to ensure court appearance." },
    { question: "Role of a defense lawyer?", answer: "Protect the accused's rights." },
    { question: "Treat juveniles differently?", answer: "Yes—focus on rehabilitation." },
    { question: "How can tech help police?", answer: "Body cams and databases." },
    { question: "Is CCTV effective?", answer: "It deters and provides evidence." },
    { question: "Why do people commit crimes?", answer: "Poverty, addiction, and opportunity." },
    { question: "What is community service?", answer: "Unpaid work instead of prison." },
    { question: "How does an appeal work?", answer: "Higher court reviews the case." },
    { question: "Rights of suspects?", answer: "Silence, counsel, and fair trial." },
    { question: "What is plea bargaining?", answer: "Pleading to a lesser charge." },
    { question: "How to cut reoffending?", answer: "Education and job support." },
    { question: "Effect of media on trials?", answer: "It informs but can bias the public." },
    { question: "Victim's role in court?", answer: "Testify and give impact statements." },
    { question: "Fraud vs theft?", answer: "Fraud uses deception; theft takes property." },
    { question: "Decriminalize minor drug offenses?", answer: "Treatment may work better than prison." },
    { question: "How do juries decide?", answer: "Deliberate on evidence and law." },
    { question: "Meaning of 'beyond reasonable doubt'?", answer: "Evidence leaves no reasonable alternative." },
    { question: "What is probation?", answer: "Supervised freedom instead of prison." },
    { question: "What is parole?", answer: "Early release under supervision." },
    { question: "Role of forensics?", answer: "DNA and fingerprints link suspects." },
    { question: "What is burden of proof?", answer: "Prosecution must prove the case." },
    { question: "How can citizens reduce crime?", answer: "Report issues and support programs." },
    { question: "What is organized crime?", answer: "Coordinated illegal activity by groups." },
    { question: "How do laws change?", answer: "Parliament updates them over time." }
  ]
};

// Module 148 Data
const MODULE_148_DATA = {
  title: "Health and Fitness Vocabulary (B2 Level)",
  description: "Discuss health, nutrition, and training choices using B2 vocabulary",
  intro: `A healthy lifestyle combines nutrition, exercise, and rest. This B2 module teaches you comprehensive vocabulary to discuss fitness routines, balanced diets, recovery, and wellness. Learn to talk about cardio, strength training, nutrition, and how to maintain both physical and mental health.`,
  tip: "Health and fitness vocabulary is essential for gym conversations, doctor visits, and discussing wellness. Use these terms to describe your routine and goals confidently.",

  table: [
    { term: "🍎 NUTRITION", definition: '' },
    { term: "diet", definition: "food and drink regularly consumed" },
    { term: "nutrition", definition: "process of providing food for health" },
    { term: "calorie", definition: "unit measuring energy in food" },
    { term: "protein", definition: "nutrient that builds/repairs tissue" },
    { term: "vitamin", definition: "organic compound essential for health" },
    { term: "fat", definition: "nutrient providing energy and insulation" },
    { term: "carbohydrate", definition: "main energy source from food" },
    { term: "hydration", definition: "maintaining body fluid levels" },
    { term: "💪 EXERCISE & FITNESS", definition: '' },
    { term: "workout", definition: "session of physical exercise" },
    { term: "cardio", definition: "aerobic exercise for heart and lungs" },
    { term: "strength training", definition: "exercise to build muscle" },
    { term: "heart rate", definition: "number of heartbeats per minute" },
    { term: "recovery", definition: "rest period after exercise" },
    { term: "injury", definition: "physical harm or damage" },
    { term: "sleep", definition: "rest state essential for recovery" },
    { term: "🏥 HEALTH TERMS", definition: '' },
    { term: "obesity", definition: "condition of being very overweight" },
    { term: "cholesterol", definition: "fatty substance in blood" },
    { term: "blood pressure", definition: "force of blood against artery walls" },
    { term: "immune system", definition: "body's defense against disease" },
    { term: "lifestyle", definition: "way of living affecting health" }
  ],

  listeningExamples: [
    "Exercise improves body and mind.",
    "A balanced diet provides key nutrients.",
    "Hydration and sleep aid recovery.",
    "Cardio raises heart rate; strength builds muscle.",
    "High cholesterol and blood pressure increase risk.",
    "A healthy lifestyle includes regular exercise and good nutrition.",
    "Your immune system protects you from illness."
  ],

  speakingPractice: [
    { question: "How do you keep fit?", answer: "I exercise and follow a balanced diet." },
    { question: "Describe your workout routine.", answer: "Cardio and strength, about 45 minutes." },
    { question: "How important is sleep?", answer: "Crucial for recovery and focus." },
    { question: "How do you track nutrition?", answer: "Meal planning and reading labels." },
    { question: "Healthy way to lose weight?", answer: "Whole foods, portions, and activity." },
    { question: "How to stay motivated?", answer: "Set small goals and track progress." },
    { question: "Cardio or strength?", answer: "Both—for heart health and muscle." },
    { question: "How to prevent injuries?", answer: "Warm up and use proper form." },
    { question: "What to eat pre-workout?", answer: "Light carbs plus protein." },
    { question: "Post-workout recovery?", answer: "Stretching, hydration, and sleep." },
    { question: "Risks of obesity?", answer: "Diabetes and heart disease." },
    { question: "Lower cholesterol how?", answer: "Less trans fat, more fiber, exercise." },
    { question: "What raises blood pressure?", answer: "Salt, stress, inactivity." },
    { question: "Boost immune system how?", answer: "Sleep, manage stress, nutrient-dense foods." },
    { question: "Do you count calories?", answer: "Sometimes, to learn portions." },
    { question: "View on supplements?", answer: "Food first; use if needed." },
    { question: "Daily water intake?", answer: "Around two liters." },
    { question: "Home or gym?", answer: "Home for convenience, gym for gear." },
    { question: "How often to exercise?", answer: "At least 150 minutes weekly." },
    { question: "What is a balanced diet?", answer: "Veggies, lean protein, whole grains, healthy fats." },
    { question: "How do you manage stress?", answer: "Breathing, walking, less screen time." },
    { question: "Favorite cardio?", answer: "Running or cycling." },
    { question: "Improve flexibility how?", answer: "Stretching or yoga." },
    { question: "Opinion on fad diets?", answer: "Unsustainable—habits matter more." },
    { question: "Avoid late-night snacking?", answer: "Plan meals and keep healthy options." },
    { question: "Rest day routine?", answer: "Walk, mobility, and extra sleep." },
    { question: "Measure progress how?", answer: "Strength, endurance, and mood." },
    { question: "Pre-sleep routine?", answer: "No caffeine late and dim lights." },
    { question: "Healthy with a busy schedule?", answer: "Short workouts and meal prep." },
    { question: "Foods for recovery?", answer: "Protein and fruit." },
    { question: "Handle an injury?", answer: "Rest and follow medical advice." },
    { question: "Is breakfast necessary?", answer: "Helpful for many; overall diet matters." },
    { question: "What is mindful eating?", answer: "Listening to hunger and fullness." },
    { question: "Limit sugar how?", answer: "Choose water and whole foods." },
    { question: "Track steps?", answer: "Yes, aiming for ~10k." },
    { question: "Opinion on wearables?", answer: "Useful feedback without obsession." },
    { question: "Make workouts fun?", answer: "Music, partners, and new classes." },
    { question: "Weekly plan?", answer: "Alternate muscle groups; include rest." },
    { question: "Tip for beginners?", answer: "Start small and be consistent." },
    { question: "Stay healthy in winter?", answer: "Wash hands, eat well, and keep active." }
  ]
};

// Module 149 Data
const MODULE_149_DATA = {
  title: "Society and Social Issues Vocabulary (B2 Level)",
  description: "Discuss social challenges and fairness using B2 vocabulary and arguments",
  intro: `Society faces many challenges: inequality, discrimination, poverty, and injustice. This B2 module equips you with the vocabulary to discuss complex social issues, community needs, and solutions. Learn to express opinions on fairness, diversity, human rights, and social change with sophistication and empathy.`,
  tip: "Social issues vocabulary is crucial for meaningful conversations about the world around us. These terms help you participate in important discussions and express your values clearly.",

  table: [
    { term: "🌍 SOCIAL CHALLENGES", definition: '' },
    { term: "society", definition: "organized community of people" },
    { term: "community", definition: "group sharing common interests or location" },
    { term: "inequality", definition: "unfair difference in status or opportunity" },
    { term: "discrimination", definition: "unfair treatment based on characteristics" },
    { term: "poverty", definition: "state of being extremely poor" },
    { term: "homelessness", definition: "condition of having no permanent home" },
    { term: "unemployment", definition: "lack of paid work" },
    { term: "racism", definition: "prejudice based on race" },
    { term: "gender equality", definition: "equal rights for all genders" },
    { term: "⚖️ RIGHTS & SYSTEMS", definition: '' },
    { term: "human rights", definition: "fundamental freedoms for all people" },
    { term: "social class", definition: "division by economic/social status" },
    { term: "welfare", definition: "government support for those in need" },
    { term: "healthcare", definition: "medical services for maintaining health" },
    { term: "education", definition: "process of teaching and learning" },
    { term: "✊ ACTION & CHANGE", definition: '' },
    { term: "social justice", definition: "fair treatment and opportunity for all" },
    { term: "activism", definition: "campaigning for political/social change" },
    { term: "disability", definition: "physical or mental condition limiting activity" },
    { term: "migration", definition: "movement of people to new areas" },
    { term: "crime", definition: "illegal actions" },
    { term: "violence", definition: "use of physical force to harm" }
  ],

  listeningExamples: [
    "Social inequality limits access to education.",
    "Community projects can reduce homelessness.",
    "Activism raises awareness.",
    "Inclusive education supports disabilities.",
    "Welfare helps low-income families.",
    "Human rights guarantee basic freedoms and dignity.",
    "Social justice means fair opportunities for everyone."
  ],

  speakingPractice: [
    { question: "What kind of society do you want?", answer: "A fair, inclusive society with equal opportunities." },
    { question: "Causes of social inequality?", answer: "Unequal access to education, jobs, and healthcare." },
    { question: "How to support homeless people?", answer: "Shelters, training, and mental-health care." },
    { question: "Forms of discrimination?", answer: "Racism, sexism, ageism, disability bias." },
    { question: "How does poverty affect children?", answer: "Poor nutrition and limited education." },
    { question: "Policies to reduce unemployment?", answer: "Training and support for small businesses." },
    { question: "How can schools promote equality?", answer: "Inclusive teaching and scholarships." },
    { question: "Role of healthcare?", answer: "Keeps people healthy and productive." },
    { question: "How to fight racism?", answer: "Education, laws, and representation." },
    { question: "Why is gender equality vital?", answer: "It benefits society and the economy." },
    { question: "How do human rights protect us?", answer: "Guarantee basic freedoms and dignity." },
    { question: "Does social class matter?", answer: "Yes—it affects networks and chances." },
    { question: "What is social mobility?", answer: "Moving up through education and work." },
    { question: "Causes of youth violence?", answer: "Poverty, exclusion, and crime exposure." },
    { question: "How to make cities safer?", answer: "Lighting, community policing, youth programs." },
    { question: "How should media cover social issues?", answer: "Accurately and with diverse voices." },
    { question: "Barriers for people with disabilities?", answer: "Access and prejudice." },
    { question: "Effects of migration on society?", answer: "More diversity and skills; needs integration." },
    { question: "What is social justice?", answer: "Fairness in opportunities and rights." },
    { question: "How can citizens support it?", answer: "Volunteer, donate, vote, and speak up." },
    { question: "Should welfare benefits increase?", answer: "They should match living costs." },
    { question: "Can technology reduce inequality?", answer: "Online education and remote work help." },
    { question: "Is crime linked to social issues?", answer: "Often—poverty and exclusion influence it." },
    { question: "How to reduce domestic violence?", answer: "Education, shelters, and enforcement." },
    { question: "How can companies improve diversity?", answer: "Inclusive hiring and bias training." },
    { question: "Role of NGOs?", answer: "Provide services and advocate change." },
    { question: "Does education end inequality?", answer: "Helps a lot, but policy matters too." },
    { question: "How do protests create change?", answer: "They pressure leaders and raise awareness." },
    { question: "What is the digital divide?", answer: "Unequal access to internet and devices." },
    { question: "How do stereotypes harm people?", answer: "They limit opportunities and justify bias." },
    { question: "Support low-income students how?", answer: "Meals, tutoring, and scholarships." },
    { question: "Compulsory voting—pros/cons?", answer: "Better turnout vs. freedom of choice." },
    { question: "How to build community locally?", answer: "Events, forums, and volunteering." },
    { question: "What is restorative justice?", answer: "Repairing harm through dialogue." },
    { question: "Effects of misinformation?", answer: "Polarization and loss of trust." },
    { question: "What is inclusive language?", answer: "Respectful words for all groups." },
    { question: "Reduce workplace stress how?", answer: "Reasonable hours and support." },
    { question: "How does art reflect issues?", answer: "It tells stories and builds empathy." },
    { question: "Your top social priority?", answer: "Equal access to quality education." },
    { question: "How can one person make change?", answer: "Start local and be consistent." }
  ]
};

// Module 150 Data
const MODULE_150_DATA = {
  title: "Travel and Adventure Vocabulary (B2 Level)",
  description: "Use B2 travel vocabulary to plan trips and describe adventurous experiences",
  intro: `Travel opens doors to new experiences, cultures, and adventures. This B2 module provides comprehensive vocabulary for planning trips, navigating airports, choosing accommodation, and sharing travel stories. Learn to discuss itineraries, adventure sports, backpacking, and everything you need for confident travel conversations.`,
  tip: "Travel vocabulary is essential for exploring the world and sharing experiences. Master these terms to plan trips, solve problems abroad, and tell captivating travel stories.",

  table: [
    { term: "✈️ PLANNING & BASICS", definition: '' },
    { term: "destination", definition: "place you're traveling to" },
    { term: "journey", definition: "act of traveling from one place to another" },
    { term: "adventure", definition: "exciting, unusual experience" },
    { term: "itinerary", definition: "planned route or schedule" },
    { term: "passport", definition: "official document for international travel" },
    { term: "reservation", definition: "booking for accommodation or transport" },
    { term: "luggage", definition: "bags and suitcases for travel" },
    { term: "flight", definition: "journey by air" },
    { term: "airport", definition: "place where aircraft take off/land" },
    { term: "🏨 ACCOMMODATION & ACTIVITIES", definition: '' },
    { term: "accommodation", definition: "place to stay (hotel, hostel, etc.)" },
    { term: "sightseeing", definition: "visiting interesting places" },
    { term: "tourist", definition: "person traveling for pleasure" },
    { term: "backpacking", definition: "traveling cheaply with minimal luggage" },
    { term: "camping", definition: "staying outdoors in a tent" },
    { term: "hiking", definition: "long walk in nature" },
    { term: "tour guide", definition: "person who shows tourists around" },
    { term: "adventure sports", definition: "thrilling physical activities" },
    { term: "🗺️ NAVIGATION & EXTRAS", definition: '' },
    { term: "map", definition: "diagram showing locations" },
    { term: "souvenir", definition: "item bought as a reminder of a place" },
    { term: "travel agency", definition: "business that arranges trips" }
  ],

  listeningExamples: [
    "Our itinerary includes national parks.",
    "Backpacking needs planning.",
    "The flight was delayed, so we changed our reservation.",
    "We went hiking and camping.",
    "The tour guide told the site's history.",
    "Always protect your passport when traveling abroad.",
    "Sightseeing is best done early in the morning."
  ],

  speakingPractice: [
    { question: "Favorite destination and why?", answer: "Kyoto—for temples, food, and calm streets." },
    { question: "Planned itinerary or flexible trip?", answer: "Flexible with a few must-sees." },
    { question: "Most memorable journey?", answer: "A coastal train ride with great views." },
    { question: "How to prepare for international flights?", answer: "Check documents, pack light, arrive early." },
    { question: "Do you enjoy adventure sports?", answer: "Yes—paragliding and scuba diving." },
    { question: "Pros/cons of backpacking?", answer: "Cheap and free, but heavy bags." },
    { question: "How to choose accommodation?", answer: "Location, reviews, and price." },
    { question: "Essentials in your luggage?", answer: "Power bank, jacket, and first-aid kit." },
    { question: "How to protect your passport?", answer: "Use a money belt and keep copies." },
    { question: "Travel agency or DIY?", answer: "DIY using reliable sites." },
    { question: "Sightseeing strategy in a new city?", answer: "Walk, join a tour, visit markets." },
    { question: "Handling flight delays?", answer: "Contact the airline and check options." },
    { question: "What makes a good tour guide?", answer: "Knowledgeable and friendly." },
    { question: "Preferred souvenirs?", answer: "Handmade items or local food." },
    { question: "Opinion on camping?", answer: "Love it—nature and starry nights." },
    { question: "How to stay safe traveling?", answer: "Research areas and keep valuables hidden." },
    { question: "Packing strategy?", answer: "Roll clothes and use cubes." },
    { question: "Managing a travel budget?", answer: "Daily limits and expense tracking." },
    { question: "Favorite transport mode?", answer: "Trains—comfortable and scenic." },
    { question: "Finding hidden spots?", answer: "Ask locals and read forums." },
    { question: "Solo or group travel?", answer: "Solo—freedom and flexibility." },
    { question: "Dealing with language barriers?", answer: "Learn phrases and use apps." },
    { question: "Sustainable tourism view?", answer: "Reduce waste and support locals." },
    { question: "Planning a hike?", answer: "Check maps and weather; pack layers." },
    { question: "What to do on long layovers?", answer: "Explore the city if possible." },
    { question: "Missed a connection?", answer: "Yes—rebooked and got accommodation." },
    { question: "Dream adventure?", answer: "A trek to Machu Picchu." },
    { question: "How to document trips?", answer: "Photos and a travel journal." },
    { question: "Beach or mountains?", answer: "Mountains—cool air and trails." },
    { question: "Avoiding tourist traps?", answer: "Eat where locals eat; skip pushy tours." },
    { question: "Jet lag strategy?", answer: "Adjust sleep and get sunlight." },
    { question: "Choosing travel insurance?", answer: "Medical, delay, and luggage coverage." },
    { question: "Must-have travel apps?", answer: "Maps, booking, and translation." },
    { question: "Tipping etiquette abroad?", answer: "Research local customs." },
    { question: "Keeping devices charged?", answer: "Universal adapter and power bank." },
    { question: "Why travel light?", answer: "Less stress and easier movement." },
    { question: "Respecting local culture?", answer: "Dress appropriately and follow rules." },
    { question: "Best travel hack?", answer: "Bring a reusable water bottle." },
    { question: "Next on your list?", answer: "A road trip on the Dalmatian coast." }
  ]
};


  const getCurrentModuleData = () => {
    // A1 Modules
    if (selectedModule === 1) return MODULE_1_DATA;
    if (selectedModule === 2) return MODULE_2_DATA;
    if (selectedModule === 3) return MODULE_3_DATA;
    if (selectedModule === 4) return MODULE_4_DATA;
    if (selectedModule === 5) return MODULE_5_DATA;
    if (selectedModule === 6) return MODULE_6_DATA;
    if (selectedModule === 7) return MODULE_7_DATA;
    if (selectedModule === 8) return MODULE_8_DATA;
    if (selectedModule === 9) return MODULE_9_DATA;
    if (selectedModule === 10) return MODULE_10_DATA;
    if (selectedModule === 11) return MODULE_11_DATA;
    if (selectedModule === 12) return MODULE_12_DATA;
    if (selectedModule === 13) return MODULE_13_DATA;
    if (selectedModule === 14) return MODULE_14_DATA;
    if (selectedModule === 15) return MODULE_15_DATA;
    if (selectedModule === 16) return MODULE_16_DATA;
    if (selectedModule === 17) return MODULE_17_DATA;
    if (selectedModule === 18) return MODULE_18_DATA;
    if (selectedModule === 19) return MODULE_19_DATA;
    if (selectedModule === 20) return MODULE_20_DATA;
    if (selectedModule === 21) return MODULE_21_DATA;
    if (selectedModule === 22) return MODULE_22_DATA;
    if (selectedModule === 23) return MODULE_23_DATA;
    if (selectedModule === 24) return MODULE_24_DATA;
    if (selectedModule === 25) return MODULE_25_DATA;
    if (selectedModule === 26) return MODULE_26_DATA;
    if (selectedModule === 27) return MODULE_27_DATA;
    if (selectedModule === 28) return MODULE_28_DATA;
    if (selectedModule === 29) return MODULE_29_DATA;
    if (selectedModule === 30) return MODULE_30_DATA;
    if (selectedModule === 31) return MODULE_31_DATA;
    if (selectedModule === 32) return MODULE_32_DATA;
    if (selectedModule === 33) return MODULE_33_DATA;
    if (selectedModule === 34) return MODULE_34_DATA;
    if (selectedModule === 35) return MODULE_35_DATA;
    if (selectedModule === 36) return MODULE_36_DATA;
    if (selectedModule === 37) return MODULE_37_DATA;
    if (selectedModule === 38) return MODULE_38_DATA;
    if (selectedModule === 39) return MODULE_39_DATA;
    if (selectedModule === 40) return MODULE_40_DATA;
    if (selectedModule === 41) return MODULE_41_DATA;
    if (selectedModule === 42) return MODULE_42_DATA;
    if (selectedModule === 43) return MODULE_43_DATA;
    if (selectedModule === 44) return MODULE_44_DATA;
    if (selectedModule === 45) return MODULE_45_DATA;
    if (selectedModule === 46) return MODULE_46_DATA;
    if (selectedModule === 47) return MODULE_47_DATA;
    if (selectedModule === 48) return MODULE_48_DATA;
    if (selectedModule === 49) return MODULE_49_DATA;
    if (selectedModule === 50) return MODULE_50_DATA;
    
    // A2 Modules
    if (selectedModule === 51) return MODULE_51_DATA;
    if (selectedModule === 52) return MODULE_52_DATA;
    if (selectedModule === 53) return MODULE_53_DATA;
    if (selectedModule === 54) return MODULE_54_DATA;
    if (selectedModule === 55) return MODULE_55_DATA;
    if (selectedModule === 56) return MODULE_56_DATA;
    if (selectedModule === 57) return MODULE_57_DATA;
    if (selectedModule === 58) return MODULE_58_DATA;
    if (selectedModule === 59) return MODULE_59_DATA;
    if (selectedModule === 60) return MODULE_60_DATA;
    if (selectedModule === 61) return MODULE_61_DATA;
    if (selectedModule === 62) return MODULE_62_DATA;
    if (selectedModule === 63) return MODULE_63_DATA;
    if (selectedModule === 64) return MODULE_64_DATA;
    if (selectedModule === 65) return MODULE_65_DATA;
    if (selectedModule === 66) return MODULE_66_DATA;
    if (selectedModule === 67) return MODULE_67_DATA;
    if (selectedModule === 68) return MODULE_68_DATA;
    if (selectedModule === 69) return MODULE_69_DATA;
    if (selectedModule === 70) return MODULE_70_DATA;
    if (selectedModule === 71) return MODULE_71_DATA;
    if (selectedModule === 72) return MODULE_72_DATA;
    if (selectedModule === 73) return MODULE_73_DATA;
    if (selectedModule === 74) return MODULE_74_DATA;
    if (selectedModule === 75) return MODULE_75_DATA;
    if (selectedModule === 76) return MODULE_76_DATA;
    if (selectedModule === 77) return MODULE_77_DATA;
    if (selectedModule === 78) return MODULE_78_DATA;
    if (selectedModule === 79) return MODULE_79_DATA;
    if (selectedModule === 80) return MODULE_80_DATA;
    if (selectedModule === 81) return MODULE_81_DATA;
    if (selectedModule === 82) return MODULE_82_DATA;
    if (selectedModule === 83) return MODULE_83_DATA;
    if (selectedModule === 84) return MODULE_84_DATA;
    if (selectedModule === 85) return MODULE_85_DATA;
    if (selectedModule === 86) return MODULE_86_DATA;
    if (selectedModule === 87) return MODULE_87_DATA;
    if (selectedModule === 88) return MODULE_88_DATA;
    if (selectedModule === 89) return MODULE_89_DATA;
    if (selectedModule === 90) return MODULE_90_DATA;
    if (selectedModule === 91) return MODULE_91_DATA;
    if (selectedModule === 92) return MODULE_92_DATA;
    if (selectedModule === 93) return MODULE_93_DATA;
    if (selectedModule === 94) return MODULE_94_DATA;
    if (selectedModule === 95) return MODULE_95_DATA;
    if (selectedModule === 96) return MODULE_96_DATA;
    if (selectedModule === 97) return MODULE_97_DATA;
    if (selectedModule === 98) return MODULE_98_DATA;
    if (selectedModule === 99) return MODULE_99_DATA;
    if (selectedModule === 100) return MODULE_100_DATA;
    
    // B1 Modules
    if (selectedModule === 101) return MODULE_101_DATA;
    if (selectedModule === 102) return MODULE_102_DATA;
    if (selectedModule === 103) return MODULE_103_DATA;
    if (selectedModule === 104) return MODULE_104_DATA;
    if (selectedModule === 105) return MODULE_105_DATA;
    if (selectedModule === 106) return MODULE_106_DATA;
    if (selectedModule === 107) return MODULE_107_DATA;
    if (selectedModule === 108) return MODULE_108_DATA;
    if (selectedModule === 109) return MODULE_109_DATA;
    if (selectedModule === 110) return MODULE_110_DATA;
    if (selectedModule === 111) return MODULE_111_DATA;
    if (selectedModule === 112) return MODULE_112_DATA;
    if (selectedModule === 113) return MODULE_113_DATA;
    if (selectedModule === 114) return MODULE_114_DATA;
    if (selectedModule === 115) return MODULE_115_DATA;
    if (selectedModule === 116) return MODULE_116_DATA;
    if (selectedModule === 117) return MODULE_117_DATA;
    if (selectedModule === 118) return MODULE_118_DATA;
    if (selectedModule === 119) return MODULE_119_DATA;
    if (selectedModule === 120) return MODULE_120_DATA;
    if (selectedModule === 121) return MODULE_121_DATA;
    if (selectedModule === 122) return MODULE_122_DATA;
    if (selectedModule === 123) return MODULE_123_DATA;
    if (selectedModule === 124) return MODULE_124_DATA;
    if (selectedModule === 125) return MODULE_125_DATA;
    if (selectedModule === 126) return MODULE_126_DATA;
    if (selectedModule === 127) return MODULE_127_DATA;
    if (selectedModule === 128) return MODULE_128_DATA;
    if (selectedModule === 129) return MODULE_129_DATA;
    if (selectedModule === 130) return MODULE_130_DATA;
    if (selectedModule === 131) return MODULE_131_DATA;
    if (selectedModule === 132) return MODULE_132_DATA;
    if (selectedModule === 133) return MODULE_133_DATA;
    if (selectedModule === 134) return MODULE_134_DATA;
    if (selectedModule === 135) return MODULE_135_DATA;
    if (selectedModule === 136) return MODULE_136_DATA;
    if (selectedModule === 137) return MODULE_137_DATA;
    if (selectedModule === 138) return MODULE_138_DATA;
    if (selectedModule === 139) return MODULE_139_DATA;
    if (selectedModule === 140) return MODULE_140_DATA;
    if (selectedModule === 141) return MODULE_141_DATA;
    if (selectedModule === 142) return MODULE_142_DATA;
    if (selectedModule === 143) return MODULE_143_DATA;
    if (selectedModule === 144) return MODULE_144_DATA;
    if (selectedModule === 145) return MODULE_145_DATA;
    if (selectedModule === 146) return MODULE_146_DATA;
    if (selectedModule === 147) return MODULE_147_DATA;
    if (selectedModule === 148) return MODULE_148_DATA;
    if (selectedModule === 149) return MODULE_149_DATA;
    if (selectedModule === 150) return MODULE_150_DATA;

    // Fallback to Module 1 for unknown modules
    return MODULE_1_DATA;
  };

  // Calculate progress
  const currentModuleData = getCurrentModuleData();
  const totalQuestions = currentModuleData?.speakingPractice?.length ?? 0;
  const overallProgress = ((speakingIndex + (correctAnswers > 0 ? 1 : 0)) / totalQuestions) * 100;
  const lessonKey = `${selectedLevel}-${selectedModule}`;

  // Mobile detection helper
  const isMobile =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(max-width: 480px)').matches;

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

  // --- Visibility + narration guards ---
  const introRef = useRef<HTMLDivElement | null>(null);
  const introVisibleRef = useRef(false);
  const cancelAllNarration = useCallback(() => {
    try { narration.cancel(); } catch {}
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
      !hasBeenRead[lessonKey] &&
      introVisibleRef.current; // must be on screen

    // if (canRead) startTeacherReading(); // Disabled: intro is now silent

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

  // Migrate existing progress data on component mount
  useEffect(() => {
    const migrateData = async () => {
      try {
        await progressService.migrateExistingData();
      } catch (error) {
        console.error('Failed to migrate progress data:', error);
      }
    };

    migrateData();
  }, []); // Run only once on mount

  // Restore progress safely when a module opens
  const userId = 'anon'; // TODO: adapt to your auth; fallback to 'anon'
  const totals = {
    listening: currentModuleData?.listeningExamples?.length ?? 0,
    speaking: currentModuleData?.speakingPractice?.length ?? 0,
  };

  useEffect(() => {
    // Run when module changes; restore once.
    if (!selectedModule || !currentModuleData || restoredOnceRef.current) return;

    const restoreProgress = async () => {
      try {
        const saved = await loadModuleProgress(String(selectedLevel), selectedModule);
        if (saved && saved.phase !== 'complete') {
          // restore
          setCurrentPhase(saved.phase);
          setListeningIndex(0);
          setSpeakingIndex(saved.questionIndex);
        } else {
          // fresh start for this module
          setCurrentPhase('intro');
          setListeningIndex(0);
          setSpeakingIndex(0);
        }
      } catch (error) {
        console.error('Error restoring progress:', error);
        // fallback to fresh start
        setCurrentPhase('intro');
        setListeningIndex(0);
        setSpeakingIndex(0);
      }
    };

    restoreProgress();

    restoredOnceRef.current = true;
    // also cancel any stray timers/narration here
    narration.cancel?.();
    if (timeoutRef?.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; }
  }, [selectedModule, currentModuleData, selectedLevel]);

  // Stop resetting to Q1 when entering "speaking" - only reset for fresh modules
  useEffect(() => {
    if (currentPhase !== 'speaking') return;
    // Do not reset if we already restored or if we have progress saved.
    // Only set to 0 when starting a truly fresh module.
    const checkProgress = async () => {
      try {
        const saved = await loadModuleProgress(String(selectedLevel), selectedModule);
        if (!saved || saved.phase === 'complete') {
          setSpeakingIndex(0);
        }
      } catch (error) {
        console.error('Error checking progress:', error);
        setSpeakingIndex(0);
      }
    };

    checkProgress();
    // else: keep restored index
    lessonCompletedRef.current = false;
    if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; }
    setIsProcessing(false);
  }, [currentPhase, selectedLevel, selectedModule]);

  // Save on any meaningful change (using old progress store)
  useEffect(() => {
    saveProgressDebounced();
  }, [selectedLevel, selectedModule, currentPhase, listeningIndex, speakingIndex]);

  // Autosave on every meaningful change (debounced & guarded) - new progress store
  useEffect(() => {
    if (!selectedModule || !currentModuleData) return;

    // debounce a bit to avoid hammering storage
    if (autosaveTimeoutRef.current) window.clearTimeout(autosaveTimeoutRef.current);
    autosaveTimeoutRef.current = window.setTimeout(async () => {
      try {
        await saveModuleProgress(
          String(selectedLevel),
          selectedModule,
          (currentPhase === 'listening' || currentPhase === 'speaking') ? currentPhase as LessonPhaseType : 'intro',
          speakingIndex
        );
      } catch (error) {
        console.error('Error auto-saving progress:', error);
      }
      autosaveTimeoutRef.current = null;
    }, 250);
  }, [userId, selectedLevel, selectedModule, currentPhase, listeningIndex, speakingIndex, currentModuleData]);

  // Clean up on unmount
  useEffect(() => () => {
    if (autosaveTimeoutRef.current) clearTimeout(autosaveTimeoutRef.current);
    clearWatchdog(); // Clean up watchdog timer
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
      
      if (process.env.NODE_ENV === 'development') console.log(`📦 Hydrate -> source=params level=${hydratedLevel} module=${hydratedModule} q=${hydratedQuestion + 1}`);
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
        
        if (process.env.NODE_ENV === 'development') console.log(`📦 Hydrate -> source=saved_progress level=${hydratedLevel} module=${hydratedModule} q=${hydratedQuestion + 1}`);
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
          
          if (process.env.NODE_ENV === 'development') console.log(`📦 Hydrate -> source=storage level=${hydratedLevel} module=${hydratedModule} q=${hydratedQuestion + 1}`);
        }
        // Priority 4: Default fallback (A1/Module 1)
        else {
          hydratedLevel = 'A1';
          hydratedModule = 1;
          hydratedQuestion = 0;
          hydratedPhase = 'intro';
          hydratedViewState = 'levels';
          source = 'default';
          
          if (process.env.NODE_ENV === 'development') console.log(`📦 Hydrate -> source=default level=${hydratedLevel} module=${hydratedModule} q=${hydratedQuestion + 1}`);
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
              if (process.env.NODE_ENV === 'development') console.warn('Failed to show toast:', error);
              // Fallback notification
              if (process.env.NODE_ENV === 'development') console.log(`🎯 Starting at ${placedLevel} based on your Speaking Test`);
            });
          }, 500);
        }
      } catch (e) {
        if (process.env.NODE_ENV === 'development') console.warn('Failed to parse userPlacement:', e);
      }
    }
  }, [isHydrated]);

  // Keep evaluator target fresh when index or module changes
  useEffect(() => {
    const item = currentModuleData?.speakingPractice?.[speakingIndex];
    evaluatorTargetRef.current = computeTargetFromItem(item);
    // QA log to confirm we're using the right target
    if (process.env.NODE_ENV === 'development') console.log('[Eval] index', speakingIndex, 'target:', evaluatorTargetRef.current);
  }, [selectedModule, speakingIndex, currentModuleData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelTTSSafe();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // QA logging
  useEffect(() => {
    const total = currentModuleData?.speakingPractice?.length ?? 0;
    const item = currentModuleData?.speakingPractice?.[speakingIndex];
    if (process.env.NODE_ENV === 'development') {
      if (process.env.NODE_ENV === 'development') {
        console.log('[Progress] index:', speakingIndex, 'of', total, 'module:', selectedModule);
        if (!item) console.warn('[Progress] No item at index', speakingIndex);
      }
    }
  }, [speakingIndex, selectedModule, currentModuleData]);

  
  async function celebrateAndAdvance() {
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
    } catch {}

    // persist completion in new progress store
    try {
      await saveModuleProgress(
        String(selectedLevel),
        selectedModule,
        'complete',
        speakingIndexRef.current,
        currentModuleData?.speakingPractice?.length ?? 40, // correct answers = total for completion
        0 // time spent - we don't track this yet, so using 0
      );
    } catch (error) {
      console.error('Error saving completion progress:', error);
    }

    // Save progress to completed modules
    const newCompletedModules = [...completedModules];
    const moduleKey = `module-${selectedModule}`;
    if (!newCompletedModules.includes(moduleKey)) {
      newCompletedModules.push(moduleKey);
      setCompletedModules(newCompletedModules);
      localStorage.setItem('completedModules', JSON.stringify(newCompletedModules));
    }

    cancelTTSSafe();
    narration.speak(`Congratulations! You have completed Module ${selectedModule}. Well done!`);

    const nextModule = getNextModuleId(selectedLevel as 'A1' | 'A2' | 'B1', selectedModule);
    window.setTimeout(() => {
      setShowConfetti(false);

      if (nextModule != null) {
        // reset lesson state for the next module
        setSelectedModule(nextModule);
        // restoredOnceRef needs to be reset so the new module can be restored
        restoredOnceRef.current = false;
        setCurrentPhase('intro');
        setListeningIndex(0);
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

  // Clear any watchdog timers
  function clearWatchdog() {
    if (watchdogRef.current) {
      clearTimeout(watchdogRef.current);
      watchdogRef.current = null;
    }
  }


  // Non-blocking TTS cancellation
  function cancelTTSSafe() {
    try {
      narration.cancel();
    } catch (error) {
      // Silent fail - don't block transitions
      if (process.env.NODE_ENV === 'development') console.log('TTS cancel failed:', error);
    }
  }

  // Safety watchdog timer - only for truly stuck states
  function startWatchdog() {
    clearWatchdog();
    watchdogRef.current = setTimeout(() => {
      if (process.env.NODE_ENV === 'development') console.warn('🐕 Watchdog: Auto-advancing stuck transition (30s timeout)');
      advanceToNextQuestion();
    }, 30000); // 30 second timeout - much more reasonable
  }

  // Start delayed watchdog for speaking phase - gives user time to read
  function startDelayedWatchdog() {
    clearWatchdog();
    // Wait 5 seconds for user to read, then start 30-second watchdog
    setTimeout(() => {
      if (speakStep === 'speak' && speakStatus === 'idle') {
        startWatchdog();
        if (process.env.NODE_ENV === 'development') {
          console.log('🐕 Started delayed watchdog for speaking phase');
        }
      }
    }, 5000);
  }

  // MCQ to Speaking phase transition
  function transitionToSpeaking() {
    if (inFlightRef.current) return;

    // Cancel any TTS and clear watchdog
    cancelTTSSafe();
    clearWatchdog();

    if (process.env.NODE_ENV === 'development') {
      console.log('🎯 MCQ correct → Transitioning to speaking phase');
    }

    // Instant transition to speaking
    flushSync(() => {
      setSpeakStep('speak');
    });

    // Start delayed watchdog - gives user time to read before protection kicks in
    startDelayedWatchdog();
  }

  // CENTRALIZED TRANSITION CONTROLLER - Single source of truth for question advancement
  function advanceToNextQuestion() {
    // Simple in-flight guard
    if (inFlightRef.current) return;
    inFlightRef.current = true;

    try {
      // Cancel any ongoing TTS immediately (non-blocking)
      cancelTTSSafe();
      clearWatchdog();

      const total = currentModuleData?.speakingPractice?.length ?? 0;
      const curr = speakingIndexRef.current;

      if (process.env.NODE_ENV === 'development') {
        console.log(`🎯 Advancing from question ${curr + 1}/${total}`);
      }

      if (curr + 1 < total) {
        // INSTANT UI UPDATE - no delays, no nested timeouts
        flushSync(() => {
          setSpeakingIndex(curr + 1);
          setSpeakStep('mcq');
        });

        // Reset other states immediately
        setSpeakStatus('idle');
        setIsProcessing(false);
        setFeedback('');
        setFeedbackType('info');

        // Start delayed watchdog for new MCQ - give user time to read
        setTimeout(() => {
          if (speakStep === 'mcq') {
            startDelayedWatchdog();
          }
        }, 3000); // 3 seconds to read new question

        // Background save (non-blocking)
        saveModuleProgress(String(selectedLevel), selectedModule!, 'speaking', curr + 1, curr + 1, 0)
          .catch(error => console.error('Background save failed:', error));

      } else {
        // Module complete
        if (process.env.NODE_ENV === 'development') {
          console.log(`🎉 Module ${selectedModule} completed!`);
        }

        setSpeakStatus('idle');
        setIsProcessing(false);
        celebrateAndAdvance();

        // Background save completion
        saveModuleProgress(String(selectedLevel), selectedModule!, 'complete', total, total, 0)
          .catch(error => console.error('Completion save failed:', error));
      }

    } catch (error) {
      console.error('Error in advanceToNextQuestion:', error);
      // Reset states on error
      setSpeakStatus('idle');
      setIsProcessing(false);
    } finally {
      inFlightRef.current = false;
    }
  }



  // Teacher reading functionality
  const startTeacherReading = async () => {
    setIsTeacherReading(true);
    setCurrentPhase('teacher-reading');
    cancelTTSSafe();
    
    // Read full lesson content line by line
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
    
    // Check if there's a table and announce it
    if ('table' in currentModuleData && currentModuleData.table) {
      await new Promise<void>((resolve) => {
        narration.speak("Şimdi lütfen aşağıdaki tabloya göz atın.");
        setTimeout(resolve, 2000);
      });
      
      // Wait for user to explore table (3 seconds)
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    setIsTeacherReading(false);
    setReadingComplete(true);
    setCurrentPhase('listening');
    // Mark this lesson as read
    setHasBeenRead(prev => ({ ...prev, [lessonKey]: true }));
  };

  // Skip to questions handler
  const skipToQuestions = useCallback(() => {
    // Cancel any ongoing narration
    cancelTTSSafe();

    // Stop teacher reading state
    setIsTeacherReading(false);
    setReadingComplete(true);

    // Move directly to listening phase
    setCurrentPhase('listening');

    // Mark lesson as read to prevent re-reading
    const lessonKey = `${selectedLevel}-${selectedModule}`;
    setHasBeenRead(prev => ({ ...prev, [lessonKey]: true }));

    console.log('⏭️ Skipped to questions phase');
  }, [selectedLevel, selectedModule]);

  // Audio recording setup
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [microphoneError, setMicrophoneError] = useState<string | null>(null);
  const [retryAttempts, setRetryAttempts] = useState(0);

  const initializeRecorder = useCallback(async (isRetry = false) => {
    try {
      setMicrophoneError(null);
      
      if (isRetry) {
        if (process.env.NODE_ENV === 'development') console.log('🔄 Retrying microphone initialization...');
      } else {
        if (process.env.NODE_ENV === 'development') console.log('🎤 Requesting microphone access...');
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
      
      if (process.env.NODE_ENV === 'development') console.log('✅ Microphone access granted!', {
        streamId: stream.id,
        audioTracks: stream.getAudioTracks().length,
        trackSettings: stream.getAudioTracks()[0]?.getSettings()
      });
      
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
        if (process.env.NODE_ENV === 'development') console.log('📱 Using MIME type:', mimeType);
      } else {
        if (process.env.NODE_ENV === 'development') console.warn('⚠️ No supported MIME types found, using default');
      }
      
      const recorder = new MediaRecorder(stream, { mimeType });
      
      let currentAudioChunks: Blob[] = [];
      
      recorder.ondataavailable = (event) => {
        if (process.env.NODE_ENV === 'development') console.log('📊 Audio chunk received:', event.data.size, 'bytes');
        if (event.data.size > 0) {
          currentAudioChunks.push(event.data);
        }
      };
      
      recorder.onstart = () => {
        if (process.env.NODE_ENV === 'development') console.log('🎙️ Recording started successfully');
        currentAudioChunks = [];
        setRetryAttempts(0); // Reset retry count on successful start
      };
      
      recorder.onstop = async () => {
        if (process.env.NODE_ENV === 'development') console.log('⏹️ Recording stopped. Chunks:', currentAudioChunks.length);
        
        if (currentAudioChunks.length > 0) {
          const totalSize = currentAudioChunks.reduce((sum, chunk) => sum + chunk.size, 0);
          if (process.env.NODE_ENV === 'development') console.log('📦 Total audio size:', totalSize, 'bytes');
          
          if (totalSize > 1000) { // Minimum 1KB for meaningful audio
            const audioBlob = new Blob(currentAudioChunks, { type: mimeType });
            if (process.env.NODE_ENV === 'development') console.log('🎵 Final blob created:', {
              size: audioBlob.size,
              type: audioBlob.type,
              chunks: currentAudioChunks.length
            });
            
            // Additional validation: check if blob is actually audio data
            if (audioBlob.size > 0 && audioBlob.type.includes('audio')) {
              await processAudioRecording(audioBlob);
            } else {
              console.error('❌ Invalid audio blob created');
              setFeedback('Invalid audio format. Please try again.');
              setFeedbackType('error');
              setTimeout(() => {
                setFeedback('');
                setIsProcessing(false);
              }, 3000);
            }
          } else {
            if (process.env.NODE_ENV === 'development') console.warn('⚠️ Audio recording too small:', totalSize, 'bytes');
            setFeedback('Recording too short. Please speak for at least 2 seconds.');
            setFeedbackType('error');
            setTimeout(() => {
              setFeedback('');
              setIsProcessing(false);
            }, 3000);
          }
          currentAudioChunks = [];
        } else {
          if (process.env.NODE_ENV === 'development') console.warn('⚠️ No audio chunks recorded');
          setFeedback('No audio was captured. Please check your microphone and try again.');
          setFeedbackType('error');
          setTimeout(() => {
            setFeedback('');
            setIsProcessing(false);
          }, 3000);
        }
      };
      
      recorder.onerror = (event: any) => {
        console.error('❌ MediaRecorder error:', event.error || event);
        // No generic error feedback - let the flow auto-retry
        setIsRecording(false);
        setIsProcessing(false);
      };
      
      setMediaRecorder(recorder);
      if (process.env.NODE_ENV === 'development') console.log('🎤 MediaRecorder initialized successfully');
      
    } catch (error: any) {
      console.error('❌ Error accessing microphone:', error);
      
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
    }
  }, [currentPhase, viewState]);

  // Debug speakingIndex changes
  useEffect(() => {
    const total = currentModuleData?.speakingPractice?.length ?? 0;
    const item = currentModuleData?.speakingPractice?.[speakingIndex];
    if (process.env.NODE_ENV === 'development') console.log('✅ speakingIndex changed to:', speakingIndex);
    if (process.env.NODE_ENV === 'development') console.log('✅ Current module data total questions:', total);
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Current question:', item);
      console.log('✅ Moved to question:', speakingIndex + 1);
    }
    
    // Safety: Ensure isProcessing is reset when moving to new question
    if (isProcessing) {
      if (process.env.NODE_ENV === 'development') console.log('⚠️ isProcessing was still true when question changed - resetting it');
      setIsProcessing(false);
    }
  }, [speakingIndex, currentModuleData, isProcessing]);

  const processAudioRecording = useCallback(async (audioBlob: Blob) => {
    // 🔒 CRITICAL: Prevent concurrent processing and lock current state
    if (isProcessing) {
      if (process.env.NODE_ENV === 'development') console.log('⚠️ Audio processing already in progress, ignoring duplicate request');
      return;
    }

    
    setIsProcessing(true);
    setAttempts(prev => prev + 1);
    
    if (process.env.NODE_ENV === 'development') console.log('🔒 PROCESSING STARTED - isProcessing set to TRUE');
    
    // Clear any previous feedback to prevent confusion
    setFeedback('');
    setFeedbackType('info');
    
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('🎵 Processing audio recording...');
        console.log('📊 Blob details:', {
          size: audioBlob.size,
          type: audioBlob.type,
          isEmpty: audioBlob.size === 0
        });
      }
      
      // Validate audio blob
      if (!audioBlob || audioBlob.size === 0) {
        console.error('❌ Empty or invalid audio blob');
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
        if (process.env.NODE_ENV === 'development') console.warn('⚠️ Audio blob is very small:', audioBlob.size, 'bytes');
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
      
      if (process.env.NODE_ENV === 'development') console.log('📤 Sending audio to transcribe endpoint...', {
        blobSize: audioBlob.size,
        filename: filename,
        type: audioBlob.type
      });
      
      const transcribeResponse = await supabase.functions.invoke('transcribe', {
        body: formData
      });

      if (process.env.NODE_ENV === 'development') console.log('📥 Transcribe response:', transcribeResponse);

      if (transcribeResponse.error) {
        console.error('❌ Transcribe error:', transcribeResponse.error);
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
      
      
      if (process.env.NODE_ENV === 'development') console.log('📝 Raw transcribed text (verbatim):', finalTranscript);
      
      if (!finalTranscript || finalTranscript.trim() === '') {
        if (process.env.NODE_ENV === 'development') console.warn('⚠️ Empty transcript received');
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
      console.log('Sending to feedback endpoint:', finalTranscript);
      const feedbackResponse = await supabase.functions.invoke('feedback', {
        body: { text: finalTranscript }
      });

      console.log('Feedback response:', feedbackResponse);

      if (feedbackResponse.error) {
        console.error('Feedback error:', feedbackResponse.error);
        throw new Error('Feedback analysis failed');
      }

      const { corrected } = feedbackResponse.data;

      // Use expectedRef for current question evaluation
      function evaluateSpoken(transcript: string) {
        const userRaw = transcript?.trim() || '';
        let target = evaluatorTargetRef.current;

        // If, for any reason, the ref is empty, compute on the fly from the live card
        if (!target) {
          const item = currentModuleData?.speakingPractice?.[speakingIndex];
          target = computeTargetFromItem(item);
        }

        const ok = isExactlyCorrect(userRaw, target); // uses the normalization that ignores diacritics and punctuation

        if (ok) {
          setCorrectAnswers(prev => prev + 1);
          setFeedback('🎉 Perfect! Moving to the next question...');
          setFeedbackType('success');
          earnXPForGrammarLesson(true);
          incrementTotalExercises();
          advanceQuestion();         // Use the instant, non-blocking advance
        } else {
          setFeedback(`❌ Not quite right. The correct answer is: "${target}"`);
          setFeedbackType('error');
          setTimeout(() => {
            setFeedback('');
            setIsProcessing(false);
          }, 3000);
        }
      }

      console.log('VALIDATION PHASE');
      console.log('Expected:', expectedRef.current);
      console.log('User said (RAW):', finalTranscript);
      console.log('Index:', speakingIndex);
      console.log('Module:', currentModuleData.title);

      evaluateSpoken(finalTranscript);
    } catch (error) {
      console.error('Error processing audio for current index:', error);
      // No generic error feedback - let the flow auto-retry
    }
    
    setLastResponseTime(Date.now());
  }, [speakingIndex, earnXPForGrammarLesson, incrementTotalExercises]);


  // Optional: Reset progress for current module
  function resetThisModuleProgress() {
    if (selectedLevel && selectedModule != null) {
      clearModuleProgress(selectedLevel, selectedModule.toString());
      setCurrentPhase('intro');
      setListeningIndex(0);
      setSpeakingIndex(0);
    }
  }

  // Single-source speaking start with internal guard
  async function startSpeakingFlow() {
    // block parallel runs here (not via disabled button)
    if (speakStatus !== 'idle' || currentPhase !== 'speaking' || viewState !== 'lesson') return;

    // User is interacting - clear any watchdog timers
    clearWatchdog();

    try {
      setSpeakStatus('recording');
      await unlockAudioOnce();          // iOS resume AudioContext
      const transcript = await recognizeOnce(); // from our robust ASR helper
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

        // Immediate advancement to next question
        advanceToNextQuestion();
      } else {
        setFeedback(`❌ Not quite right. The correct answer is: "${target}"`);
        setFeedbackType('error');
        setSpeakStatus('idle');
      }
    } catch {
      // silent failure; user can tap again
      setSpeakStatus('idle');
    }
  }

  const startRecording = async () => {
    console.log('🎯 Start recording clicked');
    console.log('MediaRecorder state:', mediaRecorder?.state);
    
    // If there's a microphone error, try to reinitialize
    if (microphoneError || !mediaRecorder) {
      console.log('🔄 Microphone error detected or no recorder, attempting to reinitialize...');
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
        if (process.env.NODE_ENV === 'development') console.log('🎙️ Starting MediaRecorder...');
        
        // Record minimum of 2 seconds, maximum of 10 seconds
        const startTime = Date.now();
        mediaRecorder.start(1000); // Collect data every 1 second
        
        // Store the start time for minimum duration check
        (mediaRecorder as any)._recordingStartTime = startTime;
        
        // Auto-stop after 10 seconds
        setTimeout(() => {
          if (mediaRecorder.state === 'recording') {
            console.log('⏰ Auto-stopping recording after 10 seconds');
            stopRecording();
          }
        }, 10000);
        
      } catch (error: any) {
        console.error('❌ Error starting recording:', error);
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
      console.warn('⚠️ MediaRecorder not ready. State:', mediaRecorder?.state);
      setFeedback('Microphone not ready. Trying to reconnect...');
      setFeedbackType('info');
      
      // Try to reinitialize
      await initializeRecorder(true);
    }
  };

  const stopRecording = () => {
    console.log('🛑 Stop recording called');
    console.log('MediaRecorder state:', mediaRecorder?.state);
    
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      // Check minimum recording duration (2 seconds)
      const startTime = (mediaRecorder as any)._recordingStartTime;
      const currentTime = Date.now();
      const recordingDuration = currentTime - startTime;
      
      if (recordingDuration < 2000) { // Less than 2 seconds
        console.warn('⚠️ Recording too short:', recordingDuration, 'ms');
        setFeedback('Please speak for at least 2 seconds. Keep recording...');
        setFeedbackType('info');
        return; // Don't stop recording yet
      }
      
      console.log('⏹️ Stopping MediaRecorder... Duration:', recordingDuration, 'ms');
      mediaRecorder.stop();
      setIsRecording(false);
    } else {
      console.warn('⚠️ MediaRecorder not recording. Current state:', mediaRecorder?.state);
      setIsRecording(false);
    }
  };

  const nextListeningExample = () => {
    if (listeningIndex < currentModuleData.listeningExamples.length - 1) {
      setListeningIndex(prev => prev + 1);
    } else {
      setCurrentPhase('speaking');
      cancelTTSSafe();
      narration.speak('Now let\'s practice speaking! Say each sentence clearly.');
    }
  };

  const repeatExample = () => {
    const currentExample = currentModuleData.listeningExamples[listeningIndex];
    cancelTTSSafe();
    narration.speak(currentExample);
  };

  const speakCurrentSentence = () => {
    const { prompt } = getCurrentPromptAndTarget();
    cancelTTSSafe();
    narration.speak(prompt);
  };

  // Render levels view
  if (!isHydrated) {
    console.log('🔍 [LessonsApp] Rendering: Not hydrated yet, showing loading...');
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
    console.log('🔍 [LessonsApp] Rendering: Levels view');
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
                  cancelTTSSafe();
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
    console.log('🔍 [LessonsApp] Rendering: Modules view for level:', selectedLevel);
    
    // Safety check: if no level selected, redirect to levels view
    if (!selectedLevel || !MODULES_BY_LEVEL[selectedLevel as keyof typeof MODULES_BY_LEVEL]) {
      console.warn('⚠️ [LessonsApp] Invalid selectedLevel, redirecting to levels view:', selectedLevel);
      setViewState('levels');
      setSelectedLevel('');
      return null; // Prevent rendering during state transition
    }
    
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
            {(() => {
              // Safety guard: get modules array or empty array if level doesn't exist
              const modules = MODULES_BY_LEVEL[selectedLevel as keyof typeof MODULES_BY_LEVEL] || [];
              
              return modules.length === 0 ? (
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
                // Null safety check for module
                if (!module || !module.id || !module.title) {
                  console.warn('⚠️ [LessonsApp] Invalid module data:', module);
                  return null;
                }
                
                const isUnlocked = isModuleUnlocked(module.id);
                const isCompleted = completedModules.includes(`module-${module.id}`);
              
              return (
                <Card 
                  key={module.id} 
                  className={`bg-white/10 border-white/20 cursor-pointer transition-all hover:bg-white/15 ${!isUnlocked ? 'opacity-50' : ''}`}
                  onClick={() => {
                    if (isUnlocked && ((module.id >= 1 && module.id <= 50) || (module.id >= 51 && module.id <= 100) || (module.id >= 101 && module.id <= 150))) { // All A1, A2, B1 modules are implemented
                      cancelTTSSafe();
                      
                      // Get the module data for validation (before setting state)
                      const getModuleDataForValidation = (moduleId: number) => {
                        // A1 Modules
                        if (moduleId === 1) return MODULE_1_DATA;
                        if (moduleId === 2) return MODULE_2_DATA;
                        if (moduleId === 3) return MODULE_3_DATA;
                        if (moduleId === 4) return MODULE_4_DATA;
                        if (moduleId === 5) return MODULE_5_DATA;
                        if (moduleId === 6) return MODULE_6_DATA;
                        if (moduleId === 7) return MODULE_7_DATA;
                        if (moduleId === 8) return MODULE_8_DATA;
                        if (moduleId === 9) return MODULE_9_DATA;
                        if (moduleId === 10) return MODULE_10_DATA;
                        if (moduleId === 11) return MODULE_11_DATA;
                        if (moduleId === 12) return MODULE_12_DATA;
                        if (moduleId === 13) return MODULE_13_DATA;
                        if (moduleId === 14) return MODULE_14_DATA;
                        if (moduleId === 15) return MODULE_15_DATA;
                        if (moduleId === 16) return MODULE_16_DATA;
                        if (moduleId === 17) return MODULE_17_DATA;
                        if (moduleId === 18) return MODULE_18_DATA;
                        if (moduleId === 19) return MODULE_19_DATA;
                        if (moduleId === 20) return MODULE_20_DATA;
                        if (moduleId === 21) return MODULE_21_DATA;
                        if (moduleId === 22) return MODULE_22_DATA;
                        if (moduleId === 23) return MODULE_23_DATA;
                        if (moduleId === 24) return MODULE_24_DATA;
                        if (moduleId === 25) return MODULE_25_DATA;
                        if (moduleId === 26) return MODULE_26_DATA;
                        if (moduleId === 27) return MODULE_27_DATA;
                        if (moduleId === 28) return MODULE_28_DATA;
                        if (moduleId === 29) return MODULE_29_DATA;
                        if (moduleId === 30) return MODULE_30_DATA;
                        if (moduleId === 31) return MODULE_31_DATA;
                        if (moduleId === 32) return MODULE_32_DATA;
                        if (moduleId === 33) return MODULE_33_DATA;
                        if (moduleId === 34) return MODULE_34_DATA;
                        if (moduleId === 35) return MODULE_35_DATA;
                        if (moduleId === 36) return MODULE_36_DATA;
                        if (moduleId === 37) return MODULE_37_DATA;
                        if (moduleId === 38) return MODULE_38_DATA;
                        if (moduleId === 39) return MODULE_39_DATA;
                        if (moduleId === 40) return MODULE_40_DATA;
                        if (moduleId === 41) return MODULE_41_DATA;
                        if (moduleId === 42) return MODULE_42_DATA;
                        if (moduleId === 43) return MODULE_43_DATA;
                        if (moduleId === 44) return MODULE_44_DATA;
                        if (moduleId === 45) return MODULE_45_DATA;
                        if (moduleId === 46) return MODULE_46_DATA;
                        if (moduleId === 47) return MODULE_47_DATA;
                        if (moduleId === 48) return MODULE_48_DATA;
                        if (moduleId === 49) return MODULE_49_DATA;
                        if (moduleId === 50) return MODULE_50_DATA;
                        
                        // A2 Modules
                        if (moduleId === 51) return MODULE_51_DATA;
                        if (moduleId === 52) return MODULE_52_DATA;
                        if (moduleId === 53) return MODULE_53_DATA;
                        if (moduleId === 54) return MODULE_54_DATA;
                        if (moduleId === 55) return MODULE_55_DATA;
                        if (moduleId === 56) return MODULE_56_DATA;
                        if (moduleId === 57) return MODULE_57_DATA;
                        if (moduleId === 58) return MODULE_58_DATA;
                        if (moduleId === 59) return MODULE_59_DATA;
                        if (moduleId === 60) return MODULE_60_DATA;
                        if (moduleId === 61) return MODULE_61_DATA;
                        if (moduleId === 62) return MODULE_62_DATA;
                        if (moduleId === 63) return MODULE_63_DATA;
                        if (moduleId === 64) return MODULE_64_DATA;
                        if (moduleId === 65) return MODULE_65_DATA;
                        if (moduleId === 66) return MODULE_66_DATA;
                        if (moduleId === 67) return MODULE_67_DATA;
                        if (moduleId === 68) return MODULE_68_DATA;
                        if (moduleId === 69) return MODULE_69_DATA;
                        if (moduleId === 70) return MODULE_70_DATA;
                        if (moduleId === 71) return MODULE_71_DATA;
                        if (moduleId === 72) return MODULE_72_DATA;
                        if (moduleId === 73) return MODULE_73_DATA;
                        if (moduleId === 74) return MODULE_74_DATA;
                        if (moduleId === 75) return MODULE_75_DATA;
                        if (moduleId === 76) return MODULE_76_DATA;
                        if (moduleId === 77) return MODULE_77_DATA;
                        if (moduleId === 78) return MODULE_78_DATA;
                        if (moduleId === 79) return MODULE_79_DATA;
                        if (moduleId === 80) return MODULE_80_DATA;
                        if (moduleId === 81) return MODULE_81_DATA;
                        if (moduleId === 82) return MODULE_82_DATA;
                        if (moduleId === 83) return MODULE_83_DATA;
                        if (moduleId === 84) return MODULE_84_DATA;
                        if (moduleId === 85) return MODULE_85_DATA;
                        if (moduleId === 86) return MODULE_86_DATA;
                        if (moduleId === 87) return MODULE_87_DATA;
                        if (moduleId === 88) return MODULE_88_DATA;
                        if (moduleId === 89) return MODULE_89_DATA;
                        if (moduleId === 90) return MODULE_90_DATA;
                        if (moduleId === 91) return MODULE_91_DATA;
                        if (moduleId === 92) return MODULE_92_DATA;
                        if (moduleId === 93) return MODULE_93_DATA;
                        if (moduleId === 94) return MODULE_94_DATA;
                        if (moduleId === 95) return MODULE_95_DATA;
                        if (moduleId === 96) return MODULE_96_DATA;
                        if (moduleId === 97) return MODULE_97_DATA;
                        if (moduleId === 98) return MODULE_98_DATA;
                        if (moduleId === 99) return MODULE_99_DATA;
                        if (moduleId === 100) return MODULE_100_DATA;
                        
                        // B1 Modules
                        if (moduleId === 101) return MODULE_101_DATA;
                        if (moduleId === 102) return MODULE_102_DATA;
                        if (moduleId === 103) return MODULE_103_DATA;
                        if (moduleId === 104) return MODULE_104_DATA;
                        if (moduleId === 105) return MODULE_105_DATA;
                        if (moduleId === 106) return MODULE_106_DATA;
                        if (moduleId === 107) return MODULE_107_DATA;
                        if (moduleId === 108) return MODULE_108_DATA;
                        if (moduleId === 109) return MODULE_109_DATA;
                        if (moduleId === 110) return MODULE_110_DATA;
                        if (moduleId === 111) return MODULE_111_DATA;
                        if (moduleId === 112) return MODULE_112_DATA;
                        if (moduleId === 113) return MODULE_113_DATA;
                        if (moduleId === 114) return MODULE_114_DATA;
                        if (moduleId === 115) return MODULE_115_DATA;
                        if (moduleId === 116) return MODULE_116_DATA;
                        if (moduleId === 117) return MODULE_117_DATA;
                        if (moduleId === 118) return MODULE_118_DATA;
                        if (moduleId === 119) return MODULE_119_DATA;
                        if (moduleId === 120) return MODULE_120_DATA;
                        if (moduleId === 121) return MODULE_121_DATA;
                        if (moduleId === 122) return MODULE_122_DATA;
                        if (moduleId === 123) return MODULE_123_DATA;
                        if (moduleId === 124) return MODULE_124_DATA;
                        if (moduleId === 125) return MODULE_125_DATA;
                        if (moduleId === 126) return MODULE_126_DATA;
                        if (moduleId === 127) return MODULE_127_DATA;
                        if (moduleId === 128) return MODULE_128_DATA;
                        if (moduleId === 129) return MODULE_129_DATA;
                        if (moduleId === 130) return MODULE_130_DATA;
                        if (moduleId === 131) return MODULE_131_DATA;
                        if (moduleId === 132) return MODULE_132_DATA;
                        if (moduleId === 133) return MODULE_133_DATA;
                        if (moduleId === 134) return MODULE_134_DATA;
                        if (moduleId === 135) return MODULE_135_DATA;
                        if (moduleId === 136) return MODULE_136_DATA;
                        if (moduleId === 137) return MODULE_137_DATA;
                        if (moduleId === 138) return MODULE_138_DATA;
                        if (moduleId === 139) return MODULE_139_DATA;
                        if (moduleId === 140) return MODULE_140_DATA;
                        if (moduleId === 141) return MODULE_141_DATA;
                        if (moduleId === 142) return MODULE_142_DATA;
                        if (moduleId === 143) return MODULE_143_DATA;
                        if (moduleId === 144) return MODULE_144_DATA;
                        if (moduleId === 145) return MODULE_145_DATA;
                        if (moduleId === 146) return MODULE_146_DATA;
                        if (moduleId === 147) return MODULE_147_DATA;
                        if (moduleId === 148) return MODULE_148_DATA;
                        if (moduleId === 149) return MODULE_149_DATA;
                        if (moduleId === 150) return MODULE_150_DATA;

                        // Fallback to Module 1 for unknown modules
                        return MODULE_1_DATA;
                      };
                      
                      // Validate module data before navigation
                      const moduleData = getModuleDataForValidation(module.id);
                      if (!validateModuleData(moduleData)) {
                        console.error(`Module ${module.id} failed validation. Navigation blocked.`);
                        return;
                      }
                      
                      setSelectedModule(module.id);
                      setViewState('lesson');
                      setCurrentPhase('intro');
                      setListeningIndex(0);
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
                                 console.log(`🗑️ Reset progress for Module ${module.id}`);
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
              );
            })()}
          </div>
        </div>
      </div>
    );
  }

  // Lesson completion view
  if (currentPhase === 'completed') {
    console.log('🔍 [LessonsApp] Rendering: Lesson completed view');
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
      <div className="relative z-10 p-4 max-w-sm mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-6 mb-6 mt-safe-area-inset-top">
          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={() => { narration.cancel(); setViewState('modules'); }}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="text-center">
              <h1 className="text-lg font-bold text-white">{currentModuleData.title}</h1>
              <p className="text-sm text-white/70">{currentModuleData.description}</p>
            </div>
            
            <Button
              onClick={toggleSound}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 rounded-full"
            >
              <Volume2 className={`h-5 w-5 ${!soundEnabled ? 'opacity-50' : ''}`} />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-white/80">
              <span>Progress</span>
              <span>{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <CanvasAvatar state={avatarState} size="lg" />
        </div>

        {/* Tip Card - Hidden on mobile */}
        {!isMobile && 'tip' in currentModuleData && currentModuleData.tip && (
          <Card className="mb-6 bg-white/10 border-white/20">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-500/20 rounded-full p-2 flex-shrink-0">
                  <Star className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1">Grammar Tip</h3>
                  <p className="text-white/80 text-sm">{currentModuleData.tip}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* INTRO ONLY */}
        {currentPhase === 'intro' && (
          <Card className="bg-white/10 border-white/20 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Tomas is Teaching 👨‍🏫
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="mb-6">
                  {!isMobile && (
                    <AnimatedAvatar 
                      size="lg" 
                      state={avatarState}
                      className="mx-auto mb-4"
                    />
                  )}
                </div>
                <div className="text-white/90 text-base">
                  <p className="mb-4">🎧 Listen carefully as Tomas reads through this lesson...</p>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                  <Button
                    onClick={skipToQuestions}
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-200"
                  >
                    <FastForward className="h-4 w-4 mr-2" />
                    Skip to Questions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* INTRO SECTION */}
        {currentPhase === 'intro' && (
          <ErrorBoundary fallback={
            <Card className="bg-red-500/10 border-red-400/20 mb-6">
              <CardContent className="p-4 text-center">
                <p className="text-red-400">Error loading introduction. Please try refreshing.</p>
              </CardContent>
            </Card>
          }>
            <div ref={introRef}>
              <Card className="bg-white/10 border-white/20 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  {currentModuleData.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-white/90 whitespace-pre-line text-sm leading-relaxed">
                  {currentModuleData.intro}
                </div>
              
              {(('table' in currentModuleData && currentModuleData.table) && (
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-3 text-center">
                    {selectedModule === 1 ? '📊 Verb To Be Tablosu:' : 
                     selectedModule === 2 ? '🧩 Verb To Be Negatif Tablosu:' : 
                     selectedModule === 3 ? '❓ Verb To Be Soru Tablosu:' :
                     selectedModule === 4 ? '💬 Verb To Be Short Answers Tablosu:' :
                     selectedModule === 5 ? '👥 Subject Pronouns Tablosu:' :
                     selectedModule === 6 ? '🏠 Possessive Adjectives Tablosu:' :
                     selectedModule === 8 ? '📍 There is / There are Tablosu:' :
                     selectedModule === 9 ? '🚫 There isn\'t / There aren\'t Tablosu:' :
                     selectedModule === 10 ? '❓ There is / There are Soru Tablosu:' :
                     selectedModule === 11 ? '📰 Articles Tablosu:' :
                     selectedModule === 19 ? '❓ Simple Present Yes/No Questions Tablosu:' :
                     '📊 Grammar Tablosu:'}
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-white/90 text-sm">
                      <thead>
                        <tr className="border-b border-white/20">
                          {selectedModule === 3 ? (
                            <>
                              <th className="text-left py-2 px-1">Verb To Be</th>
                              <th className="text-left py-2 px-1">Subject</th>
                              <th className="text-left py-2 px-1">Complement</th>
                              <th className="text-left py-2 px-1">Example</th>
                            </>
                          ) : selectedModule === 4 ? (
                            <>
                              <th className="text-left py-2 px-1">Subject Pronoun</th>
                              <th className="text-left py-2 px-1">Example</th>
                            </>
                          ) : selectedModule === 5 ? (
                            <>
                              <th className="text-left py-2 px-1">Subject Pronoun</th>
                              <th className="text-left py-2 px-1">Example</th>
                            </>
                          ) : selectedModule === 6 ? (
                            <>
                              <th className="text-left py-2 px-1">Subject Pronoun</th>
                              <th className="text-left py-2 px-1">Possessive Adjective</th>
                              <th className="text-left py-2 px-1">Example</th>
                            </>
                          ) : selectedModule === 8 || selectedModule === 9 || selectedModule === 10 ? (
                            <>
                              <th className="text-left py-2 px-1">Structure</th>
                              <th className="text-left py-2 px-1">Example</th>
                            </>
                           ) : selectedModule === 11 ? (
                             <>
                               <th className="text-left py-2 px-1">Article</th>
                               <th className="text-left py-2 px-1">Usage</th>
                               <th className="text-left py-2 px-1">Example</th>
                             </>
                           ) : selectedModule === 19 ? (
                             <>
                               <th className="text-left py-2 px-1">Structure</th>
                               <th className="text-left py-2 px-1">Example</th>
                             </>
                           ) : (
                            <>
                              <th className="text-left py-2 px-1">Subject</th>
                              <th className="text-left py-2 px-1">Verb To Be</th>
                              {selectedModule === 2 && <th className="text-left py-2 px-1">Not</th>}
                              <th className="text-left py-2 px-1">Complement</th>
                              <th className="text-left py-2 px-1">Example</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {'table' in currentModuleData && currentModuleData.table && Array.isArray(currentModuleData.table) && currentModuleData.table.map((row, index) => (
                          <tr key={index} className="border-b border-white/10">
                            {selectedModule === 3 ? (
                              <>
                                <td className="py-2 px-1 text-blue-300 font-medium">{(row as any).verb}</td>
                                <td className="py-2 px-1">{(row as any).subject}</td>
                                <td className="py-2 px-1">{(row as any).complement}</td>
                                <td className="py-2 px-1 italic">{(row as any).example}</td>
                              </>
                            ) : selectedModule === 4 ? (
                              <>
                                <td className="py-2 px-1 text-purple-300 font-medium">{(row as any).pronoun}</td>
                                <td className="py-2 px-1 italic">{(row as any).example}</td>
                              </>
                            ) : selectedModule === 5 ? (
                              <>
                                <td className="py-2 px-1 text-purple-300 font-medium">{(row as any).pronoun}</td>
                                <td className="py-2 px-1 italic">{(row as any).example}</td>
                              </>
                            ) : selectedModule === 6 ? (
                              <>
                                <td className="py-2 px-1 text-purple-300 font-medium">{(row as any).pronoun}</td>
                                <td className="py-2 px-1 text-orange-300 font-medium">{(row as any).possessive}</td>
                                <td className="py-2 px-1 italic">{(row as any).example}</td>
                              </>
                            ) : selectedModule === 8 || selectedModule === 9 || selectedModule === 10 ? (
                              <>
                                <td className="py-2 px-1 text-green-300 font-medium">{(row as any).structure}</td>
                                <td className="py-2 px-1 italic">{(row as any).example}</td>
                              </>
                             ) : selectedModule === 11 ? (
                               <>
                                 <td className="py-2 px-1 text-blue-300 font-medium">{(row as any).article}</td>
                                 <td className="py-2 px-1">{(row as any).usage}</td>
                                 <td className="py-2 px-1 italic">{(row as any).example}</td>
                               </>
                             ) : selectedModule === 19 ? (
                               <>
                                 <td className="py-2 px-1 text-green-300 font-medium">{(row as any).structure}</td>
                                 <td className="py-2 px-1 italic">{(row as any).example}</td>
                               </>
                             ) : (
                              <>
                                <td className="py-2 px-1 font-medium">{(row as any).subject}</td>
                                <td className="py-2 px-1 text-blue-300">{(row as any).verb}</td>
                                {selectedModule === 2 && 'not' in row && <td className="py-2 px-1 text-red-300">{(row as any).not}</td>}
                                <td className="py-2 px-1">{(row as any).complement}</td>
                                <td className="py-2 px-1 italic">{(row as any).example}</td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )) as React.ReactNode}

              {/* Manual read button disabled - intro is now silent
              {!hasBeenRead[lessonKey] && (
                <div className="text-center pt-4">
                  <Button
                    onClick={startTeacherReading}
                    className="bg-white/20 text-white hover:bg-white/30"
                    disabled={isSpeaking}
                  >
                    {isSpeaking ? "Tomas is Reading..." : "▶️ Let Tomas Read This Lesson"}
                  </Button>
                </div>
              )}
              */}
              {/* Replay button disabled - intro is now silent
              {hasBeenRead[lessonKey] && (
                <div className="text-center pt-4">
                  <Button
                    onClick={startTeacherReading}
                    variant="outline"
                    size="sm"
                    className="bg-white/10 text-white hover:bg-white/20"
                    disabled={isSpeaking}
                  >
                    🔁 Replay Tomas
                  </Button>
                </div>
              )}
              */}
            </CardContent>
          </Card>
          </div>
          </ErrorBoundary>
        )}

        {/* Listening Phase */}
        {currentPhase === 'listening' && (
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Volume2 className="h-5 w-5 mr-2" />
                Listening Practice
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="bg-white/5 rounded-xl p-4 mb-4">
                  <p className="text-white text-lg font-medium">
                    "{currentModuleData.listeningExamples[listeningIndex]}"
                  </p>
                </div>
                
                <div className="flex justify-center space-x-3">
                  <Button
                    onClick={repeatExample}
                    variant="outline"
                    size="sm"
                    className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                    disabled={isSpeaking}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Repeat
                  </Button>
                  
                  <Button
                    onClick={nextListeningExample}
                    className="bg-white/20 text-white hover:bg-white/30"
                    disabled={isSpeaking}
                  >
                    {listeningIndex < currentModuleData.listeningExamples.length - 1 ? 'Next' : 'Start Speaking'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Speaking Phase */}
        {currentPhase === 'speaking' && (
          <ErrorBoundary fallback={
            <Card className="bg-red-500/10 border-red-400/20">
              <CardContent className="p-4 text-center">
                <p className="text-red-400">Error loading speaking practice. Please try refreshing.</p>
              </CardContent>
            </Card>
          }>
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
              {(() => {
                // Define mcq and currentPracticeItem at CardContent scope so they can be accessed throughout
                const currentPracticeItem = currentModuleData?.speakingPractice?.[speakingIndex];

                // Build MCQ with enhanced error handling (buildClozeAndChoices now ALWAYS returns valid MCQ)
                let mcq = null;
                try {
                  if (currentPracticeItem && typeof currentPracticeItem === 'object') {
                    mcq = buildClozeAndChoices(
                      currentPracticeItem?.question || '',
                      currentPracticeItem?.answer || ''
                    );
                  }
                } catch (error) {
                  if (process.env.NODE_ENV === 'development') {
                    console.error(`[MCQ] Unexpected error building MCQ for module ${selectedModule}, question ${speakingIndex}:`, error);
                  }
                  // Even on error, try to continue - mcq.ts should handle this gracefully
                  mcq = null;
                }
                
                return (
                  <>
                    <div className="text-center">
                      <div className="bg-white/5 rounded-xl p-4 mb-4">
                        {(() => {
                          if (!currentPracticeItem) {
                            return (
                              <p className="text-white/70 text-sm">Preparing next question...</p>
                            );
                          }
                          if (typeof currentPracticeItem === 'string') {
                            return (
                              <p className="text-white text-lg font-medium mb-2">
                                "{currentPracticeItem}"
                              </p>
                            );
                          } else {
                            return (
                              <>
                                <p className="text-white/70 text-sm mb-2">Soru:</p>
                                <h3 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                                  {currentPracticeItem?.question || "No question available"}
                                </h3>
                                
                                {(() => {
                                  return (
                                      <>
                                        {/* STEP 1 — Multiple Choice */}
                                        {mcq && speakStep === 'mcq' && (
                                          <MultipleChoiceCard
                                            cloze={mcq.cloze}
                                            options={mcq.options}
                                            correct={mcq.correct}
                                            questionIndex={speakingIndex}
                                            onCorrect={transitionToSpeaking}
                                          />
                                        )}
                                        
                                        {/* STEP 2 — Speaking */}
                                        {(!mcq || speakStep === 'speak') && (
                                          <>
                                            <p className="text-base md:text-lg text-white/80 mb-2">Cevap (Answer):</p>
                                            <p className="text-xl md:text-2xl mb-2">
                                              Say: "{currentPracticeItem?.answer || "No answer available"}"
                                            </p>
                                          </>
                                        )}
                                      </>
                                  );
                                })()}
                              </>
                            );
                          }
                        })()}
                        <Button
                          onClick={speakCurrentSentence}
                          variant="ghost"
                          size="sm"
                          className="text-white/70 hover:text-white hover:bg-white/10"
                          disabled={isSpeaking}
                        >
                          <Volume2 className="h-4 w-4 mr-1" />
                          Listen
                        </Button>
                      </div>
                    </div>
                {/* STEP 2 — Speaking: Gate mic behind MCQ */}
                {(!mcq || speakStep === 'speak') && (
                  <>

                {/* Recording Button */}
                <div className="mb-4">
                  <Button
                    id="micButton"
                    key={`mic-${speakingIndex}`}
                    onClick={() => {
                      const canSpeak = viewState === 'lesson' && currentPhase === 'speaking';
                      if (!canSpeak) return;
                      // single-source speaking entry; safe-guard inside
                      startSpeakingFlow();
                    }}
                    // DO NOT disable the button; we guard internally
                    disabled={false}
                    aria-disabled={false}
                    style={{
                      pointerEvents: 'auto',
                      zIndex: 5,                  // sit above any card overlays
                      touchAction: 'manipulation' // iOS tap reliability
                    }}
                    size="lg"
                    className={`mic-button rounded-full w-20 h-20 ${
                      speakStatus === 'recording' 
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                        : 'bg-white/20 hover:bg-white/30'
                    }`}
                  >
                    {speakStatus === 'recording' ? (
                      <MicOff className="h-8 w-8" />
                    ) : (
                      <Mic className="h-8 w-8" />
                    )}
                  </Button>
                </div>
                  </>
                )}

                <div style={{ pointerEvents: 'none' }}>
                  <p className="text-white/70 text-sm mb-4">
                    {speakStatus === 'recording' ? 'Listening...' : 'Tap to speak the sentence'}
                  </p>
                </div>

                {/* Feedback */}
                {feedback && (
                  <div className={`p-3 rounded-lg ${
                    feedbackType === 'success' ? 'bg-green-500/20 text-green-400' :
                    feedbackType === 'error' ? 'bg-red-500/20 text-red-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    <div className="flex items-center justify-center space-x-2">
                      {feedbackType === 'success' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : feedbackType === 'error' ? (
                        <AlertCircle className="h-4 w-4" />
                      ) : null}
                      <span className="text-sm">{feedback}</span>
                    </div>
                  </div>
                )}
              </>
            );
          })()}
            </CardContent>
          </Card>
          </ErrorBoundary>
        )}
      </div>

      {/* Debug Overlay - Only in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 z-50 bg-black/80 text-white text-xs p-3 rounded-lg font-mono max-w-xs">
          <div className="font-semibold mb-2">🔍 Debug Info</div>
          <div>View: {viewState}</div>
          <div>Level: {selectedLevel || 'none'}</div>
          <div>Module: {selectedModule || 'none'}</div>
          <div>Phase: {currentPhase}</div>
          <div>Hydrated: {isHydrated ? '✅' : '❌'}</div>
          <div>Speaking: {speakingIndex}/{currentModuleData?.speakingPractice?.length || 0}</div>
          <div>MCQ Step: {speakStep}</div>
        </div>
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