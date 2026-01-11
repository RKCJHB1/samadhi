import re
import json

# Character mapping from PDF encoding to proper transliteration
# Based on the transliteration guide in the PDF
char_map = {
    'ä': 'ā',
    'é': 'ī',
    'ü': 'ū',
    'å': 'ṛ',
    '¹': 'ē',  # This is the key one - ¹ represents ē
    'º': 'ō',
    'è': 'ḹ',
    'ÿ': 'ḷ',
    '¹': 'ṛ',
    'ñ': 'ñ',
    'ë': 'ṇ',
    'ö': 'ṭ',
    'ò': 'ḍ',
    'ç': 'ś',
    'ñ': 'ṣ',
    'à': 'ṃ',
    'ð': 'ṃ',
    'ù': 'ḥ',
    '¦': 'ḷ',
    '|': 'ñ',
    '}': 'jñ',
    ']': 'kṣ',
    'Ç': 'Ś',
    'è': 'ī',
    'ì': 'ṅ',
    'ï': 'ñ',
}

def clean_transliteration(text):
    """Convert PDF encoding to proper transliteration"""
    # Replace special character combinations first
    text = text.replace('Aae', 'ō')
    text = text.replace('AaE', 'au')
    text = text.replace('Aa', 'ā')
    text = text.replace('@e', 'ai')
    text = text.replace('A<', 'ṃ')
    text = text.replace('A>', 'ḥ')
    
    # Replace individual characters
    for old, new in char_map.items():
        text = text.replace(old, new)
    
    return text

# Read the extracted text
with open("gita_extracted.txt", "r", encoding="utf-8") as f:
    content = f.read()

# Find Chapter 1 verses
chapter_1_start = content.find("dhåtaräñöra uväca -")
chapter_1_end = content.find("arjuna-viñäda-yºgº näma prathamº'dhyäyaù")

chapter_1_text = content[chapter_1_start:chapter_1_end]

# Extract verses
verses = []
lines = chapter_1_text.split('\n')

current_verse = None
current_lines = []

for line in lines:
    line = line.strip()
    if not line or line.startswith('===') or line.startswith('Çrémad') or line.startswith('Arjuna') or line.isdigit():
        continue
    
    # Check if line ends with verse number
    verse_match = re.search(r'\|\|(\d+)\|\|', line)
    if verse_match:
        verse_num = int(verse_match.group(1))
        # Remove the verse number from the line
        line = re.sub(r'\s*\|\|\d+\|\|', '', line)
        current_lines.append(line)
        
        # Join all lines for this verse
        verse_text = ' '.join(current_lines)
        verses.append({
            'verse': verse_num,
            'transliteration': clean_transliteration(verse_text)
        })
        current_lines = []
    else:
        if line:
            current_lines.append(line)

# Print the verses
print(f"Found {len(verses)} verses\n")
for v in verses[:5]:  # Print first 5 as sample
    print(f"Verse {v['verse']}:")
    print(f"  {v['transliteration']}")
    print()

# Save to JSON
with open("chapter1_verses.json", "w", encoding="utf-8") as f:
    json.dump(verses, f, indent=2, ensure_ascii=False)

print(f"\nSaved {len(verses)} verses to chapter1_verses.json")

