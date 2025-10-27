/**
 * C1 Level Module Data (Modules 201-213)
 * Advanced English grammar and communication skills
 */

// Module 201: Advanced Passive Structures – "It is said that..."
const MODULE_201_DATA = {
  title: "Module 201 - Advanced Passive Structures",
  description: "Master impersonal passive structures used for general beliefs, reports, and hearsay",
  intro: `📘 Lesson Objectives
✅ Master impersonal passive structures
✅ Use 'It is said that...' and 'He is said to...' patterns
✅ Apply these structures in academic and formal contexts

**Form 1 – It is said that...**
Used for general beliefs or hearsay.
Pattern: It + is/was + past participle + that-clause
Example: It is said that he speaks ten languages.

**Form 2 – He is said to...**
Used to make the subject active.
Pattern: Subject + is/was + past participle + to + infinitive
Example: He is said to speak ten languages.

**Tense Patterns:**
- He speaks → He is said to speak
- He spoke → He is said to have spoken
- He is working → He is said to be working
- He was working → He is said to have been working

Common verbs: say, think, believe, claim, report, expect, understand, know, consider, suppose`,

  table: {
    title: "📋 Advanced Passive Structures (Impersonal Passives)",
    data: [
      { category: "What are Impersonal Passives?", explanation: "Passive structures that avoid naming the source of information", purpose: "Report general beliefs, hearsay, opinions without stating the source directly", turkish: "Kişisel olmayan pasif yapılar - kaynak belirtmeden genel inanışları aktarma", function: "Academic writing, formal reports, news, expressing distance from claims", note: "Common in formal English, especially journalism and academic contexts" },

      { category: "Two Forms", form_1: "It + is/was + past participle + that-clause", example_1: "It is said that he speaks ten languages.", form_2: "Subject + is/was + past participle + to-infinitive", example_2: "He is said to speak ten languages.", meaning: "Both forms have the same meaning!", note: "Form 2 is more common in modern English" },

      { category: "FORM 1: It is said that...", structure: "It + is/was + past participle + that + full clause", examples: "It is said that Istanbul never sleeps. / It was believed that the earth was flat. / It is reported that profits increased.", use: "More formal, emphasizes the statement itself", common_verbs: "said, believed, thought, reported, claimed, expected, understood, known, considered, supposed", note: "The 'that' clause contains the complete statement" },

      { category: "FORM 2: He is said to...", structure: "Subject + is/was + past participle + to-infinitive", examples: "Istanbul is said to never sleep. / The earth was believed to be flat. / Profits are reported to have increased.", use: "More common, makes the subject active", transformation: "Move the subject of the 'that' clause to the beginning", note: "Subject becomes grammatically active (but meaning is still passive)" },

      { category: "Common Reporting Verbs", say: "say → It is said that... / He is said to...", believe: "believe → It is believed that... / He is believed to...", think: "think → It is thought that... / He is thought to...", report: "report → It is reported that... / He is reported to...", claim: "claim → It is claimed that... / He is claimed to...", expect: "expect → It is expected that... / He is expected to...", understand: "understand → It is understood that... / He is understood to...", consider: "consider → It is considered that... / He is considered to...", note: "All follow the same pattern!" },

      { category: "Tense Matching - Present", active: "He speaks ten languages. (present simple)", passive_form_1: "It is said that he speaks ten languages.", passive_form_2: "He is said to speak ten languages.", structure: "is said + to + base verb (present infinitive)", note: "Same time reference - both happening now" },

      { category: "Tense Matching - Past", active: "He spoke ten languages. (past simple)", passive_form_1: "It is said that he spoke ten languages.", passive_form_2: "He is said to have spoken ten languages.", structure: "is said + to have + past participle (perfect infinitive)", critical: "Use PERFECT INFINITIVE (to have + pp) for past actions!", note: "The 'have' shows action happened before the reporting" },

      { category: "Tense Matching - Present Continuous", active: "He is working on a new project. (present continuous)", passive_form_1: "It is reported that he is working on a new project.", passive_form_2: "He is reported to be working on a new project.", structure: "is reported + to be + verb-ing (continuous infinitive)", note: "Shows ongoing action at reporting time" },

      { category: "Tense Matching - Past Continuous", active: "He was working all night. (past continuous)", passive_form_1: "It is said that he was working all night.", passive_form_2: "He is said to have been working all night.", structure: "is said + to have been + verb-ing (perfect continuous infinitive)", note: "Past continuous action before reporting time" },

      { category: "Academic Writing Use", purpose: "Distance yourself from claims, show objectivity", examples: "It is widely believed that exercise improves mental health. / The theory is thought to have originated in ancient Greece. / Climate change is considered to be the greatest threat.", note: "Essential for essays, research papers, formal reports", remember: "Shows you're reporting others' views, not claiming as fact" },

      { category: "News & Journalism", typical: "It is reported that the president will resign. / The suspect is believed to be armed and dangerous. / The company is expected to announce layoffs.", purpose: "Report unconfirmed information without committing to truth", note: "Very common in news articles", alternative: "Also: 'According to reports...', 'Sources say that...'" },

      { category: "Transformation Exercise", original: "People say that London is expensive.", step_1: "It is said that London is expensive. (Form 1)", step_2: "London is said to be expensive. (Form 2)", process: "1. Identify the verb (say), 2. Choose form, 3. Match tense", note: "Practice both transformations!" },

      { category: "With BE verb", example_active: "She is very talented.", form_1: "It is said that she is very talented.", form_2: "She is said to be very talented.", structure: "is said + to be + adjective/noun", note: "Use 'to be' for states and descriptions" },

      { category: "Negative Forms", form_1_neg: "It is not believed that the plan will work.", form_2_neg: "The plan is not believed to work.", alternative: "It is believed that the plan will not work. / The plan is believed not to work.", note: "Negative can go with 'believe' or with the infinitive", position: "More common to negate the reporting verb" },

      { category: "Past Reporting Verb", structure: "It WAS + past participle / Subject WAS + past participle", examples: "It was believed that smoking was harmless. (historical belief) / Smoking was believed to be harmless.", use: "Report beliefs/claims from the past (now disproven or changed)", note: "Shows the belief existed in the past, not now" },

      { category: "Common Mistakes", mistake_1: "Wrong infinitive for past actions", wrong_1: "He is said to speak ten languages yesterday ✗", correct_1: "He is said to have spoken ten languages ✗ (if past action)", rule: "Use PERFECT INFINITIVE (to have + pp) for past actions", remember: "Present: to speak | Past: to have spoken" },

      { category: "Common Mistakes", mistake_2: "Mixing the two forms", wrong_2: "It is said to be expensive ✗ / London is said that it is expensive ✗", correct_2: "It is said that London is expensive ✓ / London is said to be expensive ✓", rule: "Form 1 needs 'that + clause' | Form 2 needs 'to-infinitive'", remember: "Don't mix the patterns!" },

      { category: "Advanced: Multiple Reporting", structure: "It is widely believed / generally thought / commonly accepted that...", examples: "It is widely believed that meditation reduces stress. / It is generally thought that experience matters more than qualifications.", use: "Add adverbs to show strength of belief", note: "Sounds more sophisticated in academic writing" },

      { category: "Formal vs Informal", formal: "It is believed that the economy will recover. (impersonal passive)", informal: "People believe (that) the economy will recover. (active voice)", academic: "The economy is believed to recover. (very formal)", note: "Impersonal passives are FORMAL structures", remember: "Use in academic writing, not casual speech!" },

      { category: "Real-World Examples", news: "It is reported that negotiations have failed. / The minister is expected to resign.", academic: "It is generally accepted that DNA carries genetic information. / The theory is believed to have been developed in the 1950s.", business: "The company is thought to be planning layoffs. / Profits are expected to increase.", note: "Very common in these contexts!" },

      { category: "Key Takeaway", summary: "Impersonal passives report information without stating the source", two_forms: "Form 1: It is said that... (emphasize statement) | Form 2: He is said to... (subject-focused)", tenses: "Present: to speak | Past: to have spoken | Continuous: to be speaking | Past Continuous: to have been speaking", common_verbs: "say, believe, think, report, claim, expect, understand, consider, know", use: "Academic writing, news, formal reports - show distance from claims", structure: "It/Subject + is/was + past participle + that-clause/to-infinitive", critical: "Use PERFECT INFINITIVE for past actions!", remember: "Very formal - use in writing, not casual conversation!", next: "Practice transforming active statements to both passive forms!" }
    ]
  },

  speakingPractice: [
    { question: "It is said that Istanbul never sleeps. Do you agree?", answer: "Absolutely. Istanbul is believed to be one of those cities that are constantly alive — full of energy, lights, and people, even at 3 a.m." },
    { question: "It is believed that social media has changed how we think. What's your view?", answer: "I think that's true. It is thought to have reshaped our attention span, our communication style, and even our sense of reality." },
    { question: "It is said that money can't buy happiness. Do you believe that?", answer: "I partly agree. Money is said to bring comfort, but true happiness often comes from emotional balance and meaningful relationships." },
    { question: "It is believed that artificial intelligence will replace teachers one day. What's your take?", answer: "While AI is said to be powerful, it will never replace the emotional intelligence and adaptability that real teachers bring into the classroom." },
    { question: "It is claimed that climate change is the biggest threat to humanity. What do you think?", answer: "I completely agree. Climate change is believed to cause not only environmental damage but also economic and political instability." },
    { question: "It is thought that working from home makes people lazy. Do you agree?", answer: "Not necessarily. Remote work is said to improve productivity for many people, especially those who manage their time efficiently." },
    { question: "It is said that love at first sight doesn't exist.", answer: "Well, I disagree. Many people are said to have experienced it — that instant connection that feels almost magical." },
    { question: "It is believed that success requires sacrifice. Do you agree?", answer: "Definitely. Every successful person is said to have given up something — whether it's comfort, time, or stability." },
    { question: "It is thought that dogs understand human emotions. Do you believe that?", answer: "Yes, they are said to sense sadness or joy in humans. That's why they're called man's best friend." },
    { question: "It is said that reading improves empathy.", answer: "Absolutely. Readers are believed to develop deeper emotional intelligence because they experience life through different characters." },
    { question: "It is claimed that introverts make better leaders.", answer: "Some studies suggest so. Introverts are said to listen more and think before they act, which are key leadership qualities." },
    { question: "It is thought that laughter is the best medicine.", answer: "That's a beautiful belief. Humor is said to relieve stress and strengthen the immune system." },
    { question: "It is believed that multitasking reduces efficiency.", answer: "Yes, the brain is said to function better when focusing on one task at a time." },
    { question: "It is said that history repeats itself.", answer: "True. Civilizations are believed to make the same mistakes over and over again due to human nature." },
    { question: "It is thought that happiness is a choice.", answer: "That's profound. Happiness is said to depend more on mindset than on external conditions." },
    { question: "It is believed that people become wiser with age.", answer: "Generally true. Experience is said to polish judgment and deepen understanding." },
    { question: "It is said that beauty lies in the eye of the beholder.", answer: "Yes, perception is believed to define what we find beautiful, not universal standards." },
    { question: "It is thought that dreams reflect our subconscious.", answer: "That's fascinating. Dreams are said to reveal hidden fears, desires, and memories." },
    { question: "It is claimed that the universe is infinite.", answer: "Indeed. Scientists are said to have found no evidence of its boundary." },
    { question: "It is believed that hard work always pays off.", answer: "Not always immediately, but effort is said to attract opportunities in the long run." },
    { question: "It is said that art imitates life.", answer: "That's true. Artists are believed to capture reality through imagination." },
    { question: "It is thought that competition motivates people.", answer: "For sure. Healthy competition is said to bring out the best in individuals." },
    { question: "It is believed that patience is a virtue.", answer: "Definitely. Those who are patient are said to achieve greater things in life." },
    { question: "It is said that the pen is mightier than the sword.", answer: "True again. Words are believed to have the power to inspire revolutions." },
    { question: "It is claimed that laughter increases lifespan.", answer: "Some research supports that. People who laugh often are said to live longer and healthier lives." },
    { question: "It is believed that humans use only 10% of their brains.", answer: "That's actually a myth. Scientists are said to have debunked that long ago." },
    { question: "It is thought that failure is the best teacher.", answer: "Absolutely. Mistakes are said to offer lessons that success never could." },
    { question: "It is said that opposites attract.", answer: "Sometimes true. Couples with contrasting personalities are said to balance each other out." },
    { question: "It is claimed that robots will dominate the workforce.", answer: "Perhaps partly true. Robots are said to handle repetitive tasks, but creativity will remain human." },
    { question: "It is believed that time heals all wounds.", answer: "Emotionally, yes. Pain is said to fade as perspective grows." },
    { question: "It is thought that travel broadens the mind.", answer: "Absolutely. Travelers are said to become more tolerant and open-minded." },
    { question: "It is said that talent is overrated.", answer: "I agree. Consistent effort is said to beat natural ability in most cases." },
    { question: "It is believed that curiosity fuels innovation.", answer: "Definitely. Great inventors are said to have one thing in common — curiosity." },
    { question: "It is claimed that knowledge is power.", answer: "That's timeless wisdom. Education is said to empower individuals and transform societies." },
    { question: "It is said that we become what we think.", answer: "Absolutely. Thoughts are believed to shape our reality and actions." },
    { question: "It is thought that music can heal emotional pain.", answer: "Yes, melodies are said to reach parts of the soul that words can't." },
    { question: "It is believed that technology isolates people.", answer: "That's partly true. While it connects us globally, it's also said to weaken real human bonds." },
    { question: "It is claimed that first impressions last forever.", answer: "Often true. People are said to judge within seconds and rarely change that opinion." },
    { question: "It is said that knowledge without action is useless.", answer: "Very true. Wisdom is said to exist only when it's applied." },
    { question: "It is believed that gratitude brings happiness.", answer: "Absolutely. Grateful people are said to experience more joy and less anxiety." }
  ]
};

// Module 202: Cleft Sentences – "What I like is..."
const MODULE_202_DATA = {
  title: "Module 202 - Cleft Sentences",
  description: "Emphasize parts of sentences by dividing them into two clauses for dramatic effect",
  intro: `📘 Lesson Objectives
✅ Master cleft sentences for emphasis
✅ Use What-cleft and It-cleft structures
✅ Apply these in both formal and conversational English

**1. What-Cleft Sentences**
Form: What + clause + be + emphasized part
Example: What I like is chocolate. (I like chocolate.)
What he needs is a vacation.

**2. It-Cleft Sentences**
Form: It + be + emphasized part + who/that + clause
Example: It was John who broke the vase.
It is the weekends that I enjoy the most.

**3. Other Types:**
The person who helped me was Sarah.
The reason I called you was to apologize.
All I want is peace and quiet.

**4. Why-Cleft Sentences:**
Why I love this job is the freedom it gives me.
Why he failed was his lack of preparation.`,

  table: {
    title: "📋 Cleft Sentences (Emphasis Through Structure)",
    data: [
      { category: "What are Cleft Sentences?", explanation: "Sentences split into two clauses to emphasize specific information", purpose: "Draw attention to particular elements by restructuring the sentence", turkish: "Bölünmüş cümleler - vurgu yapmak için cümleyi ikiye böl", function: "Dramatic effect, emphasis, contrast, clarification", note: "Common in both spoken and written English for emphasis" },

      { category: "Main Types", what_cleft: "What-cleft: What + clause + be + focus", it_cleft: "It-cleft: It + be + focus + who/that + clause", examples: "What I like is chocolate. (what-cleft) / It was John who broke it. (it-cleft)", note: "Two different structures, same purpose - emphasis!" },

      { category: "WHAT-CLEFT Structure", pattern: "What + subject + verb + be + emphasized part", examples: "What I like is chocolate. / What he needs is a vacation. / What they want is freedom.", use: "Emphasize the OBJECT or result of an action", original: "I like chocolate. → What I like is chocolate.", note: "The 'what' clause replaces the object" },

      { category: "What-Cleft: Subject Position", structure: "What + clause + BE + complement", examples: "What surprises me is his patience. / What matters most is honesty. / What bothers me is hypocrisy.", emphasis: "The emphasized part comes AFTER the BE verb", original: "His patience surprises me. → What surprises me is his patience.", note: "Subject (the emphasized part) follows BE" },

      { category: "What-Cleft: Object Position", structure: "What + subject + verb + BE + object", examples: "What I love is early mornings. / What she bought was a new car. / What we need is more time.", emphasis: "The object is emphasized", original: "I love early mornings. → What I love is early mornings.", note: "Most common type of what-cleft" },

      { category: "IT-CLEFT Structure", pattern: "It + BE + emphasized part + who/that/which + rest of clause", examples: "It was John who broke the vase. / It's the weekends that I enjoy. / It is chocolate that I like.", use: "Emphasize ANY part of the sentence (subject, object, time, place)", note: "Very flexible - can emphasize almost anything!" },

      { category: "It-Cleft: Emphasizing Subject", structure: "It + BE + SUBJECT + who/that + verb + object", examples: "It was Maria who called you. / It is the students who make teaching rewarding. / It was I who suggested the idea.", emphasis: "Focus on WHO did the action", original: "Maria called you. → It was Maria who called you.", note: "Use WHO for people, THAT for things" },

      { category: "It-Cleft: Emphasizing Object", structure: "It + BE + OBJECT + that/which + subject + verb", examples: "It's chocolate that I like (not vanilla). / It was a car that he bought. / It is honesty that I value.", emphasis: "Focus on WHAT is involved", original: "I like chocolate. → It's chocolate that I like.", note: "Use THAT or WHICH for things" },

      { category: "It-Cleft: Emphasizing Time/Place", time: "It was yesterday that I saw her. / It's in the morning that I feel most creative.", place: "It was in Istanbul that we met. / It's at the office that I work best.", emphasis: "Focus on WHEN or WHERE", note: "Very useful for clarification and correction", use: "Especially good for contrasting information" },

      { category: "ALL-Cleft Sentences", structure: "All + (that) + subject + verb/need + BE + emphasized part", examples: "All I want is peace. / All she needs is rest. / All they did was complain.", meaning: "Emphasizes that ONLY this thing matters", note: "Common in everyday speech", pattern: "'All' at the beginning creates strong emphasis" },

      { category: "THE-Cleft Sentences", structure: "The + noun + who/that + clause + BE + emphasized part", examples: "The person who helped me was Sarah. / The thing that surprised me was his reaction. / The reason I called was to apologize.", use: "Specify and emphasize using 'the + noun'", note: "More specific than it-cleft", common: "The reason..., The person..., The thing..., The way..." },

      { category: "WHY-Cleft Sentences", structure: "Why/How/Where/When + clause + BE + emphasized part", examples: "Why I love this job is the freedom. / How he succeeded was through hard work. / Where I grew up was a small village.", use: "Emphasize the REASON, METHOD, PLACE, or TIME", note: "Less common but very emphatic", pattern: "Question word starts the sentence" },

      { category: "Contrast & Correction", it_cleft_contrast: "It wasn't John who broke it, it was Peter. (correction)", what_cleft_contrast: "What I said was 'maybe', not 'yes'. (clarification)", use: "Correct misunderstandings or emphasize contrast", note: "Very useful in arguments or clarifications", emphasis: "Draw strong attention to the correct information" },

      { category: "Formal vs Informal", formal_writing: "It is the government that should take responsibility. / What is required is immediate action.", spoken_informal: "What I love is sleeping in! / It's you that I wanted to see!", note: "Cleft sentences work in BOTH contexts", academic: "Common in essays for emphasis without exclamation marks", everyday: "Common in speech for dramatic effect" },

      { category: "With Negatives", it_cleft_negative: "It's not the money that motivates me. / It wasn't me who said that.", what_cleft_negative: "What I don't understand is his attitude. / What she didn't do was apologize.", use: "Emphasize what something is NOT", note: "Very useful for clarification and denial" },

      { category: "Time Reference", present: "What I like IS chocolate. / It IS John who helps.", past: "What I liked WAS chocolate. / It WAS John who helped.", future: "What I will need IS support. / It WILL BE John who helps.", note: "The BE verb changes tense", remember: "Match the tense to the time reference!" },

      { category: "Common Mistakes", mistake_1: "Wrong word order in what-cleft", wrong_1: "Is chocolate what I like ✗", correct_1: "What I like is chocolate ✓", rule: "What-clause comes FIRST, BE comes SECOND", remember: "What + clause + BE + focus" },

      { category: "Common Mistakes", mistake_2: "Using 'which' for people in it-cleft", wrong_2: "It was John which called ✗", correct_2: "It was John who called ✓ / It was John that called ✓", rule: "Use WHO or THAT for people, THAT/WHICH for things", remember: "Who = people, Which/That = things" },

      { category: "Real-World Uses", emphasis: "What really matters is family. (emphasize importance)", correction: "It wasn't yesterday that I saw her, it was last week. (correct error)", clarification: "What I meant was that we need more time. (clarify meaning)", contrast: "It's not intelligence that defines success, it's persistence. (show contrast)", note: "Very versatile structures!" },

      { category: "Key Takeaway", summary: "Cleft sentences split information into two clauses for emphasis", what_cleft: "What + clause + BE + focus (emphasize object/result)", it_cleft: "It + BE + focus + who/that + clause (emphasize any element)", all_cleft: "All + (that) + clause + BE + focus (only this matters)", the_cleft: "The + noun + who/that + clause + BE + focus (specify and emphasize)", why_cleft: "Why/How/Where/When + clause + BE + focus (emphasize reason/method/place/time)", use: "Emphasis, contrast, correction, clarification, dramatic effect", formal_informal: "Works in both academic writing and everyday speech", who_that: "WHO for people, THAT/WHICH for things", remember: "Restructure to emphasize - makes writing and speech more dynamic!", next: "Practice converting normal sentences to cleft sentences!" }
    ]
  },

  speakingPractice: [
    { question: "What I like about Istanbul is the mix of cultures. Do you agree?", answer: "Definitely. What fascinates me most is how East and West blend so naturally in that city." },
    { question: "What I can't stand is hypocrisy. What about you?", answer: "I'm with you on that. What annoys me the most is when people pretend to be someone they're not." },
    { question: "What makes you feel alive?", answer: "What truly makes me feel alive is traveling to new countries and getting lost in unfamiliar streets." },
    { question: "What you need is a long vacation, don't you think?", answer: "You're probably right. What I've been missing lately is time to disconnect and recharge." },
    { question: "What I find amazing is how fast technology evolves.", answer: "Exactly. What impresses me is how AI is now capable of understanding emotions." },
    { question: "What people often forget is that happiness requires effort.", answer: "True. What matters is not how much you have, but how much you appreciate." },
    { question: "What inspires you the most?", answer: "What inspires me is people who stay kind even in difficult times." },
    { question: "What I love is early mornings with coffee and silence.", answer: "Same here. What I enjoy most is that quiet moment before the world wakes up." },
    { question: "What I don't understand is why people fear change.", answer: "That's a deep one. What stops them is usually the comfort of familiarity." },
    { question: "What I like about your teaching style is its simplicity.", answer: "Thanks! What I try to do is make English feel natural, not academic." },
    { question: "It was your smile that caught my attention.", answer: "That's sweet. It was your confidence that impressed me first, though." },
    { question: "It's not the money that motivates me, it's the challenge.", answer: "Exactly! It's the growth that keeps me going, not the paycheck." },
    { question: "It was at the conference that we first met, right?", answer: "Yes, it was! What I remember clearly is the intense discussion about education." },
    { question: "It was your idea that saved the project.", answer: "Maybe, but it was teamwork that made it succeed." },
    { question: "It's your honesty that I value the most.", answer: "Thank you. What I appreciate is that you notice that quality." },
    { question: "It's the weekends that I look forward to.", answer: "Same! What I love is sleeping in and forgetting about alarms." },
    { question: "What amazes me is your patience with students.", answer: "Thanks! What I've learned is that patience builds trust in the classroom." },
    { question: "What you need isn't more time — it's better focus.", answer: "You're absolutely right. What I must do is prioritize what really matters." },
    { question: "It's not who you are that holds you back, it's who you think you're not.", answer: "Beautifully said. What limits most people is their own fear of failure." },
    { question: "What I miss the most is genuine conversations.", answer: "Same here. What bothers me about modern life is how superficial communication has become." },
    { question: "It was my mother who taught me to be kind.", answer: "That's lovely. It was my grandfather who taught me resilience." },
    { question: "What gives you peace of mind?", answer: "What gives me peace is knowing that I've done my best every day." },
    { question: "It's not intelligence that defines success, it's persistence.", answer: "I agree. What separates winners from others is consistency." },
    { question: "What makes you proud of your students?", answer: "What makes me proud is seeing them express themselves confidently in English." },
    { question: "It's your creativity that stands out.", answer: "Thanks! What I try to do is make learning memorable and fun." },
    { question: "What bothers me is how people rush through life.", answer: "Exactly. What they forget is that slowing down sometimes leads to more progress." },
    { question: "It's not failure that defines us, it's how we rise again.", answer: "Indeed. What makes us stronger is learning from every mistake." },
    { question: "What makes a great teacher, in your opinion?", answer: "What truly makes a great teacher is empathy — the ability to understand each student's journey." },
    { question: "It's your dedication that keeps this school alive.", answer: "Thank you. What drives me is my belief in the power of communication." },
    { question: "What gives meaning to your life?", answer: "What gives meaning to mine is helping others reach their full potential." },
    { question: "It was during the pandemic that I realized how fragile life is.", answer: "Same here. What the pandemic taught me was to value time and people more." },
    { question: "What frustrates you the most about modern education?", answer: "What frustrates me is how exam results often matter more than creativity or real skills." },
    { question: "It's not what you say, it's how you say it.", answer: "True. What really affects people is tone and attitude, not just words." },
    { question: "What I find inspiring is how students never give up.", answer: "Exactly. What that shows is their inner strength and resilience." },
    { question: "It was grammar that used to scare me at first!", answer: "Haha, me too! What helped me overcome that fear was practice and patience." },
    { question: "What motivates you to keep improving?", answer: "What keeps me going is the belief that there's always room to grow." },
    { question: "It's not luck that leads to success, it's preparation.", answer: "Absolutely. What people call 'luck' is usually the result of hard work." },
    { question: "What I enjoy most about teaching is seeing progress.", answer: "I feel the same. What makes it worthwhile is knowing you've made a difference." },
    { question: "It's your feedback that helps me improve.", answer: "I'm glad! What I want is to guide, not criticize." },
    { question: "What matters at the end of the day?", answer: "What truly matters is kindness, because everything else fades with time." }
  ]
};

