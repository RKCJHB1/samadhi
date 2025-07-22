#!/usr/bin/env node

/**
 * Script to upload blocks CSV data to Turso database
 * Usage: node scripts/upload-blocks-to-turso.js
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

// Configuration
const CSV_FILE_PATH = path.join(__dirname, '../public/dev-only/turso_ready_blocks.csv');

// Environment variables
const TURSO_DATABASE_URL = process.env.TURSO_DATABASE_URL || process.env.VITE_TURSO_DATABASE_URL;
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN || process.env.VITE_TURSO_AUTH_TOKEN;

if (!TURSO_DATABASE_URL || !TURSO_AUTH_TOKEN) {
  console.error('❌ Missing required environment variables:');
  console.error('   TURSO_DATABASE_URL - Your Turso database URL');
  console.error('   TURSO_AUTH_TOKEN - Your Turso auth token');
  console.error('\nPlease set these in your environment or .env file');
  process.exit(1);
}

// Create Turso client
const client = createClient({
  url: TURSO_DATABASE_URL,
  authToken: TURSO_AUTH_TOKEN,
});

// Database schema
const createTableSQL = `
  CREATE TABLE IF NOT EXISTS blocks (
    block_id INTEGER PRIMARY KEY,
    pos_x REAL NOT NULL,
    pos_y REAL NOT NULL,
    pos_z REAL NOT NULL,
    status TEXT NOT NULL DEFAULT 'available',
    owner_name TEXT,
    purchase_date TEXT,
    custom_message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;

const createIndexesSQL = [
  `CREATE INDEX IF NOT EXISTS idx_blocks_status ON blocks(status);`,
  `CREATE INDEX IF NOT EXISTS idx_blocks_position ON blocks(pos_x, pos_y, pos_z);`,
  `CREATE INDEX IF NOT EXISTS idx_blocks_owner ON blocks(owner_name);`
];

// Parse CSV line
function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  values.push(current.trim());
  return values;
}

// Main upload function
async function uploadBlocks() {
  try {
    console.log('🚀 Starting Turso blocks upload...');
    
    // Check if CSV file exists
    if (!fs.existsSync(CSV_FILE_PATH)) {
      throw new Error(`CSV file not found: ${CSV_FILE_PATH}`);
    }
    
    console.log('📁 Reading CSV file...');
    const csvContent = fs.readFileSync(CSV_FILE_PATH, 'utf-8');
    const lines = csvContent.split('\n').filter(line => line.trim());
    
    console.log(`📊 Found ${lines.length} lines in CSV`);
    
    // Create table and indexes
    console.log('🏗️  Creating database schema...');
    await client.execute(createTableSQL);
    
    for (const indexSQL of createIndexesSQL) {
      await client.execute(indexSQL);
    }
    
    console.log('✅ Database schema created');
    
    // Check if data already exists
    const countResult = await client.execute('SELECT COUNT(*) as count FROM blocks');
    const existingCount = countResult.rows[0].count;
    
    if (existingCount > 0) {
      console.log(`⚠️  Database already contains ${existingCount} blocks`);
      console.log('   Skipping upload to avoid duplicates');
      console.log('   If you want to re-upload, please clear the table first');
      return;
    }
    
    // Skip header line and process data
    const dataLines = lines.slice(1);
    console.log(`📤 Uploading ${dataLines.length} blocks...`);
    
    // Prepare batch insert with optimized batch size for faster processing
    const batchSize = 5000; // Larger batch size for faster upload
    let processed = 0;
    let successfulBatches = 0;
    const totalBatches = Math.ceil(dataLines.length / batchSize);

    console.log(`   Processing in ${totalBatches} batches of ${batchSize} records each...`);

    for (let i = 0; i < dataLines.length; i += batchSize) {
      const batch = dataLines.slice(i, i + batchSize);
      const batchNumber = Math.floor(i / batchSize) + 1;

      try {
        // Process batch without explicit transaction (let libsql handle it)
        const validRows = [];

        for (const line of batch) {
          const values = parseCSVLine(line);

          if (values.length >= 4) {
            const [blockId, posX, posY, posZ, status, ownerName, purchaseDate, customMessage] = values;
            validRows.push({
              blockId: parseInt(blockId) || 0,
              posX: parseFloat(posX) || 0,
              posY: parseFloat(posY) || 0,
              posZ: parseFloat(posZ) || 0,
              status: status || 'available',
              ownerName: ownerName || null,
              purchaseDate: purchaseDate || null,
              customMessage: customMessage || null
            });
          }
        }

        // Insert all valid rows in this batch using bulk insert
        if (validRows.length > 0) {
          const values = validRows.map(row =>
            `(${row.blockId}, ${row.posX}, ${row.posY}, ${row.posZ}, '${row.status}', ${row.ownerName ? `'${row.ownerName.replace(/'/g, "''")}'` : 'NULL'}, ${row.purchaseDate ? `'${row.purchaseDate}'` : 'NULL'}, ${row.customMessage ? `'${row.customMessage.replace(/'/g, "''")}'` : 'NULL'})`
          ).join(', ');

          const bulkInsertSQL = `
            INSERT INTO blocks (block_id, pos_x, pos_y, pos_z, status, owner_name, purchase_date, custom_message)
            VALUES ${values}
          `;

          await client.execute(bulkInsertSQL);
        }

        processed += validRows.length;
        successfulBatches++;

        const progress = ((processed / dataLines.length) * 100).toFixed(1);
        console.log(`   Batch ${batchNumber}/${totalBatches}: ${validRows.length} records (${progress}% total)`);

        // Small delay every 5 batches to prevent overwhelming the database
        if (batchNumber % 5 === 0) {
          await new Promise(resolve => setTimeout(resolve, 50));
        }

      } catch (error) {
        console.log(`   ⚠️  Batch ${batchNumber} failed: ${error.message}`);
        console.log(`   Continuing with next batch...`);
      }
    }

    console.log(`\n📊 Batch processing completed:`);
    console.log(`   Successful batches: ${successfulBatches}/${totalBatches}`);
    console.log(`   Records processed: ${processed}/${dataLines.length}`);
    
    // Verify upload
    const finalCountResult = await client.execute('SELECT COUNT(*) as count FROM blocks');
    const finalCount = finalCountResult.rows[0].count;
    
    console.log(`✅ Upload completed successfully!`);
    console.log(`   Total blocks in database: ${finalCount}`);
    
    // Show some statistics
    const statsResult = await client.execute(`
      SELECT 
        status,
        COUNT(*) as count
      FROM blocks 
      GROUP BY status
    `);
    
    console.log('\n📈 Block Statistics:');
    for (const row of statsResult.rows) {
      console.log(`   ${row.status}: ${row.count} blocks`);
    }
    
  } catch (error) {
    console.error('❌ Upload failed:', error.message);
    process.exit(1);
  }
}

// Run the upload
uploadBlocks();
