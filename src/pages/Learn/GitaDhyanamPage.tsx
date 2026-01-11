import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Verse {
  verse: number;
  transliteration: string;
}

const gitaDhyanamVerses: Verse[] = [
  {
    verse: 1,
    transliteration: "ōm pārthāya pratibōdhitāṁ bhagavatā\nnārāyaṇēna svayam\nvyāsēna grathitām purāṇamuninā\nmadhyē mahābhāratam |\nadvaitāmṛta-varṣiṇīṁ bhagavatīm\naṣṭādaśādhyāyinīm\namba tvām anusandadhāmi\nbhagavadgītē bhavadvēsinīm ||1||"
  },
  {
    verse: 2,
    transliteration: "namō'stutē vyāsa viśāla buddhē\nphullāravindāyata patranētra |\nyēnatvayā bhārata taila pūrṇaḥ\nprajvālitō jñāna mayaḥ pradīpaḥ ||2||"
  },
  {
    verse: 3,
    transliteration: "prapanna pārijātāya\ntōtravētraika pāņayē |\njñānamudrāya kṛṣṇāya\ngītāmṛtaduhē namaḥ ||3||"
  },
  {
    verse: 4,
    transliteration: "vasudēva sutaṁ dēvam\nkamsa cāņūra mardanam |\ndēvakī paramānandam\nkṛṣṇaṁ vandē jagadgurum ||4||"
  },
  {
    verse: 5,
    transliteration: "bhīṣmadrōnatațā jayadrathajalā\ngāndhāra nīlōtpalā\nśalyagrāhavatī kṛpēņa vahanī\nkarņēna vēlākulā |\naśvatthāma vikarņa ghōramakarā\nduryōdhanāvartinī\nsōttīrņā khalu pāņdavai raņanadī\nkaivartakaḥ kēśavaḥ ||5||"
  },
  {
    verse: 6,
    transliteration: "pārāśarya vacassarōjamamalam\ngītārtha gandhōtkațam\nnānākhyānaka kēsaram harikathā\nsambōdhanā bōdhitam |\nlōkē sajjana șatpadairaharahah\npēpīyamānam mudā\nbhūyāt bhārata pańkajam kalimala\npradhvamsinaḥ śrēyasē ||6||"
  },
  {
    verse: 7,
    transliteration: "mūkam karōti vācālam\npangum langhayatē girim |\nyat kṛpā tamaham vandē\nparamānanda mādhavam ||7||"
  },
  {
    verse: 8,
    transliteration: "śāntākāraṁ bhujagaśayanam\npadmanābham surēśam\nviśvādhāraṁ gaganasadṛśam\nmēghavarṇaṁ śubhāngam|\nlakṣmīkāntam kamalanayanam\nyōgihṛddhyānagamyam\nvandē vişnum bhavabhayaharam\nsarva lõkaikanātham||8||"
  },
  {
    verse: 9,
    transliteration: "yam brahmāvaruņēndrarudramarutaḥ\nstunvanti divyaiḥ stavaiḥ\nvēdaiḥ sāngapadakramōpaniṣşadaih\ngāyanti yam sāmagāḥ|\ndhyānāvasthita tadgatēna manasā\npaśyanti yam yōginaḥ\nyasyāntam na vidussurāsuraganāḥ\ndēvāya tasmai namaḥ||9||"
  },
  {
    verse: 10,
    transliteration: "nārāyaṇaṁ namaskṛtya\nnarañcaiva narōttamam |\ndēvīṁ sarasvatīṁ vyāsam\ntatō jayamudīrayēt||10||"
  },
  {
    verse: 11,
    transliteration: "saccidānandarūpāya\nkṛṣṇāyākliṣṭakāriṇē |\nnamō vēdāntavēdyāya\nguravē buddhisākṣiṇē||11||"
  },
  {
    verse: 12,
    transliteration: "sarvōpaniṣadō gāvaḥ\ndōgdhā gōpālanandanaḥ|\npārthō vatsaḥ sudhīrbhōktā\ndugdham gītāmṛtaṁ mahat||12||"
  },
  {
    verse: 13,
    transliteration: "gītāśāstramidam punyam\nyah pathēt prayataḥ pumānl\nvişnōḥ padamavāpnōti\nbhaya-śōkādi varjitaḥ||13||"
  },
  {
    verse: 14,
    transliteration: "ēkaṁ śāstram dēvakīputragītam\nēkō dēvē dēvakīputra ēval\nēkō mantrastasya nāmāni yāni\nkarmāpyēkam tasya dēvasya sēvāl|14||"
  }
];

const GitaDhyanamPage = () => {
  return (
    <PageLayout title="Gita Dhyanam - Invocation to the Bhagavad Gita">
      <div className="w-full bg-gradient-to-br from-spiritual-50 to-indian-cream py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Link to="/learn#mantras" className="inline-flex items-center text-spiritual-600 hover:text-spiritual-700 mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Mantras
              </Link>
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2 text-spiritual-800">
                Gita Dhyanam
              </h1>
              <h2 className="text-xl text-gray-600 mb-4">Invocation to the Bhagavad Gita</h2>
              <p className="text-gray-500 mb-4">14 verses</p>
              <div className="bg-white p-4 rounded-lg border border-spiritual-200">
                <p className="text-gray-700">
                  The Gita Dhyanam (also called Gita Dhyana Slokas) are meditative verses traditionally recited before studying the Bhagavad Gita. These verses invoke the blessings of Lord Krishna, Sage Vyasa, and the divine Mother Gita herself, preparing the mind for the sacred study ahead.
                </p>
              </div>
            </div>

            {/* Final Invocation */}
            <div className="mb-8">
              <Card className="bg-gradient-to-br from-spiritual-100 to-white border-2 border-spiritual-400">
                <CardContent className="p-6">
                  <h3 className="text-lg font-heading font-semibold mb-4 text-spiritual-800 text-center">
                    Final Invocation
                  </h3>
                  <div className="text-center">
                    <p className="text-xl font-sans leading-relaxed text-spiritual-700">
                      ||ōṁ śrī kṛṣṇāya paramātmanē namaḥ||
                    </p>
                    <p className="text-sm text-gray-600 mt-2 italic">
                      Om, salutations to Lord Krishna, the Supreme Self
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Verses */}
            <div className="space-y-6">
              {gitaDhyanamVerses.map((verse) => (
                <Card key={verse.verse} className="bg-gradient-to-br from-indian-cream to-white border border-spiritual-300 pop-shadow-card">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-heading font-semibold text-spiritual-700">
                        Verse {verse.verse}
                      </h3>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-600 mb-2">Transliteration</h4>
                      <p className="text-lg font-sans leading-relaxed whitespace-pre-line">
                        {verse.transliteration}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-12">
              <Link to="/learn#mantras">
                <Button variant="outline">
                  ← Back to Mantras
                </Button>
              </Link>
              <Link to="/learn/bhagavad-gita/chapter/1" className="ml-auto">
                <Button variant="outline">
                  Chapter 1 →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default GitaDhyanamPage;