// Module 203: Advanced Conditional Patterns – "But for / If it weren't for"
const MODULE_203_DATA = {
  title: "Module 203 - Advanced Conditional Patterns",
  description: "Express unreal situations using advanced conditional structures like 'but for' and 'if it weren't for'",
  intro: `📘 Lesson Objectives
✅ Master "but for" and "if it weren't for" patterns
✅ Express hypothetical causes and unreal situations
✅ Use these structures for past and present contexts

**1. "But for" – Equivalent to "If it weren't for"**
Form: But for + noun / noun phrase
Example: But for your help, I couldn't have finished the project.

**2. "If it weren't for" – Present or general situations**
Example: If it weren't for my job, I would travel the world.

**3. "If it hadn't been for" – Past situations**
Example: If it hadn't been for you, I would have given up.

**4. "If not for" – More informal version**
Example: If not for my family, I would be lost.`,

  table: {
    title: "📋 Advanced Conditional Patterns (But for / If it weren't for)",
    data: [
      { category: "What are Advanced Conditionals?", explanation: "Sophisticated structures expressing hypothetical causes and imagined alternatives", purpose: "Show what WOULD or WOULDN'T happen without a certain factor", turkish: "Gelişmiş koşul cümleleri - bir şey olmasaydı ne olurdu?", function: "Express gratitude, explain necessity, show dependence on factors", note: "Very common in reflective, philosophical discussions" },

      { category: "Main Structures", but_for: "But for + noun/noun phrase (formal)", if_it_werent: "If it weren't for + noun/noun phrase (present/general)", if_it_hadnt_been: "If it hadn't been for + noun/noun phrase (past)", if_not_for: "If not for + noun/noun phrase (informal)", meaning: "All mean: 'Without this, something else would/wouldn't happen'", note: "Different levels of formality, same meaning" },

      { category: "BUT FOR - Structure", pattern: "But for + noun, Subject + would/could/might + verb", examples: "But for your help, I couldn't have finished. / But for luck, we would have failed. / But for technology, life would be different.", meaning: "WITHOUT this thing, the result would be different", note: "Very formal - common in academic and literary writing", equivalent: "Same as 'If it weren't for' or 'If it hadn't been for'" },

      { category: "IF IT WEREN'T FOR - Present/General", structure: "If it weren't for + noun, Subject + would/could/might + verb", examples: "If it weren't for my job, I would travel the world. / If it weren't for technology, we wouldn't connect globally. / If it weren't for coffee, I couldn't function.", use: "Present or GENERAL situations (habits, facts)", time: "Things that are currently true or generally true", note: "More common than 'but for' in everyday formal speech" },

      { category: "IF IT HADN'T BEEN FOR - Past", structure: "If it hadn't been for + noun, Subject + would/could/might + have + past participle", examples: "If it hadn't been for you, I would have given up. / If it hadn't been for the pandemic, remote work wouldn't have evolved. / If it hadn't been for that mistake, I wouldn't have learned.", use: "PAST situations only", time: "Something that happened in the past", note: "Past hypothetical - imagining a different past", remember: "Use PAST PERFECT in the 'if' clause!" },

      { category: "IF NOT FOR - Informal", structure: "If not for + noun, Subject + would/could/might + verb", examples: "If not for my family, I would be lost. / If not for music, life would be boring. / If not for my friends, I couldn't have survived.", use: "More casual, conversational", note: "Same meaning, less formal", context: "Use in speaking or informal writing" },

      { category: "Present vs Past - Key Difference", present: "If it WEREN'T for coffee, I WOULD be tired. (general/habitual)", past: "If it HADN'T BEEN for coffee, I WOULD HAVE BEEN tired. (specific past event)", rule: "Present: weren't + would | Past: hadn't been + would have", critical: "DON'T confuse the two!", remember: "Match the time reference correctly!" },

      { category: "With COULD and MIGHT", could: "But for your advice, I couldn't have succeeded. (ability)", might: "But for luck, we might have lost. (possibility)", would: "But for technology, we would still use letters. (certainty)", note: "All three modals work, with slightly different meanings", nuance: "COULD = ability | MIGHT = possibility | WOULD = certainty" },

      { category: "Transformation from Normal Conditional", original_third: "If you hadn't helped me, I would have failed. (Third Conditional)", advanced: "If it hadn't been for your help, I would have failed. / But for your help, I would have failed.", difference: "Advanced form is more formal and sophisticated", note: "Use in academic writing or formal contexts", transformation: "Replace 'If + subject + hadn't + verb' with 'If it hadn't been for + noun'" },

      { category: "Expressing Gratitude", structure: "Use these patterns to thank someone indirectly", examples: "But for your patience, I wouldn't be here. (= Thank you for your patience) / If it weren't for your support, I couldn't continue. (= Thank you for your support)", use: "Formal, sophisticated way to express thanks", note: "Common in speeches, formal letters, acknowledgments" },

      { category: "Expressing Dependence", structure: "Show you rely on something/someone", examples: "If it weren't for technology, my business wouldn't exist. / But for my family's support, I couldn't have started this school.", meaning: "This factor is ESSENTIAL for the result", note: "Shows cause-and-effect relationship", use: "Explain what makes something possible" },

      { category: "Expressing Regret or Relief", regret: "But for that mistake, I would still have my job. (regret - wish it hadn't happened)", relief: "If it hadn't been for the traffic, I would have been on that plane. (relief - glad it didn't happen)", note: "Context determines whether it's regret or relief", tone: "Your intonation or surrounding context shows your feeling" },

      { category: "In Academic Writing", typical: "But for this discovery, modern medicine would not exist. / If it weren't for Newton's laws, physics would be very different.", use: "Discuss hypothetical scenarios, show importance of discoveries/events", note: "Very common in academic essays and research papers", formality: "Preferred over simpler conditional forms in formal writing" },

      { category: "Common Mistakes", mistake_1: "Wrong tense in result clause", wrong_1: "If it weren't for you, I would have failed ✗ (mixing present/past)", correct_1: "If it weren't for you, I would fail ✓ (present) / If it hadn't been for you, I would have failed ✓ (past)", rule: "Match 'weren't' with 'would' and 'hadn't been' with 'would have'", remember: "Keep time reference consistent!" },

      { category: "Common Mistakes", mistake_2: "Using 'was' instead of 'were'", wrong_2: "If it wasn't for you ✗", correct_2: "If it weren't for you ✓", rule: "Always use WEREN'T (subjunctive), not wasn't", note: "Even for singular subjects, use 'weren't' in this structure" },

      { category: "Negative Form", structure: "Use to show what would happen WITHOUT the absence of something", examples: "But for the lack of funding, the project would have succeeded. / If it weren't for his laziness, he would be successful.", meaning: "The negative factor is the cause of the problem", note: "Less common but grammatically correct", use: "Show how negative factors affect outcomes" },

      { category: "Formal vs Informal Comparison", formal: "But for divine intervention, we would have perished.", standard_formal: "If it hadn't been for luck, we wouldn't have survived.", informal: "If not for you, I'd be lost.", casual: "Without you, I'd be lost. (simplest)", note: "All express the same idea with different formality levels", remember: "Choose based on context!" },

      { category: "Real-World Uses", gratitude_speeches: "But for your guidance, I wouldn't be standing here today.", academic_essays: "If it weren't for globalization, cultural exchange would be limited.", reflective_writing: "If it hadn't been for that experience, I wouldn't understand empathy.", business: "But for technological innovation, our company wouldn't exist.", note: "Versatile structure for many contexts!" },

      { category: "Key Takeaway", summary: "Advanced conditionals show hypothetical causes - what would/wouldn't happen without something", structures: "But for (very formal) | If it weren't for (formal, present/general) | If it hadn't been for (formal, past) | If not for (informal)", present_general: "If it weren't for + noun, subject + would + verb", past: "If it hadn't been for + noun, subject + would have + past participle", use: "Gratitude, dependence, regret, relief, academic writing, formal contexts", meaning: "WITHOUT this factor, the result would be different", critical: "Always use WEREN'T (not wasn't)! Match tenses correctly!", formality: "But for (most formal) → If it weren't/hadn't been for (formal) → If not for (informal)", remember: "Very sophisticated structure - shows advanced English proficiency!", next: "Practice transforming third conditionals to these advanced forms!" }
    ]
  },

  speakingPractice: [
    { question: "If it weren't for your patience, how would your students learn?", answer: "Honestly, they wouldn't. But for understanding and empathy, teaching would be impossible." },
    { question: "If it hadn't been for your teacher, would you still be in this field?", answer: "Probably not. But for her encouragement, I might have quit years ago." },
    { question: "But for your family's support, could you have built this school?", answer: "No chance. If it weren't for them, none of this would exist." },
    { question: "If it weren't for technology, how different would your life be?", answer: "Radically different. But for the internet, I wouldn't be teaching globally." },
    { question: "If it hadn't been for your mentor, do you think you'd have achieved the same success?", answer: "Not at all. But for his guidance, I wouldn't have grown professionally." },
    { question: "But for your curiosity, would you have learned so many languages?", answer: "Definitely not. If it weren't for curiosity, I'd have stayed in my comfort zone." },
    { question: "If it weren't for deadlines, would people still finish their tasks on time?", answer: "Probably not! But for pressure, most people wouldn't stay productive." },
    { question: "If it hadn't been for your friend, would you have survived that period?", answer: "Barely. But for his support, I might have fallen apart emotionally." },
    { question: "But for your discipline, would your business still be running?", answer: "I doubt it. If it weren't for consistency, success would fade quickly." },
    { question: "If it weren't for humor, life would be unbearable, right?", answer: "Exactly. But for laughter, the world would be too heavy to handle." },
    { question: "If it hadn't been for that mistake, would you have learned this lesson?", answer: "Probably not. But for that failure, I wouldn't have understood growth." },
    { question: "But for music, what would heal people's souls?", answer: "That's a good question. If it weren't for music, life would lose its color." },
    { question: "If it weren't for mistakes, would innovation exist?", answer: "Never. But for trial and error, no great discovery would have happened." },
    { question: "If it hadn't been for the pandemic, would remote education have evolved this fast?", answer: "No way. But for that crisis, online learning wouldn't be what it is today." },
    { question: "But for strong leaders, how would societies survive tough times?", answer: "They wouldn't. If it weren't for leadership, chaos would take over." },
    { question: "If it weren't for your optimism, how would you handle setbacks?", answer: "With much more stress. But for positive thinking, I'd give up easily." },
    { question: "If it hadn't been for the accident, would you have changed careers?", answer: "Probably not. But for that shock, I wouldn't have found my true calling." },
    { question: "But for your students' motivation, would you still enjoy teaching?", answer: "Not as much. If it weren't for their energy, my passion would fade." },
    { question: "If it weren't for ambition, would society move forward?", answer: "I don't think so. But for ambition, humanity wouldn't have evolved." },
    { question: "If it hadn't been for your failures, would you understand success?", answer: "Never. But for failure, we wouldn't value victory." },
    { question: "But for mistakes, would we ever grow wiser?", answer: "No, because if it weren't for mistakes, we'd stay naive forever." },
    { question: "If it weren't for caffeine, could you function in the morning?", answer: "Definitely not! But for coffee, my brain would refuse to cooperate." },
    { question: "If it hadn't been for social media, would your school have grown so fast?", answer: "Unlikely. But for digital platforms, we wouldn't reach so many learners." },
    { question: "But for deadlines, would projects ever get finished?", answer: "Probably never. If it weren't for time pressure, procrastination would rule." },
    { question: "If it weren't for love, what would motivate art?", answer: "Nothing. But for love, poetry and music wouldn't exist." },
    { question: "If it hadn't been for your persistence, would you have passed IELTS?", answer: "Nope. But for determination, I would've failed again." },
    { question: "But for your parents, who would you be today?", answer: "Honestly, lost. If it weren't for their guidance, I'd be directionless." },
    { question: "If it weren't for humor, could people survive hardship?", answer: "Hardly. But for laughter, we'd drown in negativity." },
    { question: "If it hadn't been for that book, would you have changed your mindset?", answer: "Not at all. But for that one story, I'd still be stuck in my old habits." },
    { question: "But for education, how would people escape poverty?", answer: "They wouldn't. If it weren't for learning, opportunity would vanish." },
    { question: "If it weren't for challenges, would life have meaning?", answer: "Probably not. But for difficulties, growth wouldn't happen." },
    { question: "If it hadn't been for your mistakes, would you be this humble?", answer: "Not really. But for failure, I wouldn't have learned empathy." },
    { question: "But for your courage, would you have started your own business?", answer: "Never. If it weren't for courage, fear would've won." },
    { question: "If it weren't for your teachers, who would you thank the most?", answer: "My parents, probably. But for teachers, I wouldn't have discovered my talent." },
    { question: "If it hadn't been for luck, would your plan have worked?", answer: "Honestly, no. But for that coincidence, everything might've failed." },
    { question: "But for communication, would relationships survive?", answer: "Not at all. If it weren't for dialogue, love would fade away." },
    { question: "If it weren't for deadlines, would you ever stop overthinking?", answer: "Probably not. But for time pressure, I'd keep polishing forever." },
    { question: "If it hadn't been for grammar, would English make sense?", answer: "Not really. But for structure, we couldn't understand each other." },
    { question: "But for imagination, would humans ever invent anything?", answer: "Never. If it weren't for creativity, we'd still be living in caves." },
    { question: "If it weren't for kindness, what kind of world would this be?", answer: "A cruel one. But for compassion, humanity wouldn't survive." }
  ]
};

// Module 204: Nominal Clauses (that, what, whatever)
const MODULE_204_DATA = {
  title: "Module 204 - Nominal Clauses",
  description: "Master dependent clauses that function as nouns in sentences",
  intro: `📘 Lesson Objectives
✅ Understand nominal clauses (that, what, whatever)
✅ Use them as subjects, objects, or complements
✅ Apply these in academic and formal contexts

**Definition:** A nominal clause is a dependent clause that functions as a noun.

**1. "That" Clauses:**
Used after reporting verbs, adjectives, and nouns.
Examples: I think that this idea is brilliant.
The fact that he apologized surprised everyone.

**2. "What" Clauses:**
Mean 'the thing which' or 'the fact that.'
Examples: What you did was irresponsible.
What matters most is honesty.

**3. "Whatever" Clauses:**
Mean 'anything that' or 'no matter what.'
Examples: You can choose whatever you like.
Whatever you decide will be fine with me.`,

  table: {
    title: "📋 Nominal Clauses (that, what, whatever)",
    data: [
      { category: "What are Nominal Clauses?", explanation: "Dependent clauses that function as NOUNS in sentences", turkish: "İsim cümlecikleri - cümle içinde isim gibi işlev gören yan cümleler", function: "Act as subjects, objects, or complements in sentences", note: "Very common in formal and academic English", also_called: "Noun clauses" },

      { category: "Three Main Types", that_clause: "THAT-clauses: I think that this is important.", what_clause: "WHAT-clauses: What you did was wrong. (the thing which)", whatever_clause: "WHATEVER-clauses: Whatever you decide is fine. (anything that)", note: "Each type has different meanings and uses" },

      { category: "THAT-Clauses - Basic Structure", pattern: "Subject + verb + THAT + full clause", examples: "I think that this idea is brilliant. / She knows that I'm right. / We believe that education matters.", function: "Introduce statements, beliefs, thoughts, facts", note: "THAT can often be omitted in informal speech", omission: "I think (that) it's good. - both correct!" },

      { category: "THAT-Clauses: After Reporting Verbs", common_verbs: "think, believe, know, say, feel, hope, expect, understand, realize, suppose", examples: "I believe that success requires effort. / She thinks that climate change is serious. / They know that grammar is important.", use: "Express opinions, beliefs, knowledge", note: "Very common pattern in English!" },

      { category: "THAT-Clauses: After Adjectives", pattern: "Subject + BE + adjective + THAT + clause", examples: "I'm happy that you came. / It's obvious that he's lying. / She's certain that it will work.", common_adjectives: "happy, sad, glad, sure, certain, obvious, clear, important, essential, surprising", use: "Express emotional reactions or certainty", note: "THAT cannot be omitted after adjectives!" },

      { category: "THAT-Clauses: After Nouns", pattern: "Noun + THAT + clause", examples: "The fact that he apologized surprised me. / The idea that money buys happiness is false. / The claim that he's innocent is doubtful.", common_nouns: "fact, idea, belief, claim, news, rumor, possibility, chance, hope, fear", use: "Add information about abstract nouns", note: "More formal, common in academic writing" },

      { category: "WHAT-Clauses - Meaning", meaning: "'The thing which' or 'the fact that'", examples: "What you did was irresponsible. (= The thing which you did...) / What matters most is honesty. (= The thing which matters...) / I understand what you mean. (= the thing which you mean)", note: "WHAT always functions as subject or object within the clause", difference: "WHAT ≠ THAT! What has meaning ('the thing which'), that is just a connector" },

      { category: "WHAT-Clauses: As Subject", structure: "WHAT + clause + verb (+ complement)", examples: "What surprises me is his patience. / What he needs is a vacation. / What matters most is family.", use: "The whole what-clause is the subject of the main verb", note: "Very common in emphatic statements", emphasis: "Puts focus on the result or conclusion" },

      { category: "WHAT-Clauses: As Object", structure: "Subject + verb + WHAT + clause", examples: "I know what you mean. / She understands what I'm saying. / They discovered what was wrong.", use: "The what-clause is the object of the main verb", note: "Common in everyday speech", remember: "WHAT has meaning - it refers to something specific" },

      { category: "WHATEVER-Clauses - Meaning", meaning: "'Anything that' or 'no matter what'", examples: "You can choose whatever you like. (= anything that you like) / Whatever you decide will be fine. (= No matter what you decide) / I'll support whatever choice you make.", use: "Show flexibility, acceptance, or lack of restriction", note: "Shows openness to all possibilities" },

      { category: "WHATEVER: All Possibilities", structure: "WHATEVER + clause", examples: "Whatever happens, we'll be okay. / You can say whatever you want. / Whatever she chooses will be expensive.", meaning: "ALL options are acceptable, NO restrictions", note: "Sometimes shows indifference: 'I don't care what'", tone: "Can be positive (flexible) or negative (indifferent)" },

      { category: "Other Nominal Clause Words", whoever: "whoever (= anyone who): Whoever arrives first can start.", whichever: "whichever (= any one which): Choose whichever you prefer.", wherever: "wherever (= any place where): Sit wherever you like.", whenever: "whenever (= any time when): Come whenever you want.", however: "however (= in whatever way): However you do it is fine.", note: "All function as nominal clauses!" },

      { category: "Formal vs Informal - THAT Omission", formal_written: "I believe that education is crucial. (keep THAT)", informal_spoken: "I think it's good. (omit THAT)", rule: "Can omit THAT after thinking/saying verbs in casual speech", cannot_omit: "NEVER omit after adjectives or nouns: I'm glad that... ✓ (NOT: I'm glad X)", note: "Academic writing = keep THAT | Casual speech = can omit" },

      { category: "Word Order in WHAT-Clauses", correct_order: "WHAT + subject + verb", examples: "What he said was true. / What you need is rest. / I know what she wants.", wrong_order: "NOT: What said he ✗ / What need you ✗", rule: "Normal statement word order AFTER what", remember: "WHAT + subject + verb (NOT: what + verb + subject)" },

      { category: "THAT vs WHAT - Critical Difference", that_clause: "THAT = connector only, no meaning by itself", example_that: "I know that you're right. (that = connector)", what_clause: "WHAT = 'the thing which', has meaning", example_what: "I know what you mean. (what = the thing which)", wrong: "I know what you're right ✗ (wrong meaning!)", correct: "I know that you're right ✓ / I know what you said ✓", remember: "THAT connects ideas | WHAT refers to things" },

      { category: "Common Mistakes", mistake_1: "Confusing THAT and WHAT", wrong_1: "I think what it's good ✗", correct_1: "I think that it's good ✓ / I know what it is ✓", rule: "THAT for statements/beliefs | WHAT for identifying things", remember: "What you think (the content) vs. that you think (the fact)" },

      { category: "Common Mistakes", mistake_2: "Wrong word order in what-clauses", wrong_2: "What is your problem? (question) vs. I know what is your problem ✗ (clause)", correct_2: "I know what your problem is ✓", rule: "In nominal clauses, use STATEMENT word order, not question order", remember: "WHAT + subject + verb (statement order)" },

      { category: "In Academic Writing", common_use: "It is believed that... / The fact that... / What is important is that...", examples: "The fact that climate change is real cannot be denied. / What research shows is that education reduces poverty. / It is clear that action is needed.", note: "Very common in essays, research papers, formal reports", formality: "Nominal clauses make writing more sophisticated" },

      { category: "Real-World Uses", expressing_beliefs: "I think that this is important. / I believe that we can succeed.", identifying_things: "What I need is time. / I understand what you mean.", showing_flexibility: "Whatever you decide is fine with me. / I'll do whatever it takes.", reporting_facts: "The fact that he lied shocked everyone.", note: "Essential for clear, sophisticated communication!" },

      { category: "Key Takeaway", summary: "Nominal clauses function as nouns within sentences", that_clauses: "THAT-clauses: I think that... (connector, express beliefs/facts)", what_clauses: "WHAT-clauses: What I need is... ('the thing which', identify things)", whatever_clauses: "WHATEVER-clauses: Whatever you choose... ('anything that', show flexibility)", functions: "Subject: What matters is... | Object: I know what... | After adjectives: I'm glad that...", omission: "Can omit THAT after verbs (informal) | Cannot omit after adjectives/nouns", word_order: "WHAT + subject + verb (statement order, not question order)", that_vs_what: "THAT = connector (no meaning) | WHAT = 'the thing which' (has meaning)", formality: "Essential for academic writing and formal communication", remember: "Mastering nominal clauses = sophisticated English!", next: "Practice identifying and creating nominal clauses in your writing!" }
    ]
  },

  speakingPractice: [
    { question: "What do you think is the biggest problem in modern education?", answer: "I believe that the system focuses too much on exams rather than creativity." },
    { question: "What surprised you most about living abroad?", answer: "What surprised me most was how friendly and open people can be." },
    { question: "What do you appreciate most in a friendship?", answer: "What I value most is honesty and loyalty." },
    { question: "What do you think causes stress in the workplace?", answer: "I think that unclear expectations are the main reason." },
    { question: "What makes you feel proud of yourself?", answer: "What makes me proud is overcoming challenges I thought I couldn't handle." },
    { question: "What do you believe about happiness?", answer: "I believe that happiness comes from within, not from material things." },
    { question: "What did you learn from your biggest mistake?", answer: "What I learned is that every failure teaches something valuable." },
    { question: "What annoys you about social media?", answer: "What annoys me is how fake people can appear online." },
    { question: "What do you think is the key to success?", answer: "I think that consistency matters more than talent." },
    { question: "What do you think people misunderstand about you?", answer: "I feel that people mistake my silence for indifference." },
    { question: "What would you do if you had unlimited money?", answer: "I'd probably do whatever makes me feel useful to others." },
    { question: "What do you think defines true intelligence?", answer: "What defines it is not knowledge, but the ability to adapt." },
    { question: "What do you think love really means?", answer: "I believe that love means accepting someone completely." },
    { question: "What makes you feel alive?", answer: "What makes me feel alive is creating something meaningful." },
    { question: "What's something that motivates you every day?", answer: "What keeps me going is the idea that I can always improve." },
    { question: "What do you think people should stop worrying about?", answer: "I think that people should stop worrying about others' opinions." },
    { question: "What inspires you the most?", answer: "What inspires me most is seeing people achieve the impossible." },
    { question: "What do you think technology has changed the most?", answer: "I believe that it has completely reshaped communication." },
    { question: "What do you find most challenging about modern life?", answer: "What I find most challenging is maintaining balance and focus." },
    { question: "What do you think we can learn from history?", answer: "What history teaches us is that ignorance always repeats itself." },
    { question: "What do you think about people who work too much?", answer: "I think that they often mistake productivity for purpose." },
    { question: "What matters most to you in life?", answer: "What matters most to me is peace of mind." },
    { question: "What makes you laugh no matter what?", answer: "What always makes me laugh is my family's absurd sense of humor." },
    { question: "What do you think people should appreciate more?", answer: "I think that people should appreciate time and health." },
    { question: "What did you discover about yourself recently?", answer: "What I discovered is that I'm stronger than I thought." },
    { question: "What do you think ruins relationships?", answer: "I believe that lack of communication ruins most of them." },
    { question: "What makes a person wise, in your opinion?", answer: "What makes a person wise is the ability to listen before speaking." },
    { question: "What's something that always calms you down?", answer: "What calms me down is listening to rain sounds." },
    { question: "What kind of people inspire you?", answer: "What inspires me is people who remain kind despite difficulties." },
    { question: "What's something you wish people understood better?", answer: "I wish that people understood how words can deeply affect others." },
    { question: "What do you find hardest about forgiving someone?", answer: "What's hardest is forgetting the emotional pain, not the event." },
    { question: "What makes you feel confident?", answer: "What gives me confidence is preparation and self-discipline." },
    { question: "What do you think destroys creativity?", answer: "I believe that fear of failure is creativity's biggest enemy." },
    { question: "What would you change about the education system?", answer: "I'd change whatever limits curiosity and critical thinking." },
    { question: "What do you think defines a true friend?", answer: "What defines a true friend is being there even in silence." },
    { question: "What do you think people regret most in life?", answer: "What most people regret is not taking chances when they could." },
    { question: "What's something that always inspires you to keep trying?", answer: "What inspires me is the thought that progress takes patience." },
    { question: "What's something you'll never forget?", answer: "What I'll never forget is the kindness of people during hard times." },
    { question: "What do you think shapes a person's character the most?", answer: "What shapes character most is how one reacts to failure." },
    { question: "What would you do differently if you could go back in time?", answer: "I'd do whatever helps me grow sooner and hurt fewer people." }
  ]
};

