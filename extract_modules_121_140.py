#!/usr/bin/env python3
"""
Extract modules 121-140 from backup LessonsApp.tsx
"""

backup_file = "../content_backups/20250926_deterministic_fix/LessonsApp.tsx"
output_file = "../modules_121_140_extracted.ts"

with open(backup_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Find MODULE_121_DATA start
start_marker = "const MODULE_121_DATA = {"
start_pos = content.find(start_marker)

# Find MODULE_141_DATA start (to mark end of MODULE_140)
end_marker = "\nconst MODULE_141_DATA = {"
end_pos = content.find(end_marker, start_pos)

if start_pos == -1 or end_pos == -1:
    print(f"ERROR: Could not find markers")
    print(f"start_pos: {start_pos}, end_pos: {end_pos}")
    exit(1)

# Extract modules 121-140
extracted = content[start_pos:end_pos]

with open(output_file, 'w', encoding='utf-8') as f:
    f.write(extracted)

print(f"SUCCESS: Extracted {len(extracted)} characters")
print(f"Output: {output_file}")

# Count how many modules
module_count = extracted.count("const MODULE_")
print(f"Modules found: {module_count}")
