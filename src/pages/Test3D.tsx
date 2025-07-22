import React from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';

function TestCube() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function Test3D() {
  console.log('Test3D component rendering...');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">3D Test Page</h1>
        <p className="mb-4">This is a simple test to verify Three.js is working.</p>
      </div>

      <div className="h-96 border-2 border-gray-300 mx-4 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-500 mx-auto mb-4"></div>
          <p>Three.js would go here (imports commented out)</p>
        </div>
      </div>
    </div>
  );
}
