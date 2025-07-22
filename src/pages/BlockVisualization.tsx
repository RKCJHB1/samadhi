import React from 'react';
import { useBlockData } from '../hooks/useBlockData';
import Simple3DViewer from '../components/3d/Simple3DViewer';

export default function BlockVisualization() {
  const { blocks, soldBlocks, isLoading, error, stats } = useBlockData();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Database Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">New Ashram Block Visualization</h1>
              <p className="text-sm text-gray-600 mt-1">
                2D visualization of block data from Turso database
              </p>
            </div>
            <div className="text-sm text-gray-500">
              Development Mode Only
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Blocks</h3>
            <p className="text-3xl font-bold text-blue-600">
              {isLoading ? 'Loading...' : stats.total.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Sold Blocks</h3>
            <p className="text-3xl font-bold text-red-600">
              {isLoading ? 'Loading...' : stats.sold.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Available</h3>
            <p className="text-3xl font-bold text-green-600">
              {isLoading ? 'Loading...' : stats.available.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Progress</h3>
            <p className="text-3xl font-bold text-orange-600">
              {isLoading ? 'Loading...' : `${stats.progress.toFixed(2)}%`}
            </p>
          </div>
        </div>

        {/* Block Data Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Block Data Sample</h3>
            <p className="text-sm text-gray-600">First 20 blocks from the database</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Block ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position (X, Y, Z)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                      Loading block data...
                    </td>
                  </tr>
                ) : (
                  blocks.slice(0, 20).map((block) => (
                    <tr key={block.block_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{block.block_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ({block.pos_x.toFixed(3)}, {block.pos_y.toFixed(3)}, {block.pos_z.toFixed(3)})
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            block.status === 'sold'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {block.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {block.owner_name || '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3D Model Section */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">3D Ashram Model</h3>
            <p className="text-sm text-gray-600">Interactive 3D visualization with block data</p>
          </div>

          <div className="p-6">
            <div className="h-96 bg-gray-100 rounded-lg overflow-hidden">
              {!isLoading && blocks.length > 0 ? (
                <Simple3DViewer
                  modelPath="/pics/modelwithtexture.glb"
                  blockData={blocks}
                  soldBlocks={soldBlocks}
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🏗️</div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">
                      {isLoading ? 'Loading block data...' : 'No block data available'}
                    </h4>
                    <p className="text-gray-500">
                      {isLoading ? 'Fetching from database...' : 'Please check your database connection'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
