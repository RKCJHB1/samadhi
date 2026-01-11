import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Verse {
  verse: number;
  transliteration: string;
}

// Placeholder verses - to be replaced with actual Gita Mahatmyam verses
const gitaMahatmyamVerses: Verse[] = [
  {
    verse: 1,
    transliteration: "[Gita Mahatmyam Verse 1 - to be added]"
  },
  {
    verse: 2,
    transliteration: "[Gita Mahatmyam Verse 2 - to be added]"
  },
  {
    verse: 3,
    transliteration: "[Gita Mahatmyam Verse 3 - to be added]"
  },
  {
    verse: 4,
    transliteration: "[Gita Mahatmyam Verse 4 - to be added]"
  },
  {
    verse: 5,
    transliteration: "[Gita Mahatmyam Verse 5 - to be added]"
  },
  {
    verse: 6,
    transliteration: "[Gita Mahatmyam Verse 6 - to be added]"
  },
  {
    verse: 7,
    transliteration: "[Gita Mahatmyam Verse 7 - to be added]"
  }
];

const GitaMahatmyamPage = () => {
  return (
    <PageLayout title="Gita Mahatmyam - Glory of the Bhagavad Gita">
      <div className="w-full bg-gradient-to-br from-spiritual-50 to-indian-cream py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Link to="/learn#mantras" className="inline-flex items-center text-spiritual-600 hover:text-spiritual-700 mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Mantras
              </Link>
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2 text-spiritual-800">
                Gita Mahatmyam
              </h1>
              <h2 className="text-xl text-gray-600 mb-4">Glory of the Bhagavad Gita</h2>
              <p className="text-gray-500 mb-4">7 verses</p>
              <div className="bg-white p-4 rounded-lg border border-spiritual-200">
                <p className="text-gray-700">
                  The Gita Mahatmyam (also called Gita Mahatmya) are verses that extol the greatness and spiritual benefits of studying the Bhagavad Gita. These verses describe the transformative power of the Gita and the blessings that come from its regular study and contemplation.
                </p>
              </div>
            </div>

            {/* Verses */}
            <div className="space-y-6">
              {gitaMahatmyamVerses.map((verse) => (
                <Card key={verse.verse} className="bg-gradient-to-br from-indian-cream to-white border border-spiritual-300 pop-shadow-card">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-heading font-semibold text-spiritual-700">
                        Verse {verse.verse}
                      </h3>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-600 mb-2">Transliteration</h4>
                      <p className="text-lg font-sans leading-relaxed whitespace-pre-line">
                        {verse.transliteration}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-12">
              <Link to="/learn/bhagavad-gita/chapter/18">
                <Button variant="outline">
                  ← Chapter 18
                </Button>
              </Link>
              <Link to="/learn#mantras" className="ml-auto">
                <Button variant="outline">
                  Back to Mantras →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default GitaMahatmyamPage;

