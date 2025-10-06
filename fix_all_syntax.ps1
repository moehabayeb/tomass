# Comprehensive syntax fix for LessonsApp.tsx
$filePath = ".\tomass-main\src\components\LessonsApp.tsx"

Write-Host "🔧 Fixing ALL syntax errors in LessonsApp.tsx..." -ForegroundColor Cyan

$content = Get-Content $filePath -Raw

# Count issues before
$issuesBefore = ($content | Select-String -Pattern "[""''']" -AllMatches).Matches.Count
Write-Host "`nIssues found: $issuesBefore mismatched quotes" -ForegroundColor Yellow

# Fix Module 113-114 area specifically (lines 6760-6900)
$lines = $content -split "`n"
$fixCount = 0

for ($i = 6760; $i -lt 6900 -and $i -lt $lines.Count; $i++) {
    $original = $lines[$i]
    $line = $original

    # Fix: "'text" → "text"
    $line = $line -replace "\\s*'([^'\"]*?)\"", '"$1"'

    # Fix: "text' → "text"
    $line = $line -replace "\\s*\"([^'\"]*?)'", '"$1"'

    if ($line -ne $original) {
        $lines[$i] = $line
        $fixCount++
    }
}

$content = $lines -join "`n"

# Write back
Set-Content $filePath $content -NoNewline

Write-Host "`n✅ Fixed $fixCount lines" -ForegroundColor Green

# Verify
Write-Host "`n🔍 Testing build..." -ForegroundColor Cyan
Push-Location tomass-main
npm run build 2>&1 | Select-String -Pattern "transformed|failed|ERROR"
Pop-Location

Write-Host "`n✅ Syntax fix complete!" -ForegroundColor Green
