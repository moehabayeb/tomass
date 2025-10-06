#!/usr/bin/env python3
"""
Generate complete JavaScript MODULE_DATA for all 50 B1 modules with improved questions.
"""

import json
import re

def clean_question(question):
    """Clean up malformed questions"""
    if not question or len(question) < 5:
        return None

    # Remove line breaks and extra characters
    question = re.sub(r'[\n\r]+', ' ', question)
    question = re.sub(r'\s+', ' ', question)
    question = question.strip()

    # Skip if too short or doesn't contain proper question structure
    if len(question) < 10 or '?' not in question:
        return None

    # Skip broken fragments
    if question.startswith(('k?', '→', '2.', '3.')) or 'teache' in question.lower():
        return None

    return question

def generate_vocabulary_questions(module_num, topic):
    """Generate topic-specific vocabulary questions"""
    topic_lower = topic.lower()

    if 'work' in topic_lower or 'job' in topic_lower:
        return [
            {"question": "What is your dream job?", "answer": "My dream job would be in education or technology."},
            {"question": "Do you prefer working in an office or remotely?", "answer": "I prefer a flexible work environment."},
            {"question": "What skills are most important in the workplace?", "answer": "Communication and teamwork skills are essential."},
            {"question": "How do you handle work-related stress?", "answer": "I manage stress by staying organized and taking breaks."},
            {"question": "What motivates you to work hard?", "answer": "Learning new things and helping others motivates me."},
            {"question": "Do you think overtime work is necessary?", "answer": "Sometimes overtime is necessary, but balance is important."},
            {"question": "What makes a good boss?", "answer": "A good boss is supportive and gives clear direction."},
            {"question": "How important is job satisfaction?", "answer": "Job satisfaction is very important for happiness."},
            {"question": "Would you rather have job security or high salary?", "answer": "I would prefer a balance of both security and good pay."},
            {"question": "What workplace benefits matter most to you?", "answer": "Health insurance and professional development opportunities matter most."},
        ]
    elif 'education' in topic_lower or 'school' in topic_lower:
        return [
            {"question": "What subject did you enjoy most in school?", "answer": "I enjoyed language and science subjects the most."},
            {"question": "How do you prefer to learn new things?", "answer": "I prefer interactive learning with practical examples."},
            {"question": "What makes an excellent teacher?", "answer": "An excellent teacher is patient, knowledgeable, and inspiring."},
            {"question": "Do you think online education is effective?", "answer": "Online education can be effective with proper structure."},
            {"question": "What is the most important skill to learn?", "answer": "Critical thinking is the most important skill."},
            {"question": "How has education changed in recent years?", "answer": "Education has become more digital and accessible."},
            {"question": "What motivates students to study hard?", "answer": "Clear goals and supportive teachers motivate students."},
            {"question": "Should education be free for everyone?", "answer": "Yes, basic education should be accessible to all."},
            {"question": "How do you prepare for important exams?", "answer": "I prepare by making a study schedule and practicing regularly."},
            {"question": "What role does homework play in learning?", "answer": "Homework reinforces what we learn in class."},
        ]
    elif 'technology' in topic_lower:
        return [
            {"question": "How has technology changed your daily life?", "answer": "Technology has made communication and learning much easier."},
            {"question": "What is your favorite piece of technology?", "answer": "My smartphone is my most useful piece of technology."},
            {"question": "Do you think technology makes life better?", "answer": "Yes, when used properly, technology improves life quality."},
            {"question": "What concerns do you have about technology?", "answer": "I worry about privacy and screen time addiction."},
            {"question": "How do you learn to use new gadgets?", "answer": "I read instructions and watch tutorial videos."},
            {"question": "Should children use technology in school?", "answer": "Yes, but with proper guidance and limits."},
            {"question": "What technology will be important in the future?", "answer": "Artificial intelligence and renewable energy technology."},
            {"question": "How do you stay safe online?", "answer": "I use strong passwords and avoid suspicious websites."},
            {"question": "Do you prefer digital or paper books?", "answer": "I appreciate both, but digital books are more convenient."},
            {"question": "How has social media affected relationships?", "answer": "Social media helps us stay connected but can reduce face-to-face interaction."},
        ]
    elif 'environment' in topic_lower:
        return [
            {"question": "What environmental problems concern you most?", "answer": "Climate change and pollution concern me the most."},
            {"question": "How do you help protect the environment?", "answer": "I recycle, use public transport, and save energy."},
            {"question": "Should governments do more for the environment?", "answer": "Yes, governments should create stronger environmental policies."},
            {"question": "What can individuals do to help the planet?", "answer": "We can reduce waste, choose sustainable products, and educate others."},
            {"question": "Do you think renewable energy is the future?", "answer": "Yes, renewable energy is essential for our future."},
            {"question": "How has climate change affected your area?", "answer": "We have noticed more extreme weather patterns."},
            {"question": "What role do businesses play in environmental protection?", "answer": "Businesses should adopt sustainable practices and reduce emissions."},
            {"question": "Is it worth paying more for eco-friendly products?", "answer": "Yes, investing in the environment is worth the extra cost."},
            {"question": "How can cities become more environmentally friendly?", "answer": "Cities can improve public transport and create more green spaces."},
            {"question": "What environmental issue should we prioritize?", "answer": "We should prioritize reducing carbon emissions and plastic waste."},
        ]
    elif 'health' in topic_lower or 'fitness' in topic_lower:
        return [
            {"question": "How do you stay healthy?", "answer": "I exercise regularly, eat balanced meals, and get enough sleep."},
            {"question": "What is more important: diet or exercise?", "answer": "Both diet and exercise are equally important for health."},
            {"question": "How often do you visit the doctor?", "answer": "I have regular check-ups once or twice a year."},
            {"question": "What healthy habits do you recommend?", "answer": "I recommend drinking water, walking daily, and reducing stress."},
            {"question": "Do you think mental health is as important as physical health?", "answer": "Yes, mental health is just as important as physical health."},
            {"question": "How do you handle stress?", "answer": "I handle stress through exercise, meditation, and talking to friends."},
            {"question": "What foods do you consider healthy?", "answer": "Fresh fruits, vegetables, whole grains, and lean proteins are healthy."},
            {"question": "Is it difficult to maintain a healthy lifestyle?", "answer": "It requires effort, but small daily changes make it manageable."},
            {"question": "How has your approach to health changed over time?", "answer": "I've become more aware of the importance of preventive care."},
            {"question": "What advice would you give to someone starting a fitness routine?", "answer": "Start slowly, be consistent, and find activities you enjoy."},
        ]
    else:
        # Generic vocabulary questions
        return [
            {"question": f"How familiar are you with {topic_lower}?", "answer": f"I have a good understanding of {topic_lower}."},
            {"question": f"What interests you most about {topic_lower}?", "answer": f"I find the practical applications of {topic_lower} very interesting."},
            {"question": f"How often do you think about {topic_lower}?", "answer": f"I consider {topic_lower} quite regularly in daily life."},
            {"question": f"What would you like to learn more about regarding {topic_lower}?", "answer": f"I'd like to learn more about the latest developments in {topic_lower}."},
            {"question": f"How does {topic_lower} affect your daily life?", "answer": f"{topic_lower.title()} has a significant impact on how I live."},
            {"question": f"What are the benefits of understanding {topic_lower}?", "answer": f"Understanding {topic_lower} helps in many practical situations."},
            {"question": f"Do you discuss {topic_lower} with your friends?", "answer": f"Yes, I often have conversations about {topic_lower} with others."},
            {"question": f"How can knowledge of {topic_lower} help in the future?", "answer": f"This knowledge will be valuable for personal and professional growth."},
            {"question": f"What challenges are associated with {topic_lower}?", "answer": f"The main challenges involve staying informed about changes in {topic_lower}."},
            {"question": f"Would you recommend others to learn about {topic_lower}?", "answer": f"Yes, I think everyone should have basic knowledge of {topic_lower}."},
        ]

