import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { TranslationRecord } from '@/store/translations';

let supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (supabase) return supabase;
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
  if (!url || !anonKey) {
    console.warn('[Supabase] Not configured. URL present?', Boolean(url), 'Anon key present?', Boolean(anonKey));
    return null;
  }
  try {
    supabase = createClient(url, anonKey, { auth: { persistSession: true } });
  } catch (e) {
    console.warn('[Supabase] createClient failed', e);
    return null;
  }
  return supabase;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
}

// Server table name
const TABLE = 'translations';

// Utility function to create public display names (never shows email)
export function getPublicDisplayName(profile: { first_name?: string | null; last_name?: string | null } | null): string {
  if (!profile) return 'Anonymous';
  const fullName = [profile.first_name, profile.last_name].filter(Boolean).join(' ').trim();
  return fullName || 'Anonymous';
}

// Shape expected in Supabase
type DbTranslation = {
  lecture_id: string;
  sentence_index: number;
  lang: string;
  text: string;
  form?: 'native' | 'transliteration';
  romanization_scheme?: string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_by?: string | null;
  created_at?: string;
  updated_at?: string;
  profiles?: {
    first_name?: string | null;
    last_name?: string | null;
    username?: string | null;
  } | null;
};

function toRecord(db: DbTranslation): TranslationRecord {
  console.log('🔍 toRecord DEBUG:', {
    created_by: db.created_by,
    profiles: db.profiles,
    text: db.text?.substring(0, 30) + '...',
    lang: db.lang,
    sentence_index: db.sentence_index
  });

  // Create display name for public attribution (never show email publicly)
  const displayName = getPublicDisplayName(db.profiles);

  console.log('👤 Display name computed:', displayName);

  return {
    lectureId: db.lecture_id,
    sentenceIndex: db.sentence_index,
    lang: db.lang,
    text: db.text,
    form: (db.form as any) || 'native',
    romanization_scheme: (db as any).romanization_scheme ?? null,
    createdAt: db.created_at ? Date.parse(db.created_at) : Date.now(),
    updatedAt: db.updated_at ? Date.parse(db.updated_at) : Date.now(),
    createdBy: db.created_by,
    createdByName: displayName,
    createdByUsername: (db.profiles as any)?.username ?? null,
  };
}

function toDb(rec: TranslationRecord | Omit<TranslationRecord, 'createdAt' | 'updatedAt'>): DbTranslation {
  return {
    lecture_id: rec.lectureId,
    sentence_index: rec.sentenceIndex,
    lang: rec.lang,
    text: rec.text,
    form: (rec as any).form || 'native',
    romanization_scheme: (rec as any).romanization_scheme ?? null,
    status: 'pending',
    created_by: null,
  };
}

export async function fetchTranslationsForLectureLang(lectureId: string, lang: string, approvedOnly = true, form?: 'native' | 'transliteration'): Promise<TranslationRecord[]> {
  const sb = getSupabase();
  if (!sb) return [];
  let q = sb.from<DbTranslation>(TABLE)
    .select(`
      *,
      profiles:public_profiles!translations_created_by_fkey(first_name, last_name, username)
    `)
    .eq('lecture_id', lectureId)
    .eq('lang', lang);
  if (form) q = q.eq('form', form);
  if (approvedOnly) q = q.eq('status', 'approved');
  const { data, error } = await q;
  if (error) {
    console.warn('Supabase fetch error:', error.message);
    return [];
  }
  let rows = data || [];
  // Fallback: if FK relationship isn't present in DB, manually hydrate profiles for created_by
  try {
    const missingProfiles = rows.filter(r => r.created_by && !r.profiles).map(r => r.created_by!) as string[];
    const uniqueIds = Array.from(new Set(missingProfiles));
    if (uniqueIds.length) {
      const { data: profs, error: perr } = await sb.from('profiles')
        .select('id, first_name, last_name, email, username')
        .in('id', uniqueIds);
      if (!perr && profs) {
        const pmap = new Map<string, any>(profs.map((p: any) => [p.id, p]));
        rows = rows.map(r => (r.created_by && !r.profiles && pmap.has(r.created_by as string)) ? { ...r, profiles: pmap.get(r.created_by as string) } : r);
      }
    }
  } catch (e) {
    console.warn('Profile hydration skipped:', e);
  }
  return rows.map(toRecord);
}

export async function fetchTranslationsForLang(lang: string, approvedOnly = true): Promise<TranslationRecord[]> {
  const sb = getSupabase();
  if (!sb) return [];
  let q = sb.from<DbTranslation>(TABLE)
    .select(`
      *,
      profiles:public_profiles!translations_created_by_fkey(first_name, last_name, username)
    `)
    .eq('lang', lang);
  if (approvedOnly) q = q.eq('status', 'approved');
  const { data, error } = await q;
  if (error) {
    console.warn('Supabase fetch error:', error.message);
    return [];
  }
  return (data || []).map(toRecord);
}

export async function fetchTranslationsForSentence(lectureId: string, sentenceIndex: number, targetLang?: string, form?: 'native' | 'transliteration', approvedOnly = true): Promise<TranslationRecord[]> {
  const sb = getSupabase();
  if (!sb) return [];
  let q = sb.from<DbTranslation>(TABLE)
    .select(`
      *,
      profiles:public_profiles!translations_created_by_fkey(first_name, last_name, username)
    `)
    .eq('lecture_id', lectureId)
    .eq('sentence_index', sentenceIndex);

  if (targetLang) {
    q = q.eq('lang', targetLang);
  }
  if (form) {
    q = q.eq('form', form);
  }

  if (approvedOnly) q = q.eq('status', 'approved');

  console.log('🔍 Query params:', { lectureId, sentenceIndex, targetLang, form, approvedOnly });

  const { data, error } = await q;
  if (error) {
    console.warn('❌ Supabase fetch error:', error.message);
    return [];
  }

  console.log('📊 Raw Supabase data:', data);
  return (data || []).map(toRecord);
}


  // Fallback: if no username was embedded due to missing FK alias, resolve via second query (skip in build)
  // We avoid top-level await by doing nothing here in build; runtime-only code can be placed where needed.


