import React, { useRef, useEffect, useState } from 'react';

interface Simple3DViewerProps {
  modelPath: string;
  blockData: any[];
  soldBlocks: Set<number>;
}

export default function Simple3DViewer({ modelPath, blockData, soldBlocks }: Simple3DViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<string>('Initializing...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeViewer();
  }, [modelPath, blockData]);

  const initializeViewer = async () => {
    try {
      setStatus('Loading Three.js...');
      
      // Try to dynamically import Three.js
      const THREE = await import('three');
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
      
      setStatus('Setting up 3D scene...');
      
      if (!canvasRef.current) return;
      
      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f0f0);
      
      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        canvasRef.current.clientWidth / canvasRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.set(5, 5, 5);
      
      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ 
        canvas: canvasRef.current,
        antialias: true 
      });
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      
      // Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      
      // Lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(10, 10, 5);
      directionalLight.castShadow = true;
      scene.add(directionalLight);
      
      setStatus('Loading GLB model...');
      
      // Load the GLB model
      const loader = new GLTFLoader();
      loader.load(
        modelPath,
        (gltf) => {
          setStatus('Model loaded successfully!');
          
          // Add the model to the scene
          const model = gltf.scene;
          model.scale.setScalar(1);
          model.position.set(0, 0, 0);
          
          // Make the model semi-transparent
          model.traverse((child: any) => {
            if (child.isMesh) {
              child.material.transparent = true;
              child.material.opacity = 0.5;
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          
          scene.add(model);

          setStatus(`Model loaded! Rendering ${blockData.length} blocks...`);

          // Update the model's world matrix and add block visualization
          model.updateMatrixWorld(true);
          addBlockVisualization(scene, blockData, soldBlocks, THREE, model.matrixWorld);

          setStatus(`Ready! ${blockData.length} blocks, ${soldBlocks.size} sold`);
        },
        (progress) => {
          const percent = (progress.loaded / progress.total * 100).toFixed(1);
          setStatus(`Loading model... ${percent}%`);
        },
        (error) => {
          console.error('Error loading GLB model:', error);
          setError(`Failed to load model: ${error.message}`);
          setStatus('Error loading model');
        }
      );
      
      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();
      
      // Handle resize
      const handleResize = () => {
        if (!canvasRef.current) return;
        camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        renderer.dispose();
      };
      
    } catch (err) {
      console.error('Error initializing 3D viewer:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize 3D viewer');
      setStatus('Error');
    }
  };

  const addBlockVisualization = (scene: any, blocks: any[], soldBlockIds: Set<number>, THREE: any, modelMatrixWorld: any) => {
    // Create instanced geometry for blocks
    const blockGeometry = new THREE.BoxGeometry(0.02, 0.02, 0.02);

    // Materials for sold and available blocks
    const soldMaterial = new THREE.MeshLambertMaterial({
      color: 0xff4444,
      transparent: false,
      opacity: 1.0
    });

    const availableMaterial = new THREE.MeshLambertMaterial({
      color: 0x44ff44,
      transparent: true,
      opacity: 0.3
    });

    // Add blocks (sample first 1000 for performance)
    const sampleBlocks = blocks.slice(0, 1000);
    const dummy = new THREE.Object3D();

    sampleBlocks.forEach((block) => {
      const blockMesh = new THREE.Mesh(
        blockGeometry,
        soldBlockIds.has(block.block_id) ? soldMaterial : availableMaterial
      );

      // Set position using CSV coordinates directly (they're already in model space)
      dummy.position.set(
        block.pos_x,
        block.pos_y,
        block.pos_z
      );

      // Apply the model's matrixWorld transformation
      dummy.applyMatrix4(modelMatrixWorld);

      // Set the transformed position to the block mesh
      blockMesh.position.copy(dummy.position);

      scene.add(blockMesh);
    });
  };

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-red-50">
        <div className="text-center p-4">
          <div className="text-red-600 text-lg font-semibold mb-2">3D Viewer Error</div>
          <div className="text-red-500 text-sm">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative">
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      
      {/* Status overlay */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white px-3 py-2 rounded text-sm">
        {status}
      </div>
      
      {/* Controls info */}
      <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-3 py-2 rounded text-xs">
        Mouse: Rotate • Wheel: Zoom • Right-click: Pan
      </div>
    </div>
  );
}
