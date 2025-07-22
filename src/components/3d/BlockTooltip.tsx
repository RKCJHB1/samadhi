import React from 'react';
import { Html } from '@react-three/drei';
import { Block } from '../../hooks/useBlockData';

interface BlockTooltipProps {
  block: Block;
  position: [number, number, number];
  visible: boolean;
}

export function BlockTooltip({ block, position, visible }: BlockTooltipProps) {
  if (!visible) return null;

  const isSold = block.status === 'sold';

  return (
    <Html
      position={position}
      center
      distanceFactor={10}
      occlude
      style={{
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-gray-200 min-w-[200px]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-800">
            Block #{block.block_id}
          </h3>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isSold
                ? 'bg-red-100 text-red-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {isSold ? 'Sold' : 'Available'}
          </span>
        </div>
        
        <div className="space-y-1 text-sm text-gray-600">
          <div>
            <span className="font-medium">Position:</span>{' '}
            ({block.pos_x.toFixed(3)}, {block.pos_y.toFixed(3)}, {block.pos_z.toFixed(3)})
          </div>
          
          {isSold && block.owner_name && (
            <div>
              <span className="font-medium">Owner:</span> {block.owner_name}
            </div>
          )}
          
          {isSold && block.purchase_date && (
            <div>
              <span className="font-medium">Purchased:</span>{' '}
              {new Date(block.purchase_date).toLocaleDateString()}
            </div>
          )}
          
          {isSold && block.custom_message && (
            <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
              <span className="font-medium">Message:</span>
              <div className="mt-1">{block.custom_message}</div>
            </div>
          )}
          
          {!isSold && (
            <div className="mt-2 text-xs text-gray-500">
              Click to purchase this block
            </div>
          )}
        </div>
      </div>
    </Html>
  );
}
