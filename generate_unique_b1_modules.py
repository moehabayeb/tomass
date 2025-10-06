#!/usr/bin/env python3
"""
Generate unique B1 modules 121-140 with topic-specific speaking practice questions
"""

# Module definitions with titles
MODULES = {
    121: {
        "title": "Wish / If only + Past Perfect (Past Regrets)",
        "description": "Learn wish / if only + past perfect (past regrets) - B1 level English",
        "intro": """In this module, you will learn about Wish / If only + Past Perfect for expressing regrets about the past.

Grammar Rule:
We use 'wish' or 'if only' + past perfect to express regrets about things that happened (or didn't happen) in the past.

Structure:
- I wish + subject + had + past participle
- If only + subject + had + past participle

Examples:
- I wish I had studied harder for the exam.
- If only I had listened to your advice.
- She wishes she had taken that job offer.""",
        "tip": "Use 'wish/if only + had + past participle' to express regrets about past actions",
        "questions": [
            ("What is something you wish you had done differently in the past?", "I wish I had learned English earlier."),
            ("If you could change one decision from your past, what would it be?", "If only I had traveled more when I was younger."),
            ("Do you have any regrets about your education?", "I wish I had studied computer science in university."),
            ("What opportunity do you wish you had taken?", "I wish I had accepted that job offer abroad."),
            ("Is there someone you wish you had kept in touch with?", "If only I had stayed in contact with my old friends."),
            ("What skill do you wish you had learned earlier?", "I wish I had started learning to play guitar as a child."),
            ("Do you regret any major purchase you made?", "If only I hadn't bought that expensive car."),
            ("What advice do you wish you had followed?", "I wish I had listened to my parents' advice."),
            ("Is there a place you wish you had visited?", "If only I had gone to Japan before the pandemic."),
            ("What relationship do you wish had turned out differently?", "I wish I had been more patient with my friend."),
        ]
    },
    122: {
        "title": "Used to / Be used to / Get used to",
        "description": "Learn the differences between used to, be used to, and get used to",
        "intro": """In this module, you will learn the differences between 'used to', 'be used to', and 'get used to'.

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
- I'm getting used to my new job. (becoming accustomed)""",
        "tip": "Remember: 'used to' is about the past, 'be used to' is about current state, 'get used to' is about transition",
        "questions": [
            ("What did you use to do when you were a child?", "I used to play outside every day after school."),
            ("What are you used to doing now that was difficult at first?", "I'm used to waking up at 6 AM for work."),
            ("What new habit are you trying to get used to?", "I'm getting used to exercising in the morning."),
            ("Did you use to have any bad habits?", "I used to bite my nails, but I stopped."),
            ("What food are you not used to eating?", "I'm not used to eating spicy food."),
            ("How long did it take you to get used to your current routine?", "It took me about a month to get used to my new schedule."),
            ("What did you use to believe as a child?", "I used to believe in Santa Claus."),
            ("Are you used to speaking English regularly?", "I'm getting used to speaking English every day."),
            ("What technology are you still getting used to?", "I'm still getting used to using smartwatches."),
            ("What is something you'll never get used to?", "I'll never get used to cold showers."),
        ]
    },
    123: {
        "title": "Causative – Have/Get Something Done",
        "description": "Learn how to use causative structures with have and get",
        "intro": """In this module, you will learn the causative structures 'have something done' and 'get something done'.

Grammar Rule:
We use causative structures when someone else does something for us (we don't do it ourselves).

Structure:
- have + object + past participle
- get + object + past participle

Examples:
- I had my hair cut yesterday. (Someone cut my hair)
- She's getting her car repaired. (Someone is repairing it)
- We need to have the house painted. (We'll pay someone to paint it)""",
        "tip": "Use 'have/get + object + past participle' when describing services done by others",
        "questions": [
            ("When was the last time you had your hair cut?", "I had my hair cut last week."),
            ("Do you prefer to fix things yourself or get them repaired?", "I usually get my computer repaired by a professional."),
            ("What household tasks do you have done by others?", "I have my house cleaned twice a month."),
            ("Have you ever had your photo taken professionally?", "Yes, I had my photo taken for my passport."),
            ("Where do you usually get your car serviced?", "I get my car serviced at the local garage."),
            ("Have you ever had something stolen?", "Unfortunately, I had my bike stolen last year."),
            ("Do you get your clothes dry-cleaned?", "I get my suits dry-cleaned regularly."),
            ("When do you plan to have your eyes tested?", "I need to have my eyes tested next month."),
            ("Have you ever had a custom item made?", "I had a custom bookshelf made for my office."),
            ("What's the most expensive thing you've had repaired?", "I had my laptop screen repaired, which cost a lot."),
        ]
    },
    124: {
        "title": "Relative Clauses – Defining & Non-defining",
        "description": "Understand the difference between defining and non-defining relative clauses",
        "intro": """In this module, you will learn about defining and non-defining relative clauses.

Grammar Rules:
1. Defining relative clauses: Essential information (no commas)
   - The book that I'm reading is fascinating.
2. Non-defining relative clauses: Extra information (with commas)
   - My brother, who lives in Spain, is visiting.

Relative pronouns: who, which, that, whose, where, when

Examples:
- The man who called yesterday is here. (defining)
- Paris, which is the capital of France, is beautiful. (non-defining)""",
        "tip": "Use commas for non-defining clauses that add extra (non-essential) information",
        "questions": [
            ("Can you describe a person who has influenced your life?", "The person who influenced me most is my grandmother."),
            ("What's a place where you feel most relaxed?", "The place where I feel most relaxed is the beach."),
            ("Tell me about a book that changed your perspective.", "The book that changed my perspective was '1984'."),
            ("Do you have a friend whose opinion you really value?", "I have a friend whose advice I always trust."),
            ("What's a skill which you'd like to develop?", "A skill which I'd like to develop is public speaking."),
            ("Can you name a time when you felt truly happy?", "A time when I felt truly happy was on my wedding day."),
            ("What's something that always makes you smile?", "Something that always makes me smile is my dog's excitement."),
            ("Do you know someone who speaks multiple languages?", "My colleague, who speaks five languages, is amazing."),
            ("What's a place which holds special memories for you?", "My childhood home, which my parents sold, holds special memories."),
            ("Can you think of a moment when everything changed?", "The moment when I got my first job changed my life."),
        ]
    },
    125: {
        "title": "Gerunds and Infinitives – Review",
        "description": "Review when to use gerunds vs infinitives",
        "intro": """In this module, you will review gerunds and infinitives.

Grammar Rules:
1. Gerunds (-ing): After prepositions, certain verbs (enjoy, mind, finish)
2. Infinitives (to + verb): After certain verbs (want, decide, hope), adjectives

Examples:
- I enjoy reading. (gerund after 'enjoy')
- I want to travel. (infinitive after 'want')
- I'm interested in learning Spanish. (gerund after preposition)
- It's important to exercise. (infinitive after adjective)""",
        "tip": "Some verbs change meaning: stop doing (quit) vs stop to do (pause for purpose)",
        "questions": [
            ("What activities do you enjoy doing in your free time?", "I enjoy reading books and watching movies."),
            ("What do you want to achieve this year?", "I want to improve my English speaking skills."),
            ("What are you interested in learning?", "I'm interested in learning how to code."),
            ("Do you mind working on weekends?", "I don't mind working occasionally, but I prefer not to."),
            ("What have you decided to do differently this year?", "I've decided to eat healthier and exercise more."),
            ("What do you avoid doing?", "I avoid eating fast food as much as possible."),
            ("What's worth visiting in your city?", "The old town is worth visiting for its architecture."),
            ("What do you hope to accomplish in the future?", "I hope to start my own business someday."),
            ("What did you stop doing that improved your life?", "I stopped checking social media before bed."),
            ("What's difficult about learning English?", "It's difficult to remember all the irregular verbs."),
        ]
    },
    126: {
        "title": "Expressions with Get (get ready, get tired, etc.)",
        "description": "Learn common expressions using the verb 'get'",
        "intro": """In this module, you will learn common expressions with 'get'.

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
- Don't get lost in the city!""",
        "tip": "'Get' is very common in spoken English and often means 'become' or 'receive'",
        "questions": [
            ("How long does it take you to get ready in the morning?", "It takes me about 30 minutes to get ready."),
            ("What makes you get angry?", "I get angry when people are disrespectful."),
            ("Do you get tired easily?", "I get tired if I don't sleep enough."),
            ("What time do you usually get home from work?", "I usually get home around 6 PM."),
            ("Have you ever gotten lost in a foreign city?", "Yes, I got lost in Tokyo last year."),
            ("When did you get married?", "I got married three years ago."),
            ("How do you get better at speaking English?", "I get better by practicing every day."),
            ("What do you do when you get bored?", "When I get bored, I read or watch documentaries."),
            ("Do you get nervous before presentations?", "Yes, I always get nervous before speaking publicly."),
            ("What time do you usually get up?", "I usually get up at 6:30 AM on weekdays."),
        ]
    },
    127: {
        "title": "Expressions with Take (take a break, take time, etc.)",
        "description": "Learn common expressions using the verb 'take'",
        "intro": """In this module, you will learn common expressions with 'take'.

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
- Can you take a photo of us?""",
        "tip": "'Take' often combines with nouns to create common expressions in English",
        "questions": [
            ("How often do you take breaks during work?", "I take a break every two hours."),
            ("How long does it take you to learn something new?", "It takes me several weeks to learn a new skill."),
            ("Do you enjoy taking photos?", "Yes, I enjoy taking photos of nature."),
            ("Who takes care of household chores in your family?", "My spouse and I take turns taking care of chores."),
            ("When do you usually take a shower?", "I usually take a shower in the morning."),
            ("Do you take vitamins or supplements?", "Yes, I take vitamin D every day."),
            ("How long does it take to get to your workplace?", "It takes about 30 minutes to get there."),
            ("Have you ever taken a risk that paid off?", "Yes, I took a risk by changing careers."),
            ("Do you take notes during meetings?", "Yes, I always take notes to remember important points."),
            ("What event takes place in your city annually?", "A music festival takes place every summer."),
        ]
    },
    128: {
        "title": "Phrasal Verbs – Separable & Inseparable",
        "description": "Learn the difference between separable and inseparable phrasal verbs",
        "intro": """In this module, you will learn about separable and inseparable phrasal verbs.

Grammar Rules:
1. Separable: You can put the object between the verb and particle
   - turn on the light / turn the light on
2. Inseparable: The object must come after the phrasal verb
   - look after the baby (NOT: look the baby after)

Examples:
- Pick up your phone / Pick your phone up (separable)
- Look for my keys (inseparable)
- Note: With pronouns, separation is required: Pick it up (NOT: Pick up it)""",
        "tip": "With pronouns, separable phrasal verbs MUST be separated: turn it on, pick it up",
        "questions": [
            ("What time do you usually wake up?", "I usually wake up at 7 AM."),
            ("Do you turn off all lights before leaving home?", "Yes, I always turn them off to save energy."),
            ("Who do you look up to most?", "I look up to my parents for their hard work."),
            ("Do you give up easily when things get difficult?", "No, I try not to give up when facing challenges."),
            ("What do you look forward to this week?", "I'm looking forward to the weekend."),
            ("Do you put off important tasks?", "Sometimes I put them off, but I try not to."),
            ("Who looks after your pets when you travel?", "My neighbor looks after my cat when I'm away."),
            ("Do you write down new vocabulary?", "Yes, I always write it down in my notebook."),
            ("What do you need to figure out soon?", "I need to figure out my vacation plans."),
            ("Do you throw away things or keep them?", "I usually throw away things I don't use anymore."),
        ]
    },
    129: {
        "title": "Phrasal Verbs – Common Everyday Verbs",
        "description": "Learn the most common phrasal verbs used in daily life",
        "intro": """In this module, you will learn common everyday phrasal verbs.

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
- Please sit down and relax.""",
        "tip": "Phrasal verbs are essential for natural-sounding English conversation",
        "questions": [
            ("What time do you usually get up on weekends?", "I get up around 9 AM on weekends."),
            ("How often do you go out with friends?", "I go out with friends once or twice a week."),
            ("When do you usually come back home from work?", "I come back home around 6:30 PM."),
            ("Do you work out regularly?", "Yes, I work out three times a week."),
            ("How do you find out about news and current events?", "I find out about news by reading online articles."),
            ("Do you often run into people you know?", "Yes, I sometimes run into old friends in the city."),
            ("What do you do when you run out of groceries?", "When I run out of food, I go shopping immediately."),
            ("Do you ever show up late to appointments?", "I try not to show up late, but traffic sometimes delays me."),
            ("When do you usually calm down after getting angry?", "I usually calm down after taking a few deep breaths."),
            ("Do you dress up for special occasions?", "Yes, I always dress up for weddings and formal events."),
        ]
    },
    130: {
        "title": "Collocations with Make and Do",
        "description": "Learn the difference between make and do collocations",
        "intro": """In this module, you will learn collocations with 'make' and 'do'.

MAKE collocations (creating/producing):
- make a decision, make a mistake, make money, make a phone call, make progress, make an effort

DO collocations (performing/completing):
- do homework, do the dishes, do exercise, do business, do your best, do damage

Examples:
- I need to make a decision soon.
- I have to do my homework tonight.
- She made a lot of progress.""",
        "tip": "Generally: 'make' = create/produce, 'do' = perform/complete. But learn fixed expressions!",
        "questions": [
            ("How do you make important decisions?", "I make decisions by weighing pros and cons carefully."),
            ("When was the last time you made a mistake?", "I made a mistake in my report last week."),
            ("Do you do exercise regularly?", "Yes, I do exercise every morning."),
            ("How much progress have you made in English?", "I've made significant progress this year."),
            ("What household chores do you do?", "I do the dishes and vacuum the floors."),
            ("Do you make an effort to eat healthy?", "Yes, I make an effort to eat vegetables daily."),
            ("How do you make money?", "I make money by working as a software developer."),
            ("What do you do for a living?", "I do consulting work for tech companies."),
            ("Have you ever done any volunteer work?", "Yes, I've done volunteer work at local shelters."),
            ("Do you make phone calls or prefer texting?", "I usually make phone calls for important matters."),
        ]
    },
    # Continue with modules 131-140...
}

