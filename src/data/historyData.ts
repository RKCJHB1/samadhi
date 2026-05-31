export interface OnThisDayEvent {
  date: string; // e.g. "January 1"
  monthNumeric: number; // 0-11
  dayNumeric: number; // 1-31
  year: number;
  headline: string;
  narrativeParagraph1: string;
  narrativeParagraph2: string;
  quote: string;
  quoteAuthor: string;
  imageCaption: string;
  customImage?: string;
  customImages?: string[];
}

export const PRELOADED_EVENTS: OnThisDayEvent[] = [
  {
    date: "May 31",
    monthNumeric: 4,
    dayNumeric: 31,
    year: 1855,
    headline: "The Inauguration of Dakshineswar Kali Temple",
    narrativeParagraph1: "On May 31, 1855, the Dakshineswar Kali Temple, was formally inaugurated. Built by the Rani Rashmoni, the grand temple complex was dedicated to Goddess Bhavatarini, an aspect of Kali.",
    narrativeParagraph2: "The inauguration took place on the auspicious day of Snana Yatra. Around this time, Sri Ramakrishna arrived at the temple, eventually becoming its head priest and transforming the course of history.",
    quote: "Mother is the ultimate reality. If you weep for Her with a pure heart, She will surely reveal Herself to you.",
    quoteAuthor: "Sri Ramakrishna",
    imageCaption: "The iconic Dakshineswar Kali Temple along the Hooghly River, radiating spiritual devotion.",
    customImages: ["/images/on-this-day/Dakshineshwar1.png", "/images/on-this-day/Dakshineshwar2.png"]
  },
  {
    date: "May 31",
    monthNumeric: 4,
    dayNumeric: 31,
    year: 1893,
    headline: "Swami Vivekananda Sets Sail for America",
    narrativeParagraph1: "Swami Vivekananda set sail for America on May 31, 1893. On this historic day, Swamiji boarded the ship S.S. Peninsular at the Bombay port, embarking on a transformative journey across the oceans.",
    narrativeParagraph2: "Traveling via Asia and Canada, he was bound for the United States to represent Hinduism at the Parliament of the World's Religions in Chicago. His eventual speech there in September would catapult Indian spirituality into the global consciousness.",
    quote: "I have a message to the West as Buddha had a message to the East.",
    quoteAuthor: "Swami Vivekananda",
    imageCaption: "A vast ship navigating across the open ocean, carrying a message of universal harmony.",
    customImages: ["/images/on-this-day/swamiji1.png", "/images/on-this-day/swamiji2.png"]
  },
  {
    date: "June 1",
    monthNumeric: 5,
    dayNumeric: 1,
    year: 1897,
    headline: "Swami Vivekananda's Sanskrit Letter from Almora",
    narrativeParagraph1: "On June 1, 1897, while recuperating in the serene hills of Almora, Swami Vivekananda wrote a significant Sanskrit letter to his disciple, Swami Shuddhananda. Beyond sharing personal updates and tender care for his fellow monks, Swamiji provided a masterful exposition on the true essence of the Vedas.",
    narrativeParagraph2: "Using the metaphor of a vast flood, he emphasized that just as a thirsty person seeks only drinkable water from a deluge, a true spiritual aspirant must bypass ritualistic complexities and focus entirely on the ultimate core of the scriptures: achieving direct spiritual illumination through the knowledge of Brahman.",
    quote: "The essence of the Vedas is the knowledge of Brahman. All rituals and ceremonies are but the waves on the ocean of Truth.",
    quoteAuthor: "Swami Vivekananda",
    imageCaption: "Misty mountain peaks of Almora shrouded in serene spirituality, where sacred wisdom was imparted.",
    customImages: ["/images/on-this-day/1stJuneSwamiji1.png", "/images/on-this-day/1stJuneSwamiji2.png"]
  },
  {
    date: "June 1",
    monthNumeric: 5,
    dayNumeric: 1,
    year: 1915,
    headline: "Swami Turiyananda on Divine Protection",
    narrativeParagraph1: "On June 1, 1915, a profound spiritual dialogue was recorded between Swami Turiyananda, a direct disciple of Sri Ramakrishna, and a devotee. When asked why the Lord had suppressed a period of continuous spiritual ecstasy in his life, the Swami offered a beautiful, culturally rich explanation.",
    narrativeParagraph2: "He likened the divine intervention to a loving mother who puts a black mark on her beautiful child's cheek to ward off the evil eye, suggesting that the Lord hid his ecstatic state simply to protect him from the envy of the world and allow his work to continue quietly.",
    quote: "The Lord's hand is always extended in protection over his children. Sometimes the greatest grace is hidden from the eyes of the world.",
    quoteAuthor: "Swami Turiyananda",
    imageCaption: "A serene portrait reflecting the gentle wisdom and compassionate grace of a direct disciple of Sri Ramakrishna."
  },
  {
    date: "January 1",
    monthNumeric: 0,
    dayNumeric: 1,
    year: 1886,
    headline: "Sri Ramakrishna Blesses Devotees on Kalpataru Day",
    narrativeParagraph1: "On this historic afternoon at the Cossipore Garden House near Calcutta, Sri Ramakrishna felt well enough to walk in the garden. There, he met several of his householder disciples who had gathered. Recognizing their deep devotion, Sri Ramakrishna entered an elevated spiritual state and blessed them collectively, saying: 'What more shall I say to you? May you all be spiritually awakened!'",
    narrativeParagraph2: "Upon his touch and blessing, the devotees experienced profound ecstasies and spiritual visions, feeling an overwhelming surge of divine love. This event is revered across the Ramakrishna Order as 'Kalpataru Day'—signifying the Great Master as the wish-fulfilling tree of spiritual grace, open to all seekers of Truth.",
    quote: "Spiritual awakening is the true beginning of real life. Pray for selfless devotion and pure love for the Divine.",
    quoteAuthor: "Sri Ramakrishna",
    imageCaption: "A sacred clay lamp glowing brightly, symbolizing the fire of spiritual illumination lit on Kalpataru Day."
  },
  {
    date: "January 1",
    monthNumeric: 0,
    dayNumeric: 1,
    year: 1909,
    headline: "Inauguration of the Holy Udbodhan House in Baghbazar",
    narrativeParagraph1: "On January 1, 1909, the newly built house in Baghbazar, North Calcutta, was inaugurated to serve as the editorial office of the Bengali organ 'Udbodhan' and the town residence of Holy Mother Sri Sarada Devi. Built through the dedicated efforts of Swami Saradananda, this simple house became a sacred sanctuary of maternal love and spiritual guidance.",
    narrativeParagraph2: "Holy Mother lived inside this building during her frequent visits to Calcutta, personally tending to monastic disciples, simple devotees, and the poor. It stands today as 'Mayer Bari' (Mother's House), a quiet place of pilgrimage where thousands feel the continuing, silent embrace of her divine motherhood.",
    quote: "If you want peace, do not look at another's faults. Rather look at your own. Learn to make the world your own.",
    quoteAuthor: "Holy Mother Sri Sarada Devi",
    imageCaption: "Warm flame of a diya glowing in the shrine room, reflecting maternal blessing and light."
  },
  {
    date: "January 12",
    monthNumeric: 0,
    dayNumeric: 12,
    year: 1863,
    headline: "Advent of Swami Vivekananda",
    narrativeParagraph1: "On this day in 1863, Narendra Nath Dutta (later known to the world as Swami Vivekananda) was born in Calcutta. Born into an aristocratic family, he possessed a brilliant analytical mind, a strong athletic constitution, and an intense longing for spiritual realization from early childhood. His meeting with Sri Ramakrishna in 1881 marked the turning point of his life.",
    narrativeParagraph2: "Swami Vivekananda would go on to carry the message of Vedanta to the West, inspiring millions with his call for self-mastery, strength, and service. In India, this day is celebrated as National Youth Day to honor his timeless, empowering teachings that encourage youth to stand on their own feet and serve humanity.",
    quote: "Arise, awake, and stop not till the goal is reached. All power is within you; you can do anything and everything.",
    quoteAuthor: "Swami Vivekananda",
    imageCaption: "Sunrise over the serene temples of Belur Math, welcoming the light of a new spiritual era."
  },
  {
    date: "February 18",
    monthNumeric: 1,
    dayNumeric: 18,
    year: 1836,
    headline: "The Advent of Sri Ramakrishna Dev",
    narrativeParagraph1: "On this auspicious day, Gadadhar Chattopadhyaya, later revered as Sri Ramakrishna Paramahamsa, was born in the quiet, rural village of Kamarpukur, Bengal. Born to pious parents, his early life was characterized by deep spiritual sensitivities and spontaneous ecstasies. He spent his later youth at the Dakshineswar Kali Temple performing intense sadhanas of various spiritual paths.",
    narrativeParagraph2: "Sri Ramakrishna demonstrated through his own life and spiritual realizations that all religions and spiritual paths, when followed sincerely, lead to the same ultimate Divine Truth. This message of religious harmony and spiritual directness forms the spiritual cornerstone of the global Ramakrishna movement.",
    quote: "As many faiths, so many paths. The main thing is to reach the roof; you can climb up by stone stairs, wooden stairs, or by a bamboo pole.",
    quoteAuthor: "Sri Ramakrishna",
    imageCaption: "Sacred diya illuminating the altar of Kamarpukur, the tranquil birthplace of Sri Ramakrishna."
  },
  {
    date: "March 6",
    monthNumeric: 2,
    dayNumeric: 6,
    year: 1938,
    headline: "Consecration of the Sri Ramakrishna Temple at Belur Math",
    narrativeParagraph1: "On March 6, 1938, the majestic new temple dedicated to Sri Ramakrishna was formally consecrated at Belur Math by Swami Virajananda, a direct disciple of Holy Mother, and other senior monks. The grand temple project, envisioned years earlier by Swami Vivekananda, was designed in a unique architectural style combining elements of Hindu temples, Buddhist chaityas, Christian cathedrals, and Islamic mosques.",
    narrativeParagraph2: "This architectural marvel stands as a physical symbol of the university of religions and synthesis of spiritual ideas taught by Sri Ramakrishna. Today, it serves as the spiritual heart of the worldwide Ramakrishna Math and Mission, inviting pilgrims of all backgrounds to experience peace and unity.",
    quote: "This temple is a symbol of harmony. Let anyone come here and feel that they have come to their own spiritual home.",
    quoteAuthor: "Swami Shivananda (Direct Disciple)",
    imageCaption: "Watercolor panorama of Belur Math on the banks of the Ganges, a haven of architectural and spiritual harmony."
  },
  {
    date: "May 1",
    monthNumeric: 4,
    dayNumeric: 1,
    year: 1897,
    headline: "Swami Vivekananda Founds the Ramakrishna Mission",
    narrativeParagraph1: "On this momentous day, Swami Vivekananda convened a meeting of monastic and lay disciples of Sri Ramakrishna at Balaram Bose's residence in Calcutta. Recognizing the need for an organized body to carry out his master's spiritual legacy, Swamiji founded the Ramakrishna Mission Association, establishing its twin ideals: 'Atmano mokshartham jagat hitaya cha'—for one's own salvation and for the welfare of the world.",
    narrativeParagraph2: "The organization was designed directly to bridge the ancient contemplative life of monastics with active, selfless social service—including disaster relief, education, healthcare, and spiritual dissemination. This marked a revolutionary step in modern Indian monasticism, elevating service to humanity to the level of direct divine worship.",
    quote: "They alone live, who live for others, the rest are more dead than alive. Service to Jiva is service to Shiva.",
    quoteAuthor: "Swami Vivekananda",
    imageCaption: "The pristine main shrine of Belur Math, where meditation and service flow together as a single stream."
  },
  {
    date: "May 1",
    monthNumeric: 4,
    dayNumeric: 1,
    year: 1953,
    headline: "Spiritual Centenary of the Holy Mother Sri Sarada Devi",
    narrativeParagraph1: "On May 1, 1953, the Ramakrishna Math and Mission inaugurated a year-long international celebration of the birth centenary of Sri Sarada Devi, the Holy Mother. This landmark celebration focused global attention on her life of silent spiritual realization and non-sectarian maternal grace, illustrating the ideal of spiritually centered motherhood.",
    narrativeParagraph2: "The centenary served as the vital impulse that led directly to the founding of Sri Sarada Math at Dakshineswar—an independent, fully self-governing monastic order for women. Today, Sri Sarada Math stands as a glowing testimony to Swami Vivekananda's vision that women must be empowered to work out their own spiritual destinies.",
    quote: "In time of need, always remember that you have a Mother in me. My doors are open to everyone, forever.",
    quoteAuthor: "Holy Mother Sri Sarada Devi",
    imageCaption: "Peaceful waters of the river Ganges flowing by Belur Math beneath a terracotta dawn sky."
  },
  {
    date: "July 4",
    monthNumeric: 6,
    dayNumeric: 4,
    year: 1902,
    headline: "Mahasamadhi of Swami Vivekananda",
    narrativeParagraph1: "On the evening of July 4, 1902, Swami Vivekananda entered into final Mahasamadhi in his room at Belur Math, Ganges-side. Earlier that day, he had meditated for three hours in the shrine, taught Sanskrit grammar to Brahmacharins, and walked alongside the Ganges, pointing out the site chosen for his cremation. At nine in the evening, he quietly withdrew into absolute meditation and left his mortal body.",
    narrativeParagraph2: "Swamiji had lived a brief but intensely concentrated life of 39 years, fulfilling his mission of delivering the pristine truths of Vedanta to India and the West. His departure left a massive vacuum, but his fiery words and dynamic spirit continue to ignite hearts across generations, guiding seekers along the path of spiritual freedom.",
    quote: "It may be that I shall find it good to get out of my body, to cast it off like a worn-out garment. But I shall not cease to work. I shall inspire men everywhere.",
    quoteAuthor: "Swami Vivekananda",
    imageCaption: "The quiet river Ganges flowing past Swami Vivekananda's memorial temple under an evening twilight sky."
  },
  {
    date: "August 16",
    monthNumeric: 7,
    dayNumeric: 16,
    year: 1886,
    headline: "The Mahasamadhi of Sri Ramakrishna Paramahamsa",
    narrativeParagraph1: "Just after midnight on August 16, 1886, Sri Ramakrishna entered into final Mahasamadhi at the Cossipore Garden House. Suffering from throat cancer and physically emaciated, his spiritual brilliance remained absolute. In his final hours, he uttered the sacred name of 'Kali' three times, and his face lit up with a wonderful smile as he entered the state of Nirvikalpa Samadhi.",
    narrativeParagraph2: "His passing marked the transition of his group of young householder and monastic disciples, led by young Narendra (Swami Vivekananda), into a formal brotherhood. From these silent beginnings under the Master's spiritual shade arose the global monastic community that carries his message of direct God-realization to this day.",
    quote: "When a man has realized the Divine, he becomes silent. Let your actions speak, let your love melt all barriers.",
    quoteAuthor: "Sri Ramakrishna",
    imageCaption: "A glowing clay lamp radiating soft illumination into the darkness, a symbol of eternal presence."
  },
  {
    date: "September 11",
    monthNumeric: 8,
    dayNumeric: 11,
    year: 1893,
    headline: "Swami Vivekananda's Historic Chicago Parliament Speech",
    narrativeParagraph1: "On this historic Monday, Swami Vivekananda spoke at the opening session of the Parliament of Religions in Chicago. Walking onto the stage representing the ancient monastic tradition of India, he addressed the massive audience with the words: 'Sisters and Brothers of America!' At these words, seven thousand people stood up and applauded for two solid minutes in an unprecedented ovation.",
    narrativeParagraph2: "His short address focused on sectarianism and fanatical bigotry, urging humanity to overcome religious pride and embrace mutual tolerance. This speech introduced Hinduism and the universal message of Vedanta to the modern Western world, instantly making Swamiji a world figure and establishing a bridge between East and West.",
    quote: "I fervently hope that the bell that tolled this morning in honor of this convention may be the death-knell of all fanaticism.",
    quoteAuthor: "Swami Vivekananda",
    imageCaption: "Sunrise over Belur Math, casting terracotta light on the dome, embodying global spiritual synthesis."
  },
  {
    date: "November 12",
    monthNumeric: 10,
    dayNumeric: 12,
    year: 1898,
    headline: "Consecration of Sister Nivedita's Girls School in Calcutta",
    narrativeParagraph1: "On November 12, 1898, Sister Nivedita (Margaret Noble) opened a school for girls in the Baghbazar area of Calcutta. Holy Mother Sri Sarada Devi, accompanied by other senior direct disciples of Sri Ramakrishna, formally came to consecrate the school. The Mother offered a solemn prayer, wishing that the girls of India would develop of character and spiritual wisdom.",
    narrativeParagraph2: "This event marked a historic milestone for women's education in India, which Swami Vivekananda considered a vital priority for the country's national regeneration. Sister Nivedita dedicated her life to the education of Indian girls, setting a glorious standard for selfless service and devotion.",
    quote: "My son, let your heart be full of motherly love for all. Do not look at the faults of others, look at your own.",
    quoteAuthor: "Holy Mother Sri Sarada Devi",
    imageCaption: "Warm flame of a diya glowing in the shrine room, reflecting maternal blessing and light."
  },
  {
    date: "December 9",
    monthNumeric: 11,
    dayNumeric: 9,
    year: 1898,
    headline: "Swami Vivekananda Consecrates the Land of Belur Math",
    narrativeParagraph1: "On this cold morning, Swami Vivekananda carried the sacred urn containing the holy relics of Sri Ramakrishna on his shoulders to the newly purchased property at Belur. Walking barefoot on the banks of the Ganges, Swamiji placed the urn on the ground and performed a special worship, praying that the Math would become a center of spiritual awakening and refuge of peace for centuries.",
    narrativeParagraph2: "Swamiji remarked: 'By the power of the Lord's relics deposited here, this place will become a great power center, from which spiritual vibes will radiate across the globe.' The land became the permanent headquarters of the Ramakrishna Order, establishing a place of pilgrimage for spiritual seekers worldwide.",
    quote: "Let this Math be the center of all spiritual forces. Whoever comes here will find peace of mind and inspiration.",
    quoteAuthor: "Swami Vivekananda",
    imageCaption: "Peaceful waters of the river Ganges flowing by Belur Math beneath a terracotta dawn sky."
  },
  {
    date: "December 22",
    monthNumeric: 11,
    dayNumeric: 22,
    year: 1853,
    headline: "Advent of Holy Mother Sri Sarada Devi",
    narrativeParagraph1: "On this day, Sri Sarada Devi was born in the quiet village of Jayrambati, Bengal. Born to extremely simple, devout parents, she grew up in the lap of nature. Her marriage to Sri Ramakrishna was an entirely spiritual union, and she became his first disciple, observing his high spiritual states and absorbing his teachings of maternal love, patience, and non-judgment.",
    narrativeParagraph2: "Following Sri Ramakrishna's passing, Holy Mother became the beloved spiritual guide of the young monastic brotherhood and thousands of lay devotees. Her life of unconditioned motherly affection, quiet dignity, and endless patience represents the pinnacle of spiritual motherhood in the modern age.",
    quote: "If you want peace, do not look at another's faults. Rather look at your own. Learn to make the main world your own. No one is a stranger, my child.",
    quoteAuthor: "Holy Mother Sri Sarada Devi",
    imageCaption: "Spiritual diya glowing in front of the holy portrait of Holy Mother, bringing silent warm guidance."
  },
  {
    date: "December 24",
    monthNumeric: 11,
    dayNumeric: 24,
    year: 1886,
    headline: "Young Disciples Take Informal Serene Vows of Renunciation",
    narrativeParagraph1: "On Christmas Eve in 1886, Swami Vivekananda and his brother-disciples gathered around a sacred dhuni fire in the courtyard of Antpur, Kolkata, the village home of Swami Premananda. They spent the entire night in meditation and spiritual songs, chanting of ancient sages and the renunciation of worldly ties.",
    narrativeParagraph2: "Swamiji spoke with fiery eloquence about the life and self-sacrifice of Jesus Christ, urging his brothers to abandon all worldly pursuits to realize God and work for the salvation of humanity. Only later did they realize it was Christmas Eve, reinforcing the universal, Christ-like light that inspired their monastic brotherhood.",
    quote: "Let us carry our cross. The path of renunciation is steep, but it leads directly to the Light of the eternal Self.",
    quoteAuthor: "Swami Vivekananda",
    imageCaption: "Sacred dhuni fire crackling gently in the cool winter breeze, symbolizing spiritual purity and dedication."
  },
  {
    date: "December 24",
    monthNumeric: 11,
    dayNumeric: 24,
    year: 1932,
    headline: "Inauguration of the Ramakrishna Mission Students Home",
    narrativeParagraph1: "On December 24, 1932, Swami Shivananda, the second President of the Ramakrishna Order, formally dedicated the expansive new building of the Students' Home and charitable dispensary in Madras. Born out of the vision to provide free education and residential support to orphaned and underprivileged youth, this institute pioneered technical and value-based education.",
    narrativeParagraph2: "Operating on the principle of 'service to God in man,' the Students' Home became a glowing model of character-oriented instruction. Today, it stands as a legendary institution in South India, continuing to mold young minds in the spirit of self-reliance, dedication, and nation-building.",
    quote: "Give them character, give them strength, and they will carve their own paths. True education is that which fits one for life.",
    quoteAuthor: "Swami Shivananda",
    imageCaption: "A sacred clay lamp glowing brightly, symbolizing the fire of spiritual illumination lit on Kalpataru Day."
  }
];
