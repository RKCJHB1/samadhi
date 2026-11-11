import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import MalaBeads from '../../components/games/MalaBeads';
import { addChantTotals, buildGroupShare, buildPersonalChantShare, CHANT_APP_HEADING, CHANT_APP_NAME, CHANT_TOTAL_IDS, chantPersonId, createChantGroup, emptyChantTotals, fetchChantGroup, fetchChantGroupList, fetchChantPerson, groupSlug, PartialChantSaveError, saveChantProgress, type ChantCountry, type ChantGroup, type ChantTotalId, type GroupChantTotals } from '../../services/chantGroupService';
import { formatRecordingTime, useChantVideo } from '../../components/games/useChantVideo';
import { seamlessTanpuraBuffer } from '../../lib/seamlessTanpura';

const getTodayString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const MALA_BEAD_COUNT = 108;

const MALA_SUCCESS_PULSE = [100, 90, 100, 90, 180];
const MALA_SUCCESS_MS = MALA_SUCCESS_PULSE.reduce((sum, part) => sum + part, 0);
let malaPulseUntil = 0;

function vibrationForChant(nextCount: number): number | number[] | null {
  const now = Date.now();
  if (nextCount > 0 && nextCount % MALA_BEAD_COUNT === 0) {
    malaPulseUntil = now + MALA_SUCCESS_MS;
    return MALA_SUCCESS_PULSE;
  }
  if (now < malaPulseUntil) return null;
  return 50;
}
const CHANT_AUDIO_POOL_SIZE = 4;
const CHANT_AUDIO_MAX_POLYPHONY = 8;
const CHANT_AUDIO_MIN_GAP_MS = 180;
const AUTO_CHANT_PAUSE_MS = 500;
const AUTO_CHANT_FALLBACK_DURATION_MS = 2500;
const TOTAL_WALK_MS = 10000;
const TANPURA_SRC = '/tanpura.mp3';
const TANPURA_VOLUME = 0.2;
const REMEMBERED_GROUP_KEY = 'aumChantGroup';

