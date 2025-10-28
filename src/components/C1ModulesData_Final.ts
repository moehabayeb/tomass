/**
 * C1 Level Final Module Data (Modules 225-235)
 * Advanced English communication, writing, and leadership skills
 */

// Module 225: Understanding Academic Texts
export const MODULE_225_DATA = {
  title: "Module 225 - Understanding Academic Texts",
  description: "Learn strategies for reading and analyzing academic texts effectively",
  intro: `📘 Lesson Objectives
✅ Recognize the structure of academic texts
✅ Identify tone, style, and argumentation patterns
✅ Apply critical reading strategies
✅ Understand citation and referencing conventions

**What Are Academic Texts?**
Academic texts are formal, objective pieces of writing that present research, analysis, or scholarly arguments. They follow specific conventions and are written for an educated audience.

**Key Features:**
• **Formal style** – Avoids contractions, colloquialisms, and personal opinions
• **Objectivity** – Focuses on facts, evidence, and logical reasoning
• **Structure** – Clear introduction, body, and conclusion
• **Citations** – References to support claims and avoid plagiarism
• **Technical vocabulary** – Field-specific terminology
• **Hedging language** – Cautious claims (may, might, could suggest)

**Reading Strategies:**
• **Skim first** – Get the general idea before detailed reading
• **Identify the thesis** – What is the main argument?
• **Note evidence** – How does the author support their claims?
• **Question assumptions** – Is the logic sound?
• **Synthesize** – Connect ideas across sections`,

  table: {
    title: "📋 Understanding Academic Texts (Akademik Metinleri Anlama)",
    data: [
      { category: "What Are Academic Texts?", explanation: "Formal, objective writing presenting research, analysis, or scholarly arguments", purpose: "Inform or persuade through evidence-based reasoning", audience: "Educated readers familiar with the field", turkish: "Akademik metinler - bilimsel yazılar", note: "Follow specific conventions and disciplinary standards" },

      { category: "Key Feature - Formal Style", characteristics: "No contractions (don't → do not), no colloquialisms (stuff → material), no slang", tone: "Professional, impersonal, objective", avoid: "Casual language, personal pronouns (I, you), emotional language", examples: "Instead of 'I think this is bad' → 'The evidence suggests limitations' / Instead of 'a lot of' → 'substantial' or 'significant'", remember: "Academic = formal register throughout!" },

      { category: "Key Feature - Objectivity", focus: "Facts, evidence, and logical reasoning (not personal opinions)", passive_voice: "Often used to emphasize results over researcher", examples: "The experiment was conducted... / The data were analyzed... / Results indicate...", avoid: "In my opinion, I believe, I feel, obviously, clearly (unless supported)", critical: "Present EVIDENCE, not just beliefs!", note: "Let the data speak, not your personal views" },

      { category: "Key Feature - Clear Structure", intro: "Introduction: context, thesis statement, roadmap", body: "Body: paragraphs with topic sentences, evidence, analysis", conclusion: "Conclusion: summarize findings, implications, future research", signposting: "Use transitions: Furthermore, However, In contrast, Moreover", note: "Reader should be able to follow argument easily!" },

      { category: "Key Feature - Citations & References", purpose_1: "Give credit to original authors (avoid plagiarism)", purpose_2: "Allow readers to verify sources and find original work", purpose_3: "Demonstrate engagement with existing research", formats: "APA, MLA, Chicago, Harvard - depends on field", examples: "According to Smith (2020)... / Research indicates (Jones, 2019). / Multiple studies support this (Lee, 2018; Chen, 2021).", critical: "ALWAYS cite! Not citing = plagiarism", note: "When in doubt, cite the source!" },

      { category: "Key Feature - Technical Vocabulary", discipline_specific: "Each field has specialized terminology", precision: "Technical terms are more precise than everyday equivalents", examples: "Science: hypothesis, methodology, empirical / Psychology: cognition, affect, behavior / Economics: elasticity, equilibrium, inflation", learn: "Build vocabulary gradually through reading in your field", note: "Don't avoid technical terms - they add precision!" },

      { category: "Key Feature - Hedging Language", what: "Cautious, tentative expressions avoiding overstatement", verbs: "suggest, indicate, appear to, seem to, may, might, could", adverbs: "possibly, perhaps, probably, likely, generally, typically", examples: "The data SUGGEST a relationship... / Results MAY indicate... / This COULD explain...", purpose: "Shows appropriate scientific caution and acknowledges uncertainty", critical: "Don't claim certainty without absolute proof!", remember: "Hedging = professional, not weak!" },

      { category: "Reading Strategy 1 - Skimming", what: "Quickly reading to get general idea", how: "Read title, abstract, intro, headings, conclusion first", speed: "Don't read every word - identify main points", when: "Before detailed reading, when deciding if article is relevant", examples: "Skim abstract to see if study relates to your topic / Read conclusion to understand findings", note: "Skimming BEFORE reading saves time!" },

      { category: "Reading Strategy 2 - Identifying Thesis", what: "The main argument or central claim of the text", where: "Usually at end of introduction paragraph", importance: "Everything else supports or develops the thesis", how_to_find: "Look for strong declarative statement about what will be argued", examples: "'This paper argues that...' / 'The evidence demonstrates...' / 'This study challenges the view that...'", remember: "Thesis = the 'so what?' of the paper" },

      { category: "Reading Strategy 3 - Note Evidence", what: "Identify how author supports claims", types: "Research data, statistics, expert citations, examples, case studies", questions: "What evidence is provided? Is it sufficient? Is the source reliable?", strategy: "Underline key evidence, note page numbers for quotes", critical: "Strong arguments have MULTIPLE types of evidence!", note: "Evaluate quality of evidence, not just quantity" },

      { category: "Reading Strategy 4 - Question Assumptions", critical_reading: "Don't accept claims passively - evaluate logic", questions: "What assumptions underlie this argument? Are they valid? / What's NOT being said? / Are there alternative explanations?", watch_for: "Logical fallacies, biased sources, overgeneralizations, unsupported leaps", examples: "Author assumes correlation = causation? / Sample size too small to generalize? / Conflicting evidence ignored?", note: "Critical reading = questioning, not accepting blindly!" },

      { category: "Reading Strategy 5 - Synthesizing", what: "Combining information from different sources or sections to form new understanding", how: "Look for patterns, connections, contradictions across texts", examples: "Study A and Study B both find X, suggesting... / While Author 1 claims Y, Author 2's data contradicts this...", purpose: "Create coherent overall interpretation beyond individual sources", note: "Synthesis = going beyond summary to create new insights!" },

      { category: "Understanding the Abstract", what: "Brief summary (150-250 words) of entire paper", includes: "Research question, methodology, key findings, conclusions", purpose: "Helps readers quickly assess relevance without reading full paper", strategy: "Read abstract first to decide if paper is worth full read", structure: "Background → Methods → Results → Conclusions", note: "Abstract is your roadmap to the paper!" },

      { category: "Understanding Citations - In-Text", what: "Brief reference within text pointing to full citation in bibliography", formats: "APA: (Author, Year) / MLA: (Author Page) / Chicago: Footnotes", examples: "Research shows effectiveness (Smith, 2020). / According to Johnson (2019), ... / Multiple studies support this (Lee, 2018; Chen, 2021).", purpose: "Show where information came from without interrupting flow", note: "Every fact/idea from another source needs citation!" },

      { category: "Understanding Citations - Reference List", what: "Complete bibliographic information at end of paper", includes: "Author(s), year, title, journal/publisher, DOI/URL", alphabetical: "Usually ordered alphabetically by author surname", purpose: "Allows readers to locate original sources", examples: "Smith, J. (2020). Title of article. Journal Name, 15(3), 45-62. https://doi.org/...", note: "Different fields use different citation styles!" },

      { category: "Common Structures in Academic Writing", IMRAD: "Introduction, Methods, Results, And Discussion (science papers)", problem_solution: "Problem-Solution (identify issue, propose solution)", comparison: "Comparison-Contrast (analyze similarities and differences)", cause_effect: "Cause-Effect (explain why something happens)", chronological: "Chronological (historical development or process)", note: "Recognize structure to follow argument better!" },

      { category: "Types of Academic Texts", research_article: "Research article - original empirical study", review_article: "Literature review - synthesizes existing research", theoretical: "Theoretical paper - develops conceptual framework", case_study: "Case study - in-depth analysis of specific example", meta_analysis: "Meta-analysis - statistical synthesis of multiple studies", note: "Different types require different reading approaches!" },

      { category: "Common Mistakes - Students", mistake_1: "Reading word-by-word instead of strategically", mistake_2: "Not identifying thesis early", mistake_3: "Accepting claims without evaluating evidence", mistake_4: "Ignoring citations and references", mistake_5: "Not taking notes or highlighting key points", advice: "Read ACTIVELY, not passively - engage with the text!", remember: "Academic reading = critical thinking, not memorizing!" },

      { category: "Active Reading Techniques", annotate: "Annotate: Write notes in margins, highlight key points", question: "Question: Write questions as you read", summarize: "Summarize: Write brief summary of each section", connect: "Connect: Link to other readings or your own knowledge", evaluate: "Evaluate: Assess strengths and weaknesses", note: "Active reading improves comprehension and retention!" },

      { category: "Remember", takeaway_1: "Academic texts = formal, objective, evidence-based writing", takeaway_2: "Key features: formal style, citations, hedging language, clear structure", takeaway_3: "Reading strategies: skim first, identify thesis, note evidence, question assumptions, synthesize", takeaway_4: "Citations are REQUIRED - always acknowledge sources", takeaway_5: "Read ACTIVELY and CRITICALLY - don't accept claims passively", final_note: "Mastering academic texts is essential for university success - develop these skills through practice!" }
    ]
  },

  speakingPractice: [
    { question: "What is the main purpose of academic writing?", answer: "The main purpose is to inform or persuade through evidence-based reasoning, contribute to scholarly discourse, and advance knowledge in a particular field." },
    { question: "Why is objectivity important in academic texts?", answer: "Objectivity ensures that arguments are based on evidence rather than personal bias, making the research credible and allowing readers to evaluate claims independently." },
    { question: "What does 'hedging language' mean in academic writing?", answer: "Hedging language uses cautious or tentative expressions like 'may suggest' or 'could indicate' to avoid overstating claims and acknowledge uncertainty in research." },
    { question: "How should you approach reading a complex academic article?", answer: "Start by skimming the abstract and conclusion, then read the introduction to understand the thesis, and finally work through the body while taking notes on key arguments and evidence." },
    { question: "Why are citations essential in academic writing?", answer: "Citations give credit to original authors, allow readers to verify sources, demonstrate the writer's engagement with existing research, and help avoid plagiarism." },
    { question: "What is a thesis statement in academic writing?", answer: "A thesis statement is a clear, concise declaration of the main argument or position that the paper will develop and support with evidence throughout the text." },
    { question: "How does academic vocabulary differ from everyday language?", answer: "Academic vocabulary is more formal, precise, and often discipline-specific, using technical terms and avoiding colloquialisms or contractions common in casual speech." },
    { question: "What is the purpose of an abstract in academic papers?", answer: "An abstract provides a brief summary of the entire paper, including the research question, methodology, key findings, and conclusions, helping readers quickly assess relevance." },
    { question: "Why is structure important in academic texts?", answer: "Clear structure helps readers follow complex arguments, understand the relationship between ideas, and locate specific information efficiently." },
    { question: "What does it mean to 'synthesize' information when reading?", answer: "Synthesizing means combining information from different sources or sections to form new understanding, seeing connections between ideas, and creating a coherent overall interpretation." }
  ]
};

// Module 226: Advanced Punctuation and Style
export const MODULE_226_DATA = {
  title: "Module 226 - Advanced Punctuation and Style",
  description: "Master sophisticated punctuation for clarity and emphasis",
  intro: `📘 Lesson Objectives
✅ Use semicolons and colons correctly
✅ Master comma placement in complex sentences
✅ Understand dashes and parentheses for emphasis
✅ Apply quotation marks and apostrophes accurately

**Why Punctuation Matters:**
Proper punctuation clarifies meaning, controls pacing, and adds sophistication to your writing. Misplaced punctuation can change the entire meaning of a sentence.

**Advanced Punctuation Marks:**`,

  table: {
    title: "📋 Advanced Punctuation and Style (İleri Noktalama İşaretleri)",
    data: [
      { category: "Why Punctuation Matters", clarity: "Clarifies meaning and prevents misinterpretation", pacing: "Controls reading rhythm and emphasis", sophistication: "Adds polish and professionalism to writing", examples: "Let's eat, Grandma! vs Let's eat Grandma! (comma saves Grandma!)", critical: "Misplaced punctuation can completely change meaning!", note: "Master punctuation for clear, professional writing" },

      { category: "Semicolon (;) - Connecting Clauses", symbol: "Semicolon (;) - noktalı virgül", use: "Connects two closely related independent clauses", rule: "Both parts must be complete sentences (independent clauses)", examples: "She loves reading; her brother prefers sports. / The experiment succeeded; the hypothesis was confirmed.", not_for: "Don't use with dependent clauses or before conjunctions like 'because'", note: "Semicolon = stronger than comma, weaker than period" },

      { category: "Semicolon (;) - Lists with Commas", use_2: "Separates complex list items that already contain commas", examples: "The conference includes speakers from Paris, France; Berlin, Germany; and Tokyo, Japan. / Team members: John Smith, CEO; Mary Johnson, CFO; and Bob Lee, CTO.", purpose: "Prevents confusion when list items have internal commas", remember: "Use semicolons to separate major list items!" },

      { category: "Colon (:) - Introducing Information", symbol: "Colon (:) - iki nokta", use: "Introduces explanation, list, quote, or example", rule: "What comes BEFORE colon must be independent clause", examples: "He needed three things: patience, courage, and luck. / The solution is simple: work harder. / She said the following: 'Success requires effort.'", wrong: "She bought: milk, eggs, bread ✗ (no independent clause before colon)", correct: "She bought three items: milk, eggs, and bread ✓", note: "Colon = 'here's what I mean' or 'as follows'" },

      { category: "Em Dash (—) - Adding Emphasis", symbol: "Em Dash (—) - uzun tire (longest dash)", use: "Adds emphasis, interruption, or aside", effect: "DRAWS ATTENTION to the inserted information", examples: "The evidence—despite some controversy—supports the theory. / She finally decided—after months of deliberation—to accept the offer.", vs_parentheses: "Dashes emphasize | Parentheses downplay", keyboard: "Type two hyphens -- (often auto-converts to em dash)", note: "Use dashes for dramatic emphasis!" },

      { category: "En Dash (–) - Ranges and Connections", symbol: "En Dash (–) - kısa tire (medium length)", use: "Shows ranges, spans, or connections between words", examples: "The 2020–2021 academic year / Pages 45–67 / The New York–London flight / The pre–World War II era", rule: "No spaces around en dash in ranges", vs_hyphen: "En dash (–) for ranges | Hyphen (-) for compound words", note: "Think of en dash as 'to' or 'through'" },

      { category: "Parentheses ( ) - Supplementary Info", symbol: "Parentheses ( ) - parantez", use: "Adds supplementary, less important information", effect: "DOWNPLAYS the inserted information", examples: "The conference (held annually) attracts global experts. / The study (n=500) showed significant results.", punctuation: "Period goes OUTSIDE parentheses if sentence continues: (like this). But inside if complete sentence. (Like this.)", note: "Parentheses = 'by the way' information" },

      { category: "Ellipsis (...) - Omission", symbol: "Ellipsis (...) - üç nokta", use: "Shows words omitted from quotation or pause in thought", examples: "The report states that 'economic growth... remains uncertain.' / I was thinking... maybe we should reconsider.", rule: "Use three dots (...), or four if omitting end of sentence (....)", purpose: "In quotes: shows honest omission | In prose: shows hesitation", note: "Don't overuse ellipsis in formal writing!" },

      { category: "Quotation Marks - Direct Speech", double_quotes: "Use \"double quotes\" for direct speech (American English)", single_quotes: "Use 'single quotes' for quotes within quotes", examples: "She said, \"I'll consider the proposal carefully.\" / He asked, \"Did she say 'yes' or 'no'?\"", british_vs_american: "British English reverses this: single outer, double inner", punctuation: "Periods and commas go INSIDE quotes (American) / Colons and semicolons go OUTSIDE", note: "Follow style guide for your region!" },

      { category: "Quotation Marks - Titles and Irony", use_for_titles: "Short works: articles, poems, short stories, song titles, chapter titles", examples: "The article \"Climate Change\" appeared in Nature. / I read the poem \"The Road Not Taken.\"", use_for_irony: "Scare quotes show skepticism or irony", examples: "The so-called \"expert\" made several errors. / Their \"solution\" created more problems.", critical: "Don't overuse scare quotes - can seem sarcastic!", note: "Book titles, journals = italics | Articles, poems = quotes" },

      { category: "Apostrophe (') - Possession", symbol: "Apostrophe (') - kesme işareti", singular_possession: "Add 's to singular nouns: the student's book, James's car", plural_possession: "Add only ' if plural already ends in s: the students' books", irregular_plural: "Add 's if plural doesn't end in s: children's toys, women's rights", examples: "It's the student's responsibility. / The dogs' owner (multiple dogs) / The dog's owner (one dog)", critical: "Its = possessive (no apostrophe!) | It's = it is (with apostrophe!)", remember: "If you can say 'it is', use it's. Otherwise, use its." },

      { category: "Apostrophe (') - Contractions", use: "Shows missing letters in contractions", examples: "it's (it is), don't (do not), can't (cannot), won't (will not), they're (they are)", academic_writing: "Avoid contractions in formal academic writing!", spelling: "Write out full words: do not, cannot, will not", note: "Contractions = informal | Full words = formal" },

      { category: "Hyphen (-) - Compound Adjectives", symbol: "Hyphen (-) - kısa çizgi (shortest)", use: "Joins words in compound adjectives BEFORE nouns", examples: "She is a well-known author. / A 10-year-old child. / A state-of-the-art facility.", rule: "Hyphenate compound adjectives BEFORE noun, not after", compare: "well-known author (before noun) vs The author is well known (after noun, no hyphen)", note: "Hyphens prevent confusion: small-business owner vs small business owner" },

      { category: "Hyphen (-) - Numbers and Prefixes", numbers: "Hyphenate spelled-out numbers from twenty-one to ninety-nine", prefixes: "With prefixes before proper nouns: pre-COVID, anti-American, pro-European", examples: "Forty-five students attended. / The pre-2020 era. / An ex-president spoke.", note: "Most prefixes don't need hyphens unless before capitals" },

      { category: "Brackets [ ] - Clarification in Quotes", symbol: "Brackets [ ] - köşeli parantez", use: "Insert clarification, correction, or editorial note in quoted material", examples: "The author stated, 'This [phenomenon] is remarkable.' / 'He [the president] announced new policies.' / 'It happened in 1918 [sic].'", sic: "[sic] means 'thus' - shows error is in original, not your mistake", purpose: "Helps readers understand context without changing original quote", note: "Brackets = your words inserted into someone else's quote" },

      { category: "Common Mistakes - ITS vs IT'S", confusion: "Most common apostrophe error in English!", its_possessive: "ITS (no apostrophe) = possessive, belonging to it", its_contraction: "IT'S (with apostrophe) = it is OR it has", examples: "The dog wagged its tail. (possessive) / It's raining outside. (it is)", test: "Can you say 'it is'? → use IT'S. If not, use ITS.", remember: "Possessive pronouns NEVER have apostrophes: his, hers, its, ours, theirs" },

      { category: "Common Mistakes - Comma Splices", error: "Using comma alone to join two independent clauses", wrong: "She studied hard, she passed the exam ✗", correct_options: "She studied hard; she passed the exam. ✓ (semicolon) / She studied hard, and she passed the exam. ✓ (comma + conjunction) / She studied hard. She passed the exam. ✓ (two sentences)", rule: "Comma ALONE can't join independent clauses!", remember: "Use semicolon, period, or comma + conjunction" },

      { category: "Common Mistakes - Unnecessary Quotation Marks", error: "Using quotes for emphasis (wrong purpose!)", wrong: "Try our \"fresh\" fish ✗ (implies it's NOT actually fresh!)", correct: "Try our fresh fish ✓ (no quotes needed for emphasis)", use_italics: "Use italics or bold for emphasis, not quotes", note: "Quotes for irony imply opposite meaning - be careful!" },

      { category: "Remember", takeaway_1: "Semicolon (;) connects related independent clauses", takeaway_2: "Colon (:) introduces lists, explanations, examples", takeaway_3: "Em dash (—) emphasizes | Parentheses ( ) downplay", takeaway_4: "ITS = possessive (its tail) | IT'S = it is (it's raining)", takeaway_5: "Hyphenate compound adjectives BEFORE nouns: well-known author", final_note: "Mastering punctuation = clearer, more professional, more sophisticated writing!" }
    ]
  },

  speakingPractice: [
    { question: "When should you use a semicolon instead of a period?", answer: "Use a semicolon to connect two closely related independent clauses that could stand alone as sentences but are conceptually linked, showing their relationship without creating separate sentences." },
    { question: "What is the main function of a colon in writing?", answer: "A colon introduces information that explains, elaborates on, or lists items related to what comes before it, signaling that important details follow." },
    { question: "How do em dashes differ from parentheses?", answer: "Em dashes emphasize the inserted information and draw attention to it, while parentheses downplay the information as supplementary or less important to the main point." },
    { question: "When should you use single vs. double quotation marks?", answer: "In American English, double quotes are used for direct speech and titles, while single quotes appear within double quotes. In British English, this convention is reversed." },
    { question: "What is the difference between 'its' and 'it's'?", answer: "'Its' is the possessive form meaning 'belonging to it,' while 'it's' is a contraction of 'it is' or 'it has,' always requiring an apostrophe." },
    { question: "How do you punctuate a quote within a quote?", answer: "In American English, use double quotation marks for the outer quote and single marks for the inner quote: She said, 'He told me, \"I'll be there.\"'" },
    { question: "When should you use a hyphen to connect words?", answer: "Use hyphens in compound adjectives before nouns (well-known author), with prefixes before proper nouns (pre-COVID), and in spelled-out numbers twenty-one through ninety-nine." },
    { question: "What does an ellipsis indicate in quoted text?", answer: "An ellipsis shows that words have been omitted from the original quote, helping you shorten quotations while maintaining their essential meaning and indicating the omission honestly." },
    { question: "How do brackets function in quotations?", answer: "Brackets allow you to insert clarifying information, corrections, or changes into quoted material to help readers understand context without altering the original author's words." },
    { question: "What is the rule for comma placement with conjunctions?", answer: "Use a comma before coordinating conjunctions (and, but, or, nor, for, so, yet) when they connect two independent clauses, but omit it when connecting phrases or dependent clauses." }
  ]
};

