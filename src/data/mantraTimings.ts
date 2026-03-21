// This file contains the timing information for each syllable in the mantras
// The timings are in seconds and represent when each syllable should be highlighted
// during audio playback

// Svara types for Vedic accent/pitch marking
export type SvaraType = 'udatta' | 'anudatta' | 'svarita' | 'dirgha-svarita' | 'neutral';

export interface TimedSyllable {
  text: string;
  startTime: number;
  endTime: number;
  svara?: SvaraType; // Optional: when set, overrides duration-based inference
}

// Om Mantra
export const omMantraSyllables: TimedSyllable[] = [
  { text: "ॐ", startTime: 0, endTime: 3 }
];

// Gayatri Mantra
// Total audio: 18 seconds
// First 2.0 seconds: blank with sur (musical note)
// 2.0s to 17.0s: actual mantra (15 seconds for 27 syllables)
// Last 1.0 second: blank
export const gayatriMantraSyllables: TimedSyllable[] = [
  { text: "ॐ ", startTime: 2.0, endTime: 2.8 },
  { text: "भूर्", startTime: 2.8, endTime: 3.6 },
  { text: "भुवः ", startTime: 3.6, endTime: 4.3 },
  { text: "स्वः ", startTime: 4.3, endTime: 5.0 },
  // Minor break after स्वः (svah) - 0.15s pause
  { text: "तत्", startTime: 5.15, endTime: 5.64 },
  { text: "स", startTime: 5.64, endTime: 6.13 },
  { text: "वि", startTime: 6.13, endTime: 6.62 },
  { text: "तुर्", startTime: 6.62, endTime: 7.11 },
  { text: "व", startTime: 7.11, endTime: 7.6 },
  { text: "रे", startTime: 7.6, endTime: 8.09 },
  { text: "ण्यं ", startTime: 8.09, endTime: 8.58 },
  // Minor break after ण्यं (yam) - 0.15s pause
  { text: "भर्", startTime: 8.73, endTime: 9.22 },
  { text: "गो ", startTime: 9.22, endTime: 9.71 },
  { text: "दे", startTime: 9.71, endTime: 10.2 },
  { text: "व", startTime: 10.2, endTime: 10.69 },
  { text: "स्य ", startTime: 10.69, endTime: 11.18 },
  { text: "धी", startTime: 11.18, endTime: 11.67 },
  { text: "म", startTime: 11.67, endTime: 12.16 },
  { text: "हि ", startTime: 12.16, endTime: 12.65 },
  // Minor break after हि (hi) - 0.15s pause
  { text: "धि", startTime: 12.8, endTime: 13.29 },
  { text: "यो ", startTime: 13.29, endTime: 13.78 },
  { text: "यो ", startTime: 13.78, endTime: 14.27 },
  { text: "नः ", startTime: 14.27, endTime: 14.76 },
  { text: "प्र", startTime: 14.76, endTime: 15.25 },
  { text: "चो", startTime: 15.25, endTime: 15.74 },
  { text: "द", startTime: 15.74, endTime: 16.23 },
  { text: "यात्", startTime: 16.23, endTime: 17.0 }
];