export async function insertTranslationRemote(rec: Omit<TranslationRecord, 'createdAt' | 'updatedAt'>): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  const payload = toDb(rec);
  try {
    const user = await getCurrentUser();
    if (!user) return false; // must be logged in
    const level = await getUserLanguageLevel(user.id, rec.lang);
    if (!level) {
      console.warn('Insert blocked: user has no declared proficiency for lang', rec.lang);
      return false; // must have any proficiency in the target language
    }
    // Attribute to the logged-in user so UI can show name and RLS can enforce ownership
    payload.created_by = user.id;
    // Always insert as 'pending'. A DB trigger (set_status_by_proficiency) may
    // auto-upgrade to 'approved' for Fluent/Native users. This avoids RLS
    // mismatches if a 'pending-only' insert policy is present.
    payload.status = 'pending';
  } catch {}
  const { error } = await sb
    .from<DbTranslation>(TABLE)
    .insert(payload, { ignoreDuplicates: true });
  if (error) {
    console.warn('Supabase insert error:', error.message);
    return false;
  }
  return true;
}

// Auth helpers
export async function getCurrentUser() {
  const sb = getSupabase();
  if (!sb) return null;
  const { data } = await sb.auth.getUser();
  return data.user ?? null;
}

export type LanguageProficiency = { code: string; level: 'Beginner'|'Fluent'|'Native/Academic' };
export type Profile = { id: string; email: string | null; role: 'user'|'moderator'|'admin'; first_name?: string|null; last_name?: string|null; avatar_url?: string|null; language_proficiency?: LanguageProficiency[] | null; username?: string | null };

export async function getProfile(userId: string): Promise<Profile | null> {
  const sb = getSupabase();
  if (!sb) return null;
  // Try base table first (includes email for self/admin views)
  let res = await sb.from('profiles').select('id, email, role, first_name, last_name, avatar_url, language_proficiency, username').eq('id', userId).maybeSingle();
  if ((res.error || !res.data)) {
    // Fallback to public view (RLS-safe, no email)
    res = await sb.from('public_profiles').select('id, role, first_name, last_name, language_proficiency, username').eq('id', userId).maybeSingle();
    if (res.error || !res.data) return null;
    return {
      id: (res.data as any).id,
      email: null,
      role: (res.data as any).role ?? 'user',
      first_name: (res.data as any).first_name ?? null,
      last_name: (res.data as any).last_name ?? null,
      avatar_url: (res.data as any).avatar_url ?? null,
      language_proficiency: (res.data as any).language_proficiency ?? null,
      username: (res.data as any).username ?? null,
    };
  }
  const data: any = res.data;
  return {
    id: data.id,
    email: data.email ?? null,
    role: data.role ?? 'user',
    first_name: data.first_name ?? null,
    last_name: data.last_name ?? null,
    avatar_url: data.avatar_url ?? null,
    language_proficiency: data.language_proficiency ?? null,
    username: data.username ?? null,
  };
}

export async function upsertProfile(p: Partial<Profile> & { id: string }): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  const payload: any = { id: p.id };
  if (p.email !== undefined) payload.email = p.email;
  if (p.role !== undefined) payload.role = p.role;
  if (p.first_name !== undefined) payload.first_name = p.first_name;
  if (p.last_name !== undefined) payload.last_name = p.last_name;
  if (p.avatar_url !== undefined) payload.avatar_url = p.avatar_url;
  if (p.language_proficiency !== undefined) payload.language_proficiency = p.language_proficiency;
  if (p.username !== undefined) payload.username = p.username;
  const { error } = await sb.from('profiles').upsert(payload);
  return !error;
}
export async function isUsernameAvailable(username: string): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  const slug = (username || '').toLowerCase();
  // Only allow alphanumeric and dashes
  if (!/^[a-z0-9-]{3,30}$/.test(slug)) return false;
  const { data, error } = await sb.from('profiles').select('id').eq('username', slug).limit(1);
  if (error) return false;
  return (data || []).length === 0;
}

export async function getProfileByUsername(username: string): Promise<Profile | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const slug = (username || '').toLowerCase();
  // Prefer public view for RLS-safe lookups; fallback to base table if needed
  let res = await sb
    .from('public_profiles')
    .select('id, role, first_name, last_name, language_proficiency, username')
    .ilike('username', slug)
    .maybeSingle();
  if ((res.error || !res.data)) {
    // Fallback to profiles table (some projects may not have the view)
    res = await sb
      .from('profiles')
      .select('id, email, role, first_name, last_name, avatar_url, language_proficiency, username')
      .ilike('username', slug)
      .maybeSingle();
  }
  if (res.error || !res.data) return null;
  return res.data as any as Profile;
}

export async function updateUsername(userId: string, username: string | null): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Supabase not configured' };
  const slug = (username || '').toLowerCase();
  if (slug) {
    // Validate format
    if (!/^[a-z0-9-]{3,30}$/.test(slug)) return { ok: false, error: 'Invalid username format' };
    // Enforce uniqueness
    const available = await isUsernameAvailable(slug);
    if (!available) return { ok: false, error: 'Username already taken' };
  }
  const { error } = await sb.from('profiles').update({ username: slug || null }).eq('id', userId);
  return { ok: !error, error: error?.message };
}


