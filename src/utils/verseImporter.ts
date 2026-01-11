// Utility for importing verses from public domain sources
// This helps you add complete texts safely and efficiently

export interface ImportSource {
  name: string;
  url: string;
  format: 'api' | 'csv' | 'json';
  description: string;
}

// Verified public domain sources for Sanskrit texts
export const PUBLIC_DOMAIN_SOURCES: ImportSource[] = [
  {
    name: 'Gita Supersite (IIT Kanpur)',
    url: 'https://www.gitasupersite.iitk.ac.in/',
    format: 'api',
    description: 'Academic public domain Bhagavad Gita with Sanskrit and transliterations'
  },
  {
    name: 'Sanskrit Documents Project',
    url: 'https://sanskritdocuments.org/',
    format: 'json',
    description: 'Open source Sanskrit text collection'
  },
  {
    name: 'Wikisource Sanskrit',
    url: 'https://sa.wikisource.org/',
    format: 'csv',
    description: 'Collaborative Sanskrit text project'
  },
  {
    name: 'Digital Library of India',
    url: 'https://dli.iiit.ac.in/',
    format: 'json',
    description: 'Public domain Sanskrit manuscripts'
  }
];

// Helper function to validate verse format
export const validateVerse = (verse: any): boolean => {
  return (
    verse &&
    typeof verse.sanskrit === 'string' &&
    typeof verse.transliteration === 'string' &&
    verse.sanskrit.length > 0 &&
    verse.transliteration.length > 0
  );
};

// Helper function to clean and format Sanskrit text
export const formatSanskritText = (text: string): string => {
  return text
    .trim()
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/।{2,}/g, '।।'); // Normalize verse endings
};

// Helper function to format transliteration
export const formatTransliteration = (text: string): string => {
  return text
    .trim()
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/\|{2,}/g, ' || '); // Normalize verse separators
};

// Batch import function for CSV data
export const importFromCSV = async (csvText: string, textName: string, chapter: number) => {
  try {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    if (!headers.includes('Sanskrit') || !headers.includes('Transliteration')) {
      throw new Error('CSV must have Sanskrit and Transliteration columns');
    }
    
    const verses = lines.slice(1)
      .filter(line => line.trim())
      .map((line, index) => {
        const columns = line.split(',').map(col => col.trim().replace(/"/g, ''));
        const sanskritIndex = headers.indexOf('Sanskrit');
        const transliterationIndex = headers.indexOf('Transliteration');
        
        return {
          verse: index + 1,
          sanskrit: formatSanskritText(columns[sanskritIndex] || ''),
          transliteration: formatTransliteration(columns[transliterationIndex] || '')
        };
      })
      .filter(validateVerse);
    
    console.log(`Imported ${verses.length} verses for ${textName} Chapter ${chapter}`);
    return verses;
  } catch (error) {
    console.error('CSV import failed:', error);
    return [];
  }
};

// Generate TypeScript code for verses
export const generateVerseCode = (verses: any[], chapterNum: number, title: string): string => {
  const verseCode = verses.map(verse => `      {
        verse: ${verse.verse},
        sanskrit: "${verse.sanskrit}",
        transliteration: "${verse.transliteration}"
      }`).join(',\n');
  
  return `  {
    chapter: ${chapterNum},
    title: "${title}",
    verses: [
${verseCode}
    ]
  }`;
};

// Instructions for manual import
export const IMPORT_INSTRUCTIONS = `
## How to Add All Verses Safely:

### Method 1: Academic Sources (Recommended)
1. Visit Gita Supersite (IIT Kanpur): https://www.gitasupersite.iitk.ac.in/
2. Download their public domain Sanskrit texts
3. Use their API or export functionality
4. Import using the CSV format below

### Method 2: Wikisource
1. Visit Sanskrit Wikisource: https://sa.wikisource.org/
2. Find Bhagavad Gita and Devi Mahatmyam pages
3. Copy Sanskrit text and transliterations
4. Format as CSV and import

### Method 3: Sanskrit Documents Project
1. Visit: https://sanskritdocuments.org/
2. Download their text files
3. Convert to CSV format
4. Import using the utility functions

### CSV Format:
Sanskrit,Transliteration
"[Sanskrit verse]","[Roman transliteration]"

### Important Notes:
- Always verify sources are public domain
- Academic institutions typically provide verified texts
- Double-check transliteration accuracy
- Maintain proper verse numbering
`;

export default {
  PUBLIC_DOMAIN_SOURCES,
  validateVerse,
  formatSanskritText,
  formatTransliteration,
  importFromCSV,
  generateVerseCode,
  IMPORT_INSTRUCTIONS
};
