
// Turso Database Configuration
// Note: This will only work in Node.js environments (like the upload script)
// For browser environments, we'll use a mock implementation

let tursoClient: any = null;

// Only import and create client in Node.js environment
if (typeof window === 'undefined') {
  try {
    const { createClient } = require('@libsql/client');
    const TURSO_DATABASE_URL = process.env.VITE_TURSO_DATABASE_URL || process.env.TURSO_DATABASE_URL || '';
    const TURSO_AUTH_TOKEN = process.env.VITE_TURSO_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN || '';

    if (TURSO_DATABASE_URL && TURSO_AUTH_TOKEN) {
      tursoClient = createClient({
        url: TURSO_DATABASE_URL,
        authToken: TURSO_AUTH_TOKEN,
      });
    }
  } catch (error) {
    console.warn('Turso client not available in this environment');
  }
}

// Database schema for blocks table
export const createBlocksTableSQL = `
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

// Create indexes for better performance
export const createIndexesSQL = [
  `CREATE INDEX IF NOT EXISTS idx_blocks_status ON blocks(status);`,
  `CREATE INDEX IF NOT EXISTS idx_blocks_position ON blocks(pos_x, pos_y, pos_z);`,
  `CREATE INDEX IF NOT EXISTS idx_blocks_owner ON blocks(owner_name);`
];

// Initialize database schema
export async function initializeDatabase() {
  if (!tursoClient) {
    console.warn('Turso client not available - using mock implementation');
    return true;
  }

  try {
    // Create the blocks table
    await tursoClient.execute(createBlocksTableSQL);

    // Create indexes
    for (const indexSQL of createIndexesSQL) {
      await tursoClient.execute(indexSQL);
    }

    console.log('✅ Database schema initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to initialize database schema:', error);
    return false;
  }
}

// Function to get block by ID
export async function getBlock(blockId: number) {
  if (!tursoClient) {
    console.warn('Turso client not available - returning mock data');
    return {
      block_id: blockId,
      pos_x: Math.random() * 2 - 1,
      pos_y: Math.random() * 0.5 - 0.25,
      pos_z: Math.random() * 2 - 1,
      status: 'available',
      owner_name: null,
      purchase_date: null,
      custom_message: null
    };
  }

  try {
    const result = await tursoClient.execute({
      sql: 'SELECT * FROM blocks WHERE block_id = ?',
      args: [blockId]
    });
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching block:', error);
    return null;
  }
}

// Function to get blocks by status
export async function getBlocksByStatus(status: string) {
  if (!tursoClient) {
    console.warn('Turso client not available - returning mock data');
    // Return some mock blocks for demonstration
    const mockBlocks = [];
    for (let i = 0; i < 10; i++) {
      mockBlocks.push({
        block_id: i,
        pos_x: Math.random() * 2 - 1,
        pos_y: Math.random() * 0.5 - 0.25,
        pos_z: Math.random() * 2 - 1,
        status: status,
        owner_name: status === 'purchased' ? `Owner ${i}` : null,
        purchase_date: status === 'purchased' ? new Date().toISOString() : null,
        custom_message: status === 'purchased' ? `Message for block ${i}` : null
      });
    }
    return mockBlocks;
  }

  try {
    const result = await tursoClient.execute({
      sql: 'SELECT * FROM blocks WHERE status = ? ORDER BY block_id',
      args: [status]
    });
    return result.rows;
  } catch (error) {
    console.error('Error fetching blocks by status:', error);
    return [];
  }
}

// Function to update block ownership
export async function updateBlockOwnership(
  blockId: number,
  ownerName: string,
  customMessage?: string
) {
  if (!tursoClient) {
    console.warn('Turso client not available - simulating purchase');
    // Simulate successful purchase for demo
    return true;
  }

  try {
    const result = await tursoClient.execute({
      sql: `UPDATE blocks
            SET status = 'purchased',
                owner_name = ?,
                custom_message = ?,
                purchase_date = datetime('now'),
                updated_at = datetime('now')
            WHERE block_id = ? AND status = 'available'`,
      args: [ownerName, customMessage || '', blockId]
    });

    return result.rowsAffected > 0;
  } catch (error) {
    console.error('Error updating block ownership:', error);
    return false;
  }
}

// Function to get total block counts by status
export async function getBlockStats() {
  if (!tursoClient) {
    console.warn('Turso client not available - returning mock stats');
    return {
      available: 44000,
      purchased: 100,
      reserved: 50
    };
  }

  try {
    const result = await tursoClient.execute(`
      SELECT
        status,
        COUNT(*) as count
      FROM blocks
      GROUP BY status
    `);

    const stats = result.rows.reduce((acc: any, row: any) => {
      acc[row.status] = row.count;
      return acc;
    }, {});

    return stats;
  } catch (error) {
    console.error('Error fetching block stats:', error);
    return {};
  }
}

// Legacy compatibility - keeping the old interface for existing code
export const db = {
  prepare: (sql: string) => ({
    run: async (...args: any[]) => {
      try {
        const result = await tursoClient.execute({ sql, args });
        return { changes: result.rowsAffected };
      } catch (error) {
        console.error('Database operation failed:', error);
        return { changes: 0 };
      }
    },
    get: async (...args: any[]) => {
      try {
        const result = await tursoClient.execute({ sql, args });
        return result.rows[0] || null;
      } catch (error) {
        console.error('Database query failed:', error);
        return null;
      }
    },
    all: async (...args: any[]) => {
      try {
        const result = await tursoClient.execute({ sql, args });
        return result.rows;
      } catch (error) {
        console.error('Database query failed:', error);
        return [];
      }
    }
  }),
  exec: async (sql: string) => {
    try {
      await tursoClient.execute(sql);
    } catch (error) {
      console.error('Database exec failed:', error);
    }
  }
};
