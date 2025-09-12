import React from 'react';
import { Button } from '@/components/ui/button';

export type CharacterPaletteProps = {
  chars: string[];
  onInsert: (ch: string) => void;
  label?: string;
};

/**
 * Small inline character palette. Renders a compact row of buttons for special characters.
 * Usage: <CharacterPalette chars={['ā','ī']} onInsert={(ch)=>...} />
 */
const CharacterPalette: React.FC<CharacterPaletteProps> = ({ chars, onInsert, label }) => {
  if (!chars || chars.length === 0) return null;
  return (
    <div className="mt-2 flex flex-wrap items-center gap-1 text-xs">
      {label ? <span className="mr-2 text-gray-600">{label}</span> : null}
      {chars.map((ch, idx) => (
        <Button
          key={`${ch}-${idx}`}
          type="button"
          variant="secondary"
          size="sm"
          className="h-7 px-2 font-semibold leading-none"
          onClick={() => onInsert(ch)}
          title={`Insert ${ch}`}
        >
          {ch}
        </Button>
      ))}
    </div>
  );
};

export default CharacterPalette;

// Common sets
export const TRANSLITERATION_IAST: string[] = [
  // Vowels and vocalics
  'ā', 'ī', 'ū', 'ṛ', 'ṝ', 'ḷ', 'ḹ',
  // Anusvāra (ṁ = dot above) and visarga (ḥ)
  'ṁ', 'ṃ', 'ḥ',
  // Nasals and retroflexes
  'ñ', 'ṅ', 'ṭ', 'ḍ', 'ṇ',
  // Sibilants
  'ś', 'ṣ'
];

export const ARABIC_HELPERS: string[] = [
  'ء','آ','أ','إ','ؤ','ئ','ة','ى','ٰ','ّ','ْ','ً','ٌ','ٍ','َ','ُ','ِ'
];

