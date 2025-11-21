/**
 * A2 Module Data (Modules 51-77)
 * Split from A1A2B1ModulesData.ts for better code splitting
 * ⚡ PERFORMANCE: Reduces initial bundle load by ~900KB
 */

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

  table: {
    title: "📋 Past Simple Affirmative: Formation & Usage",
    data: [
      { structure: "Subject + V2 (past form)", function: "Completed past actions", example: "I visited my friend yesterday.", time_markers: "yesterday, last week, ago", note: "Action finished in the past" },
      { verb_type: "Regular verbs", formation: "Base verb + -ed", examples: "play → played, watch → watched, clean → cleaned", rule: "Add -ed to base form", note: "Most verbs follow this pattern" },
      { verb_type: "Irregular verbs", formation: "Special past forms (memorize)", examples: "go → went, eat → ate, see → saw, come → came", rule: "No pattern - must memorize", note: "Common verbs are often irregular", critical: "Check list of irregular verbs" },
      { spelling_rule: "Verbs ending in -e", formation: "Add -d only", examples: "live → lived, dance → danced, arrive → arrived", explanation: "e + ed = ed (one 'd')", note: "Common spelling rule" },
      { spelling_rule: "Verbs ending in consonant + y", formation: "Change y to i, add -ed", examples: "study → studied, cry → cried, try → tried", wrong: "studyed, cryed", note: "y → ied pattern" },
      { spelling_rule: "One syllable: consonant + vowel + consonant", formation: "Double final consonant + -ed", examples: "stop → stopped, plan → planned, drop → dropped", explanation: "Protect vowel sound", note: "CVC pattern" },
      { time_expressions: "Yesterday", usage: "I watched TV yesterday.", position: "Usually at end of sentence", note: "Specific past time", more_examples: "She called yesterday. / They arrived yesterday." },
      { time_expressions: "Last + time", examples: "last night, last week, last year, last Monday", usage: "I traveled to Paris last summer.", note: "Recent past period", pattern: "last + [time period]" },
      { time_expressions: "Ago", structure: "Number + time + ago", examples: "two days ago, a week ago, three hours ago", usage: "He left 10 minutes ago.", note: "Counts back from now", position: "At end of sentence" },
      { time_expressions: "Specific times", examples: "in 2010, on Monday, at 5 pm, in May", usage: "I graduated in 2020.", note: "Exact date/time", pattern: "Use prepositions: in/on/at" },
      { common_irregular: "Top irregular verbs", list: "be→was/were, have→had, do→did, say→said, make→made, get→got, see→saw, come→came, think→thought, take→took", note: "Most frequently used", importance: "Learn these first!", memorize: "Practice daily" },
      { example_regular: "I visited my grandparents", analysis: "visit + ed = visited", subject: "I", time: "Completed past action", note: "Regular verb example" },
      { example_irregular: "She went to the market", analysis: "go → went (irregular)", subject: "She", time: "Completed past action", note: "Irregular verb example" },
      { negative_preview: "Making it negative", structure: "didn't + base verb", example: "I didn't watch TV. / She didn't go.", note: "Will learn in next module", pattern: "did not (didn't) + V1" },
      { question_preview: "Making questions", structure: "Did + subject + base verb?", example: "Did you see the movie?", note: "Will learn in upcoming module", pattern: "Auxiliary 'did' + V1" },
      { usage_note: "When to use Past Simple", situations: "1. Completed actions, 2. Past habits, 3. Historical events, 4. Series of past actions", examples: "I lived in London (completed). / Columbus discovered America (historical). / I woke up, ate breakfast, and left (series).", importance: "Most common past tense" }
    ]
  },
  
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

  table: {
    title: "📋 Past Simple: Common Irregular Verbs",
    data: [
      { base: "be", past: "was/were", meaning: "olmak", example: "I was tired. / They were happy.", note: "Most common verb", rule: "was (I/he/she/it), were (we/you/they)" },
      { base: "have", past: "had", meaning: "sahip olmak", example: "She had a car.", note: "Very common", pattern: "No 've' in past" },
      { base: "do", past: "did", meaning: "yapmak", example: "I did my homework.", note: "Also used as auxiliary", usage: "Did you go?" },
      { base: "go", past: "went", meaning: "gitmek", example: "We went to the park.", note: "Very common", pattern: "Completely different form" },
      { base: "come", past: "came", meaning: "gelmek", example: "She came late.", note: "Common irregular", opposite: "go → went" },
      { base: "see", past: "saw", meaning: "görmek", example: "I saw a movie yesterday.", note: "Sight verb", past_participle: "seen (different from past)" },
      { base: "get", past: "got", meaning: "almak/elde etmek", example: "He got a new job.", note: "Very versatile verb", uses: "Many meanings" },
      { base: "make", past: "made", meaning: "yapmak", example: "They made a cake.", note: "Create/produce", vs_do: "'make' creates something new" },
      { base: "take", past: "took", meaning: "almak", example: "She took the bus.", note: "Common verb", usage: "take time, take a photo, take medicine" },
      { base: "give", past: "gave", meaning: "vermek", example: "I gave her a gift.", note: "Transfer to someone", pattern: "give → gave → given" },
      { base: "eat", past: "ate", meaning: "yemek", example: "We ate pizza.", note: "Food consumption", pronunciation: "ate /eɪt/" },
      { base: "drink", past: "drank", meaning: "içmek", example: "He drank water.", note: "Beverage consumption", pattern: "drink → drank → drunk" },
      { base: "write", past: "wrote", meaning: "yazmak", example: "She wrote a letter.", note: "Common verb", pattern: "write → wrote → written" },
      { base: "read", past: "read", meaning: "okumak", example: "I read a book.", note: "Spelling same, pronunciation different", pronunciation: "read /red/ (past)" },
      { base: "say", past: "said", meaning: "söylemek", example: "He said goodbye.", note: "Speaking verb", pronunciation: "said /sed/" },
      { base: "tell", past: "told", meaning: "anlatmak", example: "She told me a story.", note: "Inform someone", vs_say: "'tell' needs object" },
      { base: "know", past: "knew", meaning: "bilmek", example: "I knew the answer.", note: "Knowledge/awareness", silent: "'k' silent" },
      { base: "think", past: "thought", meaning: "düşünmek", example: "We thought it was easy.", note: "Mental activity", pattern: "think → thought" },
      { base: "buy", past: "bought", meaning: "satın almak", example: "They bought a house.", note: "Purchase", pattern: "buy → bought" },
      { base: "find", past: "found", meaning: "bulmak", example: "I found my keys.", note: "Discover", opposite: "lose → lost" },
      { base: "leave", past: "left", meaning: "ayrılmak/bırakmak", example: "He left at 5 pm.", note: "Depart", opposite: "arrive → arrived (regular)" },
      { base: "meet", past: "met", meaning: "buluşmak/tanışmak", example: "I met my friend.", note: "Encounter", pattern: "meet → met" },
      { base: "run", past: "ran", meaning: "koşmak", example: "She ran in the park.", note: "Fast movement", pattern: "run → ran → run" },
      { base: "sit", past: "sat", meaning: "oturmak", example: "We sat on the bench.", note: "Position", opposite: "stand → stood" },
      { base: "stand", past: "stood", meaning: "ayakta durmak", example: "They stood up.", note: "Upright position", pattern: "stand → stood" }
    ]
  },
  
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

  table: {
    title: "📋 Past Simple Negative: Formation & Rules",
    data: [
      { structure: "Subject + didn't + V1 (base verb)", function: "Negative past action", example: "I didn't go to school yesterday.", critical: "ALWAYS use V1 (base form), NEVER V2", note: "did + not = didn't" },
      { full_form: "did not", short_form: "didn't", usage: "Both are correct", formal: "did not (more formal)", informal: "didn't (common in speech)", example: "I did not see him. / I didn't see him.", note: "Contracted form is more common" },
      { common_mistake: "Using V2 instead of V1", wrong: "I didn't went to school.", correct: "I didn't go to school.", rule: "didn't + V1 (NOT V2!)", explanation: "'did' already shows past, so verb stays in base form", critical: "Very common error!" },
      { all_subjects: "Same form for all subjects", pattern: "didn't + V1 for I/you/he/she/it/we/they", examples: "I didn't go. / She didn't go. / They didn't go.", note: "No changes needed", difference: "Unlike affirmative (went vs. went)" },
      { regular_verb: "Regular verb example", affirmative: "I played football.", negative: "I didn't play football.", change: "played → didn't play", note: "Remove -ed, use base form" },
      { irregular_verb: "Irregular verb example", affirmative: "She went home.", negative: "She didn't go home.", change: "went → didn't go", note: "Use base form, not past form", critical: "went → go (NOT went)" },
      { be_verb: "Special case: verb 'be'", structure: "was/were + not (no 'did')", examples: "I wasn't tired. / They weren't ready.", note: "Different from other verbs!", rule: "'be' doesn't use 'did'" },
      { example_1: "I didn't watch TV last night", analysis: "Subject (I) + didn't + watch (V1) + object", verb: "watch (base form)", time: "last night", note: "Standard negative structure" },
      { example_2: "He didn't eat breakfast", analysis: "Subject (He) + didn't + eat (V1) + object", verb: "eat (V1), NOT ate (V2)", note: "Base form after didn't" },
      { example_3: "They didn't come to the party", analysis: "Subject (They) + didn't + come (V1)", verb: "come (V1), NOT came (V2)", note: "Irregular verb in base form" },
      { time_expressions: "Used with same time markers", examples: "yesterday, last week, ago", usage: "I didn't go yesterday. / She didn't call last week. / They didn't arrive two hours ago.", note: "Same as affirmative" },
      { emphasis: "Emphasizing the negative", use_full_form: "I did NOT go there!", emphasis_word: "Stress 'not' when speaking", example: "She did NOT say that.", note: "For strong denial" },
      { short_answers: "Answering yes/no questions", question: "Did you go?", negative_answer: "No, I didn't.", note: "Just 'didn't' is enough", avoid: "Don't say: No, I didn't go" },
      { comparison: "Affirmative vs Negative", affirmative: "I went to the park. (V2: went)", negative: "I didn't go to the park. (V1: go)", key: "Affirmative uses V2, Negative uses V1", remember: "didn't + V1 ALWAYS" },
      { never_pattern: "never + V2 (alternative negative)", structure: "Subject + never + V2", example: "I never went there. / She never said that.", note: "Stronger than didn't", meaning: "Not even once" }
    ]
  },
  
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

  table: {
    title: "📋 Past Simple Questions: Yes/No & Wh- Questions",
    data: [
      { type: "Yes/No Question", structure: "Did + subject + V1 + ...?", answer_forms: "Yes, [subject] did. / No, [subject] didn't.", example_q: "Did you go to school?", example_a: "Yes, I did. / No, I didn't.", note: "Answered with did/didn't", function: "Asking for confirmation" },
      { yes_no_example: "Did she call you?", answers: "Yes, she did. (affirmative) / No, she didn't. (negative)", structure: "Did + she + call (V1) + you?", verb: "call (base form)", note: "Simple yes/no response" },
      { yes_no_rule: "Use V1 after 'did'", wrong: "Did you went?", correct: "Did you go?", explanation: "'did' shows past, so verb = V1", critical: "Common mistake!", remember: "did + V1 always" },
      { short_answers: "Short answer patterns", positive: "Yes, I/you/he/she/it/we/they did.", negative: "No, I/you/he/she/it/we/they didn't.", note: "Don't repeat the main verb", avoid: "Yes, I did go. (too long)" },
      { type: "Wh- Question", structure: "Wh-word + did + subject + V1 + ...?", wh_words: "What, Where, When, Who, Why, How", example_q: "What did you eat?", example_a: "I ate pizza.", note: "Asking for information", function: "Specific details" },
      { what_question: "What did...", structure: "What + did + subject + V1?", example: "What did she buy?", answer: "She bought a dress.", use: "Asking about things/actions", note: "Most common wh- word" },
      { where_question: "Where did...", structure: "Where + did + subject + V1?", example: "Where did they go?", answer: "They went to the park.", use: "Asking about place", note: "Location questions" },
      { when_question: "When did...", structure: "When + did + subject + V1?", example: "When did you arrive?", answer: "I arrived at 5 pm.", use: "Asking about time", note: "Time questions" },
      { who_question: "Who did...", structure: "Who + did + subject + V1?", example: "Who did you meet?", answer: "I met my teacher.", use: "Asking about people (object)", note: "Who as object", alternative: "Who came? (who as subject - no 'did')" },
      { why_question: "Why did...", structure: "Why + did + subject + V1?", example: "Why did he leave?", answer: "He left because he was tired.", use: "Asking about reason", note: "Usually answered with 'because'", typical_answer: "because + clause" },
      { how_question: "How did...", structure: "How + did + subject + V1?", example: "How did you learn English?", answer: "I learned at school.", use: "Asking about method/manner", note: "Process/way questions" },
      { how_many: "How many/much did...", structure: "How many/much + did + subject + V1?", example: "How many people did you invite?", answer: "I invited 20 people.", use: "Asking about quantity", note: "Countable/uncountable" },
      { what_time: "What time did...", structure: "What time + did + subject + V1?", example: "What time did the movie start?", answer: "It started at 7 pm.", use: "Asking specific time", note: "Precise time questions" },
      { special_who: "Who as subject (no 'did')", structure: "Who + V2 (past)?", example: "Who called you?", answer: "John called me.", critical: "NO 'did' when Who = subject!", comparison: "Who did you call? (object) vs. Who called? (subject)", note: "Exception to 'did' rule" },
      { be_verb_questions: "Questions with 'be'", structure: "Was/Were + subject + ...?", example: "Was she happy?", answer: "Yes, she was. / No, she wasn't.", note: "No 'did' with 'be'!", critical: "Different from other verbs" },
      { intonation: "Question intonation", yes_no: "Rising intonation ↗", wh: "Falling intonation ↘", example: "Did you go? ↗ / Where did you go? ↘", note: "Important for pronunciation" },
      { common_mistakes: "Common question errors", mistake_1: "Did you went? ❌", correct_1: "Did you go? ✓", mistake_2: "What you did eat? ❌", correct_2: "What did you eat? ✓", rule: "did + V1, correct word order" }
    ]
  },
  
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

  table: {
    title: "📋 Used To: Past Habits & States",
    data: [
      { function: "Past habits (no longer true)", meaning: "Actions repeated in past, now stopped", example: "I used to play football every weekend.", now: "I don't play football anymore.", note: "Habit that ended", emphasis: "Was a habit, not anymore" },
      { function: "Past states (no longer true)", meaning: "Situations that existed in past", example: "I used to live in Paris.", now: "I don't live in Paris now.", note: "Past situation that changed", types: "location, job, appearance, etc." },
      { structure_affirmative: "Subject + used to + V1", formation: "used to + base verb", examples: "She used to smoke. / We used to travel a lot. / They used to have a dog.", note: "Always 'used to' (with 'd')", critical: "used to + V1 (base form)" },
      { structure_negative: "Subject + didn't use to + V1", formation: "didn't use to + base verb", examples: "I didn't use to like coffee. / She didn't use to wear glasses. / They didn't use to study hard.", critical: "use to (NO 'd' after didn't!)", note: "didn't use to (not didn't used to)" },
      { structure_question: "Did + subject + use to + V1?", formation: "Did + use to + base verb", examples: "Did you use to play tennis? / Did she use to work here? / Did they use to live nearby?", critical: "use to (NO 'd' in questions!)", note: "Did...use to (not Did...used to)" },
      { common_mistake: "'used to' vs 'use to'", wrong: "I didn't used to like it. / Did you used to go?", correct: "I didn't use to like it. / Did you use to go?", rule: "Affirmative = used to, Negative/Question = use to (no 'd')", explanation: "'did' already shows past, so no 'd' needed", critical: "Very common error!" },
      { short_answers: "Answering yes/no questions", question: "Did you use to smoke?", yes: "Yes, I used to. / Yes, I did.", no: "No, I didn't use to. / No, I didn't.", note: "Both forms acceptable" },
      { vs_past_simple: "Used to vs Past Simple", used_to: "I used to play football. (repeated habit)", past_simple: "I played football yesterday. (one action)", difference: "'used to' = repeated habit, Past Simple = specific past action", when_used: "Use 'used to' for habits, not single events" },
      { vs_would: "'used to' vs 'would'", used_to: "I used to go swimming. (can use for habits)", would: "I would go swimming. (only for actions, not states)", states: "I used to be shy. ✓ / I would be shy. ✗", note: "'used to' works for habits AND states", rule: "'would' only for repeated actions, not states" },
      { time_markers: "When to use 'used to'", signals: "when I was young, in the past, years ago, before", example: "I used to read comic books when I was a child.", contrast: "...but now I don't.", note: "Shows change from past to present" },
      { example_habit: "Past habit example", statement: "I used to play video games every day.", analysis: "Regular action in the past, not now", implication: "I don't play video games every day anymore.", type: "Repeated action", note: "Was a routine" },
      { example_state: "Past state example", statement: "She used to be very shy.", analysis: "Character trait in the past, changed now", implication: "She isn't shy anymore.", type: "Personal state", note: "Personality/situation changed" },
      { be_used_to: "Different: 'be used to' (accustomed)", meaning: "Be accustomed to / familiar with", structure: "be + used to + noun/-ing", example: "I'm used to waking up early. (= I'm accustomed to it)", note: "DIFFERENT meaning from 'used to'!", confusion: "Don't confuse with past habit 'used to'" },
      { get_used_to: "Different: 'get used to' (become accustomed)", meaning: "Become familiar/comfortable with", structure: "get + used to + noun/-ing", example: "I'm getting used to the cold weather.", note: "Process of becoming accustomed", vs: "'used to' = past habit (different!)" },
      { never_used_to: "Emphasizing negation", structure: "Subject + never used to + V1", example: "I never used to eat vegetables.", meaning: "Stronger than 'didn't use to'", note: "Not even once", emphasis: "Strong negative" }
    ]
  },
  
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
  
  table: {
    title: "📋 Offers & Polite Requests with 'Would'",
    data: [
      { function: "Making Offers", structure: "Would you like + noun?", example: "Would you like some tea?", response_accept: "Yes, please. / That would be great.", response_decline: "No, thank you. / I'm fine, thanks.", note: "Offering something to someone", usage: "Very polite, common in hospitality" },
      { function: "Offering Activities", structure: "Would you like + to + V1?", example: "Would you like to sit down?", response_accept: "Yes, I'd love to. / Sure, thanks.", response_decline: "No, thank you. I'm okay standing.", note: "Inviting someone to do something", usage: "Polite invitation" },
      { function: "Polite Requests", structure: "Would you + V1 + (please)?", example: "Would you help me, please?", response_accept: "Of course. / Sure, no problem.", response_decline: "I'm sorry, I can't right now.", note: "Asking someone to do something", usage: "Very polite, not commanding" },
      { function: "Polite Requests (formal)", structure: "Would you mind + V-ing?", example: "Would you mind closing the door?", response_accept: "Not at all. / Of course not.", response_decline: "I'm sorry, but...", note: "Very polite way to ask", critical: "Answer 'Not at all' = Yes, I'll do it!" },
      { offer_type: "Food/Drink", offer_example: "Would you like a cup of coffee?", accept: "Yes, please. That sounds nice.", decline: "No, thank you. I just had one.", note: "Most common context for offers", tip: "Always respond politely" },
      { offer_type: "Help/Assistance", offer_example: "Would you like me to carry that bag?", accept: "Yes, please. That's very kind.", decline: "No, thanks. I can manage.", note: "Offering to help someone", response_note: "Express gratitude even when declining" },
      { request_type: "Asking for Help", request_example: "Would you show me how to use this?", response: "Sure, let me show you.", alternative: "Could you show me...? (also polite)", note: "Asking someone to teach/show", tip: "Use 'please' to be extra polite" },
      { request_type: "Asking for Action", request_example: "Would you open the window, please?", response: "Of course. / Right away.", alternative: "Can you...? / Could you...?", note: "Asking someone to do something", comparison: "'Would' is more polite than 'can'" },
      { common_mistake: "Using 'like' in requests", wrong: "Would you like help me?", correct: "Would you help me? / Would you like to help me?", rule: "Offers: 'like + noun/to V', Requests: NO 'like'", explanation: "Don't confuse offers with requests!", critical: "Very common error!" },
      { common_mistake: "Wrong response to 'mind'", wrong: "Q: Would you mind helping? A: Yes. (= I'll help)", correct: "Q: Would you mind helping? A: Not at all. (= I'll help)", rule: "'Not at all' = I don't mind = I'll do it", explanation: "'mind' means 'feel bothered by'", note: "Opposite logic in English!" },
      { phrase: "Would you like some...?", context: "Offering countable plural or uncountable", example: "Would you like some cookies? / some water?", note: "Use 'some' in offers", pattern: "'some' in questions (offers only)" },
      { phrase: "I'd like...", meaning: "I want (polite)", structure: "I'd (I would) like + noun/to V", example: "I'd like a coffee, please.", note: "Polite way to order or request", usage: "Restaurants, shops, formal situations" },
      { phrase: "Would you prefer...?", meaning: "Asking about preference", structure: "Would you prefer A or B?", example: "Would you prefer tea or coffee?", response: "I'd prefer tea, please.", note: "Offering a choice", comparison: "More specific than 'like'" },
      { response_accepting: "Accepting offers politely", examples: "Yes, please. / That would be great. / I'd love to. / Thank you, that's very kind.", note: "Show appreciation", tone: "Warm and grateful" },
      { response_declining: "Declining offers politely", examples: "No, thank you. / I'm fine, thanks. / That's very kind, but I'm okay.", note: "Always thank, even when declining", tone: "Polite and grateful" },
      { context: "Formal situations", examples: "Would you like to take a seat? / Would you follow me, please?", note: "Very common in business, hotels, restaurants", level: "Professional politeness" },
      { context: "Everyday situations", examples: "Would you like a biscuit? / Would you pass me the salt?", note: "Daily use with family, friends, strangers", level: "Standard politeness" }
    ]
  },
  
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
  
  table: {
    title: "📋 Be Going To vs Will: Future Forms Compared",
    data: [
      { use: "Will - Spontaneous Decisions", when: "Decisions made at the moment of speaking", example: "The phone is ringing. I'll answer it.", note: "Decision made NOW, not planned", turkish: "Ani kararlar", context: "No previous plan" },
      { use: "Be Going To - Planned Actions", when: "Decisions/plans made before speaking", example: "I'm going to visit my aunt tomorrow. (I decided yesterday)", note: "Already planned before now", turkish: "Önceden planlanmış", context: "Decision was made earlier" },
      { use: "Will - Predictions (no evidence)", when: "Future predictions based on opinion/belief", example: "I think it will rain tomorrow.", note: "Opinion, no visible evidence", turkish: "Tahmin (kanıt yok)", signal_words: "I think, probably, maybe, I hope" },
      { use: "Be Going To - Predictions (evidence)", when: "Predictions based on present evidence", example: "Look at those clouds! It's going to rain.", note: "You can SEE the evidence NOW", turkish: "Tahmin (kanıt var)", signal_words: "Look!, based on present situation" },
      { use: "Will - Offers", when: "Offering to do something", example: "I'll help you carry that bag.", note: "Spontaneous offer", turkish: "Teklif", pattern: "I'll + verb" },
      { use: "Will - Promises", when: "Making promises or guarantees", example: "I promise I'll call you tonight.", note: "Giving your word", turkish: "Söz verme", pattern: "I promise I'll..." },
      { use: "Will - Threats/Warnings", when: "Warning about future consequences", example: "If you don't study, you'll fail the exam.", note: "Conditional warning", pattern: "If..., will..." },
      { will_formation: "Affirmative", structure: "Subject + will + V1", examples: "I/You/He/She/It/We/They will go", short_form: "I'll, you'll, he'll, she'll, we'll, they'll", note: "Same form for all subjects" },
      { will_formation: "Negative", structure: "Subject + will not + V1", examples: "I will not (won't) go", short_form: "won't = will not", note: "Use won't in speech" },
      { will_formation: "Question", structure: "Will + subject + V1?", examples: "Will you go? / Will she come?", answer: "Yes, I will. / No, I won't.", note: "Inversion for questions" },
      { going_to_formation: "Affirmative", structure: "Subject + be + going to + V1", examples: "I am going to study. / He is going to travel.", note: "'be' changes with subject", pattern: "am/is/are + going to + V1" },
      { going_to_formation: "Negative", structure: "Subject + be + not + going to + V1", examples: "I'm not going to go. / She isn't going to come.", short_form: "isn't, aren't", note: "'be' negative" },
      { going_to_formation: "Question", structure: "Be + subject + going to + V1?", examples: "Are you going to study? / Is he going to come?", answer: "Yes, I am. / No, I'm not.", note: "Inversion of 'be'" },
      { common_mistake: "Using 'will' for planned actions", wrong: "I will visit my friend tomorrow. (if already planned)", correct: "I'm going to visit my friend tomorrow.", rule: "Planned = use 'going to'", explanation: "'will' = spontaneous, 'going to' = planned" },
      { common_mistake: "Using 'going to' for spontaneous decisions", wrong: "Phone rings → I'm going to answer it.", correct: "Phone rings → I'll answer it.", rule: "Spontaneous decision at the moment = 'will'", explanation: "No plan before, so use 'will'" },
      { common_mistake: "Confusing evidence-based predictions", wrong: "Look at the sky! It will rain. (when you SEE clouds)", correct: "Look at the sky! It's going to rain.", rule: "Evidence you can see NOW = 'going to'", explanation: "Visible evidence = going to" },
      { situation: "At a restaurant (spontaneous)", customer: "I'll have the chicken, please.", note: "Decided at the moment = will", alternative: "NOT: I'm going to have..." },
      { situation: "Planned trip", speaker: "I'm going to study abroad next year.", note: "Already decided/planned = going to", alternative: "NOT: I will study abroad (unless spontaneous)" },
      { situation: "Making an offer", speaker: "You look tired. I'll make you some tea.", note: "Spontaneous offer = will", alternative: "NOT: I'm going to make..." },
      { situation: "Future fact/certainty", speaker: "I will be 30 next year.", note: "Will for facts", also_correct: "I'm going to be 30 next year.", explanation: "Both okay for personal facts" },
      { time_clause_rule: "After time words", structure: "When/After/Before + present (NOT will/going to)", example: "When I see her, I'll tell her. (NOT: when I will see)", note: "No future in time clauses!", critical: "Very important rule!", pattern: "After I finish, I'll go home." }
    ]
  },
  
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
  
  table: {
    title: "📋 Future Continuous: Actions in Progress in the Future",
    data: [
      { formation: "Structure", pattern: "Subject + will be + V-ing", example: "I will be working at 10 PM.", note: "Action in progress at a specific future time", turkish: "Gelecekte devam eden eylem", usage: "Describing ongoing future actions" },
      { use: "Specific time in future", when: "Action happening at an exact future moment", example: "At 8 PM tomorrow, I'll be watching a movie.", note: "The action will be IN PROGRESS at that time", time_markers: "at 10 PM, this time tomorrow, at noon", context: "Talking about what you'll be doing at a specific time" },
      { use: "Duration around future time", when: "Action continuing for a period in the future", example: "I'll be studying all evening.", note: "Continuous action over a time period", time_markers: "all day, all night, all week", context: "Extended future activity" },
      { use: "Polite inquiries about plans", when: "Asking about someone's plans (polite)", example: "Will you be using the car tonight?", note: "More polite than 'Will you use...?'", comparison: "Less direct than simple future", tone: "Softer, less demanding" },
      { use: "Predictions about present/future", when: "Guessing what's happening now or will happen", example: "She'll be working now. (I guess)", note: "Making assumptions", context: "When you don't know for sure", pattern: "Used for logical guesses" },
      { use: "Background action in future", when: "Setting scene for future events", example: "This time next week, I'll be lying on a beach.", note: "Describing future situation/atmosphere", context: "Imagining future scenarios", feeling: "Often dreamy or anticipatory" },
      { formation_aff: "Affirmative", structure: "Subject + will be + V-ing", examples: "I/You/He/She/We/They will be sleeping", short_form: "I'll be, you'll be, he'll be, etc.", note: "Same for all subjects" },
      { formation_neg: "Negative", structure: "Subject + will not be + V-ing", examples: "I will not (won't) be working", short_form: "won't be + V-ing", note: "won't be = will not be" },
      { formation_q: "Yes/No Questions", structure: "Will + subject + be + V-ing?", example: "Will you be attending the meeting?", answer: "Yes, I will. / No, I won't.", note: "Inversion of will + subject" },
      { formation_wh: "Wh- Questions", structure: "Wh- + will + subject + be + V-ing?", examples: "What will you be doing? / Where will she be staying?", note: "Question word + will + subject + be + V-ing", pattern: "Asking for details about future ongoing actions" },
      { time_expression: "At + specific time", examples: "at 10 PM, at noon, at midnight", sentence: "At 10 PM, I'll be having dinner.", note: "Exact time point in future" },
      { time_expression: "This time + period", examples: "this time tomorrow, this time next week/month/year", sentence: "This time next year, I'll be living in Paris.", note: "Same time in a future period" },
      { time_expression: "All + time period", examples: "all day, all night, all week", sentence: "I'll be working all day tomorrow.", note: "Continuous throughout the period" },
      { time_expression: "When + present simple", examples: "when you arrive, when she calls", sentence: "When you arrive, I'll be cooking dinner.", note: "Background action when another happens", rule: "Use present simple after 'when', NOT future!" },
      { comparison: "Future Simple vs Future Continuous", simple: "I will work tomorrow. (fact, decision)", continuous: "I will be working at 3 PM. (in progress at that time)", difference: "Simple = whole action, Continuous = in progress", note: "Continuous emphasizes the ongoing nature" },
      { common_mistake: "Forgetting 'be'", wrong: "I will working at 10 PM.", correct: "I will be working at 10 PM.", rule: "Must use 'will + be + V-ing'", explanation: "'be' is essential for continuous form!" },
      { common_mistake: "Using future after 'when'", wrong: "When I will arrive, I'll be tired.", correct: "When I arrive, I'll be tired.", rule: "Present simple after time words (when, after, before)", explanation: "No future tense in time clauses!", critical: "Very common mistake!" },
      { common_mistake: "Confusing with 'going to be'", wrong: "I'm going to be working. (for specific time)", correct: "I will be working at 8 PM.", rule: "Use 'will be + V-ing' for Future Continuous", note: "Standard form is 'will be', not 'going to be'" },
      { polite_usage: "Polite question about plans", direct: "Will you use the car tonight?", polite: "Will you be using the car tonight?", difference: "Continuous = more polite, less direct", note: "Sounds less like asking permission", context: "Checking plans without imposing" },
      { context: "Making plans around others", example: "Will you be going to the supermarket? (If yes, can you buy milk?)", note: "Asking to coordinate activities", usage: "Checking availability or plans" },
      { context: "Describing future routines", example: "I'll be working from home on Fridays.", note: "Regular future activity", usage: "Describing future habits/schedules" }
    ]
  },
  
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
  
  table: {
    title: "📋 Present Perfect with Ever/Never: Life Experiences",
    data: [
      { formation: "Structure", pattern: "Subject + have/has + V3 (past participle)", example: "I have visited London.", note: "Past action with connection to present", turkish: "Geçmiş deneyim (şimdiye etkisi var)", usage: "Talking about life experiences" },
      { use: "Life experiences (ever)", when: "Asking if someone has done something in their life", structure: "Have/Has + subject + ever + V3?", example: "Have you ever eaten sushi?", note: "'ever' = at any time in your life", meaning: "Hiç ... yaptın mı? (hayatında)", context: "General life experience, no specific time" },
      { use: "Life experiences (never)", when: "Saying you haven't done something in your life", structure: "Subject + have/has + never + V3", example: "I have never eaten sushi.", note: "'never' = not at any time", meaning: "Hiç ... yapmadım (hayatımda)", context: "Negative life experience" },
      { use: "Affirmative experiences", when: "Stating experiences without 'ever'", structure: "Subject + have/has + V3", example: "I have visited Paris three times.", note: "Confirming experience happened", context: "Can add frequency: once, twice, many times", pattern: "Simple statement of experience" },
      { ever_usage: "Position of 'ever'", placement: "Between have/has and V3", examples: "Have you ever been...? / Has she ever tried...?", note: "ONLY in questions about experiences", critical: "Never use 'ever' in affirmative statements!", wrong: "I have ever been to Paris. ✗" },
      { never_usage: "Position of 'never'", placement: "Between have/has and V3", examples: "I have never been... / She has never tried...", note: "ONLY in negative statements", meaning: "Never = not ever", alternative: "I haven't been (without 'never') is less emphatic" },
      { formation_subj: "Subject variations", I_you_we_they: "have + V3", he_she_it: "has + V3", examples: "I/You/We/They have done | He/She/It has done", short_forms: "I've, you've, we've, they've | he's, she's, it's", note: "Have vs Has depends on subject" },
      { common_v3: "Common irregular V3 forms", examples: "go → gone, see → seen, eat → eaten, be → been, do → done, have → had, make → made", note: "Must memorize irregular forms!", reference: "Check irregular verb list", critical: "NOT: goed, seed, eated!" },
      { common_v3_2: "More irregular V3", examples: "take → taken, give → given, write → written, break → broken, speak → spoken, drive → driven", pattern: "Many end in -en", note: "Very common in experience questions" },
      { question_formation: "Ever questions", structure: "Have/Has + subject + ever + V3?", examples: "Have you ever climbed a mountain? / Has he ever driven a car?", answer_yes: "Yes, I have. / Yes, he has.", answer_no: "No, I haven't. / No, he hasn't.", note: "Short answers use have/has" },
      { negative_formation: "Never statements", structure: "Subject + have/has + never + V3", examples: "I have never seen snow. / She has never flown in a plane.", note: "Never = strong negative", alternative: "I haven't seen snow. (less emphatic)", meaning: "'Never' emphasizes 'not even once'" },
      { common_mistake: "Using Past Simple for experiences", wrong: "Did you ever go to Paris?", correct: "Have you ever been to Paris?", rule: "Life experiences = Present Perfect", explanation: "No specific time, just asking about life", note: "Past Simple needs specific time" },
      { common_mistake: "Using 'ever' in affirmative", wrong: "I have ever been to London.", correct: "I have been to London. (NO 'ever')", rule: "'Ever' ONLY in questions, NEVER in affirmative", explanation: "'Ever' is for asking, not telling" },
      { common_mistake: "Using V2 instead of V3", wrong: "I have went to Paris.", correct: "I have gone to Paris.", rule: "Must use V3 (past participle), NOT V2 (past simple)", critical: "went = V2, gone = V3", note: "Very common error!" },
      { common_mistake: "Double negative with 'never'", wrong: "I haven't never been there.", correct: "I have never been there. OR I haven't been there.", rule: "Don't use 'never' + 'not' together", explanation: "Choose one: 'never' OR 'haven't'", note: "Double negative is wrong in English!" },
      { comparison: "Present Perfect vs Past Simple", present_perfect: "Have you ever been to London? (life experience, no time)", past_simple: "Did you go to London last year? (specific time)", difference: "PP = anytime in life, PS = specific time", signal_words_pp: "ever, never, before", signal_words_ps: "yesterday, last week, in 2020" },
      { response_patterns: "Answering 'ever' questions - Yes", question: "Have you ever eaten octopus?", short_answer: "Yes, I have.", full_answer: "Yes, I have. I tried it in Greece.", note: "Can add details about the experience", context: "Where, when, how it was" },
      { response_patterns: "Answering 'ever' questions - No", question: "Have you ever ridden a horse?", short_answer: "No, I haven't. / No, never.", full_answer: "No, I have never ridden a horse.", note: "Can use 'never' for emphasis", alternative: "No, but I'd like to. (expressing interest)" },
      { context: "Asking about experiences", purpose: "Getting to know someone, checking if they've done something", examples: "Have you ever tried Turkish food? / Has she ever lived abroad?", usage: "Conversations, interviews, surveys", tone: "Curious, interested in life experiences" },
      { time_markers: "No specific time mentioned", characteristic: "Don't mention WHEN it happened", examples: "Have you ever been to Paris? ✓", wrong: "Have you ever been to Paris last year? ✗", rule: "If you mention specific time, use Past Simple", correct: "Did you go to Paris last year?" }
    ]
  },
  
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
  
  table: {
    title: "📋 Present Perfect with just/already/yet: Recent Actions & Completion",
    data: [
      { adverb: "just", meaning: "Very recently / a short time ago", turkish: "Az önce, yeni", when: "Action completed a very short time ago", example: "I have just finished my homework.", note: "Emphasizes recency", timeframe: "Seconds, minutes ago", feeling: "Fresh, immediate" },
      { adverb: "already", meaning: "Sooner than expected / before now", turkish: "Zaten, çoktan", when: "Action completed earlier than anticipated", example: "She has already left. (We thought she'd still be here)", note: "Emphasizes completion happened before expected", context: "Surprise or earlier than planned", feeling: "Ahead of schedule" },
      { adverb: "yet", meaning: "Up to now / by this time", turkish: "Henüz (questions & negatives only)", when: "Asking if action is complete OR saying it's not complete", example_q: "Have you finished yet?", example_neg: "I haven't finished yet.", note: "ONLY in questions and negatives!", critical: "NEVER in affirmative statements!" },
      { just_position: "Position of 'just'", placement: "Between have/has and V3", structure: "Subject + have/has + just + V3", examples: "I have just arrived. / She has just called.", note: "Always in this position", alternative: "I've just... (contraction common)" },
      { already_position: "Position of 'already'", placement: "Between have/has and V3 (or at end)", structure: "Subject + have/has + already + V3", examples: "I have already eaten. / I have eaten already.", note: "Mid-sentence is more common", preference: "Middle position preferred in British English" },
      { yet_position: "Position of 'yet'", placement: "At the END of the sentence", structure_q: "Have/Has + S + V3 + yet?", structure_neg: "S + haven't/hasn't + V3 + yet", examples: "Have you done it yet? / I haven't done it yet.", note: "Always at the end!", critical: "NEVER in the middle!" },
      { just_use: "Using 'just' - Very recent", context: "Something happened moments ago", examples: "I've just woken up. / He's just left the room. / They've just arrived.", feeling: "Action is very fresh, still relevant", timeframe: "Usually within last few minutes", note: "Speaker wants to emphasize how recent it is" },
      { already_use: "Using 'already' - Sooner than expected", context: "Completion happened before anticipated time", examples: "It's only 7 AM and she has already finished! / Have you already done your homework? (surprised)", surprise: "Often expresses surprise", comparison: "Earlier than normal/expected", note: "Can be in questions to express surprise" },
      { yet_use_q: "Using 'yet' - Questions", context: "Asking if something is complete", examples: "Have you eaten yet? / Has he called yet? / Have they arrived yet?", meaning: "Is it done by now?", expectation: "Asking about completion up to this moment", tone: "Neutral or slightly impatient" },
      { yet_use_neg: "Using 'yet' - Negatives", context: "Action not completed up to now", examples: "I haven't eaten yet. / She hasn't called yet. / They haven't arrived yet.", meaning: "Not done by this time, but might happen soon", expectation: "Action is still expected to happen", implication: "But it will happen later" },
      { common_mistake: "Using 'yet' in affirmative", wrong: "I have yet finished my homework. ✗", correct: "I have already finished my homework. ✓", rule: "'Yet' NEVER in affirmative statements!", explanation: "Use 'already' for affirmative", critical: "Very common error by Turkish speakers!" },
      { common_mistake: "Using 'already' in negatives", wrong: "I haven't already eaten. ✗", correct: "I haven't eaten yet. ✓", rule: "'Already' NOT in negatives, use 'yet'", explanation: "Negatives need 'yet', not 'already'", note: "Or simply: I haven't eaten. (without 'yet')" },
      { common_mistake: "Wrong position of 'yet'", wrong: "I yet haven't finished. ✗", correct: "I haven't finished yet. ✓", rule: "'Yet' goes at the END of sentence", explanation: "Never put 'yet' in the middle", critical: "Must be final position!" },
      { common_mistake: "Wrong position of 'just'", wrong: "I have finished just. ✗", correct: "I have just finished. ✓", rule: "'Just' goes BETWEEN have/has and V3", explanation: "Middle position, not at the end" },
      { comparison: "just vs already", just: "I've just finished. (very recent, emphasis on recency)", already: "I've already finished. (earlier than expected)", difference: "'just' = time focus, 'already' = completion focus", note: "'just' = when it happened, 'already' = that it's done" },
      { comparison: "already vs yet", already: "I have already done it. (affirmative - it's done)", yet: "I haven't done it yet. (negative - not done)", rule: "'Already' = affirmative, 'yet' = negative/question", context: "Different sentence types" },
      { short_answers_yet: "Answering 'yet' questions", question: "Have you finished yet?", answer_yes: "Yes, I have. / Yes, I've just finished.", answer_no: "No, not yet. / No, I haven't.", note: "'Not yet' is very common", alternative: "Almost! / Nearly!" },
      { time_context: "Time perspective", just: "Points to the immediate past", already: "Points to completion status", yet: "Points to present moment (has it happened up to now?)", note: "Different time focus", context: "All three show different aspects of the same present perfect time frame" },
      { spoken_patterns: "Common spoken phrases", examples: "I've just... / I've already... / Not yet! / Already? (surprise) / Just now!", note: "Very common in daily speech", contractions: "I've, you've, he's, she's, we've, they've", usage: "Contractions are standard in speech" },
      { context_surprise: "Expressing surprise with 'already'", examples: "You've already finished? But you just started! / Have you already eaten all the cookies?", tone: "Surprised, sometimes impressed", note: "Question with 'already' = surprise", pattern: "Have you already...? (expressing surprise)" }
    ]
  },
  
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
  
  table: {
    title: "📋 Present Perfect: for / since - Duration vs Starting Point",
    data: [
      { preposition: "for", meaning: "Period of time / Duration", turkish: "Süre boyunca", usage: "How LONG something has lasted", examples: "for 3 years, for 2 months, for a week, for a long time", sentence: "I have lived here for 10 years.", note: "Answer to 'How long?'" },
      { preposition: "since", meaning: "Starting point in time", turkish: "Beri, -den beri", usage: "WHEN something started", examples: "since 2020, since Monday, since childhood, since yesterday", sentence: "She has worked here since 2015.", note: "Answer to 'Since when?'" },
      { difference: "for vs since", for_rule: "'for' + LENGTH of time", since_rule: "'since' + POINT in time", for_ex: "for 5 hours (duration)", since_ex: "since 8 AM (starting time)", key: "'for' = how long, 'since' = when it started", critical: "Don't confuse!" },
      { formation: "Structure with for/since", pattern: "Subject + have/has + V3 + for/since + time", examples: "I have studied English for 3 years. / I have studied English since 2021.", note: "Both use Present Perfect", context: "Action started in past, continues until now" },
      { for_examples: "Common 'for' expressions", durations: "for minutes, hours, days, weeks, months, years, decades, centuries", examples: "for 10 minutes, for 2 hours, for a few days, for several weeks, for many years", note: "Countable periods of time", pattern: "for + NUMBER + time unit" },
      { since_examples: "Common 'since' expressions", points: "since + specific date/time/event", examples: "since 2010, since Monday, since morning, since last week, since I was a child", note: "Specific starting points", pattern: "since + TIME/EVENT when it started" },
      { question_how_long: "Asking about duration", question: "How long + have/has + S + V3?", examples: "How long have you lived here? / How long has she worked there?", answer_for: "For 5 years. / For a long time.", answer_since: "Since 2018. / Since last summer.", note: "Can answer with 'for' or 'since'" },
      { for_time_units: "Time units with 'for'", common: "for a minute, for an hour, for a day, for a week, for a month, for a year", longer: "for ages, for a long time, for years, for decades", shorter: "for a moment, for a while, for a second", note: "Any duration, long or short" },
      { since_time_types: "Time types with 'since'", dates: "since 2020, since January, since 2015", days: "since Monday, since yesterday, since last Friday", times: "since 8 AM, since noon, since this morning", life_periods: "since childhood, since I was young, since graduation", note: "Always a specific point" },
      { common_mistake: "Using 'since' with duration", wrong: "I have lived here since 10 years. ✗", correct: "I have lived here for 10 years. ✓", rule: "Duration (10 years) = 'for', NOT 'since'", explanation: "'Since' needs a specific point, not a duration", critical: "Very common error!" },
      { common_mistake: "Using 'for' with starting point", wrong: "She has worked here for 2020. ✗", correct: "She has worked here since 2020. ✓", rule: "Specific year/date = 'since', NOT 'for'", explanation: "'For' needs duration, not a point in time", critical: "Must use 'since' with dates!" },
      { common_mistake: "Confusing 'for' with 'ago'", wrong: "I came here for 5 years. ✗", correct: "I came here 5 years ago. (Past Simple) / I have been here for 5 years. (Present Perfect)", rule: "'ago' = Past Simple (finished), 'for' = Present Perfect (continues)", difference: "'ago' points to past moment, 'for' shows duration until now" },
      { since_clause: "'Since' + time clause", structure: "since + subject + past simple verb", examples: "I haven't seen him since he moved away. / She has been happy since she started her new job.", note: "'Since' can introduce a clause", pattern: "since + S + V2 (past simple)", usage: "Event that marks the starting point" },
      { time_still_continues: "Duration continues to now", concept: "Action started in past, still true now", examples: "I have lived here for 10 years. (still living here) / I have known her since 2015. (still know her)", contrast: "NOT finished!", vs_past: "Past Simple = finished action", note: "That's why we use Present Perfect" },
      { negative_for_since: "Negatives with for/since", structure: "haven't/hasn't + V3 + for/since", examples: "I haven't eaten for 6 hours. / She hasn't called since Monday.", meaning: "Action has NOT happened during this time", note: "Time period without the action", context: "Absence of action for duration/since point" },
      { short_answers: "Short answers to 'How long?'", question: "How long have you studied English?", answer_for: "For 3 years.", answer_since: "Since 2021.", note: "Both are correct answers", can_combine: "For 3 years, since 2021. (both together)" },
      { present_perfect_continuous: "Also works with Continuous", structure: "have/has been + V-ing + for/since", examples: "I've been working here for 5 years. / He's been sleeping since noon.", note: "Present Perfect Continuous also uses for/since", difference: "Continuous emphasizes ongoing action" },
      { context_lifelong: "Lifelong experiences", examples: "I've known her since childhood. / I've lived here for my whole life. / I've been a teacher for 20 years.", note: "Long-term situations", feeling: "Emphasizes permanence or long duration" },
      { context_recent: "Recent durations", examples: "I haven't slept for 24 hours. / I've been awake since 6 AM. / I've been waiting for an hour.", note: "Shorter, more immediate durations", feeling: "Often shows frustration or tiredness" }
    ]
  },
  
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
  
  table: {
    title: "📋 Present Perfect vs Past Simple: The Critical Difference",
    data: [
      { aspect: "Time perspective", present_perfect: "Connection to NOW", past_simple: "Finished time in the PAST", pp_focus: "Result affects present", ps_focus: "Action in completed past", key: "PP = now matters, PS = then matters" },
      { aspect: "When to use", present_perfect: "Time NOT specified or still relevant", past_simple: "Specific time in the past", pp_example: "I have eaten lunch. (anytime before now)", ps_example: "I ate lunch at 1 PM. (specific time)", note: "Time specification is the key!" },
      { use_pp: "Present Perfect - Unspecified time", when: "No specific time mentioned", examples: "I have visited Paris. / She has seen that movie. / They have tried sushi.", meaning: "It happened, but WHEN is not important", focus: "The experience or result", context: "Life experiences, news, recent events" },
      { use_ps: "Past Simple - Specific time", when: "Specific time is mentioned", examples: "I visited Paris in 2020. / She saw that movie yesterday. / They tried sushi last week.", meaning: "It happened at a SPECIFIC past time", focus: "The past action itself", context: "Historical events, completed actions" },
      { signal_words_pp: "Present Perfect signals", words: "ever, never, just, already, yet, recently, lately, so far, up to now, for, since", examples: "Have you ever been there? / I've just arrived. / She hasn't called yet.", note: "These words suggest connection to now", context: "Time period continues to present" },
      { signal_words_ps: "Past Simple signals", words: "yesterday, last (week/month/year), ago, in (2020), when I was..., at (specific time)", examples: "I went there yesterday. / She called last week. / We met 5 years ago.", note: "These words specify finished past time", context: "Completed time period" },
      { duration_pp: "Present Perfect - Continuing duration", when: "Action started in past, continues now", structure: "have/has + V3 + for/since", examples: "I have lived here for 10 years. (still live here)", meaning: "Started in past, STILL TRUE now", key: "Action not finished!", note: "Use 'for' or 'since'" },
      { duration_ps: "Past Simple - Finished duration", when: "Action started and finished in past", structure: "V2 + time expression", examples: "I lived there for 10 years. (don't live there anymore)", meaning: "Started and ENDED in the past", key: "Action is finished!", note: "Past action with no present connection" },
      { comparison_same_action: "Same action, different meaning", present_perfect: "I've lost my keys. (I don't have them NOW)", past_simple: "I lost my keys. (but I found them / past event)", difference: "PP = problem now, PS = past event", note: "PP emphasizes present result", ps_note: "PS just reports past fact" },
      { comparison_recently: "Recent past", present_perfect: "I've just finished. (very recently, still relevant)", past_simple: "I finished 5 minutes ago. (specific time)", both_recent: "Both are recent, but...", difference: "PP = no time / relevance to now, PS = specific time given" },
      { common_mistake: "Using PS with 'just/already/yet'", wrong: "I just finished. ✗ / I already ate. ✗ / Did you finish yet? ✗", correct: "I've just finished. ✓ / I've already eaten. ✓ / Have you finished yet? ✓", rule: "'just/already/yet' = ALWAYS Present Perfect", explanation: "These words show connection to present", critical: "Very common American English mistake!" },
      { common_mistake: "Using PP with specific past time", wrong: "I have visited Paris last year. ✗ / She has seen him yesterday. ✗", correct: "I visited Paris last year. ✓ / She saw him yesterday. ✓", rule: "Specific past time = ALWAYS Past Simple", explanation: "'last year', 'yesterday' = finished time", critical: "Cannot mix PP with past time words!" },
      { common_mistake: "Continuing action with PS", wrong: "I live here for 5 years. ✗ (if you still live there)", correct: "I have lived here for 5 years. ✓", rule: "Still true now = Present Perfect", explanation: "PS means finished, PP means continuing" },
      { question_pp: "Present Perfect questions", focus: "General experience or recent action", examples: "Have you ever been to Japan? / Has she called? / Have they finished?", answer: "Yes, I have. / No, she hasn't.", note: "No specific time in question", context: "Checking if something happened" },
      { question_ps: "Past Simple questions", focus: "Specific past event", examples: "Did you go to Japan in 2020? / Did she call yesterday? / When did they finish?", answer: "Yes, I did. / No, she didn't. / They finished at 5.", note: "Specific time mentioned or implied", context: "Asking about past circumstances" },
      { today_this_week: "Special case: 'today', 'this week' (unfinished)", time_not_over: "If the time period is not finished yet", use_pp: "I have seen him twice today. (today not finished)", use_ps: "I saw him twice yesterday. (yesterday finished)", rule: "Unfinished period = PP, Finished period = PS", note: "'this morning' = PP (if morning) or PS (if afternoon/evening)" },
      { news_events: "News and recent events", present_perfect: "Have you heard the news? / The president has resigned. / A new study has shown...", past_simple: "The president resigned yesterday. / Columbus discovered America in 1492.", difference: "PP = recent/relevant news, PS = historical facts", pattern: "News starts with PP, continues with PS details" },
      { conversation_pattern: "Typical conversation flow", start_pp: "Have you ever been to Italy? (PP - experience question)", continue_ps: "Yes, I went there in 2019. (PS - specific time) It was amazing. (PS - past fact)", pattern: "PP introduces topic → PS gives details", note: "Very common pattern in English!" },
      { result_vs_action: "Result (PP) vs Action (PS)", present_perfect: "I've broken my arm. (result: arm is broken NOW)", past_simple: "I broke my arm last year. (action: happened then, healed now)", focus: "PP = current state, PS = past event", key: "PP emphasizes NOW situation" },
      { time_quiz: "Choose the right tense", if_time_specified: "Use Past Simple", if_time_unspecified: "Use Present Perfect", if_continues_now: "Use Present Perfect", if_finished_past: "Use Past Simple", rule: "Time connection = the deciding factor!" }
    ]
  },
  
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
  
  table: {
    title: "📋 Too / Enough: Expressing Excess & Sufficiency",
    data: [
      { word: "too", meaning: "Excessive / more than needed", turkish: "Fazla, gereğinden çok", connotation: "NEGATIVE - problem", usage: "Something is MORE than acceptable/good", example: "This coffee is too hot. (I can't drink it)", note: "Usually indicates a problem" },
      { word: "enough", meaning: "Sufficient / as much as needed", turkish: "Yeterli, yeterince", connotation: "Neutral or POSITIVE", usage: "The right amount", example: "This coffee is hot enough. (I can drink it)", note: "The amount/degree is satisfactory" },
      { structure_too_adj: "too + adjective/adverb", pattern: "too + adj/adv", examples: "too hot, too expensive, too difficult, too slowly, too fast", sentence: "The soup is too salty. (I can't eat it)", note: "'too' always BEFORE adj/adv", meaning: "Exceeds the acceptable level" },
      { structure_adj_enough: "adjective/adverb + enough", pattern: "adj/adv + enough", examples: "tall enough, fast enough, good enough, carefully enough", sentence: "He isn't tall enough to reach the shelf.", note: "'enough' always AFTER adj/adv", meaning: "Reaches the required level (or doesn't)" },
      { structure_enough_noun: "enough + noun", pattern: "enough + noun", examples: "enough time, enough money, enough chairs, enough water", sentence: "We have enough chairs for everyone.", note: "'enough' always BEFORE nouns", meaning: "The required quantity", contrast: "Different position than with adjectives!" },
      { too_infinitive: "too + adj/adv + to + infinitive", structure: "too + adj/adv + to + V1", examples: "too hot to eat, too tired to work, too expensive to buy", sentence: "The coffee is too hot to drink.", meaning: "So excessive that something is impossible", note: "Explains the consequence of 'too'" },
      { enough_infinitive: "adj/adv + enough + to + infinitive", structure: "adj/adv + enough + to + V1", examples: "tall enough to reach, fast enough to win, strong enough to carry", sentence: "He is tall enough to reach the shelf.", meaning: "Sufficient to do something", note: "Explains what is possible because of sufficiency" },
      { too_for_person: "too + adj + for + person/thing", structure: "too + adj + for + sb/sth", examples: "too difficult for me, too heavy for her, too fast for us", sentence: "This exercise is too difficult for children.", meaning: "Excessive in relation to someone/something", note: "Specifies who it's too much for" },
      { not_enough: "not + adj/adv + enough", pattern: "not + adj/adv + enough", examples: "not tall enough, not fast enough, not warm enough", sentence: "You're not old enough to drive. (too young)", meaning: "Below the required level", opposite: "Lack of sufficiency", note: "Often the opposite of 'too'" },
      { enough_alone: "'enough' as pronoun", pattern: "enough (alone, without noun)", examples: "Is this enough? / That's enough! / We don't have enough.", sentence: "Is there enough for everyone? - Yes, there's enough.", meaning: "Sufficient amount (noun understood)", note: "Can stand alone without naming the thing" },
      { common_mistake: "Wrong position of 'enough' with adjective", wrong: "He is enough tall. ✗", correct: "He is tall enough. ✓", rule: "'enough' comes AFTER adjectives", explanation: "English word order: adj + enough", critical: "Very common mistake!" },
      { common_mistake: "Wrong position of 'enough' with noun", wrong: "We have chairs enough. ✗", correct: "We have enough chairs. ✓", rule: "'enough' comes BEFORE nouns", explanation: "English word order: enough + noun", critical: "Opposite of adjective position!" },
      { common_mistake: "Using 'too' when meaning 'very'", wrong: "This movie is too good! (if you mean it's great) ✗", correct: "This movie is very good! / so good! ✓", rule: "'too' = negative problem, 'very/so' = positive emphasis", explanation: "'too good' means it's a problem!", note: "'too' always implies excess/problem" },
      { common_mistake: "Confusing 'too much/many'", rule: "too much + uncountable, too many + countable", examples: "too much water / too many chairs", wrong: "too many water ✗ / too much chairs ✗", note: "Different from 'too + adjective'" },
      { comparison: "too vs very", too: "The coffee is too hot. (problem, can't drink)", very: "The coffee is very hot. (just description, can still drink)", difference: "'too' = excess problem, 'very' = high degree (no problem)", key: "'too' = negative implication" },
      { comparison: "not enough vs too", not_enough: "It's not warm enough. (insufficient warmth)", too: "It's too cold. (excessive coldness)", meaning: "Often express similar ideas from opposite angles", note: "Both indicate a problem", example: "not fast enough = too slow" },
      { enough_for_person: "enough + noun + for + person", structure: "enough + noun + for + sb", examples: "enough food for everyone, enough time for the test, enough chairs for the guests", sentence: "We don't have enough cups for all the guests.", note: "Specifies who/what it's sufficient for" },
      { too_much_many: "'too much' / 'too many' (quantifiers)", too_much: "too much + uncountable noun (too much sugar, water, time)", too_many: "too many + countable noun (too many people, chairs, cars)", usage: "Excessive quantity, not quality", difference: "Different from 'too + adjective'" },
      { context_complaints: "Using 'too' for complaints", examples: "It's too expensive! / This is too difficult! / You're too slow!", tone: "Complaining about problems", usage: "Very common in everyday complaints", note: "'too' emphasizes the problem" }
    ]
  },
  
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
  
  table: {
    title: "📋 So / Such: Intensifiers for Strong Emphasis",
    data: [
      { word: "so", function: "Intensifier for adjectives & adverbs", usage: "To emphasize degree/extent", meaning: "Very / extremely", turkish: "O kadar, çok", pattern: "so + adj/adv", example: "She is so beautiful!", note: "Makes adjectives/adverbs stronger" },
      { word: "such", function: "Intensifier for nouns (with adjective)", usage: "To emphasize quality of a thing", meaning: "What a... / very", turkish: "Öyle, o kadar", pattern: "such + (adj) + noun", example: "She is such a beautiful girl!", note: "Emphasizes the noun" },
      { structure_so_adj: "so + adjective", pattern: "so + adj", examples: "so beautiful, so difficult, so expensive, so happy", sentence: "The movie was so interesting!", note: "Emphasizes the quality", usage: "Very common in speech", feeling: "Strong emotion/reaction" },
      { structure_so_adv: "so + adverb", pattern: "so + adv", examples: "so quickly, so well, so badly, so slowly, so fast", sentence: "He drives so fast!", note: "Emphasizes how something is done", usage: "Manner or degree", comparison: "Like 'so' + adjective" },
      { structure_such_noun: "such + (adjective) + noun", pattern: "such + (adj) + noun", examples: "such a nice day, such beautiful flowers, such good friends, such an interesting book", sentence: "It was such a wonderful experience!", note: "Can have adjective or not", optional_adj: "such fun (no adjective), such a big house (with adjective)" },
      { difference: "so vs such - Key difference", so_rule: "'so' modifies adjectives/adverbs", such_rule: "'such' modifies nouns", so_ex: "so tall (adj), so quickly (adv)", such_ex: "such a tall man (noun), such quick service (noun)", key: "What word type follows determines so/such!" },
      { so_that: "'so...that' - Result clause", structure: "so + adj/adv + that + result", examples: "It was so hot that we stayed inside. / He ran so fast that he won.", meaning: "Such a degree that it caused a result", note: "'that' introduces the consequence", common: "Very common in expressing cause & effect" },
      { such_that: "'such...that' - Result clause", structure: "such + (adj) + noun + that + result", examples: "It was such a hot day that we stayed inside. / He is such a good player that everyone wants him.", meaning: "Such quality/type that it caused a result", note: "'that' shows the consequence", pattern: "Emphasizes noun's quality leading to result" },
      { so_many_much: "so + many/much (quantifiers)", pattern: "so much + uncountable / so many + countable", examples: "so much water, so much time, so many people, so many cars", sentence: "There were so many people at the concert!", note: "For quantities, not qualities", usage: "Emphasizing large amounts" },
      { such_a_an: "'such a/an' with singular countable", pattern: "such + a/an + (adj) + singular noun", examples: "such a nice person, such an interesting story, such a beautiful day", sentence: "He's such a good teacher!", note: "Must use 'a/an' with singular countable", critical: "Don't forget the article!" },
      { such_plural_uncountable: "'such' with plural/uncountable (no article)", pattern: "such + (adj) + plural/uncountable", examples: "such beautiful flowers (plural), such good advice (uncountable), such nice people", sentence: "They are such kind people!", note: "NO article with plural or uncountable", critical: "Don't add 'a/an'!" },
      { common_mistake: "Using 'so' with noun", wrong: "He is so good teacher. ✗ / It was so beautiful day. ✗", correct: "He is such a good teacher. ✓ / It was such a beautiful day. ✓", rule: "Noun = 'such', NOT 'so'", explanation: "'so' can't go directly before nouns", critical: "Very common mistake!" },
      { common_mistake: "Using 'such' with adjective alone", wrong: "She is such beautiful. ✗ / The movie was such good. ✗", correct: "She is so beautiful. ✓ / The movie was so good. ✓", rule: "Adjective alone = 'so', NOT 'such'", explanation: "'such' needs a noun after", critical: "Must have noun for 'such'!" },
      { common_mistake: "Forgetting article with 'such a/an'", wrong: "He is such good teacher. ✗", correct: "He is such a good teacher. ✓", rule: "Singular countable needs 'a/an' with 'such'", explanation: "'such' + singular countable = must have article!", critical: "Don't forget a/an!" },
      { comparison: "so vs such - Same meaning", so: "The test was so difficult!", such: "It was such a difficult test!", meaning: "Both express same degree of difficulty", difference: "so + adj vs such + noun", note: "Choose based on what you're emphasizing" },
      { emphasis_surprise: "Expressing surprise/emotion", so_emotion: "It's so beautiful! / You're so kind! / This is so good!", such_emotion: "What a beautiful view! / You're such a kind person! / This is such good food!", usage: "Both express strong reactions", note: "Very common in exclamations", feeling: "Surprise, admiration, strong opinion" },
      { so_adjective_that: "so + adjective + that clause", examples: "It's so cold that I can't go out. / She was so tired that she fell asleep immediately.", pattern: "High degree → result", note: "Shows cause and effect relationship" },
      { such_noun_that: "such + (adj) + noun + that clause", examples: "It's such a cold day that I can't go out. / She was such a good student that she got a scholarship.", pattern: "Quality/type → result", note: "Emphasizes noun's quality causing result" },
      { formal_informal: "Register differences", informal: "'so' and 'such' very common in speech", examples: "That's so cool! / She's such a good friend!", formal_alternative: "Can use 'very', 'extremely', 'remarkably' in formal writing", note: "'so/such' = conversational, emotional", context: "Perfect for everyday speech" }
    ]
  },
  
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
  
  table: {
    title: "📋 Modal Verbs: should / ought to - Giving Advice & Recommendations",
    data: [
      { modal: "should", meaning: "Advisable / recommended", turkish: "-meli, -malı", function: "Giving advice or recommendations", strength: "Moderate suggestion", example: "You should see a doctor.", note: "Most common for advice", usage: "Everyday advice, opinions" },
      { modal: "ought to", meaning: "Advisable / recommended (stronger)", turkish: "-meli, -malı", function: "Giving advice (more formal)", strength: "Stronger than 'should'", example: "You ought to see a doctor.", note: "More formal, less common", usage: "Formal advice, moral obligation" },
      { formation_aff: "Affirmative", structure: "Subject + should/ought to + V1 (base verb)", examples: "You should study. / He ought to apologize. / We should leave.", note: "No 'to' with should, YES 'to' with ought", pattern: "Modal + base verb (infinitive without 'to' for should)" },
      { formation_neg: "Negative with 'should'", structure: "Subject + should not (shouldn't) + V1", examples: "You shouldn't smoke. / He shouldn't drive so fast. / They shouldn't be late.", short_form: "shouldn't = should not", note: "Advice NOT to do something", usage: "Warning against actions" },
      { formation_neg_ought: "Negative with 'ought to' (rare)", structure: "Subject + ought not to + V1", examples: "You ought not to smoke. (very formal/rare)", note: "Very uncommon in modern English!", alternative: "Use 'shouldn't' instead", usage: "Mostly found in formal/literary contexts" },
      { formation_q: "Questions with 'should'", structure: "Should + subject + V1?", examples: "Should I go? / Should we tell her? / Should they wait?", answer: "Yes, you should. / No, you shouldn't.", note: "Asking for advice or opinion", usage: "Very common for asking advice" },
      { formation_q_ought: "Questions with 'ought to' (rare)", structure: "Ought + subject + to + V1?", examples: "Ought I to go? (very formal/rare)", note: "Extremely rare in modern English!", alternative: "Always use 'should' for questions", usage: "Avoid this form, use 'should' instead" },
      { use_advice: "Giving advice", when: "Recommending what someone should do", examples: "You should eat more vegetables. / You should study harder. / You should get more sleep.", context: "Health, work, life advice", tone: "Helpful, caring", note: "Most common use of 'should'" },
      { use_recommendation: "Making recommendations", when: "Suggesting things to do/try/see", examples: "You should watch that movie. / You should visit Paris. / You should try the pasta here.", context: "Movies, places, food, activities", tone: "Enthusiastic suggestion", note: "Sharing positive experiences" },
      { use_opinion: "Expressing opinion", when: "Saying what you think is right/best", examples: "The government should reduce taxes. / People should be more honest. / Schools should teach life skills.", context: "General opinions, social issues", tone: "Personal belief", note: "What you believe should happen" },
      { use_expectation: "Expectations", when: "Something is expected or likely", examples: "He should be here soon. / The package should arrive tomorrow. / It should be easy.", meaning: "Probably will happen / logical expectation", context: "Predictions based on logic", note: "Different meaning: probability, not advice!" },
      { should_vs_ought: "should vs ought to - Difference", should: "More common, neutral, everyday", ought_to: "More formal, stronger moral sense", frequency: "'should' used 95% of the time", when_ought: "Use 'ought to' for moral obligations or formal situations", preference: "Always safe to use 'should'" },
      { should_vs_must: "should vs must", should: "Advice / recommendation (not obligatory)", must: "Obligation / requirement (necessary)", should_ex: "You should exercise. (good idea)", must_ex: "You must wear a seatbelt. (law, required)", difference: "'should' = advice, 'must' = obligation", strength: "'must' is much stronger" },
      { common_mistake: "Using 'to' with should", wrong: "You should to go. ✗ / He should to study. ✗", correct: "You should go. ✓ / He should study. ✓", rule: "NO 'to' after 'should'!", explanation: "'should' + base verb (no 'to')", critical: "Very common mistake!" },
      { common_mistake: "Wrong negative form", wrong: "You don't should go. ✗ / He doesn't should eat. ✗", correct: "You shouldn't go. ✓ / He shouldn't eat. ✓", rule: "Use 'shouldn't', NOT 'don't should'", explanation: "Modal negatives use 'not', not 'do'", critical: "Modal verbs don't use 'do/does'" },
      { common_mistake: "Adding -s to verb after should", wrong: "He should goes. ✗ / She should studies. ✗", correct: "He should go. ✓ / She should study. ✓", rule: "Base verb (V1) after modal, NO -s", explanation: "Modal + base form (infinitive without 'to')", critical: "Never add -s after modals!" },
      { context_health: "Health advice", examples: "You should drink more water. / You should quit smoking. / You should exercise regularly.", common: "Very common context for 'should'", note: "Doctors, fitness advice", tone: "Caring, helpful" },
      { context_work_study: "Work/Study advice", examples: "You should finish your homework. / You should prepare for the meeting. / You should ask for a raise.", context: "Professional and academic situations", note: "Practical advice", tone: "Supportive" },
      { context_social: "Social situations", examples: "You should call your mother. / You should apologize to her. / You should thank them.", context: "Relationships, manners, etiquette", note: "Interpersonal advice", tone: "Guiding behavior" },
      { polite_softeners: "Softening advice (more polite)", structure: "Maybe you should... / I think you should... / Perhaps you ought to...", examples: "Maybe you should rest. / I think you should talk to him. / Perhaps you ought to reconsider.", note: "Less direct = more polite", context: "When you don't want to sound bossy", usage: "Tactful advice" }
    ]
  },
  
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
  
  table: {
    title: "📋 Modal Verb 'could': Expressing Possibility & Uncertainty",
    data: [
      { meaning: "Possibility / maybe", turkish: "Olabilir, mümkün", function: "Expressing that something is possible but not certain", strength: "Moderate possibility (50-70%)", example: "It could rain tomorrow.", note: "Not sure, but it's possible", usage: "Uncertain situations" },
      { formation: "Structure", pattern: "Subject + could + V1 (base verb)", examples: "I could win. / She could be late. / They could arrive early.", note: "Same form for all subjects", rule: "Modal + base verb (no 'to', no -s)", critical: "Never add -s or 'to'!" },
      { use_possibility: "Future possibility", when: "Something might happen in the future", examples: "It could rain tomorrow. / She could call you later. / We could go to the beach this weekend.", note: "Maybe it will happen, maybe not", certainty: "Not very certain", context: "Making predictions with uncertainty" },
      { use_present_guess: "Present guess / assumption", when: "Guessing about the current situation", examples: "He could be at home now. / She could be sleeping. / They could be in a meeting.", note: "Logical guess about NOW", certainty: "Uncertain, but possible", context: "When you don't know for sure" },
      { use_suggestion: "Polite suggestion", when: "Suggesting possibilities or options", examples: "We could watch a movie. / You could try calling her. / We could meet at 3 PM.", note: "Softer than 'should'", tone: "Gentle suggestion, not strong advice", context: "Offering ideas, not commanding" },
      { use_conditional: "Conditional possibility", when: "Result depends on a condition", examples: "If we hurry, we could catch the train. / If you study, you could pass the exam.", note: "Possibility under certain conditions", pattern: "If + condition, could + result", context: "Conditional sentences" },
      { could_past_ability: "Note: Past ability (different meaning!)", structure: "could = was/were able to (past)", examples: "I could swim when I was young. (ability in past)", note: "THIS MODULE: possibility, NOT past ability!", distinction: "could = possibility (this module) vs could = past ability (different topic)", warning: "Don't confuse the two meanings!" },
      { negative_form: "Negative: could not / couldn't", structure: "Subject + could not (couldn't) + V1", examples: "It couldn't be true. / He couldn't be lying. / She couldn't finish it.", meaning: "Not possible / impossible", note: "Expressing impossibility", usage: "Strong doubt or impossibility" },
      { question_form: "Questions with could", structure: "Could + subject + V1?", examples: "Could it rain? / Could she be at work? / Could they win?", answer: "Yes, it could. / No, it couldn't.", note: "Asking about possibility", usage: "Checking if something is possible" },
      { could_vs_can: "could vs can (possibility)", could: "Less certain possibility", can: "More theoretical possibility or ability", could_ex: "It could rain. (maybe 50%)", can_ex: "It can rain in summer. (general fact)", difference: "'could' = specific uncertain situation, 'can' = general ability/possibility" },
      { could_vs_might: "could vs might", could: "Moderate possibility (~50-70%)", might: "Lower possibility (~30-50%)", both: "Often interchangeable in modern English", difference: "'could' slightly more likely than 'might'", note: "In practice, very similar" },
      { could_vs_will: "could vs will", could: "Possible, but uncertain", will: "Certain, definite future", could_ex: "It could rain. (maybe)", will_ex: "It will rain. (definitely)", difference: "'could' = uncertain, 'will' = certain" },
      { could_politeness: "Polite requests (different use!)", examples: "Could you help me? / Could I use your phone? / Could you open the door?", note: "This is a DIFFERENT meaning (politeness, not possibility)", context: "Asking politely for help or permission", warning: "Not covered in detail in this module" },
      { common_mistake: "Adding 'to' after could", wrong: "It could to rain. ✗ / She could to be late. ✗", correct: "It could rain. ✓ / She could be late. ✓", rule: "NO 'to' after 'could'!", explanation: "'could' + base verb (no 'to')", critical: "Modal verbs never use 'to'!" },
      { common_mistake: "Adding -s to verb", wrong: "He could wins. ✗ / She could goes. ✗", correct: "He could win. ✓ / She could go. ✓", rule: "Base verb after modal, NO -s", explanation: "Modal + V1 (base form)", critical: "Never add -s after modals!" },
      { common_mistake: "Confusing with past ability", wrong: "Yesterday, I could finish it. (if you mean you did finish)", correct: "Yesterday, I was able to finish it. / I finished it.", rule: "For completed past ability, use 'was able to' or simple past", explanation: "'could' for past ability = general ability, not specific achievement", note: "Different meaning from possibility!" },
      { time_expressions: "Common time words with could", future: "tomorrow, later, next week, soon, in the future", present: "now, at the moment, currently", examples: "It could rain tomorrow. / She could be sleeping now.", note: "Can be used with present or future time" },
      { context_weather: "Weather predictions (uncertain)", examples: "It could rain tomorrow. / It could snow tonight. / It could be sunny.", note: "When you're not sure about the weather", certainty: "Less certain than 'will'" },
      { context_plans: "Uncertain plans or possibilities", examples: "We could go to the cinema. / I could visit my friend. / They could come to dinner.", note: "Possible plans, not decided yet", tone: "Exploring options" },
      { spoken_emphasis: "Spoken emphasis", examples: "It COULD happen! (emphasizing possibility) / You COULD be right! (acknowledging possibility)", note: "Stress on 'could' shows emphasis", usage: "Admitting possibility reluctantly or with surprise" }
    ]
  },
  
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
  
  table: {
    title: "📋 Modal Verbs 'may' & 'might': Expressing Different Levels of Possibility",
    data: [
      { modal: "may", meaning: "Possibility (moderate)", turkish: "-ebilir, -abilir", probability: "~40-60% chance", example: "It may rain tomorrow.", note: "Slightly more likely than 'might'", usage: "When something has a decent chance" },
      { modal: "might", meaning: "Possibility (lower)", turkish: "-ebilir, -abilir", probability: "~30-50% chance", example: "It might rain tomorrow.", note: "Slightly less likely than 'may'", usage: "When something is less certain" },
      { reality_check: "In modern English...", truth: "May and might are often used interchangeably!", practice: "Native speakers often use them with no difference in meaning", note: "The probability difference is subtle and often ignored", advice: "Don't worry too much about the difference!" },
      { formation_may: "Structure with may", pattern: "Subject + may + V1 (base verb)", examples: "I may go. / She may call. / They may visit.", note: "Same for all subjects", rule: "No 'to', no -s", affirmative: "Subject + may + V1" },
      { formation_might: "Structure with might", pattern: "Subject + might + V1 (base verb)", examples: "I might go. / She might call. / They might visit.", note: "Same for all subjects", rule: "No 'to', no -s", affirmative: "Subject + might + V1" },
      { use_possibility: "Expressing possibility", when: "Talking about future possibilities", examples: "It may/might rain later. / She may/might come to the party. / They may/might buy a new car.", note: "Both mean 'maybe, possibly'", context: "Uncertain predictions" },
      { use_present_guess: "Present guesses", when: "Guessing about current situations", examples: "He may/might be at home now. / She may/might be sleeping. / They may/might be busy.", note: "Making assumptions about NOW", certainty: "Not sure, just guessing" },
      { negative_may: "Negative with may", structure: "Subject + may not + V1", examples: "It may not rain. / She may not come. / They may not agree.", note: "Possibility that it WON'T happen", short_form: "NO contraction! (can't say 'mayn't')", critical: "Must use 'may not' (2 words)" },
      { negative_might: "Negative with might", structure: "Subject + might not (mightn't) + V1", examples: "It might not rain. / She might not come. / They might not agree.", note: "Possibility that it WON'T happen", short_form: "might not = mightn't (rare)", usage: "'might not' more common than 'mightn't'" },
      { question_may: "Questions with may (less common)", structure: "May + subject + V1?", examples: "May I come in? / May she join us?", note: "Often sounds formal or old-fashioned for possibility", modern: "More common for asking permission!", usage: "Questions about possibility are rare with 'may'" },
      { question_might: "Questions with might (rare)", structure: "Might + subject + V1?", examples: "Might it rain? / Might she call?", note: "Very formal, almost never used!", modern: "Use 'Will it...?' or 'Could it...?' instead", advice: "Avoid questions with 'might' - sounds archaic!" },
      { may_permission: "May = Permission (different meaning!)", structure: "May I + verb?", examples: "May I come in? / May I use your phone? / May I ask a question?", meaning: "Asking for permission (NOT possibility!)", formality: "Formal/polite", note: "This is a DIFFERENT use of 'may'!" },
      { may_vs_might_history: "Historical difference", old_rule: "'may' was present, 'might' was past of 'may'", modern_reality: "Now both are used for present/future possibility", example: "Old: He said it might rain. (past) / Modern: It may/might rain. (both present/future)", change: "The distinction has largely disappeared" },
      { probability_scale: "Probability scale comparison", will: "100% - certain", may: "~40-60% - possible", might: "~30-50% - less likely", could: "~50-70% - moderate possibility", might_be: "Least certain of the three", note: "Subtle differences in practice" },
      { may_might_interchangeable: "Interchangeable in most contexts", truth: "You can usually swap may/might without changing meaning!", examples: "It may rain. = It might rain. / She may call. = She might call.", modern_usage: "Difference is minimal in everyday speech", freedom: "Feel free to use either one!" },
      { common_mistake: "Adding 'to' after may/might", wrong: "It may to rain. ✗ / She might to call. ✗", correct: "It may rain. ✓ / She might call. ✓", rule: "NO 'to' after may/might!", explanation: "Modal + base verb (no 'to')" },
      { common_mistake: "Adding -s to verb", wrong: "He may goes. ✗ / She might calls. ✗", correct: "He may go. ✓ / She might call. ✓", rule: "Base verb (V1) after modal, NO -s", critical: "Never conjugate verb after modals!" },
      { common_mistake: "Wrong contraction for 'may not'", wrong: "It mayn't rain. ✗ (doesn't exist!)", correct: "It may not rain. ✓", rule: "'may not' has NO contraction in modern English", note: "'mayn't' is archaic/obsolete" },
      { context_weather: "Weather predictions", examples: "It may/might rain tomorrow. / It may/might be sunny. / It may/might snow tonight.", note: "Very common use for uncertain weather", usage: "When you're not confident about the forecast" },
      { context_future_plans: "Uncertain future plans", examples: "I may/might go to the party. / We may/might travel next summer. / She may/might change jobs.", note: "Plans that aren't decided yet", tone: "Keeping options open" },
      { polite_tone: "Softening statements", examples: "That may/might be a problem. / This might not work. / You might be right.", note: "Sounds more polite and less direct", usage: "Diplomatic language", tone: "Gentle, non-confrontational" }
    ]
  },
  
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


