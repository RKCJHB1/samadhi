import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Upload, Download, Copy, ExternalLink } from 'lucide-react';
import { importFromCSV, generateVerseCode, PUBLIC_DOMAIN_SOURCES } from '../../utils/verseImporter';

const BulkVerseImport = () => {
  const [csvInput, setCsvInput] = useState('');
  const [selectedText, setSelectedText] = useState<'bhagavad-gita' | 'devi-mahatmyam'>('bhagavad-gita');
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [generatedCode, setGeneratedCode] = useState('');
  const [importStatus, setImportStatus] = useState('');

  const chapterTitles = {
    'bhagavad-gita': [
      "Arjuna's Dilemma", "The Yoga of Knowledge", "The Yoga of Action",
      "The Yoga of Divine Knowledge", "The Yoga of Renunciation", "The Yoga of Meditation",
      "The Yoga of Divine Knowledge", "The Yoga of the Imperishable Brahman",
      "The Yoga of Royal Knowledge", "The Yoga of Divine Manifestations",
      "The Yoga of the Universal Form", "The Yoga of Devotion",
      "The Yoga of the Field and Knower", "The Yoga of the Three Gunas",
      "The Yoga of the Supreme Person", "The Yoga of Divine and Demonic Natures",
      "The Yoga of Threefold Faith", "The Yoga of Liberation through Renunciation"
    ],
    'devi-mahatmyam': [
      "The Slaying of Madhu and Kaitabha", "The Slaying of Mahishasura",
      "The Slaying of Mahishasura (continued)", "The Slaying of Mahishasura (concluded)",
      "Devi's Conversation with the Messenger", "The Slaying of Dhumralochana",
      "The Slaying of Chanda and Munda", "The Slaying of Raktabija",
      "The Slaying of Nishumbha", "The Slaying of Shumbha",
      "The Hymn of Praise by the Devas", "The Boons Granted by Devi",
      "The Slaying of the Two Demons"
    ]
  };

  const handleImport = async () => {
    if (!csvInput.trim()) {
      setImportStatus('Please enter CSV data');
      return;
    }

    try {
      const verses = await importFromCSV(csvInput, selectedText, selectedChapter);
      if (verses.length > 0) {
        const title = chapterTitles[selectedText][selectedChapter - 1];
        const code = generateVerseCode(verses, selectedChapter, title);
        setGeneratedCode(code);
        setImportStatus(`Successfully imported ${verses.length} verses`);
      } else {
        setImportStatus('No valid verses found in CSV data');
      }
    } catch (error) {
      setImportStatus(`Import failed: ${error}`);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setImportStatus('Code copied to clipboard!');
  };

  const downloadTemplate = () => {
    const template = `Sanskrit,Transliteration
"[Sanskrit verse 1]","[Transliteration verse 1]"
"[Sanskrit verse 2]","[Transliteration verse 2]"
"[Sanskrit verse 3]","[Transliteration verse 3]"`;
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedText}-chapter-${selectedChapter}-template.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-heading font-bold mb-8">Bulk Verse Import Tool</h1>
        
        {/* Public Domain Sources */}
        <Card>
          <CardHeader>
            <CardTitle>📚 Recommended Public Domain Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PUBLIC_DOMAIN_SOURCES.map((source, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{source.name}</h3>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{source.description}</p>
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Visit Source →
                  </a>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">✅ Safe to Use</h4>
              <p className="text-sm text-green-700">
                These sources provide public domain Sanskrit texts with verified transliterations. 
                Academic institutions like IIT Kanpur ensure accuracy and proper licensing.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Import Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>⚙️ Import Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Text:</label>
                <select 
                  value={selectedText} 
                  onChange={(e) => setSelectedText(e.target.value as any)}
                  className="w-full p-2 border rounded"
                >
                  <option value="bhagavad-gita">Bhagavad Gita</option>
                  <option value="devi-mahatmyam">Devi Mahatmyam</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Chapter:</label>
                <Input 
                  type="number" 
                  value={selectedChapter}
                  onChange={(e) => setSelectedChapter(parseInt(e.target.value))}
                  min="1"
                  max={selectedText === 'bhagavad-gita' ? 18 : 13}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={downloadTemplate}>
                <Download className="w-4 h-4 mr-2" />
                Download CSV Template
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* CSV Input */}
        <Card>
          <CardHeader>
            <CardTitle>📝 CSV Data Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Paste CSV Data (Format: Sanskrit,Transliteration):
              </label>
              <Textarea
                value={csvInput}
                onChange={(e) => setCsvInput(e.target.value)}
                placeholder={`Sanskrit,Transliteration
"धृतराष्ट्र उवाच। धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः।","dhṛtarāṣṭra uvāca | dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ |"
"सञ्जय उवाच। दृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा।","sañjaya uvāca | dṛṣṭvā tu pāṇḍavānīkaṃ vyūḍhaṃ duryodhanas tadā |"`}
                rows={10}
                className="font-mono text-sm"
              />
            </div>
            
            <Button onClick={handleImport} className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              Import Verses
            </Button>
            
            {importStatus && (
              <div className={`p-3 rounded ${
                importStatus.includes('Success') ? 'bg-green-50 text-green-700' : 
                importStatus.includes('failed') ? 'bg-red-50 text-red-700' : 
                'bg-blue-50 text-blue-700'
              }`}>
                {importStatus}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Generated Code */}
        {generatedCode && (
          <Card>
            <CardHeader>
              <CardTitle>🔧 Generated TypeScript Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Copy this code and paste it into the appropriate data file:
              </p>
              <div className="relative">
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto max-h-96">
                  <code>{generatedCode}</code>
                </pre>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
                <h4 className="font-semibold text-yellow-800 mb-2">📝 Next Steps:</h4>
                <ol className="text-sm text-yellow-700 space-y-1">
                  <li>1. Copy the generated code above</li>
                  <li>2. Open <code>src/data/{selectedText}Verses.ts</code></li>
                  <li>3. Replace the corresponding chapter object</li>
                  <li>4. Save the file and test the import</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BulkVerseImport;