export async function updateProfileLanguageProficiency(userId: string, language_proficiency: LanguageProficiency[]){
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Supabase not configured' };
  // Use upsert so a profile row is created automatically if it doesn't exist
  const { error } = await sb.from('profiles').upsert({ id: userId, language_proficiency });
  return { ok: !error, error: error?.message };
}

export async function getUserLanguageLevel(userId: string, lang: string): Promise<LanguageProficiency['level'] | null> {
  const prof = await getProfile(userId);
  const arr = prof?.language_proficiency || [];
  const target = (lang || '').toLowerCase();
  const match = (arr as LanguageProficiency[]).find(p => (p.code || '').toLowerCase() === target);
  return match ? match.level : null;
}


export async function updateProfileFields(userId: string, fields: { first_name?: string|null; last_name?: string|null; avatar_url?: string|null }): Promise<{ok: boolean; error?: string}> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Supabase not configured' };
  const { error } = await sb.from('profiles').update({
    ...(fields.first_name !== undefined ? { first_name: fields.first_name } : {}),
    ...(fields.last_name !== undefined ? { last_name: fields.last_name } : {}),
    ...(fields.avatar_url !== undefined ? { avatar_url: fields.avatar_url } : {}),
  }).eq('id', userId);
  return { ok: !error, error: error?.message };
}

// Voting helpers (Translations project only)
export type VoteSummary = { up: number; down: number; userVote: 1 | -1 | 0 };

export async function getVoteSummary(
  lectureId: string,
  sentenceIndex: number,
  lang: string,
  text: string,
  form: 'native' | 'transliteration' = 'transliteration'
): Promise<VoteSummary | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const user = await getCurrentUser();
  const { data, error } = await sb
    .from('translation_votes')
    .select('user_id, value')
    .eq('lecture_id', lectureId)
    .eq('sentence_index', sentenceIndex)
    .eq('lang', lang)
    .eq('form', form)
    .eq('text', text);
  if (error) return null;
  let up = 0, down = 0, userVote: 1 | -1 | 0 = 0;
  for (const row of data || []) {
    if (row.value === 1) up++; else if (row.value === -1) down++;
    if (user && row.user_id === user.id) userVote = row.value as 1 | -1 | 0;
  }
  return { up, down, userVote };
}

export async function castVote(
  lectureId: string,
  sentenceIndex: number,
  lang: string,
  text: string,
  value: 1 | -1,
  form: 'native' | 'transliteration' = 'transliteration'
): Promise<{ ok: boolean; needsLogin?: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Supabase not configured' };
  const user = await getCurrentUser();
  if (!user) return { ok: false, needsLogin: true };
  const payload = {
    lecture_id: lectureId,
    sentence_index: sentenceIndex,
    lang,
    form,
    text,
    user_id: user.id,
    value,
  } as any;
  const { error } = await sb
    .from('translation_votes')
    .upsert(payload, { onConflict: 'lecture_id,sentence_index,lang,form,text,user_id' });
  return { ok: !error, error: error?.message };
}

// Moderation helpers
export type ModerationItem = DbTranslation & { created_at: string };

export async function listPendingTranslations(limit = 100): Promise<ModerationItem[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from<ModerationItem>(TABLE)
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) return [];
  return data || [];
}

export async function listPendingTranslationsByLanguages(langs: string[], limit = 100): Promise<ModerationItem[]> {
  const sb = getSupabase();
  if (!sb) return [];
  if (!langs || langs.length === 0) return listPendingTranslations(limit);
  const { data, error } = await sb
    .from<ModerationItem>(TABLE)
    .select('*')
    .eq('status', 'pending')
    .in('lang', langs)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) return [];
  return data || [];
}

export async function listReviewerLanguagesForUser(userId: string): Promise<string[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from('language_reviewers')
    .select('lang')
    .eq('user_id', userId);
  if (error || !data) return [];
  return (data as any[]).map(r => r.lang);
}


export async function setTranslationStatus(item: ModerationItem, status: 'approved'|'rejected'): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  // update by composite key (includes created_at)
  const { error } = await sb
    .from(TABLE)
    .update({ status })
    .eq('lecture_id', item.lecture_id)
    .eq('sentence_index', item.sentence_index)
    .eq('lang', item.lang)
    .eq('created_at', item.created_at);
  return !error;
}

// Comprehensive statistics functions
export type TranslationStats = {
  totalTranslations: number;
  totalApproved: number;
  totalPending: number;
  totalRejected: number;
  languageStats: Array<{
    lang: string;
    total: number;
    approved: number;
    pending: number;
    rejected: number;
    lecturesCovered: number;
  }>;
  lectureStats: Array<{
    lectureId: string;
    total: number;
    approved: number;
    languagesCovered: number;
  }>;
  recentActivity: Array<{
    lang: string;
    lectureId: string;
    count: number;
    lastUpdated: string;
  }>;
  topContributors: Array<{
    userId: string;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    username?: string | null;
    role?: 'user'|'moderator'|'admin';
    languageProficiency?: LanguageProficiency[] | null;
    totalTranslations: number;
    approvedTranslations: number;
  }>;
};

