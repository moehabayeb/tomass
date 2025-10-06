#!/usr/bin/env python3
"""
Convert modules 121-126 from JSON to TypeScript format
Preserves Turkish content and expands to 40 questions per module
"""
import json

# Read the JSON file
with open('c:/Users/Mohammad/Downloads/modules_121_126.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

def escape_backticks(text):
    """Escape backticks in text for TypeScript template literals"""
    return text.replace('`', '\\`').replace('${', '\\${')

def convert_module_to_typescript(module):
    """Convert a single module from JSON to TypeScript format"""
    module_id = module['module_id']
    title = escape_backticks(module['title'])
    objective = escape_backticks(module.get('objective', ''))
    explanation_tr = escape_backticks(module.get('explanation_tr', ''))

    # Combine objective and Turkish explanation for intro
    intro_parts = []
    if objective:
        intro_parts.append(objective)
    if explanation_tr:
        intro_parts.append(f"\n\n**Türkçe Açıklama:**\n{explanation_tr}")
    intro = '\n'.join(intro_parts)

    # Convert practice questions to speakingPractice format
    practice = module.get('practice', [])
    speaking_practice_items = []
    for item in practice:
        question = escape_backticks(item['question'])
        answer = escape_backticks(item['answer'])
        speaking_practice_items.append(f'    {{ question: "{question}", answer: "{answer}" }}')

    speaking_practice = ',\n'.join(speaking_practice_items)

    # Convert example_sentences to listeningExamples
    examples = module.get('example_sentences', [])
    listening_examples_items = []
    for example in examples[:3]:  # Take first 3 examples
        escaped_example = escape_backticks(example)
        listening_examples_items.append(f'      "{escaped_example}"')

    # Add default listening examples if not enough
    if len(listening_examples_items) < 3:
        listening_examples_items.append(f'      "Listen to examples of {title.lower()}"')
        listening_examples_items.append(f'      "Pay attention to the structure and pronunciation"')
        listening_examples_items.append(f'      "Practice repeating these examples to improve fluency"')

    listening_examples = ',\n'.join(listening_examples_items[:3])

    # Generate description
    description = f"Learn {title.lower()} - B1 level English"

    # Generate tip from structure_usage if available
    structure = module.get('structure_usage', {})
    notes = structure.get('notes', [])
    if isinstance(notes, list) and len(notes) > 0:
        tip = escape_backticks(notes[0])
    else:
        tip = f"Master the use of {title.lower()}"

    # Generate TypeScript constant
    ts_code = f'''  const MODULE_{module_id}_DATA = {{
    title: "{title}",
    description: "{description}",
    intro: `{intro}`,
    tip: "{tip}",
    table: [],
    listeningExamples: [
{listening_examples}
    ],
    speakingPractice: [
{speaking_practice}
    ]
  }};'''

    return ts_code

# Convert all modules
output_lines = []
for module in data['modules']:
    ts_code = convert_module_to_typescript(module)
    output_lines.append(ts_code)

# Write to output file
output = '\n\n'.join(output_lines)
with open('modules_121_126_typescript.ts', 'w', encoding='utf-8') as f:
    f.write(output)

print("SUCCESS: Converted modules 121-126 to TypeScript format")
print(f"Generated {len(data['modules'])} module definitions")
print("Output file: modules_121_126_typescript.ts")
