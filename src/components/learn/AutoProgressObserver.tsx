import React, { useEffect, useRef } from 'react';
import { upsertReadingProgress } from '@/services/translationsSupabase';

// Observes which sentence spans are in viewport and saves the highest index seen
export default function AutoProgressObserver({ lectureId, targetLang }: { lectureId: string; targetLang: string; }) {
  const lastSavedRef = useRef<number>(-1);
  const tickingRef = useRef<boolean>(false);

  useEffect(() => {
    lastSavedRef.current = -1;
  }, [lectureId, targetLang]);

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(async () => {
        try {
          const nodes = Array.from(document.querySelectorAll('[data-idx]')) as HTMLElement[];
          let maxIdx = -1;
          const viewportTop = window.scrollY + 64; // account for navbar
          const viewportBottom = window.scrollY + window.innerHeight - 80; // comfortable area
          for (const el of nodes) {
            const rect = el.getBoundingClientRect();
            const yTop = rect.top + window.scrollY;
            const yBottom = rect.bottom + window.scrollY;
            if (yBottom > viewportTop && yTop < viewportBottom) {
              const idx = Number(el.dataset.idx || -1);
              if (!Number.isNaN(idx)) maxIdx = Math.max(maxIdx, idx);
            }
          }
          if (maxIdx > lastSavedRef.current) {
            const ok = await upsertReadingProgress(lectureId, targetLang, maxIdx);
            if (ok) lastSavedRef.current = maxIdx;
          }
        } finally {
          tickingRef.current = false;
        }
      });
    };

    window.addEventListener('scroll', onScroll);
    // Save once on mount too
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [lectureId, targetLang]);

  return null;
}

