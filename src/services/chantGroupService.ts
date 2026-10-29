export type ChantTotalId = 'om' | 'sri-ram' | 'jai-ma';

export type GroupChantTotals = Record<ChantTotalId, number>;

export const CHANT_TOTAL_IDS: ChantTotalId[] = ['om', 'sri-ram', 'jai-ma'];

export function emptyChantTotals(): GroupChantTotals {
  return { om: 0, 'sri-ram': 0, 'jai-ma': 0 };
}

export function readChantTotals(value: unknown): GroupChantTotals {
  const source = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const totals = emptyChantTotals();
  for (const id of CHANT_TOTAL_IDS) {
    totals[id] = Math.max(0, Math.round(Number(source[id]) || 0));
  }
  return totals;
}

export function addChantTotals(left: GroupChantTotals, right: GroupChantTotals): GroupChantTotals {
  return {
    om: left.om + right.om,
    'sri-ram': left['sri-ram'] + right['sri-ram'],
    'jai-ma': left['jai-ma'] + right['jai-ma'],
  };
}

export type ChantGroup = {
  code: string;
  name: string;
  chantName: string;
  total: number;
  byChant: GroupChantTotals;
};

export type ChantPerson = {
  id: string;
  name: string;
  total: number;
  groupTotal: number | null;
};

export type GroupMember = {
  personId: string;
  name: string;
  total: number;
};

