#!/usr/bin/env python3
"""
Complete update of LessonsApp.tsx with all 50 B1 modules and proper structure.
"""

import os
import re

def main():
    """Replace all B1 content in LessonsApp.tsx with complete 50 module implementation"""

    # Read the current LessonsApp.tsx
    lessons_file = "tomass-main/src/components/LessonsApp.tsx"
    with open(lessons_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Read the simple 50 modules JavaScript
    js_file = "content_backups/20250920_171640_complete_50_modules/simple_50_modules_javascript.js"
    with open(js_file, 'r', encoding='utf-8') as f:
        new_modules_js = f.read()

    print("Updating LessonsApp.tsx with complete 50 B1 modules...")

    # 1. Update ORDER_B1 to include all 50 modules (101-150)
    old_order_b1 = r'const ORDER_B1 = \[101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140\];'
    new_order_b1 = 'const ORDER_B1 = [101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150];'

    content = re.sub(old_order_b1, new_order_b1, content)

    # 2. Update MODULES_BY_LEVEL B1 array to include all 50 modules
    # Find the B1 array definition
    b1_array_start = content.find('B1: Array.from({ length: 48 }')
    if b1_array_start != -1:
        # Find the end of the B1 array (look for the closing of the array)
        b1_array_end = content.find('})),', b1_array_start)
        if b1_array_end != -1:
            b1_array_end += 3  # Include the '})),'

            # Create new B1 array with 50 modules
            new_b1_array = '''B1: Array.from({ length: 50 }, (_, i) => ({
    id: i + 101, // Starting from 101 for B1 level
    title: i === 0 ? 'Present Perfect Continuous (I\\'ve been working)' :
           i === 1 ? 'Present Perfect Continuous vs Present Perfect' :
           i === 2 ? 'Past Perfect – Affirmative' :
           i === 3 ? 'Past Perfect – Negative' :
           i === 4 ? 'Past Perfect – Questions' :
           i === 5 ? 'Past Perfect Continuous' :
           i === 6 ? 'Future Perfect (I will have done)' :
           i === 7 ? 'Future Continuous vs Future Perfect' :
           i === 8 ? 'Modals of Deduction (must, might, can\\'t)' :
           i === 9 ? 'Modals of Probability (could, may, might)' :
           i === 10 ? 'Modals of Obligation (must, have to, should)' :
           i === 11 ? 'Modals of Prohibition (mustn\\'t, can\\'t)' :
           i === 12 ? 'Reported Speech: Requests and Commands' :
           i === 13 ? 'Reported Speech – Questions' :
           i === 14 ? 'Passive Voice – Present Perfect' :
           i === 15 ? 'Passive Voice – Future Simple' :
           i === 16 ? 'Conditionals – Review (Zero, First, Second, Third)' :
           i === 17 ? 'Third Conditional' :
           i === 18 ? 'Mixed Conditionals' :
           i === 19 ? 'Wish / If only + Past Simple (Present Regrets)' :
           i === 20 ? 'Wish / If only + Past Perfect (Past Regrets)' :
           i === 21 ? 'Used to / Be used to / Get used to' :
           i === 22 ? 'Causative – Have/Get Something Done' :
           i === 23 ? 'Relative Clauses – Defining & Non-defining' :
           i === 24 ? 'Gerunds and Infinitives – Review' :
           i === 25 ? 'Expressions with Get (get ready, get tired, etc.)' :
           i === 26 ? 'Expressions with Take (take part, take place, etc.)' :
           i === 27 ? 'Phrasal Verbs – Separable and Inseparable' :
           i === 28 ? 'Phrasal Verbs – Common Everyday Verbs' :
           i === 29 ? 'Collocations with Make and Do' :
           i === 30 ? 'Indirect Questions (Could you tell me ...?)' :
           i === 31 ? 'Giving Opinions and Agreeing/Disagreeing' :
           i === 32 ? 'Speculating and Expressing Possibility' :
           i === 33 ? 'Talking about Hypothetical Situations' :
           i === 34 ? 'Expressing Preferences (I\\'d rather, I prefer)' :
           i === 35 ? 'Narratives – Sequencing Words (first, then)' :
           i === 36 ? 'Linking Words (however, although, despite)' :
           i === 37 ? 'Describing Experiences (Narratives)' :
           i === 38 ? 'Talking about Cause and Effect (so, because)' :
           i === 39 ? 'Talking about Purpose (to, in order to, so that)' :
           i === 40 ? 'Work Vocabulary – Roles, Tasks, and Workplaces' :
           i === 41 ? 'Education Vocabulary – Schools and Universities' :
           i === 42 ? 'Technology Vocabulary – Gadgets and Internet' :
           i === 43 ? 'Environment Vocabulary – Problems and Solutions' :
           i === 44 ? 'News and Media Vocabulary' :
           i === 45 ? 'Personality and Character Vocabulary' :
           i === 46 ? 'Crime and Law Vocabulary' :
           i === 47 ? 'Health and Fitness Vocabulary' :
           i === 48 ? 'Society and Social Issues Vocabulary' :
           i === 49 ? 'Travel and Adventure Vocabulary' :
           `B1 Module ${i + 101}`,
    description: i === 0 ? 'Learn the structure and use of the Present Perfect Continuous tense' :
                 i === 1 ? 'Understand the difference between Present Perfect and Present Perfect Continuous tenses' :
                 i === 2 ? 'Learn how to form Past Perfect Tense in affirmative sentences' :
                 i === 3 ? 'Learn how to form the negative of the Past Perfect tense' :
                 i === 4 ? 'Learn how to form questions in the Past Perfect tense' :
                 i === 5 ? 'Understand how to use the Past Perfect Continuous Tense' :
                 i === 6 ? 'Learn to use the Future Perfect tense to describe completed actions in the future' :
                 i === 7 ? 'Understand the difference between Future Continuous and Future Perfect tenses' :
                 i === 8 ? 'Understand how to express logical conclusions about present situations' :
                 i === 9 ? 'Understand how to express possibility and probability using modal verbs' :
                 i === 10 ? 'Understand how to express rules, duties, and advice using modal verbs' :
                 i === 11 ? 'Learn how to express prohibition and lack of permission using mustn\\'t and can\\'t' :
                 i === 12 ? 'Learn how to report commands and requests using correct reporting verbs' :
                 i === 13 ? 'Learn how to report both Yes/No and WH-Questions' :
                 i === 14 ? 'Learn how to use the passive voice in the present perfect tense' :
                 i === 15 ? 'Learn how to use the passive voice in the future simple tense' :
                 i === 16 ? 'Review and compare all four main conditional sentence types' :
                 i === 17 ? 'Learn how to use the third conditional to describe unreal situations in the past' :
                 i === 18 ? 'Learn how to use mixed conditionals for different time references' :
                 i === 19 ? 'Learn how to express present regrets using wish and if only' :
                 i === 20 ? 'Learn how to express regrets about the past using wish and if only with past perfect' :
                 i === 21 ? 'Understand the differences between used to, be used to, and get used to' :
                 i === 22 ? 'Learn how to use the causative structure to express arrangements with others' :
                 i === 23 ? 'Learn how to use defining and non-defining relative clauses' :
                 i === 24 ? 'Review and consolidate understanding of gerunds and infinitives' :
                 i === 25 ? 'Learn and practice common expressions with the verb get' :
                 i === 26 ? 'Learn and practice common expressions with the verb take' :
                 i === 27 ? 'Learn to distinguish between separable and inseparable phrasal verbs' :
                 i === 28 ? 'Learn and practice common phrasal verbs used in everyday English' :
                 i === 29 ? 'Learn common collocations with make and do and use them correctly in various contexts' :
                 i === 30 ? 'Learn how to form and use indirect questions to sound more polite and formal' :
                 i === 31 ? 'Learn how to express opinions and agree or disagree politely in conversation' :
                 i === 32 ? 'Learn how to express possibility and make logical guesses using modal verbs' :
                 i === 33 ? 'Learn how to talk about unreal or imaginary situations using the Second Conditional' :
                 i === 34 ? 'Learn how to express preferences using "I prefer" and "I\\'d rather"' :
                 i === 35 ? 'Learn how to organize and describe a series of events using sequencing words' :
                 i === 36 ? 'Learn how to use linking words of contrast to show differences between ideas' :
                 i === 37 ? 'Learn how to describe personal experiences, memories, and past events' :
                 i === 38 ? 'Learn how to express reasons (causes) and results (effects) using connectors' :
                 i === 39 ? 'Learn how to express purpose or intent behind actions' :
                 i === 40 ? 'Learn vocabulary related to common job roles, tasks, and workplaces' :
                 i === 41 ? 'Expand academic vocabulary related to school and university settings' :
                 i === 42 ? 'Learn key vocabulary related to gadgets, the internet, and digital life' :
                 i === 43 ? 'Learn essential vocabulary about environmental problems and solutions' :
                 i === 44 ? 'Learn essential vocabulary related to the world of news and media' :
                 i === 45 ? 'Learn and practice advanced vocabulary related to personality and character' :
                 i === 46 ? 'Learn and apply vocabulary related to crime, court, and law enforcement' :
                 i === 47 ? 'Students will learn and practice vocabulary related to health, nutrition, and fitness' :
                 i === 48 ? 'Learn and practice vocabulary related to society and social issues' :
                 i === 49 ? 'Learn vocabulary related to travel, adventure, and tourism' :
                 'Coming soon',
    completed: false,
    locked: false, // TEMPORARILY UNLOCKED FOR DEVELOPMENT
  })),'''

            # Replace the B1 array
            content = content[:b1_array_start] + new_b1_array + content[b1_array_end:]

    # 3. Replace all MODULE_DATA definitions (101-140) with new complete set (101-150)
    # Find the start of MODULE_101_DATA
    start_pattern = r'// Module 101 Data.*?\nconst MODULE_101_DATA = \{'
    start_match = re.search(start_pattern, content, re.DOTALL)

    # Find the end after MODULE_150_DATA (or MODULE_140_DATA if 150 doesn't exist)
    end_pattern = r'const MODULE_150_DATA = \{.*?\};|const MODULE_140_DATA = \{.*?\};'
    end_match = re.search(end_pattern, content, re.DOTALL)

    if start_match and end_match:
        # Extract the parts
        before_modules = content[:start_match.start()]
        after_modules = content[end_match.end():]

        # Add comment header
        modules_header = "// Complete B1 Level Module Data (101-150) - All 50 modules with enhanced content\n\n"

        # Combine with new modules
        new_content = before_modules + modules_header + new_modules_js + '\n\n' + after_modules

        # 4. Update getCurrentModuleData function to include all 50 modules
        # Find and update the function to include modules 141-150
        old_function_end = r'(if \(selectedModule === 140\) return MODULE_140_DATA;\s*\n\s*// Fallback to Module 1)'
        new_function_additions = '''if (selectedModule === 140) return MODULE_140_DATA;
    if (selectedModule === 141) return MODULE_141_DATA;
    if (selectedModule === 142) return MODULE_142_DATA;
    if (selectedModule === 143) return MODULE_143_DATA;
    if (selectedModule === 144) return MODULE_144_DATA;
    if (selectedModule === 145) return MODULE_145_DATA;
    if (selectedModule === 146) return MODULE_146_DATA;
    if (selectedModule === 147) return MODULE_147_DATA;
    if (selectedModule === 148) return MODULE_148_DATA;
    if (selectedModule === 149) return MODULE_149_DATA;
    if (selectedModule === 150) return MODULE_150_DATA;

    // Fallback to Module 1'''

        new_content = re.sub(old_function_end, new_function_additions, new_content)

        # 5. Update getModuleDataForValidation function
        old_validation_end = r'(if \(moduleId === 140\) return MODULE_140_DATA;\s*\n.*?// Fallback to Module 1)'
        new_validation_additions = '''if (moduleId === 140) return MODULE_140_DATA;
                        if (moduleId === 141) return MODULE_141_DATA;
                        if (moduleId === 142) return MODULE_142_DATA;
                        if (moduleId === 143) return MODULE_143_DATA;
                        if (moduleId === 144) return MODULE_144_DATA;
                        if (moduleId === 145) return MODULE_145_DATA;
                        if (moduleId === 146) return MODULE_146_DATA;
                        if (moduleId === 147) return MODULE_147_DATA;
                        if (moduleId === 148) return MODULE_148_DATA;
                        if (moduleId === 149) return MODULE_149_DATA;
                        if (moduleId === 150) return MODULE_150_DATA;

                        // Fallback to Module 1'''

        new_content = re.sub(old_validation_end, new_validation_additions, new_content, flags=re.DOTALL)

        # 6. Update module range check from 101-140 to 101-150
        old_range_check = r'module\.id >= 101 && module\.id <= 150.*?\)\s*\|\|\s*\(module\.id >= 101 && module\.id <= 140\)'
        new_range_check = 'module.id >= 101 && module.id <= 150'
        new_content = re.sub(old_range_check, new_range_check, new_content)

        # Also check for the specific pattern in onClick
        old_click_check = r'\(\(module\.id >= 1 && module\.id <= 50\) \|\| \(module\.id >= 51 && module\.id <= 100\) \|\| \(module\.id >= 101 && module\.id <= 150\)\)'
        new_click_check = '((module.id >= 1 && module.id <= 50) || (module.id >= 51 && module.id <= 100) || (module.id >= 101 && module.id <= 150))'
        new_content = re.sub(old_click_check, new_click_check, new_content)

        # Write the updated file
        with open(lessons_file, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print("Successfully updated LessonsApp.tsx with complete 50 B1 modules")
        print("✅ Updated ORDER_B1 to include modules 101-150")
        print("✅ Updated MODULES_BY_LEVEL.B1 to 50 modules")
        print("✅ Added all MODULE_DATA constants (101-150)")
        print("✅ Updated getCurrentModuleData function")
        print("✅ Updated getModuleDataForValidation function")
        print("✅ Updated module range checks")
        return True
    else:
        print("Could not find module boundaries for replacement")
        return False

if __name__ == "__main__":
    success = main()
    if success:
        print("\\n🎉 Complete B1 restoration successful!")
    else:
        print("\\n❌ Failed to complete B1 restoration")