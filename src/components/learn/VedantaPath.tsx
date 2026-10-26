import React, { useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, RotateCw, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { vedantasaraCards } from '../../data/vedantasaraCards';
import {
  OrderStep,
  PathChip,
  PathSection,
  PathStep,
  PlaceStep,
  SituationsStep,
  gradedSteps,
  loadPathProgress,
  savePathProgress,
  stepKey,
  vedantasaraPath,
} from '../../data/vedantasaraPath';
import StatesMatch from './StatesMatch';
import {
  Mark,
  canSpeak,
  cardCopy,
  loadMarks,
  saveMarks,
  speakTerm,
} from './vedantaQuizModel';

const VedantaPath: React.FC = () => {
  const [passed, setPassed] = useState<string[]>(() => loadPathProgress());
  const [sectionId, setSectionId] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const passedRef = useRef(passed);
  passedRef.current = passed;

  const cardById = useMemo(
    () => new Map(vedantasaraCards.map((card) => [card.id, card])),
    [],
  );

  const sectionIndex = vedantasaraPath.findIndex((section) => section.id === sectionId);
  const section = sectionIndex >= 0 ? vedantasaraPath[sectionIndex] : null;

  const isSectionPassed = (item: PathSection, done: string[]) =>
    gradedSteps(item).every((step) => done.includes(stepKey(item.id, step.id)));

  const isUnlocked = (index: number, done: string[]) =>
    index === 0 || isSectionPassed(vedantasaraPath[index - 1], done);

  const markPassed = (current: PathSection, step: PathStep) => {
    const key = stepKey(current.id, step.id);
    const fresh = !passedRef.current.includes(key);
    if (fresh) {
      const next = [...passedRef.current, key];
      passedRef.current = next;
      setPassed(next);
      savePathProgress(next);
      if (step.kind === 'order' && step.celebrate) {
        confetti({ particleCount: 140, spread: 80, origin: { y: 0.65 }, colors: ['#FF9933', '#FFD700', '#FFA500'] });
      }
    }
    if (step.cardIds?.length) {
      const marks = loadMarks();
      let changed = false;
      step.cardIds.forEach((id) => {
        if (cardById.has(id) && marks[id] !== 'known') {
          marks[id] = 'known';
          changed = true;
        }
      });
      if (changed) saveMarks(marks);
    }
  };

  const persistMark = (id: string, mark: Mark) => {
    const marks = loadMarks();
    marks[id] = mark;
    saveMarks(marks);
  };

  if (!section) {
    return (
      <div>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          The first half of Vedāntasāra, from the qualified student through the jīva. A section opens when the one before it is passed. Your place is saved on this device.
        </p>
        <div className="space-y-3">
          {vedantasaraPath.map((item, index) => {
            const unlocked = isUnlocked(index, passed);
            const done = isSectionPassed(item, passed);
            const graded = gradedSteps(item);
            const doneCount = graded.filter((step) => passed.includes(stepKey(item.id, step.id))).length;
            return (
              <button
                key={item.id}
                type="button"
                disabled={!unlocked}
                onClick={() => {
                  setSectionId(item.id);
                  setStepIndex(0);
                }}
                className={cn(
                  'w-full rounded-xl border px-4 py-3 text-left transition-colors',
                  done && 'border-green-600/40 bg-green-50',
                  unlocked && !done && 'border-indian-saffron/40 bg-white hover:border-indian-saffron',
                  !unlocked && 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed',
                )}
              >
                <span className="flex items-baseline justify-between gap-3">
                  <span className={cn('font-heading font-semibold', unlocked ? 'text-gray-900' : 'text-gray-400')}>
                    {item.numeral}. {item.title}
                  </span>
                  <span className="text-xs font-medium shrink-0">
                    {done ? 'Done' : unlocked ? `${doneCount}/${graded.length}` : 'Locked'}
                  </span>
                </span>
                <span className={cn('block text-sm mt-1', unlocked ? 'text-gray-600' : 'text-gray-400')}>{item.summary}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const step = section.steps[stepIndex];
  const stepPassed = passed.includes(stepKey(section.id, step.id));
  const canContinue = step.kind === 'cards' || stepPassed;
  const atEnd = stepIndex === section.steps.length - 1;

  return (
    <div>
      <button
        type="button"
        className="inline-flex items-center gap-1 text-sm text-indian-saffron mb-4 hover:underline"
        onClick={() => setSectionId(null)}
      >
        <ArrowLeft className="w-4 h-4" /> All sections
      </button>
      <h4 className="font-heading text-xl font-semibold text-gray-900">
        {section.numeral}. {section.title}
      </h4>
      <p className="text-sm text-gray-600 mt-1 mb-4">{section.summary}</p>

      <div className="flex flex-wrap gap-2 mb-5">
        {section.steps.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setStepIndex(index)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm border',
              index === stepIndex
                ? 'bg-indian-saffron text-white border-indian-saffron'
                : 'bg-white text-gray-700 border-indian-saffron/30',
            )}
          >
            {item.title}
          </button>
        ))}
      </div>

      {step.kind === 'cards' && <CardReview cardIds={step.cardIds} />}
      {step.kind === 'place' && (
        <PlaceBoard
          key={step.id}
          step={step}
          onPass={() => markPassed(section, step)}
        />
      )}
      {step.kind === 'order' && (
        <OrderBoard
          key={step.id}
          step={step}
          onPass={() => markPassed(section, step)}
        />
      )}
      {step.kind === 'situations' && (
        <SituationRound
          key={step.id}
          step={step}
          alreadyPassed={stepPassed}
          onPass={() => markPassed(section, step)}
        />
      )}
      {step.kind === 'states' && (
        <div>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">{step.prompt}</p>
          <StatesMatch onMark={persistMark} onPassed={() => markPassed(section, step)} />
          {stepPassed && <PassedNote />}
        </div>
      )}

      <div className="flex justify-between items-center mt-6 pt-4 border-t">
        <Button type="button" variant="ghost" onClick={() => setStepIndex((value) => value - 1)} disabled={stepIndex === 0}>
          <ArrowLeft className="w-4 h-4" /> Previous
        </Button>
        {canContinue && (
          atEnd ? (
            <Button type="button" variant="outline" onClick={() => setSectionId(null)}>
              Back to the path
            </Button>
          ) : (
            <Button type="button" onClick={() => setStepIndex((value) => value + 1)} className="bg-indian-saffron hover:bg-indian-saffron/90">
              Next <ArrowRight className="w-4 h-4" />
            </Button>
          )
        )}
      </div>
    </div>
  );
};

function PassedNote({ children }: { children?: React.ReactNode }) {
  return (
    <p className="mt-4 text-sm font-medium text-green-800 flex items-start gap-2">
      <Check className="w-4 h-4 mt-0.5 shrink-0" />
      <span>{children ?? 'Passed. This stays saved on this device.'}</span>
    </p>
  );
}

function CardReview({ cardIds }: { cardIds: string[] }) {
  const cards = cardIds
    .map((id) => vedantasaraCards.find((card) => card.id === id))
    .filter((card): card is (typeof vedantasaraCards)[number] => Boolean(card));
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const card = cards[index];
  if (!card) return null;
  const { lead, rest } = cardCopy(card);

  return (
    <div className="rounded-xl border border-indian-saffron/30 bg-indian-cream/40 p-5">
      <p className="text-xs text-gray-500 mb-3">Term {index + 1} of {cards.length}</p>
      <p className="text-xs font-medium uppercase tracking-wide text-indian-saffron mb-2">Term</p>
      {card.sanskrit && (
        <p className="text-2xl font-heading text-gray-800" lang="sa">{card.sanskrit}</p>
      )}
      <h5 className="text-2xl font-heading font-bold text-gray-900">{card.term}</h5>
      {canSpeak() && (
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-sm text-indian-saffron mt-3"
          onClick={() => speakTerm(card)}
          aria-label={`Pronounce ${card.term}`}
        >
          <Volume2 className="w-4 h-4" /> Pronounce
        </button>
      )}
      {open ? (
        <div className="mt-4">
          <p className="text-lg font-semibold text-gray-900">{lead}</p>
          {rest && <p className="mt-2 text-sm text-gray-600 leading-relaxed">{rest}</p>}
        </div>
      ) : (
        <button type="button" className="mt-4 inline-flex items-center gap-2 text-sm text-gray-600" onClick={() => setOpen(true)}>
          <RotateCw className="w-4 h-4" /> Show the meaning
        </button>
      )}
      <div className="flex justify-between mt-5">
        <Button type="button" variant="ghost" disabled={index === 0} onClick={() => { setIndex((value) => value - 1); setOpen(false); }}>
          <ArrowLeft className="w-4 h-4" /> Previous
        </Button>
        <Button type="button" variant="ghost" disabled={index === cards.length - 1} onClick={() => { setIndex((value) => value + 1); setOpen(false); }}>
          Next <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

function PlaceBoard({
  step,
  onPass,
}: {
  step: PlaceStep;
  onPass: () => void;
}) {
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const placedIds = new Set(Object.values(placements));
  const chipById = new Map(step.chips.map((chip) => [chip.id, chip]));
  const filled = Object.keys(placements).length === step.slots.length;
  const correct = step.slots.every((slot) => placements[slot.id] === slot.answerId);

  const place = (slotId: string) => {
    if (checked) return;
    const current = placements[slotId];
    if (current) {
      setPlacements((prev) => {
        const next = { ...prev };
        delete next[slotId];
        return next;
      });
      setSelectedId(current);
      return;
    }
    if (!selectedId) return;
    setPlacements((prev) => ({ ...prev, [slotId]: selectedId }));
    setSelectedId(null);
  };

  const check = () => {
    setChecked(true);
    if (correct) onPass();
  };

  return (
    <div>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{step.prompt} Select a name, then select its place.</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {step.chips.filter((chip) => !placedIds.has(chip.id)).map((chip) => (
          <ChipButton key={chip.id} chip={chip} selected={selectedId === chip.id} onClick={() => setSelectedId(chip.id)} />
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-2 mb-4">
        {step.slots.map((slot) => {
          const placed = placements[slot.id];
          const chip = placed ? chipById.get(placed) : undefined;
          const right = placed === slot.answerId;
          const answer = chipById.get(slot.answerId);
          return (
            <button
              key={slot.id}
              type="button"
              disabled={checked}
              onClick={() => place(slot.id)}
              className={cn(
                'rounded-lg border px-3 py-2 text-left min-h-16',
                checked && right && 'border-green-500 bg-green-50',
                checked && !right && 'border-red-400 bg-red-50',
                !checked && placed && 'border-indian-saffron bg-white',
                !checked && !placed && 'border-dashed border-indian-saffron/40 bg-white hover:border-indian-saffron',
              )}
            >
              <span className="block text-xs text-gray-500">{slot.label}</span>
              <span className="block text-sm font-medium text-gray-900 mt-1">{chip?.label ?? 'Choose'}</span>
              {checked && !right && <span className="block text-xs text-green-800 mt-1">{answer?.label}</span>}
            </button>
          );
        })}
      </div>
      {checked && correct && <PassedNote />}
      <div className="flex justify-center">
        {checked && !correct ? (
          <Button type="button" variant="outline" onClick={() => { setPlacements({}); setSelectedId(null); setChecked(false); }}>
            Try again
          </Button>
        ) : (
          <Button type="button" onClick={check} disabled={!filled || (checked && correct)} className="bg-indian-saffron hover:bg-indian-saffron/90">
            Check
          </Button>
        )}
      </div>
    </div>
  );
}

function OrderBoard({
  step,
  onPass,
}: {
  step: OrderStep;
  onPass: () => void;
}) {
  const [items, setItems] = useState<PathChip[]>(() => shuffle(step.items));
  const [verdict, setVerdict] = useState<'idle' | 'wrong' | 'right'>('idle');
  const correct = items.every((item, index) => item.id === step.items[index].id);

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    setItems((prev) => {
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
    setVerdict('idle');
  };

  const check = () => {
    if (correct) {
      setVerdict('right');
      onPass();
    } else {
      setVerdict('wrong');
    }
  };

  return (
    <div>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{step.prompt}</p>
      <ol className="space-y-2 mb-4">
        {items.map((item, index) => (
          <li key={item.id} className="flex items-center gap-2 rounded-lg border border-indian-saffron/30 bg-white px-3 py-2">
            <span className="text-xs text-gray-400 w-4">{index + 1}</span>
            <span className="flex-1 text-sm font-medium text-gray-900">{item.label}</span>
            <Button type="button" variant="ghost" size="sm" aria-label={`Move ${item.label} up`} disabled={index === 0} onClick={() => move(index, -1)}>
              Up
            </Button>
            <Button type="button" variant="ghost" size="sm" aria-label={`Move ${item.label} down`} disabled={index === items.length - 1} onClick={() => move(index, 1)}>
              Down
            </Button>
          </li>
        ))}
      </ol>
      {verdict === 'wrong' && (
        <div className="mb-4 text-sm text-gray-700">
          <p className="font-medium text-gray-900 mb-1">The text’s order is:</p>
          <ol className="list-decimal pl-5">
            {step.items.map((item) => <li key={item.id}>{item.label}</li>)}
          </ol>
        </div>
      )}
      {verdict === 'right' && <PassedNote>{step.successNote}</PassedNote>}
      <div className="flex justify-center mt-4">
        {verdict === 'wrong' ? (
          <Button type="button" variant="outline" onClick={() => { setItems(shuffle(step.items)); setVerdict('idle'); }}>
            Try again
          </Button>
        ) : (
          <Button type="button" onClick={check} disabled={verdict === 'right'} className="bg-indian-saffron hover:bg-indian-saffron/90">
            Check the order
          </Button>
        )}
      </div>
    </div>
  );
}

function SituationRound({
  step,
  alreadyPassed,
  onPass,
}: {
  step: SituationsStep;
  alreadyPassed: boolean;
  onPass: () => void;
}) {
  const [round, setRound] = useState(step.questions);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [missed, setMissed] = useState<SituationsStep['questions']>([]);
  const [done, setDone] = useState(alreadyPassed);
  const question = round[index];
  const optionById = new Map(step.options.map((option) => [option.id, option]));

  const choose = (id: string) => {
    if (picked || done) return;
    setPicked(id);
  };

  const next = () => {
    if (!question || !picked) return;
    const wrong = picked !== question.answerId;
    const nextMissed = wrong ? [...missed, question] : missed;
    const last = index >= round.length - 1;
    if (!last) {
      setMissed(nextMissed);
      setIndex((value) => value + 1);
      setPicked(null);
      return;
    }
    if (nextMissed.length > 0) {
      setRound(nextMissed);
      setMissed([]);
      setIndex(0);
      setPicked(null);
      return;
    }
    setDone(true);
    onPass();
  };

  if (done) {
    return <PassedNote>Each scene is matched. This stays saved on this device.</PassedNote>;
  }

  if (!question) return null;
  const revealed = picked !== null;
  const answer = optionById.get(question.answerId);

  return (
    <div>
      <p className="text-sm text-gray-600 mb-1">{step.prompt}</p>
      <p className="text-xs text-gray-500 mb-4">Scene {index + 1} of {round.length}{missed.length > 0 || round.length !== step.questions.length ? ' in this round' : ''}</p>
      <p className="text-lg font-semibold text-gray-900 leading-snug mb-4">{question.prompt}</p>
      <div className="grid gap-2">
        {step.options.map((option) => {
          const showCorrect = revealed && option.id === question.answerId;
          const showWrong = picked === option.id && option.id !== question.answerId;
          return (
            <button
              key={option.id}
              type="button"
              disabled={revealed}
              onClick={() => choose(option.id)}
              className={cn(
                'rounded-lg border px-3 py-2 text-left text-sm font-medium',
                showCorrect && 'border-green-600 bg-green-50',
                showWrong && 'border-red-500 bg-red-50',
                !showCorrect && !showWrong && 'border-indian-saffron/30 bg-white hover:border-indian-saffron',
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {revealed && (
        <div className="mt-4">
          <p className="text-sm text-gray-700">{question.note}</p>
          {picked !== question.answerId && answer && (
            <p className="text-sm text-green-800 mt-1">This is {answer.label}.</p>
          )}
          <Button type="button" className="mt-4 bg-indian-saffron hover:bg-indian-saffron/90" onClick={next}>
            Next <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

function ChipButton({ chip, selected, onClick }: { chip: PathChip; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        'px-3 py-1.5 rounded-full border text-sm',
        selected ? 'bg-indian-saffron text-white border-indian-saffron' : 'bg-white text-gray-800 border-indian-saffron/30 hover:border-indian-saffron',
      )}
    >
      {chip.label}
    </button>
  );
}

function shuffle(items: PathChip[]): PathChip[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  if (next.every((item, index) => item.id === items[index].id) && next.length > 1) {
    [next[0], next[1]] = [next[1], next[0]];
  }
  return next;
}

export default VedantaPath;
