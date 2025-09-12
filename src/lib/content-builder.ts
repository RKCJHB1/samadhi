import { marked } from 'marked';
import matter from 'gray-matter';
import { LessonGroup, Lesson, QuizType } from '../data/lessonsData';
import { LessonFrontmatter, TopicMetadata } from './content-loader';

// This will be used at build time to generate lesson data
export class ContentBuilder {
  private basePath: string;

  constructor(basePath: string = './content') {
    this.basePath = basePath;
  }

  // Build lessons from markdown files
  async buildLessons(): Promise<LessonGroup[]> {
    // For now, we'll use a hybrid approach
    // In production, this would scan the content directory

    // Load existing lessons data as fallback
    const { lessonsData } = await import('../data/lessonsData');

    // Try to enhance with markdown content
    const enhancedLessons = await this.enhanceLessonsWithMarkdown(lessonsData);

    return enhancedLessons;
  }

  // Enhance existing lessons with markdown content where available
  private async enhanceLessonsWithMarkdown(existingLessons: LessonGroup[]): Promise<LessonGroup[]> {
    const enhancedLessons: LessonGroup[] = [];

    for (const lessonGroup of existingLessons) {
      const enhancedGroup: LessonGroup = {
        ...lessonGroup,
        lessons: []
      };

      // Special handling for holy-trinity topic - use only markdown lessons
      if (lessonGroup.topicId === 'holy-trinity') {
        const holyTrinityLessons = await this.loadHolyTrinityLessons();
        enhancedGroup.lessons = holyTrinityLessons;
      } else {
        // For other topics, try markdown first, fallback to existing
        for (const lesson of lessonGroup.lessons) {
          try {
            // Try to load markdown version
            const markdownLesson = await this.loadMarkdownLesson(lessonGroup.topicId, lesson.id);
            if (markdownLesson) {
              enhancedGroup.lessons.push(markdownLesson);
            } else {
              // Fallback to existing lesson
              enhancedGroup.lessons.push(lesson);
            }
          } catch (error) {
            console.warn(`Could not load markdown for lesson ${lesson.id}, using existing data`);
            enhancedGroup.lessons.push(lesson);
          }
        }
      }

      enhancedLessons.push(enhancedGroup);
    }

    return enhancedLessons;
  }

  // Load a single markdown lesson
  private async loadMarkdownLesson(topicId: string, lessonId: string): Promise<Lesson | null> {
    try {
      // Check if we have markdown versions of lessons
      const markdownLessons = {
        'dharma-intro': () => this.loadDharmaIntroFromMarkdown(),
        'mother-saraswati': () => this.loadMotherSaraswatiFromMarkdown(),
        'introduction-sri-ramakrishna': () => this.loadIntroductionSriRamakrishnaFromMarkdown(),
        'childhood-days-sri-ramakrishna': () => this.loadChildhoodDaysSriRamakrishnaFromMarkdown(),
        'gadai-love-for-nature': () => this.loadGadaiLoveForNatureFromMarkdown(),
        'gadai-playing-shiva': () => this.loadGadaiPlayingShivaFromMarkdown(),
        'rani-rasmani-ramakrishna': () => this.loadRaniRasmaniRamakrishnaFromMarkdown(),
        'muslim-way-to-god': () => this.loadMuslimWayToGodFromMarkdown(),
        'christian-way-to-god': () => this.loadChristianWayToGodFromMarkdown(),
        'god-is-infinite': () => this.loadGodIsInfiniteFromMarkdown(),
        'sri-sarada-devi': () => this.loadSriSaradaDeviFromMarkdown(),
        'swami-vivekananda-part-1': () => this.loadSwamiVivekanandaPart1FromMarkdown(),
        'swami-vivekananda-part-2': () => this.loadSwamiVivekanandaPart2FromMarkdown(),
        'remain-in-your-religion': () => this.loadRemainInYourReligionFromMarkdown(),
        'lord-ganesha': () => this.loadLordGaneshaFromMarkdown(),
        'lord-krishna': () => this.loadLordKrishnaFromMarkdown(),
        'trimurti-concept': () => this.loadTrimurtiConceptFromMarkdown(),
        'prahlada-devotee': () => this.loadPrahladaDevoteeFromMarkdown(),
        'ganesh-and-cat': () => this.loadGaneshAndCatFromMarkdown(),
        'valmiki-sage': () => this.loadValmikiSageFromMarkdown(),
        'bhagavad-gita-introduction': () => this.loadBhagavadGitaIntroductionFromMarkdown(),
        'the-vedas': () => this.loadTheVedasFromMarkdown(),
        'ramayana-story': () => this.loadRamayanaStoryFromMarkdown(),
        'meditation-basics': () => this.loadMeditationBasicsFromMarkdown(),
        'maha-shivaratri': () => this.loadMahaShivaratriFromMarkdown(),
        'prayer': () => this.loadPrayerFromMarkdown(),
        'ahimsa-non-violence': () => this.loadAhimsaNonViolenceFromMarkdown(),
        'thiru-valluvar': () => this.loadThiruValluvarFromMarkdown(),
        'ranti-deva': () => this.loadRantiDevaFromMarkdown(),
        'sambandar-child-saint': () => this.loadSambandarChildSaintFromMarkdown(),
        'teachings-sri-sarada-devi': () => this.loadTeachingsSriSaradaDeviFromMarkdown(),
        'lord-buddha': () => this.loadLordBuddhaFromMarkdown(),
        'vedavyasa-sage': () => this.loadVedavyasaSageFromMarkdown(),
        'bhagavad-gita-message': () => this.loadBhagavadGitaMessageFromMarkdown(),
        'mahabharata-story': () => this.loadMahabharataStoryFromMarkdown(),
        'sita-marriage': () => this.loadSitaMarriageFromMarkdown(),
        'upanishads': () => this.loadUpanishadsFromMarkdown(),
        'the-hunter': () => this.loadTheHunterFromMarkdown(),
        'diwali': () => this.loadDiwaliFromMarkdown(),
        'pilgrimage': () => this.loadPilgrimageFromMarkdown(),
        'right-living': () => this.loadRightLivingFromMarkdown(),
        'right-living-part2': () => this.loadRightLivingPart2FromMarkdown(),
        'right-living-part3': () => this.loadRightLivingPart3FromMarkdown(),
        'right-living-part4': () => this.loadRightLivingPart4FromMarkdown(),
        'misers-money': () => this.loadMisersMoneyFromMarkdown(),
        'success-through-hard-work': () => this.loadSuccessThroughHardWorkFromMarkdown(),
      };

      if (markdownLessons[lessonId as keyof typeof markdownLessons]) {
        return await markdownLessons[lessonId as keyof typeof markdownLessons]();
      }

      return null;
    } catch (error) {
      console.error(`Error loading markdown lesson ${lessonId}:`, error);
      return null;
    }
  }