export async function fetchComprehensiveStats(): Promise<TranslationStats | null> {
  const sb = getSupabase();
  if (!sb) return null;

  try {
    // Get overall counts
    const { data: overallData, error: overallError } = await sb
      .from(TABLE)
      .select('status')
      .not('status', 'is', null);

    if (overallError) throw overallError;

    const statusCounts = (overallData || []).reduce((acc, row) => {
      acc[row.status] = (acc[row.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get language statistics (unique sentences per language)
    let languageStatsRows: Array<{ lang: string; total: number; approved: number; pending: number; rejected: number; lecturesCovered: number }>;
    try {
      const { data: uniqueLangStats, error: langStatsErr } = await sb.rpc('get_language_unique_stats');
      if (langStatsErr) throw langStatsErr;
      languageStatsRows = (uniqueLangStats || []) as any[];
    } catch {
      // Fallback: compute on the client if RPC not available
      const { data: langData, error: langError } = await sb
        .from(TABLE)
        .select('lang, status, lecture_id, sentence_index')
        .not('status', 'is', null);
      if (langError) throw langError;
      const byLang = new Map<string, { keys: Set<string>; approved: Set<string>; pending: Set<string>; rejected: Set<string>; lectures: Set<string> }>();
      (langData || []).forEach((row: any) => {
        if (!byLang.has(row.lang)) {
          byLang.set(row.lang, { keys: new Set(), approved: new Set(), pending: new Set(), rejected: new Set(), lectures: new Set() });
        }
        const entry = byLang.get(row.lang)!;
        const key = `${row.lecture_id}#${row.sentence_index}`;
        entry.keys.add(key);
        entry.lectures.add(row.lecture_id);
        if (row.status === 'approved') entry.approved.add(key);
        else if (row.status === 'pending') entry.pending.add(key);
        else if (row.status === 'rejected') entry.rejected.add(key);
      });
      languageStatsRows = Array.from(byLang.entries()).map(([lang, v]) => ({
        lang,
        total: v.keys.size,
        approved: v.approved.size,
        pending: [...v.pending].filter(k => !v.approved.has(k)).length,
        rejected: [...v.rejected].filter(k => !v.approved.has(k) && !v.pending.has(k)).length,
        lecturesCovered: v.lectures.size,
      }));
    }

    // Get lecture statistics
    const { data: lectureData, error: lectureError } = await sb
      .from(TABLE)
      .select('lecture_id, status, lang')
      .not('status', 'is', null);

    if (lectureError) throw lectureError;

    const lectureStats = new Map<string, {
      total: number;
      approved: number;
      languages: Set<string>;
    }>();

    (lectureData || []).forEach(row => {
      if (!lectureStats.has(row.lecture_id)) {
        lectureStats.set(row.lecture_id, {
          total: 0,
          approved: 0,
          languages: new Set()
        });
      }
      const stats = lectureStats.get(row.lecture_id)!;
      stats.total++;
      if (row.status === 'approved') stats.approved++;
      stats.languages.add(row.lang);
    });

    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: recentData, error: recentError } = await sb
      .from(TABLE)
      .select('lang, lecture_id, updated_at')
      .gte('updated_at', sevenDaysAgo.toISOString())
      .order('updated_at', { ascending: false });

    if (recentError) throw recentError;

    const recentActivity = new Map<string, {
      count: number;
      lastUpdated: string;
    }>();

    (recentData || []).forEach(row => {
      const key = `${row.lang}#${row.lecture_id}`;
      if (!recentActivity.has(key)) {
        recentActivity.set(key, {
          count: 0,
          lastUpdated: row.updated_at
        });
      }
      recentActivity.get(key)!.count++;
    });

    // Get top contributors
    const { data: contributorData, error: contributorError } = await sb
      .from(TABLE)
      .select(`
        created_by,
        status,
        profiles:public_profiles!translations_created_by_fkey(first_name, last_name, role, language_proficiency, username)
      `)
      .not('created_by', 'is', null);

    if (contributorError) throw contributorError;

    const contributors = new Map<string, {
      email: string | null;
      firstName: string | null;
      lastName: string | null;
      username?: string | null;
      role?: 'user'|'moderator'|'admin';
      languageProficiency?: LanguageProficiency[] | null;
      total: number;
      approved: number;
    }>();

    (contributorData || []).forEach((row: any) => {
      const userId = row.created_by;
      if (!contributors.has(userId)) {
        contributors.set(userId, {
          email: row.profiles?.email || null,
          firstName: row.profiles?.first_name || null,
          lastName: row.profiles?.last_name || null,
          role: row.profiles?.role || 'user',
          languageProficiency: row.profiles?.language_proficiency || null,
          username: row.profiles?.username || null,
          total: 0,
          approved: 0
        });
      }
      const stats = contributors.get(userId)!;
      stats.total++;
      if (row.status === 'approved') stats.approved++;
    });

    const safeTotal = (statusCounts.approved ?? 0) + (statusCounts.pending ?? 0) + (statusCounts.rejected ?? 0);

    return {
      totalTranslations: safeTotal,
      totalApproved: statusCounts.approved ?? 0,
      totalPending: statusCounts.pending ?? 0,
      totalRejected: statusCounts.rejected ?? 0,
      // Use the rows we computed (RPC or client fallback) to avoid referencing an undefined map
      languageStats: (languageStatsRows || []).slice().sort((a, b) => b.total - a.total),
      lectureStats: Array.from(lectureStats.entries()).map(([lectureId, stats]) => ({
        lectureId,
        total: stats.total,
        approved: stats.approved,
        languagesCovered: stats.languages.size
      })).sort((a, b) => b.total - a.total),
      recentActivity: Array.from(recentActivity.entries()).map(([key, stats]) => {
        const [lang, lectureId] = key.split('#');
        return {
          lang,
          lectureId,
          count: stats.count,
          lastUpdated: stats.lastUpdated
        };
      }).sort((a, b) => b.count - a.count).slice(0, 10),
      topContributors: Array.from(contributors.entries()).map(([userId, stats]) => ({
        userId,
        email: stats.email,
        firstName: stats.firstName,
        lastName: stats.lastName,
        username: (stats as any).username ?? null,
        role: stats.role,
        languageProficiency: stats.languageProficiency,
        totalTranslations: stats.total,
        approvedTranslations: stats.approved
      })).sort((a, b) => b.totalTranslations - a.totalTranslations).slice(0, 10)
    };
  } catch (error) {
    console.error('Error fetching comprehensive stats:', error);
    return null;
  }
}


// Top contributors limited to a set of languages (used by /read/stats when filtering by approved langs)
export async function fetchTopContributorsForLanguages(langs: string[], limit = 10): Promise<TranslationStats['topContributors']> {
  const sb = getSupabase();
  if (!sb) return [];
  if (!langs || langs.length === 0) return [];
  try {
    const { data, error } = await sb
      .from(TABLE)
      .select(`
        created_by,
        lang,
        status,
        profiles:public_profiles!translations_created_by_fkey(first_name, last_name, role, language_proficiency, username)
      `)
      .in('lang', langs)
      .not('created_by', 'is', null);
    if (error || !data) return [];

    const byUser = new Map<string, {
      email: string | null;
      firstName: string | null;
      lastName: string | null;
      username?: string | null;
      role?: 'user'|'moderator'|'admin';
      languageProficiency?: LanguageProficiency[] | null;
      total: number;
      approved: number;
    }>();

    (data as any[]).forEach((row) => {
      const uid = row.created_by as string;
      if (!byUser.has(uid)) {
        byUser.set(uid, {
          email: row.profiles?.email || null,
          firstName: row.profiles?.first_name || null,
          lastName: row.profiles?.last_name || null,
          username: row.profiles?.username || null,
          role: row.profiles?.role || 'user',
          languageProficiency: row.profiles?.language_proficiency || null,
          total: 0,
          approved: 0,
        });
      }
      const stats = byUser.get(uid)!;
      stats.total++;
      if (row.status === 'approved') stats.approved++;
    });

    return Array.from(byUser.entries()).map(([userId, s]) => ({
      userId,
      email: s.email,
      firstName: s.firstName,
      lastName: s.lastName,
      username: s.username,
      role: s.role,
      languageProficiency: s.languageProficiency,
      totalTranslations: s.total,
      approvedTranslations: s.approved,
    })).sort((a, b) => b.totalTranslations - a.totalTranslations).slice(0, Math.max(1, limit));
  } catch {
    return [];
  }
}

// Lecture stats limited to a set of languages (used by /read/stats when filtering by approved langs)
export async function fetchLectureStatsForLanguages(langs: string[]): Promise<TranslationStats['lectureStats']> {
  const sb = getSupabase();
  if (!sb) return [];
  if (!langs || langs.length === 0) return [];
  try {
    const { data, error } = await sb
      .from(TABLE)
      .select('lecture_id, status, lang')
      .in('lang', langs)
      .not('status', 'is', null);
    if (error || !data) return [];

    const byLecture = new Map<string, { total: number; approved: number; languages: Set<string> }>();
    (data as any[]).forEach((row) => {
      const id = row.lecture_id as string;
      if (!byLecture.has(id)) byLecture.set(id, { total: 0, approved: 0, languages: new Set() });
      const stats = byLecture.get(id)!;
      stats.total++;
      if (row.status === 'approved') stats.approved++;
      stats.languages.add(row.lang);
    });

    return Array.from(byLecture.entries()).map(([lectureId, s]) => ({
      lectureId,
      total: s.total,
      approved: s.approved,
      languagesCovered: s.languages.size,
    })).sort((a, b) => b.total - a.total);
  } catch {
    return [];
  }
}




// Admin-only: list profiles and update roles
export async function listProfiles(limit = 200): Promise<Profile[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from('profiles')
    .select('id, email, role, first_name, last_name, avatar_url, language_proficiency')
    .order('email', { ascending: true })
    .limit(limit);
  if (error || !data) return [];
  return data as any as Profile[];
}

export async function updateUserRole(userId: string, role: 'user'|'moderator'|'admin'): Promise<{ok: boolean; error?: string}> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Supabase not configured' };
  const { error } = await sb.from('profiles').update({ role }).eq('id', userId);
  return { ok: !error, error: error?.message };
}

// ---- User contributions (approved-only for public profiles) ----
export type UserContribution = {
  lectureId: string;
  sentenceIndex: number;
  lang: string;
  text: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
};

export async function fetchUserApprovedContributions(userId: string, limit = 100): Promise<UserContribution[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from<DbTranslation>(TABLE)
    .select('lecture_id, sentence_index, lang, text, status, created_at, updated_at')
    .eq('created_by', userId)
    .eq('status', 'approved')
    .order('updated_at', { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return data.map(r => ({
    lectureId: r.lecture_id,
    sentenceIndex: r.sentence_index,
    lang: r.lang,
    text: r.text,
    status: r.status,
    createdAt: r.created_at || new Date().toISOString(),
    updatedAt: r.updated_at || r.created_at || new Date().toISOString(),
  }));
}

export async function fetchUserApprovedCounts(userId: string): Promise<{ totalApproved: number; todayApproved: number; }>{
  const sb = getSupabase();
  if (!sb) return { totalApproved: 0, todayApproved: 0 };

  // Use exact row counts from PostgREST (head=true) to avoid pagination effects
  const { count: totalCount, error: e1 } = await sb
    .from<DbTranslation>(TABLE)
    .select('lecture_id', { count: 'exact', head: true })
    .eq('created_by', userId)
    .eq('status', 'approved');
  const totalApproved = e1 ? 0 : (totalCount || 0);

  // Approved in last 24 hours: use updated_at since approvals often occur after creation time
  const sinceIso = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count: todayCount, error: e2 } = await sb
    .from<DbTranslation>(TABLE)
    .select('lecture_id', { count: 'exact', head: true })
    .eq('created_by', userId)
    .eq('status', 'approved')
    .gte('updated_at', sinceIso);
  const todayApproved = e2 ? 0 : (todayCount || 0);

  return { totalApproved, todayApproved };
}

export async function fetchUserApprovedRankPercentile(userId: string): Promise<{ rank: number; totalContributors: number; topPercent: number } | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb
    .from<DbTranslation>(TABLE)
    .select('created_by')
    .not('created_by', 'is', null)
    .eq('status', 'approved');
  if (error || !data) return null;
  const counts = new Map<string, number>();
  for (const row of data) {
    const id = (row as any).created_by as string;
    counts.set(id, (counts.get(id) || 0) + 1);
  }
  const totals = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  const totalContributors = totals.length;
  const myTotal = counts.get(userId) || 0;
  const rank = totals.findIndex(([id]) => id === userId) + 1 || totalContributors; // if not found -> bottom
  const topPercent = totalContributors > 0 ? Math.max(1, Math.ceil((rank / totalContributors) * 100)) : 100;
  return { rank, totalContributors, topPercent };
}

// Language reviewers (admin-managed)
export type LanguageReviewer = { lang: string; user_id: string; created_at: string; email?: string|null; first_name?: string|null; last_name?: string|null };

export async function listLanguageReviewers(): Promise<LanguageReviewer[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from('language_reviewers')
    .select('lang, user_id, created_at, profiles:profiles!inner(email, first_name, last_name)')
    .order('lang');
  if (error || !data) return [];
  return (data as any).map((row: any) => ({
    lang: row.lang,
    user_id: row.user_id,
    created_at: row.created_at,
    email: row.profiles?.email ?? null,
    first_name: row.profiles?.first_name ?? null,
    last_name: row.profiles?.last_name ?? null,
  }));
}

export async function addLanguageReviewer(lang: string, userId: string): Promise<{ok: boolean; error?: string}> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Supabase not configured' };
  const { error } = await sb.from('language_reviewers').insert({ lang, user_id: userId });
  return { ok: !error, error: error?.message };
}

export async function removeLanguageReviewer(lang: string, userId: string): Promise<{ok: boolean; error?: string}> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Supabase not configured' };
  const { error } = await sb.from('language_reviewers').delete().eq('lang', lang).eq('user_id', userId);
  return { ok: !error, error: error?.message };
}