// Module 205: Participle Clauses
const MODULE_205_DATA = {
  title: "Module 205 - Participle Clauses",
  description: "Master participle clauses to create sophisticated, concise sentences in formal and academic English",
  intro: `📘 Lesson Objectives
✅ Understand and use present participle clauses (-ing)
✅ Master past participle clauses (-ed/irregular)
✅ Apply perfect participle clauses (having + past participle)
✅ Use participle clauses to show time, reason, and result
✅ Recognize when participle clauses are appropriate in formal contexts

🔍 Grammar Deep Dive

**What Are Participle Clauses?**
Participle clauses are reduced subordinate clauses that use participles (verb forms) instead of full clauses with subjects and verbs. They make writing more concise and sophisticated.

**Types of Participle Clauses:**

1️⃣ **Present Participle (-ing)** - Shows simultaneous action or active voice
   📌 "Walking down the street, I saw an old friend."
   📌 "Being a vegetarian, she doesn't eat meat."

2️⃣ **Past Participle (-ed/irregular)** - Shows passive voice or completed action
   📌 "Written in simple language, the book was easy to understand."
   📌 "Shocked by the news, he couldn't speak."

3️⃣ **Perfect Participle (having + past participle)** - Shows action completed before another action
   📌 "Having finished her work, she went home."
   📌 "Having been warned about the risks, they decided to proceed."

**When to Use Participle Clauses:**
✅ To show cause/reason: "Being tired, I went to bed early."
✅ To show time: "Arriving at the station, we bought our tickets."
✅ To give additional information: "The woman standing by the door is my teacher."
✅ To show result: "The company went bankrupt, leaving 500 employees without jobs."

**Important Rules:**
⚠️ The subject of both clauses must be the same
⚠️ Mostly used in formal/academic writing
⚠️ Cannot use in spoken casual conversation (sounds unnatural)`,

  table: {
    title: "📋 Participle Clauses (Advanced Sentence Reduction)",
    data: [
      { category: "What are Participle Clauses?", explanation: "Reduced subordinate clauses using participles (verb forms) instead of full clauses", purpose: "Make writing more concise and sophisticated", turkish: "Ortaç cümlecikleri - cümleyi kısaltmak için fiil çekimleri kullanma", function: "Show time, reason, result, or give additional information", note: "VERY formal - used in academic writing, NOT casual speech" },

      { category: "Three Types", present_participle: "Present Participle (-ing): Walking down the street, I saw...", past_participle: "Past Participle (-ed/irregular): Written in 1999, the book...", perfect_participle: "Perfect Participle (having + pp): Having finished, she left.", note: "Each type shows different time relationships and voice", critical: "The subject of BOTH clauses must be the SAME!" },

      { category: "PRESENT PARTICIPLE (-ing)", form: "Verb-ing + rest of clause", meaning: "Shows SIMULTANEOUS action or ACTIVE voice", examples: "Walking down the street, I saw an old friend. / Being a vegetarian, she doesn't eat meat. / Living in Istanbul, I experience diverse cultures.", use: "Actions happening at the same time OR reasons", note: "Most common type of participle clause" },

      { category: "Present Participle: Time (Simultaneous)", structure: "-ing clause + main clause", examples: "Arriving at the station, we bought tickets. (= When we arrived...) / Crossing the street, he dropped his phone. (= While crossing...)", meaning: "Two actions happening at the SAME TIME", transformation: "When/While + full clause → -ing clause", note: "Shows actions occurring together" },

      { category: "Present Participle: Reason/Cause", structure: "-ing clause + main clause", examples: "Being tired, I went to bed early. (= Because I was tired...) / Knowing the risks, they decided to proceed. (= Because they knew...) / Having no money, he couldn't buy food. (= Because he had...)", meaning: "Explains WHY something happened", transformation: "Because/Since/As + full clause → -ing clause", note: "Very common pattern for expressing reasons" },

      { category: "PAST PARTICIPLE (-ed/irregular)", form: "Past participle (pp) + rest of clause", meaning: "Shows PASSIVE voice or COMPLETED action", examples: "Written in simple language, the book was easy to understand. (= Because it was written...) / Shocked by the news, he couldn't speak. (= Because he was shocked...) / Built in 1850, the house is very old.", use: "When the subject RECEIVES the action (passive)", note: "Subject must be able to be acted upon" },

      { category: "Past Participle: Passive Voice", structure: "pp clause + main clause", examples: "Painted blue, the room looks bigger. (= The room was painted blue, so...) / Taken twice daily, this medicine works well. (= If it is taken...) / Located in the city center, the hotel is convenient.", meaning: "Subject is PASSIVE (receives the action)", transformation: "Because/When it was + pp → pp clause", note: "Common with descriptions and instructions" },

      { category: "PERFECT PARTICIPLE (having + pp)", form: "Having + past participle + rest of clause", meaning: "Shows action COMPLETED BEFORE another action", examples: "Having finished her work, she went home. (= After she finished...) / Having been warned, they were careful. (= Because they had been warned...) / Having lived there for years, I know it well.", use: "Make the time sequence CLEAR", note: "Emphasizes that first action is COMPLETELY FINISHED before second" },

      { category: "Perfect Participle: Active vs Passive", active: "Having finished (= After I finished) - I did it", passive: "Having been finished (= After it was finished) - Someone else did it", examples_active: "Having eaten dinner, we watched TV.", examples_passive: "Having been told the truth, she forgave him.", note: "Active: having + pp | Passive: having been + pp", choose: "Active if subject does action | Passive if subject receives action" },

      { category: "When to Use Participle Clauses", time: "Show when: Arriving home, I called you.", reason: "Show why: Being tired, I slept early.", result: "Show result: The storm destroyed the city, leaving thousands homeless.", additional_info: "Give extra info: The woman sitting by the door is my teacher.", note: "Very versatile structure!", formality: "ONLY use in formal/academic writing, NOT speech" },

      { category: "Subject Must Be the Same!", correct: "Walking home, I saw John. (I walked, I saw - same subject ✓)", wrong: "Walking home, John was seen by me. ✗ (I walked, but John was seen - different!)", rule: "The subject of the participle clause and main clause MUST be identical", critical: "This is the most common error with participle clauses!", remember: "Same subject in both clauses!" },

      { category: "Transformation: Full Clause → Participle", original: "When I walked down the street, I saw an old friend.", step_1: "Identify same subject in both clauses (I)", step_2: "Remove subject from first clause", step_3: "Change verb to -ing form", result: "Walking down the street, I saw an old friend.", note: "Only works if subjects are identical!" },

      { category: "Participle at End of Sentence", structure: "Main clause + participle clause (result)", examples: "The company went bankrupt, leaving 500 employees without jobs. / He passed the exam, surprising everyone. / She left the room, slamming the door.", use: "Show RESULT or consequence of the main action", note: "Participle clause comes AFTER to show what happened as a result", position: "Beginning (time/reason) vs. End (result)" },

      { category: "With Conjunctions (Less Common)", structure: "Conjunction + participle", examples: "While walking home, I met John. / After finishing work, she relaxed. / Before leaving, check everything.", note: "Can keep conjunctions for extra clarity", use: "Less concise but clearer time reference", formality: "Still formal, but slightly less formal than pure participle clauses" },

      { category: "Negative Participle Clauses", structure: "NOT + -ing/pp", examples: "Not knowing the answer, I stayed quiet. / Not having studied, he failed the exam. / Not wanting to disturb her, I left silently.", use: "Show negative reason or condition", note: "NOT comes BEFORE the participle", remember: "Not -ing / Not having + pp" },

      { category: "Common Mistakes", mistake_1: "Different subjects (Dangling Participle)", wrong_1: "Driving to work, the accident happened. ✗ (Who was driving? The accident? No!)", correct_1: "Driving to work, I saw an accident. ✓ (I drove, I saw - same subject)", rule: "Subject of both clauses must match", critical: "This creates confusion and is grammatically wrong!" },

      { category: "Common Mistakes", mistake_2: "Using in casual speech", wrong_context: "Saying this in conversation: 'Being tired, I went home.' ✗ (sounds unnatural!)", correct_context: "Normal speech: 'I was tired, so I went home.' ✓", rule: "Participle clauses are for FORMAL WRITING only", remember: "Don't use in everyday conversation - sounds awkward!" },

      { category: "Formal vs Informal", formal_written: "Having completed the survey, participants received compensation. (academic paper)", informal_spoken: "After they completed the survey, participants got paid. (natural speech)", use_formal: "Essays, research papers, reports, formal business writing", use_informal: "Conversations, emails to friends, casual writing", note: "Know your audience and context!" },

      { category: "Academic Writing Examples", typical: "Having analyzed the data, researchers concluded that... / Located in Southeast Asia, Vietnam has a rich history. / Published in 2020, the study examined...", use: "Make academic writing more concise and professional", note: "EXTREMELY common in research papers and essays", benefit: "Reduces word count while maintaining clarity" },

      { category: "Real-World Uses", academic_papers: "Having reviewed the literature, we propose... / Conducted over three years, the study showed...", business_reports: "Facing financial difficulties, the company restructured. / Being the market leader, we have responsibilities.", news_writing: "Elected in 2020, the president faces challenges. / Located downtown, the building attracts visitors.", note: "Highly valued in professional and academic contexts!", remember: "NOT for casual emails or conversations!" },

      { category: "Key Takeaway", summary: "Participle clauses reduce subordinate clauses to make writing concise and sophisticated", types: "Present (-ing): simultaneous/active | Past (pp): passive/completed | Perfect (having + pp): completed before", use: "Time: Arriving home... | Reason: Being tired... | Result: ...leaving chaos | Additional info: The woman sitting...", critical_rule: "Subject of BOTH clauses must be THE SAME (avoid dangling participles!)", formality: "VERY FORMAL - use in academic writing, business reports, NOT casual speech!", transformation: "When/Because + full clause → participle clause (remove subject, change verb form)", negative: "Not + -ing / Not having + pp", position: "Beginning (time/reason) | End (result)", remember: "Master this = sound like an academic expert! But don't overuse or use in wrong context!", next: "Practice transforming full clauses to participle clauses in formal writing!" }
    ]
  },
  speakingPractice: [
    {
      question: "Knowing that traffic would be heavy, how do you usually plan your morning commute?",
      answer: "Knowing that traffic would be heavy, I usually leave home at least 30 minutes earlier than necessary. I also check traffic apps before departing to find alternative routes if needed."
    },
    {
      question: "Having lived in Turkey for several years, what cultural differences surprised you the most?",
      answer: "Having lived in Turkey for several years, I was most surprised by the strong sense of hospitality and community. The way neighbors help each other and the importance of family gatherings were quite different from what I'd experienced before."
    },
    {
      question: "Being interested in technology, what recent innovation excites you?",
      answer: "Being interested in technology, I'm really excited about advances in artificial intelligence and renewable energy. The potential for AI to solve complex problems while green technology addresses climate change is remarkable."
    },
    {
      question: "Written by your favorite author, what would your dream book be about?",
      answer: "Written by my favorite author, my dream book would be a psychological thriller set in Istanbul, combining mystery with deep character development and beautiful descriptions of the city's hidden corners."
    },
    {
      question: "Having studied English for many years, what has been your biggest challenge?",
      answer: "Having studied English for many years, my biggest challenge has been mastering idioms and cultural references. While grammar can be learned systematically, understanding native expressions requires constant exposure to authentic content."
    },
    {
      question: "Tired of the daily routine, what changes would you make to your lifestyle?",
      answer: "Tired of the daily routine, I would incorporate more spontaneous activities into my week, perhaps taking different routes to work, trying new restaurants, or dedicating one day each month to completely unplanned adventures."
    },
    {
      question: "Watching the news every day, how do you feel about current global events?",
      answer: "Watching the news every day, I feel both informed and sometimes overwhelmed. While it's important to stay aware of global events, I've learned to balance news consumption with positive content to maintain mental well-being."
    },
    {
      question: "Having been promoted recently, what new responsibilities are you facing?",
      answer: "Having been promoted recently, I'm now responsible for managing a team of five people and overseeing multiple projects simultaneously. It's challenging but rewarding to mentor others and contribute to strategic decisions."
    },
    {
      question: "Realizing the importance of health, what habits have you changed?",
      answer: "Realizing the importance of health, I've started exercising regularly, meal prepping on weekends, and prioritizing sleep. I've also reduced my screen time before bed and started practicing mindfulness meditation."
    },
    {
      question: "Having visited many countries, which destination left the strongest impression on you?",
      answer: "Having visited many countries, Japan left the strongest impression on me. The perfect blend of ancient traditions and cutting-edge technology, combined with the respectful culture and incredible attention to detail, was unforgettable."
    },
    {
      question: "Understanding the environmental crisis, what steps are you taking to reduce your carbon footprint?",
      answer: "Understanding the environmental crisis, I've switched to using public transportation and cycling more often, reduced my meat consumption, and started buying locally-produced goods. I also avoid single-use plastics and participate in local clean-up initiatives."
    },
    {
      question: "Having worked remotely for the past year, what advantages and disadvantages have you discovered?",
      answer: "Having worked remotely for the past year, I've discovered that while the flexibility and lack of commute are wonderful, the blurred boundaries between work and personal life can be challenging. I miss spontaneous office conversations but appreciate the focused work environment at home."
    },
    {
      question: "Inspired by a mentor, what career path did you decide to pursue?",
      answer: "Inspired by a mentor who showed me the impact of education, I decided to pursue a career in teaching and curriculum development. Seeing how one person can influence so many lives motivated me to follow that path."
    },
    {
      question: "Having grown up in a bilingual household, what advantages did this give you?",
      answer: "Having grown up in a bilingual household, I developed strong cognitive flexibility and cultural awareness from an early age. Switching between languages became natural, and I found learning additional languages much easier later in life."
    },
    {
      question: "Recognizing the power of social media, how has it changed your communication habits?",
      answer: "Recognizing the power of social media, I've become more conscious about what I share online and how I interact with others. While it keeps me connected to friends worldwide, I've set boundaries to ensure it doesn't consume too much of my time."
    },
    {
      question: "Having been rejected several times, how did you maintain motivation to keep trying?",
      answer: "Having been rejected several times, I learned to view each rejection as feedback rather than failure. I analyzed what went wrong, improved my approach, and reminded myself that persistence is often more important than initial talent."
    },
    {
      question: "Feeling overwhelmed by information, how do you prioritize what to learn?",
      answer: "Feeling overwhelmed by information, I've learned to focus on depth rather than breadth. I identify core skills relevant to my goals and dedicate focused time to mastering them, rather than superficially consuming endless content."
    },
    {
      question: "Having experienced both Eastern and Western work cultures, what key differences stand out?",
      answer: "Having experienced both Eastern and Western work cultures, I noticed that Eastern workplaces often emphasize hierarchy and group harmony, while Western environments tend to value individual initiative and direct communication. Both have their merits depending on the context."
    },
    {
      question: "Surrounded by technological distractions, how do you maintain focus on important tasks?",
      answer: "Surrounded by technological distractions, I use the Pomodoro technique and keep my phone in another room during deep work sessions. I also schedule specific times for checking emails and social media rather than responding constantly."
    },
    {
      question: "Having learned from past mistakes, what advice would you give your younger self?",
      answer: "Having learned from past mistakes, I would tell my younger self to embrace failure as a learning opportunity, invest more in relationships than possessions, and start developing good habits early because they compound over time."
    },
    {
      question: "Observing successful people around you, what common traits have you noticed?",
      answer: "Observing successful people around me, I've noticed they consistently demonstrate discipline, maintain curiosity regardless of age, build strong networks, and aren't afraid to ask for help. They also tend to focus on long-term goals rather than short-term gratification."
    },
    {
      question: "Having been influenced by a particular book, how did it change your perspective?",
      answer: "Having been influenced by 'Thinking, Fast and Slow,' I became much more aware of my cognitive biases and decision-making processes. It taught me to slow down and think critically about important choices rather than relying solely on intuition."
    },
    {
      question: "Facing a difficult decision, what process do you follow to reach clarity?",
      answer: "Facing a difficult decision, I first gather all relevant information, then list pros and cons for each option. I consult trusted advisors, consider long-term consequences, and often sleep on it before making a final choice."
    },
    {
      question: "Having participated in team projects, what role do you naturally gravitate toward?",
      answer: "Having participated in many team projects, I naturally gravitate toward the coordinator role. I enjoy organizing tasks, ensuring deadlines are met, and facilitating communication between team members, while also contributing creative ideas."
    },
    {
      question: "Concerned about work-life balance, what boundaries have you established?",
      answer: "Concerned about work-life balance, I've established clear boundaries like not checking work emails after 7 PM, dedicating weekends to personal activities, and communicating my availability clearly to colleagues. I've learned that being unavailable sometimes makes me more productive when I am working."
    },
    {
      question: "Having developed a new skill recently, what motivated you to learn it?",
      answer: "Having developed photography skills recently, I was motivated by wanting to capture and preserve meaningful moments more artistically. I also appreciated that it forced me to be more observant and present in everyday situations."
    },
    {
      question: "Witnessing rapid technological change, how do you stay relevant in your field?",
      answer: "Witnessing rapid technological change, I dedicate time each week to learning through online courses, attending webinars, and experimenting with new tools. I also participate in professional communities where I can exchange knowledge with peers."
    },
    {
      question: "Having experienced different educational systems, which approach do you think is most effective?",
      answer: "Having experienced different educational systems, I believe the most effective approach combines structure with flexibility—providing clear learning objectives while allowing students to explore topics that interest them. Project-based learning that connects theory to real-world applications seems particularly effective."
    },
    {
      question: "Thinking about future career trends, what skills do you believe will be essential?",
      answer: "Thinking about future career trends, I believe critical thinking, adaptability, and emotional intelligence will be essential. While technical skills matter, the ability to learn quickly, collaborate effectively, and solve complex problems will remain valuable regardless of how technology evolves."
    },
    {
      question: "Having overcome a personal challenge, what did you learn about yourself?",
      answer: "Having overcome severe health issues, I learned that I'm far more resilient than I thought. I discovered the importance of patience, the value of a strong support system, and that setbacks can lead to unexpected opportunities for growth and self-discovery."
    },
    {
      question: "Considering the impact of globalization, how has it affected your local community?",
      answer: "Considering the impact of globalization, my local community has become more diverse and interconnected. While we've gained access to international products and ideas, we've also had to work harder to preserve local traditions and support small businesses against global competition."
    },
    {
      question: "Having managed conflict in professional settings, what strategies work best?",
      answer: "Having managed various workplace conflicts, I've found that addressing issues early, listening actively to all perspectives, focusing on interests rather than positions, and seeking win-win solutions work best. Maintaining professionalism and avoiding personal attacks is crucial."
    },
    {
      question: "Reflecting on your education, what subjects do you wish you had studied more seriously?",
      answer: "Reflecting on my education, I wish I had studied psychology and philosophy more seriously. Understanding human behavior and critical thinking frameworks would have benefited both my personal relationships and professional decision-making throughout my life."
    },
    {
      question: "Having adapted to unexpected life changes, what coping mechanisms have you found most helpful?",
      answer: "Having adapted to several unexpected life changes, I've found that maintaining routines provides stability, staying connected with supportive people prevents isolation, and viewing change as opportunity rather than loss helps maintain a positive outlook. Physical exercise and journaling also help process emotions."
    },
    {
      question: "Experiencing different leadership styles, which approach do you find most effective?",
      answer: "Experiencing different leadership styles, I find that transformational leadership—inspiring and developing team members while maintaining clear vision—is most effective. Leaders who balance empathy with accountability and empower others rather than micromanaging create the strongest teams."
    },
    {
      question: "Having invested time in personal development, what areas have brought the most return?",
      answer: "Having invested considerable time in personal development, improving communication skills has brought the most return. Better communication has enhanced my relationships, career opportunities, and ability to resolve conflicts. Developing emotional intelligence was also transformative."
    },
    {
      question: "Observing generational differences in the workplace, how can organizations bridge these gaps?",
      answer: "Observing generational differences, organizations can bridge gaps by fostering mentorship programs, creating diverse teams that blend experience with fresh perspectives, offering flexible work arrangements, and avoiding stereotypes. Focusing on shared goals rather than differences helps create cohesive teams."
    },
    {
      question: "Having cultivated meaningful relationships, what do you consider essential for maintaining them?",
      answer: "Having cultivated meaningful relationships over the years, I've learned that consistent communication, mutual respect, and genuine interest in the other person's life are essential. Being present during both celebrations and challenges, and investing time even when busy, keeps relationships strong."
    },
    {
      question: "Facing the challenges of modern parenting, what approach do you think balances freedom and guidance?",
      answer: "Facing modern parenting challenges, I believe setting clear boundaries while encouraging independence works best. Explaining reasons behind rules, allowing age-appropriate choices, and maintaining open communication helps children develop critical thinking while feeling supported and safe."
    },
    {
      question: "Having explored different creative outlets, what benefits have you experienced?",
      answer: "Having explored various creative outlets like writing, painting, and music, I've experienced improved stress management, enhanced problem-solving abilities, and greater self-expression. Creative activities provide a refreshing counterbalance to analytical work and offer a sense of accomplishment that's intrinsically rewarding."
    }
  ]
};

// Module 206: Complex Sentences - Combining Multiple Clauses
const MODULE_206_DATA = {
  title: "Module 206 - Complex Sentences: Combining Multiple Clauses",
  description: "Master the art of constructing sophisticated complex sentences by skillfully combining multiple clauses",
  intro: `📘 Lesson Objectives
✅ Combine independent and dependent clauses effectively
✅ Use coordinating and subordinating conjunctions appropriately
✅ Create balanced and sophisticated sentence structures
✅ Avoid run-on sentences and comma splices
✅ Apply complex sentences in academic and professional writing

🔍 Grammar Deep Dive

**What Are Complex Sentences?**
Complex sentences contain one independent clause and at least one dependent clause, connected by subordinating conjunctions or relative pronouns.

**Sentence Structure Types:**

1️⃣ **Simple Sentence** - One independent clause
   📌 "I love reading."

2️⃣ **Compound Sentence** - Two or more independent clauses joined by coordinating conjunctions (FANBOYS: for, and, nor, but, or, yet, so)
   📌 "I love reading, and my sister loves writing."

3️⃣ **Complex Sentence** - One independent + one or more dependent clauses
   📌 "Although I'm busy, I love reading because it relaxes me."

4️⃣ **Compound-Complex Sentence** - Two or more independent clauses + one or more dependent clauses
   📌 "Although I'm busy, I love reading, and my sister loves writing because it's creative."

**Subordinating Conjunctions:**
⏰ Time: when, while, as, before, after, until, since
🎯 Cause/Effect: because, since, as, so that
⚖️ Contrast: although, though, even though, whereas, while
🔀 Condition: if, unless, provided that, as long as

**Relative Pronouns:**
who, whom, whose, which, that, where, when, why

**Important Tips:**
✅ Vary sentence length and structure for better flow
✅ Use complex sentences to show relationships between ideas
✅ Avoid excessive subordination (too many clauses)
✅ Ensure logical connections between clauses`,
  speakingPractice: [
    {
      question: "Although technology has made life easier, what are some drawbacks that concern you?",
      answer: "Although technology has made life easier in many ways, I'm concerned about privacy issues and the fact that people are becoming more disconnected from face-to-face interactions, which are essential for building genuine relationships."
    },
    {
      question: "When you face a difficult decision, how do you approach it, and what factors do you consider most important?",
      answer: "When I face a difficult decision, I try to step back and analyze all available options while considering both short-term consequences and long-term implications, because I've learned that hasty decisions often lead to regret."
    },
    {
      question: "Since remote work has become more common, how has your work-life balance changed, if at all?",
      answer: "Since remote work has become more common, my work-life balance has improved because I can manage my time more flexibly, although I sometimes struggle with setting clear boundaries between work hours and personal time."
    },
    {
      question: "While some people prefer living in big cities, others choose small towns. What's your preference and why?",
      answer: "While some people prefer living in big cities for the opportunities and excitement, I actually prefer small towns because they offer a sense of community and peace that's hard to find in urban environments, even though career options might be more limited."
    },
    {
      question: "Describe a situation where you had to adapt quickly, explaining what happened and how you handled it.",
      answer: "Last year, when my company restructured suddenly and my role changed completely, I had to adapt quickly by learning new skills, which was challenging but ultimately rewarding because it pushed me out of my comfort zone and helped me discover capabilities I didn't know I had."
    },
    {
      question: "If you could change one thing about the education system, what would it be, and what impact do you think it would have?",
      answer: "If I could change one thing about the education system, I would introduce more practical, real-world applications of theoretical knowledge, because students often struggle to see the relevance of what they're learning, which can lead to disengagement and a lack of motivation."
    },
    {
      question: "Although everyone needs rest, many people struggle to take breaks. Why do you think this is?",
      answer: "Although everyone needs rest to maintain productivity and health, many people struggle to take breaks because modern work culture often glorifies being busy, and there's pressure to always be available, which creates guilt around resting even when it's necessary."
    },
    {
      question: "Before making a major purchase, what research do you do, and why is this process important to you?",
      answer: "Before making a major purchase, I extensively research product reviews, compare prices across different retailers, and read expert opinions because I want to ensure that I'm making an informed decision that provides value for money and meets my actual needs rather than just satisfying an impulse."
    },
    {
      question: "What skill would you like to develop, and how do you think it would benefit your personal or professional life?",
      answer: "I would like to develop better public speaking skills because it would enhance my professional confidence, help me communicate ideas more effectively in meetings, and open up opportunities for leadership roles, even though the thought of speaking in front of large audiences currently makes me nervous."
    },
    {
      question: "Since social media became popular, how have your communication habits changed with friends and family?",
      answer: "Since social media became popular, I've noticed that while I stay updated on friends' lives more easily through posts and stories, I actually have fewer deep, meaningful conversations because we often feel we already know what's happening, which has made me more intentional about scheduling real conversations."
    },
    {
      question: "Explain a time when you had to work with someone whose views differed greatly from yours. How did you manage?",
      answer: "When I worked on a project with a colleague who had completely different political views, I initially found it challenging, but I learned to focus on our shared professional goals while respecting our differences, which actually enriched the project because we considered diverse perspectives that we might have otherwise missed."
    },
    {
      question: "What tradition from your culture do you value most, and why do you think it's important to preserve it?",
      answer: "The tradition I value most is our family's weekly dinner gatherings, where multiple generations come together to share food and stories, because it strengthens family bonds, passes down cultural knowledge to younger members, and provides a consistent anchor in an increasingly fast-paced world."
    },
    {
      question: "If you were to write a book about your life experiences, what would be the central theme, and why?",
      answer: "If I were to write a book about my life experiences, the central theme would be resilience through change, because I've moved between countries multiple times, changed careers twice, and learned that adaptability is more valuable than stability, though maintaining core values throughout transitions is equally important."
    },
    {
      question: "Although exercise is beneficial, many people avoid it. What do you think are the main barriers, and how can they be overcome?",
      answer: "Although exercise is clearly beneficial for physical and mental health, many people avoid it because they perceive it as time-consuming or uncomfortable, but I believe these barriers can be overcome by starting with small, enjoyable activities and gradually building habits rather than attempting dramatic lifestyle changes that are unsustainable."
    },
    {
      question: "When traveling to a new place, what do you prioritize seeing or experiencing, and what does this reveal about your personality?",
      answer: "When traveling to a new place, I prioritize experiencing local food markets and neighborhoods where residents actually live rather than tourist attractions, because I'm genuinely interested in understanding daily life and culture, which probably reveals that I value authentic experiences over superficial ones."
    },
    {
      question: "What childhood experience shaped who you are today, and how has that influence manifested in your adult life?",
      answer: "Growing up with limited resources taught me to be creative and resourceful, because we had to find free or inexpensive ways to entertain ourselves, which has manifested in my adult life as an ability to solve problems creatively and an appreciation for simple pleasures rather than material possessions."
    },
    {
      question: "Since environmental issues have become more pressing, what changes have you made in your daily life, and do you think individual actions matter?",
      answer: "Since environmental issues have become more pressing, I've reduced my meat consumption, started using public transportation more frequently, and minimized single-use plastics, though I sometimes wonder if individual actions matter when corporations produce most emissions, yet I believe collective individual choices can drive systemic change."
    },
    {
      question: "Describe a moment when you realized something important about yourself. What prompted this realization?",
      answer: "I realized I was prioritizing others' expectations over my own happiness when I felt persistently unfulfilled despite achieving traditional success markers, which prompted me to reassess my career path and personal goals, leading to significant life changes that, while risky, have brought much more genuine satisfaction."
    },
    {
      question: "If you could have dinner with any three people, living or dead, whom would you choose, and what would you want to discuss?",
      answer: "If I could have dinner with any three people, I would choose Maya Angelou for her wisdom about resilience, Carl Sagan for his perspective on our place in the universe, and my grandmother whom I never met, because I would want to understand my family history better while discussing how personal stories connect to universal human experiences."
    },
    {
      question: "What aspect of modern life do you think future generations will find strange or difficult to understand?",
      answer: "I think future generations will find it strange that we spent so much time looking at screens while surrounded by people we ignored, because they'll likely have developed different relationship norms with technology, though they might also struggle to understand how we managed before certain innovations that they'll consider essential."
    },
    {
      question: "When you're feeling stressed or overwhelmed, what coping strategies work best for you, and why are they effective?",
      answer: "When I'm feeling stressed or overwhelmed, I find that going for a long walk while listening to music works best because it combines physical movement, which releases endorphins, with mental distraction, and the change of environment provides perspective that helps me see problems differently when I return."
    },
    {
      question: "Although we live in an age of abundant information, why do you think misinformation spreads so easily?",
      answer: "Although we live in an age of abundant information, misinformation spreads easily because people tend to believe content that confirms their existing beliefs without verifying sources, and social media algorithms prioritize engagement over accuracy, which means sensational false claims often reach more people than nuanced truths."
    },
    {
      question: "What lesson did you learn the hard way, and how has it influenced your subsequent decisions?",
      answer: "I learned the hard way that ignoring small problems allows them to become major crises, because I once avoided addressing a minor conflict at work that eventually escalated into a serious issue affecting the entire team, which has influenced me to address concerns promptly even when it's uncomfortable."
    },
    {
      question: "If you could master any art form, what would you choose, and what draws you to it?",
      answer: "If I could master any art form, I would choose piano because music has always moved me emotionally in ways words cannot, and I'm drawn to the piano specifically because it allows both melody and harmony, though I recognize that mastery would require years of dedicated practice that I haven't yet committed to."
    },
    {
      question: "What do you think makes a conversation truly meaningful, and how often do you have such conversations?",
      answer: "I think a conversation becomes truly meaningful when both people feel comfortable being vulnerable, share honest perspectives without judgment, and engage deeply with ideas rather than staying on surface topics, though I must admit such conversations are rare because they require time, trust, and energy that our busy lives don't always permit."
    },
    {
      question: "Since the pandemic changed many aspects of daily life, what change do you hope becomes permanent, and what do you hope returns to normal?",
      answer: "Since the pandemic changed many aspects of daily life, I hope flexible work arrangements become permanent because they've proven that productivity doesn't require constant office presence, though I hope casual social interactions return to normal since spontaneous encounters with acquaintances enriched life in ways video calls cannot replicate."
    },
    {
      question: "What quality do you admire most in others, and do you feel you possess it yourself?",
      answer: "The quality I admire most in others is authentic kindness without expectation of reciprocation, because it demonstrates genuine character rather than strategic niceness, and while I try to embody this quality, I honestly can't always tell whether my kindness is truly selfless or partly motivated by wanting to be liked."
    },
    {
      question: "Describe a time when failure taught you something valuable. What was the situation, and what did you learn?",
      answer: "When I failed to get into my first-choice university despite working extremely hard, I was devastated initially, but I learned that my self-worth shouldn't depend on external achievements, and attending my second-choice school led to opportunities and friendships I wouldn't have found otherwise, which taught me that perceived failures often redirect us toward better paths."
    },
    {
      question: "Although many people claim they value work-life balance, why do you think it's so difficult to achieve in practice?",
      answer: "Although many people claim they value work-life balance, it's difficult to achieve because economic pressures often require long hours to maintain financial security, workplace cultures sometimes punish those who set boundaries, and our own ambitions can drive us to sacrifice personal time, even when we know intellectually that balance is healthier."
    },
    {
      question: "What advice would you give to your younger self, knowing what you know now, and why that specific advice?",
      answer: "I would tell my younger self to worry less about others' opinions and take more risks when opportunities arise, because I now realize that the fear of judgment held me back from experiences that could have accelerated my growth, though I also understand that I probably needed to learn this lesson through experience rather than being told."
    },
    {
      question: "If you had to explain the concept of home to someone who had never had one, what would you say?",
      answer: "I would explain that home isn't necessarily a physical place but rather a feeling of belonging and safety, where you can be your authentic self without pretense, though for many people it is associated with specific locations, and the loss of physical home can be devastating because it represents stability and identity."
    },
    {
      question: "What technological advancement do you think will have the biggest impact in the next decade, and will that impact be primarily positive or negative?",
      answer: "I think artificial intelligence will have the biggest impact in the next decade because it's rapidly advancing into areas that affect employment, decision-making, and creative work, and while it could be tremendously positive by solving complex problems and improving efficiency, it also poses risks to privacy, jobs, and could amplify existing biases if not carefully regulated."
    },
    {
      question: "When you meet someone new, what helps you decide whether you want to develop a friendship with them?",
      answer: "When I meet someone new, I pay attention to whether they listen as much as they talk, show genuine curiosity about others' perspectives, and demonstrate kindness in small interactions with people who can't benefit them, because these qualities suggest emotional intelligence and authenticity, though I also recognize that first impressions can be misleading and sometimes friendships develop unexpectedly."
    },
    {
      question: "What do you think is the relationship between happiness and success, and which should people prioritize?",
      answer: "I believe happiness and success have a complex relationship because while achieving goals can bring satisfaction, pursuing success at the expense of well-being often leads to emptiness, so people should probably prioritize happiness but define success in terms that align with their values rather than external standards, though this is easier to say than to practice consistently."
    },
    {
      question: "Describe an ordinary moment that you found unexpectedly beautiful or meaningful. What made it special?",
      answer: "I remember watching my elderly neighbor carefully watering her small balcony garden one morning, and it struck me as unexpectedly beautiful because her gentle attention to each plant reflected a lifetime of nurturing habits, which made me realize that meaning often exists in simple daily rituals that we usually overlook in our rush toward supposedly important goals."
    },
    {
      question: "Although we have more ways to stay connected than ever before, why do you think loneliness is increasingly common?",
      answer: "Although we have more ways to stay connected than ever before, loneliness is increasingly common because digital communication often lacks the depth and physical presence that create genuine connection, and paradoxically, seeing curated versions of others' lives on social media can make us feel more isolated, even though we're technically more connected than previous generations."
    },
    {
      question: "What principle or value guides your major life decisions, and where does this principle come from?",
      answer: "The principle that guides my major life decisions is whether a choice will help me grow and learn, even if it's uncomfortable, because I value personal development over security, and this principle comes from observing that my greatest growth always followed challenging experiences, though I admit that following this principle consistently requires courage that I don't always have."
    },
    {
      question: "If you could preserve one aspect of current times for future generations to experience, what would it be and why?",
      answer: "If I could preserve one aspect of current times, it would be the experience of genuine multicultural exchange that technology enables, because despite its problems, the internet allows people from vastly different backgrounds to connect and share perspectives in ways that weren't possible before, which I hope fosters greater understanding, though I worry that future developments might fragment this global conversation into echo chambers."
    },
    {
      question: "What do you think future you, looking back on this period of life, will consider most important?",
      answer: "I think future me will consider the relationships I'm building now as most important, because while I'm currently also focused on career advancement and achievement, I've observed that older people rarely regret missing work opportunities but often regret not investing more in meaningful connections, which suggests that I should probably rebalance my priorities even though career concerns feel pressing right now."
    },
    {
      question: "When you encounter someone whose lifestyle or beliefs differ drastically from yours, how do you respond, and what does this reveal about your worldview?",
      answer: "When I encounter someone whose lifestyle or beliefs differ drastically from mine, I try to approach with curiosity rather than judgment because I've learned that understanding different perspectives enriches my own thinking, though I admit I'm not always successful at this, and my willingness to engage reveals that I believe diversity of thought is valuable even when it's challenging to navigate."
    }
  ]
};

