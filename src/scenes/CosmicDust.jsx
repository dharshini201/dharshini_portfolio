import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getStarSpriteTexture } from '../utils/textureGenerators';

export default function CosmicDust({ count = 2200 }) {
  const pointsRef = useRef();
  const glowingMotesRef = useRef();
  const starSprite = useMemo(() => getStarSpriteTexture(), []);

  // 1. Fine Cosmic Dust Particles
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#8155C7'), // Violet
      new THREE.Color('#63C8E8'), // Subtle Cyan
      new THREE.Color('#B65E9B'), // Nebula Pink
      new THREE.Color('#2876C8'), // Electric Blue
      new THREE.Color('#FFE2B7'), // Warm Starlight
    ];

    for (let i = 0; i < count; i++) {
      const rad = 15 + Math.random() * 240;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 60;
      const depth = (Math.random() - 0.5) * 80;

      pos[i * 3] = Math.cos(angle) * rad;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * rad + depth;

      const chosen = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }
    return [pos, col];
  }, [count]);

  // 2. Ionized Gas Micro-Motes
  const [glowingPos, glowingCol] = useMemo(() => {
    const gCount = 350;
    const pos = new Float32Array(gCount * 3);
    const col = new Float32Array(gCount * 3);

    const glowColors = [
      new THREE.Color('#B65E9B'),
      new THREE.Color('#63C8E8'),
      new THREE.Color('#A78BFA'),
    ];

    for (let i = 0; i < gCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 40 + Math.random() * 160;

      const sinPhi = Math.sin(phi);
      pos[i * 3] = r * sinPhi * Math.cos(theta);
      pos[i * 3 + 1] = (r * sinPhi * Math.sin(theta)) * 0.4;
      pos[i * 3 + 2] = r * Math.cos(phi) - 25;

      const c = glowColors[Math.floor(Math.random() * glowColors.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.0015;
      const posAttr = pointsRef.current.geometry.attributes.position;
      const arr = posAttr.array;
      for (let i = 0; i < count; i += 12) {
        arr[i * 3 + 1] += Math.sin(time * 0.4 + arr[i * 3] * 0.05) * 0.012;
      }
      posAttr.needsUpdate = true;
    }

    if (glowingMotesRef.current) {
      glowingMotesRef.current.rotation.y -= delta * 0.001;
      glowingMotesRef.current.material.opacity = 0.55 + Math.sin(time * 1.5) * 0.15;
    }
  });

  return (
    <group>
      {/* Round Circular Fine Dust (No Square Pixels) */}
      <points ref={pointsRef}>
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
          map={starSprite}
          size={2.4}
          vertexColors
          transparent
          opacity={0.42}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Round Circular Glowing Motes */}
      <points ref={glowingMotesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[glowingPos, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[glowingCol, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          map={starSprite}
          size={4.2}
          vertexColors
          transparent
          opacity={0.65}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