  // Load Dharma Introduction lesson from markdown
  private async loadDharmaIntroFromMarkdown(): Promise<Lesson> {
    try {
      const response = await fetch('/content/lessons/hindu-philosophy/dharma-intro.md');
      if (!response.ok) throw new Error('Failed to load dharma-intro content');
      const markdown = await response.text();
      return this.convertMarkdownToHtml(markdown);
    } catch (error) {
      console.error('Error loading dharma-intro content:', error);
      return this.createErrorLesson('dharma-intro', 'Introduction to Dharma');
    }
  }

  // Load Mother Saraswati lesson from markdown (example implementation)
  private async loadMotherSaraswatiFromMarkdown(): Promise<Lesson> {
    // This simulates reading the markdown file content
    const { data, content } = matter(`---
id: mother-saraswati
title: Mother Saraswati
description: Learn about Mother Saraswati, the divine goddess of knowledge, wisdom, music, and learning
topic: deities
difficulty: beginner
estimatedTime: 15
tags: [goddess, knowledge, wisdom, music, learning]
quiz: mother-saraswati
---

# Mother Saraswati

Mother Saraswati is the goddess of knowledge and wisdom. It is Her grace which gives us intelligence, speech, music and learning. School children, teachers, poets, artists, sculptors, dancers and all lovers of knowledge worship Mother Saraswati and seek Her blessings.

## The Divine Form

Mother Saraswati is depicted in a beautiful and symbolic form that represents her divine qualities and gifts to humanity.

### The Four Hands

Mother Saraswati is seen with four hands, each holding something significant that represents an aspect of her divine nature.

These four hands symbolize the four aspects of human personality: mind, intellect, alertness, and ego.

## The Divine Veena

### The Goddess of Music

In two of her hands she holds a veena. A veena is a beautiful musical instrument with a rich, melodious sound.

### The Perfect Instrument

It is said to be the best of all musical instruments, representing the perfect harmony of knowledge.

Mother Saraswati is the goddess of music, and the veena symbolizes the sweet harmony of learning when knowledge is perfected.

## Books of Knowledge

In another hand the Divine Mother holds books, representing the vast ocean of knowledge and wisdom.

### The Goddess of Learning

This shows that She is the goddess of knowledge, learning, and education.

The books symbolize all forms of knowledge - from the sacred Vedas to modern sciences, from arts to mathematics.

## The Sacred Japa Mālā

Mother Saraswati also holds a japa mālā (rosary) in her fourth hand.

### Spiritual Discipline

The japa mālā reminds us that one should repeat God's name regularly.

This symbolizes concentration, meditation, and the spiritual discipline necessary for acquiring true knowledge.

## The White Sari

### The Goddess of Purity

Mother Saraswati is dressed in a white sari. White is the colour of purity and light.

### Pure Knowledge

Mother Saraswati is also the goddess of purity, representing knowledge that is untainted by ego or ignorance.

The white sari symbolizes that true knowledge is pure, illuminating, and leads to clarity of thought.

## How to Worship Mother Saraswati

Our Rishis advise us to worship Mother Saraswati in the following ways:

### 1. Sacred Mantra

Repeat the mantra of Mother Saraswati regularly.

**ॐ श्री सरस्वत्यै नमः**
*Om Sri Saraswatyai Namah*

### 2. Respect for Books

- Do not throw books around and on the floor
- Keep books neat and clean
- Read the scriptures and other good books

### 3. Respect for Music

- Respect musical instruments
- Listen to good and holy music and songs
- Good music can produce positive thoughts and feelings in us

### 4. Pure Speech

- **Speak the truth**
- **Speak softly**
- **Speak kindly**
- **Talk about God**

### 5. What to Avoid

- Do not use vulgar words
- Do not waste time in gossip
- Avoid idle talk that does not contribute to knowledge or goodness

## Saraswati Puja

Mother Saraswati is specially worshipped on the Saraswati Puja day, which is celebrated with great devotion.

### The Festival of Knowledge

On this day, students place their books and learning materials before the goddess and seek her blessings for success in their studies.

Musical instruments are also placed before her image, and artists and musicians pray for her grace to enhance their talents.

---

## Meanings

- **Intelligence:** Understanding, knowing
- **Sculptor:** One who cuts out of stone or wood an image or statue
- **Japa mālā:** A string of beads used when repeating God's name
- **Mantra:** Holy word or the name of God
- **Vulgar:** Bad words
- **Gossip:** Idle talk (usually about someone else)`);

    const frontmatter = data as LessonFrontmatter;
    const html = marked(content);

    // Load quiz if specified
    let quiz: QuizType | undefined;
    if (frontmatter.quiz) {
      quiz = await this.loadQuiz(frontmatter.quiz);
    }

    return {
      id: frontmatter.id,
      title: frontmatter.title,
      description: frontmatter.description,
      videoUrl: frontmatter.videoUrl,
      content: html as string,
      quiz: quiz,
      resources: [] // Could be loaded from frontmatter
    };
  }

