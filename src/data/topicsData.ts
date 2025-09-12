
// Mock data for topic structure
const topicsData = {
  'hindu-philosophy': {
    title: 'Hindu Philosophy',
    description: 'Foundational principles and ideas that form the basis of Hindu thought',
    image: 'https://images.unsplash.com/photo-1507692812231-52e2cca3e4c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    subtopics: [
      {
        id: 'dharma',
        title: 'Dharma',
        description: 'The concept of cosmic order, righteousness, and duty'
      },
      {
        id: 'karma',
        title: 'Karma',
        description: 'The law of cause and effect governing all actions'
      },
      {
        id: 'samsara',
        title: 'Samsara',
        description: 'The continuous cycle of birth, death, and rebirth'
      },
      {
        id: 'moksha',
        title: 'Moksha',
        description: 'Liberation from the cycle of rebirth and suffering'
      },
      {
        id: 'brahman',
        title: 'Brahman',
        description: 'The ultimate reality and supreme cosmic power'
      },
      {
        id: 'atman',
        title: 'Atman',
        description: 'The individual soul or self'
      }
    ]
  },
  'core-concepts': {
    title: 'Core Concepts',
    description: 'Foundational principles and ideas that form the basis of Hindu thought',
    image: 'https://images.unsplash.com/photo-1507692812231-52e2cca3e4c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    subtopics: [
      {
        id: 'dharma',
        title: 'Dharma',
        description: 'The concept of cosmic order, righteousness, and duty'
      },
      {
        id: 'karma',
        title: 'Karma',
        description: 'The law of cause and effect governing all actions'
      },
      {
        id: 'samsara',
        title: 'Samsara',
        description: 'The continuous cycle of birth, death, and rebirth'
      },
      {
        id: 'moksha',
        title: 'Moksha',
        description: 'Liberation from the cycle of rebirth and suffering'
      },
      {
        id: 'brahman',
        title: 'Brahman',
        description: 'The ultimate reality and supreme cosmic power'
      },
      {
        id: 'atman',
        title: 'Atman',
        description: 'The individual soul or self'
      }
    ]
  },
  'scriptures': {
    title: 'Scriptures',
    description: 'Sacred texts and literature of Hinduism',
    image: 'https://images.unsplash.com/photo-1544932199-02edecc07217?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    subtopics: [
      {
        id: 'vedas',
        title: 'Vedas',
        description: 'The oldest and most authoritative Hindu scriptures'
      },
      {
        id: 'upanishads',
        title: 'Upanishads',
        description: 'Philosophical texts exploring the nature of reality and self'
      },
      {
        id: 'bhagavad-gita',
        title: 'Bhagavad Gita',
        description: 'Lord Krishna\'s discourse on duty, devotion, and spiritual knowledge'
      },
      {
        id: 'puranas',
        title: 'Puranas',
        description: 'Ancient texts containing stories of deities, creation, and cosmology'
      },
      {
        id: 'ramayana',
        title: 'Ramayana',
        description: 'The epic story of Lord Rama'
      },
      {
        id: 'mahabharata',
        title: 'Mahabharata',
        description: 'The longest epic poem containing the Bhagavad Gita'
      }
    ]
  },
  'deities': {
    title: 'Deities',
    description: 'Major gods and goddesses in Hindu tradition',
    image: 'https://images.unsplash.com/photo-1518562180175-34a163b1a9a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    subtopics: [
      {
        id: 'trimurti',
        title: 'Trimurti',
        description: 'The triple deity of supreme divinity: Brahma, Vishnu, and Shiva'
      },
      {
        id: 'vishnu',
        title: 'Vishnu',
        description: 'The preserver and protector deity'
      },
      {
        id: 'shiva',
        title: 'Shiva',
        description: 'The destroyer and transformer deity'
      },
      {
        id: 'brahma',
        title: 'Brahma',
        description: 'The creator deity'
      },
      {
        id: 'devi',
        title: 'Devi',
        description: 'The divine feminine energy'
      },
      {
        id: 'ganesha',
        title: 'Ganesha',
        description: 'The remover of obstacles and god of beginnings'
      }
    ]
  },
  'holy-trinity': {
    title: 'The Holy Trinity',
    description: 'Learn about Sri Ramakrishna, Sri Sarada Devi, and Swami Vivekananda',
    image: 'https://images.unsplash.com/photo-1518562180175-34a163b1a9a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    subtopics: []
  },
  'practices': {
    title: 'Spiritual Practices',
    description: 'Methods for spiritual growth and development including festivals, meditation, and daily practices',
    image: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    subtopics: []
  },
  'philosophical-schools': {
    title: 'Philosophical Schools',
    description: 'Different schools of thought within Hindu philosophy',
    image: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    subtopics: [
      {
        id: 'vedanta',
        title: 'Vedanta',
        description: 'The school focused on the Upanishads and self-realization'
      },
      {
        id: 'yoga',
        title: 'Yoga',
        description: 'The school focused on physical and mental disciplines'
      },
      {
        id: 'samkhya',
        title: 'Samkhya',
        description: 'The dualistic philosophy focusing on discrimination'
      },
      {
        id: 'nyaya',
        title: 'Nyaya',
        description: 'The school of logic and epistemology'
      },
      {
        id: 'mimamsa',
        title: 'Mimamsa',
        description: 'The school focused on the correct interpretation of scripture'
      },
      {
        id: 'vaisheshika',
        title: 'Vaisheshika',
        description: 'The school focused on categorizing reality'
      }
    ]
  },
  'practices-rituals': {
    title: 'Practices and Rituals',
    description: 'Common religious practices and rituals in Hinduism',
    image: 'https://images.unsplash.com/photo-1560041710-45a9da996bed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    subtopics: []
  },
  'sects-traditions': {
    title: 'Sects and Traditions',
    description: 'Different sectarian traditions within Hinduism',
    image: 'https://images.unsplash.com/photo-1631203686810-584839b8bdc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    subtopics: []
  },
  'influential-figures': {
    title: 'Influential Figures',
    description: 'Notable saints, gurus, and leaders in Hindu tradition',
    image: 'https://images.unsplash.com/photo-1576657233350-f81e6d9aa7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    subtopics: []
  },
  'history-evolution': {
    title: 'History and Evolution',
    description: 'The historical development of Hinduism',
    image: 'https://images.unsplash.com/photo-1592639296346-560c37a0f711?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    subtopics: []
  },
  'temples-architecture': {
    title: 'Temples and Architecture',
    description: 'Hindu temple styles and sacred architecture',
    image: 'https://images.unsplash.com/photo-1552003261-903c42883565?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    subtopics: []
  },
  'society-culture': {
    title: 'Society and Culture',
    description: 'The influence of Hinduism on society and culture',
    image: 'https://images.unsplash.com/photo-1552180242-6e28cfd38f5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    subtopics: []
  },
  'cosmology-mythology': {
    title: 'Cosmology and Mythology',
    description: 'Hindu creation stories and universe structure',
    image: 'https://images.unsplash.com/photo-1564177426-93655997d267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    subtopics: []
  },
  'modern-issues': {
    title: 'Modern Issues and Debates',
    description: 'Contemporary issues in Hindu practice and belief',
    image: 'https://images.unsplash.com/photo-1507207320531-9d9d0cb15004?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    subtopics: []
  }
};

export type TopicData = {
  title: string;
  description: string;
  image: string;
  subtopics: Array<{
    id: string;
    title: string;
    description: string;
  }>;
};

export type TopicsDataType = {
  [key: string]: TopicData;
};

export default topicsData as TopicsDataType;
