/**
 * Speech chunks and types for the Vivekananda Speech Memorizer
 * Based on Swami Vivekananda's 1893 Chicago Address
 */

export interface SpeechChunk {
  id: number;
  title: string;
  text: string;
}

export enum MemorizationMode {
  READ = 'READ',
  VANISHING = 'VANISHING',
  SCRAMBLE = 'SCRAMBLE',
  WORD_SCRAMBLE = 'WORD_SCRAMBLE',
  BLUR = 'BLUR',
  FIRST_LETTER = 'FIRST_LETTER',
  CLOZE = 'CLOZE'
}

export const SPEECH_CHUNKS: SpeechChunk[] = [
  {
    id: 1,
    title: "The Opening",
    text: "Sisters and Brothers of America, It fills my heart with joy unspeakable to rise in response to the warm and cordial welcome which you have given us. I thank you in the name of the most ancient order of monks in the world; I thank you in the name of the mother of religions; and I thank you in the name of millions and millions of Hindu people of all classes and sects."
  },
  {
    id: 2,
    title: "Tolerance and Acceptance",
    text: "My thanks, also, to some of the speakers on this platform who, referring to the delegates from the Orient, have told you that these men from far-off nations may well claim the honour of bearing to different lands the idea of toleration. I am proud to belong to a religion which has taught the world both tolerance and universal acceptance. We believe not only in universal toleration, but we accept all religions as true."
  },
  {
    id: 3,
    title: "The Persecuted",
    text: "I am proud to belong to a nation which has sheltered the persecuted and the refugees of all religions and all nations of the earth. I am proud to tell you that we have gathered in our bosom the purest remnant of the Israelites, who came to Southern India and took refuge with us in the very year in which their holy temple was shattered to pieces by Roman tyranny. I am proud to belong to the religion which has sheltered and is still fostering the remnant of the grand Zoroastrian nation."
  },
  {
    id: 4,
    title: "The Hymn",
    text: "I will quote to you, brethren, a few lines from a hymn which I remember to have repeated from my earliest boyhood, which is every day repeated by millions of human beings: 'As the different streams having their sources in different places all mingle their water in the sea, so, O Lord, the different paths which men take through different tendencies, various though they appear, crooked or straight, all lead to Thee.'"
  },
  {
    id: 5,
    title: "Sectarianism",
    text: "The present convention, which is one of the most august assemblies ever held, is in itself a vindication, a declaration to the world of the wonderful doctrine preached in the Gita: 'Whosoever comes to Me, through whatsoever form, I reach him; all men are struggling through paths which in the end lead to me.' Sectarianism, bigotry, and its horrible descendant, fanaticism, have long possessed this beautiful earth. They have filled the earth with violence, drenched it often and often with human blood, destroyed civilisation and sent whole nations to despair."
  },
  {
    id: 6,
    title: "The Conclusion",
    text: "Had it not been for these horrible demons, human society would be far more advanced than it is now. But their time is come; and I fervently hope that the bell that tolled this morning in honour of this convention may be the death-knell of all fanaticism, of all persecutions with the sword or with the pen, and of all uncharitable feelings between persons wending their way to the same goal."
  }
];

export const MODE_DESCRIPTIONS: Record<MemorizationMode, string> = {
  [MemorizationMode.READ]: "Read the text carefully to absorb the rhythm and flow. Focus on understanding the meaning and emotion behind Swamiji's words.",
  [MemorizationMode.SCRAMBLE]: "The chunks are mixed up. Put them back in the correct order to understand how the ideas flow together.",
  [MemorizationMode.WORD_SCRAMBLE]: "Drag and drop the words to build perfect sentences. This helps you learn the exact grammar and word order.",
  [MemorizationMode.BLUR]: "The text is blurred to test your memory. Try to recite it, and only hover over a word if you really need a peek.",
  [MemorizationMode.FIRST_LETTER]: "See only the first letter of each word. This acts as a clue to help you recall the full word on your own.",
  [MemorizationMode.CLOZE]: "Fill in the missing words. Forcing your brain to find the answer is the best way to strengthen your memory.",
  [MemorizationMode.VANISHING]: "Use the slider to slowly fade the text away. Challenge yourself to keep reciting as more letters disappear."
};

export const MODE_LABELS: Record<MemorizationMode, string> = {
  [MemorizationMode.READ]: "Read",
  [MemorizationMode.SCRAMBLE]: "Scramble",
  [MemorizationMode.WORD_SCRAMBLE]: "Sentence Builder",
  [MemorizationMode.BLUR]: "Blur",
  [MemorizationMode.FIRST_LETTER]: "First Letter",
  [MemorizationMode.CLOZE]: "Fill Blanks",
  [MemorizationMode.VANISHING]: "Vanishing"
};

