import React from 'react';
import { popularLanguages } from '@/data/languages';

type HelloEntry = { native: string; translit: string };
const hellos: Record<string, HelloEntry> = {
  // 0..35 languages used on Read home
  en: { native: 'Hello', translit: 'Hello' },
  es: { native: 'Hola', translit: 'Hola' },
  zh: { native: '你好', translit: 'nǐ hǎo' },
  'zh-Hant': { native: '你好', translit: 'nǐ hǎo' },
  hi: { native: 'नमस्ते', translit: 'namastē' },
  ar: { native: 'مرحبا', translit: 'marḥabā' },
  fr: { native: 'Bonjour', translit: 'Bonjour' },
  ru: { native: 'Привет', translit: 'privet' },
  pt: { native: 'Olá', translit: 'Olá' },
  de: { native: 'Hallo', translit: 'Hallo' },
  ja: { native: 'こんにちは', translit: 'konnichiwa' },
  ko: { native: '안녕하세요', translit: 'annyeong haseyo' },
  it: { native: 'Ciao', translit: 'Ciao' },
  tr: { native: 'Merhaba', translit: 'Merhaba' },
  vi: { native: 'Xin chào', translit: 'Xin chào' },
  pl: { native: 'Cześć', translit: 'Cześć' },
  uk: { native: 'Привіт', translit: 'pryvit' },
  fa: { native: 'سلام', translit: 'salām' },
  nl: { native: 'Hallo', translit: 'Hallo' },
  th: { native: 'สวัสดี', translit: 's̄wạs̄dī' },
  id: { native: 'Halo', translit: 'Halo' },
  ms: { native: 'Halo', translit: 'Halo' },
  ur: { native: 'سلام', translit: 'salām' },
  ta: { native: 'வணக்கம்', translit: 'vaṇakkam' },
  te: { native: 'నమస్కారం', translit: 'namaskāram' },
  mr: { native: 'नमस्कार', translit: 'namaskār' },
  gu: { native: 'નમસ્તે', translit: 'namastē' },
  kn: { native: 'ನಮಸ್ಕಾರ', translit: 'namaskāra' },
  ml: { native: 'നമസ്കാരം', translit: 'namaskāram' },
  bn: { native: 'নমস্কার', translit: 'nomoskār' },
  pa: { native: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', translit: 'sat srī akāl' },
  my: { native: 'မင်္ဂလာပါ', translit: 'mingalābā' },
  km: { native: 'សួស្តី', translit: 'suŏ sdey' },
  ne: { native: 'नमस्ते', translit: 'namastē' },
  si: { native: 'ආයුබෝවන්', translit: 'āyubōvan' },
  he: { native: 'שלום', translit: 'shalom' },
  // African languages
  zu: { native: 'Sawubona', translit: 'Sawubona' },
  xh: { native: 'Molo', translit: 'Molo' },
  st: { native: 'Lumela', translit: 'Lumela' },
  nso: { native: 'Dumela', translit: 'Dumela' },
  sw: { native: 'Habari', translit: 'Habari' },
};

type FloatingProps = { side: 'left' | 'right' };

type Spawned = {
  id: number;
  label: string;
  dur: number; // seconds
  top: string; // e.g., '110%'
  delay: number; // seconds
  fontSize: number; // px
  opacity: number;
  drift: number; // px
  driftStart: number; // px
};
// Track reserved vertical bands to avoid overlap and reset when leaving page
const usedBands = { left: [] as { start: number; end: number; expiresAt: number }[], right: [] as { start: number; end: number; expiresAt: number }[] };

// Allocate a free vertical band (in %) that doesn't overlap existing active ones, per side
const allocateBand = (durMs: number, side: 'left' | 'right'): number => {
  const now = Date.now();
  const list = side === 'left' ? usedBands.left : usedBands.right;
  // Clean up expired reservations
  const filtered = list.filter(b => b.expiresAt > now);
  if (side === 'left') usedBands.left = filtered; else usedBands.right = filtered;

  const bandHeight = 8; // each label uses ~8% vertical space while moving
  const maxTop = 96; // 0..96 inclusive
  const attemptOrder = Array.from({ length: Math.floor(maxTop / bandHeight) }, (_, i) => i)
    .sort(() => Math.random() - 0.5);

  for (const slot of attemptOrder) {
    const start = slot * bandHeight;
    const end = start + bandHeight;
    const overlaps = (side === 'left' ? usedBands.left : usedBands.right).some(b => !(end <= b.start || start >= b.end));
    if (!overlaps) {
      (side === 'left' ? usedBands.left : usedBands.right).push({ start, end, expiresAt: now + durMs });
      return Math.min(100, end);
    }
  }
  return 98;
};


const FloatingHellos: React.FC<FloatingProps> = ({ side }) => {
  const pool = popularLanguages.slice(0, 36);
  const nextIdx = React.useRef(0);
  const started = React.useRef(false);
  const [active, setActive] = React.useState<Spawned[]>([]);
  const maxSimultaneous = 3; // ensure more spacing; never crowd
  const makeLabel = (idx: number) => {
    const lang = pool[idx % pool.length];
    const entry = (hellos as any)[lang.code] as HelloEntry | undefined;
    const native = entry?.native || 'Hello';
    const translit = entry?.translit ? ` · ${entry.translit}` : '';
    return `${native}${translit} (${lang.name})`;
  };
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;
  const randint = (min: number, max: number) => Math.floor(rand(min, max + 1));

  // deterministic-ish spacing: fixed cadence per side
  const cadenceMs = 1200;

  const spawn = (count = 1) => {
    setActive(prev => {
      // Clean out any items we may still have due to missed timeouts
      const now = Date.now();
      const cleaned = prev; // items are removed via timeout; keep as-is to avoid extra work

      const space = Math.max(0, maxSimultaneous - cleaned.length);
      const n = Math.min(space, count);
      if (n <= 0) return cleaned;

      const added: Spawned[] = [];
      for (let k = 0; k < n; k++) {
        const idx = nextIdx.current++;
        const dur = 18; // seconds: fixed for consistent spacing
        const delay = 0; // start immediately for predictable cadence
        const totalMs = (dur + delay) * 1000;
        const fontSize = randint(12, 18);
        const opacity = rand(0.25, 0.6);
        const top = `${allocateBand(totalMs, side)}%`; // reserve a vertical band to avoid overlap per side
        const drift = (side === 'left' ? 1 : -1) * randint(8, 14); // slightly less drift to reduce crossing
        const driftStart = (side === 'left' ? -1 : 1) * randint(0, 6);
        const id = Date.now() + k;
        added.push({
          id,
          label: makeLabel(idx),
          dur,
          top,
          delay,
          fontSize,
          opacity,
          drift,
          driftStart,
        });
        // Schedule removal when the animation completes
        setTimeout(() => {
          setActive(prev2 => prev2.filter(it => it.id !== id));
        }, totalMs + 120);
      }
      return [...cleaned, ...added];
    });
  };

  // No interval cleanup; items expire via timeouts set at spawn

  // Scheduler: steady single spawns (no bursts) for smoother flow
  React.useEffect(() => {
    if (started.current) return;
    started.current = true;

    // steady spawns: fixed cadence with left/right offset so lanes interleave
    let cancelled = false;
    const initialOffset = side === 'left' ? 0 : Math.floor(cadenceMs / 2);

    const tick = () => {
      if (cancelled) return;
      spawn(1);
      setTimeout(tick, cadenceMs);
    };

    // initial seeds
    spawn(1);
    const h1 = setTimeout(() => { tick(); }, initialOffset || 1);
    return () => { cancelled = true; clearTimeout(h1); };


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mark expiry timestamps when items mount
  React.useEffect(() => {
    setActive(prev => prev.map((it: any) => it._expires ? it : ({ ...it, _expires: Date.now() + (it.dur * 1000) })) as any);
  }, [active.length]);

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-y-0 ${side === 'left' ? 'left-6 md:left-12 lg:left-20' : 'right-6 md:right-12 lg:right-20'} w-48 sm:w-56 z-50`}>
      {active.map((it) => (
        <div
          key={it.id}
          className={`hello-float ${side}`}
          style={{
            top: it.top,
            ['--dur' as any]: `${it.dur}s`,
            ['--drift' as any]: `${it.drift}px`,
            ['--drift-start' as any]: `${it.driftStart}px`,
            animationDelay: `${it.delay}s`,
            fontSize: `${it.fontSize}px`,
            opacity: it.opacity,
          }}
        >
          {it.label}
        </div>
      ))}
    </div>
  );
};

// Lightweight marquee renderer for absolutely smooth scrolling
const HelloMarquee: React.FC<{ side: 'left' | 'right' }> = ({ side }) => {
  // Ensure African greetings appear by prioritising them in the pool
  const preferredCodes = ['zu', 'xh', 'st', 'nso', 'sw', 'he']; // Zulu, Xhosa, Sesotho, Sepedi, Swahili, Hebrew
  const base = popularLanguages.slice(0, 24);
  // Build preferred list from popularLanguages, falling back for 'nso' (Sepedi) if absent
  const preferred = preferredCodes.map((code) => {
    const found = base.find((l) => l.code === code) || popularLanguages.find((l) => l.code === code);
    if (found) return found;
    // Fallback definitions for any not in popularLanguages
    return { code, name: code === 'nso' ? 'Sepedi' : code.toUpperCase() } as any;
  });
  // Dedupe by code while preserving order: preferred first, then base
  const pool = [...preferred, ...base].filter((item, idx, arr) => arr.findIndex((x) => x.code === item.code) === idx);

  const items = React.useMemo(() => pool.map((lang) => {
    const entry = (hellos as any)[lang.code] as HelloEntry | undefined;
    const hasNative = !!entry?.native && entry.native !== entry?.translit;
    const native = hasNative ? entry!.native : '';
    const translit = entry?.translit || 'Hello';
    // If no distinct native script provided, show only the transliteration (avoid duplication)
    return hasNative ? `${native} · ${translit} (${lang.name})` : `${translit} (${lang.name})`;
  }), [pool]);
  const doubled = React.useMemo(() => [...items, ...items], [items]);
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-y-0 ${side === 'left' ? 'left-2 md:left-4 lg:left-8' : 'right-2 md:right-4 lg:right-8'} w-40 sm:w-48 z-50`}>
      <div className={`hello-marquee ${side}`} style={{ ['--marquee-duration' as any]: '36s' }}>
        {doubled.map((text, idx) => (
          <div key={`${side}-marquee-${idx}`} className="hello-item">{text}</div>
        ))}
      </div>
    </div>
  );
};


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { listMyReadingProgress } from '@/services/translationsSupabase';
import { useAuth } from '@/contexts/AuthContext';
import { vivekanandaLectures } from '@/data/readings/vivekanandaParliament';
import { countSentences } from '@/lib/translationUtils';
import { Link } from 'react-router-dom';
import { ReadingProgress, getMyReadingProgressFor } from '@/services/translationsSupabase';
import TranslationLayout from '@/components/layout/TranslationLayout';
import { featureFlags } from '@/utils/featureFlags';
import NotFoundMessage from '@/components/learn/NotFoundMessage';

const ReadHomePage: React.FC = () => {
  if (!featureFlags.enableReadingSection) {
    return (
      <NotFoundMessage
        title="Reading Section Unavailable"
        message="This reading section is currently disabled."
        backTo="/learn"
        backLabel="Back to Learning Centre"
      />
    );
  }

  const { user } = useAuth();
  const [recent, setRecent] = React.useState<Array<{ lectureId: string; lastSentenceIndex: number }>>([]);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!user) { setRecent([]); return; }
      try {
        const rows = await listMyReadingProgress('en', 5);
        if (cancelled) return;
        setRecent(rows.map(r => ({ lectureId: r.lectureId, lastSentenceIndex: r.lastSentenceIndex })));
      } catch {
        setRecent([]);
      }
    })();
    return () => { cancelled = true; };
  }, [user]);

  // Helper to render a resume list
  const ResumeCard = () => {
    if (!user || recent.length === 0) return null;
    return (
      <Card className="border border-indian-saffron/30 mt-6">
        <CardHeader>
          <CardTitle>Continue where you left off</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y">
            {recent.map((r, idx) => {
              const lec = vivekanandaLectures.find(l => l.id === r.lectureId);
              if (!lec) return null;
              const total = countSentences(lec.paragraphs);
              const resumeTo = Math.min(Math.max(0, r.lastSentenceIndex), Math.max(0, total - 1));
              return (
                <li key={`${r.lectureId}-${idx}`} className="py-2 flex items-center justify-between">
                  <div className="text-sm">
                    <div className="font-medium">{lec.title}</div>
                    <div className="text-xs text-gray-600">Sentence {resumeTo + 1} / {total}</div>
                  </div>
                  <Link to={`/read/${lec.id}?lang=en#sent-${resumeTo}`} className="text-sm text-spiritual-700 underline">Resume</Link>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    );
  };

  return (
    <TranslationLayout title="Swami Vivekananda's Chicago Addresses">
      <div className="relative overflow-hidden w-full bg-gradient-to-br from-indian-cream to-white pt-10 pb-16">
        {/* Floating hellos left */}
        <HelloMarquee side="left" />
        {/* Floating hellos right */}
        <HelloMarquee side="right" />

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-left space-y-4">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-center">Swami Vivekananda's Chicago Addresses</h1>
            <p className="text-gray-800">
              On September 11, 1893, Swami Vivekananda delivered the first of six transformative lectures at Chicago's World's Parliament of Religions, known as the 'Chicago Addresses'. Swamiji's radical message went beyond tolerance—he proclaimed that all religions are true paths to the same divine reality.
            </p>
            <p className="text-gray-800">
              Exactly 108 years later, to the day, terrorist attacks struck New York City. The tragic precision of this timing underscores how desperately the world needed—and still needs—Vivekananda's vision of unity.
            </p>
            <p className="text-gray-800">
              We are launching this reading and translation effort on September 11, 2025, to ensure his message of universal truth reaches every corner of our divided world, transforming a date of sorrow back into one of hope.
            </p>
            <p className="text-gray-800">
              Register to track your reading progress through these six lectures, which can be completed within an hour. Our app saves your progress so you can continue where you left off, and offers translation opportunities for multilingual users.
            </p>

            {/* Resume List intentionally hidden per request */}
            {/* <ResumeCard /> */}
          </div>
        </div>
      </div>
    </TranslationLayout>
  );
};

export default ReadHomePage;