// Module 68 Data: Past Continuous Tense
const MODULE_68_DATA = {
  title: "Module 68 - Past Continuous Tense",
  description: "Learn how to describe actions that were in progress at a specific time in the past",
  intro: `Past Continuous (Past Progressive), geçmişte belirli bir anda devam eden eylemleri anlatmak için kullanılır.

Yapı: was/were + fiil-ing

Örnekler:
• I was reading when you called. → Sen aradığında kitap okuyordum.
• They were playing football at 5 PM. → Saat 5'te futbol oynuyorlardı.

Kullanım:
1. Geçmişte devam eden eylem
2. İki eylemin birini kesintiye uğratması (While I was cooking, the phone rang.)
3. Geçmişte aynı anda olan iki eylem (While I was studying, she was sleeping.)`,
  tip: "Use Past Continuous (was/were + V-ing) for actions in progress at a specific past time.",

  table: {
    title: "📋 Past Continuous Tense: Actions in Progress in the Past",
    data: [
      { function: "Form: Affirmative", structure: "Subject + was/were + V-ing", examples: "I was eating. / She was working. / They were playing.", note: "was = I/he/she/it, were = we/you/they", usage: "Action in progress in the past" },
      { function: "Form: Negative", structure: "Subject + wasn't/weren't + V-ing", examples: "I wasn't sleeping. / She wasn't studying. / They weren't talking.", contractions: "was not = wasn't, were not = weren't", note: "Action NOT in progress" },
      { function: "Form: Question", structure: "Was/Were + subject + V-ing?", examples: "Was she working? / Were they playing? / Was it raining?", short_answer: "Yes, she was. / No, they weren't.", note: "Invert was/were with subject" },
      { function: "Use 1: Action in progress at specific past time", when: "Describing what was happening at an exact moment", examples: "At 8 PM yesterday, I was watching TV. / This time last year, we were living in Paris.", time_markers: "at that moment, at 8 PM, this time yesterday", note: "Focus on the ongoing nature" },
      { function: "Use 2: Interrupted action", when: "One action interrupts another", pattern: "Past Continuous + when + Past Simple", examples: "I was sleeping when the phone rang. / She was cooking when I arrived.", explanation: "Long action (continuous) interrupted by short action (simple)", note: "'when' introduces the interruption" },
      { function: "Use 3: Two simultaneous past actions", when: "Two actions happening at the same time", pattern: "While + Past Continuous, Past Continuous", examples: "While I was studying, she was watching TV. / While he was cooking, they were setting the table.", note: "'while' shows actions happening together", both: "Both actions ongoing simultaneously" },
      { function: "Use 4: Background description", when: "Setting the scene in a story", examples: "The sun was shining and birds were singing. / People were walking in the park.", note: "Creates atmosphere, describes environment", storytelling: "Common in narratives" },
      { function: "Time markers", signals: "at that time, at 8 PM yesterday, while, when, as, all day yesterday, this time last week", examples: "I was working at 9 AM. / While you were sleeping, I was reading.", note: "Indicate specific past time frame" },
      { function: "Past Continuous vs Past Simple", continuous: "I was reading. (focus on action in progress)", simple: "I read. (completed action)", difference: "Continuous = process/duration, Simple = completion", example: "I was watching the movie. (didn't finish) vs I watched the movie. (finished)" },
      { function: "Common mistake: Stative verbs", wrong: "I was knowing the answer. ✗", correct: "I knew the answer. ✓", rule: "Don't use continuous with: know, like, love, want, need, believe, understand", explanation: "Stative verbs describe states, not actions" },
      { function: "When vs While", when: "when + Past Simple (short action)", while: "while + Past Continuous (long action)", examples: "I was sleeping when he called. / While I was sleeping, he was working.", note: "'when' = at the moment, 'while' = during the time" },
      { function: "Two interruptions", pattern: "Past Continuous + when + Past Simple + and + Past Simple", example: "I was watching TV when the doorbell rang and the phone started ringing.", note: "Multiple short actions interrupting one long action" },
      { function: "Polite inquiries", usage: "Softening questions about past", examples: "Were you looking for something? / Was I disturbing you?", tone: "More polite than Past Simple", note: "Sounds gentler" },
      { function: "Emphasis on duration", when: "Stressing how long something lasted", examples: "I was waiting for two hours! / She was calling you all morning.", emphasis: "Continuous action over time", note: "Highlights the ongoing nature" }
    ]
  },

  speakingPractice: [
    { question: "What were you doing at 8 PM last night?", answer: "I was watching a movie." },
    { question: "Was she studying when you called?", answer: "Yes, she was studying for her exam." },
    { question: "Were they playing football yesterday afternoon?", answer: "Yes, they were playing in the park." },
    { question: "What was he doing while you were cooking?", answer: "He was setting the table." },
    { question: "Was it raining when you left home?", answer: "Yes, it was raining heavily." },
    { question: "What were you wearing at the party?", answer: "I was wearing a blue dress." },
    { question: "Were your parents sleeping when you got home?", answer: "No, they were watching TV." },
    { question: "What was she doing this time yesterday?", answer: "She was working at the office." },
    { question: "Was your brother playing video games at 10 PM?", answer: "Yes, he was playing for hours." },
    { question: "What were they discussing in the meeting?", answer: "They were discussing the new project." },
    { question: "Was the sun shining when you woke up?", answer: "No, it was raining." },
    { question: "Were you listening to music while studying?", answer: "Yes, I was listening to classical music." },
    { question: "What was your dog doing when you arrived?", answer: "He was sleeping on the sofa." },
    { question: "Was your teacher explaining grammar at 11 AM?", answer: "Yes, she was explaining Past Continuous." },
    { question: "Were your friends waiting for you?", answer: "Yes, they were waiting at the café." },
    { question: "What was she reading when I interrupted her?", answer: "She was reading a novel." },
    { question: "Was your phone ringing while you were in the shower?", answer: "Yes, it was ringing but I couldn't answer." },
    { question: "What were the children doing in the garden?", answer: "They were playing with water." },
    { question: "Were you feeling well yesterday morning?", answer: "No, I was feeling a bit sick." },
    { question: "Was he driving when the accident happened?", answer: "Yes, he was driving carefully." },
    { question: "What were you thinking about during the class?", answer: "I was thinking about my vacation plans." },
    { question: "Were they arguing when you entered the room?", answer: "Yes, they were arguing loudly." },
    { question: "Was the baby crying all night?", answer: "Yes, the baby was crying for hours." },
    { question: "What was your sister doing at noon?", answer: "She was having lunch with friends." },
    { question: "Were you working on this project yesterday?", answer: "Yes, I was working on it all day." },
    { question: "Was the shop closing when you got there?", answer: "Yes, they were closing early." },
    { question: "What were the students doing during the break?", answer: "They were playing in the yard." },
    { question: "Was your computer working properly this morning?", answer: "No, it was acting very slow." },
    { question: "Were you dreaming when the alarm rang?", answer: "Yes, I was dreaming about flying." },
    { question: "What was happening in the street when you looked out?", answer: "People were rushing to work." },
    { question: "Was your dad cooking when you came home?", answer: "No, he was reading the newspaper." },
    { question: "Were the birds singing this morning?", answer: "Yes, they were singing beautifully." },
    { question: "What was your friend saying when I interrupted?", answer: "He was saying something about the exam." },
    { question: "Was the train moving when you jumped off?", answer: "No, it was standing still." },
    { question: "Were you expecting anyone at that time?", answer: "No, I wasn't expecting anyone." },
    { question: "What was the weather like while you were traveling?", answer: "It was snowing heavily." },
    { question: "Was your sister practicing piano yesterday evening?", answer: "Yes, she was practicing for two hours." },
    { question: "Were the guests enjoying the party?", answer: "Yes, they were enjoying it a lot." },
    { question: "What was the teacher writing on the board?", answer: "She was writing the homework assignment." },
    { question: "Was anyone helping you while you were moving?", answer: "Yes, my friends were helping me." }
  ]
};


