import {
  VedantasaraCard,
  vedantasaraCards,
} from '../../data/vedantasaraCards';

export type Mark = 'known' | 'review';
export type SessionSize = 10 | 20 | 'all';
export type StudyMode = 'flip' | 'choice' | 'match';
export type CardDirection = 'term' | 'meaning';

const STORAGE_KEY = 'vedantasara-quiz-v1';

/** Terms that are easy to confuse. Choice questions prefer distractors from the same group. */
const CONFUSABLE_GROUPS: readonly (readonly string[])[] = [
  ['adhyasa', 'adhyaropa', 'apavada'],
  ['shama', 'dama', 'uparati', 'samadhana', 'titiksha', 'shraddha'],
  ['vishva', 'taijasa', 'prajna', 'viraj', 'hiranyagarbha', 'ishvara', 'turiya'],
  ['sthula-sharira', 'sukshma-sharira', 'karana-sharira'],
  ['savikalpa-samadhi', 'nirvikalpa-samadhi'],
  ['jivanmukta', 'videhamukti', 'kaivalya'],
  ['nitya', 'naimittika', 'prayaschitta'],
  ['sanchita', 'prarabdha', 'agamin'],
  ['laya', 'vikshepa', 'kashaya', 'rasasvada'],
  ['maya', 'ajnana'],
  ['mahavakya', 'tat-tvam-asi', 'aham-brahmasmi', 'vacyartha-lakshyartha', 'jahad-ajahal-lakshana'],
  ['brahman', 'akhanda-sat-cit-ananda', 'ishvara', 'sakshin'],
];

export interface MatchSlot {
  id: string;
  column: string;
  cardId: string;
}

export interface MatchRow {
  id: string;
  title: string;
  hint: string;
  slots: MatchSlot[];
}

export const STATE_MATCH_ROWS: readonly MatchRow[] = [
  {
    id: 'waking',
    title: 'Waking',
    hint: 'Experience through the gross body',
    slots: [
      { id: 'waking-individual', column: 'Individual', cardId: 'vishva' },
      { id: 'waking-cosmic', column: 'Cosmic', cardId: 'viraj' },
      { id: 'waking-body', column: 'Body', cardId: 'sthula-sharira' },
    ],
  },
  {
    id: 'dream',
    title: 'Dream',
    hint: 'Experience through the subtle body',
    slots: [
      { id: 'dream-individual', column: 'Individual', cardId: 'taijasa' },
      { id: 'dream-cosmic', column: 'Cosmic', cardId: 'hiranyagarbha' },
      { id: 'dream-body', column: 'Body', cardId: 'sukshma-sharira' },
    ],
  },
  {
    id: 'sleep',
    title: 'Deep sleep',
    hint: 'Experience through the causal body',
    slots: [
      { id: 'sleep-individual', column: 'Individual', cardId: 'prajna' },
      { id: 'sleep-cosmic', column: 'Cosmic', cardId: 'ishvara' },
      { id: 'sleep-body', column: 'Body', cardId: 'karana-sharira' },
    ],
  },
  {
    id: 'fourth',
    title: 'The Fourth',
    hint: 'No body. Pure Consciousness, the substratum of the three states.',
    slots: [{ id: 'fourth-remains', column: 'What remains', cardId: 'turiya' }],
  },
];

export const STATE_MATCH_CHIPS: readonly { cardId: string; label: string }[] = [
  { cardId: 'vishva', label: 'Viśva' },
  { cardId: 'taijasa', label: 'Taijasa' },
  { cardId: 'prajna', label: 'Prājña' },
  { cardId: 'viraj', label: 'Virāj' },
  { cardId: 'hiranyagarbha', label: 'Hiraṇyagarbha' },
  { cardId: 'ishvara', label: 'Īśvara' },
  { cardId: 'sthula-sharira', label: 'Gross body' },
  { cardId: 'sukshma-sharira', label: 'Subtle body' },
  { cardId: 'karana-sharira', label: 'Causal body' },
  { cardId: 'turiya', label: 'Turīya' },
];

const VALID_IDS = new Set(vedantasaraCards.map((card) => card.id));

