// This file contains the timing information for each syllable in the mantras
// The timings are in seconds and represent when each syllable should be highlighted
// during audio playback

export interface TimedSyllable {
  text: string;
  startTime: number;
  endTime: number;
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