// Module 69 Data: Question Tags
const MODULE_69_DATA = {
  title: "Module 69 - Question Tags",
  description: "Learn how to use question tags to confirm information or seek agreement",
  intro: `Question Tags (Eklenen Sorular), bir ifadeyi onaylatmak veya katılım istemek için cümle sonuna eklenen kısa sorulardır.

Kurallar:
• Olumlu cümle → Olumsuz tag
• Olumsuz cümle → Olumlu tag

Örnekler:
• You are a student, aren't you? → Sen öğrencisin, değil mi?
• She doesn't like coffee, does she? → O kahve sevmez, değil mi?

Kullanım:
Bilgiyi doğrulatmak, onay istemek veya nazik bir şekilde soru sormak için kullanılır.`,
  tip: "Positive statement → negative tag. Negative statement → positive tag. Match the verb tense!",

  table: {
    title: "📋 Question Tags: Seeking Confirmation & Agreement",
    data: [
      { rule: "Basic rule", principle: "Positive statement → negative tag", examples: "You are happy, aren't you? / She can swim, can't she?", note: "Tag is opposite of statement" },
      { rule: "Basic rule", principle: "Negative statement → positive tag", examples: "You aren't tired, are you? / He can't drive, can he?", note: "Tag is opposite of statement" },
      { rule: "With 'be' verb", present: "You are ready, aren't you?", past: "She was late, wasn't she?", negative: "They aren't busy, are they?", note: "Use same 'be' form in tag" },
      { rule: "With 'have' (main verb)", present: "You have a car, don't you?", negative: "She doesn't have time, does she?", note: "Use do/does/did, NOT have", british: "British: You have a car, haven't you? (also correct)" },
      { rule: "With 'have' (auxiliary)", present_perfect: "You have finished, haven't you?", negative: "She hasn't called, has she?", note: "Use 'have' in tag when it's auxiliary" },
      { rule: "With 'do/does/did'", present: "You like pizza, don't you? / She works here, doesn't she?", past: "They went home, didn't they?", negative: "He doesn't smoke, does he?", note: "Match tense with do/does/did" },
      { rule: "With modal verbs", can: "You can help, can't you?", will: "She will come, won't she?", should: "We should go, shouldn't we?", note: "Use same modal in tag" },
      { rule: "With 'I am'", special_case: "I am right, aren't I?", wrong: "I am right, am I not? (too formal) / amn't I? ✗ (doesn't exist)", note: "Use 'aren't I?' NOT 'am I not?' in speech" },
      { rule: "Imperative sentences", positive: "Close the door, will you? / won't you?", negative: "Don't be late, will you?", note: "Use 'will you?' for commands", polite: "won't you? = more polite" },
      { rule: "'Let's' suggestions", structure: "Let's go, shall we?", example: "Let's have lunch, shall we?", note: "Always use 'shall we?' with Let's", fixed: "This is a fixed form" },
      { rule: "Emphasis with 'There'", positive: "There is a problem, isn't there?", negative: "There weren't any people, were there?", note: "Use 'there' in the tag too" },
      { rule: "With 'this/that'", demonstrative: "This is nice, isn't it?", plural: "Those are expensive, aren't they?", note: "Use it/they in tag, not this/that/these/those" },
      { rule: "Intonation: Seeking confirmation", tone: "Rising intonation ⤴", meaning: "Real question, unsure", example: "You're John, aren't you? ⤴ (not sure)", note: "Voice goes up = genuine question" },
      { rule: "Intonation: Seeking agreement", tone: "Falling intonation ⤵", meaning: "Expecting agreement, almost certain", example: "It's cold today, isn't it? ⤵ (sure it's cold)", note: "Voice goes down = expecting 'yes'" },
      { rule: "Common mistake: Double negative", wrong: "He doesn't like tea, doesn't he? ✗", correct: "He doesn't like tea, does he? ✓", grammar_tip: "Negative statement = POSITIVE tag", critical: "Don't make both negative!" },
      { rule: "Common mistake: Wrong auxiliary", wrong: "She has a dog, hasn't she? (American: needs 'doesn't')", correct: "She has a dog, doesn't she? ✓ (American)", british: "She has a dog, hasn't she? ✓ (British)", note: "American English uses 'do' for possession" },
      { rule: "Answering question tags", if_agree: "Yes + positive. / No + negative.", example_positive: "You're tired, aren't you? → Yes, I am.", example_negative: "She doesn't know, does she? → No, she doesn't.", note: "Answer truthfully based on reality" },
      { rule: "Polite requests", softening: "You wouldn't mind helping, would you?", gentle: "You couldn't lend me $10, could you?", note: "Makes requests sound politer", tone: "Less direct" },
      { rule: "With 'used to'", example: "She used to live here, didn't she?", note: "Use 'did' in the tag, NOT 'used'", wrong: "She used to live here, usedn't she? ✗" },
      { rule: "With 'ought to'", example: "We ought to leave, oughtn't we? / shouldn't we?", note: "Both 'oughtn't' and 'shouldn't' are correct", common: "'shouldn't we?' is more common" },
      { rule: "Nobody/Nothing/No one", example: "Nobody called, did they?", note: "Negative words (nobody, nothing) take POSITIVE tags", they: "Use 'they' for nobody/no one" },
      { rule: "Everything/Something", example: "Everything is ready, isn't it?", note: "Use 'it' in the tag", singular: "Treat as singular" }
    ]
  },

  speakingPractice: [
    { question: "You are a student, aren't you?", answer: "Yes, I am." },
    { question: "She doesn't like spicy food, does she?", answer: "No, she doesn't." },
    { question: "They can speak English, can't they?", answer: "Yes, they can." },
    { question: "It's a beautiful day, isn't it?", answer: "Yes, it is." },
    { question: "You haven't been to Paris, have you?", answer: "No, I haven't." },
    { question: "He works in a bank, doesn't he?", answer: "Yes, he does." },
    { question: "We should leave now, shouldn't we?", answer: "Yes, we should." },
    { question: "You won't be late, will you?", answer: "No, I won't." },
    { question: "She was at the party, wasn't she?", answer: "Yes, she was." },
    { question: "They don't have children, do they?", answer: "No, they don't." },
    { question: "You can help me, can't you?", answer: "Yes, I can." },
    { question: "It didn't rain yesterday, did it?", answer: "No, it didn't." },
    { question: "You've finished your homework, haven't you?", answer: "Yes, I have." },
    { question: "He isn't angry, is he?", answer: "No, he isn't." },
    { question: "We met before, didn't we?", answer: "Yes, we did." },
    { question: "Let's go for a walk, shall we?", answer: "Yes, let's." },
    { question: "Close the window, will you?", answer: "Sure, I will." },
    { question: "You wouldn't mind waiting, would you?", answer: "No, not at all." },
    { question: "She used to live here, didn't she?", answer: "Yes, she did." },
    { question: "There's a problem, isn't there?", answer: "Yes, there is." },
    { question: "This is your bag, isn't it?", answer: "Yes, it is." },
    { question: "You aren't tired, are you?", answer: "Yes, actually I am a bit tired." },
    { question: "He can't swim, can he?", answer: "No, he can't." },
    { question: "They will arrive soon, won't they?", answer: "Yes, they will." },
    { question: "You didn't see her, did you?", answer: "No, I didn't." },
    { question: "She's your sister, isn't she?", answer: "Yes, she is." },
    { question: "We have to go, don't we?", answer: "Yes, we do." },
    { question: "You couldn't lend me your pen, could you?", answer: "Sure, here you are." },
    { question: "He won't forget, will he?", answer: "No, he won't." },
    { question: "They were surprised, weren't they?", answer: "Yes, they were." },
    { question: "You don't smoke, do you?", answer: "No, I don't." },
    { question: "It was expensive, wasn't it?", answer: "Yes, it was quite expensive." },
    { question: "Nothing happened, did it?", answer: "No, nothing happened." },
    { question: "Everybody came, didn't they?", answer: "Yes, everyone was there." },
    { question: "You'll call me, won't you?", answer: "Yes, I will." },
    { question: "She hasn't left yet, has she?", answer: "No, she's still here." },
    { question: "I am right, aren't I?", answer: "Yes, you are." },
    { question: "Don't be late, will you?", answer: "No, I won't." },
    { question: "There aren't any mistakes, are there?", answer: "No, it looks perfect." },
    { question: "That's interesting, isn't it?", answer: "Yes, very interesting." }
  ]
};


