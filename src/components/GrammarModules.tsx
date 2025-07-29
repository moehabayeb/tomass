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

// A1 Grammar Topics - 24 Modules in Final Fixed Pedagogical Structure
const grammarTopics = [
  {
    id: 1,
    title: "Verb to Be – Affirmative",
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
    title: "Verb to Be – Negative",
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
    title: "Verb to Be – Yes/No Questions",
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
    title: "Subject Pronouns",
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
    title: "Object Pronouns",
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
    title: "Possessive Adjectives",
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
    title: "Possessive Pronouns",
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
    id: 9,
    title: "Articles (a / an / the)",
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
        question: "Choose: She is ___ honest person.",
        options: ["a", "an", "the"],
        correct: 1,
        explanation: "'Honest' ünlü sesle başladığı için (h sessiz) 'an' kullanırız."
      },
      {
        question: "Choose: ___ book you gave me is great.",
        options: ["A", "An", "The"],
        correct: 2,
        explanation: "Belirli kitaptan bahsediyoruz, 'the' kullanırız."
      }
    ]
  },
  {
    id: 10,
    title: "Plural Nouns – Regular & Irregular",
    description: "Learn how to form plural nouns with regular and irregular patterns",
    lesson: "Çoğul isimleri düzenli ve düzensiz kurallarla yapıyoruz.\n\n✓ Düzenli çoğullar: +s (book → books)\n✓ -s, -x, -z, -ch, -sh ile biten: +es (box → boxes)\n✓ Ünsüz+y ile biten: y→ies (city → cities)\n✓ Düzensiz çoğullar: child → children, foot → feet, man → men",
    exercises: [
      {
        question: "What's the plural of 'child'?",
        options: ["childs", "children", "childes"],
        correct: 1,
        explanation: "'Child' düzensiz çoğul: children"
      },
      {
        question: "What's the plural of 'box'?",
        options: ["boxs", "boxes", "boxies"],
        correct: 1,
        explanation: "-x ile biten kelimeler +es alır: boxes"
      },
      {
        question: "What's the plural of 'city'?",
        options: ["citys", "cities", "cityes"],
        correct: 1,
        explanation: "Ünsüz+y: y değişir ies olur: cities"
      }
    ]
  },
  {
    id: 11,
    title: "There is / There are",
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
    id: 12,
    title: "Prepositions of Place (in, on, under)",
    description: "Learn prepositions like in, on, at, under, next to for describing location",
    lesson: "Yer bildiren edatlar nesnelerin konumunu açıklar.\n\n✓ in (içinde) - in the box, in the room\n✓ on (üzerinde) - on the table, on the wall\n✓ at (belirli noktada) - at school, at home\n✓ under (altında) - under the bed\n✓ next to (yanında) - next to the bank\n✓ behind (arkasında) - behind the house\n✓ in front of (önünde) - in front of the store",
    exercises: [
      {
        question: "Choose: The book is ___ the table.",
        options: ["in", "on", "at"],
        correct: 1,
        explanation: "Masa yüzeyinde olan şeyler için 'on' kullanırız."
      },
      {
        question: "Choose: I am ___ home.",
        options: ["in", "on", "at"],
        correct: 2,
        explanation: "Ev gibi belirli yerler için 'at' kullanırız."
      },
      {
        question: "Choose: The cat is hiding ___ the bed.",
        options: ["under", "on", "in"],
        correct: 0,
        explanation: "Altında olan şeyler için 'under' kullanırız."
      }
    ]
  },
  {
    id: 13,
    title: "Prepositions of Time (at, in, on)",
    description: "Learn prepositions like at, on, in for describing when things happen",
    lesson: "Zaman bildiren edatlar ne zaman olduğunu açıklar.\n\n✓ at + saatler (at 3 o'clock, at noon)\n✓ on + günler/tarihler (on Monday, on May 15th)\n✓ in + aylar/yıllar/mevsimler (in January, in 2023, in summer)\n\nÖrnekler:\n- I wake up at 7 AM. (Sabah 7'de uyanırım.)\n- We have class on Friday. (Cuma günü dersimiz var.)\n- It's cold in winter. (Kışın soğuk olur.)",
    exercises: [
      {
        question: "Choose: I have an appointment ___ 2 PM.",
        options: ["at", "on", "in"],
        correct: 0,
        explanation: "Saatler için 'at' kullanırız."
      },
      {
        question: "Choose: My birthday is ___ March.",
        options: ["at", "on", "in"],
        correct: 2,
        explanation: "Aylar için 'in' kullanırız."
      },
      {
        question: "Choose: The meeting is ___ Wednesday.",
        options: ["at", "on", "in"],
        correct: 1,
        explanation: "Günler için 'on' kullanırız."
      }
    ]
  },
  {
    id: 14,
    title: "Simple Present – Affirmative (I/You/We/They)",
    description: "Learn how to form positive present simple sentences",
    lesson: "Basit şimdiki zaman alışkanlıkları ve genel gerçekleri anlatır.\n\n✓ I/You/We/They + fiil (temel hali)\n\nÖrnekler:\n- I work in an office. (Bir ofiste çalışırım.)\n- They live in Istanbul. (İstanbul'da yaşarlar.)\n- We study English. (İngilizce çalışırız.)",
    exercises: [
      {
        question: "Complete: I ___ coffee every morning.",
        options: ["drink", "drinks", "drinking"],
        correct: 0,
        explanation: "'I' ile fiil temel halinde kullanılır: drink"
      },
      {
        question: "Complete: They ___ in a big house.",
        options: ["live", "lives", "living"],
        correct: 0,
        explanation: "'They' ile fiil temel halinde kullanılır: live"
      },
      {
        question: "Complete: We ___ to school by bus.",
        options: ["go", "goes", "going"],
        correct: 0,
        explanation: "'We' ile fiil temel halinde kullanılır: go"
      }
    ]
  },
  {
    id: 15,
    title: "Simple Present – Affirmative (He/She/It)",
    description: "Learn how to form positive present simple with third person singular",
    lesson: "Üçüncü tekil şahıslarda (he/she/it) fiile 's' ekliyoruz.\n\n✓ He/She/It + fiil+s\n\nÖzel durumlar:\n- goes, does, has (irregular)\n- watches, brushes (+es after -ch, -sh)\n- studies (y→ies after consonant+y)\n\nÖrnekler:\n- He works in a bank. (Bankada çalışır.)\n- She lives in Ankara. (Ankara'da yaşar.)",
    exercises: [
      {
        question: "Complete: He ___ English very well.",
        options: ["speak", "speaks", "speaking"],
        correct: 1,
        explanation: "'He' ile fiil+s kullanırız: speaks"
      },
      {
        question: "Complete: She ___ to work by car.",
        options: ["go", "goes", "going"],
        correct: 1,
        explanation: "'Go' düzensiz fiil, 'she' ile 'goes' olur."
      },
      {
        question: "Complete: The cat ___ milk every day.",
        options: ["drink", "drinks", "drinking"],
        correct: 1,
        explanation: "'It (cat)' ile fiil+s kullanırız: drinks"
      }
    ]
  },
  {
    id: 16,
    title: "Simple Present – Negative (don't / doesn't)",
    description: "Learn to form negative present simple sentences",
    lesson: "Basit şimdiki zamanda olumsuz cümleler 'don't' ve 'doesn't' ile yapılır.\n\n✓ I/You/We/They + don't + fiil (temel hali)\n✓ He/She/It + doesn't + fiil (temel hali)\n\nDikkat: 'doesn't' kullandıktan sonra fiil temel halinde kalır!\n\nÖrnekler:\n- I don't like coffee. (Kahveyi sevmem.)\n- She doesn't work here. (Burada çalışmaz.)",
    exercises: [
      {
        question: "Complete: I ___ smoke.",
        options: ["don't", "doesn't", "not"],
        correct: 0,
        explanation: "'I' ile 'don't' kullanırız."
      },
      {
        question: "Complete: He ___ live in Istanbul.",
        options: ["don't", "doesn't", "not"],
        correct: 1,
        explanation: "'He' ile 'doesn't' kullanırız."
      },
      {
        question: "Complete: They ___ eat meat.",
        options: ["don't", "doesn't", "not"],
        correct: 0,
        explanation: "'They' ile 'don't' kullanırız."
      }
    ]
  },
  {
    id: 17,
    title: "Simple Present – Yes/No Questions",
    description: "Learn to ask yes/no questions in present simple",
    lesson: "Evet/Hayır soruları 'Do' ve 'Does' ile yapılır.\n\n✓ Do + I/you/we/they + fiil?\n✓ Does + he/she/it + fiil?\n\nKısa cevaplar:\n- Yes, I do. / No, I don't.\n- Yes, she does. / No, she doesn't.\n\nÖrnekler:\n- Do you speak English? (İngilizce konuşur musun?)\n- Does he work here? (Burada çalışır mı?)",
    exercises: [
      {
        question: "Form a question: ___ you like pizza?",
        options: ["Do", "Does", "Are"],
        correct: 0,
        explanation: "'You' ile 'Do' kullanırız."
      },
      {
        question: "Form a question: ___ she live here?",
        options: ["Do", "Does", "Is"],
        correct: 1,
        explanation: "'She' ile 'Does' kullanırız."
      },
      {
        question: "Short answer: Do they work? Yes, they ___.",
        options: ["do", "does", "are"],
        correct: 0,
        explanation: "'They' için kısa cevap 'Yes, they do.'"
      }
    ]
  },
  {
    id: 18,
    title: "Simple Present – Wh- Questions",
    description: "Learn to ask wh- questions in present simple",
    lesson: "Soru kelimeleri ile soru yapımı:\n\n✓ What/Where/When/Why/How + do/does + özne + fiil?\n\nSoru kelimeleri:\n- What (ne), Where (nerede), When (ne zaman)\n- Why (neden), How (nasıl), Who (kim)\n\nÖrnekler:\n- What do you do? (Ne iş yaparsın?)\n- Where does she work? (Nerede çalışır?)",
    exercises: [
      {
        question: "Complete: ___ do you live?",
        options: ["What", "Where", "When"],
        correct: 1,
        explanation: "Yer sormak için 'Where' kullanırız."
      },
      {
        question: "Complete: ___ does he work?",
        options: ["What", "Who", "Where"],
        correct: 2,
        explanation: "Yer sormak için 'Where' kullanırız."
      },
      {
        question: "Complete: ___ time do you get up?",
        options: ["What", "Where", "Who"],
        correct: 0,
        explanation: "Saat sormak için 'What time' kullanırız."
      }
    ]
  },
  {
    id: 19,
    title: "Adverbs of Frequency",
    description: "Learn adverbs that show how often something happens",
    lesson: "Sıklık zarfları ne kadar sık yapıldığını belirtir.\n\n✓ always (her zaman) - 100%\n✓ usually (genellikle) - 80%\n✓ often (sık sık) - 60%\n✓ sometimes (bazen) - 40%\n✓ rarely/seldom (nadiren) - 20%\n✓ never (hiçbir zaman) - 0%\n\nKonumu: Özneden sonra, asıl fiilden önce\n- I always brush my teeth. (Her zaman dişlerimi fırçalarım.)",
    exercises: [
      {
        question: "Choose the frequency adverb: I ___ drink coffee (100%).",
        options: ["sometimes", "always", "never"],
        correct: 1,
        explanation: "100% için 'always' kullanırız."
      },
      {
        question: "Choose: She ___ goes to bed early (0%).",
        options: ["always", "sometimes", "never"],
        correct: 2,
        explanation: "0% için 'never' kullanırız."
      },
      {
        question: "Choose: We ___ eat out (40%).",
        options: ["usually", "sometimes", "always"],
        correct: 1,
        explanation: "40% için 'sometimes' kullanırız."
      }
    ]
  },
  {
    id: 20,
    title: "Can / Can't (ability, permission)",
    description: "Learn to express ability and permission using can/can't",
    lesson: "'Can' yetenek ve izin bildirmek için kullanılır.\n\n✓ Yetenek: I can swim. (Yüzebilirim.)\n✓ İzin: Can I go? (Gidebilir miyim?)\n✓ Olumsuz: can't = cannot\n\nYapısı:\n- Olumlu: özne + can + fiil\n- Olumsuz: özne + can't + fiil\n- Soru: Can + özne + fiil?",
    exercises: [
      {
        question: "Complete: I ___ speak three languages.",
        options: ["can", "can't", "could"],
        correct: 0,
        explanation: "Yetenek bildirmek için 'can' kullanırız."
      },
      {
        question: "Complete: She ___ drive a car. (She doesn't know how)",
        options: ["can", "can't", "could"],
        correct: 1,
        explanation: "Yetenek olmadığını belirtmek için 'can't' kullanırız."
      },
      {
        question: "Form a question: ___ you help me?",
        options: ["Can", "Do", "Are"],
        correct: 0,
        explanation: "İzin istemek için 'Can' kullanırız."
      }
    ]
  },
  {
    id: 21,
    title: "Countable and Uncountable Nouns",
    description: "Learn the difference between countable and uncountable nouns",
    lesson: "Sayılabilir ve sayılamayan isimler farklı kullanım kurallarına sahiptir.\n\n✓ Sayılabilir: book/books, car/cars, person/people\n✓ Sayılamayan: water, milk, money, information\n\nSayılabilir isimler:\n- Tekil/çoğul halleri var\n- A/an ile kullanılabilir\n- Sayılarla kullanılır\n\nSayılamayan isimler:\n- Çoğul hali yok\n- A/an ile kullanılmaz\n- Some/any ile kullanılır",
    exercises: [
      {
        question: "Which is countable?",
        options: ["water", "book", "money"],
        correct: 1,
        explanation: "'Book' sayılabilir isim (book/books)"
      },
      {
        question: "Which is uncountable?",
        options: ["car", "information", "apple"],
        correct: 1,
        explanation: "'Information' sayılamayan isim"
      },
      {
        question: "Complete: I need ___ book.",
        options: ["a", "some", "many"],
        correct: 0,
        explanation: "Sayılabilir tekil isim ile 'a' kullanırız."
      }
    ]
  },
  {
    id: 22,
    title: "Some / Any",
    description: "Learn when to use some and any with countable and uncountable nouns",
    lesson: "'Some' ve 'any' hem sayılabilir hem sayılamayan isimlerle kullanılır.\n\n✓ Some - olumlu cümlelerde\n✓ Any - olumsuz cümle ve sorularda\n\nÖrnekler:\n- I have some apples. (Birkaç elmam var.)\n- I don't have any money. (Hiç param yok.)\n- Do you have any questions? (Herhangi bir sorunuz var mı?)",
    exercises: [
      {
        question: "Complete: I have ___ friends in Istanbul.",
        options: ["some", "any", "a"],
        correct: 0,
        explanation: "Olumlu cümlede 'some' kullanırız."
      },
      {
        question: "Complete: I don't have ___ time.",
        options: ["some", "any", "a"],
        correct: 1,
        explanation: "Olumsuz cümlede 'any' kullanırız."
      },
      {
        question: "Complete: Do you have ___ sugar?",
        options: ["some", "any", "a"],
        correct: 1,
        explanation: "Sorularda 'any' kullanırız."
      }
    ]
  },
  {
    id: 23,
    title: "Much / Many",
    description: "Learn when to use much and many to express quantities",
    lesson: "'Much' ve 'many' 'çok' anlamında kullanılır.\n\n✓ Many + sayılabilir çoğul isimler\n✓ Much + sayılamayan isimler\n\nGenellikle olumsuz cümle ve sorularda kullanılır.\n\nÖrnekler:\n- How many books do you have? (Kaç kitabın var?)\n- I don't have much money. (Çok param yok.)",
    exercises: [
      {
        question: "Choose: How ___ students are there?",
        options: ["much", "many", "some"],
        correct: 1,
        explanation: "'Students' sayılabilir çoğul, 'many' kullanırız."
      },
      {
        question: "Choose: I don't have ___ time.",
        options: ["much", "many", "some"],
        correct: 0,
        explanation: "'Time' sayılamayan isim, 'much' kullanırız."
      },
      {
        question: "Choose: There aren't ___ people here.",
        options: ["much", "many", "some"],
        correct: 1,
        explanation: "'People' sayılabilir çoğul, 'many' kullanırız."
      }
    ]
  },
  {
    id: 24,
    title: "A lot of / Lots of",
    description: "Learn to express large quantities with 'a lot of' and 'lots of'",
    lesson: "'A lot of' ve 'lots of' çok miktarda bir şey ifade etmek için kullanılır. İkisi de aynı anlamdadır.\n\n✓ A lot of / Lots of + sayılabilir çoğul isimler\n✓ A lot of / Lots of + sayılamayan isimler\n\nÖrnekler:\n- There are a lot of students. (Çok öğrenci var.)\n- I have lots of friends. (Çok arkadaşım var.)\n- There's a lot of water. (Çok su var.)",
    exercises: [
      {
        question: "Choose: There are ___ cars in the parking lot.",
        options: ["a lot of", "much", "many"],
        correct: 0,
        explanation: "'A lot of' hem sayılabilir hem sayılamayan isimlerle kullanılır."
      },
      {
        question: "Choose: She has ___ homework tonight.",
        options: ["lots of", "many", "few"],
        correct: 0,
        explanation: "'Homework' sayılamayan isim, 'lots of' kullanabiliriz."
      },
      {
        question: "Choose: I drink ___ coffee every day.",
        options: ["many", "a lot of", "few"],
        correct: 1,
        explanation: "'Coffee' sayılamayan isim, 'a lot of' kullanırız."
      }
    ]
  }
];

// Combined topics based on current level
const getTopicsForLevel = (level: string) => {
  return grammarTopics; // Currently only A1 is available
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