# Add modules 131-140
MODULES.update({
    131: {
        "title": "Indirect Questions",
        "description": "Learn how to form polite indirect questions",
        "intro": """In this module, you will learn how to form indirect questions for polite communication.

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
- Indirect: Do you know what time it starts?""",
        "tip": "In indirect questions, use statement word order (subject + verb), not question order",
        "questions": [
            ("How do you ask for directions politely?", "I ask 'Could you tell me where the nearest bank is?'"),
            ("What's a polite way to ask about time?", "I say 'Do you know what time the meeting starts?'"),
            ("How do you ask about prices politely?", "I ask 'Could you tell me how much this costs?'"),
            ("What's a polite way to ask someone's name?", "I wonder if you could tell me your name."),
            ("How do you ask about availability?", "Could you let me know if this product is available?"),
            ("What's a polite way to request information?", "I'd like to know when the store opens."),
            ("How do you ask about someone's opinion politely?", "I wonder what you think about this proposal."),
            ("What's a formal way to ask for help?", "Could you possibly help me with this problem?"),
            ("How do you politely ask about rules?", "I'd like to know if photography is allowed here."),
            ("What's a polite way to check understanding?", "Could you tell me if I understood correctly?"),
        ]
    },
    132: {
        "title": "Giving Opinions – Agreeing & Disagreeing",
        "description": "Learn how to express, agree, and disagree with opinions politely",
        "intro": """In this module, you will learn how to give opinions and respond to others' opinions.

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
- That's a valid point, however ...""",
        "tip": "Use softening phrases like 'I think' or 'in my opinion' to sound less direct",
        "questions": [
            ("What's your opinion on remote work?", "In my opinion, remote work increases productivity."),
            ("Do you agree that technology improves life?", "I completely agree that technology has many benefits."),
            ("What do you think about social media?", "I believe social media has both advantages and disadvantages."),
            ("Do you agree that everyone should learn English?", "I see the benefits, but I think preserving native languages is also important."),
            ("What's your view on online education?", "From my perspective, online education offers great flexibility."),
            ("Do you think money brings happiness?", "I'm not sure I agree that money alone brings happiness."),
            ("What's your opinion on climate change?", "In my view, climate change is one of our biggest challenges."),
            ("Do you agree that exercise is important?", "I couldn't agree more - regular exercise is essential."),
            ("What do you think about city living?", "I think city living offers many opportunities, but it can be stressful."),
            ("Do you believe in work-life balance?", "That's a valid point - I believe maintaining balance is crucial."),
        ]
    },
    133: {
        "title": "Speculating and Expressing Possibility",
        "description": "Learn to express different degrees of possibility and speculation",
        "intro": """In this module, you will learn how to speculate and express possibility.

Modal verbs for speculation:
- must (90% certain)
- might/may/could (50% certain)
- can't (99% certain negative)

Examples:
- She must be at home (I'm almost certain).
- He might be late (It's possible).
- They can't be serious (I'm certain they're not).""",
        "tip": "Use 'must' for strong deduction, 'might/may/could' for possibility, 'can't' for impossibility",
        "questions": [
            ("What do you think happened to your missing keys?", "They must be somewhere in the house."),
            ("Why isn't your colleague at work today?", "She might be sick or have an appointment."),
            ("Is that person famous?", "They could be - they look familiar."),
            ("Why is the office closed?", "It must be a holiday that I forgot about."),
            ("Could that noise be a problem?", "It might be the heating system - it can't be anything serious."),
            ("Why hasn't your friend replied?", "He may be busy or his phone might be off."),
            ("Is that restaurant still open?", "It must be closed by now - it's quite late."),
            ("What's causing this traffic?", "There could be an accident ahead."),
            ("Why is everyone leaving early?", "There might be a fire drill or meeting."),
            ("Is that information accurate?", "It must be correct - it's from an official source."),
        ]
    },
    134: {
        "title": "Talking about Hypothetical Situations",
        "description": "Learn to discuss imaginary and hypothetical scenarios",
        "intro": """In this module, you will learn how to talk about hypothetical situations.

Structures:
- Second Conditional: If + past simple, would + infinitive (unreal present/future)
  - If I won the lottery, I would travel the world.
- Mixed Conditional: If + past perfect, would + infinitive (past condition, present result)
  - If I had studied medicine, I would be a doctor now.

Examples:
- If I were rich, I would buy a house.
- What would you do if you could fly?""",
        "tip": "Use 'were' (not 'was') for all persons in formal hypothetical situations: If I were you...",
        "questions": [
            ("What would you do if you won a million dollars?", "If I won a million dollars, I would invest half and travel with the rest."),
            ("Where would you live if you could live anywhere?", "If I could live anywhere, I would live by the ocean."),
            ("What would you change if you were president?", "If I were president, I would focus on education and healthcare."),
            ("If you could have any superpower, what would it be?", "If I could have a superpower, I would choose teleportation."),
            ("What would you do if you had more free time?", "If I had more free time, I would learn to play piano."),
            ("If you could meet anyone, who would you meet?", "If I could meet anyone, I would meet Einstein."),
            ("What career would you choose if you could start over?", "If I could start over, I would become an architect."),
            ("Where would you go if you could time travel?", "If I could time travel, I would visit ancient Rome."),
            ("What would you do differently if you were 18 again?", "If I were 18 again, I would study abroad."),
            ("If you could speak any language fluently, which one?", "If I could speak any language, I would choose Mandarin Chinese."),
        ]
    },
    135: {
        "title": "Expressing Preferences",
        "description": "Learn different ways to express preferences and choices",
        "intro": """In this module, you will learn how to express preferences.

Common structures:
- prefer + noun/-ing: I prefer coffee.
- prefer A to B: I prefer tea to coffee.
- would prefer to + infinitive: I'd prefer to stay home.
- would rather + infinitive: I'd rather go out.
- would rather... than: I'd rather walk than drive.

Examples:
- I prefer reading to watching TV.
- I'd prefer to eat at home tonight.
- I'd rather have tea than coffee.""",
        "tip": "Use 'would rather' + bare infinitive (without 'to'): I'd rather go, not I'd rather to go",
        "questions": [
            ("Do you prefer working alone or in a team?", "I prefer working in a team because of the collaboration."),
            ("Would you rather live in a city or countryside?", "I'd rather live in a city for the opportunities."),
            ("Do you prefer reading books or watching movies?", "I prefer reading books to watching movies."),
            ("Would you prefer to eat out or cook at home?", "I'd prefer to cook at home - it's healthier."),
            ("Do you prefer summer or winter?", "I prefer summer to winter because I love warm weather."),
            ("Would you rather have more time or more money?", "I'd rather have more time than more money."),
            ("Do you prefer coffee or tea?", "I prefer tea to coffee in the afternoon."),
            ("Would you prefer a beach vacation or mountain trip?", "I'd prefer a beach vacation to relax."),
            ("Do you prefer texting or calling?", "I prefer texting for quick messages."),
            ("Would you rather work from home or in an office?", "I'd rather work from home for the flexibility."),
        ]
    },
    136: {
        "title": "Narratives – Sequencing Words",
        "description": "Learn to tell stories using appropriate sequencing words",
        "intro": """In this module, you will learn sequencing words for narratives.

Sequencing words:
Beginning: First, Initially, At first, To begin with
Middle: Then, Next, After that, Subsequently, Meanwhile
End: Finally, Eventually, In the end, Ultimately

Time expressions:
- as soon as, while, when, before, after, until

Examples:
- First, I woke up late. Then, I rushed to work. Finally, I arrived just in time.
- Initially, I was nervous. However, after a while, I felt confident.""",
        "tip": "Vary your sequencing words to make stories more interesting - don't always use 'then'",
        "questions": [
            ("Tell me about your morning routine.", "First, I wake up at 6:30. Then, I take a shower. After that, I have breakfast. Finally, I leave for work."),
            ("Describe how you learned to drive.", "Initially, I was very nervous. Then, I practiced in empty parking lots. Eventually, I felt confident enough for the road."),
            ("What happened on your last vacation?", "First, we flew to Barcelona. Next, we checked into our hotel. Then, we explored the Gothic Quarter. Finally, we had dinner at a local restaurant."),
            ("How did you meet your best friend?", "To begin with, we were in the same class. Then, we discovered common interests. Eventually, we became close friends."),
            ("Describe a challenging experience.", "At first, I didn't know how to solve the problem. Then, I researched solutions. After that, I tried different approaches. Finally, I succeeded."),
            ("Tell me about learning a new skill.", "Initially, it was very difficult. However, I practiced every day. Subsequently, I improved gradually. In the end, I mastered it."),
            ("What happened at your job interview?", "First, I arrived early. Then, I met the interviewer. After that, we discussed my experience. Finally, they offered me the position."),
            ("Describe planning an event.", "To begin with, we chose a date. Next, we made a guest list. Then, we booked the venue. Eventually, everything was ready."),
            ("Tell me about a time you got lost.", "First, I realized I was in the wrong area. Then, I asked for directions. After that, I used my phone's GPS. Finally, I found my way."),
            ("How did you choose your career?", "Initially, I wasn't sure. Then, I explored different fields. Eventually, I discovered my passion. In the end, I made my decision."),
        ]
    },
    137: {
        "title": "Linking Words – Contrast, Addition, Result",
        "description": "Learn linking words to connect ideas in speaking and writing",
        "intro": """In this module, you will learn linking words for different purposes.

Contrast: but, however, although, despite, whereas
Addition: and, also, moreover, furthermore, in addition
Result: so, therefore, consequently, as a result, thus
Reason: because, since, as, due to

Examples:
- I like coffee, but I prefer tea.
- She studied hard; therefore, she passed the exam.
- Although it was raining, we went out.""",
        "tip": "Use linking words to make your speech and writing more cohesive and professional",
        "questions": [
            ("What do you like and dislike about your job?", "I enjoy the creative work; however, the long hours are challenging."),
            ("Why did you choose your current city?", "I moved here because of job opportunities. Moreover, the quality of life is excellent."),
            ("Describe your eating habits.", "I try to eat healthy. However, I sometimes indulge in desserts."),
            ("What are your plans if you have time?", "I'll finish work first. Then, I'll relax. In addition, I might watch a movie."),
            ("How has technology affected your life?", "Technology has made communication easier. On the other hand, it can be distracting."),
            ("Why do you study English?", "I study English for career advancement. Furthermore, it helps me travel."),
            ("What happened when you were late?", "I missed my bus. Consequently, I had to take a taxi."),
            ("Compare city and country living.", "Cities offer more opportunities, whereas the countryside is more peaceful."),
            ("Why do you exercise?", "I exercise to stay healthy. Also, it helps reduce stress."),
            ("What's your opinion on online shopping?", "Online shopping is convenient. However, you can't try products before buying."),
        ]
    },
    138: {
        "title": "Describing Experiences and Narratives",
        "description": "Learn to describe personal experiences vividly and engagingly",
        "intro": """In this module, you will learn how to describe experiences and create engaging narratives.

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
- What struck me most was...""",
        "tip": "Use a variety of past tenses and descriptive adjectives to make stories come alive",
        "questions": [
            ("Tell me about a memorable trip.", "Last summer, I visited Iceland. It was an amazing experience. The landscapes were breathtaking, and I felt incredibly peaceful."),
            ("Describe a challenging situation you overcame.", "When I first moved abroad, I felt overwhelmed. However, I gradually adapted, and it became the most rewarding experience of my life."),
            ("What's the most exciting thing that's happened to you?", "The most exciting thing was skydiving. At first, I was terrified, but once I jumped, it was exhilarating."),
            ("Tell me about learning something new.", "Learning to cook was frustrating initially. I made many mistakes, but eventually, I created dishes I was proud of."),
            ("Describe your first day at work or school.", "On my first day, I was extremely nervous. Everyone was friendly, though, and by the end of the day, I felt welcomed."),
            ("What's a funny experience you remember?", "Once, I accidentally went to the wrong wedding. I realized my mistake when I didn't recognize anyone. It was embarrassing but hilarious."),
            ("Tell me about a time you helped someone.", "I once helped a lost tourist find their hotel. They were so grateful, and it felt good to assist them."),
            ("Describe a cultural experience.", "Attending a traditional tea ceremony in Japan was fascinating. The attention to detail was remarkable."),
            ("What's the most beautiful place you've seen?", "The Northern Lights in Norway were stunning. I was speechless - the colors dancing across the sky were magical."),
            ("Tell me about meeting someone important.", "When I met my mentor, I immediately felt inspired. Their wisdom and encouragement changed my perspective on my career."),
        ]
    },
    139: {
        "title": "Cause and Effect",
        "description": "Learn to express cause and effect relationships",
        "intro": """In this module, you will learn how to express cause and effect.

Expressing cause:
- because, since, as, due to, owing to, thanks to

Expressing effect:
- so, therefore, consequently, as a result, thus

Structure:
- Because + clause: Because it rained, we stayed home.
- Due to + noun: Due to rain, we stayed home.

Examples:
- I was tired because I worked all day.
- It was raining, so we canceled the picnic.""",
        "tip": "'Because' is followed by a clause; 'because of' is followed by a noun",
        "questions": [
            ("Why were you late today?", "I was late because there was heavy traffic on the highway."),
            ("What caused you to change careers?", "I changed careers due to lack of job satisfaction in my previous field."),
            ("Why do you exercise regularly?", "I exercise regularly because it improves my health and mood."),
            ("What was the result of your hard work?", "I worked hard all semester; consequently, I received excellent grades."),
            ("Why did you move to a new city?", "I moved because of a job opportunity."),
            ("What happened after you learned English?", "I learned English; as a result, I got promoted at work."),
            ("Why do people use social media?", "People use social media because they want to stay connected with friends."),
            ("What are the effects of climate change?", "Due to climate change, we're experiencing more extreme weather events."),
            ("Why do you prefer working from home?", "I prefer working from home since it eliminates commute time and increases productivity."),
            ("What happened thanks to your preparation?", "Thanks to thorough preparation, my presentation was successful."),
        ]
    },
    140: {
        "title": "Talking about Purpose",
        "description": "Learn to express purpose and intention",
        "intro": """In this module, you will learn how to express purpose.

Structures:
- to + infinitive: I went to the store to buy milk.
- in order to + infinitive: She studies hard in order to pass.
- so that + clause: I left early so that I wouldn't be late.
- for + noun/-ing: This tool is for cutting.

Examples:
- I'm learning English to improve my career.
- We arrived early in order to get good seats.
- I saved money so that I could buy a car.""",
        "tip": "'To + infinitive' is the most common way to express purpose in everyday English",
        "questions": [
            ("Why are you learning English?", "I'm learning English to communicate better in my international job."),
            ("What's the purpose of your morning routine?", "I follow a morning routine in order to start my day productively."),
            ("Why do you exercise?", "I exercise to stay healthy and reduce stress."),
            ("What do you save money for?", "I save money so that I can travel and have financial security."),
            ("Why did you move to this city?", "I moved here to pursue better career opportunities."),
            ("What's the goal of your current project?", "This project aims to improve customer satisfaction in order to increase retention."),
            ("Why do you read regularly?", "I read regularly to expand my knowledge and improve my vocabulary."),
            ("What do you use your smartphone for?", "I use my smartphone for communication, work, and entertainment."),
            ("Why do you attend networking events?", "I attend networking events in order to meet professionals in my field."),
            ("What's your purpose in life?", "My purpose is to help others and make a positive impact so that I can leave the world better than I found it."),
        ]
    },
})

def generate_typescript_module(module_num, data):
    """Generate TypeScript const for a module"""
    questions_ts = ",\n    ".join([
        f'{{ question: "{q}", answer: "{a}" }}'
        for q, a in data["questions"]
    ])

    return f'''const MODULE_{module_num}_DATA = {{
  title: "{data["title"]}",
  description: "{data["description"]}",
  intro: `{data["intro"]}`,
  tip: "{data["tip"]}",

  table: [],

  listeningExamples: [
    "Listen to how we use {data['title'].lower()} in conversation.",
    "Pay attention to the structure and natural pronunciation.",
    "Practice repeating these examples to improve your fluency."
  ],

  speakingPractice: [
    {questions_ts}
  ]
}};

'''

# Generate all modules
output = ""
for module_num in range(121, 141):
    if module_num in MODULES:
        output += generate_typescript_module(module_num, MODULES[module_num])

# Write to file
with open("../modules_121_140_unique.ts", 'w', encoding='utf-8') as f:
    f.write(output)

print(f"SUCCESS: Generated unique modules 121-140")
print(f"Output: modules_121_140_unique.ts")
print(f"Modules generated: {len(MODULES)}")