// Module 227: Creative Writing Techniques
export const MODULE_227_DATA = {
  title: "Module 227 - Creative Writing Techniques",
  description: "Develop engaging narratives with vivid descriptions and literary devices",
  intro: `📘 Lesson Objectives
✅ Use sensory details to create vivid scenes
✅ Develop compelling characters and dialogue
✅ Apply metaphors, similes, and other literary devices
✅ Master narrative structure and pacing

**What Makes Writing Creative?**
Creative writing goes beyond conveying information—it evokes emotions, paints pictures in readers' minds, and creates memorable experiences through carefully chosen words and techniques.

**Key Techniques:**
• **Show, don't tell** – Demonstrate emotions through actions and sensory details rather than stating them directly
• **Sensory language** – Engage all five senses to immerse readers in the scene
• **Varied sentence structure** – Mix short, punchy sentences with longer, flowing ones for rhythm
• **Strong verbs** – Choose precise, vivid verbs instead of relying on adverbs
• **Dialogue that reveals** – Make conversations advance plot and reveal character
• **Literary devices** – Use metaphors, similes, personification, and symbolism
• **Pacing control** – Speed up action scenes, slow down emotional moments

**Story Elements:**
• **Hook** – Grab attention in the opening lines
• **Conflict** – Create tension that drives the narrative
• **Character arc** – Show how characters change and grow
• **Resolution** – Provide satisfying (not necessarily happy) endings
• **Theme** – Weave deeper meaning throughout the story`,

  table: {
    title: "📋 Creative Writing Techniques (Yaratıcı Yazma Teknikleri)",
    data: [
      { category: "Show, Don't Tell - The Golden Rule", tell_weak: "TELL (weak): She was nervous.", show_strong: "SHOW (strong): Her hands trembled as she reached for the doorknob. Sweat beaded on her forehead.", rule: "Demonstrate emotions through ACTIONS, SENSORY DETAILS, and BODY LANGUAGE instead of stating them", examples: "Tell: He was angry. ✗ / Show: His jaw clenched. His fists curled. ✓", critical: "Showing creates vivid scenes readers can experience!", remember: "Actions speak louder than adjectives!" },

      { category: "Sensory Language - Five Senses", sight: "Sight: colors, shapes, movements, expressions", sound: "Sound: whisper, thunder, crackle, silence", smell: "Smell: pine, smoke, perfume, decay", taste: "Taste: bitter, sweet, metallic, sour", touch: "Touch: rough, smooth, cold, sticky", purpose: "Engage ALL senses to immerse readers in the scene", examples: "The bitter coffee burned her tongue. / Pine needles crunched underfoot. / Smoke stung his eyes.", note: "Don't rely only on sight - use all five senses!" },

      { category: "Varied Sentence Structure - Rhythm", short_sentences: "Short sentences = tension, urgency, emphasis", examples_short: "He ran. The door slammed. Darkness.", long_sentences: "Long sentences = flowing, descriptive, contemplative", examples_long: "She wandered through the garden, pausing occasionally to admire the roses that climbed the weathered trellis, their petals still wet with morning dew.", mix: "MIX short and long for rhythm and impact!", critical: "All short = choppy | All long = monotonous | Mix = dynamic!", note: "Vary sentence length to control pacing" },

      { category: "Strong Verbs - Power Words", weak: "Weak verbs need adverbs: walked slowly, said quietly", strong: "Strong verbs stand alone: strolled, sauntered, whispered, murmured", examples: "Weak: He went quickly ✗ / Strong: He sprinted, dashed, bolted ✓ / Weak: She looked angrily ✗ / Strong: She glared, scowled ✓", rule: "Choose PRECISE, VIVID verbs instead of generic verb + adverb", list: "Instead of: said → whispered, shouted, muttered, gasped / Instead of: walked → strode, crept, staggered, marched", remember: "One strong verb > verb + adverb!" },

      { category: "Dialogue - Revealing Character", what_not_to_do: "Don't info-dump: 'As you know, Bob, we've been friends for 20 years...' ✗", what_to_do: "Reveal character, advance plot, create tension", natural: "People interrupt, use contractions, have speech patterns", examples: "'You coming?' he asked. (casual) vs 'Are you attending?' she inquired. (formal) / 'I... I don't know,' she stammered. (nervous)", subtext: "What's NOT said is often more important than what IS said", note: "Dialogue should sound NATURAL, not like a speech!" },

      { category: "Dialogue Tags - Said is Not Dead", simple: "'Said' and 'asked' are often best - they're invisible", avoid: "Avoid fancy tags: exclaimed, ejaculated, pontificated", wrong: "'I'm leaving,' she hissed. (can't hiss words without S!) ✗", good: "'I'm leaving,' she said coldly. ✓", action_beats: "Or use action beats: 'I'm leaving.' She grabbed her coat.", note: "'Said' doesn't draw attention away from dialogue itself!" },

      { category: "Literary Device - Metaphor", what: "States one thing IS another (direct comparison)", examples: "Her smile was sunshine. / Time is money. / The world is a stage.", effect: "Creates strong, memorable images", vs_simile: "Metaphor: Her smile was sunshine | Simile: Her smile was like sunshine", turkish: "Metafor - dolaylı benzetme", note: "Metaphors are more powerful than similes!" },

      { category: "Literary Device - Simile", what: "Compares using 'like' or 'as'", examples: "Her smile was like sunshine. / He fought like a lion. / She runs as fast as the wind.", effect: "Makes comparisons clear and vivid", common_phrases: "Busy as a bee / Cold as ice / Strong as an ox", turkish: "Benzetme - 'gibi' veya 'kadar' ile", note: "Similes make abstract concepts concrete!" },

      { category: "Literary Device - Personification", what: "Gives human qualities to non-human things", examples: "The wind whispered through the trees. / Time marches on. / The sun smiled down.", effect: "Makes descriptions more vivid and relatable", turkish: "Kişileştirme", note: "Personification brings the world to life!" },

      { category: "Literary Device - Alliteration", what: "Repetition of initial consonant sounds", examples: "Peter Piper picked... / She sells seashells... / The fair breeze blew, the white foam flew.", effect: "Creates rhythm, emphasis, memorability", purpose: "Makes phrases musical and memorable", note: "Use sparingly - too much seems childish!" },

      { category: "Literary Device - Foreshadowing", what: "Hints about future events", examples: "The clouds darkened. (storm coming) / She touched the knife absently. (will use it later) / 'This will end badly,' he muttered.", effect: "Creates anticipation, builds tension", subtle: "Best foreshadowing is subtle - readers notice on reread", note: "Plant seeds early that pay off later!" },

      { category: "Pacing - Speed Up Action", techniques: "Short sentences, active verbs, present tense feel, minimal description", examples: "He ran. Footsteps behind. Closer. Turn left. Dead end.", purpose: "Creates urgency and tension during action scenes", avoid: "Don't slow down with long descriptions during action!", note: "Action = quick pacing, short sentences!" },

      { category: "Pacing - Slow for Emotion", techniques: "Longer sentences, sensory details, internal thoughts, descriptive language", examples: "She sat by the window, watching raindrops trace lazy paths down the glass, each one a small world unto itself, and she wondered if anyone else felt as alone as she did in that moment.", purpose: "Allows readers to feel emotional weight", note: "Emotional moments need space to breathe!" },

      { category: "Hook - Grabbing Attention", what: "Opening lines that make readers want more", techniques: "Start with action, intriguing question, vivid scene, surprising statement, compelling voice", examples: "It was a bright cold day in April, and the clocks were striking thirteen. (1984) / The sky above the port was the color of television, tuned to a dead channel. (Neuromancer)", avoid: "Don't start with waking up, weather descriptions, or backstory", critical: "First sentence is the most important!", note: "Hook readers or lose them!" },

      { category: "Conflict - The Engine of Story", what: "Problems, obstacles, and tensions that drive narrative", types: "Character vs Character | Character vs Self | Character vs Society | Character vs Nature | Character vs Technology", examples: "Romeo vs Juliet's families / Hamlet vs his indecision / Winston vs Big Brother", no_conflict: "No conflict = no story!", escalate: "Conflict should escalate throughout the story", note: "Readers read to see characters overcome obstacles!" },

      { category: "Character Arc - Growth and Change", what: "How character transforms from beginning to end", positive_arc: "Positive: Character grows, learns, overcomes flaw", negative_arc: "Negative: Character descends, fails, corruption", flat_arc: "Flat: Character stays same, but changes world around them", examples: "Ebenezer Scrooge: miserly → generous (positive) / Walter White: teacher → criminal (negative) / Superman: always heroic (flat)", critical: "Characters who don't change are boring!", note: "Arc = the character's journey of transformation" },

      { category: "Resolution - Satisfying Endings", what: "How conflicts are resolved (not necessarily happily!)", satisfying: "Satisfying ending ties up major threads, feels earned", unsatisfying: "Unsatisfying: deus ex machina, everything a dream, sudden fix", examples: "Good: Harry defeats Voldemort after 7 books of preparation / Bad: And then he woke up. It was all a dream.", ambiguous: "Ambiguous endings can work if thematically appropriate", note: "Ending doesn't have to be happy, just satisfying!" },

      { category: "Theme - Deeper Meaning", what: "Universal human truth or message woven throughout story", examples: "Love conquers all / Power corrupts / Coming of age / Good vs evil / Sacrifice", how_to_weave: "Don't state theme directly - show through plot, character actions, symbols", subtle: "Best themes emerge naturally, not forced", examples_story: "The Great Gatsby: American Dream corrupted / 1984: dangers of totalitarianism / To Kill a Mockingbird: racial injustice", note: "Theme gives story depth and resonance!" },

      { category: "Point of View (POV) - Narrative Perspective", first_person: "First Person (I): intimate, limited perspective", examples_first: "'I walked into the room. I felt nervous.'", third_limited: "Third Limited (he/she): follows one character's thoughts", examples_third_limited: "'She walked into the room. She felt nervous.'", third_omniscient: "Third Omniscient: knows all characters' thoughts", examples_omniscient: "'She walked into the room, unaware that he was watching from the shadows, planning his next move.'", note: "Choose POV based on story needs!" },

      { category: "Remember", takeaway_1: "Show, don't tell - demonstrate emotions through actions and sensory details", takeaway_2: "Engage all five senses to immerse readers in the scene", takeaway_3: "Vary sentence length for rhythm: short = tension | long = flowing", takeaway_4: "Strong verbs > weak verb + adverb (sprinted > walked quickly)", takeaway_5: "Dialogue should reveal character, advance plot, and sound natural", final_note: "Great creative writing combines all these techniques to transport readers into vivid, memorable worlds!" }
    ]
  },

  speakingPractice: [
    { question: "What does 'show, don't tell' mean in creative writing?", answer: "'Show, don't tell' means demonstrating emotions and situations through specific actions, sensory details, and dialogue rather than simply stating facts—for example, showing a character's nervousness through trembling hands rather than saying 'She was nervous.'" },
    { question: "How can sensory details improve your writing?", answer: "Sensory details engage readers' senses—sight, sound, smell, taste, and touch—making scenes more immersive and memorable by helping readers experience the story rather than just read about it." },
    { question: "What is the difference between a metaphor and a simile?", answer: "A simile compares two things using 'like' or 'as' ('Her smile was like sunshine'), while a metaphor directly states one thing is another ('Her smile was sunshine'), creating a stronger, more direct comparison." },
    { question: "Why is dialogue important in creative writing?", answer: "Dialogue reveals character personalities, advances the plot, breaks up narrative exposition, creates rhythm, and makes stories feel more immediate and authentic by showing rather than telling." },
    { question: "How do you create a compelling character?", answer: "Create compelling characters by giving them clear motivations, flaws, contradictions, distinctive voices, meaningful backstories, and opportunities to grow and change throughout the story." },
    { question: "What is narrative pacing and why does it matter?", answer: "Narrative pacing is the speed at which a story unfolds. Varying pace—accelerating during action, slowing for reflection—maintains reader engagement and emphasizes important moments." },
    { question: "How can you create tension in a story?", answer: "Create tension through conflict, unanswered questions, ticking clocks, high stakes, obstacles to characters' goals, and by withholding information that readers want to know." },
    { question: "What makes a strong opening hook?", answer: "A strong hook immediately engages readers through intriguing questions, dramatic action, vivid scenes, surprising statements, or compelling voice—anything that makes readers want to continue." },
    { question: "How do you develop a character's voice?", answer: "Develop voice through distinctive word choice, sentence patterns, verbal tics, cultural background, education level, and personality traits that come through consistently in dialogue and thought." },
    { question: "What is the role of theme in creative writing?", answer: "Theme is the underlying message or central idea that gives a story deeper meaning, exploring universal human experiences and truths that resonate beyond the specific plot events." }
  ]
};

