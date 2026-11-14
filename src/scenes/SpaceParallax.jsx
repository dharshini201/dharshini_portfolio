import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * SpaceParallax coordinates realistic multi-layer depth response
 * based on camera position and viewport pointer.
 */
export default function SpaceParallax({ children, factor = 0.05, maxOffset = 18 }) {
  const groupRef = useRef();
  const { camera, pointer } = useThree();
  const currentOffset = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const dt = Math.min(delta, 0.1);

    // Calculate subtle parallax offset derived from camera X/Y and pointer
    const targetX = (camera.position.x * 0.03 + pointer.x * 8) * factor;
    const targetY = (camera.position.y * 0.03 + pointer.y * 5) * factor;

    // Clamp to prevent disorientation
    const clampedX = THREE.MathUtils.clamp(targetX, -maxOffset, maxOffset);
    const clampedY = THREE.MathUtils.clamp(targetY, -maxOffset, maxOffset);

    currentOffset.current.x = THREE.MathUtils.lerp(currentOffset.current.x, clampedX, dt * 2.0);
    currentOffset.current.y = THREE.MathUtils.lerp(currentOffset.current.y, clampedY, dt * 2.0);

    groupRef.current.position.x = currentOffset.current.x;
    groupRef.current.position.y = currentOffset.current.y;
  });

  return <group ref={groupRef}>{children}</group>;
}

