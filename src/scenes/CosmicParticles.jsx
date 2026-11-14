import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CosmicParticles({ count = 1800 }) {
  const particlesRef = useRef();
  const sunRaysRef = useRef();

  // Floating cosmic dust across the solar ecliptic plane
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#42D9FF'), // Cyan
      new THREE.Color('#FFB347'), // Solar Gold
      new THREE.Color('#A78BFA'), // Soft Purple
      new THREE.Color('#FFFFFF'), // Pure White
      new THREE.Color('#38BDF8'), // Sky Blue
    ];

    for (let i = 0; i < count; i++) {
      const rad = 8 + Math.random() * 230;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 45;

      pos[i * 3] = Math.cos(angle) * rad;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * rad;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  // Slow drift and particle breathing
  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.0025;
      const time = state.clock.getElapsedTime();
      // Wave motion on dust
      const positionsAttr = particlesRef.current.geometry.attributes.position;
      const array = positionsAttr.array;
      for (let i = 0; i < count; i += 8) {
        array[i * 3 + 1] += Math.sin(time * 0.5 + array[i * 3]) * 0.015;
      }
      positionsAttr.needsUpdate = true;
    }

    if (sunRaysRef.current) {
      const time = state.clock.getElapsedTime();
      sunRaysRef.current.rotation.z += delta * 0.008;
      // Gentle pulsing of solar light rays
      sunRaysRef.current.scale.setScalar(1.0 + Math.sin(time * 0.8) * 0.04);
    }
  });

  return (
    <group>
      {/* 1. Ecliptic Dust Points */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={1.1}
          vertexColors
          transparent
          opacity={0.45}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 2. Subtle Solar God Rays Veil around Sun */}
      <mesh ref={sunRaysRef} position={[0, 0, 0]}>
        <ringGeometry args={[8.8, 48, 64]} />
        <meshBasicMaterial
          color="#FFB347"
          transparent
          opacity={0.035}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

