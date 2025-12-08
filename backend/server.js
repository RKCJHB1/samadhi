const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { createClient } = require('@libsql/client');

const app = express();
const PORT = process.env.PORT || 3000;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Path to mantra configs JSON file (in the frontend public folder) - dev only
const MANTRA_CONFIGS_PATH = path.join(__dirname, '..', 'public', 'data', 'mantra-configs.json');

// Trust proxy for Cloudflare headers (CF-IPCountry, X-Forwarded-For, etc.)
app.set('trust proxy', true);

// CORS configuration
const corsOptions = {
  origin: IS_PRODUCTION
    ? ['https://rkmsa.org', 'https://www.rkmsa.org', 'https://samadhi.pages.dev']
    : '*',
  methods: ['GET', 'POST'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Initialize Turso database
let db = null;
if (process.env.TURSO_CONNECTION_URL && process.env.TURSO_AUTH_TOKEN) {
  db = createClient({
    url: process.env.TURSO_CONNECTION_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
}

// In-memory storage (synced to Turso every second)
let stats = {
  globalChants: 0,
  recordChants: 0,
  avgChantsPerUser: 0,
  uniqueUsers: 0,
  uniqueCountries: 0,
  userChants: {}, // Track chants per user
  countries: {} // Track unique countries
};

// Initialize database and load stats from Turso
async function initializeDatabase() {
  console.log('🔧 Initializing database...');
  console.log('DB configured:', !!db);

  if (!db) {
    console.log('⚠️  Turso not configured - using in-memory storage only');
    return;
  }

  try {
    console.log('📝 Creating table if not exists...');
    // Create table if it doesn't exist (with countries support)
    await db.execute(`
      CREATE TABLE IF NOT EXISTS aum_stats (
        id INTEGER PRIMARY KEY,
        globalChants INTEGER DEFAULT 0,
        recordChants INTEGER DEFAULT 0,
        avgChantsPerUser REAL DEFAULT 0,
        uniqueUsers INTEGER DEFAULT 0,
        uniqueCountries INTEGER DEFAULT 0,
        userChants TEXT DEFAULT '{}',
        countries TEXT DEFAULT '{}'
      )
    `);
    console.log('✅ Table created/verified');

    // Add countries columns if they don't exist (for existing databases)
    try {
      await db.execute('ALTER TABLE aum_stats ADD COLUMN uniqueCountries INTEGER DEFAULT 0');
      await db.execute('ALTER TABLE aum_stats ADD COLUMN countries TEXT DEFAULT \'{}\'');
      console.log('✅ Added countries columns');
    } catch (e) {
      // Columns already exist, ignore
    }

    // Load existing stats from Turso
    console.log('📖 Loading stats from Turso...');
    const result = await db.execute('SELECT * FROM aum_stats WHERE id = 1');
    console.log('Query result:', result);

    if (result.rows && result.rows.length > 0) {
      const row = result.rows[0];
      stats = {
        globalChants: row.globalChants || 0,
        recordChants: row.recordChants || 0,
        avgChantsPerUser: row.avgChantsPerUser || 0,
        uniqueUsers: row.uniqueUsers || 0,
        uniqueCountries: row.uniqueCountries || 0,
        userChants: JSON.parse(row.userChants || '{}'),
        countries: JSON.parse(row.countries || '{}')
      };
      console.log('✅ Loaded stats from Turso:', stats);
    } else {
      // Initialize new record
      console.log('📝 Initializing new record in Turso...');
      await db.execute(
        'INSERT INTO aum_stats (id, globalChants, recordChants, avgChantsPerUser, uniqueUsers, uniqueCountries, userChants, countries) VALUES (1, 0, 0, 0, 0, 0, ?, ?)',
        ['{}', '{}']
      );
      console.log('✅ Initialized new stats in Turso');
    }
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
    console.error('Full error:', error);
  }
}

// Sync stats to Turso every second
async function syncStatsToTurso() {
  if (!db) {
    if (!IS_PRODUCTION) console.log('⚠️  Turso not configured - skipping sync');
    return;
  }

  try {
    const userChantsJson = JSON.stringify(stats.userChants);
    const countriesJson = JSON.stringify(stats.countries);

    if (!IS_PRODUCTION) {
      console.log('📤 Syncing to Turso:', {
        globalChants: stats.globalChants,
        uniqueUsers: stats.uniqueUsers,
        uniqueCountries: stats.uniqueCountries
      });
    }

    await db.execute({
      sql: 'UPDATE aum_stats SET globalChants = ?, recordChants = ?, avgChantsPerUser = ?, uniqueUsers = ?, uniqueCountries = ?, userChants = ?, countries = ? WHERE id = 1',
      args: [
        stats.globalChants,
        stats.recordChants,
        stats.avgChantsPerUser,
        stats.uniqueUsers,
        stats.uniqueCountries,
        userChantsJson,
        countriesJson
      ]
    });
  } catch (error) {
    console.error('❌ Error syncing to Turso:', error.message);
  }
}

// GET endpoint - fetch stats
app.get('/api/aum-stats', (req, res) => {
  res.json(stats);
});

// POST endpoint - record a chant
app.post('/api/aum-chant', (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId required' });
  }

  // Get country from Cloudflare header (production) or fallback for dev
  // Cloudflare adds CF-IPCountry header automatically
  const country = req.headers['cf-ipcountry'] || 'Local';

  // Increment global chants
  stats.globalChants += 1;

  // Track user chants
  if (!stats.userChants[userId]) {
    stats.userChants[userId] = 0;
    stats.uniqueUsers += 1;
  }
  stats.userChants[userId] += 1;

  // Track countries
  if (!stats.countries[country]) {
    stats.countries[country] = 0;
    stats.uniqueCountries += 1;
  }
  stats.countries[country] += 1;

  // Update record if needed
  if (stats.userChants[userId] > stats.recordChants) {
    stats.recordChants = stats.userChants[userId];
  }

  // Calculate average
  if (stats.uniqueUsers > 0) {
    stats.avgChantsPerUser = stats.globalChants / stats.uniqueUsers;
  }

  res.json({ success: true, stats });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ============================================
// MANTRA CONFIG ENDPOINTS (Development only)
// ============================================
if (!IS_PRODUCTION) {
  // GET - Load mantra configs
  app.get('/api/mantra-configs', (req, res) => {
    try {
      if (fs.existsSync(MANTRA_CONFIGS_PATH)) {
        const data = fs.readFileSync(MANTRA_CONFIGS_PATH, 'utf-8');
        res.json(JSON.parse(data));
      } else {
        res.json({});
      }
    } catch (error) {
      console.error('Error reading mantra configs:', error);
      res.status(500).json({ error: 'Failed to read mantra configs' });
    }
  });

  // POST - Save mantra configs
  app.post('/api/mantra-configs', (req, res) => {
    try {
      const configs = req.body;
      const dir = path.dirname(MANTRA_CONFIGS_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(MANTRA_CONFIGS_PATH, JSON.stringify(configs, null, 2), 'utf-8');
      console.log('✅ Mantra configs saved to:', MANTRA_CONFIGS_PATH);
      res.json({ success: true, message: 'Configs saved successfully' });
    } catch (error) {
      console.error('Error saving mantra configs:', error);
      res.status(500).json({ error: 'Failed to save mantra configs' });
    }
  });

  // POST - Save single mantra config
  app.post('/api/mantra-configs/:mantraId', (req, res) => {
    try {
      const { mantraId } = req.params;
      const config = req.body;
      let configs = {};
      if (fs.existsSync(MANTRA_CONFIGS_PATH)) {
        configs = JSON.parse(fs.readFileSync(MANTRA_CONFIGS_PATH, 'utf-8'));
      }
      configs[mantraId] = { ...config, lastModified: new Date().toISOString() };
      const dir = path.dirname(MANTRA_CONFIGS_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(MANTRA_CONFIGS_PATH, JSON.stringify(configs, null, 2), 'utf-8');
      console.log(`✅ Mantra config for "${mantraId}" saved`);
      res.json({ success: true, message: `Config for ${mantraId} saved successfully` });
    } catch (error) {
      console.error('Error saving mantra config:', error);
      res.status(500).json({ error: 'Failed to save mantra config' });
    }
  });
}

// Start server
async function startServer() {
  await initializeDatabase();

  // Sync to Turso every 1 second
  setInterval(syncStatsToTurso, 1000);

  app.listen(PORT, () => {
    console.log(`✅ Aum Chanter backend running on port ${PORT}`);
  });
}

startServer();

