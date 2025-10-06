#!/usr/bin/env python3
"""
Fix multipleChoiceGenerator.ts patterns to accept ANY -ing verb
"""
import re

file_path = "tomass-main/src/utils/multipleChoiceGenerator.ts"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Present Perfect Continuous - I/You/We/They
content = re.sub(
    r'pattern: /\\b\(I have\|You have\|We have\|They have\)\\s\+been\\s\+\(playing\|working\|studying\|cooking\|watching\|reading\|writing\|listening\)\\b/i,',
    r'pattern: /\\b(I have|You have|We have|They have)\\s+been\\s+(\\w+ing)\\b/i,',
    content
)

# Fix Present Perfect Continuous - He/She/It
content = re.sub(
    r'pattern: /\\b\(He has\|She has\|It has\)\\s\+been\\s\+\(playing\|working\|studying\|cooking\|watching\|reading\|writing\|listening\)\\b/i,',
    r'pattern: /\\b(He has|She has|It has)\\s+been\\s+(\\w+ing)\\b/i,',
    content
)

# Fix Past Continuous - I/He/She/It
content = re.sub(
    r'pattern: /\\b\(I was\|He was\|She was\|It was\)\\s\+\(playing\|working\|studying\|cooking\|watching\|reading\|writing\|listening\)\\b/i,',
    r'pattern: /\\b(I was|He was|She was|It was)\\s+(\\w+ing)\\b/i,',
    content
)

# Fix Past Continuous - You/We/They
content = re.sub(
    r'pattern: /\\b\(You were\|We were\|They were\)\\s\+\(playing\|working\|studying\|cooking\|watching\|reading\|writing\|listening\)\\b/i,',
    r'pattern: /\\b(You were|We were|They were)\\s+(\\w+ing)\\b/i,',
    content
)

# Fix Present Continuous - I/You/We/They
content = re.sub(
    r'pattern: /\\b\(I am\|You are\|We are\|They are\)\\s\+\(playing\|working\|studying\|cooking\|watching\|reading\|writing\|listening\)\\b/i,',
    r'pattern: /\\b(I am|You are|We are|They are)\\s+(\\w+ing)\\b/i,',
    content
)

# Fix Present Continuous - He/She/It
content = re.sub(
    r'pattern: /\\b\(He is\|She is\|It is\)\\s\+\(playing\|working\|studying\|cooking\|watching\|reading\|writing\|listening\)\\b/i,',
    r'pattern: /\\b(He is|She is|It is)\\s+(\\w+ing)\\b/i,',
    content
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Successfully fixed multipleChoiceGenerator.ts patterns")
print("🔧 Updated 6 patterns to accept ANY -ing verb")
