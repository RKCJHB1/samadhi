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

export type ChantPerson = {
  id: string;
  name: string;
  total: number;
  groupTotal: number | null;
};

const GROUP_SLUG = /^[A-Za-z0-9][A-Za-z0-9_]{0,38}[A-Za-z0-9]$/;
const PERSON_ID = /^p[a-z0-9]{8,40}$/;
const MAX_ADD = 500;
const MAX_LIST = 100;
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

async function readGroupMembers(env: ChantDbEnv, code: string): Promise<Array<{ personId: string; name: string; total: number }>> {
  const rows = await execute(
    env,
    `SELECT person_id, name, total
     FROM chant_group_people
     WHERE group_code = ? COLLATE NOCASE AND total > 0
     ORDER BY total DESC, name COLLATE NOCASE ASC
     LIMIT 12`,
    [code],
  );
  return rows.flatMap((row) => {
    const id = personId(cellText(row[0]));
    if (!id) return [];
    return [{ personId: id, name: cleanLabel(cellText(row[1]), 40), total: storedTotal(row[2]) }];
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

async function executePipeline(env: ChantDbEnv, statements: Array<{ sql: string; args?: SqlValue[] }>): Promise<unknown[][][]> {
  const response = await fetch(`https://${tursoHost(env.url)}/v2/pipeline`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      requests: [
        ...statements.map((statement) => ({
          type: 'execute',
          stmt: { sql: statement.sql, args: (statement.args ?? []).map(arg) },
        })),
        { type: 'close' },
      ],
    }),
  });
  if (!response.ok) throw new Error('database');
  const payload = await response.json() as {
    results?: Array<{ type?: string; response?: { result?: { rows?: unknown[][] } } }>;
  };
  const results = payload.results ?? [];
  return statements.map((_, index) => {
    const result = results[index];
    if (!result || result.type !== 'ok') throw new Error('database');
    return result.response?.result?.rows ?? [];
  });
}

async function execute(env: ChantDbEnv, sql: string, args: SqlValue[] = []): Promise<unknown[][]> {
  const sets = await executePipeline(env, [{ sql, args }]);
  return sets[0] ?? [];
}

