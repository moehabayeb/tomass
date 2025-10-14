#!/usr/bin/env python3
import re
import sys

def remove_listening_examples(file_path):
    """Remove all listeningExamples arrays from module data in a file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern to match listeningExamples arrays (handles multi-line arrays)
    pattern = r',?\s*listeningExamples:\s*\[[^\]]*\]'

    # Remove all occurrences
    modified_content = re.sub(pattern, '', content, flags=re.DOTALL)

    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(modified_content)

    print(f"[OK] Processed: {file_path}")

if __name__ == "__main__":
    files_to_process = [
        "tomass-main/src/components/B2ModulesData.ts",
        "tomass-main/src/components/LessonsApp.tsx"
    ]

    for file in files_to_process:
        try:
            remove_listening_examples(file)
        except Exception as e:
            print(f"[ERROR] Error processing {file}: {e}")

    print("\n[DONE] Listening examples removal complete!")
