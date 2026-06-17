/**
 * A1 Module Data (Modules 1-24)
 * Split from A1A2B1ModulesData.ts for better code splitting
 * ⚡ PERFORMANCE: Reduces initial bundle load by ~900KB
 */

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
  
  table: {
    title: "📋 Verb To Be: Positive Sentences (am, is, are)",
    data: [
      { category: "Structure", rule: "Subject + am/is/are + complement", explanation: "Basic sentence structure", turkish: "Özne + fiil + tümleç", note: "Most basic English sentence!" },

      { category: "With I", subject: "I", verb: "am", form: "I am", contraction: "I'm", example: "I am a student.", turkish: "Ben bir öğrenciyim.", usage: "Always use 'am' with I" },
      { category: "With I", subject: "I", verb: "am", form: "I am", contraction: "I'm", example: "I am happy.", turkish: "Ben mutluyum.", note: "Adjective after 'am'" },
      { category: "With I", subject: "I", verb: "am", form: "I am", contraction: "I'm", example: "I am from Turkey.", turkish: "Ben Türkiye'denim.", note: "Use 'from' for origin" },

      { category: "With He/She/It", subject: "He", verb: "is", form: "He is", contraction: "He's", example: "He is tired.", turkish: "O yorgun.", usage: "Use 'is' with he/she/it" },
      { category: "With He/She/It", subject: "She", verb: "is", form: "She is", contraction: "She's", example: "She is a doctor.", turkish: "O bir doktor.", note: "Profession without article in Turkish" },
      { category: "With He/She/It", subject: "It", verb: "is", form: "It is", contraction: "It's", example: "It is cold.", turkish: "Hava soğuk.", usage: "Use 'it' for weather, things" },
      { category: "With He/She/It", subject: "It", verb: "is", form: "It is", contraction: "It's", example: "It is a book.", turkish: "Bu bir kitap.", note: "Use 'it' for objects" },

      { category: "With We/You/They", subject: "We", verb: "are", form: "We are", contraction: "We're", example: "We are happy.", turkish: "Biz mutluyuz.", usage: "Use 'are' with we/you/they" },
      { category: "With We/You/They", subject: "You", verb: "are", form: "You are", contraction: "You're", example: "You are teachers.", turkish: "Siz öğretmensiniz.", note: "'You' = singular or plural" },
      { category: "With We/You/They", subject: "They", verb: "are", form: "They are", contraction: "They're", example: "They are friends.", turkish: "Onlar arkadaş.", note: "Use for multiple people/things" },

      { category: "Common Mistakes", mistake: "Using wrong form", wrong: "I is happy. ✗", correct: "I am happy. ✓", rule: "I = am (ALWAYS!)" },
      { category: "Common Mistakes", mistake: "Using wrong form", wrong: "She are a doctor. ✗", correct: "She is a doctor. ✓", rule: "He/She/It = is (ALWAYS!)" },
      { category: "Common Mistakes", mistake: "Using wrong form", wrong: "They is students. ✗", correct: "They are students. ✓", rule: "We/You/They = are (ALWAYS!)" },

      { category: "Key Points", point: "Contractions", explanation: "Combine subject + verb", examples: "I'm, He's, She's, It's, We're, You're, They're", note: "Very common in spoken English!" },
      { category: "Key Points", point: "Articles", explanation: "Use 'a/an' with jobs", example: "I am a teacher. (NOT I am teacher.)", turkish_note: "Turkish doesn't need article" },
      { category: "Key Points", point: "Word order", explanation: "Subject → Verb → Complement", example: "I am happy. (NOT Happy am I.)", note: "English has strict word order!" },
    ]
  },
  
  speakingPractice: [
    { question: "Are you a student?", answer: "Yes, I am a student.", multipleChoice: { prompt: "Yes, I ___ a student.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: true }] } },
    { question: "Is your teacher nice?", answer: "Yes, she is very nice.", multipleChoice: { prompt: "Yes, she ___ very nice.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are your friends doctors?", answer: "Yes, they are doctors.", multipleChoice: { prompt: "Yes, they ___ doctors.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "Is your brother a good student?", answer: "Yes, he is a good student.", multipleChoice: { prompt: "Yes, he ___ a good student.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are we late?", answer: "No, we are early.", multipleChoice: { prompt: "No, we ___ early.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are you ready?", answer: "Yes, I am ready.", multipleChoice: { prompt: "Yes, I ___ ready.", options: [{ letter: "A", text: "am", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is this your phone?", answer: "Yes, it is my phone.", multipleChoice: { prompt: "Yes, it ___ my phone.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are your parents in the kitchen?", answer: "Yes, they are in the kitchen.", multipleChoice: { prompt: "Yes, they ___ in the kitchen.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is your dad funny?", answer: "Yes, he is very funny.", multipleChoice: { prompt: "Yes, he ___ very funny.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is the cat on the table?", answer: "Yes, it is on the table.", multipleChoice: { prompt: "Yes, it ___ on the table.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is your best friend in this class?", answer: "Yes, she is my friend.", multipleChoice: { prompt: "Yes, she ___ my friend.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are you tired?", answer: "No, I am not tired. I am fine.", multipleChoice: { prompt: "No, I ___ not tired. I am fine.", options: [{ letter: "A", text: "am", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is your favorite footballer a famous player?", answer: "Yes, he is a famous player.", multipleChoice: { prompt: "Yes, he ___ a famous player.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Are your neighbors from Turkey?", answer: "Yes, they are from Turkey.", multipleChoice: { prompt: "Yes, they ___ from Turkey.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is your name Ali?", answer: "Yes, it is Ali.", multipleChoice: { prompt: "Yes, it ___ Ali.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Are we in the same class?", answer: "Yes, we are in the same class.", multipleChoice: { prompt: "Yes, we ___ in the same class.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is Harry Potter a good book?", answer: "Yes, it is a good book.", multipleChoice: { prompt: "Yes, it ___ a good book.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Are the dogs outside?", answer: "Yes, they are outside.", multipleChoice: { prompt: "Yes, they ___ outside.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Am I late for the meeting?", answer: "No, you are on time.", multipleChoice: { prompt: "No, You ___ on time.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is the teacher in the room?", answer: "Yes, she is in the room.", multipleChoice: { prompt: "Yes, she ___ in the room.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Is this your pen?", answer: "Yes, it is my pen.", multipleChoice: { prompt: "Yes, it ___ my pen.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are your parents at home?", answer: "No, they are at work.", multipleChoice: { prompt: "No, they ___ at work.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "Is your house big?", answer: "Yes, it is big.", multipleChoice: { prompt: "Yes, it ___ big.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are you hungry?", answer: "Yes, I am very hungry.", multipleChoice: { prompt: "Yes, I ___ very hungry.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: true }] } },
    { question: "Are we good students?", answer: "Yes, you are good students.", multipleChoice: { prompt: "Yes, You ___ good students.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "Is the weather nice today?", answer: "Yes, it is very nice.", multipleChoice: { prompt: "Yes, it ___ very nice.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Is English a difficult language?", answer: "No, it is not so difficult!", multipleChoice: { prompt: "No, it ___ not so difficult!", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are you a new student?", answer: "Yes, I am a new student.", multipleChoice: { prompt: "Yes, I ___ a new student.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: true }] } },
    { question: "Is your father at work?", answer: "Yes, he is at work.", multipleChoice: { prompt: "Yes, he ___ at work.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are your cousins in the garden?", answer: "Yes, they are in the garden.", multipleChoice: { prompt: "Yes, they ___ in the garden.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are you in the right classroom?", answer: "Yes, I am in the right classroom.", multipleChoice: { prompt: "Yes, I ___ in the right classroom.", options: [{ letter: "A", text: "am", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Are you from Italy?", answer: "No, I am from Spain.", multipleChoice: { prompt: "No, I ___ from Spain.", options: [{ letter: "A", text: "am", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is your phone on the table?", answer: "Yes, it is on the table.", multipleChoice: { prompt: "Yes, it ___ on the table.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are the books on the shelf?", answer: "Yes, they are on the shelf.", multipleChoice: { prompt: "Yes, they ___ on the shelf.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is it your birthday today?", answer: "Yes, it is my birthday!", multipleChoice: { prompt: "Yes, it ___ my birthday!", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are we classmates?", answer: "Yes, we are classmates.", multipleChoice: { prompt: "Yes, we ___ classmates.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is your sister at school now?", answer: "Yes, she is at school now.", multipleChoice: { prompt: "Yes, she ___ at school now.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are you cold?", answer: "Yes, I am very cold.", multipleChoice: { prompt: "Yes, I ___ very cold.", options: [{ letter: "A", text: "am", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Is that your bag?", answer: "Yes, it is my bag.", multipleChoice: { prompt: "Yes, it ___ my bag.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Are your neighbors teachers?", answer: "Yes, they are teachers.", multipleChoice: { prompt: "Yes, they ___ teachers.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
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
  
  table: {
    title: "📋 Verb To Be: Negative Sentences (am not, is not, are not)",
    data: [
      { category: "Structure", rule: "Subject + am/is/are + NOT + complement", explanation: "Add 'not' after the verb", turkish: "Fiilden sonra 'not' ekle", note: "Simple negation!" },

      { category: "With I", subject: "I", full_form: "I am not", contraction: "I'm not", example: "I am not a student.", turkish: "Ben öğrenci değilim.", note: "NO contraction 'I amn't' ✗" },
      { category: "With I", subject: "I", full_form: "I am not", contraction: "I'm not", example: "I'm not happy.", turkish: "Ben mutlu değilim.", usage: "Contraction more common" },
      { category: "With I", subject: "I", full_form: "I am not", contraction: "I'm not", example: "I'm not from here.", turkish: "Ben buradan değilim.", note: "Always use 'not' after 'am'" },

      { category: "With He/She/It", subject: "He", full_form: "He is not", contraction: "He isn't / He's not", example: "He is not tired.", turkish: "O yorgun değil.", note: "Two contraction options!" },
      { category: "With He/She/It", subject: "She", full_form: "She is not", contraction: "She isn't / She's not", example: "She isn't a doctor.", turkish: "O doktor değil.", usage: "isn't = most common" },
      { category: "With He/She/It", subject: "It", full_form: "It is not", contraction: "It isn't / It's not", example: "It isn't cold.", turkish: "Hava soğuk değil.", note: "Be careful: It's = It is (positive)" },
      { category: "With He/She/It", subject: "It", full_form: "It is not", contraction: "It isn't", example: "It isn't expensive.", turkish: "Pahalı değil.", usage: "Common with adjectives" },

      { category: "With We/You/They", subject: "We", full_form: "We are not", contraction: "We aren't / We're not", example: "We aren't happy.", turkish: "Biz mutlu değiliz.", note: "aren't = most common" },
      { category: "With We/You/They", subject: "You", full_form: "You are not", contraction: "You aren't / You're not", example: "You aren't teachers.", turkish: "Siz öğretmen değilsiniz.", usage: "For singular or plural 'you'" },
      { category: "With We/You/They", subject: "They", full_form: "They are not", contraction: "They aren't / They're not", example: "They aren't friends.", turkish: "Onlar arkadaş değil.", note: "Use for people or things" },

      { category: "Common Mistakes", mistake: "Wrong contraction with I", wrong: "I amn't tired. ✗", correct: "I'm not tired. ✓", rule: "'amn't' doesn't exist!" },
      { category: "Common Mistakes", mistake: "Forgetting 'not'", wrong: "He no is happy. ✗", correct: "He is not happy. ✓", rule: "Use 'not', not 'no'!" },
      { category: "Common Mistakes", mistake: "Wrong word order", wrong: "He not is a student. ✗", correct: "He is not a student. ✓", rule: "'not' comes AFTER the verb" },

      { category: "Contractions", form: "isn't", full: "is not", pronunciation: "/ˈɪzənt/", usage: "Very common in speech", example: "She isn't here." },
      { category: "Contractions", form: "aren't", full: "are not", pronunciation: "/ɑːrnt/", usage: "Very common in speech", example: "We aren't ready." },

      { category: "Key Points", point: "Two contraction styles", explanation: "is not → isn't OR → 's not", example: "He isn't happy. = He's not happy.", note: "Both correct! 'isn't'/'aren't' more common" },
      { category: "Key Points", point: "Formal vs Informal", formal: "I am not a teacher.", informal: "I'm not a teacher.", context: "Full forms in writing, contractions in speech" },
    ]
  },
  
  speakingPractice: [
    { question: "Are you a teacher?", answer: "No, I am not a teacher.", multipleChoice: { prompt: "No, I ___ not a teacher.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: true }] } },
    { question: "Is your classmate your sister?", answer: "No, she isn't my sister.", multipleChoice: { prompt: "No, she ___ my sister.", options: [{ letter: "A", text: "am not", correct: false }, { letter: "B", text: "isn't", correct: true }, { letter: "C", text: "aren't", correct: false }] } },
    { question: "Are your friends students?", answer: "No, they aren't students.", multipleChoice: { prompt: "No, ___ aren't students.", options: [{ letter: "A", text: "we", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "they", correct: true }] } },
    { question: "Is your brother at home?", answer: "No, he isn't at home.", multipleChoice: { prompt: "No, he ___ at home.", options: [{ letter: "A", text: "isn't", correct: true }, { letter: "B", text: "aren't", correct: false }, { letter: "C", text: "am not", correct: false }] } },
    { question: "Are we late?", answer: "No, we aren't late.", multipleChoice: { prompt: "No, ___ aren't late.", options: [{ letter: "A", text: "they", correct: false }, { letter: "B", text: "we", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "Are you tired?", answer: "No, I am not tired.", multipleChoice: { prompt: "No, I ___ not tired.", options: [{ letter: "A", text: "am", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is this your phone?", answer: "No, it isn't my phone.", multipleChoice: { prompt: "No, ___ isn't my phone.", options: [{ letter: "A", text: "it", correct: true }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Are your parents in the kitchen?", answer: "No, they aren't in the kitchen.", multipleChoice: { prompt: "No, they ___ in the kitchen.", options: [{ letter: "A", text: "am not", correct: false }, { letter: "B", text: "aren't", correct: true }, { letter: "C", text: "isn't", correct: false }] } },
    { question: "Are your answers wrong?", answer: "No, they are not wrong.", multipleChoice: { prompt: "No, they ___ not wrong.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is the cat on the table?", answer: "No, it isn't on the table.", multipleChoice: { prompt: "No, it ___ on the table.", options: [{ letter: "A", text: "isn't", correct: true }, { letter: "B", text: "aren't", correct: false }, { letter: "C", text: "am not", correct: false }] } },
    { question: "Is your mom your teacher?", answer: "No, she isn't my teacher.", multipleChoice: { prompt: "No, she ___ my teacher.", options: [{ letter: "A", text: "am not", correct: false }, { letter: "B", text: "isn't", correct: true }, { letter: "C", text: "aren't", correct: false }] } },
    { question: "Are you hungry?", answer: "No, I am not hungry.", multipleChoice: { prompt: "No, I ___ not hungry.", options: [{ letter: "A", text: "am", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is your uncle a doctor?", answer: "No, he isn't a doctor.", multipleChoice: { prompt: "No, he ___ a doctor.", options: [{ letter: "A", text: "isn't", correct: true }, { letter: "B", text: "aren't", correct: false }, { letter: "C", text: "am not", correct: false }] } },
    { question: "Are your neighbors from Spain?", answer: "No, they aren't from Spain.", multipleChoice: { prompt: "No, they aren't ___ Spain.", options: [{ letter: "A", text: "from", correct: true }, { letter: "B", text: "to", correct: false }, { letter: "C", text: "by", correct: false }] } },
    { question: "Is your name John?", answer: "No, it isn't John.", multipleChoice: { prompt: "No, ___ isn't John.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "it", correct: true }, { letter: "C", text: "she", correct: false }] } },
    { question: "Are we in the wrong room?", answer: "No, we aren't in the wrong room.", multipleChoice: { prompt: "No, we ___ in the wrong room.", options: [{ letter: "A", text: "aren't", correct: true }, { letter: "B", text: "isn't", correct: false }, { letter: "C", text: "am not", correct: false }] } },
    { question: "Is Harry Potter a bad book?", answer: "No, it isn't a bad book.", multipleChoice: { prompt: "No, it ___ a bad book.", options: [{ letter: "A", text: "am not", correct: false }, { letter: "B", text: "isn't", correct: true }, { letter: "C", text: "aren't", correct: false }] } },
    { question: "Are the dogs inside?", answer: "No, they aren't inside.", multipleChoice: { prompt: "No, ___ aren't inside.", options: [{ letter: "A", text: "they", correct: true }, { letter: "B", text: "we", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Am I late?", answer: "No, you are not late.", multipleChoice: { prompt: "No, You ___ not late.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is the teacher in the classroom?", answer: "No, she isn't in the classroom.", multipleChoice: { prompt: "No, she ___ in the classroom.", options: [{ letter: "A", text: "am not", correct: false }, { letter: "B", text: "isn't", correct: true }, { letter: "C", text: "aren't", correct: false }] } },
    { question: "Is this your pen?", answer: "No, it isn't my pen.", multipleChoice: { prompt: "No, ___ isn't my pen.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "it", correct: true }] } },
    { question: "Are your parents at school?", answer: "No, they aren't at school.", multipleChoice: { prompt: "No, they ___ at school.", options: [{ letter: "A", text: "aren't", correct: true }, { letter: "B", text: "isn't", correct: false }, { letter: "C", text: "am not", correct: false }] } },
    { question: "Is your house small?", answer: "No, it isn't small.", multipleChoice: { prompt: "No, it ___ small.", options: [{ letter: "A", text: "am not", correct: false }, { letter: "B", text: "isn't", correct: true }, { letter: "C", text: "aren't", correct: false }] } },
    { question: "Are you cold?", answer: "No, I am not cold.", multipleChoice: { prompt: "No, I ___ not cold.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: true }] } },
    { question: "Are we in the right place?", answer: "No, we aren't in the right place.", multipleChoice: { prompt: "No, we ___ in the right place.", options: [{ letter: "A", text: "aren't", correct: true }, { letter: "B", text: "isn't", correct: false }, { letter: "C", text: "am not", correct: false }] } },
    { question: "Is the weather bad today?", answer: "No, it isn't bad.", multipleChoice: { prompt: "No, ___ isn't bad.", options: [{ letter: "A", text: "she", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "it", correct: true }] } },
    { question: "Is English a hard language?", answer: "No, it isn't hard.", multipleChoice: { prompt: "No, ___ isn't hard.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "it", correct: true }] } },
    { question: "Are you a new student?", answer: "No, I am not a new student.", multipleChoice: { prompt: "No, I ___ not a new student.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: true }] } },
    { question: "Is your father at work?", answer: "No, he isn't at work.", multipleChoice: { prompt: "No, he ___ at work.", options: [{ letter: "A", text: "am not", correct: false }, { letter: "B", text: "isn't", correct: true }, { letter: "C", text: "aren't", correct: false }] } },
    { question: "Are your friends in the living room?", answer: "No, they aren't in the living room.", multipleChoice: { prompt: "No, they ___ in the living room.", options: [{ letter: "A", text: "isn't", correct: false }, { letter: "B", text: "am not", correct: false }, { letter: "C", text: "aren't", correct: true }] } },
    { question: "Are you in the right classroom?", answer: "No, I am not in the right classroom.", multipleChoice: { prompt: "No, I ___ not in the right classroom.", options: [{ letter: "A", text: "am", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Are you from Italy?", answer: "No, I am not from Italy.", multipleChoice: { prompt: "No, I ___ not from Italy.", options: [{ letter: "A", text: "am", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is your phone on the bed?", answer: "No, it isn't on the bed.", multipleChoice: { prompt: "No, it ___ on the bed.", options: [{ letter: "A", text: "aren't", correct: false }, { letter: "B", text: "am not", correct: false }, { letter: "C", text: "isn't", correct: true }] } },
    { question: "Are the books under the table?", answer: "No, they aren't under the table.", multipleChoice: { prompt: "No, ___ aren't under the table.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "they", correct: true }, { letter: "C", text: "we", correct: false }] } },
    { question: "Is it your birthday today?", answer: "No, it isn't my birthday.", multipleChoice: { prompt: "No, ___ isn't my birthday.", options: [{ letter: "A", text: "she", correct: false }, { letter: "B", text: "it", correct: true }, { letter: "C", text: "he", correct: false }] } },
    { question: "Are we in the same class?", answer: "No, we aren't in the same class.", multipleChoice: { prompt: "No, we ___ in the same class.", options: [{ letter: "A", text: "isn't", correct: false }, { letter: "B", text: "am not", correct: false }, { letter: "C", text: "aren't", correct: true }] } },
    { question: "Is your sister at school now?", answer: "No, she isn't at school now.", multipleChoice: { prompt: "No, she ___ at school now.", options: [{ letter: "A", text: "isn't", correct: true }, { letter: "B", text: "aren't", correct: false }, { letter: "C", text: "am not", correct: false }] } },
    { question: "Are you sleepy?", answer: "No, I am not sleepy.", multipleChoice: { prompt: "No, I ___ not sleepy.", options: [{ letter: "A", text: "am", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Is this your bag?", answer: "No, it isn't my bag.", multipleChoice: { prompt: "No, ___ isn't my bag.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "it", correct: true }, { letter: "C", text: "she", correct: false }] } },
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
  
  table: {
    title: "📋 Verb To Be: Question Sentences (Am/Is/Are...?)",
    data: [
      { category: "Structure", rule: "Am/Is/Are + subject + complement?", explanation: "Verb moves to the START", turkish: "Fiil cümlenin başına gelir", note: "Inversion = question!" },
      { category: "Structure", transformation: "Statement → Question", statement: "I am happy.", question: "Am I happy?", change: "Swap verb and subject" },

      { category: "With I", verb: "Am", subject: "I", form: "Am I", example: "Am I a student?", turkish: "Ben öğrenci miyim?", answer_yes: "Yes, you are.", answer_no: "No, you aren't." },
      { category: "With I", verb: "Am", subject: "I", form: "Am I", example: "Am I late?", turkish: "Ben geç mi kaldım?", note: "Always start with 'Am' for I" },
      { category: "With I", verb: "Am", subject: "I", form: "Am I", example: "Am I right?", turkish: "Ben haklı mıyım?", common_use: "Checking if you're correct" },

      { category: "With He/She/It", verb: "Is", subject: "he", form: "Is he", example: "Is he tired?", turkish: "O yorgun mu?", answer_yes: "Yes, he is.", answer_no: "No, he isn't." },
      { category: "With He/She/It", verb: "Is", subject: "she", form: "Is she", example: "Is she a doctor?", turkish: "O doktor mu?", note: "Use 'Is' with he/she/it" },
      { category: "With He/She/It", verb: "Is", subject: "it", form: "Is it", example: "Is it cold?", turkish: "Hava soğuk mu?", usage: "Weather questions" },
      { category: "With He/She/It", verb: "Is", subject: "it", form: "Is it", example: "Is it expensive?", turkish: "Pahalı mı?", common_use: "Asking about price" },

      { category: "With We/You/They", verb: "Are", subject: "we", form: "Are we", example: "Are we happy?", turkish: "Biz mutlu muyuz?", answer_yes: "Yes, we are.", answer_no: "No, we aren't." },
      { category: "With We/You/They", verb: "Are", subject: "you", form: "Are you", example: "Are you teachers?", turkish: "Siz öğretmen misiniz?", note: "Most common question form" },
      { category: "With We/You/They", verb: "Are", subject: "they", form: "Are they", example: "Are they friends?", turkish: "Onlar arkadaş mı?", usage: "Asking about others" },

      { category: "Common Mistakes", mistake: "Not inverting", wrong: "You are happy? ✗", correct: "Are you happy? ✓", rule: "Must swap subject and verb!" },
      { category: "Common Mistakes", mistake: "Wrong verb form", wrong: "Is they students? ✗", correct: "Are they students? ✓", rule: "They = are (always!)" },
      { category: "Common Mistakes", mistake: "Forgetting question mark", wrong: "Are you ready", correct: "Are you ready?", rule: "Questions NEED '?'!" },

      { category: "Short Answers", question_type: "Yes/No Questions", short_yes: "Yes, I am. / Yes, he is. / Yes, we are.", short_no: "No, I'm not. / No, he isn't. / No, we aren't.", note: "DON'T repeat full sentence!" },
      { category: "Short Answers", example_q: "Are you a student?", full_yes: "Yes, I am a student.", short_yes: "Yes, I am.", preferred: "Short answer (more natural)" },

      { category: "Intonation", point: "Rising intonation", explanation: "Voice goes UP at end", example: "Are you ready? ↗", note: "Very important for questions!" },
      { category: "Intonation", point: "Yes/No questions", pattern: "Start low → End HIGH", turkish_note: "Türkçede 'mı/mi/mu/mü' kullanırız", english_way: "Intonation shows it's a question" },
    ]
  },
  
  speakingPractice: [
    { question: "Are you from Turkey?", answer: "Yes, I am.", multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: true }] } },
    { question: "Is that woman your mother?", answer: "Yes, she is.", multipleChoice: { prompt: "Yes, she ___.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are your parents in the kitchen?", answer: "No, they aren't.", multipleChoice: { prompt: "No, ___ aren't.", options: [{ letter: "A", text: "we", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "they", correct: true }] } },
    { question: "Is your brother at school?", answer: "Yes, he is.", multipleChoice: { prompt: "Yes, he ___.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are we early?", answer: "Yes, we are.", multipleChoice: { prompt: "Yes, we ___.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are you ready?", answer: "Yes, I am.", multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "am", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is this your phone?", answer: "No, it isn't.", multipleChoice: { prompt: "No, ___ isn't.", options: [{ letter: "A", text: "it", correct: true }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Are your friends hungry?", answer: "Yes, they are.", multipleChoice: { prompt: "Yes, they ___.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is your dad funny?", answer: "Yes, he is.", multipleChoice: { prompt: "Yes, he ___.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is it cold today?", answer: "Yes, it is.", multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is your sister tired?", answer: "Yes, she is.", multipleChoice: { prompt: "Yes, she ___.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are you sleepy?", answer: "No, I'm not.", multipleChoice: { prompt: "No, ___ not.", options: [{ letter: "A", text: "you're", correct: false }, { letter: "B", text: "he's", correct: false }, { letter: "C", text: "I'm", correct: true }] } },
    { question: "Is your brother a student?", answer: "Yes, he is.", multipleChoice: { prompt: "Yes, he ___.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Are your friends at the park?", answer: "No, they aren't.", multipleChoice: { prompt: "No, ___ aren't.", options: [{ letter: "A", text: "they", correct: true }, { letter: "B", text: "we", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Is your name Ali?", answer: "Yes, it is.", multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Are we in the right room?", answer: "Yes, we are.", multipleChoice: { prompt: "Yes, we ___.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is Interstellar a good movie?", answer: "Yes, it is.", multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Are the dogs outside?", answer: "Yes, they are.", multipleChoice: { prompt: "Yes, they ___.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is my answer wrong?", answer: "No, it isn't.", multipleChoice: { prompt: "No, ___ isn't.", options: [{ letter: "A", text: "it", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "she", correct: false }] } },
    { question: "Is the teacher here?", answer: "Yes, she is.", multipleChoice: { prompt: "Yes, she ___.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Is this your pencil?", answer: "Yes, it is.", multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are your parents home?", answer: "No, they aren't.", multipleChoice: { prompt: "No, ___ aren't.", options: [{ letter: "A", text: "we", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "they", correct: true }] } },
    { question: "Is your house big?", answer: "Yes, it is.", multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are you cold?", answer: "Yes, I am.", multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: true }] } },
    { question: "Are we good students?", answer: "Yes, you are.", multipleChoice: { prompt: "Yes, You ___.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "Is the weather bad today?", answer: "No, it isn't.", multipleChoice: { prompt: "No, ___ isn't.", options: [{ letter: "A", text: "she", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "it", correct: true }] } },
    { question: "Is English a difficult language?", answer: "No, it isn't.", multipleChoice: { prompt: "No, ___ isn't.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "it", correct: true }] } },
    { question: "Are you a new student?", answer: "Yes, I am.", multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: true }] } },
    { question: "Is your father at home?", answer: "No, he isn't.", multipleChoice: { prompt: "No, ___ isn't.", options: [{ letter: "A", text: "she", correct: false }, { letter: "B", text: "it", correct: false }, { letter: "C", text: "he", correct: true }] } },
    { question: "Are your parents in the living room?", answer: "Yes, they are.", multipleChoice: { prompt: "Yes, they ___.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Am I late?", answer: "No, you aren't.", multipleChoice: { prompt: "No, ___ aren't.", options: [{ letter: "A", text: "you", correct: true }, { letter: "B", text: "we", correct: false }, { letter: "C", text: "i", correct: false }] } },
    { question: "Are you from Italy?", answer: "No, I'm not.", multipleChoice: { prompt: "No, ___ not.", options: [{ letter: "A", text: "he's", correct: false }, { letter: "B", text: "I'm", correct: true }, { letter: "C", text: "you're", correct: false }] } },
    { question: "Is your phone on the bed?", answer: "No, it isn't.", multipleChoice: { prompt: "No, ___ isn't.", options: [{ letter: "A", text: "she", correct: false }, { letter: "B", text: "it", correct: true }, { letter: "C", text: "he", correct: false }] } },
    { question: "Are the books on the table?", answer: "Yes, they are.", multipleChoice: { prompt: "Yes, they ___.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is it your birthday today?", answer: "Yes, it is.", multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are we classmates?", answer: "Yes, we are.", multipleChoice: { prompt: "Yes, we ___.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is your sister at school now?", answer: "Yes, she is.", multipleChoice: { prompt: "Yes, she ___.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are you hungry?", answer: "Yes, I am.", multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "am", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Is this your bag?", answer: "No, it isn't.", multipleChoice: { prompt: "No, ___ isn't.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "it", correct: true }, { letter: "C", text: "she", correct: false }] } },
    { question: "Are your classmates from Turkey?", answer: "Yes, they are.", multipleChoice: { prompt: "Yes, they ___.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
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

  table: {
    title: "📋 Subject Pronouns (I, You, He, She, It, We, They)",
    data: [
      { category: "What are Subject Pronouns?", explanation: "Words that replace names as the subject", turkish: "Özne zamirleri", function: "Subject of the sentence", examples: "I, you, he, she, it, we, they" },

      { category: "Singular Pronouns", pronoun: "I", person: "1st person", usage: "Talking about yourself", turkish: "Ben", example: "I am a student.", verb_to_be: "am", note: "Always CAPITAL 'I'!" },
      { category: "Singular Pronouns", pronoun: "You", person: "2nd person", usage: "Talking TO someone", turkish: "Sen/Siz", example: "You are my friend.", verb_to_be: "are", note: "Singular OR plural!" },
      { category: "Singular Pronouns", pronoun: "He", person: "3rd person", usage: "Male person", turkish: "O (erkek)", example: "He is a doctor.", verb_to_be: "is", note: "For males only" },
      { category: "Singular Pronouns", pronoun: "She", person: "3rd person", usage: "Female person", turkish: "O (kadın)", example: "She is happy.", verb_to_be: "is", note: "For females only" },
      { category: "Singular Pronouns", pronoun: "It", person: "3rd person", usage: "Things, animals, weather", turkish: "O (şey/hayvan)", example: "It is a book.", verb_to_be: "is", note: "NOT for people!" },

      { category: "Plural Pronouns", pronoun: "We", person: "1st person plural", usage: "Yourself + others", turkish: "Biz", example: "We are teachers.", verb_to_be: "are", note: "Includes speaker" },
      { category: "Plural Pronouns", pronoun: "You", person: "2nd person plural", usage: "Multiple people you're talking to", turkish: "Siz (çoğul)", example: "You are students.", verb_to_be: "are", note: "Same form as singular!" },
      { category: "Plural Pronouns", pronoun: "They", person: "3rd person plural", usage: "Multiple people or things", turkish: "Onlar", example: "They are at school.", verb_to_be: "are", note: "For people OR things" },

      { category: "Special Cases", pronoun: "It", special_use: "Weather", examples: "It is cold. / It is raining.", turkish: "Hava ile ilgili", note: "Turkish doesn't need subject" },
      { category: "Special Cases", pronoun: "It", special_use: "Time", examples: "It is 5 o'clock. / It is Monday.", turkish: "Zaman ile ilgili", note: "Always use 'It' for time" },
      { category: "Special Cases", pronoun: "It", special_use: "Distance", examples: "It is far. / It is 5 km.", turkish: "Mesafe ile ilgili", note: "English needs subject always" },

      { category: "Common Mistakes", mistake: "Using name instead of pronoun", wrong: "Maria is happy. Maria is a teacher. ✗", correct: "Maria is happy. She is a teacher. ✓", rule: "Use pronoun to avoid repetition" },
      { category: "Common Mistakes", mistake: "Wrong pronoun for things", wrong: "The book is good. He is interesting. ✗", correct: "The book is good. It is interesting. ✓", rule: "Use 'It' for things!" },
      { category: "Common Mistakes", mistake: "Lowercase 'i'", wrong: "i am a student. ✗", correct: "I am a student. ✓", rule: "'I' is ALWAYS capital!" },

      { category: "Verb Agreement", pronoun: "I", verb: "am", rule: "I am (NEVER I is or I are)" },
      { category: "Verb Agreement", pronoun: "He/She/It", verb: "is", rule: "He is, She is, It is" },
      { category: "Verb Agreement", pronoun: "We/You/They", verb: "are", rule: "We are, You are, They are" },
    ]
  },
  
  speakingPractice: [
    { question: "Who is your teacher?", answer: "She is my teacher.", multipleChoice: { prompt: "She ___ my teacher.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Is Ali your friend?", answer: "Yes, he is.", multipleChoice: { prompt: "Yes, he ___.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are you a student?", answer: "Yes, I am.", multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: true }] } },
    { question: "Is this your dog?", answer: "Yes, it is.", multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are you and John friends?", answer: "Yes, we are.", multipleChoice: { prompt: "Yes, we ___.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are Tom and Jerry funny?", answer: "Yes, they are.", multipleChoice: { prompt: "Yes, they ___.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is your mother a doctor?", answer: "Yes, she is.", multipleChoice: { prompt: "Yes, she ___.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is your brother tall?", answer: "Yes, he is.", multipleChoice: { prompt: "Yes, he ___.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is this a pen?", answer: "Yes, it is.", multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are you tired?", answer: "No, I am not.", multipleChoice: { prompt: "No, I ___ not.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "Who is this man?", answer: "He is my uncle.", multipleChoice: { prompt: "He ___ my uncle.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Who is this woman?", answer: "She is my aunt.", multipleChoice: { prompt: "She ___ my aunt.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is this your house?", answer: "Yes, it is.", multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Are we in the right place?", answer: "Yes, we are.", multipleChoice: { prompt: "Yes, we ___.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Are they at the park?", answer: "Yes, they are.", multipleChoice: { prompt: "Yes, they ___.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is your phone new?", answer: "Yes, it is.", multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Who is calling?", answer: "It is my mom.", multipleChoice: { prompt: "It ___ my mom.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Is your father a teacher?", answer: "Yes, he is.", multipleChoice: { prompt: "Yes, he ___.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Who are your friends?", answer: "They are my classmates.", multipleChoice: { prompt: "They ___ my classmates.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Are you cold?", answer: "Yes, I am.", multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "am", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Is your dog cute?", answer: "Yes, it is.", multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are you and your sister students?", answer: "Yes, we are.", multipleChoice: { prompt: "Yes, we ___.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "Is the sky blue?", answer: "Yes, it is.", multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Who is she?", answer: "She is my cousin.", multipleChoice: { prompt: "She ___ my cousin.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are the children playing?", answer: "Yes, they are.", multipleChoice: { prompt: "Yes, they ___.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "Is your book interesting?", answer: "Yes, it is.", multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are we ready?", answer: "Yes, we are.", multipleChoice: { prompt: "Yes, we ___.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "Are you happy?", answer: "Yes, I am.", multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: true }] } },
    { question: "Is your brother in the garden?", answer: "Yes, he is.", multipleChoice: { prompt: "Yes, he ___.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Is your sister at school?", answer: "Yes, she is.", multipleChoice: { prompt: "Yes, she ___.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are they watching TV?", answer: "Yes, they are.", multipleChoice: { prompt: "Yes, they ___.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Who is knocking on the door?", answer: "It is my neighbor.", multipleChoice: { prompt: "It ___ my neighbor.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are you busy?", answer: "No, I am not.", multipleChoice: { prompt: "No, I ___ not.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "Who is this?", answer: "It is my friend's cat.", multipleChoice: { prompt: "It ___ my friend's cat.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is it a sunny day?", answer: "Yes, it is.", multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are we good students?", answer: "Yes, we are.", multipleChoice: { prompt: "Yes, we ___.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are you from Istanbul?", answer: "Yes, I am.", multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "am", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Who is in the car?", answer: "My parents are in the car.", multipleChoice: { prompt: "My parents ___ in the car.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "Is the baby sleeping?", answer: "Yes, it is.", multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Are the lights on?", answer: "Yes, they are.", multipleChoice: { prompt: "Yes, they ___.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
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

  table: {
    title: "📋 Subject Pronouns: Complete Reference Guide",
    data: [
      { category: "Purpose", explanation: "Replace nouns to avoid repetition", turkish: "İsimlerin yerini alır", example_before: "John is happy. John is a teacher.", example_after: "John is happy. He is a teacher.", benefit: "More natural!" },

      { category: "I - First Person Singular", pronoun: "I", turkish: "Ben", usage: "The speaker", example: "I am a student.", with_verb: "I am / I'm", always_remember: "ALWAYS capital letter!" },
      { category: "I - First Person Singular", pronoun: "I", position: "Subject only", example_subject: "I love pizza.", wrong_object: "Pizza loves I. ✗", correct_object: "Pizza loves me. ✓", note: "Use 'me' as object" },

      { category: "You - Second Person", pronoun: "You", turkish: "Sen / Siz", usage: "Person/people you talk to", singular: "You are nice. (1 person)", plural: "You are nice. (many people)", unique: "Same form for both!" },
      { category: "You - Second Person", pronoun: "You", with_verb: "You are / You're", example_singular: "You are my friend.", example_plural: "You are my friends.", note: "Verb always 'are'" },

      { category: "He - Third Person Masculine", pronoun: "He", turkish: "O (erkek)", usage: "One male person", example: "He is a doctor.", with_verb: "He is / He's", refers_to: "Boys, men, male animals" },
      { category: "He - Third Person Masculine", pronoun: "He", replacement: "Replaces male names", before: "Tom is kind. Tom helps me.", after: "Tom is kind. He helps me.", note: "Avoid repeating the name" },

      { category: "She - Third Person Feminine", pronoun: "She", turkish: "O (kadın)", usage: "One female person", example: "She is happy.", with_verb: "She is / She's", refers_to: "Girls, women, female animals" },
      { category: "She - Third Person Feminine", pronoun: "She", replacement: "Replaces female names", before: "Mary is smart. Mary studies hard.", after: "Mary is smart. She studies hard.", note: "More natural flow" },

      { category: "It - Third Person Neutral", pronoun: "It", turkish: "O (şey)", usage: "Things, animals, concepts", examples: "It is a book. / It is my cat. / It is Monday.", with_verb: "It is / It's", important: "NOT for people!" },
      { category: "It - Third Person Neutral", pronoun: "It", special_uses: "Weather, time, distance", weather: "It is sunny.", time: "It is 3 PM.", distance: "It is 5 km.", turkish_difference: "Türkçede özne gerekmez" },

      { category: "We - First Person Plural", pronoun: "We", turkish: "Biz", usage: "Speaker + others", example: "We are students.", with_verb: "We are / We're", includes: "Always includes 'I'" },
      { category: "We - First Person Plural", pronoun: "We", common_uses: "Groups including you", examples: "We love pizza. / We are happy. / We study English.", note: "You're part of the group" },

      { category: "They - Third Person Plural", pronoun: "They", turkish: "Onlar", usage: "Multiple people or things", people: "They are students.", things: "They are books.", with_verb: "They are / They're" },
      { category: "They - Third Person Plural", pronoun: "They", modern_use: "Gender-neutral singular", example: "Someone called. They left a message.", explanation: "When gender unknown", note: "Increasingly common" },

      { category: "Summary Chart", all_pronouns: "I, You, He, She, It, We, They", with_am: "I am", with_is: "He is, She is, It is", with_are: "You are, We are, They are", remember: "Subject pronouns come BEFORE the verb" },
    ]
  },
  
  speakingPractice: [
    { question: "Do you know Ali?", answer: "Yes, I know him.", multipleChoice: { prompt: "Yes, ___ know him.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Do you like Ayşe?", answer: "Yes, I like her.", multipleChoice: { prompt: "Yes, I ___ her.", options: [{ letter: "A", text: "likeed", correct: false }, { letter: "B", text: "likes", correct: false }, { letter: "C", text: "like", correct: true }] } },
    { question: "Do you see the book?", answer: "Yes, I see it.", multipleChoice: { prompt: "Yes, ___ see it.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Can you help me?", answer: "Yes, I can help you.", multipleChoice: { prompt: "Yes, I ___ help you.", options: [{ letter: "A", text: "could", correct: false }, { letter: "B", text: "should", correct: false }, { letter: "C", text: "can", correct: true }] } },
    { question: "Do they see us?", answer: "Yes, they see us.", multipleChoice: { prompt: "Yes, ___ see us.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "they", correct: true }, { letter: "C", text: "we", correct: false }] } },
    { question: "Do you hear that noise?", answer: "Yes, I hear it.", multipleChoice: { prompt: "Yes, ___ hear it.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Does your mom know John?", answer: "Yes, she knows him.", multipleChoice: { prompt: "Yes, ___ knows him.", options: [{ letter: "A", text: "she", correct: true }, { letter: "B", text: "it", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do you call your sister?", answer: "Yes, I call her.", multipleChoice: { prompt: "Yes, ___ call her.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Does he like pizza?", answer: "Yes, he likes it.", multipleChoice: { prompt: "Yes, he likes ___.", options: [{ letter: "A", text: "them", correct: false }, { letter: "B", text: "us", correct: false }, { letter: "C", text: "it", correct: true }] } },
    { question: "Can you hear me?", answer: "Yes, I can hear you.", multipleChoice: { prompt: "Yes, I ___ hear you.", options: [{ letter: "A", text: "should", correct: false }, { letter: "B", text: "can", correct: true }, { letter: "C", text: "could", correct: false }] } },
    { question: "Do we see the bird?", answer: "Yes, we see it.", multipleChoice: { prompt: "Yes, ___ see it.", options: [{ letter: "A", text: "they", correct: false }, { letter: "B", text: "we", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "Do you remember me?", answer: "Yes, I remember you.", multipleChoice: { prompt: "Yes, ___ remember you.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Does she love her dog?", answer: "Yes, she loves it.", multipleChoice: { prompt: "Yes, ___ loves it.", options: [{ letter: "A", text: "she", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "it", correct: false }] } },
    { question: "Do they invite us?", answer: "Yes, they invite us.", multipleChoice: { prompt: "Yes, ___ invite us.", options: [{ letter: "A", text: "they", correct: true }, { letter: "B", text: "we", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Do you want the pen?", answer: "Yes, I want it.", multipleChoice: { prompt: "Yes, ___ want it.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do we know them?", answer: "Yes, we know them.", multipleChoice: { prompt: "Yes, ___ know them.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "we", correct: true }, { letter: "C", text: "they", correct: false }] } },
    { question: "Can you see my friends?", answer: "Yes, I see them.", multipleChoice: { prompt: "Yes, ___ see them.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "he", correct: false }] } },
    { question: "Did you meet my sister?", answer: "Yes, I met her.", multipleChoice: { prompt: "Yes, ___ met her.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do you help your parents?", answer: "Yes, I help them.", multipleChoice: { prompt: "Yes, ___ help them.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do they like the movie?", answer: "Yes, they like it.", multipleChoice: { prompt: "Yes, they ___ it.", options: [{ letter: "A", text: "like", correct: true }, { letter: "B", text: "likes", correct: false }, { letter: "C", text: "likeed", correct: false }] } },
    { question: "Do you visit your uncle?", answer: "Yes, I visit him.", multipleChoice: { prompt: "Yes, ___ visit him.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Can you help my friend and me?", answer: "Yes, I can help you.", multipleChoice: { prompt: "Yes, I ___ help you.", options: [{ letter: "A", text: "could", correct: false }, { letter: "B", text: "should", correct: false }, { letter: "C", text: "can", correct: true }] } },
    { question: "Do they know us?", answer: "Yes, they know us.", multipleChoice: { prompt: "Yes, ___ know us.", options: [{ letter: "A", text: "we", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "they", correct: true }] } },
    { question: "Do you hear the music?", answer: "Yes, I hear it.", multipleChoice: { prompt: "Yes, ___ hear it.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Does he see the children?", answer: "Yes, he sees them.", multipleChoice: { prompt: "Yes, ___ sees them.", options: [{ letter: "A", text: "it", correct: false }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "he", correct: true }] } },
    { question: "Do you call your dad?", answer: "Yes, I call him.", multipleChoice: { prompt: "Yes, ___ call him.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Do we know your sister?", answer: "Yes, we know her.", multipleChoice: { prompt: "Yes, ___ know her.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "they", correct: false }, { letter: "C", text: "we", correct: true }] } },
    { question: "Does she like you?", answer: "Yes, she likes me.", multipleChoice: { prompt: "Yes, she likes ___.", options: [{ letter: "A", text: "me", correct: true }, { letter: "B", text: "him", correct: false }, { letter: "C", text: "us", correct: false }] } },
    { question: "Did you find the keys?", answer: "Yes, I found them.", multipleChoice: { prompt: "Yes, ___ found them.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Do they understand the question?", answer: "Yes, they understand it.", multipleChoice: { prompt: "Yes, ___ understand it.", options: [{ letter: "A", text: "they", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "we", correct: false }] } },
    { question: "Did he invite you?", answer: "Yes, he invited me.", multipleChoice: { prompt: "Yes, ___ invited me.", options: [{ letter: "A", text: "he", correct: true }, { letter: "B", text: "it", correct: false }, { letter: "C", text: "she", correct: false }] } },
    { question: "Do you need help?", answer: "Yes, I need it.", multipleChoice: { prompt: "Yes, ___ need it.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Does your sister like chocolate?", answer: "Yes, she likes it.", multipleChoice: { prompt: "Yes, she likes ___.", options: [{ letter: "A", text: "him", correct: false }, { letter: "B", text: "them", correct: false }, { letter: "C", text: "it", correct: true }] } },
    { question: "Do you follow him on Instagram?", answer: "Yes, I follow him.", multipleChoice: { prompt: "Yes, ___ follow him.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "Do we understand them?", answer: "Yes, we understand them.", multipleChoice: { prompt: "Yes, ___ understand them.", options: [{ letter: "A", text: "they", correct: false }, { letter: "B", text: "we", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "Do they remember her?", answer: "Yes, they remember her.", multipleChoice: { prompt: "Yes, ___ remember her.", options: [{ letter: "A", text: "they", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "we", correct: false }] } },
    { question: "Do you want the ball?", answer: "Yes, I want it.", multipleChoice: { prompt: "Yes, ___ want it.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Do you know my parents?", answer: "Yes, I know them.", multipleChoice: { prompt: "Yes, ___ know them.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do you love your country?", answer: "Yes, I love it.", multipleChoice: { prompt: "Yes, ___ love it.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "he", correct: false }] } },
    { question: "Did he tell you the story?", answer: "Yes, he told me.", multipleChoice: { prompt: "Yes, ___ told me.", options: [{ letter: "A", text: "she", correct: false }, { letter: "B", text: "he", correct: true }, { letter: "C", text: "it", correct: false }] } },
    { question: "Can she hear us?", answer: "Yes, she can hear us.", multipleChoice: { prompt: "Yes, she ___ hear us.", options: [{ letter: "A", text: "could", correct: false }, { letter: "B", text: "can", correct: true }, { letter: "C", text: "should", correct: false }] } },
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
  
  table: {
    title: "📋 Possessive Adjectives (my, your, his, her, its, our, their)",
    data: [
      { category: "What are Possessive Adjectives?", explanation: "Show ownership or possession", turkish: "İyelik sıfatları", function: "Come BEFORE a noun", rule: "Never change form (no plural!)" },

      { category: "I → my", subject_pronoun: "I", possessive: "my", turkish: "benim", example: "This is my house.", pattern: "my + noun", note: "Never 'mines' ✗" },
      { category: "I → my", usage: "Shows YOUR ownership", examples: "my book, my car, my friends", common: "my name is...", turkish_note: "Türkçede -im/-ım/-um/-üm" },

      { category: "You → your", subject_pronoun: "You", possessive: "your", turkish: "senin/sizin", example: "Your dog is cute.", pattern: "your + noun", note: "Same for singular and plural!" },
      { category: "You → your", usage: "Shows LISTENER's ownership", examples: "your pen, your house, your parents", question: "Is this your...?", common_phrase: "your turn" },

      { category: "He → his", subject_pronoun: "He", possessive: "his", turkish: "onun (erkek)", example: "His phone is on the table.", pattern: "his + noun", note: "For males only" },
      { category: "He → his", usage: "Shows HIS ownership (male)", examples: "his car, his job, his family", common: "his name is...", confusion: "NOT 'he's' (= he is)" },

      { category: "She → her", subject_pronoun: "She", possessive: "her", turkish: "onun (kadın)", example: "Her bag is blue.", pattern: "her + noun", note: "For females only" },
      { category: "She → her", usage: "Shows HER ownership (female)", examples: "her dress, her hair, her children", common: "her name is...", confusion: "NOT 'she's' (= she is)" },

      { category: "It → its", subject_pronoun: "It", possessive: "its", turkish: "onun (şey)", example: "The cat is licking its paw.", pattern: "its + noun", warning: "⚠️ NO apostrophe!" },
      { category: "It → its", usage: "Shows ownership (things/animals)", examples: "its color, its name, its tail", common_mistake: "it's = it is ✗", correct: "its = possessive ✓" },

      { category: "We → our", subject_pronoun: "We", possessive: "our", turkish: "bizim", example: "Our school is big.", pattern: "our + noun", note: "Includes speaker + others" },
      { category: "We → our", usage: "Shows OUR ownership (group)", examples: "our house, our teacher, our city", common: "our family", pronunciation: "/ˈaʊər/" },

      { category: "They → their", subject_pronoun: "They", possessive: "their", turkish: "onların", example: "Their children are playing.", pattern: "their + noun", note: "For multiple people/things" },
      { category: "They → their", usage: "Shows THEIR ownership (others)", examples: "their car, their books, their dog", confusion: "NOT 'there' (place) or 'they're' (they are)", homophones: "their/there/they're sound same!" },

      { category: "Common Mistakes", mistake: "Confusing its/it's", wrong: "The dog wagged it's tail. ✗", correct: "The dog wagged its tail. ✓", rule: "its = possessive (NO apostrophe!)" },
      { category: "Common Mistakes", mistake: "Adding -s for plural", wrong: "These are ours books. ✗", correct: "These are our books. ✓", rule: "Possessive adjectives NEVER change!" },
      { category: "Common Mistakes", mistake: "Their/There/They're", their: "Their car (possession)", there: "Over there (place)", theyre: "They're happy (they are)" },

      { category: "Key Points", point: "Always before noun", examples: "my book ✓ / book my ✗", rule: "Adjective + Noun order", note: "Can't say 'book my'" },
      { category: "Key Points", point: "Never plural", wrong: "ours car ✗", correct: "our car ✓ / our cars ✓", explanation: "The NOUN can be plural, not the adjective" },
      { category: "Key Points", point: "Question 'Whose?'", question: "Whose book is this?", answer: "It's my book.", usage: "To ask about ownership" },
    ]
  },
  
  speakingPractice: [
    { question: "Is this your book?", answer: "Yes, this is my book.", multipleChoice: { prompt: "Yes, ___ my book.", options: [{ letter: "A", text: "These are", correct: false }, { letter: "B", text: "That is", correct: false }, { letter: "C", text: "This is", correct: true }] } },
    { question: "Where is your brother's phone?", answer: "His phone is in his room.", multipleChoice: { prompt: "His phone ___ in his room.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is your friend's bag big?", answer: "Yes, her bag is big.", multipleChoice: { prompt: "Yes, her bag ___ big.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What color is your neighbor's car?", answer: "Their car is black.", multipleChoice: { prompt: "Their car ___ black.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are your shoes white?", answer: "Yes, my shoes are white.", multipleChoice: { prompt: "Yes, my shoes ___ white.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is our classroom nice?", answer: "Yes, our classroom is nice.", multipleChoice: { prompt: "Yes, our classroom ___ nice.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Is your friend’s dog funny?", answer: "Yes, his dog is funny.", multipleChoice: { prompt: "Yes, his dog ___ funny.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Is this your brother's pencil?", answer: "No, that is not his pencil.", multipleChoice: { prompt: "No, ___ not his pencil.", options: [{ letter: "A", text: "That is", correct: true }, { letter: "B", text: "Those are", correct: false }, { letter: "C", text: "This is", correct: false }] } },
    { question: "Are those your grandmother's glasses?", answer: "No, those are not her glasses.", multipleChoice: { prompt: "No, ___ not her glasses.", options: [{ letter: "A", text: "That is", correct: false }, { letter: "B", text: "Those are", correct: true }, { letter: "C", text: "These are", correct: false }] } },
    { question: "Where is your cat's toy?", answer: "Its toy is on the floor.", multipleChoice: { prompt: "Its toy ___ on the floor.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Is your jacket warm?", answer: "Yes, my jacket is warm.", multipleChoice: { prompt: "Yes, my jacket ___ warm.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Where are our books?", answer: "Our books are on the table.", multipleChoice: { prompt: "Our books ___ on the table.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is your friend's house small?", answer: "No, their house is big.", multipleChoice: { prompt: "No, their house ___ big.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Where is your chair?", answer: "My chair is in the room.", multipleChoice: { prompt: "My chair ___ in the room.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Is your mom's umbrella blue?", answer: "Yes, her umbrella is blue.", multipleChoice: { prompt: "Yes, her umbrella ___ blue.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Are your dad's books in English?", answer: "No, his books are in Turkish.", multipleChoice: { prompt: "No, his books ___ in Turkish.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "Is your wallet in your bag?", answer: "Yes, my wallet is in my bag.", multipleChoice: { prompt: "Yes, my wallet ___ in my bag.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Is our homework difficult?", answer: "Yes, our homework is difficult.", multipleChoice: { prompt: "Yes, our homework ___ difficult.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Is this my phone?", answer: "Yes, this is your phone.", multipleChoice: { prompt: "Yes, ___ your phone.", options: [{ letter: "A", text: "This is", correct: true }, { letter: "B", text: "That is", correct: false }, { letter: "C", text: "These are", correct: false }] } },
    { question: "Is your uncle's house in Istanbul?", answer: "Yes, his house is in Istanbul.", multipleChoice: { prompt: "Yes, his house ___ in Istanbul.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Is your brother tall?", answer: "Yes, my brother is tall.", multipleChoice: { prompt: "Yes, my brother ___ tall.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is your friend's sister a student?", answer: "Yes, her sister is a student.", multipleChoice: { prompt: "Yes, her sister ___ a student.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are your neighbors' children girls?", answer: "Yes, their children are girls.", multipleChoice: { prompt: "Yes, their children ___ girls.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is your team a winner?", answer: "Yes, our team is a winner.", multipleChoice: { prompt: "Yes, our team ___ a winner.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is your friend a doctor?", answer: "No, my friend is not a doctor.", multipleChoice: { prompt: "No, my friend ___ not a doctor.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is your school very big?", answer: "Yes, our school is very big.", multipleChoice: { prompt: "Yes, our school ___ very big.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is your friend beautiful?", answer: "Yes, my friend is beautiful.", multipleChoice: { prompt: "Yes, my friend ___ beautiful.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is your father a teacher?", answer: "No, my father is not a teacher.", multipleChoice: { prompt: "No, my father ___ not a teacher.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Where is your sister's notebook?", answer: "Her notebook is in her bag.", multipleChoice: { prompt: "Her notebook ___ in her bag.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are these your keys?", answer: "Yes, these are my keys.", multipleChoice: { prompt: "Yes, ___ my keys.", options: [{ letter: "A", text: "These are", correct: true }, { letter: "B", text: "Those are", correct: false }, { letter: "C", text: "This is", correct: false }] } },
    { question: "Is your friend's dog a boy?", answer: "Yes, his dog is a boy.", multipleChoice: { prompt: "Yes, his dog ___ a boy.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Is your dad's coat brown?", answer: "Yes, his coat is brown.", multipleChoice: { prompt: "Yes, his coat ___ brown.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What color is your mom’s hat?", answer: "Her hat is white.", multipleChoice: { prompt: "Her hat ___ white.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Is our bus fast?", answer: "Yes, our bus is very fast.", multipleChoice: { prompt: "Yes, our bus ___ very fast.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are your friends' bags in the classroom?", answer: "Yes, their bags are in the classroom.", multipleChoice: { prompt: "Yes, their bags ___ in the classroom.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is this my seat?", answer: "Yes, this is your seat.", multipleChoice: { prompt: "Yes, ___ your seat.", options: [{ letter: "A", text: "This is", correct: true }, { letter: "B", text: "These are", correct: false }, { letter: "C", text: "That is", correct: false }] } },
    { question: "Are your cousins in Ankara?", answer: "No, my cousins are in Istanbul.", multipleChoice: { prompt: "No, my cousins ___ in Istanbul.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is your friend's hair long?", answer: "No, his hair is short.", multipleChoice: { prompt: "No, his hair ___ short.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Is your teacher's phone on your table?", answer: "No, her phone is not on my table.", multipleChoice: { prompt: "No, her phone ___ not on my table.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Is this your name?", answer: "Yes, that is my name.", multipleChoice: { prompt: "Yes, ___ my name.", options: [{ letter: "A", text: "This is", correct: false }, { letter: "B", text: "That is", correct: true }, { letter: "C", text: "Those are", correct: false }] } },
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

  table: {
    title: "📋 Demonstratives: This, That, These, Those",
    data: [
      { category: "What are Demonstratives?", explanation: "Point to specific things", turkish: "İşaret sıfatları", function: "Show distance and number", usage: "Near vs Far, Singular vs Plural" },

      { category: "This - Singular Near", word: "This", turkish: "Bu", distance: "Near (close to speaker)", number: "Singular (one thing)", example: "This is my book.", pattern: "This + singular noun" },
      { category: "This - Singular Near", uses: "Pointing to close object", examples: "This pen, This chair, This house", with_verb: "This is... / This book is...", pronunciation: "/ðɪs/" },

      { category: "That - Singular Far", word: "That", turkish: "Şu/O", distance: "Far (away from speaker)", number: "Singular (one thing)", example: "That is her car.", pattern: "That + singular noun" },
      { category: "That - Singular Far", uses: "Pointing to distant object", examples: "That building, That tree, That mountain", with_verb: "That is... / That car is...", pronunciation: "/ðæt/" },

      { category: "These - Plural Near", word: "These", turkish: "Bunlar", distance: "Near (close to speaker)", number: "Plural (multiple things)", example: "These are our friends.", pattern: "These + plural noun" },
      { category: "These - Plural Near", uses: "Pointing to close objects", examples: "These books, These shoes, These people", with_verb: "These are... / These books are...", pronunciation: "/ðiːz/" },

      { category: "Those - Plural Far", word: "Those", turkish: "Şunlar/Onlar", distance: "Far (away from speaker)", number: "Plural (multiple things)", example: "Those are their houses.", pattern: "Those + plural noun" },
      { category: "Those - Plural Far", uses: "Pointing to distant objects", examples: "Those trees, Those cars, Those birds", with_verb: "Those are... / Those cars are...", pronunciation: "/ðoʊz/" },

      { category: "Distance Comparison", near_singular: "This book (here)", far_singular: "That book (there)", near_plural: "These books (here)", far_plural: "Those books (there)", key: "Near vs Far" },

      { category: "Common Mistakes", mistake: "Using singular verb with plural", wrong: "These is my books. ✗", correct: "These are my books. ✓", rule: "These/Those = plural (use 'are'!)" },
      { category: "Common Mistakes", mistake: "Wrong number agreement", wrong: "This are books. ✗", correct: "These are books. ✓", rule: "This/That = singular, These/Those = plural" },
      { category: "Common Mistakes", mistake: "Mixing distance", guidance: "This (near) ↔ These (near)", guidance2: "That (far) ↔ Those (far)", note: "Keep distance consistent" },

      { category: "With Verbs", this_pattern: "This is + singular", that_pattern: "That is + singular", these_pattern: "These are + plural", those_pattern: "Those are + plural", remember: "is = singular, are = plural" },

      { category: "Questions", question_this: "What is this?", question_that: "What is that?", question_these: "What are these?", question_those: "What are those?", usage: "Asking about identity" },

      { category: "Practical Usage", phone_call: "This is John. (introducing yourself)", reference_past: "That was great! (referring to past event)", pointing: "Use gestures while speaking", turkish_note: "Turkish has more distance levels (bu/şu/o)" },
    ]
  },

  speakingPractice: [
    { question: "Whose book is this, yours or your friend's?", answer: "It's mine, not hers.", multipleChoice: { prompt: "___ mine, not hers.", options: [{ letter: "A", text: "it'ing", correct: false }, { letter: "B", text: "it'", correct: false }, { letter: "C", text: "it's", correct: true }] } },
    { question: "Is this your phone or your sister's?", answer: "It's not mine, it's hers.", multipleChoice: { prompt: "___ not mine, it's hers.", options: [{ letter: "A", text: "it'ing", correct: false }, { letter: "B", text: "it'", correct: false }, { letter: "C", text: "it's", correct: true }] } },
    { question: "Is that your dad's car or your neighbor's?", answer: "It's his, not theirs.", multipleChoice: { prompt: "___ his, not theirs.", options: [{ letter: "A", text: "it'", correct: false }, { letter: "B", text: "it'ing", correct: false }, { letter: "C", text: "it's", correct: true }] } },
    { question: "Whose jacket is that on the chair?", answer: "It's mine.", multipleChoice: { prompt: "___ mine.", options: [{ letter: "A", text: "it'", correct: false }, { letter: "B", text: "it'ing", correct: false }, { letter: "C", text: "it's", correct: true }] } },
    { question: "Is this umbrella your mom's or your aunt's?", answer: "It's my mom's.", multipleChoice: { prompt: "___ my mom's.", options: [{ letter: "A", text: "it'ing", correct: false }, { letter: "B", text: "it's", correct: true }, { letter: "C", text: "it'", correct: false }] } },
    { question: "Whose shoes are these by the door?", answer: "They are mine.", multipleChoice: { prompt: "They ___ mine.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is that bag on the table yours or your friend's?", answer: "It's not mine, it's hers.", multipleChoice: { prompt: "___ not mine, it's hers.", options: [{ letter: "A", text: "it's", correct: true }, { letter: "B", text: "it'ing", correct: false }, { letter: "C", text: "it'", correct: false }] } },
    { question: "Is this pen your brother's or yours?", answer: "It's his, not mine.", multipleChoice: { prompt: "___ his, not mine.", options: [{ letter: "A", text: "it's", correct: true }, { letter: "B", text: "it'ing", correct: false }, { letter: "C", text: "it'", correct: false }] } },
    { question: "Are those keys on the desk yours?", answer: "Yes, they're mine.", multipleChoice: { prompt: "Yes, ___ mine.", options: [{ letter: "A", text: "person", correct: false }, { letter: "B", text: "they're", correct: true }, { letter: "C", text: "thing", correct: false }] } },
    { question: "Is the red bike yours or your neighbors'?", answer: "It's not mine, it's theirs.", multipleChoice: { prompt: "___ not mine, it's theirs.", options: [{ letter: "A", text: "it'ing", correct: false }, { letter: "B", text: "it's", correct: true }, { letter: "C", text: "it'", correct: false }] } },
    { question: "Whose dog is that in the garden?", answer: "It's ours.", multipleChoice: { prompt: "___ ours.", options: [{ letter: "A", text: "it'ing", correct: false }, { letter: "B", text: "it's", correct: true }, { letter: "C", text: "it'", correct: false }] } },
    { question: "Is this notebook your friend's or yours?", answer: "It's hers, not mine.", multipleChoice: { prompt: "___ hers, not mine.", options: [{ letter: "A", text: "it's", correct: true }, { letter: "B", text: "it'ing", correct: false }, { letter: "C", text: "it'", correct: false }] } },
    { question: "Is the phone on the table yours or your brother's?", answer: "It's not mine, it's his.", multipleChoice: { prompt: "___ not mine, it's his.", options: [{ letter: "A", text: "it's", correct: true }, { letter: "B", text: "it'", correct: false }, { letter: "C", text: "it'ing", correct: false }] } },
    { question: "Are these gloves your mom's or your sister's?", answer: "They're my sister's.", multipleChoice: { prompt: "___ my sister's.", options: [{ letter: "A", text: "they're", correct: true }, { letter: "B", text: "thing", correct: false }, { letter: "C", text: "person", correct: false }] } },
    { question: "Is that computer your dad's or your brother's?", answer: "It's my brother's.", multipleChoice: { prompt: "___ my brother's.", options: [{ letter: "A", text: "it'", correct: false }, { letter: "B", text: "it's", correct: true }, { letter: "C", text: "it'ing", correct: false }] } },
    { question: "Is the house on the corner your friends' or your neighbors'?", answer: "It's my neighbors'.", multipleChoice: { prompt: "___ my neighbors'.", options: [{ letter: "A", text: "it'", correct: false }, { letter: "B", text: "it's", correct: true }, { letter: "C", text: "it'ing", correct: false }] } },
    { question: "Is this seat yours or your friend's?", answer: "It's mine.", multipleChoice: { prompt: "___ mine.", options: [{ letter: "A", text: "it'", correct: false }, { letter: "B", text: "it's", correct: true }, { letter: "C", text: "it'ing", correct: false }] } },
    { question: "Is this watch yours or your mom's?", answer: "It's not hers, it's mine.", multipleChoice: { prompt: "___ not hers, it's mine.", options: [{ letter: "A", text: "it's", correct: true }, { letter: "B", text: "it'", correct: false }, { letter: "C", text: "it'ing", correct: false }] } },
    { question: "Are those pencils yours or ours?", answer: "They're not mine, they're ours.", multipleChoice: { prompt: "___ not mine, they're ours.", options: [{ letter: "A", text: "they're", correct: true }, { letter: "B", text: "thing", correct: false }, { letter: "C", text: "person", correct: false }] } },
    { question: "Is that bag your brother's or your dad's?", answer: "It's his, my brother's.", multipleChoice: { prompt: "___ his, my brother's.", options: [{ letter: "A", text: "it's", correct: true }, { letter: "B", text: "it'", correct: false }, { letter: "C", text: "it'ing", correct: false }] } },
    { question: "Whose ball is that in the garden?", answer: "It's the neighbors' kids'.", multipleChoice: { prompt: "___ the neighbors' kids'.", options: [{ letter: "A", text: "it'", correct: false }, { letter: "B", text: "it'ing", correct: false }, { letter: "C", text: "it's", correct: true }] } },
    { question: "Are these notebooks yours or your classmates'?", answer: "They are mine.", multipleChoice: { prompt: "They ___ mine.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "Is this lunch yours or your friend's?", answer: "It's not mine, it's hers.", multipleChoice: { prompt: "___ not mine, it's hers.", options: [{ letter: "A", text: "it'", correct: false }, { letter: "B", text: "it'ing", correct: false }, { letter: "C", text: "it's", correct: true }] } },
    { question: "Is that car yours or your parents'?", answer: "It's not mine, it's theirs.", multipleChoice: { prompt: "___ not mine, it's theirs.", options: [{ letter: "A", text: "it'ing", correct: false }, { letter: "B", text: "it'", correct: false }, { letter: "C", text: "it's", correct: true }] } },
    { question: "Is this chair yours or your brother's?", answer: "It's not mine, it's his.", multipleChoice: { prompt: "___ not mine, it's his.", options: [{ letter: "A", text: "it'ing", correct: false }, { letter: "B", text: "it'", correct: false }, { letter: "C", text: "it's", correct: true }] } },
    { question: "Whose phone is ringing on the table?", answer: "It's my sister's.", multipleChoice: { prompt: "___ my sister's.", options: [{ letter: "A", text: "it'ing", correct: false }, { letter: "B", text: "it'", correct: false }, { letter: "C", text: "it's", correct: true }] } },
    { question: "Are those books on the shelf yours or your dad's?", answer: "They're mine.", multipleChoice: { prompt: "___ mine.", options: [{ letter: "A", text: "thing", correct: false }, { letter: "B", text: "person", correct: false }, { letter: "C", text: "they're", correct: true }] } },
    { question: "Is the table in the kitchen ours or the neighbors'?", answer: "It's ours.", multipleChoice: { prompt: "___ ours.", options: [{ letter: "A", text: "it'", correct: false }, { letter: "B", text: "it'ing", correct: false }, { letter: "C", text: "it's", correct: true }] } },
    { question: "Are these socks yours or your brother's?", answer: "They're not mine, they're his.", multipleChoice: { prompt: "___ not mine, they're his.", options: [{ letter: "A", text: "thing", correct: false }, { letter: "B", text: "person", correct: false }, { letter: "C", text: "they're", correct: true }] } },
    { question: "Whose glasses are these on the sofa?", answer: "They're mine.", multipleChoice: { prompt: "___ mine.", options: [{ letter: "A", text: "they're", correct: true }, { letter: "B", text: "person", correct: false }, { letter: "C", text: "thing", correct: false }] } },
    { question: "Is this the key to your room or your sister's?", answer: "It's mine.", multipleChoice: { prompt: "___ mine.", options: [{ letter: "A", text: "it's", correct: true }, { letter: "B", text: "it'ing", correct: false }, { letter: "C", text: "it'", correct: false }] } },
    { question: "Is that laptop yours or your friend's?", answer: "It's not mine, it's hers.", multipleChoice: { prompt: "___ not mine, it's hers.", options: [{ letter: "A", text: "it's", correct: true }, { letter: "B", text: "it'ing", correct: false }, { letter: "C", text: "it'", correct: false }] } },
    { question: "Are the toys in the garden the neighbors' kids'?", answer: "Yes, they're theirs.", multipleChoice: { prompt: "Yes, ___ theirs.", options: [{ letter: "A", text: "person", correct: false }, { letter: "B", text: "they're", correct: true }, { letter: "C", text: "thing", correct: false }] } },
    { question: "Whose pen is this on my desk?", answer: "It's my brother's.", multipleChoice: { prompt: "___ my brother's.", options: [{ letter: "A", text: "it'ing", correct: false }, { letter: "B", text: "it's", correct: true }, { letter: "C", text: "it'", correct: false }] } },
    { question: "Is that bed yours or your sister's?", answer: "It's not hers, it's mine.", multipleChoice: { prompt: "___ not hers, it's mine.", options: [{ letter: "A", text: "it'ing", correct: false }, { letter: "B", text: "it's", correct: true }, { letter: "C", text: "it'", correct: false }] } },
    { question: "Are these phones ours or the teacher's?", answer: "They're ours.", multipleChoice: { prompt: "___ ours.", options: [{ letter: "A", text: "they're", correct: true }, { letter: "B", text: "person", correct: false }, { letter: "C", text: "thing", correct: false }] } },
    { question: "Is the jacket on the door your dad's or your brother's?", answer: "It's my dad's.", multipleChoice: { prompt: "___ my dad's.", options: [{ letter: "A", text: "it's", correct: true }, { letter: "B", text: "it'ing", correct: false }, { letter: "C", text: "it'", correct: false }] } },
    { question: "Are these cookies yours?", answer: "They're mine.", multipleChoice: { prompt: "___ mine.", options: [{ letter: "A", text: "they're", correct: true }, { letter: "B", text: "thing", correct: false }, { letter: "C", text: "person", correct: false }] } },
    { question: "Whose scarf is this on the chair?", answer: "It's my mom's.", multipleChoice: { prompt: "___ my mom's.", options: [{ letter: "A", text: "it'", correct: false }, { letter: "B", text: "it's", correct: true }, { letter: "C", text: "it'ing", correct: false }] } },
    { question: "Is this notebook yours or your brother's?", answer: "It's not mine, it's his.", multipleChoice: { prompt: "___ not mine, it's his.", options: [{ letter: "A", text: "it'", correct: false }, { letter: "B", text: "it's", correct: true }, { letter: "C", text: "it'ing", correct: false }] } },
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
  
  table: {
    title: "📋 Demonstratives: This, That, These, Those (Extended)",
    data: [
      { category: "The Four Demonstratives", overview: "Distance + Number", singular_near: "This", singular_far: "That", plural_near: "These", plural_far: "Those", key_concept: "2 distances × 2 numbers = 4 words" },

      { category: "This", word: "This", distance: "Near", number: "Singular", example: "This is a chair.", usage: "One thing close to you", gesture: "Point nearby 👇" },
      { category: "This", before_noun: "This book", standalone: "This is nice.", question: "Is this yours?", negative: "This isn't mine.", turkish: "Bu" },

      { category: "That", word: "That", distance: "Far", number: "Singular", example: "That is a tree.", usage: "One thing away from you", gesture: "Point away 👉" },
      { category: "That", before_noun: "That building", standalone: "That is expensive.", question: "Is that correct?", negative: "That isn't true.", turkish: "Şu/O" },

      { category: "These", word: "These", distance: "Near", number: "Plural", example: "These are my shoes.", usage: "Multiple things close to you", gesture: "Indicate multiple near items" },
      { category: "These", before_noun: "These books", standalone: "These are great.", question: "Are these new?", negative: "These aren't ready.", turkish: "Bunlar" },

      { category: "Those", word: "Those", distance: "Far", number: "Plural", example: "Those are birds.", usage: "Multiple things away from you", gesture: "Indicate multiple far items" },
      { category: "Those", before_noun: "Those mountains", standalone: "Those are beautiful.", question: "Are those yours?", negative: "Those aren't mine.", turkish: "Şunlar/Onlar" },

      { category: "Verb Agreement", this_that: "This/That + is", these_those: "These/Those + are", wrong: "This are ✗ / These is ✗", correct: "This is ✓ / These are ✓", rule: "Match singular/plural!" },

      { category: "As Adjectives", function: "Before nouns", examples: "this book, that car, these shoes, those trees", note: "Describe WHICH one(s)", pattern: "demonstrative + noun" },

      { category: "As Pronouns", function: "Replace nouns", examples: "This is mine. That is yours. These are new. Those are old.", note: "Stand alone in sentence", pattern: "demonstrative + verb" },

      { category: "Common Mistakes", mistake: "Wrong verb", wrong: "This are my book. ✗", correct: "This is my book. ✓", rule: "This/That = singular verb (is)" },
      { category: "Common Mistakes", mistake: "Wrong verb", wrong: "These is books. ✗", correct: "These are books. ✓", rule: "These/Those = plural verb (are)" },
      { category: "Common Mistakes", mistake: "Confusion with possessives", these: "These (demonstrative)", thesis: "Don't confuse with 'this is'" },

      { category: "Distance Logic", near: "This/These = here (with me)", far: "That/Those = there (away)", metaphor: "Also time: 'those days' (past)", note: "Physical or conceptual distance" },

      { category: "Special Uses", phone: "This is John speaking.", introduction: "This is my friend, Tom.", reference: "That was amazing!", idiom: "This and that (various things)" },
    ]
  },
  
  speakingPractice: [
    { question: "What is this in your hand?", answer: "This is my book.", multipleChoice: { prompt: "___ my book.", options: [{ letter: "A", text: "These are", correct: false }, { letter: "B", text: "That is", correct: false }, { letter: "C", text: "This is", correct: true }] } },
    { question: "What is that building over there?", answer: "That is a hospital.", multipleChoice: { prompt: "___ a hospital.", options: [{ letter: "A", text: "Those are", correct: false }, { letter: "B", text: "This is", correct: false }, { letter: "C", text: "That is", correct: true }] } },
    { question: "Are these your keys on the table?", answer: "Yes, these are my keys.", multipleChoice: { prompt: "Yes, ___ my keys.", options: [{ letter: "A", text: "This is", correct: false }, { letter: "B", text: "Those are", correct: false }, { letter: "C", text: "These are", correct: true }] } },
    { question: "Are those your parents at the door?", answer: "Yes, those are my parents.", multipleChoice: { prompt: "Yes, ___ my parents.", options: [{ letter: "A", text: "These are", correct: false }, { letter: "B", text: "That is", correct: false }, { letter: "C", text: "Those are", correct: true }] } },
    { question: "Is this your phone or your sister's?", answer: "This is my phone.", multipleChoice: { prompt: "___ my phone.", options: [{ letter: "A", text: "These are", correct: false }, { letter: "B", text: "This is", correct: true }, { letter: "C", text: "That is", correct: false }] } },
    { question: "Is that your car in the parking lot?", answer: "Yes, that is my car.", multipleChoice: { prompt: "Yes, ___ my car.", options: [{ letter: "A", text: "That is", correct: true }, { letter: "B", text: "Those are", correct: false }, { letter: "C", text: "This is", correct: false }] } },
    { question: "Are these pens or pencils?", answer: "These are pens.", multipleChoice: { prompt: "___ pens.", options: [{ letter: "A", text: "These are", correct: true }, { letter: "B", text: "Those are", correct: false }, { letter: "C", text: "This is", correct: false }] } },
    { question: "Are those your friends from school?", answer: "Yes, those are my friends.", multipleChoice: { prompt: "Yes, ___ my friends.", options: [{ letter: "A", text: "Those are", correct: true }, { letter: "B", text: "That is", correct: false }, { letter: "C", text: "These are", correct: false }] } },
    { question: "What are these in the bowl?", answer: "These are apples.", multipleChoice: { prompt: "___ apples.", options: [{ letter: "A", text: "Those are", correct: false }, { letter: "B", text: "These are", correct: true }, { letter: "C", text: "This is", correct: false }] } },
    { question: "What are those in the room?", answer: "Those are chairs.", multipleChoice: { prompt: "___ chairs.", options: [{ letter: "A", text: "That is", correct: false }, { letter: "B", text: "Those are", correct: true }, { letter: "C", text: "These are", correct: false }] } },
    { question: "Is this your bag under the desk?", answer: "Yes, this is my bag.", multipleChoice: { prompt: "Yes, ___ my bag.", options: [{ letter: "A", text: "These are", correct: false }, { letter: "B", text: "This is", correct: true }, { letter: "C", text: "That is", correct: false }] } },
    { question: "Is that your friend's house on the left?", answer: "Yes, that is her house.", multipleChoice: { prompt: "Yes, ___ her house.", options: [{ letter: "A", text: "That is", correct: true }, { letter: "B", text: "Those are", correct: false }, { letter: "C", text: "This is", correct: false }] } },
    { question: "Are these your brother's shoes by the door?", answer: "Yes, these are his shoes.", multipleChoice: { prompt: "Yes, ___ his shoes.", options: [{ letter: "A", text: "These are", correct: true }, { letter: "B", text: "This is", correct: false }, { letter: "C", text: "Those are", correct: false }] } },
    { question: "Are those your friends' jackets on the chair?", answer: "Yes, those are their jackets.", multipleChoice: { prompt: "Yes, ___ their jackets.", options: [{ letter: "A", text: "Those are", correct: true }, { letter: "B", text: "These are", correct: false }, { letter: "C", text: "That is", correct: false }] } },
    { question: "Is this a cat or a rabbit?", answer: "This is a cat.", multipleChoice: { prompt: "___ a cat.", options: [{ letter: "A", text: "That is", correct: false }, { letter: "B", text: "This is", correct: true }, { letter: "C", text: "These are", correct: false }] } },
    { question: "Is that a dog or a fox?", answer: "That is a dog.", multipleChoice: { prompt: "___ a dog.", options: [{ letter: "A", text: "This is", correct: false }, { letter: "B", text: "That is", correct: true }, { letter: "C", text: "Those are", correct: false }] } },
    { question: "Are those your friends over there?", answer: "Yes, those are my friends.", multipleChoice: { prompt: "Yes, ___ my friends.", options: [{ letter: "A", text: "These are", correct: false }, { letter: "B", text: "Those are", correct: true }, { letter: "C", text: "That is", correct: false }] } },
    { question: "Are those your cousins from Ankara?", answer: "Yes, those are my cousins.", multipleChoice: { prompt: "Yes, ___ my cousins.", options: [{ letter: "A", text: "Those are", correct: true }, { letter: "B", text: "These are", correct: false }, { letter: "C", text: "That is", correct: false }] } },
    { question: "What is this on your plate?", answer: "This is a sandwich.", multipleChoice: { prompt: "___ a sandwich.", options: [{ letter: "A", text: "This is", correct: true }, { letter: "B", text: "That is", correct: false }, { letter: "C", text: "These are", correct: false }] } },
    { question: "What is that sign?", answer: "That is a bus stop.", multipleChoice: { prompt: "___ a bus stop.", options: [{ letter: "A", text: "That is", correct: true }, { letter: "B", text: "This is", correct: false }, { letter: "C", text: "Those are", correct: false }] } },
    { question: "What are these in the bag?", answer: "These are oranges.", multipleChoice: { prompt: "___ oranges.", options: [{ letter: "A", text: "This is", correct: false }, { letter: "B", text: "Those are", correct: false }, { letter: "C", text: "These are", correct: true }] } },
    { question: "What are those outside the school?", answer: "Those are bicycles.", multipleChoice: { prompt: "___ bicycles.", options: [{ letter: "A", text: "These are", correct: false }, { letter: "B", text: "That is", correct: false }, { letter: "C", text: "Those are", correct: true }] } },
    { question: "Is this a watch or a clock?", answer: "This is a watch.", multipleChoice: { prompt: "___ a watch.", options: [{ letter: "A", text: "That is", correct: false }, { letter: "B", text: "These are", correct: false }, { letter: "C", text: "This is", correct: true }] } },
    { question: "Is that your laptop on the desk?", answer: "Yes, that is my laptop.", multipleChoice: { prompt: "Yes, ___ my laptop.", options: [{ letter: "A", text: "Those are", correct: false }, { letter: "B", text: "This is", correct: false }, { letter: "C", text: "That is", correct: true }] } },
    { question: "Are these all your books?", answer: "Yes, these are my books.", multipleChoice: { prompt: "Yes, ___ my books.", options: [{ letter: "A", text: "Those are", correct: false }, { letter: "B", text: "This is", correct: false }, { letter: "C", text: "These are", correct: true }] } },
    { question: "Are those windows open or closed?", answer: "Those are open.", multipleChoice: { prompt: "___ open.", options: [{ letter: "A", text: "That is", correct: false }, { letter: "B", text: "These are", correct: false }, { letter: "C", text: "Those are", correct: true }] } },
    { question: "What is this on your phone?", answer: "This is a photo of my family.", multipleChoice: { prompt: "___ a photo of my family.", options: [{ letter: "A", text: "That is", correct: false }, { letter: "B", text: "These are", correct: false }, { letter: "C", text: "This is", correct: true }] } },
    { question: "What is that old building over there?", answer: "That is a church.", multipleChoice: { prompt: "___ a church.", options: [{ letter: "A", text: "This is", correct: false }, { letter: "B", text: "Those are", correct: false }, { letter: "C", text: "That is", correct: true }] } },
    { question: "Are these glasses or cups?", answer: "These are glasses.", multipleChoice: { prompt: "___ glasses.", options: [{ letter: "A", text: "This is", correct: false }, { letter: "B", text: "Those are", correct: false }, { letter: "C", text: "These are", correct: true }] } },
    { question: "Are those plates or bowls?", answer: "Those are plates.", multipleChoice: { prompt: "___ plates.", options: [{ letter: "A", text: "Those are", correct: true }, { letter: "B", text: "That is", correct: false }, { letter: "C", text: "These are", correct: false }] } },
    { question: "Is this a map of Istanbul?", answer: "Yes, this is a map.", multipleChoice: { prompt: "Yes, ___ a map.", options: [{ letter: "A", text: "This is", correct: true }, { letter: "B", text: "These are", correct: false }, { letter: "C", text: "That is", correct: false }] } },
    { question: "Is that a mountain or a hill?", answer: "That is a mountain.", multipleChoice: { prompt: "___ a mountain.", options: [{ letter: "A", text: "That is", correct: true }, { letter: "B", text: "Those are", correct: false }, { letter: "C", text: "This is", correct: false }] } },
    { question: "Are these your little cousin's toys?", answer: "Yes, these are toys.", multipleChoice: { prompt: "Yes, ___ toys.", options: [{ letter: "A", text: "Those are", correct: false }, { letter: "B", text: "These are", correct: true }, { letter: "C", text: "This is", correct: false }] } },
    { question: "Are those cars or vans?", answer: "Those are cars.", multipleChoice: { prompt: "___ cars.", options: [{ letter: "A", text: "That is", correct: false }, { letter: "B", text: "Those are", correct: true }, { letter: "C", text: "These are", correct: false }] } },
    { question: "What is this on the desk?", answer: "This is my notebook.", multipleChoice: { prompt: "___ my notebook.", options: [{ letter: "A", text: "These are", correct: false }, { letter: "B", text: "This is", correct: true }, { letter: "C", text: "That is", correct: false }] } },
    { question: "What is that on the wall?", answer: "That is a clock.", multipleChoice: { prompt: "___ a clock.", options: [{ letter: "A", text: "That is", correct: true }, { letter: "B", text: "Those are", correct: false }, { letter: "C", text: "This is", correct: false }] } },
    { question: "Are those birds or bats up there?", answer: "Yes, those are birds.", multipleChoice: { prompt: "Yes, ___ birds.", options: [{ letter: "A", text: "Those are", correct: true }, { letter: "B", text: "That is", correct: false }, { letter: "C", text: "These are", correct: false }] } },
    { question: "Are those trees in the garden?", answer: "Yes, those are trees.", multipleChoice: { prompt: "Yes, ___ trees.", options: [{ letter: "A", text: "Those are", correct: true }, { letter: "B", text: "These are", correct: false }, { letter: "C", text: "That is", correct: false }] } },
    { question: "Is this a book or a notebook?", answer: "This is a notebook.", multipleChoice: { prompt: "___ a notebook.", options: [{ letter: "A", text: "That is", correct: false }, { letter: "B", text: "This is", correct: true }, { letter: "C", text: "These are", correct: false }] } },
    { question: "Is that a mirror or a painting on the wall?", answer: "That is a mirror.", multipleChoice: { prompt: "___ a mirror.", options: [{ letter: "A", text: "This is", correct: false }, { letter: "B", text: "That is", correct: true }, { letter: "C", text: "Those are", correct: false }] } },
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
  
  table: {
    title: "📋 There is/There are: Negative Sentences",
    data: [
      { category: "Structure", negative_singular: "There isn't + singular noun", negative_plural: "There aren't + plural noun", turkish: "Yok (bir şey bulunmuyor)", function: "To say something does NOT exist" },

      { category: "There isn't - Singular", form: "There isn't", full_form: "There is not", contraction: "There isn't (more common)", example: "There isn't a dog in the garden.", turkish: "Bahçede köpek yok.", usage: "ONE thing doesn't exist" },
      { category: "There isn't - Singular", pattern: "There isn't + a/an + singular noun", examples: "There isn't a book. / There isn't an apple.", note: "Use with COUNTABLE singular", with_location: "There isn't a chair in the room." },

      { category: "There isn't - Uncountable", form: "There isn't", usage: "With uncountable nouns", example: "There isn't milk in the fridge.", turkish: "Buzdolabında süt yok.", note: "NO article (a/an) with uncountable!" },
      { category: "There isn't - Uncountable", uncountable_examples: "There isn't water. / There isn't time. / There isn't money.", pattern: "There isn't + uncountable noun (NO a/an)", common_uncountables: "water, milk, bread, time, money" },

      { category: "There aren't - Plural", form: "There aren't", full_form: "There are not", contraction: "There aren't (more common)", example: "There aren't flowers in the vase.", turkish: "Vazoda çiçek yok.", usage: "MULTIPLE things don't exist" },
      { category: "There aren't - Plural", pattern: "There aren't (any) + plural noun", examples: "There aren't books. / There aren't any students.", note: "'any' optional but common", with_any: "There aren't any chairs." },

      { category: "With 'any'", usage: "Often use 'any' in negatives", with_singular: "There isn't any milk.", with_plural: "There aren't any books.", turkish: "hiç (yok)", meaning: "Not even one" },
      { category: "With 'any'", examples_any: "There isn't any water. / There aren't any people.", without_any: "Also correct without 'any'", preference: "'any' is more natural" },

      { category: "Positive → Negative", positive_singular: "There is a book. →", negative_singular: "There isn't a book.", positive_plural: "There are books. →", negative_plural: "There aren't books.", transformation: "Add 'not' after is/are" },

      { category: "Common Mistakes", mistake: "Wrong form for plural", wrong: "There isn't books. ✗", correct: "There aren't books. ✓", rule: "Plural nouns need 'aren't'!" },
      { category: "Common Mistakes", mistake: "Article with uncountable", wrong: "There isn't a water. ✗", correct: "There isn't water. ✓", rule: "NO a/an with uncountable nouns!" },
      { category: "Common Mistakes", mistake: "Using 'no' incorrectly", wrong: "There no is milk. ✗", correct: "There isn't any milk. ✓ / There is no milk. ✓", note: "Two correct ways" },

      { category: "Alternative: 'no'", alternative_form: "There is no + noun", singular: "There is no book. (= There isn't a book.)", plural: "There are no books. (= There aren't any books.)", note: "Stronger, more emphatic" },
      { category: "Alternative: 'no'", examples: "There is no time. / There are no students.", comparison: "There isn't = normal negative", comparison2: "'no' = emphatic negative", both_correct: "Both ways are fine!" },

      { category: "With Locations", pattern: "There isn't/aren't + noun + location", examples: "There isn't a pen on the desk. / There aren't books in the bag.", prepositions: "in, on, under, next to, etc.", location_important: "Where something is NOT" },

      { category: "Short Answers", question: "Is there a book?", answer_no: "No, there isn't.", question_plural: "Are there books?", answer_no_plural: "No, there aren't.", note: "Match the question form!" },
    ]
  },
  
  speakingPractice: [
    { question: "Do you have a car?", answer: "Yes, I have a car.", multipleChoice: { prompt: "Yes, I ___ a car.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "Is that an elephant?", answer: "Yes, it’s an elephant.", multipleChoice: { prompt: "Yes, ___ an elephant.", options: [{ letter: "A", text: "it’ing", correct: false }, { letter: "B", text: "it’", correct: false }, { letter: "C", text: "it’s", correct: true }] } },
    { question: "Where is the book?", answer: "The book is on the table.", multipleChoice: { prompt: "The book ___ on the table.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Did you see a bird?", answer: "Yes, I saw a bird.", multipleChoice: { prompt: "Yes, I ___ a bird.", options: [{ letter: "A", text: "saws", correct: false }, { letter: "B", text: "sawed", correct: false }, { letter: "C", text: "saw", correct: true }] } },
    { question: "Is that a pencil?", answer: "Yes, that’s a pencil.", multipleChoice: { prompt: "Yes, ___ a pencil.", options: [{ letter: "A", text: "that’ing", correct: false }, { letter: "B", text: "that’s", correct: true }, { letter: "C", text: "that’", correct: false }] } },
    { question: "Do you want an apple?", answer: "Yes, I want an apple.", multipleChoice: { prompt: "Yes, ___ want an apple.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Is this the right answer?", answer: "Yes, it’s the right answer.", multipleChoice: { prompt: "Yes, ___ the right answer.", options: [{ letter: "A", text: "it’s", correct: true }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’", correct: false }] } },
    { question: "Do you have a dog?", answer: "Yes, I have a dog.", multipleChoice: { prompt: "Yes, I ___ a dog.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "has", correct: false }] } },
    { question: "Is it an old house?", answer: "Yes, it’s an old house.", multipleChoice: { prompt: "Yes, it’s an ___ house.", options: [{ letter: "A", text: "young", correct: false }, { letter: "B", text: "old", correct: true }, { letter: "C", text: "new", correct: false }] } },
    { question: "Where is the teacher?", answer: "The teacher is in the room.", multipleChoice: { prompt: "The teacher ___ in the room.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Did he buy a book?", answer: "Yes, he bought a book.", multipleChoice: { prompt: "Yes, he ___ a book.", options: [{ letter: "A", text: "buys", correct: false }, { letter: "B", text: "bought", correct: true }, { letter: "C", text: "buy", correct: false }] } },
    { question: "Do you want an orange?", answer: "Yes, I want an orange.", multipleChoice: { prompt: "Yes, ___ want an orange.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Is that the hospital?", answer: "Yes, that’s the hospital.", multipleChoice: { prompt: "Yes, ___ the hospital.", options: [{ letter: "A", text: "that’s", correct: true }, { letter: "B", text: "that’", correct: false }, { letter: "C", text: "that’ing", correct: false }] } },
    { question: "Do you have a pen?", answer: "Yes, I have a pen.", multipleChoice: { prompt: "Yes, I ___ a pen.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "had", correct: false }] } },
    { question: "Is that an egg?", answer: "Yes, it’s an egg.", multipleChoice: { prompt: "Yes, ___ an egg.", options: [{ letter: "A", text: "it’", correct: false }, { letter: "B", text: "it’s", correct: true }, { letter: "C", text: "it’ing", correct: false }] } },
    { question: "Where is the bus stop?", answer: "The bus stop is over there.", multipleChoice: { prompt: "The bus stop ___ over there.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Did she see a movie?", answer: "Yes, she saw a movie.", multipleChoice: { prompt: "Yes, she ___ a movie.", options: [{ letter: "A", text: "sees", correct: false }, { letter: "B", text: "saw", correct: true }, { letter: "C", text: "see", correct: false }] } },
    { question: "Do you have an umbrella?", answer: "Yes, I have an umbrella.", multipleChoice: { prompt: "Yes, I ___ an umbrella.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "had", correct: false }] } },
    { question: "Is that the train station?", answer: "Yes, it’s the train station.", multipleChoice: { prompt: "Yes, ___ the train station.", options: [{ letter: "A", text: "it’s", correct: true }, { letter: "B", text: "it’", correct: false }, { letter: "C", text: "it’ing", correct: false }] } },
    { question: "Do you want a sandwich?", answer: "Yes, I want a sandwich.", multipleChoice: { prompt: "Yes, ___ want a sandwich.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Is this an ice cream?", answer: "Yes, it’s an ice cream.", multipleChoice: { prompt: "Yes, ___ an ice cream.", options: [{ letter: "A", text: "it’", correct: false }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’s", correct: true }] } },
    { question: "Where is the chair?", answer: "The chair is next to the table.", multipleChoice: { prompt: "The chair ___ next to the table.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Do you see a cloud?", answer: "Yes, I see a cloud.", multipleChoice: { prompt: "Yes, ___ see a cloud.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Is that an island?", answer: "Yes, that’s an island.", multipleChoice: { prompt: "Yes, ___ an island.", options: [{ letter: "A", text: "that’ing", correct: false }, { letter: "B", text: "that’", correct: false }, { letter: "C", text: "that’s", correct: true }] } },
    { question: "Do you like the movie?", answer: "Yes, I like the movie.", multipleChoice: { prompt: "Yes, I ___ the movie.", options: [{ letter: "A", text: "likeed", correct: false }, { letter: "B", text: "likes", correct: false }, { letter: "C", text: "like", correct: true }] } },
    { question: "Do you need a notebook?", answer: "Yes, I need a notebook.", multipleChoice: { prompt: "Yes, ___ need a notebook.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Is it an idea?", answer: "Yes, it’s an idea.", multipleChoice: { prompt: "Yes, ___ an idea.", options: [{ letter: "A", text: "it’", correct: false }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’s", correct: true }] } },
    { question: "Where is the teacher’s desk?", answer: "The desk is near the window.", multipleChoice: { prompt: "The desk ___ near the window.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Did you bring a camera?", answer: "Yes, I brought a camera.", multipleChoice: { prompt: "Yes, ___ brought a camera.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Do you need an eraser?", answer: "Yes, I need an eraser.", multipleChoice: { prompt: "Yes, ___ need an eraser.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Where is the clock?", answer: "The clock is on the wall.", multipleChoice: { prompt: "The clock ___ on the wall.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Do you have a question?", answer: "Yes, I have a question.", multipleChoice: { prompt: "Yes, I ___ a question.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "has", correct: false }] } },
    { question: "Is that an animal?", answer: "Yes, that’s an animal.", multipleChoice: { prompt: "Yes, ___ an animal.", options: [{ letter: "A", text: "that’ing", correct: false }, { letter: "B", text: "that’s", correct: true }, { letter: "C", text: "that’", correct: false }] } },
    { question: "Where is the airport?", answer: "The airport is near the city.", multipleChoice: { prompt: "The airport ___ near the city.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Do you want a banana?", answer: "Yes, I want a banana.", multipleChoice: { prompt: "Yes, ___ want a banana.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "Is this an envelope?", answer: "Yes, it’s an envelope.", multipleChoice: { prompt: "Yes, ___ an envelope.", options: [{ letter: "A", text: "it’s", correct: true }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’", correct: false }] } },
    { question: "Where is the restaurant?", answer: "The restaurant is downtown.", multipleChoice: { prompt: "The restaurant ___ downtown.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Do you see a rainbow?", answer: "Yes, I see a rainbow.", multipleChoice: { prompt: "Yes, ___ see a rainbow.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Is that an artist?", answer: "Yes, that’s an artist.", multipleChoice: { prompt: "Yes, ___ an artist.", options: [{ letter: "A", text: "that’", correct: false }, { letter: "B", text: "that’s", correct: true }, { letter: "C", text: "that’ing", correct: false }] } },
    { question: "Do you hear the noise?", answer: "Yes, I hear the noise.", multipleChoice: { prompt: "Yes, ___ hear the noise.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "he", correct: false }] } },
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
  
  table: {
    title: "📋 There is/There are: Question Sentences",
    data: [
      { category: "Structure", question_singular: "Is there + singular noun?", question_plural: "Are there + plural nouns?", turkish: "Var mı? (bir şey var mı diye sormak)", function: "To ask if something exists" },

      { category: "Is there - Singular", form: "Is there", pattern: "Is there + a/an + singular noun?", example: "Is there a pen on the desk?", turkish: "Masada kalem var mı?", usage: "Asking about ONE thing" },
      { category: "Is there - Singular", structure: "Is there + a/an + noun + location?", examples: "Is there a book? / Is there an apple?", with_location: "Is there a chair in the room?", note: "Use 'a/an' with countable singular" },
      { category: "Is there - Singular", short_answer_yes: "Yes, there is.", short_answer_no: "No, there isn't.", full_answer: "Yes, there is a pen on the desk.", answer_rule: "Match the question form!" },

      { category: "Is there - Uncountable", form: "Is there", pattern: "Is there + uncountable noun?", example: "Is there water in the glass?", turkish: "Bardakta su var mı?", note: "NO a/an with uncountable!" },
      { category: "Is there - Uncountable", uncountable_examples: "Is there milk? / Is there time? / Is there money?", common_uncountables: "water, milk, bread, time, money, coffee", answer_yes: "Yes, there is.", answer_no: "No, there isn't." },

      { category: "Are there - Plural", form: "Are there", pattern: "Are there (any) + plural noun?", example: "Are there any books in your bag?", turkish: "Çantanda kitap var mı?", usage: "Asking about MULTIPLE things" },
      { category: "Are there - Plural", structure: "Are there + plural noun + location?", examples: "Are there students? / Are there any chairs?", with_any: "'any' is very common in questions", note: "Makes question more natural" },
      { category: "Are there - Plural", short_answer_yes: "Yes, there are.", short_answer_no: "No, there aren't.", full_answer: "Yes, there are books in my bag.", answer_rule: "Use 'are' for plural!" },

      { category: "With 'any'", usage: "Very common in questions", singular_uncountable: "Is there any milk?", plural: "Are there any books?", meaning: "Asking if even ONE exists", note: "More natural than without 'any'" },
      { category: "With 'any'", examples: "Is there any coffee? / Are there any students?", optional: "Can omit 'any' but less natural", preferred: "Usually include 'any' in questions" },

      { category: "Statement → Question", positive: "There is a book. →", question: "Is there a book?", positive_plural: "There are books. →", question_plural: "Are there books?", transformation: "Move is/are to the START" },

      { category: "Inversion", rule: "Verb comes BEFORE 'there'", wrong: "There is a book? ✗", correct: "Is there a book? ✓", pattern: "Is/Are + there + noun?", note: "Inversion creates question!" },

      { category: "Common Mistakes", mistake: "Not inverting", wrong: "There is a pen? ✗", correct: "Is there a pen? ✓", rule: "Must move 'is/are' to front!" },
      { category: "Common Mistakes", mistake: "Wrong verb for plural", wrong: "Is there books? ✗", correct: "Are there books? ✓", rule: "Plural nouns need 'Are'!" },
      { category: "Common Mistakes", mistake: "Article with uncountable", wrong: "Is there a water? ✗", correct: "Is there water? ✓", rule: "NO a/an with uncountable!" },

      { category: "How many?", follow_up: "If answer is yes, ask quantity", question: "How many books are there?", answer: "There are five books.", pattern: "How many + plural noun + are there?", note: "Asking for number" },

      { category: "Rising Intonation", pronunciation: "Voice goes UP at end", example: "Is there a book? ↗", natural: "Shows it's a question", turkish_note: "Like 'var mı?' in Turkish" },

      { category: "Practical Examples", at_home: "Is there food in the fridge?", at_school: "Are there students in the classroom?", at_work: "Is there a meeting today?", shopping: "Are there apples at the store?" },
    ]
  },
  
  speakingPractice: [
    { question: "Do you have any books?", answer: "Yes, I have many books.", multipleChoice: { prompt: "Yes, I ___ many books.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "Are those your pens?", answer: "Yes, those are my pens.", multipleChoice: { prompt: "Yes, ___ my pens.", options: [{ letter: "A", text: "That is", correct: false }, { letter: "B", text: "These are", correct: false }, { letter: "C", text: "Those are", correct: true }] } },
    { question: "Where are the babies?", answer: "The babies are in the room.", multipleChoice: { prompt: "The babies ___ in the room.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Do you see the buses?", answer: "Yes, I see the buses.", multipleChoice: { prompt: "Yes, ___ see the buses.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Are the boxes heavy?", answer: "Yes, the boxes are heavy.", multipleChoice: { prompt: "Yes, the boxes ___ heavy.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Do the children play here?", answer: "Yes, the children play here.", multipleChoice: { prompt: "Yes, the ___ play here.", options: [{ letter: "A", text: "childs", correct: false }, { letter: "B", text: "childrens", correct: false }, { letter: "C", text: "children", correct: true }] } },
    { question: "Are the men in the hall?", answer: "Yes, the men are in the hall.", multipleChoice: { prompt: "Yes, the men ___ in the hall.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "Are the women teachers?", answer: "Yes, the women are teachers.", multipleChoice: { prompt: "Yes, the women ___ teachers.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "Where are your feet?", answer: "My feet are under the table.", multipleChoice: { prompt: "My feet ___ under the table.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Do you have clean teeth?", answer: "Yes, my teeth are clean.", multipleChoice: { prompt: "Yes, my teeth ___ clean.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Are those mice?", answer: "Yes, those are mice.", multipleChoice: { prompt: "Yes, ___ mice.", options: [{ letter: "A", text: "That is", correct: false }, { letter: "B", text: "Those are", correct: true }, { letter: "C", text: "These are", correct: false }] } },
    { question: "Do sheep live on farms?", answer: "Yes, sheep live on farms.", multipleChoice: { prompt: "Yes, ___ live on farms.", options: [{ letter: "A", text: "sheeps", correct: false }, { letter: "B", text: "sheepes", correct: false }, { letter: "C", text: "sheep", correct: true }] } },
    { question: "Are fish in the pond?", answer: "Yes, fish are in the pond.", multipleChoice: { prompt: "Yes, fish ___ in the pond.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "Where are the chairs?", answer: "The chairs are in the kitchen.", multipleChoice: { prompt: "The chairs ___ in the kitchen.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "Do you like apples?", answer: "Yes, I like apples.", multipleChoice: { prompt: "Yes, I ___ apples.", options: [{ letter: "A", text: "likes", correct: false }, { letter: "B", text: "like", correct: true }, { letter: "C", text: "likeed", correct: false }] } },
    { question: "Are your hands cold?", answer: "Yes, my hands are cold.", multipleChoice: { prompt: "Yes, my hands ___ cold.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "Do you need glasses?", answer: "Yes, I need glasses.", multipleChoice: { prompt: "Yes, ___ need glasses.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "he", correct: false }] } },
    { question: "Are those your keys?", answer: "Yes, those are my keys.", multipleChoice: { prompt: "Yes, ___ my keys.", options: [{ letter: "A", text: "Those are", correct: true }, { letter: "B", text: "These are", correct: false }, { letter: "C", text: "That is", correct: false }] } },
    { question: "Where are your shoes?", answer: "My shoes are near the door.", multipleChoice: { prompt: "My shoes ___ near the door.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "Do birds fly?", answer: "Yes, birds fly.", multipleChoice: { prompt: "Yes, ___ fly.", options: [{ letter: "A", text: "birds", correct: true }, { letter: "B", text: "bird", correct: false }, { letter: "C", text: "birding", correct: false }] } },
    { question: "Are the phones new?", answer: "Yes, the phones are new.", multipleChoice: { prompt: "Yes, the phones ___ new.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Where are the students?", answer: "The students are in the class.", multipleChoice: { prompt: "The students ___ in the class.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are there sandwiches?", answer: "Yes, there are sandwiches.", multipleChoice: { prompt: "Yes, there ___ sandwiches.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Do you see the stars?", answer: "Yes, I see the stars.", multipleChoice: { prompt: "Yes, ___ see the stars.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Are those doors open?", answer: "Yes, those doors are open.", multipleChoice: { prompt: "Yes, those doors ___ open.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Do you need pencils?", answer: "Yes, I need pencils.", multipleChoice: { prompt: "Yes, ___ need pencils.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Are there any buses?", answer: "Yes, there are buses.", multipleChoice: { prompt: "Yes, there ___ buses.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Where are the tomatoes?", answer: "The tomatoes are in the basket.", multipleChoice: { prompt: "The tomatoes ___ in the basket.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Do you eat bananas?", answer: "Yes, I eat bananas.", multipleChoice: { prompt: "Yes, ___ eat bananas.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Are those wolves?", answer: "Yes, those are wolves.", multipleChoice: { prompt: "Yes, ___ wolves.", options: [{ letter: "A", text: "Those are", correct: true }, { letter: "B", text: "That is", correct: false }, { letter: "C", text: "These are", correct: false }] } },
    { question: "Are the knives sharp?", answer: "Yes, the knives are sharp.", multipleChoice: { prompt: "Yes, the knives ___ sharp.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "Do you like eggs?", answer: "Yes, I like eggs.", multipleChoice: { prompt: "Yes, I ___ eggs.", options: [{ letter: "A", text: "like", correct: true }, { letter: "B", text: "likeed", correct: false }, { letter: "C", text: "likes", correct: false }] } },
    { question: "Where are the toys?", answer: "The toys are on the floor.", multipleChoice: { prompt: "The toys ___ on the floor.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Do you hear the drums?", answer: "Yes, I hear the drums.", multipleChoice: { prompt: "Yes, ___ hear the drums.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "Are those your socks?", answer: "Yes, those are my socks.", multipleChoice: { prompt: "Yes, ___ my socks.", options: [{ letter: "A", text: "That is", correct: false }, { letter: "B", text: "Those are", correct: true }, { letter: "C", text: "These are", correct: false }] } },
    { question: "Are these desks?", answer: "Yes, these are desks.", multipleChoice: { prompt: "Yes, ___ desks.", options: [{ letter: "A", text: "These are", correct: true }, { letter: "B", text: "Those are", correct: false }, { letter: "C", text: "This is", correct: false }] } },
    { question: "Do you have cousins?", answer: "Yes, I have cousins.", multipleChoice: { prompt: "Yes, I ___ cousins.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "has", correct: false }] } },
    { question: "Are there bees in the garden?", answer: "Yes, there are bees.", multipleChoice: { prompt: "Yes, there ___ bees.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "Do cows give milk?", answer: "Yes, cows give milk.", multipleChoice: { prompt: "Yes, ___ give milk.", options: [{ letter: "A", text: "cow", correct: false }, { letter: "B", text: "cows", correct: true }, { letter: "C", text: "cowing", correct: false }] } },
    { question: "Are there flies in the room?", answer: "Yes, there are flies.", multipleChoice: { prompt: "Yes, there ___ flies.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: true }] } },
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
  
  table: {
    title: "📋 There is/There are: Positive Sentences",
    data: [
      { category: "Structure", positive_singular: "There is + singular noun", positive_plural: "There are + plural nouns", turkish: "Var (bir şey var/bulunuyor)", function: "To say something EXISTS" },

      { category: "There is - Singular", form: "There is", pattern: "There is + a/an + singular noun", example: "There is a dog in the garden.", turkish: "Bahçede bir köpek var.", usage: "ONE thing exists" },
      { category: "There is - Singular", structure: "There is + a/an + noun + location", examples: "There is a book. / There is an apple.", with_location: "There is a chair in the room.", note: "Use 'a/an' with countable singular" },
      { category: "There is - Singular", contraction: "There's (informal)", contracted_example: "There's a book on the table.", full_form: "There is (more formal)", common_use: "There's in speech" },

      { category: "There is - Uncountable", form: "There is", pattern: "There is + uncountable noun", example: "There is water in the glass.", turkish: "Bardakta su var.", note: "NO article (a/an) with uncountable!" },
      { category: "There is - Uncountable", uncountable_examples: "There is milk. / There is time. / There is money.", common_uncountables: "water, milk, bread, time, money, coffee, tea", no_article: "NO 'a/an' before uncountable!" },

      { category: "There are - Plural", form: "There are", pattern: "There are + plural noun", example: "There are flowers in the vase.", turkish: "Vazoda çiçekler var.", usage: "MULTIPLE things exist" },
      { category: "There are - Plural", structure: "There are + number/some/many + plural noun", examples: "There are three cats. / There are some books.", with_numbers: "There are two cars in the garage.", with_quantifiers: "some, many, a few" },
      { category: "There are - Plural", contraction: "There're (rare)", note: "Rarely used in speech", preferred: "Usually say 'There are' fully" },

      { category: "With Numbers", singular: "There is one book.", plural: "There are two books. / There are five chairs.", note: "Number 1 = singular (is)", note2: "Numbers 2+ = plural (are)" },

      { category: "With Quantifiers", with_is: "There is some milk. (uncountable)", with_are: "There are some apples. (plural)", common_quantifiers: "some, many, a few, a lot of", usage: "Show approximate amount" },

      { category: "Common Mistakes", mistake: "Wrong verb for plural", wrong: "There is books. ✗", correct: "There are books. ✓", rule: "Plural nouns need 'are'!" },
      { category: "Common Mistakes", mistake: "Article with uncountable", wrong: "There is a water. ✗", correct: "There is water. ✓", rule: "NO a/an with uncountable!" },
      { category: "Common Mistakes", mistake: "Forgetting article with singular", wrong: "There is book. ✗", correct: "There is a book. ✓", rule: "Singular countable needs 'a/an'!" },

      { category: "Positive → Negative", positive_singular: "There is a pen. →", negative_singular: "There isn't a pen.", positive_plural: "There are books. →", negative_plural: "There aren't books.", transformation: "Add 'not' after is/are" },

      { category: "With Locations", pattern: "There is/are + noun + location", examples: "There is a pen on the desk. / There are books in the bag.", prepositions: "in, on, under, next to, behind, etc.", location_common: "Very common pattern!" },

      { category: "Uses", use1: "Talk about existence", use2: "Describe what's in a place", use3: "List items", example_describe: "There's a sofa in the living room.", example_list: "There are apples, oranges, and bananas." },

      { category: "Turkish vs English", turkish_structure: "In Turkish: subject + VAR", english_structure: "In English: THERE + is/are + subject", example_turkish: "Masa var.", example_english: "There is a table.", note: "English needs 'there' + verb!" },
    ]
  },
  
  speakingPractice: [
    { question: "Is there a dog in the park?", answer: "Yes, there is a dog in the park.", multipleChoice: { prompt: "Yes, there ___ a dog in the park.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are there any students in the classroom?", answer: "Yes, there are two students.", multipleChoice: { prompt: "Yes, there ___ two students.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is there a book on the table?", answer: "Yes, there is a book on the table.", multipleChoice: { prompt: "Yes, there ___ a book on the table.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are there any apples in the basket?", answer: "Yes, there are apples in the basket.", multipleChoice: { prompt: "Yes, there ___ apples in the basket.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is there a pen in your bag?", answer: "Yes, there is a pen in my bag.", multipleChoice: { prompt: "Yes, there ___ a pen in my bag.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "How many chairs are there in the kitchen?", answer: "There are four chairs in the kitchen.", multipleChoice: { prompt: "There ___ four chairs in the kitchen.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is there a cat on the roof?", answer: "No, there isn’t a cat on the roof.", multipleChoice: { prompt: "No, there ___ a cat on the roof.", options: [{ letter: "A", text: "isn’t", correct: true }, { letter: "B", text: "aren’t", correct: false }, { letter: "C", text: "wasn’t", correct: false }] } },
    { question: "Are there many cars outside?", answer: "Yes, there are many cars on the street.", multipleChoice: { prompt: "Yes, there ___ many cars on the street.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is there a computer on the desk?", answer: "Yes, there is a computer on the desk.", multipleChoice: { prompt: "Yes, there ___ a computer on the desk.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are there birds in the tree?", answer: "Yes, there are many birds in the tree.", multipleChoice: { prompt: "Yes, there ___ many birds in the tree.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is there a phone in your pocket?", answer: "Yes, there is a phone in my pocket.", multipleChoice: { prompt: "Yes, there ___ a phone in my pocket.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are there shoes under the bed?", answer: "Yes, there are shoes under the bed.", multipleChoice: { prompt: "Yes, there ___ shoes under the bed.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is there a clock on the wall?", answer: "Yes, there is a clock on the wall.", multipleChoice: { prompt: "Yes, there ___ a clock on the wall.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Are there flowers in the garden?", answer: "Yes, there are red and yellow flowers in the garden.", multipleChoice: { prompt: "Yes, there ___ red and yellow flowers in the garden.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "Is there milk in the fridge?", answer: "Yes, there is milk in the fridge.", multipleChoice: { prompt: "Yes, there ___ milk in the fridge.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "How many books are there on the shelf?", answer: "There are ten books on the shelf.", multipleChoice: { prompt: "There ___ ten books on the shelf.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "Is there a bus at the stop?", answer: "Yes, there is a bus at the stop.", multipleChoice: { prompt: "Yes, there ___ a bus at the stop.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Are there pencils in your bag?", answer: "Yes, there are pencils in my bag.", multipleChoice: { prompt: "Yes, there ___ pencils in my bag.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "Is there a sandwich in the fridge?", answer: "Yes, there is a sandwich in the fridge.", multipleChoice: { prompt: "Yes, there ___ a sandwich in the fridge.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Are there many students at your school?", answer: "Yes, there are many students at my school.", multipleChoice: { prompt: "Yes, there ___ many students at my school.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "Is there a window in your bedroom?", answer: "Yes, there is a window in my bedroom.", multipleChoice: { prompt: "Yes, there ___ a window in my bedroom.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are there clouds in the sky today?", answer: "Yes, there are clouds in the sky.", multipleChoice: { prompt: "Yes, there ___ clouds in the sky.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are there any chairs in this room?", answer: "Yes, there are some chairs in this room.", multipleChoice: { prompt: "Yes, there ___ some chairs in this room.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are there any chairs in the corridor?", answer: "Yes, there are chairs in the corridor.", multipleChoice: { prompt: "Yes, there ___ chairs in the corridor.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is there water in the glass?", answer: "Yes, there is water in the glass.", multipleChoice: { prompt: "Yes, there ___ water in the glass.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are there bananas in the kitchen?", answer: "Yes, there are bananas in the kitchen.", multipleChoice: { prompt: "Yes, there ___ bananas in the kitchen.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is there a key in your bag?", answer: "Yes, there is a key in my bag.", multipleChoice: { prompt: "Yes, there ___ a key in my bag.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are there many cats on the street?", answer: "Yes, there are many cats on the street.", multipleChoice: { prompt: "Yes, there ___ many cats on the street.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is there a student waiting outside?", answer: "No, there isn’t a student waiting outside.", multipleChoice: { prompt: "No, there isn’t a ___ waiting outside.", options: [{ letter: "A", text: "teacher", correct: false }, { letter: "B", text: "worker", correct: false }, { letter: "C", text: "student", correct: true }] } },
    { question: "Are there many children in the school?", answer: "Yes, there are many children in school.", multipleChoice: { prompt: "Yes, there ___ many children in school.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is there a towel in the bathroom?", answer: "Yes, there is a towel in the bathroom.", multipleChoice: { prompt: "Yes, there ___ a towel in the bathroom.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are there many people in the shopping center?", answer: "Yes, there are many people in the shopping center.", multipleChoice: { prompt: "Yes, there ___ many people in the shopping center.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is there sugar in baklava?", answer: "Yes, there is sugar in baklava.", multipleChoice: { prompt: "Yes, there ___ sugar in baklava.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are there cold drinks in the fridge?", answer: "Yes, there are drinks in the fridge.", multipleChoice: { prompt: "Yes, there ___ drinks in the fridge.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is there a teacher in the classroom?", answer: "Yes, there is a teacher in the classroom.", multipleChoice: { prompt: "Yes, there ___ a teacher in the classroom.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are there any posters on the wall?", answer: "No, there aren’t posters on the wall.", multipleChoice: { prompt: "No, there ___ posters on the wall.", options: [{ letter: "A", text: "isn’t", correct: false }, { letter: "B", text: "weren’t", correct: false }, { letter: "C", text: "aren’t", correct: true }] } },
    { question: "Is there a problem with your phone?", answer: "No, there isn’t a problem with my phone.", multipleChoice: { prompt: "No, there isn’t a problem ___ my phone.", options: [{ letter: "A", text: "with", correct: true }, { letter: "B", text: "by", correct: false }, { letter: "C", text: "for", correct: false }] } },
    { question: "Are there any magazines in the waiting room?", answer: "Yes, there are some magazines in the waiting room.", multipleChoice: { prompt: "Yes, there ___ some magazines in the waiting room.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "Is there a taxi outside the hotel?", answer: "Yes, there is a outside the hotel.", multipleChoice: { prompt: "Yes, there ___ a outside the hotel.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Are there any restaurants near your house?", answer: "Yes, there are two restaurants near my house.", multipleChoice: { prompt: "Yes, there ___ two restaurants near my house.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: true }] } },
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
  
  table: {
    title: "📋 Plural Nouns: Regular and Irregular Forms",
    data: [
      { category: "What are Plurals?", explanation: "More than one thing", turkish: "Çoğul isimler", function: "Show quantity > 1", usage: "Add -s or special ending" },

      { category: "Regular: Add -s", rule: "Most nouns + s", examples: "cat → cats, dog → dogs, book → books", example_sentence: "There are three cats.", pattern: "noun + s", note: "Most common rule!" },
      { category: "Regular: Add -s", more_examples: "car → cars, pen → pens, table → tables", usage: "99% of regular plurals", pronunciation: "/s/ or /z/ sound" },

      { category: "Regular: Add -es", rule: "Nouns ending in s, ss, sh, ch, x, o", examples: "bus → buses, class → classes, dish → dishes", example_sentence: "There are buses in the city.", pattern: "noun + es", pronunciation: "/ɪz/ sound" },
      { category: "Regular: Add -es", more_examples: "box → boxes, watch → watches, potato → potatoes", note: "Extra syllable added", exceptions: "Some -o words: photo → photos" },

      { category: "Regular: y → ies", rule: "Consonant + y → ies", examples: "baby → babies, city → cities, story → stories", example_sentence: "The babies are sleeping.", pattern: "Remove y, add ies" },
      { category: "Regular: y → ies", note: "If vowel + y, just add -s", vowel_y_examples: "boy → boys, toy → toys, day → days", rule_detail: "Consonant before y = change to ies" },

      { category: "Regular: f/fe → ves", rule: "Some f/fe words → ves", examples: "knife → knives, wife → wives, leaf → leaves", example_sentence: "Autumn leaves are beautiful.", pattern: "Remove f/fe, add ves" },
      { category: "Regular: f/fe → ves", note: "Not all f words!", exceptions: "roof → roofs, chief → chiefs", memorize: "Most common: knife, wife, life, leaf, half" },

      { category: "Irregular: Vowel Change", type: "Irregular", examples: "man → men, woman → women, tooth → teeth", example_sentence: "Three men are waiting.", pattern: "Vowel changes inside word", note: "Must memorize!" },
      { category: "Irregular: Vowel Change", more_examples: "foot → feet, goose → geese, mouse → mice", pronunciation_note: "Vowel sound changes", turkish_note: "No pattern - learn by heart!" },

      { category: "Irregular: Completely Different", type: "Irregular", word: "child", plural: "children", example: "The children are playing outside.", note: "Completely different word!", turkish: "çocuk → çocuklar" },
      { category: "Irregular: Completely Different", type: "Irregular", word: "person", plural: "people", example: "Many people are here.", note: "Most common irregular!", alternative: "persons (formal/legal only)" },

      { category: "Irregular: No Change", type: "Irregular", examples: "sheep → sheep, fish → fish, deer → deer", example_sentence: "I saw three sheep.", note: "Same form for singular and plural!", usage: "One sheep / Two sheep" },

      { category: "Common Mistakes", mistake: "Adding -s to irregular", wrong: "childs ✗, mans ✗, tooths ✗", correct: "children ✓, men ✓, teeth ✓", rule: "Irregular plurals don't take -s!" },
      { category: "Common Mistakes", mistake: "Forgetting to change y", wrong: "babys ✗, citys ✗", correct: "babies ✓, cities ✓", rule: "Consonant + y = change to -ies!" },
      { category: "Common Mistakes", mistake: "Double plural", wrong: "childrens ✗, peoples ✗", correct: "children ✓, people ✓", rule: "Don't add -s to already plural words!" },

      { category: "Uncountable Nouns", note: "Some nouns have NO plural", examples: "water, milk, money, information, advice", usage: "Always singular form", verb: "Use singular verb (is, not are)" },

      { category: "Always Plural", note: "Some nouns only plural", examples: "scissors, glasses, pants, jeans", verb: "Always use 'are'", usage: "a pair of scissors, two pairs of jeans" },
    ]
  },
  
  speakingPractice: [
    { question: "Where is the pen?", answer: "It’s on the table.", multipleChoice: { prompt: "It’s on the ___.", options: [{ letter: "A", text: "table", correct: true }, { letter: "B", text: "chair", correct: false }, { letter: "C", text: "shelf", correct: false }] } },
    { question: "Where are the books?", answer: "They’re in the bag.", multipleChoice: { prompt: "They’re in the ___.", options: [{ letter: "A", text: "basket", correct: false }, { letter: "B", text: "bag", correct: true }, { letter: "C", text: "box", correct: false }] } },
    { question: "Where is the cat?", answer: "It’s under the chair.", multipleChoice: { prompt: "___ under the chair.", options: [{ letter: "A", text: "it’", correct: false }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’s", correct: true }] } },
    { question: "Where is your school?", answer: "It’s next to the bank.", multipleChoice: { prompt: "It’s next to the ___.", options: [{ letter: "A", text: "bank", correct: true }, { letter: "B", text: "shop", correct: false }, { letter: "C", text: "hotel", correct: false }] } },
    { question: "Where is the car?", answer: "It’s behind the building.", multipleChoice: { prompt: "___ behind the building.", options: [{ letter: "A", text: "it’ing", correct: false }, { letter: "B", text: "it’s", correct: true }, { letter: "C", text: "it’", correct: false }] } },
    { question: "Where is the boy?", answer: "He’s in front of the school.", multipleChoice: { prompt: "He’s in front of the ___.", options: [{ letter: "A", text: "library", correct: false }, { letter: "B", text: "station", correct: false }, { letter: "C", text: "school", correct: true }] } },
    { question: "Where are the keys?", answer: "They’re in the drawer.", multipleChoice: { prompt: "They’re in the ___.", options: [{ letter: "A", text: "drawer", correct: true }, { letter: "B", text: "cupboard", correct: false }, { letter: "C", text: "closet", correct: false }] } },
    { question: "Where is your phone?", answer: "It’s on the bed.", multipleChoice: { prompt: "It’s on the ___.", options: [{ letter: "A", text: "desk", correct: false }, { letter: "B", text: "bed", correct: true }, { letter: "C", text: "sofa", correct: false }] } },
    { question: "Where are the shoes?", answer: "They’re under the sofa.", multipleChoice: { prompt: "___ under the sofa.", options: [{ letter: "A", text: "person", correct: false }, { letter: "B", text: "they’re", correct: true }, { letter: "C", text: "thing", correct: false }] } },
    { question: "Where is the remote?", answer: "It’s next to the TV.", multipleChoice: { prompt: "It’s next to the ___.", options: [{ letter: "A", text: "TV", correct: true }, { letter: "B", text: "lamp", correct: false }, { letter: "C", text: "radio", correct: false }] } },
    { question: "Where is the dog?", answer: "It’s behind the door.", multipleChoice: { prompt: "___ behind the door.", options: [{ letter: "A", text: "it’ing", correct: false }, { letter: "B", text: "it’s", correct: true }, { letter: "C", text: "it’", correct: false }] } },
    { question: "Where are your friends?", answer: "They’re in the park.", multipleChoice: { prompt: "They’re in the ___.", options: [{ letter: "A", text: "garden", correct: false }, { letter: "B", text: "street", correct: false }, { letter: "C", text: "park", correct: true }] } },
    { question: "Where is the restaurant?", answer: "It’s in front of the cinema.", multipleChoice: { prompt: "It’s in front of the ___.", options: [{ letter: "A", text: "cinema", correct: true }, { letter: "B", text: "museum", correct: false }, { letter: "C", text: "theatre", correct: false }] } },
    { question: "Where is the picture?", answer: "It’s on the wall.", multipleChoice: { prompt: "It’s on the ___.", options: [{ letter: "A", text: "window", correct: false }, { letter: "B", text: "wall", correct: true }, { letter: "C", text: "door", correct: false }] } },
    { question: "Where is your notebook?", answer: "It’s in my backpack.", multipleChoice: { prompt: "It’s in my ___.", options: [{ letter: "A", text: "pocket", correct: false }, { letter: "B", text: "wallet", correct: false }, { letter: "C", text: "backpack", correct: true }] } },
    { question: "Where are the apples?", answer: "They’re on the kitchen counter.", multipleChoice: { prompt: "They’re on the kitchen ___.", options: [{ letter: "A", text: "counter", correct: true }, { letter: "B", text: "floor", correct: false }, { letter: "C", text: "sink", correct: false }] } },
    { question: "Where is the glass?", answer: "It’s on the shelf.", multipleChoice: { prompt: "It’s on the ___.", options: [{ letter: "A", text: "chair", correct: false }, { letter: "B", text: "shelf", correct: true }, { letter: "C", text: "table", correct: false }] } },
    { question: "Where is the towel?", answer: "It’s under the sink.", multipleChoice: { prompt: "___ under the sink.", options: [{ letter: "A", text: "it’s", correct: true }, { letter: "B", text: "it’", correct: false }, { letter: "C", text: "it’ing", correct: false }] } },
    { question: "Where are the children?", answer: "They’re behind the house.", multipleChoice: { prompt: "___ behind the house.", options: [{ letter: "A", text: "they’re", correct: true }, { letter: "B", text: "thing", correct: false }, { letter: "C", text: "person", correct: false }] } },
    { question: "Where is the book?", answer: "It’s on the chair.", multipleChoice: { prompt: "It’s on the ___.", options: [{ letter: "A", text: "bed", correct: false }, { letter: "B", text: "chair", correct: true }, { letter: "C", text: "table", correct: false }] } },
    { question: "Where is the ball?", answer: "It’s under the table.", multipleChoice: { prompt: "___ under the table.", options: [{ letter: "A", text: "it’", correct: false }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’s", correct: true }] } },
    { question: "Where are the shoes?", answer: "They’re next to the door.", multipleChoice: { prompt: "They’re next to the ___.", options: [{ letter: "A", text: "door", correct: true }, { letter: "B", text: "window", correct: false }, { letter: "C", text: "wall", correct: false }] } },
    { question: "Where is your bag?", answer: "It’s in front of the mirror.", multipleChoice: { prompt: "It’s in front of the ___.", options: [{ letter: "A", text: "picture", correct: false }, { letter: "B", text: "mirror", correct: true }, { letter: "C", text: "window", correct: false }] } },
    { question: "Where is the chair?", answer: "It’s behind the desk.", multipleChoice: { prompt: "___ behind the desk.", options: [{ letter: "A", text: "it’ing", correct: false }, { letter: "B", text: "it’", correct: false }, { letter: "C", text: "it’s", correct: true }] } },
    { question: "Where are your socks?", answer: "They’re in the drawer.", multipleChoice: { prompt: "They’re in the ___.", options: [{ letter: "A", text: "drawer", correct: true }, { letter: "B", text: "closet", correct: false }, { letter: "C", text: "cupboard", correct: false }] } },
    { question: "Where is the phone charger?", answer: "It’s on the desk.", multipleChoice: { prompt: "It’s on the ___.", options: [{ letter: "A", text: "sofa", correct: false }, { letter: "B", text: "desk", correct: true }, { letter: "C", text: "bed", correct: false }] } },
    { question: "Where are the sandwiches?", answer: "They’re in the fridge.", multipleChoice: { prompt: "They’re in the ___.", options: [{ letter: "A", text: "oven", correct: false }, { letter: "B", text: "freezer", correct: false }, { letter: "C", text: "fridge", correct: true }] } },
    { question: "Where is the umbrella?", answer: "It’s next to the door.", multipleChoice: { prompt: "It’s next to the ___.", options: [{ letter: "A", text: "door", correct: true }, { letter: "B", text: "wall", correct: false }, { letter: "C", text: "window", correct: false }] } },
    { question: "Where is the teacher?", answer: "She’s in front of the class.", multipleChoice: { prompt: "She’s in front of the ___.", options: [{ letter: "A", text: "hall", correct: false }, { letter: "B", text: "class", correct: true }, { letter: "C", text: "office", correct: false }] } },
    { question: "Where are the students?", answer: "They’re in the classroom.", multipleChoice: { prompt: "They’re in the ___.", options: [{ letter: "A", text: "office", correct: false }, { letter: "B", text: "library", correct: false }, { letter: "C", text: "classroom", correct: true }] } },
    { question: "Where is the television?", answer: "It’s on the table.", multipleChoice: { prompt: "It’s on the ___.", options: [{ letter: "A", text: "table", correct: true }, { letter: "B", text: "shelf", correct: false }, { letter: "C", text: "chair", correct: false }] } },
    { question: "Where is your bike?", answer: "It’s behind the house.", multipleChoice: { prompt: "___ behind the house.", options: [{ letter: "A", text: "it’s", correct: true }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’", correct: false }] } },
    { question: "Where are the pens?", answer: "They’re between the books.", multipleChoice: { prompt: "___ between the books.", options: [{ letter: "A", text: "person", correct: false }, { letter: "B", text: "they’re", correct: true }, { letter: "C", text: "thing", correct: false }] } },
    { question: "Where is the map?", answer: "It’s on the wall.", multipleChoice: { prompt: "It’s on the ___.", options: [{ letter: "A", text: "wall", correct: true }, { letter: "B", text: "window", correct: false }, { letter: "C", text: "door", correct: false }] } },
    { question: "Where is the sofa?", answer: "It’s in the living room.", multipleChoice: { prompt: "It’s in the ___.", options: [{ letter: "A", text: "kitchen", correct: false }, { letter: "B", text: "living room", correct: true }, { letter: "C", text: "bedroom", correct: false }] } },
    { question: "Where is the mirror?", answer: "It’s in front of the sink.", multipleChoice: { prompt: "It’s in front of the ___.", options: [{ letter: "A", text: "stove", correct: false }, { letter: "B", text: "counter", correct: false }, { letter: "C", text: "sink", correct: true }] } },
    { question: "Where is the towel?", answer: "It’s on the hanger.", multipleChoice: { prompt: "It’s on the ___.", options: [{ letter: "A", text: "hanger", correct: true }, { letter: "B", text: "hook", correct: false }, { letter: "C", text: "rail", correct: false }] } },
    { question: "Where are your glasses?", answer: "They’re on your head.", multipleChoice: { prompt: "They’re on your ___.", options: [{ letter: "A", text: "foot", correct: false }, { letter: "B", text: "head", correct: true }, { letter: "C", text: "hand", correct: false }] } },
    { question: "Where is the camera?", answer: "It’s in the bag.", multipleChoice: { prompt: "It’s in the ___.", options: [{ letter: "A", text: "box", correct: false }, { letter: "B", text: "basket", correct: false }, { letter: "C", text: "bag", correct: true }] } },
    { question: "Where is the trash can?", answer: "It’s under the sink.", multipleChoice: { prompt: "___ under the sink.", options: [{ letter: "A", text: "it’", correct: false }, { letter: "B", text: "it’s", correct: true }, { letter: "C", text: "it’ing", correct: false }] } },
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
  
  table: {
    title: "📋 Have got/Has got: Positive Sentences (Possession)",
    data: [
      { category: "What is 'have got'?", explanation: "Shows possession/ownership", turkish: "Sahip olmak (-m var, -n var)", meaning: "To have, to own", british_note: "Very common in British English" },

      { category: "With I/You/We/They", form: "have got", subjects: "I, you, we, they", example: "I have got a car.", turkish: "Benim bir arabam var.", contraction: "I've got, You've got, We've got, They've got" },
      { category: "With I/You/We/They", more_examples: "You have got a bike. / We have got a garden. / They have got a dog.", pattern: "subject + have got + object", common_in_speech: "Contractions very common!" },

      { category: "With He/She/It", form: "has got", subjects: "He, she, it", example: "He has got a brother.", turkish: "Onun bir erkek kardeşi var.", contraction: "He's got, She's got, It's got" },
      { category: "With He/She/It", more_examples: "She has got a cat. / It has got four legs.", pattern: "subject + has got + object", note: "Third person singular uses 'has'!" },

      { category: "Contractions", ive_got: "I've got = I have got", youve_got: "You've got = You have got", hes_got: "He's got = He has got", shes_got: "She's got = She has got", usage: "Very natural in speech!" },
      { category: "Contractions", weve_got: "We've got = We have got", theyve_got: "They've got = They have got", its_got: "It's got = It has got", note: "Always contract in spoken English!" },

      { category: "What You Can 'Have Got'", possessions: "I've got a car, a house, money", family: "She's got a brother, two sisters", physical_features: "He's got blue eyes, brown hair", health: "I've got a cold, a headache" },
      { category: "What You Can 'Have Got'", time: "We've got time. / They've got a meeting.", abstract: "You've got a problem. / He's got an idea.", note: "Many different types of possession!" },

      { category: "have got vs have", british: "'have got' (British English)", american: "'have' (American English)", example_brit: "I've got a car.", example_amer: "I have a car.", both_correct: "Both are correct!" },
      { category: "have got vs have", present_only: "'have got' = present tense only", past: "For past: 'I had' (NOT 'I had got')", note: "Can't use 'have got' in past tense!" },

      { category: "Common Mistakes", mistake: "Using 'have' with he/she/it", wrong: "He have got a car. ✗", correct: "He has got a car. ✓", rule: "He/She/It = HAS got!" },
      { category: "Common Mistakes", mistake: "Confusing contractions", he_has: "He's got = He has got", he_is: "He's happy = He is happy", note: "'He's' can mean 'has' or 'is'!", check_context: "Look for 'got' to know it's 'has'" },
      { category: "Common Mistakes", mistake: "Using in past tense", wrong: "I have got a car yesterday. ✗", correct: "I had a car yesterday. ✓", rule: "'have got' only for NOW!" },

      { category: "Sentence Structure", positive: "Subject + have/has + got + object", example: "I have got a book.", word_order: "Fixed pattern", cant_separate: "Can't say 'I have a book got' ✗" },

      { category: "Common Expressions", ive_got_it: "I've got it! (I understand!)", youve_got_to: "You've got to see this! (must)", what_have_you_got: "What have you got there?", note: "Very common in everyday speech!" },
    ]
  },
  
  speakingPractice: [
    { question: "What time do you wake up?", answer: "I wake up at 7 o’clock.", multipleChoice: { prompt: "I wake ___ at 7 o’clock.", options: [{ letter: "A", text: "off", correct: false }, { letter: "B", text: "down", correct: false }, { letter: "C", text: "up", correct: true }] } },
    { question: "What do you usually do at night?", answer: "I watch TV at night.", multipleChoice: { prompt: "I ___ TV at night.", options: [{ letter: "A", text: "watched", correct: false }, { letter: "B", text: "watches", correct: false }, { letter: "C", text: "watch", correct: true }] } },
    { question: "Do you eat lunch at noon?", answer: "Yes, I eat lunch at noon.", multipleChoice: { prompt: "Yes, I ___ lunch at noon.", options: [{ letter: "A", text: "eats", correct: false }, { letter: "B", text: "eating", correct: false }, { letter: "C", text: "eat", correct: true }] } },
    { question: "What do you do at the weekend?", answer: "I visit my family at the weekend.", multipleChoice: { prompt: "I ___ my family at the weekend.", options: [{ letter: "A", text: "visit", correct: true }, { letter: "B", text: "visits", correct: false }, { letter: "C", text: "visiting", correct: false }] } },
    { question: "Do you work at midnight?", answer: "No, I don’t work at midnight.", multipleChoice: { prompt: "No, I don’t ___ at midnight.", options: [{ letter: "A", text: "working", correct: false }, { letter: "B", text: "work", correct: true }, { letter: "C", text: "works", correct: false }] } },
    { question: "What do you do on Sundays?", answer: "I relax on Sundays.", multipleChoice: { prompt: "I ___ on Sundays.", options: [{ letter: "A", text: "relaxes", correct: false }, { letter: "B", text: "relaxing", correct: false }, { letter: "C", text: "relax", correct: true }] } },
    { question: "Do you go shopping on Saturday?", answer: "Yes, I go shopping on Saturday.", multipleChoice: { prompt: "Yes, I ___ shopping on Saturday.", options: [{ letter: "A", text: "go", correct: true }, { letter: "B", text: "goed", correct: false }, { letter: "C", text: "goes", correct: false }] } },
    { question: "Is your birthday on January 5th?", answer: "No, my birthday is on March 2nd.", multipleChoice: { prompt: "No, my birthday ___ on March 2nd.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Do you go to school on Monday?", answer: "Yes, I go to school on Monday.", multipleChoice: { prompt: "Yes, I ___ to school on Monday.", options: [{ letter: "A", text: "goed", correct: false }, { letter: "B", text: "go", correct: true }, { letter: "C", text: "goes", correct: false }] } },
    { question: "Do you have English class on Wednesday?", answer: "Yes, I have English class on Wednesday.", multipleChoice: { prompt: "Yes, I ___ English class on Wednesday.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "has", correct: false }] } },
    { question: "What do you do on your birthday?", answer: "I have a party on my birthday.", multipleChoice: { prompt: "I ___ a party on my birthday.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "has", correct: false }] } },
    { question: "Do you study on the weekend?", answer: "Sometimes I study on the weekend.", multipleChoice: { prompt: "Sometimes I ___ on the weekend.", options: [{ letter: "A", text: "study", correct: true }, { letter: "B", text: "studyed", correct: false }, { letter: "C", text: "studies", correct: false }] } },
    { question: "Do you go to the cinema on Friday evenings?", answer: "Yes, I go to the cinema on Friday evenings.", multipleChoice: { prompt: "Yes, I ___ to the cinema on Friday evenings.", options: [{ letter: "A", text: "go", correct: true }, { letter: "B", text: "goes", correct: false }, { letter: "C", text: "goed", correct: false }] } },
    { question: "Do you rest on national holidays?", answer: "Yes, I rest on national holidays.", multipleChoice: { prompt: "Yes, I ___ on national holidays.", options: [{ letter: "A", text: "resting", correct: false }, { letter: "B", text: "rest", correct: true }, { letter: "C", text: "rests", correct: false }] } },
    { question: "Do you go to work on New Year’s Day?", answer: "No, I don’t work on New Year’s Day.", multipleChoice: { prompt: "No, I don’t ___ on New Year’s Day.", options: [{ letter: "A", text: "works", correct: false }, { letter: "B", text: "working", correct: false }, { letter: "C", text: "work", correct: true }] } },
    { question: "When is your birthday?", answer: "My birthday is in July.", multipleChoice: { prompt: "My birthday ___ in July.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Do you travel in summer?", answer: "Yes, I travel in summer.", multipleChoice: { prompt: "Yes, I ___ in summer.", options: [{ letter: "A", text: "traveling", correct: false }, { letter: "B", text: "travel", correct: true }, { letter: "C", text: "travels", correct: false }] } },
    { question: "Do you study in the evening?", answer: "Yes, I study in the evening.", multipleChoice: { prompt: "Yes, I ___ in the evening.", options: [{ letter: "A", text: "study", correct: true }, { letter: "B", text: "studies", correct: false }, { letter: "C", text: "studyed", correct: false }] } },
    { question: "Were you born in 1990?", answer: "No, I was born in 1985.", multipleChoice: { prompt: "No, I ___ born in 1985.", options: [{ letter: "A", text: "was", correct: true }, { letter: "B", text: "were", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "What do you do in winter?", answer: "I drink hot tea in winter.", multipleChoice: { prompt: "I ___ hot tea in winter.", options: [{ letter: "A", text: "drinking", correct: false }, { letter: "B", text: "drink", correct: true }, { letter: "C", text: "drinks", correct: false }] } },
    { question: "Do you work in the morning?", answer: "Yes, I work in the morning.", multipleChoice: { prompt: "Yes, I ___ in the morning.", options: [{ letter: "A", text: "works", correct: false }, { letter: "B", text: "worked", correct: false }, { letter: "C", text: "work", correct: true }] } },
    { question: "Do you sleep at night?", answer: "Yes, I sleep at night.", multipleChoice: { prompt: "Yes, I ___ at night.", options: [{ letter: "A", text: "sleep", correct: true }, { letter: "B", text: "sleeps", correct: false }, { letter: "C", text: "sleeping", correct: false }] } },
    { question: "Do you have breakfast at 8 a.m.?", answer: "Yes, I have breakfast at 8 a.m.", multipleChoice: { prompt: "Yes, I ___ breakfast at 8 a.m.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "Do you study on Mondays?", answer: "Yes, I study on Mondays.", multipleChoice: { prompt: "Yes, I ___ on Mondays.", options: [{ letter: "A", text: "studyed", correct: false }, { letter: "B", text: "studies", correct: false }, { letter: "C", text: "study", correct: true }] } },
    { question: "Is your exam on June 10th?", answer: "Yes, it is on June 10th.", multipleChoice: { prompt: "Yes, it ___ on June 10th.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What do you do on weekends?", answer: "I rest on weekends.", multipleChoice: { prompt: "I ___ on weekends.", options: [{ letter: "A", text: "resting", correct: false }, { letter: "B", text: "rest", correct: true }, { letter: "C", text: "rests", correct: false }] } },
    { question: "Do you take a walk in the evening?", answer: "Yes, I take a walk in the evening.", multipleChoice: { prompt: "Yes, I ___ walk in the evening.", options: [{ letter: "A", text: "make a", correct: false }, { letter: "B", text: "do a", correct: false }, { letter: "C", text: "take a", correct: true }] } },
    { question: "Do you drink tea in the morning?", answer: "Yes, I drink tea in the morning.", multipleChoice: { prompt: "Yes, I ___ tea in the morning.", options: [{ letter: "A", text: "drink", correct: true }, { letter: "B", text: "drinks", correct: false }, { letter: "C", text: "drinking", correct: false }] } },
    { question: "What do you do in the afternoon?", answer: "I usually work in the afternoon.", multipleChoice: { prompt: "I usually ___ in the afternoon.", options: [{ letter: "A", text: "working", correct: false }, { letter: "B", text: "work", correct: true }, { letter: "C", text: "works", correct: false }] } },
    { question: "Do you go to school in the morning?", answer: "Yes, I go to school in the morning.", multipleChoice: { prompt: "Yes, I ___ to school in the morning.", options: [{ letter: "A", text: "go", correct: true }, { letter: "B", text: "goed", correct: false }, { letter: "C", text: "goes", correct: false }] } },
    { question: "Is your favorite holiday in December?", answer: "Yes, it is in December.", multipleChoice: { prompt: "Yes, it ___ in December.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What do you do at Christmas?", answer: "I visit my grandparents at Christmas.", multipleChoice: { prompt: "I ___ my grandparents at Christmas.", options: [{ letter: "A", text: "visiting", correct: false }, { letter: "B", text: "visit", correct: true }, { letter: "C", text: "visits", correct: false }] } },
    { question: "Do you relax at the weekend?", answer: "Yes, I relax at the weekend.", multipleChoice: { prompt: "Yes, I ___ at the weekend.", options: [{ letter: "A", text: "relaxes", correct: false }, { letter: "B", text: "relaxing", correct: false }, { letter: "C", text: "relax", correct: true }] } },
    { question: "Do you sleep at midnight?", answer: "Yes, I sleep at midnight.", multipleChoice: { prompt: "Yes, I ___ at midnight.", options: [{ letter: "A", text: "sleep", correct: true }, { letter: "B", text: "sleeps", correct: false }, { letter: "C", text: "sleeping", correct: false }] } },
    { question: "Is your birthday in winter?", answer: "Yes, it is in winter.", multipleChoice: { prompt: "Yes, it ___ in winter.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Do you go to work in the morning?", answer: "Yes, I go to work in the morning.", multipleChoice: { prompt: "Yes, I ___ to work in the morning.", options: [{ letter: "A", text: "go", correct: true }, { letter: "B", text: "goed", correct: false }, { letter: "C", text: "goes", correct: false }] } },
    { question: "Do you eat dinner at 7 p.m.?", answer: "Yes, I eat dinner at 7 p.m.", multipleChoice: { prompt: "Yes, I ___ dinner at 7 p.m.", options: [{ letter: "A", text: "eat", correct: true }, { letter: "B", text: "eats", correct: false }, { letter: "C", text: "eating", correct: false }] } },
    { question: "Do you celebrate birthdays on weekends?", answer: "Yes, I celebrate birthdays on weekends.", multipleChoice: { prompt: "Yes, I ___ birthdays on weekends.", options: [{ letter: "A", text: "celebrating", correct: false }, { letter: "B", text: "celebrate", correct: true }, { letter: "C", text: "celebrates", correct: false }] } },
    { question: "Do you read books in the evening?", answer: "Yes, I read books in the evening.", multipleChoice: { prompt: "Yes, I ___ books in the evening.", options: [{ letter: "A", text: "reads", correct: false }, { letter: "B", text: "reading", correct: false }, { letter: "C", text: "read", correct: true }] } },
    { question: "Do you take a vacation in August?", answer: "Yes, I take a vacation in August.", multipleChoice: { prompt: "Yes, I ___ a vacation in August.", options: [{ letter: "A", text: "takes", correct: false }, { letter: "B", text: "take", correct: true }, { letter: "C", text: "get", correct: false }] } },
    { question: "Do you travel on holidays?", answer: "Yes, I travel on holidays.", multipleChoice: { prompt: "Yes, I ___ on holidays.", options: [{ letter: "A", text: "traveling", correct: false }, { letter: "B", text: "travel", correct: true }, { letter: "C", text: "travels", correct: false }] } },
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
  
  table: {
    title: "📋 Have got/Has got: Negative Sentences",
    data: [
      { category: "Structure", negative_form: "haven't got / hasn't got", function: "To say you DON'T have something", turkish: "Yok (-m yok, -n yok)", pattern: "haven't/hasn't + got + object" },

      { category: "With I/You/We/They", form: "haven't got", full_form: "have not got", subjects: "I, you, we, they", example: "I haven't got a bike.", turkish: "Benim bisikletim yok.", contraction: "haven't (most common)" },
      { category: "With I/You/We/They", more_examples: "You haven't got a dog. / We haven't got a garden. / They haven't got a house.", pattern: "subject + haven't got + object", note: "Always use 'haven't' for these subjects!" },

      { category: "With He/She/It", form: "hasn't got", full_form: "has not got", subjects: "He, she, it", example: "He hasn't got a brother.", turkish: "Onun erkek kardeşi yok.", contraction: "hasn't (most common)" },
      { category: "With He/She/It", more_examples: "She hasn't got a car. / It hasn't got a tail.", pattern: "subject + hasn't got + object", note: "Third person singular uses 'hasn't'!" },

      { category: "Contractions", havent: "haven't = have not", hasnt: "hasn't = has not", usage: "Contractions very common!", formal_vs_informal: "Full forms more formal" },

      { category: "With 'any'", usage: "Often use 'any' in negatives", examples: "I haven't got any money. / She hasn't got any brothers. / They haven't got any time.", meaning: "Not even one", pattern: "haven't/hasn't got any + plural/uncountable" },
      { category: "With 'any'", with_singular: "I haven't got a car. (one specific thing)", with_any: "I haven't got any cars. (none at all)", note: "'any' emphasizes zero quantity" },

      { category: "Positive → Negative", positive: "I have got a car. →", negative: "I haven't got a car.", positive_he: "He has got a brother. →", negative_he: "He hasn't got a brother.", transformation: "Add 'not' after have/has" },

      { category: "Common Mistakes", mistake: "Using 'haven't' with he/she/it", wrong: "He haven't got a car. ✗", correct: "He hasn't got a car. ✓", rule: "He/She/It = HASN'T (not haven't)!" },
      { category: "Common Mistakes", mistake: "Double negative", wrong: "I haven't got no money. ✗", correct: "I haven't got any money. ✓", rule: "Use 'any' not 'no' in negatives!" },
      { category: "Common Mistakes", mistake: "Wrong word order", wrong: "I got haven't a car. ✗", correct: "I haven't got a car. ✓", rule: "haven't/hasn't + got (fixed order!)" },

      { category: "Short Answers", question: "Have you got a car?", answer_no: "No, I haven't.", question_he: "Has he got a brother?", answer_no_he: "No, he hasn't.", note: "Don't repeat 'got' in short answers!" },

      { category: "vs American English", british: "I haven't got a car. (British)", american: "I don't have a car. (American)", both_correct: "Both are correct!", note: "British prefer 'haven't got'" },

      { category: "Common Uses", no_possessions: "I haven't got any money / a phone / a car", no_family: "She hasn't got any brothers / sisters", no_time: "We haven't got time / a meeting today", no_health: "I haven't got a cold / a headache" },

      { category: "Emphasis", normal: "I haven't got a car.", emphatic: "I haven't got ANY car at all!", stressed: "I've got NO car!", note: "Can emphasize for strong negation" },
    ]
  },
  
  speakingPractice: [
    { question: "What do you do in the morning?", answer: "I eat breakfast in the morning.", multipleChoice: { prompt: "I ___ breakfast in the morning.", options: [{ letter: "A", text: "eat", correct: true }, { letter: "B", text: "eats", correct: false }, { letter: "C", text: "eating", correct: false }] } },
    { question: "Do you play football?", answer: "Yes, I play football every weekend.", multipleChoice: { prompt: "Yes, I ___ football every weekend.", options: [{ letter: "A", text: "played", correct: false }, { letter: "B", text: "plays", correct: false }, { letter: "C", text: "play", correct: true }] } },
    { question: "Do you like music?", answer: "Yes, I like music.", multipleChoice: { prompt: "Yes, I ___ music.", options: [{ letter: "A", text: "likes", correct: false }, { letter: "B", text: "likeed", correct: false }, { letter: "C", text: "like", correct: true }] } },
    { question: "Where do you live?", answer: "I live in Istanbul.", multipleChoice: { prompt: "I ___ in Istanbul.", options: [{ letter: "A", text: "live", correct: true }, { letter: "B", text: "lives", correct: false }, { letter: "C", text: "living", correct: false }] } },
    { question: "Do you study English?", answer: "Yes, I study English every day.", multipleChoice: { prompt: "Yes, I ___ English every day.", options: [{ letter: "A", text: "studyed", correct: false }, { letter: "B", text: "study", correct: true }, { letter: "C", text: "studies", correct: false }] } },
    { question: "Do you and your friends play games?", answer: "Yes, we play games after school.", multipleChoice: { prompt: "Yes, we ___ games after school.", options: [{ letter: "A", text: "play", correct: true }, { letter: "B", text: "played", correct: false }, { letter: "C", text: "plays", correct: false }] } },
    { question: "Do you go to school on Mondays?", answer: "Yes, we go to school on Mondays.", multipleChoice: { prompt: "Yes, we ___ to school on Mondays.", options: [{ letter: "A", text: "go", correct: true }, { letter: "B", text: "goed", correct: false }, { letter: "C", text: "goes", correct: false }] } },
    { question: "Do you drink tea?", answer: "Yes, I drink tea every morning.", multipleChoice: { prompt: "Yes, ___ drink tea every morning.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Does your mother speak Turkish?", answer: "Yes, she speaks Turkish very well.", multipleChoice: { prompt: "Yes, ___ speaks Turkish very well.", options: [{ letter: "A", text: "it", correct: false }, { letter: "B", text: "she", correct: true }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do you like pizza?", answer: "Yes, I like pizza a lot.", multipleChoice: { prompt: "Yes, I ___ pizza a lot.", options: [{ letter: "A", text: "likeed", correct: false }, { letter: "B", text: "like", correct: true }, { letter: "C", text: "likes", correct: false }] } },
    { question: "Do you study English every day?", answer: "Yes, I study English every day.", multipleChoice: { prompt: "Yes, I ___ English every day.", options: [{ letter: "A", text: "study", correct: true }, { letter: "B", text: "studyed", correct: false }, { letter: "C", text: "studies", correct: false }] } },
    { question: "Do you walk to school?", answer: "Yes, I walk to school.", multipleChoice: { prompt: "Yes, I ___ to school.", options: [{ letter: "A", text: "walk", correct: true }, { letter: "B", text: "walks", correct: false }, { letter: "C", text: "walking", correct: false }] } },
    { question: "Do you read books?", answer: "Yes, I read books every night.", multipleChoice: { prompt: "Yes, ___ read books every night.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do your parents work?", answer: "Yes, they work every day.", multipleChoice: { prompt: "Yes, they ___ every day.", options: [{ letter: "A", text: "works", correct: false }, { letter: "B", text: "work", correct: true }, { letter: "C", text: "worked", correct: false }] } },
    { question: "Do you watch TV at night?", answer: "Yes, I watch TV at night.", multipleChoice: { prompt: "Yes, I ___ TV at night.", options: [{ letter: "A", text: "watches", correct: false }, { letter: "B", text: "watch", correct: true }, { letter: "C", text: "watched", correct: false }] } },
    { question: "Do you like ice cream?", answer: "Yes, I like ice cream.", multipleChoice: { prompt: "Yes, I ___ ice cream.", options: [{ letter: "A", text: "likes", correct: false }, { letter: "B", text: "like", correct: true }, { letter: "C", text: "likeed", correct: false }] } },
    { question: "Do you visit your grandparents?", answer: "Yes, we visit our grandparents.", multipleChoice: { prompt: "Yes, ___ visit our grandparents.", options: [{ letter: "A", text: "we", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "they", correct: false }] } },
    { question: "Do you eat lunch at noon?", answer: "Yes, we eat lunch at noon.", multipleChoice: { prompt: "Yes, we ___ lunch at noon.", options: [{ letter: "A", text: "eat", correct: true }, { letter: "B", text: "eats", correct: false }, { letter: "C", text: "eating", correct: false }] } },
    { question: "Do you go to bed early?", answer: "Yes, I go to bed early.", multipleChoice: { prompt: "Yes, I ___ to bed early.", options: [{ letter: "A", text: "go", correct: true }, { letter: "B", text: "goes", correct: false }, { letter: "C", text: "goed", correct: false }] } },
    { question: "Do you take the bus to school?", answer: "Yes, I take the bus to school.", multipleChoice: { prompt: "Yes, I ___ the bus to school.", options: [{ letter: "A", text: "takes", correct: false }, { letter: "B", text: "get", correct: false }, { letter: "C", text: "take", correct: true }] } },
    { question: "Do you help your parents?", answer: "Yes, I help my parents every day.", multipleChoice: { prompt: "Yes, ___ help my parents every day.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Do you play basketball on the weekend?", answer: "Yes, I play basketball on the weekend.", multipleChoice: { prompt: "Yes, I ___ basketball on the weekend.", options: [{ letter: "A", text: "plays", correct: false }, { letter: "B", text: "played", correct: false }, { letter: "C", text: "play", correct: true }] } },
    { question: "Do you listen to music?", answer: "Yes, I listen to music in the evening.", multipleChoice: { prompt: "Yes, I ___ to music in the evening.", options: [{ letter: "A", text: "listens", correct: false }, { letter: "B", text: "listening", correct: false }, { letter: "C", text: "listen", correct: true }] } },
    { question: "Do we study English together?", answer: "Yes, we study English together.", multipleChoice: { prompt: "Yes, we ___ English together.", options: [{ letter: "A", text: "studyed", correct: false }, { letter: "B", text: "studies", correct: false }, { letter: "C", text: "study", correct: true }] } },
    { question: "Do cats eat fish?", answer: "Yes, they eat fish.", multipleChoice: { prompt: "Yes, ___ eat fish.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "we", correct: false }, { letter: "C", text: "they", correct: true }] } },
    { question: "Do you go shopping?", answer: "Yes, I go shopping.", multipleChoice: { prompt: "Yes, I ___ shopping.", options: [{ letter: "A", text: "goes", correct: false }, { letter: "B", text: "goed", correct: false }, { letter: "C", text: "go", correct: true }] } },
    { question: "Do you do your homework?", answer: "Yes, I do my homework.", multipleChoice: { prompt: "Yes, I ___ my homework.", options: [{ letter: "A", text: "does", correct: false }, { letter: "B", text: "doed", correct: false }, { letter: "C", text: "do", correct: true }] } },
    { question: "Do you clean your house?", answer: "Yes, we clean the house on weekends.", multipleChoice: { prompt: "Yes, we ___ the house on weekends.", options: [{ letter: "A", text: "cleaning", correct: false }, { letter: "B", text: "clean", correct: true }, { letter: "C", text: "cleans", correct: false }] } },
    { question: "Do you like swimming?", answer: "Yes, I like swimming.", multipleChoice: { prompt: "Yes, I ___ swimming.", options: [{ letter: "A", text: "like", correct: true }, { letter: "B", text: "likeed", correct: false }, { letter: "C", text: "likes", correct: false }] } },
    { question: "Do nurses work in a hospital?", answer: "Yes, they work in a hospital.", multipleChoice: { prompt: "Yes, they ___ in a hospital.", options: [{ letter: "A", text: "work", correct: true }, { letter: "B", text: "worked", correct: false }, { letter: "C", text: "works", correct: false }] } },
    { question: "Do you play the guitar?", answer: "Yes, I play the guitar.", multipleChoice: { prompt: "Yes, I ___ the guitar.", options: [{ letter: "A", text: "play", correct: true }, { letter: "B", text: "played", correct: false }, { letter: "C", text: "plays", correct: false }] } },
    { question: "Do you visit your uncle?", answer: "Yes, I visit my uncle every week.", multipleChoice: { prompt: "Yes, ___ visit my uncle every week.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "Does your mother cook dinner?", answer: "Yes, she cooks dinner.", multipleChoice: { prompt: "Yes, ___ cooks dinner.", options: [{ letter: "A", text: "it", correct: false }, { letter: "B", text: "she", correct: true }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do we drink water?", answer: "Yes, we drink water every day.", multipleChoice: { prompt: "Yes, ___ drink water every day.", options: [{ letter: "A", text: "they", correct: false }, { letter: "B", text: "we", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "Do you eat fruit?", answer: "Yes, I eat fruit every day.", multipleChoice: { prompt: "Yes, ___ eat fruit every day.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Do your friends play chess?", answer: "Yes, they play chess.", multipleChoice: { prompt: "Yes, they ___ chess.", options: [{ letter: "A", text: "play", correct: true }, { letter: "B", text: "played", correct: false }, { letter: "C", text: "plays", correct: false }] } },
    { question: "Do you brush your teeth?", answer: "Yes, I brush my teeth every day.", multipleChoice: { prompt: "Yes, ___ brush my teeth every day.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do children watch TV?", answer: "Yes, they watch TV.", multipleChoice: { prompt: "Yes, they ___ TV.", options: [{ letter: "A", text: "watches", correct: false }, { letter: "B", text: "watch", correct: true }, { letter: "C", text: "watched", correct: false }] } },
    { question: "Do kids go to the park?", answer: "Yes, they go to the park.", multipleChoice: { prompt: "Yes, they ___ to the park.", options: [{ letter: "A", text: "goes", correct: false }, { letter: "B", text: "go", correct: true }, { letter: "C", text: "goed", correct: false }] } },
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
  
  table: {
    title: "📋 Have got/Has got: Question Sentences",
    data: [
      { category: "Structure", question_form: "Have/Has + subject + got?", function: "To ask if someone has something", turkish: "Var mı? (-n var mı?)", pattern: "Invert: put have/has FIRST" },

      { category: "With I/you/we/they", form: "Have ... got?", subjects: "I, you, we, they", example: "Have you got a pen?", turkish: "Senin kalemin var mı?", answer_yes: "Yes, I have.", answer_no: "No, I haven't." },
      { category: "With I/you/we/they", more_examples: "Have you got time? / Have we got a meeting? / Have they got any books?", pattern: "Have + subject + got + object?", note: "Use 'Have' for these subjects!" },

      { category: "With he/she/it", form: "Has ... got?", subjects: "He, she, it", example: "Has she got a car?", turkish: "Onun arabası var mı?", answer_yes: "Yes, she has.", answer_no: "No, she hasn't." },
      { category: "With he/she/it", more_examples: "Has he got a brother? / Has it got a name?", pattern: "Has + subject + got + object?", note: "Third person uses 'Has'!" },

      { category: "Statement → Question", statement: "You have got a bike. →", question: "Have you got a bike?", statement_he: "He has got a car. →", question_he: "Has he got a car?", transformation: "Move have/has to the START" },

      { category: "Inversion", rule: "Put have/has BEFORE subject", wrong: "You have got a pen? ✗", correct: "Have you got a pen? ✓", pattern: "Have/Has + subject + got?", note: "Inversion creates question!" },

      { category: "With 'any'", usage: "Common in questions", examples: "Have you got any money? / Has she got any sisters? / Have they got any time?", meaning: "Asking if there's at least one", pattern: "Have/Has + subject + got + any + plural/uncountable?" },

      { category: "Short Answers - Positive", have_question: "Have you got a car?", answer_yes: "Yes, I have.", has_question: "Has he got a brother?", answer_yes_he: "Yes, he has.", note: "Don't repeat 'got' in short answers!" },
      { category: "Short Answers - Negative", have_question: "Have you got a car?", answer_no: "No, I haven't.", has_question: "Has she got a car?", answer_no_she: "No, she hasn't.", note: "Use contraction in short negative answers!" },

      { category: "Common Mistakes", mistake: "Not inverting", wrong: "You have got a pen? ✗", correct: "Have you got a pen? ✓", rule: "Must move have/has to front!" },
      { category: "Common Mistakes", mistake: "Using 'Have' with he/she/it", wrong: "Have he got a car? ✗", correct: "Has he got a car? ✓", rule: "He/She/It = HAS (in questions too)!" },
      { category: "Common Mistakes", mistake: "Including 'got' in short answer", wrong: "Yes, I have got. ✗", correct: "Yes, I have. ✓", rule: "Short answers: just 'have' or 'has'!" },

      { category: "Wh- Questions", what: "What have you got?", where: "Where has she got her keys?", how_many: "How many brothers has he got?", who: "Who has got my pen?", note: "Wh- word comes FIRST!" },

      { category: "Whose", question: "Whose book is this?", alternative: "Who has got this book?", meaning: "Asking about possession", pattern: "Whose + noun...?" },

      { category: "vs American English", british: "Have you got a car? (British)", american: "Do you have a car? (American)", both_correct: "Both are correct!", note: "British prefer 'have you got'" },

      { category: "Intonation", rising: "Voice goes UP at end", example: "Have you got a pen? ↗", natural: "Shows it's a question", compare: "Like 'var mı?' rising in Turkish" },

      { category: "Common Questions", everyday: "Have you got the time? (What time is it?)", phone: "Have you got a pen? (Can you write?)", permission: "Have you got a minute? (Are you free?)", note: "Very common in daily life!" },
    ]
  },
  
  speakingPractice: [
    { question: "What does your friend do on Sundays?", answer: "He plays football on Sundays.", multipleChoice: { prompt: "He ___ football on Sundays.", options: [{ letter: "A", text: "plays", correct: true }, { letter: "B", text: "play", correct: false }, { letter: "C", text: "playing", correct: false }] } },
    { question: "Does your mother like chocolate?", answer: "Yes, she likes chocolate.", multipleChoice: { prompt: "Yes, she ___ chocolate.", options: [{ letter: "A", text: "liking", correct: false }, { letter: "B", text: "likes", correct: true }, { letter: "C", text: "like", correct: false }] } },
    { question: "Where does your sister work?", answer: "She works in a hospital.", multipleChoice: { prompt: "She ___ in a hospital.", options: [{ letter: "A", text: "work", correct: false }, { letter: "B", text: "working", correct: false }, { letter: "C", text: "works", correct: true }] } },
    { question: "What does a plane do?", answer: "It flies.", multipleChoice: { prompt: "___ flies.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "it", correct: true }] } },
    { question: "Does your father eat vegetables?", answer: "Yes, he eats vegetables every day.", multipleChoice: { prompt: "Yes, ___ eats vegetables every day.", options: [{ letter: "A", text: "it", correct: false }, { letter: "B", text: "he", correct: true }, { letter: "C", text: "she", correct: false }] } },
    { question: "What does your sister watch on TV?", answer: "She watches cartoons.", multipleChoice: { prompt: "She ___ cartoons.", options: [{ letter: "A", text: "watch", correct: false }, { letter: "B", text: "watching", correct: false }, { letter: "C", text: "watches", correct: true }] } },
    { question: "Does your dog bark?", answer: "Yes, it barks a lot.", multipleChoice: { prompt: "Yes, ___ barks a lot.", options: [{ letter: "A", text: "it", correct: true }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "What does your friend drink in the morning?", answer: "He drinks coffee.", multipleChoice: { prompt: "___ drinks coffee.", options: [{ letter: "A", text: "he", correct: true }, { letter: "B", text: "it", correct: false }, { letter: "C", text: "she", correct: false }] } },
    { question: "Does your sister go to school?", answer: "Yes, she goes to school.", multipleChoice: { prompt: "Yes, she ___ to school.", options: [{ letter: "A", text: "go", correct: false }, { letter: "B", text: "going", correct: false }, { letter: "C", text: "goes", correct: true }] } },
    { question: "What time does your father get up?", answer: "He gets up at 7 o’clock.", multipleChoice: { prompt: "He gets ___ at 7 o’clock.", options: [{ letter: "A", text: "off", correct: false }, { letter: "B", text: "up", correct: true }, { letter: "C", text: "down", correct: false }] } },
    { question: "Does it rain in winter?", answer: "Yes, it rains in winter.", multipleChoice: { prompt: "Yes, it ___ in winter.", options: [{ letter: "A", text: "raining", correct: false }, { letter: "B", text: "rains", correct: true }, { letter: "C", text: "rain", correct: false }] } },
    { question: "Does your friend study English?", answer: "Yes, she studies English every day.", multipleChoice: { prompt: "Yes, she ___ English every day.", options: [{ letter: "A", text: "study", correct: false }, { letter: "B", text: "studying", correct: false }, { letter: "C", text: "studies", correct: true }] } },
    { question: "What does your father eat for lunch?", answer: "He eats rice and chicken.", multipleChoice: { prompt: "___ eats rice and chicken.", options: [{ letter: "A", text: "he", correct: true }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "it", correct: false }] } },
    { question: "Does your cat sleep a lot?", answer: "Yes, it sleeps all day.", multipleChoice: { prompt: "Yes, ___ sleeps all day.", options: [{ letter: "A", text: "it", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "she", correct: false }] } },
    { question: "Where does King Charles live?", answer: "He lives in London.", multipleChoice: { prompt: "He ___ in London.", options: [{ letter: "A", text: "live", correct: false }, { letter: "B", text: "living", correct: false }, { letter: "C", text: "lives", correct: true }] } },
    { question: "What music does your brother like?", answer: "He likes rock music.", multipleChoice: { prompt: "He ___ rock music.", options: [{ letter: "A", text: "likes", correct: true }, { letter: "B", text: "like", correct: false }, { letter: "C", text: "liking", correct: false }] } },
    { question: "Does your mother cook dinner?", answer: "Yes, she cooks dinner every night.", multipleChoice: { prompt: "Yes, ___ cooks dinner every night.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "she", correct: true }, { letter: "C", text: "it", correct: false }] } },
    { question: "Does your brother work on Mondays?", answer: "Yes, he works on Mondays.", multipleChoice: { prompt: "Yes, he ___ on Mondays.", options: [{ letter: "A", text: "work", correct: false }, { letter: "B", text: "working", correct: false }, { letter: "C", text: "works", correct: true }] } },
    { question: "What does “merhaba” mean?", answer: "It means 'hello'.", multipleChoice: { prompt: "___ means 'hello'.", options: [{ letter: "A", text: "it", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "she", correct: false }] } },
    { question: "What does your brother do?", answer: "He works at a bank.", multipleChoice: { prompt: "He ___ at a bank.", options: [{ letter: "A", text: "working", correct: false }, { letter: "B", text: "works", correct: true }, { letter: "C", text: "work", correct: false }] } },
    { question: "What sport does your sister play?", answer: "She plays tennis.", multipleChoice: { prompt: "She ___ tennis.", options: [{ letter: "A", text: "play", correct: false }, { letter: "B", text: "playing", correct: false }, { letter: "C", text: "plays", correct: true }] } },
    { question: "Does your phone take pictures?", answer: "Yes, it takes pictures.", multipleChoice: { prompt: "Yes, it ___ pictures.", options: [{ letter: "A", text: "take", correct: false }, { letter: "B", text: "gets", correct: false }, { letter: "C", text: "takes", correct: true }] } },
    { question: "What does your brother read?", answer: "He reads a book.", multipleChoice: { prompt: "He ___ a book.", options: [{ letter: "A", text: "reading", correct: false }, { letter: "B", text: "reads", correct: true }, { letter: "C", text: "read", correct: false }] } },
    { question: "Does your sister take the bus?", answer: "Yes, she takes the bus to school.", multipleChoice: { prompt: "Yes, she ___ the bus to school.", options: [{ letter: "A", text: "gets", correct: false }, { letter: "B", text: "take", correct: false }, { letter: "C", text: "takes", correct: true }] } },
    { question: "Does it snow in January?", answer: "Yes, it snows in January.", multipleChoice: { prompt: "Yes, it ___ in January.", options: [{ letter: "A", text: "snows", correct: true }, { letter: "B", text: "snow", correct: false }, { letter: "C", text: "snowing", correct: false }] } },
    { question: "What does your mother do in the morning?", answer: "She drinks tea and reads the news.", multipleChoice: { prompt: "___ drinks tea and reads the news.", options: [{ letter: "A", text: "it", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "she", correct: true }] } },
    { question: "What kind of movies does your father like?", answer: "He likes action movies.", multipleChoice: { prompt: "He ___ action movies.", options: [{ letter: "A", text: "like", correct: false }, { letter: "B", text: "liking", correct: false }, { letter: "C", text: "likes", correct: true }] } },
    { question: "What time does your sister go to bed?", answer: "She goes to bed at 10 p.m.", multipleChoice: { prompt: "She ___ to bed at 10 p.m.", options: [{ letter: "A", text: "goes", correct: true }, { letter: "B", text: "go", correct: false }, { letter: "C", text: "going", correct: false }] } },
    { question: "Does your dog run fast?", answer: "Yes, it runs very fast.", multipleChoice: { prompt: "Yes, ___ runs very fast.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "it", correct: true }] } },
    { question: "What does your sister do?", answer: "She teaches English.", multipleChoice: { prompt: "___ teaches English.", options: [{ letter: "A", text: "she", correct: true }, { letter: "B", text: "it", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "What game does your friend play?", answer: "He plays chess.", multipleChoice: { prompt: "He ___ chess.", options: [{ letter: "A", text: "plays", correct: true }, { letter: "B", text: "play", correct: false }, { letter: "C", text: "playing", correct: false }] } },
    { question: "Does your friend dance?", answer: "Yes, she dances very well.", multipleChoice: { prompt: "Yes, ___ dances very well.", options: [{ letter: "A", text: "she", correct: true }, { letter: "B", text: "it", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Does a baby cry a lot?", answer: "Yes, it cries a lot.", multipleChoice: { prompt: "Yes, ___ cries a lot.", options: [{ letter: "A", text: "she", correct: false }, { letter: "B", text: "it", correct: true }, { letter: "C", text: "he", correct: false }] } },
    { question: "Does your brother clean his room?", answer: "Yes, he cleans his room.", multipleChoice: { prompt: "Yes, ___ cleans his room.", options: [{ letter: "A", text: "it", correct: false }, { letter: "B", text: "he", correct: true }, { letter: "C", text: "she", correct: false }] } },
    { question: "What does your friend eat for breakfast?", answer: "She eats eggs and toast.", multipleChoice: { prompt: "___ eats eggs and toast.", options: [{ letter: "A", text: "it", correct: false }, { letter: "B", text: "she", correct: true }, { letter: "C", text: "he", correct: false }] } },
    { question: "Does your computer make noise?", answer: "Yes, it makes noise.", multipleChoice: { prompt: "Yes, it ___ noise.", options: [{ letter: "A", text: "makes", correct: true }, { letter: "B", text: "does", correct: false }, { letter: "C", text: "make", correct: false }] } },
    { question: "What subject does your brother like?", answer: "He likes math.", multipleChoice: { prompt: "He ___ math.", options: [{ letter: "A", text: "likes", correct: true }, { letter: "B", text: "like", correct: false }, { letter: "C", text: "liking", correct: false }] } },
    { question: "What animal does your sister love?", answer: "She loves horses.", multipleChoice: { prompt: "___ loves horses.", options: [{ letter: "A", text: "she", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "it", correct: false }] } },
    { question: "What song does your friend sing?", answer: "He sings a love song.", multipleChoice: { prompt: "___ sings a love song.", options: [{ letter: "A", text: "she", correct: false }, { letter: "B", text: "he", correct: true }, { letter: "C", text: "it", correct: false }] } },
    { question: "Does your phone ring?", answer: "Yes, it rings.", multipleChoice: { prompt: "Yes, ___ rings.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "it", correct: true }, { letter: "C", text: "she", correct: false }] } },
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
  
  table: {
    title: "📋 Simple Present: Positive Sentences (I, You, We, They)",
    data: [
      { category: "What is Simple Present?", explanation: "Describes habits, routines, facts, and general truths", turkish: "Geniş zaman", function: "Regular actions, permanent situations, general facts", usage: "Most basic and common tense in English!" },

      { category: "Structure", subjects: "I, You, We, They", form: "subject + BASE VERB", example: "I play / You work / We study / They live", pattern: "Base verb (NO -s ending!)", rule: "Never add -s with these subjects" },
      { category: "Structure", key_point: "Use BASE FORM of verb", examples: "play (not plays), work (not works), go (not goes)", note: "Save the -s for he/she/it ONLY!", common_mistake: "I plays ✗ → I play ✓" },

      { category: "When to Use - Habits", usage: "Regular actions you repeat", examples: "I drink coffee every morning. / You exercise daily. / We eat dinner at 7 PM.", turkish: "Alışkanlıklar", time_words: "always, usually, often, sometimes, every day" },
      { category: "When to Use - Facts", usage: "Permanent facts and truths", examples: "I live in Istanbul. / You speak English. / We work in an office.", turkish: "Kalıcı durumlar", note: "Things that stay true for a long time" },
      { category: "When to Use - General Truths", usage: "Universal facts", examples: "Birds fly. / Dogs bark. / The sun rises in the east.", turkish: "Evrensel gerçekler", note: "Scientific facts, natural laws" },

      { category: "With I", subject: "I", pattern: "I + base verb", examples: "I work / I play / I study / I like / I want", example_sentence: "I study English every day.", turkish: "Ben... (her gün/genellikle)", frequency: "I always help my friends." },
      { category: "With You", subject: "You", pattern: "You + base verb", examples: "You work / You play / You study / You like / You want", example_sentence: "You speak Turkish very well.", turkish: "Sen.../Siz...", note: "Same form for singular and plural 'you'" },
      { category: "With We", subject: "We", pattern: "We + base verb", examples: "We work / We play / We study / We like / We want", example_sentence: "We live in a big city.", turkish: "Biz...", group_action: "We often go to the cinema together." },
      { category: "With They", subject: "They", pattern: "They + base verb", examples: "They work / They play / They study / They like / They want", example_sentence: "They teach at a university.", turkish: "Onlar...", note: "For groups of people, animals, or things" },

      { category: "Time Expressions", frequency_100: "always (her zaman)", frequency_90: "usually (genellikle)", frequency_70: "often (sık sık)", frequency_50: "sometimes (bazen)", frequency_10: "rarely/seldom (nadiren)", frequency_0: "never (asla)", pattern: "Usually come BEFORE main verb" },
      { category: "Time Expressions", daily: "every day (her gün)", weekly: "every week (her hafta)", monthly: "every month (her ay)", yearly: "every year (her yıl)", example: "I exercise every day.", position: "Usually at END of sentence" },
      { category: "Time Expressions", examples: "I always wake up at 7 AM. / You usually drink tea. / We often visit friends. / They sometimes play football.", note: "Frequency words come BEFORE the verb!", rule: "always/usually/often + base verb" },

      { category: "Common Verbs", daily_actions: "eat, drink, sleep, wake up, work, study", leisure: "play, watch, listen, read, go", preferences: "like, love, want, need, prefer", communication: "speak, talk, write, call", examples: "I work from home. / You listen to music. / We prefer tea." },

      { category: "Common Mistakes", mistake: "Adding -s to I/You/We/They", wrong: "I works ✗ / You plays ✗ / We likes ✗ / They goes ✗", correct: "I work ✓ / You play ✓ / We like ✓ / They go ✓", rule: "NO -S with these subjects!", turkish_note: "Bu öznelerle -s eklemeyin!" },
      { category: "Common Mistakes", mistake: "Forgetting time expressions", weak: "I play tennis. (When?)", better: "I play tennis every weekend. ✓", best: "I usually play tennis on Saturdays. ✓", tip: "Add time words for clarity!" },

      { category: "Real-World Examples", daily_routine: "I wake up at 6 AM. / You go to work by bus. / We have lunch at noon.", hobbies: "I play guitar. / You read books. / They watch football.", work_study: "I work in IT. / You study medicine. / We teach English. / They run a business." },

      { category: "Pronunciation Tips", base_verb_sounds: "/pleɪ/, /wɜːk/, /lɪv/", note: "Base verb = simplest form", examples: "play (not plays), work (not works), live (not lives)", reminder: "Save pronunciation of -s for he/she/it only!" },

      { category: "Key Takeaway", summary: "I/You/We/They + BASE VERB (no -s!)", when: "Habits, routines, facts, general truths", time_words: "always, usually, often, sometimes, never, every day/week/year", remember: "The -s ending is ONLY for he/she/it!", next_step: "Learn he/she/it form in next module!" }
    ]
  },
  
  speakingPractice: [
    { question: "Do you like fish?", answer: "No, I don’t like fish.", multipleChoice: { prompt: "No, ___ don’t like fish.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Does your friend play the guitar?", answer: "No, he doesn’t play the guitar.", multipleChoice: { prompt: "No, ___ doesn’t play the guitar.", options: [{ letter: "A", text: "it", correct: false }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "he", correct: true }] } },
    { question: "Do your parents watch TV in the morning?", answer: "No, they don’t watch TV in the morning.", multipleChoice: { prompt: "No, they ___ watch TV in the morning.", options: [{ letter: "A", text: "doesn’t", correct: false }, { letter: "B", text: "isn’t", correct: false }, { letter: "C", text: "don’t", correct: true }] } },
    { question: "Does your mother like coffee?", answer: "No, she doesn’t like coffee.", multipleChoice: { prompt: "No, ___ doesn’t like coffee.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "it", correct: false }, { letter: "C", text: "she", correct: true }] } },
    { question: "Do babies eat meat?", answer: "No, they don’t eat meat.", multipleChoice: { prompt: "No, ___ don’t eat meat.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "they", correct: true }, { letter: "C", text: "we", correct: false }] } },
    { question: "Do you drink tea?", answer: "No, I don’t drink tea.", multipleChoice: { prompt: "No, ___ don’t drink tea.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Does your phone work well?", answer: "No, it doesn’t work well.", multipleChoice: { prompt: "No, ___ doesn’t work well.", options: [{ letter: "A", text: "it", correct: true }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do your friends speak Spanish?", answer: "No, they don’t speak Spanish.", multipleChoice: { prompt: "No, ___ don’t speak Spanish.", options: [{ letter: "A", text: "they", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "we", correct: false }] } },
    { question: "Does your sister go to school?", answer: "No, she doesn’t go to school.", multipleChoice: { prompt: "No, she ___ go to school.", options: [{ letter: "A", text: "don’t", correct: false }, { letter: "B", text: "isn’t", correct: false }, { letter: "C", text: "doesn’t", correct: true }] } },
    { question: "Do you read newspapers?", answer: "No, I don’t read newspapers.", multipleChoice: { prompt: "No, ___ don’t read newspapers.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "Do your friends play basketball?", answer: "No, they don’t play basketball.", multipleChoice: { prompt: "No, ___ don’t play basketball.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "they", correct: true }, { letter: "C", text: "we", correct: false }] } },
    { question: "Does your cat like water?", answer: "No, it doesn’t like water.", multipleChoice: { prompt: "No, ___ doesn’t like water.", options: [{ letter: "A", text: "it", correct: true }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do teachers work at the park?", answer: "No, they don’t work at the park.", multipleChoice: { prompt: "No, they ___ work at the park.", options: [{ letter: "A", text: "don’t", correct: true }, { letter: "B", text: "doesn’t", correct: false }, { letter: "C", text: "aren’t", correct: false }] } },
    { question: "Does your brother like pizza?", answer: "No, he doesn’t like pizza.", multipleChoice: { prompt: "No, ___ doesn’t like pizza.", options: [{ letter: "A", text: "he", correct: true }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "it", correct: false }] } },
    { question: "Do you wake up early?", answer: "No, I don’t wake up early.", multipleChoice: { prompt: "No, I don’t wake ___ early.", options: [{ letter: "A", text: "down", correct: false }, { letter: "B", text: "up", correct: true }, { letter: "C", text: "off", correct: false }] } },
    { question: "Does your sister have a car?", answer: "No, she doesn’t have a car.", multipleChoice: { prompt: "No, she doesn’t ___ a car.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "had", correct: false }] } },
    { question: "Do you watch movies?", answer: "No, I don’t watch movies.", multipleChoice: { prompt: "No, ___ don’t watch movies.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "he", correct: false }] } },
    { question: "Does your mother cook every day?", answer: "No, she doesn’t cook every day.", multipleChoice: { prompt: "No, ___ doesn’t cook every day.", options: [{ letter: "A", text: "she", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "it", correct: false }] } },
    { question: "Does your brother clean his room?", answer: "No, he doesn’t clean his room.", multipleChoice: { prompt: "No, ___ doesn’t clean his room.", options: [{ letter: "A", text: "he", correct: true }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "it", correct: false }] } },
    { question: "Do you visit your grandma?", answer: "No, I don’t visit my grandma.", multipleChoice: { prompt: "No, ___ don’t visit my grandma.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do students study French in school?", answer: "No, they don’t study French in school.", multipleChoice: { prompt: "No, they ___ study French in school.", options: [{ letter: "A", text: "doesn’t", correct: false }, { letter: "B", text: "aren’t", correct: false }, { letter: "C", text: "don’t", correct: true }] } },
    { question: "Does your phone ring?", answer: "No, it doesn’t ring.", multipleChoice: { prompt: "No, ___ doesn’t ring.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "it", correct: true }] } },
    { question: "Do you drive a car?", answer: "No, I don’t drive a car.", multipleChoice: { prompt: "No, ___ don’t drive a car.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Does your friend listen to music?", answer: "No, she doesn’t listen to music.", multipleChoice: { prompt: "No, she ___ listen to music.", options: [{ letter: "A", text: "don’t", correct: false }, { letter: "B", text: "isn’t", correct: false }, { letter: "C", text: "doesn’t", correct: true }] } },
    { question: "Do you play music?", answer: "No, I don’t play music.", multipleChoice: { prompt: "No, ___ don’t play music.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Does your father eat breakfast?", answer: "No, he doesn’t eat breakfast.", multipleChoice: { prompt: "No, ___ doesn’t eat breakfast.", options: [{ letter: "A", text: "it", correct: false }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "he", correct: true }] } },
    { question: "Do your friends go to the gym?", answer: "No, they don’t go to the gym.", multipleChoice: { prompt: "No, they ___ go to the gym.", options: [{ letter: "A", text: "doesn’t", correct: false }, { letter: "B", text: "aren’t", correct: false }, { letter: "C", text: "don’t", correct: true }] } },
    { question: "Does your grandma watch YouTube?", answer: "No, she doesn’t watch YouTube.", multipleChoice: { prompt: "No, ___ doesn’t watch YouTube.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "it", correct: false }, { letter: "C", text: "she", correct: true }] } },
    { question: "Do you go to school by bus?", answer: "No, I don’t go to school by bus.", multipleChoice: { prompt: "No, I ___ go to school by bus.", options: [{ letter: "A", text: "isn’t", correct: false }, { letter: "B", text: "don’t", correct: true }, { letter: "C", text: "doesn’t", correct: false }] } },
    { question: "Does your dog run fast?", answer: "No, it doesn’t run fast.", multipleChoice: { prompt: "No, ___ doesn’t run fast.", options: [{ letter: "A", text: "it", correct: true }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do you like swimming?", answer: "No, I don’t like swimming.", multipleChoice: { prompt: "No, ___ don’t like swimming.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Does Rihanna dance well?", answer: "No, she doesn’t dance well.", multipleChoice: { prompt: "No, ___ doesn’t dance well.", options: [{ letter: "A", text: "she", correct: true }, { letter: "B", text: "it", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do you go shopping with your family?", answer: "No, I don’t go shopping with them.", multipleChoice: { prompt: "No, I don’t go shopping ___ them.", options: [{ letter: "A", text: "by", correct: false }, { letter: "B", text: "with", correct: true }, { letter: "C", text: "for", correct: false }] } },
    { question: "Does your friend study science?", answer: "No, he doesn’t study science.", multipleChoice: { prompt: "No, ___ doesn’t study science.", options: [{ letter: "A", text: "it", correct: false }, { letter: "B", text: "he", correct: true }, { letter: "C", text: "she", correct: false }] } },
    { question: "Do the students take the train?", answer: "No, they don’t take the train.", multipleChoice: { prompt: "No, they don’t ___ the train.", options: [{ letter: "A", text: "get", correct: false }, { letter: "B", text: "take", correct: true }, { letter: "C", text: "takes", correct: false }] } },
    { question: "Does it rain here?", answer: "No, it doesn’t rain here.", multipleChoice: { prompt: "No, ___ doesn’t rain here.", options: [{ letter: "A", text: "it", correct: true }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do you eat fruit?", answer: "No, I don’t eat fruit.", multipleChoice: { prompt: "No, ___ don’t eat fruit.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Does your sister drink cola?", answer: "No, she doesn’t drink cola.", multipleChoice: { prompt: "No, ___ doesn’t drink cola.", options: [{ letter: "A", text: "she", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "it", correct: false }] } },
    { question: "Do your friends travel in summer?", answer: "No, they don’t travel in summer.", multipleChoice: { prompt: "No, they ___ travel in summer.", options: [{ letter: "A", text: "doesn’t", correct: false }, { letter: "B", text: "aren’t", correct: false }, { letter: "C", text: "don’t", correct: true }] } },
    { question: "Does your brother play chess?", answer: "No, he doesn’t play ches", multipleChoice: { prompt: "No, ___ doesn’t play ches", options: [{ letter: "A", text: "she", correct: false }, { letter: "B", text: "he", correct: true }, { letter: "C", text: "it", correct: false }] } },
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
  
  table: {
    title: "📋 Simple Present: Positive Sentences (He, She, It)",
    data: [
      { category: "What is Simple Present with He/She/It?", explanation: "Same as I/You/We/They, BUT you ADD -s or -es to the verb", turkish: "Geniş zaman (3. tekil şahıs)", function: "Habits, routines, facts with he/she/it", key_difference: "MUST add -s or -es to verb!" },

      { category: "The Basic Rule", structure: "He/She/It + verb + s/es", examples: "He works / She plays / It rains", rule: "Add -s or -es to the BASE verb", turkish: "Fiile -s/-es eklenir", important: "This is ONLY for he/she/it!" },
      { category: "The Basic Rule", when_s: "Most verbs: just add -s", when_es: "Verbs ending in s/ss/sh/ch/x/o: add -es", when_ies: "Verbs ending in consonant + y: y → ies", example_s: "work → works", example_es: "watch → watches", example_ies: "study → studies" },

      { category: "Rule 1: Add -s", rule: "Most verbs: add -s", examples: "play → plays, work → works, eat → eats, live → lives, run → runs", sentence_examples: "He plays football. / She works hard. / It eats grass.", turkish: "Çoğu fiilde sadece -s", pronunciation: "/s/ or /z/ sound" },
      { category: "Rule 2: Add -es", rule: "Verbs ending in s, ss, sh, ch, x, o → add -es", examples: "pass → passes, wash → washes, watch → watches, fix → fixes, go → goes", sentence_examples: "He passes the ball. / She washes dishes. / It goes fast.", turkish: "s/ss/sh/ch/x/o ile bitenlere -es", pronunciation: "/ɪz/ sound" },
      { category: "Rule 3: consonant + y → ies", rule: "If verb ends in consonant + y: remove y, add ies", examples: "study → studies, try → tries, fly → flies, cry → cries, carry → carries", sentence_examples: "He studies medicine. / She tries hard. / It flies high.", turkish: "Ünsüz+y ile bitenlerde y → ies", note: "NOT for vowel + y (play → plays)" },
      { category: "Rule 4: vowel + y → ys", rule: "If verb ends in vowel + y: just add -s", examples: "play → plays, say → says, buy → buys, enjoy → enjoys", sentence_examples: "He plays tennis. / She says hello. / It buys time.", difference: "Vowel (a,e,i,o,u) + y = just -s", compare: "study → studies BUT play → plays" },

      { category: "Irregular Verbs", verb_have: "have → HAS", verb_do: "do → DOES", verb_go: "go → GOES", note: "Must memorize these!", examples: "He has a car. / She does homework. / It goes well.", turkish: "Düzensiz fiiller - ezberlemek gerekir!" },

      { category: "With He", subject: "He", pattern: "He + verb+s/es", examples: "He works / plays / studies / watches / has", example_sentence: "He drinks coffee every morning.", turkish: "O (erkek)...", common_use: "He always arrives early." },
      { category: "With She", subject: "She", pattern: "She + verb+s/es", examples: "She works / plays / studies / watches / has", example_sentence: "She teaches English at school.", turkish: "O (kadın)...", common_use: "She usually cooks dinner." },
      { category: "With It", subject: "It", pattern: "It + verb+s/es", examples: "It works / plays / sounds / looks / has", example_sentence: "It rains a lot in winter.", turkish: "O (hayvan/şey)...", common_use: "The dog barks. = It barks." },

      { category: "Time Expressions", same_as_other: "Same time words as I/You/We/They!", frequency: "always, usually, often, sometimes, never", time_periods: "every day/week/month/year", examples: "He always wakes up early. / She usually drinks tea. / It sometimes rains." },

      { category: "Common Mistakes", mistake: "Forgetting -s/-es ending", wrong: "He play ✗ / She work ✗ / It rain ✗", correct: "He plays ✓ / She works ✓ / It rains ✓", rule: "ALWAYS add -s/-es for he/she/it!", most_common_error: "This is the #1 mistake learners make!" },
      { category: "Common Mistakes", mistake: "Wrong ending (-es vs -s)", wrong: "He watchs ✗ / She gos ✗", correct: "He watches ✓ / She goes ✓", rule: "s/ss/sh/ch/x/o → add -es (not just -s)", tip: "Listen for the /ɪz/ sound!" },
      { category: "Common Mistakes", mistake: "Wrong irregular form", wrong: "He haves ✗ / She dos ✗", correct: "He has ✓ / She does ✓", rule: "have → has, do → does (irregular!)", note: "NOT 'haves' or 'dos'!" },

      { category: "Pronunciation of -s/-es", sound_s: "/s/ after p, t, k, f sounds: stops, eats, works", sound_z: "/z/ after vowels and voiced sounds: plays, runs, lives", sound_iz: "/ɪz/ after s/ss/sh/ch/x/z sounds: passes, washes, watches", tip: "Listen to native speakers!", practice: "He plays /pleɪz/ vs He watches /wɒtʃɪz/" },

      { category: "Real-World Examples", daily_routine: "He wakes up at 7. / She goes to work by car. / It starts at 9 AM.", work_school: "He works in a bank. / She studies law. / It takes 2 hours.", habits: "He drinks coffee daily. / She exercises often. / It rains in winter." },

      { category: "Contrast I vs He", i_form: "I play / work / study / watch / have", he_form: "He plays / works / studies / watches / has", rule: "I = base verb | He = verb+s/es", remember: "The ONLY difference is the -s/-es ending!", practice: "I go → He goes | I try → He tries" },

      { category: "Common Verbs with He/She/It", daily: "wakes up, gets up, goes, comes, leaves, arrives, eats, drinks", work: "works, studies, teaches, writes, reads, uses, needs", leisure: "plays, watches, listens, likes, loves, enjoys, prefers", states: "has, wants, knows, thinks, believes, lives" },

      { category: "Key Takeaway", summary: "He/She/It + verb+S/ES", rules: "Most verbs: +s | s/ss/sh/ch/x/o: +es | consonant+y: ies | vowel+y: ys", irregulars: "have → has, do → does, go → goes", remember: "ALWAYS add ending with he/she/it!", previous: "I/You/We/They use base verb (no -s)" }
    ]
  },
  
  speakingPractice: [
    { question: "Do you like pizza?", answer: "Yes, I do.", acceptedAlternatives: ["No, I don’t."], multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "doed", correct: false }, { letter: "B", text: "does", correct: false }, { letter: "C", text: "do", correct: true }] } },
    { question: "Does your friend play the guitar?", answer: "Yes, she does.", acceptedAlternatives: ["No, she doesn’t."], multipleChoice: { prompt: "Yes, she ___.", options: [{ letter: "A", text: "did", correct: false }, { letter: "B", text: "does", correct: true }, { letter: "C", text: "do", correct: false }] } },
    { question: "Do your friends speak English?", answer: "Yes, they do.", acceptedAlternatives: ["No, they don’t."], multipleChoice: { prompt: "Yes, they ___.", options: [{ letter: "A", text: "does", correct: false }, { letter: "B", text: "doed", correct: false }, { letter: "C", text: "do", correct: true }] } },
    { question: "Does your father eat vegetables?", answer: "Yes, he does.", acceptedAlternatives: ["No, he doesn’t."], multipleChoice: { prompt: "Yes, he ___.", options: [{ letter: "A", text: "does", correct: true }, { letter: "B", text: "do", correct: false }, { letter: "C", text: "did", correct: false }] } },
    { question: "Do you have a lesson today?", answer: "Yes, we do.", acceptedAlternatives: ["No, we don’t."], multipleChoice: { prompt: "Yes, we ___.", options: [{ letter: "A", text: "doed", correct: false }, { letter: "B", text: "do", correct: true }, { letter: "C", text: "does", correct: false }] } },
    { question: "Do you watch TV every day?", answer: "Yes, I do.", acceptedAlternatives: ["No, I don’t."], multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "do", correct: true }, { letter: "B", text: "doed", correct: false }, { letter: "C", text: "does", correct: false }] } },
    { question: "Does your dog bark at night?", answer: "Yes, it does.", acceptedAlternatives: ["No, it doesn’t."], multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "does", correct: true }, { letter: "B", text: "do", correct: false }, { letter: "C", text: "did", correct: false }] } },
    { question: "Do your parents work?", answer: "Yes, they do.", acceptedAlternatives: ["No, they don’t."], multipleChoice: { prompt: "Yes, they ___.", options: [{ letter: "A", text: "do", correct: true }, { letter: "B", text: "doed", correct: false }, { letter: "C", text: "does", correct: false }] } },
    { question: "Does your mother drink coffee?", answer: "Yes, she does.", acceptedAlternatives: ["No, she doesn’t."], multipleChoice: { prompt: "Yes, she ___.", options: [{ letter: "A", text: "do", correct: false }, { letter: "B", text: "did", correct: false }, { letter: "C", text: "does", correct: true }] } },
    { question: "Do you go to school?", answer: "Yes, I do.", acceptedAlternatives: ["No, I don’t."], multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "doed", correct: false }, { letter: "B", text: "do", correct: true }, { letter: "C", text: "does", correct: false }] } },
    { question: "Do you live in Istanbul?", answer: "Yes, I do.", acceptedAlternatives: ["No, I don’t."], multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "doed", correct: false }, { letter: "B", text: "do", correct: true }, { letter: "C", text: "does", correct: false }] } },
    { question: "Does your brother play football?", answer: "Yes, he does.", acceptedAlternatives: ["No, he doesn’t."], multipleChoice: { prompt: "Yes, he ___.", options: [{ letter: "A", text: "do", correct: false }, { letter: "B", text: "did", correct: false }, { letter: "C", text: "does", correct: true }] } },
    { question: "Do the students have homework?", answer: "Yes, they do.", acceptedAlternatives: ["No, they don’t."], multipleChoice: { prompt: "Yes, they ___.", options: [{ letter: "A", text: "do", correct: true }, { letter: "B", text: "does", correct: false }, { letter: "C", text: "doed", correct: false }] } },
    { question: "Does your teacher speak fast?", answer: "Yes, she does.", acceptedAlternatives: ["No, she doesn’t."], multipleChoice: { prompt: "Yes, she ___.", options: [{ letter: "A", text: "did", correct: false }, { letter: "B", text: "does", correct: true }, { letter: "C", text: "do", correct: false }] } },
    { question: "Do you like swimming?", answer: "Yes, I do.", acceptedAlternatives: ["No, I don’t."], multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "does", correct: false }, { letter: "B", text: "do", correct: true }, { letter: "C", text: "doed", correct: false }] } },
    { question: "Do children like chocolate?", answer: "Yes, they do.", acceptedAlternatives: ["No, they don’t."], multipleChoice: { prompt: "Yes, they ___.", options: [{ letter: "A", text: "does", correct: false }, { letter: "B", text: "do", correct: true }, { letter: "C", text: "doed", correct: false }] } },
    { question: "Does your brother watch movies?", answer: "Yes, he does.", acceptedAlternatives: ["No, he doesn’t."], multipleChoice: { prompt: "Yes, he ___.", options: [{ letter: "A", text: "did", correct: false }, { letter: "B", text: "does", correct: true }, { letter: "C", text: "do", correct: false }] } },
    { question: "Does your phone work well?", answer: "Yes, it does.", acceptedAlternatives: ["No, it doesn’t."], multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "do", correct: false }, { letter: "B", text: "did", correct: false }, { letter: "C", text: "does", correct: true }] } },
    { question: "Do you read books?", answer: "Yes, I do.", acceptedAlternatives: ["No, I don’t."], multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "do", correct: true }, { letter: "B", text: "does", correct: false }, { letter: "C", text: "doed", correct: false }] } },
    { question: "Does your sister go to the gym?", answer: "Yes, she does.", acceptedAlternatives: ["No, she doesn’t."], multipleChoice: { prompt: "Yes, she ___.", options: [{ letter: "A", text: "did", correct: false }, { letter: "B", text: "does", correct: true }, { letter: "C", text: "do", correct: false }] } },
    { question: "Do children play games?", answer: "Yes, we do.", acceptedAlternatives: ["No, we don’t."], multipleChoice: { prompt: "Yes, we ___.", options: [{ letter: "A", text: "does", correct: false }, { letter: "B", text: "doed", correct: false }, { letter: "C", text: "do", correct: true }] } },
    { question: "Does it rain here?", answer: "Yes, it does.", acceptedAlternatives: ["No, it doesn’t."], multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "does", correct: true }, { letter: "B", text: "do", correct: false }, { letter: "C", text: "did", correct: false }] } },
    { question: "Do you wake up early?", answer: "Yes, I do.", acceptedAlternatives: ["No, I don’t."], multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "does", correct: false }, { letter: "B", text: "doed", correct: false }, { letter: "C", text: "do", correct: true }] } },
    { question: "Does your sister dance?", answer: "Yes, she does.", acceptedAlternatives: ["No, she doesn’t."], multipleChoice: { prompt: "Yes, she ___.", options: [{ letter: "A", text: "do", correct: false }, { letter: "B", text: "did", correct: false }, { letter: "C", text: "does", correct: true }] } },
    { question: "Do your parents work together?", answer: "Yes, they do.", acceptedAlternatives: ["No, they don’t."], multipleChoice: { prompt: "Yes, they ___.", options: [{ letter: "A", text: "doed", correct: false }, { letter: "B", text: "does", correct: false }, { letter: "C", text: "do", correct: true }] } },
    { question: "Does your mom cook dinner?", answer: "Yes, she does.", acceptedAlternatives: ["No, she doesn’t."], multipleChoice: { prompt: "Yes, she ___.", options: [{ letter: "A", text: "did", correct: false }, { letter: "B", text: "does", correct: true }, { letter: "C", text: "do", correct: false }] } },
    { question: "Do you drink water in the morning?", answer: "Yes, I do.", acceptedAlternatives: ["No, I don’t."], multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "does", correct: false }, { letter: "B", text: "doed", correct: false }, { letter: "C", text: "do", correct: true }] } },
    { question: "Does your cat sleep a lot?", answer: "Yes, it does.", acceptedAlternatives: ["No, it doesn’t."], multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "does", correct: true }, { letter: "B", text: "do", correct: false }, { letter: "C", text: "did", correct: false }] } },
    { question: "Do you study English at home?", answer: "Yes, I do.", acceptedAlternatives: ["No, I don’t."], multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "does", correct: false }, { letter: "B", text: "doed", correct: false }, { letter: "C", text: "do", correct: true }] } },
    { question: "Does your brother drive a car?", answer: "Yes, he does.", acceptedAlternatives: ["No, he doesn’t."], multipleChoice: { prompt: "Yes, he ___.", options: [{ letter: "A", text: "do", correct: false }, { letter: "B", text: "did", correct: false }, { letter: "C", text: "does", correct: true }] } },
    { question: "Do you go shopping?", answer: "Yes, I do.", acceptedAlternatives: ["No, I don’t."], multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "do", correct: true }, { letter: "B", text: "doed", correct: false }, { letter: "C", text: "does", correct: false }] } },
    { question: "Do your friends go to school by bus?", answer: "Yes, they do.", acceptedAlternatives: ["No, they don’t."], multipleChoice: { prompt: "Yes, they ___.", options: [{ letter: "A", text: "do", correct: true }, { letter: "B", text: "doed", correct: false }, { letter: "C", text: "does", correct: false }] } },
    { question: "Does your dad speak French?", answer: "Yes, he does.", acceptedAlternatives: ["No, he doesn’t."], multipleChoice: { prompt: "Yes, he ___.", options: [{ letter: "A", text: "do", correct: false }, { letter: "B", text: "did", correct: false }, { letter: "C", text: "does", correct: true }] } },
    { question: "Do you take the train?", answer: "Yes, I do.", acceptedAlternatives: ["No, I don’t."], multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "doed", correct: false }, { letter: "B", text: "do", correct: true }, { letter: "C", text: "does", correct: false }] } },
    { question: "Does your friend like ice cream?", answer: "Yes, he does.", acceptedAlternatives: ["No, he doesn’t."], multipleChoice: { prompt: "Yes, he ___.", options: [{ letter: "A", text: "did", correct: false }, { letter: "B", text: "does", correct: true }, { letter: "C", text: "do", correct: false }] } },
    { question: "Do you eat lunch together with your family?", answer: "Yes, we do.", acceptedAlternatives: ["No, we don’t."], multipleChoice: { prompt: "Yes, we ___.", options: [{ letter: "A", text: "do", correct: true }, { letter: "B", text: "doed", correct: false }, { letter: "C", text: "does", correct: false }] } },
    { question: "Does your sister like animals?", answer: "Yes, she does.", acceptedAlternatives: ["No, she doesn’t."], multipleChoice: { prompt: "Yes, she ___.", options: [{ letter: "A", text: "does", correct: true }, { letter: "B", text: "do", correct: false }, { letter: "C", text: "did", correct: false }] } },
    { question: "Do you clean your room?", answer: "Yes, I do.", acceptedAlternatives: ["No, I don’t."], multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "do", correct: true }, { letter: "B", text: "does", correct: false }, { letter: "C", text: "doed", correct: false }] } },
    { question: "Does it snow in winter?", answer: "Yes, it does.", acceptedAlternatives: ["No, it doesn’t."], multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "do", correct: false }, { letter: "B", text: "did", correct: false }, { letter: "C", text: "does", correct: true }] } },
    { question: "Do you enjoy music?", answer: "Yes, I do.", acceptedAlternatives: ["No, I don’t."], multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "does", correct: false }, { letter: "B", text: "do", correct: true }, { letter: "C", text: "doed", correct: false }] } },
    { question: "Does your father work in a bank?", answer: "Yes, he does.", acceptedAlternatives: ["No, he doesn’t."], multipleChoice: { prompt: "Yes, he ___.", options: [{ letter: "A", text: "did", correct: false }, { letter: "B", text: "does", correct: true }, { letter: "C", text: "do", correct: false }] } },
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
  
  table: {
    title: "📋 Simple Present: Negative Sentences (don't / doesn't)",
    data: [
      { category: "What is Simple Present Negative?", explanation: "To say you DON'T do something", turkish: "Olumsuz cümleler (-mam/-mem)", function: "Express actions you DON'T do habitually", structure: "subject + don't/doesn't + BASE VERB" },

      { category: "Structure", with_i_you_we_they: "I/You/We/They + DON'T + base verb", with_he_she_it: "He/She/It + DOESN'T + base verb", key_rule: "Main verb is ALWAYS base form (no -s!)", examples: "I don't play / He doesn't play", turkish: "don't = do not, doesn't = does not" },
      { category: "Structure", important: "The -s moves to DOESN'T!", explanation: "He plays → He doesn't play (NOT doesn't plays ✗)", rule: "Only the auxiliary (doesn't) gets -s, not the main verb!", remember: "One -s per sentence - either on verb OR on auxiliary!" },

      { category: "With I/You/We/They", form: "don't + base verb", full_form: "do not", subjects: "I, you, we, they", examples: "I don't like / You don't work / We don't study / They don't play", example_sentence: "I don't drink coffee.", turkish: "-mam/-mem (Ben içmem)" },
      { category: "With I/You/We/They", common_uses: "I don't understand. / You don't know. / We don't have time. / They don't live here.", note: "don't is MORE common than 'do not'", formality: "'do not' = formal, 'don't' = everyday speech" },

      { category: "With He/She/It", form: "doesn't + base verb", full_form: "does not", subjects: "He, she, it", examples: "He doesn't like / She doesn't work / It doesn't study", example_sentence: "She doesn't eat meat.", turkish: "-maz/-mez (O yemez)" },
      { category: "With He/She/It", common_uses: "He doesn't speak English. / She doesn't drive. / It doesn't work properly.", note: "doesn't is MORE common than 'does not'", formality: "'does not' = formal/emphatic, 'doesn't' = everyday" },

      { category: "Full Forms vs Contractions", i_you_we_they: "do not = don't", he_she_it: "does not = doesn't", usage: "Contractions (don't/doesn't) used 90% of the time!", formal: "Use full forms in formal writing", spoken: "Use contractions in speech and informal writing" },

      { category: "Pronunciation", dont: "don't /doʊnt/", doesnt: "doesn't /ˈdʌzənt/", tip: "Native speakers almost ALWAYS use contractions", common_reduction: "In fast speech: /doʊn/ (very casual)", practice: "I don't know /aɪ doʊnt noʊ/" },

      { category: "Common Mistakes", mistake: "Keeping -s on main verb", wrong: "He doesn't plays ✗ / She doesn't goes ✗", correct: "He doesn't play ✓ / She doesn't go ✓", rule: "Main verb = ALWAYS base form!", explanation: "The -s is already on 'doesn't' - don't add it twice!" },
      { category: "Common Mistakes", mistake: "Using wrong auxiliary", wrong: "He don't play ✗ / I doesn't like ✗", correct: "He doesn't play ✓ / I don't like ✓", rule: "I/You/We/They = don't | He/She/It = doesn't", tip: "Match the auxiliary to the subject!" },
      { category: "Common Mistakes", mistake: "Using 'not' without do/does", wrong: "I not like ✗ / He not plays ✗", correct: "I don't like ✓ / He doesn't play ✓", rule: "Must use do/does before 'not'!", exception: "Only 'be' can use 'not' alone: I'm not, He isn't" },

      { category: "Base Verb After don't/doesn't", rule: "ALWAYS use base form of verb", examples: "doesn't work (NOT works), don't go (NOT goes), doesn't have (NOT has)", even_irregular: "doesn't have (NOT doesn't has!)", remember: "Remove ALL endings from main verb!" },

      { category: "With Time Expressions", same_as_positive: "Use same time words as positive sentences", examples: "I don't usually wake up early. / He doesn't always drink coffee. / We don't often go out.", frequency: "never, rarely, sometimes, often, usually, always", time: "every day/week, on Mondays, in the morning" },

      { category: "Common Verbs in Negative", preferences: "don't like, don't want, don't need, don't love", abilities: "don't know, don't understand, don't speak, don't remember", actions: "don't go, don't eat, don't drink, don't play, don't work", ownership: "don't have, doesn't have", examples: "I don't like coffee. / He doesn't know English." },

      { category: "Expressing Habits", negative_habits: "Things you DON'T do regularly", examples: "I don't smoke. / She doesn't drink alcohol. / We don't eat meat. / They don't watch TV.", turkish: "Alışkanlıklar (olmayan)", pattern: "subject + don't/doesn't + verb" },

      { category: "Real-World Examples", daily_life: "I don't drink coffee. / She doesn't eat breakfast. / We don't use cars.", preferences: "He doesn't like spicy food. / They don't watch horror movies.", facts: "It doesn't rain much here. / She doesn't speak French. / We don't have a garden." },

      { category: "Contrast: Positive vs Negative", positive: "I work / He works", negative: "I don't work / He doesn't work", positive_example: "She plays tennis.", negative_example: "She doesn't play tennis.", key: "Add don't/doesn't + change verb to base form" },

      { category: "Key Takeaway", summary: "I/You/We/They + DON'T + base verb | He/She/It + DOESN'T + base verb", critical_rule: "Main verb is ALWAYS BASE FORM (no -s!)", remember: "doesn't plays ✗ → doesn't play ✓", contractions: "Use don't/doesn't (not 'do not'/'does not') in everyday speech", next: "Learn how to make questions in next modules!" }
    ]
  },
  
  speakingPractice: [
    { question: "Where do you live?", answer: "I live in Istanbul.", multipleChoice: { prompt: "I ___ in Istanbul.", options: [{ letter: "A", text: "live", correct: true }, { letter: "B", text: "lives", correct: false }, { letter: "C", text: "living", correct: false }] } },
    { question: "What do you do on Sundays?", answer: "I go to the park on Sundays.", multipleChoice: { prompt: "I ___ to the park on Sundays.", options: [{ letter: "A", text: "goed", correct: false }, { letter: "B", text: "goes", correct: false }, { letter: "C", text: "go", correct: true }] } },
    { question: "When do your friends play football?", answer: "They play football on Saturday mornings.", multipleChoice: { prompt: "They ___ football on Saturday mornings.", options: [{ letter: "A", text: "plays", correct: false }, { letter: "B", text: "played", correct: false }, { letter: "C", text: "play", correct: true }] } },
    { question: "Why do you study English?", answer: "I study English because I want a good job.", multipleChoice: { prompt: "I ___ English because I want a good job.", options: [{ letter: "A", text: "studies", correct: false }, { letter: "B", text: "studyed", correct: false }, { letter: "C", text: "study", correct: true }] } },
    { question: "How do you go to school?", answer: "I go to school by bus.", multipleChoice: { prompt: "I ___ to school by bus.", options: [{ letter: "A", text: "goed", correct: false }, { letter: "B", text: "go", correct: true }, { letter: "C", text: "goes", correct: false }] } },
    { question: "What does your sister eat for breakfast?", answer: "She eats eggs and toast for breakfast.", multipleChoice: { prompt: "She ___ eggs and toast for breakfast.", options: [{ letter: "A", text: "eat", correct: false }, { letter: "B", text: "eating", correct: false }, { letter: "C", text: "eats", correct: true }] } },
    { question: "Where does your brother work?", answer: "He works at a bank.", multipleChoice: { prompt: "He ___ at a bank.", options: [{ letter: "A", text: "works", correct: true }, { letter: "B", text: "work", correct: false }, { letter: "C", text: "working", correct: false }] } },
    { question: "Who do you talk to every day?", answer: "I talk to my best friend.", multipleChoice: { prompt: "I ___ to my best friend.", options: [{ letter: "A", text: "talking", correct: false }, { letter: "B", text: "talk", correct: true }, { letter: "C", text: "talks", correct: false }] } },
    { question: "When do you get up?", answer: "I get up at 7 a.m.", multipleChoice: { prompt: "I get ___ at 7 a.m.", options: [{ letter: "A", text: "off", correct: false }, { letter: "B", text: "up", correct: true }, { letter: "C", text: "down", correct: false }] } },
    { question: "How does your brother go to work?", answer: "He goes to work by car.", multipleChoice: { prompt: "He ___ to work by car.", options: [{ letter: "A", text: "goes", correct: true }, { letter: "B", text: "go", correct: false }, { letter: "C", text: "going", correct: false }] } },
    { question: "Why do you visit your grandparents?", answer: "We visit our grandparents to spend time with them.", multipleChoice: { prompt: "We ___ our grandparents to spend time with them.", options: [{ letter: "A", text: "visiting", correct: false }, { letter: "B", text: "visit", correct: true }, { letter: "C", text: "visits", correct: false }] } },
    { question: "Where do you study?", answer: "I study at home.", multipleChoice: { prompt: "I ___ at home.", options: [{ letter: "A", text: "study", correct: true }, { letter: "B", text: "studyed", correct: false }, { letter: "C", text: "studies", correct: false }] } },
    { question: "What do children watch on TV?", answer: "They watch cartoons on TV.", multipleChoice: { prompt: "They ___ cartoons on TV.", options: [{ letter: "A", text: "watch", correct: true }, { letter: "B", text: "watches", correct: false }, { letter: "C", text: "watched", correct: false }] } },
    { question: "When does your sister clean her room?", answer: "She cleans her room on Saturdays.", multipleChoice: { prompt: "She ___ her room on Saturdays.", options: [{ letter: "A", text: "cleaning", correct: false }, { letter: "B", text: "cleans", correct: true }, { letter: "C", text: "clean", correct: false }] } },
    { question: "Who does your friend meet on Fridays?", answer: "He meets his cousin.", multipleChoice: { prompt: "___ meets his cousin.", options: [{ letter: "A", text: "she", correct: false }, { letter: "B", text: "he", correct: true }, { letter: "C", text: "it", correct: false }] } },
    { question: "How do you cook pasta?", answer: "I cook pasta with hot water and salt.", multipleChoice: { prompt: "I cook pasta ___ hot water and salt.", options: [{ letter: "A", text: "for", correct: false }, { letter: "B", text: "with", correct: true }, { letter: "C", text: "by", correct: false }] } },
    { question: "Why does your friend run every day?", answer: "She runs to stay healthy.", multipleChoice: { prompt: "She ___ to stay healthy.", options: [{ letter: "A", text: "running", correct: false }, { letter: "B", text: "runs", correct: true }, { letter: "C", text: "run", correct: false }] } },
    { question: "What time do you go to bed?", answer: "I go to bed at 10 p.m.", multipleChoice: { prompt: "I ___ to bed at 10 p.m.", options: [{ letter: "A", text: "go", correct: true }, { letter: "B", text: "goes", correct: false }, { letter: "C", text: "goed", correct: false }] } },
    { question: "What does your father do?", answer: "He works as a teacher.", multipleChoice: { prompt: "He ___ as a teacher.", options: [{ letter: "A", text: "works", correct: true }, { letter: "B", text: "work", correct: false }, { letter: "C", text: "working", correct: false }] } },
    { question: "Where do your cousins live?", answer: "They live in Ankara.", multipleChoice: { prompt: "They ___ in Ankara.", options: [{ letter: "A", text: "living", correct: false }, { letter: "B", text: "live", correct: true }, { letter: "C", text: "lives", correct: false }] } },
    { question: "When do you do your homework?", answer: "I do my homework in the evening.", multipleChoice: { prompt: "I ___ my homework in the evening.", options: [{ letter: "A", text: "does", correct: false }, { letter: "B", text: "doed", correct: false }, { letter: "C", text: "do", correct: true }] } },
    { question: "How does your friend study English?", answer: "She studies English online.", multipleChoice: { prompt: "She ___ English online.", options: [{ letter: "A", text: "studies", correct: true }, { letter: "B", text: "study", correct: false }, { letter: "C", text: "studying", correct: false }] } },
    { question: "What does ‘merhaba’ mean?", answer: "It means 'hello'.", multipleChoice: { prompt: "___ means 'hello'.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "it", correct: true }] } },
    { question: "Why do you go to the gym?", answer: "I go to the gym to exercise.", multipleChoice: { prompt: "I ___ to the gym to exercise.", options: [{ letter: "A", text: "goed", correct: false }, { letter: "B", text: "goes", correct: false }, { letter: "C", text: "go", correct: true }] } },
    { question: "Where does your friend play football?", answer: "He plays football at school.", multipleChoice: { prompt: "He ___ football at school.", options: [{ letter: "A", text: "plays", correct: true }, { letter: "B", text: "play", correct: false }, { letter: "C", text: "playing", correct: false }] } },
    { question: "What music do you like?", answer: "I like pop music.", multipleChoice: { prompt: "I ___ pop music.", options: [{ letter: "A", text: "likeed", correct: false }, { letter: "B", text: "likes", correct: false }, { letter: "C", text: "like", correct: true }] } },
    { question: "Who does your friend work with?", answer: "She works with her manager.", multipleChoice: { prompt: "She ___ with her manager.", options: [{ letter: "A", text: "work", correct: false }, { letter: "B", text: "working", correct: false }, { letter: "C", text: "works", correct: true }] } },
    { question: "When do your friends eat dinner?", answer: "They eat dinner at 7 p.m.", multipleChoice: { prompt: "They ___ dinner at 7 p.m.", options: [{ letter: "A", text: "eat", correct: true }, { letter: "B", text: "eats", correct: false }, { letter: "C", text: "eating", correct: false }] } },
    { question: "Why does your brother like summer?", answer: "He likes summer because he can swim.", multipleChoice: { prompt: "He ___ summer because he can swim.", options: [{ letter: "A", text: "liking", correct: false }, { letter: "B", text: "likes", correct: true }, { letter: "C", text: "like", correct: false }] } },
    { question: "What games do you play?", answer: "I play video games.", multipleChoice: { prompt: "I ___ video games.", options: [{ letter: "A", text: "play", correct: true }, { letter: "B", text: "played", correct: false }, { letter: "C", text: "plays", correct: false }] } },
    { question: "How do we call our friends?", answer: "We call our friends by phone.", multipleChoice: { prompt: "We call our friends ___ phone.", options: [{ letter: "A", text: "by", correct: true }, { letter: "B", text: "from", correct: false }, { letter: "C", text: "with", correct: false }] } },
    { question: "Where does your best friend live?", answer: "She lives in Levent, Istanbul.", multipleChoice: { prompt: "She ___ in Levent, Istanbul.", options: [{ letter: "A", text: "living", correct: false }, { letter: "B", text: "lives", correct: true }, { letter: "C", text: "live", correct: false }] } },
    { question: "When do you watch TV?", answer: "I watch TV at night.", multipleChoice: { prompt: "I ___ TV at night.", options: [{ letter: "A", text: "watched", correct: false }, { letter: "B", text: "watch", correct: true }, { letter: "C", text: "watches", correct: false }] } },
    { question: "What do you drink in the morning?", answer: "I drink tea in the morning.", multipleChoice: { prompt: "I ___ tea in the morning.", options: [{ letter: "A", text: "drink", correct: true }, { letter: "B", text: "drinks", correct: false }, { letter: "C", text: "drinking", correct: false }] } },
    { question: "Who do you play video games with?", answer: "I play with my friends.", multipleChoice: { prompt: "I ___ with my friends.", options: [{ letter: "A", text: "played", correct: false }, { letter: "B", text: "play", correct: true }, { letter: "C", text: "plays", correct: false }] } },
    { question: "How does a watch work?", answer: "It works with batteries.", multipleChoice: { prompt: "It ___ with batteries.", options: [{ letter: "A", text: "work", correct: false }, { letter: "B", text: "working", correct: false }, { letter: "C", text: "works", correct: true }] } },
    { question: "Why do you wake up early?", answer: "I wake up early to go to school.", multipleChoice: { prompt: "I wake ___ early to go to school.", options: [{ letter: "A", text: "up", correct: true }, { letter: "B", text: "off", correct: false }, { letter: "C", text: "down", correct: false }] } },
    { question: "What does your friend do on Sundays?", answer: "She visits her parents on Sundays.", multipleChoice: { prompt: "She ___ her parents on Sundays.", options: [{ letter: "A", text: "visiting", correct: false }, { letter: "B", text: "visits", correct: true }, { letter: "C", text: "visit", correct: false }] } },
    { question: "Where do your parents go on holiday?", answer: "They go to the seaside.", multipleChoice: { prompt: "They ___ to the seaside.", options: [{ letter: "A", text: "goes", correct: false }, { letter: "B", text: "go", correct: true }, { letter: "C", text: "goed", correct: false }] } },
    { question: "What do you want?", answer: "I want some water.", multipleChoice: { prompt: "___ want some water.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "he", correct: false }] } },
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
  
  table: {
    title: "📋 Simple Present: Yes/No Questions (Do / Does)",
    data: [
      { category: "What are Yes/No Questions?", explanation: "Questions that can be answered with 'Yes' or 'No'", turkish: "Evet/Hayır soruları", function: "To ask if something is true or not", structure: "Do/Does + subject + base verb?" },

      { category: "Structure", with_i_you_we_they: "Do + I/you/we/they + base verb?", with_he_she_it: "Does + he/she/it + base verb?", key_rule: "Put Do/Does at the BEGINNING!", examples: "Do you like? / Does she work?", turkish: "Do/Does cümle başına gelir" },
      { category: "Structure", important: "Main verb is ALWAYS base form (no -s!)", explanation: "Does she play? (NOT Does she plays? ✗)", rule: "The -s is already on 'Does' - don't add to main verb!", remember: "Inversion: Do/Does moves to the front" },

      { category: "Questions with I/You/We/They", form: "Do + subject + base verb?", examples: "Do I look tired? / Do you like pizza? / Do we need this? / Do they know?", turkish: "... mı/mi? (genel)", pattern: "Do + I/you/we/they + verb?", note: "Do NOT does!" },
      { category: "Questions with He/She/It", form: "Does + subject + base verb?", examples: "Does he work here? / Does she like coffee? / Does it work?", turkish: "... mı/mi? (o için)", pattern: "Does + he/she/it + verb?", note: "Does NOT do!" },

      { category: "Inversion", what_is_inversion: "Moving Do/Does to the FRONT", positive: "You like pizza. (statement)", question: "Do you like pizza? (question)", rule: "Flip the order: subject & do/does switch places!", turkish: "Soru yaparken sıra değişir", examples: "He plays → Does he play? / They work → Do they work?" },

      { category: "Short Answers - Positive", with_do: "Yes, I/you/we/they do.", with_does: "Yes, he/she/it does.", examples: "Do you like coffee? → Yes, I do. / Does she work? → Yes, she does.", rule: "Use do/does in the answer!", never_say: "Never say just 'Yes' alone - add 'I do' / 'she does'" },
      { category: "Short Answers - Negative", with_dont: "No, I/you/we/they don't.", with_doesnt: "No, he/she/it doesn't.", examples: "Do you smoke? → No, I don't. / Does he drive? → No, he doesn't.", rule: "Use don't/doesn't (contractions!)", note: "Can also say 'No, I do not' (formal)" },

      { category: "Full vs Short Answers", full_answer: "Yes, I like coffee. (repeating the verb)", short_answer: "Yes, I do. (more common!)", rule: "Short answers are more natural in conversation!", when_full: "Use full answers when teaching or being very clear", when_short: "Use short answers 90% of the time!" },

      { category: "Common Mistakes", mistake: "Keeping -s on main verb", wrong: "Does he plays? ✗ / Does she goes? ✗", correct: "Does he play? ✓ / Does she go? ✓", rule: "Main verb = ALWAYS base form!", explanation: "The -s is already on 'Does'!" },
      { category: "Common Mistakes", mistake: "Using wrong auxiliary", wrong: "Does you like? ✗ / Do she work? ✗", correct: "Do you like? ✓ / Does she work? ✓", rule: "I/You/We/They = Do | He/She/It = Does", tip: "Match the auxiliary to the subject!" },
      { category: "Common Mistakes", mistake: "Forgetting inversion", wrong: "You like pizza? ✗ (sounds very informal/surprised)", correct: "Do you like pizza? ✓", rule: "Must put Do/Does at the beginning!", note: "Without Do/Does, it's not a proper question!" },
      { category: "Common Mistakes", mistake: "Wrong short answer", wrong: "Do you like coffee? → Yes, I like. ✗", correct: "Do you like coffee? → Yes, I do. ✓", rule: "Use 'do/does' in short answers (NOT the main verb!)", remember: "Yes, I do (NOT Yes, I like)" },

      { category: "Intonation", rising_intonation: "Voice goes UP at the end ↗", example: "Do you like coffee? ↗", turkish: "Ses tonu yukarı çıkar", practice: "Does she work here? ↗", tip: "Rising tone shows it's a question!" },

      { category: "Common Yes/No Questions", daily: "Do you work? / Do you like...? / Do you have...? / Do you want...?", about_others: "Does he know? / Does she live here? / Does it work?", we_they: "Do we need this? / Do they speak English?", preferences: "Do you prefer tea or coffee? (still yes/no structure)" },

      { category: "Real-World Examples", asking_habits: "Do you drink coffee? / Does she exercise? / Do they eat meat?", asking_facts: "Do you live here? / Does he work in IT? / Do they speak Spanish?", asking_abilities: "Do you speak English? / Does she drive? / Do they know the answer?", asking_preferences: "Do you like this? / Does he want tea? / Do they need help?" },

      { category: "With Time Expressions", examples: "Do you usually wake up early? / Does she always drink tea? / Do they often go out?", rule: "Time words come BETWEEN subject and verb", pattern: "Do you + always/usually/often + verb?", turkish: "Sıklık zarfları özne ile fiil arasında" },

      { category: "Contrast: Statement vs Question", statement: "You like pizza.", question: "Do you like pizza?", statement_he: "He works here.", question_he: "Does he work here?", key_change: "Add Do/Does at beginning + use base verb", transformation: "Just flip the order!" },

      { category: "Key Takeaway", summary: "Do/Does + subject + BASE VERB?", rules: "I/You/We/They = Do | He/She/It = Does", short_answers: "Yes, I do / No, I don't | Yes, she does / No, she doesn't", critical: "Main verb is ALWAYS base form (no -s!)", remember: "Does she play? ✓ (NOT Does she plays? ✗)", next: "Learn Wh- Questions (What, Where, When, etc.) in next module!" }
    ]
  },
  
  speakingPractice: [
    { question: "How often do you eat breakfast?", answer: "I always eat breakfast.", multipleChoice: { prompt: "___ always eat breakfast.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Does a baby drink coffee?", answer: "A baby never drinks coffee.", multipleChoice: { prompt: "A baby ___ drinks coffee.", options: [{ letter: "A", text: "always", correct: false }, { letter: "B", text: "never", correct: true }, { letter: "C", text: "often", correct: false }] } },
    { question: "How often do your friends play football?", answer: "They usually play football on weekends.", multipleChoice: { prompt: "They ___ play football on weekends.", options: [{ letter: "A", text: "never", correct: false }, { letter: "B", text: "rarely", correct: false }, { letter: "C", text: "usually", correct: true }] } },
    { question: "Do you watch TV every day?", answer: "No, I sometimes watch TV.", multipleChoice: { prompt: "No, ___ sometimes watch TV.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Does your brother go to the gym?", answer: "He often goes to the gym.", multipleChoice: { prompt: "He ___ goes to the gym.", options: [{ letter: "A", text: "rarely", correct: false }, { letter: "B", text: "often", correct: true }, { letter: "C", text: "never", correct: false }] } },
    { question: "How often do you read books?", answer: "I usually read books before bed.", multipleChoice: { prompt: "___ usually read books before bed.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Do you eat vegetables?", answer: "Yes, I always eat vegetables.", multipleChoice: { prompt: "Yes, ___ always eat vegetables.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "How often does your mother go shopping?", answer: "She sometimes goes shopping.", multipleChoice: { prompt: "___ sometimes goes shopping.", options: [{ letter: "A", text: "she", correct: true }, { letter: "B", text: "it", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Does your brother do his homework?", answer: "Yes, he always does his homework.", multipleChoice: { prompt: "Yes, he always ___ his homework.", options: [{ letter: "A", text: "did", correct: false }, { letter: "B", text: "does", correct: true }, { letter: "C", text: "do", correct: false }] } },
    { question: "How often do you go to school?", answer: "I go to school every day. I never miss a day.", multipleChoice: { prompt: "I ___ to school every day. I never miss a day.", options: [{ letter: "A", text: "goed", correct: false }, { letter: "B", text: "go", correct: true }, { letter: "C", text: "goes", correct: false }] } },
    { question: "Does your dog bark at night?", answer: "Yes, it often barks at night.", multipleChoice: { prompt: "Yes, it ___ barks at night.", options: [{ letter: "A", text: "always", correct: false }, { letter: "B", text: "often", correct: true }, { letter: "C", text: "never", correct: false }] } },
    { question: "How often do your parents cook dinner?", answer: "They usually cook dinner at home.", multipleChoice: { prompt: "They ___ cook dinner at home.", options: [{ letter: "A", text: "never", correct: false }, { letter: "B", text: "rarely", correct: false }, { letter: "C", text: "usually", correct: true }] } },
    { question: "Do you study English at home?", answer: "Yes, I often study English at home.", multipleChoice: { prompt: "Yes, I ___ study English at home.", options: [{ letter: "A", text: "often", correct: true }, { letter: "B", text: "never", correct: false }, { letter: "C", text: "always", correct: false }] } },
    { question: "How often does your sister clean her room?", answer: "She rarely cleans her room.", multipleChoice: { prompt: "___ rarely cleans her room.", options: [{ letter: "A", text: "she", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "it", correct: false }] } },
    { question: "Do you go to the cinema?", answer: "I sometimes go to the cinema with friends.", multipleChoice: { prompt: "I ___ go to the cinema with friends.", options: [{ letter: "A", text: "never", correct: false }, { letter: "B", text: "always", correct: false }, { letter: "C", text: "sometimes", correct: true }] } },
    { question: "Does your best friend eat meat?", answer: "No, he never eats meat. He is vegetarian.", multipleChoice: { prompt: "No, he never eats meat. He ___ vegetarian.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "How often do you drink water?", answer: "I always drink water during the day.", multipleChoice: { prompt: "___ always drink water during the day.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "he", correct: false }] } },
    { question: "Does your sister play the piano?", answer: "Yes, she usually plays it in the evening.", multipleChoice: { prompt: "Yes, she ___ plays it in the evening.", options: [{ letter: "A", text: "never", correct: false }, { letter: "B", text: "rarely", correct: false }, { letter: "C", text: "usually", correct: true }] } },
    { question: "How often do you use a computer?", answer: "I use a computer every day. I always use it for school.", multipleChoice: { prompt: "I use a computer every day. I ___ use it for school.", options: [{ letter: "A", text: "always", correct: true }, { letter: "B", text: "never", correct: false }, { letter: "C", text: "rarely", correct: false }] } },
    { question: "Does it rain in summer?", answer: "No, it rarely rains in summer.", multipleChoice: { prompt: "No, it ___ rains in summer.", options: [{ letter: "A", text: "usually", correct: false }, { letter: "B", text: "rarely", correct: true }, { letter: "C", text: "always", correct: false }] } },
    { question: "Do you brush your teeth in the morning?", answer: "Yes, I always brush my teeth.", multipleChoice: { prompt: "Yes, ___ always brush my teeth.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Does your brother go to school by bus?", answer: "He usually goes to school by bus.", multipleChoice: { prompt: "He ___ goes to school by bus.", options: [{ letter: "A", text: "usually", correct: true }, { letter: "B", text: "never", correct: false }, { letter: "C", text: "rarely", correct: false }] } },
    { question: "How often do they eat out?", answer: "They often eat out on Fridays.", multipleChoice: { prompt: "They ___ eat out on Fridays.", options: [{ letter: "A", text: "always", correct: false }, { letter: "B", text: "often", correct: true }, { letter: "C", text: "never", correct: false }] } },
    { question: "Do you sleep late on weekends?", answer: "Yes, I usually sleep late.", multipleChoice: { prompt: "Yes, ___ usually sleep late.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Does your grandmother wear glasses?", answer: "She always wears glasses.", multipleChoice: { prompt: "___ always wears glasses.", options: [{ letter: "A", text: "it", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "she", correct: true }] } },
    { question: "How often do you see your grandparents?", answer: "I sometimes see my grandparents.", multipleChoice: { prompt: "___ sometimes see my grandparents.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Do you walk to school?", answer: "Yes, I often walk to school.", multipleChoice: { prompt: "Yes, I ___ walk to school.", options: [{ letter: "A", text: "never", correct: false }, { letter: "B", text: "rarely", correct: false }, { letter: "C", text: "often", correct: true }] } },
    { question: "How often do you eat fast food?", answer: "I rarely eat fast food.", multipleChoice: { prompt: "___ rarely eat fast food.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Does your brother play video games?", answer: "He sometimes plays video games.", multipleChoice: { prompt: "___ sometimes plays video games.", options: [{ letter: "A", text: "she", correct: false }, { letter: "B", text: "it", correct: false }, { letter: "C", text: "he", correct: true }] } },
    { question: "Do you visit the library?", answer: "I sometimes visit the library.", multipleChoice: { prompt: "___ sometimes visit the library.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "How often do your parents go on vacation?", answer: "They always go on vacation in summer.", multipleChoice: { prompt: "They ___ go on vacation in summer.", options: [{ letter: "A", text: "always", correct: true }, { letter: "B", text: "never", correct: false }, { letter: "C", text: "rarely", correct: false }] } },
    { question: "Do you listen to music?", answer: "I always listen to music.", multipleChoice: { prompt: "I ___ listen to music.", options: [{ letter: "A", text: "rarely", correct: false }, { letter: "B", text: "always", correct: true }, { letter: "C", text: "never", correct: false }] } },
    { question: "Does your friend ride a bike?", answer: "She rarely rides a bike.", multipleChoice: { prompt: "___ rarely rides a bike.", options: [{ letter: "A", text: "it", correct: false }, { letter: "B", text: "she", correct: true }, { letter: "C", text: "he", correct: false }] } },
    { question: "How often do you clean your room?", answer: "I usually clean my room.", multipleChoice: { prompt: "___ usually clean my room.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "Does your teacher give homework?", answer: "Yes, she often gives homework.", multipleChoice: { prompt: "Yes, ___ often gives homework.", options: [{ letter: "A", text: "it", correct: false }, { letter: "B", text: "she", correct: true }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do you eat chocolate?", answer: "I sometimes eat chocolate.", multipleChoice: { prompt: "___ sometimes eat chocolate.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Does your father arrive on time?", answer: "Yes, he usually arrives on time.", multipleChoice: { prompt: "Yes, he ___ arrives on time.", options: [{ letter: "A", text: "usually", correct: true }, { letter: "B", text: "never", correct: false }, { letter: "C", text: "rarely", correct: false }] } },
    { question: "Do your friends play tennis?", answer: "They often play tennis.", multipleChoice: { prompt: "___ often play tennis.", options: [{ letter: "A", text: "they", correct: true }, { letter: "B", text: "we", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "How often do you check your phone?", answer: "I always check my phone in the morning.", multipleChoice: { prompt: "I ___ check my phone in the morning.", options: [{ letter: "A", text: "never", correct: false }, { letter: "B", text: "rarely", correct: false }, { letter: "C", text: "always", correct: true }] } },
    { question: "Does your mother smile?", answer: "Yes, she always smiles.", multipleChoice: { prompt: "Yes, ___ always smiles.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "she", correct: true }, { letter: "C", text: "it", correct: false }] } },
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
  
  table: {
    title: "📋 Simple Present: Wh- Questions (What, Where, When, Who, Why, How)",
    data: [
      { category: "What are Wh- Questions?", explanation: "Questions that ask for SPECIFIC information (not just yes/no)", turkish: "Soru kelimeleri ile sorular", function: "To get detailed answers", examples: "What do you like? Where does she live?", difference: "Cannot be answered with just 'yes' or 'no'!" },

      { category: "The Wh- Words", what: "What (Ne?)", where: "Where (Nerede?)", when: "When (Ne zaman?)", who: "Who (Kim?)", why: "Why (Neden?)", how: "How (Nasıl?)", which: "Which (Hangi?)", whose: "Whose (Kimin?)", note: "These start your question!" },

      { category: "Basic Structure", with_i_you_we_they: "Wh- + do + I/you/we/they + base verb?", with_he_she_it: "Wh- + does + he/she/it + base verb?", pattern: "Wh- word FIRST, then do/does, then subject, then base verb", examples: "What do you eat? / Where does she live?", rule: "Same as Yes/No questions, but add Wh- word at the start!" },
      { category: "Basic Structure", important: "Main verb is ALWAYS base form (no -s!)", explanation: "Where does he work? (NOT works)", rule: "The -s is on 'does', not on the main verb!", remember: "Wh- + do/does + subject + BASE VERB" },

      { category: "What - Asking about things/actions", form: "What + do/does + subject + verb?", meaning: "Ne? (şeyler, eylemler)", examples_do: "What do you eat? / What do they play?", examples_does: "What does she like? / What does he do?", common_uses: "What do you want? / What does it mean?", answers: "Full sentences: I eat pizza. / She likes music." },

      { category: "Where - Asking about places", form: "Where + do/does + subject + verb?", meaning: "Nerede? (yerler)", examples_do: "Where do you live? / Where do they work?", examples_does: "Where does she study? / Where does it hurt?", common_uses: "Where do you go? / Where does he come from?", answers: "Full sentences: I live in Istanbul. / She works at a bank." },

      { category: "When - Asking about time", form: "When + do/does + subject + verb?", meaning: "Ne zaman? (zaman)", examples_do: "When do you wake up? / When do they arrive?", examples_does: "When does she finish? / When does it start?", common_uses: "When do you study? / When does class begin?", answers: "Full sentences: I wake up at 7. / It starts at 9." },

      { category: "Why - Asking about reasons", form: "Why + do/does + subject + verb?", meaning: "Neden? (sebepler)", examples_do: "Why do you like this? / Why do they study English?", examples_does: "Why does she go there? / Why does it cost so much?", common_uses: "Why do you think so? / Why does he work late?", answers: "Usually start with 'Because...': Because I like it. / Because it's important." },

      { category: "How - Asking about manner/method", form: "How + do/does + subject + verb?", meaning: "Nasıl? (yöntem, tarz)", examples_do: "How do you go to work? / How do they know?", examples_does: "How does she cook this? / How does it work?", common_uses: "How do you feel? / How does he do it?", answers: "Full sentences: I go by bus. / It works automatically." },

      { category: "Which - Asking about choice", form: "Which + do/does + subject + verb?", meaning: "Hangi? (seçenekler arasında)", examples_do: "Which do you prefer? / Which do they want?", examples_does: "Which does she like? / Which does it need?", usage: "Use when there are LIMITED options to choose from", answers: "Full sentences: I prefer the blue one. / She likes the first option." },

      { category: "Whose - Asking about possession", form: "Whose + do/does + subject + verb?", meaning: "Kimin? (sahiplik)", examples_do: "Whose do you like? (less common)", examples_does: "Whose does she prefer?", more_common: "Usually: Whose book is this? (with noun)", note: "Whose + noun questions are more common than Whose alone" },

      { category: "WHO - SPECIAL CASE!", explanation: "WHO as subject: NO do/does needed!", when_subject: "Who + verb(+s)? (NO do/does!)", examples: "Who plays tennis? / Who likes pizza? / Who works here?", pattern: "Who + verb+s (like he/she/it!)", why_special: "Who IS the subject, so no need for do/does!", contrast: "Who plays? ✓ (NOT Who does play? ✗)" },
      { category: "WHO - As Object", explanation: "WHO as object: DO need do/does!", when_object: "Who + do/does + subject + verb?", examples: "Who do you like? / Who does she know? / Who do they call?", pattern: "Who + do/does + subject + base verb", difference: "Who do you call? (asking ABOUT someone, not asking who is doing the action)" },

      { category: "Common Mistakes", mistake: "Keeping -s on main verb", wrong: "Where does he works? ✗ / What does she likes? ✗", correct: "Where does he work? ✓ / What does she like? ✓", rule: "Main verb = ALWAYS base form!", explanation: "The -s is already on 'does'!" },
      { category: "Common Mistakes", mistake: "Using do/does with Who as subject", wrong: "Who does play tennis? ✗", correct: "Who plays tennis? ✓", rule: "When Who is the subject, NO do/does!", remember: "Who plays? (NOT Who does play?)" },
      { category: "Common Mistakes", mistake: "Forgetting do/does", wrong: "Where you live? ✗ / What she likes? ✗", correct: "Where do you live? ✓ / What does she like? ✓", rule: "Must use do/does (except with Who as subject)", tip: "Wh- + do/does + subject + verb" },

      { category: "Intonation", falling_intonation: "Voice goes DOWN at the end ↘", example: "Where do you live? ↘", turkish: "Ses tonu aşağı iner", difference_from_yesno: "Yes/No questions go UP ↗, Wh- questions go DOWN ↘", practice: "What does she do? ↘ (falling)" },

      { category: "Answer Patterns", what_where_when: "Full sentence answers", examples: "What do you do? → I work in IT. / Where does she live? → She lives in London.", why_answers: "Use 'Because...'", why_example: "Why do you study English? → Because I need it for work.", how_answers: "Explain the method/manner", how_example: "How do you go to work? → I go by car." },

      { category: "Real-World Examples", daily_questions: "What do you do? (job) / Where do you work? / When do you finish?", about_others: "What does he like? / Where does she live? / When does it close?", preferences: "Which do you prefer? / Why do you like this? / How do they travel?", common_combos: "What time do you wake up? / How often do you exercise?" },

      { category: "Most Common Wh- Questions", everyday_1: "What do you do? (= What's your job?)", everyday_2: "Where do you live?", everyday_3: "What do you like?", everyday_4: "How do you spell that?", everyday_5: "When do you finish?", everyday_6: "Why do you ask?", everyday_7: "Who do you know here?" },

      { category: "Contrast: Yes/No vs Wh-", yesno: "Do you like pizza? → Yes/No", wh: "What do you like? → I like pizza.", yesno_he: "Does he work? → Yes/No", wh_he: "Where does he work? → He works at a bank.", key: "Yes/No = limited answer | Wh- = detailed answer", intonation: "Yes/No ↗ (rising) | Wh- ↘ (falling)" },

      { category: "Key Takeaway", summary: "Wh- word + do/does + subject + BASE VERB?", common_wh: "What, Where, When, Who, Why, How, Which, Whose", rules: "I/You/We/They = do | He/She/It = does", special_case: "Who as SUBJECT = NO do/does (Who plays?)", critical: "Main verb is ALWAYS base form (no -s!)", remember: "What does she like? ✓ (NOT likes ✗)", intonation: "Voice goes DOWN ↘ at the end" }
    ]
  },
  
  speakingPractice: [
    { question: "Can you swim?", answer: "Yes, I can swim.", multipleChoice: { prompt: "Yes, I ___ swim.", options: [{ letter: "A", text: "should", correct: false }, { letter: "B", text: "could", correct: false }, { letter: "C", text: "can", correct: true }] } },
    { question: "Can your mother drive a car?", answer: "No, she can’t drive.", multipleChoice: { prompt: "No, she ___’t drive.", options: [{ letter: "A", text: "will", correct: false }, { letter: "B", text: "could", correct: false }, { letter: "C", text: "can", correct: true }] } },
    { question: "Can your parents speak English?", answer: "No, they can’t speak English.", multipleChoice: { prompt: "No, they ___’t speak English.", options: [{ letter: "A", text: "could", correct: false }, { letter: "B", text: "will", correct: false }, { letter: "C", text: "can", correct: true }] } },
    { question: "Can your brother play the guitar?", answer: "Yes, he can play the guitar.", multipleChoice: { prompt: "Yes, he ___ play the guitar.", options: [{ letter: "A", text: "could", correct: false }, { letter: "B", text: "should", correct: false }, { letter: "C", text: "can", correct: true }] } },
    { question: "Can children go to the park?", answer: "Yes, we can go to the park.", multipleChoice: { prompt: "Yes, we ___ go to the park.", options: [{ letter: "A", text: "should", correct: false }, { letter: "B", text: "can", correct: true }, { letter: "C", text: "could", correct: false }] } },
    { question: "Can your brother cook?", answer: "No, he can’t cook.", multipleChoice: { prompt: "No, he ___’t cook.", options: [{ letter: "A", text: "can", correct: true }, { letter: "B", text: "will", correct: false }, { letter: "C", text: "could", correct: false }] } },
    { question: "Can your dog run fast?", answer: "Yes, it can run very fast.", multipleChoice: { prompt: "Yes, it ___ run very fast.", options: [{ letter: "A", text: "can", correct: true }, { letter: "B", text: "should", correct: false }, { letter: "C", text: "could", correct: false }] } },
    { question: "Can you ride a bike?", answer: "Yes, I can ride a bike.", multipleChoice: { prompt: "Yes, I ___ ride a bike.", options: [{ letter: "A", text: "can", correct: true }, { letter: "B", text: "should", correct: false }, { letter: "C", text: "could", correct: false }] } },
    { question: "Can I open the window?", answer: "Yes, you can.", multipleChoice: { prompt: "Yes, you ___.", options: [{ letter: "A", text: "will", correct: false }, { letter: "B", text: "can", correct: true }, { letter: "C", text: "could", correct: false }] } },
    { question: "Can your sister speak Spanish?", answer: "No, she can’t speak Spanish.", multipleChoice: { prompt: "No, she ___’t speak Spanish.", options: [{ letter: "A", text: "will", correct: false }, { letter: "B", text: "can", correct: true }, { letter: "C", text: "could", correct: false }] } },
    { question: "Can your brother use a computer?", answer: "Yes, he can use a computer.", multipleChoice: { prompt: "Yes, he ___ use a computer.", options: [{ letter: "A", text: "should", correct: false }, { letter: "B", text: "can", correct: true }, { letter: "C", text: "could", correct: false }] } },
    { question: "Can students eat in class?", answer: "No, they can’t eat in class.", multipleChoice: { prompt: "No, they ___’t eat in class.", options: [{ letter: "A", text: "can", correct: true }, { letter: "B", text: "will", correct: false }, { letter: "C", text: "could", correct: false }] } },
    { question: "Can you help me?", answer: "Yes, I can help you.", multipleChoice: { prompt: "Yes, I ___ help you.", options: [{ letter: "A", text: "can", correct: true }, { letter: "B", text: "could", correct: false }, { letter: "C", text: "should", correct: false }] } },
    { question: "Can your friend dance?", answer: "No, he can’t dance.", multipleChoice: { prompt: "No, he ___’t dance.", options: [{ letter: "A", text: "can", correct: true }, { letter: "B", text: "could", correct: false }, { letter: "C", text: "will", correct: false }] } },
    { question: "Can your friends play football?", answer: "Yes, they can play football.", multipleChoice: { prompt: "Yes, they ___ play football.", options: [{ letter: "A", text: "could", correct: false }, { letter: "B", text: "can", correct: true }, { letter: "C", text: "should", correct: false }] } },
    { question: "Can you buy fresh vegetables from the market?", answer: "Yes, you can buy fresh vegetables from the market.", multipleChoice: { prompt: "Yes, you ___ buy fresh vegetables from the market.", options: [{ letter: "A", text: "could", correct: false }, { letter: "B", text: "can", correct: true }, { letter: "C", text: "should", correct: false }] } },
    { question: "Can your father sing well?", answer: "No, he can’t sing well.", multipleChoice: { prompt: "No, he ___’t sing well.", options: [{ letter: "A", text: "could", correct: false }, { letter: "B", text: "can", correct: true }, { letter: "C", text: "will", correct: false }] } },
    { question: "Can your parents speak French?", answer: "No, they can’t speak French.", multipleChoice: { prompt: "No, they ___’t speak French.", options: [{ letter: "A", text: "can", correct: true }, { letter: "B", text: "could", correct: false }, { letter: "C", text: "will", correct: false }] } },
    { question: "Can your sister draw?", answer: "Yes, she can draw very well.", multipleChoice: { prompt: "Yes, she ___ draw very well.", options: [{ letter: "A", text: "can", correct: true }, { letter: "B", text: "could", correct: false }, { letter: "C", text: "should", correct: false }] } },
    { question: "Can students leave school early?", answer: "No, they can’t leave school early.", multipleChoice: { prompt: "No, they ___’t leave school early.", options: [{ letter: "A", text: "can", correct: true }, { letter: "B", text: "could", correct: false }, { letter: "C", text: "will", correct: false }] } },
    { question: "Can a penguin fly?", answer: "No, it can’t fly.", multipleChoice: { prompt: "No, it ___’t fly.", options: [{ letter: "A", text: "could", correct: false }, { letter: "B", text: "will", correct: false }, { letter: "C", text: "can", correct: true }] } },
    { question: "Can you use a smartphone?", answer: "Yes, I can use a smartphone.", multipleChoice: { prompt: "Yes, I can use a ___.", options: [{ letter: "A", text: "phone", correct: false }, { letter: "B", text: "mobile", correct: false }, { letter: "C", text: "smartphone", correct: true }] } },
    { question: "Can Michael Jordan jump high?", answer: "Yes, he can jump very high.", multipleChoice: { prompt: "Yes, he ___ jump very high.", options: [{ letter: "A", text: "could", correct: false }, { letter: "B", text: "should", correct: false }, { letter: "C", text: "can", correct: true }] } },
    { question: "Can I go to the bathroom?", answer: "Yes, you can go to the bathroom.", multipleChoice: { prompt: "Yes, you ___ go to the bathroom.", options: [{ letter: "A", text: "should", correct: false }, { letter: "B", text: "could", correct: false }, { letter: "C", text: "can", correct: true }] } },
    { question: "Can your friends come here with you?", answer: "No, they can’t come with me.", multipleChoice: { prompt: "No, they ___’t come with me.", options: [{ letter: "A", text: "will", correct: false }, { letter: "B", text: "could", correct: false }, { letter: "C", text: "can", correct: true }] } },
    { question: "Can your sister make a cake?", answer: "Yes, she can make a cake.", multipleChoice: { prompt: "Yes, she ___ make a cake.", options: [{ letter: "A", text: "should", correct: false }, { letter: "B", text: "could", correct: false }, { letter: "C", text: "can", correct: true }] } },
    { question: "Can dogs run fast?", answer: "Yes, they can run fast.", multipleChoice: { prompt: "Yes, they ___ run fast.", options: [{ letter: "A", text: "could", correct: false }, { letter: "B", text: "should", correct: false }, { letter: "C", text: "can", correct: true }] } },
    { question: "Can you see the board?", answer: "Yes, I can see the board.", multipleChoice: { prompt: "Yes, I ___ see the board.", options: [{ letter: "A", text: "could", correct: false }, { letter: "B", text: "should", correct: false }, { letter: "C", text: "can", correct: true }] } },
    { question: "Can you watch a movie with your friends this weekend?", answer: "Yes, we can watch a movie this weekend.", multipleChoice: { prompt: "Yes, we ___ watch a movie this weekend.", options: [{ letter: "A", text: "could", correct: false }, { letter: "B", text: "should", correct: false }, { letter: "C", text: "can", correct: true }] } },
    { question: "Can your sister play the piano?", answer: "No, she can’t play the piano.", multipleChoice: { prompt: "No, she ___’t play the piano.", options: [{ letter: "A", text: "can", correct: true }, { letter: "B", text: "will", correct: false }, { letter: "C", text: "could", correct: false }] } },
    { question: "Can I sit here?", answer: "Yes, you can sit here.", multipleChoice: { prompt: "Yes, you ___ sit here.", options: [{ letter: "A", text: "can", correct: true }, { letter: "B", text: "should", correct: false }, { letter: "C", text: "could", correct: false }] } },
    { question: "Can the baby walk?", answer: "No, the baby can’t walk.", multipleChoice: { prompt: "No, the baby ___’t walk.", options: [{ letter: "A", text: "can", correct: true }, { letter: "B", text: "will", correct: false }, { letter: "C", text: "could", correct: false }] } },
    { question: "Can you speak loudly?", answer: "Yes, I can speak loudly.", multipleChoice: { prompt: "Yes, I ___ speak loudly.", options: [{ letter: "A", text: "should", correct: false }, { letter: "B", text: "can", correct: true }, { letter: "C", text: "could", correct: false }] } },
    { question: "Can your friends arrive on time?", answer: "Yes, they can arrive on time.", multipleChoice: { prompt: "Yes, they ___ arrive on time.", options: [{ letter: "A", text: "should", correct: false }, { letter: "B", text: "can", correct: true }, { letter: "C", text: "could", correct: false }] } },
    { question: "Can your father fix the car?", answer: "Yes, he can fix the car.", multipleChoice: { prompt: "Yes, he ___ fix the car.", options: [{ letter: "A", text: "should", correct: false }, { letter: "B", text: "can", correct: true }, { letter: "C", text: "could", correct: false }] } },
    { question: "Can I borrow your pen?", answer: "Yes, you can borrow my pen.", multipleChoice: { prompt: "Yes, you ___ borrow my pen.", options: [{ letter: "A", text: "can", correct: true }, { letter: "B", text: "should", correct: false }, { letter: "C", text: "could", correct: false }] } },
    { question: "Can your cat open the door?", answer: "No, it can’t open the door.", multipleChoice: { prompt: "No, it ___’t open the door.", options: [{ letter: "A", text: "can", correct: true }, { letter: "B", text: "will", correct: false }, { letter: "C", text: "could", correct: false }] } },
    { question: "Can you go outside now?", answer: "No, I can’t go outside now.", multipleChoice: { prompt: "No, I ___’t go outside now.", options: [{ letter: "A", text: "can", correct: true }, { letter: "B", text: "could", correct: false }, { letter: "C", text: "will", correct: false }] } },
    { question: "Can you play chess?", answer: "Yes, I can play chess.", multipleChoice: { prompt: "Yes, I ___ play chess.", options: [{ letter: "A", text: "could", correct: false }, { letter: "B", text: "can", correct: true }, { letter: "C", text: "should", correct: false }] } },
    { question: "Can your sister read English books?", answer: "No, she can’t read English books.", multipleChoice: { prompt: "No, she ___’t read English books.", options: [{ letter: "A", text: "could", correct: false }, { letter: "B", text: "can", correct: true }, { letter: "C", text: "will", correct: false }] } },
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
  
  table: {
    title: "📋 Adverbs of Frequency (Sıklık Zarfları)",
    data: [
      { category: "What are Adverbs of Frequency?", explanation: "Words that tell HOW OFTEN something happens", turkish: "Sıklık zarfları", function: "Show the frequency of actions", usage: "Answer the question: How often?" },

      { category: "The Frequency Scale", percent_100: "Always (100%) - Her zaman", percent_90: "Usually (90%) - Genellikle", percent_70: "Often (70%) - Sık sık", percent_50: "Sometimes (50%) - Bazen", percent_10: "Rarely/Seldom (10%) - Nadiren", percent_0: "Never (0%) - Asla", note: "From most frequent to least frequent" },

      { category: "Always - 100%", adverb: "Always", turkish: "Her zaman", meaning: "Every single time, without exception", example: "I always brush my teeth before bed.", usage: "100% of the time", negative: "NEVER say 'always not' - use 'never' instead!" },
      { category: "Always - 100%", more_examples: "She always arrives on time. / They always eat breakfast. / He always wears a suit.", pattern: "Subject + always + verb", position: "BEFORE the main verb", note: "Shows a habitual action that happens every time" },

      { category: "Usually - 90%", adverb: "Usually", turkish: "Genellikle", meaning: "Most of the time, but not always", example: "I usually drink coffee in the morning.", usage: "About 90% of the time", flexibility: "Sometimes you don't, but most times you do" },
      { category: "Usually - 90%", more_examples: "He usually goes to bed at 10 PM. / We usually walk to work. / She usually cooks dinner.", pattern: "Subject + usually + verb", position: "BEFORE the main verb", note: "Very common in daily routines" },

      { category: "Often - 70%", adverb: "Often", turkish: "Sık sık", meaning: "Many times, frequently", example: "We often visit our grandparents.", usage: "About 70% of the time", synonym: "Frequently", note: "More than sometimes, less than usually" },
      { category: "Often - 70%", more_examples: "They often play tennis. / I often read before sleeping. / She often works late.", pattern: "Subject + often + verb", position: "BEFORE the main verb", alternative: "Can also go at END: I visit them often." },

      { category: "Sometimes - 50%", adverb: "Sometimes", turkish: "Bazen", meaning: "Occasionally, not regularly", example: "I sometimes eat pizza on weekends.", usage: "About 50% of the time", flexibility: "Can go at beginning, middle, or end of sentence" },
      { category: "Sometimes - 50%", positions: "Beginning: Sometimes I go to the gym. / Middle: I sometimes go to the gym. / End: I go to the gym sometimes.", all_correct: "All three positions are correct!", most_common: "Middle position is most common", pattern: "Subject + sometimes + verb" },

      { category: "Rarely / Seldom - 10%", adverbs: "Rarely = Seldom", turkish: "Nadiren", meaning: "Not often, almost never", example: "He rarely eats meat. / She seldom watches TV.", usage: "About 10% of the time", note: "Almost the same as 'never', but slightly more often" },
      { category: "Rarely / Seldom - 10%", more_examples: "I rarely go out at night. / They seldom argue. / We rarely see snow here.", pattern: "Subject + rarely/seldom + verb", formal: "Seldom is more formal than rarely", common: "Rarely is more commonly used" },

      { category: "Never - 0%", adverb: "Never", turkish: "Asla", meaning: "Not even once, at no time", example: "I never smoke.", usage: "0% of the time", important: "Already negative - DON'T use with 'not'!", wrong: "I don't never smoke ✗" },
      { category: "Never - 0%", more_examples: "She never drinks alcohol. / They never arrive late. / He never forgets his keys.", pattern: "Subject + never + verb", note: "Strong and absolute", warning: "Never is already negative - don't add don't/doesn't!" },

      { category: "Position Rule 1: With BE verb", rule: "After the BE verb (am/is/are/was/were)", examples: "I am always happy. / She is usually late. / They are never angry.", pattern: "Subject + BE + adverb + adjective/noun", turkish: "BE fiilinden sonra", remember: "AFTER be, BEFORE other verbs!" },

      { category: "Position Rule 2: With other verbs", rule: "BEFORE the main verb", examples: "I always eat breakfast. / She usually drinks tea. / We never smoke.", pattern: "Subject + adverb + verb", turkish: "Diğer fiillerden önce", remember: "The adverb comes BETWEEN subject and verb!" },

      { category: "Position Rule 3: With modal verbs", rule: "AFTER modal verbs (can, will, must, should)", examples: "I can always help you. / She will never forget. / You should usually exercise.", pattern: "Subject + modal + adverb + verb", turkish: "Yardımcı fiillerden sonra", note: "After can/will/must/should, before main verb" },

      { category: "Questions with Adverbs", question_form: "Do/Does + subject + adverb + verb?", examples: "Do you always wake up early? / Does she usually drink coffee? / Do they often go out?", pattern: "Do/Does + subject + frequency adverb + base verb?", note: "Adverb comes AFTER subject in questions" },

      { category: "Common Mistakes", mistake: "Wrong position with BE", wrong: "I always am happy. ✗", correct: "I am always happy. ✓", rule: "Adverb comes AFTER be, not before!", remember: "BE + adverb (not adverb + BE)" },
      { category: "Common Mistakes", mistake: "Using never with not", wrong: "I don't never smoke. ✗", correct: "I never smoke. ✓", rule: "Never is already negative!", explanation: "Don't use two negatives together" },
      { category: "Common Mistakes", mistake: "Wrong word order in questions", wrong: "Do always you wake up early? ✗", correct: "Do you always wake up early? ✓", rule: "Adverb comes AFTER subject in questions", pattern: "Do/Does + subject + adverb + verb?" },

      { category: "Contrasting Examples", always_vs_never: "I always exercise. (100%) ↔ I never exercise. (0%)", usually_vs_rarely: "She usually eats meat. (90%) ↔ She rarely eats meat. (10%)", often_vs_sometimes: "We often travel. (70%) ↔ We sometimes travel. (50%)", key: "Choose the adverb that matches your frequency!" },

      { category: "Real-World Usage", daily_routine: "I always wake up at 7. / I usually have coffee. / I sometimes skip breakfast. / I never arrive late.", habits: "She often exercises. / He rarely watches TV. / They usually eat out.", preferences: "I never eat meat. / She always drinks water. / We sometimes have pizza." },

      { category: "Key Takeaway", summary: "Adverbs of frequency show HOW OFTEN", scale: "Always > Usually > Often > Sometimes > Rarely > Never", position_be: "AFTER be: I am always happy", position_other: "BEFORE main verb: I always eat", position_modal: "AFTER modal: I can always help", remember: "Never is already negative (don't use with 'not')!" }
    ]
  },
  
  speakingPractice: [
    { question: "How many brothers do you have?", answer: "I have two brothers.", multipleChoice: { prompt: "I ___ two brothers.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "Do you have any chairs in your room?", answer: "Yes, I have three chairs in my room.", multipleChoice: { prompt: "Yes, I ___ three chairs in my room.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "Are there any apples in the kitchen?", answer: "Yes, there are five apples in the kitchen.", multipleChoice: { prompt: "Yes, there ___ five apples in the kitchen.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "How many windows are there in your living room?", answer: "There are three windows in my living room.", multipleChoice: { prompt: "There ___ three windows in my living room.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Do you buy bananas from the market?", answer: "Yes, I usually buy bananas from the market.", multipleChoice: { prompt: "Yes, I usually buy bananas ___ the market.", options: [{ letter: "A", text: "by", correct: false }, { letter: "B", text: "from", correct: true }, { letter: "C", text: "to", correct: false }] } },
    { question: "How many students are in your class?", answer: "There are twenty students in my class.", multipleChoice: { prompt: "There ___ twenty students in my class.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "Do you have a pen in your bag?", answer: "Yes, I have a pen in my bag.", multipleChoice: { prompt: "Yes, I ___ a pen in my bag.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "has", correct: false }] } },
    { question: "Are there any eggs in the fridge?", answer: "Yes, there are some eggs in the fridge.", multipleChoice: { prompt: "Yes, there ___ some eggs in the fridge.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "Do you need more pants?", answer: "Yes, I need a few more pants.", multipleChoice: { prompt: "Yes, ___ need a few more pants.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "How many cousins do you have?", answer: "I have six cousins.", multipleChoice: { prompt: "I ___ six cousins.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "has", correct: false }] } },
    { question: "Do you drink milk every day?", answer: "How much? Yes, I drink a glass of milk every day.", multipleChoice: { prompt: "How much? Yes, I drink ___ milk every day.", options: [{ letter: "A", text: "a slice of", correct: false }, { letter: "B", text: "a glass of", correct: true }, { letter: "C", text: "a piece of", correct: false }] } },
    { question: "Is there any sugar in your tea?", answer: "No, there isn’t any sugar in my tea.", multipleChoice: { prompt: "No, there isn’t ___ sugar in my tea.", options: [{ letter: "A", text: "many", correct: false }, { letter: "B", text: "a", correct: false }, { letter: "C", text: "any", correct: true }] } },
    { question: "How much water do you drink daily?", answer: "I drink about two liters of water every day.", multipleChoice: { prompt: "I drink ___ two liters of water every day.", options: [{ letter: "A", text: "about", correct: true }, { letter: "B", text: "of", correct: false }, { letter: "C", text: "on", correct: false }] } },
    { question: "Do you eat much rice?", answer: "No, I don’t eat much rice.", multipleChoice: { prompt: "No, ___ don’t eat much rice.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Is there any bread on the table?", answer: "Yes, there is some bread on the table.", multipleChoice: { prompt: "Yes, there ___ some bread on the table.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Do you like to eat cheese?", answer: "Yes, I like to eat cheese.", multipleChoice: { prompt: "Yes, I ___ to eat cheese.", options: [{ letter: "A", text: "likes", correct: false }, { letter: "B", text: "like", correct: true }, { letter: "C", text: "likeed", correct: false }] } },
    { question: "Is there any butter in the fridge?", answer: "Yes, there is a little butter in the fridge.", multipleChoice: { prompt: "Yes, there ___ a little butter in the fridge.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "How much money do you have in your wallet?", answer: "I have a little money in my wallet.", multipleChoice: { prompt: "I ___ a little money in my wallet.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "had", correct: false }] } },
    { question: "Do you usually eat much meat?", answer: "No, I don’t eat much meat.", multipleChoice: { prompt: "No, ___ don’t eat much meat.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do you need some flour for the cake?", answer: "Yes, I need some flour for the cake.", multipleChoice: { prompt: "Yes, I need ___ flour for the cake.", options: [{ letter: "A", text: "any", correct: false }, { letter: "B", text: "some", correct: true }, { letter: "C", text: "many", correct: false }] } },
    { question: "Do you have any books in your bag?", answer: "Yes, I have two books in my bag.", multipleChoice: { prompt: "Yes, I ___ two books in my bag.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "Is there any juice in the bottle?", answer: "Yes, there is some juice in the bottle.", multipleChoice: { prompt: "Yes, there ___ some juice in the bottle.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "How many oranges are on the table?", answer: "There are four oranges on the table.", multipleChoice: { prompt: "There ___ four oranges on the table.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "How much coffee do you drink in the morning?", answer: "I drink one cup of coffee in the morning.", multipleChoice: { prompt: "I drink ___ coffee in the morning.", options: [{ letter: "A", text: "one piece of", correct: false }, { letter: "B", text: "one slice of", correct: false }, { letter: "C", text: "one cup of", correct: true }] } },
    { question: "Do you eat many apples?", answer: "Yes, I eat many apples.", multipleChoice: { prompt: "Yes, ___ eat many apples.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Is there any oil in the pan?", answer: "Yes, there is a little oil in the pan.", multipleChoice: { prompt: "Yes, there ___ a little oil in the pan.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "How many sandwiches do you want?", answer: "I want two sandwiches.", multipleChoice: { prompt: "___ want two sandwiches.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Do you have any homework today?", answer: "Yes, I have some homework today.", multipleChoice: { prompt: "Yes, I ___ some homework today.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "Is there any milk left?", answer: "Yes, there is a little milk left.", multipleChoice: { prompt: "Yes, there ___ a little milk left.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "How much time do we have?", answer: "We have a little time.", multipleChoice: { prompt: "We ___ a little time.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "has", correct: false }] } },
    { question: "Do you have any pencils?", answer: "Yes, I have five pencils.", multipleChoice: { prompt: "Yes, I ___ five pencils.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "has", correct: false }] } },
    { question: "Is there any soup in the bowl?", answer: "Yes, there is some soup in the bowl.", multipleChoice: { prompt: "Yes, there ___ some soup in the bowl.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "How many cookies do you want?", answer: "I want three cookies.", multipleChoice: { prompt: "___ want three cookies.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "Do you drink much tea?", answer: "Yes, I drink a lot of tea.", multipleChoice: { prompt: "Yes, I drink ___ tea.", options: [{ letter: "A", text: "a lot of", correct: true }, { letter: "B", text: "many", correct: false }, { letter: "C", text: "a few", correct: false }] } },
    { question: "Are there any tomatoes in the salad?", answer: "Yes, there are some tomatoes in the salad.", multipleChoice: { prompt: "Yes, there ___ some tomatoes in the salad.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "How much salt do you use?", answer: "I use a little salt.", multipleChoice: { prompt: "___ use a little salt.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Do you eat many vegetables?", answer: "Yes, I eat many vegetables.", multipleChoice: { prompt: "Yes, ___ eat many vegetables.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Is there any shampoo in the bottle?", answer: "Yes, there is some shampoo in the bottle.", multipleChoice: { prompt: "Yes, there ___ some shampoo in the bottle.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "How many pens do you need?", answer: "I need two pens.", multipleChoice: { prompt: "___ need two pens.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do you usually eat much pasta?", answer: "No, I don’t eat much pasta.", multipleChoice: { prompt: "No, ___ don’t eat much pasta.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "he", correct: false }] } },
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
  
  table: {
    title: "📋 Can / Can't for Abilities (Yetenekler için Can / Can't)",
    data: [
      { category: "What is 'can'?", explanation: "Modal verb used to express ABILITY (things you are able to do)", turkish: "Yapabilmek/yapamamak", function: "Talk about skills and abilities", examples: "I can swim / She can't drive", note: "Shows what someone is capable of doing" },

      { category: "Structure - Positive", form: "Subject + CAN + base verb", examples: "I can swim / You can sing / He can drive / We can speak English", rule: "Use BASE FORM of verb after 'can' (no -s, no -ing!)", turkish: "Özne + can + fiil (yalın hali)", important: "NO -s even with he/she/it!" },
      { category: "Structure - Positive", key_point: "Same form for ALL subjects!", all_subjects: "I/You/He/She/It/We/They + can + verb", examples: "I can play / He can play / They can play", rule: "No conjugation needed!", wrong: "He cans ✗ / She can plays ✗" },

      { category: "Structure - Negative", form: "Subject + CAN'T (cannot) + base verb", examples: "I can't swim / She can't drive / They can't speak French", full_form: "cannot (one word, no space!)", contracted: "can't (more common in speech)", turkish: "Özne + can't + fiil", note: "Main verb stays in base form" },
      { category: "Structure - Negative", important: "Don't use 'don't' or 'doesn't' with can!", wrong: "I don't can swim ✗ / He doesn't can drive ✗", correct: "I can't swim ✓ / He can't drive ✓", rule: "Can forms its own negative - just add 'not'", remember: "CAN'T (not don't can)" },

      { category: "Structure - Questions", form: "CAN + subject + base verb?", examples: "Can you swim? / Can she drive? / Can they speak English?", inversion: "Put 'can' at the beginning (before subject)", turkish: "Can + özne + fiil?", pattern: "Move 'can' to the front to make a question" },
      { category: "Structure - Questions", important: "Don't use 'do/does' with can!", wrong: "Do you can swim? ✗ / Does he can drive? ✗", correct: "Can you swim? ✓ / Can he drive? ✓", rule: "Can forms its own questions - just move it to the front", remember: "CAN + subject (not do/does)" },

      { category: "Short Answers - Positive", pattern: "Yes, subject + can.", examples: "Can you swim? → Yes, I can. / Can she drive? → Yes, she can.", note: "Don't repeat the main verb!", wrong: "Yes, I can swim ✗ (too long for short answer)", correct: "Yes, I can ✓", full_answer: "Yes, I can swim. (for emphasis)" },
      { category: "Short Answers - Negative", pattern: "No, subject + can't.", examples: "Can you swim? → No, I can't. / Can he dance? → No, he can't.", note: "Use contraction (can't) in speech", formal: "No, I cannot. (very formal)", everyday: "No, I can't. (normal speech)", remember: "Short answer = subject + can/can't" },

      { category: "Common Abilities", physical: "swim, run, jump, dance, climb, ride (a bike), drive", skills: "cook, draw, paint, sing, play (an instrument), write", languages: "speak English/French/etc., read, understand", sports: "play football/tennis/etc., ski, skate", examples: "I can swim fast. / She can play the piano. / They can speak three languages." },

      { category: "Pronunciation", can_strong: "CAN /kæn/ (stressed) - used in short answers: Yes, I CAN!", can_weak: "can /kən/ (unstressed) - used in sentences: I can /kən/ swim.", cant: "CAN'T /kɑːnt/ (always stressed)", tip: "In normal speech, 'can' sounds like 'kən'", practice: "I can /kən/ help you. vs No, I CAN'T." },

      { category: "Common Mistakes", mistake: "Adding -s to can with he/she/it", wrong: "He cans swim. ✗", correct: "He can swim. ✓", rule: "Can NEVER changes form!", explanation: "Modal verbs don't conjugate" },
      { category: "Common Mistakes", mistake: "Adding -s or -ing to main verb", wrong: "I can swims. ✗ / She can swimming. ✗", correct: "I can swim. ✓ / She can swim. ✓", rule: "Use BASE FORM after can!", remember: "can + base verb (no endings!)" },
      { category: "Common Mistakes", mistake: "Using 'to' after can", wrong: "I can to swim. ✗", correct: "I can swim. ✓", rule: "NO 'to' after can!", comparison: "I want to swim ✓ BUT I can swim ✓", note: "Modal verbs don't use 'to'" },
      { category: "Common Mistakes", mistake: "Using do/does with can", wrong: "Do you can swim? ✗ / Does she can drive? ✗", correct: "Can you swim? ✓ / Can she drive? ✓", rule: "Can makes its own questions!", remember: "Just move 'can' to the front" },

      { category: "Can for Different Subjects", i_you_we_they: "I/You/We/They + can + verb", examples_plural: "I can cook / You can dance / We can help / They can come", he_she_it: "He/She/It + can + verb", examples_singular: "He can sing / She can drive / It can fly", same_form: "ALL use 'can' (no changes!)", rule: "No -s, no conjugation, same for everyone!" },

      { category: "Talking About Abilities", what_you_can_do: "I can swim / cook / drive / play guitar / speak English", what_you_cant_do: "I can't fly / can't speak Japanese / can't play chess", asking_others: "Can you help me? / Can she come? / Can they stay?", general_abilities: "Birds can fly. / Fish can swim. / Babies can't walk." },

      { category: "Real-World Examples", skills: "I can cook Italian food. / She can play three instruments. / He can speak five languages.", asking_for_help: "Can you help me? / Can you open the door? / Can you pass the salt?", general_facts: "Dogs can hear very well. / Penguins can't fly. / Cats can see in the dark.", sports: "He can run very fast. / She can swim 50 meters. / They can play football well." },

      { category: "Can vs Can't - Listen Carefully!", difference: "CAN /kən/ (weak) vs CAN'T /kɑːnt/ (strong)", tip: "Can't is always stressed and clear", listen_for: "Can't ends with a 't' sound!", practice: "I can /kən/ swim. (able) vs I can't /kɑːnt/ swim. (not able)", important: "Pay attention to the 't' sound in can't!" },

      { category: "Key Takeaway", summary: "CAN/CAN'T + base verb (for abilities)", positive: "Subject + can + verb (I can swim)", negative: "Subject + can't + verb (I can't swim)", question: "Can + subject + verb? (Can you swim?)", rules: "No -s with can | No 'to' after can | Use base verb | Same form for all subjects", remember: "CAN shows ability/possibility | CAN'T shows inability", next: "Next module: Can/Can't for permission!" }
    ]
  },
  
  speakingPractice: [
    { question: "Do you have any brothers?", answer: "Yes, I have two brothers.", multipleChoice: { prompt: "Yes, I ___ two brothers.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "Is there any water in the bottle?", answer: "Yes, there is some water in the bottle.", multipleChoice: { prompt: "Yes, there ___ some water in the bottle.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Do you have any milk?", answer: "No, I don’t have any milk.", multipleChoice: { prompt: "No, I don’t ___ any milk.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "Can I have some coffee?", answer: "Yes, you can have some coffee.", multipleChoice: { prompt: "Yes, you ___ have some coffee.", options: [{ letter: "A", text: "could", correct: false }, { letter: "B", text: "should", correct: false }, { letter: "C", text: "can", correct: true }] } },
    { question: "Are there any bananas on the table?", answer: "No, there aren’t any bananas on the table.", multipleChoice: { prompt: "No, there aren’t ___ bananas on the table.", options: [{ letter: "A", text: "a", correct: false }, { letter: "B", text: "any", correct: true }, { letter: "C", text: "some", correct: false }] } },
    { question: "Do you need any help?", answer: "Yes, I need some help.", multipleChoice: { prompt: "Yes, ___ need some help.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Would you like some juice?", answer: "Yes, I’d like some juice.", multipleChoice: { prompt: "Yes, I’d like ___ juice.", options: [{ letter: "A", text: "some", correct: true }, { letter: "B", text: "any", correct: false }, { letter: "C", text: "a", correct: false }] } },
    { question: "Is there any bread left?", answer: "No, there isn’t any bread left.", multipleChoice: { prompt: "No, there isn’t ___ bread left.", options: [{ letter: "A", text: "many", correct: false }, { letter: "B", text: "any", correct: true }, { letter: "C", text: "some", correct: false }] } },
    { question: "Can I get some sugar?", answer: "Sure, here is some sugar.", multipleChoice: { prompt: "Sure, here ___ some sugar.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are there any students in the classroom?", answer: "Yes, there are some students in the classroom.", multipleChoice: { prompt: "Yes, there ___ some students in the classroom.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Do you have any questions?", answer: "Yes, I have some questions.", multipleChoice: { prompt: "Yes, I ___ some questions.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "has", correct: false }] } },
    { question: "Is there any tea in the pot?", answer: "Yes, there is some tea in the pot.", multipleChoice: { prompt: "Yes, there ___ some tea in the pot.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Would you like some salad?", answer: "No, thank you.", openResponse: true },
    { question: "Are there any apples in the bag?", answer: "Yes, there are some apples in the bag.", multipleChoice: { prompt: "Yes, there ___ some apples in the bag.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "Do we have any butter?", answer: "Yes, we have some butter.", multipleChoice: { prompt: "Yes, we ___ some butter.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "had", correct: false }] } },
    { question: "Can I borrow some money?", answer: "Sorry, I don’t have any money.", multipleChoice: { prompt: "Sorry, I don’t ___ any money.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "had", correct: false }] } },
    { question: "Is there any ice cream in the freezer?", answer: "Yes, there is some ice cream in the freezer.", multipleChoice: { prompt: "Yes, there ___ some ice cream in the freezer.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Do you have any homework today?", answer: "No, I don’t have any homework today.", multipleChoice: { prompt: "No, I don’t ___ any homework today.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "had", correct: false }] } },
    { question: "Can I get some paper?", answer: "Yes, I’ll bring you some.", multipleChoice: { prompt: "Yes, I’ll bring ___ some.", options: [{ letter: "A", text: "you", correct: true }, { letter: "B", text: "i", correct: false }, { letter: "C", text: "we", correct: false }] } },
    { question: "Are there any oranges in the kitchen?", answer: "No, there aren’t any oranges.", multipleChoice: { prompt: "No, there aren’t ___ oranges.", options: [{ letter: "A", text: "a", correct: false }, { letter: "B", text: "any", correct: true }, { letter: "C", text: "some", correct: false }] } },
    { question: "Do you want some chocolate?", answer: "Yes, I want some chocolate.", multipleChoice: { prompt: "Yes, ___ want some chocolate.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Is there any salt on the table?", answer: "Yes, there is some salt.", multipleChoice: { prompt: "Yes, there ___ some salt.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are there any pens on the desk?", answer: "Yes, there are some pens on the desk.", multipleChoice: { prompt: "Yes, there ___ some pens on the desk.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Can I have some water?", answer: "Yes, you can have some water.", multipleChoice: { prompt: "Yes, you ___ have some water.", options: [{ letter: "A", text: "should", correct: false }, { letter: "B", text: "could", correct: false }, { letter: "C", text: "can", correct: true }] } },
    { question: "Do you know any good restaurants?", answer: "Yes, I know some good restaurants.", multipleChoice: { prompt: "Yes, ___ know some good restaurants.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Is there any milk in the fridge?", answer: "No, there isn’t any milk.", multipleChoice: { prompt: "No, there isn’t ___ milk.", options: [{ letter: "A", text: "many", correct: false }, { letter: "B", text: "any", correct: true }, { letter: "C", text: "some", correct: false }] } },
    { question: "Would you like some coffee?", answer: "Yes, please.", openResponse: true },
    { question: "Do you need any help with your homework?", answer: "Yes, I need some help.", multipleChoice: { prompt: "Yes, ___ need some help.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Can I offer you some tea?", answer: "Yes, I’d love some tea.", multipleChoice: { prompt: "Yes, I’d love ___ tea.", options: [{ letter: "A", text: "a", correct: false }, { letter: "B", text: "some", correct: true }, { letter: "C", text: "any", correct: false }] } },
    { question: "Are there any tomatoes in the salad?", answer: "Yes, there are some tomatoes.", multipleChoice: { prompt: "Yes, there ___ some tomatoes.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "Do you want some bread?", answer: "Yes, I want some bread.", multipleChoice: { prompt: "Yes, ___ want some bread.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Is there any juice in the glass?", answer: "Yes, there is some juice.", multipleChoice: { prompt: "Yes, there ___ some juice.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are there any cookies in the jar?", answer: "No, there aren’t any cookies.", multipleChoice: { prompt: "No, there aren’t ___ cookies.", options: [{ letter: "A", text: "some", correct: false }, { letter: "B", text: "a", correct: false }, { letter: "C", text: "any", correct: true }] } },
    { question: "Would you like some soup?", answer: "Yes, I’d like some soup.", multipleChoice: { prompt: "Yes, I’d like ___ soup.", options: [{ letter: "A", text: "some", correct: true }, { letter: "B", text: "any", correct: false }, { letter: "C", text: "a", correct: false }] } },
    { question: "Do you need any paper?", answer: "Yes, I need some paper.", multipleChoice: { prompt: "Yes, ___ need some paper.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "Can I bring you some coffee?", answer: "Yes, that would be nice.", multipleChoice: { prompt: "Yes, that ___ be nice.", options: [{ letter: "A", text: "would", correct: true }, { letter: "B", text: "could", correct: false }, { letter: "C", text: "can", correct: false }] } },
    { question: "Is there any oil in the pan?", answer: "Yes, there is some oil in the pan.", multipleChoice: { prompt: "Yes, there ___ some oil in the pan.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are there any questions?", answer: "No, there aren’t any questions.", multipleChoice: { prompt: "No, there aren’t ___ questions.", options: [{ letter: "A", text: "much", correct: false }, { letter: "B", text: "any", correct: true }, { letter: "C", text: "some", correct: false }] } },
    { question: "Can I take some photos here?", answer: "Yes, you can take some photos.", multipleChoice: { prompt: "Yes, you can take ___ photos.", options: [{ letter: "A", text: "any", correct: false }, { letter: "B", text: "a", correct: false }, { letter: "C", text: "some", correct: true }] } },
    { question: "Do you want some orange juice?", answer: "Yes, I want some.", multipleChoice: { prompt: "Yes, ___ want some.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do you have any free time tomorrow?", answer: "Yes, I have some free time.", multipleChoice: { prompt: "Yes, I ___ some free time.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "had", correct: false }] } },
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
  
  table: {
    title: "📋 Can / Can't for Permission (İzin için Can / Can't)",
    data: [
      { category: "What is Permission?", explanation: "Asking if something is ALLOWED or giving/refusing permission", turkish: "İzin istemek/vermek", function: "To ask 'Is it okay?' or say 'It's okay/not okay'", examples: "Can I sit here? / You can't park here.", difference_from_ability: "Ability = what you're able to do | Permission = what you're allowed to do" },

      { category: "Asking for Permission", form: "Can I/we + verb?", examples: "Can I sit here? / Can I use your phone? / Can we go now?", turkish: "... yapabilir miyim? (izin istemek)", usage: "Use when you want to do something and need approval", polite: "Add 'please' to be more polite: Can I please use the bathroom?" },
      { category: "Asking for Permission", common_questions: "Can I come in? / Can I ask a question? / Can I leave early? / Can we eat here?", pattern: "Can + I/we + base verb?", note: "Usually use 'I' or 'we' when asking for permission for yourself", examples_context: "Can I open the window? (asking teacher) / Can we park here? (asking permission)" },

      { category: "Giving Permission - Positive", form: "Yes, you/he/she/they + can.", examples: "Can I sit here? → Yes, you can. / Can he come? → Yes, he can.", meaning: "It's allowed, it's okay, you have permission", turkish: "İzin vermek (evet, yapabilirsin)", alternative: "Sure. / Of course. / Go ahead. / No problem.", note: "These alternatives are very common in conversation" },
      { category: "Giving Permission - Positive", real_examples: "Can I borrow your pen? → Yes, you can. / Can we leave now? → Yes, you can go.", statements: "You can use my computer. / He can stay here. / They can enter now.", pattern: "Subject + can + verb", meaning_statement: "Stating that something is allowed" },

      { category: "Refusing Permission - Negative", form: "No, you/he/she/they + can't.", examples: "Can I go out? → No, you can't. / Can they park here? → No, they can't.", meaning: "It's NOT allowed, it's not okay, no permission", turkish: "İzin vermemek (hayır, yapamazsın)", alternative: "Sorry, you can't. / I'm afraid not. / Not now.", note: "Usually add 'sorry' to be polite when refusing" },
      { category: "Refusing Permission - Negative", real_examples: "Can I use your phone? → Sorry, you can't. / Can we smoke here? → No, you can't smoke here.", statements: "You can't park here. / He can't enter. / They can't use this room.", pattern: "Subject + can't + verb", meaning_statement: "Stating that something is forbidden or not allowed", common: "You can't... = It's not allowed to..." },

      { category: "Common Permission Questions", general: "Can I...? (asking for myself)", examples_i: "Can I sit here? / Can I open the window? / Can I borrow this? / Can I use the bathroom?", examples_we: "Can we eat here? / Can we leave early? / Can we take photos? / Can we bring food?", in_class: "Can I ask a question? / Can I go to the toilet? / Can I close the door?", in_public: "Can I park here? / Can we smoke here? / Can I take a photo?" },

      { category: "Giving Instructions/Rules", you_can: "You can enter. / You can sit anywhere. / You can ask questions.", you_cant: "You can't smoke here. / You can't use phones. / You can't park here.", signs: "You can't eat or drink. / You can't take photos. / You can't run.", turkish: "Kurallar ve talimatlar", usage: "Used for rules, signs, instructions" },

      { category: "Politeness Levels", informal: "Can I borrow your pen? (casual, everyday)", more_polite: "Can I please use your phone? (adding please)", formal_alternative: "Could I...? / May I...? (more formal than 'can')", note: "'Can' is perfectly acceptable in most situations!", tip: "Add 'please' or 'excuse me' to be more polite" },

      { category: "Permission vs Ability", ability: "Can you swim? (Are you able to?)", permission: "Can I swim here? (Am I allowed to?)", ability_he: "He can drive. (He has the skill)", permission_he: "He can drive my car. (He has permission)", key_difference: "Context tells you which meaning!", both: "Sometimes both meanings possible: Can I open the window? (Am I strong enough? OR Is it okay?)" },

      { category: "Responding to Permission Requests", giving_permission: "Yes, you can. / Sure! / Of course! / Go ahead! / No problem!", refusing: "No, you can't. / Sorry, you can't. / I'm afraid not. / Not right now.", explaining: "You can use it, but be careful. / You can go, but come back soon.", partial: "You can sit there, but not here.", note: "Often give a reason when refusing: Sorry, you can't. It's broken." },

      { category: "Common Mistakes", mistake: "Using 'do/does' with can", wrong: "Do I can sit here? ✗", correct: "Can I sit here? ✓", rule: "Can forms its own questions!", remember: "Just put 'Can' at the beginning" },
      { category: "Common Mistakes", mistake: "Confusing pronouns in answers", wrong: "Can I go? → Yes, I can. ✗", correct: "Can I go? → Yes, you can. ✓", rule: "When someone asks 'Can I...?', answer 'Yes, you can' (not 'Yes, I can')", explanation: "Switch the perspective: I (asker) becomes you (answerer)" },
      { category: "Common Mistakes", mistake: "Using 'to' after can", wrong: "Can I to go? ✗", correct: "Can I go? ✓", rule: "No 'to' after can!", remember: "Can + base verb (no 'to')" },

      { category: "In Different Settings", at_school: "Can I go to the bathroom? / Can I ask a question? / Can I use a dictionary?", at_work: "Can I leave early? / Can I take a break? / Can I use this computer?", at_home: "Can I watch TV? / Can I go out? / Can I use your car?", in_public: "Can I sit here? / Can we take photos? / Can I try this on?", visiting: "Can I use your bathroom? / Can I get some water? / Can we stay longer?" },

      { category: "Signs and Rules", you_can: "You can park here. / You can swim here. / You can bring dogs.", you_cant: "You can't smoke. / You can't take photos. / You can't eat or drink. / You can't enter.", alternative: "No smoking. = You can't smoke. / No parking. = You can't park.", pattern: "Can't = prohibition/forbidden", turkish: "Yasak/izin verilmiyor" },

      { category: "Real-World Examples", asking_politely: "Excuse me, can I sit here? / Can I please borrow your pen? / Can we please leave early?", granting: "Yes, you can use my phone. / Sure, you can come with us. / Of course, you can ask questions.", refusing: "Sorry, you can't park there. / No, you can't use this room. / I'm afraid you can't smoke here.", rules: "You can't run in the halls. / Students can't eat in class. / You can't wear shoes inside." },

      { category: "Key Takeaway", summary: "CAN/CAN'T for permission (asking if something is ALLOWED)", asking: "Can I/we + verb? (asking for permission for yourself)", giving: "Yes, you/he/she can. (granting permission)", refusing: "No, you/he/she can't. (refusing permission)", statements: "You can... (allowed) / You can't... (not allowed/forbidden)", remember: "Same structure as ability, but different meaning based on context!", difference: "Ability = capable of doing | Permission = allowed to do", next: "Context helps you know which meaning!" }
    ]
  },
  
  speakingPractice: [
    { question: "How many books do you have?", answer: "I have many books.", multipleChoice: { prompt: "I ___ many books.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "How much water do you drink every day?", answer: "I drink a lot of water every day.", multipleChoice: { prompt: "I drink ___ water every day.", options: [{ letter: "A", text: "many", correct: false }, { letter: "B", text: "a lot of", correct: true }, { letter: "C", text: "much", correct: false }] } },
    { question: "Do you have many friends?", answer: "Yes, I have many friends.", multipleChoice: { prompt: "Yes, I ___ many friends.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "Do you eat much sugar?", answer: "No, I don’t eat much sugar.", multipleChoice: { prompt: "No, ___ don’t eat much sugar.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "How many pens are in your bag?", answer: "There are many pens in my bag.", multipleChoice: { prompt: "There ___ many pens in my bag.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "How much milk is in the bottle?", answer: "There isn’t much milk in the bottle.", multipleChoice: { prompt: "There isn’t ___ milk in the bottle.", options: [{ letter: "A", text: "many", correct: false }, { letter: "B", text: "a lot of", correct: false }, { letter: "C", text: "much", correct: true }] } },
    { question: "Do you watch many movies?", answer: "Yes, I watch many movies.", multipleChoice: { prompt: "Yes, I ___ many movies.", options: [{ letter: "A", text: "watch", correct: true }, { letter: "B", text: "watched", correct: false }, { letter: "C", text: "watches", correct: false }] } },
    { question: "Do you have much homework today?", answer: "Yes, I have a lot of homework today.", multipleChoice: { prompt: "Yes, I ___ a lot of homework today.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "has", correct: false }] } },
    { question: "How many shirts do you have?", answer: "I have many shirts.", multipleChoice: { prompt: "I ___ many shirts.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "has", correct: false }] } },
    { question: "How much tea do you drink?", answer: "I drink a lot of tea.", multipleChoice: { prompt: "I drink ___ tea.", options: [{ letter: "A", text: "a lot of", correct: true }, { letter: "B", text: "many", correct: false }, { letter: "C", text: "much", correct: false }] } },
    { question: "Are there many students in your class?", answer: "Yes, there are many students in my class.", multipleChoice: { prompt: "Yes, there ___ many students in my class.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is there much rice on your plate?", answer: "No, there isn’t much rice on my plate.", multipleChoice: { prompt: "No, there isn’t ___ rice on my plate.", options: [{ letter: "A", text: "many", correct: false }, { letter: "B", text: "a lot of", correct: false }, { letter: "C", text: "much", correct: true }] } },
    { question: "How many emails do you send every day?", answer: "I send many emails every day.", multipleChoice: { prompt: "___ send many emails every day.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "How much coffee do you drink?", answer: "I don’t drink much coffee.", multipleChoice: { prompt: "___ don’t drink much coffee.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do you have many cousins?", answer: "Yes, I have many cousins.", multipleChoice: { prompt: "Yes, I ___ many cousins.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "had", correct: false }] } },
    { question: "Do you eat much bread?", answer: "No, I don’t eat much bread.", multipleChoice: { prompt: "No, ___ don’t eat much bread.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "he", correct: false }] } },
    { question: "How many toys does your brother have?", answer: "He has many toys.", multipleChoice: { prompt: "He ___ many toys.", options: [{ letter: "A", text: "have", correct: false }, { letter: "B", text: "has", correct: true }, { letter: "C", text: "had", correct: false }] } },
    { question: "How much salt do you use when you cook?", answer: "I use a little salt.", multipleChoice: { prompt: "___ use a little salt.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Are there many chairs in the room?", answer: "Yes, there are many chairs.", multipleChoice: { prompt: "Yes, there ___ many chairs.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "Do you spend much time on your phone?", answer: "Yes, I spend a lot of time on my phone.", multipleChoice: { prompt: "Yes, I spend ___ time on my phone.", options: [{ letter: "A", text: "many", correct: false }, { letter: "B", text: "a lot of", correct: true }, { letter: "C", text: "much", correct: false }] } },
    { question: "How many photos do you take when you travel?", answer: "I take many photos.", multipleChoice: { prompt: "I ___ many photos.", options: [{ letter: "A", text: "takes", correct: false }, { letter: "B", text: "get", correct: false }, { letter: "C", text: "take", correct: true }] } },
    { question: "Is there much juice in the fridge?", answer: "Yes, there is a lot of juice.", multipleChoice: { prompt: "Yes, there ___ a lot of juice.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Do you read many books every year?", answer: "No, I don’t read many books every day.", multipleChoice: { prompt: "No, ___ don’t read many books every day.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Do you have much free time?", answer: "No, I don’t have much free time.", multipleChoice: { prompt: "No, I don’t ___ much free time.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "How many sandwiches do you want?", answer: "I want many sandwiches.", multipleChoice: { prompt: "___ want many sandwiches.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "How much cheese do you need?", answer: "I need a lot of cheese.", multipleChoice: { prompt: "I need ___ cheese.", options: [{ letter: "A", text: "much", correct: false }, { letter: "B", text: "a lot of", correct: true }, { letter: "C", text: "many", correct: false }] } },
    { question: "Do you go to many concerts?", answer: "No, I don’t go to many concerts.", multipleChoice: { prompt: "No, I don’t go to ___ concerts.", options: [{ letter: "A", text: "much", correct: false }, { letter: "B", text: "a lot of", correct: false }, { letter: "C", text: "many", correct: true }] } },
    { question: "Do you use much oil when cooking?", answer: "No, I don’t use much oil.", multipleChoice: { prompt: "No, ___ don’t use much oil.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "How many languages do you speak?", answer: "I don’t speak many languages.", multipleChoice: { prompt: "___ don’t speak many languages.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Is there much flour in the bag?", answer: "Yes, there is a lot of flour.", multipleChoice: { prompt: "Yes, there ___ a lot of flour.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Do you eat many vegetables?", answer: "Yes, I eat many vegetables.", multipleChoice: { prompt: "Yes, ___ eat many vegetables.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Do you drink much soda?", answer: "No, I don’t drink much soda.", multipleChoice: { prompt: "No, ___ don’t drink much soda.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Are there many cars in the parking lot?", answer: "Yes, there are many cars.", multipleChoice: { prompt: "Yes, there ___ many cars.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "How much ketchup do you want?", answer: "I want just a little, please.", multipleChoice: { prompt: "___ want just a little, please.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "How many brothers and sisters do you have?", answer: "I have many siblings.", multipleChoice: { prompt: "I ___ many siblings.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "has", correct: false }] } },
    { question: "Is there much soup in the bowl?", answer: "No, there isn’t much soup.", multipleChoice: { prompt: "No, there isn’t ___ soup.", options: [{ letter: "A", text: "many", correct: false }, { letter: "B", text: "a lot of", correct: false }, { letter: "C", text: "much", correct: true }] } },
    { question: "Do you buy many clothes online?", answer: "Yes, I buy many clothes online.", multipleChoice: { prompt: "Yes, ___ buy many clothes online.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Do you use much butter in your food?", answer: "No, I don’t use much butter.", multipleChoice: { prompt: "No, ___ don’t use much butter.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "How many apples are in the basket?", answer: "There are many apples.", multipleChoice: { prompt: "There ___ many apples.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "How much money do you need?", answer: "I need a lot of money.", multipleChoice: { prompt: "I need ___ money.", options: [{ letter: "A", text: "a lot of", correct: true }, { letter: "B", text: "many", correct: false }, { letter: "C", text: "much", correct: false }] } },
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
  
  table: {
    title: "📋 Like / Love / Hate + Verb-ing (Preferences with -ing)",
    data: [
      { category: "What are these verbs?", explanation: "Verbs that express your FEELINGS about activities", turkish: "Sevmek, çok sevmek, nefret etmek", function: "Talk about things you enjoy or don't enjoy doing", pattern: "Like/Love/Hate + verb-ing", examples: "I like reading / She loves cooking / He hates running" },

      { category: "The Three Main Verbs", like: "Like = enjoy something", love: "Love = enjoy something VERY MUCH (stronger than like)", hate: "Hate = strongly dislike, can't stand", scale: "Love (strongest positive) → Like (positive) → Don't like (negative) → Hate (strongest negative)", turkish: "Sevmek → Çok sevmek → Sevmemek → Nefret etmek", note: "Choose based on how strong your feeling is!" },

      { category: "Structure with LIKE", form: "Subject + like/likes + verb-ing", examples: "I like swimming / He likes reading / They like dancing", rule: "Add -ING to the verb that follows 'like'", turkish: "Özne + like/likes + fiil-ing", pattern: "like + activity (verb-ing)", wrong: "I like swim ✗ / I like to swim ✗ (A1 level)" },
      { category: "Structure with LIKE", i_you_we_they: "I/You/We/They LIKE + verb-ing", he_she_it: "He/She/It LIKES + verb-ing", remember: "Like/Likes follows Simple Present rules!", examples: "I like playing / She likes playing", note: "Don't forget -s for he/she/it!" },

      { category: "Structure with LOVE", form: "Subject + love/loves + verb-ing", examples: "I love cooking / She loves singing / They love traveling", rule: "Add -ING to the verb that follows 'love'", turkish: "Özne + love/loves + fiil-ing", meaning: "VERY STRONG like (adore, really enjoy)", stronger: "Love is stronger than 'like'!" },
      { category: "Structure with LOVE", i_you_we_they: "I/You/We/They LOVE + verb-ing", he_she_it: "He/She/It LOVES + verb-ing", remember: "Love/Loves follows Simple Present rules!", examples: "I love dancing / He loves dancing", note: "Don't forget -s for he/she/it!" },

      { category: "Structure with HATE", form: "Subject + hate/hates + verb-ing", examples: "I hate waiting / He hates studying / They hate waking up early", rule: "Add -ING to the verb that follows 'hate'", turkish: "Özne + hate/hates + fiil-ing", meaning: "STRONGLY dislike (can't stand)", opposite: "Love is the opposite of hate" },
      { category: "Structure with HATE", i_you_we_they: "I/You/We/They HATE + verb-ing", he_she_it: "He/She/It HATES + verb-ing", remember: "Hate/Hates follows Simple Present rules!", examples: "I hate running / She hates running", note: "Don't forget -s for he/she/it!" },

      { category: "Negative Forms", dont_like: "don't/doesn't like + verb-ing", examples: "I don't like swimming. / He doesn't like reading.", meaning: "Mild negative (not as strong as 'hate')", turkish: "Sevmemek", usage: "More polite than 'hate'", comparison: "Don't like < Hate" },
      { category: "Negative Forms", with_love_hate: "Don't/doesn't love or Don't/doesn't hate (less common)", examples: "I don't love running. (= I like it, but not a lot) / I don't hate it. (= it's okay)", note: "Usually just say 'don't like' instead of 'don't love'", common: "'Don't like' is most common negative form" },

      { category: "How to Add -ING", rule_1: "Most verbs: just add -ing", examples_1: "play → playing, read → reading, watch → watching, cook → cooking", rule_2: "Verbs ending in -e: remove e, add -ing", examples_2: "dance → dancing, write → writing, make → making, come → coming", rule_3: "Short verbs (CVC pattern): double last letter + -ing", examples_3: "swim → swimming, run → running, sit → sitting, shop → shopping" },

      { category: "Common Activities with -ING", sports: "playing football/tennis, swimming, running, cycling, skiing", hobbies: "reading, drawing, painting, singing, dancing, cooking", daily: "watching TV, listening to music, eating, drinking, sleeping", work_study: "working, studying, writing, doing homework", social: "talking, meeting friends, going out, traveling" },

      { category: "Questions", form: "Do/Does + subject + like/love/hate + verb-ing?", examples: "Do you like swimming? / Does she love cooking? / Do they hate running?", pattern: "Do/Does + subject + like/love/hate + verb-ing?", answers: "Yes, I do. / No, I don't. / Yes, she does. / No, she doesn't.", note: "Follow Simple Present question rules!" },

      { category: "Common Mistakes", mistake: "Forgetting -ing", wrong: "I like swim. ✗ / She loves cook. ✗", correct: "I like swimming. ✓ / She loves cooking. ✓", rule: "Must add -ING to the verb after like/love/hate!", remember: "like/love/hate + VERB-ING" },
      { category: "Common Mistakes", mistake: "Forgetting -s with he/she/it", wrong: "He like swimming. ✗ / She love cooking. ✗", correct: "He likes swimming. ✓ / She loves cooking. ✓", rule: "Add -s to like/love/hate with he/she/it!", remember: "Simple Present rules apply!" },
      { category: "Common Mistakes", mistake: "Using 'to' instead of -ing (A1 level)", a1_level: "I like swimming ✓ (A1)", a2_level: "I like to swim ✓ (A2 - both correct)", note: "At A1 level, use -ING form", later: "Later you'll learn 'like to + verb' is also correct!", for_now: "Stick with -ING form!" },

      { category: "The Preference Scale", love_it: "I LOVE running! (strongest positive - 100%)", like_it: "I like running. (positive - 70%)", ok: "It's OK. / I don't mind. (neutral - 50%)", dont_like: "I don't like running. (negative - 30%)", hate_it: "I HATE running! (strongest negative - 0%)", use: "Choose the verb that matches your feeling!" },

      { category: "Real-World Examples", preferences: "I like reading books. / She loves watching movies. / He hates doing homework.", strong_feelings: "I love traveling! / They hate waiting in line. / We love eating ice cream.", mild_feelings: "I like swimming. / She likes cooking. / They don't like studying.", talking_about_others: "My brother loves playing video games. / My mom hates driving in traffic. / My dad likes fishing." },

      { category: "Asking About Preferences", what_questions: "What do you like doing? / What does she love doing? / What do they hate doing?", yes_no: "Do you like swimming? / Does he love cooking? / Do they hate running?", follow_up: "Why do you like it? / Why do you hate it?", conversation: "I like reading. What about you? / She loves swimming. Do you?", answering: "I like playing football. / I don't like watching TV. / I hate waking up early." },

      { category: "Key Takeaway", summary: "Like/Love/Hate + VERB-ING (to talk about preferences)", forms: "Subject + like/love/hate + verb-ing", examples: "I like reading / She loves cooking / He hates running", remember_ing: "MUST add -ING to the verb!", remember_s: "Add -s to like/love/hate with he/she/it (likes/loves/hates)", scale: "Love (strongest) → Like → Don't like → Hate (strongest negative)", next: "Use these to talk about your hobbies and preferences!" }
    ]
  },
  
  speakingPractice: [
    { question: "Do you have a lot of friends?", answer: "Yes, I have a lot of friends.", multipleChoice: { prompt: "Yes, I ___ a lot of friends.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "Do you read lots of books?", answer: "Yes, I read lots of books.", multipleChoice: { prompt: "Yes, I read ___ books.", options: [{ letter: "A", text: "a single", correct: false }, { letter: "B", text: "lots of", correct: true }, { letter: "C", text: "much", correct: false }] } },
    { question: "Do you drink a lot of water?", answer: "Yes, I drink a lot of water.", multipleChoice: { prompt: "Yes, I drink ___ water.", options: [{ letter: "A", text: "many", correct: false }, { letter: "B", text: "a few", correct: false }, { letter: "C", text: "a lot of", correct: true }] } },
    { question: "Do you spend lots of time on your phone?", answer: "Yes, I spend lots of time on my phone.", multipleChoice: { prompt: "Yes, I spend ___ time on my phone.", options: [{ letter: "A", text: "lots of", correct: true }, { letter: "B", text: "many", correct: false }, { letter: "C", text: "few", correct: false }] } },
    { question: "Do you have a lot of homework?", answer: "Yes, I have a lot of homework.", multipleChoice: { prompt: "Yes, I ___ a lot of homework.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "has", correct: false }] } },
    { question: "Do you watch a lot of movies?", answer: "Yes, I watch a lot of movies.", multipleChoice: { prompt: "Yes, I ___ a lot of movies.", options: [{ letter: "A", text: "watch", correct: true }, { letter: "B", text: "watched", correct: false }, { letter: "C", text: "watches", correct: false }] } },
    { question: "Do you eat lots of fruit?", answer: "Yes, I eat lots of fruit.", multipleChoice: { prompt: "Yes, I eat ___ fruit.", options: [{ letter: "A", text: "lots of", correct: true }, { letter: "B", text: "many", correct: false }, { letter: "C", text: "a few", correct: false }] } },
    { question: "Do you get a lot of messages every day?", answer: "Yes, I get a lot of messages every day.", multipleChoice: { prompt: "Yes, I ___ a lot of messages every day.", options: [{ letter: "A", text: "get", correct: true }, { letter: "B", text: "getting", correct: false }, { letter: "C", text: "got", correct: false }] } },
    { question: "Do you take a lot of photos when you travel?", answer: "Yes, I take a lot of photos.", multipleChoice: { prompt: "Yes, I ___ a lot of photos.", options: [{ letter: "A", text: "get", correct: false }, { letter: "B", text: "take", correct: true }, { letter: "C", text: "takes", correct: false }] } },
    { question: "Do you drink lots of tea?", answer: "Yes, I drink lots of tea.", multipleChoice: { prompt: "Yes, I drink ___ tea.", options: [{ letter: "A", text: "lots of", correct: true }, { letter: "B", text: "many", correct: false }, { letter: "C", text: "few", correct: false }] } },
    { question: "Do you buy a lot of clothes online?", answer: "Yes, I buy a lot of clothes online.", multipleChoice: { prompt: "Yes, I buy ___ clothes online.", options: [{ letter: "A", text: "a little", correct: false }, { letter: "B", text: "a lot of", correct: true }, { letter: "C", text: "much", correct: false }] } },
    { question: "Do you eat lots of vegetables?", answer: "Yes, I eat lots of vegetables.", multipleChoice: { prompt: "Yes, I eat ___ vegetables.", options: [{ letter: "A", text: "much", correct: false }, { letter: "B", text: "a little", correct: false }, { letter: "C", text: "lots of", correct: true }] } },
    { question: "Do you listen to a lot of singers?", answer: "Yes, I listen to a lot of singers.", multipleChoice: { prompt: "Yes, I listen to ___ singers.", options: [{ letter: "A", text: "a lot of", correct: true }, { letter: "B", text: "much", correct: false }, { letter: "C", text: "a little", correct: false }] } },
    { question: "Do you have a lot of free time?", answer: "No, I don’t have a lot of free time.", multipleChoice: { prompt: "No, I don’t ___ a lot of free time.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "had", correct: false }] } },
    { question: "Do you get lots of emails?", answer: "Yes, I get lots of emails.", multipleChoice: { prompt: "Yes, I ___ lots of emails.", options: [{ letter: "A", text: "got", correct: false }, { letter: "B", text: "get", correct: true }, { letter: "C", text: "getting", correct: false }] } },
    { question: "Do you see a lot of people at work?", answer: "Yes, I see a lot of people at work.", multipleChoice: { prompt: "Yes, I see ___ people at work.", options: [{ letter: "A", text: "a lot of", correct: true }, { letter: "B", text: "much", correct: false }, { letter: "C", text: "a little", correct: false }] } },
    { question: "Do you drink a lot of coffee?", answer: "Yes, I drink a lot of coffee.", multipleChoice: { prompt: "Yes, I drink ___ coffee.", options: [{ letter: "A", text: "a few", correct: false }, { letter: "B", text: "a lot of", correct: true }, { letter: "C", text: "many", correct: false }] } },
    { question: "Do you use a lot of salt when cooking?", answer: "No, I don’t use a lot of salt.", multipleChoice: { prompt: "No, I don’t use ___ salt.", options: [{ letter: "A", text: "many", correct: false }, { letter: "B", text: "a few", correct: false }, { letter: "C", text: "a lot of", correct: true }] } },
    { question: "Do you eat lots of snacks?", answer: "Yes, I eat lots of snacks.", multipleChoice: { prompt: "Yes, I eat ___ snacks.", options: [{ letter: "A", text: "lots of", correct: true }, { letter: "B", text: "much", correct: false }, { letter: "C", text: "a little", correct: false }] } },
    { question: "Do you see lots of birds in the park?", answer: "Yes, I see lots of birds in the park.", multipleChoice: { prompt: "Yes, I see ___ birds in the park.", options: [{ letter: "A", text: "a little", correct: false }, { letter: "B", text: "lots of", correct: true }, { letter: "C", text: "much", correct: false }] } },
    { question: "Do you make a lot of phone calls?", answer: "Yes, I make a lot of phone calls.", multipleChoice: { prompt: "Yes, I ___ a lot of phone calls.", options: [{ letter: "A", text: "makes", correct: false }, { letter: "B", text: "do", correct: false }, { letter: "C", text: "make", correct: true }] } },
    { question: "Do you do lots of exercises?", answer: "Yes, I do lots of exercises.", multipleChoice: { prompt: "Yes, I ___ lots of exercises.", options: [{ letter: "A", text: "does", correct: false }, { letter: "B", text: "doed", correct: false }, { letter: "C", text: "do", correct: true }] } },
    { question: "Do you spend a lot of time on homework?", answer: "Yes, I spend a lot of time on homework.", multipleChoice: { prompt: "Yes, I spend ___ time on homework.", options: [{ letter: "A", text: "a few", correct: false }, { letter: "B", text: "a lot of", correct: true }, { letter: "C", text: "many", correct: false }] } },
    { question: "Do you have lots of cousins?", answer: "Yes, I have lots of cousins.", multipleChoice: { prompt: "Yes, I ___ lots of cousins.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "Do you hear a lot of noise in the city?", answer: "Yes, I hear a lot of noise.", multipleChoice: { prompt: "Yes, I hear ___ noise.", options: [{ letter: "A", text: "a lot of", correct: true }, { letter: "B", text: "many", correct: false }, { letter: "C", text: "a few", correct: false }] } },
    { question: "Do you see a lot of stars at night?", answer: "Yes, I see a lot of stars at night.", multipleChoice: { prompt: "Yes, I see ___ stars at night.", options: [{ letter: "A", text: "a little", correct: false }, { letter: "B", text: "a lot of", correct: true }, { letter: "C", text: "much", correct: false }] } },
    { question: "Do you eat a lot of chocolate?", answer: "Yes, I eat a lot of chocolate.", multipleChoice: { prompt: "Yes, I eat ___ chocolate.", options: [{ letter: "A", text: "many", correct: false }, { letter: "B", text: "a few", correct: false }, { letter: "C", text: "a lot of", correct: true }] } },
    { question: "Do you read lots of magazines?", answer: "Yes, I read lots of magazines.", multipleChoice: { prompt: "Yes, I read ___ magazines.", options: [{ letter: "A", text: "lots of", correct: true }, { letter: "B", text: "much", correct: false }, { letter: "C", text: "a little", correct: false }] } },
    { question: "Do you know a lot of people in your neighborhood?", answer: "Yes, I know a lot of people.", multipleChoice: { prompt: "Yes, I know ___ people.", options: [{ letter: "A", text: "a little", correct: false }, { letter: "B", text: "a lot of", correct: true }, { letter: "C", text: "much", correct: false }] } },
    { question: "Do you carry a lot of things in your bag?", answer: "Yes, I carry a lot of things.", multipleChoice: { prompt: "Yes, I carry ___ things.", options: [{ letter: "A", text: "much", correct: false }, { letter: "B", text: "a little", correct: false }, { letter: "C", text: "a lot of", correct: true }] } },
    { question: "Do you use lots of paper at school?", answer: "Yes, I use lots of paper.", multipleChoice: { prompt: "Yes, I use ___ paper.", options: [{ letter: "A", text: "lots of", correct: true }, { letter: "B", text: "many", correct: false }, { letter: "C", text: "a few", correct: false }] } },
    { question: "Do you drink a lot of juice?", answer: "Yes, I drink a lot of juice.", multipleChoice: { prompt: "Yes, I drink ___ juice.", options: [{ letter: "A", text: "a few", correct: false }, { letter: "B", text: "a lot of", correct: true }, { letter: "C", text: "many", correct: false }] } },
    { question: "Do you eat lots of bread?", answer: "Yes, I eat lots of bread.", multipleChoice: { prompt: "Yes, I eat ___ bread.", options: [{ letter: "A", text: "many", correct: false }, { letter: "B", text: "a few", correct: false }, { letter: "C", text: "lots of", correct: true }] } },
    { question: "Do you have a lot of toys at home?", answer: "Yes, I have a lot of toys.", multipleChoice: { prompt: "Yes, I ___ a lot of toys.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "has", correct: false }] } },
    { question: "Do you do lots of homework on the weekend?", answer: "Yes, I do lots of homework.", multipleChoice: { prompt: "Yes, I ___ lots of homework.", options: [{ letter: "A", text: "doed", correct: false }, { letter: "B", text: "do", correct: true }, { letter: "C", text: "does", correct: false }] } },
    { question: "Do you meet a lot of people at the gym?", answer: "Yes, I meet a lot of people at the gym.", multipleChoice: { prompt: "Yes, I meet ___ people at the gym.", options: [{ letter: "A", text: "much", correct: false }, { letter: "B", text: "a little", correct: false }, { letter: "C", text: "a lot of", correct: true }] } },
    { question: "Do you get lots of gifts on your birthday?", answer: "Yes, I get lots of gifts.", multipleChoice: { prompt: "Yes, I ___ lots of gifts.", options: [{ letter: "A", text: "get", correct: true }, { letter: "B", text: "getting", correct: false }, { letter: "C", text: "got", correct: false }] } },
    { question: "Do you see a lot of animals at the zoo?", answer: "Yes, I see a lot of animals.", multipleChoice: { prompt: "Yes, I see ___ animals.", options: [{ letter: "A", text: "a little", correct: false }, { letter: "B", text: "a lot of", correct: true }, { letter: "C", text: "much", correct: false }] } },
    { question: "Do you eat lots of rice?", answer: "Yes, I eat lots of rice.", multipleChoice: { prompt: "Yes, I eat ___ rice.", options: [{ letter: "A", text: "many", correct: false }, { letter: "B", text: "a few", correct: false }, { letter: "C", text: "lots of", correct: true }] } },
    { question: "Do you use a lot of shampoo?", answer: "No, I don’t use a lot of shampoo.", multipleChoice: { prompt: "No, I don’t use ___ shampoo.", options: [{ letter: "A", text: "a lot of", correct: true }, { letter: "B", text: "many", correct: false }, { letter: "C", text: "a few", correct: false }] } },
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
  
  table: {
    title: "📋 How much / How many (Quantity Questions)",
    data: [
      { category: "What are these questions?", explanation: "Questions that ask about QUANTITY (how many or how much of something)", turkish: "Ne kadar? / Kaç tane?", function: "Ask about amounts and numbers", examples: "How much water? / How many apples?", key: "Depends on if the noun is countable or uncountable" },

      { category: "How MUCH vs How MANY", how_much: "HOW MUCH = for UNCOUNTABLE nouns", how_many: "HOW MANY = for COUNTABLE nouns", key_difference: "Can you count it? → Use 'How many' | Can't count it? → Use 'How much'", turkish: "How much = sayılamayan / How many = sayılabilen", remember: "Count it or not? That's the key!" },

      { category: "How MUCH - Uncountable", use: "Uncountable nouns (things you can't count individually)", pattern: "How much + uncountable noun?", examples: "How much water? / How much milk? / How much sugar? / How much money?", turkish: "Ne kadar (sayılamayan şeyler)", note: "Uncountable nouns have NO plural form", list: "water, milk, coffee, tea, rice, bread, sugar, salt, butter, cheese, flour" },
      { category: "How MUCH - Uncountable", more_examples: "How much time? / How much information? / How much work? / How much homework?", abstract: "time, information, work, homework, advice, news, music", liquids: "water, milk, juice, oil, soup, tea, coffee", foods: "rice, bread, cheese, butter, meat, flour, sugar", remember: "If you can't say 'one, two, three...', use HOW MUCH!" },

      { category: "How MANY - Countable", use: "Countable nouns (things you CAN count)", pattern: "How many + countable noun (plural)?", examples: "How many apples? / How many books? / How many students? / How many cars?", turkish: "Kaç tane (sayılabilen şeyler)", note: "Countable nouns can be singular or plural", list: "apples, books, students, cars, chairs, pens, cups, bottles" },
      { category: "How MANY - Countable", more_examples: "How many people? / How many countries? / How many languages? / How many hours?", things: "books, pens, chairs, tables, phones, computers, eggs, apples", people: "people, students, teachers, friends, children, men, women", places: "countries, cities, rooms, schools, restaurants", remember: "If you can count 'one, two, three...', use HOW MANY!" },

      { category: "Structure - How MUCH", question_form: "How much + uncountable noun + do/does + subject + verb?", examples: "How much water do you drink? / How much money does he have?", with_there: "How much + uncountable noun + is there?", example_there: "How much milk is there in the fridge?", pattern: "How much + noun + question form", note: "Noun stays singular (no -s)" },

      { category: "Structure - How MANY", question_form: "How many + countable noun (plural) + do/does + subject + verb?", examples: "How many books do you have? / How many students does she teach?", with_there: "How many + countable noun (plural) + are there?", example_there: "How many apples are there in the basket?", pattern: "How many + plural noun + question form", note: "Noun must be PLURAL (-s)" },

      { category: "Answering How MUCH", with_quantity: "Specific amount with unit", examples: "How much water? → 2 liters / 3 glasses / 500ml", with_general: "General amount: a lot, a little, not much, some, none", examples_general: "How much money? → A lot / A little / Not much", turkish_answers: "çok / az / hiç / biraz", pattern: "Quantity + of + noun OR just quantity word" },
      { category: "Answering How MUCH", specific: "I drink 2 liters of water. / I have $50. / I need 100 grams of sugar.", general: "I drink a lot of water. / I have a little money. / I don't have much time.", note: "Can answer with specific number + unit OR with general words", remember: "Both specific and general answers are correct!" },

      { category: "Answering How MANY", with_number: "Specific number", examples: "How many books? → 5 books / 10 books / 20 books", with_general: "General amount: many, a few, not many, some, none", examples_general: "How many friends? → Many / A few / Not many", turkish_answers: "çok / birkaç / hiç", pattern: "Number + noun OR quantity word + noun" },
      { category: "Answering How MANY", specific: "I have 5 brothers. / There are 20 students. / I speak 3 languages.", general: "I have many friends. / There are a few apples. / I don't have many books.", note: "Can answer with specific number OR with general words", remember: "Usually we use numbers with countable nouns!" },

      { category: "Common Uncountable Nouns", liquids: "water, milk, coffee, tea, juice, oil, soup, wine, beer", food: "rice, bread, meat, cheese, butter, sugar, salt, flour, pasta", abstract: "time, money, information, advice, work, homework, music, news", materials: "wood, paper, glass, plastic, metal, gold, silver", weather: "rain, snow, wind, sunshine", remember: "These NEVER have plural form (no -s)!" },

      { category: "Common Countable Nouns", people: "people, students, teachers, friends, children, men, women, babies", things: "books, pens, chairs, tables, phones, computers, cars, houses", food_items: "apples, oranges, eggs, bananas, tomatoes, potatoes, biscuits", time_units: "hours, days, weeks, months, years, minutes, seconds", remember: "These CAN have plural form (add -s)!" },

      { category: "Common Mistakes", mistake: "Using 'How many' with uncountable", wrong: "How many water? ✗ / How many money? ✗", correct: "How much water? ✓ / How much money? ✓", rule: "Water and money are uncountable!", remember: "Can't count it → How much" },
      { category: "Common Mistakes", mistake: "Using 'How much' with countable", wrong: "How much books? ✗ / How much students? ✗", correct: "How many books? ✓ / How many students? ✓", rule: "Books and students are countable!", remember: "Can count it → How many" },
      { category: "Common Mistakes", mistake: "Forgetting plural with 'How many'", wrong: "How many book? ✗ / How many student? ✗", correct: "How many books? ✓ / How many students? ✓", rule: "Countable nouns must be plural after 'How many'!", remember: "How many + plural noun" },

      { category: "Tricky Words", people: "How many people? (countable - but irregular plural)", money: "How much money? (uncountable - even though we count bills/coins)", time: "How much time? (uncountable) BUT How many hours? (countable)", advice: "How much advice? (uncountable) BUT How many suggestions? (countable)", news: "How much news? (uncountable - singular even though ends in -s)", remember: "Some words look countable but aren't!" },

      { category: "Real-World Examples", shopping: "How much does it cost? / How many do you want? / How much money do you have?", cooking: "How much sugar do we need? / How many eggs are there? / How much milk is left?", daily_life: "How much time do we have? / How many people are coming? / How much work do you have?", travel: "How much luggage do you have? / How many bags can I bring? / How much does the ticket cost?" },

      { category: "With Units of Measurement", much_units: "How much water? → 2 liters, 3 glasses, 500ml", much_weight: "How much sugar? → 2 kilos, 100 grams, one spoon", much_money: "How much money? → $10, £50, 100 lira", many_units: "How many bottles? → 5 bottles / How many cups? → 3 cups", note: "Units help measure uncountable nouns!" },

      { category: "Key Takeaway", summary: "How much/many ask about QUANTITY", how_much: "HOW MUCH + uncountable noun (singular) - for things you CAN'T count", how_many: "HOW MANY + countable noun (PLURAL) - for things you CAN count", rule: "Can you count it one by one? → How many | Can't count it? → How much", remember: "How much water? (uncountable) | How many apples? (countable)", tip: "Think: Can I say 'one water, two waters'? No → How much | Can I say 'one apple, two apples'? Yes → How many" }
    ]
  },
  
  speakingPractice: [
    { question: "How much water do you drink every day?", answer: "I drink about two liters of water every day.", multipleChoice: { prompt: "I drink ___ two liters of water every day.", options: [{ letter: "A", text: "on", correct: false }, { letter: "B", text: "of", correct: false }, { letter: "C", text: "about", correct: true }] } },
    { question: "How many brothers do you have?", answer: "I have two brothers.", multipleChoice: { prompt: "I ___ two brothers.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "How much sugar do you take in your tea?", answer: "I take one spoon of sugar.", multipleChoice: { prompt: "I ___ one spoon of sugar.", options: [{ letter: "A", text: "takes", correct: false }, { letter: "B", text: "get", correct: false }, { letter: "C", text: "take", correct: true }] } },
    { question: "How many languages do you speak?", answer: "I speak three languages.", multipleChoice: { prompt: "___ speak three languages.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "How much milk do you need?", answer: "I need one glass of milk.", multipleChoice: { prompt: "I need one ___ of milk.", options: [{ letter: "A", text: "bar", correct: false }, { letter: "B", text: "glass", correct: true }, { letter: "C", text: "slice", correct: false }] } },
    { question: "How many students are in your class?", answer: "There are twenty students in my class.", multipleChoice: { prompt: "There ___ twenty students in my class.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "How much coffee do you drink in the morning?", answer: "I drink one cup of coffee in the morning.", multipleChoice: { prompt: "I drink one ___ of coffee in the morning.", options: [{ letter: "A", text: "cup", correct: true }, { letter: "B", text: "glass", correct: false }, { letter: "C", text: "plate", correct: false }] } },
    { question: "How many people live in your house?", answer: "Four people live in our house.", multipleChoice: { prompt: "Four people ___ in our house.", options: [{ letter: "A", text: "living", correct: false }, { letter: "B", text: "live", correct: true }, { letter: "C", text: "lives", correct: false }] } },
    { question: "How much salt do you use?", answer: "I use a little salt.", multipleChoice: { prompt: "___ use a little salt.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "How many friends do you have?", answer: "I have a lot of friends.", multipleChoice: { prompt: "I ___ a lot of friends.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "has", correct: false }] } },
    { question: "How much bread do you eat?", answer: "I eat two slices of bread.", multipleChoice: { prompt: "I eat two ___ of bread.", options: [{ letter: "A", text: "glasses", correct: false }, { letter: "B", text: "slices", correct: true }, { letter: "C", text: "cups", correct: false }] } },
    { question: "How many pens do you have?", answer: "I have five pens.", multipleChoice: { prompt: "I ___ five pens.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "has", correct: false }] } },
    { question: "How much juice is in the bottle?", answer: "There is half a bottle of juice.", multipleChoice: { prompt: "There ___ half a bottle of juice.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "How many books do you read in a year?", answer: "I read about ten books.", multipleChoice: { prompt: "I read ___ ten books.", options: [{ letter: "A", text: "about", correct: true }, { letter: "B", text: "of", correct: false }, { letter: "C", text: "on", correct: false }] } },
    { question: "How much money do you have?", answer: "I have a lot of money.", multipleChoice: { prompt: "I ___ a lot of money.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "had", correct: false }] } },
    { question: "How many cousins do you have?", answer: "I have seven cousins.", multipleChoice: { prompt: "I ___ seven cousins.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "had", correct: false }] } },
    { question: "How much time do we have?", answer: "We have ten minutes.", multipleChoice: { prompt: "We ___ ten minutes.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "had", correct: false }] } },
    { question: "How many emails do you write every day?", answer: "I write about ten emails.", multipleChoice: { prompt: "I write ___ ten emails.", options: [{ letter: "A", text: "about", correct: true }, { letter: "B", text: "of", correct: false }, { letter: "C", text: "on", correct: false }] } },
    { question: "How much rice do you eat for lunch?", answer: "I eat one plate of rice.", multipleChoice: { prompt: "I eat one ___ of rice.", options: [{ letter: "A", text: "plate", correct: true }, { letter: "B", text: "glass", correct: false }, { letter: "C", text: "slice", correct: false }] } },
    { question: "How many sandwiches do you want?", answer: "I want two sandwiches.", multipleChoice: { prompt: "___ want two sandwiches.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "How much butter do you use?", answer: "I use a small amount of butter.", multipleChoice: { prompt: "I use ___ of butter.", options: [{ letter: "A", text: "a lot", correct: false }, { letter: "B", text: "many", correct: false }, { letter: "C", text: "a small amount", correct: true }] } },
    { question: "How many cars do you see in the street?", answer: "I see a lot of cars in the street.", multipleChoice: { prompt: "I see ___ cars in the street.", options: [{ letter: "A", text: "a lot of", correct: true }, { letter: "B", text: "a little", correct: false }, { letter: "C", text: "much", correct: false }] } },
    { question: "How much tea do you drink daily?", answer: "I drink three cups of tea.", multipleChoice: { prompt: "I drink three ___ of tea.", options: [{ letter: "A", text: "bars", correct: false }, { letter: "B", text: "cups", correct: true }, { letter: "C", text: "plates", correct: false }] } },
    { question: "How many shirts do you have?", answer: "I have twelve shirts.", multipleChoice: { prompt: "I ___ twelve shirts.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "How much oil do you use for cooking?", answer: "I use very little oil.", multipleChoice: { prompt: "___ use very little oil.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "How many apples are in the fridge?", answer: "There are six apples in the fridge.", multipleChoice: { prompt: "There ___ six apples in the fridge.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "How much cheese do you eat in a week?", answer: "I eat 200 grams of cheese in a week.", multipleChoice: { prompt: "I eat 200 ___ of cheese in a week.", options: [{ letter: "A", text: "slices", correct: false }, { letter: "B", text: "cups", correct: false }, { letter: "C", text: "grams", correct: true }] } },
    { question: "How many photos do you have on your phone?", answer: "I have 250 photos on my phone.", multipleChoice: { prompt: "I ___ 250 photos on my phone.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "How much soap do you need?", answer: "I need one bar of soap.", multipleChoice: { prompt: "I need one ___ of soap.", options: [{ letter: "A", text: "slice", correct: false }, { letter: "B", text: "bar", correct: true }, { letter: "C", text: "cup", correct: false }] } },
    { question: "How many glasses do you need?", answer: "I need four glasses.", multipleChoice: { prompt: "___ need four glasses.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "How much flour is in the bag?", answer: "There is one kilogram of flour.", multipleChoice: { prompt: "There ___ one kilogram of flour.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "How many eggs do you need to make a cake?", answer: "I need two eggs to make a cake.", multipleChoice: { prompt: "I need ___ eggs to make a cake.", options: [{ letter: "A", text: "little", correct: false }, { letter: "B", text: "two", correct: true }, { letter: "C", text: "much", correct: false }] } },
    { question: "How much ketchup do you want on your pizza?", answer: "Just a little ketchup, please.", multipleChoice: { prompt: "Just ___ ketchup, please.", options: [{ letter: "A", text: "a few", correct: false }, { letter: "B", text: "many", correct: false }, { letter: "C", text: "a little", correct: true }] } },
    { question: "How many chairs are in the room?", answer: "There are ten chairs in the room.", multipleChoice: { prompt: "There ___ ten chairs in the room.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "How much lemonade can you drink?", answer: "I can drink one glass of lemonade.", multipleChoice: { prompt: "I ___ drink one glass of lemonade.", options: [{ letter: "A", text: "should", correct: false }, { letter: "B", text: "can", correct: true }, { letter: "C", text: "could", correct: false }] } },
    { question: "How many pencils are on the table?", answer: "There are five pencils.", multipleChoice: { prompt: "There ___ five pencils.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "How much shampoo is in the bottle?", answer: "There is a little shampoo in the bottle.", multipleChoice: { prompt: "There ___ a little shampoo in the bottle.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "How many bananas do you want?", answer: "I want three bananas.", multipleChoice: { prompt: "___ want three bananas.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "How much pasta do you need?", answer: "I need 250 grams of pasta.", multipleChoice: { prompt: "I need 250 ___ of pasta.", options: [{ letter: "A", text: "slices", correct: false }, { letter: "B", text: "glasses", correct: false }, { letter: "C", text: "grams", correct: true }] } },
    { question: "How many socks do you have?", answer: "I have ten pairs of socks.", multipleChoice: { prompt: "I ___ ten pairs of socks.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "had", correct: false }] } },
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
  
  table: {
    title: "📋 Imperatives (Commands, Instructions, Requests)",
    data: [
      { category: "What are Imperatives?", explanation: "Commands, instructions, requests, or advice given to someone", turkish: "Emir, talimat, rica cümleleri", function: "Tell someone what to do (or not to do)", examples: "Sit down. / Don't run. / Please help me.", note: "Direct and simple - no subject needed!" },

      { category: "Structure - Positive", form: "BASE VERB (that's it!)", examples: "Open / Close / Sit / Stand / Listen / Write", rule: "Just use the base form of the verb - nothing else!", turkish: "Fiilin yalın hali", pattern: "Verb + (object/complement)", no_subject: "No 'you' needed! The subject is understood" },
      { category: "Structure - Positive", examples_full: "Open the door. / Close the window. / Sit down. / Stand up. / Listen carefully. / Write your name.", note: "Start directly with the verb!", remember: "No need for subject pronouns (I, you, he, etc.)" },

      { category: "Structure - Negative", form: "DON'T + base verb", examples: "Don't run / Don't shout / Don't touch / Don't worry / Don't forget", rule: "Add 'Don't' before the base verb", turkish: "-me/-ma (yapma)", pattern: "Don't + verb", important: "Always use 'don't' (NOT doesn't)!" },
      { category: "Structure - Negative", examples_full: "Don't run! / Don't shout! / Don't touch that! / Don't worry. / Don't forget your homework.", note: "Don't = Do not (informal)", formal: "Do not smoke. (more formal/signs)", remember: "Don't, NOT doesn't - even for he/she!" },

      { category: "Making it Polite - PLEASE", form: "Please + verb OR verb + please", examples_beginning: "Please sit down. / Please open your books. / Please be quiet.", examples_end: "Sit down, please. / Open your books, please. / Be quiet, please.", turkish: "Lütfen...", note: "'Please' makes commands more polite and friendly!" },
      { category: "Making it Polite - PLEASE", when_to_use: "Use 'please' when making requests or being polite", without_please: "Close the door. (command/instruction)", with_please: "Please close the door. (polite request)", tip: "Always use 'please' in formal situations!", position: "'Please' can go at the beginning or end (with comma)" },

      { category: "Common Uses - Instructions", usage: "Giving step-by-step instructions", examples: "Open the book. / Turn to page 10. / Read the text. / Answer the questions.", context: "In class, following recipes, using manuals", pattern: "Sequential commands", turkish: "Talimatlar verme" },

      { category: "Common Uses - Commands", usage: "Giving orders or strong directions", examples: "Stop! / Go! / Wait! / Run! / Be careful! / Watch out!", context: "Urgent situations, sports, military", pattern: "Short, direct, forceful", note: "Often with exclamation marks!" },

      { category: "Common Uses - Requests", usage: "Asking someone to do something politely", examples: "Please help me. / Please pass the salt. / Please wait a moment.", context: "Daily conversations, asking for favors", pattern: "Usually with 'please'", turkish: "Rica etme, yardım isteme" },

      { category: "Common Uses - Advice", usage: "Giving suggestions or recommendations", examples: "Don't worry. / Take your time. / Be patient. / Think carefully.", context: "Helping someone, giving tips", pattern: "Often negative imperatives or encouraging", note: "Softer tone than commands" },

      { category: "Common Uses - Warnings", usage: "Alerting someone to danger", examples: "Don't touch! / Be careful! / Watch out! / Look out! / Stop!", context: "Dangerous situations", pattern: "Often with 'don't' or 'be careful'", turkish: "Uyarı" },

      { category: "In the Classroom", teacher_to_students: "Open your books. / Listen carefully. / Write this down. / Don't talk. / Be quiet.", asking_permission: "May I go to the bathroom? (not imperative, but related)", instructions: "Read the text. / Answer the questions. / Work in pairs.", common: "Sit down. / Stand up. / Come to the board. / Go back to your seat." },

      { category: "Let's (Inclusive Imperative)", form: "Let's + base verb", meaning: "Suggestion for 'us' (including speaker)", examples: "Let's go! / Let's eat. / Let's study. / Let's play.", turkish: "Hadi ... (beraber yapalım)", negative: "Let's not go. / Let's not wait.", note: "Includes the speaker in the action!" },

      { category: "Common Imperatives - Daily Life", actions: "Open, Close, Turn on, Turn off, Take, Give, Put, Bring", movement: "Come, Go, Walk, Run, Stop, Wait, Sit, Stand", communication: "Listen, Speak, Talk, Ask, Answer, Read, Write, Tell", care: "Be careful, Watch out, Take care, Don't worry" },

      { category: "Common Mistakes", mistake: "Adding subject 'you'", wrong: "You sit down. ✗ (sounds unnatural)", correct: "Sit down. ✓", rule: "No subject needed in imperatives!", note: "'You' is understood, not stated" },
      { category: "Common Mistakes", mistake: "Using 'doesn't' in negative", wrong: "Doesn't run! ✗", correct: "Don't run! ✓", rule: "Always use 'don't' (NOT doesn't) for negative imperatives!", remember: "Don't = for all subjects in imperatives" },
      { category: "Common Mistakes", mistake: "Using 'to' before the verb", wrong: "Please to sit down. ✗", correct: "Please sit down. ✓", rule: "No 'to' with imperatives!", remember: "Use base verb directly" },

      { category: "Tone and Meaning", neutral: "Close the door. (simple instruction)", polite: "Please close the door. (polite request)", urgent: "Close the door! (command/urgent)", very_polite: "Could you please close the door? (very polite question, not imperative)", note: "Context and intonation change the meaning!" },

      { category: "Real-World Examples", signs: "Push / Pull / Stop / No smoking / Keep off the grass", recipes: "Add sugar. / Mix well. / Bake for 20 minutes. / Serve hot.", directions: "Turn left. / Go straight. / Take the second right. / Stop at the light.", safety: "Don't touch. / Be careful. / Watch your step. / Mind the gap." },

      { category: "Key Takeaway", summary: "Imperatives = Commands/Instructions/Requests", positive: "BASE VERB (Open the door.)", negative: "DON'T + base verb (Don't run!)", polite: "Add PLEASE (Please sit down.)", rules: "No subject | Use base verb | Always 'don't' (not doesn't) | No 'to'", remember: "Start with the verb! That's all you need!", usage: "Commands, instructions, requests, advice, warnings" }
    ]
  },
  
  speakingPractice: [
    { question: "How do you tell someone to open the door?", answer: "Open the door.", multipleChoice: { prompt: "___ the door.", options: [{ letter: "A", text: "Open", correct: true }, { letter: "B", text: "Opening", correct: false }, { letter: "C", text: "Opened", correct: false }] } },
    { question: "How do you tell someone to close their book?", answer: "Close your book.", multipleChoice: { prompt: "___ your book.", options: [{ letter: "A", text: "Closed", correct: false }, { letter: "B", text: "Close", correct: true }, { letter: "C", text: "Closing", correct: false }] } },
    { question: "How do you politely ask someone to sit down?", answer: "Please sit down.", multipleChoice: { prompt: "Please ___ down.", options: [{ letter: "A", text: "sitting", correct: false }, { letter: "B", text: "sat", correct: false }, { letter: "C", text: "sit", correct: true }] } },
    { question: "How do you tell someone to stand up?", answer: "Stand up.", multipleChoice: { prompt: "___ up.", options: [{ letter: "A", text: "Stand", correct: true }, { letter: "B", text: "Standing", correct: false }, { letter: "C", text: "Stood", correct: false }] } },
    { question: "How do you tell someone to turn on the light?", answer: "Turn on the light.", multipleChoice: { prompt: "___ on the light.", options: [{ letter: "A", text: "Turned", correct: false }, { letter: "B", text: "Turn", correct: true }, { letter: "C", text: "Turning", correct: false }] } },
    { question: "How do you tell someone to turn off the TV?", answer: "Turn off the TV.", multipleChoice: { prompt: "___ off the TV.", options: [{ letter: "A", text: "Turning", correct: false }, { letter: "B", text: "Turned", correct: false }, { letter: "C", text: "Turn", correct: true }] } },
    { question: "How do you tell someone not to shout?", answer: "Don’t shout.", multipleChoice: { prompt: "Don’t ___.", options: [{ letter: "A", text: "shout", correct: true }, { letter: "B", text: "shouting", correct: false }, { letter: "C", text: "shouted", correct: false }] } },
    { question: "How do you tell someone to be quiet?", answer: "Be quiet.", multipleChoice: { prompt: "___ quiet.", options: [{ letter: "A", text: "Been", correct: false }, { letter: "B", text: "Be", correct: true }, { letter: "C", text: "Being", correct: false }] } },
    { question: "How do you politely ask someone to write their name?", answer: "Please write your name.", multipleChoice: { prompt: "Please ___ your name.", options: [{ letter: "A", text: "writing", correct: false }, { letter: "B", text: "wrote", correct: false }, { letter: "C", text: "write", correct: true }] } },
    { question: "How do you tell someone not to touch that?", answer: "Don’t touch that!", multipleChoice: { prompt: "Don’t ___ that!", options: [{ letter: "A", text: "touch", correct: true }, { letter: "B", text: "touching", correct: false }, { letter: "C", text: "touched", correct: false }] } },
    { question: "How do you tell someone to come here?", answer: "Come here.", multipleChoice: { prompt: "___ here.", options: [{ letter: "A", text: "Came", correct: false }, { letter: "B", text: "Come", correct: true }, { letter: "C", text: "Coming", correct: false }] } },
    { question: "How do you tell someone to go to the board?", answer: "Go to the board.", multipleChoice: { prompt: "___ to the board.", options: [{ letter: "A", text: "Going", correct: false }, { letter: "B", text: "Went", correct: false }, { letter: "C", text: "Go", correct: true }] } },
    { question: "How do you tell someone to listen carefully?", answer: "Listen carefully.", multipleChoice: { prompt: "___ carefully.", options: [{ letter: "A", text: "Listen", correct: true }, { letter: "B", text: "Listening", correct: false }, { letter: "C", text: "Listened", correct: false }] } },
    { question: "How do you tell someone not to run?", answer: "Don’t run!", multipleChoice: { prompt: "Don’t ___!", options: [{ letter: "A", text: "ran", correct: false }, { letter: "B", text: "run", correct: true }, { letter: "C", text: "running", correct: false }] } },
    { question: "How do you tell someone to take out their notebook?", answer: "Take out your notebook.", multipleChoice: { prompt: "___ out your notebook.", options: [{ letter: "A", text: "Taking", correct: false }, { letter: "B", text: "Took", correct: false }, { letter: "C", text: "Take", correct: true }] } },
    { question: "How do you politely ask someone to help you?", answer: "Please help me.", multipleChoice: { prompt: "Please ___ me.", options: [{ letter: "A", text: "help", correct: true }, { letter: "B", text: "helping", correct: false }, { letter: "C", text: "helped", correct: false }] } },
    { question: "How do you tell someone not to be late?", answer: "Don’t be late.", multipleChoice: { prompt: "Don’t ___ late.", options: [{ letter: "A", text: "been", correct: false }, { letter: "B", text: "be", correct: true }, { letter: "C", text: "being", correct: false }] } },
    { question: "How do you tell someone to wash their hands?", answer: "Wash your hands.", multipleChoice: { prompt: "___ your hands.", options: [{ letter: "A", text: "Washing", correct: false }, { letter: "B", text: "Washed", correct: false }, { letter: "C", text: "Wash", correct: true }] } },
    { question: "How do you tell someone to wait here?", answer: "Wait here.", multipleChoice: { prompt: "___ here.", options: [{ letter: "A", text: "Wait", correct: true }, { letter: "B", text: "Waiting", correct: false }, { letter: "C", text: "Waited", correct: false }] } },
    { question: "How do you tell someone to follow you?", answer: "Follow me.", multipleChoice: { prompt: "___ me.", options: [{ letter: "A", text: "Followed", correct: false }, { letter: "B", text: "Follow", correct: true }, { letter: "C", text: "Following", correct: false }] } },
    { question: "How do you tell someone to read this page?", answer: "Read this page.", multipleChoice: { prompt: "___ this page.", options: [{ letter: "A", text: "Reading", correct: false }, { letter: "B", text: "Reads", correct: false }, { letter: "C", text: "Read", correct: true }] } },
    { question: "How do you tell someone not to speak Turkish?", answer: "Don’t speak Turkish.", multipleChoice: { prompt: "Don’t ___ Turkish.", options: [{ letter: "A", text: "speak", correct: true }, { letter: "B", text: "speaking", correct: false }, { letter: "C", text: "spoke", correct: false }] } },
    { question: "How do you tell someone to give you their pen?", answer: "Give me your pen.", multipleChoice: { prompt: "___ me your pen.", options: [{ letter: "A", text: "Gave", correct: false }, { letter: "B", text: "Give", correct: true }, { letter: "C", text: "Giving", correct: false }] } },
    { question: "How do you politely ask someone to repeat after you?", answer: "Please repeat after me.", multipleChoice: { prompt: "Please ___ after me.", options: [{ letter: "A", text: "repeating", correct: false }, { letter: "B", text: "repeated", correct: false }, { letter: "C", text: "repeat", correct: true }] } },
    { question: "How do you tell someone not to forget their homework?", answer: "Don’t forget your homework.", multipleChoice: { prompt: "Don’t ___ your homework.", options: [{ letter: "A", text: "forget", correct: true }, { letter: "B", text: "forgetting", correct: false }, { letter: "C", text: "forgot", correct: false }] } },
    { question: "How do you tell someone to look at the screen?", answer: "Look at the screen.", multipleChoice: { prompt: "___ at the screen.", options: [{ letter: "A", text: "Looked", correct: false }, { letter: "B", text: "Look", correct: true }, { letter: "C", text: "Looking", correct: false }] } },
    { question: "How do you tell someone not to eat in class?", answer: "Don’t eat in class.", multipleChoice: { prompt: "Don’t ___ in class.", options: [{ letter: "A", text: "eating", correct: false }, { letter: "B", text: "ate", correct: false }, { letter: "C", text: "eat", correct: true }] } },
    { question: "How do you tell someone to answer the question?", answer: "Answer the question.", multipleChoice: { prompt: "___ the question.", options: [{ letter: "A", text: "Answer", correct: true }, { letter: "B", text: "Answering", correct: false }, { letter: "C", text: "Answered", correct: false }] } },
    { question: "How do you tell someone not to open the window?", answer: "Don’t open the window.", multipleChoice: { prompt: "Don’t ___ the window.", options: [{ letter: "A", text: "opened", correct: false }, { letter: "B", text: "open", correct: true }, { letter: "C", text: "opening", correct: false }] } },
    { question: "How do you politely ask someone to clean the board?", answer: "Please clean the board.", multipleChoice: { prompt: "Please ___ the board.", options: [{ letter: "A", text: "cleaning", correct: false }, { letter: "B", text: "cleaned", correct: false }, { letter: "C", text: "clean", correct: true }] } },
    { question: "How do you tell someone to put their phone away?", answer: "Put your phone away.", multipleChoice: { prompt: "___ your phone away.", options: [{ letter: "A", text: "Put", correct: true }, { letter: "B", text: "Putting", correct: false }, { letter: "C", text: "Puts", correct: false }] } },
    { question: "How do you tell someone to take a deep breath?", answer: "Take a deep breath.", multipleChoice: { prompt: "___ a deep breath.", options: [{ letter: "A", text: "Took", correct: false }, { letter: "B", text: "Take", correct: true }, { letter: "C", text: "Taking", correct: false }] } },
    { question: "How do you tell someone not to worry?", answer: "Don’t worry.", multipleChoice: { prompt: "Don’t ___.", options: [{ letter: "A", text: "worrying", correct: false }, { letter: "B", text: "worried", correct: false }, { letter: "C", text: "worry", correct: true }] } },
    { question: "How do you tell someone to try again?", answer: "Try again.", multipleChoice: { prompt: "___ again.", options: [{ letter: "A", text: "Try", correct: true }, { letter: "B", text: "Trying", correct: false }, { letter: "C", text: "Tried", correct: false }] } },
    { question: "How do you tell someone to be polite?", answer: "Be polite.", multipleChoice: { prompt: "___ polite.", options: [{ letter: "A", text: "Been", correct: false }, { letter: "B", text: "Be", correct: true }, { letter: "C", text: "Being", correct: false }] } },
    { question: "How do you tell someone not to make noise?", answer: "Don’t make noise.", multipleChoice: { prompt: "Don’t ___ noise.", options: [{ letter: "A", text: "making", correct: false }, { letter: "B", text: "made", correct: false }, { letter: "C", text: "make", correct: true }] } },
    { question: "How do you politely ask someone to be careful?", answer: "Please be careful.", multipleChoice: { prompt: "Please ___ careful.", options: [{ letter: "A", text: "be", correct: true }, { letter: "B", text: "being", correct: false }, { letter: "C", text: "been", correct: false }] } },
    { question: "How do you tell someone to turn the page?", answer: "Turn the page.", multipleChoice: { prompt: "___ the page.", options: [{ letter: "A", text: "Turned", correct: false }, { letter: "B", text: "Turn", correct: true }, { letter: "C", text: "Turning", correct: false }] } },
    { question: "How do you tell someone to smile?", answer: "Smile!", multipleChoice: { prompt: "___!", options: [{ letter: "A", text: "Smiling", correct: false }, { letter: "B", text: "Smiled", correct: false }, { letter: "C", text: "Smile", correct: true }] } },
    { question: "How do you politely ask someone to do their best?", answer: "Please do your best.", multipleChoice: { prompt: "Please ___ your best.", options: [{ letter: "A", text: "do", correct: true }, { letter: "B", text: "doing", correct: false }, { letter: "C", text: "did", correct: false }] } },
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
  
  table: {
    title: "📋 Present Continuous: Affirmative (Actions Happening NOW)",
    data: [
      { category: "What is Present Continuous?", explanation: "Tense for actions happening RIGHT NOW or temporary situations", turkish: "Şimdiki zaman", function: "Talk about what's happening at this moment", examples: "I am studying / She is cooking / They are playing", key_word: "NOW!" },

      { category: "Structure", form: "Subject + AM/IS/ARE + verb-ING", pattern: "BE verb + verb-ing", rule: "Two parts: BE verb (am/is/are) + main verb with -ing", turkish: "Özne + am/is/are + fiil-ing", examples: "I am working / He is sleeping / We are eating" },
      { category: "Structure", which_be: "I → am | He/She/It → is | You/We/They → are", key_rule: "Choose correct BE verb for the subject!", remember: "BE verb changes, but always add -ing to main verb!", note: "Both parts are essential!" },

      { category: "With I", form: "I AM + verb-ing", contraction: "I'm + verb-ing", examples: "I am studying / I am reading / I am working", example_sentence: "I am learning English right now.", turkish: "Ben ... -iyorum/-ıyorum", contracted: "I'm studying (more common in speech)" },

      { category: "With He/She/It", form: "He/She/It IS + verb-ing", contraction: "He's / She's / It's + verb-ing", examples: "He is sleeping / She is cooking / It is raining", example_sentences: "She is watching TV now. / It is working perfectly.", turkish: "O ... -iyor", contracted: "She's cooking (more common)" },

      { category: "With You/We/They", form: "You/We/They ARE + verb-ing", contraction: "You're / We're / They're + verb-ing", examples: "You are talking / We are studying / They are playing", example_sentences: "We are having lunch. / They are running in the park.", turkish: "Sen.../Biz.../Onlar ... -iyor/-ıyor", contracted: "We're studying (more common)" },

      { category: "How to Add -ING", rule_1: "Most verbs: just add -ing", examples_1: "play → playing, read → reading, do → doing, eat → eating, work → working", note_1: "Most common pattern", turkish: "Çoğu fiile -ing ekle" },
      { category: "How to Add -ING", rule_2: "Verbs ending in -e: remove e, add -ing", examples_2: "write → writing, dance → dancing, make → making, come → coming, have → having", note_2: "Drop the 'e' first!", exception: "be → being (keep the e!)" },
      { category: "How to Add -ING", rule_3: "Short verbs (CVC): double last letter + -ing", examples_3: "run → running, swim → swimming, sit → sitting, stop → stopping, get → getting", note_3: "Consonant-Vowel-Consonant pattern", explanation: "Double the final consonant to keep the vowel sound short" },

      { category: "When to Use - NOW", usage: "Actions happening at this exact moment", examples: "I am typing now. / She is speaking at this moment. / Look! It's raining!", keywords: "now, at the moment, right now, at present, currently", turkish: "Şu anda olan eylemler", tip: "If you can see/hear it happening, use Present Continuous!" },

      { category: "When to Use - Temporary", usage: "Temporary situations (not permanent)", examples: "I'm staying with my friend this week. / He's working at a café this month. / They're living in London temporarily.", temporary_vs_permanent: "Temporary: I'm living in a hotel (this week). | Permanent: I live in Istanbul (always).", turkish: "Geçici durumlar", note: "Actions that will change soon" },

      { category: "Time Expressions", now_words: "now, right now, at the moment, at present, currently", today_this: "today, this week, this month, this year", look_listen: "Look! Listen! (to draw attention to something happening)", examples: "She's working right now. / They're studying this week. / Look! He's coming!" },

      { category: "Contractions (Very Common!)", i_am: "I am → I'm", he_is: "He is → He's", she_is: "She is → She's", it_is: "It is → It's", we_are: "We are → We're", you_are: "You are → You're", they_are: "They are → They're", usage: "Always use contractions in spoken English!", examples: "I'm eating / She's reading / We're watching" },

      { category: "Common Verbs in Continuous", actions: "doing, making, having, going, coming, leaving", work_study: "working, studying, learning, writing, reading, teaching", daily: "eating, drinking, sleeping, cooking, cleaning, washing", leisure: "playing, watching, listening, talking, sitting, standing", examples: "I'm eating lunch. / She's working. / They're playing football." },

      { category: "Common Mistakes", mistake: "Forgetting BE verb", wrong: "I studying ✗ / She cooking ✗", correct: "I am studying ✓ / She is cooking ✓", rule: "Must have BE verb (am/is/are)!", remember: "BE + verb-ing (both needed!)" },
      { category: "Common Mistakes", mistake: "Forgetting -ING", wrong: "I am study ✗ / She is cook ✗", correct: "I am studying ✓ / She is cooking ✓", rule: "Must add -ING to the verb!", remember: "BE verb + verb-ING" },
      { category: "Common Mistakes", mistake: "Wrong BE verb", wrong: "I is studying ✗ / She are cooking ✗", correct: "I am studying ✓ / She is cooking ✓", rule: "I = am | He/She/It = is | You/We/They = are", remember: "Match BE verb to subject!" },

      { category: "Present Continuous vs Simple", continuous_now: "I am studying now. (happening at this moment)", simple_habit: "I study every day. (regular habit)", continuous_temp: "She is living in London this month. (temporary)", simple_permanent: "She lives in Istanbul. (permanent)", key: "Continuous = NOW or TEMPORARY | Simple = ALWAYS or HABITUAL" },

      { category: "Real-World Examples", right_now: "I'm writing an email. / She's talking on the phone. / They're having a meeting.", temporary: "I'm working on a new project this week. / He's staying with friends this month.", describing_scene: "Look! The children are playing in the park. / Listen! Someone is singing.", daily: "I'm cooking dinner. / She's watching TV. / We're doing homework." },

      { category: "Key Takeaway", summary: "Present Continuous = Actions happening NOW or temporary situations", form: "Subject + AM/IS/ARE + verb-ING", be_verbs: "I am | He/She/It is | You/We/They are", ing_rules: "Most: +ing | -e verbs: drop e, +ing | CVC: double consonant, +ing", when: "Use for actions happening NOW or TEMPORARY situations", keywords: "now, at the moment, right now, this week/month, Look!, Listen!", remember: "Need BOTH: BE verb + verb-ING!", next: "Next: Learn negative and question forms!" }
    ]
  },
  
  speakingPractice: [
    { question: "What are you doing?", answer: "I am studying English.", multipleChoice: { prompt: "I ___ studying English.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: true }] } },
    { question: "What is your friend doing?", answer: "She is watching TV.", multipleChoice: { prompt: "She ___ watching TV.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What are the children doing?", answer: "They are playing football.", multipleChoice: { prompt: "They ___ playing football.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "What is your brother doing?", answer: "He is eating lunch.", multipleChoice: { prompt: "He ___ eating lunch.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What are you doing right now?", answer: "I am talking to you.", multipleChoice: { prompt: "I ___ talking to you.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "What is your mother doing?", answer: "She is cooking dinner.", multipleChoice: { prompt: "She ___ cooking dinner.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What is your friend doing?", answer: "He is reading a book.", multipleChoice: { prompt: "He ___ reading a book.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What are the children doing?", answer: "They are drawing pictures.", multipleChoice: { prompt: "They ___ drawing pictures.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What are you wearing?", answer: "I am wearing a blue shirt.", multipleChoice: { prompt: "I ___ wearing a blue shirt.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "What are your coworkers doing?", answer: "They are working at the office.", multipleChoice: { prompt: "They ___ working at the office.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "What is your cat doing?", answer: "My cat is sleeping.", multipleChoice: { prompt: "My cat ___ sleeping.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "What is your father doing?", answer: "He is working in the garden.", multipleChoice: { prompt: "He ___ working in the garden.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What are you eating?", answer: "I am eating a sandwich.", multipleChoice: { prompt: "I ___ eating a sandwich.", options: [{ letter: "A", text: "am", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "What is your teacher doing?", answer: "She is teaching English.", multipleChoice: { prompt: "She ___ teaching English.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "What are your friends doing?", answer: "They are listening to music.", multipleChoice: { prompt: "They ___ listening to music.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "What is your brother doing?", answer: "He is playing video games.", multipleChoice: { prompt: "He ___ playing video games.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "What are you drinking?", answer: "I am drinking water.", multipleChoice: { prompt: "I ___ drinking water.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "am", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "What is your sister doing?", answer: "She is doing her homework.", multipleChoice: { prompt: "She ___ doing her homework.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "What is your dog doing?", answer: "It is running in the yard.", multipleChoice: { prompt: "It ___ running in the yard.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "What are you reading?", answer: "I am reading a novel.", multipleChoice: { prompt: "I ___ reading a novel.", options: [{ letter: "A", text: "am", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "What is your friend wearing?", answer: "He is wearing jeans and a T-shirt.", multipleChoice: { prompt: "He ___ wearing jeans and a T-shirt.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What am I doing at the moment?", answer: "You are teaching me English.", multipleChoice: { prompt: "You ___ teaching me English.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "What are your parents watching?", answer: "They are watching a movie.", multipleChoice: { prompt: "They ___ watching a movie.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "What is your mother eating?", answer: "She is eating an apple.", multipleChoice: { prompt: "She ___ eating an apple.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What are you learning?", answer: "I am learning English grammar.", multipleChoice: { prompt: "I ___ learning English grammar.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: true }] } },
    { question: "What are your parents doing?", answer: "They are cleaning the house.", multipleChoice: { prompt: "They ___ cleaning the house.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "What are the students doing?", answer: "They are taking an exam.", multipleChoice: { prompt: "They ___ taking an exam.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "What is your friend drinking?", answer: "She is drinking orange juice.", multipleChoice: { prompt: "She ___ drinking orange juice.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What is the baby doing?", answer: "The baby is crying.", multipleChoice: { prompt: "The baby ___ crying.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What are your neighbors doing?", answer: "They are having a party.", multipleChoice: { prompt: "They ___ having a party.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What are you thinking about?", answer: "I am thinking about my weekend plans.", multipleChoice: { prompt: "I ___ thinking about my weekend plans.", options: [{ letter: "A", text: "am", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "What are we talking about today?", answer: "We are talking about Present Continuous today.", multipleChoice: { prompt: "We ___ talking about Present Continuous today.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What is the bird doing?", answer: "It is flying in the sky.", multipleChoice: { prompt: "It ___ flying in the sky.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "What are the workers doing?", answer: "They are fixing the road.", multipleChoice: { prompt: "They ___ fixing the road.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "What are you looking at?", answer: "I am looking at my book.", multipleChoice: { prompt: "I ___ looking at my book.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "What is the man doing?", answer: "He is talking on the phone.", multipleChoice: { prompt: "He ___ talking on the phone.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What are the kids playing?", answer: "They are playing hide and seek.", multipleChoice: { prompt: "They ___ playing hide and seek.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What is your sister writing?", answer: "She is writing a letter.", multipleChoice: { prompt: "She ___ writing a letter.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "What are you doing this evening?", answer: "I am meeting my friends.", multipleChoice: { prompt: "I ___ meeting my friends.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "am", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "What are your classmates reading?", answer: "They are reading a short story.", multipleChoice: { prompt: "They ___ reading a short story.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
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
  
  table: {
    title: "📋 Present Continuous: Negative (NOT happening now)",
    data: [
      { category: "What is Present Continuous Negative?", explanation: "To say what is NOT happening right now", turkish: "Şimdiki zamanın olumsuz hali", function: "Express actions that are NOT occurring at this moment", examples: "I'm not working / She isn't eating / They aren't playing", opposite: "Opposite of affirmative Present Continuous" },

      { category: "Structure", form: "Subject + AM/IS/ARE + NOT + verb-ING", pattern: "BE verb + not + verb-ing", rule: "Add 'NOT' after the BE verb, before verb-ing", turkish: "Özne + am/is/are + not + fiil-ing", examples: "I am not working / He is not sleeping / We are not eating" },
      { category: "Structure", which_be: "I → am not | He/She/It → is not | You/We/They → are not", key_rule: "Same BE verb as affirmative, just add 'not'", remember: "NOT goes between BE and main verb!", note: "Main verb still has -ing!" },

      { category: "With I", form: "I AM NOT + verb-ing", contraction: "I'm not + verb-ing", examples: "I am not studying / I am not reading / I am not working", example_sentence: "I'm not watching TV right now.", turkish: "Ben ... -miyorum/-mıyorum", note: "Only one contraction possible: I'm not (NOT I amn't)" },

      { category: "With He/She/It", form: "He/She/It IS NOT + verb-ing", contractions: "isn't OR He's/She's/It's not", examples: "He is not sleeping / She is not cooking / It is not raining", example_sentences: "She isn't watching TV now. / It's not working.", turkish: "O ... -miyor/-mıyor", two_ways: "He isn't OR He's not (both correct!)" },

      { category: "With You/We/They", form: "You/We/They ARE NOT + verb-ing", contractions: "aren't OR You're/We're/They're not", examples: "You are not talking / We are not studying / They are not playing", example_sentences: "We aren't having lunch. / They're not running.", turkish: "Sen.../Biz.../Onlar ... -miyor/-mıyor", two_ways: "We aren't OR We're not (both correct!)" },

      { category: "Contractions - Two Ways!", is_not: "is not = isn't OR He's not", are_not: "are not = aren't OR We're not", am_not: "am not = I'm not (only one way)", most_common: "isn't and aren't are most common in speech", examples: "She isn't eating. / They aren't sleeping. / I'm not working.", choice: "Both ways are correct - choose what feels natural!" },

      { category: "Full Forms", i_am_not: "I am not", he_is_not: "He/She/It is not", you_are_not: "You/We/They are not", usage: "Full forms used in formal writing or for emphasis", emphasis: "I am NOT going! (very strong)", normal: "I'm not going. (everyday)", tip: "Use contractions in everyday speech!" },

      { category: "Common Negative Statements", right_now: "I'm not working right now. / She isn't eating at the moment.", denial: "I'm not lying! / He isn't joking!", explaining: "Sorry, I'm not listening. / She isn't coming today.", temporary: "We're not living there anymore. / They aren't staying long.", turkish: "Şu anda yapmadığın şeyler" },

      { category: "With Time Expressions", now_words: "not... now, not... at the moment, not... right now", examples: "I'm not studying now. / She isn't working at the moment. / They aren't playing right now.", today_this: "not... today, not... this week, not... this month", examples_temp: "He isn't working today. / We're not traveling this month." },

      { category: "Common Mistakes", mistake: "Wrong position of 'not'", wrong: "I not am studying ✗ / She not is cooking ✗", correct: "I am not studying ✓ / She is not cooking ✓", rule: "'Not' goes AFTER BE verb!", remember: "BE + not + verb-ing" },
      { category: "Common Mistakes", mistake: "Forgetting -ing on main verb", wrong: "I'm not study ✗ / She isn't cook ✗", correct: "I'm not studying ✓ / She isn't cooking ✓", rule: "Main verb still needs -ing in negative!", remember: "NOT doesn't remove -ing!" },
      { category: "Common Mistakes", mistake: "Using don't/doesn't", wrong: "I don't studying ✗ / She doesn't cooking ✗", correct: "I'm not studying ✓ / She isn't cooking ✓", rule: "Use 'not' with BE verb, NOT don't/doesn't!", remember: "Present Continuous uses BE + not" },

      { category: "Answering Questions", question: "Are you watching TV?", negative_answer: "No, I'm not. / No, I'm not watching TV.", question_he: "Is he working?", negative_answer_he: "No, he isn't. / No, he's not working.", pattern: "No, + subject + am not/isn't/aren't (+ verb-ing)", short_answer: "Usually just: No, I'm not. / No, he isn't." },

      { category: "Contrasting Affirmative and Negative", affirmative: "I am working. (happening now)", negative: "I'm not working. (not happening now)", affirmative_she: "She is eating.", negative_she: "She isn't eating.", affirmative_they: "They are playing.", negative_they: "They aren't playing.", key: "Just add 'not' after BE verb!" },

      { category: "Real-World Examples", explaining: "Sorry, I'm not listening. / He isn't coming to the party. / We're not staying long.", right_now: "I'm not studying right now. / She isn't working today. / They aren't eating yet.", correcting: "I'm not sleeping! / He isn't lying! / We're not leaving!", temporary: "I'm not living there anymore. / She isn't working this week. / They're not studying English now." },

      { category: "Common Negative Phrases", im_not: "I'm not sure. / I'm not ready. / I'm not joking. / I'm not kidding.", he_isnt: "He isn't here. / He isn't coming. / He isn't working. / He isn't feeling well.", they_arent: "They aren't home. / They aren't available. / They aren't listening. / They aren't ready.", note: "Very common in everyday conversation!" },

      { category: "Present Simple Negative vs Present Continuous Negative", simple: "I don't work. (never/generally)", continuous: "I'm not working. (not right now)", simple_she: "She doesn't eat meat. (general habit)", continuous_she: "She isn't eating. (not at this moment)", key: "Simple = general/habit | Continuous = right now", remember: "Different structures: don't vs am not/isn't/aren't" },

      { category: "Key Takeaway", summary: "Present Continuous Negative = NOT happening now", form: "Subject + AM/IS/ARE + NOT + verb-ING", contractions: "I'm not | isn't / He's not | aren't / We're not", position: "NOT goes after BE verb, before main verb", be_verbs: "I am not | He/She/It is not | You/We/They are not", remember: "Main verb still has -ING!", common: "Use contractions in everyday speech!", next: "Next: Learn question forms!" }
    ]
  },
  
  speakingPractice: [
    { question: "Are you watching TV?", answer: "No, I’m not watching TV.", multipleChoice: { prompt: "No, I’m not ___ TV.", options: [{ letter: "A", text: "watching", correct: true }, { letter: "B", text: "watch", correct: false }, { letter: "C", text: "watched", correct: false }] } },
    { question: "Is your mother eating lunch?", answer: "No, she isn’t eating lunch.", multipleChoice: { prompt: "No, ___ isn’t eating lunch.", options: [{ letter: "A", text: "it", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "she", correct: true }] } },
    { question: "Are children playing football outside?", answer: "No, they aren’t playing football outside.", multipleChoice: { prompt: "No, they aren’t ___ football outside.", options: [{ letter: "A", text: "working", correct: false }, { letter: "B", text: "studying", correct: false }, { letter: "C", text: "playing", correct: true }] } },
    { question: "Is your brother reading a book?", answer: "No, he isn’t reading a book.", multipleChoice: { prompt: "No, he isn’t ___ a book.", options: [{ letter: "A", text: "reading", correct: true }, { letter: "B", text: "read", correct: false }, { letter: "C", text: "reads", correct: false }] } },
    { question: "Are you using your phone?", answer: "No, I’m not using my phone.", multipleChoice: { prompt: "No, I’m not ___ my phone.", options: [{ letter: "A", text: "used", correct: false }, { letter: "B", text: "using", correct: true }, { letter: "C", text: "use", correct: false }] } },
    { question: "Is your brother doing his homework?", answer: "No, he isn’t doing his homework.", multipleChoice: { prompt: "No, ___ isn’t doing his homework.", options: [{ letter: "A", text: "he", correct: true }, { letter: "B", text: "it", correct: false }, { letter: "C", text: "she", correct: false }] } },
    { question: "Are the children running?", answer: "No, they aren’t running.", multipleChoice: { prompt: "No, ___ aren’t running.", options: [{ letter: "A", text: "they", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "we", correct: false }] } },
    { question: "Is your teacher speaking Turkish?", answer: "No, she isn’t speaking Turkish.", multipleChoice: { prompt: "No, she isn’t ___ Turkish.", options: [{ letter: "A", text: "speaking", correct: true }, { letter: "B", text: "listening", correct: false }, { letter: "C", text: "talking", correct: false }] } },
    { question: "Are you wearing a jacket?", answer: "No, I’m not wearing a jacket.", multipleChoice: { prompt: "No, I’m not ___ a jacket.", options: [{ letter: "A", text: "wear", correct: false }, { letter: "B", text: "wore", correct: false }, { letter: "C", text: "wearing", correct: true }] } },
    { question: "Is your cat sleeping?", answer: "No, my cat isn’t sleeping.", multipleChoice: { prompt: "No, my ___ isn’t sleeping.", options: [{ letter: "A", text: "bird", correct: false }, { letter: "B", text: "cat", correct: true }, { letter: "C", text: "dog", correct: false }] } },
    { question: "Are your parents cooking?", answer: "No, they aren’t cooking.", multipleChoice: { prompt: "No, ___ aren’t cooking.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "they", correct: true }, { letter: "C", text: "we", correct: false }] } },
    { question: "Is your sister listening to music?", answer: "No, she isn’t listening to music.", multipleChoice: { prompt: "No, she isn’t ___ to music.", options: [{ letter: "A", text: "listen", correct: false }, { letter: "B", text: "listened", correct: false }, { letter: "C", text: "listening", correct: true }] } },
    { question: "Are you reading now?", answer: "No, I’m not reading now.", multipleChoice: { prompt: "No, I’m not ___ now.", options: [{ letter: "A", text: "reading", correct: true }, { letter: "B", text: "read", correct: false }, { letter: "C", text: "reads", correct: false }] } },
    { question: "Is your friend writing a letter?", answer: "No, he isn’t writing a letter.", multipleChoice: { prompt: "No, ___ isn’t writing a letter.", options: [{ letter: "A", text: "he", correct: true }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "it", correct: false }] } },
    { question: "Are your friends studying English?", answer: "No, they aren’t studying English.", multipleChoice: { prompt: "No, they aren’t ___ English.", options: [{ letter: "A", text: "working", correct: false }, { letter: "B", text: "studying", correct: true }, { letter: "C", text: "reading", correct: false }] } },
    { question: "Is your sister brushing her hair?", answer: "No, she isn’t brushing her hair.", multipleChoice: { prompt: "No, ___ isn’t brushing her hair.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "she", correct: true }, { letter: "C", text: "it", correct: false }] } },
    { question: "Are you eating dinner?", answer: "No, I’m not eating dinner.", multipleChoice: { prompt: "No, I’m not ___ dinner.", options: [{ letter: "A", text: "ate", correct: false }, { letter: "B", text: "eating", correct: true }, { letter: "C", text: "eat", correct: false }] } },
    { question: "Is your dog barking?", answer: "No, it isn’t barking.", multipleChoice: { prompt: "No, ___ isn’t barking.", options: [{ letter: "A", text: "it", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "she", correct: false }] } },
    { question: "Are you drinking coffee?", answer: "No, I’m not drinking coffee.", multipleChoice: { prompt: "No, I’m not ___ coffee.", options: [{ letter: "A", text: "drinking", correct: true }, { letter: "B", text: "drink", correct: false }, { letter: "C", text: "drank", correct: false }] } },
    { question: "Is your sister washing the dishes?", answer: "No, she isn’t washing the dishes.", multipleChoice: { prompt: "No, ___ isn’t washing the dishes.", options: [{ letter: "A", text: "she", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "it", correct: false }] } },
    { question: "Are your parents watching a movie?", answer: "No, they aren’t watching a movie.", multipleChoice: { prompt: "No, ___ aren’t watching a movie.", options: [{ letter: "A", text: "we", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "they", correct: true }] } },
    { question: "Is your friend calling you?", answer: "No, he isn’t calling me.", multipleChoice: { prompt: "No, ___ isn’t calling me.", options: [{ letter: "A", text: "she", correct: false }, { letter: "B", text: "it", correct: false }, { letter: "C", text: "he", correct: true }] } },
    { question: "Are you sitting on the floor?", answer: "No, I’m not sitting on the floor.", multipleChoice: { prompt: "No, I’m not ___ on the floor.", options: [{ letter: "A", text: "sat", correct: false }, { letter: "B", text: "sitting", correct: true }, { letter: "C", text: "sit", correct: false }] } },
    { question: "Is the baby crying?", answer: "No, the baby isn’t crying.", multipleChoice: { prompt: "No, the baby isn’t ___.", options: [{ letter: "A", text: "cry", correct: false }, { letter: "B", text: "cried", correct: false }, { letter: "C", text: "crying", correct: true }] } },
    { question: "Are your classmates laughing?", answer: "No, they aren’t laughing.", multipleChoice: { prompt: "No, ___ aren’t laughing.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "we", correct: false }, { letter: "C", text: "they", correct: true }] } },
    { question: "Is your father fixing the car?", answer: "No, he isn’t fixing the car.", multipleChoice: { prompt: "No, ___ isn’t fixing the car.", options: [{ letter: "A", text: "it", correct: false }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "he", correct: true }] } },
    { question: "Are you talking to your friend?", answer: "No, I’m not talking to my friend.", multipleChoice: { prompt: "No, I’m not ___ to my friend.", options: [{ letter: "A", text: "talk", correct: false }, { letter: "B", text: "talked", correct: false }, { letter: "C", text: "talking", correct: true }] } },
    { question: "Is your mother wearing a dress?", answer: "No, she isn’t wearing a dress.", multipleChoice: { prompt: "No, ___ isn’t wearing a dress.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "it", correct: false }, { letter: "C", text: "she", correct: true }] } },
    { question: "Are your friends cleaning the house?", answer: "No, they aren’t cleaning the house.", multipleChoice: { prompt: "No, ___ aren’t cleaning the house.", options: [{ letter: "A", text: "we", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "they", correct: true }] } },
    { question: "Is your friend waiting for you?", answer: "No, he isn’t waiting for me.", multipleChoice: { prompt: "No, he isn’t ___ for me.", options: [{ letter: "A", text: "wait", correct: false }, { letter: "B", text: "waited", correct: false }, { letter: "C", text: "waiting", correct: true }] } },
    { question: "Are you learning Spanish?", answer: "No, I’m not learning Spanish.", multipleChoice: { prompt: "No, I’m not ___ Spanish.", options: [{ letter: "A", text: "learning", correct: true }, { letter: "B", text: "learn", correct: false }, { letter: "C", text: "learned", correct: false }] } },
    { question: "Is the bird flying?", answer: "No, it isn’t flying.", multipleChoice: { prompt: "No, ___ isn’t flying.", options: [{ letter: "A", text: "it", correct: true }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Are you opening the window?", answer: "No, I’m not opening the window.", multipleChoice: { prompt: "No, I’m not ___ the window.", options: [{ letter: "A", text: "open", correct: false }, { letter: "B", text: "opened", correct: false }, { letter: "C", text: "opening", correct: true }] } },
    { question: "Is your mom making dinner?", answer: "No, she isn’t making dinner.", multipleChoice: { prompt: "No, ___ isn’t making dinner.", options: [{ letter: "A", text: "it", correct: false }, { letter: "B", text: "she", correct: true }, { letter: "C", text: "he", correct: false }] } },
    { question: "Are your brothers playing outside?", answer: "No, they aren’t playing outside.", multipleChoice: { prompt: "No, they aren’t ___ outside.", options: [{ letter: "A", text: "studying", correct: false }, { letter: "B", text: "playing", correct: true }, { letter: "C", text: "working", correct: false }] } },
    { question: "Is your sister going to school now?", answer: "No, she isn’t going to school now.", multipleChoice: { prompt: "No, she isn’t ___ to school now.", options: [{ letter: "A", text: "go", correct: false }, { letter: "B", text: "goes", correct: false }, { letter: "C", text: "going", correct: true }] } },
    { question: "Are you brushing your teeth?", answer: "No, I’m not brushing my teeth.", multipleChoice: { prompt: "No, I’m not ___ my teeth.", options: [{ letter: "A", text: "brushing", correct: true }, { letter: "B", text: "brush", correct: false }, { letter: "C", text: "brushed", correct: false }] } },
    { question: "Is your dad watching TV?", answer: "No, he isn’t watching TV.", multipleChoice: { prompt: "No, ___ isn’t watching TV.", options: [{ letter: "A", text: "he", correct: true }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "it", correct: false }] } },
    { question: "Are you doing your homework?", answer: "No, I’m not doing my homework.", multipleChoice: { prompt: "No, I’m not ___ my homework.", options: [{ letter: "A", text: "do", correct: false }, { letter: "B", text: "did", correct: false }, { letter: "C", text: "doing", correct: true }] } },
    { question: "Is your friend eating a sandwich?", answer: "No, he isn’t eating a sandwich.", multipleChoice: { prompt: "No, ___ isn’t eating a sandwich.", options: [{ letter: "A", text: "she", correct: false }, { letter: "B", text: "he", correct: true }, { letter: "C", text: "it", correct: false }] } },
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
  
  table: {
    title: "📋 Present Continuous: Questions (Asking about NOW)",
    data: [
      { category: "What are Present Continuous Questions?", explanation: "Questions about what is happening RIGHT NOW", turkish: "Şimdiki zamanda soru cümleleri", function: "Ask about current actions or temporary situations", examples: "Are you studying? / Is she working? / What are they doing?", key: "Asking about NOW, not always!" },

      { category: "Structure - Yes/No Questions", form: "AM/IS/ARE + subject + verb-ING?", pattern: "Inversion: BE verb moves to front", rule: "Put BE verb BEFORE the subject", turkish: "Am/Is/Are + özne + fiil-ing?", examples: "Are you working? / Is she cooking? / Are they playing?" },
      { category: "Structure - Yes/No Questions", inversion_explained: "Statement: You are working. | Question: Are you working?", how: "Move the BE verb to the beginning!", remember: "Subject and BE verb switch places!", note: "Main verb still has -ing!" },

      { category: "Yes/No Questions with I", form: "AM I + verb-ing?", examples: "Am I doing it right? / Am I talking too loud? / Am I sitting in your seat?", turkish: "... mı/mi yapıyorum?", note: "Not very common - usually ask about yourself less", usage: "Asking for confirmation or checking" },

      { category: "Yes/No Questions with You", form: "ARE YOU + verb-ing?", examples: "Are you studying? / Are you working? / Are you listening? / Are you coming?", turkish: "... mı/mi yapıyorsun?", note: "Very common in daily conversation!", usage: "Asking what the other person is doing now" },

      { category: "Yes/No Questions with He/She/It", form: "IS HE/SHE/IT + verb-ing?", examples: "Is he sleeping? / Is she cooking? / Is it raining? / Is he coming?", turkish: "... mı/mi yapıyor?", note: "Asking about someone/something else", usage: "Third person singular" },

      { category: "Yes/No Questions with We/They", form: "ARE WE/THEY + verb-ing?", examples: "Are we leaving? / Are they playing? / Are we doing it right? / Are they coming?", turkish: "... mı/mi yapıyoruz/yapıyorlar?", note: "Plural subjects", usage: "Asking about groups" },

      { category: "Short Answers - Positive", with_am: "Am I...? → Yes, you are.", with_are_you: "Are you...? → Yes, I am.", with_is: "Is he/she...? → Yes, he/she is.", with_are_they: "Are they...? → Yes, they are.", pattern: "Yes, + subject + am/is/are.", note: "Don't repeat the verb-ing in short answers!" },

      { category: "Short Answers - Negative", with_am: "Am I...? → No, you aren't. / No, you're not.", with_are_you: "Are you...? → No, I'm not.", with_is: "Is he/she...? → No, he/she isn't. / No, he's/she's not.", with_are_they: "Are they...? → No, they aren't. / No, they're not.", pattern: "No, + subject + am not/isn't/aren't.", note: "Use contractions in speech!" },

      { category: "Wh- Questions", form: "WH-word + AM/IS/ARE + subject + verb-ING?", pattern: "Wh- word at the very beginning", examples: "What are you doing? / Where is she going? / Why are they leaving?", turkish: "Ne yapıyorsun? / Nereye gidiyor? / Neden gidiyorlar?", note: "Most common type of question in Present Continuous!" },

      { category: "Common Wh- Questions", what_doing: "What + be + subject + doing? (most common!)", examples_what: "What are you doing? / What is she doing? / What are they doing?", where: "Where + be + subject + going?", examples_where: "Where are you going? / Where is he going?", why: "Why + be + subject + verb-ing?", examples_why: "Why are you leaving? / Why is she crying?" },

      { category: "More Wh- Questions", who: "Who + be + verb-ing?", examples_who: "Who is coming? / Who is calling? / Who is talking?", when: "When + be + subject + verb-ing?", examples_when: "When are you leaving? / When is he arriving?", how: "How + be + subject + verb-ing?", examples_how: "How are you doing? / How is it going?" },

      { category: "Common Mistakes", mistake: "Forgetting inversion", wrong: "You are studying? ✗ (sounds like statement with rising tone)", correct: "Are you studying? ✓", rule: "Must put BE verb at the beginning!", note: "Without inversion, it's not a proper question" },
      { category: "Common Mistakes", mistake: "Using do/does", wrong: "Do you studying? ✗ / Does she cooking? ✗", correct: "Are you studying? ✓ / Is she cooking? ✓", rule: "Present Continuous uses BE verb, NOT do/does!", remember: "BE verb + subject + verb-ing?" },
      { category: "Common Mistakes", mistake: "Forgetting -ing", wrong: "Are you study? ✗ / Is she cook? ✗", correct: "Are you studying? ✓ / Is she cooking? ✓", rule: "Main verb still needs -ing in questions!", remember: "Question doesn't remove -ing!" },

      { category: "Intonation", yes_no_questions: "Voice goes UP ↗ at the end", examples_yes_no: "Are you working? ↗ / Is she coming? ↗", wh_questions: "Voice goes DOWN ↘ at the end", examples_wh: "What are you doing? ↘ / Where is he going? ↘", tip: "Yes/No ↗ | Wh- ↘", remember: "Intonation helps show it's a question!" },

      { category: "Real-World Examples", checking: "Are you listening? / Are you okay? / Is everything working?", location: "Where are you going? / Where is he sitting? / Where are they staying?", activity: "What are you doing? / What is she watching? / What are they playing?", time_plans: "When are you leaving? / When is he arriving? / When are they coming?" },

      { category: "Common Daily Questions", right_now: "What are you doing? (most common!) / Are you busy? / Are you working?", location: "Where are you going? / Where are you? / Are you coming?", attention: "Are you listening? / Are you watching? / Are you paying attention?", status: "How are you doing? / Is everything going well? / Are things working out?" },

      { category: "Answering Wh- Questions", what_doing: "What are you doing? → I'm studying English.", where_going: "Where are you going? → I'm going to the store.", why: "Why are you leaving? → I'm leaving because it's late.", full_sentence: "Answer with full sentence using Present Continuous!", pattern: "Subject + am/is/are + verb-ing..." },

      { category: "Contrast: Statement → Question → Negative", statement: "You are working.", question: "Are you working?", negative: "You aren't working.", statement_she: "She is cooking.", question_she: "Is she cooking?", negative_she: "She isn't cooking.", key: "Three forms - all use same BE verb and verb-ing!" },

      { category: "Key Takeaway", summary: "Present Continuous Questions = Asking about NOW", yes_no_form: "AM/IS/ARE + subject + verb-ING?", wh_form: "WH-word + AM/IS/ARE + subject + verb-ING?", inversion: "BE verb moves to the front (before subject)", short_answers: "Yes, I am / No, I'm not | Yes, she is / No, she isn't", remember: "Don't use do/does! | Main verb keeps -ing! | Invert BE and subject!", common: "What are you doing? (most common question!)", next: "Practice makes perfect!" }
    ]
  },
  
  speakingPractice: [
    { question: "Are you studying now?", answer: "Yes, I am.", multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: true }] } },
    { question: "Is your mother cooking dinner?", answer: "Yes, she is.", multipleChoice: { prompt: "Yes, she ___.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are your friends playing football?", answer: "No, they aren’t.", multipleChoice: { prompt: "No, ___ aren’t.", options: [{ letter: "A", text: "we", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "they", correct: true }] } },
    { question: "Is your brother sleeping?", answer: "Yes, he is.", multipleChoice: { prompt: "Yes, he ___.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are you watching TV?", answer: "No, I’m not.", openResponse: true },
    { question: "Is your mother cleaning the house?", answer: "Yes, she is.", multipleChoice: { prompt: "Yes, she ___.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are your friends listening to music?", answer: "Yes, they are.", multipleChoice: { prompt: "Yes, they ___.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is your brother reading a book?", answer: "No, he isn’t.", multipleChoice: { prompt: "No, ___ isn’t.", options: [{ letter: "A", text: "he", correct: true }, { letter: "B", text: "it", correct: false }, { letter: "C", text: "she", correct: false }] } },
    { question: "Are the children drawing?", answer: "Yes, they are.", multipleChoice: { prompt: "Yes, they ___.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is the dog barking?", answer: "Yes, it is.", multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are you eating lunch?", answer: "Yes, I am.", multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is your teacher talking to you?", answer: "Yes, she is.", multipleChoice: { prompt: "Yes, she ___.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are the students writing?", answer: "Yes, they are.", multipleChoice: { prompt: "Yes, they ___.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is your sister doing her homework?", answer: "Yes, she is.", multipleChoice: { prompt: "Yes, she ___.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Are you using your phone?", answer: "Yes, I am.", multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "am", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Is your father wearing a hat?", answer: "No, he isn’t.", multipleChoice: { prompt: "No, ___ isn’t.", options: [{ letter: "A", text: "she", correct: false }, { letter: "B", text: "he", correct: true }, { letter: "C", text: "it", correct: false }] } },
    { question: "Are you drinking coffee?", answer: "No, I’m not.", openResponse: true },
    { question: "Is your sister watching a movie?", answer: "Yes, she is.", multipleChoice: { prompt: "Yes, she ___.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Are your parents working?", answer: "Yes, they are.", multipleChoice: { prompt: "Yes, they ___.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is the baby crying?", answer: "No, the baby is sleeping.", multipleChoice: { prompt: "No, the baby ___ sleeping.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "What are you doing?", answer: "I’m learning English.", multipleChoice: { prompt: "I’m ___ English.", options: [{ letter: "A", text: "learn", correct: false }, { letter: "B", text: "learned", correct: false }, { letter: "C", text: "learning", correct: true }] } },
    { question: "What is your sister doing?", answer: "She is brushing her hair.", multipleChoice: { prompt: "She ___ brushing her hair.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What are your friends doing?", answer: "They are playing a game.", multipleChoice: { prompt: "They ___ playing a game.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "What is your dad doing?", answer: "He is fixing the car.", multipleChoice: { prompt: "He ___ fixing the car.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What is your friend doing?", answer: "He is walking to school.", multipleChoice: { prompt: "He ___ walking to school.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What are you wearing?", answer: "I’m wearing a white shirt.", multipleChoice: { prompt: "I’m ___ a white shirt.", options: [{ letter: "A", text: "wore", correct: false }, { letter: "B", text: "wearing", correct: true }, { letter: "C", text: "wear", correct: false }] } },
    { question: "What is the teacher doing?", answer: "She is asking questions.", multipleChoice: { prompt: "She ___ asking questions.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What are the boys doing?", answer: "They are playing basketball.", multipleChoice: { prompt: "They ___ playing basketball.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "What is your sister doing?", answer: "She is reading a magazine.", multipleChoice: { prompt: "She ___ reading a magazine.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What are you eating?", answer: "I’m eating a banana.", multipleChoice: { prompt: "I’m ___ a banana.", options: [{ letter: "A", text: "eat", correct: false }, { letter: "B", text: "ate", correct: false }, { letter: "C", text: "eating", correct: true }] } },
    { question: "What is your cat doing?", answer: "It is sleeping on the sofa.", multipleChoice: { prompt: "It ___ sleeping on the sofa.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What are you drinking?", answer: "I’m drinking orange juice.", multipleChoice: { prompt: "I’m ___ orange juice.", options: [{ letter: "A", text: "drank", correct: false }, { letter: "B", text: "drinking", correct: true }, { letter: "C", text: "drink", correct: false }] } },
    { question: "What is your brother doing?", answer: "He is talking on the phone.", multipleChoice: { prompt: "He ___ talking on the phone.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "What are you thinking about?", answer: "I’m thinking about my weekend.", multipleChoice: { prompt: "I’m thinking ___ my weekend.", options: [{ letter: "A", text: "on", correct: false }, { letter: "B", text: "about", correct: true }, { letter: "C", text: "of", correct: false }] } },
    { question: "What is the dog doing?", answer: "It is running in the garden.", multipleChoice: { prompt: "It ___ running in the garden.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "What are the children watching?", answer: "They are watching cartoons.", multipleChoice: { prompt: "They ___ watching cartoons.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What is your friend wearing?", answer: "She is wearing a red dress.", multipleChoice: { prompt: "She ___ wearing a red dress.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What are you doing this evening?", answer: "I’m going out with my friends.", multipleChoice: { prompt: "I’m going ___ with my friends.", options: [{ letter: "A", text: "out", correct: true }, { letter: "B", text: "in", correct: false }, { letter: "C", text: "up", correct: false }] } },
    { question: "What are your classmates doing?", answer: "They are studying for the test.", multipleChoice: { prompt: "They ___ studying for the test.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "What is your mom making?", answer: "She is making a cake.", multipleChoice: { prompt: "She ___ making a cake.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
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
  
  table: {
    title: "📋 Present Simple vs Present Continuous (When to use each)",
    data: [
      { category: "The Big Difference", present_simple: "Habits, routines, permanent facts", present_continuous: "Actions happening NOW, temporary situations", key: "ALWAYS/REGULARLY vs NOW/TEMPORARY", simple: "I work every day. (habit)", continuous: "I'm working now. (at this moment)", remember: "Simple = general | Continuous = specific moment" },

      { category: "Present Simple - WHEN to use", use_1: "Habits and routines (things you do regularly)", examples_1: "I go to work every day. / She drinks coffee every morning. / They play football on Sundays.", keywords_1: "every day/week, always, usually, often, sometimes, never", turkish_1: "Alışkanlıklar ve rutinler" },
      { category: "Present Simple - WHEN to use", use_2: "Permanent situations and facts", examples_2: "I live in Istanbul. / She works in a bank. / They speak English.", keywords_2: "Permanent, long-term, unchanging", turkish_2: "Kalıcı durumlar ve gerçekler" },
      { category: "Present Simple - WHEN to use", use_3: "General truths and scientific facts", examples_3: "The sun rises in the east. / Water boils at 100°C. / Birds fly.", keywords_3: "Always true, universal facts", turkish_3: "Genel doğrular" },

      { category: "Present Continuous - WHEN to use", use_1: "Actions happening RIGHT NOW at this moment", examples_1: "I'm eating lunch now. / She's talking on the phone. / Look! It's raining!", keywords_1: "now, right now, at the moment, currently, Look!, Listen!", turkish_1: "Şu anda olan eylemler" },
      { category: "Present Continuous - WHEN to use", use_2: "Temporary situations (will change soon)", examples_2: "I'm staying with my friend this week. / He's working at a café this month. / They're living in London temporarily.", keywords_2: "this week/month/year, temporarily, for now", turkish_2: "Geçici durumlar" },
      { category: "Present Continuous - WHEN to use", use_3: "Changes and trends happening around now", examples_3: "The weather is getting colder. / My English is improving. / Prices are rising.", keywords_3: "Getting, becoming, changing, improving", turkish_3: "Değişen durumlar" },

      { category: "Structure Comparison", simple_positive: "Subject + verb (+s for he/she/it)", simple_examples: "I work / She works / They work", continuous_positive: "Subject + am/is/are + verb-ing", continuous_examples: "I'm working / She's working / They're working", key: "Simple = base verb | Continuous = BE + verb-ing" },

      { category: "Time Expressions - Simple", frequency: "always, usually, often, sometimes, rarely, never", time_periods: "every day/week/month/year", days: "on Mondays, on weekends", examples: "I always wake up at 7. / She usually drinks tea. / They play football on Sundays.", pattern: "Regular, repeated time expressions" },

      { category: "Time Expressions - Continuous", right_now: "now, right now, at the moment, at present, currently", temporary: "today, this week, this month, this year", attention: "Look! Listen! (drawing attention)", examples: "I'm working now. / She's staying here this week. / Look! They're coming!", pattern: "Specific time, current moment" },

      { category: "Common Contrasts", habit_vs_now: "I drink coffee (habit, always) ↔ I'm drinking coffee (right now, this moment)", permanent_vs_temp: "I live in Istanbul (permanent) ↔ I'm living in a hotel (temporary)", general_vs_specific: "She works at a bank (job, permanent) ↔ She's working on a project (current task)", always_vs_now: "They play football (regularly) ↔ They're playing football (at this moment)" },

      { category: "Keywords that Signal Simple", words: "always, usually, often, sometimes, rarely, never, every, on Mondays, generally, normally, typically", sentence: "I usually eat breakfast at 8. → Simple!", rule: "Frequency words = Simple", turkish: "Sıklık zarfları genellikle Present Simple ile kullanılır" },

      { category: "Keywords that Signal Continuous", words: "now, right now, at the moment, currently, at present, today, this week/month, Look!, Listen!", sentence: "I'm eating breakfast now. → Continuous!", rule: "Time words for 'now' = Continuous", turkish: "Şimdi belirten kelimeler genellikle Present Continuous ile kullanılır" },

      { category: "Both in One Conversation!", example_1: "A: What do you do? (job/general) | B: I work in IT. (Present Simple)", example_2: "A: What are you doing? (right now) | B: I'm working on a report. (Present Continuous)", difference: "'What do you do?' = job/profession | 'What are you doing?' = current activity", note: "Same words, different meanings!" },

      { category: "Stative Verbs (Usually Simple)", explanation: "Some verbs rarely use Continuous - they describe states, not actions", verbs: "know, understand, believe, like, love, hate, want, need, have (possession), be", wrong: "I'm knowing ✗ / She's wanting ✗ / They're having a car ✗", correct: "I know ✓ / She wants ✓ / They have a car ✓", note: "These verbs describe states that don't happen 'right now' - they just ARE!" },

      { category: "Stative Verbs - Exceptions", have_action: "'Have' for actions CAN be continuous!", examples_action: "I'm having lunch. ✓ / She's having a shower. ✓ / We're having fun. ✓", have_possession: "'Have' for possession is ALWAYS simple!", examples_possession: "I have a car. ✓ (NOT I'm having a car ✗)", rule: "Action = Continuous possible | Possession/state = Simple only" },

      { category: "Common Mistakes", mistake: "Using Continuous for habits", wrong: "I'm going to work every day. ✗", correct: "I go to work every day. ✓", rule: "'Every day' = habit = Simple!", remember: "Regular habits = Simple" },
      { category: "Common Mistakes", mistake: "Using Simple for NOW", wrong: "I study now. ✗", correct: "I'm studying now. ✓", rule: "'Now' = happening at this moment = Continuous!", remember: "Right now = Continuous" },
      { category: "Common Mistakes", mistake: "Continuous with stative verbs", wrong: "I'm knowing the answer. ✗ / She's wanting coffee. ✗", correct: "I know the answer. ✓ / She wants coffee. ✓", rule: "Stative verbs (know, want, like, etc.) use Simple!", remember: "States = Simple, not Continuous" },

      { category: "Questions Comparison", simple_question: "Do you work? / Does she study? / What do they do?", simple_meaning: "General, habits, always", continuous_question: "Are you working? / Is she studying? / What are they doing?", continuous_meaning: "Right now, at this moment", key_difference: "Do/Does = general | Am/Is/Are = now" },

      { category: "Real-World Scenarios", scenario_1: "Phone call: 'What are you doing?' → 'I'm watching TV.' (now, Continuous)", scenario_2: "Job interview: 'What do you do?' → 'I work in IT.' (job, Simple)", scenario_3: "Daily routine: 'I wake up at 7, eat breakfast, and go to work.' (habits, Simple)", scenario_4: "Current situation: 'I'm working from home this week.' (temporary, Continuous)" },

      { category: "Key Takeaway", summary: "Present Simple vs Present Continuous - Choose based on WHEN", simple: "Present Simple = Habits, routines, facts, permanent, ALWAYS/REGULARLY", continuous: "Present Continuous = NOW, at this moment, temporary, CURRENTLY", simple_keywords: "always, usually, every day, on Mondays → Simple", continuous_keywords: "now, right now, this week, Look! → Continuous", rule: "REGULAR/ALWAYS → Simple | NOW/TEMPORARY → Continuous", remember: "Different time, different tense!", next: "Practice choosing the right tense!" }
    ]
  },
  
  speakingPractice: [
    { question: "Do you go to school every day?", answer: "Yes, I go to school every day.", multipleChoice: { prompt: "Yes, I ___ to school every day.", options: [{ letter: "A", text: "goed", correct: false }, { letter: "B", text: "goes", correct: false }, { letter: "C", text: "go", correct: true }] } },
    { question: "Are you going to school right now?", answer: "No, I’m at home now.", openResponse: true },
    { question: "Does your sister play the piano?", answer: "Yes, she plays the piano.", multipleChoice: { prompt: "Yes, she ___ the piano.", options: [{ letter: "A", text: "play", correct: false }, { letter: "B", text: "playing", correct: false }, { letter: "C", text: "plays", correct: true }] } },
    { question: "Is she playing the piano now?", answer: "Yes, she is playing the piano.", multipleChoice: { prompt: "Yes, she ___ playing the piano.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Do your parents eat lunch at 12?", answer: "Yes, they eat lunch at 12.", multipleChoice: { prompt: "Yes, they ___ lunch at 12.", options: [{ letter: "A", text: "eating", correct: false }, { letter: "B", text: "eat", correct: true }, { letter: "C", text: "eats", correct: false }] } },
    { question: "Are they eating lunch now?", answer: "No, they are working.", multipleChoice: { prompt: "No, they ___ working.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Does your brother work on weekends?", answer: "No, he doesn’t work on weekends.", multipleChoice: { prompt: "No, he ___ on weekends.", options: [{ letter: "A", text: "doesn’t work", correct: true }, { letter: "B", text: "don’t work", correct: false }, { letter: "C", text: "isn’t working", correct: false }] } },
    { question: "Is he working now?", answer: "Yes, he is working in his office.", multipleChoice: { prompt: "Yes, he ___ working in his office.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Do you watch TV in the evenings?", answer: "Yes, I usually watch TV after dinner.", multipleChoice: { prompt: "Yes, ___ usually watch TV after dinner.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "Are you watching TV now?", answer: "No, I’m studying.", multipleChoice: { prompt: "No, I’m ___.", options: [{ letter: "A", text: "studying", correct: true }, { letter: "B", text: "study", correct: false }, { letter: "C", text: "studies", correct: false }] } },
    { question: "Does your mom cook dinner every day?", answer: "Yes, she cooks every evening.", multipleChoice: { prompt: "Yes, ___ cooks every evening.", options: [{ letter: "A", text: "it", correct: false }, { letter: "B", text: "she", correct: true }, { letter: "C", text: "he", correct: false }] } },
    { question: "Is your mom cooking dinner now?", answer: "Yes, she is in the kitchen.", multipleChoice: { prompt: "Yes, she ___ in the kitchen.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Do you study English?", answer: "Yes, I study English three times a week.", multipleChoice: { prompt: "Yes, I ___ English three times a week.", options: [{ letter: "A", text: "study", correct: true }, { letter: "B", text: "studies", correct: false }, { letter: "C", text: "studyed", correct: false }] } },
    { question: "Are you studying English now?", answer: "Yes, I am studying it right now.", multipleChoice: { prompt: "Yes, I ___ studying it right now.", options: [{ letter: "A", text: "am", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Does it rain a lot in winter?", answer: "Yes, it rains a lot in winter.", multipleChoice: { prompt: "Yes, it ___ a lot in winter.", options: [{ letter: "A", text: "rain", correct: false }, { letter: "B", text: "raining", correct: false }, { letter: "C", text: "rains", correct: true }] } },
    { question: "Is it raining now?", answer: "No, it’s sunny.", multipleChoice: { prompt: "No, ___ sunny.", options: [{ letter: "A", text: "it’", correct: false }, { letter: "B", text: "it’s", correct: true }, { letter: "C", text: "it’ing", correct: false }] } },
    { question: "Do you wear glasses?", answer: "Yes, I wear glasses.", multipleChoice: { prompt: "Yes, ___ wear glasses.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "he", correct: false }] } },
    { question: "Are you wearing your glasses now?", answer: "Yes, I am.", multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "am", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Do your friends play football on weekends?", answer: "Yes, they always play on Sundays.", multipleChoice: { prompt: "Yes, they always ___ on Sundays.", options: [{ letter: "A", text: "play", correct: true }, { letter: "B", text: "plays", correct: false }, { letter: "C", text: "playing", correct: false }] } },
    { question: "Are they playing football now?", answer: "Yes, they are at the park.", multipleChoice: { prompt: "Yes, they ___ at the park.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Do you take the bus to work?", answer: "Yes, I take the bus every morning.", multipleChoice: { prompt: "Yes, I ___ the bus every morning.", options: [{ letter: "A", text: "takes", correct: false }, { letter: "B", text: "get", correct: false }, { letter: "C", text: "take", correct: true }] } },
    { question: "Are you taking the bus now?", answer: "No, I’m walking.", multipleChoice: { prompt: "No, I’m ___.", options: [{ letter: "A", text: "walking", correct: true }, { letter: "B", text: "walk", correct: false }, { letter: "C", text: "walks", correct: false }] } },
    { question: "Does your sister clean her room every week?", answer: "Yes, she cleans it every Saturday.", multipleChoice: { prompt: "Yes, ___ cleans it every Saturday.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "it", correct: false }, { letter: "C", text: "she", correct: true }] } },
    { question: "Is your sister cleaning her room now?", answer: "Yes, she is cleaning it now.", multipleChoice: { prompt: "Yes, she ___ cleaning it now.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Do you read books?", answer: "Yes, I read books every night.", multipleChoice: { prompt: "Yes, ___ read books every night.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Are you reading a book now?", answer: "Yes, I’m reading a novel.", multipleChoice: { prompt: "Yes, I’m ___ a novel.", options: [{ letter: "A", text: "reads", correct: false }, { letter: "B", text: "reading", correct: true }, { letter: "C", text: "read", correct: false }] } },
    { question: "Do you drink tea in the morning?", answer: "Yes, I usually drink tea.", multipleChoice: { prompt: "Yes, ___ usually drink tea.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Are you drinking tea now?", answer: "No, I’m drinking coffee.", multipleChoice: { prompt: "No, I’m ___ coffee.", options: [{ letter: "A", text: "drinking", correct: true }, { letter: "B", text: "drink", correct: false }, { letter: "C", text: "drinks", correct: false }] } },
    { question: "Do your parents work in a hospital?", answer: "Yes, they work as doctors.", multipleChoice: { prompt: "Yes, they ___ as doctors.", options: [{ letter: "A", text: "works", correct: false }, { letter: "B", text: "worked", correct: false }, { letter: "C", text: "work", correct: true }] } },
    { question: "Are your parents working now?", answer: "Yes, they are at the hospital.", multipleChoice: { prompt: "Yes, they ___ at the hospital.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Do you listen to music often?", answer: "Yes, I listen every day.", multipleChoice: { prompt: "Yes, ___ listen every day.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Are you listening to music now?", answer: "No, I’m not.", openResponse: true },
    { question: "Does your sister go to the gym?", answer: "Yes, she goes three times a week.", multipleChoice: { prompt: "Yes, she ___ three times a week.", options: [{ letter: "A", text: "go", correct: false }, { letter: "B", text: "going", correct: false }, { letter: "C", text: "goes", correct: true }] } },
    { question: "Is she going to the gym now?", answer: "Yes, she is on her way.", multipleChoice: { prompt: "Yes, she ___ on her way.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Do you do your homework in the evening?", answer: "Yes, I usually do it after dinner.", multipleChoice: { prompt: "Yes, I usually ___ it after dinner.", options: [{ letter: "A", text: "did", correct: false }, { letter: "B", text: "do", correct: true }, { letter: "C", text: "does", correct: false }] } },
    { question: "Are you doing your homework now?", answer: "Yes, I’m doing it.", multipleChoice: { prompt: "Yes, I’m ___ it.", options: [{ letter: "A", text: "do", correct: false }, { letter: "B", text: "does", correct: false }, { letter: "C", text: "doing", correct: true }] } },
    { question: "Does your dad drive to work?", answer: "Yes, he drives every day.", multipleChoice: { prompt: "Yes, ___ drives every day.", options: [{ letter: "A", text: "he", correct: true }, { letter: "B", text: "it", correct: false }, { letter: "C", text: "she", correct: false }] } },
    { question: "Is your dad driving now?", answer: "Yes, he is on the road.", multipleChoice: { prompt: "Yes, he ___ on the road.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Do your brother and sister clean the house on Saturdays?", answer: "Yes, they always do.", multipleChoice: { prompt: "Yes, they always ___.", options: [{ letter: "A", text: "does", correct: false }, { letter: "B", text: "do", correct: true }, { letter: "C", text: "did", correct: false }] } },
    { question: "Are they cleaning the house now?", answer: "Yes, they are cleaning now.", multipleChoice: { prompt: "Yes, they ___ cleaning now.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
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

  table: {
    title: "📋 Preference Verbs + Gerund (-ing) - Expressing Likes & Dislikes",
    data: [
      { category: "What are Preference Verbs?", explanation: "Verbs that express how you feel about activities", turkish: "Tercih fiilleri", function: "Say what you like, love, or hate doing", examples: "I like swimming. / She loves dancing. / They hate waiting.", note: "These verbs show your feelings about activities!" },
      { category: "The Preference Scale", love_it: "Love (en çok sevmek) - Strongest positive feeling", like_it: "Like (sevmek, hoşlanmak) - Positive feeling", dont_mind: "Don't mind (aldırmamak) - Neutral", dont_like: "Don't like (sevmemek) - Negative feeling", hate_it: "Hate (nefret etmek) - Strongest negative feeling", note: "From most positive to most negative" },

      { category: "Structure", form: "Subject + like/love/hate/enjoy/prefer + VERB-ING", pattern: "Preference verb + gerund (-ing form)", rule: "After these verbs, ALWAYS use -ing form", turkish: "Özne + tercih fiili + fiil-ing", examples: "I like reading. / She loves cooking. / We hate cleaning. / They enjoy swimming." },
      { category: "All Preference Verbs", verb_1: "Like (sevmek, hoşlanmak)", example_1: "I like playing football.", verb_2: "Love (çok sevmek)", example_2: "She loves watching movies.", verb_3: "Hate (nefret etmek)", example_3: "He hates doing homework.", verb_4: "Enjoy (keyif almak, hoşlanmak)", example_4: "We enjoy listening to music.", verb_5: "Prefer (tercih etmek)", example_5: "They prefer walking to running." },

      { category: "LIKE Structure", positive: "Subject + like + verb-ing", example_positive: "I like eating pizza. / You like playing games.", negative: "Subject + don't/doesn't + like + verb-ing", example_negative: "I don't like waking up early. / She doesn't like cleaning.", question: "Do/Does + subject + like + verb-ing?", example_question: "Do you like swimming? / Does he like reading?" },
      { category: "LOVE Structure", positive: "Subject + love + verb-ing", example_positive: "I love traveling. / She loves cooking.", negative: "Subject + don't/doesn't + love + verb-ing", example_negative: "I don't love exercising. / He doesn't love studying.", note: "'Don't love' is weaker than 'hate'", turkish: "Çok sevmemek ≠ nefret etmek", remember: "You can say 'I don't like' but 'I don't love' is less common" },
      { category: "HATE Structure", positive: "Subject + hate + verb-ing", example_positive: "I hate waiting. / They hate doing dishes.", negative: "Subject + don't/doesn't + hate + verb-ing", example_negative: "I don't hate it. / She doesn't hate cleaning.", question: "Do/Does + subject + hate + verb-ing?", example_question: "Do you hate studying? / Does she hate running?", note: "Strong negative feeling!" },

      { category: "How to Add -ING (Review)", rule_1: "Most verbs: add -ing", examples_1: "play → playing, read → reading, cook → cooking, eat → eating", rule_2: "Verbs ending in -e: drop e, add -ing", examples_2: "dance → dancing, write → writing, make → making, have → having", rule_3: "Short verbs (CVC): double last consonant + -ing", examples_3: "run → running, swim → swimming, shop → shopping, stop → stopping" },

      { category: "Common Activities to Talk About", hobbies: "reading, writing, drawing, painting, singing, dancing", sports: "swimming, running, playing football, cycling, hiking, skiing", daily_tasks: "cooking, cleaning, washing dishes, doing homework, studying", entertainment: "watching TV, listening to music, playing games, going to the cinema", other: "traveling, shopping, eating out, talking on the phone, sleeping" },

      { category: "Using ENJOY", structure: "Subject + enjoy + verb-ing", examples: "I enjoy reading books. / She enjoys cooking. / They enjoy playing tennis.", turkish: "Keyif almak, hoşlanmak", note: "ENJOY is always followed by -ing (no 'to'!)", wrong: "I enjoy to read ✗", correct: "I enjoy reading ✓", difference: "Enjoy = get pleasure from doing something" },
      { category: "Using PREFER", structure: "Subject + prefer + verb-ing + to + verb-ing", examples: "I prefer walking to running. / She prefers tea to coffee. / They prefer staying home to going out.", turkish: "Tercih etmek", meaning: "Like one thing MORE than another thing", pattern: "prefer A to B (A'yı B'ye tercih etmek)", note: "Shows comparison between two options" },

      { category: "Subject-Verb Agreement", rule: "Remember: He/She/It needs -s on the preference verb!", correct_examples: "I like / You like / We like / They like", correct_he_she_it: "He likes / She likes / It likes (add -s!)", wrong: "He like swimming ✗ / She love dancing ✗", correct: "He likes swimming ✓ / She loves dancing ✓", remember: "-s on preference verb for he/she/it, but gerund stays the same!" },

      { category: "Negative Forms", dont_like: "I don't like waking up early.", doesnt_like: "She doesn't like doing homework.", dont_love: "We don't love cleaning. (= We don't really like it)", dont_hate: "He doesn't hate it. (= It's not so bad)", pattern: "don't/doesn't + preference verb + verb-ing", note: "The -ing form never changes in negatives!" },

      { category: "Question Forms", do_question: "Do you like reading?", does_question: "Does she love cooking?", what_question: "What do you like doing? → I like playing football.", who_question: "Who likes swimming? → My brother likes swimming.", pattern: "Do/Does + subject + preference verb + verb-ing?", remember: "Invert do/does in questions!" },

      { category: "Common Mistakes", mistake_1: "Using 'to' instead of -ing", wrong_1: "I like to read ✗ (simple form can work but -ing is more natural for general preferences)", correct_1: "I like reading ✓", note_1: "In American English 'like to do' is acceptable, but 'like doing' is universal", better: "Like doing = general preference | Like to do = specific occasion" },
      { category: "Common Mistakes", mistake_2: "Forgetting -s for he/she/it", wrong_2: "He like playing ✗ / She love dancing ✗", correct_2: "He likes playing ✓ / She loves dancing ✓", rule: "Add -s to the preference verb, not to the gerund!", remember: "likes playing (NOT like playing)" },
      { category: "Common Mistakes", mistake_3: "Using wrong -ing form", wrong_3: "I like swimeing ✗ / She loves runing ✗", correct_3: "I like swimming ✓ / She loves running ✓", rule: "Follow the -ing rules correctly!", review: "swim → swimming (double m) / run → running (double n)" },

      { category: "Expressing Intensity", very_strong: "I absolutely love playing football! (çok çok seviyorum)", strong: "I really like reading. (gerçekten seviyorum)", moderate: "I quite like cooking. (oldukça seviyorum)", weak: "I don't mind cleaning. (aldırmıyorum, fena değil)", negative: "I really don't like waiting. (gerçekten sevmiyorum)", very_negative: "I absolutely hate waking up early! (çok nefret ediyorum)" },

      { category: "Real-World Uses", introduce_yourself: "I like traveling and meeting new people.", talk_about_hobbies: "I love playing the guitar. I enjoy reading books.", daily_conversations: "What do you like doing in your free time? → I like watching movies.", express_dislikes: "I hate doing housework, but I don't mind cooking.", job_interviews: "I enjoy working with people and solving problems." },

      { category: "Key Takeaway", summary: "Preference verbs + verb-ING express likes and dislikes", structure: "like/love/hate/enjoy/prefer + VERB-ING", scale: "Love (strongest +) > Like > Don't mind > Don't like > Hate (strongest -)", rule_1: "Always -ing after these verbs (gerund)", rule_2: "Add -s for he/she/it on preference verb", common_verbs: "like, love, hate, enjoy, prefer", remember: "The -ing form shows activities you have feelings about!", next: "Practice talking about your hobbies and preferences!" }
    ]
  },
  
  speakingPractice: [
    { question: "Do you like reading books?", answer: "Yes, I like reading books.", multipleChoice: { prompt: "Yes, I ___ reading books.", options: [{ letter: "A", text: "likeed", correct: false }, { letter: "B", text: "likes", correct: false }, { letter: "C", text: "like", correct: true }] } },
    { question: "Do you love watching movies?", answer: "Yes, I love watching movies.", multipleChoice: { prompt: "Yes, ___ love watching movies.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Do you hate cleaning your room?", answer: "Yes, I hate cleaning my room.", multipleChoice: { prompt: "Yes, ___ hate cleaning my room.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Does your sister like playing the piano?", answer: "Yes, she likes playing the piano.", multipleChoice: { prompt: "Yes, she likes ___ the piano.", options: [{ letter: "A", text: "playing", correct: true }, { letter: "B", text: "play", correct: false }, { letter: "C", text: "played", correct: false }] } },
    { question: "Does your brother love swimming?", answer: "Yes, he loves swimming.", multipleChoice: { prompt: "Yes, ___ loves swimming.", options: [{ letter: "A", text: "it", correct: false }, { letter: "B", text: "he", correct: true }, { letter: "C", text: "she", correct: false }] } },
    { question: "Do students hate studying?", answer: "No, they don’t hate studying.", multipleChoice: { prompt: "No, they don’t hate ___.", options: [{ letter: "A", text: "study", correct: false }, { letter: "B", text: "studied", correct: false }, { letter: "C", text: "studying", correct: true }] } },
    { question: "Do you like cooking?", answer: "Yes, I like cooking.", multipleChoice: { prompt: "Yes, I ___ cooking.", options: [{ letter: "A", text: "like", correct: true }, { letter: "B", text: "likeed", correct: false }, { letter: "C", text: "likes", correct: false }] } },
    { question: "Do you love dancing?", answer: "No, I don’t love dancing.", multipleChoice: { prompt: "No, ___ don’t love dancing.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Do you hate doing homework?", answer: "Yes, I hate doing homework.", multipleChoice: { prompt: "Yes, ___ hate doing homework.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "Does your father like driving?", answer: "Yes, he likes driving.", multipleChoice: { prompt: "Yes, he likes ___.", options: [{ letter: "A", text: "driving", correct: true }, { letter: "B", text: "drive", correct: false }, { letter: "C", text: "drove", correct: false }] } },
    { question: "Does your friend love singing?", answer: "Yes, she loves singing.", multipleChoice: { prompt: "Yes, ___ loves singing.", options: [{ letter: "A", text: "it", correct: false }, { letter: "B", text: "she", correct: true }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do you like traveling?", answer: "Yes, I like traveling.", multipleChoice: { prompt: "Yes, I ___ traveling.", options: [{ letter: "A", text: "like", correct: true }, { letter: "B", text: "likeed", correct: false }, { letter: "C", text: "likes", correct: false }] } },
    { question: "Do boys love playing football?", answer: "Yes, they love playing football.", multipleChoice: { prompt: "Yes, they love ___ football.", options: [{ letter: "A", text: "playing", correct: true }, { letter: "B", text: "working", correct: false }, { letter: "C", text: "studying", correct: false }] } },
    { question: "Do you hate waiting in line?", answer: "Yes, I hate waiting in line.", multipleChoice: { prompt: "Yes, I hate ___ in line.", options: [{ letter: "A", text: "waited", correct: false }, { letter: "B", text: "waiting", correct: true }, { letter: "C", text: "wait", correct: false }] } },
    { question: "Does your sister like painting?", answer: "Yes, she likes painting.", multipleChoice: { prompt: "Yes, she likes ___.", options: [{ letter: "A", text: "paint", correct: false }, { letter: "B", text: "painted", correct: false }, { letter: "C", text: "painting", correct: true }] } },
    { question: "Does your brother love watching TV?", answer: "Yes, he loves watching TV.", multipleChoice: { prompt: "Yes, ___ loves watching TV.", options: [{ letter: "A", text: "she", correct: false }, { letter: "B", text: "he", correct: true }, { letter: "C", text: "it", correct: false }] } },
    { question: "Do you like learning English?", answer: "Yes, I like learning English.", multipleChoice: { prompt: "Yes, I ___ learning English.", options: [{ letter: "A", text: "likes", correct: false }, { letter: "B", text: "like", correct: true }, { letter: "C", text: "likeed", correct: false }] } },
    { question: "Do your friends like going to the cinema?", answer: "Yes, they like going to the cinema.", multipleChoice: { prompt: "Yes, they ___ going to the cinema.", options: [{ letter: "A", text: "like", correct: true }, { letter: "B", text: "likes", correct: false }, { letter: "C", text: "likeed", correct: false }] } },
    { question: "Does your mom love gardening?", answer: "Yes, she loves gardening.", multipleChoice: { prompt: "Yes, ___ loves gardening.", options: [{ letter: "A", text: "she", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "it", correct: false }] } },
    { question: "Do you hate waking up early?", answer: "Yes, I hate waking up early.", multipleChoice: { prompt: "Yes, ___ hate waking up early.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do you like listening to music?", answer: "Yes, I like listening to music.", multipleChoice: { prompt: "Yes, I ___ listening to music.", options: [{ letter: "A", text: "likes", correct: false }, { letter: "B", text: "likeed", correct: false }, { letter: "C", text: "like", correct: true }] } },
    { question: "Do you love playing games?", answer: "Yes, I love playing games.", multipleChoice: { prompt: "Yes, I love ___ games.", options: [{ letter: "A", text: "working", correct: false }, { letter: "B", text: "studying", correct: false }, { letter: "C", text: "playing", correct: true }] } },
    { question: "Does your teacher like teaching English?", answer: "Yes, she likes teaching English.", multipleChoice: { prompt: "Yes, she likes ___ English.", options: [{ letter: "A", text: "taught", correct: false }, { letter: "B", text: "teaching", correct: true }, { letter: "C", text: "teach", correct: false }] } },
    { question: "Do you hate doing the dishes?", answer: "Yes, I hate doing the dishes.", multipleChoice: { prompt: "Yes, ___ hate doing the dishes.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Do you like taking photos?", answer: "Yes, I like taking photos.", multipleChoice: { prompt: "Yes, I ___ taking photos.", options: [{ letter: "A", text: "likeed", correct: false }, { letter: "B", text: "likes", correct: false }, { letter: "C", text: "like", correct: true }] } },
    { question: "Does your brother love playing basketball?", answer: "Yes, he loves playing basketball.", multipleChoice: { prompt: "Yes, he loves ___ basketball.", options: [{ letter: "A", text: "studying", correct: false }, { letter: "B", text: "working", correct: false }, { letter: "C", text: "playing", correct: true }] } },
    { question: "Do you like writing stories?", answer: "Yes, I like writing stories.", multipleChoice: { prompt: "Yes, I ___ writing stories.", options: [{ letter: "A", text: "likes", correct: false }, { letter: "B", text: "likeed", correct: false }, { letter: "C", text: "like", correct: true }] } },
    { question: "Do your parents love walking in the park?", answer: "Yes, they love walking in the park.", multipleChoice: { prompt: "Yes, they love ___ in the park.", options: [{ letter: "A", text: "walking", correct: true }, { letter: "B", text: "walk", correct: false }, { letter: "C", text: "walked", correct: false }] } },
    { question: "Do you hate studying grammar?", answer: "No, I don’t hate studying grammar.", multipleChoice: { prompt: "No, I don’t hate ___ grammar.", options: [{ letter: "A", text: "working", correct: false }, { letter: "B", text: "reading", correct: false }, { letter: "C", text: "studying", correct: true }] } },
    { question: "Does your best friend like talking on the phone?", answer: "Yes, she likes talking on the phone.", multipleChoice: { prompt: "Yes, she likes ___ on the phone.", options: [{ letter: "A", text: "talk", correct: false }, { letter: "B", text: "talked", correct: false }, { letter: "C", text: "talking", correct: true }] } },
    { question: "Do you love eating pizza?", answer: "Yes, I love eating pizza.", multipleChoice: { prompt: "Yes, ___ love eating pizza.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Do dogs hate running?", answer: "No, they don’t hate running.", multipleChoice: { prompt: "No, ___ don’t hate running.", options: [{ letter: "A", text: "they", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "we", correct: false }] } },
    { question: "Does your brother like playing computer games?", answer: "Yes, he likes playing computer games.", multipleChoice: { prompt: "Yes, he likes ___ computer games.", options: [{ letter: "A", text: "play", correct: false }, { letter: "B", text: "played", correct: false }, { letter: "C", text: "playing", correct: true }] } },
    { question: "Do you like riding a bike?", answer: "Yes, I like riding a bike.", multipleChoice: { prompt: "Yes, I ___ riding a bike.", options: [{ letter: "A", text: "likeed", correct: false }, { letter: "B", text: "like", correct: true }, { letter: "C", text: "likes", correct: false }] } },
    { question: "Do you hate cleaning the bathroom?", answer: "Yes, I hate cleaning the bathroom.", multipleChoice: { prompt: "Yes, ___ hate cleaning the bathroom.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "Does your dad love fixing things?", answer: "Yes, he loves fixing things.", multipleChoice: { prompt: "Yes, ___ loves fixing things.", options: [{ letter: "A", text: "he", correct: true }, { letter: "B", text: "it", correct: false }, { letter: "C", text: "she", correct: false }] } },
    { question: "Do you like watching cartoons?", answer: "Yes, I like watching cartoons.", multipleChoice: { prompt: "Yes, I ___ watching cartoons.", options: [{ letter: "A", text: "like", correct: true }, { letter: "B", text: "likeed", correct: false }, { letter: "C", text: "likes", correct: false }] } },
    { question: "Does your brother hate doing housework?", answer: "Yes, he hates doing housework.", multipleChoice: { prompt: "Yes, ___ hates doing housework.", options: [{ letter: "A", text: "he", correct: true }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "it", correct: false }] } },
    { question: "Do your friends like eating out?", answer: "Yes, they like eating out.", multipleChoice: { prompt: "Yes, they ___ eating out.", options: [{ letter: "A", text: "likes", correct: false }, { letter: "B", text: "like", correct: true }, { letter: "C", text: "likeed", correct: false }] } },
    { question: "Do you love going to the beach?", answer: "Yes, I love going to the beach.", multipleChoice: { prompt: "Yes, I love ___ to the beach.", options: [{ letter: "A", text: "going", correct: true }, { letter: "B", text: "go", correct: false }, { letter: "C", text: "went", correct: false }] } },
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

  table: {
    title: "📋 Demonstratives (This, That, These, Those) - Pointing to Things",
    data: [
      { category: "What are Demonstratives?", explanation: "Words used to point to and identify specific people, animals, or things", turkish: "İşaret sıfatları / İşaret zamirleri", function: "Show which one(s) you're talking about", examples: "This is my phone. / That is your car. / These are my books. / Those are their shoes.", note: "Used to indicate distance (near or far) and number (singular or plural)" },

      { category: "The Four Demonstratives", this: "THIS (bu) - Singular, near", that: "THAT (şu, o) - Singular, far", these: "THESE (bunlar) - Plural, near", those: "THOSE (şunlar, onlar) - Plural, far", rule: "Choose based on: 1) How many? (singular/plural) 2) How far? (near/far)", remember: "THIS/THESE = near | THAT/THOSE = far" },

      { category: "THIS - Singular, Near", use: "One thing/person close to you", turkish: "Bu (tekil, yakın)", structure: "This + is + noun / adjective", examples: "This is my pen. / This is expensive. / This book is interesting.", with_noun: "This book / This car / This teacher / This idea", distance: "Something you can touch or is very close", gesture: "Point to something near you" },
      { category: "THAT - Singular, Far", use: "One thing/person away from you", turkish: "Şu, o (tekil, uzak)", structure: "That + is + noun / adjective", examples: "That is your house. / That is beautiful. / That mountain is high.", with_noun: "That building / That tree / That person / That shop", distance: "Something you can see but it's not close", gesture: "Point to something far away" },

      { category: "THESE - Plural, Near", use: "Two or more things/people close to you", turkish: "Bunlar (çoğul, yakın)", structure: "These + are + noun / adjective", examples: "These are my keys. / These are new. / These shoes are comfortable.", with_noun: "These books / These students / These apples / These chairs", distance: "Multiple things you can touch or are very close", gesture: "Point to multiple things near you", note: "Always use ARE (not is) with these!" },
      { category: "THOSE - Plural, Far", use: "Two or more things/people away from you", turkish: "Şunlar, onlar (çoğul, uzak)", structure: "Those + are + noun / adjective", examples: "Those are their bags. / Those are old. / Those cars are fast.", with_noun: "Those buildings / Those children / Those birds / Those clouds", distance: "Multiple things you can see but they're not close", gesture: "Point to multiple things far away", note: "Always use ARE (not is) with those!" },

      { category: "Quick Reference Chart", singular_near: "THIS is (bu)", singular_far: "THAT is (şu, o)", plural_near: "THESE are (bunlar)", plural_far: "THOSE are (şunlar, onlar)", rule_1: "Singular (one) → This/That + IS", rule_2: "Plural (many) → These/Those + ARE", remember: "Near → This/These | Far → That/Those" },

      { category: "With BE Verb", this_is: "This is my friend. / This is important.", that_is: "That is his car. / That is correct.", these_are: "These are my photos. / These are beautiful.", those_are: "Those are your shoes. / Those are expensive.", rule: "This/That + IS | These/Those + ARE", important: "Never say 'These is' or 'Those is' - always ARE!" },

      { category: "Questions with Demonstratives", what_this: "What is this? → This is a book.", what_that: "What is that? → That is a mountain.", what_these: "What are these? → These are my pencils.", what_those: "What are those? → Those are clouds.", who: "Who is this? / Who are these?", pattern: "What/Who + is/are + demonstrative?", inversion: "Use 'is' with this/that, 'are' with these/those" },

      { category: "Before Nouns (as Adjectives)", this_noun: "This book is good. / This car is new.", that_noun: "That house is big. / That man is my teacher.", these_noun: "These books are mine. / These apples are fresh.", those_noun: "Those dogs are cute. / Those people are students.", pattern: "Demonstrative + noun + verb", note: "Demonstrative describes WHICH book/house/apples/dogs" },

      { category: "Alone (as Pronouns)", this_alone: "This is mine. / Is this your bag?", that_alone: "That is expensive. / I don't like that.", these_alone: "These are yours. / Can I have these?", those_alone: "Those are beautiful. / I want those.", pattern: "Demonstrative + verb (no noun after)", note: "The demonstrative replaces the noun completely" },

      { category: "Yes/No Questions", is_this: "Is this your phone? → Yes, it is. / No, it isn't.", is_that: "Is that your car? → Yes, that's my car. / No, that's not mine.", are_these: "Are these your keys? → Yes, they are. / No, they aren't.", are_those: "Are those your books? → Yes, those are mine. / No, those are Sarah's.", pattern: "Is/Are + demonstrative + noun?", short_answers: "Yes, it is. / Yes, they are. / No, it isn't. / No, they aren't." },

      { category: "Whose Questions", whose_this: "Whose is this? → This is mine. / This is John's.", whose_that: "Whose is that? → That is his. / That's my father's.", whose_these: "Whose are these? → These are ours. / These are the teacher's.", whose_those: "Whose are those? → Those are theirs. / Those are my sister's.", pattern: "Whose + is/are + demonstrative?", use: "Ask about ownership of things you're pointing to" },

      { category: "Distance Examples", near_touch: "This is my cup. (in my hand) / These are my shoes. (on my feet)", near_vision: "This building is tall. (we're inside it) / These trees are beautiful. (right next to us)", far_vision: "That mountain is high. (we can see it far away) / Those birds are flying. (up in the sky)", far_elsewhere: "That restaurant is good. (talking about one across town) / Those shops are closed. (not here)", remember: "Near = can touch it | Far = can see it but it's away" },

      { category: "Common Mistakes", mistake_1: "Using 'is' with these/those", wrong_1: "These is my books. ✗ / Those is their cars. ✗", correct_1: "These are my books. ✓ / Those are their cars. ✓", rule: "These/Those always need ARE (plural)", remember: "Plural → are (not is)" },
      { category: "Common Mistakes", mistake_2: "Confusing singular and plural", wrong_2: "This are good. ✗ / That are expensive. ✗", correct_2: "This is good. ✓ / That is expensive. ✓", rule: "This/That = singular → IS | These/Those = plural → ARE", tip: "Check: one thing or many things?" },
      { category: "Common Mistakes", mistake_3: "Wrong distance choice", wrong_3: "Using 'these' for things far away / Using 'those' for things you're holding", correct_3: "These = close to me / Those = far from me", example: "These books (in my hand) ✓ / Those books (on the shelf far away) ✓", remember: "Think about distance: Can I touch it? → this/these | Can I see it but it's far? → that/those" },

      { category: "Polite Requests", this_one: "Can I have this one? / I'd like this, please.", that_one: "Could you give me that one? / I want that, please.", these_ones: "May I try these on? / I'll take these, please.", those_ones: "Could you show me those? / Can I see those, please?", shopping: "Very common when shopping or choosing items", note: "Polite way to point to what you want" },

      { category: "Real-World Uses", introductions: "This is my friend, Anna. / These are my parents.", shopping: "How much is this? / I like those shoes.", phone_calls: "Hello, this is John speaking. (identify yourself on phone)", presentations: "This chart shows... / These results indicate...", general: "Point to things, ask questions, make choices, introduce people" },

      { category: "Key Takeaway", summary: "Demonstratives point to specific things based on distance and number", chart: "THIS (one, near) | THAT (one, far) | THESE (many, near) | THOSE (many, far)", verbs: "This/That + IS | These/Those + ARE", distance: "THIS/THESE = close (yakın) | THAT/THOSE = far (uzak)", number: "THIS/THAT = singular (tekil) | THESE/THOSE = plural (çoğul)", remember: "Choose based on: How many? (one or many) + How far? (near or far)", next: "Practice pointing to things around you and using demonstratives!" }
    ]
  },
  
  speakingPractice: [
    { question: "What is this?", answer: "This is my phone.", multipleChoice: { prompt: "___ my phone.", options: [{ letter: "A", text: "These are", correct: false }, { letter: "B", text: "That is", correct: false }, { letter: "C", text: "This is", correct: true }] } },
    { question: "What is that?", answer: "That is a mountain.", multipleChoice: { prompt: "___ a mountain.", options: [{ letter: "A", text: "Those are", correct: false }, { letter: "B", text: "This is", correct: false }, { letter: "C", text: "That is", correct: true }] } },
    { question: "Who are these?", answer: "These are my classmates.", multipleChoice: { prompt: "___ my classmates.", options: [{ letter: "A", text: "This is", correct: false }, { letter: "B", text: "Those are", correct: false }, { letter: "C", text: "These are", correct: true }] } },
    { question: "Who are those?", answer: "Those are my neighbors.", multipleChoice: { prompt: "___ my neighbors.", options: [{ letter: "A", text: "These are", correct: false }, { letter: "B", text: "That is", correct: false }, { letter: "C", text: "Those are", correct: true }] } },
    { question: "Is this your bag?", answer: "Yes, this is my bag.", multipleChoice: { prompt: "Yes, ___ my bag.", options: [{ letter: "A", text: "These are", correct: false }, { letter: "B", text: "This is", correct: true }, { letter: "C", text: "That is", correct: false }] } },
    { question: "Is that your car?", answer: "No, that is my father’s car.", multipleChoice: { prompt: "No, ___ my father’s car.", options: [{ letter: "A", text: "That is", correct: true }, { letter: "B", text: "Those are", correct: false }, { letter: "C", text: "This is", correct: false }] } },
    { question: "Are these your shoes?", answer: "Yes, these are my shoes.", multipleChoice: { prompt: "Yes, ___ my shoes.", options: [{ letter: "A", text: "These are", correct: true }, { letter: "B", text: "Those are", correct: false }, { letter: "C", text: "This is", correct: false }] } },
    { question: "Are those your books?", answer: "No, those are Sarah’s books.", multipleChoice: { prompt: "No, ___ Sarah’s books.", options: [{ letter: "A", text: "Those are", correct: true }, { letter: "B", text: "That is", correct: false }, { letter: "C", text: "These are", correct: false }] } },
    { question: "What are these?", answer: "These are my pencils.", multipleChoice: { prompt: "___ my pencils.", options: [{ letter: "A", text: "Those are", correct: false }, { letter: "B", text: "These are", correct: true }, { letter: "C", text: "This is", correct: false }] } },
    { question: "What are those?", answer: "Those are clouds.", multipleChoice: { prompt: "___ clouds.", options: [{ letter: "A", text: "That is", correct: false }, { letter: "B", text: "Those are", correct: true }, { letter: "C", text: "These are", correct: false }] } },
    { question: "Is this your notebook?", answer: "Yes, this is my notebook.", multipleChoice: { prompt: "Yes, ___ my notebook.", options: [{ letter: "A", text: "These are", correct: false }, { letter: "B", text: "This is", correct: true }, { letter: "C", text: "That is", correct: false }] } },
    { question: "Is that your house?", answer: "Yes, that is my house.", multipleChoice: { prompt: "Yes, ___ my house.", options: [{ letter: "A", text: "That is", correct: true }, { letter: "B", text: "Those are", correct: false }, { letter: "C", text: "This is", correct: false }] } },
    { question: "Are these your brothers?", answer: "Yes, these are my brothers.", multipleChoice: { prompt: "Yes, ___ my brothers.", options: [{ letter: "A", text: "These are", correct: true }, { letter: "B", text: "This is", correct: false }, { letter: "C", text: "Those are", correct: false }] } },
    { question: "Are those your dogs?", answer: "Yes, those are my dogs.", multipleChoice: { prompt: "Yes, ___ my dogs.", options: [{ letter: "A", text: "Those are", correct: true }, { letter: "B", text: "These are", correct: false }, { letter: "C", text: "That is", correct: false }] } },
    { question: "What is this sound?", answer: "This is the alarm.", multipleChoice: { prompt: "___ the alarm.", options: [{ letter: "A", text: "That is", correct: false }, { letter: "B", text: "This is", correct: true }, { letter: "C", text: "These are", correct: false }] } },
    { question: "What is that noise?", answer: "That is a train.", multipleChoice: { prompt: "___ a train.", options: [{ letter: "A", text: "This is", correct: false }, { letter: "B", text: "That is", correct: true }, { letter: "C", text: "Those are", correct: false }] } },
    { question: "Who is this?", answer: "This is my friend Anna.", multipleChoice: { prompt: "___ my friend Anna.", options: [{ letter: "A", text: "That is", correct: false }, { letter: "B", text: "This is", correct: true }, { letter: "C", text: "These are", correct: false }] } },
    { question: "Who is that?", answer: "That is our neighbor.", multipleChoice: { prompt: "___ our neighbor.", options: [{ letter: "A", text: "That is", correct: true }, { letter: "B", text: "This is", correct: false }, { letter: "C", text: "Those are", correct: false }] } },
    { question: "Whose is this?", answer: "This is mine.", multipleChoice: { prompt: "___ mine.", options: [{ letter: "A", text: "This is", correct: true }, { letter: "B", text: "That is", correct: false }, { letter: "C", text: "These are", correct: false }] } },
    { question: "Whose is that?", answer: "That is his.", multipleChoice: { prompt: "___ his.", options: [{ letter: "A", text: "That is", correct: true }, { letter: "B", text: "This is", correct: false }, { letter: "C", text: "Those are", correct: false }] } },
    { question: "Whose are these?", answer: "These are ours.", multipleChoice: { prompt: "___ ours.", options: [{ letter: "A", text: "This is", correct: false }, { letter: "B", text: "Those are", correct: false }, { letter: "C", text: "These are", correct: true }] } },
    { question: "Whose are those?", answer: "Those are theirs.", multipleChoice: { prompt: "___ theirs.", options: [{ letter: "A", text: "These are", correct: false }, { letter: "B", text: "That is", correct: false }, { letter: "C", text: "Those are", correct: true }] } },
    { question: "Do you like this shirt?", answer: "Yes, I like this shirt.", multipleChoice: { prompt: "Yes, I ___ this shirt.", options: [{ letter: "A", text: "likes", correct: false }, { letter: "B", text: "likeed", correct: false }, { letter: "C", text: "like", correct: true }] } },
    { question: "Do you want that hat?", answer: "No, I don’t want that hat.", multipleChoice: { prompt: "No, ___ don’t want that hat.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Are these your pens?", answer: "Yes, these are my pens.", multipleChoice: { prompt: "Yes, ___ my pens.", options: [{ letter: "A", text: "Those are", correct: false }, { letter: "B", text: "This is", correct: false }, { letter: "C", text: "These are", correct: true }] } },
    { question: "Are those your jackets?", answer: "No, those are not mine.", multipleChoice: { prompt: "No, ___ not mine.", options: [{ letter: "A", text: "That is", correct: false }, { letter: "B", text: "These are", correct: false }, { letter: "C", text: "Those are", correct: true }] } },
    { question: "What color is this car?", answer: "This car is red.", multipleChoice: { prompt: "This car ___ red.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What color is that bike?", answer: "That bike is blue.", multipleChoice: { prompt: "That bike ___ blue.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are these apples fresh?", answer: "Yes, these apples are fresh.", multipleChoice: { prompt: "Yes, these apples ___ fresh.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are those bananas ripe?", answer: "No, those bananas are not ripe.", multipleChoice: { prompt: "No, those bananas ___ not ripe.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is this your seat?", answer: "Yes, this is my seat.", multipleChoice: { prompt: "Yes, ___ my seat.", options: [{ letter: "A", text: "This is", correct: true }, { letter: "B", text: "These are", correct: false }, { letter: "C", text: "That is", correct: false }] } },
    { question: "Is that your desk?", answer: "No, that is Tom’s desk.", multipleChoice: { prompt: "No, ___ Tom’s desk.", options: [{ letter: "A", text: "That is", correct: true }, { letter: "B", text: "Those are", correct: false }, { letter: "C", text: "This is", correct: false }] } },
    { question: "Are these your glasses?", answer: "Yes, these are my glasses.", multipleChoice: { prompt: "Yes, ___ my glasses.", options: [{ letter: "A", text: "Those are", correct: false }, { letter: "B", text: "These are", correct: true }, { letter: "C", text: "This is", correct: false }] } },
    { question: "Are those your children?", answer: "Yes, those are my children.", multipleChoice: { prompt: "Yes, ___ my children.", options: [{ letter: "A", text: "That is", correct: false }, { letter: "B", text: "Those are", correct: true }, { letter: "C", text: "These are", correct: false }] } },
    { question: "What’s this?", answer: "This is a gift for my friend.", multipleChoice: { prompt: "___ a gift for my friend.", options: [{ letter: "A", text: "These are", correct: false }, { letter: "B", text: "This is", correct: true }, { letter: "C", text: "That is", correct: false }] } },
    { question: "What’s that?", answer: "That is a plane in the sky.", multipleChoice: { prompt: "___ a plane in the sky.", options: [{ letter: "A", text: "That is", correct: true }, { letter: "B", text: "Those are", correct: false }, { letter: "C", text: "This is", correct: false }] } },
    { question: "What are these?", answer: "These are my keys.", multipleChoice: { prompt: "___ my keys.", options: [{ letter: "A", text: "These are", correct: true }, { letter: "B", text: "Those are", correct: false }, { letter: "C", text: "This is", correct: false }] } },
    { question: "What are those?", answer: "Those are old coins.", multipleChoice: { prompt: "___ old coins.", options: [{ letter: "A", text: "Those are", correct: true }, { letter: "B", text: "These are", correct: false }, { letter: "C", text: "That is", correct: false }] } },
    { question: "Can I take this?", answer: "Yes, you can take this.", multipleChoice: { prompt: "Yes, you can take ___.", options: [{ letter: "A", text: "these", correct: false }, { letter: "B", text: "those", correct: false }, { letter: "C", text: "this", correct: true }] } },
    { question: "Can you give me that?", answer: "Sure, I’ll give you that.", multipleChoice: { prompt: "Sure, I’ll give ___ that.", options: [{ letter: "A", text: "i", correct: false }, { letter: "B", text: "you", correct: true }, { letter: "C", text: "we", correct: false }] } },
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

  table: {
    title: "📋 Whose & Possessive 's - Asking About and Showing Ownership",
    data: [
      { category: "What is WHOSE?", explanation: "Question word used to ask about ownership or possession", turkish: "Kimin (soru sözcüğü)", function: "Ask 'Who owns this?'", examples: "Whose car is this? / Whose books are these? / Whose phone is ringing?", note: "Answers usually use possessive 's or possessive pronouns" },
      { category: "What is Possessive 's?", explanation: "Apostrophe + s added to a noun to show ownership", turkish: "İyelik eki (kimin)", function: "Show that something belongs to someone", examples: "Anna's book / My father's car / The teacher's desk / John's phone", note: "Shows 'X belongs to Y' → Y's X" },

      { category: "WHOSE - Question Structure", structure: "Whose + noun + is/are + this/that/these/those?", examples: "Whose bag is this? / Whose keys are these? / Whose car is that?", pattern: "Whose + noun + verb", turkish: "Kimin + isim + fiil", singular: "Whose book is this? (kimin kitabı bu?)", plural: "Whose pens are these? (kimin kalemleri bunlar?)" },
      { category: "WHOSE - Answering", answer_with_s: "It's Anna's. / It's my friend's. / It's the teacher's.", answer_with_pronoun: "It's mine. / It's his. / It's hers. / It's theirs.", full_answer: "This is John's bag. / That's my sister's car.", short_answer: "John's. / My sister's. / The teacher's.", pattern: "Name/'s or possessive pronoun", note: "You can answer with 's or with possessive pronouns" },

      { category: "Possessive 's - Basic Rule", rule: "Add 's to the owner (person/animal)", pattern: "OWNER + 's + THING OWNED", examples: "Sarah's phone (Sarah'nın telefonu) / My dad's car (babamın arabası) / The cat's toy (kedinin oyuncağı)", structure: "Person's + noun", turkish: "Kişi + 's + nesne", remember: "The 's goes on the OWNER, not the thing!" },
      { category: "Possessive 's - Regular Nouns", rule: "Add 's to singular nouns and names", examples: "Tom's book / Maria's house / The teacher's desk / My friend's dog / The student's notebook", pattern: "Singular noun + 's", note: "This works for most singular nouns", turkish: "Tekil isim + 's" },
      { category: "Possessive 's - Names Ending in -s", rule: "Add 's (most common) OR just ' (less common)", examples_1: "James's car / Chris's phone / Thomas's idea (recommended)", examples_2: "James' car / Chris' phone / Thomas' idea (also acceptable)", modern_rule: "Most style guides now recommend 's even after -s", pronunciation: "James's = /ˈdʒeɪmzɪz/ (say the extra syllable)", choose: "Both are correct, but 's is more common now" },

      { category: "Possessive 's - Plural Nouns Ending in -s", rule: "Add only ' (apostrophe) after -s", examples: "The students' books (öğrencilerin kitapları) / My parents' house (ebeveynlerimin evi) / The teachers' room (öğretmenler odası)", pattern: "Plural noun ending in -s + '", why: "The -s is already there for plural, so just add '", contrast: "One student's book (one student) vs The students' books (many students)" },
      { category: "Possessive 's - Irregular Plural Nouns", rule: "Add 's to irregular plurals (not ending in -s)", examples: "The children's toys / The men's room / The women's shoes / The people's choice", pattern: "Irregular plural + 's", why: "These plurals don't end in -s, so add 's normally", turkish: "Düzensiz çoğullar + 's" },

      { category: "Whose vs Who's - DON'T CONFUSE!", whose: "WHOSE = possession (kimin)", whose_example: "Whose book is this? (Kimin kitabı bu?)", whos: "WHO'S = who is / who has (contraction)", whos_example: "Who's that? = Who is that? / Who's got a pen? = Who has got a pen?", rule: "Whose = ownership question | Who's = who is/has", mistake: "Don't write 'Who's book' ✗", correct: "Whose book ✓", tip: "If you can replace it with 'who is', use who's. Otherwise, use whose!" },

      { category: "Using WHOSE in Questions", whose_noun: "Whose phone is ringing? / Whose turn is it?", whose_alone: "Whose is this? / Whose are those?", with_demonstratives: "Whose book is this? / Whose keys are these?", with_be: "Whose car is that? / Whose idea was it?", pattern: "Whose (+ noun) + verb", answer: "It's mine. / It's Sarah's. / It's the teacher's." },

      { category: "Possessive 's with Family", family_examples: "My mother's job / My father's car / My sister's room / My brother's friend / My grandmother's house / My uncle's shop", pattern: "Family member + 's + noun", use: "Very common to talk about family possessions", turkish: "Aile bireylerinin eşyaları", note: "We use 's (not 'of') with people in family relationships" },
      { category: "Possessive 's with Time", time_examples: "Today's news / Yesterday's game / Tomorrow's meeting / This week's homework / Last year's winner / Next month's plan", pattern: "Time word + 's + noun", use: "Show that something belongs to a time period", turkish: "Zaman + 's + nesne", note: "Yes, you can use 's with time expressions!" },

      { category: "Double Possessive", pattern: "A/An + noun + of + possessive", examples: "A friend of mine / A book of Sarah's / A student of my teacher's / An idea of his", meaning: "One of several things someone owns", explanation: "Combines 'a/an' + 'of' + possessive form", use: "When emphasizing 'one of many'", note: "Common in everyday English" },

      { category: "Two Owners", shared_ownership: "Anna and Tom's house (they share ONE house)", separate_ownership: "Anna's and Tom's houses (they have SEPARATE houses)", rule: "One 's = shared | Two 's = separate", shared_example: "John and Mary's car (one car they both own)", separate_example: "John's and Mary's cars (they each have their own car)", pattern: "Name1 and Name2's (shared) | Name1's and Name2's (separate)" },

      { category: "With Pronouns - Use Possessive Pronouns Instead", dont_use_s: "You can't add 's to pronouns!", wrong: "I's book ✗ / you's car ✗ / he's phone ✗ (this means 'he is'!)", correct: "my book ✓ / your car ✓ / his phone ✓", possessive_pronouns: "my, your, his, her, its, our, their", note: "Pronouns have special possessive forms - no 's needed!", remember: "his book (NOT he's book), her car (NOT she's car)" },

      { category: "Common Mistakes", mistake_1: "Using 's on pronouns", wrong_1: "This is she's book. ✗ / That's they's car. ✗", correct_1: "This is her book. ✓ / That's their car. ✓", rule: "Use possessive pronouns, not pronoun + 's", remember: "Pronouns don't take 's!" },
      { category: "Common Mistakes", mistake_2: "Confusing whose and who's", wrong_2: "Who's book is this? ✗", correct_2: "Whose book is this? ✓", test: "Can you say 'who is book'? No! → Use whose", rule: "Whose = possession | Who's = who is" },
      { category: "Common Mistakes", mistake_3: "Wrong placement of 's", wrong_3: "The book's Sarah. ✗ / The car's my dad. ✗", correct_3: "Sarah's book. ✓ / My dad's car. ✓", rule: "'s goes on the OWNER, then the thing owned", pattern: "OWNER's + THING (not THING's + OWNER)" },
      { category: "Common Mistakes", mistake_4: "Plural 's confusion", wrong_4: "My parent's are doctors. ✗ (this says 'my parent is')", correct_4: "My parents are doctors. ✓ (no apostrophe for simple plural)", rule: "-s = plural | 's = possession", examples: "Books = plural / Book's = belonging to the book / Books' = belonging to the books" },

      { category: "Real-World Uses", introductions: "This is my friend's house. / That's my teacher's car.", finding_owners: "Whose phone is this? / Whose bag is on the chair?", describing_relationships: "She's my sister's best friend. / He's my father's colleague.", talking_about_belongings: "I like Sarah's dress. / Do you have Tom's number?", general: "Essential for showing ownership and asking about it!" },

      { category: "Key Takeaway", whose_summary: "WHOSE = question word for ownership (kimin)", whose_use: "Whose + noun + verb? → It's [owner]'s", possessive_s_summary: "Possessive 's = shows ownership", possessive_pattern: "OWNER + 's + THING", singular_rule: "Add 's to singular nouns and names", plural_regular: "Add ' to plural nouns ending in -s", plural_irregular: "Add 's to irregular plurals", remember: "'s goes on the OWNER | Whose asks about ownership | Who's = who is (different!)", next: "Practice asking whose and answering with 's!" }
    ]
  },
  
  speakingPractice: [
    { question: "Whose bag is this?", answer: "It’s my sister’s bag.", multipleChoice: { prompt: "___ my sister’s bag.", options: [{ letter: "A", text: "it’ing", correct: false }, { letter: "B", text: "it’", correct: false }, { letter: "C", text: "it’s", correct: true }] } },
    { question: "Whose phone is ringing?", answer: "It’s John’s phone.", multipleChoice: { prompt: "___ John’s phone.", options: [{ letter: "A", text: "it’ing", correct: false }, { letter: "B", text: "it’", correct: false }, { letter: "C", text: "it’s", correct: true }] } },
    { question: "Whose car is in the driveway?", answer: "That’s my neighbor’s car.", multipleChoice: { prompt: "___ my neighbor’s car.", options: [{ letter: "A", text: "that’", correct: false }, { letter: "B", text: "that’ing", correct: false }, { letter: "C", text: "that’s", correct: true }] } },
    { question: "Whose house is this?", answer: "It’s my uncle’s house.", multipleChoice: { prompt: "___ my uncle’s house.", options: [{ letter: "A", text: "it’", correct: false }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’s", correct: true }] } },
    { question: "Whose jacket is on the chair?", answer: "It’s Sarah’s jacket.", multipleChoice: { prompt: "___ Sarah’s jacket.", options: [{ letter: "A", text: "it’ing", correct: false }, { letter: "B", text: "it’s", correct: true }, { letter: "C", text: "it’", correct: false }] } },
    { question: "Whose books are these?", answer: "They’re the teacher’s books.", multipleChoice: { prompt: "___ the teacher’s books.", options: [{ letter: "A", text: "they’re", correct: true }, { letter: "B", text: "person", correct: false }, { letter: "C", text: "thing", correct: false }] } },
    { question: "Whose dog is barking?", answer: "It’s our friend’s dog.", multipleChoice: { prompt: "It’s our friend’s ___.", options: [{ letter: "A", text: "dog", correct: true }, { letter: "B", text: "cat", correct: false }, { letter: "C", text: "bird", correct: false }] } },
    { question: "Whose pen is this?", answer: "It’s Mark’s pen.", multipleChoice: { prompt: "___ Mark’s pen.", options: [{ letter: "A", text: "it’s", correct: true }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’", correct: false }] } },
    { question: "Whose children are playing outside?", answer: "They’re the Smiths’ children.", multipleChoice: { prompt: "___ the Smiths’ children.", options: [{ letter: "A", text: "person", correct: false }, { letter: "B", text: "they’re", correct: true }, { letter: "C", text: "thing", correct: false }] } },
    { question: "Whose bike is that?", answer: "It’s my brother’s bike.", multipleChoice: { prompt: "___ my brother’s bike.", options: [{ letter: "A", text: "it’ing", correct: false }, { letter: "B", text: "it’s", correct: true }, { letter: "C", text: "it’", correct: false }] } },
    { question: "Is this your friend’s notebook?", answer: "Yes, it’s my friend’s.", multipleChoice: { prompt: "Yes, ___ my friend’s.", options: [{ letter: "A", text: "it’ing", correct: false }, { letter: "B", text: "it’s", correct: true }, { letter: "C", text: "it’", correct: false }] } },
    { question: "Whose hat is on the table?", answer: "That’s Jenny’s hat.", multipleChoice: { prompt: "___ Jenny’s hat.", options: [{ letter: "A", text: "that’s", correct: true }, { letter: "B", text: "that’ing", correct: false }, { letter: "C", text: "that’", correct: false }] } },
    { question: "Whose laptop is this?", answer: "It’s my father’s laptop.", multipleChoice: { prompt: "It’s my father’s ___.", options: [{ letter: "A", text: "laptop", correct: true }, { letter: "B", text: "computer", correct: false }, { letter: "C", text: "notebook", correct: false }] } },
    { question: "Whose shoes are those?", answer: "They’re my sister’s shoes.", multipleChoice: { prompt: "___ my sister’s shoes.", options: [{ letter: "A", text: "they’re", correct: true }, { letter: "B", text: "thing", correct: false }, { letter: "C", text: "person", correct: false }] } },
    { question: "Whose keys are on the desk?", answer: "They’re my teacher’s keys.", multipleChoice: { prompt: "___ my teacher’s keys.", options: [{ letter: "A", text: "thing", correct: false }, { letter: "B", text: "they’re", correct: true }, { letter: "C", text: "person", correct: false }] } },
    { question: "Whose idea was this?", answer: "It was Tom’s idea.", multipleChoice: { prompt: "It ___ Tom’s idea.", options: [{ letter: "A", text: "were", correct: false }, { letter: "B", text: "was", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "Whose photos are in the album?", answer: "They’re my grandma’s photos.", multipleChoice: { prompt: "___ my grandma’s photos.", options: [{ letter: "A", text: "thing", correct: false }, { letter: "B", text: "they’re", correct: true }, { letter: "C", text: "person", correct: false }] } },
    { question: "Whose cup is this?", answer: "It’s my friend’s cup.", multipleChoice: { prompt: "___ my friend’s cup.", options: [{ letter: "A", text: "it’s", correct: true }, { letter: "B", text: "it’", correct: false }, { letter: "C", text: "it’ing", correct: false }] } },
    { question: "Whose parents are those?", answer: "They’re Ali’s parents.", multipleChoice: { prompt: "___ Ali’s parents.", options: [{ letter: "A", text: "they’re", correct: true }, { letter: "B", text: "thing", correct: false }, { letter: "C", text: "person", correct: false }] } },
    { question: "Whose phone is on the bed?", answer: "It’s Sarah’s phone.", multipleChoice: { prompt: "___ Sarah’s phone.", options: [{ letter: "A", text: "it’s", correct: true }, { letter: "B", text: "it’", correct: false }, { letter: "C", text: "it’ing", correct: false }] } },
    { question: "Is this your teacher’s book?", answer: "Yes, it’s hers.", multipleChoice: { prompt: "Yes, ___ hers.", options: [{ letter: "A", text: "it’", correct: false }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’s", correct: true }] } },
    { question: "Is that your father’s car?", answer: "Yes, that’s his car.", multipleChoice: { prompt: "Yes, ___ his car.", options: [{ letter: "A", text: "that’", correct: false }, { letter: "B", text: "that’ing", correct: false }, { letter: "C", text: "that’s", correct: true }] } },
    { question: "Is this the cat’s toy?", answer: "Yes, it’s the cat’s.", multipleChoice: { prompt: "Yes, ___ the cat’s.", options: [{ letter: "A", text: "it’", correct: false }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’s", correct: true }] } },
    { question: "Is that your sister’s dress?", answer: "Yes, that’s her dress.", multipleChoice: { prompt: "Yes, ___ her dress.", options: [{ letter: "A", text: "that’ing", correct: false }, { letter: "B", text: "that’", correct: false }, { letter: "C", text: "that’s", correct: true }] } },
    { question: "Are these your parents’ bags?", answer: "Yes, they are.", multipleChoice: { prompt: "Yes, they ___.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "Are those the children’s toys?", answer: "Yes, they are.", multipleChoice: { prompt: "Yes, they ___.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "Whose wallet is this?", answer: "It’s my friend’s wallet.", multipleChoice: { prompt: "___ my friend’s wallet.", options: [{ letter: "A", text: "it’", correct: false }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’s", correct: true }] } },
    { question: "Whose gloves are these?", answer: "They’re my dad’s gloves.", multipleChoice: { prompt: "___ my dad’s gloves.", options: [{ letter: "A", text: "thing", correct: false }, { letter: "B", text: "person", correct: false }, { letter: "C", text: "they’re", correct: true }] } },
    { question: "Whose birthday is it today?", answer: "It’s Emma’s birthday.", multipleChoice: { prompt: "___ Emma’s birthday.", options: [{ letter: "A", text: "it’", correct: false }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’s", correct: true }] } },
    { question: "Whose homework is on the desk?", answer: "It’s David’s homework.", multipleChoice: { prompt: "___ David’s homework.", options: [{ letter: "A", text: "it’s", correct: true }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’", correct: false }] } },
    { question: "Whose car keys are these?", answer: "They’re my mom’s car keys.", multipleChoice: { prompt: "___ my mom’s car keys.", options: [{ letter: "A", text: "they’re", correct: true }, { letter: "B", text: "person", correct: false }, { letter: "C", text: "thing", correct: false }] } },
    { question: "Whose umbrella is that?", answer: "That’s my aunt’s umbrella.", multipleChoice: { prompt: "___ my aunt’s umbrella.", options: [{ letter: "A", text: "that’s", correct: true }, { letter: "B", text: "that’ing", correct: false }, { letter: "C", text: "that’", correct: false }] } },
    { question: "Whose voice is that?", answer: "That’s my cousin’s voice.", multipleChoice: { prompt: "___ my cousin’s voice.", options: [{ letter: "A", text: "that’ing", correct: false }, { letter: "B", text: "that’s", correct: true }, { letter: "C", text: "that’", correct: false }] } },
    { question: "Whose computer are you using?", answer: "I’m using my brother’s.", multipleChoice: { prompt: "I’m ___ my brother’s.", options: [{ letter: "A", text: "using", correct: true }, { letter: "B", text: "use", correct: false }, { letter: "C", text: "used", correct: false }] } },
    { question: "Whose sandwich is this?", answer: "It’s Sam’s sandwich.", multipleChoice: { prompt: "___ Sam’s sandwich.", options: [{ letter: "A", text: "it’ing", correct: false }, { letter: "B", text: "it’s", correct: true }, { letter: "C", text: "it’", correct: false }] } },
    { question: "Whose game is he playing?", answer: "He’s playing Paul’s game.", multipleChoice: { prompt: "He’s ___ Paul’s game.", options: [{ letter: "A", text: "playing", correct: true }, { letter: "B", text: "studying", correct: false }, { letter: "C", text: "working", correct: false }] } },
    { question: "Whose desk is near the window?", answer: "That’s the manager’s desk.", multipleChoice: { prompt: "___ the manager’s desk.", options: [{ letter: "A", text: "that’s", correct: true }, { letter: "B", text: "that’ing", correct: false }, { letter: "C", text: "that’", correct: false }] } },
    { question: "Whose water bottle is this?", answer: "It’s my coach’s bottle.", multipleChoice: { prompt: "___ my coach’s bottle.", options: [{ letter: "A", text: "it’s", correct: true }, { letter: "B", text: "it’", correct: false }, { letter: "C", text: "it’ing", correct: false }] } },
    { question: "Whose job is it to clean the board?", answer: "It’s the student’s job.", multipleChoice: { prompt: "___ the student’s job.", options: [{ letter: "A", text: "it’", correct: false }, { letter: "B", text: "it’s", correct: true }, { letter: "C", text: "it’ing", correct: false }] } },
    { question: "Whose book is that on the floor?", answer: "It’s my book.", multipleChoice: { prompt: "It’s my ___.", options: [{ letter: "A", text: "book", correct: true }, { letter: "B", text: "pen", correct: false }, { letter: "C", text: "bag", correct: false }] } },
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

  table: {
    title: "📋 Question Words (Who, What, Where, When, Why, How) - The 5 W's + How",
    data: [
      { category: "What are Question Words?", explanation: "Special words that begin questions to get specific information", turkish: "Soru sözcükleri", function: "Ask about people, things, places, time, reasons, and manner", also_called: "Wh- words (because most start with 'wh')", examples: "Who are you? / What's this? / Where is it? / When do you start? / Why are you here? / How are you?", note: "Essential for getting information!" },

      { category: "The 6 Main Question Words", who: "WHO - person (kim)", what: "WHAT - thing/information (ne)", where: "WHERE - place (nerede)", when: "WHEN - time (ne zaman)", why: "WHY - reason (neden)", how: "HOW - manner/way (nasıl)", remember: "5 W's + H", common: "These are the most common question words in English!" },

      { category: "WHO - Asking About People", meaning: "Who = which person? (kim?)", use: "Ask about people's identity", examples: "Who is that? / Who are you? / Who is your teacher? / Who lives here?", structure: "Who + be verb / Who + auxiliary + subject + verb", answers: "A person's name or description", turkish: "Kim", note: "Use for identifying people" },
      { category: "WHO - Common Questions", question_1: "Who is your best friend? → My best friend is Sarah.", question_2: "Who are they? → They are my classmates.", question_3: "Who teaches you English? → Mr. Brown teaches me.", question_4: "Who do you live with? → I live with my family.", question_5: "Who wants ice cream? → I do! / Everyone does!", pattern: "Who + verb OR Who + do/does + subject + verb", note: "Who can be subject or object of the question" },

      { category: "WHAT - Asking About Things/Information", meaning: "What = which thing/information? (ne?)", use: "Ask about objects, actions, information, definitions", examples: "What is this? / What do you want? / What are you doing? / What's your name?", structure: "What + be verb / What + auxiliary + subject + verb", answers: "A thing, action, or piece of information", turkish: "Ne", note: "Very versatile - can ask about many things!" },
      { category: "WHAT - Common Questions", question_1: "What is your name? → My name is Ali.", question_2: "What are you doing? → I'm studying.", question_3: "What do you like? → I like pizza.", question_4: "What time is it? → It's 3 o'clock.", question_5: "What color is it? → It's blue.", question_6: "What's your favorite food? → My favorite food is pasta.", pattern: "What + noun (What time/color/food)", note: "Can combine with nouns for specific questions" },

      { category: "WHERE - Asking About Place/Location", meaning: "Where = in/at which place? (nerede?)", use: "Ask about locations, positions, places", examples: "Where are you? / Where do you live? / Where is the bank? / Where are my keys?", structure: "Where + be verb / Where + auxiliary + subject + verb", answers: "A place, location, or position", turkish: "Nerede, nereye, nereden", note: "Essential for asking about locations!" },
      { category: "WHERE - Common Questions", question_1: "Where do you live? → I live in Istanbul.", question_2: "Where is your school? → It's near the park.", question_3: "Where are you from? → I'm from Turkey.", question_4: "Where do you work? → I work at a hospital.", question_5: "Where is the bathroom? → It's upstairs.", question_6: "Where are you going? → I'm going to the mall.", prepositions: "Often answered with: in, at, on, near, next to, etc.", note: "Answers usually include location words" },

      { category: "WHEN - Asking About Time", meaning: "When = at what time? (ne zaman?)", use: "Ask about time, dates, moments, schedules", examples: "When is your birthday? / When do you start? / When is the meeting? / When did you arrive?", structure: "When + be verb / When + auxiliary + subject + verb", answers: "A time, date, day, or time expression", turkish: "Ne zaman", note: "For any time-related questions" },
      { category: "WHEN - Common Questions", question_1: "When is your birthday? → My birthday is in July. / It's on July 15th.", question_2: "When do you get up? → I get up at 7 a.m.", question_3: "When is the exam? → The exam is next Monday.", question_4: "When do you go to bed? → I go to bed at 10 p.m.", question_5: "When did you arrive? → I arrived yesterday.", question_6: "When are you leaving? → I'm leaving tomorrow.", time_words: "Answers: today, tomorrow, yesterday, at 5, on Monday, in June, etc.", note: "Many different time expressions can answer 'when'" },

      { category: "WHY - Asking About Reasons", meaning: "Why = for what reason? (neden?)", use: "Ask about reasons, causes, purposes", examples: "Why are you late? / Why do you study English? / Why is she crying? / Why did you do that?", structure: "Why + be verb / Why + auxiliary + subject + verb", answers: "Usually starts with 'because...'", turkish: "Neden, niçin", note: "Answers explain the reason or cause" },
      { category: "WHY - Common Questions & Answers", question_1: "Why are you sad? → Because I lost my keys.", question_2: "Why do you study English? → Because I want to travel. / To improve my career.", question_3: "Why is he angry? → Because he missed the bus.", question_4: "Why are they late? → Because there was traffic.", question_5: "Why do you like summer? → Because I love swimming.", answer_pattern: "Because + reason OR To + purpose", note: "'Because' is the most common way to answer why", alternative: "Can also answer with 'to + verb' for purpose" },

      { category: "HOW - Asking About Manner/Way/Degree", meaning: "How = in what way? to what degree? (nasıl?)", use: "Ask about manner, method, condition, degree", examples: "How are you? / How do you go to school? / How old are you? / How much is it?", structure: "How + be verb / How + auxiliary + subject + verb", answers: "A manner, method, feeling, or degree", turkish: "Nasıl", note: "Very versatile - can ask about many different things!" },
      { category: "HOW - Common Questions", question_1: "How are you? → I'm fine, thank you.", question_2: "How do you spell your name? → A-L-I.", question_3: "How do you go to school? → I go by bus. / I walk.", question_4: "How is the weather? → It's sunny and warm.", question_5: "How does this work? → You press this button.", method: "How + do/does = asking about method", condition: "How + be = asking about condition/state", note: "How has many uses!" },

      { category: "HOW + Adjective/Adverb", how_old: "How old are you? (Kaç yaşındasın?) → I'm 15 years old.", how_tall: "How tall are you? (Boy kaç?) → I'm 1.70 meters.", how_much: "How much is it? (Ne kadar?) → It's 50 lira.", how_many: "How many books? (Kaç kitap?) → Five books.", how_long: "How long is the film? (Film ne kadar uzun?) → It's 2 hours.", how_far: "How far is the airport? (Havaalanı ne kadar uzak?) → It's 30 km.", how_often: "How often do you exercise? (Ne sıklıkla?) → Twice a week.", pattern: "How + adjective/adverb asks about degree or quantity" },

      { category: "Question Structure with BE Verb", pattern: "Question word + BE + subject?", who_be: "Who is that? / Who are they?", what_be: "What is this? / What are those?", where_be: "Where is the bank? / Where are my keys?", when_be: "When is your birthday? / When is the meeting?", how_be: "How are you? / How is the weather?", rule: "Put BE verb right after the question word", note: "No 'do/does' needed with BE verb!" },

      { category: "Question Structure with Other Verbs", pattern: "Question word + DO/DOES/DID + subject + base verb?", who_do: "Who do you live with? / Who does she work for?", what_do: "What do you want? / What does he like?", where_do: "Where do you live? / Where does she work?", when_do: "When do you get up? / When does the class start?", why_do: "Why do you study English? / Why does he work hard?", how_do: "How do you go to school? / How does this work?", rule: "Use do/does/did + base verb (NOT -s on main verb!)", important: "The -s goes on 'does', not on the main verb!" },

      { category: "Intonation", wh_questions: "Wh- questions usually have FALLING intonation ↘", examples: "Where are you from? ↘ / What's your name? ↘ / When do you start? ↘", sound: "Your voice goes DOWN at the end", contrast: "Yes/No questions have RISING intonation ↗", practice: "Listen to native speakers and imitate the falling tone!", note: "Falling intonation sounds natural and confident" },

      { category: "Common Mistakes", mistake_1: "Wrong word order", wrong_1: "What you want? ✗ / Where you live? ✗", correct_1: "What do you want? ✓ / Where do you live? ✓", rule: "Use auxiliary verb (do/does) with main verbs", remember: "Question word + auxiliary + subject + verb" },
      { category: "Common Mistakes", mistake_2: "Using -s on main verb after does", wrong_2: "What does he wants? ✗ / Where does she lives? ✗", correct_2: "What does he want? ✓ / Where does she live? ✓", rule: "After does/did, use BASE FORM (no -s!)", remember: "The -s is on 'does', not on the verb!" },
      { category: "Common Mistakes", mistake_3: "Forgetting auxiliary verb", wrong_3: "What you do? ✗ / Where he go? ✗", correct_3: "What do you do? ✓ / Where does he go? ✓", rule: "Need do/does/did with main verbs (not BE)", exception: "Who/What as subject doesn't need auxiliary: 'Who wants coffee?' (not 'Who does want')" },

      { category: "Short Answers to Wh- Questions", no_yes_no: "Wh- questions DON'T use yes/no answers!", wrong: "Where are you from? → Yes. ✗", correct: "Where are you from? → I'm from Turkey. ✓", pattern: "Give the specific information asked for", examples: "What's your name? → Ali. / Where do you live? → In Istanbul. / When is your birthday? → In May.", note: "Answer with the information, not yes/no!" },

      { category: "Real-World Uses", introductions: "What's your name? / Where are you from? / What do you do?", daily_conversations: "How are you? / Where are you going? / What are you doing?", getting_information: "When does the bus arrive? / Where is the station? / How much is this?", problem_solving: "Why isn't it working? / How do I fix this? / What's wrong?", general: "Essential for communication and getting information!", note: "These are some of the most common questions in English!" },

      { category: "Key Takeaway", summary: "Question words get specific information about people, things, places, time, reasons, and manner", six_words: "WHO (person) | WHAT (thing) | WHERE (place) | WHEN (time) | WHY (reason) | HOW (manner)", structure_be: "Question word + BE + subject (for BE verb)", structure_main: "Question word + DO/DOES/DID + subject + base verb (for other verbs)", intonation: "Wh- questions have falling intonation ↘", answers: "Give specific information (not yes/no!)", remember: "Master these 6 words and you can ask about anything!", next: "Practice asking questions about everything around you!" }
    ]
  },
  
  speakingPractice: [
    { question: "Who is your best friend?", answer: "My best friend is Ayşe.", multipleChoice: { prompt: "My best friend ___ Ayşe.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "What is your favorite color?", answer: "My favorite color is blue.", multipleChoice: { prompt: "My favorite color ___ blue.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Where do you live?", answer: "I live in Istanbul.", multipleChoice: { prompt: "I ___ in Istanbul.", options: [{ letter: "A", text: "lives", correct: false }, { letter: "B", text: "living", correct: false }, { letter: "C", text: "live", correct: true }] } },
    { question: "When is your birthday?", answer: "My birthday is in July.", multipleChoice: { prompt: "My birthday ___ in July.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Why are you sad?", answer: "Because I lost my keys.", multipleChoice: { prompt: "___ I lost my keys.", options: [{ letter: "A", text: "Since", correct: false }, { letter: "B", text: "Because", correct: true }, { letter: "C", text: "So", correct: false }] } },
    { question: "How are you?", answer: "I’m fine, thank you.", openResponse: true },
    { question: "Who is your English teacher?", answer: "Mr. Can is my English teacher.", multipleChoice: { prompt: "Mr. ___ is my English teacher.", options: [{ letter: "A", text: "can", correct: true }, { letter: "B", text: "should", correct: false }, { letter: "C", text: "could", correct: false }] } },
    { question: "What do you like to eat?", answer: "I like to eat pasta.", multipleChoice: { prompt: "I ___ to eat pasta.", options: [{ letter: "A", text: "like", correct: true }, { letter: "B", text: "likeed", correct: false }, { letter: "C", text: "likes", correct: false }] } },
    { question: "Where is your school?", answer: "My school is near the park.", multipleChoice: { prompt: "My school ___ near the park.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "When do you get up?", answer: "I get up at 7 o’clock.", multipleChoice: { prompt: "I get ___ at 7 o’clock.", options: [{ letter: "A", text: "off", correct: false }, { letter: "B", text: "up", correct: true }, { letter: "C", text: "down", correct: false }] } },
    { question: "Why do you study English?", answer: "Because I want to travel.", multipleChoice: { prompt: "Because I want ___.", options: [{ letter: "A", text: "travel", correct: false }, { letter: "B", text: "to travel", correct: true }, { letter: "C", text: "traveling", correct: false }] } },
    { question: "How do you go to school?", answer: "I go to school by bus.", multipleChoice: { prompt: "I ___ to school by bus.", options: [{ letter: "A", text: "go", correct: true }, { letter: "B", text: "goed", correct: false }, { letter: "C", text: "goes", correct: false }] } },
    { question: "Who lives in this house?", answer: "My grandparents live in this house.", multipleChoice: { prompt: "My grandparents ___ in this house.", options: [{ letter: "A", text: "live", correct: true }, { letter: "B", text: "lives", correct: false }, { letter: "C", text: "living", correct: false }] } },
    { question: "What is your favorite sport?", answer: "My favorite sport is football.", multipleChoice: { prompt: "My favorite sport ___ football.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Where do you go on weekends?", answer: "I go to the shopping mall.", multipleChoice: { prompt: "I ___ to the shopping mall.", options: [{ letter: "A", text: "goes", correct: false }, { letter: "B", text: "go", correct: true }, { letter: "C", text: "goed", correct: false }] } },
    { question: "When do you do your homework?", answer: "I do my homework in the evening.", multipleChoice: { prompt: "I ___ my homework in the evening.", options: [{ letter: "A", text: "does", correct: false }, { letter: "B", text: "do", correct: true }, { letter: "C", text: "doed", correct: false }] } },
    { question: "Why is your friend angry?", answer: "Because he missed the bus.", multipleChoice: { prompt: "___ he missed the bus.", options: [{ letter: "A", text: "So", correct: false }, { letter: "B", text: "Because", correct: true }, { letter: "C", text: "Since", correct: false }] } },
    { question: "How is the weather today?", answer: "It’s sunny.", multipleChoice: { prompt: "___ sunny.", options: [{ letter: "A", text: "it’s", correct: true }, { letter: "B", text: "it’", correct: false }, { letter: "C", text: "it’ing", correct: false }] } },
    { question: "Who is that woman?", answer: "She is my aunt.", multipleChoice: { prompt: "She ___ my aunt.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "What is your hobby?", answer: "My hobby is painting.", multipleChoice: { prompt: "My hobby ___ painting.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Where is your phone?", answer: "It’s on the table.", openResponse: true },
    { question: "When is the meeting?", answer: "The meeting is at 2 p.m.", multipleChoice: { prompt: "The meeting ___ at 2 p.m.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Why are your friends late?", answer: "Because there was traffic.", multipleChoice: { prompt: "___ there was traffic.", options: [{ letter: "A", text: "So", correct: false }, { letter: "B", text: "Since", correct: false }, { letter: "C", text: "Because", correct: true }] } },
    { question: "How old are you?", answer: "I’m 10 years old.", multipleChoice: { prompt: "I’m 10 ___ old.", options: [{ letter: "A", text: "year", correct: false }, { letter: "B", text: "yearly", correct: false }, { letter: "C", text: "years", correct: true }] } },
    { question: "Who are they?", answer: "They are my cousins.", multipleChoice: { prompt: "They ___ my cousins.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "What time is it?", answer: "It’s 5 o’clock.", multipleChoice: { prompt: "___ 5 o’clock.", options: [{ letter: "A", text: "it’ing", correct: false }, { letter: "B", text: "it’", correct: false }, { letter: "C", text: "it’s", correct: true }] } },
    { question: "Where are you from?", answer: "I’m from Turkey.", multipleChoice: { prompt: "I’m ___ Turkey.", options: [{ letter: "A", text: "to", correct: false }, { letter: "B", text: "by", correct: false }, { letter: "C", text: "from", correct: true }] } },
    { question: "When do you go to bed?", answer: "I go to bed at 10.", multipleChoice: { prompt: "I ___ to bed at 10.", options: [{ letter: "A", text: "goes", correct: false }, { letter: "B", text: "goed", correct: false }, { letter: "C", text: "go", correct: true }] } },
    { question: "Why is the baby crying?", answer: "Because she is tired.", multipleChoice: { prompt: "Because she ___ tired.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "How do you feel?", answer: "I feel great.", multipleChoice: { prompt: "___ feel great.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Who do you live with?", answer: "I live with my family.", multipleChoice: { prompt: "I live ___ my family.", options: [{ letter: "A", text: "with", correct: true }, { letter: "B", text: "by", correct: false }, { letter: "C", text: "for", correct: false }] } },
    { question: "What are you doing?", answer: "I’m reading a book.", multipleChoice: { prompt: "I’m ___ a book.", options: [{ letter: "A", text: "reads", correct: false }, { letter: "B", text: "reading", correct: true }, { letter: "C", text: "read", correct: false }] } },
    { question: "Where is your backpack?", answer: "It’s in my room.", openResponse: true },
    { question: "When is the exam?", answer: "The exam is next Monday.", multipleChoice: { prompt: "The exam ___ next Monday.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Why do you like summer?", answer: "Because I love swimming.", multipleChoice: { prompt: "___ I love swimming.", options: [{ letter: "A", text: "Since", correct: false }, { letter: "B", text: "Because", correct: true }, { letter: "C", text: "So", correct: false }] } },
    { question: "How do you spell your name?", answer: "C-A-G-A-T-A-Y.", openResponse: true },
    { question: "Who is calling you?", answer: "My friend is calling me.", multipleChoice: { prompt: "My friend ___ calling me.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What do you want to do?", answer: "I want to play a game.", multipleChoice: { prompt: "I want ___ a game.", options: [{ letter: "A", text: "to play", correct: true }, { letter: "B", text: "playing", correct: false }, { letter: "C", text: "play", correct: false }] } },
    { question: "Where are your keys?", answer: "They are on the chair.", multipleChoice: { prompt: "They ___ on the chair.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "How do you make tea?", answer: "I boil water and add a tea bag.", multipleChoice: { prompt: "___ boil water and add a tea bag.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "he", correct: false }] } },
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

  table: {
    title: "📋 Ordinal Numbers (1st, 2nd, 3rd...) and Dates",
    data: [
      { category: "What are Ordinal Numbers?", explanation: "Numbers that show position, order, or sequence", turkish: "Sıra sayıları", function: "Show which position (first, second, third, etc.)", difference: "Cardinal = quantity (one, two, three) | Ordinal = position (first, second, third)", examples: "My birthday is on the 15th. / She came first in the race. / This is the third time.", use: "Dates, positions, rankings, floors, centuries" },

      { category: "Formation Pattern", pattern: "Most numbers: add -TH to cardinal number", examples: "four → fourth (4th) / seven → seventh (7th) / ten → tenth (10th)", exceptions: "1st, 2nd, 3rd have special forms", rule: "After 3rd, add -th to the number", note: "Some spelling changes happen!" },

      { category: "The First Three (Special Forms)", first: "1st = first (birinci)", second: "2nd = second (ikinci)", third: "3rd = third (üçüncü)", pattern: "These three are IRREGULAR - memorize them!", pronunciation: "first /fɜːrst/ | second /ˈsekənd/ | third /θɜːrd/", note: "All other ordinals end in -th", remember: "1st, 2nd, 3rd are special!" },

      { category: "Numbers 4-10", fourth: "4th = fourth", fifth: "5th = fifth (note: f not v)", sixth: "6th = sixth", seventh: "7th = seventh", eighth: "8th = eighth (note: drop the t from eight)", ninth: "9th = ninth (note: drop the e from nine)", tenth: "10th = tenth", pattern: "Most add -th, but watch spelling changes!", spelling: "five → fifth (f) | eight → eighth (no t) | nine → ninth (no e)" },

      { category: "Numbers 11-20", eleventh: "11th = eleventh", twelfth: "12th = twelfth (note: f not v)", thirteenth: "13th = thirteenth", fourteenth: "14th = fourteenth", fifteenth: "15th = fifteenth", sixteenth: "16th = sixteenth", seventeenth: "17th = seventeenth", eighteenth: "18th = eighteenth", nineteenth: "19th = nineteenth", twentieth: "20th = twentieth (note: y → ie)", spelling: "twelve → twelfth (f) | twenty → twentieth (y changes to ie)" },

      { category: "Numbers 21-100", pattern: "For compound numbers: only change the last digit to ordinal", twenty_one: "21st = twenty-first (not twenty-oneth!)", thirty_second: "32nd = thirty-second", forty_third: "43rd = forty-third", fifty_fourth: "54th = fifty-fourth", ninety_ninth: "99th = ninety-ninth", rule: "Keep the tens digit as cardinal, make ones digit ordinal", examples: "25th = twenty-fifth | 61st = sixty-first | 82nd = eighty-second", remember: "Only the LAST part becomes ordinal!" },

      { category: "Large Ordinals", thirtieth: "30th = thirtieth", fortieth: "40th = fortieth", fiftieth: "50th = fiftieth", sixtieth: "60th = sixtieth", seventieth: "70th = seventieth", eightieth: "80th = eightieth", ninetieth: "90th = ninetieth", one_hundredth: "100th = one hundredth", pattern: "When the number ends in 0, add -th to the whole number", note: "Forty has no 'u' (not fourty)!" },

      { category: "Writing Ordinals - Two Ways", full_word: "Write the full word: first, second, third, fourth, etc.", abbreviation: "Write number + st/nd/rd/th: 1st, 2nd, 3rd, 4th, etc.", dates_written: "May 15th or May 15 or 15th May or 15 May", formal: "In formal writing, spell out: the fifteenth of May", informal: "In informal writing, use abbreviation: May 15th", both_ok: "Both ways are correct!" },

      { category: "Abbreviations (st/nd/rd/th)", st_rule: "Use -st for: 1st, 21st, 31st, 41st, 51st, etc. (ends in 1)", nd_rule: "Use -nd for: 2nd, 22nd, 32nd, 42nd, 52nd, etc. (ends in 2)", rd_rule: "Use -rd for: 3rd, 23rd, 33rd, 43rd, 53rd, etc. (ends in 3)", th_rule: "Use -th for: 4th, 5th, 6th, 7th, 8th, 9th, 10th, 11th-20th, 24th-30th, etc.", pattern: "Look at the LAST DIGIT: 1→st, 2→nd, 3→rd, others→th", exceptions: "11th, 12th, 13th use -th (NOT 11st, 12nd, 13rd!)" },

      { category: "Using Ordinals for DATES", structure: "The + ordinal + of + month OR Month + ordinal", british: "The 15th of May / The first of January", american: "May 15th / January 1st", both: "Both styles are used internationally", saying: "SAY: 'the fifteenth of May' or 'May fifteenth'", writing: "WRITE: May 15th / 15th May / May 15 / 15 May", note: "We always USE ordinals for dates, even if we sometimes write cardinal numbers!" },

      { category: "Asking and Answering About Dates", question_1: "What's the date today? → It's the 10th of October. / It's October 10th.", question_2: "When is your birthday? → It's on the 22nd of July. / My birthday is July 22nd.", question_3: "What's today's date? → Today is the 5th.", preposition: "Use ON with specific dates: on the 15th, on May 3rd, on December 25th", pattern: "It's (on) the + ordinal + of + month", note: "You can drop 'on' in the answer, but it's correct to include it" },

      { category: "Special Dates", new_year: "January 1st = New Year's Day (the first of January)", valentines: "February 14th = Valentine's Day (the fourteenth of February)", christmas: "December 25th = Christmas Day (the twenty-fifth of December)", turkey_republic: "October 29th = Turkish Republic Day (the twenty-ninth of October)", independence_usa: "July 4th = Independence Day (USA) (the fourth of July)", note: "Important dates are often written with ordinals", say_it: "We SAY the ordinal: 'the fourth of July' (not 'July four')" },

      { category: "Ordinals for POSITIONS/RANKINGS", position: "She came first in the race. (1st place)", ranking: "He's the third tallest in the class.", floors: "My office is on the fifth floor. (5th floor)", order: "This is the second time I've been here.", line: "I'm the tenth person in line.", pattern: "Use ordinals to show position or order", note: "Very common in competitions, races, rankings" },

      { category: "Ordinals with THE", rule: "Usually use THE before ordinals", examples: "the first day / the second time / the third floor / the tenth month", with_dates: "the 15th of May / the 1st of January", exception: "No 'the' in American date format: May 15th (not the May 15th)", pattern: "THE + ordinal (in most cases)", remember: "Almost always need 'the' with ordinals!" },

      { category: "Days of the Week", monday: "Monday is the second day of the week. (if Sunday = 1st)", tuesday: "Tuesday is the third day.", wednesday: "Wednesday is the fourth day.", thursday: "Thursday is the fifth day.", friday: "Friday is the sixth day.", saturday: "Saturday is the seventh day.", sunday: "Sunday is the first day (or seventh, depending on culture)", note: "Different cultures start the week on different days!" },

      { category: "Months of the Year", january: "January = 1st month", february: "February = 2nd month", march: "March = 3rd month", april: "April = 4th month", may: "May = 5th month", june: "June = 6th month", july: "July = 7th month", august: "August = 8th month", september: "September = 9th month", october: "October = 10th month", november: "November = 11th month", december: "December = 12th month", question: "What's the fifth month? → May is the fifth month." },

      { category: "Centuries", pattern: "Use ordinals for centuries", examples: "the 21st century (we live in it now: 2000-2099) / the 20th century (1900-1999) / the 19th century (1800-1899)", note: "Add 1 to the first two digits: 2000s = 21st century", turkish: "21. yüzyıl", writing: "Write: 21st century or twenty-first century" },

      { category: "Common Mistakes", mistake_1: "Using cardinal instead of ordinal for dates", wrong_1: "My birthday is May five. ✗ / Today is ten October. ✗", correct_1: "My birthday is May fifth / May 5th. ✓ / Today is the tenth of October. ✓", rule: "Always use ordinals for dates!", remember: "Say and write: the 15th (not the 15)" },
      { category: "Common Mistakes", mistake_2: "Wrong abbreviation", wrong_2: "1th, 2th, 3th ✗ / 21th, 22th, 23th ✗", correct_2: "1st, 2nd, 3rd ✓ / 21st, 22nd, 23rd ✓", rule: "Look at the last digit: 1→st, 2→nd, 3→rd, others→th", exception: "11th, 12th, 13th (NOT 11st!)" },
      { category: "Common Mistakes", mistake_3: "Spelling errors", wrong_3: "fith ✗ / nineth ✗ / twelth ✗", correct_3: "fifth ✓ / ninth ✓ / twelfth ✓", common: "fifth (not fith) | ninth (no e) | twelfth (f not v)", remember: "Check spelling carefully!" },

      { category: "Real-World Uses", birthdays: "My birthday is on the 12th of June.", appointments: "Your appointment is on the 23rd.", schedules: "The meeting is on the 1st of every month.", historical: "World War II ended in the 20th century.", competitions: "She finished third in the marathon.", general: "Essential for dates, positions, and rankings!" },

      { category: "Key Takeaway", summary: "Ordinal numbers show position, order, and sequence", special_three: "1st (first), 2nd (second), 3rd (third) - irregular", pattern: "Most others: number + TH (4th, 5th, 6th...)", abbreviations: "1→st | 2→nd | 3→rd | others→th (but 11th, 12th, 13th!)", dates: "Always use ordinals for dates: May 15th, the 3rd of January", positions: "Use for rankings, floors, order: first place, fifth floor, third time", with_the: "Usually use THE: the first, the second, the tenth", remember: "Ordinals show WHICH ONE in order, not HOW MANY", next: "Practice saying dates and talking about positions!" }
    ]
  },
  
  speakingPractice: [
    { question: "What’s the date today?", answer: "It’s the first of September.", multipleChoice: { prompt: "It’s the ___ of September.", options: [{ letter: "A", text: "first", correct: true }, { letter: "B", text: "one", correct: false }, { letter: "C", text: "second", correct: false }] } },
    { question: "When is your birthday?", answer: "My birthday is on the twenty-second of July.", multipleChoice: { prompt: "My birthday ___ on the twenty-second of July.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "What’s the first month of the year?", answer: "January is the first month.", multipleChoice: { prompt: "January ___ the first month.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What’s the second day of the week?", answer: "Monday is the second day.", multipleChoice: { prompt: "Monday ___ the second day.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "When is New Year’s Day?", answer: "It’s on the first of January.", multipleChoice: { prompt: "It’s on the ___ of January.", options: [{ letter: "A", text: "third", correct: false }, { letter: "B", text: "first", correct: true }, { letter: "C", text: "one", correct: false }] } },
    { question: "What comes after the third?", answer: "The fourth comes after the third.", multipleChoice: { prompt: "The ___ comes after the third.", options: [{ letter: "A", text: "four", correct: false }, { letter: "B", text: "fifth", correct: false }, { letter: "C", text: "fourth", correct: true }] } },
    { question: "When is Christmas?", answer: "It’s on the twenty-fifth of December.", multipleChoice: { prompt: "It’s on the ___ of December.", options: [{ letter: "A", text: "twenty-fifth", correct: true }, { letter: "B", text: "twenty-five", correct: false }, { letter: "C", text: "twentieth", correct: false }] } },
    { question: "What is the tenth month of the year?", answer: "October is the tenth month.", multipleChoice: { prompt: "October ___ the tenth month.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What day is the national holiday?", answer: "It’s on the nineteenth of May.", multipleChoice: { prompt: "It’s on the ___ of May.", options: [{ letter: "A", text: "nineteen", correct: false }, { letter: "B", text: "ninth", correct: false }, { letter: "C", text: "nineteenth", correct: true }] } },
    { question: "What is the fifth day of the week?", answer: "Thursday is the fifth day.", multipleChoice: { prompt: "Thursday ___ the fifth day.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What is your favorite date?", answer: "My favorite date is the fourteenth of February.", multipleChoice: { prompt: "My favorite date ___ the fourteenth of February.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "When is Valentine’s Day?", answer: "It’s on the fourteenth of February.", multipleChoice: { prompt: "It’s on the ___ of February.", options: [{ letter: "A", text: "fourteen", correct: false }, { letter: "B", text: "fortieth", correct: false }, { letter: "C", text: "fourteenth", correct: true }] } },
    { question: "What is the last month of the year?", answer: "December is the last month.", multipleChoice: { prompt: "December ___ the last month.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "When is Republic Day in Turkey?", answer: "It’s on the twenty-ninth of October.", multipleChoice: { prompt: "It’s on the ___ of October.", options: [{ letter: "A", text: "ninth", correct: false }, { letter: "B", text: "twenty-ninth", correct: true }, { letter: "C", text: "twenty-nine", correct: false }] } },
    { question: "What’s the date of the school trip?", answer: "It’s on the fifteenth of May.", multipleChoice: { prompt: "It’s on the ___ of May.", options: [{ letter: "A", text: "fifteen", correct: false }, { letter: "B", text: "fiftieth", correct: false }, { letter: "C", text: "fifteenth", correct: true }] } },
    { question: "What’s the third month of the year?", answer: "March is the third month.", multipleChoice: { prompt: "March ___ the third month.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "When is your exam?", answer: "It’s on the sixth of November.", multipleChoice: { prompt: "It’s on the ___ of November.", options: [{ letter: "A", text: "seventh", correct: false }, { letter: "B", text: "sixth", correct: true }, { letter: "C", text: "six", correct: false }] } },
    { question: "What is the seventh day of the week?", answer: "Sunday is the seventh day.", multipleChoice: { prompt: "Sunday ___ the seventh day.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "When is your meeting?", answer: "It’s on the eighth of August.", multipleChoice: { prompt: "It’s on the ___ of August.", options: [{ letter: "A", text: "eighth", correct: true }, { letter: "B", text: "eight", correct: false }, { letter: "C", text: "ninth", correct: false }] } },
    { question: "What’s the date tomorrow?", answer: "It will be the ninth of August.", multipleChoice: { prompt: "It ___ be the ninth of August.", options: [{ letter: "A", text: "will", correct: true }, { letter: "B", text: "would", correct: false }, { letter: "C", text: "will be", correct: false }] } },
    { question: "What is the second month of the year?", answer: "February is the second month.", multipleChoice: { prompt: "February ___ the second month.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "When is Independence Day in the USA?", answer: "It’s on the fourth of July.", multipleChoice: { prompt: "It’s on the ___ of July.", options: [{ letter: "A", text: "fourth", correct: true }, { letter: "B", text: "four", correct: false }, { letter: "C", text: "third", correct: false }] } },
    { question: "What comes before the tenth?", answer: "The ninth comes before the tenth.", multipleChoice: { prompt: "The ___ comes before the tenth.", options: [{ letter: "A", text: "tenth", correct: false }, { letter: "B", text: "ninth", correct: true }, { letter: "C", text: "nine", correct: false }] } },
    { question: "When is your mother’s birthday?", answer: "It’s on the thirtieth of March.", multipleChoice: { prompt: "It’s on the ___ of March.", options: [{ letter: "A", text: "thirty", correct: false }, { letter: "B", text: "thirteenth", correct: false }, { letter: "C", text: "thirtieth", correct: true }] } },
    { question: "When is the test?", answer: "It’s on the seventeenth of April.", multipleChoice: { prompt: "It’s on the ___ of April.", options: [{ letter: "A", text: "seventeenth", correct: true }, { letter: "B", text: "seventeen", correct: false }, { letter: "C", text: "seventieth", correct: false }] } },
    { question: "What’s the sixth month of the year?", answer: "June is the sixth month.", multipleChoice: { prompt: "June ___ the sixth month.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "When is your best friend’s birthday?", answer: "It’s on the third of January.", multipleChoice: { prompt: "It’s on the ___ of January.", options: [{ letter: "A", text: "three", correct: false }, { letter: "B", text: "fourth", correct: false }, { letter: "C", text: "third", correct: true }] } },
    { question: "What’s the date of the party?", answer: "It’s on the twenty-first of June.", multipleChoice: { prompt: "It’s on the ___ of June.", options: [{ letter: "A", text: "twenty-first", correct: true }, { letter: "B", text: "twenty-one", correct: false }, { letter: "C", text: "twentieth", correct: false }] } },
    { question: "What is the eleventh month of the year?", answer: "November is the eleventh month.", multipleChoice: { prompt: "November ___ the eleventh month.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "When is the concert?", answer: "It’s on the twenty-fourth of September.", multipleChoice: { prompt: "It’s on the ___ of September.", options: [{ letter: "A", text: "twenty-four", correct: false }, { letter: "B", text: "fortieth", correct: false }, { letter: "C", text: "twenty-fourth", correct: true }] } },
    { question: "What is the fourth month of the year?", answer: "April is the fourth month.", multipleChoice: { prompt: "April ___ the fourth month.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "When is International Women’s Day?", answer: "It’s on the eighth of March.", multipleChoice: { prompt: "It’s on the ___ of March.", options: [{ letter: "A", text: "eighteenth", correct: false }, { letter: "B", text: "eighth", correct: true }, { letter: "C", text: "eight", correct: false }] } },
    { question: "What is the ninth month of the year?", answer: "September is the ninth month.", multipleChoice: { prompt: "September ___ the ninth month.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "When is the dentist appointment?", answer: "It’s on the twenty-sixth of August.", multipleChoice: { prompt: "It’s on the ___ of August.", options: [{ letter: "A", text: "twenty-sixth", correct: true }, { letter: "B", text: "twenty-six", correct: false }, { letter: "C", text: "sixtieth", correct: false }] } },
    { question: "What comes after the first?", answer: "The second comes after the first.", multipleChoice: { prompt: "The ___ comes after the first.", options: [{ letter: "A", text: "third", correct: false }, { letter: "B", text: "second", correct: true }, { letter: "C", text: "two", correct: false }] } },
    { question: "What are you doing on the thirteenth of this month?", answer: "I have a dentist appointment.", multipleChoice: { prompt: "I ___ a dentist appointment.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "has", correct: false }] } },
    { question: "When is the next holiday?", answer: "It’s on the twenty-eighth of April.", multipleChoice: { prompt: "It’s on the ___ of April.", options: [{ letter: "A", text: "twenty-eighth", correct: true }, { letter: "B", text: "twenty-eight", correct: false }, { letter: "C", text: "eighteenth", correct: false }] } },
    { question: "What’s the date of the wedding?", answer: "It’s on the sixteenth of July.", multipleChoice: { prompt: "It’s on the ___ of July.", options: [{ letter: "A", text: "sixtieth", correct: false }, { letter: "B", text: "sixteenth", correct: true }, { letter: "C", text: "sixteen", correct: false }] } },
    { question: "What’s the date next Monday?", answer: "It’s the nineteenth of August.", multipleChoice: { prompt: "It’s the ___ of August.", options: [{ letter: "A", text: "nineteen", correct: false }, { letter: "B", text: "ninetieth", correct: false }, { letter: "C", text: "nineteenth", correct: true }] } },
    { question: "What’s the eighth month of the year?", answer: "August is the eighth month.", multipleChoice: { prompt: "August ___ the eighth month.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
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

  table: {
    title: "📋 Telling the Time (o'clock, half past, quarter past/to)",
    data: [
      { category: "What is Telling the Time?", explanation: "Essential skill to say what time it is and when things happen", turkish: "Saati söylemek", function: "Answer 'What time is it?' and schedule activities", question: "What time is it? (Saat kaç?)", note: "One of the most common questions in daily life!" },

      { category: "The Basic Question", question: "What time is it? (Saat kaç?)", also_ask: "What's the time? / Do you have the time?", answer_pattern: "It's + time expression", examples: "It's 3 o'clock. / It's half past four. / It's quarter to nine.", note: "Always start with 'It's' when telling the time" },

      { category: "O'CLOCK - Exact Hours", use: "For exact hours only (1:00, 2:00, 3:00, etc.)", pattern: "It's + number + o'clock", examples: "It's 1 o'clock. / It's 5 o'clock. / It's 12 o'clock.", turkish: "Tam saat", meaning: "'O'clock' means 'of the clock'", when: "ONLY use o'clock when minutes = :00", wrong: "It's 3:15 o'clock ✗", correct: "It's 3 o'clock ✓ (only for 3:00)" },
      { category: "O'CLOCK - Examples", one: "1:00 = It's one o'clock", three: "3:00 = It's three o'clock", seven: "7:00 = It's seven o'clock", ten: "10:00 = It's ten o'clock", twelve: "12:00 = It's twelve o'clock", note: "Don't say 'It's three o'clocks' - no -s!", remember: "O'clock is ONLY for :00 times!" },

      { category: "HALF PAST - 30 Minutes", use: "When the time is :30 (30 minutes past the hour)", pattern: "It's half past + hour", examples: "It's half past 4. (4:30) / It's half past 7. (7:30) / It's half past 11. (11:30)", turkish: "Yarım geçe, buçuk", meaning: "30 minutes = half an hour, so 'half past'", visualization: "Think: halfway to the next hour", american: "Americans often say 'four thirty' instead" },
      { category: "HALF PAST - Examples", four_thirty: "4:30 = It's half past four", six_thirty: "6:30 = It's half past six", nine_thirty: "9:30 = It's half past nine", twelve_thirty: "12:30 = It's half past twelve", note: "Say the hour BEFORE 30 minutes (not after)", wrong: "half past five (for 4:30) ✗", correct: "half past four (for 4:30) ✓" },

      { category: "QUARTER PAST - 15 Minutes", use: "When the time is :15 (15 minutes past the hour)", pattern: "It's quarter past + hour", examples: "It's quarter past 3. (3:15) / It's quarter past 8. (8:15) / It's quarter past 10. (10:15)", turkish: "Çeyrek geçe", meaning: "15 minutes = quarter of an hour (1/4 = 25%)", visualization: "First quarter of the hour has passed", american: "Americans often say 'three fifteen' instead" },
      { category: "QUARTER PAST - Examples", three_fifteen: "3:15 = It's quarter past three", seven_fifteen: "7:15 = It's quarter past seven", nine_fifteen: "9:15 = It's quarter past nine", eleven_fifteen: "11:15 = It's quarter past eleven", note: "Use 'quarter past' (not 'a quarter past' - though both are acceptable)", remember: "PAST = after the hour" },

      { category: "QUARTER TO - 45 Minutes (15 to next hour)", use: "When the time is :45 (15 minutes to the next hour)", pattern: "It's quarter to + NEXT hour", examples: "It's quarter to 5. (4:45) / It's quarter to 9. (8:45) / It's quarter to 12. (11:45)", turkish: "Çeyrek kala", meaning: "15 minutes remain before the next hour", visualization: "Quarter of an hour left until the next hour", important: "Use the NEXT hour, not the current one!" },
      { category: "QUARTER TO - Examples & IMPORTANT!", four_fortyfive: "4:45 = It's quarter to FIVE (not quarter to four!)", eight_fortyfive: "8:45 = It's quarter to NINE", eleven_fortyfive: "11:45 = It's quarter to TWELVE", wrong: "4:45 = quarter to four ✗", correct: "4:45 = quarter to five ✓", rule: "Always say the NEXT hour coming up!", remember: "TO = towards the next hour, so use next hour's number" },

      { category: "Summary Chart", exact_hour: ":00 → o'clock (It's 3 o'clock)", fifteen_past: ":15 → quarter past (It's quarter past 3)", thirty_past: ":30 → half past (It's half past 3)", fortyfive_to: ":45 → quarter to [NEXT hour] (It's quarter to 4)", remember: "4 main time expressions to master!", note: "These are the most common ways to tell time in British English" },

      { category: "Other Minutes (More Advanced)", pattern: "minutes + past/to + hour", past_examples: "5:10 = ten past five / 6:20 = twenty past six", to_examples: "4:50 = ten to five / 7:40 = twenty to eight", rule: "0-30 minutes: use PAST | 31-59 minutes: use TO", note: "For now, focus on o'clock, half past, quarter past/to", american: "Americans say '5:10' as 'five ten', '4:50' as 'four fifty'" },

      { category: "AM vs PM", am: "AM (ante meridiem) = morning (12:00 midnight - 11:59 AM)", pm: "PM (post meridiem) = afternoon/evening/night (12:00 noon - 11:59 PM)", examples: "It's 8 o'clock in the morning. / It's 3 PM. / It's 7 o'clock in the evening.", morning: "7:00 AM = seven o'clock in the morning", evening: "7:00 PM = seven o'clock in the evening", note: "In conversation, add 'in the morning/afternoon/evening' for clarity" },

      { category: "Asking About Scheduled Times", what_time: "What time does the bus arrive? → It arrives at quarter past 8.", when: "When is your appointment? → It's at half past 2.", at: "Use AT for specific times: at 3 o'clock, at half past 5, at quarter to 7", examples: "The class starts at 9 o'clock. / Lunch is at half past 12. / The movie begins at quarter to 8.", preposition: "Always use AT with times!" },

      { category: "Common Daily Times", morning: "7:00 = wake up time / 8:00 = school/work starts", midday: "12:00 = noon, lunch time / 12:30 = half past twelve", afternoon: "3:00 = school finishes / 5:00 = evening starts", night: "7:00 = dinner time / 10:00 = bedtime / 12:00 = midnight", note: "These times vary by culture and person!" },

      { category: "Digital vs Spoken Time", digital: "We write: 3:00, 4:30, 7:15, 8:45", spoken: "We say: three o'clock, half past four, quarter past seven, quarter to nine", note: "Digital uses numbers, spoken uses words", examples: "Clock shows 4:30 → Say 'It's half past four' / Clock shows 8:45 → Say 'It's quarter to nine'", remember: "When speaking, use the time expressions!" },

      { category: "British vs American English", british: "Half past four / Quarter past seven / Quarter to nine", american: "Four thirty / Seven fifteen / Eight forty-five", both_understood: "Both styles are understood internationally", note: "This module teaches British style, but American is also common", tip: "Learn British first (half past, quarter past/to), then American is easy!" },

      { category: "Common Mistakes", mistake_1: "Using o'clock with minutes", wrong_1: "It's 3:30 o'clock ✗ / It's quarter past 5 o'clock ✗", correct_1: "It's half past 3 ✓ / It's quarter past 5 ✓", rule: "O'clock ONLY for exact hours (:00)", remember: "No o'clock with half/quarter!" },
      { category: "Common Mistakes", mistake_2: "Wrong hour with 'quarter to'", wrong_2: "8:45 = quarter to eight ✗", correct_2: "8:45 = quarter to NINE ✓", rule: "'To' means moving TOWARDS the next hour", remember: "8:45 is almost 9, so quarter to nine!" },
      { category: "Common Mistakes", mistake_3: "Forgetting 'past' or 'to'", wrong_3: "It's half four ✗ / It's quarter seven ✗", correct_3: "It's half PAST four ✓ / It's quarter PAST seven ✓", rule: "Always include 'past' or 'to' in the expression", note: "In informal British, 'half four' is used, but learn the full form first!" },

      { category: "Real-World Uses", daily_life: "What time is breakfast? → It's at 8 o'clock.", appointments: "My dentist appointment is at quarter past 2.", schedules: "The train leaves at half past 6.", asking: "What time does the class start? → It starts at 9 o'clock.", telling: "What time is it? → It's quarter to 5.", general: "Essential for scheduling, appointments, and daily routines!" },

      { category: "Key Takeaway", summary: "Four main time expressions for telling the time", oclock: "O'CLOCK = exact hours (:00) → 3 o'clock", half_past: "HALF PAST = :30 → half past 4", quarter_past: "QUARTER PAST = :15 → quarter past 7", quarter_to: "QUARTER TO = :45 → quarter to 9 (NEXT hour!)", question: "What time is it? → It's + time expression", at: "Use AT for scheduled times: at 3 o'clock, at half past 5", remember: "Master these 4 expressions and you can tell most common times!", next: "Practice reading clocks and saying the time out loud!" }
    ]
  },
  
  speakingPractice: [
    { question: "What time does the store open?", answer: "It opens at 10 o’clock.", multipleChoice: { prompt: "It opens at 10 ___.", options: [{ letter: "A", text: "o’clock", correct: true }, { letter: "B", text: "hour", correct: false }, { letter: "C", text: "minute", correct: false }] } },
    { question: "What time is it now?", answer: "It’s half past 4.", multipleChoice: { prompt: "___ half past 4.", options: [{ letter: "A", text: "it’ing", correct: false }, { letter: "B", text: "it’", correct: false }, { letter: "C", text: "it’s", correct: true }] } },
    { question: "What time do you get up?", answer: "I get up at 7 o’clock.", multipleChoice: { prompt: "I get ___ at 7 o’clock.", options: [{ letter: "A", text: "down", correct: false }, { letter: "B", text: "off", correct: false }, { letter: "C", text: "up", correct: true }] } },
    { question: "What time do you go to bed?", answer: "I go to bed at 10 o’clock.", multipleChoice: { prompt: "I ___ to bed at 10 o’clock.", options: [{ letter: "A", text: "goes", correct: false }, { letter: "B", text: "goed", correct: false }, { letter: "C", text: "go", correct: true }] } },
    { question: "What time is your English class?", answer: "It’s at quarter past 9.", multipleChoice: { prompt: "It’s at ___ past 9.", options: [{ letter: "A", text: "third", correct: false }, { letter: "B", text: "quarter", correct: true }, { letter: "C", text: "half", correct: false }] } },
    { question: "When do you have breakfast?", answer: "I have breakfast at 8 o’clock.", multipleChoice: { prompt: "I ___ breakfast at 8 o’clock.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "has", correct: false }] } },
    { question: "What time is lunch?", answer: "Lunch is at half past 12.", multipleChoice: { prompt: "Lunch ___ at half past 12.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What time is dinner?", answer: "Dinner is at quarter to 8.", multipleChoice: { prompt: "Dinner ___ at quarter to 8.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Is it 5 o’clock?", answer: "No, it’s quarter past 5.", multipleChoice: { prompt: "No, ___ quarter past 5.", options: [{ letter: "A", text: "it’ing", correct: false }, { letter: "B", text: "it’s", correct: true }, { letter: "C", text: "it’", correct: false }] } },
    { question: "What time do you leave home?", answer: "I leave home at 8 o’clock.", multipleChoice: { prompt: "I ___ home at 8 o’clock.", options: [{ letter: "A", text: "leave", correct: true }, { letter: "B", text: "leaves", correct: false }, { letter: "C", text: "leaving", correct: false }] } },
    { question: "What time does the film start?", answer: "It starts at 6 o’clock.", multipleChoice: { prompt: "It ___ at 6 o’clock.", options: [{ letter: "A", text: "starting", correct: false }, { letter: "B", text: "starts", correct: true }, { letter: "C", text: "start", correct: false }] } },
    { question: "When does school finish?", answer: "School finishes at half past 3.", multipleChoice: { prompt: "School finishes at ___ past 3.", options: [{ letter: "A", text: "quarter", correct: false }, { letter: "B", text: "third", correct: false }, { letter: "C", text: "half", correct: true }] } },
    { question: "What time do you start work?", answer: "I start work at 9 o’clock.", multipleChoice: { prompt: "I ___ work at 9 o’clock.", options: [{ letter: "A", text: "start", correct: true }, { letter: "B", text: "starts", correct: false }, { letter: "C", text: "starting", correct: false }] } },
    { question: "When is your appointment?", answer: "It’s at quarter to 2.", multipleChoice: { prompt: "It’s at ___ to 2.", options: [{ letter: "A", text: "third", correct: false }, { letter: "B", text: "quarter", correct: true }, { letter: "C", text: "half", correct: false }] } },
    { question: "What time is the meeting?", answer: "It’s at quarter past 11.", multipleChoice: { prompt: "It’s at ___ past 11.", options: [{ letter: "A", text: "half", correct: false }, { letter: "B", text: "third", correct: false }, { letter: "C", text: "quarter", correct: true }] } },
    { question: "Is it half past 2?", answer: "No, it’s quarter to 3.", multipleChoice: { prompt: "No, it’s ___ to 3.", options: [{ letter: "A", text: "quarter", correct: true }, { letter: "B", text: "half", correct: false }, { letter: "C", text: "third", correct: false }] } },
    { question: "What time is your favorite TV show?", answer: "It’s at 7 o’clock.", multipleChoice: { prompt: "It’s at 7 ___.", options: [{ letter: "A", text: "minute", correct: false }, { letter: "B", text: "o’clock", correct: true }, { letter: "C", text: "hour", correct: false }] } },
    { question: "Do you wake up at 6 o’clock?", answer: "No, I wake up at half past 6.", multipleChoice: { prompt: "No, I wake ___ at half past 6.", options: [{ letter: "A", text: "up", correct: true }, { letter: "B", text: "down", correct: false }, { letter: "C", text: "off", correct: false }] } },
    { question: "Is the class at quarter to 10?", answer: "Yes, it is.", multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "What time do you go shopping?", answer: "I go shopping at 5 o’clock.", multipleChoice: { prompt: "I ___ shopping at 5 o’clock.", options: [{ letter: "A", text: "go", correct: true }, { letter: "B", text: "goes", correct: false }, { letter: "C", text: "goed", correct: false }] } },
    { question: "What time is your piano lesson?", answer: "It’s at quarter past 4.", multipleChoice: { prompt: "It’s at ___ past 4.", options: [{ letter: "A", text: "half", correct: false }, { letter: "B", text: "third", correct: false }, { letter: "C", text: "quarter", correct: true }] } },
    { question: "When do you go running?", answer: "I go running at 6 o’clock.", multipleChoice: { prompt: "I ___ running at 6 o’clock.", options: [{ letter: "A", text: "goes", correct: false }, { letter: "B", text: "goed", correct: false }, { letter: "C", text: "go", correct: true }] } },
    { question: "Is it 9 o’clock now?", answer: "No, it’s half past 9.", multipleChoice: { prompt: "No, ___ half past 9.", options: [{ letter: "A", text: "it’", correct: false }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’s", correct: true }] } },
    { question: "What time is your break?", answer: "It’s at 10 o’clock.", multipleChoice: { prompt: "It’s at 10 ___.", options: [{ letter: "A", text: "hour", correct: false }, { letter: "B", text: "minute", correct: false }, { letter: "C", text: "o’clock", correct: true }] } },
    { question: "What time does the bus arrive?", answer: "It arrives at quarter to 1.", multipleChoice: { prompt: "It ___ at quarter to 1.", options: [{ letter: "A", text: "arrives", correct: true }, { letter: "B", text: "arrive", correct: false }, { letter: "C", text: "arriving", correct: false }] } },
    { question: "When is your birthday party?", answer: "It’s at 3 o’clock.", multipleChoice: { prompt: "It’s at 3 ___.", options: [{ letter: "A", text: "minute", correct: false }, { letter: "B", text: "o’clock", correct: true }, { letter: "C", text: "hour", correct: false }] } },
    { question: "What time do you get home?", answer: "I get home at 4 o’clock.", multipleChoice: { prompt: "I ___ home at 4 o’clock.", options: [{ letter: "A", text: "got", correct: false }, { letter: "B", text: "getting", correct: false }, { letter: "C", text: "get", correct: true }] } },
    { question: "Do you go to school at 7?", answer: "No, I go at half past 7.", multipleChoice: { prompt: "No, I ___ at half past 7.", options: [{ letter: "A", text: "goes", correct: false }, { letter: "B", text: "goed", correct: false }, { letter: "C", text: "go", correct: true }] } },
    { question: "What time is your doctor’s appointment?", answer: "It’s at quarter past 2.", multipleChoice: { prompt: "It’s at ___ past 2.", options: [{ letter: "A", text: "third", correct: false }, { letter: "B", text: "quarter", correct: true }, { letter: "C", text: "half", correct: false }] } },
    { question: "Is lunch at quarter past 1?", answer: "Yes, it is.", multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "When do you watch TV?", answer: "I watch TV at 8 o’clock.", multipleChoice: { prompt: "I ___ TV at 8 o’clock.", options: [{ letter: "A", text: "watch", correct: true }, { letter: "B", text: "watched", correct: false }, { letter: "C", text: "watches", correct: false }] } },
    { question: "What time does the game start?", answer: "It starts at half past 6.", multipleChoice: { prompt: "It starts at ___ past 6.", options: [{ letter: "A", text: "third", correct: false }, { letter: "B", text: "half", correct: true }, { letter: "C", text: "quarter", correct: false }] } },
    { question: "What time do you study English?", answer: "I study at quarter to 5.", multipleChoice: { prompt: "I ___ at quarter to 5.", options: [{ letter: "A", text: "studyed", correct: false }, { letter: "B", text: "study", correct: true }, { letter: "C", text: "studies", correct: false }] } },
    { question: "Is your train at 10 o’clock?", answer: "No, it’s at quarter past 10.", multipleChoice: { prompt: "No, it’s at ___ past 10.", options: [{ letter: "A", text: "quarter", correct: true }, { letter: "B", text: "half", correct: false }, { letter: "C", text: "third", correct: false }] } },
    { question: "When do you do your homework?", answer: "I do it at 6 o’clock.", multipleChoice: { prompt: "I ___ it at 6 o’clock.", options: [{ letter: "A", text: "doed", correct: false }, { letter: "B", text: "do", correct: true }, { letter: "C", text: "does", correct: false }] } },
    { question: "What time do you eat breakfast?", answer: "I eat at 7 o’clock.", multipleChoice: { prompt: "I ___ at 7 o’clock.", options: [{ letter: "A", text: "eats", correct: false }, { letter: "B", text: "eating", correct: false }, { letter: "C", text: "eat", correct: true }] } },
    { question: "What time do you call your friend?", answer: "I call her at half past 8.", multipleChoice: { prompt: "I call her at ___ past 8.", options: [{ letter: "A", text: "half", correct: true }, { letter: "B", text: "quarter", correct: false }, { letter: "C", text: "third", correct: false }] } },
    { question: "Is it quarter to 7 now?", answer: "Yes, it is.", multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "What time do you go to the gym?", answer: "I go at quarter past 6.", multipleChoice: { prompt: "I ___ at quarter past 6.", options: [{ letter: "A", text: "goes", correct: false }, { letter: "B", text: "go", correct: true }, { letter: "C", text: "goed", correct: false }] } },
    { question: "When is the class over?", answer: "It’s over at 12 o’clock.", multipleChoice: { prompt: "It’s over at 12 ___.", options: [{ letter: "A", text: "o’clock", correct: true }, { letter: "B", text: "hour", correct: false }, { letter: "C", text: "minute", correct: false }] } },
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

  table: {
    title: "📋 Comparatives (-er / more) - Comparing Two Things",
    data: [
      { category: "What are Comparatives?", explanation: "Adjectives used to compare TWO people, animals, or things", turkish: "Karşılaştırma sıfatları", function: "Show that one thing has more/less of a quality than another", examples: "She is taller than me. / This book is more interesting than that one. / A car is faster than a bike.", note: "Always comparing TWO things!" },

      { category: "The Pattern", rule: "Two ways to form comparatives based on adjective length", short_adjectives: "Short adjectives: add -ER + than", long_adjectives: "Long adjectives: MORE + adjective + than", key_word: "THAN (comparison word)", structure: "Subject + verb + comparative + THAN + object", remember: "Always use THAN when making comparisons!" },

      { category: "Short Adjectives - Definition", what: "1-syllable adjectives (one beat when you say them)", examples: "tall, big, small, fast, slow, old, new, hot, cold, long, short", also_short: "2-syllable adjectives ending in -y", examples_y: "happy, easy, busy, funny, pretty, dirty, noisy, healthy, wealthy", rule: "Add -ER to make comparative", turkish: "Kısa sıfatlar + -er" },
      { category: "Short Adjectives - Formation", rule: "Add -ER to the adjective", examples: "tall → taller / fast → faster / old → older / new → newer / cheap → cheaper / clean → cleaner", pattern: "adjective + -ER + than", sentences: "He is taller than me. / This car is faster than that one. / My phone is newer than yours.", note: "Simple pattern for 1-syllable words!" },

      { category: "Long Adjectives - Definition", what: "2+ syllable adjectives (two or more beats)", examples: "beautiful, expensive, interesting, difficult, comfortable, important, dangerous, popular, exciting", not_y: "2-syllable adjectives NOT ending in -y", rule: "Use MORE before the adjective", turkish: "Uzun sıfatlar + more" },
      { category: "Long Adjectives - Formation", rule: "Put MORE before the adjective", examples: "beautiful → more beautiful / expensive → more expensive / interesting → more interesting / difficult → more difficult", pattern: "MORE + adjective + than", sentences: "She is more beautiful than her sister. / This book is more interesting than that one.", note: "Don't add -ER to long adjectives!", wrong: "beautifuler ✗ / interestinger ✗", correct: "more beautiful ✓ / more interesting ✓" },

      { category: "Spelling Rules - Adding -ER", rule_1: "Most adjectives: just add -er", examples_1: "tall → taller, fast → faster, old → older, new → newer, small → smaller", rule_2: "Adjectives ending in -e: add -r only", examples_2: "nice → nicer, large → larger, safe → safer, wide → wider", rule_3: "Adjectives ending in consonant-vowel-consonant: double last letter + -er", examples_3: "big → bigger, hot → hotter, fat → fatter, thin → thinner, wet → wetter", rule_4: "Adjectives ending in -y: change y to i + -er", examples_4: "happy → happier, easy → easier, busy → busier, funny → funnier, pretty → prettier" },

      { category: "Irregular Comparatives - MEMORIZE!", good: "good → BETTER (NOT gooder ✗)", bad: "bad → WORSE (NOT badder ✗)", far: "far → FARTHER or FURTHER", much_many: "much/many → MORE", little: "little → LESS", note: "These don't follow the normal rules - you must memorize them!", examples: "This pizza is better than that one. / Today is worse than yesterday. / London is farther than Paris (from here).", important: "NEVER say 'more good' or 'more bad' - always 'better' and 'worse'!" },

      { category: "Using THAN", rule: "THAN connects the two things being compared", pattern: "X is comparative + THAN + Y", examples: "I am taller than you. / She is smarter than him. / This is easier than that.", pronunciation: "THAN /ðæn/ (NOT 'then' which means 'after that')", note: "You can't make comparisons without THAN!", wrong: "I am taller you ✗ / She is better me ✗", correct: "I am taller than you ✓ / She is better than me ✓" },

      { category: "Than + Object Pronouns", rule: "After THAN, use object pronouns (me, you, him, her, us, them)", examples: "She is taller than ME. / He is older than HER. / They are richer than US.", formal: "In very formal English, you can say: 'She is taller than I am.'", informal: "In everyday speech, say: 'She is taller than me.'", both_ok: "Both are correct, but 'than me' is more common!", note: "Don't worry too much - both forms are acceptable" },

      { category: "Common Short Adjectives", one_syllable: "big → bigger, small → smaller, tall → taller, short → shorter, long → longer, fast → faster, slow → slower, high → higher, low → lower, young → younger, old → older, new → newer, hot → hotter, cold → colder, cheap → cheaper, clean → cleaner, dark → darker, light → lighter, strong → stronger, weak → weaker", two_syllable_y: "happy → happier, easy → easier, busy → busier, funny → funnier, pretty → prettier, ugly → uglier, dirty → dirtier, early → earlier, healthy → healthier" },

      { category: "Common Long Adjectives", two_plus_syllables: "beautiful → more beautiful, expensive → more expensive, interesting → more interesting, difficult → more difficult, comfortable → more comfortable, important → more important, dangerous → more dangerous, popular → more popular, exciting → more exciting, boring → more boring, famous → more famous, careful → more careful, useful → more useful, modern → more modern, crowded → more crowded" },

      { category: "Comparing People", examples: "John is taller than Mary. / My sister is younger than me. / He is more intelligent than his brother. / She is funnier than her friend.", note: "Very common to compare people's qualities!", topics: "age, height, appearance, personality, skills", remember: "Use comparatives to describe differences between people" },
      { category: "Comparing Things", examples: "This car is faster than that one. / Summer is hotter than winter. / My phone is more expensive than yours. / This book is more interesting than that one.", note: "Compare objects, seasons, possessions, etc.", topics: "price, size, quality, features, performance", remember: "Than that one / than mine / than yours" },

      { category: "Making Negative Comparisons", pattern: "X is less + adjective + than Y", examples: "This is less expensive than that. (= cheaper) / He is less tall than me. (= shorter) / This is less difficult than I thought. (= easier)", note: "LESS is the opposite of MORE", use: "Less common than using opposite adjectives", better: "Instead of 'less tall' → say 'shorter' | Instead of 'less hot' → say 'colder'" },

      { category: "Comparing with Numbers/Measurements", with_number: "Add specific measurements to comparisons", examples: "She is 5 cm taller than me. / This car is 10% faster than that one. / My house is 20 years older than yours.", pattern: "comparative + specific amount + than", note: "Makes comparisons more precise!", useful: "Very useful for facts, data, and descriptions" },

      { category: "Much/A lot + Comparative", rule: "Use MUCH or A LOT before comparatives for emphasis", examples: "This is MUCH better than that. / She is A LOT taller than me. / It's MUCH more expensive than I thought.", meaning: "Emphasizes the difference is big", pattern: "much/a lot + comparative + than", note: "Makes your comparison stronger!", wrong: "very bigger ✗ / very more expensive ✗", correct: "much bigger ✓ / much more expensive ✓" },

      { category: "A bit/A little + Comparative", rule: "Use A BIT or A LITTLE before comparatives for small differences", examples: "This is A BIT better than that. / She is A LITTLE taller than me. / It's A LITTLE more expensive.", meaning: "Shows the difference is small", pattern: "a bit/a little + comparative + than", note: "Softens the comparison", use: "Polite way to make comparisons" },

      { category: "Common Mistakes", mistake_1: "Using -er with long adjectives", wrong_1: "more beautifuler ✗ / expensiver ✗ / interestinger ✗", correct_1: "more beautiful ✓ / more expensive ✓ / more interesting ✓", rule: "Long adjectives use MORE, not -er", remember: "If it has 2+ syllables (not ending in -y), use MORE" },
      { category: "Common Mistakes", mistake_2: "Forgetting to double consonant", wrong_2: "biger ✗ / hoter ✗ / thiner ✗", correct_2: "bigger ✓ / hotter ✓ / thinner ✓", rule: "CVC pattern = double last letter", check: "big = b (consonant) + i (vowel) + g (consonant) → double g!" },
      { category: "Common Mistakes", mistake_3: "Using MORE with irregular comparatives", wrong_3: "more good ✗ / more bad ✗ / more better ✗", correct_3: "better ✓ / worse ✓ / much better ✓", rule: "Irregular comparatives don't use MORE", remember: "good → better | bad → worse (NOT more good/more bad)" },
      { category: "Common Mistakes", mistake_4: "Forgetting THAN", wrong_4: "She is taller me ✗ / This is better that ✗", correct_4: "She is taller than me ✓ / This is better than that ✓", rule: "Must use THAN to compare!", remember: "comparative + THAN + second thing" },

      { category: "Real-World Uses", shopping: "This dress is cheaper than that one. / This phone is better than my old one.", opinions: "I think summer is better than winter. / Football is more exciting than basketball.", descriptions: "My city is bigger than yours. / This test was easier than the last one.", decisions: "This option is more expensive but better quality.", general: "Essential for expressing preferences, making choices, and describing differences!" },

      { category: "Key Takeaway", summary: "Comparatives compare TWO things using -er or more", short_rule: "Short adjectives (1 syllable, or 2 ending in -y) → add -ER", long_rule: "Long adjectives (2+ syllables, not -y) → use MORE", pattern: "comparative + THAN", irregulars: "good → better | bad → worse | far → farther/further", spelling: "Double consonant: big → bigger | Change y→i: happy → happier", emphasis: "much/a lot + comparative (big difference) | a bit/a little + comparative (small difference)", remember: "Always use THAN when comparing! Never say 'more good' - say 'better'!", next: "Practice comparing things around you!" }
    ]
  },
  
  speakingPractice: [
    { question: "Who is taller, you or your friend?", answer: "My friend is taller than me.", multipleChoice: { prompt: "My friend is ___ than me.", options: [{ letter: "A", text: "tallest", correct: false }, { letter: "B", text: "tall", correct: false }, { letter: "C", text: "taller", correct: true }] } },
    { question: "Is your house bigger than your school?", answer: "No, my school is bigger than my house.", multipleChoice: { prompt: "No, my school is ___ than my house.", options: [{ letter: "A", text: "biggest", correct: false }, { letter: "B", text: "bigg", correct: false }, { letter: "C", text: "bigger", correct: true }] } },
    { question: "Is English easier than Chinese?", answer: "Yes, English is easier than Chinese.", multipleChoice: { prompt: "Yes, English ___ easier than Chinese.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Which is more expensive, a car or a bicycle?", answer: "A car is more expensive than a bicycle.", multipleChoice: { prompt: "A car ___ more expensive than a bicycle.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Who is funnier, your dad or your mom?", answer: "My dad is funnier than my mom.", multipleChoice: { prompt: "My dad ___ funnier than my mom.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Is summer hotter than winter?", answer: "Yes, summer is hotter than winter.", multipleChoice: { prompt: "Yes, summer ___ hotter than winter.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Which is more comfortable, a sofa or a chair?", answer: "A sofa is more comfortable than a chair.", multipleChoice: { prompt: "A sofa ___ more comfortable than a chair.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are cats quieter than dogs?", answer: "Yes, cats are quieter than dogs.", multipleChoice: { prompt: "Yes, cats ___ quieter than dogs.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "Is a plane faster than a train?", answer: "Yes, a plane is faster than a train.", multipleChoice: { prompt: "Yes, a plane is ___ than a train.", options: [{ letter: "A", text: "fastest", correct: false }, { letter: "B", text: "faster", correct: true }, { letter: "C", text: "fast", correct: false }] } },
    { question: "Who is older, you or your brother?", answer: "My brother is older than me.", multipleChoice: { prompt: "My brother ___ older than me.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Is your bag heavier than mine?", answer: "Yes, my bag is heavier.", multipleChoice: { prompt: "Yes, my bag ___ heavier.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Is football more popular than volleyball?", answer: "Yes, football is more popular.", multipleChoice: { prompt: "Yes, football ___ more popular.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Is chocolate sweeter than lemon?", answer: "Yes, chocolate is sweeter.", multipleChoice: { prompt: "Yes, chocolate ___ sweeter.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Is a lion more dangerous than a cat?", answer: "Yes, a lion is more dangerous.", multipleChoice: { prompt: "Yes, a lion ___ more dangerous.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Is your phone newer than mine?", answer: "No, my phone is older.", multipleChoice: { prompt: "No, my phone ___ older.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Is your town bigger than Istanbul?", answer: "No, Istanbul is bigger.", multipleChoice: { prompt: "No, Istanbul ___ bigger.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Which is more interesting, history or math?", answer: "History is more interesting.", multipleChoice: { prompt: "History ___ more interesting.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Is your room cleaner than your brother’s?", answer: "Yes, my room is cleaner.", multipleChoice: { prompt: "Yes, my room ___ cleaner.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Is running more tiring than walking?", answer: "Yes, running is more tiring.", multipleChoice: { prompt: "Yes, running ___ more tiring.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Is this movie longer than the last one?", answer: "Yes, it’s longer.", multipleChoice: { prompt: "Yes, ___ longer.", options: [{ letter: "A", text: "it’s", correct: true }, { letter: "B", text: "it’", correct: false }, { letter: "C", text: "it’ing", correct: false }] } },
    { question: "Is English more useful than Latin?", answer: "Yes, it’s more useful.", multipleChoice: { prompt: "Yes, ___ more useful.", options: [{ letter: "A", text: "it’", correct: false }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’s", correct: true }] } },
    { question: "Is your laptop lighter than your friend’s?", answer: "Yes, it’s lighter.", multipleChoice: { prompt: "Yes, ___ lighter.", options: [{ letter: "A", text: "it’", correct: false }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’s", correct: true }] } },
    { question: "Who is younger, you or your cousin?", answer: "I’m younger than my cousin.", multipleChoice: { prompt: "I’m ___ than my cousin.", options: [{ letter: "A", text: "youngest", correct: false }, { letter: "B", text: "younger", correct: true }, { letter: "C", text: "young", correct: false }] } },
    { question: "Which is more exciting, traveling or staying home?", answer: "Traveling is more exciting.", multipleChoice: { prompt: "Traveling ___ more exciting.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is this chair more comfortable than that one?", answer: "Yes, it’s more comfortable.", multipleChoice: { prompt: "Yes, ___ more comfortable.", options: [{ letter: "A", text: "it’ing", correct: false }, { letter: "B", text: "it’", correct: false }, { letter: "C", text: "it’s", correct: true }] } },
    { question: "Is your dog noisier than your neighbor’s dog?", answer: "Yes, he’s noisier.", multipleChoice: { prompt: "Yes, ___ noisier.", options: [{ letter: "A", text: "he’ing", correct: false }, { letter: "B", text: "he’", correct: false }, { letter: "C", text: "he’s", correct: true }] } },
    { question: "Which is healthier, fruit or candy?", answer: "Fruit is healthier.", multipleChoice: { prompt: "Fruit ___ healthier.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is this math problem harder than the last one?", answer: "Yes, it’s harder.", multipleChoice: { prompt: "Yes, ___ harder.", options: [{ letter: "A", text: "it’", correct: false }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’s", correct: true }] } },
    { question: "Is gold more valuable than silver?", answer: "Yes, gold is more valuable.", multipleChoice: { prompt: "Yes, gold ___ more valuable.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Are you busier this week than last week?", answer: "Yes, I’m busier.", multipleChoice: { prompt: "Yes, I’m ___.", options: [{ letter: "A", text: "busy", correct: false }, { letter: "B", text: "busiest", correct: false }, { letter: "C", text: "busier", correct: true }] } },
    { question: "Is this shirt cheaper than that one?", answer: "Yes, it’s cheaper.", multipleChoice: { prompt: "Yes, ___ cheaper.", options: [{ letter: "A", text: "it’s", correct: true }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’", correct: false }] } },
    { question: "Is your car faster than your friend’s?", answer: "No, his car is faster.", multipleChoice: { prompt: "No, his car ___ faster.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Is your street quieter than the main road?", answer: "Yes, it is.", multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is it colder today than yesterday?", answer: "Yes, it’s colder.", multipleChoice: { prompt: "Yes, ___ colder.", options: [{ letter: "A", text: "it’ing", correct: false }, { letter: "B", text: "it’s", correct: true }, { letter: "C", text: "it’", correct: false }] } },
    { question: "Is reading more relaxing than working?", answer: "Yes, it is.", multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is your sister more intelligent than her classmates?", answer: "Yes, she is.", multipleChoice: { prompt: "Yes, she ___.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is January colder than March?", answer: "Yes, it is.", multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Is your job more stressful than mine?", answer: "Yes, it is.", multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Is this building taller than the one next to it?", answer: "Yes, it is.", multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Is it more difficult to learn German than English?", answer: "Yes, it is.", multipleChoice: { prompt: "Yes, it ___.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
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

  table: {
    title: "📋 Superlatives (the -est / the most) - The Extreme Degree",
    data: [
      { category: "What are Superlatives?", explanation: "Adjectives used to show the HIGHEST or LOWEST degree in a group of 3+ things", turkish: "Üstünlük derecesi", function: "Show that one thing is #1 (the best, the worst, the biggest, etc.) in a group", examples: "She is the tallest in the class. / This is the most beautiful city. / He's the best player on the team.", note: "Superlatives show the EXTREME - the maximum or minimum!" },

      { category: "Comparatives vs Superlatives", comparative: "Compares TWO things: taller, more interesting", superlative: "Shows the EXTREME in a group (3+): the tallest, the most interesting", example_comp: "John is taller than Tom. (2 people)", example_super: "John is the tallest in the class. (one is #1 in a group)", key_difference: "Comparative = 2 things | Superlative = 1 is #1 in a group", remember: "Superlative always needs THE!" },

      { category: "The Pattern", rule: "Two ways to form superlatives based on adjective length", short_adjectives: "Short adjectives: THE + adjective + -EST", long_adjectives: "Long adjectives: THE + MOST + adjective", key_word: "THE (always needed!)", structure: "Subject + verb + THE + superlative + in/of + group", remember: "Can't use superlatives without THE!" },

      { category: "Short Adjectives - Formation", rule: "Add -EST to short adjectives (1 syllable or 2 ending in -y)", examples: "tall → THE tallest / big → THE biggest / fast → THE fastest / happy → THE happiest / easy → THE easiest", pattern: "THE + adjective + -EST", sentences: "He is THE tallest boy in the class. / This is THE biggest house on the street. / She is THE happiest person I know.", note: "Same adjectives that use -ER for comparatives use -EST for superlatives!" },

      { category: "Long Adjectives - Formation", rule: "Use THE MOST before long adjectives (2+ syllables, not ending in -y)", examples: "beautiful → THE most beautiful / expensive → THE most expensive / interesting → THE most interesting / difficult → THE most difficult", pattern: "THE + MOST + adjective", sentences: "She is THE most beautiful woman in the world. / This is THE most expensive car.", note: "Don't add -EST to long adjectives!", wrong: "beautifulest ✗ / expensivest ✗", correct: "the most beautiful ✓ / the most expensive ✓" },

      { category: "Spelling Rules - Adding -EST", rule_1: "Most adjectives: just add -est", examples_1: "tall → tallest, fast → fastest, old → oldest, new → newest, small → smallest", rule_2: "Adjectives ending in -e: add -st only", examples_2: "nice → nicest, large → largest, safe → safest, wide → widest", rule_3: "Adjectives ending in consonant-vowel-consonant: double last letter + -est", examples_3: "big → biggest, hot → hottest, fat → fattest, thin → thinnest, wet → wettest", rule_4: "Adjectives ending in -y: change y to i + -est", examples_4: "happy → happiest, easy → easiest, busy → busiest, funny → funniest, pretty → prettiest" },

      { category: "Irregular Superlatives - MEMORIZE!", good: "good → THE BEST (NOT the goodest ✗)", bad: "bad → THE WORST (NOT the baddest ✗)", far: "far → THE FARTHEST or THE FURTHEST", much_many: "much/many → THE MOST", little: "little → THE LEAST", note: "Same irregulars as comparatives, but add THE!", examples: "This is THE best pizza I've ever had. / That was THE worst movie ever. / He lives THE farthest from school.", important: "NEVER say 'the most good' or 'the most best' - always 'THE BEST'!" },

      { category: "Always Use THE", rule: "Superlatives MUST have THE before them", correct: "She is THE tallest. / This is THE most beautiful. / He is THE best.", wrong: "She is tallest ✗ / This is most beautiful ✗ / He is best ✗", why: "THE shows there's only ONE at the top of the group", exception: "Can drop THE in: 'My happiest day' (possessive), but usually keep it!", remember: "THE is not optional - it's required!" },

      { category: "IN vs OF (After Superlatives)", in_rule: "Use IN with places, groups, categories", in_examples: "the tallest IN the class / the best IN the world / the fastest IN the city / the most beautiful IN Turkey", of_rule: "Use OF with plurals, quantities, 'all'", of_examples: "the tallest OF my friends / the best OF all / the most expensive OF the three / the oldest OF us", remember: "IN = place/group | OF = plural/quantity", both_ok: "Sometimes both work, but IN is more common with places" },

      { category: "Common Short Adjectives - Superlative", one_syllable: "big → biggest, small → smallest, tall → tallest, short → shortest, long → longest, fast → fastest, slow → slowest, high → highest, low → lowest, young → youngest, old → oldest, new → newest, hot → hottest, cold → coldest, cheap → cheapest, rich → richest, poor → poorest, strong → strongest, weak → weakest", two_syllable_y: "happy → happiest, easy → easiest, busy → busiest, funny → funniest, pretty → prettiest, ugly → ugliest, dirty → dirtiest, early → earliest, healthy → healthiest, lucky → luckiest" },

      { category: "Common Long Adjectives - Superlative", two_plus_syllables: "beautiful → most beautiful, expensive → most expensive, interesting → most interesting, difficult → most difficult, comfortable → most comfortable, important → most important, dangerous → most dangerous, popular → most popular, exciting → most exciting, boring → most boring, famous → most famous, delicious → most delicious, intelligent → most intelligent, successful → most successful" },

      { category: "Superlatives with Possessives", pattern: "Possessive + superlative (THE is optional but can be kept)", examples: "my best friend / his worst enemy / our happiest moment / their most important decision", with_the: "my THE best friend (less common) | my best friend (more natural)", note: "With possessives (my/your/his/her/etc.), you usually drop THE", remember: "Possessive replaces THE in most cases" },

      { category: "Ever + Present Perfect", pattern: "Superlative + I've/you've/he's + ever + past participle", examples: "This is THE best movie I've EVER seen. / She's THE kindest person I've EVER met. / That was THE worst experience I've EVER had.", meaning: "In all of my life/experience", structure: "superlative + ever + present perfect", note: "Very common pattern in English!", use: "Express personal records or lifetime extremes" },

      { category: "One of the + Superlative + Plural", pattern: "One of the + superlative + PLURAL noun", examples: "She is one of THE best students. / This is one of THE most beautiful cities. / He's one of THE tallest players.", meaning: "Among the top group (not #1, but in the top group)", note: "Noun MUST be plural after 'one of the'!", wrong: "one of the best student ✗", correct: "one of the best students ✓", remember: "One of the... = plural noun!" },

      { category: "Negative Superlatives - THE LEAST", rule: "Use THE LEAST for the opposite meaning", examples: "the LEAST expensive = the cheapest / the LEAST difficult = the easiest / the LEAST interesting = the most boring", pattern: "THE LEAST + adjective", note: "LEAST is the opposite of MOST", use: "Less common than using opposite adjectives", better: "Usually say 'the cheapest' instead of 'the least expensive'" },

      { category: "Questions with Superlatives", pattern: "What/Who/Which + is + THE + superlative?", examples: "What is THE biggest country? / Who is THE oldest in your family? / Which is THE best option?", answers: "Give the specific example that's #1", answer_examples: "Russia is THE biggest country. / My grandma is THE oldest. / Option A is THE best.", note: "Questions ask about the #1 in a category" },

      { category: "By far + Superlative", rule: "BY FAR emphasizes superlatives (much better than all others)", examples: "This is BY FAR THE best pizza. / She's BY FAR THE smartest student. / That was BY FAR THE worst game.", meaning: "Emphasizes there's a huge gap between #1 and #2", pattern: "by far + THE + superlative", note: "Makes the superlative even stronger!", position: "Can also say: THE best BY FAR" },

      { category: "Common Mistakes", mistake_1: "Forgetting THE", wrong_1: "He is tallest ✗ / This is most expensive ✗ / She's best ✗", correct_1: "He is THE tallest ✓ / This is THE most expensive ✓ / She's THE best ✓", rule: "Must use THE with superlatives!", remember: "THE is not optional!" },
      { category: "Common Mistakes", mistake_2: "Using -est with long adjectives", wrong_2: "beautifulest ✗ / expensivest ✗ / interestingest ✗", correct_2: "most beautiful ✓ / most expensive ✓ / most interesting ✓", rule: "Long adjectives use THE MOST, not -est", remember: "2+ syllables (not -y) = use MOST" },
      { category: "Common Mistakes", mistake_3: "Using MOST with irregular superlatives", wrong_3: "the most good ✗ / the most bad ✗ / the most best ✗", correct_3: "the best ✓ / the worst ✓ / the best ✓", rule: "Irregular superlatives don't use MOST", remember: "good → the best | bad → the worst" },
      { category: "Common Mistakes", mistake_4: "Singular noun after 'one of the'", wrong_4: "one of the best student ✗ / one of the tallest building ✗", correct_4: "one of the best students ✓ / one of the tallest buildings ✓", rule: "ONE OF THE + superlative + PLURAL noun", remember: "'One of the...' needs plural!" },

      { category: "Real-World Uses", describing_records: "Mount Everest is the highest mountain in the world. / The cheetah is the fastest land animal.", opinions: "This is the best restaurant in town. / That was the worst movie I've ever seen.", rankings: "She's the smartest student in the class. / He's the tallest player on the team.", extreme_statements: "This is the most important decision of your life.", general: "Essential for expressing extremes, rankings, and personal records!" },

      { category: "Comparison of All Three Forms", positive: "tall / expensive / good", comparative: "taller (than) / more expensive (than) / better (than)", superlative: "THE tallest / THE most expensive / THE best", use_positive: "She is tall. (no comparison)", use_comparative: "She is taller than me. (comparing 2)", use_superlative: "She is THE tallest in the class. (she's #1 in a group)", remember: "Positive → Comparative → Superlative" },

      { category: "Key Takeaway", summary: "Superlatives show the EXTREME degree (the highest/lowest) in a group of 3+", short_rule: "Short adjectives (1 syllable, or 2 ending in -y) → THE + adjective + -EST", long_rule: "Long adjectives (2+ syllables, not -y) → THE + MOST + adjective", must_use_the: "Always use THE before superlatives!", irregulars: "good → THE best | bad → THE worst | far → THE farthest/furthest", in_of: "Use IN with places/groups | Use OF with plurals/quantities", pattern: "THE + superlative + IN/OF + group", one_of: "one of THE + superlative + PLURAL noun", remember: "THE is required! Never 'the most good' - say 'THE BEST'!", next: "Practice finding the #1 in different groups!" }
    ]
  },
  
  speakingPractice: [
    { question: "Who is the tallest person in your family?", answer: "My father is the tallest.", multipleChoice: { prompt: "My father ___ the tallest.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "What is the most beautiful city in Europe?", answer: "I think Paris is the most beautiful.", multipleChoice: { prompt: "I think Paris ___ the most beautiful.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "What is the biggest animal in the world?", answer: "The blue whale is the biggest.", multipleChoice: { prompt: "The blue whale ___ the biggest.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Who is the youngest in your company?", answer: "Ali is the youngest.", multipleChoice: { prompt: "Ali ___ the youngest.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What’s the most popular food in your country?", answer: "Kebap is the most popular.", multipleChoice: { prompt: "Kebap ___ the most popular.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Which is the coldest month of the year?", answer: "January is the coldest month.", multipleChoice: { prompt: "January ___ the coldest month.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What’s the most expensive thing you have?", answer: "My laptop is the most expensive thing I have.", multipleChoice: { prompt: "My laptop is the most expensive thing I ___.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "has", correct: false }] } },
    { question: "What is the fastest car in the world?", answer: "Bugatti is the fastest.", multipleChoice: { prompt: "Bugatti ___ the fastest.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Who is the oldest person you know?", answer: "My grandfather is the oldest.", multipleChoice: { prompt: "My grandfather ___ the oldest.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What is the easiest subject in school for you?", answer: "English is the easiest subject for me.", multipleChoice: { prompt: "English ___ the easiest subject for me.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What’s the most difficult language to learn?", answer: "Chinese is the most difficult.", multipleChoice: { prompt: "Chinese ___ the most difficult.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Who is the funniest in your family?", answer: "My uncle is the funniest.", multipleChoice: { prompt: "My uncle ___ the funniest.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What is the longest river in the world?", answer: "The Nile is the longest river.", multipleChoice: { prompt: "The Nile ___ the longest river.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Which is the hottest season?", answer: "Summer is the hottest season.", multipleChoice: { prompt: "Summer ___ the hottest season.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "What is the most interesting book you’ve read?", answer: "Harry Potter is the most interesting.", multipleChoice: { prompt: "Harry Potter ___ the most interesting.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Who is the smartest student in your class?", answer: "Zeynep is the smartest.", multipleChoice: { prompt: "Zeynep ___ the smartest.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "What is the most important day of your life?", answer: "My graduation day was the most important.", multipleChoice: { prompt: "My graduation day ___ the most important.", options: [{ letter: "A", text: "were", correct: false }, { letter: "B", text: "was", correct: true }, { letter: "C", text: "is", correct: false }] } },
    { question: "What is the most delicious meal you’ve eaten?", answer: "My mom’s lasagna is the most delicious.", multipleChoice: { prompt: "My mom’s lasagna ___ the most delicious.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Which is the tallest building in your city?", answer: "The tower in the center is the tallest.", multipleChoice: { prompt: "The tower in the center ___ the tallest.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "What’s the most boring subject?", answer: "Math is the most boring subject.", multipleChoice: { prompt: "Math ___ the most boring subject.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Who is the fastest runner in your school?", answer: "Berk is the fastest runner.", multipleChoice: { prompt: "Berk ___ the fastest runner.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What is the most dangerous animal?", answer: "I think the crocodile is the most dangerous.", multipleChoice: { prompt: "I think the crocodile ___ the most dangerous.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What is the shortest month?", answer: "February is the shortest month.", multipleChoice: { prompt: "February ___ the shortest month.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What is the most famous movie ever?", answer: "Titanic is the most famous.", multipleChoice: { prompt: "Titanic ___ the most famous.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "What’s the best restaurant in your town?", answer: "Pizza House is the best.", multipleChoice: { prompt: "Pizza House ___ the best.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Who is the friendliest person you know?", answer: "My sister is the friendliest.", multipleChoice: { prompt: "My sister ___ the friendliest.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "What’s the most relaxing activity for you?", answer: "Listening to music is the most relaxing.", multipleChoice: { prompt: "Listening to music ___ the most relaxing.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What’s the coldest place in your country?", answer: "Erzurum was the coldest.", multipleChoice: { prompt: "Erzurum ___ the coldest.", options: [{ letter: "A", text: "were", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "was", correct: true }] } },
    { question: "Who is the loudest in your family?", answer: "My little brother is the loudest.", multipleChoice: { prompt: "My little brother ___ the loudest.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What’s the most expensive restaurant in your city?", answer: "Nusr-Et is the most expensive one.", multipleChoice: { prompt: "Nusr-Et ___ the most expensive one.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Which is the slowest animal?", answer: "The turtle is the slowest.", multipleChoice: { prompt: "The turtle ___ the slowest.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What is the most crowded place in your city?", answer: "The main square is the most crowded.", multipleChoice: { prompt: "The main square ___ the most crowded.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What is the darkest time of day?", answer: "Midnight is the darkest.", multipleChoice: { prompt: "Midnight ___ the darkest.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What’s the most exciting sport?", answer: "Football is the most exciting.", multipleChoice: { prompt: "Football ___ the most exciting.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Who is the kindest teacher at your school?", answer: "Ms. Elif is the kindest.", multipleChoice: { prompt: "Ms. Elif ___ the kindest.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What is the noisiest place in your home?", answer: "The kitchen is the noisiest.", multipleChoice: { prompt: "The kitchen ___ the noisiest.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What’s the most dangerous job?", answer: "Firefighting is the most dangerous.", multipleChoice: { prompt: "Firefighting ___ the most dangerous.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What is the longest movie you’ve ever watched?", answer: "Avatar was the longest.", multipleChoice: { prompt: "Avatar ___ the longest.", options: [{ letter: "A", text: "was", correct: true }, { letter: "B", text: "were", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Who is the best singer you know?", answer: "Adele is the best singer.", multipleChoice: { prompt: "Adele ___ the best singer.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "What’s the most tiring job?", answer: "Construction work is the most tiring.", multipleChoice: { prompt: "Construction work ___ the most tiring.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
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

  table: {
    title: "📋 Be Going To (Future Plans and Intentions)",
    data: [
      { category: "What is 'Be Going To'?", explanation: "Structure for talking about future plans and intentions", turkish: "Gelecek zaman planları", function: "Express what you plan to do in the future", examples: "I'm going to visit my friend tomorrow. / She's going to study medicine. / They're going to play football.", note: "Plans decided BEFORE the moment of speaking!" },

      { category: "When to Use 'Be Going To'", use_1: "Future plans (decided before now)", examples_1: "I'm going to visit Paris next year. (I already decided)", use_2: "Intentions (what you want to do)", examples_2: "I'm going to start exercising. (My intention)", use_3: "Predictions based on evidence (you can see it will happen)", examples_3: "Look at those clouds! It's going to rain. (I see the clouds)", key: "Plans made BEFORE now, not spontaneous decisions!", remember: "If you already decided, use 'going to'" },

      { category: "Structure - Positive", form: "Subject + AM/IS/ARE + going to + BASE VERB", examples: "I AM going to study. / She IS going to cook. / They ARE going to play.", pattern: "BE verb + going to + verb (infinitive without 'to')", turkish: "Özne + am/is/are + going to + fiil", note: "Three parts: BE + going to + verb", important: "Don't forget the BE verb!" },
      { category: "Positive - All Persons", i: "I am going to eat. → I'm going to eat.", you: "You are going to study. → You're going to study.", he: "He is going to work. → He's going to work.", she: "She is going to travel. → She's going to travel.", it: "It is going to rain. → It's going to rain.", we: "We are going to visit. → We're going to visit.", they: "They are going to play. → They're going to play.", contractions: "Very common to use contractions!", remember: "AM/IS/ARE (not WAS/WERE - that's past!)" },

      { category: "Structure - Negative", form: "Subject + AM/IS/ARE + NOT + going to + BASE VERB", examples: "I AM NOT going to study. / She IS NOT going to cook. / They ARE NOT going to play.", contractions: "I'm not / isn't / aren't + going to", pattern: "BE + NOT + going to + verb", turkish: "Özne + am/is/are + not + going to + fiil", note: "Add NOT after the BE verb" },
      { category: "Negative - All Persons", i: "I am not going to eat. → I'm not going to eat.", you: "You are not going to study. → You're not / You aren't going to study.", he: "He is not going to work. → He's not / He isn't going to work.", she: "She is not going to travel. → She's not / She isn't going to travel.", we: "We are not going to visit. → We're not / We aren't going to visit.", they: "They are not going to play. → They're not / They aren't going to play.", note: "Two contraction options for you/he/she/we/they!", common: "I'm not (only option) | isn't / aren't (common)" },

      { category: "Structure - Yes/No Questions", form: "AM/IS/ARE + subject + going to + BASE VERB?", examples: "ARE you going to study? / IS she going to cook? / ARE they going to play?", pattern: "Invert BE and subject", turkish: "Am/Is/Are + özne + going to + fiil?", inversion: "Statement: She IS going to... → Question: IS she going to...?", note: "Put BE before the subject for questions!" },
      { category: "Yes/No Questions - Short Answers", question_answer: "Are you going to study? → Yes, I am. / No, I'm not.", question_answer_2: "Is she going to come? → Yes, she is. / No, she isn't.", pattern: "Yes, + subject + BE | No, + subject + BE + not", note: "Use the same BE verb as the question", no_going_to: "Don't repeat 'going to' in short answers!", wrong: "Yes, I'm going to ✗", correct: "Yes, I am ✓" },

      { category: "Structure - Wh- Questions", form: "WH-word + AM/IS/ARE + subject + going to + BASE VERB?", examples: "WHAT are you going to do? / WHERE is she going to go? / WHEN are they going to arrive?", pattern: "Question word + BE + subject + going to + verb", answers: "Give specific information (not yes/no)", answer_examples: "What are you going to do? → I'm going to watch a movie.", note: "Question word comes first, then invert BE and subject" },
      { category: "Common Wh- Questions", what: "What are you going to do tomorrow? → I'm going to visit my friend.", where: "Where are you going to go? → I'm going to go to the beach.", when: "When are you going to start? → I'm going to start next week.", who: "Who are you going to invite? → I'm going to invite my cousins.", why: "Why are you going to leave? → Because I have an appointment.", how: "How are you going to get there? → I'm going to take the bus." },

      { category: "Going to + GO", note: "When the main verb is GO, you say 'going to go'", examples: "I'm going to GO to the market. / She's going to GO home.", sounds: "Yes, it sounds repetitive, but it's correct!", wrong: "I'm going to the market ✗ (missing 'go')", correct: "I'm going to GO to the market ✓", informal: "In informal speech, sometimes people drop one 'go': I'm gonna go / I'm going to the market", learn: "For now, use the full form: going to go" },

      { category: "Common Future Time Expressions", tomorrow: "tomorrow (yarın)", tonight: "tonight (bu gece)", next: "next week / next month / next year (gelecek hafta/ay/yıl)", later: "later (sonra)", soon: "soon (yakında)", in: "in two days / in a week (iki gün/bir hafta içinde)", this: "this weekend / this evening (bu hafta sonu/bu akşam)", examples: "I'm going to visit him tomorrow. / She's going to travel next month.", note: "These time words show it's the future!" },

      { category: "Be Going To vs Will", going_to: "Use for plans decided BEFORE now", going_to_example: "I'm going to study tonight. (I already decided)", will: "Use for spontaneous decisions (decide NOW)", will_example: "I'll help you! (deciding at this moment)", difference: "Going to = planned | Will = spontaneous", both_future: "Both talk about future, but different types!", for_now: "Focus on 'going to' for plans and intentions" },

      { category: "Evidence-Based Predictions", use: "Use 'going to' when you can SEE evidence that something will happen", examples: "Look at those dark clouds! It's going to rain. (I see clouds) / Be careful! You're going to fall! (I see you're losing balance) / The bus is full. We're not going to get seats. (I see it's crowded)", pattern: "Present evidence → future result (going to)", note: "You can see/know the future result is coming!", turkish: "Kanıta dayalı tahminler" },

      { category: "Gonna - Informal Pronunciation", spoken: "In casual speech, 'going to' sounds like 'gonna' /ˈɡɑnə/", examples_spoken: "I'm gonna eat. / She's gonna study. / They're gonna play.", note: "'Gonna' is NOT written in formal English!", formal_writing: "I am going to... / She is going to...", informal_speaking: "I'm gonna... / She's gonna...", learn: "Learn to recognize 'gonna' when you hear it, but write 'going to'!" },

      { category: "Common Mistakes", mistake_1: "Forgetting BE verb", wrong_1: "I going to study ✗ / She going to cook ✗", correct_1: "I AM going to study ✓ / She IS going to cook ✓", rule: "Must have AM/IS/ARE before 'going to'", remember: "BE + going to!" },
      { category: "Common Mistakes", mistake_2: "Using infinitive 'to' with the verb", wrong_2: "I'm going to to eat ✗ / She's going to to study ✗", correct_2: "I'm going to eat ✓ / She's going to study ✓", rule: "The 'to' is already in 'going TO' - don't add another!", pattern: "going to + BASE VERB (no 'to')" },
      { category: "Common Mistakes", mistake_3: "Using wrong tense of BE", wrong_3: "I are going to ✗ / She am going to ✗ / They is going to ✗", correct_3: "I AM going to ✓ / She IS going to ✓ / They ARE going to ✓", rule: "Use correct BE verb: I am / you are / he-she-it is / we are / they are", remember: "Subject-verb agreement matters!" },
      { category: "Common Mistakes", mistake_4: "Repeating 'going to' in short answers", wrong_4: "Are you going to come? → Yes, I'm going to ✗", correct_4: "Are you going to come? → Yes, I am ✓", rule: "Short answers use only BE verb (not 'going to')", pattern: "Yes/No + subject + BE" },

      { category: "Real-World Uses", plans: "What are you going to do this weekend? → I'm going to visit my grandparents.", decisions: "I'm going to quit smoking. (My decision/intention)", schedules: "She's going to start university in September.", predictions: "It's going to rain soon. (I see dark clouds)", travel: "We're going to travel to Italy next summer.", general: "Essential for talking about future plans and intentions!" },

      { category: "Key Takeaway", summary: "BE GOING TO expresses future plans and intentions decided before now", structure_positive: "Subject + AM/IS/ARE + going to + BASE VERB", structure_negative: "Subject + AM/IS/ARE + NOT + going to + BASE VERB", structure_question: "AM/IS/ARE + subject + going to + BASE VERB?", three_parts: "BE verb + going to + verb", use_for: "Plans (decided before) | Intentions | Predictions with evidence", time_words: "tomorrow, tonight, next week, later, soon", going_gonna: "'Going to' → spoken as 'gonna' (informal)", remember: "Don't forget BE! going to + BASE VERB (no 'to')! Short answers = BE only!", next: "Practice talking about your future plans!" }
    ]
  },
  
  speakingPractice: [
    { question: "What are you going to do tomorrow?", answer: "I’m going to visit my cousin.", multipleChoice: { prompt: "I’m going to ___ my cousin.", options: [{ letter: "A", text: "visit", correct: true }, { letter: "B", text: "visiting", correct: false }, { letter: "C", text: "visited", correct: false }] } },
    { question: "Are you going to watch a movie tonight?", answer: "Yes, I’m going to watch a comedy.", multipleChoice: { prompt: "Yes, I’m going to ___ a comedy.", options: [{ letter: "A", text: "watched", correct: false }, { letter: "B", text: "watch", correct: true }, { letter: "C", text: "watching", correct: false }] } },
    { question: "Is your friend going to travel next summer?", answer: "Yes, she is going to travel to Italy.", multipleChoice: { prompt: "Yes, she ___ going to travel to Italy.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Are your friends going to play football on Saturday?", answer: "Yes, they are going to play in the park.", multipleChoice: { prompt: "Yes, they ___ going to play in the park.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "What is your brother going to eat for dinner?", answer: "He’s going to eat pizza.", multipleChoice: { prompt: "He’s going to ___ pizza.", options: [{ letter: "A", text: "ate", correct: false }, { letter: "B", text: "eat", correct: true }, { letter: "C", text: "eating", correct: false }] } },
    { question: "Where are you going to go this weekend?", answer: "I’m going to go to the beach.", multipleChoice: { prompt: "I’m going to ___ to the beach.", options: [{ letter: "A", text: "going", correct: false }, { letter: "B", text: "went", correct: false }, { letter: "C", text: "go", correct: true }] } },
    { question: "Are you going to study tonight?", answer: "Yes, I’m going to study for my exam.", multipleChoice: { prompt: "Yes, I’m going to ___ for my exam.", options: [{ letter: "A", text: "study", correct: true }, { letter: "B", text: "studying", correct: false }, { letter: "C", text: "studied", correct: false }] } },
    { question: "What are you going to buy at the market?", answer: "I’m going to buy vegetables and fruit.", multipleChoice: { prompt: "I’m going to ___ vegetables and fruit.", options: [{ letter: "A", text: "bought", correct: false }, { letter: "B", text: "buy", correct: true }, { letter: "C", text: "buying", correct: false }] } },
    { question: "Is your dad going to work tomorrow?", answer: "Yes, he’s going to work in the morning.", multipleChoice: { prompt: "Yes, he’s going to ___ in the morning.", options: [{ letter: "A", text: "working", correct: false }, { letter: "B", text: "worked", correct: false }, { letter: "C", text: "work", correct: true }] } },
    { question: "Are your friends going to come to the party?", answer: "Yes, they’re going to arrive at 8.", multipleChoice: { prompt: "Yes, they’re going to ___ at 8.", options: [{ letter: "A", text: "arrive", correct: true }, { letter: "B", text: "arriving", correct: false }, { letter: "C", text: "arrived", correct: false }] } },
    { question: "What are you going to wear to the wedding?", answer: "I’m going to wear a blue dress.", multipleChoice: { prompt: "I’m going to ___ a blue dress.", options: [{ letter: "A", text: "wore", correct: false }, { letter: "B", text: "wear", correct: true }, { letter: "C", text: "wearing", correct: false }] } },
    { question: "Is your mom going to cook tonight?", answer: "Yes, she’s going to make pasta.", multipleChoice: { prompt: "Yes, she’s going to ___ pasta.", options: [{ letter: "A", text: "making", correct: false }, { letter: "B", text: "made", correct: false }, { letter: "C", text: "make", correct: true }] } },
    { question: "Where are your friends going to stay on their holiday?", answer: "They’re going to stay at a hotel.", multipleChoice: { prompt: "They’re going to ___ at a hotel.", options: [{ letter: "A", text: "stay", correct: true }, { letter: "B", text: "staying", correct: false }, { letter: "C", text: "stayed", correct: false }] } },
    { question: "Are you going to visit your grandparents?", answer: "Yes, I’m going to visit them on Sunday.", multipleChoice: { prompt: "Yes, I’m going to ___ them on Sunday.", options: [{ letter: "A", text: "visited", correct: false }, { letter: "B", text: "visit", correct: true }, { letter: "C", text: "visiting", correct: false }] } },
    { question: "What is your brother going to do this evening?", answer: "He’s going to play video games.", multipleChoice: { prompt: "He’s going to ___ video games.", options: [{ letter: "A", text: "playing", correct: false }, { letter: "B", text: "played", correct: false }, { letter: "C", text: "play", correct: true }] } },
    { question: "Are you going to clean your room today?", answer: "Yes, I’m going to clean it after lunch.", multipleChoice: { prompt: "Yes, I’m going to ___ it after lunch.", options: [{ letter: "A", text: "clean", correct: true }, { letter: "B", text: "cleaning", correct: false }, { letter: "C", text: "cleaned", correct: false }] } },
    { question: "What are you going to do this summer?", answer: "I’m going to take an English course.", multipleChoice: { prompt: "I’m going to ___ an English course.", options: [{ letter: "A", text: "took", correct: false }, { letter: "B", text: "take", correct: true }, { letter: "C", text: "taking", correct: false }] } },
    { question: "Is your sister going to watch TV later?", answer: "Yes, she’s going to watch a drama.", multipleChoice: { prompt: "Yes, she’s going to ___ a drama.", options: [{ letter: "A", text: "watching", correct: false }, { letter: "B", text: "watched", correct: false }, { letter: "C", text: "watch", correct: true }] } },
    { question: "Where is your family going to travel?", answer: "We’re going to travel to Cappadocia.", multipleChoice: { prompt: "We’re going to ___ to Cappadocia.", options: [{ letter: "A", text: "travel", correct: true }, { letter: "B", text: "traveling", correct: false }, { letter: "C", text: "traveled", correct: false }] } },
    { question: "Are you going to learn Spanish?", answer: "Yes, I’m going to start next month.", multipleChoice: { prompt: "Yes, I’m going to ___ next month.", options: [{ letter: "A", text: "started", correct: false }, { letter: "B", text: "start", correct: true }, { letter: "C", text: "starting", correct: false }] } },
    { question: "What are you going to do after school?", answer: "I’m going to meet my friends.", multipleChoice: { prompt: "I’m going to ___ my friends.", options: [{ letter: "A", text: "meeting", correct: false }, { letter: "B", text: "met", correct: false }, { letter: "C", text: "meet", correct: true }] } },
    { question: "Is your sister going to start university?", answer: "Yes, she’s going to start in September.", multipleChoice: { prompt: "Yes, she’s going to ___ in September.", options: [{ letter: "A", text: "start", correct: true }, { letter: "B", text: "starting", correct: false }, { letter: "C", text: "started", correct: false }] } },
    { question: "What are you going to eat for lunch?", answer: "I’m going to eat a sandwich.", multipleChoice: { prompt: "I’m going to ___ a sandwich.", options: [{ letter: "A", text: "ate", correct: false }, { letter: "B", text: "eat", correct: true }, { letter: "C", text: "eating", correct: false }] } },
    { question: "Are your brother and his friends going to play basketball later?", answer: "Yes, they are.", multipleChoice: { prompt: "Yes, they ___.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "Are you going to take a holiday this year?", answer: "Yes, I’m going to visit the coast.", multipleChoice: { prompt: "Yes, I’m going to ___ the coast.", options: [{ letter: "A", text: "visit", correct: true }, { letter: "B", text: "visiting", correct: false }, { letter: "C", text: "visited", correct: false }] } },
    { question: "Is your teacher going to give homework?", answer: "Yes, she’s going to give us a worksheet.", multipleChoice: { prompt: "Yes, she’s going to ___ us a worksheet.", options: [{ letter: "A", text: "gave", correct: false }, { letter: "B", text: "give", correct: true }, { letter: "C", text: "giving", correct: false }] } },
    { question: "What are your parents going to do on the weekend?", answer: "They’re going to visit friends.", multipleChoice: { prompt: "They’re going to ___ friends.", options: [{ letter: "A", text: "visiting", correct: false }, { letter: "B", text: "visited", correct: false }, { letter: "C", text: "visit", correct: true }] } },
    { question: "Is your friend going to call you tonight?", answer: "Yes, he’s going to call me at 9.", multipleChoice: { prompt: "Yes, he’s going to ___ me at 9.", options: [{ letter: "A", text: "call", correct: true }, { letter: "B", text: "calling", correct: false }, { letter: "C", text: "called", correct: false }] } },
    { question: "Are you going to do your homework?", answer: "Yes, I’m going to do it now.", multipleChoice: { prompt: "Yes, I’m going to ___ it now.", options: [{ letter: "A", text: "does", correct: false }, { letter: "B", text: "did", correct: false }, { letter: "C", text: "do", correct: true }] } },
    { question: "What is your cousin going to study?", answer: "She’s going to study architecture.", multipleChoice: { prompt: "She’s going to ___ architecture.", options: [{ letter: "A", text: "studying", correct: false }, { letter: "B", text: "studied", correct: false }, { letter: "C", text: "study", correct: true }] } },
    { question: "Are you going to cook dinner tonight?", answer: "No, I’m going to order food.", multipleChoice: { prompt: "No, I’m going to ___ food.", options: [{ letter: "A", text: "order", correct: true }, { letter: "B", text: "ordering", correct: false }, { letter: "C", text: "ordered", correct: false }] } },
    { question: "Where are you going to go for holiday?", answer: "I’m going to go to Bursa.", multipleChoice: { prompt: "I’m going to ___ to Bursa.", options: [{ letter: "A", text: "went", correct: false }, { letter: "B", text: "go", correct: true }, { letter: "C", text: "going", correct: false }] } },
    { question: "Is your friend going to come with you to your grandmother’s house?", answer: "No, he’s not going to join us.", multipleChoice: { prompt: "No, he’s not going to ___ us.", options: [{ letter: "A", text: "joining", correct: false }, { letter: "B", text: "joined", correct: false }, { letter: "C", text: "join", correct: true }] } },
    { question: "What are you going to do this Friday night?", answer: "I’m going to go out with my friends.", multipleChoice: { prompt: "I’m going to go ___ with my friends.", options: [{ letter: "A", text: "up", correct: false }, { letter: "B", text: "out", correct: true }, { letter: "C", text: "in", correct: false }] } },
    { question: "Are you going to send an email to your manager?", answer: "Yes, I’m going to send it tonight.", multipleChoice: { prompt: "Yes, I’m going to ___ it tonight.", options: [{ letter: "A", text: "sent", correct: false }, { letter: "B", text: "send", correct: true }, { letter: "C", text: "sending", correct: false }] } },
    { question: "Is your sister going to join the competition?", answer: "Yes, she is.", multipleChoice: { prompt: "Yes, she ___.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What are you going to take to the picnic with your friends?", answer: "I’m going to take some snacks.", multipleChoice: { prompt: "I’m going to ___ some snacks.", options: [{ letter: "A", text: "take", correct: true }, { letter: "B", text: "taking", correct: false }, { letter: "C", text: "took", correct: false }] } },
    { question: "Are your grandparents going to move to a new house?", answer: "No, they’re not going to move to a new house.", multipleChoice: { prompt: "No, they’re not going to ___ to a new house.", options: [{ letter: "A", text: "moved", correct: false }, { letter: "B", text: "move", correct: true }, { letter: "C", text: "moving", correct: false }] } },
    { question: "Is your friend going to take the exam?", answer: "Yes, he’s going to take it next week.", multipleChoice: { prompt: "Yes, he’s going to ___ it next week.", options: [{ letter: "A", text: "taking", correct: false }, { letter: "B", text: "took", correct: false }, { letter: "C", text: "take", correct: true }] } },
    { question: "What are you going to do next weekend?", answer: "I’m going to relax at home.", multipleChoice: { prompt: "I’m going to ___ at home.", options: [{ letter: "A", text: "relax", correct: true }, { letter: "B", text: "relaxing", correct: false }, { letter: "C", text: "relaxed", correct: false }] } },
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

  table: {
    title: "📋 Would Like vs Want (Polite vs Direct Desires)",
    data: [
      { category: "What are Would Like and Want?", explanation: "Two ways to express desires, wishes, and requests", turkish: "İstek belirtmek", would_like: "WOULD LIKE = polite, formal, soft", want: "WANT = direct, casual, strong", function: "Say what you want or wish for", difference: "Same meaning, different politeness levels!" },

      { category: "The Key Difference", would_like: "WOULD LIKE = polite, courteous, respectful (I would like...)", want: "WANT = direct, casual, informal (I want...)", when_would_like: "Use in formal situations, with strangers, in restaurants, at work", when_want: "Use with friends, family, in casual situations", example_polite: "Would you like some tea? (polite offer)", example_casual: "Do you want some tea? (casual offer)", remember: "Both correct, but different politeness!" },

      { category: "WOULD LIKE - Structure Positive", form: "Subject + would like + NOUN / TO + VERB", examples_noun: "I would like some water. / She would like a coffee. / They would like pizza.", examples_verb: "I would like TO eat. / She would like TO go. / They would like TO stay.", pattern: "would like + noun OR would like + to + verb", turkish: "istiyorum (kibar şekilde)", note: "Two patterns: with noun or with 'to + verb'" },
      { category: "WOULD LIKE - Contractions", full: "I would like → I'd like", all_persons: "I'd like / You'd like / He'd like / She'd like / We'd like / They'd like", very_common: "Contractions are very common in speech!", examples: "I'd like some tea. / He'd like to go home. / We'd like the menu, please.", note: "I'd = I would (NOT I had!)", remember: "In speech, almost always use 'd instead of 'would'" },

      { category: "WOULD LIKE - Negative", form: "Subject + would not like + NOUN / TO + VERB", contraction: "would not → wouldn't", examples: "I wouldn't like fish. / She wouldn't like to go. / They wouldn't like that option.", turkish: "istemiyorum (kibar şekilde)", note: "Less common than positive - usually just say what you DO want!", alternative: "Instead of 'I wouldn't like fish', say 'I'd prefer chicken'" },

      { category: "WOULD LIKE - Questions (Polite Offers)", form: "Would + subject + like + NOUN / TO + VERB?", examples_offer: "Would you like some coffee? / Would you like TO sit down? / Would they like dessert?", use: "Very polite way to offer something", answers: "Yes, please. / Yes, I'd love to. / No, thank you.", pattern: "Would + you/he/she/etc. + like...?", note: "Super polite - perfect for formal situations!" },

      { category: "WANT - Structure Positive", form: "Subject + want/wants + NOUN / TO + VERB", examples_noun: "I want some water. / She wants a coffee. / They want pizza.", examples_verb: "I want TO eat. / She wants TO go. / They want TO stay.", pattern: "want + noun OR want + to + verb", turkish: "istiyorum", he_she_it: "Remember: He/She/It WANTS (add -s!)", note: "More direct than 'would like'" },

      { category: "WANT - Negative", form: "Subject + don't/doesn't want + NOUN / TO + VERB", examples: "I don't want fish. / She doesn't want to go. / They don't want that option.", turkish: "istemiyorum", pattern: "don't/doesn't + want", note: "Direct way to say what you don't want", remember: "I/You/We/They don't | He/She/It doesn't" },

      { category: "WANT - Questions", form: "Do/Does + subject + want + NOUN / TO + VERB?", examples: "Do you want some coffee? / Does she want TO sit down? / Do they want dessert?", answers: "Yes, I do. / No, I don't.", pattern: "Do/Does + subject + want...?", note: "More casual than 'Would you like...?'", remember: "Do/Does (not Would) for want questions!" },

      { category: "Comparing Structures", would_like_positive: "I'd like a coffee. (polite)", want_positive: "I want a coffee. (direct)", would_like_question: "Would you like tea? (polite offer)", want_question: "Do you want tea? (casual offer)", would_like_negative: "I wouldn't like that. (polite)", want_negative: "I don't want that. (direct)", key: "Same meaning, different politeness level!" },

      { category: "Common Uses - Would Like", restaurant: "I'd like the pasta, please. / We'd like to order.", shopping: "I'd like to try this on. / I'd like to see that, please.", formal_request: "I'd like to speak to the manager. / I'd like some information.", offers: "Would you like a drink? / Would you like to join us?", note: "Perfect for customer service, formal situations", remember: "Use when you want to be polite!" },

      { category: "Common Uses - Want", friends_family: "I want pizza for dinner. / Do you want to watch a movie?", expressing_desires: "I want to travel the world. / She wants a new phone.", direct_questions: "What do you want to do? / Where do you want to go?", emphasis: "I really want this! / I don't want to go!", note: "More emotional, more direct", remember: "Use in casual situations!" },

      { category: "Want + Object + To + Verb", pattern: "Subject + want + OBJECT + to + verb", examples: "I want YOU to come. / She wants HIM to help. / They want US to stay.", meaning: "You want someone else to do something", turkish: "Birinin bir şey yapmasını istemek", structure: "want + person + to + action", note: "Different from 'want to' - this is about wanting someone else to act!" },

      { category: "I'd love to (Enthusiastic Yes)", use: "Enthusiastic way to accept an invitation", question_answer: "Would you like to come to my party? → Yes, I'd LOVE to!", meaning: "I'd love to = I'd like to (but more enthusiastic)", examples: "Would you like to join us? → I'd love to! / Would you like some cake? → I'd love some!", note: "'Love' instead of 'like' shows strong interest", remember: "Very positive and friendly response!" },

      { category: "Would Like vs Like (Different!)", would_like: "WOULD LIKE = want (specific desire, now)", example_would: "I would like a coffee. (I want coffee now)", like: "LIKE = enjoy, have positive feelings about (general)", example_like: "I like coffee. (I enjoy coffee in general)", difference: "Would like = want | Like = enjoy", wrong: "I like a coffee ✗ (sounds strange)", correct: "I'd like a coffee ✓ (want coffee) | I like coffee ✓ (enjoy coffee)", remember: "Don't confuse 'would like' (want) with 'like' (enjoy)!" },

      { category: "Responding to Offers", polite_yes: "Yes, please. / Yes, I'd love to. / That would be nice, thank you.", polite_no: "No, thank you. / No, thanks. / I'm fine, thanks.", maybe: "Maybe later, thanks. / I'm not sure.", note: "Always acknowledge the offer politely!", examples: "Would you like tea? → Yes, please. / No, thank you. / I'm fine, thanks.", remember: "Say 'thank you' even when declining!" },

      { category: "Common Mistakes", mistake_1: "Using 'would want' instead of 'would like'", wrong_1: "I would want a coffee ✗", correct_1: "I would like a coffee ✓ OR I want a coffee ✓", rule: "Use 'would like' OR 'want', not 'would want'!", note: "'Would want' is not standard - avoid it" },
      { category: "Common Mistakes", mistake_2: "Forgetting '-s' with he/she/it for 'want'", wrong_2: "He want coffee ✗ / She want to go ✗", correct_2: "He wants coffee ✓ / She wants to go ✓", rule: "He/She/It WANTS (add -s)", remember: "Want follows normal present simple rules!" },
      { category: "Common Mistakes", mistake_3: "Using 'do/does' with 'would like' questions", wrong_3: "Do you would like tea? ✗ / Does she would like to go? ✗", correct_3: "Would you like tea? ✓ / Would she like to go? ✓", rule: "Would like questions start with WOULD (not do/does)", pattern: "Would + subject + like...?" },
      { category: "Common Mistakes", mistake_4: "Confusing 'would like' with 'like'", wrong_4: "I like some tea ✗ (sounds like you enjoy tea in general, not that you want it now)", correct_4: "I'd like some tea ✓ (want tea now) OR I like tea ✓ (enjoy tea)", difference: "Would like = want (now) | Like = enjoy (general)", remember: "Would like = specific desire!" },

      { category: "Politeness Comparison", most_polite: "I would like a coffee, please.", polite: "I'd like a coffee, please.", neutral: "Can I have a coffee, please?", casual: "I want a coffee.", direct: "Give me a coffee.", note: "All communicate the same desire, but VERY different politeness!", use_would_like: "Safest in formal situations", use_want: "Fine with friends and family" },

      { category: "Real-World Uses", restaurant: "I'd like the chicken, please. / Would you like dessert?", shopping: "I'd like to try this on. / Do you want to pay by card?", invitations: "Would you like to come to dinner? / I'd love to!", expressing_needs: "I want a new phone. / I'd like some help, please.", casual_chat: "What do you want to do tonight? / I want to watch a movie.", general: "Essential for polite communication in all situations!" },

      { category: "Key Takeaway", summary: "WOULD LIKE and WANT both express desires, but different politeness", would_like_use: "WOULD LIKE = polite, formal, courteous", want_use: "WANT = direct, casual, informal", would_like_structure: "Subject + would like + noun/to + verb", want_structure: "Subject + want/wants + noun/to + verb", would_like_question: "Would you like...? (polite offer)", want_question: "Do you want...? (casual offer)", contraction: "I would like → I'd like (very common!)", difference: "Would like ≠ Like! (would like = want | like = enjoy)", remember: "Use 'would like' to be polite! Use 'want' with friends. Never 'would want'!", next: "Practice making polite requests!" }
    ]
  },
  
  speakingPractice: [
    { question: "What would you like to eat?", answer: "I would like to eat pasta.", multipleChoice: { prompt: "I ___ like to eat pasta.", options: [{ letter: "A", text: "could", correct: false }, { letter: "B", text: "can", correct: false }, { letter: "C", text: "would", correct: true }] } },
    { question: "What do you want to drink?", answer: "I want to drink orange juice.", multipleChoice: { prompt: "I want ___ orange juice.", options: [{ letter: "A", text: "drink", correct: false }, { letter: "B", text: "drinking", correct: false }, { letter: "C", text: "to drink", correct: true }] } },
    { question: "Would you like a cup of tea?", answer: "Yes, I would like a cup of tea.", multipleChoice: { prompt: "Yes, I ___ like a cup of tea.", options: [{ letter: "A", text: "can", correct: false }, { letter: "B", text: "could", correct: false }, { letter: "C", text: "would", correct: true }] } },
    { question: "Do you want some coffee?", answer: "Yes, I want some coffee.", multipleChoice: { prompt: "Yes, ___ want some coffee.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "What would your friend like for dinner?", answer: "She would like some chicken.", multipleChoice: { prompt: "She ___ like some chicken.", options: [{ letter: "A", text: "could", correct: false }, { letter: "B", text: "would", correct: true }, { letter: "C", text: "can", correct: false }] } },
    { question: "What does your brother want to buy?", answer: "He wants to buy a new phone.", multipleChoice: { prompt: "He wants ___ a new phone.", options: [{ letter: "A", text: "to buy", correct: true }, { letter: "B", text: "buy", correct: false }, { letter: "C", text: "buying", correct: false }] } },
    { question: "Would you like to go out with your friends?", answer: "Yes, I’d love to.", openResponse: true },
    { question: "Do you want to go out tonight?", answer: "Yes, I want to go to the cinema.", multipleChoice: { prompt: "Yes, I want ___ to the cinema.", options: [{ letter: "A", text: "to go", correct: true }, { letter: "B", text: "go", correct: false }, { letter: "C", text: "going", correct: false }] } },
    { question: "Would children like some dessert?", answer: "Yes, they would like some ice cream.", multipleChoice: { prompt: "Yes, they ___ like some ice cream.", options: [{ letter: "A", text: "could", correct: false }, { letter: "B", text: "would", correct: true }, { letter: "C", text: "can", correct: false }] } },
    { question: "Do you want to play a game?", answer: "Yes, I want to play chess.", multipleChoice: { prompt: "Yes, I want ___ chess.", options: [{ letter: "A", text: "play", correct: false }, { letter: "B", text: "to play", correct: true }, { letter: "C", text: "playing", correct: false }] } },
    { question: "Would you like to visit London?", answer: "Yes, I would love to visit London.", multipleChoice: { prompt: "Yes, I ___ love to visit London.", options: [{ letter: "A", text: "could", correct: false }, { letter: "B", text: "would", correct: true }, { letter: "C", text: "can", correct: false }] } },
    { question: "Do you want to take a break?", answer: "Yes, I need a break.", multipleChoice: { prompt: "Yes, ___ need a break.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "What would your friend like to do?", answer: "He would like to go shopping.", multipleChoice: { prompt: "He ___ like to go shopping.", options: [{ letter: "A", text: "would", correct: true }, { letter: "B", text: "can", correct: false }, { letter: "C", text: "could", correct: false }] } },
    { question: "Would you like some water?", answer: "Yes, please.", openResponse: true },
    { question: "Do you want to watch a movie?", answer: "Yes, I want to watch an action movie.", multipleChoice: { prompt: "Yes, I want ___ an action movie.", options: [{ letter: "A", text: "watching", correct: false }, { letter: "B", text: "to watch", correct: true }, { letter: "C", text: "watch", correct: false }] } },
    { question: "Would your sister like some cake?", answer: "Yes, she would.", multipleChoice: { prompt: "Yes, she ___.", options: [{ letter: "A", text: "will", correct: false }, { letter: "B", text: "would", correct: true }, { letter: "C", text: "could", correct: false }] } },
    { question: "What do you want to do tomorrow?", answer: "I want to relax at home.", multipleChoice: { prompt: "I want ___ at home.", options: [{ letter: "A", text: "relaxing", correct: false }, { letter: "B", text: "to relax", correct: true }, { letter: "C", text: "relax", correct: false }] } },
    { question: "What would you like for breakfast?", answer: "I would like eggs and toast.", multipleChoice: { prompt: "I ___ like eggs and toast.", options: [{ letter: "A", text: "would", correct: true }, { letter: "B", text: "can", correct: false }, { letter: "C", text: "could", correct: false }] } },
    { question: "Would your brother like to join us?", answer: "Yes, he would.", multipleChoice: { prompt: "Yes, he ___.", options: [{ letter: "A", text: "would", correct: true }, { letter: "B", text: "will", correct: false }, { letter: "C", text: "could", correct: false }] } },
    { question: "Do you want to listen to music?", answer: "Yes, I do.", multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "do", correct: true }, { letter: "B", text: "does", correct: false }, { letter: "C", text: "doed", correct: false }] } },
    { question: "Would you like to learn Spanish?", answer: "Yes, I would.", multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "will", correct: false }, { letter: "B", text: "could", correct: false }, { letter: "C", text: "would", correct: true }] } },
    { question: "What would your friends like to order?", answer: "They would like two pizzas.", multipleChoice: { prompt: "They ___ like two pizzas.", options: [{ letter: "A", text: "can", correct: false }, { letter: "B", text: "could", correct: false }, { letter: "C", text: "would", correct: true }] } },
    { question: "Do you want to play football later?", answer: "Yes, I want to play.", multipleChoice: { prompt: "Yes, I want ___.", options: [{ letter: "A", text: "playing", correct: false }, { letter: "B", text: "play", correct: false }, { letter: "C", text: "to play", correct: true }] } },
    { question: "Would you like to go to the museum?", answer: "Yes, that sounds great.", openResponse: true },
    { question: "What does your mother want to eat?", answer: "She wants to eat salad.", multipleChoice: { prompt: "She wants ___ salad.", options: [{ letter: "A", text: "eat", correct: false }, { letter: "B", text: "eating", correct: false }, { letter: "C", text: "to eat", correct: true }] } },
    { question: "Would you like another drink?", answer: "No, thank you.", openResponse: true },
    { question: "Do you want to call him now?", answer: "Yes, I want to call him.", multipleChoice: { prompt: "Yes, I want ___ him.", options: [{ letter: "A", text: "calling", correct: false }, { letter: "B", text: "call", correct: false }, { letter: "C", text: "to call", correct: true }] } },
    { question: "What would you like to do this weekend?", answer: "I would like to visit my grandparents.", multipleChoice: { prompt: "I ___ like to visit my grandparents.", options: [{ letter: "A", text: "can", correct: false }, { letter: "B", text: "could", correct: false }, { letter: "C", text: "would", correct: true }] } },
    { question: "Would you like to go for a walk?", answer: "Yes, I’d love to.", openResponse: true },
    { question: "Do you want to cook dinner together with your friend?", answer: "Yes, that’s a good idea.", multipleChoice: { prompt: "Yes, ___ a good idea.", options: [{ letter: "A", text: "that’s", correct: true }, { letter: "B", text: "that’ing", correct: false }, { letter: "C", text: "that’", correct: false }] } },
    { question: "Would your friends like some tea?", answer: "Yes, they would.", multipleChoice: { prompt: "Yes, they ___.", options: [{ letter: "A", text: "would", correct: true }, { letter: "B", text: "could", correct: false }, { letter: "C", text: "will", correct: false }] } },
    { question: "What would you like to learn?", answer: "I’d like to learn how to play the guitar.", multipleChoice: { prompt: "I’d like to ___ how to play the guitar.", options: [{ letter: "A", text: "learns", correct: false }, { letter: "B", text: "learn", correct: true }, { letter: "C", text: "learning", correct: false }] } },
    { question: "Would your sister like to see a movie with you?", answer: "Yes, she would.", multipleChoice: { prompt: "Yes, she ___.", options: [{ letter: "A", text: "could", correct: false }, { letter: "B", text: "would", correct: true }, { letter: "C", text: "will", correct: false }] } },
    { question: "Do you want to try a new video game?", answer: "Yes, I want to try.", multipleChoice: { prompt: "Yes, I want ___.", options: [{ letter: "A", text: "try", correct: false }, { letter: "B", text: "to try", correct: true }, { letter: "C", text: "trying", correct: false }] } },
    { question: "Would you like to sit outside?", answer: "Yes, thank you.", openResponse: true },
    { question: "What do you want to wear?", answer: "I want to wear something comfortable.", multipleChoice: { prompt: "I want ___ something comfortable.", options: [{ letter: "A", text: "to wear", correct: true }, { letter: "B", text: "wear", correct: false }, { letter: "C", text: "wearing", correct: false }] } },
    { question: "Would you like to eat some chocolate with your coffee?", answer: "Yes, if possible.", openResponse: true },
    { question: "Do you want to eat outside?", answer: "Yes, I’d like to eat outside.", multipleChoice: { prompt: "Yes, I’d like to ___ outside.", options: [{ letter: "A", text: "eats", correct: false }, { letter: "B", text: "eat", correct: true }, { letter: "C", text: "eating", correct: false }] } },
    { question: "Would you like to join a sports club?", answer: "Yes, I would.", multipleChoice: { prompt: "Yes, I ___.", options: [{ letter: "A", text: "will", correct: false }, { letter: "B", text: "would", correct: true }, { letter: "C", text: "could", correct: false }] } },
    { question: "What would you like to do after school?", answer: "I’d like to rest and read a book.", multipleChoice: { prompt: "I’d like to ___ and read a book.", options: [{ letter: "A", text: "rest", correct: true }, { letter: "B", text: "resting", correct: false }, { letter: "C", text: "rests", correct: false }] } },
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

  table: {
    title: "📋 Must / Mustn't (Necessity and Prohibition)",
    data: [
      { category: "What are Must and Mustn't?", explanation: "Modal verbs used to express strong necessity or prohibition", must: "MUST = necessary, required, very important to do", mustnt: "MUSTN'T = prohibited, forbidden, not allowed", turkish: "Must = gerekli, zorunlu | Mustn't = yasak", function: "Give strong advice, rules, laws, or prohibitions", note: "Very strong - stronger than 'should'" },

      { category: "MUST - Structure", form: "Subject + MUST + BASE VERB", examples: "I must study. / You must listen. / She must go. / They must wait.", pattern: "must + base verb (no 'to', no -s, no -ing)", turkish: "Özne + must + fiil", same_all_subjects: "MUST never changes! (not musts, not musted)", note: "Must is a modal verb - it doesn't conjugate" },
      { category: "When to Use MUST", use_1: "Necessity - something is very important or required", examples_1: "You must study for the exam. / I must finish this today. / We must arrive on time.", use_2: "Rules and laws", examples_2: "You must wear a seatbelt. / Students must do their homework. / Everyone must pay taxes.", use_3: "Strong advice", examples_3: "You must see this movie! (I really recommend it) / You must try this food!", turkish: "Gereklilik, kural, güçlü tavsiye", note: "Shows the speaker thinks it's very important!" },

      { category: "MUSTN'T - Structure", form: "Subject + MUST NOT (mustn't) + BASE VERB", examples: "You mustn't smoke. / She mustn't be late. / They mustn't run.", contraction: "must not → mustn't (very common)", pattern: "mustn't + base verb", turkish: "Özne + mustn't + fiil", note: "Negative form of must" },
      { category: "When to Use MUSTN'T", use: "Prohibition - something is NOT ALLOWED, forbidden", examples: "You mustn't smoke here. / Students mustn't cheat. / You mustn't touch that!", meaning: "It's against the rules / It's dangerous / It's forbidden", turkish: "Yasak, yapılmaması gereken", important: "MUSTN'T = prohibition (not allowed!) ≠ don't have to (not necessary)", remember: "Mustn't = DON'T do it (it's forbidden)!" },

      { category: "MUST vs DON'T HAVE TO - Very Different!", must: "MUST = necessary (you need to do it)", example_must: "You must wear a helmet. (It's required for safety)", dont_have_to: "DON'T HAVE TO = not necessary (you can choose)", example_dont: "You don't have to wear a tie. (It's optional, your choice)", key_difference: "Must = required | Don't have to = optional", wrong: "You mustn't wear a tie ✗ (This means it's forbidden!)", correct: "You don't have to wear a tie ✓ (It's optional)", remember: "Mustn't ≠ don't have to!" },

      { category: "MUSTN'T vs DON'T HAVE TO", mustnt: "MUSTN'T = prohibition (forbidden, not allowed)", example_mustnt: "You mustn't park here. (It's illegal/forbidden)", dont_have_to: "DON'T HAVE TO = not necessary (optional, your choice)", example_dont_have: "You don't have to park here. (You can park somewhere else if you want)", critical: "These have OPPOSITE meanings!", mustnt_meaning: "Mustn't = DON'T do it!", dont_have_meaning: "Don't have to = you don't need to (but you can)", remember: "Mustn't = forbidden | Don't have to = not necessary" },

      { category: "Questions with MUST", form: "MUST + subject + BASE VERB?", examples: "Must I go? / Must we leave now? / Must she work today?", answers: "Yes, you must. / No, you don't have to. (not 'mustn't' for negative answers!)", pattern: "Invert must and subject", note: "Questions with must are less common - often we use 'Do I have to...?' instead", alternative: "Do I have to go? (more common than 'Must I go?')" },

      { category: "Short Answers", yes_answer: "Yes, you must. / Yes, she must.", no_answer: "No, you don't have to. (NOT 'No, you mustn't'!)", important: "For negative answers, use 'don't have to' (not necessary), NOT 'mustn't' (forbidden)", example: "Must I finish this? → No, you don't have to. (It's not necessary)", wrong: "No, you mustn't ✗ (This means it's forbidden to finish!)", correct: "No, you don't have to ✓ (It's not necessary)", remember: "Mustn't is for prohibition, not for answering 'must' questions!" },

      { category: "Common Uses of MUST", safety_rules: "You must wear a helmet. / You must wear a seatbelt.", school_work: "Students must do their homework. / I must study for the test.", laws: "You must have a license to drive. / Everyone must pay taxes.", health: "You must take your medicine. / You must see a doctor.", time_deadlines: "We must leave now. / I must finish this by 5 PM.", note: "Used for important rules, laws, and strong obligations" },

      { category: "Common Uses of MUSTN'T", prohibitions: "You mustn't smoke in the hospital. / You mustn't run in the hallways.", safety_warnings: "You mustn't touch that wire! (It's dangerous) / You mustn't swim here!", rules: "Students mustn't cheat on exams. / You mustn't park here.", laws: "You mustn't drive without a license. / You mustn't steal.", note: "Used for things that are forbidden, dangerous, or against rules" },

      { category: "Must for Deduction (Advanced)", use: "MUST can also mean 'I'm sure / I believe' (logical deduction)", examples: "She must be tired. (= I'm sure she's tired) / It must be expensive. (= I'm sure it's expensive) / He must know the answer.", meaning: "Strong belief based on evidence", note: "This is a more advanced use - focus on must/mustn't for rules first", difference: "You must go (necessity) vs She must be happy (deduction)" },

      { category: "Common Mistakes", mistake_1: "Adding 'to' after must", wrong_1: "You must to go ✗ / She must to study ✗", correct_1: "You must go ✓ / She must study ✓", rule: "Must + BASE VERB (no 'to'!)", remember: "Modal verbs don't use 'to'" },
      { category: "Common Mistakes", mistake_2: "Adding -s for he/she/it", wrong_2: "He musts go ✗ / She musts study ✗", correct_2: "He must go ✓ / She must study ✓", rule: "MUST never changes! Same for all subjects", remember: "Modal verbs don't add -s" },
      { category: "Common Mistakes", mistake_3: "Using mustn't when you mean 'don't have to'", wrong_3: "You mustn't wear a tie ✗ (This means it's forbidden!)", correct_3: "You don't have to wear a tie ✓ (It's not necessary)", meaning: "Mustn't = prohibited | Don't have to = not necessary", remember: "Very different meanings!" },
      { category: "Common Mistakes", mistake_4: "Using 'mustn't' in negative answers to 'must' questions", wrong_4: "Must I go? → No, you mustn't ✗ (This means it's forbidden to go!)", correct_4: "Must I go? → No, you don't have to ✓ (It's not necessary)", rule: "Answer with 'don't have to' for 'not necessary'", remember: "Mustn't = forbidden, not = not necessary" },

      { category: "Must vs Have To", must: "MUST = speaker's opinion (I think it's important)", example_must: "You must see this film! (My opinion - I recommend it)", have_to: "HAVE TO = external rule/obligation (the rule says...)", example_have_to: "I have to wear a uniform. (School rule, not my choice)", difference: "Must = speaker's authority | Have to = external authority", note: "In practice, they're often interchangeable for obligation", both: "You must study / You have to study (both mean it's necessary)" },

      { category: "Pronunciation", must: "must /mʌst/ (strong form)", weak_must: "must /məst/ (weak form - more common in speech)", mustnt: "mustn't /ˈmʌsnt/", note: "In fast speech, 'must' often sounds like 'məst'", example: "You /məst/ go. (weak form)", remember: "Native speakers usually use the weak form" },

      { category: "Real-World Uses", signs: "You mustn't park here. / You must wear a mask.", school: "Students must arrive on time. / You mustn't use phones in class.", work: "Employees must sign in. / You mustn't share your password.", health: "You must wash your hands. / You mustn't smoke in the building.", general: "Essential for expressing rules, prohibitions, and strong obligations!" },

      { category: "Key Takeaway", summary: "MUST and MUSTN'T express strong necessity and prohibition", must_meaning: "MUST = necessary, required, very important to do", mustnt_meaning: "MUSTN'T = prohibited, forbidden, not allowed to do", structure_positive: "Subject + must + BASE VERB", structure_negative: "Subject + mustn't + BASE VERB", no_changes: "Must never changes - same for all subjects (no -s, no -ed)", critical_difference: "MUSTN'T (forbidden) ≠ DON'T HAVE TO (not necessary)", must_vs_have_to: "Must = speaker's authority | Have to = external rule", common_mistakes: "No 'to' after must! No -s! Don't confuse mustn't with don't have to!", remember: "Must = you need to do it | Mustn't = don't do it (it's forbidden)!", next: "Practice with rules and prohibitions!" }
    ]
  },
  
  speakingPractice: [
    { question: "What must you do every day?", answer: "I must brush my teeth.", multipleChoice: { prompt: "I ___ brush my teeth.", options: [{ letter: "A", text: "could", correct: false }, { letter: "B", text: "can", correct: false }, { letter: "C", text: "must", correct: true }] } },
    { question: "What mustn’t you do in the library?", answer: "I mustn’t speak loudly.", multipleChoice: { prompt: "___ mustn’t speak loudly.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Must students do their homework?", answer: "Yes, students must do their homework.", multipleChoice: { prompt: "Yes, students ___ do their homework.", options: [{ letter: "A", text: "can", correct: false }, { letter: "B", text: "could", correct: false }, { letter: "C", text: "must", correct: true }] } },
    { question: "Mustn’t children play with fire?", answer: "No, they mustn’t play with fire.", multipleChoice: { prompt: "No, they mustn’t play ___ fire.", options: [{ letter: "A", text: "for", correct: false }, { letter: "B", text: "by", correct: false }, { letter: "C", text: "with", correct: true }] } },
    { question: "What must you take to school?", answer: "I must take my books.", multipleChoice: { prompt: "I must ___ my books.", options: [{ letter: "A", text: "drink", correct: false }, { letter: "B", text: "take", correct: true }, { letter: "C", text: "eat", correct: false }] } },
    { question: "What mustn’t you forget before an exam?", answer: "I mustn’t forget my ID.", multipleChoice: { prompt: "___ mustn’t forget my ID.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Must we wear uniforms?", answer: "Yes, we must wear uniforms.", multipleChoice: { prompt: "Yes, we ___ wear uniforms.", options: [{ letter: "A", text: "must", correct: true }, { letter: "B", text: "could", correct: false }, { letter: "C", text: "can", correct: false }] } },
    { question: "Mustn’t you use your phone in class?", answer: "Yes, I mustn’t use my phone.", multipleChoice: { prompt: "Yes, ___ mustn’t use my phone.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "What must drivers do?", answer: "Drivers must follow the rules.", multipleChoice: { prompt: "Drivers ___ follow the rules.", options: [{ letter: "A", text: "could", correct: false }, { letter: "B", text: "must", correct: true }, { letter: "C", text: "can", correct: false }] } },
    { question: "What mustn’t you do in a museum?", answer: "I mustn’t touch anything.", multipleChoice: { prompt: "___ mustn’t touch anything.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "Must people pay taxes?", answer: "Yes, people must pay taxes.", multipleChoice: { prompt: "Yes, people ___ pay taxes.", options: [{ letter: "A", text: "could", correct: false }, { letter: "B", text: "must", correct: true }, { letter: "C", text: "can", correct: false }] } },
    { question: "What mustn’t we do in exams?", answer: "We mustn’t cheat.", multipleChoice: { prompt: "___ mustn’t cheat.", options: [{ letter: "A", text: "we", correct: true }, { letter: "B", text: "they", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "What must you do if you're sick?", answer: "I must see a doctor.", multipleChoice: { prompt: "I ___ see a doctor.", options: [{ letter: "A", text: "must", correct: true }, { letter: "B", text: "might", correct: false }, { letter: "C", text: "could", correct: false }] } },
    { question: "Must you wear a mask in hospitals?", answer: "Yes, I must wear a mask.", multipleChoice: { prompt: "Yes, I ___ wear a mask.", options: [{ letter: "A", text: "must", correct: true }, { letter: "B", text: "can", correct: false }, { letter: "C", text: "could", correct: false }] } },
    { question: "Mustn’t you run in the hall?", answer: "Yes, I mustn’t run in the hall.", multipleChoice: { prompt: "Yes, I ___ run in the hall.", options: [{ letter: "A", text: "doesn’t", correct: false }, { letter: "B", text: "isn’t", correct: false }, { letter: "C", text: "mustn’t", correct: true }] } },
    { question: "What must we do before bed?", answer: "We must brush our teeth.", multipleChoice: { prompt: "We ___ brush our teeth.", options: [{ letter: "A", text: "can", correct: false }, { letter: "B", text: "must", correct: true }, { letter: "C", text: "could", correct: false }] } },
    { question: "Must we bring our homework to class?", answer: "Yes, we must bring it.", multipleChoice: { prompt: "Yes, we ___ bring it.", options: [{ letter: "A", text: "can", correct: false }, { letter: "B", text: "must", correct: true }, { letter: "C", text: "could", correct: false }] } },
    { question: "What must you do when the teacher speaks?", answer: "I must listen carefully.", multipleChoice: { prompt: "I ___ listen carefully.", options: [{ letter: "A", text: "must", correct: true }, { letter: "B", text: "can", correct: false }, { letter: "C", text: "could", correct: false }] } },
    { question: "Must visitors buy a ticket?", answer: "Yes, they must.", multipleChoice: { prompt: "Yes, ___ must.", options: [{ letter: "A", text: "they", correct: true }, { letter: "B", text: "we", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "What mustn’t children drink?", answer: "They mustn’t drink coffee.", multipleChoice: { prompt: "___ mustn’t drink coffee.", options: [{ letter: "A", text: "they", correct: true }, { letter: "B", text: "we", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Must you speak English in class?", answer: "Yes, I must.", multipleChoice: { prompt: "Yes, ___ must.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Mustn’t people park here?", answer: "Yes, they mustn’t park here.", multipleChoice: { prompt: "Yes, ___ mustn’t park here.", options: [{ letter: "A", text: "we", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "they", correct: true }] } },
    { question: "What must you do when you cross the street?", answer: "I must look both ways.", multipleChoice: { prompt: "I ___ look both ways.", options: [{ letter: "A", text: "can", correct: false }, { letter: "B", text: "could", correct: false }, { letter: "C", text: "must", correct: true }] } },
    { question: "Must you take medicine when you're sick?", answer: "Yes, I must.", multipleChoice: { prompt: "Yes, ___ must.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "What mustn’t we do in a cinema?", answer: "We mustn’t use our phones.", multipleChoice: { prompt: "___ mustn’t use our phones.", options: [{ letter: "A", text: "they", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "we", correct: true }] } },
    { question: "Must employees come on time?", answer: "Yes, they must.", multipleChoice: { prompt: "Yes, ___ must.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "we", correct: false }, { letter: "C", text: "they", correct: true }] } },
    { question: "What must you do when your phone rings in class?", answer: "I must turn it off.", multipleChoice: { prompt: "I ___ turn it off.", options: [{ letter: "A", text: "can", correct: false }, { letter: "B", text: "could", correct: false }, { letter: "C", text: "must", correct: true }] } },
    { question: "Mustn’t you eat in the computer lab?", answer: "Yes, I mustn’t eat there.", multipleChoice: { prompt: "Yes, ___ mustn’t eat there.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "What must tourists do when they visit a mosque?", answer: "They must dress respectfully.", multipleChoice: { prompt: "They ___ dress respectfully.", options: [{ letter: "A", text: "can", correct: false }, { letter: "B", text: "could", correct: false }, { letter: "C", text: "must", correct: true }] } },
    { question: "Must we arrive early to meetings?", answer: "Yes, we must.", multipleChoice: { prompt: "Yes, ___ must.", options: [{ letter: "A", text: "we", correct: true }, { letter: "B", text: "they", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "What must you do before a trip?", answer: "I must pack my bag.", multipleChoice: { prompt: "I ___ pack my bag.", options: [{ letter: "A", text: "must", correct: true }, { letter: "B", text: "could", correct: false }, { letter: "C", text: "can", correct: false }] } },
    { question: "Must you be quiet in the library?", answer: "Yes, I must.", multipleChoice: { prompt: "Yes, ___ must.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Mustn’t you smoke in public places?", answer: "Yes, I mustn’t.", multipleChoice: { prompt: "Yes, ___ mustn’t.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "What must you wear in winter?", answer: "I must wear a coat.", multipleChoice: { prompt: "I ___ wear a coat.", options: [{ letter: "A", text: "could", correct: false }, { letter: "B", text: "must", correct: true }, { letter: "C", text: "can", correct: false }] } },
    { question: "Mustn’t people feed animals in the zoo?", answer: "Yes, they mustn’t.", multipleChoice: { prompt: "Yes, ___ mustn’t.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "they", correct: true }, { letter: "C", text: "we", correct: false }] } },
    { question: "What must you do before sleeping?", answer: "I must set my alarm.", multipleChoice: { prompt: "I ___ set my alarm.", options: [{ letter: "A", text: "must", correct: true }, { letter: "B", text: "could", correct: false }, { letter: "C", text: "can", correct: false }] } },
    { question: "Must you study for tests?", answer: "Yes, I must.", multipleChoice: { prompt: "Yes, ___ must.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Mustn’t we litter in the park?", answer: "Yes, we mustn’t litter.", multipleChoice: { prompt: "Yes, ___ mustn’t litter.", options: [{ letter: "A", text: "we", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "they", correct: false }] } },
    { question: "What must people do in emergencies?", answer: "They must call for help.", multipleChoice: { prompt: "They ___ call for help.", options: [{ letter: "A", text: "can", correct: false }, { letter: "B", text: "must", correct: true }, { letter: "C", text: "could", correct: false }] } },
    { question: "Must you do your best in school?", answer: "Yes, I must do my best.", multipleChoice: { prompt: "Yes, I ___ do my best.", options: [{ letter: "A", text: "can", correct: false }, { letter: "B", text: "must", correct: true }, { letter: "C", text: "could", correct: false }] } },
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

  table: {
    title: "📋 Have To / Don't Have To (Obligation and Lack of Necessity)",
    data: [
      { category: "What is Have To?", explanation: "Expression used to show obligation or necessity (similar to 'must')", have_to: "HAVE TO = necessary, required, obligation", dont_have_to: "DON'T HAVE TO = not necessary, optional, not required", turkish: "Have to = gerekli, zorunlu | Don't have to = gerekli değil", function: "Express external obligations and choices", note: "Have to is NOT a modal verb - it conjugates like a normal verb!" },

      { category: "HAVE TO - Structure Positive", form: "Subject + HAVE/HAS TO + BASE VERB", i_you_we_they: "I have to / You have to / We have to / They have to", he_she_it: "He HAS to / She HAS to / It HAS to", examples: "I have to go to school. / She has to work today. / They have to study.", pattern: "have/has + to + base verb", turkish: "Özne + have/has to + fiil", important: "Add -s for he/she/it → HAS to!" },

      { category: "DON'T HAVE TO - Structure Negative", form: "Subject + DON'T/DOESN'T + HAVE TO + BASE VERB", i_you_we_they: "I don't have to / You don't have to / We don't have to / They don't have to", he_she_it: "He DOESN'T have to / She DOESN'T have to / It DOESN'T have to", examples: "I don't have to work tomorrow. / She doesn't have to come. / They don't have to pay.", pattern: "don't/doesn't + have to + base verb", turkish: "Özne + don't/doesn't have to + fiil", important: "Use doesn't for he/she/it!" },

      { category: "Questions with HAVE TO", form: "DO/DOES + subject + HAVE TO + BASE VERB?", examples: "Do you have to go? / Does she have to work? / Do they have to study?", answers: "Yes, I do. / No, I don't. / Yes, she does. / No, she doesn't.", pattern: "Do/Does + subject + have to + verb?", inversion: "Use do/does, not have/has, at the beginning!", turkish: "Do/Does + özne + have to + fiil?", remember: "Do you have to...? (NOT Have you to...?)" },

      { category: "When to Use HAVE TO", use: "Express external obligation - rules, requirements, necessities not from the speaker", examples: "I have to wear a uniform. (School rule) / She has to work on Saturdays. (Job requirement) / We have to pay rent. (Legal obligation)", difference_from_must: "Have to = external rule (not speaker's choice) | Must = speaker's opinion", note: "Use have to when it's an external obligation, not your personal opinion", turkish: "Dış yükümlülükler - kurallar, gereklilikler" },

      { category: "When to Use DON'T HAVE TO", use: "Express lack of necessity - something is NOT required, it's optional", examples: "You don't have to come. (It's optional) / She doesn't have to work tomorrow. (It's not required) / We don't have to hurry. (We have time)", meaning: "It's not necessary, but you CAN if you want", turkish: "Gerekli değil, zorunlu değil", important: "DON'T HAVE TO ≠ MUSTN'T! (Very different!)", remember: "Don't have to = not necessary (your choice) | Mustn't = forbidden (not allowed)!" },

      { category: "CRITICAL: DON'T HAVE TO vs MUSTN'T", dont_have_to: "DON'T HAVE TO = not necessary, optional, your choice", example_dont: "You don't have to wear a tie. (It's optional - you can if you want)", mustnt: "MUSTN'T = prohibited, forbidden, not allowed", example_mustnt: "You mustn't smoke here. (It's against the rules - don't do it!)", difference: "Don't have to = you can choose | Mustn't = you can't do it", wrong: "You mustn't come ✗ (This means it's forbidden to come!)", correct: "You don't have to come ✓ (It's not necessary, but you can)", remember: "Completely different meanings!" },

      { category: "Examples Comparing All Three", have_to: "You have to study. (It's necessary - external rule)", must: "You must study. (It's necessary - my opinion/advice)", dont_have_to: "You don't have to study. (It's not necessary - your choice)", mustnt: "You mustn't cheat. (It's forbidden - don't do it!)", key: "Have to & Must = necessary | Don't have to = not necessary | Mustn't = forbidden", practice: "Learn to distinguish these!" },

      { category: "HAVE TO vs MUST - Subtle Difference", have_to: "HAVE TO = external obligation (rule, law, requirement)", must: "MUST = speaker's opinion, advice, or authority", example_have: "I have to wear a uniform. (School requires it)", example_must: "You must see this movie! (I think you should - my recommendation)", note: "In practice, they're often interchangeable for stating obligations", both_ok: "I have to study / I must study (both mean it's necessary)", formal: "In formal rules, 'must' is more common: 'Students must arrive on time.'" },

      { category: "All Tenses of HAVE TO", present: "I have to go now. / She has to study.", past: "I HAD TO go yesterday. / She HAD TO work.", future: "I will have to go tomorrow. / She'll have to study.", note: "Have to can change tense - must cannot!", must_limitation: "Must is only present tense - use have to for past/future", examples_past: "I had to wake up early. (NOT 'I must woke up')", examples_future: "I'll have to leave soon. (NOT 'I must will leave')" },

      { category: "Past: HAD TO", form: "Subject + HAD TO + base verb", examples: "I had to work yesterday. / She had to go to the doctor. / They had to wait.", negative: "Subject + DIDN'T HAVE TO + base verb", example_negative: "I didn't have to work yesterday. (It wasn't necessary)", question: "Did + subject + HAVE TO + verb?", example_question: "Did you have to wait? → Yes, I did. / No, I didn't.", note: "HAD TO for all subjects (not 'had to' for he/she/it)" },

      { category: "Future: WILL HAVE TO", form: "Subject + WILL HAVE TO + base verb", examples: "I'll have to study tomorrow. / She'll have to work late. / They'll have to pay.", negative: "Subject + WON'T HAVE TO + base verb", example_negative: "You won't have to come. (It won't be necessary)", question: "Will + subject + HAVE TO + verb?", example_question: "Will you have to work? → Yes, I will. / No, I won't.", note: "Very useful for talking about future obligations!" },

      { category: "Common Mistakes", mistake_1: "Forgetting -s for he/she/it", wrong_1: "She have to go ✗ / He have to study ✗", correct_1: "She HAS to go ✓ / He HAS to study ✓", rule: "Use HAS to (not have to) for he/she/it", remember: "Have to conjugates like a normal verb!" },
      { category: "Common Mistakes", mistake_2: "Using 'have to' at the beginning of questions", wrong_2: "Have you to go? ✗ / Has she to work? ✗", correct_2: "Do you have to go? ✓ / Does she have to work? ✓", rule: "Use DO/DOES at the beginning of questions", remember: "Do you have to...? (NOT Have you to...?)" },
      { category: "Common Mistakes", mistake_3: "Confusing don't have to with mustn't", wrong_3: "You mustn't come ✗ (when you mean it's not necessary)", correct_3: "You don't have to come ✓ (It's not necessary)", meaning: "Don't have to = not necessary | Mustn't = forbidden", remember: "Very different meanings!" },
      { category: "Common Mistakes", mistake_4: "Adding 'to' twice", wrong_4: "I have to to go ✗ / She has to to work ✗", correct_4: "I have to go ✓ / She has to work ✓", rule: "The 'to' is already in 'have TO' - don't add another!", pattern: "have to + BASE VERB" },

      { category: "Common Uses of HAVE TO", work_school: "I have to go to work. / She has to do her homework.", schedules: "We have to leave at 8. / They have to catch the bus.", rules: "Students have to wear uniforms. / You have to pay before entering.", health: "I have to take medicine. / He has to see a doctor.", daily_life: "I have to cook dinner. / She has to clean her room.", note: "Very common for daily obligations and requirements!" },

      { category: "Common Uses of DON'T HAVE TO", optional_activities: "You don't have to come to the party. (But you can if you want)", no_requirement: "She doesn't have to work on Sundays. (It's her day off)", permissions: "You don't have to ask permission. (You're free to decide)", time: "We don't have to hurry. (We have plenty of time)", note: "Use when something is not necessary or required" },

      { category: "Contractions in Speech", full: "I have to → I've gotta (very informal)", has: "He has to → He's gotta (very informal)", informal: "In casual speech, 'have to' can sound like 'hafta' /ˈhæftə/", example: "I hafta go. / She hasta work.", note: "'Gotta' is very informal - use 'have to' in formal situations", formal_writing: "Always write 'have to', not 'hafta' or 'gotta'" },

      { category: "Real-World Uses", work: "I have to finish this report. / Do you have to work late?", school: "Students have to do homework. / She doesn't have to take that class.", rules_laws: "You have to wear a seatbelt. / Do I have to show my ID?", daily_routines: "I have to wake up at 6. / She has to pick up her kids.", permissions: "You don't have to wait. / He doesn't have to pay.", general: "Essential for talking about obligations and choices in everyday life!" },

      { category: "Key Takeaway", summary: "HAVE TO expresses external obligation; DON'T HAVE TO shows lack of necessity", have_to_meaning: "HAVE TO = necessary, required, obligation (external rule)", dont_have_to_meaning: "DON'T HAVE TO = not necessary, optional, not required", structure_positive: "Subject + have/has to + BASE VERB", structure_negative: "Subject + don't/doesn't have to + BASE VERB", structure_question: "Do/Does + subject + have to + BASE VERB?", conjugation: "I/You/We/They have to | He/She/It HAS to", critical_difference: "DON'T HAVE TO (not necessary) ≠ MUSTN'T (forbidden)", have_to_vs_must: "Have to = external rule | Must = speaker's opinion", tenses: "Present: have to | Past: had to | Future: will have to", common_mistakes: "Add -s for he/she/it! Use do/does in questions! Don't confuse with mustn't!", remember: "Have to = you need to do it | Don't have to = you don't need to (but you can)!", next: "Practice distinguishing have to, don't have to, must, and mustn't!" }
    ]
  },
  
  speakingPractice: [
    { question: "Do you have to go to school today?", answer: "Yes, I have to go to school.", multipleChoice: { prompt: "Yes, I ___ to go to school.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "Do you have to do homework every night?", answer: "Yes, I have to do it.", multipleChoice: { prompt: "Yes, I ___ to do it.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "Does your sister have to wear a uniform?", answer: "Yes, she has to wear a uniform.", multipleChoice: { prompt: "Yes, she ___ to wear a uniform.", options: [{ letter: "A", text: "have", correct: false }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "has", correct: true }] } },
    { question: "Do students have to bring their books to school?", answer: "Yes, they have to bring them.", multipleChoice: { prompt: "Yes, they ___ to bring them.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "Do you have to wake up early?", answer: "Yes, I have to wake up at 6.", multipleChoice: { prompt: "Yes, I ___ to wake up at 6.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "has", correct: false }] } },
    { question: "Do the students have to take the test?", answer: "Yes, they have to take it.", multipleChoice: { prompt: "Yes, they ___ to take it.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "has", correct: false }] } },
    { question: "Does your father have to cook dinner?", answer: "No, he doesn’t have to cook.", multipleChoice: { prompt: "No, he doesn’t ___ to cook.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "has", correct: false }] } },
    { question: "Do you have to clean your room?", answer: "Yes, I have to clean it.", multipleChoice: { prompt: "Yes, I ___ to clean it.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "has", correct: false }] } },
    { question: "Does your sister have to wash the dishes?", answer: "Yes, she has to wash them.", multipleChoice: { prompt: "Yes, she ___ to wash them.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "has", correct: true }, { letter: "C", text: "have", correct: false }] } },
    { question: "Do we have to finish the lesson now?", answer: "No, we don’t have to finish yet.", multipleChoice: { prompt: "No, we don’t have to ___ yet.", options: [{ letter: "A", text: "finish", correct: true }, { letter: "B", text: "finished", correct: false }, { letter: "C", text: "finishing", correct: false }] } },
    { question: "Do you have to take your ID when you go shopping?", answer: "No, you don’t have to take it.", multipleChoice: { prompt: "No, you don’t have to ___ it.", options: [{ letter: "A", text: "taking", correct: false }, { letter: "B", text: "take", correct: true }, { letter: "C", text: "took", correct: false }] } },
    { question: "Does your brother have to study?", answer: "Yes, he has to study a lot.", multipleChoice: { prompt: "Yes, he ___ to study a lot.", options: [{ letter: "A", text: "has", correct: true }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "have", correct: false }] } },
    { question: "Do you have to work on weekends?", answer: "No, I don’t have to work.", multipleChoice: { prompt: "No, I don’t ___ to work.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "had", correct: false }] } },
    { question: "Do your parents have to pay for your education?", answer: "Yes, they have to pay.", multipleChoice: { prompt: "Yes, they ___ to pay.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "had", correct: false }] } },
    { question: "Do you have to do everything alone?", answer: "No, I don’t have to.", multipleChoice: { prompt: "No, I don’t ___ to.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "had", correct: false }] } },
    { question: "Does your sister have to wake up early tomorrow?", answer: "Yes, she has to wake up at 7.", multipleChoice: { prompt: "Yes, she ___ to wake up at 7.", options: [{ letter: "A", text: "have", correct: false }, { letter: "B", text: "has", correct: true }, { letter: "C", text: "had", correct: false }] } },
    { question: "Do doctors have to wear masks?", answer: "No, they don’t always have to wear a mask.", multipleChoice: { prompt: "No, they don’t always ___ to wear a mask.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "had", correct: false }] } },
    { question: "Do students have to pass the exam?", answer: "Yes, they have to pass it.", multipleChoice: { prompt: "Yes, they ___ to pass it.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "had", correct: false }] } },
    { question: "Do you have to answer all the questions?", answer: "Yes, I have to answer them.", multipleChoice: { prompt: "Yes, I ___ to answer them.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "had", correct: false }] } },
    { question: "Does your teacher have to check the homework?", answer: "Yes, she has to check it.", multipleChoice: { prompt: "Yes, she ___ to check it.", options: [{ letter: "A", text: "has", correct: true }, { letter: "B", text: "have", correct: false }, { letter: "C", text: "had", correct: false }] } },
    { question: "Do you have to buy a new phone?", answer: "No, I don’t have to.", multipleChoice: { prompt: "No, I don’t ___ to.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "Do you have to finish your tasks today?", answer: "Yes, I have to finish them today.", multipleChoice: { prompt: "Yes, I ___ to finish them today.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "Do children have to go to bed early?", answer: "Yes, they have to.", multipleChoice: { prompt: "Yes, they ___ to.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "Does your friend have to work tonight?", answer: "Yes, he has to work late.", multipleChoice: { prompt: "Yes, he ___ to work late.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "have", correct: false }, { letter: "C", text: "has", correct: true }] } },
    { question: "Do you have to take a bus to work?", answer: "Yes, I have to take a bus every day.", multipleChoice: { prompt: "Yes, I ___ to take a bus every day.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "Does your mother have to learn English?", answer: "No, she doesn’t have to.", multipleChoice: { prompt: "No, she doesn’t ___ to.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "Do we have to pay for the meal when we go to a restaurant?", answer: "Yes, we have to.", multipleChoice: { prompt: "Yes, we ___ to.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "Do you have to speak English in class?", answer: "Yes, I have to speak English.", multipleChoice: { prompt: "Yes, I ___ to speak English.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "Does your friend have to buy a new car?", answer: "No, he doesn’t have to.", multipleChoice: { prompt: "No, he doesn’t ___ to.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "Do you have to call your manager if you have a problem?", answer: "Yes, I have to call her.", multipleChoice: { prompt: "Yes, I ___ to call her.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "has", correct: false }] } },
    { question: "Does your sister have to work on Saturday?", answer: "No, she doesn’t have to.", multipleChoice: { prompt: "No, she doesn’t ___ to.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "has", correct: false }] } },
    { question: "Do students have to listen to their teacher carefully?", answer: "Yes, they have to.", multipleChoice: { prompt: "Yes, they ___ to.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "has", correct: false }] } },
    { question: "Do students have to follow the rules?", answer: "Yes, they have to follow them.", multipleChoice: { prompt: "Yes, they ___ to follow them.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "has", correct: false }] } },
    { question: "Do you have to take your medicine when you’re sick?", answer: "Yes, I have to take them on time.", multipleChoice: { prompt: "Yes, I ___ to take them on time.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "has", correct: false }] } },
    { question: "Does your father have to wear a suit?", answer: "Yes, he has to wear it at work.", multipleChoice: { prompt: "Yes, he ___ to wear it at work.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "has", correct: true }, { letter: "C", text: "have", correct: false }] } },
    { question: "Do you have to hurry in the morning?", answer: "Yes, I have to hurry in the morning.", multipleChoice: { prompt: "Yes, I ___ to hurry in the morning.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "has", correct: false }] } },
    { question: "Do you have to stay at the office until late today?", answer: "No, I don’t have to.", multipleChoice: { prompt: "No, I don’t ___ to.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "has", correct: false }] } },
    { question: "Does your friend have to clean her kitchen?", answer: "Yes, she has to.", multipleChoice: { prompt: "Yes, she ___ to.", options: [{ letter: "A", text: "has", correct: true }, { letter: "B", text: "have", correct: false }, { letter: "C", text: "had", correct: false }] } },
    { question: "Do the workers have to come to the meeting?", answer: "Yes, they do.", multipleChoice: { prompt: "Yes, they ___.", options: [{ letter: "A", text: "does", correct: false }, { letter: "B", text: "do", correct: true }, { letter: "C", text: "doed", correct: false }] } },
    { question: "Do drivers have to be careful?", answer: "Yes, they have to.", multipleChoice: { prompt: "Yes, they ___ to.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "had", correct: false }] } },
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

  table: {
    title: "📋 Daily Routines Vocabulary (Günlük Rutinler)",
    data: [
      { category: "What are Daily Routines?", explanation: "Activities you do every day regularly", turkish: "Günlük rutinler, alışkanlıklar", function: "Talk about your daily schedule and habits", tense: "Use Present Simple for routines", examples: "I wake up at 7. / She goes to school at 8. / We have dinner at 6.", note: "Essential vocabulary for daily life!" },

      { category: "Morning Routines (Sabah Rutini)", wake_up: "wake up (uyanmak) - I wake up at 6:30.", get_up: "get up (kalkmak) - I get up immediately.", brush_teeth: "brush my teeth (dişlerimi fırçalamak) - I brush my teeth twice a day.", take_shower: "take a shower (duş yapmak) - I take a shower every morning.", wash_face: "wash my face (yüzümü yıkamak) - I wash my face with cold water.", get_dressed: "get dressed (giyinmek) - I get dressed quickly.", note: "Morning activities from waking to leaving home" },
      { category: "Morning Routines continued", comb_hair: "comb my hair (saçımı taramak) - She combs her hair.", shave: "shave (tıraş olmak) - He shaves every day.", put_on_makeup: "put on makeup (makyaj yapmak) - She puts on makeup.", have_breakfast: "have breakfast (kahvaltı yapmak) - I have breakfast at 7:30.", make_bed: "make my bed (yatağımı toplamak) - I always make my bed.", leave_home: "leave home (evden çıkmak) - I leave home at 8.", note: "Complete your morning preparation!" },

      { category: "Going to School/Work", go_to_school: "go to school (okula gitmek) - I go to school by bus.", go_to_work: "go to work (işe gitmek) - She goes to work every day.", take_the_bus: "take the bus (otobüse binmek) - I take the bus at 8:15.", walk: "walk (yürümek) - I walk to school.", drive: "drive (araba sürmek) - He drives to work.", arrive: "arrive (varmak) - I arrive at school at 8:30.", note: "Transportation and arrival" },

      { category: "School/Work Activities", start_work: "start work (işe başlamak) - I start work at 9.", attend_classes: "attend classes (derslere katılmak) - I attend 5 classes.", have_lunch: "have lunch (öğle yemeği yemek) - We have lunch at 12.", take_a_break: "take a break (mola vermek) - I take a break at 10:30.", study: "study (çalışmak, ders çalışmak) - I study in the library.", finish_work: "finish work (işi bitirmek) - She finishes work at 5.", note: "During the day at school or work" },

      { category: "Afternoon/Evening Routines", come_home: "come home / get home (eve gelmek) - I get home at 4.", do_homework: "do homework (ödev yapmak) - I do my homework after school.", watch_TV: "watch TV (TV izlemek) - I watch TV in the evening.", play_games: "play games (oyun oynamak) - He plays video games.", listen_to_music: "listen to music (müzik dinlemek) - I listen to music while studying.", relax: "relax (dinlenmek) - I relax after work.", note: "After school/work activities" },

      { category: "Evening & Night Routines", have_dinner: "have dinner (akşam yemeği yemek) - We have dinner at 7.", cook_dinner: "cook dinner (akşam yemeği pişirmek) - My mom cooks dinner.", set_the_table: "set the table (sofrayı kurmak) - I set the table.", do_the_dishes: "do the dishes (bulaşık yıkamak) - I do the dishes after dinner.", take_a_bath: "take a bath (banyo yapmak) - She takes a bath at night.", brush_teeth: "brush my teeth (dişlerimi fırçalamak) - I brush my teeth before bed.", note: "Evening preparations" },
      { category: "Bedtime Routines", go_to_bed: "go to bed (yatağa gitmek) - I go to bed at 10.", read_a_book: "read a book (kitap okumak) - I read before sleeping.", set_alarm: "set my alarm (alarmı kurmak) - I set my alarm for 6:30.", turn_off_lights: "turn off the lights (ışıkları kapatmak) - I turn off the lights.", fall_asleep: "fall asleep (uykuya dalmak) - I fall asleep quickly.", sleep: "sleep (uyumak) - I sleep 8 hours.", note: "Nighttime and sleep" },

      { category: "Frequency Adverbs Position", rule: "Frequency adverbs usually go BEFORE the main verb", examples: "I always wake up early. / She usually has breakfast. / We often walk to school.", with_be: "With BE verb, put adverb AFTER be", examples_be: "I am always tired. / She is usually late.", remember: "After BE, before other verbs!", position: "Subject + frequency adverb + verb" },
      { category: "Using Frequency Adverbs", always_100: "always (her zaman) - 100% - I always brush my teeth.", usually_90: "usually (genellikle) - 90% - I usually have breakfast.", often_70: "often (sık sık) - 70% - I often walk to school.", sometimes_50: "sometimes (bazen) - 50% - I sometimes watch TV.", rarely_10: "rarely/seldom (nadiren) - 10% - I rarely stay up late.", never_0: "never (asla) - 0% - I never skip breakfast.", note: "Show how often you do your routines!" },

      { category: "Telling Time in Routines", at_time: "Use AT with specific times", examples_at: "I wake up at 7. / I have lunch at 12:30. / I go to bed at 10.", in_morning: "Use IN with parts of day", examples_in: "in the morning / in the afternoon / in the evening", at_night: "Use AT with 'night'", example: "at night", note: "Prepositions of time are important!", remember: "AT + time | IN + morning/afternoon/evening | AT + night" },

      { category: "Present Simple for Routines", rule: "Use Present Simple tense for daily routines", pattern: "I/You/We/They + base verb | He/She/It + verb-s", examples: "I wake up. / She wakes up. / They go to school. / He goes to work.", why: "Routines are regular, repeated actions", note: "This is why we use Present Simple!", remember: "Add -s for he/she/it!" },

      { category: "He/She/It Forms (Third Person)", rule: "Add -S to verbs for he/she/it", examples: "He wakes up. / She brushes her teeth. / He goes to school. / She watches TV.", irregular: "have → has | go → goes | do → does | watch → watches", note: "Don't forget the -s!", remember: "Third person singular needs -s" },

      { category: "Questions About Routines", what_time: "What time do you wake up? → I wake up at 7.", when: "When do you have breakfast? → I have breakfast at 8.", do_you: "Do you walk to school? → Yes, I do. / No, I don't.", does_she: "Does she go to work? → Yes, she does. / No, she doesn't.", how_often: "How often do you exercise? → I exercise three times a week.", pattern: "Use do/does for questions", note: "Essential for asking about others' routines!" },

      { category: "Common Mistakes", mistake_1: "Forgetting -s for he/she/it", wrong_1: "She wake up at 7 ✗ / He go to school ✗", correct_1: "She wakes up at 7 ✓ / He goes to school ✓", rule: "Add -s for third person singular", remember: "He/She/It needs -s!" },
      { category: "Common Mistakes", mistake_2: "Wrong preposition with time", wrong_2: "I wake up in 7 o'clock ✗ / She sleeps on night ✗", correct_2: "I wake up at 7 o'clock ✓ / She sleeps at night ✓", rule: "Use AT with specific times and 'at night'", remember: "AT + time!" },
      { category: "Common Mistakes", mistake_3: "Wrong frequency adverb position", wrong_3: "I wake up always early ✗ / She goes usually to school ✗", correct_3: "I always wake up early ✓ / She usually goes to school ✓", rule: "Put frequency adverb BEFORE main verb (but AFTER be)", remember: "Before the verb!" },

      { category: "Talking About Your Day", describe: "I wake up at 7 and take a shower. Then I have breakfast at 7:30. I leave home at 8 and arrive at school at 8:30. I have lunch at 12. School finishes at 3. I get home at 4 and do my homework. I have dinner with my family at 7. I go to bed at 10.", use: "Connect your routines with time expressions", linking: "Use: then, after that, next, finally", note: "Tell your daily story!" },

      { category: "Real-World Uses", introducing_yourself: "I wake up at 6 every day. I usually have breakfast at 7.", describing_others: "My sister goes to university. She studies every evening.", comparisons: "I wake up earlier than my brother. He sleeps late.", weekend_routines: "On weekends, I don't wake up early. I relax and watch TV.", general: "Essential for describing daily life and habits!" },

      { category: "Key Takeaway", summary: "Daily routines vocabulary describes your regular daily activities", tense: "Use Present Simple for routines", structure: "Subject + verb (add -s for he/she/it)", time_prepositions: "AT + specific time | IN + morning/afternoon/evening | AT + night", frequency: "Use frequency adverbs (always, usually, often, sometimes, never)", position: "Frequency adverb goes BEFORE main verb (AFTER be)", question: "What time...? / When...? / How often...? / Do you...?", common_verbs: "wake up, get up, have breakfast, go to school, do homework, go to bed", remember: "Tell your daily routine with times and frequency!", next: "Practice describing your typical day!" }
    ]
  },
  
  speakingPractice: [
    { question: "What time do you wake up?", answer: "I wake up at 7 o’clock.", multipleChoice: { prompt: "I wake ___ at 7 o’clock.", options: [{ letter: "A", text: "off", correct: false }, { letter: "B", text: "down", correct: false }, { letter: "C", text: "up", correct: true }] } },
    { question: "Do you brush your teeth every morning?", answer: "Yes, I brush my teeth every morning.", multipleChoice: { prompt: "Yes, ___ brush my teeth every morning.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "What do you do after you get up?", answer: "I take a shower.", multipleChoice: { prompt: "I ___ shower.", options: [{ letter: "A", text: "make a", correct: false }, { letter: "B", text: "do a", correct: false }, { letter: "C", text: "take a", correct: true }] } },
    { question: "Do you have breakfast every day?", answer: "Yes, I usually have breakfast.", multipleChoice: { prompt: "Yes, I usually ___ breakfast.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "What time do you go to school?", answer: "I go to school at 8.", multipleChoice: { prompt: "I ___ to school at 8.", options: [{ letter: "A", text: "goed", correct: false }, { letter: "B", text: "go", correct: true }, { letter: "C", text: "goes", correct: false }] } },
    { question: "Do you walk to school or take the bus?", answer: "I take the bus.", multipleChoice: { prompt: "I ___ the bus.", options: [{ letter: "A", text: "take", correct: true }, { letter: "B", text: "get", correct: false }, { letter: "C", text: "takes", correct: false }] } },
    { question: "When do you get dressed?", answer: "I get dressed after I take a shower.", multipleChoice: { prompt: "I get dressed after I ___ shower.", options: [{ letter: "A", text: "take a", correct: true }, { letter: "B", text: "do a", correct: false }, { letter: "C", text: "make a", correct: false }] } },
    { question: "Do you make your bed in the morning?", answer: "Yes, I make my bed every day.", multipleChoice: { prompt: "Yes, I ___ my bed every day.", options: [{ letter: "A", text: "make", correct: true }, { letter: "B", text: "do", correct: false }, { letter: "C", text: "makes", correct: false }] } },
    { question: "What do you usually eat for breakfast?", answer: "I usually eat eggs and toast.", multipleChoice: { prompt: "___ usually eat eggs and toast.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "Do you go to work every day?", answer: "Yes, I go to work from Monday to Friday.", multipleChoice: { prompt: "Yes, I ___ to work from Monday to Friday.", options: [{ letter: "A", text: "goed", correct: false }, { letter: "B", text: "go", correct: true }, { letter: "C", text: "goes", correct: false }] } },
    { question: "When do you have lunch?", answer: "I have lunch at 12:30.", multipleChoice: { prompt: "I ___ lunch at 12:30.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "has", correct: false }] } },
    { question: "Where do you have lunch?", answer: "I usually have lunch at home.", multipleChoice: { prompt: "I usually ___ lunch at home.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "has", correct: false }] } },
    { question: "What time do you finish school?", answer: "I finish school at 3:30.", multipleChoice: { prompt: "I ___ school at 3:30.", options: [{ letter: "A", text: "finish", correct: true }, { letter: "B", text: "finishes", correct: false }, { letter: "C", text: "finished", correct: false }] } },
    { question: "What do you do after school?", answer: "I go home and relax.", multipleChoice: { prompt: "I ___ home and relax.", options: [{ letter: "A", text: "go", correct: true }, { letter: "B", text: "goes", correct: false }, { letter: "C", text: "goed", correct: false }] } },
    { question: "Do you take a nap in the afternoon?", answer: "Sometimes I take a nap.", multipleChoice: { prompt: "Sometimes I ___ nap.", options: [{ letter: "A", text: "make a", correct: false }, { letter: "B", text: "take a", correct: true }, { letter: "C", text: "do a", correct: false }] } },
    { question: "What time do you get home?", answer: "I get home at 4.", multipleChoice: { prompt: "I ___ home at 4.", options: [{ letter: "A", text: "got", correct: false }, { letter: "B", text: "get", correct: true }, { letter: "C", text: "getting", correct: false }] } },
    { question: "Do you help your parents at home?", answer: "Yes, I help with the dishes.", multipleChoice: { prompt: "Yes, I help ___ the dishes.", options: [{ letter: "A", text: "for", correct: false }, { letter: "B", text: "with", correct: true }, { letter: "C", text: "by", correct: false }] } },
    { question: "Do you do your homework in the evening?", answer: "Yes, I do my homework after dinner.", multipleChoice: { prompt: "Yes, I ___ my homework after dinner.", options: [{ letter: "A", text: "do", correct: true }, { letter: "B", text: "does", correct: false }, { letter: "C", text: "doed", correct: false }] } },
    { question: "When do you have dinner?", answer: "I have dinner at 7 o’clock.", multipleChoice: { prompt: "I ___ dinner at 7 o’clock.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "had", correct: false }] } },
    { question: "Do you watch TV at night?", answer: "Yes, I watch TV for one hour.", multipleChoice: { prompt: "Yes, I ___ TV for one hour.", options: [{ letter: "A", text: "watch", correct: true }, { letter: "B", text: "watches", correct: false }, { letter: "C", text: "watched", correct: false }] } },
    { question: "What time do you go to bed?", answer: "I go to bed at 10.", multipleChoice: { prompt: "I ___ to bed at 10.", options: [{ letter: "A", text: "goes", correct: false }, { letter: "B", text: "goed", correct: false }, { letter: "C", text: "go", correct: true }] } },
    { question: "Do you read a book before sleeping?", answer: "Yes, I sometimes read a book.", multipleChoice: { prompt: "Yes, I sometimes ___ a book.", options: [{ letter: "A", text: "read", correct: true }, { letter: "B", text: "reads", correct: false }, { letter: "C", text: "reading", correct: false }] } },
    { question: "Do you take a shower in the morning or evening?", answer: "I take a shower in the evening.", multipleChoice: { prompt: "I ___ shower in the evening.", options: [{ letter: "A", text: "make a", correct: false }, { letter: "B", text: "do a", correct: false }, { letter: "C", text: "take a", correct: true }] } },
    { question: "Do you check your phone in the morning?", answer: "Yes, I always check my phone.", multipleChoice: { prompt: "Yes, ___ always check my phone.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "What time do you usually sleep?", answer: "I usually sleep at 10:30.", multipleChoice: { prompt: "I usually ___ at 10:30.", options: [{ letter: "A", text: "sleep", correct: true }, { letter: "B", text: "sleeps", correct: false }, { letter: "C", text: "sleeping", correct: false }] } },
    { question: "Do you eat breakfast on weekends?", answer: "Yes, I love breakfast on weekends.", multipleChoice: { prompt: "Yes, I love ___ on weekends.", options: [{ letter: "A", text: "dinner", correct: false }, { letter: "B", text: "breakfast", correct: true }, { letter: "C", text: "lunch", correct: false }] } },
    { question: "What do you do before going to bed?", answer: "I brush my teeth.", multipleChoice: { prompt: "___ brush my teeth.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Do you drink coffee in the morning?", answer: "No, I drink tea.", multipleChoice: { prompt: "No, ___ drink tea.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Do you go to the gym in the morning?", answer: "No, I go in the evening.", multipleChoice: { prompt: "No, I ___ in the evening.", options: [{ letter: "A", text: "goes", correct: false }, { letter: "B", text: "goed", correct: false }, { letter: "C", text: "go", correct: true }] } },
    { question: "Do you listen to music while studying?", answer: "Yes, I sometimes do.", multipleChoice: { prompt: "Yes, I sometimes ___.", options: [{ letter: "A", text: "do", correct: true }, { letter: "B", text: "did", correct: false }, { letter: "C", text: "does", correct: false }] } },
    { question: "How often do you go shopping?", answer: "I go shopping once a week.", multipleChoice: { prompt: "I ___ shopping once a week.", options: [{ letter: "A", text: "go", correct: true }, { letter: "B", text: "goed", correct: false }, { letter: "C", text: "goes", correct: false }] } },
    { question: "Do you prepare your clothes the night before?", answer: "Yes, I usually do.", multipleChoice: { prompt: "Yes, I usually ___.", options: [{ letter: "A", text: "do", correct: true }, { letter: "B", text: "did", correct: false }, { letter: "C", text: "does", correct: false }] } },
    { question: "Do you iron your clothes?", answer: "No, my mom irons them.", multipleChoice: { prompt: "No, my mom ___ them.", options: [{ letter: "A", text: "iron", correct: false }, { letter: "B", text: "ironing", correct: false }, { letter: "C", text: "irons", correct: true }] } },
    { question: "Do you clean your room every day?", answer: "No, I clean it once a week.", multipleChoice: { prompt: "No, ___ clean it once a week.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "Do you talk to your friends after school?", answer: "Yes, I talk to them online.", multipleChoice: { prompt: "Yes, I ___ to them online.", options: [{ letter: "A", text: "talking", correct: false }, { letter: "B", text: "talk", correct: true }, { letter: "C", text: "talks", correct: false }] } },
    { question: "Do you walk your dog in the morning?", answer: "Yes, I walk my dog at 7.", multipleChoice: { prompt: "Yes, I ___ my dog at 7.", options: [{ letter: "A", text: "walks", correct: false }, { letter: "B", text: "walking", correct: false }, { letter: "C", text: "walk", correct: true }] } },
    { question: "Do you feed your pet in the evening?", answer: "Yes, I feed my cat at 6.", multipleChoice: { prompt: "Yes, I ___ my cat at 6.", options: [{ letter: "A", text: "feed", correct: true }, { letter: "B", text: "feeds", correct: false }, { letter: "C", text: "feeding", correct: false }] } },
    { question: "Do you set an alarm?", answer: "Yes, I set my alarm every night.", multipleChoice: { prompt: "Yes, ___ set my alarm every night.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do you stretch or exercise in the morning?", answer: "No, but I want to start.", multipleChoice: { prompt: "No, but I want ___.", options: [{ letter: "A", text: "starting", correct: false }, { letter: "B", text: "to start", correct: true }, { letter: "C", text: "start", correct: false }] } },
    { question: "Do you eat dinner with your family?", answer: "Yes, we always eat together.", multipleChoice: { prompt: "Yes, ___ always eat together.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "we", correct: true }, { letter: "C", text: "they", correct: false }] } },
    { question: "Do you go to bed late on weekends?", answer: "Yes, I go to bed around midnight.", multipleChoice: { prompt: "Yes, I ___ to bed around midnight.", options: [{ letter: "A", text: "goes", correct: false }, { letter: "B", text: "go", correct: true }, { letter: "C", text: "goed", correct: false }] } },
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

  table: {
    title: "📋 Jobs and Occupations Vocabulary (Meslekler)",
    data: [
      { category: "What are Jobs?", explanation: "The work people do to earn money", turkish: "Meslekler, işler", function: "Talk about professions and careers", questions: "What do you do? / What's your job? / Where do you work?", note: "Essential for introductions and conversations!" },

      { category: "Asking About Jobs", what_do_you_do: "What do you do? → I'm a teacher. (En yaygın soru)", whats_your_job: "What's your job? → I'm a doctor.", what_does_he_do: "What does he do? → He's an engineer.", where_work: "Where do you work? → I work in a hospital / at a school.", use_a_an: "Use A/AN before the job: I'm A teacher / He's AN engineer", note: "The most polite way to ask is 'What do you do?'" },

      { category: "Healthcare Jobs", doctor: "doctor (doktor) - works in hospital, treats patients", nurse: "nurse (hemşire) - helps doctors, cares for patients", dentist: "dentist (diş hekimi) - takes care of teeth", surgeon: "surgeon (cerrah) - performs operations", pharmacist: "pharmacist (eczacı) - sells medicine", vet_veterinarian: "vet / veterinarian (veteriner) - animal doctor", note: "Medical professions - very important!" },

      { category: "Education Jobs", teacher: "teacher (öğretmen) - teaches students in school", professor: "professor (profesör) - teaches in university", tutor: "tutor (özel öğretmen) - gives private lessons", principal: "principal (müdür) - manages the school", instructor: "instructor (eğitmen) - teaches specific skills", note: "Education professionals" },

      { category: "Public Service Jobs", police_officer: "police officer (polis) - protects people, enforces law", firefighter: "firefighter (itfaiyeci) - puts out fires", soldier: "soldier (asker) - serves in military", judge: "judge (hakim) - decides in court", lawyer: "lawyer (avukat) - represents people in law", note: "Serving and protecting the community" },

      { category: "Technical & Professional Jobs", engineer: "engineer (mühendis) - designs buildings/machines/systems", architect: "architect (mimar) - designs buildings", programmer: "programmer (programcı) - writes computer code", scientist: "scientist (bilim insanı) - does research and experiments", accountant: "accountant (muhasebeci) - manages money and accounts", note: "Skilled professional careers" },

      { category: "Service Jobs", waiter_waitress: "waiter/waitress (garson) - serves food in restaurant", chef_cook: "chef / cook (aşçı, şef) - prepares food", hairdresser: "hairdresser (kuaför) - cuts and styles hair", receptionist: "receptionist (resepsiyonist) - greets visitors at desk", cashier: "cashier (kasiyer) - handles money at checkout", cleaner: "cleaner (temizlikçi) - cleans buildings", note: "Service industry jobs" },

      { category: "Transportation & Logistics", pilot: "pilot (pilot) - flies airplanes", driver: "driver (şoför) - drives vehicles", taxi_driver: "taxi driver (taksi şoförü) - drives taxi", bus_driver: "bus driver (otobüs şoförü) - drives bus", truck_driver: "truck driver (kamyon şoförü) - drives truck", sailor: "sailor (denizci) - works on ships", note: "Transportation professions" },

      { category: "Creative & Arts Jobs", artist: "artist (sanatçı) - creates art (painting, drawing)", musician: "musician (müzisyansı) - plays music", singer: "singer (şarkıcı) - sings songs", actor_actress: "actor/actress (aktör/aktris) - performs in films/theatre", photographer: "photographer (fotoğrafçı) - takes pictures", writer: "writer (yazar) - writes books/articles", note: "Creative professions" },

      { category: "Construction & Manual Jobs", builder: "builder (inşaatçı) - builds houses", carpenter: "carpenter (marangoz) - works with wood", plumber: "plumber (tesisatçı) - fixes pipes and water systems", electrician: "electrician (elektrikçi) - works with electricity", mechanic: "mechanic (tamirci, usta) - fixes cars/machines", farmer: "farmer (çiftçi) - grows crops, raises animals", note: "Skilled trades and manual work" },

      { category: "Business & Office Jobs", manager: "manager (yönetici) - manages team/company", secretary: "secretary (sekreter) - assists boss, organizes office", salesperson: "salesperson (satış elemanı) - sells products", businessman_woman: "businessman/businesswoman (iş insanı) - runs business", employee: "employee (çalışan) - works for company", boss: "boss (patron) - leads the company/team", note: "Office and business roles" },

      { category: "Using A/AN with Jobs", rule: "Use A before consonant sounds, AN before vowel sounds", a_jobs: "a teacher, a doctor, a pilot, a waiter, a driver", an_jobs: "an engineer, an artist, an actor, an accountant, an electrician", structure: "I'm A/AN + job", examples: "I'm a teacher. / She's an engineer. / He's a doctor.", note: "Always use a/an when talking about your job!" },

      { category: "Where Do They Work?", hospital: "in a hospital: doctor, nurse, surgeon", school: "at a school: teacher, principal", office: "in an office: secretary, accountant, manager", restaurant: "in a restaurant: waiter, chef, cook", factory: "in a factory: worker, engineer", shop_store: "in a shop/store: salesperson, cashier", farm: "on a farm: farmer", home: "at home: work from home", note: "Use IN for enclosed places, AT for point locations, ON for surfaces" },

      { category: "What Do They Do?", examples: "A doctor treats patients. / A teacher teaches students. / A chef cooks food. / A pilot flies planes. / A police officer protects people. / An artist creates art. / A driver drives vehicles. / A cleaner cleans buildings.", pattern: "A/An + job + verb + object", note: "Describe what each profession does!" },

      { category: "Questions & Answers", q1: "Q: What do you do? → A: I'm a nurse.", q2: "Q: What does your father do? → A: He's an engineer.", q3: "Q: Where do you work? → A: I work in a hospital.", q4: "Q: Where does she work? → A: She works at a school.", q5: "Q: Do you like your job? → A: Yes, I love it! / No, not really.", q6: "Q: What do you want to be? → A: I want to be a doctor.", note: "Common conversations about jobs!" },

      { category: "Common Mistakes", mistake_1: "Forgetting a/an", wrong_1: "I'm teacher ✗ / He's engineer ✗", correct_1: "I'm a teacher ✓ / He's an engineer ✓", rule: "Always use a/an with jobs!", remember: "I'm A/AN + job" },
      { category: "Common Mistakes", mistake_2: "Using wrong article", wrong_2: "I'm an teacher ✗ / He's a engineer ✗", correct_2: "I'm a teacher ✓ / He's an engineer ✓", rule: "A before consonants, AN before vowels", remember: "Listen to the SOUND, not just the letter!" },

      { category: "Real-World Uses", introductions: "Hi, I'm John. I'm a teacher. I work at a high school.", job_interviews: "I'm a programmer with 5 years of experience.", describing_family: "My father is a doctor. My mother is a teacher. My brother wants to be a pilot.", career_goals: "I want to be an engineer. I'm studying at university.", general: "Essential vocabulary for professional life!" },

      { category: "Key Takeaway", summary: "Jobs vocabulary describes what people do for work", question: "What do you do? (most polite) / What's your job?", answer: "I'm A/AN + job (always use a/an!)", where: "Where do you work? → I work in/at + place", describe: "A + job + verb: A teacher teaches. A doctor treats patients.", categories: "Healthcare, Education, Service, Technical, Creative, Business, Construction", preposition: "IN hospital/office/restaurant | AT school/home | ON farm", remember: "Use a/an with jobs! Know the main job categories!", next: "Practice talking about jobs and workplaces!" }
    ]
  },
  
  speakingPractice: [
    { question: "What do you do?", answer: "I’m a teacher.", multipleChoice: { prompt: "I’m a ___.", options: [{ letter: "A", text: "teacher", correct: true }, { letter: "B", text: "doctor", correct: false }, { letter: "C", text: "nurse", correct: false }] } },
    { question: "What does your father do?", answer: "He’s a doctor.", multipleChoice: { prompt: "He’s a ___.", options: [{ letter: "A", text: "driver", correct: false }, { letter: "B", text: "doctor", correct: true }, { letter: "C", text: "teacher", correct: false }] } },
    { question: "What does your mother do?", answer: "She’s a nurse.", multipleChoice: { prompt: "___ a nurse.", options: [{ letter: "A", text: "she’", correct: false }, { letter: "B", text: "she’ing", correct: false }, { letter: "C", text: "she’s", correct: true }] } },
    { question: "What does a firefighter do?", answer: "A firefighter puts out fires.", multipleChoice: { prompt: "A firefighter ___ fires.", options: [{ letter: "A", text: "extinguishes", correct: false }, { letter: "B", text: "stops", correct: false }, { letter: "C", text: "puts out", correct: true }] } },
    { question: "Where does a teacher work?", answer: "A teacher works at a school.", multipleChoice: { prompt: "A teacher works at a ___.", options: [{ letter: "A", text: "hospital", correct: false }, { letter: "B", text: "school", correct: true }, { letter: "C", text: "office", correct: false }] } },
    { question: "Where does a doctor work?", answer: "A doctor works in a hospital.", multipleChoice: { prompt: "A doctor works in a ___.", options: [{ letter: "A", text: "hospital", correct: true }, { letter: "B", text: "office", correct: false }, { letter: "C", text: "clinic", correct: false }] } },
    { question: "What does a pilot do?", answer: "A pilot flies airplanes.", multipleChoice: { prompt: "A pilot ___ airplanes.", options: [{ letter: "A", text: "flies", correct: true }, { letter: "B", text: "fly", correct: false }, { letter: "C", text: "flying", correct: false }] } },
    { question: "What do chefs do?", answer: "Chefs cook food.", multipleChoice: { prompt: "___ cook food.", options: [{ letter: "A", text: "chefs", correct: true }, { letter: "B", text: "chefing", correct: false }, { letter: "C", text: "chef", correct: false }] } },
    { question: "Where does a waiter work?", answer: "A waiter works in a restaurant.", multipleChoice: { prompt: "A waiter works in a ___.", options: [{ letter: "A", text: "cafe", correct: false }, { letter: "B", text: "restaurant", correct: true }, { letter: "C", text: "hotel", correct: false }] } },
    { question: "What does an engineer do?", answer: "An engineer designs buildings or machines.", multipleChoice: { prompt: "An engineer ___ buildings or machines.", options: [{ letter: "A", text: "designs", correct: true }, { letter: "B", text: "design", correct: false }, { letter: "C", text: "designing", correct: false }] } },
    { question: "What do you want to be?", answer: "I want to be a police officer.", multipleChoice: { prompt: "I want ___ a police officer.", options: [{ letter: "A", text: "be", correct: false }, { letter: "B", text: "to be", correct: true }, { letter: "C", text: "being", correct: false }] } },
    { question: "Is a nurse a hospital worker?", answer: "Yes, a nurse works in a hospital.", multipleChoice: { prompt: "Yes, a nurse works in a ___.", options: [{ letter: "A", text: "hospital", correct: true }, { letter: "B", text: "office", correct: false }, { letter: "C", text: "clinic", correct: false }] } },
    { question: "What does a driver do?", answer: "A driver drives vehicles.", multipleChoice: { prompt: "A driver ___ vehicles.", options: [{ letter: "A", text: "drives", correct: true }, { letter: "B", text: "operates", correct: false }, { letter: "C", text: "controls", correct: false }] } },
    { question: "Where does a dentist work?", answer: "A dentist works in a clinic.", multipleChoice: { prompt: "A dentist works in a ___.", options: [{ letter: "A", text: "clinic", correct: true }, { letter: "B", text: "hospital", correct: false }, { letter: "C", text: "office", correct: false }] } },
    { question: "What do artists do?", answer: "Artists paint or draw.", multipleChoice: { prompt: "___ paint or draw.", options: [{ letter: "A", text: "artist", correct: false }, { letter: "B", text: "artists", correct: true }, { letter: "C", text: "artisting", correct: false }] } },
    { question: "Is a lawyer a job?", answer: "Yes, a lawyer works in law.", multipleChoice: { prompt: "Yes, a ___ works in law.", options: [{ letter: "A", text: "lawyer", correct: true }, { letter: "B", text: "doctor", correct: false }, { letter: "C", text: "teacher", correct: false }] } },
    { question: "What job do you want in the future?", answer: "I want to be an architect.", multipleChoice: { prompt: "I want ___ an architect.", options: [{ letter: "A", text: "being", correct: false }, { letter: "B", text: "to be", correct: true }, { letter: "C", text: "be", correct: false }] } },
    { question: "Where does a farmer work?", answer: "A farmer works on a farm.", multipleChoice: { prompt: "A ___ works on a farm.", options: [{ letter: "A", text: "teacher", correct: false }, { letter: "B", text: "driver", correct: false }, { letter: "C", text: "farmer", correct: true }] } },
    { question: "What does a mechanic do?", answer: "A mechanic fixes cars.", multipleChoice: { prompt: "A mechanic ___ cars.", options: [{ letter: "A", text: "fixes", correct: true }, { letter: "B", text: "fix", correct: false }, { letter: "C", text: "fixing", correct: false }] } },
    { question: "What does a cleaner do?", answer: "A cleaner cleans buildings.", multipleChoice: { prompt: "A cleaner ___ buildings.", options: [{ letter: "A", text: "cleans", correct: true }, { letter: "B", text: "tidies", correct: false }, { letter: "C", text: "washes", correct: false }] } },
    { question: "What does a police officer do?", answer: "A police officer protects people.", multipleChoice: { prompt: "A police officer ___ people.", options: [{ letter: "A", text: "guards", correct: false }, { letter: "B", text: "defends", correct: false }, { letter: "C", text: "protects", correct: true }] } },
    { question: "Do teachers work in hospitals?", answer: "No, they work in schools.", multipleChoice: { prompt: "No, they ___ in schools.", options: [{ letter: "A", text: "works", correct: false }, { letter: "B", text: "worked", correct: false }, { letter: "C", text: "work", correct: true }] } },
    { question: "Does your friend want to be a pilot?", answer: "Yes, he wants to fly planes.", multipleChoice: { prompt: "Yes, he wants ___ planes.", options: [{ letter: "A", text: "flying", correct: false }, { letter: "B", text: "fly", correct: false }, { letter: "C", text: "to fly", correct: true }] } },
    { question: "What does a musician do?", answer: "A musician plays music.", multipleChoice: { prompt: "A musician ___ music.", options: [{ letter: "A", text: "play", correct: false }, { letter: "B", text: "playing", correct: false }, { letter: "C", text: "plays", correct: true }] } },
    { question: "Where does an actor work?", answer: "An actor works in films or theatres.", multipleChoice: { prompt: "An ___ works in films or theatres.", options: [{ letter: "A", text: "actor", correct: true }, { letter: "B", text: "singer", correct: false }, { letter: "C", text: "dancer", correct: false }] } },
    { question: "Do you know any engineers?", answer: "Yes, my cousin is an engineer.", multipleChoice: { prompt: "Yes, my cousin ___ an engineer.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "What does a scientist do?", answer: "A scientist does experiments and research.", multipleChoice: { prompt: "A scientist ___ experiments and research.", options: [{ letter: "A", text: "do", correct: false }, { letter: "B", text: "did", correct: false }, { letter: "C", text: "does", correct: true }] } },
    { question: "Is a vet a doctor for animals?", answer: "Yes, a vet takes care of animals.", multipleChoice: { prompt: "Yes, a vet ___ care of animals.", options: [{ letter: "A", text: "take", correct: false }, { letter: "B", text: "gets", correct: false }, { letter: "C", text: "takes", correct: true }] } },
    { question: "What does a builder do?", answer: "A builder builds houses.", multipleChoice: { prompt: "A ___ builds houses.", options: [{ letter: "A", text: "thing", correct: false }, { letter: "B", text: "person", correct: false }, { letter: "C", text: "builder", correct: true }] } },
    { question: "Where does a hairdresser work?", answer: "A hairdresser works in a salon.", multipleChoice: { prompt: "A hairdresser works in a ___.", options: [{ letter: "A", text: "salon", correct: true }, { letter: "B", text: "store", correct: false }, { letter: "C", text: "shop", correct: false }] } },
    { question: "What job does your uncle do?", answer: "He is a chef.", multipleChoice: { prompt: "He ___ a chef.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What does a taxi driver do?", answer: "A taxi driver takes people to places.", multipleChoice: { prompt: "A taxi driver ___ people to places.", options: [{ letter: "A", text: "takes", correct: true }, { letter: "B", text: "receives", correct: false }, { letter: "C", text: "accepts", correct: false }] } },
    { question: "Do police officers wear uniforms?", answer: "Yes, they do.", multipleChoice: { prompt: "Yes, they ___.", options: [{ letter: "A", text: "doed", correct: false }, { letter: "B", text: "do", correct: true }, { letter: "C", text: "does", correct: false }] } },
    { question: "What does a baker do?", answer: "A baker makes bread and cakes.", multipleChoice: { prompt: "A baker ___ bread and cakes.", options: [{ letter: "A", text: "does", correct: false }, { letter: "B", text: "makes", correct: true }, { letter: "C", text: "make", correct: false }] } },
    { question: "Is a programmer a modern job?", answer: "Yes, a programmer writes code.", multipleChoice: { prompt: "Yes, a programmer ___ code.", options: [{ letter: "A", text: "writing", correct: false }, { letter: "B", text: "writes", correct: true }, { letter: "C", text: "write", correct: false }] } },
    { question: "Where does a receptionist work?", answer: "A receptionist works at the front desk.", multipleChoice: { prompt: "A ___ works at the front desk.", options: [{ letter: "A", text: "manager", correct: false }, { letter: "B", text: "waiter", correct: false }, { letter: "C", text: "receptionist", correct: true }] } },
    { question: "Do you want to be a scientist?", answer: "Yes, I want to work in a lab.", multipleChoice: { prompt: "Yes, I want ___ in a lab.", options: [{ letter: "A", text: "to work", correct: true }, { letter: "B", text: "work", correct: false }, { letter: "C", text: "working", correct: false }] } },
    { question: "What job helps people at the airport?", answer: "An airport worker or a customs officer.", multipleChoice: { prompt: "An ___ worker or a customs officer.", options: [{ letter: "A", text: "airport", correct: true }, { letter: "B", text: "thing", correct: false }, { letter: "C", text: "person", correct: false }] } },
    { question: "What does a tour guide do?", answer: "A tour guide shows places to visitors.", multipleChoice: { prompt: "A tour guide ___ places to visitors.", options: [{ letter: "A", text: "show", correct: false }, { letter: "B", text: "showing", correct: false }, { letter: "C", text: "shows", correct: true }] } },
    { question: "What does a photographer do?", answer: "A photographer takes pictures.", multipleChoice: { prompt: "A photographer ___ pictures.", options: [{ letter: "A", text: "take", correct: false }, { letter: "B", text: "takes", correct: true }, { letter: "C", text: "gets", correct: false }] } },
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

  table: {
    title: "📋 Food and Drinks Vocabulary (Yiyecek ve İçecekler)",
    data: [
      { category: "What are Food and Drinks?", explanation: "Things we eat and drink every day", turkish: "Yiyecekler ve içecekler", function: "Talk about meals, preferences, and eating habits", questions: "What's your favorite food? / Do you like...? / What do you usually eat?", note: "Essential vocabulary for daily life and restaurants!" },

      { category: "Meals of the Day", breakfast: "breakfast (kahvaltı) - first meal in the morning", lunch: "lunch (öğle yemeği) - midday meal", dinner_supper: "dinner / supper (akşam yemeği) - evening meal", snack: "snack (atıştırmalık) - small meal between main meals", examples: "I have breakfast at 7. / We eat lunch at 12. / Dinner is at 7 PM.", note: "Three main meals + snacks" },

      { category: "Basic Food Categories", meat: "meat (et) - beef, chicken, pork, lamb", fish: "fish (balık) - salmon, tuna, etc.", vegetables: "vegetables (sebzeler) - carrots, tomatoes, etc.", fruit: "fruit (meyveler) - apples, bananas, etc.", dairy: "dairy (süt ürünleri) - milk, cheese, yogurt", grains: "grains (tahıllar) - bread, rice, pasta", note: "Six main food groups" },

      { category: "Meat & Protein", chicken: "chicken (tavuk) - most common meat", beef: "beef (sığır eti) - from cows", pork: "pork (domuz eti) - from pigs", lamb: "lamb (kuzu eti) - from sheep", turkey: "turkey (hindi) - large bird", fish: "fish (balık) - seafood", eggs: "eggs (yumurta) - from chickens", note: "Protein sources" },

      { category: "Vegetables", tomato: "tomato (domates)", potato: "potato (patates)", onion: "onion (soğan)", carrot: "carrot (havuç)", lettuce: "lettuce (marul) - for salads", pepper: "pepper (biber)", cucumber: "cucumber (salatalık)", note: "Common vegetables" },

      { category: "Fruits", apple: "apple (elma)", banana: "banana (muz)", orange: "orange (portakal)", grape: "grapes (üzüm)", strawberry: "strawberry (çilek)", watermelon: "watermelon (karpuz)", lemon: "lemon (limon)", note: "Common fruits" },

      { category: "Dairy Products", milk: "milk (süt) - from cows", cheese: "cheese (peynir) - many types", yogurt: "yogurt (yoğurt) - fermented milk", butter: "butter (tereyağı) - spread on bread", cream: "cream (krema) - thick milk", ice_cream: "ice cream (dondurma) - frozen dessert", note: "Made from milk" },

      { category: "Grains & Carbohydrates", bread: "bread (ekmek) - baked from flour", rice: "rice (pirinç) - grain, cooked", pasta: "pasta (makarna) - Italian noodles", cereal: "cereal (tahıl gevreği) - breakfast food", flour: "flour (un) - powder from grain", noodles: "noodles (erişte) - long pasta", note: "Starchy foods" },

      { category: "Drinks (Hot)", coffee: "coffee (kahve) - hot, caffeinated", tea: "tea (çay) - hot, many flavors", hot_chocolate: "hot chocolate (sıcak çikolata) - sweet drink", note: "Hot beverages" },
      { category: "Drinks (Cold)", water: "water (su) - essential drink", milk: "milk (süt) - from dairy", juice: "juice (meyve suyu) - from fruit (orange juice, apple juice)", soda_pop: "soda / pop (gazlı içecek) - carbonated drink (Coke, Sprite)", lemonade: "lemonade (limonata) - lemon drink", note: "Cold beverages" },

      { category: "Snacks & Fast Food", pizza: "pizza (pizza) - Italian bread with toppings", hamburger: "hamburger (hamburger) - meat in a bun", sandwich: "sandwich (sandviç) - bread with filling", chips: "chips / fries (patates kızartması, cips)", popcorn: "popcorn (patlamış mısır) - movie snack", cookies: "cookies (kurabiye) - sweet biscuits", note: "Quick foods and snacks" },

      { category: "Desserts & Sweets", cake: "cake (kek, pasta) - birthday dessert", chocolate: "chocolate (çikolata) - sweet candy", candy: "candy (şeker) - sweets", pie: "pie (turta) - baked dessert", ice_cream: "ice cream (dondurma) - frozen sweet", note: "Sweet treats" },

      { category: "Expressing Preferences", like: "I like pizza. (I enjoy pizza in general)", love: "I love chocolate! (I really like it)", dont_like: "I don't like onions. (I dislike them)", hate: "I hate spinach. (I really dislike it)", favorite: "My favorite food is pasta. (I like it the most)", prefer: "I prefer tea to coffee. (I like tea more)", note: "Use LIKE for general preferences" },

      { category: "Questions About Food", whats_your_favorite: "What's your favorite food? → My favorite food is pizza.", do_you_like: "Do you like vegetables? → Yes, I do. / No, I don't.", what_do_you_usually: "What do you usually eat for breakfast? → I usually eat eggs and bread.", what_do_you_want: "What do you want to eat? → I want pasta.", would_you_like: "Would you like some coffee? → Yes, please. / No, thank you.", note: "Common food questions" },

      { category: "Talking About Meals", breakfast_examples: "For breakfast, I usually have eggs, bread, and tea.", lunch_examples: "I eat lunch at school. I usually have a sandwich and fruit.", dinner_examples: "We have dinner together at 7. We eat chicken, rice, and salad.", pattern: "I have/eat + food + for + meal", note: "Describe your meals!" },

      { category: "Countable vs Uncountable Food", countable: "Countable (use a/an, numbers): an apple, two eggs, three cookies", uncountable: "Uncountable (use some/any, no numbers): water, milk, rice, bread, cheese", some: "I'd like some water. / Can I have some cheese?", any: "Is there any milk? / I don't have any bread.", note: "Important grammar distinction!" },

      { category: "At a Restaurant", ordering: "I'd like a pizza, please. / Can I have the chicken?", asking: "What would you like to eat/drink?", polite: "Could I have some water, please?", paying: "Can I have the bill/check, please?", note: "Restaurant vocabulary" },

      { category: "Common Mistakes", mistake_1: "Using wrong verb with food", wrong_1: "I drink pizza ✗ / I eat water ✗", correct_1: "I eat pizza ✓ / I drink water ✓", rule: "EAT solid food | DRINK liquids", remember: "Eat food, drink liquids!" },
      { category: "Common Mistakes", mistake_2: "Forgetting to use 'some' with uncountable", wrong_2: "I want water ✗ (sounds incomplete)", correct_2: "I want some water ✓", rule: "Use SOME/ANY with uncountable nouns", remember: "Some water, some milk, some rice" },

      { category: "Real-World Uses", shopping: "I need to buy milk, bread, and eggs.", cooking: "I'm making pasta with tomato sauce and cheese.", restaurants: "I'd like the chicken with rice, please.", preferences: "I love Italian food. I don't like spicy food.", diet: "I eat a lot of fruit and vegetables. I don't eat much meat.", general: "Essential for daily life, shopping, and eating out!" },

      { category: "Key Takeaway", summary: "Food and drinks vocabulary for daily eating and drinking", meals: "breakfast, lunch, dinner, snack", categories: "meat, fish, vegetables, fruit, dairy, grains", drinks: "water, tea, coffee, juice, milk, soda", preferences: "I like/love/don't like/hate + food", questions: "What's your favorite food? / Do you like...? / What do you usually eat?", countable: "an apple, two eggs (countable) | some water, some rice (uncountable)", verbs: "EAT solid food | DRINK liquids", remember: "Talk about your food preferences and eating habits!", next: "Practice ordering food and describing meals!" }
    ]
  },
  
  speakingPractice: [
    { question: "What’s your favorite food?", answer: "My favorite food is pizza.", multipleChoice: { prompt: "My favorite food ___ pizza.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "What do you usually eat for breakfast?", answer: "I usually eat eggs and bread.", multipleChoice: { prompt: "___ usually eat eggs and bread.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Do you like vegetables?", answer: "Yes, I like vegetables.", multipleChoice: { prompt: "Yes, I ___ vegetables.", options: [{ letter: "A", text: "likes", correct: false }, { letter: "B", text: "likeed", correct: false }, { letter: "C", text: "like", correct: true }] } },
    { question: "Do you eat meat?", answer: "Yes, I eat chicken and beef.", multipleChoice: { prompt: "Yes, ___ eat chicken and beef.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "What kind of fruit do you like?", answer: "I like apples and bananas.", multipleChoice: { prompt: "I ___ apples and bananas.", options: [{ letter: "A", text: "likeed", correct: false }, { letter: "B", text: "like", correct: true }, { letter: "C", text: "likes", correct: false }] } },
    { question: "What do you drink in the morning?", answer: "I drink tea in the morning.", multipleChoice: { prompt: "I ___ tea in the morning.", options: [{ letter: "A", text: "drinks", correct: false }, { letter: "B", text: "drinking", correct: false }, { letter: "C", text: "drink", correct: true }] } },
    { question: "Do you like coffee?", answer: "No, I don’t like coffee.", multipleChoice: { prompt: "No, ___ don’t like coffee.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "What do you usually drink with lunch?", answer: "I usually drink water.", multipleChoice: { prompt: "___ usually drink water.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Do you like spicy food?", answer: "Yes, I love spicy food.", multipleChoice: { prompt: "Yes, ___ love spicy food.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "What do you eat for dinner?", answer: "I eat rice and chicken.", multipleChoice: { prompt: "___ eat rice and chicken.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "Do you eat fish?", answer: "Yes, I sometimes eat fish.", multipleChoice: { prompt: "Yes, ___ sometimes eat fish.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "What’s your favorite drink?", answer: "My favorite drink is orange juice.", multipleChoice: { prompt: "My favorite drink ___ orange juice.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Do you drink milk?", answer: "Yes, I drink milk every day.", multipleChoice: { prompt: "Yes, ___ drink milk every day.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do you like soup?", answer: "Yes, I like vegetable soup.", multipleChoice: { prompt: "Yes, I ___ vegetable soup.", options: [{ letter: "A", text: "like", correct: true }, { letter: "B", text: "likes", correct: false }, { letter: "C", text: "likeed", correct: false }] } },
    { question: "Do you eat pasta?", answer: "Yes, I eat pasta twice a week.", multipleChoice: { prompt: "Yes, ___ eat pasta twice a week.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "he", correct: false }] } },
    { question: "What’s your favorite dessert?", answer: "My favorite dessert is chocolate cake.", multipleChoice: { prompt: "My favorite dessert ___ chocolate cake.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Do you eat fast food?", answer: "Yes, but not every day.", multipleChoice: { prompt: "Yes, but not every ___.", options: [{ letter: "A", text: "month", correct: false }, { letter: "B", text: "day", correct: true }, { letter: "C", text: "week", correct: false }] } },
    { question: "What do you eat with rice?", answer: "I eat rice with vegetables or meat.", multipleChoice: { prompt: "I eat rice ___ vegetables or meat.", options: [{ letter: "A", text: "with", correct: true }, { letter: "B", text: "for", correct: false }, { letter: "C", text: "by", correct: false }] } },
    { question: "Do you like cheese?", answer: "Yes, I like cheese very much.", multipleChoice: { prompt: "Yes, I ___ cheese very much.", options: [{ letter: "A", text: "like", correct: true }, { letter: "B", text: "likes", correct: false }, { letter: "C", text: "likeed", correct: false }] } },
    { question: "Do you drink soda?", answer: "No, I don’t drink soda.", multipleChoice: { prompt: "No, ___ don’t drink soda.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do you eat fruit every day?", answer: "Yes, I eat fruit every day.", multipleChoice: { prompt: "Yes, ___ eat fruit every day.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "What do you put in your sandwich?", answer: "I put cheese, lettuce, and tomato.", multipleChoice: { prompt: "___ put cheese, lettuce, and tomato.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Do you like sweet food?", answer: "Yes, I love sweet food.", multipleChoice: { prompt: "Yes, ___ love sweet food.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "What is your favorite snack?", answer: "My favorite snack is popcorn.", multipleChoice: { prompt: "My favorite snack ___ popcorn.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Do you like salad?", answer: "Yes, I eat salad with dinner.", multipleChoice: { prompt: "Yes, I eat salad ___ dinner.", options: [{ letter: "A", text: "by", correct: false }, { letter: "B", text: "for", correct: false }, { letter: "C", text: "with", correct: true }] } },
    { question: "Do you drink tea or coffee?", answer: "I drink tea.", multipleChoice: { prompt: "___ drink tea.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Do you like chocolate?", answer: "Yes, I love chocolate.", multipleChoice: { prompt: "Yes, ___ love chocolate.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "What do you eat at school?", answer: "I eat a sandwich and fruit.", multipleChoice: { prompt: "___ eat a sandwich and fruit.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Do you drink water during the day?", answer: "Yes, I drink a lot of water.", multipleChoice: { prompt: "Yes, I drink a lot of ___.", options: [{ letter: "A", text: "bread", correct: false }, { letter: "B", text: "water", correct: true }, { letter: "C", text: "juice", correct: false }] } },
    { question: "Do you like hamburgers?", answer: "Yes, I like hamburgers with cheese.", multipleChoice: { prompt: "Yes, I ___ hamburgers with cheese.", options: [{ letter: "A", text: "like", correct: true }, { letter: "B", text: "likeed", correct: false }, { letter: "C", text: "likes", correct: false }] } },
    { question: "What do you eat with eggs?", answer: "I eat bread and cheese with eggs.", multipleChoice: { prompt: "I eat bread and cheese ___ eggs.", options: [{ letter: "A", text: "with", correct: true }, { letter: "B", text: "by", correct: false }, { letter: "C", text: "for", correct: false }] } },
    { question: "Do you like orange juice?", answer: "Yes, it’s my favorite.", multipleChoice: { prompt: "Yes, ___ my favorite.", options: [{ letter: "A", text: "it’s", correct: true }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’", correct: false }] } },
    { question: "Do you eat soup in winter?", answer: "Yes, I eat hot soup in winter.", multipleChoice: { prompt: "Yes, I ___ hot soup in winter.", options: [{ letter: "A", text: "eats", correct: false }, { letter: "B", text: "eating", correct: false }, { letter: "C", text: "eat", correct: true }] } },
    { question: "What do you have for lunch on Sundays?", answer: "I have chicken and rice.", multipleChoice: { prompt: "I ___ chicken and rice.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "has", correct: false }] } },
    { question: "Do you eat chocolate every day?", answer: "No, just sometimes.", multipleChoice: { prompt: "No, just ___.", options: [{ letter: "A", text: "never", correct: false }, { letter: "B", text: "sometimes", correct: true }, { letter: "C", text: "always", correct: false }] } },
    { question: "What food don’t you like?", answer: "I don’t like onions.", multipleChoice: { prompt: "___ don’t like onions.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "What’s a typical Turkish breakfast?", answer: "It includes bread, cheese, olives, and tea.", multipleChoice: { prompt: "___ includes bread, cheese, olives, and tea.", options: [{ letter: "A", text: "it", correct: true }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "What do you eat when you’re hungry at night?", answer: "I eat a small snack like yogurt.", multipleChoice: { prompt: "I eat a ___ snack like yogurt.", options: [{ letter: "A", text: "small", correct: true }, { letter: "B", text: "big", correct: false }, { letter: "C", text: "tiny", correct: false }] } },
    { question: "Do you eat ice cream in winter?", answer: "Yes, I eat it all year.", multipleChoice: { prompt: "Yes, ___ eat it all year.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "he", correct: false }] } },
    { question: "What do you usually cook?", answer: "I usually cook pasta or soup.", multipleChoice: { prompt: "___ usually cook pasta or soup.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "he", correct: false }] } },
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

  table: {
    title: "📋 Family Members Vocabulary (Aile Üyeleri)",
    data: [
      { category: "What is a Family?", explanation: "People related to you by blood or marriage", turkish: "Aile - kan bağı veya evlilik yoluyla akrabalık", function: "Talk about relatives and family relationships", questions: "Who is...? / Do you have...? / How many...?", note: "Family is one of the most important topics in daily conversation!" },

      { category: "Immediate Family (Nuclear Family)", parents: "parents (ebeveynler) - mother and father together", mother_mom: "mother / mom (anne) - female parent", father_dad: "father / dad (baba) - male parent", son: "son (oğul) - male child", daughter: "daughter (kız evlat) - female child", brother: "brother (erkek kardeş) - male sibling", sister: "sister (kız kardeş) - female sibling", note: "Closest family members you live with" },

      { category: "Grandparents (Büyük Ebeveynler)", grandparents: "grandparents (büyük anne ve büyük baba) - parents' parents", grandmother_grandma: "grandmother / grandma (büyükanne/anneanne/babaanne) - mother's or father's mother", grandfather_grandpa: "grandfather / grandpa (büyükbaba/dede) - mother's or father's father", grandson: "grandson (erkek torun) - son's or daughter's son", granddaughter: "granddaughter (kız torun) - son's or daughter's daughter", note: "Your parents' parents" },

      { category: "Extended Family - Parents' Siblings", uncle: "uncle (amca/dayı/enişte) - parent's brother OR aunt's husband", aunt: "aunt (hala/teyze/yenge) - parent's sister OR uncle's wife", specific_turkish: "amca (father's brother), dayı (mother's brother), enişte (aunt's husband)", specific_turkish_2: "hala (father's sister), teyze (mother's sister), yenge (uncle's wife)", note: "English has only 2 words, Turkish has 6!" },

      { category: "Cousins, Nieces, Nephews", cousin: "cousin (kuzen) - aunt's or uncle's child (male OR female)", nephew: "nephew (erkek yeğen) - brother's or sister's son", niece: "niece (kız yeğen) - brother's or sister's daughter", note: "'Cousin' is the same word for both male and female in English!", difference: "In Turkish: kuzen, yeğen distinguish gender more clearly" },

      { category: "Marriage & Spouse", husband: "husband (koca, eş) - married man", wife: "wife (eş, karı) - married woman", spouse: "spouse (eş) - neutral word for husband or wife", married: "married (evli) - She is married. / They are married.", single: "single (bekar) - not married", note: "Marriage vocabulary" },

      { category: "In-Laws (Kayın Akrabalar)", father_in_law: "father-in-law (kayınpeder) - spouse's father", mother_in_law: "mother-in-law (kayınvalide) - spouse's mother", brother_in_law: "brother-in-law (kayınbirader/enişte) - spouse's brother OR sister's husband", sister_in_law: "sister-in-law (görümce/baldız) - spouse's sister OR brother's wife", son_in_law: "son-in-law (damat) - daughter's husband", daughter_in_law: "daughter-in-law (gelin) - son's wife", note: "Family by marriage, not by blood" },

      { category: "Step Family & Half Siblings", stepmother: "stepmother (üvey anne) - father's new wife (not biological mother)", stepfather: "stepfather (üvey baba) - mother's new husband (not biological father)", stepbrother: "stepbrother (üvey erkek kardeş) - stepparent's son", stepsister: "stepsister (üvey kız kardeş) - stepparent's daughter", half_brother: "half-brother (öz kardeş - one parent same) - same mother OR father", half_sister: "half-sister (öz kardeş - one parent same) - same mother OR father", note: "Family from remarriage or blended families" },

      { category: "Possessive Forms (My, Your, His, Her)", my: "my father, my mother, my brother, my sister", your: "your father, your mother, your brother, your sister", his: "his father, his mother, his brother, his sister (for males)", her: "her father, her mother, her brother, her sister (for females)", our: "our father, our mother (shared family)", their: "their father, their mother", note: "ALWAYS use possessives with family members!", remember: "MY father (NOT the father or father only)" },

      { category: "Asking About Family", who_is: "Who is your mother? → She is my mom.", do_you_have: "Do you have any brothers or sisters? → Yes, I have one brother.", how_many: "How many siblings do you have? → I have two sisters.", whats_his_name: "What's your brother's name? → His name is Ali.", how_old: "How old is your sister? → She is 16 years old.", note: "Common family questions" },

      { category: "Singular vs Plural", singular: "child (çocuk) - one child", plural: "children (çocuklar) - two or more kids", note: "IRREGULAR plural: child → children (NOT childs!)", remember: "Do you have children? (plural) / I have one child. (singular)" },

      { category: "Siblings", sibling: "sibling (kardeş) - brother or sister (neutral word)", siblings: "siblings (kardeşler) - brothers and/or sisters (plural)", only_child: "only child (tek çocuk) - no brothers or sisters", examples: "I have three siblings. / I'm an only child. / My siblings are older than me.", note: "'Sibling' is a gender-neutral word" },

      { category: "Family Size", small_family: "small family (küçük aile) - 3-4 people", big_family: "big family (kalabalık aile) - 5+ people", nuclear_family: "nuclear family (çekirdek aile) - parents + children only", extended_family: "extended family (geniş aile) - includes grandparents, aunts, uncles, cousins", note: "Describing family size and type" },

      { category: "Describing Family", close_family: "close family (yakın aile) - we spend a lot of time together", get_along: "get along (anlaşmak) - have a good relationship", look_like: "look like (benzemek) - similar appearance", examples: "We are a close family. / I get along with my sister. / I look like my father.", note: "Talking about family relationships" },

      { category: "Age & Birth Order", older: "older (daha büyük) - My brother is older than me.", younger: "younger (daha küçük) - My sister is younger.", oldest: "oldest (en büyük) - I'm the oldest child.", youngest: "youngest (en küçük) - She's the youngest in the family.", middle_child: "middle child (ortanca) - between oldest and youngest", note: "Birth order and age comparisons" },

      { category: "Common Questions & Answers", q1: "Do you have any brothers or sisters? → Yes, I have one brother and one sister. / No, I'm an only child.", q2: "How many people are there in your family? → There are five people in my family.", q3: "Do you live with your parents? → Yes, I do. / No, I live alone.", q4: "Who do you look like? → I look like my mother.", q5: "Is your family big? → Yes, I have many cousins and uncles.", note: "Practice these common family conversations!" },

      { category: "Common Mistakes", mistake_1: "Forgetting possessives", wrong_1: "Father is a doctor ✗ / Sister is 10 years old ✗", correct_1: "MY father is a doctor ✓ / MY sister is 10 years old ✓", rule: "ALWAYS use possessive (my, your, his, her) with family members", remember: "My father, your mother, his brother, her sister" },
      { category: "Common Mistakes", mistake_2: "Using wrong plural for 'child'", wrong_2: "I have two childs ✗", correct_2: "I have two children ✓", rule: "IRREGULAR plural: child → children", remember: "One child, two children" },
      { category: "Common Mistakes", mistake_3: "Confusing 'older' and 'elder'", older: "older - used in comparisons (older THAN)", elder: "elder - used before noun (my elder brother)", correct: "She is older than me ✓ / My elder sister ✓", note: "'Elder' is formal, 'older' is more common" },

      { category: "Real-World Uses", introductions: "This is my mother. Her name is Fatma. This is my father, Mehmet.", talking_about_family: "I have a big family. I have two brothers and one sister. My grandparents live with us.", family_events: "We visit our relatives on holidays. My uncle lives in Istanbul.", general: "Essential for introducing people and talking about your life!" },

      { category: "Key Takeaway", summary: "Family vocabulary helps you talk about relatives and relationships", immediate: "mother, father, brother, sister, son, daughter", grandparents: "grandmother, grandfather, grandson, granddaughter", extended: "uncle, aunt, cousin, nephew, niece", marriage: "husband, wife, father-in-law, mother-in-law", possessives: "ALWAYS use: my father, your mother, his brother, her sister", questions: "Who is...? / Do you have...? / How many...? / What's...name?", irregular: "child → children (NOT childs!)", remember: "Use possessives! Know immediate and extended family! Practice family questions!", next: "Introduce your family members and describe your family!" }
    ]
  },
  
  speakingPractice: [
    { question: "Do you have any brothers or sisters?", answer: "Yes, I have one sister.", multipleChoice: { prompt: "Yes, I ___ one sister.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "How many people are there in your family?", answer: "There are five people in my family.", multipleChoice: { prompt: "There ___ five people in my family.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What does your father do?", answer: "He is a doctor.", multipleChoice: { prompt: "He ___ a doctor.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Who is your mother’s mother?", answer: "She is my grandmother.", multipleChoice: { prompt: "She ___ my grandmother.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Do you have any cousins?", answer: "Yes, I have three cousins.", multipleChoice: { prompt: "Yes, I ___ three cousins.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "has", correct: false }] } },
    { question: "What’s your brother’s name?", answer: "His name is Emre.", multipleChoice: { prompt: "His name ___ Emre.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "How old is your sister?", answer: "She is 15 years old.", multipleChoice: { prompt: "She ___ 15 years old.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Do you live with your parents?", answer: "Yes, I live with them.", multipleChoice: { prompt: "Yes, I live ___ them.", options: [{ letter: "A", text: "with", correct: true }, { letter: "B", text: "by", correct: false }, { letter: "C", text: "for", correct: false }] } },
    { question: "Do you see your grandparents often?", answer: "Yes, every weekend.", openResponse: true },
    { question: "Who is your uncle?", answer: "He is my dad’s brother.", multipleChoice: { prompt: "He ___ my dad’s brother.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "What does your aunt do?", answer: "She is a teacher.", multipleChoice: { prompt: "She ___ a teacher.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Do you have any nephews or nieces?", answer: "Yes, I have one niece.", multipleChoice: { prompt: "Yes, I ___ one niece.", options: [{ letter: "A", text: "have", correct: true }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "has", correct: false }] } },
    { question: "Is your cousin older than you?", answer: "Yes, he is older.", multipleChoice: { prompt: "Yes, he ___ older.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Do you get along with your siblings?", answer: "Yes, we get along well.", multipleChoice: { prompt: "Yes, we ___ along well.", options: [{ letter: "A", text: "get", correct: true }, { letter: "B", text: "got", correct: false }, { letter: "C", text: "getting", correct: false }] } },
    { question: "What’s your mother’s name?", answer: "Her name is Ayşe.", multipleChoice: { prompt: "Her name ___ Ayşe.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Who is the youngest in your family?", answer: "My little brother is the youngest.", multipleChoice: { prompt: "My little brother ___ the youngest.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Do you have a big family?", answer: "Yes, I have a big family.", multipleChoice: { prompt: "Yes, I ___ a big family.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "had", correct: false }] } },
    { question: "Who do you look like in your family?", answer: "I look like my father.", multipleChoice: { prompt: "I look like my ___.", options: [{ letter: "A", text: "sister", correct: false }, { letter: "B", text: "teacher", correct: false }, { letter: "C", text: "father", correct: true }] } },
    { question: "Do your grandparents live near you?", answer: "Yes, they live close to us.", multipleChoice: { prompt: "Yes, they live ___ to us.", options: [{ letter: "A", text: "close", correct: true }, { letter: "B", text: "far", correct: false }, { letter: "C", text: "next", correct: false }] } },
    { question: "What do you call your father’s sister?", answer: "I call her my aunt.", multipleChoice: { prompt: "___ call her my aunt.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Who is your favorite family member?", answer: "My grandma is my favorite.", multipleChoice: { prompt: "My grandma ___ my favorite.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Do you visit your relatives often?", answer: "Yes, especially on holidays.", multipleChoice: { prompt: "Yes, especially on ___.", options: [{ letter: "A", text: "holidays", correct: true }, { letter: "B", text: "weekdays", correct: false }, { letter: "C", text: "mornings", correct: false }] } },
    { question: "Is your sister married?", answer: "Yes, she has two children.", multipleChoice: { prompt: "Yes, she ___ two children.", options: [{ letter: "A", text: "have", correct: false }, { letter: "B", text: "had", correct: false }, { letter: "C", text: "has", correct: true }] } },
    { question: "How many uncles do you have?", answer: "I have four uncles.", multipleChoice: { prompt: "I ___ four uncles.", options: [{ letter: "A", text: "had", correct: false }, { letter: "B", text: "has", correct: false }, { letter: "C", text: "have", correct: true }] } },
    { question: "Do you help your parents at home?", answer: "Yes, I help them every day.", multipleChoice: { prompt: "Yes, ___ help them every day.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Is your cousin your age?", answer: "Yes, we’re the same age.", multipleChoice: { prompt: "Yes, we’re the same ___.", options: [{ letter: "A", text: "size", correct: false }, { letter: "B", text: "age", correct: true }, { letter: "C", text: "name", correct: false }] } },
    { question: "Who is older, your mom or your dad?", answer: "My dad is older.", multipleChoice: { prompt: "My dad ___ older.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What does your grandfather do?", answer: "He is retired.", multipleChoice: { prompt: "He ___ retired.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Do you play with your siblings?", answer: "Yes, we play games together.", multipleChoice: { prompt: "Yes, we ___ games together.", options: [{ letter: "A", text: "plays", correct: false }, { letter: "B", text: "played", correct: false }, { letter: "C", text: "play", correct: true }] } },
    { question: "What do you call your mother’s brother?", answer: "He is my uncle.", multipleChoice: { prompt: "He ___ my uncle.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Do you have a stepbrother or stepsister?", answer: "No, I don’t.", multipleChoice: { prompt: "No, ___ don’t.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Is your family close?", answer: "Yes, we are very close.", multipleChoice: { prompt: "Yes, we ___ very close.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "Do you know your great-grandparents?", answer: "No, I don’t.", multipleChoice: { prompt: "No, ___ don’t.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "Who cooks in your family?", answer: "My mother usually cooks.", multipleChoice: { prompt: "My ___ usually cooks.", options: [{ letter: "A", text: "sister", correct: false }, { letter: "B", text: "mother", correct: true }, { letter: "C", text: "father", correct: false }] } },
    { question: "Do you live in the same house as your grandparents?", answer: "No, but we live nearby.", multipleChoice: { prompt: "No, but ___ live nearby.", options: [{ letter: "A", text: "they", correct: false }, { letter: "B", text: "we", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "Is your dad funny?", answer: "Yes, he tells funny jokes.", multipleChoice: { prompt: "Yes, ___ tells funny jokes.", options: [{ letter: "A", text: "he", correct: true }, { letter: "B", text: "it", correct: false }, { letter: "C", text: "she", correct: false }] } },
    { question: "Do your parents work?", answer: "Yes, they both work.", multipleChoice: { prompt: "Yes, ___ both work.", options: [{ letter: "A", text: "they", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "we", correct: false }] } },
    { question: "What’s your daughter’s name?", answer: "Her name is Elif.", multipleChoice: { prompt: "Her name ___ Elif.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Do you have children?", answer: "Yes, I have two children.", multipleChoice: { prompt: "Yes, I ___ two children.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "had", correct: false }] } },
    { question: "Who takes care of you when you’re sick?", answer: "My mom does.", multipleChoice: { prompt: "My mom ___.", options: [{ letter: "A", text: "do", correct: false }, { letter: "B", text: "does", correct: true }, { letter: "C", text: "did", correct: false }] } },
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

  table: {
    title: "📋 Directions and Places Vocabulary (Yön Tarifi ve Yerler)",
    data: [
      { category: "What are Directions?", explanation: "Instructions to help someone find a place or location", turkish: "Yön tarifi - birine bir yeri nasıl bulacağını anlatmak", function: "Give and understand directions to navigate a town or city", key_phrases: "Where is...? / How can I get to...? / Turn left/right / Go straight", note: "Essential for traveling and finding places!" },

      { category: "Direction Verbs (Yön Fiilleri)", turn_left: "turn left (sola dön) - change direction to the left", turn_right: "turn right (sağa dön) - change direction to the right", go_straight: "go straight (düz git) - continue in the same direction, don't turn", go_past: "go past (geç) - continue beyond a place without stopping", cross: "cross (karşıya geç) - go from one side to the other (cross the street, cross the bridge)", note: "Basic movement verbs for giving directions" },

      { category: "Asking for Directions", where_is: "Where is the bank? (Banka nerede?)", how_can_i_get: "How can I get to the post office? (Postaneye nasıl gidebilirim?)", is_there_near: "Is there a hospital near here? (Yakında hastane var mı?)", excuse_me: "Excuse me, where is the nearest supermarket? (Affedersiniz, en yakın market nerede?)", can_you_tell: "Can you tell me the way to the station? (Bana istasyonun yolunu tarif edebilir misiniz?)", note: "Polite ways to ask for help" },

      { category: "Giving Simple Directions", go_straight: "Go straight. (Düz gidin.)", turn_left_at: "Turn left at the traffic lights. (Trafikte sola dönün.)", turn_right_at: "Turn right at the corner. (Köşede sağa dönün.)", its_on_the_left: "It's on the left. (Solda.)", its_on_the_right: "It's on the right. (Sağda.)", note: "Basic direction responses" },

      { category: "Prepositions of Place", next_to: "next to (yanında) - beside, at the side of", opposite: "opposite (karşısında) - across from, facing", between: "between (arasında) - in the middle of two things", behind: "behind (arkasında) - at the back of", in_front_of: "in front of (önünde) - before, at the front of", near: "near (yakınında) - close to", note: "Describe exact locations" },

      { category: "Using Prepositions Examples", example_1: "The bank is next to the supermarket. (Banka marketin yanında.)", example_2: "The school is opposite the park. (Okul parkın karşısında.)", example_3: "The hotel is between the restaurant and the café. (Otel restoranla kafenin arasında.)", example_4: "The post office is behind the library. (Postane kütüphanenin arkasında.)", example_5: "The bus stop is in front of the hospital. (Otobüs durağı hastanenin önünde.)", note: "Practice using prepositions to describe locations!" },

      { category: "Landmarks & Reference Points", at_the_corner: "at the corner (köşede) - where two streets meet", traffic_lights: "at the traffic lights (trafikte, ışıklarda) - intersection with lights", roundabout: "at the roundabout (dönel kavşakta) - circular intersection", bridge: "bridge (köprü) - cross the bridge", crossroads: "at the crossroads (kavşakta) - where two roads cross", note: "Reference points for navigation" },

      { category: "Common Places in a Town/City", bank: "bank (banka) - where you get money, open accounts", post_office: "post office (postane) - send letters and packages", hospital: "hospital (hastane) - medical care, emergency", pharmacy: "pharmacy (eczane) - buy medicine", supermarket: "supermarket (market, süpermarket) - buy food and groceries", police_station: "police station (polis karakolu) - for police help", note: "Essential services" },
      { category: "More City Places", school: "school (okul) - where children study", library: "library (kütüphane) - borrow books", park: "park (park) - green space, playground", bus_stop: "bus stop (otobüs durağı) - wait for the bus", train_station: "train station (tren istasyonu) - catch trains", airport: "airport (havalimanı) - fly to other cities", note: "Public places and transportation" },
      { category: "Shops & Services", restaurant: "restaurant (restoran) - eat meals", café_coffee_shop: "café / coffee shop (kafe) - drink coffee, snacks", hotel: "hotel (otel) - accommodation for travelers", bakery: "bakery (fırın) - buy bread and pastries", bookshop: "bookshop (kitapçı) - buy books", shopping_mall: "shopping mall (alışveriş merkezi) - large indoor shopping center", note: "Commercial and service places" },

      { category: "Distance & Time Expressions", its_close: "It's close. / It's near. (Yakın.)", its_far: "It's far. (Uzak.)", its_5_minutes_away: "It's 5 minutes away. (5 dakika uzaklıkta.)", you_can_walk: "You can walk. (Yürüyebilirsiniz.)", take_a_bus: "You need to take a bus/taxi. (Otobüs/taksi almanız gerek.)", just_past: "It's just past the supermarket. (Marketin hemen ötesinde.)", note: "Describe how far a place is" },

      { category: "Street & Road Vocabulary", street_road: "street / road (sokak, cadde)", avenue: "avenue (bulvar, cadde) - wide street", lane: "lane (şerit, dar sokak)", block: "block (blok) - buildings between streets", sidewalk: "sidewalk (kaldırım) - path for walking", intersection: "intersection (kavşak) - where streets meet", note: "Parts of the road system" },

      { category: "Complete Direction Example", full_directions: "Excuse me, where is the bank? → Go straight down this street. Turn right at the traffic lights. Go past the supermarket. The bank is on your left, next to the pharmacy. It's about 5 minutes away.", breakdown: "1. Go straight (direction), 2. Turn right (turn), 3. Go past (landmark), 4. On the left (location), 5. Next to (preposition)", note: "Multi-step directions with landmarks!" },

      { category: "Understanding Directions - Key Words", listen_for: "LEFT, RIGHT, STRAIGHT, PAST, AT, CORNER, LIGHTS", prepositions: "NEXT TO, OPPOSITE, BETWEEN, BEHIND, IN FRONT OF", distance: "CLOSE, FAR, MINUTES AWAY, WALK", confirmation: "Can you repeat that? / Is it far? / On the left or right?", note: "Pay attention to these key words when listening!" },

      { category: "Polite Responses", thank_you: "Thank you! / Thanks a lot! (Teşekkür ederim!)", youre_welcome: "You're welcome. (Bir şey değil.)", sorry_dont_know: "Sorry, I don't know. I'm not from here. (Üzgünüm, bilmiyorum. Ben bu civarda değilim.)", let_me_show: "Let me show you on the map. (Haritada göstereyim.)", note: "Be polite when asking and helping!" },

      { category: "Common Mistakes", mistake_1: "Confusing left and right", tip: "Use your hands to check! Left hand = L shape", practice: "Point as you say: 'Turn left' (point left), 'Turn right' (point right)", remember: "LEFT = sol | RIGHT = sağ" },
      { category: "Common Mistakes", mistake_2: "Saying 'in' instead of 'at' with corners", wrong_2: "Turn left in the corner ✗", correct_2: "Turn left AT the corner ✓", rule: "Use AT with specific points (corner, traffic lights)", remember: "AT the corner, AT the lights, AT the crossroads" },
      { category: "Common Mistakes", mistake_3: "Forgetting articles with places", wrong_3: "Go to bank ✗ / It's next to hospital ✗", correct_3: "Go to THE bank ✓ / It's next to THE hospital ✓", rule: "Use THE with specific places", remember: "Always 'the bank', 'the hospital', 'the school'" },

      { category: "Real-World Uses", tourists: "Excuse me, where is the train station? / How can I get to the museum?", locals_helping: "Go straight and turn left at the second street. It's on your right.", using_maps: "According to the map, the café is opposite the library.", emergency: "Where is the nearest hospital? / Is there a pharmacy near here?", general: "Essential for navigating cities and helping others!" },

      { category: "Key Takeaway", summary: "Directions vocabulary helps you navigate and find places", asking: "Where is...? / How can I get to...? / Is there a...near here?", giving: "Go straight / Turn left/right / Go past / It's on the left/right", prepositions: "next to, opposite, between, behind, in front of, near", places: "bank, hospital, school, park, restaurant, bus stop, train station", distance: "close, far, 5 minutes away, you can walk", landmarks: "at the corner, at the traffic lights, at the roundabout", remember: "Listen for LEFT, RIGHT, STRAIGHT, PAST! Use THE with places! Practice with maps!", next: "Practice giving and following directions!" }
    ]
  },
  
  speakingPractice: [
    { question: "Where is the nearest bank?", answer: "It’s next to the supermarket.", multipleChoice: { prompt: "It’s next to the ___.", options: [{ letter: "A", text: "supermarket", correct: true }, { letter: "B", text: "library", correct: false }, { letter: "C", text: "pharmacy", correct: false }] } },
    { question: "How do I get to the post office?", answer: "Go straight and turn left.", multipleChoice: { prompt: "Go straight and turn ___.", options: [{ letter: "A", text: "back", correct: false }, { letter: "B", text: "left", correct: true }, { letter: "C", text: "right", correct: false }] } },
    { question: "Is there a hospital near here?", answer: "Yes, it’s behind the school.", multipleChoice: { prompt: "Yes, it’s behind the ___.", options: [{ letter: "A", text: "bank", correct: false }, { letter: "B", text: "hospital", correct: false }, { letter: "C", text: "school", correct: true }] } },
    { question: "Where is the school?", answer: "It’s across from the park.", multipleChoice: { prompt: "It’s across ___ the park.", options: [{ letter: "A", text: "to", correct: false }, { letter: "B", text: "by", correct: false }, { letter: "C", text: "from", correct: true }] } },
    { question: "Can you tell me the way to the bus stop?", answer: "Yes, go straight and it’s on the right.", multipleChoice: { prompt: "Yes, go ___ and it’s on the right.", options: [{ letter: "A", text: "sideways", correct: false }, { letter: "B", text: "straight", correct: true }, { letter: "C", text: "backward", correct: false }] } },
    { question: "How can I get to the police station?", answer: "Turn right at the traffic lights.", multipleChoice: { prompt: "Turn right at the ___.", options: [{ letter: "A", text: "bus stop", correct: false }, { letter: "B", text: "crossroads", correct: false }, { letter: "C", text: "traffic lights", correct: true }] } },
    { question: "Is there a supermarket nearby?", answer: "Yes, it's next to the pharmacy.", multipleChoice: { prompt: "Yes, it's next to the ___.", options: [{ letter: "A", text: "pharmacy", correct: true }, { letter: "B", text: "bakery", correct: false }, { letter: "C", text: "station", correct: false }] } },
    { question: "Where’s the nearest park?", answer: "It’s behind the hotel.", multipleChoice: { prompt: "___ behind the hotel.", options: [{ letter: "A", text: "it’s", correct: true }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’", correct: false }] } },
    { question: "Where is the restaurant?", answer: "It’s opposite the bank.", multipleChoice: { prompt: "___ opposite the bank.", options: [{ letter: "A", text: "it’ing", correct: false }, { letter: "B", text: "it’s", correct: true }, { letter: "C", text: "it’", correct: false }] } },
    { question: "Where’s the cinema?", answer: "It’s between the cafe and the bookstore.", multipleChoice: { prompt: "___ between the cafe and the bookstore.", options: [{ letter: "A", text: "it’ing", correct: false }, { letter: "B", text: "it’s", correct: true }, { letter: "C", text: "it’", correct: false }] } },
    { question: "How do I get to the hotel?", answer: "Go straight and turn right.", multipleChoice: { prompt: "Go ___ and turn right.", options: [{ letter: "A", text: "quietly", correct: false }, { letter: "B", text: "straight", correct: true }, { letter: "C", text: "slowly", correct: false }] } },
    { question: "Is the bakery far from here?", answer: "No, it’s very close.", multipleChoice: { prompt: "No, ___ very close.", options: [{ letter: "A", text: "it’s", correct: true }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’", correct: false }] } },
    { question: "Where is the coffee shop?", answer: "It’s next to the library.", multipleChoice: { prompt: "It’s next to the ___.", options: [{ letter: "A", text: "library", correct: true }, { letter: "B", text: "museum", correct: false }, { letter: "C", text: "market", correct: false }] } },
    { question: "Can I walk to the museum?", answer: "Yes, it’s just five minutes away.", multipleChoice: { prompt: "Yes, ___ just five minutes away.", options: [{ letter: "A", text: "it’s", correct: true }, { letter: "B", text: "it’", correct: false }, { letter: "C", text: "it’ing", correct: false }] } },
    { question: "Where’s the bookshop?", answer: "It’s opposite the school.", multipleChoice: { prompt: "It’s opposite the ___.", options: [{ letter: "A", text: "park", correct: false }, { letter: "B", text: "church", correct: false }, { letter: "C", text: "school", correct: true }] } },
    { question: "Is the gas station near here?", answer: "Yes, it’s on the corner.", multipleChoice: { prompt: "Yes, it’s on the ___.", options: [{ letter: "A", text: "corner", correct: true }, { letter: "B", text: "bridge", correct: false }, { letter: "C", text: "square", correct: false }] } },
    { question: "How do I go to the airport?", answer: "Take a taxi or go by bus.", multipleChoice: { prompt: "___ a taxi or go by bus.", options: [{ letter: "A", text: "takes", correct: false }, { letter: "B", text: "take", correct: true }, { letter: "C", text: "get", correct: false }] } },
    { question: "Is the train station far?", answer: "No, it’s just past the bridge.", multipleChoice: { prompt: "No, ___ just past the bridge.", options: [{ letter: "A", text: "it’s", correct: true }, { letter: "B", text: "it’", correct: false }, { letter: "C", text: "it’ing", correct: false }] } },
    { question: "Where can I find a pharmacy?", answer: "There’s one near the hospital.", multipleChoice: { prompt: "___ one near the hospital.", options: [{ letter: "A", text: "there’s", correct: true }, { letter: "B", text: "there’", correct: false }, { letter: "C", text: "there’ing", correct: false }] } },
    { question: "Where is the library?", answer: "It’s next to the school.", multipleChoice: { prompt: "It’s next to the ___.", options: [{ letter: "A", text: "office", correct: false }, { letter: "B", text: "school", correct: true }, { letter: "C", text: "cinema", correct: false }] } },
    { question: "Where’s the zoo?", answer: "It’s at the end of this street.", multipleChoice: { prompt: "It’s at the ___ of this street.", options: [{ letter: "A", text: "middle", correct: false }, { letter: "B", text: "start", correct: false }, { letter: "C", text: "end", correct: true }] } },
    { question: "Is the bank on this street?", answer: "Yes, it’s on the left.", multipleChoice: { prompt: "Yes, it’s on the ___.", options: [{ letter: "A", text: "left", correct: true }, { letter: "B", text: "top", correct: false }, { letter: "C", text: "back", correct: false }] } },
    { question: "Where can I find a taxi?", answer: "There’s a taxi stand by the hotel.", multipleChoice: { prompt: "There’s a taxi stand ___ the hotel.", options: [{ letter: "A", text: "with", correct: false }, { letter: "B", text: "from", correct: false }, { letter: "C", text: "by", correct: true }] } },
    { question: "How do I get to the stadium?", answer: "Go along this road and turn left.", multipleChoice: { prompt: "Go along this ___ and turn left.", options: [{ letter: "A", text: "river", correct: false }, { letter: "B", text: "path", correct: false }, { letter: "C", text: "road", correct: true }] } },
    { question: "Is there a church around here?", answer: "Yes, just go straight ahead.", multipleChoice: { prompt: "Yes, just go ___ ahead.", options: [{ letter: "A", text: "straight", correct: true }, { letter: "B", text: "upward", correct: false }, { letter: "C", text: "downward", correct: false }] } },
    { question: "Where’s the shopping mall?", answer: "It’s near the train station.", multipleChoice: { prompt: "___ near the train station.", options: [{ letter: "A", text: "it’ing", correct: false }, { letter: "B", text: "it’", correct: false }, { letter: "C", text: "it’s", correct: true }] } },
    { question: "Where can I get a bus?", answer: "Go to the bus stop in front of the school.", multipleChoice: { prompt: "Go to the ___ in front of the school.", options: [{ letter: "A", text: "train station", correct: false }, { letter: "B", text: "taxi rank", correct: false }, { letter: "C", text: "bus stop", correct: true }] } },
    { question: "How do I get to the market?", answer: "Walk down this street and turn right.", multipleChoice: { prompt: "Walk down this street and turn ___.", options: [{ letter: "A", text: "right", correct: true }, { letter: "B", text: "left", correct: false }, { letter: "C", text: "back", correct: false }] } },
    { question: "Is the hotel close to the beach?", answer: "Yes, just a 3-minute walk.", multipleChoice: { prompt: "Yes, just a 3-minute ___.", options: [{ letter: "A", text: "drive", correct: false }, { letter: "B", text: "walk", correct: true }, { letter: "C", text: "ride", correct: false }] } },
    { question: "Where’s the nearest ATM?", answer: "It’s beside the grocery store.", multipleChoice: { prompt: "___ beside the grocery store.", options: [{ letter: "A", text: "it’s", correct: true }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’", correct: false }] } },
    { question: "Where is the fire station?", answer: "It’s across from the police station.", multipleChoice: { prompt: "It’s across ___ the police station.", options: [{ letter: "A", text: "from", correct: true }, { letter: "B", text: "by", correct: false }, { letter: "C", text: "to", correct: false }] } },
    { question: "Where can I buy stamps?", answer: "You can buy them at the post office.", multipleChoice: { prompt: "You ___ buy them at the post office.", options: [{ letter: "A", text: "can", correct: true }, { letter: "B", text: "should", correct: false }, { letter: "C", text: "could", correct: false }] } },
    { question: "Is the parking lot nearby?", answer: "Yes, it’s behind the building.", multipleChoice: { prompt: "Yes, ___ behind the building.", options: [{ letter: "A", text: "it’ing", correct: false }, { letter: "B", text: "it’s", correct: true }, { letter: "C", text: "it’", correct: false }] } },
    { question: "Where’s the entrance?", answer: "It’s on the right side.", multipleChoice: { prompt: "It’s on the ___ side.", options: [{ letter: "A", text: "right", correct: true }, { letter: "B", text: "front", correct: false }, { letter: "C", text: "top", correct: false }] } },
    { question: "Where’s the tourist office?", answer: "Next to the museum.", multipleChoice: { prompt: "Next to the ___.", options: [{ letter: "A", text: "stadium", correct: false }, { letter: "B", text: "museum", correct: true }, { letter: "C", text: "theater", correct: false }] } },
    { question: "Is the bookstore far?", answer: "No, it’s just around the corner.", multipleChoice: { prompt: "No, ___ just around the corner.", options: [{ letter: "A", text: "it’s", correct: true }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’", correct: false }] } },
    { question: "Can I walk to the train station?", answer: "Yes, it’s a short walk.", multipleChoice: { prompt: "Yes, it’s a ___ walk.", options: [{ letter: "A", text: "short", correct: true }, { letter: "B", text: "small", correct: false }, { letter: "C", text: "tall", correct: false }] } },
    { question: "Where is the bridge?", answer: "It’s over the river.", multipleChoice: { prompt: "___ over the river.", options: [{ letter: "A", text: "it’s", correct: true }, { letter: "B", text: "it’", correct: false }, { letter: "C", text: "it’ing", correct: false }] } },
    { question: "Where can I eat lunch?", answer: "There’s a nice café across the street.", multipleChoice: { prompt: "___ a nice café across the street.", options: [{ letter: "A", text: "there’", correct: false }, { letter: "B", text: "there’s", correct: true }, { letter: "C", text: "there’ing", correct: false }] } },
    { question: "Where’s the closest gym?", answer: "It’s near the park.", multipleChoice: { prompt: "___ near the park.", options: [{ letter: "A", text: "it’", correct: false }, { letter: "B", text: "it’s", correct: true }, { letter: "C", text: "it’ing", correct: false }] } },
    { question: "Where is the swimming pool?", answer: "It’s next to the sports center.", multipleChoice: { prompt: "It’s next to the ___.", options: [{ letter: "A", text: "police station", correct: false }, { letter: "B", text: "sports center", correct: true }, { letter: "C", text: "post office", correct: false }] } },
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

  table: {
    title: "📋 Weather Vocabulary (Hava Durumu)",
    data: [
      { category: "What is Weather?", explanation: "Atmospheric conditions - what it's like outside", turkish: "Hava durumu - dışarıdaki atmosferik koşullar", function: "Describe current weather, talk about forecasts, plan activities", key_question: "What's the weather like? (Hava nasıl?)", note: "One of the most common small talk topics!" },

      { category: "Weather Conditions (Hava Koşulları)", sunny: "sunny (güneşli) - bright sun, clear sky", cloudy: "cloudy (bulutlu) - sky covered with clouds", rainy: "rainy (yağmurlu) - raining, wet", snowy: "snowy (karlı) - snowing, covered with snow", windy: "windy (rüzgarlı) - a lot of wind blowing", foggy: "foggy (sisli) - low visibility, mist", stormy: "stormy (fırtınalı) - thunder, lightning, heavy rain/wind", note: "Main weather conditions" },

      { category: "Temperature Words", hot: "hot (sıcak) - very warm, uncomfortable heat", warm: "warm (ılık) - pleasantly hot", cool: "cool (serin) - pleasantly cold", cold: "cold (soğuk) - low temperature, need warm clothes", freezing: "freezing (dondurucu soğuk) - extremely cold", mild: "mild (ılıman) - neither hot nor cold, comfortable", note: "Describing temperature" },

      { category: "Asking About Weather", whats_the_weather_like: "What's the weather like? (Hava nasıl?) - MOST COMMON", hows_the_weather: "How's the weather? (Hava nasıl?)", is_it_raining: "Is it raining? / Is it snowing? (Yağmur yağıyor mu? / Kar yağıyor mu?)", whats_the_temperature: "What's the temperature? (Sıcaklık kaç derece?)", will_it_rain: "Will it rain tomorrow? (Yarın yağmur yağacak mı?)", note: "Common weather questions" },

      { category: "Describing Weather with IT'S", structure: "It's + adjective", examples: "It's sunny. / It's rainy. / It's cold. / It's hot. / It's windy.", pattern: "Always use IT'S (not 'The weather is' in casual speech)", turkish: "Hava + sıfat", note: "Simple and natural way to describe weather", remember: "It's sunny (NOT The weather is sunny - though grammatically correct, less common)" },

      { category: "Present Continuous for Weather", structure: "It's + verb-ing", examples: "It's raining. (Yağmur yağıyor.) / It's snowing. (Kar yağıyor.)", use: "For weather happening RIGHT NOW", note: "More specific than just 'rainy' or 'snowy'", rain: "It's raining. (happening now) vs. It's rainy. (general condition)", snow: "It's snowing. (happening now) vs. It's snowy. (general condition)" },

      { category: "Weather Verbs", rain: "rain (yağmur yağmak) - It's raining. / It rained yesterday.", snow: "snow (kar yağmak) - It's snowing. / It snowed last night.", shine: "shine (parlamak) - The sun is shining. (Güneş parlıyor.)", blow: "blow (esmek) - The wind is blowing. (Rüzgar esiyor.)", note: "Actions of weather elements" },

      { category: "Weather Nouns", rain: "rain (yağmur) - There's a lot of rain today.", snow: "snow (kar) - The snow is beautiful.", sun: "sun (güneş) - The sun is out!", wind: "wind (rüzgar) - The wind is strong.", cloud: "cloud (bulut) - Look at the clouds.", storm: "storm (fırtına) - There's a storm coming.", note: "Weather as things/objects" },

      { category: "Extreme Weather", thunder: "thunder (gök gürültüsü) - loud sound in storm", lightning: "lightning (şimşek) - bright flash in storm", hurricane: "hurricane (kasırga) - very strong storm", flood: "flood (sel) - too much water", blizzard: "blizzard (kar fırtınası) - heavy snow with strong wind", heatwave: "heatwave (sıcak hava dalgası) - very hot period", note: "Dangerous or unusual weather" },

      { category: "What to Wear in Weather", sunny_hot: "In sunny/hot weather: shorts, T-shirt, sunglasses, sunscreen", rainy: "In rainy weather: raincoat, umbrella, boots", cold_snowy: "In cold/snowy weather: coat, gloves, scarf, hat, warm clothes", windy: "In windy weather: jacket, secure your hat!", note: "Practical vocabulary for planning!" },

      { category: "Weather and Activities", sunny: "Sunny weather: go to the beach, have a picnic, play outside", rainy: "Rainy weather: stay inside, watch movies, read books", snowy: "Snowy weather: make a snowman, go skiing", hot: "Hot weather: swim, drink cold water, stay in the shade", cold: "Cold weather: drink hot tea, wear warm clothes", note: "What to do in different weather!" },

      { category: "Past Tense - Yesterday's Weather", structure: "It WAS + adjective", examples: "It was sunny yesterday. / It was cold last week.", raining: "It was raining. (Past continuous)", rained: "It rained. (Simple past)", note: "Use WAS (not is) for past weather", remember: "It was sunny (yesterday) | It is sunny (today) | It will be sunny (tomorrow)" },

      { category: "Future Tense - Tomorrow's Weather", structure: "It WILL BE + adjective OR It's GOING TO + verb", examples: "It will be sunny tomorrow. / It's going to rain tonight.", forecast: "The forecast says it will snow. (Hava tahmini kar yağacağını söylüyor.)", note: "Talking about future weather", remember: "It will be sunny | It's going to be sunny (both correct)" },

      { category: "Seasons & Weather", spring: "Spring (İlkbahar) - warm, rainy, flowers bloom", summer: "Summer (Yaz) - hot, sunny, dry", autumn_fall: "Autumn/Fall (Sonbahar) - cool, windy, leaves fall", winter: "Winter (Kış) - cold, snowy, short days", note: "Typical weather in each season", pattern: "In + season: In summer, it's hot. In winter, it's cold." },

      { category: "Checking Weather Forecast", weather_forecast: "weather forecast (hava tahmini) - prediction of future weather", check_weather: "I check the weather every morning. (Her sabah havayı kontrol ederim.)", weather_app: "weather app (hava durumu uygulaması) - phone app for weather", whats_the_forecast: "What's the forecast for tomorrow? (Yarının tahmini nasıl?)", note: "Modern weather vocabulary" },

      { category: "Common Weather Expressions", nice_weather: "nice weather (güzel hava) - pleasant conditions", bad_weather: "bad weather (kötü hava) - unpleasant conditions", beautiful_day: "What a beautiful day! (Ne güzel bir gün!)", terrible_weather: "The weather is terrible today. (Hava bugün berbat.)", love_this_weather: "I love this weather! / I hate this weather!", note: "Expressing opinions about weather" },

      { category: "Common Mistakes", mistake_1: "Using 'The weather' instead of 'It'", wrong_1: "The weather is raining ✗", correct_1: "It's raining ✓ OR The weather is rainy ✓", rule: "It's raining (verb-ing) OR It's rainy (adjective)", remember: "It's + verb-ing for action!" },
      { category: "Common Mistakes", mistake_2: "Saying 'it have' instead of 'there is'", wrong_2: "It has rain ✗", correct_2: "It's raining ✓ / There is rain ✓", rule: "Use IT'S for weather, not IT HAS", remember: "It's raining, not 'it has rain'" },
      { category: "Common Mistakes", mistake_3: "Confusing 'cold' and 'cool'", cold: "cold (soğuk) - need a coat, uncomfortable", cool: "cool (serin) - pleasant, light jacket", wrong_3: "It's cool in winter ✗ (winter is COLD!)", correct_3: "It's cold in winter ✓ / It's cool in autumn ✓", remember: "Cold = uncomfortable | Cool = pleasant" },

      { category: "Real-World Uses", small_talk: "Nice weather today, isn't it? / It's so cold!", planning: "What's the weather like tomorrow? Should I bring an umbrella?", travel: "What's the weather like in Paris in June? / I heard it's very hot there.", complaints: "I hate this rainy weather. / I can't wait for summer!", general: "Weather is the #1 small talk topic worldwide!" },

      { category: "Key Takeaway", summary: "Weather vocabulary describes atmospheric conditions", question: "What's the weather like? (most common question)", answer_its: "It's sunny / rainy / snowy / cloudy / hot / cold / windy / foggy", present_continuous: "It's raining / It's snowing (happening now)", conditions: "sunny, rainy, snowy, cloudy, windy, foggy, stormy", temperature: "hot, warm, cool, cold, freezing, mild", past: "It was sunny yesterday. / It was raining.", future: "It will be sunny tomorrow. / It's going to rain.", seasons: "Spring - warm, rainy | Summer - hot, sunny | Autumn - cool, windy | Winter - cold, snowy", remember: "Use IT'S (not 'the weather is')! It's raining (verb-ing) vs. It's rainy (adjective)!", next: "Practice describing today's weather and making predictions!" }
    ]
  },
  
  speakingPractice: [
    { question: "What’s the weather like today?", answer: "It’s sunny and warm.", multipleChoice: { prompt: "___ sunny and warm.", options: [{ letter: "A", text: "it’ing", correct: false }, { letter: "B", text: "it’", correct: false }, { letter: "C", text: "it’s", correct: true }] } },
    { question: "Do you like rainy weather?", answer: "No, I don’t like the rain.", multipleChoice: { prompt: "No, ___ don’t like the rain.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Is it cold in winter?", answer: "Yes, it’s very cold.", multipleChoice: { prompt: "Yes, it’s very ___.", options: [{ letter: "A", text: "warm", correct: false }, { letter: "B", text: "windy", correct: false }, { letter: "C", text: "cold", correct: true }] } },
    { question: "What do you do on snowy days?", answer: "I stay home and drink hot tea.", multipleChoice: { prompt: "I stay ___ and drink hot tea.", options: [{ letter: "A", text: "school", correct: false }, { letter: "B", text: "work", correct: false }, { letter: "C", text: "home", correct: true }] } },
    { question: "Is it hot in summer?", answer: "Yes, it’s very hot.", multipleChoice: { prompt: "Yes, it’s very ___.", options: [{ letter: "A", text: "cloudy", correct: false }, { letter: "B", text: "hot", correct: true }, { letter: "C", text: "cool", correct: false }] } },
    { question: "What’s your favorite weather?", answer: "I like cool and cloudy days.", multipleChoice: { prompt: "I ___ cool and cloudy days.", options: [{ letter: "A", text: "like", correct: true }, { letter: "B", text: "likeed", correct: false }, { letter: "C", text: "likes", correct: false }] } },
    { question: "Do you like sunny days?", answer: "Yes, I love the sunshine.", multipleChoice: { prompt: "Yes, ___ love the sunshine.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Is it windy today?", answer: "Yes, it’s very windy.", multipleChoice: { prompt: "Yes, ___ very windy.", options: [{ letter: "A", text: "it’s", correct: true }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’", correct: false }] } },
    { question: "What do you wear in cold weather?", answer: "I wear a coat and a scarf.", multipleChoice: { prompt: "___ wear a coat and a scarf.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "Is it foggy in the morning?", answer: "Yes, it’s foggy near the river.", multipleChoice: { prompt: "Yes, ___ foggy near the river.", options: [{ letter: "A", text: "it’ing", correct: false }, { letter: "B", text: "it’s", correct: true }, { letter: "C", text: "it’", correct: false }] } },
    { question: "Do you like the snow?", answer: "Yes, I like playing in the snow.", multipleChoice: { prompt: "Yes, I ___ playing in the snow.", options: [{ letter: "A", text: "likeed", correct: false }, { letter: "B", text: "like", correct: true }, { letter: "C", text: "likes", correct: false }] } },
    { question: "What’s the weather like in spring?", answer: "It’s usually warm and rainy.", multipleChoice: { prompt: "___ usually warm and rainy.", options: [{ letter: "A", text: "it’s", correct: true }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’", correct: false }] } },
    { question: "Is it stormy outside?", answer: "Yes, there is thunder and lightning.", multipleChoice: { prompt: "Yes, there ___ thunder and lightning.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "What do you wear when it rains?", answer: "I wear a raincoat and use an umbrella.", multipleChoice: { prompt: "___ wear a raincoat and use an umbrella.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do you check the weather forecast?", answer: "Yes, every morning.", multipleChoice: { prompt: "Yes, every ___.", options: [{ letter: "A", text: "evening", correct: false }, { letter: "B", text: "night", correct: false }, { letter: "C", text: "morning", correct: true }] } },
    { question: "What’s the weather like in your city?", answer: "It’s mostly sunny.", multipleChoice: { prompt: "___ mostly sunny.", options: [{ letter: "A", text: "it’", correct: false }, { letter: "B", text: "it’s", correct: true }, { letter: "C", text: "it’ing", correct: false }] } },
    { question: "Is it going to rain tomorrow?", answer: "Yes, it will rain in the afternoon.", multipleChoice: { prompt: "Yes, it ___ rain in the afternoon.", options: [{ letter: "A", text: "would", correct: false }, { letter: "B", text: "will", correct: true }, { letter: "C", text: "will be", correct: false }] } },
    { question: "Do you like hot weather?", answer: "No, I prefer cool weather.", multipleChoice: { prompt: "No, ___ cool weather.", options: [{ letter: "A", text: "I prefer", correct: true }, { letter: "B", text: "I like", correct: false }, { letter: "C", text: "I choose", correct: false }] } },
    { question: "What season is the coldest?", answer: "Winter is the coldest season.", multipleChoice: { prompt: "Winter ___ the coldest season.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "What season do you like most?", answer: "I like spring.", multipleChoice: { prompt: "I ___ spring.", options: [{ letter: "A", text: "like", correct: true }, { letter: "B", text: "likes", correct: false }, { letter: "C", text: "likeed", correct: false }] } },
    { question: "Is it usually hot in July?", answer: "Yes, it’s very hot in July.", multipleChoice: { prompt: "Yes, it’s very ___ in July.", options: [{ letter: "A", text: "cold", correct: false }, { letter: "B", text: "foggy", correct: false }, { letter: "C", text: "hot", correct: true }] } },
    { question: "What’s the weather like in autumn?", answer: "It’s cool and windy.", multipleChoice: { prompt: "___ cool and windy.", options: [{ letter: "A", text: "it’", correct: false }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’s", correct: true }] } },
    { question: "Do you wear boots in winter?", answer: "Yes, I wear boots when it snows.", multipleChoice: { prompt: "Yes, ___ wear boots when it snows.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "What do you do when it’s hot?", answer: "I go to the beach or drink cold water.", multipleChoice: { prompt: "I ___ to the beach or drink cold water.", options: [{ letter: "A", text: "goed", correct: false }, { letter: "B", text: "goes", correct: false }, { letter: "C", text: "go", correct: true }] } },
    { question: "Is it snowing now?", answer: "No, it’s not snowing.", multipleChoice: { prompt: "No, ___ not snowing.", options: [{ letter: "A", text: "it’ing", correct: false }, { letter: "B", text: "it’", correct: false }, { letter: "C", text: "it’s", correct: true }] } },
    { question: "What’s your favorite season?", answer: "My favorite season is summer.", multipleChoice: { prompt: "My favorite season ___ summer.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Do you like cloudy days?", answer: "Yes, they are calm and quiet.", multipleChoice: { prompt: "Yes, they ___ calm and quiet.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: false }, { letter: "C", text: "are", correct: true }] } },
    { question: "What’s the temperature today?", answer: "It’s about 25 degrees.", multipleChoice: { prompt: "It’s about 25 ___.", options: [{ letter: "A", text: "degrees", correct: true }, { letter: "B", text: "meters", correct: false }, { letter: "C", text: "liters", correct: false }] } },
    { question: "Do you like the wind?", answer: "No, it makes me cold.", multipleChoice: { prompt: "No, it ___ me cold.", options: [{ letter: "A", text: "make", correct: false }, { letter: "B", text: "does", correct: false }, { letter: "C", text: "makes", correct: true }] } },
    { question: "Is it raining now?", answer: "Yes, it’s raining a lot.", multipleChoice: { prompt: "Yes, ___ raining a lot.", options: [{ letter: "A", text: "it’s", correct: true }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’", correct: false }] } },
    { question: "Do you wear sunglasses?", answer: "Yes, when it’s sunny.", multipleChoice: { prompt: "Yes, when it’s ___.", options: [{ letter: "A", text: "sunny", correct: true }, { letter: "B", text: "rainy", correct: false }, { letter: "C", text: "snowy", correct: false }] } },
    { question: "Is it warm today?", answer: "Yes, it’s warm and nice.", multipleChoice: { prompt: "Yes, ___ warm and nice.", options: [{ letter: "A", text: "it’s", correct: true }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’", correct: false }] } },
    { question: "Do you stay inside during storms?", answer: "Yes, I stay safe inside.", multipleChoice: { prompt: "Yes, ___ stay safe inside.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "What’s the hottest month in your country?", answer: "August is the hottest.", multipleChoice: { prompt: "August ___ the hottest.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "What’s the coldest month?", answer: "January is the coldest.", multipleChoice: { prompt: "January ___ the coldest.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Do you like walking in the rain?", answer: "Sometimes, with an umbrella.", multipleChoice: { prompt: "Sometimes, ___ an umbrella.", options: [{ letter: "A", text: "with", correct: true }, { letter: "B", text: "by", correct: false }, { letter: "C", text: "for", correct: false }] } },
    { question: "Is the weather important to you?", answer: "Yes, it affects my plans.", multipleChoice: { prompt: "Yes, ___ affects my plans.", options: [{ letter: "A", text: "it", correct: true }, { letter: "B", text: "she", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "What weather do you hate?", answer: "I hate stormy weather.", multipleChoice: { prompt: "___ hate stormy weather.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "What do you do on hot summer days?", answer: "I stay in the shade.", multipleChoice: { prompt: "I stay in the ___.", options: [{ letter: "A", text: "rain", correct: false }, { letter: "B", text: "sun", correct: false }, { letter: "C", text: "shade", correct: true }] } },
    { question: "Do you check the weather before traveling?", answer: "Yes, always.", multipleChoice: { prompt: "Yes, ___.", options: [{ letter: "A", text: "alway", correct: false }, { letter: "B", text: "always", correct: true }, { letter: "C", text: "alwaying", correct: false }] } },
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

  table: {
    title: "📋 Clothes Vocabulary (Kıyafetler, Giysiler)",
    data: [
      { category: "What are Clothes?", explanation: "Items we wear on our body for protection, warmth, and style", turkish: "Giysiler, kıyafetler - vücudumuza giydiğimiz şeyler", function: "Talk about what you're wearing, describe outfits, discuss fashion", key_questions: "What are you wearing? / What do you wear...? / Do you like...?", note: "Essential for shopping, daily life, and describing people!" },

      { category: "Basic Top Clothing", shirt: "shirt (gömlek) - formal top with collar and buttons", t_shirt: "T-shirt (tişört) - casual top, short sleeves", blouse: "blouse (bluz) - women's shirt", sweater: "sweater (kazak, süveter) - warm knitted top", jacket: "jacket (ceket) - light outer clothing", coat: "coat (mont, palto) - heavy outer clothing for winter", note: "Upper body clothing" },

      { category: "Bottom Clothing", pants_trousers: "pants / trousers (pantolon) - long leg covering", jeans: "jeans (kot pantolon) - blue denim pants", shorts: "shorts (şort) - short pants (above knee)", skirt: "skirt (etek) - women's bottom clothing (not pants)", leggings: "leggings (tayt) - tight stretchy pants", note: "Lower body clothing" },

      { category: "Dresses & Full Outfits", dress: "dress (elbise) - one-piece women's clothing (top + bottom together)", suit: "suit (takım elbise) - formal matching jacket and pants/skirt", uniform: "uniform (üniforma) - special clothes for work or school", pajamas: "pajamas / pyjamas (pijama) - clothes for sleeping", note: "Complete outfits" },

      { category: "Footwear (Ayakkabılar)", shoes: "shoes (ayakkabı) - general foot covering", boots: "boots (bot, çizme) - tall shoes (cover ankles)", sandals: "sandals (sandalet) - open shoes for warm weather", sneakers: "sneakers (spor ayakkabı) - athletic shoes", high_heels: "high heels (topuklu ayakkabı) - women's formal shoes", slippers: "slippers (terlik) - comfortable shoes for home", note: "Things you wear on feet" },

      { category: "Accessories - Head & Hands", hat: "hat (şapka) - cover for head", cap: "cap (şapka, kasket) - baseball cap style", scarf: "scarf (atkı, eşarp) - wrap around neck or head", gloves: "gloves (eldiven) - cover for hands (fingers separate)", mittens: "mittens (eldivenler) - cover for hands (fingers together)", note: "Extras to keep warm or look good" },

      { category: "More Accessories", belt: "belt (kemer) - worn around waist to hold pants", tie: "tie (kravat) - formal cloth around neck", socks: "socks (çorap) - foot covering under shoes", sunglasses: "sunglasses (güneş gözlüğü) - protect eyes from sun", watch: "watch (saat) - tell time on wrist", jewelry: "jewelry (takı, mücevher) - rings, necklaces, earrings, bracelets", note: "Complete the outfit!" },

      { category: "WEAR vs PUT ON vs TAKE OFF", wear: "wear (giymek - üzerinde olmak) - have clothes ON your body", example_wear: "I wear jeans every day. / She's wearing a dress.", put_on: "put on (giymek - eylem) - the ACTION of dressing", example_put_on: "Put on your coat! It's cold. (Montunu giy!)", take_off: "take off (çıkarmak) - remove clothes", example_take_off: "Take off your shoes inside. (Ayakkabılarını çıkar.)", note: "WEAR = state | PUT ON = action (dressing) | TAKE OFF = action (undressing)" },

      { category: "What Are You Wearing? (Present Continuous)", structure: "What are you wearing? (Şu anda ne giyiyorsun?)", use: "Asking about clothes RIGHT NOW", examples: "I'm wearing jeans and a T-shirt. / She's wearing a blue dress. / They're wearing uniforms.", pattern: "Subject + am/is/are + wearing + clothes", note: "Use Present Continuous for current clothing!" },

      { category: "What Do You Wear? (Present Simple)", structure: "What do you wear...? (Genelde ne giyersin?)", use: "Asking about HABITS, general situations", examples: "What do you wear to school? / What do you wear in winter? / What do you wear to bed?", pattern: "What do/does + subject + wear + (situation)?", note: "Use Present Simple for habits and routines!" },

      { category: "Describing Others' Clothes", structure: "He/She is wearing + clothing", examples: "He's wearing a black suit. / She's wearing a red dress. / They're wearing jeans.", describing_people: "The man in the blue shirt... / The woman wearing sunglasses...", note: "Use to identify or describe people" },

      { category: "Colors with Clothes", pattern: "a/an + COLOR + clothing item", examples: "a white shirt, a black jacket, blue jeans, red shoes", note: "Color comes BEFORE the clothing item", order: "ALWAYS: article + color + noun (a red dress, NOT a dress red)", turkish: "mavi bir gömlek (order is same in Turkish)", remember: "Color adjective goes before the noun!" },

      { category: "Do You Have...? / Do You Like...?", do_you_have: "Do you have a black jacket? → Yes, I do. / No, I don't.", do_you_like: "Do you like wearing dresses? → Yes, I do. / No, I don't.", do_you_prefer: "Do you prefer skirts or pants? → I prefer pants.", note: "Questions about ownership and preferences" },

      { category: "Shopping for Clothes", can_i_try: "Can I try this on? (Bunu deneyebilir miyim?)", what_size: "What size are you? (Beden kaç? / What size do you wear?)", does_it_fit: "Does it fit? → Yes, it fits. / No, it's too small/big.", how_much: "How much is this shirt? → It's 50 dollars.", too_expensive: "It's too expensive. (Çok pahalı.)", ill_take_it: "I'll take it. (Bunu alacağım.)", note: "Essential shopping phrases!" },

      { category: "Formal vs Casual Clothes", formal: "formal clothes (resmi giysiler) - suit, tie, dress shoes, dress", casual: "casual clothes (gündelik giysiler) - jeans, T-shirt, sneakers", examples: "I wear formal clothes to work. / I wear casual clothes on weekends.", note: "Know when to dress formally or casually!" },

      { category: "Weather & Clothes", hot_weather: "Hot weather: shorts, T-shirt, sandals, light colors", cold_weather: "Cold weather: coat, sweater, boots, gloves, scarf, hat", rainy_weather: "Rainy weather: raincoat, boots, umbrella", note: "Choose clothes based on weather!" },

      { category: "Special Occasions", wedding: "Wedding: suit, dress, formal shoes", gym_sports: "Gym/Sports: sneakers, T-shirt, shorts, athletic wear", beach: "Beach: swimsuit, sandals, sunglasses, hat", job_interview: "Job interview: suit, dress, formal clothes", party: "Party: nice dress, stylish clothes", note: "Different events need different clothes!" },

      { category: "Common Mistakes", mistake_1: "Saying 'I wear jeans now' for current clothing", wrong_1: "I wear jeans now ✗ (sounds like a habit)", correct_1: "I'm wearing jeans now ✓ (Present Continuous for NOW)", rule: "Present Continuous for CURRENT clothes | Present Simple for HABITS", remember: "What are you wearing NOW? | What do you wear (in general)?" },
      { category: "Common Mistakes", mistake_2: "Wrong word order with colors", wrong_2: "a dress red ✗ / jeans blue ✗", correct_2: "a red dress ✓ / blue jeans ✓", rule: "Color comes BEFORE the noun", pattern: "a/an + COLOR + clothing", remember: "Color adjective before noun!" },
      { category: "Common Mistakes", mistake_3: "Saying 'wear' instead of 'put on'", wrong_3: "Wear your coat! ✗ (sounds awkward)", correct_3: "Put on your coat! ✓ (action of dressing)", rule: "WEAR = have on body | PUT ON = action of putting clothes on", remember: "Put on (action) vs Wear (state)" },

      { category: "Singular vs Plural", always_plural: "jeans, pants, shorts, glasses, sunglasses, gloves, socks, shoes (ALWAYS plural!)", examples: "I'm wearing jeans. / My pants are blue. / Where are my socks?", note: "These are ALWAYS plural, even if it's one item!", verb: "Use plural verb: My jeans ARE new (NOT is new)", remember: "Jeans are..., Pants are..., Shoes are..." },

      { category: "Real-World Uses", daily: "I'm wearing jeans and a T-shirt today. / She always wears black.", shopping: "I need to buy new shoes. / Do you have this in a medium size?", describing: "The man wearing a blue suit is my boss. / She's the one in the red dress.", compliments: "I like your shirt! / Those shoes look great!", weather: "It's cold - put on your jacket! / Don't forget your umbrella.", general: "Essential for daily conversation, shopping, and describing people!" },

      { category: "Key Takeaway", summary: "Clothes vocabulary describes what people wear", top_clothing: "shirt, T-shirt, sweater, jacket, coat, blouse", bottom_clothing: "pants, jeans, shorts, skirt", footwear: "shoes, boots, sandals, sneakers", accessories: "hat, scarf, gloves, belt, tie, socks, sunglasses", current_clothes: "What are you wearing? → I'm wearing... (Present Continuous)", habits: "What do you wear...? → I wear... (Present Simple)", wear_put_take: "WEAR (state) | PUT ON (dress) | TAKE OFF (undress)", colors: "a red dress, blue jeans (color before noun)", plural: "jeans, pants, shorts, shoes, socks (always plural!)", remember: "Present Continuous for NOW! Present Simple for habits! Color before noun! Know singular vs plural!", next: "Describe your outfit and practice shopping phrases!" }
    ]
  },
  
  speakingPractice: [
    { question: "What are you wearing today?", answer: "I’m wearing jeans and a white T-shirt.", multipleChoice: { prompt: "I’m ___ jeans and a white T-shirt.", options: [{ letter: "A", text: "wearing", correct: true }, { letter: "B", text: "wears", correct: false }, { letter: "C", text: "wore", correct: false }] } },
    { question: "Do you wear a jacket in winter?", answer: "Yes, I always wear a jacket.", multipleChoice: { prompt: "Yes, ___ always wear a jacket.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "What do you wear when it’s hot?", answer: "I wear shorts and a T-shirt.", multipleChoice: { prompt: "___ wear shorts and a T-shirt.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Do you like wearing hats?", answer: "Yes, I wear hats in summer.", multipleChoice: { prompt: "Yes, I ___ hats in summer.", options: [{ letter: "A", text: "wear", correct: true }, { letter: "B", text: "wears", correct: false }, { letter: "C", text: "wearing", correct: false }] } },
    { question: "What color are your shoes?", answer: "My shoes are black.", multipleChoice: { prompt: "My shoes ___ black.", options: [{ letter: "A", text: "are", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: false }] } },
    { question: "Do you wear glasses?", answer: "No, I don’t.", multipleChoice: { prompt: "No, ___ don’t.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "What do you wear to school?", answer: "I wear a school uniform.", multipleChoice: { prompt: "I wear a ___ uniform.", options: [{ letter: "A", text: "school", correct: true }, { letter: "B", text: "office", correct: false }, { letter: "C", text: "home", correct: false }] } },
    { question: "Do you wear socks at home?", answer: "Yes, I always wear socks.", multipleChoice: { prompt: "Yes, ___ always wear socks.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "What do you wear to a wedding?", answer: "I wear a suit and tie.", multipleChoice: { prompt: "___ wear a suit and tie.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "What do you wear in winter?", answer: "I wear a coat, gloves, and a scarf.", multipleChoice: { prompt: "___ wear a coat, gloves, and a scarf.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "Do you wear sandals in summer?", answer: "Yes, they are comfortable.", multipleChoice: { prompt: "Yes, they ___ comfortable.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "What is your favorite piece of clothing?", answer: "I love my leather jacket.", multipleChoice: { prompt: "___ love my leather jacket.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Do you like wearing dresses?", answer: "Yes, especially in spring.", multipleChoice: { prompt: "Yes, especially in ___.", options: [{ letter: "A", text: "spring", correct: true }, { letter: "B", text: "winter", correct: false }, { letter: "C", text: "autumn", correct: false }] } },
    { question: "What do you wear to bed?", answer: "I wear pajamas.", multipleChoice: { prompt: "___ wear pajamas.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do you wear boots when it rains?", answer: "Yes, I wear rain boots.", multipleChoice: { prompt: "Yes, ___ wear rain boots.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "he", correct: false }] } },
    { question: "What do you wear when you go running?", answer: "I wear sports clothes.", multipleChoice: { prompt: "___ wear sports clothes.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do you wear a tie at work?", answer: "No, I don’t have to.", multipleChoice: { prompt: "No, I don’t ___ to.", options: [{ letter: "A", text: "has", correct: false }, { letter: "B", text: "have", correct: true }, { letter: "C", text: "had", correct: false }] } },
    { question: "Do you like colorful clothes?", answer: "Yes, I love bright colors.", multipleChoice: { prompt: "Yes, ___ love bright colors.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "What do you wear at the beach?", answer: "I wear a swimsuit and flip-flops.", multipleChoice: { prompt: "___ wear a swimsuit and flip-flops.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do you wear gloves in cold weather?", answer: "Yes, to keep my hands warm.", multipleChoice: { prompt: "Yes, to keep my hands ___.", options: [{ letter: "A", text: "wet", correct: false }, { letter: "B", text: "warm", correct: true }, { letter: "C", text: "cold", correct: false }] } },
    { question: "What color is your jacket?", answer: "It’s dark blue.", multipleChoice: { prompt: "___ dark blue.", options: [{ letter: "A", text: "it’", correct: false }, { letter: "B", text: "it’ing", correct: false }, { letter: "C", text: "it’s", correct: true }] } },
    { question: "Do you wear a watch?", answer: "Yes, I wear it every day.", multipleChoice: { prompt: "Yes, ___ wear it every day.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Do you wear a uniform?", answer: "Yes, at my job.", openResponse: true },
    { question: "What do you wear at home?", answer: "I wear comfortable clothes.", multipleChoice: { prompt: "___ wear comfortable clothes.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Do you wear long sleeves in winter?", answer: "Yes, always.", multipleChoice: { prompt: "Yes, ___.", options: [{ letter: "A", text: "alwaying", correct: false }, { letter: "B", text: "alway", correct: false }, { letter: "C", text: "always", correct: true }] } },
    { question: "What kind of shoes do you like?", answer: "I like sneakers.", multipleChoice: { prompt: "I ___ sneakers.", options: [{ letter: "A", text: "likeed", correct: false }, { letter: "B", text: "likes", correct: false }, { letter: "C", text: "like", correct: true }] } },
    { question: "Do you wear skirts?", answer: "Sometimes, when the weather is warm.", multipleChoice: { prompt: "Sometimes, when the weather ___ warm.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "am", correct: false }] } },
    { question: "What do you wear when it’s cold?", answer: "I wear warm clothes.", multipleChoice: { prompt: "___ wear warm clothes.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Do you wear the same clothes every day?", answer: "No, I change my clothes daily.", multipleChoice: { prompt: "No, ___ change my clothes daily.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "What do you wear to a party?", answer: "I wear a nice shirt and trousers.", multipleChoice: { prompt: "___ wear a nice shirt and trousers.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Do you wear earrings or jewelry?", answer: "Yes, I wear earrings.", multipleChoice: { prompt: "Yes, ___ wear earrings.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "What do you wear when it rains?", answer: "I wear a raincoat.", multipleChoice: { prompt: "___ wear a raincoat.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "What color are your socks?", answer: "They are gray.", multipleChoice: { prompt: "They ___ gray.", options: [{ letter: "A", text: "is", correct: false }, { letter: "B", text: "are", correct: true }, { letter: "C", text: "am", correct: false }] } },
    { question: "Do you wear new clothes often?", answer: "Only on special days.", multipleChoice: { prompt: "Only on ___ days.", options: [{ letter: "A", text: "special", correct: true }, { letter: "B", text: "normal", correct: false }, { letter: "C", text: "empty", correct: false }] } },
    { question: "Do you like wearing sweaters?", answer: "Yes, especially in autumn.", multipleChoice: { prompt: "Yes, especially in ___.", options: [{ letter: "A", text: "spring", correct: false }, { letter: "B", text: "autumn", correct: true }, { letter: "C", text: "summer", correct: false }] } },
    { question: "Do you wear a belt?", answer: "Yes, with my jeans.", multipleChoice: { prompt: "Yes, ___ my jeans.", options: [{ letter: "A", text: "with", correct: true }, { letter: "B", text: "by", correct: false }, { letter: "C", text: "for", correct: false }] } },
    { question: "What do you wear in the morning?", answer: "I wear my school clothes.", multipleChoice: { prompt: "I wear my ___ clothes.", options: [{ letter: "A", text: "school", correct: true }, { letter: "B", text: "office", correct: false }, { letter: "C", text: "home", correct: false }] } },
    { question: "Do you wear warm clothes in spring?", answer: "No, spring is warmer.", multipleChoice: { prompt: "No, spring ___ warmer.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "is", correct: true }, { letter: "C", text: "are", correct: false }] } },
    { question: "Do you wear your favorite T-shirt often?", answer: "Yes, all the time.", openResponse: true },
    { question: "What do you wear when you sleep?", answer: "I wear pajamas or a nightgown.", multipleChoice: { prompt: "___ wear pajamas or a nightgown.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "he", correct: false }] } },
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

  table: {
    title: "📋 Hobbies and Free Time Vocabulary (Hobiler ve Boş Zaman)",
    data: [
      { category: "What are Hobbies?", explanation: "Activities you do in your free time for fun and enjoyment", turkish: "Hobiler, boş zaman aktiviteleri - zevk için yaptığınız şeyler", function: "Talk about interests, free time, what you do for fun", key_questions: "What do you do in your free time? / Do you have any hobbies? / What's your favorite hobby?", note: "Great conversation topic for making friends!" },

      { category: "Creative Hobbies", reading: "reading (okuma) - books, magazines, articles", writing: "writing (yazma) - stories, diary, blog", drawing: "drawing (çizim) - with pencil, pen, on paper", painting: "painting (resim yapma) - with brush and colors", photography: "photography (fotoğrafçılık) - taking photos", crafts: "crafts / doing crafts (el sanatları) - making things by hand", note: "Artistic and creative activities" },

      { category: "Physical Hobbies & Sports", playing_sports: "playing sports (spor yapmak) - football, basketball, tennis, etc.", swimming: "swimming (yüzme) - in pool or sea", running_jogging: "running / jogging (koşma) - for exercise", cycling: "cycling (bisiklet sürme) - riding a bike", hiking: "hiking (doğa yürüyüşü) - walking in nature", dancing: "dancing (dans etme) - moving to music", note: "Active physical activities" },

      { category: "Musical Hobbies", playing_instrument: "playing an instrument (enstrüman çalmak) - guitar, piano, violin, etc.", playing_guitar: "playing the guitar (gitar çalmak) - THE + instrument", singing: "singing (şarkı söyleme) - using your voice", listening_to_music: "listening to music (müzik dinleme) - passive enjoyment", note: "Music-related activities", remember: "Play THE guitar, THE piano (use THE with instruments!)" },

      { category: "Home & Indoor Activities", watching_TV: "watching TV (TV izleme) - series, movies, shows", watching_movies: "watching movies (film izleme) - at home or cinema", playing_video_games: "playing video games (video oyunu oynama) - on computer or console", cooking: "cooking (yemek yapma) - preparing food", baking: "baking (fırında pişirme) - bread, cakes, cookies", gardening: "gardening (bahçecilik) - growing plants and flowers", note: "Things you do at home" },

      { category: "Social Activities", meeting_friends: "meeting friends (arkadaşlarla buluşma) - spending time together", going_out: "going out (dışarı çıkma) - to cafés, restaurants, movies", shopping: "shopping (alışveriş yapma) - buying things", traveling: "traveling (seyahat etme) - visiting new places", hanging_out: "hanging out (takılmak) - informal time with friends", chatting: "chatting (sohbet etme) - talking with friends online or in person", note: "Activities with other people" },

      { category: "Collecting & Learning", collecting: "collecting (koleksiyon yapma) - stamps, coins, cards, etc.", learning_languages: "learning languages (dil öğrenme) - studying new languages", studying: "studying (ders çalışma) - learning new things", puzzles: "doing puzzles (bulmaca çözme) - jigsaw puzzles, crosswords", board_games: "playing board games (masa oyunu oynama) - chess, Monopoly, etc.", note: "Mental and educational activities" },

      { category: "Nature & Outdoor Activities", fishing: "fishing (balık tutma) - catching fish", camping: "camping (kamp yapma) - sleeping outdoors in a tent", walking: "walking / going for a walk (yürüyüş yapma) - strolling", picnicking: "having a picnic (piknik yapma) - eating outdoors", bird_watching: "bird watching (kuş gözlemi) - observing birds", note: "Outdoor leisure activities" },

      { category: "LIKE + VERB-ING", structure: "I like + verb-ing", examples: "I like reading. / I like swimming. / I like playing football.", use: "Express general preference or enjoyment", turkish: "Bir şeyi yapmayı sevmek", note: "Very common pattern for hobbies!", remember: "Add -ING to the verb!" },

      { category: "ENJOY + VERB-ING", structure: "I enjoy + verb-ing", examples: "I enjoy cooking. / I enjoy listening to music. / I enjoy traveling.", use: "Express enjoyment (similar to 'like' but slightly stronger)", note: "More formal than 'like'", same_meaning: "I like reading = I enjoy reading (almost the same)", remember: "Enjoy + verb-ING (not enjoy to read!)" },

      { category: "LOVE + VERB-ING / HATE + VERB-ING", love: "I LOVE + verb-ing (really like, enthusiastic)", examples_love: "I love dancing! / I love playing video games!", hate: "I HATE + verb-ing (really dislike)", examples_hate: "I hate running. / I hate doing homework.", note: "Express strong feelings", scale: "hate < don't like < like < love" },

      { category: "Questions About Hobbies", what_do_you_do: "What do you do in your free time? → I read books.", do_you_have: "Do you have any hobbies? → Yes, I enjoy painting.", whats_your_favorite: "What's your favorite hobby? → My favorite hobby is playing the guitar.", do_you_like: "Do you like cooking? → Yes, I do. / No, I don't.", how_often: "How often do you play football? → I play twice a week.", note: "Essential questions for learning about people!" },

      { category: "Frequency with Hobbies", every_day: "I read every day. (her gün)", twice_a_week: "I play tennis twice a week. (haftada iki kez)", on_weekends: "I go hiking on weekends. (hafta sonları)", in_my_free_time: "I play video games in my free time. (boş zamanımda)", when_i_have_time: "I cook when I have time. (vaktim olduğunda)", note: "Talk about how often you do hobbies" },

      { category: "GO + VERB-ING for Activities", structure: "GO + verb-ing", examples: "go swimming, go shopping, go fishing, go hiking, go dancing, go running", use: "For activities you 'go' somewhere to do", note: "Common pattern for sports and outdoor activities!", remember: "Go swimming (NOT go to swim!)" },

      { category: "PLAY vs DO vs GO", play: "PLAY + sports with balls or games: play football, play chess, play the guitar", do: "DO + activities without equipment: do yoga, do homework, do exercise", go: "GO + -ing activities: go swimming, go shopping, go running", note: "Different verbs for different activity types!", remember: "Play sports | Do activities | Go + -ing" },

      { category: "Talking About Skills", good_at: "I'm good at drawing. (İyi yapıyorum)", bad_at: "I'm bad at singing. (Kötü yapıyorum)", can: "I can play the piano. (Beceriyorum)", cant: "I can't swim. (Yapamıyorum)", learning: "I'm learning to play the guitar. (Öğreniyorum)", note: "Describe your ability level" },

      { category: "Invitations & Suggestions", do_you_want_to: "Do you want to go to the movies? (Film izlemeye gitmek ister misin?)", would_you_like_to: "Would you like to play tennis? (Tenis oynamak ister misin?)", lets: "Let's go shopping! (Hadi alışverişe gidelim!)", how_about: "How about going for a walk? (Yürüyüşe çıkmaya ne dersin?)", note: "Invite friends to do activities together!" },

      { category: "Why Do You Like It?", its_fun: "It's fun! (Eğlenceli!)", its_relaxing: "It's relaxing. (Rahatlatıcı)", its_exciting: "It's exciting. (Heyecan verici)", its_interesting: "It's interesting. (İlginç)", it_keeps_me_fit: "It keeps me fit. (Formda tutuyor)", i_meet_new_people: "I meet new people. (Yeni insanlarla tanışıyorum)", note: "Explain why you enjoy your hobbies" },

      { category: "I Want to Learn...", structure: "I want to learn + to verb OR I want to learn + how to verb", examples: "I want to learn to play the piano. / I want to learn how to cook. / I want to learn photography.", note: "Talk about future hobbies or skills", dream_hobby: "I'd love to learn surfing one day! (Bir gün sörf öğrenmeyi çok isterim!)" },

      { category: "Common Mistakes", mistake_1: "Forgetting -ING after like/enjoy", wrong_1: "I like read ✗ / I enjoy cook ✗", correct_1: "I like reading ✓ / I enjoy cooking ✓", rule: "Like/Enjoy + verb-ING", remember: "Always add -ING!" },
      { category: "Common Mistakes", mistake_2: "Forgetting THE with instruments", wrong_2: "I play guitar ✗ / She plays piano ✗", correct_2: "I play THE guitar ✓ / She plays THE piano ✓", rule: "Play THE + instrument", remember: "THE is required with musical instruments!" },
      { category: "Common Mistakes", mistake_3: "Using wrong verb: play/do/go", wrong_3: "I do football ✗ / I play yoga ✗ / I go to swim ✗", correct_3: "I play football ✓ / I do yoga ✓ / I go swimming ✓", rule: "PLAY sports | DO activities | GO + -ing", remember: "Learn which verb goes with each activity!" },

      { category: "Real-World Uses", making_friends: "What do you do in your free time? → I like playing basketball. Me too! Let's play together!", online_profiles: "Hobbies: reading, traveling, photography", dating_apps: "I love hiking and trying new restaurants!", job_interviews: "What do you do in your free time? → I enjoy learning new languages and playing chess.", general: "Essential for conversations and getting to know people!" },

      { category: "Key Takeaway", summary: "Hobbies vocabulary helps you talk about interests and free time", question: "What do you do in your free time? / Do you have any hobbies?", like_enjoy: "I like/enjoy + verb-ING (reading, swimming, cooking)", love_hate: "I love/hate + verb-ING (strong feelings)", creative: "reading, writing, drawing, painting, photography", physical: "playing sports, swimming, running, cycling, dancing", musical: "playing THE guitar/piano, singing, listening to music", home: "watching TV, cooking, playing video games, gardening", outdoor: "hiking, fishing, camping, going for a walk", verbs: "PLAY sports/games | DO activities | GO + -ing", frequency: "every day, twice a week, on weekends, in my free time", skills: "I'm good at... / I can... / I'm learning...", remember: "Like/Enjoy + verb-ING! Play THE instrument! Learn play/do/go patterns!", next: "Talk about your hobbies and ask others about theirs!" }
    ]
  },
  
  speakingPractice: [
    { question: "What do you do in your free time?", answer: "I read books or listen to music.", multipleChoice: { prompt: "I ___ books or listen to music.", options: [{ letter: "A", text: "read", correct: true }, { letter: "B", text: "reads", correct: false }, { letter: "C", text: "reading", correct: false }] } },
    { question: "Do you have any hobbies?", answer: "Yes, I enjoy painting.", multipleChoice: { prompt: "Yes, I enjoy ___.", options: [{ letter: "A", text: "reading", correct: false }, { letter: "B", text: "painting", correct: true }, { letter: "C", text: "singing", correct: false }] } },
    { question: "What’s your favorite hobby?", answer: "My favorite hobby is gardening.", multipleChoice: { prompt: "My favorite hobby ___ gardening.", options: [{ letter: "A", text: "am", correct: false }, { letter: "B", text: "are", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Do you like playing sports?", answer: "Yes, I love football.", multipleChoice: { prompt: "Yes, ___ love football.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Do you listen to music every day?", answer: "Yes, I listen to music every day.", multipleChoice: { prompt: "Yes, I ___ to music every day.", options: [{ letter: "A", text: "listening", correct: false }, { letter: "B", text: "listen", correct: true }, { letter: "C", text: "listens", correct: false }] } },
    { question: "What kind of music do you like?", answer: "I like pop music.", multipleChoice: { prompt: "I ___ pop music.", options: [{ letter: "A", text: "like", correct: true }, { letter: "B", text: "likeed", correct: false }, { letter: "C", text: "likes", correct: false }] } },
    { question: "Do you play any instruments?", answer: "Yes, I play the guitar.", multipleChoice: { prompt: "Yes, I ___ the guitar.", options: [{ letter: "A", text: "play", correct: true }, { letter: "B", text: "played", correct: false }, { letter: "C", text: "plays", correct: false }] } },
    { question: "Do you like watching movies?", answer: "Yes, especially comedies.", multipleChoice: { prompt: "Yes, especially ___.", options: [{ letter: "A", text: "cartoons", correct: false }, { letter: "B", text: "comedies", correct: true }, { letter: "C", text: "dramas", correct: false }] } },
    { question: "What’s your favorite movie?", answer: "My favorite movie is a science fiction one.", multipleChoice: { prompt: "My favorite movie ___ a science fiction one.", options: [{ letter: "A", text: "are", correct: false }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "is", correct: true }] } },
    { question: "Do you go for walks?", answer: "Yes, I walk every evening.", multipleChoice: { prompt: "Yes, ___ walk every evening.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "Do you like dancing?", answer: "Yes, I love dancing.", multipleChoice: { prompt: "Yes, ___ love dancing.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "Do you enjoy cooking?", answer: "Yes, I like trying new recipes.", multipleChoice: { prompt: "Yes, I ___ trying new recipes.", options: [{ letter: "A", text: "like", correct: true }, { letter: "B", text: "likeed", correct: false }, { letter: "C", text: "likes", correct: false }] } },
    { question: "What do you do on the weekend?", answer: "I meet my friends and relax.", multipleChoice: { prompt: "___ meet my friends and relax.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do you go shopping in your free time?", answer: "Sometimes, I go shopping.", multipleChoice: { prompt: "Sometimes, I ___ shopping.", options: [{ letter: "A", text: "go", correct: true }, { letter: "B", text: "goes", correct: false }, { letter: "C", text: "goed", correct: false }] } },
    { question: "Do you play video games?", answer: "Yes, I play on my computer.", multipleChoice: { prompt: "Yes, I ___ on my computer.", options: [{ letter: "A", text: "plays", correct: false }, { letter: "B", text: "play", correct: true }, { letter: "C", text: "played", correct: false }] } },
    { question: "Do you like taking photos?", answer: "Yes, especially when I travel.", multipleChoice: { prompt: "Yes, especially when ___ travel.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do you do any sports?", answer: "Yes, I play basketball.", multipleChoice: { prompt: "Yes, I ___ basketball.", options: [{ letter: "A", text: "plays", correct: false }, { letter: "B", text: "play", correct: true }, { letter: "C", text: "played", correct: false }] } },
    { question: "Do you draw or paint?", answer: "Yes, I draw in my notebook.", multipleChoice: { prompt: "Yes, I ___ in my notebook.", options: [{ letter: "A", text: "draws", correct: false }, { letter: "B", text: "drawing", correct: false }, { letter: "C", text: "draw", correct: true }] } },
    { question: "What’s a relaxing hobby for you?", answer: "Listening to music is relaxing.", multipleChoice: { prompt: "Listening to music ___ relaxing.", options: [{ letter: "A", text: "is", correct: true }, { letter: "B", text: "am", correct: false }, { letter: "C", text: "are", correct: false }] } },
    { question: "Do you collect anything?", answer: "Yes, I collect stamps.", multipleChoice: { prompt: "Yes, ___ collect stamps.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "he", correct: false }] } },
    { question: "Do you read books?", answer: "Yes, I read every night.", multipleChoice: { prompt: "Yes, ___ read every night.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Do you write a diary?", answer: "No, but I used to.", multipleChoice: { prompt: "No, but ___ used to.", options: [{ letter: "A", text: "you", correct: false }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "Do you enjoy traveling?", answer: "Yes, I love visiting new places.", multipleChoice: { prompt: "Yes, I love visiting ___ places.", options: [{ letter: "A", text: "old", correct: false }, { letter: "B", text: "recent", correct: false }, { letter: "C", text: "new", correct: true }] } },
    { question: "Do you like fishing?", answer: "Yes, it's peaceful.", multipleChoice: { prompt: "Yes, ___ peaceful.", options: [{ letter: "A", text: "it'ing", correct: false }, { letter: "B", text: "it'", correct: false }, { letter: "C", text: "it's", correct: true }] } },
    { question: "Do you often go to the cinema?", answer: "Not often, but I like it.", multipleChoice: { prompt: "Not often, but I ___ it.", options: [{ letter: "A", text: "likeed", correct: false }, { letter: "B", text: "likes", correct: false }, { letter: "C", text: "like", correct: true }] } },
    { question: "Do you watch series on Netflix?", answer: "Yes, I love binge-watching.", multipleChoice: { prompt: "Yes, ___ love binge-watching.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "you", correct: false }, { letter: "C", text: "i", correct: true }] } },
    { question: "What do you do when you’re bored?", answer: "I watch YouTube videos.", multipleChoice: { prompt: "I ___ YouTube videos.", options: [{ letter: "A", text: "watches", correct: false }, { letter: "B", text: "watched", correct: false }, { letter: "C", text: "watch", correct: true }] } },
    { question: "Do you do puzzles or crosswords?", answer: "Yes, to keep my mind active.", multipleChoice: { prompt: "Yes, to keep my mind ___.", options: [{ letter: "A", text: "active", correct: true }, { letter: "B", text: "actor", correct: false }, { letter: "C", text: "acting", correct: false }] } },
    { question: "Do you do yoga?", answer: "Yes, twice a week.", multipleChoice: { prompt: "Yes, twice a ___.", options: [{ letter: "A", text: "weekly", correct: false }, { letter: "B", text: "week", correct: true }, { letter: "C", text: "weeks", correct: false }] } },
    { question: "Do you swim in your free time?", answer: "Yes, I go swimming on Sundays.", multipleChoice: { prompt: "Yes, I ___ swimming on Sundays.", options: [{ letter: "A", text: "go", correct: true }, { letter: "B", text: "goed", correct: false }, { letter: "C", text: "goes", correct: false }] } },
    { question: "Do you go to the gym?", answer: "Yes, I go three times a week.", multipleChoice: { prompt: "Yes, I ___ three times a week.", options: [{ letter: "A", text: "go", correct: true }, { letter: "B", text: "goed", correct: false }, { letter: "C", text: "goes", correct: false }] } },
    { question: "Do you knit or sew?", answer: "No, I don’t.", multipleChoice: { prompt: "No, ___ don’t.", options: [{ letter: "A", text: "i", correct: true }, { letter: "B", text: "he", correct: false }, { letter: "C", text: "you", correct: false }] } },
    { question: "Do you go cycling?", answer: "Yes, I ride my bike in the park.", multipleChoice: { prompt: "Yes, I ___ my bike in the park.", options: [{ letter: "A", text: "rides", correct: false }, { letter: "B", text: "riding", correct: false }, { letter: "C", text: "ride", correct: true }] } },
    { question: "What do you do at home for fun?", answer: "I play board games with my family.", multipleChoice: { prompt: "I ___ board games with my family.", options: [{ letter: "A", text: "played", correct: false }, { letter: "B", text: "play", correct: true }, { letter: "C", text: "plays", correct: false }] } },
    { question: "Do you use social media?", answer: "Yes, I check it every day.", multipleChoice: { prompt: "Yes, ___ check it every day.", options: [{ letter: "A", text: "he", correct: false }, { letter: "B", text: "i", correct: true }, { letter: "C", text: "you", correct: false }] } },
    { question: "Do you watch TV every night?", answer: "Yes, after dinner.", multipleChoice: { prompt: "Yes, after ___.", options: [{ letter: "A", text: "dinners", correct: false }, { letter: "B", text: "dining", correct: false }, { letter: "C", text: "dinner", correct: true }] } },
    { question: "Do you play chess?", answer: "Yes, I play with my brother.", multipleChoice: { prompt: "Yes, I ___ with my brother.", options: [{ letter: "A", text: "play", correct: true }, { letter: "B", text: "played", correct: false }, { letter: "C", text: "plays", correct: false }] } },
    { question: "What hobby would you like to try?", answer: "I’d like to learn photography.", multipleChoice: { prompt: "I’d like to learn ___.", options: [{ letter: "A", text: "swimming", correct: false }, { letter: "B", text: "photography", correct: true }, { letter: "C", text: "cooking", correct: false }] } },
    { question: "Do you play cards?", answer: "Yes, with my friends.", multipleChoice: { prompt: "Yes, ___ my friends.", options: [{ letter: "A", text: "for", correct: false }, { letter: "B", text: "with", correct: true }, { letter: "C", text: "by", correct: false }] } },
    { question: "What do you enjoy doing alone?", answer: "I enjoy reading and drawing.", multipleChoice: { prompt: "I enjoy ___ and drawing.", options: [{ letter: "A", text: "to read", correct: false }, { letter: "B", text: "reading", correct: true }, { letter: "C", text: "read", correct: false }] } },
  ]
};

// A2 Level Module Data



export {
  MODULE_1_DATA,
  MODULE_2_DATA,
  MODULE_3_DATA,
  MODULE_4_DATA,
  MODULE_5_DATA,
  MODULE_6_DATA,
  MODULE_7_DATA,
  MODULE_8_DATA,
  MODULE_9_DATA,
  MODULE_10_DATA,
  MODULE_11_DATA,
  MODULE_12_DATA,
  MODULE_13_DATA,
  MODULE_14_DATA,
  MODULE_15_DATA,
  MODULE_16_DATA,
  MODULE_17_DATA,
  MODULE_18_DATA,
  MODULE_19_DATA,
  MODULE_20_DATA,
  MODULE_21_DATA,
  MODULE_22_DATA,
  MODULE_23_DATA,
  MODULE_24_DATA,
  MODULE_25_DATA,
  MODULE_26_DATA,
  MODULE_27_DATA,
  MODULE_28_DATA,
  MODULE_29_DATA,
  MODULE_30_DATA,
  MODULE_31_DATA,
  MODULE_32_DATA,
  MODULE_33_DATA,
  MODULE_34_DATA,
  MODULE_35_DATA,
  MODULE_36_DATA,
  MODULE_37_DATA,
  MODULE_38_DATA,
  MODULE_39_DATA,
  MODULE_40_DATA,
  MODULE_41_DATA,
  MODULE_42_DATA,
  MODULE_43_DATA,
  MODULE_44_DATA,
  MODULE_45_DATA,
  MODULE_46_DATA,
  MODULE_47_DATA,
  MODULE_48_DATA,
  MODULE_49_DATA,
  MODULE_50_DATA
};
