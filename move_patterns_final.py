#!/usr/bin/env python3
"""
Move B1/B2 patterns inside grammarPatterns array
"""

file_path = "tomass-main/src/utils/multipleChoiceGenerator.ts"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the patterns section (lines 798-966)
patterns_start_marker = '  // === ADVANCED B1/B2 LEVEL PATTERNS ==='
shuffle_func_marker = 'function shuffleArray'

patterns_start = content.find(patterns_start_marker)
patterns_end = content.find(shuffle_func_marker)

if patterns_start == -1 or patterns_end == -1:
    print("ERROR: Could not find pattern markers")
    exit(1)

# Extract the patterns (including the closing brace but not the extra newlines)
patterns_text = content[patterns_start:patterns_end].rstrip() + '\n'

# Remove from current location
content_without_patterns = content[:patterns_start] + content[patterns_end:]

# Find where to insert (before ]; that closes grammarPatterns array)
# The array closes around line 393
array_close = content_without_patterns.find('\n];')

if array_close == -1:
    print("ERROR: Could not find grammarPatterns array closing")
    exit(1)

# Insert the patterns before ];
# Add comma after last pattern in original array
final_content = content_without_patterns[:array_close] + ',\n\n' + patterns_text + content_without_patterns[array_close:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(final_content)

print("SUCCESS: Moved B1/B2 patterns inside grammarPatterns array")
