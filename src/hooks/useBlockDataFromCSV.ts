import { useState, useEffect } from 'react';
import { Block, BlockData } from './useBlockData';

export function useBlockDataFromCSV(csvPath: string = '/dev-only/turso_ready_blocks.csv'): BlockData {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [soldBlocks, setSoldBlocks] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(`useBlockDataFromCSV: Loading CSV from ${csvPath}...`);
    loadCSVFile(csvPath);
  }, [csvPath]);

  const loadCSVFile = async (path: string) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log(`Fetching CSV file from ${path}...`);
      const response = await fetch(path);

      if (!response.ok) {
        // In production, the CSV file might not exist (excluded for size)
        if (response.status === 404 && import.meta.env.PROD) {
          console.warn('CSV file not found in production - using fallback data');
          setBlocks([]);
          setSoldBlocks(new Set());
          setIsLoading(false);
          return;
        }
        throw new Error(`Failed to load CSV file: ${response.status} ${response.statusText}`);
      }

      const csvText = await response.text();
      parseCSVData(csvText);

    } catch (err) {
      console.error('Error loading CSV file:', err);
      setError(err instanceof Error ? err.message : 'Failed to load CSV file');
      setIsLoading(false);
    }
  };

  const parseCSVData = (csvText: string) => {
    try {
      console.log('Parsing CSV data...');
      
      // Split by lines and remove any empty lines
      const lines = csvText.split('\n').filter(line => line.trim().length > 0);
      
      if (lines.length === 0) {
        throw new Error('CSV file is empty');
      }
      
      // Get headers from first line
      const headers = lines[0].split(',').map(header => header.trim());
      
      // Check if we have the required columns
      const requiredColumns = ['block_id', 'pos_x', 'pos_y', 'pos_z'];
      const missingColumns = requiredColumns.filter(col => !headers.includes(col));
      
      if (missingColumns.length > 0) {
        throw new Error(`CSV is missing required columns: ${missingColumns.join(', ')}`);
      }
      
      // Parse data rows
      const parsedBlocks: Block[] = [];
      const soldBlockIds = new Set<number>();
      
      // Start from index 1 to skip header row
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = line.split(',').map(val => val.trim());
        
        // Create a map of column name to value
        const rowData: Record<string, string> = {};
        headers.forEach((header, index) => {
          rowData[header] = values[index] || '';
        });
        
        // Create block object
        const block: Block = {
          block_id: parseInt(rowData.block_id, 10),
          pos_x: parseFloat(rowData.pos_x),
          pos_y: parseFloat(rowData.pos_y),
          pos_z: parseFloat(rowData.pos_z),
          status: rowData.status === 'sold' ? 'sold' : 'available',
          owner_name: rowData.owner_name || undefined,
          purchase_date: rowData.purchase_date || undefined,
          custom_message: rowData.custom_message || undefined,
        };
        
        // Add to blocks array
        parsedBlocks.push(block);
        
        // Add to sold blocks set if status is 'sold'
        if (block.status === 'sold') {
          soldBlockIds.add(block.block_id);
        }
      }
      
      console.log(`Parsed ${parsedBlocks.length} blocks from CSV, ${soldBlockIds.size} sold`);

      // Always mark some blocks as sold for testing
      console.log('Marking blocks as sold for testing visualization');
      const testSoldBlocks = new Set<number>();

      // Mark every 3rd block as sold for testing
      for (let i = 0; i < parsedBlocks.length; i += 3) {
        parsedBlocks[i].status = 'sold';
        testSoldBlocks.add(parsedBlocks[i].block_id);
      }

      setBlocks(parsedBlocks);
      setSoldBlocks(testSoldBlocks);

      console.log(`Marked ${testSoldBlocks.size} blocks as sold for testing`);
      
    } catch (err) {
      console.error('Error parsing CSV data:', err);
      setError(err instanceof Error ? err.message : 'Failed to parse CSV data');
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
