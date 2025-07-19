import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Play, Pause, Mic, MicOff, Volume2, RefreshCw, Star, CheckCircle, AlertCircle, Lock, BookOpen, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useGamification } from '@/hooks/useGamification';
import { useBadgeSystem } from '@/hooks/useBadgeSystem';
import CanvasAvatar from './CanvasAvatar';
import { useAvatarState } from '@/hooks/useAvatarState';
import { supabase } from '@/integrations/supabase/client';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

interface LessonsAppProps {
  onBack: () => void;
}

type ViewState = 'levels' | 'modules' | 'lesson';
type LessonPhase = 'intro' | 'listening' | 'speaking' | 'completed';

// Levels data
const LEVELS = [
  { id: 'A1', name: 'A1 - Beginner', description: 'Start your English journey', moduleCount: 50, color: 'bg-blue-500' },
  { id: 'A2', name: 'A2 - Elementary', description: 'Build basic skills', moduleCount: 50, color: 'bg-green-500', locked: true },
  { id: 'B1', name: 'B1 - Intermediate', description: 'Expand your knowledge', moduleCount: 50, color: 'bg-orange-500', locked: true },
  { id: 'B2', name: 'B2 - Upper Intermediate', description: 'Advanced concepts', moduleCount: 50, color: 'bg-purple-500', locked: true },
];

// A1 modules data
const A1_MODULES = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: i === 0 ? 'Verb To Be - Positive Sentences' : 
         i === 1 ? 'Negative Sentences' : 
         i === 2 ? 'Question Sentences' :
         i === 3 ? 'Short Answers' :
         i === 4 ? 'Subject Pronouns' :
         i === 5 ? 'Possessive Adjectives' :
         `Module ${i + 1}`,
  description: i === 0 ? 'Learn to use am, is, and are' : 
               i === 1 ? 'Learn to use "am", "is", and "are" with "not"' :
               i === 2 ? 'Learn to form questions with "am", "is", and "are"' :
               i === 3 ? 'Practice short Yes/No answers with "am", "is", and "are"' :
               i === 4 ? 'Learn and practice Subject Pronouns (I, You, He, She, It, We, They)' :
               i === 5 ? 'Practice possessive adjectives (my, your, his, her, its, our, their)' :
               'Coming soon',
  completed: false,
  locked: i > 0, // Only Module 1 is unlocked initially
}));

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
    { question: "Are you a doctor?", answer: "No, I am not a doctor." },
    { question: "Are you a student?", answer: "No, I am not a student." },
    { question: "Are you happy?", answer: "No, I am not happy." },
    { question: "Are you sad?", answer: "No, I am not sad." },
    { question: "Is he a teacher?", answer: "No, he is not a teacher." },
    { question: "Is he a doctor?", answer: "No, he is not a doctor." },
    { question: "Is he a student?", answer: "No, he is not a student." },
    { question: "Is he happy?", answer: "No, he is not happy." },
    { question: "Is he sad?", answer: "No, he is not sad." },
    { question: "Is she a teacher?", answer: "No, she is not a teacher." },
    { question: "Is she a doctor?", answer: "No, she is not a doctor." },
    { question: "Is she a student?", answer: "No, she is not a student." },
    { question: "Is she happy?", answer: "No, she is not happy." },
    { question: "Is she sad?", answer: "No, she is not sad." },
    { question: "Is it a dog?", answer: "No, it is not a dog." },
    { question: "Is it a cat?", answer: "No, it is not a cat." },
    { question: "Is it big?", answer: "No, it is not big." },
    { question: "Is it small?", answer: "No, it is not small." },
    { question: "Is it red?", answer: "No, it is not red." },
    { question: "Are we teachers?", answer: "No, we are not teachers." },
    { question: "Are we doctors?", answer: "No, we are not doctors." },
    { question: "Are we students?", answer: "No, we are not students." },
    { question: "Are we happy?", answer: "No, we are not happy." },
    { question: "Are we sad?", answer: "No, we are not sad." },
    { question: "Are you a teacher?", answer: "No, you are not a teacher." },
    { question: "Are you a doctor?", answer: "No, you are not a doctor." },
    { question: "Are you a student?", answer: "No, you are not a student." },
    { question: "Are you happy?", answer: "No, you are not happy." },
    { question: "Are you sad?", answer: "No, you are not sad." },
    { question: "Are they teachers?", answer: "No, they are not teachers." },
    { question: "Are they doctors?", answer: "No, they are not doctors." },
    { question: "Are they students?", answer: "No, they are not students." },
    { question: "Are they happy?", answer: "No, they are not happy." },
    { question: "Are they sad?", answer: "No, they are not sad." },
    { question: "Are they engineers?", answer: "No, they are not engineers." },
    { question: "Are they nurses?", answer: "No, they are not nurses." },
    { question: "Are they friends?", answer: "No, they are not friends." },
    { question: "Are they busy?", answer: "No, they are not busy." },
    { question: "Are they ready?", answer: "No, they are not ready." }
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