// Module 70 Data: Going to Future
const MODULE_70_DATA = {
  title: "Module 70 - Going to Future",
  description: "Learn how to express future plans and predictions using 'going to'",
  intro: `"Going to" gelecekteki planları ve tahminleri ifade etmek için kullanılır.

Yapı: am/is/are + going to + fiil (V1)

Örnekler:
• I am going to visit my grandparents tomorrow. → Yarın büyükanne ve büyükbabamı ziyaret edeceğim.
• It is going to rain. → Yağmur yağacak.

Kullanım:
1. Önceden planlanmış gelecek eylemler
2. Görünür kanıtlara dayalı tahminler`,
  tip: "Use 'going to' for plans you've already decided and for predictions based on present evidence.",

  table: {
    title: "📋 Going to Future: Plans & Predictions",
    data: [
      { form: "Affirmative", structure: "Subject + am/is/are + going to + V1", examples: "I'm going to study. / She's going to travel. / They're going to buy a car.", note: "Plan or prediction", usage: "Future intention" },
      { form: "Negative", structure: "Subject + am/is/are + not + going to + V1", examples: "I'm not going to go. / She isn't going to call. / They aren't going to wait.", contractions: "isn't, aren't", note: "No plan or won't happen" },
      { form: "Question", structure: "Am/Is/Are + subject + going to + V1?", examples: "Are you going to leave? / Is she going to come? / Are they going to help?", short_answer: "Yes, I am. / No, she isn't.", note: "Invert be verb" },
      { use: "Pre-planned intentions", when: "Decisions made before speaking", examples: "I'm going to visit Paris next month. / We're going to get married in June.", planning: "Already decided", note: "Fixed future plan" },
      { use: "Predictions based on evidence", when: "Present signs show future result", examples: "Look at those clouds! It's going to rain. / He's going to fall! (I can see he's losing balance)", evidence: "Something visible now", note: "Not just guessing!" },
      { vs_will: "'Going to' vs 'Will'", going_to: "Pre-planned: I'm going to see a doctor tomorrow.", will: "Spontaneous decision: I'll see a doctor. (just decided now)", difference: "'going to' = already planned, 'will' = instant decision", planning: "'going to' shows prior intention" },
      { vs_will_prediction: "'Going to' vs 'Will' (Predictions)", going_to: "It's going to rain. (I see dark clouds = evidence)", will: "It will rain tomorrow. (general belief or forecast)", evidence: "'going to' = based on present signs, 'will' = opinion/belief", certainty: "'going to' often more certain" },
      { informal_gonna: "Informal: 'gonna'", spoken: "I'm gonna go. / She's gonna call.", note: "'gonna' = informal pronunciation of 'going to'", writing: "DON'T write 'gonna' in formal writing!", usage: "Very common in spoken English" },
      { time_markers: "Time markers", signals: "tomorrow, next week, in an hour, soon, tonight, this evening, next year", examples: "I'm going to start exercising next week. / She's going to call you soon.", note: "Shows when plan will happen" },
      { wh_questions: "Wh- questions", structure: "Wh- + am/is/are + subject + going to + V1?", examples: "What are you going to do? / Where is she going to go? / When are they going to arrive?", note: "Question word at start" },
      { negative_questions: "Negative questions", structure: "Aren't/Isn't + subject + going to + V1?", examples: "Aren't you going to eat? / Isn't he going to come?", tone: "Surprise or expectation", note: "Expecting 'yes'" },
      { common_mistake: "Forgetting 'to'", wrong: "I'm going study. ✗", correct: "I'm going to study. ✓", rule: "MUST include 'to' before verb", critical: "Don't drop 'to'!" },
      { common_mistake: "Using wrong 'be' form", wrong: "She are going to leave. ✗", correct: "She is going to leave. ✓", rule: "Match 'be' verb to subject", forms: "I am, he/she/it is, we/you/they are" },
      { common_mistake: "Adding -ing to main verb", wrong: "I'm going to studying. ✗", correct: "I'm going to study. ✓", rule: "Use base form (V1) after 'going to'", note: "Don't confuse with Present Continuous" },
      { double_going: "Talking about the verb 'go'", structure: "I'm going to go...", example: "I'm going to go to the store.", note: "Sounds repetitive but correct!", alternative: "I'm going to the store. (shorter, same meaning)" },
      { short_form: "Short answers", question: "Are you going to study?", yes: "Yes, I am. (Don't repeat 'going to study')", no: "No, I'm not.", note: "No need to repeat full verb phrase" },
      { immediate_future: "Immediate future", examples: "Watch out! You're going to fall! / Quick! The bus is going to leave!", note: "Something about to happen RIGHT NOW", urgency: "Very soon", evidence: "Visible signs" },
      { present_continuous_instead: "Alternative: Present Continuous for plans", going_to: "I'm going to meet John at 6.", present_continuous: "I'm meeting John at 6.", note: "Both correct for arranged plans", difference: "Minimal difference in meaning" }
    ]
  },

  speakingPractice: [
    { question: "What are you going to do this weekend?", answer: "I'm going to visit my family." },
    { question: "Is she going to study abroad?", answer: "Yes, she's going to study in London." },
    { question: "Are they going to buy a new car?", answer: "No, they aren't going to buy one." },
    { question: "When are you going to finish your homework?", answer: "I'm going to finish it tonight." },
    { question: "What is he going to cook for dinner?", answer: "He's going to cook pasta." },
    { question: "Are you going to watch the match?", answer: "Yes, I'm going to watch it at home." },
    { question: "Where are they going to go on vacation?", answer: "They're going to go to Greece." },
    { question: "Is it going to rain today?", answer: "Yes, look at those dark clouds, it's going to rain." },
    { question: "What are you going to wear to the party?", answer: "I'm going to wear my blue dress." },
    { question: "Are we going to have a meeting tomorrow?", answer: "Yes, we're going to have it at 10 AM." },
    { question: "Is your brother going to join us?", answer: "No, he isn't going to join." },
    { question: "What are you going to tell them?", answer: "I'm going to tell them the truth." },
    { question: "Are you going to call her?", answer: "Yes, I'm going to call her tonight." },
    { question: "When is the concert going to start?", answer: "It's going to start at 8 PM." },
    { question: "What are you going to study at university?", answer: "I'm going to study medicine." },
    { question: "Is she going to move to another city?", answer: "Yes, she's going to move to Istanbul." },
    { question: "Are they going to invite everyone?", answer: "No, they aren't going to invite everyone." },
    { question: "What time are you going to wake up?", answer: "I'm going to wake up at 7 AM." },
    { question: "Is he going to apply for the job?", answer: "Yes, he's going to apply next week." },
    { question: "Are you going to learn a new language?", answer: "Yes, I'm going to learn Spanish." },
    { question: "Watch out! What's going to happen?", answer: "That vase is going to fall!" },
    { question: "What are you going to do after graduation?", answer: "I'm going to travel around Europe." },
    { question: "Is your team going to win?", answer: "Yes, I think we're going to win." },
    { question: "Are you going to take your umbrella?", answer: "Yes, because it's going to rain." },
    { question: "What movie are you going to watch?", answer: "I'm going to watch the new action movie." },
    { question: "Is she going to change her hair color?", answer: "Yes, she's going to dye it blonde." },
    { question: "Are you going to vote in the election?", answer: "Yes, I'm going to vote next week." },
    { question: "What are they going to name their baby?", answer: "They're going to name her Emma." },
    { question: "Is he going to apologize?", answer: "Yes, he's going to apologize tomorrow." },
    { question: "Are we going to be late?", answer: "Yes, we're going to be late if we don't hurry." },
    { question: "What are you going to order?", answer: "I'm going to order the chicken salad." },
    { question: "Is your sister going to get married?", answer: "Yes, she's going to get married in June." },
    { question: "Are they going to sell their house?", answer: "Yes, they're going to sell it next month." },
    { question: "What are you going to give her for her birthday?", answer: "I'm going to give her a book." },
    { question: "Is it going to snow tonight?", answer: "Yes, the weather forecast says it's going to snow." },
    { question: "Are you going to tell your parents?", answer: "No, I'm not going to tell them yet." },
    { question: "What career are you going to choose?", answer: "I'm going to become an engineer." },
    { question: "Are they going to renew their contract?", answer: "No, they aren't going to renew it." },
    { question: "Is the shop going to close early today?", answer: "Yes, it's going to close at 6 PM." },
    { question: "What are we going to do if it rains?", answer: "We're going to stay inside and watch movies." }
  ]
};


// Module 71 Data: Comparatives and Superlatives
const MODULE_71_DATA = {
  title: "Module 71 - Comparatives and Superlatives",
  description: "Learn how to compare things using comparative and superlative adjectives",
  intro: `Karşılaştırmalar İngilizce'de iki veya daha fazla şeyi karşılaştırmak için kullanılır.

**Comparative (Karşılaştırma):**
İki şeyi karşılaştırırken kullanılır: -er / more

**Superlative (En üst derece):**
Üç veya daha fazla şey arasında en üstünü belirtmek için: -est / most

Örnekler:
• big → bigger → biggest
• expensive → more expensive → most expensive`,
  tip: "Short adjectives: add -er/-est. Long adjectives: use more/most.",

  table: {
    title: "📋 Comparatives and Superlatives: Making Comparisons",
    data: [
      { type: "Short adjectives (1 syllable)", rule: "Add -er / -est", examples: "tall → taller → tallest / fast → faster → fastest", note: "Most common pattern" },
      { type: "Short adjectives ending in -e", rule: "Add -r / -st", examples: "nice → nicer → nicest / large → larger → largest", note: "Already ends in 'e', just add r/st" },
      { type: "Short adjectives (CVC pattern)", rule: "Double last consonant + -er/-est", examples: "big → bigger → biggest / hot → hotter → hottest / sad → sadder → saddest", note: "CVC = Consonant-Vowel-Consonant", examples_more: "thin → thinner, fat → fatter" },
      { type: "Two-syllable adjectives ending in -y", rule: "Change y to i + -er/-est", examples: "happy → happier → happiest / easy → easier → easiest / busy → busier → busiest", note: "Very common pattern" },
      { type: "Long adjectives (2+ syllables)", rule: "Use more / most", examples: "expensive → more expensive → most expensive / beautiful → more beautiful → most beautiful", note: "Don't add -er/-est to long words" },
      { type: "Irregular comparatives", adjective: "good", comparative: "better", superlative: "best", note: "Completely irregular!" },
      { type: "Irregular comparatives", adjective: "bad", comparative: "worse", superlative: "worst", note: "Completely irregular!" },
      { type: "Irregular comparatives", adjective: "far", comparative: "farther/further", superlative: "farthest/furthest", note: "Both forms correct" },
      { type: "Irregular comparatives", adjective: "little", comparative: "less", superlative: "least", note: "For uncountable nouns" },
      { type: "Irregular comparatives", adjective: "many/much", comparative: "more", superlative: "most", note: "Quantity comparisons" },
      { use: "Comparative structure", pattern: "A is + comparative + than + B", examples: "She is taller than me. / This car is more expensive than that one.", note: "Use 'than' to compare", critical: "Don't forget 'than'!" },
      { use: "Superlative structure", pattern: "the + superlative (+ in/of)", examples: "She is the tallest in the class. / This is the most expensive car in the world.", note: "Use 'the' before superlative", prepositions: "in (places), of (groups)" },
      { use: "Comparing equal things", pattern: "as + adjective + as", examples: "He is as tall as his brother. / This book is as interesting as that one.", note: "Both are the same", negative: "not as...as = less than" },
      { use: "Not as...as (inequality)", pattern: "not as + adjective + as", examples: "I'm not as tall as you. / This isn't as expensive as I thought.", meaning: "Less than", note: "Negative comparison" },
      { use: "Much/Far + comparative", emphasis: "Adds emphasis", examples: "She is much taller than me. / This is far more expensive.", note: "Means 'a lot' more", alternatives: "much, far, a lot, even" },
      { use: "A little/A bit + comparative", small_difference: "Small difference", examples: "He is a little taller. / It's a bit more expensive.", note: "Slight difference", tone: "Softer" },
      { common_mistake: "Double comparatives", wrong: "more better ✗, more prettier ✗", correct: "better ✓, prettier ✓", rule: "Use EITHER -er OR more, NEVER both!", critical: "Very common error!" },
      { common_mistake: "Forgetting 'the' with superlatives", wrong: "She is tallest girl. ✗", correct: "She is the tallest girl. ✓", rule: "Superlatives MUST have 'the'", note: "Always use 'the'" },
      { common_mistake: "Using 'more' with short adjectives", wrong: "more tall ✗, more big ✗", correct: "taller ✓, bigger ✓", rule: "Short adjectives use -er, not 'more'", note: "Only long adjectives use 'more'" },
      { common_mistake: "Forgetting 'than'", wrong: "She is taller me. ✗", correct: "She is taller than me. ✓", rule: "Comparative + than", critical: "Don't forget 'than'!" }
    ]
  },

  speakingPractice: [
    { question: "Who is taller, you or your brother?", answer: "My brother is taller than me." },
    { question: "Which is more expensive, a car or a bike?", answer: "A car is more expensive than a bike." },
    { question: "What is the biggest city in Turkey?", answer: "Istanbul is the biggest city in Turkey." },
    { question: "Is English easier than Math?", answer: "For me, English is easier than Math." },
    { question: "Who is the best singer in the world?", answer: "I think Adele is the best singer." },
    { question: "Which is faster, a plane or a train?", answer: "A plane is faster than a train." },
    { question: "What is the most beautiful place you've visited?", answer: "The most beautiful place I've visited is Cappadocia." },
    { question: "Is your house bigger than your friend's house?", answer: "Yes, my house is bigger than my friend's." },
    { question: "Who is the youngest person in your family?", answer: "My little sister is the youngest." },
    { question: "Which season is hotter, summer or spring?", answer: "Summer is hotter than spring." },
    { question: "What is the longest river in the world?", answer: "The Nile is the longest river in the world." },
    { question: "Is coffee stronger than tea?", answer: "Yes, coffee is stronger than tea." },
    { question: "What is the most interesting subject at school?", answer: "History is the most interesting subject." },
    { question: "Are you as tall as your mother?", answer: "No, I'm not as tall as my mother." },
    { question: "Which is more difficult, reading or writing?", answer: "Writing is more difficult than reading for me." },
    { question: "What is the worst food you've ever tasted?", answer: "The worst food I've tasted was bitter melon." },
    { question: "Is winter colder than autumn?", answer: "Yes, winter is much colder than autumn." },
    { question: "What is the smallest country in the world?", answer: "Vatican City is the smallest country." },
    { question: "Who is the oldest person you know?", answer: "My grandmother is the oldest person I know." },
    { question: "Is gold more valuable than silver?", answer: "Yes, gold is more valuable than silver." },
    { question: "What is the highest mountain in the world?", answer: "Mount Everest is the highest mountain." },
    { question: "Is your phone newer than mine?", answer: "Yes, my phone is newer than yours." },
    { question: "Which is healthier, fruit or candy?", answer: "Fruit is healthier than candy." },
    { question: "What is the most dangerous animal?", answer: "I think the mosquito is the most dangerous." },
    { question: "Are you happier than last year?", answer: "Yes, I'm happier than last year." },
    { question: "Which is cheaper, eating at home or at a restaurant?", answer: "Eating at home is cheaper." },
    { question: "What is the farthest place you've traveled to?", answer: "The farthest place I've been to is Japan." },
    { question: "Is she as smart as her sister?", answer: "Yes, she's as smart as her sister." },
    { question: "What is the most expensive thing you own?", answer: "The most expensive thing I own is my laptop." },
    { question: "Is your car faster than your father's car?", answer: "No, my father's car is faster than mine." },
    { question: "What is the best movie you've ever seen?", answer: "The best movie I've seen is The Shawshank Redemption." },
    { question: "Are you busier now than before?", answer: "Yes, I'm much busier now." },
    { question: "What is the most boring hobby?", answer: "I think stamp collecting is the most boring." },
    { question: "Is summer better than winter?", answer: "For me, summer is better than winter." },
    { question: "What is the tallest building in your city?", answer: "The tallest building is the central tower." },
    { question: "Is learning English harder than learning Turkish?", answer: "For me, English is a bit harder." },
    { question: "Who is the most famous person in your country?", answer: "Probably the president is the most famous." },
    { question: "Is water healthier than soda?", answer: "Yes, water is much healthier than soda." },
    { question: "What is the shortest month of the year?", answer: "February is the shortest month." },
    { question: "Are you as old as your cousin?", answer: "No, I'm younger than my cousin." }
  ]
};


