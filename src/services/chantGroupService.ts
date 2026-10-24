export type ChantGroup = {
  code: string;
  name: string;
  chantName: string;
  total: number;
};

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