// Module 207: Formal and Academic Writing Style
const MODULE_207_DATA = {
  title: "Module 207 - Formal and Academic Writing Style",
  description: "Master formal and academic writing conventions for professional and scholarly contexts",
  intro: `📘 Lesson Objectives
✅ Distinguish between formal and informal language registers
✅ Use appropriate vocabulary and structures for academic writing
✅ Avoid colloquialisms and contractions in formal contexts
✅ Apply hedging language appropriately
✅ Structure arguments using formal discourse markers

🔍 Grammar Deep Dive

**Characteristics of Formal/Academic Writing:**

1️⃣ **Objectivity** - Avoid personal opinions without evidence
   📌 Informal: "I think climate change is bad."
   📌 Formal: "Research indicates that climate change poses significant environmental challenges."

2️⃣ **Precision** - Use specific, technical vocabulary
   📌 Informal: "The economy is getting better."
   📌 Formal: "Economic indicators demonstrate gradual recovery."

3️⃣ **Complexity** - Use sophisticated sentence structures
   📌 Informal: "People work from home now. This has pros and cons."
   📌 Formal: "While remote work offers increased flexibility, it presents challenges regarding collaboration and work-life boundaries."

4️⃣ **Impersonality** - Avoid first/second person when possible
   📌 Informal: "You can see that..."
   📌 Formal: "It can be observed that..." or "One can observe that..."

5️⃣ **Formality** - Avoid contractions, phrasal verbs, slang
   📌 Informal: "Let's check out what happened."
   📌 Formal: "Let us examine the circumstances."

**Common Formal Transitions:**
Furthermore, Moreover, Nevertheless, Consequently, Subsequently, Accordingly, Hence, Thus, Therefore`,
  table: [
    { english: "Informal: get better", turkish: "iyileşmek", example: "Formal: improve, enhance" },
    { english: "Informal: look into", turkish: "araştırmak", example: "Formal: investigate, examine" },
    { english: "Informal: find out", turkish: "öğrenmek", example: "Formal: discover, ascertain" },
    { english: "Informal: show", turkish: "göstermek", example: "Formal: demonstrate, illustrate" },
    { english: "Informal: big", turkish: "büyük", example: "Formal: substantial, significant" },
    { english: "Informal: a lot of", turkish: "çok fazla", example: "Formal: numerous, considerable" },
    { english: "Informal: get", turkish: "almak/elde etmek", example: "Formal: obtain, acquire" },
    { english: "Informal: ask for", turkish: "istemek", example: "Formal: request, solicit" },
    { english: "Informal: talk about", turkish: "hakkında konuşmak", example: "Formal: discuss, address" },
    { english: "Informal: think about", turkish: "düşünmek", example: "Formal: consider, contemplate" },
    { english: "Informal: go up", turkish: "artmak", example: "Formal: increase, escalate" },
    { english: "Informal: go down", turkish: "azalmak", example: "Formal: decrease, decline" },
    { english: "Informal: but", turkish: "ama", example: "Formal: however, nevertheless" },
    { english: "Informal: so", turkish: "bu yüzden", example: "Formal: therefore, consequently" },
    { english: "Informal: also", turkish: "ayrıca", example: "Formal: furthermore, moreover" },
    { english: "Informal: really important", turkish: "çok önemli", example: "Formal: crucial, essential" },
    { english: "Informal: help", turkish: "yardım etmek", example: "Formal: assist, facilitate" },
    { english: "Informal: use", turkish: "kullanmak", example: "Formal: utilize, employ" },
    { english: "Informal: end", turkish: "son", example: "Formal: conclusion, termination" },
    { english: "Informal: start", turkish: "başlamak", example: "Formal: commence, initiate" }
  ],
  speakingPractice: [
    {
      question: "In formal writing, why is it important to avoid first-person pronouns, and when might they be acceptable?",
      answer: "In academic writing, avoiding first-person pronouns maintains objectivity and focuses attention on the research rather than the researcher. However, they may be acceptable when describing methodology or acknowledging limitations, as this demonstrates transparency and intellectual honesty."
    },
    {
      question: "How would you formally express disagreement with a published research finding?",
      answer: "One might formally express disagreement by stating: 'While Smith's conclusions appear logical, alternative interpretations of the data warrant consideration.' This approach acknowledges the original work respectfully while introducing counterarguments substantiated by evidence."
    },
    {
      question: "What distinguishes a formal analysis from an informal discussion of the same topic?",
      answer: "A formal analysis employs precise terminology, structured argumentation, and evidence-based reasoning, whereas informal discussion permits colloquial expressions and personal observations. The formal approach prioritizes logical progression and scholarly conventions over conversational ease."
    },
    {
      question: "In academic contexts, how should one introduce contradictory evidence to one's own argument?",
      answer: "Contradictory evidence should be introduced objectively using phrases such as 'However, alternative perspectives suggest' or 'Nevertheless, certain findings indicate.' This demonstrates intellectual rigor and acknowledges the complexity of scholarly discourse rather than presenting biased argumentation."
    },
    {
      question: "Why is hedging language important in academic writing, and how does it differ from uncertainty?",
      answer: "Hedging language, using terms like 'may,' 'might,' and 'suggest,' demonstrates scholarly caution and acknowledges the provisional nature of knowledge. Unlike uncertainty, which implies lack of confidence, hedging reflects epistemological humility and respect for ongoing scholarly inquiry."
    },
    {
      question: "How would you formally describe a significant increase in unemployment rates?",
      answer: "One might state: 'Unemployment rates have experienced substantial escalation, increasing by approximately 15 percent over the preceding fiscal quarter.' This formulation employs precise numerical data and appropriate formal vocabulary while maintaining objectivity."
    },
    {
      question: "What role do transition words play in formal academic writing?",
      answer: "Transition words establish logical relationships between ideas, guiding readers through complex arguments. Terms such as 'furthermore,' 'consequently,' and 'nevertheless' create coherence and signal the progression of scholarly discourse, thereby enhancing comprehension and demonstrating sophisticated analytical thinking."
    },
    {
      question: "In formal correspondence, how should one request information from a supervisor?",
      answer: "One should employ deferential language: 'I would appreciate clarification regarding the project timeline' rather than 'Can you tell me when this is due?' This formulation demonstrates professionalism and respect for hierarchical relationships while clearly communicating the request."
    },
    {
      question: "How do passive constructions contribute to formal academic style?",
      answer: "Passive constructions emphasize actions and results rather than actors, which aligns with academic writing's objective tone. For instance, 'The experiment was conducted' focuses on methodology rather than researchers, thereby maintaining scholarly distance and universal applicability."
    },
    {
      question: "What constitutes appropriate evidence in formal academic argumentation?",
      answer: "Appropriate evidence comprises peer-reviewed research, statistical data, expert testimony, and primary sources. Such evidence must be properly cited, contextually relevant, and critically evaluated. Anecdotal observations or unsubstantiated claims undermine scholarly credibility and should be avoided."
    },
    {
      question: "How should one formally acknowledge limitations in research or arguments?",
      answer: "Limitations should be acknowledged directly yet professionally: 'This analysis is constrained by limited sample size, which may affect generalizability.' Such transparency enhances credibility and demonstrates scholarly integrity rather than diminishing the work's value."
    },
    {
      question: "In formal writing, how does one balance accessibility with sophistication?",
      answer: "Effective formal writing employs precise terminology and complex structures while maintaining clarity through logical organization and judicious use of examples. Sophistication derives from analytical depth rather than unnecessarily obscure vocabulary, ensuring ideas remain comprehensible to informed audiences."
    },
    {
      question: "What distinguishes formal definitions from colloquial explanations?",
      answer: "Formal definitions provide precise, comprehensive explanations using established terminology: 'Photosynthesis constitutes the biochemical process whereby plants convert light energy into chemical energy.' Colloquial explanations sacrifice precision for accessibility: 'Photosynthesis is how plants make food from sunlight.'"
    },
    {
      question: "How should controversial topics be addressed in academic writing?",
      answer: "Controversial topics require balanced presentation of multiple perspectives, supported by scholarly evidence. One should employ neutral language, acknowledge complexity, and avoid inflammatory rhetoric. For example: 'This policy generates debate among scholars, with proponents citing economic benefits while critics emphasize social costs.'"
    },
    {
      question: "Why are nominalization and noun phrases prevalent in formal academic writing?",
      answer: "Nominalization transforms verbs and adjectives into nouns, creating density and abstraction characteristic of academic discourse. For instance, 'The implementation of new policies' is more formal than 'implementing new policies.' This style facilitates complex conceptual discussion and information packaging."
    },
    {
      question: "How does one formally introduce a quotation or paraphrase in academic writing?",
      answer: "Quotations should be integrated with signal phrases establishing context and attribution: 'According to Johnson, globalization has fundamentally altered economic structures.' This approach credits sources appropriately while seamlessly incorporating external perspectives into one's argument."
    },
    {
      question: "What constitutes plagiarism in academic contexts, and how can it be avoided?",
      answer: "Plagiarism encompasses presenting others' ideas, words, or data as one's own, whether intentional or inadvertent. It can be avoided through proper citation, paraphrasing with attribution, and distinguishing clearly between one's analysis and source material. Academic integrity requires scrupulous acknowledgment of intellectual debt."
    },
    {
      question: "In formal writing, how should one structure a comparative analysis?",
      answer: "Comparative analysis requires systematic organization, either point-by-point or subject-by-subject. One should employ comparative language: 'Whereas Theory A emphasizes individual agency, Theory B prioritizes structural constraints.' Conclusions should synthesize comparisons, identifying patterns, contrasts, and implications."
    },
    {
      question: "How does formal writing handle causality claims differently from informal discussion?",
      answer: "Formal writing approaches causality cautiously, acknowledging correlation-causation distinctions: 'The data suggest a correlation between variables, though establishing causation requires further investigation.' Informal discussion might assert: 'X causes Y,' without acknowledging methodological limitations or alternative explanations."
    },
    {
      question: "What role does concision play in formal academic writing?",
      answer: "While formal writing permits complexity, concision remains valued. Redundancy and verbosity obscure meaning and frustrate readers. Effective academic prose balances thoroughness with economy, eliminating superfluous words while retaining necessary nuance. Each sentence should contribute substantively to the argument."
    },
    {
      question: "How should one formally express probability or likelihood in academic contexts?",
      answer: "Probability should be expressed using modals and hedging devices: 'The results may indicate,' 'Evidence suggests,' or 'It appears likely that.' When quantifiable, specific probability terms enhance precision: 'The model predicts with 95 percent confidence.' Such language demonstrates appropriate epistemic caution."
    },
    {
      question: "What distinguishes scholarly criticism from personal attack in academic discourse?",
      answer: "Scholarly criticism addresses ideas, methodologies, and evidence rather than individuals. One might state: 'This methodology exhibits certain limitations,' rather than 'The author is incompetent.' Professional discourse maintains respectful tone while rigorously evaluating intellectual content, fostering productive scholarly exchange."
    },
    {
      question: "How does one establish credibility in formal academic writing?",
      answer: "Credibility derives from demonstrating expertise through comprehensive literature review, methodological rigor, logical argumentation, and appropriate citation. Additionally, acknowledging counterarguments and limitations signals intellectual honesty. Tone should convey confidence without arrogance, authority without dogmatism."
    },
    {
      question: "In formal writing, how should one discuss future research directions?",
      answer: "Future research should be discussed using conditional and tentative language: 'Subsequent investigations might explore,' or 'Further research could examine.' Specific suggestions should be justified: 'Given these findings, longitudinal studies would provide valuable insights into temporal dynamics.' This demonstrates scholarly thinking beyond immediate conclusions."
    },
    {
      question: "What is the appropriate use of personal experience in academic arguments?",
      answer: "Personal experience generally serves as supplementary illustration rather than primary evidence in academic writing. When used, it should be clearly identified: 'Preliminary observations suggest,' followed by substantiation through scholarly sources. Anecdotes cannot substitute for systematic empirical research."
    },
    {
      question: "How should one formally introduce a research question or thesis statement?",
      answer: "Research questions should be introduced by establishing context and significance: 'Despite extensive literature on X, the relationship between Y and Z remains inadequately understood. This study investigates...' Such framing demonstrates scholarly awareness and justifies the inquiry's contribution."
    },
    {
      question: "What distinguishes descriptive from analytical writing in academic contexts?",
      answer: "Descriptive writing summarizes information: 'The study examined three variables.' Analytical writing interprets and evaluates: 'The study's examination of three variables reveals significant interactions, suggesting that previous models oversimplified the phenomenon.' Academic writing requires moving beyond description to critical engagement."
    },
    {
      question: "How does one maintain objectivity when discussing politically contentious topics?",
      answer: "Objectivity requires acknowledging multiple perspectives, relying on empirical evidence, and avoiding emotionally charged language. One should present positions fairly: 'Advocates contend, while critics argue,' allowing evidence to support conclusions. Personal political preferences should not overtly influence scholarly analysis."
    },
    {
      question: "In formal writing, how should numerical data be presented for maximum impact?",
      answer: "Numerical data should be contextualized and interpreted: 'Participation increased by 40 percent, indicating substantial engagement improvement.' Raw numbers require explanation regarding significance, comparison points, and implications. Visual representations like tables and graphs enhance comprehension when appropriately referenced in text."
    },
    {
      question: "What role does definition play in establishing common ground in academic writing?",
      answer: "Defining key terms establishes shared understanding, particularly for contested or specialized concepts. Formal definitions should reference established usage: 'For this analysis, globalization is defined as the intensification of worldwide social relations.' Clear definitions prevent misunderstanding and ground subsequent argumentation."
    },
    {
      question: "How should one formally address gaps in existing research literature?",
      answer: "Research gaps should be identified constructively: 'While existing literature addresses X comprehensively, the relationship between Y and Z remains underexplored.' This approach respects previous scholarship while justifying new investigation, demonstrating that the current work addresses meaningful questions."
    },
    {
      question: "What considerations govern the use of jargon in academic writing?",
      answer: "Jargon facilitates precise communication within disciplinary communities but may exclude broader audiences. Necessary technical terms should be defined or contextually explained. Gratuitous jargon impedes comprehension without adding value. Effective academic writing balances disciplinary precision with accessibility."
    },
    {
      question: "How does one formally synthesize multiple sources in a literature review?",
      answer: "Synthesis requires identifying patterns, contradictions, and gaps across sources: 'While Smith emphasizes economic factors and Jones highlights cultural influences, neither adequately considers their interaction.' This demonstrates critical engagement rather than mere summarization, positioning one's work within scholarly conversation."
    },
    {
      question: "In formal correspondence, how should one decline a request professionally?",
      answer: "Declining requests requires diplomacy and clarity: 'I appreciate your invitation; however, prior commitments prevent my participation. I trust you will find suitable alternatives.' This formulation maintains professional relationships while communicating unavailability respectfully and definitively."
    },
    {
      question: "What distinguishes formal academic tone from formal business communication?",
      answer: "Academic writing prioritizes analytical depth and theoretical contribution, employing discipline-specific terminology and extensive citation. Business communication emphasizes clarity, actionability, and efficiency, often using direct language and bullet points. Both maintain professionalism but serve different rhetorical purposes."
    },
    {
      question: "How should one formally express agreement with previous research while adding nuance?",
      answer: "Qualified agreement acknowledges consensus while introducing refinement: 'While Brown's findings regarding X prove compelling, the present analysis suggests that contextual factors mediate this relationship.' This approach builds upon existing work while advancing scholarly understanding through subtle distinctions."
    },
    {
      question: "What role does methodological transparency play in formal academic writing?",
      answer: "Methodological transparency enables replication, evaluation, and scholarly discourse. Detailed description of procedures, instruments, and analytical approaches demonstrates rigor: 'Participants were recruited through stratified random sampling, ensuring demographic representativeness.' Such transparency enhances credibility and permits critical assessment."
    },
    {
      question: "How does one conclude a formal academic essay effectively?",
      answer: "Effective conclusions synthesize key findings, address implications, and suggest future directions without introducing new arguments: 'This analysis demonstrates that X influences Y through mechanism Z, suggesting that policy interventions should target Z. Further research might investigate longitudinal effects.' Conclusions should provide closure while opening scholarly conversation."
    },
    {
      question: "In formal writing, how should one present conflicting interpretations of the same data?",
      answer: "Conflicting interpretations should be presented objectively: 'The data permit multiple interpretations. Optimistic analyses emphasize positive trends, while skeptical perspectives highlight methodological limitations.' One's position should then be justified through reasoned argumentation, demonstrating awareness of interpretive complexity."
    },
    {
      question: "What ethical considerations govern formal academic writing and research dissemination?",
      answer: "Ethical considerations include accurate reporting, appropriate attribution, protecting participant confidentiality, acknowledging conflicts of interest, and avoiding selective reporting. Academic integrity requires honesty, transparency, and accountability. Violations undermine scholarly trust and institutional credibility, warranting serious consequences."
    }
  ]
};

