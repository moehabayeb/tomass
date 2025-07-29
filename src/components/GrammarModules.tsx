import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, BookOpen, Target, Trophy, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Lottie from 'lottie-react';
import { supabase } from '@/integrations/supabase/client';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
import BookmarkButton from './BookmarkButton';
import { useGamification } from '@/hooks/useGamification';
import { useBadgeSystem } from '@/hooks/useBadgeSystem';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useAvatarState } from '@/hooks/useAvatarState';
import AnimatedAvatar from './AnimatedAvatar';

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

// A1 Grammar Topics - 25 Modules in Reordered Pedagogical Structure
const grammarTopics = [
  {
    id: 1,
    title: "Verb to Be (am, is, are) Positive Sentences",
    description: "Learn how to use am, is, and are correctly in positive sentences",
    lesson: "The verb 'to be' is the foundation of English grammar. Türkçedeki 'olmak' fiili gibi, cümlelerimizin temelini oluşturur.\n\n✓ I am (Ben...) - Always use 'am' with 'I'\n✓ You are (Sen.../Siz...) - Use 'are' with 'you'\n✓ He/She/It is (O...) - Use 'is' with third person singular\n✓ We are (Biz...) - Use 'are' with 'we'\n✓ They are (Onlar...) - Use 'are' with 'they'\n\nÖrnekler:\n- I am happy. (Ben mutluyum.)\n- She is a teacher. (O bir öğretmendir.)\n- They are students. (Onlar öğrencilerdir.)",
    exercises: [
      {
        question: "Complete: I ___ happy today.",
        options: ["am", "is", "are"],
        correct: 0,
        explanation: "Use 'am' with 'I' - Ben ile her zaman 'am' kullanırız."
      },
      {
        question: "Complete: She ___ a doctor.",
        options: ["am", "is", "are"],
        correct: 1,
        explanation: "Use 'is' with 'she' - Tekil üçüncü şahıslar ile 'is' kullanırız."
      },
      {
        question: "Complete: We ___ friends.",
        options: ["am", "is", "are"],
        correct: 2,
        explanation: "Use 'are' with 'we' - Çoğul özneler ile 'are' kullanırız."
      }
    ]
  },
  {
    id: 2,
    title: "Verb to Be (am, is, are) Negative Sentences",
    description: "Learn how to make negative sentences with 'to be'",
    lesson: "Olumsuz cümlelerde 'not' kelimesini fiilden sonra ekliyoruz.\n\n✓ I am not (I'm not) - Ben değilim\n✓ You are not (You're not / You aren't) - Sen değilsin\n✓ He/She/It is not (isn't) - O değil\n✓ We are not (We're not / We aren't) - Biz değiliz\n✓ They are not (They're not / They aren't) - Onlar değil\n\nKısaltmalar:\n- is not = isn't\n- are not = aren't\n- I am not kısaltılamaz (I amn't diye bir şey yoktur)",
    exercises: [
      {
        question: "Complete the negative: I ___ not tired.",
        options: ["am", "isn't", "aren't"],
        correct: 0,
        explanation: "'I' ile her zaman 'am not' kullanırız. 'I amn't' diye bir kısaltma yoktur."
      },
      {
        question: "Choose the correct negative: She ___ ready.",
        options: ["am not", "isn't", "aren't"],
        correct: 1,
        explanation: "'She' tekil olduğu için 'isn't' kullanırız."
      },
      {
        question: "Complete: They ___ at home.",
        options: ["am not", "isn't", "aren't"],
        correct: 2,
        explanation: "'They' çoğul olduğu için 'aren't' kullanırız."
      }
    ]
  },
  {
    id: 3,
    title: "Verb to Be (am, is, are) Yes/No Questions",
    description: "Learn to form Yes/No questions with 'to be'",
    lesson: "Evet/Hayır soruları için fiili öznenin önüne getiriyoruz.\n\n✓ Am I...? (Ben ... mıyım?)\n✓ Are you...? (Sen ... mısın?)\n✓ Is he/she/it...? (O ... mı?)\n✓ Are we...? (Biz ... mıyız?)\n✓ Are they...? (Onlar ... mı?)\n\nÖrnekler:\n- Am I late? (Geç kaldım mı?)\n- Is she a teacher? (O öğretmen mi?)\n- Are they students? (Onlar öğrenci mi?)",
    exercises: [
      {
        question: "Form a question: ___ you ready?",
        options: ["Am", "Is", "Are"],
        correct: 2,
        explanation: "'You' ile soru yaparken 'Are you...?' kullanırız."
      },
      {
        question: "Form a question: ___ he at home?",
        options: ["Am", "Is", "Are"],
        correct: 1,
        explanation: "'He' tekil olduğu için 'Is he...?' kullanırız."
      },
      {
        question: "Form a question: ___ they friends?",
        options: ["Am", "Is", "Are"],
        correct: 2,
        explanation: "'They' çoğul olduğu için 'Are they...?' kullanırız."
      }
    ]
  },
  {
    id: 4,
    title: "Subject Pronouns (I, you, he, she, it, we, they)",
    description: "Master the basic subject pronouns",
    lesson: "Özne zamirleri cümlenin öznesi olan kelimelerdir. İsimlerin yerine kullanılırlar.\n\n✓ I (Ben) - kendimizi kastederken\n✓ You (Sen/Siz) - karşımızdaki kişi/kişiler\n✓ He (O - erkek) - erkek kişiler için\n✓ She (O - kadın) - kadın kişiler için\n✓ It (O - nesne/hayvan) - nesneler ve hayvanlar için\n✓ We (Biz) - kendimiz dahil grup\n✓ They (Onlar) - başka kişi/nesne grubu\n\nÖrnek: Ali is tall. → He is tall.",
    exercises: [
      {
        question: "Replace 'John': ___ is my brother.",
        options: ["He", "She", "It"],
        correct: 0,
        explanation: "John erkek ismi olduğu için 'He' kullanırız."
      },
      {
        question: "Replace 'the cat': ___ is sleeping.",
        options: ["He", "She", "It"],
        correct: 2,
        explanation: "Hayvanlar ve nesneler için 'It' kullanırız."
      },
      {
        question: "Replace 'my friends and I': ___ are happy.",
        options: ["We", "They", "You"],
        correct: 0,
        explanation: "Kendimizi de dahil edince 'We' kullanırız."
      }
    ]
  },
  {
    id: 5,
    title: "Object Pronouns (me, you, him, her, it, us, them)",
    description: "Learn object pronouns to replace nouns in object position",
    lesson: "Nesne zamirleri cümlenin nesnesi konumundaki isimlerin yerine kullanılır.\n\n✓ me (beni/bana) - I → me\n✓ you (seni/sana, sizi/size) - you → you\n✓ him (onu/ona - erkek) - he → him\n✓ her (onu/ona - kadın) - she → her\n✓ it (onu/ona - nesne/hayvan) - it → it\n✓ us (bizi/bize) - we → us\n✓ them (onları/onlara) - they → them\n\nÖrnekler:\n- I love my mother. → I love her.\n- Call John! → Call him!",
    exercises: [
      {
        question: "Replace 'Sarah': I know ___.",
        options: ["she", "her", "him"],
        correct: 1,
        explanation: "Nesne konumunda kadın için 'her' kullanırız."
      },
      {
        question: "Replace 'my parents': I visit ___ every week.",
        options: ["they", "them", "their"],
        correct: 1,
        explanation: "Çoğul nesne için 'them' kullanırız."
      },
      {
        question: "Replace 'the book': Please give ___ to me.",
        options: ["he", "she", "it"],
        correct: 2,
        explanation: "Nesne ve hayvanlar için 'it' kullanırız."
      }
    ]
  },
  {
    id: 6,
    title: "Possessive Adjectives (my, your, his, her, its, our, their)",
    description: "Learn possessive adjectives to show ownership",
    lesson: "İyelik sıfatları sahiplik bildiren kelimelerdir. İsimden önce kullanılırlar.\n\n✓ My (Benim) - I → my\n✓ Your (Senin/Sizin) - You → your\n✓ His (Onun - erkek) - He → his\n✓ Her (Onun - kadın) - She → her\n✓ Its (Onun - nesne/hayvan) - It → its\n✓ Our (Bizim) - We → our\n✓ Their (Onların) - They → their\n\nÖrnekler:\n- This is my book. (Bu benim kitabım.)\n- Her name is Sarah. (Onun adı Sarah.)",
    exercises: [
      {
        question: "Complete: This is ___ car. (Ben)",
        options: ["my", "your", "his"],
        correct: 0,
        explanation: "'I' için iyelik sıfatı 'my'dir."
      },
      {
        question: "Complete: ___ house is big. (O - kadın)",
        options: ["His", "Her", "Its"],
        correct: 1,
        explanation: "Kadın için iyelik sıfatı 'her'dir."
      },
      {
        question: "Complete: ___ children are at school. (Onlar)",
        options: ["Our", "Your", "Their"],
        correct: 2,
        explanation: "'They' için iyelik sıfatı 'their'dir."
      }
    ]
  },
  {
    id: 7,
    title: "Possessive Pronouns (mine, yours, his, hers, ours, theirs)",
    description: "Learn possessive pronouns that replace possessive adjective + noun",
    lesson: "İyelik zamirleri sahiplik gösteren ve ismin yerine geçen kelimelerdir.\n\n✓ mine (benimki) - my book → mine\n✓ yours (seninki/sizinki) - your car → yours\n✓ his (onunki - erkek) - his pen → his\n✓ hers (onunki - kadın) - her bag → hers\n✓ ours (bizimki) - our house → ours\n✓ theirs (onlarınki) - their books → theirs\n\nDikkat: 'its' için iyelik zamiri yoktur!\n\nÖrnekler:\n- This book is mine. (Bu kitap benimki.)\n- That car is theirs. (Şu araba onlarınki.)",
    exercises: [
      {
        question: "Complete: This book is ___. (benim)",
        options: ["my", "mine", "me"],
        correct: 1,
        explanation: "İyelik zamiri olarak 'mine' kullanırız."
      },
      {
        question: "Complete: The red car is ___. (onların)",
        options: ["their", "theirs", "them"],
        correct: 1,
        explanation: "Çoğul için iyelik zamiri 'theirs'dir."
      },
      {
        question: "Complete: Is this pen ___? (senin)",
        options: ["your", "yours", "you"],
        correct: 1,
        explanation: "İyelik zamiri olarak 'yours' kullanırız."
      }
    ]
  },
  {
    id: 8,
    title: "This / That / These / Those",
    description: "Learn demonstrative adjectives and pronouns",
    lesson: "İşaret sıfat ve zamirleri uzaklığı ve sayıyı belirtir.\n\n✓ This (Bu - tekil, yakın) - yakındaki tek nesne\n✓ That (Şu/O - tekil, uzak) - uzaktaki tek nesne\n✓ These (Bunlar - çoğul, yakın) - yakındaki çok nesne\n✓ Those (Şunlar/Onlar - çoğul, uzak) - uzaktaki çok nesne\n\nÖrnekler:\n- This book is mine. (Bu kitap benim.)\n- Those cars are expensive. (Şu arabalar pahalı.)",
    exercises: [
      {
        question: "Choose: ___ pen is mine. (yakındaki tek kalem)",
        options: ["This", "That", "These"],
        correct: 0,
        explanation: "Yakındaki tek nesne için 'This' kullanırız."
      },
      {
        question: "Choose: ___ books are heavy. (yakındaki kitaplar)",
        options: ["This", "That", "These"],
        correct: 2,
        explanation: "Yakındaki çoğul nesneler için 'These' kullanırız."
      },
      {
        question: "Choose: ___ house is beautiful. (uzaktaki ev)",
        options: ["This", "That", "Those"],
        correct: 1,
        explanation: "Uzaktaki tek nesne için 'That' kullanırız."
      }
    ]
  },
  {
    id: 6,
    title: "Possessive Adjectives (my, your, his, her, its, our, their)",
    description: "Learn possessive adjectives to show ownership",
    lesson: "İyelik sıfatları sahiplik bildiren kelimelerdir. İsimden önce kullanılırlar.\n\n✓ My (Benim) - I → my\n✓ Your (Senin/Sizin) - You → your\n✓ His (Onun - erkek) - He → his\n✓ Her (Onun - kadın) - She → her\n✓ Its (Onun - nesne/hayvan) - It → its\n✓ Our (Bizim) - We → our\n✓ Their (Onların) - They → their\n\nÖrnekler:\n- This is my book. (Bu benim kitabım.)\n- Her name is Sarah. (Onun adı Sarah.)",
    exercises: [
      {
        question: "Complete: This is ___ car. (Ben)",
        options: ["my", "your", "his"],
        correct: 0,
        explanation: "'I' için iyelik sıfatı 'my'dir."
      },
      {
        question: "Complete: ___ house is big. (O - kadın)",
        options: ["His", "Her", "Its"],
        correct: 1,
        explanation: "Kadın için iyelik sıfatı 'her'dir."
      },
      {
        question: "Complete: ___ children are at school. (Onlar)",
        options: ["Our", "Your", "Their"],
        correct: 2,
        explanation: "'They' için iyelik sıfatı 'their'dir."
      }
    ]
  },
  {
    id: 7,
    title: "This / That / These / Those",
    description: "Learn demonstrative adjectives and pronouns",
    lesson: "İşaret sıfat ve zamirleri uzaklığı ve sayıyı belirtir.\n\n✓ This (Bu - tekil, yakın) - yakındaki tek nesne\n✓ That (Şu/O - tekil, uzak) - uzaktaki tek nesne\n✓ These (Bunlar - çoğul, yakın) - yakındaki çok nesne\n✓ Those (Şunlar/Onlar - çoğul, uzak) - uzaktaki çok nesne\n\nÖrnekler:\n- This book is mine. (Bu kitap benim.)\n- Those cars are expensive. (Şu arabalar pahalı.)",
    exercises: [
      {
        question: "Choose: ___ pen is mine. (yakındaki tek kalem)",
        options: ["This", "That", "These"],
        correct: 0,
        explanation: "Yakındaki tek nesne için 'This' kullanırız."
      },
      {
        question: "Choose: ___ books are heavy. (yakındaki kitaplar)",
        options: ["This", "That", "These"],
        correct: 2,
        explanation: "Yakındaki çoğul nesneler için 'These' kullanırız."
      },
      {
        question: "Choose: ___ house is beautiful. (uzaktaki ev)",
        options: ["This", "That", "Those"],
        correct: 1,
        explanation: "Uzaktaki tek nesne için 'That' kullanırız."
      }
    ]
  },
  {
    id: 8,
    title: "There is / There are – Positive",
    description: "Learn to talk about existence and location",
    lesson: "'There is/are' varlık ve konum bildirmek için kullanılır. Türkçede 'var' anlamındadır.\n\n✓ There is + tekil isim (There is vardır - tekil)\n✓ There are + çoğul isim (There are vardır - çoğul)\n\nÖrnekler:\n- There is a book on the table. (Masada bir kitap var.)\n- There are students in the classroom. (Sınıfta öğrenciler var.)\n\nDikkat: İsim tekil ise 'is', çoğul ise 'are' kullanırız.",
    exercises: [
      {
        question: "Complete: There ___ a cat in the garden.",
        options: ["is", "are"],
        correct: 0,
        explanation: "'A cat' tekil olduğu için 'There is' kullanırız."
      },
      {
        question: "Complete: There ___ many people here.",
        options: ["is", "are"],
        correct: 1,
        explanation: "'Many people' çoğul olduğu için 'There are' kullanırız."
      },
      {
        question: "Complete: There ___ an apple on the desk.",
        options: ["is", "are"],
        correct: 0,
        explanation: "'An apple' tekil olduğu için 'There is' kullanırız."
      }
    ]
  },
  {
    id: 9,
    title: "There is / There are – Negative",
    description: "Learn negative forms of 'there is/are'",
    lesson: "Olumsuz formlarda 'not' kelimesini ekliyoruz.\n\n✓ There is not (There isn't) + tekil isim\n✓ There are not (There aren't) + çoğul isim\n\nÖrnekler:\n- There isn't a dog in the house. (Evde köpek yok.)\n- There aren't any cars in the street. (Sokakta araba yok.)\n\nKısaltmalar:\n- is not = isn't\n- are not = aren't",
    exercises: [
      {
        question: "Complete: There ___ any milk in the fridge.",
        options: ["isn't", "aren't"],
        correct: 0,
        explanation: "'Milk' sayılamayan tekil isim olduğu için 'isn't' kullanırız."
      },
      {
        question: "Complete: There ___ students in the library.",
        options: ["isn't", "aren't"],
        correct: 1,
        explanation: "'Students' çoğul olduğu için 'aren't' kullanırız."
      },
      {
        question: "Complete: There ___ a computer here.",
        options: ["isn't", "aren't"],
        correct: 0,
        explanation: "'A computer' tekil olduğu için 'isn't' kullanırız."
      }
    ]
  },
  {
    id: 10,
    title: "There is / There are – Questions",
    description: "Learn to form questions with 'there is/are'",
    lesson: "Sorularda 'is/are' kelimesini 'there'dan önce getiriyoruz.\n\n✓ Is there + tekil isim?\n✓ Are there + çoğul isim?\n\nÖrnekler:\n- Is there a bank near here? (Yakında banka var mı?)\n- Are there any books on the shelf? (Rafta kitap var mı?)\n\nKısa cevaplar:\n- Yes, there is. / No, there isn't.\n- Yes, there are. / No, there aren't.",
    exercises: [
      {
        question: "Form a question: ___ there a park near here?",
        options: ["Is", "Are"],
        correct: 0,
        explanation: "'A park' tekil olduğu için 'Is there' kullanırız."
      },
      {
        question: "Form a question: ___ there any apples?",
        options: ["Is", "Are"],
        correct: 1,
        explanation: "'Apples' çoğul olduğu için 'Are there' kullanırız."
      },
      {
        question: "Answer: 'Is there a post office here?' (No)",
        options: ["No, there isn't", "No, there aren't", "No, it isn't"],
        correct: 0,
        explanation: "Tekil soru için olumsuz cevap: 'No, there isn't.'"
      }
    ]
  },
  {
    id: 11,
    title: "Articles: a / an / the – Basic Usage",
    description: "Master the basic use of English articles",
    lesson: "Belirsiz ve belirli tanımlıklar isimleri tanımlamak için kullanılır.\n\n✓ A + ünsüz sesle başlayan kelimeler (a car, a house)\n✓ An + ünlü sesle başlayan kelimeler (an apple, an hour)\n✓ The + belirli, özel şeyler (the sun, the book I bought)\n\nDikkat: Harfe değil, SESE bakın!\n- a university (yu- ünsüz ses)\n- an hour (h sessiz, o- ünlü ses)",
    exercises: [
      {
        question: "Choose: I need ___ pen.",
        options: ["a", "an", "the"],
        correct: 0,
        explanation: "'Pen' ünsüz sesle başladığı için 'a' kullanırız."
      },
      {
        question: "Choose: She bought ___ umbrella.",
        options: ["a", "an", "the"],
        correct: 1,
        explanation: "'Umbrella' ünlü sesle başladığı için 'an' kullanırız."
      },
      {
        question: "Choose: ___ moon is beautiful tonight.",
        options: ["A", "An", "The"],
        correct: 2,
        explanation: "Ay tek olduğu için 'the' kullanırız."
      }
    ]
  },
  {
    id: 12,
    title: "Plurals: Regular and Irregular Nouns",
    description: "Learn how to form plural nouns",
    lesson: "Çoğul isimleri farklı şekillerde yapıyoruz.\n\nDüzenli çoğullar:\n✓ +s: book → books, car → cars\n✓ +es: box → boxes, dress → dresses\n✓ y→ies: city → cities, baby → babies\n\nDüzensiz çoğullar:\n✓ child → children\n✓ man → men, woman → women\n✓ tooth → teeth, foot → feet\n✓ mouse → mice, goose → geese",
    exercises: [
      {
        question: "What's the plural of 'book'?",
        options: ["books", "bookes", "book"],
        correct: 0,
        explanation: "Düzenli isimler için sadece 's' ekleriz: book → books"
      },
      {
        question: "What's the plural of 'child'?",
        options: ["childs", "childes", "children"],
        correct: 2,
        explanation: "'Child' düzensiz çoğuldur: child → children"
      },
      {
        question: "What's the plural of 'box'?",
        options: ["boxs", "boxes", "boxies"],
        correct: 1,
        explanation: "'x' ile biten kelimeler için 'es' ekleriz: box → boxes"
      }
    ]
  },
  {
    id: 13,
    title: "Have got / Has got – Positive",
    description: "Learn to express possession with 'have got'",
    lesson: "'Have got/Has got' sahiplik bildirmek için kullanılır. Türkçede '...var/sahip olmak' anlamındadır.\n\n✓ I have got (I've got)\n✓ You have got (You've got)\n✓ He/She/It has got (He's/She's/It's got)\n✓ We have got (We've got)\n✓ They have got (They've got)\n\nÖrnekler:\n- I have got a car. (Benim bir arabam var.)\n- She has got blue eyes. (Onun mavi gözleri var.)",
    exercises: [
      {
        question: "Complete: I ___ got a new phone.",
        options: ["have", "has", "am"],
        correct: 0,
        explanation: "'I' ile 'have got' kullanırız."
      },
      {
        question: "Complete: She ___ got a beautiful dress.",
        options: ["have", "has", "is"],
        correct: 1,
        explanation: "'She' ile 'has got' kullanırız."
      },
      {
        question: "Complete: They ___ got a big house.",
        options: ["have", "has", "are"],
        correct: 0,
        explanation: "'They' ile 'have got' kullanırız."
      }
    ]
  },
  {
    id: 14,
    title: "Have got / Has got – Negative",
    description: "Learn negative forms of 'have got'",
    lesson: "Olumsuz formlarda 'not' kelimesini 'have/has'tan sonra ekliyoruz.\n\n✓ I have not got (I haven't got)\n✓ You have not got (You haven't got)\n✓ He/She/It has not got (He/She/It hasn't got)\n✓ We have not got (We haven't got)\n✓ They have not got (They haven't got)\n\nÖrnekler:\n- I haven't got time. (Vaktim yok.)\n- He hasn't got a car. (Onun arabası yok.)",
    exercises: [
      {
        question: "Complete: I ___ got any money.",
        options: ["haven't", "hasn't", "am not"],
        correct: 0,
        explanation: "'I' ile 'haven't got' kullanırız."
      },
      {
        question: "Complete: She ___ got a sister.",
        options: ["haven't", "hasn't", "isn't"],
        correct: 1,
        explanation: "'She' ile 'hasn't got' kullanırız."
      },
      {
        question: "Complete: We ___ got tickets.",
        options: ["haven't", "hasn't", "aren't"],
        correct: 0,
        explanation: "'We' ile 'haven't got' kullanırız."
      }
    ]
  },
  {
    id: 15,
    title: "Have got / Has got – Questions",
    description: "Learn to form questions with 'have got'",
    lesson: "Sorularda 'have/has' kelimesini öznenin önüne getiriyoruz.\n\n✓ Have I got...?\n✓ Have you got...?\n✓ Has he/she/it got...?\n✓ Have we got...?\n✓ Have they got...?\n\nKısa cevaplar:\n- Yes, I have. / No, I haven't.\n- Yes, she has. / No, she hasn't.\n\nÖrnekler:\n- Have you got a pen? (Kaleminiz var mı?)\n- Has she got children? (Onun çocukları var mı?)",
    exercises: [
      {
        question: "Form a question: ___ you got a car?",
        options: ["Have", "Has", "Are"],
        correct: 0,
        explanation: "'You' ile 'Have you got...?' kullanırız."
      },
      {
        question: "Form a question: ___ she got a dog?",
        options: ["Have", "Has", "Is"],
        correct: 1,
        explanation: "'She' ile 'Has she got...?' kullanırız."
      },
      {
        question: "Answer: 'Have you got brothers?' (Yes)",
        options: ["Yes, I am", "Yes, I have", "Yes, I do"],
        correct: 1,
        explanation: "'Have got' sorusuna 'Yes, I have.' şeklinde cevap veririz."
      }
    ]
  },
  {
    id: 16,
    title: "Simple Present Affirmative (I/You/We/They)",
    description: "Learn Simple Present tense for I, you, we, they",
    lesson: "Geniş Zaman alışkanlıklar, gerçekler ve rutin işler için kullanılır.\n\nI/You/We/They + fiil (taban hali)\n\n✓ I work every day. (Her gün çalışırım.)\n✓ You live in Istanbul. (İstanbul'da yaşıyorsun.)\n✓ We play football. (Futbol oynarız.)\n✓ They study English. (İngilizce çalışırlar.)\n\nDikkat: I, you, we, they ile fiil hiç değişmez!",
    exercises: [
      {
        question: "Complete: I ___ English every day.",
        options: ["study", "studies", "studying"],
        correct: 0,
        explanation: "'I' ile fiilin taban halini kullanırız: study"
      },
      {
        question: "Complete: They ___ in London.",
        options: ["live", "lives", "living"],
        correct: 0,
        explanation: "'They' ile fiilin taban halini kullanırız: live"
      },
      {
        question: "Complete: We ___ coffee in the morning.",
        options: ["drink", "drinks", "drinking"],
        correct: 0,
        explanation: "'We' ile fiilin taban halini kullanırız: drink"
      }
    ]
  },
  {
    id: 17,
    title: "Simple Present Affirmative (He/She/It)",
    description: "Learn Simple Present tense for he, she, it",
    lesson: "He/She/It ile fiile '-s' veya '-es' ekliyoruz.\n\nKurallar:\n✓ Normal fiiller: +s (work → works)\n✓ s,x,ch,sh,o ile bitenler: +es (go → goes)\n✓ ünsüz+y ile bitenler: y→ies (study → studies)\n\nÖrnekler:\n- He works in a bank. (Bankada çalışır.)\n- She goes to school. (Okula gider.)\n- It rains a lot. (Çok yağmur yağar.)",
    exercises: [
      {
        question: "Complete: She ___ English very well.",
        options: ["speak", "speaks", "speaking"],
        correct: 1,
        explanation: "'She' ile fiile 's' ekliyoruz: speaks"
      },
      {
        question: "Complete: He ___ to work by bus.",
        options: ["go", "goes", "going"],
        correct: 1,
        explanation: "'Go' fiili 'o' ile bittiği için 'es' ekliyoruz: goes"
      },
      {
        question: "Complete: It ___ math at university.",
        options: ["study", "studies", "studying"],
        correct: 1,
        explanation: "'Study' fiili ünsüz+y ile bittiği için y→ies: studies"
      }
    ]
  },
  {
    id: 18,
    title: "Simple Present Negative (Don't / Doesn't)",
    description: "Learn negative forms in Simple Present",
    lesson: "Olumsuz cümlelerde 'do not (don't)' veya 'does not (doesn't)' kullanırız.\n\n✓ I/You/We/They + don't + fiil (taban hali)\n✓ He/She/It + doesn't + fiil (taban hali)\n\nÖrnekler:\n- I don't like coffee. (Kahveyi sevmem.)\n- She doesn't work on Sundays. (Pazar günleri çalışmaz.)\n\nDikkat: 'doesn't' kullandığımızda fiile 's' eklemeyin!",
    exercises: [
      {
        question: "Complete: I ___ watch TV much.",
        options: ["don't", "doesn't", "not"],
        correct: 0,
        explanation: "'I' ile 'don't' kullanırız."
      },
      {
        question: "Complete: She ___ like swimming.",
        options: ["don't", "doesn't", "not"],
        correct: 1,
        explanation: "'She' ile 'doesn't' kullanırız."
      },
      {
        question: "Complete: They ___ live here.",
        options: ["don't", "doesn't", "not"],
        correct: 0,
        explanation: "'They' ile 'don't' kullanırız."
      }
    ]
  },
  {
    id: 19,
    title: "Simple Present – Yes/No Questions",
    description: "Learn to form Yes/No questions in Simple Present",
    lesson: "Evet/Hayır soruları için 'Do' veya 'Does' kullanırız.\n\n✓ Do + I/you/we/they + fiil?\n✓ Does + he/she/it + fiil?\n\nÖrnekler:\n- Do you speak English? (İngilizce biliyor musun?)\n- Does she work here? (Burada çalışıyor mu?)\n\nKısa cevaplar:\n- Yes, I do. / No, I don't.\n- Yes, she does. / No, she doesn't.",
    exercises: [
      {
        question: "Form a question: ___ you like pizza?",
        options: ["Do", "Does", "Are"],
        correct: 0,
        explanation: "'You' ile 'Do' kullanırız."
      },
      {
        question: "Form a question: ___ he play football?",
        options: ["Do", "Does", "Is"],
        correct: 1,
        explanation: "'He' ile 'Does' kullanırız."
      },
      {
        question: "Answer: 'Do you work?' (Yes)",
        options: ["Yes, I work", "Yes, I do", "Yes, I am"],
        correct: 1,
        explanation: "'Do' sorusuna 'Yes, I do.' şeklinde cevap veririz."
      }
    ]
  },
  {
    id: 20,
    title: "Simple Present – Wh- Questions (What, Where, Who...)",
    description: "Learn to form information questions",
    lesson: "Bilgi soruları soru kelimeleri ile başlar.\n\nSoru kelimeleri:\n✓ What (Ne?) - nesne/şey sorar\n✓ Where (Nerede?) - yer sorar\n✓ Who (Kim?) - kişi sorar\n✓ When (Ne zaman?) - zaman sorar\n✓ Why (Neden?) - sebep sorar\n✓ How (Nasıl?) - yöntem sorar\n\nYapı: Soru kelimesi + do/does + özne + fiil?\nÖrnek: Where do you live? (Nerede yaşıyorsun?)",
    exercises: [
      {
        question: "Complete: ___ do you live?",
        options: ["What", "Where", "Who"],
        correct: 1,
        explanation: "Yer sormak için 'Where' kullanırız."
      },
      {
        question: "Complete: ___ does she work?",
        options: ["What", "Where", "When"],
        correct: 1,
        explanation: "Çalıştığı yer için 'Where' kullanırız."
      },
      {
        question: "Complete: ___ do you study English?",
        options: ["What", "Why", "Who"],
        correct: 1,
        explanation: "Sebep sormak için 'Why' kullanırız."
      }
    ]
  },
  {
    id: 21,
    title: "Adverbs of Frequency (always, usually, sometimes, never)",
    description: "Learn frequency adverbs to express how often",
    lesson: "Sıklık zarfları bir şeyin ne sıklıkla yapıldığını belirtir.\n\n✓ Always (Her zaman) - %100\n✓ Usually (Genellikle) - %80\n✓ Often (Sık sık) - %60\n✓ Sometimes (Bazen) - %40\n✓ Rarely (Nadiren) - %20\n✓ Never (Hiçbir zaman) - %0\n\nKonum: Özne + sıklık zarfı + ana fiil\nÖrnek: I always drink coffee. (Her zaman kahve içerim.)",
    exercises: [
      {
        question: "Complete: I ___ eat breakfast. (%100)",
        options: ["sometimes", "usually", "always"],
        correct: 2,
        explanation: "%100 için 'always' kullanırız."
      },
      {
        question: "Complete: She ___ goes to gym. (%40)",
        options: ["always", "sometimes", "never"],
        correct: 1,
        explanation: "%40 için 'sometimes' kullanırız."
      },
      {
        question: "Complete: They ___ smoke. (%0)",
        options: ["always", "usually", "never"],
        correct: 2,
        explanation: "%0 için 'never' kullanırız."
      }
    ]
  },
  {
    id: 22,
    title: "Can / Can't for Ability",
    description: "Express ability and inability with 'can'",
    lesson: "'Can' yetenek ve beceri bildirmek için kullanılır. Türkçede '-abilmek' anlamındadır.\n\nOlumlu: Özne + can + fiil (taban hali)\nOlumsuz: Özne + can't (cannot) + fiil\n\nÖrnekler:\n- I can swim. (Yüzebilirim.)\n- She can speak English. (İngilizce konuşabilir.)\n- He can't drive. (Araba kullanamaz.)\n\nDikkat: 'can'dan sonra fiil hiç değişmez!",
    exercises: [
      {
        question: "Complete: I ___ play the piano.",
        options: ["can", "can't", "cans"],
        correct: 0,
        explanation: "Yetenek bildirmek için 'can' kullanırız."
      },
      {
        question: "Complete: She ___ speak French. (yetenek yok)",
        options: ["can", "can't", "cannot"],
        correct: 1,
        explanation: "Yetenek olmadığını belirtmek için 'can't' kullanırız."
      },
      {
        question: "Complete: They ___ cook very well.",
        options: ["can", "cans", "could"],
        correct: 0,
        explanation: "'Can' hiçbir özne ile değişmez."
      }
    ]
  },
  {
    id: 23,
    title: "Can / Can't for Permission",
    description: "Use 'can' to ask for and give permission",
    lesson: "'Can' izin istemek ve vermek için de kullanılır.\n\nİzin isteme:\n✓ Can I...? (... yapabilir miyim?)\n✓ Can we...? (... yapabilir miyiz?)\n\nİzin verme/vermeme:\n✓ Yes, you can. (Evet, yapabilirsin.)\n✓ No, you can't. (Hayır, yapamazsın.)\n\nÖrnekler:\n- Can I go home? (Eve gidebilir miyim?)\n- Can we use your phone? (Telefonunuzu kullanabilir miyiz?)",
    exercises: [
      {
        question: "Ask for permission: ___ I open the window?",
        options: ["Can", "Do", "Am"],
        correct: 0,
        explanation: "İzin istemek için 'Can I...?' kullanırız."
      },
      {
        question: "Give permission: 'Can I sit here?' - 'Yes, you ___.'",
        options: ["do", "can", "are"],
        correct: 1,
        explanation: "'Can' sorusuna 'Yes, you can.' şeklinde cevap veririz."
      },
      {
        question: "Refuse permission: 'Can we leave?' - 'No, you ___.'",
        options: ["don't", "can't", "aren't"],
        correct: 1,
        explanation: "İzin vermemek için 'No, you can't.' deriz."
      }
    ]
  },
  {
    id: 24,
    title: "Like / Love / Hate + -ing",
    description: "Express preferences with gerunds",
    lesson: "Sevme/sevmeme duygularını '-ing' ile ifade ederiz.\n\n✓ Like + V-ing (sevmek)\n✓ Love + V-ing (çok sevmek)\n✓ Hate + V-ing (nefret etmek)\n✓ Enjoy + V-ing (keyif almak)\n\nÖrnekler:\n- I like reading books. (Kitap okumayı severim.)\n- She loves dancing. (Dans etmeyi çok sever.)\n- He hates waiting. (Beklemeyi nefret eder.)\n\nDikkat: Bu fiillerden sonra her zaman '-ing' gelir!",
    exercises: [
      {
        question: "Complete: I like ___ music.",
        options: ["listen", "listening", "to listen"],
        correct: 1,
        explanation: "'Like' fiilinden sonra '-ing' gelir: listening"
      },
      {
        question: "Complete: She loves ___ in the sea.",
        options: ["swim", "swimming", "to swim"],
        correct: 1,
        explanation: "'Love' fiilinden sonra '-ing' gelir: swimming"
      },
      {
        question: "Complete: They hate ___ homework.",
        options: ["do", "doing", "to do"],
        correct: 1,
        explanation: "'Hate' fiilinden sonra '-ing' gelir: doing"
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
  const [autoProgressEnabled, setAutoProgressEnabled] = useState(false); // Option for auto-progression
  const { earnXPForGrammarLesson } = useGamification();
  const { incrementGrammarLessons, incrementTotalExercises, incrementCompletedModules } = useBadgeSystem();

  // Load completed modules from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('grammarModulesCompleted');
    if (saved) {
      setCompletedModules(JSON.parse(saved));
    }
  }, []);

  // Check for A1 completion and unlock A2
  useEffect(() => {
    const a1ModuleIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]; // All 24 A1 modules
    const completedA1Modules = completedModules.filter(id => a1ModuleIds.includes(id));
    
    console.log('🎯 A1 Completion Check:', {
      completedModules,
      completedA1Modules,
      isA1Complete: completedA1Modules.length === a1ModuleIds.length,
      availableLevels,
      currentLevel
    });
    
    if (completedA1Modules.length === a1ModuleIds.length) {
      // Unlock A2 if not already available
      if (!availableLevels.includes("A2")) {
        console.log('🚀 Unlocking A2!');
        setAvailableLevels(prev => [...prev, "A2"]);
      }
      
      // Always show modal/progression if A1 is complete and user is still on A1
      if (currentLevel === "A1") {
        // Check if this is the first time completing A1 (reset check for debugging)
        const hasSeenA1Completion = localStorage.getItem('hasSeenA1Completion');
        
        console.log('🎉 A1 Complete! HasSeen:', hasSeenA1Completion);
        
        if (!hasSeenA1Completion) {
          // Mark as seen to prevent showing multiple times
          localStorage.setItem('hasSeenA1Completion', 'true');
          
          if (autoProgressEnabled) {
            // Automatic progression to A2
            console.log('🤖 Auto-progressing to A2...');
            setTimeout(() => {
              setCurrentLevel("A2");
              scrollToTop();
            }, 1000); // Brief delay to show completion
          } else {
            // Show congratulations modal
            console.log('🎊 Showing congratulations modal');
            setShowCongrats(true);
          }
        }
      }
    }
  }, [completedModules, availableLevels, autoProgressEnabled, currentLevel]);

  const markModuleComplete = async (moduleId: number) => {
    if (!completedModules.includes(moduleId)) {
      const updated = [...completedModules, moduleId];
      setCompletedModules(updated);
      localStorage.setItem('grammarModulesCompleted', JSON.stringify(updated));
      
      // Award XP for completing grammar lesson
      await earnXPForGrammarLesson(true);
      
      // Track badges progress
      incrementGrammarLessons();
      incrementCompletedModules(); // Track module completion for Grammar Guru badge
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
      <div className="relative z-10 p-2 sm:p-4 max-w-sm sm:max-w-md mx-auto">
        {/* Header */}
        <div 
          className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 mt-safe-area-inset-top"
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
            <h1 className="text-white font-bold text-lg sm:text-xl line-clamp-1">Grammar Lessons - {currentLevel}</h1>
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
          
          {/* Visual Level Progress Indicator */}
          <div className="flex items-center justify-center space-x-3 mb-4">
            {["A1", "A2", "A3"].map((level, index) => {
              const isCompleted = level === "A1" && completedModules.filter(id => id <= 6).length === 6 ||
                                level === "A2" && completedModules.filter(id => id > 6).length === 4;
              const isAvailable = availableLevels.includes(level);
              const isCurrent = currentLevel === level;
              
              return (
                <div key={level} className="flex items-center">
                  <div 
                    className={`
                      flex items-center justify-center w-12 h-8 rounded-full text-sm font-bold transition-all duration-300
                      ${isCurrent 
                        ? 'bg-white text-blue-900 ring-2 ring-white/50 shadow-lg' 
                        : isCompleted 
                        ? 'bg-green-500 text-white shadow-md' 
                        : isAvailable 
                        ? 'bg-white/20 text-white border border-white/30' 
                        : 'bg-white/10 text-white/40 border border-white/20'
                      }
                    `}
                  >
                    {isCompleted ? '✅' : level}
                  </div>
                  {index < 2 && (
                    <div className={`mx-2 w-6 h-0.5 transition-all duration-300 ${
                      (level === "A1" && isCompleted) || (level === "A2" && isCompleted) 
                        ? 'bg-green-400' 
                        : 'bg-white/30'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="text-center">
            <p className="text-white/80 text-sm">
              Master {currentLevel} grammar step by step
            </p>
            <div className="mt-3 text-white/60 text-xs">
              {completedModules.filter(id => 
                currentLevel === "A1" ? id <= 6 : id > 6
              ).length} / {currentTopics.length} completed
              {currentLevel === "A1" && completedModules.filter(id => id <= 6).length === 6 && (
                <span className="ml-2 text-green-300 font-bold">🎉 A1 Complete! A2 Unlocked!</span>
              )}
              {currentLevel === "A2" && completedModules.filter(id => id > 6).length === 4 && (
                <span className="ml-2 text-green-300 font-bold">🎉 A2 Complete!</span>
              )}
            </div>
            
            {/* Quick Progress to A2 button when A1 is complete */}
            {currentLevel === "A1" && completedModules.filter(id => id <= 6).length === 6 && (
              <Button
                onClick={() => {
                  console.log('🚀 Manual A2 progression clicked');
                  setCurrentLevel("A2");
                  scrollToTop();
                  // Also clear the completion flag to allow showing modal again if needed
                  localStorage.removeItem('hasSeenA1Completion');
                }}
                className="mt-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold px-6 py-2 rounded-full hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg"
              >
                🚀 Start A2 Lessons
              </Button>
            )}
            
            {/* Debug info for troubleshooting */}
            <div className="mt-2 text-white/30 text-xs">
              Debug: Completed modules: [{completedModules.join(', ')}]
            </div>
            
            {/* Force completion modal for testing */}
            {currentLevel === "A1" && completedModules.filter(id => id <= 6).length === 6 && (
              <Button
                onClick={() => {
                  console.log('🔧 Force showing modal for testing');
                  localStorage.removeItem('hasSeenA1Completion');
                  setShowCongrats(true);
                }}
                className="mt-2 bg-yellow-500 text-black font-bold px-4 py-1 rounded text-xs hover:bg-yellow-600 transition-all duration-300"
              >
                🔧 Test Modal
              </Button>
            )}
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
                  <CardTitle className="text-white text-base sm:text-lg font-bold leading-tight mt-2 line-clamp-2">
                    {topic.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-white/90 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-3">
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
              <p style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#333' }}>
                You've completed all A1 grammar lessons!
              </p>
              <p style={{ fontSize: '0.9rem', marginBottom: '2rem', color: '#666', fontStyle: 'italic' }}>
                🚀 Ready to advance to intermediate level?
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                  style={{
                    backgroundColor: '#10B981',
                    color: 'white',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '12px',
                    fontWeight: '700',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => {
                    setShowCongrats(false);
                    setCurrentLevel("A2");
                    scrollToTop();
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#059669';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#10B981';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  🚀 Continue to A2
                </button>
                <button
                  style={{
                    backgroundColor: '#6B7280',
                    color: 'white',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '12px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => {
                    setShowCongrats(false);
                    setCurrentLevel("A1");
                    scrollToTop();
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#4B5563';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#6B7280';
                  }}
                >
                  📚 Review A1
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
  const [isTeacherReading, setIsTeacherReading] = useState(false);
  const [readingComplete, setReadingComplete] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [hasBeenRead, setHasBeenRead] = useState<Record<string, boolean>>({});
  const { incrementTotalExercises } = useBadgeSystem();
  const { speak, isSpeaking } = useTextToSpeech();
  const { avatarState } = useAvatarState({
    isSpeaking,
    isProcessing: isTeacherReading
  });

  const moduleKey = `grammar-${module.id}`;

  // Auto-start reading for first-time visitors
  useEffect(() => {
    if (showLesson && !hasBeenRead[moduleKey] && !isTeacherReading) {
      startTeacherReading();
    }
  }, [showLesson, module.id]);

  // Teacher reading functionality
  const startTeacherReading = async () => {
    setIsTeacherReading(true);
    
    // Read full lesson content line by line
    const lessonContent = module.lesson || "";
    const lines = lessonContent.split('\n');
    
    for (const line of lines) {
      if (line.trim() && !line.includes('Examples:') && !line.includes('Practice:')) {
        await new Promise<void>((resolve) => {
          // Explicitly set language for Turkish content
          const isTurkish = line.includes('Bu modülde') || line.includes('modülde') || line.match(/[çğıöşüÇĞIİÖŞÜ]/);
          speak(line, resolve, isTurkish ? 'tr-TR' : 'en-US');
        });
      }
    }
    
    // Announce table exploration if content suggests there should be a table
    if (lessonContent.includes('table') || lessonContent.includes('chart') || module.title.includes('Tablosu')) {
      await new Promise<void>((resolve) => {
        speak("Şimdi lütfen aşağıdaki tabloya göz atın.", resolve, 'tr-TR');
      });
      
      // Wait for user to explore (3 seconds)
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    setIsTeacherReading(false);
    setReadingComplete(true);
    // Mark this module as read
    setHasBeenRead(prev => ({ ...prev, [moduleKey]: true }));
  };

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
        
        // Track exercise completion for badges
        incrementTotalExercises();
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
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Target className="h-8 w-8 text-yellow-300" />
                  <BookmarkButton
                    content={module?.lesson || ''}
                    type="lesson"
                    title={module?.title}
                    className="text-white hover:text-yellow-300"
                  />
                </div>
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

          {/* Teacher Reading or Start Button */}
          {!readingComplete ? (
            <>
              {!hasBeenRead[moduleKey] && (
                <Button
                  onClick={startTeacherReading}
                  className="w-full py-6 text-lg font-bold rounded-2xl mb-4"
                  style={{
                    background: 'linear-gradient(45deg, hsl(var(--secondary)), hsl(var(--accent)))',
                    color: 'white',
                    boxShadow: 'var(--shadow-strong)'
                  }}
                  disabled={isTeacherReading || isSpeaking}
                >
                  {isTeacherReading ? "👨‍🏫 Tomas is Reading..." : "▶️ Let Tomas Read This Lesson"}
                </Button>
              )}
              {hasBeenRead[moduleKey] && (
                <Button
                  onClick={startTeacherReading}
                  variant="outline"
                  size="sm"
                  className="w-full mb-4 bg-white/10 border-white/30 text-white hover:bg-white/20"
                  disabled={isTeacherReading || isSpeaking}
                >
                  🔁 Replay Tomas
                </Button>
              )}
            </>
          ) : (
            <div className="space-y-3">
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
              {hasBeenRead[moduleKey] && (
                <Button
                  onClick={startTeacherReading}
                  variant="outline"
                  size="sm"
                  className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
                  disabled={isTeacherReading || isSpeaking}
                >
                  🔁 Replay Tomas
                </Button>
              )}
            </div>
          )}
          
          {/* Teacher Reading Phase */}
          {isTeacherReading && (
            <Card className="bg-white/10 border-white/20 mb-6">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="mb-6">
                    <AnimatedAvatar 
                      size="lg" 
                      state={avatarState}
                      className="mx-auto mb-4"
                    />
                  </div>
                  <div className="text-white/90 text-base">
                    <p className="mb-4">🎧 Listen carefully as Tomas reads through this lesson...</p>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
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
