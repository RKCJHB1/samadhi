export type ChantTotalId = 'om' | 'sri-ram' | 'jai-ma' | 'jai-shri-krishna';

export type GroupChantTotals = Record<ChantTotalId, number>;

export const CHANT_TOTAL_IDS: ChantTotalId[] = ['om', 'sri-ram', 'jai-ma', 'jai-shri-krishna'];

export function emptyChantTotals(): GroupChantTotals {
  return { om: 0, 'sri-ram': 0, 'jai-ma': 0, 'jai-shri-krishna': 0 };
}

export function readChantTotals(value: unknown): GroupChantTotals {
  const source = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const totals = emptyChantTotals();
  for (const id of CHANT_TOTAL_IDS) {
    totals[id] = Math.max(0, Math.round(Number(source[id]) || 0));
  }
  return totals;
}

function chantFetch(url: string, init: RequestInit = {}, keepalive = false): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  return fetch(url, { ...init, keepalive, signal: controller.signal }).finally(() => clearTimeout(timer));
}

export function addChantTotals(left: GroupChantTotals, right: GroupChantTotals): GroupChantTotals {
  return {
    om: left.om + right.om,
    'sri-ram': left['sri-ram'] + right['sri-ram'],
    'jai-ma': left['jai-ma'] + right['jai-ma'],
    'jai-shri-krishna': left['jai-shri-krishna'] + right['jai-shri-krishna'],
  };
}

export type ChantCountry = {
  code: string;
  total: number;
  byChant: GroupChantTotals;
};

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
  unsentPersonByChant: GroupChantTotals;

  constructor(sent: number, groupSent: number, sentByChant: GroupChantTotals, unsentByChant: GroupChantTotals, unsentPersonByChant: GroupChantTotals) {
    super('person');
    this.sent = sent;
    this.groupSent = groupSent;
    this.sentByChant = sentByChant;
    this.unsentByChant = unsentByChant;
    this.unsentPersonByChant = unsentPersonByChant;
  }
}

const SITE_ORIGIN = 'https://ramakrishna-johannesburg.org.za';
export const CHANT_APP_NAME = 'Digital Japa Yajna';
export const CHANT_APP_HEADING = CHANT_APP_NAME;
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

export const CHANT_SHARE_QUOTE = 'As wind removes the cloud, so the name of God destroys the cloud of worldliness. - Sri Sarada Devi';

export const CHANT_SHARE_QUOTE_LINES = [
  'As wind removes the cloud, so the name of God',
  'destroys the cloud of worldliness. - Sri Sarada Devi',
];

const FUNDRAISING_URL = `${SITE_ORIGIN}/new-ashram-project`;
const WHATSAPP_CHANNEL_URL = 'https://whatsapp.com/channel/0029VbE4YeY89ino9wbDMA0f';

function fundraisingClose(): string {
  return `Please subscribe to the WhatsApp Channel of The Ramakrishna Centre of South Africa, Johannesburg and keep informed of our new temple fundraising launch: ${WHATSAPP_CHANNEL_URL}\n${FUNDRAISING_URL}`;
}

export function buildPersonalChantShare(_chantName: string, personTotal = 0, worldwide = 0) {
  const url = `${SITE_ORIGIN}/chant`;
  const yourTotal = Math.max(0, Math.round(personTotal));
  const worldTotal = Math.max(0, Math.round(worldwide));
  const lead = `Please join me in chanting or start your own group and let our chanting be collectively counted.\n\nYour total: *${yourTotal.toLocaleString()}*\nWorldwide: *${worldTotal.toLocaleString()}*\n\n${CHANT_SHARE_QUOTE}`;
  const message = `${lead}\n\n${fundraisingClose()}`;
  const whatsappText = `Please join the ${CHANT_APP_NAME} at:\n${url}.\n\n${lead}\n\n${fundraisingClose()}`;
  return {
    url,
    title: CHANT_APP_HEADING,
    whatsappText,
    twitterText: message,
    facebookQuote: message,
    videoText: whatsappText,
  };
}

export function buildGroupShare(name: string, chantName: string, code: string, groupTotal = 0, personTotal = 0, chantTotal = groupTotal, worldwide = 0) {
  const groupName = name.trim() || 'our group';
  const chant = chantName.trim() || 'Om';
  const url = chantGroupUrl(code);
  const yourTotal = Math.max(0, Math.round(personTotal));
  const sharedTotal = Math.max(0, Math.round(groupTotal));
  const worldTotal = Math.max(0, Math.round(worldwide));
  const styledGroup = `_*${groupName}*_`;
  const body = `Please join our ${styledGroup} Group or start your own group and let our chanting be collectively counted.\n\nYour total: *${yourTotal.toLocaleString()}*\n${groupName}: *${sharedTotal.toLocaleString()}*\nWorldwide: *${worldTotal.toLocaleString()}*\n\n${CHANT_SHARE_QUOTE}`;
  const message = `${body}\n\njoin our ${styledGroup} group and chant with us\n${url}\n\n${fundraisingClose()}`;
  const whatsappText = `Please join our ${styledGroup} group and chant with us\n${url}. If you join at this link, each of our individual chants get added to the group total.\n\n${body}\n\n\n${fundraisingClose()}`;
  return {
    url,
    title: `Join ${groupName} in chanting ${chant}`,
    whatsappText,
    twitterText: message,
    facebookQuote: message,
    videoText: whatsappText,
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
  const response = await chantFetch('/api/chant-groups', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name, chantName }),
  });
  const group = await readGroup(response);
  if (!group) throw new Error('group');
  return group;
}

