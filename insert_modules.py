#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Insert modules 88-100 into LessonsApp.tsx
"""

def main():
    # Read the generated modules
    with open("C:/Users/Mohammad/Downloads/tomass-main/modules_88_100_generated.ts", "r", encoding="utf-8") as f:
        new_modules = f.read()

    # Read the LessonsApp.tsx file
    lessons_app_path = "C:/Users/Mohammad/Downloads/tomass-main/tomass-main/src/components/LessonsApp.tsx"
    with open(lessons_app_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Find the insertion point (before "// B1 Level Module Data")
    insertion_marker = "// B1 Level Module Data (101-110)"

    if insertion_marker not in content:
        print(f"ERROR: Could not find insertion marker: {insertion_marker}")
        return

    # Split at the marker
    parts = content.split(insertion_marker, 1)

    # Insert the new modules
    new_content = parts[0] + new_modules + "\n" + insertion_marker + parts[1]

    # Write back
    with open(lessons_app_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    print("Successfully inserted modules 88-100 into LessonsApp.tsx")
    print(f"Insertion point: Line containing '{insertion_marker}'")

    # Calculate line number
    line_num = content[:content.index(insertion_marker)].count('\n') + 1
    print(f"Inserted at approximately line: {line_num}")

if __name__ == "__main__":
    main()
