#!/usr/bin/env python3
"""
Script to update B1 modules to include modules 121-150
"""

# Read the current moduleData.ts file
module_data_path = "tomass-main/src/utils/lessons/moduleData.ts"

with open(module_data_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Update length from 48 to 50
content = content.replace(
    "return Array.from({ length: 48 }, (_, i) => ({",
    "return Array.from({ length: 50 }, (_, i) => ({"
)

# Add the two new module titles (148 and 149)
old_titles = """           i === 47 ? 'Health and Fitness Vocabulary' :
           `B1 Module ${i + 101}`,"""

new_titles = """           i === 47 ? 'Health and Fitness Vocabulary' :
           i === 48 ? 'Society and Social Issues Vocabulary' :
           i === 49 ? 'Travel and Adventure Vocabulary' :
           `B1 Module ${i + 101}`,"""

content = content.replace(old_titles, new_titles)

# Add the two new module descriptions
old_descriptions = """                 i === 47 ? 'Students will learn and practice vocabulary related to health, nutrition, and fitness' :
                 'Coming soon',"""

new_descriptions = """                 i === 47 ? 'Students will learn and practice vocabulary related to health, nutrition, and fitness' :
                 i === 48 ? 'Learn and use vocabulary related to society, inequality, and social issues through structured speaking activities' :
                 i === 49 ? 'Learn and use vocabulary related to travel and adventure in structured conversations and exercises' :
                 'Coming soon',"""

content = content.replace(old_descriptions, new_descriptions)

# Write the updated content
with open(module_data_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Successfully updated moduleData.ts")
print("✨ Added modules 149 and 150")
print("📊 B1 level now has 50 modules (101-150)")
