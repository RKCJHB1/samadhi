
// Define the types for our lessons data
export interface QuizType {
  questions: {
    question: string;
    answers: string[];
    correctAnswer: number; // Index of the correct answer
  }[];
}

export interface LessonResource {
  title: string;
  url: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  content?: string;
  quiz?: QuizType;
  resources?: LessonResource[];
}

export interface LessonGroup {
  topicId: string;
  topicName: string;
  lessons: Lesson[];
}

// Sample lesson data
export const lessonsData: LessonGroup[] = [
  {
    topicId: 'hindu-philosophy',
    topicName: 'Hindu Philosophy',
    lessons: [
      {
        id: 'dharma-intro',
        title: 'Introduction to Dharma',
        description: 'Learn about the foundational concept of dharma in Hindu philosophy',
        videoUrl: 'https://www.youtube.com/embed/lFiNGO0joPk',
        content: `
          <h2>Understanding Dharma</h2>
          <div class="text-center mb-6">
            <img src="/pics/dharma.png" alt="Dharma symbol representing cosmic order and righteousness" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">The Dharma symbol representing cosmic order and righteousness</p>
          </div>
          <p>Dharma is one of the most complex and profound concepts in Hindu philosophy. The term comes from the Sanskrit root "dhṛ," which means "to sustain, support, or uphold." While there is no exact English translation, dharma encompasses righteousness, duty, cosmic order, and the path of right living.</p>

          <h3>Multiple Dimensions of Dharma</h3>
          <p>Dharma operates on multiple levels:</p>
          <ul>
            <li><strong>Cosmic Dharma (Rita):</strong> The natural order and rhythm of the universe</li>
            <li><strong>Social Dharma (Varnashrama Dharma):</strong> One's duties based on social position and stage of life</li>
            <li><strong>Personal Dharma (Sva-dharma):</strong> One's individual purpose and path</li>
          </ul>

          <p>According to Hindu belief, following one's dharma leads to harmony, balance, and eventually, spiritual liberation (moksha). Acting against one's dharma creates disorder (adharma) and negative karma.</p>

          <h3>Dharma in Sacred Texts</h3>
          <p>The concept of dharma is extensively explored in Hindu scriptures:</p>
          <ul>
            <li>The Bhagavad Gita presents the dilemma of conflicting dharmas through Arjuna's crisis</li>
            <li>The Dharma Shastras provide specific guidelines for social and personal conduct</li>
            <li>The Upanishads connect dharma to the ultimate reality (Brahman)</li>
          </ul>

          <p>Lord Vishnu is revered as the protector of dharma, appearing as various avatars throughout cosmic cycles when dharma declines and adharma increases.</p>

          <h3>Dharma in Daily Life</h3>
          <p>In practice, dharma guides ethical decision-making and provides a framework for living a meaningful life. It encourages individuals to fulfill their responsibilities while maintaining spiritual awareness.</p>
        `,
        quiz: {
          questions: [
            {
              question: 'What is the best translation of the word Dharma?',
              answers: [
                'Duty',
                'Religion',
                'Righteousness',
                'There is no exact translation'
              ],
              correctAnswer: 3
            },
            {
              question: 'Which of the following is NOT a form of dharma?',
              answers: [
                'Sanatana Dharma',
                'Sva-dharma (personal duty)',
                'Maya Dharma',
                'Raja Dharma (duty of kings)'
              ],
              correctAnswer: 2
            },
            {
              question: 'Who is considered the guardian of dharma in Hindu tradition?',
              answers: [
                'Brahma',
                'Vishnu',
                'Shiva',
                'Indra'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is the ultimate goal of following dharma?',
              answers: [
                'Wealth',
                'Fame',
                'Moksha (liberation)',
                'Power'
              ],
              correctAnswer: 2
            },
            {
              question: 'What does the Sanskrit root "dhṛ" mean?',
              answers: [
                'To run',
                'To sustain, support, or uphold',
                'To destroy',
                'To hide'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is Sanatana Dharma?',
              answers: [
                'Personal duty',
                'King\'s duty',
                'Eternal cosmic order',
                'Temporary rules'
              ],
              correctAnswer: 2
            },
            {
              question: 'What is Sva-dharma?',
              answers: [
                'Universal law',
                'Personal duty based on individual circumstances',
                'King\'s responsibility',
                'Religious ritual'
              ],
              correctAnswer: 1
            },
            {
              question: 'What does dharma provide for living a meaningful life?',
              answers: [
                'Money',
                'Fame',
                'A framework for ethical decision-making',
                'Physical strength'
              ],
              correctAnswer: 2
            },
            {
              question: 'How does dharma guide individuals?',
              answers: [
                'Only through rules',
                'By encouraging fulfillment of responsibilities with spiritual awareness',
                'Through punishment',
                'By avoiding all action'
              ],
              correctAnswer: 1
            },
            {
              question: 'What does dharma encompass according to the lesson?',
              answers: [
                'Only religious practices',
                'Only personal duties',
                'Righteousness, duty, cosmic order, and right living',
                'Only social rules'
              ],
              correctAnswer: 2
            }
          ]
        },
        resources: [
          {
            title: 'The Concept of Dharma in Hinduism',
            url: 'https://www.hinduwebsite.com/hinduism/dharma.asp'
          },
          {
            title: 'Dharma in the Bhagavad Gita',
            url: 'https://www.holy-bhagavad-gita.org/chapter/1'
          }
        ]
      },
      {
        id: 'karma-principle',
        title: 'The Principle of Karma',
        description: 'Understand the law of cause and effect in Hindu philosophy',
        videoUrl: 'https://www.youtube.com/embed/yJMqULiDtOM?si=2AgJOdBvcEIUMI5b',
        content: `
          <h2>The Law of Karma</h2>
          <p>Karma, literally meaning "action," is a fundamental concept in Hindu philosophy that describes the principle of cause and effect. According to this law, every action (karma) generates a force of energy that returns to us in kind—good or bad, immediately or at some point in the future.</p>

          <h3>Types of Karma</h3>
          <p>Hindu texts describe several types of karma:</p>
          <ul>
            <li><strong>Sanchita Karma:</strong> The accumulated karma from all past lives, stored until it can be resolved</li>
            <li><strong>Prarabdha Karma:</strong> The portion of Sanchita Karma scheduled to be experienced in this lifetime</li>
            <li><strong>Kriyamana/Agami Karma:</strong> The karma being created in the present life that will bear fruit in the future</li>
          </ul>

          <p>Karma is not simply a system of punishment and reward but rather a natural law of the universe—like gravity—that functions regardless of awareness or intention.</p>

          <h3>Karma and Reincarnation</h3>
          <p>In Hindu thought, karma is intimately connected with the cycle of rebirth (samsara). The soul (atman) carries the karmic impressions (samskaras) from one life to the next. The quality and nature of these impressions determine the circumstances of the next birth.</p>

          <h3>Transcending Karma</h3>
          <p>While karma binds one to the cycle of birth and death, Hindu philosophy offers paths to transcend it:</p>
          <ul>
            <li>Through selfless action (Karma Yoga)</li>
            <li>Through devotion to God (Bhakti Yoga)</li>
            <li>Through spiritual knowledge (Jnana Yoga)</li>
          </ul>

          <p>The ultimate goal is to achieve moksha (liberation), a state where one is freed from the cycle of karma and rebirth.</p>
        `,
        quiz: {
          questions: [
            {
              question: 'What does the word "karma" literally mean?',
              answers: [
                'Destiny',
                'Fate',
                'Action',
                'Reaction'
              ],
              correctAnswer: 2
            },
            {
              question: 'According to the law of karma, what determines a person\'s future?',
              answers: [
                'Divine will',
                'Random chance',
                'Past actions',
                'Social status'
              ],
              correctAnswer: 2
            },
            {
              question: 'Which type of karma is created by actions in the current life?',
              answers: [
                'Sanchita Karma',
                'Prarabdha Karma',
                'Agami Karma',
                'Kriyamana Karma'
              ],
              correctAnswer: 3
            },
            {
              question: 'What is Sanchita Karma?',
              answers: [
                'Current life actions',
                'Accumulated karma from all past lives',
                'Future karma',
                'Karma that cannot be changed'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is Prarabdha Karma?',
              answers: [
                'Future actions',
                'All accumulated karma',
                'Portion of karma that determines current life circumstances',
                'Actions in current life'
              ],
              correctAnswer: 2
            },
            {
              question: 'What is Agami Karma?',
              answers: [
                'Past life karma',
                'Current life karma',
                'Future karma that will result from current actions',
                'Unchangeable karma'
              ],
              correctAnswer: 2
            },
            {
              question: 'According to karma, what is the relationship between actions and consequences?',
              answers: [
                'No relationship',
                'Random relationship',
                'Every action has consequences',
                'Only bad actions have consequences'
              ],
              correctAnswer: 2
            },
            {
              question: 'What is the ultimate goal regarding karma?',
              answers: [
                'To accumulate good karma',
                'To achieve moksha (liberation) and be freed from karma',
                'To avoid all actions',
                'To create more karma'
              ],
              correctAnswer: 1
            },
            {
              question: 'How does understanding karma help in daily life?',
              answers: [
                'It makes us fearful',
                'It encourages responsible and ethical behavior',
                'It makes us lazy',
                'It has no practical benefit'
              ],
              correctAnswer: 1
            },
            {
              question: 'What does karma teach about personal responsibility?',
              answers: [
                'We are not responsible for our actions',
                'Others are responsible for our actions',
                'We are responsible for our own actions and their consequences',
                'Only God is responsible'
              ],
              correctAnswer: 2
            }
          ]
        }
      }
    ]
  },
  {
    topicId: 'deities',
    topicName: 'Hindu Deities and Rishis',
    lessons: [
      {
        id: 'lord-krishna',
        title: 'Lord Krishna',
        description: 'Learn about the beloved Lord Krishna, his wonderful life, and his eternal teachings',
        content: `
          <h2>Lord Krishna</h2>
          <div class="text-center mb-6">
            <img src="/pics/krishna.jpg" alt="Lord Krishna - the beloved deity with peacock feather, playing flute" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Lord Krishna - the beloved deity whose life and teachings inspire millions</p>
          </div>
          <p>Lord Krishna lived in India long, long ago. His most wonderful life and teachings, full of love and wisdom, are of everlasting interest to one and all.</p>

          <h3>The Beloved Child Krishna</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <p class="mb-4">Every one of us is familiar with pictures of baby Krishna:</p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="bg-white p-3 rounded-lg text-center">
                <strong>Butter Jar</strong><br/>
                <span class="text-sm">Holding a jar of butter in his hands</span>
              </div>
              <div class="bg-white p-3 rounded-lg text-center">
                <strong>With Cows</strong><br/>
                <span class="text-sm">Happily playing with cows and calves</span>
              </div>
              <div class="bg-white p-3 rounded-lg text-center">
                <strong>Peacock Feather</strong><br/>
                <span class="text-sm">Adorning his hair</span>
              </div>
            </div>
          </div>

          <h3>Birth and Upbringing</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <div class="space-y-4">
              <div class="bg-white p-4 rounded-lg">
                <h4 class="font-semibold mb-2">Birth in Mathura</h4>
                <p>Sri Krishna was born in <strong>Mathura</strong> (in India) to <strong>Vasudeva</strong> and <strong>Devaki</strong>.</p>
              </div>

              <div class="bg-white p-4 rounded-lg">
                <h4 class="font-semibold mb-2">Raised in Gokul</h4>
                <p>He was brought up in <strong>Gokul</strong> by his foster parents, <strong>Nanda</strong> and <strong>Yashoda</strong>.</p>
              </div>
            </div>
          </div>

          <h3>Life in Gokula - Universal Love</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4 font-medium">Everyone in Gokula loved him with all their hearts:</p>

            <div class="space-y-3">
              <div class="bg-white p-3 rounded-lg border-l-4 border-indian-saffron">
                <strong>The Women:</strong> Fed him with curd and butter
              </div>
              <div class="bg-white p-3 rounded-lg border-l-4 border-spiritual-300">
                <strong>The Children:</strong> The girls and boys of Gokula played and sang and danced with him
              </div>
              <div class="bg-white p-3 rounded-lg border-l-4 border-green-300">
                <strong>The Cows:</strong> The cows of Gokula loved him
              </div>
              <div class="bg-white p-3 rounded-lg border-l-4 border-purple-300">
                <strong>The Gopis:</strong> The gopis of Gokula used to dance with him
              </div>
            </div>
          </div>

          <h3>The Divine Flute Player</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <div class="bg-white p-4 rounded-lg text-center">
              <h4 class="font-semibold mb-3">The Enchanting Music</h4>
              <p class="italic text-lg mb-3">"Krishna played sweetly on his flute."</p>
              <p class="font-medium">Whoever heard him play the flute was utterly charmed.</p>
            </div>
          </div>

          <h3>The Protector and Helper</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <div class="space-y-4">
              <div class="bg-white p-4 rounded-lg">
                <h4 class="font-semibold mb-2">Destroyer of Evil</h4>
                <p>Sri Krishna killed a number of demons and saved many people.</p>
              </div>

              <div class="bg-white p-4 rounded-lg">
                <h4 class="font-semibold mb-2">Friend of the Pandavas</h4>
                <p class="mb-2">The Pandavas were his cousins and <strong>Arjuna</strong>, one of the Pandavas, was his beloved friend.</p>
                <p>He advised and helped the Pandavas whenever they were in trouble.</p>
              </div>
            </div>
          </div>

          <h3>The Mahabharata War and Divine Service</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <div class="bg-white p-4 rounded-lg mb-4">
              <h4 class="font-semibold mb-2">The Divine Charioteer</h4>
              <p>During the great Mahabharata War between the Pandavas and the Kauravas, Sri Krishna drove his cousin Arjuna's chariot.</p>
            </div>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Divine Humility</h4>
              <p class="mb-3">Sri Krishna, who is the <strong>Lord of the Universe</strong>, behaved like an ordinary man just to please His devotees.</p>
              <p class="font-medium italic">If we sincerely love the Lord, He will help us too.</p>
            </div>
          </div>

          <h3>The Bhagavad Gita - Eternal Teachings</h3>
          <div class="bg-gradient-to-br from-indian-cream to-white p-4 rounded-lg border border-indian-saffron mt-6">
            <div class="space-y-4">
              <div class="bg-white p-4 rounded-lg">
                <h4 class="font-semibold mb-2">Teaching Arjuna</h4>
                <p>When Arjuna was deeply troubled, the Lord taught him how to do his duty. These teachings are known as the <strong>Bhagavad Gita</strong>.</p>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-spiritual-300">
                <h4 class="font-semibold mb-2">The Sacred Dialogue</h4>
                <p>The Bhagavad Gita is a discussion between Lord Krishna and Arjuna and is the <strong>most popular and well-read religious book of the Hindus</strong>.</p>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-indian-saffron">
                <h4 class="font-semibold mb-2">World-Famous Wisdom</h4>
                <p>Sri Krishna's teachings are world famous.</p>
              </div>
            </div>
          </div>

          <h3>The Great Epic - Mahabharata</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Written by Rishi Vedavyasa</h4>
              <p class="mb-3">Rishi Vedavyasa tells us the story of the Pandavas and Kauravas in the <strong>Mahabharata</strong>.</p>
              <p class="mb-3">Like the Ramayana, the Mahabharata is one of the great epics of ancient India.</p>
              <p class="font-medium">It is the <strong>longest poem ever written</strong>.</p>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg text-center">
            <h4 class="font-semibold text-lg mb-2">The Eternal Message</h4>
            <p>Lord Krishna's life teaches us about divine love, duty, friendship, and service. His teachings in the Bhagavad Gita continue to guide millions of people around the world in leading righteous and meaningful lives.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'Where was Lord Krishna born?',
              answers: [
                'Gokul',
                'Mathura',
                'Vrindavan',
                'Ayodhya'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who were Krishna\'s birth parents?',
              answers: [
                'Nanda and Yashoda',
                'Vasudeva and Devaki',
                'Dasaratha and Kausalya',
                'Parasara and Matsya-gandhi'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who were Krishna\'s foster parents?',
              answers: [
                'Vasudeva and Devaki',
                'Nanda and Yashoda',
                'Rama and Sita',
                'Arjuna and Subhadra'
              ],
              correctAnswer: 1
            },
            {
              question: 'What adorned Krishna\'s hair?',
              answers: [
                'A crown',
                'Flowers',
                'A peacock feather',
                'Jewels'
              ],
              correctAnswer: 2
            },
            {
              question: 'What instrument did Krishna play sweetly?',
              answers: [
                'Drums',
                'Flute',
                'Veena',
                'Tabla'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who was Krishna\'s beloved friend among the Pandavas?',
              answers: [
                'Yudhishthira',
                'Bhima',
                'Arjuna',
                'Nakula'
              ],
              correctAnswer: 2
            },
            {
              question: 'What role did Krishna play during the Mahabharata War?',
              answers: [
                'He fought as a warrior',
                'He drove Arjuna\'s chariot',
                'He was a spectator',
                'He mediated between armies'
              ],
              correctAnswer: 1
            },
            {
              question: 'What are Krishna\'s teachings to Arjuna called?',
              answers: [
                'Ramayana',
                'Mahabharata',
                'Bhagavad Gita',
                'Upanishads'
              ],
              correctAnswer: 2
            },
            {
              question: 'Who wrote the Mahabharata?',
              answers: [
                'Sage Valmiki',
                'Sage Vedavyasa',
                'Sage Narada',
                'Lord Krishna'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is the Mahabharata known as?',
              answers: [
                'The shortest poem',
                'The longest poem ever written',
                'A collection of songs',
                'A book of prayers'
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: 'trimurti-concept',
        title: 'The Trimurti Concept',
        description: 'Explore the trinity of Brahma, Vishnu, and Shiva',
        videoUrl: 'https://www.youtube.com/embed/8F9NtIFoQmk',
        content: `
          <h2>The Hindu Trinity: Trimurti</h2>
          <p>The Trimurti, or "three forms," represents the cosmic functions of creation, preservation, and destruction in Hindu philosophy. This concept unifies three of the main deities in Hinduism: Brahma (the creator), Vishnu (the preserver), and Shiva (the destroyer).</p>

          <h3>Brahma: The Creator</h3>
          <p>Brahma is depicted with four heads, representing the four Vedas, and four arms. He is often shown sitting on a lotus that emerges from the navel of Vishnu. Despite his important role as the creator of the universe, Brahma is not widely worshipped in modern Hinduism, with only a handful of temples dedicated solely to him.</p>

          <h3>Vishnu: The Preserver</h3>
          <p>Vishnu is responsible for maintaining cosmic order and dharma. He is shown with four arms holding a conch (symbolizing the primeval sound), a chakra (the wheel of time), a lotus (representing purity and creation), and a mace (embodying mental and physical strength). Vishnu is known for his ten avatars (incarnations), including Rama and Krishna, who descend to Earth in times of great disorder.</p>

          <h3>Shiva: The Destroyer</h3>
          <p>Shiva's role as the destroyer is often misunderstood—he destroys not out of malice but to make way for new creation and positive transformation. He is typically depicted with a third eye (representing wisdom), a crescent moon (showing his control over time), the Ganges river flowing from his hair (symbolizing purification), and a snake around his neck (representing kundalini energy).</p>

          <h3>Unity in Trinity</h3>
          <p>The Trimurti represents the cyclical nature of the universe—creation leads to maintenance, which eventually leads to dissolution, followed by new creation. This eternal cycle reflects the Hindu understanding of time as cyclical rather than linear.</p>

          <p>While the Trimurti concept emphasizes the complementary functions of these deities, devotees often focus their worship on one aspect or form of the divine according to their personal preferences and traditions.</p>
        `,
        quiz: {
          questions: [
            {
              question: 'Which deity is known as the creator in the Trimurti?',
              answers: [
                'Vishnu',
                'Shiva',
                'Brahma',
                'Indra'
              ],
              correctAnswer: 2
            },
            {
              question: 'Which deity is associated with preservation?',
              answers: [
                'Brahma',
                'Vishnu',
                'Shiva',
                'Ganesha'
              ],
              correctAnswer: 1
            },
            {
              question: 'What does "Trimurti" literally mean?',
              answers: [
                'Three gods',
                'Three forms',
                'Three powers',
                'Three worlds'
              ],
              correctAnswer: 1
            },
            {
              question: 'How many heads does Brahma typically have?',
              answers: [
                'Two',
                'Three',
                'Four',
                'Five'
              ],
              correctAnswer: 2
            },
            {
              question: 'What do Brahma\'s four heads represent?',
              answers: [
                'Four directions',
                'Four seasons',
                'Four Vedas',
                'Four ages'
              ],
              correctAnswer: 2
            },
            {
              question: 'How many avatars is Vishnu known for?',
              answers: [
                'Five',
                'Eight',
                'Ten',
                'Twelve'
              ],
              correctAnswer: 2
            },
            {
              question: 'Which of these is NOT mentioned as Vishnu\'s avatar?',
              answers: [
                'Rama',
                'Krishna',
                'Ganesha',
                'Both Rama and Krishna are avatars'
              ],
              correctAnswer: 2
            },
            {
              question: 'What is Shiva\'s role in the Trimurti?',
              answers: [
                'Creator',
                'Preserver',
                'Destroyer/Transformer',
                'Teacher'
              ],
              correctAnswer: 2
            },
            {
              question: 'What does Shiva\'s destruction represent?',
              answers: [
                'Evil and negativity',
                'End of the world',
                'Necessary transformation and renewal',
                'Punishment'
              ],
              correctAnswer: 2
            },
            {
              question: 'What does the Trimurti concept teach about the universe?',
              answers: [
                'It is permanent',
                'It follows a cyclical pattern of creation, preservation, and destruction',
                'It is chaotic',
                'It has no order'
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: 'thiru-valluvar',
        title: 'Thiru-Valluvar',
        description: 'Learn about the great saint and poet who wrote the Thirukkural',
        content: `
          <h2>Thiru-Valluvar</h2>
          <p>Thiru-Valluvar was a great saint of India. He lived long, long ago in the city of Chennai. He was a poor weaver, but his spiritual greatness made him one of the most revered figures in Tamil literature and Hindu philosophy.</p>

          <h3>The Story of Vasuki's Devotion</h3>
          <p>Vasuki, Thiru-Valluvar's wife, was very dutiful and obedient to her husband. She treated him as God, recognizing his spiritual greatness.</p>

          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 my-4">
            <h4 class="font-semibold mb-2">The Miracle at the Well</h4>
            <p>One day Vasuki was drawing water from a well when Thiru-Valluvar called her. She immediately left the rope and bucket hanging halfway down the well and hurried to her husband. Lo! The rope and bucket hung in mid-air! After serving her husband, Vasuki returned to the well and drew up the bucket.</p>
          </div>

          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 my-4">
            <h4 class="font-semibold mb-2">The Hot Steam from Cold Rice</h4>
            <p>On another day, Thiru-Valluvar was eating cold rice. He said to Vasuki, 'Please fan it - it is too hot.' Vasuki fanned it, and hot steam came out of the cold rice! Wonders like this are only possible when we lead a pure and holy life and revere God.</p>
          </div>

          <h3>The Great Poet</h3>
          <p>Thiru-Valluvar was also a great poet. He wrote the famous book the <strong>Thirukkural</strong> in Tamil. The Thirukkural has been translated into many languages and contains many wise sayings. People all over the world read this book.</p>

          <h3>Teachings of Thiru-Valluvar</h3>
          <p class="mb-4">Here are some simplified teachings from the Thirukkural:</p>

          <div class="space-y-4">
            <div class="bg-indian-cream p-3 rounded-lg">
              <strong>1. Good Behavior:</strong> The person whose behavior is good is praised by all. Good behavior is very important.
            </div>

            <div class="bg-indian-cream p-3 rounded-lg">
              <strong>2. Wise Words:</strong> There are good berries and poisonous berries. Intelligent people only select the good berries to eat. Likewise, there are good words and bad words. Intelligent people use only the good words. It is foolish to use bad words.
            </div>

            <div class="bg-indian-cream p-3 rounded-lg">
              <strong>3. Against Greed:</strong> Greed and robbery lead to endless suffering.
            </div>

            <div class="bg-indian-cream p-3 rounded-lg">
              <strong>4. Control Anger:</strong> Anger is bad. It takes away the beautiful smile and happiness from our faces.
            </div>

            <div class="bg-indian-cream p-3 rounded-lg">
              <strong>5. Prayer and Peace:</strong> Unhappiness vanishes when one prays regularly to God.
            </div>
          </div>

          <div class="mt-6 p-4 bg-spiritual-50 rounded-lg">
            <h4 class="font-semibold mb-2">Legacy</h4>
            <p>Thiru-Valluvar's teachings continue to inspire people around the world. His emphasis on good conduct, wise speech, and spiritual devotion remains as relevant today as it was centuries ago.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'What was Thiru-Valluvar\'s profession?',
              answers: [
                'King',
                'Priest',
                'Weaver',
                'Merchant'
              ],
              correctAnswer: 2
            },
            {
              question: 'What is the name of the famous book written by Thiru-Valluvar?',
              answers: [
                'Thirukkural',
                'Ramayana',
                'Mahabharata',
                'Bhagavad Gita'
              ],
              correctAnswer: 0
            },
            {
              question: 'According to Thiru-Valluvar, what happens when one prays regularly to God?',
              answers: [
                'Wealth increases',
                'Unhappiness vanishes',
                'Fame comes',
                'Power grows'
              ],
              correctAnswer: 1
            },
            {
              question: 'What does Thiru-Valluvar say about anger?',
              answers: [
                'It gives strength',
                'It is necessary',
                'It takes away smile and happiness',
                'It helps in decision making'
              ],
              correctAnswer: 2
            },
            {
              question: 'Where did Thiru-Valluvar live?',
              answers: [
                'Mumbai',
                'Delhi',
                'Chennai',
                'Kolkata'
              ],
              correctAnswer: 2
            },
            {
              question: 'What was the name of Thiru-Valluvar\'s wife?',
              answers: [
                'Vasuki',
                'Lakshmi',
                'Saraswati',
                'Parvati'
              ],
              correctAnswer: 0
            },
            {
              question: 'How did Vasuki treat her husband?',
              answers: [
                'As an ordinary person',
                'As God',
                'As a friend',
                'As a teacher'
              ],
              correctAnswer: 1
            },
            {
              question: 'What miracle happened at the well?',
              answers: [
                'Water turned to gold',
                'The rope and bucket hung in mid-air',
                'The well became deeper',
                'Fish appeared in the water'
              ],
              correctAnswer: 1
            },
            {
              question: 'What happened when Vasuki fanned the cold rice?',
              answers: [
                'It became colder',
                'It disappeared',
                'Hot steam came out',
                'It turned into flowers'
              ],
              correctAnswer: 2
            },
            {
              question: 'According to Thiru-Valluvar, what should intelligent people choose?',
              answers: [
                'Only expensive things',
                'Good words, like choosing good berries',
                'Whatever is popular',
                'Only what others choose'
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: 'valmiki-sage',
        title: 'Valmiki - From Robber to Great Sage',
        description: 'Learn about the transformation of the robber Ratnakar into the great sage Valmiki',
        content: `
          <h2>Valmiki - From Robber to Great Sage</h2>
          <p>This is the inspiring story of how a wicked robber transformed into one of the greatest sages in Hindu tradition through the power of God's name.</p>

          <h3>Ratnakar the Robber</h3>
          <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-300 mt-6">
            <p class="mb-4">A long time ago a robber called Ratnakar used to stop travellers in a forest. He killed them if they did not stop and give him all they had.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2 text-red-700">His Wicked Ways</h4>
              <ul class="space-y-2 text-red-700">
                <li class="flex items-start">
                  <span class="mr-2">•</span>
                  <span>Stopped travelers in the forest</span>
                </li>
                <li class="flex items-start">
                  <span class="mr-2">•</span>
                  <span>Demanded all their possessions</span>
                </li>
                <li class="flex items-start">
                  <span class="mr-2">•</span>
                  <span>Killed those who refused</span>
                </li>
                <li class="flex items-start">
                  <span class="mr-2">•</span>
                  <span>Used the stolen money to feed his family</span>
                </li>
              </ul>
            </div>
          </div>

          <h3>The Meeting with Sage Narada</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">One day the great Rishi Narada passed through the forest. The robber stopped him and said:</p>

            <div class="bg-white p-4 rounded-lg mb-4">
              <p class="italic mb-2">"Give me everything you have - even your clothes."</p>
              <p class="text-sm text-gray-600">- Ratnakar to Sage Narada</p>
            </div>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Wise Question</h4>
              <p class="mb-3">Narada replied: "I shall give them to you, but what will you do with them?"</p>
              <p class="mb-3">Ratnakar answered: "I shall sell them. With the money I will feed my family."</p>
              <p class="font-medium">Then the Rishi asked the life-changing question: "Will your family share the punishment from God for your wicked deeds? Go and ask them."</p>
            </div>
          </div>

          <h3>The Painful Truth</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <p class="mb-4">The robber went and asked his family if they would share the punishment for his evil deeds.</p>

            <div class="bg-white p-4 rounded-lg border-l-4 border-red-300">
              <h4 class="font-semibold mb-2">Family's Response</h4>
              <p class="mb-3">All the members said, <strong>"No"</strong>.</p>
              <p>He came back feeling sad. He knew that he alone would have to suffer the punishment for his bad actions.</p>
            </div>

            <div class="bg-white p-4 rounded-lg mt-4">
              <p class="italic">"Sir, they do not want to share the punishment. Don't you think your work is in vain?"</p>
              <p class="mt-2">Ratnakar asked, "What shall I do?"</p>
            </div>
          </div>

          <h3>The Path to Redemption</h3>
          <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-300 mt-6">
            <div class="bg-white p-4 rounded-lg mb-4">
              <h4 class="font-semibold mb-2 text-green-700">Sage Narada's Advice</h4>
              <p class="italic mb-2">"Give up your evil ways and worship God. Only He can help you."</p>
              <p class="italic">"Pray to Rama. Say RAMA, RAMA, RAMA all the time."</p>
            </div>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Sincere Attempt</h4>
              <p class="mb-3">The robber knew that he had been doing evil deeds. He wanted to change his life. He followed the advice of the Rishi, but he could not say the word RAMA correctly.</p>
              <p class="font-medium">He kept on saying <strong>'MARA, MARA, MARA'</strong> all the hours of the day and night for years and years.</p>
            </div>
          </div>

          <h3>The Great Transformation</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <div class="space-y-4">
              <div class="bg-white p-4 rounded-lg border-l-4 border-indian-saffron">
                <h4 class="font-semibold mb-2">Years of Devotion</h4>
                <p>He sat in one position for a long time until a huge ant-hill grew up around him.</p>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-spiritual-300">
                <h4 class="font-semibold mb-2">The New Name</h4>
                <p class="mb-2"><strong>'Valmika'</strong> in Sanskrit means ant-hill. Ratnakar then became known as <strong>Valmiki</strong>.</p>
                <p>Even though the robber started saying God's name the wrong way, slowly it changed from 'Mara' into 'Rama' by itself.</p>
              </div>

              <div class="bg-gradient-to-br from-indian-cream to-white p-4 rounded-lg border border-indian-saffron">
                <h4 class="font-semibold mb-2">Divine Recognition</h4>
                <p class="italic mb-3">"I am pleased with your prayer. You are now a great Rishi. You must write the story of Sri Rama."</p>
                <p class="text-right text-sm">- God's words to Valmiki</p>
                <p class="mt-4 font-medium text-center">It is Valmiki who first wrote the Ramayana.</p>
              </div>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg text-center">
            <h4 class="font-semibold text-lg mb-2">The Power of Transformation</h4>
            <p>This story shows that no matter how sinful a person may be, sincere devotion and the repetition of God's name can transform them completely. Even saying God's name incorrectly, if done with a pure heart, can lead to salvation.</p>
          </div>

          <div class="mt-6 p-4 bg-spiritual-50 rounded-lg">
            <h4 class="font-semibold mb-2">Meaning</h4>
            <p><strong>Rishi:</strong> A holy man.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'What was the robber\'s original name?',
              answers: [
                'Valmiki',
                'Ratnakar',
                'Narada',
                'Rama'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did Ratnakar do to travelers in the forest?',
              answers: [
                'Helped them find their way',
                'Gave them food',
                'Stopped them and demanded their possessions',
                'Ignored them'
              ],
              correctAnswer: 2
            },
            {
              question: 'Which great sage met Ratnakar in the forest?',
              answers: [
                'Sage Valmiki',
                'Sage Narada',
                'Sage Vyasa',
                'Sage Vishwamitra'
              ],
              correctAnswer: 1
            },
            {
              question: 'Why did Ratnakar rob people?',
              answers: [
                'For fun',
                'To feed his family',
                'To become rich',
                'To buy clothes'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did Sage Narada ask Ratnakar to find out from his family?',
              answers: [
                'If they loved him',
                'If they would share the punishment for his wicked deeds',
                'If they needed more money',
                'If they wanted him to continue robbing'
              ],
              correctAnswer: 1
            },
            {
              question: 'What was his family\'s response about sharing the punishment?',
              answers: [
                'Yes, they would share it',
                'No, they would not share it',
                'They didn\'t understand the question',
                'They asked for more time to think'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did Sage Narada advise Ratnakar to do?',
              answers: [
                'Continue robbing',
                'Leave his family',
                'Give up evil ways and worship God by saying RAMA',
                'Become a king'
              ],
              correctAnswer: 2
            },
            {
              question: 'What did Ratnakar say instead of "RAMA"?',
              answers: [
                'MARA',
                'KAMA',
                'NAMA',
                'SAMA'
              ],
              correctAnswer: 0
            },
            {
              question: 'What does "Valmika" mean in Sanskrit?',
              answers: [
                'Holy man',
                'Ant-hill',
                'Forest',
                'Prayer'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did God ask Valmiki to write?',
              answers: [
                'The Mahabharata',
                'The Bhagavad Gita',
                'The story of Sri Rama (Ramayana)',
                'The Vedas'
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      {
        id: 'vedavyasa-sage',
        title: 'Vedavyasa - The Great Compiler',
        description: 'Learn about the great sage who organized the Vedas and wrote the Mahabharata',
        content: `
          <h2>Vedavyasa - The Great Compiler</h2>
          <p>This is the story of one of the greatest sages in Hindu tradition, who organized our most sacred scriptures and wrote the longest epic poem in ancient times.</p>

          <h3>Sage Parasara and the River Crossing</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Parasara was a great rishi of India. One day he had to cross the Yamuna river. The river was in flood.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Meeting at the River Bank</h4>
              <p class="mb-3">He saw a fisherman on the river bank. He asked him:</p>
              <div class="bg-indian-cream p-3 rounded-lg mb-3">
                <p class="italic">"Will you please row me across in your boat?"</p>
                <p class="text-sm text-gray-600">- Sage Parasara</p>
              </div>
              <div class="bg-indian-cream p-3 rounded-lg">
                <p class="italic">"Yes, I will help you."</p>
                <p class="text-sm text-gray-600">- The fisherman</p>
              </div>
            </div>
          </div>

          <h3>Matsya-gandhi, the Fisherman's Daughter</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <div class="bg-white p-4 rounded-lg mb-4">
              <h4 class="font-semibold mb-2">The Father's Request</h4>
              <p>The fisherman called his daughter and said:</p>
              <div class="bg-spiritual-50 p-3 rounded-lg mt-2">
                <p class="italic">"Matsya-gandhi my child, row this Rishi safely across the river."</p>
              </div>
            </div>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Proposal</h4>
              <p class="mb-3">The rishi went with Matsya-gandhi. He liked her and asked:</p>
              <div class="bg-spiritual-50 p-3 rounded-lg mb-3">
                <p class="italic">"Will you marry me?"</p>
                <p class="text-sm text-gray-600">- Sage Parasara</p>
              </div>
              <div class="bg-spiritual-50 p-3 rounded-lg">
                <p class="italic">"I will."</p>
                <p class="text-sm text-gray-600">- Matsya-gandhi</p>
              </div>
              <p class="mt-3 font-medium">And Parasara married her.</p>
            </div>
          </div>

          <h3>The Birth of Dwaipayana</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Born on an Island</h4>
              <p class="mb-3">Later a son was born to them on a <strong>dwipa</strong> or island.</p>
              <p class="font-medium">So they called the child <strong>Dwaipayana</strong>.</p>
              <div class="mt-4 p-3 bg-indian-cream rounded-lg">
                <p class="text-sm"><strong>Name Meaning:</strong> Dwaipayana = "Born on an island" (dwipa = island)</p>
              </div>
            </div>
          </div>

          <h3>The Great Scholar and Writer</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <p class="mb-4 font-medium">Dwaipayana grew up to be a very learned rishi. His contributions to Hindu literature are immense:</p>

            <div class="space-y-4">
              <div class="bg-white p-4 rounded-lg border-l-4 border-spiritual-300">
                <h4 class="font-semibold mb-2">The Eighteen Puranas</h4>
                <p>He wrote eighteen Puranas, ancient stories of gods and heroes, in verse.</p>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-indian-saffron">
                <h4 class="font-semibold mb-2">The Mahabharata</h4>
                <p>He also wrote the Mahabharata, which is <strong>the longest poem written in ancient times</strong>.</p>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-green-300">
                <h4 class="font-semibold mb-2">Organizing the Vedas</h4>
                <p>Dwaipayana is also known to us as <strong>Vedavyasa</strong>. He collected all the Vedas into four books.</p>
                <div class="mt-3 p-3 bg-green-50 rounded-lg">
                  <p class="text-sm">The Vedas are great scriptures which teach us how to lead a good life.</p>
                </div>
              </div>
            </div>
          </div>

          <h3>Vedavyasa - The Name and Its Meaning</h3>
          <div class="bg-gradient-to-br from-indian-cream to-white p-4 rounded-lg border border-indian-saffron mt-6">
            <h4 class="font-semibold mb-3">Why Called Vedavyasa?</h4>
            <p class="mb-3">Dwaipayana became known as <strong>Vedavyasa</strong> because he organized and compiled the Vedas.</p>
            <div class="bg-white p-4 rounded-lg">
              <p><strong>Veda</strong> = Sacred knowledge/scriptures</p>
              <p><strong>Vyasa</strong> = Compiler/Organizer</p>
              <p class="mt-2 font-medium">Vedavyasa = "The one who compiled the Vedas"</p>
            </div>
          </div>

          <h3>Guru Purnima - Honoring the Great Teacher</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">We worship Rishi Vedavyasa every year on the <strong>Guru-purnima day</strong>.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Why We Remember Great Souls</h4>
              <p class="mb-3">It is good to remember and respect great men and women.</p>
              <p class="font-medium">Through their examples we learn how to lead a pure and holy life which will lead us towards God.</p>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg text-center">
            <h4 class="font-semibold text-lg mb-2">The Legacy of Vedavyasa</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div class="bg-white p-3 rounded-lg">
                <strong>Organized Vedas</strong><br/>
                <span class="text-sm">Into four books</span>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <strong>Wrote Mahabharata</strong><br/>
                <span class="text-sm">Longest ancient poem</span>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <strong>Composed Puranas</strong><br/>
                <span class="text-sm">Eighteen sacred texts</span>
              </div>
            </div>
          </div>

          <div class="mt-6 p-4 bg-spiritual-50 rounded-lg">
            <h4 class="font-semibold mb-2">Meaning</h4>
            <p><strong>Guru-purnima day:</strong> A day when we worship our spiritual teacher.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'What was the name of Dwaipayana\'s father?',
              answers: [
                'Vedavyasa',
                'Parasara',
                'Matsya-gandhi',
                'Narada'
              ],
              correctAnswer: 1
            },
            {
              question: 'Which river did Sage Parasara need to cross?',
              answers: [
                'Ganga',
                'Yamuna',
                'Saraswati',
                'Narmada'
              ],
              correctAnswer: 1
            },
            {
              question: 'What was the name of the fisherman\'s daughter?',
              answers: [
                'Satyavati',
                'Matsya-gandhi',
                'Ganga',
                'Yamuna'
              ],
              correctAnswer: 1
            },
            {
              question: 'Why was the child named Dwaipayana?',
              answers: [
                'Because he was very wise',
                'Because he was born on an island (dwipa)',
                'Because he loved water',
                'Because his father chose the name'
              ],
              correctAnswer: 1
            },
            {
              question: 'How many Puranas did Dwaipayana write?',
              answers: [
                'Sixteen',
                'Eighteen',
                'Twenty',
                'Twelve'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is the Mahabharata known as?',
              answers: [
                'The shortest poem',
                'The longest poem written in ancient times',
                'A collection of songs',
                'A book of prayers'
              ],
              correctAnswer: 1
            },
            {
              question: 'Why is Dwaipayana also called Vedavyasa?',
              answers: [
                'Because he was born on an island',
                'Because he collected all the Vedas into four books',
                'Because he was a fisherman',
                'Because he crossed the river'
              ],
              correctAnswer: 1
            },
            {
              question: 'Into how many books did Vedavyasa organize the Vedas?',
              answers: [
                'Three',
                'Four',
                'Five',
                'Six'
              ],
              correctAnswer: 1
            },
            {
              question: 'On which day do we worship Rishi Vedavyasa?',
              answers: [
                'Diwali',
                'Holi',
                'Guru-purnima day',
                'Dussehra'
              ],
              correctAnswer: 2
            },
            {
              question: 'What do the Vedas teach us?',
              answers: [
                'How to become rich',
                'How to lead a good life',
                'How to fight wars',
                'How to build houses'
              ],
              correctAnswer: 1
            }
          ]
        }
      }
    ]
  },
  {
    topicId: 'scriptures',
    topicName: 'Hindu Scriptures',
    lessons: [
      {
        id: 'bhagavad-gita-message',
        title: 'The Message of the Bhagavad Gita',
        description: 'Essential teachings from Lord Krishna in the Bhagavad Gita',
        content: `
          <h2>The Message of the Bhagavad Gita</h2>
          <p>In the Bhagavad Gita, Lord Krishna shares profound wisdom that guides us on the path of spiritual living. Here are four essential teachings:</p>

          <div class="space-y-6 mt-6">
            <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300">
              <h3 class="font-semibold text-lg mb-2">1. Faith in Your Chosen Form</h3>
              <p class="italic text-spiritual-700">"Whatever may be the form which each devotee wishes to worship - in that form alone do I make his faith grow."</p>
              <p class="mt-2">This teaches us that the Divine accepts all sincere forms of worship and strengthens our faith according to our individual spiritual inclinations.</p>
            </div>

            <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300">
              <h3 class="font-semibold text-lg mb-2">2. Offering All Actions</h3>
              <p class="italic text-spiritual-700">"Whatever you do, whatever you eat, whatever you offer, whatever you give as a gift, whatever hardship you undergo in prayer, do it as an offering unto Me."</p>
              <p class="mt-2">This verse teaches us to transform every action into a spiritual practice by offering it to the Divine with the right attitude.</p>
            </div>

            <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300">
              <h3 class="font-semibold text-lg mb-2">3. Simple Devotional Offerings</h3>
              <p class="italic text-spiritual-700">"Whomsoever offers Me with devotion a leaf, a flower, a fruit or a little water - I accept that offering of a pure heart."</p>
              <p class="mt-2">The Divine values the sincerity and purity of heart behind our offerings, not their material worth. Even the simplest offering made with love is precious.</p>
            </div>

            <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300">
              <h3 class="font-semibold text-lg mb-2">4. Divine Vision and Unity</h3>
              <p class="italic text-spiritual-700">"He who sees Me everywhere and sees everything in Me - I am never lost to him, and he is never lost to Me."</p>
              <p class="mt-2">This highest teaching speaks of the vision of unity where we recognize the Divine presence in all beings and all existence, establishing an eternal connection with the Divine.</p>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg">
            <h3 class="font-semibold text-lg mb-2">Practical Application</h3>
            <p>These teachings from the Bhagavad Gita show us how to live a spiritual life in the world - through devotion, selfless action, simple offerings, and cultivating divine vision in our daily lives.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'According to the Bhagavad Gita, what does the Divine accept from a devotee?',
              answers: [
                'Only expensive offerings',
                'A leaf, flower, fruit, or water offered with devotion',
                'Only formal prayers',
                'Only temple worship'
              ],
              correctAnswer: 1
            },
            {
              question: 'What should we do with all our actions according to Krishna\'s teaching?',
              answers: [
                'Do them for personal gain',
                'Avoid doing them',
                'Offer them to the Divine',
                'Do them carelessly'
              ],
              correctAnswer: 2
            },
            {
              question: 'What is most important in our offerings to the Divine?',
              answers: [
                'The monetary value',
                'The size of the offering',
                'The purity of heart and devotion',
                'The location where it\'s offered'
              ],
              correctAnswer: 2
            },
            {
              question: 'According to the first teaching, how does the Divine respond to different forms of worship?',
              answers: [
                'Only accepts one form',
                'Rejects most forms',
                'Makes faith grow in whatever form the devotee chooses',
                'Is indifferent to all forms'
              ],
              correctAnswer: 2
            },
            {
              question: 'What should we do with our eating, according to Krishna\'s teaching?',
              answers: [
                'Eat without thinking',
                'Offer it to the Divine',
                'Eat only expensive food',
                'Avoid eating'
              ],
              correctAnswer: 1
            },
            {
              question: 'What should we do with our hardships and prayers?',
              answers: [
                'Keep them to ourselves',
                'Complain about them',
                'Offer them to the Divine',
                'Avoid them completely'
              ],
              correctAnswer: 2
            },
            {
              question: 'What happens when we pray with the knowledge that God is present everywhere?',
              answers: [
                'Nothing changes',
                'Our prayers become more meaningful and God\'s grace flows',
                'We become confused',
                'We stop praying'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is the highest teaching about seeing the Divine?',
              answers: [
                'See God only in temples',
                'See God only in holy books',
                'See God everywhere and everything in God',
                'Never try to see God'
              ],
              correctAnswer: 2
            },
            {
              question: 'What is the result of seeing God everywhere?',
              answers: [
                'We become lost',
                'We are never lost to God, and God is never lost to us',
                'We become confused',
                'Nothing happens'
              ],
              correctAnswer: 1
            },
            {
              question: 'How many main teachings from the Bhagavad Gita are presented in this lesson?',
              answers: [
                'Two',
                'Three',
                'Four',
                'Five'
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      {
        id: 'ramayana-story',
        title: 'The Ramayana',
        description: 'Learn about the great epic story of Rama, Sita, and their adventures',
        content: `
          <h2>The Ramayana</h2>
          <p>The story of Rama, his brothers and Sita is found in the great book, the Ramayana. It is a long story written in beautiful language by Sage Valmiki. It is one of the most beautiful stories ever written. It is full of wisdom and truth.</p>

          <h3>King Dasaratha and His Queens</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Dasaratha was the king of Kosala. Ayodhya, a big city, was its capital. King Dasaratha had three queens: Kausalya, Sumitra and Kaikeyi. For a long time they had no children.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Special Yajna</h4>
              <p>Dasaratha did a special hawan (yajna) in which he asked God to bless him with children. Agnideva, the god of fire, appeared. He gave the king a golden pot filled with payasam.</p>
              <div class="mt-3 p-3 bg-indian-cream rounded-lg">
                <p class="italic">"Give this payasam to your queens, and they will get children,"</p>
                <p class="text-right text-sm">- Agnideva</p>
              </div>
              <p class="mt-3">The king gave the payasam to his queens. They drank it.</p>
            </div>
          </div>

          <h3>The Four Princes</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <p class="mb-4">Much later, four sons were born to them:</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div class="bg-white p-3 rounded-lg">
                <strong>Rama</strong> - Born to Queen Kausalya<br/>
                <span class="text-sm">The first son and heir</span>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <strong>Bharata</strong> - Born to Queen Kaikeyi<br/>
                <span class="text-sm">Devoted brother</span>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <strong>Lakshmana</strong> - Born to Queen Sumitra<br/>
                <span class="text-sm">Rama's loyal companion</span>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <strong>Shatrughna</strong> - Born to Queen Sumitra<br/>
                <span class="text-sm">Twin brother of Lakshmana</span>
              </div>
            </div>
          </div>

          <h3>Rama's Noble Character</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Rama was the first son of king Dasaratha and possessed many admirable qualities:</p>
            <ul class="space-y-2">
              <li class="flex items-start">
                <span class="text-spiritual-500 mr-2">•</span>
                <span><strong>Truthful:</strong> Rama always spoke the truth</span>
              </li>
              <li class="flex items-start">
                <span class="text-spiritual-500 mr-2">•</span>
                <span><strong>Brave:</strong> He showed courage in all situations</span>
              </li>
              <li class="flex items-start">
                <span class="text-spiritual-500 mr-2">•</span>
                <span><strong>Gentle:</strong> He was kind and compassionate</span>
              </li>
              <li class="flex items-start">
                <span class="text-spiritual-500 mr-2">•</span>
                <span><strong>Good:</strong> He always chose the right path</span>
              </li>
              <li class="flex items-start">
                <span class="text-spiritual-500 mr-2">•</span>
                <span><strong>Obedient:</strong> He always obeyed his parents and Guru (teacher)</span>
              </li>
            </ul>
            <p class="mt-4 font-medium">He was greatly admired and loved by all.</p>
          </div>

          <h3>Sita - The Ideal Woman</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <p class="mb-4">When Rama grew up he married Sita. Many look upon Sita as an ideal woman.</p>
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Sita's Qualities</h4>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>She was beautiful and good</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>She dutifully served Rama and all her elders</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>She was loved by all</span>
                </li>
              </ul>
            </div>
          </div>

          <h3>The Forest Years and Adventures</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Rama and his brothers were very fond of one another. Rama, Sita and Lakshmana spent fourteen years in the forest.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Their Noble Mission</h4>
              <p class="mb-3">Rama and Lakshmana killed many demons and rakshasas who were troubling good people.</p>
              <p><strong>Hanuman</strong> was one of Rama's beloved friends who helped them greatly.</p>
            </div>
          </div>

          <h3>The Great Epic</h3>
          <div class="bg-gradient-to-br from-indian-cream to-white p-4 rounded-lg border border-indian-saffron mt-6">
            <p class="mb-4">The Ramayana was written by the great Sage Valmiki in beautiful language. It is one of the most beautiful stories ever written, full of wisdom and truth.</p>
            <p class="font-medium text-center">Everyone must read the Ramayana and try to be like Rama or Sita.</p>
          </div>

          <div class="mt-6 p-4 bg-spiritual-50 rounded-lg">
            <h4 class="font-semibold mb-2">Meaning</h4>
            <p><strong>Payasam:</strong> Rice boiled in milk. It is a thick, sweet preparation for offering to God.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'Who was the king of Kosala?',
              answers: [
                'Rama',
                'Dasaratha',
                'Bharata',
                'Lakshmana'
              ],
              correctAnswer: 1
            },
            {
              question: 'What was the capital city of Kosala?',
              answers: [
                'Delhi',
                'Mumbai',
                'Ayodhya',
                'Kolkata'
              ],
              correctAnswer: 2
            },
            {
              question: 'How many queens did King Dasaratha have?',
              answers: [
                'Two',
                'Three',
                'Four',
                'Five'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who appeared when Dasaratha performed the special yajna?',
              answers: [
                'Vishnu',
                'Shiva',
                'Agnideva (god of fire)',
                'Brahma'
              ],
              correctAnswer: 2
            },
            {
              question: 'What did Agnideva give to the king?',
              answers: [
                'A silver pot with water',
                'A golden pot filled with payasam',
                'A book',
                'A sword'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who was Rama\'s mother?',
              answers: [
                'Kaikeyi',
                'Sumitra',
                'Kausalya',
                'Sita'
              ],
              correctAnswer: 2
            },
            {
              question: 'Which of these was NOT one of Rama\'s qualities?',
              answers: [
                'Always spoke the truth',
                'Was brave and gentle',
                'Always obeyed parents and guru',
                'Was selfish and proud'
              ],
              correctAnswer: 3
            },
            {
              question: 'How many years did Rama, Sita, and Lakshmana spend in the forest?',
              answers: [
                'Ten years',
                'Twelve years',
                'Fourteen years',
                'Sixteen years'
              ],
              correctAnswer: 2
            },
            {
              question: 'Who was one of Rama\'s beloved friends?',
              answers: [
                'Hanuman',
                'Ravana',
                'Dasaratha',
                'Agnideva'
              ],
              correctAnswer: 0
            },
            {
              question: 'Who wrote the Ramayana?',
              answers: [
                'Sage Vyasa',
                'Sage Valmiki',
                'Sage Narada',
                'Sage Vishwamitra'
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: 'upanishads',
        title: 'The Upanishads',
        description: 'Learn about the profound spiritual teachings found in the concluding parts of the Vedas',
        content: `
          <h2>The Upanishads</h2>
          <p>The Upanishads contain the highest spiritual wisdom of Hinduism and form the foundation of Vedantic philosophy.</p>

          <h3>What Are the Upanishads?</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <div class="bg-white p-4 rounded-lg mb-4">
              <h4 class="font-semibold mb-2">Position in the Vedas</h4>
              <p class="mb-3">The earlier parts of the Veda deal with rituals and prayers.</p>
              <p class="font-medium">The concluding parts of the Veda are called the <strong>Upanishads</strong>.</p>
            </div>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Term "Vedanta"</h4>
              <p class="mb-3">As they come at the end of the Veda, the teachings that are based on them are called <strong>Vedanta</strong>.</p>
              <div class="bg-indian-cream p-3 rounded-lg">
                <p><strong>Veda</strong> = Sacred knowledge</p>
                <p><strong>Anta</strong> = End/conclusion</p>
                <p class="font-medium">Vedanta = "The end/conclusion of the Vedas"</p>
              </div>
            </div>
          </div>

          <h3>The Meaning of "Upanishad"</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Etymology and Significance</h4>
              <p class="mb-3">The word <strong>Upanishad</strong> means <strong>'sitting close'</strong> to a great spiritual teacher.</p>

              <div class="bg-spiritual-50 p-4 rounded-lg mt-4">
                <h5 class="font-semibold mb-2">The Traditional Learning Method</h5>
                <p class="mb-2">The teacher imparts spiritual wisdom to his pupils who sit close to receive the sacred knowledge.</p>
                <p class="italic text-sm">This intimate setting ensures the proper transmission of profound spiritual truths.</p>
              </div>
            </div>
          </div>

          <h3>Foundation of Hinduism</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="text-center font-medium text-lg mb-4">These lessons form the foundation of Hinduism.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Number of Upanishads</h4>
              <p class="mb-3">There are many Upanishads, but <strong>ten are commonly studied</strong>.</p>
              <div class="bg-indian-cream p-3 rounded-lg">
                <p class="text-sm">These ten principal Upanishads contain the core teachings that have guided spiritual seekers for thousands of years.</p>
              </div>
            </div>
          </div>

          <h3>The Four Great Teachings</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <p class="mb-6 font-medium text-center">The Upanishads teach us four fundamental truths:</p>

            <div class="space-y-4">
              <div class="bg-white p-4 rounded-lg border-l-4 border-spiritual-300">
                <h4 class="font-semibold mb-2">1. God Pervades the Universe</h4>
                <p>God pervades the whole universe.</p>
                <div class="mt-2 p-2 bg-spiritual-50 rounded">
                  <p class="text-sm italic">Nothing exists outside of God's presence - the entire cosmos is filled with divine consciousness.</p>
                </div>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-indian-saffron">
                <h4 class="font-semibold mb-2">2. God is Present in All Beings</h4>
                <p>God is therefore present in all beings.</p>
                <div class="mt-2 p-2 bg-indian-cream rounded">
                  <p class="text-sm italic">Every living creature contains the divine spark - God dwells within all forms of life.</p>
                </div>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-green-300">
                <h4 class="font-semibold mb-2">3. All Beings Are Essentially God</h4>
                <p>In essence or spirit all beings are therefore God.</p>
                <div class="mt-2 p-2 bg-green-50 rounded">
                  <p class="text-sm italic">At the deepest level of existence, there is no separation between individual souls and the Supreme Reality.</p>
                </div>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-purple-300">
                <h4 class="font-semibold mb-2">4. God's Divine Nature</h4>
                <p>God is consciousness, undying, eternal and all knowing. He is free from misery and death.</p>
                <div class="mt-2 p-2 bg-purple-50 rounded">
                  <p class="text-sm italic">The Supreme Reality transcends all limitations and possesses infinite knowledge, eternal existence, and perfect bliss.</p>
                </div>
              </div>
            </div>
          </div>

          <h3>The Highest Knowledge</h3>
          <div class="bg-gradient-to-br from-indian-cream to-white p-6 rounded-lg border border-indian-saffron mt-6">
            <div class="text-center">
              <h4 class="font-semibold text-xl mb-4">The Ultimate Wisdom</h4>
              <p class="text-lg font-medium mb-4">Knowing this is the highest knowledge.</p>
              <div class="bg-white p-4 rounded-lg">
                <p class="italic">Understanding these four truths about God's nature and our relationship with the Divine represents the pinnacle of spiritual wisdom and the goal of all Vedantic study.</p>
              </div>
            </div>
          </div>

          <div class="mt-8 p-4 bg-spiritual-50 rounded-lg border-l-4 border-spiritual-300">
            <h4 class="font-semibold mb-2">The Eternal Relevance</h4>
            <p>The teachings of the Upanishads remain as relevant today as they were thousands of years ago, offering profound insights into the nature of reality, consciousness, and our spiritual journey toward understanding our true divine nature.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'What do the earlier parts of the Veda deal with?',
              answers: [
                'Stories and legends',
                'Rituals and prayers',
                'Mathematics and science',
                'History and geography'
              ],
              correctAnswer: 1
            },
            {
              question: 'What are the concluding parts of the Veda called?',
              answers: [
                'Puranas',
                'Upanishads',
                'Sutras',
                'Mantras'
              ],
              correctAnswer: 1
            },
            {
              question: 'What does the word "Upanishad" mean?',
              answers: [
                'Sacred book',
                'Sitting close to a spiritual teacher',
                'Ancient wisdom',
                'Divine knowledge'
              ],
              correctAnswer: 1
            },
            {
              question: 'Why are the teachings based on Upanishads called "Vedanta"?',
              answers: [
                'Because they are very old',
                'Because they come at the end of the Veda',
                'Because they are difficult to understand',
                'Because they are written in Sanskrit'
              ],
              correctAnswer: 1
            },
            {
              question: 'How many Upanishads are commonly studied?',
              answers: [
                'Five',
                'Ten',
                'Fifteen',
                'Twenty'
              ],
              correctAnswer: 1
            },
            {
              question: 'According to the Upanishads, where does God pervade?',
              answers: [
                'Only in temples',
                'Only in holy books',
                'The whole universe',
                'Only in good people'
              ],
              correctAnswer: 2
            },
            {
              question: 'According to the Upanishads, where is God present?',
              answers: [
                'Only in heaven',
                'In all beings',
                'Only in priests',
                'Only in sacred places'
              ],
              correctAnswer: 1
            },
            {
              question: 'What are all beings in essence or spirit, according to the Upanishads?',
              answers: [
                'Different from God',
                'Separate from God',
                'God',
                'Inferior to God'
              ],
              correctAnswer: 2
            },
            {
              question: 'What qualities does God possess according to the Upanishads?',
              answers: [
                'Consciousness, undying, eternal and all knowing',
                'Only powerful',
                'Only loving',
                'Only creative'
              ],
              correctAnswer: 0
            },
            {
              question: 'What is considered the highest knowledge according to the Upanishads?',
              answers: [
                'Knowing how to perform rituals',
                'Knowing the four truths about God\'s nature',
                'Knowing many languages',
                'Knowing worldly sciences'
              ],
              correctAnswer: 1
            }
          ]
        }
      }
    ]
  },
  {
    topicId: 'practices',
    topicName: 'Hindu Practices',
    lessons: [
      {
        id: 'prayer',
        title: 'Prayer',
        description: 'Learn about the different ways to pray and connect with the Divine',
        content: `
          <h2>Prayer</h2>
          <p>Prayer is the remembrance of God, the Almighty Power behind all creation. Let us see how we can pray.</p>

          <h3>Three Types of Prayer</h3>

          <div class="space-y-6 mt-6">
            <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300">
              <h4 class="font-semibold text-lg mb-3">1. Traditional Forms of Prayer</h4>
              <p>One way is to remember Him as the traditional gods we are used to, such as Rama, Krishna, Shiva, Hanuman, and the Divine Mother. But we must understand that really they are different forms of the one God. We can ask them to bless us in whatever we do.</p>
            </div>

            <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300">
              <h4 class="font-semibold text-lg mb-3">2. Seeing God in Everything</h4>
              <p>Through prayer we can try to see God present in everything around us, for example, beauty, harmony, power, strength, knowledge and love. It is His power that makes the sun shine and the trees and plants grow. Seasons, day and night come and go at His command. Everything we see around us is only an outward expression of His divine power.</p>
              <p class="mt-2 font-medium">When we pray to God with this knowledge our prayers become more meaningful. Without asking for anything, God's grace will flow into us.</p>
            </div>

            <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300">
              <h4 class="font-semibold text-lg mb-3">3. Recognizing Oneness (Most Powerful Prayer)</h4>
              <p>A third type of prayer, which is most powerful and meaningful, is to recognize that God's power works through us, controlling all that we think, feel, speak and do. It is the same Power that is seen all around us in the entire creation. A feeling that we are 'one with all creation' comes to us through such prayer. It is the most wonderful and best of prayers.</p>
            </div>
          </div>

          <h3>Understanding Through Example</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-2">The Electricity Example</h4>
            <p>We can illustrate this knowledge using electricity as an example. First we are told that lights, fans, fridges, and stoves work with a power which comes through the wire as we switch it on. As we learn more about science we understand that electricity is a great source of energy with many possibilities. It shows itself through many things in the form of light or heat, but it is the one electrical energy working in many forms.</p>
            <p class="mt-2 font-medium">We must understand that God's power works in a similar way.</p>
          </div>

          <h3>Sri Ramakrishna's Teaching</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg mt-6 border-l-4 border-indian-saffron">
            <p class="italic">"We can pray in whichever way that pleases us best: Even if we pray in a low voice God will hear us. He hears the movement of tiny ants."</p>
            <p class="text-right mt-2 font-medium">- Sri Ramakrishna</p>
          </div>

          <h3>Daily Practice and Temple Worship</h3>
          <p class="mt-6">We must pray daily. Whenever possible we must also go to a temple and pray. Hinduism has some of the most beautiful, universal prayers.</p>

          <h3>Universal Hindu Prayers</h3>
          <div class="space-y-6 mt-6">
            <div class="bg-gradient-to-br from-indian-cream to-white p-4 rounded-lg border border-indian-saffron">
              <h4 class="font-semibold mb-3">Prayer for Truth, Light, and Immortality</h4>
              <div class="text-center mb-4">
                <p class="font-medium text-lg">ॐ असतो मा सद्गमय</p>
                <p class="font-medium text-lg">तमसो मा ज्योतिर्गमय</p>
                <p class="font-medium text-lg">मृत्योर्मा अमृतं गमय</p>
              </div>
              <div class="text-center">
                <p class="italic">Aum asato ma sad gamaya</p>
                <p class="italic">Tamaso ma jyotir gamaya</p>
                <p class="italic">Mrityor ma amritam gamaya</p>
              </div>
              <div class="mt-4 text-center">
                <p class="font-medium">Meaning:</p>
                <p>Lead me from untruth to Truth</p>
                <p>Lead me from darkness to Light</p>
                <p>Lead me from death to Immortality</p>
              </div>
            </div>

            <div class="bg-gradient-to-br from-indian-cream to-white p-4 rounded-lg border border-indian-saffron">
              <h4 class="font-semibold mb-3">Prayer of Fullness</h4>
              <div class="text-center mb-4">
                <p class="font-medium text-lg">ॐ पूर्णमदः पूर्णमिदम्</p>
                <p class="font-medium text-lg">पूर्णात्पूर्णमुदच्यते</p>
                <p class="font-medium text-lg">पूर्णस्य पूर्णमादाय</p>
                <p class="font-medium text-lg">पूर्णमेवावशिष्यते</p>
              </div>
              <div class="text-center">
                <p class="italic">Aum purnamadah purnamidam</p>
                <p class="italic">Purnat purnamudachyate</p>
                <p class="italic">Purnasya purnamadaya</p>
                <p class="italic">Purnameva vasishyate</p>
              </div>
              <div class="mt-4 text-center">
                <p class="font-medium">Meaning:</p>
                <p class="text-sm mb-2">(God is represented as 'Fullness' in this prayer)</p>
                <p>Fullness is there, Fullness is here</p>
                <p>From Fullness arises Fullness</p>
                <p>Remove Fullness from Fullness,</p>
                <p>Fullness alone remains</p>
              </div>
            </div>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'What is prayer according to this lesson?',
              answers: [
                'Asking for material things',
                'The remembrance of God',
                'Reading books',
                'Going to temple only'
              ],
              correctAnswer: 1
            },
            {
              question: 'Which type of prayer is described as the most powerful and meaningful?',
              answers: [
                'Praying to traditional gods',
                'Seeing God in everything around us',
                'Recognizing that God\'s power works through us',
                'Praying loudly'
              ],
              correctAnswer: 2
            },
            {
              question: 'According to Sri Ramakrishna, what can God hear?',
              answers: [
                'Only loud prayers',
                'Only temple prayers',
                'Even the movement of tiny ants',
                'Only Sanskrit prayers'
              ],
              correctAnswer: 2
            },
            {
              question: 'What does "Asato ma sad gamaya" mean?',
              answers: [
                'Lead me from truth to untruth',
                'Lead me from untruth to Truth',
                'Lead me from light to darkness',
                'Lead me from immortality to death'
              ],
              correctAnswer: 1
            },
            {
              question: 'What are the traditional gods mentioned as different forms of one God?',
              answers: [
                'Only Rama and Krishna',
                'Rama, Krishna, Shiva, Hanuman, and Divine Mother',
                'Only Shiva',
                'Only the Divine Mother'
              ],
              correctAnswer: 1
            },
            {
              question: 'What does "Tamaso ma jyotir gamaya" mean?',
              answers: [
                'Lead me from light to darkness',
                'Lead me from darkness to Light',
                'Lead me from truth to untruth',
                'Lead me from death to immortality'
              ],
              correctAnswer: 1
            },
            {
              question: 'What does "Mrityor ma amritam gamaya" mean?',
              answers: [
                'Lead me from truth to untruth',
                'Lead me from darkness to light',
                'Lead me from death to Immortality',
                'Lead me from untruth to truth'
              ],
              correctAnswer: 2
            },
            {
              question: 'In the second prayer, what is God represented as?',
              answers: [
                'Light',
                'Truth',
                'Fullness',
                'Power'
              ],
              correctAnswer: 2
            },
            {
              question: 'What happens when we see God in everything around us?',
              answers: [
                'We become confused',
                'Our prayers become more meaningful and God\'s grace flows',
                'We stop praying',
                'Nothing changes'
              ],
              correctAnswer: 1
            },
            {
              question: 'What feeling comes when we recognize God\'s power working through us?',
              answers: [
                'Fear',
                'Confusion',
                'A feeling of oneness with all creation',
                'Loneliness'
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      {
        id: 'pilgrimage',
        title: 'Pilgrimage - Visiting Temples',
        description: 'Learn about the sacred practice of visiting temples and offering worship',
        content: `
          <h2>Temples - The Abode of God</h2>
          <p>The temple is the abode of God. In the temple God is worshipped as the King of kings. You should visit the nearby temple everyday if possible or at least on all festival days.</p>

          <h3>How to Visit a Temple</h3>
          <div class="space-y-4 mt-6">
            <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300">
              <h4 class="font-semibold mb-2">1. Cleanliness and Dress</h4>
              <p>One must be clean and neatly dressed when going to a temple. This shows respect for the sacred space and the Divine presence.</p>
            </div>

            <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300">
              <h4 class="font-semibold mb-2">2. Sacred Mindset</h4>
              <p>It is not good to talk about worldly things or gossip when one goes to visit the Lord. In fact, one should lovingly repeat God's sweet name all along the way to the temple.</p>
            </div>

            <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300">
              <h4 class="font-semibold mb-2">3. Bringing Offerings</h4>
              <p>One should go to the Temple with incense sticks, flowers, or some fruits to offer to God.</p>
              <div class="mt-3 p-3 bg-indian-cream rounded-lg">
                <p class="italic font-medium">In the Bhagavad Gita, Lord Krishna tells us:</p>
                <p class="italic">"Whomsoever offers Me with devotion a leaf, a flower, a fruit or little water - I accept that offering of a pure heart."</p>
              </div>
            </div>
          </div>

          <h3>How Does God Eat?</h3>
          <div class="bg-gradient-to-br from-indian-cream to-white p-6 rounded-lg border border-indian-saffron mt-6">
            <h4 class="font-semibold mb-3">A Beautiful Story from Sri Sarada Devi</h4>
            <p class="mb-4">There is a beautiful incident in the life of Sri Sarada Devi which shows us how God eats. Once a devotee asked the Holy Mother Sri Sarada Devi:</p>

            <div class="bg-white p-4 rounded-lg mb-4 border-l-4 border-spiritual-300">
              <p class="italic">"Mother, I see you offering food daily before the picture of Sri Ramakrishna. Does the Lord really eat the food?"</p>
            </div>

            <p class="mb-4">The Holy Mother, in her kindness replied:</p>

            <div class="bg-white p-4 rounded-lg border-l-4 border-indian-saffron">
              <p class="italic">"Yes, my child, God really eats the food. When I place the food before Sri Ramakrishna's picture I lovingly invite him to come and eat. I then see rays of light coming out of his eyes, entering the food, taking its essence, blessing the food, and then returning into the Lord's eyes once more."</p>
            </div>

            <p class="mt-4 font-medium">This is one of the ways in which the Lord eats.</p>
          </div>

          <h3>Sacred Food - Prasad</h3>
          <div class="space-y-4 mt-6">
            <p>Food offered to God is therefore blessed. By eating it we are also blessed. Such sacred food is called <strong>prasad</strong> and must be treated with respect.</p>

            <div class="bg-spiritual-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-3">How to Treat Prasad with Respect:</h4>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Do not drop it on the floor</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Do not keep it in unclean places</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Share it with all</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Repeat the sweet name of the Lord and eat some of it yourself</span>
                </li>
              </ul>
            </div>
          </div>

          <h3>Temple Lamps - Symbol of Divine Light</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <p>In all temples lamps are lit as a symbol of God's light and knowledge. These lamps represent the divine illumination that dispels the darkness of ignorance and guides us on the spiritual path.</p>
          </div>

          <div class="mt-8 p-4 bg-spiritual-50 rounded-lg border-l-4 border-spiritual-300">
            <h4 class="font-semibold mb-2">Remember</h4>
            <p>Temple visits are not just rituals, but opportunities to connect with the Divine, purify our hearts, and receive blessings. Approach each visit with devotion, respect, and an open heart.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'How should one be dressed when visiting a temple?',
              answers: [
                'Any way is fine',
                'Clean and neatly dressed',
                'In expensive clothes only',
                'It doesn\'t matter'
              ],
              correctAnswer: 1
            },
            {
              question: 'What should one do while going to the temple?',
              answers: [
                'Talk about worldly things',
                'Gossip with friends',
                'Lovingly repeat God\'s name',
                'Think about work'
              ],
              correctAnswer: 2
            },
            {
              question: 'What is prasad?',
              answers: [
                'Regular food',
                'Food offered to God that becomes blessed',
                'Expensive food',
                'Temple decoration'
              ],
              correctAnswer: 1
            },
            {
              question: 'According to Sri Sarada Devi, how does God eat the offered food?',
              answers: [
                'God doesn\'t eat the food',
                'Rays of light from God\'s eyes take the essence',
                'The food physically disappears',
                'Only priests can see it'
              ],
              correctAnswer: 1
            },
            {
              question: 'What do temple lamps symbolize?',
              answers: [
                'Decoration only',
                'God\'s light and knowledge',
                'Fire worship',
                'Traditional custom'
              ],
              correctAnswer: 1
            },
            {
              question: 'What should one bring when visiting a temple?',
              answers: [
                'Nothing',
                'Incense sticks, flowers, or fruits',
                'Only money',
                'Only books'
              ],
              correctAnswer: 1
            },
            {
              question: 'How often should one visit the temple according to the lesson?',
              answers: [
                'Once a year',
                'Only on birthdays',
                'Daily if possible, or at least on festival days',
                'Never'
              ],
              correctAnswer: 2
            },
            {
              question: 'What should one NOT do with prasad?',
              answers: [
                'Share it with others',
                'Drop it on the floor',
                'Eat it with devotion',
                'Repeat God\'s name while eating'
              ],
              correctAnswer: 1
            },
            {
              question: 'How is God worshipped in the temple?',
              answers: [
                'As a friend',
                'As King of kings',
                'As a servant',
                'As an equal'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did Sri Sarada Devi see when offering food to Sri Ramakrishna?',
              answers: [
                'Nothing special',
                'The food disappearing',
                'Rays of light from his eyes entering and blessing the food',
                'The picture moving'
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      {
        id: 'right-living',
        title: 'Right Living - Part 1',
        description: 'Learn how to live properly at home, school, and in daily life',
        content: `
          <h2>Right Living</h2>
          <p>Living a good and disciplined life helps us grow into strong, kind, and wise individuals. Let us learn how to live properly in different aspects of our lives.</p>

          <h3>Our Homes</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Our home is the place from where we start our life. We must learn to obey and respect our parents. They work hard to make us happy in every way. They buy us clothes, toys, books and send us to school.</p>

            <h4 class="font-semibold mb-3">How to Behave at Home:</h4>
            <div class="space-y-3">
              <div class="bg-white p-3 rounded-lg">
                <strong>Respect Parents:</strong> Be in the habit of greeting your parents in the morning, on arising, and at night before going to bed.
              </div>
              <div class="bg-white p-3 rounded-lg">
                <strong>Family Love:</strong> Be kind and loving to your brothers, sisters, relatives and servants.
              </div>
              <div class="bg-white p-3 rounded-lg">
                <strong>Care for Animals:</strong> Be kind to animals.
              </div>
              <div class="bg-white p-3 rounded-lg">
                <strong>Love Nature:</strong> Learn to love nature. Develop a small garden and see how plants respond to your loving care.
              </div>
              <div class="bg-white p-3 rounded-lg">
                <strong>Keep Clean:</strong> Keep your room tidy and clean. Decorate it with flowers and photographs of your favorite god or saint.
              </div>
              <div class="bg-white p-3 rounded-lg">
                <strong>Daily Prayer:</strong> Pray to God every morning and evening.
              </div>
            </div>
          </div>

          <h3>Schools - Temples of Mother Saraswati</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <p class="mb-4">Schools are temples of Mother Saraswati - the Goddess of Knowledge. The beauty of our life depends on the knowledge which we have. Education, to a great extent, provides us with knowledge.</p>

            <h4 class="font-semibold mb-3">How to Behave at School:</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div class="bg-white p-3 rounded-lg">
                <strong>Be Punctual:</strong> Arrive at school on time
              </div>
              <div class="bg-white p-3 rounded-lg">
                <strong>Regular Studies:</strong> Be consistent in your learning
              </div>
              <div class="bg-white p-3 rounded-lg">
                <strong>Do Homework:</strong> Complete assignments properly every day
              </div>
              <div class="bg-white p-3 rounded-lg">
                <strong>Be Disciplined:</strong> Follow school rules
              </div>
              <div class="bg-white p-3 rounded-lg">
                <strong>Respect Teachers:</strong> Honor those who guide your learning
              </div>
              <div class="bg-white p-3 rounded-lg">
                <strong>Be Friendly:</strong> Get along well with all classmates
              </div>
            </div>

            <div class="mt-4 p-3 bg-spiritual-50 rounded-lg">
              <p><strong>Balanced Development:</strong> Pay careful attention to your studies. Take an interest in games and exercises. A strong mind and a strong body must go together. Keep your classrooms and school grounds tidy and clean.</p>
            </div>
          </div>

          <h3>Daily Routine</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4 font-medium">A disciplined life is the basis of a strong character. We must have a good daily routine so that we use time properly. Time is very valuable.</p>

            <div class="space-y-4">
              <div class="bg-white p-4 rounded-lg border-l-4 border-indian-saffron">
                <h4 class="font-semibold mb-2">Morning Habits</h4>
                <p>Early rising is a good habit. It is good to see the sun rise and listen to the birds chirping. It is healthy to be in the sunshine.</p>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-spiritual-300">
                <h4 class="font-semibold mb-2">Personal Care</h4>
                <ul class="space-y-1">
                  <li>• Have clean personal habits</li>
                  <li>• Make your bed on arising</li>
                  <li>• Brush your teeth</li>
                  <li>• Keep your clothes tidy and clean</li>
                  <li>• As far as possible help in the washing of your clothes and dishes</li>
                </ul>
                <p class="mt-2 font-medium italic">Self-help is the best help.</p>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-spiritual-300">
                <h4 class="font-semibold mb-2">Study and Work</h4>
                <ul class="space-y-1">
                  <li>• Be punctual in your studies</li>
                  <li>• Do your daily homework without fail</li>
                  <li>• Learn to concentrate</li>
                  <li>• Work while you work, play while you play</li>
                  <li>• Set apart time for extra reading, music, and prayer</li>
                </ul>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-spiritual-300">
                <h4 class="font-semibold mb-2">Eating Habits</h4>
                <ul class="space-y-1">
                  <li>• Eat properly at regular times</li>
                  <li>• Avoid overeating</li>
                  <li>• Choose only good nutritious food</li>
                </ul>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-spiritual-300">
                <h4 class="font-semibold mb-2">Sleep and Rest</h4>
                <ul class="space-y-1">
                  <li>• Go to bed early</li>
                  <li>• Do not stay awake till late</li>
                  <li>• Sleep in a proper posture to get good rest</li>
                </ul>
              </div>
            </div>

            <div class="mt-6 p-4 bg-indian-cream rounded-lg text-center">
              <h4 class="font-semibold text-lg mb-2">The Five Wells of Life</h4>
              <p class="text-lg font-medium">Pray well, play well, eat well, study well, sleep well.</p>
            </div>
          </div>

          <div class="mt-8 p-4 bg-spiritual-50 rounded-lg border-l-4 border-indian-saffron">
            <h4 class="font-semibold mb-2">Remember</h4>
            <p>Right living is about creating harmony in all aspects of life - at home, at school, and in our daily routine. When we live with discipline, respect, and love, we grow into better human beings and contribute positively to the world around us.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'What should we do when we wake up and before going to bed?',
              answers: [
                'Watch television',
                'Greet our parents',
                'Play games',
                'Eat snacks'
              ],
              correctAnswer: 1
            },
            {
              question: 'What are schools compared to in this lesson?',
              answers: [
                'Temples of Mother Saraswati',
                'Playgrounds',
                'Markets',
                'Factories'
              ],
              correctAnswer: 0
            },
            {
              question: 'What is the basis of a strong character?',
              answers: [
                'Wealth',
                'A disciplined life',
                'Fame',
                'Power'
              ],
              correctAnswer: 1
            },
            {
              question: 'What does "Work while you work, play while you play" teach us?',
              answers: [
                'To be lazy',
                'To concentrate on one thing at a time',
                'To always work',
                'To always play'
              ],
              correctAnswer: 1
            },
            {
              question: 'What are the "Five Wells of Life"?',
              answers: [
                'Pray, play, eat, study, sleep - all done well',
                'Five different wells for water',
                'Five types of food',
                'Five school subjects'
              ],
              correctAnswer: 0
            },
            {
              question: 'What does "Self-help is the best help" mean?',
              answers: [
                'Never help others',
                'Only ask for expensive help',
                'Learning to do things for yourself',
                'Avoiding all work'
              ],
              correctAnswer: 2
            },
            {
              question: 'What should we do to our room according to the lesson?',
              answers: [
                'Leave it messy',
                'Keep it tidy and clean, decorate with flowers and spiritual pictures',
                'Never clean it',
                'Only use it for sleeping'
              ],
              correctAnswer: 1
            },
            {
              question: 'What should we do with our garden according to the lesson?',
              answers: [
                'Ignore it',
                'Destroy it',
                'Develop it and see how plants respond to loving care',
                'Only look at it'
              ],
              correctAnswer: 2
            },
            {
              question: 'What should we avoid when eating?',
              answers: [
                'Eating nutritious food',
                'Eating at regular times',
                'Overeating',
                'Eating properly'
              ],
              correctAnswer: 2
            },
            {
              question: 'What is good about early rising?',
              answers: [
                'It\'s unhealthy',
                'It\'s good to see sunrise, listen to birds, and be in sunshine',
                'It makes us tired',
                'It\'s unnecessary'
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: 'right-living-part2',
        title: 'Right Living - Part 2',
        description: 'Learn about good company, reading good books, and proper speech',
        content: `
          <h2>Right Living - Part 2</h2>
          <p>Continuing our journey of right living, let us learn about three important aspects that shape our character: the company we keep, the books we read, and how we use our speech.</p>

          <h3>Keep Good Company</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4 font-medium">A man is judged by the company he keeps. Good company brings joy and happiness. Bad company brings sorrow.</p>

            <div class="space-y-4">
              <div class="bg-white p-4 rounded-lg border-l-4 border-indian-saffron">
                <h4 class="font-semibold mb-2">Choose Your Friends Wisely</h4>
                <p>Avoid companions who may lead you into bad habits. Always seek the company of the good, wise and godly people.</p>
              </div>

              <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-300">
                <h4 class="font-semibold mb-2 text-red-700">Avoid These Harmful Habits</h4>
                <ul class="space-y-1 text-red-700">
                  <li>• Do not smoke</li>
                  <li>• Do not gamble</li>
                  <li>• Do not take alcoholic drinks</li>
                  <li>• Do not take drugs</li>
                </ul>
              </div>

              <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-300">
                <h4 class="font-semibold mb-2 text-green-700">Seek Good Company</h4>
                <p class="text-green-700">Spend time with people who are good, wise, and godly. Their positive influence will help you grow into a better person.</p>
              </div>
            </div>
          </div>

          <h3>Read Good Books</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <p class="mb-4 font-medium">Reading books with good, strong and powerful thoughts will help us to become good, strong and powerful. Reading brings knowledge and expands our understanding.</p>

            <div class="space-y-4">
              <div class="bg-white p-4 rounded-lg">
                <h4 class="font-semibold mb-2">Benefits of Good Reading</h4>
                <ul class="space-y-2">
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span>Through reading we can learn and understand about the people and places of the world</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span>One who has good reading habits will never feel lonely or bored in life</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span>Reading expands our understanding and brings knowledge</span>
                  </li>
                </ul>
              </div>

              <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200">
                <h4 class="font-semibold mb-2">Read Holy Books</h4>
                <p class="mb-3">We must also read holy books. They help us to clean our minds of unwanted thoughts and feelings.</p>
                <p class="font-medium">Through such reading we develop love for God and holy men and acquire their good qualities.</p>
              </div>
            </div>
          </div>

          <h3>Speech and Silence</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4 font-medium">Speech is God's wonderful gift to us. Through speech we understand each other.</p>

            <div class="space-y-4">
              <div class="bg-white p-4 rounded-lg border-l-4 border-spiritual-300">
                <h4 class="font-semibold mb-2">Guidelines for Good Speech</h4>
                <ul class="space-y-2">
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span><strong>Speak Truth:</strong> We must learn to speak the truth and to speak kindly too</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span><strong>Think Before Speaking:</strong> Think carefully before you speak because words once spoken cannot be taken back</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span><strong>Avoid Quarrels:</strong> Do not waste the gift of speech over quarrels</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span><strong>Avoid Unnecessary Talking:</strong> Don't speak just to fill silence</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span><strong>Be Sincere:</strong> Always be honest and genuine in your speech</span>
                  </li>
                </ul>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-indian-saffron">
                <h4 class="font-semibold mb-2">The Art of Listening</h4>
                <p>We must learn to listen also. Listen silently and carefully when elders speak to you.</p>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-spiritual-300">
                <h4 class="font-semibold mb-2">The Power of Silence</h4>
                <p>It is good to practice silence once in a while. Often beautiful thoughts come when we are silent.</p>
              </div>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg text-center">
            <h4 class="font-semibold text-lg mb-2">Three Pillars of Character</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div class="bg-white p-3 rounded-lg">
                <strong>Good Company</strong><br/>
                <span class="text-sm">Choose wise friends</span>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <strong>Good Reading</strong><br/>
                <span class="text-sm">Feed your mind well</span>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <strong>Good Speech</strong><br/>
                <span class="text-sm">Use words wisely</span>
              </div>
            </div>
          </div>

          <div class="mt-6 p-4 bg-spiritual-50 rounded-lg border-l-4 border-indian-saffron">
            <h4 class="font-semibold mb-2">Remember</h4>
            <p>The company we keep, the books we read, and the way we speak all shape who we become. Choose carefully in all three areas, and you will grow into a person of good character and wisdom.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'How is a person judged according to this lesson?',
              answers: [
                'By their wealth',
                'By the company they keep',
                'By their appearance',
                'By their age'
              ],
              correctAnswer: 1
            },
            {
              question: 'What should we avoid to maintain good character?',
              answers: [
                'Reading books',
                'Smoking, gambling, drinking, and drugs',
                'Making friends',
                'Going to school'
              ],
              correctAnswer: 1
            },
            {
              question: 'What do holy books help us do?',
              answers: [
                'Become wealthy',
                'Clean our minds of unwanted thoughts',
                'Win competitions',
                'Become famous'
              ],
              correctAnswer: 1
            },
            {
              question: 'Why should we think before speaking?',
              answers: [
                'To speak louder',
                'Because words once spoken cannot be taken back',
                'To speak faster',
                'To impress others'
              ],
              correctAnswer: 1
            },
            {
              question: 'What happens when we practice silence?',
              answers: [
                'We become sad',
                'We lose our voice',
                'Beautiful thoughts often come',
                'We become angry'
              ],
              correctAnswer: 2
            },
            {
              question: 'What are the three pillars of character mentioned in this lesson?',
              answers: [
                'Money, fame, power',
                'Good company, good reading, good speech',
                'Food, sleep, exercise',
                'Work, play, rest'
              ],
              correctAnswer: 1
            },
            {
              question: 'What does good company bring according to the lesson?',
              answers: [
                'Sorrow and problems',
                'Joy and happiness',
                'Confusion',
                'Nothing'
              ],
              correctAnswer: 1
            },
            {
              question: 'What does bad company bring?',
              answers: [
                'Joy and happiness',
                'Sorrow',
                'Good habits',
                'Wisdom'
              ],
              correctAnswer: 1
            },
            {
              question: 'What will happen to someone with good reading habits?',
              answers: [
                'They will become rich',
                'They will never feel lonely or bored in life',
                'They will become famous',
                'They will become lazy'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is speech described as in this lesson?',
              answers: [
                'A burden',
                'God\'s wonderful gift to us',
                'Something to avoid',
                'Only for adults'
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: 'right-living-part3',
        title: 'Right Living - Part 3',
        description: 'Learn about staying busy, serving others, and practicing charity',
        content: `
          <h2>Right Living - Part 3</h2>
          <p>In this final part of our Right Living series, we explore three essential qualities that make life meaningful: staying actively busy, serving others, and practicing charity.</p>

          <h3>Be Busy</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4 font-medium italic">'Busy like a bee' is a saying with great meaning.</p>

            <div class="space-y-4">
              <div class="bg-white p-4 rounded-lg">
                <h4 class="font-semibold mb-2">Keep Body and Mind Active</h4>
                <p>We must learn to keep the body and mind active. One should never waste time but use it properly for studying, reading, prayer and serving others.</p>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-indian-saffron">
                <h4 class="font-semibold mb-2">Do Useful, Good Work</h4>
                <ul class="space-y-2">
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span>Avoid the company of idle people</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span>An active mind and body are necessary for a healthy life</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span>Great things can only be achieved by hard work</span>
                  </li>
                </ul>
              </div>

              <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-300">
                <h4 class="font-semibold mb-2 text-green-700">Ways to Be Helpful</h4>
                <ul class="space-y-2 text-green-700">
                  <li class="flex items-start">
                    <span class="mr-2">•</span>
                    <span>Help your parents, brothers and sisters</span>
                  </li>
                  <li class="flex items-start">
                    <span class="mr-2">•</span>
                    <span>Share household work with them</span>
                  </li>
                  <li class="flex items-start">
                    <span class="mr-2">•</span>
                    <span>Learn to work joyfully</span>
                  </li>
                  <li class="flex items-start">
                    <span class="mr-2">•</span>
                    <span>At school, help your teachers</span>
                  </li>
                  <li class="flex items-start">
                    <span class="mr-2">•</span>
                    <span>Be helpful to your friends</span>
                  </li>
                </ul>
                <p class="mt-3 font-medium">Be good and do good. There lies the seed of greatness.</p>
              </div>
            </div>
          </div>

          <h3>Service</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mb-4">
              <p class="text-lg font-medium italic text-center">"Service to man is service to God. Work is worship."</p>
              <p class="text-center mt-2 font-medium">- Swami Vivekananda</p>
            </div>

            <div class="space-y-4">
              <div class="bg-white p-4 rounded-lg">
                <h4 class="font-semibold mb-2">Who Should We Serve?</h4>
                <p class="mb-3">We must learn to serve the unfortunate, the poor, the sick and the needy with love and kindness.</p>
                <ul class="space-y-1">
                  <li>• The unfortunate</li>
                  <li>• The poor</li>
                  <li>• The sick</li>
                  <li>• The needy</li>
                </ul>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-spiritual-300">
                <h4 class="font-semibold mb-2">How to Serve</h4>
                <ul class="space-y-2">
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span>Try to feel God's presence in all</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span>Such service brings a rare joy into our lives</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span><strong>Never look for any reward</strong> while you help or serve others</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <h3>Charity</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4 font-medium">The whole world is God's creation. Everything here truly belongs to Him. Ours is to take from it only what we need and share everything with everybody else.</p>

            <div class="space-y-4">
              <div class="bg-white p-4 rounded-lg border-l-4 border-indian-saffron">
                <h4 class="font-semibold mb-2">Principles of Giving</h4>
                <ul class="space-y-2">
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span><strong>Give willingly, lovingly and abundantly</strong></span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span><strong>Never be greedy</strong></span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span>Take only what you need</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span>Share everything with everybody else</span>
                  </li>
                </ul>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-green-300">
                <h4 class="font-semibold mb-2 text-green-700">Ways to Practice Charity</h4>
                <ul class="space-y-2 text-green-700">
                  <li class="flex items-start">
                    <span class="mr-2">•</span>
                    <span>Whenever possible feed all God's creatures that are hungry</span>
                  </li>
                  <li class="flex items-start">
                    <span class="mr-2">•</span>
                    <span>Share your knowledge and gifts</span>
                  </li>
                  <li class="flex items-start">
                    <span class="mr-2">•</span>
                    <span>Help those in need without expecting anything in return</span>
                  </li>
                </ul>
              </div>

              <div class="bg-gradient-to-br from-indian-cream to-white p-4 rounded-lg border border-indian-saffron">
                <p class="text-lg font-medium italic text-center">"Only they live who live for others. The rest are more dead than alive."</p>
                <p class="text-center mt-2 font-medium">- Swami Vivekananda</p>
              </div>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg text-center">
            <h4 class="font-semibold text-lg mb-2">Three Paths to Meaningful Life</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div class="bg-white p-3 rounded-lg">
                <strong>Be Busy</strong><br/>
                <span class="text-sm">Active body and mind</span>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <strong>Serve Others</strong><br/>
                <span class="text-sm">Work is worship</span>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <strong>Practice Charity</strong><br/>
                <span class="text-sm">Give willingly and lovingly</span>
              </div>
            </div>
          </div>

          <div class="mt-6 p-4 bg-spiritual-50 rounded-lg border-l-4 border-indian-saffron">
            <h4 class="font-semibold mb-2">The Complete Path</h4>
            <p>Through the three parts of Right Living, we learn to live properly at home and school (Part 1), choose good company and use our speech wisely (Part 2), and finally, to stay active in service and charity (Part 3). This complete approach helps us grow into caring, productive, and spiritually aware individuals.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'What does "Busy like a bee" teach us?',
              answers: [
                'To make honey',
                'To keep body and mind active',
                'To fly around',
                'To live in groups'
              ],
              correctAnswer: 1
            },
            {
              question: 'According to Swami Vivekananda, what is "Service to man"?',
              answers: [
                'Service to God',
                'A waste of time',
                'Only for adults',
                'Not important'
              ],
              correctAnswer: 0
            },
            {
              question: 'What should we never look for while serving others?',
              answers: [
                'Happiness',
                'Any reward',
                'God\'s presence',
                'Joy'
              ],
              correctAnswer: 1
            },
            {
              question: 'According to this lesson, everything in the world belongs to whom?',
              answers: [
                'Rich people',
                'Government',
                'God',
                'Nobody'
              ],
              correctAnswer: 2
            },
            {
              question: 'How should we give according to the lesson on charity?',
              answers: [
                'Reluctantly and little',
                'Only when forced',
                'Willingly, lovingly and abundantly',
                'Only to family'
              ],
              correctAnswer: 2
            },
            {
              question: 'Complete Swami Vivekananda\'s quote: "Only they live who..."',
              answers: [
                'live for money',
                'live for themselves',
                'live for others',
                'live for fame'
              ],
              correctAnswer: 2
            },
            {
              question: 'What should we use our time for according to this lesson?',
              answers: [
                'Only sleeping',
                'Studying, reading, prayer and serving others',
                'Only playing',
                'Wasting it'
              ],
              correctAnswer: 1
            },
            {
              question: 'What type of people should we avoid the company of?',
              answers: [
                'Active people',
                'Idle people',
                'Helpful people',
                'Hardworking people'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who should we serve according to this lesson?',
              answers: [
                'Only rich people',
                'Only family members',
                'The unfortunate, poor, sick and needy',
                'Only ourselves'
              ],
              correctAnswer: 2
            },
            {
              question: 'What should we do whenever possible according to the charity section?',
              answers: [
                'Keep everything for ourselves',
                'Feed all God\'s creatures that are hungry',
                'Ignore hungry creatures',
                'Only feed pets'
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: 'right-living-part4',
        title: 'Right Living - Part 4',
        description: 'Learn about avoiding fault-finding, developing self-control, and cultivating good hobbies',
        content: `
          <h2>Right Living - Part 4</h2>
          <p>In this final part of our Right Living series, we explore three important aspects of inner development: avoiding fault-finding, developing self-control, and cultivating beneficial hobbies.</p>

          <h3>Fault-Finding</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">It is very easy to find faults in others and not notice them in ourselves. Finding faults and teasing others leaves bitter feelings and disturbs the minds of those around. One should avoid this at all times.</p>

            <div class="bg-gradient-to-br from-indian-cream to-white p-6 rounded-lg border border-indian-saffron mt-4">
              <h4 class="font-semibold mb-3">Holy Mother Sri Sarada Devi's Teaching</h4>
              <div class="bg-white p-4 rounded-lg border-l-4 border-spiritual-300">
                <p class="italic text-lg mb-3">"If you want peace of mind, do not find fault with others. Rather see your own faults. Learn to make the whole world your own. No one is a stranger, my child; the whole world is your own."</p>
                <p class="text-right font-medium">- Sri Sarada Devi</p>
              </div>
            </div>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Why Avoid Fault-Finding?</h4>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-red-500 mr-2">•</span>
                  <span>It leaves bitter feelings in others</span>
                </li>
                <li class="flex items-start">
                  <span class="text-red-500 mr-2">•</span>
                  <span>It disturbs the minds of those around us</span>
                </li>
                <li class="flex items-start">
                  <span class="text-red-500 mr-2">•</span>
                  <span>It prevents us from seeing our own faults</span>
                </li>
                <li class="flex items-start">
                  <span class="text-green-500 mr-2">•</span>
                  <span>Instead, focus on seeing your own faults and improving yourself</span>
                </li>
              </ul>
            </div>
          </div>

          <h3>Self-Control</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <p class="mb-4 font-medium">Self-control is a great quality by which we change from animals into godly persons.</p>

            <div class="space-y-4">
              <div class="bg-white p-4 rounded-lg">
                <h4 class="font-semibold mb-2">Understanding the Mind</h4>
                <p class="mb-3">We can tame a wild lion or an elephant. We can train them and make them obey us. Our uncontrolled minds are like wild animals. In the same way we must control and train our minds.</p>
              </div>

              <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200">
                <h4 class="font-semibold mb-2">Sri Ramakrishna's Example</h4>
                <p class="mb-3">To show us how restless our minds can be, Sri Ramakrishna uses an example of a drunk monkey bitten by a scorpion.</p>
                <p class="italic text-sm">This vivid image helps us understand just how wild and uncontrolled our minds can become without proper training.</p>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-green-300">
                <h4 class="font-semibold mb-2 text-green-700">Ways to Tame the Mind</h4>
                <p class="mb-3">There are very many ways in which we can tame this 'monkey' and keep him under control:</p>
                <ul class="space-y-2 text-green-700">
                  <li class="flex items-start">
                    <span class="mr-2">•</span>
                    <span><strong>Prayer</strong> - Connecting with the Divine</span>
                  </li>
                  <li class="flex items-start">
                    <span class="mr-2">•</span>
                    <span><strong>Reading good books</strong> - Feeding the mind with wisdom</span>
                  </li>
                  <li class="flex items-start">
                    <span class="mr-2">•</span>
                    <span><strong>Keeping good company</strong> - Surrounding ourselves with positive influences</span>
                  </li>
                  <li class="flex items-start">
                    <span class="mr-2">•</span>
                    <span><strong>Having good hobbies</strong> - Channeling energy positively</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <h3>Hobbies</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4 font-medium">It is good to have hobbies to rest and relax the mind.</p>

            <div class="space-y-4">
              <div class="bg-white p-4 rounded-lg border-l-4 border-indian-saffron">
                <h4 class="font-semibold mb-2">Music - The Divine Hobby</h4>
                <p class="mb-3">Learning music, singing or playing instruments are very good ways of soothing the mind. Through music one learns to understand the harmony in creation.</p>

                <div class="bg-indian-cream p-3 rounded-lg mt-3">
                  <h5 class="font-semibold mb-2">Indian Music and Nature</h5>
                  <p class="mb-2">Indian music is made up of the harmonious notes taken from different parts of nature.</p>
                  <ul class="space-y-1 text-sm">
                    <li>• Listening to good music can help us to relax and to concentrate</li>
                    <li>• Even animals and plants respond to music</li>
                  </ul>
                </div>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-spiritual-300">
                <h4 class="font-semibold mb-2">Other Beneficial Hobbies</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div class="bg-spiritual-50 p-3 rounded-lg">
                    <strong>Reading & Learning</strong><br/>
                    <span class="text-sm">Reading good books and improving knowledge</span>
                  </div>
                  <div class="bg-spiritual-50 p-3 rounded-lg">
                    <strong>Handicrafts</strong><br/>
                    <span class="text-sm">Creating useful and beautiful things</span>
                  </div>
                  <div class="bg-spiritual-50 p-3 rounded-lg">
                    <strong>Painting</strong><br/>
                    <span class="text-sm">Expressing creativity through colors</span>
                  </div>
                  <div class="bg-spiritual-50 p-3 rounded-lg">
                    <strong>Sculpture</strong><br/>
                    <span class="text-sm">Creating art through form and shape</span>
                  </div>
                  <div class="bg-spiritual-50 p-3 rounded-lg">
                    <strong>Stamp Collecting</strong><br/>
                    <span class="text-sm">Learning about world cultures</span>
                  </div>
                  <div class="bg-spiritual-50 p-3 rounded-lg">
                    <strong>And Many More!</strong><br/>
                    <span class="text-sm">Any positive, creative activity</span>
                  </div>
                </div>
                <p class="mt-3 font-medium text-center">These hobbies can make our leisure hours happy and useful.</p>
              </div>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg text-center">
            <h4 class="font-semibold text-lg mb-2">Three Keys to Inner Development</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div class="bg-white p-3 rounded-lg">
                <strong>Avoid Fault-Finding</strong><br/>
                <span class="text-sm">See your own faults instead</span>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <strong>Develop Self-Control</strong><br/>
                <span class="text-sm">Tame the mind monkey</span>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <strong>Cultivate Good Hobbies</strong><br/>
                <span class="text-sm">Rest and develop the mind</span>
              </div>
            </div>
          </div>

          <div class="mt-6 p-4 bg-spiritual-50 rounded-lg border-l-4 border-indian-saffron">
            <h4 class="font-semibold mb-2">The Complete Journey</h4>
            <p>Through all four parts of Right Living, we have learned a complete approach to life: proper daily habits (Part 1), good character choices (Part 2), active service (Part 3), and inner development (Part 4). Together, these teachings guide us toward becoming well-rounded, spiritually aware, and genuinely helpful human beings.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'According to Sri Sarada Devi, what should we do if we want peace of mind?',
              answers: [
                'Find faults in others',
                'Do not find fault with others, rather see your own faults',
                'Ignore everyone',
                'Complain about everything'
              ],
              correctAnswer: 1
            },
            {
              question: 'What does self-control help us change from?',
              answers: [
                'Children into adults',
                'Students into teachers',
                'Animals into godly persons',
                'Poor into rich'
              ],
              correctAnswer: 2
            },
            {
              question: 'What example does Sri Ramakrishna use to describe our restless minds?',
              answers: [
                'A wild horse',
                'A drunk monkey bitten by a scorpion',
                'A flying bird',
                'A running river'
              ],
              correctAnswer: 1
            },
            {
              question: 'Which of these is NOT mentioned as a way to tame the mind?',
              answers: [
                'Prayer',
                'Reading good books',
                'Watching too much television',
                'Keeping good company'
              ],
              correctAnswer: 2
            },
            {
              question: 'What does Indian music contain according to this lesson?',
              answers: [
                'Only modern sounds',
                'Harmonious notes taken from different parts of nature',
                'Only loud noises',
                'Only foreign influences'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is the purpose of having good hobbies?',
              answers: [
                'To waste time',
                'To show off to others',
                'To rest and relax the mind',
                'To avoid work'
              ],
              correctAnswer: 2
            },
            {
              question: 'What does fault-finding do to others according to the lesson?',
              answers: [
                'Makes them happy',
                'Leaves bitter feelings and disturbs their minds',
                'Helps them improve',
                'Has no effect'
              ],
              correctAnswer: 1
            },
            {
              question: 'What should we learn to make according to Sri Sarada Devi?',
              answers: [
                'Only our family our own',
                'Only our friends our own',
                'The whole world our own',
                'Only our country our own'
              ],
              correctAnswer: 2
            },
            {
              question: 'What do music, singing, and playing instruments help with?',
              answers: [
                'Making noise',
                'Soothing the mind and understanding harmony in creation',
                'Showing off',
                'Wasting time'
              ],
              correctAnswer: 1
            },
            {
              question: 'Which creatures respond to music according to the lesson?',
              answers: [
                'Only humans',
                'Only pets',
                'Even animals and plants',
                'No one'
              ],
              correctAnswer: 2
            }
          ]
        }
      }
    ]
  }
];
