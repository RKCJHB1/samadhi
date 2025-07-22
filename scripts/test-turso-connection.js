#!/usr/bin/env node

/**
 * Test Turso database connection
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

console.log('🔍 Testing Turso Connection...');
console.log('Database URL:', TURSO_DATABASE_URL ? 'Set ✅' : 'Missing ❌');
console.log('Auth Token:', TURSO_AUTH_TOKEN ? 'Set ✅' : 'Missing ❌');

if (!TURSO_DATABASE_URL || !TURSO_AUTH_TOKEN) {
  console.log('❌ Missing credentials');
  process.exit(1);
}

// Test connection
async function testConnection() {
  try {
    console.log('\n🔗 Creating client...');
    const client = createClient({
      url: TURSO_DATABASE_URL,
      authToken: TURSO_AUTH_TOKEN,
    });

    console.log('📡 Testing simple query...');
    const result = await client.execute('SELECT 1 as test');
    
    console.log('✅ Connection successful!');
    console.log('Result:', result.rows);
    
    console.log('\n📋 Testing table creation...');
    await client.execute(`
      CREATE TABLE IF NOT EXISTS test_table (
        id INTEGER PRIMARY KEY,
        name TEXT
      )
    `);
    
    console.log('✅ Table creation successful!');
    
    console.log('\n🧹 Cleaning up test table...');
    await client.execute('DROP TABLE IF EXISTS test_table');
    
    console.log('✅ All tests passed! Ready to upload blocks data.');
    
  } catch (error) {
    console.log('❌ Connection failed:');
    console.log('Error:', error.message);
    console.log('Code:', error.code);
    
    if (error.message.includes('401')) {
      console.log('\n💡 Suggestions:');
      console.log('1. Check if your auth token is correct');
      console.log('2. Make sure the token has write permissions');
      console.log('3. Try generating a new token in your Turso dashboard');
    }
  }
}

testConnection();