  // Load quiz from JSON file
  private async loadQuiz(quizId: string): Promise<QuizType | undefined> {
    try {
      // In a real implementation, this would read from content/quizzes/
      // For now, we'll simulate loading the Mother Saraswati quiz
      if (quizId === 'mother-saraswati') {
        return {
          questions: [
            {
              question: "What is Mother Saraswati the goddess of?",
              answers: [
                "Wealth and prosperity",
                "Knowledge and wisdom",
                "War and victory",
                "Love and beauty"
              ],
              correctAnswer: 1
            },
            {
              question: "How many hands does Mother Saraswati have?",
              answers: [
                "Two",
                "Four",
                "Six",
                "Eight"
              ],
              correctAnswer: 1
            },
            {
              question: "What musical instrument does Mother Saraswati hold?",
              answers: [
                "Flute",
                "Drum",
                "Veena",
                "Sitar"
              ],
              correctAnswer: 2
            },
            {
              question: "What does Mother Saraswati holding books symbolize?",
              answers: [
                "She is the goddess of libraries",
                "She is the goddess of knowledge",
                "She likes to read stories",
                "She writes poetry"
              ],
              correctAnswer: 1
            },
            {
              question: "What is the japa mālā that Mother Saraswati holds?",
              answers: [
                "A flower garland",
                "A golden crown",
                "A rosary for repeating God's name",
                "A magical wand"
              ],
              correctAnswer: 2
            },
            {
              question: "What color sari does Mother Saraswati wear?",
              answers: [
                "Red",
                "Blue",
                "Green",
                "White"
              ],
              correctAnswer: 3
            },
            {
              question: "What does the white color of Mother Saraswati's sari represent?",
              answers: [
                "Snow",
                "Clouds",
                "Purity",
                "Simplicity"
              ],
              correctAnswer: 2
            },
            {
              question: "What is the mantra for Mother Saraswati?",
              answers: [
                "Om Namah Shivaya",
                "Om Sri Saraswatyai Namah",
                "Om Namo Bhagavate Vasudevaya",
                "Om Gam Ganapataye Namaha"
              ],
              correctAnswer: 1
            },
            {
              question: "According to the lesson, how should we treat books?",
              answers: [
                "Keep them in a locked cabinet",
                "Read them only on special occasions",
                "Respect them and keep them neat",
                "Share them with everyone"
              ],
              correctAnswer: 2
            },
            {
              question: "When is Mother Saraswati specially worshipped?",
              answers: [
                "Every Monday",
                "During the full moon",
                "On Saraswati Puja day",
                "During solar eclipse"
              ],
              correctAnswer: 2
            }
          ]
        };
      }

      return undefined;
    } catch (error) {
      console.error(`Error loading quiz ${quizId}:`, error);
      return undefined;
    }
  }

  // Load topics metadata
  async loadTopicsMetadata(): Promise<TopicMetadata[]> {
    // Default topics - in production this would read from topics.yaml
    return [
      {
        id: 'hindu-philosophy',
        name: 'Hindu Philosophy',
        description: 'Foundational principles and ideas that form the basis of Hindu thought',
        icon: 'book',
        order: 1
      },
      {
        id: 'deities',
        name: 'Hindu Deities and Rishis',
        description: 'Learn about divine beings and great sages',
        icon: 'star',
        order: 2
      },
      {
        id: 'scriptures',
        name: 'Sacred Scriptures',
        description: 'Sacred texts and literature of Hinduism',
        icon: 'scroll',
        order: 3
      },
      {
        id: 'practices',
        name: 'Spiritual Practices',
        description: 'Methods for spiritual growth and development',
        icon: 'lotus',
        order: 4
      }
    ];
  }

  // Load Introduction to Sri Ramakrishna lesson from markdown
  private async loadIntroductionSriRamakrishnaFromMarkdown(): Promise<Lesson> {
    const frontmatter = {
      id: 'introduction-sri-ramakrishna',
      title: 'An Introduction to Sri Ramakrishna',
      description: 'Learn about the birth and early life of Sri Ramakrishna, the great spiritual teacher',
      topic: 'holy-trinity'
    };

    const content = `
      <h2>An Introduction to Sri Ramakrishna</h2>
      <p>Sri Ramakrishna was one of the greatest spiritual teachers the world has ever known. His life story shows us how God can be born among us to guide humanity toward truth and love.</p>

      <h3>The Holy Parents</h3>
      <p>Chandrāmani Devi and Kshudirām were Brāhmins who lived a simple, God-centered life.</p>
      <p>They were poor in material wealth but rich in devotion. They lived in Kamārpukur, in West Bengal.</p>
      <p>Most importantly, they loved God with all their hearts and spent their lives in prayer and service.</p>

      <h3>The Sacred Birth</h3>
      <p>On 18th February 1836, the divine child was born and given the name Gadādhar.</p>
      <p>Gadādhar means "bearer of the mace" - one of the names of Lord Vishnu.</p>
    `;

    const quiz = await this.loadQuiz('introduction-sri-ramakrishna');

    return {
      id: frontmatter.id,
      title: frontmatter.title,
      description: frontmatter.description,
      content: content,
      quiz: quiz,
      resources: []
    };
  }

