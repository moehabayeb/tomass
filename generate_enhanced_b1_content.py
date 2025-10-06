#!/usr/bin/env python3
"""
Generate enhanced B1 module content with proper table data and rich content.
"""

def generate_b1_module_data(module_num):
    """Generate comprehensive B1 module data with proper table structure"""

    # Module data based on numbers
    if module_num == 101:
        return {
            "title": "Present Perfect Continuous (I've been working)",
            "description": "Learn the structure and use of the Present Perfect Continuous tense",
            "intro": """In this module, you will learn about the Present Perfect Continuous tense.

Grammar Rule:
The Present Perfect Continuous is used to show that something started in the past and has continued up until now.

Structure: have/has + been + verb-ing

Examples:
I have been working here for 5 years.
She has been studying English since 2020.
They have been living in London for 3 months.""",
            "tip": "Use 'have been + verb-ing' with I/you/we/they, and 'has been + verb-ing' with he/she/it",
            "table": [
                {"subject": "I", "verb": "have been working", "complement": "for 2 hours", "example": "I have been working for 2 hours."},
                {"subject": "You", "verb": "have been studying", "complement": "since morning", "example": "You have been studying since morning."},
                {"subject": "He", "verb": "has been running", "complement": "for 30 minutes", "example": "He has been running for 30 minutes."},
                {"subject": "She", "verb": "has been cooking", "complement": "all day", "example": "She has been cooking all day."},
                {"subject": "We", "verb": "have been waiting", "complement": "for an hour", "example": "We have been waiting for an hour."},
                {"subject": "They", "verb": "have been playing", "complement": "since 3 PM", "example": "They have been playing since 3 PM."}
            ],
            "listeningExamples": [
                "I have been working here for five years.",
                "She has been studying English since January.",
                "They have been living in this city for two months.",
                "We have been waiting for the bus for twenty minutes.",
                "He has been playing guitar since he was ten."
            ]
        }

    elif module_num == 102:
        return {
            "title": "Present Perfect Continuous vs Present Perfect",
            "description": "Understand the difference between Present Perfect and Present Perfect Continuous tenses",
            "intro": """In this module, you will learn the difference between Present Perfect and Present Perfect Continuous.

Present Perfect: Focuses on the result or completion
Present Perfect Continuous: Focuses on the duration or ongoing action

Examples:
Present Perfect: I have read the book. (finished)
Present Perfect Continuous: I have been reading the book. (still reading)""",
            "tip": "Use Present Perfect for completed actions, Present Perfect Continuous for ongoing actions",
            "table": [
                {"subject": "Present Perfect", "verb": "I have finished", "complement": "my homework", "example": "I have finished my homework."},
                {"subject": "Present Perfect Cont.", "verb": "I have been doing", "complement": "my homework", "example": "I have been doing my homework."},
                {"subject": "Present Perfect", "verb": "She has written", "complement": "three letters", "example": "She has written three letters."},
                {"subject": "Present Perfect Cont.", "verb": "She has been writing", "complement": "letters", "example": "She has been writing letters."},
                {"subject": "Present Perfect", "verb": "They have painted", "complement": "the house", "example": "They have painted the house."},
                {"subject": "Present Perfect Cont.", "verb": "They have been painting", "complement": "the house", "example": "They have been painting the house."}
            ],
            "listeningExamples": [
                "I have cleaned the kitchen. (finished)",
                "I have been cleaning the kitchen. (still cleaning)",
                "She has learned French. (completed)",
                "She has been learning French. (ongoing)",
                "We have built a new website. (finished)"
            ]
        }

    elif module_num == 103:
        return {
            "title": "Past Perfect – Affirmative",
            "description": "Learn how to form Past Perfect Tense in affirmative sentences",
            "intro": """In this module, you will learn the Past Perfect tense in affirmative form.

Grammar Rule:
The Past Perfect shows an action that happened before another action in the past.

Structure: had + past participle (3rd form)

Examples:
I had finished my work before he arrived.
She had already left when I called.
They had eaten dinner before the movie started.""",
            "tip": "Use 'had + past participle' for all subjects in Past Perfect",
            "table": [
                {"subject": "I", "verb": "had finished", "complement": "my work", "example": "I had finished my work before 5 PM."},
                {"subject": "You", "verb": "had studied", "complement": "English", "example": "You had studied English before moving to London."},
                {"subject": "He", "verb": "had left", "complement": "the office", "example": "He had left the office before the meeting."},
                {"subject": "She", "verb": "had cooked", "complement": "dinner", "example": "She had cooked dinner before guests arrived."},
                {"subject": "We", "verb": "had seen", "complement": "the movie", "example": "We had seen the movie before reading the book."},
                {"subject": "They", "verb": "had arrived", "complement": "early", "example": "They had arrived early for the appointment."}
            ],
            "listeningExamples": [
                "I had completed my project before the deadline.",
                "She had already graduated when I met her.",
                "We had booked the hotel before the prices increased.",
                "They had lived in Paris before moving to London.",
                "He had learned to drive before buying a car."
            ]
        }

    elif module_num == 141:  # Work vocabulary
        return {
            "title": "Work Vocabulary – Roles, Tasks, and Workplaces",
            "description": "Learn vocabulary related to common job roles, tasks, and workplaces",
            "intro": """In this module, you will learn essential vocabulary related to work, jobs, and professional life.

Key Areas:
• Job titles and roles
• Workplace locations
• Daily tasks and responsibilities
• Work-related activities

This vocabulary will help you discuss your career, describe your job, and talk about work in English.""",
            "tip": "Practice using work vocabulary in context by describing your own job or dream career",
            "table": [
                {"subject": "Job Titles", "verb": "manager", "complement": "supervises team", "example": "The manager supervises the team daily."},
                {"subject": "Job Titles", "verb": "engineer", "complement": "designs systems", "example": "The engineer designs new systems."},
                {"subject": "Workplace", "verb": "office", "complement": "business location", "example": "I work in a modern office downtown."},
                {"subject": "Workplace", "verb": "factory", "complement": "production site", "example": "The factory produces cars."},
                {"subject": "Tasks", "verb": "analyze", "complement": "examine data", "example": "I analyze sales data every week."},
                {"subject": "Tasks", "verb": "coordinate", "complement": "organize activities", "example": "She coordinates team meetings."}
            ],
            "listeningExamples": [
                "I work as a software developer in a tech company.",
                "The accountant manages the company's finances.",
                "Our team has a meeting every Monday morning.",
                "She got promoted to senior manager last year.",
                "The project deadline is next Friday."
            ]
        }

    # Generate basic structure for other modules
    else:
        # Get title and description based on module number
        titles = {
            104: "Past Perfect – Negative",
            105: "Past Perfect – Questions",
            106: "Past Perfect Continuous",
            107: "Future Perfect (I will have done)",
            108: "Future Continuous vs Future Perfect",
            109: "Modals of Deduction (must, might, can't)",
            110: "Modals of Probability (could, may, might)",
            111: "Modals of Obligation (must, have to, should)",
            112: "Modals of Prohibition (mustn't, can't)",
            113: "Reported Speech: Requests and Commands",
            114: "Reported Speech – Questions",
            115: "Passive Voice – Present Perfect",
            116: "Passive Voice – Future Simple",
            117: "Conditionals – Review (Zero, First, Second, Third)",
            118: "Third Conditional",
            119: "Mixed Conditionals",
            120: "Wish / If only + Past Simple (Present Regrets)",
            121: "Wish / If only + Past Perfect (Past Regrets)",
            122: "Used to / Be used to / Get used to",
            123: "Causative – Have/Get Something Done",
            124: "Relative Clauses – Defining & Non-defining",
            125: "Gerunds and Infinitives – Review",
            126: "Expressions with Get (get ready, get tired, etc.)",
            127: "Expressions with Take (take part, take place, etc.)",
            128: "Phrasal Verbs – Separable and Inseparable",
            129: "Phrasal Verbs – Common Everyday Verbs",
            130: "Collocations with Make and Do",
            131: "Indirect Questions (Could you tell me ...?)",
            132: "Giving Opinions and Agreeing/Disagreeing",
            133: "Speculating and Expressing Possibility",
            134: "Talking about Hypothetical Situations",
            135: "Expressing Preferences (I'd rather, I prefer)",
            136: "Narratives – Sequencing Words (first, then)",
            137: "Linking Words (however, although, despite)",
            138: "Describing Experiences (Narratives)",
            139: "Talking about Cause and Effect (so, because)",
            140: "Talking about Purpose (to, in order to, so that)",
            142: "Education Vocabulary – Schools and Universities",
            143: "Technology Vocabulary – Gadgets and Internet",
            144: "Environment Vocabulary – Problems and Solutions",
            145: "News and Media Vocabulary",
            146: "Personality and Character Vocabulary",
            147: "Crime and Law Vocabulary",
            148: "Health and Fitness Vocabulary",
            149: "Society and Social Issues Vocabulary",
            150: "Travel and Adventure Vocabulary"
        }

        title = titles.get(module_num, f"B1 Module {module_num}")
        description = f"Learn {title.lower()} - B1 level English"

        # Create basic table structure
        table_data = [
            {"subject": "Example 1", "verb": "structure", "complement": "usage", "example": f"This is example 1 for {title.lower()}."},
            {"subject": "Example 2", "verb": "pattern", "complement": "context", "example": f"This is example 2 for {title.lower()}."},
            {"subject": "Example 3", "verb": "form", "complement": "meaning", "example": f"This is example 3 for {title.lower()}."},
            {"subject": "Example 4", "verb": "application", "complement": "practice", "example": f"This is example 4 for {title.lower()}."}
        ]

        return {
            "title": title,
            "description": description,
            "intro": f"In this module, you will learn about {title.lower()}. This is an important B1 level topic that will help you communicate more effectively in English.",
            "tip": "Practice this topic regularly to improve your English proficiency.",
            "table": table_data,
            "listeningExamples": [
                f"This is an example of {title.lower()}.",
                f"Here's how we use {title.lower()} in conversation.",
                f"Practice makes perfect with {title.lower()}."
            ]
        }

