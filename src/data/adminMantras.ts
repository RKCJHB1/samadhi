import { TimedSyllable, gayatriMantraSyllables, sahaNavatuMantraSyllables } from '@/data/mantraTimings';

export interface AdminMantraDefinition {
  id: string;
  name: string;
  audioSrc: string;
  transliteration: string;
  defaultSyllables: TimedSyllable[];
  /** Optional; only when you have a 1:1 token alignment with defaultSyllables. */
  transliterationSyllables?: string[];
}

// Word-level placeholder syllables (used for mantras where we don't have a detailed timings file yet)
const createPlaceholderSyllables = (transliteration: string): TimedSyllable[] => {
  const words = transliteration.split(/\s+/).filter(Boolean);
  let time = 0;
  return words.map((word) => {
    const syl: TimedSyllable = {
      text: word + ' ',
      startTime: time,
      endTime: time + 0.5,
      svara: 'neutral',
    };
    time += 0.5;
    return syl;
  });
};

/**
 * Single source of truth for *admin-editable* mantras.
 * Keep this list aligned with actual audio files in public/audio.
 */
export const ADMIN_MANTRAS: AdminMantraDefinition[] = [
  {
    id: 'gayatri',
    name: 'Gayatri Mantra',
    audioSrc: '/audio/gayatri.mp3',
    defaultSyllables: gayatriMantraSyllables,
    transliteration: 'Oṃ bhūr bhuvaḥ svaḥ tat savitur vareṇyaṃ bhargo devasya dhīmahi dhiyo yo naḥ pracodayāt',
    // 27 tokens (must match gayatriMantraSyllables.length)
    transliterationSyllables: ['Oṃ ', 'bhūr', 'bhuvaḥ ', 'svaḥ ', 'tat', 'sa', 'vi', 'tur', 'va', 're', 'ṇyaṃ ', 'bhar', 'go ', 'de', 'va', 'sya ', 'dhī', 'ma', 'hi ', 'dhi', 'yo ', 'yo ', 'naḥ ', 'pra', 'cho', 'da', 'yāt'],
  },
  {
    id: 'saha-navavatu',
    name: 'Saha Navavatu',
    audioSrc: '/audio/sahana.mp3',
    defaultSyllables: sahaNavatuMantraSyllables,
	  transliteration: 'Oṃ saha nāvavatu saha nau bhunaktu saha vīryaṃ karavāvahai tejasvināvadhītamastu mā vidviṣāvahai oṃ śāntiḥ śāntiḥ śāntiḥ',
	  // 48 tokens (must match sahaNavatuMantraSyllables.length)
	  transliterationSyllables: [
	    'Oṃ ', 'sa', 'ha ', 'nā', 'va', 'va', 'tu ', 'sa', 'ha ', 'nau ',
	    'bhu', 'na', 'ktu ', 'sa', 'ha ', 'vī', 'rya', 'ṃ ', 'ka', 'ra',
	    'vā', 'va', 'hai ', 'te', 'ja', 'svi', 'nā', 'va', 'dhī', 'ta',
		    'ma', 'stu ', 'mā ', 'vi', 'dvi', 'ṣā', 'va', 'hai ', 'oṃ ', 'śāntiḥ ',
		    '', 'śāntiḥ ', '', 'śāntiḥ ', '', '', '',
	  ],
  },
  {
    id: 'ganapati-prarthana',
    name: 'Ganapati Prarthana',
    audioSrc: '/audio/ganapati.MP3',
    defaultSyllables: createPlaceholderSyllables('Oṃ gaṇānāṃ tvā gaṇapatiṃ havāmahe kaviṃ kavīnāmupamaśravastamam jyeṣṭharājaṃ brahmaṇāṃ brahmaṇaspata ā naḥ śṛṇvannūtibhissīda sādanam mahāgaṇapataye namaḥ'),
    transliteration: 'Oṃ gaṇānāṃ tvā gaṇapatiṃ havāmahe kaviṃ kavīnāmupamaśravastamam jyeṣṭharājaṃ brahmaṇāṃ brahmaṇaspata ā naḥ śṛṇvannūtibhissīda sādanam mahāgaṇapataye namaḥ',
  },
  {
    id: 'sham-no-mitrah',
    name: 'Sham No Mitrah',
    audioSrc: '/audio/shannomitra.mp3',
	    defaultSyllables: createPlaceholderSyllables('Oṃ śaṃ no mitraḥ śaṃ varuṇaḥ | śaṃ no bhavatvaryamā | śaṃ na indro bṛhaspatiḥ | śaṃ no viṣṇururukramaḥ | namo brahmaṇe | namaste vāyo | tvameva pratyakṣaṃ brahmāsi | tvāmevapratyakṣaṃ brahma vadiṣyāmi | ṛtaṃ vadiṣyāmi | satyaṃ vadiṣyāmi | tanmāmavatu | tadvaktāramavatu | avatu mām | avatu vaktāram | oṃ śāntiḥ śāntiḥ śāntiḥ'),
	    transliteration: 'Oṃ śaṃ no mitraḥ śaṃ varuṇaḥ | śaṃ no bhavatvaryamā | śaṃ na indro bṛhaspatiḥ | śaṃ no viṣṇururukramaḥ | namo brahmaṇe | namaste vāyo | tvameva pratyakṣaṃ brahmāsi | tvāmevapratyakṣaṃ brahma vadiṣyāmi | ṛtaṃ vadiṣyāmi | satyaṃ vadiṣyāmi | tanmāmavatu | tadvaktāramavatu | avatu mām | avatu vaktāram | oṃ śāntiḥ śāntiḥ śāntiḥ',
  },
  {
    id: 'bhadram-karnebhih',
    name: 'Bhadram Karnebhih',
    audioSrc: '/audio/bhadramkarNebhi.mp3',
    defaultSyllables: createPlaceholderSyllables('Oṃ bhadraṃ karṇebhiḥ śṛṇuyāma devāḥ bhadraṃ paśyemākṣabhiryajatrāḥ sthirairaṅgaistuṣṭuvāṃsastanūbhiḥ vyaśema devahitaṃ yadāyuḥ svasti na indro vṛddhaśravāḥ oṃ śāntiḥ śāntiḥ śāntiḥ'),
    transliteration: 'Oṃ bhadraṃ karṇebhiḥ śṛṇuyāma devāḥ bhadraṃ paśyemākṣabhiryajatrāḥ sthirairaṅgaistuṣṭuvāṃsastanūbhiḥ vyaśema devahitaṃ yadāyuḥ svasti na indro vṛddhaśravāḥ oṃ śāntiḥ śāntiḥ śāntiḥ',
  },
  {
    id: 'namo-brahmane',
    name: 'Namo Brahmane',
    audioSrc: '/audio/namobrahmaNe.mp3',
    defaultSyllables: createPlaceholderSyllables('Oṃ namo brahmaṇe namo astvagnaye namaḥ pṛthivyai nama oṣadhībhyaḥ namo vāce namo vācaspataye namo viṣṇave bṛhate karomi oṃ śāntiḥ śāntiḥ śāntiḥ'),
    transliteration: 'Oṃ namo brahmaṇe namo astvagnaye namaḥ pṛthivyai nama oṣadhībhyaḥ namo vāce namo vācaspataye namo viṣṇave bṛhate karomi oṃ śāntiḥ śāntiḥ śāntiḥ',
  },
  {
    id: 'yaschandasam',
    name: 'Yaschandasam',
    audioSrc: '/audio/yashcchandasAm.mp3',
    defaultSyllables: createPlaceholderSyllables('Oṃ yaśchandasāmṛṣabho viśvarūpaḥ chandobhyo adhyamṛtāthsambabhūva sa mendro medhayā spṛṇotu amṛtasya deva dhāraṇo bhūyāsam oṃ śāntiḥ śāntiḥ śāntiḥ'),
    transliteration: 'Oṃ yaśchandasāmṛṣabho viśvarūpaḥ chandobhyo adhyamṛtāthsambabhūva sa mendro medhayā spṛṇotu amṛtasya deva dhāraṇo bhūyāsam oṃ śāntiḥ śāntiḥ śāntiḥ',
  },
  {
    id: 'vang-me-manasi',
    name: 'Vang Me Manasi',
    audioSrc: '/audio/vAngmemanasi.MP3',
    defaultSyllables: createPlaceholderSyllables('Oṃ vāṅ me manasi pratiṣṭhitā mano me vāci pratiṣṭhitam āvirāvīrma edhi vedasya ma āṇīsthaḥ śrutaṃ me mā prahāsīḥ oṃ śāntiḥ śāntiḥ śāntiḥ'),
    transliteration: 'Oṃ vāṅ me manasi pratiṣṭhitā mano me vāci pratiṣṭhitam āvirāvīrma edhi vedasya ma āṇīsthaḥ śrutaṃ me mā prahāsīḥ oṃ śāntiḥ śāntiḥ śāntiḥ',
  },
  {
    id: 'durga-suktam',
    name: 'Durga Suktam',
    audioSrc: '/audio/durgAsUktam.mp3',
    defaultSyllables: createPlaceholderSyllables('Oṃ jātavedase sunavāma somam arātīyato nidahāti vedaḥ sa naḥ parṣadati durgāṇi viśvā nāveva sindhuṃ duritātyagniḥ'),
    transliteration: 'Oṃ jātavedase sunavāma somam arātīyato nidahāti vedaḥ sa naḥ parṣadati durgāṇi viśvā nāveva sindhuṃ duritātyagniḥ',
  },
];

export const getAdminMantraById = (id: string): AdminMantraDefinition | undefined =>
  ADMIN_MANTRAS.find((m) => m.id === id);