  // Load Childhood Days lesson from markdown
  private async loadChildhoodDaysSriRamakrishnaFromMarkdown(): Promise<Lesson> {
    const frontmatter = {
      id: 'childhood-days-sri-ramakrishna',
      title: 'Childhood Days of Sri Ramakrishna',
      description: 'Learn about the beautiful village life and early spiritual experiences of young Gadai',
      topic: 'holy-trinity'
    };

    const content = `
      <h2>Childhood Days of Sri Ramakrishna</h2>
      <p>The childhood of Sri Ramakrishna, known then as Gadai, was spent in a beautiful village that shaped his love for God and nature.</p>

      <h3>The Beautiful Village of Kamārpukur</h3>
      <p>Kamārpukur is a small village in India, about seventy miles from Kolkata.</p>
      <p>The village was surrounded by green fields, mango groves, and peaceful ponds.</p>

      <h3>Family Life</h3>
      <p>Young Gadai grew up in a loving family that put God at the center of everything.</p>
    `;

    const quiz = await this.loadQuiz('childhood-days-sri-ramakrishna');

    return {
      id: frontmatter.id,
      title: frontmatter.title,
      description: frontmatter.description,
      content: content,
      quiz: quiz,
      resources: []
    };
  }

  // Load Gadai's Love for Nature lesson from markdown
  private async loadGadaiLoveForNatureFromMarkdown(): Promise<Lesson> {
    const frontmatter = {
      id: 'gadai-love-for-nature',
      title: 'Gadai\'s Love for Nature',
      description: 'Learn about young Gadai\'s deep spiritual connection with nature and his divine experiences in natural beauty',
      topic: 'holy-trinity'
    };

    const content = `
      <h2>Gadai's Love for Nature</h2>
      <p>This beautiful story shows us how young Gadai's pure heart could see the Divine in nature's beauty.</p>

      <h3>A Heart Open to Beauty</h3>
      <p>Gadai had a deep love for nature that was different from ordinary appreciation of beauty.</p>

      <h3>The Divine Experience</h3>
      <p>One day, young Gadai was walking through the countryside when something extraordinary happened.</p>
      <p>As he watched white cranes flying against dark rain clouds, he fell into a divine trance.</p>
    `;

    const quiz = await this.loadQuiz('gadai-love-for-nature');

    return {
      id: frontmatter.id,
      title: frontmatter.title,
      description: frontmatter.description,
      content: content,
      quiz: quiz,
      resources: []
    };
  }

  // Load additional Holy Trinity lessons (placeholder implementations)
  private async loadGadaiPlayingShivaFromMarkdown(): Promise<Lesson> {
    return {
      id: 'gadai-playing-shiva',
      title: 'Gadai Playing Shiva',
      description: 'Learn about young Gadai\'s divine experience while playing the role of Lord Shiva',
      content: '<h2>Gadai Playing Shiva</h2><p>This beautiful story shows us how young Gadai\'s deep devotion to God could transform even a simple drama into a profound spiritual experience...</p>',
      quiz: await this.loadQuiz('gadai-playing-shiva'),
      resources: []
    };
  }

  private async loadRaniRasmaniRamakrishnaFromMarkdown(): Promise<Lesson> {
    return {
      id: 'rani-rasmani-ramakrishna',
      title: 'Rāni Rāsmani and Sri Rāmakrishna',
      description: 'Learn about the devoted queen who built the Dakshineswar temple and her encounter with Sri Ramakrishna',
      content: '<h2>Rāni Rāsmani and Sri Rāmakrishna</h2><p>This story teaches us about the importance of keeping our minds focused on God during worship...</p>',
      quiz: await this.loadQuiz('rani-rasmani-ramakrishna'),
      resources: []
    };
  }

  private async loadMuslimWayToGodFromMarkdown(): Promise<Lesson> {
    return {
      id: 'muslim-way-to-god',
      title: 'The Muslim Way to God',
      description: 'Learn how Sri Ramakrishna explored the Islamic path and discovered the universal truth of God',
      content: '<h2>The Muslim Way to God</h2><p>This beautiful story shows us Sri Ramakrishna\'s quest to understand how different religions reach the same Divine Truth...</p>',
      quiz: await this.loadQuiz('muslim-way-to-god'),
      resources: []
    };
  }

  private async loadChristianWayToGodFromMarkdown(): Promise<Lesson> {
    return {
      id: 'christian-way-to-god',
      title: 'The Christian Way to God',
      description: 'Learn how Sri Ramakrishna explored Christianity and experienced the divine love of Jesus Christ',
      content: '<h2>The Christian Way to God</h2><p>Sri Ramakrishna\'s exploration of Christianity demonstrates the universal nature of Divine Truth...</p>',
      quiz: await this.loadQuiz('christian-way-to-god'),
      resources: []
    };
  }

  private async loadGodIsInfiniteFromMarkdown(): Promise<Lesson> {
    return {
      id: 'god-is-infinite',
      title: 'God is Infinite',
      description: 'Learn Sri Ramakrishna\'s profound teaching about the unity of all religions and the infinite nature of God',
      content: '<h2>God is Infinite</h2><p>This profound teaching from Sri Ramakrishna reveals one of the most important spiritual truths: that God is infinite and can be approached through many different paths...</p>',
      quiz: await this.loadQuiz('god-is-infinite'),
      resources: []
    };
  }

