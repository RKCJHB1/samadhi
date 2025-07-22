import { useState, useEffect } from 'react';
import { createClient } from '@libsql/client';

export interface Block {
  block_id: number;
  pos_x: number;
  pos_y: number;
  pos_z: number;
  status: 'available' | 'sold';
  owner_name?: string;
  purchase_date?: string;
  custom_message?: string;
}

export interface BlockData {
  blocks: Block[];
  soldBlocks: Set<number>;
  isLoading: boolean;
  error: string | null;
  stats: {
    total: number;
    sold: number;
    available: number;
    progress: number;
  };
}

export function useBlockData(): BlockData {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [soldBlocks, setSoldBlocks] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('useBlockData: Starting to fetch data...');
    fetchBlockData();
  }, []);

  const fetchBlockData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get database credentials from environment
      const databaseUrl = import.meta.env.VITE_TURSO_DATABASE_URL;
      const authToken = import.meta.env.VITE_TURSO_AUTH_TOKEN;

      if (!databaseUrl || !authToken) {
        throw new Error('Database credentials not found. Please check your environment variables.');
      }

      // Create Turso client
      const client = createClient({
        url: databaseUrl,
        authToken: authToken,
      });

      console.log('Fetching block data from Turso...');

      // Fetch all blocks data
      const result = await client.execute(`
        SELECT 
          block_id, 
          pos_x, 
          pos_y, 
          pos_z, 
          status, 
          owner_name, 
          purchase_date, 
          custom_message
        FROM blocks 
        ORDER BY block_id
        LIMIT 900000
      `);

      console.log(`Fetched ${result.rows.length} blocks from database`);

      // Process the data
      const blocksData: Block[] = result.rows.map((row: any, index: number) => ({
        block_id: row.block_id as number,
        pos_x: row.pos_x as number,
        pos_y: row.pos_y as number,
        pos_z: row.pos_z as number,
        // Mark first 100,000 blocks as sold for animation demo
        status: index < 100000 ? 'sold' : 'available',
        owner_name: index < 100000 ? `Demo Owner ${index + 1}` : (row.owner_name as string || undefined),
        purchase_date: index < 100000 ? '2024-01-01' : (row.purchase_date as string || undefined),
        custom_message: index < 100000 ? 'Demo purchase for animation' : (row.custom_message as string || undefined),
      }));

      // Create set of sold block IDs for fast lookup
      const soldBlockIds = new Set<number>();
      blocksData.forEach(block => {
        if (block.status === 'sold') {
          soldBlockIds.add(block.block_id);
        }
      });

      setBlocks(blocksData);
      setSoldBlocks(soldBlockIds);

      console.log(`Processed ${blocksData.length} blocks, ${soldBlockIds.size} sold`);

    } catch (err) {
      console.error('Error fetching block data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch block data');
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate statistics
  const stats = {
    total: blocks.length,
    sold: soldBlocks.size,
    available: blocks.length - soldBlocks.size,
    progress: blocks.length > 0 ? (soldBlocks.size / blocks.length) * 100 : 0,
  };

  return {
    blocks,
    soldBlocks,
    isLoading,
    error,
    stats,
  };
}
