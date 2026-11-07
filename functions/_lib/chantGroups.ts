export type ChantDbEnv = {
  url: string;
  token: string;
};

export type ChantGroup = {
  code: string;
  name: string;
  chantName: string;
  total: number;
  byChant: { om: number; 'sri-ram': number; 'jai-ma': number; 'jai-shri-krishna': number };
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
    await ensureChantTotalColumns(env);
    await execute(
      env,
      'CREATE INDEX IF NOT EXISTS chant_groups_by_total ON chant_groups (total DESC, name COLLATE NOCASE)',
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
    await execute(
      env,
      `CREATE TABLE IF NOT EXISTS chant_countries (
        code TEXT PRIMARY KEY,
        om_total INTEGER NOT NULL DEFAULT 0,
        ram_total INTEGER NOT NULL DEFAULT 0,
        ma_total INTEGER NOT NULL DEFAULT 0,
        krishna_total INTEGER NOT NULL DEFAULT 0,
        total INTEGER NOT NULL DEFAULT 0
      )`,
    );
    await ensureChantColumn(env, 'chant_countries', 'krishna_total');
    await execute(
      env,
      `CREATE TABLE IF NOT EXISTS chant_world (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        total INTEGER NOT NULL DEFAULT 0,
        om_total INTEGER NOT NULL DEFAULT 0,
        ram_total INTEGER NOT NULL DEFAULT 0,
        ma_total INTEGER NOT NULL DEFAULT 0,
        krishna_total INTEGER NOT NULL DEFAULT 0,
        record_total INTEGER NOT NULL DEFAULT 0,
        chanter_count INTEGER NOT NULL DEFAULT 0
      )`,
    );
    await execute(env, 'DROP INDEX IF EXISTS chant_people_updated');
    const world = await execute(env, 'SELECT id FROM chant_world WHERE id = 1');
    if (world.length === 0) {
      try {
        await execute(
          env,
          `INSERT INTO chant_world (id, total, om_total, ram_total, ma_total, krishna_total, record_total, chanter_count)
           SELECT 1,
             COALESCE((SELECT SUM(total) FROM chant_people), 0),
             COALESCE((SELECT SUM(om_total) FROM chant_countries), 0),
             COALESCE((SELECT SUM(ram_total) FROM chant_countries), 0),
             COALESCE((SELECT SUM(ma_total) FROM chant_countries), 0),
             COALESCE((SELECT SUM(krishna_total) FROM chant_countries), 0),
             COALESCE((SELECT MAX(total) FROM chant_people), 0),
             COALESCE((SELECT SUM(CASE WHEN total > 0 THEN 1 ELSE 0 END) FROM chant_people), 0)`,
        );
      } catch {
        const raced = await execute(env, 'SELECT id FROM chant_world WHERE id = 1');
        if (raced.length === 0) throw new Error('database');
      }
    }
  })().catch((error: unknown) => {
    ready.delete(key);
    throw error;
  });
  ready.set(key, pending);
  return pending;
}

const GROUP_COLUMNS = 'code, name, chant_name, total, om_total, ram_total, ma_total, krishna_total';

async function ensureChantColumn(env: ChantDbEnv, table: string, column: string): Promise<void> {
  try {
    await execute(env, `SELECT ${column} FROM ${table} LIMIT 1`);
  } catch {
    try {
      await execute(env, `ALTER TABLE ${table} ADD COLUMN ${column} INTEGER NOT NULL DEFAULT 0`);
    } catch {
      // This column is already present.
    }
  }
}

async function ensureChantTotalColumns(env: ChantDbEnv): Promise<void> {
  for (const column of ['om_total', 'ram_total', 'ma_total', 'krishna_total']) {
    await ensureChantColumn(env, 'chant_groups', column);
  }
  await execute(env, 'SELECT om_total, ram_total, ma_total, krishna_total FROM chant_groups LIMIT 1');
}

function rowToGroup(row: unknown[]): ChantGroup | null {
  if (!row || row.length < 4) return null;
  const code = cellText(row[0]);
  if (!GROUP_SLUG.test(code)) return null;
  return {
    code,
    name: cellText(row[1]),
    chantName: cellText(row[2]),
    total: storedTotal(row[3]),
    byChant: {
      om: storedTotal(row[4]),
      'sri-ram': storedTotal(row[5]),
      'jai-ma': storedTotal(row[6]),
      'jai-shri-krishna': storedTotal(row[7]),
    },
  };
}

