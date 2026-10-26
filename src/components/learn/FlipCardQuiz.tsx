import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  RefreshCcw,
  RotateCw,
  Shuffle,
  Volume2,
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
import StatesMatch from './StatesMatch';
import {
  CardDirection,
  Mark,
  SessionSize,
  StudyMode,
  buildOptions,
  buildSession,
  canSpeak,
  cardCopy,
  loadMarks,
  recallPrompt,
  saveMarks,
  shuffleIds,
  speakTerm,
} from './vedantaQuizModel';
import './FlipCardQuiz.css';

interface FlipCardQuizProps {
  cards: VedantasaraCard[];
  onComplete?: (known: number, total: number) => void;
}

const fieldClass =
  'mt-1 h-10 w-full rounded-md border border-indian-saffron/30 bg-white px-3 text-sm text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indian-saffron';

const FlipCardQuiz: React.FC<FlipCardQuizProps> = ({ cards, onComplete }) => {
  const [mode, setMode] = useState<StudyMode>('flip');
  const [direction, setDirection] = useState<CardDirection>('term');
  const [chapterFilter, setChapterFilter] = useState<VedantasaraChapterId | 'all'>('all');
  const [sessionSize, setSessionSize] = useState<SessionSize>(10);
  const [marks, setMarks] = useState<Record<string, Mark>>(() => loadMarks());
  const [deckIds, setDeckIds] = useState<string[]>(() => buildSession(cards, loadMarks(), 10));
  const [deckKind, setDeckKind] = useState<'session' | 'review'>('session');
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionMarks, setSessionMarks] = useState<Record<string, Mark>>({});
  const [choiceId, setChoiceId] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const marksRef = useRef(marks);
  marksRef.current = marks;

  const filteredCards = useMemo(() => {
    if (chapterFilter === 'all') return cards;
    return cards.filter((card) => card.chapter === chapterFilter);
  }, [cards, chapterFilter]);

  const cardById = useMemo(() => new Map(cards.map((card) => [card.id, card])), [cards]);

  const startSession = useCallback((sourceMarks: Record<string, Mark>) => {
    setDeckKind('session');
    setDeckIds(buildSession(filteredCards, sourceMarks, sessionSize));
    setIndex(0);
    setFlipped(false);
    setChoiceId(null);
    setSessionMarks({});
    setShowResults(false);
  }, [filteredCards, sessionSize]);

  useEffect(() => {
    startSession(marksRef.current);
  }, [startSession]);

  const current = cardById.get(deckIds[index]);
  const total = deckIds.length;
  const savedKnown = Object.values(marks).filter((mark) => mark === 'known').length;
  const savedReview = Object.values(marks).filter((mark) => mark === 'review').length;
  const sessionKnown = deckIds.filter((id) => sessionMarks[id] === 'known').length;
  const sessionAnswered = deckIds.filter((id) => sessionMarks[id]).length;

  const options = useMemo(
    () => (current ? buildOptions(current, cards) : []),
    [current, cards],
  );

  const persistMark = useCallback((id: string, mark: Mark) => {
    const nextMarks = { ...marksRef.current, [id]: mark };
    marksRef.current = nextMarks;
    setMarks(nextMarks);
    saveMarks(nextMarks);
    setSessionMarks((prev) => ({ ...prev, [id]: mark }));
  }, []);

  const celebrate = useCallback((grades: Record<string, Mark>) => {
    const answered = deckIds.filter((id) => grades[id]);
    if (answered.length === 0 || answered.length !== deckIds.length) return;
    const known = answered.filter((id) => grades[id] === 'known').length;
    const percentage = known / deckIds.length;
    onComplete?.(known, deckIds.length);
    if (percentage === 1) {
      confetti({ particleCount: 160, spread: 80, origin: { y: 0.65 }, colors: ['#FF9933', '#FFD700', '#FFA500'] });
    } else if (percentage >= 0.8) {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.65 }, colors: ['#FF9933', '#F1A912'] });
    }
  }, [deckIds, onComplete]);

  const grade = useCallback((mark: Mark, advance: boolean) => {
    if (!current) return;
    const nextSession = { ...sessionMarks, [current.id]: mark };
    const nextMarks = { ...marksRef.current, [current.id]: mark };
    marksRef.current = nextMarks;
    setMarks(nextMarks);
    saveMarks(nextMarks);
    setSessionMarks(nextSession);
    if (!advance) return;
    setFlipped(false);
    if (index < deckIds.length - 1) {
      setIndex(index + 1);
    } else {
      setShowResults(true);
      celebrate(nextSession);
    }
  }, [current, sessionMarks, index, deckIds.length, celebrate]);

  const goTo = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= deckIds.length) return;
    setIndex(nextIndex);
    setFlipped(false);
    setChoiceId(null);
  };

  const endSession = () => {
    setShowResults(true);
    celebrate(sessionMarks);
  };

  useEffect(() => {
    setIndex(0);
    setFlipped(false);
    setChoiceId(null);
    setSessionMarks({});
    setShowResults(false);
  }, [mode]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (showResults || mode === 'match' || !current) return;
      const target = event.target as HTMLElement | null;
      const onField = Boolean(target?.closest('input, textarea, select'));
      if (onField) return;
      const onButton = Boolean(target?.closest('button'));

      if ((event.key === ' ' || event.key === 'Enter') && !onButton && mode === 'flip') {
        event.preventDefault();
        setFlipped((value) => !value);
      } else if (event.key === 'ArrowRight' && index < deckIds.length - 1) {
        event.preventDefault();
        setIndex(index + 1);
        setFlipped(false);
        setChoiceId(null);
      } else if (event.key === 'ArrowLeft' && index > 0) {
        event.preventDefault();
        setIndex(index - 1);
        setFlipped(false);
        setChoiceId(null);
      } else if (mode === 'flip' && flipped && (event.key === '1' || event.key.toLowerCase() === 'k')) {
        grade('known', true);
      } else if (mode === 'flip' && flipped && (event.key === '2' || event.key.toLowerCase() === 'r')) {
        grade('review', true);
      } else if (mode === 'choice' && !choiceId && !sessionMarks[current.id]) {
        const optionIndex = Number(event.key) - 1;
        const option = options[optionIndex];
        if (option && event.key >= '1' && event.key <= '4') {
          setChoiceId(option.id);
          grade(option.id === current.id ? 'known' : 'review', false);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showResults, mode, current, flipped, index, deckIds.length, grade, choiceId, sessionMarks, options]);

  const resetProgress = () => {
    marksRef.current = {};
    setMarks({});
    saveMarks({});
    setConfirmReset(false);
    startSession({});
  };

  const savedLine = (
    <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-sm text-gray-600">
      <p>
        Saved on this device: <span className="text-green-700 font-medium">{savedKnown} known</span>
        <span className="mx-1">·</span>
        <span className="text-indian-saffron font-medium">{savedReview} to review</span>
      </p>
      {confirmReset ? (
        <span className="flex items-center gap-2">
          <span>Clear every saved mark?</span>
          <Button type="button" size="sm" variant="outline" onClick={() => setConfirmReset(false)}>
            Cancel
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={resetProgress}>
            Clear
          </Button>
        </span>
      ) : (
        <button
          type="button"
          className="text-xs text-muted-foreground underline-offset-2 hover:underline"
          onClick={() => setConfirmReset(true)}
        >
          Reset saved progress
        </button>
      )}
    </div>
  );

  const modeTabs = (
    <div className="flex flex-wrap gap-2 mb-4" role="tablist" aria-label="Study mode">
      {([
        ['flip', 'Flip cards'],
        ['choice', 'Choose the term'],
        ['match', 'Match the states'],
      ] as const).map(([id, label]) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={mode === id}
          onClick={() => setMode(id)}
          className={cn(
            'px-3 py-1.5 rounded-full text-sm border transition-colors',
            mode === id
              ? 'bg-indian-saffron text-white border-indian-saffron'
              : 'bg-white text-gray-700 border-indian-saffron/30 hover:border-indian-saffron',
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="animate-in fade-in duration-300">
      {modeTabs}
      {savedLine}
      {mode !== 'match' && (
        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          <label className="text-xs font-medium text-gray-500" htmlFor="vedanta-chapter">
            Chapter
            <select
              id="vedanta-chapter"
              className={fieldClass}
              value={chapterFilter}
              onChange={(event) => setChapterFilter(event.target.value as VedantasaraChapterId | 'all')}
            >
              <option value="all">All ({cards.length})</option>
              {VEDANTASARA_CHAPTERS.map((item) => {
                const count = cards.filter((card) => card.chapter === item.id).length;
                return (
                  <option key={item.id} value={item.id}>
                    {item.roman}. {item.title} ({count})
                  </option>
                );
              })}
            </select>
          </label>
          <label className="text-xs font-medium text-gray-500" htmlFor="vedanta-session">
            Session
            <select
              id="vedanta-session"
              className={fieldClass}
              value={String(sessionSize)}
              onChange={(event) => {
                const value = event.target.value;
                setSessionSize(value === 'all' ? 'all' : Number(value) as SessionSize);
              }}
            >
              <option value="10">10 cards, new terms first</option>
              <option value="20">20 cards, new terms first</option>
              <option value="all">All cards, in text order</option>
            </select>
          </label>
        </div>
      )}

      {mode === 'match' ? (
        <StatesMatch onMark={persistMark} />
      ) : filteredCards.length === 0 ? (
        <p className="text-muted-foreground">No cards in this chapter yet.</p>
      ) : showResults ? (
        <QuizResults
          deckIds={deckIds}
          sessionMarks={sessionMarks}
          cardById={cardById}
          onRetry={() => {
            setIndex(0);
            setFlipped(false);
            setChoiceId(null);
            setSessionMarks({});
            setShowResults(false);
          }}
          onNewSession={() => startSession(marksRef.current)}
          onReviewMissed={() => {
            const missed = deckIds.filter((id) => sessionMarks[id] === 'review');
            setDeckKind('review');
            setDeckIds(missed);
            setIndex(0);
            setFlipped(false);
            setChoiceId(null);
            setSessionMarks({});
            setShowResults(false);
          }}
        />
      ) : current ? (
        <CardStudy
          mode={mode}
          direction={direction}
          setDirection={(next) => {
            setDirection(next);
            setFlipped(false);
          }}
          current={current}
          index={index}
          total={total}
          flipped={flipped}
          setFlipped={setFlipped}
          choiceId={choiceId}
          options={options}
          sessionMarks={sessionMarks}
          savedMark={marks[current.id]}
          sessionKnown={sessionKnown}
          sessionAnswered={sessionAnswered}
          deckKind={deckKind}
          sessionSize={sessionSize}
          poolCount={filteredCards.length}
          onChoose={(id) => {
            setChoiceId(id);
            grade(id === current.id ? 'known' : 'review', false);
          }}
          onGrade={(mark) => grade(mark, true)}
          onPrevious={() => goTo(index - 1)}
          onNext={() => goTo(index + 1)}
          onShuffle={() => {
            setDeckIds((ids) => shuffleIds(ids));
            setIndex(0);
            setFlipped(false);
            setChoiceId(null);
          }}
          onAdvance={() => {
            if (index < deckIds.length - 1) goTo(index + 1);
            else endSession();
          }}
          onEnd={endSession}
        />
      ) : null}
    </div>
  );
};

function CardStudy({
  mode,
  direction,
  setDirection,
  current,
  index,
  total,
  flipped,
  setFlipped,
  choiceId,
  options,
  sessionMarks,
  savedMark,
  sessionKnown,
  sessionAnswered,
  deckKind,
  sessionSize,
  poolCount,
  onChoose,
  onGrade,
  onPrevious,
  onNext,
  onShuffle,
  onAdvance,
  onEnd,
}: {
  mode: StudyMode;
  direction: CardDirection;
  setDirection: (direction: CardDirection) => void;
  current: VedantasaraCard;
  index: number;
  total: number;
  flipped: boolean;
  setFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  choiceId: string | null;
  options: VedantasaraCard[];
  sessionMarks: Record<string, Mark>;
  savedMark?: Mark;
  sessionKnown: number;
  sessionAnswered: number;
  deckKind: 'session' | 'review';
  sessionSize: SessionSize;
  poolCount: number;
  onChoose: (id: string) => void;
  onGrade: (mark: Mark) => void;
  onPrevious: () => void;
  onNext: () => void;
  onShuffle: () => void;
  onAdvance: () => void;
  onEnd: () => void;
}) {
  const chapter = getVedantasaraChapter(current.chapter);
  const { lead, rest } = cardCopy(current);
  const prompt = recallPrompt(current);
  const sessionMark = sessionMarks[current.id];
  const revealed = Boolean(choiceId) || Boolean(sessionMark);
  const position = total === 0 ? 0 : ((index + (flipped || revealed ? 0.5 : 0)) / total) * 100;
  const meaningFirst = mode === 'flip' && direction === 'meaning';
  const termVisible = (mode === 'flip' && (direction === 'term' || flipped)) || (mode === 'choice' && revealed);

  return (
    <div>
      {deckKind === 'session' && sessionSize !== 'all' && poolCount > total && (
        <p className="text-xs text-muted-foreground mb-3">
          {total} of {poolCount} cards. Unmarked terms come first.
        </p>
      )}

      <div className="mb-4">
        <div className="flex justify-between gap-3 text-sm text-gray-500 mb-2">
          <span>Card {index + 1} of {total}</span>
          <span>{sessionKnown} known of {sessionAnswered} marked</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indian-saffron to-orange-500 transition-all duration-500"
            style={{ width: `${Math.min(position, 100)}%` }}
          />
        </div>
        <div
          className="h-1.5 mt-1.5 bg-gray-100 rounded-full overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="h-full bg-green-600 transition-all duration-500"
            style={{ width: `${total === 0 ? 0 : (sessionKnown / total) * 100}%` }}
          />
        </div>
      </div>

      {mode === 'flip' && (
        <div className="flex flex-wrap gap-2 mb-4">
          {([
            ['term', 'Term first'],
            ['meaning', 'Meaning first'],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={direction === id}
              onClick={() => setDirection(id)}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm border transition-colors',
                direction === id
                  ? 'bg-spiritual-600 text-white border-spiritual-600'
                  : 'bg-white text-gray-700 border-spiritual-300 hover:border-spiritual-600',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {mode === 'flip' ? (
        <div
          role="button"
          tabIndex={0}
          aria-pressed={flipped}
          aria-label={flipped ? 'Show the other side' : meaningFirst ? 'Show the term' : 'Show the meaning'}
          onClick={() => setFlipped((value) => !value)}
          className="flip-card-scene block w-full h-80 sm:h-96 mb-4 text-left cursor-pointer rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indian-saffron focus-visible:ring-offset-2"
        >
          <div className={cn('flip-card-inner', flipped && 'is-flipped')}>
            <div className="flip-card-face rounded-xl border-2 border-indian-saffron/40 bg-gradient-to-br from-indian-cream to-white shadow-md">
              <div
                className={cn(
                  'h-full overflow-y-auto p-5 sm:p-6 flex flex-col',
                  meaningFirst ? 'justify-start text-left' : 'items-center justify-center text-center',
                )}
              >
              <span className="text-xs font-medium uppercase tracking-wide text-indian-saffron mb-3">
                {chapter.roman}. {chapter.title}
              </span>
              {meaningFirst ? (
                <>
                  <p className="text-lg sm:text-xl font-semibold text-gray-900 leading-snug">{prompt}</p>
                  <p className="mt-6 text-sm text-muted-foreground flex items-center gap-2">
                    <RotateCw className="w-4 h-4" />
                    Tap to reveal the term
                  </p>
                </>
              ) : (
                <>
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
                </>
              )}
              </div>
            </div>
            <div className="flip-card-face flip-card-back rounded-xl border-2 border-spiritual-300 bg-gradient-to-br from-white to-spiritual-50 shadow-md">
              <div className="h-full overflow-y-auto p-5 sm:p-6 flex flex-col justify-start">
              {meaningFirst ? (
                <>
                  <span className="text-xs font-medium uppercase tracking-wide text-spiritual-600 mb-2">
                    Term
                  </span>
                  {current.sanskrit && (
                    <p className="text-2xl text-gray-800 font-heading mb-1" lang="sa">{current.sanskrit}</p>
                  )}
                  <h3 className="text-2xl font-heading font-bold text-gray-900">{current.term}</h3>
                  {rest && <p className="mt-4 text-sm text-gray-600 leading-relaxed">{rest}</p>}
                </>
              ) : (
                <>
                  <span className="text-xs font-medium uppercase tracking-wide text-spiritual-600 mb-2">
                    {current.term}
                  </span>
                  <p className="text-lg sm:text-xl font-semibold text-gray-900 leading-snug">{lead}</p>
                  {rest && <p className="mt-3 text-sm text-gray-600 leading-relaxed">{rest}</p>}
                </>
              )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border-2 border-indian-saffron/40 bg-gradient-to-br from-indian-cream to-white shadow-md p-5 sm:p-6 mb-4">
          <span className="text-xs font-medium uppercase tracking-wide text-indian-saffron">
            {chapter.roman}. {chapter.title}
          </span>
          <p className="mt-3 text-lg sm:text-xl font-semibold text-gray-900 leading-snug">{prompt}</p>
          <div className="grid gap-2 mt-5">
            {options.map((option, optionIndex) => {
              const picked = choiceId === option.id;
              const showCorrect = revealed && option.id === current.id;
              const showWrong = picked && option.id !== current.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  disabled={revealed}
                  onClick={() => onChoose(option.id)}
                  className={cn(
                    'rounded-lg border px-3 py-2 text-left transition-colors disabled:cursor-default',
                    showCorrect && 'border-green-600 bg-green-50',
                    showWrong && 'border-red-500 bg-red-50',
                    !showCorrect && !showWrong && 'border-indian-saffron/30 bg-white hover:border-indian-saffron',
                  )}
                >
                  <span className="text-xs text-gray-400 mr-2">{optionIndex + 1}</span>
                  <span className="font-medium text-gray-900">{option.term}</span>
                  {option.sanskrit && (
                    <span className="block text-sm text-gray-600 mt-0.5" lang="sa">{option.sanskrit}</span>
                  )}
                </button>
              );
            })}
          </div>
          {revealed && prompt !== lead && (
            <p className="mt-4 text-sm font-medium text-gray-800 leading-relaxed">{lead}</p>
          )}
          {revealed && rest && (
            <p className={cn('text-sm text-gray-600 leading-relaxed', prompt === lead ? 'mt-4' : 'mt-2')}>{rest}</p>
          )}
        </div>
      )}

      {termVisible && canSpeak() && (
        <div className="flex justify-center mb-4">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-sm text-indian-saffron hover:text-indian-saffron/80"
            aria-label={`Pronounce ${current.term}`}
            onClick={() => speakTerm(current)}
          >
            <Volume2 className="w-4 h-4" />
            Pronounce
          </button>
        </div>
      )}

      {mode === 'flip' && flipped && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <Button
            type="button"
            onClick={() => onGrade('review')}
            variant="outline"
            className="h-12 border-2 border-indian-saffron/40 text-indian-saffron hover:bg-indian-saffron/10"
          >
            <X className="w-4 h-4" /> Need review
          </Button>
          <Button
            type="button"
            onClick={() => onGrade('known')}
            className="h-12 bg-green-600 hover:bg-green-700"
          >
            <Check className="w-4 h-4" /> I knew this
          </Button>
        </div>
      )}

      {mode === 'flip' && !flipped && (
        <p className="text-center text-sm text-muted-foreground mb-4">
          {meaningFirst ? 'Read the meaning, recall the term, then flip.' : 'Think of the meaning first, then flip the card.'}
          {savedMark && (
            <span className="block mt-1">
              Saved on this device as {savedMark === 'known' ? 'known' : 'needs review'}.
            </span>
          )}
          <span className="block mt-1 text-xs">Space flips the card. K marks known, R marks review.</span>
        </p>
      )}

      {mode === 'choice' && revealed && (
        <div className="flex justify-center mb-4">
          <Button type="button" onClick={onAdvance} className="bg-indian-saffron hover:bg-indian-saffron/90">
            {index < total - 1 ? 'Next card' : 'See results'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t">
        <Button type="button" variant="ghost" onClick={onPrevious} disabled={index === 0} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Previous
        </Button>
        <Button type="button" variant="outline" onClick={onShuffle} className="gap-2">
          <Shuffle className="w-4 h-4" /> Shuffle
        </Button>
        <Button type="button" variant="ghost" onClick={onNext} disabled={index === total - 1} className="gap-2">
          Next <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex justify-center mt-3">
        <button type="button" className="text-xs text-muted-foreground underline-offset-2 hover:underline" onClick={onEnd}>
          End session
        </button>
      </div>
    </div>
  );
}

function QuizResults({
  deckIds,
  sessionMarks,
  cardById,
  onRetry,
  onNewSession,
  onReviewMissed,
}: {
  deckIds: string[];
  sessionMarks: Record<string, Mark>;
  cardById: Map<string, VedantasaraCard>;
  onRetry: () => void;
  onNewSession: () => void;
  onReviewMissed: () => void;
}) {
  const knownCount = deckIds.filter((id) => sessionMarks[id] === 'known').length;
  const reviewCount = deckIds.filter((id) => sessionMarks[id] === 'review').length;
  const answeredCount = knownCount + reviewCount;
  const skipped = deckIds.length - answeredCount;
  const percentage = answeredCount === 0 ? 0 : Math.round((knownCount / answeredCount) * 100);
  const missed = deckIds
    .map((id) => cardById.get(id))
    .filter((card): card is VedantasaraCard => Boolean(card) && sessionMarks[card.id] === 'review');

  let message = 'Keep practising — these terms grow clearer with repetition.';
  let emoji = '💪';
  if (answeredCount > 0 && percentage === 100) {
    message = 'Perfect recall on the cards you marked.';
    emoji = '🏆';
  } else if (percentage >= 80) {
    message = 'Excellent. A little review will make this knowledge firm.';
    emoji = '🌟';
  } else if (percentage >= 60) {
    message = 'Good progress. The missed cards are listed below.';
    emoji = '👍';
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="text-center py-6 mb-6 bg-gradient-to-br from-indian-saffron/10 to-spiritual-100/30 rounded-xl">
        <div className="text-6xl mb-3">{emoji}</div>
        <div className="text-4xl font-bold text-gray-900 mb-2">
          {knownCount}/{answeredCount || deckIds.length}
        </div>
        <div className="text-lg text-gray-600 mb-1">{percentage}% recalled</div>
        <p className="text-gray-700 font-medium px-4">{message}</p>
        {skipped > 0 && (
          <p className="text-sm text-muted-foreground mt-2">{skipped} left unmarked. They stay new for the next session.</p>
        )}
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
            const { lead, rest } = cardCopy(card);
            return (
              <div
                key={card.id}
                className="p-4 rounded-xl border border-l-4 border-l-indian-saffron bg-indian-cream/40 border-indian-saffron/20"
              >
                <p className="text-xs font-medium text-indian-saffron mb-1">
                  {chapter.roman}. {chapter.title}
                </p>
                <p className="font-semibold text-gray-900">{card.term}</p>
                <p className="text-sm text-gray-800 mt-1 leading-relaxed">{lead}</p>
                {rest && <p className="text-sm text-gray-600 mt-1 leading-relaxed">{rest}</p>}
              </div>
            );
          })}
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-3">
        <Button type="button" onClick={onRetry} variant="outline" className="gap-2">
          <RefreshCcw className="w-4 h-4" /> Same cards again
        </Button>
        <Button type="button" onClick={onNewSession} variant="outline" className="gap-2">
          New session
        </Button>
        {missed.length > 0 && (
          <Button
            type="button"
            onClick={onReviewMissed}
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

export default FlipCardQuiz;
