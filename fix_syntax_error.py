#!/usr/bin/env python3
"""
Fix syntax error in multipleChoiceGenerator.ts
"""

file_path = "tomass-main/src/utils/multipleChoiceGenerator.ts"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the misplaced comma after getComparativeAlternatives function
content = content.replace(
    '''  return ['more', 'most'];
},

  // === ADVANCED B1/B2 LEVEL PATTERNS ===''',
    '''  return ['more', 'most'];
}

function shuffleArray'''
)

# Find where shuffleArray function is now (after the misplaced patterns)
# and move the patterns to before the closing bracket of grammarPatterns array

# Find the patterns section that was added
patterns_start = content.find('  // === ADVANCED B1/B2 LEVEL PATTERNS ===')
patterns_end = content.find('\nfunction shuffleArray', patterns_start)

if patterns_start == -1 or patterns_end == -1:
    print("ERROR: Could not find pattern section")
    exit(1)

# Extract the patterns
patterns_section = content[patterns_start:patterns_end]

# Remove from current location
content = content[:patterns_start] + content[patterns_end:]

# Find the end of Reported Speech pattern (line 392 area)
reported_speech_end = content.find('  }\n];')

if reported_speech_end == -1:
    print("ERROR: Could not find grammarPatterns array closing")
    exit(1)

# Insert before the ];
content = content[:reported_speech_end + 4] + ',\n\n' + patterns_section + '\n' + content[reported_speech_end + 4:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("SUCCESS: Fixed syntax error and moved patterns to correct location")