// Module 4 Data: Short Answers
const MODULE_4_DATA = {
  title: "Modül 4 - Verb To Be – Short Answers",
  description: "Bu modülde İngilizcede 'am, is, are' kullanarak kısa cevaplar vermeyi öğreneceğiz.",
  intro: `Bu modülde İngilizcede 'am, is, are' kullanarak kısa cevaplar vermeyi öğreneceğiz.

Konu Anlatımı:
Yes + subject + to be / No + subject + to be + not

Örnek Cümleler:
Are you a teacher? → Yes, I am. / No, I'm not.
Is he at home? → Yes, he is. / No, he isn't.
Are they students? → Yes, they are. / No, they aren't.`,
  tip: "Short answers use: Yes/No + pronoun + am/is/are (or am not/isn't/aren't). Examples: 'Yes, I am.' 'No, he isn't.' 'Yes, we are.'",
  
  table: [
    { question: "Are you a teacher?", positive: "Yes, I am.", negative: "No, I'm not." },
    { question: "Is she happy?", positive: "Yes, she is.", negative: "No, she isn't." },
    { question: "Are they here?", positive: "Yes, they are.", negative: "No, they aren't." },
    { question: "Am I late?", positive: "Yes, you are.", negative: "No, you aren't." },
    { question: "Is it cold?", positive: "Yes, it is.", negative: "No, it isn't." },
    { question: "Are we ready?", positive: "Yes, we are.", negative: "No, we aren't." }
  ],
  
  listeningExamples: [
    "Yes, I am.",
    "No, she isn't.",
    "Yes, they are."
  ],
  
  speakingPractice: [
    { question: "Are you a student?", answer: "Yes, I am." },
    { question: "Are you a student?", answer: "No, I am not." },
    { question: "Are you a teacher?", answer: "Yes, I am." },
    { question: "Are you a teacher?", answer: "No, I am not." },
    { question: "Are you happy?", answer: "Yes, I am." },
    { question: "Are you happy?", answer: "No, I am not." },
    { question: "Is she a nurse?", answer: "Yes, she is." },
    { question: "Is she a nurse?", answer: "No, she isn't." },
    { question: "Is she tired?", answer: "Yes, she is." },
    { question: "Is she tired?", answer: "No, she isn't." },
    { question: "Is he a doctor?", answer: "Yes, he is." },
    { question: "Is he a doctor?", answer: "No, he isn't." },
    { question: "Is he busy?", answer: "Yes, he is." },
    { question: "Is he busy?", answer: "No, he isn't." },
    { question: "Are you ready?", answer: "Yes, I am." },
    { question: "Are you ready?", answer: "No, I am not." },
    { question: "Are you late?", answer: "Yes, I am." },
    { question: "Are you late?", answer: "No, I am not." },
    { question: "Is it cold?", answer: "Yes, it is." },
    { question: "Is it cold?", answer: "No, it isn't." },
    { question: "Is it big?", answer: "Yes, it is." },
    { question: "Is it big?", answer: "No, it isn't." },
    { question: "Are we friends?", answer: "Yes, we are." },
    { question: "Are we friends?", answer: "No, we aren't." },
    { question: "Are we students?", answer: "Yes, we are." },
    { question: "Are we students?", answer: "No, we aren't." },
    { question: "Are they engineers?", answer: "Yes, they are." },
    { question: "Are they engineers?", answer: "No, they aren't." },
    { question: "Are they married?", answer: "Yes, they are." },
    { question: "Are they married?", answer: "No, they aren't." },
    { question: "Am I correct?", answer: "Yes, you are." },
    { question: "Am I correct?", answer: "No, you aren't." },
    { question: "Am I early?", answer: "Yes, you are." },
    { question: "Am I early?", answer: "No, you aren't." },
    { question: "Is she beautiful?", answer: "Yes, she is." },
    { question: "Is she beautiful?", answer: "No, she isn't." },
    { question: "Is he strong?", answer: "Yes, he is." },
    { question: "Is he strong?", answer: "No, he isn't." },
    { question: "Are you excited?", answer: "Yes, I am." },
    { question: "Are you excited?", answer: "No, I am not." }
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
  title: "Modül 6 - Possessive Adjectives",
  description: "Bu modülde İngilizcede Possessive Adjectives (iyelik sıfatları) konusunu öğreneceğiz.",
  intro: `Bu modülde İngilizcede Possessive Adjectives (iyelik sıfatları) konusunu öğreneceğiz.

Konu Anlatımı:
Possessive Adjectives bir ismin önüne gelerek onun kime ait olduğunu gösterir.
my, your, his, her, its, our, their

Örnek Cümleler:
This is my book.
That is her car.
These are their friends.`,
  tip: "Possessive Adjectives show who something belongs to. Use: my (for I), your (for you), his (for he), her (for she), its (for it), our (for we), their (for they).",
  
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
    { question: "Whose pen is this?", answer: "Yes, it is my pen." },
    { question: "Whose car is that?", answer: "His car is in the garage." },
    { question: "Whose house is that?", answer: "That is their house." },
    { question: "Whose phone is this?", answer: "Yes, it is her phone." },
    { question: "Whose bag is this?", answer: "This is my bag." },
    { question: "Whose book is on the table?", answer: "Your book is on the table." },
    { question: "Whose sister is a doctor?", answer: "Her sister is a doctor." },
    { question: "What color is it?", answer: "Its color is red." },
    { question: "Who is your teacher?", answer: "Our teacher is nice." },
    { question: "Whose dog is big?", answer: "Their dog is big." },
    { question: "What is your name?", answer: "My name is Tom." },
    { question: "What color is your car?", answer: "Your car is blue." },
    { question: "Where is his house?", answer: "His house is small." },
    { question: "How is her dress?", answer: "Her dress is beautiful." },
    { question: "How long is its tail?", answer: "Its tail is long." },
    { question: "How is your classroom?", answer: "Our classroom is clean." },
    { question: "How are their children?", answer: "Their children are happy." },
    { question: "Is your phone new?", answer: "My phone is new." },
    { question: "Is your job important?", answer: "Your job is important." },
    { question: "How is his family?", answer: "His family is large." },
    { question: "What color are her eyes?", answer: "Her eyes are green." },
    { question: "What color are its wings?", answer: "Its wings are white." },
    { question: "How is your garden?", answer: "Our garden is beautiful." },
    { question: "How was their vacation?", answer: "Their vacation was fun." },
    { question: "How is your coffee?", answer: "My coffee is hot." },
    { question: "How is your idea?", answer: "Your idea is great." },
    { question: "How is his voice?", answer: "His voice is deep." },
    { question: "How is her smile?", answer: "Her smile is lovely." },
    { question: "How is its sound?", answer: "Its sound is loud." },
    { question: "When is your meeting?", answer: "Our meeting is tomorrow." },
    { question: "Who won the game?", answer: "Their team won the game." },
    { question: "When is your birthday?", answer: "My birthday is next week." },
    { question: "Is your answer correct?", answer: "Your answer is correct." },
    { question: "How is his story?", answer: "His story is interesting." },
    { question: "How is her cooking?", answer: "Her cooking is delicious." },
    { question: "How is its price?", answer: "Its price is high." },
    { question: "What happened to your flight?", answer: "Our flight is delayed." },
    { question: "How is their wedding?", answer: "Their wedding is beautiful." },
    { question: "What happened to your dream?", answer: "My dream came true." }
  ]
};

