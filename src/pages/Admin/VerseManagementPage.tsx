import React, { useState, useRef } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Download, Save, FileText, Database } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const VerseManagementPage = () => {
  const [selectedText, setSelectedText] = useState<'bhagavad-gita' | 'devi-mahatmyam'>('bhagavad-gita');
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [verses, setVerses] = useState<Array<{verse: number, sanskrit: string, transliteration: string}>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const csvText = e.target?.result as string;
      const lines = csvText.split('\n');
      const header = lines[0].split(',');
      
      const parsedVerses = lines.slice(1)
        .filter(line => line.trim())
        .map((line, index) => {
          const columns = line.split(',').map(col => col.trim().replace(/"/g, ''));
          return {
            verse: index + 1,
            sanskrit: columns[0] || '',
            transliteration: columns[1] || ''
          };
        });
      
      setVerses(parsedVerses);
    };
    
    reader.readAsText(file);
  };

  const downloadTemplate = () => {
    const csvContent = [
      'Sanskrit,Transliteration',
      '[Sanskrit text for verse 1],[Transliteration for verse 1]',
      '[Sanskrit text for verse 2],[Transliteration for verse 2]',
      '...'
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedText}-chapter-${selectedChapter}-template.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const saveVerses = () => {
    // This would save to your backend or local storage
    const data = {
      text: selectedText,
      chapter: selectedChapter,
      verses: verses
    };
    
    localStorage.setItem(`verses-${selectedText}-${selectedChapter}`, JSON.stringify(data));
    alert('Verses saved successfully!');
  };

  return (
    <PageLayout title="Verse Management">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-heading font-bold mb-8">Sanskrit Verse Management</h1>
          
          <Tabs defaultValue="import" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="import">Import Verses</TabsTrigger>
              <TabsTrigger value="edit">Edit Verses</TabsTrigger>
              <TabsTrigger value="sources">Content Sources</TabsTrigger>
              <TabsTrigger value="export">Export Data</TabsTrigger>
            </TabsList>

            <TabsContent value="import" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Import Verses from CSV</CardTitle>
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

                  <div className="flex gap-4">
                    <Button onClick={() => fileInputRef.current?.click()}>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload CSV File
                    </Button>
                    <Button variant="outline" onClick={downloadTemplate}>
                      <Download className="w-4 h-4 mr-2" />
                      Download Template
                    </Button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {verses.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Imported {verses.length} verses for {selectedText} Chapter {selectedChapter}
                      </h3>
                      <Button onClick={saveVerses}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Verses
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sources" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Content Sources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Bhagavad Gita Sources:</h3>
                      <div className="space-y-2">
                        <div className="p-3 border rounded">
                          <h4 className="font-medium">Gita Supersite (IITK)</h4>
                          <p className="text-sm text-gray-600">Public domain Sanskrit text with transliterations</p>
                          <a href="https://www.gitasupersite.iitk.ac.in/" target="_blank" rel="noopener noreferrer" 
                             className="text-blue-600 text-sm">Visit Site →</a>
                        </div>
                        <div className="p-3 border rounded">
                          <h4 className="font-medium">Sanskrit Documents</h4>
                          <p className="text-sm text-gray-600">Open source Sanskrit text collection</p>
                          <a href="https://sanskritdocuments.org/" target="_blank" rel="noopener noreferrer"
                             className="text-blue-600 text-sm">Visit Site →</a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Devi Mahatmyam Sources:</h3>
                      <div className="space-y-2">
                        <div className="p-3 border rounded">
                          <h4 className="font-medium">Digital Library of India</h4>
                          <p className="text-sm text-gray-600">Public domain Sanskrit manuscripts</p>
                        </div>
                        <div className="p-3 border rounded">
                          <h4 className="font-medium">Wikisource</h4>
                          <p className="text-sm text-gray-600">Collaborative Sanskrit text project</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
                    <h4 className="font-medium text-yellow-800">Important Note:</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Always verify that sources are public domain or properly licensed. 
                      When in doubt, consult with Sanskrit scholars or use academic institutions' verified texts.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="export" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Export Current Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Export your current verse data for backup or sharing with other systems.
                  </p>
                  <div className="flex gap-4">
                    <Button variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Export as CSV
                    </Button>
                    <Button variant="outline">
                      <Database className="w-4 h-4 mr-2" />
                      Export as JSON
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default VerseManagementPage;
