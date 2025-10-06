#!/usr/bin/env python3
"""Check actual DOCX content for quality"""

from docx import Document
import sys

def check_docx(filepath):
    try:
        doc = Document(filepath)
        paragraphs = [p.text.strip() for p in doc.paragraphs if p.text.strip()]

        print(f"File: {filepath}")
        print(f"Total paragraphs: {len(paragraphs)}")
        print("\n=== First 10 paragraphs ===")
        for i, para in enumerate(paragraphs[:10], 1):
            print(f"{i}. {para[:100]}...")

        # Look for speaking questions
        speaking_section = False
        questions = []
        for para in paragraphs:
            if 'speaking' in para.lower() or 'practice' in para.lower():
                speaking_section = True
            if speaking_section and '?' in para:
                questions.append(para)

        print(f"\n=== Found {len(questions)} questions ===")
        for q in questions[:5]:
            print(f"- {q}")

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)

if __name__ == "__main__":
    check_docx("temp_b1_extraction/Module_130_Collocations_with_Make_and_Do.docx")