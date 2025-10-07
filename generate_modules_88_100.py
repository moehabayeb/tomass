#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate TypeScript module constants for modules 88-100
"""

import json
import re

def escape_typescript_string(text):
    """Escape special characters for TypeScript strings"""
    if not text:
        return ""
    # Replace backslashes first
    text = text.replace("\\", "\\\\")
    # Replace backticks
    text = text.replace("`", "\\`")
    # Replace ${
    text = text.replace("${", "\\${")
    return text

def generate_question_answer_pairs(module_data):
    """Generate 40 Q&A pairs based on vocabulary and module content"""
    pairs = []
    vocab_list = []

    # Extract all vocabulary items from different structures
    if "vocabulary" in module_data:
        vocab = module_data["vocabulary"]

        # Handle different vocabulary structures
        for key, items in vocab.items():
            if isinstance(items, list):
                vocab_list.extend(items)

    # Strategy: Create diverse questions using the vocabulary
    question_templates = [
        ("What does \"{word}\" mean in Turkish?", "It means \"{tr}\"."),
        ("Can you use \"{word}\" in a sentence?", "Yes, for example: I saw a {word} yesterday."),
        ("How do you say \"{tr}\" in English?", "You say \"{word}\"."),
        ("What is the English word for \"{tr}\"?", "The English word is \"{word}\"."),
        ("Do you know what \"{word}\" is?", "Yes, \"{word}\" is \"{tr}\" in Turkish."),
        ("Can you translate \"{word}\" to Turkish?", "Sure, it's \"{tr}\"."),
        ("What's another way to say \"{word}\"?", "You could also use a synonym depending on context."),
        ("Where might you use the word \"{word}\"?", "You might use it when talking about {context}."),
        ("Is \"{word}\" a noun or a verb?", "It depends on the context, but typically it's used as a noun."),
        ("Have you ever used \"{word}\" in conversation?", "Yes, I use it when I talk about {tr}."),
    ]

    # Generate 40 Q&A pairs
    template_idx = 0
    vocab_idx = 0

    for i in range(40):
        if vocab_idx < len(vocab_list):
            vocab_item = vocab_list[vocab_idx]
            template = question_templates[template_idx % len(question_templates)]

            # Get context from Turkish word
            tr_word = vocab_item.get("tr", "")
            en_word = vocab_item.get("en", "")

            # Determine context
            context = tr_word

            question = template[0].format(word=en_word, tr=tr_word, context=context)
            answer = template[1].format(word=en_word, tr=tr_word, context=context)

            pairs.append({"question": question, "answer": answer})

            vocab_idx += 1
            template_idx += 1
        else:
            # Cycle through vocabulary again with different templates
            vocab_idx = 0
            vocab_item = vocab_list[vocab_idx] if vocab_list else {"en": "example", "tr": "örnek"}
            template = question_templates[template_idx % len(question_templates)]

            tr_word = vocab_item.get("tr", "örnek")
            en_word = vocab_item.get("en", "example")
            context = tr_word

            question = template[0].format(word=en_word, tr=tr_word, context=context)
            answer = template[1].format(word=en_word, tr=tr_word, context=context)

            pairs.append({"question": question, "answer": answer})

            vocab_idx += 1
            template_idx += 1

    return pairs[:40]  # Ensure exactly 40

def create_answer_from_situation(situation):
    """Create a logical answer based on the situation"""
    situation_lower = situation.lower()

    # Shopping-related answers
    if "ask the price" in situation_lower or "ask how much" in situation_lower:
        return "How much is this?"
    elif "try on" in situation_lower:
        return "Can I try this on?"
    elif "smaller size" in situation_lower or "ask for a" in situation_lower and "size" in situation_lower:
        return "Do you have this in a smaller size?"
    elif "credit card" in situation_lower or "pay by" in situation_lower:
        return "Can I pay by credit card?"
    elif "just looking" in situation_lower:
        return "I'm just looking, thank you."
    elif "on sale" in situation_lower:
        return "Is this on sale?"
    elif "changing room" in situation_lower or "fitting room" in situation_lower:
        return "Where is the fitting room?"
    elif "too big" in situation_lower or "too small" in situation_lower:
        return "This is too big for me."
    elif "return" in situation_lower:
        return "I'd like to return this item."
    elif "refund" in situation_lower:
        return "Can I get a refund?"
    elif "discount" in situation_lower:
        return "Do you have any discounts?"
    elif "exchange" in situation_lower:
        return "I'd like to exchange this."

    # Health-related answers
    elif "headache" in situation_lower:
        return "I have a headache. I should take some medicine."
    elif "sore throat" in situation_lower:
        return "I have a sore throat. I should drink warm tea."
    elif "fever" in situation_lower:
        return "I have a fever. I need to rest."
    elif "cold" in situation_lower or "flu" in situation_lower:
        return "I have a cold. I should stay in bed and drink lots of water."
    elif "stomachache" in situation_lower:
        return "I have a stomachache. I should avoid heavy food."
    elif "cough" in situation_lower:
        return "I'm coughing a lot. I should take cough medicine."

    # Travel-related answers
    elif "go to school" in situation_lower:
        return "I go to school by bus every day."
    elif "buy a" in situation_lower and "ticket" in situation_lower:
        return "Where can I buy a ticket?"
    elif "traveling by plane" in situation_lower or "travel by plane" in situation_lower:
        return "I'm traveling by plane."
    elif "train arrives" in situation_lower or "train leaves" in situation_lower:
        return "What time does the train arrive?"
    elif "delayed" in situation_lower or "delay" in situation_lower:
        return "My flight is delayed."
    elif "platform" in situation_lower:
        return "Which platform does the train leave from?"
    elif "luggage" in situation_lower or "baggage" in situation_lower:
        return "I have heavy luggage."

    # Default answer based on situation structure
    elif situation.startswith("Ask"):
        # Convert "Ask..." to a question
        return situation.replace("Ask ", "").replace(".", "") + "?"
    elif situation.startswith("Say"):
        # Convert "Say..." to a statement
        return situation.replace("Say ", "").replace(".", "") + "."
    else:
        return "I understand the situation."

def generate_speaking_practice(module_data):
    """Generate speakingPractice array"""
    if "practice" in module_data and "items" in module_data["practice"]:
        items = module_data["practice"]["items"]

        # Convert situations to Q&A pairs
        pairs = []
        for item in items:
            situation = item.get("situation", "")
            # Create a question from the situation
            question = situation
            # Create a contextually appropriate answer
            answer = create_answer_from_situation(situation)

            pairs.append({"question": question, "answer": answer})

        # If we don't have exactly 40, generate more
        if len(pairs) < 40:
            pairs.extend(generate_question_answer_pairs(module_data))
            pairs = pairs[:40]

        return pairs
    else:
        # Generate from vocabulary
        return generate_question_answer_pairs(module_data)

def generate_table_data(module_data):
    """Generate table array from vocabulary"""
    table = []

    if "vocabulary" in module_data:
        vocab = module_data["vocabulary"]

        for key, items in vocab.items():
            if isinstance(items, list):
                for item in items:
                    if isinstance(item, dict) and "en" in item and "tr" in item:
                        table.append({"en": item["en"], "tr": item["tr"]})

    return table

def generate_listening_examples(module_data):
    """Generate listeningExamples array"""
    examples = []

    # Check for dialogue format (Module 88)
    if "usage_examples_dialogue" in module_data:
        dialogues = module_data["usage_examples_dialogue"]
        for dialogue in dialogues[:5]:  # Take first 5
            speaker = dialogue.get("speaker", "Speaker")
            text = dialogue.get("en", "")
            examples.append(f"{speaker}: {text}")
    # Check for regular usage examples
    elif "usage_examples" in module_data:
        usage_examples = module_data["usage_examples"]
        for example in usage_examples[:5]:  # Take first 5
            if isinstance(example, dict):
                en_text = example.get("en", "")
                if en_text:
                    examples.append(en_text)

    # If we don't have enough, create some from vocabulary
    if len(examples) < 3:
        table = generate_table_data(module_data)
        for item in table[:3]:
            examples.append(f"This is a {item['en']}.")

    return examples[:5]  # Max 5 examples

def generate_vocab_list(module_data):
    """Generate vocabulary list for intro section"""
    vocab_lines = []

    if "vocabulary" in module_data:
        vocab = module_data["vocabulary"]

        for key, items in vocab.items():
            if isinstance(items, list):
                for item in items:
                    if isinstance(item, dict) and "en" in item and "tr" in item:
                        vocab_lines.append(f"{item['en']} - {item['tr']}")

    return "\n".join(vocab_lines)

def generate_module_constant(module_data):
    """Generate TypeScript constant for a module"""
    module_num = module_data["module_number"]
    title = module_data.get("title", f"Module {module_num}")
    konu_anlatimi = module_data.get("konu_anlatimi_tr", "")

    # Generate components
    table = generate_table_data(module_data)
    listening_examples = generate_listening_examples(module_data)
    speaking_practice = generate_speaking_practice(module_data)
    vocab_list = generate_vocab_list(module_data)

    # Build intro section
    intro = f"""{konu_anlatimi}