// Module 208: Hedging and Softening Statements
const MODULE_208_DATA = {
  title: "Module 208 - Hedging and Softening Statements",
  description: "Master the art of expressing claims cautiously and diplomatically using hedging language",
  intro: `📘 Lesson Objectives
✅ Understand the purpose and importance of hedging in academic writing
✅ Use modal verbs to express different degrees of certainty
✅ Apply hedging adverbs and adjectives effectively
✅ Employ tentative language in making claims and predictions
✅ Balance confidence with appropriate scholarly caution

🔍 Grammar Deep Dive

**What is Hedging?**
Hedging is the use of cautious language to express claims with appropriate uncertainty, acknowledging that knowledge is provisional and subject to revision. It demonstrates academic integrity and intellectual humility.

**Why Use Hedging?**
✅ Shows awareness of research limitations
✅ Avoids overstating claims
✅ Demonstrates scholarly caution
✅ Protects against definitive statements that may be disproven
✅ Softens strong claims to be more diplomatic

**Hedging Devices:**

1️⃣ **Modal Verbs** (strongest to weakest certainty)
   📌 will, would, can, could, may, might, should

2️⃣ **Hedging Verbs**
   📌 appear, seem, suggest, indicate, tend to, assume, imply

3️⃣ **Probability Adverbs**
   📌 certainly, probably, possibly, perhaps, apparently

4️⃣ **Limiting Phrases**
   📌 to a certain extent, in some cases, to some degree

5️⃣ **Impersonal Constructions**
   📌 It is possible that..., It appears that..., There seems to be...

**Examples:**
❌ "This causes unemployment." (too direct)
✅ "This may contribute to unemployment." (hedged)
✅ "Evidence suggests this could contribute to unemployment." (more hedged)`,
  table: [
    { english: "Direct: This causes...", turkish: "Bu neden olur", example: "Hedged: This may cause / tends to cause / could cause" },
    { english: "Direct: The results prove...", turkish: "Sonuçlar kanıtlıyor", example: "Hedged: The results suggest / indicate / appear to show" },
    { english: "Direct: All students need...", turkish: "Tüm öğrenciler ihtiyaç duyar", example: "Hedged: Most students may need / Students tend to need" },
    { english: "Direct: This is the best method", turkish: "Bu en iyi yöntem", example: "Hedged: This appears to be an effective method / This might be among the most effective methods" },
    { english: "Direct: It's impossible", turkish: "İmkansız", example: "Hedged: It seems unlikely / It appears improbable" },
    { english: "Direct: Everyone knows", turkish: "Herkes biliyor", example: "Hedged: It is generally accepted that / There is broad consensus" },
    { english: "Direct: This always happens", turkish: "Bu her zaman olur", example: "Hedged: This frequently occurs / This tends to happen" },
    { english: "Direct: The data shows", turkish: "Veri gösteriyor", example: "Hedged: The data suggests / appears to indicate" },
    { english: "Direct: It is certain", turkish: "Kesin", example: "Hedged: It is highly probable / It seems likely" },
    { english: "Direct: This never works", turkish: "Bu asla işe yaramaz", example: "Hedged: This rarely proves effective / This seldom succeeds" },
    { english: "Direct: The only solution", turkish: "Tek çözüm", example: "Hedged: A potential solution / One possible approach" },
    { english: "Direct: Obviously", turkish: "Açıkça", example: "Hedged: Evidently / Apparently / It would seem" },
    { english: "Direct: Clearly demonstrates", turkish: "Açıkça gösteriyor", example: "Hedged: Appears to demonstrate / Tends to suggest" },
    { english: "Direct: Will definitely", turkish: "Kesinlikle olacak", example: "Hedged: May likely / Could potentially / Might probably" },
    { english: "Direct: Must be", turkish: "Olmak zorunda", example: "Hedged: Seems to be / Appears to be / Could be" },
    { english: "Direct: Completely wrong", turkish: "Tamamen yanlış", example: "Hedged: Somewhat problematic / Questionable / Perhaps inaccurate" },
    { english: "Direct: No doubt", turkish: "Şüphesiz", example: "Hedged: Quite possibly / Very probably / It seems reasonable to assume" },
    { english: "Direct: It is obvious", turkish: "Belli", example: "Hedged: It seems apparent / It appears evident" },
    { english: "Direct: Proves conclusively", turkish: "Kesin kanıtlıyor", example: "Hedged: Provides support for / Offers evidence suggesting" },
    { english: "Direct: Cannot be", turkish: "Olamaz", example: "Hedged: Seems unlikely to be / Appears improbable" }
  ],
  speakingPractice: [
    {
      question: "Why is hedging considered essential in academic discourse rather than a sign of weakness?",
      answer: "Hedging is essential because it reflects intellectual honesty and acknowledges the provisional nature of knowledge. Rather than indicating weakness, it demonstrates scholarly sophistication by recognizing research limitations and the possibility that future evidence may refine or challenge current understanding."
    },
    {
      question: "How might you hedge a statement claiming that social media affects mental health?",
      answer: "One might state: 'Evidence suggests that excessive social media use may be associated with certain mental health challenges, though the relationship appears complex and could be influenced by multiple mediating factors.' This acknowledges research findings while recognizing causal complexity."
    },
    {
      question: "In what situations might scholars use stronger hedging versus weaker hedging?",
      answer: "Stronger hedging is appropriate when evidence is preliminary, sample sizes are limited, or alternative explanations exist. Weaker hedging suits well-established findings with robust evidence. For instance, 'might possibly indicate' is stronger hedging than 'tends to suggest,' which reflects greater, though still cautious, confidence."
    },
    {
      question: "How does hedging contribute to productive academic debate?",
      answer: "Hedging facilitates productive debate by softening disagreements and acknowledging complexity. Stating 'This interpretation may overlook certain factors' is less confrontational than 'This interpretation is wrong,' thereby creating space for dialogue while still advancing critique, which helps maintain collegial scholarly discourse."
    },
    {
      question: "What is the risk of insufficient hedging in academic writing?",
      answer: "Insufficient hedging risks overstating claims beyond what evidence supports, potentially leading to incorrect conclusions and damaged credibility. Definitive statements like 'X causes Y' may be disproven by subsequent research, whereas 'X appears to contribute to Y' remains defensible even as understanding evolves."
    },
    {
      question: "How might you diplomatically challenge a colleague's research findings in a professional setting?",
      answer: "One might state: 'While Dr. Ahmed's findings are interesting, alternative methodological approaches might yield somewhat different results. Perhaps further investigation could help clarify these apparent contradictions.' This respects the colleague while introducing thoughtful critique through careful hedging."
    },
    {
      question: "What is the difference between hedging and being vague or unclear?",
      answer: "Hedging maintains precision while acknowledging uncertainty: 'The data suggest a 15 percent increase, though confidence intervals indicate some variability.' Vagueness lacks specificity: 'There seem to be some changes maybe.' Effective hedging balances caution with clarity, whereas vagueness obscures meaning entirely."
    },
    {
      question: "How should one hedge predictions about future trends or outcomes?",
      answer: "Future predictions require substantial hedging: 'Current trends suggest that remote work may continue expanding, though economic conditions, technological developments, and organizational cultures could influence this trajectory in unpredictable ways.' This acknowledges forecasting limitations while offering reasoned projection."
    },
    {
      question: "In what ways can hedging make criticism more constructive?",
      answer: "Hedging softens criticism, making it more palatable: 'This methodology might benefit from considering additional variables' sounds more constructive than 'This methodology is flawed.' The hedged version invites improvement rather than provoking defensiveness, thereby facilitating scholarly growth and collaborative problem-solving."
    },
    {
      question: "How might cultural differences affect perceptions of hedging in international academic contexts?",
      answer: "Some cultures value directness and may perceive extensive hedging as evasive, while others expect diplomatic indirectness and view unhedged claims as arrogant. International scholars should calibrate hedging to audience expectations, though academic English generally favors moderate hedging as demonstrating appropriate scholarly caution."
    },
    {
      question: "What role does hedging play in presenting controversial research findings?",
      answer: "When presenting controversial findings, strategic hedging protects researchers while allowing ideas to be heard: 'Preliminary data tentatively suggest' introduces challenging conclusions cautiously. This approach invites serious consideration while acknowledging that extraordinary claims require extraordinary evidence, balancing innovation with scholarly prudence."
    },
    {
      question: "How can one avoid overusing hedging to the point of undermining confidence?",
      answer: "Excessive hedging can indeed undermine credibility: 'It might possibly perhaps seem that maybe this could potentially suggest' sounds uncertain to the point of meaninglessness. Effective hedging uses one or two devices appropriately: 'Evidence suggests this could contribute' maintains authority while acknowledging limitations."
    },
    {
      question: "In formal presentations, how should hedging differ from written academic papers?",
      answer: "Oral presentations may use slightly less hedging since tone, emphasis, and nonverbal cues convey nuance. One might say 'This likely indicates' rather than writing 'The evidence appears to suggest.' However, significant claims still require hedging even orally, particularly when anticipating challenging questions."
    },
    {
      question: "How does hedging function in grant proposals or funding applications?",
      answer: "Grant proposals require delicate balance: sufficient confidence to justify funding while acknowledging research uncertainty. One might state: 'This investigation will likely yield significant insights into' rather than 'might possibly provide some information about.' The former demonstrates appropriate confidence while maintaining scholarly caution."
    },
    {
      question: "What is the relationship between hedging and acknowledging research limitations?",
      answer: "Both demonstrate intellectual integrity but serve different functions. Hedging moderates claim strength throughout: 'appears to indicate.' Limitations sections explicitly address methodological constraints: 'This study is limited by small sample size.' Together, they create comprehensive scholarly honesty and contextualize findings appropriately."
    },
    {
      question: "How might one hedge when synthesizing contradictory research findings?",
      answer: "Contradictory findings require careful hedging: 'While some studies suggest X, others indicate Y, suggesting the relationship may be more complex than initially assumed and could depend on contextual factors requiring further investigation.' This acknowledges disagreement while proposing reasonable interpretation."
    },
    {
      question: "In policy recommendations based on research, how should hedging be applied?",
      answer: "Policy recommendations require pragmatic hedging that acknowledges uncertainty without paralyzing action: 'Evidence suggests this approach may prove effective, though implementation should include monitoring and willingness to adjust based on outcomes.' This balances scholarly caution with actionable guidance."
    },
    {
      question: "How does hedging interact with citation and attribution in academic writing?",
      answer: "Attribution inherently hedges by attributing claims to sources: 'According to Smith, X may cause Y.' This creates distance from the claim while still presenting it. When synthesizing sources, additional hedging may be appropriate: 'Several scholars suggest,' emphasizing consensus while maintaining appropriate scholarly reservation."
    },
    {
      question: "What are appropriate hedging strategies when discussing theoretical frameworks?",
      answer: "Theoretical discussions benefit from hedging that acknowledges competing frameworks: 'Poststructuralist perspectives tend to emphasize' rather than 'Poststructuralism proves.' This recognizes theoretical diversity and the interpretive nature of frameworks while still engaging substantively with ideas."
    },
    {
      question: "How should novice researchers learn to hedge appropriately?",
      answer: "Novice researchers should analyze published work in their field, noting hedging patterns. Mentors can provide feedback on hedging appropriateness. Generally, err toward more hedging initially; confidence develops with expertise. Reading reviewer comments reveals when claims are over- or under-hedged, facilitating calibration."
    },
    {
      question: "What is the role of epistemic modality in hedging across different disciplines?",
      answer: "Hard sciences may use less hedging when discussing established laws: 'Water boils at 100°C' versus 'Water tends to boil.' Social sciences and humanities require more hedging due to interpretive complexity: 'Cultural practices appear to influence' acknowledges human behavior's variability and contextual dependence."
    },
    {
      question: "How might one hedge when presenting experimental results with statistical significance?",
      answer: "Even statistically significant results warrant hedging: 'Results demonstrate a statistically significant relationship, suggesting that X may influence Y, though additional research would help establish generalizability and practical significance.' Statistics provide confidence but don't eliminate uncertainty about real-world applicability."
    },
    {
      question: "In interdisciplinary research, how does hedging help bridge different scholarly traditions?",
      answer: "Interdisciplinary work benefits from hedging that respects different epistemological approaches: 'From a sociological perspective, this appears significant, while economic analyses might emphasize different factors.' Such hedging acknowledges disciplinary plurality without privileging one framework over others."
    },
    {
      question: "How should one hedge when making comparisons between different populations or contexts?",
      answer: "Comparative claims require careful hedging: 'While Population A tends to exhibit X, Population B appears to demonstrate Y, though these patterns may reflect cultural, economic, or methodological factors requiring further investigation.' This avoids essentializing differences while noting observed patterns."
    },
    {
      question: "What is appropriate hedging when discussing practical applications of theoretical research?",
      answer: "Translating theory to practice requires substantial hedging: 'This theoretical framework might inform practice by suggesting potential strategies, though implementation would likely require adaptation to specific contexts and ongoing evaluation.' This acknowledges the theory-practice gap while offering useful guidance."
    },
    {
      question: "How does hedging function in literature reviews?",
      answer: "Literature reviews use hedging to synthesize diverse sources: 'The literature generally suggests,' 'Most scholars appear to agree,' or 'Some researchers have found.' This acknowledges consensus or disagreement while avoiding overgeneralization about what 'all' research shows, which is rarely accurate."
    },
    {
      question: "When reviewing manuscripts, how should reviewers use hedging in their critiques?",
      answer: "Reviewers should hedge suggestions: 'The manuscript might be strengthened by' rather than 'The author must.' This maintains professionalism while providing clear guidance. However, serious methodological flaws may warrant less hedged critique: 'The sample size appears insufficient for these claims.'"
    },
    {
      question: "How might hedging differ between journal articles and popular science writing?",
      answer: "Academic articles require consistent hedging: 'may contribute to.' Popular science might state: 'contributes to,' sacrificing some precision for accessibility. However, responsible popular science maintains core hedging for major claims: 'Scientists believe this could lead to,' avoiding misleading definitiveness."
    },
    {
      question: "What role does hedging play in forming research hypotheses?",
      answer: "Hypotheses typically avoid excessive hedging: 'We hypothesize that X will increase Y' is appropriately direct. However, discussing hypothesis justification benefits from hedging: 'Previous research suggests this relationship may exist, leading us to hypothesize.' This distinguishes prediction from tentative theoretical reasoning."
    },
    {
      question: "How should one hedge when discussing methodological choices in research design?",
      answer: "Methodological discussions balance confidence and caution: 'This approach was selected as it appears well-suited to the research question, though alternative methods might offer complementary insights.' This justifies choices while acknowledging that no method is perfect."
    },
    {
      question: "In conference Q&A sessions, how should researchers hedge responses to challenging questions?",
      answer: "Hedging in Q&A demonstrates thoughtfulness rather than defensiveness: 'That's an interesting point I hadn't fully considered. The data seem to suggest X, though your observation might indicate a need for further analysis.' This validates the question while maintaining scholarly integrity."
    },
    {
      question: "What is appropriate hedging when discussing ethical implications of research?",
      answer: "Ethical discussions require thoughtful hedging: 'This technology may raise concerns regarding privacy, though potential benefits could include improved accessibility. Stakeholder input would likely be essential in navigating these apparent trade-offs.' This acknowledges ethical complexity without prescribing definitive answers."
    },
    {
      question: "How does hedging interact with the use of definitive language in definitions?",
      answer: "Definitions typically minimize hedging for clarity: 'Democracy is a system of government' rather than 'appears to be.' However, contested concepts benefit from hedging: 'Democracy is often understood as' or 'typically defined as,' acknowledging definitional debates."
    },
    {
      question: "When might it be appropriate to use relatively unhedged language in academic writing?",
      answer: "Unhedged language suits well-established facts: 'The Earth orbits the Sun,' descriptions of one's own methodology: 'Participants completed a survey,' or clear statements of purpose: 'This study investigates.' Over-hedging these elements: 'The Earth seems to possibly orbit' sounds absurd."
    },
    {
      question: "How should supervisors provide feedback to students about hedging in their writing?",
      answer: "Supervisors might note: 'Consider softening this claim with appropriate hedging' or conversely 'You can state this more confidently given your evidence.' Specific suggestions help: 'Perhaps replace will with may or could here.' This develops students' judgment about claim strength."
    },
    {
      question: "What is the relationship between hedging and argumentation strength in thesis statements?",
      answer: "Thesis statements require moderate hedging that maintains argumentative force: 'This paper argues that X significantly influences Y' rather than 'may possibly influence.' The argument should be clear while hedging within the paper acknowledges limitations. Balance assertiveness with scholarly caution."
    },
    {
      question: "How might one use hedging when proposing new theoretical concepts or frameworks?",
      answer: "Proposing new concepts requires substantial hedging: 'I tentatively propose the concept of X to help explain Y, though this framework requires further development and empirical testing.' This introduces innovation while acknowledging that new ideas must be refined through scholarly dialogue."
    },
    {
      question: "In your experience, how do you determine the appropriate level of hedging for different claims?",
      answer: "I assess evidence strength, disciplinary norms, claim novelty, and potential consequences. Strong, replicated findings warrant less hedging. Novel or controversial claims require more. When uncertain, I err toward more hedging, seeking feedback from colleagues about whether claims seem over-confident or excessively tentative."
    },
    {
      question: "How does mastering hedging contribute to becoming a more mature scholar?",
      answer: "Mastering hedging reflects developing judgment about knowledge claims, moving from binary thinking toward understanding nuance and complexity. It demonstrates intellectual humility, respect for the provisional nature of knowledge, and ability to communicate sophisticated ideas with appropriate precision, all hallmarks of scholarly maturity."
    },
    {
      question: "What advice would you give to someone who finds hedging makes their writing feel weak or indecisive?",
      answer: "Hedging actually strengthens academic writing by making claims defensible and demonstrating sophistication. Rather than weakening arguments, appropriate hedging protects against overstatement while maintaining credibility. View hedging not as retreat but as precision—saying exactly what evidence supports, neither more nor less."
    }
  ]
};

// Module 209: Euphemisms and Taboo Language
const MODULE_209_DATA = {
  title: "Module 209 - Euphemisms and Taboo Language",
  description: "Understanding polite alternatives for sensitive topics and mastering diplomatic language",
  intro: `📘 Lesson Objectives
✅ Understand euphemisms and their social functions
✅ Use polite alternatives for sensitive topics
✅ Navigate taboo subjects with tact and respect
✅ Distinguish between formal and informal euphemisms
✅ Apply diplomatic language in professional contexts

🔍 Grammar Deep Dive

**What are Euphemisms?**
Euphemisms are polite or indirect expressions used instead of harsh, blunt, or offensive language. They serve to soften uncomfortable topics or show respect in sensitive situations.

**Common Categories:**

1️⃣ **Death & Dying**
   📌 Direct: died, dead
   📌 Euphemistic: passed away, departed, lost someone, is no longer with us

2️⃣ **Unemployment & Termination**
   📌 Direct: fired, unemployed
   📌 Euphemistic: let go, laid off, between jobs, made redundant

3️⃣ **Age & Aging**
   📌 Direct: old, elderly
   📌 Euphemistic: senior citizen, mature, golden years, advanced age

4️⃣ **Body & Bodily Functions**
   📌 Direct: bathroom, toilet
   📌 Euphemistic: restroom, facilities, powder room, washroom

5️⃣ **Money & Poverty**
   📌 Direct: poor, broke
   📌 Euphemistic: financially challenged, economically disadvantaged, underprivileged

6️⃣ **Physical Appearance**
   📌 Direct: fat, overweight
   📌 Euphemistic: plus-sized, full-figured, carrying extra weight

**Why Use Euphemisms?**
✅ Show respect and sensitivity
✅ Avoid causing offense or discomfort
✅ Maintain professionalism in difficult conversations
✅ Navigate cultural expectations around taboo topics`,
  table: [
    { english: "Passed away / departed", turkish: "Vefat etti", example: "My grandmother passed away last year. (Instead of: died)" },
    { english: "Let go / laid off", turkish: "İşten çıkarıldı", example: "He was let go due to restructuring. (Instead of: fired)" },
    { english: "Between jobs", turkish: "İşsiz", example: "I'm currently between jobs. (Instead of: unemployed)" },
    { english: "Senior citizen", turkish: "Yaşlı", example: "Many senior citizens enjoy this program. (Instead of: old people)" },
    { english: "Restroom / facilities", turkish: "Tuvalet", example: "Excuse me, where are the facilities? (Instead of: toilet)" },
    { english: "Economically disadvantaged", turkish: "Yoksul", example: "Programs for economically disadvantaged families. (Instead of: poor)" },
    { english: "Pre-owned / previously loved", turkish: "İkinci el", example: "I bought a pre-owned vehicle. (Instead of: used)" },
    { english: "Correctional facility", turkish: "Hapishane", example: "He's in a correctional facility. (Instead of: prison)" },
    { english: "Expecting / with child", turkish: "Hamile", example: "She's expecting in June. (Instead of: pregnant)" },
    { english: "Adult beverages", turkish: "Alkollü içecekler", example: "We serve adult beverages. (Instead of: alcohol)" },
    { english: "Indisposed / under the weather", turkish: "Hasta", example: "I'm feeling under the weather. (Instead of: sick)" },
    { english: "Passed gas / broke wind", turkish: "Gaz çıkarmak", example: "Excuse me, I passed gas. (Instead of: farted)" },
    { english: "Powder room", turkish: "Tuvalet", example: "May I use your powder room? (Instead of: bathroom)" },
    { english: "Perspiring", turkish: "Terlemek", example: "I'm perspiring from the heat. (Instead of: sweating)" },
    { english: "Misspoke / misremembered", turkish: "Yanlış söylemek", example: "I misspoke earlier. (Instead of: lied)" },
    { english: "Comfort station", turkish: "Umumi tuvalet", example: "There's a comfort station ahead. (Instead of: public toilet)" },
    { english: "Sanitation worker", turkish: "Çöpçü", example: "He works as a sanitation worker. (Instead of: garbage man)" },
    { english: "Massage parlor", turkish: "Genelev (kapalı anlamı)", example: "That's not a legitimate massage parlor. (Euphemism for brothel)" },
    { english: "Collateral damage", turkish: "Sivil kayıplar", example: "The military minimized collateral damage. (Instead of: civilian deaths)" },
    { english: "Downsize / right-size", turkish: "İşçi çıkarmak", example: "The company is downsizing. (Instead of: firing workers)" }
  ],
  speakingPractice: [
    { question: "How would you inform someone that their relative passed away?", answer: "I'm very sorry to tell you this, but your uncle passed away peacefully last night. He was surrounded by family, and he didn't suffer." },
    { question: "How would you diplomatically say someone was fired from their job?", answer: "Unfortunately, David was let go last month due to company restructuring. He's currently exploring new opportunities." },
    { question: "How can you politely ask someone their age?", answer: "If you don't mind me asking, are you in your late twenties? Or I might say: May I ask what year you were born?" },
    { question: "How would you describe someone who is overweight without being offensive?", answer: "He's a bit on the heavier side, or I might say: He's carrying some extra weight. In formal contexts: He has a larger build." },
    { question: "How do you politely ask where the bathroom is in a formal setting?", answer: "Excuse me, could you direct me to the restroom? Or: Where might I find the facilities?" },
    { question: "How would you describe someone who is financially struggling?", answer: "They're going through some financial difficulties right now, or: They're economically disadvantaged at the moment." },
    { question: "How can you politely mention that someone is pregnant?", answer: "Congratulations! I heard you're expecting. Or: When are you due? These are more polite than directly saying 'pregnant' in some contexts." },
    { question: "How would you describe a used car you're selling?", answer: "It's a pre-owned vehicle in excellent condition, or: It's a previously loved car with one careful owner." },
    { question: "How do you diplomatically say someone is lying?", answer: "I think you may have misspoken, or: Perhaps you misremembered the details. This is gentler than accusing someone directly." },
    { question: "How would you refer to someone in prison?", answer: "He's currently in a correctional facility, or: He's serving time at a detention center, rather than bluntly saying 'prison' or 'jail.'" },
    { question: "If someone has body odor, how would you hint at it politely?", answer: "It's quite warm today—perhaps we could take a moment to freshen up? Or in private: I wanted to mention, just so you know, you might want to check..." },
    { question: "How do you tell someone they're being too loud?", answer: "Would you mind keeping your voice down a bit? Or: Perhaps we could continue this conversation at a lower volume." },
    { question: "How would you describe someone who drinks too much alcohol?", answer: "He tends to overindulge in adult beverages, or: He has a complicated relationship with alcohol, rather than calling them an 'alcoholic' directly." },
    { question: "How can you politely decline food you don't want?", answer: "Thank you so much, but I'm quite full. Or: That looks delicious, but I'm trying to watch what I eat right now." },
    { question: "How would you say someone is unintelligent without being rude?", answer: "He's not the sharpest tool in the shed, or: He's not particularly academically inclined. Or: He has different strengths." },
    { question: "How do you mention someone's mental health issues sensitively?", answer: "She's dealing with some mental health challenges, or: He's going through a difficult period emotionally, rather than using stigmatizing labels." },
    { question: "How would you tell someone their work performance is poor?", answer: "Your recent performance hasn't quite met expectations. We need to see some improvement in these areas. This is more constructive than 'You're doing badly.'" },
    { question: "How can you politely say someone smells bad?", answer: "I think you might want to freshen up before the meeting, or: Just so you're aware, there's a bit of an odor issue we should address." },
    { question: "How would you describe someone who was executed?", answer: "He was put to death by the state, or: Capital punishment was carried out, rather than the more graphic 'executed' or 'killed.'" },
    { question: "How do you politely say you need to use the bathroom?", answer: "Excuse me, I need to powder my nose, or: May I be excused for a moment? Or simply: Where's the restroom?" },
    { question: "How would you describe civilian deaths in war?", answer: "Unfortunately, there was collateral damage, or: There were unintended casualties, though many find even these euphemisms problematic." },
    { question: "How can you say someone is cheap without offending them?", answer: "He's very budget-conscious, or: She's careful with money, or: He's financially prudent, rather than calling them 'cheap' or 'stingy.'" },
    { question: "How would you tell someone they have bad breath?", answer: "In private, you might say: I wanted to mention—do you have any mints? Or: Just so you know, you might want to check your breath before the meeting." },
    { question: "How do you diplomatically say a company is firing many workers?", answer: "The company is undergoing significant downsizing, or: They're right-sizing their workforce, though many see these as corporate euphemisms for mass layoffs." },
    { question: "How would you describe someone who cleans toilets for a living?", answer: "He works in sanitation services, or: She's a facilities maintenance specialist, showing respect for all professions." },
    { question: "How can you politely suggest someone is old-fashioned?", answer: "He has more traditional values, or: She's from a different generation, or: He has a classic perspective, rather than calling them 'outdated.'" },
    { question: "How would you say someone died by suicide?", answer: "She took her own life, or: He died by suicide, avoiding older, more stigmatizing terms like 'committed suicide' which implies criminality." },
    { question: "How do you mention someone's plastic surgery politely?", answer: "She's had some work done, or: He's had a cosmetic procedure, being tactful about personal choices." },
    { question: "How would you describe a brothel euphemistically?", answer: "It's an adult entertainment venue, or: It's a massage parlor (though everyone understands the implication), or: It's an establishment of ill repute." },
    { question: "How can you say someone is balding without being rude?", answer: "His hairline is receding, or: He's experiencing some hair loss, or even humorously: He's follicularly challenged." },
    { question: "How would you tell someone they're being fired in a meeting?", answer: "We've decided to go in a different direction, or: We're going to have to let you go, or: Your position is being eliminated, softening the blow somewhat." },
    { question: "How do you politely say someone has put on weight?", answer: "You look healthy! Or: You look like you've been enjoying good food, or simply avoid commenting on someone's weight unless absolutely necessary." },
    { question: "How would you describe torture in official documents?", answer: "Unfortunately, governments have used terms like 'enhanced interrogation techniques' to euphemize torture, which many consider deeply problematic." },
    { question: "How can you say someone is having an affair?", answer: "They're seeing someone else, or: He's been unfaithful, or: There's been infidelity, rather than crude descriptions." },
    { question: "How would you mention someone's poverty politely?", answer: "They come from humble beginnings, or: They're from a lower-income background, or: They're economically disadvantaged." },
    { question: "How do you say someone is stupid in a professional context?", answer: "That approach lacks sophistication, or: That demonstrates limited understanding, focusing on the action rather than the person." },
    { question: "How would you describe a cemetery or graveyard?", answer: "Memorial park, or: Final resting place, or: Cemetery (which itself is somewhat euphemistic compared to 'graveyard')." },
    { question: "How can you tell someone they have food in their teeth?", answer: "Quietly and discreetly: You might want to check your teeth, or: You have a little something right there, gesturing politely." },
    { question: "How would you describe someone who is homeless?", answer: "They're experiencing homelessness, or: They're without permanent housing, or: They're unhoused, using people-first language." },
    { question: "How do you mention someone's mental disability sensitively?", answer: "They have intellectual disabilities, or: They have special needs, or: They're neurodivergent, depending on the specific situation, always using respectful, person-first language." }
  ]
};

