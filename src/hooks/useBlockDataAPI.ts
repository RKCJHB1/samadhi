import { useState, useEffect, useRef } from 'react';

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
  visibleBlocks: Block[];
  isAnimating: boolean;
  startAnimation: () => void;
  stopAnimation: () => void;
  resetAnimation: () => void;
}

export function useBlockDataAPI(): BlockData {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [soldBlocks, setSoldBlocks] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Animation state
  const [visibleBlocks, setVisibleBlocks] = useState<Block[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(0);

  // Add a simple test to see if this hook is even being called
  console.log('🎯 useBlockDataAPI hook initialized');

  // Fetch real data from API
  useEffect(() => {
    console.log('🎬 useBlockDataAPI useEffect triggered - fetching real data');
    fetchBlockData();
  }, []);



  const fetchBlockData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('🚀 useBlockDataAPI: Starting fetch for up to 1M blocks...');

      // First test API connectivity
      console.log('🔍 Testing API connectivity...');
      try {
        const healthResponse = await fetch('http://localhost:3001/health');
        console.log('🏥 Health check:', healthResponse.status, healthResponse.statusText);
        if (healthResponse.ok) {
          const healthData = await healthResponse.json();
          console.log('✅ API server is responding:', healthData);
        }
      } catch (healthError) {
        console.error('❌ Health check failed:', healthError);
        throw new Error(`API server not accessible: ${healthError.message}`);
      }

      // Start with smaller dataset to test connection, then increase
      const testLimit = 10000; // Start with 10k blocks for testing
      console.log(`🌐 Fetching from: http://localhost:3001/api/blocks?limit=${testLimit}`);

      // Add timeout for requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(`http://localhost:3001/api/blocks?limit=${testLimit}`, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      clearTimeout(timeoutId);
      
      console.log('📡 Response status:', response.status, response.statusText);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Response error body:', errorText);
        throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      console.log('📥 Parsing JSON response...');
      const data = await response.json();

      console.log('📦 Raw API response structure:', {
        hasBlocks: !!data.blocks,
        blocksType: typeof data.blocks,
        blocksLength: data.blocks?.length || 0,
        responseKeys: Object.keys(data)
      });

      if (!data.blocks || !Array.isArray(data.blocks)) {
        console.error('❌ Invalid response structure:', data);
        throw new Error('Invalid API response: missing or invalid blocks array');
      }

      console.log(`✅ Successfully fetched ${data.blocks.length} blocks from API`);
      console.log('📊 Sample data:', data.blocks.slice(0, 2));

      // Process the data
      const blocksData: Block[] = data.blocks.map((row: any) => ({
        block_id: row.block_id,
        pos_x: row.pos_x,
        pos_y: row.pos_y,
        pos_z: row.pos_z,
        status: row.status,
        owner_name: row.owner_name,
        purchase_date: row.purchase_date,
        custom_message: row.custom_message,
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
      console.error('❌ Error fetching block data:', err);
      console.error('🔍 Error details:', {
        message: err instanceof Error ? err.message : 'Unknown error',
        name: err instanceof Error ? err.name : 'Unknown',
        stack: err instanceof Error ? err.stack : undefined
      });

      let errorMessage = 'Failed to fetch block data from API server.';
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          errorMessage = 'Request timed out after 30 seconds. The dataset is very large (~900k blocks).';
        } else if (err.message.includes('fetch')) {
          errorMessage = `Network error: ${err.message}. Make sure the API server is running on port 3001.`;
        } else {
          errorMessage = err.message;
        }
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
      console.log('🏁 useBlockDataAPI fetch completed');
    }
  };

  // Animation functions
  const startAnimation = () => {
    if (isAnimating || blocks.length === 0) return;

    console.log(`🎬 Starting animation with ${blocks.length} blocks at 1000 blocks/second`);
    setIsAnimating(true);
    setVisibleBlocks([]);
    currentIndexRef.current = 0;

    const showNextBatch = () => {
      const blocksPerSecond = 1000;
      const intervalMs = 1000 / blocksPerSecond; // 1ms for 1000 blocks/second

      if (currentIndexRef.current < blocks.length) {
        const nextBlock = blocks[currentIndexRef.current];
        setVisibleBlocks(prev => [...prev, nextBlock]);
        currentIndexRef.current++;

        animationRef.current = setTimeout(showNextBatch, intervalMs);
      } else {
        setIsAnimating(false);
        console.log('🎉 Animation complete!');
      }
    };

    showNextBatch();
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
    setIsAnimating(false);
    console.log('⏹️ Animation stopped');
  };

  const resetAnimation = () => {
    stopAnimation();
    setVisibleBlocks([]);
    currentIndexRef.current = 0;
    console.log('🔄 Animation reset');
  };

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

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
    visibleBlocks,
    isAnimating,
    startAnimation,
    stopAnimation,
    resetAnimation,
  };
}
