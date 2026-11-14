import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getSunTexture } from '../utils/textureGenerators';

export default function Sun({ radius = 7.2, onSelect }) {
  const meshRef = useRef();
  const coronaRef = useRef();
  const flareRef = useRef();

  const texture = useMemo(() => getSunTexture(), []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.y -= delta * 0.02;
      coronaRef.current.rotation.z += delta * 0.015;
    }
    if (flareRef.current) {
      const time = state.clock.getElapsedTime();
      const scale = 1.05 + Math.sin(time * 2.5) * 0.025;
      flareRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={[0, 0, 0]} onClick={onSelect} className="cursor-pointer">
      {/* Primary Solar Core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshBasicMaterial
          map={texture}
          color="#FFE0A0"
        />
      </mesh>

      {/* Internal Solar Atmosphere / Corona */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[radius * 1.08, 48, 48]} />
        <meshBasicMaterial
          color="#FF7700"
          transparent
          opacity={0.32}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer Solar Flare Shell */}
      <mesh ref={flareRef}>
        <sphereGeometry args={[radius * 1.18, 32, 32]} />
        <meshBasicMaterial
          color="#FF9900"
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Soft Giant Sun Corona Glow */}
      <mesh>
        <sphereGeometry args={[radius * 1.5, 32, 32]} />
        <meshBasicMaterial
          color="#FF5500"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Illuminating Solar Point Light */}
      <pointLight
        color="#FFF4D0"
        intensity={2.8}
        distance={450}
        decay={1.2}
      />
      <pointLight
        color="#FFAA33"
        intensity={1.2}
        distance={120}
        decay={1.8}
      />
    </group>
  );
}

