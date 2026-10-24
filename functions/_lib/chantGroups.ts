export type ChantDbEnv = {
  url: string;
  token: string;
};

export type ChantGroup = {
  code: string;
  name: string;
  chantName: string;
  total: number;
};

const GROUP_SLUG = /^[A-Za-z0-9][A-Za-z0-9_]{0,38}[A-Za-z0-9]$/;
const MAX_ADD = 500;
const ready = new Map<string, Promise<void>>();

type SqlValue = string | number | null;

export function cleanLabel(value: unknown, maxLength: number): string {
  return String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

export function groupSlug(value: unknown): string {
  const cleaned = String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim()
    .replace(/[\s-]+/g, '_')
    .replace(/[^A-Za-z0-9_]/g, '')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 40);
  return GROUP_SLUG.test(cleaned) ? cleaned : '';
}

export function tursoHost(url: string): string {
  return url.replace(/^libsql:\/\//, '').replace(/^https:\/\//, '').replace(/\/$/, '');
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

function cellText(value: unknown): string {
  if (value && typeof value === 'object' && 'value' in value) {
    const raw = (value as { value: unknown }).value;
    return raw == null ? '' : String(raw);
  }
  return value == null ? '' : String(value);
}

function arg(value: SqlValue): { type: string; value: string } {
  if (typeof value === 'number') return { type: 'integer', value: String(Math.round(value)) };
  if (value == null) return { type: 'null', value: '' };
  return { type: 'text', value };
}

async function execute(env: ChantDbEnv, sql: string, args: SqlValue[] = []): Promise<unknown[][]> {
  const response = await fetch(`https://${tursoHost(env.url)}/v2/pipeline`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      requests: [
        { type: 'execute', stmt: { sql, args: args.map(arg) } },
        { type: 'close' },
      ],
    }),
  });
  if (!response.ok) throw new Error('database');
  const payload = await response.json() as {
    results?: Array<{ type?: string; response?: { result?: { rows?: unknown[][] } } }>;
  };
  const result = payload.results?.[0];
  if (!result || result.type !== 'ok') throw new Error('database');
  return result.response?.result?.rows ?? [];
}

function ensureSchema(env: ChantDbEnv): Promise<void> {
  const key = tursoHost(env.url);
  const existing = ready.get(key);
  if (existing) return existing;
  const pending = execute(
    env,
    `CREATE TABLE IF NOT EXISTS chant_groups (
      code TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      chant_name TEXT NOT NULL,
      total INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
    )`,
  ).then(() => undefined).catch((error: unknown) => {
    ready.delete(key);
    throw error;
  });
  ready.set(key, pending);
  return pending;
}

function rowToGroup(row: unknown[]): ChantGroup | null {
  if (!row || row.length < 4) return null;
  const code = cellText(row[0]);
  if (!GROUP_SLUG.test(code)) return null;
  return {
    code,
    name: cellText(row[1]),
    chantName: cellText(row[2]),
    total: Math.max(0, Math.round(Number(cellText(row[3])) || 0)),
  };
}

async function readGroup(env: ChantDbEnv, code: string): Promise<ChantGroup | null> {
  const rows = await execute(
    env,
    'SELECT code, name, chant_name, total FROM chant_groups WHERE code = ? COLLATE NOCASE',
    [code],
  );
  return rowToGroup(rows[0]);
}

export async function handleChantGroupRequest(request: Request, env: ChantDbEnv | null): Promise<Response> {
  if (!env?.url || !env.token) return json({ error: 'Group counting is not connected yet.' }, 503);
  try {
    await ensureSchema(env);
    const url = new URL(request.url);
    const parts = url.pathname.replace(/\/+$/, '').split('/').filter(Boolean);
    const rest = parts.slice(parts[0] === 'api' ? 2 : 0);
    const code = rest[0] ?? '';
    const action = rest[1] ?? '';

    if (request.method === 'POST' && rest.length === 0) {
      const text = await request.text();
      if (text.length > 2000) return json({ error: 'That group could not be saved.' }, 400);
      let body: { name?: unknown; chantName?: unknown } = {};
      if (text) {
        try {
          body = JSON.parse(text) as { name?: unknown; chantName?: unknown };
        } catch {
          return json({ error: 'That group could not be saved.' }, 400);
        }
      }
      const slug = groupSlug(body.name);
      if (!slug) return json({ error: 'Use a group name such as Mistri Family.' }, 400);
      const chantName = cleanLabel(body.chantName, 40) || 'Om';
      const existing = await readGroup(env, slug);
      if (existing) return json(existing);
      const name = cleanLabel(body.name, 60).replace(/_/g, ' ').replace(/\s+/g, ' ').trim() || slug.replace(/_/g, ' ');
      try {
        await execute(
          env,
          'INSERT INTO chant_groups (code, name, chant_name, total) VALUES (?, ?, ?, 0)',
          [slug, name, chantName],
        );
      } catch {
        const raced = await readGroup(env, slug);
        if (raced) return json(raced);
        return json({ error: 'That group could not be saved.' }, 500);
      }
      const created = await readGroup(env, slug);
      if (!created) return json({ error: 'That group could not be saved.' }, 500);
      return json(created, 201);
    }

    const slug = groupSlug(decodeURIComponent(code));
    if (!slug) return json({ error: 'This group link was not found.' }, 404);

    if (request.method === 'GET' && rest.length === 1) {
      const group = await readGroup(env, slug);
      if (!group) return json({ error: 'This group link was not found.' }, 404);
      return json(group);
    }

    if (request.method === 'POST' && action === 'chants' && rest.length === 2) {
      const text = await request.text();
      if (text.length > 200) return json({ error: 'Those chants could not be added.' }, 400);
      let count = 0;
      try {
        count = Math.round(Number((JSON.parse(text) as { count?: unknown }).count));
      } catch {
        return json({ error: 'Those chants could not be added.' }, 400);
      }
      if (!Number.isFinite(count) || count < 1 || count > MAX_ADD) {
        return json({ error: 'Those chants could not be added.' }, 400);
      }
      const current = await readGroup(env, slug);
      if (!current) return json({ error: 'This group link was not found.' }, 404);
      const rows = await execute(
        env,
        'UPDATE chant_groups SET total = total + ? WHERE code = ? RETURNING code, name, chant_name, total',
        [count, current.code],
      );
      const group = rowToGroup(rows[0]);
      if (!group) return json({ error: 'This group link was not found.' }, 404);
      return json(group);
    }

    return json({ error: 'This group link was not found.' }, 404);
  } catch {
    return json({ error: 'Group counting is not available right now.' }, 500);
  }
}
