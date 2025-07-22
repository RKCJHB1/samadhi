#!/usr/bin/env node

/**
 * Script to clear all data from Turso database
 * Usage: node scripts/clear-turso-data.js
 */

import { createClient } from '@libsql/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
function loadEnvFile() {
  const envPath = path.join(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const lines = envContent.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=');
          process.env[key] = value;
        }
      }
    }
  }
}

// Load environment variables
loadEnvFile();

const TURSO_DATABASE_URL = process.env.TURSO_DATABASE_URL || process.env.VITE_TURSO_DATABASE_URL;
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN || process.env.VITE_TURSO_AUTH_TOKEN;

if (!TURSO_DATABASE_URL || !TURSO_AUTH_TOKEN) {
  console.log('❌ Missing required environment variables:');
  if (!TURSO_DATABASE_URL) console.log('   TURSO_DATABASE_URL - Your Turso database URL');
  if (!TURSO_AUTH_TOKEN) console.log('   TURSO_AUTH_TOKEN - Your Turso auth token');
  console.log('\nPlease set these in your environment or .env file');
  process.exit(1);
}

// Create client
const client = createClient({
  url: TURSO_DATABASE_URL,
  authToken: TURSO_AUTH_TOKEN,
});

async function clearDatabase() {
  try {
    console.log('🗑️  Clearing Turso database...');
    
    // Check current count
    const countResult = await client.execute('SELECT COUNT(*) as count FROM blocks');
    const currentCount = countResult.rows[0].count;
    
    console.log(`📊 Current records in database: ${currentCount}`);
    
    if (currentCount === 0) {
      console.log('✅ Database is already empty!');
      return;
    }
    
    // Clear the table
    console.log('🧹 Deleting all records...');
    await client.execute('DELETE FROM blocks');
    
    // Verify deletion
    const newCountResult = await client.execute('SELECT COUNT(*) as count FROM blocks');
    const newCount = newCountResult.rows[0].count;
    
    console.log(`✅ Database cleared successfully!`);
    console.log(`   Records before: ${currentCount}`);
    console.log(`   Records after: ${newCount}`);
    
    if (newCount === 0) {
      console.log('\n🚀 Ready for fresh upload! Run: npm run upload-blocks');
    }
    
  } catch (error) {
    console.log('❌ Clear failed:', error.message);
    process.exit(1);
  }
}

clearDatabase();
