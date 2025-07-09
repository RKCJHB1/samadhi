import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { RotateCcw, ZoomIn, ZoomOut, RotateCw, Move3D } from 'lucide-react';

// Error boundary for 3D components
class ModelErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('3D Model Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

interface ModelProps {
  url: string;
  autoRotate?: boolean;
}

function Model({ url, autoRotate = false }: ModelProps) {
  const meshRef = useRef<any>();

  try {
    const { scene } = useGLTF(url);

    useFrame((state, delta) => {
      if (meshRef.current && autoRotate) {
        meshRef.current.rotation.y += delta * 0.5;
      }
    });

    return <primitive ref={meshRef} object={scene} scale={1} />;
  } catch (error) {
    console.error('Error loading 3D model:', error);
    return (
      <Html center>
        <div className="text-center p-4">
          <p className="text-red-600">Error loading 3D model</p>
          <p className="text-sm text-gray-600">Please check if the model file exists</p>
        </div>
      </Html>
    );
  }
}

function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indian-saffron mb-2"></div>
        <p className="text-sm text-gray-600">Loading 3D Model...</p>
      </div>
    </Html>
  );
}

interface ModelViewerProps {
  modelPath: string;
  title?: string;
  description?: string;
  className?: string;
}

const ModelViewer: React.FC<ModelViewerProps> = ({
  modelPath,
  title = "3D Model",
  description,
  className = ""
}) => {
  const [autoRotate, setAutoRotate] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const controlsRef = useRef<any>();

  // Handle loading states
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timer);
  }, [isLoading]);

  // Touch-friendly controls
  const handleZoomIn = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyIn(0.8);
      controlsRef.current.update();
    }
  };

  const handleZoomOut = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyOut(0.8);
      controlsRef.current.update();
    }
  };

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const handleRotateLeft = () => {
    if (controlsRef.current) {
      controlsRef.current.rotateLeft(Math.PI / 8);
      controlsRef.current.update();
    }
  };

  const handleRotateRight = () => {
    if (controlsRef.current) {
      controlsRef.current.rotateLeft(-Math.PI / 8);
      controlsRef.current.update();
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!controlsRef.current) return;

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          controlsRef.current.rotateUp(-Math.PI / 16);
          break;
        case 'ArrowDown':
          event.preventDefault();
          controlsRef.current.rotateUp(Math.PI / 16);
          break;
        case 'ArrowLeft':
          event.preventDefault();
          controlsRef.current.rotateLeft(Math.PI / 16);
          break;
        case 'ArrowRight':
          event.preventDefault();
          controlsRef.current.rotateLeft(-Math.PI / 16);
          break;
        case '+':
        case '=':
          event.preventDefault();
          handleZoomIn();
          break;
        case '-':
          event.preventDefault();
          handleZoomOut();
          break;
        case 'r':
        case 'R':
          event.preventDefault();
          handleReset();
          break;
        case ' ':
          event.preventDefault();
          setAutoRotate(!autoRotate);
          break;
      }
      controlsRef.current.update();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [autoRotate]);

  const fallbackContent = (
    <div className={`bg-white rounded-lg border border-indian-saffron/30 overflow-hidden ${className}`}>
      <div className="p-4 bg-gradient-to-r from-indian-cream to-white border-b border-indian-saffron/30">
        <h3 className="text-xl font-heading font-semibold mb-2">{title}</h3>
        {description && (
          <p className="text-gray-600 text-sm">{description}</p>
        )}
      </div>
      <div className="h-96 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🏗️</div>
          <h4 className="text-lg font-semibold mb-2">3D Model Viewer</h4>
          <p className="text-gray-600 mb-4">The 3D model viewer is currently being prepared.</p>
          <p className="text-sm text-gray-500">Please check back later to explore the interactive ashram model.</p>
        </div>
      </div>
    </div>
  );

  return (
    <ModelErrorBoundary fallback={fallbackContent}>
      <div className={`bg-white rounded-lg border border-indian-saffron/30 overflow-hidden ${className}`}>
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-indian-cream to-white border-b border-indian-saffron/30">
          <h3 className="text-xl font-heading font-semibold mb-2">{title}</h3>
          {description && (
            <p className="text-gray-600 text-sm">{description}</p>
          )}
        </div>

        {/* 3D Viewer */}
        <div className="relative h-96 bg-gradient-to-br from-gray-50 to-gray-100">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}
          >
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />

            <Suspense fallback={<LoadingSpinner />}>
              <Model url={modelPath} autoRotate={autoRotate} />
              <Environment preset="studio" />
            </Suspense>

            <OrbitControls
              ref={controlsRef}
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              autoRotate={autoRotate}
              autoRotateSpeed={2}
              minDistance={2}
              maxDistance={20}
              enableDamping={true}
              dampingFactor={0.05}
            />
          </Canvas>

        {/* Touch-friendly control buttons */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex flex-wrap justify-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg p-3 border border-indian-saffron/30">
            <Button
              size="sm"
              variant="outline"
              onClick={handleZoomIn}
              className="flex items-center gap-1"
            >
              <ZoomIn className="h-4 w-4" />
              <span className="hidden sm:inline">Zoom In</span>
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={handleZoomOut}
              className="flex items-center gap-1"
            >
              <ZoomOut className="h-4 w-4" />
              <span className="hidden sm:inline">Zoom Out</span>
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={handleRotateLeft}
              className="flex items-center gap-1"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Rotate L</span>
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={handleRotateRight}
              className="flex items-center gap-1"
            >
              <RotateCw className="h-4 w-4" />
              <span className="hidden sm:inline">Rotate R</span>
            </Button>
            
            <Button
              size="sm"
              variant={autoRotate ? "default" : "outline"}
              onClick={() => setAutoRotate(!autoRotate)}
              className="flex items-center gap-1"
            >
              <Move3D className="h-4 w-4" />
              <span className="hidden sm:inline">Auto</span>
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={handleReset}
              className="flex items-center gap-1"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          </div>
        </div>
      </div>

        {/* Instructions */}
        <div className="p-4 bg-gray-50 border-t border-indian-saffron/30">
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Touch/Mouse:</strong> Drag to rotate, pinch/scroll to zoom, two-finger drag to pan</p>
            <p><strong>Keyboard:</strong> Arrow keys to rotate, +/- to zoom, R to reset, Space for auto-rotate</p>
          </div>
        </div>
      </div>
    </ModelErrorBoundary>
  );
};

export default ModelViewer;
