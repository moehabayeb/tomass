#!/usr/bin/env python3
"""
Clean update of LessonsApp.tsx with all 50 B1 modules - targeted replacement.
"""

import os
import re

def main():
    """Clean update of B1 modules"""

    # Read the current LessonsApp.tsx
    lessons_file = "tomass-main/src/components/LessonsApp.tsx"
    with open(lessons_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Read the simple 50 modules JavaScript
    js_file = "content_backups/20250920_171640_complete_50_modules/simple_50_modules_javascript.js"
    with open(js_file, 'r', encoding='utf-8') as f:
        new_modules_js = f.read()

    print("Clean update of LessonsApp.tsx with all 50 B1 modules...")

    # 1. Update ORDER_B1 to include all 50 modules (101-150)
    old_order_b1 = r'const ORDER_B1 = \[101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140\];'
    new_order_b1 = 'const ORDER_B1 = [101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150];'

    content = re.sub(old_order_b1, new_order_b1, content)

    # 2. Update MODULES_BY_LEVEL B1 array to include all 50 modules
    # Find the B1 array definition and update it to 50 modules
    old_b1_length = r'B1: Array\.from\(\{ length: \d+ \}'
    new_b1_length = 'B1: Array.from({ length: 50 }'
    content = re.sub(old_b1_length, new_b1_length, content)

    # 3. Replace all existing B1 MODULE_DATA definitions
    # Find start of first B1 module
    start_pattern = r'// Module 101 Data.*?\nconst MODULE_101_DATA = \{'
    start_match = re.search(start_pattern, content)

    if not start_match:
        print("Could not find start of MODULE_101_DATA")
        return False

    # Find where B1 modules end (look for next section or function)
    # Look for either the getCurrentModuleData function or A2/C1 section
    after_b1_patterns = [
        r'\n\s*// getCurrentModuleData function',
        r'\n\s*function getCurrentModuleData',
        r'\n\s*const getCurrentModuleData',
        r'\n\s*// Module functions',
        r'\n\s*}\s*;\s*\n\s*// Function to get module data'
    ]

    end_pos = None
    for pattern in after_b1_patterns:
        end_match = re.search(pattern, content[start_match.start():])
        if end_match:
            end_pos = start_match.start() + end_match.start()
            break

    if not end_pos:
        print("Could not find end of B1 modules section")
        return False

    # Extract parts
    before_modules = content[:start_match.start()]
    after_modules = content[end_pos:]

    # 4. Create the new content with simple modules
    new_content = before_modules + new_modules_js + '\n\n' + after_modules

    # 5. Update getCurrentModuleData function to handle all 50 modules
    # Add cases for modules 141-150
    function_pattern = r'(if \(selectedModule === 140\) return MODULE_140_DATA;\s*\n\s*)(// Fallback to Module 1)'

    function_additions = '''if (selectedModule === 140) return MODULE_140_DATA;
    if (selectedModule === 141) return MODULE_141_DATA;
    if (selectedModule === 142) return MODULE_142_DATA;
    if (selectedModule === 143) return MODULE_143_DATA;
    if (selectedModule === 144) return MODULE_144_DATA;
    if (selectedModule === 145) return MODULE_145_DATA;
    if (selectedModule === 146) return MODULE_146_DATA;
    if (selectedModule === 147) return MODULE_147_DATA;
    if (selectedModule === 148) return MODULE_148_DATA;
    if (selectedModule === 149) return MODULE_149_DATA;
    if (selectedModule === 150) return MODULE_150_DATA;

    \\2'''

    new_content = re.sub(function_pattern, function_additions, new_content)

    # 6. Update getModuleDataForValidation function
    validation_pattern = r'(if \(moduleId === 140\) return MODULE_140_DATA;\s*\n.*?)(// Fallback to Module 1)'

    validation_additions = '''if (moduleId === 140) return MODULE_140_DATA;
                        if (moduleId === 141) return MODULE_141_DATA;
                        if (moduleId === 142) return MODULE_142_DATA;
                        if (moduleId === 143) return MODULE_143_DATA;
                        if (moduleId === 144) return MODULE_144_DATA;
                        if (moduleId === 145) return MODULE_145_DATA;
                        if (moduleId === 146) return MODULE_146_DATA;
                        if (moduleId === 147) return MODULE_147_DATA;
                        if (moduleId === 148) return MODULE_148_DATA;
                        if (moduleId === 149) return MODULE_149_DATA;
                        if (moduleId === 150) return MODULE_150_DATA;

                        \\2'''

    new_content = re.sub(validation_pattern, validation_additions, new_content, flags=re.DOTALL)

    # Write the updated file
    with open(lessons_file, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print("Successfully updated LessonsApp.tsx with all 50 B1 modules")
    print("- Updated ORDER_B1 to include modules 101-150")
    print("- Updated MODULES_BY_LEVEL.B1 to 50 modules")
    print("- Replaced all MODULE_DATA constants (101-150)")
    print("- Updated getCurrentModuleData function")
    print("- Updated getModuleDataForValidation function")

    return True

if __name__ == "__main__":
    success = main()
    if success:
        print("\nClean B1 update successful!")
    else:
        print("\nFailed to complete clean B1 update")