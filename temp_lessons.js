
// Define the types for our lessons data
[];
}







// Sample lesson data
const lessonsData = [
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
        id: 'mother-saraswati',
        title: 'Mother Saraswati',
        description: 'Learn about Mother Saraswati, the divine goddess of knowledge, wisdom, music, and learning',
        content: `
          <h2>Mother Saraswati</h2>
          <div class="text-center mb-6">
            <img src="/pics/saraswati.jpg" alt="Mother Saraswati with veena, books, and japa mala" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Mother Saraswati - the divine goddess of knowledge, wisdom, music, and learning</p>
          </div>

          <p>Mother Saraswati is the goddess of knowledge and wisdom. It is Her grace which gives us intelligence, speech, music and learning. School children, teachers, poets, artists, sculptors, dancers and all lovers of knowledge worship Mother Saraswati and seek Her blessings.</p>

          <h3>The Divine Form</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Mother Saraswati is depicted in a beautiful and symbolic form that represents her divine qualities and gifts to humanity.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Four Hands</h4>
              <p class="mb-3">Mother Saraswati is seen with four hands, each holding something significant that represents an aspect of her divine nature.</p>
              <p>These four hands symbolize the four aspects of human personality: mind, intellect, alertness, and ego.</p>
            </div>
          </div>

          <h3>The Divine Veena</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Goddess of Music</h4>
            <p class="mb-4">In two of her hands she holds a veena. A veena is a beautiful musical instrument with a rich, melodious sound.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Perfect Instrument</h4>
              <p class="mb-3">It is said to be the best of all musical instruments, representing the perfect harmony of knowledge.</p>
              <p class="font-medium">Mother Saraswati is the goddess of music, and the veena symbolizes the sweet harmony of learning when knowledge is perfected.</p>
            </div>
          </div>

          <h3>Books of Knowledge</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">In another hand the Divine Mother holds books, representing the vast ocean of knowledge and wisdom.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Goddess of Learning</h4>
              <p class="mb-3">This shows that She is the goddess of knowledge, learning, and education.</p>
              <p>The books symbolize all forms of knowledge - from the sacred Vedas to modern sciences, from arts to mathematics.</p>
            </div>
          </div>

          <h3>The Sacred Japa Mālā</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Mother Saraswati also holds a japa mālā (rosary) in her fourth hand.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Spiritual Discipline</h4>
              <p class="mb-3">The japa mālā reminds us that one should repeat God's name regularly.</p>
              <p>This symbolizes concentration, meditation, and the spiritual discipline necessary for acquiring true knowledge.</p>
            </div>
          </div>

          <h3>The White Sari</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Goddess of Purity</h4>
            <p class="mb-4">Mother Saraswati is dressed in a white sari. White is the colour of purity and light.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Pure Knowledge</h4>
              <p class="mb-3">Mother Saraswati is also the goddess of purity, representing knowledge that is untainted by ego or ignorance.</p>
              <p class="font-medium">The white sari symbolizes that true knowledge is pure, illuminating, and leads to clarity of thought.</p>
            </div>
          </div>

          <h3>How to Worship Mother Saraswati</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Our Rishis advise us to worship Mother Saraswati in the following ways:</p>

            <div class="space-y-4">
              <div class="bg-white p-4 rounded-lg">
                <h4 class="font-semibold mb-2">1. Sacred Mantra</h4>
                <p class="mb-3">Repeat the mantra of Mother Saraswati regularly.</p>
                <div class="bg-spiritual-50 p-3 rounded-lg text-center">
                  <p class="font-medium text-lg">ॐ श्री सरस्वत्यै नमः</p>
                  <p class="italic mt-2">Om Sri Saraswatyai Namah</p>
                </div>
              </div>

              <div class="bg-white p-4 rounded-lg">
                <h4 class="font-semibold mb-2">2. Respect for Books</h4>
                <ul class="space-y-2">
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span>Do not throw books around and on the floor</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span>Keep books neat and clean</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span>Read the scriptures and other good books</span>
                  </li>
                </ul>
              </div>

              <div class="bg-white p-4 rounded-lg">
                <h4 class="font-semibold mb-2">3. Respect for Music</h4>
                <ul class="space-y-2">
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span>Respect musical instruments</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span>Listen to good and holy music and songs</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span>Good music can produce positive thoughts and feelings in us</span>
                  </li>
                </ul>
              </div>

              <div class="bg-white p-4 rounded-lg">
                <h4 class="font-semibold mb-2">4. Pure Speech</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div class="bg-spiritual-50 p-3 rounded-lg">
                    <p><strong>Speak the truth</strong></p>
                  </div>
                  <div class="bg-spiritual-50 p-3 rounded-lg">
                    <p><strong>Speak softly</strong></p>
                  </div>
                  <div class="bg-spiritual-50 p-3 rounded-lg">
                    <p><strong>Speak kindly</strong></p>
                  </div>
                  <div class="bg-spiritual-50 p-3 rounded-lg">
                    <p><strong>Talk about God</strong></p>
                  </div>
                </div>
              </div>

              <div class="bg-white p-4 rounded-lg">
                <h4 class="font-semibold mb-2">5. What to Avoid</h4>
                <ul class="space-y-2">
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span>Do not use vulgar words</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span>Do not waste time in gossip</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-spiritual-500 mr-2">•</span>
                    <span>Avoid idle talk that does not contribute to knowledge or goodness</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <h3>Saraswati Puja</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Mother Saraswati is specially worshipped on the Saraswati Puja day, which is celebrated with great devotion.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Festival of Knowledge</h4>
              <p class="mb-3">On this day, students place their books and learning materials before the goddess and seek her blessings for success in their studies.</p>
              <p>Musical instruments are also placed before her image, and artists and musicians pray for her grace to enhance their talents.</p>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg">
            <h4 class="font-semibold mb-2">Meanings</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Intelligence:</strong> Understanding, knowing</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Sculptor:</strong> One who cuts out of stone or wood an image or statue</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Japa mālā:</strong> A string of beads used when repeating God's name</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Mantra:</strong> Holy word or the name of God</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Vulgar:</strong> Bad words</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Gossip:</strong> Idle talk (usually about someone else)</p>
              </div>
            </div>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'What is Mother Saraswati the goddess of?',
              answers: [
                'Wealth and prosperity',
                'Knowledge and wisdom',
                'War and victory',
                'Love and beauty'
              ],
              correctAnswer: 1
            },
            {
              question: 'How many hands does Mother Saraswati have?',
              answers: [
                'Two',
                'Four',
                'Six',
                'Eight'
              ],
              correctAnswer: 1
            },
            {
              question: 'What musical instrument does Mother Saraswati hold?',
              answers: [
                'Flute',
                'Drum',
                'Veena',
                'Sitar'
              ],
              correctAnswer: 2
            },
            {
              question: 'What does Mother Saraswati holding books symbolize?',
              answers: [
                'She is the goddess of libraries',
                'She is the goddess of knowledge',
                'She likes to read stories',
                'She writes poetry'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is the japa mālā that Mother Saraswati holds?',
              answers: [
                'A flower garland',
                'A golden crown',
                'A rosary for repeating God\'s name',
                'A magical wand'
              ],
              correctAnswer: 2
            },
            {
              question: 'What color sari does Mother Saraswati wear?',
              answers: [
                'Red',
                'Blue',
                'Green',
                'White'
              ],
              correctAnswer: 3
            },
            {
              question: 'What does the white color of Mother Saraswati\'s sari represent?',
              answers: [
                'Snow',
                'Clouds',
                'Purity',
                'Simplicity'
              ],
              correctAnswer: 2
            },
            {
              question: 'What is the mantra for Mother Saraswati?',
              answers: [
                'Om Namah Shivaya',
                'Om Sri Saraswatyai Namah',
                'Om Namo Bhagavate Vasudevaya',
                'Om Gam Ganapataye Namaha'
              ],
              correctAnswer: 1
            },
            {
              question: 'According to the lesson, how should we treat books?',
              answers: [
                'Keep them in a locked cabinet',
                'Read them only on special occasions',
                'Respect them and keep them neat',
                'Share them with everyone'
              ],
              correctAnswer: 2
            },
            {
              question: 'When is Mother Saraswati specially worshipped?',
              answers: [
                'Every Monday',
                'During the full moon',
                'On Saraswati Puja day',
                'During solar eclipse'
              ],
              correctAnswer: 2
            }
          ]
        }
      },
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
        id: 'prahlada-devotee',
        title: 'Prahlada - The Child Devotee',
        description: 'Learn about the inspiring story of Prahlada, the child devotee whose faith in God never wavered',
        content: `
          <h2>Prahlada - The Child Devotee</h2>
          <div class="text-center mb-6">
            <img src="/pics/prahlada.jpg" alt="Prahlada, the child devotee, protected by Lord Narasimha" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Prahlada - the young devotee whose unwavering faith in God brought forth divine protection</p>
          </div>

          <p>The story of Prahlada is one of the most inspiring tales of devotion, faith, and divine protection in Hindu tradition. It teaches us that even a child can achieve the highest spiritual realization through pure devotion.</p>

          <h3>The Demon King Hiranyakashipu</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Prahlada was the son of a wicked demon king, Hiranyakashipu. Hiranyakashipu hated God and insulted godly people.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Arrogant King</h4>
              <p class="mb-3">Hiranyakashipu had received special boons through severe penance. These boons made him nearly invincible, and he believed he was more powerful than God Himself.</p>
              <p>In his pride, he demanded that everyone worship him instead of God and punished those who refused.</p>
            </div>
          </div>

          <h3>Prahlada's Education</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Unexpected Devotee</h4>
            <p class="mb-4">Hiranyakashipu sent Prahlada to study under teachers who would teach him the ways of the demons.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Divine Intervention</h4>
              <p class="mb-3">His teachers taught him to hate God, but by God's grace, Prahlada did not listen to them.</p>
              <p class="font-medium">Instead, Prahlada loved God deeply. He always said, <span class="italic">"I shall utter only the name of God, or Hari."</span></p>
            </div>
          </div>

          <h3>The Father's Anger</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">When Hiranyakashipu discovered that his son was devoted to Lord Vishnu, his sworn enemy, he was furious.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Terrible Threat</h4>
              <p class="mb-3">He shouted at Prahlada, <span class="italic">"I will kill you if you repeat God's name!"</span></p>
              <p>But Prahlada, with childlike innocence and unwavering faith, only continued to repeat God's name, unafraid of his father's threats.</p>
            </div>
          </div>

          <h3>The Tests of Faith</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Hiranyakashipu was determined to destroy his son's faith and punish him for his devotion to Lord Vishnu.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Cruel Punishments</h4>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>He gave Prahlada poison to drink</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>He threw the small boy into the sea</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>He rolled him down a mountain</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>He had elephants try to trample him</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>He put him in a pit of venomous snakes</span>
                </li>
              </ul>
            </div>
          </div>

          <h3>Divine Protection</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Miracle of Faith</h4>
            <p class="mb-4">Lo! No harm came to little Prahlada—God always saved him!</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Power of God's Name</h4>
              <p class="mb-3">Prahlada kept repeating God's name, and this is what saved him from all dangers.</p>
              <p class="font-medium">Through each terrible ordeal, Prahlada's faith only grew stronger, and his love for God became even more pure.</p>
            </div>
          </div>

          <h3>The Final Confrontation</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Hiranyakashipu's frustration and anger reached its peak when none of his attempts to harm Prahlada succeeded.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Challenge</h4>
              <p class="mb-3">Hiranyakashipu at last demanded, <span class="italic">"Where is your God?"</span></p>
              <p>Prahlada, in complete innocence and faith, replied, <span class="italic">"God is everywhere!"</span></p>
              <p class="mt-3">Then his father shouted at him, <span class="italic">"Show me your God now, if you dare! If He is in this pillar, let Him come out!"</span></p>
            </div>
          </div>

          <h3>The Appearance of Lord Narasimha</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Hiranyakashipu struck the pillar hard in anger and mockery.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Divine Manifestation</h4>
              <p class="mb-3">When he did, God suddenly appeared out of the pillar in a form never seen before - half man and half lion.</p>
              <p>He had the head, claws, and teeth of a lion and the body of a man. This form of God is known as <strong>Narasimha</strong> (Man-Lion).</p>
            </div>
          </div>

          <h3>The End of Evil</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Divine Justice</h4>
            <p class="mb-4">Lord Narasimha's appearance was terrifying to behold, but to Prahlada, it was a form of divine love and protection.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Demon's Defeat</h4>
              <p class="mb-3">God picked up Hiranyakashipu, placed him on his lap, and killed him with his sharp claws.</p>
              <p>The demon king's boons could not save him, as Lord Narasimha's form and the manner of killing perfectly circumvented all the protections Hiranyakashipu had received.</p>
            </div>
          </div>

          <h3>The Blessing</h3>
          <div class="bg-gradient-to-br from-indian-cream to-white p-4 rounded-lg border border-indian-saffron mt-6">
            <h4 class="font-semibold mb-3">Divine Love</h4>
            <p class="mb-4">After destroying the evil king, Lord Narasimha turned lovingly to Prahlada.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Reward of Devotion</h4>
              <p class="mb-3">The fierce form of the Lord became gentle and loving as He blessed Prahlada for his unwavering devotion.</p>
              <p class="font-medium">God always blesses and protects those children who are devoted to Him. So you see, children too can realize God.</p>
            </div>
          </div>

          <h3>Understanding the Story</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <h4 class="font-semibold mb-3">The Deeper Meaning</h4>
            <p class="mb-4">To understand these amazing happenings, we must realize that in order to destroy the wicked, God Himself takes strange and terrible forms.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The True Devotee</h4>
              <p>The true devotee, however, is fearless and loves God in all His forms - whether gentle like Krishna or fierce like Narasimha.</p>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg text-center">
            <h4 class="font-semibold text-lg mb-2">Lessons from Prahlada</h4>
            <p>Prahlada's story teaches us that true devotion knows no fear, that God protects His devotees under all circumstances, and that even a child can achieve the highest spiritual realization through pure love and faith in God.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'Who was Prahlada\'s father?',
              answers: [
                'Vishnu',
                'Hiranyakashipu',
                'Narasimha',
                'Indra'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did Hiranyakashipu want everyone to do?',
              answers: [
                'Worship Lord Vishnu',
                'Worship his son Prahlada',
                'Worship him instead of God',
                'Build temples'
              ],
              correctAnswer: 2
            },
            {
              question: 'What did Prahlada always say he would do?',
              answers: [
                'Obey his father',
                'Become a king',
                'Utter only the name of God (Hari)',
                'Study hard'
              ],
              correctAnswer: 2
            },
            {
              question: 'How did Hiranyakashipu try to harm Prahlada?',
              answers: [
                'He never tried to harm him',
                'He only scolded him',
                'He gave him poison, threw him into the sea, and rolled him down a mountain',
                'He sent him away to another kingdom'
              ],
              correctAnswer: 2
            },
            {
              question: 'What protected Prahlada from all dangers?',
              answers: [
                'His magical powers',
                'His teachers',
                'His repeating of God\'s name',
                'His father\'s soldiers'
              ],
              correctAnswer: 2
            },
            {
              question: 'What did Prahlada say when his father asked where God was?',
              answers: [
                'God is only in temples',
                'God is everywhere',
                'God is in heaven',
                'God is not here'
              ],
              correctAnswer: 1
            },
            {
              question: 'What happened when Hiranyakashipu struck the pillar?',
              answers: [
                'Nothing happened',
                'The pillar broke',
                'God appeared as Narasimha (half-man, half-lion)',
                'Prahlada ran away'
              ],
              correctAnswer: 2
            },
            {
              question: 'What form did God take to destroy Hiranyakashipu?',
              answers: [
                'A giant human',
                'A full lion',
                'A man-lion (Narasimha)',
                'An elephant'
              ],
              correctAnswer: 2
            },
            {
              question: 'What did Lord Narasimha do after killing Hiranyakashipu?',
              answers: [
                'He disappeared immediately',
                'He destroyed the kingdom',
                'He turned lovingly to Prahlada and blessed him',
                'He became angry with everyone'
              ],
              correctAnswer: 2
            },
            {
              question: 'What is the main lesson from Prahlada\'s story?',
              answers: [
                'Children should always obey their parents',
                'God protects His devotees and even children can realize God',
                'Demons are always evil',
                'Lions are powerful animals'
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: 'teachings-sri-sarada-devi',
        title: 'Teachings of Sri Sārada Devi',
        description: 'Learn the profound wisdom and practical guidance from Sri Sārada Devi, the Holy Mother',
        content: `
          <h2>Teachings of Sri Sārada Devi</h2>
          <div class="text-center mb-6">
            <img src="/pics/sri-sarada-devi.jpg" alt="Sri Sarada Devi, the Holy Mother, in meditation" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Sri Sārada Devi - the Holy Mother whose teachings guide us toward spiritual wisdom</p>
          </div>

          <p>Sri Sārada Devi, known as the Holy Mother, was the spiritual consort of Sri Ramakrishna and a great spiritual teacher in her own right. Her teachings are filled with practical wisdom that can guide us in our daily lives and spiritual journey.</p>

          <h3>Teaching 1: Awareness and Mindfulness</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Stay Alert and Informed</h4>
              <blockquote class="italic mb-3">"Whenever you go from one place to another, look at the things around you, and also keep yourself well informed about what happens in the place where you live."</blockquote>
              <p class="mb-3">The Holy Mother teaches us to be mindful and aware of our surroundings. This awareness helps us:</p>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Understand the world around us better</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Learn from our environment and experiences</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Stay connected with our community</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Develop wisdom through observation</span>
                </li>
              </ul>
            </div>
          </div>

          <h3>Teaching 2: Action and Effort</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Be Active and Determined</h4>
              <blockquote class="italic mb-3">"You must be up and doing if you want to get anything good and great."</blockquote>
              <p class="mb-3">Sri Sārada Devi emphasizes the importance of action and effort. She teaches us that:</p>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Good things don't come to those who wait passively</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>We must work actively toward our goals</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Spiritual progress requires consistent effort</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Great achievements come through dedicated action</span>
                </li>
              </ul>
            </div>
          </div>

          <h3>Teaching 3: Love and Devotion</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Path to God</h4>
              <blockquote class="italic mb-3">"One never finds God without love and devotion."</blockquote>
              <p class="mb-3">The Holy Mother reveals the essential ingredients for spiritual realization:</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="bg-spiritual-50 p-3 rounded-lg">
                  <p><strong>Love:</strong> Pure, selfless love for God and all beings</p>
                </div>
                <div class="bg-spiritual-50 p-3 rounded-lg">
                  <p><strong>Devotion:</strong> Sincere dedication and surrender to the Divine</p>
                </div>
              </div>
              <p class="mt-3">Without these two qualities, all spiritual practices remain incomplete.</p>
            </div>
          </div>

          <h3>Teaching 4: Purity of Mind</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">See the Good in All</h4>
              <blockquote class="italic mb-3">"He who has a pure mind sees everyone pure."</blockquote>
              <p class="mb-3">This profound teaching shows us that our perception of the world reflects our inner state:</p>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>A pure mind naturally sees goodness in others</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Our judgments often reflect our own inner condition</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Purifying our mind changes how we see the world</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Seeing purity in others helps us develop compassion</span>
                </li>
              </ul>
            </div>
          </div>

          <h3>Teaching 5: Constructive Action</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Build, Don't Destroy</h4>
              <blockquote class="italic mb-3">"Everyone can break down something, but how many can build it up?"</blockquote>
              <p class="mb-3">The Holy Mother challenges us to be constructive rather than destructive:</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-spiritual-50 p-3 rounded-lg">
                  <h5 class="font-semibold mb-2">Easy to Destroy:</h5>
                  <ul class="text-sm space-y-1">
                    <li>• Criticize others</li>
                    <li>• Break relationships</li>
                    <li>• Spread negativity</li>
                    <li>• Give up on goals</li>
                  </ul>
                </div>
                <div class="bg-indian-saffron/10 p-3 rounded-lg">
                  <h5 class="font-semibold mb-2">Harder to Build:</h5>
                  <ul class="text-sm space-y-1">
                    <li>• Encourage others</li>
                    <li>• Create harmony</li>
                    <li>• Spread positivity</li>
                    <li>• Achieve great things</li>
                  </ul>
                </div>
              </div>
              <p class="mt-3 font-medium">True strength lies in building up rather than tearing down.</p>
            </div>
          </div>

          <h3>Living the Teachings</h3>
          <div class="bg-gradient-to-br from-indian-cream to-white p-4 rounded-lg border border-indian-saffron mt-6">
            <h4 class="font-semibold mb-3">Practical Application</h4>
            <p class="mb-4">Sri Sārada Devi's teachings are not just philosophical concepts but practical guidelines for daily life:</p>

            <div class="space-y-3">
              <div class="bg-white p-3 rounded-lg">
                <p><strong>In Study:</strong> Be alert, work hard, and approach learning with love</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>In Relationships:</strong> See the good in others and build them up</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>In Spiritual Life:</strong> Cultivate love and devotion through consistent practice</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>In Daily Life:</strong> Stay aware, take positive action, and maintain purity of mind</p>
              </div>
            </div>
          </div>

          <div class="mt-8 p-4 bg-spiritual-50 rounded-lg border-l-4 border-spiritual-300">
            <h4 class="font-semibold mb-2">The Holy Mother's Legacy</h4>
            <p>Sri Sārada Devi's teachings continue to guide spiritual seekers around the world. Her wisdom combines practical life guidance with profound spiritual insights, showing us how to live with awareness, love, purity, and constructive action in all aspects of our lives.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'According to Sri Sārada Devi, what should we do when going from one place to another?',
              answers: [
                'Walk quickly without looking around',
                'Look at things around us and stay informed about our surroundings',
                'Only focus on our destination',
                'Avoid talking to anyone'
              ],
              correctAnswer: 1
            },
            {
              question: 'What does Sri Sārada Devi say about getting good and great things?',
              answers: [
                'They come automatically with time',
                'You must be up and doing to get them',
                'Only lucky people get them',
                'They are not important'
              ],
              correctAnswer: 1
            },
            {
              question: 'According to the Holy Mother, what is necessary to find God?',
              answers: [
                'Only knowledge',
                'Only rituals',
                'Love and devotion',
                'Wealth and power'
              ],
              correctAnswer: 2
            },
            {
              question: 'What does Sri Sārada Devi say about a person with a pure mind?',
              answers: [
                'They see everyone as pure',
                'They become very strict',
                'They avoid other people',
                'They become proud'
              ],
              correctAnswer: 0
            },
            {
              question: 'What does the Holy Mother say about breaking down versus building up?',
              answers: [
                'Both are equally easy',
                'Building up is easier than breaking down',
                'Everyone can break down something, but few can build it up',
                'Breaking down is more important'
              ],
              correctAnswer: 2
            },
            {
              question: 'Which quality does Sri Sārada Devi emphasize for spiritual progress?',
              answers: [
                'Laziness',
                'Active effort and determination',
                'Passive waiting',
                'Avoiding all action'
              ],
              correctAnswer: 1
            },
            {
              question: 'What does the teaching about purity of mind suggest?',
              answers: [
                'We should judge others harshly',
                'Our perception of others reflects our inner state',
                'Everyone is naturally evil',
                'We should avoid all people'
              ],
              correctAnswer: 1
            },
            {
              question: 'How does Sri Sārada Devi want us to approach our environment?',
              answers: [
                'With ignorance and indifference',
                'With fear and suspicion',
                'With awareness and mindfulness',
                'With criticism and judgment'
              ],
              correctAnswer: 2
            },
            {
              question: 'What is the main message about constructive versus destructive action?',
              answers: [
                'Destruction is more powerful',
                'Both are equally valuable',
                'True strength lies in building up rather than tearing down',
                'Destruction is necessary for progress'
              ],
              correctAnswer: 2
            },
            {
              question: 'What makes Sri Sārada Devi\'s teachings special?',
              answers: [
                'They are only for advanced practitioners',
                'They combine practical life guidance with spiritual insights',
                'They are very complicated',
                'They focus only on rituals'
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: 'ganesh-and-cat',
        title: 'Ganesh and the Cat',
        description: 'Learn the beautiful story that teaches us to love and respect all beings as manifestations of the Divine',
        content: `
          <h2>Ganesh and the Cat</h2>
          <div class="text-center mb-6">
            <img src="/pics/ganesh-cat.jpg" alt="Lord Ganesha learning compassion from Mother Parvati" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">A story that teaches us to see the Divine in all beings</p>
          </div>

          <p>Sri Rāmakrishna used to tell this beautiful story to show that we should love and respect all beings. This story teaches us one of the most important spiritual truths - that God is present in all creatures.</p>

          <h3>Young Ganesha's Action</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Ganesha is the beloved son of Mother Pārvati. When he was a small boy, he once encountered a female cat.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Unfortunate Incident</h4>
              <p class="mb-3">In a moment of childish thoughtlessness, young Ganesha beat the female cat badly with a stick.</p>
              <p>The poor cat was bleeding from the wounds inflicted by the stick. She ran away in pain and fear.</p>
            </div>
          </div>

          <h3>The Mysterious Wounds</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">A Shocking Discovery</h4>
            <p class="mb-4">Sometime later, Ganesha came to his mother Pārvati and was shocked by what he saw.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Mother's Condition</h4>
              <p class="mb-3">There were marks of a beating on Mother Pārvati's whole body - exactly like the wounds he had inflicted on the cat.</p>
              <p>Ganesha was deeply concerned and asked, <span class="italic">'Who has beaten you, mother?'</span></p>
            </div>
          </div>

          <h3>The Startling Revelation</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Mother Pārvati's reply left Ganesha speechless with wonder.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Impossible Truth</h4>
              <p class="mb-3">Mother Pārvati replied, <span class="italic">'My child, it is you who have beaten me.'</span></p>
              <p class="mb-3">Ganesha was speechless with wonder. What was she saying? How could it be possible?</p>
              <p>If he had done such a thing to his beloved mother, surely he would remember it!</p>
            </div>
          </div>

          <h3>The Gentle Inquiry</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Mother Pārvati, with infinite patience and love, helped her son understand what had happened.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Leading to Understanding</h4>
              <p class="mb-3">Mother Pārvati said gently, <span class="italic">'Think, and try to remember if you have beaten any creature today.'</span></p>
              <p>Ganesha thought carefully and then remembered: <span class="italic">'I have beaten a cat. Why do you ask, mother?'</span></p>
            </div>
          </div>

          <h3>The Divine Truth Revealed</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Universal Presence</h4>
            <p class="mb-4">Mother Pārvati then revealed the profound spiritual truth that would change Ganesha's understanding forever.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Great Teaching</h4>
              <p class="mb-3">Mother Pārvati replied with infinite love and wisdom:</p>
              <div class="bg-spiritual-50 p-4 rounded-lg">
                <p class="italic text-center text-lg">'My child, you have in fact beaten me. I am present in all beings and creatures in the world.'</p>
              </div>
              <p class="mt-3">This revelation showed Ganesha that the Divine Mother is not separate from any living being - she exists in all creatures.</p>
            </div>
          </div>

          <h3>The Transformation</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">This profound teaching had an immediate and lasting impact on young Ganesha.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Understanding and Change</h4>
              <p class="mb-3">Ganesha listened to his mother and understood the deep truth she was teaching him.</p>
              <p class="font-medium">From that moment on, he understood that he must love and respect all beings equally, for the Divine Mother is present in each and every one of them.</p>
            </div>
          </div>

          <h3>The Universal Teaching</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <h4 class="font-semibold mb-3">What This Story Teaches Us</h4>
            <div class="space-y-3">
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Divine Presence:</strong> God is present in all living beings, not just in temples or holy places</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Universal Compassion:</strong> When we hurt any creature, we are hurting the Divine itself</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Equal Respect:</strong> All beings deserve our love and respect, regardless of their form</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Mindful Action:</strong> We should think carefully before acting, considering the impact on all beings</p>
              </div>
            </div>
          </div>

          <h3>Sri Rāmakrishna's Wisdom</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Why This Story Matters</h4>
            <p class="mb-4">Sri Rāmakrishna often told this story to his devotees to illustrate the fundamental unity of all existence.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Practical Application</h4>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Treat all animals with kindness and care</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>See the Divine presence in every living being</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Practice compassion in our daily interactions</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Remember that harming others ultimately harms ourselves</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg text-center">
            <h4 class="font-semibold text-lg mb-2">The Eternal Message</h4>
            <p>This beautiful story reminds us that the same Divine consciousness that we worship in temples and holy places is also present in the smallest creatures around us. When we truly understand this truth, we naturally develop love and respect for all beings.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'Who used to tell the story of Ganesha and the cat?',
              answers: [
                'Mother Parvati',
                'Sri Rāmakrishna',
                'Lord Shiva',
                'Ganesha himself'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did young Ganesha do to the cat?',
              answers: [
                'He fed it milk',
                'He played with it gently',
                'He beat it badly with a stick',
                'He ignored it completely'
              ],
              correctAnswer: 2
            },
            {
              question: 'What did Ganesha see when he came to his mother?',
              answers: [
                'She was happy and smiling',
                'She was cooking food',
                'She had marks of beating on her body',
                'She was sleeping peacefully'
              ],
              correctAnswer: 2
            },
            {
              question: 'When Ganesha asked who had beaten his mother, what did she reply?',
              answers: [
                'A stranger had beaten her',
                'She had fallen down',
                'It was you who have beaten me',
                'No one had beaten her'
              ],
              correctAnswer: 2
            },
            {
              question: 'What did Mother Parvati ask Ganesha to remember?',
              answers: [
                'If he had eaten his food',
                'If he had beaten any creature that day',
                'If he had said his prayers',
                'If he had done his homework'
              ],
              correctAnswer: 1
            },
            {
              question: 'What profound truth did Mother Parvati reveal to Ganesha?',
              answers: [
                'She was angry with him',
                'She was present in all beings and creatures',
                'The cat was her favorite animal',
                'He should avoid all animals'
              ],
              correctAnswer: 1
            },
            {
              question: 'How did Ganesha react to his mother\'s teaching?',
              answers: [
                'He became angry',
                'He didn\'t believe her',
                'He understood and learned to love and respect all beings',
                'He ran away from home'
              ],
              correctAnswer: 2
            },
            {
              question: 'What is the main lesson of this story?',
              answers: [
                'Cats are sacred animals',
                'We should love and respect all beings as God is present in them',
                'Children should not play with animals',
                'Mothers always know everything'
              ],
              correctAnswer: 1
            },
            {
              question: 'Why did Sri Rāmakrishna tell this story to his devotees?',
              answers: [
                'To entertain them',
                'To teach them about animals',
                'To show that we should love and respect all beings',
                'To tell them about Ganesha\'s childhood'
              ],
              correctAnswer: 2
            },
            {
              question: 'What does this story teach us about the Divine presence?',
              answers: [
                'God is only in temples',
                'God is only in holy books',
                'God is present in all living beings',
                'God is only in the sky'
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      {
        id: 'ranti-deva',
        title: 'Ranti Deva',
        description: 'Learn about the great king who gave up his kingdom to serve others and see God in all beings',
        content: `
          <h2>Ranti Deva</h2>
          <div class="text-center mb-6">
            <img src="/pics/ranti-deva.jpg" alt="King Ranti Deva sharing his food with the hungry" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Ranti Deva - the king who saw God in all beings and served them with love</p>
          </div>

          <p>Animals are also God's children. We must be loving and kind to all animals. The story of Ranti Deva teaches us this beautiful truth through the example of a great king who saw God in all beings.</p>

          <h3>The Great King's Renunciation</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Ranti Deva was a great king who ruled with wisdom and compassion. Despite having all the comforts of royal life, he made an extraordinary decision.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Leaving the Kingdom</h4>
              <p class="mb-3">He gave up his kingdom to live in a forest as a holy man.</p>
              <p class="mb-3">Why should a king give up his kingdom and go to the forest?</p>
              <p class="font-medium">In olden days, people went to the forest because it was easier to think about God there, away from worldly distractions.</p>
            </div>
          </div>

          <h3>The Great Fast</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Spiritual Discipline</h4>
            <p class="mb-4">Once, Ranti Deva undertook a severe spiritual practice to purify his mind and draw closer to God.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Forty-Eight Days of Fasting</h4>
              <p class="mb-3">Ranti Deva fasted for forty-eight days, knowing that this would help him to control his mind and focus on the Divine.</p>
              <p>On the forty-ninth day, he finally cooked a little rice. This was to be his first meal after the long fast.</p>
            </div>
          </div>

          <h3>The First Hungry Visitor</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Just as Ranti Deva was about to break his fast and eat his simple meal, something unexpected happened.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Poor Man's Plea</h4>
              <p class="mb-3">As he was about to eat his food, a poor man arrived and said, <span class="italic">'I am hungry. Please give me something to eat.'</span></p>
              <p class="mb-3">Without hesitation, Ranti Deva gladly gave him some rice.</p>
              <p>The man ate it gratefully and went away, his hunger satisfied.</p>
            </div>
          </div>

          <h3>The Second Hungry Visitor</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Ranti Deva's generosity was about to be tested again.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Another Call for Help</h4>
              <p class="mb-3">Again as Ranti Deva sat down to eat, another hungry man suddenly appeared and begged for food.</p>
              <p>Once again, Ranti Deva shared his food with the poor man, reducing his own portion even further.</p>
            </div>
          </div>

          <h3>The Hungry Dog</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">God in Animal Form</h4>
            <p class="mb-4">The ultimate test of Ranti Deva's compassion was yet to come.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Final Visitor</h4>
              <p class="mb-3">Next, a hungry dog ran up to him. It wagged its tail, as if begging for food.</p>
              <p class="mb-3">Ranti Deva, seeing the hunger in the dog's eyes, gave the dog all the food that was left.</p>
              <p>The dog gobbled it up gratefully and ran away, leaving Ranti Deva with no food at all.</p>
            </div>
          </div>

          <h3>True Contentment</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Despite having given away all his food after a 48-day fast, Ranti Deva felt something remarkable.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Joy of Service</h4>
              <p class="mb-3">Ranti Deva was contented and happy. He said to himself:</p>
              <div class="bg-spiritual-50 p-4 rounded-lg">
                <p class="italic text-center text-lg">'I am happy today because I could remove the hunger of others.'</p>
              </div>
              <p class="mt-3">His own hunger seemed insignificant compared to the joy of serving others.</p>
            </div>
          </div>

          <h3>The Secret of His Generosity</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">How was Ranti Deva able to give away all his food so easily, even after such a long fast?</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Spiritual Vision</h4>
              <p class="mb-3">It was through his prayers and austerities that he could see God in all beings.</p>
              <p class="font-medium">When we truly see God in others, serving them becomes as natural as serving God directly.</p>
            </div>
          </div>

          <h3>Divine Recognition</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">God's Blessing</h4>
            <p class="mb-4">Ranti Deva's selfless service did not go unnoticed by the Divine.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Lord's Appearance</h4>
              <p class="mb-3">The Lord appeared to Ranti Deva and said:</p>
              <div class="bg-spiritual-50 p-4 rounded-lg">
                <p class="italic">'I am pleased with you, Ranti Deva, because you thought only of others. You never thought of your own hunger and suffering. Truly you are my bhakta. May you always be blessed.'</p>
              </div>
            </div>
          </div>

          <h3>Swami Vivekānanda's Teaching</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">This story reminds us of Swami Vivekānanda's soul-stirring words that echo the same spirit of compassion:</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Universal Compassion</h4>
              <div class="bg-indian-saffron/10 p-4 rounded-lg">
                <p class="italic text-center text-lg">'Even if a single dog in my country is without food, my whole religion will be to feed it.'</p>
                <p class="text-right mt-2 font-medium">- Swami Vivekānanda</p>
              </div>
              <p class="mt-3">This shows that true spirituality lies in serving all beings with love and compassion.</p>
            </div>
          </div>

          <h3>Lessons from Ranti Deva</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <h4 class="font-semibold mb-3">What We Can Learn</h4>
            <div class="space-y-3">
              <div class="bg-white p-3 rounded-lg">
                <p><strong>See God in All:</strong> Every being, human or animal, is a manifestation of the Divine</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Selfless Service:</strong> True happiness comes from serving others, not from satisfying our own desires</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Equal Compassion:</strong> We should show the same love to animals as we do to humans</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Spiritual Practice:</strong> Prayer and austerity help us develop the vision to see God everywhere</p>
              </div>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg">
            <h4 class="font-semibold mb-2">Meaning</h4>
            <div class="bg-white p-3 rounded-lg">
              <p><strong>Bhakta:</strong> A devotee of God</p>
            </div>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'What was Ranti Deva before he became a holy man?',
              answers: [
                'A farmer',
                'A great king',
                'A merchant',
                'A teacher'
              ],
              correctAnswer: 1
            },
            {
              question: 'Why did Ranti Deva give up his kingdom to live in the forest?',
              answers: [
                'He was forced to leave',
                'He lost a war',
                'It was easier to think about God there',
                'He was tired of ruling'
              ],
              correctAnswer: 2
            },
            {
              question: 'How many days did Ranti Deva fast?',
              answers: [
                'Forty-seven days',
                'Forty-eight days',
                'Forty-nine days',
                'Fifty days'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did Ranti Deva cook on the forty-ninth day?',
              answers: [
                'A feast',
                'Vegetables',
                'A little rice',
                'Fruits'
              ],
              correctAnswer: 2
            },
            {
              question: 'Who was the first visitor to ask for food?',
              answers: [
                'A poor man',
                'A dog',
                'A child',
                'A priest'
              ],
              correctAnswer: 0
            },
            {
              question: 'What did the dog do when it approached Ranti Deva?',
              answers: [
                'It barked loudly',
                'It ran away',
                'It wagged its tail as if begging for food',
                'It bit him'
              ],
              correctAnswer: 2
            },
            {
              question: 'How did Ranti Deva feel after giving away all his food?',
              answers: [
                'Angry and frustrated',
                'Sad and hungry',
                'Contented and happy',
                'Worried and anxious'
              ],
              correctAnswer: 2
            },
            {
              question: 'What enabled Ranti Deva to give away all his food so easily?',
              answers: [
                'He wasn\'t really hungry',
                'He could see God in all beings through his prayers and austerities',
                'He had more food hidden',
                'He didn\'t care about himself'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did the Lord say when He appeared to Ranti Deva?',
              answers: [
                'He was angry with him',
                'He was pleased because Ranti Deva thought only of others',
                'He wanted him to return to his kingdom',
                'He told him to stop fasting'
              ],
              correctAnswer: 1
            },
            {
              question: 'Whose words does this story remind us of regarding feeding animals?',
              answers: [
                'Sri Ramakrishna',
                'Swami Vivekānanda',
                'Mother Sarada',
                'Lord Krishna'
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: 'sambandar-child-saint',
        title: 'Sambandar: The Child Saint',
        description: 'Learn about the inspiring story of Sambandar, the child saint who received divine wisdom from Lord Shiva and Mother Parvati',
        content: `
          <h2>Sambandar: The Child Saint</h2>
          <div class="text-center mb-6">
            <img src="/pics/sambandar.jpg" alt="Sambandar, the child saint, blessed by Lord Shiva and Mother Parvati" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Sambandar - the child saint who sang divine songs in praise of Lord Shiva</p>
          </div>

          <p>India has given us many children who were great lovers of God. We have already learned about Prahlada and his deep love for God. Another such child saint was Sambandar, whose story shows us that divine grace can bless even the youngest devotees.</p>

          <h3>The Holy Family</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Sambandar was a great saint who lived in South India. His father's name was Sivapadahrdayar and his mother's name was Bhagavatiyar.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Devoted Parents</h4>
              <p class="mb-3">Sambandar's parents worshipped Lord Shiva with great devotion. They were kind and served people with love.</p>
              <p>Their home was filled with spiritual atmosphere, prayers, and service to others, creating the perfect environment for a future saint to be born.</p>
            </div>
          </div>

          <h3>The Temple Visit</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">A Day That Changed Everything</h4>
            <p class="mb-4">One day, when Sambandar was only three years old, his father took him to a temple dedicated to Lord Shiva.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Sacred Pool</h4>
              <p class="mb-3">The temple had a sacred pool in which devotees could bathe before entering the holy grounds.</p>
              <p>Sambandar's father left the baby on the steps of the pool and went into the temple grounds to offer his prayers.</p>
            </div>
          </div>

          <h3>The Child's Cry</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">After a short while, little Sambandar began to cry for his father, but his father could not hear him from inside the temple.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Divine Ears</h4>
              <p class="mb-3">Though his earthly father could not hear him, Lord Shiva and Mother Parvati heard the baby's cry.</p>
              <p class="font-medium">God always listens to the calls of His children, especially the innocent cries of little ones.</p>
            </div>
          </div>

          <h3>Divine Visitors</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Lord Shiva and Mother Parvati, moved by compassion, came to the child to comfort him.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Universal Mother's Care</h4>
              <p class="mb-3">Thinking the child might be hungry, Mother Parvati, who is the Mother of the Universe, gave Sambandar milk in a golden cup.</p>
              <p>This was no ordinary milk, but divine nectar that would transform the child's consciousness forever.</p>
            </div>
          </div>

          <h3>Divine Play and Blessing</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Celestial Childhood</h4>
            <p class="mb-4">The child drank the divine milk and happily played with Lord Shiva and Mother Parvati.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Gift of Wisdom</h4>
              <p class="mb-3">During this divine encounter, Lord Shiva and Mother Parvati blessed Sambandar with divine wisdom and knowledge.</p>
              <p class="font-medium">God always takes care of His children, especially those who are pure of heart.</p>
            </div>
          </div>

          <h3>The Father's Return</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">When Sivapadahrdayar returned from his prayers, he was amazed to see something extraordinary.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Mysterious Milk</h4>
              <p class="mb-3">He saw milk trickling from the child's mouth. Puzzled, he asked, <span class="italic">"Who gave you milk to drink?"</span></p>
              <p>The father was bewildered because he had left no milk with the child, and there was no one else around.</p>
            </div>
          </div>

          <h3>The First Divine Song</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Young Sambandar's response was beyond anything his father could have imagined.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Pointing to the Divine</h4>
              <p class="mb-3">The three-year-old pointed to the sky in the direction of the temple, where Lord Shiva and Mother Parvati were seated.</p>
              <p>Then, to everyone's amazement, he sang a beautiful song in praise of them, filled with profound spiritual wisdom.</p>
            </div>
          </div>

          <h3>The Birth of a Saint-Poet</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Divine Inspiration</h4>
            <p class="mb-4">From that day forward, Sambandar sang many inspiring songs praising Lord Shiva and Mother Parvati.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Tirugnana Sambandar</h4>
              <p class="mb-3">Because his songs were full of divine knowledge and wisdom, he came to be called <strong>Tirugnana Sambandar</strong>.</p>
              <div class="bg-spiritual-50 p-3 rounded-lg mt-3">
                <p><strong>Tiru</strong> = Sacred/Holy</p>
                <p><strong>Gnana</strong> = Divine Knowledge/Wisdom</p>
                <p><strong>Sambandar</strong> = His name</p>
                <p class="font-medium mt-2">Together: "The Sacred One with Divine Wisdom"</p>
              </div>
            </div>
          </div>

          <h3>The Legacy of Divine Songs</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <h4 class="font-semibold mb-3">Devotional Poetry</h4>
            <p class="mb-4">Sambandar's hymns, known as Tevaram, are considered among the greatest devotional poetry in Tamil literature.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Spiritual Impact</h4>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>His songs spread the love of Lord Shiva throughout South India</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>They are still sung in temples today</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>They inspire devotees to love God with pure hearts</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>They show that age is no barrier to spiritual realization</span>
                </li>
              </ul>
            </div>
          </div>

          <h3>Lessons from Sambandar's Life</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <h4 class="font-semibold mb-3">What We Can Learn</h4>
            <div class="space-y-3">
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Divine Grace:</strong> God's blessings can come to anyone, regardless of age</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Pure Hearts:</strong> Children's innocent love attracts divine attention</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Spiritual Environment:</strong> Growing up in a devotional family helps spiritual growth</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Divine Care:</strong> God always takes care of His devotees</p>
              </div>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg text-center">
            <h4 class="font-semibold text-lg mb-2">The Message of Sambandar</h4>
            <p>Sambandar's story teaches us that divine wisdom and love can bless even the youngest among us. His life shows that when we approach God with pure hearts and innocent faith, we can receive extraordinary blessings and become instruments of divine love in the world.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'What was the name of Sambandar\'s father?',
              answers: [
                'Sivapadahrdayar',
                'Bhagavatiyar',
                'Tirugnana',
                'Parvati'
              ],
              correctAnswer: 0
            },
            {
              question: 'What was the name of Sambandar\'s mother?',
              answers: [
                'Parvati',
                'Bhagavatiyar',
                'Sivapadahrdayar',
                'Ganga'
              ],
              correctAnswer: 1
            },
            {
              question: 'Which deity did Sambandar\'s parents worship?',
              answers: [
                'Lord Vishnu',
                'Lord Krishna',
                'Lord Shiva',
                'Lord Rama'
              ],
              correctAnswer: 2
            },
            {
              question: 'How old was Sambandar when he visited the temple?',
              answers: [
                'Two years old',
                'Three years old',
                'Four years old',
                'Five years old'
              ],
              correctAnswer: 1
            },
            {
              question: 'Where did Sambandar\'s father leave him at the temple?',
              answers: [
                'Inside the temple',
                'On the steps of the sacred pool',
                'In the prayer hall',
                'Near the temple entrance'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who heard Sambandar crying when his father couldn\'t?',
              answers: [
                'Other devotees',
                'The temple priest',
                'Lord Shiva and Mother Parvati',
                'His mother'
              ],
              correctAnswer: 2
            },
            {
              question: 'What did Mother Parvati give to Sambandar?',
              answers: [
                'Food in a silver plate',
                'Water in a clay pot',
                'Milk in a golden cup',
                'Fruits in a basket'
              ],
              correctAnswer: 2
            },
            {
              question: 'What special gift did Lord Shiva and Mother Parvati give Sambandar?',
              answers: [
                'Golden jewelry',
                'Divine wisdom and knowledge',
                'Magical powers',
                'A beautiful voice'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did Sambandar do when his father asked who gave him milk?',
              answers: [
                'He remained silent',
                'He pointed to the sky and sang a beautiful song',
                'He cried louder',
                'He pointed to other people'
              ],
              correctAnswer: 1
            },
            {
              question: 'What name was Sambandar given because of his divine songs?',
              answers: [
                'Tirugnana Sambandar',
                'Shiva Sambandar',
                'Parvati Sambandar',
                'Divine Sambandar'
              ],
              correctAnswer: 0
            }
          ]
        }
      },
      {
        id: 'introduction-sri-ramakrishna',
        title: 'An Introduction to Sri Ramakrishna',
        description: 'Learn about the birth and early life of Sri Ramakrishna, the great spiritual teacher',
        content: `
          <h2>An Introduction to Sri Ramakrishna</h2>
          <div class="text-center mb-6">
            <img src="/pics/sri-ramakrishna-intro.jpg" alt="Sri Ramakrishna, the great spiritual teacher" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Sri Ramakrishna - the divine incarnation who taught the harmony of all religions</p>
          </div>

          <p>Sri Ramakrishna was one of the greatest spiritual teachers the world has ever known. His life story shows us how God can be born among us to guide humanity toward truth and love.</p>

          <h3>The Holy Parents</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Chandrāmani Devi and Kshudirām were Brāhmins who lived a simple, God-centered life.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Simple and Devoted</h4>
              <p class="mb-3">They were poor in material wealth but rich in devotion. They lived in Kamārpukur, in West Bengal.</p>
              <p class="font-medium">Most importantly, they loved God with all their hearts and spent their lives in prayer and service.</p>
            </div>
          </div>

          <h3>The Divine Promise</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">God's Plan Revealed</h4>
            <p class="mb-4">One day, something extraordinary happened that would change the course of spiritual history.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Sacred Dream</h4>
              <p class="mb-3">God came in Kshudirām's dream and said, <span class="italic">'I want to be born as your son.'</span></p>
              <p>This was not an ordinary dream, but a divine vision announcing the coming of a great soul.</p>
            </div>
          </div>

          <h3>The Humble Response</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Kshudirām's response showed his humility and pure heart.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">A Father's Concern</h4>
              <p class="mb-3">Kshudirām said with great humility, <span class="italic">'I am too poor. How can I feed you?'</span></p>
              <p>Even when blessed with such a divine promise, he worried about his ability to provide properly.</p>
            </div>
          </div>

          <h3>God's Loving Assurance</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">God's response revealed the divine nature of love and simplicity.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Divine Simplicity</h4>
              <p class="mb-3">God said with infinite love, <span class="italic">'I will eat whatever you give me.'</span></p>
              <p class="font-medium">This shows that God values love and devotion more than material wealth.</p>
            </div>
          </div>

          <h3>The Sacred Birth</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Divine Incarnation</h4>
            <p class="mb-4">The divine promise was fulfilled on a blessed day in 1836.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">February 18, 1836</h4>
              <p class="mb-3">On 18 February 1836, God was born as their little son in the humble home of Kshudirām and Chandrāmani.</p>
              <p class="font-medium">They called him Gadādhar, though the world would later know him as Sri Ramakrishna.</p>
            </div>
          </div>

          <h3>The Child's Divine Nature</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">From his earliest years, Gadādhar showed signs of his divine nature.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Love for the Divine</h4>
              <p class="mb-3">Gadādhar loved to hear about God more than anything else.</p>
              <p>Stories of divine love and spiritual heroes filled his young heart with joy and inspiration.</p>
            </div>
          </div>

          <h3>Artistic Expression of Devotion</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Young Gadādhar expressed his love for God through creative activities.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Sacred Art</h4>
              <p class="mb-3">He made beautiful murtis (statues) of gods and goddesses with his own hands.</p>
              <p>These were not mere toys but expressions of his deep devotion and artistic talent.</p>
            </div>
          </div>

          <h3>Divine Drama</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Acting as the Divine</h4>
            <p class="mb-4">Gadādhar's play was different from that of ordinary children.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Sacred Roles</h4>
              <p class="mb-3">He loved to act as Krishna and Rādhā, or as Rāma and Sītā.</p>
              <p class="font-medium">When he played these roles, he would become so absorbed that he seemed to actually become the divine characters.</p>
            </div>
          </div>

          <h3>The Temple Priest</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">As Gadādhar grew up, his spiritual calling became clear.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Service at Dakshineswar</h4>
              <p class="mb-3">He became a priest at the Kāli temple in Dakshineswar.</p>
              <p class="mb-3">Dakshineswar is in Kolkata, in India, and this temple would become famous throughout the world.</p>
              <p class="font-medium">Here, his intense spiritual practices would transform him into one of the greatest saints of all time.</p>
            </div>
          </div>

          <h3>The Intense Yearning</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">At the temple, Gadādhar's spiritual intensity reached extraordinary heights.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Crying for God</h4>
              <p class="mb-3">Gadādhar yearned and cried for God with such intensity that it moved everyone who saw him.</p>
              <p class="mb-3">He wanted to see God directly, not just worship images or hear stories.</p>
              <p class="font-medium">His longing was so pure and intense that it would soon be answered.</p>
            </div>
          </div>

          <h3>The Ultimate Prayer</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Complete Surrender</h4>
            <p class="mb-4">Gadādhar's desperation to see God led him to make the ultimate prayer.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Final Appeal</h4>
              <p class="mb-3">He said with complete sincerity, <span class="italic">'O God, if you do not show me who you are, I will kill myself.'</span></p>
              <p class="font-medium">This was not a threat but the cry of a soul that could not live without divine realization.</p>
            </div>
          </div>

          <h3>The Divine Vision</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">God could not ignore such pure and intense devotion.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Answer to Prayer</h4>
              <p class="mb-3">God then appeared to him in a divine vision that transformed his life forever.</p>
              <p class="font-medium">From that moment, Gadādhar became Sri Ramakrishna, the great spiritual teacher known throughout the world.</p>
            </div>
          </div>

          <h3>Marriage to Sri Sāradā Devi</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Sri Ramakrishna's life was blessed with a perfect spiritual companion.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Holy Mother</h4>
              <p class="mb-3">Sri Rāmakrishna was married to Sri Sāradā Devi, who became known as the Holy Mother.</p>
              <p>Their marriage was a perfect example of spiritual partnership and divine love.</p>
            </div>
          </div>

          <h3>The Universal Teaching</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Great Message</h4>
            <p class="mb-4">Sri Ramakrishna's most important teaching came from his direct experience of different religions.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Many Paths, One Goal</h4>
              <p class="mb-3">Sri Rāmakrishna tells us that God has many names and forms.</p>
              <p class="mb-3">In whatever way we worship God, we can realise Him.</p>
              <p class="font-medium">We must be sincere. We must love God.</p>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg text-center">
            <h4 class="font-semibold text-lg mb-2">The Divine Life</h4>
            <p>Sri Ramakrishna's life shows us that God can be born among us to guide humanity. From his humble birth in a poor family to his realization as one of the greatest spiritual teachers, his life teaches us that sincere love and devotion can lead anyone to the highest spiritual realization. His message of religious harmony and universal love continues to inspire millions around the world.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'What were the names of Sri Ramakrishna\'s parents?',
              answers: [
                'Kshudirām and Chandrāmani Devi',
                'Gadādhar and Sāradā',
                'Rāma and Sītā',
                'Krishna and Rādhā'
              ],
              correctAnswer: 0
            },
            {
              question: 'Where did Sri Ramakrishna\'s parents live?',
              answers: [
                'Dakshineswar',
                'Kolkata',
                'Kamārpukur, West Bengal',
                'Mumbai'
              ],
              correctAnswer: 2
            },
            {
              question: 'What did God say to Kshudirām in his dream?',
              answers: [
                'Build me a temple',
                'I want to be born as your son',
                'Worship me daily',
                'Go on a pilgrimage'
              ],
              correctAnswer: 1
            },
            {
              question: 'What was Kshudirām\'s concern when God wanted to be born as his son?',
              answers: [
                'He was too old',
                'He was too poor and worried about how to feed God',
                'He didn\'t want children',
                'He lived too far from temples'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did God reply when Kshudirām worried about being poor?',
              answers: [
                'I will make you rich',
                'Don\'t worry about money',
                'I will eat whatever you give me',
                'I don\'t need food'
              ],
              correctAnswer: 2
            },
            {
              question: 'When was Sri Ramakrishna born?',
              answers: [
                '18 February 1836',
                '18 March 1836',
                '18 February 1835',
                '18 April 1836'
              ],
              correctAnswer: 0
            },
            {
              question: 'What was Sri Ramakrishna\'s childhood name?',
              answers: [
                'Ramakrishna',
                'Gadādhar',
                'Kshudirām',
                'Gadadhar'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did young Gadādhar love to do?',
              answers: [
                'Play with toys',
                'Make beautiful murtis of gods and goddesses',
                'Study mathematics',
                'Play sports'
              ],
              correctAnswer: 1
            },
            {
              question: 'Where did Gadādhar become a priest?',
              answers: [
                'Kamārpukur temple',
                'Kāli temple in Dakshineswar',
                'A temple in his village',
                'Kolkata main temple'
              ],
              correctAnswer: 1
            },
            {
              question: 'What was Sri Ramakrishna\'s main teaching about God?',
              answers: [
                'God has only one name',
                'Only one religion is true',
                'God has many names and forms, and can be realized through any sincere path',
                'God cannot be reached by humans'
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      {
        id: 'childhood-days-sri-ramakrishna',
        title: 'Childhood Days of Sri Ramakrishna',
        description: 'Learn about the beautiful village life and early spiritual experiences of young Gadai',
        content: `
          <h2>Childhood Days of Sri Ramakrishna</h2>
          <div class="text-center mb-6">
            <img src="/pics/gadai-childhood.jpg" alt="Young Gadai in the beautiful village of Kamarpukur" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Young Gadai growing up in the peaceful village of Kamārpukur</p>
          </div>

          <p>The childhood of Sri Ramakrishna, known then as Gadai, was spent in a beautiful village that shaped his love for God and nature. His early years show us how a divine soul grows in an environment of love, devotion, and simplicity.</p>

          <h3>The Beautiful Village of Kamārpukur</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Kamārpukur is a small village in India, about seventy miles from Kolkata.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">A Picture of Rural Beauty</h4>
              <p class="mb-3">Many paddy fields and tall palm trees made the village a beautiful place.</p>
              <p class="mb-3">Most of the people there earned their living through farming, living simple, honest lives.</p>
              <p class="font-medium">This peaceful, natural environment was the perfect setting for a future saint to grow up.</p>
            </div>
          </div>

          <h3>The Pious Parents</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Kshudirām and Chandrāmani</h4>
            <p class="mb-4">In Kamārpukur there lived a pious couple who would become the parents of a great soul.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Simple but Devoted</h4>
              <p class="mb-3">They were Kshudirām and Chandrāmani. They were poor but very honest and devoted to God.</p>
              <p class="mb-3">They spent most of their time in worshipping God, making their home a sacred place.</p>
              <p class="font-medium">The whole village respected them for their purity, honesty, and devotion.</p>
            </div>
          </div>

          <h3>Divine Visions</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Both parents were blessed with extraordinary spiritual experiences that prepared them for their divine mission.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Sacred Promise</h4>
              <p class="mb-3">Both Kshudirām and Chandrāmani had divine visions in which God appeared to them.</p>
              <p class="mb-3">God said to them, <span class="italic">'I would be born as your son.'</span></p>
              <p class="font-medium">They were very happy about this divine promise and prepared their hearts to receive the blessed child.</p>
            </div>
          </div>

          <h3>The Birth of Gadai</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">The divine promise was fulfilled on a blessed morning in 1836.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Sacred Arrival</h4>
              <p class="mb-3">Shortly, in the early morning of the 18th February 1836, Chandrāmani gave birth to a beautiful baby boy.</p>
              <p class="mb-3">He was named Gadādhar, though people lovingly called him Gadai.</p>
              <p class="font-medium">From the moment of his birth, there was something special about this child that everyone could sense.</p>
            </div>
          </div>

          <h3>The Beloved Child</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Universal Love</h4>
            <p class="mb-4">As Gadai grew up, his special nature became evident to everyone around him.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Darling of All</h4>
              <p class="mb-3">As Gadai grew up he became the darling of his parents.</p>
              <p class="mb-3">The whole village grew to love him for his sweet nature and innocent charm.</p>
              <p class="font-medium">There was something about this child that drew people's hearts toward him naturally.</p>
            </div>
          </div>

          <h3>Learning Sacred Stories</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Gadai's spiritual education began early through the loving guidance of his father.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Stories of Divine Love</h4>
              <p class="mb-3">Kshudirām would tell Gadai the stories about Rāma, Krishna, and Prahlāda.</p>
              <p class="mb-3">Gadai would listen with great attention, absorbing every word with deep interest.</p>
              <p class="font-medium">From these sacred stories he learnt many new lessons about devotion, courage, and divine love.</p>
            </div>
          </div>

          <h3>A Helpful Nature</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Even as a young child, Gadai showed remarkable qualities of service and helpfulness.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Service to Parents</h4>
              <p class="mb-3">Gadai was very helpful. He helped his parents in whatever way he could.</p>
              <p class="mb-3">He would fetch water and pluck flowers for the daily worship.</p>
              <p class="font-medium">His eagerness to help in spiritual activities showed his natural inclination toward the divine.</p>
            </div>
          </div>

          <h3>Attraction to Holy Men</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Recognizing Spiritual Greatness</h4>
            <p class="mb-4">One of the most remarkable aspects of Gadai's childhood was his natural attraction to spiritual people.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Serving the Saints</h4>
              <p class="mb-3">Whenever holy men came to the village, young Gadai would be attracted to them.</p>
              <p class="mb-3">He would happily serve them with great devotion and joy.</p>
              <ul class="space-y-2 mt-3">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>He collected wood for them</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>He fetched them clean water for drinking</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>He did other small services with love</span>
                </li>
              </ul>
            </div>
          </div>

          <h3>Learning from Holy Men</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">These encounters with spiritual teachers provided Gadai with profound lessons.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Sacred Teachings</h4>
              <p class="mb-3">The holy men would tell him about God and the need to love God.</p>
              <p class="font-medium">These teachings fell on fertile ground in young Gadai's pure heart, deepening his natural love for the Divine.</p>
            </div>
          </div>

          <h3>Creative Spiritual Expression</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Gadai's free time was spent in activities that expressed his spiritual nature.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Sacred Art and Drama</h4>
              <p class="mb-3">Gadai would not be idle. In his spare time he would mould images of gods and goddesses.</p>
              <p class="mb-3">He would also watch plays on the life of Rāma and Krishna with great interest.</p>
              <p class="font-medium">Sometimes he would also enact these parts himself, showing his natural dramatic talent.</p>
            </div>
          </div>

          <h3>Extraordinary Memory</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Divine Gift of Remembrance</h4>
            <p class="mb-4">Gadai possessed remarkable abilities that set him apart from other children.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Perfect Recall</h4>
              <p class="mb-3">Gadai had a very powerful memory. He would remember what the actors said and repeat it to others.</p>
              <p class="font-medium">This gift allowed him to absorb and share spiritual teachings with perfect accuracy.</p>
            </div>
          </div>

          <h3>The Foundation of Greatness</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Gadai's childhood experiences laid the foundation for his future spiritual greatness.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Natural Progression</h4>
              <p class="mb-3">Thus Gadai's childhood was full of the thoughts of God and divine activities.</p>
              <p class="font-medium">When he grew up, no wonder he became a man of God or Godman - his entire childhood had prepared him for this destiny.</p>
            </div>
          </div>

          <h3>Lessons from Gadai's Childhood</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <h4 class="font-semibold mb-3">What We Can Learn</h4>
            <div class="space-y-3">
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Environment Matters:</strong> Growing up in a spiritual environment nurtures divine qualities</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Service Attitude:</strong> Helping others, especially spiritual people, develops character</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Sacred Stories:</strong> Listening to spiritual stories shapes our values and aspirations</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Creative Expression:</strong> Art and drama can be vehicles for spiritual expression</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Natural Attraction:</strong> Pure souls are naturally drawn to spiritual people and activities</p>
              </div>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg text-center">
            <h4 class="font-semibold text-lg mb-2">The Perfect Childhood</h4>
            <p>Gadai's childhood in Kamārpukur shows us how a divine soul develops in an environment of love, devotion, and simplicity. His natural attraction to spiritual activities, his helpful nature, and his absorption in divine stories all prepared him for his future role as one of the world's greatest spiritual teachers. His childhood reminds us that spiritual greatness often begins with simple acts of love and service.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'Where is Kamārpukur located?',
              answers: [
                'Near Mumbai',
                'About seventy miles from Kolkata',
                'In South India',
                'Near Delhi'
              ],
              correctAnswer: 1
            },
            {
              question: 'What made Kamārpukur a beautiful place?',
              answers: [
                'Big buildings and roads',
                'Many paddy fields and tall palm trees',
                'Mountains and rivers',
                'Markets and shops'
              ],
              correctAnswer: 1
            },
            {
              question: 'How did most people in Kamārpukur earn their living?',
              answers: [
                'Through business',
                'Through farming',
                'Through teaching',
                'Through crafts'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did God promise Kshudirām and Chandrāmani in their visions?',
              answers: [
                'They would become rich',
                'They would live long lives',
                'I would be born as your son',
                'They would build a temple'
              ],
              correctAnswer: 2
            },
            {
              question: 'What was young Gadai lovingly called by people?',
              answers: [
                'Gadādhar',
                'Gadai',
                'Krishna',
                'Rāma'
              ],
              correctAnswer: 1
            },
            {
              question: 'What stories did Kshudirām tell Gadai?',
              answers: [
                'Folk tales and fairy stories',
                'Stories about Rāma, Krishna, and Prahlāda',
                'Historical stories',
                'Adventure stories'
              ],
              correctAnswer: 1
            },
            {
              question: 'How did Gadai help his parents?',
              answers: [
                'He cooked food for them',
                'He fetched water and plucked flowers for worship',
                'He earned money',
                'He cleaned the house'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did Gadai do when holy men came to the village?',
              answers: [
                'He avoided them',
                'He was attracted to them and served them happily',
                'He was afraid of them',
                'He ignored them'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did Gadai do in his spare time?',
              answers: [
                'Played with toys',
                'Moulded images of gods and goddesses',
                'Slept',
                'Wandered around aimlessly'
              ],
              correctAnswer: 1
            },
            {
              question: 'Why did Gadai become a man of God when he grew up?',
              answers: [
                'He was forced to',
                'His childhood was full of thoughts of God',
                'He had no other choice',
                'He wanted to be famous'
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: 'gadai-love-for-nature',
        title: 'Gadai\'s Love for Nature',
        description: 'Learn about young Gadai\'s deep spiritual connection with nature and his divine experiences in natural beauty',
        content: `
          <h2>Gadai's Love for Nature</h2>
          <div class="text-center mb-6">
            <img src="/pics/gadai-nature.jpg" alt="Young Gadai absorbed in the beauty of nature" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Gadai experiencing divine consciousness through nature's beauty</p>
          </div>

          <p>This beautiful story shows us how young Gadai's pure heart could see the Divine in nature's beauty. His experiences teach us that God can be found everywhere - even in the simple, beautiful scenes around us.</p>

          <h3>A Heart Open to Beauty</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Gadai had a deep love for nature that was different from ordinary appreciation of beauty.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Spiritual Sensitivity</h4>
              <p class="mb-3">Gadai had a great fascination for the beautiful scenes he saw around him.</p>
              <p class="mb-3">His heart would just open up when he saw anything unusually beautiful.</p>
              <p class="font-medium">This was not mere aesthetic appreciation, but a spiritual response to divine beauty manifested in nature.</p>
            </div>
          </div>

          <h3>Learning from Nature</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Absorbing Divine Harmony</h4>
            <p class="mb-4">Gadai's relationship with nature was one of deep learning and spiritual absorption.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Art of Absorption</h4>
              <p class="mb-3">He learned to absorb the beauty and harmony in nature and be happy at it.</p>
              <p class="font-medium">This ability to absorb and become one with beauty was a sign of his spiritual greatness.</p>
            </div>
          </div>

          <h3>The Evening Walk</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">One evening, an ordinary walk became an extraordinary spiritual experience for young Gadai.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Setting</h4>
              <p class="mb-3">One evening he was walking along the narrow ridges of a rice field.</p>
              <p class="mb-3">He was eating some puffed rice, enjoying the simple pleasure of an evening stroll.</p>
              <p class="font-medium">Little did he know that this simple walk would lead to a profound spiritual experience.</p>
            </div>
          </div>

          <h3>The Beautiful Sky</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">As Gadai walked, his attention was drawn to the magnificent evening sky.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Nature's Canvas</h4>
              <p class="mb-3">He was watching the dark blue clouds in the sky, admiring their beauty and formation.</p>
              <p>The evening sky presented a magnificent canvas of colors and shapes that captured his spiritual attention.</p>
            </div>
          </div>

          <h3>The Vision of the Cranes</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Divine Beauty Revealed</h4>
            <p class="mb-4">Suddenly, something happened that transformed this ordinary evening into a moment of divine revelation.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Breathtaking Sight</h4>
              <p class="mb-3">Suddenly dashing across the clouds was a flock of cranes, white as milk.</p>
              <p class="mb-3">The contrast was stunning - pure white birds against the dark blue evening clouds.</p>
              <p class="font-medium">The beauty of that sight made him delightfully happy beyond ordinary joy.</p>
            </div>
          </div>

          <h3>Divine Absorption</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">What happened next showed Gadai's extraordinary spiritual nature.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Becoming One with Beauty</h4>
              <p class="mb-3">He became one with that beauty and harmony and lost all external consciousness.</p>
              <p class="mb-3">This was not fainting or illness, but a state of spiritual absorption called samādhi.</p>
              <p class="font-medium">In this state, the individual consciousness merges with the universal consciousness experienced through beauty.</p>
            </div>
          </div>

          <h3>The Physical Effect</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">The intensity of this spiritual experience had a physical manifestation.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Complete Absorption</h4>
              <p class="mb-3">He fell down and lay there, completely absorbed in the divine experience.</p>
              <p>His body became still while his consciousness was merged with the infinite beauty he had witnessed.</p>
            </div>
          </div>

          <h3>Friends to the Rescue</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Concern and Care</h4>
            <p class="mb-4">Gadai's friends, not understanding what had happened, became concerned for his welfare.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Bringing Him Back</h4>
              <p class="mb-3">Later some friends came that way and saw him lying there.</p>
              <p class="mb-3">They picked him up and took him to his parents who were getting worried about him.</p>
              <p class="font-medium">His friends' care showed the love and concern the community had for this special child.</p>
            </div>
          </div>

          <h3>Seeing Divine Glory</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">What made Gadai's experience special was his ability to see beyond ordinary beauty.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Spiritual Vision</h4>
              <p class="mb-3">Even as a child he saw divine glory in the beauty and harmony in nature.</p>
              <p class="mb-3">He learned to admire and love it with a depth that went beyond surface appreciation.</p>
              <p class="font-medium">This ability to see God in nature's beauty was a sign of his spiritual greatness.</p>
            </div>
          </div>

          <h3>The Poet's Soul</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Gadai's responses to beauty showed qualities usually found in great artists and thinkers.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Extraordinary Imagination</h4>
              <p class="mb-3">Even simple sights awakened in him wonderful imagination as in grown-up poets and philosophers.</p>
              <p class="font-medium">His child's heart contained the sensitivity and depth usually found only in great spiritual artists.</p>
            </div>
          </div>

          <h3>Misunderstanding from Others</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">When Greatness is Misunderstood</h4>
            <p class="mb-4">Not everyone could understand Gadai's extraordinary spiritual experiences.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Lack of Understanding</h4>
              <p class="mb-3">People who could not understand this sometimes thought he was sick.</p>
              <p class="font-medium">This shows how spiritual experiences can be misunderstood by those who haven't had similar experiences.</p>
            </div>
          </div>

          <h3>Parents' Wisdom</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Fortunately, Gadai's parents had the spiritual wisdom to understand their son's special nature.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Recognizing the Divine Gift</h4>
              <p class="mb-3">But his parents knew that this was a very rare God-given gift.</p>
              <p class="mb-3">They tried in every way to see that their child came to no harm.</p>
              <p class="font-medium">Their understanding and protection allowed Gadai's spiritual nature to develop safely.</p>
            </div>
          </div>

          <h3>Lessons from Gadai's Experience</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <h4 class="font-semibold mb-3">What We Can Learn</h4>
            <div class="space-y-3">
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Divine in Nature:</strong> God's beauty can be experienced through natural scenes</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Open Hearts:</strong> Pure hearts can see divine glory in simple, beautiful sights</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Spiritual Absorption:</strong> Deep appreciation of beauty can lead to spiritual experiences</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Understanding Differences:</strong> Spiritual experiences may be misunderstood by others</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Protective Love:</strong> Wise parents recognize and protect their children's spiritual gifts</p>
              </div>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg">
            <h4 class="font-semibold mb-2">Meanings</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Philosophers:</strong> Great thinkers who seek deep understanding of life and reality</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Consciousness:</strong> Awareness of oneself and surroundings</p>
              </div>
            </div>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'What kind of love did Gadai have for nature?',
              answers: [
                'Ordinary appreciation',
                'A deep spiritual love and fascination',
                'Fear of natural forces',
                'Indifference to beauty'
              ],
              correctAnswer: 1
            },
            {
              question: 'What happened to Gadai\'s heart when he saw beautiful things?',
              answers: [
                'It would close up',
                'It would just open up',
                'It would beat faster',
                'Nothing special happened'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did Gadai learn to do with nature\'s beauty?',
              answers: [
                'Ignore it completely',
                'Absorb the beauty and harmony and be happy',
                'Fear its power',
                'Take pictures of it'
              ],
              correctAnswer: 1
            },
            {
              question: 'Where was Gadai walking when he had his spiritual experience?',
              answers: [
                'On a mountain path',
                'Along narrow ridges of a rice field',
                'Through a forest',
                'On a busy road'
              ],
              correctAnswer: 1
            },
            {
              question: 'What was Gadai eating during his walk?',
              answers: [
                'Fruits',
                'Puffed rice',
                'Sweets',
                'Bread'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did Gadai see in the sky that moved him so deeply?',
              answers: [
                'A rainbow',
                'A flock of cranes, white as milk, against dark blue clouds',
                'Lightning',
                'The moon'
              ],
              correctAnswer: 1
            },
            {
              question: 'What happened to Gadai when he saw the beautiful sight?',
              answers: [
                'He ran home quickly',
                'He became one with the beauty and lost external consciousness',
                'He became frightened',
                'He called his friends'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did some people think when they couldn\'t understand Gadai\'s experiences?',
              answers: [
                'He was very intelligent',
                'He was sick',
                'He was playing games',
                'He was showing off'
              ],
              correctAnswer: 1
            },
            {
              question: 'How did Gadai\'s parents view his unusual experiences?',
              answers: [
                'They were worried and tried to stop them',
                'They knew it was a rare God-given gift',
                'They ignored them completely',
                'They thought he was pretending'
              ],
              correctAnswer: 1
            },
            {
              question: 'What does this story teach us about seeing God in nature?',
              answers: [
                'God cannot be found in nature',
                'Only adults can see God in nature',
                'Pure hearts can see divine glory in natural beauty',
                'Nature has nothing to do with spirituality'
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      {
        id: 'gadai-playing-shiva',
        title: 'Gadai Playing Shiva',
        description: 'Learn about young Gadai\'s divine experience while playing the role of Lord Shiva',
        content: `
          <h2>Gadai Playing Shiva</h2>
          <div class="text-center mb-6">
            <img src="/pics/gadai-shiva.jpg" alt="Young Gadai dressed as Lord Shiva in divine absorption" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Gadai becoming one with Lord Shiva through divine devotion</p>
          </div>

          <p>This beautiful story shows us how young Gadai's deep devotion to God could transform even a simple drama into a profound spiritual experience. It demonstrates the power of sincere devotion and complete absorption in the Divine.</p>

          <h3>The Sacred Night of Shivarātri</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">It was Shivarātri, the night for worshipping Shiva - one of the most sacred nights in the Hindu calendar.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Gadai's Devotion</h4>
              <p class="mb-3">Gadai had fasted during the day, following the traditional observance of this holy festival.</p>
              <p>Now he sat to worship the great god Shiva, beginning his night-long prayers and meditation.</p>
            </div>
          </div>

          <h3>An Unexpected Request</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Friends Come Calling</h4>
            <p class="mb-4">The worship was just finished when his friends came and called him with an urgent request.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Emergency</h4>
              <p class="mb-3">"Come, Gadai, you will have to play Shiva in the drama at Laha Babu's house. The boy who was to play this role is sick."</p>
              <p>The friends needed Gadai to step in at the last moment for an important religious drama.</p>
            </div>
          </div>

          <h3>Gadai's Dilemma</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Gadai faced a difficult choice between his personal worship and helping his friends.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Conflict</h4>
              <p class="mb-3">Gadai said, "How can I go? I still have to worship Shiva three times more."</p>
              <p>According to tradition, devotees perform multiple worship sessions throughout Shivarātri night.</p>
            </div>
          </div>

          <h3>Wisdom from Friends</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">His friends offered a profound spiritual insight that would change Gadai's perspective.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">A Different Kind of Worship</h4>
              <p class="mb-3">The friends said, "It does not matter. If you play the role of Shiva you will have to keep your mind on God throughout the drama. That will be as good as worshipping."</p>
              <p class="font-medium">Gadai understood that this was true - sincere devotion in any form is worship.</p>
            </div>
          </div>

          <h3>The Divine Transformation</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Becoming Lord Shiva</h4>
            <p class="mb-4">Gadai agreed to help and prepared for the role with great care and devotion.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Sacred Costume</h4>
              <p class="mb-3">He dressed as Shiva and appeared on the stage:</p>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>He wore a tiger-skin, as Lord Shiva traditionally does</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>His hair was long and loose, flowing like Shiva's</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>A rosary was hung around his neck</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>He took a trident in his hand</span>
                </li>
              </ul>
            </div>
          </div>

          <h3>The Audience's Wonder</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">When Gadai appeared on stage, something extraordinary happened.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Divine Presence</h4>
              <p class="mb-3">The whole audience looked at him in wonder - he looked like the real Shiva.</p>
              <p class="font-medium">It was as if God himself had appeared before them.</p>
            </div>
          </div>

          <h3>The Mysterious Stillness</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">But then something unexpected happened that puzzled everyone present.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Complete Absorption</h4>
              <p class="mb-3">But what was the matter? Gadai was not moving or speaking. What had happened to him?</p>
              <p>The audience waited, wondering why the actor was not performing his role.</p>
            </div>
          </div>

          <h3>The Divine Experience</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Becoming One with God</h4>
            <p class="mb-4">The truth behind Gadai's stillness revealed the depth of his spiritual nature.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Complete Identification</h4>
              <p class="mb-3">He was thinking so deeply about Shiva that he forgot about everything else but Shiva, and became Shiva!</p>
              <p class="font-medium">This was not acting - this was divine absorption, where the devotee becomes one with the deity.</p>
            </div>
          </div>

          <h3>Return to Normal Consciousness</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">The divine experience eventually came to an end, but its impact was profound.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Gradual Awakening</h4>
              <p>After the drama was over, he slowly came back to his senses, returning from the divine realm to ordinary consciousness.</p>
            </div>
          </div>

          <h3>Lessons from This Experience</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <h4 class="font-semibold mb-3">What We Can Learn</h4>
            <div class="space-y-3">
              <div class="bg-white p-3 rounded-lg">
                <p><strong>True Devotion:</strong> When we think deeply about God, we can experience divine presence</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Service as Worship:</strong> Helping others can be as sacred as formal worship</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Divine Absorption:</strong> Complete concentration on God can lead to mystical experiences</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>God's Presence:</strong> The Divine can be experienced anywhere when approached with sincere devotion</p>
              </div>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg">
            <h4 class="font-semibold mb-2">Meanings</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Drama:</strong> Play or theatrical performance</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Trident:</strong> A spear having three sharp points (Lord Shiva's weapon)</p>
              </div>
            </div>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'What sacred night was it when this story took place?',
              answers: [
                'Diwali',
                'Shivarātri',
                'Holi',
                'Dussehra'
              ],
              correctAnswer: 1
            },
            {
              question: 'What had Gadai done during the day before the drama?',
              answers: [
                'He had been playing',
                'He had fasted',
                'He had been studying',
                'He had been working'
              ],
              correctAnswer: 1
            },
            {
              question: 'Why did Gadai\'s friends ask him to play Shiva?',
              answers: [
                'He was the best actor',
                'The boy who was to play this role was sick',
                'He looked like Shiva',
                'He had asked to play the role'
              ],
              correctAnswer: 1
            },
            {
              question: 'What was Gadai\'s initial concern about playing Shiva?',
              answers: [
                'He didn\'t know the lines',
                'He was too tired',
                'He still had to worship Shiva three times more',
                'He didn\'t have a costume'
              ],
              correctAnswer: 2
            },
            {
              question: 'What did his friends say about playing the role of Shiva?',
              answers: [
                'It would be fun',
                'It would make him famous',
                'Keeping his mind on God during the drama would be as good as worshipping',
                'It would be easy'
              ],
              correctAnswer: 2
            },
            {
              question: 'What did Gadai wear as part of his Shiva costume?',
              answers: [
                'A silk robe',
                'A tiger-skin',
                'A golden crown',
                'A white cloth'
              ],
              correctAnswer: 1
            },
            {
              question: 'What weapon did Gadai carry as Shiva?',
              answers: [
                'A sword',
                'A bow and arrow',
                'A trident',
                'A mace'
              ],
              correctAnswer: 2
            },
            {
              question: 'How did the audience react when they saw Gadai as Shiva?',
              answers: [
                'They laughed',
                'They looked at him in wonder, as if God himself had appeared',
                'They were disappointed',
                'They left the theater'
              ],
              correctAnswer: 1
            },
            {
              question: 'Why was Gadai not moving or speaking during the drama?',
              answers: [
                'He forgot his lines',
                'He was scared',
                'He was thinking so deeply about Shiva that he became Shiva',
                'He was feeling sick'
              ],
              correctAnswer: 2
            },
            {
              question: 'When did Gadai come back to his normal senses?',
              answers: [
                'Immediately',
                'After his friends called him',
                'After the drama was over',
                'The next morning'
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      {
        id: 'rani-rasmani-ramakrishna',
        title: 'Rāni Rāsmani and Sri Rāmakrishna',
        description: 'Learn about the devoted queen who built the Dakshineswar temple and her encounter with Sri Ramakrishna',
        content: `
          <h2>Rāni Rāsmani and Sri Rāmakrishna</h2>
          <div class="text-center mb-6">
            <img src="/pics/rani-rasmani-ramakrishna.jpg" alt="Rani Rasmani and Sri Ramakrishna at Dakshineswar temple" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">The devoted queen and the great saint at the sacred Dakshineswar temple</p>
          </div>

          <p>This story teaches us about the importance of keeping our minds focused on God during worship, and shows us the courage of a truthful devotee who accepts correction with humility.</p>

          <h3>Rāni Rāsmani - The Devoted Queen</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Rāni Rāsmani was a rich lady who lived in Kolkata, India. Despite her wealth and status, she remained deeply devoted to God.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">A Heart Full of Devotion</h4>
              <p class="mb-3">Her wealth did not make her proud or forgetful of God. Instead, she used her resources in service of the Divine.</p>
              <p>She spent her time in prayer and always looked for ways to serve God and His devotees.</p>
            </div>
          </div>

          <h3>Mother Kāli's Divine Command</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">A Sacred Vision</h4>
            <p class="mb-4">One day, Mother Kāli appeared to Rāni Rāsmani in a divine vision with a special request.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Divine Request</h4>
              <p class="mb-3">Mother Kāli said to her, 'Do build me a temple.'</p>
              <p class="font-medium">Rāni Rāsmani was very happy about this divine command and immediately set about fulfilling it.</p>
            </div>
          </div>

          <h3>Building the Sacred Temple</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Rāni Rāsmani acted swiftly to fulfill Mother Kāli's wish.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Perfect Location</h4>
              <p class="mb-3">She bought a piece of land on the banks of the sacred river Ganges.</p>
              <p class="mb-3">There she built a big and beautiful temple for Mother Kāli, sparing no expense to make it magnificent.</p>
              <p class="font-medium">The temple became known as the Dakshineswar Kāli Temple.</p>
            </div>
          </div>

          <h3>The Temple's Popularity</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">The beautiful temple soon became a center of devotion and spiritual activity.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">A Place of Worship</h4>
              <p class="mb-3">Many devotees - men, women and children - came to worship in the temple.</p>
              <p>Dakshineswar is a place near the city of Kolkata, and the temple became famous throughout the region.</p>
            </div>
          </div>

          <h3>Sri Rāmakrishna as Temple Priest</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Perfect Priest</h4>
            <p class="mb-4">Sri Rāmakrishna served as the priest in this temple, bringing extraordinary devotion to his service.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Mutual Respect</h4>
              <p class="mb-3">Rāni Rāsmani loved and admired Sri Rāmakrishna for his great devotion to Mother Kāli.</p>
              <p>She recognized his spiritual greatness and treated him with the highest respect.</p>
            </div>
          </div>

          <h3>The Day of the Incident</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">One day, an incident occurred that would teach everyone present an important lesson about worship.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Worship Service</h4>
              <p class="mb-3">Rāni Rāsmani came to the temple to worship Mother Kāli. She sat down and asked one of the temple priests to sing a holy song.</p>
              <p>The priest began singing devotional songs in praise of the Divine Mother.</p>
            </div>
          </div>

          <h3>Sri Rāmakrishna Joins the Singing</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">The atmosphere became even more sacred when Sri Rāmakrishna participated in the worship.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Divine Music</h4>
              <p class="mb-3">Sri Rāmakrishna also came and started singing in his sweet voice.</p>
              <p>His singing was filled with such devotion that it transported listeners to a higher spiritual realm.</p>
            </div>
          </div>

          <h3>The Unexpected Action</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">A Shocking Moment</h4>
            <p class="mb-4">After a little while, something happened that shocked everyone present.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Correction</h4>
              <p class="mb-3">Sri Rāmakrishna got up. He looked at Rāni Rāsmani and said, 'That thought alone.'</p>
              <p>Saying so, he struck the tender body of Rāni Rāsmani with the palm of his hand.</p>
            </div>
          </div>

          <h3>The Angry Reaction</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">The people present were outraged by what they saw as disrespectful behavior.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Protecting Their Queen</h4>
              <p class="mb-3">The others became angry at this. Rāni Rāsmani's relatives made a big noise.</p>
              <p>They wanted to punish Sri Rāmakrishna for what they saw as an insult to their beloved queen.</p>
            </div>
          </div>

          <h3>Rāni Rāsmani's Wisdom</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">But Rāni Rāsmani showed her spiritual maturity and understanding in her response.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Stopping the Anger</h4>
              <p class="mb-3">Rāni Rāsmani stopped them. She said, 'Do not find fault with him.'</p>
              <p>She understood that Sri Rāmakrishna's action came from spiritual insight, not disrespect.</p>
            </div>
          </div>

          <h3>The Truthful Admission</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Accepting the Truth</h4>
            <p class="mb-4">Rāni Rāsmani then revealed why Sri Rāmakrishna had acted as he did.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Honest Confession</h4>
              <p class="mb-3">She explained: 'When we come to a temple we should be thinking about God. When Mother Kāli's sweet name is being sung we should all be thinking about the Mother.'</p>
              <p class="mb-3">'The fault is with me. I was thinking about something else.'</p>
              <p class="font-medium">Rāni Rāsmani was very truthful. She admitted her mistake openly.</p>
            </div>
          </div>

          <h3>Sri Rāmakrishna's Divine Insight</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">The incident revealed Sri Rāmakrishna's extraordinary spiritual powers and compassion.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Helping a Devotee</h4>
              <p class="mb-3">Sri Rāmakrishna knew that Rāni Rāsmani's mind had wandered during worship.</p>
              <p class="font-medium">He wanted to help Rāni Rāsmani focus her mind on God and learn an important spiritual lesson.</p>
            </div>
          </div>

          <h3>The Important Lesson</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <h4 class="font-semibold mb-3">For All Devotees</h4>
            <p class="mb-4">This incident teaches us a valuable lesson about proper worship and spiritual practice.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Focused Devotion</h4>
              <p class="mb-3">When we go to a prayer service or temple, we must try our best to keep our minds on God.</p>
              <div class="space-y-2">
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p><strong>Truthfulness:</strong> Like Rāni Rāsmani, we should honestly admit our mistakes</p>
                </div>
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p><strong>Humility:</strong> We should accept correction from those who guide us spiritually</p>
                </div>
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p><strong>Focus:</strong> During worship, our minds should be completely absorbed in God</p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg text-center">
            <h4 class="font-semibold text-lg mb-2">The Eternal Teaching</h4>
            <p>This story shows us that true devotion requires complete attention and sincerity. It also teaches us the importance of accepting guidance from spiritual teachers with humility and gratitude, just as Rāni Rāsmani did when Sri Rāmakrishna helped her understand the proper way to worship.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'Where did Rāni Rāsmani live?',
              answers: [
                'Mumbai',
                'Delhi',
                'Kolkata',
                'Chennai'
              ],
              correctAnswer: 2
            },
            {
              question: 'Who appeared to Rāni Rāsmani and asked her to build a temple?',
              answers: [
                'Lord Shiva',
                'Mother Kāli',
                'Lord Vishnu',
                'Mother Saraswati'
              ],
              correctAnswer: 1
            },
            {
              question: 'Where did Rāni Rāsmani build the temple?',
              answers: [
                'In the mountains',
                'In the city center',
                'On the banks of the Ganges',
                'In a forest'
              ],
              correctAnswer: 2
            },
            {
              question: 'What is the name of the temple that Rāni Rāsmani built?',
              answers: [
                'Kolkata Kāli Temple',
                'Dakshineswar Kāli Temple',
                'Ganges Temple',
                'Rāsmani Temple'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who was the priest at the Dakshineswar temple?',
              answers: [
                'Rāni Rāsmani',
                'Sri Rāmakrishna',
                'A relative of Rāni Rāsmani',
                'A hired priest'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did Sri Rāmakrishna do that shocked everyone?',
              answers: [
                'He stopped singing',
                'He left the temple',
                'He struck Rāni Rāsmani with his palm',
                'He shouted loudly'
              ],
              correctAnswer: 2
            },
            {
              question: 'How did Rāni Rāsmani\'s relatives react to Sri Rāmakrishna\'s action?',
              answers: [
                'They praised him',
                'They became angry and wanted to punish him',
                'They ignored it',
                'They laughed'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did Rāni Rāsmani say was her fault?',
              answers: [
                'She was singing too loudly',
                'She was sitting in the wrong place',
                'She was thinking about something else during worship',
                'She came too late'
              ],
              correctAnswer: 2
            },
            {
              question: 'Why did Sri Rāmakrishna act as he did?',
              answers: [
                'He was angry with Rāni Rāsmani',
                'He wanted to help her focus her mind on God',
                'He was testing her patience',
                'He was showing his power'
              ],
              correctAnswer: 1
            },
            {
              question: 'What important lesson does this story teach us?',
              answers: [
                'Rich people should not come to temples',
                'We should keep our minds focused on God during worship',
                'Priests should not correct devotees',
                'Singing is not important in worship'
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: 'muslim-way-to-god',
        title: 'The Muslim Way to God',
        description: 'Learn how Sri Ramakrishna explored the Islamic path and discovered the universal truth of God',
        content: `
          <h2>The Muslim Way to God</h2>
          <div class="text-center mb-6">
            <img src="/pics/ramakrishna-islam.jpg" alt="Sri Ramakrishna learning about Islam and the path to Allah" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Sri Ramakrishna discovering the universal truth through the Islamic path</p>
          </div>

          <p>This beautiful story shows us Sri Ramakrishna's quest to understand how different religions reach the same Divine Truth. His exploration of Islam demonstrates that there are many paths to God, all leading to the same ultimate reality.</p>

          <h3>Sri Ramakrishna's Previous Experience</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">By this time, Sri Rāmakrishna had practiced the Hindu ways of reaching God and had achieved profound spiritual realizations.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">A Universal Quest</h4>
              <p class="mb-3">But Sri Ramakrishna understood that it is not only the Hindus that try to reach God.</p>
              <p>Muslims and Christians also try to know God. But how do they do it? What way do they follow to reach God?</p>
              <p class="font-medium mt-3">Sri Rāmakrishna wanted to know this truth for himself.</p>
            </div>
          </div>

          <h3>The Arrival of the Muslim Teacher</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Divine Providence</h4>
            <p class="mb-4">Soon, as if in answer to his sincere desire, a Muslim teacher came to Dakshineswar.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Wajed Ali Khan</h4>
              <p class="mb-3">His name was Wajed Ali Khan. He was a respected man who was also very learned in the Koran.</p>
              <p class="font-medium">The Koran is the holy book of the Muslims, containing the divine revelations given to Prophet Muhammad.</p>
            </div>
          </div>

          <h3>Learning the Islamic Path</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Sri Ramakrishna approached this new spiritual path with the same sincerity he had shown in his Hindu practices.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Teaching and Practice</h4>
              <p class="mb-3">Wajed Ali Khan taught Sri Rāmakrishna the Muslim way to reach God.</p>
              <p class="mb-3">Sri Rāmakrishna practiced it with complete dedication and sincerity.</p>
              <p class="font-medium">Thus he saw God as the Muslims understood Him.</p>
            </div>
          </div>

          <h3>Understanding Allah</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Through his practice of Islamic spirituality, Sri Ramakrishna gained direct experience of the Divine as understood in Islam.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Name of God in Islam</h4>
              <p class="mb-3">Allah is the Muslim name for God - the same Divine Reality that Sri Ramakrishna had experienced through Hindu practices.</p>
              <p>He discovered that the essence was the same, only the name and approach were different.</p>
            </div>
          </div>

          <h3>The Vision of Prophet Muhammad</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Divine Confirmation</h4>
            <p class="mb-4">During this time of Islamic practice, Sri Ramakrishna received a profound spiritual confirmation.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Sacred Vision</h4>
              <p class="mb-3">Sri Rāmakrishna had a vision of Prophet Muhammed, God's special messenger to the Muslims.</p>
              <p class="mb-3">The Prophet Muhammed was the one through whom the divine teachings found in the Holy Koran were revealed to humanity.</p>
              <p class="font-medium">This vision confirmed the authenticity and validity of the Islamic path to God.</p>
            </div>
          </div>

          <h3>The Universal Truth Revealed</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Through his direct experience of Islamic spirituality, Sri Ramakrishna gained a profound understanding.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Many Paths, One Goal</h4>
              <p class="mb-3">Sri Rāmakrishna knew that the Muslim way to God is one of the many ways to reach God.</p>
              <p class="font-medium">This realization would become central to his teaching about the harmony of religions.</p>
            </div>
          </div>

          <h3>Teachings of Sri Ramakrishna</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <h4 class="font-semibold mb-3">Wisdom for Daily Life</h4>
            <div class="space-y-4">
              <div class="bg-white p-4 rounded-lg">
                <h5 class="font-semibold mb-2">Holding Fast to God</h5>
                <blockquote class="italic mb-3">"As a boy holding to a post or pillar whirls about it with headlong speed without any fear of falling, so perform your worldly duties, fixing your hold firmly upon God, and you will be free from danger."</blockquote>
                <p class="text-sm">This teaches us to stay connected to God while fulfilling our worldly responsibilities.</p>
              </div>

              <div class="bg-white p-4 rounded-lg">
                <h5 class="font-semibold mb-2">The Power of Company</h5>
                <blockquote class="italic mb-3">"One develops various propensities according to the company one moves in; and again one seeks the company congenial to one's propensities."</blockquote>
                <p class="text-sm">This reminds us to choose our companions wisely, as they influence our character.</p>
              </div>

              <div class="bg-white p-4 rounded-lg">
                <h5 class="font-semibold mb-2">Guarding the Mind</h5>
                <blockquote class="italic mb-3">"As thieves cannot enter a house if its inmates are wide awake, so if you are always on your guard, no evil thought will enter your mind to rob it of its goodness."</blockquote>
                <p class="text-sm">This teaches us the importance of mental vigilance and spiritual alertness.</p>
              </div>
            </div>
          </div>

          <h3>The Significance of This Experience</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Breaking Religious Barriers</h4>
            <p class="mb-4">Sri Ramakrishna's exploration of Islam was revolutionary for his time and remains relevant today.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Universal Lessons</h4>
              <div class="space-y-3">
                <div class="bg-spiritual-50 p-3 rounded-lg">
                  <p><strong>Religious Unity:</strong> Different religions are different paths to the same Divine Truth</p>
                </div>
                <div class="bg-spiritual-50 p-3 rounded-lg">
                  <p><strong>Sincere Practice:</strong> Any spiritual path practiced with sincerity leads to God</p>
                </div>
                <div class="bg-spiritual-50 p-3 rounded-lg">
                  <p><strong>Open Mind:</strong> We should respect and learn from all genuine spiritual traditions</p>
                </div>
                <div class="bg-spiritual-50 p-3 rounded-lg">
                  <p><strong>Direct Experience:</strong> True understanding comes through practice, not just theory</p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg text-center">
            <h4 class="font-semibold text-lg mb-2">The Universal Message</h4>
            <p>Sri Ramakrishna's exploration of Islam teaches us that God is accessible through many paths. His direct experience of the Islamic way to the Divine shows us that religious differences are like different languages speaking about the same ultimate Truth. This understanding promotes harmony, respect, and unity among all people, regardless of their religious background.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'What had Sri Ramakrishna practiced before learning about Islam?',
              answers: [
                'Only meditation',
                'The Hindu ways of reaching God',
                'Christian practices',
                'Buddhist teachings'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who was the Muslim teacher that came to Dakshineswar?',
              answers: [
                'Ali Khan',
                'Wajed Ali Khan',
                'Muhammad Khan',
                'Ahmed Ali'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is the Koran?',
              answers: [
                'A Muslim prayer book',
                'The holy book of the Muslims',
                'A book of stories',
                'A history book'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is the Muslim name for God?',
              answers: [
                'Krishna',
                'Jesus',
                'Allah',
                'Brahman'
              ],
              correctAnswer: 2
            },
            {
              question: 'Who did Sri Ramakrishna have a vision of during his Islamic practice?',
              answers: [
                'Prophet Muhammad',
                'Wajed Ali Khan',
                'Lord Krishna',
                'Mother Kali'
              ],
              correctAnswer: 0
            },
            {
              question: 'What did Sri Ramakrishna discover about the Muslim way to God?',
              answers: [
                'It was completely different from Hindu ways',
                'It was the only true path',
                'It is one of the many ways to reach God',
                'It was not effective'
              ],
              correctAnswer: 2
            },
            {
              question: 'According to Sri Ramakrishna\'s teaching, how should we perform worldly duties?',
              answers: [
                'Without thinking of God',
                'Fixing our hold firmly upon God',
                'Only when convenient',
                'With fear and worry'
              ],
              correctAnswer: 1
            },
            {
              question: 'What does Sri Ramakrishna say about the company we keep?',
              answers: [
                'It doesn\'t matter who we spend time with',
                'We should avoid all people',
                'We develop propensities according to the company we move in',
                'Only family members influence us'
              ],
              correctAnswer: 2
            },
            {
              question: 'How can we protect our minds from evil thoughts?',
              answers: [
                'By sleeping all the time',
                'By always being on guard',
                'By avoiding all thoughts',
                'By reading only religious books'
              ],
              correctAnswer: 1
            },
            {
              question: 'What was revolutionary about Sri Ramakrishna\'s approach to different religions?',
              answers: [
                'He rejected all religions',
                'He practiced and experienced different paths to understand their validity',
                'He only studied books about them',
                'He criticized other religions'
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: 'christian-way-to-god',
        title: 'The Christian Way to God',
        description: 'Learn how Sri Ramakrishna explored Christianity and experienced the divine love of Jesus Christ',
        content: `
          <h2>The Christian Way to God</h2>
          <div class="text-center mb-6">
            <img src="/pics/ramakrishna-christianity.jpg" alt="Sri Ramakrishna contemplating the image of Mother Mary and baby Jesus" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Sri Ramakrishna discovering the Christian path through divine love</p>
          </div>

          <p>This beautiful story shows how Sri Ramakrishna's pure heart and sincere seeking led him to experience the Divine through Christianity, proving that all sincere paths lead to the same God.</p>

          <h3>The Divine Encounter</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">One day Sri Rāmakrishna went to a devotee's house, where a beautiful spiritual experience awaited him.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Sacred Image</h4>
              <p class="mb-3">There he saw a beautiful picture of Mother Mary with the baby Jesus in her lap.</p>
              <p class="mb-3">The baby Jesus was most beautiful, radiating divine innocence and love.</p>
              <p class="font-medium">Sri Rāmakrishna was filled with love for Jesus upon seeing this sacred image.</p>
            </div>
          </div>

          <h3>The Awakening of Christian Devotion</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">A Heart Touched by Divine Love</h4>
            <p class="mb-4">The sight of the holy image stirred something deep within Sri Ramakrishna's spiritual heart.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Sincere Desire</h4>
              <p class="mb-3">He wanted to pray like the Christians and understand their path to God.</p>
              <p>This desire came from his pure heart's recognition of the divine love emanating from the Christian tradition.</p>
            </div>
          </div>

          <h3>Learning About Christianity</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Sri Ramakrishna approached Christianity with the same sincerity he had shown toward all spiritual paths.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Teacher and the Teaching</h4>
              <p class="mb-3">A devotee taught him about Jesus and the Bible.</p>
              <p class="mb-3">The Bible is the holy book of the Christians, containing the teachings and life of Jesus Christ.</p>
              <p class="font-medium">Sri Rāmakrishna practiced the teachings of the Bible with complete dedication.</p>
            </div>
          </div>

          <h3>Sincere Practice</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Sri Ramakrishna immersed himself in Christian spiritual practice with his characteristic intensity.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Prayer to Lord Jesus</h4>
              <p class="mb-3">He prayed to Lord Jesus with the same fervor he had shown in his prayers to Hindu deities.</p>
              <p>For five days, he continued this sincere practice, opening his heart completely to the Christian way.</p>
            </div>
          </div>

          <h3>The Divine Vision</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Reward of Sincere Devotion</h4>
            <p class="mb-4">After five days of sincere practice, Sri Ramakrishna received a profound spiritual confirmation.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Beautiful Vision</h4>
              <p class="mb-3">He saw a beautiful vision - it was the vision of Lord Jesus.</p>
              <p class="mb-3">Lord Jesus had beautiful large eyes and was full of divine love.</p>
              <p class="font-medium">This vision confirmed that the Christian path, when followed with sincerity, leads to the same Divine Reality.</p>
            </div>
          </div>

          <h3>The Universal Teaching</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Sri Ramakrishna's experience led him to share a profound universal truth about spiritual practice.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Pure Heart</h4>
              <p class="mb-3">Sri Rāmakrishna used to say that if one cries for God with a pure heart, one will certainly see Him.</p>
              <p class="font-medium">This teaching applies to all sincere seekers, regardless of their religious background.</p>
            </div>
          </div>

          <h3>Jesus's Teaching in the Bible</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Sri Ramakrishna found that his own experience was confirmed by the words of Jesus himself.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Beatitude</h4>
              <div class="bg-indian-cream p-4 rounded-lg">
                <p class="italic text-center text-lg">'Blessed are the pure in heart for they shall see God.'</p>
                <p class="text-right mt-2 font-medium">- Lord Jesus (Bible)</p>
              </div>
              <p class="mt-3">This teaching from Jesus perfectly matched Sri Ramakrishna's own realization and experience.</p>
            </div>
          </div>

          <h3>The Universal Truth Revealed</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">All Paths Lead to the Same Goal</h4>
            <p class="mb-4">Through his direct experience of Christianity, Sri Ramakrishna gained another confirmation of religious unity.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Same Divine Reality</h4>
              <p class="mb-3">Thus Sri Rāmakrishna knew that the Christian path also leads one to God.</p>
              <p class="font-medium">He found that Hindus, Muslims and Christians all worshipped the same God through different ways.</p>
            </div>
          </div>

          <h3>Different Names, Same God</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Sri Ramakrishna's experiences across different religions led him to a profound understanding.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Many Names of One God</h4>
              <p class="mb-3">Some call Him Brahman, Rāma, Krishna and others called Him Jesus, Allah or by many other names.</p>
              <p class="font-medium">But all these names refer to the same ultimate Divine Reality.</p>
            </div>
          </div>

          <h3>Sri Ramakrishna's Great Teaching</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Based on his direct experiences across different religious traditions, Sri Ramakrishna gave humanity a profound teaching.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Unity of Religions</h4>
              <div class="bg-indian-cream p-4 rounded-lg">
                <p class="italic text-center text-lg">'God is one; different religions call Him by different names and think of Him in different forms.'</p>
                <p class="text-right mt-2 font-medium">- Sri Ramakrishna</p>
              </div>
              <p class="mt-3">This teaching promotes understanding and harmony among all religious communities.</p>
            </div>
          </div>

          <h3>The Call for Religious Harmony</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Living in Peace</h4>
            <p class="mb-4">Sri Ramakrishna's experience led him to advocate for religious tolerance and understanding.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Path to Peace</h4>
              <p class="mb-3">We must learn to see the Truth in all religions and learn to live in peace with all.</p>
              <p class="font-medium">It is foolish to quarrel in the name of religion when all religions lead to the same Divine Goal.</p>
            </div>
          </div>

          <h3>Lessons for Today</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <h4 class="font-semibold mb-3">Universal Applications</h4>
            <div class="space-y-3">
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Purity of Heart:</strong> Sincere devotion in any tradition can lead to divine realization</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Religious Respect:</strong> All genuine spiritual paths deserve our respect and understanding</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Unity in Diversity:</strong> Different religions are like different languages speaking about the same Truth</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Peace and Harmony:</strong> Understanding religious unity promotes peace among all people</p>
              </div>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg text-center">
            <h4 class="font-semibold text-lg mb-2">The Message of Love</h4>
            <p>Sri Ramakrishna's exploration of Christianity teaches us that divine love transcends all religious boundaries. His vision of Jesus Christ, achieved through sincere practice, shows us that God responds to pure hearts regardless of the particular path they follow. This understanding calls us to respect all sincere spiritual traditions and to live in harmony with people of all faiths.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'Where did Sri Ramakrishna first see the picture of Mother Mary and baby Jesus?',
              answers: [
                'In a church',
                'At a devotee\'s house',
                'In a book',
                'In a dream'
              ],
              correctAnswer: 1
            },
            {
              question: 'How did Sri Ramakrishna feel when he saw the image of baby Jesus?',
              answers: [
                'He was indifferent',
                'He was filled with love for Jesus',
                'He was confused',
                'He was afraid'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is the Bible?',
              answers: [
                'A book of stories',
                'The holy book of the Christians',
                'A history book',
                'A book of poems'
              ],
              correctAnswer: 1
            },
            {
              question: 'How many days did Sri Ramakrishna practice Christian teachings before his vision?',
              answers: [
                'Three days',
                'Five days',
                'Seven days',
                'Ten days'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did Sri Ramakrishna see in his vision of Jesus?',
              answers: [
                'Jesus with a crown',
                'Jesus with beautiful large eyes full of divine love',
                'Jesus carrying a cross',
                'Jesus in white robes'
              ],
              correctAnswer: 1
            },
            {
              question: 'According to Sri Ramakrishna, what happens if one cries for God with a pure heart?',
              answers: [
                'Nothing happens',
                'One becomes sad',
                'One will certainly see Him',
                'One becomes confused'
              ],
              correctAnswer: 2
            },
            {
              question: 'What does Jesus say in the Bible about pure hearts?',
              answers: [
                'Blessed are the pure in heart for they shall see God',
                'Pure hearts are rare',
                'Only some people have pure hearts',
                'Pure hearts need training'
              ],
              correctAnswer: 0
            },
            {
              question: 'What did Sri Ramakrishna discover about different religions?',
              answers: [
                'They are completely different',
                'Only one is true',
                'They all worship the same God through different ways',
                'They should not mix'
              ],
              correctAnswer: 2
            },
            {
              question: 'According to Sri Ramakrishna, what is foolish?',
              answers: [
                'To pray regularly',
                'To quarrel in the name of religion',
                'To read holy books',
                'To visit temples'
              ],
              correctAnswer: 1
            },
            {
              question: 'What should we learn to do according to this lesson?',
              answers: [
                'Follow only one religion',
                'Avoid all religions',
                'See the Truth in all religions and live in peace with all',
                'Criticize other religions'
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      {
        id: 'god-is-infinite',
        title: 'God is Infinite',
        description: 'Learn Sri Ramakrishna\'s profound teaching about the unity of all religions and the infinite nature of God',
        content: `
          <h2>God is Infinite</h2>
          <div class="text-center mb-6">
            <img src="/pics/ramakrishna-unity.jpg" alt="Sri Ramakrishna teaching the unity of all religions" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Sri Ramakrishna - the great teacher of religious harmony and unity</p>
          </div>

          <p>This lesson teaches us Sri Ramakrishna's most important message to humanity - that God is One, infinite, and can be reached through many different paths. His direct experience of various religions gave him the authority to speak this universal truth.</p>

          <h3>The Great Realization</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Sri Rāmakrishna reached God through many paths - Hindu, Muslim, and Christian traditions.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Universal Discovery</h4>
              <p class="mb-3">He found truly there was no difference between Rāma and Krishna or Allah and Jesus.</p>
              <p class="font-medium">He understood that God is only ONE but the names and forms are different.</p>
            </div>
          </div>

          <h3>The Same God for All</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Universal Truth</h4>
            <p class="mb-4">Sri Ramakrishna's experiences across different religions led him to a profound understanding.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">One Divine Reality</h4>
              <p class="mb-3">The God of the Hindus is also the God of the Muslims and Christians.</p>
              <p class="font-medium">Sri Rāmakrishna said this from his own direct experience, not from books or theories.</p>
            </div>
          </div>

          <h3>Teaching Through Simple Stories</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Sri Ramakrishna had a special gift for explaining profound truths through simple, relatable examples.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Master Teacher</h4>
              <p class="mb-3">Through simple stories and sayings he used to explain this wonderful Truth.</p>
              <p>His parables made complex spiritual concepts accessible to people of all backgrounds and education levels.</p>
            </div>
          </div>

          <h3>The Parable of the Ganges Water</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">One of Sri Ramakrishna's most famous teachings uses the example of the sacred river Ganges.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Different Places, Same Water</h4>
              <p class="mb-3">He said that people may draw water from the Ganges from different places:</p>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>The Hindus may draw water from one place</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>The Muslims from another place</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>The Christians from yet another place</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Others from other places</span>
                </li>
              </ul>
              <p class="mt-3 font-medium">But it is all the same Ganges water, regardless of where it is drawn from.</p>
            </div>
          </div>

          <h3>Different Words, Same Reality</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Language Analogy</h4>
            <p class="mb-4">Sri Ramakrishna extended this analogy to show how different languages describe the same thing.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Many Names, One Substance</h4>
              <p class="mb-3">Some call the Ganges water 'jal', others say 'pāni', and some others may use the word 'water' for the same Ganges water.</p>
              <p class="mb-3">The names are different, but they all refer to the same substance.</p>
              <p class="font-medium">Likewise, the same God is called by different names in different traditions.</p>
            </div>
          </div>

          <h3>The Divine Names</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Sri Ramakrishna explained how different religions use different names for the same Divine Reality.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Universal Divine Names</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="bg-spiritual-50 p-3 rounded-lg text-center">
                  <h5 class="font-semibold mb-2">Hindu Names</h5>
                  <p>Kāli, Krishna, Rama, Brahman</p>
                </div>
                <div class="bg-spiritual-50 p-3 rounded-lg text-center">
                  <h5 class="font-semibold mb-2">Muslim Names</h5>
                  <p>Allah, Rahman, Rahim</p>
                </div>
                <div class="bg-spiritual-50 p-3 rounded-lg text-center">
                  <h5 class="font-semibold mb-2">Christian Names</h5>
                  <p>Jesus, God, Father</p>
                </div>
              </div>
              <p class="mt-3 text-center font-medium">The names may be different, but God is One.</p>
            </div>
          </div>

          <h3>The Parable of the Judge</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Sri Ramakrishna gave another beautiful example to illustrate how God appears different but remains the same.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Same Person, Different Clothes</h4>
              <p class="mb-3">Sri Rāmakrishna says: "When the judge goes to court, he wears trousers and a coat. At home he wears simple clothes."</p>
              <p class="mb-3">"He looks different in different clothes. But he always remains the same person, whatever clothes he wears."</p>
              <p class="font-medium">"So God is the same, only His names and forms are different."</p>
            </div>
          </div>

          <h3>The Harmony of Religions</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">A Revolutionary Teaching</h4>
            <p class="mb-4">Sri Ramakrishna's message was revolutionary for his time and remains relevant today.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Based on Personal Experience</h4>
              <p class="mb-3">Sri Rāmakrishna taught the harmony of religions which he understood through his personal experiences.</p>
              <p class="font-medium">This was not theoretical knowledge but direct, lived experience of the Divine through multiple paths.</p>
            </div>
          </div>

          <h3>The Infinite Nature of God</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">The title "God is Infinite" captures the essence of Sri Ramakrishna's teaching.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Beyond All Limitations</h4>
              <div class="space-y-3">
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p><strong>Infinite Forms:</strong> God can appear in countless forms to different devotees</p>
                </div>
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p><strong>Infinite Names:</strong> God can be called by unlimited names across cultures</p>
                </div>
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p><strong>Infinite Paths:</strong> There are countless ways to reach the same Divine Reality</p>
                </div>
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p><strong>Infinite Love:</strong> God's love extends to all beings regardless of their religion</p>
                </div>
              </div>
            </div>
          </div>

          <h3>Practical Applications</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <h4 class="font-semibold mb-3">Living the Teaching</h4>
            <p class="mb-4">Sri Ramakrishna's teaching about God's infinity has practical implications for how we live.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Guidelines for Daily Life</h4>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Respect all religions:</strong> Recognize the validity of different spiritual paths</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Avoid religious conflicts:</strong> Don't quarrel over different names and forms of God</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Practice tolerance:</strong> Accept that others may worship God differently</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Seek unity:</strong> Look for common ground rather than differences</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Focus on essence:</strong> Concentrate on the spiritual goal rather than external forms</span>
                </li>
              </ul>
            </div>
          </div>

          <h3>The Universal Message</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">For All Humanity</h4>
            <p class="mb-4">Sri Ramakrishna's teaching transcends all boundaries and speaks to every human heart.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Call for Unity</h4>
              <p class="mb-3">His message calls for understanding, respect, and harmony among all people, regardless of their religious background.</p>
              <p class="font-medium">In our diverse world, this teaching is more relevant than ever before.</p>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg text-center">
            <h4 class="font-semibold text-lg mb-2">The Eternal Truth</h4>
            <p>Sri Ramakrishna's teaching that "God is Infinite" reminds us that the Divine Reality is too vast to be contained by any single religion or tradition. Just as the infinite ocean cannot be held in any single container, the infinite God cannot be limited to any one path. This understanding promotes peace, harmony, and mutual respect among all people, creating a world where diversity is celebrated as different expressions of the same ultimate Truth.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'Through how many different religious paths did Sri Ramakrishna reach God?',
              answers: [
                'One path only',
                'Two paths',
                'Many paths (Hindu, Muslim, Christian)',
                'He never reached God'
              ],
              correctAnswer: 2
            },
            {
              question: 'What did Sri Ramakrishna discover about Rama, Krishna, Allah, and Jesus?',
              answers: [
                'They are completely different',
                'There was no difference between them',
                'Only one is real',
                'They are enemies'
              ],
              correctAnswer: 1
            },
            {
              question: 'According to Sri Ramakrishna, how many Gods are there?',
              answers: [
                'Many gods',
                'No god',
                'God is only ONE',
                'Three gods'
              ],
              correctAnswer: 2
            },
            {
              question: 'In the Ganges water example, what do different people call the same water?',
              answers: [
                'Everyone calls it the same name',
                'Some call it \'jal\', others \'pani\', others \'water\'',
                'Only one name is correct',
                'The names don\'t matter'
              ],
              correctAnswer: 1
            },
            {
              question: 'In the judge example, what changes about the judge?',
              answers: [
                'His personality changes',
                'His clothes change but he remains the same person',
                'He becomes a different person',
                'Nothing changes'
              ],
              correctAnswer: 1
            },
            {
              question: 'How did Sri Ramakrishna learn about the harmony of religions?',
              answers: [
                'From reading books',
                'From other teachers',
                'Through his personal experiences',
                'From dreams only'
              ],
              correctAnswer: 2
            },
            {
              question: 'What are some Hindu names for God mentioned in the lesson?',
              answers: [
                'Allah and Jesus',
                'Kali, Krishna, and Rama',
                'Only Brahman',
                'Father and Son'
              ],
              correctAnswer: 1
            },
            {
              question: 'What does the title "God is Infinite" mean?',
              answers: [
                'God is very big',
                'God has no limits and can appear in countless forms and names',
                'God is far away',
                'God is difficult to understand'
              ],
              correctAnswer: 1
            },
            {
              question: 'According to this teaching, how should we treat people of other religions?',
              answers: [
                'Avoid them completely',
                'Try to convert them',
                'Respect them and live in harmony',
                'Argue with them about religion'
              ],
              correctAnswer: 2
            },
            {
              question: 'What makes Sri Ramakrishna\'s teaching about religious harmony special?',
              answers: [
                'He read many books about it',
                'He had direct personal experience of different religious paths',
                'He was born into a religious family',
                'He traveled to many countries'
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: 'sri-sarada-devi',
        title: 'Sri Sāradā Devi',
        description: 'Learn about the Holy Mother, Sri Ramakrishna\'s spiritual consort and the Divine Mother incarnate',
        content: `
          <h2>Sri Sāradā Devi</h2>
          <div class="text-center mb-6">
            <img src="/pics/sri-sarada-devi.jpg" alt="Sri Sarada Devi, the Holy Mother" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Sri Sāradā Devi - the Holy Mother and Divine Mother incarnate</p>
          </div>

          <p>Sri Sāradā Devi, known as the Holy Mother, was the spiritual consort of Sri Ramakrishna and is revered as the Divine Mother incarnate. Her life exemplifies perfect devotion, service, and spiritual wisdom.</p>

          <h3>The Sacred Birth</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Sri Sāradā Devi was born on 22 December 1853, in a family blessed with devotion and simplicity.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Holy Parents</h4>
              <p class="mb-3">Her parents were Shyamasundari Devi and Rāmchandra Mukhopādyāya.</p>
              <p class="mb-3">They lived in Jayrāmbati, a small village that would become sacred due to her birth.</p>
              <p class="font-medium">Like Sri Ramakrishna's parents, they loved God and lived a life of devotion and righteousness.</p>
            </div>
          </div>

          <h3>A Helpful and Devoted Child</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Service from Childhood</h4>
            <p class="mb-4">From her earliest years, Sri Sāradā Devi showed the qualities that would make her the ideal spiritual mother.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Always Helping</h4>
              <p class="mb-3">Sri Sāradā Devi always helped her parents in whatever way she could.</p>
              <p class="font-medium">Her helpful nature and loving service were signs of her divine character from childhood.</p>
            </div>
          </div>

          <h3>Life in the Rice Fields</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">The family owned a rice field, and young Sāradā participated in the agricultural life with dedication.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Hard Work and Dedication</h4>
              <p class="mb-3">Little Sāradā carried food to the servants working in the fields, showing her caring nature.</p>
              <p class="mb-3">She would go in deep water to cut grass for the cows, demonstrating courage and responsibility.</p>
              <p class="font-medium">She collected the grain during paddy season, participating fully in the family's livelihood.</p>
            </div>
          </div>

          <h3>The Sacred Marriage</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">A divine plan brought together two great souls in a marriage that would become a model of spiritual partnership.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Divine Union</h4>
              <p class="mb-3">Mother Sāradā was only five years old when she married Sri Rāmakrishna, who was twenty-three years old at that time.</p>
              <p class="mb-3">This marriage was arranged according to the customs of the time, but it became a perfect spiritual union.</p>
              <p class="font-medium">Their relationship would exemplify the highest ideals of spiritual companionship and divine love.</p>
            </div>
          </div>

          <h3>Learning from the Master</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Perfect Teacher</h4>
            <p class="mb-4">Sri Rāmakrishna became not only her husband but also her spiritual guide and teacher.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Comprehensive Education</h4>
              <p class="mb-3">Sri Rāmakrishna taught her many things, preparing her for her future role as the Holy Mother.</p>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>He showed her how to walk gracefully</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>He taught her how to speak sweetly and lovingly to people</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>He taught her how to cook with love and care</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Most importantly, he taught her how to pray and connect with God</span>
                </li>
              </ul>
            </div>
          </div>

          <h3>A Life of Spiritual Discipline</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Sri Sāradā Devi's daily routine reflected her deep spiritual commitment and discipline.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Early Morning Devotion</h4>
              <p class="mb-3">Sri Sāradā Devi would get up at 3 o'clock in the morning for prayer and meditation.</p>
              <p class="font-medium">This early rising allowed her to begin each day in communion with the Divine.</p>
            </div>
          </div>

          <h3>Purity of Mind and Heart</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">The Holy Mother's spiritual greatness was evident in her pure mind and constant remembrance of God.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Constant Remembrance</h4>
              <p class="mb-3">She had a pure mind, free from negative thoughts and emotions.</p>
              <p class="font-medium">She always repeated God's name, keeping her consciousness constantly connected to the Divine.</p>
            </div>
          </div>

          <h3>Recognition as Divine Mother</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Sri Ramakrishna's Reverence</h4>
            <p class="mb-4">Sri Ramakrishna recognized the divine nature of his spiritual consort and treated her accordingly.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Divine Recognition</h4>
              <p class="mb-3">Sri Rāmakrishna looked upon her as the 'Divine Mother' - the embodiment of the Divine Feminine.</p>
              <p class="mb-3">He worshipped her as a goddess, recognizing her as the Divine Mother incarnate.</p>
              <p class="font-medium">This recognition established her as a spiritual authority in her own right.</p>
            </div>
          </div>

          <h3>Known as the Holy Mother</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Sri Sāradā Devi became known throughout the world by a title that reflected her spiritual status.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Universal Mother</h4>
              <p class="mb-3">Mother Sāradā is also known as the 'Holy Mother' to devotees worldwide.</p>
              <p class="font-medium">This title reflects her role as the spiritual mother of all seekers, regardless of their background.</p>
            </div>
          </div>

          <h3>Teachings of the Holy Mother</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <h4 class="font-semibold mb-3">Wisdom for Inner Peace</h4>
            <p class="mb-4">Sri Sāradā Devi's teachings provide practical guidance for spiritual life and inner peace.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Path to Peace</h4>
              <div class="bg-indian-cream p-4 rounded-lg">
                <p class="italic text-center text-lg">"If you want peace of mind, do not find fault with others. Rather see your own faults."</p>
                <p class="text-right mt-2 font-medium">- Sri Sāradā Devi</p>
              </div>
              <p class="mt-3">This teaching emphasizes self-reflection and taking responsibility for our own spiritual growth rather than criticizing others.</p>
            </div>
          </div>

          <h3>The Importance of Regular Prayer</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Spiritual Discipline</h4>
            <p class="mb-4">The Holy Mother emphasized the fundamental importance of consistent spiritual practice.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Daily Connection with God</h4>
              <p class="mb-3">Mother also says that we must pray regularly.</p>
              <p class="font-medium">Regular prayer keeps us connected to God and helps maintain spiritual awareness throughout our daily lives.</p>
            </div>
          </div>

          <h3>The Divine Feminine Ideal</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Sri Sāradā Devi represents the highest ideal of the Divine Feminine in spiritual life.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Perfect Balance</h4>
              <div class="space-y-3">
                <div class="bg-spiritual-50 p-3 rounded-lg">
                  <p><strong>Service:</strong> She served others with love and dedication</p>
                </div>
                <div class="bg-spiritual-50 p-3 rounded-lg">
                  <p><strong>Wisdom:</strong> She provided spiritual guidance to countless seekers</p>
                </div>
                <div class="bg-spiritual-50 p-3 rounded-lg">
                  <p><strong>Compassion:</strong> She showed motherly love to all who came to her</p>
                </div>
                <div class="bg-spiritual-50 p-3 rounded-lg">
                  <p><strong>Strength:</strong> She carried on Sri Ramakrishna's mission after his passing</p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg text-center">
            <h4 class="font-semibold text-lg mb-2">The Universal Mother</h4>
            <p>Sri Sāradā Devi's life shows us the perfect example of spiritual motherhood. From her humble beginnings in a village rice field to her recognition as the Divine Mother, she exemplified service, devotion, and wisdom. Her teachings about finding peace through self-reflection and the importance of regular prayer continue to guide spiritual seekers worldwide. She remains the Holy Mother to all who seek divine love and guidance.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'When was Sri Sāradā Devi born?',
              answers: [
                '22 December 1853',
                '22 January 1853',
                '22 December 1854',
                '22 November 1853'
              ],
              correctAnswer: 0
            },
            {
              question: 'What were the names of Sri Sāradā Devi\'s parents?',
              answers: [
                'Kshudirām and Chandrāmani',
                'Shyamasundari Devi and Rāmchandra Mukhopādyāya',
                'Gadādhar and Sāradā',
                'Rāma and Sītā'
              ],
              correctAnswer: 1
            },
            {
              question: 'Where did Sri Sāradā Devi\'s family live?',
              answers: [
                'Kamārpukur',
                'Dakshineswar',
                'Jayrāmbati',
                'Kolkata'
              ],
              correctAnswer: 2
            },
            {
              question: 'What did little Sāradā do to help her family?',
              answers: [
                'Only studied books',
                'Carried food to servants, cut grass for cows, and collected grain',
                'Only played with friends',
                'Only prayed all day'
              ],
              correctAnswer: 1
            },
            {
              question: 'How old was Sri Sāradā Devi when she married Sri Rāmakrishna?',
              answers: [
                'Ten years old',
                'Five years old',
                'Fifteen years old',
                'Twenty years old'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did Sri Rāmakrishna teach Sri Sāradā Devi?',
              answers: [
                'Only how to read',
                'How to walk gracefully, speak sweetly, cook, and pray',
                'Only how to cook',
                'Only how to pray'
              ],
              correctAnswer: 1
            },
            {
              question: 'What time did Sri Sāradā Devi get up for prayer?',
              answers: [
                '5 o\'clock in the morning',
                '4 o\'clock in the morning',
                '3 o\'clock in the morning',
                '6 o\'clock in the morning'
              ],
              correctAnswer: 2
            },
            {
              question: 'How did Sri Rāmakrishna view Sri Sāradā Devi?',
              answers: [
                'As an ordinary wife',
                'As the Divine Mother and worshipped her as a goddess',
                'As a student only',
                'As a helper only'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is Sri Sāradā Devi also known as?',
              answers: [
                'The Divine Teacher',
                'The Holy Mother',
                'The Sacred Sister',
                'The Blessed Daughter'
              ],
              correctAnswer: 1
            },
            {
              question: 'According to Sri Sāradā Devi, how can we get peace of mind?',
              answers: [
                'By finding fault with others',
                'By avoiding people',
                'By not finding fault with others but seeing our own faults',
                'By sleeping more'
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      {
        id: 'swami-vivekananda-part1',
        title: 'Swami Vivekānanda - Part 1',
        description: 'Learn about the early life of Narendranath Datta, who would become the great Swami Vivekananda',
        content: `
          <h2>Swami Vivekānanda - Part 1</h2>
          <div class="text-center mb-6">
            <img src="/pics/young-vivekananda.jpg" alt="Young Narendranath Datta (Swami Vivekananda)" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Young Narendranath - the future Swami Vivekananda</p>
          </div>

          <p>This is the story of a remarkable boy named Narendranath who would grow up to become one of India's greatest spiritual teachers and the first Hindu missionary to the West. His childhood shows us the qualities that made him extraordinary.</p>

          <h3>The Birth of a Great Soul</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Swami Vivekānanda was born on 12th January 1863, in Kolkata, during a time when India was awakening to new spiritual possibilities.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Child's Name</h4>
              <p class="mb-3">His name was Narendranāth Datta, though everyone lovingly called him Naren for short.</p>
              <p class="font-medium">This simple name would one day become famous throughout the world as Swami Vivekananda.</p>
            </div>
          </div>

          <h3>A Strong and Brilliant Mind</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Exceptional Qualities</h4>
            <p class="mb-4">From his earliest years, Naren showed qualities that set him apart from other children.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Mental Strength and Intelligence</h4>
              <p class="mb-3">Naren had a very strong mind that could focus intensely on whatever interested him.</p>
              <p class="font-medium">He was clever at school, excelling in his studies and showing remarkable intelligence.</p>
            </div>
          </div>

          <h3>Love for Physical Activities</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Naren believed in developing both mind and body, showing his balanced approach to life even as a child.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Physical Strength</h4>
              <p class="mb-3">He loved to play games like boxing and wrestling, developing physical strength and courage.</p>
              <p class="font-medium">This physical training would later help him in his demanding spiritual and missionary work.</p>
            </div>
          </div>

          <h3>The Game of Meditation</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Among all his activities, Naren had one favorite that revealed his spiritual nature.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Extraordinary Concentration</h4>
              <p class="mb-3">His best game was the game of 'meditation' - something very unusual for a child.</p>
              <p class="mb-3">Even when he was small, he could meditate for many hours without moving.</p>
              <p class="font-medium">This natural ability to concentrate deeply was a sign of his spiritual greatness.</p>
            </div>
          </div>

          <h3>The Snake Incident</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Fearlessness in Meditation</h4>
            <p class="mb-4">One day, an incident occurred that showed Naren's extraordinary concentration and fearlessness.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Test of Concentration</h4>
              <p class="mb-3">One day Naren and his friends were playing the game of 'meditation' together.</p>
              <p class="mb-3">Suddenly, one of the boys saw a snake and shouted, 'Run, run!'</p>
              <p class="mb-3">All the boys ran away in fear, but Naren sat with his eyes closed and did not move.</p>
              <p class="font-medium">The snake went away quietly without harming him, showing how deep concentration can protect us.</p>
            </div>
          </div>

          <h3>A Questioning Mind</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">One of Naren's most important qualities was his refusal to accept things blindly.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Seeking Truth</h4>
              <p class="mb-3">Naren did not believe everything that people told him.</p>
              <p class="font-medium">He wanted to see the truth for himself, not just accept what others said.</p>
            </div>
          </div>

          <h3>The Tree and the Ghost</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">A famous incident from Naren's childhood perfectly illustrates his fearless, questioning nature.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Playing in the Neighbor's Garden</h4>
              <p class="mb-3">Naren and his friends were fond of playing on a tree in the neighbor's garden.</p>
              <p class="mb-3">Naren would hang from the branch and swing to and fro with his head down, enjoying the fun.</p>
              <p>The old grandfather of the house did not like the children to play there because they made noise.</p>
            </div>
          </div>

          <h3>The Ghost Story</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Trying to Frighten the Children</h4>
            <p class="mb-4">The old man decided to use fear to keep the children away from his tree.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Warning</h4>
              <p class="mb-3">He told Naren, 'Don't climb on that tree. There is a ghost there.'</p>
              <p class="font-medium">'It will grab you by the neck and kill you,' he said, trying to frighten the boy.</p>
            </div>
          </div>

          <h3>Naren's Fearless Response</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Naren's reaction to this ghost story revealed his rational, fearless nature.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Testing the Truth</h4>
              <p class="mb-3">As soon as the old man went away, Naren climbed the tree again!</p>
              <p class="mb-3">His friends got frightened and said, 'Please come down, Naren. The ghost will catch you.'</p>
              <p class="font-medium">But Naren was determined to test whether the ghost story was true.</p>
            </div>
          </div>

          <h3>The Logical Explanation</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Naren's response to his friends showed his logical thinking and courage.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Rational Thinking</h4>
              <p class="mb-3">Naren laughed and said, 'Don't be foolish. How many times have I climbed this tree!'</p>
              <p class="font-medium">'If a ghost lived in it, he would have caught me long ago.'</p>
            </div>
          </div>

          <h3>The Life Teaching</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">A Message for All</h4>
            <p class="mb-4">This childhood experience shaped Naren's approach to life and his future teachings.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Fearless Truth-Seeking</h4>
              <p class="mb-3">When Naren grew up, he always told people the same message he learned as a child:</p>
              <div class="bg-spiritual-50 p-4 rounded-lg">
                <p class="italic text-center text-lg">'Have no fear! Ask questions and find out the truth for yourselves.'</p>
              </div>
              <p class="mt-3 font-medium">This became one of his most important teachings to humanity.</p>
            </div>
          </div>

          <h3>Compassion for the Poor</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Along with his intellectual qualities, Naren showed great compassion from childhood.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Service to Others</h4>
              <p class="mb-3">Naren also loved to give food and clothes to poor people.</p>
              <p class="font-medium">He had special love for Sannyāsis (holy men who had renounced the world), showing his respect for spiritual seekers.</p>
            </div>
          </div>

          <h3>A Mischievous Nature</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Despite his spiritual qualities, Naren was still a normal, energetic child.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Childhood Energy</h4>
              <p class="mb-3">Naren was sometimes very mischievous, full of energy and playfulness.</p>
              <p class="mb-3">His mother could not control him when he was in his playful moods.</p>
              <p class="font-medium">This shows that even great souls have normal childhood experiences.</p>
            </div>
          </div>

          <h3>The Calming Power of Shiva's Name</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">A Mother's Wisdom</h4>
            <p class="mb-4">Naren's mother discovered a unique way to calm her energetic son.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Divine Intervention</h4>
              <p class="mb-3">When Naren became too mischievous, his mother would pour cold water over his head.</p>
              <p class="mb-3">At the same time, she would repeat, 'Shiva, Shiva' (the name of God).</p>
              <p class="font-medium">This would make him calm and quiet, showing the power of God's name and his spiritual nature.</p>
            </div>
          </div>

          <h3>The Quest for God</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">As Naren grew up, his spiritual seeking became more intense and focused.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Great Question</h4>
              <p class="mb-3">As Naren grew up, he wanted to see God and know the truth about the Divine.</p>
              <p class="mb-3">He went to many religious teachers and asked them the same important question:</p>
              <p class="font-medium">'Sir, have you seen God?'</p>
            </div>
          </div>

          <h3>Disappointment with Teachers</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Naren's search for a genuine spiritual teacher led to many disappointments.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">No Satisfactory Answers</h4>
              <p class="mb-3">But none of them could say that they had actually seen God.</p>
              <p class="font-medium">They could only speak about God from books and theories, not from direct experience.</p>
            </div>
          </div>

          <h3>Meeting Sri Ramakrishna</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Life-Changing Encounter</h4>
            <p class="mb-4">Finally, Naren's sincere seeking led him to the person who would change his life forever.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Perfect Answer</h4>
              <p class="mb-3">At last he came to Sri Rāmakrishna and asked, 'Sir, have you seen God?'</p>
              <p class="mb-3">Sri Rāmakrishna said, 'Yes, I see God more clearly than I see you.'</p>
              <p class="mb-3">'You too can see God,' he added with complete confidence.</p>
              <p class="font-medium">Naren was very happy to finally find someone who spoke from direct experience.</p>
            </div>
          </div>

          <h3>The Beginning of Discipleship</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">This meeting marked the beginning of one of the most famous guru-disciple relationships in spiritual history.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Regular Visits</h4>
              <p class="mb-3">He always came to see Sri Rāmakrishna, eager to learn more.</p>
              <p class="font-medium">Sri Ramakrishna told him about God, sharing his vast spiritual knowledge and experience.</p>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg">
            <h4 class="font-semibold mb-2">Meanings</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Meditate:</strong> To think about God and focus the mind on the Divine</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Sannyāsi:</strong> A sādhu or swami who has given up the world to realize God</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Mischievous:</strong> Naughty or playful in a harmless way</p>
              </div>
            </div>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'When was Swami Vivekānanda born?',
              answers: [
                '12th January 1863',
                '12th February 1863',
                '12th January 1864',
                '12th December 1863'
              ],
              correctAnswer: 0
            },
            {
              question: 'What was Swami Vivekānanda\'s childhood name?',
              answers: [
                'Gadādhar',
                'Narendranāth Datta (Naren)',
                'Ramakrishna',
                'Vivekananda'
              ],
              correctAnswer: 1
            },
            {
              question: 'What was Naren\'s favorite game?',
              answers: [
                'Boxing',
                'Wrestling',
                'The game of meditation',
                'Cricket'
              ],
              correctAnswer: 2
            },
            {
              question: 'What happened when a snake appeared while Naren was meditating?',
              answers: [
                'He ran away with his friends',
                'He sat with eyes closed and did not move; the snake went away',
                'He caught the snake',
                'He called for help'
              ],
              correctAnswer: 1
            },
            {
              question: 'What was Naren\'s attitude toward believing things people told him?',
              answers: [
                'He believed everything immediately',
                'He never believed anything',
                'He wanted to see the truth for himself',
                'He only believed his parents'
              ],
              correctAnswer: 2
            },
            {
              question: 'What did the old man tell Naren about the tree?',
              answers: [
                'It was very old',
                'There was a ghost there that would grab him',
                'It was dangerous to climb',
                'It belonged to someone else'
              ],
              correctAnswer: 1
            },
            {
              question: 'How did Naren respond to the ghost story?',
              answers: [
                'He never climbed the tree again',
                'He climbed the tree again to test if it was true',
                'He told his parents',
                'He was very frightened'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did Naren\'s mother do when he was too mischievous?',
              answers: [
                'She scolded him loudly',
                'She sent him to his room',
                'She poured cold water over his head and repeated "Shiva, Shiva"',
                'She ignored him'
              ],
              correctAnswer: 2
            },
            {
              question: 'What question did Naren ask many religious teachers?',
              answers: [
                'How can I become rich?',
                'Sir, have you seen God?',
                'What should I study?',
                'How can I be famous?'
              ],
              correctAnswer: 1
            },
            {
              question: 'How did Sri Rāmakrishna answer Naren\'s question about seeing God?',
              answers: [
                'He said it was impossible',
                'He said only saints can see God',
                'He said "Yes, I see God more clearly than I see you. You too can see God"',
                'He said he had never seen God'
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      {
        id: 'swami-vivekananda-part2',
        title: 'Swami Vivekānanda - Part 2',
        description: 'Learn about Naren\'s spiritual training under Sri Ramakrishna and his transformation into Swami Vivekananda',
        content: `
          <h2>Swami Vivekānanda - Part 2</h2>
          <div class="text-center mb-6">
            <img src="/pics/vivekananda-ramakrishna.jpg" alt="Swami Vivekananda with Sri Ramakrishna" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">The great guru-disciple relationship that changed the world</p>
          </div>

          <p>This lesson continues the story of Narendranath's spiritual journey under the guidance of Sri Ramakrishna, showing how a sincere seeker becomes a great spiritual teacher and world messenger.</p>

          <h3>Sri Ramakrishna's Love for Naren</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">The relationship between Sri Ramakrishna and Naren was one of the most beautiful guru-disciple relationships in spiritual history.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Special Affection</h4>
              <p class="mb-3">Sri Rāmakrishna loved Naren deeply, recognizing his extraordinary spiritual potential.</p>
              <p class="font-medium">This love was not ordinary affection but the divine love of a guru for his destined disciple.</p>
            </div>
          </div>

          <h3>The Questioning Disciple</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Constant Learning</h4>
            <p class="mb-4">Naren's questioning nature, which we saw in his childhood, continued in his spiritual training.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Seeking Understanding</h4>
              <p class="mb-3">Naren always asked Sri Rāmakrishna questions about God and spiritual matters.</p>
              <p class="font-medium">His sincere questions helped him gain deep understanding of spiritual truths.</p>
            </div>
          </div>

          <h3>The Test of Truth</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Naren's rational mind needed to test everything, even his beloved guru's statements.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Sri Ramakrishna's Claim</h4>
              <p class="mb-3">Sri Rāmakrishna told Naren that He could not touch money due to his spiritual state.</p>
              <p class="font-medium">This seemed impossible to Naren's logical mind, so he decided to test it.</p>
            </div>
          </div>

          <h3>The Money Test</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Naren devised a clever test to verify his guru's claim about not being able to touch money.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Hidden Coin</h4>
              <p class="mb-3">Naren wanted to test Him, so he put a coin under Sri Rāmakrishna's mattress.</p>
              <p class="mb-3">When Sri Rāmakrishna sat on it, He jumped up immediately. His body burned from the contact.</p>
              <p class="font-medium">Then Naren knew that Sri Rāmakrishna was speaking the truth about his spiritual condition.</p>
            </div>
          </div>

          <h3>Family Crisis</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">A Time of Difficulty</h4>
            <p class="mb-4">When Naren was about eighteen years old, a family tragedy tested his faith and priorities.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Father's Death</h4>
              <p class="mb-3">When Naren was about eighteen years old, his father died suddenly.</p>
              <p class="mb-3">Therefore Naren had to look after his family and take responsibility for their welfare.</p>
              <p class="font-medium">This put him in a difficult position between spiritual seeking and worldly duties.</p>
            </div>
          </div>

          <h3>Seeking Help from the Guru</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">In his time of need, Naren naturally turned to his spiritual guide for help.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Request for Help</h4>
              <p class="mb-3">He went to Sri Rāmakrishna for help with his family's financial difficulties.</p>
              <p class="font-medium">Sri Ramakrishna's response would teach Naren an important spiritual lesson.</p>
            </div>
          </div>

          <h3>The Divine Mother's Temple</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Sri Ramakrishna directed Naren to seek help from the Divine Mother herself.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Guru's Advice</h4>
              <p class="mb-3">Sri Rāmakrishna said, 'Ask Mother Kāli, in the temple, for anything you want.'</p>
              <p class="font-medium">This was an opportunity for Naren to experience the Divine Mother's grace directly.</p>
            </div>
          </div>

          <h3>The Transformation of Desire</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">A Spiritual Awakening</h4>
            <p class="mb-4">What happened when Naren went to pray to Mother Kali revealed his true spiritual nature.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Unable to Ask for Material Things</h4>
              <p class="mb-3">Naren went to Her temple, but he could not ask for money, food or clothes.</p>
              <p class="font-medium">In the presence of the Divine Mother, his consciousness was elevated beyond material concerns.</p>
            </div>
          </div>

          <h3>The True Prayer</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Sri Ramakrishna sent Naren to Mother Kali three times, and each time the same thing happened.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Heart's True Desire</h4>
              <p class="mb-3">Sri Rāmakrishna sent him to Mother Kali three times, but each time was the same.</p>
              <p class="mb-3">Naren only said, 'Mother, give me devotion. Give me love. Give me true knowledge.'</p>
              <p class="font-medium">This showed that his heart's deepest desire was for spiritual realization, not material wealth.</p>
            </div>
          </div>

          <h3>The Greatest Disciple</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Sri Ramakrishna recognized Naren's exceptional spiritual qualities among all his students.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Special Recognition</h4>
              <p class="mb-3">Sri Rāmakrishna had many disciples, but Naren was Sri Rāmakrishna's greatest disciple.</p>
              <p class="font-medium">This recognition came from Naren's extraordinary spiritual capacity and dedication.</p>
            </div>
          </div>

          <h3>Complete Spiritual Education</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Master's Teaching</h4>
            <p class="mb-4">Sri Ramakrishna gave Naren a complete spiritual education that would prepare him for his world mission.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Comprehensive Knowledge</h4>
              <p class="mb-3">Sri Rāmakrishna taught him everything about God and spiritual realization.</p>
              <p class="mb-3">He told him that God is both with form and without form - teaching him about different aspects of the Divine.</p>
              <p class="font-medium">Most importantly, Sri Rāmakrishna taught Naren to worship God by serving people.</p>
            </div>
          </div>

          <h3>The Master's Departure</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">In 1886, the spiritual world lost a great teacher, but gained a prepared successor.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Mahāsamādhi</h4>
              <p class="mb-3">Sri Rāmakrishna entered into mahāsamādhi in 1886, becoming one with God.</p>
              <p class="font-medium">This left Naren and the other disciples to carry on their master's spiritual mission.</p>
            </div>
          </div>

          <h3>The Formation of the Order</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">After their master's passing, the disciples organized themselves to continue his work.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Becoming Sannyāsis</h4>
              <p class="mb-3">Naren and fifteen other disciples became sannyāsis (monks who renounce the world for God).</p>
              <p class="mb-3">They formed the Ramakrishna Math and Ramakrishna Mission to do God's work.</p>
              <p class="font-medium">This organization would spread Sri Ramakrishna's teachings throughout the world.</p>
            </div>
          </div>

          <h3>The Birth of Swami Vivekananda</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">A New Identity</h4>
            <p class="mb-4">When Naren became a monk, he took a new name that would become famous worldwide.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Transformation</h4>
              <p class="mb-3">Naren now became Swami Vivekānanda - a name meaning "the bliss of discrimination" or "the joy of wisdom."</p>
              <p class="font-medium">This marked his transformation from a seeking student to a teaching master.</p>
            </div>
          </div>

          <h3>The First Hindu Missionary to the West</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Swami Vivekananda would make history by becoming the first Hindu teacher to bring Eastern wisdom to the West.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Breaking New Ground</h4>
              <p class="mb-3">He was the first Hindu to go to America and England to spread the message of our religion in these countries.</p>
              <p class="font-medium">This was a revolutionary step that opened the Western world to Hindu philosophy and spirituality.</p>
            </div>
          </div>

          <h3>The Message of Pride and Fearlessness</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Swami Vivekananda's teachings emphasized strength, pride in one's heritage, and fearlessness.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Be Proud and Fearless</h4>
              <p class="mb-3">Swami Vivekānanda said that we must be proud of our religion.</p>
              <p class="mb-3">We must not be afraid. We must be bold.</p>
              <p class="font-medium">Our religion is eternal - it contains timeless truths that can guide humanity.</p>
            </div>
          </div>

          <h3>The Call to Action</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Practical Spirituality</h4>
            <p class="mb-4">Swami Vivekananda emphasized the importance of using our youth and strength for service.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Youth and Service</h4>
              <p class="mb-3">He said that when we are young, strong and healthy we can do much work.</p>
              <p class="font-medium">This was a call to use our energy and abilities in service of others and God.</p>
            </div>
          </div>

          <h3>The Path to Freedom from Suffering</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Swami Vivekananda gave practical guidance for living a spiritual life in the world.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Formula for Happiness</h4>
              <p class="mb-3">We must not fight over little things. Serve the poor and the miserable.</p>
              <p class="mb-3">But give your heart and mind to God.</p>
              <p class="font-medium">Then you will not suffer - this is the secret of spiritual happiness.</p>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg">
            <h4 class="font-semibold mb-2">Meanings</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-white p-3 rounded-lg">
                <p><strong>True knowledge:</strong> Knowledge about God and spiritual reality</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Disciple:</strong> One who is learning about God from a teacher</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Mahāsamādhi:</strong> To become one with God; the final departure of a great soul</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Eternal:</strong> Everlasting; that which cannot die or be destroyed</p>
              </div>
            </div>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'What did Sri Ramakrishna claim he could not do?',
              answers: [
                'Speak loudly',
                'Touch money',
                'Eat certain foods',
                'Walk long distances'
              ],
              correctAnswer: 1
            },
            {
              question: 'How did Naren test Sri Ramakrishna\'s claim about money?',
              answers: [
                'He offered money directly',
                'He put a coin under Sri Ramakrishna\'s mattress',
                'He asked him to count money',
                'He showed him gold coins'
              ],
              correctAnswer: 1
            },
            {
              question: 'What happened when Sri Ramakrishna sat on the hidden coin?',
              answers: [
                'Nothing happened',
                'He found the coin immediately',
                'He jumped and his body burned',
                'He became angry'
              ],
              correctAnswer: 2
            },
            {
              question: 'How old was Naren when his father died?',
              answers: [
                'About sixteen years old',
                'About eighteen years old',
                'About twenty years old',
                'About fifteen years old'
              ],
              correctAnswer: 1
            },
            {
              question: 'Where did Sri Ramakrishna tell Naren to ask for help?',
              answers: [
                'From rich people',
                'From the government',
                'From Mother Kāli in the temple',
                'From his relatives'
              ],
              correctAnswer: 2
            },
            {
              question: 'What did Naren ask for when he prayed to Mother Kali?',
              answers: [
                'Money, food, and clothes',
                'Devotion, love, and true knowledge',
                'A good job',
                'Fame and success'
              ],
              correctAnswer: 1
            },
            {
              question: 'When did Sri Ramakrishna enter mahāsamādhi?',
              answers: [
                '1885',
                '1886',
                '1887',
                '1888'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did Naren and the other disciples form after Sri Ramakrishna\'s passing?',
              answers: [
                'A business organization',
                'The Ramakrishna Math and Ramakrishna Mission',
                'A political party',
                'A school'
              ],
              correctAnswer: 1
            },
            {
              question: 'What was Naren\'s new name when he became a monk?',
              answers: [
                'Swami Ramakrishna',
                'Swami Vivekānanda',
                'Swami Narendranath',
                'Swami Sarada'
              ],
              correctAnswer: 1
            },
            {
              question: 'According to Swami Vivekananda, what should we do to avoid suffering?',
              answers: [
                'Avoid all people',
                'Only think about ourselves',
                'Serve the poor and give our heart and mind to God',
                'Become very rich'
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      {
        id: 'remain-in-your-religion',
        title: 'Remain in Your Own Religion',
        description: 'Learn the importance of commitment and perseverance in spiritual practice through the parable of the well digger',
        content: `
          <h2>Remain in Your Own Religion</h2>
          <div class="text-center mb-6">
            <img src="/pics/well-digger-parable.jpg" alt="A man digging a well, illustrating the importance of perseverance" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">The parable of the well digger teaches us about commitment and perseverance</p>
          </div>

          <p>This beautiful parable teaches us an important lesson about commitment, perseverance, and the danger of constantly changing our spiritual path. Through a simple story about digging a well, we learn profound truths about spiritual practice.</p>

          <h3>The Beginning of the Quest</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Once upon a time, there lived a man who had a genuine need and decided to take action to fulfill it.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Need for Water</h4>
              <p class="mb-3">Once upon a time a man wanted to dig a well to find water for his needs.</p>
              <p class="font-medium">This represents our spiritual thirst - the deep need every human has for connection with the Divine.</p>
            </div>
          </div>

          <h3>The First Advice</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Starting the Journey</h4>
            <p class="mb-4">Like many seekers, the man sought guidance from others about where to begin his search.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Following Guidance</h4>
              <p class="mb-3">Someone told him to start digging at a certain spot.</p>
              <p class="mb-3">He did so, trusting the advice and beginning his work with dedication.</p>
              <p class="font-medium">This represents choosing a spiritual path and beginning sincere practice.</p>
            </div>
          </div>

          <h3>The First Disappointment</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">After some effort, the man faced his first challenge and disappointment.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">No Immediate Results</h4>
              <p class="mb-3">After digging five metres and finding no water, he became sad.</p>
              <p class="font-medium">This represents the discouragement we feel when spiritual practice doesn't give immediate results.</p>
            </div>
          </div>

          <h3>The Second Advisor</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">In his moment of discouragement, another person appeared with different advice.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Criticism and New Direction</h4>
              <p class="mb-3">In the meantime another man came and laughed at his foolish attempt.</p>
              <p class="mb-3">He advised him to dig in another spot which he said was the best.</p>
              <p class="font-medium">This represents people who criticize our spiritual path and suggest their way is better.</p>
            </div>
          </div>

          <h3>The Second Attempt</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Starting Over</h4>
            <p class="mb-4">Influenced by the criticism and new advice, the man abandoned his first effort.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">More Effort, Same Result</h4>
              <p class="mb-3">So the man went there and started digging. This time he went down six metres and no water was found.</p>
              <p class="font-medium">Despite more effort than before, he still didn't achieve his goal because he had started over.</p>
            </div>
          </div>

          <h3>The Third Advisor</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">The pattern of seeking new advice continued, leading to further confusion.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Another "Better" Option</h4>
              <p class="mb-3">A third man came and asked him to try in another and better place which he pointed out to him.</p>
              <p class="mb-3">He followed and a new spot was shown to him.</p>
              <p class="font-medium">This represents the constant temptation to try new spiritual methods when our current practice seems difficult.</p>
            </div>
          </div>

          <h3>The Third Attempt</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">The man's third attempt required even more effort but still led to disappointment.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Greater Effort, Greater Disappointment</h4>
              <p class="mb-3">He went on digging and digging till ten metres of depth was reached.</p>
              <p class="mb-3">In utter sadness he was going to give up the task completely.</p>
              <p class="font-medium">Each new start required more effort but brought him no closer to his goal.</p>
            </div>
          </div>

          <h3>The Fourth Advisor - The Great Temptation</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Most Attractive Offer</h4>
            <p class="mb-4">Just when the man was about to give up, the most tempting offer appeared.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Promise of Easy Success</h4>
              <p class="mb-3">A fourth man came up to him, smiling sweetly and said, 'My child, you have worked hard indeed, but because you have followed the wrong advice all your hard work has been useless.'</p>
              <p class="mb-3">'Very well, kindly follow me, and I will take you to a spot where if you only touch your spade to the ground, water will flow out like a fountain.'</p>
              <p class="font-medium">This represents teachers who promise instant spiritual results with minimal effort.</p>
            </div>
          </div>

          <h3>The Irresistible Temptation</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">The promise of easy success proved too attractive to resist.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Following False Promises</h4>
              <p class="mb-3">The temptation was too great for him and so he followed this fourth man, and did according to his advice.</p>
              <p class="mb-3">He went on digging, expecting every moment to find water.</p>
              <p class="font-medium">This shows how we can be misled by promises of quick spiritual gains.</p>
            </div>
          </div>

          <h3>The Final Disappointment</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">The fourth attempt, despite the grand promises, led to the greatest disappointment of all.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Bitter Truth</h4>
              <p class="mb-3">Patiently he dug down ten metres, but alas! There was no water.</p>
              <p class="mb-3">Then utterly disappointed he gave up the work completely.</p>
              <p class="font-medium">When easy promises fail, people often abandon spiritual seeking altogether.</p>
            </div>
          </div>

          <h3>The Tragic Calculation</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Cost of Inconsistency</h4>
            <p class="mb-4">The story reveals the tragic mathematics of spiritual inconsistency.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Wasted Effort</h4>
              <p class="mb-3">By this time he had dug thirty-one metres altogether (5 + 6 + 10 + 10 = 31 metres).</p>
              <p class="mb-3">But if he had remained in one place to dig, he would surely have been successful.</p>
              <p class="font-medium">His total effort was more than enough to reach water, but it was scattered across different locations.</p>
            </div>
          </div>

          <h3>The Spiritual Lesson</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">The parable now reveals its deeper spiritual meaning about religious practice.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Parallel to Spiritual Life</h4>
              <p class="mb-3">Similarly, people who cannot stick to their religion, and always hastily move about from one religion to another, at last turn out to be sad, giving up religion altogether.</p>
              <p class="font-medium">Constant changing of spiritual paths leads to spiritual failure and eventual abandonment of the quest.</p>
            </div>
          </div>

          <h3>The Golden Teaching</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">The story concludes with a clear and practical instruction for spiritual seekers.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Path to Success</h4>
              <div class="bg-indian-cream p-4 rounded-lg">
                <p class="italic text-center text-lg font-semibold">"Stay with your own religion"</p>
              </div>
              <p class="mt-3">This simple instruction contains profound wisdom about spiritual commitment and perseverance.</p>
            </div>
          </div>

          <h3>Why Commitment Matters</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Spiritual Science</h4>
            <p class="mb-4">There are deep reasons why staying with one spiritual path is more effective than constantly changing.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Depth vs. Breadth</h4>
              <div class="space-y-3">
                <div class="bg-spiritual-50 p-3 rounded-lg">
                  <p><strong>Accumulated Practice:</strong> Spiritual progress builds upon previous efforts</p>
                </div>
                <div class="bg-spiritual-50 p-3 rounded-lg">
                  <p><strong>Deep Understanding:</strong> Mastery comes from going deep, not wide</p>
                </div>
                <div class="bg-spiritual-50 p-3 rounded-lg">
                  <p><strong>Overcoming Obstacles:</strong> Every path has difficulties that must be worked through</p>
                </div>
                <div class="bg-spiritual-50 p-3 rounded-lg">
                  <p><strong>Divine Grace:</strong> Consistent devotion attracts divine blessings</p>
                </div>
              </div>
            </div>
          </div>

          <h3>Common Temptations to Avoid</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">The story warns us about common temptations that lead spiritual seekers astray.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Spiritual Pitfalls</h4>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Impatience:</strong> Expecting immediate results from spiritual practice</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Comparison:</strong> Thinking other paths are better or easier</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>False Promises:</strong> Being attracted to claims of instant enlightenment</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Discouragement:</strong> Giving up when practice becomes difficult</span>
                </li>
              </ul>
            </div>
          </div>

          <h3>Practical Applications</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <h4 class="font-semibold mb-3">How to Apply This Teaching</h4>
            <div class="space-y-3">
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Choose Wisely:</strong> Select a spiritual path that resonates with your heart and culture</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Commit Deeply:</strong> Give your chosen path sufficient time and effort to bear fruit</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Persist Through Difficulties:</strong> Understand that challenges are part of spiritual growth</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Seek Guidance:</strong> Find authentic teachers within your tradition</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Trust the Process:</strong> Have faith that sincere practice will eventually yield results</p>
              </div>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg text-center">
            <h4 class="font-semibold text-lg mb-2">The Wisdom of Commitment</h4>
            <p>This beautiful parable teaches us that spiritual success comes not from finding the "perfect" path, but from walking our chosen path with commitment, patience, and perseverance. Just as the well digger would have found water if he had stayed in one place, we will find the spiritual fulfillment we seek if we remain committed to our own religious tradition and practice it with sincerity and dedication.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'What did the man in the story want to do?',
              answers: [
                'Build a house',
                'Dig a well',
                'Plant a garden',
                'Make a road'
              ],
              correctAnswer: 1
            },
            {
              question: 'How deep did the man dig in his first attempt?',
              answers: [
                'Five metres',
                'Six metres',
                'Ten metres',
                'Three metres'
              ],
              correctAnswer: 0
            },
            {
              question: 'How deep did he dig in his second attempt?',
              answers: [
                'Five metres',
                'Six metres',
                'Ten metres',
                'Eight metres'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did the fourth man promise would happen?',
              answers: [
                'He would find water after much digging',
                'Water would flow out like a fountain just by touching the spade to the ground',
                'He would find gold instead of water',
                'He would never find water'
              ],
              correctAnswer: 1
            },
            {
              question: 'How many metres did the man dig altogether?',
              answers: [
                'Twenty-five metres',
                'Thirty metres',
                'Thirty-one metres',
                'Thirty-five metres'
              ],
              correctAnswer: 2
            },
            {
              question: 'What would have happened if the man had stayed in one place?',
              answers: [
                'He would never have found water',
                'He would surely have been successful',
                'He would have given up sooner',
                'He would have needed help'
              ],
              correctAnswer: 1
            },
            {
              question: 'What happens to people who keep changing religions?',
              answers: [
                'They become very wise',
                'They find the best religion',
                'They turn out to be sad and give up religion altogether',
                'They become teachers'
              ],
              correctAnswer: 2
            },
            {
              question: 'What is the main teaching of this story?',
              answers: [
                'Always listen to others\' advice',
                'Stay with your own religion',
                'Keep trying new things',
                'Give up when things get difficult'
              ],
              correctAnswer: 1
            },
            {
              question: 'What does the well represent in this parable?',
              answers: [
                'Material wealth',
                'Spiritual fulfillment and connection with God',
                'Physical strength',
                'Academic knowledge'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is the main reason the man failed to find water?',
              answers: [
                'He didn\'t dig deep enough',
                'There was no water anywhere',
                'He kept changing locations instead of staying in one place',
                'He used the wrong tools'
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      {
        id: 'the-carpenters-house',
        title: 'The Carpenter\'s House',
        description: 'Learn about personal responsibility and the importance of giving your best effort through the parable of the carpenter',
        content: `
          <h2>The Carpenter's House</h2>
          <div class="text-center mb-6">
            <img src="/pics/carpenter-house.jpg" alt="An elderly carpenter working on a house, representing life's work and responsibility" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">The carpenter's final house teaches us about personal responsibility and excellence</p>
          </div>

          <p>This powerful parable teaches us that we are constantly building the "house" of our life through our daily actions, choices, and efforts. It reminds us that we must always give our best because we will have to live with the consequences of our work.</p>

          <h3>The Experienced Carpenter</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Our story begins with a skilled craftsman who had dedicated his life to his profession.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">A Life of Service</h4>
              <p class="mb-3">An elderly carpenter was ready to retire after many years of faithful service.</p>
              <p class="font-medium">He had spent his career building homes for others, using his skills to create shelter and comfort for many families.</p>
            </div>
          </div>

          <h3>The Decision to Retire</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Time for Rest</h4>
            <p class="mb-4">After years of hard work, the carpenter felt it was time to enjoy the fruits of his labor.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Retirement Plan</h4>
              <p class="mb-3">He told his employer-contractor of his plans to leave the house building business.</p>
              <p class="mb-3">He wanted to live a more leisurely life with his wife, enjoying his extended family.</p>
              <p class="font-medium">He would miss the pay cheque, but he needed to retire and rest after his long career.</p>
            </div>
          </div>

          <h3>The Contractor's Sadness</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">The employer recognized the value of losing such a skilled and dedicated worker.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Appreciation for Good Work</h4>
              <p class="mb-3">The contractor was sorry to see his good worker go.</p>
              <p class="font-medium">This shows how valuable dedicated, skilled workers are to any organization or community.</p>
            </div>
          </div>

          <h3>The Final Request</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">The contractor made one last request of his faithful employee.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">A Personal Favor</h4>
              <p class="mb-3">The contractor asked if he could build just one more house as a personal favour.</p>
              <p class="font-medium">This request seemed reasonable - just one final project before retirement.</p>
            </div>
          </div>

          <h3>The Carpenter's Agreement</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Saying Yes</h4>
            <p class="mb-4">The carpenter agreed to the request, but his attitude had already changed.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Reluctant Acceptance</h4>
              <p class="mb-3">The carpenter said yes to building one more house.</p>
              <p class="font-medium">However, his heart was no longer fully committed to the work, as his mind was already on retirement.</p>
            </div>
          </div>

          <h3>The Decline in Quality</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">As the work progressed, it became clear that the carpenter's standards had dropped significantly.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Heart Not in the Work</h4>
              <p class="mb-3">In time it was easy to see that his heart was not in his work.</p>
              <p class="mb-3">He resorted to shoddy workmanship and used inferior materials.</p>
              <p class="font-medium">This was completely unlike his usual high standards and careful craftsmanship.</p>
            </div>
          </div>

          <h3>An Unfortunate End</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">The carpenter's final project became a disappointment rather than a crowning achievement.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">A Poor Legacy</h4>
              <p class="mb-3">It was an unfortunate way to end his career.</p>
              <p class="font-medium">Instead of finishing with excellence, he was ending with his worst work.</p>
            </div>
          </div>

          <h3>The Completion and Inspection</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Final Moment</h4>
            <p class="mb-4">When the house was finished, the time came for the final inspection and handover.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Contractor's Visit</h4>
              <p class="mb-3">When the carpenter finished his work and the builder came to inspect the house, everything seemed normal.</p>
              <p class="font-medium">The carpenter probably expected to receive his final payment and say goodbye.</p>
            </div>
          </div>

          <h3>The Shocking Revelation</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">What happened next completely changed everything the carpenter thought he knew about this project.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Unexpected Gift</h4>
              <p class="mb-3">The contractor handed the front-door key to the carpenter.</p>
              <p class="mb-3">'This is your house,' he said, 'my gift to you.'</p>
              <p class="font-medium">The house he had built carelessly was actually intended as his retirement gift!</p>
            </div>
          </div>

          <h3>The Carpenter's Shock</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">The carpenter's reaction reveals the full impact of his poor choices.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Overwhelming Regret</h4>
              <p class="mb-3">What a shock! What a shame!</p>
              <p class="mb-3">If he had only known he was building his own house, he would have done it all so differently.</p>
              <p class="font-medium">The realization of his mistake was devastating and immediate.</p>
            </div>
          </div>

          <h3>Living with the Consequences</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Price of Poor Work</h4>
            <p class="mb-4">The carpenter now faced the reality of his choices every single day.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Daily Reminders</h4>
              <p class="mb-3">Now he had to live in the home he had built none too well.</p>
              <p class="font-medium">Every creaky board, every poor joint, every inferior material would remind him of his careless work.</p>
            </div>
          </div>

          <h3>The Universal Application</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">The story now reveals its deeper meaning about how we all live our lives.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">We Are All Builders</h4>
              <p class="mb-3">So it is with us. We build our lives in a distracted way, reacting rather than acting.</p>
              <p class="mb-3">We are willing to put up less than the best.</p>
              <p class="font-medium">Like the carpenter, we often don't realize we're building our own future.</p>
            </div>
          </div>

          <h3>The Pattern of Mediocrity</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">The parable identifies common patterns in how we approach life's important moments.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Missing the Important Moments</h4>
              <p class="mb-3">At important points we do not give the job our best effort.</p>
              <p class="font-medium">We save our best for "someday" instead of giving it today.</p>
            </div>
          </div>

          <h3>The Moment of Realization</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Shock of Recognition</h4>
            <p class="mb-4">Eventually, we all face the consequences of our choices and realize what we have created.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Living in Our Creation</h4>
              <p class="mb-3">Then with a shock we look at the situation we have created and find that we are now living in the house we have built.</p>
              <p class="font-medium">Our current life circumstances are largely the result of our past choices and efforts.</p>
            </div>
          </div>

          <h3>The Regret of Missed Opportunities</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">The final lesson emphasizes the tragedy of not giving our best when it matters.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">If Only We Had Known</h4>
              <p class="mb-3">If we had realized that we would have done it differently.</p>
              <p class="font-medium">But the time for "if only" comes too late - we must live with what we have built.</p>
            </div>
          </div>

          <h3>Life Lessons from the Carpenter</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <h4 class="font-semibold mb-3">What This Story Teaches Us</h4>
            <div class="space-y-3">
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Excellence Always:</strong> Give your best effort in everything, as you never know its true importance</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Personal Responsibility:</strong> We are responsible for the quality of our life's work</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Present Moment Awareness:</strong> Every day we are building our future through our current actions</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>No Throwaway Moments:</strong> Every task, relationship, and opportunity matters</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Long-term Thinking:</strong> Consider how today's choices will affect tomorrow's reality</p>
              </div>
            </div>
          </div>

          <h3>Practical Applications</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">How to Build a Better Life</h4>
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Daily Excellence</h4>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>In Studies:</strong> Give your best effort in every subject, not just your favorites</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>In Relationships:</strong> Treat every person with respect and kindness</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>In Work:</strong> Take pride in your work, regardless of how small the task</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>In Character:</strong> Build good habits and moral strength daily</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>In Spiritual Life:</strong> Practice devotion and service consistently</span>
                </li>
              </ul>
            </div>
          </div>

          <h3>The Choice is Ours</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Unlike the carpenter, we still have time to choose excellence in building our life.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">It's Not Too Late</h4>
              <p class="mb-3">Every day gives us new opportunities to build with excellence.</p>
              <p class="mb-3">We can choose to be intentional rather than distracted.</p>
              <p class="font-medium">We can decide to give our best effort, knowing that we are building our own future.</p>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg text-center">
            <h4 class="font-semibold text-lg mb-2">Building Your Life with Excellence</h4>
            <p>The carpenter's story reminds us that we are all builders, constructing the house of our life through our daily choices, efforts, and attitudes. Every action is a brick, every decision is a beam, and every habit is a foundation stone. We cannot afford to build carelessly, thinking "this doesn't matter" or "I'll do better next time," because we will have to live in whatever we create. Let us build with excellence, integrity, and love, knowing that we are creating not just our future, but our eternal home.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'What was the carpenter ready to do?',
              answers: [
                'Start a new job',
                'Retire from house building',
                'Move to another city',
                'Learn new skills'
              ],
              correctAnswer: 1
            },
            {
              question: 'How did the contractor feel about the carpenter leaving?',
              answers: [
                'He was happy',
                'He was indifferent',
                'He was sorry to see his good worker go',
                'He was angry'
              ],
              correctAnswer: 2
            },
            {
              question: 'What did the contractor ask the carpenter to do?',
              answers: [
                'Train a new worker',
                'Build just one more house as a personal favor',
                'Stay for another year',
                'Recommend a replacement'
              ],
              correctAnswer: 1
            },
            {
              question: 'How was the carpenter\'s attitude toward the final house?',
              answers: [
                'He was very excited',
                'His heart was not in his work',
                'He worked harder than ever',
                'He was completely focused'
              ],
              correctAnswer: 1
            },
            {
              question: 'What kind of workmanship did the carpenter use on the final house?',
              answers: [
                'His best work ever',
                'Shoddy workmanship and inferior materials',
                'Average quality work',
                'Experimental techniques'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did the contractor give to the carpenter when the house was finished?',
              answers: [
                'A bonus payment',
                'A recommendation letter',
                'The front-door key, saying "This is your house"',
                'A retirement party'
              ],
              correctAnswer: 2
            },
            {
              question: 'How did the carpenter feel when he learned the house was his?',
              answers: [
                'Very happy and grateful',
                'Shocked and ashamed',
                'Confused but pleased',
                'Indifferent'
              ],
              correctAnswer: 1
            },
            {
              question: 'What would the carpenter have done differently if he had known?',
              answers: [
                'He would have refused to build it',
                'He would have charged more money',
                'He would have done it all so differently with better quality',
                'He would have taken more time'
              ],
              correctAnswer: 2
            },
            {
              question: 'According to the story, how do we build our lives?',
              answers: [
                'With careful planning and excellence',
                'In a distracted way, reacting rather than acting',
                'By following others\' advice',
                'By waiting for the right moment'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is the main lesson of this parable?',
              answers: [
                'Always ask for payment upfront',
                'Retirement should be planned carefully',
                'We are building our own life through our daily actions and should give our best effort',
                'Contractors are generous people'
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      {
        id: 'the-hare-and-donkey',
        title: 'The Hare and the Donkey',
        description: 'Learn about courage, cleverness, and helping others through the story of a brave hare who saved a donkey',
        content: `
          <h2>The Hare and the Donkey</h2>
          <div class="text-center mb-6">
            <img src="/pics/hare-donkey-story.jpg" alt="A clever hare helping a donkey escape from dangerous predators" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">The clever hare using wit and courage to save the innocent donkey</p>
          </div>

          <p>This exciting story teaches us about the power of intelligence, courage, and compassion. It shows how a small but clever animal can overcome much larger and stronger enemies to save an innocent life.</p>

          <h3>The Peaceful Donkey</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Our story begins with an innocent animal living peacefully in nature.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">A Simple Life</h4>
              <p class="mb-3">A healthy, young donkey was grazing on the green grass growing on a hilltop.</p>
              <p class="font-medium">He was living a simple, peaceful life, harming no one and enjoying the beauty of nature.</p>
            </div>
          </div>

          <h3>The Threat Appears</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Danger from the Predator</h4>
            <p class="mb-4">Unfortunately, the donkey's peaceful life was about to be threatened by a dangerous predator.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Hungry Wolf</h4>
              <p class="mb-3">Unfortunately a hungry wolf saw him and approached the donkey.</p>
              <p class="mb-3">The wolf said, "Ah! You are such a juicy donkey. I'll eat you for lunch."</p>
              <p class="font-medium">This represents how evil often threatens the innocent and peaceful.</p>
            </div>
          </div>

          <h3>The Donkey's Quick Thinking</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Faced with immediate danger, the donkey had to think quickly to save his life.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">A Clever Delay</h4>
              <p class="mb-3">The donkey thought of saving his life, so he said, "Surely, sir, you can eat me but listen to me first."</p>
              <p class="mb-3">"Come to meet me here, at the same spot one year from now. Then I'll be bigger, fatter and more juicy to eat."</p>
              <p class="font-medium">This shows how intelligence can be used to buy time when facing immediate danger.</p>
            </div>
          </div>

          <h3>The Wolf's Greed</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">The wolf's greed made him accept the donkey's proposal, giving the donkey a temporary reprieve.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Greed Overcomes Hunger</h4>
              <p class="mb-3">The wolf was hungry but approved of the idea of getting a bigger meal later.</p>
              <p class="font-medium">So the wolf went away, postponing his evil plan for the promise of greater satisfaction.</p>
            </div>
          </div>

          <h3>A Year Passes</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Appointed Day</h4>
            <p class="mb-4">Time passed, but the wolf did not forget his evil intention.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Wolf Returns</h4>
              <p class="mb-3">A year passed by. On the appointed day, the wolf was climbing up the hillside eager to go and eat the donkey.</p>
              <p class="font-medium">This shows how evil plans are often persistent and patient.</p>
            </div>
          </div>

          <h3>The Fox Joins In</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">As the wolf headed to fulfill his evil plan, he encountered another predator.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Evil Attracts Evil</h4>
              <p class="mb-3">A fox came by and asked, "Where are you rushing to, my friend?"</p>
              <p class="mb-3">The wolf said, "A fat donkey is waiting at the hilltop to be my lunch. Why don't you join me to enjoy the feast?"</p>
              <p class="font-medium">The fox was hungry so he readily agreed to the idea, showing how evil often multiplies.</p>
            </div>
          </div>

          <h3>The Hare Appears</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">As the two predators rushed toward their victim, they encountered a third animal.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Unexpected Helper</h4>
              <p class="mb-3">When the wolf and the fox were running to the hilltop, a hare came by.</p>
              <p class="mb-3">He asked, "Friends, where are you going?"</p>
              <p class="mb-3">The fox replied, "We are going to enjoy donkey meat for lunch. Would you like to join us?"</p>
              <p class="font-medium">The clever hare agreed, but his intentions were very different from theirs.</p>
            </div>
          </div>

          <h3>Reaching the Victim</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Moment of Truth</h4>
            <p class="mb-4">The three animals reached the hilltop where the donkey was waiting, unaware of the approaching danger.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Donkey's Growth</h4>
              <p class="mb-3">All the three soon reached the place where the donkey was grazing.</p>
              <p class="mb-3">He had grown bigger and fatter, just as he had promised.</p>
              <p class="font-medium">The wolf was about to pounce on the donkey when the hare intervened.</p>
            </div>
          </div>

          <h3>The Hare's Clever Intervention</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Just when it seemed the donkey was doomed, the clever hare stepped in with a brilliant plan.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">A Better Method</h4>
              <p class="mb-3">The clever hare said, "Please stop! If you attack or cut him up, the donkey will become a mess."</p>
              <p class="mb-3">"We won't be able to taste its juicy meat. I suggest we kill him by strangling his neck."</p>
              <p class="font-medium">"I'll go and get a rope to tie and strangle his neck," the hare offered.</p>
            </div>
          </div>

          <h3>The Hare's Ingenious Plan</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">The hare returned with a rope, but his plan was far more clever than the predators realized.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Special Rope</h4>
              <p class="mb-3">Soon the hare brought a rope. He made a large but loose noose at one end of the rope for the donkey.</p>
              <p class="mb-3">He also made two smaller nooses at the other end of the rope.</p>
              <p class="font-medium">The fox asked, "Why have you made the smaller nooses?"</p>
            </div>
          </div>

          <h3>The Hare's Explanation</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Deceptive Instructions</h4>
            <p class="mb-4">The hare gave a convincing explanation that would lead the predators into his trap.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The False Plan</h4>
              <p class="mb-3">The hare said, "The large noose is for the donkey. Each of the two small nooses I'll put round your necks."</p>
              <p class="mb-3">"You must pull hard in opposite directions to tighten the noose round the neck of the donkey."</p>
              <p class="font-medium">"I'll hold the rope by my teeth so that the nooses round your neck won't tighten."</p>
            </div>
          </div>

          <h3>Setting the Trap</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">The predators, blinded by their greed, fell completely into the hare's clever trap.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Everyone in Position</h4>
              <p class="mb-3">The fox, wolf and the donkey had their nooses put around their necks.</p>
              <p class="font-medium">Just as the fox and the wolf got their nooses, the hare was ready to execute his plan.</p>
            </div>
          </div>

          <h3>The Brilliant Escape</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">At the crucial moment, the hare revealed his true intention and saved the donkey's life.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Perfect Execution</h4>
              <p class="mb-3">The hare let go of the rope at the perfect moment.</p>
              <p class="mb-3">The donkey ran down the hill, his loose noose falling away harmlessly.</p>
              <p class="font-medium">The pull caused the nooses to tighten round the fox's and wolf's necks.</p>
            </div>
          </div>

          <h3>Justice Served</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The End of Evil</h4>
            <p class="mb-4">The hare's clever plan resulted in perfect justice - the innocent was saved and the evil was defeated.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Final Outcome</h4>
              <p class="mb-3">The loose noose of the donkey did not harm him as he escaped to safety.</p>
              <p class="font-medium">Thus, the two evil animals met their end, caught in their own trap.</p>
            </div>
          </div>

          <h3>The Moral Teaching</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">This exciting story teaches us a profound moral lesson about our duty to help others.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Golden Teaching</h4>
              <div class="bg-spiritual-50 p-4 rounded-lg">
                <p class="italic text-center text-lg font-semibold">"We must do our best to save others' lives."</p>
              </div>
              <p class="mt-3">This moral reminds us that we have a responsibility to help those in danger when we have the ability to do so.</p>
            </div>
          </div>

          <h3>Lessons from the Hare's Actions</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <h4 class="font-semibold mb-3">What We Can Learn</h4>
            <div class="space-y-3">
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Courage:</strong> The hare risked his own safety to help the donkey</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Intelligence:</strong> He used his wit to overcome stronger enemies</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Compassion:</strong> He felt moved to help an innocent creature in danger</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Quick Thinking:</strong> He devised a brilliant plan under pressure</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Justice:</strong> He ensured that evil was defeated and good was protected</p>
              </div>
            </div>
          </div>

          <h3>The Power of Intelligence over Strength</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Brain vs. Brawn</h4>
            <p class="mb-4">This story shows us that intelligence and cleverness can overcome physical strength and numbers.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">David vs. Goliath Principle</h4>
              <p class="mb-3">The small hare defeated two larger, stronger predators through clever planning.</p>
              <p class="font-medium">This teaches us that size and strength are not everything - wisdom and courage matter more.</p>
            </div>
          </div>

          <h3>Practical Applications</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">How can we apply the hare's example in our daily lives?</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Ways to Help Others</h4>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Stand up for the bullied:</strong> Protect those who are being mistreated</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Help those in need:</strong> Assist people facing difficulties</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Use your talents:</strong> Apply your skills to solve problems for others</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Think creatively:</strong> Find innovative solutions to help people</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Be brave:</strong> Take risks to do what's right</span>
                </li>
              </ul>
            </div>
          </div>

          <h3>The Importance of Helping Others</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">The story emphasizes why we should always try to help those in danger or need.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Why Help Others?</h4>
              <div class="space-y-3">
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p><strong>Moral Duty:</strong> It's the right thing to do</p>
                </div>
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p><strong>Creating Good Karma:</strong> Good deeds bring good results</p>
                </div>
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p><strong>Building Character:</strong> Helping others makes us better people</p>
                </div>
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p><strong>Making the World Better:</strong> Each act of kindness improves society</p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg text-center">
            <h4 class="font-semibold text-lg mb-2">The Hero Within</h4>
            <p>The hare's story reminds us that we all have the potential to be heroes in someone else's life. We don't need to be the biggest or strongest - we just need to have courage, compassion, and the willingness to use our abilities to help others. When we see someone in danger or need, we should ask ourselves: "What would the clever hare do?" and then find creative ways to make a positive difference in their lives.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'Where was the donkey when the wolf first saw him?',
              answers: [
                'In a valley',
                'Grazing on green grass on a hilltop',
                'Near a river',
                'In a forest'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did the wolf want to do when he first saw the donkey?',
              answers: [
                'Make friends with him',
                'Ask for directions',
                'Eat him for lunch',
                'Play with him'
              ],
              correctAnswer: 2
            },
            {
              question: 'What clever suggestion did the donkey make to the wolf?',
              answers: [
                'To find another animal to eat',
                'To come back in one year when he would be bigger and fatter',
                'To share the grass with him',
                'To bring his friends along'
              ],
              correctAnswer: 1
            },
            {
              question: 'How long did the wolf wait before returning?',
              answers: [
                'One month',
                'Six months',
                'One year',
                'Two years'
              ],
              correctAnswer: 2
            },
            {
              question: 'Who joined the wolf on his way to eat the donkey?',
              answers: [
                'A fox and a hare',
                'Two other wolves',
                'A bear and a fox',
                'Only a fox'
              ],
              correctAnswer: 0
            },
            {
              question: 'What method did the hare suggest for killing the donkey?',
              answers: [
                'Attacking him directly',
                'Strangling his neck with a rope',
                'Chasing him until he was tired',
                'Surrounding him'
              ],
              correctAnswer: 1
            },
            {
              question: 'How many nooses did the hare make?',
              answers: [
                'One large noose only',
                'Two small nooses only',
                'One large noose and two small nooses',
                'Three equal-sized nooses'
              ],
              correctAnswer: 2
            },
            {
              question: 'What happened when the hare let go of the rope?',
              answers: [
                'All three animals were caught',
                'The donkey escaped and the fox and wolf were caught',
                'Everyone escaped safely',
                'Only the wolf was caught'
              ],
              correctAnswer: 1
            },
            {
              question: 'Why didn\'t the donkey get hurt by the noose?',
              answers: [
                'He was too strong',
                'The hare protected him',
                'His noose was large and loose',
                'He cut the rope'
              ],
              correctAnswer: 2
            },
            {
              question: 'What is the main moral of this story?',
              answers: [
                'Always be careful of strangers',
                'Intelligence is better than strength',
                'We must do our best to save others\' lives',
                'Don\'t trust wolves and foxes'
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      {
        id: 'misers-money',
        title: 'Miser\'s Money',
        description: 'Learn about the dangers of miserliness and the importance of using wealth wisely through Mohan\'s story',
        content: `
          <h2>Miser's Money</h2>
          <div class="text-center mb-6">
            <img src="/pics/miser-money.jpg" alt="A miser counting his money under a tree, representing the futility of hoarding wealth" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">The miser's obsession with counting money that he never uses</p>
          </div>

          <p>This thought-provoking story teaches us about the proper relationship with money and possessions. It shows how miserliness can lead to misery and how unused wealth is no different from worthless stones.</p>

          <h3>The Successful Merchant</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Our story begins with a man who had achieved financial success through his hard work and business skills.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Early Success</h4>
              <p class="mb-3">Mohan was a merchant who, as a young man, had earned a lot of money through his business.</p>
              <p class="font-medium">His success showed that he was intelligent, hardworking, and skilled in commerce.</p>
            </div>
          </div>

          <h3>The Transformation into a Miser</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">From Success to Obsession</h4>
            <p class="mb-4">As Mohan grew older, his relationship with money changed from healthy earning to unhealthy hoarding.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Miser's Mindset</h4>
              <p class="mb-3">Now he was old and had more than enough money, but he was a miser.</p>
              <p class="mb-3">He did not spend his money on anything - not even on his own needs or comfort.</p>
              <p class="font-medium">This shows how the fear of losing money can transform a successful person into a miserable hoarder.</p>
            </div>
          </div>

          <h3>The Fear of Theft</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Mohan's miserliness was accompanied by constant fear and anxiety about losing his wealth.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Living in Fear</h4>
              <p class="mb-3">As Mohan lived in a village, he felt it unsafe to leave his money in his house.</p>
              <p class="font-medium">This fear shows how attachment to money can rob us of peace and security.</p>
            </div>
          </div>

          <h3>The Secret Hiding Place</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Driven by fear, Mohan devised what he thought was a clever plan to protect his wealth.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Fig Tree Vault</h4>
              <p class="mb-3">So he spotted a fig tree behind his house and dug a hole under it.</p>
              <p class="mb-3">He hid his pot-full of money there, thinking it would be safe from thieves.</p>
              <p class="font-medium">But even this hiding place could not give him the peace he sought.</p>
            </div>
          </div>

          <h3>The Nightly Ritual</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Obsessive Behavior</h4>
            <p class="mb-4">Mohan's fear and attachment led him to develop a compulsive nightly routine.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Counting Compulsion</h4>
              <p class="mb-3">He was always scared that someone would steal his money.</p>
              <p class="mb-3">Every night he would dig out the pot from under the tree, count the money and hide it again.</p>
              <p class="font-medium">This ritual shows how miserliness becomes a prison that traps the miser in endless worry.</p>
            </div>
          </div>

          <h3>The Suspicious Neighbor</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Mohan's secretive behavior eventually attracted unwanted attention from his neighbor.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Growing Suspicion</h4>
              <p class="mb-3">One day Mohan's neighbor Bhavesh grew suspicious.</p>
              <p class="mb-3">He thought, "Why does Mohan go to the back of his house each night?"</p>
              <p class="font-medium">This shows how secretive behavior often draws the very attention we're trying to avoid.</p>
            </div>
          </div>

          <h3>The Discovery</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Bhavesh's curiosity led him to spy on Mohan and discover his secret.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Secret Revealed</h4>
              <p class="mb-3">So one night Bhavesh hid behind a wall and saw Mohan leave his house.</p>
              <p class="mb-3">Then he saw and understood what Mohan used to do every night.</p>
              <p class="font-medium">Bhavesh now knew exactly where Mohan's treasure was hidden.</p>
            </div>
          </div>

          <h3>The Theft</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Inevitable Happens</h4>
            <p class="mb-4">Armed with this knowledge, Bhavesh executed a simple but effective theft.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Perfect Crime</h4>
              <p class="mb-3">The next day when Mohan had gone out, Bhavesh went to the fig tree.</p>
              <p class="mb-3">He dug out the pot, took out the money and placed pebbles in the pot.</p>
              <p class="font-medium">He took the money home, leaving Mohan with a pot full of stones.</p>
            </div>
          </div>

          <h3>The Shocking Discovery</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">That night, Mohan's routine led him to a devastating discovery.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Moment of Truth</h4>
              <p class="mb-3">That night, as usual, Mohan went to check his pot of money.</p>
              <p class="mb-3">But he found pebbles in the pot instead of his precious coins.</p>
              <p class="font-medium">His worst fear had come true - his money was gone.</p>
            </div>
          </div>

          <h3>The Miser's Despair</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Mohan's reaction to the loss revealed the depth of his attachment to money.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Overwhelming Grief</h4>
              <p class="mb-3">He started crying loudly, as if he had lost a loved one.</p>
              <p class="mb-3">Hearing his cries, many neighbors rushed to the spot.</p>
              <p class="font-medium">He kept crying, "Oh! My money! Someone has taken my money. What do I do now?"</p>
            </div>
          </div>

          <h3>The Village Headman Arrives</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Seeking Justice</h4>
            <p class="mb-4">The commotion attracted the attention of the village leader, who came to investigate.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Authority Figure</h4>
              <p class="mb-3">The village headman also arrived at the spot.</p>
              <p class="mb-3">He heard what had happened and listened to Mohan's tale of woe.</p>
              <p class="font-medium">But his response would be very different from what Mohan expected.</p>
            </div>
          </div>

          <h3>The Headman's Wisdom</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Instead of offering sympathy, the village headman delivered a profound lesson about the nature of unused wealth.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Harsh Truth</h4>
              <p class="mb-3">So he said, "Mohan, it's no use crying now."</p>
              <p class="mb-3">"The money you had kept in the pot was not being used by you. It was kept there only to be counted."</p>
              <p class="font-medium">This observation cut to the heart of Mohan's problem.</p>
            </div>
          </div>

          <h3>The Profound Realization</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">The headman continued with an insight that would change Mohan's understanding forever.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Money vs. Pebbles</h4>
              <p class="mb-3">"So, in fact, you have not lost anything."</p>
              <p class="mb-3">"The thief has put pebbles in the pot for you to count."</p>
              <p class="font-medium">"Counting money or counting pebbles, there is no difference as long as your counting does not stop."</p>
            </div>
          </div>

          <h3>The Moment of Understanding</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Light Dawns</h4>
            <p class="mb-4">The headman's words finally penetrated Mohan's consciousness and brought him to a life-changing realization.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Truth Revealed</h4>
              <p class="mb-3">Mohan realized the fact that money, which is not being used, is equal to pebbles which are of no use.</p>
              <p class="font-medium">This understanding transformed his entire perspective on wealth and its purpose.</p>
            </div>
          </div>

          <h3>The Moral Teaching</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">This story teaches us a fundamental truth about the relationship between miserliness and misery.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Golden Teaching</h4>
              <div class="bg-spiritual-50 p-4 rounded-lg">
                <p class="italic text-center text-lg font-semibold">"Being a miser invites miserable times."</p>
              </div>
              <p class="mt-3">This moral reminds us that hoarding wealth without using it leads to anxiety, fear, and ultimately, loss.</p>
            </div>
          </div>

          <h3>Lessons About Money and Wealth</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <h4 class="font-semibold mb-3">What This Story Teaches Us</h4>
            <div class="space-y-3">
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Purpose of Money:</strong> Money is meant to be used, not just accumulated</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Fear and Attachment:</strong> Excessive attachment to money creates fear and anxiety</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Unused Wealth:</strong> Money that is never used has no more value than stones</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Security Illusion:</strong> Hoarding money doesn't provide real security</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Life Quality:</strong> Miserliness reduces the quality of life and relationships</p>
              </div>
            </div>
          </div>

          <h3>The Psychology of Miserliness</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Understanding the Miser's Mind</h4>
            <p class="mb-4">The story reveals the psychological patterns that trap people in miserly behavior.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Vicious Cycle</h4>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Fear of Loss:</strong> Constant worry about losing money</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Obsessive Counting:</strong> Compulsive checking and rechecking</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Social Isolation:</strong> Secretive behavior that damages relationships</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Reduced Quality of Life:</strong> Refusing to spend on necessities or pleasures</span>
                </li>
              </ul>
            </div>
          </div>

          <h3>The Proper Use of Wealth</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">The story teaches us how money should be used for maximum benefit and happiness.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Wise Use of Money</h4>
              <div class="space-y-3">
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p><strong>Personal Needs:</strong> Taking care of health, comfort, and well-being</p>
                </div>
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p><strong>Family Welfare:</strong> Providing for loved ones' needs and education</p>
                </div>
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p><strong>Helping Others:</strong> Charity and assistance to those in need</p>
                </div>
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p><strong>Spiritual Growth:</strong> Supporting religious and spiritual activities</p>
                </div>
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p><strong>Future Security:</strong> Reasonable savings for genuine emergencies</p>
                </div>
              </div>
            </div>
          </div>

          <h3>Finding Balance</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">The story doesn't advocate wasteful spending, but rather finding a healthy balance with money.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Middle Path</h4>
              <p class="mb-3">Neither extreme miserliness nor wasteful spending leads to happiness.</p>
              <p class="mb-3">The wise person earns honestly, saves reasonably, spends wisely, and gives generously.</p>
              <p class="font-medium">This balanced approach brings both security and satisfaction.</p>
            </div>
          </div>

          <h3>Practical Applications</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">How to Apply This Lesson</h4>
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Daily Life Applications</h4>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Generous Spirit:</strong> Share your resources with family and friends</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Reasonable Spending:</strong> Buy what you need for health and happiness</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Charitable Giving:</strong> Help those less fortunate than yourself</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Investment in Growth:</strong> Spend on education and self-improvement</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Peaceful Mind:</strong> Don't let money worries dominate your thoughts</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg text-center">
            <h4 class="font-semibold text-lg mb-2">The True Value of Wealth</h4>
            <p>Mohan's story reminds us that money is a tool, not a goal. Its value lies not in being counted or hoarded, but in being used wisely for our well-being and the welfare of others. When we cling too tightly to our possessions, we lose the very peace and security we're trying to achieve. True wealth lies in having enough to meet our needs, the wisdom to use it well, and the generosity to share it with others. Only then does money serve its proper purpose in creating a happy and meaningful life.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'What was Mohan\'s profession?',
              answers: [
                'A farmer',
                'A merchant',
                'A teacher',
                'A craftsman'
              ],
              correctAnswer: 1
            },
            {
              question: 'What kind of person had Mohan become in his old age?',
              answers: [
                'Very generous',
                'A miser who did not spend his money',
                'A spendthrift',
                'A charitable person'
              ],
              correctAnswer: 1
            },
            {
              question: 'Where did Mohan hide his money?',
              answers: [
                'In his house',
                'In a bank',
                'Under a fig tree behind his house',
                'In a cave'
              ],
              correctAnswer: 2
            },
            {
              question: 'What did Mohan do every night?',
              answers: [
                'Slept peacefully',
                'Visited his neighbors',
                'Dug out the pot, counted the money, and hid it again',
                'Went for a walk'
              ],
              correctAnswer: 2
            },
            {
              question: 'Who discovered Mohan\'s secret?',
              answers: [
                'His family member',
                'Bhavesh, his neighbor',
                'The village headman',
                'A stranger'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did Bhavesh put in the pot after taking the money?',
              answers: [
                'Sand',
                'Leaves',
                'Pebbles',
                'Nothing'
              ],
              correctAnswer: 2
            },
            {
              question: 'How did Mohan react when he found pebbles instead of money?',
              answers: [
                'He laughed',
                'He was calm',
                'He started crying loudly',
                'He was angry but quiet'
              ],
              correctAnswer: 2
            },
            {
              question: 'What did the village headman say about Mohan\'s loss?',
              answers: [
                'He should call the police',
                'The money was not being used, so counting pebbles is the same as counting money',
                'He should be more careful',
                'He should buy a safe'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did Mohan realize after the headman\'s words?',
              answers: [
                'He should hide money better',
                'Money that is not being used is equal to pebbles',
                'He should trust his neighbors',
                'He should become richer'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is the moral of this story?',
              answers: [
                'Always trust your neighbors',
                'Hide money in banks only',
                'Being a miser invites miserable times',
                'Count your money daily'
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      {
        id: 'success-through-hard-work',
        title: 'Success Comes Through Hard Work',
        description: 'Learn the value of hard work and perseverance through the story of Yajur and his wise wife',
        content: `
          <h2>Success Comes Through Hard Work</h2>
          <div class="text-center mb-6">
            <img src="/pics/yajur-hard-work.jpg" alt="Yajur working hard in his field, discovering the treasure of honest labor" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Yajur discovering that hard work is the greatest treasure</p>
          </div>

          <p>This inspiring story teaches us that success and prosperity come not from luck or inheritance, but from honest hard work and perseverance. It shows how a wise wife helped her lazy husband discover the greatest treasure of all - the value of labor.</p>

          <h3>The Lazy Man</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Our story begins with a man who had everything he needed but lacked the most important quality for success.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">A Life of Idleness</h4>
              <p class="mb-3">Once very long ago, there lived a man named Yajur. He was very foolish and did not do any work.</p>
              <p class="mb-3">He spent his time in idle gossip in the village, wasting his days in meaningless activities.</p>
              <p class="font-medium">This shows how laziness can make even an intelligent person appear foolish.</p>
            </div>
          </div>

          <h3>The Inheritance</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">A Father's Legacy</h4>
            <p class="mb-4">Yajur had been blessed with resources that could have provided him with a good life if used wisely.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Gift of Opportunity</h4>
              <p class="mb-3">His father had left a small piece of land and some money for him.</p>
              <p class="font-medium">This inheritance represented opportunity and potential for a prosperous future.</p>
            </div>
          </div>

          <h3>The Neglected Land</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Yajur's laziness led him to waste the most valuable gift his father had left him.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Wasted Potential</h4>
              <p class="mb-3">Being lazy, he did not take any interest in the land and it remained uncultivated for several years.</p>
              <p class="mb-3">As such, hedges and bushes grew on it, making it wild and unproductive.</p>
              <p class="font-medium">This shows how neglect can turn valuable assets into worthless wasteland.</p>
            </div>
          </div>

          <h3>Living Off Inheritance</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Instead of working to create wealth, Yajur chose the easy path of consuming what his father had earned.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Easy Path</h4>
              <p class="mb-3">Yajur lived off the money his father had left for him, spending without earning.</p>
              <p class="font-medium">This lifestyle seemed comfortable but was ultimately unsustainable.</p>
            </div>
          </div>

          <h3>The Inevitable Consequence</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Money Runs Out</h4>
            <p class="mb-4">As with all inherited wealth that is consumed without being replenished, Yajur's money eventually disappeared.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Wake-Up Call</h4>
              <p class="mb-3">Soon he had spent all the money and found himself penniless.</p>
              <p class="mb-3">Being penniless, he thought of doing some work for the first time in years.</p>
              <p class="font-medium">Necessity finally forced him to consider what he should have done all along.</p>
            </div>
          </div>

          <h3>The Problem with Laziness</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Even when faced with necessity, Yajur's lazy habits made it difficult for him to embrace work.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Resistance to Work</h4>
              <p class="mb-3">But no work appealed to him as he did not like hard work.</p>
              <p class="font-medium">Years of laziness had made him allergic to any form of effort or labor.</p>
            </div>
          </div>

          <h3>The Wise Wife</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Fortunately, Yajur was married to a woman who possessed the wisdom and cleverness he lacked.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Intelligence and Compassion</h4>
              <p class="mb-3">His wife was a clever woman who wanted to make her husband work.</p>
              <p class="mb-3">She thought of a plan that would make Yajur work without him realizing it was for his own good.</p>
              <p class="font-medium">This shows how love and wisdom can find creative solutions to help others.</p>
            </div>
          </div>

          <h3>The Clever Plan</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Dream Strategy</h4>
            <p class="mb-4">The wife devised a brilliant plan that would motivate her lazy husband to work by appealing to his greed.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The False Dream</h4>
              <p class="mb-3">One morning she said to Yajur, "Last night I saw your father in my dream."</p>
              <p class="mb-3">"He told me that a treasure of gold is lying buried in our plot of land."</p>
              <p class="font-medium">"We can have it if we dig the land," she concluded, knowing this would motivate him.</p>
            </div>
          </div>

          <h3>The Motivation Works</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">The prospect of easy wealth immediately energized the lazy Yajur in a way that necessity alone could not.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Sudden Enthusiasm</h4>
              <p class="mb-3">Yajur was very happy to hear this and decided to dig the land.</p>
              <p class="mb-3">He took the spade and went to his field with more energy than he had shown in years.</p>
              <p class="font-medium">The promise of treasure gave him the motivation that duty and necessity had failed to provide.</p>
            </div>
          </div>

          <h3>The First Phase of Work</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Yajur began the hard work of reclaiming his neglected land, though he didn't realize that was what he was doing.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Clearing the Land</h4>
              <p class="mb-3">He started uprooting the hedges and bushes that had grown wild on his land.</p>
              <p class="mb-3">It took him several days to clear the field of the hedges.</p>
              <p class="font-medium">This was the first real work he had done in years, and it was transforming his land.</p>
            </div>
          </div>

          <h3>The Deep Digging</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Intensive Labor</h4>
            <p class="mb-4">Motivated by the promise of treasure, Yajur worked harder than he ever had before.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Thorough Preparation</h4>
              <p class="mb-3">Then he started digging the field, going deeper and deeper in search of the promised gold.</p>
              <p class="mb-3">But no treasure was seen, despite all his hard work.</p>
              <p class="font-medium">Unknown to him, he was perfectly preparing his land for cultivation.</p>
            </div>
          </div>

          <h3>The First Disappointment</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">When the promised treasure didn't appear, Yajur felt frustrated and wanted to give up.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Feeling Cheated</h4>
              <p class="mb-3">Tired of digging, he told his wife, "I have worked so hard all these days but I have not found any hidden treasure."</p>
              <p class="font-medium">"All my hard work has gone to waste," he complained, not realizing the value of what he had accomplished.</p>
            </div>
          </div>

          <h3>The Wife's Second Strategy</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">The clever wife wasn't ready to let her husband give up just when his hard work was about to pay off.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Extending the Plan</h4>
              <p class="mb-3">His wife being a clever woman said, "I have great faith in your father's words."</p>
              <p class="mb-3">"Maybe the gold is lying very deep. Let's sow corn in our field."</p>
              <p class="font-medium">"The gold may come up with the crop," she suggested, leading him toward the real treasure.</p>
            </div>
          </div>

          <h3>Planting the Crop</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Real Work Begins</h4>
            <p class="mb-4">Still believing in the treasure, Yajur agreed to plant crops, unknowingly beginning his career as a farmer.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Dedicated Farming</h4>
              <p class="mb-3">Yajur agreed and sowed corn in the field.</p>
              <p class="mb-3">He took all the care that the corn needed, watering it and keeping watch over it.</p>
              <p class="font-medium">For the first time in his life, he was experiencing the satisfaction of nurturing something to growth.</p>
            </div>
          </div>

          <h3>The Growing Crop</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Yajur's hard work and care began to show results as his field transformed into a productive farm.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Signs of Success</h4>
              <p class="mb-3">Soon, his field was green with the full-size plants of corn.</p>
              <p class="mb-3">Yet, there was still no sign of the gold he was expecting.</p>
              <p class="font-medium">He was creating real wealth but didn't recognize it yet.</p>
            </div>
          </div>

          <h3>Searching for Gold</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Still focused on the promised treasure, Yajur couldn't see the real treasure growing around him.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Missing the Obvious</h4>
              <p class="mb-3">He examined every plant, but no gold could be seen.</p>
              <p class="mb-3">He went home and grumbled to his wife about the lack of treasure.</p>
              <p class="font-medium">He was so focused on finding gold that he missed the green gold growing in his field.</p>
            </div>
          </div>

          <h3>The Second Complaint</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Frustration Grows</h4>
            <p class="mb-4">Yajur's frustration with the lack of immediate treasure led him to doubt the entire plan.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Losing Faith</h4>
              <p class="mb-3">"You and your silly dream. I worked so hard but there is no sign of even a single gold coin."</p>
              <p class="mb-3">"And you speak of hidden treasure. My father must have lied to you in your dream."</p>
              <p class="font-medium">He was ready to give up just before the real reward would appear.</p>
            </div>
          </div>

          <h3>The Wife's Final Strategy</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">The wise wife knew she needed to keep her husband motivated just a little longer for the plan to succeed.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Divine Reinforcement</h4>
              <p class="mb-3">His wife said, "Don't be impatient. Your father can't lie to me."</p>
              <p class="mb-3">"Moreover, a few days back Goddess Lakshmi also appeared to me in a dream."</p>
              <p class="font-medium">"She said that very soon we shall become rich," she added, invoking divine blessing.</p>
            </div>
          </div>

          <h3>The Harvest Time</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Finally, the moment arrived when Yajur's hard work would reveal its true value.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Fruits of Labor</h4>
              <p class="mb-3">Soon it was harvest time. Yajur harvested the corn.</p>
              <p class="mb-3">It was a very good harvest, abundant and healthy.</p>
              <p class="font-medium">His months of hard work had produced something far more valuable than buried treasure.</p>
            </div>
          </div>

          <h3>The Market Success</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Converting Work to Wealth</h4>
            <p class="mb-4">The wise wife recognized the true value of their harvest and took action to realize its worth.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Real Treasure</h4>
              <p class="mb-3">"The corn would fetch a lot of money," thought his wife.</p>
              <p class="mb-3">So she filled the corn in bags and took them to the market.</p>
              <p class="mb-3">She sold the corn and earned a bag full of gold coins.</p>
              <p class="font-medium">The treasure had appeared, but it came from their hard work, not from the ground.</p>
            </div>
          </div>

          <h3>The Revelation</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">The moment of truth arrived when the wife revealed the real source of their newfound wealth.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Truth Revealed</h4>
              <p class="mb-3">She returned home and showed the gold coins to her husband.</p>
              <p class="mb-3">"Look at all the gold coins. Your father did not lie to me after all."</p>
              <p class="font-medium">"Goddess Lakshmi's words have also become true. We have become rich."</p>
            </div>
          </div>

          <h3>Yajur's Joy and Gratitude</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Seeing the gold coins, Yajur was overjoyed and grateful, though he still didn't understand the real lesson.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Misplaced Gratitude</h4>
              <p class="mb-3">Seeing all the gold, Yajur was very happy.</p>
              <p class="mb-3">He bowed before his father's photograph and thanked him for the treasure.</p>
              <p class="font-medium">He was still attributing his success to supernatural intervention rather than his own efforts.</p>
            </div>
          </div>

          <h3>The Wife's Final Lesson</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Truth About Success</h4>
            <p class="mb-4">The wise wife knew it was time to reveal the real secret behind their success.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Real Treasure</h4>
              <p class="mb-3">His wife explained to him that the gold was a result of his hard work.</p>
              <p class="font-medium">She helped him understand that the treasure had come not from the ground, but from his own efforts.</p>
            </div>
          </div>

          <h3>The Great Realization</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Finally, Yajur understood the true source of wealth and success.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Understanding the Truth</h4>
              <p class="mb-3">He understood what his wife said and realized the importance of hard work.</p>
              <p class="font-medium">This realization transformed his entire approach to life and work.</p>
            </div>
          </div>

          <h3>The Transformation</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Yajur's understanding of the value of hard work led to a permanent change in his character and lifestyle.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">A New Life</h4>
              <p class="mb-3">From then on, he never kept away from hard work.</p>
              <p class="font-medium">He lived happily ever after, having discovered that the greatest treasure is the ability and willingness to work.</p>
            </div>
          </div>

          <h3>Lessons from Yajur's Story</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">What This Story Teaches Us</h4>
            <div class="space-y-3">
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Hard Work Creates Wealth:</strong> True prosperity comes from effort, not luck</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Laziness Leads to Poverty:</strong> Avoiding work ultimately leads to loss</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Wise Guidance Helps:</strong> Sometimes we need others to help us see the truth</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Motivation Matters:</strong> Finding the right motivation can overcome laziness</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Work Brings Satisfaction:</strong> There is joy and fulfillment in honest labor</p>
              </div>
            </div>
          </div>

          <h3>The Power of Wise Guidance</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">The wife's role in this story shows how wisdom and love can help transform even the laziest person.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Creative Solutions</h4>
              <p class="mb-3">She used psychology and creativity to motivate her husband to work.</p>
              <p class="mb-3">She understood that direct confrontation wouldn't work with a lazy person.</p>
              <p class="font-medium">Her method shows that sometimes we need to be clever in helping others help themselves.</p>
            </div>
          </div>

          <h3>Practical Applications</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <h4 class="font-semibold mb-3">How to Apply This Lesson</h4>
            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">In Daily Life</h4>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Embrace Work:</strong> See work as an opportunity, not a burden</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Be Patient:</strong> Success takes time and consistent effort</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Value Process:</strong> Enjoy the journey of work, not just the results</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Help Others:</strong> Guide lazy friends toward productive activities</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Take Responsibility:</strong> Don't depend on inheritance or luck</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg text-center">
            <h4 class="font-semibold text-lg mb-2">The Greatest Treasure</h4>
            <p>Yajur's story reminds us that the greatest treasure is not gold buried in the ground, but the gold that comes from our own hands through honest work. His wife's wisdom shows us that sometimes the best way to help someone is to guide them to discover the truth for themselves. When we work with dedication and care, we not only create wealth but also develop character, satisfaction, and self-respect. The real treasure is not what we find, but what we become through the process of working toward our goals.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'What kind of person was Yajur at the beginning of the story?',
              answers: [
                'Very hardworking',
                'Very foolish and lazy, did not do any work',
                'Very intelligent',
                'Very rich'
              ],
              correctAnswer: 1
            },
            {
              question: 'How did Yajur spend his time?',
              answers: [
                'Working in his field',
                'In idle gossip in the village',
                'Studying books',
                'Helping his neighbors'
              ],
              correctAnswer: 1
            },
            {
              question: 'What had Yajur\'s father left for him?',
              answers: [
                'Only money',
                'Only land',
                'A small piece of land and some money',
                'A big house'
              ],
              correctAnswer: 2
            },
            {
              question: 'What happened to Yajur\'s land because of his laziness?',
              answers: [
                'It became very productive',
                'It remained uncultivated and hedges and bushes grew on it',
                'Someone else took it',
                'It was sold'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did Yajur\'s wife tell him she saw in her dream?',
              answers: [
                'His father said there was treasure buried in their land',
                'Goddess Lakshmi gave her money',
                'Their land would be taken away',
                'They should move to another place'
              ],
              correctAnswer: 0
            },
            {
              question: 'What did Yajur do after hearing about the treasure?',
              answers: [
                'He ignored his wife',
                'He started digging the land to find treasure',
                'He sold the land',
                'He went to sleep'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did Yajur\'s wife suggest when no treasure was found after digging?',
              answers: [
                'To give up searching',
                'To dig in another place',
                'To sow corn in the field as the gold might come up with the crop',
                'To sell the land'
              ],
              correctAnswer: 2
            },
            {
              question: 'How did Yajur take care of the corn crop?',
              answers: [
                'He ignored it completely',
                'He watered it and kept watch over it',
                'He asked others to take care of it',
                'He only looked at it occasionally'
              ],
              correctAnswer: 1
            },
            {
              question: 'Where did the gold coins actually come from?',
              answers: [
                'They were buried in the ground',
                'From selling the corn harvest',
                'His father gave them',
                'Goddess Lakshmi gave them'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did Yajur realize at the end of the story?',
              answers: [
                'That dreams always come true',
                'That his father was magical',
                'The importance of hard work and that the gold came from his efforts',
                'That his wife was a fortune teller'
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      {
        id: 'lord-buddha',
        title: 'Lord Buddha',
        description: 'Learn about the life and teachings of Lord Buddha, the Enlightened One',
        content: `
          <h2>Lord Buddha</h2>
          <div class="text-center mb-6">
            <img src="/pics/buddha.jpg" alt="Lord Buddha in meditation - the Enlightened One" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Lord Buddha - the Enlightened One who taught compassion and wisdom</p>
          </div>

          <p>Lord Buddha is a great spiritual teacher whose teachings of compassion, wisdom, and peace have influenced millions of people around the world.</p>

          <h3>Early Life as Prince Siddhartha</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">A long time ago a king, by the name of Suddhodana, lived in Northern India. He had only one son called Siddhartha.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Childhood and Upbringing</h4>
              <p class="mb-3">Siddhartha's mother died soon after he was born. His aunt, Gautami, looked after him. From her, he got the name Gautama.</p>
              <p>When Siddhartha was born, his father called great Rishis to see the child. These learned men foretold that Siddhartha (or Gautama) would be a great teacher.</p>
            </div>
          </div>

          <h3>The Prophecy</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">A Future of Great Significance</h4>
              <p class="mb-3">The Rishis said that the day Siddhartha saw the sick, the old and the dead, he would leave the palace in search of Truth.</p>
              <p class="font-medium">King Suddhodana wanted his son to rule after him, so he kept him in the palace and did not allow him to see the world.</p>
            </div>
          </div>

          <h3>Life in the Palace</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">The king gave Siddhartha all the pleasures of life and did not let him see people suffer.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Family Life</h4>
              <p>Prince Siddhartha was married to a beautiful princess called Yashodhara. They had a son by the name of Rahula.</p>
            </div>
          </div>

          <h3>The Four Sights</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">One day Siddhartha told his father that he wished to see the outside world. The king immediately ordered that the entire city be decorated with garlands, flowers and banners.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Life-Changing Journey</h4>
              <p class="mb-3">However, as Siddhartha drove through the streets he saw an old man, a sick person and a dead body. This made the young prince very unhappy for it was the first time that he saw people suffer.</p>
              <p>He began to think deeply about the problems of life and death, suffering and impermanence.</p>
            </div>
          </div>

          <h3>The Great Renunciation</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Leaving Palace Life Behind</h4>
            <p class="mb-4">Siddhartha left his wife, son and palace and became a hermit. This momentous decision is known as the Great Renunciation.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Search for Truth</h4>
              <p>After suffering many hardships and trying various spiritual practices, he came to Bodh Gaya. He spent many years in deep meditation under a Bodhi tree (sacred fig tree).</p>
            </div>
          </div>

          <h3>Enlightenment</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">One day, as he sat meditating under the Bodhi tree, he received enlightenment. Prince Siddhartha now came to be known as the Buddha - the 'Enlightened One'.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Middle Path</h4>
              <p>Buddha discovered what is called the Middle Path - a way of life that avoids both extreme luxury and extreme asceticism.</p>
            </div>
          </div>

          <h3>Buddha's Teachings</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <h4 class="font-semibold mb-3">The Four Noble Truths</h4>
            <div class="space-y-3">
              <div class="bg-white p-3 rounded-lg">
                <p><strong>1. The Truth of Suffering:</strong> Life involves suffering</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>2. The Cause of Suffering:</strong> Suffering is caused by desire and attachment</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>3. The End of Suffering:</strong> Suffering can be overcome</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>4. The Path to End Suffering:</strong> Following the Eightfold Path leads to the end of suffering</p>
              </div>
            </div>
          </div>

          <h3>The Noble Eightfold Path</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <p class="mb-4 font-medium text-center">Buddha taught the Eightfold Path as the way to end suffering:</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Right Understanding</strong></p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Right Thought</strong></p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Right Speech</strong></p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Right Action</strong></p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Right Livelihood</strong></p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Right Effort</strong></p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Right Mindfulness</strong></p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Right Concentration</strong></p>
              </div>
            </div>
          </div>

          <h3>Buddhism</h3>
          <div class="bg-gradient-to-br from-indian-cream to-white p-4 rounded-lg border border-indian-saffron mt-6">
            <p class="mb-4">People who follow Buddha's teachings are called Buddhists. Their religion is Buddhism.</p>
            <p class="mb-4">Lord Buddha teaches us how to lead a good life. He teaches us to be kind and loving towards all beings.</p>
            <p class="font-medium text-center">His message of compassion, non-violence, and mindfulness continues to inspire millions around the world.</p>
          </div>

          <div class="mt-8 p-4 bg-spiritual-50 rounded-lg border-l-4 border-spiritual-300">
            <h4 class="font-semibold mb-2">Buddha's Legacy</h4>
            <p>Buddha spent over 45 years teaching and spreading his message of wisdom and compassion. His teachings have spread throughout Asia and now across the entire world. The principles of mindfulness, compassion, and non-violence that he taught remain as relevant today as they were 2,500 years ago.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'What was Buddha\'s birth name?',
              answers: [
                'Gautama',
                'Siddhartha',
                'Rahula',
                'Suddhodana'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who raised Siddhartha after his mother died?',
              answers: [
                'His grandmother',
                'His father',
                'His aunt Gautami',
                'His sister'
              ],
              correctAnswer: 2
            },
            {
              question: 'What did the Rishis predict about Siddhartha?',
              answers: [
                'He would be a great king',
                'He would be a great warrior',
                'He would be a great teacher',
                'He would be very wealthy'
              ],
              correctAnswer: 2
            },
            {
              question: 'What did Siddhartha see that made him think about suffering?',
              answers: [
                'A war',
                'An old man, a sick person, and a dead body',
                'A poor family',
                'A natural disaster'
              ],
              correctAnswer: 1
            },
            {
              question: 'What was the name of Siddhartha\'s wife?',
              answers: [
                'Gautami',
                'Yashodhara',
                'Maya',
                'Tara'
              ],
              correctAnswer: 1
            },
            {
              question: 'What was the name of Siddhartha\'s son?',
              answers: [
                'Rahula',
                'Ananda',
                'Gautama',
                'Ashoka'
              ],
              correctAnswer: 0
            },
            {
              question: 'Where did Buddha receive enlightenment?',
              answers: [
                'In a palace',
                'On a mountain',
                'In a cave',
                'Under a Bodhi tree at Bodh Gaya'
              ],
              correctAnswer: 3
            },
            {
              question: 'What does "Buddha" mean?',
              answers: [
                'Holy One',
                'Enlightened One',
                'Wise Teacher',
                'Great King'
              ],
              correctAnswer: 1
            },
            {
              question: 'How many Noble Truths did Buddha teach?',
              answers: [
                'Three',
                'Four',
                'Five',
                'Eight'
              ],
              correctAnswer: 1
            },
            {
              question: 'What path did Buddha teach to end suffering?',
              answers: [
                'The Sixfold Path',
                'The Tenfold Path',
                'The Noble Eightfold Path',
                'The Fivefold Path'
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
        id: 'the-vedas',
        title: 'The Vedas',
        description: 'Learn about the oldest and most sacred scriptures of Hinduism - the eternal knowledge of God',
        content: `
          <h2>The Vedas</h2>
          <div class="text-center mb-6">
            <img src="/pics/vedas.jpg" alt="Ancient Vedic manuscripts representing the eternal knowledge" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">The sacred Vedas - humanity's oldest spiritual wisdom</p>
          </div>

          <p>The oldest scripture of the Hindus, and the most important, is the <strong>Veda</strong>. The word 'Veda' means <strong>'knowledge of God'</strong>.</p>

          <h3>The Origin of the Vedas</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Revealed to the Great Rishis</h4>
              <p class="mb-3">Great Rishis are said to have <strong>heard the eternal truths of religion</strong> and to have left a record of them for the benefit of others.</p>
              <p class="font-medium">These records are called the <strong>Veda</strong>.</p>
            </div>
          </div>

          <h3>The Four Vedas</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <p class="mb-6 font-medium text-center">The Veda is divided into four parts:</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-white p-4 rounded-lg border-l-4 border-spiritual-300">
                <h4 class="font-semibold mb-2">1. Rig Veda</h4>
                <p class="text-sm">Contains hymns of praise and worship to various deities</p>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-spiritual-300">
                <h4 class="font-semibold mb-2">2. Yajur Veda</h4>
                <p class="text-sm">Contains ritual formulas and sacrificial procedures</p>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-spiritual-300">
                <h4 class="font-semibold mb-2">3. Sama Veda</h4>
                <p class="text-sm">Contains melodies and chants for worship</p>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-spiritual-300">
                <h4 class="font-semibold mb-2">4. Atharva Veda</h4>
                <p class="text-sm">Contains prayers for daily life and spiritual wisdom</p>
              </div>
            </div>
          </div>

          <h3>Sacred Teachings from the Vedas</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-6 font-medium text-center">Here are some beautiful teachings from the Vedas:</p>

            <div class="space-y-6">
              <div class="bg-white p-4 rounded-lg border-l-4 border-indian-saffron">
                <h4 class="font-semibold mb-2">On Unity and Love</h4>
                <blockquote class="italic mb-2">"Oh, man! Live peacefully and harmoniously with your fellow beings. May your minds think of unity so that there may be no envy and ill feelings amongst you. As a cow regards her newly born calf with tenderness so may you treat each other with love and kindness."</blockquote>
                <p class="text-sm text-gray-600">— Atharva Veda (iii; 30; 1)</p>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-indian-saffron">
                <h4 class="font-semibold mb-2">On the Unity of God</h4>
                <blockquote class="italic mb-2">"God is one, but wise men call Him by different names such as Agni, Soma, Indra, Varuṇa, etc."</blockquote>
                <p class="text-sm text-gray-600">— Rig Veda (i; 1; 43)</p>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-indian-saffron">
                <h4 class="font-semibold mb-2">On Noble Thoughts</h4>
                <blockquote class="italic mb-2">"May noble thoughts come to us from all sides..."</blockquote>
                <p class="text-sm text-gray-600">— Rig Veda (i; 89; 1)</p>
              </div>
            </div>
          </div>

          <h3>The Eternal Wisdom</h3>
          <div class="bg-gradient-to-br from-indian-cream to-white p-6 rounded-lg border border-indian-saffron mt-6">
            <div class="text-center">
              <h4 class="font-semibold text-xl mb-4">Timeless Knowledge</h4>
              <p class="text-lg font-medium mb-4">The Vedas contain eternal truths that guide humanity toward spiritual understanding.</p>
              <div class="bg-white p-4 rounded-lg">
                <p class="italic">These ancient scriptures continue to inspire millions of people around the world with their profound wisdom about God, life, and the path to spiritual realization.</p>
              </div>
            </div>
          </div>

          <div class="mt-8 p-4 bg-spiritual-50 rounded-lg border-l-4 border-spiritual-300">
            <h4 class="font-semibold mb-2">The Foundation of Hindu Dharma</h4>
            <p>The Vedas form the foundation of Hindu dharma and spiritual practice. They teach us about the nature of God, the importance of righteous living, and the path to spiritual liberation. Through their timeless wisdom, we learn to live in harmony with ourselves, others, and the divine presence that pervades all existence.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'What does the word "Veda" mean?',
              answers: [
                'Ancient book',
                'Knowledge of God',
                'Sacred ritual',
                'Holy prayer'
              ],
              correctAnswer: 1
            },
            {
              question: 'How many parts is the Veda divided into?',
              answers: [
                'Three',
                'Four',
                'Five',
                'Six'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who are said to have heard the eternal truths recorded in the Vedas?',
              answers: [
                'Kings',
                'Priests',
                'Great Rishis',
                'Scholars'
              ],
              correctAnswer: 2
            },
            {
              question: 'Which Veda contains the teaching "God is one, but wise men call Him by different names"?',
              answers: [
                'Rig Veda',
                'Yajur Veda',
                'Sama Veda',
                'Atharva Veda'
              ],
              correctAnswer: 0
            },
            {
              question: 'According to the Atharva Veda, how should we treat each other?',
              answers: [
                'With competition',
                'With indifference',
                'With love and kindness',
                'With suspicion'
              ],
              correctAnswer: 2
            },
            {
              question: 'What do the Vedas teach us about noble thoughts?',
              answers: [
                'They should be avoided',
                'They should come to us from all sides',
                'They are not important',
                'They are only for priests'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is the significance of the Vedas in Hinduism?',
              answers: [
                'They are recent additions',
                'They are the oldest and most important scriptures',
                'They are only for scholars',
                'They are optional reading'
              ],
              correctAnswer: 1
            },
            {
              question: 'What do the Vedas teach about unity among people?',
              answers: [
                'People should live separately',
                'Unity is impossible',
                'People should live peacefully and harmoniously',
                'Only some people deserve unity'
              ],
              correctAnswer: 2
            },
            {
              question: 'Which Veda contains prayers for daily life and spiritual wisdom?',
              answers: [
                'Rig Veda',
                'Yajur Veda',
                'Sama Veda',
                'Atharva Veda'
              ],
              correctAnswer: 3
            },
            {
              question: 'What do the Vedas form the foundation of?',
              answers: [
                'Modern science',
                'Hindu dharma and spiritual practice',
                'Political systems',
                'Economic theories'
              ],
              correctAnswer: 1
            }
          ]
        }
      },
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
        id: 'mahabharata-story',
        title: 'The Mahabharata',
        description: 'Learn about the great epic of the Pandavas and Kauravas, and the longest poem ever written',
        content: `
          <h2>The Mahabharata</h2>
          <div class="text-center mb-6">
            <img src="/pics/mahabharata.jpg" alt="The Mahabharata epic depicting the Kurukshetra war" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">The great epic of the Mahabharata - the longest poem ever written</p>
          </div>

          <p>The Mahabharata is one of the greatest epics of ancient India. It tells the story of two families - the Pandavas and the Kauravas - and their struggle for the kingdom of Hastinapura.</p>

          <h3>King Dhritarashtra and His Family</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">King Dhritarashtra belonged to the Kuru race. He ruled over Hastinapura near Delhi. He was blind from birth.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Kauravas</h4>
              <p class="mb-3">Dhritarashtra had a hundred sons. They were called the <strong>Kauravas</strong>. The eldest of them was <strong>Duryodhana</strong>.</p>
              <p>Gandhari was the wife of Dhritarashtra. She loved him and served him well. As her husband was blind, Gandhari also tied a cloth around her eyes and kept herself blind.</p>
            </div>
          </div>

          <h3>Pandu and His Family</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <p class="mb-4">Dhritarashtra had a brother called Pandu. Pandu had two wives - Kunti and Madri.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Pandavas</h4>
              <p class="mb-3">They had five sons: Yudhishthira, Bhima, Arjuna, Nakula and Sahadeva. They were called the <strong>Pandavas</strong>.</p>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <div class="bg-spiritual-50 p-3 rounded-lg">
                  <strong>Yudhishthira</strong><br/>
                  <span class="text-sm">Known for his truthfulness</span>
                </div>
                <div class="bg-spiritual-50 p-3 rounded-lg">
                  <strong>Bhima</strong><br/>
                  <span class="text-sm">Known for his great strength</span>
                </div>
                <div class="bg-spiritual-50 p-3 rounded-lg">
                  <strong>Arjuna</strong><br/>
                  <span class="text-sm">Known for his bravery and archery skills</span>
                </div>
                <div class="bg-spiritual-50 p-3 rounded-lg">
                  <strong>Nakula & Sahadeva</strong><br/>
                  <span class="text-sm">Known for wisdom and practicality</span>
                </div>
              </div>
            </div>
          </div>

          <h3>The Early Challenges</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Pandu and Madri died early. Mother Kunti was left to take care of the five children, who loved and obeyed her always.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Growing Rivalry</h4>
              <p>The Kauravas did not like their cousins, the Pandavas, and tried to send them away from their kingdom.</p>
            </div>
          </div>

          <h3>Draupadi's Marriage</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Once, when the Pandavas were travelling, they reached the kingdom of Panchala. The king was looking for a good husband for his beautiful daughter Panchali, also called Draupadi.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Archery Contest</h4>
              <p class="mb-3">In a difficult test of archery, Arjuna won and the princess was given to him in marriage.</p>
              <p>Kunti, without seeing what Arjuna had won, asked all the five brothers to share what they had brought. Following their mother's words, all five Pandavas married Draupadi.</p>
            </div>
          </div>

          <h3>The Game of Dice</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <p class="mb-4">The Kauravas wanted to keep the kingdom for themselves. They invited the Pandavas to a game of dice.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Cheating</h4>
              <p>They cheated the Pandavas in the game and drove them off to a forest. The Pandavas had to suffer great difficulties during their exile.</p>
            </div>
          </div>

          <h3>The Great War</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">After their exile, the Pandavas asked for their kingdom back, but the Kauravas refused.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Kurukshetra</h4>
              <p class="mb-3">The Pandavas and the Kauravas fought against each other on the battlefield of Kurukshetra. That was called the great Mahabharata war.</p>
              <p>Lord Krishna was on the side of the Pandavas, for they were good and truthful. He served as Arjuna's charioteer during the war.</p>
              <p class="mt-3 font-medium">The Pandavas won and the Kauravas lost.</p>
            </div>
          </div>

          <h3>The Bhagavad Gita</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Before the war began, Arjuna was hesitant to fight against his own relatives. It was then that Lord Krishna gave him the divine message known as the Bhagavad Gita.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Divine Wisdom</h4>
              <p>The Bhagavad Gita contains profound spiritual teachings about duty, righteousness, and the nature of the soul.</p>
            </div>
          </div>

          <h3>The Great Epic</h3>
          <div class="bg-gradient-to-br from-indian-cream to-white p-4 rounded-lg border border-indian-saffron mt-6">
            <p class="mb-4">Rishi Vedavyasa tells us the story of the Pandavas and Kauravas in the Mahabharata.</p>
            <p class="mb-4">Like the Ramayana, the Mahabharata is one of the great epics of ancient India.</p>
            <p class="font-medium text-center">It is the longest poem ever written in human history.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'Who was the blind king of Hastinapura?',
              answers: [
                'Pandu',
                'Dhritarashtra',
                'Yudhishthira',
                'Duryodhana'
              ],
              correctAnswer: 1
            },
            {
              question: 'How many sons did Dhritarashtra have?',
              answers: [
                'Five',
                'Fifty',
                'One hundred',
                'One thousand'
              ],
              correctAnswer: 2
            },
            {
              question: 'What did Gandhari do to show devotion to her blind husband?',
              answers: [
                'She learned to sing',
                'She tied a cloth around her eyes',
                'She painted the palace walls',
                'She wrote poems'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who was the eldest of the Pandavas?',
              answers: [
                'Arjuna',
                'Bhima',
                'Yudhishthira',
                'Nakula'
              ],
              correctAnswer: 2
            },
            {
              question: 'Which Pandava was known for his great strength?',
              answers: [
                'Yudhishthira',
                'Bhima',
                'Nakula',
                'Sahadeva'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who won the archery contest to marry Draupadi?',
              answers: [
                'Yudhishthira',
                'Bhima',
                'Arjuna',
                'Nakula'
              ],
              correctAnswer: 2
            },
            {
              question: 'How did the Kauravas cheat the Pandavas?',
              answers: [
                'In a race',
                'In a game of dice',
                'In a wrestling match',
                'In a singing competition'
              ],
              correctAnswer: 1
            },
            {
              question: 'Where was the great Mahabharata war fought?',
              answers: [
                'Hastinapura',
                'Indraprastha',
                'Kurukshetra',
                'Panchala'
              ],
              correctAnswer: 2
            },
            {
              question: 'What role did Lord Krishna play during the war?',
              answers: [
                'He was a warrior',
                'He was Arjuna\'s charioteer',
                'He was a general',
                'He was a messenger'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who wrote the Mahabharata?',
              answers: [
                'Sage Valmiki',
                'Sage Vedavyasa',
                'Sage Narada',
                'Sage Vishwamitra'
              ],
              correctAnswer: 1
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
        id: 'sita-marriage',
        title: 'Sita\'s Marriage',
        description: 'Learn about the beautiful story of how Sita and Rama were united in marriage through divine providence',
        content: `
          <h2>Sita's Marriage</h2>
          <div class="text-center mb-6">
            <img src="/pics/sita-marriage.jpg" alt="The marriage of Sita and Rama - a divine union" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">The sacred marriage of Sita and Rama - a story of divine love and destiny</p>
          </div>

          <p>The marriage of Rama to Sita is told in the ancient Indian epic, the Ramayana. It is a beautiful story of how divine providence brought together two noble souls destined for each other.</p>

          <h3>King Janaka of Mithila</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Janaka was the king of Mithila. He was a very wise king, known for his righteousness and spiritual wisdom. Sunayana was his beloved queen.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">A Wise and Just Ruler</h4>
              <p>King Janaka was not only a great king but also a philosopher-king who was deeply devoted to dharma and spiritual knowledge. His court was famous for attracting learned sages and scholars.</p>
            </div>
          </div>

          <h3>The Discovery of Sita</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">A Divine Gift from Mother Earth</h4>
            <p class="mb-4">Once, King Janaka went to plough his fields. While ploughing, he found a lovely baby girl in a furrow of the earth.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Sita - Daughter of the Earth</h4>
              <p class="mb-3">He took the baby home and brought her up as his own daughter. He named her <strong>Sita</strong>, which means "furrow" in Sanskrit, as she was found in the earth.</p>
              <p>She was also called <strong>Janaki</strong>, as she was King Janaka's beloved daughter.</p>
            </div>
          </div>

          <h3>Sita's Noble Character</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">She grew up to be a lovely and good girl, embodying all the virtues of an ideal woman.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Sita's Qualities</h4>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Beautiful:</strong> She possessed divine beauty</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Virtuous:</strong> She was known for her pure character</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Devoted:</strong> She was devoted to dharma and her family</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Wise:</strong> She possessed great wisdom and intelligence</span>
                </li>
              </ul>
            </div>
          </div>

          <h3>The Divine Bow of Lord Shiva</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">The king began to think about Sita's marriage. He decided to choose her husband by a test of skill and strength.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Sacred Bow</h4>
              <p class="mb-3">Lord Shiva had given King Janaka one of his divine bows. It was very big and heavy - so massive that hundreds of people were needed to carry it.</p>
              <p class="font-medium">This was no ordinary bow, but a divine weapon of immense power.</p>
            </div>
          </div>

          <h3>The Challenge</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">King Janaka's Declaration</h4>
              <div class="bg-spiritual-50 p-4 rounded-lg mt-3">
                <p class="italic text-center text-lg">"The prince who can bend and string this bow of Lord Shiva may marry Sita!"</p>
              </div>
              <p class="mt-3">This challenge would ensure that only a truly worthy prince, blessed with divine strength and virtue, could win Sita's hand.</p>
            </div>
          </div>

          <h3>The Failed Attempts</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Many princes came from far and wide, eager to win the hand of the beautiful and virtuous Sita.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Unsuccessful Suitors</h4>
              <p class="mb-3">Many princes came and tried to lift the bow and string it. Not one of them succeeded.</p>
              <p>Even the wicked king Ravana came and tried, but even he, with all his might and ten heads, could not lift the divine bow.</p>
            </div>
          </div>

          <h3>The Arrival of Rama</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Rama and Lakshmana, sons of King Dasaratha, had also come to Mithila at that time along with the great Sage Vishwamitra.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Divine Guidance</h4>
              <p>Sage Vishwamitra, recognizing Rama's divine nature, asked Rama to attempt the challenge and bend the bow.</p>
            </div>
          </div>

          <h3>Rama's Victory</h3>
          <div class="bg-gradient-to-br from-indian-cream to-white p-4 rounded-lg border border-indian-saffron mt-6">
            <h4 class="font-semibold mb-3">The Divine Moment</h4>
            <p class="mb-4">Rama approached the mighty bow with reverence and humility.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Miraculous Feat</h4>
              <p class="mb-3">Rama lifted the great bow with ease, as if it were a mere toy. As he bent it to string it, the bow broke in two with a thunderous sound that echoed across the heavens.</p>
              <p class="font-medium">Everyone felt happy that the test was successful and that a worthy groom had been found for Sita.</p>
            </div>
          </div>

          <h3>The Sacred Union</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <h4 class="font-semibold mb-3">A Marriage Made in Heaven</h4>
            <p class="mb-4">King Janaka was overjoyed to see that Rama had successfully completed the challenge. He recognized in Rama the ideal husband for his beloved daughter.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Wedding</h4>
              <p>King Janaka gave Sita in marriage to Rama with great joy and celebration. The marriage was blessed by the gods and celebrated by all of creation.</p>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg text-center">
            <h4 class="font-semibold text-lg mb-2">The Significance</h4>
            <p>The marriage of Sita and Rama represents the perfect union of virtue, strength, and divine love. Their story teaches us about the importance of dharma, the power of divine providence, and the beauty of a relationship built on mutual respect and spiritual values.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'Who was the king of Mithila?',
              answers: [
                'Dasaratha',
                'Janaka',
                'Ravana',
                'Vishwamitra'
              ],
              correctAnswer: 1
            },
            {
              question: 'How did King Janaka find Sita?',
              answers: [
                'She was brought by merchants',
                'She was found while ploughing his fields',
                'She was given by another king',
                'She was found in the forest'
              ],
              correctAnswer: 1
            },
            {
              question: 'Why was Sita also called Janaki?',
              answers: [
                'Because she was born in January',
                'Because she was King Janaka\'s daughter',
                'Because she was found in a jar',
                'Because she liked that name'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who gave King Janaka the divine bow?',
              answers: [
                'Lord Vishnu',
                'Lord Brahma',
                'Lord Shiva',
                'Lord Indra'
              ],
              correctAnswer: 2
            },
            {
              question: 'What was special about Lord Shiva\'s bow?',
              answers: [
                'It was made of gold',
                'It was very small and light',
                'It was very big and heavy',
                'It could fly'
              ],
              correctAnswer: 2
            },
            {
              question: 'What was King Janaka\'s condition for Sita\'s marriage?',
              answers: [
                'The prince must be very rich',
                'The prince must be very handsome',
                'The prince must bend and string Lord Shiva\'s bow',
                'The prince must solve a riddle'
              ],
              correctAnswer: 2
            },
            {
              question: 'Who came with Rama and Lakshmana to Mithila?',
              answers: [
                'King Dasaratha',
                'Sage Vishwamitra',
                'Hanuman',
                'Bharata'
              ],
              correctAnswer: 1
            },
            {
              question: 'What happened when Rama tried to string the bow?',
              answers: [
                'He could not lift it',
                'He lifted it with ease and broke it in two',
                'He dropped it',
                'He gave up trying'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who among the following could NOT lift the bow?',
              answers: [
                'Rama',
                'Ravana',
                'Lakshmana',
                'Vishwamitra'
              ],
              correctAnswer: 1
            },
            {
              question: 'What does the name "Sita" mean?',
              answers: [
                'Beautiful',
                'Furrow',
                'Princess',
                'Goddess'
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
        id: 'meditation',
        title: 'Meditation',
        description: 'Learn the sacred practice of meditation - the continuous flow of thought towards God',
        content: `
          <h2>Meditation</h2>
          <div class="text-center mb-6">
            <img src="/pics/meditation.jpg" alt="A peaceful meditation scene showing inner concentration" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Meditation - the continuous flow of thought towards God</p>
          </div>

          <p>Meditation means the <strong>continuous flow of thought towards God</strong>. It is one of the most important spiritual practices that helps us connect deeply with the Divine.</p>

          <h3>What is Meditation?</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Essence of Meditation</h4>
              <p class="mb-3">Meditation is not just sitting quietly. It is the practice of <strong>focusing our mind continuously on God</strong>.</p>
              <p class="font-medium">Through meditation, we learn to control our wandering thoughts and direct them toward the Divine.</p>
            </div>
          </div>

          <h3>How to Meditate</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <p class="mb-6 font-medium text-center">Follow these steps for proper meditation:</p>

            <div class="space-y-4">
              <div class="bg-white p-4 rounded-lg border-l-4 border-spiritual-300">
                <h4 class="font-semibold mb-2">1. Proper Posture</h4>
                <p>Sit in a comfortable posture, preferably on the floor cross-legged. Keep your back straight but relaxed.</p>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-spiritual-300">
                <h4 class="font-semibold mb-2">2. Relaxation</h4>
                <p>Be relaxed. Let go of all tension in your body and mind. Close your eyes gently.</p>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-spiritual-300">
                <h4 class="font-semibold mb-2">3. Focus on the Heart</h4>
                <p>In the temple of your heart, concentrate on God. This is where you will feel the Divine presence most clearly.</p>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-spiritual-300">
                <h4 class="font-semibold mb-2">4. Visualize God</h4>
                <p>Imagine the living form of God that you like best and feel that God is blessing you. This could be Rama, Krishna, Shiva, the Divine Mother, or any form that inspires you.</p>
              </div>

              <div class="bg-white p-4 rounded-lg border-l-4 border-spiritual-300">
                <h4 class="font-semibold mb-2">5. Let Go of Everything Else</h4>
                <p>Forget everything else. Let go of all worldly thoughts, worries, and distractions.</p>
              </div>
            </div>
          </div>

          <h3>Dealing with the Wandering Mind</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <h4 class="font-semibold mb-3">The Nature of the Mind</h4>
            <p class="mb-4">It is the nature of the uncontrolled mind to wander. This is completely normal and happens to everyone who meditates.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Gentle Practice</h4>
              <p class="mb-3">Every time the mind strays away from the thought of God, <strong>gently bring it back</strong> and fix it upon the Lord.</p>
              <p class="font-medium">By repeatedly bringing the mind back, one can perfect the practice of fixing the mind on the Lord.</p>
            </div>
          </div>

          <h3>Using Mantras in Meditation</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Whilst concentrating on God, you may also repeat a mantra, or God's holy Name.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Benefits of Mantra</h4>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Helps focus the mind</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Creates sacred vibrations</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Deepens the connection with God</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Brings peace to the heart</span>
                </li>
              </ul>
            </div>
          </div>

          <h3>When to Meditate</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Daily Practice</h4>
            <p class="mb-4">Meditation must be practiced <strong>at least every morning and evening</strong>.</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-white p-4 rounded-lg">
                <h5 class="font-semibold mb-2">Morning Meditation</h5>
                <p class="text-sm">Start your day with God. Morning meditation sets a peaceful tone for the entire day.</p>
              </div>

              <div class="bg-white p-4 rounded-lg">
                <h5 class="font-semibold mb-2">Evening Meditation</h5>
                <p class="text-sm">End your day in God's presence. Evening meditation brings peace and prepares you for restful sleep.</p>
              </div>
            </div>
          </div>

          <h3>The Benefits of Regular Meditation</h3>
          <div class="bg-gradient-to-br from-indian-cream to-white p-4 rounded-lg border border-indian-saffron mt-6">
            <h4 class="font-semibold mb-3">Spiritual Growth</h4>
            <div class="space-y-3">
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Inner Peace:</strong> Regular meditation brings deep peace to the mind and heart</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Divine Connection:</strong> Strengthens your relationship with God</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Mental Clarity:</strong> Helps clear the mind of unnecessary thoughts</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Spiritual Progress:</strong> Accelerates growth on the spiritual path</p>
              </div>
            </div>
          </div>

          <div class="mt-8 p-4 bg-spiritual-50 rounded-lg border-l-4 border-spiritual-300">
            <h4 class="font-semibold mb-2">Remember</h4>
            <p>Meditation is a practice that develops over time. Be patient with yourself and maintain regular practice. Even a few minutes of sincere meditation each day can bring profound changes to your spiritual life. The key is consistency and devotion.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'What does meditation mean?',
              answers: [
                'Sitting quietly without thinking',
                'The continuous flow of thought towards God',
                'Reading spiritual books',
                'Going to temple'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is the recommended posture for meditation?',
              answers: [
                'Standing upright',
                'Lying down flat',
                'Sitting comfortably, preferably cross-legged on the floor',
                'Walking slowly'
              ],
              correctAnswer: 2
            },
            {
              question: 'Where should you concentrate during meditation?',
              answers: [
                'On your breathing',
                'In the temple of your heart',
                'On external sounds',
                'On your hands'
              ],
              correctAnswer: 1
            },
            {
              question: 'What should you do when your mind wanders during meditation?',
              answers: [
                'Stop meditating immediately',
                'Get frustrated and give up',
                'Gently bring it back and fix it upon the Lord',
                'Let it wander freely'
              ],
              correctAnswer: 2
            },
            {
              question: 'How often should meditation be practiced?',
              answers: [
                'Only on weekends',
                'Once a week',
                'At least every morning and evening',
                'Only when you feel like it'
              ],
              correctAnswer: 2
            },
            {
              question: 'What can you repeat during meditation to help focus?',
              answers: [
                'Worldly thoughts',
                'A mantra or God\'s holy Name',
                'Daily problems',
                'Random words'
              ],
              correctAnswer: 1
            },
            {
              question: 'What should you imagine during meditation?',
              answers: [
                'Your daily schedule',
                'Material possessions',
                'The living form of God that you like best',
                'Past memories'
              ],
              correctAnswer: 2
            },
            {
              question: 'What is the nature of the uncontrolled mind?',
              answers: [
                'To stay perfectly still',
                'To wander',
                'To sleep',
                'To become angry'
              ],
              correctAnswer: 1
            },
            {
              question: 'What should you forget during meditation?',
              answers: [
                'God\'s name',
                'How to breathe',
                'Everything else except God',
                'Your meditation posture'
              ],
              correctAnswer: 2
            },
            {
              question: 'How can one perfect the practice of meditation?',
              answers: [
                'By meditating only once',
                'By repeatedly bringing the mind back to God',
                'By avoiding all practice',
                'By meditating only in temples'
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: 'maha-shivaratri',
        title: 'Mahā Shivarātri',
        description: 'Learn about the sacred festival of Maha Shivaratri and the story of Lord Shiva\'s great sacrifice',
        content: `
          <h2>Mahā Shivarātri</h2>
          <div class="text-center mb-6">
            <img src="/pics/maha-shivaratri.jpg" alt="Lord Shiva drinking the poison to save the world" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Mahā Shivarātri - the night when Lord Shiva saved the world</p>
          </div>

          <p>Each Hindu festival has a beautiful story behind it. It also has a deeper meaning. Mahā Shivarātri is one of the most sacred festivals dedicated to Lord Shiva, and it commemorates his great sacrifice for the welfare of the world.</p>

          <h3>The Churning of the Milky Ocean</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Once upon a time, the Devas (gods) and Asuras (demons) came together for a great undertaking.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Great Collaboration</h4>
              <p class="mb-3">Together, they churned the Milky Ocean (Kshira Sagar) to obtain precious treasures, especially the nectar of immortality.</p>
              <p>This cosmic event would bring forth both wonderful and terrible things from the depths of the ocean.</p>
            </div>
          </div>

          <h3>The Treasures That Emerged</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Divine Gifts from the Ocean</h4>
            <p class="mb-4">Many things came out of the churning - both good and bad. The best treasures included:</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Celestial Treasures</h4>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>Goddess Lakshmi</strong> - the goddess of wealth and prosperity</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>The celestial horse</strong> - a divine steed of great beauty</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>The Pārijāta tree</strong> - a wish-fulfilling tree</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>The celestial elephant</strong> - Airavata, Indra's mount</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span><strong>The Amrit</strong> - divine nectar which can give immortality</span>
                </li>
              </ul>
            </div>
          </div>

          <h3>The Terrible Poison</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Before the precious Amrit came out, something terrible emerged from the ocean that threatened all existence.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Kālakoota - The Deadly Poison</h4>
              <p class="mb-3">That was the poison called <strong>'Kālakoota'</strong> which had the power to destroy the whole world.</p>
              <p class="mb-3">All the gods and demons stood terrified, not knowing what to do with this deadly poison.</p>
              <p class="font-medium">The very existence of the universe was at stake.</p>
            </div>
          </div>

          <h3>Lord Shiva's Great Sacrifice</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">When no one else could find a solution to this cosmic crisis, Lord Shiva stepped forward.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Ultimate Act of Compassion</h4>
              <p class="mb-3">Then Lord Shiva came forward and just drank the poison in one gulp, saving the entire universe from destruction.</p>
              <p>He willingly took upon himself the suffering that would have destroyed all creation.</p>
            </div>
          </div>

          <h3>Mother Pārvati's Love</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">A Wife's Protective Love</h4>
            <p class="mb-4">Goddess Pārvati, Lord Shiva's beloved wife, was deeply concerned for her husband's welfare.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Blue Throat</h4>
              <p class="mb-3">Goddess Pārvati became afraid that something might happen to her Lord and pressed his neck so that the poison may not go down into his stomach.</p>
              <p class="mb-3">There it stuck, creating a blue colour in Lord Shiva's throat.</p>
              <p class="font-medium">From that day, Shiva got another name: <strong>Neelakantha</strong> - the blue-necked God.</p>
            </div>
          </div>

          <h3>The Deeper Meaning</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">This story teaches us profound spiritual truths about facing difficulties in life.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Lessons for Life</h4>
              <p class="mb-3">The story shows that even when we start working for the good of the world, it is possible that some bad results can come to us.</p>
              <p class="mb-3">But a person who has Godly qualities like Shiva can face them bravely and overcome them.</p>
              <p class="font-medium">The difficulties then turn into successes when faced with courage and divine grace.</p>
            </div>
          </div>

          <h3>The Sacred Night</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">The night in which Lord Shiva drank the poison and saved the world is called Mahā Shivarātri.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">How We Observe This Sacred Night</h4>
              <p class="mb-3">On this night, everyone forgets to eat or sleep. We think only of Lord Shiva and sing His glories and pray to Him.</p>
              <ul class="space-y-2 mt-3">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Devotees stay awake all night in prayer and meditation</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>They fast and offer prayers to Lord Shiva</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Sacred chants and hymns are sung throughout the night</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Devotees visit Shiva temples and offer bilva leaves</span>
                </li>
              </ul>
            </div>
          </div>

          <h3>The Spiritual Significance</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Why This Night is Special</h4>
            <p class="mb-4">Mahā Shivarātri is especially dedicated to Lord Shiva and represents the triumph of good over evil.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Developing Sacrifice</h4>
              <p class="mb-3">By remembering the great sacrifice Lord Shiva made on that night for the good of the world, we must also develop the will power to sacrifice ourselves for the good of the world.</p>
              <p class="font-medium">This festival inspires us to put the welfare of others before our own comfort.</p>
            </div>
          </div>

          <h3>Connection to Another Story</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">The importance of Shivarātri is brought out in another beautiful story that shows how even unknowing devotion can bring divine blessings.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Hunter's Story</h4>
              <p>This story demonstrates that Lord Shiva especially loves people who keep awake and pray on Mahā Shivarātri, fast, and worship the Shiva-linga with bilva leaves - even if done unknowingly.</p>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg text-center">
            <h4 class="font-semibold text-lg mb-2">The Message of Mahā Shivarātri</h4>
            <p>Mahā Shivarātri teaches us that true greatness lies in sacrifice for others. Just as Lord Shiva willingly took the poison to save the world, we too should be ready to face difficulties for the welfare of others. This sacred night reminds us that divine grace protects those who act with pure intentions for the good of all.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'Who churned the Milky Ocean together?',
              answers: [
                'Only the gods',
                'Only the demons',
                'The Devas and Asuras together',
                'Only Lord Shiva'
              ],
              correctAnswer: 2
            },
            {
              question: 'What was the most important thing that came out of the ocean?',
              answers: [
                'Goddess Lakshmi',
                'The celestial horse',
                'The Amrit (divine nectar)',
                'The Parijata tree'
              ],
              correctAnswer: 2
            },
            {
              question: 'What terrible thing emerged before the Amrit?',
              answers: [
                'A demon',
                'The poison called Kalakoota',
                'A monster',
                'A curse'
              ],
              correctAnswer: 1
            },
            {
              question: 'What power did the Kalakoota poison have?',
              answers: [
                'It could make people sick',
                'It could destroy the whole world',
                'It could make people sleep',
                'It could change colors'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who came forward to drink the poison?',
              answers: [
                'Lord Vishnu',
                'Lord Brahma',
                'Lord Shiva',
                'Goddess Parvati'
              ],
              correctAnswer: 2
            },
            {
              question: 'What did Goddess Parvati do when Shiva drank the poison?',
              answers: [
                'She ran away',
                'She pressed his neck to stop the poison from going down',
                'She also drank some poison',
                'She called for help'
              ],
              correctAnswer: 1
            },
            {
              question: 'What happened to Lord Shiva\'s throat after drinking the poison?',
              answers: [
                'It became red',
                'It became blue',
                'It became white',
                'Nothing happened'
              ],
              correctAnswer: 1
            },
            {
              question: 'What name did Lord Shiva get because of his blue throat?',
              answers: [
                'Mahadeva',
                'Neelakantha',
                'Nataraja',
                'Rudra'
              ],
              correctAnswer: 1
            },
            {
              question: 'How do people observe Maha Shivaratri?',
              answers: [
                'They sleep all day',
                'They stay awake all night praying to Lord Shiva',
                'They go on vacation',
                'They avoid temples'
              ],
              correctAnswer: 1
            },
            {
              question: 'What should we develop by remembering Lord Shiva\'s sacrifice?',
              answers: [
                'The will power to sacrifice ourselves for the good of the world',
                'The desire for more wealth',
                'The wish to be famous',
                'The need to be powerful'
              ],
              correctAnswer: 0
            }
          ]
        }
      },
      {
        id: 'the-hunter',
        title: 'The Hunter',
        description: 'Learn how unknowing devotion on Maha Shivaratri brought divine blessings to a simple hunter',
        content: `
          <h2>The Hunter</h2>
          <div class="text-center mb-6">
            <img src="/pics/hunter-shivaratri.jpg" alt="The hunter unknowingly worshipping Lord Shiva on Maha Shivaratri" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">The hunter who received divine blessings through unknowing devotion</p>
          </div>

          <p>This beautiful story shows us that Lord Shiva's grace can reach anyone, even those who worship Him unknowingly. It demonstrates the special power of Mahā Shivarātri and how divine blessings can come to the most unexpected people.</p>

          <h3>The Hunter's Unsuccessful Day</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">A hunter went to the forest to hunt animals, as was his usual occupation.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">A Day Without Success</h4>
              <p class="mb-3">He could not kill any animals throughout the day, despite his best efforts.</p>
              <p class="mb-3">So he had to go hungry, as hunting was his only means of getting food.</p>
              <p>This was turning out to be one of the most difficult days of his life.</p>
            </div>
          </div>

          <h3>Trapped in the Forest</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Night Falls</h4>
            <p class="mb-4">Night fell and the hunter was still in the forest, far from his home.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Seeking Safety</h4>
              <p class="mb-3">He climbed up a tree to sleep because he was afraid of the wild animals that roamed the forest at night.</p>
              <p>The tree would provide him safety from dangerous beasts below.</p>
            </div>
          </div>

          <h3>A Sleepless Night</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Despite his exhaustion from the long day, the hunter found that he could not sleep.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Restless Hours</h4>
              <p class="mb-3">Perhaps it was hunger, fear, or simply the discomfort of sleeping in a tree that kept him awake.</p>
              <p>To pass the long hours of the night, he began to pluck off the leaves of the tree where he was sitting, one by one.</p>
              <p class="mt-3">He dropped them down onto the ground below, simply to occupy his restless mind.</p>
            </div>
          </div>

          <h3>The Sacred Night</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Unknown to the hunter, this night was very special in the spiritual calendar.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Mahā Shivarātri</h4>
              <p class="mb-3">That night was <strong>Mahā Shivarātri</strong> - the most sacred night dedicated to Lord Shiva.</p>
              <p>The hunter had no knowledge of this holy festival, but divine providence was at work.</p>
            </div>
          </div>

          <h3>The Sacred Tree</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The Bilva Tree</h4>
            <p class="mb-4">The tree on which the hunter was sitting was no ordinary tree.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Lord Shiva's Favorite</h4>
              <p class="mb-3">The tree was a <strong>Bilva Tree</strong>, whose leaves are especially dear to Lord Shiva.</p>
              <p>Bilva leaves are considered sacred and are traditionally offered to Lord Shiva during worship.</p>
            </div>
          </div>

          <h3>The Divine Presence Below</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">What the hunter did not know was that directly below the tree was something very sacred.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Shiva-linga</h4>
              <p class="mb-3">It so happened that down below on the ground was a <strong>Shiva-linga</strong> - a sacred symbol of Lord Shiva.</p>
              <p>As the hunter dropped the bilva leaves throughout the night, they were falling directly onto the Shiva-linga.</p>
            </div>
          </div>

          <h3>Unknowing Worship</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Without realizing it, the hunter was performing perfect worship of Lord Shiva.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Perfect Devotion</h4>
              <p class="mb-3">Lord Shiva especially loves people who:</p>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Keep awake and pray on Mahā Shivarātri</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Fast (go without food)</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Worship the Shiva-linga with bilva leaves</span>
                </li>
              </ul>
              <p class="mt-3 font-medium">The hunter was unknowingly doing all of these things!</p>
            </div>
          </div>

          <h3>Divine Grace</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">God's Blessing</h4>
            <p class="mb-4">Although the hunter did not know that he was pleasing God in all these ways, God's grace is not limited by our knowledge or intentions.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Divine Blessing</h4>
              <p class="mb-3">God blessed the hunter for his unknowing but perfect devotion on this sacred night.</p>
              <p>The hunter's life was transformed by this divine grace, even though he had no idea what had happened.</p>
            </div>
          </div>

          <h3>Mother Sāradā's Wisdom</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">This story illustrates a profound teaching from Mother Sāradā Devi.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Divine Grace is Universal</h4>
              <p class="mb-3">Mother Sāradā says that whether we fall into the river or get pushed into it, we still get wet.</p>
              <div class="bg-spiritual-50 p-4 rounded-lg mt-3">
                <p class="italic text-center">"Therefore, whether we pray to the Lord knowingly or unknowingly, we are still blessed."</p>
              </div>
              <p class="mt-3">God's grace flows to all sincere hearts, regardless of their level of knowledge or understanding.</p>
            </div>
          </div>

          <h3>The Special Power of Mahā Shivarātri</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">This story demonstrates why Mahā Shivarātri is considered such a powerful and sacred night.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">The Night of Grace</h4>
              <p class="mb-3">On this night, Lord Shiva's grace is especially available to all beings, even those who worship unknowingly.</p>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Staying awake brings spiritual benefit</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Fasting purifies the mind and body</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Offering bilva leaves pleases Lord Shiva</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>Even unknowing devotion receives divine blessings</span>
                </li>
              </ul>
            </div>
          </div>

          <h3>The Message of Sacrifice</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Following Lord Shiva's Example</h4>
            <p class="mb-4">Mahā Shivarātri is especially dedicated to Lord Shiva and reminds us of his great sacrifice for the world.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Developing the Spirit of Sacrifice</h4>
              <p class="mb-3">By remembering the great sacrifice Lord Shiva made on that night for the good of the world, we must also develop the will power to sacrifice ourselves for the good of the world.</p>
              <p class="font-medium">True devotion leads us to serve others selflessly, just as Lord Shiva served all creation.</p>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg text-center">
            <h4 class="font-semibold text-lg mb-2">The Eternal Teaching</h4>
            <p>The story of the hunter teaches us that God's grace is available to all, regardless of their knowledge, status, or intentions. It shows us the special power of Mahā Shivarātri and reminds us that sincere devotion - whether knowing or unknowing - always reaches the Divine heart. Most importantly, it inspires us to develop the spirit of sacrifice for the welfare of all beings.</p>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'Why did the hunter go to the forest?',
              answers: [
                'To collect fruits',
                'To hunt animals',
                'To meditate',
                'To visit friends'
              ],
              correctAnswer: 1
            },
            {
              question: 'What happened to the hunter during the day?',
              answers: [
                'He caught many animals',
                'He got lost',
                'He could not kill any animals and went hungry',
                'He fell asleep'
              ],
              correctAnswer: 2
            },
            {
              question: 'Why did the hunter climb up a tree at night?',
              answers: [
                'To get a better view',
                'To pick fruits',
                'To sleep safely away from wild animals',
                'To hide from other hunters'
              ],
              correctAnswer: 2
            },
            {
              question: 'What did the hunter do to pass time during the sleepless night?',
              answers: [
                'He sang songs',
                'He plucked leaves and dropped them down',
                'He counted stars',
                'He made noise'
              ],
              correctAnswer: 1
            },
            {
              question: 'What special night was it, unknown to the hunter?',
              answers: [
                'Diwali',
                'Holi',
                'Mahā Shivarātri',
                'Dussehra'
              ],
              correctAnswer: 2
            },
            {
              question: 'What type of tree was the hunter sitting on?',
              answers: [
                'Mango tree',
                'Banyan tree',
                'Bilva tree',
                'Neem tree'
              ],
              correctAnswer: 2
            },
            {
              question: 'What was located below the tree?',
              answers: [
                'A river',
                'A Shiva-linga',
                'A cave',
                'Another tree'
              ],
              correctAnswer: 1
            },
            {
              question: 'What three things does Lord Shiva especially love on Maha Shivaratri?',
              answers: [
                'Singing, dancing, and eating',
                'Keeping awake, fasting, and worshipping with bilva leaves',
                'Sleeping, feasting, and playing',
                'Reading, writing, and studying'
              ],
              correctAnswer: 1
            },
            {
              question: 'What happened to the hunter even though he didn\'t know he was worshipping?',
              answers: [
                'Nothing happened',
                'He was punished',
                'God blessed him',
                'He became sick'
              ],
              correctAnswer: 2
            },
            {
              question: 'What does Mother Sarada\'s teaching about falling or being pushed into a river mean?',
              answers: [
                'We should avoid rivers',
                'Whether we pray knowingly or unknowingly, we are still blessed',
                'Only intentional actions matter',
                'Water is always wet'
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: 'diwali',
        title: 'Diwāli',
        description: 'Learn about the festival of lights and the beautiful stories behind this joyous celebration',
        content: `
          <h2>Diwāli</h2>
          <div class="text-center mb-6">
            <img src="/pics/diwali.jpg" alt="Beautiful Diwali celebration with rows of clay lamps" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Diwāli - the festival of lights celebrating the victory of good over evil</p>
          </div>

          <p>Dipāvali is a Sanskrit word. It means a row of lights. Hindus all over the world celebrate Dipāvali or Diwāli. This festival is celebrated every year during October - November and is one of the most joyous and widely celebrated Hindu festivals.</p>

          <h3>The Meaning of Diwāli</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Festival of Lights</h4>
              <p class="mb-3">The word <strong>Dipāvali</strong> comes from Sanskrit and literally means "a row of lights" or "an array of lamps."</p>
              <p class="font-medium">This beautiful festival symbolizes the victory of light over darkness, good over evil, and knowledge over ignorance.</p>
            </div>
          </div>

          <h3>The Story of Sri Rāma's Return</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The First Reason for Celebration</h4>
            <p class="mb-4">There are many reasons for celebrating Diwāli. One of the most important stories is connected to Sri Rāma and Mother Sītā.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Exile and Return</h4>
              <p class="mb-3">Sri Rāma, Mother Sītā and Lakshman were sent to live in the forest for fourteen years.</p>
              <p class="mb-3">During this time, the wicked king Rāvana took Mother Sītā away to Sri Lanka.</p>
              <p class="mb-3">Sri Rāma fought a great battle, killed Rāvana, and brought Mother Sītā back to Ayodhyā.</p>
              <p class="font-medium">Everyone was very happy when their beloved king returned. They celebrated by lighting lamps throughout the city - this was the first Diwāli.</p>
            </div>
          </div>

          <h3>The Story of Sri Krishna and Narakāsura</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Diwāli also reminds us of Sri Krishna and his victory over the demon Narakāsura.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Demon's Rise to Power</h4>
              <p class="mb-3">Narakāsura was a brave fighter who received many boons from God because of his tapasya (spiritual practices).</p>
              <p class="mb-3">But power corrupted him, and he became very greedy and wicked.</p>
              <p>He began to misuse his powers and terrorize innocent people.</p>
            </div>
          </div>

          <h3>Narakāsura's Evil Deeds</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Narakāsura's wickedness knew no bounds, and he committed terrible crimes.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">His Terrible Crimes</h4>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>He killed many innocent people who could not defend themselves</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>He stole the beautiful daughters of the gods and locked them in his mountain cave</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>He stole the golden ear-rings of Aditi, the Mother of the gods</span>
                </li>
              </ul>
              <p class="mt-3">His actions caused great suffering and injustice throughout the world.</p>
            </div>
          </div>

          <h3>The Gods Seek Help</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Divine Intervention</h4>
            <p class="mb-4">Indra and the other gods became very angry at Narakāsura's evil deeds.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Seeking Sri Krishna's Help</h4>
              <p class="mb-3">Unable to stop the demon themselves, they went to Sri Krishna for help.</p>
              <p class="font-medium">Sri Krishna protects all good people and always comes to the aid of those who suffer from injustice.</p>
            </div>
          </div>

          <h3>Sri Krishna's Victory</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Sri Krishna accepted the gods' plea and took action against the evil demon.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Great Battle</h4>
              <p class="mb-3">Sri Krishna fought Narakāsura in a mighty battle and killed him, ending his reign of terror.</p>
              <p class="mb-3">He freed all the imprisoned daughters of the gods and restored peace to the world.</p>
              <p class="font-medium">The people were overjoyed and celebrated this victory of good over evil - another reason for Diwāli.</p>
            </div>
          </div>

          <h3>The Spiritual Message</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">These stories teach us profound spiritual truths that are relevant to our daily lives.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Eternal Lessons</h4>
              <div class="space-y-3">
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p><strong>Divine Protection:</strong> Diwāli reminds us that God always protects His devotees</p>
                </div>
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p><strong>Victory of Good:</strong> We learn that 'evil' must die and 'good' lasts forever</p>
                </div>
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p><strong>Light over Darkness:</strong> Truth and righteousness always triumph over falsehood</p>
                </div>
              </div>
            </div>
          </div>

          <h3>Diwāli Customs and Traditions</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">How We Celebrate</h4>
            <p class="mb-4">We observe certain beautiful customs during Diwāli that bring families and communities together:</p>

            <div class="space-y-3">
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Cleaning Homes:</strong> We clean our homes properly to welcome Goddess Lakshmi</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Worship:</strong> We worship Mother Lakshmi (goddess of wealth) and Sri Ganesha (remover of obstacles)</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Lighting Lamps:</strong> We light many clay lamps (diyas) inside and outside our homes</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>New Clothes:</strong> Children usually wear new clothes for the celebration</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Fireworks:</strong> Children love to burst crackers (though we should be mindful of safety and environment)</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Sharing Joy:</strong> Friends and relatives exchange greetings and parcels of sweets or presents</p>
              </div>
            </div>
          </div>

          <h3>The Spirit of Forgiveness</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">One of the most beautiful aspects of Diwāli is how it brings people together in love and harmony.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Love and Joy Everywhere</h4>
              <p class="mb-3">Old quarrels are forgotten during Diwāli. There is love and joy everywhere.</p>
              <p class="font-medium">This festival teaches us the importance of forgiveness and starting fresh with clean hearts.</p>
            </div>
          </div>

          <h3>Diwāli Self-Reflection</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Diwāli is a good time to think about yourself and your spiritual progress.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Questions for Self-Examination</h4>
              <div class="space-y-3">
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p class="font-medium">Do you think of God every day?</p>
                </div>
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p class="font-medium">Do you do any good deeds, like helping the poor?</p>
                </div>
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p class="font-medium">What good things did you learn this year?</p>
                </div>
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p class="font-medium">Are you kind and loving to your parents?</p>
                </div>
              </div>
              <p class="mt-3">These questions help us examine our spiritual growth and resolve to become better people.</p>
            </div>
          </div>

          <h3>The Lesson of Humility</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Staying Humble</h4>
            <p class="mb-4">Diwāli also reminds us to be humble and not to be proud of ourselves.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Danger of Pride</h4>
              <p class="mb-3">Just as Narakāsura's pride and arrogance led to his downfall, we must guard against becoming proud of our achievements.</p>
              <p class="font-medium">True victory comes with humility and service to others.</p>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg">
            <h4 class="font-semibold mb-2">Meanings</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Demon:</strong> A bad or wicked person</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Tapasya:</strong> Praying to God for a long time; doing japa and meditation</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Innocent:</strong> Those who do not hurt others; simple hearted</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Custom:</strong> Habit or tradition</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Gods:</strong> There is ONE GOD. He is nameless and formless. God takes different forms to please His devotees so that we may worship Him easily. Examples: Indra, Agni, Vāyu, Surya</p>
              </div>
            </div>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'What does the Sanskrit word "Dipāvali" mean?',
              answers: [
                'Festival of colors',
                'A row of lights',
                'Time of joy',
                'Sacred celebration'
              ],
              correctAnswer: 1
            },
            {
              question: 'During which months is Diwāli celebrated?',
              answers: [
                'August - September',
                'October - November',
                'December - January',
                'March - April'
              ],
              correctAnswer: 1
            },
            {
              question: 'Why did the people of Ayodhyā first celebrate Diwāli?',
              answers: [
                'To welcome the harvest',
                'To celebrate Sri Rāma\'s return after defeating Rāvana',
                'To honor the gods',
                'To mark the new year'
              ],
              correctAnswer: 1
            },
            {
              question: 'How long were Sri Rāma, Sītā, and Lakshman in exile?',
              answers: [
                'Twelve years',
                'Fourteen years',
                'Sixteen years',
                'Ten years'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who was Narakāsura?',
              answers: [
                'A good king',
                'A demon who became wicked despite his spiritual practices',
                'A friend of Sri Krishna',
                'A sage'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did Narakāsura steal from Aditi?',
              answers: [
                'Her crown',
                'Her golden ear-rings',
                'Her necklace',
                'Her precious stones'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who killed Narakāsura?',
              answers: [
                'Lord Indra',
                'Sri Rāma',
                'Sri Krishna',
                'Lord Shiva'
              ],
              correctAnswer: 2
            },
            {
              question: 'Which deities do we especially worship during Diwāli?',
              answers: [
                'Lord Shiva and Mother Parvati',
                'Mother Lakshmi and Sri Ganesha',
                'Lord Vishnu and Mother Saraswati',
                'Lord Brahma and Mother Durga'
              ],
              correctAnswer: 1
            },
            {
              question: 'What happens to old quarrels during Diwāli?',
              answers: [
                'They become worse',
                'They are remembered more',
                'They are forgotten',
                'They are written down'
              ],
              correctAnswer: 2
            },
            {
              question: 'What important lesson does Diwāli teach us about good and evil?',
              answers: [
                'Evil is stronger than good',
                'Good and evil are equal',
                'Evil must die and good lasts forever',
                'There is no difference between them'
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      {
        id: 'diwali',
        title: 'Diwāli',
        description: 'Learn about the festival of lights and the beautiful stories behind this joyous celebration',
        content: `
          <h2>Diwāli</h2>
          <div class="text-center mb-6">
            <img src="/pics/diwali.jpg" alt="Beautiful Diwali celebration with rows of clay lamps" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Diwāli - the festival of lights celebrating the victory of good over evil</p>
          </div>

          <p>Dipāvali is a Sanskrit word. It means a row of lights. Hindus all over the world celebrate Dipāvali or Diwāli. This festival is celebrated every year during October - November and is one of the most joyous and widely celebrated Hindu festivals.</p>

          <h3>The Meaning of Diwāli</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Festival of Lights</h4>
              <p class="mb-3">The word <strong>Dipāvali</strong> comes from Sanskrit and literally means "a row of lights" or "an array of lamps."</p>
              <p class="font-medium">This beautiful festival symbolizes the victory of light over darkness, good over evil, and knowledge over ignorance.</p>
            </div>
          </div>

          <h3>The Story of Sri Rāma's Return</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">The First Reason for Celebration</h4>
            <p class="mb-4">There are many reasons for celebrating Diwāli. One of the most important stories is connected to Sri Rāma and Mother Sītā.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Exile and Return</h4>
              <p class="mb-3">Sri Rāma, Mother Sītā and Lakshman were sent to live in the forest for fourteen years.</p>
              <p class="mb-3">During this time, the wicked king Rāvana took Mother Sītā away to Sri Lanka.</p>
              <p class="mb-3">Sri Rāma fought a great battle, killed Rāvana, and brought Mother Sītā back to Ayodhyā.</p>
              <p class="font-medium">Everyone was very happy when their beloved king returned. They celebrated by lighting lamps throughout the city - this was the first Diwāli.</p>
            </div>
          </div>

          <h3>The Story of Sri Krishna and Narakāsura</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Diwāli also reminds us of Sri Krishna and his victory over the demon Narakāsura.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Demon's Rise to Power</h4>
              <p class="mb-3">Narakāsura was a brave fighter who received many boons from God because of his tapasya (spiritual practices).</p>
              <p class="mb-3">But power corrupted him, and he became very greedy and wicked.</p>
              <p>He began to misuse his powers and terrorize innocent people.</p>
            </div>
          </div>

          <h3>Narakāsura's Evil Deeds</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Narakāsura's wickedness knew no bounds, and he committed terrible crimes.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">His Terrible Crimes</h4>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>He killed many innocent people who could not defend themselves</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>He stole the beautiful daughters of the gods and locked them in his mountain cave</span>
                </li>
                <li class="flex items-start">
                  <span class="text-spiritual-500 mr-2">•</span>
                  <span>He stole the golden ear-rings of Aditi, the Mother of the gods</span>
                </li>
              </ul>
              <p class="mt-3">His actions caused great suffering and injustice throughout the world.</p>
            </div>
          </div>

          <h3>The Gods Seek Help</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Divine Intervention</h4>
            <p class="mb-4">Indra and the other gods became very angry at Narakāsura's evil deeds.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Seeking Sri Krishna's Help</h4>
              <p class="mb-3">Unable to stop the demon themselves, they went to Sri Krishna for help.</p>
              <p class="font-medium">Sri Krishna protects all good people and always comes to the aid of those who suffer from injustice.</p>
            </div>
          </div>

          <h3>Sri Krishna's Victory</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">Sri Krishna accepted the gods' plea and took action against the evil demon.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Great Battle</h4>
              <p class="mb-3">Sri Krishna fought Narakāsura in a mighty battle and killed him, ending his reign of terror.</p>
              <p class="mb-3">He freed all the imprisoned daughters of the gods and restored peace to the world.</p>
              <p class="font-medium">The people were overjoyed and celebrated this victory of good over evil - another reason for Diwāli.</p>
            </div>
          </div>

          <h3>The Spiritual Message</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">These stories teach us profound spiritual truths that are relevant to our daily lives.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Eternal Lessons</h4>
              <div class="space-y-3">
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p><strong>Divine Protection:</strong> Diwāli reminds us that God always protects His devotees</p>
                </div>
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p><strong>Victory of Good:</strong> We learn that 'evil' must die and 'good' lasts forever</p>
                </div>
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p><strong>Light over Darkness:</strong> Truth and righteousness always triumph over falsehood</p>
                </div>
              </div>
            </div>
          </div>

          <h3>Diwāli Customs and Traditions</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">How We Celebrate</h4>
            <p class="mb-4">We observe certain beautiful customs during Diwāli that bring families and communities together:</p>

            <div class="space-y-3">
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Cleaning Homes:</strong> We clean our homes properly to welcome Goddess Lakshmi</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Worship:</strong> We worship Mother Lakshmi (goddess of wealth) and Sri Ganesha (remover of obstacles)</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Lighting Lamps:</strong> We light many clay lamps (diyas) inside and outside our homes</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>New Clothes:</strong> Children usually wear new clothes for the celebration</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Fireworks:</strong> Children love to burst crackers (though we should be mindful of safety and environment)</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Sharing Joy:</strong> Friends and relatives exchange greetings and parcels of sweets or presents</p>
              </div>
            </div>
          </div>

          <h3>The Spirit of Forgiveness</h3>
          <div class="bg-gradient-to-br from-spiritual-50 to-white p-4 rounded-lg border border-spiritual-200 mt-6">
            <p class="mb-4">One of the most beautiful aspects of Diwāli is how it brings people together in love and harmony.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">Love and Joy Everywhere</h4>
              <p class="mb-3">Old quarrels are forgotten during Diwāli. There is love and joy everywhere.</p>
              <p class="font-medium">This festival teaches us the importance of forgiveness and starting fresh with clean hearts.</p>
            </div>
          </div>

          <h3>Diwāli Self-Reflection</h3>
          <div class="bg-spiritual-50 p-4 rounded-lg border-l-4 border-spiritual-300 mt-6">
            <p class="mb-4">Diwāli is a good time to think about yourself and your spiritual progress.</p>

            <div class="bg-white p-4 rounded-lg mt-4">
              <h4 class="font-semibold mb-2">Questions for Self-Examination</h4>
              <div class="space-y-3">
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p class="font-medium">Do you think of God every day?</p>
                </div>
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p class="font-medium">Do you do any good deeds, like helping the poor?</p>
                </div>
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p class="font-medium">What good things did you learn this year?</p>
                </div>
                <div class="bg-indian-cream p-3 rounded-lg">
                  <p class="font-medium">Are you kind and loving to your parents?</p>
                </div>
              </div>
              <p class="mt-3">These questions help us examine our spiritual growth and resolve to become better people.</p>
            </div>
          </div>

          <h3>The Lesson of Humility</h3>
          <div class="bg-indian-cream p-4 rounded-lg mt-6">
            <h4 class="font-semibold mb-3">Staying Humble</h4>
            <p class="mb-4">Diwāli also reminds us to be humble and not to be proud of ourselves.</p>

            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold mb-2">The Danger of Pride</h4>
              <p class="mb-3">Just as Narakāsura's pride and arrogance led to his downfall, we must guard against becoming proud of our achievements.</p>
              <p class="font-medium">True victory comes with humility and service to others.</p>
            </div>
          </div>

          <div class="mt-8 p-4 bg-indian-cream rounded-lg">
            <h4 class="font-semibold mb-2">Meanings</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Demon:</strong> A bad or wicked person</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Tapasya:</strong> Praying to God for a long time; doing japa and meditation</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Innocent:</strong> Those who do not hurt others; simple hearted</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Custom:</strong> Habit or tradition</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <p><strong>Gods:</strong> There is ONE GOD. He is nameless and formless. God takes different forms to please His devotees so that we may worship Him easily. Examples: Indra, Agni, Vāyu, Surya</p>
              </div>
            </div>
          </div>
        `,
        quiz: {
          questions: [
            {
              question: 'What does the Sanskrit word "Dipāvali" mean?',
              answers: [
                'Festival of colors',
                'A row of lights',
                'Time of joy',
                'Sacred celebration'
              ],
              correctAnswer: 1
            },
            {
              question: 'During which months is Diwāli celebrated?',
              answers: [
                'August - September',
                'October - November',
                'December - January',
                'March - April'
              ],
              correctAnswer: 1
            },
            {
              question: 'Why did the people of Ayodhyā first celebrate Diwāli?',
              answers: [
                'To welcome the harvest',
                'To celebrate Sri Rāma\'s return after defeating Rāvana',
                'To honor the gods',
                'To mark the new year'
              ],
              correctAnswer: 1
            },
            {
              question: 'How long were Sri Rāma, Sītā, and Lakshman in exile?',
              answers: [
                'Twelve years',
                'Fourteen years',
                'Sixteen years',
                'Ten years'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who was Narakāsura?',
              answers: [
                'A good king',
                'A demon who became wicked despite his spiritual practices',
                'A friend of Sri Krishna',
                'A sage'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did Narakāsura steal from Aditi?',
              answers: [
                'Her crown',
                'Her golden ear-rings',
                'Her necklace',
                'Her precious stones'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who killed Narakāsura?',
              answers: [
                'Lord Indra',
                'Sri Rāma',
                'Sri Krishna',
                'Lord Shiva'
              ],
              correctAnswer: 2
            },
            {
              question: 'Which deities do we especially worship during Diwāli?',
              answers: [
                'Lord Shiva and Mother Parvati',
                'Mother Lakshmi and Sri Ganesha',
                'Lord Vishnu and Mother Saraswati',
                'Lord Brahma and Mother Durga'
              ],
              correctAnswer: 1
            },
            {
              question: 'What happens to old quarrels during Diwāli?',
              answers: [
                'They become worse',
                'They are remembered more',
                'They are forgotten',
                'They are written down'
              ],
              correctAnswer: 2
            },
            {
              question: 'What important lesson does Diwāli teach us about good and evil?',
              answers: [
                'Evil is stronger than good',
                'Good and evil are equal',
                'Evil must die and good lasts forever',
                'There is no difference between them'
              ],
              correctAnswer: 2
            }
          ]
        }
      },
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
