export function splitParagraphIntoSentences(para: string): string[] {
  const og = para.replace(/\s+/g, ' ').trim();
  // Insert a separator after sentence-ending punctuation followed by a likely sentence start
  const withSep = og.replace(/([.!?]["'”’)?\]]*)\s+(?=[A-Z"“'])/g, '$1|SEP| ');
  return withSep
    .split('|SEP|')
    .map((s) => s.trim())
    .filter(Boolean);
}

export function splitLectureParagraphs(paragraphs: string[]): string[][] {
  return paragraphs.map((p) => splitParagraphIntoSentences(p));
}

export function flattenSentences(paragraphs: string[]): string[] {
  return splitLectureParagraphs(paragraphs).flat();
}

export function countSentences(paragraphs: string[]): number {
  return flattenSentences(paragraphs).length;
}

export function buildSentenceOffsets(perParagraphSentences: string[][]): number[] {
  const offsets: number[] = [];
  let acc = 0;
  for (const arr of perParagraphSentences) {
    offsets.push(acc);
    acc += arr.length;
  }
  return offsets;
}

