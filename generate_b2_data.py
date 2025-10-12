#!/usr/bin/env python3
"""
Generate B2ModulesData.ts from modules_151-160.json
This script creates TypeScript module constants with beautiful formatting
matching the style of A1/A2/B1 modules (like Module 101)
"""

import json

# Read the JSON file
with open('C:/Users/Mohammad/Downloads/modules_151-160.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Start building the TypeScript file
output = '''// B2 Level Module Data (Modules 151-160)
// Generated from database content
// Beautiful emoji-based formatting matching A1/A2/B1 style
// Total: 404 Q&A pairs across 10 advanced B2 modules

'''

# Process each module
for module in data['modules']:
    module_num = module['module_number']
    title = module['title']
    topic_explanation = module.get('topic_explanation', '')

    # Build the intro text with proper newlines (not escaped)
    objectives = module.get('lesson_objectives', [])
    structures = module.get('structures', [])
    examples = module.get('examples', [])
    time_expressions = module.get('time_expressions', [])

    intro_lines = []

    # Add lesson objectives section with emoji
    if objectives:
        intro_lines.append("📘 Lesson Objectives")
        for obj in objectives:
            intro_lines.append(f"✅ {obj}")
        intro_lines.append("")  # Blank line

    # Add topic explanation
    if topic_explanation:
        intro_lines.append("📗 Grammar Explanation")
        intro_lines.append(topic_explanation)
        intro_lines.append("")  # Blank line

    # Add structures section with emoji
    if structures:
        intro_lines.append("🧩 Structure")
        for struct in structures:
            intro_lines.append(f"✅ {struct}")
        intro_lines.append("")  # Blank line

    # Add examples section with emoji
    if examples:
        intro_lines.append("🧠 Example Sentences")
        for example in examples:
            intro_lines.append(f"• {example}")
        intro_lines.append("")  # Blank line

    # Add time expressions if present
    if time_expressions:
        intro_lines.append("⏰ Time Expressions")
        intro_lines.append(", ".join(time_expressions))

    # Join with newlines and create intro text
    intro_text = "\n".join(intro_lines)

    # Escape backticks and dollar signs for template literal
    intro_text = intro_text.replace('`', '\\`').replace('${', '\\${')

    # Get Q&A pairs and extract first 7 answers for listening examples
    qa_pairs = module.get('speaking_qa', [])
    listening_examples = [qa['a'] for qa in qa_pairs[:7]]  # First 7 answers

    # Start module constant with proper template literal
    output += f'''// Module {module_num} Data: {title}
const MODULE_{module_num}_DATA = {{
  title: "{title}",
  description: "{title}",
  intro: `{intro_text}`,
  listeningExamples: [
'''

    # Add listening examples
    for i, example in enumerate(listening_examples):
        escaped_example = example.replace('\\', '\\\\').replace('"', '\\"')
        comma = ',' if i < len(listening_examples) - 1 else ''
        output += f'    "{escaped_example}"{comma}\n'

    output += '''  ],
  speakingPractice: [
'''

    # Add all Q&A pairs
    for i, qa in enumerate(qa_pairs):
        question = qa['q'].replace('\\', '\\\\').replace('"', '\\"')
        answer = qa['a'].replace('\\', '\\\\').replace('"', '\\"')

        comma = ',' if i < len(qa_pairs) - 1 else ''
        output += f'    {{ question: "{question}", answer: "{answer}" }}{comma}\n'

    output += '''  ]
};

'''

# Add export statement at the end
output += '''// Export all B2 module data
export {
  MODULE_151_DATA,
  MODULE_152_DATA,
  MODULE_153_DATA,
  MODULE_154_DATA,
  MODULE_155_DATA,
  MODULE_156_DATA,
  MODULE_157_DATA,
  MODULE_158_DATA,
  MODULE_159_DATA,
  MODULE_160_DATA
};
'''

# Write to file
output_path = 'C:/Users/Mohammad/Downloads/tomass-main/tomass-main/src/components/B2ModulesData.ts'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(output)

print(f"[OK] Generated {output_path}")
print(f"[OK] Total modules: {len(data['modules'])}")
print(f"[OK] Total Q&A pairs: {sum(len(m.get('speaking_qa', [])) for m in data['modules'])}")
print("[OK] Added listeningExamples (first 7 answers from each module)")
print("[OK] Beautiful emoji-based formatting with REAL newlines applied!")
