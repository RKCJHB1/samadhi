import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Gltf, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useBlockData } from '../../hooks/useBlockData';
import { useBlockDataFromCSV } from '../../hooks/useBlockDataFromCSV';
import { BlocksInstancedMesh } from './BlocksInstancedMesh';

export function AshramScene() {
  const groupRef = useRef<THREE.Group>(null);
  const [modelMatrixWorld, setModelMatrixWorld] = useState<THREE.Matrix4 | null>(null);
  const [showProgress, setShowProgress] = useState(false);

  // Fetch block data from CSV file (fallback to database if needed)
  const { blocks, soldBlocks, isLoading, error } = useBlockDataFromCSV();

  // Optional: Add subtle rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      // Very subtle rotation for visual appeal
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  if (error) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }

  return (
    <>
      <group ref={groupRef}>
        {/* Semi-transparent GLB Model - only load if file exists */}
        <SemiTransparentModel
          onModelLoad={setModelMatrixWorld}
          showProgress={showProgress}
        />

        {/* Instanced Blocks */}
        {!isLoading && blocks.length > 0 && modelMatrixWorld && (
          <BlocksInstancedMesh
            blocks={blocks}
            soldBlocks={soldBlocks}
            modelMatrixWorld={modelMatrixWorld}
          />
        )}

        {/* Fallback if no blocks loaded */}
        {!isLoading && blocks.length === 0 && (
          <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="orange" opacity={0.5} transparent />
          </mesh>
        )}
      </group>

      {/* UI Button for showing progress */}
      <ProgressButton
        showProgress={showProgress}
        onToggle={() => setShowProgress(!showProgress)}
      />
    </>
  );
}

// Component for the semi-transparent base model
interface SemiTransparentModelProps {
  onModelLoad: (matrixWorld: THREE.Matrix4) => void;
  showProgress?: boolean;
}

function SemiTransparentModel({ onModelLoad, showProgress = false }: SemiTransparentModelProps) {
  const modelRef = useRef<THREE.Group>(null);
  const [gltfScene, setGltfScene] = useState<THREE.Group | null>(null);

  // Apply semi-transparent material to all meshes in the model
  const handleModelLoad = (gltf: any) => {
    console.log('GLB model loaded:', gltf);

    if (gltf.scene) {
      // Scale the model if needed
      gltf.scene.scale.setScalar(1);

      // Store the scene for later material updates
      setGltfScene(gltf.scene);

      // Apply semi-transparent material to all meshes
      gltf.scene.traverse((child: any) => {
        if (child.isMesh) {
          console.log('Processing mesh:', child.name);

          // Create a semi-transparent material
          child.material = new THREE.MeshStandardMaterial({
            color: 0xcccccc, // Light gray color
            opacity: 0.5, // 50% opacity
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false, // Important for transparency
            alphaTest: 0.01,
            metalness: 0.1,
            roughness: 0.8,
          });

          // Store original position for later reference
          child.userData.originalPosition = child.position.clone();

          // Enable shadows if desired
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      // Update the world matrix and pass it to the parent component
      gltf.scene.updateMatrixWorld(true);
      onModelLoad(gltf.scene.matrixWorld.clone());

      console.log('Applied semi-transparent materials to GLB model and extracted matrixWorld');
    }
  };

  // Update materials when showProgress changes
  useEffect(() => {
    if (!gltfScene) return;

    console.log('Updating materials, showProgress:', showProgress);
    let meshCount = 0;
    let updatedCount = 0;

    gltfScene.traverse((child: any) => {
      if (child.isMesh) {
        meshCount++;

        // Get the mesh's world position to determine if it's in the "completed" half
        const worldPosition = new THREE.Vector3();
        child.getWorldPosition(worldPosition);

        // Simple check: meshes with x > 0 are considered "completed"
        const isCompleted = worldPosition.x > 0;

        if (showProgress && isCompleted) {
          // Change material for the "completed" half when showing progress
          child.material.color.set(0x4CAF50); // Bright green color
          child.material.opacity = 0.9; // Much more opaque
          child.material.emissive.set(0x2E7D32); // Strong green glow
          child.material.emissiveIntensity = 0.3;
          updatedCount++;
          console.log(`Updated mesh ${child.name || 'unnamed'} to green`);
        } else {
          // Reset to default semi-transparent material
          child.material.color.set(0xcccccc); // Light gray
          child.material.opacity = 0.5; // 50% opacity
          child.material.emissive.set(0x000000); // No glow
          child.material.emissiveIntensity = 0;
        }

        // Ensure material updates are applied
        child.material.needsUpdate = true;
      }
    });

    console.log(`Processed ${meshCount} meshes, updated ${updatedCount} to show progress`);

  }, [gltfScene, showProgress]);

  // Try to load the GLB model, but don't fail if it doesn't exist
  try {
    return (
      <>
        {/* Debug info */}
        <Html position={[0, 2, 0]} center>
          <div style={{
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '8px',
            borderRadius: '4px',
            fontSize: '12px',
            pointerEvents: 'none'
          }}>
            Model Status: {gltfScene ? 'Loaded' : 'Loading...'}
            <br />
            Progress Mode: {showProgress ? 'ON' : 'OFF'}
          </div>
        </Html>

        {/* GLB Model */}
        <Gltf
          ref={modelRef}
          src="/ashram.glb"
          scale={1}
          position={[0, 0, 0]}
          onLoad={handleModelLoad}
          onError={(error) => {
            console.warn('GLB model not found or failed to load:', error);
          }}
        />

        {/* Fallback colored box to demonstrate the effect */}
        {showProgress && (
          <mesh position={[1, 0, 0]}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="#4CAF50" opacity={0.8} transparent />
          </mesh>
        )}
      </>
    );
  } catch (error) {
    console.warn('GLB model not available:', error);
    return null;
  }
}

// Button component for toggling progress visualization
interface ProgressButtonProps {
  showProgress: boolean;
  onToggle: () => void;
}

function ProgressButton({ showProgress, onToggle }: ProgressButtonProps) {
  const { camera, size } = useThree();

  // Add a DOM button outside the canvas for better visibility
  useEffect(() => {
    // Create a button element
    const button = document.createElement('button');
    button.textContent = showProgress ? 'Hide Progress' : 'Show Progress';
    button.style.position = 'absolute';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.padding = '10px 20px';
    button.style.backgroundColor = showProgress ? '#4CAF50' : '#2196F3';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '8px';
    button.style.fontWeight = 'bold';
    button.style.fontSize = '16px';
    button.style.cursor = 'pointer';
    button.style.zIndex = '1000';
    button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';

    // Add click handler
    button.onclick = () => {
      console.log('Button clicked, toggling progress view');
      onToggle();
    };

    // Add to DOM
    document.body.appendChild(button);

    // Cleanup
    return () => {
      document.body.removeChild(button);
    };
  }, [showProgress, onToggle]);

  // Also keep the in-scene button as a fallback
  return (
    <Html
      position={[0, -1, 0]}
      wrapperClass="progress-button-wrapper"
      center
      distanceFactor={5}
      zIndexRange={[100, 0]}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          console.log('In-scene button clicked');
          onToggle();
        }}
        className="px-4 py-2 rounded-lg font-medium text-white shadow-lg transition-all duration-300 transform hover:scale-105"
        style={{
          backgroundColor: showProgress ? '#4CAF50' : '#2196F3',
          border: 'none',
          cursor: 'pointer',
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        {showProgress ? 'Hide Progress' : 'Show Progress'}
      </button>
    </Html>
  );
}