// Module 210: Advanced Idioms
const MODULE_210_DATA = {
  title: "Module 210 - Advanced Idioms",
  description: "Mastering sophisticated idiomatic expressions for fluent, native-like English",
  intro: `📘 Lesson Objectives
✅ Master advanced idiomatic expressions
✅ Understand contextual usage of sophisticated idioms
✅ Distinguish between formal and informal idioms
✅ Apply idioms appropriately in conversation and writing
✅ Recognize cultural references in idiomatic language

🔍 Grammar Deep Dive

**What are Advanced Idioms?**
Advanced idioms are sophisticated figurative expressions that go beyond basic phrases. They add color, nuance, and cultural depth to language, signaling native-like fluency.

**Categories of Advanced Idioms:**

1️⃣ **Business & Professional**
   📌 "Move the needle" - Make a significant impact
   📌 "Touch base" - Make contact, check in
   📌 "Run it up the flagpole" - Present an idea for feedback

2️⃣ **Decision Making**
   📌 "On the fence" - Undecided
   📌 "Cross that bridge when we come to it" - Deal with problems as they arise
   📌 "Bite the bullet" - Face something difficult courageously

3️⃣ **Success & Failure**
   📌 "Hit it out of the park" - Achieve great success
   📌 "Miss the boat" - Miss an opportunity
   📌 "Back to the drawing board" - Start over

4️⃣ **Communication**
   📌 "Read between the lines" - Understand hidden meaning
   📌 "Beat around the bush" - Avoid saying something directly
   📌 "Get straight to the point" - Speak directly

**Important Notes:**
⚠️ Some idioms are culturally specific
⚠️ Context determines appropriateness
⚠️ Overusing idioms can seem forced`,
  table: [
    { english: "Move the needle", turkish: "Önemli etki yaratmak", example: "This initiative will really move the needle on customer satisfaction." },
    { english: "Bite the bullet", turkish: "Zor kararı vermek", example: "We need to bite the bullet and cut the budget." },
    { english: "Throw in the towel", turkish: "Pes etmek", example: "After years of trying, he finally threw in the towel." },
    { english: "Hit it out of the park", turkish: "Büyük başarı kazanmak", example: "Your presentation really hit it out of the park!" },
    { english: "Miss the boat", turkish: "Fırsatı kaçırmak", example: "If we don't invest now, we'll miss the boat." },
    { english: "Bark up the wrong tree", turkish: "Yanlış kapıya gitmek", example: "If you think I took your keys, you're barking up the wrong tree." },
    { english: "Cut to the chase", turkish: "Konuya gelmek", example: "Let's cut to the chase—what's your final offer?" },
    { english: "Read between the lines", turkish: "Satır aralarını okumak", example: "If you read between the lines, she's actually not happy about it." },
    { english: "On thin ice", turkish: "Tehlikeli durumda", example: "After that mistake, you're on thin ice with the boss." },
    { english: "Jump the gun", turkish: "Aceleci davranmak", example: "Don't jump the gun—wait for all the facts first." },
    { english: "Burn bridges", turkish: "Köprüleri atmak", example: "Don't burn bridges; you might need those contacts later." },
    { english: "Pull strings", turkish: "Torpil kullanmak", example: "He pulled some strings to get her the interview." },
    { english: "Rock the boat", turkish: "Karışıklık çıkarmak", example: "I don't want to rock the boat by questioning the decision." },
    { english: "Spill the beans", turkish: "Sırrı açığa vurmak", example: "Don't spill the beans about the surprise party!" },
    { english: "Let the cat out of the bag", turkish: "Sırrı ifşa etmek", example: "Sorry, I let the cat out of the bag about your promotion." },
    { english: "Back to the drawing board", turkish: "Başa dönmek", example: "The prototype failed, so it's back to the drawing board." },
    { english: "Get the ball rolling", turkish: "İşe başlamak", example: "Let's get the ball rolling on this project." },
    { english: "In the same boat", turkish: "Aynı durumda olmak", example: "We're all in the same boat—nobody got a raise." },
    { english: "The elephant in the room", turkish: "Görmezden gelinen sorun", example: "Let's address the elephant in the room: our declining sales." },
    { english: "Take with a grain of salt", turkish: "Şüpheyle karşılamak", example: "Take his advice with a grain of salt; he's not an expert." }
  ],
  speakingPractice: [
    { question: "Have you ever had to bite the bullet and make a difficult decision?", answer: "Yes, I had to bite the bullet last year and leave a comfortable job to pursue my passion. It was scary, but I knew I had to do it." },
    { question: "Can you describe a time when someone really hit it out of the park?", answer: "My colleague absolutely hit it out of the park with her presentation to the board. Everyone was impressed, and she got promoted shortly after." },
    { question: "Have you ever missed the boat on an opportunity?", answer: "Unfortunately, yes. I missed the boat on investing in cryptocurrency years ago. If I'd bought Bitcoin back then, I'd be wealthy now!" },
    { question: "When was the last time you had to read between the lines?", answer: "Just yesterday, actually. My manager said the project was 'interesting,' but reading between the lines, I could tell she wasn't thrilled with my approach." },
    { question: "Have you ever felt like you were on thin ice at work?", answer: "Yes, after I accidentally deleted an important file. I was definitely on thin ice for a few weeks until I proved myself again." },
    { question: "Can you think of a situation where someone jumped the gun?", answer: "My friend jumped the gun and quit his job before securing a new one. Now he's been unemployed for three months and really regretting it." },
    { question: "Do you know anyone who burned bridges in their career?", answer: "Yes, a former colleague burned bridges by talking badly about our company after leaving. Now nobody in the industry wants to work with him." },
    { question: "Have you ever had to pull strings to help someone?", answer: "I pulled some strings to get my cousin an interview at my company. I put in a good word with HR, and she eventually got hired." },
    { question: "Are you someone who likes to rock the boat or keep things stable?", answer: "I used to avoid rocking the boat, but I've learned that sometimes you need to challenge the status quo to drive real change." },
    { question: "Has anyone ever spilled the beans about a surprise you planned?", answer: "Yes! My sister accidentally spilled the beans about my parents' anniversary party. I was furious, but the surprise was already ruined." },
    { question: "When have you had to go back to the drawing board?", answer: "When my business proposal was rejected, I had to go back to the drawing board and completely rethink my strategy." },
    { question: "How do you get the ball rolling when starting a new project?", answer: "I usually get the ball rolling by setting up a kickoff meeting where everyone can align on goals and divide responsibilities." },
    { question: "Can you describe a time when everyone was in the same boat?", answer: "During the pandemic, we were all in the same boat—working from home, dealing with uncertainty, trying to adapt to the new normal." },
    { question: "What's the elephant in the room that most people avoid discussing?", answer: "I think climate change is the elephant in the room. Everyone knows it's urgent, but we keep avoiding the hard conversations about lifestyle changes." },
    { question: "When should you take information with a grain of salt?", answer: "You should take social media posts with a grain of salt because people often exaggerate or only show the best parts of their lives." },
    { question: "Have you ever thrown in the towel on something you were passionate about?", answer: "I almost threw in the towel on learning guitar after struggling for months, but I'm glad I persisted because now I really enjoy it." },
    { question: "Can you give an example of someone barking up the wrong tree?", answer: "The police were barking up the wrong tree when they suspected my neighbor of the theft. It turned out to be someone else entirely." },
    { question: "When is it important to cut to the chase in conversation?", answer: "It's important to cut to the chase in business meetings when time is limited. People appreciate directness rather than long-winded introductions." },
    { question: "What does it mean to move the needle in your industry?", answer: "In education, moving the needle means actually improving student outcomes, not just implementing new programs that look good on paper." },
    { question: "How do you touch base with colleagues when working remotely?", answer: "I touch base with my team through quick video calls or messages, just checking in to see how they're doing and if they need support." },
    { question: "What initiative would really move the needle in your workplace?", answer: "Better professional development would really move the needle here. Investing in employee skills would boost both morale and productivity." },
    { question: "When have you seen someone let the cat out of the bag accidentally?", answer: "My dad let the cat out of the bag about my mom's birthday gift by mentioning it at dinner. She pretended not to hear, but we all knew." },
    { question: "What's a goal you're on the fence about pursuing?", answer: "I'm on the fence about pursuing an MBA. It would advance my career, but the time commitment and cost are significant factors to consider." },
    { question: "How do you handle situations where you're walking on thin ice?", answer: "When I'm on thin ice, I stay focused, admit my mistakes quickly, and work extra hard to rebuild trust. Transparency and accountability matter." },
    { question: "Can you describe a time when plans went so well, you hit it out of the park?", answer: "Our product launch hit it out of the park! We exceeded sales targets by 200%, got amazing press coverage, and customers loved it." },
    { question: "What's an example of someone running an idea up the flagpole?", answer: "In our last brainstorming session, someone ran up the flagpole the idea of a four-day workweek. Management is actually considering it now!" },
    { question: "Have you ever had to tell someone they were barking up the wrong tree?", answer: "Yes, when a friend suspected her partner of cheating, I had to tell her she was barking up the wrong tree. He was planning a surprise proposal!" },
    { question: "When should you avoid burning bridges professionally?", answer: "You should always avoid burning bridges. Even if you had a bad experience, you never know when paths might cross again." },
    { question: "What's a situation where jumping the gun can be costly?", answer: "Jumping the gun on investment decisions can be very costly. It's better to do thorough research rather than rushing into something based on hype." },
    { question: "How do you know when to throw in the towel versus persevere?", answer: "That's tough. I think if you've genuinely tried everything and it's damaging your wellbeing, it's okay to throw in the towel. But don't quit prematurely." },
    { question: "What's an elephant in the room in modern society?", answer: "Mental health is becoming less of an elephant in the room now, but there's still stigma. We need to keep talking about it openly." },
    { question: "When have you been in the same boat as strangers?", answer: "When my flight was canceled, all the passengers were in the same boat. We bonded over the frustrating situation and helped each other find solutions." },
    { question: "How do you get the ball rolling on New Year's resolutions?", answer: "I get the ball rolling by writing down specific, achievable goals on January 1st and scheduling them into my calendar immediately." },
    { question: "What's advice you take with a grain of salt?", answer: "I take diet advice on social media with a grain of salt. There's so much conflicting information that you need to consult actual professionals." },
    { question: "Have you ever had to go back to the drawing board multiple times?", answer: "When writing my thesis, I went back to the drawing board three times! Each rejection helped me refine my arguments until it was finally accepted." },
    { question: "What's a secret that someone spilled the beans about?", answer: "My colleague spilled the beans about the company merger before the official announcement. It caused a lot of unnecessary panic and confusion." },
    { question: "When is it better to rock the boat than stay quiet?", answer: "If you see unethical behavior or discrimination, you should rock the boat. Staying silent makes you complicit in the problem." },
    { question: "How do you pull strings ethically in professional settings?", answer: "Ethical string-pulling is about making introductions and recommendations based on merit, not nepotism. I'll connect people I genuinely believe in." },
    { question: "What does 'cutting to the chase' look like in your profession?", answer: "In teaching, cutting to the chase means getting straight to the core concepts without excessive theory. Students appreciate clarity and practical application." },
    { question: "What helps you read between the lines in communication?", answer: "I read between the lines by paying attention to tone, word choice, and what's not said. Body language in person also reveals a lot." }
  ]
};

// Module 211: Collocations for Academic English
const MODULE_211_DATA = {
  title: "Module 211 - Collocations for Academic English",
  description: "Word partnerships in scholarly writing for natural, sophisticated academic expression",
  intro: `📘 Lesson Objectives
✅ Master common academic collocations
✅ Use appropriate verb + noun partnerships
✅ Apply adjective + noun combinations in scholarly writing
✅ Recognize discipline-specific collocations
✅ Develop natural-sounding academic prose

🔍 Grammar Deep Dive

**What are Collocations?**
Collocations are words that frequently occur together in natural language. In academic English, using correct collocations is essential for sounding natural and professional.

**Common Academic Collocation Patterns:**

1️⃣ **Verb + Research/Study**
   📌 conduct research, carry out a study, undertake research
   📌 publish findings, present results, analyze data

2️⃣ **Adjective + Research/Evidence**
   📌 empirical research, qualitative study, compelling evidence
   📌 substantial evidence, considerable research, extensive literature

3️⃣ **Verb + Argument/Theory**
   📌 present an argument, propose a theory, challenge assumptions
   📌 support a claim, refute an argument, develop a framework

4️⃣ **Common Academic Pairs**
   📌 draw conclusions, raise questions, address concerns
   📌 meet criteria, reach consensus, establish links

**Why Collocations Matter:**
✅ They sound natural to native speakers
✅ Wrong combinations mark you as non-native
✅ They carry precise academic meanings
✅ They're expected in scholarly writing`,
  table: [
    { english: "Conduct research", turkish: "Araştırma yapmak", example: "We conducted extensive research on climate patterns." },
    { english: "Draw conclusions", turkish: "Sonuç çıkarmak", example: "Based on the data, we can draw several conclusions." },
    { english: "Raise questions", turkish: "Soru gündeme getirmek", example: "This finding raises important questions about methodology." },
    { english: "Address concerns", turkish: "Endişeleri ele almak", example: "The study addresses concerns about validity." },
    { english: "Present findings", turkish: "Bulguları sunmak", example: "We will present our findings at the conference." },
    { english: "Reach consensus", turkish: "Fikir birliğine varmak", example: "Scholars have reached consensus on this issue." },
    { english: "Meet criteria", turkish: "Kriterleri karşılamak", example: "The participants met all inclusion criteria." },
    { english: "Pose challenges", turkish: "Zorluklar yaratmak", example: "This methodology poses significant challenges." },
    { english: "Shed light on", turkish: "Aydınlatmak", example: "This research sheds light on the mechanisms involved." },
    { english: "Bridge the gap", turkish: "Boşluğu kapatmak", example: "Our study bridges the gap between theory and practice." },
    { english: "Advance understanding", turkish: "Anlayışı geliştirmek", example: "This work advances understanding of neural processes." },
    { english: "Generate debate", turkish: "Tartışma yaratmak", example: "The publication generated considerable debate." },
    { english: "Gather evidence", turkish: "Kanıt toplamak", example: "Researchers gathered compelling evidence supporting the theory." },
    { english: "Test hypotheses", turkish: "Hipotez test etmek", example: "The experiment was designed to test three hypotheses." },
    { english: "Establish links", turkish: "Bağlantılar kurmak", example: "We established clear links between variables." },
    { english: "Examine implications", turkish: "Etkileri incelemek", example: "The paper examines implications for policy." },
    { english: "Yield results", turkish: "Sonuç vermek", example: "The analysis yielded unexpected results." },
    { english: "Fill a gap", turkish: "Boşluğu doldurmak", example: "This study fills an important gap in the literature." },
    { english: "Support claims", turkish: "İddiaları desteklemek", example: "The data strongly support our claims." },
    { english: "Refute arguments", turkish: "Argümanları çürütmek", example: "Recent findings refute earlier arguments." }
  ],
  speakingPractice: [
    { question: "How do you conduct research in your field?", answer: "We conduct research by first reviewing existing literature, then designing experiments that test specific hypotheses using appropriate methodologies." },
    { question: "What conclusions can we draw from recent climate studies?", answer: "We can draw the conclusion that human activity significantly contributes to global warming, though the exact mechanisms remain subjects of ongoing investigation." },
    { question: "What questions does this new technology raise?", answer: "This technology raises important questions about privacy, data security, and the ethical implications of artificial intelligence in decision-making processes." },
    { question: "How does your study address concerns about validity?", answer: "Our study addresses these concerns by employing rigorous methodology, using large sample sizes, and replicating results across multiple contexts." },
    { question: "Where will you present your findings?", answer: "We'll present our findings at the International Conference on Applied Linguistics next month, and subsequently publish them in a peer-reviewed journal." },
    { question: "Have scholars reached consensus on this controversial topic?", answer: "Scholars have yet to reach complete consensus, though there's growing agreement that multiple factors interact in complex ways." },
    { question: "What criteria must participants meet for your study?", answer: "Participants must meet several criteria: they must be between 18-65 years old, fluent in English, and have no prior diagnosis of neurological disorders." },
    { question: "What challenges does this methodology pose?", answer: "This methodology poses challenges in terms of resource requirements, time constraints, and the difficulty of controlling for confounding variables." },
    { question: "How does this research shed light on the problem?", answer: "This research sheds light on previously unexplored mechanisms, revealing that the relationship is more nuanced than earlier studies suggested." },
    { question: "How can we bridge the gap between theory and practice?", answer: "We can bridge this gap by involving practitioners in research design, conducting field studies, and translating findings into actionable recommendations." },
    { question: "What does this work advance in our understanding?", answer: "This work advances our understanding of cognitive processes during language acquisition, particularly regarding the role of implicit versus explicit learning." },
    { question: "Why did this publication generate debate?", answer: "The publication generated considerable debate because it challenged long-held assumptions and proposed a controversial alternative explanation for observed phenomena." },
    { question: "How do researchers gather evidence for their claims?", answer: "Researchers gather evidence through systematic observation, controlled experiments, surveys, interviews, and analysis of existing data sets." },
    { question: "How were the hypotheses tested in this experiment?", answer: "We tested our hypotheses by manipulating independent variables under controlled conditions and measuring their effects on dependent variables using statistical analysis." },
    { question: "What links did the study establish between diet and health?", answer: "The study established strong links between Mediterranean diet patterns and reduced cardiovascular disease risk, controlling for lifestyle factors." },
    { question: "What implications should we examine from these findings?", answer: "We should examine implications for educational policy, teacher training programs, and curriculum design, as these findings suggest significant reforms may be beneficial." },
    { question: "What results did the data analysis yield?", answer: "The analysis yielded surprising results: contrary to expectations, the intervention showed stronger effects in the control group than the experimental group." },
    { question: "What gap does your research fill in the literature?", answer: "Our research fills a significant gap by examining long-term outcomes, whereas previous studies only investigated short-term effects." },
    { question: "How strongly does the evidence support your claims?", answer: "The evidence strongly supports our claims, with consistent results across multiple studies and statistical significance at the p<0.01 level." },
    { question: "Which earlier arguments do recent findings refute?", answer: "Recent findings effectively refute earlier arguments that attributed these effects solely to genetic factors, demonstrating the importance of environmental influences." },
    { question: "How do you ensure your research meets ethical standards?", answer: "We ensure our research meets ethical standards by obtaining informed consent, protecting participant confidentiality, and securing approval from institutional review boards." },
    { question: "What role does peer review play in academic publishing?", answer: "Peer review plays a crucial role in maintaining quality, identifying methodological flaws, and ensuring that published research meets disciplinary standards." },
    { question: "How do scholars develop theoretical frameworks?", answer: "Scholars develop theoretical frameworks by synthesizing existing theories, identifying gaps or contradictions, and proposing new conceptual models that better explain observed phenomena." },
    { question: "What makes evidence compelling in academic contexts?", answer: "Evidence becomes compelling when it's derived from rigorous methodology, replicated across studies, shows consistent patterns, and withstands critical scrutiny." },
    { question: "How can researchers advance knowledge in their field?", answer: "Researchers advance knowledge by asking novel questions, challenging assumptions, employing innovative methods, and building incrementally on previous work." },
    { question: "What factors contribute to reaching academic consensus?", answer: "Reaching consensus requires accumulated evidence from multiple sources, replication of findings, peer review, and time for the scholarly community to evaluate claims critically." },
    { question: "How do you identify gaps in existing literature?", answer: "I identify gaps by conducting comprehensive literature reviews, noting what questions remain unanswered, recognizing methodological limitations, and observing contradictory findings." },
    { question: "What distinguishes rigorous from weak methodology?", answer: "Rigorous methodology demonstrates careful design, appropriate controls, valid measurements, adequate sample sizes, and transparent reporting that enables replication." },
    { question: "How should researchers respond to criticism of their work?", answer: "Researchers should respond to criticism professionally, acknowledging valid points, defending their positions with evidence, and viewing critique as opportunity for refinement." },
    { question: "What role do conferences play in academic discourse?", answer: "Conferences facilitate academic discourse by providing forums for presenting preliminary findings, receiving feedback, networking with peers, and staying current with field developments." },
    { question: "How can interdisciplinary research benefit scholarship?", answer: "Interdisciplinary research benefits scholarship by bringing fresh perspectives, combining methodologies, addressing complex problems holistically, and fostering innovation through diverse approaches." },
    { question: "What makes a research question significant?", answer: "A research question becomes significant when it addresses important gaps, has theoretical or practical implications, challenges existing paradigms, or opens new avenues for inquiry." },
    { question: "How do you evaluate the quality of academic sources?", answer: "I evaluate sources by examining peer-review status, author credentials, methodological rigor, citation patterns, journal reputation, and whether claims are adequately supported." },
    { question: "What strategies help in writing clear academic prose?", answer: "Clear academic prose requires precise terminology, logical organization, appropriate hedging, smooth transitions, and balancing sophistication with accessibility." },
    { question: "How should limitations be acknowledged in research?", answer: "Limitations should be acknowledged transparently, explaining specific constraints, discussing potential impacts on findings, and suggesting how future research might address them." },
    { question: "What role does replication play in scientific research?", answer: "Replication plays a vital role in verifying findings, testing generalizability, building confidence in results, and distinguishing robust effects from spurious findings." },
    { question: "How can researchers ensure their work has practical impact?", answer: "Researchers ensure practical impact by engaging stakeholders, translating findings into accessible formats, collaborating with practitioners, and addressing real-world problems." },
    { question: "What makes theoretical contributions valuable?", answer: "Theoretical contributions prove valuable when they explain phenomena more comprehensively, generate testable predictions, integrate disparate findings, or shift how we conceptualize issues." },
    { question: "How should scholars approach controversial topics?", answer: "Scholars should approach controversial topics objectively, examining multiple perspectives, acknowledging complexity, supporting arguments with evidence, and maintaining intellectual honesty." },
    { question: "What distinguishes correlation from causation in research?", answer: "Correlation indicates association between variables, while causation implies one variable directly influences another. Establishing causation requires controlled experiments, temporal precedence, and ruling out alternatives." }
  ]
};

// Module 212: Abstract Nouns and Concepts
const MODULE_212_DATA = {
  title: "Module 212 - Abstract Nouns and Concepts",
  description: "Expressing complex ideas and abstractions with sophisticated vocabulary",
  intro: `📘 Lesson Objectives
✅ Master abstract nouns for complex concepts
✅ Express intangible ideas with precision
✅ Use nominalization effectively
✅ Discuss philosophical and theoretical concepts
✅ Apply abstract language in academic discourse

🔍 Grammar Deep Dive

**What are Abstract Nouns?**
Abstract nouns refer to intangible concepts, ideas, qualities, or states rather than concrete objects. They're essential for discussing complex theoretical, philosophical, and academic topics.

**Categories of Abstract Nouns:**

1️⃣ **Emotions & States**
   📌 anxiety, contentment, despair, euphoria, melancholy

2️⃣ **Qualities & Characteristics**
   📌 resilience, integrity, authenticity, ambiguity, versatility

3️⃣ **Concepts & Ideas**
   📌 democracy, justice, freedom, equality, autonomy

4️⃣ **Processes & Actions**
   📌 transformation, implementation, deterioration, escalation

5️⃣ **Academic Abstractions**
   📌 methodology, paradigm, phenomenon, hypothesis, empiricism

**Nominalization:**
Turning verbs and adjectives into nouns creates formal, academic tone:
- analyze → analysis
- significant → significance
- emerge → emergence`,
  table: [
    { english: "Resilience", turkish: "Dayanıklılık", example: "Her resilience in the face of adversity was remarkable." },
    { english: "Autonomy", turkish: "Özerklik", example: "The region gained greater political autonomy." },
    { english: "Paradigm", turkish: "Paradigma", example: "This represents a paradigm shift in thinking." },
    { english: "Ambiguity", turkish: "Belirsizlik", example: "The contract's ambiguity led to disputes." },
    { english: "Integrity", turkish: "Dürüstlük", example: "She's known for her personal integrity." },
    { english: "Phenomenon", turkish: "Olgu", example: "Social media is a relatively recent phenomenon." },
    { english: "Deterioration", turkish: "Bozulma", example: "We observed a deterioration in conditions." },
    { english: "Authenticity", turkish: "Özgünlük", example: "The authenticity of the document was questioned." },
    { english: "Escalation", turkish: "Tırmanma", example: "The escalation of tensions concerned diplomats." },
    { english: "Empiricism", turkish: "Deneycilik", example: "The study embraced empiricism over speculation." },
    { english: "Dichotomy", turkish: "İkilem", example: "There's a false dichotomy between theory and practice." },
    { english: "Hegemony", turkish: "Hegemonya", example: "Cultural hegemony influences social norms." },
    { english: "Juxtaposition", turkish: "Yan yana koyma", example: "The juxtaposition of old and new was striking." },
    { english: "Manifestation", turkish: "Tezahür", example: "This is a manifestation of deeper issues." },
    { english: "Pragmatism", turkish: "Faydacılık", example: "His pragmatism helped solve practical problems." },
    { english: "Reciprocity", turkish: "Karşılıklılık", example: "International relations depend on reciprocity." },
    { english: "Sovereignty", turkish: "Egemenlik", example: "National sovereignty was a key concern." },
    { english: "Transcendence", turkish: "Aşkınlık", example: "Art offers moments of transcendence." },
    { english: "Volatility", turkish: "Değişkenlik", example: "Market volatility increased dramatically." },
    { english: "Coherence", turkish: "Tutarlılık", example: "The argument lacks logical coherence." }
  ],
  speakingPractice: [
    { question: "What role does resilience play in personal development?", answer: "Resilience plays a crucial role because it enables individuals to recover from setbacks, adapt to challenges, and maintain psychological equilibrium during adversity." },
    { question: "How do you understand the concept of autonomy?", answer: "I understand autonomy as the capacity for self-governance and independent decision-making, free from external coercion, which is fundamental to human dignity and freedom." },
    { question: "Can you explain what constitutes a paradigm shift?", answer: "A paradigm shift represents a fundamental change in underlying assumptions or conceptual frameworks, transforming how we understand and approach entire domains of knowledge." },
    { question: "Why is ambiguity sometimes valuable in communication?", answer: "Ambiguity can be valuable because it allows for multiple interpretations, provides flexibility, and sometimes diplomatic vagueness prevents unnecessary conflict or premature closure." },
    { question: "What does integrity mean in professional contexts?", answer: "Professional integrity means consistently adhering to ethical principles, maintaining honesty, fulfilling commitments, and demonstrating reliability even when no one is watching." },
    { question: "How do we study social phenomena scientifically?", answer: "We study social phenomena through systematic observation, data collection, analysis of patterns, and testing hypotheses, while acknowledging the complexity of human behavior." },
    { question: "What causes deterioration in relationships?", answer: "Relationship deterioration typically results from accumulated resentments, communication breakdowns, unmet expectations, loss of trust, or failure to adapt to changing circumstances." },
    { question: "Why do people value authenticity?", answer: "People value authenticity because it represents genuine self-expression, aligns behavior with values, and creates deeper connections based on trust rather than pretense." },
    { question: "What factors contribute to conflict escalation?", answer: "Conflict escalation occurs through miscommunication, emotional reactivity, perceived threats, entrenched positions, and the involvement of additional parties with vested interests." },
    { question: "How does empiricism differ from rationalism?", answer: "Empiricism prioritizes sensory experience and observation as sources of knowledge, whereas rationalism emphasizes reason and logical deduction as primary paths to understanding truth." },
    { question: "Can you give an example of a false dichotomy?", answer: "A false dichotomy would be claiming you're either completely for or against something, when actually there's a spectrum of nuanced positions between extremes." },
    { question: "What is cultural hegemony and how does it function?", answer: "Cultural hegemony refers to dominance achieved through cultural means rather than force, where certain values and norms become accepted as natural or inevitable." },
    { question: "Why is juxtaposition a powerful artistic technique?", answer: "Juxtaposition creates powerful effects by placing contrasting elements together, highlighting differences, generating new meanings, and prompting viewers to reconsider assumptions." },
    { question: "How do psychological issues manifest physically?", answer: "Psychological issues often manifest physically through symptoms like headaches, digestive problems, fatigue, or tension, demonstrating the interconnection between mind and body." },
    { question: "What's the difference between idealism and pragmatism?", answer: "Idealism emphasizes principles and theoretical perfection, while pragmatism focuses on practical consequences and what actually works in real-world contexts." },
    { question: "How does reciprocity function in social relationships?", answer: "Reciprocity functions as a fundamental social principle where people exchange benefits, creating mutual obligations, building trust, and maintaining balanced relationships over time." },
    { question: "Why is sovereignty important for nations?", answer: "Sovereignty is crucial because it establishes a nation's legal authority to govern itself independently, make domestic decisions, and interact with other states as an equal." },
    { question: "What experiences offer transcendence in everyday life?", answer: "Transcendent experiences might include profound artistic encounters, spiritual practices, connection with nature, or moments where we feel part of something greater than ourselves." },
    { question: "How should investors approach market volatility?", answer: "Investors should approach volatility with diversification, long-term perspective, emotional discipline, and understanding that short-term fluctuations are normal in functioning markets." },
    { question: "What gives an argument coherence?", answer: "Argument coherence comes from logical connections between premises, consistent use of terms, clear progression of ideas, and alignment between evidence and conclusions." },
    { question: "How do you cultivate authenticity in your life?", answer: "I cultivate authenticity by regularly reflecting on my values, making choices aligned with them, expressing genuine emotions, and resisting pressure to conform to others' expectations." },
    { question: "What threatens democratic institutions?", answer: "Democratic institutions face threats from authoritarianism, corruption, misinformation, erosion of civic norms, polarization, and citizens' disengagement from political processes." },
    { question: "How does abstraction function in intellectual discourse?", answer: "Abstraction allows us to identify patterns, generalize from specific cases, develop theories, and discuss concepts independent of particular instantiations." },
    { question: "What's the relationship between freedom and responsibility?", answer: "Freedom and responsibility are interconnected: genuine freedom requires acknowledging that our choices have consequences, and responsibility only exists when freedom of choice is present." },
    { question: "How do we balance tradition and innovation?", answer: "Balancing tradition and innovation requires respecting valuable heritage while remaining open to improvement, critically evaluating what to preserve versus what to change." },
    { question: "What role does skepticism play in critical thinking?", answer: "Skepticism plays a vital role by encouraging us to question claims, demand evidence, examine assumptions, and avoid accepting ideas uncritically." },
    { question: "How does bureaucracy affect organizational efficiency?", answer: "Bureaucracy can enhance efficiency through standardization and clear procedures, but excessive bureaucracy creates rigidity, slows decision-making, and stifles innovation." },
    { question: "What constitutes meaningful existence?", answer: "Meaningful existence involves purpose beyond mere survival, authentic relationships, contribution to something larger than oneself, and living according to examined values." },
    { question: "How do prejudices form and persist?", answer: "Prejudices form through socialization, limited exposure to diverse perspectives, cognitive shortcuts, and are reinforced by confirmation bias and social conformity pressures." },
    { question: "What is the nature of consciousness?", answer: "Consciousness remains philosophically and scientifically mysterious—it involves subjective awareness, intentionality, and the ineffable quality of experience that's difficult to reduce to physical processes." },
    { question: "How does globalization affect cultural identity?", answer: "Globalization creates tension between homogenization and diversity, threatening local traditions while enabling cultural exchange, requiring negotiation between global and local identities." },
    { question: "What defines genuine compassion?", answer: "Genuine compassion involves empathetic understanding of others' suffering, emotional resonance with their pain, and motivation to alleviate it without seeking personal gain." },
    { question: "How do we navigate moral ambiguity?", answer: "Navigating moral ambiguity requires acknowledging complexity, consulting ethical principles, considering consequences, seeking diverse perspectives, and accepting that certainty isn't always possible." },
    { question: "What's the difference between knowledge and wisdom?", answer: "Knowledge involves possessing information and understanding facts, while wisdom encompasses judgment, experience, perspective, and knowing how to apply knowledge appropriately." },
    { question: "How does nostalgia influence present decisions?", answer: "Nostalgia can provide comfort and identity continuity but may also distort memory, idealize the past, and prevent necessary adaptation to present circumstances." },
    { question: "What creates social cohesion in diverse societies?", answer: "Social cohesion emerges from shared values, mutual respect, inclusive institutions, positive intergroup contact, and commitment to common civic principles despite differences." },
    { question: "How do we define progress?", answer: "Progress is contestable—it might mean technological advancement, moral improvement, increased well-being, or expanding human capabilities, depending on one's values and perspective." },
    { question: "What role does uncertainty play in decision-making?", answer: "Uncertainty requires us to make decisions with incomplete information, assess risks probabilistically, remain flexible, and develop strategies that are robust across multiple scenarios." },
    { question: "How does power operate in social relationships?", answer: "Power operates through authority, resources, knowledge, social capital, and sometimes subtle mechanisms like agenda-setting, norm-creation, and shaping what's considered possible or legitimate." },
    { question: "What constitutes ethical leadership?", answer: "Ethical leadership involves integrity, accountability, fairness, respect for others, transparent decision-making, and prioritizing collective good alongside organizational goals." }
  ]
};