  private async loadSriSaradaDeviFromMarkdown(): Promise<Lesson> {
    try {
      const response = await fetch('/content/lessons/holy-trinity/sri-sarada-devi.md');
      if (!response.ok) throw new Error('Failed to load sri-sarada-devi content');
      const markdown = await response.text();
      return this.convertMarkdownToHtml(markdown);
    } catch (error) {
      console.error('Error loading sri-sarada-devi content:', error);
      return this.createErrorLesson('sri-sarada-devi', 'Sri Sāradā Devi');
    }
  }

  private async loadSwamiVivekanandaPart1FromMarkdown(): Promise<Lesson> {
    return {
      id: 'swami-vivekananda-part-1',
      title: 'Swami Vivekānanda - Part 1',
      description: 'Learn about the early life of Narendranath Datta, who would become the great Swami Vivekananda',
      content: '<h2>Swami Vivekānanda - Part 1</h2><p>This is the story of a remarkable young man named Narendranath Datta, who would grow up to become one of the greatest spiritual teachers of modern times...</p>',
      quiz: await this.loadQuiz('swami-vivekananda-part-1'),
      resources: []
    };
  }

  private async loadSwamiVivekanandaPart2FromMarkdown(): Promise<Lesson> {
    return {
      id: 'swami-vivekananda-part-2',
      title: 'Swami Vivekānanda - Part 2',
      description: 'Learn about Naren\'s spiritual training under Sri Ramakrishna and his transformation into Swami Vivekananda',
      content: '<h2>Swami Vivekānanda - Part 2</h2><p>This continues the story of Narendranath\'s spiritual journey and his transformation under Sri Ramakrishna\'s guidance...</p>',
      quiz: await this.loadQuiz('swami-vivekananda-part-2'),
      resources: []
    };
  }

  private async loadRemainInYourReligionFromMarkdown(): Promise<Lesson> {
    return {
      id: 'remain-in-your-religion',
      title: 'Remain in Your Religion',
      description: 'Learn Sri Ramakrishna\'s important teaching about staying faithful to your own religious path while respecting others',
      content: '<h2>Remain in Your Religion</h2><p>This important teaching from Sri Ramakrishna provides practical guidance for living in a world of many religions...</p>',
      quiz: await this.loadQuiz('remain-in-your-religion'),
      resources: []
    };
  }

  private async loadLordGaneshaFromMarkdown(): Promise<Lesson> {
    return {
      id: 'lord-ganesha',
      title: 'Lord Ganesha',
      description: 'Learn about Lord Ganesha, the beloved elephant-headed deity who removes obstacles and brings good fortune',
      content: '<h2>Lord Ganesha</h2><p>Lord Ganesha is one of the most beloved deities in Hinduism. With his elephant head and gentle nature, he is known as the remover of obstacles...</p>',
      quiz: await this.loadQuiz('lord-ganesha'),
      resources: []
    };
  }

  private async loadBhagavadGitaIntroductionFromMarkdown(): Promise<Lesson> {
    return {
      id: 'bhagavad-gita-introduction',
      title: 'Introduction to the Bhagavad Gita',
      description: 'Learn about the sacred dialogue between Lord Krishna and Arjuna that contains timeless wisdom for all humanity',
      content: '<h2>Introduction to the Bhagavad Gita</h2><p>The Bhagavad Gita, often called simply "the Gita," is one of the most important and beloved scriptures in Hinduism...</p>',
      quiz: await this.loadQuiz('bhagavad-gita-introduction'),
      resources: []
    };
  }

  private async loadMeditationBasicsFromMarkdown(): Promise<Lesson> {
    return {
      id: 'meditation-basics',
      title: 'Meditation Basics',
      description: 'Learn the fundamental principles and practices of meditation for spiritual growth and inner peace',
      content: '<h2>Meditation Basics</h2><p>Meditation is one of the most important spiritual practices for developing inner peace, concentration, and connection with the Divine...</p>',
      quiz: await this.loadQuiz('meditation-basics'),
      resources: []
    };
  }

  // Deities lesson loaders
  private async loadLordKrishnaFromMarkdown(): Promise<Lesson> {
    return {
      id: 'lord-krishna',
      title: 'Lord Krishna',
      description: 'Learn about the beloved Lord Krishna, his wonderful life, and his eternal teachings',
      content: '<h2>Lord Krishna</h2><p>Lord Krishna lived in India long, long ago. His most wonderful life and teachings, full of love and wisdom, are of everlasting interest to one and all...</p>',
      quiz: await this.loadQuiz('lord-krishna'),
      resources: []
    };
  }

  private async loadTrimurtiConceptFromMarkdown(): Promise<Lesson> {
    return {
      id: 'trimurti-concept',
      title: 'The Trimurti Concept',
      description: 'Explore the trinity of Brahma, Vishnu, and Shiva and understand the cosmic functions of creation, preservation, and transformation',
      content: '<h2>The Hindu Trinity: Trimurti</h2><p>The Trimurti, or "three forms," represents the cosmic functions of creation, preservation, and destruction in Hindu philosophy...</p>',
      quiz: await this.loadQuiz('trimurti-concept'),
      resources: []
    };
  }