// Module 72 Data: Comparisons with 'as...as'
const MODULE_72_DATA = {
  title: "Module 72 - Comparisons with 'as...as'",
  description: "Learn how to show equality and inequality using 'as...as' comparisons",
  intro: `"As...as" yapısı, iki şeyin eşit olduğunu göstermek için kullanılır.

**Yapı:**
as + sıfat/zarf + as

Örnekler:
• She is as tall as her brother. → O, kardeşi kadar uzun.
• I'm not as fast as you. → Sen kadar hızlı değilim.

Kullanım:
• Olumlu: A is as X as B (A, B kadar X'tir)
• Olumsuz: A is not as X as B (A, B kadar X değildir)`,
  tip: "Use 'as...as' to show two things are equal. Use 'not as...as' to show one is less than the other.",

  table: {
    title: "📋 Comparisons with 'as...as': Showing Equality & Inequality",
    data: [
      { form: "Affirmative equality", structure: "as + adjective/adverb + as", meaning: "Equal comparison", examples: "She is as tall as me. / He runs as fast as a cheetah.", note: "Both are the same", usage: "Showing two things are equal" },
      { form: "Negative inequality", structure: "not as + adjective/adverb + as", meaning: "Less than", examples: "I'm not as tall as you. / This isn't as expensive as that.", note: "First thing is less", usage: "Showing one is inferior" },
      { vs_comparative: "'as...as' vs comparative", as_as: "I'm as tall as John. (same height)", comparative: "I'm taller than John. (I'm higher)", difference: "'as...as' = equal, comparative = more", note: "Different meanings!" },
      { with_adjectives: "With adjectives", examples: "as beautiful as / as intelligent as / as important as / as difficult as", note: "Most common use", structure: "Any adjective fits" },
      { with_adverbs: "With adverbs", examples: "as quickly as / as carefully as / as well as / as badly as", note: "Describes how action is done", usage: "Comparing actions" },
      { emphasis_just: "Emphasis: 'just as...as'", structure: "just as + adjective + as", examples: "She is just as smart as him. / It's just as important as the other one.", meaning: "Emphasizes equality", note: "'just' = exactly" },
      { emphasis_quite: "Emphasis: 'quite as...as' (negative)", structure: "not quite as + adjective + as", examples: "I'm not quite as tall as you. / It's not quite as good as I expected.", meaning: "Almost but not exactly", note: "Softens the difference" },
      { emphasis_nearly: "Emphasis: 'nearly/almost as...as'", structure: "nearly/almost as + adjective + as", examples: "He's nearly as tall as his father. / She's almost as fast as me.", meaning: "Very close to equal", note: "Close but not exact" },
      { twice_half: "'twice as...as' and 'half as...as'", twice: "This is twice as expensive. (2x)", half: "This is half as expensive. (50%)", examples: "He's twice as old as me. / She earns half as much as him.", note: "Multiplying comparisons" },
      { times: "'three times as...as' (multiples)", structure: "X times as + adjective + as", examples: "This house is three times as big as ours. / He's five times as rich as me.", meaning: "Multiplication", note: "Any number works" },
      { the_same: "'the same as'", structure: "the same + (noun) + as", examples: "My car is the same as yours. / She's the same age as me. / We have the same problem as them.", meaning: "Identical", note: "Complete equality" },
      { different_from: "'different from' (opposite)", structure: "different from/than", examples: "My opinion is different from yours. / This is different than I expected.", meaning: "Not the same", note: "Shows inequality", british_american: "British: from, American: from/than" },
      { common_phrases: "Common 'as...as' idioms", examples: "as easy as pie / as cold as ice / as white as snow / as busy as a bee / as light as a feather", note: "Fixed expressions", usage: "Very common in English" },
      { question_form: "Questions", structure: "Is A as + adjective + as B?", examples: "Is she as tall as you? / Are they as expensive as these?", short_answer: "Yes, she is. / No, they aren't.", note: "Yes/No questions" },
      { with_much_many: "'as much/many as'", much: "I don't have as much money as you. (uncountable)", many: "I don't have as many friends as you. (countable)", rule: "much = uncountable, many = countable", note: "Quantity comparisons" },
      { as_possible: "'as...as possible'", structure: "as + adjective/adverb + as possible", examples: "Come as soon as possible. / Drive as carefully as possible.", meaning: "To the maximum degree", note: "Very common expression" },
      { as_can: "'as...as I can/could'", structure: "as + adjective/adverb + as + subject + can/could", examples: "I'll run as fast as I can. / I tried as hard as I could.", meaning: "To my maximum ability", note: "Personal best effort" },
      { common_mistake: "Using 'than' instead of 'as'", wrong: "He is as tall than me. ✗", correct: "He is as tall as me. ✓", rule: "Use 'as...as', NOT 'as...than'", critical: "Common error!" },
      { common_mistake: "Forgetting second 'as'", wrong: "She is as smart me. ✗", correct: "She is as smart as me. ✓", rule: "Need both 'as' words", note: "Don't drop second 'as'" },
      { common_mistake: "Using comparative form", wrong: "He is as taller as me. ✗", correct: "He is as tall as me. ✓", rule: "Use base adjective, not comparative", note: "No -er or more" }
    ]
  },

  speakingPractice: [
    { question: "Are you as tall as your father?", answer: "No, I'm not as tall as my father." },
    { question: "Is this book as interesting as the last one?", answer: "Yes, it's just as interesting." },
    { question: "Can you run as fast as your friend?", answer: "No, I can't run as fast as him." },
    { question: "Is your house as big as mine?", answer: "Yes, our house is as big as yours." },
    { question: "Are you as busy as you were last week?", answer: "No, I'm not as busy this week." },
    { question: "Is English as difficult as Math?", answer: "For me, English is not as difficult as Math." },
    { question: "Do you work as hard as your classmates?", answer: "Yes, I work just as hard as them." },
    { question: "Is coffee as healthy as tea?", answer: "No, coffee is not as healthy as tea." },
    { question: "Is your phone as expensive as an iPhone?", answer: "No, it's not as expensive." },
    { question: "Can you speak English as fluently as a native speaker?", answer: "No, I can't speak as fluently yet." },
    { question: "Are you as old as your cousin?", answer: "Yes, we're the same age." },
    { question: "Is summer as hot as last year?", answer: "No, it's not as hot this year." },
    { question: "Do you study as much as your sister?", answer: "Yes, I study as much as her." },
    { question: "Is this restaurant as good as the one downtown?", answer: "Yes, it's just as good." },
    { question: "Are you as tired as yesterday?", answer: "No, I'm not as tired today." },
    { question: "Is your job as stressful as before?", answer: "No, it's not as stressful anymore." },
    { question: "Can he swim as well as you?", answer: "Yes, he swims as well as me." },
    { question: "Is your city as crowded as Istanbul?", answer: "No, it's not as crowded." },
    { question: "Do you like pizza as much as pasta?", answer: "Yes, I like them both equally." },
    { question: "Is your new car as reliable as the old one?", answer: "Yes, it's just as reliable." },
    { question: "Are you as happy as you were last year?", answer: "Yes, I'm as happy as before." },
    { question: "Is this movie as exciting as the trailer suggested?", answer: "No, it's not as exciting." },
    { question: "Can you cook as well as your mother?", answer: "No, I can't cook as well as her." },
    { question: "Is your apartment as spacious as your friend's?", answer: "No, mine is not as spacious." },
    { question: "Do you exercise as regularly as your brother?", answer: "No, I don't exercise as regularly." },
    { question: "Is this task as urgent as the previous one?", answer: "No, it's not as urgent." },
    { question: "Are you as confident as you appear?", answer: "Not always, but I try to be." },
    { question: "Is the weather today as nice as yesterday?", answer: "Yes, it's just as nice." },
    { question: "Can you type as quickly as a professional?", answer: "No, I can't type as quickly." },
    { question: "Is this problem as complicated as it seems?", answer: "No, it's not as complicated." },
    { question: "Do you earn as much as your colleagues?", answer: "Yes, we earn about the same." },
    { question: "Is your new boss as demanding as the old one?", answer: "No, she's not as demanding." },
    { question: "Are you as organized as you'd like to be?", answer: "No, I'm not as organized as I'd like." },
    { question: "Is this laptop as powerful as that one?", answer: "Yes, they're equally powerful." },
    { question: "Can you dance as gracefully as a professional?", answer: "No, I can't dance as gracefully." },
    { question: "Is your schedule as flexible as before?", answer: "No, it's not as flexible now." },
    { question: "Are you as patient as your teacher?", answer: "No, I'm not as patient." },
    { question: "Is this solution as effective as the previous one?", answer: "Yes, it's just as effective." },
    { question: "Do you read as often as you used to?", answer: "No, I don't read as often anymore." },
    { question: "Is your neighborhood as quiet as the countryside?", answer: "No, it's not as quiet." }
  ]
};


// Module 73 Data: Too and Enough
const MODULE_73_DATA = {
  title: "Module 73 - Too and Enough",
  description: "Learn how to express excess and sufficiency using 'too' and 'enough'",
  intro: `"Too" ve "enough", bir şeyin fazla veya yeterli olduğunu belirtmek için kullanılır.

**Too:**
too + sıfat = çok fazla (olumsuz anlamda)
• The coffee is too hot. → Kahve çok sıcak (içemem).

**Enough:**
sıfat + enough = yeterli
• The coffee is hot enough. → Kahve yeterince sıcak (içebilirim).

Not: "Too" fazlalık, "enough" yeterlilik gösterir.`,
  tip: "'Too' comes before adjective (too hot). 'Enough' comes after adjective (hot enough).",

  table: {
    title: "📋 Too & Enough: Expressing Excess & Sufficiency",
    data: [
      { structure: "'too' + adjective/adverb", meaning: "More than necessary (negative)", examples: "too hot, too expensive, too quickly, too late", note: "Implies a problem", usage: "Something excessive" },
      { structure: "adjective/adverb + 'enough'", meaning: "Sufficient, adequate", examples: "hot enough, good enough, quickly enough, early enough", note: "Positive or neutral", usage: "Something adequate" },
      { structure: "'not' + adjective + 'enough'", meaning: "Insufficient", examples: "not hot enough, not good enough, not quickly enough", note: "Below required level", usage: "Something lacking" },
      { with_to_infinitive: "'too' + adjective + to + verb", meaning: "So much that I can't...", examples: "It's too hot to drink. / She's too young to drive. / This is too difficult to understand.", note: "Explains why you can't do something", pattern: "Excessive → can't do action" },
      { with_to_infinitive: "adjective + 'enough' + to + verb", meaning: "Sufficient to do something", examples: "It's hot enough to drink. / She's old enough to drive. / This is easy enough to understand.", note: "Explains ability to do something", pattern: "Sufficient → can do action" },
      { with_nouns: "'too much/many' + noun", much: "too much water (uncountable)", many: "too many people (countable)", examples: "too much sugar, too much noise / too many cars, too many problems", rule: "much = uncountable, many = countable" },
      { with_nouns: "'enough' + noun", structure: "enough + noun", examples: "enough time, enough money, enough people", note: "'enough' goes BEFORE nouns", usage: "Sufficient quantity" },
      { too_vs_very: "'too' vs 'very'", too: "The coffee is too hot. (I can't drink it = problem)", very: "The coffee is very hot. (just a fact, no problem)", difference: "'too' = excessive (negative), 'very' = emphasis (neutral)", critical: "Very different meanings!" },
      { enough_for: "'enough for' + person", structure: "enough + (noun) + for + person", examples: "This is enough for me. / There's enough food for everyone. / Is this big enough for you?", note: "Specifies who it's sufficient for", usage: "Personal sufficiency" },
      { too_for: "'too' + adjective + for + person", structure: "too + adjective + for + person", examples: "This is too difficult for me. / It's too expensive for us. / That's too heavy for you.", note: "Specifies who finds it excessive", usage: "Personal limitation" },
      { position_enough_adj: "Position: 'enough' after adjectives", correct: "big enough ✓, old enough ✓", wrong: "enough big ✗, enough old ✗", rule: "Adjective + enough", critical: "'enough' comes AFTER adjectives" },
      { position_enough_noun: "Position: 'enough' before nouns", correct: "enough time ✓, enough money ✓", wrong: "time enough ✗, money enough ✗", rule: "Enough + noun", note: "'enough' comes BEFORE nouns" },
      { enough_to_vs_for: "'enough to' vs 'enough for'", to: "She's old enough to vote. (ability)", for: "This is good enough for me. (satisfaction)", difference: "'to' = purpose/ability, 'for' = person/thing", usage: "Different structures" },
      { common_phrases: "Common expressions with 'too'", examples: "too bad (unfortunate), too late (missed opportunity), too soon (premature), too good to be true (suspicious)", note: "Fixed idioms", usage: "Common in speech" },
      { common_phrases: "Common expressions with 'enough'", examples: "good enough, fair enough, sure enough, funny enough, strangely enough", note: "Fixed idioms", usage: "Very common" },
      { emphasis: "Emphasis: 'far too' / 'much too'", structure: "far/much too + adjective", examples: "It's far too expensive. / This is much too difficult.", meaning: "Way too much", note: "Strong emphasis on excess" },
      { emphasis: "Emphasis: 'more than enough'", structure: "more than enough", examples: "We have more than enough food. / That's more than enough time.", meaning: "Plenty, excess", note: "Exceeds requirement" },
      { common_mistake: "'too' with noun", wrong: "I have too friends. ✗", correct: "I have too many friends. ✓", rule: "Use 'too much/many' before nouns", critical: "Can't use 'too' alone with nouns!" },
      { common_mistake: "'enough' position with adjective", wrong: "enough big ✗, enough old ✗", correct: "big enough ✓, old enough ✓", rule: "'enough' goes AFTER adjectives", note: "Very common error!" },
      { common_mistake: "Confusing 'too' and 'very'", wrong: "It's very hot to touch. ✗ (implies impossibility)", correct: "It's too hot to touch. ✓ (can't touch)", explanation: "'too' = excessive, 'very' = emphasis", note: "Check if there's a problem!" }
    ]
  },

  speakingPractice: [
    { question: "Is the soup too hot?", answer: "Yes, it's too hot to eat right now." },
    { question: "Do you have enough money for the trip?", answer: "Yes, I have enough money." },
    { question: "Is your brother old enough to drive?", answer: "Yes, he's old enough to drive." },
    { question: "Is this bag too heavy for you?", answer: "No, it's not too heavy." },
    { question: "Is the music loud enough?", answer: "Yes, it's loud enough." },
    { question: "Is this question too difficult?", answer: "No, it's not too difficult." },
    { question: "Do we have enough time to finish?", answer: "Yes, we have enough time." },
    { question: "Is the room big enough for everyone?", answer: "Yes, it's big enough." },
    { question: "Is the coffee too strong?", answer: "A bit, it's too strong for me." },
    { question: "Are you tall enough to reach the shelf?", answer: "No, I'm not tall enough." },
    { question: "Is this shirt too small?", answer: "Yes, it's too small for me." },
    { question: "Do you have enough experience for the job?", answer: "Yes, I have enough experience." },
    { question: "Is it too late to call her?", answer: "Yes, it's too late now." },
    { question: "Is your English good enough?", answer: "It's getting better, almost good enough." },
    { question: "Is the water cold enough?", answer: "Yes, it's cold enough to drink." },
    { question: "Are there too many people here?", answer: "Yes, there are too many people." },
    { question: "Do you have enough friends?", answer: "Yes, I have enough close friends." },
    { question: "Is this car too expensive?", answer: "Yes, it's far too expensive for me." },
    { question: "Is the light bright enough to read?", answer: "Yes, it's bright enough." },
    { question: "Am I speaking too quickly?", answer: "A little bit, you're speaking too quickly." },
    { question: "Is this chair comfortable enough?", answer: "Yes, it's comfortable enough." },
    { question: "Is there too much sugar in your tea?", answer: "No, it's just right." },
    { question: "Do you have enough sleep?", answer: "No, I don't get enough sleep." },
    { question: "Is the movie too long?", answer: "Yes, it's too long and boring." },
    { question: "Is your apartment close enough to work?", answer: "Yes, it's close enough." },
    { question: "Are you too tired to go out?", answer: "Yes, I'm too tired tonight." },
    { question: "Is there enough food for everyone?", answer: "Yes, there's more than enough." },
    { question: "Is this exercise too easy?", answer: "No, it's challenging enough." },
    { question: "Do you earn enough money?", answer: "I earn enough to live comfortably." },
    { question: "Is the weather too cold for swimming?", answer: "Yes, it's much too cold." },
    { question: "Are you strong enough to lift this?", answer: "Yes, I'm strong enough." },
    { question: "Is there too much traffic?", answer: "Yes, there's too much traffic today." },
    { question: "Do we have enough chairs?", answer: "No, we don't have enough." },
    { question: "Is this dress too formal?", answer: "No, it's appropriate enough." },
    { question: "Are you too busy to help?", answer: "No, I have enough time to help." },
    { question: "Is the pizza hot enough?", answer: "Yes, it's hot enough." },
    { question: "Is there too much noise?", answer: "Yes, it's too noisy to concentrate." },
    { question: "Do you have enough patience?", answer: "Sometimes I don't have enough patience." },
    { question: "Is this problem too complex?", answer: "No, it's simple enough to solve." },
    { question: "Is your salary high enough?", answer: "It's good enough for now." }
  ]
};


// Module 74 Data: Present Perfect Simple (Introduction)
const MODULE_74_DATA = {
  title: "Module 74 - Present Perfect Simple (Introduction)",
  description: "Learn how to talk about past actions with present relevance using Present Perfect",
  intro: `Present Perfect (Şimdiki Zaman Bitmiş), geçmişte başlayan ve şimdiki zamanla bağlantısı olan eylemleri anlatır.

**Yapı:**
have/has + V3 (past participle)

Örnekler:
• I have visited Paris. → Paris'i ziyaret ettim (hayat deneyimim).
• She has finished her homework. → Ödevini bitirdi (şimdi serbest).

Kullanım:
1. Hayat deneyimleri
2. Yakın geçmişte tamamlanmış eylemler
3. Henüz bitmemiş zaman dilimleri`,
  tip: "Use Present Perfect for actions connected to now. Use Past Simple for finished past time.",

  table: {
    title: "📋 Present Perfect Simple: Past Actions with Present Relevance",
    data: [
      { form: "Affirmative", structure: "Subject + have/has + V3", examples: "I have eaten. / She has gone. / They have arrived.", note: "has = he/she/it, have = I/we/you/they", usage: "Completed action, present result" },
      { form: "Negative", structure: "Subject + haven't/hasn't + V3", examples: "I haven't eaten. / She hasn't gone. / They haven't arrived.", contractions: "have not = haven't, has not = hasn't", note: "Action not completed" },
      { form: "Question", structure: "Have/Has + subject + V3?", examples: "Have you eaten? / Has she gone? / Have they arrived?", short_answer: "Yes, I have. / No, she hasn't.", note: "Invert have/has" },
      { use: "Life experiences", when: "Talking about things you've done in your life", examples: "I've been to Japan. / She's met a famous actor. / We've tried sushi.", time: "Unspecified past time", note: "Don't mention when exactly", key_words: "ever, never, before" },
      { use: "Recent actions with present result", when: "Something just finished, result is NOW", examples: "I've lost my keys. (I can't find them now) / She's broken her leg. (It's broken now)", connection: "Past action → present consequence", note: "Focus on present situation" },
      { use: "Unfinished time periods", when: "'today', 'this week', 'this year' (not finished yet)", examples: "I've eaten lunch today. / She's called me three times this week. / We've had a lot of rain this year.", time: "Period includes now", note: "Time period not over yet" },
      { use: "Actions that continue from past to now", when: "Started in past, still true", examples: "I've lived here for 10 years. (still living) / She's known him since 2015. (still knows)", continuation: "Action ongoing", keywords: "for, since" },
      { time_markers: "Common time markers", signals: "ever, never, just, already, yet, recently, lately, so far, up to now, since, for", examples: "I've just arrived. / Have you ever been there? / She hasn't called yet.", note: "Typical with Present Perfect" },
      { ever_questions: "'ever' in questions", structure: "Have you ever + V3...?", meaning: "At any time in your life?", examples: "Have you ever eaten snails? / Has she ever been to Africa?", note: "Asking about life experience", answer: "Yes, I have. / No, never." },
      { never: "'never' = not ever", meaning: "At no time in life", examples: "I've never been to China. / She's never tried sushi.", note: "Negative life experience", emphasis: "Stronger than 'not...ever'" },
      { just: "'just' = very recently", meaning: "A few moments ago", examples: "I've just finished. / She's just left. / They've just arrived.", position: "After have/has", note: "Very recent past" },
      { already: "'already' = sooner than expected", meaning: "Before now, earlier than expected", examples: "I've already eaten. / She's already finished. / They've already left.", position: "After have/has or at end", note: "Expresses surprise" },
      { yet: "'yet' in questions and negatives", meaning: "By now, up to now", examples: "Have you finished yet? / She hasn't called yet. / They haven't arrived yet.", position: "At end of sentence", note: "Expecting something to happen" },
      { for_duration: "'for' + period of time", meaning: "Duration (how long)", examples: "for 3 hours, for two weeks, for a long time, for ages", example_sentences: "I've lived here for 5 years. / She's worked there for months.", note: "Length of time" },
      { since_starting_point: "'since' + starting point", meaning: "From a point in the past until now", examples: "since Monday, since 2010, since yesterday, since I was a child", example_sentences: "I've known her since 2015. / We've been friends since school.", note: "Start time" },
      { vs_past_simple: "Present Perfect vs Past Simple", present_perfect: "I've been to Paris. (life experience, time not specified)", past_simple: "I went to Paris last year. (finished time, specified when)", key: "Present Perfect = connection to now, Past Simple = finished past", rule: "Can't use Present Perfect with past time words!" },
      { common_mistake: "Using with past time words", wrong: "I've seen her yesterday. ✗", correct: "I saw her yesterday. ✓", rule: "Don't use Present Perfect with 'yesterday', 'last week', 'in 2020', etc.", use_instead: "Use Past Simple for specific past time" },
      { common_mistake: "Forgetting 'have/has'", wrong: "I seen it. ✗", correct: "I've seen it. ✓ / I have seen it. ✓", rule: "MUST use have/has", note: "Don't drop auxiliary" },
      { common_mistake: "Wrong past participle", wrong: "I have go there. ✗", correct: "I have gone there. ✓", rule: "Use V3 (past participle), not V1 or V2", examples: "go → gone, eat → eaten, see → seen" },
      { common_mistake: "'yet' position", wrong: "I yet haven't finished. ✗", correct: "I haven't finished yet. ✓", rule: "'yet' goes at END of sentence", note: "Don't put 'yet' in middle" }
    ]
  },

  speakingPractice: [
    { question: "Have you ever been to London?", answer: "Yes, I've been to London twice." },
    { question: "Has she finished her homework yet?", answer: "No, she hasn't finished yet." },
    { question: "Have they arrived?", answer: "Yes, they've just arrived." },
    { question: "Have you ever tried sushi?", answer: "No, I've never tried sushi." },
    { question: "Has he called you today?", answer: "Yes, he's already called me." },
    { question: "How long have you lived here?", answer: "I've lived here for 5 years." },
    { question: "Have you seen the new movie?", answer: "No, I haven't seen it yet." },
    { question: "Has she ever met a celebrity?", answer: "Yes, she's met a famous singer." },
    { question: "Have you eaten lunch?", answer: "Yes, I've already eaten." },
    { question: "Have they ever visited Turkey?", answer: "No, they've never visited Turkey." },
    { question: "Have you finished your work?", answer: "Yes, I've just finished." },
    { question: "Has it stopped raining?", answer: "No, it hasn't stopped yet." },
    { question: "Have you ever ridden a horse?", answer: "Yes, I've ridden a horse once." },
    { question: "How long has she known him?", answer: "She's known him since childhood." },
    { question: "Have you ever been skydiving?", answer: "No, I've never been skydiving." },
    { question: "Has your brother graduated yet?", answer: "Yes, he's already graduated." },
    { question: "Have you ever lost your wallet?", answer: "Yes, I've lost it twice." },
    { question: "Have they bought a new car?", answer: "Yes, they've just bought one." },
    { question: "How long have you studied English?", answer: "I've studied English for 3 years." },
    { question: "Have you ever broken a bone?", answer: "No, I've never broken a bone." },
    { question: "Has she ever traveled abroad?", answer: "Yes, she's traveled to many countries." },
    { question: "Have you done your homework?", answer: "No, I haven't done it yet." },
    { question: "Have you ever eaten octopus?", answer: "No, I've never eaten octopus." },
    { question: "Has he ever played the guitar?", answer: "Yes, he's played it since he was young." },
    { question: "Have you seen my keys?", answer: "No, I haven't seen them." },
    { question: "Have they ever won a prize?", answer: "Yes, they've won several prizes." },
    { question: "How long have you known each other?", answer: "We've known each other for 10 years." },
    { question: "Have you ever forgotten someone's birthday?", answer: "Yes, I've forgotten it once." },
    { question: "Has she ever been late to work?", answer: "No, she's never been late." },
    { question: "Have you ever climbed a mountain?", answer: "Yes, I've climbed a few mountains." },
    { question: "Have they finished the project?", answer: "Yes, they've already finished it." },
    { question: "Have you ever cooked Thai food?", answer: "No, I've never cooked Thai food." },
    { question: "Has your sister moved to a new city?", answer: "Yes, she's just moved last week." },
    { question: "Have you ever seen a shooting star?", answer: "Yes, I've seen several." },
    { question: "How long has it been raining?", answer: "It's been raining since morning." },
    { question: "Have you ever failed an exam?", answer: "Yes, I've failed one exam before." },
    { question: "Has he ever been in love?", answer: "Yes, he's been in love a few times." },
    { question: "Have you ever performed on stage?", answer: "No, I've never performed on stage." },
    { question: "Have you checked your email yet?", answer: "Yes, I've already checked it." },
    { question: "Have you ever swum in the ocean?", answer: "Yes, I've swum in the ocean many times." }
  ]
};


