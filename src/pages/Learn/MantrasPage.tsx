
import React, { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import SectionHeader from '../../components/shared/SectionHeader';
import AudioPlayer from '../../components/audio/AudioPlayer';
import { isDevelopment } from '@/utils/featureFlags';

const mantras = [
  {
    id: 'om',
    title: 'Om (ॐ)',
    sanskrit: 'ॐ',
    audio: '/audio/om.mp3', // Placeholder
    description: 'The most sacred sound in Hinduism, representing the essence of the ultimate reality, consciousness or Atman.',
    explanation: 'Om is considered the primordial sound from which all creation emerged. It consists of three sounds: A, U, and M, which represent creation, preservation, and dissolution, as well as the three states of consciousness (waking, dreaming, and deep sleep).',
    instructions: 'Begin by sitting comfortably with your spine straight. Take a few deep breaths. Then, intone "Om" by pronouncing all three sounds (A-U-M) and letting the sound vibration fade into silence. Repeat 3-11 times.',
  },
  {
    id: 'gayatri',
    title: 'Gayatri Mantra',
    sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्',
    audio: '/audio/gayatri.mp3', // Placeholder
    description: 'One of the most important mantras in Hinduism, dedicated to Savitr, the sun deity.',
    explanation: 'The Gayatri Mantra is from the Rigveda (3.62.10) and is dedicated to Savitr, the sun deity. It is a prayer for illumination of the intellect. The mantra asks the divine to illuminate our minds and inspire our understanding.',
    instructions: 'Traditionally chanted at dawn, noon, and dusk, but can be practiced at any time. Sit facing east if possible. Chant slowly and with reverence, contemplating the meaning. Can be repeated 3, 9, or 108 times.',
  },
  {
    id: 'mahamrityunjaya',
    title: 'Mahamrityunjaya Mantra',
    sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्',
    audio: '/audio/mahamrityunjaya.mp3', // Placeholder
    description: 'A healing mantra dedicated to Lord Shiva that provides protection and liberation.',
    explanation: 'Known as the "Great Death-Conquering Mantra," it is addressed to Lord Shiva for overcoming death and disease. It promotes health, longevity, and ultimate liberation. It is believed to have strong healing properties.',
    instructions: 'Can be chanted during illness or challenging times. Ideally chanted 11 times daily. Focus on the healing vibrations of the mantra and its protective qualities.',
  },
];

const MantrasPage = () => {
  const [audioErrors, setAudioErrors] = useState<Record<string, boolean>>({});

  // Hide mantras page in production
  if (!isDevelopment()) {
    return (
      <PageLayout title="Page Not Available">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-heading font-bold mb-4">Page Not Available</h1>
            <p className="text-muted-foreground mb-8">This page is currently under development and not available in production.</p>
            <a href="/learn" className="inline-flex items-center px-4 py-2 bg-spiritual-500 text-white rounded-md hover:bg-spiritual-600 transition-colors">
              Back to Learning Centre
            </a>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Learning Mantras - Development Mode">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
            <strong>Development Mode:</strong> This mantras page is currently in development and not available in production.
          </div>
          <SectionHeader
            title="Learning Mantras"
            subtitle="Sacred sound formulas for meditation and spiritual practice"
            alignment="left"
          />

          <div className="prose prose-lg max-w-none mb-8">
            <p>
              Mantras are sacred sounds, syllables, words, or phrases in Sanskrit that are repeated during meditation or rituals. Each mantra carries specific vibrations and meanings that can help focus the mind, invoke particular energies, and deepen spiritual connection.
            </p>
            <p>
              Below you'll find several important mantras with their meaning, audio pronunciation guides, and instructions for practice. We encourage you to approach these sacred sounds with respect and consistent practice.
            </p>
          </div>

          <div className="space-y-12">
            {mantras.map((mantra) => (
              <div key={mantra.id} className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-2xl font-heading font-semibold mb-4">{mantra.title}</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                  <div className="col-span-1">
                    <h3 className="text-lg font-medium mb-2">Sanskrit</h3>
                    <p className="text-2xl font-sans leading-relaxed">{mantra.sanskrit}</p>
                  </div>

                  <div className="col-span-2">
                    <h3 className="text-lg font-medium mb-2">Audio Pronunciation</h3>
                    <div className="rounded-md">
                      <AudioPlayer src={mantra.audio} title={`${mantra.title} Pronunciation`} />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p>{mantra.description}</p>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Explanation</h3>
                  <p>{mantra.explanation}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Practice Instructions</h3>
                  <p>{mantra.instructions}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-spiritual-50 p-6 rounded-lg my-12 border-l-4 border-spiritual-500">
            <h3 className="text-xl font-heading font-semibold mb-2">Learning with Guidance</h3>
            <p>
              While these resources can help you begin your practice, learning mantras directly from a qualified teacher is highly recommended for proper pronunciation and understanding. Consider joining our satsangs or special mantra chanting sessions at the centre.
            </p>
            <p className="mt-4">
              Check our <a href="/services/satsangs" className="text-spiritual-600 hover:text-spiritual-700">Satsangs</a> page for upcoming chanting sessions.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default MantrasPage;
