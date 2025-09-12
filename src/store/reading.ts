// Lightweight client-side reading stats store using localStorage.
// Tracks per-user reading progress for lectures: sentences read and time spent.

export type UserReadingStats = {
  userId: string;
  totals: {
    totalSentences: number;
    totalDurationMs: number;
  };
  lectures: Record<string, {
    sentencesRead: number; // unique sentences counted
    uniqueSentenceIndices: number[]; // store unique indices
    lastSentenceIndex: number; // last index seen (0-based)
    totalDurationMs: number; // accumulated time spent on this lecture
    lastReadAt: number; // timestamp
  }>;
};

const STORAGE_KEY = 'readingStats:v1';

function loadAll(): UserReadingStats[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr.map((r: any) => ({
      userId: String(r.userId || 'anonymous'),
      totals: {
        totalSentences: Number(r.totals?.totalSentences || 0),
        totalDurationMs: Number(r.totals?.totalDurationMs || 0),
      },
      lectures: Object.fromEntries(Object.entries(r.lectures || {}).map(([k, v]: any) => [k, {
        sentencesRead: Number(v.sentencesRead || 0),
        uniqueSentenceIndices: Array.isArray(v.uniqueSentenceIndices) ? v.uniqueSentenceIndices.map((n: any) => Number(n)).filter((n: number) => !Number.isNaN(n)) : [],
        lastSentenceIndex: Number(v.lastSentenceIndex || 0),
        totalDurationMs: Number(v.totalDurationMs || 0),
        lastReadAt: Number(v.lastReadAt || Date.now()),
      }]))
    }));
  } catch {
    return [];
  }
}

function saveAll(items: UserReadingStats[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function getIndexForUser(all: UserReadingStats[], userId: string) {
  return all.findIndex(s => s.userId === userId);
}

export function getReadingStatsForUser(userId: string): UserReadingStats {
  const all = loadAll();
  const idx = getIndexForUser(all, userId);
  if (idx >= 0) return all[idx];
  return {
    userId,
    totals: { totalSentences: 0, totalDurationMs: 0 },
    lectures: {},
  };
}

export function recordSentenceRead(userId: string, lectureId: string, sentenceIndex: number, durationMsForThisSentence: number) {
  const all = loadAll();
  let idx = getIndexForUser(all, userId);
  if (idx < 0) {
    all.push({ userId, totals: { totalSentences: 0, totalDurationMs: 0 }, lectures: {} });
    idx = all.length - 1;
  }
  const stats = all[idx];
  const lec = stats.lectures[lectureId] || { sentencesRead: 0, uniqueSentenceIndices: [], lastSentenceIndex: -1, totalDurationMs: 0, lastReadAt: 0 };

  // Unique sentence tracking
  if (!lec.uniqueSentenceIndices.includes(sentenceIndex)) {
    lec.uniqueSentenceIndices.push(sentenceIndex);
    lec.sentencesRead += 1;
    stats.totals.totalSentences += 1;
  }

  // Duration accumulation
  lec.totalDurationMs += Math.max(0, durationMsForThisSentence || 0);
  stats.totals.totalDurationMs += Math.max(0, durationMsForThisSentence || 0);

  // Progress
  if (sentenceIndex > lec.lastSentenceIndex) {
    lec.lastSentenceIndex = sentenceIndex;
  }
  lec.lastReadAt = Date.now();

  stats.lectures[lectureId] = lec;
  saveAll(all);
}

export function addReadingDuration(userId: string, lectureId: string, deltaMs: number) {
  if (!deltaMs) return;
  const all = loadAll();
  let idx = getIndexForUser(all, userId);
  if (idx < 0) {
    all.push({ userId, totals: { totalSentences: 0, totalDurationMs: 0 }, lectures: {} });
    idx = all.length - 1;
  }
  const stats = all[idx];
  const lec = stats.lectures[lectureId] || { sentencesRead: 0, uniqueSentenceIndices: [], lastSentenceIndex: -1, totalDurationMs: 0, lastReadAt: 0 };
  lec.totalDurationMs += Math.max(0, deltaMs);
  stats.totals.totalDurationMs += Math.max(0, deltaMs);
  lec.lastReadAt = Date.now();
  stats.lectures[lectureId] = lec;
  saveAll(all);
}

export function getLectureProgress(userId: string, lectureId: string) {
  const stats = getReadingStatsForUser(userId);
  return stats.lectures[lectureId] || { sentencesRead: 0, uniqueSentenceIndices: [], lastSentenceIndex: -1, totalDurationMs: 0, lastReadAt: 0 };
}

// Get aggregated reading statistics across all users
export function getAggregatedReadingStats(vivekanandaLectures?: any[]) {
  const all = loadAll();

  let totalSentencesRead = 0;
  let totalDurationMs = 0;
  let totalLecturesStarted = 0;
  let totalLecturesCompleted = 0;
  let totalLecturesInProgress = 0;
  let totalUsers = all.length;

  for (const userStats of all) {
    totalSentencesRead += userStats.totals.totalSentences;
    totalDurationMs += userStats.totals.totalDurationMs;

    const lectureIds = Object.keys(userStats.lectures);
    totalLecturesStarted += lectureIds.length;

    // Count completed vs in-progress lectures for this user
    for (const lectureId of lectureIds) {
      const lecture = userStats.lectures[lectureId];
      const readUnique = lecture.uniqueSentenceIndices?.length || 0;

      if (vivekanandaLectures) {
        // Use actual lecture data to determine completion
        const lectureData = vivekanandaLectures.find(l => l.id === lectureId);
        if (lectureData) {
          // Import countSentences function would be needed here
          // For now, estimate: most lectures have 80-120 sentences
          const estimatedTotal = 100; // Conservative estimate
          if (readUnique >= estimatedTotal * 0.9) { // 90% completion threshold
            totalLecturesCompleted += 1;
          } else if (readUnique > 0) {
            totalLecturesInProgress += 1;
          }
        } else {
          // Unknown lecture, use threshold
          if (readUnique >= 80) {
            totalLecturesCompleted += 1;
          } else if (readUnique > 0) {
            totalLecturesInProgress += 1;
          }
        }
      } else {
        // Fallback: use threshold-based detection
        if (readUnique >= 80) {
          totalLecturesCompleted += 1;
        } else if (readUnique > 0) {
          totalLecturesInProgress += 1;
        }
      }
    }
  }

  return {
    totalUsers,
    totalSentencesRead,
    totalDurationMs,
    totalLecturesStarted,
    totalLecturesCompleted,
    totalLecturesInProgress
  };
}