export function memberInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean).map((part) => Array.from(part));
  if (parts.length === 0) return 'ॐ';
  if (parts.length === 1) return parts[0].slice(0, 2).join('');
  return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`;
}

export type SavedChantProgress = {
  person: ChantPerson;
  group: ChantGroup | null;
};

const PERSON_ID = /^p[a-z0-9]{8,40}$/;

export class PartialChantSaveError extends Error {
  sent: number;
  groupSent: number;
  sentByChant: GroupChantTotals;
  unsentByChant: GroupChantTotals;

  constructor(sent: number, groupSent: number, sentByChant: GroupChantTotals, unsentByChant: GroupChantTotals) {
    super('person');
    this.sent = sent;
    this.groupSent = groupSent;
    this.sentByChant = sentByChant;
    this.unsentByChant = unsentByChant;
  }
}

const SITE_ORIGIN = 'https://ramakrishna-johannesburg.org.za';
export const CHANT_APP_NAME = 'Global Digital Japa Yajna';
const MAX_ADD = 500;

export function chantSiteOrigin(): string {
  const envOrigin = import.meta.env.VITE_SITE_ORIGIN as string | undefined;
  if (envOrigin) return envOrigin.replace(/\/$/, '');
  if (typeof window !== 'undefined') {
    const { origin, hostname } = window.location;
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.local')) {
      return SITE_ORIGIN;
    }
    return origin;
  }
  return SITE_ORIGIN;
}

const GROUP_SLUG = /^[A-Za-z0-9][A-Za-z0-9_]{0,38}[A-Za-z0-9]$/;

export function groupSlug(value: string): string {
  const cleaned = value
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim()
    .replace(/[\s-]+/g, '_')
    .replace(/[^A-Za-z0-9_]/g, '')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 40);
  return GROUP_SLUG.test(cleaned) ? cleaned : '';
}

export function chantGroupUrl(code: string): string {
  return `${chantSiteOrigin()}/chant?group=${encodeURIComponent(code)}`;
}

const GROUP_CHANT_GOALS: Array<[number, string]> = [
  [100_000, 'one hundred thousand'],
  [1_000_000, 'one million'],
  [10_000_000, 'ten million'],
  [100_000_000, 'one hundred million'],
  [1_000_000_000, 'one billion'],
];

export function groupChantGoal(total: number): string {
  const chants = Math.max(0, Math.round(Number(total) || 0));
  for (const [goal, words] of GROUP_CHANT_GOALS) {
    if (chants < goal) return words;
  }
  return GROUP_CHANT_GOALS[GROUP_CHANT_GOALS.length - 1][1];
}

export async function fetchGroupMembers(code: string): Promise<GroupMember[]> {
  const response = await fetch(`/api/chant-groups/${encodeURIComponent(code)}/people`, { cache: 'no-store' });
  if (!response.ok) return [];
  const body = await response.json() as { members?: GroupMember[] };
  return (body.members ?? []).flatMap((member) => {
    if (!member?.personId || !Number.isFinite(member.total) || member.total < 1) return [];
    return [{
      personId: member.personId,
      name: typeof member.name === 'string' ? member.name : '',
      total: Math.max(0, Math.round(member.total)),
    }];
  }).slice(0, 12);
}

export function buildPersonalChantShare(chantName: string, personTotal = 0, worldwide = 0) {
  const chant = chantName.trim() || 'Om';
  const fundraisingUrl = `${SITE_ORIGIN}/new-ashram-project/fundraising`;
  const url = `${SITE_ORIGIN}/chant`;
  const yourTotal = Math.max(0, Math.round(personTotal));
  const worldTotal = Math.max(0, Math.round(worldwide));
  const message = `🙏 I am chanting on ${CHANT_APP_NAME}.\n\nYour ${chant} total: ${yourTotal.toLocaleString()}\nWorldwide total: ${worldTotal.toLocaleString()}\n\nPlease view the fundraising efforts for our new temple at: ${fundraisingUrl}\n\n${url}`;
  return {
    url,
    title: CHANT_APP_NAME,
    whatsappText: message,
    twitterText: message,
    facebookQuote: message,
    videoText: message,
  };
}

export function buildGroupShare(name: string, chantName: string, code: string, groupTotal = 0, personTotal = 0, chantTotal = groupTotal) {
  const groupName = name.trim() || 'our group';
  const chant = chantName.trim() || 'Om';
  const url = chantGroupUrl(code);
  const fundraisingUrl = `${SITE_ORIGIN}/new-ashram-project/fundraising`;
  const yourTotal = Math.max(0, Math.round(personTotal));
  const sharedTotal = Math.max(0, Math.round(groupTotal));
  const thisChant = Math.max(0, Math.round(chantTotal));
  const message = `🙏 Please join the ${groupName} chant on ${CHANT_APP_NAME}.\n\nYour ${chant} total: ${yourTotal.toLocaleString()}\n${groupName} ${chant}: ${thisChant.toLocaleString()}\n${groupName}, all chants: ${sharedTotal.toLocaleString()}\n\nLet us see if we can chant ${chant} ${groupChantGoal(thisChant)} times?\n\nPlease view the fundraising efforts for our new temple at: ${fundraisingUrl}\n\n${url}`;
  return {
    url,
    title: `Join ${groupName} in chanting ${chant}`,
    whatsappText: message,
    twitterText: message,
    facebookQuote: message,
    videoText: message,
  };
}

async function readGroup(response: Response): Promise<ChantGroup | null> {
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(response.status === 503 ? 'offline' : 'group');
  const body = await response.json() as Partial<ChantGroup>;
  if (!body.code || !body.name) throw new Error('group');
  return {
    code: body.code,
    name: body.name,
    chantName: body.chantName || 'Om',
    total: Math.max(0, Math.round(Number(body.total) || 0)),
    byChant: readChantTotals(body.byChant),
  };
}

export async function createChantGroup(name: string, chantName: string): Promise<ChantGroup> {
  const response = await fetch('/api/chant-groups', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name, chantName }),
  });
  const group = await readGroup(response);
  if (!group) throw new Error('group');
  return group;
}

export async function fetchChantGroup(code: string): Promise<ChantGroup | null> {
  const response = await fetch(`/api/chant-groups/${encodeURIComponent(code)}`, { cache: 'no-store' });
  return readGroup(response);
}

export function chantPersonId(): string {
  const storageKey = 'aumChanterPersonId';
  try {
    const existing = localStorage.getItem(storageKey) ?? '';
    if (PERSON_ID.test(existing)) return existing;
  } catch {
    // Private browsing can block storage. This visit still gets an id.
  }
  const created = `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
  try {
    localStorage.setItem(storageKey, created);
  } catch {
    // The id still identifies this visit.
  }
  return created;
}

async function readPerson(response: Response): Promise<ChantPerson> {
  if (!response.ok) throw new Error(response.status === 503 ? 'offline' : 'person');
  const body = await response.json() as Partial<ChantPerson>;
  if (!body.id) throw new Error('person');
  return {
    id: body.id,
    name: body.name || '',
    total: Math.max(0, Math.round(Number(body.total) || 0)),
    groupTotal: body.groupTotal == null ? null : Math.max(0, Math.round(Number(body.groupTotal) || 0)),
  };
}

