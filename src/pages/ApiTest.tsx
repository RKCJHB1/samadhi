import React, { useState, useEffect } from 'react';

const ApiTest = () => {
  const [status, setStatus] = useState('Starting...');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    testApi();
  }, []);

  const testApi = async () => {
    try {
      setStatus('Testing API connection...');
      
      // Test health endpoint first
      setStatus('Testing health endpoint...');
      const healthResponse = await fetch('http://localhost:3001/health');
      setStatus(`Health response: ${healthResponse.status}`);
      
      if (!healthResponse.ok) {
        throw new Error(`Health check failed: ${healthResponse.status}`);
      }
      
      const healthData = await healthResponse.json();
      setStatus('Health check passed! Testing blocks endpoint...');
      
      // Test blocks endpoint
      const blocksResponse = await fetch('http://localhost:3001/api/blocks?limit=5');
      setStatus(`Blocks response: ${blocksResponse.status}`);
      
      if (!blocksResponse.ok) {
        throw new Error(`Blocks API failed: ${blocksResponse.status}`);
      }
      
      const blocksData = await blocksResponse.json();
      setStatus('Success! API is working.');
      setData({
        health: healthData,
        blocks: blocksData
      });
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setStatus('Failed!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">API Test Page</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Status</h2>
          <p className={`text-lg ${error ? 'text-red-600' : 'text-green-600'}`}>
            {status}
          </p>
          
          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>
        
        {data && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">API Response Data</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
        
        <div className="mt-6">
          <button 
            onClick={testApi}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Test Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiTest;