// Module 228: Advanced Note-Taking Strategies
export const MODULE_228_DATA = {
  title: "Module 228 - Advanced Note-Taking Strategies",
  description: "Master efficient note-taking methods for lectures and reading",
  intro: `📘 Lesson Objectives
✅ Apply the Cornell Method for structured notes
✅ Use mind mapping for visual learners
✅ Master the Outline Method for hierarchical information
✅ Develop personalized note-taking symbols and abbreviations

**Why Effective Note-Taking Matters:**
Good notes capture key information efficiently, aid memory retention, facilitate review, and create valuable study resources. The right method depends on the content type and your learning style.

**Note-Taking Methods:**

**1. Cornell Method**
• Divide page into three sections: notes, cues, and summary
• Take notes in main section during lecture
• Add questions/keywords in cue column afterward
• Write brief summary at bottom
• Best for: Lectures, textbook reading

**2. Mind Mapping**
• Central concept in the middle
• Branch out with related ideas
• Use colors, symbols, and images
• Shows relationships visually
• Best for: Brainstorming, complex topics with many connections

**3. Outline Method**
• Hierarchical structure with main points and subpoints
• Use Roman numerals, letters, and numbers
• Indent to show relationships
• Linear and organized
• Best for: Well-structured lectures, organized content

**4. Charting Method**
• Create columns for different categories
• Fill in information as you go
• Easy to compare and contrast
• Best for: Data-heavy subjects, comparing theories

**5. Sentence Method**
• Write every new thought on a new line
• Number each line
• Fast but requires more review time
• Best for: Fast-paced lectures, dense information`,

  table: {
    title: "📋 Advanced Note-Taking Strategies (İleri Not Alma Stratejileri)",
    data: [
      { category: "Why Note-Taking Matters", encoding: "Encoding: Writing helps encode information into memory", retrieval: "Retrieval: Notes create external memory for review", organization: "Organization: Structured notes reveal relationships between ideas", engagement: "Engagement: Active note-taking keeps you focused", critical: "Good notes = better learning and retention!", note: "The right method depends on content type and learning style" },

      { category: "Cornell Method - Structure", what: "Divide page into 3 sections: notes, cues, summary", notes_area: "Main Notes (right, 70%): Take notes during lecture", cue_column: "Cue Column (left, 30%): Add questions/keywords after", summary_area: "Summary (bottom): Write brief overview after lecture", when: "Best for: Lectures, textbook reading, systematic review", benefit: "Forces you to review and process information twice!", note: "Most popular method for academic success" },

      { category: "Cornell Method - How to Use", during_lecture: "During: Take notes in main area, leave cue column blank", after_lecture: "After (within 24 hours): Add questions and key terms in cue column", review: "Review: Cover notes, try to answer cue questions from memory", summary_step: "Summary: Write 3-5 sentence overview at bottom", examples: "Cue: 'What is photosynthesis?' | Notes: 'Process by which plants...' | Summary: 'Photosynthesis converts light to energy...'", note: "This method builds in spaced repetition!" },

      { category: "Mind Mapping - Visual Learning", what: "Central concept in middle, branches radiating outward", structure: "Main topic → Major themes → Supporting details → Examples", visual: "Use colors, symbols, images, and spatial layout", connections: "Draw lines showing relationships between ideas", when: "Best for: Brainstorming, visual learners, complex topics with many connections", benefit: "Shows the big picture and relationships!", note: "Especially effective for creative subjects" },

      { category: "Mind Mapping - How to Create", center: "1. Write main topic in center circle", branches: "2. Draw thick branches for main themes", sub_branches: "3. Add thinner branches for supporting details", keywords: "4. Use keywords (not sentences) on each branch", enhance: "5. Add colors, symbols, images to make memorable", examples: "Topic: Climate Change → Branches: Causes, Effects, Solutions → Sub: Fossil fuels, Temperature rise, Renewable energy", note: "The visual nature aids memory retention!" },

      { category: "Outline Method - Hierarchical", what: "Hierarchical structure with main points and subpoints", format: "I. Main Point → A. Subpoint → 1. Detail → a. Example", linear: "Linear, organized, easy to follow", indentation: "Indentation shows relationships between ideas", when: "Best for: Well-structured lectures, organized content, traditional learners", benefit: "Clear hierarchy makes studying easier!", note: "Works well with textbook chapters" },

      { category: "Outline Method - Formatting", level_1: "I. Roman numerals for main topics", level_2: "  A. Capital letters for major points", level_3: "    1. Numbers for supporting details", level_4: "      a. Lowercase letters for examples", examples: "I. Photosynthesis → A. Light reactions → 1. Chlorophyll absorbs light → a. Example: Green plants", consistency: "Be consistent with formatting throughout!", note: "This method is very organized and clear" },

      { category: "Charting Method - Comparison", what: "Create columns for different categories, fill in rows", structure: "Categories as column headers, topics as rows", compare: "Easy to compare and contrast information side-by-side", when: "Best for: Data-heavy subjects, comparing theories, languages, history dates", examples: "Columns: Theory | Founder | Main Idea | Criticism | Example → Fill in rows for each theory", benefit: "Visual comparison reveals patterns!", note: "Perfect for studying for multiple-choice tests" },

      { category: "Charting Method - Example", example_columns: "Author | Year | Main Argument | Evidence | Strengths | Weaknesses", example_rows: "Fill in one row per reading/study", use_case: "Comparing research studies, historical events, literary works", advantage: "All information organized in one place for easy reference!", note: "Makes essay writing much easier!" },

      { category: "Sentence Method - Fast Capture", what: "Write every new thought, fact, or topic on a new line", numbering: "Number each line sequentially", speed: "Very fast - capture everything without organizing", when: "Best for: Fast-paced lectures, dense information, when instructor jumps around", drawback: "Requires more review time to organize later", benefit: "Ensures you don't miss important information!", note: "Good for capturing, but needs post-processing" },

      { category: "Abbreviations & Symbols - Speed Writing", common: "w/ = with | w/o = without | b/c = because | b/t = between | → = leads to, causes | ← = comes from | ↑ = increases | ↓ = decreases", academic: "e.g. = for example | i.e. = that is | etc. = and so on | vs = versus | cf. = compare", custom: "Create your own: info = information | govt = government | imp = important", symbols: "* = important | ? = unclear, ask later | ! = surprising | # = number | @ = at", note: "Abbreviations double your writing speed!" },

      { category: "Color Coding System", system_1: "One color per topic/theme throughout notes", system_2: "Red = definitions | Blue = examples | Green = important | Yellow = review", system_3: "Highlight after lecture to identify key concepts", benefits: "Aids visual memory, quick location of information, makes studying engaging", when_to_apply: "After lecture, not during (slows you down)", note: "Choose a system and stick with it consistently!" },

      { category: "Active Listening While Note-Taking", listen_first: "Listen to understand BEFORE writing", key_points: "Focus on main ideas, not every word", cues: "Listen for verbal cues: 'importantly', 'in summary', 'three reasons'", pauses: "Use instructor pauses to catch up on notes", questions: "Note your own questions to ask later", critical: "Can't write everything - prioritize!", note: "Better to understand than to copy blindly" },

      { category: "Review & Revise - Within 24 Hours", timing: "Review notes within 24 hours while fresh in memory", fill_gaps: "Fill in gaps, clarify unclear points, add examples", reorganize: "Reorganize if needed, add headings and structure", connect: "Connect to previous knowledge and other classes", summarize: "Write summary or teach concept to someone", critical: "This step moves information from short-term to long-term memory!", note: "Reviewing is MORE important than taking notes!" },

      { category: "Digital vs Paper Notes", paper_benefits: "Better retention, fewer distractions, flexibility for diagrams", digital_benefits: "Easy to search, reorganize, sync across devices, add multimedia", hybrid: "Many use paper during class, digitize + enhance later", recommendation: "Use whatever works for YOU - consistency matters more than medium", apps: "Digital: OneNote, Notion, Evernote, Google Docs, iPad with Apple Pencil", note: "Research shows handwriting aids memory more than typing" },

      { category: "Common Mistakes - Writing Everything", error: "Trying to write every word the instructor says", problem: "Can't keep up, miss main ideas, no time to think", solution: "Focus on concepts, examples, and connections - not verbatim transcription", listen_more: "Listen MORE, write LESS - prioritize understanding", note: "Notes are for learning, not courtroom stenography!" },

      { category: "Common Mistakes - No Review", error: "Taking notes but never reviewing them", problem: "Information fades, notes become meaningless", solution: "Review within 24 hours, then weekly, then before exams", spaced_repetition: "Use spaced repetition: 1 day, 1 week, 1 month, before exam", critical: "Notes without review = wasted time!", note: "The review is where learning actually happens" },

      { category: "Common Mistakes - No Organization", error: "Messy, unstructured notes with no system", problem: "Can't find information, don't see connections", solution: "Choose a method (Cornell, Outline, etc.) and stick with it", consistency: "Use same format for all classes in that subject", headings: "Always include: date, topic, page numbers", note: "Organization = findability = usability" },

      { category: "Remember", takeaway_1: "Cornell Method = systematic 3-section layout (notes, cues, summary)", takeaway_2: "Mind Mapping = visual with central topic and radiating branches", takeaway_3: "Outline Method = hierarchical with Roman numerals and indentation", takeaway_4: "Review within 24 hours - this is when real learning happens!", takeaway_5: "Use abbreviations and symbols to write faster", final_note: "The best note-taking method is the one YOU will actually use consistently - experiment and find what works for your learning style!" }
    ]
  },

  speakingPractice: [
    { question: "What are the three sections of the Cornell Method?", answer: "The Cornell Method divides the page into three sections: the main notes area for recording information, the cue column for questions and keywords, and the summary section at the bottom for brief overviews." },
    { question: "When is mind mapping most effective?", answer: "Mind mapping is most effective for brainstorming, understanding relationships between concepts, visualizing complex topics with multiple connections, and for visual learners who benefit from spatial organization." },
    { question: "How does the Outline Method help organize information?", answer: "The Outline Method uses hierarchical structure with main points and indented subpoints, making it easy to see relationships between ideas and distinguish between major concepts and supporting details." },
    { question: "What are the advantages of creating your own abbreviations?", answer: "Personal abbreviations increase note-taking speed, reduce hand fatigue, allow you to capture more information quickly, and work better than standard abbreviations because you design them for your specific needs." },
    { question: "Why should you review and revise notes soon after taking them?", answer: "Reviewing notes within 24 hours reinforces memory, allows you to fill in gaps while the lecture is fresh, helps you identify unclear areas, and moves information from short-term to long-term memory." },
    { question: "How can color coding enhance your notes?", answer: "Color coding helps categorize information, highlights important concepts, makes notes more visually appealing, aids memory through visual associations, and helps you quickly locate specific types of information during review." },
    { question: "What is the Charting Method best used for?", answer: "The Charting Method works best for content that involves comparisons, data-heavy subjects, multiple theories or perspectives, or any material that can be organized into clear categories for easy reference." },
    { question: "How do you decide which note-taking method to use?", answer: "Choose based on the content type, your learning style, the pace of information delivery, and the subject—lectures may need Cornell or Outline, while brainstorming suits mind maps." },
    { question: "Why is it important to write summaries of your notes?", answer: "Summaries force you to process and synthesize information, identify main ideas, understand connections, and create concise review materials that capture essential points without overwhelming detail." },
    { question: "What are some effective symbols for note-taking?", answer: "Common symbols include arrows for cause/effect (→), asterisks for importance (*), question marks for unclear points (?), plus signs for advantages (+), and abbreviations like w/ (with), b/c (because), and info (information)." }
  ]
};