  private async loadPrahladaDevoteeFromMarkdown(): Promise<Lesson> {
    return {
      id: 'prahlada-devotee',
      title: 'Prahlada - The Child Devotee',
      description: 'Learn about the inspiring story of Prahlada, the child devotee whose faith in God never wavered despite facing great trials',
      content: '<h2>Prahlada - The Child Devotee</h2><p>This inspiring story teaches us about unwavering faith in God and how divine love protects those who are truly devoted...</p>',
      quiz: await this.loadQuiz('prahlada-devotee'),
      resources: []
    };
  }

  private async loadGaneshAndCatFromMarkdown(): Promise<Lesson> {
    return {
      id: 'ganesh-and-cat',
      title: 'Ganesh and the Cat',
      description: 'Learn the beautiful story that teaches us to love and respect all beings as manifestations of the Divine',
      content: '<h2>Ganesh and the Cat</h2><p>This beautiful story teaches us that all living beings deserve our love and respect, and that the Divine is present in every creature...</p>',
      quiz: await this.loadQuiz('ganesh-and-cat'),
      resources: []
    };
  }

  private async loadValmikiSageFromMarkdown(): Promise<Lesson> {
    return {
      id: 'valmiki-sage',
      title: 'Valmiki - From Robber to Great Sage',
      description: 'Learn about the transformation of the robber Ratnakar into the great sage Valmiki, author of the Ramayana',
      content: '<h2>Valmiki - From Robber to Great Sage</h2><p>This inspiring story shows us that no matter how far we have fallen, divine grace can transform anyone who sincerely seeks to change...</p>',
      quiz: await this.loadQuiz('valmiki-sage'),
      resources: []
    };
  }

  // Scripture lesson loaders
  private async loadTheVedasFromMarkdown(): Promise<Lesson> {
    return {
      id: 'the-vedas',
      title: 'The Vedas',
      description: 'Learn about the oldest and most sacred scriptures of Hinduism - the eternal knowledge of God',
      content: '<h2>The Vedas</h2><p>The Vedas are the oldest and most sacred scriptures of Hinduism, containing the eternal knowledge of God revealed to ancient sages...</p>',
      quiz: await this.loadQuiz('the-vedas'),
      resources: []
    };
  }

  private async loadRamayanaStoryFromMarkdown(): Promise<Lesson> {
    return {
      id: 'ramayana-story',
      title: 'The Ramayana',
      description: 'Learn about the great epic story of Rama, Sita, and their adventures that teaches us about dharma, devotion, and righteousness',
      content: '<h2>The Ramayana</h2><p>The Ramayana is one of the greatest epic stories ever told, teaching us about love, duty, courage, and righteousness through the adventures of Prince Rama, Princess Sita, and their devoted friend Hanuman...</p>',
      quiz: await this.loadQuiz('ramayana-story'),
      resources: []
    };
  }

  // Practice lesson loaders
  private async loadMahaShivaratriFromMarkdown(): Promise<Lesson> {
    return {
      id: 'maha-shivaratri',
      title: 'Mahā Shivarātri',
      description: 'Learn about the sacred festival of Maha Shivaratri and the story of Lord Shiva\'s great sacrifice for humanity',
      content: '<h2>Mahā Shivarātri</h2><p>Mahā Shivarātri, the "Great Night of Shiva," is one of the most sacred festivals in Hinduism. It celebrates Lord Shiva and teaches us about devotion, sacrifice, and spiritual transformation...</p>',
      quiz: await this.loadQuiz('maha-shivaratri'),
      resources: []
    };
  }

  private async loadPrayerFromMarkdown(): Promise<Lesson> {
    return {
      id: 'prayer',
      title: 'Prayer',
      description: 'Learn about the different ways to pray and connect with the Divine through heartfelt communication with God',
      content: '<h2>Prayer</h2><p>Prayer is one of the most fundamental and beautiful ways to connect with God. It is the heart\'s sincere communication with the Divine, expressing our love, gratitude, needs, and devotion...</p>',
      quiz: await this.loadQuiz('prayer'),
      resources: []
    };
  }

  // Load all Holy Trinity lessons
  private async loadHolyTrinityLessons(): Promise<Lesson[]> {
    const lessons: Lesson[] = [];

    // List of all Holy Trinity lessons in order
    const holyTrinityLessonIds = [
      'introduction-sri-ramakrishna',
      'childhood-days-sri-ramakrishna',
      'gadai-love-for-nature',
      'gadai-playing-shiva',
      'rani-rasmani-ramakrishna',
      'muslim-way-to-god',
      'christian-way-to-god',
      'god-is-infinite',
      'sri-sarada-devi',
      'swami-vivekananda-part-1',
      'swami-vivekananda-part-2',
      'remain-in-your-religion'
    ];

    for (const lessonId of holyTrinityLessonIds) {
      try {
        const lesson = await this.loadMarkdownLesson('holy-trinity', lessonId);
        if (lesson) {
          lessons.push(lesson);
        }
      } catch (error) {
        console.warn(`Could not load Holy Trinity lesson ${lessonId}`);
      }
    }

    return lessons;
  }

  // New lesson loaders for all remaining lessons
  private async loadAhimsaNonViolenceFromMarkdown(): Promise<Lesson> {
    try {
      const response = await fetch('/content/lessons/philosophy/ahimsa-non-violence.md');
      if (!response.ok) throw new Error('Failed to load ahimsa content');
      const markdown = await response.text();
      return this.convertMarkdownToHtml(markdown);
    } catch (error) {
      console.error('Error loading ahimsa content:', error);
      return this.createErrorLesson('ahimsa-non-violence', 'Ahimsa - Non-Violence');
    }
  }

