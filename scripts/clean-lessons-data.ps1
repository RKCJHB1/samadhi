# PowerShell script to create clean lessons data with duplicates removed

Write-Host "Creating clean lessons data file..."

# List of Holy Trinity lesson IDs that should be removed from deities section
$holyTrinityLessons = @(
    'teachings-sri-sarada-devi',
    'introduction-sri-ramakrishna', 
    'childhood-days-sri-ramakrishna',
    'gadai-love-for-nature',
    'gadai-playing-shiva',
    'rani-rasmani-ramakrishna',
    'muslim-way-to-god',
    'christian-way-to-god',
    'god-is-infinite',
    'sri-sarada-devi',
    'swami-vivekananda-part1',
    'swami-vivekananda-part2'
)

# Read the original file
$content = Get-Content 'src/data/lessonsData.ts' -Raw

Write-Host "Original file size: $($content.Length) characters"

# Split content into lines for easier processing
$lines = $content -split "`n"
$newLines = @()
$skipMode = $false
$lessonDepth = 0
$currentLessonId = ""

for ($i = 0; $i -lt $lines.Length; $i++) {
    $line = $lines[$i]
    
    # Check if this line starts a lesson
    if ($line -match "^\s*{\s*$" -and $i + 1 -lt $lines.Length -and $lines[$i + 1] -match "^\s*id:\s*'([^']+)'") {
        $currentLessonId = $matches[1]
        
        # Check if this is a Holy Trinity lesson in the deities section
        if ($holyTrinityLessons -contains $currentLessonId) {
            # Check if we're in the deities section
            $contextLines = $lines[($i - 50)..($i + 5)] -join "`n"
            if ($contextLines -match "topicId:\s*'deities'" -and $contextLines -notmatch "topicId:\s*'holy-trinity'") {
                Write-Host "Skipping duplicate lesson: $currentLessonId"
                $skipMode = $true
                $lessonDepth = 0
                continue
            }
        }
    }
    
    if ($skipMode) {
        # Count braces to know when lesson ends
        $openBraces = ($line -split '\{').Length - 1
        $closeBraces = ($line -split '\}').Length - 1
        $lessonDepth += $openBraces - $closeBraces
        
        # If we've closed all braces, the lesson is complete
        if ($lessonDepth -le 0 -and $line -match '^\s*\}') {
            $skipMode = $false
            Write-Host "Finished skipping lesson: $currentLessonId"
            continue
        }
        continue
    }
    
    # Add line if not in skip mode
    $newLines += $line
}

# Join lines back together
$newContent = $newLines -join "`n"

Write-Host "New file size: $($newContent.Length) characters"
Write-Host "Reduction: $(($content.Length - $newContent.Length)) characters"

# Write the clean file
Set-Content 'src/data/lessonsData.clean.ts' $newContent

Write-Host "Clean file created: src/data/lessonsData.clean.ts"
Write-Host "Please review the clean file before replacing the original."
