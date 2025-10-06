"""
B1 Module Content Generator
Generates authentic English learning content for modules 107-120 and 140-150
"""

import json

# Module 107: Future Perfect
MODULE_107 = {
    "title": "Future Perfect (B1)",
    "description": "Learn to use Future Perfect for actions that will be completed before a specific time",
    "intro": "Future Perfect, gelecekte belirli bir zamandan önce tamamlanmış olacak eylemleri anlatır.\n\n**Yapı:** will have + V3 (past participle)\n→ By 2030, I will have graduated. (2030'a kadar mezun olmuş olacağım)\n\n**Kullanım:** Gelecekteki bir zamandan önce tamamlanacak eylemleri ifade eder.",
    "tip": "Use Future Perfect to talk about something that will be finished before a specific time in the future.",
    "table": [
        {"form": "Affirmative", "structure": "will have + V3", "example": "I will have finished by 5 PM."},
        {"form": "Negative", "structure": "will not have + V3", "example": "She won't have arrived yet."},
        {"form": "Question", "structure": "Will + subject + have + V3?", "example": "Will you have eaten by then?"}
    ],
    "listeningExamples": [
        "By next year, I will have finished university.",
        "She will have completed the project by Friday.",
        "They will have moved to their new house by June.",
        "We will have learned 1000 words by the end of this course.",
        "He will have been here for five years next month."
    ],
    "speakingPractice": [
        {"question": "Will you have finished by 6 PM?", "answer": "Yes, I will have finished by then."},
        {"question": "What will you have done by tomorrow?", "answer": "I will have completed my homework."},
        {"question": "Will she have arrived by noon?", "answer": "Yes, she will have arrived."},
        {"question": "What will they have achieved?", "answer": "They will have built the house."},
        {"question": "Will we have learned everything?", "answer": "We will have learned the basics."},
        {"question": "What will he have done by Monday?", "answer": "He will have fixed the computer."},
        {"question": "Will you have graduated by next year?", "answer": "Yes, I will have graduated."},
        {"question": "What will she have cooked?", "answer": "She will have cooked dinner."},
        {"question": "Will they have moved by summer?", "answer": "Yes, they will have moved."},
        {"question": "What will you have read by then?", "answer": "I will have read five books."},
        {"question": "Will he have finished the report?", "answer": "Yes, he will have finished it."},
        {"question": "What will we have accomplished?", "answer": "We will have reached our goal."},
        {"question": "Will you have traveled by December?", "answer": "Yes, I will have visited Paris."},
        {"question": "What will she have written?", "answer": "She will have written a novel."},
        {"question": "Will they have completed the course?", "answer": "Yes, they will have completed it."},
        {"question": "What will he have learned?", "answer": "He will have learned to drive."},
        {"question": "Will you have saved enough money?", "answer": "Yes, I will have saved $5000."},
        {"question": "What will we have done by Sunday?", "answer": "We will have cleaned the whole house."},
        {"question": "Will she have recovered by then?", "answer": "Yes, she will have recovered."},
        {"question": "What will they have painted?", "answer": "They will have painted three rooms."},
        {"question": "Will you have prepared everything?", "answer": "Yes, I will have prepared everything."},
        {"question": "What will he have fixed?", "answer": "He will have fixed the car."},
        {"question": "Will we have eaten by 7?", "answer": "Yes, we will have eaten."},
        {"question": "What will she have decided?", "answer": "She will have decided on a university."},
        {"question": "Will they have returned by Friday?", "answer": "Yes, they will have returned."},
        {"question": "What will you have planted?", "answer": "I will have planted flowers."},
        {"question": "Will he have called by tonight?", "answer": "Yes, he will have called."},
        {"question": "What will we have organized?", "answer": "We will have organized the event."},
        {"question": "Will you have finished the book?", "answer": "Yes, I will have finished it."},
        {"question": "What will she have packed?", "answer": "She will have packed her suitcase."},
        {"question": "Will they have solved the problem?", "answer": "Yes, they will have solved it."},
        {"question": "What will he have built?", "answer": "He will have built a website."},
        {"question": "Will you have met everyone?", "answer": "Yes, I will have met everyone."},
        {"question": "What will we have discussed?", "answer": "We will have discussed the plan."},
        {"question": "Will she have left by 8 AM?", "answer": "Yes, she will have left."},
        {"question": "What will they have created?", "answer": "They will have created a prototype."},
        {"question": "Will you have watched the movie?", "answer": "Yes, I will have watched it."},
        {"question": "What will he have repaired?", "answer": "He will have repaired the roof."},
        {"question": "Will we have practiced enough?", "answer": "Yes, we will have practiced."},
        {"question": "What will she have chosen?", "answer": "She will have chosen a name."}
    ]
}

def generate_typescript_module(module_num, data):
    """Generate TypeScript constant for a module"""

    # Start with module definition
    ts = f"const MODULE_{module_num}_DATA = {{\n"
    ts += f'  title: "{data["title"]}",\n'
    ts += f'  description: "{data["description"]}",\n'
    ts += f'  intro: `{data["intro"]}`,\n'
    ts += f'  tip: "{data["tip"]}",\n'

    # Add table
    ts += "  table: [\n"
    for row in data["table"]:
        ts += "    { "
        ts += ", ".join([f'{k}: "{v}"' for k, v in row.items()])
        ts += " },\n"
    ts += "  ],\n"

    # Add listening examples
    ts += "  listeningExamples: [\n"
    for ex in data["listeningExamples"]:
        ts += f'    "{ex}",\n'
    ts += "  ],\n"

    # Add speaking practice
    ts += "  speakingPractice: [\n"
    for qa in data["speakingPractice"]:
        ts += f'    {{ question: "{qa["question"]}", answer: "{qa["answer"]}" }},\n'
    ts += "  ]\n"

    ts += "};\n"

    return ts

# Print Module 107
print("// Module 107 Data")
print(generate_typescript_module(107, MODULE_107))
print()

print("✅ Module 107 generated successfully!")
print("Copy the above code and use it to replace MODULE_107_DATA in LessonsApp.tsx.current")