  private async loadThiruValluvarFromMarkdown(): Promise<Lesson> {
    try {
      const response = await fetch('/content/lessons/deities/thiru-valluvar.md');
      if (!response.ok) throw new Error('Failed to load thiru-valluvar content');
      const markdown = await response.text();
      return this.convertMarkdownToHtml(markdown);
    } catch (error) {
      console.error('Error loading thiru-valluvar content:', error);
      return this.createErrorLesson('thiru-valluvar', 'Thiru-Valluvar');
    }
  }

  private async loadRantiDevaFromMarkdown(): Promise<Lesson> {
    try {
      const response = await fetch('/content/lessons/deities/ranti-deva.md');
      if (!response.ok) throw new Error('Failed to load ranti-deva content');
      const markdown = await response.text();
      return this.convertMarkdownToHtml(markdown);
    } catch (error) {
      console.error('Error loading ranti-deva content:', error);
      return this.createErrorLesson('ranti-deva', 'Ranti Deva');
    }
  }

  private async loadSambandarChildSaintFromMarkdown(): Promise<Lesson> {
    try {
      const response = await fetch('/content/lessons/deities/sambandar-child-saint.md');
      if (!response.ok) throw new Error('Failed to load sambandar content');
      const markdown = await response.text();
      return this.convertMarkdownToHtml(markdown);
    } catch (error) {
      console.error('Error loading sambandar content:', error);
      return this.createErrorLesson('sambandar-child-saint', 'Sambandar - The Child Saint');
    }
  }

  private async loadTeachingsSriSaradaDeviFromMarkdown(): Promise<Lesson> {
    try {
      const response = await fetch('/content/lessons/holy-trinity/teachings-sri-sarada-devi.md');
      if (!response.ok) throw new Error('Failed to load sri-sarada-devi content');
      const markdown = await response.text();
      return this.convertMarkdownToHtml(markdown);
    } catch (error) {
      console.error('Error loading sri-sarada-devi content:', error);
      return this.createErrorLesson('teachings-sri-sarada-devi', 'Teachings of Sri Sārada Devi');
    }
  }

  private async loadLordBuddhaFromMarkdown(): Promise<Lesson> {
    try {
      const response = await fetch('/content/lessons/deities/lord-buddha.md');
      if (!response.ok) throw new Error('Failed to load lord-buddha content');
      const markdown = await response.text();
      return this.convertMarkdownToHtml(markdown);
    } catch (error) {
      console.error('Error loading lord-buddha content:', error);
      return this.createErrorLesson('lord-buddha', 'Lord Buddha');
    }
  }

  private async loadVedavyasaSageFromMarkdown(): Promise<Lesson> {
    try {
      const response = await fetch('/content/lessons/deities/vedavyasa-sage.md');
      if (!response.ok) throw new Error('Failed to load vedavyasa content');
      const markdown = await response.text();
      return this.convertMarkdownToHtml(markdown);
    } catch (error) {
      console.error('Error loading vedavyasa content:', error);
      return this.createErrorLesson('vedavyasa-sage', 'Vedavyāsa - The Great Compiler');
    }
  }

  private async loadBhagavadGitaMessageFromMarkdown(): Promise<Lesson> {
    try {
      const response = await fetch('/content/lessons/scriptures/bhagavad-gita-message.md');
      if (!response.ok) throw new Error('Failed to load bhagavad-gita-message content');
      const markdown = await response.text();
      return this.convertMarkdownToHtml(markdown);
    } catch (error) {
      console.error('Error loading bhagavad-gita-message content:', error);
      return this.createErrorLesson('bhagavad-gita-message', 'The Message of the Bhagavad Gita');
    }
  }

  private async loadMahabharataStoryFromMarkdown(): Promise<Lesson> {
    try {
      const response = await fetch('/content/lessons/scriptures/mahabharata-story.md');
      if (!response.ok) throw new Error('Failed to load mahabharata content');
      const markdown = await response.text();
      return this.convertMarkdownToHtml(markdown);
    } catch (error) {
      console.error('Error loading mahabharata content:', error);
      return this.createErrorLesson('mahabharata-story', 'The Mahabharata');
    }
  }

  private async loadSitaMarriageFromMarkdown(): Promise<Lesson> {
    try {
      const response = await fetch('/content/lessons/scriptures/sita-marriage.md');
      if (!response.ok) throw new Error('Failed to load sita-marriage content');
      const markdown = await response.text();
      return this.convertMarkdownToHtml(markdown);
    } catch (error) {
      console.error('Error loading sita-marriage content:', error);
      return this.createErrorLesson('sita-marriage', 'Sita\'s Marriage');
    }
  }

  private async loadUpanishadsFromMarkdown(): Promise<Lesson> {
    try {
      const response = await fetch('/content/lessons/scriptures/upanishads.md');
      if (!response.ok) throw new Error('Failed to load upanishads content');
      const markdown = await response.text();
      return this.convertMarkdownToHtml(markdown);
    } catch (error) {
      console.error('Error loading upanishads content:', error);
      return this.createErrorLesson('upanishads', 'The Upanishads');
    }
  }

  private async loadTheHunterFromMarkdown(): Promise<Lesson> {
    try {
      const response = await fetch('/content/lessons/practices/the-hunter.md');
      if (!response.ok) throw new Error('Failed to load the-hunter content');
      const markdown = await response.text();
      return this.convertMarkdownToHtml(markdown);
    } catch (error) {
      console.error('Error loading the-hunter content:', error);
      return this.createErrorLesson('the-hunter', 'The Hunter');
    }
  }

