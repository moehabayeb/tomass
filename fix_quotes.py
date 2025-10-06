#!/usr/bin/env python3
"""
Fix smart quotes in LessonsApp.tsx file
"""

# Read the .current file
with open(r'C:\Users\Mohammad\Downloads\tomass-main\tomass-main\src\components\LessonsApp.tsx.current', 'r', encoding='utf-8') as f:
    content = f.read()

# Count replacements
count_left = content.count('"')
count_right = content.count('"')
count_left_single = content.count(''')
count_right_single = content.count(''')

# Replace all smart quotes with straight quotes
content = content.replace('"', '"')
content = content.replace('"', '"')
content = content.replace(''', "'")
content = content.replace(''', "'")

# Write back
with open(r'C:\Users\Mohammad\Downloads\tomass-main\tomass-main\src\components\LessonsApp.tsx.current', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Fixed {count_left + count_right} double quotes and {count_left_single + count_right_single} single quotes")