def generate_improved_questions(module_num, title, original_questions):
    """Generate improved speaking questions"""
    # Clean original questions first
    cleaned_questions = []
    for q_data in original_questions:
        question = clean_question(q_data.get('question', ''))
        if question:
            cleaned_questions.append({"question": question, "answer": q_data.get('answer', 'Yes, that is correct.')})

    # If we have fewer than 10 good questions, generate topic-specific ones
    if len(cleaned_questions) < 10:
        topic = title.split(' - ')[1] if ' - ' in title else 'B1 topic'

        if 141 <= module_num <= 150:  # Vocabulary modules
            topic_questions = generate_vocabulary_questions(module_num, topic)
            cleaned_questions.extend(topic_questions)
        else:  # Grammar modules
            grammar_questions = [
                {"question": "Can you explain this grammar rule?", "answer": "Yes, I can explain this grammar clearly."},
                {"question": "How often do you practice this structure?", "answer": "I practice this structure regularly."},
                {"question": "Do you find this grammar difficult?", "answer": "With practice, this grammar becomes easier."},
                {"question": "Can you give an example of this rule?", "answer": "Yes, I can provide a clear example."},
                {"question": "When do you use this grammar structure?", "answer": "I use this structure in formal and informal situations."},
                {"question": "How does this help your English?", "answer": "This grammar helps me express ideas more clearly."},
                {"question": "What is the most important point to remember?", "answer": "The most important point is understanding the context."},
                {"question": "Would you like to practice more?", "answer": "Yes, I would like more practice opportunities."},
                {"question": "How confident do you feel using this?", "answer": "I feel more confident with each practice session."},
                {"question": "What questions do you have about this topic?", "answer": "I understand the main concepts well now."},
            ]
            cleaned_questions.extend(grammar_questions)

    # Add generic B1 questions to reach 40
    generic_questions = [
        {"question": "How long have you been studying English?", "answer": "I have been studying English for several years."},
        {"question": "What motivates you to learn?", "answer": "I am motivated by the desire to communicate better."},
        {"question": "Do you practice English outside of class?", "answer": "Yes, I practice by reading and watching English content."},
        {"question": "What aspect of English do you find most challenging?", "answer": "I find pronunciation and grammar the most challenging."},
        {"question": "How do you remember new vocabulary?", "answer": "I remember vocabulary by using words in sentences."},
        {"question": "What are your goals for English learning?", "answer": "My goal is to become fluent and confident."},
        {"question": "Do you enjoy learning grammar?", "answer": "Grammar is challenging but important for accuracy."},
        {"question": "How do you practice speaking?", "answer": "I practice speaking by talking to myself and others."},
        {"question": "What resources help you learn English?", "answer": "Books, apps, and conversation practice help me learn."},
        {"question": "Would you recommend English learning to others?", "answer": "Yes, I would definitely recommend learning English."},
    ]

    # Combine all questions and limit to 40
    all_questions = cleaned_questions + generic_questions
    return all_questions[:40]