  private async loadDiwaliFromMarkdown(): Promise<Lesson> {
    try {
      const response = await fetch('/content/lessons/practices/diwali.md');
      if (!response.ok) throw new Error('Failed to load diwali content');
      const markdown = await response.text();
      return this.convertMarkdownToHtml(markdown);
    } catch (error) {
      console.error('Error loading diwali content:', error);
      return this.createErrorLesson('diwali', 'Diwāli');
    }
  }

  private async loadPilgrimageFromMarkdown(): Promise<Lesson> {
    try {
      const response = await fetch('/content/lessons/practices/pilgrimage.md');
      if (!response.ok) throw new Error('Failed to load pilgrimage content');
      const markdown = await response.text();
      return this.convertMarkdownToHtml(markdown);
    } catch (error) {
      console.error('Error loading pilgrimage content:', error);
      return this.createErrorLesson('pilgrimage', 'Pilgrimage - Visiting Temples');
    }
  }

  private async loadRightLivingFromMarkdown(): Promise<Lesson> {
    try {
      const response = await fetch('/content/lessons/practices/right-living.md');
      if (!response.ok) throw new Error('Failed to load right-living content');
      const markdown = await response.text();
      return this.convertMarkdownToHtml(markdown);
    } catch (error) {
      console.error('Error loading right-living content:', error);
      return this.createErrorLesson('right-living', 'Right Living - Part 1');
    }
  }

  private async loadRightLivingPart2FromMarkdown(): Promise<Lesson> {
    try {
      const response = await fetch('/content/lessons/practices/right-living-part2.md');
      if (!response.ok) throw new Error('Failed to load right-living-part2 content');
      const markdown = await response.text();
      return this.convertMarkdownToHtml(markdown);
    } catch (error) {
      console.error('Error loading right-living-part2 content:', error);
      return this.createErrorLesson('right-living-part2', 'Right Living - Part 2');
    }
  }

  private async loadRightLivingPart3FromMarkdown(): Promise<Lesson> {
    try {
      const response = await fetch('/content/lessons/practices/right-living-part3.md');
      if (!response.ok) throw new Error('Failed to load right-living-part3 content');
      const markdown = await response.text();
      return this.convertMarkdownToHtml(markdown);
    } catch (error) {
      console.error('Error loading right-living-part3 content:', error);
      return this.createErrorLesson('right-living-part3', 'Right Living - Part 3');
    }
  }

  private async loadRightLivingPart4FromMarkdown(): Promise<Lesson> {
    try {
      const response = await fetch('/content/lessons/practices/right-living-part4.md');
      if (!response.ok) throw new Error('Failed to load right-living-part4 content');
      const markdown = await response.text();
      return this.convertMarkdownToHtml(markdown);
    } catch (error) {
      console.error('Error loading right-living-part4 content:', error);
      return this.createErrorLesson('right-living-part4', 'Right Living - Part 4');
    }
  }

  private async loadMisersMoneyFromMarkdown(): Promise<Lesson> {
    try {
      const response = await fetch('/content/lessons/practices/misers-money.md');
      if (!response.ok) throw new Error('Failed to load misers-money content');
      const markdown = await response.text();
      return this.convertMarkdownToHtml(markdown);
    } catch (error) {
      console.error('Error loading misers-money content:', error);
      return this.createErrorLesson('misers-money', 'The Miser\'s Money');
    }
  }

  private async loadSuccessThroughHardWorkFromMarkdown(): Promise<Lesson> {
    try {
      const response = await fetch('/content/lessons/practices/success-through-hard-work.md');
      if (!response.ok) throw new Error('Failed to load success-through-hard-work content');
      const markdown = await response.text();
      return this.convertMarkdownToHtml(markdown);
    } catch (error) {
      console.error('Error loading success-through-hard-work content:', error);
      return this.createErrorLesson('success-through-hard-work', 'Success Through Hard Work');
    }
  }

  // Helper method to convert markdown to HTML and create lesson
  private async convertMarkdownToHtml(markdown: string): Promise<Lesson> {
    const { data, content } = matter(markdown);
    const frontmatter = data as LessonFrontmatter;
    const html = marked(content);

    // Load quiz if specified
    let quiz: QuizType | undefined;
    if (frontmatter.quiz) {
      quiz = await this.loadQuiz(frontmatter.quiz);
    }

    return {
      id: frontmatter.id,
      title: frontmatter.title,
      description: frontmatter.description,
      videoUrl: frontmatter.videoUrl,
      content: html as string,
      quiz: quiz,
      resources: []
    };
  }

  // Helper method to create error lesson
  private createErrorLesson(id: string, title: string): Lesson {
    return {
      id,
      title,
      description: 'Error loading lesson content',
      content: '<p>Error loading content. Please try again later.</p>',
      quiz: undefined,
      resources: []
    };
  }

  // Get a single lesson by ID
  async getLesson(lessonId: string): Promise<Lesson | null> {
    try {
      // Load all lessons and find the specific one
      const allLessons = await this.buildLessons();

      for (const lessonGroup of allLessons) {
        const lesson = lessonGroup.lessons.find(l => l.id === lessonId);
        if (lesson) {
          return lesson;
        }
      }

      return null;
    } catch (error) {
      console.error('Error getting lesson:', error);
      return null;
    }
  }

  // Clear cache method for development
  clearCache(): void {
    // Clear any internal caches
    console.log('Content builder cache cleared');
  }
}

// Export builder instance
export const contentBuilder = new ContentBuilder();
