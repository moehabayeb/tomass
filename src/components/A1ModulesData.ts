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
    { 
      question: "Do you always eat breakfast?", 
      answer: "Yes, I always eat breakfast at home.",
      multipleChoice: {
        prompt: "I ___ eat breakfast at home.",
        options: [
          { letter: "A", text: "always", correct: true },
          { letter: "B", text: "never", correct: false },
          { letter: "C", text: "usually", correct: false }
        ]
      }
    },
    { 
      question: "What do you usually do on Sundays?", 
      answer: "I usually visit my grandparents on Sundays.",
      multipleChoice: {
        prompt: "I ___ visit my grandparents on Sundays.",
        options: [
          { letter: "A", text: "never", correct: false },
          { letter: "B", text: "usually", correct: true },
          { letter: "C", text: "always", correct: false }
        ]
      }
    },
    { 
      question: "Does your friend sometimes call you at night?", 
      answer: "Yes, he sometimes calls me.",
      multipleChoice: {
        prompt: "He ___ calls me at night.",
        options: [
          { letter: "A", text: "never", correct: false },
          { letter: "B", text: "sometimes", correct: true },
          { letter: "C", text: "always", correct: false }
        ]
      }
    },
    { 
      question: "Do you never drink coffee?", 
      answer: "No, I never drink coffee.",
      multipleChoice: {
        prompt: "No, I ___ drink coffee.",
        options: [
          { letter: "A", text: "always", correct: false },
          { letter: "B", text: "sometimes", correct: false },
          { letter: "C", text: "never", correct: true }
        ]
      }
    },
    { 
      question: "Does she always smile?", 
      answer: "Yes, she always smiles.",
      multipleChoice: {
        prompt: "Yes, she ___ smiles.",
        options: [
          { letter: "A", text: "always", correct: true },
          { letter: "B", text: "never", correct: false },
          { letter: "C", text: "sometimes", correct: false }
        ]
      }
    },
    { 
      question: "What do you usually eat for lunch?", 
      answer: "I usually eat salad or soup.",
      multipleChoice: {
        prompt: "I ___ eat salad or soup for lunch.",
        options: [
          { letter: "A", text: "always", correct: false },
          { letter: "B", text: "usually", correct: true },
          { letter: "C", text: "never", correct: false }
        ]
      }
    },
    { 
      question: "Do you sometimes play football?", 
      answer: "Yes, I sometimes play football with my friends.",
      multipleChoice: {
        prompt: "I ___ play football with my friends.",
        options: [
          { letter: "A", text: "never", correct: false },
          { letter: "B", text: "always", correct: false },
          { letter: "C", text: "sometimes", correct: true }
        ]
      }
    },
    { 
      question: "Does your teacher never give homework?", 
      answer: "No, she never gives homework.",
      multipleChoice: {
        prompt: "She ___ gives homework.",
        options: [
          { letter: "A", text: "always", correct: false },
          { letter: "B", text: "never", correct: true },
          { letter: "C", text: "sometimes", correct: false }
        ]
      }
    },
    { 
      question: "Do they always go to school by bus?", 
      answer: "Yes, they always go by bus.",
      multipleChoice: {
        prompt: "They ___ go by bus.",
        options: [
          { letter: "A", text: "always", correct: true },
          { letter: "B", text: "never", correct: false },
          { letter: "C", text: "sometimes", correct: false }
        ]
      }
    },
    { 
      question: "Do you usually watch TV at night?", 
      answer: "I usually watch TV after dinner.",
      multipleChoice: {
        prompt: "I ___ watch TV after dinner.",
        options: [
          { letter: "A", text: "never", correct: false },
          { letter: "B", text: "usually", correct: true },
          { letter: "C", text: "always", correct: false }
        ]
      }
    },
    { 
      question: "Do you sometimes listen to music in the morning?", 
      answer: "Yes, I sometimes listen to music.",
      multipleChoice: {
        prompt: "I ___ listen to music in the morning.",
        options: [
          { letter: "A", text: "sometimes", correct: true },
          { letter: "B", text: "never", correct: false },
          { letter: "C", text: "always", correct: false }
        ]
      }
    },
    { 
      question: "Does your brother never play computer games?", 
      answer: "No, he never plays computer games.",
      multipleChoice: {
        prompt: "He ___ plays computer games.",
        options: [
          { letter: "A", text: "always", correct: false },
          { letter: "B", text: "never", correct: true },
          { letter: "C", text: "usually", correct: false }
        ]
      }
    },
    { 
      question: "What do you always carry in your bag?", 
      answer: "I always carry my phone and wallet.",
      multipleChoice: {
        prompt: "I ___ carry my phone and wallet.",
        options: [
          { letter: "A", text: "always", correct: true },
          { letter: "B", text: "sometimes", correct: false },
          { letter: "C", text: "never", correct: false }
        ]
      }
    },
    { 
      question: "Do you usually wake up early?", 
      answer: "Yes, I usually wake up at 6 am.",
      multipleChoice: {
        prompt: "I ___ wake up at 6 am.",
        options: [
          { letter: "A", text: "never", correct: false },
          { letter: "B", text: "usually", correct: true },
          { letter: "C", text: "always", correct: false }
        ]
      }
    },
    { 
      question: "Do you never eat chocolate?", 
      answer: "No, I never eat chocolate.",
      multipleChoice: {
        prompt: "I ___ eat chocolate.",
        options: [
          { letter: "A", text: "always", correct: false },
          { letter: "B", text: "never", correct: true },
          { letter: "C", text: "sometimes", correct: false }
        ]
      }
    },
    { 
      question: "Do your parents always drink tea?", 
      answer: "Yes, they always drink tea in the morning.",
      multipleChoice: {
        prompt: "They ___ drink tea in the morning.",
        options: [
          { letter: "A", text: "always", correct: true },
          { letter: "B", text: "never", correct: false },
          { letter: "C", text: "sometimes", correct: false }
        ]
      }
    },
    { 
      question: "Do you sometimes go to the park?", 
      answer: "Yes, I sometimes go to the park on weekends.",
      multipleChoice: {
        prompt: "I ___ go to the park on weekends.",
        options: [
          { letter: "A", text: "never", correct: false },
          { letter: "B", text: "sometimes", correct: true },
          { letter: "C", text: "always", correct: false }
        ]
      }
    },
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
    { 
      question: "Can you swim?", 
      answer: "Yes, I can swim.",
      multipleChoice: {
        prompt: "Yes, I ___ swim.",
        options: [
          { letter: "A", text: "can", correct: true },
          { letter: "B", text: "can't", correct: false },
          { letter: "C", text: "could", correct: false }
        ]
      }
    },
    { 
      question: "Can your brother play the guitar?", 
      answer: "No, he can't play the guitar.",
      multipleChoice: {
        prompt: "No, he ___ play the guitar.",
        options: [
          { letter: "A", text: "can", correct: false },
          { letter: "B", text: "can't", correct: true },
          { letter: "C", text: "could", correct: false }
        ]
      }
    },
    { 
      question: "Can your parents speak English?", 
      answer: "Yes, they can speak English.",
      multipleChoice: {
        prompt: "Yes, they ___ speak English.",
        options: [
          { letter: "A", text: "can't", correct: false },
          { letter: "B", text: "can", correct: true },
          { letter: "C", text: "could", correct: false }
        ]
      }
    },
    { 
      question: "Can your best friend cook Italian food?", 
      answer: "No, she can't cook Italian food.",
      multipleChoice: {
        prompt: "No, she ___ cook Italian food.",
        options: [
          { letter: "A", text: "can", correct: false },
          { letter: "B", text: "can't", correct: true },
          { letter: "C", text: "could", correct: false }
        ]
      }
    },
    { 
      question: "Can they run five kilometers?", 
      answer: "Yes, they can run five kilometers.",
      multipleChoice: {
        prompt: "Yes, they ___ run five kilometers.",
        options: [
          { letter: "A", text: "can", correct: true },
          { letter: "B", text: "can't", correct: false },
          { letter: "C", text: "could", correct: false }
        ]
      }
    },
    { 
      question: "Can you ride a bike?", 
      answer: "Yes, I can ride a bike.",
      multipleChoice: {
        prompt: "Yes, I ___ ride a bike.",
        options: [
          { letter: "A", text: "can't", correct: false },
          { letter: "B", text: "can", correct: true },
          { letter: "C", text: "could", correct: false }
        ]
      }
    },
    { 
      question: "Can she sing well?", 
      answer: "Yes, she can sing well.",
      multipleChoice: {
        prompt: "Yes, she ___ sing well.",
        options: [
          { letter: "A", text: "can", correct: true },
          { letter: "B", text: "can't", correct: false },
          { letter: "C", text: "could", correct: false }
        ]
      }
    },
    { 
      question: "Can he play chess?", 
      answer: "No, he can't play chess.",
      multipleChoice: {
        prompt: "No, he ___ play chess.",
        options: [
          { letter: "A", text: "can", correct: false },
          { letter: "B", text: "can't", correct: true },
          { letter: "C", text: "could", correct: false }
        ]
      }
    },
    { 
      question: "Can your teacher speak Spanish?", 
      answer: "No, he can't speak Spanish.",
      multipleChoice: {
        prompt: "No, he ___ speak Spanish.",
        options: [
          { letter: "A", text: "can", correct: false },
          { letter: "B", text: "can't", correct: true },
          { letter: "C", text: "could", correct: false }
        ]
      }
    },
    { 
      question: "Can we visit the museum today?", 
      answer: "Yes, we can visit the museum.",
      multipleChoice: {
        prompt: "Yes, we ___ visit the museum.",
        options: [
          { letter: "A", text: "can", correct: true },
          { letter: "B", text: "can't", correct: false },
          { letter: "C", text: "could", correct: false }
        ]
      }
    },
    { 
      question: "Can they play tennis?", 
      answer: "No, they can't play tennis.",
      multipleChoice: {
        prompt: "No, they ___ play tennis.",
        options: [
          { letter: "A", text: "can", correct: false },
          { letter: "B", text: "can't", correct: true },
          { letter: "C", text: "could", correct: false }
        ]
      }
    },
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
    { 
      question: "Can I sit here?", 
      answer: "Yes, you can sit here.",
      multipleChoice: {
        prompt: "Yes, you ___ sit here.",
        options: [
          { letter: "A", text: "can", correct: true },
          { letter: "B", text: "can't", correct: false },
          { letter: "C", text: "could", correct: false }
        ]
      }
    },
    { 
      question: "Can we eat in this room?", 
      answer: "No, you can't eat here.",
      multipleChoice: {
        prompt: "No, you ___ eat here.",
        options: [
          { letter: "A", text: "can", correct: false },
          { letter: "B", text: "can't", correct: true },
          { letter: "C", text: "could", correct: false }
        ]
      }
    },
    { 
      question: "Can he borrow your book?", 
      answer: "Yes, he can borrow my book.",
      multipleChoice: {
        prompt: "Yes, he ___ borrow my book.",
        options: [
          { letter: "A", text: "can", correct: true },
          { letter: "B", text: "can't", correct: false },
          { letter: "C", text: "could", correct: false }
        ]
      }
    },
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
    { 
      question: "Do you like reading books?", 
      answer: "Yes, I like reading books.",
      multipleChoice: {
        prompt: "Yes, I ___ reading books.",
        options: [
          { letter: "A", text: "like", correct: true },
          { letter: "B", text: "likes", correct: false },
          { letter: "C", text: "love", correct: false }
        ]
      }
    },
    { 
      question: "Does he love cooking?", 
      answer: "Yes, he loves cooking.",
      multipleChoice: {
        prompt: "Yes, he ___ cooking.",
        options: [
          { letter: "A", text: "love", correct: false },
          { letter: "B", text: "loves", correct: true },
          { letter: "C", text: "like", correct: false }
        ]
      }
    },
    { 
      question: "Do they hate playing football?", 
      answer: "No, they don't hate playing football.",
      multipleChoice: {
        prompt: "No, they ___ hate playing football.",
        options: [
          { letter: "A", text: "do", correct: false },
          { letter: "B", text: "don't", correct: true },
          { letter: "C", text: "doesn't", correct: false }
        ]
      }
    },
    { 
      question: "Does she like swimming?", 
      answer: "Yes, she likes swimming.",
      multipleChoice: {
        prompt: "Yes, she ___ swimming.",
        options: [
          { letter: "A", text: "like", correct: false },
          { letter: "B", text: "likes", correct: true },
          { letter: "C", text: "love", correct: false }
        ]
      }
    },
    { 
      question: "Do you love watching movies?", 
      answer: "Yes, I love watching movies.",
      multipleChoice: {
        prompt: "Yes, I love ___ movies.",
        options: [
          { letter: "A", text: "watch", correct: false },
          { letter: "B", text: "watching", correct: true },
          { letter: "C", text: "to watch", correct: false }
        ]
      }
    },
    { 
      question: "Does he hate dancing?", 
      answer: "No, he doesn't hate dancing.",
      multipleChoice: {
        prompt: "No, he ___ hate dancing.",
        options: [
          { letter: "A", text: "don't", correct: false },
          { letter: "B", text: "doesn't", correct: true },
          { letter: "C", text: "does", correct: false }
        ]
      }
    },
    { 
      question: "Do we like walking in the park?", 
      answer: "Yes, we like walking in the park.",
      multipleChoice: {
        prompt: "Yes, we like ___ in the park.",
        options: [
          { letter: "A", text: "walk", correct: false },
          { letter: "B", text: "walking", correct: true },
          { letter: "C", text: "to walk", correct: false }
        ]
      }
    },
    { 
      question: "Do they love listening to music?", 
      answer: "Yes, they love listening to music.",
      multipleChoice: {
        prompt: "Yes, they ___ listening to music.",
        options: [
          { letter: "A", text: "loves", correct: false },
          { letter: "B", text: "love", correct: true },
          { letter: "C", text: "like", correct: false }
        ]
      }
    },
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

      { category: "Intonation", yes_no_questions: "Voice goes UP ↗ at the end", examples: "Are you working? ↗ / Is she coming? ↗", wh_questions: "Voice goes DOWN ↘ at the end", examples: "What are you doing? ↘ / Where is he going? ↘", tip: "Yes/No ↗ | Wh- ↘", remember: "Intonation helps show it's a question!" },

      { category: "Real-World Examples", checking: "Are you listening? / Are you okay? / Is everything working?", location: "Where are you going? / Where is he sitting? / Where are they staying?", activity: "What are you doing? / What is she watching? / What are they playing?", time_plans: "When are you leaving? / When is he arriving? / When are they coming?" },

      { category: "Common Daily Questions", right_now: "What are you doing? (most common!) / Are you busy? / Are you working?", location: "Where are you going? / Where are you? / Are you coming?", attention: "Are you listening? / Are you watching? / Are you paying attention?", status: "How are you doing? / Is everything going well? / Are things working out?" },

      { category: "Answering Wh- Questions", what_doing: "What are you doing? → I'm studying English.", where_going: "Where are you going? → I'm going to the store.", why: "Why are you leaving? → I'm leaving because it's late.", full_sentence: "Answer with full sentence using Present Continuous!", pattern: "Subject + am/is/are + verb-ing..." },

      { category: "Contrast: Statement → Question → Negative", statement: "You are working.", question: "Are you working?", negative: "You aren't working.", statement_she: "She is cooking.", question_she: "Is she cooking?", negative_she: "She isn't cooking.", key: "Three forms - all use same BE verb and verb-ing!" },

      { category: "Key Takeaway", summary: "Present Continuous Questions = Asking about NOW", yes_no_form: "AM/IS/ARE + subject + verb-ING?", wh_form: "WH-word + AM/IS/ARE + subject + verb-ING?", inversion: "BE verb moves to the front (before subject)", short_answers: "Yes, I am / No, I'm not | Yes, she is / No, she isn't", remember: "Don't use do/does! | Main verb keeps -ing! | Invert BE and subject!", common: "What are you doing? (most common question!)", next: "Practice makes perfect!" }
    ]
  },
  
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

      { category: "Telling Time in Routines", at_time: "Use AT with specific times", examples: "I wake up at 7. / I have lunch at 12:30. / I go to bed at 10.", in_morning: "Use IN with parts of day", examples: "in the morning / in the afternoon / in the evening", at_night: "Use AT with 'night'", example: "at night", note: "Prepositions of time are important!", remember: "AT + time | IN + morning/afternoon/evening | AT + night" },

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
