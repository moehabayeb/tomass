#!/usr/bin/env python3
"""
Fix unterminated string constants in LessonsApp.tsx
Fixes 46 instances of malformed table definition entries
"""

import re
import codecs

def fix_unterminated_strings(file_path):
    """Fix unterminated string constants and corrupted entries"""

    # Read the file with UTF-8 encoding
    with codecs.open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Fix 1: Replace unterminated strings: definition: ' }, with definition: '' },
    # This fixes section header entries like { term: "👷 ROLES & PROFESSIONS", definition: ' },
    pattern1 = r"definition: '\s*},"
    replacement1 = r"definition: '' },"
    content = re.sub(pattern1, replacement1, content)
    matches1 = len(re.findall(pattern1, original_content))

    # Fix 2: Remove completely corrupted entries: { term: ', definition: ' },
    # These are broken placeholders with no actual content
    pattern2 = r"\s*{\s*term:\s*',\s*definition:\s*'\s*},\s*\n"
    replacement2 = ""
    content = re.sub(pattern2, replacement2, content)
    matches2 = len(re.findall(pattern2, original_content))

    # Write the fixed content back
    with codecs.open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"[OK] Fixed {matches1} unterminated string constants")
    print(f"[OK] Removed {matches2} corrupted term entries")
    print(f"[OK] Total fixes applied: {matches1 + matches2}")

    return matches1 + matches2

if __name__ == '__main__':
    file_path = 'tomass-main/src/components/LessonsApp.tsx'
    total_fixes = fix_unterminated_strings(file_path)

    if total_fixes > 0:
        print(f"\n[SUCCESS] Fixed {total_fixes} issues in LessonsApp.tsx")
    else:
        print("\n[WARN] No issues found (file may already be fixed)")