// Reviewer coverage and volunteer requests
export type ReviewerCoverage = { lang: string; count: number };
export type ReviewerRequest = { id: number; lang: string; user_id: string; level: 'Fluent'|'Native/Academic'; sample_text?: string|null; status: 'pending'|'approved'|'rejected'; reviewed_by?: string|null; created_at: string; email?: string|null; first_name?: string|null; last_name?: string|null };

export async function getReviewerCountForLang(lang: string): Promise<number> {
  const sb = getSupabase();
  if (!sb) return 0;
  const { data, error } = await sb.from('language_reviewers').select('user_id', { count: 'exact', head: true }).eq('lang', lang);
  if (error) return 0;
  return (data as any)?.length ?? (typeof (error as any)?.count === 'number' ? (error as any).count : 0);
}

export async function submitReviewerVolunteer(lang: string, level: 'Fluent'|'Native/Academic', sample_text: string): Promise<{ok: boolean; error?: string}> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Supabase not configured' };
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: 'Not logged in' };
  const { error } = await sb.from('language_reviewer_requests').insert({ lang, user_id: user.id, level, sample_text });
  return { ok: !error, error: error?.message };
}

export async function listReviewerRequests(status: 'pending'|'approved'|'rejected' = 'pending'): Promise<ReviewerRequest[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from('language_reviewer_requests')
    .select('id, lang, user_id, level, sample_text, status, reviewed_by, created_at, profiles:profiles!inner(email, first_name, last_name)')
    .eq('status', status)
    .order('created_at', { ascending: true });
  if (error || !data) return [];
  return (data as any[]).map((row: any) => ({
    id: row.id,
    lang: row.lang,
    user_id: row.user_id,
    level: row.level,
    sample_text: row.sample_text ?? null,
    status: row.status,
    reviewed_by: row.reviewed_by ?? null,
    created_at: row.created_at,
    email: row.profiles?.email ?? null,
    first_name: row.profiles?.first_name ?? null,
    last_name: row.profiles?.last_name ?? null,
  }));
}

