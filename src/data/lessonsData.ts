
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
        description: 'Learn about dharma - doing what is right and good',
        videoUrl: 'https://www.youtube.com/embed/lFiNGO0joPk',
        content: `
          <h2>Understanding Dharma</h2>
          <div class="text-center mb-6">
            <img src="/pics/dharma.png" alt="The Dharma symbol - it reminds us to always do what is right" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">The Dharma symbol - it reminds us to always do what is right</p>
          </div>
          <p>Dharma is a very important idea in Hinduism. The word "dharma" means doing what is right and good. It also means doing your duty - the things you are supposed to do.</p>
          <p>Think of dharma like the rules that keep everything working nicely. Just like how traffic rules keep cars safe on the road, dharma helps keep our lives and the whole world in balance.</p>

          <h3>What Does Dharma Mean?</h3>
          <p>Dharma has a few different meanings:</p>
          <ul>
            <li><strong>Doing what is right:</strong> Being honest, kind, and fair to others</li>
            <li><strong>Doing your duty:</strong> Finishing your homework, helping at home, being a good friend</li>
            <li><strong>Following nature's rules:</strong> The sun rises each day, seasons change - this is also dharma!</li>
          </ul>
          <p>When we follow dharma, we feel happy and peaceful. When we don't follow dharma, things can go wrong and we might feel bad inside.</p>

          <h3>Dharma in Our Holy Books</h3>
          <p>Our sacred books talk a lot about dharma:</p>
          <ul>
            <li><strong>The Bhagavad Gita</strong> tells the story of Arjuna, who had to make a very hard choice about doing his duty</li>
            <li><strong>The Ramayana</strong> shows us Lord Rama, who always did what was right, even when it was very difficult</li>
          </ul>
          <p>Lord Vishnu protects dharma. Whenever people forget to do what is right, Lord Vishnu comes to Earth to teach us again.</p>

          <h3>Rules That Are Good for Everyone</h3>
          <p>Some rules of dharma are good for every person, everywhere. These are called <strong>Sanatana Dharma</strong> (eternal rules):</p>
          <ul>
            <li><strong>Ahimsa:</strong> Don't hurt others - be kind to all living things</li>
            <li><strong>Satya:</strong> Always tell the truth</li>
            <li><strong>Asteya:</strong> Don't take things that aren't yours</li>
            <li><strong>Self-control:</strong> Think before you act</li>
            <li><strong>Sharing:</strong> Don't be greedy - share with others</li>
          </ul>
          <p>These rules help us become good people and make the world a better place.</p>

          <h3>Your Own Special Dharma</h3>
          <p>Everyone also has their own special dharma based on who they are:</p>
          <h4>As a Child</h4>
          <ul>
            <li>Listen to your parents and teachers</li>
            <li>Study hard and do your best in school</li>
            <li>Be kind to your brothers, sisters, and friends</li>
            <li>Help with chores at home</li>
          </ul>
          <p>As you grow up, your dharma will change. A doctor's dharma is to help sick people. A teacher's dharma is to help students learn. Everyone has something special to do!</p>

          <h3>Dharma at Home and School</h3>
          <p>Dharma is not just for temples - it's for everyday life!</p>
          <h4>At Home</h4>
          <ul>
            <li>Help your parents without being asked</li>
            <li>Be kind to your siblings</li>
            <li>Take care of your pets</li>
            <li>Keep your room tidy</li>
          </ul>
          <h4>At School</h4>
          <ul>
            <li>Pay attention in class</li>
            <li>Do your homework on your own</li>
            <li>Be friendly to classmates</li>
            <li>Don't cheat on tests</li>
          </ul>
          <h4>With Friends</h4>
          <ul>
            <li>Share your toys and games</li>
            <li>Don't tell lies</li>
            <li>Stand up for friends who are being bullied</li>
            <li>Say sorry when you make mistakes</li>
          </ul>

          <h3>When It's Hard to Do the Right Thing</h3>
          <p>Sometimes it's not easy to know what is right. You might have to choose between two things that both seem okay.</p>
          <p>For example: Your friend asks you to help them cheat on a test. You want to help your friend, but cheating is wrong. What should you do? The right choice is to say no to cheating, but offer to help your friend study instead!</p>
          <p>When you're not sure what to do, ask yourself: "Is this kind? Is this honest? Would I be happy if everyone knew what I did?"</p>

          <h3>Dharma and Karma</h3>
          <p>Dharma and karma work together like best friends:</p>
          <ul>
            <li>When you <strong>follow dharma</strong> (do good things), you get <strong>good karma</strong> (good things happen to you)</li>
            <li>When you <strong>break dharma</strong> (do bad things), you get <strong>bad karma</strong> (not-so-good things happen)</li>
          </ul>
          <p>It's like planting seeds: if you plant good seeds, you grow beautiful flowers. If you plant bad seeds, you grow weeds!</p>

          <h3>Dharma Today</h3>
          <h4>Taking Care of Nature</h4>
          <p>It is our dharma to look after the Earth - not littering, saving water, and being kind to animals.</p>
          <h4>Being a Good Person</h4>
          <p>No matter what job you have when you grow up, you can follow dharma by being honest, working hard, and treating everyone fairly.</p>

          <h3>Key Terms</h3>
          <ul>
            <li><strong>Dharma:</strong> Doing what is right; your duty</li>
            <li><strong>Ahimsa:</strong> Not hurting others; being kind</li>
            <li><strong>Satya:</strong> Telling the truth</li>
            <li><strong>Karma:</strong> What happens because of your actions (good or bad)</li>
            <li><strong>Sanatana Dharma:</strong> Rules that are good for everyone, forever</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              question: 'What does dharma mean?',
              answers: [
                'Playing games',
                'Doing what is right and good',
                'Eating food',
                'Sleeping well'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who protects dharma in Hindu stories?',
              answers: [
                'Lord Brahma',
                'Lord Vishnu',
                'Lord Shiva',
                'Lord Indra'
              ],
              correctAnswer: 1
            },
            {
              question: 'What does "Ahimsa" mean?',
              answers: [
                'Telling the truth',
                'Being greedy',
                'Not hurting others - being kind',
                'Running fast'
              ],
              correctAnswer: 2
            },
            {
              question: 'What happens when you follow dharma?',
              answers: [
                'You get bad karma',
                'Nothing happens',
                'You get good karma',
                'You become sad'
              ],
              correctAnswer: 2
            },
            {
              question: 'What is a child\'s dharma at school?',
              answers: [
                'Sleep in class',
                'Play all day',
                'Pay attention and do homework',
                'Be mean to classmates'
              ],
              correctAnswer: 2
            },
            {
              question: 'What does "Satya" mean?',
              answers: [
                'Telling the truth',
                'Telling lies',
                'Being lazy',
                'Being angry'
              ],
              correctAnswer: 0
            },
            {
              question: 'What is Sanatana Dharma?',
              answers: [
                'Rules for only one person',
                'Rules that change every day',
                'Eternal rules that are good for everyone',
                'No rules at all'
              ],
              correctAnswer: 2
            },
            {
              question: 'If your friend asks you to help them cheat, what should you do?',
              answers: [
                'Help them cheat',
                'Ignore them',
                'Say no to cheating, but offer to help them study',
                'Tell everyone'
              ],
              correctAnswer: 2
            },
            {
              question: 'What is like planting good seeds?',
              answers: [
                'Breaking dharma',
                'Following dharma',
                'Telling lies',
                'Being mean'
              ],
              correctAnswer: 1
            },
            {
              question: 'It is our dharma to look after...',
              answers: [
                'Only ourselves',
                'Only our toys',
                'The Earth and all living things',
                'Nothing'
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
        description: 'Learn how your actions create results - like planting seeds that grow',
        videoUrl: 'https://www.youtube.com/embed/yJMqULiDtOM?si=2AgJOdBvcEIUMI5b',
        content: `
          <h2>What is Karma?</h2>
          <div class="text-center mb-6">
            <img src="/pics/karma.jpg" alt="Karma - the principle of action and reaction" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Karma - the principle of action and reaction</p>
          </div>
          <p>The word <strong>karma</strong> means <strong>action</strong>. But karma is also about what happens because of your actions.</p>
          <p>Think of it like this: when you throw a ball against a wall, it bounces back to you. Karma works the same way - what you do comes back to you!</p>

          <h3>Good Actions, Good Results</h3>
          <p>Karma is like planting seeds in a garden:</p>
          <ul>
            <li>If you plant <strong>flower seeds</strong> (do kind things), you will grow <strong>beautiful flowers</strong> (good things happen to you)</li>
            <li>If you plant <strong>weed seeds</strong> (do mean things), you will grow <strong>weeds</strong> (not-so-good things happen)</li>
          </ul>
          <p>This is why it's so important to always try to do good things!</p>

          <h3>Examples of Karma in Daily Life</h3>
          <p>Here are some examples of how karma works:</p>
          <ul>
            <li><strong>If you share</strong> your toys with friends, they will want to share with you too</li>
            <li><strong>If you are kind</strong> to someone who is sad, you will feel happy inside</li>
            <li><strong>If you study hard</strong>, you will do well in your tests</li>
            <li><strong>If you help</strong> your parents at home, they will be proud of you</li>
          </ul>

          <h3>Karma Doesn't Forget</h3>
          <p>Sometimes the results of our actions come back to us right away. Sometimes it takes longer - like planting a seed that takes time to grow into a tree.</p>
          <p>But karma never forgets! That's why we should always try to do good things, even when nobody is watching.</p>

          <h3>You Are in Charge</h3>
          <p>The wonderful thing about karma is that <strong>you are in charge</strong> of your own future!</p>
          <ul>
            <li>Nobody else can create your karma for you</li>
            <li>Every choice you make matters</li>
            <li>You can always choose to do the right thing</li>
          </ul>
          <p>If you made a mistake before, don't worry! You can start doing good things right now, and your future will get better.</p>

          <h3>How to Create Good Karma</h3>
          <p>Here are easy ways to create good karma every day:</p>
          <ul>
            <li><strong>Be kind</strong> - Help someone who needs help</li>
            <li><strong>Be honest</strong> - Always tell the truth</li>
            <li><strong>Be thankful</strong> - Say thank you when others help you</li>
            <li><strong>Be forgiving</strong> - Don't hold anger in your heart</li>
            <li><strong>Work hard</strong> - Do your best in everything you do</li>
          </ul>

          <h3>A Story About Karma</h3>
          <p>A boy once helped an old woman carry her heavy bags. She smiled and blessed him. Later that day, when the boy fell and hurt his knee, a kind stranger helped him and gave him a bandage.</p>
          <p>The boy thought, "Maybe my good deed came back to me!" And he was right - that's karma!</p>

          <h3>Key Things to Remember</h3>
          <ul>
            <li><strong>Karma</strong> means "action" - what you do matters</li>
            <li>Good actions bring good results</li>
            <li>Bad actions bring bad results</li>
            <li>You are in charge of your own karma</li>
            <li>It's never too late to start doing good!</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              question: 'What does the word "karma" mean?',
              answers: [
                'Sleep',
                'Food',
                'Action',
                'Water'
              ],
              correctAnswer: 2
            },
            {
              question: 'What happens when you do good things?',
              answers: [
                'Nothing happens',
                'Bad things happen',
                'Good things come back to you',
                'You become tired'
              ],
              correctAnswer: 2
            },
            {
              question: 'Karma is like planting seeds. If you plant flower seeds, what grows?',
              answers: [
                'Weeds',
                'Nothing',
                'Beautiful flowers',
                'Rocks'
              ],
              correctAnswer: 2
            },
            {
              question: 'Who is in charge of your karma?',
              answers: [
                'Your parents',
                'Your teacher',
                'You are!',
                'Your friends'
              ],
              correctAnswer: 2
            },
            {
              question: 'If you share your toys with friends, what will happen?',
              answers: [
                'They will take all your toys',
                'They will want to share with you too',
                'Nothing will happen',
                'They will be angry'
              ],
              correctAnswer: 1
            },
            {
              question: 'What should you do if you made a mistake before?',
              answers: [
                'Give up',
                'Start doing good things now',
                'Blame others',
                'Hide from everyone'
              ],
              correctAnswer: 1
            },
            {
              question: 'Which of these creates good karma?',
              answers: [
                'Telling lies',
                'Being mean to others',
                'Helping someone who needs help',
                'Cheating on a test'
              ],
              correctAnswer: 2
            },
            {
              question: 'Does karma forget your actions?',
              answers: [
                'Yes, karma forgets everything',
                'No, karma never forgets',
                'Only sometimes',
                'Karma only remembers bad things'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is a good way to create good karma?',
              answers: [
                'Be lazy',
                'Be angry at everyone',
                'Be kind and honest',
                'Only think about yourself'
              ],
              correctAnswer: 2
            },
            {
              question: 'In the story, the boy helped an old woman. What happened later?',
              answers: [
                'He got lost',
                'A kind stranger helped him when he fell',
                'Nothing happened',
                'He forgot about it'
              ],
              correctAnswer: 1
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
            <img src="/pics/ssd.jpg" alt="Sri Sārada Devi - The Holy Mother" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Sri Sārada Devi - The Holy Mother</p>
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
            <img src="/pics/srk.jpg" alt="Sri Ramakrishna - The Great Spiritual Teacher" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Sri Ramakrishna - The Great Spiritual Teacher</p>
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
            <img src="/pics/childhood.jpg" alt="Childhood Days of Sri Ramakrishna" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Childhood Days of Sri Ramakrishna</p>
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
            <img src="/pics/nature.jpg" alt="Gadai's Love for Nature" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Gadai's Love for Nature</p>
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
            <img src="/pics/shiva.jpg" alt="Gadai Playing Shiva" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Gadai Playing Shiva</p>
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
            <img src="/pics/rani.jpg" alt="Rāni Rāsmani and Sri Rāmakrishna" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">Rāni Rāsmani and Sri Rāmakrishna</p>
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
            <img src="/pics/muslim.jpg" alt="The Muslim Way to God" class="mx-auto rounded-lg shadow-md max-w-md w-full" />
            <p class="text-sm text-gray-600 mt-2 italic">The Muslim Way to God</p>
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
        description: 'Learn about the oldest and most special holy books of Hinduism',
        content: `
          <h2>The Vedas - Our Oldest Holy Books</h2>
          <p>The <strong>Vedas</strong> are the oldest and most important holy books of Hinduism. The word "Veda" means <strong>"knowledge"</strong> - especially knowledge about God!</p>
          <p>These books are so old that nobody knows exactly when they were written. They are thousands and thousands of years old!</p>

          <h3>How Did We Get the Vedas?</h3>
          <p>Long, long ago, there were very wise and holy people called <strong>Rishis</strong> (sages). These Rishis spent many years praying and meditating.</p>
          <p>During their deep prayers, God's wisdom came to them - it was like hearing a beautiful truth in their hearts. They wrote down what they learned so that everyone could benefit from this wisdom.</p>
          <p>That's how we got the Vedas!</p>

          <h3>The Four Vedas</h3>
          <p>There are <strong>four Vedas</strong>. Think of them like four special treasure boxes, each holding different kinds of wisdom:</p>
          <ul>
            <li><strong>Rig Veda:</strong> Contains beautiful songs and prayers to praise God</li>
            <li><strong>Yajur Veda:</strong> Teaches how to perform worship ceremonies</li>
            <li><strong>Sama Veda:</strong> Contains melodies and songs for worship - like a holy songbook!</li>
            <li><strong>Atharva Veda:</strong> Has prayers for everyday life and wise teachings</li>
          </ul>

          <h3>What Do the Vedas Teach Us?</h3>
          <p>The Vedas teach us many wonderful things. Here are some beautiful messages:</p>

          <h4>Be Kind to Everyone</h4>
          <p>The Vedas say: "Live peacefully with everyone. Treat each other with love and kindness, just like a mother cow loves her baby calf."</p>
          <p><em>This means we should be gentle and caring with everyone!</em></p>

          <h4>God is One</h4>
          <p>The Vedas teach: "God is one, but people call God by many different names."</p>
          <p><em>This means that even though people may worship in different ways, they are all praying to the same God!</em></p>

          <h4>Think Good Thoughts</h4>
          <p>The Vedas say: "May good thoughts come to us from everywhere."</p>
          <p><em>This means we should always try to think positive, kind thoughts!</em></p>

          <h3>Why Are the Vedas Important?</h3>
          <p>The Vedas are like a guidebook for living a good life. They teach us:</p>
          <ul>
            <li>How to be good and kind</li>
            <li>How to pray and connect with God</li>
            <li>How to live happily with others</li>
            <li>The difference between right and wrong</li>
          </ul>
          <p>Millions of people around the world still read and learn from the Vedas today!</p>

          <h3>Key Things to Remember</h3>
          <ul>
            <li><strong>Veda</strong> means "knowledge" (about God)</li>
            <li>There are <strong>four Vedas</strong>: Rig, Yajur, Sama, and Atharva</li>
            <li>The Vedas were given to us by holy <strong>Rishis</strong></li>
            <li>They teach us to be <strong>kind, peaceful, and loving</strong></li>
            <li>The Vedas are <strong>thousands of years old</strong> but still help us today!</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              question: 'What does the word "Veda" mean?',
              answers: [
                'An old story',
                'Knowledge about God',
                'A type of food',
                'A musical instrument'
              ],
              correctAnswer: 1
            },
            {
              question: 'How many Vedas are there?',
              answers: [
                'Two',
                'Three',
                'Four',
                'Five'
              ],
              correctAnswer: 2
            },
            {
              question: 'Who received the wisdom of the Vedas?',
              answers: [
                'Kings',
                'Soldiers',
                'Holy Rishis (sages)',
                'Children'
              ],
              correctAnswer: 2
            },
            {
              question: 'Which Veda is like a holy songbook with melodies?',
              answers: [
                'Rig Veda',
                'Yajur Veda',
                'Sama Veda',
                'Atharva Veda'
              ],
              correctAnswer: 2
            },
            {
              question: 'What do the Vedas teach about how we should treat each other?',
              answers: [
                'Be mean to others',
                'Ignore everyone',
                'Be loving and kind',
                'Only help yourself'
              ],
              correctAnswer: 2
            },
            {
              question: 'What do the Vedas say about God?',
              answers: [
                'There is no God',
                'God is one, but has many names',
                'There are many different Gods',
                'God does not care about us'
              ],
              correctAnswer: 1
            },
            {
              question: 'Are the Vedas old or new?',
              answers: [
                'They were written last year',
                'They are 100 years old',
                'They are thousands of years old',
                'They were written yesterday'
              ],
              correctAnswer: 2
            },
            {
              question: 'What kind of thoughts should we have according to the Vedas?',
              answers: [
                'Angry thoughts',
                'Sad thoughts',
                'Good thoughts',
                'No thoughts'
              ],
              correctAnswer: 2
            },
            {
              question: 'Which Veda has prayers for everyday life?',
              answers: [
                'Rig Veda',
                'Yajur Veda',
                'Sama Veda',
                'Atharva Veda'
              ],
              correctAnswer: 3
            },
            {
              question: 'What do the Vedas help us learn?',
              answers: [
                'How to be mean',
                'How to be good and kind',
                'How to be lazy',
                'How to be angry'
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: 'bhagavad-gita-message',
        title: 'The Message of the Bhagavad Gita',
        description: 'Learn the beautiful lessons Lord Krishna taught Arjuna',
        content: `
          <h2>What is the Bhagavad Gita?</h2>
          <p>The <strong>Bhagavad Gita</strong> is one of the most special and loved books in Hinduism. It means "The Song of God."</p>
          <p>In this holy book, <strong>Lord Krishna</strong> teaches his friend <strong>Arjuna</strong> how to live a good life and how to be close to God.</p>
          <p>Let's learn some of Krishna's beautiful teachings!</p>

          <h3>1. God Loves Everyone's Prayers</h3>
          <p>Krishna says that God is happy when we pray in any way we like. Whether you pray by singing, by being quiet, or by doing good things - God hears you!</p>
          <p><strong>What this means for you:</strong> You can pray in your own special way, and God will listen!</p>

          <h3>2. Do Everything for God</h3>
          <p>Krishna teaches: "Whatever you do - eating, playing, studying, helping - think of it as a gift to God."</p>
          <p>Imagine giving your whole day to God, like a big present! When you eat, thank God for the food. When you play, be kind because that makes God happy.</p>
          <p><strong>What this means for you:</strong> Everything you do can become special when you do it thinking of God!</p>

          <h3>3. Simple Gifts Are Beautiful</h3>
          <p>Krishna says: "If someone gives me just a leaf, a flower, a fruit, or even a little water with love - I happily accept it!"</p>
          <p>This means God doesn't want expensive things. God wants your love! Even a small flower given with a loving heart makes God very happy.</p>
          <p><strong>What this means for you:</strong> You don't need to give big things to God. A prayer from your heart is the best gift!</p>

          <h3>4. God is Everywhere</h3>
          <p>Krishna teaches: "When you see Me in everyone and everywhere, you will never feel alone. I will always be with you!"</p>
          <p>This means God is in your family, in your friends, in animals, in trees, in the sun, and even in you! God is everywhere.</p>
          <p><strong>What this means for you:</strong> When you are kind to others, you are being kind to God who lives in everyone!</p>

          <h3>How to Use These Teachings Every Day</h3>
          <ul>
            <li><strong>Morning:</strong> Say "Good morning, God!" when you wake up</li>
            <li><strong>Eating:</strong> Thank God for your food before eating</li>
            <li><strong>At school:</strong> Do your best work as a gift to God</li>
            <li><strong>With friends:</strong> Be kind because God is in everyone</li>
            <li><strong>At night:</strong> Thank God for the day before sleeping</li>
          </ul>

          <h3>Key Things to Remember</h3>
          <ul>
            <li>The <strong>Bhagavad Gita</strong> means "The Song of God"</li>
            <li><strong>Lord Krishna</strong> teaches Arjuna in this holy book</li>
            <li>God loves <strong>all prayers</strong>, big or small</li>
            <li>Everything we do can be a <strong>gift to God</strong></li>
            <li>Simple things given with <strong>love</strong> are precious to God</li>
            <li>God is <strong>everywhere and in everyone</strong></li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              question: 'What does "Bhagavad Gita" mean?',
              answers: [
                'The Song of God',
                'A type of prayer',
                'A temple name',
                'A festival'
              ],
              correctAnswer: 0
            },
            {
              question: 'Who teaches in the Bhagavad Gita?',
              answers: [
                'Arjuna',
                'Lord Krishna',
                'A king',
                'A teacher at school'
              ],
              correctAnswer: 1
            },
            {
              question: 'What simple things does God happily accept?',
              answers: [
                'Gold and jewels',
                'A leaf, flower, fruit, or water given with love',
                'Only expensive things',
                'Nothing at all'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is most important when we give something to God?',
              answers: [
                'How expensive it is',
                'How big it is',
                'The love in our heart',
                'Where we give it'
              ],
              correctAnswer: 2
            },
            {
              question: 'Where is God according to Krishna\'s teaching?',
              answers: [
                'Only in the temple',
                'Only in the sky',
                'Everywhere and in everyone',
                'Nowhere'
              ],
              correctAnswer: 2
            },
            {
              question: 'How can you make your homework special?',
              answers: [
                'Not do it',
                'Do it thinking of it as a gift to God',
                'Rush through it',
                'Let someone else do it'
              ],
              correctAnswer: 1
            },
            {
              question: 'Why should we be kind to others?',
              answers: [
                'So they give us things',
                'Because God is in everyone',
                'Only if they are kind first',
                'We should not be kind'
              ],
              correctAnswer: 1
            },
            {
              question: 'What happens when we remember God is everywhere?',
              answers: [
                'We feel scared',
                'We never feel alone',
                'We forget everything',
                'Nothing happens'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is a good way to start your morning according to these teachings?',
              answers: [
                'Stay in bed',
                'Say "Good morning, God!"',
                'Watch TV',
                'Be grumpy'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who was Krishna teaching in the Bhagavad Gita?',
              answers: [
                'His mother',
                'His friend Arjuna',
                'A stranger',
                'A bird'
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: 'mahabharata-story',
        title: 'The Mahabharata',
        description: 'The exciting story of the Pandavas and Kauravas - the longest poem ever written!',
        content: `
          <h2>The Mahabharata - An Amazing Story!</h2>
          <p>The <strong>Mahabharata</strong> is one of the greatest stories ever told! It is about two families - the <strong>Pandavas</strong> and the <strong>Kauravas</strong> - and their struggle over a kingdom.</p>
          <p>This story is SO long that it is the <strong>longest poem ever written</strong> in the whole world!</p>

          <h3>The Two Families</h3>
          <p>Long ago, there was a king named <strong>Dhritarashtra</strong>. He was blind from birth, but he was still the king. He had 100 sons! They were called the <strong>Kauravas</strong>. The oldest one was named <strong>Duryodhana</strong>.</p>
          <p>The king had a brother named <strong>Pandu</strong>. Pandu had 5 sons. They were called the <strong>Pandavas</strong>.</p>

          <h3>Meet the Five Pandava Brothers!</h3>
          <ul>
            <li><strong>Yudhishthira</strong> - The oldest. He ALWAYS told the truth!</li>
            <li><strong>Bhima</strong> - Super strong! The strongest of them all.</li>
            <li><strong>Arjuna</strong> - The best archer in the world! He could shoot arrows better than anyone.</li>
            <li><strong>Nakula and Sahadeva</strong> - The twin brothers. They were very wise and helpful.</li>
          </ul>

          <h3>The Problem Begins</h3>
          <p>Sadly, the 100 Kaurava brothers were jealous of their 5 Pandava cousins. Duryodhana wanted the whole kingdom for himself. He didn't want to share anything with the Pandavas.</p>

          <h3>The Cheating Game</h3>
          <p>Duryodhana came up with a tricky plan. He invited the Pandavas to play a <strong>dice game</strong> (like a board game with special dice).</p>
          <p>But the Kauravas <strong>cheated</strong>! They won the game by being unfair. Because they lost, the Pandavas had to leave their home and live in the forest for many years.</p>

          <h3>The Pandavas Come Back</h3>
          <p>After living in the forest for a long time, the Pandavas came back and asked for their kingdom.</p>
          <p>"Please give us our fair share," they said.</p>
          <p>But Duryodhana said, "No! I won't give you anything. Not even land the size of a needle!"</p>
          <p>This was very unfair. So a big war had to happen.</p>

          <h3>Lord Krishna Helps</h3>
          <p><strong>Lord Krishna</strong> was a friend of the Pandavas. He knew they were good and honest. During the war, Krishna became Arjuna's chariot driver. He didn't fight himself, but he guided Arjuna.</p>
          <p>Before the war started, Arjuna was scared and sad. "I don't want to fight my own family," he said.</p>
          <p>That's when Lord Krishna gave him special teachings called the <strong>Bhagavad Gita</strong>. These teachings helped Arjuna understand what was right.</p>

          <h3>Good Wins Over Bad</h3>
          <p>The great war was fought at a place called <strong>Kurukshetra</strong>. After many days of fighting, the <strong>Pandavas won</strong>!</p>
          <p>This story teaches us that <strong>good always wins over bad</strong> in the end. Being truthful, kind, and fair is always the right way.</p>

          <h3>Key Things to Remember</h3>
          <ul>
            <li><strong>Mahabharata</strong> = The longest poem in the world</li>
            <li><strong>Pandavas</strong> = 5 good brothers</li>
            <li><strong>Kauravas</strong> = 100 brothers who were jealous</li>
            <li><strong>Lord Krishna</strong> helped the Pandavas</li>
            <li>The <strong>Bhagavad Gita</strong> comes from this story</li>
            <li><strong>Good wins over bad</strong> in the end!</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              question: 'How many Pandava brothers were there?',
              answers: [
                'Three',
                'Five',
                'Ten',
                'One hundred'
              ],
              correctAnswer: 1
            },
            {
              question: 'How many Kaurava brothers were there?',
              answers: [
                'Five',
                'Fifty',
                'One hundred',
                'Two'
              ],
              correctAnswer: 2
            },
            {
              question: 'Which Pandava was the best archer?',
              answers: [
                'Yudhishthira',
                'Bhima',
                'Arjuna',
                'Nakula'
              ],
              correctAnswer: 2
            },
            {
              question: 'Which Pandava was super strong?',
              answers: [
                'Yudhishthira',
                'Bhima',
                'Arjuna',
                'Sahadeva'
              ],
              correctAnswer: 1
            },
            {
              question: 'How did the Kauravas trick the Pandavas?',
              answers: [
                'They ran away',
                'They cheated in a dice game',
                'They hid their food',
                'They told them stories'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who helped the Pandavas in the war?',
              answers: [
                'Duryodhana',
                'Lord Krishna',
                'The Kauravas',
                'A wizard'
              ],
              correctAnswer: 1
            },
            {
              question: 'What did Lord Krishna teach Arjuna before the war?',
              answers: [
                'How to cook',
                'The Bhagavad Gita',
                'How to dance',
                'How to sleep'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who won the great war?',
              answers: [
                'The Kauravas',
                'The Pandavas',
                'Nobody',
                'The animals'
              ],
              correctAnswer: 1
            },
            {
              question: 'What does the Mahabharata teach us?',
              answers: [
                'Cheating is good',
                'Being mean is fun',
                'Good wins over bad',
                'Fighting is always right'
              ],
              correctAnswer: 2
            },
            {
              question: 'What is special about the Mahabharata?',
              answers: [
                'It is the shortest story',
                'It is the longest poem ever written',
                'It was written yesterday',
                'It has no characters'
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: 'ramayana-story',
        title: 'The Ramayana',
        description: 'The beautiful story of Rama, Sita, and their adventures',
        content: `
          <h2>The Ramayana - A Beautiful Story</h2>
          <p>The <strong>Ramayana</strong> is one of the most loved stories in India! It tells the story of a prince named <strong>Rama</strong>, his wife <strong>Sita</strong>, and their amazing adventures.</p>
          <p>This story was written long ago by <strong>Sage Valmiki</strong>. It teaches us how to be good, brave, and kind.</p>

          <h3>The Royal Family</h3>
          <p><strong>King Dasaratha</strong> ruled a kingdom called Kosala. His city was called <strong>Ayodhya</strong>. The king was very kind and everyone loved him.</p>
          <p>King Dasaratha wanted children very much. He prayed and prayed. Finally, God blessed him with <strong>four sons</strong>!</p>

          <h3>Meet the Four Brothers!</h3>
          <ul>
            <li><strong>Rama</strong> - The oldest son. He was very good and truthful!</li>
            <li><strong>Bharata</strong> - A loving brother who cared for everyone</li>
            <li><strong>Lakshmana</strong> - Rama's best friend and helper</li>
            <li><strong>Shatrughna</strong> - The youngest brother</li>
          </ul>
          <p>All four brothers loved each other very much!</p>

          <h3>What Made Rama Special?</h3>
          <p>Rama had many wonderful qualities:</p>
          <ul>
            <li><strong>Truthful</strong> - He always told the truth, no matter what</li>
            <li><strong>Brave</strong> - He was never afraid to do the right thing</li>
            <li><strong>Kind</strong> - He was gentle and caring to everyone</li>
            <li><strong>Obedient</strong> - He always listened to his parents and teachers</li>
            <li><strong>Loving</strong> - Everyone who met him loved him!</li>
          </ul>

          <h3>Princess Sita</h3>
          <p>When Rama grew up, he married a beautiful princess named <strong>Sita</strong>. Sita was kind, good, and everyone loved her too!</p>
          <p>Rama and Sita loved each other very much. They were always there for each other.</p>

          <h3>The Adventure in the Forest</h3>
          <p>Rama, Sita, and brother Lakshmana went to live in the forest for <strong>14 years</strong>. Even though it was hard, they stayed happy and helped many people.</p>
          <p>During their time in the forest, they had many adventures. They met <strong>Hanuman</strong>, the brave monkey god who became Rama's best friend and helper!</p>
          <p>Rama and Lakshmana also protected good people from bad demons who were troubling them.</p>

          <h3>What the Ramayana Teaches Us</h3>
          <p>This beautiful story teaches us many things:</p>
          <ul>
            <li>Always tell the truth</li>
            <li>Be brave and kind</li>
            <li>Love your family</li>
            <li>Help people who need help</li>
            <li>Good always wins over bad!</li>
          </ul>

          <h3>Key Things to Remember</h3>
          <ul>
            <li><strong>Ramayana</strong> = Story of Rama</li>
            <li><strong>Sage Valmiki</strong> wrote the Ramayana</li>
            <li><strong>Ayodhya</strong> = Rama's home city</li>
            <li><strong>Hanuman</strong> = Rama's brave friend</li>
            <li>Rama was <strong>truthful, brave, and kind</strong></li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              question: 'Who was the oldest of the four brothers?',
              answers: [
                'Bharata',
                'Rama',
                'Lakshmana',
                'Shatrughna'
              ],
              correctAnswer: 1
            },
            {
              question: 'What was the name of Rama\'s city?',
              answers: [
                'Mumbai',
                'Delhi',
                'Ayodhya',
                'Chennai'
              ],
              correctAnswer: 2
            },
            {
              question: 'How many brothers did Rama have?',
              answers: [
                'One',
                'Two',
                'Three',
                'Four'
              ],
              correctAnswer: 2
            },
            {
              question: 'What is the name of Rama\'s wife?',
              answers: [
                'Sita',
                'Radha',
                'Lakshmi',
                'Parvati'
              ],
              correctAnswer: 0
            },
            {
              question: 'Who was Rama\'s brave monkey friend?',
              answers: [
                'Bhima',
                'Arjuna',
                'Hanuman',
                'Krishna'
              ],
              correctAnswer: 2
            },
            {
              question: 'Which of these was true about Rama?',
              answers: [
                'He told lies',
                'He was mean',
                'He was always truthful and kind',
                'He was lazy'
              ],
              correctAnswer: 2
            },
            {
              question: 'Who wrote the Ramayana?',
              answers: [
                'Sage Valmiki',
                'Sage Vyasa',
                'Lord Krishna',
                'King Dasaratha'
              ],
              correctAnswer: 0
            },
            {
              question: 'How many years did Rama, Sita, and Lakshmana live in the forest?',
              answers: [
                '4 years',
                '10 years',
                '14 years',
                '20 years'
              ],
              correctAnswer: 2
            },
            {
              question: 'What does the Ramayana teach us?',
              answers: [
                'Be mean to others',
                'Always tell the truth and be kind',
                'Don\'t help anyone',
                'Be lazy'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who was Rama\'s father?',
              answers: [
                'King Janaka',
                'King Dasaratha',
                'King Bharata',
                'King Hanuman'
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: 'sita-marriage',
        title: 'Sita\'s Marriage',
        description: 'The exciting story of how Sita and Rama got married',
        content: `
          <h2>How Sita and Rama Got Married</h2>
          <p>This is one of the most exciting stories from the Ramayana! Let's learn how <strong>Prince Rama</strong> and <strong>Princess Sita</strong> met and got married.</p>

          <h3>Where Did Sita Come From?</h3>
          <p>There was a kind king named <strong>King Janaka</strong>. He ruled a place called Mithila.</p>
          <p>One day, King Janaka was ploughing his field. Suddenly, he found a beautiful baby girl in the earth! He was so happy. He took the baby home and raised her as his own daughter.</p>
          <p>He named her <strong>Sita</strong>, which means "from the earth." She was also called <strong>Janaki</strong> because she was King Janaka's daughter.</p>

          <h3>Sita Grows Up</h3>
          <p>Sita grew up to be a wonderful princess. She was:</p>
          <ul>
            <li><strong>Beautiful</strong> - Everyone said she was lovely</li>
            <li><strong>Kind</strong> - She was nice to everyone</li>
            <li><strong>Smart</strong> - She was very intelligent</li>
            <li><strong>Good</strong> - She always did the right thing</li>
          </ul>
          <p>King Janaka loved her very much!</p>

          <h3>The Big Challenge</h3>
          <p>When Sita was old enough to get married, King Janaka thought, "I want to find the best husband for my daughter. He must be very special!"</p>
          <p>The king had a very special bow. It was given to him by <strong>Lord Shiva</strong>. This bow was SO big and SO heavy that even <strong>100 strong men</strong> couldn't lift it!</p>
          <p>King Janaka announced: <em>"The prince who can lift this bow and string it can marry my daughter Sita!"</em></p>

          <h3>Many Princes Try</h3>
          <p>Princes came from everywhere to try to lift the bow. They wanted to marry the beautiful Princess Sita.</p>
          <p>One by one, they tried. But not one prince could even move the heavy bow! Even the evil king Ravana (who had TEN heads!) tried, but he couldn't lift it either.</p>
          <p>Everyone wondered, "Who will be strong enough?"</p>

          <h3>Rama Arrives!</h3>
          <p>Then Prince <strong>Rama</strong> came to Mithila with his brother <strong>Lakshmana</strong> and a wise sage named <strong>Vishwamitra</strong>.</p>
          <p>Sage Vishwamitra said, "Rama, why don't you try to lift the bow?"</p>

          <h3>The Amazing Moment!</h3>
          <p>Rama walked up to the heavy bow. He picked it up <strong>as if it was as light as a flower</strong>!</p>
          <p>Everyone gasped in surprise!</p>
          <p>Then Rama bent the bow to put the string on it. The bow was so heavy, but Rama bent it so hard that it <strong>BROKE</strong> with a big CRASH!</p>
          <p>The sound was like thunder in the sky. Everyone cheered! They had found the perfect husband for Sita!</p>

          <h3>The Happy Wedding</h3>
          <p>King Janaka was overjoyed! He knew Rama was the perfect person for his daughter.</p>
          <p>Rama and Sita got married in a beautiful ceremony. Everyone was happy and celebrated!</p>
          <p>Sita and Rama loved each other very much. They were perfect for each other!</p>

          <h3>Key Things to Remember</h3>
          <ul>
            <li><strong>Sita</strong> was found by King Janaka in the earth</li>
            <li>The special <strong>bow was from Lord Shiva</strong></li>
            <li>Many princes tried but <strong>couldn't lift the bow</strong></li>
            <li><strong>Rama</strong> lifted it easily and broke it!</li>
            <li>Rama and Sita got married and were very happy</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              question: 'Who found baby Sita?',
              answers: [
                'King Rama',
                'King Janaka',
                'King Ravana',
                'Sage Vishwamitra'
              ],
              correctAnswer: 1
            },
            {
              question: 'Where was Sita found?',
              answers: [
                'In a river',
                'In a tree',
                'In the earth while ploughing',
                'In a palace'
              ],
              correctAnswer: 2
            },
            {
              question: 'What does the name "Sita" mean?',
              answers: [
                'Star',
                'From the earth',
                'Beautiful',
                'Princess'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who gave the special bow to King Janaka?',
              answers: [
                'Lord Vishnu',
                'Lord Brahma',
                'Lord Shiva',
                'Sage Vishwamitra'
              ],
              correctAnswer: 2
            },
            {
              question: 'What was the challenge to marry Sita?',
              answers: [
                'Win a race',
                'Lift and string Lord Shiva\'s bow',
                'Solve a puzzle',
                'Sing a song'
              ],
              correctAnswer: 1
            },
            {
              question: 'Could any of the other princes lift the bow?',
              answers: [
                'Yes, many could',
                'Only Ravana could',
                'No, nobody could lift it',
                'Everyone could lift it'
              ],
              correctAnswer: 2
            },
            {
              question: 'What happened when Rama picked up the bow?',
              answers: [
                'He couldn\'t lift it',
                'He lifted it easily like it was light as a flower',
                'He dropped it',
                'He ran away'
              ],
              correctAnswer: 1
            },
            {
              question: 'What happened to the bow when Rama bent it?',
              answers: [
                'Nothing',
                'It broke with a big crash',
                'It flew away',
                'It became bigger'
              ],
              correctAnswer: 1
            },
            {
              question: 'How did King Janaka feel when Rama won?',
              answers: [
                'Sad',
                'Angry',
                'Overjoyed and happy',
                'Scared'
              ],
              correctAnswer: 2
            },
            {
              question: 'Who came with Rama to Mithila?',
              answers: [
                'Lakshmana and Sage Vishwamitra',
                'Hanuman',
                'King Dasaratha',
                'Sita'
              ],
              correctAnswer: 0
            }
          ]
        }
      },
      {
        id: 'upanishads',
        title: 'The Upanishads',
        description: 'Learn about the special teachings that tell us about God and ourselves',
        content: `
          <h2>The Upanishads - Special Teachings About God</h2>
          <p>The <strong>Upanishads</strong> are very special books that teach us the most important things about God and ourselves.</p>
          <p>They are part of the Vedas (our oldest holy books) and contain the deepest wisdom!</p>

          <h3>What Does "Upanishad" Mean?</h3>
          <p>The word <strong>Upanishad</strong> means <strong>"sitting close"</strong> to a teacher.</p>
          <p>Imagine sitting close to a very wise teacher who tells you the most important secrets about God. That's what the Upanishads are like!</p>
          <p>Long ago, students would sit near their teachers and listen carefully to learn these special teachings.</p>

          <h3>How Many Upanishads Are There?</h3>
          <p>There are many Upanishads, but we study <strong>10 main ones</strong>. These ten have the most important lessons!</p>

          <h3>What Do the Upanishads Teach Us?</h3>
          <p>The Upanishads teach us four very important things about God:</p>

          <h4>1. God is Everywhere!</h4>
          <p>God fills the whole universe - the sky, the earth, the stars, and everything! There is no place where God is not.</p>
          <p><em>Think of it like air - air is everywhere around us, even though we can't see it. God is like that too!</em></p>

          <h4>2. God is in Everyone!</h4>
          <p>God lives inside every person, every animal, every plant - inside everything that lives! When you look at your friend, your pet, or a flower, God is there.</p>
          <p><em>This is why we should be kind to everyone - because God is in everyone!</em></p>

          <h4>3. We Are All Connected to God!</h4>
          <p>Deep inside, we are all part of God. It's like how drops of water are part of the ocean. We may look separate, but we are all connected!</p>
          <p><em>This is the most special secret of the Upanishads!</em></p>

          <h4>4. God is Amazing!</h4>
          <p>God is:</p>
          <ul>
            <li><strong>Always alive</strong> - God never dies</li>
            <li><strong>Always knowing</strong> - God knows everything</li>
            <li><strong>Always happy</strong> - God is full of joy</li>
            <li><strong>Forever and ever</strong> - God has no beginning and no end</li>
          </ul>

          <h3>Why Are These Teachings Important?</h3>
          <p>When we understand these teachings, we learn:</p>
          <ul>
            <li>To love and respect everyone (because God is in everyone)</li>
            <li>To feel safe (because God is always with us)</li>
            <li>To be kind (because we are all connected)</li>
            <li>To feel happy (because we are part of something wonderful!)</li>
          </ul>

          <h3>Key Things to Remember</h3>
          <ul>
            <li><strong>Upanishads</strong> = Special teachings about God</li>
            <li><strong>Upanishad means</strong> = "Sitting close" to a teacher</li>
            <li>We study <strong>10 main Upanishads</strong></li>
            <li><strong>God is everywhere</strong> and in everyone!</li>
            <li><strong>We are all connected</strong> to God</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              question: 'What does the word "Upanishad" mean?',
              answers: [
                'A big book',
                'Sitting close to a teacher',
                'A type of food',
                'A song'
              ],
              correctAnswer: 1
            },
            {
              question: 'How many main Upanishads do we study?',
              answers: [
                'Five',
                'Ten',
                'Twenty',
                'One hundred'
              ],
              correctAnswer: 1
            },
            {
              question: 'According to the Upanishads, where is God?',
              answers: [
                'Only in the sky',
                'Only in temples',
                'Everywhere!',
                'Nowhere'
              ],
              correctAnswer: 2
            },
            {
              question: 'According to the Upanishads, who has God inside them?',
              answers: [
                'Only good people',
                'Only adults',
                'Only teachers',
                'Everyone and everything!'
              ],
              correctAnswer: 3
            },
            {
              question: 'What do the Upanishads say about us and God?',
              answers: [
                'We are far from God',
                'We are all connected to God',
                'God doesn\'t know us',
                'We should be afraid of God'
              ],
              correctAnswer: 1
            },
            {
              question: 'Why should we be kind to everyone?',
              answers: [
                'To get gifts',
                'Because God is in everyone',
                'Because we have to',
                'Only on special days'
              ],
              correctAnswer: 1
            },
            {
              question: 'Does God ever die?',
              answers: [
                'Yes, sometimes',
                'No, God is always alive',
                'Maybe',
                'God sleeps'
              ],
              correctAnswer: 1
            },
            {
              question: 'How did students learn the Upanishads long ago?',
              answers: [
                'From the internet',
                'By sitting close to their teachers',
                'From TV',
                'By reading alone'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is God like according to the Upanishads?',
              answers: [
                'Angry and scary',
                'All-knowing and always happy',
                'Far away and quiet',
                'Sleeping all the time'
              ],
              correctAnswer: 1
            },
            {
              question: 'The Upanishads are part of which holy books?',
              answers: [
                'The Ramayana',
                'The Mahabharata',
                'The Vedas',
                'The Bhagavad Gita'
              ],
              correctAnswer: 2
            }
          ]
        }
      }
    ]
  },
  {
    topicId: 'practices',
    topicName: 'Hindu Practices / Moral Stories/ Festivals',
    lessons: [
      {
        id: 'meditation',
        title: 'Meditation',
        description: 'Learn how to be quiet and think about God - it makes you feel peaceful!',
        content: `
          <h2>Meditation - Being Quiet with God</h2>
          <p><strong>Meditation</strong> is when we sit quietly and think about God. It helps us feel calm, peaceful, and happy inside!</p>
          <p>Think of it like this: just like your body needs food to be strong, your mind and heart need quiet time with God to be peaceful.</p>

          <h3>What is Meditation?</h3>
          <p>Meditation is NOT just sitting with your eyes closed!</p>
          <p>Real meditation means <strong>thinking about God</strong> with a calm, focused mind. It's like having a quiet conversation with God in your heart.</p>

          <h3>How to Meditate - Easy Steps!</h3>
          <p>Here's how you can meditate:</p>

          <h4>Step 1: Find a Quiet Spot</h4>
          <p>Find a place where you won't be disturbed. It could be your room, a prayer corner, or any quiet place.</p>

          <h4>Step 2: Sit Comfortably</h4>
          <p>Sit on the floor with your legs crossed, or on a chair. Keep your back straight but relaxed - like a tall tree!</p>

          <h4>Step 3: Close Your Eyes</h4>
          <p>Gently close your eyes. This helps you focus on what's inside rather than what's around you.</p>

          <h4>Step 4: Relax!</h4>
          <p>Take a few deep breaths. Let go of all worries. Pretend you're putting your worries in a box and closing the lid!</p>

          <h4>Step 5: Think of God</h4>
          <p>Now, think of God in your heart. You can imagine:</p>
          <ul>
            <li>Lord Krishna with his beautiful smile</li>
            <li>Lord Rama looking kind and brave</li>
            <li>Lord Shiva sitting peacefully</li>
            <li>The Divine Mother blessing you</li>
            <li>A bright, warm light in your heart</li>
          </ul>
          <p>Pick whoever makes you feel most loved!</p>

          <h4>Step 6: Say God's Name (Optional)</h4>
          <p>While thinking of God, you can softly repeat God's name in your mind. Like "Om", "Rama", "Krishna", or any name you love. This is called a <strong>mantra</strong>.</p>

          <h3>My Mind Won't Stay Still!</h3>
          <p>Don't worry - everyone's mind wanders! Even grown-ups! Your mind might think about:</p>
          <ul>
            <li>"What's for lunch?"</li>
            <li>"I want to play!"</li>
            <li>"Did I do my homework?"</li>
          </ul>
          <p>That's okay! When this happens, <strong>just gently bring your mind back to God</strong>. It's like training a puppy - you have to keep bringing it back gently!</p>

          <h3>When Should You Meditate?</h3>
          <p>Try to meditate:</p>
          <ul>
            <li><strong>Morning:</strong> Right after you wake up - start your day with God!</li>
            <li><strong>Evening:</strong> Before bed - end your day feeling peaceful</li>
          </ul>
          <p>Even 5 minutes is great when you're starting!</p>

          <h3>What Happens When You Meditate?</h3>
          <p>If you meditate regularly, you'll notice some wonderful things:</p>
          <ul>
            <li>You feel <strong>more peaceful</strong> inside</li>
            <li>You feel <strong>less worried</strong> about things</li>
            <li>You feel <strong>closer to God</strong></li>
            <li>You become <strong>kinder</strong> to others</li>
            <li>You can <strong>focus better</strong> at school!</li>
          </ul>

          <h3>Key Things to Remember</h3>
          <ul>
            <li><strong>Meditation</strong> = Thinking about God quietly</li>
            <li>Sit <strong>comfortably</strong> with a straight back</li>
            <li><strong>Close your eyes</strong> and relax</li>
            <li>When your mind wanders, <strong>gently bring it back</strong></li>
            <li>Practice <strong>every day</strong> for best results!</li>
            <li>Even <strong>5 minutes</strong> is helpful!</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              question: 'What is meditation?',
              answers: [
                'Watching TV quietly',
                'Thinking about God quietly',
                'Sleeping',
                'Running around'
              ],
              correctAnswer: 1
            },
            {
              question: 'How should you sit during meditation?',
              answers: [
                'Lying down flat',
                'Standing on one foot',
                'Comfortably with your back straight',
                'Jumping up and down'
              ],
              correctAnswer: 2
            },
            {
              question: 'What should you do when you meditate?',
              answers: [
                'Keep your eyes open',
                'Close your eyes and think of God',
                'Talk loudly',
                'Think about toys'
              ],
              correctAnswer: 1
            },
            {
              question: 'What should you do when your mind wanders?',
              answers: [
                'Stop meditating and give up',
                'Get angry',
                'Gently bring your mind back to God',
                'Fall asleep'
              ],
              correctAnswer: 2
            },
            {
              question: 'When is a good time to meditate?',
              answers: [
                'Only on your birthday',
                'Morning and evening',
                'Never',
                'Only when it rains'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is a mantra?',
              answers: [
                'A type of food',
                'God\'s name that you repeat in meditation',
                'A game',
                'A book'
              ],
              correctAnswer: 1
            },
            {
              question: 'Is it okay if your mind wanders during meditation?',
              answers: [
                'No, you failed',
                'Yes! Just gently bring it back',
                'You should never try again',
                'Only adults can meditate'
              ],
              correctAnswer: 1
            },
            {
              question: 'How does meditation help you?',
              answers: [
                'It makes you tired',
                'It makes you feel peaceful and closer to God',
                'It makes you hungry',
                'It does nothing'
              ],
              correctAnswer: 1
            },
            {
              question: 'How long should beginners meditate?',
              answers: [
                '5 hours',
                'All day',
                'Even 5 minutes is helpful!',
                'No time at all'
              ],
              correctAnswer: 2
            },
            {
              question: 'Where in your body do you imagine God during meditation?',
              answers: [
                'In your foot',
                'In your heart',
                'In your elbow',
                'Outside your body'
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
        description: 'Learn how to talk to God and feel close to Him',
        content: `
          <h2>Prayer - Talking to God</h2>
          <p><strong>Prayer</strong> is when we talk to God and remember Him. It's like having a conversation with your best friend - except this friend is always with you and loves you more than anyone!</p>

          <h3>Why Do We Pray?</h3>
          <p>We pray because:</p>
          <ul>
            <li>It helps us feel <strong>close to God</strong></li>
            <li>It makes us feel <strong>peaceful and happy</strong></li>
            <li>We can <strong>thank God</strong> for all the good things</li>
            <li>We can ask for <strong>help and blessings</strong></li>
          </ul>

          <h3>Three Ways to Pray</h3>

          <h4>Way 1: Pray to Your Favorite Form of God</h4>
          <p>You can pray to the form of God you love most:</p>
          <ul>
            <li><strong>Lord Rama</strong> - the brave and kind prince</li>
            <li><strong>Lord Krishna</strong> - the playful and loving God</li>
            <li><strong>Lord Shiva</strong> - the peaceful and powerful God</li>
            <li><strong>Hanuman</strong> - the strong and devoted helper</li>
            <li><strong>Divine Mother</strong> - the loving mother of all</li>
          </ul>
          <p>Remember: All these are different forms of the <strong>same one God</strong>! It's like how water can be ice, liquid, or steam - but it's all water!</p>

          <h4>Way 2: See God in Everything!</h4>
          <p>God is everywhere! When you see:</p>
          <ul>
            <li>The <strong>sun shining</strong> - that's God's power!</li>
            <li><strong>Trees and flowers growing</strong> - that's God's magic!</li>
            <li><strong>Day and night</strong> coming - that's God's plan!</li>
            <li><strong>Love in your family</strong> - that's God's love!</li>
          </ul>
          <p>When you see God in everything, your prayers become extra special!</p>

          <h4>Way 3: Feel God Inside You!</h4>
          <p>This is the most powerful prayer! Know that:</p>
          <ul>
            <li>God's power is <strong>inside you</strong></li>
            <li>God helps you <strong>think, speak, and do</strong> good things</li>
            <li>You are <strong>connected to everything</strong> in the world</li>
          </ul>
          <p>When you feel this, you feel like you're part of one big, beautiful family with all of creation!</p>

          <h3>Does God Hear My Prayers?</h3>
          <p>Yes! Always! A great teacher named <strong>Sri Ramakrishna</strong> said:</p>
          <p><em>"God hears even the movement of tiny ants!"</em></p>
          <p>So even if you pray in a whisper, or just in your heart, God hears you!</p>

          <h3>A Beautiful Prayer to Learn</h3>
          <p>Here's a special prayer that Hindus have said for thousands of years:</p>
          <p><strong>In Sanskrit:</strong> "Asato ma sad gamaya, Tamaso ma jyotir gamaya, Mrityor ma amritam gamaya"</p>
          <p><strong>What it means:</strong></p>
          <ul>
            <li>"Lead me from <strong>wrong things to right things</strong>"</li>
            <li>"Lead me from <strong>darkness to light</strong>"</li>
            <li>"Lead me from <strong>fear to courage</strong>"</li>
          </ul>
          <p>This prayer asks God to help us become better people!</p>

          <h3>When Should You Pray?</h3>
          <ul>
            <li><strong>Every morning</strong> - start your day with God</li>
            <li><strong>Every evening</strong> - thank God for the day</li>
            <li><strong>Before meals</strong> - thank God for food</li>
            <li><strong>Anytime!</strong> - God is always listening</li>
          </ul>

          <h3>Key Things to Remember</h3>
          <ul>
            <li><strong>Prayer</strong> = Talking to God and remembering Him</li>
            <li>You can pray to <strong>any form of God</strong> you love</li>
            <li><strong>God is everywhere</strong> - in nature, in people, in you!</li>
            <li>God hears <strong>every prayer</strong>, even whispers</li>
            <li>Pray <strong>every day</strong> - morning and evening</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              question: 'What is prayer?',
              answers: [
                'Just sitting quietly',
                'Talking to God and remembering Him',
                'Reading a book',
                'Sleeping'
              ],
              correctAnswer: 1
            },
            {
              question: 'Are Rama, Krishna, and Shiva different Gods?',
              answers: [
                'Yes, they are completely different',
                'No, they are different forms of the same one God',
                'They don\'t exist',
                'Only Rama is God'
              ],
              correctAnswer: 1
            },
            {
              question: 'According to Sri Ramakrishna, what can God hear?',
              answers: [
                'Only loud prayers',
                'Only prayers in temples',
                'Even the movement of tiny ants',
                'Nothing at all'
              ],
              correctAnswer: 2
            },
            {
              question: 'What does "Lead me from darkness to light" mean?',
              answers: [
                'Turn on the lights',
                'Help me understand and learn',
                'Go outside',
                'Close my eyes'
              ],
              correctAnswer: 1
            },
            {
              question: 'Where is God according to this lesson?',
              answers: [
                'Only in temples',
                'Only in the sky',
                'Everywhere - in nature, people, and inside you!',
                'Nowhere'
              ],
              correctAnswer: 2
            },
            {
              question: 'When should you pray?',
              answers: [
                'Only on Sundays',
                'Only when you\'re sad',
                'Every morning and evening',
                'Never'
              ],
              correctAnswer: 2
            },
            {
              question: 'What makes prayers extra special?',
              answers: [
                'Praying very loudly',
                'Seeing God in everything around you',
                'Only praying in Sanskrit',
                'Praying only in temples'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is the most powerful type of prayer?',
              answers: [
                'Asking for toys',
                'Feeling God\'s power inside you',
                'Praying only when you need something',
                'Praying once a year'
              ],
              correctAnswer: 1
            },
            {
              question: 'Can you pray in a whisper?',
              answers: [
                'No, God won\'t hear',
                'Yes! God hears everything',
                'Only if you\'re in a temple',
                'Only adults can whisper prayers'
              ],
              correctAnswer: 1
            },
            {
              question: 'Why do we pray?',
              answers: [
                'Because we have to',
                'To feel close to God and peaceful',
                'To get presents',
                'Because it\'s boring'
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: 'pilgrimage',
        title: 'Pilgrimage - Visiting Temples',
        description: 'Learn how to visit temples and why it\'s special',
        content: `
          <h2>Visiting Temples - God's Special Home</h2>
          <p>A <strong>temple</strong> is like God's special home on Earth! When we visit a temple, we get to be close to God and feel His love and blessings.</p>

          <h3>Why Visit Temples?</h3>
          <ul>
            <li>To feel <strong>close to God</strong></li>
            <li>To pray and <strong>ask for blessings</strong></li>
            <li>To feel <strong>peaceful and happy</strong></li>
            <li>To <strong>thank God</strong> for all the good things</li>
          </ul>
          <p>Try to visit a temple as often as you can - every day if possible, or at least on special festival days!</p>

          <h3>How to Visit a Temple - 3 Important Things</h3>

          <h4>1. Be Clean and Neat</h4>
          <p>Before going to the temple:</p>
          <ul>
            <li>Take a bath or wash up</li>
            <li>Wear clean, nice clothes</li>
            <li>Look your best - you're visiting God!</li>
          </ul>
          <p><em>Think of it like visiting a king - you would want to look your best!</em></p>

          <h4>2. Think of God on the Way</h4>
          <p>While walking to the temple:</p>
          <ul>
            <li>Don't gossip or talk about random things</li>
            <li>Instead, say God's name softly: "Rama, Rama" or "Krishna, Krishna"</li>
            <li>Think happy thoughts about God</li>
          </ul>

          <h4>3. Bring a Gift for God</h4>
          <p>You can bring:</p>
          <ul>
            <li><strong>Flowers</strong> - God loves flowers!</li>
            <li><strong>Fruits</strong> - like bananas or coconuts</li>
            <li><strong>Incense sticks</strong> - they smell nice</li>
          </ul>
          <p>Lord Krishna said: <em>"If someone gives Me even a leaf, a flower, or a little water with love, I happily accept it!"</em></p>
          <p>It's not about how expensive your gift is - it's about the <strong>love in your heart</strong>!</p>

          <h3>What is Prasad?</h3>
          <p><strong>Prasad</strong> is food that has been offered to God. After God blesses it, we get to eat it!</p>
          <p>Prasad is very special because it has God's blessings in it. When you eat prasad:</p>
          <ul>
            <li><strong>Don't drop it</strong> on the floor</li>
            <li><strong>Don't waste it</strong></li>
            <li><strong>Share it</strong> with others</li>
            <li>Say <strong>God's name</strong> before eating</li>
          </ul>

          <h3>Does God Really Eat the Food?</h3>
          <p>A holy lady named <strong>Sri Sarada Devi</strong> explained this beautifully:</p>
          <p>She said that when she offered food to God, she saw <strong>rays of light</strong> come from God's eyes, touch the food, take its goodness, and bless it!</p>
          <p>So yes, God does "eat" the food - but in a special, magical way!</p>

          <h3>Why Are There Lamps in Temples?</h3>
          <p>You'll see lamps burning in temples. These lamps mean:</p>
          <ul>
            <li><strong>God's light</strong> - God is like a bright light</li>
            <li><strong>Knowledge</strong> - light helps us see and understand</li>
            <li><strong>Goodness</strong> - light chases away darkness</li>
          </ul>

          <h3>Key Things to Remember</h3>
          <ul>
            <li>A <strong>temple</strong> is God's special home</li>
            <li>Be <strong>clean and neat</strong> when visiting</li>
            <li><strong>Think of God</strong> on the way</li>
            <li>Bring <strong>flowers, fruits, or incense</strong></li>
            <li><strong>Prasad</strong> = blessed food from God</li>
            <li><strong>Lamps</strong> = God's light and knowledge</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              question: 'What is a temple?',
              answers: [
                'A playground',
                'God\'s special home',
                'A school',
                'A shop'
              ],
              correctAnswer: 1
            },
            {
              question: 'How should you dress when visiting a temple?',
              answers: [
                'Any way you want',
                'Clean and neat',
                'In dirty clothes',
                'It doesn\'t matter'
              ],
              correctAnswer: 1
            },
            {
              question: 'What should you do while walking to the temple?',
              answers: [
                'Gossip with friends',
                'Think of God and say His name',
                'Talk about TV shows',
                'Complain about things'
              ],
              correctAnswer: 1
            },
            {
              question: 'What can you bring as a gift for God?',
              answers: [
                'Toys',
                'Flowers, fruits, or incense',
                'Video games',
                'Nothing ever'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is prasad?',
              answers: [
                'Regular food',
                'Food blessed by God',
                'Expensive food',
                'Temple decoration'
              ],
              correctAnswer: 1
            },
            {
              question: 'What should you do with prasad?',
              answers: [
                'Throw it away',
                'Share it and eat it with respect',
                'Drop it on the floor',
                'Hide it'
              ],
              correctAnswer: 1
            },
            {
              question: 'What do lamps in temples represent?',
              answers: [
                'Just decoration',
                'God\'s light and knowledge',
                'Fire danger',
                'Nothing special'
              ],
              correctAnswer: 1
            },
            {
              question: 'According to Lord Krishna, what matters most when giving to God?',
              answers: [
                'How expensive the gift is',
                'The love in your heart',
                'How big the gift is',
                'How many gifts you bring'
              ],
              correctAnswer: 1
            },
            {
              question: 'How often should you visit a temple?',
              answers: [
                'Never',
                'Once a year',
                'As often as possible, at least on festival days',
                'Only when forced'
              ],
              correctAnswer: 2
            },
            {
              question: 'Why do we visit temples?',
              answers: [
                'To play games',
                'To feel close to God and get blessings',
                'To meet friends only',
                'Because we have to'
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: 'right-living',
        title: 'Right Living - Part 1',
        description: 'Learn how to be a good person at home and school',
        content: `
          <h2>Right Living - Being Your Best Self!</h2>
          <p>Living a good life means being kind, helpful, and doing your best every day. Let's learn how to be our best selves at home and at school!</p>

          <h3>Being Good at Home</h3>
          <p>Your home is where your family loves you and takes care of you. Here's how to be a great family member:</p>

          <h4>Love and Respect Your Parents</h4>
          <ul>
            <li>Say <strong>"Good morning!"</strong> when you wake up</li>
            <li>Say <strong>"Good night!"</strong> before bed</li>
            <li>Say <strong>"Thank you"</strong> when they help you</li>
            <li>Listen when they talk to you</li>
          </ul>
          <p><em>Your parents work hard to give you everything you need!</em></p>

          <h4>Be Kind to Everyone</h4>
          <ul>
            <li>Be nice to your <strong>brothers and sisters</strong></li>
            <li>Be kind to <strong>pets and animals</strong></li>
            <li>Help <strong>grandparents and relatives</strong></li>
          </ul>

          <h4>Keep Your Room Clean</h4>
          <ul>
            <li>Make your bed every morning</li>
            <li>Put your toys away</li>
            <li>Keep your clothes tidy</li>
            <li>You can put up pictures of God or things you love!</li>
          </ul>

          <h4>Love Nature</h4>
          <p>Try growing a small plant! Water it, care for it, and watch it grow. Plants love your care!</p>

          <h3>Being Good at School</h3>
          <p>School is like a temple of <strong>Mother Saraswati</strong> - the Goddess of Learning! Here's how to be a great student:</p>
          <ul>
            <li><strong>Be on time</strong> - don't be late!</li>
            <li><strong>Do your homework</strong> - every day!</li>
            <li><strong>Listen to your teachers</strong> - they help you learn</li>
            <li><strong>Be friendly</strong> - be nice to all your classmates</li>
            <li><strong>Follow the rules</strong> - they keep everyone safe</li>
            <li><strong>Keep your classroom clean</strong></li>
          </ul>
          <p>Remember: A strong mind AND a strong body go together! So study hard AND play sports!</p>

          <h3>Your Daily Routine</h3>
          <p>Having a good routine helps you be your best. Here's a great daily plan:</p>

          <h4>Morning</h4>
          <ul>
            <li>Wake up early - see the sunrise!</li>
            <li>Make your bed</li>
            <li>Brush your teeth</li>
            <li>Pray to God</li>
            <li>Eat a good breakfast</li>
          </ul>

          <h4>During the Day</h4>
          <ul>
            <li>Focus on your studies</li>
            <li>Do your homework</li>
            <li>Play and exercise</li>
            <li>Help at home</li>
          </ul>

          <h4>Evening</h4>
          <ul>
            <li>Pray to God</li>
            <li>Eat dinner with family</li>
            <li>Go to bed early</li>
          </ul>

          <h3>The Five "Wells" of Life</h3>
          <p>Remember these five things to do WELL:</p>
          <ol>
            <li><strong>Pray well</strong> - talk to God every day</li>
            <li><strong>Play well</strong> - exercise and have fun</li>
            <li><strong>Eat well</strong> - eat healthy food</li>
            <li><strong>Study well</strong> - learn new things</li>
            <li><strong>Sleep well</strong> - get enough rest</li>
          </ol>

          <h3>Key Things to Remember</h3>
          <ul>
            <li><strong>Respect your parents</strong> - greet them morning and night</li>
            <li><strong>Be kind</strong> to everyone - family, friends, animals</li>
            <li><strong>Keep things clean</strong> - your room, your school</li>
            <li><strong>Do your homework</strong> every day</li>
            <li><strong>Self-help is the best help</strong> - do things yourself!</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              question: 'What should you say to your parents when you wake up?',
              answers: [
                'Nothing',
                'Good morning!',
                'I\'m hungry',
                'Leave me alone'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who is Mother Saraswati?',
              answers: [
                'A teacher at school',
                'The Goddess of Learning',
                'A friend',
                'A book'
              ],
              correctAnswer: 1
            },
            {
              question: 'What are the Five "Wells" of Life?',
              answers: [
                'Five water wells',
                'Pray, play, eat, study, sleep - all done well',
                'Five friends',
                'Five books'
              ],
              correctAnswer: 1
            },
            {
              question: 'What should you do with your room?',
              answers: [
                'Leave it messy',
                'Keep it clean and tidy',
                'Never go in it',
                'Fill it with junk'
              ],
              correctAnswer: 1
            },
            {
              question: 'What does "Self-help is the best help" mean?',
              answers: [
                'Never help anyone',
                'Do things yourself instead of always asking others',
                'Only help yourself',
                'Don\'t do anything'
              ],
              correctAnswer: 1
            },
            {
              question: 'Why is waking up early good?',
              answers: [
                'It\'s not good',
                'You can see the sunrise and hear birds',
                'You can watch TV',
                'You can sleep more'
              ],
              correctAnswer: 1
            },
            {
              question: 'How should you treat your classmates?',
              answers: [
                'Be mean to them',
                'Ignore them',
                'Be friendly and nice',
                'Fight with them'
              ],
              correctAnswer: 2
            },
            {
              question: 'What should you do every day at school?',
              answers: [
                'Skip homework',
                'Be late',
                'Do your homework',
                'Break the rules'
              ],
              correctAnswer: 2
            },
            {
              question: 'What goes together according to this lesson?',
              answers: [
                'A strong mind and a strong body',
                'Sleeping and eating',
                'Playing and sleeping',
                'Nothing'
              ],
              correctAnswer: 0
            },
            {
              question: 'How should you treat animals?',
              answers: [
                'Be mean to them',
                'Ignore them',
                'Be kind to them',
                'Scare them'
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      {
        id: 'right-living-part2',
        title: 'Right Living - Part 2',
        description: 'Learn about choosing good friends, reading good books, and speaking kindly',
        content: `
          <h2>Right Living - Part 2: Friends, Books, and Words</h2>
          <p>Who you spend time with, what you read, and how you talk all help make you who you are! Let's learn how to make good choices.</p>

          <h3>Choose Good Friends</h3>
          <p>There's a saying: <strong>"You become like the people you spend time with."</strong></p>
          <p>This is so true! If you have good friends, you'll learn good things. If you have bad friends, you might learn bad things.</p>

          <h4>What Makes a Good Friend?</h4>
          <ul>
            <li>They are <strong>kind and honest</strong></li>
            <li>They <strong>help you</strong> do the right thing</li>
            <li>They <strong>don't get you in trouble</strong></li>
            <li>They make you feel <strong>happy and safe</strong></li>
          </ul>

          <h4>Things to ALWAYS Avoid</h4>
          <p>These things are very bad for you - never do them:</p>
          <ul>
            <li><strong>Smoking</strong> - hurts your body</li>
            <li><strong>Alcohol</strong> - makes you sick</li>
            <li><strong>Drugs</strong> - very dangerous</li>
            <li><strong>Gambling</strong> - wastes money</li>
          </ul>
          <p>If someone tries to get you to do these things, they are NOT a good friend!</p>

          <h3>Read Good Books</h3>
          <p>Reading is like food for your brain! Good books make you smarter and better.</p>

          <h4>Why Reading is Great</h4>
          <ul>
            <li>You learn about <strong>people and places</strong> around the world</li>
            <li>You'll <strong>never be bored</strong> if you love reading</li>
            <li>You become <strong>smarter and wiser</strong></li>
            <li>You get <strong>new ideas</strong></li>
          </ul>

          <h4>Read Holy Books Too!</h4>
          <p>Holy books (like stories about God and good people) help clean your mind of bad thoughts. They teach you to be a better person!</p>

          <h3>Use Your Words Wisely</h3>
          <p>Being able to talk is a <strong>wonderful gift from God</strong>! But we need to use this gift carefully.</p>

          <h4>Rules for Good Speaking</h4>
          <ul>
            <li><strong>Always tell the truth</strong> - lying hurts everyone</li>
            <li><strong>Be kind</strong> - don't say mean things</li>
            <li><strong>Think before you speak</strong> - you can't take words back!</li>
            <li><strong>Don't fight with words</strong> - no quarreling</li>
            <li><strong>Don't talk too much</strong> - sometimes quiet is good</li>
          </ul>

          <h4>Learn to Listen!</h4>
          <p>Listening is just as important as talking! When grown-ups or teachers speak, listen carefully and quietly.</p>

          <h4>The Power of Silence</h4>
          <p>Sometimes being quiet is wonderful! When you're silent, beautiful thoughts can come to you.</p>

          <h3>Three Things That Make You Great</h3>
          <ol>
            <li><strong>Good Friends</strong> - choose wisely!</li>
            <li><strong>Good Books</strong> - read often!</li>
            <li><strong>Good Words</strong> - speak kindly!</li>
          </ol>

          <h3>Key Things to Remember</h3>
          <ul>
            <li><strong>Good friends</strong> bring happiness; bad friends bring trouble</li>
            <li><strong>Never</strong> smoke, drink alcohol, take drugs, or gamble</li>
            <li><strong>Reading</strong> makes you smart and never bored</li>
            <li><strong>Think before you speak</strong> - words can't be taken back</li>
            <li><strong>Listen</strong> as much as you talk</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              question: 'What happens when you have good friends?',
              answers: [
                'You learn bad things',
                'You learn good things',
                'Nothing happens',
                'You get in trouble'
              ],
              correctAnswer: 1
            },
            {
              question: 'Which of these should you NEVER do?',
              answers: [
                'Read books',
                'Make friends',
                'Smoke, drink alcohol, or take drugs',
                'Go to school'
              ],
              correctAnswer: 2
            },
            {
              question: 'Why is reading good for you?',
              answers: [
                'It makes you tired',
                'It makes you smarter and you\'ll never be bored',
                'It wastes time',
                'It\'s not good for you'
              ],
              correctAnswer: 1
            },
            {
              question: 'Why should you think before you speak?',
              answers: [
                'To speak louder',
                'Because you can\'t take words back',
                'To speak faster',
                'It doesn\'t matter'
              ],
              correctAnswer: 1
            },
            {
              question: 'What can happen when you are silent?',
              answers: [
                'You get bored',
                'Beautiful thoughts can come to you',
                'You forget how to talk',
                'Nothing good'
              ],
              correctAnswer: 1
            },
            {
              question: 'What are the three things that make you great?',
              answers: [
                'Money, toys, games',
                'Good friends, good books, good words',
                'TV, phone, computer',
                'Sleeping, eating, playing'
              ],
              correctAnswer: 1
            },
            {
              question: 'What does good company (good friends) bring?',
              answers: [
                'Sadness',
                'Happiness',
                'Problems',
                'Nothing'
              ],
              correctAnswer: 1
            },
            {
              question: 'What should you do when grown-ups speak?',
              answers: [
                'Ignore them',
                'Talk over them',
                'Listen carefully and quietly',
                'Walk away'
              ],
              correctAnswer: 2
            },
            {
              question: 'What do holy books help you do?',
              answers: [
                'Become rich',
                'Clean your mind of bad thoughts',
                'Win games',
                'Sleep better'
              ],
              correctAnswer: 1
            },
            {
              question: 'What is speaking described as?',
              answers: [
                'A problem',
                'A wonderful gift from God',
                'Something to avoid',
                'Not important'
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: 'right-living-part3',
        title: 'Right Living - Part 3',
        description: 'Learn about staying busy, helping others, and sharing',
        content: `
          <h2>Right Living - Part 3: Be Busy, Help Others, Share!</h2>
          <p>In this lesson, we learn three wonderful things: staying busy with good work, helping others, and sharing what we have!</p>

          <h3>Be Busy Like a Bee!</h3>
          <p>Have you seen how busy bees are? They're always working! We should be like that too - but doing GOOD things!</p>

          <h4>Don't Waste Time!</h4>
          <p>Time is precious. Use it for:</p>
          <ul>
            <li><strong>Studying</strong> - learn new things</li>
            <li><strong>Reading</strong> - books make you smart</li>
            <li><strong>Praying</strong> - talk to God</li>
            <li><strong>Helping others</strong> - be kind</li>
            <li><strong>Playing</strong> - exercise is important too!</li>
          </ul>

          <h4>Ways to Be Helpful</h4>
          <ul>
            <li>Help your <strong>parents</strong> with chores</li>
            <li>Help your <strong>brothers and sisters</strong></li>
            <li>Help your <strong>teachers</strong> at school</li>
            <li>Help your <strong>friends</strong></li>
          </ul>
          <p>Remember: <strong>"Be good and do good!"</strong></p>

          <h3>Helping Others is Like Helping God!</h3>
          <p>A great teacher named <strong>Swami Vivekananda</strong> said:</p>
          <p><em>"Helping people is like helping God. Work is worship!"</em></p>
          <p>This means when you help someone, it's like you're serving God!</p>

          <h4>Who Should We Help?</h4>
          <ul>
            <li>People who are <strong>poor</strong></li>
            <li>People who are <strong>sick</strong></li>
            <li>People who <strong>need help</strong></li>
            <li>Animals who are <strong>hungry</strong></li>
          </ul>

          <h4>Important Rule!</h4>
          <p><strong>Don't expect anything in return!</strong> When you help someone, don't ask for a reward. Just feel happy that you helped!</p>

          <h3>Sharing is Caring!</h3>
          <p>Everything in the world belongs to God. We should:</p>
          <ul>
            <li><strong>Take only what we need</strong> - don't be greedy!</li>
            <li><strong>Share with others</strong> - sharing makes everyone happy</li>
            <li><strong>Give with love</strong> - give happily, not sadly</li>
          </ul>

          <h4>Ways to Share</h4>
          <ul>
            <li>Share your <strong>food</strong> with hungry people or animals</li>
            <li>Share your <strong>toys</strong> with friends</li>
            <li>Share your <strong>knowledge</strong> - help others learn</li>
            <li>Share your <strong>time</strong> - spend time with people who need company</li>
          </ul>

          <h3>A Beautiful Quote</h3>
          <p>Swami Vivekananda also said:</p>
          <p><em>"Only they truly live who live for others!"</em></p>
          <p>This means the happiest people are those who help others!</p>

          <h3>Key Things to Remember</h3>
          <ul>
            <li><strong>Be busy</strong> like a bee - don't waste time!</li>
            <li><strong>Help others</strong> - it's like helping God</li>
            <li><strong>Don't expect rewards</strong> when you help</li>
            <li><strong>Share</strong> what you have with love</li>
            <li><strong>Don't be greedy</strong> - take only what you need</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              question: 'What does "Busy like a bee" mean?',
              answers: [
                'Make honey',
                'Stay active and do good work',
                'Fly around',
                'Sleep all day'
              ],
              correctAnswer: 1
            },
            {
              question: 'According to Swami Vivekananda, helping people is like helping who?',
              answers: [
                'Yourself',
                'God',
                'Nobody',
                'Only friends'
              ],
              correctAnswer: 1
            },
            {
              question: 'Should you expect a reward when you help someone?',
              answers: [
                'Yes, always',
                'No, just be happy you helped',
                'Only sometimes',
                'Only from family'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who does everything in the world belong to?',
              answers: [
                'Rich people',
                'The government',
                'God',
                'Nobody'
              ],
              correctAnswer: 2
            },
            {
              question: 'How should you share with others?',
              answers: [
                'Sadly and little',
                'Only when forced',
                'Happily and with love',
                'Never share'
              ],
              correctAnswer: 2
            },
            {
              question: 'Who said "Only they truly live who live for others"?',
              answers: [
                'A teacher at school',
                'Swami Vivekananda',
                'A friend',
                'Nobody'
              ],
              correctAnswer: 1
            },
            {
              question: 'What should you use your time for?',
              answers: [
                'Only sleeping',
                'Studying, reading, praying, and helping others',
                'Only playing video games',
                'Wasting it'
              ],
              correctAnswer: 1
            },
            {
              question: 'What should you NOT be when it comes to taking things?',
              answers: [
                'Happy',
                'Greedy',
                'Helpful',
                'Kind'
              ],
              correctAnswer: 1
            },
            {
              question: 'Who should we help?',
              answers: [
                'Only rich people',
                'Only family',
                'Poor, sick, and needy people',
                'Nobody'
              ],
              correctAnswer: 2
            },
            {
              question: 'What can you share besides toys?',
              answers: [
                'Nothing else',
                'Food, knowledge, and time',
                'Only money',
                'Only clothes'
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        id: 'right-living-part4',
        title: 'Right Living - Part 4',
        description: 'Learn about not finding faults, controlling yourself, and having good hobbies',
        content: `
          <h2>Right Living - Part 4: Be Kind, Control Yourself, Have Fun!</h2>
          <p>This is the last part of Right Living! We'll learn about being kind to others, controlling our minds, and having good hobbies.</p>

          <h3>Don't Find Faults in Others!</h3>
          <p>It's easy to see what's wrong with other people. But it's hard to see what's wrong with ourselves!</p>

          <h4>A Wise Teaching</h4>
          <p>A holy woman named <strong>Sri Sarada Devi</strong> said:</p>
          <p><em>"If you want peace, don't find faults in others. Look at your own faults instead. The whole world is your family!"</em></p>

          <h4>Why is Fault-Finding Bad?</h4>
          <ul>
            <li>It <strong>hurts people's feelings</strong></li>
            <li>It makes people <strong>upset and sad</strong></li>
            <li>It stops you from <strong>seeing your own mistakes</strong></li>
            <li>It makes <strong>you unhappy</strong> too!</li>
          </ul>

          <h4>What to Do Instead</h4>
          <ul>
            <li>Look at <strong>your own faults</strong> and fix them</li>
            <li>Be <strong>kind</strong> to everyone</li>
            <li>Remember: <strong>everyone is part of your big family!</strong></li>
          </ul>

          <h3>Control Your Mind!</h3>
          <p><strong>Self-control</strong> is super important! It helps us become better people.</p>

          <h4>The Monkey Mind</h4>
          <p>A great teacher named <strong>Sri Ramakrishna</strong> said our minds are like a <strong>crazy monkey</strong> - always jumping around!</p>
          <p>Just like we can train a wild animal, we can train our minds to be calm and good.</p>

          <h4>How to Control Your Mind</h4>
          <ul>
            <li><strong>Pray</strong> - talk to God</li>
            <li><strong>Read good books</strong> - fill your mind with good thoughts</li>
            <li><strong>Have good friends</strong> - they help you be good</li>
            <li><strong>Have good hobbies</strong> - keep busy with good things</li>
          </ul>

          <h3>Have Good Hobbies!</h3>
          <p>Hobbies are fun things you do in your free time. Good hobbies help your mind relax and grow!</p>

          <h4>Music is Wonderful!</h4>
          <p>Learning to sing or play an instrument is great because:</p>
          <ul>
            <li>It makes your mind <strong>calm and happy</strong></li>
            <li>It helps you <strong>concentrate</strong></li>
            <li>Even <strong>animals and plants</strong> like music!</li>
          </ul>

          <h4>Other Great Hobbies</h4>
          <ul>
            <li><strong>Reading</strong> - learn new things</li>
            <li><strong>Drawing and painting</strong> - be creative</li>
            <li><strong>Making crafts</strong> - create beautiful things</li>
            <li><strong>Collecting stamps</strong> - learn about the world</li>
            <li><strong>Playing sports</strong> - keep your body healthy</li>
            <li><strong>Gardening</strong> - grow plants</li>
          </ul>
          <p>Good hobbies make your free time <strong>happy and useful!</strong></p>

          <h3>Three Important Things</h3>
          <ol>
            <li><strong>Don't find faults</strong> - be kind to everyone</li>
            <li><strong>Control your mind</strong> - train it like a pet</li>
            <li><strong>Have good hobbies</strong> - use free time wisely</li>
          </ol>

          <h3>Key Things to Remember</h3>
          <ul>
            <li><strong>Don't point out</strong> other people's mistakes - look at your own</li>
            <li>The <strong>whole world</strong> is like your family</li>
            <li>Your mind is like a <strong>monkey</strong> - train it!</li>
            <li><strong>Prayer, reading, and good friends</strong> help control your mind</li>
            <li><strong>Music and hobbies</strong> make you calm and happy</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              question: 'What did Sri Sarada Devi say we should do for peace of mind?',
              answers: [
                'Find faults in others',
                'Look at our own faults instead of others\'',
                'Ignore everyone',
                'Complain a lot'
              ],
              correctAnswer: 1
            },
            {
              question: 'What does self-control help us become?',
              answers: [
                'Rich',
                'Famous',
                'Better people',
                'Lazy'
              ],
              correctAnswer: 2
            },
            {
              question: 'What did Sri Ramakrishna compare our minds to?',
              answers: [
                'A calm lake',
                'A crazy monkey',
                'A sleeping cat',
                'A slow turtle'
              ],
              correctAnswer: 1
            },
            {
              question: 'Which of these helps control your mind?',
              answers: [
                'Watching too much TV',
                'Being lazy',
                'Prayer and reading good books',
                'Eating candy'
              ],
              correctAnswer: 2
            },
            {
              question: 'What does music help you do?',
              answers: [
                'Make noise',
                'Feel calm and concentrate',
                'Stay awake all night',
                'Nothing'
              ],
              correctAnswer: 1
            },
            {
              question: 'Why should you have good hobbies?',
              answers: [
                'To waste time',
                'To show off',
                'To relax your mind and have fun',
                'To avoid homework'
              ],
              correctAnswer: 2
            },
            {
              question: 'What does fault-finding do to others?',
              answers: [
                'Makes them happy',
                'Hurts their feelings',
                'Helps them',
                'Nothing'
              ],
              correctAnswer: 1
            },
            {
              question: 'According to Sri Sarada Devi, who is your family?',
              answers: [
                'Only your parents',
                'Only your friends',
                'The whole world',
                'Only your neighbors'
              ],
              correctAnswer: 2
            },
            {
              question: 'Who likes music according to the lesson?',
              answers: [
                'Only humans',
                'Only children',
                'Even animals and plants',
                'Nobody'
              ],
              correctAnswer: 2
            },
            {
              question: 'What should you do instead of finding faults in others?',
              answers: [
                'Ignore them',
                'Be mean to them',
                'Look at your own faults and be kind',
                'Tell everyone about their faults'
              ],
              correctAnswer: 2
            }
          ]
        }
      }
    ]
  }
];

export default lessonsData;