def escape_js_string(text):
    """Escape string for JavaScript with better handling"""
    if not text:
        return ""

    # Handle encoding issues
    text = str(text).encode('utf-8', errors='ignore').decode('utf-8')

    # JavaScript escaping - handle ALL problematic characters
    text = text.replace('\\', '\\\\')  # Must be first
    text = text.replace('"', '\\"')
    text = text.replace('\n', '\\n')   # Handle actual newlines
    text = text.replace('\r', '\\r')   # Handle carriage returns
    text = text.replace('\t', '\\t')
    text = text.replace('`', '\\`')
    text = text.replace("'", "\\'")

    return text

def generate_module_js_improved(module_num, data):
    """Generate improved JavaScript constant for a module"""

    title = escape_js_string(data.get('title', f'Module {module_num}'))
    description = escape_js_string(data.get('description', 'B1 level module'))
    intro = escape_js_string(data.get('intro', 'Module introduction'))
    tip = escape_js_string(data.get('tip', 'Grammar tip'))

    # Process speaking practice with improvements
    original_speaking = data.get('speakingPractice', [])
    improved_speaking = generate_improved_questions(module_num, data.get('title', ''), original_speaking)

    speaking_js_parts = []
    for q in improved_speaking:
        question = escape_js_string(q.get('question', ''))
        answer = escape_js_string(q.get('answer', ''))
        speaking_js_parts.append(f'    {{ question: "{question}", answer: "{answer}" }}')

    speaking_js = '[\n' + ',\n'.join(speaking_js_parts) + '\n  ]'

    # Process other fields
    examples = data.get('listeningExamples', [])
    examples_js_parts = [f'    "{escape_js_string(ex)}"' for ex in examples[:5]]
    examples_js = '[\n' + ',\n'.join(examples_js_parts) + '\n  ]' if examples_js_parts else '[]'

    tables = data.get('table', [])
    tables_js = '[]'  # Simplified for now

    js_code = f'''// Module {module_num} Data
const MODULE_{module_num}_DATA = {{
  title: "{title}",
  description: "{description}",
  intro: `{intro}`,
  tip: "{tip}",

  table: {tables_js},

  listeningExamples: {examples_js},

  speakingPractice: {speaking_js}
}};'''

    return js_code

def main():
    """Generate JavaScript for all 50 modules"""

    # Load the complete 50 modules data
    with open('content_backups/20250920_171640_complete_50_modules/b1_all_50_modules.json', 'r', encoding='utf-8') as f:
        modules_data = json.load(f)

    print("Generating JavaScript MODULE_DATA for all 50 B1 modules...")

    all_js_modules = []

    # Generate for modules 101-150
    for module_num in range(101, 151):
        if str(module_num) in modules_data:
            js_code = generate_module_js_improved(module_num, modules_data[str(module_num)])
            all_js_modules.append(js_code)
            print(f"Generated improved MODULE_{module_num}_DATA")
        else:
            print(f"Warning: Module {module_num} not found in data")

    # Combine all modules
    full_js_code = '\n\n'.join(all_js_modules)

    # Save to file
    output_dir = 'content_backups/20250920_171640_complete_50_modules'
    with open(f'{output_dir}/complete_50_modules_javascript.js', 'w', encoding='utf-8') as f:
        f.write(full_js_code)

    print(f"Generated {len(all_js_modules)} improved JavaScript modules")
    print(f"JavaScript code saved to: {output_dir}/complete_50_modules_javascript.js")

    return full_js_code

if __name__ == "__main__":
    main()