// Module 229: Language for Leadership
export const MODULE_229_DATA = {
  title: "Module 229 - Language for Leadership",
  description: "Use language that inspires, motivates, and guides teams effectively",
  intro: `📘 Lesson Objectives
✅ Communicate vision and goals clearly
✅ Give constructive feedback diplomatically
✅ Motivate and inspire team members
✅ Facilitate meetings and discussions effectively

**Leadership Communication:**
Effective leaders communicate with clarity, empathy, and authority. They inspire action, build trust, and create environments where teams thrive through strategic language choices.

**Key Leadership Language Skills:**
• **Vision casting** – Paint compelling pictures of future success
• **Active listening** – Show genuine interest and understanding
• **Inclusive language** – Make everyone feel valued and heard
• **Constructive feedback** – Guide improvement without discouragement
• **Decisive language** – Communicate confidence in decisions
• **Empowering language** – Give autonomy and build confidence

**Situational Leadership Phrases:**`,

  table: {
    title: "📋 Language for Leadership (Liderlik için Dil)",
    data: [
      { category: "What Makes Leadership Communication Different?", balance: "Balances authority with empathy and approachability", impact: "Every word impacts team morale, motivation, and culture", authenticity: "Inspires action while remaining genuine and trustworthy", inclusion: "Makes decisive statements while encouraging input", critical: "Leaders' words carry extra weight and responsibility!", note: "Strategic language choices build or break teams" },

      { category: "Vision Casting - Painting the Future", what: "Articulating compelling future state that inspires alignment", techniques: "Use vivid imagery, emotional language, concrete details", examples: "'Imagine a workplace where...', 'Picture this: by next year...', 'Our goal is to become...'", purpose: "Motivate people toward shared goals with clear direction", avoid: "Vague statements: 'We want to be better' ✗ → 'We will increase customer satisfaction to 95% by Q4' ✓", note: "Great vision = specific + inspiring + achievable!" },

      { category: "Delegating Tasks - Empowering Language", empower: "I'd like you to take the lead on this project. I trust your judgment on the approach.", confidence: "You're the perfect person for this. I have full confidence in your abilities.", ownership: "This is your project - you decide how to approach it. I'm here if you need me.", avoid: "Don't micromanage: 'Do it exactly this way' ✗ → 'Here's the goal; I trust you to figure out the best approach' ✓", note: "Delegation = trust + autonomy, not just assigning tasks!" },

      { category: "Giving Feedback - The Sandwich Method", start_positive: "Start with genuine appreciation or specific strength", address_issue: "Describe specific behavior (not personality) needing improvement", end_constructive: "End with support, resources, and confidence in improvement", example: "'I appreciate your effort. Let's discuss how to refine the approach for better results. I know you can excel at this.'", avoid: "Don't just criticize: 'This is wrong' ✗ → 'I see potential here. Let's explore how to strengthen X' ✓", note: "Feedback should guide, not discourage!" },

      { category: "Motivating Team Members", recognize: "Your contributions have been invaluable. The team notices your dedication.", challenge: "This next challenge is perfect for your skills. I know you'll rise to it.", progress: "Look how far you've come since starting. You've made remarkable progress.", personal: "Tailor motivation to individual: Some want public recognition, others prefer private acknowledgment", avoid: "Generic praise: 'Good job' ✗ → 'Your analysis in yesterday's meeting was insightful and changed our approach' ✓", note: "Specific recognition > vague praise!" },

      { category: "Setting Expectations - Clarity", clear: "To succeed here, we need clear communication, accountability, and collaborative problem-solving.", specific: "I expect weekly updates every Friday by 5 PM. Questions answered within 24 hours.", why: "Always explain WHY: 'We do this because...' helps people understand context", consequences: "Be clear about outcomes: 'If we achieve this, then... / If not, then...'", avoid: "Vague: 'Try your best' ✗ → 'I need this completed by Thursday with these three deliverables' ✓", note: "Clear expectations prevent misunderstandings!" },

      { category: "Addressing Conflict - Mediating", acknowledge: "I understand there are different perspectives here. Both viewpoints have merit.", common_ground: "Let's explore what we all agree on first, then address the areas where we differ.", focus: "Our shared goal is X. How can we work toward that together?", neutral: "Stay neutral: 'I hear both sides' not 'I agree with Person A'", reframe: "Reframe as problem-solving: 'How do we solve this?' not 'Who's right?'", note: "Good leaders mediate, don't take sides!" },

      { category: "Acknowledging Effort - Recognition", specific: "I recognize the long hours you've invested. Your dedication hasn't gone unnoticed.", timely: "Acknowledge effort immediately, not months later", public_private: "Public recognition for team wins, private for individual effort (unless they prefer public)", impact: "Your work on X directly led to Y success. That matters.", avoid: "Empty praise: 'Thanks' ✗ → 'Thank you for staying late to finish the report. It helped us meet the deadline' ✓", note: "People remember how you made them feel!" },

      { category: "Encouraging Innovation - Risk-Taking", permission: "Don't be afraid to challenge assumptions. I'm interested in your fresh perspectives on this.", safety: "It's okay to fail here. We learn more from experiments than from playing it safe.", questions: "What if we tried...? / Have you considered...? / I'm curious about your thoughts on...", celebrate: "Even if this idea doesn't work, I appreciate the creative thinking!", avoid: "Shutting down: 'That won't work' ✗ → 'Interesting idea! Let's explore pros and cons' ✓", note: "Innovation needs psychological safety!" },

      { category: "Building Consensus - Inclusive Decision-Making", inclusive: "Let's explore what we all agree on first, then address the areas where we differ.", invite: "I want to hear from everyone before deciding. Sarah, what's your perspective?", synthesize: "I'm hearing three main viewpoints: A, B, and C. Let's see if we can find middle ground.", acknowledge: "Even if we can't implement your idea now, I value your input and will revisit it.", patience: "Consensus takes time but builds commitment", note: "People support what they help create!" },

      { category: "Making Decisions - Decisive Leadership", decisive: "After considering everyone's input, I've decided we'll proceed with option B because...", explain: "Always give reasoning: 'Here's why...' helps people understand even if they disagree", own_it: "This is my decision. I take responsibility for the outcome.", timely: "Make decisions promptly - indecision is demotivating", revisit: "If new information emerges, I'm willing to reconsider.", note: "Explain reasoning, but don't over-justify!" },

      { category: "Managing Change - Supporting Transition", empathy: "I know this transition is challenging. Change is difficult, and your concerns are valid.", support: "Here's how we'll support you through this process: training, resources, time...", communication: "I'll keep you updated every step of the way. No surprises.", involvement: "Your input will shape how we implement this. Tell me your concerns.", timeline: "Here's the timeline and milestones. We're taking this step-by-step.", note: "Acknowledge difficulty while providing clarity and support!" },

      { category: "Active Listening - Showing You Care", paraphrase: "So what I'm hearing is... [paraphrase]. Do I understand correctly?", ask: "Tell me more about that. / Help me understand your perspective. / What concerns you most?", body_language: "Maintain eye contact, nod, lean forward, put phone away", don't_interrupt: "Let people finish. Don't formulate response while they're talking.", validate: "That's a valid concern. / I can see why you'd feel that way. / Thank you for sharing that.", note: "People don't care what you know until they know you care!" },

      { category: "Admitting Uncertainty - Authentic Leadership", honest: "I don't know, but I'll find out and get back to you by Friday.", model: "Models humility and honesty for team", consult: "That's a great question. Let me consult with the team and research this.", learn: "I'm still learning about this area. Who here has expertise?", avoid: "Bluffing: Making up answers erodes trust faster than admitting ignorance", note: "Honesty > false confidence!" },

      { category: "Inclusive Language - WE vs I", we_not_i: "Use 'we' for successes, 'I' for failures", examples: "'WE achieved this goal' (not 'I led the team to success') / 'I take responsibility for this mistake' (not 'The team failed')", belonging: "Creates sense of shared purpose and collective ownership", avoid: "'I did this' when team was involved ✗ → 'We accomplished this together' ✓", note: "Great leaders share credit, take blame!" },

      { category: "Difficult Conversations - Courageous Communication", direct: "Be direct but kind. Don't hint - say what needs to be said.", prepare: "Plan key points, anticipate reactions, choose right time and place", private: "Always give criticism privately, never publicly embarrass", specific: "Talk about specific behaviors, not character: 'When you miss deadlines...' not 'You're irresponsible'", follow_up: "Check in afterward: 'How are you feeling about our conversation?'", note: "Avoiding hard conversations makes problems worse!" },

      { category: "Meeting Facilitation - Productive Discussions", agenda: "Share agenda beforehand: 'Today we'll cover A, B, and C. Goal is to decide X by end.'", timekeeping: "Keep on track: 'That's important, but let's table it for now and stay focused on today's agenda.'", participation: "Draw out quiet voices: 'Jamie, I'd love to hear your thoughts on this.'", summarize: "Recap decisions: 'So we've agreed to X, Y needs more research, and Z will happen next week.'", action_items: "End with clear action items: 'Sarah will do X by Friday, John will follow up on Y'", note: "Good meetings have clear outcomes!" },

      { category: "Common Mistakes - Using Jargon", error: "Using too much business jargon or acronyms", problem: "Creates confusion, excludes people, seems pretentious", examples: "Avoid: 'We need to synergize our core competencies to leverage vertical integration' ✗", better: "Say: 'Let's work together to improve our processes' ✓", solution: "Speak clearly and accessibly. Explain acronyms.", note: "Clarity > sounding smart!" },

      { category: "Common Mistakes - Not Listening", error: "Talking too much, not listening enough", problem: "Miss important information, people feel unheard, bad decisions", solution: "Listen MORE than you talk. Ask questions. Pause before responding.", ratio: "Aim for 70% listening, 30% talking in conversations", note: "You have two ears and one mouth - use them proportionally!" },

      { category: "Remember", takeaway_1: "Vision casting = specific + inspiring + achievable future", takeaway_2: "Feedback = appreciation + specific issue + support", takeaway_3: "Use 'WE' for successes, 'I' for failures - share credit, take blame", takeaway_4: "Active listening > talking - understand before being understood", takeaway_5: "Admit when you don't know - builds trust more than bluffing", final_note: "Leadership communication is about inspiring, supporting, and empowering others - your words create the culture!" }
    ]
  },

  speakingPractice: [
    { question: "What makes leadership communication different from regular communication?", answer: "Leadership communication requires balancing authority with empathy, inspiring action while remaining authentic, making decisive statements while encouraging input, and always considering how words impact team morale and motivation." },
    { question: "How can a leader give constructive feedback without demotivating someone?", answer: "Start with genuine appreciation, describe specific observations rather than judgments, focus on behavior not personality, offer support and resources, and collaborate on solutions rather than simply pointing out problems." },
    { question: "Why is active listening important for leaders?", answer: "Active listening builds trust, shows respect for team members' perspectives, uncovers important information others might hesitate to share, demonstrates humility, and helps leaders make better-informed decisions." },
    { question: "What is 'vision casting' in leadership?", answer: "Vision casting is articulating a compelling future state that inspires and aligns team members, painting a vivid picture of where the organization is heading and why it matters, motivating people toward shared goals." },
    { question: "How should a leader handle disagreement in a meeting?", answer: "Acknowledge different perspectives respectfully, find common ground, focus on shared goals, ask clarifying questions to understand concerns, and guide the discussion toward constructive solutions rather than winning arguments." },
    { question: "What does 'empowering language' mean in leadership?", answer: "Empowering language gives people autonomy, expresses confidence in their abilities, frames challenges as opportunities for growth, avoids micromanaging, and encourages ownership of outcomes." },
    { question: "How can leaders use language to build team cohesion?", answer: "Use inclusive pronouns (we, our), celebrate collective achievements, acknowledge individual contributions, create shared vocabulary and values, and consistently reinforce the idea that everyone's role matters." },
    { question: "What should a leader say when they don't have an answer?", answer: "Honest leaders say 'I don't know, but I'll find out' or 'That's a great question—let me research that and get back to you,' which builds trust more than pretending to have all answers." },
    { question: "How do you communicate difficult decisions as a leader?", answer: "Be direct and honest, explain the reasoning behind the decision, acknowledge its impact, show empathy for those affected, outline support measures, and remain available for questions and concerns." },
    { question: "Why should leaders avoid using jargon with their teams?", answer: "Jargon creates confusion, excludes team members unfamiliar with terms, can appear pretentious, hinders clear understanding, and prevents effective communication—leaders should prioritize clarity and accessibility." }
  ]
};

// Module 230: Negotiation Skills Language
export const MODULE_230_DATA = {
  title: "Module 230 - Negotiation Skills Language",
  description: "Master persuasive language for successful negotiations",
  intro: `📘 Lesson Objectives
✅ Use persuasive language ethically
✅ Make and respond to offers diplomatically
✅ Find common ground and build win-win solutions
✅ Handle objections and difficult situations

**The Art of Negotiation:**
Effective negotiation requires strategic language that builds rapport, demonstrates value, addresses concerns, and moves both parties toward mutually beneficial agreements.

**Negotiation Language by Category:**`,

  table: {
    title: "📋 Negotiation Skills Language (Müzakere Becerileri Dili)",
    data: [
      { category: "Core Principle - Interests vs Positions", position: "Position = what you say you want ('I want $100,000')", interest: "Interest = why you want it ('I need financial security for my family')", strategy: "Focus on underlying interests, not rigid positions", why: "Interests offer flexibility, positions create deadlock", examples: "Position: 'I won't accept less than X' | Interest: 'I need to cover costs and make reasonable profit'", note: "Win-win solutions come from understanding interests!" },

      { category: "Opening Statements - Setting Tone", collaborative: "I'm looking forward to finding a solution that works for both of us.", optimistic: "I'm confident we can reach an agreement that benefits everyone involved.", acknowledge: "I appreciate the opportunity to discuss this with you today.", avoid: "Don't start adversarially: 'I'm here to get what I deserve' ✗", good: "Start cooperatively: 'Let's explore how we can both achieve our goals' ✓", note: "First impression sets negotiation tone!" },

      { category: "Establishing Value - Building Your Case", demonstrate: "What makes this particularly valuable is the long-term cost savings you'll realize.", quantify: "Our solution will save you approximately 30% over three years compared to alternatives.", unique: "Unlike our competitors, we offer X, which addresses your specific concern about Y.", avoid: "Don't just claim value: 'This is great' ✗ → Prove it with data: 'This reduces costs by 30%' ✓", note: "Value must be specific and relevant to THEIR needs!" },

      { category: "Making Offers - Proposing Terms", clear: "I'd like to propose the following terms: We'll provide X in exchange for Y.", structured: "My proposal is: First, ... Second, ... Third, ...", rationale: "I'm suggesting this because it addresses your concern about Z while meeting our needs for W.", leave_room: "Make first offer slightly better than your minimum - leave negotiation space!", examples: "'I propose $95,000 with these terms...' (leaves room to negotiate down to $90k minimum)", note: "First offer anchors negotiation!" },

      { category: "Conditional Language - If/Then Structures", structure: "If you can [concession], we could [reciprocal benefit].", examples: "If you can commit to a longer contract, we could offer a more competitive rate. / If you increase the order size to 500 units, we could reduce the per-unit cost by 15%.", power: "Links concessions without committing unilaterally", flexibility: "Explores trade-offs without binding yourself", note: "'If-then' lets you test proposals safely!" },

      { category: "Handling Objections - Acknowledging Concerns", acknowledge: "I understand your concern about the timeline. That's a valid point.", explore: "Let's explore how we might address that. What if we...?", reframe: "I hear you're worried about X. Another way to look at it is...", dont_dismiss: "Don't say: 'That's not a problem' ✗ → Say: 'I understand why that concerns you. Let's find a solution' ✓", note: "Validate before solving!" },

      { category: "Seeking Concessions - Trading Value", polite: "Would you be willing to consider adjusting the payment terms if we expedite delivery?", reciprocal: "If we can move on price, could you be flexible on the timeline?", explore: "What would it take for you to agree to X?", never_free: "Never give concessions without getting something back!", examples: "'We can do X, but we'd need Y in return' (always trade, never just give)", note: "Every concession should have a reciprocal!" },

      { category: "Building on Agreement - Finding Common Ground", emphasize: "Since we agree on the main framework, let's work through these remaining details.", momentum: "We've made great progress on A, B, and C. Now let's tackle D.", summarize: "So far we've agreed that... Is that correct?", focus_positive: "Focus on what's working, not just what's difficult", note: "Build momentum with agreements!" },

      { category: "Buying Time - Strategic Pauses", pause: "That's an interesting proposal. I'd like some time to review it with my team before responding.", consult: "I need to check with my colleague/manager before I can commit to that.", think: "Let me think about that. Can we revisit this point after we discuss X?", power: "Time pressure = negotiation tactic. Don't be rushed!", examples: "'I appreciate the offer, but I need 24 hours to consider it carefully' (buys time)", note: "Never agree under pressure!" },

      { category: "Creating Options - Expanding the Pie", alternatives: "Another option we haven't discussed would be to structure this as a pilot program first.", creative: "What if we approached it from this angle: instead of X, we could do Y with these terms?", multiple: "I see three possible paths forward: Option A..., Option B..., or Option C...", brainstorm: "Let's brainstorm some alternatives that might work for both of us.", note: "More options = better chance of agreement!" },

      { category: "Closing Statements - Finalizing Agreement", summarize: "I believe we've reached an agreement that benefits both parties. Let me summarize what we've agreed...", formalize: "Let's formalize these terms in writing. I'll have our team draft the contract by Friday.", confirm: "To confirm: You'll do X by [date], and we'll do Y by [date]. Does that match your understanding?", next_steps: "Great! Next steps are: 1) ..., 2) ..., 3) ...", note: "Clear summary prevents misunderstandings!" },

      { category: "BATNA - Best Alternative", what: "BATNA = Best Alternative To a Negotiated Agreement (your backup plan)", power: "Knowing your BATNA gives you walk-away confidence", examples: "If this deal falls through, I have another offer at $85k (BATNA)", strategy: "Never reveal your BATNA to the other side!", strengthen: "Before negotiating, strengthen your BATNA (get other options)", critical: "If offer < your BATNA, walk away!", note: "Your BATNA = your negotiation power!" },

      { category: "ZOPA - Zone of Possible Agreement", what: "ZOPA = range where both parties can agree (overlap of minimums/maximums)", example: "Seller's minimum: $90k | Buyer's maximum: $100k → ZOPA: $90k-$100k", strategy: "Try to discover their limits without revealing yours", no_zopa: "If no ZOPA, negotiation will fail (seller wants $100k minimum, buyer offers $80k max)", note: "Negotiation only works if ZOPA exists!" },

      { category: "Reading Body Language", positive_signs: "Leaning forward, nodding, open posture, maintaining eye contact = engagement, interest", negative_signs: "Crossing arms, leaning back, looking away, checking phone = resistance, discomfort", mirror: "Subtly mirror their body language to build rapport", watch_for: "Sudden changes in body language signal reaction to your proposals", note: "Non-verbal communication reveals true feelings!" },

      { category: "Language to Avoid - Ultimatums", never_say: "'This is my final offer' / 'Take it or leave it' / 'I won't negotiate on this'", why_bad: "Ultimatums back both parties into corners with no flexibility", alternative: "Instead: 'This is as far as I can go right now, but let's explore creative alternatives'", threat: "Don't threaten: 'If you don't agree, I'll walk' ✗ → 'I need to see movement on this for us to proceed' ✓", note: "Ultimatums end negotiations!" },

      { category: "Language to Avoid - Aggressive Tactics", bad_phrases: "'You're being unreasonable' / 'That's ridiculous' / 'I won't accept that' / 'You're wrong'", why_bad: "Aggressive language triggers defensive reactions and kills rapport", alternative: "'I see this differently. Here's my perspective...' / 'Help me understand why you think that...'", tone: "Stay calm, professional, respectful even when frustrated", note: "Aggression destroys deals!" },

      { category: "Strategic Silence - Power of Pauses", after_offer: "After making an offer, STAY SILENT. Let them respond first.", discomfort: "Silence creates uncomfortable pressure to speak", information: "They often reveal information or make concessions to fill silence", examples: "You: 'My price is $95,000.' [SILENCE] / Them: 'Well, maybe we could go to $93,000...'", practice: "Practice staying quiet - resist urge to keep talking!", note: "Whoever speaks first after an offer often loses!" },

      { category: "Anchoring - First Number Matters", anchor: "First number mentioned influences entire negotiation", strategy: "Make first offer if you have good information (anchors high/low)", examples: "Seller says $100k first → negotiation centers around $100k | Buyer offers $80k first → negotiation centers around $80k", caution: "Don't anchor if you lack information about market value!", adjust: "If they anchor too extreme, reframe: 'That's outside the range I was considering. Let's discuss realistic parameters.'", note: "First number = psychological anchor!" },

      { category: "Remember", takeaway_1: "Focus on INTERESTS (why), not POSITIONS (what) - creates flexibility", takeaway_2: "Use conditional language: 'If you can X, we could Y' - links concessions", takeaway_3: "Know your BATNA (backup plan) - gives you walk-away power", takeaway_4: "Build on agreements, emphasize progress, create momentum", takeaway_5: "Strategic silence after offers - let them speak first!", final_note: "Great negotiation is collaborative problem-solving, not combat - seek win-win solutions where both parties feel satisfied!" }
    ]
  },

  speakingPractice: [
    { question: "What is the most important principle in negotiation language?", answer: "The most important principle is maintaining respect and focusing on interests rather than positions—seeking solutions that address both parties' underlying needs rather than simply defending predetermined stances." },
    { question: "How do you make a strong opening in negotiations?", answer: "Start by establishing rapport, acknowledging shared goals, expressing optimism about finding solutions, and setting a collaborative rather than adversarial tone that encourages openness and problem-solving." },
    { question: "What is 'conditional language' and why is it useful?", answer: "Conditional language uses 'if-then' structures to link concessions with reciprocal benefits, allowing negotiators to explore trade-offs without committing unilaterally: 'If you can increase the order size, we could lower the unit price.'" },
    { question: "How should you respond to an unreasonable offer?", answer: "Stay calm and professional, acknowledge the offer without accepting it, ask questions to understand their reasoning, explain your concerns objectively, and redirect toward more realistic alternatives without showing offense." },
    { question: "What does 'BATNA' mean in negotiation?", answer: "BATNA stands for 'Best Alternative To a Negotiated Agreement'—your backup plan if negotiations fail. Knowing your BATNA gives you confidence and helps you decide when to walk away." },
    { question: "How can you find common ground in difficult negotiations?", answer: "Focus on shared interests and goals, acknowledge valid points from the other side, identify areas of agreement before tackling differences, and frame issues as problems to solve together rather than battles to win." },
    { question: "What language should you avoid in negotiations?", answer: "Avoid ultimatums, aggressive language, personal attacks, absolute terms like 'never' or 'always,' dismissive phrases, and language that corners either party into defensive positions without room for compromise." },
    { question: "How do you handle someone who won't compromise?", answer: "Ask open questions to understand their constraints, reframe issues to reveal flexibility, explore creative alternatives, emphasize mutual benefits, and if necessary, prepare to walk away rather than accept unfavorable terms." },
    { question: "Why is it important to summarize agreements during negotiation?", answer: "Summarizing confirms mutual understanding, prevents misinterpretation, provides opportunities to correct errors, builds momentum by highlighting progress, and creates a verbal contract before formal documentation." },
    { question: "What is the role of silence in negotiation?", answer: "Strategic silence after making an offer creates pressure for the other party to respond, gives time to think, shows confidence, and often prompts the other side to reveal more information or make concessions." }
  ]
};

// Module 231: Legal and Political Vocabulary
export const MODULE_231_DATA = {
  title: "Module 231 - Legal and Political Vocabulary",
  description: "Understand and use vocabulary from legal and political contexts",
  intro: `📘 Lesson Objectives
✅ Use legal terminology accurately
✅ Discuss political systems and processes
✅ Understand rights, laws, and governance
✅ Engage in informed civic discussions

**Why This Vocabulary Matters:**
Understanding legal and political vocabulary enables you to engage with news, participate in civic discussions, understand your rights, and navigate formal institutions confidently.

**Key Legal and Political Terms:**`,

  table: {
    title: "📋 Legal and Political Vocabulary (Hukuk ve Siyaset Kelime Dağarcığı)",
    data: [
      { category: "Government Branches - Separation of Powers", legislative: "Legislative (Yasama) - makes laws (parliament, congress)", executive: "Executive (Yürütme) - enforces laws (president, prime minister, government)", judicial: "Judiciary (Yargı) - interprets laws and ensures justice", purpose: "Separation prevents concentration of power in one branch", checks: "Each branch can check/limit the others' power", note: "Foundation of democratic government!" },

      { category: "Constitution - Supreme Law", what: "Constitution (Anayasa) - fundamental legal framework for government", purpose: "Defines government structure, distributes power, protects citizens' rights", amendment: "Amendment (Değişiklik) - formal change to constitution", examples: "The constitution guarantees fundamental rights and freedoms. / Constitutional amendments require special procedures.", critical: "Constitution = highest law, all other laws must comply!", note: "Limits government power and protects individual rights" },

      { category: "Legislation - Making Laws", legislation: "Legislation (Yasama/Kanun) - laws enacted by legislative body", bill: "Bill - proposed law before it's passed", enact: "Enact - officially make into law", ratify: "Ratify (Onaylamak) - formally approve (especially treaties)", examples: "The new legislation aims to reform healthcare. / The treaty must be ratified by parliament. / Congress enacted the bill into law.", note: "Laws go through multiple stages before becoming official" },

      { category: "Executive Powers", veto: "Veto (Veto) - power to reject legislation", decree: "Decree/Executive Order - law issued by executive without legislature", pardon: "Pardon - forgive someone's crime (executive power)", examples: "The president has the power to veto legislation. / She issued an executive order. / The governor pardoned the prisoner.", note: "Executive has power to enforce laws and some to create them" },

      { category: "Legal System - Court Parties", plaintiff: "Plaintiff (Davacı) - person who brings lawsuit (sues)", defendant: "Defendant (Davalı) - person being accused/sued", prosecutor: "Prosecutor (Savcı) - government lawyer in criminal case", judge: "Judge (Hakim) - decides cases, interprets law", jury: "Jury (Jüri) - citizens who decide guilt in trial", examples: "The plaintiff argued the company violated their contract. / The defendant has the right to legal representation. / The prosecution presented evidence.", note: "Each party has specific role in legal process" },

      { category: "Legal Concepts - Due Process", due_process: "Due Process (Usul Hukuku) - fair treatment through judicial system", rights: "Right to: be heard, face accusers, legal representation, impartial judge", presumption: "Presumption of innocence - innocent until proven guilty", burden: "Burden of proof on prosecution (not defendant)", examples: "Due process guarantees fair treatment. / Everyone is presumed innocent until proven guilty.", critical: "Due process protects against arbitrary government action!", note: "Cornerstone of rule of law" },

      { category: "Legal Precedent & Jurisdiction", precedent: "Precedent (Emsal/İçtihat) - court decision that guides future similar cases", binding: "Binding precedent - must be followed by lower courts", jurisdiction: "Jurisdiction (Yargı Yetkisi) - court's authority to hear case", federal_vs_state: "Federal jurisdiction vs State jurisdiction (different levels)", examples: "This ruling sets important legal precedent. / This case falls under federal jurisdiction. / The court cited previous precedent.", note: "Precedent ensures consistency in law application" },

      { category: "Political Systems - Democracy Types", democracy: "Democracy (Demokrasi) - citizens participate in decision-making through voting", representative: "Representative Democracy - citizens elect representatives", direct: "Direct Democracy - citizens vote directly on issues (referendums)", republic: "Republic - elected officials represent citizens", examples: "In a representative democracy, we elect officials. / The referendum is an example of direct democracy.", note: "Most modern democracies are representative, not direct" },

      { category: "Political Systems - Non-Democratic", autocracy: "Autocracy (Otokrasi) - power concentrated in one person/group", dictatorship: "Dictatorship (Diktatörlük) - absolute rule by one person", oligarchy: "Oligarchy (Oligarşi) - rule by small elite group", totalitarian: "Totalitarian (Totaliter) - government controls all aspects of life", examples: "An autocracy concentrates power. / A dictatorship allows no opposition. / Totalitarian regimes control media, education, economy.", note: "Limited citizen participation and accountability" },

      { category: "Elections & Voting", referendum: "Referendum (Referandum) - citizens vote directly on specific issue", ballot: "Ballot (Oy pusulası) - paper/form used to vote", constituency: "Constituency (Seçim bölgesi) - area represented by elected official", electoral: "Electoral system - how votes translate to seats", examples: "Citizens will vote in a referendum on the changes. / The constituency elected a new representative. / The electoral college system is unique.", note: "Different countries use different electoral systems" },

      { category: "International Relations", treaty: "Treaty (Antlaşma) - formal agreement between countries", diplomatic_immunity: "Diplomatic Immunity (Diplomatik Dokunulmazlık) - ambassadors protected from prosecution", sovereignty: "Sovereignty (Egemenlik) - country's right to self-governance", sanction: "Sanction (Yaptırım) - penalty against country violating international norms", examples: "The treaty must be ratified. / Ambassadors enjoy diplomatic immunity. / National sovereignty means independence from external interference.", note: "International law governs relations between nations" },

      { category: "Criminal vs Civil Law", criminal: "Criminal Law - offenses against society, prosecuted by state, can result in prison", civil: "Civil Law - disputes between individuals/organizations, typically compensation", examples: "Criminal: murder, theft, assault → Prison / Civil: contract disputes, divorce, property → Money damages", key_difference: "Criminal = State vs Individual | Civil = Individual vs Individual", burden_proof: "Criminal = beyond reasonable doubt | Civil = preponderance of evidence", note: "Can face both for same act (e.g., O.J. Simpson acquitted criminally, liable civilly)" },

      { category: "Impeachment & Removal", impeachment: "Impeachment (Görevden Alma Süreci) - formal accusation of misconduct", process: "Legislature votes to impeach, then trial held to remove from office", grounds: "Usually: treason, bribery, high crimes and misdemeanors", examples: "The impeachment process requires evidence of serious misconduct. / Three US presidents have been impeached, none removed by Senate.", note: "Impeachment ≠ removal (it's just the accusation!)" },

      { category: "Rights & Freedoms", fundamental_rights: "Rights guaranteed by constitution (speech, religion, assembly, due process)", civil_rights: "Civil Rights - equality regardless of race, gender, etc.", human_rights: "Human Rights - universal rights all humans have", examples: "Freedom of speech is a fundamental right. / Civil rights legislation prohibits discrimination. / Human rights include life, liberty, dignity.", critical: "Rights can conflict - courts balance them!", note: "Constitution protects rights from government infringement" },

      { category: "Checks and Balances", what: "Each branch can limit the others' power", examples: "Legislature makes laws → Executive can veto → Legislature can override veto → Judiciary can declare laws unconstitutional", purpose: "Prevents tyranny through mutual oversight", why_matters: "No single branch can act without restraint", note: "Different countries have different check systems" },

      { category: "Political Participation", vote: "Vote (Oy vermek) - most basic form of participation", advocacy: "Advocacy (Savunuculuk) - speaking up for policy changes", lobby: "Lobby (Lobi yapmak) - influence lawmakers on specific issues", protest: "Protest (Protesto) - public demonstration of opposition", examples: "Citizens vote in elections. / Advocacy groups pushed for reform. / Companies lobby for favorable regulations.", note: "Democracy requires active citizen participation!" },

      { category: "Common Confusions - Plaintiff vs Defendant", plaintiff: "Plaintiff (Davacı) = the one who BRINGS the lawsuit", defendant: "Defendant (Davalı) = the one being ACCUSED/SUED", remember: "Plaintiff = complains | Defendant = defends", examples: "Plaintiff sues for damages. / Defendant responds to allegations.", note: "In criminal cases: Prosecution (not plaintiff) vs Defendant" },

      { category: "Common Confusions - Democracy vs Republic", democracy: "Democracy = broad term for citizen participation in government", republic: "Republic = specific type where elected representatives make decisions", relationship: "Most republics are democracies, but not all democracies are republics", examples: "USA = democratic republic / Switzerland = direct democracy (many referendums)", note: "These terms often overlap but have distinct meanings" },

      { category: "Remember", takeaway_1: "Separation of powers = Legislative (makes laws), Executive (enforces), Judicial (interprets)", takeaway_2: "Constitution = supreme law, all other laws must comply with it", takeaway_3: "Plaintiff sues, Defendant defends | Criminal = state prosecutes, Civil = individuals sue", takeaway_4: "Due process = fair treatment, presumption of innocence, right to defense", takeaway_5: "Precedent = past court decisions guide future similar cases", final_note: "Legal and political vocabulary enables informed citizenship and understanding of rights, governance, and justice systems!" }
    ]
  },

  speakingPractice: [
    { question: "What is the difference between criminal and civil law?", answer: "Criminal law deals with offenses against society prosecuted by the state, potentially resulting in imprisonment, while civil law handles disputes between individuals or organizations, typically resolved through compensation or specific performance." },
    { question: "What does 'separation of powers' mean?", answer: "Separation of powers divides government authority among legislative, executive, and judicial branches to prevent concentration of power, ensure checks and balances, and protect against tyranny through mutual oversight." },
    { question: "How does a democracy differ from an autocracy?", answer: "Democracy distributes power among citizens who participate in decision-making through voting and representation, while autocracy concentrates power in one person or small group with limited citizen participation or accountability." },
    { question: "What is the role of the judiciary in government?", answer: "The judiciary interprets laws, resolves disputes, reviews legislation for constitutionality, protects individual rights, and ensures the rule of law by holding other branches accountable to legal standards." },
    { question: "What does 'due process' mean?", answer: "Due process guarantees fair treatment through the judicial system, including the right to be heard, face accusers, receive legal representation, and have decisions made by impartial judges following established legal procedures." },
    { question: "How does a treaty differ from an executive agreement?", answer: "Treaties are formal international agreements requiring legislative approval and are binding under international law, while executive agreements are made by the executive branch alone, often more limited in scope and easier to modify." },
    { question: "What is the purpose of a constitution?", answer: "A constitution establishes the fundamental legal framework for government, defines the distribution of power, protects citizens' rights, sets limits on government authority, and provides procedures for making and changing laws." },
    { question: "What does 'precedent' mean in legal contexts?", answer: "Legal precedent means that courts follow decisions from previous similar cases to ensure consistency, predictability, and fairness in the application of law, though higher courts can overturn precedents when necessary." },
    { question: "How do checks and balances work in government?", answer: "Checks and balances allow each government branch to limit the others' power—for example, the legislature makes laws, the executive enforces them, and the judiciary reviews them, with each able to restrain the others' actions." },
    { question: "What is the difference between a plaintiff and a defendant?", answer: "The plaintiff is the party who brings a legal action or lawsuit seeking remedy for harm or violation of rights, while the defendant is the party being accused or sued and must respond to the plaintiff's claims." }
  ]
};

// Module 232: Environmental Issues Vocabulary
export const MODULE_232_DATA = {
  title: "Module 232 - Environmental Issues Vocabulary",
  description: "Discuss climate change, sustainability, and environmental challenges",
  intro: `📘 Lesson Objectives
✅ Use environmental terminology accurately
✅ Discuss climate change and sustainability
✅ Understand conservation and ecology concepts
✅ Engage in informed environmental discussions

**Why Environmental Vocabulary Matters:**
Climate change and environmental issues dominate global discourse. Understanding this vocabulary enables you to engage with critical conversations about our planet's future and participate in solutions.

**Key Environmental Terms:**`,

  table: {
    title: "📋 Environmental Issues Vocabulary (Çevre Sorunları Kelime Dağarcığı)",
    data: [
      { category: "Climate Change - The Crisis", what: "Climate Change (İklim Değişikliği) - long-term shifts in temperatures and weather patterns", causes: "Primarily from human activities: burning fossil fuels, deforestation, industrial processes", effects: "Rising temperatures, extreme weather, sea level rise, ecosystem disruption", examples: "Climate change is causing more frequent heat waves, droughts, floods, and hurricanes.", critical: "Most urgent global challenge of our time!", note: "Overwhelming scientific consensus confirms human causation" },

      { category: "Greenhouse Effect & Gases", natural: "Natural greenhouse effect keeps Earth warm enough for life", problem: "Excess greenhouse gases intensify effect → global warming", gases: "CO2 (carbon dioxide), methane (CH4), nitrous oxide (N2O), water vapor", sources: "Fossil fuels, agriculture, deforestation, industry", examples: "Reducing greenhouse gas emissions is essential to limiting global warming to 1.5°C.", note: "CO2 is most abundant, methane is more potent" },

      { category: "Carbon Footprint - Measuring Impact", what: "Carbon Footprint (Karbon Ayak İzi) - total greenhouse gas emissions you cause", measured_in: "Tons of CO2 equivalent (CO2e) per year", categories: "Transportation, energy use, food consumption, purchases", reduce: "Use public transit, renewable energy, reduce meat, buy less, recycle", examples: "Average American: ~16 tons CO2/year | Global average: ~4 tons | Target: ~2 tons for climate safety", note: "Individual + systemic action both needed!" },

      { category: "Sustainability - Meeting Needs", definition: "Sustainability (Sürdürülebilirlik) - meeting present needs without compromising future generations", three_pillars: "Environmental protection + Economic viability + Social equity", principles: "Reduce, reuse, recycle | Renewable resources | Circular economy", examples: "Sustainable farming, green buildings, ethical sourcing, renewable energy", critical: "Not just 'being green' - holistic approach!", note: "Balance between planet, people, and profit" },

      { category: "Renewable vs Non-Renewable Energy", renewable: "Renewable (Yenilenebilir) - naturally replenished: solar, wind, hydro, geothermal, biomass", non_renewable: "Non-renewable / Fossil Fuels (Fosil Yakıtlar) - finite: coal, oil, natural gas", why_switch: "Renewables: low emissions, sustainable | Fossils: high emissions, finite, polluting", challenge: "Transition requires infrastructure investment and political will", examples: "Solar panels, wind turbines, hydroelectric dams | vs Coal plants, gas-powered cars", note: "Renewables now cost-competitive with fossils!" },

      { category: "Biodiversity - Variety of Life", what: "Biodiversity (Biyoçeşitlilik) - variety of species, genes, and ecosystems", importance: "Ecosystem stability, pollination, food security, medicine, climate regulation", threats: "Habitat loss, pollution, climate change, overexploitation, invasive species", examples: "Coral reefs, rainforests, wetlands - biodiversity hotspots", critical: "6th mass extinction underway - human-caused!", note: "More diverse ecosystems = more resilient to change" },

      { category: "Deforestation - Losing Forests", what: "Deforestation (Ormansızlaşma) - permanent removal of forests", causes: "Agriculture (cattle, palm oil, soy), logging, urbanization", impacts: "Climate change (carbon release), biodiversity loss, soil erosion, indigenous displacement", examples: "Amazon rainforest lost area size of France in 40 years", solutions: "Sustainable forestry, reforestation, protecting indigenous rights, reducing beef consumption", note: "Forests = lungs of Earth, absorbing CO2" },

      { category: "Ecosystem - Interconnected Life", what: "Ecosystem (Ekosistem) - community of organisms + their physical environment", balance: "Predators, prey, plants, decomposers all interdependent", disruption: "Removing one species can collapse entire ecosystem", examples: "When wolves removed from Yellowstone, entire ecosystem changed; when reintroduced, balance restored", types: "Forests, oceans, deserts, wetlands, grasslands, coral reefs", note: "Everything connected - no species exists in isolation!" },

      { category: "Conservation vs Preservation", conservation: "Conservation (Koruma) - sustainable use while protecting ecosystems", preservation: "Preservation (Muhafaza) - protect from all human interference", examples: "Conservation: National forests (regulated logging) | Preservation: Wilderness areas (no human activity)", debate: "Balance human needs with environmental protection", note: "Both approaches needed in different contexts" },

      { category: "Pollution Types", air: "Air Pollution (Hava Kirliliği) - smog, emissions from vehicles/factories", water: "Water Pollution (Su Kirliliği) - chemicals, sewage, plastics in waterways", soil: "Soil Pollution (Toprak Kirliliği) - pesticides, industrial waste", noise_light: "Noise & Light Pollution - urban impacts on wildlife and humans", examples: "Air pollution kills ~7 million/year globally | Ocean plastic gyres | Dead zones from agricultural runoff", note: "Pollution knows no borders - global problem!" },

      { category: "Plastic Crisis", problem: "Plastic persists for 500+ years, accumulates in oceans and landfills", microplastics: "Microplastics (<5mm) enter food chain, found in human blood and organs", solutions: "Reduce single-use plastics, improve recycling, develop biodegradable alternatives", examples: "8 million tons plastic enter oceans yearly | Microplastics in 90% of table salt", individual_action: "Reusable bags, bottles, straws | Avoid microbeads in cosmetics", note: "Only 9% of plastic ever made has been recycled!" },

      { category: "Carbon Neutral & Net Zero", carbon_neutral: "Carbon Neutral (Karbon Nötr) - balance emissions with offsets (planting trees, carbon credits)", net_zero: "Net Zero - reduce emissions as much as possible, offset remainder", greenwashing: "Greenwashing - claiming environmental benefits without real change", examples: "Many companies pledge 'net zero by 2050' - scrutinize their plans!", critical: "Offsets don't replace emission reductions!", note: "Priority: reduce emissions first, offset what remains" },

      { category: "Recycling & Circular Economy", recycling: "Recycling (Geri Dönüşüm) - reprocess materials into new products", limitations: "Only some plastics recyclable, degrades quality, requires energy", circular_economy: "Circular Economy - design products for reuse, repair, recycling (not disposal)", hierarchy: "Reduce (best) > Reuse > Recycle > Dispose (worst)", examples: "Repair cafes, product-as-service models, biodegradable packaging", note: "Recycling alone won't solve waste problem!" },

      { category: "Habitat Loss & Fragmentation", what: "Habitat Loss (Habitat Kaybı) - destruction of ecosystems where species live", causes: "Urban development, agriculture, infrastructure, mining", fragmentation: "Breaking habitats into small, isolated patches", impact: "Species can't find food, mates, or migrate | #1 threat to biodiversity", examples: "70% of world's forests fragmented | Many species need large continuous areas", note: "Urban sprawl = major driver of habitat loss" },

      { category: "Erosion & Soil Degradation", erosion: "Erosion (Erozyon) - soil washed/blown away faster than it forms", causes: "Deforestation, poor farming, overgrazing, construction", consequences: "Lost farmland, water pollution (sediment), desertification", solutions: "Cover crops, terracing, no-till farming, reforestation", examples: "Takes 500 years to form 1 inch of topsoil | Losing farmland faster than creating it", note: "Soil = non-renewable on human timescales!" },

      { category: "Ocean Acidification", what: "Ocean Acidification (Okyanus Asitleşmesi) - oceans absorb CO2, become more acidic", chemistry: "CO2 + H2O → carbonic acid → lowers pH", impact: "Threatens corals, shellfish, entire marine food webs", examples: "Oceans 30% more acidic since Industrial Revolution | Coral bleaching events", critical: "Called 'climate change's equally evil twin'!", note: "Oceans absorb 25% of human CO2 emissions" },

      { category: "Individual Actions - Make a Difference", transport: "Walk, bike, public transit, carpool, electric vehicles", energy: "LED bulbs, insulation, renewable energy, turn off devices", food: "Reduce meat (especially beef), local/seasonal, reduce food waste", consumption: "Buy less, buy used, repair don't replace, avoid fast fashion", advocate: "Vote for climate policies, divest from fossil fuels, educate others", note: "Individual + systemic change both necessary!" },

      { category: "Remember", takeaway_1: "Climate change = human-caused, primarily from fossil fuels and deforestation", takeaway_2: "Greenhouse gases trap heat → global warming → extreme weather, rising seas", takeaway_3: "Biodiversity loss = 6th mass extinction, threatens ecosystems and human survival", takeaway_4: "Sustainability = meeting needs without compromising future generations", takeaway_5: "Solutions exist: renewable energy, conservation, circular economy, policy change", final_note: "Environmental challenges are urgent but solvable - requires individual action + systemic change + political will!" }
    ]
  },

  speakingPractice: [
    { question: "What is the greenhouse effect?", answer: "The greenhouse effect occurs when gases in Earth's atmosphere trap heat from the sun, keeping the planet warm enough to support life. However, excess greenhouse gases from human activities intensify this effect, causing global warming." },
    { question: "How does deforestation contribute to climate change?", answer: "Deforestation contributes to climate change by removing trees that absorb CO2, releasing stored carbon when trees are burned or decompose, reducing Earth's capacity to regulate atmospheric carbon, and disrupting local climate patterns." },
    { question: "What are renewable energy sources?", answer: "Renewable energy sources—including solar, wind, hydroelectric, geothermal, and biomass—are naturally replenished and don't deplete over time, unlike fossil fuels. They produce little to no greenhouse gas emissions during operation." },
    { question: "Why is biodiversity important?", answer: "Biodiversity ensures ecosystem stability, provides essential services like pollination and water purification, offers genetic resources for agriculture and medicine, supports food security, and helps ecosystems adapt to environmental changes." },
    { question: "What does 'carbon footprint' mean?", answer: "A carbon footprint measures the total greenhouse gas emissions caused by an individual, organization, event, or product throughout its lifecycle, usually expressed in equivalent tons of CO2, helping quantify environmental impact." },
    { question: "How can individuals reduce their environmental impact?", answer: "Individuals can reduce environmental impact by conserving energy, using public transportation or biking, reducing meat consumption, recycling and composting, choosing sustainable products, minimizing plastic use, and supporting environmental policies." },
    { question: "What is the difference between conservation and preservation?", answer: "Conservation manages natural resources sustainably for human use while protecting ecosystems, allowing regulated activities. Preservation seeks to protect nature from human interference entirely, maintaining areas in their undisturbed state." },
    { question: "What causes ocean acidification?", answer: "Ocean acidification occurs when oceans absorb excess atmospheric CO2 from human activities, forming carbonic acid that lowers pH levels, threatening marine life—especially organisms with calcium carbonate shells like corals and shellfish." },
    { question: "What is sustainable development?", answer: "Sustainable development balances economic growth, social inclusion, and environmental protection, meeting current needs without compromising future generations' ability to meet theirs, pursuing progress that can continue indefinitely without depleting resources." },
    { question: "Why are plastic pollution and microplastics concerning?", answer: "Plastic pollution persists for centuries, harms wildlife through ingestion and entanglement, breaks down into microplastics that contaminate food chains and water supplies, and potentially affects human health through bioaccumulation of toxins." }
  ]
};

// Module 233: Social Justice and Equality Vocabulary
export const MODULE_233_DATA = {
  title: "Module 233 - Social Justice and Equality Vocabulary",
  description: "Discuss fairness, rights, and social issues with sensitivity",
  intro: `📘 Lesson Objectives
✅ Use inclusive and respectful language
✅ Discuss social justice issues thoughtfully
✅ Understand equality, equity, and justice concepts
✅ Engage in sensitive conversations about diversity

**Why This Vocabulary Matters:**
Social justice vocabulary enables respectful, informed discussions about inequality, discrimination, and human rights—essential for understanding diverse perspectives and contributing to more equitable societies.

**Key Social Justice Terms:**`,

  table: [
    { english: "Equality", turkish: "Eşitlik", example: "Equality means everyone has the same rights and opportunities regardless of background." },
    { english: "Equity", turkish: "Hakkaniyet", example: "Equity recognizes that people start from different places and may need different support to achieve equal outcomes." },
    { english: "Discrimination", turkish: "Ayrımcılık", example: "Discrimination based on race, gender, or religion violates fundamental human rights." },
    { english: "Privilege", turkish: "Ayrıcalık", example: "Understanding privilege means recognizing unearned advantages some groups have due to social structures." },
    { english: "Inclusion", turkish: "Dahil Etme", example: "Inclusion goes beyond diversity to ensure everyone feels welcomed, respected, and valued." },
    { english: "Bias", turkish: "Önyargı", example: "Unconscious bias affects our decisions and perceptions without our awareness." },
    { english: "Marginalization", turkish: "Marjinalleştirme", example: "Marginalization occurs when certain groups are pushed to society's edges and denied full participation." },
    { english: "Intersectionality", turkish: "Kesişimsellik", example: "Intersectionality recognizes that people's identities overlap, creating unique experiences of discrimination or privilege." },
    { english: "Systemic Racism", turkish: "Sistemik Irkçılık", example: "Systemic racism refers to policies and practices embedded in institutions that disadvantage racial minorities." },
    { english: "Advocacy", turkish: "Savunuculuk", example: "Advocacy involves speaking up for marginalized groups and working toward policy changes." },
    { english: "Allyship", turkish: "Müttefiklik", example: "Allyship means actively supporting marginalized communities and using privilege to amplify their voices." },
    { english: "Empowerment", turkish: "Güçlendirme", example: "Empowerment gives individuals the resources and agency to control their own lives." },
    { english: "Cultural Sensitivity", turkish: "Kültürel Duyarlılık", example: "Cultural sensitivity involves respecting and understanding differences in beliefs, values, and customs." },
    { english: "Representation", turkish: "Temsiliyet", example: "Representation in media and leadership ensures diverse voices shape decisions and narratives." },
    { english: "Microaggression", turkish: "Mikro Saldırganlık", example: "Microaggressions are subtle, often unintentional comments or actions that demean marginalized groups." }
  ],

  speakingPractice: [
    { question: "What is the difference between equality and equity?", answer: "Equality provides everyone the same resources regardless of need, while equity recognizes different starting points and provides resources proportional to need, addressing systemic barriers to achieve fair outcomes." },
    { question: "What does 'privilege' mean in social justice contexts?", answer: "Privilege refers to unearned advantages certain groups receive due to social identities like race, gender, or class—benefits often invisible to those who have them but create barriers for those who don't." },
    { question: "What is intersectionality?", answer: "Intersectionality, coined by Kimberlé Crenshaw, describes how multiple identity categories—race, gender, class, sexuality, disability—overlap and create unique experiences of discrimination or privilege that can't be understood by examining identities in isolation." },
    { question: "How does systemic discrimination differ from individual prejudice?", answer: "Systemic discrimination is built into institutions through policies, practices, and norms that disadvantage certain groups regardless of individual intent, while individual prejudice involves personal biases that may or may not have structural power behind them." },
    { question: "What does 'inclusive language' mean?", answer: "Inclusive language avoids words or phrases that exclude or marginalize groups, uses people-first or identity-first language as appropriate, respects people's self-identifications, and creates space for diverse identities and experiences." },
    { question: "What is allyship and how can someone be a good ally?", answer: "Allyship means actively supporting marginalized communities by listening to their experiences, amplifying their voices, acknowledging privilege, educating oneself, speaking up against injustice, and taking direction from those most affected by issues." },
    { question: "What are microaggressions?", answer: "Microaggressions are subtle, often unintentional comments or behaviors that communicate hostile or derogatory messages to marginalized groups. Though seemingly small, their cumulative effect can significantly impact wellbeing and sense of belonging." },
    { question: "Why is representation important?", answer: "Representation ensures diverse voices participate in decision-making, challenges stereotypes, provides role models for marginalized youth, reflects society's true diversity, and prevents policies that overlook or harm underrepresented groups." },
    { question: "What is the difference between diversity and inclusion?", answer: "Diversity means having people from different backgrounds present, while inclusion ensures those diverse individuals are welcomed, valued, respected, and empowered to participate fully—diversity invites to the party, inclusion asks them to dance." },
    { question: "How can someone address their own unconscious bias?", answer: "Address unconscious bias through self-reflection, learning about different cultures and experiences, questioning assumptions, seeking diverse perspectives, accepting feedback gracefully, and consciously counteracting biased impulses with deliberate fair treatment." }
  ]
};

// Module 234: Complex Phrasal Verbs
export const MODULE_234_DATA = {
  title: "Module 234 - Complex Phrasal Verbs",
  description: "Master advanced phrasal verbs for sophisticated expression",
  intro: `📘 Lesson Objectives
✅ Use complex phrasal verbs accurately
✅ Understand multiple meanings and contexts
✅ Recognize formal vs. informal phrasal verbs
✅ Apply phrasal verbs in business and academic contexts

**Why Phrasal Verbs Matter:**
Phrasal verbs are essential for natural, fluent English. While common in conversation, many have formal applications in professional and academic contexts. Mastering them makes your English sound more native-like.

**Advanced Phrasal Verbs:**`,

  table: [
    { english: "Account for", turkish: "Açıklamak, hesaba katmak", example: "These factors account for the decline in sales over the past quarter." },
    { english: "Bear out", turkish: "Doğrulamak", example: "The research findings bear out our initial hypothesis about consumer behavior." },
    { english: "Clamp down on", turkish: "Sıkı önlemler almak", example: "The government plans to clamp down on tax evasion with stricter penalties." },
    { english: "Draw up", turkish: "Hazırlamak (belge)", example: "Our legal team will draw up the contract by the end of the week." },
    { english: "Fall through", turkish: "Suya düşmek", example: "The merger fell through due to regulatory complications." },
    { english: "Hammer out", turkish: "Uzlaşmaya varmak", example: "After hours of discussion, we finally hammered out an agreement." },
    { english: "Iron out", turkish: "Düzeltmek, halletmek", example: "We need to iron out a few technical issues before the product launch." },
    { english: "Phase out", turkish: "Aşamalı olarak kaldırmak", example: "The company will phase out older models as new versions become available." },
    { english: "Rule out", turkish: "Olasılığı kaldırmak", example: "We can't rule out the possibility of further delays." },
    { english: "Scale back", turkish: "Küçültmek, azaltmak", example: "Budget constraints forced us to scale back our expansion plans." },
    { english: "Shore up", turkish: "Desteklemek, güçlendirmek", example: "The bank took measures to shore up its financial position." },
    { english: "Sift through", turkish: "Didik didik aramak", example: "Researchers had to sift through thousands of documents to find relevant data." },
    { english: "Stem from", turkish: "Kaynaklanmak", example: "Many of these problems stem from poor communication between departments." },
    { english: "Ward off", turkish: "Savuşturmak, önlemek", example: "The company implemented security measures to ward off cyber attacks." },
    { english: "Zero in on", turkish: "Odaklanmak", example: "The investigation zeroed in on the financial transactions from March." }
  ],

  speakingPractice: [
    { question: "What does 'account for' mean in business contexts?", answer: "'Account for' means to explain the reason for something or to be the cause of it—for example, 'Rising costs account for 40% of our budget increase,' meaning they explain or constitute that portion." },
    { question: "How would you use 'hammer out' in a sentence?", answer: "You 'hammer out' an agreement or solution through lengthy discussion and negotiation, working through difficulties to reach consensus—for example, 'The negotiating teams hammered out a compromise after three days of talks.'" },
    { question: "What is the difference between 'rule out' and 'phase out'?", answer: "'Rule out' means to eliminate something as a possibility ('We've ruled out mechanical failure'), while 'phase out' means to gradually discontinue something ('The company is phasing out plastic packaging over two years')." },
    { question: "When would you 'iron out' something?", answer: "You 'iron out' problems, difficulties, or details, meaning to resolve or smooth them over—for example, 'We need to iron out the logistics before finalizing the event,' meaning resolve remaining practical issues." },
    { question: "What does it mean when a plan 'falls through'?", answer: "When a plan 'falls through,' it fails to happen or is abandoned, usually due to problems or changed circumstances—for example, 'Our acquisition fell through when we discovered their debt levels.'" },
    { question: "How do you use 'stem from' correctly?", answer: "'Stem from' indicates origin or cause, showing where something originates—for example, 'Her confidence stems from years of experience,' or 'These disputes stem from unclear contract terms'—always followed by the source or cause." },
    { question: "What does 'shore up' mean?", answer: "'Shore up' means to support or strengthen something that might fail or weaken—for example, 'The company shored up its finances through cost-cutting measures,' meaning they reinforced their financial position." },
    { question: "When would you 'clamp down on' something?", answer: "You 'clamp down on' something when taking strict action to stop or control undesirable behavior—for example, 'The university clamped down on plagiarism with severe penalties,' showing firm enforcement of rules." },
    { question: "What does 'draw up' mean and when is it used?", answer: "'Draw up' means to prepare or write a formal document, plan, or contract—for example, 'The lawyers will draw up the partnership agreement,' or 'We need to draw up a budget proposal.'" },
    { question: "How would you explain 'zero in on'?", answer: "'Zero in on' means to focus attention or efforts on something specific, often after considering broader options—for example, 'After analyzing all factors, we zeroed in on cost reduction as our priority,' showing focused attention." }
  ]
};

// Module 235: Idiomatic Phrasal Verbs
export const MODULE_235_DATA = {
  title: "Module 235 - Idiomatic Phrasal Verbs",
  description: "Use colorful phrasal verbs that bring English to life",
  intro: `📘 Lesson Objectives
✅ Understand idiomatic phrasal verbs
✅ Use them appropriately in context
✅ Recognize cultural and situational nuances
✅ Sound more natural and fluent

**Idiomatic Phrasal Verbs:**
These phrasal verbs are highly idiomatic, meaning their meaning can't be guessed from the individual words. They're common in everyday speech and make your English sound natural and native-like.

**Colorful Phrasal Verbs:**`,

  table: [
    { english: "Bite off more than you can chew", turkish: "Kaldırabileceğinden fazlasını üstlenmek", example: "I bit off more than I could chew by taking three projects simultaneously." },
    { english: "Brush up on", turkish: "Tazelemek", example: "I need to brush up on my Spanish before the trip to Mexico." },
    { english: "Catch on", turkish: "Popüler olmak, anlamak", example: "The new dance style caught on quickly among teenagers." },
    { english: "Come across", turkish: "Karşılaşmak, izlenim vermek", example: "I came across an interesting article while researching. / She comes across as very confident." },
    { english: "Get away with", turkish: "Ceza almadan kurtulmak", example: "You won't get away with submitting late assignments without penalty." },
    { english: "Get over", turkish: "Atlatmak, üstesinden gelmek", example: "It took months for him to get over the breakup." },
    { english: "Give in", turkish: "Boyun eğmek", example: "After much pressure, she finally gave in and agreed to the terms." },
    { english: "Look down on", turkish: "Küçümsemek", example: "It's wrong to look down on people because of their background." },
    { english: "Make up for", turkish: "Telafi etmek", example: "His enthusiasm made up for his lack of experience." },
    { english: "Put up with", turkish: "Katlanmak", example: "I can't put up with this noise any longer—I need to move." },
    { english: "Run into", turkish: "Rastlamak", example: "I ran into an old friend at the coffee shop yesterday." },
    { english: "See through", turkish: "Görüp anlamak, içyüzünü görmek", example: "Everyone could see through his lies immediately." },
    { english: "Stand out", turkish: "Göze çarpmak", example: "Her innovative approach really stood out among the other proposals." },
    { english: "Talk into", turkish: "İkna etmek", example: "My friends talked me into going to the concert even though I was tired." },
    { english: "Walk away from", turkish: "Vazgeçmek, terk etmek", example: "Sometimes the best option is to walk away from a bad situation." }
  ],

  speakingPractice: [
    { question: "What does it mean to 'bite off more than you can chew'?", answer: "It means to take on more responsibilities or commitments than you can handle, attempting something too difficult or ambitious for your capabilities—for example, accepting three job offers simultaneously." },
    { question: "How do you use 'catch on'?", answer: "'Catch on' has two meanings: to become popular or fashionable ('The trend caught on quickly'), or to understand something ('It took me a while to catch on to the joke')." },
    { question: "What does 'get away with' mean?", answer: "'Get away with' means to do something wrong or break a rule without being punished or facing consequences—for example, 'He got away with cheating because nobody noticed.'" },
    { question: "When would you 'brush up on' something?", answer: "You 'brush up on' a skill or knowledge area when you review or practice it to improve after not using it for a while—for example, 'I need to brush up on my math before the exam.'" },
    { question: "What is the difference between 'get over' and 'get away with'?", answer: "'Get over' means to recover from something difficult emotionally ('get over a loss'), while 'get away with' means to avoid punishment for wrongdoing ('get away with lying')—completely different meanings." },
    { question: "What does it mean to 'look down on' someone?", answer: "To 'look down on' someone means to regard them as inferior or less important, showing disrespect or condescension based on their status, background, or characteristics—the opposite of respecting them." },
    { question: "How would you use 'put up with' in conversation?", answer: "'Put up with' means to tolerate something unpleasant or annoying—for example, 'I've been putting up with noisy neighbors for months,' or 'She won't put up with disrespectful behavior.'" },
    { question: "What does 'stand out' mean?", answer: "'Stand out' means to be noticeably different, better, or more prominent than others—for example, 'Her red dress stood out in the crowd,' or 'His exceptional skills stood out during the interview.'" },
    { question: "When would you 'walk away from' something?", answer: "You 'walk away from' something when you leave or abandon a situation, relationship, or opportunity, often because it's not beneficial—for example, 'I walked away from the deal because the terms were unfair.'" },
    { question: "What does 'make up for' mean?", answer: "'Make up for' means to compensate for a deficiency or problem by providing something positive—for example, 'His hard work made up for his lack of natural talent,' meaning it compensated for what he lacked." }
  ]
};

// Module 236: Language of Persuasion and Influence
export const MODULE_236_DATA = {
  title: "Module 236 - Language of Persuasion and Influence",
  description: "Develop the ability to influence, convince, and motivate others using sophisticated language",
  intro: `📘 Lesson Objectives
✅ Influence, convince, and motivate others effectively
✅ Use persuasive expressions and rhetorical devices
✅ Apply communication strategies in debates and presentations
✅ Master ethical persuasion in negotiations and daily interactions

**What is Persuasion?**
Persuasion is the act of influencing someone's beliefs, attitudes, or actions through reasoning or emotion. Unlike manipulation, persuasion is honest and ethical, leading people toward agreement without forcing them.

**Key Vocabulary and Expressions:**

| Category | Useful Expressions & Vocabulary |
|----------|--------------------------------|
| **Making a Point** | What I'm trying to say is..., Let me put it this way..., You have to admit that..., Surely you'd agree that... |
| **Convincing & Persuading** | The evidence clearly shows..., There's no denying that..., It's obvious that..., I strongly believe... |
| **Softening & Diplomacy** | You might want to consider..., Perhaps we could look at it from another angle..., It could be argued that... |
| **Agreeing & Supporting** | That's a fair point., I couldn't agree more., Exactly what I was thinking., You're absolutely right. |
| **Disagreeing Politely** | I see your point, but..., That's one way to see it; however..., I'm not entirely convinced. |
| **Influencing Emotionally** | appeal, empathy, credibility, trust, logic, emotional connection, body language, tone |
| **Techniques of Persuasion** | ethos (credibility), pathos (emotion), logos (logic), repetition, rhetorical questions, storytelling |

**The Three Pillars of Persuasion:**
• **Ethos** – Establishing credibility and trust
• **Pathos** – Appealing to emotions and values
• **Logos** – Using logic, data, and reason`,

  speakingPractice: [
    { question: "What does 'persuasion' mean in communication?", answer: "It's the act of influencing someone's beliefs, attitudes, or actions through reasoning or emotion, leading them toward agreement or action without forcing them." },
    { question: "How is persuasion different from manipulation?", answer: "Persuasion is honest and ethical, respecting the other person's autonomy, while manipulation is deceptive and self-serving, using tricks or lies to control others." },
    { question: "Why is credibility important when persuading others?", answer: "Because people are more likely to trust and believe someone who appears knowledgeable, sincere, and trustworthy. Credibility is the foundation of ethical persuasion." },
    { question: "What is the role of emotion in persuasion?", answer: "Emotion helps create connection and makes the message more memorable. People remember how you made them feel more than what you said." },
    { question: "Why do politicians and advertisers rely on persuasion?", answer: "To influence opinions, shape behavior, and motivate people to take action—whether that's voting, buying products, or supporting causes." },
    { question: "What is the main goal of persuasive language?", answer: "To lead the audience toward agreement or action without forcing them, creating genuine conviction rather than mere compliance." },
    { question: "How does storytelling enhance persuasion?", answer: "It makes ideas relatable and appeals to human emotions and imagination, helping people see themselves in the narrative and understand concepts through experience." },
    { question: "What's the difference between ethos, pathos, and logos?", answer: "Ethos is credibility and character, pathos is emotional appeal, and logos is logical reasoning and evidence. Effective persuasion combines all three." },
    { question: "How can tone of voice affect persuasion?", answer: "A confident, calm tone increases trust and attention, while an aggressive or uncertain tone undermines your message and reduces credibility." },
    { question: "Why do some people resist persuasion even when the logic is clear?", answer: "Because emotions, beliefs, personal identity, or pride often outweigh logic. People need more than facts—they need emotional connection and respect for their views." },
    { question: "What are some common persuasive techniques in advertising?", answer: "Repetition to reinforce messages, emotional appeal to create desire, testimonials for social proof, catchy slogans for memorability, and celebrity endorsements for credibility." },
    { question: "How can repetition be persuasive?", answer: "It reinforces a message until it becomes familiar and convincing. The human brain tends to believe things it hears repeatedly, making repetition a powerful tool." },
    { question: "What's the role of evidence in persuasion?", answer: "Evidence strengthens arguments and shows credibility by providing factual support that appeals to rational minds and demonstrates that your claims aren't just opinions." },
    { question: "How can rhetorical questions be persuasive?", answer: "They make the listener think and subconsciously agree by engaging their mind actively. Questions like 'Don't you want a better future?' invite mental participation." },
    { question: "Why is body language important when persuading face-to-face?", answer: "It conveys confidence, honesty, and empathy through gestures, posture, and eye contact. Studies show 55% of communication impact comes from body language." },
    { question: "How can humor make persuasion more effective?", answer: "It relaxes the audience, builds rapport, reduces defensiveness, and makes messages more memorable. People are more open to ideas when they're enjoying themselves." },
    { question: "What does it mean to 'appeal to emotion'?", answer: "To use empathy, fear, joy, anger, or hope to influence decisions by connecting with what people care about emotionally rather than just rationally." },
    { question: "How can logic and data make a persuasive argument stronger?", answer: "They provide factual support that appeals to rational minds, making your position harder to dispute and showing you've done your homework." },
    { question: "What's a common mistake people make when trying to persuade others?", answer: "Talking too much and not listening to the other person's perspective. Effective persuasion requires understanding concerns and adapting your approach accordingly." },
    { question: "How can active listening improve persuasion?", answer: "It helps build trust, shows respect, reveals concerns you need to address, and allows you to tailor responses to the audience's specific needs and values." },
    { question: "How do you persuade someone to change their mind politely?", answer: "By acknowledging their view first, showing respect for their perspective, then offering logical alternatives with evidence while emphasizing shared values or goals." },
    { question: "What phrases soften a persuasive statement?", answer: "Phrases like 'You might want to consider...', 'Perhaps we could explore another option...', or 'Have you thought about...' make suggestions without being pushy." },
    { question: "How do salespeople use persuasion daily?", answer: "By emphasizing benefits over features, using positive language, addressing objections empathetically, creating urgency, and building rapport through personal connection." },
    { question: "What persuasive techniques work best in job interviews?", answer: "Demonstrating confidence through body language, using storytelling to showcase achievements, and aligning your skills with the company's specific goals and values." },
    { question: "How can teachers use persuasion in the classroom?", answer: "By motivating students through showing the value and relevance of learning, using engaging examples, and inspiring curiosity rather than relying solely on authority." },
    { question: "How does empathy make you more persuasive?", answer: "It shows understanding and respect, which opens others to your message. When people feel understood, they're more willing to consider your perspective." },
    { question: "Why is timing important in persuasion?", answer: "Delivering a message at the right moment—when people are receptive, not stressed or distracted—increases its impact dramatically. Context matters as much as content." },
    { question: "How do leaders persuade teams during a crisis?", answer: "By staying calm to reduce panic, providing clear direction to reduce uncertainty, acknowledging emotions, and inspiring hope by showing a path forward." },
    { question: "How can visuals enhance persuasive communication?", answer: "They make complex information easier to understand, create emotional impact, improve memory retention, and appeal to visual learners who process images faster than text." },
    { question: "How can you persuade someone without sounding pushy?", answer: "Use questions to guide thinking ('What do you think about...?'), offer suggestions instead of commands, and give them space to reach conclusions themselves." },
    { question: "Why must persuasion be ethical?", answer: "Because unethical persuasion destroys trust and credibility, creates resentment when discovered, harms relationships, and ultimately undermines your ability to persuade in the future." },
    { question: "What's an example of unethical persuasion?", answer: "Using fear tactics with false information, making promises you can't keep, withholding important information, or exploiting vulnerabilities to manipulate decisions." },
    { question: "How can someone resist being manipulated?", answer: "By checking facts independently, staying calm to avoid emotional decisions, thinking critically about motives, taking time before deciding, and asking clarifying questions." },
    { question: "What role does self-confidence play in persuasion?", answer: "Confident speakers appear more convincing and trustworthy. Confidence shows you believe in your message, which makes others more likely to believe it too." },
    { question: "How can persuasion help in relationships?", answer: "It encourages understanding and cooperation instead of conflict, helps resolve disagreements constructively, and allows partners to influence each other respectfully without manipulation." },
    { question: "What makes someone naturally persuasive?", answer: "Charisma that attracts attention, empathy that builds connection, adaptability to different audiences, authenticity that builds trust, and the ability to make complex ideas simple." },
    { question: "Why is compromise a form of persuasion?", answer: "Because it combines influence with mutual respect, showing flexibility while still moving toward your goals. Both parties feel heard and valued in the outcome." },
    { question: "What's an example of persuasion in everyday life?", answer: "Convincing a friend to try a new restaurant, persuading your family to watch a specific movie, or talking a colleague into collaborating on a project." },
    { question: "How does cultural background influence persuasion style?", answer: "Some cultures prefer indirect, polite persuasion that saves face, while others value direct, assertive communication. Understanding these differences prevents misunderstandings." },
    { question: "What's the ultimate goal of persuasion?", answer: "To create genuine agreement, inspire voluntary action, and maintain positive relationships—achieving your objectives while respecting others' autonomy and leaving them feeling good about the outcome." }
  ]
};

// Module 237: Expressing Doubt and Certainty at a High Level
export const MODULE_237_DATA = {
  title: "Module 237 - Expressing Doubt and Certainty at a High Level",
  description: "Express varying degrees of doubt, skepticism, and certainty using advanced grammatical forms",
  intro: `📘 Lesson Objectives
✅ Express varying degrees of doubt and certainty
✅ Use modal verbs, adverbs, and hedging language
✅ Apply discourse markers for subtle meaning
✅ Master professional and academic expression

**Understanding Certainty and Doubt:**
In professional and academic contexts, precisely expressing how sure you are about something is crucial. Too much certainty can seem arrogant; too much doubt can seem unprepared. The key is calibrating your language to match your actual knowledge.

**Key Vocabulary and Expressions:**

| Category | Common Structures & Expressions |
|----------|-------------------------------|
| **Expressing Certainty** | I'm absolutely convinced that..., Without a doubt..., It's crystal clear that..., There's no question that..., I can say with confidence that... |
| **Expressing Strong Belief** | I'm fairly certain that..., It's highly likely that..., Chances are that..., I have every reason to believe that... |
| **Expressing Moderate Certainty** | It seems likely that..., It appears that..., From what I can tell..., It could very well be that... |
| **Expressing Doubt** | I'm not entirely sure..., It's doubtful that..., There's some uncertainty about..., I wouldn't bet on it..., I have my doubts about that... |
| **Expressing Skepticism** | I find it hard to believe that..., That sounds rather unlikely., I seriously question whether..., It doesn't quite add up. |
| **Hedging Language** | It might be the case that..., There's a chance that..., As far as I know..., To the best of my knowledge..., If I'm not mistaken... |
| **Certainty Modals** | must (He must be joking), can't (That can't be true), might (It might be possible), may, could |
| **Idiomatic Certainty** | You can take it to the bank., No two ways about it., As sure as the sun rises., Beyond any shadow of a doubt. |

**Modal Verbs for Certainty:**
• **Must** – Strong logical certainty (She must be at home)
• **Can't** – Strong logical impossibility (He can't be serious)
• **Might/May/Could** – Possibility with varying degrees of likelihood`,

  speakingPractice: [
    { question: "How can you show complete certainty in academic writing?", answer: "By using assertive verbs and evidence-based statements such as 'It is clear that...', 'Research indicates that...', or 'The data demonstrates...' backed by citations and facts." },
    { question: "What's the difference between 'certainly' and 'definitely'?", answer: "Certainly sounds more formal and polite, often used in professional contexts, while definitely is stronger, more direct, and commonly used in casual speech." },
    { question: "How can you express confidence without sounding arrogant?", answer: "By using balanced phrases like 'I'm quite confident that...' or 'Based on my experience, I believe...' instead of absolute statements like 'I'm always right about this.'" },
    { question: "Why is certainty important in leadership?", answer: "It builds trust and motivates others to follow your direction. People want leaders who can make confident decisions, especially in uncertain situations." },
    { question: "What are some idioms that express full certainty?", answer: "Without a shadow of a doubt, You can bet your life on it, As sure as night follows day, You can take that to the bank, and Mark my words." },
    { question: "How can tone convey certainty even without words?", answer: "Through steady pacing without hesitation, firm voice without wavering, confident body language with upright posture, and maintaining eye contact that shows conviction." },
    { question: "When is it inappropriate to sound too certain?", answer: "In situations where evidence is incomplete, others have more expertise, you're discussing predictions, or when discussing sensitive topics where humility shows respect." },
    { question: "How can certainty help in debates?", answer: "It strengthens your argument by showing conviction, persuades the audience of your position's validity, and makes you appear more credible and knowledgeable." },
    { question: "What's a good way to express near-certainty without exaggeration?", answer: "Use phrases like 'I'm fairly sure that...', 'It's highly probable that...', or 'All indicators suggest...' which show confidence while acknowledging slight possibility of error." },
    { question: "How can evidence transform an opinion into a certainty?", answer: "By providing verifiable facts that remove ambiguity, showing research or data that supports your position, and demonstrating reproducible results that others can confirm." },
    { question: "What's the difference between doubt and uncertainty?", answer: "Doubt implies personal disbelief or skepticism about something ('I doubt that's true'), while uncertainty means lack of clear information or confidence ('I'm uncertain about the outcome')." },
    { question: "How do academics express uncertainty in writing?", answer: "With hedging language such as 'It appears that...', 'The results suggest...', 'It may be the case that...', or 'Further research is needed to confirm...'." },
    { question: "Why is it useful to show uncertainty in discussions?", answer: "It shows intellectual honesty, openness to alternative views, respect for complexity, and willingness to learn—all signs of critical thinking rather than weakness." },
    { question: "How can you politely express doubt in conversation?", answer: "By saying 'I'm not entirely sure that's the case', 'I see your point, but I have my reservations', or 'Could there be another explanation?' without being confrontational." },
    { question: "What's an informal way to express disbelief?", answer: "Phrases like 'I don't buy that', 'That sounds fishy', 'Pull the other one', 'Yeah, right', or 'Come on, seriously?' show skepticism casually." },
    { question: "How do modal verbs help show doubt?", answer: "Words like might, may, and could soften statements and show possibilities rather than certainties, making claims more tentative: 'It might be true' vs 'It is true.'" },
    { question: "How can you balance doubt and respect in a discussion?", answer: "By acknowledging the other person's view first ('I understand your perspective'), then questioning it gently ('However, have you considered...?') without dismissing them." },
    { question: "What phrase would you use if you're unsure but want to guess?", answer: "'If I had to guess, I'd say...', 'My intuition tells me...', or 'Off the top of my head...' all signal you're speculating without claiming certainty." },
    { question: "How can uncertainty create opportunities?", answer: "It encourages exploration of multiple solutions, fosters creativity by leaving room for innovation, and promotes collaborative problem-solving through openness to ideas." },
    { question: "What are some idiomatic ways to express uncertainty?", answer: "'It's up in the air' (undecided), 'The jury's still out' (awaiting conclusion), 'Time will tell' (future will reveal), and 'It's anyone's guess' (completely uncertain)." },
    { question: "How can you show strong vs. weak certainty using grammar?", answer: "Use must for strong certainty ('He must be tired' = I'm very sure), might for weaker certainty ('He might be tired' = I'm not sure), and could for possibility." },
    { question: "What's the difference between may and might?", answer: "Might is slightly less certain and more hypothetical than may. 'It may rain' suggests reasonable possibility; 'It might rain' suggests slighter possibility or hypothetical scenario." },
    { question: "How do phrases like 'It appears that' affect tone?", answer: "They make statements more diplomatic and less dogmatic, showing you're basing conclusions on observation rather than claiming absolute truth, which sounds more professional." },
    { question: "When should you avoid sounding too sure?", answer: "When discussing predictions about the future, expressing opinions on subjective matters, speculating without complete information, or navigating sensitive topics where others may disagree." },
    { question: "How do scientists express degrees of certainty in research?", answer: "Using calibrated language like likely (>66% probability), very likely (>90%), virtually certain (>99%), or possible (<50%) to precisely convey confidence levels in findings." },
    { question: "Why do journalists often use uncertain language?", answer: "To maintain neutrality, avoid legal liability for false claims, acknowledge when facts are still emerging, and present multiple perspectives without taking definitive stances." },
    { question: "How can overconfidence damage credibility?", answer: "It makes you appear inflexible, uninformed, or arrogant. If proven wrong, you lose trust. People respect those who acknowledge limits of their knowledge." },
    { question: "How does uncertainty affect decision-making?", answer: "It can delay choices as more information is gathered, but also leads to more cautious, well-thought-out outcomes that consider multiple scenarios and risks." },
    { question: "What's a tactful way to show limited certainty about statistics?", answer: "'The data seems to indicate...', 'Preliminary results suggest...', or 'Based on current evidence...' acknowledge that conclusions may change with more information." },
    { question: "How can cultural differences influence how people express doubt?", answer: "Some cultures prefer indirect disagreement to save face, while others value open debate. Asian cultures often use more hedging; Western cultures tend toward directness." },
    { question: "What does 'hedging' mean in communication?", answer: "It's the use of cautious language to avoid sounding absolute or confrontational, such as 'It could be argued that...' instead of 'This is definitely...'" },
    { question: "How can you hedge without sounding weak?", answer: "By combining cautious words with confident structure: 'While uncertainty remains, the evidence strongly suggests...' or 'It may be true that X, but data clearly shows Y.'" },
    { question: "How can you sound professional when uncertain?", answer: "'At this point, we can't be certain, but indications point toward...', 'Further analysis is needed, however preliminary findings show...', or 'While we await confirmation...'" },
    { question: "How do academics show doubt about existing research?", answer: "With phrases like 'These findings should be interpreted with caution', 'The methodology raises questions', or 'Alternative explanations warrant consideration.'" },
    { question: "What's an idiomatic way to express total disbelief?", answer: "'I don't believe that for a second', 'That's hard to swallow', 'When pigs fly', 'That's a tall tale', or 'Pull the other one—it's got bells on.'" },
    { question: "How can you tactfully question someone's certainty?", answer: "'Are you completely sure about that?', 'What makes you so confident?', 'Could there be another explanation?', or 'Have you considered alternative perspectives?'" },
    { question: "Why is balancing certainty and doubt essential in debate?", answer: "It allows you to defend your position strongly while remaining intellectually flexible, acknowledging valid counterpoints without abandoning your argument entirely." },
    { question: "How does expressing mild doubt keep conversations constructive?", answer: "It prevents confrontation by showing you're open to discussion, encourages deeper exploration of ideas, and makes others less defensive about their positions." },
    { question: "How do professionals handle uncertain predictions?", answer: "By providing scenarios: 'If X happens, then Y is likely; however, if A occurs, we might see B instead', acknowledging multiple possible outcomes with different probabilities." },
    { question: "What's the difference between confidence and certainty?", answer: "Confidence is belief in yourself and your abilities to handle situations, while certainty is belief in specific facts or outcomes. You can be confident yet uncertain about results." }
  ]
};

// Module 238: Using Metaphor and Simile in Speech
export const MODULE_238_DATA = {
  title: "Module 238 - Using Metaphor and Simile in Speech",
  description: "Understand and use metaphors and similes fluently to express ideas creatively and vividly",
  intro: `📘 Lesson Objectives
✅ Identify and interpret figurative language
✅ Use metaphors and similes naturally in speech
✅ Create original comparisons for vivid expression
✅ Understand cultural and contextual nuances

**What Are Metaphors and Similes?**
Metaphors and similes are figures of speech that create comparisons to make language more vivid, memorable, and emotionally resonant. They're essential for natural, expressive English.

**Key Concepts:**

| Type | Definition | Examples |
|------|------------|----------|
| **Metaphor** | Direct comparison without using "like" or "as" | Time is money. / He's a night owl. / Life is a journey. |
| **Simile** | Comparison using "like" or "as" | She's as brave as a lion. / Life is like a journey. |
| **Extended Metaphor** | A metaphor developed over several lines | Life is a rollercoaster—full of ups, downs, and sudden turns you never see coming. |
| **Dead Metaphor** | Overused metaphor that's lost its impact | The foot of the mountain. / The heart of the city. |
| **Mixed Metaphor** | Combining inconsistent metaphors (often humorous) | We'll burn that bridge when we get to it. |
| **Common Themes** | Recurring metaphorical concepts | light/dark, journey, war, growth, time, money, weather |

**Useful Phrases and Collocations:**

| Function | Expressions |
|----------|-------------|
| **Positive Metaphors** | a shining example, a ray of hope, the heart of the team, a breath of fresh air |
| **Negative Metaphors** | a ticking time bomb, a dark cloud over, a slippery slope, a dead end |
| **Descriptive Similes** | as free as a bird, as cold as ice, like a fish out of water, as clear as day |
| **Creative Figurative Speech** | My mind is a battlefield. / He's swimming in work. / Her smile was sunshine. |
| **Idiomatic Metaphors** | break the ice, hit the nail on the head, spill the beans, have cold feet |`,

  speakingPractice: [
    { question: "What is the main purpose of a metaphor?", answer: "To describe something more powerfully by comparing it to another idea or image, creating deeper understanding through familiar associations and making abstract concepts concrete and memorable." },
    { question: "How does a metaphor differ from a simile?", answer: "A simile uses 'like' or 'as' for explicit comparison ('She fights like a tiger'), while a metaphor states the comparison directly ('She is a tiger'), creating a stronger identification." },
    { question: "Why do speakers use metaphors in conversation?", answer: "To make abstract ideas more vivid and relatable, create emotional connections, add color and personality to speech, and make complex concepts easier to understand through familiar imagery." },
    { question: "What makes a metaphor powerful?", answer: "When it creates a strong visual or emotional connection that feels both surprising and inevitable, revealing a truth in an unexpected way that makes people see things differently." },
    { question: "Can metaphors be used in professional speech?", answer: "Absolutely—they make communication more persuasive and memorable. Business uses many metaphors: 'market penetration,' 'organizational hierarchy,' 'cash flow,' and 'bottom line.'" },
    { question: "How can metaphors help in public speaking?", answer: "They keep the audience engaged through vivid imagery, clarify complex concepts through familiar comparisons, create emotional resonance, and make speeches more memorable and quotable." },
    { question: "What's the difference between a 'dead metaphor' and a 'fresh metaphor'?", answer: "Dead metaphors are overused and no longer noticed ('leg of a table'), while fresh ones feel original and surprising ('Her words were needles'), creating new insights and capturing attention." },
    { question: "How can you avoid overusing metaphors?", answer: "Use them purposefully when they add value, choose ones that fit the context naturally, vary your figurative language, and ensure each metaphor serves a clear communicative purpose." },
    { question: "Why do we say 'time is money'?", answer: "Because both are valuable resources that can be spent, wasted, saved, or invested. This metaphor reflects cultural values about efficiency and productivity in business-oriented societies." },
    { question: "What does 'breaking the ice' metaphorically mean?", answer: "Starting a conversation to reduce tension or awkwardness, like breaking through frozen water. The metaphor captures how initial interactions can feel cold or rigid until someone initiates warmth." },
    { question: "What's a metaphor for someone who inspires others?", answer: "'She's a ray of sunshine' suggests bringing light, warmth, and positivity. Other options: 'a beacon of hope,' 'a guiding light,' or 'a breath of fresh air.'" },
    { question: "How would you describe a stressful day using a metaphor?", answer: "'It was an emotional rollercoaster' captures the ups and downs, sudden changes, and overwhelming nature of the experience through the familiar imagery of an intense ride." },
    { question: "How could you describe confusion using a simile?", answer: "'I felt like a fish out of water' conveys discomfort and disorientation through the image of something struggling in an unfamiliar environment where it can't function normally." },
    { question: "What metaphor could describe an opportunity?", answer: "'A golden chance' or 'a window of opportunity' (suggesting it can close). Also: 'the door is open,' 'lightning in a bottle,' or 'a once-in-a-lifetime shot.'" },
    { question: "What does it mean if someone 'has a heart of gold'?", answer: "They are genuinely kind and generous. Gold's value and purity symbolize the worth and authenticity of their character, suggesting their kindness is precious and rare." },
    { question: "What's a metaphor for someone who's always working hard?", answer: "'He's a machine' suggests tireless efficiency and constant productivity. Also: 'a workhorse,' 'burning the candle at both ends,' or 'running on all cylinders.'" },
    { question: "How can similes make storytelling more engaging?", answer: "They add color and rhythm to descriptions, create vivid mental images, evoke emotions through sensory comparisons, and help listeners visualize and connect with the narrative emotionally." },
    { question: "What metaphor could describe modern life?", answer: "'Life is a race against time' captures the pressure and speed of contemporary existence. Also: 'a juggling act,' 'a constant balancing act,' or 'swimming against the current.'" },
    { question: "How can metaphors show cultural differences?", answer: "Each culture uses symbols and imagery reflecting its values and beliefs—for example, Western 'time is money' vs. cultures viewing time as cyclical, or different animals symbolizing traits." },
    { question: "Why do love songs often use metaphors?", answer: "Because figurative language captures feelings that literal words can't express—emotions are abstract and complex, so metaphors like 'You're my sunshine' or 'Love is a battlefield' make them tangible." },
    { question: "How can metaphors simplify complex ideas?", answer: "By turning abstract concepts into concrete, familiar images—for example, 'The internet is a highway' or 'DNA is a blueprint' makes technical concepts accessible through everyday analogies." },
    { question: "What's a metaphor for change or transformation?", answer: "'A caterpillar turning into a butterfly' symbolizes profound transformation, suggesting that change can lead to beauty and freedom after a period of struggle and confinement." },
    { question: "What metaphor would describe social media addiction?", answer: "'A digital trap' or 'slaves to our screens' suggests being caught or controlled. Also: 'drowning in notifications,' 'social media quicksand,' or 'trapped in the scroll.'" },
    { question: "What's an effective metaphor for teamwork?", answer: "'We're all rowing the same boat' emphasizes coordinated effort toward a shared goal. Also: 'cogs in a machine,' 'a well-oiled team,' or 'pieces of a puzzle.'" },
    { question: "What does 'the root of the problem' metaphorically mean?", answer: "The main source or underlying cause of an issue, using a tree metaphor where roots are hidden but essential—addressing symptoms won't solve the problem without tackling its foundation." },
    { question: "What's the metaphorical meaning of 'a storm is brewing'?", answer: "Trouble or conflict is approaching, using weather to symbolize tension building before it breaks out. The metaphor suggests something powerful and potentially destructive is forming." },
    { question: "What's a simile for someone who's very calm?", answer: "'As cool as a cucumber' emphasizes composure and emotional control. Cucumbers stay cool inside even in heat, symbolizing remaining calm under pressure or in stressful situations." },
    { question: "How can metaphors influence emotions?", answer: "They create imagery that triggers empathy, inspiration, fear, or joy by connecting to universal human experiences and sensory memories, bypassing rational thought to touch emotional centers directly." },
    { question: "Why do leaders use metaphors when giving speeches?", answer: "To connect emotionally with audiences, simplify complex visions into memorable images, inspire action through vivid language, and create shared understanding through relatable comparisons." },
    { question: "What is an example of a 'war metaphor' used in business?", answer: "'We're fighting for market share,' 'launching a campaign,' 'targeting customers,' 'conquering the competition'—war metaphors frame business as conflict, though some argue this promotes aggressive culture." },
    { question: "How can you create your own metaphor?", answer: "Identify an abstract idea you want to express, find a familiar, concrete image that shares qualities with it, and connect them—for example, 'Her anger was a volcano' links emotion to eruption." },
    { question: "What makes a metaphor original?", answer: "When it's unexpected but still makes sense, revealing a connection others haven't noticed. Avoiding clichés and drawing on personal observation creates fresher, more memorable comparisons." },
    { question: "How can metaphors improve writing and speaking style?", answer: "They add depth by layering meaning, create emotional resonance through imagery, improve memorability through vivid pictures, and demonstrate creativity and linguistic sophistication." },
    { question: "What metaphor could describe a boring meeting?", answer: "'It was like watching paint dry' or 'watching grass grow'—both use extremely slow, uneventful processes to emphasize tedium and lack of engagement or stimulation." },
    { question: "What's a metaphor for feeling motivated?", answer: "'My fire was reignited' or 'sparked my passion'—fire metaphors for motivation suggest energy, warmth, and spreading power, capturing how inspiration can grow and fuel action." },
    { question: "How can similes help non-native speakers sound natural?", answer: "They make speech more idiomatic and expressive, showing cultural fluency. Learning common similes ('sleep like a log,' 'fight like cats and dogs') helps you sound more native-like." },
    { question: "What's a metaphor for technology taking over our lives?", answer: "'We've become slaves to our screens' or 'prisoners of technology'—these metaphors suggest loss of freedom and control, highlighting concerns about digital dependency and its impact on autonomy." },
    { question: "What's a simile for describing excitement?", answer: "'I was as happy as a kid in a candy store' or 'like a child on Christmas morning'—both evoke pure, unrestrained joy through imagery of childhood delight." },
    { question: "How do metaphors make abstract emotions visible?", answer: "By translating them into sensory images we can see, touch, or feel—'drowning in sadness,' 'bursting with joy,' 'carrying a heavy heart'—making internal states externally comprehensible." },
    { question: "Why should advanced speakers master metaphors and similes?", answer: "Because they reveal creativity, emotional intelligence, and linguistic sophistication. They're markers of fluency, making your English sound natural, native-like, and culturally competent while adding personality to communication." }
  ]
};

// Module 239: Humor and Irony in Language
export const MODULE_239_DATA = {
  title: "Module 239 - Humor and Irony in Language",
  description: "Understand and use humor, irony, and sarcasm effectively in speech and writing",
  intro: `📘 Lesson Objectives
✅ Understand and recognize different types of humor
✅ Use irony and sarcasm appropriately
✅ Analyze cultural and linguistic aspects of humor
✅ Practice witty, subtle expression for social and professional contexts

**Understanding Humor:**
Humor is an advanced language skill requiring timing, tone, cultural awareness, and understanding of subtext. It involves surprise, exaggeration, wordplay, or incongruity that challenges expectations in amusing ways.

**Key Vocabulary and Concepts:**

| Concept | Explanation | Example |
|---------|-------------|---------|
| **Humor** | The quality of being amusing or funny through wordplay, exaggeration, or irony | His dry humor made everyone laugh quietly. |
| **Irony** | Saying the opposite of what you mean to make a point or be humorous | "Lovely weather," she said as it poured with rain. |
| **Sarcasm** | A sharper form of irony meant to mock or criticize | "Oh great, another meeting," he said, rolling his eyes. |
| **Satire** | Using humor or irony to criticize social or political issues | The film satirizes modern consumer culture. |
| **Wit** | Intelligent humor; quick, clever expression | Oscar Wilde was known for his sharp wit. |
| **Pun (Wordplay)** | A joke exploiting different meanings or similar-sounding words | "I used to be a banker, but I lost interest." |
| **Understatement** | Making something seem less important than it is for humor | "It's just a scratch," said the man with a broken arm. |
| **Hyperbole** | Exaggerating something for emphasis or comic effect | "I've told you a million times!" |

**Useful Phrases and Collocations:**

| Type | Expressions |
|------|-------------|
| **Showing Amusement** | That's hilarious!, You've got to be kidding!, That's a good one!, I couldn't stop laughing. |
| **Irony and Sarcasm** | Yeah, right., How original., Oh, brilliant idea., What could possibly go wrong? |
| **Self-Irony** | I'm not lazy; I'm just energy-efficient., My diet is going great—I lost my appetite. |
| **Describing Humor** | dark humor, dry wit, slapstick, absurd humor, playful banter, subtle irony |
| **Responding to Humor** | That's clever., Nice one!, I see what you did there., Good sense of humor! |`,

  speakingPractice: [
    { question: "What makes something funny in language?", answer: "Surprise that challenges expectations, clever wordplay that creates double meanings, exaggeration that amplifies reality, timing that catches people off-guard, or incongruity between what's said and what's meant." },
    { question: "How is humor culturally dependent?", answer: "What's funny in one culture may be offensive or confusing in another because humor relies on shared references, values, taboos, and communication styles that vary across cultures." },
    { question: "What's the difference between irony and sarcasm?", answer: "Irony is subtle and clever, saying the opposite to highlight contradiction, while sarcasm is sharper and often used to mock or criticize, with a more hostile or mocking tone." },
    { question: "Why do people use irony in speech?", answer: "To express opinions indirectly, add humor without being too direct, make points more memorable through contrast, show intelligence through layered meaning, or soften criticism." },
    { question: "What's the main risk of using sarcasm?", answer: "It can easily be misunderstood, especially across cultures or in text without tone cues. It may sound rude, hurt feelings, or be taken literally, damaging relationships or communication." },
    { question: "What's an example of situational irony?", answer: "A fire station burning down, a marriage counselor getting divorced, or a traffic cop getting a parking ticket—when outcomes contradict what's expected given the circumstances." },
    { question: "How does humor make conversations more engaging?", answer: "It relaxes people by reducing tension, builds rapport through shared laughter, keeps attention through entertainment, shows personality, and makes interactions more memorable and enjoyable." },
    { question: "Why do comedians often rely on exaggeration?", answer: "Because hyperbole amplifies reality in a funny and relatable way, making everyday situations seem absurd, highlighting truths through distortion, and creating vivid, memorable images." },
    { question: "What is 'dry humor'?", answer: "Subtle, emotionless delivery of something witty or ironic without smiling or obvious signals that you're joking, requiring the audience to recognize the humor themselves—common in British comedy." },
    { question: "Why is timing important in humor?", answer: "Because even a great joke can fail if told at the wrong moment. Timing affects impact—pauses build anticipation, context determines appropriateness, and delivery influences reception." },
    { question: "How can humor improve communication at work?", answer: "It reduces tension in stressful situations, encourages creativity by creating relaxed atmosphere, improves team relationships through bonding, makes meetings more engaging, and helps people remember messages." },
    { question: "What's the role of humor in teaching or presentations?", answer: "It keeps learners engaged and attentive, helps them remember information through emotional connection, reduces anxiety about difficult material, and makes presenters seem more approachable and relatable." },
    { question: "Why do politicians sometimes use humor in speeches?", answer: "To appear more relatable and human, defuse criticism through self-deprecation, make messages memorable, connect emotionally with audiences, and show confidence and quick thinking." },
    { question: "What does 'using humor as a shield' mean?", answer: "It means hiding vulnerability or discomfort behind jokes, deflecting serious questions with humor, or using comedy to avoid addressing emotions or difficult topics honestly." },
    { question: "How does self-irony make a person likable?", answer: "It shows humility by acknowledging flaws, demonstrates confidence by being comfortable with imperfections, creates relatability through shared human experiences, and prevents others from seeing you as arrogant." },
    { question: "What does 'black humor' mean?", answer: "Humor that makes light of serious, disturbing, or taboo subjects like death, disease, or tragedy. It can be controversial but helps some people cope with difficult realities." },
    { question: "What's the difference between irony and paradox?", answer: "Irony is about contrast between expectation and reality or literal and intended meaning, while paradox is about seeming contradiction in logic that may reveal deeper truth ('less is more')." },
    { question: "What's a pun and why is it funny?", answer: "A pun plays on words with double meanings or similar sounds, creating a twist. Example: 'I'm reading a book about anti-gravity—it's impossible to put down.' The humor comes from unexpected wordplay." },
    { question: "How can irony be used in literature?", answer: "To reveal deeper truths, criticize social norms through contrast between appearance and reality, create dramatic tension, or add layers of meaning that reward careful readers." },
    { question: "What's an example of dramatic irony in movies?", answer: "When the audience knows something the character doesn't, like in horror films where we see the danger approaching but the character doesn't, creating tension through our superior knowledge." },
    { question: "How can you tell a joke without offending anyone?", answer: "Avoid sensitive topics (religion, race, disabilities, trauma), focus on shared experiences and self-deprecation, read your audience, and ensure humor comes from cleverness not cruelty." },
    { question: "What's an example of polite humor in the workplace?", answer: "Light jokes about daily routines ('Looks like someone needs more coffee!'), harmless mistakes ('I speak three languages: English, bad English, and typo'), or shared workplace experiences." },
    { question: "How can body language support humor?", answer: "Facial expressions signal whether you're joking, strategic pauses build anticipation before punchlines, exaggerated gestures emphasize absurdity, and deadpan delivery creates contrast for irony." },
    { question: "What's the difference between 'sarcastic' and 'funny'?", answer: "Sarcasm can hurt by mocking others, using humor as a weapon, while humor entertains without causing pain, bringing people together through shared laughter rather than dividing through mockery." },
    { question: "How can humor break the ice in a conversation?", answer: "It reduces formality and tension, gives people something to respond to naturally, shows you're approachable, creates shared positive experience, and makes social interaction less awkward." },
    { question: "What's an example of self-deprecating humor?", answer: "'I'm not great at cooking, but at least I make good smoke alarms work' or 'I put the 'pro' in procrastination'—making fun of your own flaws shows humility and confidence." },
    { question: "How does irony show intelligence?", answer: "It requires awareness of both literal and implied meanings, demonstrates linguistic sophistication through layered communication, shows understanding of context, and reveals ability to perceive contradictions." },
    { question: "Why is tone important in ironic speech?", answer: "Because it signals the real meaning behind the words. Without the right tone, irony can be taken literally, failing to communicate your actual message or creating misunderstanding." },
    { question: "What's an example of ironic compliment?", answer: "'Wow, you really nailed that—if failure was the goal!' or 'Nice parking job—did you use a blindfold?' The words sound positive but tone and context reveal criticism." },
    { question: "How can you tell if someone didn't get your irony?", answer: "They take your words literally and respond seriously, seem confused by your statement, or react inappropriately to what you thought was obviously ironic—tone may have been unclear." },
    { question: "Why do different cultures laugh at different things?", answer: "Because humor reflects cultural norms, taboos, values, and shared references. What's acceptable to joke about, communication styles, and what's considered funny vary significantly across cultures." },
    { question: "What kind of humor translates easily across cultures?", answer: "Physical or visual humor (slapstick, funny faces) and universal situations (babies, animals, food) are less dependent on language and cultural references, making them more universally understood." },
    { question: "How can sarcasm cause misunderstandings in multicultural settings?", answer: "Because tone and intent may not be recognized by non-native speakers who take words literally, or because some cultures view sarcasm as impolite, confusing, or unnecessarily indirect." },
    { question: "How do British and American humor differ?", answer: "British humor tends to be more ironic, self-deprecating, and subtle with dry delivery, while American humor is often more direct, energetic, optimistic, and explicit with clearer signals of joking." },
    { question: "Why is humor an advanced language skill?", answer: "It requires timing, tone mastery, cultural awareness, understanding of subtext, knowledge of idioms and wordplay, and ability to read social cues—all sophisticated competencies beyond basic communication." },
    { question: "What's an example of irony in everyday life?", answer: "Getting a parking ticket right outside a police station, a fitness trainer eating junk food, or rain on your wedding day after months of sunshine during planning." },
    { question: "How can you practice irony in English?", answer: "By analyzing film dialogues for ironic delivery, listening to comedy podcasts, practicing mock compliments with friends, observing tone in sitcoms, and trying self-deprecating humor in safe contexts." },
    { question: "What's a humorous way to describe failure?", answer: "'Well, that went well!' (after a disaster), 'Nailed it!' (after obvious mistake), or 'So that's what not to do!'—using ironic positivity to acknowledge and lighten failure." },
    { question: "Why is it easier to understand humor than to create it in a foreign language?", answer: "Because humor depends on idioms you must know, perfect timing that requires cultural intuition, tone control that needs practice, and cultural context that takes time to absorb fully." },
    { question: "How can humor make you a better communicator?", answer: "It helps you connect emotionally with audiences, defuse tension in difficult conversations, make people remember you and your message, show intelligence and cultural fluency, and create positive associations with interactions." }
  ]
};

// Module 240: Adapting Language for Different Audiences
export const MODULE_240_DATA = {
  title: "Module 240 - Adapting Language for Different Audiences",
  description: "Master adapting language—tone, vocabulary, and structure—for different audiences and contexts",
  intro: `📘 Lesson Objectives
✅ Adapt tone, vocabulary, and structure for different audiences
✅ Understand formal, neutral, and informal registers
✅ Identify audience types and their needs
✅ Use register appropriately in real communication

**Understanding Audience Adaptation:**
In real communication, your audience determines your language. A university professor, a close friend, and a customer require different tones and levels of formality. The ability to adjust your speech or writing accordingly is essential for effective communication.

**1. Formal vs. Informal Language:**

| Context | Example |
|---------|---------|
| **Formal** | I would appreciate it if you could send me the report by Monday. |
| **Informal** | Can you send me the report by Monday? |
| **Very Informal** | Hey, shoot me that report by Monday, okay? |

**2. Audience Awareness:**
When you speak or write, ask yourself:
• Who am I communicating with?
• What is their relationship to me?
• What do they know about this topic?
• What do I want them to feel or do?

**3. Tone and Register:**
• **Formal Register** – Polite, structured, and precise
• **Neutral Register** – Clear and direct, suitable for most workplaces
• **Informal Register** – Relaxed, personal, and spontaneous

**4. Vocabulary Shifts:**

| Informal | Neutral | Formal |
|----------|---------|--------|
| kid | child | offspring / young person |
| boss | manager | superior |
| help | assist | provide assistance |
| say sorry | apologize | extend my apologies |
| fix | repair | rectify |

**5. Style Adaptation by Audience:**

| Audience | Example |
|----------|---------|
| **Friend** | Hey, I'm running late. Be there soon! |
| **Boss** | I might arrive a few minutes late due to traffic. |
| **Client** | Please accept my apologies; I'll be slightly delayed. |

**6. Audience in Writing:**
• **Academic writing** → Objective, evidence-based, avoids 'I' and 'you'
• **Business writing** → Polite, persuasive, concise
• **Personal writing** → Emotional, expressive, subjective

**Practice Adaptation:**
Consider how you'd adapt "Can you fix this problem?" for:
• Your friend → "Hey, can you help me fix this?"
• Your boss → "Could you please help resolve this issue?"
• A client → "Would you be able to assist with resolving this matter?"`,

  speakingPractice: [
    { question: "Why is it important to adapt your language to your audience?", answer: "Because using the wrong tone can make you sound disrespectful or unprofessional. When you adapt your language, you build trust, ensure your message is clearly understood, and show respect for the relationship and context." },
    { question: "Can using slang in a formal context be effective sometimes?", answer: "Rarely, but in some creative industries or when intentionally breaking formality for effect, carefully chosen slang can make communication sound modern and authentic. However, it's risky and requires excellent judgment." },
    { question: "How would you speak differently to a child and to an adult?", answer: "I'd use simpler vocabulary and shorter sentences with a child, a warmer and more patient tone, concrete examples, and more encouragement. With adults, I'd be more structured, detailed, and assume greater background knowledge." },
    { question: "Why is tone as important as vocabulary?", answer: "Because tone conveys emotion and attitude—even polite words can sound rude if the tone is wrong. Tone includes pace, pitch, volume, and inflection, all affecting how your message is received emotionally." },
    { question: "Can humor work in professional communication?", answer: "Yes, but it depends on the culture and relationship. A light joke can build rapport and reduce tension, but it must never offend, must be appropriate to the context, and should be used sparingly." },
    { question: "How does cultural background affect communication style?", answer: "Different cultures value directness differently. British people might prefer understatement and indirectness, Americans may be more direct, many Asian cultures emphasize hierarchy and face-saving, while some cultures value emotional expressiveness others see as excessive." },
    { question: "What's the difference between formal and polite?", answer: "Formal is about structure and vocabulary (using 'one' instead of 'you'), while polite is about attitude and respect (saying 'please' and 'thank you'). You can be polite in informal speech and formal but impolite." },
    { question: "When do you use contractions like 'I'm' or 'you're'?", answer: "In informal or neutral speech and casual writing, but not usually in academic writing, formal reports, or very professional contexts where full forms ('I am,' 'you are') maintain appropriate formality." },
    { question: "What happens if you use too formal language with friends?", answer: "It sounds distant, awkward, or even sarcastic, as if you're not comfortable with them or creating unnecessary distance. It can make social situations uncomfortable and unnatural." },
    { question: "Why do job interviews require formal language?", answer: "Because they test professionalism and your ability to represent yourself appropriately in business contexts. Formal language shows respect, preparation, and understanding of professional norms and expectations." },
    { question: "Can body language change depending on the audience?", answer: "Absolutely. In formal contexts, you maintain upright posture and controlled gestures with appropriate distance; in informal ones, you're more relaxed with casual gestures, closer proximity, and less rigid movement." },
    { question: "Do you change your tone when speaking English vs. your native language?", answer: "Yes, because languages have different expectations of politeness and expression. English might require more indirectness in requests, different emotional expressiveness, or varying levels of formality than my native language." },
    { question: "Why do politicians often use vague language?", answer: "To avoid committing to specific statements that could be challenged later, appeal to a wider audience with different views, maintain flexibility in positions, and avoid controversy by not taking firm stances." },
    { question: "What kind of vocabulary should be used in technical presentations?", answer: "Specialized vocabulary that shows expertise and precision, but not so complex that the audience gets lost. Balance technical terms with explanations, adapting complexity to audience's technical background." },
    { question: "How do comedians adapt their jokes for different audiences?", answer: "They study demographics (age, culture, education), local references and sensibilities, venue formality, and current events, then adjust content, language complexity, and topics to match what will resonate with that specific group." },
    { question: "Why is empathy crucial in communication?", answer: "Because understanding others' perspectives, needs, and emotions helps you choose words that connect rather than alienate, anticipate objections, address concerns, and frame messages in ways that resonate with their values." },
    { question: "What's the danger of being too informal in business emails?", answer: "It can seem unprofessional, disrespectful (especially to clients or higher-ups), suggest lack of attention to detail, or undermine your credibility. First impressions matter, and overly casual communication may cost opportunities." },
    { question: "Is it possible to sound formal and friendly at the same time?", answer: "Yes, by using polite language with a warm tone, showing appreciation ('I greatly appreciate your time'), using 'we' to create partnership, maintaining professionalism while acknowledging the human relationship." },
    { question: "How can you sound confident without sounding arrogant?", answer: "By using positive but humble phrases like 'I'm confident this approach will work' instead of 'I'm sure I'm right,' acknowledging team contributions, staying open to feedback, and supporting claims with evidence not ego." },
    { question: "When should you avoid technical jargon?", answer: "When your audience isn't familiar with the field, when clarity is more important than precision, when speaking to general public, or when jargon might exclude or confuse rather than clarify." },
    { question: "How can social media posts reflect audience adaptation?", answer: "You use informal language for personal followers, professional tone on business pages, adjust hashtags for different platforms, modify length for platform norms (Twitter brevity vs. LinkedIn detail), and consider platform culture." },
    { question: "Should teachers adapt their language depending on student level?", answer: "Definitely. Simpler explanations and vocabulary work for beginners, while advanced learners need more precise terminology. Teachers must also adjust examples, pace, sentence complexity, and amount of assumed background knowledge." },
    { question: "Can you give an example of adapting speech in a multicultural workplace?", answer: "Avoiding idioms that might not be understood by non-native speakers ('raining cats and dogs'), speaking more slowly and clearly, using visual aids, checking understanding frequently, and being patient with language barriers." },
    { question: "What are some signs that your tone is inappropriate?", answer: "Confused looks or requests for clarification, defensive or withdrawn reactions, sudden silence or disengagement, people seeming offended or uncomfortable, or feedback that you came across differently than intended." },
    { question: "Why do advertisements change tone for different products?", answer: "Because a luxury watch and a children's toy appeal to completely different audiences with different values, purchasing motivations, emotional triggers, and language expectations—one requires sophistication, the other playfulness." },
    { question: "How can humor or sarcasm be misunderstood across cultures?", answer: "Some cultures may take jokes literally without recognizing ironic tone, others see sarcasm as impolite or passive-aggressive, and humor often relies on cultural references that don't translate, causing confusion or offense." },
    { question: "How do you simplify complex information for the general public?", answer: "By using analogies to familiar concepts, everyday language without jargon, short sentences with clear structure, visual aids, concrete examples instead of abstractions, and focusing on practical implications rather than theory." },
    { question: "When is using 'please' and 'thank you' not enough?", answer: "When your tone sounds impatient or sarcastic, your body language shows disinterest or frustration, you're not actually listening, or you're using them automatically without genuine respect or appreciation." },
    { question: "What's the risk of using emojis in professional messages?", answer: "They can seem childish or unprofessional unless you know your audience well and company culture permits it. They might be misinterpreted, seem overly casual for serious matters, or reduce perceived competence." },
    { question: "Why do political speeches often use repetition?", answer: "It makes messages more memorable through rhythm and emphasis, persuasive through familiarity, emotionally resonant through building momentum, and quotable for media coverage and social sharing." },
    { question: "What makes a message 'audience-centered'?", answer: "It considers what the audience needs to know rather than what you want to say, addresses their concerns and interests, uses their vocabulary and references, and focuses on benefits to them rather than features of your idea." },
    { question: "When should you use storytelling in communication?", answer: "When you need to engage emotions, make complex ideas relatable through narrative, create memorable messages, build connection through shared human experiences, or illustrate abstract concepts with concrete examples." },
    { question: "What's the difference between persuasive and informative tone?", answer: "Persuasive aims to influence attitudes or actions using emotional appeals and benefits-focused language, while informative aims to explain neutrally, present facts objectively, and help understanding without advocating a position." },
    { question: "How can you check if your message was understood correctly?", answer: "By asking for feedback ('Does that make sense to you?'), requesting paraphrasing ('Can you summarize what we agreed?'), observing body language for confusion, asking clarifying questions, or requesting specific actions." },
    { question: "Why is listening part of adapting language?", answer: "Because you can't adapt effectively without understanding others first. Listening reveals their knowledge level, concerns, values, communication style, and emotional state—all crucial for choosing appropriate language and approach." },
    { question: "How do formal and academic audiences prefer evidence to be presented?", answer: "With citations and credible sources, logical structure with clear progression, objective language avoiding emotional appeals, data and statistics, peer-reviewed research, and acknowledgment of counterarguments and limitations." },
    { question: "Can tone be misinterpreted in emails?", answer: "Yes, frequently, because there's no facial expression, voice tone, or body language to clarify intention. Brief messages can seem curt, attempts at efficiency can seem rude, and humor often falls flat or offends." },
    { question: "Why is being adaptable a leadership skill?", answer: "Leaders must connect with people from diverse backgrounds, education levels, and roles. They need to inspire executives, motivate frontline workers, reassure stakeholders, and communicate vision across all levels—each requiring different language." },
    { question: "How can AI or translation tools affect tone?", answer: "They may produce grammatically correct words but miss emotional nuance, cultural context, idiomatic expressions, formality levels, and subtle implications—resulting in technically accurate but tonally inappropriate communication." },
    { question: "What's the ultimate goal of adapting language?", answer: "To ensure understanding, respect, and connection between people. Adaptation shows you value the relationship enough to meet others where they are, creating trust and effective communication that achieves your objectives while maintaining positive relationships." }
  ]
};
