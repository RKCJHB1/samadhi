export interface SpeechChunk {
  id: number;
  title: string;
  text: string;
}

export enum MemorizationMode {
  READ = 'READ',
  FIRST_LETTER = 'FIRST_LETTER',
  CLOZE = 'CLOZE',
  BLUR = 'BLUR',
  SCRAMBLE = 'SCRAMBLE',
  WORD_SCRAMBLE = 'WORD_SCRAMBLE',
  VANISHING = 'VANISHING'
}
