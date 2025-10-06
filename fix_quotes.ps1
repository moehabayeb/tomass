$file = 'C:\Users\Mohammad\Downloads\tomass-main\tomass-main\src\components\LessonsApp.tsx.current'
$content = Get-Content $file -Raw -Encoding UTF8
$content = $content.Replace([char]0x201C, '"')  # Left double quote
$content = $content.Replace([char]0x201D, '"')  # Right double quote
$content = $content.Replace([char]0x2018, "'")  # Left single quote
$content = $content.Replace([char]0x2019, "'")  # Right single quote
$content | Set-Content $file -Encoding UTF8 -NoNewline
Write-Host "Fixed all smart quotes"
