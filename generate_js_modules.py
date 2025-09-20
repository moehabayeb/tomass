#!/usr/bin/env python3
"""
Generate JavaScript MODULE_DATA constants from parsed B1 content.
"""

import json
import re

def escape_js_string(text):
    """Escape a string for JavaScript"""
    if not text:
        return ""

    # Replace problematic characters
    text = text.replace('\\', '\\\\')
    text = text.replace('"', '\\"')
    text = text.replace('\n', '\\n')
    text = text.replace('\r', '')
    text = text.replace('\t', '\\t')

    return text

def format_speaking_practice(questions):
    """Format speaking practice questions for JavaScript"""
    js_questions = []

    for q in questions:
        question = escape_js_string(q.get('question', ''))
        answer = escape_js_string(q.get('answer', ''))

        js_questions.append(f'    {{ question: "{question}", answer: "{answer}" }}')

    return '[\n' + ',\n'.join(js_questions) + '\n  ]'

def format_listening_examples(examples):
    """Format listening examples for JavaScript"""
    js_examples = []

    for example in examples:
        escaped = escape_js_string(example)
        js_examples.append(f'    "{escaped}"')

    return '[\n' + ',\n'.join(js_examples) + '\n  ]'

def format_table_data(table):
    """Format table data for JavaScript"""
    if not table:
        return '[]'

    js_rows = []
    for row in table:
        if isinstance(row, dict):
            # Handle dictionary format
            row_parts = []
            for key, value in row.items():
                escaped_key = escape_js_string(str(key))
                escaped_value = escape_js_string(str(value))
                row_parts.append(f'{escaped_key}: "{escaped_value}"')
            js_rows.append(f'    {{ {", ".join(row_parts)} }}')
        else:
            # Handle array format
            escaped_row = [f'"{escape_js_string(str(cell))}"' for cell in row]
            js_rows.append(f'    [{", ".join(escaped_row)}]')

    return '[\n' + ',\n'.join(js_rows) + '\n  ]'

def generate_module_js(module_num, data):
    """Generate JavaScript constant for a single module"""

    title = escape_js_string(data.get('title', f'Module {module_num}'))
    description = escape_js_string(data.get('description', 'B1 level module'))
    intro = escape_js_string(data.get('intro', 'Module introduction'))
    tip = escape_js_string(data.get('tip', 'Grammar tip'))

    table_js = format_table_data(data.get('table', []))
    listening_js = format_listening_examples(data.get('listeningExamples', []))
    speaking_js = format_speaking_practice(data.get('speakingPractice', []))

    js_code = f'''// Module {module_num} Data
const MODULE_{module_num}_DATA = {{
  title: "{title}",
  description: "{description}",
  intro: `{intro}`,
  tip: "{tip}",

  table: {table_js},

  listeningExamples: {listening_js},

  speakingPractice: {speaking_js}
}};'''

    return js_code

def main():
    """Generate all JavaScript modules"""

    # Load the improved parsed data
    with open('content_backups/20250920_164844_improved/b1_modules_improved.json', 'r', encoding='utf-8') as f:
        modules_data = json.load(f)

    print("Generating JavaScript MODULE_DATA constants...")

    all_js_modules = []

    # Generate for modules 101-140
    for module_num in range(101, 141):
        if str(module_num) in modules_data:
            js_code = generate_module_js(module_num, modules_data[str(module_num)])
            all_js_modules.append(js_code)
            print(f"Generated MODULE_{module_num}_DATA")
        else:
            print(f"Warning: Module {module_num} not found in data")

    # Combine all modules
    full_js_code = '\n\n'.join(all_js_modules)

    # Save to file
    with open('content_backups/20250920_164844_improved/b1_modules_javascript.js', 'w', encoding='utf-8') as f:
        f.write(full_js_code)

    print(f"Generated {len(all_js_modules)} JavaScript modules")
    print("JavaScript code saved to: content_backups/20250920_164844_improved/b1_modules_javascript.js")

    return full_js_code

if __name__ == "__main__":
    main()