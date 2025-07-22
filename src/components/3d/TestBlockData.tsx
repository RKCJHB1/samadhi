import React, { useState } from 'react';
import { useBlockDataFromCSV } from '../../hooks/useBlockDataFromCSV';
import { AshramScene } from './AshramScene';

// Sample CSV data for testing
const SAMPLE_CSV_DATA = `block_id,pos_x,pos_y,pos_z,status,owner_name
1,0,0,0,sold,Test Owner 1
2,0.1,0,0,sold,Test Owner 2
3,0.2,0,0,sold,Test Owner 3
4,0.3,0,0,sold,Test Owner 4
5,0.4,0,0,sold,Test Owner 5
6,0.5,0,0,available,
7,0.6,0,0,available,
8,0.7,0,0,available,
9,0.8,0,0,available,
10,0.9,0,0,available,
11,0,0.1,0,sold,Test Owner 11
12,0.1,0.1,0,sold,Test Owner 12
13,0.2,0.1,0,sold,Test Owner 13
14,0.3,0.1,0,sold,Test Owner 14
15,0.4,0.1,0,sold,Test Owner 15
16,0.5,0.1,0,available,
17,0.6,0.1,0,available,
18,0.7,0.1,0,available,
19,0.8,0.1,0,available,
20,0.9,0.1,0,available,
21,0,0.2,0,sold,Test Owner 21
22,0.1,0.2,0,sold,Test Owner 22
23,0.2,0.2,0,sold,Test Owner 23
24,0.3,0.2,0,sold,Test Owner 24
25,0.4,0.2,0,sold,Test Owner 25
26,0.5,0.2,0,available,
27,0.6,0.2,0,available,
28,0.7,0.2,0,available,
29,0.8,0.2,0,available,
30,0.9,0.2,0,available,`;

interface TestBlockDataProps {
  csvData?: string;
}

export function TestBlockData({ csvData = SAMPLE_CSV_DATA }: TestBlockDataProps) {
  const { blocks, soldBlocks, isLoading, error } = useBlockDataFromCSV(csvData);
  
  if (error) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }
  
  return <AshramScene blocks={blocks} soldBlocks={soldBlocks} isLoading={isLoading} />;
}