export function cardCopy(card: VedantasaraCard): { lead: string; rest: string } {
  if (card.summary) return { lead: card.summary, rest: card.definition };
  const match = card.definition.match(/^(.+?[.!?])(?:\s+|$)([\s\S]*)$/);
  if (!match) return { lead: card.definition, rest: '' };
  return { lead: match[1], rest: match[2].trim() };
}

export function recallPrompt(card: VedantasaraCard): string {
  const { lead } = cardCopy(card);
  const redacted = redactTerm(lead, card);
  return redacted || 'Which term has this meaning?';
}

export function loadMarks(): Record<string, Mark> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as { marks?: Record<string, unknown> };
    const marks: Record<string, Mark> = {};
    for (const [id, mark] of Object.entries(parsed.marks ?? {})) {
      if (VALID_IDS.has(id) && (mark === 'known' || mark === 'review')) marks[id] = mark;
    }
    return marks;
  } catch {
    return {};
  }
}

export function saveMarks(marks: Record<string, Mark>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ marks }));
  } catch {
    // Storage can be unavailable in private browsing. The session still works.
  }
}

/** Unmarked cards come first, then review, then known. A full session keeps text order. */
export function buildSession(
  cards: VedantasaraCard[],
  marks: Record<string, Mark>,
  size: SessionSize,
): string[] {
  const ordered = size === 'all'
    ? cards
    : [...cards].sort((a, b) => rank(marks[a.id]) - rank(marks[b.id]));
  const limited = size === 'all' ? ordered : ordered.slice(0, size);
  return limited.map((card) => card.id);
}

export function shuffleIds(ids: string[]): string[] {
  const next = [...ids];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function buildOptions(card: VedantasaraCard, cards: VedantasaraCard[]): VedantasaraCard[] {
  const byId = new Map(cards.map((item) => [item.id, item]));
  const preferredIds = new Set(
    CONFUSABLE_GROUPS.filter((group) => group.includes(card.id)).flat(),
  );
  preferredIds.delete(card.id);

  const preferred = shuffleIds([...preferredIds])
    .map((id) => byId.get(id))
    .filter((item): item is VedantasaraCard => Boolean(item));
  const sameChapter = shuffleCards(
    cards.filter((item) => item.chapter === card.chapter && item.id !== card.id && !preferredIds.has(item.id)),
  );
  const others = shuffleCards(
    cards.filter((item) => item.id !== card.id && item.chapter !== card.chapter && !preferredIds.has(item.id)),
  );
  const distractors = [...preferred, ...sameChapter, ...others].slice(0, 3);
  return shuffleCards([card, ...distractors]);
}

export function speakTerm(card: VedantasaraCard) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  const synth = window.speechSynthesis;
  const speak = () => {
    const text = card.sanskrit || card.term;
    const utterance = new SpeechSynthesisUtterance(text);
    const hindi = synth.getVoices().find((voice) => voice.lang.toLowerCase().startsWith('hi'));
    if (card.sanskrit && hindi) {
      utterance.voice = hindi;
      utterance.lang = hindi.lang;
    } else if (card.sanskrit) {
      utterance.lang = 'hi-IN';
    } else {
      utterance.lang = 'en-GB';
    }
    utterance.rate = 0.82;
    synth.cancel();
    synth.speak(utterance);
  };

  if (synth.getVoices().length > 0) {
    speak();
    return;
  }

  let spoken = false;
  const once = () => {
    if (spoken) return;
    spoken = true;
    synth.removeEventListener('voiceschanged', once);
    speak();
  };
  synth.addEventListener('voiceschanged', once);
  synth.getVoices();
  window.setTimeout(once, 300);
}

export function canSpeak(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

function rank(mark: Mark | undefined): number {
  if (!mark) return 0;
  if (mark === 'review') return 1;
  return 2;
}

function redactTerm(text: string, card: VedantasaraCard): string {
  const needles = [card.term, card.sanskrit].filter((value): value is string => Boolean(value));
  let next = text;
  for (const needle of needles) {
    next = next.replace(new RegExp(escapeRegExp(needle), 'gi'), 'this');
  }
  return next.replace(/\s{2,}/g, ' ').replace(/\s+([,.;])/g, '$1').trim();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function shuffleCards(cards: VedantasaraCard[]): VedantasaraCard[] {
  const order = shuffleIds(cards.map((card) => card.id));
  const byId = new Map(cards.map((card) => [card.id, card]));
  return order.map((id) => byId.get(id)!);
}
