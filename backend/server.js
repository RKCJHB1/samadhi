const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

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

// NOTE: Aum Chanter stats now use Supabase directly (frontend calls Supabase)
// This backend server is now deprecated and can be removed
// Keeping it here for reference only - no functional code needed

// NOTE: Aum Chanter endpoints have been removed
// Stats are now handled directly by Supabase frontend calls

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
app.listen(PORT, () => {
  console.log(`⚠️  Legacy Aum Chanter backend running on port ${PORT}`);
  console.log('⚠️  This backend is deprecated - Aum Chanter now uses Supabase directly');
  console.log('✅ Mantra config endpoints still available for development');
});