// Module 213: Talking About Data and Research
const MODULE_213_DATA = {
  title: "Module 213 - Talking About Data and Research",
  description: "Discussing statistics, findings, and research with precision and clarity",
  intro: `📘 Lesson Objectives
✅ Describe statistical data accurately
✅ Present research findings professionally
✅ Discuss trends, patterns, and correlations
✅ Use appropriate language for quantitative and qualitative research
✅ Critique research methodology effectively

🔍 Grammar Deep Dive

**Essential Vocabulary for Data Discussion:**

1️⃣ **Describing Trends**
   📌 increase/rise/grow vs. decrease/decline/fall
   📌 sharp, gradual, steady, dramatic, slight
   📌 peak, plateau, fluctuate, stabilize

2️⃣ **Statistical Terms**
   📌 correlation, causation, significance, variance
   📌 sample size, margin of error, confidence interval
   📌 mean, median, mode, standard deviation

3️⃣ **Research Language**
   📌 The data suggest/indicate/demonstrate
   📌 Findings reveal/show/point to
   📌 Results support/contradict/align with

4️⃣ **Qualifying Statements**
   📌 statistically significant, marginally significant
   📌 strong/moderate/weak correlation
   📌 preliminary results, tentative conclusions

**Important Distinctions:**
⚠️ "Correlation does not imply causation"
⚠️ "Significant" has specific statistical meaning
⚠️ Always specify what data shows vs. what it might mean`,
  table: [
    { english: "The data indicate/suggest", turkish: "Veri gösteriyor", example: "The data indicate a strong correlation between variables." },
    { english: "A sharp increase", turkish: "Keskin artış", example: "We observed a sharp increase in participation rates." },
    { english: "Gradual decline", turkish: "Kademeli düşüş", example: "There has been a gradual decline in smoking rates." },
    { english: "Statistically significant", turkish: "İstatistiksel olarak anlamlı", example: "The difference was statistically significant (p<0.05)." },
    { english: "Sample size", turkish: "Örneklem büyüklüğü", example: "The sample size was 500 participants." },
    { english: "Margin of error", turkish: "Hata payı", example: "Results have a margin of error of ±3%." },
    { english: "Correlation coefficient", turkish: "Korelasyon katsayısı", example: "The correlation coefficient was 0.78." },
    { english: "Control group", turkish: "Kontrol grubu", example: "The control group received no intervention." },
    { english: "Confounding variable", turkish: "Karıştırıcı değişken", example: "Age was identified as a confounding variable." },
    { english: "Baseline measurement", turkish: "Başlangıç ölçümü", example: "Baseline measurements were taken before intervention." },
    { english: "Longitudinal study", turkish: "Boylamsal çalışma", example: "This longitudinal study tracked participants for 10 years." },
    { english: "Cross-sectional analysis", turkish: "Kesitsel analiz", example: "Cross-sectional analysis revealed age differences." },
    { english: "Quantitative data", turkish: "Nicel veri", example: "We collected both quantitative and qualitative data." },
    { english: "Outlier", turkish: "Aykırı değer", example: "Several outliers were removed from the analysis." },
    { english: "Distribution curve", turkish: "Dağılım eğrisi", example: "The distribution curve showed normal variation." },
    { english: "Confidence interval", turkish: "Güven aralığı", example: "The 95% confidence interval was 23-45%." },
    { english: "Null hypothesis", turkish: "Boş hipotez", example: "We rejected the null hypothesis." },
    { english: "Effect size", turkish: "Etki büyüklüğü", example: "The effect size was moderate (d=0.5)." },
    { english: "Peer-reviewed", turkish: "Hakem denetimli", example: "This appeared in a peer-reviewed journal." },
    { english: "Replicate findings", turkish: "Bulguları tekrarlamak", example: "Subsequent studies replicated these findings." }
  ],
  speakingPractice: [
    { question: "How would you describe a sharp increase in unemployment rates?", answer: "The data show a sharp increase in unemployment, rising from 5% to 12% over just six months, representing a 140% relative increase." },
    { question: "What does statistical significance actually mean?", answer: "Statistical significance means the observed result is unlikely to have occurred by chance alone, typically with less than 5% probability, though it doesn't necessarily indicate practical importance." },
    { question: "How do you explain the difference between correlation and causation?", answer: "Correlation means two variables change together, but causation means one directly causes the other. For example, ice cream sales correlate with drowning deaths, but buying ice cream doesn't cause drowning—both increase in summer." },
    { question: "What makes a sample size adequate for research?", answer: "Adequate sample size depends on effect size, desired statistical power, and acceptable error margin. Generally, larger samples provide more reliable estimates and greater ability to detect true effects." },
    { question: "How would you describe data showing a gradual decline?", answer: "The data demonstrate a gradual decline over the decade, with values decreasing steadily from 85% in 2010 to 62% in 2020, representing an average annual decrease of 2.3 percentage points." },
    { question: "What information should you include when presenting survey results?", answer: "When presenting survey results, specify sample size, sampling method, response rate, margin of error, confidence level, and exact question wording to enable proper interpretation." },
    { question: "How do you interpret a correlation coefficient of 0.7?", answer: "A correlation coefficient of 0.7 indicates a strong positive relationship, meaning as one variable increases, the other tends to increase as well, though correlation doesn't prove causation." },
    { question: "What's the purpose of a control group in experiments?", answer: "The control group provides a comparison baseline, helping isolate the intervention's effect by showing what would happen without treatment, thus strengthening causal inferences." },
    { question: "How would you explain what a confounding variable is?", answer: "A confounding variable influences both the independent and dependent variables, potentially creating spurious associations. For example, age might confound the relationship between exercise and health." },
    { question: "Why are baseline measurements important in research?", answer: "Baseline measurements establish initial conditions before intervention, allowing researchers to measure change accurately and determine whether observed effects genuinely resulted from the treatment." },
    { question: "What advantages do longitudinal studies offer?", answer: "Longitudinal studies track the same individuals over time, revealing how variables change within people, establishing temporal sequence, and providing stronger evidence for causal relationships than cross-sectional studies." },
    { question: "When would you use cross-sectional analysis?", answer: "Cross-sectional analysis is appropriate for examining differences between groups at a single time point, providing quick snapshots, though it can't establish causation or show how individuals change over time." },
    { question: "How do quantitative and qualitative data complement each other?", answer: "Quantitative data provide measurable patterns and statistical relationships, while qualitative data offer depth, context, and understanding of meanings, together providing comprehensive understanding." },
    { question: "How should researchers handle outliers in data?", answer: "Researchers should investigate outliers to determine if they're errors, genuine extreme values, or indicate important subgroups. Decisions to include or exclude them should be justified and transparent." },
    { question: "What does a normal distribution curve tell us?", answer: "A normal distribution shows most values cluster around the mean, with symmetrical tails. Many natural phenomena follow this pattern, and it's assumed by many statistical tests." },
    { question: "How do you interpret a 95% confidence interval?", answer: "A 95% confidence interval means if we repeated the study many times, 95% of calculated intervals would contain the true population parameter. It indicates the precision of our estimate." },
    { question: "What does it mean to reject the null hypothesis?", answer: "Rejecting the null hypothesis means the data provide sufficient evidence that an effect exists, though we never 'prove' the alternative hypothesis—we simply find the null implausible." },
    { question: "Why is effect size important beyond statistical significance?", answer: "Effect size indicates practical importance—how much difference the intervention makes. Something can be statistically significant but have trivial real-world impact, especially with large samples." },
    { question: "What does peer review contribute to research quality?", answer: "Peer review involves expert evaluation of methodology, analysis, and conclusions before publication, helping identify errors, improving clarity, and ensuring research meets disciplinary standards." },
    { question: "Why is replication important in science?", answer: "Replication verifies original findings aren't flukes, tests generalizability across contexts, builds confidence in results, and distinguishes robust effects from spurious ones." },
    { question: "How would you describe fluctuating data?", answer: "The data show considerable fluctuation, with values oscillating between 30 and 50 throughout the period, suggesting instability without clear directional trend." },
    { question: "What's the difference between mean, median, and mode?", answer: "Mean is the arithmetic average, median is the middle value when ordered, and mode is the most frequent value. Each describes central tendency differently and suits different data types." },
    { question: "How do you explain margin of error to non-experts?", answer: "Margin of error indicates uncertainty in survey results. If a poll shows 52% support with ±3% margin, the true value likely falls between 49-55%, acknowledging sampling variability." },
    { question: "What makes research methodology rigorous?", answer: "Rigorous methodology involves appropriate design, valid measurements, adequate samples, proper controls, transparent procedures, suitable analysis, and honest reporting of limitations." },
    { question: "How would you critique a study with small sample size?", answer: "I'd note that small samples reduce statistical power, increase sampling error, limit generalizability, and make it harder to detect true effects while being more vulnerable to outliers." },
    { question: "What information belongs in a research methods section?", answer: "Methods sections should detail participants, materials, procedures, measurements, and analysis plans with sufficient specificity that others could replicate the study." },
    { question: "How do you present contradictory research findings?", answer: "Present contradictory findings objectively, noting methodological differences that might explain discrepancies, and discuss what additional research could help resolve inconsistencies." },
    { question: "What does it mean when data 'plateau'?", answer: "When data plateau, they level off after a period of change, suggesting a limit has been reached or equilibrium established, with no further increases or decreases." },
    { question: "How would you explain standard deviation?", answer: "Standard deviation measures variability around the mean. Small standard deviations mean data cluster tightly together; large ones indicate values are spread out." },
    { question: "What's the purpose of randomization in experiments?", answer: "Randomization distributes confounding variables equally across groups by chance, preventing systematic bias and strengthening causal inferences about treatment effects." },
    { question: "How do you determine if research findings are generalizable?", answer: "Generalizability depends on sample representativeness, replication across contexts, effect consistency, and whether the study population resembles the population of interest." },
    { question: "What are limitations of self-reported data?", answer: "Self-reported data may suffer from social desirability bias, recall errors, limited self-awareness, or misunderstanding questions, requiring corroboration with objective measures when possible." },
    { question: "How would you present preliminary research findings?", answer: "I'd clearly label them as preliminary, explaining what analysis remains, acknowledging limitations, avoiding strong conclusions, and noting that results may change with additional data." },
    { question: "What makes a research question valuable?", answer: "Valuable research questions address important gaps, have theoretical or practical implications, are answerable with available methods, and advance understanding beyond current knowledge." },
    { question: "How do you interpret non-significant results?", answer: "Non-significant results don't prove no effect exists—they simply indicate insufficient evidence. Consider statistical power, effect size, and whether the study could detect meaningful differences." },
    { question: "What's the difference between reliability and validity?", answer: "Reliability means measurements are consistent and repeatable. Validity means measurements actually capture what they're intended to measure. You can have reliability without validity, but not vice versa." },
    { question: "How would you explain publication bias?", answer: "Publication bias occurs when positive or significant results are more likely to be published than negative or null findings, distorting the literature and potentially leading to false conclusions." },
    { question: "What role do graphs and visualizations play in presenting data?", answer: "Visualizations make patterns immediately apparent, facilitate comparisons, engage audiences, and communicate complex relationships more effectively than tables of numbers alone." },
    { question: "How do you assess whether a relationship is causal?", answer: "Assess causality by examining temporal sequence, strength of association, dose-response relationships, alternative explanations, biological plausibility, and consistency across studies." },
    { question: "What ethical considerations apply to research with human participants?", answer: "Ethical research requires informed consent, confidentiality protection, minimizing harm, equitable participant selection, and institutional oversight through review boards." }
  ]
};

// Module 214: Critical Thinking Vocabulary
const MODULE_214_DATA = {
  title: "Module 214 - Critical Thinking Vocabulary",
  description: "Master vocabulary for analyzing, evaluating, and expressing reasoned judgments in academic contexts",
  intro: `📘 Lesson Objectives
✅ Use advanced critical thinking vocabulary
✅ Express opinions objectively and logically
✅ Support arguments with evidence
✅ Question assumptions effectively

**Understanding Critical Thinking**

Critical thinking involves analyzing, evaluating, and interpreting information before forming a judgment. In academic English, critical thinking vocabulary helps students express ideas objectively, support arguments, and challenge assumptions effectively.

**Key Critical Thinking Vocabulary**

| Verb | Meaning | Example |
|------|---------|---------|
| Evaluate | To assess or judge something carefully | Students must evaluate the effectiveness of the solution. |
| Analyze | To examine something in detail | The report analyzes the causes of the economic crisis. |
| Infer | To draw a conclusion based on evidence | We can infer that motivation affects productivity. |
| Justify | To give reasons or evidence for an opinion | He justified his position with relevant data. |
| Assess | To determine the value or quality of something | The teacher assessed the students' understanding. |
| Challenge | To question or oppose an idea | The article challenges traditional gender roles. |
| Reflect | To think deeply or carefully about something | She reflected on her learning experience. |
| Assume | To accept something as true without proof | We cannot assume that everyone agrees. |
| Interpret | To explain the meaning of something | The researcher interpreted the results cautiously. |
| Verify | To confirm the truth or accuracy of something | The data was verified before publication. |

**Useful Collocations:**
• Form an opinion • Provide justification • Question an assumption • Draw a conclusion • Support an argument • Present evidence • Evaluate a claim • Consider multiple perspectives • Identify bias • Challenge conventional wisdom • Analyze reasoning • Reach a logical conclusion • Develop a hypothesis • Compare viewpoints • Assess reliability

**Academic Sentence Frames:**
• It can be argued that...
• This suggests that...
• One could infer that...
• There is evidence to support the claim that...
• A possible explanation for this is that...
• From this perspective...
• This raises the question of whether...
• The findings indicate that...
• It is essential to consider that...
• However, one might also argue that...`,

  table: [
    { english: "Evaluate", turkish: "Değerlendirmek", example: "Students must evaluate the effectiveness of the solution." },
    { english: "Analyze", turkish: "Analiz etmek", example: "The report analyzes the causes of the economic crisis." },
    { english: "Infer", turkish: "Çıkarım yapmak", example: "We can infer that motivation affects productivity." },
    { english: "Justify", turkish: "Haklı çıkarmak", example: "He justified his position with relevant data." },
    { english: "Assess", turkish: "Değerlendirmek", example: "The teacher assessed the students' understanding." },
    { english: "Challenge", turkish: "Sorgulamak", example: "The article challenges traditional gender roles." },
    { english: "Reflect", turkish: "Düşünmek", example: "She reflected on her learning experience." },
    { english: "Assume", turkish: "Varsaymak", example: "We cannot assume that everyone agrees." },
    { english: "Interpret", turkish: "Yorumlamak", example: "The researcher interpreted the results cautiously." },
    { english: "Verify", turkish: "Doğrulamak", example: "The data was verified before publication." },
    { english: "Form an opinion", turkish: "Fikir oluşturmak", example: "It takes time to form a well-reasoned opinion." },
    { english: "Provide justification", turkish: "Gerekçe sunmak", example: "You must provide justification for your claims." },
    { english: "Question an assumption", turkish: "Varsayımı sorgulamak", example: "Critical thinkers question assumptions regularly." },
    { english: "Draw a conclusion", turkish: "Sonuç çıkarmak", example: "Based on the evidence, we can draw a conclusion." },
    { english: "Support an argument", turkish: "Argümanı desteklemek", example: "Data should support your argument effectively." },
    { english: "Present evidence", turkish: "Kanıt sunmak", example: "Always present evidence to back up your claims." },
    { english: "Evaluate a claim", turkish: "İddiayı değerlendirmek", example: "We need to evaluate this claim carefully." },
    { english: "Consider multiple perspectives", turkish: "Çoklu bakış açıları düşünmek", example: "Good thinkers consider multiple perspectives." },
    { english: "Identify bias", turkish: "Önyargıyı belirlemek", example: "It's important to identify bias in sources." },
    { english: "Challenge conventional wisdom", turkish: "Geleneksel bilgiyi sorgulamak", example: "Scientists often challenge conventional wisdom." }
  ],

  speakingPractice: [
    { question: "Why is critical thinking essential in academic communication?", answer: "Critical thinking is essential because it allows students to question evidence, evaluate sources, and develop balanced arguments rather than simply accepting information at face value." },
    { question: "How do you evaluate the credibility of a source?", answer: "I evaluate credibility by checking the author's credentials, examining the evidence presented, looking for bias, and comparing the information with other reliable sources." },
    { question: "What does it mean to analyze an argument?", answer: "To analyze an argument means to break it down into its component parts — examining the claims, the evidence, the reasoning, and identifying any logical fallacies or weaknesses." },
    { question: "How can you infer meaning from limited information?", answer: "You can infer meaning by looking at context clues, considering what's implied rather than explicitly stated, and drawing logical conclusions based on the available evidence." },
    { question: "Why is it important to justify your opinions?", answer: "Justifying opinions is important because it demonstrates logical thinking, builds credibility, and helps others understand your reasoning rather than seeing your views as arbitrary." },
    { question: "How would you assess a student's critical thinking skills?", answer: "I would assess critical thinking by evaluating their ability to question assumptions, analyze evidence, construct logical arguments, and consider alternative perspectives." },
    { question: "When should you challenge an idea or theory?", answer: "You should challenge an idea when the evidence seems weak, when there are logical inconsistencies, or when alternative explanations haven't been adequately considered." },
    { question: "What's the value of reflecting on your learning?", answer: "Reflecting on learning helps you identify what you've understood, recognize gaps in knowledge, and develop metacognitive awareness that improves future learning strategies." },
    { question: "Why is it problematic to assume without evidence?", answer: "Assuming without evidence leads to faulty reasoning and poor decisions. It's essential to verify claims with concrete data before accepting them as true." },
    { question: "How do you interpret research findings objectively?", answer: "I interpret findings objectively by focusing on what the data actually shows, avoiding personal bias, considering alternative explanations, and acknowledging limitations." },
    { question: "Why should data be verified before publication?", answer: "Data must be verified to ensure accuracy, maintain academic integrity, and prevent the spread of misinformation that could mislead other researchers or the public." },
    { question: "How do you form a well-reasoned opinion?", answer: "I form a well-reasoned opinion by gathering relevant information, evaluating different perspectives, examining the evidence, and constructing logical arguments before reaching a conclusion." },
    { question: "What makes justification effective in arguments?", answer: "Effective justification includes relevant evidence, logical reasoning, acknowledgment of counterarguments, and clear connections between claims and supporting data." },
    { question: "How do you question an assumption constructively?", answer: "I question assumptions constructively by asking 'What evidence supports this?', 'Are there alternative explanations?', and 'What would happen if this weren't true?'" },
    { question: "What's the difference between inference and assumption?", answer: "Inference is a conclusion drawn from evidence and reasoning, while assumption is something accepted as true without proof. Inference is based on logic; assumption may not be." },
    { question: "How can you draw valid conclusions from data?", answer: "Valid conclusions require analyzing the data thoroughly, ensuring the sample size is adequate, avoiding overgeneralization, and considering whether correlation implies causation." },
    { question: "Why is it important to support arguments with evidence?", answer: "Supporting arguments with evidence makes them persuasive, credible, and verifiable. It moves discourse from mere opinion to reasoned analysis." },
    { question: "How do you present evidence effectively?", answer: "I present evidence effectively by citing reliable sources, explaining its relevance to my argument, providing context, and showing how it supports my claims." },
    { question: "What does it mean to evaluate a claim critically?", answer: "Evaluating a claim critically means examining its logical structure, assessing the quality of supporting evidence, identifying potential biases, and considering alternative viewpoints." },
    { question: "Why should we consider multiple perspectives?", answer: "Considering multiple perspectives prevents narrow thinking, reveals blind spots in our reasoning, and leads to more comprehensive and balanced understanding of complex issues." },
    { question: "How do you identify bias in sources?", answer: "I identify bias by examining the author's affiliations, looking for loaded language, checking if opposing views are fairly represented, and noticing what information is omitted." },
    { question: "When is it appropriate to challenge conventional wisdom?", answer: "It's appropriate to challenge conventional wisdom when new evidence emerges, when logical inconsistencies become apparent, or when traditional views don't account for changing circumstances." },
    { question: "How do you analyze the reasoning in an argument?", answer: "I analyze reasoning by identifying the premises and conclusions, checking for logical connections, looking for fallacies, and evaluating whether the evidence truly supports the claims." },
    { question: "What does it mean to reach a logical conclusion?", answer: "A logical conclusion follows necessarily from the premises and evidence. It's not based on emotion or wishful thinking but on sound reasoning and factual support." },
    { question: "How do you develop a hypothesis in research?", answer: "I develop a hypothesis by identifying a research question, reviewing existing literature, considering possible explanations, and formulating a testable prediction based on theory and evidence." },
    { question: "Why is comparing viewpoints important?", answer: "Comparing viewpoints is important because it reveals the strengths and weaknesses of different positions, helps identify common ground, and leads to more nuanced understanding." },
    { question: "How do you assess the reliability of information?", answer: "I assess reliability by checking the source's credentials, looking for peer review, examining the methodology, cross-referencing with other sources, and noting the publication date." },
    { question: "What role does evidence play in critical thinking?", answer: "Evidence is the foundation of critical thinking. It transforms opinions into reasoned arguments and allows us to test claims objectively rather than relying on intuition alone." },
    { question: "How can critical thinking improve decision-making?", answer: "Critical thinking improves decision-making by helping us analyze options objectively, anticipate consequences, identify hidden assumptions, and choose based on logic rather than emotion." },
    { question: "Why is it important to interpret data cautiously?", answer: "Cautious interpretation prevents overconfidence in conclusions, acknowledges limitations in the data, and reduces the risk of making claims that aren't fully supported by evidence." },
    { question: "How do you challenge your own biases?", answer: "I challenge my biases by actively seeking opposing viewpoints, questioning my automatic reactions, examining the evidence objectively, and being open to changing my mind." },
    { question: "What's the relationship between critical thinking and creativity?", answer: "Critical thinking and creativity work together — creativity generates new ideas, while critical thinking evaluates and refines them. Both are essential for innovation and problem-solving." },
    { question: "How do you teach critical thinking to others?", answer: "I teach critical thinking by modeling questioning techniques, encouraging evidence-based reasoning, presenting problems that require analysis, and creating a safe space for intellectual risk-taking." },
    { question: "Why is reflection important after completing a task?", answer: "Reflection helps identify what worked well, what could be improved, and what was learned. It transforms experience into insight and improves future performance." },
    { question: "How can you verify claims in the digital age?", answer: "I verify claims by checking primary sources, using fact-checking websites, examining the methodology behind studies, and being skeptical of sensational headlines or unattributed quotes." },
    { question: "What makes an opinion objective vs. subjective?", answer: "An objective opinion is supported by verifiable evidence and logical reasoning, while a subjective opinion is based on personal feelings or preferences without empirical support." },
    { question: "How do you evaluate conflicting evidence?", answer: "I evaluate conflicting evidence by examining the quality of each source, looking for methodological differences, considering sample sizes, and determining which evidence is more credible and relevant." },
    { question: "Why should arguments acknowledge counterarguments?", answer: "Acknowledging counterarguments demonstrates intellectual honesty, strengthens your position by addressing objections, and shows that you've considered multiple perspectives thoroughly." },
    { question: "How does critical thinking relate to academic integrity?", answer: "Critical thinking supports academic integrity by promoting honest evaluation of sources, proper attribution of ideas, and rejection of plagiarism or falsification of evidence." },
    { question: "What's the ultimate goal of critical thinking?", answer: "The ultimate goal is to arrive at the truth through systematic analysis and evaluation, making informed decisions based on evidence and reason rather than emotion or bias." }
  ]
};

