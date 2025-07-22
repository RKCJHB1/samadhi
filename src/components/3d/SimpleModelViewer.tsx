import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Button } from '@/components/ui/button';
import { RotateCcw, ZoomIn, ZoomOut, RotateCw, Move3D, Home, Play, Square, Maximize, Minimize } from 'lucide-react';

interface Block {
  block_id: number;
  pos_x: number;
  pos_y: number;
  pos_z: number;
  status: 'available' | 'sold';
  owner_name?: string;
}

interface SimpleModelViewerProps {
  modelPath: string;
  title?: string;
  description?: string;
  className?: string;
  blockData?: Block[];
  soldBlocks?: Set<number>;
  showBlocks?: boolean;
  visibleBlocks?: Block[];
  isAnimating?: boolean;
  onStartAnimation?: () => void;
  onStopAnimation?: () => void;
  onResetAnimation?: () => void;
}

// Fallback building function removed - only using GLB model

const SimpleModelViewer: React.FC<SimpleModelViewerProps> = ({
  modelPath,
  title = "3D Model",
  description,
  className = "",
  blockData = [],
  soldBlocks = new Set(),
  showBlocks = false,
  visibleBlocks = [],
  isAnimating = false,
  onStartAnimation,
  onStopAnimation,
  onResetAnimation
}) => {
  // IMMEDIATE logging to see what props we're getting
  console.log('🚀 SimpleModelViewer render with props:', {
    blockDataLength: blockData.length,
    soldBlocksSize: soldBlocks.size,
    showBlocks: showBlocks,
    visibleBlocksLength: visibleBlocks.length,
    isAnimating: isAnimating
  });
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [autoRotate, setAutoRotate] = useState(false);
  const [animationActive, setAnimationActive] = useState(false);
  const [visibleBlockCount, setVisibleBlockCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dynamicallySoldBlocks, setDynamicallySoldBlocks] = useState<Set<number>>(new Set());
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('🎬 SimpleModelViewer useEffect starting!');
    console.log('📊 Props:', { modelPath, blockDataLength: blockData.length, soldBlocksSize: soldBlocks.size, showBlocks });

    if (!mountRef.current) {
      console.log('❌ No mount ref, returning early');
      return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // BLACK background so we can see points
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 5, 5);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 2;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.3);
    pointLight.position.set(-10, -10, -10);
    scene.add(pointLight);

    // Test Three.js basic functionality first
    console.log('Three.js version:', THREE.REVISION);
    console.log('GLTFLoader available:', typeof GLTFLoader);

    // Test if file is accessible first
    console.log('Starting file accessibility test...');
    fetch(modelPath, { method: 'HEAD' }) // Use HEAD to check without downloading
      .then(response => {
        console.log('File accessibility test:', response.status, response.statusText);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const contentLength = response.headers.get('content-length');
        console.log('File accessible, size:', contentLength, 'bytes');

        // If file is very large, warn about potential loading issues
        if (contentLength && parseInt(contentLength) > 10000000) { // 10MB
          console.warn('Large file detected:', contentLength, 'bytes - this may take time to load');
        }
      })
      .catch(error => {
        console.error('File accessibility test failed:', error);
        setErrorMessage(`File access failed: ${error.message}`);

        // No fallback building - just show error message
        console.log('File access failed - no fallback building will be created');

        setIsLoading(false);
        return;
      });

    // Reference building removed - only show the actual GLB model

    // Load model with timeout
    const loader = new GLTFLoader();
    console.log(`Attempting to load model from: ${modelPath}`);

    // Set a timeout for model loading
    const loadingTimeout = setTimeout(() => {
      console.warn('Model loading timeout after 15 seconds');
      setErrorMessage('Model loading timeout - file may be too large or corrupted');

      // No fallback building on timeout - just show error
      console.log('Model loading timeout - no fallback building will be created');

      setIsLoading(false);
    }, 15000); // 15 second timeout

    loader.load(
      modelPath,
      (gltf) => {
        clearTimeout(loadingTimeout); // Clear the timeout
        console.log('Model loaded successfully:', gltf);
        const model = gltf.scene;

        // Get ORIGINAL model bounds BEFORE any transformation
        const originalBox = new THREE.Box3().setFromObject(model);
        const originalCenter = originalBox.getCenter(new THREE.Vector3());
        const originalSize = originalBox.getSize(new THREE.Vector3());

        console.log('🏗️ ORIGINAL model bounds (before transformation):', {
          min: originalBox.min.toArray(),
          max: originalBox.max.toArray(),
          center: originalCenter.toArray(),
          size: originalSize.toArray()
        });

        // Scale model to fit in view (for display only)
        const maxDim = Math.max(originalSize.x, originalSize.y, originalSize.z);
        const displayScale = 3 / maxDim;
        model.scale.setScalar(displayScale);

        // Center the model (for display only)
        model.position.sub(originalCenter.clone().multiplyScalar(displayScale));

        // Store ORIGINAL bounds for block positioning (not the transformed bounds)
        const modelBounds = {
          originalBox,
          originalCenter: originalCenter.clone(),
          originalSize: originalSize.clone(),
          displayScale
        };
        (model as any).modelBounds = modelBounds;

        console.log('📐 Model display transformation:', {
          originalCenter: originalCenter.toArray(),
          originalSize: originalSize.toArray(),
          displayScale: displayScale,
          finalPosition: model.position.toArray(),
          finalScale: model.scale.toArray()
        });

        // Set model to normal (full) opacity
        model.traverse((child: any) => {
          if (child.isMesh) {
            // Store original material properties
            child.userData.originalMaterial = {
              color: child.material.color.clone(),
              opacity: child.material.opacity,
              transparent: child.material.transparent,
              emissive: child.material.emissive.clone(),
              emissiveIntensity: child.material.emissiveIntensity
            };

            // Set to full opacity (normal appearance)
            child.material.transparent = false;
            child.material.opacity = 1.0;
            child.material.needsUpdate = true;
          }
        });

        scene.add(model);
        modelRef.current = model;

        // Only showing the 3D model - no test cubes or blocks

        setIsLoading(false);
      },
      (progress) => {
        const percent = progress.total > 0 ? (progress.loaded / progress.total * 100).toFixed(1) : 'unknown';
        console.log(`Loading progress: ${percent}% (${progress.loaded}/${progress.total} bytes)`);

        // Log detailed progress for debugging
        if (progress.loaded === 0) {
          console.log('Starting download...');
        } else if (progress.loaded === progress.total) {
          console.log('Download complete, parsing model...');
        }
      },
      (error) => {
        clearTimeout(loadingTimeout); // Clear the timeout
        console.error('Error loading model:', error);
        console.error('Model path attempted:', modelPath);
        console.error('Error details:', {
          message: error.message,
          type: error.type,
          target: error.target
        });
        const errorMsg = `Failed to load model: ${error.message || 'Unknown error'}`;
        console.error('Full error object:', error);
        setErrorMessage(errorMsg);

        // No fallback building on error - just show error message
        console.log('Model loading error - no fallback building will be created');

        setIsLoading(false);
        // Don't set hasError to true so the scene still renders
      }
    );

    // Add renderer to DOM
    mountRef.current.appendChild(renderer.domElement);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (autoRotate && modelRef.current) {
        modelRef.current.rotation.y += 0.01;
      }
      
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelPath, blockData, soldBlocks, showBlocks]);

  // Block auto-creation disabled - showing only the 3D model

  // Function to simulate a block sale
  const simulateBlockSale = () => {
    if (blockData.length === 0) {
      console.log('No block data available for simulation');
      return;
    }

    // Find an available block (not already sold)
    const allSoldBlocks = new Set([...soldBlocks, ...dynamicallySoldBlocks]);
    const availableBlocks = blockData.filter(block => !allSoldBlocks.has(block.block_id));

    if (availableBlocks.length === 0) {
      console.log('All blocks are already sold!');
      return;
    }

    // Pick a random available block
    const randomBlock = availableBlocks[Math.floor(Math.random() * availableBlocks.length)];

    // Add it to dynamically sold blocks
    setDynamicallySoldBlocks(prev => new Set([...prev, randomBlock.block_id]));

    console.log(`🎉 Simulated sale of block ${randomBlock.block_id} at position (${randomBlock.pos_x}, ${randomBlock.pos_y}, ${randomBlock.pos_z})`);
    console.log(`💰 Total sold blocks: ${allSoldBlocks.size + 1} of ${blockData.length}`);
  };

  // Function to zoom camera to point clouds
  const findPointClouds = () => {
    if (!cameraRef.current || !controlsRef.current) {
      console.log('No camera or controls available');
      return;
    }

    console.log('🔍 Moving camera to see point clouds...');

    // Position camera to see both model and point clouds
    cameraRef.current.position.set(15, 10, 15);
    controlsRef.current.target.set(5, 0, 0); // Look between model and first point cloud
    controlsRef.current.update();

    console.log('📷 Camera positioned at (15, 10, 15) looking at (5, 0, 0)');
    console.log('🔍 You should now see: Model + Blue cube at origin + Red point clouds at X=0, X=20, X=40');
  };

  // Function to create the actual blocks from CSV data
  const forceCreateBlocks = () => {
    try {
      if (!sceneRef.current) {
        return;
      }

      // Remove any existing test cubes
      const existingTestCubes = sceneRef.current.children.filter(child =>
        child.userData.isForceTestCube || child.userData.isCSVTestCube
      );
      existingTestCubes.forEach(cube => sceneRef.current!.remove(cube));

      if (blockData.length > 0) {
        // Create the actual blocks using the same function as the working system
        const allSoldBlocks = new Set([...soldBlocks, ...dynamicallySoldBlocks]);
        const blocksGroup = createSimpleBlocksGroup(blockData, allSoldBlocks);
        sceneRef.current.add(blocksGroup);

        console.log(`✅ Created ${blocksGroup.children.length} actual blocks from CSV data`);
        console.log('First few blocks:', blockData.slice(0, 3));
      } else {
        console.log('❌ No CSV data available for block creation');
      }

    } catch (error) {
      console.error('❌ Error in forceCreateBlocks:', error);
    }
  };

  // POINT CLOUD: Show CSV coordinates as tiny dots
  const createSimpleBlocksGroup = (blocks: Block[], soldBlockIds: Set<number>) => {
    console.log(`🎯 POINT CLOUD: Creating dots from ${blocks.length} CSV coordinates`);

    try {
      const blocksGroup = new THREE.Group();
      blocksGroup.name = 'BlocksGroup';
      blocksGroup.userData.isVoxelMesh = true;

      if (blocks.length === 0) {
        console.log('❌ No blocks to display');
        return blocksGroup;
      }

      // Get CSV coordinate ranges
      const xCoords = blocks.map(b => b.pos_x);
      const yCoords = blocks.map(b => b.pos_y);
      const zCoords = blocks.map(b => b.pos_z);

      const csvBounds = {
        x: { min: Math.min(...xCoords), max: Math.max(...xCoords) },
        y: { min: Math.min(...yCoords), max: Math.max(...yCoords) },
        z: { min: Math.min(...zCoords), max: Math.max(...zCoords) }
      };

      console.log('📊 CSV COORDINATE RANGES:', csvBounds);
      console.log('📊 CSV RANGES SIZE:', {
        x: csvBounds.x.max - csvBounds.x.min,
        y: csvBounds.y.max - csvBounds.y.min,
        z: csvBounds.z.max - csvBounds.z.min
      });

      // FIRST: Add test cubes at KNOWN visible positions
      console.log('🧪 Adding test cubes at known positions...');
      const testPositions = [
        { pos: [0, 0, 0], color: 0xff0000, label: 'Origin' },
        { pos: [1, 0, 0], color: 0x00ff00, label: 'X=1' },
        { pos: [0, 1, 0], color: 0x0000ff, label: 'Y=1' },
        { pos: [0, 0, 1], color: 0xffff00, label: 'Z=1' },
        { pos: [5, 5, 5], color: 0xff00ff, label: 'Corner' }
      ];

      testPositions.forEach((test, i) => {
        const testCube = new THREE.Mesh(
          new THREE.BoxGeometry(0.5, 0.5, 0.5),
          new THREE.MeshBasicMaterial({ color: test.color })
        );
        testCube.position.set(test.pos[0], test.pos[1], test.pos[2]);
        blocksGroup.add(testCube);
        console.log(`✅ Test cube ${test.label} at (${test.pos[0]}, ${test.pos[1]}, ${test.pos[2]})`);
      });

      // Create visible blocks from CSV data - MUCH LARGER and easier to see
      const maxBlocks = Math.min(100, blocks.length); // Show first 100 blocks
      console.log(`Creating ${maxBlocks} LARGE visible blocks from CSV data...`);

      blocks.slice(0, maxBlocks).forEach((block, i) => {
        // Create a LARGE cube for each block
        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // Much larger!
        const isSold = soldBlockIds.has(block.id);
        const cubeMaterial = new THREE.MeshBasicMaterial({
          color: isSold ? 0x00ff00 : 0x00ffff, // Green if sold, cyan if available
          wireframe: false,
          transparent: true,
          opacity: isSold ? 1.0 : 0.7
        });
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

        // Position using CSV coordinates directly (no scaling)
        cube.position.set(
          block.pos_x,
          block.pos_y + 10, // Lift them up so they're visible
          block.pos_z
        );

        blocksGroup.add(cube);

        // Log first few positions
        if (i < 5) {
          console.log(`Block ${i}: CSV(${block.pos_x}, ${block.pos_y}, ${block.pos_z}) -> 3D(${cube.position.x}, ${cube.position.y}, ${cube.position.z}) - ${isSold ? 'SOLD' : 'AVAILABLE'}`);
        }
      });

      console.log(`✅ Created ${maxBlocks} large blocks from CSV data`);

      // Add HUGE reference cube at origin
      const originCube = new THREE.Mesh(
        new THREE.BoxGeometry(3, 3, 3),
        new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true })
      );
      originCube.position.set(0, 0, 0);
      blocksGroup.add(originCube);
      console.log('Added HUGE BLUE wireframe cube at origin (0,0,0)');

      // Add text labels (using simple cubes as markers)
      const labelColors = [0xff0000, 0x00ff00, 0xffff00]; // Red, Green, Yellow
      const labelNames = ['Scale 0.001', 'Scale 0.01', 'Scale 0.1'];

      labelColors.forEach((color, i) => {
        const labelCube = new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshBasicMaterial({ color: color })
        );
        labelCube.position.set(i * 20, 5, 0); // Above each point cloud
        blocksGroup.add(labelCube);
        console.log(`Added ${labelNames[i]} marker at X=${i * 20}, Y=5`);
      });

      console.log(`✅ Created 3 point clouds + reference cube. Look for red/green dot clouds!`);
      return blocksGroup;

    } catch (error) {
      console.error('❌ Error creating point cloud:', error);
      return new THREE.Group();
    }
  };

  // Simple function for backward compatibility
  const applyVoxelOpacity = (scene: THREE.Scene, blocks: Block[], soldBlockIds: Set<number>, model?: THREE.Group) => {
    console.log(`🎯 Simple voxel mapping: ${blocks.length} blocks`);

    if (!model || blocks.length === 0) {
      console.log('❌ No model or voxel data available');
      return;
    }

    const blocksGroup = createSimpleBlocksGroup(blocks, soldBlockIds);
    scene.add(blocksGroup);
    console.log(`✅ Added simple blocks group to scene`);

    return;
  };

  // Function to start block animation
  const startBlockAnimation = () => {
    console.log('Starting block animation...');

    if (!sceneRef.current) {
      console.log('No scene reference');
      return;
    }

    if (animationActive) {
      console.log('Animation already active');
      return;
    }

    const blockMeshes = (sceneRef.current as any).blockMeshes;
    console.log('Block meshes found:', blockMeshes ? blockMeshes.length : 'none');

    if (!blockMeshes || blockMeshes.length === 0) {
      console.log('No block meshes available for animation');
      return;
    }

    setAnimationActive(true);
    setVisibleBlockCount(0);

    let currentIndex = 0;
    const totalBlocks = blockMeshes.length;
    console.log(`Starting animation with ${totalBlocks} blocks`);

    // Show blocks progressively (10 blocks every 50ms for smooth animation)
    const showNextBatch = () => {
      const batchSize = 10;
      const endIndex = Math.min(currentIndex + batchSize, totalBlocks);

      for (let i = currentIndex; i < endIndex; i++) {
        if (blockMeshes[i]) {
          blockMeshes[i].visible = true;
        }
      }

      currentIndex = endIndex;
      setVisibleBlockCount(currentIndex);

      if (currentIndex < totalBlocks) {
        animationRef.current = setTimeout(showNextBatch, 50); // 50ms between batches
      } else {
        setAnimationActive(false);
        console.log('Block animation complete!');
      }
    };

    showNextBatch();
  };

  // Function to reset animation
  const resetAnimation = () => {
    console.log('Resetting animation...');

    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
      console.log('Cleared animation timeout');
    }

    if (sceneRef.current) {
      const blockMeshes = (sceneRef.current as any).blockMeshes;
      console.log('Block meshes for reset:', blockMeshes ? blockMeshes.length : 'none');

      if (blockMeshes) {
        blockMeshes.forEach((mesh: THREE.Mesh, index: number) => {
          mesh.visible = false;
        });
        console.log('All blocks hidden');
      }
    }

    setAnimationActive(false);
    setVisibleBlockCount(0);
    console.log('Reset complete');
  };

  // Fullscreen functionality
  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);

      // Resize renderer when entering/exiting fullscreen
      if (rendererRef.current && cameraRef.current && containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Update auto-rotate
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  // Handle progress visualization
  useEffect(() => {
    if (!modelRef.current) return;

    console.log('Updating model materials for progress visualization:', showProgress);
    let updatedCount = 0;
    let totalMeshes = 0;

    modelRef.current.traverse((child: any) => {
      if (child.isMesh) {
        totalMeshes++;

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
        } else {
          // Reset to default normal material
          if (child.userData.originalMaterial) {
            child.material.color.copy(child.userData.originalMaterial.color);
          } else {
            child.material.color.set(0xcccccc); // Light gray fallback
          }
          child.material.opacity = 1.0; // Full opacity (normal)
          child.material.transparent = false;
          child.material.emissive.set(0x000000); // No glow
          child.material.emissiveIntensity = 0;
        }

        // Ensure material updates are applied
        child.material.needsUpdate = true;
      }
    });

    console.log(`Updated ${updatedCount} of ${totalMeshes} meshes for progress visualization`);
  }, [showProgress]);

  // Control functions
  const handleZoomIn = () => {
    if (cameraRef.current) {
      cameraRef.current.position.multiplyScalar(0.8);
    }
  };

  const handleZoomOut = () => {
    if (cameraRef.current) {
      cameraRef.current.position.multiplyScalar(1.2);
    }
  };

  const handleReset = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(5, 5, 5);
      controlsRef.current.reset();
    }
  };

  const handleRotateLeft = () => {
    if (modelRef.current) {
      modelRef.current.rotation.y += Math.PI / 8;
    }
  };

  const handleRotateRight = () => {
    if (modelRef.current) {
      modelRef.current.rotation.y -= Math.PI / 8;
    }
  };

  if (hasError) {
    return (
      <div className={`bg-white rounded-lg border border-indian-saffron/30 overflow-hidden ${className}`}>
        <div className="p-4 bg-gradient-to-r from-indian-cream to-white border-b border-indian-saffron/30">
          <h3 className="text-xl font-heading font-semibold mb-2">{title}</h3>
          {description && <p className="text-gray-600 text-sm">{description}</p>}
        </div>
        <div className="h-96 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">⚠️</div>
            <h4 className="text-lg font-semibold mb-2">Model Loading Error</h4>
            <p className="text-gray-600 mb-4">Unable to load the 3D model.</p>
            {errorMessage && (
              <p className="text-sm text-red-600 mb-2 font-mono bg-red-50 p-2 rounded">{errorMessage}</p>
            )}
            <p className="text-sm text-gray-500">Please check if the model file exists and is accessible.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`bg-white rounded-lg border border-indian-saffron/30 overflow-hidden ${className} ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
      }`}
    >
      {/* Header - always visible */}
      <div className={`p-4 bg-gradient-to-r from-indian-cream to-white border-b border-indian-saffron/30 ${
        isFullscreen ? 'relative z-10' : ''
      }`}>
        <h3 className="text-xl font-heading font-semibold mb-2">{title}</h3>
        {description && <p className="text-gray-600 text-sm">{description}</p>}
        {isFullscreen && (
          <div className="absolute top-4 right-4">
            <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              FULLSCREEN MODE
            </div>
          </div>
        )}
      </div>

      {/* 3D Viewer */}
      <div className="relative">
        <div
          ref={mountRef}
          className={`bg-gradient-to-br from-gray-50 to-gray-100 ${
            isFullscreen ? 'h-full' : 'h-96'
          }`}
          style={{
            width: '100%',
            height: isFullscreen ? '100vh' : '384px'
          }}
        />
        
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indian-saffron mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Loading 3D Model...</p>
            </div>
          </div>
        )}

        {/* Debug info overlay - REMOVED for full view */}

        {/* Control buttons - always visible */}
        {!isLoading && !hasError && (
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="flex flex-wrap justify-center gap-2 bg-white/95 backdrop-blur-md rounded-lg p-3 border border-indian-saffron/30 shadow-lg">


              {/* Camera Controls */}
              <Button size="sm" variant="outline" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
                <span className="hidden sm:inline ml-1">Zoom In</span>
              </Button>

              <Button size="sm" variant="outline" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
                <span className="hidden sm:inline ml-1">Zoom Out</span>
              </Button>

              <Button size="sm" variant="outline" onClick={handleRotateLeft}>
                <RotateCcw className="h-4 w-4" />
                <span className="hidden sm:inline ml-1">Rotate L</span>
              </Button>

              <Button size="sm" variant="outline" onClick={handleRotateRight}>
                <RotateCw className="h-4 w-4" />
                <span className="hidden sm:inline ml-1">Rotate R</span>
              </Button>

              <Button
                size="sm"
                variant={autoRotate ? "default" : "outline"}
                onClick={() => setAutoRotate(!autoRotate)}
              >
                <Move3D className="h-4 w-4" />
                <span className="hidden sm:inline ml-1">Auto</span>
              </Button>

              <Button size="sm" variant="outline" onClick={handleReset}>
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline ml-1">Reset View</span>
              </Button>

              {/* Progress Toggle Button */}
              <Button
                size="sm"
                variant={showProgress ? "default" : "outline"}
                onClick={() => setShowProgress(!showProgress)}
                className={showProgress ? "bg-green-600 hover:bg-green-700" : ""}
              >
                <span className="inline ml-1">
                  {showProgress ? "Hide Progress" : "Show Progress"}
                </span>
              </Button>

              {/* Test Block Sale Button */}
              <Button
                size="sm"
                variant="outline"
                onClick={() => simulateBlockSale()}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <span className="inline ml-1">
                  Simulate Sale
                </span>
              </Button>


              <Button
                size="sm"
                variant={isFullscreen ? "default" : "outline"}
                onClick={toggleFullscreen}
              >
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                <span className="hidden sm:inline ml-1">
                  {isFullscreen ? 'Exit' : 'Fullscreen'}
                </span>
              </Button>
            </div>
          </div>
        )}


      </div>

      {/* Instructions */}
      <div className="p-4 bg-gray-50 border-t border-indian-saffron/30">
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Mouse/Touch:</strong> Drag to rotate, scroll/pinch to zoom, right-drag to pan</p>
          <p><strong>Controls:</strong> Use the buttons above for easy navigation</p>
        </div>
      </div>
    </div>
  );
};

export default SimpleModelViewer;
