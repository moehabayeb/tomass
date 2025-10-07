import re

with open('src/components/LessonsApp.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

print('\n📊 A1 LEVEL MODULE ANALYSIS (Modules 1-30)\n')
print('=' * 80)

modules = []
for i in range(1, 31):
    pattern = rf'const MODULE_{i}_DATA = \{{([\s\S]*?)\n\}};'
    match = re.search(pattern, content)
    
    if match:
        module_content = match.group(1)
        
        # Count speakingPractice items
        sp_match = re.search(r'speakingPractice:\s*\[([\s\S]*?)\]', module_content)
        question_count = 0
        if sp_match:
            question_count = len(re.findall(r'\{', sp_match.group(1)))
        
        # Extract title
        title_match = re.search(r'title:\s*["\']([^"\']+)["\']', module_content)
        title = title_match.group(1) if title_match else 'Unknown'
        
        # Check for issues
        issues = []
        
        # Smart quotes
        if re.search(r'[""'']', module_content):
            issues.append('SMART_QUOTES')
        
        # Very short answers
        if sp_match:
            short = re.findall(r'answer:\s*["\']([^"\']{1,5})["\']', sp_match.group(1))
            if short:
                issues.append(f'SHORT({len(short)})')
        
        # Q&A count
        if question_count != 40 and question_count > 0:
            issues.append(f'QA={question_count}')
        
        status = '✅' if not issues else '⚠️'
        issue_str = ', '.join(issues) if issues else 'OK'
        
        print(f'{status} Module {i:2d}: {question_count:2d} Q&A | {issue_str}')
        print(f'   {title[:60]}')
        
        modules.append({'id': i, 'questions': question_count, 'issues': len(issues)})
    else:
        print(f'❌ Module {i:2d}: NOT FOUND')
        modules.append({'id': i, 'questions': 0, 'issues': 1})

total_q = sum(m['questions'] for m in modules)
ok_modules = sum(1 for m in modules if m['issues'] == 0)

print('=' * 80)
print(f'\n📈 SUMMARY:')
print(f'Total Modules: {len(modules)}')
print(f'Total Q&A Pairs: {total_q}')
print(f'Average Q&A per Module: {total_q / len(modules):.1f}')
print(f'Modules OK: {ok_modules}/{len(modules)} ({ok_modules/len(modules)*100:.1f}%)')
print(f'Modules with Issues: {len(modules) - ok_modules}/{len(modules)}')