// Saha Na Vavatu Mantra
// Canonical timing + svara data exported from mantra-configs.json
// Must stay in 1:1 alignment with transliterationSyllables for Saha Navavatu
export const sahaNavatuMantraSyllables: TimedSyllable[] = [
  { text: "ॐ ", startTime: 3.0, endTime: 4.0, svara: 'udatta' },
  { text: "स", startTime: 4.0, endTime: 4.3, svara: 'neutral' },
  { text: "ह ", startTime: 4.3, endTime: 4.6, svara: 'neutral' },
  { text: "ना", startTime: 4.6, endTime: 4.9, svara: 'udatta' },
  { text: "व", startTime: 4.9, endTime: 5.2, svara: 'neutral' },
  { text: "व", startTime: 5.2, endTime: 5.5, svara: 'neutral' },
  { text: "तु ", startTime: 5.5, endTime: 6.0, svara: 'neutral' },
  { text: "स", startTime: 6.2, endTime: 6.5, svara: 'neutral' },
  { text: "ह ", startTime: 6.5, endTime: 6.8, svara: 'neutral' },
  { text: "नौ ", startTime: 6.8, endTime: 7.1, svara: 'udatta' },
  { text: "भु", startTime: 7.1, endTime: 7.5, svara: 'neutral' },
  { text: "न", startTime: 7.5, endTime: 8.0, svara: 'neutral' },
  { text: "क्तु ", startTime: 8.0, endTime: 9.0, svara: 'neutral' },
  { text: "स", startTime: 9.2, endTime: 9.4, svara: 'neutral' },
  { text: "ह ", startTime: 9.4, endTime: 9.6, svara: 'neutral' },
  { text: "वी", startTime: 9.6, endTime: 9.8, svara: 'neutral' },
  { text: "र्य", startTime: 9.8, endTime: 10.0, svara: 'udatta' },
  { text: "ं ", startTime: 10.0, endTime: 10.2, svara: 'udatta' },
  { text: "क", startTime: 10.2, endTime: 10.8, svara: 'neutral' },
  { text: "र", startTime: 10.8, endTime: 11.4, svara: 'neutral' },
  { text: "वा", startTime: 11.4, endTime: 12.0, svara: 'neutral' },
  { text: "व", startTime: 12.0, endTime: 12.5, svara: 'neutral' },
  { text: "है ", startTime: 12.5, endTime: 13.0, svara: 'neutral' },
  { text: "ते", startTime: 13.5, endTime: 14.0, svara: 'anudatta' },
  { text: "ज", startTime: 14.0, endTime: 14.3, svara: 'neutral' },
  { text: "स्वि", startTime: 14.3, endTime: 14.6, svara: 'neutral' },
  { text: "ना", startTime: 14.6, endTime: 14.9, svara: 'anudatta' },
  { text: "व", startTime: 14.9, endTime: 15.2, svara: 'neutral' },
  { text: "धी", startTime: 15.2, endTime: 15.5, svara: 'udatta' },
  { text: "त", startTime: 15.5, endTime: 15.8, svara: 'neutral' },
  { text: "म", startTime: 15.8, endTime: 16.1, svara: 'neutral' },
  { text: "स्तु ", startTime: 16.1, endTime: 16.5, svara: 'neutral' },
  { text: "मा ", startTime: 16.5, endTime: 16.8, svara: 'neutral' },
  { text: "वि", startTime: 16.8, endTime: 17.2, svara: 'neutral' },
  { text: "द्वि", startTime: 17.2, endTime: 17.6, svara: 'neutral' },
  { text: "षा", startTime: 17.6, endTime: 18.0, svara: 'neutral' },
  { text: "व", startTime: 18.0, endTime: 18.5, svara: 'neutral' },
  { text: "है ", startTime: 18.5, endTime: 20.0, svara: 'svarita' },
  { text: "ॐ ", startTime: 20.2, endTime: 21.0, svara: 'neutral' },
  { text: "शान्", startTime: 21.0, endTime: 21.8, svara: 'neutral' },
  { text: "ति", startTime: 21.8, endTime: 22.5, svara: 'neutral' },
  { text: "ः ", startTime: 22.5, endTime: 23.0, svara: 'neutral' },
  { text: "शान्", startTime: 23.0, endTime: 23.8, svara: 'neutral' },
  { text: "ति", startTime: 23.8, endTime: 24.5, svara: 'neutral' },
  { text: "ः ", startTime: 24.5, endTime: 25.0, svara: 'neutral' },
  { text: "शान्", startTime: 25.0, endTime: 25.5, svara: 'neutral' },
  { text: "ति", startTime: 25.5, endTime: 25.8, svara: 'neutral' },
  { text: "ः", startTime: 25.8, endTime: 26.0, svara: 'neutral' },
];

// Mahamrityunjaya Mantra
// Note: These are approximate timings and should be adjusted based on the actual audio recording
export const mahamrityunjayaMantraSyllables: TimedSyllable[] = [
  { text: "ॐ ", startTime: 0, endTime: 1.5 },
  { text: "त्र्य", startTime: 1.5, endTime: 2.0 },
  { text: "म्ब", startTime: 2.0, endTime: 2.5 },
  { text: "कं ", startTime: 2.5, endTime: 3.0 },
  { text: "य", startTime: 3.0, endTime: 3.3 },
  { text: "जा", startTime: 3.3, endTime: 3.6 },
  { text: "म", startTime: 3.6, endTime: 3.9 },
  { text: "हे ", startTime: 3.9, endTime: 4.2 },
  { text: "सु", startTime: 4.2, endTime: 4.5 },
  { text: "ग", startTime: 4.5, endTime: 4.8 },
  { text: "न्धिं ", startTime: 4.8, endTime: 5.2 },
  { text: "पु", startTime: 5.2, endTime: 5.5 },
  { text: "ष्टि", startTime: 5.5, endTime: 5.8 },
  { text: "व", startTime: 5.8, endTime: 6.1 },
  { text: "र्ध", startTime: 6.1, endTime: 6.4 },
  { text: "न", startTime: 6.4, endTime: 6.7 },
  { text: "म् ", startTime: 6.7, endTime: 7.0 },
  { text: "उ", startTime: 7.0, endTime: 7.3 },
  { text: "र्वा", startTime: 7.3, endTime: 7.6 },
  { text: "रु", startTime: 7.6, endTime: 7.9 },
  { text: "क", startTime: 7.9, endTime: 8.2 },
  { text: "मि", startTime: 8.2, endTime: 8.5 },
  { text: "व ", startTime: 8.5, endTime: 8.8 },
  { text: "ब", startTime: 8.8, endTime: 9.1 },
  { text: "न्ध", startTime: 9.1, endTime: 9.4 },
  { text: "ना", startTime: 9.4, endTime: 9.7 },
  { text: "न् ", startTime: 9.7, endTime: 10.0 },
  { text: "मृ", startTime: 10.0, endTime: 10.3 },
  { text: "त्यो", startTime: 10.3, endTime: 10.6 },
  { text: "र्मु", startTime: 10.6, endTime: 10.9 },
  { text: "क्षी", startTime: 10.9, endTime: 11.2 },
  { text: "य ", startTime: 11.2, endTime: 11.5 },
  { text: "मा", startTime: 11.5, endTime: 11.8 },
  { text: "मृ", startTime: 11.8, endTime: 12.1 },
  { text: "ता", startTime: 12.1, endTime: 12.4 },
  { text: "त्", startTime: 12.4, endTime: 13.0 }
];
