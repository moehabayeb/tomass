#!/usr/bin/env python3
import codecs

file_path = 'tomass-main/src/components/LessonsApp.tsx'

with codecs.open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Fix 1: Change line 13879 from false to true
for i, line in enumerate(lines):
    if i == 13878 and ': false; // If no multiple choice generated, something is wrong' in line:
        lines[i] = line.replace(': false; // If no multiple choice generated, something is wrong',
                                ': true; // If no multiple choice, allow speaking immediately')
        print(f'Fixed line {i+1}: Recording button logic')

    # Fix 2: Change line 13832 condition
    if i == 13831 and 'currentState.choiceCorrect && (' in line:
        lines[i] = line.replace('currentState.choiceCorrect && (',
                                '(currentState.choiceCorrect || !currentPracticeItem.multipleChoice) && (')
        print(f'Fixed line {i+1}: Speaking section display condition')

    # Fix 3: Update comment on line 13831
    if i == 13830 and 'Speaking Section - Show after correct multiple choice' in line:
        lines[i] = line.replace('Speaking Section - Show after correct multiple choice',
                                'Speaking Section - Show after correct multiple choice OR if no multiple choice exists')
        print(f'Fixed line {i+1}: Comment updated')

with codecs.open(file_path, 'w', encoding='utf-8', newline='') as f:
    f.writelines(lines)

print('All fixes applied successfully!')
