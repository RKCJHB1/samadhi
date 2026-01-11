// Utility for loading verse content from various sources
// This provides a framework for adding complete texts from verified sources

export interface VerseSource {
  id: string;
  name: string;
  description: string;
  url?: string;
  format: 'json' | 'csv' | 'api';
}

export interface VerseData {
  verse: number;
  sanskrit: string;
  transliteration: string;
  source?: string;
  verified?: boolean;
}

export interface ChapterData {
  chapter: number;
  title: string;
  verses: VerseData[];
  totalVerses: number;
  source?: string;
}

// Public domain sources for Sanskrit texts
export const VERSE_SOURCES: VerseSource[] = [
  {
    id: 'gita-supersite',
    name: 'Gita Supersite',
    description: 'Public domain Bhagavad Gita verses',
    url: 'https://www.gitasupersite.iitk.ac.in/',
    format: 'api'
  },
  {
    id: 'sanskrit-documents',
    name: 'Sanskrit Documents',
    description: 'Open source Sanskrit text collection',
    url: 'https://sanskritdocuments.org/',
    format: 'json'
  },
  {
    id: 'local-csv',
    name: 'Local CSV Import',
    description: 'Import from local CSV files',
    format: 'csv'
  }
];

// Framework for loading verses from different sources
export class VerseLoader {
  private cache: Map<string, ChapterData> = new Map();

  async loadChapter(
    text: 'bhagavad-gita' | 'devi-mahatmyam',
    chapter: number,
    source?: string
  ): Promise<ChapterData | null> {
    const cacheKey = `${text}-${chapter}-${source || 'default'}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      let chapterData: ChapterData | null = null;

      // Try different loading strategies
      if (source === 'local-csv') {
        chapterData = await this.loadFromCSV(text, chapter);
      } else if (source === 'api') {
        chapterData = await this.loadFromAPI(text, chapter);
      } else {
        // Default: try local data first, then fallback to placeholders
        chapterData = await this.loadFromLocal(text, chapter);
      }

      if (chapterData) {
        this.cache.set(cacheKey, chapterData);
      }

      return chapterData;
    } catch (error) {
      console.error(`Error loading chapter ${chapter} of ${text}:`, error);
      return this.generatePlaceholderChapter(text, chapter);
    }
  }

  private async loadFromLocal(
    text: 'bhagavad-gita' | 'devi-mahatmyam',
    chapter: number
  ): Promise<ChapterData | null> {
    // This would load from your existing data files
    // Implementation depends on your current data structure
    return null;
  }

  private async loadFromCSV(
    text: 'bhagavad-gita' | 'devi-mahatmyam',
    chapter: number
  ): Promise<ChapterData | null> {
    try {
      // Load from CSV file in public folder
      const response = await fetch(`/data/${text}-chapter-${chapter}.csv`);
      if (!response.ok) return null;

      const csvText = await response.text();
      const lines = csvText.split('\n').slice(1); // Skip header
      
      const verses: VerseData[] = lines
        .filter(line => line.trim())
        .map((line, index) => {
          const [sanskrit, transliteration] = line.split(',').map(s => s.trim().replace(/"/g, ''));
          return {
            verse: index + 1,
            sanskrit: sanskrit || `[Verse ${index + 1} Sanskrit text]`,
            transliteration: transliteration || `[Verse ${index + 1} transliteration]`,
            source: 'csv',
            verified: true
          };
        });

      return {
        chapter,
        title: this.getChapterTitle(text, chapter),
        verses,
        totalVerses: verses.length,
        source: 'csv'
      };
    } catch (error) {
      console.error('Error loading from CSV:', error);
      return null;
    }
  }

  private async loadFromAPI(
    text: 'bhagavad-gita' | 'devi-mahatmyam',
    chapter: number
  ): Promise<ChapterData | null> {
    // Implementation for API-based loading
    // This would integrate with public APIs for Sanskrit texts
    return null;
  }

  private generatePlaceholderChapter(
    text: 'bhagavad-gita' | 'devi-mahatmyam',
    chapter: number
  ): ChapterData {
    const verseCounts = text === 'bhagavad-gita' 
      ? [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78]
      : [88, 55, 54, 44, 57, 33, 27, 62, 52, 31, 55, 51, 25];
    
    const verseCount = verseCounts[chapter - 1] || 20;
    
    const verses: VerseData[] = Array.from({ length: verseCount }, (_, i) => ({
      verse: i + 1,
      sanskrit: `[Sanskrit text for ${text} Chapter ${chapter}, Verse ${i + 1} - to be added from verified source]`,
      transliteration: `[Transliteration for ${text} Chapter ${chapter}, Verse ${i + 1} - to be added from verified source]`,
      verified: false
    }));

    return {
      chapter,
      title: this.getChapterTitle(text, chapter),
      verses,
      totalVerses: verseCount
    };
  }

  private getChapterTitle(text: 'bhagavad-gita' | 'devi-mahatmyam', chapter: number): string {
    const bgTitles = [
      "Arjuna's Dilemma", "The Yoga of Knowledge", "The Yoga of Action",
      "The Yoga of Divine Knowledge", "The Yoga of Renunciation", "The Yoga of Meditation",
      "The Yoga of Divine Knowledge", "The Yoga of the Imperishable Brahman",
      "The Yoga of Royal Knowledge", "The Yoga of Divine Manifestations",
      "The Yoga of the Universal Form", "The Yoga of Devotion",
      "The Yoga of the Field and Knower", "The Yoga of the Three Gunas",
      "The Yoga of the Supreme Person", "The Yoga of Divine and Demonic Natures",
      "The Yoga of Threefold Faith", "The Yoga of Liberation through Renunciation"
    ];

    const dmTitles = [
      "The Slaying of Madhu and Kaitabha", "The Slaying of Mahishasura",
      "The Slaying of Mahishasura (continued)", "The Slaying of Mahishasura (concluded)",
      "Devi's Conversation with the Messenger", "The Slaying of Dhumralochana",
      "The Slaying of Chanda and Munda", "The Slaying of Raktabija",
      "The Slaying of Nishumbha", "The Slaying of Shumbha",
      "The Hymn of Praise by the Devas", "The Boons Granted by Devi",
      "The Slaying of the Two Demons"
    ];

    const titles = text === 'bhagavad-gita' ? bgTitles : dmTitles;
    return titles[chapter - 1] || `Chapter ${chapter}`;
  }

  // Method to import verses from a CSV file
  async importFromCSV(file: File, text: 'bhagavad-gita' | 'devi-mahatmyam'): Promise<boolean> {
    try {
      const csvText = await file.text();
      const lines = csvText.split('\n');
      
      // Process CSV and update local storage or send to backend
      console.log(`Importing ${lines.length} lines for ${text}`);
      
      // Implementation would depend on your storage strategy
      return true;
    } catch (error) {
      console.error('Import failed:', error);
      return false;
    }
  }
}

export const verseLoader = new VerseLoader();
