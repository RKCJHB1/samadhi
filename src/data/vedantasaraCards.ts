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
      'The subject-matter of Vedānta: the identity of the individual self and Brahman, taught in the great saying “Tat tvam asi” — That thou art.',
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
      'A pedagogical tool. The teacher provisionally attributes names, forms, and the world to Brahman so the student can follow the teaching. These attributions are later withdrawn by apavāda. Adhyāropa is not the mistake; adhyāsa is.',
  },
  {
    id: 'ajnana',
    chapter: 'superimposition',
    term: 'Ajñāna (Avidyā)',
    sanskrit: 'अज्ञान / अविद्या',
    definition:
      'Beginningless ignorance. It is neither real nor unreal, veils Brahman, projects name and form, and is removed only by knowledge.',
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
      'Pure Consciousness associated with aggregate ignorance (māyā). From this standpoint the Lord is omniscient and the cause of the universe.',
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
      'The counterpart of adhyāropa. What was provisionally taught is taken back, so Brahman is left as it is. Adhyāropa and apavāda together are the method; adhyāsa is the mistake that knowledge removes.',
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
    id: 'obstacles-samadhi',
    chapter: 'means',
    term: 'Obstacles to samādhi',
    definition:
      'Four classic hindrances: laya (sleep or dullness), vikṣepa (distraction), kaṣāya (latent attachment), and rasāsvāda (clinging to the bliss of the lower samādhi).',
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
