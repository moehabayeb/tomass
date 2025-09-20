#!/usr/bin/env python3
"""
Update LessonsApp.tsx with the new B1 module content.
"""

import os
import re

def main():
    """Replace B1 modules in LessonsApp.tsx"""

    # Read the current LessonsApp.tsx
    lessons_file = "tomass-main/src/components/LessonsApp.tsx"
    with open(lessons_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Read the generated JavaScript modules
    js_file = "content_backups/20250920_164844_improved/b1_modules_javascript.js"
    with open(js_file, 'r', encoding='utf-8') as f:
        new_modules = f.read()

    print("Replacing B1 modules (101-140) in LessonsApp.tsx...")

    # Find the start of MODULE_101_DATA
    start_pattern = r'(// B1 Level Module Data.*?\n.*?\n.*?// Module 101 Data.*?\n)const MODULE_101_DATA = \{'

    # Find the end of MODULE_140_DATA
    end_pattern = r'const MODULE_140_DATA = createPlaceholderModuleData\(140, "B1", "B1 Final Assessment"\);'

    # Find the sections
    start_match = re.search(start_pattern, content, re.DOTALL)
    end_match = re.search(end_pattern, content)

    if not start_match or not end_match:
        print("Could not find B1 module section to replace")
        return False

    # Extract the parts
    before_modules = content[:start_match.end() - len('const MODULE_101_DATA = {')]
    after_modules = content[end_match.end():]

    # Combine with new modules
    new_content = before_modules + new_modules + '\n\n' + after_modules

    # Write the updated file
    with open(lessons_file, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print("Successfully updated LessonsApp.tsx with new B1 modules")
    return True

if __name__ == "__main__":
    success = main()
    if success:
        print("✅ B1 modules updated successfully")
    else:
        print("❌ Failed to update B1 modules")