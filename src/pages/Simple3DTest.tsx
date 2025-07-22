import React from 'react';

export default function Simple3DTest() {
  console.log('Simple3DTest component rendering');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">3D Model Test Page</h1>
        <p className="text-lg text-gray-600 mb-4">
          This is a simple test page to verify the route is working.
        </p>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Test Status</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
              <span>Route is working ✓</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
              <span>React component is rendering ✓</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></span>
              <span>Ready to test 3D components</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <button 
            onClick={() => window.location.href = '/new-ashram-project/3d-model'}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Try Full 3D Model
          </button>
        </div>
      </div>
    </div>
  );
}
