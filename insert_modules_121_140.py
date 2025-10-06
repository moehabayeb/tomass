#!/usr/bin/env python3
"""
Insert modules 121-140 into LessonsApp.tsx
"""

# Read the generated modules
with open("../modules_121_140_unique.ts", 'r', encoding='utf-8') as f:
    new_modules = f.read()

# Read the current LessonsApp.tsx
with open("src/components/LessonsApp.tsx", 'r', encoding='utf-8') as f:
    content = f.read()

# Find where to insert (after MODULE_120_DATA, before getCurrentModuleData)
insertion_marker = "};\n\n  // Get current module data"
insertion_pos = content.find(insertion_marker)

if insertion_pos == -1:
    print("ERROR: Could not find insertion point")
    exit(1)

# Insert the new modules
# Place them after the }; of MODULE_120 and before the comment
new_content = content[:insertion_pos + 3] + "\n\n" + new_modules + "\n" + content[insertion_pos + 3:]

# Now update the getCurrentModuleData function to include mappings for 121-140
# Find the line with "if (selectedModule >= 121 && selectedModule <= 150)"
fallback_line_pattern = "if (selectedModule >= 121 && selectedModule <= 150) return MODULE_101_DATA"
fallback_pos = new_content.find(fallback_line_pattern)

if fallback_pos == -1:
    print("ERROR: Could not find fallback line")
    exit(1)

# Create the new mapping code for modules 121-140
new_mappings = '''if (selectedModule === 121) return MODULE_121_DATA;
    if (selectedModule === 122) return MODULE_122_DATA;
    if (selectedModule === 123) return MODULE_123_DATA;
    if (selectedModule === 124) return MODULE_124_DATA;
    if (selectedModule === 125) return MODULE_125_DATA;
    if (selectedModule === 126) return MODULE_126_DATA;
    if (selectedModule === 127) return MODULE_127_DATA;
    if (selectedModule === 128) return MODULE_128_DATA;
    if (selectedModule === 129) return MODULE_129_DATA;
    if (selectedModule === 130) return MODULE_130_DATA;
    if (selectedModule === 131) return MODULE_131_DATA;
    if (selectedModule === 132) return MODULE_132_DATA;
    if (selectedModule === 133) return MODULE_133_DATA;
    if (selectedModule === 134) return MODULE_134_DATA;
    if (selectedModule === 135) return MODULE_135_DATA;
    if (selectedModule === 136) return MODULE_136_DATA;
    if (selectedModule === 137) return MODULE_137_DATA;
    if (selectedModule === 138) return MODULE_138_DATA;
    if (selectedModule === 139) return MODULE_139_DATA;
    if (selectedModule === 140) return MODULE_140_DATA;
    // B1 Modules 141-150 - Add remaining modules as needed
    '''

# Find the end of the fallback line
fallback_end = new_content.find("\n", fallback_pos)

# Replace the fallback line with the new mappings
new_content = new_content[:fallback_pos] + new_mappings + new_content[fallback_end:]

# Write the updated file
with open("src/components/LessonsApp.tsx", 'w', encoding='utf-8') as f:
    f.write(new_content)

print("SUCCESS: Inserted modules 121-140 into LessonsApp.tsx")
print("- Added MODULE_121_DATA through MODULE_140_DATA definitions")
print("- Updated getCurrentModuleData() function with individual mappings")
print("- Removed fallback line that caused duplicate content")
