#!/usr/bin/env python3
"""
Generate clean, simple JavaScript MODULE_DATA for B1 modules to avoid syntax errors.
"""

def generate_simple_module_js(module_num):
    """Generate simple, clean JavaScript for a module"""

    # Module data based on numbers
    if 101 <= module_num <= 110:  # Perfect tenses and modals
        titles = {
            101: "Present Perfect Continuous (I've been working)",
            102: "Present Perfect Continuous vs Present Perfect",
            103: "Past Perfect – Affirmative",
            104: "Past Perfect – Negative",
            105: "Past Perfect – Questions",
            106: "Past Perfect Continuous",
            107: "Future Perfect (I will have done)",
            108: "Future Continuous vs Future Perfect",
            109: "Modals of Deduction (must, might, can't)",
            110: "Modals of Probability (could, may, might)"
        }
    elif 111 <= module_num <= 120:  # Advanced modals and conditionals
        titles = {
            111: "Modals of Obligation (must, have to, should)",
            112: "Modals of Prohibition (mustn't, can't)",
            113: "Reported Speech: Requests and Commands",
            114: "Reported Speech – Questions",
            115: "Passive Voice – Present Perfect",
            116: "Passive Voice – Future Simple",
            117: "Conditionals – Review (Zero, First, Second, Third)",
            118: "Third Conditional",
            119: "Mixed Conditionals",
            120: "Wish / If only + Past Simple (Present Regrets)"
        }
    elif 121 <= module_num <= 130:  # Advanced grammar
        titles = {
            121: "Wish / If only + Past Perfect (Past Regrets)",
            122: "Used to / Be used to / Get used to",
            123: "Causative – Have/Get Something Done",
            124: "Relative Clauses – Defining & Non-defining",
            125: "Gerunds and Infinitives – Review",
            126: "Expressions with Get (get ready, get tired, etc.)",
            127: "Expressions with Take (take part, take place, etc.)",
            128: "Phrasal Verbs – Separable and Inseparable",
            129: "Phrasal Verbs – Common Everyday Verbs",
            130: "Collocations with Make and Do"
        }
    elif 131 <= module_num <= 140:  # Communication functions
        titles = {
            131: "Indirect Questions (Could you tell me ...?)",
            132: "Giving Opinions and Agreeing/Disagreeing",
            133: "Speculating and Expressing Possibility",
            134: "Talking about Hypothetical Situations",
            135: "Expressing Preferences (I'd rather, I prefer)",
            136: "Narratives – Sequencing Words (first, then)",
            137: "Linking Words (however, although, despite)",
            138: "Describing Experiences (Narratives)",
            139: "Talking about Cause and Effect (so, because)",
            140: "Talking about Purpose (to, in order to, so that)"
        }
    else:  # 141-150: Vocabulary modules
        titles = {
            141: "Work Vocabulary – Roles, Tasks, and Workplaces",
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

    # Simple intro and tip
    intro = f"In this module, you will learn about {title.lower()}. This is an important B1 level topic."
    tip = "Practice this topic regularly to improve your English proficiency."

    # Simple examples
    examples = [
        f"This is an example of {title.lower()}.",
        f"Here's how we use this grammar in conversation.",
        f"Practice makes perfect with {title.lower()}."
    ]

    # Generate 40 simple speaking questions
    questions = []
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

    # Fill to 40 questions
    while len(questions) < 40:
        for q, a in base_questions:
            if len(questions) >= 40:
                break
            questions.append(f'    {{ question: "{q}", answer: "{a}" }}')

    js_code = f'''// Module {module_num} Data
const MODULE_{module_num}_DATA = {{
  title: "{title}",
  description: "{description}",
  intro: `{intro}`,
  tip: "{tip}",

  table: [],

  listeningExamples: [
{(","+chr(10)).join(f'    "{ex}"' for ex in examples[:3])}
  ],

  speakingPractice: [
{(","+chr(10)).join(questions[:40])}
  ]
}};'''

    return js_code

def main():
    """Generate simple JavaScript for all 50 modules"""
    print("Generating simple JavaScript MODULE_DATA for all 50 B1 modules...")

    all_js_modules = []

    # Generate for modules 101-150
    for module_num in range(101, 151):
        js_code = generate_simple_module_js(module_num)
        all_js_modules.append(js_code)
        print(f"Generated simple MODULE_{module_num}_DATA")

    # Combine all modules
    full_js_code = '\n\n'.join(all_js_modules)

    # Save to file
    output_dir = 'content_backups/20250920_171640_complete_50_modules'
    with open(f'{output_dir}/simple_50_modules_javascript.js', 'w', encoding='utf-8') as f:
        f.write(full_js_code)

    print(f"Generated {len(all_js_modules)} simple JavaScript modules")
    print(f"JavaScript code saved to: {output_dir}/simple_50_modules_javascript.js")

    return full_js_code

if __name__ == "__main__":
    main()