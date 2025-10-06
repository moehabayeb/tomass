#!/usr/bin/env python3
"""
Remove corrupted term entries from LessonsApp.tsx
Pattern: { term: ', definition: '' },
"""

import re
import codecs

def remove_corrupted_entries(file_path):
    """Remove lines with corrupted term entries"""

    # Read the file with UTF-8 encoding
    with codecs.open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Pattern to match corrupted entries
    pattern = re.compile(r"^\s*{\s*term:\s*',\s*definition:\s*''\s*},\s*$")

    # Filter out corrupted lines
    cleaned_lines = []
    removed_count = 0

    for line in lines:
        if pattern.match(line):
            removed_count += 1
            print(f"Removing line: {line.strip()}")
        else:
            cleaned_lines.append(line)

    # Write back the cleaned content
    with codecs.open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(cleaned_lines)

    return removed_count

if __name__ == '__main__':
    file_path = 'tomass-main/src/components/LessonsApp.tsx'
    removed = remove_corrupted_entries(file_path)

    if removed > 0:
        print(f"\n[SUCCESS] Removed {removed} corrupted entries from LessonsApp.tsx")
    else:
        print("\n[WARN] No corrupted entries found")
