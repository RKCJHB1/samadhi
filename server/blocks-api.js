// Simple Express server for blocks API
import express from 'express';
import cors from 'cors';
import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

// Initialize Turso client
const tursoClient = createClient({
  url: process.env.TURSO_DATABASE_URL || process.env.VITE_TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN || process.env.VITE_TURSO_AUTH_TOKEN,
});

// Cache for blocks data to avoid repeated large queries
let blocksCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Blocks API endpoint
app.get('/api/blocks', async (req, res) => {
  try {
    // Check cache first
    const now = Date.now();
    if (blocksCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
      console.log('Returning cached blocks data');
      return res.json(blocksCache);
    }

    // Allow larger limits for full dataset
    const limit = Math.min(parseInt(req.query.limit) || 50000, 1000000); // Max 1M blocks
    console.log(`Fetching up to ${limit} blocks...`);

    const result = await tursoClient.execute({
      sql: `
        SELECT block_id, pos_x, pos_y, pos_z, status, owner_name, purchase_date, custom_message
        FROM blocks
        ORDER BY block_id
        LIMIT ?
      `,
      args: [limit]
    });

    console.log(`Fetched ${result.rows.length} blocks from database`);

    // Process the data
    const blocksData = result.rows.map((row, index) => ({
      block_id: row.block_id,
      pos_x: row.pos_x,
      pos_y: row.pos_y,
      pos_z: row.pos_z,
      // Mark first 100,000 blocks as sold for demo
      status: index < 100000 ? 'sold' : 'available',
      owner_name: index < 100000 ? `Demo Owner ${index + 1}` : row.owner_name,
      purchase_date: index < 100000 ? '2024-01-01' : row.purchase_date,
      custom_message: index < 100000 ? 'Demo purchase for visualization' : row.custom_message,
    }));

    // Calculate stats
    const soldCount = blocksData.filter(b => b.status === 'sold').length;
    const stats = {
      total: blocksData.length,
      sold: soldCount,
      available: blocksData.length - soldCount,
      progress: blocksData.length > 0 ? (soldCount / blocksData.length) * 100 : 0,
    };

    const responseData = {
      blocks: blocksData,
      stats: stats
    };

    // Cache the response
    blocksCache = responseData;
    cacheTimestamp = now;
    console.log(`Cached ${blocksData.length} blocks for ${CACHE_DURATION/1000} seconds`);

    res.json(responseData);

  } catch (error) {
    console.error('Error fetching blocks:', error);

    // If we have cached data, return it even if it's a bit old
    if (blocksCache) {
      console.log('Database error, returning cached data as fallback');
      return res.json({
        ...blocksCache,
        warning: 'Using cached data due to database connectivity issues'
      });
    }

    // If no cache, return a minimal response for demo purposes
    console.log('No cached data available, returning demo data');
    const demoBlocks = [];
    for (let i = 0; i < 1000; i++) {
      demoBlocks.push({
        block_id: i + 1,
        pos_x: (i % 10) * 2,
        pos_y: 0,
        pos_z: Math.floor(i / 10) * 2,
        status: i < 500 ? 'sold' : 'available',
        owner_name: i < 500 ? `Demo Owner ${i + 1}` : null,
        purchase_date: i < 500 ? '2024-01-01' : null,
        custom_message: i < 500 ? 'Demo purchase' : null,
      });
    }

    const demoStats = {
      total: 1000,
      sold: 500,
      available: 500,
      progress: 50
    };

    res.json({
      blocks: demoBlocks,
      stats: demoStats,
      demo: true,
      error: 'Database temporarily unavailable - showing demo data'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Blocks API server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Blocks API server running on http://localhost:${PORT}`);
  console.log(`📊 Blocks endpoint: http://localhost:${PORT}/api/blocks`);
});
