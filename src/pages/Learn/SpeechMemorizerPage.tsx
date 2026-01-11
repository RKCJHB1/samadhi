/**
 * Speech Memorizer Page
 * Helps users memorize Swami Vivekananda's 1893 Chicago Address
 */

import React, { useState } from 'react';
import TranslationLayout from '@/components/layout/TranslationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { SPEECH_CHUNKS, MemorizationMode, SpeechChunk } from '@/data/speechChunks';
import MemorizationTools from '@/components/speech/MemorizationTools';

const PASSWORD = 'Swamiji';
const AUTH_KEY = 'speech_memorizer_auth';

const SpeechMemorizerPage: React.FC = () => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // App state
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [mode, setMode] = useState<MemorizationMode>(MemorizationMode.READ);

  const currentChunk: SpeechChunk = SPEECH_CHUNKS[currentChunkIndex];

  // Handle password submission
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password');
    }
  };

  // Navigation handlers
  const goToPrevious = () => {
    if (currentChunkIndex > 0) {
      setCurrentChunkIndex(currentChunkIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentChunkIndex < SPEECH_CHUNKS.length - 1) {
      setCurrentChunkIndex(currentChunkIndex + 1);
    }
  };

  // Password gate UI
  if (!isAuthenticated) {
    return (
      <TranslationLayout title="Speech Memorizer">
        <div className="min-h-[60vh] flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-indian-saffron/10 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-indian-saffron" />
              </div>
              <CardTitle className="text-2xl text-spiritual-800">Speech Memorizer</CardTitle>
              <p className="text-spiritual-600 mt-2">
                Enter the password to access the Vivekananda Speech Memorizer
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <Input
                  type="password"
                  placeholder="Enter password..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="text-center text-lg"
                />
                {authError && (
                  <p className="text-red-500 text-sm text-center">{authError}</p>
                )}
                <Button type="submit" className="w-full bg-indian-saffron hover:bg-indian-saffron/90">
                  Enter
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </TranslationLayout>
    );
  }

  // Main app UI
  return (
    <TranslationLayout title="Speech Memorizer">
      <div className="min-h-screen bg-gradient-to-b from-indian-cream/30 to-white">
        {/* Orange Header Bar */}
        <div className="bg-indian-saffron text-white py-4 px-4">
          <div className="container mx-auto max-w-4xl flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Swamiji's Speech</h1>
              <p className="text-white/80 text-sm">Chicago, 1893</p>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
              Chunk {currentChunkIndex + 1} / {SPEECH_CHUNKS.length}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {/* Welcome/Instructions Card */}
          <Card className="mb-6 border-indian-saffron/20">
            <CardContent className="p-5">
              <p className="text-spiritual-700 leading-relaxed">
                Welcome to the <strong className="text-indian-saffron">Vivekananda Speech Memorizer</strong>.
                This tool is designed to help you commit Swami Vivekananda's historic 1893 Chicago address to memory.
                Using the technique of "chunking," the speech is broken down into small, manageable parts.
                Switch between different interactive modes below—like <em>Sentence Builder</em> or <em>Vanishing Text</em>—to
                test your recall and master each section step-by-step.
              </p>
            </CardContent>
          </Card>

          {/* Navigation Row */}
          <Card className="mb-6 border-indian-saffron/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={goToPrevious}
                    disabled={currentChunkIndex === 0}
                    className="border-spiritual-300"
                  >
                    ← Previous
                  </Button>
                  <Button
                    variant="outline"
                    onClick={goToNext}
                    disabled={currentChunkIndex === SPEECH_CHUNKS.length - 1}
                    className="border-spiritual-300"
                  >
                    Next →
                  </Button>
                </div>

              </div>
            </CardContent>
          </Card>

          {/* Memorization Tools */}
          <MemorizationTools
            chunk={currentChunk}
            mode={mode}
            onModeChange={setMode}
          />

          {/* Chunk Quick Select */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {SPEECH_CHUNKS.map((chunk, idx) => (
              <button
                key={chunk.id}
                onClick={() => setCurrentChunkIndex(idx)}
                className={`w-10 h-10 rounded-full font-medium text-sm transition-all ${
                  idx === currentChunkIndex
                    ? 'bg-indian-saffron text-white shadow-md scale-110'
                    : idx < currentChunkIndex
                      ? 'bg-indian-saffron/30 text-indian-saffron hover:bg-indian-saffron/40'
                      : 'bg-spiritual-100 text-spiritual-600 hover:bg-spiritual-200'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </TranslationLayout>
  );
};

export default SpeechMemorizerPage;

