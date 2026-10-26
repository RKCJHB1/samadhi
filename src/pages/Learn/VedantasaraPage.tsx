import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import FlipCardQuiz from '../../components/learn/FlipCardQuiz';
import VedantaPath from '../../components/learn/VedantaPath';
import { vedantasaraCards } from '../../data/vedantasaraCards';
import { cn } from '@/lib/utils';

const VedantasaraPage = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [studyMode, setStudyMode] = useState<'path' | 'deck'>('path');
  const quizRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, nofollow';
    document.head.appendChild(robots);
    return () => {
      document.head.removeChild(robots);
    };
  }, []);

  return (
    <PageLayout title="Vedāntasāra Flip Card Quiz">
      <div className="min-h-screen w-full bg-gradient-to-b from-indian-cream via-white to-indian-cream/30">
        <div className="sticky top-20 z-10 bg-white/95 backdrop-blur-sm border-b border-indian-saffron/20 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="grid grid-cols-3 items-center text-sm">
              <span className="inline-flex items-center text-spiritual-500">
                <BookOpen className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Vedāntasāra</span>
              </span>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <span className="text-foreground font-medium">Flip Card Quiz</span>
              </div>
              <span />
            </div>
            <div className="mt-2 h-1 bg-indian-saffron/20 rounded-full overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-indian-saffron to-spiritual-500 rounded-full" />
            </div>
          </div>
        </div>

        <div>
          <div className="flex max-w-6xl mx-auto justify-center">
            <article className="flex-1 max-w-3xl px-4 py-8 md:py-12">
              <header className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-spiritual-100 text-spiritual-700 rounded-full text-sm font-medium mb-4">
                  <BookOpen className="w-4 h-4" />
                  Vedanta
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-4 text-gray-900">
                  Vedāntasāra
                </h1>
                <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
                  Flip cards for the Essence of Vedanta — Sadānanda's primer on Advaita
                </p>
              </header>

              <div className="lesson-content">
                <div
                  className={cn(
                    'prose max-w-none',
                    'prose-headings:font-heading',
                    'prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900',
                    'prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-indian-saffron/30',
                    'prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-spiritual-700',
                    'prose-p:leading-relaxed prose-li:leading-relaxed',
                    'prose-p:mb-4',
                    'prose-li:my-1',
                    'prose-strong:font-semibold',
                    'prose-img:rounded-xl prose-img:shadow-md prose-img:my-6'
                  )}
                >
                  <h2>What is Vedāntasāra?</h2>
                  <div className="text-center mb-6">
                    <img
                      src="/pics/vedanta.jpeg"
                      alt="Vedanta — the essence of the Upaniṣads"
                      className="mx-auto rounded-lg shadow-md max-w-md w-full"
                    />
                    <p className="text-sm text-gray-600 mt-2 italic">
                      Vedanta — the essence of the Upaniṣads
                    </p>
                  </div>
                  <p>
                    <strong>Vedāntasāra</strong>, the <strong>Essence of Vedanta</strong>, is a fifteenth-century
                    Advaita primer by Sadānanda Yogīndra Sarasvatī. In about 227 verses it sets out the method of
                    Vedanta: who is qualified to study, how the world is superimposed on Brahman, how that
                    superimposition is removed, and what liberation looks like.
                  </p>
                  <p>
                    These cards follow that order. You can start from the term or from the meaning. The
                    wording is the one used in the Ramakrishna-Vedanta tradition.
                  </p>

                  <h2>What is Brahman?</h2>
                  <p>The first verse describes Brahman as:</p>
                  <div className="not-prose my-6 rounded-xl border border-indian-saffron/40 bg-gradient-to-br from-indian-cream to-white px-6 py-5 text-center shadow-sm">
                    <p className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                      Akhaṇḍam Sat-Cit-Ānandam
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Indivisible Existence–Consciousness–Bliss
                    </p>
                  </div>
                  <ul>
                    <li><strong>Akhaṇḍam</strong> — Indivisible / undivided</li>
                    <li><strong>Sat-Cit-Ānanda</strong> — Existence, Consciousness, and Bliss</li>
                    <li>Beyond the reach of words and thought, and the substratum (base) of everything</li>
                  </ul>
                  <p>This pure Consciousness is our real nature.</p>

                  <h2>1. The Four Preliminaries (Anubandha-catuṣṭaya)</h2>
                  <div className="not-prose grid sm:grid-cols-2 gap-3 my-6">
                    {[
                      {
                        term: 'Adhikārī',
                        sanskrit: 'अधिकारी',
                        meaning: 'Who is fit to study?',
                      },
                      {
                        term: 'Viṣaya',
                        sanskrit: 'विषय',
                        meaning: 'What is the subject matter for study? (identity of jīva and Brahman)',
                      },
                      {
                        term: 'Sambandha',
                        sanskrit: 'सम्बन्ध',
                        meaning: 'What is the connection of the text to the subject?',
                      },
                      {
                        term: 'Prayojana',
                        sanskrit: 'प्रयोजन',
                        meaning: 'What is the benefit? (liberation)',
                      },
                    ].map((item) => (
                      <div
                        key={item.term}
                        className="rounded-xl border border-indian-saffron/30 bg-white px-4 py-3 shadow-sm"
                      >
                        <p className="text-xs font-medium uppercase tracking-wide text-indian-saffron">
                          {item.sanskrit}
                        </p>
                        <p className="font-heading font-semibold text-gray-900 mt-0.5">{item.term}</p>
                        <p className="text-sm text-gray-700 mt-1 leading-relaxed">{item.meaning}</p>
                      </div>
                    ))}
                  </div>

                  <h2>2. The Four Qualifications (Sādhana-catuṣṭaya)</h2>
                  <ul>
                    <li><strong>Viveka</strong> — discrimination</li>
                    <li><strong>Vairāgya</strong> — dispassion</li>
                    <li>
                      <strong>Ṣaṭsampatti</strong> — the six disciplines/virtues:{' '}
                      śama, dama, uparati, titikṣā, śraddhā, samādhāna
                    </li>
                    <li><strong>Mumukṣutva</strong> — desire for freedom</li>
                  </ul>

                  <h2>3. Preparing the Mind</h2>
                  <p>
                    <strong>Nitya</strong> (daily), <strong>naimittika</strong> (occasional) and{' '}
                    <strong>prāyaścitta</strong> (expiatory) actions purify the mind. Meditative
                    worship/contemplation (<strong>upāsanā</strong>) makes it steady. Neither gives
                    liberating knowledge by itself. A guru is essential.
                  </p>

                  <h2>4. Ajñāna (Ignorance) and Superimposition (Adhyāsa)</h2>
                  <p>
                    <strong>Ajñāna</strong> is ignorance of our true nature. Because of it, we identify
                    the Self with the limited body-mind. This gives rise to <strong>adhyāsa</strong>{' '}
                    (superimposition) — the mistaken attribution of the characteristics of one thing
                    to another, illustrated by seeing a snake where there is only a rope.
                  </p>

                  <h3>How Brahman is spoken of as Īśvara (crystal example)</h3>
                  <div className="not-prose grid sm:grid-cols-3 gap-3 my-6">
                    {[
                      {
                        label: 'Colourless crystal',
                        meaning: 'Brahman, which is itself without attributes',
                      },
                      {
                        label: 'Red rose',
                        meaning: 'The upādhi (limiting adjunct), representing māyā',
                      },
                      {
                        label: 'Crystal appearing red',
                        meaning: 'Brahman as Īśvara, associated with māyā',
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-spiritual-200 bg-gradient-to-br from-white to-spiritual-50 px-4 py-3 shadow-sm"
                      >
                        <p className="font-heading font-semibold text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-700 mt-1 leading-relaxed">{item.meaning}</p>
                      </div>
                    ))}
                  </div>
                  <p>
                    The crystal itself never becomes red. Similarly, Brahman does not undergo a real
                    change; Īśvara is Brahman viewed in association with māyā.
                  </p>

                  <h2>5. The Teaching Method: Adhyāropa–Apavāda</h2>
                  <ul>
                    <li>
                      <strong>Adhyāropa</strong> = provisional superimposition used for explanation
                      and teaching.
                    </li>
                    <li>
                      <strong>Apavāda</strong> = subsequent negation or removal of the superimposed
                      attributes and mistaken identifications.
                    </li>
                  </ul>
                  <p>
                    The teaching provisionally works with distinctions such as world, Īśvara, and
                    individual for the purpose of explanation, and then progressively resolves
                    mistaken identifications and their supposed independent reality, revealing the
                    non-dual Self.
                  </p>

                  <div className="not-prose my-8 rounded-xl border-l-4 border-indian-saffron bg-indian-cream/70 px-5 py-4 shadow-sm">
                    <p className="text-gray-800 leading-relaxed">
                      Brahman (akhaṇḍa Sat-Cit-Ānanda) alone is absolute reality. The world and the
                      individual are experienced through māyā and ignorance, while Īśvara is Brahman
                      associated with māyā. Through provisional teaching and subsequent negation,
                      ignorance is removed and our ever-present identity as Brahman is recognized.
                    </p>
                  </div>

                  <h3>The six chapters</h3>
                  <ul>
                    <li><strong>I. Preliminaries</strong> — the student, the four means, and the need for a Guru</li>
                    <li><strong>II. Superimposition</strong> — adhyāsa (the mistake), adhyāropa (the teaching method), pañcīkaraṇa, the three bodies, the five sheaths, and Turīya</li>
                    <li><strong>III. The Jīva</strong> — the individual self and the witness (sākṣin), which close the first half</li>
                    <li><strong>IV. De-superimposition</strong> — the mahāvākya “Tat tvam asi” and its implied meaning</li>
                    <li><strong>V. The Means</strong> — śravaṇa, manana, nididhyāsana, samādhi, and the obstacles to absorption</li>
                    <li><strong>VI. Liberation</strong> — sañcita, prārabdha, and āgāmin karma, the jīvanmukta, videhamukti, and kaivalya</li>
                  </ul>

                  <h3>How to use the cards</h3>
                  <ul>
                    <li>Follow the guided path for the first half: the student, the provisional world, and the jīva.</li>
                    <li>Each section asks you to place names, put a list in order, or read a short scene.</li>
                    <li>The practice deck keeps the whole glossary. A session starts with 10 cards.</li>
                    <li>Your place on the path, and your card marks, stay in this browser.</li>
                  </ul>
                </div>
              </div>

              <div className="mt-12" ref={quizRef}>
                {!showQuiz ? (
                  <div className="text-center p-8 rounded-xl border-2 border-dashed bg-gradient-to-br from-indian-cream to-white border-indian-saffron/40">
                    <h3 className="text-xl font-heading font-semibold mb-2 text-gray-900">
                      Ready to test your knowledge?
                    </h3>
                    <p className="mb-4 text-muted-foreground">
                      A guided path through the first half, then the practice deck of {vedantasaraCards.length} cards. Your place stays on this device.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setShowQuiz(true);
                        window.setTimeout(() => {
                          quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 50);
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indian-saffron to-spiritual-500 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      Start
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="p-6 rounded-xl border shadow-md bg-white border-indian-saffron/30">
                    <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Study">
                      <button
                        type="button"
                        role="tab"
                        aria-selected={studyMode === 'path'}
                        onClick={() => setStudyMode('path')}
                        className={cn(
                          'px-3 py-1.5 rounded-full text-sm border',
                          studyMode === 'path'
                            ? 'bg-indian-saffron text-white border-indian-saffron'
                            : 'bg-white text-gray-700 border-indian-saffron/30',
                        )}
                      >
                        Guided path
                      </button>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={studyMode === 'deck'}
                        onClick={() => setStudyMode('deck')}
                        className={cn(
                          'px-3 py-1.5 rounded-full text-sm border',
                          studyMode === 'deck'
                            ? 'bg-indian-saffron text-white border-indian-saffron'
                            : 'bg-white text-gray-700 border-indian-saffron/30',
                        )}
                      >
                        Practice deck
                      </button>
                    </div>
                    {studyMode === 'path' ? <VedantaPath /> : <FlipCardQuiz cards={vedantasaraCards} />}
                  </div>
                )}
              </div>
            </article>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default VedantasaraPage;
