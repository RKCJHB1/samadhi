import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  RefreshCcw,
  RotateCw,
  Shuffle,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import {
  VEDANTASARA_CHAPTERS,
  VedantasaraCard,
  VedantasaraChapterId,
  getVedantasaraChapter,
} from '../../data/vedantasaraCards';
import './FlipCardQuiz.css';

type Mark = 'known' | 'review';

interface FlipCardQuizProps {
  cards: VedantasaraCard[];
  onComplete?: (known: number, total: number) => void;
}

const shuffleIds = (ids: string[]) => {
  const next = [...ids];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
};

const FlipCardQuiz: React.FC<FlipCardQuizProps> = ({ cards, onComplete }) => {
  const [chapterFilter, setChapterFilter] = useState<VedantasaraChapterId | 'all'>('all');
  const [deckIds, setDeckIds] = useState<string[]>(() => cards.map((card) => card.id));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [marks, setMarks] = useState<Record<string, Mark>>({});
  const [showResults, setShowResults] = useState(false);

  const filteredCards = useMemo(() => {
    if (chapterFilter === 'all') return cards;
    return cards.filter((card) => card.chapter === chapterFilter);
  }, [cards, chapterFilter]);

  const cardById = useMemo(() => {
    return new Map(cards.map((card) => [card.id, card]));
  }, [cards]);

  const resetDeck = useCallback((source: VedantasaraCard[], shuffled = false) => {
    const ids = source.map((card) => card.id);
    setDeckIds(shuffled ? shuffleIds(ids) : ids);
    setIndex(0);
    setFlipped(false);
    setMarks({});
    setShowResults(false);
  }, []);

  useEffect(() => {
    resetDeck(filteredCards);
  }, [filteredCards, resetDeck]);

  const current = cardById.get(deckIds[index]);
  const total = deckIds.length;
  const knownCount = Object.values(marks).filter((mark) => mark === 'known').length;
  const reviewCount = Object.values(marks).filter((mark) => mark === 'review').length;
  const answeredCount = Object.keys(marks).length;
  const progress = total === 0 ? 0 : ((index + (flipped ? 0.5 : 0)) / total) * 100;

  const finishQuiz = useCallback((finalMarks: Record<string, Mark>) => {
    const completeMarks = { ...finalMarks };
    deckIds.forEach((id) => {
      if (!completeMarks[id]) completeMarks[id] = 'review';
    });
    setMarks(completeMarks);
    const known = Object.values(completeMarks).filter((mark) => mark === 'known').length;
    setShowResults(true);
    onComplete?.(known, deckIds.length);

    const percentage = deckIds.length === 0 ? 0 : known / deckIds.length;
    if (percentage === 1) {
      confetti({ particleCount: 160, spread: 80, origin: { y: 0.65 }, colors: ['#FF9933', '#FFD700', '#FFA500'] });
    } else if (percentage >= 0.8) {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.65 }, colors: ['#FF9933', '#F1A912'] });
    }
  }, [deckIds, onComplete]);

  const handleMark = useCallback((mark: Mark) => {
    if (!current) return;
    const nextMarks = { ...marks, [current.id]: mark };
    setMarks(nextMarks);
    setFlipped(false);

    if (index < deckIds.length - 1) {
      setIndex(index + 1);
    } else {
      finishQuiz(nextMarks);
    }
  }, [current, marks, index, deckIds.length, finishQuiz]);

  const goTo = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= deckIds.length) return;
    setIndex(nextIndex);
    setFlipped(false);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (showResults || !current) return;
      const target = event.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;

      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        setFlipped((value) => !value);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        if (index < deckIds.length - 1) {
          setIndex(index + 1);
          setFlipped(false);
        }
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        if (index > 0) {
          setIndex(index - 1);
          setFlipped(false);
        }
      } else if (flipped && (event.key === '1' || event.key.toLowerCase() === 'k')) {
        handleMark('known');
      } else if (flipped && (event.key === '2' || event.key.toLowerCase() === 'r')) {
        handleMark('review');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showResults, current, flipped, index, deckIds.length, handleMark]);

  if (filteredCards.length === 0) {
    return <p className="text-muted-foreground">No cards in this chapter yet.</p>;
  }

  if (showResults) {
    const percentage = Math.round((knownCount / total) * 100);
    const missed = deckIds
      .map((id) => cardById.get(id))
      .filter((card): card is VedantasaraCard => Boolean(card) && marks[card.id] === 'review');

    let message = 'Keep practising — these terms grow clearer with repetition.';
    let emoji = '💪';
    if (percentage === 100) {
      message = 'Perfect recall. The terms of Vedāntasāra are at your fingertips.';
      emoji = '🏆';
    } else if (percentage >= 80) {
      message = 'Excellent. A little review will make this knowledge firm.';
      emoji = '🌟';
    } else if (percentage >= 60) {
      message = 'Good progress. Flip the missed cards once more.';
      emoji = '👍';
    }

    return (
      <div className="animate-in fade-in duration-500">
        <div className="text-center py-6 mb-6 bg-gradient-to-br from-indian-saffron/10 to-spiritual-100/30 rounded-xl">
          <div className="text-6xl mb-3">{emoji}</div>
          <div className="text-4xl font-bold text-gray-900 mb-2">
            {knownCount}/{total}
          </div>
          <div className="text-lg text-gray-600 mb-1">{percentage}% recalled</div>
          <p className="text-gray-700 font-medium px-4">{message}</p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
            <Check className="w-5 h-5 text-green-500" />
            <span className="font-medium text-green-700">{knownCount} known</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-lg border border-red-200">
            <X className="w-5 h-5 text-red-500" />
            <span className="font-medium text-red-700">{reviewCount} to review</span>
          </div>
        </div>

        {missed.length > 0 && (
          <div className="space-y-3 mb-6">
            {missed.map((card) => {
              const chapter = getVedantasaraChapter(card.chapter);
              return (
                <div
                  key={card.id}
                  className="p-4 rounded-xl border border-l-4 border-l-indian-saffron bg-indian-cream/40 border-indian-saffron/20"
                >
                  <p className="text-xs font-medium text-indian-saffron mb-1">
                    {chapter.roman}. {chapter.title}
                  </p>
                  <p className="font-semibold text-gray-900">{card.term}</p>
                  <p className="text-sm text-gray-700 mt-1 leading-relaxed">{card.definition}</p>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={() => resetDeck(filteredCards)} variant="outline" className="gap-2">
            <RefreshCcw className="w-4 h-4" /> Try again
          </Button>
          {missed.length > 0 && (
            <Button
              onClick={() => resetDeck(missed)}
              className="gap-2 bg-indian-saffron hover:bg-indian-saffron/90"
            >
              Review missed cards
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (!current) return null;

  const chapter = getVedantasaraChapter(current.chapter);
  const currentMark = marks[current.id];

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex flex-wrap gap-2 mb-5">
        <button
          type="button"
          onClick={() => setChapterFilter('all')}
          className={cn(
            'px-3 py-1.5 rounded-full text-sm border transition-colors',
            chapterFilter === 'all'
              ? 'bg-indian-saffron text-white border-indian-saffron'
              : 'bg-white text-gray-700 border-indian-saffron/30 hover:border-indian-saffron'
          )}
        >
          All ({cards.length})
        </button>
        {VEDANTASARA_CHAPTERS.map((item) => {
          const count = cards.filter((card) => card.chapter === item.id).length;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setChapterFilter(item.id)}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm border transition-colors',
                chapterFilter === item.id
                  ? 'bg-indian-saffron text-white border-indian-saffron'
                  : 'bg-white text-gray-700 border-indian-saffron/30 hover:border-indian-saffron'
              )}
            >
              {item.roman}. {item.title} ({count})
            </button>
          );
        })}
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Card {index + 1} of {total}</span>
          <span>{answeredCount} marked</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indian-saffron to-orange-500 transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span className="text-green-700">{knownCount} known</span>
          <span className="text-indian-saffron">{reviewCount} to review</span>
        </div>
      </div>

      <button
        type="button"
        aria-pressed={flipped}
        aria-label={flipped ? 'Show term' : 'Show definition'}
        onClick={() => setFlipped((value) => !value)}
        className="flip-card-scene appearance-none block w-full h-72 sm:h-80 mb-4 text-left cursor-pointer p-0 border-0 bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indian-saffron focus-visible:ring-offset-2 rounded-xl"
      >
        <div className={cn('flip-card-inner', flipped && 'is-flipped')}>
          <div className="flip-card-face rounded-xl border-2 border-indian-saffron/40 bg-gradient-to-br from-indian-cream to-white shadow-md p-6 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-medium uppercase tracking-wide text-indian-saffron mb-3">
              {chapter.roman}. {chapter.title}
            </span>
            {current.sanskrit && (
              <p className="text-2xl sm:text-3xl text-gray-800 mb-2 font-heading" lang="sa">
                {current.sanskrit}
              </p>
            )}
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 leading-tight">
              {current.term}
            </h3>
            <p className="mt-6 text-sm text-muted-foreground flex items-center gap-2">
              <RotateCw className="w-4 h-4" />
              Tap to reveal the meaning
            </p>
          </div>

          <div className="flip-card-face flip-card-back rounded-xl border-2 border-spiritual-300 bg-gradient-to-br from-white to-spiritual-50 shadow-md p-6 flex flex-col justify-center">
            <span className="text-xs font-medium uppercase tracking-wide text-spiritual-600 mb-2">
              {current.term}
            </span>
            <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
              {current.definition}
            </p>
          </div>
        </div>
      </button>

      {flipped ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <Button
            type="button"
            onClick={() => handleMark('review')}
            variant="outline"
            className="h-12 border-2 border-indian-saffron/40 text-indian-saffron hover:bg-indian-saffron/10"
          >
            <X className="w-4 h-4" /> Need review
          </Button>
          <Button
            type="button"
            onClick={() => handleMark('known')}
            className="h-12 bg-green-600 hover:bg-green-700"
          >
            <Check className="w-4 h-4" /> I knew this
          </Button>
        </div>
      ) : (
        <p className="text-center text-sm text-muted-foreground mb-4">
          Think of the meaning first, then flip the card.
          {currentMark && (
            <span className="block mt-1">
              Previously marked as {currentMark === 'known' ? 'known' : 'needs review'}.
            </span>
          )}
        </p>
      )}

      <div className="flex justify-between items-center pt-4 border-t">
        <Button
          variant="ghost"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => resetDeck(filteredCards, true)}
          className="gap-2"
        >
          <Shuffle className="w-4 h-4" /> Shuffle
        </Button>

        <Button
          variant="ghost"
          onClick={() => goTo(index + 1)}
          disabled={index === deckIds.length - 1}
          className="gap-2"
        >
          Next <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default FlipCardQuiz;
