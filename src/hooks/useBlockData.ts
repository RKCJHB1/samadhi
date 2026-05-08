import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

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

      // Try to fetch from Supabase if blocks table exists
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        console.warn('Supabase not configured, using demo blocks data');
        loadDemoBlocks();
        return;
      }

      const supabase = createClient(supabaseUrl, supabaseKey);

      console.log('Attempting to fetch block data from Supabase...');

      try {
        const { data, error: fetchError } = await supabase
          .from('blocks')
          .select('block_id, pos_x, pos_y, pos_z, status, owner_name, purchase_date, custom_message')
          .order('block_id')
          .limit(900000);

        if (fetchError) {
          console.warn('Blocks table not found in Supabase, using demo data:', fetchError);
          loadDemoBlocks();
          return;
        }

        if (!data || data.length === 0) {
          console.warn('No blocks found, using demo data');
          loadDemoBlocks();
          return;
        }

        console.log(`Fetched ${data.length} blocks from Supabase`);

        // Process the data
        const blocksData: Block[] = data.map((row: any, index: number) => ({
          block_id: row.block_id as number,
          pos_x: row.pos_x as number,
          pos_y: row.pos_y as number,
          pos_z: row.pos_z as number,
          status: row.status as 'available' | 'sold',
          owner_name: row.owner_name as string || undefined,
          purchase_date: row.purchase_date as string || undefined,
          custom_message: row.custom_message as string || undefined,
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
        console.warn('Error fetching from Supabase, using demo data:', err);
        loadDemoBlocks();
      }

    } catch (err) {
      console.error('Error in fetchBlockData:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch block data');
      loadDemoBlocks();
    } finally {
      setIsLoading(false);
    }
  };

  const loadDemoBlocks = () => {
    // Generate demo blocks data for visualization
    const demoBlocks: Block[] = Array.from({ length: 100 }, (_, i) => ({
      block_id: i + 1,
      pos_x: Math.random() * 100,
      pos_y: Math.random() * 100,
      pos_z: Math.random() * 100,
      status: i < 50 ? 'sold' : 'available',
      owner_name: i < 50 ? `Demo Owner ${i + 1}` : undefined,
      purchase_date: i < 50 ? '2024-01-01' : undefined,
      custom_message: i < 50 ? 'Demo purchase' : undefined,
    }));

    const soldBlockIds = new Set<number>();
    demoBlocks.forEach(block => {
      if (block.status === 'sold') {
        soldBlockIds.add(block.block_id);
      }
    });

    setBlocks(demoBlocks);
    setSoldBlocks(soldBlockIds);
    console.log('Loaded demo blocks for visualization');
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
