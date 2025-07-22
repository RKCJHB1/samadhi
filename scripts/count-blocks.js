import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  url: process.env.TURSO_DATABASE_URL || process.env.VITE_TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN || process.env.VITE_TURSO_AUTH_TOKEN
});

async function countBlocks() {
  try {
    console.log('🔍 Counting total blocks in database...');
    
    const result = await client.execute('SELECT COUNT(*) as total_blocks FROM blocks');
    const totalBlocks = result.rows[0].total_blocks;
    
    console.log(`📊 Total blocks in database: ${totalBlocks.toLocaleString()}`);
    
    // Also check how many are marked as sold
    const soldResult = await client.execute("SELECT COUNT(*) as sold_blocks FROM blocks WHERE status = 'sold'");
    const soldBlocks = soldResult.rows[0].sold_blocks;
    
    console.log(`💰 Sold blocks: ${soldBlocks.toLocaleString()}`);
    console.log(`🟢 Available blocks: ${(totalBlocks - soldBlocks).toLocaleString()}`);
    console.log(`📈 Progress: ${((soldBlocks / totalBlocks) * 100).toFixed(2)}%`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

countBlocks();
