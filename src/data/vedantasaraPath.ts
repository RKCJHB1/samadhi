export interface PathChip {
  id: string;
  label: string;
}

export interface PlaceSlot {
  id: string;
  label: string;
  answerId: string;
}

export interface SituationQuestion {
  id: string;
  prompt: string;
  answerId: string;
  note: string;
}

interface PathStepBase {
  id: string;
  title: string;
  cardIds?: string[];
}

export interface CardsStep extends PathStepBase {
  kind: 'cards';
  cardIds: string[];
}

export interface PlaceStep extends PathStepBase {
  kind: 'place';
  prompt: string;
  chips: PathChip[];
  slots: PlaceSlot[];
}

export interface OrderStep extends PathStepBase {
  kind: 'order';
  prompt: string;
  items: PathChip[];
  successNote?: string;
  celebrate?: boolean;
}

export interface SituationsStep extends PathStepBase {
  kind: 'situations';
  prompt: string;
  options: PathChip[];
  questions: SituationQuestion[];
}

export interface StatesStep extends PathStepBase {
  kind: 'states';
  prompt: string;
}

export type PathStep = CardsStep | PlaceStep | OrderStep | SituationsStep | StatesStep;

export interface PathSection {
  id: string;
  numeral: string;
  title: string;
  summary: string;
  steps: PathStep[];
}

const PATH_KEY = 'vedantasara-path-v1';

