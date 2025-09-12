export type Lecture = {
  id: string;
  title: string;
  date: string;
  paragraphs: string[];
};

const rawLectures: Lecture[] = [
  {
    id: 'response-to-welcome',
    title: 'Response to Welcome',
    date: 'September 11, 1893',
    paragraphs: [
      'Sisters and Brothers of America,',
      'It fills my heart with joy unspeakable to rise in response to the warm and cordial welcome which you have given us. I thank you in the name of the most ancient order of monks in the world; I thank you in the name of the mother of religions; and I thank you in the name of millions and millions of Hindu people of all classes and sects.[1]',
      'My thanks, also, to some of the speakers on this platform who, referring to the delegates from the Orient, have told you that these men from far-off nations may well claim the honor of bearing to different lands the idea of toleration. I am proud to belong to a religion which has taught the world both tolerance and universal acceptance. We believe not only in universal toleration, but we accept all religions as true.[2] I am proud to belong to a nation which has sheltered the persecuted and the refugees of all religions and all nations of the earth.[1][2] I am proud to tell you that we have gathered in our bosom the purest remnant of the Israelites, who came to Southern India and took refuge with us in the very year in which their holy temple was shattered to pieces by Roman tyranny.[1][2] I am proud to belong to the religion which has sheltered and is still fostering the remnant of the grand Zoroastrian nation.[1][2]',
      'I will quote to you, brethren, a few lines from a hymn which I remember to have repeated from my earliest boyhood, which is every day repeated by millions of human beings: “As the different streams having their sources in different places all mingle their water in the sea, so, O Lord, the different paths which men take through different tendencies, various though they appear, crooked or straight, all lead to Thee.”[2]',
      'The present convention, which is one of the most august assemblies ever held, is in itself a vindication, a declaration to the world of the wonderful doctrine preached in the Gita: “Whosoever comes to Me, through whatsoever form, I reach him; all men are struggling through paths which in the end lead to me.”[2][3] Sectarianism, bigotry, and its horrible descendant, fanaticism, have long possessed this beautiful earth.[2][3] They have filled the earth with violence, drenched it often and often with human blood, destroyed civilization and sent whole nations to despair.[2][3]',
      'Had it not been for these horrible demons, human society would be far more advanced than it is now. But their time is come; and I fervently hope that the bell that tolled this morning in honour of this convention may be the death-knell of all fanaticism, of all persecutions with the sword or with the pen, and of all uncharitable feelings between persons wending their way to the same goal.[1][3]'
    ]
  },
  {
    id: 'why-we-disagree',
    title: 'Why We Disagree',
    date: 'September 15, 1893',
    paragraphs: [
      'I will tell you a little story. You have heard the eloquent speaker who has just finished say, "Let us cease from abusing each other," and he was very sorry that there should be always so much variance.',
      'But I think I should tell you a story which would illustrate the cause of this variance. A frog lived in a well. It had lived there for a long time. It was born there and brought up there, and yet was a little, small frog. Of course the evolutionists were not there then to tell us whether the frog lost its eyes or not, but, for our story\'s sake, we must take it for granted that it had its eyes, and that it every day cleansed the water of all the worms and bacilli that lived in it with an energy that would do credit to our modern bacteriologists. In this way it went on and became a little sleek and fat.',
      'Well, one day another frog that lived in the sea came and fell into the well.',
      '"Where are you from?"',
      '"I am from the sea."',
      '"The sea! How big is that? Is it as big as my well?" and he took a leap from one side of the well to the other.',
      '"My friend," said the frog of the sea, "how do you compare the sea with your little well?”',
      'Then the frog took another leap and asked, "Is your sea so big?"',
      '"What nonsense you speak, to compare the sea with your well!"',
      '"Well, then," said the frog of the well, "nothing can be bigger than my well; there can be nothing bigger than this; this fellow is a liar, so turn him out."[4]',
      'That has been the difficulty all the while. I am a Hindu. I am sitting in my own little well and thinking that the whole world is my little well. The Christian sits in his little well and thinks the whole world is his well. The Mohammedan sits in his little well and thinks that is the whole world. I have to thank you of America for the great attempt you are making to break down the barriers of this little world of ours, and hope that, in the future, the Lord will help you to accomplish your purpose.[4]'
    ]
  },
  {
    id: 'paper-on-hinduism',
    title: 'Paper on Hinduism',
    date: 'September 19, 1893',
    paragraphs: [
      'Three religions now stand in the world which have come down to us from time prehistoric — Hinduism, Zoroastrianism and Judaism. They have all received tremendous shocks and all of them prove by their survival their internal strength. But while Judaism failed to absorb Christianity and was driven out of its place of birth by its all-conquering daughter, and a handful of Parsees is all that remains to tell the tale of their grand religion, sect after sect arose in India and seemed to shake the religion of the Vedas to its very foundations, but like the waters of the seashore in a tremendous earthquake it receded only for a while, only to return in an all-absorbing flood, a thousand times more vigorous, and when the tumult of the rush was over, these sects were all sucked in, absorbed, and assimilated into the immense body of the mother faith.[5]',
      'From the high spiritual flights of the Vedanta philosophy, of which the latest discoveries of science seem like echoes, to the low ideas of idolatry with its multifarious mythology, the agnosticism of the Buddhists, and the atheism of the Jains, each and all have a place in the Hindu\'s religion.',
      'Where is the common basis upon which all these seemingly hopeless contradictions rest? And this is the question I shall attempt to answer.',
      'The Hindus have received their religion through revelation, the Vedas. They hold that the Vedas are without beginning and without end. It may sound ludicrous to this audience, how a book can be without beginning or end. But by the Vedas no books are meant. They mean the accumulated treasury of spiritual laws discovered by different persons in different times.[5]',
      'The Hindu believes that he is a spirit. Him the sword cannot pierce — him the fire cannot burn — him the water cannot melt — him the air cannot dry. The Hindu believes that every soul is a circle whose circumference is nowhere, but whose centre is located in the body, and that death means the change of this centre from body to body. Nor is the soul bound by the conditions of matter. In its very essence it is free, unbounded, holy, pure, and perfect. But somehow or other it finds itself tied down to matter, and thinks of itself as matter.[6]',
      'To the Hindu, then, the whole world of religions is only a traveling, a coming up, of different men and women, through various conditions and circumstances, to the same goal. Every religion is only evolving a God out of the material man, and the same God is the inspirer of all of them. Why, then, are there so many contradictions? They are only apparent, says the Hindu. The contradictions come from the same truth adapting itself to the varying circumstances of different natures.[7]',
      'It is the same light coming through glasses of different colours. And these little variations are necessary for purposes of adaptation. But in the heart of everything the same truth reigns. The Lord has declared to the Hindu in His incarnation as Krishna, “I am in every religion as the thread through a string of pearls. Wherever thou seest extraordinary holiness and extraordinary power raising and purifying humanity, know thou that I am there.”[8]'
    ]
  },
  {
    id: 'religion-not-crying-need',
    title: 'Religion not the Crying Need of India',
    date: 'September 20, 1893',
    paragraphs: [
      'Christians must always be ready for good criticism, and I hardly think that you will mind if I make a little criticism. You Christians, who are so fond of sending out missionaries to save the soul of the heathen — why do you not try to save their bodies from starvation?[9] In India, during the terrible famines, thousands died from hunger, yet you Christians did nothing.[6][9] You erect churches all through India, but the crying evil in the East is not religion — they have religion enough — but it is bread that the suffering millions of burning India cry out for with parched throats.[6][9] They ask us for bread, but we give them stones. It is an insult to a starving people to offer them religion; it is an insult to a starving man to teach him metaphysics.[6][9] In India, a priest that preached for money would lose caste and be spat upon by the people. I came here to seek aid for my impoverished people, and I fully realised how difficult it was to get help for heathens from Christians in a Christian land.'
    ]
  },
  {
    id: 'buddhism-fulfillment-of-hinduism',
    title: 'Buddhism, the Fulfillment of Hinduism',
    date: 'September 26, 1893',
    paragraphs: [
      'I am not a Buddhist, as you have heard, and yet I am. If China, or Japan, or Ceylon follow the teachings of the Great Master, India worships him as God incarnate on earth. You have just now heard that I am going to criticise Buddhism, but by that I wish you to understand only this. Far be it from me to criticise him whom I worship as God incarnate on earth. But our views about Buddha are that he was not understood properly by his disciples.[10]',
      'The relation between Hinduism (by Hinduism, I mean the religion of the Vedas) and what is called Buddhism at the present day is nearly the same as between Judaism and Christianity. Jesus Christ was a Jew, and Shâkya Muni was a Hindu. The Jews rejected Jesus Christ, nay, crucified him, and the Hindus have accepted Shâkya Muni as God and worship him.[10][11]',
      'But the real difference that we Hindus want to show between modern Buddhism and what we should understand as the teachings of Lord Buddha lies principally in this: Shâkya Muni came to preach nothing new. He also, like Jesus, came to fulfil and not to destroy.[10][11]',
      'The religion of the Hindus is divided into two parts: the ceremonial and the spiritual. The spiritual portion is specially studied by the monks. In that there is no caste. A man from the highest caste and a man from the lowest may become a monk in India, and the two castes become equal. In religion there is no caste; caste is simply a social institution. Shâkya Muni himself was a monk, and it was his glory that he had the large-heartedness to bring out the truths from the hidden Vedas and throw them broadcast all over the world. He was the first being in the world who brought missionarising into practice — nay, he was the first to conceive the idea of proselytising.[10]',
      'Hinduism cannot live without Buddhism, nor Buddhism without Hinduism. Then realise what the separation has shown to us, that the Buddhists cannot stand without the brain and philosophy of the Brahmins, nor the Brahmin without the heart of the Buddhist. This separation between the Buddhists and the Brahmins is the cause of the downfall of India. That is why India is populated by three hundred millions of beggars, and that is why India has been the slave of conquerors for the last thousand years. Let us then join the wonderful intellect of the Brahmins with the heart, the noble soul, the wonderful humanising power of the Great Master.[10][12]'
    ]
  },
  {
    id: 'address-final-session',
    title: 'Address at the Final Session',
    date: 'September 27, 1893',
    paragraphs: [
      'The World\'s Parliament of Religions has become an accomplished fact, and the merciful Father has helped those who labored to bring it into existence, and crowned with success their most unselfish labor.[13] My thanks to those noble souls whose large hearts and love of truth first dreamed this wonderful dream and then realised it. My thanks to the shower of liberal sentiments that has overflowed this platform. My thanks to this enlightened audience for their uniform kindness to me and for their appreciation of every thought that tends to smooth the friction of religions.[13]',
      'A few jarring notes were heard from time to time in this harmony. My special thanks to them, for they have, by their striking contrast, made general harmony the sweeter.[13]',
      'Much has been said of the common ground of religious unity. I am not going just now to venture my own theory. But if any one here hopes that this unity will come by the triumph of any one of the religions and the destruction of the others, to him I say, “Brother, yours is an impossible hope.” Do I wish that the Christian would become Hindu? God forbid. Do I wish that the Hindu or Buddhist would become Christian? God forbid.[13]',
      'The seed is put in the ground, and earth and air and water are placed around it. Does the seed become the earth, or the air, or the water? No. It becomes a plant, it develops after the law of its own growth, assimilates the air, the earth, and the water, converts them into plant substance, and grows into a plant.',
      'Similar is the case with religion. The Christian is not to become a Hindu or a Buddhist, nor a Hindu or a Buddhist to become a Christian. But each must assimilate the spirit of the others and yet preserve his individuality and grow according to his own law of growth.[13]',
      'If the Parliament of Religions has shown anything to the world it is this: It has proved to the world that holiness, purity and charity are not the exclusive possessions of any church in the world, and that every system has produced men and women of the most exalted character. In the face of this evidence, if anybody dreams of the exclusive survival of his own religion and the destruction of the others, I pity him from the bottom of my heart, and point out to him that upon the banner of every religion will soon be written, in spite of resistance: “Help and not Fight,” “Assimilation and not Destruction,” “Harmony and Peace and not Dissension.”'
    ]
  }

];


// Helper: strip citation markers like [1], [2], [10], etc. from text
function stripSquareBracketNumbers(text: string): string {
  return text.replace(/\[\d+\]/g, '');
}

// Export cleaned lectures (all [number] markers removed)
export const vivekanandaLectures: Lecture[] = rawLectures.map(lec => ({
  ...lec,
  paragraphs: lec.paragraphs.map(p => stripSquareBracketNumbers(p)),
}));