📚 VOCABULARY:
{vocab_list}"""

    # Escape strings
    title_escaped = escape_typescript_string(title)
    intro_escaped = escape_typescript_string(intro)

    # Build TypeScript constant
    ts_code = f"""
const MODULE_{module_num}_DATA = {{
  title: "{title_escaped}",
  description: "Learn essential vocabulary and phrases",
  intro: `{intro_escaped}`,
  tip: "Practice using these words in context to remember them better.",

  table: [
"""

    # Add table entries
    for item in table:
        en_escaped = escape_typescript_string(item['en'])
        tr_escaped = escape_typescript_string(item['tr'])
        ts_code += f'    {{ en: "{en_escaped}", tr: "{tr_escaped}" }},\n'

    ts_code += """  ],

  listeningExamples: [
"""

    # Add listening examples
    for example in listening_examples:
        example_escaped = escape_typescript_string(example)
        ts_code += f'    "{example_escaped}",\n'

    ts_code += """  ],

  speakingPractice: [
"""

    # Add speaking practice
    for pair in speaking_practice:
        question_escaped = escape_typescript_string(pair['question'])
        answer_escaped = escape_typescript_string(pair['answer'])
        ts_code += f'    {{ question: "{question_escaped}", answer: "{answer_escaped}" }},\n'

    ts_code += """  ]
};
"""

    return ts_code

def main():
    # Read JSON file
    with open("c:/Users/Mohammad/Downloads/modules_88_100.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    modules = data["modules"]

    # Generate TypeScript code for all modules
    all_ts_code = "// A2 Level Modules (88-100)\n\n"

    for module in modules:
        print(f"Generating Module {module['module_number']}...")
        ts_code = generate_module_constant(module)
        all_ts_code += ts_code + "\n"

    # Write to file
    output_path = "C:/Users/Mohammad/Downloads/tomass-main/modules_88_100_generated.ts"
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(all_ts_code)

    print(f"\nGenerated TypeScript code saved to: {output_path}")
    print(f"Total modules generated: {len(modules)}")

if __name__ == "__main__":
    main()
