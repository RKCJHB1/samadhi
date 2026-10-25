export type ChantGroup = {
  code: string;
  name: string;
  chantName: string;
  total: number;
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

  constructor(sent: number, groupSent: number) {
    super('person');
    this.sent = sent;
    this.groupSent = groupSent;
  }
}

const SITE_ORIGIN = 'https://ramakrishna-johannesburg.org.za';
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

export function buildGroupShare(name: string, chantName: string, code: string) {
  const groupName = name.trim() || 'our group';
  const chant = chantName.trim() || 'Om';
  const url = chantGroupUrl(code);
  const whatsappText = `🙏 Please join the ${groupName} chant.\n\nEvery chant you make from this link is added to the ${groupName} total. We are also chanting for the new temple.`;
  return {
    url,
    title: `Join ${groupName} in chanting ${chant}`,
    whatsappText,
    twitterText: `Join ${groupName} in chanting ${chant}. Every chant from this link adds to our group total. 🙏`,
    facebookQuote: `Join ${groupName} in chanting ${chant}. Every chant from this link adds to our group total.`,
    videoText: `${whatsappText}\n\n${url}`,
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

export async function saveChantProgress(
  id: string,
  count: number,
  name: string,
  groupCode = '',
  groupCount = 0,
): Promise<SavedChantProgress> {
  let remaining = Math.max(0, Math.round(count));
  let groupRemaining = Math.max(0, Math.min(remaining, Math.round(groupCount)));
  let sent = 0;
  let groupSent = 0;
  let latest: SavedChantProgress | null = null;
  while (remaining > 0) {
    const chunk = Math.min(MAX_ADD, remaining);
    const groupChunk = Math.min(chunk, groupRemaining);
    try {
      const response = await fetch(`/api/chant-people/${encodeURIComponent(id)}/chants`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          count: chunk,
          name,
          groupCode: groupChunk > 0 ? groupCode : '',
          groupCount: groupChunk,
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
    } catch (error) {
      if (sent > 0) throw new PartialChantSaveError(sent, groupSent);
      throw error;
    }
  }
  if (!latest) throw new Error('person');
  return latest;
}

export async function fetchChantGroupList(): Promise<{ groups: ChantGroup[]; globalTotal: number; recordTotal: number }> {
  const response = await fetch('/api/chant-groups?limit=50', { cache: 'no-store' });
  if (!response.ok) throw new Error(response.status === 503 ? 'offline' : 'group');
  const body = await response.json() as { groups?: Array<Partial<ChantGroup>>; globalTotal?: unknown; recordTotal?: unknown };
  return {
    groups: (body.groups ?? []).flatMap((group) => {
      if (!group.code || !group.name) return [];
      return [{
        code: group.code,
        name: group.name,
        chantName: group.chantName || 'Om',
        total: Math.max(0, Math.round(Number(group.total) || 0)),
      }];
    }),
    globalTotal: Math.max(0, Math.round(Number(body.globalTotal) || 0)),
    recordTotal: Math.max(0, Math.round(Number(body.recordTotal) || 0)),
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
