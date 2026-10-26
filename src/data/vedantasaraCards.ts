export const VEDANTASARA_CHAPTERS = [
  { id: 'preliminaries', roman: 'I', title: 'Preliminaries' },
  { id: 'superimposition', roman: 'II', title: 'Superimposition' },
  { id: 'jiva', roman: 'III', title: 'The Jīva' },
  { id: 'desuperimposition', roman: 'IV', title: 'De-superimposition' },
  { id: 'means', roman: 'V', title: 'The Means' },
  { id: 'liberation', roman: 'VI', title: 'Liberation' },
] as const;

export type VedantasaraChapterId = (typeof VEDANTASARA_CHAPTERS)[number]['id'];

export interface VedantasaraCard {
  id: string;
  chapter: VedantasaraChapterId;
  term: string;
  sanskrit?: string;
  /** One-line meaning. When present, the quiz shows it before `definition`. */
  summary?: string;
  definition: string;
}

export const vedantasaraCards: VedantasaraCard[] = [
  {
    id: 'vedanta',
    chapter: 'preliminaries',
    term: 'Vedānta',
    sanskrit: 'वेदान्त',
    definition:
      'The Upaniṣads, together with the Brahma Sūtras, the Bhagavad Gītā, and the commentaries that correctly expound them. Vedāntasāra calls this the evidence (pramāṇa) of the highest truth.',
  },
  {
    id: 'brahman',
    chapter: 'preliminaries',
    term: 'Brahman',
    sanskrit: 'ब्रह्मन्',
    definition:
      'Akhaṇḍam Sat-Cit-Ānandam: indivisible Existence, Consciousness, and Bliss. Beyond words and thought, the substratum of everything, and our real nature.',
  },
  {
    id: 'akhanda-sat-cit-ananda',
    chapter: 'preliminaries',
    term: 'Akhaṇḍam Sat-Cit-Ānanda',
    sanskrit: 'अखण्डं सच्चिदानन्दम्',
    definition:
      'How the first verse of Vedāntasāra describes Brahman: undivided (akhaṇḍam) Existence-Consciousness-Bliss. This pure Consciousness is our real nature.',
  },
  {
    id: 'anubandha-chatushtaya',
    chapter: 'preliminaries',
    term: 'Anubandha-catuṣṭaya',
    sanskrit: 'अनुबन्धचतुष्टय',
    definition:
      'The four preliminaries of a treatise: the competent student (adhikārī), the subject-matter (viṣaya), the connection between the text and its subject (sambandha), and the purpose (prayojana).',
  },
  {
    id: 'adhikari',
    chapter: 'preliminaries',
    term: 'Adhikārī',
    sanskrit: 'अधिकारी',
    definition:
      'The qualified aspirant. One whose mind has been purified by right living and worship, and who is endowed with the four means (sādhana-catuṣṭaya).',
  },
  {
    id: 'vishaya',
    chapter: 'preliminaries',
    term: 'Viṣaya',
    sanskrit: 'विषय',
    definition:
      'The subject-matter of Vedānta: the identity of the individual self (jīva) and Brahman, taught in the great saying “Tat tvam asi” — That thou art.',
  },
  {
    id: 'sambandha',
    chapter: 'preliminaries',
    term: 'Sambandha',
    sanskrit: 'सम्बन्ध',
    definition:
      'The connection of the text to its subject: this treatise is the means of revealing the identity of the jīva and Brahman.',
  },
  {
    id: 'prayojana',
    chapter: 'preliminaries',
    term: 'Prayojana',
    sanskrit: 'प्रयोजन',
    definition:
      'The purpose of the study: mokṣa, liberation. Ignorance and the suffering born of it cease when the Self is known as Brahman.',
  },
  {
    id: 'sadhana-chatushtaya',
    chapter: 'preliminaries',
    term: 'Sādhana-catuṣṭaya',
    sanskrit: 'साधनचतुष्टय',
    definition:
      'The four means of knowledge: discrimination (viveka), dispassion (vairāgya), the sixfold inner wealth (śamādi-ṣaṭka-sampatti), and the yearning for liberation (mumukṣutva).',
  },
  {
    id: 'viveka',
    chapter: 'preliminaries',
    term: 'Viveka',
    sanskrit: 'विवेक',
    definition:
      'Discrimination between the permanent and the transient: Brahman alone is the lasting Reality; everything other than It is passing.',
  },
  {
    id: 'vairagya',
    chapter: 'preliminaries',
    term: 'Vairāgya',
    sanskrit: 'वैराग्य',
    definition:
      'Dispassion for the enjoyment of the fruits of action, both in this world and in the next. The mind is no longer driven by those results.',
  },
  {
    id: 'shatsampatti',
    chapter: 'preliminaries',
    term: 'Ṣaṭsampatti',
    sanskrit: 'षट्सम्पत्ति',
    definition:
      'The six disciplines: śama (mental restraint), dama (sense-control), uparati (withdrawal), titikṣā (forbearance), śraddhā (faith), and samādhāna (one-pointedness).',
  },
  {
    id: 'shama',
    chapter: 'preliminaries',
    term: 'Śama',
    sanskrit: 'शम',
    definition:
      'Restraint of the mind. After it is drawn back from wandering among objects, it is made to rest on the Self.',
  },
  {
    id: 'dama',
    chapter: 'preliminaries',
    term: 'Dama',
    sanskrit: 'दम',
    definition:
      'Restraint of the external sense-organs, so they no longer run independently toward their objects.',
  },
  {
    id: 'uparati',
    chapter: 'preliminaries',
    term: 'Uparati',
    sanskrit: 'उपरति',
    definition:
      'Withdrawal of the senses from objects; or remaining in one’s own dharma without extra, restless activity.',
  },
  {
    id: 'titiksha',
    chapter: 'preliminaries',
    term: 'Titikṣā',
    sanskrit: 'तितिक्षा',
    definition:
      'Forbearance: endurance of opposites such as heat and cold, pleasure and pain, without anxiety, complaint, or revenge.',
  },
  {
    id: 'samadhana',
    chapter: 'preliminaries',
    term: 'Samādhāna',
    sanskrit: 'समाधान',
    definition:
      'One-pointedness of mind. The intellect is constantly settled on Brahman, or on the hearing of Vedānta.',
  },
  {
    id: 'shraddha',
    chapter: 'preliminaries',
    term: 'Śraddhā',
    sanskrit: 'श्रद्धा',
    definition:
      'Faith in the words of Vedānta and of the Guru — a trust that lets the teaching work on the mind.',
  },
  {
    id: 'mumukshutva',
    chapter: 'preliminaries',
    term: 'Mumukṣutva',
    sanskrit: 'मुमुक्षुत्व',
    definition:
      'The intense yearning for liberation. Without this longing, the other qualifications do not bear their full fruit.',
  },
  {
    id: 'nitya',
    chapter: 'preliminaries',
    term: 'Nitya-karma',
    sanskrit: 'नित्यकर्म',
    summary: 'Daily obligatory action, such as the regular rites.',
    definition:
      'It purifies the mind. It does not by itself give the knowledge that liberates.',
  },
  {
    id: 'naimittika',
    chapter: 'preliminaries',
    term: 'Naimittika-karma',
    sanskrit: 'नैमित्तिककर्म',
    summary: 'Occasional rites, performed when a particular event calls for them.',
    definition:
      'Like daily action, these rites purify the mind. They are not the means of liberation.',
  },
  {
    id: 'prayaschitta',
    chapter: 'preliminaries',
    term: 'Prāyaścitta',
    sanskrit: 'प्रायश्चित्त',
    summary: 'Expiatory action that remedies a lapse in prescribed duty.',
    definition:
      'It clears the disturbance caused by that lapse. It does not itself produce liberating knowledge.',
  },
  {
    id: 'upasana',
    chapter: 'preliminaries',
    term: 'Upāsanā',
    sanskrit: 'उपासना',
    definition:
      'Meditative worship or contemplation. It makes the mind steady, but like ritual action it does not itself give liberating knowledge. A guru is essential.',
  },
  {
    id: 'guru',
    chapter: 'preliminaries',
    term: 'Guru',
    sanskrit: 'गुरु',
    definition:
      'The teacher established in Brahman. Vedāntasāra insists that the aspirant must approach such a Guru; the text is not meant to be taken as a substitute for that guidance.',
  },
  {
    id: 'adhyasa',
    chapter: 'superimposition',
    term: 'Adhyāsa',
    sanskrit: 'अध्यास',
    definition:
      'The mistake: taking the unreal for the real through ignorance — as a snake is seen on a rope. The body, the world, and the jīva are wrongly superimposed on the Self. Adhyāsa is the error itself, not a teaching method.',
  },
  {
    id: 'adhyaropa',
    chapter: 'superimposition',
    term: 'Adhyāropa',
    sanskrit: 'अध्यारोप',
    definition:
      'A pedagogical tool. The teacher provisionally works with distinctions such as world, Īśvara, and the individual so the student can follow the teaching. These attributions are later withdrawn by apavāda. Adhyāropa is not the mistake; adhyāsa is.',
  },
  {
    id: 'ajnana',
    chapter: 'superimposition',
    term: 'Ajñāna (Avidyā)',
    sanskrit: 'अज्ञान / अविद्या',
    definition:
      'Ignorance of our true nature. Because of it we identify the Self with the limited body-mind. It veils Brahman, projects name and form, and is removed only by knowledge.',
  },
  {
    id: 'maya',
    chapter: 'superimposition',
    term: 'Māyā',
    sanskrit: 'माया',
    definition:
      'Ignorance in its cosmic, aggregate aspect. It is the adjunct of Īśvara, the Lord of the universe.',
  },
  {
    id: 'samashti-vyashti',
    chapter: 'superimposition',
    term: 'Samaṣṭi and Vyaṣṭi',
    sanskrit: 'समष्टि / व्यष्टि',
    definition:
      'The aggregate (collective) and the individual aspects of ignorance and of its effects — the cosmos as a whole, and each particular being.',
  },
  {
    id: 'ishvara',
    chapter: 'superimposition',
    term: 'Īśvara',
    sanskrit: 'ईश्वर',
    definition:
      'Pure Consciousness associated with aggregate ignorance (māyā). Like a colourless crystal appearing red beside a rose, Brahman itself does not change; Īśvara is Brahman viewed with māyā.',
  },
  {
    id: 'upadhi',
    chapter: 'superimposition',
    term: 'Upādhi',
    sanskrit: 'उपाधि',
    definition:
      'A limiting adjunct. Like a red rose beside a colourless crystal, māyā is the upādhi that makes attributeless Brahman appear as Īśvara.',
  },
  {
    id: 'crystal-rose',
    chapter: 'superimposition',
    term: 'Crystal and rose',
    definition:
      'Colourless crystal = Brahman, without attributes. Red rose = māyā, the upādhi. Crystal appearing red = Īśvara. The crystal never becomes red; Brahman undergoes no real change.',
  },
  {
    id: 'prajna',
    chapter: 'superimposition',
    term: 'Prājña',
    sanskrit: 'प्राज्ञ',
    definition:
      'Consciousness associated with individual ignorance. In deep sleep the jīva is called Prājña, experiencing undifferentiated bliss under the veil of avidyā.',
  },
  {
    id: 'turiya',
    chapter: 'superimposition',
    term: 'Turīya',
    sanskrit: 'तुरीय',
    definition:
      'The Fourth: Pure Consciousness, the substratum of waking, dream, and deep sleep, and of Īśvara and Prājña. It is not associated with ignorance.',
  },
  {
    id: 'karana-sharira',
    chapter: 'superimposition',
    term: 'Kāraṇa-śarīra',
    sanskrit: 'कारणशरीर',
    definition:
      'The causal body. Individual ignorance itself, also called the ānandamaya-kośa (sheath of bliss), because it is the cause of the subtle and gross bodies.',
  },
  {
    id: 'sukshma-sharira',
    chapter: 'superimposition',
    term: 'Sūkṣma-śarīra',
    sanskrit: 'सूक्ष्मशरीर',
    definition:
      'The subtle body (liṅga-śarīra), of seventeen parts: five organs of knowledge, five of action, five prāṇas, mind (manas), and intellect (buddhi).',
  },
  {
    id: 'sthula-sharira',
    chapter: 'superimposition',
    term: 'Sthūla-śarīra',
    sanskrit: 'स्थूलशरीर',
    definition:
      'The gross body, formed of the five great elements after they have been compounded (pañcīkaraṇa). It is the vehicle of waking experience.',
  },
  {
    id: 'pancikarana',
    chapter: 'superimposition',
    term: 'Pañcīkaraṇa',
    sanskrit: 'पञ्चीकरण',
    summary: 'The compounding of the five subtle elements into the five gross elements.',
    definition:
      'Each gross element is half itself and one eighth of each of the other four. The gross body and the physical world are formed from these compounded elements.',
  },
  {
    id: 'pancha-kosha',
    chapter: 'superimposition',
    term: 'Pañca-kośa',
    sanskrit: 'पञ्चकोश',
    definition:
      'The five sheaths that appear to cover the Self: annamaya (food), prāṇamaya (vital air), manomaya (mind), vijñānamaya (intellect), and ānandamaya (bliss).',
  },
  {
    id: 'viraj',
    chapter: 'superimposition',
    term: 'Virāj / Vaiśvānara',
    sanskrit: 'विराज् / वैश्वानर',
    definition:
      'Consciousness associated with the aggregate gross body — the cosmic being of the waking state.',
  },
  {
    id: 'hiranyagarbha',
    chapter: 'superimposition',
    term: 'Hiraṇyagarbha / Sūtrātman',
    sanskrit: 'हिरण्यगर्भ / सूत्रात्मन्',
    definition:
      'Consciousness associated with the aggregate subtle body — the cosmic being of the dream state, also called the Thread-Self.',
  },
  {
    id: 'vishva',
    chapter: 'superimposition',
    term: 'Viśva',
    sanskrit: 'विश्व',
    definition:
      'The individual self identified with the gross body in the waking state.',
  },
  {
    id: 'taijasa',
    chapter: 'superimposition',
    term: 'Taijasa',
    sanskrit: 'तैजस',
    definition:
      'The individual self identified with the subtle body in the dream state.',
  },
  {
    id: 'jiva',
    chapter: 'jiva',
    term: 'Jīva',
    sanskrit: 'जीव',
    definition:
      'The individual self as it appears limited through association with ignorance and the three bodies. Its true nature is none other than Brahman.',
  },
  {
    id: 'sakshin',
    chapter: 'jiva',
    term: 'Sākṣin',
    sanskrit: 'साक्षिन्',
    summary: 'The witness: Consciousness that illumines the three states and is not touched by them.',
    definition:
      'The jīva appears limited through the body and mind. The sākṣin is that same Self as the seer, never one object among others.',
  },
  {
    id: 'other-views',
    chapter: 'jiva',
    term: 'Other views of the Self',
    definition:
      'Vedāntasāra examines the materialist, Buddhist, and ritualist accounts of the Self. Each is taken as a step that trains the mind to move from the gross body toward subtler identifications, until the true Self is reached.',
  },
  {
    id: 'apavada',
    chapter: 'desuperimposition',
    term: 'Apavāda',
    sanskrit: 'अपवाद',
    definition:
      'Subsequent negation: the superimposed attributes and mistaken identifications are removed. What was provisionally taught is taken back, revealing the non-dual Self. Adhyāropa and apavāda together are the method; adhyāsa is the mistake that knowledge removes.',
  },
  {
    id: 'mahavakya',
    chapter: 'desuperimposition',
    term: 'Mahāvākya',
    sanskrit: 'महावाक्य',
    summary: 'A great saying of the Upaniṣads that teaches the identity of the jīva and Brahman.',
    definition:
      'Vedāntasāra works especially with “Tat tvam asi” — That thou art — and shows how its implied meaning is to be taken.',
  },
  {
    id: 'tat-tvam-asi',
    chapter: 'desuperimposition',
    term: 'Tat tvam asi',
    sanskrit: 'तत्त्वमसि',
    definition:
      '“That thou art.” The mahāvākya that teaches the identity of the implied meaning of “That” (Brahman) and “thou” (the inner Self), after the conflicting adjuncts are set aside.',
  },
  {
    id: 'aham-brahmasmi',
    chapter: 'desuperimposition',
    term: 'Ahaṃ Brahmāsmi',
    sanskrit: 'अहं ब्रह्मास्मि',
    definition:
      '“I am Brahman.” The realisation that follows the mahāvākya: the hearer knows the Self as the non-dual Reality.',
  },
  {
    id: 'vacyartha-lakshyartha',
    chapter: 'desuperimposition',
    term: 'Vācyārtha and Lakṣyārtha',
    sanskrit: 'वाच्यार्थ / लक्ष्यार्थ',
    definition:
      'The direct (literal) meaning of a word, and its implied meaning. In “Tat tvam asi” identity cannot be read from the literal adjuncts, so the implied meaning — pure Consciousness — is taken.',
  },
  {
    id: 'jahad-ajahal-lakshana',
    chapter: 'desuperimposition',
    term: 'Jahad-ajahal-lakṣaṇā',
    sanskrit: 'जहदजहल्लक्षणा',
    definition:
      'Partial implication. The conflicting parts of the meanings of “That” and “thou” (omniscience, limitedness, and so on) are discarded; the common Consciousness is retained.',
  },
  {
    id: 'sravana',
    chapter: 'means',
    term: 'Śravaṇa',
    sanskrit: 'श्रवण',
    definition:
      'Hearing the Vedāntic teaching from the Guru, until the import of the mahāvākyas is clearly determined.',
  },
  {
    id: 'manana',
    chapter: 'means',
    term: 'Manana',
    sanskrit: 'मनन',
    definition:
      'Reflection. Reasoning is used until every doubt about the teaching is removed and the mind is convinced.',
  },
  {
    id: 'nididhyasana',
    chapter: 'means',
    term: 'Nididhyāsana',
    sanskrit: 'निदिध्यासन',
    definition:
      'Repeated meditation on the Self, so that contrary habits of thought (that “I am the body,” and so on) are dissolved.',
  },
  {
    id: 'savikalpa-samadhi',
    chapter: 'means',
    term: 'Savikalpa-samādhi',
    sanskrit: 'सविकल्पसमाधि',
    definition:
      'Absorption with distinction. The mind takes the form of Brahman, yet the sense of knower, knowing, and known still remains.',
  },
  {
    id: 'nirvikalpa-samadhi',
    chapter: 'means',
    term: 'Nirvikalpa-samādhi',
    sanskrit: 'निर्विकल्पसमाधि',
    definition:
      'Absorption without distinction. The mental modification itself is not perceived; only Brahman shines.',
  },
  {
    id: 'laya',
    chapter: 'means',
    term: 'Laya',
    sanskrit: 'लय',
    summary: 'An obstacle to samādhi in which the mind sinks into sleep or dullness.',
    definition:
      'The meditation is lost because awareness collapses, rather than because it runs toward objects.',
  },
  {
    id: 'vikshepa',
    chapter: 'means',
    term: 'Vikṣepa',
    sanskrit: 'विक्षेप',
    summary: 'An obstacle to samādhi in which the mind is scattered by distraction.',
    definition:
      'Attention leaves the Self and moves among objects, memories, or plans.',
  },
  {
    id: 'kashaya',
    chapter: 'means',
    term: 'Kaṣāya',
    sanskrit: 'कषाय',
    summary: 'A latent stain of attachment that keeps the mind from settling in samādhi.',
    definition:
      'The mind is neither asleep nor outwardly distracted, yet old desires cloud it and block absorption.',
  },
  {
    id: 'rasasvada',
    chapter: 'means',
    term: 'Rasāsvāda',
    sanskrit: 'रसास्वाद',
    summary: 'Clinging to the bliss of a lower samādhi and stopping there.',
    definition:
      'The taste of that joy becomes something to enjoy, so nirvikalpa-samādhi is not reached.',
  },
  {
    id: 'sanchita',
    chapter: 'liberation',
    term: 'Sañcita',
    sanskrit: 'सञ्चित',
    summary: 'The accumulated store of karma from past lives.',
    definition:
      'Knowledge destroys this store, so it does not fructify in a future birth.',
  },
  {
    id: 'prarabdha',
    chapter: 'liberation',
    term: 'Prārabdha',
    sanskrit: 'प्रारब्ध',
    summary: 'The karma that has already begun to bear fruit as this present life.',
    definition:
      'It sustains the body even after knowledge. The jīvanmukta lives it out until it is exhausted.',
  },
  {
    id: 'agamin',
    chapter: 'liberation',
    term: 'Āgāmin',
    sanskrit: 'आगामिन्',
    summary: 'Karma being produced by action in the present life.',
    definition:
      'For the one who knows the Self, this new karma does not cling and does not bind a future birth.',
  },
  {
    id: 'jivanmukta',
    chapter: 'liberation',
    term: 'Jīvanmukta',
    sanskrit: 'जीवन्मुक्त',
    definition:
      'One who is liberated while still living in the body. Knowledge has destroyed ignorance; the body continues only until prārabdha karma is exhausted.',
  },
  {
    id: 'videhamukti',
    chapter: 'liberation',
    term: 'Videhamukti',
    sanskrit: 'विदेहमुक्ति',
    definition:
      'Liberation at the fall of the body, when even the remainder of prārabdha has ended and no further embodiment is taken.',
  },
  {
    id: 'kaivalya',
    chapter: 'liberation',
    term: 'Kaivalya',
    sanskrit: 'कैवल्य',
    definition:
      'Absoluteness. Remaining as Brahman alone — the final fruit of Vedānta, beyond all adjuncts and return to saṃsāra.',
  },
];

export function getVedantasaraChapter(id: VedantasaraChapterId) {
  return VEDANTASARA_CHAPTERS.find((chapter) => chapter.id === id)!;
}
