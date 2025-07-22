import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Block } from '../../hooks/useBlockData';
import { BlockTooltip } from './BlockTooltip';

interface BlocksInstancedMeshProps {
  blocks: Block[];
  soldBlocks: Set<number>;
  modelMatrixWorld: THREE.Matrix4;
}

export function BlocksInstancedMesh({ blocks, soldBlocks, modelMatrixWorld }: BlocksInstancedMeshProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const [hoveredInstance, setHoveredInstance] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<[number, number, number]>([0, 0, 0]);
  const { raycaster, camera, gl } = useThree();

  // Block size - adjust this to match your model scale
  const blockSize = 0.003; // This should match your Houdini Point Separation

  // Create geometry and materials
  const geometry = useMemo(() => {
    return new THREE.BoxGeometry(blockSize, blockSize, blockSize);
  }, [blockSize]);

  // Materials for different block states
  const materials = useMemo(() => {
    return {
      sold: new THREE.MeshStandardMaterial({
        color: 0xff6b35, // Orange color for sold blocks
        opacity: 1.0,
        transparent: false,
        metalness: 0.1,
        roughness: 0.7,
      }),
      available: new THREE.MeshStandardMaterial({
        color: 0x888888, // Gray color for available blocks
        opacity: 0.0, // Completely transparent
        transparent: true,
        visible: false, // Don't render at all for better performance
      }),
    };
  }, []);

  // Set up instanced mesh with positions and colors
  useEffect(() => {
    if (!meshRef.current || blocks.length === 0) return;

    const mesh = meshRef.current;
    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();
    const dummy = new THREE.Object3D();

    console.log(`Setting up ${blocks.length} block instances with model transformation...`);

    // Set up each instance
    blocks.forEach((block, index) => {
      // Set position using the CSV coordinates directly (they're already in model space)
      dummy.position.set(
        block.pos_x,
        block.pos_y,
        block.pos_z
      );

      // Apply the model's matrixWorld transformation to transform from local space to world space
      dummy.applyMatrix4(modelMatrixWorld);

      // Update the dummy's matrix and set it to the instance
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);

      // Set color and opacity based on sold status
      if (soldBlocks.has(block.block_id)) {
        // Sold block - fully opaque orange/red
        color.setHex(0xff4444); // Bright red for sold blocks
        color.multiplyScalar(1.0); // Full opacity
        mesh.setColorAt(index, color);
      } else {
        // Available block - completely transparent (invisible)
        color.setHex(0x000000);
        color.multiplyScalar(0.0); // Zero opacity = invisible
        mesh.setColorAt(index, color);
      }
    });

    // Update the instance matrices and colors
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }

    console.log(`Configured ${blocks.length} instances with model transformation, ${soldBlocks.size} visible (sold)`);
  }, [blocks, soldBlocks, blockSize, modelMatrixWorld]);

  // Handle mouse interactions
  const handlePointerMove = (event: any) => {
    if (!meshRef.current) return;

    // Update raycaster
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / gl.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / gl.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // Check intersection with instanced mesh
    const intersects = raycaster.intersectObject(meshRef.current);

    if (intersects.length > 0 && intersects[0].instanceId !== undefined) {
      const instanceId = intersects[0].instanceId;
      const block = blocks[instanceId];

      // Only show tooltip for sold blocks (visible blocks)
      if (block && soldBlocks.has(block.block_id)) {
        setHoveredInstance(instanceId);

        // Set tooltip position to the intersection point
        const intersectionPoint = intersects[0].point;
        setTooltipPosition([
          intersectionPoint.x,
          intersectionPoint.y + blockSize * 2, // Offset above the block
          intersectionPoint.z
        ]);

        // Change cursor to pointer
        gl.domElement.style.cursor = 'pointer';
      } else {
        setHoveredInstance(null);
        gl.domElement.style.cursor = 'default';
      }
    } else {
      setHoveredInstance(null);
      gl.domElement.style.cursor = 'default';
    }
  };

  const handleClick = (event: any) => {
    if (!meshRef.current || hoveredInstance === null) return;
    
    const block = blocks[hoveredInstance];
    if (block) {
      console.log('Clicked block:', block);
      // You can add click handling logic here
      // For example, show a modal with block details
    }
  };

  // Use a single material for all instances with proper transparency handling
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      vertexColors: true, // Enable per-instance coloring
      transparent: true,
      opacity: 1.0,
      alphaTest: 0.01, // Don't render pixels with alpha < 0.01
      side: THREE.FrontSide,
      metalness: 0.2,
      roughness: 0.6,
      emissive: 0x000000,
      emissiveIntensity: 0.1,
    });
  }, []);

  if (blocks.length === 0) {
    return null;
  }

  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[geometry, material, blocks.length]}
        onPointerMove={handlePointerMove}
        onClick={handleClick}
        frustumCulled={false} // Disable frustum culling for better performance with many instances
      />

      {/* Tooltip for hovered block */}
      {hoveredInstance !== null && blocks[hoveredInstance] && (
        <BlockTooltip
          block={blocks[hoveredInstance]}
          position={tooltipPosition}
          visible={true}
        />
      )}
    </>
  );
}