async function readGroup(env: ChantDbEnv, code: string): Promise<ChantGroup | null> {
  const rows = await execute(
    env,
    `SELECT ${GROUP_COLUMNS} FROM chant_groups WHERE code = ? COLLATE NOCASE`,
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

function readGroupChantCounts(value: unknown, groupCount: number): { om: number; ram: number; ma: number; krishna: number } | null {
  const safeCount = Number.isFinite(groupCount) && groupCount > 0 ? groupCount : 0;
  if (value == null) return { om: 0, ram: 0, ma: 0, krishna: 0 };
  if (typeof value !== 'object') return null;
  const source = value as Record<string, unknown>;
  const read = (key: string) => {
    if (source[key] == null || source[key] === '') return 0;
    return Math.round(Number(source[key]));
  };
  const om = read('om');
  const ram = read('sri-ram');
  const ma = read('jai-ma');
  const krishna = read('jai-shri-krishna');
  if (![om, ram, ma, krishna].every((count) => Number.isFinite(count) && count >= 0 && count <= safeCount)) return null;
  if (om + ram + ma + krishna !== safeCount) return null;
  return { om, ram, ma, krishna };
}

async function readWorld(env: ChantDbEnv): Promise<{ globalTotal: number; recordTotal: number; chanterCount: number; om: number; ram: number; ma: number; krishna: number }> {
  const rows = await execute(
    env,
    `SELECT total, record_total, chanter_count, om_total, ram_total, ma_total, krishna_total
     FROM chant_world WHERE id = 1`,
  );
  return {
    globalTotal: storedTotal(rows[0]?.[0]),
    recordTotal: storedTotal(rows[0]?.[1]),
    chanterCount: storedTotal(rows[0]?.[2]),
    om: storedTotal(rows[0]?.[3]),
    ram: storedTotal(rows[0]?.[4]),
    ma: storedTotal(rows[0]?.[5]),
    krishna: storedTotal(rows[0]?.[6]),
  };
}

async function listGroups(env: ChantDbEnv, limit: number): Promise<ChantGroup[]> {
  const rows = await execute(
    env,
    `SELECT ${GROUP_COLUMNS}
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

function requestCountry(request: Request): string {
  const withCf = request as Request & { cf?: { country?: string } };
  const code = (withCf.cf?.country || request.headers.get('cf-ipcountry') || '').trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(code) || code === 'XX' || code === 'T1') return '';
  return code;
}

type ChantCountSplit = { om: number; ram: number; ma: number; krishna: number };

async function listCountries(env: ChantDbEnv): Promise<Array<{ code: string; om: number; ram: number; ma: number; krishna: number; total: number }>> {
  const rows = await execute(
    env,
    `SELECT code, om_total, ram_total, ma_total, total, krishna_total
     FROM chant_countries
     WHERE total > 0
     ORDER BY total DESC, code ASC
     LIMIT 40`,
  );
  return rows.flatMap((row) => {
    const code = cellText(row[0]).trim().toUpperCase();
    if (!/^[A-Z]{2}$/.test(code)) return [];
    return [{
      code,
      om: storedTotal(row[1]),
      ram: storedTotal(row[2]),
      ma: storedTotal(row[3]),
      total: storedTotal(row[4]),
      krishna: storedTotal(row[5]),
    }];
  });
}

async function saveProgress(
  env: ChantDbEnv,
  id: string,
  count: number,
  name: string,
  groupCode: string,
  groupCount: number,
  chantCounts: ChantCountSplit,
  countryCode: string,
  countryCounts: ChantCountSplit | null,
): Promise<{ person: ChantPerson; group: ChantGroup | null }> {
  const appliedGroupCount = Math.min(count, Math.max(0, groupCount));
  const group = appliedGroupCount > 0 && groupCode ? await readGroup(env, groupCode) : null;
  const om = countryCounts?.om ?? 0;
  const ram = countryCounts?.ram ?? 0;
  const ma = countryCounts?.ma ?? 0;
  const krishna = countryCounts?.krishna ?? 0;
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
      sql: `UPDATE chant_groups
            SET total = total + ?, om_total = om_total + ?, ram_total = ram_total + ?, ma_total = ma_total + ?, krishna_total = krishna_total + ?
            WHERE code = ?
            RETURNING ${GROUP_COLUMNS}`,
      args: [appliedGroupCount, chantCounts.om, chantCounts.ram, chantCounts.ma, chantCounts.krishna, group.code],
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
  if (countryCode) {
    statements.push({
      sql: `INSERT INTO chant_countries (code, om_total, ram_total, ma_total, krishna_total, total)
            VALUES (?, ?, ?, ?, ?, ?)
            ON CONFLICT(code) DO UPDATE SET
              om_total = om_total + excluded.om_total,
              ram_total = ram_total + excluded.ram_total,
              ma_total = ma_total + excluded.ma_total,
              krishna_total = krishna_total + excluded.krishna_total,
              total = total + excluded.total`,
      args: [countryCode, om, ram, ma, krishna, count],
    });
  }
  statements.push({
    sql: `UPDATE chant_world
          SET total = total + ?,
              om_total = om_total + ?,
              ram_total = ram_total + ?,
              ma_total = ma_total + ?,
              krishna_total = krishna_total + ?,
              record_total = MAX(record_total, COALESCE((SELECT total FROM chant_people WHERE id = ?), 0)),
              chanter_count = chanter_count + CASE
                WHEN COALESCE((SELECT total FROM chant_people WHERE id = ?), 0) = ? THEN 1
                ELSE 0
              END
          WHERE id = 1`,
    args: [count, om, ram, ma, krishna, id, id, count],
  });
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

const TOTAL_SHARE_MS = 5000;

type SharedTotal = { expires: number; status: number; body: string };

function totalMemory(): { shares: Map<string, SharedTotal>; loads: Map<string, Promise<SharedTotal>> } {
  const host = globalThis as {
    __chantTotalShares?: Map<string, SharedTotal>;
    __chantTotalLoads?: Map<string, Promise<SharedTotal>>;
  };
  if (!host.__chantTotalShares) host.__chantTotalShares = new Map();
  if (!host.__chantTotalLoads) host.__chantTotalLoads = new Map();
  return { shares: host.__chantTotalShares, loads: host.__chantTotalLoads };
}

function edgeCache(): { match(request: Request): Promise<Response | undefined>; put(request: Request, response: Response): Promise<void> } | null {
  const storage = (globalThis as { caches?: { default?: { match(request: Request): Promise<Response | undefined>; put(request: Request, response: Response): Promise<void> } } }).caches;
  return storage?.default ?? null;
}

function sharedTotalResponse(status: number, body: string, shared: 'hit' | 'miss'): Response {
  return new Response(body, {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': status === 200 ? 'public, max-age=5' : 'no-store',
      'x-chant-shared': shared,
    },
  });
}

async function loadSharedTotal(key: string, produce: () => Promise<Response>): Promise<Response> {
  const { shares, loads } = totalMemory();
  const now = Date.now();
  const saved = shares.get(key);
  if (saved && saved.expires > now) return sharedTotalResponse(saved.status, saved.body, 'hit');
  if (saved) shares.delete(key);

  const edge = edgeCache();
  const edgeKey = new Request(`https://chant-totals.local/${encodeURIComponent(key)}`, { method: 'GET' });
  if (edge) {
    try {
      const hit = await edge.match(edgeKey);
      if (hit?.ok) {
        const body = await hit.text();
        const ageMs = Math.max(0, Math.round(Number(hit.headers.get('age')) || 0) * 1000);
        const ttl = TOTAL_SHARE_MS - ageMs;
        if (ttl > 0) shares.set(key, { expires: Date.now() + ttl, status: hit.status, body });
        return sharedTotalResponse(hit.status, body, 'hit');
      }
    } catch {
      // This process has no region cache. The memory copy still covers it.
    }
  }

  const pending = loads.get(key);
  if (pending) {
    const produced = await pending;
    return sharedTotalResponse(produced.status, produced.body, 'hit');
  }

  const loading = (async () => {
    const response = await produce();
    const body = await response.text();
    const produced = { expires: Date.now() + TOTAL_SHARE_MS, status: response.status, body };
    if (response.ok) {
      if (shares.size > 1000) {
        const freshAt = Date.now();
        for (const [name, entry] of shares) {
          if (entry.expires <= freshAt) shares.delete(name);
        }
      }
      shares.set(key, produced);
      if (edge) {
        try {
          await edge.put(edgeKey, new Response(body, {
            status: response.status,
            headers: {
              'content-type': 'application/json; charset=utf-8',
              'cache-control': 'public, max-age=5',
            },
          }));
        } catch {
          // The memory copy still serves this process.
        }
      }
    }
    return produced;
  })();
  loads.set(key, loading);
  try {
    const produced = await loading;
    return sharedTotalResponse(produced.status, produced.body, 'miss');
  } finally {
    loads.delete(key);
  }
}

export async function handleChantGroupRequest(request: Request, env: ChantDbEnv | null): Promise<Response> {
  if (!env?.url || !env.token) return json({ error: 'Group counting is not connected yet.' }, 503);
  try {
    const url = new URL(request.url);
    const parts = url.pathname.replace(/\/+$/, '').split('/').filter(Boolean);
    const resource = parts[0] === 'api' ? (parts[1] ?? '') : (parts[0] ?? '');
    const rest = parts.slice(parts[0] === 'api' ? 2 : 1);
    const code = rest[0] ?? '';
    const action = rest[1] ?? '';

    if (resource === 'chant-people') {
      await ensureSchema(env);
      const id = personId(decodeURIComponent(code));
      if (!id) return json({ error: 'This chanter was not found.' }, 404);
      const groupCode = groupSlug(url.searchParams.get('group') ?? '');
      if (request.method === 'GET' && rest.length === 1) {
        return json(await readPerson(env, id, groupCode));
      }
      if (request.method === 'POST' && action === 'chants' && rest.length === 2) {
        const text = await request.text();
        if (text.length > 2000) return json({ error: 'Those chants could not be saved.' }, 400);
        let body: { count?: unknown; groupCount?: unknown; name?: unknown; groupCode?: unknown; groupByChant?: unknown } = {};
        try {
          body = JSON.parse(text) as { count?: unknown; groupCount?: unknown; name?: unknown; groupCode?: unknown; groupByChant?: unknown };
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
        const chantCounts = readGroupChantCounts(body.groupByChant, Number.isFinite(groupCount) ? groupCount : 0);
        if (!chantCounts) return json({ error: 'Those chants could not be saved.' }, 400);
        const countryCounts = readGroupChantCounts((body as { byChant?: unknown }).byChant, count);
        if (!countryCounts && (body as { byChant?: unknown }).byChant != null) {
          return json({ error: 'Those chants could not be saved.' }, 400);
        }
        const name = cleanLabel(body.name, 40);
        const requestedGroup = groupSlug(body.groupCode ?? '') || groupCode;
        const saved = await saveProgress(
          env,
          id,
          count,
          name,
          requestedGroup,
          Number.isFinite(groupCount) ? groupCount : 0,
          chantCounts,
          requestCountry(request),
          countryCounts,
        );
        return json(saved);
      }
      return json({ error: 'This chanter was not found.' }, 404);
    }

    if (request.method === 'GET' && rest.length === 0) {
      const requested = Math.round(Number(url.searchParams.get('limit')));
      const limit = Number.isFinite(requested) && requested > 0 ? Math.min(MAX_LIST, requested) : 50;
      return loadSharedTotal(`list:${limit}`, async () => {
        await ensureSchema(env);
        const [groups, world, countries] = await Promise.all([
          listGroups(env, limit),
          readWorld(env),
          listCountries(env),
        ]);
        return json({
          groups,
          globalTotal: world.globalTotal,
          byChant: {
            om: world.om,
            'sri-ram': world.ram,
            'jai-ma': world.ma,
            'jai-shri-krishna': world.krishna,
          },
          recordTotal: world.recordTotal,
          chanterCount: world.chanterCount,
          countries: countries.map((country) => ({
            code: country.code,
            om: country.om,
            'sri-ram': country.ram,
            'jai-ma': country.ma,
            'jai-shri-krishna': country.krishna,
            total: country.total,
          })),
        });
      });
    }

    if (request.method === 'POST' && rest.length === 0) {
      await ensureSchema(env);
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

    if (request.method === 'GET' && rest.length === 1) {
      if (!slug) return json({ error: 'This group link was not found.' }, 404);
      return loadSharedTotal(`group:${slug.toLowerCase()}`, async () => {
        await ensureSchema(env);
        const group = await readGroup(env, slug);
        if (!group) return json({ error: 'This group link was not found.' }, 404);
        return json(group);
      });
    }

    await ensureSchema(env);
    if (!slug && request.method !== 'POST') return json({ error: 'This group link was not found.' }, 404);

    if (request.method === 'GET' && action === 'people' && rest.length === 2) {
      return json({ members: [] });
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
        `UPDATE chant_groups SET total = total + ? WHERE code = ? RETURNING ${GROUP_COLUMNS}`,
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