export async function fetchChantPerson(id: string, groupCode = ''): Promise<ChantPerson> {
  const query = groupCode ? `?group=${encodeURIComponent(groupCode)}` : '';
  const response = await fetch(`/api/chant-people/${encodeURIComponent(id)}${query}`, { cache: 'no-store' });
  return readPerson(response);
}

function takeChantChunk(pool: GroupChantTotals, size: number): GroupChantTotals {
  const taken = emptyChantTotals();
  let left = Math.max(0, size);
  for (const id of CHANT_TOTAL_IDS) {
    const use = Math.min(pool[id], left);
    taken[id] = use;
    pool[id] -= use;
    left -= use;
  }
  return taken;
}

export async function saveChantProgress(
  id: string,
  count: number,
  name: string,
  groupCode = '',
  groupCount = 0,
  groupByChant: GroupChantTotals = emptyChantTotals(),
): Promise<SavedChantProgress> {
  let remaining = Math.max(0, Math.round(count));
  let groupRemaining = Math.max(0, Math.min(remaining, Math.round(groupCount)));
  const chantPool = readChantTotals(groupByChant);
  const sentByChant = emptyChantTotals();
  let sent = 0;
  let groupSent = 0;
  let latest: SavedChantProgress | null = null;
  while (remaining > 0) {
    const chunk = Math.min(MAX_ADD, remaining);
    const groupChunk = Math.min(chunk, groupRemaining);
    const chantChunk = takeChantChunk(chantPool, groupChunk);
    try {
      const response = await fetch(`/api/chant-people/${encodeURIComponent(id)}/chants`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          count: chunk,
          name,
          groupCode: groupChunk > 0 ? groupCode : '',
          groupCount: groupChunk,
          groupByChant: groupChunk > 0 ? chantChunk : undefined,
        }),
      });
      if (!response.ok) throw new Error(response.status === 503 ? 'offline' : 'person');
      const body = await response.json() as { person?: Partial<ChantPerson>; group?: Partial<ChantGroup> | null };
      if (!body.person?.id) throw new Error('person');
      const person = await readPerson(new Response(JSON.stringify(body.person), { status: 200 }));
      const group = body.group ? await readGroup(new Response(JSON.stringify(body.group), { status: 200 })) : null;
      latest = { person, group: group ?? latest?.group ?? null };
      sent += chunk;
      groupSent += groupChunk;
      remaining -= chunk;
      groupRemaining -= groupChunk;
      for (const chantId of CHANT_TOTAL_IDS) sentByChant[chantId] += chantChunk[chantId];
    } catch (error) {
      if (sent > 0) throw new PartialChantSaveError(sent, groupSent, sentByChant, addChantTotals(chantChunk, chantPool));
      throw error;
    }
  }
  if (!latest) throw new Error('person');
  return latest;
}

export async function fetchChantGroupList(): Promise<{ groups: ChantGroup[]; globalTotal: number; recordTotal: number; chanterCount: number; chantingNow: number }> {
  const response = await fetch('/api/chant-groups?limit=50', { cache: 'no-store' });
  if (!response.ok) throw new Error(response.status === 503 ? 'offline' : 'group');
  const body = await response.json() as { groups?: Array<Partial<ChantGroup>>; globalTotal?: unknown; recordTotal?: unknown; chanterCount?: unknown; chantingNow?: unknown };
  return {
    groups: (body.groups ?? []).flatMap((group) => {
      if (!group.code || !group.name) return [];
      return [{
        code: group.code,
        name: group.name,
        chantName: group.chantName || 'Om',
        total: Math.max(0, Math.round(Number(group.total) || 0)),
        byChant: readChantTotals(group.byChant),
      }];
    }),
    globalTotal: Math.max(0, Math.round(Number(body.globalTotal) || 0)),
    recordTotal: Math.max(0, Math.round(Number(body.recordTotal) || 0)),
    chanterCount: Math.max(0, Math.round(Number(body.chanterCount) || 0)),
    chantingNow: Math.max(0, Math.round(Number(body.chantingNow) || 0)),
  };
}

export async function addToChantGroup(code: string, count: number): Promise<ChantGroup | null> {
  let remaining = Math.max(0, Math.round(count));
  let latest: ChantGroup | null = null;
  while (remaining > 0) {
    const chunk = Math.min(MAX_ADD, remaining);
    const response = await fetch(`/api/chant-groups/${encodeURIComponent(code)}/chants`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ count: chunk }),
    });
    latest = await readGroup(response);
    if (!latest) return null;
    remaining -= chunk;
  }
  return latest;
}