def generate_speaking_questions(module_num, title):
    """Generate 40 speaking questions for each module"""
    questions = []

    # Base questions for all modules
    base_questions = [
        ("How often do you practice this grammar?", "I practice this grammar every day."),
        ("Do you find this topic difficult?", "With practice, it becomes easier."),
        ("Can you give an example?", "Yes, I can give a clear example."),
        ("How does this help your English?", "This grammar helps me communicate better."),
        ("What is the most important point?", "The most important point is understanding the structure."),
        ("How confident do you feel?", "I feel more confident with practice."),
        ("Would you like more practice?", "Yes, I would like more practice opportunities."),
        ("How long have you been studying English?", "I have been studying English for several years."),
        ("What motivates you to learn?", "I am motivated by the desire to communicate better."),
        ("Do you practice outside of class?", "Yes, I practice by reading and listening."),
        ("What is your learning goal?", "My goal is to become fluent and confident."),
        ("How do you remember new grammar?", "I remember by using it in sentences."),
        ("What helps you learn best?", "Interactive practice helps me learn best."),
        ("Do you enjoy learning grammar?", "Grammar is challenging but important."),
        ("How do you practice speaking?", "I practice by talking to myself and others."),
        ("What resources do you use?", "I use books, apps, and conversation practice."),
        ("Would you recommend this topic?", "Yes, I would recommend learning this grammar."),
        ("What is your favorite way to learn?", "I prefer learning with examples and practice."),
        ("How has your English improved?", "My English has improved through regular practice."),
        ("What advice would you give?", "I would advise practicing a little every day.")
    ]

    # Add specific questions for vocabulary modules (141-150)
    if 141 <= module_num <= 150:
        vocab_questions = [
            ("How important is this vocabulary in daily life?", "This vocabulary is very important for daily communication."),
            ("Where would you use these words?", "I would use these words in professional and social situations."),
            ("What's the most useful word you learned?", "The most useful word helps me express ideas clearly."),
            ("How do you practice new vocabulary?", "I practice by using new words in sentences."),
            ("Do you discuss these topics with friends?", "Yes, I often discuss these topics with friends."),
            ("How can this vocabulary help your career?", "This vocabulary can help me communicate professionally."),
            ("What's challenging about learning these words?", "The challenging part is remembering to use them naturally."),
            ("How do you remember new vocabulary?", "I remember by making word associations and examples."),
            ("Would you like to learn more about this topic?", "Yes, I would like to expand my vocabulary further."),
            ("How does this vocabulary relate to your interests?", "This vocabulary connects directly to my personal interests.")
        ]
        questions.extend(vocab_questions)

    # Add grammar-specific questions for modules 101-140
    else:
        grammar_questions = [
            ("When do you use this grammar structure?", "I use this structure when expressing specific meanings."),
            ("What's the difference between this and similar grammar?", "The difference is in the timing and emphasis."),
            ("How do you form questions with this grammar?", "I follow the specific question formation rules."),
            ("Can you make negative sentences?", "Yes, I can form negative sentences correctly."),
            ("What are common mistakes with this grammar?", "Common mistakes include incorrect verb forms."),
            ("How does this grammar sound in conversation?", "It sounds natural when used in the right context."),
            ("What situations require this grammar?", "This grammar is needed for specific time relationships."),
            ("How formal or informal is this structure?", "This structure can be used in both formal and informal contexts."),
            ("What verbs work best with this grammar?", "Action verbs and state verbs work differently."),
            ("How do you practice this grammar daily?", "I practice by creating examples from my own life.")
        ]
        questions.extend(grammar_questions)

    # Fill to 40 questions
    while len(questions) < 40:
        for q, a in base_questions:
            if len(questions) >= 40:
                break
            questions.append((q, a))

    return questions[:40]

