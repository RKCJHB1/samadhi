import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  url: process.env.TURSO_DATABASE_URL || process.env.VITE_TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN || process.env.VITE_TURSO_AUTH_TOKEN
});

async function analyzeCoordinates() {
  try {
    console.log('🔍 Analyzing coordinate data...');
    
    // Get total count
    const countResult = await client.execute('SELECT COUNT(*) as total FROM blocks');
    const total = countResult.rows[0].total;
    console.log(`📊 Total blocks: ${total.toLocaleString()}`);
    
    // Get coordinate ranges
    const rangeResult = await client.execute(`
      SELECT 
        MIN(pos_x) as min_x, MAX(pos_x) as max_x,
        MIN(pos_y) as min_y, MAX(pos_y) as max_y,
        MIN(pos_z) as min_z, MAX(pos_z) as max_z
      FROM blocks
    `);
    
    const ranges = rangeResult.rows[0];
    console.log('\n📐 Coordinate Ranges:');
    console.log(`X: ${ranges.min_x} to ${ranges.max_x} (range: ${ranges.max_x - ranges.min_x})`);
    console.log(`Y: ${ranges.min_y} to ${ranges.max_y} (range: ${ranges.max_y - ranges.min_y})`);
    console.log(`Z: ${ranges.min_z} to ${ranges.max_z} (range: ${ranges.max_z - ranges.min_z})`);
    
    // Sample some actual coordinates
    const sampleResult = await client.execute(`
      SELECT block_id, pos_x, pos_y, pos_z, status
      FROM blocks 
      ORDER BY block_id 
      LIMIT 10
    `);
    
    console.log('\n📋 Sample coordinates (first 10 blocks):');
    sampleResult.rows.forEach(row => {
      console.log(`Block ${row.block_id}: (${row.pos_x}, ${row.pos_y}, ${row.pos_z}) - ${row.status}`);
    });
    
    // Check if coordinates are integers or decimals
    const precisionResult = await client.execute(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN pos_x = ROUND(pos_x) THEN 1 END) as x_integers,
        COUNT(CASE WHEN pos_y = ROUND(pos_y) THEN 1 END) as y_integers,
        COUNT(CASE WHEN pos_z = ROUND(pos_z) THEN 1 END) as z_integers
      FROM blocks 
      LIMIT 1000
    `);
    
    const precision = precisionResult.rows[0];
    console.log('\n🔢 Coordinate precision (sample of 1000):');
    console.log(`X integers: ${precision.x_integers}/${precision.total} (${(precision.x_integers/precision.total*100).toFixed(1)}%)`);
    console.log(`Y integers: ${precision.y_integers}/${precision.total} (${(precision.y_integers/precision.total*100).toFixed(1)}%)`);
    console.log(`Z integers: ${precision.z_integers}/${precision.total} (${(precision.z_integers/precision.total*100).toFixed(1)}%)`);
    
    // Check distribution across Y levels
    const yDistResult = await client.execute(`
      SELECT 
        ROUND(pos_y, 3) as y_level,
        COUNT(*) as block_count
      FROM blocks 
      GROUP BY ROUND(pos_y, 3)
      ORDER BY y_level
      LIMIT 20
    `);
    
    console.log('\n📊 Distribution by Y level (first 20 levels):');
    yDistResult.rows.forEach(row => {
      console.log(`Y=${row.y_level}: ${row.block_count} blocks`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

analyzeCoordinates();
