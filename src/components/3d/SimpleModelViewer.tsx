import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Button } from '@/components/ui/button';
import { RotateCcw, ZoomIn, ZoomOut, RotateCw, Move3D, Home } from 'lucide-react';

interface SimpleModelViewerProps {
  modelPath: string;
  title?: string;
  description?: string;
  className?: string;
}

const SimpleModelViewer: React.FC<SimpleModelViewerProps> = ({
  modelPath,
  title = "3D Model",
  description,
  className = ""
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
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

    // Load model
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        
        // Center and scale the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Scale model to fit in view
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3 / maxDim;
        model.scale.setScalar(scale);
        
        // Center the model
        model.position.sub(center.multiplyScalar(scale));
        
        scene.add(model);
        modelRef.current = model;
        setIsLoading(false);
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error('Error loading model:', error);
        setHasError(true);
        setIsLoading(false);
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
  }, [modelPath]);

  // Update auto-rotate
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

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
            <p className="text-sm text-gray-500">Please check if the model file exists and is accessible.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-indian-saffron/30 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-indian-cream to-white border-b border-indian-saffron/30">
        <h3 className="text-xl font-heading font-semibold mb-2">{title}</h3>
        {description && <p className="text-gray-600 text-sm">{description}</p>}
      </div>

      {/* 3D Viewer */}
      <div className="relative">
        <div 
          ref={mountRef} 
          className="h-96 bg-gradient-to-br from-gray-50 to-gray-100"
          style={{ width: '100%', height: '384px' }}
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

        {/* Control buttons */}
        {!isLoading && !hasError && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex flex-wrap justify-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg p-3 border border-indian-saffron/30">
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
                <span className="hidden sm:inline ml-1">Reset</span>
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
