// API functions for blocks data - server-side only
import { createClient } from '@libsql/client';

// Server-side Turso client
let tursoClient: ReturnType<typeof createClient> | null = null;

// Initialize Turso client (server-side only)
function initializeTursoClient() {
  if (typeof window !== 'undefined') {
    // Don't initialize on client-side
    return null;
  }

  if (!tursoClient) {
    const databaseUrl = process.env.TURSO_DATABASE_URL || process.env.VITE_TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN || process.env.VITE_TURSO_AUTH_TOKEN;

    if (databaseUrl && authToken) {
      tursoClient = createClient({
        url: databaseUrl,
        authToken: authToken,
      });
      console.log('Turso client initialized (server-side)');
    } else {
      console.warn('Turso credentials not found in environment variables');
    }
  }

  return tursoClient;
}

// Fetch blocks data (server-side function)
export async function fetchBlocksData(limit: number = 900000) {
  const client = initializeTursoClient();
  
  if (!client) {
    throw new Error('Database client not available');
  }

  try {
    console.log(`Fetching up to ${limit} blocks from Turso database...`);
    
    const result = await client.execute({
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
    const blocksData = result.rows.map((row: any, index: number) => ({
      block_id: row.block_id as number,
      pos_x: row.pos_x as number,
      pos_y: row.pos_y as number,
      pos_z: row.pos_z as number,
      // Mark first 100,000 blocks as sold for demo
      status: index < 100000 ? 'sold' : 'available',
      owner_name: index < 100000 ? `Demo Owner ${index + 1}` : (row.owner_name as string || undefined),
      purchase_date: index < 100000 ? '2024-01-01' : (row.purchase_date as string || undefined),
      custom_message: index < 100000 ? 'Demo purchase for visualization' : (row.custom_message as string || undefined),
    }));

    return blocksData;
  } catch (error) {
    console.error('Error fetching blocks data:', error);
    throw error;
  }
}
