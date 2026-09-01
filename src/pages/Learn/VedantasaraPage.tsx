import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import FlipCardQuiz from '../../components/learn/FlipCardQuiz';
import { vedantasaraCards } from '../../data/vedantasaraCards';
import { cn } from '@/lib/utils';

const VedantasaraPage = () => {
  const [showQuiz, setShowQuiz] = useState(false);
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
    <PageLayout title="Vedāntasāra Flip Card Quiz (In Development)">
      <div className="min-h-screen w-full bg-gradient-to-b from-indian-cream via-white to-indian-cream/30">
        <div className="sticky top-20 z-10 bg-white/95 backdrop-blur-sm border-b border-indian-saffron/20 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between text-sm">
              <span className="inline-flex items-center text-spiritual-500">
                <BookOpen className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Vedāntasāra</span>
              </span>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-foreground font-medium">Flip Card Quiz</span>
              </div>
              <span className="text-xs font-medium text-indian-saffron">In development</span>
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
                <div className="mt-6 mx-auto max-w-xl rounded-xl border border-dashed border-indian-saffron/50 bg-indian-cream/80 px-4 py-3 text-sm text-gray-700">
                  <p className="font-semibold text-indian-saffron">This feature is in development</p>
                  <p className="mt-1">
                    It is not linked from the rest of the site. Please share feedback with us if you were given this page to try.
                  </p>
                </div>
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
                    These flip cards follow that order. The front shows a term from the text; the back gives the
                    meaning used in the Ramakrishna-Vedanta tradition.
                  </p>

                  <h3>The six chapters</h3>
                  <ul>
                    <li><strong>I. Preliminaries</strong> — the student, the four means, and the need for a Guru</li>
                    <li><strong>II. Superimposition</strong> — adhyāsa (the mistake), adhyāropa (the teaching method), the three bodies, the five sheaths, and Turīya</li>
                    <li><strong>III. The Jīva</strong> — the individual self and other accounts of its nature</li>
                    <li><strong>IV. De-superimposition</strong> — “Tat tvam asi” and the implied meaning of the mahāvākya</li>
                    <li><strong>V. The Means</strong> — śravaṇa, manana, nididhyāsana, and samādhi</li>
                    <li><strong>VI. Liberation</strong> — the jīvanmukta, videhamukti, and kaivalya</li>
                  </ul>

                  <h3>How to use the cards</h3>
                  <ul>
                    <li>Read the term and try to recall its meaning</li>
                    <li>Tap the card to flip it</li>
                    <li>Mark <strong>I knew this</strong> or <strong>Need review</strong></li>
                    <li>Filter by chapter, or shuffle the deck, whenever you like</li>
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
                      Flip through {vedantasaraCards.length} cards drawn from Vedāntasāra
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
                      Start Flip Card Quiz
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="p-6 rounded-xl border shadow-md bg-white border-indian-saffron/30">
                    <h3 className="text-xl font-heading font-semibold mb-6 text-gray-900">
                      Knowledge Check
                    </h3>
                    <FlipCardQuiz cards={vedantasaraCards} />
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
