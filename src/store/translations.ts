// Lightweight client-side translations store using localStorage.
// This is a temporary frontend-only persistence until a backend is added.

export type TranslationRecord = {
  lectureId: string; // e.g., 'response-to-welcome'
  sentenceIndex: number; // 0-based global index across the lecture
  lang: string; // ISO code target language (not 'en')
  text: string; // translated text
  form: 'native' | 'transliteration'; // new: variant of submission
  romanization_scheme?: string | null; // optional when form = transliteration
  createdAt: number;
  updatedAt: number;
  createdBy?: string | null; // user ID who created the translation
  createdByName?: string | null; // display name of the user
  createdByUsername?: string | null; // preferred public username slug (if set)
};

const STORAGE_KEY = 'translations:v1';

function loadAll(): TranslationRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    // Back-compat: older records may not have `form` — treat as 'native'
    return arr.map((r: any) => ({
      ...r,
      form: r.form || 'native',
      romanization_scheme: r.romanization_scheme ?? r.romanizationScheme ?? null,
    }));
  } catch {
    return [];
  }
}

function saveAll(items: TranslationRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function upsertTranslation(rec: Omit<TranslationRecord, 'createdAt' | 'updatedAt'> & { form?: 'native' | 'transliteration' }): TranslationRecord {
  const all = loadAll();
  const now = Date.now();
  const form = rec.form || 'native';
  const idx = all.findIndex(
    (r) => r.lectureId === rec.lectureId && r.sentenceIndex === rec.sentenceIndex && r.lang === rec.lang && r.form === form
  );
  if (idx >= 0) {
    const updated: TranslationRecord = { ...all[idx], text: rec.text, romanization_scheme: rec.romanization_scheme ?? all[idx].romanization_scheme ?? null, updatedAt: now };
    all[idx] = updated;
    saveAll(all);
    return updated;
  }
  const created: TranslationRecord = { ...rec, form, createdAt: now, updatedAt: now } as TranslationRecord;
  all.push(created);
  saveAll(all);
  return created;
}

export function getTranslationsForSentence(
  lectureId: string,
  sentenceIndex: number
): TranslationRecord[] {
  return loadAll().filter((r) => r.lectureId === lectureId && r.sentenceIndex === sentenceIndex);
}

export function getTranslationsForLectureLang(
  lectureId: string,
  lang: string
): TranslationRecord[] {
  return loadAll().filter((r) => r.lectureId === lectureId && r.lang === lang);
}

// New: filter by form as well
export function getTranslationsForLectureLangForm(
  lectureId: string,
  lang: string,
  form: 'native' | 'transliteration'
): TranslationRecord[] {
  return loadAll().filter((r) => r.lectureId === lectureId && r.lang === lang && (r.form || 'native') === form);
}

export function countTranslatedForLectureLang(
  lectureId: string,
  lang: string
): number {
  return getTranslationsForLectureLang(lectureId, lang).length;
}

export function getAllTranslations(): TranslationRecord[] {
  return loadAll();
}

export function mostTranslatedSentence(): { key: string; total: number } | null {
  const all = loadAll();
  if (all.length === 0) return null;
  const map = new Map<string, number>();
  for (const r of all) {
    const key = `${r.lectureId}#${r.sentenceIndex}`;
    map.set(key, (map.get(key) || 0) + 1);
  }
  let maxKey = '';
  let maxVal = -1;
  for (const [k, v] of map.entries()) {
    if (v > maxVal) {
      maxVal = v;
      maxKey = k;
    }
  }
  return { key: maxKey, total: maxVal };
}

export function clearTranslations() {
  localStorage.removeItem(STORAGE_KEY);
}

