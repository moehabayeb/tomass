#!/usr/bin/env python3

def fix_recording_button_logic():
    file_path = 'tomass-main/src/components/LessonsApp.tsx'

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find and replace the logic
    old_text = ': false; // If no multiple choice generated, something is wrong'
    new_text = ': true; // If no multiple choice, allow speaking immediately'

    if old_text in content:
        content = content.replace(old_text, new_text)

        # Also update the comments
        old_comment1 = '// STRICT: Show microphone ONLY if multiple choice is completed correctly'
        new_comment1 = '// Show microphone after multiple choice is correct, OR if no multiple choice exists'
        content = content.replace(old_comment1, new_comment1)

        old_comment2 = '// Every question MUST have multiple choice, and it MUST be answered correctly'
        new_comment2 = '// Questions without multiple choice can go directly to speaking'
        content = content.replace(old_comment2, new_comment2)

        with open(file_path, 'w', encoding='utf-8', newline='') as f:
            f.write(content)

        print("✅ Fixed recording button logic - recording now works without multiple choice!")
        return True
    else:
        print("⚠️  Pattern not found - file may have already been modified")
        return False

if __name__ == '__main__':
    fix_recording_button_logic()