// Module 215: Cause and Effect - Advanced Language
const MODULE_215_DATA = {
  title: "Module 215 - Cause and Effect: Advanced Language",
  description: "Master advanced structures for expressing cause, effect, and consequence in academic writing",
  intro: `📘 Lesson Objectives
✅ Use advanced cause and effect expressions
✅ Express reasons and results formally
✅ Link ideas logically and coherently
✅ Apply cause-effect language in essays

**Understanding Cause and Effect**

Understanding how to express cause and effect is essential for academic and analytical writing. It helps students explain reasons, results, and consequences clearly and logically. Mastering these structures improves essay coherence and makes arguments sound more sophisticated.

**Key Cause and Effect Structures**

| Connector / Phrase | Function | Example |
|-------------------|----------|---------|
| Because of / Due to | Shows reason or cause | The project was delayed due to technical issues. |
| As a result (of) | Shows result or consequence | As a result of the policy, unemployment decreased. |
| Therefore / Thus / Hence | Indicates logical conclusion | The data was inaccurate; therefore, the conclusion was invalid. |
| Consequently | Shows direct result | Consequently, the team had to revise the plan. |
| Owing to | Formal expression of cause | Owing to climate change, sea levels are rising. |
| Lead to / Result in | Cause something to happen | Poor management led to decreased productivity. |
| Be caused by | Passive cause structure | The flood was caused by heavy rainfall. |
| Bring about / Give rise to | Initiate a process or change | Urbanization brought about rapid cultural shifts. |
| Trigger / Spark | Start an event or reaction | The announcement triggered public protests. |
| Be responsible for | Explain accountability | Lack of funding was responsible for the delay. |

**Useful Collocations:**
• Cause concern • Cause confusion • Lead to improvement • Result in success • Bring about change • Give rise to conflict • Be a result of • Be responsible for • Have an impact on • Play a role in • Trigger a reaction • Produce an effect • Be associated with • Contribute to development • Generate awareness

**Advanced Sentence Frames:**
• X resulted in Y.
• Y occurred as a result of X.
• Owing to X, Y happened.
• X was primarily caused by Y.
• X contributed to Y.
• The increase in X led to a decline in Y.
• As a result of X, Y improved.
• X triggered a chain reaction that led to Y.
• Y can be attributed to X.
• X had a significant influence on Y.`,

  table: [
    { english: "Because of / Due to", turkish: "Nedeniyle", example: "The project was delayed due to technical issues." },
    { english: "As a result (of)", turkish: "Sonuç olarak", example: "As a result of the policy, unemployment decreased." },
    { english: "Therefore / Thus / Hence", turkish: "Bu nedenle", example: "The data was inaccurate; therefore, the conclusion was invalid." },
    { english: "Consequently", turkish: "Sonuç olarak", example: "Consequently, the team had to revise the plan." },
    { english: "Owing to", turkish: "Nedeniyle (resmi)", example: "Owing to climate change, sea levels are rising." },
    { english: "Lead to / Result in", turkish: "Yol açmak / Sonuçlanmak", example: "Poor management led to decreased productivity." },
    { english: "Be caused by", turkish: "Neden olmak (pasif)", example: "The flood was caused by heavy rainfall." },
    { english: "Bring about / Give rise to", turkish: "Sebep olmak / Ortaya çıkarmak", example: "Urbanization brought about rapid cultural shifts." },
    { english: "Trigger / Spark", turkish: "Tetiklemek", example: "The announcement triggered public protests." },
    { english: "Be responsible for", turkish: "Sorumlu olmak", example: "Lack of funding was responsible for the delay." },
    { english: "Cause concern", turkish: "Endişeye neden olmak", example: "The rising crime rates cause concern among citizens." },
    { english: "Lead to improvement", turkish: "İyileşmeye yol açmak", example: "The new policy led to significant improvement." },
    { english: "Result in success", turkish: "Başarıyla sonuçlanmak", example: "Hard work often results in success." },
    { english: "Bring about change", turkish: "Değişim getirmek", example: "Education can bring about social change." },
    { english: "Give rise to conflict", turkish: "Çatışmaya yol açmak", example: "Different values can give rise to conflict." },
    { english: "Have an impact on", turkish: "Etkisi olmak", example: "Technology has a major impact on education." },
    { english: "Play a role in", turkish: "Rol oynamak", example: "Diet plays a crucial role in health." },
    { english: "Trigger a reaction", turkish: "Tepkiyi tetiklemek", example: "The decision triggered a strong reaction." },
    { english: "Contribute to development", turkish: "Gelişmeye katkıda bulunmak", example: "Innovation contributes to economic development." },
    { english: "Generate awareness", turkish: "Farkındalık yaratmak", example: "Campaigns generate awareness about climate change." }
  ],

  speakingPractice: [
    { question: "How can you express cause and effect formally in academic writing?", answer: "You can use expressions such as 'as a result of', 'therefore', or 'owing to' to show cause and consequence. For example: 'Owing to increased pollution, many cities have implemented new environmental policies.'" },
    { question: "What's the difference between 'because of' and 'owing to'?", answer: "'Because of' is more common in everyday speech, while 'owing to' is more formal and typically used in academic or professional writing. Both express causation." },
    { question: "How do you use 'consequently' in a sentence?", answer: "'Consequently' shows a direct result and usually comes at the beginning of a clause: 'The budget was cut; consequently, several projects were cancelled.'" },
    { question: "What does 'lead to' mean and how is it used?", answer: "'Lead to' means to cause or result in something. It's followed by a noun or gerund: 'Poor planning led to the project's failure' or 'Lack of exercise leads to health problems.'" },
    { question: "How is 'result in' different from 'result from'?", answer: "'Result in' shows the effect (X results in Y means X causes Y), while 'result from' shows the cause (Y results from X means X causes Y). They express opposite directions of causation." },
    { question: "When do you use 'as a result of' versus 'as a result'?", answer: "'As a result of' is followed by a noun and shows the cause: 'As a result of the storm, schools closed.' 'As a result' stands alone and shows consequence: 'It rained heavily. As a result, the game was cancelled.'" },
    { question: "What's the meaning of 'give rise to'?", answer: "'Give rise to' means to cause something to begin or develop, especially something complex: 'The new law gave rise to numerous debates about privacy rights.'" },
    { question: "How do you use 'trigger' in cause-effect contexts?", answer: "'Trigger' means to cause something to start suddenly, often used for reactions or events: 'The tax increase triggered widespread protests' or 'Stress can trigger headaches.'" },
    { question: "What does 'bring about' mean?", answer: "'Bring about' means to make something happen, especially a change: 'The revolution brought about major political reforms' or 'Technology has brought about significant social changes.'" },
    { question: "How is 'be responsible for' used to show causation?", answer: "'Be responsible for' indicates that something or someone is the cause: 'Human activities are responsible for climate change' or 'The new manager was responsible for the company's turnaround.'" },
    { question: "What's the difference between 'therefore' and 'thus'?", answer: "Both show logical conclusion, but 'thus' is slightly more formal and often used in academic writing: 'The hypothesis was proven; therefore/thus, we can accept the theory.'" },
    { question: "How do you express passive causation?", answer: "Use 'be caused by' to make the effect the subject: 'The accident was caused by driver error' rather than 'Driver error caused the accident.' This emphasizes the result." },
    { question: "What does 'owing to' emphasize?", answer: "'Owing to' is a formal way to express cause, emphasizing the reason for something: 'Owing to severe weather conditions, flights were cancelled.' It's common in formal announcements." },
    { question: "How can climate change lead to migration?", answer: "Climate change can lead to migration because rising temperatures and extreme weather make some regions uninhabitable, forcing people to move to more sustainable areas. Therefore, environmental factors result in population displacement." },
    { question: "What causes traffic congestion in cities?", answer: "Traffic congestion is primarily caused by rapid urbanization and inadequate infrastructure. As a result of population growth, more vehicles use the same road systems, which consequently leads to severe traffic jams." },
    { question: "How does education contribute to economic development?", answer: "Education contributes to economic development by creating a skilled workforce. Consequently, educated workers are more productive, which results in innovation and economic growth. Thus, investing in education brings about long-term prosperity." },
    { question: "What are the effects of social media on communication?", answer: "Social media has brought about significant changes in how people communicate. It has led to instant global connection but also resulted in reduced face-to-face interaction. Consequently, while connectivity has improved, the quality of personal relationships may have declined." },
    { question: "How can poor management result in business failure?", answer: "Poor management can result in business failure because it leads to inefficiency, low employee morale, and bad decision-making. As a result, the company loses competitiveness. Therefore, effective leadership is responsible for organizational success." },
    { question: "What triggers inflation in an economy?", answer: "Inflation is typically triggered by increased money supply, rising production costs, or high demand. When demand exceeds supply, prices increase. Consequently, purchasing power decreases, which can give rise to economic instability." },
    { question: "How does stress affect health?", answer: "Stress can have a significant impact on health by triggering the release of harmful hormones. This leads to increased blood pressure and weakens the immune system. Consequently, chronic stress results in serious health problems like heart disease." },
    { question: "What are the consequences of deforestation?", answer: "Deforestation results in numerous environmental problems. It leads to habitat loss, contributes to climate change, and causes soil erosion. As a result of removing trees, ecosystems collapse and biodiversity decreases dramatically." },
    { question: "How can automation lead to unemployment?", answer: "Automation can lead to unemployment because machines replace human workers in repetitive tasks. Consequently, jobs in manufacturing and data entry have declined. However, this has also given rise to new opportunities in technology and programming." },
    { question: "What causes cultural misunderstandings?", answer: "Cultural misunderstandings are caused by different values, communication styles, and social norms. When people assume their cultural perspective is universal, this results in confusion. Therefore, cultural awareness is responsible for successful international communication." },
    { question: "How does technology influence education?", answer: "Technology has had a profound impact on education by making information accessible globally. It has brought about personalized learning and online courses. As a result, education is no longer limited by geography or economic status." },
    { question: "What are the effects of sleep deprivation?", answer: "Sleep deprivation results in impaired cognitive function, reduced concentration, and weakened immunity. It can trigger mood disorders and lead to serious health issues. Consequently, adequate sleep is responsible for maintaining both mental and physical health." },
    { question: "How can urban planning reduce pollution?", answer: "Effective urban planning can reduce pollution by creating green spaces and efficient public transport. This leads to fewer private vehicles on roads and consequently results in cleaner air. Therefore, sustainable city design brings about environmental improvements." },
    { question: "What gives rise to social inequality?", answer: "Social inequality is given rise to by unequal access to education, healthcare, and economic opportunities. Discrimination based on class, race, or gender also plays a role. As a result, wealth gaps widen, which further contributes to social division." },
    { question: "How does exercise contribute to mental health?", answer: "Exercise contributes to mental health by releasing endorphins, which improve mood. It also reduces stress hormones and leads to better sleep quality. Consequently, regular physical activity results in reduced anxiety and depression." },
    { question: "What are the consequences of overpopulation?", answer: "Overpopulation leads to resource depletion, environmental degradation, and increased competition for jobs and housing. As a result of overcrowding, living standards decline. This consequently triggers social tensions and economic challenges." },
    { question: "How can poor diet result in chronic diseases?", answer: "Poor diet, high in sugar and processed foods, results in obesity, diabetes, and heart disease. It causes inflammation and weakens the immune system. Therefore, dietary choices are directly responsible for long-term health outcomes." },
    { question: "What triggers economic recessions?", answer: "Economic recessions are triggered by various factors such as financial crises, reduced consumer spending, or external shocks. These lead to business closures and unemployment. Consequently, the economy contracts, which further impacts consumer confidence." },
    { question: "How does corruption affect development?", answer: "Corruption has a devastating impact on development because it diverts resources from public services to private gain. This results in poor infrastructure and inadequate healthcare. Consequently, corruption is responsible for perpetuating poverty and inequality." },
    { question: "What causes language extinction?", answer: "Language extinction is caused by globalization, urbanization, and cultural assimilation. When younger generations adopt dominant languages, traditional tongues disappear. As a result, linguistic diversity declines, which leads to loss of cultural heritage." },
    { question: "How can renewable energy bring about change?", answer: "Renewable energy can bring about significant environmental change by reducing dependence on fossil fuels. This leads to lower carbon emissions and consequently results in cleaner air. Therefore, sustainable energy is responsible for combating climate change." },
    { question: "What are the effects of advertising on consumer behavior?", answer: "Advertising has a powerful impact on consumer behavior by creating desire and shaping preferences. It triggers impulse buying and leads to consumption patterns based on image rather than need. As a result, marketing significantly influences economic choices." },
    { question: "How does conflict give rise to humanitarian crises?", answer: "Conflict gives rise to humanitarian crises by destroying infrastructure, displacing populations, and disrupting food supplies. As a result of war, people lose access to healthcare and education. Consequently, entire generations suffer long-term trauma." },
    { question: "What role does innovation play in progress?", answer: "Innovation plays a crucial role in progress by solving complex problems and improving efficiency. It brings about technological advances that result in better quality of life. Therefore, creativity and research contribute to societal development." },
    { question: "How can misinformation trigger social problems?", answer: "Misinformation can trigger social problems by spreading false beliefs and creating division. When people act on inaccurate information, this leads to poor decisions and conflict. Consequently, media literacy is responsible for maintaining a well-informed society." },
    { question: "What causes burnout in the workplace?", answer: "Burnout is caused by excessive workload, lack of control, and insufficient recognition. Chronic stress leads to emotional exhaustion and reduced productivity. As a result, employee well-being declines, which consequently impacts organizational performance." },
    { question: "How does poverty contribute to crime?", answer: "Poverty contributes to crime by creating desperation and limiting legal opportunities for income. Economic hardship can lead people to illegal activities. Consequently, addressing poverty is responsible for reducing crime rates in communities." },
    { question: "What are the long-term effects of childhood trauma?", answer: "Childhood trauma can have long-term effects on mental health, leading to anxiety, depression, and relationship difficulties. It triggers maladaptive coping mechanisms and results in lower life satisfaction. Therefore, early intervention is crucial for healing." },
    { question: "How can effective communication prevent conflicts?", answer: "Effective communication can prevent conflicts by ensuring clarity and mutual understanding. When people express themselves honestly and listen actively, misunderstandings decrease. Consequently, open dialogue results in stronger relationships and collaborative problem-solving." }
  ]
};

// Module 216: Writing Critiques and Reviews
const MODULE_216_DATA = {
  title: "Module 216 - Writing Critiques and Reviews",
  description: "Learn to analyze and evaluate texts, studies, films, or performances with objectivity and academic rigor",
  intro: `📘 Lesson Objectives
✅ Write balanced, analytical critiques
✅ Distinguish between description and evaluation
✅ Use polite and objective language
✅ Support judgments with evidence

**Purpose and Tone of Critiques**

A good critique is objective, analytical, and respectful. It highlights strengths and weaknesses while maintaining a professional tone. Writers must use cautious and polite language, often through hedging expressions such as "appears to" or "seems to."

**Key Verbs and Expressions for Critiques**

| Verb / Expression | Function | Example |
|-------------------|----------|---------|
| Evaluate | Assess value or quality | The author evaluates the effectiveness of the proposed solution. |
| Highlight | Draw attention to | The study highlights the need for further research. |
| Argue | Present reasoning | The writer argues that education reforms are necessary. |
| Question | Doubt or challenge | The article questions the reliability of previous findings. |
| Demonstrate | Show evidence or proof | The paper demonstrates a strong correlation between variables. |
| Emphasize | Stress importance | The review emphasizes the significance of teamwork. |
| Criticize | Point out flaws | The critique criticizes the limited sample size used in the research. |
| Acknowledge | Recognize value or truth | The author acknowledges the limitations of the study. |
| Support | Back up an argument | The researcher supports her claim with empirical evidence. |
| Refute | Disagree or disprove | The paper refutes the earlier theory proposed by Smith. |

**Useful Collocations:**
• Offer insight • Provide analysis • Raise an issue • Express doubt • Give credit to • Draw attention to • Present a balanced view • Address a weakness • Identify a strength • Make a valid point • Offer an alternative perspective • Present evidence • Support a claim • Challenge an argument • Summarize key findings`,

  table: [
    { english: "Evaluate", turkish: "Değerlendirmek", example: "The author evaluates the effectiveness of the proposed solution." },
    { english: "Highlight", turkish: "Vurgulamak", example: "The study highlights the need for further research." },
    { english: "Argue", turkish: "Savunmak", example: "The writer argues that education reforms are necessary." },
    { english: "Question", turkish: "Sorgulamak", example: "The article questions the reliability of previous findings." },
    { english: "Demonstrate", turkish: "Göstermek", example: "The paper demonstrates a strong correlation between variables." },
    { english: "Emphasize", turkish: "Vurgulamak", example: "The review emphasizes the significance of teamwork." },
    { english: "Criticize", turkish: "Eleştirmek", example: "The critique criticizes the limited sample size." },
    { english: "Acknowledge", turkish: "Kabul etmek", example: "The author acknowledges the limitations of the study." },
    { english: "Support", turkish: "Desteklemek", example: "The researcher supports her claim with empirical evidence." },
    { english: "Refute", turkish: "Çürütmek", example: "The paper refutes the earlier theory." },
    { english: "Offer insight", turkish: "İçgörü sunmak", example: "The book offers valuable insight into human behavior." },
    { english: "Provide analysis", turkish: "Analiz sunmak", example: "The review provides thorough analysis of the methodology." },
    { english: "Raise an issue", turkish: "Sorun ortaya koymak", example: "The author raises an important ethical issue." },
    { english: "Express doubt", turkish: "Şüphe belirtmek", example: "The critic expresses doubt about the findings." },
    { english: "Give credit to", turkish: "Takdir etmek", example: "We must give credit to the researcher's innovative approach." },
    { english: "Present a balanced view", turkish: "Dengeli görüş sunmak", example: "The critique presents a balanced view of strengths and weaknesses." },
    { english: "Address a weakness", turkish: "Zayıflığa değinmek", example: "The review addresses a major weakness in the argument." },
    { english: "Identify a strength", turkish: "Güçlü yönü belirlemek", example: "The analysis identifies the study's main strength." },
    { english: "Challenge an argument", turkish: "Argümanı sorgulamak", example: "The paper challenges the author's central argument." },
    { english: "Summarize key findings", turkish: "Ana bulguları özetlemek", example: "The review summarizes the key findings effectively." }
  ],

  speakingPractice: [
    { question: "What distinguishes a critique from a summary?", answer: "A critique goes beyond description; it evaluates and analyzes the subject using reasoning and evidence. While a summary restates the author's points, a critique discusses how effective or convincing those points are." },
    { question: "Why is objectivity important in writing critiques?", answer: "Objectivity ensures that the critique is fair, credible, and based on evidence rather than personal feelings. It allows readers to trust the evaluation and form their own informed opinions." },
    { question: "How can you maintain a respectful tone while critiquing?", answer: "You can maintain respect by using hedging language like 'appears to' or 'seems to', acknowledging strengths alongside weaknesses, and focusing on the work rather than attacking the author personally." },
    { question: "What does it mean to evaluate a text?", answer: "To evaluate a text means to assess its quality, effectiveness, and value by examining its arguments, evidence, methodology, and contribution to the field." },
    { question: "How do you highlight important points in a review?", answer: "You highlight important points by using emphasis markers like 'notably', 'significantly', or 'particularly', and by dedicating more discussion to central themes or findings." },
    { question: "When should you question findings in academic work?", answer: "You should question findings when the methodology is unclear, the sample size is inadequate, there are logical inconsistencies, or the conclusions don't fully match the evidence presented." },
    { question: "What makes a demonstration convincing in research?", answer: "A convincing demonstration includes clear methodology, sufficient evidence, logical reasoning, acknowledgment of limitations, and reproducible results that support the claims." },
    { question: "Why is it important to acknowledge limitations?", answer: "Acknowledging limitations shows intellectual honesty, helps readers understand the scope of the work, and identifies areas for future research. It strengthens rather than weakens academic credibility." },
    { question: "How do you support a claim in a critique?", answer: "You support a claim by citing specific examples from the text, referencing evidence, comparing with other works, and using logical reasoning to explain your evaluation." },
    { question: "What does it mean to refute an argument?", answer: "To refute an argument means to prove it wrong or invalid by presenting counterevidence, identifying logical fallacies, or demonstrating that the conclusions don't follow from the premises." },
    { question: "How can you offer insight in a review?", answer: "You offer insight by connecting the work to broader themes, identifying implications that the author may not have addressed, or revealing patterns and relationships in the content." },
    { question: "What should a balanced critique include?", answer: "A balanced critique should include both strengths and weaknesses, acknowledge what works well, identify areas for improvement, and provide constructive suggestions rather than just criticism." },
    { question: "How do you identify strengths in academic writing?", answer: "Identify strengths by looking for clear argumentation, robust evidence, innovative methodology, significant contributions to the field, and effective communication of complex ideas." },
    { question: "How can you address weaknesses constructively?", answer: "Address weaknesses constructively by explaining why they matter, suggesting how they could be improved, and balancing criticism with recognition of the work's positive aspects." },
    { question: "Why should critiques present evidence?", answer: "Presenting evidence makes critiques credible and persuasive. It transforms subjective opinion into reasoned analysis and allows readers to verify and evaluate the critique's validity." },
    { question: "How do you challenge an argument respectfully?", answer: "Challenge an argument respectfully by using phrases like 'one might argue that' or 'however, this view overlooks', providing alternative interpretations, and focusing on ideas rather than personal attacks." },
    { question: "What role does analysis play in critique writing?", answer: "Analysis breaks down the work into components, examines how they function, evaluates their effectiveness, and explains the reasoning behind judgments. It's the foundation of any good critique." },
    { question: "How can you express doubt diplomatically?", answer: "Express doubt diplomatically using hedging language: 'It seems questionable whether...', 'The evidence may not fully support...', or 'One might wonder if...' This softens criticism while still raising concerns." },
    { question: "What makes a critique academic versus informal?", answer: "Academic critiques use formal language, support claims with evidence, reference scholarly sources, maintain objectivity, and follow structured argumentation. Informal reviews may be more subjective and casual." },
    { question: "How do you give credit while still being critical?", answer: "You can acknowledge strengths and contributions while identifying weaknesses: 'While the author makes a valuable contribution to the field, the methodology raises some concerns regarding validity.'" },
    { question: "Why is it important to summarize key findings first?", answer: "Summarizing key findings provides context for readers, ensures you've understood the work correctly, and establishes a foundation for your evaluative comments that follow." },
    { question: "How can structure improve a critique?", answer: "Clear structure helps readers follow your analysis, separates descriptive content from evaluation, organizes strengths and weaknesses logically, and ensures all important aspects are addressed." },
    { question: "What's the difference between criticizing and being critical?", answer: "Criticizing often implies finding fault, while being critical means analyzing carefully and making informed judgments. Good critiques are critical in the analytical sense, not merely fault-finding." },
    { question: "How do you evaluate methodology in research?", answer: "Evaluate methodology by examining whether it's appropriate for the research question, adequately described, properly executed, and whether results are reproducible and reliable." },
    { question: "When should you emphasize certain points?", answer: "Emphasize points that are central to your evaluation, represent significant strengths or weaknesses, have broader implications, or challenge conventional understanding in the field." },
    { question: "How can you make your critique persuasive?", answer: "Make critiques persuasive through logical argumentation, specific evidence, clear explanation of your reasoning, acknowledgment of counterarguments, and professional, respectful tone." },
    { question: "What makes criticism constructive?", answer: "Constructive criticism explains why something doesn't work, offers suggestions for improvement, maintains a helpful tone, and aims to contribute to better work rather than simply tear down." },
    { question: "How do you handle biased sources in critique?", answer: "Acknowledge the bias, explain how it affects the work's credibility, provide balanced perspective by considering whether bias invalidates findings, and suggest how awareness of it should inform interpretation." },
    { question: "What's the purpose of a literature review critique?", answer: "A literature review critique evaluates how comprehensively the author surveyed existing research, whether relevant studies were included, and if the synthesis of findings is accurate and insightful." },
    { question: "How can you compare works in a critique?", answer: "Compare works by identifying similarities and differences, evaluating relative strengths, noting how each contributes uniquely to the field, and explaining which approaches are more effective." },
    { question: "Why should you avoid absolute language in critiques?", answer: "Absolute language like 'always' or 'never' is rarely accurate and makes critiques sound dogmatic. Qualified language like 'often' or 'tends to' is more precise and professional." },
    { question: "How do you critique creative works versus academic ones?", answer: "Creative critiques consider artistic merit, emotional impact, and aesthetic choices, while academic critiques focus on logical argumentation, evidence quality, and contribution to knowledge. Both require supporting your judgments." },
    { question: "What makes a thesis statement critique-worthy?", answer: "A critique should evaluate whether the thesis is clear, arguable, significant, and adequately supported throughout the work. It should also assess whether the thesis addresses an important question." },
    { question: "How can you improve your critique writing?", answer: "Improve by reading professional reviews, practicing analytical reading, learning discipline-specific criteria, developing precise vocabulary, and seeking feedback on your evaluations." },
    { question: "What ethical considerations apply to critique writing?", answer: "Ethical critique writing requires honesty, fairness, avoiding personal attacks, acknowledging your own limitations and biases, and recognizing the effort and value in the work being reviewed." },
    { question: "How do you handle disagreement with established scholars?", answer: "Handle disagreement respectfully by acknowledging their contributions, carefully explaining your reasoning, providing solid evidence, and presenting your view as an alternative perspective rather than definitive truth." },
    { question: "What's the role of examples in critique?", answer: "Examples provide concrete evidence for your evaluations, help readers locate the features you're discussing, illustrate your points clearly, and make abstract criticism tangible and verifiable." },
    { question: "How can you develop critical reading skills?", answer: "Develop critical reading by questioning assumptions, identifying underlying arguments, evaluating evidence quality, considering alternative interpretations, and practicing analysis of various texts regularly." },
    { question: "Why is peer review important in academia?", answer: "Peer review ensures quality control, identifies weaknesses before publication, improves clarity and rigor, validates methodology and findings, and maintains academic standards across disciplines." },
    { question: "How can critiques contribute to knowledge?", answer: "Critiques contribute by identifying flaws that need addressing, suggesting new research directions, clarifying misunderstandings, challenging assumptions, and advancing scholarly discourse through thoughtful evaluation." }
  ]
};

// Modules 217-224 data constants are imported from C1ModulesData_Extended.ts
// This organization improves maintainability and build performance

// Export all C1 module data
export {
  MODULE_201_DATA,
  MODULE_202_DATA,
  MODULE_203_DATA,
  MODULE_204_DATA,
  MODULE_205_DATA,
  MODULE_206_DATA,
  MODULE_207_DATA,
  MODULE_208_DATA,
  MODULE_209_DATA,
  MODULE_210_DATA,
  MODULE_211_DATA,
  MODULE_212_DATA,
  MODULE_213_DATA,
  MODULE_214_DATA,
  MODULE_215_DATA,
  MODULE_216_DATA,
};

// Re-export extended modules for convenience
export * from './C1ModulesData_Extended';
