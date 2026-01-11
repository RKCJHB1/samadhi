// Storage utility for confirmed mantra configurations
// In development: saves to backend which writes to public/data/mantra-configs.json
// In production: loads from the committed JSON file

import { TimedSyllable, SvaraType } from '@/data/mantraTimings';

export interface MantraConfig {
  id: string;
  name: string;
  audioSrc: string;
  syllables: TimedSyllable[];
  transliteration?: string;
  transliterationSyllables?: string[];
  confirmed: boolean; // Whether this config has been reviewed and confirmed by admin
  lastModified: string;
}

const STORAGE_KEY = 'samadhi_mantra_configs';
const BACKEND_URL = import.meta.env.DEV ? 'http://localhost:3000' : '';

// Cache for loaded configs from JSON file
let fileConfigsCache: Record<string, MantraConfig> | null = null;
let fileConfigsLoading: Promise<Record<string, MantraConfig>> | null = null;

// Load configs from the JSON file (used in production)
async function loadConfigsFromFile(): Promise<Record<string, MantraConfig>> {
  if (fileConfigsCache !== null) {
    return fileConfigsCache;
  }

  if (fileConfigsLoading) {
    return fileConfigsLoading;
  }

  fileConfigsLoading = fetch('/data/mantra-configs.json')
    .then(res => {
      if (!res.ok) return {};
      return res.json();
    })
    .catch(() => ({}))
    .then(data => {
      fileConfigsCache = data;
      return data;
    });

  return fileConfigsLoading;
}

// Get all saved mantra configurations (sync version for backwards compat)
export function getSavedMantraConfigs(): Record<string, MantraConfig> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.error('Error reading mantra configs from localStorage:', e);
    return {};
  }
}

// Get a specific mantra configuration (sync - uses localStorage in dev)
export function getMantraConfig(mantraId: string): MantraConfig | null {
  const configs = getSavedMantraConfigs();
  return configs[mantraId] || null;
}

// Save a mantra configuration (localStorage + backend in dev)
export async function saveMantraConfig(config: MantraConfig): Promise<void> {
  const configs = getSavedMantraConfigs();
  configs[config.id] = {
    ...config,
    lastModified: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));

  // In development, also save to backend (which writes to file)
  if (import.meta.env.DEV) {
    try {
      await fetch(`${BACKEND_URL}/api/mantra-configs/${config.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
    } catch (e) {
      console.warn('Could not save to backend (is it running?):', e);
    }
  }
}

// Delete a mantra configuration
export function deleteMantraConfig(mantraId: string): void {
  const configs = getSavedMantraConfigs();
  delete configs[mantraId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
}

// Export all configurations as JSON string
export function exportMantraConfigs(): string {
  const configs = getSavedMantraConfigs();
  return JSON.stringify(configs, null, 2);
}

// Import configurations from JSON string
export function importMantraConfigs(jsonString: string): boolean {
  try {
    const configs = JSON.parse(jsonString);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
    return true;
  } catch (e) {
    console.error('Error importing mantra configs:', e);
    return false;
  }
}

// Get confirmed syllables for a mantra (falls back to default if not confirmed)
// This is the main function used by SyncedAudioPlayer
export function getConfirmedSyllables(
  mantraId: string,
  defaultSyllables: TimedSyllable[]
): TimedSyllable[] {
  // First check localStorage (for dev mode / immediate updates)
  const localConfig = getMantraConfig(mantraId);
  if (localConfig && localConfig.confirmed) {
    return localConfig.syllables;
  }

  // Check if we have file configs cached (for production)
  if (fileConfigsCache && fileConfigsCache[mantraId]?.confirmed) {
    return fileConfigsCache[mantraId].syllables;
  }

  return defaultSyllables;
}

// Initialize: load configs from file into cache
export async function initMantraConfigs(): Promise<void> {
  await loadConfigsFromFile();
}

// Svara type display names and descriptions
export const svaraInfo: Record<SvaraType, { name: string; description: string; motion: string }> = {
  udatta: {
    name: 'Udātta (Raise)',
    description: 'High pitch accent - syllable rises',
    motion: 'up',
  },
  anudatta: {
    name: 'Anudātta (Lower)',
    description: 'Low pitch accent - syllable lowers',
    motion: 'down',
  },
  svarita: {
    name: 'Svarita (Double Raise)',
    description: 'Circumflex accent - syllable rises then falls',
    motion: 'up-down',
  },
  'dirgha-svarita': {
    name: 'Dīrgha Svarita (Long Double)',
    description: 'Extended circumflex - longer rise and fall',
    motion: 'up-down-long',
  },
  neutral: {
    name: 'Neutral',
    description: 'No pitch accent - syllable stays level',
    motion: 'none',
  },
};

