#!/usr/bin/env python3
"""Count questions in each module"""
import re
import sys

files = [
    'src/components/A1A2B1ModulesData.ts',
    'src/components/B2ModulesData.ts',
    'src/components/C1ModulesData.ts',
    'src/components/C2ModulesData.ts'
]

all_wrong = []

for filepath in files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        continue

    print(f"\nAnalyzing {filepath}...")

    # Find all modules
    modules = list(re.finditer(r'const MODULE_(\d+)_DATA\s*=\s*{', content))

    for i, match in enumerate(modules):
        module_num = int(match.group(1))
        start_pos = match.end()

        # Find end of this module
        if i + 1 < len(modules):
            end_pos = modules[i + 1].start()
        else:
            # Last module - find export statement
            export_match = re.search(r'^export \{', content[start_pos:], re.MULTILINE)
            end_pos = start_pos + export_match.start() if export_match else len(content)

        module_content = content[start_pos:end_pos]

        # Count question IDs
        questions = re.findall(r"id:\s*['\"]([^'\"]+)['\"]", module_content)
        count = len(questions)

        if count != 40:
            diff = count - 40
            all_wrong.append((module_num, count, diff))
            status = "MISSING" if diff < 0 else "EXTRA  "
            print(f"  {status}: Module {module_num:3d} has {count:2d} questions (diff: {diff:+3d})")

print("\n" + "="*70)
print(f"SUMMARY: {len(all_wrong)} modules with wrong question counts")
print("="*70)

if all_wrong:
    all_wrong.sort(key=lambda x: abs(x[2]), reverse=True)
    print("\nTop issues (by severity):")
    for module_num, count, diff in all_wrong[:15]:
        action = f"ADD {abs(diff)}" if diff < 0 else f"REMOVE {diff}"
        print(f"  Module {module_num:3d}: {count:2d}/40 → {action:12s}")