export default function LessonsApp({ onBack }: LessonsAppProps) {
  const [width, height] = useWindowSize();
  const [viewState, setViewState] = useState<ViewState>('levels');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedModule, setSelectedModule] = useState<number>(0);
  
  // Lesson state
  const [currentPhase, setCurrentPhase] = useState<LessonPhase>('intro');
  const [listeningIndex, setListeningIndex] = useState(0);
  const [speakingIndex, setSpeakingIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | 'info'>('info');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResponseTime, setLastResponseTime] = useState(0);
  
  const { speak, isSpeaking, soundEnabled, toggleSound } = useTextToSpeech();
  const { earnXPForGrammarLesson, addXP } = useGamification();
  const { incrementGrammarLessons, incrementTotalExercises } = useBadgeSystem();
  
  const { avatarState, triggerState } = useAvatarState({
    isRecording,
    isSpeaking,
    isProcessing,
    lastMessageTime: lastResponseTime
  });

  // Get completed modules from localStorage
  const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');

  // Check if module is unlocked
  const isModuleUnlocked = (moduleId: number) => {
    if (moduleId === 1) return true; // Module 1 is always unlocked
    return completedModules.includes(`module-${moduleId - 1}`);
  };
  
  // Get current module data
  const getCurrentModuleData = () => {
    if (selectedModule === 1) return MODULE_1_DATA;
    if (selectedModule === 2) return MODULE_2_DATA;
    if (selectedModule === 3) return MODULE_3_DATA;
    if (selectedModule === 4) return MODULE_4_DATA;
    if (selectedModule === 5) return MODULE_5_DATA;
    if (selectedModule === 6) return MODULE_6_DATA;
    return MODULE_1_DATA; // fallback
  };

  // Calculate progress
  const currentModuleData = getCurrentModuleData();
  const totalQuestions = currentModuleData.speakingPractice.length;
  const overallProgress = ((speakingIndex + (correctAnswers > 0 ? 1 : 0)) / totalQuestions) * 100;

  // Audio recording setup
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [microphoneError, setMicrophoneError] = useState<string | null>(null);
  const [retryAttempts, setRetryAttempts] = useState(0);

  const initializeRecorder = useCallback(async (isRetry = false) => {
    try {
      setMicrophoneError(null);
      
      if (isRetry) {
        console.log('🔄 Retrying microphone initialization...');
      } else {
        console.log('🎤 Requesting microphone access...');
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
      
      console.log('✅ Microphone access granted!', {
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
        console.log('📱 Using MIME type:', mimeType);
      } else {
        console.warn('⚠️ No supported MIME types found, using default');
      }
      
      const recorder = new MediaRecorder(stream, { mimeType });
      
      let currentAudioChunks: Blob[] = [];
      
      recorder.ondataavailable = (event) => {
        console.log('📊 Audio chunk received:', event.data.size, 'bytes');
        if (event.data.size > 0) {
          currentAudioChunks.push(event.data);
        }
      };
      
      recorder.onstart = () => {
        console.log('🎙️ Recording started successfully');
        currentAudioChunks = [];
        setRetryAttempts(0); // Reset retry count on successful start
      };
      
      recorder.onstop = async () => {
        console.log('⏹️ Recording stopped. Chunks:', currentAudioChunks.length);
        
        if (currentAudioChunks.length > 0) {
          const totalSize = currentAudioChunks.reduce((sum, chunk) => sum + chunk.size, 0);
          console.log('📦 Total audio size:', totalSize, 'bytes');
          
          if (totalSize > 1000) { // Minimum 1KB for meaningful audio
            const audioBlob = new Blob(currentAudioChunks, { type: mimeType });
            console.log('🎵 Final blob created:', {
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
            console.warn('⚠️ Audio recording too small:', totalSize, 'bytes');
            setFeedback('Recording too short. Please speak for at least 2 seconds.');
            setFeedbackType('error');
            setTimeout(() => {
              setFeedback('');
              setIsProcessing(false);
            }, 3000);
          }
          currentAudioChunks = [];
        } else {
          console.warn('⚠️ No audio chunks recorded');
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
        const errorMsg = event.error?.message || 'Unknown recording error';
        setFeedback(`Recording error: ${errorMsg}. Please try again.`);
        setFeedbackType('error');
        setIsRecording(false);
        setIsProcessing(false);
      };
      
      setMediaRecorder(recorder);
      console.log('🎤 MediaRecorder initialized successfully');
      
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

  const processAudioRecording = useCallback(async (audioBlob: Blob) => {
    // 🔒 CRITICAL: Prevent concurrent processing and lock current state
    if (isProcessing) {
      console.log('⚠️ Audio processing already in progress, ignoring duplicate request');
      return;
    }

    // CRITICAL: Capture the current speaking index and expected sentence at the START
    // This creates an immutable snapshot that cannot be changed during async operations
    const capturedSpeakingIndex = speakingIndex;
    const currentPracticeItem = currentModuleData.speakingPractice[capturedSpeakingIndex];
    const capturedExpectedSentence = typeof currentPracticeItem === 'string' ? currentPracticeItem : currentPracticeItem.answer;
    
    // Validate captured data before proceeding
    if (!capturedExpectedSentence) {
      console.error('❌ No expected sentence found for index:', capturedSpeakingIndex);
      return;
    }
    
    setIsProcessing(true);
    setAttempts(prev => prev + 1);
    
    // Clear any previous feedback to prevent confusion
    setFeedback('');
    setFeedbackType('info');
    
    try {
      console.log('🎵 Processing audio recording...');
      console.log('📊 Blob details:', {
        size: audioBlob.size,
        type: audioBlob.type,
        isEmpty: audioBlob.size === 0
      });
      console.log('🔒 LOCKED speaking index:', capturedSpeakingIndex);
      console.log('🔒 LOCKED expected sentence:', capturedExpectedSentence);
      console.log('🔒 Current module:', currentModuleData.title);
      
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
        console.warn('⚠️ Audio blob is very small:', audioBlob.size, 'bytes');
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
      
      console.log('📤 Sending audio to transcribe endpoint...', {
        blobSize: audioBlob.size,
        filename: filename,
        type: audioBlob.type
      });
      
      const transcribeResponse = await supabase.functions.invoke('transcribe', {
        body: formData
      });

      console.log('📥 Transcribe response:', transcribeResponse);

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
      
      console.log('📝 Transcribed text:', finalTranscript);
      
      if (!finalTranscript || finalTranscript.trim() === '') {
        console.warn('⚠️ Empty transcript received');
        setFeedback('I couldn\'t understand what you said. Please speak clearly and try again.');
        setFeedbackType('error');
        setTimeout(() => {
          setFeedback('');
          setIsProcessing(false);
        }, 3000);
        return;
      }

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
      
      // 🔒 CRITICAL: Use LOCKED values - these cannot change during processing
      const expectedSentence = capturedExpectedSentence.toLowerCase();
      const userSentence = finalTranscript.toLowerCase();
      
      console.log('🔒 VALIDATION PHASE');
      console.log('🔒 Expected (LOCKED):', expectedSentence);
      console.log('🔒 User said:', userSentence);
      console.log('🔒 Index (LOCKED):', capturedSpeakingIndex);
      console.log('🔒 Module (LOCKED):', currentModuleData.title);
      console.log('AI feedback:', corrected);
      
      // Double-check that we're still processing the correct question
      const currentValidationItem = currentModuleData.speakingPractice[capturedSpeakingIndex];
      const currentValidationSentence = typeof currentValidationItem === 'string' ? currentValidationItem : currentValidationItem.answer;
      if (capturedExpectedSentence !== currentValidationSentence) {
        console.error('🚨 CRITICAL: Expected sentence mismatch detected! Aborting to prevent confusion.');
        setFeedback('System error. Please try again.');
        setFeedbackType('error');
        setIsProcessing(false);
        return;
      }
      
      // Check if the transcript contains the key parts of the expected sentence
      const expectedWords = expectedSentence.replace(/[.,!?]/g, '').split(' ');
      const userWords = userSentence.replace(/[.,!?]/g, '').split(' ');
      
      // Must contain at least 70% of the expected words
      const matchingWords = expectedWords.filter(word => 
        userWords.some(userWord => userWord.includes(word) || word.includes(userWord))
      );
      const isCorrect = matchingWords.length >= expectedWords.length * 0.7;
      
      console.log('Matching words:', matchingWords.length, 'of', expectedWords.length);
      console.log('Is correct:', isCorrect);
      
      if (isCorrect) {
        setCorrectAnswers(prev => prev + 1);
        setFeedback('Great job! Your sentence is correct.');
        setFeedbackType('success');
        
        // Award XP for correct answer
        await earnXPForGrammarLesson(true);
        await incrementTotalExercises();
        
        // Auto-advance after 1.5 seconds for A1 level
        setTimeout(() => {
          // 🔒 Final verification before advancing using LOCKED index
          if (capturedSpeakingIndex < totalQuestions - 1) {
            setSpeakingIndex(prev => {
              // Extra safety check
              if (prev === capturedSpeakingIndex) {
                console.log('🔒 ✅ Safe advance from:', capturedSpeakingIndex, 'to:', prev + 1);
                return prev + 1;
              } else {
                console.log('🔒 ⚠️ State changed during processing. Current:', prev, 'Expected:', capturedSpeakingIndex);
                return prev; // Don't advance if state changed
              }
            });
            setFeedback('');
          } else {
            completeLesson();
          }
          setIsProcessing(false);
        }, 1500);
      } else {
        // 🔒 Show corrective feedback using LOCKED expected sentence
        console.log('🔒 Showing correction for LOCKED sentence:', capturedExpectedSentence);
        setFeedback(`Try saying: "${capturedExpectedSentence}"`);
        setFeedbackType('error');
        
        setTimeout(() => {
          setFeedback('');
          setIsProcessing(false);
        }, 3000);
      }
    } catch (error) {
      console.error('🔒 Error processing audio for LOCKED index:', capturedSpeakingIndex, error);
      setFeedback('Sorry, there was an error processing your audio. Please try again.');
      setFeedbackType('error');
      
      setTimeout(() => {
        setFeedback('');
        setIsProcessing(false);
      }, 3000);
    }
    
    setLastResponseTime(Date.now());
  }, [speakingIndex, earnXPForGrammarLesson, incrementTotalExercises]);

  const completeLesson = async () => {
    setCurrentPhase('completed');
    setShowConfetti(true);
    
    // Award bonus XP for completion
    await addXP(100, 'grammar');
    await incrementGrammarLessons();
    
    // Save progress
    const newCompletedModules = [...completedModules];
    const moduleKey = `module-${selectedModule}`;
    if (!newCompletedModules.includes(moduleKey)) {
      newCompletedModules.push(moduleKey);
      localStorage.setItem('completedModules', JSON.stringify(newCompletedModules));
    }
    
    speak(`Congratulations! You have completed Module ${selectedModule}. Well done!`);
    
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

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
        console.log('🎙️ Starting MediaRecorder...');
        
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
      speak('Now let\'s practice speaking! Say each sentence clearly.');
    }
  };

  const repeatExample = () => {
    const currentExample = currentModuleData.listeningExamples[listeningIndex];
    speak(currentExample);
  };

  const speakCurrentSentence = () => {
    const currentPracticeItem = currentModuleData.speakingPractice[speakingIndex];
    const currentSentence = typeof currentPracticeItem === 'string' ? currentPracticeItem : currentPracticeItem.answer;
    speak(currentSentence);
  };

  // Render levels view
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
                className={`bg-white/10 border-white/20 cursor-pointer transition-all hover:bg-white/15 ${level.locked ? 'opacity-50' : ''}`}
                onClick={() => {
                  if (!level.locked) {
                    setSelectedLevel(level.id);
                    setViewState('modules');
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full ${level.color} flex items-center justify-center flex-shrink-0`}>
                      {level.locked ? (
                        <Lock className="h-6 w-6 text-white" />
                      ) : (
                        <BookOpen className="h-6 w-6 text-white" />
                      )}
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
            {A1_MODULES.map((module) => {
              const isUnlocked = isModuleUnlocked(module.id);
              const isCompleted = completedModules.includes(`module-${module.id}`);
              
              return (
                <Card 
                  key={module.id} 
                  className={`bg-white/10 border-white/20 cursor-pointer transition-all hover:bg-white/15 ${!isUnlocked ? 'opacity-50' : ''}`}
                  onClick={() => {
                    if (isUnlocked && (module.id === 1 || module.id === 2 || module.id === 3 || module.id === 4 || module.id === 5 || module.id === 6)) { // Modules 1, 2, 3, 4, 5 & 6 are implemented
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
                        {isCompleted && (
                          <Badge variant="outline" className="text-green-400 border-green-400 mt-1">
                            Completed
                          </Badge>
                        )}
                      </div>
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
              onClick={() => setViewState('modules')}
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
              onClick={() => setViewState('modules')}
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

        {/* Tip Card */}
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

        {/* Intro Phase */}
        {currentPhase === 'intro' && (
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
              
              {'table' in currentModuleData && currentModuleData.table && (
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-3 text-center">
                    {selectedModule === 1 ? '📊 Verb To Be Tablosu:' : 
                     selectedModule === 2 ? '🧩 Verb To Be Negatif Tablosu:' : 
                     selectedModule === 3 ? '❓ Verb To Be Soru Tablosu:' :
                     selectedModule === 4 ? '💬 Verb To Be Short Answers Tablosu:' :
                     selectedModule === 5 ? '👥 Subject Pronouns Tablosu:' :
                     '🏠 Possessive Adjectives Tablosu:'}
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
                              <th className="text-left py-2 px-1">Question</th>
                              <th className="text-left py-2 px-1">Positive Short Answer</th>
                              <th className="text-left py-2 px-1">Negative Short Answer</th>
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
                        {currentModuleData.table.map((row, index) => (
                          <tr key={index} className="border-b border-white/10">
                            {selectedModule === 3 ? (
                              <>
                                <td className="py-2 px-1 text-blue-300 font-medium">{row.verb}</td>
                                <td className="py-2 px-1">{row.subject}</td>
                                <td className="py-2 px-1">{row.complement}</td>
                                <td className="py-2 px-1 italic">{row.example}</td>
                              </>
                            ) : selectedModule === 4 ? (
                              <>
                                <td className="py-2 px-1 font-medium">{(row as any).question}</td>
                                <td className="py-2 px-1 text-green-300">{(row as any).positive}</td>
                                <td className="py-2 px-1 text-red-300">{(row as any).negative}</td>
                              </>
                            ) : selectedModule === 5 ? (
                              <>
                                <td className="py-2 px-1 text-purple-300 font-medium">{(row as any).pronoun}</td>
                                <td className="py-2 px-1 italic">{row.example}</td>
                              </>
                            ) : selectedModule === 6 ? (
                              <>
                                <td className="py-2 px-1 text-purple-300 font-medium">{(row as any).pronoun}</td>
                                <td className="py-2 px-1 text-orange-300 font-medium">{(row as any).possessive}</td>
                                <td className="py-2 px-1 italic">{row.example}</td>
                              </>
                            ) : (
                              <>
                                <td className="py-2 px-1 font-medium">{row.subject}</td>
                                <td className="py-2 px-1 text-blue-300">{row.verb}</td>
                                {selectedModule === 2 && 'not' in row && <td className="py-2 px-1 text-red-300">{(row as any).not}</td>}
                                <td className="py-2 px-1">{row.complement}</td>
                                <td className="py-2 px-1 italic">{row.example}</td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="text-center pt-4">
                <Button
                  onClick={() => setCurrentPhase('listening')}
                  className="bg-white/20 text-white hover:bg-white/30"
                >
                  Continue to Practice
                </Button>
              </div>
            </CardContent>
          </Card>
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
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  <Mic className="h-5 w-5 mr-2" />
                  Speaking Practice
                </div>
                <Badge variant="outline" className="text-white border-white/30">
                  {speakingIndex + 1} / {totalQuestions}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="bg-white/5 rounded-xl p-4 mb-4">
                  {(() => {
                    const currentPracticeItem = currentModuleData.speakingPractice[speakingIndex];
                    if (typeof currentPracticeItem === 'string') {
                      return (
                        <p className="text-white text-lg font-medium mb-2">
                          "{currentPracticeItem}"
                        </p>
                      );
                    } else {
                      return (
                        <>
                          <p className="text-white/70 text-sm mb-2">
                            Soru: {currentPracticeItem.question}
                          </p>
                          <p className="text-white text-lg font-medium mb-2">
                            Say: "{currentPracticeItem.answer}"
                          </p>
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

                {/* Recording Button */}
                <div className="mb-4">
                  <Button
                    onClick={isRecording ? stopRecording : startRecording}
                    size="lg"
                    className={`rounded-full w-20 h-20 ${
                      isRecording 
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                        : 'bg-white/20 hover:bg-white/30'
                    }`}
                    disabled={isProcessing || isSpeaking}
                  >
                    {isRecording ? (
                      <MicOff className="h-8 w-8" />
                    ) : (
                      <Mic className="h-8 w-8" />
                    )}
                  </Button>
                </div>

                <p className="text-white/70 text-sm mb-4">
                  {isRecording ? 'Listening...' : 'Tap to speak the sentence'}
                </p>

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
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}