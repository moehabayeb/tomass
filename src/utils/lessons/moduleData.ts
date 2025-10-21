import { Module, LevelType } from './levelsData';

// Module data generator functions
function generateA1Modules(): Module[] {
  return Array.from({ length: 50 }, (_, i) => ({
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
  }));
}

function generateA2Modules(): Module[] {
  return Array.from({ length: 50 }, (_, i) => ({
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
           `A2 Module ${i + 51}`,
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
                 'Coming soon',
    completed: false,
    locked: false, // TEMPORARILY UNLOCKED FOR DEVELOPMENT
  }));
}

function generateB1Modules(): Module[] {
  return Array.from({ length: 50 }, (_, i) => ({
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
           i === 48 ? 'Society and Social Issues Vocabulary' :
           i === 49 ? 'Travel and Adventure Vocabulary' :
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
                 i === 48 ? 'Learn and use vocabulary related to society, inequality, and social issues through structured speaking activities' :
                 i === 49 ? 'Learn and use vocabulary related to travel and adventure in structured conversations and exercises' :
                 'Coming soon',
    completed: false,
    locked: false, // TEMPORARILY UNLOCKED FOR DEVELOPMENT
  }));
}

function generateB2Modules(): Module[] {
  const modules = Array.from({ length: 39 }, (_, i) => ({
    id: i + 151, // Starting from 151 for B2 level
    title: i === 0 ? 'Future Perfect Continuous (will have been doing)' :
           i === 1 ? 'Passive Voice – Past Perfect and Future Perfect' :
           i === 2 ? 'Reported Speech – Mixed Tenses' :
           i === 3 ? 'Inversion for Emphasis (Never have I…)' :
           i === 4 ? 'Ellipsis and Substitution (so, do, one)' :
           i === 5 ? 'Nominalisation (changing verbs to nouns)' :
           i === 6 ? 'Advanced Linking Words (nonetheless, furthermore)' :
           i === 7 ? 'Complex Conditionals (if…were to, if…should)' :
           i === 8 ? 'Unreal Past for Present (I wish I knew)' :
           i === 9 ? 'Unreal Past for Past (I wish I had known)' :
           i === 10 ? 'Gerunds after Prepositions' :
           i === 11 ? 'Advanced Collocations (make an effort, heavy rain)' :
           i === 12 ? 'Advanced Phrasal Verbs (bring up, cut down on)' :
           i === 13 ? 'Idioms and Expressions (hit the nail on the head)' :
           i === 14 ? 'Expressing Certainty and Doubt' :
           i === 15 ? 'Hedging Language (Seems to / Appears to)' :
           i === 16 ? 'Modals in the Past (might have done, should have been)' :
           i === 17 ? 'Discursive Essays – Opinion Language' :
           i === 18 ? 'Describing Trends (Increase/Decrease/Fluctuate)' :
           i === 19 ? 'Talking About Statistics – Percentages & Fractions' :
           i === 20 ? 'Formal and Informal Registers' :
           i === 21 ? 'Direct and Indirect Speech Review' :
           i === 22 ? 'Politeness Strategies in English' :
           i === 23 ? 'Advanced Descriptions of People and Places' :
           i === 24 ? 'Speculating About the Past' :
           i === 25 ? 'Speculating About the Future' :
           i === 26 ? 'Hypothetical Past (Third Conditional)' :
           i === 27 ? 'Vocabulary – Business and Economics' :
           i === 28 ? 'Vocabulary – Science and Technology' :
           i === 29 ? 'Vocabulary – Health and Medicine' :
           i === 30 ? 'Vocabulary – Art and Literature' :
           i === 31 ? 'Vocabulary – Politics and Society' :
           i === 32 ? 'Vocabulary – Global Issues' :
           i === 33 ? 'Vocabulary – Sports and Leisure' :
           i === 34 ? 'Debating Skills – Expressing Agreement and Disagreement' :
           i === 35 ? 'Persuasion Techniques in Speaking' :
           i === 36 ? 'Making Complaints Politely' :
           i === 37 ? 'Clarifying and Confirming Information' :
           i === 38 ? 'Managing Conversations – Interruptions and Turn-taking' :
           `B2 Module ${i + 151}`,
    description: i === 0 ? 'Master the Future Perfect Continuous tense' :
                 i === 1 ? 'Learn passive voice in advanced tenses' :
                 i === 2 ? 'Report speech across different tenses' :
                 i === 3 ? 'Use inversion for formal emphasis' :
                 i === 4 ? 'Avoid repetition with ellipsis and substitution' :
                 i === 5 ? 'Transform verbs into nouns for formal writing' :
                 i === 6 ? 'Connect ideas with advanced linking words' :
                 i === 7 ? 'Express hypothetical situations formally' :
                 i === 8 ? 'Express present regrets and wishes' :
                 i === 9 ? 'Express past regrets with wish and if only' :
                 i === 10 ? 'Use gerunds correctly after prepositions' :
                 i === 11 ? 'Master natural word combinations' :
                 i === 12 ? 'Learn advanced phrasal verbs for fluency' :
                 i === 13 ? 'Understand and use common English idioms' :
                 i === 14 ? 'Express different levels of certainty' :
                 i === 15 ? 'Use hedging language for politeness' :
                 i === 16 ? 'Speculate about past events using modals' :
                 i === 17 ? 'Master formal opinion language for essays' :
                 i === 18 ? 'Learn how to describe and interpret changes over time using correct vocabulary' :
                 i === 19 ? 'Talk naturally about percentages, fractions, and proportions in everyday English' :
                 i === 20 ? 'Understand and use formal and informal English appropriately in different contexts' :
                 i === 21 ? 'Report what other people said using both direct and indirect speech' :
                 i === 22 ? 'Use polite, indirect, and respectful language for requests and suggestions' :
                 i === 23 ? 'Describe people and places vividly using advanced adjectives and expressions' :
                 i === 24 ? 'Express logical guesses about past events using modal verbs' :
                 i === 25 ? 'Express predictions and possibilities about the future using modal verbs' :
                 i === 26 ? 'Talk about imaginary situations in the past using third conditional' :
                 i === 27 ? 'Build vocabulary related to business, economics, and finance' :
                 i === 28 ? 'Build vocabulary for discussing science, innovation, and technology' :
                 i === 29 ? 'Build vocabulary for discussing health, medicine, and well-being' :
                 i === 30 ? 'Build vocabulary related to art forms, creative expression, and literature' :
                 i === 31 ? 'Learn vocabulary for discussing government, politics, human rights, and social issues' :
                 i === 32 ? 'Build vocabulary for discussing world problems like climate change, poverty, and globalization' :
                 i === 33 ? 'Expand vocabulary for discussing sports, fitness, hobbies, and leisure activities' :
                 i === 34 ? 'Learn to express agreement and disagreement politely and convincingly in debates' :
                 i === 35 ? 'Learn to persuade and influence others using logic, emotion, and credibility' :
                 i === 36 ? 'Learn to express dissatisfaction and solve problems politely and professionally' :
                 i === 37 ? 'Develop strategies for checking understanding and confirming details in conversations' :
                 i === 38 ? 'Master the art of interrupting politely, taking turns, and keeping discussions balanced' :
                 'Coming soon',
    completed: false,
    locked: false,
  }));

  console.log('✅ generateB2Modules() called - Generated', modules.length, 'modules');
  console.log('Module IDs generated:', modules.map(m => m.id));

  return modules;
}

// Modules data for each level - TEMPORARILY UNLOCKED FOR DEVELOPMENT
export const MODULES_BY_LEVEL: Record<LevelType, Module[]> = {
  A1: generateA1Modules(),
  A2: generateA2Modules(),
  B1: generateB1Modules(),
  B2: generateB2Modules(),
  C1: [],
  C2: []
};