export async function approveReviewerRequest(id: number): Promise<{ok: boolean; error?: string}> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Supabase not configured' };
  // Fetch request
  const { data, error } = await sb.from('language_reviewer_requests').select('*').eq('id', id).maybeSingle();
  if (error || !data) return { ok: false, error: error?.message || 'Request not found' };
  const req = data as any;
  // Add to language_reviewers then mark approved
  const { error: addErr } = await sb.from('language_reviewers').insert({ lang: req.lang, user_id: req.user_id });
  if (addErr) return { ok: false, error: addErr.message };
  const me = await getCurrentUser();
  const { error: updErr } = await sb.from('language_reviewer_requests').update({ status: 'approved', reviewed_by: me?.id || null }).eq('id', id);
  return { ok: !updErr, error: updErr?.message };
}

export async function rejectReviewerRequest(id: number): Promise<{ok: boolean; error?: string}> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Supabase not configured' };
  const me = await getCurrentUser();
  const { error } = await sb
    .from('language_reviewer_requests')
    .update({ status: 'rejected', reviewed_by: me?.id || null })
    .eq('id', id);
  return { ok: !error, error: error?.message };
}

// ---- Approved Languages (manual approvals and helpers) ----
export async function listApprovedLanguages(): Promise<string[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from('language_approvals')
    .select('lang')
    .order('lang');
  if (error) {
    console.warn('[Supabase] listApprovedLanguages error:', error.message);
    return [];
  }
  const list = ((data as any[]) || []).map((r) => (r.lang || '').toLowerCase()).filter(Boolean);
  console.log('[Supabase] Approved languages loaded:', list.length, list.slice(0, 5));
  return list;
}