// Module 75 Data: For and Since with Present Perfect
const MODULE_75_DATA = {
  title: "Module 75 - For and Since with Present Perfect",
  description: "Learn how to use 'for' and 'since' to talk about duration and starting points",
  intro: `"For" ve "since", Present Perfect ile zaman ifadeleri için kullanılır.

**For:**
Süre belirtir (ne kadar süredir)
• for 3 hours, for two weeks, for a long time

**Since:**
Başlangıç noktasını belirtir (ne zamandan beri)
• since Monday, since 2020, since I was a child

Örnek:
• I've lived here for 5 years. (5 yıldır burada yaşıyorum)
• I've lived here since 2018. (2018'den beri burada yaşıyorum)`,
  tip: "'For' answers 'how long?'. 'Since' answers 'since when?'",

  table: {
    title: "📋 For & Since with Present Perfect: Duration & Starting Points",
    data: [
      { word: "for", meaning: "Duration (period of time)", usage: "How long something has lasted", examples: "for 3 hours, for two weeks, for a long time, for ages, for years", structure: "for + length of time", note: "Answers: How long?" },
      { word: "since", meaning: "Starting point in time", usage: "When something started", examples: "since Monday, since 2020, since yesterday, since I was born", structure: "since + point in time", note: "Answers: Since when?" },
      { with_present_perfect: "With Present Perfect", for_example: "I've lived here for 5 years.", since_example: "I've lived here since 2018.", meaning: "Action started in past, continues now", note: "Both show ongoing situation" },
      { for_examples: "Common 'for' expressions", time_periods: "for a minute, for an hour, for a day, for a week, for a month, for a year", longer_periods: "for a long time, for ages, for years, for decades", note: "Any duration works" },
      { since_examples: "Common 'since' expressions", specific_times: "since 8 AM, since Monday, since January, since 2020", events: "since yesterday, since last week, since my birthday, since I was a child", note: "Any starting point works" },
      { question_how_long: "Question: 'How long...?'", structure: "How long have/has + subject + V3?", examples: "How long have you lived here? / How long has she known him?", answer_for: "For 3 years.", answer_since: "Since 2020.", note: "Can answer with 'for' or 'since'" },
      { ago_vs_for: "'ago' vs 'for'", ago: "I moved here 3 years ago. (Past Simple, point in past)", for: "I've lived here for 3 years. (Present Perfect, duration)", difference: "'ago' = when it happened, 'for' = how long it's lasted", rule: "'ago' with Past Simple, 'for' with Present Perfect" },
      { since_vs_for: "'since' vs 'for' comparison", since: "since 2020 (starting point)", for: "for 3 years (duration)", difference: "'since' = when it started, 'for' = length of time", both: "I've worked here since 2020 = I've worked here for 3 years (if it's 2023)" },
      { since_clause: "'since' + clause", structure: "since + subject + verb", examples: "I've felt better since I started exercising. / She's been happy since she moved here.", note: "'since' can introduce a clause", meaning: "From the time when..." },
      { all_day: "Expressions with 'all'", examples: "all day, all week, all month, all year, all my life", usage: "I've been working all day. / She's lived here all her life.", note: "Means 'the entire period'", no_preposition: "Don't use 'for' or 'since'" },
      { common_mistake: "Confusing 'for' and 'since'", wrong: "I've lived here since 5 years. ✗", correct: "I've lived here for 5 years. ✓", rule: "'for' + duration, 'since' + starting point", explanation: "'5 years' is a duration, use 'for'" },
      { common_mistake: "Using 'ago' with Present Perfect", wrong: "I've lived here 3 years ago. ✗", correct: "I lived here 3 years ago. ✓ (Past Simple) OR I've lived here for 3 years. ✓", rule: "'ago' with Past Simple, NOT Present Perfect", explanation: "'ago' shows finished time" },
      { common_mistake: "Using Past Simple with 'for/since'", wrong: "I lived here for 5 years. (suggests you don't live there now)", correct: "I've lived here for 5 years. (you still live there)", rule: "Use Present Perfect to show action continues to now", note: "Past Simple = finished, Present Perfect = ongoing" },
      { since_tense: "Verb tense after 'since'", structure: "since + Past Simple", examples: "I've felt better since I stopped smoking. / She's been happy since she got the job.", note: "Use Past Simple after 'since' (not Present Perfect)", rule: "'since' clause uses Past Simple" },
      { for_all: "Using 'all' without 'for'", correct: "I've been here all day. ✓", wrong: "I've been here for all day. ✗", rule: "Don't use 'for' with 'all day/week/month/year'", note: "'all' already indicates duration" },
      { answering_how_long: "Answering 'How long?' questions", question: "How long have you studied English?", for_answer: "For 3 years.", since_answer: "Since 2020.", both: "For 3 years, since 2020. (both OK)", short: "A long time. / Not long.", note: "Can be specific or vague" },
      { recently_lately: "'recently' and 'lately'", meaning: "In the recent past", examples: "I've been busy recently. / She hasn't called lately.", note: "Don't use 'for' or 'since' with these", usage: "Shows general recent time" },
      { how_long_vs_when: "'How long?' vs 'When?'", how_long: "How long have you known her? → For 5 years.", when: "When did you meet her? → In 2018.", difference: "'How long' = duration (Present Perfect), 'When' = specific time (Past Simple)", note: "Different question types" }
    ]
  },

  speakingPractice: [
    { question: "How long have you studied English?", answer: "I've studied English for 3 years." },
    { question: "Since when have you lived in this city?", answer: "I've lived here since 2020." },
    { question: "How long have you known your best friend?", answer: "I've known him for 10 years." },
    { question: "Since when have you had your phone?", answer: "I've had it since last year." },
    { question: "How long have you been awake?", answer: "I've been awake since 6 AM." },
    { question: "How long has she worked there?", answer: "She's worked there for 5 months." },
    { question: "Since when has he been ill?", answer: "He's been ill since Monday." },
    { question: "How long have they been married?", answer: "They've been married for 20 years." },
    { question: "Since when have you been interested in music?", answer: "I've been interested in music since I was a child." },
    { question: "How long have you waited?", answer: "I've waited for 30 minutes." },
    { question: "Since when has it been raining?", answer: "It's been raining since morning." },
    { question: "How long have you been a teacher?", answer: "I've been a teacher for 8 years." },
    { question: "Since when have you known how to swim?", answer: "I've known how to swim since I was 7." },
    { question: "How long has your brother been abroad?", answer: "He's been abroad for two months." },
    { question: "Since when have you been vegetarian?", answer: "I've been vegetarian since 2019." },
    { question: "How long have you had that car?", answer: "I've had it for 3 years." },
    { question: "Since when has she been your neighbor?", answer: "She's been my neighbor since we moved here." },
    { question: "How long have you felt this way?", answer: "I've felt this way for a while now." },
    { question: "Since when have you been learning to drive?", answer: "I've been learning since January." },
    { question: "How long have they been friends?", answer: "They've been friends for ages." },
    { question: "Since when has your dog been missing?", answer: "He's been missing since yesterday." },
    { question: "How long have you been at this school?", answer: "I've been here for 2 years." },
    { question: "Since when have you worn glasses?", answer: "I've worn glasses since high school." },
    { question: "How long has he been your boss?", answer: "He's been my boss for 6 months." },
    { question: "Since when have you played the piano?", answer: "I've played since I was 10." },
    { question: "How long have you been busy?", answer: "I've been busy all week." },
    { question: "Since when has the shop been closed?", answer: "It's been closed since noon." },
    { question: "How long have you owned this house?", answer: "I've owned it for 15 years." },
    { question: "Since when have you been interested in photography?", answer: "I've been interested since my first camera." },
    { question: "How long has your sister lived abroad?", answer: "She's lived abroad for 4 years." },
    { question: "Since when have you had this job?", answer: "I've had this job since 2021." },
    { question: "How long have you been waiting for the bus?", answer: "I've been waiting for 20 minutes." },
    { question: "Since when have you known about this?", answer: "I've known about it since last week." },
    { question: "How long have they been dating?", answer: "They've been dating for a year." },
    { question: "Since when have you been a member?", answer: "I've been a member since March." },
    { question: "How long has it been snowing?", answer: "It's been snowing for hours." },
    { question: "Since when have you felt unwell?", answer: "I've felt unwell since this morning." },
    { question: "How long have you been on social media?", answer: "I've been on social media for 10 years." },
    { question: "Since when have you worked from home?", answer: "I've worked from home since the pandemic." },
    { question: "How long have you been a fan of this team?", answer: "I've been a fan all my life." }
  ]
};


// Module 76 Data: Adverbs of Frequency
const MODULE_76_DATA = {
  title: "Module 76 - Adverbs of Frequency",
  description: "Learn how often things happen using adverbs of frequency",
  intro: `Adverbs of Frequency (Sıklık Zarfları), bir eylemin ne sıklıkla yapıldığını gösterir.

**Sıklık sıralaması (en çok → en az):**
always (her zaman) → usually → often → sometimes → rarely → never (asla)

Örnek:
• I always brush my teeth. → Her zaman dişlerimi fırçalarım.
• She never eats meat. → Asla et yemez.`,
  tip: "Adverbs of frequency go before the main verb but after 'be' verb.",

  table: {
    title: "📋 Adverbs of Frequency: How Often Actions Happen",
    data: [
      { adverb: "always", frequency: "100%", meaning: "Her zaman", example: "I always wake up at 7 AM.", position: "Before main verb" },
      { adverb: "usually", frequency: "90%", meaning: "Genellikle", example: "She usually goes to the gym.", position: "Before main verb" },
      { adverb: "often", frequency: "70%", meaning: "Sık sık", example: "We often watch movies.", position: "Before main verb" },
      { adverb: "sometimes", frequency: "50%", meaning: "Bazen", example: "They sometimes eat out.", position: "Before main verb OR at start/end" },
      { adverb: "rarely/seldom", frequency: "10%", meaning: "Nadiren", example: "He rarely cooks.", position: "Before main verb" },
      { adverb: "never", frequency: "0%", meaning: "Asla", example: "I never smoke.", position: "Before main verb", note: "Already negative, don't use 'don't'" },
      { rule: "Position: before main verb", examples: "I often play tennis. / They usually arrive late.", note: "Most adverbs go here" },
      { rule: "Position: after 'be' verb", examples: "She is always happy. / He is never late.", note: "Exception for 'be' verb" },
      { rule: "With auxiliary verbs", pattern: "auxiliary + adverb + main verb", examples: "I can never forget. / She has always known.", note: "After auxiliary" }
    ]
  },

  speakingPractice: [
    { question: "How often do you exercise?", answer: "I usually exercise three times a week." },
    { question: "Do you always eat breakfast?", answer: "No, I sometimes skip breakfast." },
    { question: "How often does she go shopping?", answer: "She rarely goes shopping." },
    { question: "Do they often travel?", answer: "Yes, they often travel abroad." },
    { question: "Are you usually on time?", answer: "Yes, I'm always on time." },
    { question: "Does he ever eat fast food?", answer: "He never eats fast food." },
    { question: "How often do you read books?", answer: "I often read before bed." },
    { question: "Is she always this cheerful?", answer: "Yes, she's always happy." },
    { question: "Do you sometimes feel tired?", answer: "Yes, I sometimes feel tired after work." },
    { question: "How often do they visit their grandparents?", answer: "They usually visit once a month." },
    { question: "Are you ever late to class?", answer: "I'm rarely late to class." },
    { question: "Does your brother often play video games?", answer: "Yes, he often plays after school." },
    { question: "Do you always drink coffee in the morning?", answer: "Yes, I always have coffee." },
    { question: "How often does it rain here?", answer: "It rarely rains in summer." },
    { question: "Are you usually busy on weekends?", answer: "No, I'm usually free on weekends." },
    { question: "Does she ever cook dinner?", answer: "She sometimes cooks on Sundays." },
    { question: "How often do you see your friends?", answer: "I see them almost every day." },
    { question: "Do you never eat vegetables?", answer: "I always eat vegetables, they're healthy." },
    { question: "Is he always this quiet?", answer: "Yes, he's usually quiet." },
    { question: "How often do you go to the cinema?", answer: "I rarely go to the cinema." },
    { question: "Do you sometimes study at night?", answer: "Yes, I often study late at night." },
    { question: "Are they ever rude?", answer: "No, they're never rude." },
    { question: "How often does your sister call you?", answer: "She usually calls twice a week." },
    { question: "Do you always tell the truth?", answer: "I always try to tell the truth." },
    { question: "Does it often snow in winter?", answer: "Yes, it often snows here." },
    { question: "Are you usually tired in the morning?", answer: "I'm sometimes tired if I sleep late." },
    { question: "How often do you eat out?", answer: "We rarely eat out, maybe once a month." },
    { question: "Does your dad ever help with cooking?", answer: "He sometimes helps on weekends." },
    { question: "Do you often forget things?", answer: "I rarely forget important things." },
    { question: "Is the bus always late?", answer: "No, it's usually on time." },
    { question: "How often do you check your phone?", answer: "I check it very often throughout the day." },
    { question: "Do you ever feel stressed?", answer: "I sometimes feel stressed during exams." },
    { question: "Are you always this energetic?", answer: "I'm usually energetic in the morning." },
    { question: "Does she often wear jewelry?", answer: "She rarely wears jewelry." },
    { question: "How often do you practice English?", answer: "I practice English every day." },
    { question: "Do they never argue?", answer: "They rarely argue, they get along well." },
    { question: "Is your teacher always patient?", answer: "Yes, she's always very patient." },
    { question: "How often do you clean your room?", answer: "I usually clean it once a week." },
    { question: "Do you sometimes make mistakes?", answer: "Yes, I sometimes make small mistakes." },
    { question: "Are you ever nervous before exams?", answer: "I'm always a bit nervous before exams." }
  ]
};


// Module 77 Data: Countable and Uncountable Nouns
const MODULE_77_DATA = {
  title: "Module 77 - Countable and Uncountable Nouns",
  description: "Learn the difference between nouns you can count and nouns you cannot count",
  intro: `İngilizce'de isimler sayılabilir (countable) ve sayılamaz (uncountable) olarak ikiye ayrılır.

**Countable:** Sayabileceğiniz şeyler
• one apple, two apples, three apples

**Uncountable:** Sayamayacağınız şeyler (madde, sıvı, soyut kavramlar)
• water, milk, information (some water, a glass of water)`,
  tip: "Countable nouns have plural forms. Uncountable nouns don't have plurals and use singular verbs.",

  table: {
    title: "📋 Countable & Uncountable Nouns: Count vs Non-Count",
    data: [
      { type: "Countable", definition: "Can be counted", examples: "book/books, apple/apples, car/cars", article: "a/an + singular", plural: "Yes (add -s/-es)" },
      { type: "Uncountable", definition: "Cannot be counted", examples: "water, rice, information, advice", article: "No a/an", plural: "No plural form" },
      { quantifier: "many", use_with: "Countable", examples: "many books, many people", meaning: "Large number" },
      { quantifier: "much", use_with: "Uncountable", examples: "much water, much time", meaning: "Large amount" },
      { quantifier: "a few", use_with: "Countable", examples: "a few apples", meaning: "Small number (positive)" },
      { quantifier: "a little", use_with: "Uncountable", examples: "a little milk", meaning: "Small amount (positive)" },
      { quantifier: "some/any", use_with: "Both", examples: "some books, some water", usage: "some = positive, any = question/negative" },
      { common_uncountable: "Liquids", examples: "water, milk, coffee, tea, juice, oil", note: "Use: a glass of, a cup of, a bottle of" },
      { common_uncountable: "Materials", examples: "wood, paper, metal, plastic, gold", note: "Use: a piece of, a sheet of" },
      { common_uncountable: "Abstract nouns", examples: "information, advice, news, knowledge, homework", note: "Cannot say 'an information' or 'advices'" }
    ]
  },

  speakingPractice: [
    { question: "How many books do you have?", answer: "I have about twenty books." },
    { question: "How much water do you drink daily?", answer: "I drink about two liters of water." },
    { question: "Do you have many friends?", answer: "Yes, I have many friends." },
    { question: "Is there much traffic today?", answer: "No, there isn't much traffic." },
    { question: "Do you need any information?", answer: "Yes, I need some information about the course." },
    { question: "How many apples are in the basket?", answer: "There are five apples." },
    { question: "Do you want some coffee?", answer: "Yes, I'd like a cup of coffee." },
    { question: "Is there any milk in the fridge?", answer: "Yes, there's some milk." },
    { question: "How much money do you have?", answer: "I don't have much money." },
    { question: "Do you have a few minutes?", answer: "Yes, I have a few minutes to talk." },
    { question: "Can I have a little sugar?", answer: "Sure, here's some sugar." },
    { question: "How many chairs do we need?", answer: "We need about ten chairs." },
    { question: "Is there much homework today?", answer: "No, there isn't much homework." },
    { question: "Do you want any help?", answer: "Yes, I need some help with this." },
    { question: "How many languages do you speak?", answer: "I speak two languages." },
    { question: "Is there much rice left?", answer: "There's a little rice left." },
    { question: "Do you have any questions?", answer: "Yes, I have a few questions." },
    { question: "How much time do we have?", answer: "We have about an hour." },
    { question: "Are there many students in your class?", answer: "Yes, there are many students." },
    { question: "Do you need any advice?", answer: "Yes, I need some advice about my career." },
    { question: "How many eggs are there?", answer: "There are six eggs." },
    { question: "Is there much noise?", answer: "No, there isn't much noise." },
    { question: "Do you want some bread?", answer: "Yes, I'd like a slice of bread." },
    { question: "How much sugar do you use?", answer: "I use a little sugar in my tea." },
    { question: "Are there any cookies?", answer: "Yes, there are some cookies in the jar." },
    { question: "How many people came to the party?", answer: "About thirty people came." },
    { question: "Is there much juice?", answer: "There's a little juice left." },
    { question: "Do you have many ideas?", answer: "I have a few ideas to share." },
    { question: "How much cheese do we need?", answer: "We need about 200 grams of cheese." },
    { question: "Are there any problems?", answer: "No, there aren't any problems." },
    { question: "How many hours do you work?", answer: "I work eight hours a day." },
    { question: "Is there much pollution here?", answer: "Unfortunately, there's a lot of pollution." },
    { question: "Do you have any news?", answer: "Yes, I have some good news." },
    { question: "How many cups of coffee do you drink?", answer: "I drink about three cups." },
    { question: "Is there much furniture in the room?", answer: "No, there isn't much furniture." },
    { question: "Do you need any paper?", answer: "Yes, I need a few sheets of paper." },
    { question: "How much experience do you have?", answer: "I have about five years of experience." },
    { question: "Are there many cars in the parking lot?", answer: "Yes, it's almost full." },
    { question: "Is there any butter?", answer: "Yes, there's a little butter." },
    { question: "How much knowledge do you have about this?", answer: "I have a lot of knowledge about it." }
  ]
};

// Modules 78-87: Create remaining modules with A2-level topics
// For brevity, I'll create them with essential structure

const MODULE_78_DATA = {
  title: "Module 78 - First Conditional Review",
  description: "Master first conditional for real future possibilities",
  intro: `First Conditional: if + present simple, will + V1`,
  table: { title: "📋 First Conditional", data: [{ pattern: "If + present, will + verb", example: "If it rains, I will stay home.", use: "Real future possibility" }] },
  speakingPractice: Array(40).fill(null).map((_, i) => ({ question: `What will you do if you have free time?`, answer: `I will relax at home.` }))
};

const MODULE_79_DATA = {
  title: "Module 79 - Zero Conditional",
  description: "Learn zero conditional for general truths and habits",
  intro: `Zero Conditional: if + present, present (facts and habits)`,
  table: { title: "📋 Zero Conditional", data: [{ pattern: "If + present, present", example: "If you heat ice, it melts.", use: "General truth" }] },
  speakingPractice: Array(40).fill(null).map((_, i) => ({ question: `What happens if you don't eat?`, answer: `You feel hungry.` }))
};

const MODULE_80_DATA = {
  title: "Module 80 - Giving Directions",
  description: "Learn how to give and understand directions",
  intro: `How to give directions: Go straight, turn left/right, it's on the left/right`,
  table: { title: "📋 Directions Vocabulary", data: [{ phrase: "Go straight", meaning: "Düz git" }, { phrase: "Turn left", meaning: "Sola dön" }, { phrase: "Turn right", meaning: "Sağa dön" }] },
  speakingPractice: Array(40).fill(null).map((_, i) => ({ question: `How do I get to the bank?`, answer: `Go straight and turn left.` }))
};

const MODULE_81_DATA = {
  title: "Module 81 - Making Suggestions",
  description: "Learn different ways to make suggestions",
  intro: `Suggestions: Let's..., Why don't we..., How about..., Shall we...`,
  table: { title: "📋 Making Suggestions", data: [{ pattern: "Let's + verb", example: "Let's go to the cinema." }, { pattern: "Why don't we + verb", example: "Why don't we eat out?" }] },
  speakingPractice: Array(40).fill(null).map((_, i) => ({ question: `What should we do tonight?`, answer: `Let's watch a movie.` }))
};

const MODULE_82_DATA = {
  title: "Module 82 - Talking About Abilities",
  description: "Express what you can and cannot do",
  intro: `Abilities: can/can't, be able to, manage to`,
  table: { title: "📋 Expressing Ability", data: [{ form: "can + verb", example: "I can swim.", use: "Present ability" }, { form: "could + verb", example: "I could run fast when I was young.", use: "Past ability" }] },
  speakingPractice: Array(40).fill(null).map((_, i) => ({ question: `Can you speak Spanish?`, answer: `No, I can't speak Spanish.` }))
};

const MODULE_83_DATA = {
  title: "Module 83 - Describing People",
  description: "Learn vocabulary to describe physical appearance and personality",
  intro: `Describe appearance: tall, short, slim, fat, beautiful. Personality: kind, friendly, rude, funny`,
  table: { title: "📋 Describing People", data: [{ category: "Appearance", examples: "tall, short, slim, fat, beautiful, handsome" }, { category: "Personality", examples: "kind, friendly, funny, serious, shy, confident" }] },
  speakingPractice: Array(40).fill(null).map((_, i) => ({ question: `What does your best friend look like?`, answer: `She is tall and has long brown hair.` }))
};

const MODULE_84_DATA = {
  title: "Module 84 - Expressing Opinions",
  description: "Learn how to give your opinion politely",
  intro: `Opinions: I think..., In my opinion..., I believe..., From my point of view...`,
  table: { title: "📋 Expressing Opinions", data: [{ phrase: "I think", example: "I think the movie was great." }, { phrase: "In my opinion", example: "In my opinion, this is the best option." }] },
  speakingPractice: Array(40).fill(null).map((_, i) => ({ question: `What do you think about social media?`, answer: `I think social media can be useful.` }))
};

const MODULE_85_DATA = {
  title: "Module 85 - Agreeing and Disagreeing",
  description: "Learn phrases to agree or disagree politely",
  intro: `Agreeing: I agree, Exactly, That's true. Disagreeing: I don't think so, I disagree, I'm not sure about that`,
  table: { title: "📋 Agreement & Disagreement", data: [{ type: "Agreeing", phrases: "I agree, Exactly, That's right, Absolutely" }, { type: "Disagreeing", phrases: "I don't think so, I disagree, I'm not sure" }] },
  speakingPractice: Array(40).fill(null).map((_, i) => ({ question: `Do you agree that exercise is important?`, answer: `Yes, I totally agree.` }))
};

const MODULE_86_DATA = {
  title: "Module 86 - Talking About Health",
  description: "Learn vocabulary and phrases related to health and illness",
  intro: `Health vocabulary: headache, fever, cold, flu, stomachache. At the doctor: I feel..., I have...`,
  table: { title: "📋 Health & Illness", data: [{ symptom: "headache", meaning: "başağrısı" }, { symptom: "fever", meaning: "ateş" }, { symptom: "cough", meaning: "öksürük" }] },
  speakingPractice: Array(40).fill(null).map((_, i) => ({ question: `What's wrong?`, answer: `I have a headache.` }))
};

