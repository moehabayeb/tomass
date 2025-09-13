#!/usr/bin/env python3
import re

# Read the modified file
with open('src/components/LessonsApp.modified.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Read replacement content
with open('replacement.txt', 'r', encoding='utf-8') as f:
    replacement = f.read()

# Define the pattern to replace
old_pattern = r'''                        <>
                          <p className="text-white/70 text-sm mb-2">
                            Soru: \{currentPracticeItem\.question\}
                          </p>
                          <p className="text-white text-lg font-medium mb-2">
                            Say: "\{currentPracticeItem\.answer\}"
                          </p>
                        </>'''

# Replace the pattern
new_content = re.sub(old_pattern, replacement.strip(), content, flags=re.MULTILINE)

# Also need to gate the mic section - find where the mic button is rendered
mic_pattern = r'(\s+{/\* Recording Button \*/}[\s\S]+?</div>)'
mic_replacement = r'''
                {/* STEP 2 — Speaking: Gate mic behind MCQ */}
                {(!mcq || speakStep === 'speak') && (
                  <>\1
                  </>
                )}'''

# Apply mic gating
new_content = re.sub(mic_pattern, mic_replacement, new_content, flags=re.MULTILINE)

# Add reset effect - find a good place to add useEffect
effect_pattern = r'(  // Guards for module-scoped timers and safe progression)'
effect_replacement = r'''  // Reset MCQ step when question changes
  useEffect(() => {
    setSpeakStep('mcq');
  }, [speakingIndex, selectedModule]);

\1'''

new_content = re.sub(effect_pattern, effect_replacement, new_content)

# Write the result
with open('src/components/LessonsApp.modified.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Replacement completed successfully")