export const vedantasaraPath: PathSection[] = [
  {
    id: 'preliminaries',
    numeral: '1',
    title: 'The four preliminaries',
    summary: 'Who studies, what is studied, how the text connects, and what is gained.',
    steps: [
      {
        id: 'cards',
        kind: 'cards',
        title: 'Review the terms',
        cardIds: [
          'vedanta',
          'brahman',
          'akhanda-sat-cit-ananda',
          'anubandha-chatushtaya',
          'adhikari',
          'vishaya',
          'sambandha',
          'prayojana',
        ],
      },
      {
        id: 'place',
        kind: 'place',
        title: 'Place the four questions',
        prompt: 'Each treatise opens by answering four questions. Place each name on its question.',
        cardIds: ['adhikari', 'vishaya', 'sambandha', 'prayojana', 'anubandha-chatushtaya'],
        chips: [
          { id: 'adhikari', label: 'Adhikārī' },
          { id: 'vishaya', label: 'Viṣaya' },
          { id: 'sambandha', label: 'Sambandha' },
          { id: 'prayojana', label: 'Prayojana' },
        ],
        slots: [
          { id: 'who', label: 'Who may study?', answerId: 'adhikari' },
          { id: 'what', label: 'What is studied?', answerId: 'vishaya' },
          { id: 'how', label: 'How is the text connected to its subject?', answerId: 'sambandha' },
          { id: 'gain', label: 'What does the student gain?', answerId: 'prayojana' },
        ],
      },
    ],
  },
  {
    id: 'student',
    numeral: '2',
    title: 'The qualified student',
    summary: 'The four means, and the six disciplines inside them.',
    steps: [
      {
        id: 'cards',
        kind: 'cards',
        title: 'Review the terms',
        cardIds: [
          'sadhana-chatushtaya',
          'viveka',
          'vairagya',
          'shatsampatti',
          'shama',
          'dama',
          'uparati',
          'titiksha',
          'shraddha',
          'samadhana',
          'mumukshutva',
        ],
      },
      {
        id: 'order',
        kind: 'order',
        title: 'The four means',
        prompt: 'Put the four means in the order Vedāntasāra gives them.',
        cardIds: ['viveka', 'vairagya', 'shatsampatti', 'mumukshutva', 'sadhana-chatushtaya'],
        items: [
          { id: 'viveka', label: 'Viveka' },
          { id: 'vairagya', label: 'Vairāgya' },
          { id: 'shatsampatti', label: 'Ṣaṭsampatti' },
          { id: 'mumukshutva', label: 'Mumukṣutva' },
        ],
      },
      {
        id: 'disciplines',
        kind: 'situations',
        title: 'The six disciplines',
        prompt: 'Which discipline is this?',
        cardIds: ['shama', 'dama', 'uparati', 'titiksha', 'shraddha', 'samadhana'],
        options: [
          { id: 'shama', label: 'Śama' },
          { id: 'dama', label: 'Dama' },
          { id: 'uparati', label: 'Uparati' },
          { id: 'titiksha', label: 'Titikṣā' },
          { id: 'shraddha', label: 'Śraddhā' },
          { id: 'samadhana', label: 'Samādhāna' },
        ],
        questions: [
          {
            id: 'scene-shama',
            prompt: 'The mind has wandered among objects. It is drawn back and made to rest.',
            answerId: 'shama',
            note: 'Śama is restraint of the mind.',
          },
          {
            id: 'scene-dama',
            prompt: 'The eyes and the other senses are held so they do not run toward their objects.',
            answerId: 'dama',
            note: 'Dama is restraint of the senses.',
          },
          {
            id: 'scene-uparati',
            prompt: 'A person stays with their own duty and lets restless extra activity fall away.',
            answerId: 'uparati',
            note: 'Uparati is withdrawal, or remaining in one’s own dharma.',
          },
          {
            id: 'scene-titiksha',
            prompt: 'Heat and cold, pleasure and pain, are borne without complaint or revenge.',
            answerId: 'titiksha',
            note: 'Titikṣā is forbearance of the pairs of opposites.',
          },
          {
            id: 'scene-shraddha',
            prompt: 'The student trusts the words of the guru and of Vedānta enough to let the teaching work.',
            answerId: 'shraddha',
            note: 'Śraddhā is that trust.',
          },
          {
            id: 'scene-samadhana',
            prompt: 'The mind stays one-pointed, settled on the teaching.',
            answerId: 'samadhana',
            note: 'Samādhāna is that one-pointedness.',
          },
        ],
      },
    ],
  },
  {
    id: 'preparation',
    numeral: '3',
    title: 'Preparing the mind',
    summary: 'Rites and worship prepare the mind. They do not liberate. A guru is required.',
    steps: [
      {
        id: 'cards',
        kind: 'cards',
        title: 'Review the terms',
        cardIds: ['nitya', 'naimittika', 'prayaschitta', 'upasana', 'guru'],
      },
      {
        id: 'scenes',
        kind: 'situations',
        title: 'What prepares the mind',
        prompt: 'Which of these is being described?',
        cardIds: ['nitya', 'naimittika', 'prayaschitta', 'upasana', 'guru'],
        options: [
          { id: 'nitya', label: 'Nitya-karma' },
          { id: 'naimittika', label: 'Naimittika-karma' },
          { id: 'prayaschitta', label: 'Prāyaścitta' },
          { id: 'upasana', label: 'Upāsanā' },
          { id: 'guru', label: 'Guru' },
        ],
        questions: [
          {
            id: 'scene-nitya',
            prompt: 'The sandhyā and the other rites done every day. They purify the mind. They do not liberate.',
            answerId: 'nitya',
            note: 'Nitya-karma is daily obligatory action.',
          },
          {
            id: 'scene-naimittika',
            prompt: 'A rite performed because a particular occasion, such as an eclipse, calls for it. It purifies. It does not liberate.',
            answerId: 'naimittika',
            note: 'Naimittika-karma is an occasional rite.',
          },
          {
            id: 'scene-prayaschitta',
            prompt: 'A rite done to mend a lapse in prescribed duty. It clears that disturbance. It does not liberate.',
            answerId: 'prayaschitta',
            note: 'Prāyaścitta is expiation.',
          },
          {
            id: 'scene-upasana',
            prompt: 'Meditation on a chosen form, taken up so the mind becomes steady. It does not by itself liberate.',
            answerId: 'upasana',
            note: 'Upāsanā steadies the mind. Knowledge is still required.',
          },
          {
            id: 'scene-guru',
            prompt: 'The mind is purified and steady. Vedāntasāra says the student must now approach one who is established in Brahman.',
            answerId: 'guru',
            note: 'The text is not a substitute for the guru.',
          },
        ],
      },
    ],
  },
  {
    id: 'mistake',
    numeral: '4',
    title: 'The mistake and the method',
    summary: 'Adhyāsa is the error. Adhyāropa is the teacher’s provisional picture.',
    steps: [
      {
        id: 'cards',
        kind: 'cards',
        title: 'Review the terms',
        cardIds: ['ajnana', 'maya', 'samashti-vyashti', 'adhyasa', 'adhyaropa'],
      },
      {
        id: 'place',
        kind: 'place',
        title: 'Place each name',
        prompt: 'The rope and the snake, and ignorance in its two scales.',
        cardIds: ['adhyasa', 'adhyaropa', 'maya', 'ajnana', 'samashti-vyashti'],
        chips: [
          { id: 'adhyasa', label: 'Adhyāsa' },
          { id: 'adhyaropa', label: 'Adhyāropa' },
          { id: 'maya', label: 'Māyā' },
          { id: 'ajnana', label: 'Ajñāna' },
        ],
        slots: [
          { id: 'snake', label: 'A snake is seen where there is only a rope', answerId: 'adhyasa' },
          { id: 'teacher', label: 'The teacher uses a provisional picture so the student can follow', answerId: 'adhyaropa' },
          { id: 'cosmos', label: 'Ignorance as the cosmos taken as a whole', answerId: 'maya' },
          { id: 'person', label: 'Ignorance as it belongs to one person', answerId: 'ajnana' },
        ],
      },
    ],
  },
  {
    id: 'ishvara',
    numeral: '5',
    title: 'Īśvara',
    summary: 'Brahman does not change. The rose makes the crystal look red.',
    steps: [
      {
        id: 'cards',
        kind: 'cards',
        title: 'Review the terms',
        cardIds: ['upadhi', 'crystal-rose', 'ishvara', 'brahman', 'maya'],
      },
      {
        id: 'place',
        kind: 'place',
        title: 'Label the crystal',
        prompt: 'Place each name on the story. The crystal itself never becomes red.',
        cardIds: ['brahman', 'maya', 'upadhi', 'ishvara', 'crystal-rose'],
        chips: [
          { id: 'brahman', label: 'Brahman' },
          { id: 'maya', label: 'Māyā, the limiting adjunct' },
          { id: 'ishvara', label: 'Īśvara' },
        ],
        slots: [
          { id: 'crystal', label: 'The colourless crystal', answerId: 'brahman' },
          { id: 'rose', label: 'The red rose beside it', answerId: 'maya' },
          { id: 'red', label: 'The crystal appearing red', answerId: 'ishvara' },
        ],
      },
    ],
  },
  {
    id: 'bodies',
    numeral: '6',
    title: 'Bodies and sheaths',
    summary: 'From the gross body inward, and the parts of the subtle body.',
    steps: [
      {
        id: 'cards',
        kind: 'cards',
        title: 'Review the terms',
        cardIds: ['pancikarana', 'sthula-sharira', 'sukshma-sharira', 'karana-sharira', 'pancha-kosha'],
      },
      {
        id: 'pancikarana',
        kind: 'situations',
        title: 'What forms the gross world',
        prompt: 'Which term is this?',
        cardIds: ['pancikarana'],
        options: [
          { id: 'pancikarana', label: 'Pañcīkaraṇa' },
          { id: 'sthula-sharira', label: 'Sthūla-śarīra' },
          { id: 'sukshma-sharira', label: 'Sūkṣma-śarīra' },
          { id: 'karana-sharira', label: 'Kāraṇa-śarīra' },
        ],
        questions: [
          {
            id: 'scene-pancikarana',
            prompt: 'Each gross element is made half of itself and one eighth of each of the others. From this compounding the physical world is formed.',
            answerId: 'pancikarana',
            note: 'Pañcīkaraṇa is that compounding. The gross body is made from its result.',
          },
        ],
      },
      {
        id: 'bodies',
        kind: 'order',
        title: 'The three bodies',
        prompt: 'From the outer body to the inner.',
        cardIds: ['sthula-sharira', 'sukshma-sharira', 'karana-sharira'],
        items: [
          { id: 'sthula', label: 'Gross body' },
          { id: 'sukshma', label: 'Subtle body' },
          { id: 'karana', label: 'Causal body' },
        ],
      },
      {
        id: 'sheaths',
        kind: 'order',
        title: 'The five sheaths',
        prompt: 'From the outer sheath to the inner.',
        cardIds: ['pancha-kosha'],
        items: [
          { id: 'anna', label: 'Annamaya, the food sheath' },
          { id: 'prana', label: 'Prāṇamaya, the sheath of vital air' },
          { id: 'mano', label: 'Manomaya, the sheath of mind' },
          { id: 'vijnana', label: 'Vijñānamaya, the sheath of intellect' },
          { id: 'ananda', label: 'Ānandamaya, the sheath of bliss' },
        ],
      },
      {
        id: 'causal-sheath',
        kind: 'situations',
        title: 'The innermost sheath',
        prompt: 'Which sheath is also the causal body?',
        cardIds: ['karana-sharira', 'pancha-kosha'],
        options: [
          { id: 'anna', label: 'Annamaya' },
          { id: 'prana', label: 'Prāṇamaya' },
          { id: 'mano', label: 'Manomaya' },
          { id: 'vijnana', label: 'Vijñānamaya' },
          { id: 'ananda', label: 'Ānandamaya' },
        ],
        questions: [
          {
            id: 'scene-ananda',
            prompt: 'Individual ignorance itself, the cause of the subtle and gross bodies, is counted as one of the sheaths.',
            answerId: 'ananda',
            note: 'The causal body is the ānandamaya-kośa, the sheath of bliss.',
          },
        ],
      },
      {
        id: 'subtle-parts',
        kind: 'order',
        title: 'The subtle body',
        prompt: 'These are the seventeen parts, in the order the text lists them.',
        cardIds: ['sukshma-sharira'],
        items: [
          { id: 'jnana', label: 'Five organs of knowledge' },
          { id: 'karma', label: 'Five organs of action' },
          { id: 'pranas', label: 'Five prāṇas' },
          { id: 'manas', label: 'Mind' },
          { id: 'buddhi', label: 'Intellect' },
        ],
      },
    ],
  },
  {
    id: 'states',
    numeral: '7',
    title: 'The three states',
    summary: 'Each state has an individual, a cosmic person, and a body. The Fourth has no body.',
    steps: [
      {
        id: 'cards',
        kind: 'cards',
        title: 'Review the terms',
        cardIds: [
          'vishva',
          'taijasa',
          'prajna',
          'viraj',
          'hiranyagarbha',
          'ishvara',
          'turiya',
          'sthula-sharira',
          'sukshma-sharira',
          'karana-sharira',
        ],
      },
      {
        id: 'map',
        kind: 'states',
        title: 'Match the states',
        prompt: 'Place each name. Waking sits on the gross body, dream on the subtle, deep sleep on the causal.',
        cardIds: [
          'vishva',
          'taijasa',
          'prajna',
          'viraj',
          'hiranyagarbha',
          'ishvara',
          'turiya',
          'sthula-sharira',
          'sukshma-sharira',
          'karana-sharira',
        ],
      },
    ],
  },
  {
    id: 'jiva',
    numeral: '8',
    title: 'The jīva',
    summary: 'The person who appears limited, and the witness who is not touched.',
    steps: [
      {
        id: 'cards',
        kind: 'cards',
        title: 'Review the terms',
        cardIds: ['jiva', 'sakshin'],
      },
      {
        id: 'scenes',
        kind: 'situations',
        title: 'Person and witness',
        prompt: 'Who is speaking?',
        cardIds: ['jiva', 'sakshin'],
        options: [
          { id: 'jiva', label: 'Jīva' },
          { id: 'sakshin', label: 'Sākṣin' },
          { id: 'ishvara', label: 'Īśvara' },
          { id: 'turiya', label: 'Turīya' },
        ],
        questions: [
          {
            id: 'scene-jiva',
            prompt: 'I appear as this person, limited by ignorance and the three bodies.',
            answerId: 'jiva',
            note: 'The jīva is the Self appearing limited. Its true nature is Brahman.',
          },
          {
            id: 'scene-sakshin',
            prompt: 'I illumine waking, dream, and sleep, and I am none of them.',
            answerId: 'sakshin',
            note: 'The sākṣin is the witness. Other accounts of the Self stop at a body or a sheath. The witness is what remains.',
          },
        ],
      },
      {
        id: 'checkpoint',
        kind: 'order',
        title: 'The first half',
        prompt: 'Put the first half of the text in order.',
        cardIds: ['adhikari', 'ajnana', 'jiva', 'sakshin', 'adhyaropa'],
        celebrate: true,
        successNote:
          'This is as far as the provisional picture goes. Apavāda, the taking-back of this picture, begins with “Tat tvam asi.” That is the second half of the text.',
        items: [
          { id: 'student', label: 'A fit student' },
          { id: 'ignorance', label: 'Ignorance appearing as a world and a person' },
          { id: 'jiva', label: 'That person called the jīva' },
          { id: 'witness', label: 'The witness left untouched' },
          { id: 'adhyaropa', label: 'The whole picture named Adhyāropa' },
        ],
      },
    ],
  },
];

export function gradedSteps(section: PathSection): PathStep[] {
  return section.steps.filter((step) => step.kind !== 'cards');
}

export function stepKey(sectionId: string, stepId: string): string {
  return `${sectionId}:${stepId}`;
}

export function loadPathProgress(): string[] {
  try {
    const raw = localStorage.getItem(PATH_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { passed?: unknown };
    if (!Array.isArray(parsed.passed)) return [];
    return parsed.passed.filter((id): id is string => typeof id === 'string');
  } catch {
    return [];
  }
}

export function savePathProgress(passed: string[]) {
  try {
    localStorage.setItem(PATH_KEY, JSON.stringify({ passed }));
  } catch {
    // Storage can be unavailable. The path still works for this visit.
  }
}