def main():
    """Generate complete enhanced B1 modules"""
    print("Generating enhanced B1 module content...")

    all_modules = []

    # Generate enhanced data for key modules (101-103, 141)
    for module_num in [101, 102, 103, 141]:
        module_data = generate_b1_module_data(module_num)
        speaking_questions = generate_speaking_questions(module_num, module_data["title"])

        module_data["speakingPractice"] = [
            {"question": q, "answer": a} for q, a in speaking_questions
        ]

        js_code = f'''// Module {module_num} Data
const MODULE_{module_num}_DATA = {{
  title: "{module_data["title"]}",
  description: "{module_data["description"]}",
  intro: `{module_data["intro"]}`,
  tip: "{module_data["tip"]}",

  table: {str(module_data["table"]).replace("'", '"')},

  listeningExamples: {str(module_data["listeningExamples"]).replace("'", '"')},

  speakingPractice: [
{",".join([f'    {{ question: "{q}", answer: "{a}" }}' for q, a in speaking_questions])}
  ]
}};'''

        all_modules.append(js_code)
        print(f"Generated enhanced MODULE_{module_num}_DATA")

    # Generate basic enhanced data for remaining modules
    for module_num in range(104, 151):
        if module_num not in [141]:  # Skip already generated
            module_data = generate_b1_module_data(module_num)
            speaking_questions = generate_speaking_questions(module_num, module_data["title"])

            js_code = f'''// Module {module_num} Data
const MODULE_{module_num}_DATA = {{
  title: "{module_data["title"]}",
  description: "{module_data["description"]}",
  intro: `{module_data["intro"]}`,
  tip: "{module_data["tip"]}",

  table: {str(module_data["table"]).replace("'", '"')},

  listeningExamples: {str(module_data["listeningExamples"]).replace("'", '"')},

  speakingPractice: [
{",".join([f'    {{ question: "{q}", answer: "{a}" }}' for q, a in speaking_questions])}
  ]
}};'''

            all_modules.append(js_code)

    # Save to file
    output_content = '\n\n'.join(all_modules)
    with open('enhanced_b1_modules.js', 'w', encoding='utf-8') as f:
        f.write(output_content)

    print(f"Generated {len(all_modules)} enhanced B1 modules")
    print("Saved to: enhanced_b1_modules.js")

if __name__ == "__main__":
    main()