# PowerShell script to remove duplicate Holy Trinity lessons from deities section

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

Write-Host "Reading lessonsData.ts file..."
$content = Get-Content 'src/data/lessonsData.ts' -Raw

Write-Host "Original file size: $($content.Length) characters"

# Find the deities section
$deitiesStart = $content.IndexOf("topicId: 'deities'")
if ($deitiesStart -eq -1) {
    Write-Error "Could not find deities section"
    exit 1
}

Write-Host "Found deities section at position: $deitiesStart"

# Find the end of deities section (start of next section)
$scripturesStart = $content.IndexOf("topicId: 'scriptures'", $deitiesStart)
if ($scripturesStart -eq -1) {
    Write-Error "Could not find scriptures section"
    exit 1
}

Write-Host "Found scriptures section at position: $scripturesStart"

# Extract deities section
$deitiesSection = $content.Substring($deitiesStart, $scripturesStart - $deitiesStart)
Write-Host "Deities section length: $($deitiesSection.Length) characters"

# Count lessons found
$lessonsFound = 0
foreach ($lessonId in $holyTrinityLessons) {
    if ($deitiesSection.Contains("id: '$lessonId'")) {
        $lessonsFound++
        Write-Host "Found duplicate lesson: $lessonId"
    }
}

Write-Host "Total duplicate lessons found: $lessonsFound"

if ($lessonsFound -eq 0) {
    Write-Host "No duplicate lessons found. Nothing to remove."
    exit 0
}

Write-Host "This script identified the duplicates. Manual removal is recommended for safety."
Write-Host "Duplicate lessons that need to be removed from deities section:"
foreach ($lessonId in $holyTrinityLessons) {
    if ($deitiesSection.Contains("id: '$lessonId'")) {
        Write-Host "  - $lessonId"
    }
}