function ensureSchema(env: ChantDbEnv): Promise<void> {
  const key = tursoHost(env.url);
  const existing = ready.get(key);
  if (existing) return existing;
  const pending = (async () => {
    await execute(env, 'DROP TABLE IF EXISTS chant_group_frames');
    await execute(
      env,
      `CREATE TABLE IF NOT EXISTS chant_groups (
        code TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        chant_name TEXT NOT NULL,
        total INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
      )`,
    );
    await execute(
      env,
      `CREATE TABLE IF NOT EXISTS chant_people (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL DEFAULT '',
        total INTEGER NOT NULL DEFAULT 0,
        updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
      )`,
    );
    await execute(
      env,
      `CREATE TABLE IF NOT EXISTS chant_group_people (
        group_code TEXT NOT NULL,
        person_id TEXT NOT NULL,
        name TEXT NOT NULL DEFAULT '',
        total INTEGER NOT NULL DEFAULT 0,
        updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
        PRIMARY KEY (group_code, person_id)
      )`,
    );
  })().catch((error: unknown) => {
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

function personId(value: unknown): string {
  const id = String(value ?? '').trim().toLowerCase();
  return PERSON_ID.test(id) ? id : '';
}

function storedTotal(value: unknown): number {
  return Math.max(0, Math.round(Number(cellText(value)) || 0));
}

async function savedPeopleSummary(env: ChantDbEnv): Promise<{ globalTotal: number; recordTotal: number; chanterCount: number; chantingNow: number }> {
  const rows = await execute(
    env,
    `SELECT COALESCE(SUM(total), 0),
            COALESCE(MAX(total), 0),
            COALESCE(SUM(CASE WHEN total > 0 THEN 1 ELSE 0 END), 0),
            COALESCE(SUM(CASE
              WHEN total > 0 AND updated_at >= strftime('%Y-%m-%dT%H:%M:%fZ','now','-2 minutes')
              THEN 1 ELSE 0 END), 0)
     FROM chant_people`,
  );
  return {
    globalTotal: storedTotal(rows[0]?.[0]),
    recordTotal: storedTotal(rows[0]?.[1]),
    chanterCount: storedTotal(rows[0]?.[2]),
    chantingNow: storedTotal(rows[0]?.[3]),
  };
}

async function listGroups(env: ChantDbEnv, limit: number): Promise<ChantGroup[]> {
  const rows = await execute(
    env,
    `SELECT code, name, chant_name, total
     FROM chant_groups
     WHERE total > 0
     ORDER BY total DESC, name COLLATE NOCASE ASC
     LIMIT ?`,
    [limit],
  );
  return rows.map((row) => rowToGroup(row)).filter((group): group is ChantGroup => Boolean(group));
}

async function readPerson(env: ChantDbEnv, id: string, groupCode: string): Promise<ChantPerson> {
  const personRows = await execute(env, 'SELECT id, name, total FROM chant_people WHERE id = ?', [id]);
  const person = personRows[0];
  let groupTotal: number | null = null;
  if (groupCode) {
    const shareRows = await execute(
      env,
      'SELECT total FROM chant_group_people WHERE group_code = ? AND person_id = ?',
      [groupCode, id],
    );
    groupTotal = shareRows[0] ? storedTotal(shareRows[0][0]) : 0;
  }
  return {
    id,
    name: person ? cellText(person[1]) : '',
    total: person ? storedTotal(person[2]) : 0,
    groupTotal,
  };
}

async function saveProgress(
  env: ChantDbEnv,
  id: string,
  count: number,
  name: string,
  groupCode: string,
  groupCount: number,
): Promise<{ person: ChantPerson; group: ChantGroup | null }> {
  const appliedGroupCount = Math.min(count, Math.max(0, groupCount));
  const group = appliedGroupCount > 0 && groupCode ? await readGroup(env, groupCode) : null;
  const statements: Array<{ sql: string; args?: SqlValue[] }> = [
    { sql: 'BEGIN' },
    {
      sql: `INSERT INTO chant_people (id, name, total)
            VALUES (?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
              total = total + ?,
              name = CASE WHEN ? <> '' THEN ? ELSE name END,
              updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now')
            RETURNING id, name, total`,
      args: [id, name, count, count, name, name],
    },
  ];
  if (group) {
    statements.push({
      sql: 'UPDATE chant_groups SET total = total + ? WHERE code = ? RETURNING code, name, chant_name, total',
      args: [appliedGroupCount, group.code],
    });
    statements.push({
      sql: `INSERT INTO chant_group_people (group_code, person_id, name, total)
            VALUES (?, ?, ?, ?)
            ON CONFLICT(group_code, person_id) DO UPDATE SET
              total = total + ?,
              name = CASE WHEN ? <> '' THEN ? ELSE name END,
              updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now')
            RETURNING total`,
      args: [group.code, id, name, appliedGroupCount, appliedGroupCount, name, name],
    });
  }
  statements.push({ sql: 'COMMIT' });
  let sets: unknown[][][];
  try {
    sets = await executePipeline(env, statements);
  } catch (error) {
    try {
      await execute(env, 'ROLLBACK');
    } catch {
      // The failed pipeline already closed the connection.
    }
    throw error;
  }
  const personRow = sets[1]?.[0];
  if (!personRow) throw new Error('database');
  const savedGroup = group ? rowToGroup(sets[2]?.[0] ?? []) : null;
  const shareRow = group ? sets[3]?.[0] : null;
  return {
    person: {
      id,
      name: cellText(personRow[1]),
      total: storedTotal(personRow[2]),
      groupTotal: shareRow ? storedTotal(shareRow[0]) : (group ? 0 : null),
    },
    group: savedGroup,
  };
}

export async function handleChantGroupRequest(request: Request, env: ChantDbEnv | null): Promise<Response> {
  if (!env?.url || !env.token) return json({ error: 'Group counting is not connected yet.' }, 503);
  try {
    await ensureSchema(env);
    const url = new URL(request.url);
    const parts = url.pathname.replace(/\/+$/, '').split('/').filter(Boolean);
    const resource = parts[0] === 'api' ? (parts[1] ?? '') : (parts[0] ?? '');
    const rest = parts.slice(parts[0] === 'api' ? 2 : 1);
    const code = rest[0] ?? '';
    const action = rest[1] ?? '';

    if (resource === 'chant-people') {
      const id = personId(decodeURIComponent(code));
      if (!id) return json({ error: 'This chanter was not found.' }, 404);
      const groupCode = groupSlug(url.searchParams.get('group') ?? '');
      if (request.method === 'GET' && rest.length === 1) {
        return json(await readPerson(env, id, groupCode));
      }
      if (request.method === 'POST' && action === 'chants' && rest.length === 2) {
        const text = await request.text();
        if (text.length > 2000) return json({ error: 'Those chants could not be saved.' }, 400);
        let body: { count?: unknown; groupCount?: unknown; name?: unknown; groupCode?: unknown } = {};
        try {
          body = JSON.parse(text) as { count?: unknown; groupCount?: unknown; name?: unknown; groupCode?: unknown };
        } catch {
          return json({ error: 'Those chants could not be saved.' }, 400);
        }
        const count = Math.round(Number(body.count));
        const groupCount = Math.round(Number(body.groupCount));
        if (!Number.isFinite(count) || count < 1 || count > MAX_ADD) {
          return json({ error: 'Those chants could not be saved.' }, 400);
        }
        if (Number.isFinite(groupCount) && (groupCount < 0 || groupCount > count)) {
          return json({ error: 'Those chants could not be saved.' }, 400);
        }
        const name = cleanLabel(body.name, 40);
        const requestedGroup = groupSlug(body.groupCode ?? '') || groupCode;
        const saved = await saveProgress(env, id, count, name, requestedGroup, Number.isFinite(groupCount) ? groupCount : 0);
        return json(saved);
      }
      return json({ error: 'This chanter was not found.' }, 404);
    }

    if (request.method === 'GET' && rest.length === 0) {
      const requested = Math.round(Number(url.searchParams.get('limit')));
      const limit = Number.isFinite(requested) && requested > 0 ? Math.min(MAX_LIST, requested) : 50;
      const [groups, people] = await Promise.all([listGroups(env, limit), savedPeopleSummary(env)]);
      return json({
        groups,
        globalTotal: people.globalTotal,
        recordTotal: people.recordTotal,
        chanterCount: people.chanterCount,
        chantingNow: people.chantingNow,
      });
    }

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

    if (request.method === 'GET' && action === 'people' && rest.length === 2) {
      const group = await readGroup(env, slug);
      if (!group) return json({ error: 'This group link was not found.' }, 404);
      return json({ members: await readGroupMembers(env, group.code) });
    }

    if ((request.method === 'GET' || request.method === 'POST') && action === 'frames') {
      return json({ error: 'Pictures are not kept here.' }, 404);
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