export async function fetchChantGroup(code: string): Promise<ChantGroup | null> {
  const response = await chantFetch(`/api/chant-groups/${encodeURIComponent(code)}`, { cache: 'no-store' });
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
  const response = await chantFetch(`/api/chant-people/${encodeURIComponent(id)}${query}`, { cache: 'no-store' });
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
  byChant: GroupChantTotals = emptyChantTotals(),
  keepalive = false,
): Promise<SavedChantProgress> {
  let remaining = Math.max(0, Math.round(count));
  let groupRemaining = Math.max(0, Math.min(remaining, Math.round(groupCount)));
  const chantPool = readChantTotals(groupByChant);
  const personPool = readChantTotals(byChant);
  const sentByChant = emptyChantTotals();
  let sent = 0;
  let groupSent = 0;
  let latest: SavedChantProgress | null = null;
  while (remaining > 0) {
    const chunk = Math.min(MAX_ADD, remaining);
    const groupChunk = Math.min(chunk, groupRemaining);
    const chantChunk = takeChantChunk(chantPool, groupChunk);
    const personChunk = takeChantChunk(personPool, chunk);
    const personSplit = CHANT_TOTAL_IDS.reduce((sum, id) => sum + personChunk[id], 0);
    try {
      const response = await chantFetch(`/api/chant-people/${encodeURIComponent(id)}/chants`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          count: chunk,
          name,
          groupCode: groupChunk > 0 ? groupCode : '',
          groupCount: groupChunk,
          groupByChant: groupChunk > 0 ? chantChunk : undefined,
          byChant: personSplit === chunk ? personChunk : undefined,
        }),
      }, keepalive);
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
      if (sent > 0) throw new PartialChantSaveError(sent, groupSent, sentByChant, addChantTotals(chantChunk, chantPool), addChantTotals(personChunk, personPool));
      throw error;
    }
  }
  if (!latest) throw new Error('person');
  return latest;
}

function readCountry(value: { code?: unknown; total?: unknown; byChant?: unknown; om?: unknown; 'sri-ram'?: unknown; 'jai-ma'?: unknown; 'jai-shri-krishna'?: unknown }): ChantCountry | null {
  const code = String(value.code ?? '').trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) return null;
  const byChant = value.byChant
    ? readChantTotals(value.byChant)
    : readChantTotals({ om: value.om, 'sri-ram': value['sri-ram'], 'jai-ma': value['jai-ma'], 'jai-shri-krishna': value['jai-shri-krishna'] });
  return {
    code,
    total: Math.max(0, Math.round(Number(value.total) || 0)),
    byChant,
  };
}

export async function fetchChantGroupList(): Promise<{ groups: ChantGroup[]; globalTotal: number; byChant: GroupChantTotals; recordTotal: number; chanterCount: number; countries: ChantCountry[] }> {
  const response = await chantFetch('/api/chant-groups?limit=50', { cache: 'no-store' });
  if (!response.ok) throw new Error(response.status === 503 ? 'offline' : 'group');
  const body = await response.json() as { groups?: Array<Partial<ChantGroup>>; globalTotal?: unknown; byChant?: unknown; recordTotal?: unknown; chanterCount?: unknown; countries?: Array<{ code?: unknown; total?: unknown; om?: unknown; 'sri-ram'?: unknown; 'jai-ma'?: unknown; 'jai-shri-krishna'?: unknown }> };
  const countries = (body.countries ?? []).flatMap((country) => {
    const read = readCountry(country);
    return read && read.total > 0 ? [read] : [];
  });
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
    byChant: body.byChant
      ? readChantTotals(body.byChant)
      : countries.reduce((sum, country) => addChantTotals(sum, country.byChant), emptyChantTotals()),
    recordTotal: Math.max(0, Math.round(Number(body.recordTotal) || 0)),
    chanterCount: Math.max(0, Math.round(Number(body.chanterCount) || 0)),
    countries,
  };
}

export async function addToChantGroup(code: string, count: number): Promise<ChantGroup | null> {
  let remaining = Math.max(0, Math.round(count));
  let latest: ChantGroup | null = null;
  while (remaining > 0) {
    const chunk = Math.min(MAX_ADD, remaining);
    const response = await chantFetch(`/api/chant-groups/${encodeURIComponent(code)}/chants`, {
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
