#!/usr/bin/env python3
"""
Fix Will Future and Going to Future patterns
"""
import re

file_path = "tomass-main/src/utils/multipleChoiceGenerator.ts"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Will Future - match ANY base verb
content = re.sub(
    r'pattern: /\\b\(I\|You\|We\|They\|He\|She\|It\)\\s\+will\\s\+\(go\|come\|see\|eat\|drink\|buy\|get\|make\|take\|give\|play\|work\|visit\)\\b/i,',
    r'pattern: /\\b(I|You|We|They|He|She|It)\\s+will\\s+(\\w+)\\b/i,',
    content
)

# Fix Going to Future - I/You/We/They
content = re.sub(
    r'pattern: /\\b\(I am\|You are\|We are\|They are\)\\s\+going\\s\+to\\s\+\(go\|come\|see\|eat\|drink\|buy\|get\|make\|take\|give\|play\|work\|visit\)\\b/i,',
    r'pattern: /\\b(I am|You are|We are|They are)\\s+going\\s+to\\s+(\\w+)\\b/i,',
    content
)

# Fix Going to Future - He/She/It
content = re.sub(
    r'pattern: /\\b\(He is\|She is\|It is\)\\s\+going\\s\+to\\s\+\(go\|come\|see\|eat\|drink\|buy\|get\|make\|take\|give\|play\|work\|visit\)\\b/i,',
    r'pattern: /\\b(He is|She is|It is)\\s+going\\s+to\\s+(\\w+)\\b/i,',
    content
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success - fixed Future patterns")
