#!/usr/bin/env node

/**
 * Interactive Turso setup script
 * This script helps you configure Turso without needing the CLI
 */

import readline from 'readline';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setupTurso() {
  console.log('🚀 Turso Database Setup');
  console.log('========================\n');
  
  console.log('Please follow these steps to get your Turso credentials:\n');
  console.log('1. Go to https://turso.tech and sign up/login');
  console.log('2. Create a new database (e.g., "blocks-db")');
  console.log('3. Go to your database dashboard');
  console.log('4. Copy the database URL and create an auth token\n');
  
  const databaseUrl = await question('Enter your Turso database URL: ');
  const authToken = await question('Enter your Turso auth token: ');
  
  if (!databaseUrl || !authToken) {
    console.log('❌ Both database URL and auth token are required');
    rl.close();
    return;
  }
  
  // Validate URL format
  if (!databaseUrl.startsWith('libsql://')) {
    console.log('❌ Database URL should start with "libsql://"');
    rl.close();
    return;
  }
  
  console.log('\n📝 Updating environment variables...');
  
  // Read current .env.local
  const envPath = path.join(__dirname, '../.env.local');
  let envContent = '';
  
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf-8');
  }
  
  // Update or add Turso variables
  const tursoVars = {
    'VITE_TURSO_DATABASE_URL': databaseUrl,
    'VITE_TURSO_AUTH_TOKEN': authToken,
    'TURSO_DATABASE_URL': databaseUrl,
    'TURSO_AUTH_TOKEN': authToken
  };
  
  let updatedContent = envContent;
  
  for (const [key, value] of Object.entries(tursoVars)) {
    const regex = new RegExp(`^${key}=.*$`, 'm');
    const newLine = `${key}=${value}`;
    
    if (regex.test(updatedContent)) {
      updatedContent = updatedContent.replace(regex, newLine);
    } else {
      updatedContent += `\n${newLine}`;
    }
  }
  
  // Write updated content
  fs.writeFileSync(envPath, updatedContent);
  
  console.log('✅ Environment variables updated');
  console.log('\n🔄 Testing connection...');
  
  // Test connection
  try {
    const { createClient } = await import('@libsql/client');
    const client = createClient({
      url: databaseUrl,
      authToken: authToken,
    });
    
    // Try a simple query
    await client.execute('SELECT 1');
    console.log('✅ Connection successful!');
    
    console.log('\n📤 Ready to upload your blocks data!');
    console.log('Run: npm run upload-blocks');
    
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    console.log('Please check your credentials and try again');
  }
  
  rl.close();
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n\n👋 Setup cancelled');
  rl.close();
  process.exit(0);
});

setupTurso().catch(console.error);