export async function addApprovedLanguage(lang: string): Promise<{ ok: boolean; error?: string }>{
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Supabase not configured' };
  const user = await getCurrentUser();
  const payload: any = { lang };
  if (user) payload.created_by = user.id;
  const { error } = await sb.from('language_approvals').insert(payload);
  return { ok: !error, error: error?.message };
}

export async function removeApprovedLanguage(lang: string): Promise<{ ok: boolean; error?: string }>{
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Supabase not configured' };
  const { error } = await sb.from('language_approvals').delete().eq('lang', lang);
  return { ok: !error, error: error?.message };
}

// Languages that meet the community request rule (>= threshold requests)
export async function listLangsMeetingRequestThreshold(threshold = 3): Promise<string[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb.from('language_requests').select('lang');
  if (error || !data) return [];
  const counts = new Map<string, number>();
  (data as any[]).forEach((r) => {
    const code = (r.lang || '').toLowerCase();
    if (!code) return;
    counts.set(code, (counts.get(code) || 0) + 1);
  });
  return Array.from(counts.entries())
    .filter(([_, c]) => c >= threshold)
    .map(([lang]) => lang);
}

// Distinct languages that already have approved translations
export async function listLangsWithAnyApprovedTranslations(): Promise<string[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from<DbTranslation>(TABLE)
    .select('lang')
    .eq('status', 'approved');
  if (error || !data) return [];
  const set = new Set<string>();
  (data as any[]).forEach((r) => {
    const code = (r.lang || '').toLowerCase();
    if (code) set.add(code);
  });
  return Array.from(set);
}

// Union of approval sources used for UI visibility
// As per requirement: nothing is auto-approved by requests or reviewers.

// Hidden languages (blocklist)
export async function listHiddenLanguages(): Promise<string[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from('language_hidden')
    .select('lang')
    .order('lang');
  if (error) {
    console.warn('[Supabase] listHiddenLanguages error:', error.message);
    return [];
  }
  const hidden = ((data as any[]) || []).map((r) => (r.lang || '').toLowerCase()).filter(Boolean);
  console.log('[Supabase] Hidden languages loaded:', hidden.length, hidden.slice(0, 5));
  return hidden;
}

export async function addHiddenLanguage(lang: string): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Supabase not configured' };
  const user = await getCurrentUser();
  const payload: any = { lang };
  if (user) payload.created_by = user.id;
  const { error } = await sb.from('language_hidden').upsert(payload, { onConflict: 'lang' });
  return { ok: !error, error: error?.message };
}

export async function removeHiddenLanguage(lang: string): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Supabase not configured' };
  const { error } = await sb.from('language_hidden').delete().eq('lang', lang);
  return { ok: !error, error: error?.message };
}

export async function purgeLanguageData(lang: string): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Supabase not configured' };
  try {
    // Order: votes -> translations -> user progress -> time aggregates -> reviewers -> requests
    await sb.from('translation_votes').delete().eq('lang', lang);
    await sb.from(TABLE).delete().eq('lang', lang);
    await sb.from('reading_progress').delete().eq('lang', lang);
    // Include server-side reading time aggregates
    await sb.from('reading_time_daily').delete().eq('lang', lang);
    await sb.from('language_reviewers').delete().eq('lang', lang);
    await sb.from('language_reviewer_requests').delete().eq('lang', lang);
    await sb.from('language_requests').delete().eq('lang', lang);
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || 'Failed to purge language data' };
  }
}


// We only include manually-approved languages plus any that already have approved translations.
export async function getApprovedLanguageCodes(): Promise<Set<string>> {
  const sb = getSupabase();
  if (!sb) return new Set();
  const [manual, withApproved, hidden] = await Promise.all([
    listApprovedLanguages(),
    listLangsWithAnyApprovedTranslations(),
    listHiddenLanguages(),
  ]);
  const union = new Set<string>([...manual, ...withApproved]);
  hidden.forEach((h) => union.delete(h));
  return union;
}

export async function purgeUnapprovedLanguages(): Promise<{ ok: boolean; rows?: any[]; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Supabase not configured' };
  const { data, error } = await sb.rpc('purge_unapproved_languages');
  if (error) return { ok: false, error: error.message };
  return { ok: true, rows: (data as any[]) || [] };
}

