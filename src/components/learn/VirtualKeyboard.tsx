import React from 'react';
import { Button } from '@/components/ui/button';

export type VirtualKeyboardProps = {
  rows: string[][];
  onInsert: (value: string) => void;
  onBackspace?: () => void;
  label?: string;
  compact?: boolean;
};

/**
 * Simple on-screen virtual keyboard. Renders rows of keys.
 * Special key token: "{space}" for space; "{backspace}" for backspace (calls onBackspace if provided).
 */
const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ rows, onInsert, onBackspace, label, compact }) => {
  if (!rows || rows.length === 0) return null;
  const keyClass = compact ? 'h-7 px-2 text-xs' : 'h-8 px-3 text-sm';
  return (
    <div className="mt-2 select-none">
      {label ? <div className="text-xs text-gray-600 mb-1">{label}</div> : null}
      <div className="flex flex-col gap-1">
        {rows.map((row, ri) => (
          <div key={ri} className="flex flex-wrap gap-1">
            {row.map((k, ki) => {
              const isSpace = k === '{space}';
              const isBack = k === '{backspace}';
              const label = isSpace ? 'Space' : isBack ? '⌫' : k;
              const handler = () => {
                if (isSpace) onInsert(' ');
                else if (isBack) onBackspace && onBackspace();
                else onInsert(k);
              };
              const width = isSpace ? 'min-w-[4.5rem]' : '';
              return (
                <Button
                  key={`${ri}-${ki}-${k}`}
                  type="button"
                  variant="secondary"
                  size="sm"
                  className={`${keyClass} ${width} font-medium`}
                  onClick={handler}
                >
                  {label}
                </Button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualKeyboard;

// Basic Devanagari (Hindi) keyboard layout: vowels, matras, consonants, digits, punctuation
export const KEYBOARD_HINDI_DEVANAGARI: string[][] = [
  ['अ','आ','इ','ई','उ','ऊ','ऋ','ए','ऐ','ओ','औ','अं','अः'],
  ['ा','ि','ी','ु','ू','ृ','े','ै','ो','ौ','ं','ः','ँ','्'],
  ['क','ख','ग','घ','ङ','च','छ','ज','झ','ञ'],
  ['ट','ठ','ड','ढ','ण','त','थ','द','ध','न'],
  ['प','फ','ब','भ','म','य','र','ल','व','श','ष','स','ह','ळ'],
  ['क्ष','ज्ञ','ॐ','₹','।','ऽ','॰'],
  ['०','१','२','३','४','५','६','७','८','९'],
  ['{space}','{backspace}']
];

// Basic Arabic keyboard layout: letters and harakat
export const KEYBOARD_ARABIC: string[][] = [
  ['ا','أ','إ','آ','ى','ء','ؤ','ئ','ب','ت','ث','ج','ح','خ'],
  ['د','ذ','ر','ز','س','ش','ص','ض','ط','ظ','ع','غ','ف','ق'],
  ['ك','ل','م','ن','ه','و','ي','ة','لا','لأ','لإ','لآ'],
  ['َ','ُ','ِ','ً','ٌ','ٍ','ْ','ّ','ٰ'],
  ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'],
  ['{space}','{backspace}']
];

