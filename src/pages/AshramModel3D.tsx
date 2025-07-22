import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html, useProgress } from '@react-three/drei';
import { AshramScene } from '../components/3d/AshramScene';
import { useBlockData } from '../hooks/useBlockData';

// Loading component for 3D scene
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-8 bg-white/90 rounded-lg shadow-lg">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-semibold text-gray-800">Loading 3D Model...</p>
        <p className="text-sm text-gray-600">{Math.round(progress)}% loaded</p>
      </div>
    </Html>
  );
}

export default function AshramModel3D() {
  console.log('AshramModel3D component started');

  // Add error boundary
  try {
    console.log('Attempting to load useBlockData hook...');
    const { stats, isLoading } = useBlockData();
    console.log('useBlockData loaded successfully, isLoading:', isLoading, 'stats:', stats);

    // Only show in development
    if (import.meta.env.PROD) {
      console.log('Production mode detected, showing dev-only message');
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">3D Model Viewer</h1>
            <p className="text-gray-600">This feature is only available in development mode.</p>
          </div>
        </div>
      );
    }

    console.log('Development mode, proceeding with 3D rendering...');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">New Ashram 3D Model</h1>
              <p className="text-sm text-gray-600 mt-1">
                Interactive visualization of the ashram construction progress
              </p>
            </div>
            <div className="text-sm text-gray-500">
              Development Mode Only
            </div>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="h-[calc(100vh-120px)]">
        <Canvas
          camera={{ 
            position: [10, 10, 10], 
            fov: 50,
            near: 0.1,
            far: 1000
          }}
          shadows
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          
          {/* Environment for better lighting */}
          <Environment preset="sunset" />
          
          {/* Camera Controls */}
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
            minDistance={5}
            maxDistance={100}
          />
          
          {/* Main Scene */}
          <Suspense fallback={<Loader />}>
            <AshramScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Controls Panel */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Controls</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <div>• Left click + drag: Rotate</div>
          <div>• Right click + drag: Pan</div>
          <div>• Scroll: Zoom in/out</div>
          <div>• Hover blocks: View details</div>
        </div>
      </div>

      {/* Stats Panel */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Statistics</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <div>
            Total Blocks: {isLoading ? 'Loading...' : stats.total.toLocaleString()}
          </div>
          <div>
            Sold Blocks: {isLoading ? 'Loading...' : stats.sold.toLocaleString()}
          </div>
          <div>
            Available: {isLoading ? 'Loading...' : stats.available.toLocaleString()}
          </div>
          <div>
            Progress: {isLoading ? 'Loading...' : `${stats.progress.toFixed(2)}%`}
          </div>
        </div>
      </div>
    </div>
  );

  } catch (error) {
    console.error('Error in AshramModel3D:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">3D Model Error</h1>
          <p className="text-gray-600">There was an error loading the 3D model.</p>
          <p className="text-sm text-gray-500 mt-2">Check the console for details.</p>
        </div>
      </div>
    );
  }
}