export async function listMyReviewerRequests(): Promise<ReviewerRequest[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from('language_reviewer_requests')
    .select('id, lang, user_id, level, sample_text, status, reviewed_by, created_at')
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return (data as any[]).map((row: any) => ({
    id: row.id,
    lang: row.lang,
    user_id: row.user_id,
    level: row.level,
    sample_text: row.sample_text ?? null,
    status: row.status,
    reviewed_by: row.reviewed_by ?? null,
    created_at: row.created_at,
  }));
}

// New language requests (community requests for new translation languages)
export type LanguageRequest = { id: number; lang: string; user_id: string; reason?: string|null; status: 'pending'|'processed'; created_at: string };

export async function submitLanguageRequest(lang: string, reason?: string): Promise<{ok: boolean; error?: string}> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Supabase not configured' };
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: 'Not logged in' };
  // Client-side guard: must have any proficiency in the requested language
  const level = await getUserLanguageLevel(user.id, lang);
  if (!level) return { ok: false, error: 'Please add your proficiency for this language in your profile before requesting it.' };
  const { error } = await sb.from('language_requests').insert({ lang, user_id: user.id, reason: reason || null });
  // Unique constraint prevents duplicates per user/lang
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function hasRequestedLanguage(lang: string): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  const user = await getCurrentUser();
  if (!user) return false;
  const { data, error } = await sb.from('language_requests').select('id').eq('lang', lang).eq('user_id', user.id).maybeSingle();
  if (error) return false;
  return !!data;
}

// Admin: list all requests (returns rows; aggregate counts client-side)
export async function listLanguageRequestsAll(): Promise<LanguageRequest[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb.from('language_requests').select('id, lang, user_id, reason, status, created_at').order('created_at', { ascending: true });
  if (error || !data) return [];
  return data as any as LanguageRequest[];
}


// ---- Reading overview counts (registered, readers, active) ----
export type ReadingOverview = {
  totalRegistered: number;
  totalReaders: number;
  activeReaders24h: number;
  activeReaders3d: number;
  activeReaders7d: number;
  totalSessions: number;
};

export async function fetchReadingOverviewCounts(): Promise<ReadingOverview | null> {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data, error } = await sb.rpc('get_reading_overview_counts');
    if (error || !data || !Array.isArray(data) || data.length === 0) return null;
    const row = data[0] as any;
    return {
      totalRegistered: row.total_registered ?? 0,
      totalReaders: row.total_readers ?? 0,
      activeReaders24h: row.active_readers_24h ?? 0,
      activeReaders3d: row.active_readers_3d ?? 0,
      activeReaders7d: row.active_readers_7d ?? 0,
      totalSessions: row.total_sessions ?? 0,
    };
  } catch (e) {
    console.warn('fetchReadingOverviewCounts failed', e);
    return null;
  }
}


// ---- Reading Progress (per user/lecture/language) ----
export type ReadingProgress = {
  lectureId: string;
  lang: string;
  lastSentenceIndex: number;
  startedAt: string;
  updatedAt: string;
};

export async function upsertReadingProgress(lectureId: string, lang: string, lastSentenceIndex: number): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  const user = await getCurrentUser();
  if (!user) return false;

  const payload = {
    user_id: user.id,
    lecture_id: lectureId,
    lang,
    last_sentence_index: lastSentenceIndex,
    updated_at: new Date().toISOString(),
  } as any;

  const { error } = await sb
    .from('reading_progress')
    .upsert(payload, { onConflict: 'user_id,lecture_id,lang' });
  return !error;
}

export async function getMyReadingProgressFor(lectureId: string, lang: string): Promise<ReadingProgress | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await sb
    .from('reading_progress')
    .select('lecture_id, lang, last_sentence_index, started_at, updated_at')
    .eq('user_id', user.id)
    .eq('lecture_id', lectureId)
    .eq('lang', lang)
    .maybeSingle();

  if (error || !data) return null;
  return {
    lectureId: data.lecture_id as string,
    lang: data.lang as string,
    lastSentenceIndex: (data as any).last_sentence_index as number,
    startedAt: (data as any).started_at as string,
    updatedAt: (data as any).updated_at as string,
  };
}


// List current user's reading progress rows (most recent first)
export async function listMyReadingProgress(lang: string = 'en', limit = 5): Promise<ReadingProgress[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const user = await getCurrentUser();
  if (!user) return [];
  let q = sb
    .from('reading_progress')
    .select('lecture_id, lang, last_sentence_index, started_at, updated_at')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })
    .limit(limit);
  if (lang) q = q.eq('lang', lang);
  const { data, error } = await q;
  if (error || !data) return [];
  return (data as any[]).map((row) => ({
    lectureId: row.lecture_id as string,
    lang: row.lang as string,
    lastSentenceIndex: (row as any).last_sentence_index as number,
    startedAt: (row as any).started_at as string,
    updatedAt: (row as any).updated_at as string,
  }));
}

// ---- Reading Time (daily aggregate) ----
export async function recordReadingTime(lectureId: string, lang: string, deltaMs: number): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  const user = await getCurrentUser();
  if (!user) return false; // require login for server logging
  const safe = Math.max(0, Math.min(Number(deltaMs || 0), 600000));
  if (!safe) return true;
  const { error } = await sb.rpc('record_reading_time', {
    p_lecture_id: lectureId,
    p_lang: lang,
    p_delta_ms: safe,
  } as any);
  return !error;
}

export async function fetchUserReadingTimeTotal(userId: string): Promise<number> {
  const sb = getSupabase();
  if (!sb) return 0;
  const { data, error } = await sb.rpc('get_user_reading_time_totals', { p_user: userId } as any);
  if (error || !data || !Array.isArray(data) || data.length === 0) return 0;
  const row = data[0] as any;
  return Number(row.total_ms || 0);
}