function whatsAppBrowserNotice(): { text: string; href?: string; action?: string } | null {
  if (typeof navigator === 'undefined') return null;
  const agent = navigator.userAgent || '';
  if (!/WhatsApp/i.test(agent)) return null;
  const page = window.location.href;
  if (/Android/i.test(agent)) {
    const bare = page.replace(/^https?:\/\//, '');
    return {
      text: 'WhatsApp’s own browser often will not play the chant or count a tap.',
      href: `intent://${bare}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(page)};end`,
      action: 'Open in Chrome',
    };
  }
  return {
    text: 'WhatsApp’s own browser often will not play the chant or count a tap. Tap the Safari icon at the bottom of this screen, then tap the center.',
  };
}

function readRememberedGroup(): { code: string; name: string } | null {
  try {
    const raw = localStorage.getItem(REMEMBERED_GROUP_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { code?: unknown; name?: unknown };
    const code = groupSlug(typeof parsed.code === 'string' ? parsed.code : '');
    const name = typeof parsed.name === 'string' ? parsed.name.trim() : '';
    if (!code || !name) return null;
    return { code, name };
  } catch {
    return null;
  }
}

function writeRememberedGroup(group: { code: string; name: string } | null) {
  try {
    if (!group) {
      localStorage.removeItem(REMEMBERED_GROUP_KEY);
      return;
    }
    localStorage.setItem(REMEMBERED_GROUP_KEY, JSON.stringify({ code: group.code, name: group.name }));
  } catch {
    // Private browsing can block storage. The group still shows for this visit.
  }
}

type RisingTotal = {
  shown: number;
  target: number;
  primed: boolean;
  perMs: number;
};

function freshRising(): RisingTotal {
  return { shown: 0, target: 0, primed: false, perMs: 0 };
}

function freshChantRising(): Record<ChantTotalId, RisingTotal> {
  return {
    om: freshRising(),
    'sri-ram': freshRising(),
    'jai-ma': freshRising(),
    'jai-shri-krishna': freshRising(),
  };
}

function roundedChants(totals: Record<ChantTotalId, RisingTotal>): GroupChantTotals {
  const rounded = emptyChantTotals();
  for (const id of CHANT_TOTAL_IDS) rounded[id] = Math.round(totals[id].shown);
  return rounded;
}

function chantsMatch(left: GroupChantTotals, right: GroupChantTotals): boolean {
  return CHANT_TOTAL_IDS.every((id) => left[id] === right[id]);
}

// The first figure appears at once. A later higher figure is walked over the
// next check. A lower figure is ignored so a save still on its way cannot pull
// the number backwards. A tap on this phone is added separately, at once.
function assignRising(total: RisingTotal, next: number, immediate: boolean): boolean {
  if (!Number.isFinite(next) || next < 0) return false;
  if (!total.primed || immediate) {
    const changed = total.shown !== next || total.target !== next;
    total.primed = true;
    total.shown = next;
    total.target = next;
    total.perMs = 0;
    return changed;
  }
  if (next <= total.target) return false;
  total.target = next;
  total.perMs = (total.target - total.shown) / TOTAL_WALK_MS;
  return true;
}

function bumpRising(total: RisingTotal, by: number): boolean {
  if (by <= 0 || !total.primed) return false;
  total.shown += by;
  total.target += by;
  return true;
}

function advanceRising(total: RisingTotal, dtMs: number): boolean {
  if (total.shown >= total.target || total.perMs <= 0) {
    total.shown = Math.min(total.shown, total.target);
    return false;
  }
  total.shown = Math.min(total.target, total.shown + total.perMs * dtMs);
  return total.shown < total.target;
}

type ChantOption = {
  id: string;
  name: string;
  shortLabel: string;
  symbol: string;
  shareTag?: string;
  imageSrc?: string;
  audioSrc: string;
  isAlwaysAvailable?: boolean;
  isEnabled?: boolean;
};

type ChantHistoryEntry = {
  date: string;
  chants: number;
  chantId: string;
};

const DEFAULT_CHANT_ID = 'om';

const readChantHistory = (): ChantHistoryEntry[] => {
  try {
    const savedHistory = localStorage.getItem('aumChantHistory');
    if (!savedHistory) return [];
    const parsed = JSON.parse(savedHistory);
    if (!Array.isArray(parsed)) return [];

    const merged = new Map<string, ChantHistoryEntry>();
    for (const entry of parsed) {
      if (!entry || typeof entry.date !== 'string' || typeof entry.chants !== 'number' || !Number.isFinite(entry.chants)) {
        continue;
      }
      const chantId = typeof entry.chantId === 'string' && entry.chantId ? entry.chantId : DEFAULT_CHANT_ID;
      const key = `${chantId}|${entry.date}`;
      const existing = merged.get(key);
      if (existing) {
        existing.chants += entry.chants;
      } else {
        merged.set(key, { date: entry.date, chants: entry.chants, chantId });
      }
    }
    return Array.from(merged.values());
  } catch (error) {
    console.error("Could not read history from localStorage:", error);
    return [];
  }
};

const readChantGoals = (): Record<string, number> => {
  try {
    const goals: Record<string, number> = {};
    const savedGoals = localStorage.getItem('aumChantGoals');
    if (savedGoals) {
      const parsed = JSON.parse(savedGoals);
      if (parsed && typeof parsed === 'object') {
        for (const [chantId, value] of Object.entries(parsed as Record<string, unknown>)) {
          const goal = Number(value);
          if (Number.isFinite(goal) && goal > 0) goals[chantId] = goal;
        }
      }
    }
    if (goals[DEFAULT_CHANT_ID] == null) {
      const legacyGoal = localStorage.getItem('aumChantGoal');
      const goal = legacyGoal ? parseInt(legacyGoal, 10) : NaN;
      if (Number.isFinite(goal) && goal > 0) goals[DEFAULT_CHANT_ID] = goal;
    }
    return goals;
  } catch (error) {
    console.error("Could not read goal from localStorage:", error);
    return {};
  }
};

const CHANT_OPTIONS: ChantOption[] = [
  {
    id: 'om',
    name: 'Om',
    shortLabel: 'Om',
    symbol: 'ॐ',
    shareTag: '#Om',
    imageSrc: '/om.jpg',
    audioSrc: '/aum.mp3?v=2',
    isAlwaysAvailable: true,
    isEnabled: true,
  },
  {
    id: 'sri-ram',
    name: 'Jai Shri Ram',
    shortLabel: 'Jai Shri Ram',
    symbol: 'राम',
    shareTag: '#RamNavami',
    imageSrc: '/jai-sri-ram.jpg',
    audioSrc: '/jai-sri-ram.mp3',
    isEnabled: false,
  },
  {
    id: 'jai-ma',
    name: 'Jai Ma',
    shortLabel: 'Jai Ma',
    symbol: 'माँ',
    shareTag: '#JaiMa',
    imageSrc: '/jai-ma.jpg',
    audioSrc: '/jai-ma.mp3',
    isEnabled: false,
  },
  {
    id: 'jai-shri-krishna',
    name: 'Jai Shri Krishna',
    shortLabel: 'Jai Shri Krishna',
    symbol: 'कृष्ण',
    shareTag: '#JaiShriKrishna',
    imageSrc: '/jai-shri-krishna.jpg',
    audioSrc: '/jai-shri-krishna.mp3',
    isEnabled: false,
  },
];

const WHY_THESE_CHANTS = [
  {
    id: 'om',
    name: 'Om',
    text: 'The universal symbol of God. Om is the sacred sound of the one Reality behind every name and form.',
  },
  {
    id: 'sri-ram',
    name: 'Jai Shri Ram',
    text: 'Diwali marks the return of Lord Rama to Ayodhya. After his exile, the people lit rows of lamps to welcome him home.',
  },
  {
    id: 'jai-shri-krishna',
    name: 'Jai Shri Krishna',
    text: 'During Diwali, Lord Krishna destroyed the demon Narakasura. That victory set the captives free and brought a long darkness to an end.',
  },
  {
    id: 'jai-ma',
    name: 'Jai Ma',
    text: 'During Diwali, Mother Lakshmi is worshipped. It also honours the Divine Mother, who destroyed the demon Raktabija: every drop of his blood became another demon, until she put an end to him.',
  },
] as const;

function ChantInfoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-none stroke-current stroke-[1.75]">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6" strokeLinecap="round" />
      <circle cx="12" cy="7.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function GroupJoinList({
  groups,
  currentCode,
  listFailed,
  onJoin,
}: {
  groups: ChantGroup[];
  currentCode: string | null;
  listFailed: boolean;
  onJoin: (group: ChantGroup) => void;
}) {
  const [query, setQuery] = useState('');
  const needle = query.trim().toLowerCase();
  const visible = groups.filter((group) => !needle || group.name.toLowerCase().includes(needle));
  const ordered = [...visible].sort((a, b) => {
    const aCurrent = Boolean(currentCode) && a.code.toLowerCase() === currentCode.toLowerCase();
    const bCurrent = Boolean(currentCode) && b.code.toLowerCase() === currentCode.toLowerCase();
    if (aCurrent === bCurrent) return 0;
    return aCurrent ? -1 : 1;
  });

  return (
    <div>
      <p className="mb-3 text-center text-xs leading-relaxed text-spiritual-200/85">
        Everyone can chant at their own time. You do not have to be online together.
      </p>
      <label className="mb-3 block">
        <span className="sr-only">Find a group</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Find a group"
          className="w-full rounded border border-amber-900/20 px-3 py-2 text-sm text-slate-900 caret-slate-900 placeholder:text-slate-600 [color-scheme:light] [-webkit-text-fill-color:#0f172a]"
        />
      </label>
      {groups.length === 0 ? (
        <p className="text-center text-xs text-spiritual-300/70">
          {listFailed
            ? 'The group list could not be loaded. It will try again.'
            : 'No saved group totals yet.'}
        </p>
      ) : ordered.length === 0 ? (
        <p className="text-center text-xs text-spiritual-300/70">No group has that name.</p>
      ) : (
        <ul className="max-h-64 space-y-2 overflow-y-auto pr-1">
          {ordered.map((group) => {
            const current = Boolean(currentCode) && group.code.toLowerCase() === currentCode.toLowerCase();
            return (
              <li key={group.code}>
                <button
                  type="button"
                  onClick={() => onJoin(group)}
                  className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left ${current ? 'border-amber-200/50 bg-spiritual-600/30' : 'border-spiritual-400/20 hover:bg-spiritual-600/20'}`}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-spiritual-100">{group.name}</span>
                    <span className="block text-xs text-spiritual-300/70">{group.total.toLocaleString()} chants</span>
                  </span>
                  <span className={`shrink-0 rounded px-3 py-1 text-xs ${current ? 'bg-amber-700/80 text-amber-50' : 'bg-spiritual-600 text-white'}`}>
                    {current ? 'Joined' : 'Join'}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function renderWhatsAppText(text: string): React.ReactNode[] {
  const pattern = /(_\*[^*\n]+?\*_|\*_[^*\n]+?_\*|\*[^*\n]+?\*|_[^_\n]+?_)/g;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    const boldItalic = token.startsWith('_*') || token.startsWith('*_');
    const bold = !boldItalic && token.startsWith('*');
    const inner = boldItalic ? token.slice(2, -2) : token.slice(1, -1);
    nodes.push(
      <span key={key} className={boldItalic ? 'font-bold italic' : bold ? 'font-bold' : 'italic'}>{inner}</span>,
    );
    key += 1;
    last = match.index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function ChantFold({
  title,
  summary,
  summaryId,
  children,
}: {
  title: string;
  summary: string;
  summaryId?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <details
      className="group w-full max-w-md rounded-xl border border-spiritual-400/25 bg-slate-900/40 text-sm text-spiritual-100"
      open={open}
      onToggle={(event) => {
        setOpen(event.currentTarget.open);
      }}
    >
      <summary className="flex cursor-pointer list-none items-center gap-3 px-3 py-2.5 [&::-webkit-details-marker]:hidden">
        <span className="font-sans text-spiritual-100">{title}</span>
        <span id={summaryId} className="ml-auto font-mono text-white/80">{summary}</span>
        <span aria-hidden className="text-spiritual-300/70 transition-transform group-open:rotate-180">▾</span>
      </summary>
      <div className="flex flex-col items-center gap-2 border-t border-spiritual-400/20 px-3 py-3 text-center text-xs leading-relaxed text-spiritual-200/85">
        {children}
      </div>
    </details>
  );
}

function countryLine(country: ChantCountry): string {
  let name = country.code;
  try {
    name = new Intl.DisplayNames(['en'], { type: 'region' }).of(country.code) || country.code;
  } catch {
    name = country.code;
  }
  return `${name}: ${country.total.toLocaleString()}`;
}

const AumChanterPage = () => {
  const [history, setHistory] = useState<ChantHistoryEntry[]>(readChantHistory);
  const [goalsByChant, setGoalsByChant] = useState<Record<string, number>>(readChantGoals);

  const [isChanted, setIsChanted] = useState<boolean>(false);
  const [malaComplete, setMalaComplete] = useState(false);
  const malaFlashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [chantEffects, setChantEffects] = useState<{ id: number; active: boolean }[]>([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState<boolean>(false);
  const [isShareVisible, setIsShareVisible] = useState<boolean>(false);
  const [isGroupsVisible, setIsGroupsVisible] = useState<boolean>(false);
  const [isGoalModalVisible, setIsGoalModalVisible] = useState<boolean>(false);
  const [goalInputValue, setGoalInputValue] = useState<string>('');
  const audioPoolRef = useRef<HTMLAudioElement[]>([]);
  const tanpuraContextRef = useRef<AudioContext | null>(null);
  const tanpuraBufferRef = useRef<AudioBuffer | null>(null);
  const tanpuraSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const tanpuraGenerationRef = useRef(0);
  const nextAudioIndexRef = useRef<number>(0);
  const lastAudioPlayAtRef = useRef<number>(0);
  const lastChantTapAtRef = useRef(0);
  const [whatsAppNotice] = useState(whatsAppBrowserNotice);
  const chantDurationMsRef = useRef<number>(AUTO_CHANT_FALLBACK_DURATION_MS);
  const [selectedChantId, setSelectedChantId] = useState<string>(() => {
    try {
      return localStorage.getItem('aumSelectedChant') || DEFAULT_CHANT_ID;
    } catch (error) {
      console.error("Could not read selected chant from localStorage:", error);
      return DEFAULT_CHANT_ID;
    }
  });
  const selectedChantIdRef = useRef(selectedChantId);
  selectedChantIdRef.current = selectedChantId;
  const chantTotalsRef = useRef<Record<string, number>>({});

  // Auto-chant state
  const [isAutoChantModalVisible, setIsAutoChantModalVisible] = useState<boolean>(false);
  const [autoChantInputValue, setAutoChantInputValue] = useState<string>('');
  const [isAutoChanting, setIsAutoChanting] = useState<boolean>(false);
  const [autoChantRemaining, setAutoChantRemaining] = useState<number>(0);
  const autoChantIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [recordChants, setRecordChants] = useState<number>(0);
  const [avgChantsPerUser, setAvgChantsPerUser] = useState<number>(0);

  const availableChants = useMemo(
    () => CHANT_OPTIONS.filter((chant) => chant.isAlwaysAvailable || chant.isEnabled),
    []
  );

  const currentChant = useMemo(
    () => availableChants.find((chant) => chant.id === selectedChantId) ?? availableChants[0] ?? CHANT_OPTIONS[0],
    [availableChants, selectedChantId]
  );

  const countsByChant = useMemo(() => {
    const totals: Record<string, number> = {};
    for (const entry of history) {
      totals[entry.chantId] = (totals[entry.chantId] || 0) + entry.chants;
    }
    return totals;
  }, [history]);

  const chantHistory = useMemo(
    () => history.filter((entry) => entry.chantId === currentChant.id),
    [history, currentChant.id]
  );

  const count = countsByChant[currentChant.id] || 0;
  for (const [id, total] of Object.entries(countsByChant)) {
    if (total >= (chantTotalsRef.current[id] || 0)) chantTotalsRef.current[id] = total;
  }
  const dailyGoal = goalsByChant[currentChant.id] ?? null;
  const {
    phase: videoPhase,
    elapsedMs: videoElapsedMs,
    error: videoError,
    videoUrl,
    sessionCount: videoSessionCount,
    canShare,
    notice: videoNotice,
    setCanvasNode,
    syncFrame,
    noteChant,
    startRecording,
    stopRecording,
    discardVideo,
    downloadVideo,
    shareVideo,
  } = useChantVideo();
  const [chanterName, setChanterName] = useState(() => {
    try {
      return localStorage.getItem('aumChanterName') ?? '';
    } catch {
      return '';
    }
  });
  const [groupNameDraft, setGroupNameDraft] = useState(() => {
    try {
      const fromUrl = new URLSearchParams(window.location.search).get('group');
      const urlSlug = groupSlug(fromUrl ?? '');
      if (urlSlug) return urlSlug.replace(/_/g, ' ');
      return readRememberedGroup()?.name ?? '';
    } catch {
      return '';
    }
  });
  const [groupCode, setGroupCode] = useState<string | null>(null);
  const [groupTitle, setGroupTitle] = useState('');
  const [whyChantsOpen, setWhyChantsOpen] = useState(false);
  const [chantNoteId, setChantNoteId] = useState<string | null>(null);
  const whyChantsRef = useRef<HTMLDivElement>(null);
  const chantNotesRef = useRef<HTMLDivElement>(null);
  const [groupTotal, setGroupTotal] = useState(0);
  const [groupNotice, setGroupNotice] = useState('');
  const [isSavingGroup, setIsSavingGroup] = useState(false);
  const [savedTotal, setSavedTotal] = useState(0);
  const [savedReady, setSavedReady] = useState(false);
  const [savedWorldwide, setSavedWorldwide] = useState(0);
  const [worldShown, setWorldShown] = useState(0);
  const [groupShown, setGroupShown] = useState(0);
  const [worldChantShown, setWorldChantShown] = useState<GroupChantTotals>(emptyChantTotals);
  const [groupChantShown, setGroupChantShown] = useState<GroupChantTotals>(emptyChantTotals);
  const [worldwideReady, setWorldwideReady] = useState(false);
  const [worldwideFailed, setWorldwideFailed] = useState(false);
  const [recordReady, setRecordReady] = useState(false);
  const [chanterCount, setChanterCount] = useState(0);
  const [groupPersonTotal, setGroupPersonTotal] = useState(0);
  const [leaderboard, setLeaderboard] = useState<ChantGroup[]>([]);
  const groupNameDraftRef = useRef(groupNameDraft);
  groupNameDraftRef.current = groupNameDraft;
  const groupCodeRef = useRef<string | null>(null);
  const groupTitleRef = useRef('');
  const confirmedGroupRef = useRef(0);
  const pendingGroupRef = useRef(0);
  const confirmedByChantRef = useRef<GroupChantTotals>(emptyChantTotals());
  const pendingByChantRef = useRef<GroupChantTotals>(emptyChantTotals());
  const pendingPersonByChantRef = useRef<GroupChantTotals>(emptyChantTotals());
  const [countries, setCountries] = useState<ChantCountry[]>([]);
  const [groupByChant, setGroupByChant] = useState<GroupChantTotals>(emptyChantTotals());
  const groupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saveRetryRef = useRef(2000);
  const personIdRef = useRef('');
  const chanterNameRef = useRef('');
  const confirmedPersonRef = useRef(0);
  const pendingPersonRef = useRef(0);
  const confirmedGlobalRef = useRef(0);
  const confirmedRecordRef = useRef(0);
  const confirmedGroupPersonRef = useRef(0);
  const pendingGroupCodeRef = useRef('');
  const flushSavedChantsRef = useRef<() => void>(() => {});
  const worldTickRef = useRef(freshRising());
  const worldChantTickRef = useRef(freshChantRising());
  const groupTickRef = useRef(freshRising());
  const groupChantTickRef = useRef(freshChantRising());
  const groupTickCodeRef = useRef('');
  const totalFrameRef = useRef(0);
  const totalFrameAtRef = useRef(0);
  const paintedTotalsRef = useRef({ world: 0, group: 0, worldChant: emptyChantTotals(), groupChant: emptyChantTotals() });
  const totalsApi = useRef({
    noteWorld: (_total: number, _byChant: GroupChantTotals) => {},
    bumpWorld: (_by: number, _chant: ChantTotalId | null) => {},
    noteGroup: (_code: string, _total: number, _byChant: GroupChantTotals) => {},
    bumpGroup: (_chant: ChantTotalId) => {},
  });
  const historySumRef = useRef(0);
  const createGroupRef = useRef<Promise<ChantGroup | null> | null>(null);
  const createSlugRef = useRef('');
  const chantNameRef = useRef('Om');
  chantNameRef.current = currentChant.name;
  chanterNameRef.current = chanterName;
  historySumRef.current = history.reduce((sum, entry) => sum + entry.chants, 0);

  const publishTotals = useCallback(() => {
    const world = Math.round(worldTickRef.current.shown);
    const group = Math.round(groupTickRef.current.shown);
    const worldChant = roundedChants(worldChantTickRef.current);
    const groupChant = roundedChants(groupChantTickRef.current);
    const painted = paintedTotalsRef.current;
    if (painted.world !== world) {
      painted.world = world;
      setWorldShown(world);
    }
    if (painted.group !== group) {
      painted.group = group;
      setGroupShown(group);
    }
    if (!chantsMatch(painted.worldChant, worldChant)) {
      painted.worldChant = worldChant;
      setWorldChantShown(worldChant);
    }
    if (!chantsMatch(painted.groupChant, groupChant)) {
      painted.groupChant = groupChant;
      setGroupChantShown(groupChant);
    }
  }, []);

  const totalsMoving = useCallback(() => {
    if (worldTickRef.current.shown < worldTickRef.current.target) return true;
    if (groupTickRef.current.shown < groupTickRef.current.target) return true;
    return CHANT_TOTAL_IDS.some((id) => (
      worldChantTickRef.current[id].shown < worldChantTickRef.current[id].target
      || groupChantTickRef.current[id].shown < groupChantTickRef.current[id].target
    ));
  }, []);

  const pumpTotals = useCallback(() => {
    if (totalFrameRef.current) return;
    totalFrameAtRef.current = 0;
    const step = (now: number) => {
      const dt = totalFrameAtRef.current ? now - totalFrameAtRef.current : 0;
      totalFrameAtRef.current = now;
      advanceRising(worldTickRef.current, dt);
      advanceRising(groupTickRef.current, dt);
      for (const id of CHANT_TOTAL_IDS) {
        advanceRising(worldChantTickRef.current[id], dt);
        advanceRising(groupChantTickRef.current[id], dt);
      }
      publishTotals();
      if (totalsMoving()) totalFrameRef.current = window.requestAnimationFrame(step);
      else totalFrameRef.current = 0;
    };
    totalFrameRef.current = window.requestAnimationFrame(step);
  }, [publishTotals, totalsMoving]);

  const settleTotals = useCallback(() => {
    publishTotals();
    if (totalsMoving()) pumpTotals();
  }, [publishTotals, pumpTotals, totalsMoving]);

  totalsApi.current.noteWorld = (total, byChant) => {
    assignRising(worldTickRef.current, total, false);
    for (const id of CHANT_TOTAL_IDS) assignRising(worldChantTickRef.current[id], byChant[id] ?? 0, false);
    settleTotals();
  };
  totalsApi.current.bumpWorld = (by, chant) => {
    bumpRising(worldTickRef.current, by);
    if (chant) bumpRising(worldChantTickRef.current[chant], by);
    publishTotals();
  };
  totalsApi.current.noteGroup = (code, total, byChant) => {
    const snap = groupTickCodeRef.current !== code;
    groupTickCodeRef.current = code;
    assignRising(groupTickRef.current, total, snap);
    for (const id of CHANT_TOTAL_IDS) assignRising(groupChantTickRef.current[id], byChant[id] ?? 0, snap);
    settleTotals();
  };
  totalsApi.current.bumpGroup = (chant) => {
    bumpRising(groupTickRef.current, 1);
    bumpRising(groupChantTickRef.current[chant], 1);
    publishTotals();
  };

  useEffect(() => () => {
    if (totalFrameRef.current) window.cancelAnimationFrame(totalFrameRef.current);
  }, []);

  const adoptGroup = useCallback((group: ChantGroup) => {
    if (groupCodeRef.current && groupCodeRef.current.toLowerCase() !== group.code.toLowerCase() && pendingGroupRef.current > 0) {
      flushSavedChantsRef.current();
    }
    groupCodeRef.current = group.code;
    groupTitleRef.current = group.name;
    confirmedGroupRef.current = group.total;
    confirmedByChantRef.current = group.byChant ?? emptyChantTotals();
    setGroupCode(group.code);
    setGroupTitle(group.name);
    const nextGroupTotal = group.total + pendingGroupRef.current;
    const nextGroupChants = addChantTotals(confirmedByChantRef.current, pendingByChantRef.current);
    setGroupTotal(nextGroupTotal);
    setGroupByChant(nextGroupChants);
    totalsApi.current.noteGroup(group.code, nextGroupTotal, nextGroupChants);
    setGroupNotice('');
    writeRememberedGroup({ code: group.code, name: group.name });
    const draft = groupNameDraftRef.current.trim();
    const draftMatches = groupSlug(draft).toLowerCase() === group.code.toLowerCase();
    const draftIsSlug = draft.toLowerCase() === group.code.replace(/_/g, ' ').toLowerCase();
    if (!draftMatches || draftIsSlug) setGroupNameDraft(group.name);
    window.history.replaceState({}, '', `/chant?group=${encodeURIComponent(group.code)}`);
  }, []);

  const clearMissingGroup = useCallback((code: string) => {
    const missing = code.toLowerCase();
    const openCode = groupCodeRef.current?.toLowerCase() ?? '';
    const remembered = readRememberedGroup()?.code.toLowerCase() ?? '';
    const urlCode = groupSlug(new URLSearchParams(window.location.search).get('group') ?? '').toLowerCase();
    if (missing !== openCode && missing !== remembered && missing !== urlCode) return;
    pendingGroupRef.current = 0;
    pendingByChantRef.current = emptyChantTotals();
    pendingGroupCodeRef.current = '';
    groupCodeRef.current = null;
    groupTitleRef.current = '';
    writeRememberedGroup(null);
    setGroupCode(null);
    setGroupTitle('');
    if (groupSlug(groupNameDraftRef.current).toLowerCase() === missing) {
      groupNameDraftRef.current = '';
      setGroupNameDraft('');
    }
    setGroupNotice('This group link was not found.');
    window.history.replaceState({}, '', '/chant');
  }, []);

  const ensureChantGroup = useCallback(async (createIfMissing = false): Promise<ChantGroup | null> => {
    const typed = groupNameDraftRef.current.trim();
    const typedSlug = groupSlug(typed);
    const fromUrl = groupSlug(new URLSearchParams(window.location.search).get('group') ?? '');
    if (typed && !typedSlug) {
      setGroupNotice('Use letters and numbers for the group name.');
      return null;
    }
    const slug = typedSlug || fromUrl;
    if (!slug) {
      setGroupNotice('Type a group name.');
      return null;
    }
    if (groupCodeRef.current && slug.toLowerCase() === groupCodeRef.current.toLowerCase()) {
      return {
        code: groupCodeRef.current,
        name: groupTitleRef.current,
        chantName: chantNameRef.current,
        total: confirmedGroupRef.current,
        byChant: confirmedByChantRef.current,
      };
    }
    if (createGroupRef.current && createSlugRef.current === slug.toLowerCase()) {
      return createGroupRef.current;
    }

    const chantName = chantNameRef.current;
    const label = typedSlug ? typed : slug.replace(/_/g, ' ');
    let pending: Promise<ChantGroup | null>;
    pending = fetchChantGroup(slug)
      .then((found) => {
        if (found) return found;
        if (!createIfMissing) {
          clearMissingGroup(slug);
          return null;
        }
        return createChantGroup(label, chantName);
      })
      .then((group) => {
        if (!group) return null;
        const nowTyped = groupSlug(groupNameDraftRef.current).toLowerCase();
        const nowUrl = groupSlug(new URLSearchParams(window.location.search).get('group') ?? '').toLowerCase();
        const code = group.code.toLowerCase();
        if (nowTyped === code || nowUrl === code) adoptGroup(group);
        return group;
      })
      .catch((error: unknown) => {
        const offline = error instanceof Error && error.message === 'offline';
        const openedFromLink = !typedSlug && Boolean(fromUrl);
        setGroupNotice(offline
          ? (openedFromLink
            ? 'This group link is open. The shared total is not connected on this site yet.'
            : 'The group total is not connected on this site yet. You can still copy and share this link.')
          : (openedFromLink
            ? 'The group total could not be loaded. You can still copy and share this link.'
            : 'The group total could not be saved. You can still copy and share this link.'));
        return null;
      })
      .finally(() => {
        if (createGroupRef.current === pending) createGroupRef.current = null;
      });
    createSlugRef.current = slug.toLowerCase();
    createGroupRef.current = pending;
    return pending;
  }, [adoptGroup, clearMissingGroup]);

  const createTypedGroup = useCallback(async () => {
    setIsSavingGroup(true);
    setGroupNotice('');
    try {
      const saved = await ensureChantGroup(true);
      if (!saved) return;
      setGroupNotice(`You are in the ${saved.name} group.`);
    } finally {
      setIsSavingGroup(false);
    }
  }, [ensureChantGroup]);

  const joinListedGroup = (group: ChantGroup, closeList: boolean) => {
    adoptGroup(group);
    if (closeList) setIsGroupsVisible(false);
  };

  const refreshLeaderboard = useCallback(() => {
    void fetchChantGroupList().then((summary) => {
      setLeaderboard(summary.groups);
      confirmedGlobalRef.current = summary.globalTotal;
      confirmedRecordRef.current = summary.recordTotal;
      const pendingChants = pendingPersonByChantRef.current;
      const worldChants = emptyChantTotals();
      for (const id of CHANT_TOTAL_IDS) worldChants[id] = (summary.byChant[id] ?? 0) + pendingChants[id];
      setSavedWorldwide(summary.globalTotal + pendingPersonRef.current);
      totalsApi.current.noteWorld(summary.globalTotal + pendingPersonRef.current, worldChants);
      setRecordChants(Math.max(summary.recordTotal, confirmedPersonRef.current + pendingPersonRef.current));
      setChanterCount(summary.chanterCount);
      setCountries(summary.countries);
      setAvgChantsPerUser(summary.chanterCount > 0 ? summary.globalTotal / summary.chanterCount : 0);
      setWorldwideReady(true);
      setWorldwideFailed(false);
      setRecordReady(true);
      const code = groupCodeRef.current;
      if (!code) return;
      const listed = summary.groups.find((group) => group.code.toLowerCase() === code.toLowerCase());
      const applyGroup = (group: ChantGroup) => {
        if (!groupCodeRef.current || group.code.toLowerCase() !== groupCodeRef.current.toLowerCase()) return;
        confirmedGroupRef.current = group.total;
        confirmedByChantRef.current = group.byChant;
        const total = group.total + pendingGroupRef.current;
        const byChant = addChantTotals(group.byChant, pendingByChantRef.current);
        setGroupTotal(total);
        setGroupByChant(byChant);
        totalsApi.current.noteGroup(group.code, total, byChant);
      };
      if (listed) {
        applyGroup(listed);
        return;
      }
      void fetchChantGroup(code).then((group) => {
        if (group) applyGroup(group);
        else clearMissingGroup(code);
      }).catch(() => {
        // Keep the group total already on screen.
      });
    }).catch(() => {
      setWorldwideFailed(true);
    });
  }, [clearMissingGroup]);

  const flushSavedChants = useCallback(() => {
    const amount = pendingPersonRef.current;
    if (amount <= 0) return;
    pendingPersonRef.current = 0;
    const groupAmount = pendingGroupRef.current;
    const groupByChant = { ...pendingByChantRef.current };
    const personByChant = { ...pendingPersonByChantRef.current };
    pendingGroupRef.current = 0;
    pendingByChantRef.current = emptyChantTotals();
    pendingPersonByChantRef.current = emptyChantTotals();
    const showGroupTotals = () => {
      const total = confirmedGroupRef.current + pendingGroupRef.current;
      const byChant = addChantTotals(confirmedByChantRef.current, pendingByChantRef.current);
      setGroupTotal(total);
      setGroupByChant(byChant);
      const code = groupCodeRef.current;
      if (code) totalsApi.current.noteGroup(code, total, byChant);
    };
    const groupCodeForBatch = pendingGroupCodeRef.current;
    pendingGroupCodeRef.current = '';
    void (async () => {
      let code = groupCodeForBatch || groupCodeRef.current;
      if (groupAmount > 0 && !code) {
        const group = await ensureChantGroup(true);
        code = group?.code ?? null;
      }
      try {
        const saved = await saveChantProgress(
          personIdRef.current || chantPersonId(),
          amount,
          chanterNameRef.current.trim(),
          groupAmount > 0 && code ? code : '',
          groupAmount > 0 && code ? groupAmount : 0,
          groupAmount > 0 && code ? groupByChant : emptyChantTotals(),
          personByChant,
        );
        confirmedPersonRef.current = saved.person.total;
        saveRetryRef.current = 2000;
        setSavedTotal(saved.person.total + pendingPersonRef.current);
        setRecordChants(Math.max(confirmedRecordRef.current, saved.person.total + pendingPersonRef.current));
        setSavedReady(true);
        if (saved.group && groupCodeRef.current === saved.group.code) {
          confirmedGroupRef.current = saved.group.total;
          confirmedByChantRef.current = saved.group.byChant;
          showGroupTotals();
        } else if (groupAmount > 0 && !saved.group) {
          pendingGroupRef.current += groupAmount;
          pendingByChantRef.current = addChantTotals(pendingByChantRef.current, groupByChant);
          if (!pendingGroupCodeRef.current && code) pendingGroupCodeRef.current = code;
          showGroupTotals();
        }
        if (saved.person.groupTotal != null && code && groupCodeRef.current === code) {
          confirmedGroupPersonRef.current = saved.person.groupTotal;
          setGroupPersonTotal(saved.person.groupTotal + pendingGroupRef.current);
        }
        refreshLeaderboard();
      } catch (error) {
        const sent = error instanceof PartialChantSaveError ? error.sent : 0;
        const groupSent = error instanceof PartialChantSaveError ? error.groupSent : 0;
        const sentByChant = error instanceof PartialChantSaveError ? error.sentByChant : emptyChantTotals();
        const unsentByChant = error instanceof PartialChantSaveError ? error.unsentByChant : groupByChant;
        const unsentPersonByChant = error instanceof PartialChantSaveError ? error.unsentPersonByChant : personByChant;
        confirmedPersonRef.current += sent;
        confirmedGroupRef.current += groupSent;
        confirmedGroupPersonRef.current += groupSent;
        confirmedByChantRef.current = addChantTotals(confirmedByChantRef.current, sentByChant);
        pendingPersonRef.current += amount - sent;
        pendingPersonByChantRef.current = addChantTotals(pendingPersonByChantRef.current, unsentPersonByChant);
        setSavedTotal(confirmedPersonRef.current + pendingPersonRef.current);
        setRecordChants(Math.max(confirmedRecordRef.current, confirmedPersonRef.current + pendingPersonRef.current));
        if (groupAmount > 0) {
          pendingGroupRef.current += groupAmount - groupSent;
          pendingByChantRef.current = addChantTotals(pendingByChantRef.current, unsentByChant);
          if (!pendingGroupCodeRef.current && code) pendingGroupCodeRef.current = code;
          showGroupTotals();
          setGroupPersonTotal(confirmedGroupPersonRef.current + pendingGroupRef.current);
        }
        const wait = saveRetryRef.current;
        saveRetryRef.current = Math.min(wait * 2, 30000);
        if (groupTimerRef.current) clearTimeout(groupTimerRef.current);
        groupTimerRef.current = setTimeout(() => flushSavedChants(), wait);
      }
    })();
  }, [ensureChantGroup, refreshLeaderboard]);

  flushSavedChantsRef.current = flushSavedChants;

  const chantOnYourOwn = useCallback(() => {
    flushSavedChants();
    groupCodeRef.current = null;
    groupTitleRef.current = '';
    groupNameDraftRef.current = '';
    writeRememberedGroup(null);
    setGroupCode(null);
    setGroupTitle('');
    setGroupNameDraft('');
    setGroupNotice('');
    setIsGroupsVisible(false);
    window.history.replaceState({}, '', '/chant');
  }, [flushSavedChants]);

  const scheduleSavedChants = useCallback(() => {
    if (groupTimerRef.current) clearTimeout(groupTimerRef.current);
    groupTimerRef.current = setTimeout(() => flushSavedChants(), 2000);
  }, [flushSavedChants]);

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get('group');
    const hasUrlGroup = Boolean(raw && raw.trim());
    const slug = groupSlug(hasUrlGroup ? (raw ?? '') : (readRememberedGroup()?.code ?? ''));
    if (!slug) {
      if (hasUrlGroup) setGroupNotice('Use letters and numbers for the group name.');
      return;
    }
    if (!hasUrlGroup) {
      window.history.replaceState({}, '', `/chant?group=${encodeURIComponent(slug)}`);
    }
    let cancelled = false;
    void ensureChantGroup().then(() => {
      if (cancelled) return;
    });
    return () => {
      cancelled = true;
    };
  }, [ensureChantGroup]);

  useEffect(() => {
    const id = chantPersonId();
    personIdRef.current = id;
    const localAtStart = historySumRef.current;
    let cancelled = false;
    void fetchChantPerson(id, groupCodeRef.current ?? '').then((person) => {
      if (cancelled) return;
      confirmedPersonRef.current = person.total;
      const gap = Math.max(0, localAtStart - person.total);
      pendingPersonRef.current += gap;
      setSavedTotal(person.total + pendingPersonRef.current);
      setRecordChants(Math.max(confirmedRecordRef.current, person.total + pendingPersonRef.current));
      setSavedReady(true);
      if (person.groupTotal != null) {
        confirmedGroupPersonRef.current = person.groupTotal;
        setGroupPersonTotal(person.groupTotal);
      }
      if (pendingPersonRef.current > 0) {
        totalsApi.current.bumpWorld(gap, null);
        scheduleSavedChants();
      }
    }).catch(() => {
      if (!cancelled) setSavedReady(false);
    });
    refreshLeaderboard();
    return () => {
      cancelled = true;
    };
  }, [refreshLeaderboard, scheduleSavedChants]);

  useEffect(() => {
    const timer = window.setInterval(() => refreshLeaderboard(), 10000);
    return () => window.clearInterval(timer);
  }, [refreshLeaderboard]);

  useEffect(() => {
    const sendPending = () => flushSavedChantsRef.current();
    const onVisible = () => {
      if (document.visibilityState === 'visible') sendPending();
    };
    window.addEventListener('pagehide', sendPending);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.removeEventListener('pagehide', sendPending);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  useEffect(() => {
    if (!groupCode) return;
    const id = personIdRef.current || chantPersonId();
    personIdRef.current = id;
    let cancelled = false;
    void fetchChantPerson(id, groupCode).then((person) => {
      if (cancelled || groupCodeRef.current !== groupCode) return;
      if (person.groupTotal != null) {
        confirmedGroupPersonRef.current = person.groupTotal;
        setGroupPersonTotal(person.groupTotal + pendingGroupRef.current);
      }
    }).catch(() => {
      // The group card still shows the total from this visit.
    });
    return () => {
      cancelled = true;
    };
  }, [groupCode]);

  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [includeCamera, setIncludeCamera] = useState(false);
  const [videoChantLimit, setVideoChantLimit] = useState<number | null>(null);
  useEffect(() => {
    if (videoPhase !== 'recording') return;
    document.querySelector('[data-chant-button]')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [videoPhase]);
  const noteChantRef = useRef(noteChant);
  noteChantRef.current = noteChant;

  const createChantAudio = useCallback((src: string) => {
    const audio = new Audio(src);
    audio.preload = 'auto';
    audio.crossOrigin = 'anonymous';
    audio.onloadedmetadata = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        chantDurationMsRef.current = audio.duration * 1000;
      }
    };
    audio.onerror = () => {
      console.error('❌ Audio error:', audio.error);
    };
    audio.load();
    return audio;
  }, []);

	  useEffect(() => {
	  	  const previousVoices = audioPoolRef.current;
	  
	  	  previousVoices.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
      audio.onloadedmetadata = null;
      audio.onerror = null;
    });

    audioPoolRef.current = Array.from(
      { length: CHANT_AUDIO_POOL_SIZE },
      () => createChantAudio(currentChant.audioSrc)
    );
    nextAudioIndexRef.current = 0;
    lastAudioPlayAtRef.current = 0;
    chantDurationMsRef.current = AUTO_CHANT_FALLBACK_DURATION_MS;

    return () => {
      audioPoolRef.current.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
        audio.onloadedmetadata = null;
        audio.onerror = null;
      });
    };
  }, [createChantAudio, currentChant.audioSrc]);

  useEffect(() => {
    if (!availableChants.some((chant) => chant.id === selectedChantId)) {
      setSelectedChantId(availableChants[0]?.id ?? 'om');
    }
  }, [availableChants, selectedChantId]);

  // Save local data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aumChantHistory', JSON.stringify(history));
      localStorage.setItem('aumChantGoals', JSON.stringify(goalsByChant));
      localStorage.setItem('aumSelectedChant', selectedChantId);
      const omGoal = goalsByChant[DEFAULT_CHANT_ID];
      if (omGoal) {
        localStorage.setItem('aumChantGoal', omGoal.toString());
      } else {
        localStorage.removeItem('aumChantGoal');
      }
    } catch (error) {
      console.error("Could not write to localStorage:", error);
    }
  }, [history, goalsByChant, selectedChantId]);

  const playTanpuraWithChant = useCallback((voice: HTMLAudioElement) => {
    const context = tanpuraContextRef.current;
    const buffer = tanpuraBufferRef.current;
    if (!context || !buffer || context.state === 'closed') return;
    if (context.state === 'suspended') void context.resume();

    const generation = tanpuraGenerationRef.current + 1;
    tanpuraGenerationRef.current = generation;
    const previous = tanpuraSourceRef.current;
    tanpuraSourceRef.current = null;
    try {
      previous?.stop();
    } catch {
      // The previous drone already ended.
    }

    const gain = context.createGain();
    gain.gain.value = TANPURA_VOLUME;
    gain.connect(context.destination);
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.connect(gain);
    tanpuraSourceRef.current = source;
    const stopWithChant = () => {
      voice.removeEventListener('ended', stopWithChant);
      if (tanpuraGenerationRef.current !== generation) return;
      if (tanpuraSourceRef.current !== source) return;
      tanpuraSourceRef.current = null;
      try {
        source.stop();
      } catch {
        // The drone already finished with the chant.
      }
    };
    voice.addEventListener('ended', stopWithChant);
    try {
      source.start();
    } catch {
      // The next tap starts the drone with the chant again.
    }
  }, []);

  useEffect(() => {
    const context = new AudioContext();
    tanpuraContextRef.current = context;
    let cancelled = false;
    void fetch(TANPURA_SRC)
      .then((response) => response.arrayBuffer())
      .then((bytes) => context.decodeAudioData(bytes))
      .then((buffer) => {
        if (cancelled || context.state === 'closed') return;
        tanpuraBufferRef.current = seamlessTanpuraBuffer(context, buffer);
      })
      .catch(() => {
        // The chant still plays if the drone cannot be decoded.
      });
    return () => {
      cancelled = true;
      const source = tanpuraSourceRef.current;
      tanpuraSourceRef.current = null;
      try {
        source?.stop();
      } catch {
        // The drone had already stopped with the chant.
      }
      tanpuraContextRef.current = null;
      tanpuraBufferRef.current = null;
      if (context.state !== 'closed') void context.close();
    };
  }, []);

  const playChantSound = useCallback((options?: { bypassThrottle?: boolean }) => {
    const now = Date.now();
    if (!options?.bypassThrottle && now - lastAudioPlayAtRef.current < CHANT_AUDIO_MIN_GAP_MS) {
      return null;
    }

    const voices = audioPoolRef.current;
    if (voices.length === 0) {
      return null;
    }

    let selectedIndex = -1;
    for (let i = 0; i < voices.length; i++) {
      const voiceIndex = (nextAudioIndexRef.current + i) % voices.length;
      const voice = voices[voiceIndex];
      if (voice.paused || voice.ended) {
        selectedIndex = voiceIndex;
        break;
      }
    }

    if (selectedIndex === -1 && voices.length < CHANT_AUDIO_MAX_POLYPHONY) {
      const extraVoice = createChantAudio(currentChant.audioSrc);
      voices.push(extraVoice);
      selectedIndex = voices.length - 1;
    }

    if (selectedIndex === -1) {
      return null;
    }

    const selectedVoice = voices[selectedIndex];
    nextAudioIndexRef.current = (selectedIndex + 1) % voices.length;
    lastAudioPlayAtRef.current = now;

    try {
      selectedVoice.pause();
      selectedVoice.currentTime = 0;
      playTanpuraWithChant(selectedVoice);
      const playPromise = selectedVoice.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.error('❌ Audio play failed:', err);
        });
      }
    } catch (err) {
      console.error('❌ Audio play failed:', err);
      return null;
    }

    return selectedVoice;
  }, [createChantAudio, currentChant.audioSrc, playTanpuraWithChant]);

  const handleChant = useCallback((options?: { bypassAudioThrottle?: boolean } | React.MouseEvent<HTMLDivElement>) => {
    const context = tanpuraContextRef.current;
    if (context && context.state === 'suspended') {
      void context.resume();
    }
    // Handle both direct calls and React event calls
    const opts = options && 'bypassAudioThrottle' in options ? options : undefined;
    const playedVoice = playChantSound({ bypassThrottle: opts?.bypassAudioThrottle });

    const chantIdForPulse = selectedChantIdRef.current;
    const nextCount = (chantTotalsRef.current[chantIdForPulse] || 0) + 1;
    chantTotalsRef.current[chantIdForPulse] = nextCount;
    const pulse = vibrationForChant(nextCount);
    if (pulse != null && typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(pulse);
      } catch (e) {}
    }
    if (nextCount > 0 && nextCount % MALA_BEAD_COUNT === 0) {
      setMalaComplete(true);
      if (malaFlashTimerRef.current) clearTimeout(malaFlashTimerRef.current);
      malaFlashTimerRef.current = setTimeout(() => setMalaComplete(false), 900);
    }

    // Update history
    setHistory(currentHistory => {
      const today = getTodayString();
      const chantId = selectedChantIdRef.current;
      const todayEntryIndex = currentHistory.findIndex(entry => entry.date === today && entry.chantId === chantId);
      const newHistory = [...currentHistory];

      if (todayEntryIndex > -1) {
        const updatedEntry = { ...newHistory[todayEntryIndex], chants: newHistory[todayEntryIndex].chants + 1 };
        newHistory[todayEntryIndex] = updatedEntry;
      } else {
        newHistory.push({ date: today, chants: 1, chantId });
      }
      return newHistory;
    });

    // One tap is one chant on this phone, in the saved personal total, and in the named group.
    const chantKey = CHANT_TOTAL_IDS.find((id) => id === selectedChantIdRef.current);
    pendingPersonRef.current += 1;
    if (chantKey) {
      pendingPersonByChantRef.current = {
        ...pendingPersonByChantRef.current,
        [chantKey]: pendingPersonByChantRef.current[chantKey] + 1,
      };
    }
    setSavedTotal(confirmedPersonRef.current + pendingPersonRef.current);
    setSavedWorldwide(confirmedGlobalRef.current + pendingPersonRef.current);
    totalsApi.current.bumpWorld(1, chantKey ?? null);
    setRecordChants(Math.max(confirmedRecordRef.current, confirmedPersonRef.current + pendingPersonRef.current));
    const countingForGroup = Boolean(groupCodeRef.current) || Boolean(groupSlug(groupNameDraftRef.current));
    if (countingForGroup && chantKey) {
      if (!pendingGroupCodeRef.current) {
        pendingGroupCodeRef.current = groupCodeRef.current || groupSlug(groupNameDraftRef.current);
      }
      pendingGroupRef.current += 1;
      pendingByChantRef.current = {
        ...pendingByChantRef.current,
        [chantKey]: pendingByChantRef.current[chantKey] + 1,
      };
      setGroupTotal(confirmedGroupRef.current + pendingGroupRef.current);
      setGroupByChant(addChantTotals(confirmedByChantRef.current, pendingByChantRef.current));
      totalsApi.current.bumpGroup(chantKey);
      setGroupPersonTotal(confirmedGroupPersonRef.current + pendingGroupRef.current);
    }
    scheduleSavedChants();

    noteChantRef.current();
    setIsChanted(true);
    setTimeout(() => setIsChanted(false), 150);

    const newId = Date.now() + Math.random();
    setChantEffects(prev => [...prev, { id: newId, active: false }]);
    setTimeout(() => setChantEffects(prev => prev.filter(effect => effect.id !== newId)), 700);
    return playedVoice;
  }, [playChantSound, scheduleSavedChants]);

  const chantFromTouch = useCallback(() => {
    lastChantTapAtRef.current = Date.now();
    handleChant();
  }, [handleChant]);

  const chantFromClick = useCallback(() => {
    if (Date.now() - lastChantTapAtRef.current < 700) return;
    handleChant();
  }, [handleChant]);

  const handleSetGoal = () => {
    const newGoal = parseInt(goalInputValue, 10);
    const chantId = currentChant.id;
    setGoalsByChant(currentGoals => {
      const nextGoals = { ...currentGoals };
      if (!isNaN(newGoal) && newGoal > 0) {
        nextGoals[chantId] = newGoal;
      } else {
        delete nextGoals[chantId];
      }
      return nextGoals;
    });
    setIsGoalModalVisible(false);
  };

  const clearCurrentGoal = () => {
    const chantId = currentChant.id;
    setGoalsByChant(currentGoals => {
      const nextGoals = { ...currentGoals };
      delete nextGoals[chantId];
      return nextGoals;
    });
    setIsGoalModalVisible(false);
  };

  // Auto-chant ref to track if we should continue
  const autoChantActiveRef = useRef<boolean>(false);
  const autoChantRemainingRef = useRef<number>(0);

  // Function to perform one auto-chant and schedule the next
  const performAutoChant = useCallback(() => {
    if (!autoChantActiveRef.current || autoChantRemainingRef.current <= 0) {
      setIsAutoChanting(false);
      setAutoChantRemaining(0);
      return;
    }

    // Perform the chant
    const playedVoice = handleChant({ bypassAudioThrottle: true });
    autoChantRemainingRef.current--;
    setAutoChantRemaining(autoChantRemainingRef.current);

    // If more chants remain, wait roughly one chant-length plus a short pause.
    if (autoChantRemainingRef.current > 0 && autoChantActiveRef.current) {
      const audioDurationMs = playedVoice && Number.isFinite(playedVoice.duration) && playedVoice.duration > 0
        ? playedVoice.duration * 1000
        : chantDurationMsRef.current;

      autoChantIntervalRef.current = setTimeout(() => {
        performAutoChant();
      }, Math.round(audioDurationMs) + AUTO_CHANT_PAUSE_MS);
    } else {
      // Done chanting
      autoChantActiveRef.current = false;
      setIsAutoChanting(false);
      setAutoChantRemaining(0);
    }
  }, [handleChant]);

  // Start auto-chant
  const startAutoChant = useCallback(() => {
    const count = parseInt(autoChantInputValue, 10);
    if (isNaN(count) || count <= 0 || count > 1000) {
      return;
    }

    setIsAutoChantModalVisible(false);
    setIsShareVisible(false);
    setIsAutoChanting(true);
    setAutoChantRemaining(count);
    autoChantRemainingRef.current = count;
    autoChantActiveRef.current = true;

    // Start the first chant
    performAutoChant();
  }, [autoChantInputValue, performAutoChant]);

  const stopAutoChant = useCallback(() => {
    autoChantActiveRef.current = false;
    if (autoChantIntervalRef.current) {
      clearTimeout(autoChantIntervalRef.current);
      autoChantIntervalRef.current = null;
    }
    setIsAutoChanting(false);
    setAutoChantRemaining(0);
  }, []);

  // Cleanup auto-chant on unmount
  useEffect(() => {
    return () => {
      autoChantActiveRef.current = false;
      if (autoChantIntervalRef.current) {
        clearTimeout(autoChantIntervalRef.current);
      }
    };
  }, []);

  const currentGroupChantTotal = (CHANT_TOTAL_IDS as readonly string[]).includes(currentChant.id)
    ? groupByChant[currentChant.id as ChantTotalId]
    : 0;
  const typedGroupName = groupNameDraft.trim();
  const typedGroupSlug = groupSlug(typedGroupName);
  const previewCode = typedGroupSlug || (typedGroupName ? '' : (groupCode ?? ''));
  const previewName = typedGroupSlug
    ? typedGroupName
    : (groupTitle || (previewCode ? previewCode.replace(/_/g, ' ') : ''));
  const sharingThisGroup = Boolean(groupCode) && previewCode.toLowerCase() === groupCode.toLowerCase();
  const listedGroup = leaderboard.find((group) => group.code.toLowerCase() === previewCode.toLowerCase());
  const listedChantTotal = listedGroup && (CHANT_TOTAL_IDS as readonly string[]).includes(currentChant.id)
    ? listedGroup.byChant[currentChant.id as ChantTotalId]
    : 0;
  const messageGroupTotal = Math.max(sharingThisGroup ? groupTotal : 0, listedGroup?.total ?? 0);
  const messageChantTotal = Math.max(sharingThisGroup ? currentGroupChantTotal : 0, listedChantTotal);
  const groupLink = previewCode
    ? buildGroupShare(
      previewName,
      currentChant.name,
      previewCode,
      messageGroupTotal,
      savedTotal,
      messageChantTotal,
      savedWorldwide,
    )
    : null;
  const personalShare = buildPersonalChantShare(currentChant.name, savedTotal, savedWorldwide);
  const videoMessage = groupLink?.videoText ?? personalShare.videoText;
  const shareHeading = async () => {
    const text = sharingThisGroup && groupLink ? groupLink.whatsappText : personalShare.whatsappText;
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: CHANT_APP_HEADING, text });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Leave the page unchanged when the device cannot share or copy.
    }
  };

  useEffect(() => {
    syncFrame({
      chantName: currentChant.name,
      symbol: currentChant.symbol,
      imageSrc: currentChant.imageSrc,
      audioSrc: currentChant.audioSrc,
      imageScale: 1,
      personName: chanterName,
      globalChants: savedWorldwide,
      groupTitle: sharingThisGroup ? groupTitle : '',
      groupTotal: sharingThisGroup ? groupTotal : 0,
      groupChantTotal: sharingThisGroup ? currentGroupChantTotal : 0,
      personTotal: count,
      shareText: videoMessage,
    });
  }, [chanterName, count, currentChant, currentGroupChantTotal, groupTitle, savedWorldwide, sharingThisGroup, syncFrame, videoMessage]);

  useEffect(() => {
    try {
      localStorage.setItem('aumChanterName', chanterName);
    } catch {
      // Private browsing can block storage. The name still shows for this visit.
    }
  }, [chanterName]);

  useEffect(() => {
    if (videoPhase === 'ready') {
      setIsVideoVisible(true);
      setIsShareVisible(false);
    }
  }, [videoPhase, videoUrl]);

  useEffect(() => {
    const defaultTitle = 'Ramakrishna Centre of South Africa, Johannesburg';
    document.title = `${CHANT_APP_HEADING} | ${defaultTitle}`;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!whyChantsOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      const node = whyChantsRef.current;
      if (node && event.target instanceof Node && !node.contains(event.target)) setWhyChantsOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setWhyChantsOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [whyChantsOpen]);

  useEffect(() => {
    if (!chantNoteId) return;
    const onPointerDown = (event: PointerEvent) => {
      const node = chantNotesRef.current;
      if (node && event.target instanceof Node && !node.contains(event.target)) setChantNoteId(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setChantNoteId(null);
    };
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [chantNoteId]);

  useEffect(() => {
    const root = document.documentElement;
    const previousTouchAction = root.style.touchAction;
    const previousTapHighlight = root.style.webkitTapHighlightColor;
    root.style.touchAction = 'manipulation';
    root.style.webkitTapHighlightColor = 'transparent';
    return () => {
      root.style.touchAction = previousTouchAction;
      root.style.webkitTapHighlightColor = previousTapHighlight;
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.repeat) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key !== ' ' && event.key !== 'Enter') return;
      if (document.querySelector('[data-chant-dialog]')) return;
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const tag = target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || tag === 'VIDEO' || target.isContentEditable) return;
      if (target.closest('button, a, [role="button"], [role="tab"]')) return;
      event.preventDefault();
      handleChant();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleChant]);

  useEffect(() => {
    if (!isVideoVisible) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsVideoVisible(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isVideoVisible]);

  useEffect(() => {
    if (chantEffects.some(effect => !effect.active)) {
      const frameId = requestAnimationFrame(() => {
        setChantEffects(prev =>
          prev.map(effect =>
            !effect.active ? { ...effect, active: true } : effect
          )
        );
      });
      return () => cancelAnimationFrame(frameId);
    }
  }, [chantEffects]);

  const todaysChants = chantHistory.find(entry => entry.date === getTodayString())?.chants || 0;
  const completedMalas = Math.floor(count / MALA_BEAD_COUNT);
  const todaysCompletedMalas = Math.floor(todaysChants / MALA_BEAD_COUNT);
  const chantsIntoCurrentMala = count > 0 && count % MALA_BEAD_COUNT === 0
    ? MALA_BEAD_COUNT
    : count % MALA_BEAD_COUNT;
  const progressPercent = dailyGoal && dailyGoal > 0 ? Math.min((todaysChants / dailyGoal) * 100, 100) : 0;
  const goalMet = progressPercent >= 100;

  const progressRingRadius = 45;
  const progressRingCircumference = 2 * Math.PI * progressRingRadius;
  const strokeDashoffset = progressRingCircumference * (1 - progressPercent / 100);

  const groupLinkParts = groupLink ? groupLink.url.split(/(?=\?)/) : [];
  const rankedGroups = [...leaderboard.map((group) => ({
    ...group,
    total: groupCode && group.code.toLowerCase() === groupCode.toLowerCase()
      ? Math.max(group.total, groupTotal)
      : group.total,
  }))];
  if (
    groupCode
    && groupTitle
    && groupTotal > 0
    && !rankedGroups.some((group) => group.code.toLowerCase() === groupCode.toLowerCase())
  ) {
    rankedGroups.push({
      code: groupCode,
      name: groupTitle,
      chantName: currentChant.name,
      total: groupTotal,
      byChant: groupByChant,
    });
  }
  rankedGroups.sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));
  const copyGroupLink = async () => {
    if (!groupLink) {
      setGroupNotice(typedGroupName
        ? 'Use letters and numbers for the group name.'
        : 'Type a group name.');
      return;
    }
    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(groupLink.url);
        copied = true;
      }
    } catch {
      copied = false;
    }
    if (!copied) {
      const area = document.createElement('textarea');
      area.value = groupLink.url;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.top = '0';
      area.style.left = '0';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.focus();
      area.select();
      try {
        copied = document.execCommand('copy');
      } catch {
        copied = false;
      }
      area.remove();
    }
    if (!copied) {
      const node = document.getElementById('group-link');
      if (node) {
        const range = document.createRange();
        range.selectNodeContents(node);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
    const saved = await ensureChantGroup();
    if (copied) {
      setGroupNotice(saved
        ? 'Link copied. Paste it into WhatsApp or a message.'
        : 'Link copied. The group total is not connected on this site yet.');
    } else {
      setGroupNotice(saved
        ? 'The link is selected. Copy it from the box.'
        : 'The link is selected. Copy it from the box. The group total is not connected on this site yet.');
    }
  };

  const rememberGroupLink = () => {
    void ensureChantGroup();
  };

  return (
    <div
      className="relative min-h-screen touch-manipulation select-none bg-gradient-to-br from-gray-900 via-spiritual-900 to-slate-900 text-gray-100 antialiased [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none] [&_*]:[-webkit-tap-highlight-color:transparent]"
      onPointerUp={(event) => {
        if (event.pointerType === 'mouse') return;
        const target = event.target;
        if (!(target instanceof Element)) return;
        if (target.closest('input, textarea, select, [contenteditable="true"]')) return;
        const control = target.closest('button, a, [role="tab"]');
        if (control instanceof HTMLElement) control.blur();
      }}
    >
      <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center gap-4 px-4 pb-6 pt-24 sm:px-6 lg:px-8">
        <div ref={whyChantsRef} className="relative flex max-w-full items-center justify-center gap-2 px-2">
          <h1 className="text-balance text-center font-sans text-2xl leading-tight tracking-wide text-amber-100 sm:text-3xl">
            {CHANT_APP_NAME}
          </h1>
          <button
            type="button"
            aria-label="Share"
            onClick={() => { void shareHeading(); }}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-amber-200/40 text-amber-100 transition hover:border-amber-100/70 hover:bg-amber-200/10"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-[1.75]">
              <path d="M12 15V5" strokeLinecap="round" />
              <path d="m8 8 4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 12.5V18a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-5.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-expanded={whyChantsOpen}
            aria-controls="why-these-chants"
            aria-label="Why Om was chosen"
            onClick={() => setWhyChantsOpen((open) => !open)}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-amber-200/40 text-amber-100 transition hover:border-amber-100/70 hover:bg-amber-200/10"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-[1.75]">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 11v6" strokeLinecap="round" />
              <circle cx="12" cy="7.5" r="0.8" fill="currentColor" stroke="none" />
            </svg>
          </button>
          {whyChantsOpen && (
            <div
              id="why-these-chants"
              data-chant-dialog
              role="region"
              aria-label="Why Om was chosen"
              className="absolute left-1/2 top-full z-30 mt-2 w-[min(34rem,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-amber-200/25 bg-slate-950/95 p-4 text-left shadow-xl backdrop-blur-sm"
            >
              <dl className="space-y-3">
                {WHY_THESE_CHANTS.filter((chant) => chant.id === 'om').map((chant) => (
                  <div key={chant.name}>
                    <dt className="font-sans text-sm font-semibold text-amber-100">{chant.name}</dt>
                    <dd className="mt-0.5 text-sm leading-relaxed text-spiritual-100/85">{chant.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
        {groupTitle && (
          <p className="px-2 text-center font-sans text-xl font-bold italic leading-tight tracking-wide text-amber-100 sm:text-2xl">{groupTitle}</p>
        )}
        <div className="flex w-full flex-col items-center gap-4">
          {/* Compact Stats Bar */}
          <div className="mt-1 grid w-full max-w-lg grid-cols-2 gap-2 text-center">
            <div>
              <p className="text-[10px] font-sans uppercase tracking-wider text-spiritual-300/50 sm:text-xs">You</p>
              <p className="font-mono text-lg text-white/80 sm:text-2xl" aria-live="polite">{count.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] font-sans uppercase tracking-wider text-spiritual-300/50 sm:text-xs">Worldwide</p>
              <p id="worldwide-total" className="font-mono text-lg text-white/80 sm:text-2xl">{worldwideReady ? worldShown.toLocaleString() : '...'}</p>
            </div>
          </div>

          <div ref={chantNotesRef} className="w-full max-w-2xl">
            {availableChants.length > 1 && (
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center" role="tablist" aria-label="Available chants">
              {availableChants.map((chant) => {
                const isActive = chant.id === currentChant.id;
                const note = WHY_THESE_CHANTS.find((item) => item.id === chant.id);
                const noteOpen = chantNoteId === chant.id;

                return (
                  <div key={chant.id} className="relative flex min-w-0 items-center gap-1">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => {
                        if (chant.id !== currentChant.id) {
                          stopAutoChant();
                          setSelectedChantId(chant.id);
                        }
                      }}
                      className={`min-w-0 flex-1 rounded-full border px-2 py-2 text-sm font-medium transition-all duration-200 sm:px-4 ${isActive
                        ? 'border-spiritual-300/60 bg-spiritual-500/20 text-white shadow-[0_0_20px_rgba(251,191,36,0.18)]'
                        : 'border-spiritual-400/20 bg-slate-800/50 text-spiritual-200/80 hover:border-spiritual-300/40 hover:text-white'}`}
                    >
                      <span className="flex flex-col items-center gap-0.5 sm:flex-row sm:gap-2">
                        <span className="text-base leading-none">{chant.symbol}</span>
                        <span className="text-[11px] leading-tight sm:text-sm">{chant.shortLabel}</span>
                        <span className="font-mono text-xs text-spiritual-100/80">{(countsByChant[chant.id] || 0).toLocaleString()}</span>
                        {!chant.isAlwaysAvailable && (
                          <span className="hidden rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.22em] text-amber-200 sm:inline">
                            Special
                          </span>
                        )}
                      </span>
                    </button>
                    {note && (
                      <button
                        type="button"
                        aria-expanded={noteOpen}
                        aria-controls={`chant-note-${chant.id}`}
                        aria-label={`Why ${chant.name} was chosen`}
                        onClick={() => setChantNoteId(noteOpen ? null : chant.id)}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-amber-200/40 text-amber-100 transition hover:border-amber-100/70 hover:bg-amber-200/10"
                      >
                        <ChantInfoIcon />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            )}
            {(() => {
              const note = WHY_THESE_CHANTS.find((item) => item.id === chantNoteId);
              if (!note) return null;
              return (
                <p
                  id={`chant-note-${note.id}`}
                  role="region"
                  className="mt-2 rounded-xl border border-amber-200/25 bg-slate-950/95 p-3 text-left text-sm leading-relaxed text-spiritual-100/85 shadow-xl"
                >
                  <span className="font-sans font-semibold text-amber-100">{note.name}. </span>
                  {note.text}
                </p>
              );
            })()}
          </div>

          {/* Main Chant Button + Mala */}
          <div className="flex flex-col items-center mt-2 mb-4 sm:mb-12">
            {whatsAppNotice && (
              <p className="mb-3 w-full max-w-md rounded-xl border border-amber-300/60 bg-slate-950/90 px-3 py-2 text-center text-sm text-amber-50">
                {whatsAppNotice.text}
                {whatsAppNotice.href && (
                  <a
                    href={whatsAppNotice.href}
                    className="mt-2 block rounded-lg bg-spiritual-600 px-3 py-2 font-sans font-semibold text-white hover:bg-spiritual-500"
                  >
                    {whatsAppNotice.action}
                  </a>
                )}
              </p>
            )}
            <div className="relative">
              <MalaBeads
                litBeads={count}
                size="chant"
                showCenterLabel={false}
                className="z-0"
              />

              <div className="absolute inset-0 z-10 flex items-center justify-center">
                {dailyGoal && (
                  <svg
                    className="pointer-events-none absolute h-[clamp(9rem,48vmin,19.2rem)] w-[clamp(9rem,48vmin,19.2rem)] -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r={progressRingRadius}
                      strokeWidth="3"
                      className="text-spiritual-500/10"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r={progressRingRadius}
                      strokeWidth="3"
                      className={`transition-all duration-500 ease-in-out ${goalMet ? 'text-cyan-400' : 'text-spiritual-400'}`}
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={progressRingCircumference}
                      strokeDashoffset={strokeDashoffset}
                      style={{ filter: goalMet ? 'drop-shadow(0 0 5px currentColor)' : 'none' }}
                    />
                  </svg>
                )}

                <button
                  type="button"
                  onClick={chantFromClick}
                  onTouchEnd={chantFromTouch}
                  data-chant-button
                  className={`pointer-events-auto relative flex aspect-square w-[clamp(7.5rem,40vmin,16rem)] touch-manipulation items-center justify-center rounded-[50%] bg-gradient-to-b from-amber-100 via-amber-500 to-amber-950 p-[0.45rem] cursor-pointer outline-none transition-[transform,box-shadow] duration-150 ease-out [-webkit-tap-highlight-color:transparent] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200 active:translate-y-1 scroll-mb-[46vh] ${malaComplete ? 'shadow-[0_8px_0_#4a2508,0_0_42px_10px_rgba(253,224,71,0.95)]' : isChanted ? 'translate-y-1 shadow-[0_2px_0_#4a2508,0_6px_12px_rgba(0,0,0,0.45)]' : 'shadow-[0_8px_0_#4a2508,0_16px_22px_rgba(0,0,0,0.5),0_0_22px_rgba(251,191,36,0.22)] active:shadow-[0_2px_0_#4a2508,0_6px_12px_rgba(0,0,0,0.45)]'}`}
                  aria-label={`Chant ${currentChant.name} to increase count`}
                >
                  {/* Aura Effects */}
                  {chantEffects.map(effect => (
                    <div
                      key={`aura-${effect.id}`}
                      className={`absolute inset-0 rounded-full border border-spiritual-400/30 shadow-[0_0_60px_rgba(217,119,6,0.5)] pointer-events-none transition-all duration-700 ease-out ${effect.active ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}
                    />
                  ))}

                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-20 rounded-[50%]"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.08) 34%, rgba(0,0,0,0.18) 100%)',
                      WebkitMaskImage: 'radial-gradient(circle, transparent 66%, #000 70%)',
                      maskImage: 'radial-gradient(circle, transparent 66%, #000 70%)',
                    }}
                  />
                  <div className="pointer-events-none relative z-10 h-full w-full">
                    {currentChant.imageSrc ? (
                      <div
                        className="relative h-full w-full overflow-hidden rounded-[50%] shadow-[inset_0_6px_10px_rgba(0,0,0,0.28)]"
                        style={{ clipPath: 'circle(50%)', WebkitClipPath: 'circle(50%)' }}
                      >
                        <img
                          src={currentChant.imageSrc}
                          alt={currentChant.name}
                          draggable={false}
                          className="pointer-events-none h-full w-full object-cover [-webkit-user-drag:none]"
                        />
                      </div>
                    ) : (
                      <div
                        className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[50%] bg-gradient-to-br from-amber-100 via-orange-200 to-rose-300 shadow-[inset_0_6px_10px_rgba(0,0,0,0.2)]"
                        style={{ clipPath: 'circle(50%)', WebkitClipPath: 'circle(50%)' }}
                      >
                        <span className="text-[clamp(2.5rem,11vmin,4.75rem)] font-serif leading-none text-orange-950 drop-shadow-sm">{currentChant.symbol}</span>
                        <span className="mt-2 max-w-[78%] text-center text-[10px] uppercase leading-tight tracking-[0.14em] text-orange-950/80 sm:text-xs">{currentChant.shortLabel}</span>
                      </div>
                    )}
                    {chantEffects.map(effect => (
                      currentChant.imageSrc ? (
                        <div
                          key={effect.id}
                          className="absolute inset-0 overflow-hidden rounded-[50%] pointer-events-none transition-all duration-700 ease-out"
                          style={{ clipPath: 'circle(50%)', WebkitClipPath: 'circle(50%)' }}
                        >
                          <img
                            src={currentChant.imageSrc}
                            alt=""
                            draggable={false}
                            className={`pointer-events-none h-full w-full object-cover [-webkit-user-drag:none] ${effect.active ? 'scale-150 opacity-0' : 'opacity-70'}`}
                          />
                        </div>
                      ) : (
                        <div
                          key={effect.id}
                          aria-hidden="true"
                          className={`absolute top-1/2 left-1/2 flex h-[clamp(7.5rem,40vmin,16rem)] w-[clamp(7.5rem,40vmin,16rem)] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/40 bg-gradient-to-br from-amber-100 via-orange-200 to-rose-300 shadow-[0_0_25px_rgba(251,146,60,0.35)] pointer-events-none transition-all duration-700 ease-out ${effect.active ? 'scale-150 opacity-0' : 'scale-100 opacity-70'}`}
                        >
                          <span className="text-[clamp(2.5rem,11vmin,4.75rem)] font-serif leading-none text-orange-950 drop-shadow-sm">{currentChant.symbol}</span>
                          <span className="mt-2 max-w-[78%] text-center text-[10px] uppercase leading-tight tracking-[0.14em] text-orange-950/80 sm:text-xs">{currentChant.shortLabel}</span>
                        </div>
                      )
                    ))}
                  </div>
                </button>
              </div>
            </div>
            <p className="mt-2 px-3 text-center text-xs text-spiritual-200/70 sm:mt-4 sm:text-sm">
              Tap the center to chant {currentChant.name}.
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-2">
            {groupCode && (
              <ChantFold
                title="This group"
                summary={groupShown.toLocaleString()}
                summaryId="group-total-value"
              >
                <p>
                  The members of this group have chanted a total of {groupShown.toLocaleString()} {groupShown === 1 ? 'time' : 'times'}.
                  These chants can be added at different times. The family does not have to be online together.
                </p>
              </ChantFold>
            )}

            <ChantFold
              title="The world"
              summary={worldwideReady ? worldShown.toLocaleString() : '...'}
            >
              <p>
                Record: <span id="record-total" className="font-mono">{recordReady ? recordChants.toLocaleString() : '...'}</span>
              </p>
              <p>
                Average per person: <span id="average-per-person" className="font-mono">{worldwideReady ? avgChantsPerUser.toFixed(0) : '...'}</span>
              </p>
              <p>
                Total chanters: <span id="chanter-count" className="font-mono">{worldwideReady ? chanterCount.toLocaleString() : '...'}</span>
              </p>
              <p>Countries: <span className="font-mono">{worldwideReady ? countries.length.toLocaleString() : '...'}</span></p>
              {countries.map((country) => (
                <span key={country.code}>{countryLine(country)}</span>
              ))}
              {worldwideFailed && !worldwideReady && (
                <p>Your chants are included. They join the shared total when the count connects.</p>
              )}
            </ChantFold>

            <ChantFold
              title="Your chanting"
              summary={savedReady ? savedTotal.toLocaleString() : '...'}
              summaryId="saved-total"
            >
              <p>
                This mala: <span className="font-mono">{chantsIntoCurrentMala.toLocaleString()}</span>
                <span className="mx-1">/</span>
                <span className="font-mono">{MALA_BEAD_COUNT}</span>
              </p>
              <p>Completed malas: <span className="font-mono">{completedMalas.toLocaleString()}</span></p>
              {dailyGoal && (
                <p className="font-mono">Today: {todaysChants.toLocaleString()} / {dailyGoal.toLocaleString()}</p>
              )}
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsHistoryVisible(true)}
                  className="rounded-lg bg-slate-700/80 px-4 py-2 text-sm font-sans text-white hover:bg-slate-700"
                >
                  History
                </button>
                <button
                  type="button"
                  onClick={() => { setGoalInputValue(dailyGoal?.toString() || ''); setIsGoalModalVisible(true); }}
                  className="rounded-lg bg-slate-700/80 px-4 py-2 text-sm font-sans text-white hover:bg-slate-700"
                >
                  Goal
                </button>
              </div>
            </ChantFold>
          </div>

          {(videoPhase === 'recording' || videoPhase === 'preparing') && createPortal(
            <div className="fixed inset-x-0 bottom-0 z-[70] flex flex-col items-center gap-2 border-t border-amber-200/30 bg-slate-950/95 px-4 pb-4 pt-3">
              <canvas
                ref={setCanvasNode}
                className="aspect-[9/16] h-[34vh] max-h-[28rem] w-auto max-w-full rounded-xl border border-amber-200/40 bg-black object-contain shadow-2xl"
              />
              <div className="flex items-center gap-3">
                {videoChantLimit ? (
                  <p className="font-mono text-sm text-amber-100">
                    {videoSessionCount.toLocaleString()} / {videoChantLimit.toLocaleString()}
                  </p>
                ) : null}
                {videoPhase === 'preparing' ? (
                  <p className="font-sans text-sm text-amber-100" role="status">Preparing the video…</p>
                ) : (
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-sans text-white shadow-lg"
                    aria-label="Stop video recording"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-white" />
                    {formatRecordingTime(videoElapsedMs)}
                  </button>
                )}
              </div>
            </div>,
            document.body
          )}

          <div className="mt-1 flex w-full flex-wrap items-center justify-center gap-2">
            {isAutoChanting && (
              <button
                type="button"
                onClick={stopAutoChant}
                className="flex items-center gap-2 rounded-lg bg-red-600/80 px-4 py-2 text-sm font-sans text-white transition-colors hover:bg-red-600"
              >
                Stop ({autoChantRemaining} remaining)
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsGroupsVisible(true)}
              className="rounded-lg bg-spiritual-600/80 px-4 py-2 text-sm font-sans text-white transition-colors hover:bg-spiritual-600"
            >
              {groupCode ? 'Change group' : 'Join a group'}
            </button>
            {groupCode && (
              <button
                type="button"
                onClick={chantOnYourOwn}
                className="rounded-lg border border-amber-200/50 px-4 py-2 text-sm font-sans text-amber-100 transition-colors hover:bg-amber-200/10"
              >
                Chant on your own
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsShareVisible(true)}
              className="rounded-lg bg-spiritual-600/80 px-4 py-2 text-sm font-sans text-white transition-colors hover:bg-spiritual-600"
            >
              Share
            </button>
          </div>
          {!isShareVisible && videoError && videoPhase !== 'ready' && (
            <p className="max-w-md text-center text-sm text-red-200" role="alert">{videoError}</p>
          )}
        </div>

        {isGroupsVisible && (
          <div
            data-chant-dialog
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setIsGroupsVisible(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="chant-groups-title"
              className="flex max-h-[85vh] w-full max-w-md flex-col rounded-lg border border-spiritual-400/20 bg-slate-900 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-spiritual-400/20 p-4">
                <h2 id="chant-groups-title" className="font-sans text-xl text-spiritual-200">Groups</h2>
                <button type="button" onClick={() => setIsGroupsVisible(false)} className="text-2xl leading-none text-spiritual-300/60 hover:text-spiritual-200" aria-label="Close groups">&times;</button>
              </div>
              <div className="overflow-y-auto p-4 text-sm text-spiritual-100">
                {groupCode && (
                  <button
                    type="button"
                    onClick={chantOnYourOwn}
                    className="mb-4 w-full rounded-lg border border-amber-200/50 px-4 py-2.5 text-sm font-sans text-amber-100 transition-colors hover:bg-amber-200/10"
                  >
                    Chant on your own
                  </button>
                )}
                <GroupJoinList groups={rankedGroups} currentCode={groupCode} listFailed={worldwideFailed && leaderboard.length === 0} onJoin={(group) => joinListedGroup(group, true)} />
              </div>
            </div>
          </div>
        )}

        {isShareVisible && (
          <div
            data-chant-dialog
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setIsShareVisible(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="chant-share-title"
              className="flex max-h-[85vh] w-full max-w-md flex-col overflow-y-auto rounded-lg border border-spiritual-400/20 bg-slate-900 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-spiritual-400/20 p-4">
                <h2 id="chant-share-title" className="font-sans text-xl text-spiritual-200">Share</h2>
                <button type="button" onClick={() => setIsShareVisible(false)} className="text-2xl leading-none text-spiritual-300/60 hover:text-spiritual-200" aria-label="Close share">&times;</button>
              </div>
              <div className="flex select-text flex-col items-center gap-4 p-4">
          <label htmlFor="chanter-name" className="flex w-full items-center gap-2 text-sm text-spiritual-200/80">
            <span className="shrink-0">Your name</span>
            <input
              id="chanter-name"
              type="text"
              value={chanterName}
              maxLength={40}
              autoComplete="name"
              placeholder="Shown on your video"
              onChange={(event) => setChanterName(event.target.value)}
              className="min-w-0 flex-1 rounded border border-amber-900/20 px-3 py-2 text-slate-900 caret-slate-900 placeholder:text-slate-600 [color-scheme:light] [-webkit-text-fill-color:#0f172a]"
            />
          </label>

          <div id="group-chant-card" className="mt-3 flex w-full max-w-md flex-col items-stretch gap-2 rounded-xl border border-spiritual-400/25 bg-slate-900/40 p-3 text-sm text-spiritual-200/80">
            <p className="text-center font-sans text-base text-spiritual-100">Chant with a group</p>
            <p className="text-center text-xs text-spiritual-200/85">
              Leave this blank to chant on your own. Or type a group name and press Create to join or start that group.
            </p>
            <p className="text-center text-xs text-spiritual-200/85">
              Each person chants at their own time, and the chants still join one group total.
            </p>
            <div className="flex w-full items-center gap-2">
              <label htmlFor="group-name" className="shrink-0">Group name</label>
              <input
                id="group-name"
                type="text"
                value={groupNameDraft}
                maxLength={60}
                placeholder=""
                onChange={(event) => {
                  setGroupNameDraft(event.target.value);
                  setGroupNotice('');
                }}
                onKeyDown={(event) => {
                  if (event.key !== 'Enter') return;
                  event.preventDefault();
                  void createTypedGroup();
                }}
                className="min-w-0 flex-1 rounded border border-amber-900/20 px-3 py-2 text-slate-900 caret-slate-900 placeholder:text-slate-600 [color-scheme:light] [-webkit-text-fill-color:#0f172a]"
              />
              <button
                type="button"
                onClick={() => { void createTypedGroup(); }}
                disabled={isSavingGroup}
                className="shrink-0 rounded-lg bg-spiritual-600 px-3 py-2 text-sm font-sans font-medium text-white transition-colors hover:bg-spiritual-500 disabled:opacity-60"
              >
                {isSavingGroup ? 'Saving…' : 'Create'}
              </button>
            </div>
            {groupNotice && (
              <p id="group-notice" className="text-center text-xs text-amber-100/90" role="status">{groupNotice}</p>
            )}
            {sharingThisGroup && groupLink ? (
              <>
                <p className="text-xs uppercase tracking-wide text-spiritual-300/70">Your group link</p>
                <p
                  id="group-link"
                  className="select-text overflow-x-auto rounded border border-amber-200/40 bg-[#FFF5E1] px-3 py-2 text-left font-mono text-[11px] leading-relaxed text-slate-900 sm:text-xs"
                >
                  {groupLinkParts[0]}
                  <wbr />
                  {groupLinkParts[1]}
                </p>
                <button
                  type="button"
                  id="copy-group-link"
                  onClick={() => { void copyGroupLink(); }}
                  className="rounded-lg bg-spiritual-600 px-4 py-2.5 text-sm font-sans font-medium text-white transition-colors hover:bg-spiritual-500"
                >
                  Copy link
                </button>
                <div className="flex flex-wrap justify-center gap-2">
                  <a
                    id="share-group-whatsapp"
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(groupLink.whatsappText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={rememberGroupLink}
                    className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-sans font-medium text-white hover:bg-green-500"
                  >
                    Share on WhatsApp
                  </a>
                  <a
                    id="share-group-facebook"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(groupLink.url)}&quote=${encodeURIComponent(groupLink.facebookQuote)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={rememberGroupLink}
                    className="rounded-lg bg-slate-700 px-4 py-2.5 text-sm font-sans text-white hover:bg-slate-600"
                  >
                    Facebook
                  </a>
                  <a
                    id="share-group-x"
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(groupLink.twitterText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={rememberGroupLink}
                    className="rounded-lg bg-slate-700 px-4 py-2.5 text-sm font-sans text-white hover:bg-slate-600"
                  >
                    X
                  </a>
                </div>
                <p className="text-center text-xs text-spiritual-100/90">
                  Send this link. Each tap from it adds one chant to the <span className="font-bold italic">{previewName}</span> total.
                </p>
                {groupCode && previewCode.toLowerCase() === groupCode.toLowerCase() && (
                  <p className="text-center text-xs text-spiritual-100">
                    The <span className="font-bold italic">{previewName}</span> total is <span className="font-mono">{groupShown.toLocaleString()}</span>.
                    Your chants in this group:{' '}
                    <span id="group-person-total" className="font-mono">{groupPersonTotal.toLocaleString()}</span>
                  </p>
                )}
              </>
            ) : (
              <p className="text-center text-xs text-spiritual-200/80">
                {typedGroupName && !typedGroupSlug
                  ? 'Use letters and numbers, at least two characters. The link appears when the name is ready.'
                  : typedGroupName
                    ? 'Press Create to save this group. The link appears once it is saved.'
                    : 'Type a group name. The link appears here.'}
              </p>
            )}
          </div>

          {videoPhase !== 'recording' && videoPhase !== 'preparing' && videoPhase !== 'ready' && (
            <p className="w-full max-w-md text-center text-xs leading-relaxed text-spiritual-200/85">
              Only you can see a recording until you share or download it.
              Only the people you send it to can watch it afterward.
              This website does not store the video.
            </p>
          )}

          {videoPhase !== 'recording' && videoPhase !== 'preparing' && videoPhase !== 'ready' && (
            <fieldset className="mt-2 w-full max-w-md rounded-xl border border-amber-300/70 bg-slate-950/90 p-3 text-sm text-white shadow-lg">
              <legend className="px-2 font-sans font-semibold text-amber-200">Choose what appears in your video</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                <label className="flex cursor-pointer items-start gap-2 rounded-lg border border-white/30 bg-slate-800 px-3 py-2.5 text-left text-white transition-colors hover:border-amber-200">
                  <input
                    type="radio"
                    name="chant-video-camera"
                    checked={!includeCamera}
                    disabled={videoPhase === 'starting'}
                    onChange={() => setIncludeCamera(false)}
                    className="mt-1 accent-amber-400"
                  />
                  <span>
                    <span className="block font-semibold">Chant app only</span>
                    <span className="block text-xs text-slate-200">No camera is used.</span>
                  </span>
                </label>
                <label className="flex cursor-pointer items-start gap-2 rounded-lg border border-white/30 bg-slate-800 px-3 py-2.5 text-left text-white transition-colors hover:border-amber-200">
                  <input
                    type="radio"
                    name="chant-video-camera"
                    checked={includeCamera}
                    disabled={videoPhase === 'starting'}
                    onChange={() => setIncludeCamera(true)}
                    className="mt-1 accent-amber-400"
                  />
                  <span>
                    <span className="block font-semibold">Include me</span>
                    <span className="block text-xs text-slate-200">Use the front-facing camera. The chant message stays on the video.</span>
                  </span>
                </label>
              </div>
            </fieldset>
          )}

          {videoPhase !== 'recording' && videoPhase !== 'preparing' && videoPhase !== 'ready' && (
            <fieldset className="mt-2 w-full max-w-md rounded-xl border border-amber-300/70 bg-slate-950/90 p-3 text-sm text-white shadow-lg">
              <legend className="px-2 font-sans font-semibold text-amber-200">Stop the video after</legend>
              <div className="grid grid-cols-4 gap-2">
                {([
                  ['Until I stop', null],
                  ['11', 11],
                  ['21', 21],
                  ['108', 108],
                ] as const).map(([label, value]) => (
                  <label key={label} className="flex cursor-pointer flex-col items-center gap-1 rounded-lg border border-white/30 bg-slate-800 px-2 py-2 text-center text-white">
                    <input
                      type="radio"
                      name="chant-video-length"
                      checked={videoChantLimit === value}
                      disabled={videoPhase === 'starting'}
                      onChange={() => setVideoChantLimit(value)}
                      className="accent-amber-400"
                    />
                    <span className="text-xs font-semibold">{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {includeCamera && videoPhase !== 'recording' && videoPhase !== 'preparing' && videoPhase !== 'ready' && (
            <p className="w-full max-w-md whitespace-pre-wrap rounded-xl border border-amber-300/50 bg-slate-950/80 px-3 py-2 text-xs leading-relaxed text-amber-50">
              {renderWhatsAppText(videoMessage)}
            </p>
          )}

          <div className="mt-2 flex w-full flex-wrap items-center justify-center gap-2">
            {isAutoChanting ? (
              <button
                onClick={stopAutoChant}
                className="flex items-center gap-2 px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-sans"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Stop ({autoChantRemaining} remaining)
              </button>
            ) : (
              <button
                onClick={() => { setAutoChantInputValue('108'); setIsAutoChantModalVisible(true); }}
                className="flex items-center gap-2 px-4 py-2 bg-spiritual-600/80 hover:bg-spiritual-600 text-white rounded-lg transition-colors text-sm font-sans"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Auto Chant
              </button>
            )}
            {videoPhase === 'recording' || videoPhase === 'preparing' ? null : videoPhase === 'ready' ? (
              <button
                type="button"
                onClick={() => setIsVideoVisible(true)}
                className="flex items-center gap-2 rounded-lg bg-amber-700/80 px-4 py-2 text-sm font-sans text-white transition-colors hover:bg-amber-700"
                aria-label="View the recorded video"
              >
                Your video
              </button>
            ) : (
              <button
                type="button"
                onClick={() => { setIsShareVisible(false); void startRecording(includeCamera, videoChantLimit); }}
                disabled={videoPhase === 'starting' || videoPhase === 'recording' || videoPhase === 'preparing'}
                className="flex items-center gap-2 rounded-lg bg-slate-700/80 px-4 py-2 text-sm font-sans text-white transition-colors hover:bg-slate-700 disabled:opacity-60"
                aria-label={`Record a ${currentChant.name} video to share`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" />
                </svg>
                {videoPhase === 'starting' ? 'Starting…' : videoPhase === 'recording' ? 'Recording…' : 'Record video'}
              </button>
            )}
          </div>
          {videoError && videoPhase !== 'ready' && (
            <p className="max-w-md text-center text-sm text-red-200" role="alert">{videoError}</p>
          )}
          {videoNotice && videoPhase !== 'idle' && (
            <p className="max-w-md text-center text-sm text-amber-100/90" role="status">{videoNotice}</p>
          )}

          {!groupLink && (
            <div className="mt-1 flex w-full flex-wrap justify-center gap-2">
              <a
                id="share-personal-whatsapp"
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(personalShare.whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-sans font-medium text-white hover:bg-green-500"
              >
                Share on WhatsApp
              </a>
              <a
                id="share-personal-facebook"
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(personalShare.url)}&quote=${encodeURIComponent(personalShare.facebookQuote)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-slate-700 px-4 py-2.5 text-sm font-sans text-white hover:bg-slate-600"
              >
                Facebook
              </a>
              <a
                id="share-personal-x"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(personalShare.twitterText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-slate-700 px-4 py-2.5 text-sm font-sans text-white hover:bg-slate-600"
              >
                X
              </a>
            </div>
          )}

          <section id="group-leaderboard" className="mt-2 w-full max-w-md rounded-xl border border-spiritual-400/25 bg-slate-900/40 p-3 text-sm text-spiritual-100">
            <h2 className="text-center font-sans text-base">Groups</h2>
            <div className="mt-3">
              <GroupJoinList groups={rankedGroups} currentCode={groupCode} listFailed={worldwideFailed && leaderboard.length === 0} onJoin={(group) => joinListedGroup(group, false)} />
            </div>
          </section>
              </div>
            </div>
          </div>
        )}
	
        {/* History Modal */}
        {isHistoryVisible && (
          <div data-chant-dialog className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300" onClick={() => setIsHistoryVisible(false)}>
            <div className="bg-slate-800/80 border border-spiritual-400/20 rounded-lg shadow-2xl w-11/12 max-w-md max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center p-4 border-b border-spiritual-400/20">
                <h2 className="text-xl font-sans text-spiritual-200">{currentChant.name} History</h2>
                <button onClick={() => setIsHistoryVisible(false)} className="text-spiritual-300/60 hover:text-spiritual-200 text-2xl leading-none" aria-label="Close history view">&times;</button>
              </div>
              <div className="p-4 overflow-y-auto">
                <div className="mb-4 rounded-lg border border-spiritual-400/20 bg-slate-900/40 p-3 text-sm text-spiritual-200/80">
                  <p className="text-xs uppercase tracking-wider text-spiritual-300/50">Mala summary</p>
                  <p className="mt-1">1 mala = <span className="font-mono">{MALA_BEAD_COUNT}</span> chants</p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                    <span>Total malas: <span className="font-mono text-white">{completedMalas.toLocaleString()}</span></span>
                    <span>Today's malas: <span className="font-mono text-white">{todaysCompletedMalas.toLocaleString()}</span></span>
                  </div>
                </div>
                {chantHistory.length > 0 ? (
                  <ul className="space-y-3">
                    {[...chantHistory].reverse().map(entry => (
                      <li key={entry.date} className="flex justify-between items-baseline gap-4 text-white/90 font-mono text-lg">
                        <div>
                          <span className="text-base text-spiritual-300/80">{entry.date}</span>
                          <p className="text-xs font-sans text-spiritual-300/60 mt-1">
                            Completed malas: {Math.floor(entry.chants / MALA_BEAD_COUNT).toLocaleString()}
                          </p>
                        </div>
                        <span>{entry.chants.toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-spiritual-300/70 py-8">No {currentChant.name} history yet. Start chanting!</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Goal Modal */}
        {isGoalModalVisible && (
          <div data-chant-dialog className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300" onClick={() => setIsGoalModalVisible(false)}>
            <div className="bg-slate-800/80 border border-spiritual-400/20 rounded-lg shadow-2xl w-11/12 max-w-md flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center p-4 border-b border-spiritual-400/20">
                <h2 className="text-xl font-sans text-spiritual-200">Set Daily Goal for {currentChant.name}</h2>
                <button onClick={() => setIsGoalModalVisible(false)} className="text-spiritual-300/60 hover:text-spiritual-200 text-2xl leading-none" aria-label="Close goal view">&times;</button>
              </div>
              <div className="p-4 space-y-4">
                <label htmlFor="goal-input" className="text-spiritual-300/90 text-sm">Set a daily target for {currentChant.name}.</label>
                <input
                  id="goal-input"
                  type="number"
                  value={goalInputValue}
                  onChange={e => setGoalInputValue(e.target.value)}
                  placeholder="e.g., 108"
                  className="w-full p-2 bg-slate-900/50 border border-spiritual-400/30 rounded text-white font-mono text-lg"
                />
                <div className="flex justify-end gap-3 pt-2">
                  <button onClick={clearCurrentGoal} className="px-4 py-2 rounded bg-slate-700/50 text-spiritual-200/80 hover:bg-slate-700 text-sm font-sans">Clear Goal</button>
                  <button onClick={handleSetGoal} className="px-4 py-2 rounded bg-spiritual-600/80 text-white hover:bg-spiritual-600 text-sm font-sans">Save Goal</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Auto Chant Modal */}
        {isAutoChantModalVisible && (
          <div data-chant-dialog className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300" onClick={() => setIsAutoChantModalVisible(false)}>
            <div className="bg-slate-800/80 border border-spiritual-400/20 rounded-lg shadow-2xl w-11/12 max-w-md flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center p-4 border-b border-spiritual-400/20">
                <h2 className="text-xl font-sans text-spiritual-200">Auto Chant</h2>
                <button onClick={() => setIsAutoChantModalVisible(false)} className="text-spiritual-300/60 hover:text-spiritual-200 text-2xl leading-none" aria-label="Close auto chant modal">&times;</button>
              </div>
              <div className="p-4 space-y-4">
                <label htmlFor="auto-chant-input" className="text-spiritual-300/90 text-sm">
                  Enter the number of times to chant {currentChant.name} automatically (max 1000).
                </label>
                <input
                  id="auto-chant-input"
                  type="number"
                  value={autoChantInputValue}
                  onChange={e => setAutoChantInputValue(e.target.value)}
                  placeholder="e.g., 108"
                  min="1"
                  max="1000"
                  className="w-full p-2 bg-slate-900/50 border border-spiritual-400/30 rounded text-white font-mono text-lg"
                />
                <p className="text-spiritual-300/60 text-xs">
                  Common counts: 108 (sacred number), 21, 51, or 1008
                </p>
                <div className="flex justify-end gap-3 pt-2">
                  <button onClick={() => setIsAutoChantModalVisible(false)} className="px-4 py-2 rounded bg-slate-700/50 text-spiritual-200/80 hover:bg-slate-700 text-sm font-sans">Cancel</button>
                  <button onClick={startAutoChant} className="px-4 py-2 rounded bg-spiritual-600/80 text-white hover:bg-spiritual-600 text-sm font-sans">Start Chanting</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isVideoVisible && videoUrl && createPortal(
          <div
            data-chant-dialog
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setIsVideoVisible(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="chant-video-title"
              className="flex max-h-[90vh] w-11/12 max-w-md flex-col rounded-lg border border-spiritual-400/20 bg-slate-800/80 shadow-2xl"
              onClick={event => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-spiritual-400/20 p-4">
                <h2 id="chant-video-title" className="font-sans text-xl text-spiritual-200">Your video</h2>
                <button onClick={() => setIsVideoVisible(false)} className="text-2xl leading-none text-spiritual-300/60 hover:text-spiritual-200" aria-label="Close video">&times;</button>
              </div>
              <div className="space-y-4 overflow-y-auto p-4">
                <video
                  key={videoUrl}
                  src={videoUrl}
                  controls
                  playsInline
                  className="max-h-[50vh] w-full rounded-lg border-4 border-amber-300 bg-black shadow-[0_0_0_2px_rgba(255,247,237,0.9),0_8px_24px_rgba(0,0,0,0.5)]"
                />
                <p className="text-sm text-spiritual-300/90">
                  {videoSessionCount.toLocaleString()} {videoSessionCount === 1 ? 'chant' : 'chants'} of {currentChant.name} in this clip.
                </p>
                <p className="text-sm text-spiritual-300/90">
                  This video was recorded on this phone.
                  Share or Download sends it from this phone to the people you choose.
                  Only those people can watch it afterward.
                  This website does not store the video.
                </p>
                <p id="group-share-message" className="whitespace-pre-wrap text-sm text-spiritual-100/90">
                  {renderWhatsAppText(videoMessage)}
                </p>
                {videoNotice && (
                  <p className="text-sm text-amber-100/90" role="status">{videoNotice}</p>
                )}
                {videoError && (
                  <p className="rounded-lg border border-red-400/30 bg-red-950/40 px-3 py-2 text-sm text-red-100" role="alert">
                    {videoError}
                  </p>
                )}
                <div className="flex flex-wrap justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      discardVideo();
                      setIsVideoVisible(false);
                    }}
                    className="rounded bg-slate-700/50 px-4 py-2 text-sm font-sans text-spiritual-200/80 hover:bg-slate-700"
                  >
                    Discard
                  </button>
                  <button
                    type="button"
                    onClick={downloadVideo}
                    className="rounded bg-slate-700/80 px-4 py-2 text-sm font-sans text-white hover:bg-slate-700"
                  >
                    Download
                  </button>
                  {canShare && (
                    <button
                      type="button"
                      onClick={() => { void shareVideo(); }}
                      className="rounded bg-spiritual-600/80 px-4 py-2 text-sm font-sans text-white hover:bg-spiritual-600"
                    >
                      Share
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </main>
    </div>
  );
};

export default AumChanterPage;
