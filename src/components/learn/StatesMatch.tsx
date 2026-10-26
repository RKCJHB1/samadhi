import React, { useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import {
  STATE_MATCH_CHIPS,
  STATE_MATCH_ROWS,
  Mark,
} from './vedantaQuizModel';

interface StatesMatchProps {
  onMark: (id: string, mark: Mark) => void;
  onPassed?: () => void;
}

const StatesMatch: React.FC<StatesMatchProps> = ({ onMark, onPassed }) => {
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const chipById = useMemo(
    () => new Map(STATE_MATCH_CHIPS.map((chip) => [chip.cardId, chip])),
    [],
  );
  const placedIds = useMemo(() => new Set(Object.values(placements)), [placements]);
  const slotCount = STATE_MATCH_ROWS.reduce((sum, row) => sum + row.slots.length, 0);
  const filled = Object.keys(placements).length;
  const correctCount = STATE_MATCH_ROWS.reduce(
    (sum, row) => sum + row.slots.filter((slot) => placements[slot.id] === slot.cardId).length,
    0,
  );

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
    let correct = 0;
    STATE_MATCH_ROWS.forEach((row) => {
      row.slots.forEach((slot) => {
        const right = placements[slot.id] === slot.cardId;
        if (right) correct += 1;
        onMark(slot.cardId, right ? 'known' : 'review');
      });
    });
    if (correct === slotCount) {
      confetti({ particleCount: 140, spread: 80, origin: { y: 0.65 }, colors: ['#FF9933', '#FFD700', '#FFA500'] });
      onPassed?.();
    }
  };

  const retry = () => {
    setPlacements({});
    setSelectedId(null);
    setChecked(false);
  };

  return (
    <div>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        Select a name, then select the space it belongs in. The three states each have an individual, a cosmic person, and a body. The Fourth has no body.
      </p>

      <div className="flex flex-wrap gap-2 mb-5">
        {STATE_MATCH_CHIPS.filter((chip) => !placedIds.has(chip.cardId)).map((chip) => (
          <button
            key={chip.cardId}
            type="button"
            aria-pressed={selectedId === chip.cardId}
            onClick={() => setSelectedId(chip.cardId)}
            className={cn(
              'px-3 py-1.5 rounded-full border text-sm transition-colors',
              selectedId === chip.cardId
                ? 'bg-indian-saffron text-white border-indian-saffron'
                : 'bg-white text-gray-800 border-indian-saffron/30 hover:border-indian-saffron',
            )}
          >
            {chip.label}
          </button>
        ))}
        {filled === slotCount && !checked && (
          <span className="text-sm text-muted-foreground self-center">All names are placed.</span>
        )}
      </div>

      <div className="space-y-3 mb-5">
        {STATE_MATCH_ROWS.map((row) => (
          <div key={row.id} className="rounded-xl border border-indian-saffron/20 bg-indian-cream/30 p-3 sm:p-4">
            <div className="mb-3">
              <h4 className="font-heading font-semibold text-gray-900">{row.title}</h4>
              <p className="text-xs text-muted-foreground">{row.hint}</p>
            </div>
            <div className={cn('grid gap-2', row.slots.length > 1 && 'sm:grid-cols-3')}>
              {row.slots.map((slot) => {
                const placed = placements[slot.id];
                const chip = placed ? chipById.get(placed) : undefined;
                const right = placed === slot.cardId;
                const answer = chipById.get(slot.cardId);
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => place(slot.id)}
                    disabled={checked}
                    aria-label={`${row.title}, ${slot.column}${chip ? `, ${chip.label}` : ', empty'}`}
                    className={cn(
                      'rounded-lg border px-3 py-2 text-left min-h-16 transition-colors',
                      checked && right && 'border-green-500 bg-green-50',
                      checked && !right && 'border-red-400 bg-red-50',
                      !checked && placed && 'border-indian-saffron bg-white',
                      !checked && !placed && 'border-dashed border-indian-saffron/40 bg-white/70 hover:border-indian-saffron',
                    )}
                  >
                    <span className="block text-[11px] uppercase tracking-wide text-gray-500">{slot.column}</span>
                    <span className="block text-sm font-medium text-gray-900 mt-1">
                      {chip?.label ?? 'Choose'}
                    </span>
                    {checked && !right && (
                      <span className="block text-xs text-green-800 mt-1">{answer?.label}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {checked ? (
          <>
            <p className="text-sm font-medium text-gray-800 w-full text-center">
              {correctCount} of {slotCount} placed correctly. Saved on this device.
            </p>
            <Button type="button" variant="outline" onClick={retry}>
              Try this map again
            </Button>
          </>
        ) : (
          <Button
            type="button"
            onClick={check}
            disabled={filled !== slotCount}
            className="bg-indian-saffron hover:bg-indian-saffron/90"
          >
            Check the map
          </Button>
        )}
      </div>
    </div>
  );
};

export default StatesMatch;
