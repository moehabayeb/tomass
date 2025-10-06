#!/usr/bin/env python3
"""
Update B1 modules in LessonsApp.tsx with enhanced content that has proper table data.
"""

import re

def main():
    """Update B1 modules with enhanced content"""

    # Read the current LessonsApp.tsx
    lessons_file = "tomass-main/src/components/LessonsApp.tsx"
    with open(lessons_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Read the enhanced modules
    with open('enhanced_b1_modules.js', 'r', encoding='utf-8') as f:
        enhanced_modules = f.read()

    print("Updating B1 modules with enhanced content...")

    # Find the start of B1 modules (after A2 modules end)
    start_pattern = r'// B1 Level Module Data.*?\n\n// Module 101 Data\nconst MODULE_101_DATA = \{'
    start_match = re.search(start_pattern, content, re.DOTALL)

    if not start_match:
        print("Could not find start of B1 modules")
        return False

    # Find where B1 modules end (before validateModuleData function)
    end_pattern = r'\]\s*\n\}\;\s*\n\s*// Function to validate module data before navigation'
    end_match = re.search(end_pattern, content[start_match.start():])

    if not end_match:
        print("Could not find end of B1 modules")
        return False

    # Calculate actual positions
    start_pos = start_match.start()
    end_pos = start_match.start() + end_match.start() + len("};")

    # Extract parts
    before_modules = content[:start_pos]
    after_modules = content[end_pos:]

    # Create new content
    modules_header = "// Complete B1 Level Module Data (101-150) - Enhanced with proper table structure\n\n"
    new_content = before_modules + modules_header + enhanced_modules + '\n\n' + after_modules

    # Write the updated file
    with open(lessons_file, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print("Successfully updated B1 modules with enhanced content")
    print("- Added proper table data for grammar lessons")
    print("- Enhanced intro text with grammar explanations")
    print("- Improved examples and vocabulary")

    return True

if __name__ == "__main__":
    success = main()
    if success:
        print("\n✅ B1 content enhancement successful!")
    else:
        print("\n❌ Failed to enhance B1 content")