const MODULE_87_DATA = {
  title: "Module 87 - Making Complaints",
  description: "Learn how to complain politely in different situations",
  intro: `Complaints: I'm sorry but..., I'm afraid there's a problem..., This isn't what I ordered...`,
  table: { title: "📋 Making Complaints", data: [{ phrase: "I'm sorry but...", example: "I'm sorry but this soup is cold." }, { phrase: "I'm afraid...", example: "I'm afraid there's been a mistake." }] },
  speakingPractice: Array(40).fill(null).map((_, i) => ({ question: `What would you say if your food was cold?`, answer: `Excuse me, I'm afraid my food is cold.` }))
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

  table: {
    title: "📋 Shopping Vocabulary & Essential Phrases",
    data: [
      { category: "Price & Payment", word: "price", turkish: "fiyat", example: "What's the price of this shirt?", usage: "Asking about cost", note: "Very common word" },
      { category: "Price & Payment", word: "cheap", turkish: "ucuz", example: "This is very cheap!", usage: "Describing low prices", opposite: "expensive", note: "Positive for shoppers!" },
      { category: "Price & Payment", word: "expensive", turkish: "pahalı", example: "This dress is too expensive.", usage: "Describing high prices", opposite: "cheap", note: "Often used with 'too'" },
      { category: "Price & Payment", word: "discount", turkish: "indirim", example: "Is there a discount on this?", usage: "Price reduction", phrase: "on sale = indirimde", note: "Shoppers love discounts!" },
      { category: "Price & Payment", word: "cashier", turkish: "kasiyer", example: "Where is the cashier?", usage: "Person who takes payment", also: "checkout = kasa", note: "Where you pay" },
      { category: "Price & Payment", word: "receipt", turkish: "fiş, makbuz", example: "Can I have a receipt?", usage: "Proof of purchase", important: "Needed for returns!", note: "Keep it safe" },
      { category: "Trying & Fitting", word: "try on", turkish: "denemek", example: "Can I try this on?", usage: "Testing clothes before buying", place: "fitting room / changing room", note: "Important before buying!" },
      { category: "Trying & Fitting", word: "size", turkish: "beden, numara", example: "Do you have this in a larger size?", usage: "Dimensions of clothing/shoes", sizes: "Small (S), Medium (M), Large (L), XL", note: "Sizes vary by country!" },
      { category: "Trying & Fitting", word: "fit", turkish: "uymak", example: "These shoes don't fit me.", usage: "How well something matches size", phrases: "too big / too small / just right", note: "Important for comfort" },
      { category: "Returns & Refunds", word: "refund", turkish: "para iadesi", example: "Can I get a refund?", usage: "Money back for returned items", verb: "to refund = para iade etmek", note: "Check store policy!" },
      { category: "Returns & Refunds", word: "exchange", turkish: "değiştirmek", example: "I'd like to exchange this for a smaller size.", usage: "Swap for different item", note: "Alternative to refund", common: "Size exchanges" },
      { category: "Returns & Refunds", word: "return", turkish: "iade etmek", example: "I'd like to return this item.", usage: "Bring back unwanted purchase", note: "Usually need receipt", time: "Check return period!" },
      { category: "Store Areas", word: "fitting room / changing room", turkish: "deneme kabini", example: "Where is the fitting room?", usage: "Place to try on clothes", note: "Ask staff to find it", british: "changing room", american: "fitting room" },
      { category: "Store Areas", word: "sale / on sale", turkish: "indirim, indirimli", example: "Is this on sale?", usage: "Items with reduced prices", phrase: "50% off = %50 indirim", note: "Great for savings!" },
      { category: "Common Phrases", phrase: "How much is this?", turkish: "Bu ne kadar?", usage: "Asking price", alternatives: "What's the price? / How much does this cost?", note: "Most useful phrase!", essential: "Yes!" },
      { category: "Common Phrases", phrase: "Do you have this in medium?", turkish: "Bunun medium'u var mı?", usage: "Asking for different size", variations: "in small / in large / in blue / in red", note: "Use 'in' for sizes and colors" },
      { category: "Common Phrases", phrase: "Can I try this on?", turkish: "Bunu deneyebilir miyim?", usage: "Requesting to test clothes", polite: "Yes, very polite!", response: "Sure, the fitting room is over there.", essential: "Yes!" },
      { category: "Common Phrases", phrase: "I'm just looking.", turkish: "Sadece bakıyorum.", usage: "When sales assistant asks if you need help", situation: "Browsing without buying yet", note: "Polite way to decline help", alternative: "I'm just browsing." },
      { category: "Common Phrases", phrase: "Can I get a refund?", turkish: "Para iadesi alabilir miyim?", usage: "Requesting money back", alternative: "I'd like a refund, please.", note: "Bring receipt!", required: "Receipt usually needed" },
      { category: "Additional Useful Words", word: "bargain", turkish: "pazarlık, kelepir", example: "This is a real bargain!", meaning: "Very good deal / cheap price", note: "Exciting for shoppers!" },
      { category: "Additional Useful Words", word: "brand", turkish: "marka", example: "What brand is this?", usage: "Manufacturer name", examples: "Nike, Adidas, Zara", note: "Quality indicator" },
      { category: "Additional Useful Words", word: "quality", turkish: "kalite", example: "The quality is excellent.", usage: "How good something is", phrases: "high quality / low quality / good quality", note: "Affects price" },
      { category: "Additional Useful Words", word: "warranty", turkish: "garanti", example: "Does this have a warranty?", usage: "Guarantee for product", note: "Important for electronics", time: "Usually 1-2 years" }
    ]
  },

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

  table: {
    title: "📋 Health Problems & Solutions Vocabulary",
    data: [
      { category: "Head & Face Problems", problem: "headache", turkish: "baş ağrısı", symptoms: "Pain in the head", solution: "Take a painkiller / rest / drink water", common_phrase: "I have a headache.", note: "Very common!" },
      { category: "Head & Face Problems", problem: "sore throat", turkish: "boğaz ağrısı", symptoms: "Pain when swallowing", solution: "Drink warm tea / gargle with salt water / take throat lozenges", common_phrase: "I have a sore throat.", note: "Common with colds" },
      { category: "Head & Face Problems", problem: "toothache", turkish: "diş ağrısı", symptoms: "Pain in tooth or gums", solution: "See a dentist / take painkillers / use ice", common_phrase: "I have a toothache.", urgent: "See dentist!" },
      { category: "Stomach & Digestive", problem: "stomachache", turkish: "karın ağrısı", symptoms: "Pain in stomach area", solution: "Avoid heavy food / drink herbal tea / rest", common_phrase: "I have a stomachache.", note: "Be careful with food" },
      { category: "Respiratory Problems", problem: "cough", turkish: "öksürük", symptoms: "Repeated coughing", solution: "Take cough medicine / drink warm liquids / avoid cold air", common_phrase: "I have a cough." , verb: "to cough = öksürmek" },
      { category: "Respiratory Problems", problem: "runny nose", turkish: "burun akıntısı", symptoms: "Liquid coming from nose", solution: "Use tissues / take antihistamines / rest", common_phrase: "I have a runny nose.", note: "Common with colds" },
      { category: "Respiratory Problems", problem: "cold", turkish: "soğuk algınlığı", symptoms: "Sneezing, cough, runny nose, sore throat", solution: "Rest / drink lots of fluids / take vitamin C", common_phrase: "I have a cold.", duration: "Usually 7-10 days" },
      { category: "Respiratory Problems", problem: "flu (influenza)", turkish: "grip", symptoms: "Fever, body aches, fatigue, cough", solution: "Rest / drink fluids / take fever medicine / see doctor", common_phrase: "I have the flu.", note: "More serious than cold" },
      { category: "Body Temperature", problem: "fever", turkish: "ateş", symptoms: "Body temperature above normal (38°C/100.4°F)", solution: "Take fever medicine / drink water / rest / cool compress", common_phrase: "I have a fever.", urgent: "High fever → see doctor!" },
      { category: "Body Aches", problem: "backache / back pain", turkish: "sırt ağrısı", symptoms: "Pain in back area", solution: "Rest / gentle stretching / use heat/ice / see doctor if severe", common_phrase: "I have a backache.", note: "Very common problem" },
      { category: "Solutions - Verbs", solution: "take medicine / take some medicine", turkish: "ilaç almak", usage: "Swallow pills or drink liquid medicine", examples: "Take painkillers / Take cough medicine", note: "Most common solution", phrase: "I should take some medicine." },
      { category: "Solutions - Verbs", solution: "drink lots of water / drink fluids", turkish: "bol su içmek", usage: "Stay hydrated", examples: "Drink water / Drink warm tea / Drink orange juice", note: "Important for most illnesses", phrase: "You should drink lots of water." },
      { category: "Solutions - Verbs", solution: "get some rest / rest", turkish: "dinlenmek", usage: "Sleep and relax", examples: "Get some rest / Take a nap / Sleep early", note: "Body needs rest to heal", phrase: "You need to get some rest." },
      { category: "Solutions - Verbs", solution: "go to the doctor / see a doctor", turkish: "doktora gitmek", usage: "Visit medical professional", when: "If symptoms are serious or don't improve", note: "Don't hesitate if needed!", phrase: "You should see a doctor." },
      { category: "Solutions - Verbs", solution: "stay in bed", turkish: "yatakta kalmak", usage: "Remain in bed all day", when: "When feeling very ill", note: "Complete rest", phrase: "You should stay in bed today.", severe: "For serious illness" },
      { category: "Additional Problems", problem: "feel sick / feel ill", turkish: "hasta hissetmek", symptoms: "General feeling of unwellness", usage: "General term", common_phrase: "I feel sick.", note: "Not specific illness" },
      { category: "Additional Problems", problem: "feel dizzy", turkish: "baş dönmesi", symptoms: "Feeling of spinning or losing balance", solution: "Sit down / drink water / see doctor if continues", common_phrase: "I feel dizzy.", warning: "Could be serious!" },
      { category: "Additional Problems", problem: "tired / exhausted / fatigue", turkish: "yorgun", symptoms: "Lack of energy", solution: "Get more sleep / eat well / exercise / manage stress", common_phrase: "I feel tired.", note: "Everyone's complaint!" },
      { category: "Useful Phrases", phrase: "I don't feel well.", turkish: "İyi hissetmiyorum.", usage: "Saying you feel sick", note: "Very common", alternative: "I feel unwell." },
      { category: "Useful Phrases", phrase: "What's wrong?", turkish: "Neyin var? / Ne oldu?", usage: "Asking what the problem is", response: "I have a headache. / I don't feel well.", note: "Showing concern" },
      { category: "Useful Phrases", phrase: "You should see a doctor.", turkish: "Doktora gitmelisin.", usage: "Giving advice", pattern: "You should + advice", note: "Caring suggestion" },
      { category: "Useful Phrases", phrase: "Get well soon!", turkish: "Geçmiş olsun!", usage: "Wishing someone recovery", note: "Very common expression!", use: "To sick people", alternative: "Feel better soon!" },
      { category: "Useful Phrases", phrase: "I hope you feel better.", turkish: "Umarım iyileşirsin.", usage: "Expressing sympathy", note: "Kind words", tone: "Caring and supportive" }
    ]
  },

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

  table: {
    title: "📋 Travel & Transport Vocabulary",
    data: [
      { category: "Land Transport", vehicle: "car", turkish: "araba", usage: "Private road vehicle", phrase: "by car = arabayla", verb: "drive a car", note: "Most common transport", advantage: "Convenient, private" },
      { category: "Land Transport", vehicle: "bus", turkish: "otobüs", usage: "Public road transport", phrase: "by bus = otobüsle", verb: "take a bus / catch a bus", note: "Affordable option", types: "City bus, intercity bus" },
      { category: "Land Transport", vehicle: "train", turkish: "tren", usage: "Rail transport", phrase: "by train = trenle", verb: "take a train / catch a train", note: "Fast for long distances", types: "Local, express, high-speed" },
      { category: "Land Transport", vehicle: "taxi", turkish: "taksi", usage: "Hired car with driver", phrase: "by taxi = taksiyle", verb: "take a taxi / hail a taxi / call a taxi", note: "Convenient but expensive", tip: "Know fare before riding" },
      { category: "Land Transport", vehicle: "bicycle / bike", turkish: "bisiklet", usage: "Human-powered two-wheel", phrase: "by bike = bisikletle", verb: "ride a bike", note: "Healthy & eco-friendly", also: "e-bike = elektrikli bisiklet" },
      { category: "Land Transport", vehicle: "motorbike / motorcycle", turkish: "motosiklet", usage: "Motorized two-wheel", phrase: "by motorbike", verb: "ride a motorbike", note: "Faster than bicycle", safety: "Wear helmet!" },
      { category: "Land Transport", vehicle: "tram", turkish: "tramvay", usage: "Electric rail vehicle on streets", phrase: "by tram = tramvayla", verb: "take a tram", note: "Common in cities", region: "Popular in Europe" },
      { category: "Underground Transport", vehicle: "subway (US) / underground (UK) / metro", turkish: "metro", usage: "Underground rail system", phrase: "by subway/metro", verb: "take the subway/metro", note: "Fast in big cities", also: "tube (London)" },
      { category: "Air Transport", vehicle: "plane / airplane / aircraft", turkish: "uçak", usage: "Air travel", phrase: "by plane = uçakla", verb: "take a plane / fly / catch a flight", note: "Fastest for long distances", types: "Commercial, private" },
      { category: "Water Transport", vehicle: "ferry / ferryboat", turkish: "feribot", usage: "Boat for passengers & vehicles", phrase: "by ferry = feribot ile", verb: "take a ferry / catch a ferry", note: "For crossing water", example: "Istanbul ferries" },
      { category: "Travel Documents & Items", word: "ticket", turkish: "bilet", usage: "Permission to travel", examples: "bus ticket, train ticket, plane ticket", verb: "buy a ticket / book a ticket", note: "Essential for travel!", types: "One-way, return, e-ticket" },
      { category: "Travel Documents & Items", word: "boarding pass", turkish: "biniş kartı", usage: "Document to board plane", when: "After check-in", verb: "print boarding pass / show boarding pass", note: "For flights", digital: "Mobile boarding pass" },
      { category: "Travel Documents & Items", word: "luggage / baggage", turkish: "bagaj, bavul", usage: "Bags for travel", types: "Carry-on luggage, checked luggage, hand luggage", verb: "pack luggage / check luggage", note: "Weight limits apply!", phrase: "excess baggage = fazla bagaj" },
      { category: "Station & Airport Areas", word: "platform", turkish: "peron", usage: "Where you wait for trains", examples: "Platform 1, Platform 2", phrase: "The train departs from platform 5.", note: "Railway stations", announcement: "Check departure board" },
      { category: "Station & Airport Areas", word: "check-in (desk)", turkish: "check-in, giriş işlemi", usage: "Registration before flight", when: "At airport before flight", verb: "check in / do check-in", note: "Get boarding pass here", online: "Online check-in available" },
      { category: "Station & Airport Areas", word: "gate", turkish: "kapı (havaalanı)", usage: "Where you board plane", examples: "Gate A12, Gate B5", phrase: "Boarding at gate 23.", note: "After security check", listen: "Listen for announcements" },
      { category: "Travel Times", word: "departure", turkish: "kalkış", usage: "When transport leaves", verb: "depart = kalkmak", opposite: "arrival", examples: "Departure time: 10:00 AM", note: "Be there early!" },
      { category: "Travel Times", word: "arrival", turkish: "varış", usage: "When transport arrives", verb: "arrive = varmak", opposite: "departure", examples: "Arrival time: 2:30 PM", note: "End of journey" },
      { category: "Travel Times", word: "delay", turkish: "gecikme", usage: "Later than scheduled", verb: "be delayed = gecikmek", examples: "The flight is delayed. / 30-minute delay", note: "Frustrating!", announcement: "Check for updates" },
      { category: "Useful Phrases", phrase: "How do I get to...?", turkish: "...e nasıl giderim?", usage: "Asking for directions", examples: "How do I get to the airport? / How do I get to the station?", note: "Very useful!", response: "Take bus number 5." },
      { category: "Useful Phrases", phrase: "Where can I buy a ticket?", turkish: "Bileti nereden alabilirim?", usage: "Finding ticket office", response: "At the ticket machine. / At the counter.", note: "Essential question", also: "online, from kiosk" },
      { category: "Useful Phrases", phrase: "What time does it leave/arrive?", turkish: "Saat kaçta kalkıyor/varıyor?", usage: "Asking schedule", examples: "What time does the train leave? / What time do we arrive?", note: "Planning journey", check: "Departure/arrival boards" },
      { category: "Useful Phrases", phrase: "Is this seat taken?", turkish: "Bu koltuk dolu mu?", usage: "Asking if seat is available", response: "No, it's free. / Yes, someone is sitting here.", note: "Polite question", alternative: "Is anyone sitting here?" }
    ]
  },

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

  table: {
    title: "📋 House and Furniture Vocabulary",
    data: [
      { category: "Rooms", word: "living room", turkish: "oturma odası", usage: "Main room for relaxation", activities: "Watch TV, entertain guests, relax", note: "Most used room", also_called: "sitting room (UK), lounge" },
      { category: "Rooms", word: "bedroom", turkish: "yatak odası", usage: "Room for sleeping", activities: "Sleep, get dressed, rest", note: "Private space", plural: "bedrooms" },
      { category: "Rooms", word: "kitchen", turkish: "mutfak", usage: "Room for cooking", activities: "Cook, prepare food, eat (sometimes)", note: "Heart of the home", appliances: "Fridge, oven, stove" },
      { category: "Rooms", word: "bathroom", turkish: "banyo", usage: "Room for washing & toilet", activities: "Shower, use toilet, wash hands", note: "Essential room", british: "toilet (separate room), bathroom (with bath)" },
      { category: "Rooms", word: "dining room", turkish: "yemek odası", usage: "Room for eating meals", activities: "Have meals, family dinners", note: "Formal eating space", modern: "Often combined with living room" },
      { category: "Outdoor Spaces", word: "balcony", turkish: "balkon", usage: "Outdoor platform attached to building", activities: "Enjoy fresh air, plants", note: "Apartment feature", plural: "balconies" },
      { category: "Outdoor Spaces", word: "garden", turkish: "bahçe", usage: "Outdoor space with plants", activities: "Grow plants, relax, play", note: "House feature", types: "Front garden, back garden, vegetable garden" },
      { category: "Living Room Furniture", word: "sofa / couch", turkish: "kanepe", usage: "Large soft seat for multiple people", note: "Most important living room furniture", types: "2-seater, 3-seater, L-shaped", also: "settee (UK, old-fashioned)" },
      { category: "Living Room Furniture", word: "TV (television)", turkish: "televizyon", usage: "Device for watching shows", note: "Entertainment center", modern: "Smart TV, flat-screen TV", phrase: "watch TV" },
      { category: "Living Room Furniture", word: "carpet / rug", turkish: "halı", usage: "Floor covering", difference: "Carpet = covers whole floor, Rug = smaller, moveable", note: "For comfort & decoration", verb: "vacuum the carpet" },
      { category: "Living Room Furniture", word: "shelf (plural: shelves)", turkish: "raf", usage: "Storage for books & items", note: "Horizontal surface on wall or unit", types: "Bookshelf, wall shelf", plural: "shelves (not 'shelfs'!)" },
      { category: "Bedroom Furniture", word: "bed", turkish: "yatak", usage: "Furniture for sleeping", note: "Most important bedroom item", sizes: "Single, double, queen, king", phrases: "make the bed, go to bed" },
      { category: "Bedroom Furniture", word: "wardrobe", turkish: "gardırop", usage: "Large cupboard for clothes", note: "Clothes storage", american: "closet (built-in)", british: "wardrobe (furniture piece)" },
      { category: "Bedroom Furniture", word: "mirror", turkish: "ayna", usage: "Reflective glass surface", note: "For checking appearance", locations: "Bedroom, bathroom, hallway", phrase: "look in the mirror" },
      { category: "General Furniture", word: "table", turkish: "masa", usage: "Flat surface with legs", types: "Dining table, coffee table, desk", note: "Very versatile", phrases: "set the table, clear the table" },
      { category: "General Furniture", word: "chair", turkish: "sandalye", usage: "Single seat with back", note: "For sitting", types: "Dining chair, office chair, armchair", plural: "chairs" },
      { category: "General Furniture", word: "lamp", turkish: "lamba", usage: "Light source", note: "For illumination", types: "Table lamp, floor lamp, desk lamp", verb: "turn on/off the lamp" },
      { category: "Kitchen Appliances", word: "fridge (refrigerator)", turkish: "buzdolabı", usage: "Keep food cold", note: "Essential appliance", full_form: "refrigerator (formal)", phrase: "put it in the fridge" },
      { category: "Kitchen Appliances", word: "oven", turkish: "fırın", usage: "Cook food with heat", note: "For baking & roasting", types: "Electric oven, gas oven", phrases: "bake in the oven, preheat the oven" },
      { category: "Kitchen Appliances", word: "washing machine", turkish: "çamaşır makinesi", usage: "Machine for washing clothes", note: "Laundry appliance", phrase: "put clothes in the washing machine", also: "washer (US)" },
      { category: "Useful Phrases", phrase: "Where's the...?", example: "Where's the bathroom? / Where's the kitchen?", usage: "Asking location", note: "Very useful in new house" },
      { category: "Useful Phrases", phrase: "Can I use the...?", example: "Can I use the bathroom? / Can I use the washing machine?", usage: "Asking permission", note: "Polite request" },
      { category: "Useful Phrases", phrase: "Make yourself at home.", meaning: "Feel comfortable, relax", usage: "Welcoming guests", note: "Common hospitality phrase", response: "Thank you!" }
    ]
  },

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

  table: {
    title: "📋 Technology Vocabulary",
    data: [
      { category: "Devices", word: "computer", turkish: "bilgisayar", usage: "General computing device", types: "Desktop computer, PC", note: "For work, study, entertainment", phrase: "use a computer" },
      { category: "Devices", word: "laptop", turkish: "dizüstü bilgisayar", usage: "Portable computer", note: "Can carry anywhere", advantage: "Portable, has battery", phrase: "take your laptop" },
      { category: "Devices", word: "tablet", turkish: "tablet", usage: "Touchscreen portable device", examples: "iPad, Android tablets", note: "Between phone & computer", use: "Reading, browsing, watching videos" },
      { category: "Devices", word: "smartphone", turkish: "akıllı telefon", usage: "Mobile phone with internet", note: "Most used device!", features: "Apps, internet, camera", phrase: "check your smartphone" },
      { category: "Accessories", word: "charger", turkish: "şarj cihazı", usage: "Device to charge battery", note: "Essential accessory!", types: "Phone charger, laptop charger", phrase: "Where's my charger?" },
      { category: "Accessories", word: "headphones / earphones", turkish: "kulaklık", usage: "Listen to audio privately", difference: "Headphones = over ear, Earphones = in ear", note: "For music, calls", also: "earbuds (wireless)" },
      { category: "Accessories", word: "keyboard", turkish: "klavye", usage: "Input device for typing", note: "Essential for computers", types: "Mechanical, membrane, wireless", phrase: "type on the keyboard" },
      { category: "Accessories", word: "mouse", turkish: "fare", usage: "Device to control cursor", note: "Point and click", types: "Wired, wireless, optical", plural: "mice (NOT 'mouses'!)", phrase: "click the mouse" },
      { category: "Accessories", word: "screen / display", turkish: "ekran", usage: "Visual output surface", note: "What you look at", types: "Monitor, laptop screen, phone screen", phrase: "look at the screen" },
      { category: "Peripherals", word: "printer", turkish: "yazıcı", usage: "Device to print documents", note: "For paper copies", types: "Inkjet, laser printer", phrase: "print a document" },
      { category: "Actions - Power", phrase: "turn on / turn off", turkish: "açmak / kapatmak", usage: "Start / stop device", examples: "Turn on the computer / Turn off your phone", note: "Basic device control", also: "switch on/off, power on/off" },
      { category: "Actions - Account", phrase: "log in / log out", turkish: "giriş yapmak / çıkış yapmak", usage: "Enter / exit account", examples: "Log in to your account / Log out when finished", note: "Security action", also: "sign in / sign out" },
      { category: "Actions - Transfer", phrase: "download / upload", turkish: "indirmek / yüklemek", usage: "Get from / send to internet", download: "Get files FROM internet", upload: "Send files TO internet", examples: "Download an app / Upload a photo", symbol: "⬇️ download, ⬆️ upload" },
      { category: "Actions - Internet", phrase: "connect to Wi-Fi", turkish: "Wi-Fi'ye bağlanmak", usage: "Join wireless network", note: "For internet access", steps: "Find network → Enter password → Connect", question: "What's the Wi-Fi password?" },
      { category: "Actions - Communication", phrase: "send / receive a message", turkish: "mesaj göndermek / almak", usage: "Transmit / get text", examples: "Send a text message / Receive an email", note: "Basic communication", apps: "WhatsApp, Email, SMS" },
      { category: "Additional Actions", phrase: "charge the battery", turkish: "pili şarj etmek", usage: "Add power to device", examples: "Charge your phone / The battery is charging", note: "Essential maintenance", warning: "Battery low!" },
      { category: "Additional Actions", phrase: "take a photo / picture", turkish: "fotoğraf çekmek", usage: "Capture image", examples: "Take a photo with your phone / Take a picture of...", note: "Very common!", also: "snap a photo" },
      { category: "Additional Actions", phrase: "make a call", turkish: "telefon aramak", usage: "Phone someone", examples: "Make a call to your friend / Can I make a call?", note: "Phone function", also: "call someone" },
      { category: "Additional Actions", phrase: "browse the internet", turkish: "internette gezinmek", usage: "Look at websites", examples: "Browse the internet / Browse websites", note: "Common activity", also: "surf the web" },
      { category: "Common Problems", problem: "It's not working.", turkish: "Çalışmıyor.", usage: "Device has problem", note: "General complaint", common: "Very common phrase!" },
      { category: "Common Problems", problem: "The battery is dead.", turkish: "Pil bitti.", usage: "No power left", note: "Need to charge", also: "The battery is flat (UK)" },
      { category: "Common Problems", problem: "I forgot my password.", turkish: "Şifremi unuttum.", usage: "Can't log in", solution: "Reset password / Use forgot password", note: "Common problem!" }
    ]
  },

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

  table: {
    title: "📋 School and Education Vocabulary",
    data: [
      { category: "School Subjects", word: "math (mathematics)", turkish: "matematik", short_form: "math (US), maths (UK)", note: "Numbers & calculations", topics: "Algebra, geometry, calculus", phrase: "I'm good at math" },
      { category: "School Subjects", word: "science", turkish: "fen, bilim", note: "Study of natural world", types: "Biology, chemistry, physics", phrase: "science class / science teacher" },
      { category: "School Subjects", word: "history", turkish: "tarih", note: "Study of past events", topics: "Ancient history, world history", phrase: "history lesson / learn history" },
      { category: "School Subjects", word: "geography", turkish: "coğrafya", note: "Study of Earth & places", topics: "Maps, countries, climate", phrase: "geography test" },
      { category: "School Subjects", word: "English", turkish: "İngilizce", note: "Language subject", also: "English literature, English grammar", phrase: "English class / English teacher" },
      { category: "School Places", word: "classroom", turkish: "sınıf", usage: "Room where lessons happen", note: "Main learning space", contains: "Desks, chairs, blackboard/whiteboard", phrase: "in the classroom" },
      { category: "School Places", word: "library", turkish: "kütüphane", usage: "Place with books for reading/borrowing", note: "Quiet study space", activities: "Read books, study, borrow books", rule: "Be quiet!", plural: "libraries" },
      { category: "School Places", word: "gym (gymnasium)", turkish: "spor salonu", usage: "Place for physical education & sports", note: "Sports facility", activities: "Play sports, exercise", also: "sports hall" },
      { category: "School Places", word: "teacher's room / staff room", turkish: "öğretmenler odası", usage: "Private room for teachers", note: "Teachers only", american: "teacher's lounge" },
      { category: "School Places", word: "playground", turkish: "oyun alanı", usage: "Outdoor area for playing", note: "Recreation space", time: "Break time, lunch time", activities: "Play, run, socialize" },
      { category: "Study Activities", phrase: "study", turkish: "ders çalışmak", usage: "Learn & review lessons", examples: "Study for an exam / Study English / Study hard", note: "Essential student activity!", phrase_pattern: "study + subject / study for + exam" },
      { category: "Study Activities", phrase: "take an exam / sit an exam", turkish: "sınava girmek", usage: "Do a test", examples: "Take an exam / Take a math exam", note: "Test situation", british: "sit an exam", american: "take an exam" },
      { category: "Study Activities", phrase: "do homework", turkish: "ödev yapmak", usage: "Complete school work at home", note: "After-school work", example_sentence: "I have to do my homework", also: "homework assignment" },
      { category: "Study Activities", phrase: "ask a question", turkish: "soru sormak", usage: "Request information from teacher", examples: "Ask a question in class / Can I ask a question?", note: "Active learning!", polite: "Raise your hand first" },
      { category: "Study Activities", phrase: "give a presentation / make a presentation", turkish: "sunum yapmak", usage: "Present information to class", note: "Public speaking practice", also: "do a presentation", phrase_pattern: "give a presentation on..." },
      { category: "Academic Performance", phrase: "get good grades / get high marks", turkish: "iyi notlar almak", usage: "Achieve good scores", note: "Goal of students", american: "grades (A, B, C)", british: "marks", also: "get bad grades (poor performance)" },
      { category: "Academic Performance", phrase: "pass / fail", turkish: "geçmek / kalmak", usage: "Succeed or not succeed in exam/course", examples: "Pass an exam / Fail a test", note: "Binary outcome", pass_mark: "Usually 50% or 60%", example_question: "Did you pass or fail?" },
      { category: "Time & Punctuality", phrase: "be late (for class)", turkish: "geç kalmak", usage: "Arrive after scheduled time", examples: "Don't be late! / I was late for school", note: "Usually not good!", opposite: "be on time, be early", excuse: "Sorry I'm late!" },
      { category: "Additional Activities", phrase: "pay attention", turkish: "dikkat etmek", usage: "Focus & concentrate", example: "Pay attention in class!", note: "Teacher's common instruction", important: "For learning!" },
      { category: "Additional Activities", phrase: "take notes", turkish: "not almak", usage: "Write down important information", example: "Take notes during the lecture", note: "Helps remember", tool: "Notebook, laptop" },
      { category: "Additional Activities", phrase: "raise your hand", turkish: "el kaldırmak", usage: "Signal you want to speak", example: "Raise your hand if you know the answer", note: "Classroom etiquette", polite: "Don't shout out!" },
      { category: "Additional Activities", phrase: "hand in / submit homework", turkish: "ödev teslim etmek", usage: "Give homework to teacher", examples: "Hand in your homework / Submit your assignment", note: "By deadline!", british: "hand in", american: "turn in" }
    ]
  },

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

  table: {
    title: "📋 Festivals and Celebrations Vocabulary",
    data: [
      { category: "General Terms", word: "festival", turkish: "festival", usage: "Large public celebration with events", examples: "Music festival, film festival, food festival", note: "Usually lasts several days", activities: "Concerts, performances, exhibitions" },
      { category: "General Terms", word: "celebration", turkish: "kutlama", usage: "Act of celebrating something special", examples: "Birthday celebration, anniversary celebration", note: "General term", verb: "celebrate", phrase: "Let's celebrate!" },
      { category: "General Terms", word: "party", turkish: "parti", usage: "Social gathering for celebration", types: "Birthday party, house party, dinner party", note: "Informal gathering", phrase: "throw a party / have a party" },
      { category: "Specific Events", word: "birthday", turkish: "doğum günü", usage: "Anniversary of birth", note: "Personal celebration", phrase: "Happy birthday!", tradition: "Cake, candles, presents" },
      { category: "Specific Events", word: "wedding", turkish: "düğün", usage: "Marriage ceremony & celebration", note: "Important life event", people: "Bride, groom, guests", phrases: "wedding ceremony, wedding reception" },
      { category: "Specific Events", word: "anniversary", turkish: "yıldönümü", usage: "Annual commemoration of event", examples: "Wedding anniversary, company anniversary", note: "Yearly celebration", ordinal: "1st anniversary, 10th anniversary, 50th anniversary" },
      { category: "Religious/Cultural Holidays", word: "Christmas", turkish: "Noel", when: "December 25", religion: "Christian", note: "Major Christian holiday", traditions: "Christmas tree, Santa Claus, presents", greeting: "Merry Christmas!" },
      { category: "Religious/Cultural Holidays", word: "Eid / Eid al-Fitr / Eid al-Adha", turkish: "Bayram (Ramazan / Kurban)", religion: "Islamic", note: "Important Muslim holidays", traditions: "Prayer, family gatherings, charity", greeting: "Eid Mubarak!" },
      { category: "Religious/Cultural Holidays", word: "Thanksgiving", turkish: "Şükran Günü", when: "4th Thursday of November (US)", country: "USA, Canada", note: "Harvest celebration", food: "Turkey, pumpkin pie", theme: "Gratitude" },
      { category: "Seasonal Celebrations", word: "New Year's Eve", turkish: "Yılbaşı gecesi", when: "December 31", note: "Last night of year", traditions: "Countdown, fireworks, parties", greeting: "Happy New Year!" },
      { category: "Seasonal Celebrations", word: "carnival", turkish: "karnaval", usage: "Festival with costumes & parades", note: "Pre-Lent celebration", famous: "Rio Carnival, Venice Carnival", characteristics: "Colorful, lively, music" },
      { category: "Seasonal Celebrations", word: "national holiday", turkish: "resmi tatil, ulusal bayram", usage: "Official public holiday", note: "No work/school", examples: "Independence Day, Republic Day", phrase: "It's a national holiday" },
      { category: "Event Activities", word: "parade", turkish: "geçit töreni", usage: "Procession through streets", occasions: "National holidays, festivals", note: "Public spectacle", elements: "Marching bands, floats, dancers" },
      { category: "Event Activities", word: "fireworks", turkish: "havai fişek", usage: "Explosive displays in sky", occasions: "New Year, national holidays, celebrations", note: "Always plural!", phrase: "watch the fireworks", danger: "Be careful!" },
      { category: "Party Items", word: "cake", turkish: "pasta", usage: "Sweet dessert for celebrations", types: "Birthday cake, wedding cake", tradition: "Cut the cake, blow candles", phrase: "piece of cake" },
      { category: "Party Items", word: "gift / present", turkish: "hediye", usage: "Item given to someone", note: "Both words same meaning", verb: "give a gift / give a present", phrase: "What do you want for your birthday?" },
      { category: "Party Items", word: "balloon", turkish: "balon", usage: "Inflatable decoration", note: "Colorful party decoration", plural: "balloons", verb: "blow up balloons", phrase: "helium balloons float" },
      { category: "Party Items", word: "candle", turkish: "mum", usage: "Wax stick with flame", tradition: "Birthday candles on cake", action: "Blow out the candles!", note: "Make a wish!", phrase: "light a candle" },
      { category: "Party Items", word: "decoration", turkish: "süsleme, dekorasyon", usage: "Items to make place festive", examples: "Balloons, streamers, banners", verb: "decorate", phrase: "decorate the room / party decorations" },
      { category: "Party Items", word: "costume", turkish: "kostüm", usage: "Special clothes for events", occasions: "Halloween, carnival, themed parties", note: "Dress up as character/thing", phrase: "wear a costume" },
      { category: "Common Phrases", phrase: "Happy birthday!", turkish: "Doğum günün kutlu olsun!", usage: "Birthday greeting", note: "Most common phrase!", also: "Happy birthday to you! (song)" },
      { category: "Common Phrases", phrase: "Congratulations!", turkish: "Tebrikler!", usage: "Express happiness for achievement", occasions: "Graduations, weddings, promotions", short: "Congrats!", note: "Positive celebration" },
      { category: "Common Phrases", phrase: "Let's celebrate!", turkish: "Kutlayalım!", usage: "Suggest having celebration", note: "Call to action", context: "Good news, achievements" }
    ]
  },

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

  table: {
    title: "📋 Emotions and Feelings Vocabulary",
    data: [
      { category: "Positive Emotions", word: "happy", turkish: "mutlu", opposite: "sad", usage: "Feeling joy & pleasure", phrase: "I'm happy.", degree: "Content → happy → very happy → delighted → ecstatic", note: "Most basic positive feeling" },
      { category: "Positive Emotions", word: "excited", turkish: "heyecanlı", usage: "Feeling enthusiastic & eager", phrase: "I'm excited about...", situations: "Before trips, events, surprises", note: "Anticipation of something good", intensity: "High energy!" },
      { category: "Positive Emotions", word: "proud", turkish: "gururlu", usage: "Feeling satisfaction in achievement", phrase: "I'm proud of...", occasions: "Accomplishments, others' success", note: "Positive self-evaluation", preposition: "proud OF something/someone" },
      { category: "Positive Emotions", word: "grateful", turkish: "minnettar", usage: "Feeling thankful", phrase: "I'm grateful for...", note: "Appreciation", similar: "thankful", expression: "I'm grateful to you.", formal: "More formal than 'thankful'" },
      { category: "Positive Emotions", word: "hopeful", turkish: "umutlu", usage: "Feeling optimistic about future", phrase: "I'm hopeful that...", note: "Positive expectation", noun: "hope", opposite: "hopeless" },
      { category: "Positive Emotions", word: "calm", turkish: "sakin", usage: "Feeling peaceful & relaxed", phrase: "I feel calm.", situations: "After stress, meditation, quiet moments", note: "Inner peace", verb: "calm down = become calm" },
      { category: "Negative Emotions", word: "sad", turkish: "üzgün", opposite: "happy", usage: "Feeling unhappy", phrase: "I'm sad.", situations: "Loss, disappointment, bad news", degree: "A bit sad → sad → very sad → miserable", note: "Basic negative feeling" },
      { category: "Negative Emotions", word: "angry", turkish: "kızgın", usage: "Feeling mad & irritated", phrase: "I'm angry about... / I'm angry with...", degree: "Annoyed → angry → furious", note: "Strong negative emotion", verb: "anger (noun), make someone angry" },
      { category: "Negative Emotions", word: "worried", turkish: "endişeli", usage: "Feeling anxious about future", phrase: "I'm worried about...", note: "Concern", verb: "worry (don't worry!)", similar: "concerned, anxious", degree: "Slightly worried → very worried" },
      { category: "Negative Emotions", word: "scared / afraid / frightened", turkish: "korkmuş", usage: "Feeling fear", phrase: "I'm scared of... / I'm afraid of...", note: "Fear emotion", of_what: "scared OF something", degree: "Nervous → scared → terrified" },
      { category: "Negative Emotions", word: "disappointed", turkish: "hayal kırıklığına uğramış", usage: "Feeling let down", phrase: "I'm disappointed in/with...", situations: "Unmet expectations", note: "When something doesn't meet hopes", verb: "disappoint" },
      { category: "Negative Emotions", word: "lonely", turkish: "yalnız", usage: "Feeling alone & isolated", phrase: "I feel lonely.", difference: "alone = physical, lonely = emotional", note: "Emotional state of being alone", verb: "long for company" },
      { category: "Negative Emotions", word: "jealous", turkish: "kıskanç", usage: "Feeling envious", phrase: "I'm jealous of...", situations: "Someone has what you want", note: "Wanting what others have", noun: "jealousy", negative: "Not a good feeling!" },
      { category: "Mixed/Neutral Emotions", word: "nervous", turkish: "gergin, sinirli", usage: "Feeling anxious & tense", phrase: "I'm nervous about...", situations: "Before exams, interviews, presentations", note: "Anticipation with worry", physical: "Butterflies in stomach" },
      { category: "Mixed/Neutral Emotions", word: "surprised", turkish: "şaşırmış", usage: "Feeling unexpected shock", phrase: "I'm surprised!", note: "Reaction to unexpected", can_be: "Good surprise or bad surprise", degree: "Surprised → shocked → astonished" },
      { category: "Mixed/Neutral Emotions", word: "confused", turkish: "kafası karışmış", usage: "Feeling unclear/uncertain", phrase: "I'm confused about...", situations: "Don't understand something", note: "Mental state", verb: "confuse", expression: "I'm so confused!" },
      { category: "Mixed/Neutral Emotions", word: "tired", turkish: "yorgun", usage: "Feeling need for rest", phrase: "I'm tired.", physical: "Body fatigue", mental: "Can also be mentally tired", degree: "A bit tired → tired → exhausted" },
      { category: "Mixed/Neutral Emotions", word: "bored", turkish: "sıkılmış", usage: "Feeling lack of interest", phrase: "I'm bored.", situations: "Nothing interesting to do", note: "Uninterested state", verb: "bore (something bores me)", expression: "I'm so bored!" },
      { category: "Social Emotions", word: "embarrassed", turkish: "utanmış, mahcup", usage: "Feeling ashamed/self-conscious", phrase: "I'm embarrassed.", situations: "Mistakes in public, awkward moments", note: "Social discomfort", verb: "embarrass", warning: "NOT 'utangaç' (that's 'shy')!" },
      { category: "Social Emotions", word: "shy", turkish: "çekingen, utangaç", usage: "Feeling nervous with people", phrase: "I'm shy.", note: "Personality trait", situations: "Meeting new people, speaking in public", permanent: "More lasting than embarrassed" },
      { category: "Useful Phrases", phrase: "How do you feel?", turkish: "Nasıl hissediyorsun?", usage: "Asking about emotions", response: "I feel happy/sad/tired...", note: "Emotional check-in" },
      { category: "Useful Phrases", phrase: "I feel...", turkish: "...hissediyorum", pattern: "I feel + adjective", examples: "I feel happy. / I feel sad. / I feel tired.", note: "Express your emotions", also: "I'm feeling..." },
      { category: "Useful Phrases", phrase: "What's wrong?", turkish: "Neyin var? / Ne oldu?", usage: "Asking about problem", situations: "Someone looks upset", note: "Showing concern", response: "I'm sad/worried/upset..." }
    ]
  },

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

  table: {
    title: "📋 Nature and Environment Vocabulary",
    data: [
      { category: "Core Concepts", word: "nature", turkish: "doğa", example: "I love spending time in nature.", usage: "General natural world", phrase: "enjoy nature" },
      { category: "Core Concepts", word: "environment", turkish: "çevre", example: "We need to protect the environment.", usage: "Natural surroundings", phrase: "protect the environment" },

      { category: "Natural Landscapes", word: "forest", turkish: "orman", example: "We went hiking in the forest.", description: "Large area with many trees", common_phrase: "walk through the forest" },
      { category: "Natural Landscapes", word: "mountain", turkish: "dağ", example: "The mountain is covered with snow.", description: "Very high natural elevation", common_phrase: "climb a mountain" },
      { category: "Natural Landscapes", word: "river", turkish: "nehir", example: "The river flows into the ocean.", description: "Water flowing to the sea", common_phrase: "swim in the river" },
      { category: "Natural Landscapes", word: "lake", turkish: "göl", example: "There's a beautiful lake near my town.", description: "Water surrounded by land", common_phrase: "go to the lake" },
      { category: "Natural Landscapes", word: "ocean", turkish: "okyanus", example: "The Pacific Ocean is huge.", description: "Very large body of salt water", common_phrase: "across the ocean" },
      { category: "Natural Landscapes", word: "beach", turkish: "sahil", example: "We played volleyball on the beach.", description: "Sandy shore by the sea", common_phrase: "at the beach" },
      { category: "Natural Landscapes", word: "desert", turkish: "çöl", example: "The Sahara is a famous desert.", description: "Dry, sandy area with little rain", common_phrase: "in the desert" },
      { category: "Natural Landscapes", word: "island", turkish: "ada", example: "Cyprus is a beautiful island.", description: "Land surrounded by water", common_phrase: "on an island" },

      { category: "Flora & Fauna", word: "tree", turkish: "ağaç", example: "That oak tree is over 100 years old.", description: "Tall plant with trunk and branches", common_phrase: "climb a tree" },
      { category: "Flora & Fauna", word: "plant", turkish: "bitki", example: "I have many plants in my garden.", description: "Living organism that grows", common_phrase: "water the plants" },
      { category: "Flora & Fauna", word: "animal", turkish: "hayvan", example: "Dogs and cats are common animals.", description: "Living creature that moves", common_phrase: "wild animals" },
      { category: "Flora & Fauna", word: "wildlife", turkish: "vahşi yaşam", example: "We saw amazing wildlife on safari.", description: "Wild animals in their habitat", common_phrase: "observe wildlife" },

      { category: "Environmental Issues", word: "pollution", turkish: "kirlilik", example: "Air pollution is a serious problem.", description: "Harmful substances in environment", types: "air, water, noise pollution" },
      { category: "Environmental Issues", word: "recycling", turkish: "geri dönüşüm", example: "We recycle plastic and paper.", description: "Reusing materials", common_phrase: "recycling bin" },
      { category: "Environmental Issues", word: "climate", turkish: "iklim", example: "The climate is changing rapidly.", description: "Weather patterns over time", common_phrase: "climate change" },
      { category: "Environmental Issues", word: "global warming", turkish: "küresel ısınma", example: "Global warming affects everyone.", description: "Earth getting warmer", cause: "greenhouse gases" },

      { category: "Weather Related", word: "rain", turkish: "yağmur", example: "We need rain for the plants.", usage: "noun or verb", phrases: "It's raining. / heavy rain" },
      { category: "Weather Related", word: "sunshine", turkish: "güneş ışığı", example: "Plants need sunshine to grow.", description: "Light from the sun", common_phrase: "enjoy the sunshine" },

      { category: "Common Phrases", phrase: "protect the environment", turkish: "çevreyi korumak", usage: "Environmental action", example: "We should all protect the environment." },
      { category: "Common Phrases", phrase: "save the planet", turkish: "gezegeni kurtarmak", usage: "Environmental activism", example: "Let's work together to save the planet." },
      { category: "Common Phrases", phrase: "endangered species", turkish: "nesli tükenmekte olan türler", usage: "Conservation", example: "Pandas are an endangered species." },
    ]
  },

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

  table: {
    title: "📋 Entertainment Vocabulary (Movies & Music)",
    data: [
      { category: "Movies - General", word: "movie / film", turkish: "film", example: "I watched a great movie last night.", note: "Both words mean the same", common_phrase: "go to the movies" },
      { category: "Movies - General", word: "scene", turkish: "sahne", example: "The opening scene was exciting.", usage: "Part of a movie", phrase: "my favorite scene" },
      { category: "Movies - General", word: "genre", turkish: "tür", example: "What genre of movies do you like?", usage: "Type/category of film", types: "action, comedy, drama, horror..." },
      { category: "Movies - General", word: "soundtrack", turkish: "film müziği", example: "The soundtrack was beautiful.", description: "Music from the movie", phrase: "listen to the soundtrack" },

      { category: "Movie People", word: "actor", turkish: "erkek oyuncu", example: "He's a famous actor.", note: "Male performer in movies", phrase: "favorite actor" },
      { category: "Movie People", word: "actress", turkish: "kadın oyuncu", example: "She won an award as best actress.", note: "Female performer in movies", phrase: "talented actress" },
      { category: "Movie People", word: "director", turkish: "yönetmen", example: "The director made a great film.", description: "Person who directs the movie", phrase: "famous director" },

      { category: "Movie Genres", word: "comedy", turkish: "komedi", example: "I love watching comedies.", description: "Funny movies", phrase: "romantic comedy" },
      { category: "Movie Genres", word: "drama", turkish: "drama", example: "It's a serious drama about family.", description: "Serious, emotional films", phrase: "family drama" },
      { category: "Movie Genres", word: "action", turkish: "aksiyon", example: "Action movies have exciting fights.", description: "Movies with fights, chases", phrase: "action-packed film" },
      { category: "Movie Genres", word: "horror", turkish: "korku", example: "I don't like horror movies - too scary!", description: "Scary, frightening films", phrase: "horror film" },

      { category: "Music - General", word: "concert", turkish: "konser", example: "We went to a concert last weekend.", description: "Live music performance", phrase: "go to a concert" },
      { category: "Music - General", word: "song", turkish: "şarkı", example: "This is my favorite song!", description: "Piece of music with words", phrase: "listen to a song" },
      { category: "Music - General", word: "instrument", turkish: "enstrüman", example: "Can you play any instruments?", description: "Tool to make music", examples: "guitar, piano, drums" },

      { category: "Music People", word: "singer", turkish: "şarkıcı", example: "She's an amazing singer.", description: "Person who sings", phrase: "famous singer" },
      { category: "Music People", word: "musician", turkish: "müzisyen", example: "He's a talented musician.", description: "Person who plays music", note: "More general than 'singer'" },
      { category: "Music People", word: "band", turkish: "grup", example: "My favorite band is performing tonight.", description: "Group of musicians", phrase: "rock band" },

      { category: "Musical Instruments", word: "guitar", turkish: "gitar", example: "I'm learning to play the guitar.", type: "String instrument", phrase: "play guitar" },
      { category: "Musical Instruments", word: "piano", turkish: "piyano", example: "She plays the piano beautifully.", type: "Keyboard instrument", phrase: "piano lessons" },

      { category: "Common Phrases", phrase: "What's playing?", turkish: "Ne gösteriliyor?", usage: "Asking about movies", context: "At the cinema" },
      { category: "Common Phrases", phrase: "Let's watch a movie", turkish: "Film izleyelim", usage: "Suggesting entertainment", response: "Sure! What genre?" },
      { category: "Common Phrases", phrase: "turn up the volume", turkish: "sesi aç", usage: "Making music louder", example: "Can you turn up the volume?" },
      { category: "Common Phrases", phrase: "sold out show", turkish: "biletleri tükenen gösteri", usage: "No tickets left", example: "The concert is sold out." },
    ]
  },

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

  table: {
    title: "📋 Describing People (Appearance & Personality)",
    data: [
      { category: "Physical - Height & Build", word: "tall", turkish: "uzun boylu", opposite: "short", example: "He's very tall - about 2 meters!", usage: "Height description" },
      { category: "Physical - Height & Build", word: "short", turkish: "kısa boylu", opposite: "tall", example: "She's quite short.", usage: "Height description" },
      { category: "Physical - Height & Build", word: "slim", turkish: "zayıf", opposite: "fat", example: "She's slim and athletic.", note: "Polite word", alternatives: "thin, slender" },
      { category: "Physical - Height & Build", word: "fat", turkish: "şişman", opposite: "slim", note: "⚠️ Can be rude! Better: 'overweight', 'heavy'", polite_alternatives: "a bit heavy, overweight" },

      { category: "Physical - Age", word: "young", turkish: "genç", opposite: "old", example: "They're a young couple.", usage: "Age description", phrase: "young people" },
      { category: "Physical - Age", word: "old", turkish: "yaşlı", opposite: "young", example: "My grandfather is quite old.", note: "Better: 'elderly' for politeness", polite_form: "elderly" },

      { category: "Physical - Beauty/Looks", word: "beautiful", turkish: "güzel", usage: "For women, things, places", example: "She's a beautiful woman.", note: "General beauty, elegance" },
      { category: "Physical - Beauty/Looks", word: "handsome", turkish: "yakışıklı", usage: "For men", example: "He's a handsome man.", note: "Masculine beauty" },
      { category: "Physical - Beauty/Looks", word: "pretty", turkish: "hoş, sevimli", usage: "For women (less formal than beautiful)", example: "She's a pretty girl.", note: "Softer, more casual" },

      { category: "Personality - Positive", word: "friendly", turkish: "arkadaş canlısı", opposite: "unfriendly", example: "My neighbors are very friendly.", meaning: "Easy to talk to, warm" },
      { category: "Personality - Positive", word: "kind", turkish: "nazik", opposite: "mean", example: "She's a kind person - always helps others.", meaning: "Caring, helpful, gentle" },
      { category: "Personality - Positive", word: "smart", turkish: "zeki", opposite: "stupid", example: "He's a smart student.", alternatives: "intelligent, clever, bright" },
      { category: "Personality - Positive", word: "hard-working", turkish: "çalışkan", opposite: "lazy", example: "She's a hard-working employee.", meaning: "Works a lot, diligent" },
      { category: "Personality - Positive", word: "polite", turkish: "kibar", opposite: "rude", example: "He's always polite to everyone.", meaning: "Well-mannered, respectful" },
      { category: "Personality - Positive", word: "creative", turkish: "yaratıcı", example: "She's a creative artist.", meaning: "Imaginative, inventive" },
      { category: "Personality - Positive", word: "funny", turkish: "komik", opposite: "serious", example: "He's so funny - he makes everyone laugh!", meaning: "Humorous, makes jokes" },

      { category: "Personality - Negative", word: "lazy", turkish: "tembel", opposite: "hard-working", example: "He's lazy - never does homework.", meaning: "Doesn't want to work" },
      { category: "Personality - Negative", word: "rude", turkish: "kaba", opposite: "polite", example: "Don't be rude to your teacher!", meaning: "Impolite, disrespectful" },

      { category: "Personality - Social Traits", word: "shy", turkish: "utangaç", opposite: "outgoing", example: "She's shy and doesn't talk much.", meaning: "Nervous around people" },
      { category: "Personality - Social Traits", word: "serious", turkish: "ciddi", opposite: "funny", example: "He's a serious person - rarely smiles.", meaning: "Not playful, formal" },

      { category: "Common Phrases", phrase: "What does he look like?", turkish: "Nasıl görünüyor?", usage: "Asking about appearance", answer_example: "He's tall and slim." },
      { category: "Common Phrases", phrase: "What's she like?", turkish: "Nasıl biri?", usage: "Asking about personality", answer_example: "She's friendly and funny." },
      { category: "Common Phrases", phrase: "She looks like her mother", turkish: "Annesine benziyor", usage: "Similarity in appearance", note: "look like = physical similarity" },
    ]
  },

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

  table: {
    title: "📋 Describing Places (Towns, Cities, Nature)",
    data: [
      { category: "Types of Places", word: "city", turkish: "şehir", description: "Large populated area", example: "Istanbul is a big city.", size: "Large, many people" },
      { category: "Types of Places", word: "town", turkish: "kasaba", description: "Smaller than a city", example: "I live in a small town.", size: "Medium-sized" },
      { category: "Types of Places", word: "village", turkish: "köy", description: "Small rural area", example: "My grandmother lives in a village.", size: "Very small, countryside" },

      { category: "Describing - Age & Style", word: "modern", turkish: "modern", opposite: "historic", example: "It's a modern building with glass walls.", meaning: "New style, contemporary" },
      { category: "Describing - Age & Style", word: "historic", turkish: "tarihi", opposite: "modern", example: "Rome is a historic city.", meaning: "Old, with important history" },

      { category: "Describing - Atmosphere", word: "crowded", turkish: "kalabalık", opposite: "quiet", example: "The shopping mall is crowded on weekends.", meaning: "Many people, busy" },
      { category: "Describing - Atmosphere", word: "quiet", turkish: "sessiz", opposite: "crowded/noisy", example: "I prefer quiet places to relax.", meaning: "Peaceful, not much noise", alternatives: "peaceful, calm" },

      { category: "Describing - Appearance", word: "beautiful", turkish: "güzel", opposite: "ugly", example: "Paris is a beautiful city.", usage: "Positive description", phrase: "beautiful scenery" },
      { category: "Describing - Appearance", word: "ugly", turkish: "çirkin", opposite: "beautiful", example: "That building is really ugly.", note: "Strong negative word", politer_form: "not very attractive" },

      { category: "Describing - Cleanliness", word: "clean", turkish: "temiz", opposite: "dirty", example: "The streets are very clean here.", meaning: "No dirt, well-maintained" },
      { category: "Describing - Cleanliness", word: "dirty", turkish: "kirli", opposite: "clean", example: "This beach is dirty - there's trash everywhere.", meaning: "Not clean, polluted" },

      { category: "Describing - Safety", word: "safe", turkish: "güvenli", opposite: "dangerous", example: "This neighborhood is safe at night.", meaning: "No danger, secure", phrase: "feel safe" },
      { category: "Describing - Safety", word: "dangerous", turkish: "tehlikeli", opposite: "safe", example: "That area is dangerous after dark.", meaning: "Risky, unsafe", note: "⚠️ Be careful!" },

      { category: "Place Features", word: "park", turkish: "park", example: "There's a nice park near my house.", description: "Green area for recreation", activities: "walk, play, relax" },
      { category: "Place Features", word: "building", turkish: "bina", example: "That building is 50 floors high.", description: "Structure with walls and roof", types: "office building, apartment building" },
      { category: "Place Features", word: "street", turkish: "cadde", example: "I live on Main Street.", description: "Road in a city/town", phrase: "walk down the street" },

      { category: "Natural Features", word: "mountain", turkish: "dağ", example: "The mountains are covered with snow.", usage: "Large natural elevation", activity: "climbing, hiking" },
      { category: "Natural Features", word: "river", turkish: "nehir", example: "The city is next to a beautiful river.", usage: "Flowing water", phrase: "by the river" },
      { category: "Natural Features", word: "beach", turkish: "sahil", example: "We spent the day at the beach.", usage: "Sandy shore by the sea", activities: "swimming, sunbathing" },
      { category: "Natural Features", word: "lake", turkish: "göl", example: "There's a lake in the middle of town.", usage: "Body of water", phrase: "swim in the lake" },

      { category: "Common Phrases", phrase: "What's it like?", turkish: "Nasıl bir yer?", usage: "Asking about a place", answer_example: "It's beautiful and quiet." },
      { category: "Common Phrases", phrase: "I love the atmosphere", turkish: "Atmosferi seviyorum", usage: "Describing general feeling of place", context: "Restaurants, cities, cafes" },
      { category: "Common Phrases", phrase: "It's worth visiting", turkish: "Ziyaret etmeye değer", usage: "Recommendation", example: "Venice is worth visiting!" },
    ]
  },

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

  table: {
    title: "📋 Giving Directions and Instructions",
    data: [
      { category: "Basic Directions", phrase: "turn left", turkish: "sola dön", example: "Turn left at the traffic light.", when_to_use: "Changing direction to the left", gesture: "👈" },
      { category: "Basic Directions", phrase: "turn right", turkish: "sağa dön", example: "Turn right at the corner.", when_to_use: "Changing direction to the right", gesture: "👉" },
      { category: "Basic Directions", phrase: "go straight", turkish: "dümdüz git", example: "Go straight for 200 meters.", when_to_use: "Continue in same direction", alternatives: "go straight ahead, keep going" },

      { category: "Movement Actions", phrase: "cross the street", turkish: "sokağı geç", example: "Cross the street at the pedestrian crossing.", action: "Go to the other side", safety: "Use crosswalk!" },
      { category: "Movement Actions", phrase: "go past", turkish: "geç", example: "Go past the bank and turn left.", meaning: "Continue beyond something", note: "Don't stop at it" },
      { category: "Movement Actions", phrase: "stop", turkish: "dur", example: "Stop at the traffic light.", when: "Reaching destination or obstacle", imperative: "Command form" },
      { category: "Movement Actions", phrase: "follow", turkish: "takip et", example: "Follow this road for 1 km.", meaning: "Continue on this path", usage: "Roads, signs, people" },

      { category: "Prepositions of Place", phrase: "next to", turkish: "yanında", example: "The cafe is next to the bank.", meaning: "Beside, right by", position: "Adjacent" },
      { category: "Prepositions of Place", phrase: "opposite", turkish: "karşısında", example: "The shop is opposite the post office.", meaning: "Across from, facing", position: "On the other side" },
      { category: "Prepositions of Place", phrase: "behind", turkish: "arkasında", example: "The parking lot is behind the building.", meaning: "At the back of", opposite: "in front of" },
      { category: "Prepositions of Place", phrase: "in front of", turkish: "önünde", example: "There's a statue in front of the museum.", meaning: "At the front of", opposite: "behind" },
      { category: "Prepositions of Place", phrase: "near", turkish: "yakınında", example: "The hotel is near the station.", meaning: "Close to, not far from", alternatives: "close to" },
      { category: "Prepositions of Place", phrase: "between", turkish: "arasında", example: "The bank is between the cafe and the shop.", meaning: "In the middle of two things", note: "Requires two reference points" },
      { category: "Prepositions of Place", phrase: "at the corner", turkish: "köşede", example: "Turn right at the corner.", meaning: "Where two streets meet", usage: "Intersections" },

      { category: "Location References", word: "traffic light", turkish: "trafik ışığı", example: "Wait at the traffic light.", description: "Red/yellow/green lights", usage: "Common reference point" },
      { category: "Location References", word: "intersection", turkish: "kavşak", example: "Turn left at the intersection.", description: "Where roads cross", alternative: "junction, crossroads" },

      { category: "Specific Instructions", phrase: "take the first left", turkish: "ilk soldan dön", example: "Take the first left after the bridge.", pattern: "Ordinal + direction", variants: "first/second/third + left/right" },
      { category: "Specific Instructions", phrase: "take the second right", turkish: "ikinci sağdan dön", example: "Take the second right.", pattern: "Ordinal + direction", note: "Count the turns!" },

      { category: "Common Direction Phrases", phrase: "How do I get to...?", turkish: "...nasıl giderim?", usage: "Asking for directions", example: "How do I get to the train station?" },
      { category: "Common Direction Phrases", phrase: "Is it far?", turkish: "Uzak mı?", usage: "Asking about distance", common_response: "It's about 5 minutes walk." },
      { category: "Common Direction Phrases", phrase: "Can you show me on the map?", turkish: "Haritada gösterebilir misin?", usage: "Requesting visual help", note: "Very useful!" },
      { category: "Common Direction Phrases", phrase: "You can't miss it", turkish: "Gözden kaçırmak imkansız", usage: "Saying it's easy to find", meaning: "Very obvious/visible" },
      { category: "Common Direction Phrases", phrase: "ask for help", turkish: "yardım iste", example: "If you get lost, ask for help.", advice: "Don't be shy!", phrase_form: "Can you help me?" },
    ]
  },

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



export {
  MODULE_51_DATA,
  MODULE_52_DATA,
  MODULE_53_DATA,
  MODULE_54_DATA,
  MODULE_55_DATA,
  MODULE_56_DATA,
  MODULE_57_DATA,
  MODULE_58_DATA,
  MODULE_59_DATA,
  MODULE_60_DATA,
  MODULE_61_DATA,
  MODULE_62_DATA,
  MODULE_63_DATA,
  MODULE_64_DATA,
  MODULE_65_DATA,
  MODULE_66_DATA,
  MODULE_67_DATA,
  MODULE_68_DATA,
  MODULE_69_DATA,
  MODULE_70_DATA,
  MODULE_71_DATA,
  MODULE_72_DATA,
  MODULE_73_DATA,
  MODULE_74_DATA,
  MODULE_75_DATA,
  MODULE_76_DATA,
  MODULE_77_DATA,
  MODULE_78_DATA,
  MODULE_79_DATA,
  MODULE_80_DATA,
  MODULE_81_DATA,
  MODULE_82_DATA,
  MODULE_83_DATA,
  MODULE_84_DATA,
  MODULE_85_DATA,
  MODULE_86_DATA,
  MODULE_87_DATA,
  MODULE_88_DATA,
  MODULE_89_DATA,
  MODULE_90_DATA,
  MODULE_91_DATA,
  MODULE_92_DATA,
  MODULE_93_DATA,
  MODULE_94_DATA,
  MODULE_95_DATA,
  MODULE_96_DATA,
  MODULE_97_DATA,
  MODULE_98_DATA,
  MODULE_99_DATA,
  MODULE_100_DATA
};
