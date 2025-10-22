/**
 * A1, A2, and B1 Module Data (Modules 1-150)
 * Extracted from LessonsApp.tsx to reduce file size and improve performance
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
  
  table: [
    { subject: "I", verb: "am", complement: "a student", example: "I am a student." },
    { subject: "He", verb: "is", complement: "tired", example: "He is tired." },
    { subject: "She", verb: "is", complement: "a doctor", example: "She is a doctor." },
    { subject: "It", verb: "is", complement: "cold", example: "It is cold." },
    { subject: "We", verb: "are", complement: "happy", example: "We are happy." },
    { subject: "You", verb: "are", complement: "teachers", example: "You are teachers." },
    { subject: "They", verb: "are", complement: "friends", example: "They are friends." }
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
  
  table: [
    { type: "Olumlu", form: "Subject + can + verb", example: "I can swim." },
    { type: "Olumsuz", form: "Subject + can't + verb", example: "She can't drive." },
    { type: "Soru", form: "Can + subject + verb?", example: "Can you play the piano?" },
    { type: "Cevap", form: "Yes, I can. / No, I can't.", example: "Yes, I can play the piano." }
  ],
  
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
  
  table: [
    { subject: "I", affirmative: "I can go out.", negative: "I can't go out.", question: "Can I go out?", answer: "Yes, you can. / No, you can't." },
    { subject: "You", affirmative: "You can use my pen.", negative: "You can't use my pen.", question: "Can I use your pen?", answer: "Yes, you can. / No, you can't." },
    { subject: "He", affirmative: "He can visit us today.", negative: "He can't visit us.", question: "Can he visit us today?", answer: "Yes, he can. / No, he can't." },
    { subject: "She", affirmative: "She can stay here.", negative: "She can't stay here.", question: "Can she stay here?", answer: "Yes, she can. / No, she can't." },
    { subject: "We", affirmative: "We can enter now.", negative: "We can't enter now.", question: "Can we enter now?", answer: "Yes, you can. / No, you can't." },
    { subject: "They", affirmative: "They can use the computer.", negative: "They can't use the computer.", question: "Can they use the computer?", answer: "Yes, they can. / No, they can't." }
  ],
  
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
  
  table: [
    { verb: "Like", usage: "Subject + like + verb-ing", example: "I like reading books." },
    { verb: "Love", usage: "Subject + love + verb-ing", example: "She loves cooking." },
    { verb: "Hate", usage: "Subject + hate + verb-ing", example: "He hates running." },
    { verb: "Don't like", usage: "Subject + don't/doesn't like + verb-ing", example: "They don't like swimming." }
  ],
  
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
  
  table: [
    { type: "How much", use: "Uncountable nouns", example: "How much money do you have?" },
    { type: "How many", use: "Countable nouns", example: "How many books are on the table?" }
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
    { tense: "", exampleAff: "She will be sleeping.", exampleNeg: "She will not be sleeping.", exampleQuestion: "Will she be sleeping?" },
    { tense: "", exampleAff: "They will be traveling.", exampleNeg: "They will not be traveling.", exampleQuestion: "Will they be traveling?" }
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
    { tense: "", affirmative: "She has tried sushi.", negative: "She has never tried sushi.", question: "Has she ever tried sushi?" },
    { tense: "", affirmative: "They have seen that movie.", negative: "They have never seen that movie.", question: "Have they ever seen that movie?" }
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

const MODULE_88_DATA = {
  title: "Shopping Vocabulary and Phrases",
  description: "Learn essential vocabulary and phrases",
  intro: `Alışveriş yaparken kullanılan temel İngilizce kelimeler ve ifadeler, hem mağaza içinde hem de çevrim içi alışverişte iletişim kurmayı kolaylaştırır.

📚 VOCABULARY:
price - fiyat
cheap - ucuz
expensive - pahalı
discount - indirim
cashier - kasiyer
receipt - fiş
try on - denemek
size - beden
fit - uymak
refund - para iadesi
How much is this? - Bu ne kadar?
Do you have this in medium? - Bunun medium'u var mı?
Can I try this on? - Bunu deneyebilir miyim?
I'm just looking. - Sadece bakıyorum.
Can I get a refund? - Para iadesi alabilir miyim?`,
  tip: "Practice using these words in context to remember them better.",

  table: [
    { en: "price", tr: "fiyat" },
    { en: "cheap", tr: "ucuz" },
    { en: "expensive", tr: "pahalı" },
    { en: "discount", tr: "indirim" },
    { en: "cashier", tr: "kasiyer" },
    { en: "receipt", tr: "fiş" },
    { en: "try on", tr: "denemek" },
    { en: "size", tr: "beden" },
    { en: "fit", tr: "uymak" },
    { en: "refund", tr: "para iadesi" },
    { en: "How much is this?", tr: "Bu ne kadar?" },
    { en: "Do you have this in medium?", tr: "Bunun medium'u var mı?" },
    { en: "Can I try this on?", tr: "Bunu deneyebilir miyim?" },
    { en: "I'm just looking.", tr: "Sadece bakıyorum." },
    { en: "Can I get a refund?", tr: "Para iadesi alabilir miyim?" },
  ],

  speakingPractice: [
    { question: "Ask the price of a jacket.", answer: "How much is this?" },
    { question: "Ask if you can try on a dress.", answer: "Can I try this on?" },
    { question: "Ask for a smaller size.", answer: "Do you have this in a smaller size?" },
    { question: "Tell the cashier you want to pay by credit card.", answer: "Can I pay by credit card?" },
    { question: "Say you are just looking.", answer: "I'm just looking, thank you." },
    { question: "Ask if something is on sale.", answer: "Is this on sale?" },
    { question: "Ask where the changing room is.", answer: "Where is the fitting room?" },
    { question: "Ask if they have the shoes in size 42.", answer: "if they have the shoes in size 42?" },
    { question: "Say the shirt is too big.", answer: "This is too big for me." },
    { question: "Ask if they accept cash.", answer: "if they accept cash?" },
    { question: "Say you want to return an item.", answer: "I'd like to return this item." },
    { question: "Ask how much the jeans are.", answer: "How much is this?" },
    { question: "Say the sweater is too expensive.", answer: "the sweater is too expensive." },
    { question: "Ask if you can get a discount.", answer: "Do you have any discounts?" },
    { question: "Say you like the color of the t-shirt.", answer: "you like the color of the t-shirt." },
    { question: "Ask if they have it in blue.", answer: "if they have it in blue?" },
    { question: "Say the shoes don't fit.", answer: "the shoes don't fit." },
    { question: "Ask where the cashier is.", answer: "where the cashier is?" },
    { question: "Say you want to buy a gift.", answer: "you want to buy a gift." },
    { question: "Ask if they wrap presents.", answer: "if they wrap presents?" },
    { question: "Say you are looking for a black dress.", answer: "you are looking for a black dress." },
    { question: "Ask when the shop closes.", answer: "when the shop closes?" },
    { question: "Say you lost your receipt.", answer: "you lost your receipt." },
    { question: "Ask how long the refund takes.", answer: "Can I get a refund?" },
    { question: "Say you want to exchange the item.", answer: "I'd like to exchange this." },
    { question: "Ask if they deliver.", answer: "if they deliver?" },
    { question: "Say you will think about it.", answer: "you will think about it." },
    { question: "Ask if there is a fitting room.", answer: "Where is the fitting room?" },
    { question: "Say the price is too high.", answer: "the price is too high." },
    { question: "Ask if they have more in stock.", answer: "if they have more in stock?" },
    { question: "Say you are shopping for a birthday gift.", answer: "you are shopping for a birthday gift." },
    { question: "Ask if there is a student discount.", answer: "Do you have any discounts?" },
    { question: "Say you found the same item cheaper online.", answer: "you found the same item cheaper online." },
    { question: "Ask when new items arrive.", answer: "when new items arrive?" },
    { question: "Say you are not sure about the color.", answer: "you are not sure about the color." },
    { question: "Ask if the store has a website.", answer: "if the store has a website?" },
    { question: "Say the item is damaged.", answer: "the item is damaged." },
    { question: "Ask if the product has a warranty.", answer: "if the product has a warranty?" },
    { question: "Say you will pay in cash.", answer: "you will pay in cash." },
    { question: "Ask how many days you have to return it.", answer: "I'd like to return this item." },
  ]
};


const MODULE_89_DATA = {
  title: "Health Problems and Solutions Vocabulary",
  description: "Learn essential vocabulary and phrases",
  intro: `Bu modülde sağlık sorunlarını ve bu sorunlara karşı önerilen çözümleri ifade etmek için kullanılan temel İngilizce kelimeler ve ifadeler ele alınır.

📚 VOCABULARY:
headache - baş ağrısı
stomachache - karın ağrısı
sore throat - boğaz ağrısı
cough - öksürük
fever - ateş
cold - soğuk algınlığı
flu - grip
backache - sırt ağrısı
toothache - diş ağrısı
runny nose - burun akıntısı
take some medicine - ilaç al
drink lots of water - bol su iç
get some rest - biraz dinlen
go to the doctor - doktora git
stay in bed - yatakta kal`,
  tip: "Practice using these words in context to remember them better.",

  table: [
    { en: "headache", tr: "baş ağrısı" },
    { en: "stomachache", tr: "karın ağrısı" },
    { en: "sore throat", tr: "boğaz ağrısı" },
    { en: "cough", tr: "öksürük" },
    { en: "fever", tr: "ateş" },
    { en: "cold", tr: "soğuk algınlığı" },
    { en: "flu", tr: "grip" },
    { en: "backache", tr: "sırt ağrısı" },
    { en: "toothache", tr: "diş ağrısı" },
    { en: "runny nose", tr: "burun akıntısı" },
    { en: "take some medicine", tr: "ilaç al" },
    { en: "drink lots of water", tr: "bol su iç" },
    { en: "get some rest", tr: "biraz dinlen" },
    { en: "go to the doctor", tr: "doktora git" },
    { en: "stay in bed", tr: "yatakta kal" },
  ],

  speakingPractice: [
    { question: "You have a headache. What do you do?", answer: "I have a headache. I should take some medicine." },
    { question: "You have a sore throat. What's your advice?", answer: "I have a sore throat. I should drink warm tea." },
    { question: "You feel tired all day. What should you do?", answer: "I understand the situation." },
    { question: "You have a fever. What do you suggest?", answer: "I have a fever. I need to rest." },
    { question: "You are coughing a lot. What do you take?", answer: "I'm coughing a lot. I should take cough medicine." },
    { question: "You have a stomachache. What should you avoid?", answer: "I have a stomachache. I should avoid heavy food." },
    { question: "You feel sick. What would you do?", answer: "I understand the situation." },
    { question: "You have a toothache. What is your solution?", answer: "I understand the situation." },
    { question: "You have a cold. What helps you?", answer: "I have a cold. I should stay in bed and drink lots of water." },
    { question: "You have back pain. What should you do?", answer: "I understand the situation." },
    { question: "You feel dizzy. What's the best thing to do?", answer: "I understand the situation." },
    { question: "You can't sleep at night. What do you try?", answer: "I understand the situation." },
    { question: "You have the flu. What is your advice?", answer: "I have a cold. I should stay in bed and drink lots of water." },
    { question: "You have a runny nose. What do you use?", answer: "I understand the situation." },
    { question: "You have a pain in your leg. What do you do?", answer: "I understand the situation." },
    { question: "You feel stressed. What helps you relax?", answer: "I understand the situation." },
    { question: "You are sneezing all the time. What should you do?", answer: "I understand the situation." },
    { question: "You feel weak. What do you eat or drink?", answer: "I understand the situation." },
    { question: "You feel very hot. What should you do?", answer: "I understand the situation." },
    { question: "You have dry skin. What is a good solution?", answer: "I understand the situation." },
    { question: "You have an earache. What would you take?", answer: "I understand the situation." },
    { question: "You feel anxious. What should you try?", answer: "I understand the situation." },
    { question: "You have a cut on your hand. What do you apply?", answer: "I understand the situation." },
    { question: "You are vomiting. What should you do?", answer: "I understand the situation." },
    { question: "You have an insect bite. What helps?", answer: "I understand the situation." },
    { question: "You hurt your foot. What is your solution?", answer: "I understand the situation." },
    { question: "You can't breathe well. What do you need?", answer: "I understand the situation." },
    { question: "You are very cold. What should you wear?", answer: "I have a cold. I should stay in bed and drink lots of water." },
    { question: "You feel light-headed. What should you do?", answer: "I understand the situation." },
    { question: "You have a nosebleed. What's the first step?", answer: "I understand the situation." },
    { question: "You have a burn. What should you put on it?", answer: "I understand the situation." },
    { question: "You are dehydrated. What should you drink?", answer: "I understand the situation." },
    { question: "You have food poisoning. What should you do?", answer: "I understand the situation." },
    { question: "You feel pain after exercise. What helps?", answer: "I understand the situation." },
    { question: "You can't stop sneezing. What might help?", answer: "I understand the situation." },
    { question: "You caught a cold. What's your routine?", answer: "I have a cold. I should stay in bed and drink lots of water." },
    { question: "You lost your voice. What do you drink?", answer: "I understand the situation." },
    { question: "You feel nauseous. What's your advice?", answer: "I understand the situation." },
    { question: "You feel sick after eating. What helps?", answer: "I understand the situation." },
    { question: "You're allergic to pollen. What should you avoid?", answer: "I understand the situation." },
  ]
};


const MODULE_90_DATA = {
  title: "Travel and Transport Vocabulary",
  description: "Learn essential vocabulary and phrases",
  intro: `Seyahat ederken ya da ulaşım araçları hakkında konuşurken kullanılan temel İngilizce kelimeler ve ifadeler bu modülde ele alınır.

📚 VOCABULARY:
car - araba
bus - otobüs
train - tren
plane - uçak
taxi - taksi
bicycle - bisiklet
subway / underground - metro
tram - tramvay
ferry - feribot
motorbike - motosiklet
ticket - bilet
platform - peron
delay - gecikme
departure - kalkış
arrival - varış
luggage / baggage - bagaj
check-in - giriş işlemi
boarding pass - biniş kartı`,
  tip: "Practice using these words in context to remember them better.",

  table: [
    { en: "car", tr: "araba" },
    { en: "bus", tr: "otobüs" },
    { en: "train", tr: "tren" },
    { en: "plane", tr: "uçak" },
    { en: "taxi", tr: "taksi" },
    { en: "bicycle", tr: "bisiklet" },
    { en: "subway / underground", tr: "metro" },
    { en: "tram", tr: "tramvay" },
    { en: "ferry", tr: "feribot" },
    { en: "motorbike", tr: "motosiklet" },
    { en: "ticket", tr: "bilet" },
    { en: "platform", tr: "peron" },
    { en: "delay", tr: "gecikme" },
    { en: "departure", tr: "kalkış" },
    { en: "arrival", tr: "varış" },
    { en: "luggage / baggage", tr: "bagaj" },
    { en: "check-in", tr: "giriş işlemi" },
    { en: "boarding pass", tr: "biniş kartı" },
  ],

  speakingPractice: [
    { question: "Say how you go to school every day.", answer: "I go to school by bus every day." },
    { question: "Ask where to buy a bus ticket.", answer: "Where can I buy a ticket?" },
    { question: "Say you are traveling by plane.", answer: "I'm traveling by plane." },
    { question: "Ask what time the train arrives.", answer: "What time does the train arrive?" },
    { question: "Say your flight is delayed.", answer: "My flight is delayed." },
    { question: "Ask which platform the train leaves from.", answer: "What time does the train arrive?" },
    { question: "Say you prefer traveling by car.", answer: "you prefer traveling by car." },
    { question: "Ask for a taxi to the station.", answer: "for a taxi to the station?" },
    { question: "Say you missed the bus.", answer: "you missed the bus." },
    { question: "Ask where the nearest metro station is.", answer: "where the nearest metro station is?" },
    { question: "Say you are afraid of flying.", answer: "you are afraid of flying." },
    { question: "Ask when the next ferry leaves.", answer: "when the next ferry leaves?" },
    { question: "Say you have heavy luggage.", answer: "I have heavy luggage." },
    { question: "Ask where the check-in desk is.", answer: "where the check-in desk is?" },
    { question: "Say you have a boarding pass.", answer: "you have a boarding pass." },
    { question: "Ask how much a taxi to the airport costs.", answer: "How much is this?" },
    { question: "Say the bus is very crowded.", answer: "the bus is very crowded." },
    { question: "Ask where to rent a car.", answer: "where to rent a car?" },
    { question: "Say you are taking the tram today.", answer: "you are taking the tram today." },
    { question: "Ask if the subway is running.", answer: "if the subway is running?" },
    { question: "Say you enjoy traveling by train.", answer: "you enjoy traveling by train." },
    { question: "Ask how long the flight takes.", answer: "how long the flight takes?" },
    { question: "Say your luggage is lost.", answer: "I have heavy luggage." },
    { question: "Ask if this seat is taken.", answer: "if this seat is taken?" },
    { question: "Say you want a window seat.", answer: "you want a window seat." },
    { question: "Ask when boarding begins.", answer: "when boarding begins?" },
    { question: "Say your ticket is for tomorrow.", answer: "your ticket is for tomorrow." },
    { question: "Ask where the arrival gate is.", answer: "where the arrival gate is?" },
    { question: "Say you want to travel abroad.", answer: "you want to travel abroad." },
    { question: "Ask what transport to use to get downtown.", answer: "what transport to use to get downtown?" },
    { question: "Say your passport is ready.", answer: "your passport is ready." },
    { question: "Ask if you can take a bike on the train.", answer: "if you can take a bike on the train?" },
    { question: "Say you are traveling for business.", answer: "you are traveling for business." },
    { question: "Ask when you must arrive at the airport.", answer: "when you must arrive at the airport?" },
    { question: "Say the taxi didn't arrive on time.", answer: "the taxi didn't arrive on time." },
    { question: "Ask how to get to the ferry terminal.", answer: "how to get to the ferry terminal?" },
    { question: "Say your train was cancelled.", answer: "your train was cancelled." },
    { question: "Ask where to get a travel map.", answer: "where to get a travel map?" },
    { question: "Say you want to travel by night bus.", answer: "you want to travel by night bus." },
    { question: "Ask if the transport is free with the city card.", answer: "if the transport is free with the city card?" },
  ]
};


const MODULE_91_DATA = {
  title: "House and Furniture Vocabulary",
  description: "Learn essential vocabulary and phrases",
  intro: `Bu modülde evdeki odalar, eşyalar ve mobilyalarla ilgili temel İngilizce kelimeler ve ifadeler öğretilir.

📚 VOCABULARY:
living room - oturma odası
bedroom - yatak odası
kitchen - mutfak
bathroom - banyo
dining room - yemek odası
balcony - balkon
garden - bahçe
sofa / couch - kanepe
bed - yatak
table - masa
chair - sandalye
wardrobe - gardırop
mirror - ayna
carpet / rug - halı
shelf - raf
lamp - lamba
TV - televizyon
fridge - buzdolabı
oven - fırın
washing machine - çamaşır makinesi`,
  tip: "Practice using these words in context to remember them better.",

  table: [
    { en: "living room", tr: "oturma odası" },
    { en: "bedroom", tr: "yatak odası" },
    { en: "kitchen", tr: "mutfak" },
    { en: "bathroom", tr: "banyo" },
    { en: "dining room", tr: "yemek odası" },
    { en: "balcony", tr: "balkon" },
    { en: "garden", tr: "bahçe" },
    { en: "sofa / couch", tr: "kanepe" },
    { en: "bed", tr: "yatak" },
    { en: "table", tr: "masa" },
    { en: "chair", tr: "sandalye" },
    { en: "wardrobe", tr: "gardırop" },
    { en: "mirror", tr: "ayna" },
    { en: "carpet / rug", tr: "halı" },
    { en: "shelf", tr: "raf" },
    { en: "lamp", tr: "lamba" },
    { en: "TV", tr: "televizyon" },
    { en: "fridge", tr: "buzdolabı" },
    { en: "oven", tr: "fırın" },
    { en: "washing machine", tr: "çamaşır makinesi" },
  ],

  speakingPractice: [
    { question: "What does \"living room\" mean in Turkish?", answer: "It means \"oturma odası\"." },
    { question: "Can you use \"bedroom\" in a sentence?", answer: "Yes, for example: I saw a bedroom yesterday." },
    { question: "How do you say \"mutfak\" in English?", answer: "You say \"kitchen\"." },
    { question: "What is the English word for \"banyo\"?", answer: "The English word is \"bathroom\"." },
    { question: "Do you know what \"dining room\" is?", answer: "Yes, \"dining room\" is \"yemek odası\" in Turkish." },
    { question: "Can you translate \"balcony\" to Turkish?", answer: "Sure, it's \"balkon\"." },
    { question: "What's another way to say \"garden\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"sofa / couch\"?", answer: "You might use it when talking about kanepe." },
    { question: "Is \"bed\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"table\" in conversation?", answer: "Yes, I use it when I talk about masa." },
    { question: "What does \"chair\" mean in Turkish?", answer: "It means \"sandalye\"." },
    { question: "Can you use \"wardrobe\" in a sentence?", answer: "Yes, for example: I saw a wardrobe yesterday." },
    { question: "How do you say \"ayna\" in English?", answer: "You say \"mirror\"." },
    { question: "What is the English word for \"halı\"?", answer: "The English word is \"carpet / rug\"." },
    { question: "Do you know what \"shelf\" is?", answer: "Yes, \"shelf\" is \"raf\" in Turkish." },
    { question: "Can you translate \"lamp\" to Turkish?", answer: "Sure, it's \"lamba\"." },
    { question: "What's another way to say \"TV\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"fridge\"?", answer: "You might use it when talking about buzdolabı." },
    { question: "Is \"oven\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"washing machine\" in conversation?", answer: "Yes, I use it when I talk about çamaşır makinesi." },
    { question: "What does \"living room\" mean in Turkish?", answer: "It means \"oturma odası\"." },
    { question: "Can you use \"bedroom\" in a sentence?", answer: "Yes, for example: I saw a bedroom yesterday." },
    { question: "How do you say \"mutfak\" in English?", answer: "You say \"kitchen\"." },
    { question: "What is the English word for \"banyo\"?", answer: "The English word is \"bathroom\"." },
    { question: "Do you know what \"dining room\" is?", answer: "Yes, \"dining room\" is \"yemek odası\" in Turkish." },
    { question: "Can you translate \"balcony\" to Turkish?", answer: "Sure, it's \"balkon\"." },
    { question: "What's another way to say \"garden\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"sofa / couch\"?", answer: "You might use it when talking about kanepe." },
    { question: "Is \"bed\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"table\" in conversation?", answer: "Yes, I use it when I talk about masa." },
    { question: "What does \"chair\" mean in Turkish?", answer: "It means \"sandalye\"." },
    { question: "Can you use \"wardrobe\" in a sentence?", answer: "Yes, for example: I saw a wardrobe yesterday." },
    { question: "How do you say \"ayna\" in English?", answer: "You say \"mirror\"." },
    { question: "What is the English word for \"halı\"?", answer: "The English word is \"carpet / rug\"." },
    { question: "Do you know what \"shelf\" is?", answer: "Yes, \"shelf\" is \"raf\" in Turkish." },
    { question: "Can you translate \"lamp\" to Turkish?", answer: "Sure, it's \"lamba\"." },
    { question: "What's another way to say \"TV\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"fridge\"?", answer: "You might use it when talking about buzdolabı." },
    { question: "Is \"oven\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"washing machine\" in conversation?", answer: "Yes, I use it when I talk about çamaşır makinesi." },
  ]
};


const MODULE_92_DATA = {
  title: "Technology Vocabulary",
  description: "Learn essential vocabulary and phrases",
  intro: `Bu modülde teknolojiyle ilgili günlük hayatta sıkça kullanılan temel İngilizce kelimeler ve ifadeler öğretilir.

📚 VOCABULARY:
computer - bilgisayar
laptop - dizüstü bilgisayar
tablet - tablet
smartphone - akıllı telefon
charger - şarj cihazı
headphones / earphones - kulaklık
keyboard - klavye
mouse - fare
screen - ekran
printer - yazıcı
turn on / off - açmak / kapatmak
log in / log out - giriş yapmak / çıkış yapmak
download / upload - indirmek / yüklemek
connect to Wi-Fi - Wi-Fi'ye bağlanmak
send / receive a message - mesaj göndermek / almak`,
  tip: "Practice using these words in context to remember them better.",

  table: [
    { en: "computer", tr: "bilgisayar" },
    { en: "laptop", tr: "dizüstü bilgisayar" },
    { en: "tablet", tr: "tablet" },
    { en: "smartphone", tr: "akıllı telefon" },
    { en: "charger", tr: "şarj cihazı" },
    { en: "headphones / earphones", tr: "kulaklık" },
    { en: "keyboard", tr: "klavye" },
    { en: "mouse", tr: "fare" },
    { en: "screen", tr: "ekran" },
    { en: "printer", tr: "yazıcı" },
    { en: "turn on / off", tr: "açmak / kapatmak" },
    { en: "log in / log out", tr: "giriş yapmak / çıkış yapmak" },
    { en: "download / upload", tr: "indirmek / yüklemek" },
    { en: "connect to Wi-Fi", tr: "Wi-Fi'ye bağlanmak" },
    { en: "send / receive a message", tr: "mesaj göndermek / almak" },
  ],

  speakingPractice: [
    { question: "What does \"computer\" mean in Turkish?", answer: "It means \"bilgisayar\"." },
    { question: "Can you use \"laptop\" in a sentence?", answer: "Yes, for example: I saw a laptop yesterday." },
    { question: "How do you say \"tablet\" in English?", answer: "You say \"tablet\"." },
    { question: "What is the English word for \"akıllı telefon\"?", answer: "The English word is \"smartphone\"." },
    { question: "Do you know what \"charger\" is?", answer: "Yes, \"charger\" is \"şarj cihazı\" in Turkish." },
    { question: "Can you translate \"headphones / earphones\" to Turkish?", answer: "Sure, it's \"kulaklık\"." },
    { question: "What's another way to say \"keyboard\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"mouse\"?", answer: "You might use it when talking about fare." },
    { question: "Is \"screen\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"printer\" in conversation?", answer: "Yes, I use it when I talk about yazıcı." },
    { question: "What does \"turn on / off\" mean in Turkish?", answer: "It means \"açmak / kapatmak\"." },
    { question: "Can you use \"log in / log out\" in a sentence?", answer: "Yes, for example: I saw a log in / log out yesterday." },
    { question: "How do you say \"indirmek / yüklemek\" in English?", answer: "You say \"download / upload\"." },
    { question: "What is the English word for \"Wi-Fi'ye bağlanmak\"?", answer: "The English word is \"connect to Wi-Fi\"." },
    { question: "Do you know what \"send / receive a message\" is?", answer: "Yes, \"send / receive a message\" is \"mesaj göndermek / almak\" in Turkish." },
    { question: "Can you translate \"computer\" to Turkish?", answer: "Sure, it's \"bilgisayar\"." },
    { question: "What's another way to say \"laptop\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"tablet\"?", answer: "You might use it when talking about tablet." },
    { question: "Is \"smartphone\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"charger\" in conversation?", answer: "Yes, I use it when I talk about şarj cihazı." },
    { question: "What does \"headphones / earphones\" mean in Turkish?", answer: "It means \"kulaklık\"." },
    { question: "Can you use \"keyboard\" in a sentence?", answer: "Yes, for example: I saw a keyboard yesterday." },
    { question: "How do you say \"fare\" in English?", answer: "You say \"mouse\"." },
    { question: "What is the English word for \"ekran\"?", answer: "The English word is \"screen\"." },
    { question: "Do you know what \"printer\" is?", answer: "Yes, \"printer\" is \"yazıcı\" in Turkish." },
    { question: "Can you translate \"turn on / off\" to Turkish?", answer: "Sure, it's \"açmak / kapatmak\"." },
    { question: "What's another way to say \"log in / log out\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"download / upload\"?", answer: "You might use it when talking about indirmek / yüklemek." },
    { question: "Is \"connect to Wi-Fi\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"send / receive a message\" in conversation?", answer: "Yes, I use it when I talk about mesaj göndermek / almak." },
    { question: "What does \"computer\" mean in Turkish?", answer: "It means \"bilgisayar\"." },
    { question: "Can you use \"laptop\" in a sentence?", answer: "Yes, for example: I saw a laptop yesterday." },
    { question: "How do you say \"tablet\" in English?", answer: "You say \"tablet\"." },
    { question: "What is the English word for \"akıllı telefon\"?", answer: "The English word is \"smartphone\"." },
    { question: "Do you know what \"charger\" is?", answer: "Yes, \"charger\" is \"şarj cihazı\" in Turkish." },
    { question: "Can you translate \"headphones / earphones\" to Turkish?", answer: "Sure, it's \"kulaklık\"." },
    { question: "What's another way to say \"keyboard\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"mouse\"?", answer: "You might use it when talking about fare." },
    { question: "Is \"screen\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"printer\" in conversation?", answer: "Yes, I use it when I talk about yazıcı." },
  ]
};


const MODULE_93_DATA = {
  title: "School and Education Vocabulary",
  description: "Learn essential vocabulary and phrases",
  intro: `Bu modülde okul hayatı ve eğitimle ilgili temel İngilizce kelimeler ve ifadeler öğretilir.

📚 VOCABULARY:
math - matematik
science - fen
history - tarih
geography - coğrafya
English - İngilizce
classroom - sınıf
library - kütüphane
gym - spor salonu
teacher's room - öğretmenler odası
playground - oyun alanı
study - ders çalışmak
take an exam - sınava girmek
do homework - ödev yapmak
be late - geç kalmak
ask a question - soru sormak
give a presentation - sunum yapmak
get good grades - iyi notlar almak
fail / pass - kalmak / geçmek`,
  tip: "Practice using these words in context to remember them better.",

  table: [
    { en: "math", tr: "matematik" },
    { en: "science", tr: "fen" },
    { en: "history", tr: "tarih" },
    { en: "geography", tr: "coğrafya" },
    { en: "English", tr: "İngilizce" },
    { en: "classroom", tr: "sınıf" },
    { en: "library", tr: "kütüphane" },
    { en: "gym", tr: "spor salonu" },
    { en: "teacher's room", tr: "öğretmenler odası" },
    { en: "playground", tr: "oyun alanı" },
    { en: "study", tr: "ders çalışmak" },
    { en: "take an exam", tr: "sınava girmek" },
    { en: "do homework", tr: "ödev yapmak" },
    { en: "be late", tr: "geç kalmak" },
    { en: "ask a question", tr: "soru sormak" },
    { en: "give a presentation", tr: "sunum yapmak" },
    { en: "get good grades", tr: "iyi notlar almak" },
    { en: "fail / pass", tr: "kalmak / geçmek" },
  ],

  speakingPractice: [
    { question: "What does \"math\" mean in Turkish?", answer: "It means \"matematik\"." },
    { question: "Can you use \"science\" in a sentence?", answer: "Yes, for example: I saw a science yesterday." },
    { question: "How do you say \"tarih\" in English?", answer: "You say \"history\"." },
    { question: "What is the English word for \"coğrafya\"?", answer: "The English word is \"geography\"." },
    { question: "Do you know what \"English\" is?", answer: "Yes, \"English\" is \"İngilizce\" in Turkish." },
    { question: "Can you translate \"classroom\" to Turkish?", answer: "Sure, it's \"sınıf\"." },
    { question: "What's another way to say \"library\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"gym\"?", answer: "You might use it when talking about spor salonu." },
    { question: "Is \"teacher's room\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"playground\" in conversation?", answer: "Yes, I use it when I talk about oyun alanı." },
    { question: "What does \"study\" mean in Turkish?", answer: "It means \"ders çalışmak\"." },
    { question: "Can you use \"take an exam\" in a sentence?", answer: "Yes, for example: I saw a take an exam yesterday." },
    { question: "How do you say \"ödev yapmak\" in English?", answer: "You say \"do homework\"." },
    { question: "What is the English word for \"geç kalmak\"?", answer: "The English word is \"be late\"." },
    { question: "Do you know what \"ask a question\" is?", answer: "Yes, \"ask a question\" is \"soru sormak\" in Turkish." },
    { question: "Can you translate \"give a presentation\" to Turkish?", answer: "Sure, it's \"sunum yapmak\"." },
    { question: "What's another way to say \"get good grades\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"fail / pass\"?", answer: "You might use it when talking about kalmak / geçmek." },
    { question: "Is \"math\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"science\" in conversation?", answer: "Yes, I use it when I talk about fen." },
    { question: "What does \"history\" mean in Turkish?", answer: "It means \"tarih\"." },
    { question: "Can you use \"geography\" in a sentence?", answer: "Yes, for example: I saw a geography yesterday." },
    { question: "How do you say \"İngilizce\" in English?", answer: "You say \"English\"." },
    { question: "What is the English word for \"sınıf\"?", answer: "The English word is \"classroom\"." },
    { question: "Do you know what \"library\" is?", answer: "Yes, \"library\" is \"kütüphane\" in Turkish." },
    { question: "Can you translate \"gym\" to Turkish?", answer: "Sure, it's \"spor salonu\"." },
    { question: "What's another way to say \"teacher's room\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"playground\"?", answer: "You might use it when talking about oyun alanı." },
    { question: "Is \"study\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"take an exam\" in conversation?", answer: "Yes, I use it when I talk about sınava girmek." },
    { question: "What does \"do homework\" mean in Turkish?", answer: "It means \"ödev yapmak\"." },
    { question: "Can you use \"be late\" in a sentence?", answer: "Yes, for example: I saw a be late yesterday." },
    { question: "How do you say \"soru sormak\" in English?", answer: "You say \"ask a question\"." },
    { question: "What is the English word for \"sunum yapmak\"?", answer: "The English word is \"give a presentation\"." },
    { question: "Do you know what \"get good grades\" is?", answer: "Yes, \"get good grades\" is \"iyi notlar almak\" in Turkish." },
    { question: "Can you translate \"fail / pass\" to Turkish?", answer: "Sure, it's \"kalmak / geçmek\"." },
    { question: "What's another way to say \"math\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"science\"?", answer: "You might use it when talking about fen." },
    { question: "Is \"history\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"geography\" in conversation?", answer: "Yes, I use it when I talk about coğrafya." },
  ]
};


const MODULE_94_DATA = {
  title: "Festivals and Celebrations Vocabulary",
  description: "Learn essential vocabulary and phrases",
  intro: `Festivals and Celebrations (Festivaller ve Kutlamalar), bir toplumun kültürel yapısının önemli bir parçasıdır. Bu derste; bayramlar, özel günler, kutlama aktiviteleri ve geleneksel etkinliklerle ilgili İngilizce kelimeleri öğreneceğiz. Ayrıca bu kelimeleri cümle içinde kullanmayı da pratik edeceğiz.

📚 VOCABULARY:
Festival - Festival
Celebration - Kutlama
Parade - Geçit töreni
Fireworks - Havai fişek
Costume - Kostüm
Party - Parti
Cake - Pasta
Gift / Present - Hediye
Balloon - Balon
Candle - Mum
Birthday - Doğum günü
National Holiday - Resmi tatil
New Year's Eve - Yılbaşı gecesi
Anniversary - Yıldönümü
Wedding - Düğün
Christmas - Noel
Eid - Bayram (Dini)
Thanksgiving - Şükran Günü
Carnival - Karnaval
Decoration - Süsleme`,
  tip: "Practice using these words in context to remember them better.",

  table: [
    { en: "Festival", tr: "Festival" },
    { en: "Celebration", tr: "Kutlama" },
    { en: "Parade", tr: "Geçit töreni" },
    { en: "Fireworks", tr: "Havai fişek" },
    { en: "Costume", tr: "Kostüm" },
    { en: "Party", tr: "Parti" },
    { en: "Cake", tr: "Pasta" },
    { en: "Gift / Present", tr: "Hediye" },
    { en: "Balloon", tr: "Balon" },
    { en: "Candle", tr: "Mum" },
    { en: "Birthday", tr: "Doğum günü" },
    { en: "National Holiday", tr: "Resmi tatil" },
    { en: "New Year's Eve", tr: "Yılbaşı gecesi" },
    { en: "Anniversary", tr: "Yıldönümü" },
    { en: "Wedding", tr: "Düğün" },
    { en: "Christmas", tr: "Noel" },
    { en: "Eid", tr: "Bayram (Dini)" },
    { en: "Thanksgiving", tr: "Şükran Günü" },
    { en: "Carnival", tr: "Karnaval" },
    { en: "Decoration", tr: "Süsleme" },
  ],

  speakingPractice: [
    { question: "What does \"Festival\" mean in Turkish?", answer: "It means \"Festival\"." },
    { question: "Can you use \"Celebration\" in a sentence?", answer: "Yes, for example: I saw a Celebration yesterday." },
    { question: "How do you say \"Geçit töreni\" in English?", answer: "You say \"Parade\"." },
    { question: "What is the English word for \"Havai fişek\"?", answer: "The English word is \"Fireworks\"." },
    { question: "Do you know what \"Costume\" is?", answer: "Yes, \"Costume\" is \"Kostüm\" in Turkish." },
    { question: "Can you translate \"Party\" to Turkish?", answer: "Sure, it's \"Parti\"." },
    { question: "What's another way to say \"Cake\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"Gift / Present\"?", answer: "You might use it when talking about Hediye." },
    { question: "Is \"Balloon\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"Candle\" in conversation?", answer: "Yes, I use it when I talk about Mum." },
    { question: "What does \"Birthday\" mean in Turkish?", answer: "It means \"Doğum günü\"." },
    { question: "Can you use \"National Holiday\" in a sentence?", answer: "Yes, for example: I saw a National Holiday yesterday." },
    { question: "How do you say \"Yılbaşı gecesi\" in English?", answer: "You say \"New Year's Eve\"." },
    { question: "What is the English word for \"Yıldönümü\"?", answer: "The English word is \"Anniversary\"." },
    { question: "Do you know what \"Wedding\" is?", answer: "Yes, \"Wedding\" is \"Düğün\" in Turkish." },
    { question: "Can you translate \"Christmas\" to Turkish?", answer: "Sure, it's \"Noel\"." },
    { question: "What's another way to say \"Eid\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"Thanksgiving\"?", answer: "You might use it when talking about Şükran Günü." },
    { question: "Is \"Carnival\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"Decoration\" in conversation?", answer: "Yes, I use it when I talk about Süsleme." },
    { question: "What does \"Festival\" mean in Turkish?", answer: "It means \"Festival\"." },
    { question: "Can you use \"Celebration\" in a sentence?", answer: "Yes, for example: I saw a Celebration yesterday." },
    { question: "How do you say \"Geçit töreni\" in English?", answer: "You say \"Parade\"." },
    { question: "What is the English word for \"Havai fişek\"?", answer: "The English word is \"Fireworks\"." },
    { question: "Do you know what \"Costume\" is?", answer: "Yes, \"Costume\" is \"Kostüm\" in Turkish." },
    { question: "Can you translate \"Party\" to Turkish?", answer: "Sure, it's \"Parti\"." },
    { question: "What's another way to say \"Cake\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"Gift / Present\"?", answer: "You might use it when talking about Hediye." },
    { question: "Is \"Balloon\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"Candle\" in conversation?", answer: "Yes, I use it when I talk about Mum." },
    { question: "What does \"Birthday\" mean in Turkish?", answer: "It means \"Doğum günü\"." },
    { question: "Can you use \"National Holiday\" in a sentence?", answer: "Yes, for example: I saw a National Holiday yesterday." },
    { question: "How do you say \"Yılbaşı gecesi\" in English?", answer: "You say \"New Year's Eve\"." },
    { question: "What is the English word for \"Yıldönümü\"?", answer: "The English word is \"Anniversary\"." },
    { question: "Do you know what \"Wedding\" is?", answer: "Yes, \"Wedding\" is \"Düğün\" in Turkish." },
    { question: "Can you translate \"Christmas\" to Turkish?", answer: "Sure, it's \"Noel\"." },
    { question: "What's another way to say \"Eid\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"Thanksgiving\"?", answer: "You might use it when talking about Şükran Günü." },
    { question: "Is \"Carnival\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"Decoration\" in conversation?", answer: "Yes, I use it when I talk about Süsleme." },
  ]
};


const MODULE_95_DATA = {
  title: "Emotions and Feelings Vocabulary",
  description: "Learn essential vocabulary and phrases",
  intro: `

📚 VOCABULARY:
Happy - Mutlu
Sad - Üzgün
Angry - Kızgın
Excited - Heyecanlı
Nervous - Gergin
Tired - Yorgun
Scared - Korkmuş
Surprised - Şaşırmış
Bored - Sıkılmış
Lonely - Yalnız
Worried - Endişeli
Confused - Kafası karışmış
Embarrassed - Utangaç
Proud - Gururlu
Calm - Sakin
Shy - Çekingen
Jealous - Kıskanç
Grateful - Minnettar
Hopeful - Umutlu
Disappointed - Hayal kırıklığına uğramış`,
  tip: "Practice using these words in context to remember them better.",

  table: [
    { en: "Happy", tr: "Mutlu" },
    { en: "Sad", tr: "Üzgün" },
    { en: "Angry", tr: "Kızgın" },
    { en: "Excited", tr: "Heyecanlı" },
    { en: "Nervous", tr: "Gergin" },
    { en: "Tired", tr: "Yorgun" },
    { en: "Scared", tr: "Korkmuş" },
    { en: "Surprised", tr: "Şaşırmış" },
    { en: "Bored", tr: "Sıkılmış" },
    { en: "Lonely", tr: "Yalnız" },
    { en: "Worried", tr: "Endişeli" },
    { en: "Confused", tr: "Kafası karışmış" },
    { en: "Embarrassed", tr: "Utangaç" },
    { en: "Proud", tr: "Gururlu" },
    { en: "Calm", tr: "Sakin" },
    { en: "Shy", tr: "Çekingen" },
    { en: "Jealous", tr: "Kıskanç" },
    { en: "Grateful", tr: "Minnettar" },
    { en: "Hopeful", tr: "Umutlu" },
    { en: "Disappointed", tr: "Hayal kırıklığına uğramış" },
  ],

  speakingPractice: [
    { question: "What does \"Happy\" mean in Turkish?", answer: "It means \"Mutlu\"." },
    { question: "Can you use \"Sad\" in a sentence?", answer: "Yes, for example: I saw a Sad yesterday." },
    { question: "How do you say \"Kızgın\" in English?", answer: "You say \"Angry\"." },
    { question: "What is the English word for \"Heyecanlı\"?", answer: "The English word is \"Excited\"." },
    { question: "Do you know what \"Nervous\" is?", answer: "Yes, \"Nervous\" is \"Gergin\" in Turkish." },
    { question: "Can you translate \"Tired\" to Turkish?", answer: "Sure, it's \"Yorgun\"." },
    { question: "What's another way to say \"Scared\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"Surprised\"?", answer: "You might use it when talking about Şaşırmış." },
    { question: "Is \"Bored\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"Lonely\" in conversation?", answer: "Yes, I use it when I talk about Yalnız." },
    { question: "What does \"Worried\" mean in Turkish?", answer: "It means \"Endişeli\"." },
    { question: "Can you use \"Confused\" in a sentence?", answer: "Yes, for example: I saw a Confused yesterday." },
    { question: "How do you say \"Utangaç\" in English?", answer: "You say \"Embarrassed\"." },
    { question: "What is the English word for \"Gururlu\"?", answer: "The English word is \"Proud\"." },
    { question: "Do you know what \"Calm\" is?", answer: "Yes, \"Calm\" is \"Sakin\" in Turkish." },
    { question: "Can you translate \"Shy\" to Turkish?", answer: "Sure, it's \"Çekingen\"." },
    { question: "What's another way to say \"Jealous\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"Grateful\"?", answer: "You might use it when talking about Minnettar." },
    { question: "Is \"Hopeful\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"Disappointed\" in conversation?", answer: "Yes, I use it when I talk about Hayal kırıklığına uğramış." },
    { question: "What does \"Happy\" mean in Turkish?", answer: "It means \"Mutlu\"." },
    { question: "Can you use \"Sad\" in a sentence?", answer: "Yes, for example: I saw a Sad yesterday." },
    { question: "How do you say \"Kızgın\" in English?", answer: "You say \"Angry\"." },
    { question: "What is the English word for \"Heyecanlı\"?", answer: "The English word is \"Excited\"." },
    { question: "Do you know what \"Nervous\" is?", answer: "Yes, \"Nervous\" is \"Gergin\" in Turkish." },
    { question: "Can you translate \"Tired\" to Turkish?", answer: "Sure, it's \"Yorgun\"." },
    { question: "What's another way to say \"Scared\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"Surprised\"?", answer: "You might use it when talking about Şaşırmış." },
    { question: "Is \"Bored\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"Lonely\" in conversation?", answer: "Yes, I use it when I talk about Yalnız." },
    { question: "What does \"Worried\" mean in Turkish?", answer: "It means \"Endişeli\"." },
    { question: "Can you use \"Confused\" in a sentence?", answer: "Yes, for example: I saw a Confused yesterday." },
    { question: "How do you say \"Utangaç\" in English?", answer: "You say \"Embarrassed\"." },
    { question: "What is the English word for \"Gururlu\"?", answer: "The English word is \"Proud\"." },
    { question: "Do you know what \"Calm\" is?", answer: "Yes, \"Calm\" is \"Sakin\" in Turkish." },
    { question: "Can you translate \"Shy\" to Turkish?", answer: "Sure, it's \"Çekingen\"." },
    { question: "What's another way to say \"Jealous\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"Grateful\"?", answer: "You might use it when talking about Minnettar." },
    { question: "Is \"Hopeful\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"Disappointed\" in conversation?", answer: "Yes, I use it when I talk about Hayal kırıklığına uğramış." },
  ]
};


const MODULE_96_DATA = {
  title: "Nature and Environment Vocabulary",
  description: "Learn essential vocabulary and phrases",
  intro: `

📚 VOCABULARY:
Nature - Doğa
Environment - Çevre
Forest - Orman
Mountain - Dağ
River - Nehir
Lake - Göl
Ocean - Okyanus
Beach - Sahil
Desert - Çöl
Island - Ada
Tree - Ağaç
Plant - Bitki
Animal - Hayvan
Wildlife - Vahşi yaşam
Pollution - Kirlilik
Recycling - Geri dönüşüm
Climate - İklim
Global warming - Küresel ısınma
Rain - Yağmur
Sunshine - Güneş ışığı`,
  tip: "Practice using these words in context to remember them better.",

  table: [
    { en: "Nature", tr: "Doğa" },
    { en: "Environment", tr: "Çevre" },
    { en: "Forest", tr: "Orman" },
    { en: "Mountain", tr: "Dağ" },
    { en: "River", tr: "Nehir" },
    { en: "Lake", tr: "Göl" },
    { en: "Ocean", tr: "Okyanus" },
    { en: "Beach", tr: "Sahil" },
    { en: "Desert", tr: "Çöl" },
    { en: "Island", tr: "Ada" },
    { en: "Tree", tr: "Ağaç" },
    { en: "Plant", tr: "Bitki" },
    { en: "Animal", tr: "Hayvan" },
    { en: "Wildlife", tr: "Vahşi yaşam" },
    { en: "Pollution", tr: "Kirlilik" },
    { en: "Recycling", tr: "Geri dönüşüm" },
    { en: "Climate", tr: "İklim" },
    { en: "Global warming", tr: "Küresel ısınma" },
    { en: "Rain", tr: "Yağmur" },
    { en: "Sunshine", tr: "Güneş ışığı" },
  ],

  speakingPractice: [
    { question: "What does \"Nature\" mean in Turkish?", answer: "It means \"Doğa\"." },
    { question: "Can you use \"Environment\" in a sentence?", answer: "Yes, for example: I saw a Environment yesterday." },
    { question: "How do you say \"Orman\" in English?", answer: "You say \"Forest\"." },
    { question: "What is the English word for \"Dağ\"?", answer: "The English word is \"Mountain\"." },
    { question: "Do you know what \"River\" is?", answer: "Yes, \"River\" is \"Nehir\" in Turkish." },
    { question: "Can you translate \"Lake\" to Turkish?", answer: "Sure, it's \"Göl\"." },
    { question: "What's another way to say \"Ocean\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"Beach\"?", answer: "You might use it when talking about Sahil." },
    { question: "Is \"Desert\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"Island\" in conversation?", answer: "Yes, I use it when I talk about Ada." },
    { question: "What does \"Tree\" mean in Turkish?", answer: "It means \"Ağaç\"." },
    { question: "Can you use \"Plant\" in a sentence?", answer: "Yes, for example: I saw a Plant yesterday." },
    { question: "How do you say \"Hayvan\" in English?", answer: "You say \"Animal\"." },
    { question: "What is the English word for \"Vahşi yaşam\"?", answer: "The English word is \"Wildlife\"." },
    { question: "Do you know what \"Pollution\" is?", answer: "Yes, \"Pollution\" is \"Kirlilik\" in Turkish." },
    { question: "Can you translate \"Recycling\" to Turkish?", answer: "Sure, it's \"Geri dönüşüm\"." },
    { question: "What's another way to say \"Climate\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"Global warming\"?", answer: "You might use it when talking about Küresel ısınma." },
    { question: "Is \"Rain\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"Sunshine\" in conversation?", answer: "Yes, I use it when I talk about Güneş ışığı." },
    { question: "What does \"Nature\" mean in Turkish?", answer: "It means \"Doğa\"." },
    { question: "Can you use \"Environment\" in a sentence?", answer: "Yes, for example: I saw a Environment yesterday." },
    { question: "How do you say \"Orman\" in English?", answer: "You say \"Forest\"." },
    { question: "What is the English word for \"Dağ\"?", answer: "The English word is \"Mountain\"." },
    { question: "Do you know what \"River\" is?", answer: "Yes, \"River\" is \"Nehir\" in Turkish." },
    { question: "Can you translate \"Lake\" to Turkish?", answer: "Sure, it's \"Göl\"." },
    { question: "What's another way to say \"Ocean\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"Beach\"?", answer: "You might use it when talking about Sahil." },
    { question: "Is \"Desert\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"Island\" in conversation?", answer: "Yes, I use it when I talk about Ada." },
    { question: "What does \"Tree\" mean in Turkish?", answer: "It means \"Ağaç\"." },
    { question: "Can you use \"Plant\" in a sentence?", answer: "Yes, for example: I saw a Plant yesterday." },
    { question: "How do you say \"Hayvan\" in English?", answer: "You say \"Animal\"." },
    { question: "What is the English word for \"Vahşi yaşam\"?", answer: "The English word is \"Wildlife\"." },
    { question: "Do you know what \"Pollution\" is?", answer: "Yes, \"Pollution\" is \"Kirlilik\" in Turkish." },
    { question: "Can you translate \"Recycling\" to Turkish?", answer: "Sure, it's \"Geri dönüşüm\"." },
    { question: "What's another way to say \"Climate\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"Global warming\"?", answer: "You might use it when talking about Küresel ısınma." },
    { question: "Is \"Rain\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"Sunshine\" in conversation?", answer: "Yes, I use it when I talk about Güneş ışığı." },
  ]
};


const MODULE_97_DATA = {
  title: "Entertainment Vocabulary (Movies, Music)",
  description: "Learn essential vocabulary and phrases",
  intro: `

📚 VOCABULARY:
Movie - Film
Film - Film
Actor - Erkek oyuncu
Actress - Kadın oyuncu
Director - Yönetmen
Scene - Sahne
Genre - Tür
Comedy - Komedi
Drama - Drama
Action - Aksiyon
Horror - Korku
Soundtrack - Film müziği
Concert - Konser
Song - Şarkı
Singer - Şarkıcı
Musician - Müzisyen
Band - Grup
Instrument - Enstrüman
Guitar - Gitar
Piano - Piyano`,
  tip: "Practice using these words in context to remember them better.",

  table: [
    { en: "Movie", tr: "Film" },
    { en: "Film", tr: "Film" },
    { en: "Actor", tr: "Erkek oyuncu" },
    { en: "Actress", tr: "Kadın oyuncu" },
    { en: "Director", tr: "Yönetmen" },
    { en: "Scene", tr: "Sahne" },
    { en: "Genre", tr: "Tür" },
    { en: "Comedy", tr: "Komedi" },
    { en: "Drama", tr: "Drama" },
    { en: "Action", tr: "Aksiyon" },
    { en: "Horror", tr: "Korku" },
    { en: "Soundtrack", tr: "Film müziği" },
    { en: "Concert", tr: "Konser" },
    { en: "Song", tr: "Şarkı" },
    { en: "Singer", tr: "Şarkıcı" },
    { en: "Musician", tr: "Müzisyen" },
    { en: "Band", tr: "Grup" },
    { en: "Instrument", tr: "Enstrüman" },
    { en: "Guitar", tr: "Gitar" },
    { en: "Piano", tr: "Piyano" },
  ],

  speakingPractice: [
    { question: "What does \"Movie\" mean in Turkish?", answer: "It means \"Film\"." },
    { question: "Can you use \"Film\" in a sentence?", answer: "Yes, for example: I saw a Film yesterday." },
    { question: "How do you say \"Erkek oyuncu\" in English?", answer: "You say \"Actor\"." },
    { question: "What is the English word for \"Kadın oyuncu\"?", answer: "The English word is \"Actress\"." },
    { question: "Do you know what \"Director\" is?", answer: "Yes, \"Director\" is \"Yönetmen\" in Turkish." },
    { question: "Can you translate \"Scene\" to Turkish?", answer: "Sure, it's \"Sahne\"." },
    { question: "What's another way to say \"Genre\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"Comedy\"?", answer: "You might use it when talking about Komedi." },
    { question: "Is \"Drama\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"Action\" in conversation?", answer: "Yes, I use it when I talk about Aksiyon." },
    { question: "What does \"Horror\" mean in Turkish?", answer: "It means \"Korku\"." },
    { question: "Can you use \"Soundtrack\" in a sentence?", answer: "Yes, for example: I saw a Soundtrack yesterday." },
    { question: "How do you say \"Konser\" in English?", answer: "You say \"Concert\"." },
    { question: "What is the English word for \"Şarkı\"?", answer: "The English word is \"Song\"." },
    { question: "Do you know what \"Singer\" is?", answer: "Yes, \"Singer\" is \"Şarkıcı\" in Turkish." },
    { question: "Can you translate \"Musician\" to Turkish?", answer: "Sure, it's \"Müzisyen\"." },
    { question: "What's another way to say \"Band\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"Instrument\"?", answer: "You might use it when talking about Enstrüman." },
    { question: "Is \"Guitar\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"Piano\" in conversation?", answer: "Yes, I use it when I talk about Piyano." },
    { question: "What does \"Movie\" mean in Turkish?", answer: "It means \"Film\"." },
    { question: "Can you use \"Film\" in a sentence?", answer: "Yes, for example: I saw a Film yesterday." },
    { question: "How do you say \"Erkek oyuncu\" in English?", answer: "You say \"Actor\"." },
    { question: "What is the English word for \"Kadın oyuncu\"?", answer: "The English word is \"Actress\"." },
    { question: "Do you know what \"Director\" is?", answer: "Yes, \"Director\" is \"Yönetmen\" in Turkish." },
    { question: "Can you translate \"Scene\" to Turkish?", answer: "Sure, it's \"Sahne\"." },
    { question: "What's another way to say \"Genre\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"Comedy\"?", answer: "You might use it when talking about Komedi." },
    { question: "Is \"Drama\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"Action\" in conversation?", answer: "Yes, I use it when I talk about Aksiyon." },
    { question: "What does \"Horror\" mean in Turkish?", answer: "It means \"Korku\"." },
    { question: "Can you use \"Soundtrack\" in a sentence?", answer: "Yes, for example: I saw a Soundtrack yesterday." },
    { question: "How do you say \"Konser\" in English?", answer: "You say \"Concert\"." },
    { question: "What is the English word for \"Şarkı\"?", answer: "The English word is \"Song\"." },
    { question: "Do you know what \"Singer\" is?", answer: "Yes, \"Singer\" is \"Şarkıcı\" in Turkish." },
    { question: "Can you translate \"Musician\" to Turkish?", answer: "Sure, it's \"Müzisyen\"." },
    { question: "What's another way to say \"Band\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"Instrument\"?", answer: "You might use it when talking about Enstrüman." },
    { question: "Is \"Guitar\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"Piano\" in conversation?", answer: "Yes, I use it when I talk about Piyano." },
  ]
};


const MODULE_98_DATA = {
  title: "Describing People (Appearance, Personality)",
  description: "Learn essential vocabulary and phrases",
  intro: `

📚 VOCABULARY:
Tall - Uzun boylu
Short - Kısa boylu
Slim - Zayıf
Fat - Şişman
Young - Genç
Old - Yaşlı
Beautiful - Güzel
Handsome - Yakışıklı
Pretty - Hoş, sevimli
Friendly - Arkadaş canlısı
Shy - Utangaç
Funny - Komik
Serious - Ciddi
Kind - Nazik
Smart - Zeki
Lazy - Tembel
Hard-working - Çalışkan
Polite - Kibar
Rude - Kaba
Creative - Yaratıcı`,
  tip: "Practice using these words in context to remember them better.",

  table: [
    { en: "Tall", tr: "Uzun boylu" },
    { en: "Short", tr: "Kısa boylu" },
    { en: "Slim", tr: "Zayıf" },
    { en: "Fat", tr: "Şişman" },
    { en: "Young", tr: "Genç" },
    { en: "Old", tr: "Yaşlı" },
    { en: "Beautiful", tr: "Güzel" },
    { en: "Handsome", tr: "Yakışıklı" },
    { en: "Pretty", tr: "Hoş, sevimli" },
    { en: "Friendly", tr: "Arkadaş canlısı" },
    { en: "Shy", tr: "Utangaç" },
    { en: "Funny", tr: "Komik" },
    { en: "Serious", tr: "Ciddi" },
    { en: "Kind", tr: "Nazik" },
    { en: "Smart", tr: "Zeki" },
    { en: "Lazy", tr: "Tembel" },
    { en: "Hard-working", tr: "Çalışkan" },
    { en: "Polite", tr: "Kibar" },
    { en: "Rude", tr: "Kaba" },
    { en: "Creative", tr: "Yaratıcı" },
  ],

  speakingPractice: [
    { question: "What does \"Tall\" mean in Turkish?", answer: "It means \"Uzun boylu\"." },
    { question: "Can you use \"Short\" in a sentence?", answer: "Yes, for example: I saw a Short yesterday." },
    { question: "How do you say \"Zayıf\" in English?", answer: "You say \"Slim\"." },
    { question: "What is the English word for \"Şişman\"?", answer: "The English word is \"Fat\"." },
    { question: "Do you know what \"Young\" is?", answer: "Yes, \"Young\" is \"Genç\" in Turkish." },
    { question: "Can you translate \"Old\" to Turkish?", answer: "Sure, it's \"Yaşlı\"." },
    { question: "What's another way to say \"Beautiful\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"Handsome\"?", answer: "You might use it when talking about Yakışıklı." },
    { question: "Is \"Pretty\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"Friendly\" in conversation?", answer: "Yes, I use it when I talk about Arkadaş canlısı." },
    { question: "What does \"Shy\" mean in Turkish?", answer: "It means \"Utangaç\"." },
    { question: "Can you use \"Funny\" in a sentence?", answer: "Yes, for example: I saw a Funny yesterday." },
    { question: "How do you say \"Ciddi\" in English?", answer: "You say \"Serious\"." },
    { question: "What is the English word for \"Nazik\"?", answer: "The English word is \"Kind\"." },
    { question: "Do you know what \"Smart\" is?", answer: "Yes, \"Smart\" is \"Zeki\" in Turkish." },
    { question: "Can you translate \"Lazy\" to Turkish?", answer: "Sure, it's \"Tembel\"." },
    { question: "What's another way to say \"Hard-working\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"Polite\"?", answer: "You might use it when talking about Kibar." },
    { question: "Is \"Rude\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"Creative\" in conversation?", answer: "Yes, I use it when I talk about Yaratıcı." },
    { question: "What does \"Tall\" mean in Turkish?", answer: "It means \"Uzun boylu\"." },
    { question: "Can you use \"Short\" in a sentence?", answer: "Yes, for example: I saw a Short yesterday." },
    { question: "How do you say \"Zayıf\" in English?", answer: "You say \"Slim\"." },
    { question: "What is the English word for \"Şişman\"?", answer: "The English word is \"Fat\"." },
    { question: "Do you know what \"Young\" is?", answer: "Yes, \"Young\" is \"Genç\" in Turkish." },
    { question: "Can you translate \"Old\" to Turkish?", answer: "Sure, it's \"Yaşlı\"." },
    { question: "What's another way to say \"Beautiful\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"Handsome\"?", answer: "You might use it when talking about Yakışıklı." },
    { question: "Is \"Pretty\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"Friendly\" in conversation?", answer: "Yes, I use it when I talk about Arkadaş canlısı." },
    { question: "What does \"Shy\" mean in Turkish?", answer: "It means \"Utangaç\"." },
    { question: "Can you use \"Funny\" in a sentence?", answer: "Yes, for example: I saw a Funny yesterday." },
    { question: "How do you say \"Ciddi\" in English?", answer: "You say \"Serious\"." },
    { question: "What is the English word for \"Nazik\"?", answer: "The English word is \"Kind\"." },
    { question: "Do you know what \"Smart\" is?", answer: "Yes, \"Smart\" is \"Zeki\" in Turkish." },
    { question: "Can you translate \"Lazy\" to Turkish?", answer: "Sure, it's \"Tembel\"." },
    { question: "What's another way to say \"Hard-working\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"Polite\"?", answer: "You might use it when talking about Kibar." },
    { question: "Is \"Rude\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"Creative\" in conversation?", answer: "Yes, I use it when I talk about Yaratıcı." },
  ]
};


const MODULE_99_DATA = {
  title: "Describing Places (Towns, Cities, Nature)",
  description: "Learn essential vocabulary and phrases",
  intro: `

📚 VOCABULARY:
City - Şehir
Town - Kasaba
Village - Köy
Modern - Modern
Historic - Tarihi
Crowded - Kalabalık
Quiet - Sessiz
Beautiful - Güzel
Ugly - Çirkin
Clean - Temiz
Dirty - Kirli
Safe - Güvenli
Dangerous - Tehlikeli
Park - Park
Building - Bina
Street - Cadde
Mountain - Dağ
River - Nehir
Beach - Sahil
Lake - Göl`,
  tip: "Practice using these words in context to remember them better.",

  table: [
    { en: "City", tr: "Şehir" },
    { en: "Town", tr: "Kasaba" },
    { en: "Village", tr: "Köy" },
    { en: "Modern", tr: "Modern" },
    { en: "Historic", tr: "Tarihi" },
    { en: "Crowded", tr: "Kalabalık" },
    { en: "Quiet", tr: "Sessiz" },
    { en: "Beautiful", tr: "Güzel" },
    { en: "Ugly", tr: "Çirkin" },
    { en: "Clean", tr: "Temiz" },
    { en: "Dirty", tr: "Kirli" },
    { en: "Safe", tr: "Güvenli" },
    { en: "Dangerous", tr: "Tehlikeli" },
    { en: "Park", tr: "Park" },
    { en: "Building", tr: "Bina" },
    { en: "Street", tr: "Cadde" },
    { en: "Mountain", tr: "Dağ" },
    { en: "River", tr: "Nehir" },
    { en: "Beach", tr: "Sahil" },
    { en: "Lake", tr: "Göl" },
  ],

  speakingPractice: [
    { question: "What does \"City\" mean in Turkish?", answer: "It means \"Şehir\"." },
    { question: "Can you use \"Town\" in a sentence?", answer: "Yes, for example: I saw a Town yesterday." },
    { question: "How do you say \"Köy\" in English?", answer: "You say \"Village\"." },
    { question: "What is the English word for \"Modern\"?", answer: "The English word is \"Modern\"." },
    { question: "Do you know what \"Historic\" is?", answer: "Yes, \"Historic\" is \"Tarihi\" in Turkish." },
    { question: "Can you translate \"Crowded\" to Turkish?", answer: "Sure, it's \"Kalabalık\"." },
    { question: "What's another way to say \"Quiet\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"Beautiful\"?", answer: "You might use it when talking about Güzel." },
    { question: "Is \"Ugly\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"Clean\" in conversation?", answer: "Yes, I use it when I talk about Temiz." },
    { question: "What does \"Dirty\" mean in Turkish?", answer: "It means \"Kirli\"." },
    { question: "Can you use \"Safe\" in a sentence?", answer: "Yes, for example: I saw a Safe yesterday." },
    { question: "How do you say \"Tehlikeli\" in English?", answer: "You say \"Dangerous\"." },
    { question: "What is the English word for \"Park\"?", answer: "The English word is \"Park\"." },
    { question: "Do you know what \"Building\" is?", answer: "Yes, \"Building\" is \"Bina\" in Turkish." },
    { question: "Can you translate \"Street\" to Turkish?", answer: "Sure, it's \"Cadde\"." },
    { question: "What's another way to say \"Mountain\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"River\"?", answer: "You might use it when talking about Nehir." },
    { question: "Is \"Beach\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"Lake\" in conversation?", answer: "Yes, I use it when I talk about Göl." },
    { question: "What does \"City\" mean in Turkish?", answer: "It means \"Şehir\"." },
    { question: "Can you use \"Town\" in a sentence?", answer: "Yes, for example: I saw a Town yesterday." },
    { question: "How do you say \"Köy\" in English?", answer: "You say \"Village\"." },
    { question: "What is the English word for \"Modern\"?", answer: "The English word is \"Modern\"." },
    { question: "Do you know what \"Historic\" is?", answer: "Yes, \"Historic\" is \"Tarihi\" in Turkish." },
    { question: "Can you translate \"Crowded\" to Turkish?", answer: "Sure, it's \"Kalabalık\"." },
    { question: "What's another way to say \"Quiet\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"Beautiful\"?", answer: "You might use it when talking about Güzel." },
    { question: "Is \"Ugly\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"Clean\" in conversation?", answer: "Yes, I use it when I talk about Temiz." },
    { question: "What does \"Dirty\" mean in Turkish?", answer: "It means \"Kirli\"." },
    { question: "Can you use \"Safe\" in a sentence?", answer: "Yes, for example: I saw a Safe yesterday." },
    { question: "How do you say \"Tehlikeli\" in English?", answer: "You say \"Dangerous\"." },
    { question: "What is the English word for \"Park\"?", answer: "The English word is \"Park\"." },
    { question: "Do you know what \"Building\" is?", answer: "Yes, \"Building\" is \"Bina\" in Turkish." },
    { question: "Can you translate \"Street\" to Turkish?", answer: "Sure, it's \"Cadde\"." },
    { question: "What's another way to say \"Mountain\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"River\"?", answer: "You might use it when talking about Nehir." },
    { question: "Is \"Beach\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"Lake\" in conversation?", answer: "Yes, I use it when I talk about Göl." },
  ]
};


const MODULE_100_DATA = {
  title: "Giving Directions and Instructions",
  description: "Learn essential vocabulary and phrases",
  intro: `

📚 VOCABULARY:
Turn left - Sola dön
Turn right - Sağa dön
Go straight - Dümdüz git
Cross the street - Sokağı geç
Traffic light - Trafik ışığı
Intersection - Kavşak
Next to - Yanında
Opposite - Karşısında
Behind - Arkasında
In front of - Önünde
Near - Yakınında
Between - Arasında
At the corner - Köşede
Go past - Geç
Stop - Dur
Follow - Takip et
Take the first left - İlk soldan dön
Take the second right - İkinci sağdan dön
Ask for help - Yardım iste
Instructions - Talimatlar`,
  tip: "Practice using these words in context to remember them better.",

  table: [
    { en: "Turn left", tr: "Sola dön" },
    { en: "Turn right", tr: "Sağa dön" },
    { en: "Go straight", tr: "Dümdüz git" },
    { en: "Cross the street", tr: "Sokağı geç" },
    { en: "Traffic light", tr: "Trafik ışığı" },
    { en: "Intersection", tr: "Kavşak" },
    { en: "Next to", tr: "Yanında" },
    { en: "Opposite", tr: "Karşısında" },
    { en: "Behind", tr: "Arkasında" },
    { en: "In front of", tr: "Önünde" },
    { en: "Near", tr: "Yakınında" },
    { en: "Between", tr: "Arasında" },
    { en: "At the corner", tr: "Köşede" },
    { en: "Go past", tr: "Geç" },
    { en: "Stop", tr: "Dur" },
    { en: "Follow", tr: "Takip et" },
    { en: "Take the first left", tr: "İlk soldan dön" },
    { en: "Take the second right", tr: "İkinci sağdan dön" },
    { en: "Ask for help", tr: "Yardım iste" },
    { en: "Instructions", tr: "Talimatlar" },
  ],

  speakingPractice: [
    { question: "What does \"Turn left\" mean in Turkish?", answer: "It means \"Sola dön\"." },
    { question: "Can you use \"Turn right\" in a sentence?", answer: "Yes, for example: I saw a Turn right yesterday." },
    { question: "How do you say \"Dümdüz git\" in English?", answer: "You say \"Go straight\"." },
    { question: "What is the English word for \"Sokağı geç\"?", answer: "The English word is \"Cross the street\"." },
    { question: "Do you know what \"Traffic light\" is?", answer: "Yes, \"Traffic light\" is \"Trafik ışığı\" in Turkish." },
    { question: "Can you translate \"Intersection\" to Turkish?", answer: "Sure, it's \"Kavşak\"." },
    { question: "What's another way to say \"Next to\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"Opposite\"?", answer: "You might use it when talking about Karşısında." },
    { question: "Is \"Behind\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"In front of\" in conversation?", answer: "Yes, I use it when I talk about Önünde." },
    { question: "What does \"Near\" mean in Turkish?", answer: "It means \"Yakınında\"." },
    { question: "Can you use \"Between\" in a sentence?", answer: "Yes, for example: I saw a Between yesterday." },
    { question: "How do you say \"Köşede\" in English?", answer: "You say \"At the corner\"." },
    { question: "What is the English word for \"Geç\"?", answer: "The English word is \"Go past\"." },
    { question: "Do you know what \"Stop\" is?", answer: "Yes, \"Stop\" is \"Dur\" in Turkish." },
    { question: "Can you translate \"Follow\" to Turkish?", answer: "Sure, it's \"Takip et\"." },
    { question: "What's another way to say \"Take the first left\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"Take the second right\"?", answer: "You might use it when talking about İkinci sağdan dön." },
    { question: "Is \"Ask for help\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"Instructions\" in conversation?", answer: "Yes, I use it when I talk about Talimatlar." },
    { question: "What does \"Turn left\" mean in Turkish?", answer: "It means \"Sola dön\"." },
    { question: "Can you use \"Turn right\" in a sentence?", answer: "Yes, for example: I saw a Turn right yesterday." },
    { question: "How do you say \"Dümdüz git\" in English?", answer: "You say \"Go straight\"." },
    { question: "What is the English word for \"Sokağı geç\"?", answer: "The English word is \"Cross the street\"." },
    { question: "Do you know what \"Traffic light\" is?", answer: "Yes, \"Traffic light\" is \"Trafik ışığı\" in Turkish." },
    { question: "Can you translate \"Intersection\" to Turkish?", answer: "Sure, it's \"Kavşak\"." },
    { question: "What's another way to say \"Next to\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"Opposite\"?", answer: "You might use it when talking about Karşısında." },
    { question: "Is \"Behind\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"In front of\" in conversation?", answer: "Yes, I use it when I talk about Önünde." },
    { question: "What does \"Near\" mean in Turkish?", answer: "It means \"Yakınında\"." },
    { question: "Can you use \"Between\" in a sentence?", answer: "Yes, for example: I saw a Between yesterday." },
    { question: "How do you say \"Köşede\" in English?", answer: "You say \"At the corner\"." },
    { question: "What is the English word for \"Geç\"?", answer: "The English word is \"Go past\"." },
    { question: "Do you know what \"Stop\" is?", answer: "Yes, \"Stop\" is \"Dur\" in Turkish." },
    { question: "Can you translate \"Follow\" to Turkish?", answer: "Sure, it's \"Takip et\"." },
    { question: "What's another way to say \"Take the first left\"?", answer: "You could also use a synonym depending on context." },
    { question: "Where might you use the word \"Take the second right\"?", answer: "You might use it when talking about İkinci sağdan dön." },
    { question: "Is \"Ask for help\" a noun or a verb?", answer: "It depends on the context, but typically it's used as a noun." },
    { question: "Have you ever used \"Instructions\" in conversation?", answer: "Yes, I use it when I talk about Talimatlar." },
  ]
};


// B1 Level Module Data (101-110)

// Module 101 Data: Present Perfect Continuous (I've been working)
const MODULE_101_DATA = {
  title: "Module 101 - Present Perfect Continuous (I've been working)",
  description: "Learn the structure and use of the Present Perfect Continuous tense",
  intro: `Bu modülde Present Perfect Continuous Tense öğreneceğiz.

📘 Konu Anlatımı (Türkçe Açıklama)
Present Perfect Continuous Tense (Şimdiki Zamanın Hikâyesi), geçmişte başlamış ve hâlen devam eden ya da yeni bitmiş ve etkisi süren eylemleri anlatmak için kullanılır. Yapısı: have/has + been + V-ing şeklindedir.
Örnek: I've been studying all day. (Tüm gün boyunca ders çalışıyorum / çalışıyordum.)

📗 Structure
✅ Positive: Subject + have/has + been + verb-ing
✅ Negative: Subject + haven't/hasn't + been + verb-ing
✅ Question: Have/Has + subject + been + verb-ing?

🧩 Uses
1. Actions that started in the past and are still happening:
   - She has been working here since 2019.
2. Actions that have recently stopped but have present results:
   - I'm tired because I've been running.
3. To emphasize the duration of an activity:
   - They've been talking for over an hour.

🧠 Example Sentences
I've been learning English for three years.
She has been cooking since this morning.
They've been arguing all day.
Has he been working out recently?
We haven't been sleeping well lately.`,
  tip: "Use have/has + been + verb-ing for ongoing actions",
  
  speakingPractice: [
    { question: "Why are your hands dirty?", answer: "Because I've been fixing my bike." },
    { question: "Have you been studying for the exam?", answer: "Yes, I've been studying every evening this week." },
    { question: "What have you been doing all day?", answer: "I've been helping my brother move into his new apartment." },
    { question: "Why is she so tired?", answer: "She's been working two jobs lately." },
    { question: "Has it been raining all morning?", answer: "Yes, and the streets are completely flooded." },
    { question: "What have they been watching on TV?", answer: "They've been watching a documentary about climate change." },
    { question: "How long have you been waiting for the bus?", answer: "I've been waiting for over 30 minutes." },
    { question: "Have you been feeling okay?", answer: "Not really, I've been feeling a bit dizzy since yesterday." },
    { question: "Why is he out of breath?", answer: "Because he's been running around the park." },
    { question: "Where have you been hiding?", answer: "I've been sitting quietly in the garden." },
    { question: "How long has she been learning French?", answer: "She's been learning it for almost five years." },
    { question: "What has your team been working on?", answer: "We've been developing a new app for students." },
    { question: "Why haven't you been answering your phone?", answer: "I've been in meetings all afternoon." },
    { question: "Have they been using the new software?", answer: "Yes, they've been testing it since Monday." },
    { question: "What have you been thinking about?", answer: "I've been thinking about changing jobs." },
    { question: "Have you been reading anything interesting lately?", answer: "Yes, I've been reading a novel about World War II." },
    { question: "Why are your clothes wet?", answer: "Because I've been walking in the rain." },
    { question: "How long has he been living abroad?", answer: "He's been living in Germany since 2018." },
    { question: "What have the children been doing?", answer: "They've been painting the walls in their room." },
    { question: "Have you been listening to the news?", answer: "Yes, I've been following the latest updates about the election." },
    { question: "Why is your desk so messy?", answer: "Because I've been organizing my papers." },
    { question: "Has she been waiting long?", answer: "Yes, she's been waiting for nearly an hour." },
    { question: "What have you been eating recently?", answer: "I've been eating more vegetables and less sugar." },
    { question: "How long have they been dating?", answer: "They've been dating for about six months." },
    { question: "Has he been practicing the guitar?", answer: "Yes, and he's getting much better." },
    { question: "Have you been working out?", answer: "Yes, I've been going to the gym three times a week." },
    { question: "What has she been complaining about?", answer: "She's been complaining about the noise from upstairs." },
    { question: "Have you been taking any courses?", answer: "Yes, I've been taking an online design course." },
    { question: "Why is your voice so hoarse?", answer: "Because I've been talking all day without a break." },
    { question: "Have you been following the news lately?", answer: "Yes, especially the international stories." },
    { question: "What has your team been discussing?", answer: "We've been discussing our marketing strategy." },
    { question: "Why have you been skipping classes?", answer: "I've been feeling unwell recently." },
    { question: "Has he been feeling better?", answer: "Yes, he's been recovering slowly." },
    { question: "Have you been using that new app?", answer: "Yes, it's actually very helpful." },
    { question: "How long has she been working here?", answer: "She's been working here for almost a decade." },
    { question: "What have you been planning?", answer: "I've been planning a surprise party for my sister." },
    { question: "Have they been trying to contact you?", answer: "Yes, they've been calling me all morning." },
    { question: "Why have you been waking up so early?", answer: "I've been trying a new morning routine." },
    { question: "Have you been getting enough sleep?", answer: "Not really, I've been staying up late lately." },
    { question: "What have you been writing?", answer: "I've been working on a short story for my class." }
  ]
};

// Module 103 Data: Past Perfect – Affirmative  
const MODULE_103_DATA = {
  title: "Module 103 - Past Perfect – Affirmative",
  description: "Learn how to form Past Perfect Tense in affirmative sentences",
  intro: `Bu modülde Past Perfect Tense'in olumlu halini öğreneceğiz.

📘 Konu Anlatımı (Türkçe Açıklama)
Past Perfect Tense (had + V3), geçmişteki bir olaydan daha önce gerçekleşmiş başka bir olayı anlatmak için kullanılır.
Yapı: Subject + had + V3 (past participle)

Örnek:
- She had left before I arrived. (Ben gelmeden önce o çıkmıştı.)

📗 Structure & Usage
✅ Structure: Subject + had + past participle (V3)
→ Used to show that one action happened before another action or time in the past.

Examples:
- I had finished my homework before dinner.
- They had already left when we arrived.

🧠 Example Sentences
She had already gone to bed when I called her.
We had eaten dinner by the time they arrived.
He had never seen the sea before that day.
I had studied French before I moved to Paris.
The train had left before we reached the station.`,
  tip: "Use had + past participle to show an action completed before another past action",
  
  speakingPractice: [
    { question: "What had you done before the guests arrived?", answer: "I had cleaned the whole house." },
    { question: "Had she already finished her meal before you arrived?", answer: "Yes, she had finished it." },
    { question: "Where had they gone before the meeting started?", answer: "They had gone to the café." },
    { question: "Why was the floor wet?", answer: "Because someone had spilled water." },
    { question: "What had he said before he left?", answer: "He had said he was tired." },
    { question: "Had you completed your report before the deadline?", answer: "Yes, I had completed it a day early." },
    { question: "Had the show started when you got there?", answer: "Yes, it had already started." },
    { question: "What had she told you before the interview?", answer: "She had told me to stay calm." },
    { question: "Why were they so happy?", answer: "Because they had won the game." },
    { question: "Had the children eaten before going to school?", answer: "Yes, they had eaten breakfast." },
    { question: "What had you prepared for the trip?", answer: "I had packed clothes and food." },
    { question: "Where had he worked before moving to this city?", answer: "He had worked in a bank." },
    { question: "Why was she crying?", answer: "She had lost her wallet." },
    { question: "Had they booked the hotel in advance?", answer: "Yes, they had booked it online." },
    { question: "What had you learned before starting the course?", answer: "I had learned some basic grammar." },
    { question: "Had your team trained enough for the tournament?", answer: "Yes, they had trained for months." },
    { question: "What had he done before the fire started?", answer: "He had turned off the stove." },
    { question: "Had she taken the medicine before sleeping?", answer: "Yes, she had taken it as advised." },
    { question: "Where had you lived before Istanbul?", answer: "I had lived in Ankara." },
    { question: "What had you done with the keys?", answer: "I had put them on the table." },
    { question: "Had you studied English before high school?", answer: "Yes, I had studied it in middle school." },
    { question: "Had the plane already taken off when you arrived?", answer: "Yes, it had taken off 10 minutes earlier." },
    { question: "Why were they confused?", answer: "Because nobody had explained the rules." },
    { question: "Had your brother visited Italy before?", answer: "Yes, he had visited Rome and Venice." },
    { question: "What had your parents said about your decision?", answer: "They had supported me." },
    { question: "Had the teacher checked the homework?", answer: "Yes, she had checked all of them." },
    { question: "Had they painted the house before selling it?", answer: "Yes, they had repainted everything." },
    { question: "What had you planned for the weekend?", answer: "I had planned a hiking trip." },
    { question: "Had you met her before the party?", answer: "Yes, I had met her at a conference." },
    { question: "Why had he been angry?", answer: "Because someone had broken his phone." },
    { question: "Had your friends arrived before the movie started?", answer: "No, they hadn't. They were late." },
    { question: "What had you done before the power went out?", answer: "I had saved my document." },
    { question: "Had she already gone to work when you woke up?", answer: "Yes, she had left early." },
    { question: "Had the workers finished the project before the inspection?", answer: "Yes, they had completed everything." },
    { question: "Had it snowed before Christmas?", answer: "Yes, it had snowed a lot that week." },
    { question: "What had you dreamed about?", answer: "I had dreamed about flying." },
    { question: "Why had they left so early?", answer: "They had wanted to avoid traffic." },
    { question: "Had you ever tried sushi before that night?", answer: "No, I had never tried it before." },
    { question: "Had the meeting started on time?", answer: "Yes, it had started at 9 AM sharp." },
    { question: "Had the students done their assignments?", answer: "Yes, all of them had submitted on time." }
  ]
};

// Module 104-110 Data (simplified for quick implementation)
const MODULE_104_DATA = {
  title: "Module 104 - Past Perfect – Negative",
  description: "Learn how to form the negative of the Past Perfect tense",
  intro: `Bu modülde Past Perfect Tense'in olumsuz halini öğreneceğiz.

📘 Konu Anlatımı (Türkçe Açıklama)
Past Perfect Tense'in olumsuz hali, geçmişteki bir olaydan önce gerçekleşmemiş bir durumu anlatmak için kullanılır.
Yapı: Subject + had not (hadn't) + V3

Örnek:
- I hadn't eaten before the meeting started. (Toplantı başlamadan önce yemek yememiştim.)

📗 Structure & Usage
✅ Structure: Subject + had not (hadn't) + past participle (V3)
→ Used to show that one action had *not* happened before another action in the past.

Examples:
- They hadn't arrived when we started the dinner.
- She hadn't studied for the test, so she was nervous.

🧠 Example Sentences
•    I hadn't seen that movie before last night.
•    She hadn't met him until the party.
•    We hadn't finished our homework when the teacher came.
•    They hadn't cleaned the house before the guests arrived.
•    He hadn't heard the news before you told him.`,
  tip: "Use hadn't + past participle for negative past perfect",
  speakingPractice: [
    { question: "Why was she surprised?", answer: "Because she hadn't expected them to arrive early." },
    { question: "Had you eaten before the show?", answer: "No, I hadn't eaten anything all day." },
    { question: "Why were they late?", answer: "They hadn't checked the time." },
    { question: "Had the students done the homework?", answer: "No, they hadn't completed it." },
    { question: "Why didn't he recognize her?", answer: "He hadn't seen her in years." },
    { question: "Had she visited the museum before?", answer: "No, she hadn't been there before." },
    { question: "Why was your phone off?", answer: "Because I hadn't charged it." },
    { question: "Had you watched that movie before?", answer: "No, I hadn't even heard of it." },
    { question: "Why were they arguing?", answer: "Because he hadn't told her the truth." },
    { question: "Had she taken the medicine?", answer: "No, she hadn't remembered to take it." },
    { question: "Why did you miss the class?", answer: "I hadn't set my alarm." },
    { question: "Had you finished the report before the meeting?", answer: "No, I hadn't had time." },
    { question: "Why was the floor dirty?", answer: "They hadn't cleaned it." },
    { question: "Had the package arrived?", answer: "No, it hadn't been delivered yet." },
    { question: "Why did the teacher get angry?", answer: "Because the students hadn't studied." },
    { question: "Had your brother fed the cat?", answer: "No, he hadn't fed it yet." },
    { question: "Why was she nervous?", answer: "She hadn't prepared for the presentation." },
    { question: "Had you ever traveled alone before that trip?", answer: "No, I hadn't." },
    { question: "Why didn't you go to the event?", answer: "I hadn't received the invitation." },
    { question: "Had they taken the test before?", answer: "No, they hadn't taken it before." },
    { question: "Why didn't she bring her ID?", answer: "She hadn't known it was necessary." },
    { question: "Had the guests eaten when you arrived?", answer: "No, they hadn't started yet." },
    { question: "Why didn't you answer the phone?", answer: "I hadn't heard it ring." },
    { question: "Had he practiced enough?", answer: "No, he hadn't practiced at all." },
    { question: "Why was the door still open?", answer: "They hadn't closed it properly." },
    { question: "Had your sister told you about the plan?", answer: "No, she hadn't mentioned it." },
    { question: "Why was he upset?", answer: "Because we hadn't invited him." },
    { question: "Had the hotel room been cleaned?", answer: "No, it hadn't been cleaned yet." },
    { question: "Why did the boss get angry?", answer: "We hadn't finished the project." },
    { question: "Had the mechanic fixed the car?", answer: "No, he hadn't even looked at it." },
    { question: "Why didn't you reply to my email?", answer: "I hadn't seen it in my inbox." },
    { question: "Had your team played before the final?", answer: "No, we hadn't played together yet." },
    { question: "Why didn't you pay the bill?", answer: "I hadn't received it yet." },
    { question: "Had you known about the change?", answer: "No, I hadn't been informed." },
    { question: "Why wasn't she ready?", answer: "She hadn't packed her suitcase." },
    { question: "Had you booked the hotel?", answer: "No, I hadn't done it in time." },
    { question: "Why didn't they come?", answer: "They hadn't been invited." },
    { question: "Had the train left when you arrived?", answer: "Yes, it had. I hadn't checked the schedule." },
    { question: "Why didn't she bring her laptop?", answer: "She hadn't thought she'd need it." },
    { question: "Had he prepared for the interview?", answer: "No, he hadn't prepared well enough." }
  ]
};

const MODULE_105_DATA = {
  title: "Module 105 - Past Perfect – Questions",
  description: "Learn how to form questions in the Past Perfect tense",
  intro: `Bu modülde Past Perfect Tense ile soru sormayı öğreneceğiz.

📘 Konu Anlatımı (Türkçe Açıklama)
Past Perfect Tense ile soru sormak, geçmişteki iki olaydan hangisinin önce gerçekleştiğini öğrenmek için kullanılır.
Yapı: Had + subject + V3

Örnek:
- Had she arrived before the meeting started? (Toplantı başlamadan önce o gelmiş miydi?)

📗 Structure & Usage
✅ Structure: Had + subject + past participle (V3)?
→ Used to ask whether an action was completed before another one in the past.

Examples:
- Had they eaten before you arrived?
- Had he finished the report before the deadline?

🧠 Example Sentences
Had she ever traveled abroad before 2020?
Had you studied English before moving to Canada?
Had they cleaned the house before the guests came?
Had he told you the truth before you found out?
Had you heard the news before I called?`,
  tip: "Use Had + subject + past participle for questions",
  speakingPractice: [
    { question: "Had she met your parents before the wedding?", answer: "Yes, she had met them a few months before." },
    { question: "Had you finished your homework before dinner?", answer: "Yes, I had completed everything." },
    { question: "Had they ever seen snow before that trip?", answer: "No, they had never seen snow before." },
    { question: "Had he spoken to the manager before the meeting?", answer: "Yes, he had already discussed everything." },
    { question: "Had the team practiced before the match?", answer: "Yes, they had trained for a week." },
    { question: "Had you packed your bags before the taxi arrived?", answer: "Yes, I was ready on time." },
    { question: "Had she read the book before the test?", answer: "Yes, she had read it twice." },
    { question: "Had they visited the museum before the renovation?", answer: "Yes, they had gone last year." },
    { question: "Had you called your friend before leaving?", answer: "No, I forgot to call." },
    { question: "Had your teacher explained the topic before the quiz?", answer: "Yes, she had explained it clearly." },
    { question: "Had you ever eaten sushi before that night?", answer: "No, it was my first time." },
    { question: "Had the guests left before the rain started?", answer: "Yes, they had just left." },
    { question: "Had you been to that restaurant before?", answer: "Yes, several times." },
    { question: "Had your parents traveled abroad before?", answer: "Yes, they had been to Italy." },
    { question: "Had she finished her meal before the guests arrived?", answer: "Yes, she had already eaten." },
    { question: "Had the police arrived before the fire started?", answer: "No, they arrived a few minutes later." },
    { question: "Had the students studied enough for the exam?", answer: "Most of them had studied hard." },
    { question: "Had you heard about the event before yesterday?", answer: "No, I learned about it this morning." },
    { question: "Had they finished the construction before winter?", answer: "Yes, just in time." },
    { question: "Had your boss approved the report before the deadline?", answer: "Yes, he had signed it early." },
    { question: "Had you met her before the party?", answer: "Yes, we met at a seminar." },
    { question: "Had they booked the table before arriving?", answer: "Yes, it was reserved for us." },
    { question: "Had she washed the dishes before going to bed?", answer: "Yes, she always does." },
    { question: "Had you fed the dog before you left?", answer: "No, I forgot." },
    { question: "Had the movie started before you arrived?", answer: "Yes, I missed the beginning." },
    { question: "Had you locked the door before leaving?", answer: "Yes, I'm sure I did." },
    { question: "Had they completed the painting before the show?", answer: "Yes, everything was ready." },
    { question: "Had you met the director before the interview?", answer: "Yes, once briefly." },
    { question: "Had the sun risen when you woke up?", answer: "Yes, it was already bright." },
    { question: "Had your friend called before you texted?", answer: "No, I messaged first." },
    { question: "Had she been to that concert venue before?", answer: "Yes, she had gone there last summer." },
    { question: "Had they told you the news before anyone else?", answer: "Yes, I was the first to know." },
    { question: "Had you submitted your assignment on time?", answer: "Yes, the night before." },
    { question: "Had she told you her secret before?", answer: "No, that was the first time." },
    { question: "Had they warned you about the weather?", answer: "Yes, but I didn't believe them." },
    { question: "Had you checked the email before the meeting?", answer: "No, I missed it." },
    { question: "Had the guests eaten before the host arrived?", answer: "Yes, they had already started." },
    { question: "Had you seen that actor in another movie?", answer: "Yes, a few years ago." },
    { question: "Had your parents allowed you to travel alone before?", answer: "Yes, when I was 16." },
    { question: "Had she completed her thesis before the deadline?", answer: "Yes, and submitted it early." }
  ]
};

const MODULE_106_DATA = {
  title: "Module 106 - Past Perfect Continuous",
  description: "Understand how to use the Past Perfect Continuous Tense",
  intro: `Bu modülde Past Perfect Continuous Tense öğreneceğiz.

📘 Konu Anlatımı (Türkçe Açıklama)
Past Perfect Continuous Tense (had been + V-ing), geçmişte bir noktadan önce başlamış ve bir süre devam etmiş eylemleri anlatmak için kullanılır.
Yapı: Subject + had been + verb-ing

Örnek:
- I had been working all day before I finally took a break. (Tüm gün çalışıyordum, sonunda ara verdim.)

📗 Structure & Usage
✅ Structure: Subject + had been + verb-ing
→ Used to show that an action was happening over a period of time before something else in the past.

Examples:
- She had been studying for hours before the exam started.
- We had been waiting for the bus when it suddenly started raining.

🧠 Example Sentences
He had been living in Berlin before he moved to London.
They had been playing football for two hours before it got dark.
I had been reading that book for weeks before I finished it.
She had been feeling sick all day before she went to the doctor.
We had been walking for miles when we finally found a café.`,
  tip: "Use had been + verb-ing for ongoing past actions before another past point",
  speakingPractice: [
    { question: "What had you been doing before I arrived?", answer: "I had been cleaning the house." },
    { question: "Why were you tired last night?", answer: "I had been studying for five hours." },
    { question: "Had they been working together for a long time?", answer: "Yes, they had been working on the project for months." },
    { question: "What had she been watching?", answer: "She had been watching a documentary about space." },
    { question: "How long had you been learning Spanish before the trip?", answer: "I had been learning for over a year." },
    { question: "Had you been waiting long when the train arrived?", answer: "Yes, I had been waiting for almost 40 minutes." },
    { question: "Why were your hands dirty?", answer: "Because I had been gardening." },
    { question: "What had the children been doing all afternoon?", answer: "They had been playing in the park." },
    { question: "Where had you been working before you joined this company?", answer: "I had been working at a bank." },
    { question: "Had he been practicing the piano regularly?", answer: "Yes, he had been playing every day." },
    { question: "Why was she so angry?", answer: "She had been trying to fix the issue for hours." },
    { question: "How long had it been snowing?", answer: "It had been snowing since early morning." },
    { question: "Had they been planning the event well?", answer: "Yes, they had been preparing for weeks." },
    { question: "Had you been feeling well before the accident?", answer: "Yes, I had been completely healthy." },
    { question: "Why were they late?", answer: "They had been waiting for a taxi." },
    { question: "What had she been dreaming about?", answer: "She had been dreaming about her childhood." },
    { question: "Had you been traveling before the lockdown?", answer: "Yes, I had been traveling around Europe." },
    { question: "Why were the roads so muddy?", answer: "It had been raining all night." },
    { question: "Had he been writing his book for long?", answer: "Yes, he had been working on it for years." },
    { question: "Had you been exercising regularly?", answer: "Yes, I had been going to the gym every morning." },
    { question: "What had they been building?", answer: "They had been building a treehouse." },
    { question: "Had you been feeling stressed before the interview?", answer: "Yes, I had been very anxious." },
    { question: "Why was your shirt wet?", answer: "Because I had been walking in the rain." },
    { question: "How long had they been studying?", answer: "They had been studying for six hours." },
    { question: "Had she been preparing for the presentation?", answer: "Yes, she had been preparing all weekend." },
    { question: "Why were you out of breath?", answer: "I had been running to catch the bus." },
    { question: "What had you been thinking about?", answer: "I had been thinking about my future plans." },
    { question: "Had your parents been saving money for the trip?", answer: "Yes, they had been saving for over a year." },
    { question: "Had you been painting the house?", answer: "Yes, and I still have more to finish." },
    { question: "Why were you so sleepy?", answer: "I had been working late every night." },
    { question: "What had the manager been talking about?", answer: "He had been explaining the new company policy." },
    { question: "Had she been teaching at that school long?", answer: "Yes, she had been teaching there for ten years." },
    { question: "Had they been staying at the hotel before you arrived?", answer: "Yes, for a couple of days." },
    { question: "Why was the kitchen messy?", answer: "They had been cooking a big meal." },
    { question: "Had you been feeling better before the cold came back?", answer: "Yes, I had been recovering well." },
    { question: "How long had the team been training?", answer: "They had been training since early morning." },
    { question: "Had the kids been behaving well?", answer: "Yes, they had been calm and polite all day." },
    { question: "What had you been writing?", answer: "I had been working on a new article." },
    { question: "Why were the lights off?", answer: "We had been watching a movie." },
    { question: "Had the rain been falling heavily?", answer: "Yes, it had been pouring for hours." }
  ]
};

const MODULE_107_DATA = {
  title: "Module 107 - Future Perfect (I will have done)",
  description: "Learn to use the Future Perfect tense to describe completed actions in the future",
  intro: `Bu modülde Future Perfect Tense öğreneceğiz.

📘 Konu Anlatımı (Türkçe Açıklama)
Future Perfect Tense (will have + V3), gelecekte belirli bir zamana kadar tamamlanmış olacak eylemleri ifade etmek için kullanılır.
Yapı: Subject + will have + V3 (past participle)

Örnek:
- By next week, I will have finished this book. (Gelecek haftaya kadar bu kitabı bitirmiş olacağım.)

📗 Structure & Usage
✅ Structure: Subject + will have + past participle (V3)
→ Used to express that something will be completed before a time in the future.

Examples:
- She will have graduated by June.
- They will have built the house before winter starts.

🧠 Example Sentences
By 2026, I will have completed my master's degree.
They will have arrived by the time the movie starts.
You will have finished your homework before dinner.
He will have left work by 6 p.m.
We will have cleaned the house before the guests arrive.`,
  tip: "Use will have + past participle for actions completed before a future point",
  speakingPractice: [
    { question: "Will you have finished the project by Friday?", answer: "Yes, I will have completed it by then." },
    { question: "What will you have done by the end of this year?", answer: "I will have traveled to three different countries." },
    { question: "Will she have learned enough English to pass the exam?", answer: "Yes, she will have studied very hard." },
    { question: "By the time we get there, will they have left?", answer: "Yes, they will have already gone." },
    { question: "Will the workers have built the bridge before winter?", answer: "Yes, it will be ready by November." },
    { question: "Will you have cleaned the kitchen before your guests arrive?", answer: "Of course, it will be spotless." },
    { question: "Will he have repaired the car by tomorrow?", answer: "Yes, he will have it ready by 10 a.m." },
    { question: "What will you have achieved by the time you're 30?", answer: "I will have started my own business." },
    { question: "Will she have completed her degree by next year?", answer: "Yes, she will have graduated by June." },
    { question: "By the end of the day, what will you have done?", answer: "I will have finished my tasks and emailed the report." },
    { question: "Will the students have taken the test before lunch?", answer: "Yes, it starts at 9 a.m." },
    { question: "Will they have arrived at the station by 7?", answer: "Yes, their train arrives at 6:45." },
    { question: "Will you have finished cooking by the time they come?", answer: "Yes, dinner will be ready." },
    { question: "Will the sun have set by the time we arrive?", answer: "Probably, it sets around 8 PM." },
    { question: "How many books will you have read by summer?", answer: "I will have read at least ten." },
    { question: "Will he have completed the assignment before midnight?", answer: "Yes, he's almost done." },
    { question: "Will they have moved into their new house by October?", answer: "Yes, they move in September." },
    { question: "Will you have done all your chores by Sunday?", answer: "Yes, I plan to do them Saturday morning." },
    { question: "Will she have saved enough money for the trip?", answer: "Yes, she's very careful with her budget." },
    { question: "By the time the concert starts, will we have arrived?", answer: "Yes, we'll get there early." },
    { question: "Will the meeting have ended by 5 PM?", answer: "Yes, it usually ends by 4:30." },
    { question: "Will you have submitted the application by the deadline?", answer: "Yes, I will submit it today." },
    { question: "Will your friend have returned from vacation by then?", answer: "Yes, she'll be back two days before." },
    { question: "By next month, what will you have achieved?", answer: "I will have completed my training program." },
    { question: "Will they have finished renovating the kitchen?", answer: "Yes, the work finishes next week." },
    { question: "How long will you have worked here by December?", answer: "I will have worked here for three years." },
    { question: "Will she have written her thesis by the summer?", answer: "Yes, it's due in June." },
    { question: "Will we have packed everything by tonight?", answer: "Yes, we're almost done." },
    { question: "Will the kids have done their homework?", answer: "Yes, I checked it myself." },
    { question: "By the time I arrive, will you have left?", answer: "Probably, I have an early meeting." },
    { question: "Will he have fixed the broken window by the weekend?", answer: "Yes, the repairman is coming Friday." },
    { question: "By midnight, what will you have completed?", answer: "I will have finished all the reports." },
    { question: "Will your team have prepared the presentation?", answer: "Yes, we've been working on it all week." },
    { question: "Will you have finished painting the room by Sunday?", answer: "Yes, we started on Friday." },
    { question: "Will she have cleaned the house before the visitors come?", answer: "Yes, everything will be tidy." },
    { question: "Will they have installed the new system by next week?", answer: "Yes, it should be running by Monday." },
    { question: "By next year, where will you have traveled?", answer: "Hopefully to South America and Japan." },
    { question: "Will the train have left by the time we get to the station?", answer: "Yes, it departs at 8:15." },
    { question: "What will you have done by this time tomorrow?", answer: "I will have arrived in Paris." }
  ]
};

const MODULE_108_DATA = {
  title: "Module 108 - Future Continuous vs Future Perfect",
  description: "Understand the difference between Future Continuous and Future Perfect tenses",
  intro: `Bu modülde Future Continuous ve Future Perfect arasındaki farkı öğreneceğiz.

📘 Konu Anlatımı (Türkçe Açıklama)
Future Continuous (will be + V-ing) gelecekte belirli bir zamanda devam etmekte olan eylemleri ifade ederken,
Future Perfect (will have + V3) gelecekte belirli bir zamana kadar tamamlanmış olacak eylemleri anlatır.

📗 Structure & Usage
✅ Future Continuous: Subject + will be + verb-ing
→ Describes an action in progress at a specific time in the future.
Example: This time tomorrow, I will be flying to New York.

✅ Future Perfect: Subject + will have + past participle (V3)
→ Describes an action that will be completed before a specific time in the future.
Example: By tomorrow, I will have finished the project.

🧠 Example Sentences
This time next week, I will be lying on the beach. (Future Continuous)
By next week, I will have finished all my exams. (Future Perfect)
She will be working at 3 p.m. (Future Continuous)
She will have completed the report by 3 p.m. (Future Perfect)
They will be watching a movie at 9 p.m. (Future Continuous)
They will have watched the movie by 11 p.m. (Future Perfect)`,
  tip: "Future Continuous for ongoing actions, Future Perfect for completed actions",
  speakingPractice: [
    { question: "What will you be doing at 8 a.m. tomorrow?", answer: "I will be having breakfast." },
    { question: "What will you have done by 8 a.m. tomorrow?", answer: "I will have finished my workout." },
    { question: "Will she be working this weekend?", answer: "Yes, she will be working on Saturday and Sunday." },
    { question: "Will she have finished the project by Monday?", answer: "Yes, she will have submitted it by then." },
    { question: "What will your parents be doing at this time next week?", answer: "They will be traveling to Antalya." },
    { question: "Will your parents have arrived by this time next week?", answer: "Yes, they will have checked into the hotel." },
    { question: "Will it be raining in the afternoon?", answer: "Yes, according to the forecast, it will be raining." },
    { question: "Will the rain have stopped by evening?", answer: "Yes, it will have stopped before 6 p.m." },
    { question: "What will you be studying at 10 a.m.?", answer: "I will be studying English grammar." },
    { question: "What will you have completed by 10 a.m.?", answer: "I will have completed all my homework." },
    { question: "Will you be watching the game tonight?", answer: "Yes, I will be watching it with friends." },
    { question: "Will you have watched the game by midnight?", answer: "Yes, it will have ended by then." },
    { question: "What will she be wearing at the party?", answer: "She will be wearing a red dress." },
    { question: "Will she have arrived before the party starts?", answer: "Yes, she will have arrived early." },
    { question: "What will you be doing during the meeting?", answer: "I will be taking notes." },
    { question: "What will you have prepared before the meeting?", answer: "I will have prepared my slides." },
    { question: "Will you be using your laptop at the café?", answer: "Yes, I will be working there." },
    { question: "Will you have submitted the form by Friday?", answer: "Yes, I will have sent it by Thursday." },
    { question: "Where will you be staying next month?", answer: "I will be staying at my aunt's house." },
    { question: "Where will you have stayed by the end of the month?", answer: "I will have stayed in two different cities." },
    { question: "Will he be working at 5 p.m.?", answer: "Yes, he will be at the office." },
    { question: "Will he have left work by 6 p.m.?", answer: "Yes, he will have finished his shift." },
    { question: "What will they be doing at the wedding?", answer: "They will be dancing and celebrating." },
    { question: "Will they have gotten married by then?", answer: "Yes, the ceremony will have finished." },
    { question: "Will she be traveling next week?", answer: "Yes, she will be visiting Rome." },
    { question: "Will she have returned by Sunday?", answer: "Yes, she will have flown back by then." },
    { question: "What will you be doing during the exam?", answer: "I will be writing an essay." },
    { question: "Will you have studied enough before the exam?", answer: "Yes, I will have reviewed everything." },
    { question: "Will the children be playing in the garden?", answer: "Yes, they will be playing all afternoon." },
    { question: "Will the children have eaten by then?", answer: "Yes, they will have had their lunch." },
    { question: "What will the team be doing at 2 p.m.?", answer: "They will be training on the field." },
    { question: "What will the team have achieved by next month?", answer: "They will have won several matches." },
    { question: "Will you be celebrating your birthday this weekend?", answer: "Yes, I will be having a party." },
    { question: "Will you have turned 21 by then?", answer: "Yes, my birthday is on Friday." },
    { question: "Will the movie be playing at 9?", answer: "Yes, it will be halfway through by then." },
    { question: "Will the movie have ended by midnight?", answer: "Yes, it will have finished before that." },
    { question: "Will you be living in Istanbul next year?", answer: "Yes, I will be moving there in June." },
    { question: "Will you have lived there for a year by next summer?", answer: "Yes, it will be exactly one year." },
    { question: "Will he be cooking dinner when we arrive?", answer: "Yes, he will be in the kitchen." },
    { question: "Will he have cooked by the time we arrive?", answer: "Yes, dinner will be ready." }
  ]
};

const MODULE_109_DATA = {
  title: "Module 109 - Modals of Deduction (must, might, can't)",
  description: "Understand how to express logical conclusions about present situations",
  intro: `Bu modülde Modals of Deduction öğreneceğiz.

📘 Konu Anlatımı (Türkçe Açıklama)
Modals of Deduction, bir durumu değerlendirerek mantıksal çıkarım yapmak için kullanılır.
- must → yüksek olasılık (olmalı)
- might / may / could → ihtimal (olabilir)
- can't → imkânsızlık (olamaz)

Örnek:
- He must be tired. (Kesin yorgundur.)
- She might be at home. (Evde olabilir.)
- That can't be true. (Bu doğru olamaz.)

📗 Structure & Usage
✅ Structure: Subject + modal (must/might/can't) + base verb (be / have / verb)

Examples:
- He must be hungry. (I'm sure he is.)
- They might be on their way. (It's possible.)
- She can't be the manager. (I'm sure she isn't.)

🧠 Example Sentences
He must be at work. His car is in the parking lot.
She might be sleeping. It's still early.
They can't be home. The lights are off.
You must be joking!
This can't be the right address.`,
  tip: "Use must for certainty, might for possibility, can't for impossibility",
  speakingPractice: [
    { question: "Why is the room so quiet?", answer: "They must have gone out." },
    { question: "Where is your brother?", answer: "He might be in the garden." },
    { question: "Why is the window open?", answer: "Someone must have opened it." },
    { question: "Where is Jane?", answer: "She can't be at home—her car is gone." },
    { question: "Why is the kitchen a mess?", answer: "The kids must have cooked something." },
    { question: "Who's calling me now?", answer: "It might be your manager." },
    { question: "Why are they late?", answer: "They might have missed the train." },
    { question: "Why is his phone off?", answer: "He must be in a meeting." },
    { question: "Do you think she's angry?", answer: "She might be, but I'm not sure." },
    { question: "Is this her bag?", answer: "It can't be. She always carries a red one." },
    { question: "Why is he smiling?", answer: "He must have received good news." },
    { question: "Where is your dog?", answer: "It might be hiding under the bed." },
    { question: "Why is the light on?", answer: "Someone must be in the room." },
    { question: "Is that his car?", answer: "It can't be—his is much bigger." },
    { question: "Why are you so sure?", answer: "Because it must be true. I saw it myself." },
    { question: "Why did the door slam?", answer: "The wind might have closed it." },
    { question: "Why is she crying?", answer: "She must have failed the exam." },
    { question: "Is that his handwriting?", answer: "It can't be. It's too neat." },
    { question: "Why is she wearing a coat?", answer: "It might be cold outside." },
    { question: "Why isn't she answering?", answer: "She might be sleeping." },
    { question: "Why is the floor wet?", answer: "Someone must have mopped it." },
    { question: "Why didn't they come?", answer: "They might have forgotten." },
    { question: "Why are you whispering?", answer: "They must be sleeping upstairs." },
    { question: "Is this your phone?", answer: "It can't be mine. Mine has a blue case." },
    { question: "Why is he so happy?", answer: "He must have passed the test." },
    { question: "Where is the cat?", answer: "It might be in the garden." },
    { question: "Why didn't he call you?", answer: "He might have lost his phone." },
    { question: "Is she the new manager?", answer: "She can't be. She just started yesterday." },
    { question: "Why are the lights off?", answer: "They might be watching a movie." },
    { question: "Why do you think it's broken?", answer: "Because it can't be working. It's silent." },
    { question: "Is that his jacket?", answer: "It must be. I saw him wearing it earlier." },
    { question: "Why are they whispering?", answer: "They might be planning a surprise." },
    { question: "Why is she running?", answer: "She must be late for something." },
    { question: "Why is there no milk?", answer: "They must have forgotten to buy it." },
    { question: "Is that the answer?", answer: "It might be, but I'm not 100% sure." },
    { question: "Why is the classroom empty?", answer: "The students must have gone to lunch." },
    { question: "Why is he in a hurry?", answer: "He might have an appointment." },
    { question: "Can this be a mistake?", answer: "It can't be. I double-checked it." },
    { question: "Why does she look so sad?", answer: "She might have received bad news." },
    { question: "Where is everyone?", answer: "They must be in the meeting room." }
  ]
};

const MODULE_110_DATA = {
  title: "Module 110 - Modals of Probability (could, may, might)",
  description: "Understand how to express possibility and probability using modal verbs",
  intro: `Bu modülde Modals of Probability öğreneceğiz.

📘 Konu Anlatımı (Türkçe Açıklama)
'Could', 'may' ve 'might' modal fiilleri bir olayın olma ihtimali hakkında konuşurken kullanılır.
- could → olabilir (genel olasılık)
- may → olabilir (resmî ya da daha güçlü ihtimal)
- might → olabilir (daha zayıf ihtimal)

Bu fiiller %100 emin olmadığımız durumları ifade ederken kullanılır.
Örnek:
- She may be at the library.
- It could rain this evening.
- He might not come to the party.

📗 Structure & Usage
✅ Structure: Subject + could/may/might + base verb
→ Used to express possibility (present or future)

Examples:
- I might go to the concert tonight.
- She may join us later.
- It could take a while to finish the project.

🧠 Example Sentences
He could be at the supermarket.
It may rain later this evening.
She might be working from home today.
They may not know about the meeting.
We could be wrong about the time.`,
  tip: "Use could/may/might to express different levels of possibility",
  speakingPractice: [
    { question: "Where is Ali?", answer: "He could be in the library." },
    { question: "Will it rain today?", answer: "It might, but the sky looks clear now." },
    { question: "Is she going to the party?", answer: "She may go if she finishes her work." },
    { question: "What's that noise?", answer: "It could be the wind." },
    { question: "Do you think they will come?", answer: "They might, but they're not sure yet." },
    { question: "Why isn't he answering?", answer: "He could be in class." },
    { question: "Is your friend moving away?", answer: "She might move to another city." },
    { question: "Will they be on time?", answer: "They may be late due to traffic." },
    { question: "Where's your phone?", answer: "It could be in my backpack." },
    { question: "Will she get the job?", answer: "She might. She had a good interview." },
    { question: "Is it dangerous?", answer: "It may be if you're not careful." },
    { question: "Will you come to the picnic?", answer: "I might, if it doesn't rain." },
    { question: "What time will the meeting end?", answer: "It could end around 4 p.m." },
    { question: "Where are the students?", answer: "They might be in the cafeteria." },
    { question: "Will they call us back?", answer: "They may call later this evening." },
    { question: "Can we finish this today?", answer: "We could, if we work fast." },
    { question: "Why hasn't she arrived yet?", answer: "She might be stuck in traffic." },
    { question: "Is it okay to go now?", answer: "It may not be safe just yet." },
    { question: "Will your cousin visit this summer?", answer: "He might come in August." },
    { question: "Will we need umbrellas?", answer: "It could rain this afternoon." },
    { question: "Where is the manager?", answer: "She might be in a meeting." },
    { question: "Is that her car?", answer: "It could be, but I'm not sure." },
    { question: "Is the train delayed?", answer: "It may be running late today." },
    { question: "Will they accept your offer?", answer: "They might. It's a fair deal." },
    { question: "Are you going to the cinema?", answer: "I might, if I'm not too tired." },
    { question: "Where's the cat?", answer: "It could be hiding under the bed." },
    { question: "Is the store open now?", answer: "It may be. Let's check the website." },
    { question: "Will she reply soon?", answer: "She could. She usually responds quickly." },
    { question: "Are you sure he's at work?", answer: "He might be at lunch." },
    { question: "Why is the internet slow?", answer: "It could be the weather." },
    { question: "Will they be ready by 5?", answer: "They may need a little more time." },
    { question: "Can we get there before dark?", answer: "We might, if we hurry." },
    { question: "Is she coming to the wedding?", answer: "She could, but she hasn't confirmed yet." },
    { question: "Will your parents let you go?", answer: "They might, if I ask nicely." },
    { question: "Is it expensive?", answer: "It could be, depending on the brand." },
    { question: "Is that food still fresh?", answer: "It might not be. Better check the date." },
    { question: "Will you be home tonight?", answer: "I may go out with friends." },
    { question: "Do you think it's true?", answer: "It could be, but we need more info." },
    { question: "Is this jacket yours?", answer: "It might be my brother's." },
    { question: "Will he agree to the plan?", answer: "He may, if we explain it well." }
  ]
};

// Module 102 Data: Present Perfect Continuous vs Present Perfect
const MODULE_102_DATA = {
  title: "Module 102 - Present Perfect Continuous vs Present Perfect",
  description: "Understand the difference between Present Perfect and Present Perfect Continuous tenses",
  intro: `Bu modülde Present Perfect ve Present Perfect Continuous arasındaki farkı öğreneceğiz.

📘 Konu Anlatımı (Türkçe Açıklama)
Present Perfect (have/has + V3) tamamlanmış eylemleri ve sonuçlarını vurgularken,
Present Perfect Continuous (have/has + been + V-ing) süregelen veya yeni bitmiş ve etkisi süren eylemleri vurgular.

Örnek:
- I've read the book. (Kitabı okudum - sonuç önemli)
- I've been reading the book. (Kitabı okuyordum - süreç önemli)

📗 Structure & Usage
✅ Present Perfect: have/has + past participle (V3)
→ Focuses on the result or completion.
✅ Present Perfect Continuous: have/has + been + verb-ing
→ Focuses on the duration or activity itself.

Examples:
- She has written three emails. (Result)
- She has been writing emails all morning. (Duration)

🧠 Example Sentences
I've worked here for five years. (Permanent or result focus)
I've been working here since 9 a.m. (Activity in progress)
They've painted the house. (It's finished)
They've been painting the house. (They may still be painting)
He has cooked dinner. (Dinner is ready)
He has been cooking for two hours. (Focus on the activity)`,
  tip: "Present Perfect focuses on results, Present Perfect Continuous focuses on duration",
  
  speakingPractice: [
    { question: "Have you finished your homework?", answer: "Yes, I've done all of it." },
    { question: "Have you been doing your homework?", answer: "Yes, I've been working on it all afternoon." },
    { question: "Why are you tired?", answer: "Because I've been cleaning the house all morning." },
    { question: "Why is the floor so clean?", answer: "Because I've cleaned it." },
    { question: "Has he read that book?", answer: "Yes, he has read it twice." },
    { question: "Has he been reading that book?", answer: "Yes, he's been reading it for days." },
    { question: "What have you done today?", answer: "I've written three reports and replied to emails." },
    { question: "What have you been doing today?", answer: "I've been writing reports and answering emails." },
    { question: "Has she finished the presentation?", answer: "Yes, she has just finished it." },
    { question: "Has she been working on the presentation?", answer: "Yes, she's been working on it since this morning." },
    { question: "How many pages have you read?", answer: "I've read 50 pages so far." },
    { question: "How long have you been reading?", answer: "I've been reading for an hour." },
    { question: "Why are your eyes red?", answer: "I've been staring at the screen for too long." },
    { question: "Why is your computer off?", answer: "I've shut it down already." },
    { question: "Have they built the new office yet?", answer: "Yes, they've already finished it." },
    { question: "Have they been working on the new office?", answer: "Yes, they've been working on it for months." },
    { question: "Has it stopped raining?", answer: "Yes, the rain has finally stopped." },
    { question: "Has it been raining?", answer: "Yes, it's been raining since morning." },
    { question: "Why are you out of breath?", answer: "I've been running in the park." },
    { question: "Have you run today?", answer: "Yes, I've run five kilometers." },
    { question: "Have you completed your training?", answer: "Yes, I've completed the course." },
    { question: "Have you been training hard?", answer: "Yes, I've been training every day this week." },
    { question: "Has she called the client?", answer: "Yes, she has already called them." },
    { question: "Has she been calling clients all morning?", answer: "Yes, she's been on the phone non-stop." },
    { question: "What have you achieved this month?", answer: "I've signed two big contracts." },
    { question: "What have you been working on this month?", answer: "I've been developing a new proposal." },
    { question: "How many emails have you sent today?", answer: "I've sent about 20 emails." },
    { question: "What have you been doing at your desk?", answer: "I've been replying to customer messages." },
    { question: "Have you written the report?", answer: "Yes, it's on your desk." },
    { question: "Have you been writing the report?", answer: "Yes, but I still need more time to finish it." },
    { question: "Have they painted the room?", answer: "Yes, it's finished and looks great." },
    { question: "Have they been painting the room?", answer: "Yes, they've been painting all day." },
    { question: "Have you read the new policy?", answer: "Yes, I've just read it." },
    { question: "Have you been reading the new policy?", answer: "Yes, I've been reading it slowly." },
    { question: "Has the team finished the project?", answer: "Yes, they've submitted everything." },
    { question: "Has the team been working hard?", answer: "Yes, they've been staying late every night." },
    { question: "Have you cleaned your room?", answer: "Yes, it's tidy now." },
    { question: "Have you been cleaning your room?", answer: "Yes, I've been cleaning for hours." },
    { question: "Have you visited London?", answer: "Yes, twice." },
    { question: "Have you been visiting many cities?", answer: "Yes, I've been traveling for two months." }
  ]
};

// Module 111: Modals of Obligation (must, have to, should)
const MODULE_111_DATA = {
  title: "Module 111: Modals of Obligation (must, have to, should)",
  description: "Students will learn to use modal verbs (must, have to, should) to express obligation, necessity, and advice.",
  intro: `Bu modülde 'Must', 'have to' ve 'should' modal fiilleri zorunluluk, gereklilik ve tavsiye bildirmek için kullanılır.

📘 Konu Anlatımı (Türkçe Açıklama)
'Must', 'have to' ve 'should' modal fiilleri zorunluluk, gereklilik ve tavsiye bildirmek için kullanılır.
- must → güçlü zorunluluk (kural, yasa, kişisel mecburiyet)
- have to → dışsal zorunluluk (kurallar, programlar)
- should → tavsiye (yapılması iyi olur)

Örnek:
- You must wear a seatbelt.
- I have to wake up early tomorrow.
- You should drink more water.

📗 Structure & Usage
✅ Structure:
- Subject + must/have to/should + base verb

Examples:
- You must bring your ID to the exam. (obligation)
- He has to finish his report by Friday. (necessity)
- You should see a doctor. (advice)

🧠 Example Sentences
You must wear a uniform at this school.
She has to submit the form by Monday.
We should leave early to avoid traffic.
They must not be late for the meeting.
You don't have to come if you're busy.`,
  tip: "Use must for strong obligations, have to for external requirements, and should for advice",
  speakingPractice: [
    { question: "Do I have to finish this today?", answer: "Yes, it's the deadline." },
    { question: "Must I pay in cash?", answer: "No, you can use a credit card too." },
    { question: "Should I study more for the exam?", answer: "Yes, it would be a good idea." },
    { question: "What must visitors do when they enter?", answer: "They must sign in at the front desk." },
    { question: "Do I have to bring my passport?", answer: "Yes, you have to show ID." },
    { question: "Should I call before visiting?", answer: "Yes, you should. It's polite." },
    { question: "Does he have to wear a suit?", answer: "Yes, it's required for the event." },
    { question: "Must we arrive on time?", answer: "Absolutely, the show starts exactly at 8." },
    { question: "Should we take a break?", answer: "Yes, we've been working for hours." },
    { question: "Do they have to clean the room?", answer: "Yes, before the inspection." },
    { question: "Should I apply for the job?", answer: "Yes, you have the right qualifications." },
    { question: "Must she leave early?", answer: "Yes, she has an appointment." },
    { question: "Do you have to pay a fee?", answer: "No, entry is free." },
    { question: "Should we bring anything to the party?", answer: "Yes, you should bring a gift." },
    { question: "Does he have to do all the work alone?", answer: "No, we will help him." },
    { question: "Must I be there in person?", answer: "Yes, it's mandatory." },
    { question: "Should I talk to the manager?", answer: "Yes, if you have a complaint." },
    { question: "Do we have to register in advance?", answer: "Yes, online registration is required." },
    { question: "Must they follow the rules?", answer: "Of course, it's for safety." },
    { question: "Should I wear formal clothes?", answer: "Yes, it's a formal event." },
    { question: "Do I have to stay until the end?", answer: "No, but it's better if you do." },
    { question: "Must you work late every day?", answer: "Yes, it's part of the job this week." },
    { question: "Should we check the weather?", answer: "Yes, it might rain." },
    { question: "Does she have to attend the meeting?", answer: "Yes, her presence is important." },
    { question: "Should I tell the truth?", answer: "Yes, you always should." },
    { question: "Must we book in advance?", answer: "Yes, especially during holidays." },
    { question: "Do you have to leave now?", answer: "Yes, I have another appointment." },
    { question: "Should we write this down?", answer: "Yes, it's useful for the exam." },
    { question: "Does he have to take that course?", answer: "Yes, it's a requirement." },
    { question: "Must I answer all the questions?", answer: "Yes, unless stated otherwise." },
    { question: "Should I apologize?", answer: "Yes, if you made a mistake." },
    { question: "Do we have to wait outside?", answer: "Yes, until they call us in." },
    { question: "Must they bring their own tools?", answer: "Yes, the company doesn't provide any." },
    { question: "Should I talk to her now?", answer: "Yes, before she leaves." },
    { question: "Do I have to get up early?", answer: "Yes, your train leaves at 7 a.m." },
    { question: "Must I pay now or later?", answer: "Now, please." },
    { question: "Should we help him with the task?", answer: "Yes, it's a good idea." },
    { question: "Do they have to wear helmets?", answer: "Yes, it's for safety reasons." },
    { question: "Must she work on weekends?", answer: "Yes, it's part of her contract." },
    { question: "Should we remind him again?", answer: "Yes, just to be sure." }
  ]
};

// Module 112: Modals of Prohibition (mustn't, can't)
const MODULE_112_DATA = {
  title: "Module 112: Modals of Prohibition (mustn't, can't)",
  description: "Students will learn to use the modals 'mustn't' and 'can't' to express prohibition or lack of permission.",
  intro: `Bu modülde 'Mustn't' ve 'can't' modal fiilleri, yasaklama ve izin verilmediğini belirtmek için kullanılır.

📘 Konu Anlatımı (Türkçe Açıklama)
'Mustn't' ve 'can't' modal fiilleri, yasaklama ve izin verilmediğini belirtmek için kullanılır.
- mustn't → kesin yasak, yapılmaması gereken bir şey (kural)
- can't → izin verilmez, mantıksal olarak mümkün değil

Örnek:
- You mustn't smoke here. (Burada sigara içmemelisin.)
- You can't enter without a ticket. (Biletsiz giremezsin.)

📗 Structure & Usage
✅ Structure: Subject + mustn't/can't + base verb

Examples:
- You mustn't touch the wires. (It's dangerous.)
- She can't speak during the exam. (It's not allowed.)

🧠 Example Sentences
You mustn't park here.
They can't use their phones in class.
We mustn't forget to lock the door.
He can't bring food into the lab.
Visitors mustn't feed the animals.`,
  tip: "Use mustn't for strict prohibitions and can't for lack of permission",
  speakingPractice: [
    { question: "Can I smoke in this room?", answer: "No, you mustn't. It's a non-smoking area." },
    { question: "Can students use their phones during the test?", answer: "No, they can't. It's against the rules." },
    { question: "May I park here?", answer: "No, you mustn't. This is a fire lane." },
    { question: "Can we bring food into the museum?", answer: "No, you can't eat inside." },
    { question: "Are we allowed to touch the artwork?", answer: "No, you mustn't touch anything." },
    { question: "Can she talk during the movie?", answer: "No, she mustn't disturb others." },
    { question: "Can I stay after closing time?", answer: "No, you can't stay past 6 p.m." },
    { question: "Are visitors allowed to enter this room?", answer: "No, they mustn't go in without permission." },
    { question: "Can they park in front of the entrance?", answer: "No, they can't block it." },
    { question: "Is it okay to take photos here?", answer: "No, you mustn't use a flash camera." },
    { question: "Can I leave my bag here?", answer: "No, you can't. It must stay with you." },
    { question: "Can employees access the server room?", answer: "No, only IT staff. Others mustn't enter." },
    { question: "Can I use this computer?", answer: "No, you mustn't. It's for staff only." },
    { question: "Can kids go near the edge of the pool?", answer: "No, they mustn't. It's dangerous." },
    { question: "Can we write on this wall?", answer: "No, you mustn't. It's prohibited." },
    { question: "Are phones allowed in this area?", answer: "No, you can't make calls here." },
    { question: "Can I take this document home?", answer: "No, you mustn't remove it from the office." },
    { question: "Can they cross the street here?", answer: "No, they mustn't. It's not a pedestrian crossing." },
    { question: "Can I feed the animals at the zoo?", answer: "No, you mustn't feed them." },
    { question: "Can we enter the park after 9 p.m.?", answer: "No, we can't. It closes at 9." },
    { question: "Can she skip the safety briefing?", answer: "No, she mustn't. It's mandatory." },
    { question: "Can I bring my dog inside?", answer: "No, you can't. Pets aren't allowed." },
    { question: "Can students leave class early?", answer: "No, they mustn't leave without permission." },
    { question: "Can we record this conversation?", answer: "No, you can't without consent." },
    { question: "Can I enter without a badge?", answer: "No, you mustn't. Security won't allow it." },
    { question: "Can I park in the manager's space?", answer: "No, you can't. It's reserved." },
    { question: "Can I use this software without a license?", answer: "No, you mustn't. That's illegal." },
    { question: "Can they leave the hospital without discharge?", answer: "No, they can't leave until cleared." },
    { question: "Can I stay in the classroom alone?", answer: "No, you mustn't. It's not safe." },
    { question: "Can I skip the training session?", answer: "No, you mustn't. It's part of your onboarding." },
    { question: "Can we block the fire exit?", answer: "No, you mustn't. It's a safety risk." },
    { question: "Can children go into this lab?", answer: "No, they can't. It's restricted." },
    { question: "Can we drink alcohol here?", answer: "No, you mustn't. It's a dry zone." },
    { question: "Can we use this area for lunch?", answer: "No, you can't eat here." },
    { question: "Can I borrow this without asking?", answer: "No, you mustn't take it without permission." },
    { question: "Can he drive without a license?", answer: "No, he can't. That's illegal." },
    { question: "Can we enter through this door?", answer: "No, we mustn't. It's an emergency exit." },
    { question: "Can you talk loudly in the library?", answer: "No, you mustn't disturb others." },
    { question: "Can students use calculators in this exam?", answer: "No, they can't for this part." },
    { question: "Can I ignore safety instructions?", answer: "No, you mustn't. It's dangerous." }
  ]
};

// Module 113 Data: Reported Speech: Requests and Commands
const MODULE_113_DATA = {
  title: "Module 113: Reported Speech – Requests and Commands",
  description: "Students will learn to report requests and commands using correct structure and appropriate reporting verbs such as 'ask', 'tell', 'order', and 'request'.",
  intro: `Bu modülde istek ve emir cümleleri dolaylı anlatılırken genellikle 'ask', 'tell', 'order' ve 'request' gibi fiiller kullanılır.

📘 Konu Anlatımı (Türkçe Açıklama)
İstek ve emir cümleleri dolaylı anlatılırken genellikle 'ask', 'tell', 'order' ve 'request' gibi fiiller kullanılır.
- Emir cümleleri için: tell/ask + someone + to + verb
- Olumsuz emirlerde: tell/ask + someone + not to + verb
- İstek cümlelerinde: ask/request + someone + to + verb

Örnek:
- "Close the window." → She told me to close the window.
- "Don't talk." → The teacher told us not to talk.
- "Can you help me?" → He asked me to help him.

📗 Structure & Usage
✅ Affirmative Command:
- Direct: "Sit down."
- Reported: He told me to sit down.

✅ Negative Command:
- Direct: "Don't open the door."
- Reported: She told me not to open the door.

✅ Request:
- Direct: "Could you send me the file?"
- Reported: He asked me to send him the file.

🧠 Example Sentences
"Be quiet." → She told us to be quiet.
"Don't forget your homework." → The teacher reminded him not to forget his homework.
"Please help me." → He asked me to help him.
"Turn off the lights." → She told me to turn off the lights.
"Don't go outside." → My mom told me not to go outside.`,
  tip: "Use 'tell' for commands and 'ask' for requests. Add 'not to' for negative commands.",
  speakingPractice: [
    { question: "Open your books.", answer: "The teacher told the students to open their books." },
    { question: "Don't touch that.", answer: "The mother told the child not to touch that." },
    { question: "Help me with the boxes.", answer: "He asked me to help him with the boxes." },
    { question: "Please close the window.", answer: "She asked me to close the window." },
    { question: "Don't run in the hallway.", answer: "The teacher told the students not to run in the hallway." },
    { question: "Could you call me later?", answer: "She asked him to call her later." },
    { question: "Turn off your phones.", answer: "The exam supervisor told the candidates to turn off their phones." },
    { question: "Don't forget to feed the cat.", answer: "She reminded me not to forget to feed the cat." },
    { question: "Wait for me here.", answer: "He told her to wait for him there." },
    { question: "Please write your name.", answer: "The receptionist asked the visitor to write their name." },
    { question: "Don't be late.", answer: "The boss told the employees not to be late." },
    { question: "Help your brother.", answer: "The mother told the child to help his brother." },
    { question: "Please send the report.", answer: "The manager asked the assistant to send the report." },
    { question: "Don't speak loudly.", answer: "The librarian told the students not to speak loudly." },
    { question: "Come here.", answer: "He told me to come there." },
    { question: "Don't go alone.", answer: "The friend told his friend not to go alone." },
    { question: "Take this medicine.", answer: "The doctor told the patient to take the medicine." },
    { question: "Please don't tell anyone.", answer: "She asked me not to tell anyone." },
    { question: "Clean your room.", answer: "The parent told the child to clean their room." },
    { question: "Call me tonight.", answer: "He told me to call him that night." },
    { question: "Don't play in the street.", answer: "The parent told the children not to play in the street." },
    { question: "Pass me the salt.", answer: "He told her to pass him the salt." },
    { question: "Please don't forget the keys.", answer: "She asked me not to forget the keys." },
    { question: "Don't lie to me.", answer: "He told her not to lie to him." },
    { question: "Please be careful.", answer: "She asked him to be careful." },
    { question: "Don't open the door.", answer: "The security guard told the visitors not to open the door." },
    { question: "Get some rest.", answer: "The friend told his friend to get some rest." },
    { question: "Please take a seat.", answer: "The host asked the guest to take a seat." },
    { question: "Turn left at the corner.", answer: "The police officer told the driver to turn left at the corner." },
    { question: "Don't park here.", answer: "The sign told us not to park there." },
    { question: "Please be on time.", answer: "The manager asked the team to be on time." },
    { question: "Call the doctor.", answer: "The wife told her husband to call the doctor." },
    { question: "Don't worry.", answer: "He told me not to worry." },
    { question: "Take your umbrella.", answer: "The mother told the child to take their umbrella." },
    { question: "Please don't shout.", answer: "She asked him not to shout." },
    { question: "Submit your homework.", answer: "The teacher told the student to submit their homework." },
    { question: "Don't forget your ID.", answer: "The officer told the applicant not to forget their ID." },
    { question: "Don't disturb them.", answer: "The manager told the staff not to disturb them." },
    { question: "Please stay here.", answer: "The nurse asked the patient to stay there." },
    { question: "Don't take pictures.", answer: "The museum staff told the visitor not to take pictures." }
  ]
};

// Module 114 Data: Reported Speech – Questions
const MODULE_114_DATA = {
  title: "Module 114: Reported Speech – Questions",
  description: "Students will learn how to report both yes/no and WH- questions using appropriate reporting verbs and correct word order.",
  intro: `Bu modülde dolaylı anlatımda (reported speech) soru cümleleri aktarılırken:

📘 Konu Anlatımı (Türkçe Açıklama)
Dolaylı anlatımda (reported speech) soru cümleleri aktarılırken:
- Soru yapısı düz cümle yapısına çevrilir (yardımcı fiil kaldırılır).
- 'Asked' ve 'wanted to know' gibi fiiller kullanılır.
- Yes/No questions için 'if/whether', WH-questions için 'wh-word' ile devam edilir.

Örnek:
- "Are you happy?" → He asked if I was happy.
- "Where do you live?" → She asked where I lived.

📗 Structure & Usage
✅ Yes/No Questions:
- Direct: "Do you like pizza?"
- Reported: He asked if I liked pizza.

✅ WH- Questions:
- Direct: "Where is she going?"
- Reported: He asked where she was going.

🧠 Example Sentences
"Do you live here?" → He asked if I lived there.
"What time does the train leave?" → She asked what time the train left.
"Are you tired?" → He asked if I was tired.
"Where did you go?" → She asked where I had gone.
"Can you help me?" → He asked if I could help him.`,
  tip: "Change question word order to statement order and use 'if' for Yes/No questions",
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

// Module 115 Data: Passive Voice – Present Perfect
const MODULE_115_DATA = {
  title: "Module 115: Passive Voice – Present Perfect",
  description: "Students will learn how to form and use the passive voice in the present perfect tense to describe actions where the doer is unknown or unimportant.",
  intro: `Bu modülde Passive Voice (edilgen yapı), eylemi yapan kişinin önemli olmadığı veya bilinmediği durumlarda kullanılır.

📘 Konu Anlatımı (Türkçe Açıklama)
Passive Voice (edilgen yapı), eylemi yapan kişinin önemli olmadığı veya bilinmediği durumlarda kullanılır.
Present Perfect Tense'de edilgen yapı şu şekilde kurulur:
✅ have/has + been + V3 (past participle)

Örnek:
- Active: They have cleaned the classroom.
- Passive: The classroom has been cleaned.

📗 Structure & Usage
✅ Structure:
- Subject + has/have + been + past participle

Examples:
- The documents have been sent.
- Dinner has been prepared.
- Many emails have been written today.

🧠 Example Sentences
The house has been sold.
Many mistakes have been made.
The package has been delivered.
The invitations have been sent out.
The report has been completed.`,
  tip: "Use passive voice when the doer is unknown or unimportant",
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

// Module 116 Data: Passive Voice – Future Simple
const MODULE_116_DATA = {
  title: "Module 116 - Passive Voice – Future Simple",
  description: "Learn how to use the passive voice in the future simple tense",
  intro: `Gelecekte edilgen (passive) yapı, bir işin gelecekte yapılacağını belirtmek için kullanılır.

Yapı: will + be + V3 (past participle)`,
  tip: "Use future passive to describe actions that will be done by someone in the future",
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

// Module 117 Data: Conditionals – Review (Zero, First, Second, Third)
const MODULE_117_DATA = {
  title: "Module 117 - Conditionals – Review (Zero, First, Second, Third)",
  description: "Review and compare all four main conditional sentence types",
  intro: `Koşul cümleleri (conditionals), bir eylemin sonucunu belirtmek için kullanılır. Bu modülde dört temel conditional tipi gözden geçirilir:

🔹 0. Conditional – Genel gerçekler: If + present simple, present simple
🔹 1. Conditional – Gerçek gelecek: If + present simple, will + V1  
🔹 2. Conditional – Hayali durumlar (şimdi/gelecek): If + past simple, would + V1
🔹 3. Conditional – Geçmişe dair hayali durumlar: If + past perfect, would have + V3`,
  tip: "Each conditional type expresses different levels of reality and time references",
  speakingPractice: [
    { question: "If you heat ice, what happens?", answer: "It melts." },
    { question: "What will you do if it rains tomorrow?", answer: "I will stay home." },
    { question: "If you had studied, what would have happened?", answer: "I would have passed." },
    { question: "If I were rich, what would I do?", answer: "You would buy a big house." },
    { question: "If people don't drink water, what happens?", answer: "They get dehydrated." },
    { question: "If I finish early, what will I do?", answer: "You will go out." },
    { question: "If she knew the answer, what would she do?", answer: "She would tell us." },
    { question: "If he had listened, what would have happened?", answer: "He would have avoided the mistake." },
    { question: "What happens if you mix red and yellow?", answer: "You get orange." },
    { question: "If the sun shines tomorrow, what will we do?", answer: "We will go to the beach." },
    { question: "If I were taller, what sport would I play?", answer: "You would play basketball." },
    { question: "If they had invited me, what would I have done?", answer: "You would have gone to the party." },
    { question: "If you drop this glass, what happens?", answer: "It breaks." },
    { question: "If you study hard, what will happen?", answer: "You will succeed." },
    { question: "If I had more time, what would I do?", answer: "You would read more books." },
    { question: "If she had worn a coat, what would have happened?", answer: "She wouldn't have gotten cold." },
    { question: "If I don't eat, what happens?", answer: "You feel hungry." },
    { question: "If you call her, what will she do?", answer: "She will answer." },
    { question: "If we lived in Spain, what would we do?", answer: "We would speak Spanish." },
    { question: "If they had studied, what would have happened?", answer: "They would have passed the exam." },
    { question: "If fire gets no oxygen, what happens?", answer: "It goes out." },
    { question: "If I see him, what will I say?", answer: "You will say hello." },
    { question: "If I won the lottery, what would I do?", answer: "You would buy a car." },
    { question: "If you had set an alarm, what would have happened?", answer: "You wouldn't have been late." },
    { question: "If sugar dissolves in tea, what happens?", answer: "It becomes sweet." },
    { question: "If she comes, what will you do?", answer: "I will talk to her." },
    { question: "If he spoke slower, what would happen?", answer: "We would understand him." },
    { question: "If we had known, what would we have done?", answer: "We would have changed our plan." },
    { question: "If you boil water, what happens?", answer: "It turns into steam." },
    { question: "If I go shopping, what will I buy?", answer: "You will buy some bread." },
    { question: "If I were a bird, what would I do?", answer: "You would fly away." },
    { question: "If she had asked for help, what would have happened?", answer: "She would have received it." },
    { question: "If metal is heated, what happens?", answer: "It expands." },
    { question: "If you don't sleep enough, what will happen?", answer: "You will feel tired." },
    { question: "If I lived in New York, what would I do?", answer: "You would visit Central Park." },
    { question: "If they had checked the weather, what would they have done?", answer: "They would have brought umbrellas." },
    { question: "If plants don't get light, what happens?", answer: "They die." },
    { question: "If I pass the exam, what will I do?", answer: "You will celebrate." },
    { question: "If he were a teacher, what would he do?", answer: "He would explain things well." },
    { question: "If she had taken notes, what would she have done?", answer: "She would have remembered the lesson." }
  ]
};

// Module 118 Data: Third Conditional
const MODULE_118_DATA = {
  title: "Module 118 - Third Conditional",
  description: "Learn how to use the third conditional to describe unreal situations in the past",
  intro: `3. tip koşul cümleleri (Third Conditional), geçmişte gerçekleşmemiş olaylar ve onların hayali sonuçları hakkında konuşmak için kullanılır.

✅ If + past perfect, would have + V3`,
  tip: "Use third conditional to express regrets and hypothetical past situations",
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

// Module 119 Data: Mixed Conditionals
const MODULE_119_DATA = {
  title: "Module 119 - Mixed Conditionals",
  description: "Learn how to use mixed conditionals to talk about hypothetical situations involving different time references",
  intro: `Mixed Conditionals (karışık koşul yapıları), geçmiş ve şimdiki zamanları bir araya getirerek, hayali senaryoları ifade etmek için kullanılır.

İki yaygın mixed conditional yapısı vardır:
1. Geçmiş neden → şu anki sonuç: If + past perfect, would + V1
2. Şimdiki neden → geçmiş sonuç: If + past simple, would have + V3`,
  tip: "Mix different time references to show cause and effect across time periods",
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

// Module 120 Data: Wish / If only + Past Simple (Present Regrets)
const MODULE_120_DATA = {
  title: "Module 120 - Wish / If only + Past Simple (Present Regrets)",
  description: "Learn how to express present regrets and hypothetical desires about the present",
  intro: `"Wish" ve "If only" yapıları, şu anki durumlarla ilgili pişmanlıkları veya keşke şöyle olsaydı dediğimiz şeyleri ifade etmek için kullanılır.

✅ Yapı: Wish / If only + past simple
Bu yapı, şu anda gerçek olmayan veya hayal ettiğimiz bir durumu anlatmak için kullanılır.`,
  tip: "Use wish/if only + past simple to express regrets about present situations",
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


const MODULE_121_DATA = {
  title: "Wish / If only + Past Perfect (Past Regrets)",
  description: "Learn wish / if only + past perfect (past regrets) - B1 level English",
  intro: `In this module, you will learn about Wish / If only + Past Perfect for expressing regrets about the past.

Grammar Rule:
We use 'wish' or 'if only' + past perfect to express regrets about things that happened (or didn't happen) in the past.

Structure:
- I wish + subject + had + past participle
- If only + subject + had + past participle

Examples:
- I wish I had studied harder for the exam.
- If only I had listened to your advice.
- She wishes she had taken that job offer.`,
  tip: "Use 'wish/if only + had + past participle' to express regrets about past actions",

  table: [],

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

const MODULE_122_DATA = {
  title: "Used to / Be used to / Get used to",
  description: "Learn the differences between used to, be used to, and get used to",
  intro: `In this module, you will learn the differences between 'used to', 'be used to', and 'get used to'.

Grammar Rules:
1. Used to + infinitive: Past habits or states (no longer true)
   - I used to smoke, but I quit.
2. Be used to + noun/-ing: Be accustomed to something
   - I'm used to waking up early.
3. Get used to + noun/-ing: Become accustomed to something
   - I'm getting used to the cold weather.

Examples:
- I used to live in London. (past habit)
- I'm used to living alone. (accustomed now)
- I'm getting used to my new job. (becoming accustomed)`,
  tip: "Remember: 'used to' is about the past, 'be used to' is about current state, 'get used to' is about transition",

  table: [],

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

const MODULE_123_DATA = {
  title: "Causative – Have/Get Something Done",
  description: "Learn how to use causative structures with have and get",
  intro: `In this module, you will learn the causative structures 'have something done' and 'get something done'.

Grammar Rule:
We use causative structures when someone else does something for us (we don't do it ourselves).

Structure:
- have + object + past participle
- get + object + past participle

Examples:
- I had my hair cut yesterday. (Someone cut my hair)
- She's getting her car repaired. (Someone is repairing it)
- We need to have the house painted. (We'll pay someone to paint it)`,
  tip: "Use 'have/get + object + past participle' when describing services done by others",

  table: [],

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

const MODULE_124_DATA = {
  title: "Relative Clauses – Defining & Non-defining",
  description: "Understand the difference between defining and non-defining relative clauses",
  intro: `In this module, you will learn about defining and non-defining relative clauses.

Grammar Rules:
1. Defining relative clauses: Essential information (no commas)
   - The book that I'm reading is fascinating.
2. Non-defining relative clauses: Extra information (with commas)
   - My brother, who lives in Spain, is visiting.

Relative pronouns: who, which, that, whose, where, when

Examples:
- The man who called yesterday is here. (defining)
- Paris, which is the capital of France, is beautiful. (non-defining)`,
  tip: "Use commas for non-defining clauses that add extra (non-essential) information",

  table: [],

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

const MODULE_125_DATA = {
  title: "Gerunds and Infinitives – Review",
  description: "Review when to use gerunds vs infinitives",
  intro: `In this module, you will review gerunds and infinitives.

Grammar Rules:
1. Gerunds (-ing): After prepositions, certain verbs (enjoy, mind, finish)
2. Infinitives (to + verb): After certain verbs (want, decide, hope), adjectives

Examples:
- I enjoy reading. (gerund after 'enjoy')
- I want to travel. (infinitive after 'want')
- I'm interested in learning Spanish. (gerund after preposition)
- It's important to exercise. (infinitive after adjective)`,
  tip: "Some verbs change meaning: stop doing (quit) vs stop to do (pause for purpose)",

  table: [],

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

const MODULE_126_DATA = {
  title: "Expressions with Get (get ready, get tired, etc.)",
  description: "Learn common expressions using the verb 'get'",
  intro: `In this module, you will learn common expressions with 'get'.

Common 'get' expressions:
- get ready (prepare)
- get tired (become tired)
- get married (marry)
- get lost (lose your way)
- get angry (become angry)
- get better (improve)
- get worse (deteriorate)

Examples:
- I need to get ready for work.
- She got angry when she heard the news.
- Don't get lost in the city!`,
  tip: "'Get' is very common in spoken English and often means 'become' or 'receive'",

  table: [],

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
    { question: "He was scared by the movie. What do you say?", answer: "He got scared by the movie." },
    { question: "You are getting impatient. What do you say?", answer: "I'm getting impatient." }
  ]
};

const MODULE_127_DATA = {
  title: "Expressions with Take (take a break, take time, etc.)",
  description: "Learn common expressions using the verb 'take'",
  intro: `In this module, you will learn common expressions with 'take'.

Common 'take' expressions:
- take a break (rest)
- take time (require time)
- take a photo (photograph)
- take a shower (bathe)
- take medicine (consume medicine)
- take care of (look after)
- take place (happen/occur)

Examples:
- Let's take a break for 10 minutes.
- It takes time to learn a language.
- Can you take a photo of us?`,
  tip: "'Take' often combines with nouns to create common expressions in English",

  table: [],

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

const MODULE_128_DATA = {
  title: "Phrasal Verbs – Separable & Inseparable",
  description: "Learn the difference between separable and inseparable phrasal verbs",
  intro: `In this module, you will learn about separable and inseparable phrasal verbs.

Grammar Rules:
1. Separable: You can put the object between the verb and particle
   - turn on the light / turn the light on
2. Inseparable: The object must come after the phrasal verb
   - look after the baby (NOT: look the baby after)

Examples:
- Pick up your phone / Pick your phone up (separable)
- Look for my keys (inseparable)
- Note: With pronouns, separation is required: Pick it up (NOT: Pick up it)`,
  tip: "With pronouns, separable phrasal verbs MUST be separated: turn it on, pick it up",

  table: [],

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

const MODULE_129_DATA = {
  title: "Phrasal Verbs – Common Everyday Verbs",
  description: "Learn the most common phrasal verbs used in daily life",
  intro: `In this module, you will learn common everyday phrasal verbs.

Common phrasal verbs:
- get up (rise from bed)
- go out (leave home for entertainment)
- come back (return)
- sit down (take a seat)
- stand up (rise to feet)
- carry on (continue)
- find out (discover)
- work out (exercise / solve)

Examples:
- I get up early every day.
- Let's go out for dinner tonight.
- Please sit down and relax.`,
  tip: "Phrasal verbs are essential for natural-sounding English conversation",

  table: [],

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

const MODULE_130_DATA = {
  title: "Collocations with Make and Do",
  description: "Learn the difference between make and do collocations",
  intro: `In this module, you will learn collocations with 'make' and 'do'.

MAKE collocations (creating/producing):
- make a decision, make a mistake, make money, make a phone call, make progress, make an effort

DO collocations (performing/completing):
- do homework, do the dishes, do exercise, do business, do your best, do damage

Examples:
- I need to make a decision soon.
- I have to do my homework tonight.
- She made a lot of progress.`,
  tip: "Generally: 'make' = create/produce, 'do' = perform/complete. But learn fixed expressions!",

  table: [],

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

const MODULE_131_DATA = {
  title: "Indirect Questions",
  description: "Learn how to form polite indirect questions",
  intro: `In this module, you will learn how to form indirect questions for polite communication.

Grammar Rule:
Indirect questions are more polite and formal. The word order changes to statement word order.

Structure:
- Could you tell me + question word + subject + verb
- Do you know + question word + subject + verb
- I wonder + question word + subject + verb

Examples:
- Direct: Where is the station?
- Indirect: Could you tell me where the station is?
- Direct: What time does it start?
- Indirect: Do you know what time it starts?`,
  tip: "In indirect questions, use statement word order (subject + verb), not question order",

  table: [],

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
    { question: "How old is he?", answer: "I was wondering how old he is." }
  ]
};

const MODULE_132_DATA = {
  title: "Giving Opinions – Agreeing & Disagreeing",
  description: "Learn how to express, agree, and disagree with opinions politely",
  intro: `In this module, you will learn how to give opinions and respond to others' opinions.

Useful expressions:
Giving opinions:
- In my opinion, ...
- I think/believe that ...
- From my perspective, ...

Agreeing:
- I completely agree.
- That's exactly what I think.
- I couldn't agree more.

Disagreeing politely:
- I see your point, but ...
- I'm not sure I agree with that.
- That's a valid point, however ...`,
  tip: "Use softening phrases like 'I think' or 'in my opinion' to sound less direct",

  table: [],

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

const MODULE_133_DATA = {
  title: "Speculating and Expressing Possibility",
  description: "Learn to express different degrees of possibility and speculation",
  intro: `In this module, you will learn how to speculate and express possibility.

Modal verbs for speculation:
- must (90% certain)
- might/may/could (50% certain)
- can't (99% certain negative)

Examples:
- She must be at home (I'm almost certain).
- He might be late (It's possible).
- They can't be serious (I'm certain they're not).`,
  tip: "Use 'must' for strong deduction, 'might/may/could' for possibility, 'can't' for impossibility",

  table: [],

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

const MODULE_134_DATA = {
  title: "Talking about Hypothetical Situations",
  description: "Learn to discuss imaginary and hypothetical scenarios",
  intro: `In this module, you will learn how to talk about hypothetical situations.

Structures:
- Second Conditional: If + past simple, would + infinitive (unreal present/future)
  - If I won the lottery, I would travel the world.
- Mixed Conditional: If + past perfect, would + infinitive (past condition, present result)
  - If I had studied medicine, I would be a doctor now.

Examples:
- If I were rich, I would buy a house.
- What would you do if you could fly?`,
  tip: "Use 'were' (not 'was') for all persons in formal hypothetical situations: If I were you...",

  table: [],

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

const MODULE_135_DATA = {
  title: "Expressing Preferences",
  description: "Learn different ways to express preferences and choices",
  intro: `In this module, you will learn how to express preferences.

Common structures:
- prefer + noun/-ing: I prefer coffee.
- prefer A to B: I prefer tea to coffee.
- would prefer to + infinitive: I'd prefer to stay home.
- would rather + infinitive: I'd rather go out.
- would rather... than: I'd rather walk than drive.

Examples:
- I prefer reading to watching TV.
- I'd prefer to eat at home tonight.
- I'd rather have tea than coffee.`,
  tip: "Use 'would rather' + bare infinitive (without 'to'): I'd rather go, not I'd rather to go",

  table: [],

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

const MODULE_136_DATA = {
  title: "Narratives – Sequencing Words",
  description: "Learn to tell stories using appropriate sequencing words",
  intro: `In this module, you will learn sequencing words for narratives.

Sequencing words:
Beginning: First, Initially, At first, To begin with
Middle: Then, Next, After that, Subsequently, Meanwhile
End: Finally, Eventually, In the end, Ultimately

Time expressions:
- as soon as, while, when, before, after, until

Examples:
- First, I woke up late. Then, I rushed to work. Finally, I arrived just in time.
- Initially, I was nervous. However, after a while, I felt confident.`,
  tip: "Vary your sequencing words to make stories more interesting - don't always use 'then'",

  table: [],

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

const MODULE_137_DATA = {
  title: "Linking Words – Contrast, Addition, Result",
  description: "Learn linking words to connect ideas in speaking and writing",
  intro: `In this module, you will learn linking words for different purposes.

Contrast: but, however, although, despite, whereas
Addition: and, also, moreover, furthermore, in addition
Result: so, therefore, consequently, as a result, thus
Reason: because, since, as, due to

Examples:
- I like coffee, but I prefer tea.
- She studied hard; therefore, she passed the exam.
- Although it was raining, we went out.`,
  tip: "Use linking words to make your speech and writing more cohesive and professional",

  table: [],

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

const MODULE_138_DATA = {
  title: "Describing Experiences and Narratives",
  description: "Learn to describe personal experiences vividly and engagingly",
  intro: `In this module, you will learn how to describe experiences and create engaging narratives.

Key elements:
- Setting: When and where
- Characters: Who was involved
- Actions: What happened (past tenses)
- Feelings: How people felt
- Outcome: How it ended

Useful language:
- It was a + adjective + experience
- I felt + adjective
- The most memorable thing was...
- What struck me most was...`,
  tip: "Use a variety of past tenses and descriptive adjectives to make stories come alive",

  table: [],

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

const MODULE_139_DATA = {
  title: "Cause and Effect",
  description: "Learn to express cause and effect relationships",
  intro: `In this module, you will learn how to express cause and effect.

Expressing cause:
- because, since, as, due to, owing to, thanks to

Expressing effect:
- so, therefore, consequently, as a result, thus

Structure:
- Because + clause: Because it rained, we stayed home.
- Due to + noun: Due to rain, we stayed home.

Examples:
- I was tired because I worked all day.
- It was raining, so we canceled the picnic.`,
  tip: "'Because' is followed by a clause; 'because of' is followed by a noun",

  table: [],

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
    { question: "Why did they celebrate?", answer: "Because they won the game." }
  ]
};

const MODULE_140_DATA = {
  title: "Talking about Purpose",
  description: "Learn to express purpose and intention",
  intro: `In this module, you will learn how to express purpose.

Structures:
- to + infinitive: I went to the store to buy milk.
- in order to + infinitive: She studies hard in order to pass.
- so that + clause: I left early so that I wouldn't be late.
- for + noun/-ing: This tool is for cutting.

Examples:
- I'm learning English to improve my career.
- We arrived early in order to get good seats.
- I saved money so that I could buy a car.`,
  tip: "'To + infinitive' is the most common way to express purpose in everyday English",

  table: [],

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
    { question: "Why are you learning French?", answer: "To live in France." },
    { question: "Why did you take a taxi?", answer: "In order to arrive on time." },
    { question: "Why do they train every day?", answer: "So that they can win the tournament." },
    { question: "Why did you buy this phone?", answer: "To take better pictures." },
    { question: "Why is she wearing glasses?", answer: "So that she can see clearly." },
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

const MODULE_141_DATA = {
  title: "Work Vocabulary – Roles, Tasks, and Workplaces",
  description: "Learn workplace roles, tasks, and workplaces to discuss jobs clearly",
  intro: `In this module, you will learn essential work vocabulary.

Roles: manager, engineer, nurse, teacher, driver, chef, cashier, police officer, mechanic, secretary

Tasks: answer phones, write emails, attend meetings, serve customers, fix machines, teach students

Workplaces: office, school, hospital, restaurant, factory, supermarket, police station, garage, construction site, hotel

Examples:
- A teacher works at a school.
- A chef prepares food in a restaurant.
- A nurse helps patients in a hospital.`,
  tip: "Use 'at' for specific buildings (at school, at a hospital), 'in' for general locations (in an office, in a restaurant)",

  table: [],

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

const MODULE_142_DATA = {
  title: "Education Vocabulary – Schools and Universities (B2 Level)",
  description: "Build B2-level school/university vocabulary in realistic Q&A contexts",
  intro: `In this module, you will learn B2-level education vocabulary.

Key Terms:
- Academic: curriculum, assignment, lecture, seminar, thesis, faculty, degree
- Programs: undergraduate, postgraduate, scholarship, tuition fee, graduate
- Activities: enroll, drop out, internship, exam-oriented, distance learning
- Campus life: campus, academic performance, extracurricular activities

Examples:
- I enrolled at the beginning of the semester.
- Our curriculum includes science, math, and foreign languages.
- She received a scholarship for academic performance.`,
  tip: "Say 'tuition fees' (not tuition money), 'academic performance' (not academic results), 'graduate from' (not graduate in)",

  table: [],

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

const MODULE_143_DATA = {
  title: "Technology Vocabulary – Gadgets and Internet (B1 Level+)",
  description: "Discuss tech, internet use, and digital safety with B1+ vocabulary",
  intro: `In this module, you will learn B1+ technology vocabulary.

Tech Terms:
- Devices: smartphone, tablet, laptop, charger, headphones, USB drive, wearable technology
- Internet: Wi-Fi connection, cloud computing, search engine, social media platform, streaming
- Safety: online privacy, cybersecurity, software update, download/upload
- Features: touchscreen, Bluetooth, smart home device, data storage

Examples:
- I usually use my smartphone and laptop every day.
- Cloud computing lets you store and access data online.
- I install software updates to avoid bugs and improve security.`,
  tip: "Say 'cloud computing' (not cloud storage), 'Wi-Fi connection' (not WiFi internet), 'software update' (not program update)",

  table: [],

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

const MODULE_144_DATA = {
  title: "Environment Vocabulary – Problems and Solutions (B1+ Level)",
  description: "Learn B1+ environment vocabulary and practice discussing problems and solutions.",
  intro: `Bu modülde çevreyle ilgili sorunları ve çözümleri B1+ düzeyinde öğreneceksiniz. İklim değişikliği, kirlilik, sürdürülebilirlik ve çevre koruma gibi temalara odaklanır.

📚 VOCABULARY:
• climate change - iklim değişikliği
• global warming - küresel ısınma
• pollution - kirlilik
• deforestation - ormansızlaşma
• greenhouse gases - sera gazları
• carbon footprint - karbon ayak izi
• renewable energy - yenilenebilir enerji
• sustainable - sürdürülebilir
• recycling - geri dönüşüm
• biodiversity - biyolojik çeşitlilik
• environmentally friendly - çevre dostu
• overconsumption - aşırı tüketim
• eco-friendly products - çevre dostu ürünler
• waste management - atık yönetimi
• conservation - koruma
• natural resources - doğal kaynaklar
• energy-efficient - enerji verimli
• landfill - çöp alanı
• water scarcity - su kıtlığı
• extinction - yok olma`,
  tip: "Use environmental vocabulary to discuss global issues and propose solutions. Remember: 'renewable energy' not 'renewable power', 'carbon footprint' not 'carbon trace'",

  table: [
    { en: "climate change", tr: "iklim değişikliği" },
    { en: "global warming", tr: "küresel ısınma" },
    { en: "pollution", tr: "kirlilik" },
    { en: "deforestation", tr: "ormansızlaşma" },
    { en: "greenhouse gases", tr: "sera gazları" },
    { en: "carbon footprint", tr: "karbon ayak izi" },
    { en: "renewable energy", tr: "yenilenebilir enerji" },
    { en: "sustainable", tr: "sürdürülebilir" },
    { en: "recycling", tr: "geri dönüşüm" },
    { en: "biodiversity", tr: "biyolojik çeşitlilik" },
    { en: "environmentally friendly", tr: "çevre dostu" },
    { en: "overconsumption", tr: "aşırı tüketim" },
    { en: "eco-friendly products", tr: "çevre dostu ürünler" },
    { en: "waste management", tr: "atık yönetimi" },
    { en: "conservation", tr: "koruma" },
    { en: "natural resources", tr: "doğal kaynaklar" },
    { en: "energy-efficient", tr: "enerji verimli" },
    { en: "landfill", tr: "çöp alanı" },
    { en: "water scarcity", tr: "su kıtlığı" },
    { en: "extinction", tr: "yok olma" }
  ],

  speakingPractice: [
    { question: "What are the main causes of climate change?", answer: "Mainly greenhouse gas emissions from burning fossil fuels." },
    { question: "How can we reduce air pollution?", answer: "By promoting public transport and using cleaner energy sources." },
    { question: "What is the impact of deforestation?", answer: "It destroys habitats, reduces biodiversity, and contributes to global warming." },
    { question: "What does 'carbon footprint' mean?", answer: "It is the total amount of greenhouse gases we produce through our actions." },
    { question: "What are some renewable energy sources?", answer: "Solar, wind, hydroelectric, and geothermal energy." },
    { question: "How does recycling help the environment?", answer: "It reduces waste, saves energy, and conserves natural resources." },
    { question: "Why is biodiversity important?", answer: "It keeps ecosystems balanced and supports human life." },
    { question: "What can individuals do to live more sustainably?", answer: "Reduce waste, save energy, and choose eco‑friendly products." },
    { question: "What is an environmentally friendly lifestyle?", answer: "A lifestyle that minimizes harm to the planet using sustainable practices." },
    { question: "Why is plastic pollution a major problem?", answer: "It takes centuries to decompose and harms wildlife." },
    { question: "How can we save water in daily life?", answer: "Fix leaks, use water‑efficient appliances, and turn off taps." },
    { question: "What are the dangers of overconsumption?", answer: "Resource depletion, more waste, and environmental damage." },
    { question: "Why should we switch to energy‑efficient devices?", answer: "They use less electricity and lower emissions." },
    { question: "What does 'waste management' include?", answer: "Collection, transport, recycling, and disposal of waste." },
    { question: "What are eco‑friendly products?", answer: "Items made with sustainable materials that harm nature less." },
    { question: "How can we protect endangered species?", answer: "Preserve habitats and support conservation programs." },
    { question: "What is the role of governments in environmental protection?", answer: "Make laws, support green projects, and raise awareness." },
    { question: "How does global warming affect sea levels?", answer: "It melts ice and raises oceans, threatening coasts." },
    { question: "What can schools do to promote environmental awareness?", answer: "Organize projects, campaigns, and eco‑education programs." },
    { question: "How is climate change affecting agriculture?", answer: "It changes rainfall and increases droughts and floods." },
    { question: "Why are forests essential for the planet?", answer: "They absorb CO₂ and provide oxygen, food, and shelter." },
    { question: "How can we reduce our carbon footprint?", answer: "Use less electricity, drive less, and eat local food." },
    { question: "What happens when biodiversity decreases?", answer: "Ecosystems become weaker and more likely to collapse." },
    { question: "How can technology help the environment?", answer: "By creating clean energy and improving efficiency." },
    { question: "What is 'sustainable development'?", answer: "Development meeting today's needs without harming the future." },
    { question: "Why are landfills problematic?", answer: "They release methane and can pollute land and water." },
    { question: "How can urban areas become greener?", answer: "Add parks, plant trees, and improve public transport." },
    { question: "What is water scarcity?", answer: "Not enough clean water for people's needs." },
    { question: "How can we reduce food waste?", answer: "Plan meals, store food properly, and donate extras." },
    { question: "What are the benefits of green buildings?", answer: "They use less energy and water and are healthier." },
    { question: "What role do students play in environmental protection?", answer: "Join eco‑clubs and lead awareness campaigns." },
    { question: "What is the connection between consumption and pollution?", answer: "More consumption creates more waste and pollution." },
    { question: "How can businesses be more eco‑conscious?", answer: "Reduce packaging, recycle, and use renewable energy." },
    { question: "Why should we reduce single‑use plastics?", answer: "They pollute land and oceans and harm marine life." },
    { question: "What is extinction and why is it serious?", answer: "A species disappears forever, upsetting ecological balance." },
    { question: "How does overfishing affect marine life?", answer: "It reduces fish populations and breaks the food chain." },
    { question: "What are climate‑friendly habits?", answer: "Use reusable bags, bike or walk, and conserve water." },
    { question: "How can governments encourage green energy?", answer: "Offer subsidies and invest in solar and wind." },
    { question: "Why is environmental education important?", answer: "It teaches people to care for the planet." },
    { question: "What's your opinion on banning plastic bags?", answer: "It's a strong step to reduce plastic waste." }
  ]
};

const MODULE_145_DATA = {
  title: "News and Media Vocabulary (B1+ Level)",
  description: "Learn B1+ news and media vocabulary and practice discussing how news works.",
  intro: `Bu modülde haber ve medya dünyasındaki temel kavramları öğrenecek ve konuşma pratiği yapacaksınız.

📚 VOCABULARY:
• headline - manşet
• breaking news - son dakika haberi
• reporter - muhabir
• journalist - gazeteci
• editor - editör
• news anchor - haber sunucusu
• article - makale
• interview - röportaj
• broadcast - yayın
• live coverage - canlı yayın
• press - basın
• media outlet - medya kuruluşu
• fake news - sahte haber
• source - kaynak
• tabloid - magazin gazetesi
• mainstream media - ana akım medya
• social media - sosyal medya
• go viral - hızla yayılmak
• subscribe - abone olmak
• objective reporting - tarafsız haber yapma`,
  tip: "Use 'breaking news' for urgent stories, 'headline' for the main title, and 'go viral' when content spreads rapidly online",

  table: [
    { en: "headline", tr: "manşet" },
    { en: "breaking news", tr: "son dakika haberi" },
    { en: "reporter", tr: "muhabir" },
    { en: "journalist", tr: "gazeteci" },
    { en: "editor", tr: "editör" },
    { en: "news anchor", tr: "haber sunucusu" },
    { en: "article", tr: "makale" },
    { en: "interview", tr: "röportaj" },
    { en: "broadcast", tr: "yayın" },
    { en: "live coverage", tr: "canlı yayın" },
    { en: "press", tr: "basın" },
    { en: "media outlet", tr: "medya kuruluşu" },
    { en: "fake news", tr: "sahte haber" },
    { en: "source", tr: "kaynak" },
    { en: "tabloid", tr: "magazin gazetesi" },
    { en: "mainstream media", tr: "ana akım medya" },
    { en: "social media", tr: "sosyal medya" },
    { en: "go viral", tr: "hızla yayılmak" },
    { en: "subscribe", tr: "abone olmak" },
    { en: "objective reporting", tr: "tarafsız haber yapma" }
  ],

  speakingPractice: [
    { question: "Do you read the news every day?", answer: "Yes, I usually check news apps every morning." },
    { question: "What type of news do you follow the most?", answer: "Mostly international news and current affairs." },
    { question: "Have you ever read a fake news story?", answer: "Yes, and it was convincing at first." },
    { question: "What does a journalist do?", answer: "Investigates and writes news stories." },
    { question: "Do you prefer watching or reading the news?", answer: "Reading, because I can choose topics easily." },
    { question: "What's your favorite news outlet?", answer: "BBC, for detailed and balanced reporting." },
    { question: "What does a headline usually tell you?", answer: "A brief summary of the main topic." },
    { question: "Have you ever watched a live news broadcast?", answer: "Yes, during elections and big events." },
    { question: "What's the role of a news anchor?", answer: "To present news on TV or radio." },
    { question: "Do you trust mainstream media?", answer: "I do, but I cross‑check with other sources." },
    { question: "What's the danger of fake news?", answer: "It spreads misinformation and causes panic." },
    { question: "Do you follow news on social media?", answer: "Yes, but I verify before believing." },
    { question: "What is an interview in journalism?", answer: "A conversation to gather information or opinions." },
    { question: "Have you ever been interviewed?", answer: "Yes, once for a school magazine." },
    { question: "What's the difference between a reporter and an editor?", answer: "Reporters gather news; editors prepare it for publication." },
    { question: "Do you like reading tabloids?", answer: "Not really; I prefer fact‑based journalism." },
    { question: "What does 'go viral' mean?", answer: "A story or video spreads rapidly online." },
    { question: "Do you subscribe to any newspapers?", answer: "Yes, a digital subscription to The Economist." },
    { question: "How can you identify reliable news sources?", answer: "Check credibility and reporting quality." },
    { question: "What is objective reporting?", answer: "Reporting facts without personal bias." },
    { question: "Does news influence public opinion?", answer: "Definitely; framing shapes views." },
    { question: "What is breaking news?", answer: "Urgent, unexpected information reported immediately." },
    { question: "What are press conferences for?", answer: "Officials answer questions from the media." },
    { question: "Do you share news online?", answer: "Yes, when it's important or inspiring." },
    { question: "What do editors do?", answer: "Ensure accuracy, grammar, and clarity." },
    { question: "How has social media changed news?", answer: "It's more accessible, but misinformation increased." },
    { question: "What about citizen journalism?", answer: "Useful for fast updates, but not always accurate." },
    { question: "Printed newspapers or digital?", answer: "Digital—more convenient and up‑to‑date." },
    { question: "Opinion on news apps?", answer: "Helpful if topics and notifications are customizable." },
    { question: "Have you ever seen biased reporting?", answer: "Yes, especially during campaigns." },
    { question: "Are young people interested in news?", answer: "Some are, especially via engaging formats." },
    { question: "Difference between news and opinion?", answer: "News = facts; opinion = personal views." },
    { question: "Benefits of live coverage?", answer: "Real‑time updates for breaking events." },
    { question: "Should schools teach media literacy?", answer: "Yes, to analyze news critically." },
    { question: "Role of the press in a democracy?", answer: "Inform the public and hold power accountable." },
    { question: "How do you stay updated?", answer: "Mobile apps and push notifications." },
    { question: "Do you ever turn off the news?", answer: "Sometimes, to avoid overload." },
    { question: "View on sensational headlines?", answer: "Attention‑grabbing but sometimes misleading." },
    { question: "International or local news more?", answer: "Mostly international, but I check local too." },
    { question: "Documentary about journalism?", answer: "Yes, it showed how newsrooms work." }
  ]
};

const MODULE_146_DATA = {
  title: "Personality and Character Vocabulary (B1)",
  description: "Build B1 personality/character vocabulary and answer speaking questions using new adjectives.",
  intro: `Kişilik ve karakter sıfatlarını B1 düzeyinde kullanma ve konuşma pratiği.

📚 VOCABULARY:
• empathetic - empatik
• reliable - güvenilir
• charismatic - karizmatik
• witty - nüktedan
• open-minded - açık fikirli
• arrogant - kibirli
• manipulative - manipülatif
• impulsive - fevri
• moody - huysuz/ruh hali değişken
• stubborn - inatçı
• ambitious - hırslı
• introverted - içe dönük
• extroverted - dışa dönük
• cautious - tedbirli
• perfectionist - mükemmeliyetçi`,
  tip: "Use 'empathetic' (not sympathetic), 'introverted/extroverted' (not introvert/extrovert as adjectives), and 'open-minded' with a hyphen",

  table: [
    { en: "empathetic", tr: "empatik" },
    { en: "reliable", tr: "güvenilir" },
    { en: "charismatic", tr: "karizmatik" },
    { en: "witty", tr: "nüktedan" },
    { en: "open-minded", tr: "açık fikirli" },
    { en: "arrogant", tr: "kibirli" },
    { en: "manipulative", tr: "manipülatif" },
    { en: "impulsive", tr: "fevri" },
    { en: "moody", tr: "huysuz/ruh hali değişken" },
    { en: "stubborn", tr: "inatçı" },
    { en: "ambitious", tr: "hırslı" },
    { en: "introverted", tr: "içe dönük" },
    { en: "extroverted", tr: "dışa dönük" },
    { en: "cautious", tr: "tedbirli" },
    { en: "perfectionist", tr: "mükemmeliyetçi" }
  ],

  speakingPractice: [
    { question: "How would your best friend describe your personality?", answer: "She would describe me as reliable, honest, and a good listener." },
    { question: "What is your strongest personality trait?", answer: "Being dependable in every situation." },
    { question: "Which of your traits do you want to improve?", answer: "My patience, especially under stress." },
    { question: "Are you more introverted or extroverted? Why?", answer: "More introverted; I need alone time to recharge." },
    { question: "Have you become more open‑minded over the years?", answer: "Yes, by listening to different perspectives." },
    { question: "Do you consider yourself a perfectionist? Why?", answer: "Yes, I want everything exactly right." },
    { question: "What makes someone charismatic?", answer: "Confidence, clear speech, and easy connection." },
    { question: "Can a moody person be a good leader?", answer: "Yes, if they manage emotions well." },
    { question: "Are you cautious when making decisions?", answer: "Yes, I think carefully to avoid mistakes." },
    { question: "What is emotional intelligence?", answer: "Understanding your feelings and reacting calmly to others." },
    { question: "Ambitious or relaxed coworkers?", answer: "Ambitious—they're focused and driven." },
    { question: "Is being stubborn always bad?", answer: "No, it helps you stand up for beliefs." },
    { question: "How do you deal with manipulative people?", answer: "Set clear boundaries and avoid influence." },
    { question: "Can you trust someone very impulsive?", answer: "Not fully; they act without thinking." },
    { question: "Most reliable person in your life?", answer: "My mother—she always keeps her word." },
    { question: "Do you enjoy witty people?", answer: "Yes, they make conversations fun." },
    { question: "Met someone extremely arrogant? What happened?", answer: "Yes, he ignored others and showed off." },
    { question: "Can people change their personalities?", answer: "Yes, with reflection and effort." },
    { question: "Traits for a romantic partner?", answer: "Kindness, honesty, stability." },
    { question: "Do opposites attract?", answer: "Yes—different personalities can complement." },
    { question: "People in your country: introverted or extroverted?", answer: "Mostly extroverted and social." },
    { question: "Traits admired in your culture?", answer: "Respect for elders is highly valued." },
    { question: "How does social media affect personality?", answer: "It increases self‑consciousness and shapes behavior." },
    { question: "Should schools teach emotional intelligence?", answer: "Yes, students must learn emotion management." },
    { question: "Traits important for politicians?", answer: "Empathy, confidence, clear communication." },
    { question: "Are charismatic people always honest?", answer: "No, charisma can also manipulate." },
    { question: "Why do people pretend to be someone else?", answer: "For acceptance or to hide insecurity." },
    { question: "Which personalities become famous easily?", answer: "Confident, entertaining ones." },
    { question: "Do leaders need to be empathetic?", answer: "Yes, it helps them connect and guide." },
    { question: "How do cultural values affect personality?", answer: "They set norms for expression." },
    { question: "If you could change one trait?", answer: "I'd reduce how fast I get frustrated." },
    { question: "Intelligence or charisma?", answer: "Charisma—helps build relationships." },
    { question: "Handling a very stubborn child?", answer: "Stay calm and encourage flexibility." },
    { question: "Can being too open‑minded be risky?", answer: "Yes, lack of limits leads to poor choices." },
    { question: "Can someone be introverted and extroverted?", answer: "Yes, depending on the situation." },
    { question: "Meeting your personality twin—feelings?", answer: "Curious; I'd learn from similarities." },
    { question: "Honest or kind in feedback?", answer: "Both—honest and respectful." },
    { question: "Hire for personality or skills?", answer: "Both matter; personality aids teamwork." },
    { question: "Can personality affect success?", answer: "Yes, confidence and adaptability help." },
    { question: "Did your job change your personality?", answer: "Yes, I'm more disciplined and timely." }
  ]
};

const MODULE_147_DATA = {
  title: "Crime and Law Vocabulary (B1 Level)",
  description: "Learn B1 crime/law vocabulary and practice speaking about legal topics.",
  intro: `Suç, polislik ve mahkeme süreçleriyle ilgili temel kelimeleri B1 düzeyinde öğrenip konuşma pratiği yapma.

📚 VOCABULARY:
• crime - suç
• criminal - suçlu
• evidence - delil
• witness - tanık
• trial - duruşma
• verdict - hüküm/karar
• sentence - ceza
• innocent - suçsuz
• guilty - suçlu
• victim - mağdur
• judge - yargıç
• jury - jüri
• suspect - şüpheli
• arrest - tutuklamak
• robbery - soygun
• burglary - hırsızlık (eve girerek)
• murder - cinayet
• fraud - dolandırıcılık
• lawyer - avukat
• bail - kefalet`,
  tip: "Remember: 'robbery' involves force, 'burglary' is breaking in to steal, 'theft' is general stealing. Use 'verdict' for the decision, 'sentence' for the punishment",

  table: [
    { en: "crime", tr: "suç" },
    { en: "criminal", tr: "suçlu" },
    { en: "evidence", tr: "delil" },
    { en: "witness", tr: "tanık" },
    { en: "trial", tr: "duruşma" },
    { en: "verdict", tr: "hüküm/karar" },
    { en: "sentence", tr: "ceza" },
    { en: "innocent", tr: "suçsuz" },
    { en: "guilty", tr: "suçlu" },
    { en: "victim", tr: "mağdur" },
    { en: "judge", tr: "yargıç" },
    { en: "jury", tr: "jüri" },
    { en: "suspect", tr: "şüpheli" },
    { en: "arrest", tr: "tutuklamak" },
    { en: "robbery", tr: "soygun" },
    { en: "burglary", tr: "hırsızlık (eve girerek)" },
    { en: "murder", tr: "cinayet" },
    { en: "fraud", tr: "dolandırıcılık" },
    { en: "lawyer", tr: "avukat" },
    { en: "bail", tr: "kefalet" }
  ],

  speakingPractice: [
    { question: "Have you ever witnessed a crime? What happened?", answer: "Yes, a theft in a supermarket; a man stole a bottle and ran." },
    { question: "What kind of crimes are most common in your country?", answer: "Theft, pickpocketing, and fraud." },
    { question: "Do you feel safe in your neighborhood? Why?", answer: "Yes—regular police patrols and low crime rates." },
    { question: "What can people do to prevent burglary?", answer: "Install cameras, use alarms, and lock doors." },
    { question: "Should criminals always go to prison?", answer: "Only for serious crimes proven in court." },
    { question: "How does the legal system work in your country?", answer: "Police investigate, courts hold trials, judges sentence." },
    { question: "What do you think about the death penalty?", answer: "Used in some countries for murder; it's controversial." },
    { question: "Difference between robbery and burglary?", answer: "Robbery uses force; burglary is illegal entry to steal." },
    { question: "Do you trust the police?", answer: "Yes, they respond quickly and act professionally." },
    { question: "What should you do if you witness a crime?", answer: "Call the police, stay calm, and describe what you saw." },
    { question: "What is the role of evidence in a trial?", answer: "Evidence proves what happened and supports the verdict." },
    { question: "Who is a witness?", answer: "Someone who saw the crime and can describe it." },
    { question: "What happens at a trial?", answer: "Lawyers argue, witnesses testify, and the jury decides." },
    { question: "What is a verdict?", answer: "The decision: guilty or not guilty." },
    { question: "What does 'sentence' mean in law?", answer: "The punishment given by a judge." },
    { question: "What rights does a suspect have?", answer: "The right to a lawyer and a fair trial." },
    { question: "Is bail always possible?", answer: "No, it depends on the crime and risk." },
    { question: "What is fraud?", answer: "Deception for personal gain." },
    { question: "How can people protect themselves from fraud?", answer: "Check sources, protect data, and avoid sharing passwords." },
    { question: "What should you do if you are a victim?", answer: "Report to the police and keep evidence." },
    { question: "What is cybercrime?", answer: "Crimes committed online, like hacking or phishing." },
    { question: "How can we reduce cybercrime?", answer: "Use strong passwords and two‑factor authentication." },
    { question: "What is community policing?", answer: "Police working closely with local residents." },
    { question: "Should young offenders go to jail?", answer: "Prefer rehabilitation for minor crimes." },
    { question: "Why is a lawyer important?", answer: "They defend your rights in court." },
    { question: "What is self‑defense?", answer: "Protecting yourself from immediate danger." },
    { question: "How can cities reduce crime rates?", answer: "Better lighting, youth programs, and jobs." },
    { question: "Why do some people commit crimes?", answer: "Poverty, peer pressure, or opportunity." },
    { question: "Is CCTV useful?", answer: "Yes, it helps identify suspects." },
    { question: "What is domestic violence?", answer: "Abuse within a household; it must be reported." },
    { question: "How do judges stay objective?", answer: "They follow the law and consider evidence only." },
    { question: "What is shoplifting?", answer: "Stealing items from a store." },
    { question: "How can schools teach legal awareness?", answer: "Workshops on rights, laws, and online safety." },
    { question: "What is a criminal record?", answer: "Official history of someone's offenses." },
    { question: "Can the media affect a trial?", answer: "Yes, strong publicity may influence opinions." },
    { question: "What is parole?", answer: "Early release with conditions and supervision." },
    { question: "How does a jury work?", answer: "Citizens evaluate evidence and decide the verdict." },
    { question: "What is presumption of innocence?", answer: "Everyone is innocent until proven guilty." },
    { question: "Is plea bargaining fair?", answer: "It saves time but can pressure suspects." },
    { question: "How can neighborhoods stay safe?", answer: "Know neighbors, report issues, and join watch groups." }
  ]
};

const MODULE_148_DATA = {
  title: "Health and Fitness Vocabulary (B1 Level)",
  description: "Learn B1 health/fitness vocabulary and answer practical wellness questions.",
  intro: `Sağlık, beslenme ve egzersiz ile ilgili kelimelerle konuşma pratiği.

📚 VOCABULARY:
• exercise - egzersiz
• diet - beslenme/diyet
• nutrition - beslenme
• calorie - kalori
• protein - protein
• vitamin - vitamin
• fat - yağ
• carbohydrate - karbonhidrat
• workout - antrenman
• cardio - kardiyo
• strength training - kuvvet antrenmanı
• obesity - obezite
• cholesterol - kolesterol
• blood pressure - tansiyon
• heart rate - kalp atış hızı
• hydration - hidrasyon
• sleep - uyku
• immune system - bağışıklık sistemi
• injury - sakatlık
• recovery - iyileşme`,
  tip: "Use 'workout' for a training session, 'exercise' for physical activity in general. Say 'cardio' (not cardiovascular), 'hydration' (not water intake)",

  table: [
    { en: "exercise", tr: "egzersiz" },
    { en: "diet", tr: "beslenme/diyet" },
    { en: "nutrition", tr: "beslenme" },
    { en: "calorie", tr: "kalori" },
    { en: "protein", tr: "protein" },
    { en: "vitamin", tr: "vitamin" },
    { en: "fat", tr: "yağ" },
    { en: "carbohydrate", tr: "karbonhidrat" },
    { en: "workout", tr: "antrenman" },
    { en: "cardio", tr: "kardiyo" },
    { en: "strength training", tr: "kuvvet antrenmanı" },
    { en: "obesity", tr: "obezite" },
    { en: "cholesterol", tr: "kolesterol" },
    { en: "blood pressure", tr: "tansiyon" },
    { en: "heart rate", tr: "kalp atış hızı" },
    { en: "hydration", tr: "hidrasyon" },
    { en: "sleep", tr: "uyku" },
    { en: "immune system", tr: "bağışıklık sistemi" },
    { en: "injury", tr: "sakatlık" },
    { en: "recovery", tr: "iyileşme" }
  ],

  speakingPractice: [
    { question: "How many days a week do you exercise?", answer: "I try to work out at least three days a week." },
    { question: "What kind of workout do you prefer?", answer: "I prefer cardio like running and cycling." },
    { question: "Do you track your calories?", answer: "Roughly, to make sure I don't overeat." },
    { question: "What is a balanced diet to you?", answer: "Plenty of vegetables, lean protein, and whole grains." },
    { question: "How much water do you drink daily?", answer: "About two liters to stay hydrated." },
    { question: "Do you take vitamins?", answer: "Yes, I take vitamin D in winter." },
    { question: "How do you increase your protein intake?", answer: "I eat eggs, yogurt, and legumes." },
    { question: "What's your go‑to healthy snack?", answer: "A handful of nuts or a banana." },
    { question: "How do you reduce fat in meals?", answer: "I bake or grill instead of frying." },
    { question: "Do you count steps?", answer: "Yes, I aim for 10,000 steps a day." },
    { question: "How do you improve sleep quality?", answer: "I avoid screens before bed and keep a routine." },
    { question: "What raises your heart rate quickly?", answer: "Climbing stairs or skipping rope." },
    { question: "How do you manage stress?", answer: "Deep breathing and short walks." },
    { question: "Do you prefer home workouts or gym?", answer: "Home workouts—they save time." },
    { question: "How often do you check blood pressure?", answer: "Twice a year during checkups." },
    { question: "Do you monitor your heart rate?", answer: "Yes, with a smartwatch during exercise." },
    { question: "What's your favorite cardio activity?", answer: "Swimming—it's easy on the joints." },
    { question: "How do you prevent injuries?", answer: "Warm up, stretch, and use proper form." },
    { question: "What do you do after an injury?", answer: "Rest, ice, and follow doctor's advice." },
    { question: "How do you recover after workouts?", answer: "Light stretching and enough sleep." },
    { question: "Do you follow any diet plan?", answer: "Not strict—just mindful eating." },
    { question: "What's your view on carbs?", answer: "They're essential; I choose complex carbs." },
    { question: "How do you cut sugar?", answer: "I avoid soda and sweet snacks." },
    { question: "Do you read nutrition labels?", answer: "Yes, I check sugar and salt first." },
    { question: "How do you boost your immune system?", answer: "Balanced diet, sleep, and regular exercise." },
    { question: "What motivates you to exercise?", answer: "Feeling energetic and healthy." },
    { question: "Do you set fitness goals?", answer: "Yes, monthly goals keep me focused." },
    { question: "How do you stay active at work?", answer: "I take walking breaks every hour." },
    { question: "What's a good beginner workout?", answer: "Brisk walking plus bodyweight exercises." },
    { question: "How long should a workout be?", answer: "30–45 minutes is enough for me." },
    { question: "Do you stretch every day?", answer: "Yes, especially after sitting for long." },
    { question: "How do you handle cravings?", answer: "I eat fruit or drink water first." },
    { question: "Do you meal‑prep?", answer: "Sometimes—on Sundays for the week." },
    { question: "What's a sign of dehydration?", answer: "Headache and dark urine." },
    { question: "How many hours do you sleep?", answer: "Usually seven to eight hours." },
    { question: "Do you prefer morning or evening workouts?", answer: "Morning—it sets a positive tone." },
    { question: "How do you stay consistent?", answer: "I schedule workouts like appointments." },
    { question: "What's your opinion on cheat meals?", answer: "They're fine if you return to routine." },
    { question: "How do you choose running shoes?", answer: "Comfort, support, and proper size." },
    { question: "What health habit are you building now?", answer: "Daily stretching and better posture." }
  ]
};

const MODULE_149_DATA = {
  title: "Society and Social Issues Vocabulary (B1 Level)",
  description: "Use B1 vocabulary to discuss society, inequality, and social issues.",
  intro: `Toplum, eşitsizlik ve sosyal sorunlar hakkında B1 seviyesinde konuşma pratiği.

📚 VOCABULARY:
• society - toplum
• community - topluluk
• inequality - eşitsizlik
• discrimination - ayrımcılık
• poverty - yoksulluk
• homelessness - evsizlik
• unemployment - işsizlik
• racism - ırkçılık
• gender equality - toplumsal cinsiyet eşitliği
• human rights - insan hakları
• social class - sosyal sınıf
• welfare - sosyal yardım
• healthcare - sağlık hizmetleri
• education - eğitim
• crime - suç
• violence - şiddet
• disability - engellilik
• migration - göç
• social justice - sosyal adalet
• activism - aktivizm`,
  tip: "Use 'inequality' (not unequality), 'discrimination' (not discriminate as a noun), 'gender equality' (not sex equality)",

  table: [
    { en: "society", tr: "toplum" },
    { en: "community", tr: "topluluk" },
    { en: "inequality", tr: "eşitsizlik" },
    { en: "discrimination", tr: "ayrımcılık" },
    { en: "poverty", tr: "yoksulluk" },
    { en: "homelessness", tr: "evsizlik" },
    { en: "unemployment", tr: "işsizlik" },
    { en: "racism", tr: "ırkçılık" },
    { en: "gender equality", tr: "toplumsal cinsiyet eşitliği" },
    { en: "human rights", tr: "insan hakları" },
    { en: "social class", tr: "sosyal sınıf" },
    { en: "welfare", tr: "sosyal yardım" },
    { en: "healthcare", tr: "sağlık hizmetleri" },
    { en: "education", tr: "eğitim" },
    { en: "crime", tr: "suç" },
    { en: "violence", tr: "şiddet" },
    { en: "disability", tr: "engellilik" },
    { en: "migration", tr: "göç" },
    { en: "social justice", tr: "sosyal adalet" },
    { en: "activism", tr: "aktivizm" }
  ],

  speakingPractice: [
    { question: "What makes a society strong?", answer: "Fair laws, good education, and active communities." },
    { question: "How can communities support the poor?", answer: "Food banks, job training, and counseling." },
    { question: "What causes inequality?", answer: "Unequal access to education and opportunities." },
    { question: "How can discrimination be reduced?", answer: "Education, strict laws, and awareness campaigns." },
    { question: "What are the effects of poverty?", answer: "Poor health, limited education, and stress." },
    { question: "How can homelessness be addressed?", answer: "Affordable housing and mental‑health services." },
    { question: "What can reduce unemployment?", answer: "Skills training and support for small businesses." },
    { question: "How can racism be challenged?", answer: "Speak up, educate, and protect equal rights." },
    { question: "Why is gender equality important?", answer: "It benefits the whole economy and society." },
    { question: "Why are human rights essential?", answer: "They protect freedom and dignity for all." },
    { question: "How does social class affect life?", answer: "It influences education, health, and networks." },
    { question: "What is the role of welfare?", answer: "To support people in tough times." },
    { question: "Why is healthcare access vital?", answer: "Everyone needs treatment regardless of income." },
    { question: "How does education change society?", answer: "It creates opportunity and reduces inequality." },
    { question: "Why does crime increase in some areas?", answer: "Lack of jobs, poor housing, and weak services." },
    { question: "How can violence be reduced?", answer: "Community programs and conflict resolution." },
    { question: "How can cities be safer for people with disabilities?", answer: "Accessible transport and buildings." },
    { question: "What are the effects of migration?", answer: "Cultural diversity and economic change." },
    { question: "What is social justice?", answer: "Fair treatment and equal opportunities." },
    { question: "How does activism help?", answer: "It raises awareness and pushes for change." },
    { question: "Should the rich pay more taxes?", answer: "Possibly, to fund services and reduce gaps." },
    { question: "How can we improve public transport?", answer: "Invest in routes, safety, and affordability." },
    { question: "Do social media help communities?", answer: "Yes, but they can also spread hate." },
    { question: "How can we support elderly people?", answer: "Home care, social clubs, and health services." },
    { question: "What role do NGOs play?", answer: "They fill gaps and support vulnerable groups." },
    { question: "How can schools teach tolerance?", answer: "Projects, mixed teams, and open discussion." },
    { question: "How to reduce youth unemployment?", answer: "Internships, apprenticeships, and career guidance." },
    { question: "Should education be free?", answer: "At least basic and essential levels should be." },
    { question: "How to make housing affordable?", answer: "Build more and control unfair rents." },
    { question: "What's the impact of fake news on society?", answer: "Misinformation divides people." },
    { question: "How do cultural festivals help society?", answer: "They build unity and celebrate diversity." },
    { question: "What is the role of local government?", answer: "Provide services and listen to residents." },
    { question: "How can volunteer work help?", answer: "It supports services and builds skills." },
    { question: "What creates community spirit?", answer: "Shared goals and regular events." },
    { question: "How can bullying be reduced?", answer: "Clear rules, support lines, and education." },
    { question: "Why is freedom of speech important?", answer: "It allows debate and exposes problems." },
    { question: "Should voting be compulsory?", answer: "It could improve representation." },
    { question: "How can we support mental health?", answer: "Affordable counseling and awareness at work and school." },
    { question: "What is the effect of long‑term unemployment?", answer: "Lower confidence and social isolation." },
    { question: "How can neighborhoods welcome immigrants?", answer: "Language classes and cultural exchange programs." }
  ]
};

const MODULE_150_DATA = {
  title: "Travel and Adventure Vocabulary (B1 Level)",
  description: "Use B1 travel/adventure vocabulary to discuss trips, plans, and outdoor activities.",
  intro: `Seyahat ve macera ile ilgili kelimelerle planlama ve deneyimler hakkında konuşma.

📚 VOCABULARY:
• destination - varış noktası
• journey - yolculuk
• adventure - macera
• backpacking - sırt çantalı seyahat
• tourist - turist
• itinerary - gezi planı
• sightseeing - turistik gezi
• passport - pasaport
• luggage - bagaj
• accommodation - konaklama
• reservation - rezervasyon
• flight - uçuş
• airport - havaalanı
• adventure sports - macera sporları
• travel agency - seyahat acentesi
• hiking - doğa yürüyüşü
• camping - kamp yapma
• tour guide - rehber
• souvenir - hediyelik eşya
• map - harita`,
  tip: "Use 'destination' for where you're going, 'journey' for the trip itself. Say 'accommodation' (not accommodations), 'luggage' (not luggages)",

  table: [
    { en: "destination", tr: "varış noktası" },
    { en: "journey", tr: "yolculuk" },
    { en: "adventure", tr: "macera" },
    { en: "backpacking", tr: "sırt çantalı seyahat" },
    { en: "tourist", tr: "turist" },
    { en: "itinerary", tr: "gezi planı" },
    { en: "sightseeing", tr: "turistik gezi" },
    { en: "passport", tr: "pasaport" },
    { en: "luggage", tr: "bagaj" },
    { en: "accommodation", tr: "konaklama" },
    { en: "reservation", tr: "rezervasyon" },
    { en: "flight", tr: "uçuş" },
    { en: "airport", tr: "havaalanı" },
    { en: "adventure sports", tr: "macera sporları" },
    { en: "travel agency", tr: "seyahat acentesi" },
    { en: "hiking", tr: "doğa yürüyüşü" },
    { en: "camping", tr: "kamp yapma" },
    { en: "tour guide", tr: "rehber" },
    { en: "souvenir", tr: "hediyelik eşya" },
    { en: "map", tr: "harita" }
  ],

  speakingPractice: [
    { question: "What is your dream travel destination?", answer: "Japan—I want to see Kyoto and Tokyo." },
    { question: "Do you prefer a short trip or a long journey?", answer: "A long journey to explore deeply." },
    { question: "What do you pack first in your luggage?", answer: "Passport, wallet, and charger." },
    { question: "How do you plan your itinerary?", answer: "I list must‑see places and group them by area." },
    { question: "Do you book accommodation in advance?", answer: "Yes, to get better prices and locations." },
    { question: "Window or aisle seat on a flight?", answer: "Window—for views and sleeping." },
    { question: "How early do you arrive at the airport?", answer: "About two hours before the flight." },
    { question: "What's your favorite kind of accommodation?", answer: "Small guesthouses with local charm." },
    { question: "Do you like adventure sports?", answer: "Yes, I'd try rafting and zip‑lining." },
    { question: "What's the best souvenir to buy?", answer: "Something handmade by local artisans." },
    { question: "Do you use a travel agency?", answer: "Sometimes, for complex trips." },
    { question: "How do you avoid losing luggage?", answer: "I use a tracker and a unique tag." },
    { question: "What apps help you when traveling?", answer: "Maps, translation, and booking apps." },
    { question: "Do you prefer city trips or nature trips?", answer: "Nature—hiking and lakes relax me." },
    { question: "How do you budget for travel?", answer: "I set a daily limit for food and transport." },
    { question: "What's your favorite sightseeing activity?", answer: "Walking tours to learn history." },
    { question: "How do you stay safe while backpacking?", answer: "Keep valuables hidden and share my location." },
    { question: "Best way to meet locals?", answer: "Join small tours or cooking classes." },
    { question: "How do you handle jet lag?", answer: "I adapt to local time immediately." },
    { question: "What's your travel photography tip?", answer: "Shoot early morning for fewer crowds." },
    { question: "Do you like camping?", answer: "Yes, especially in summer by a lake." },
    { question: "How do you choose a tour guide?", answer: "Check reviews and group size." },
    { question: "What do you do when flights are delayed?", answer: "I contact the airline and check alternatives." },
    { question: "Beach or mountains?", answer: "Mountains—I enjoy hiking." },
    { question: "What's your must‑have map skill?", answer: "Download offline maps before leaving." },
    { question: "Do you travel light or heavy?", answer: "Light—carry‑on only if possible." },
    { question: "Best time to buy flight tickets?", answer: "Several weeks in advance, mid‑week." },
    { question: "How do you keep documents safe?", answer: "Use a money belt and cloud copies." },
    { question: "Do you try local food?", answer: "Always—that's part of the adventure." },
    { question: "How do you reduce travel costs?", answer: "Use public transport and cook sometimes." },
    { question: "Have you ever gotten lost while sightseeing?", answer: "Yes, but it led to a great café." },
    { question: "What's your favorite travel memory?", answer: "Sunrise over a mountain campsite." },
    { question: "Group travel or solo travel?", answer: "Solo—flexible and freeing." },
    { question: "How do you stay healthy on trips?", answer: "Walk a lot and keep water with me." },
    { question: "What's your strategy for reservations?", answer: "Free‑cancellation options when possible." },
    { question: "Do you send postcards?", answer: "Yes, to family and close friends." },
    { question: "How do you plan for bad weather?", answer: "Add indoor museums to the itinerary." },
    { question: "What's your hiking essential?", answer: "Comfortable boots and a small first‑aid kit." },
    { question: "Would you try skydiving on vacation?", answer: "Yes, if the place is reputable." }
  ]
};

// Export all A1, A2, and B1 module data
export {
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
};
