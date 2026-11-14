import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getStarSpriteTexture, getStarFlareTexture } from '../utils/textureGenerators';

export default function StarField({
  deepCount = 15000,
  midCount = 4200,
  brightCount = 380,
}) {
  const deepStarsRef = useRef();
  const midStarsRef = useRef();
  const brightStarsRef = useRef();

  // Circular star sprite texture (prevents WebGL square box artifacts)
  const starSprite = useMemo(() => getStarSpriteTexture(), []);
  const starFlare = useMemo(() => getStarFlareTexture(), []);

  // Astronomical spectral colors
  const spectralColors = useMemo(
    () => [
      new THREE.Color('#FFFFFF'), // Pure White
      new THREE.Color('#D8ECF8'), // Blue-White
      new THREE.Color('#BCE0FD'), // Light Blue
      new THREE.Color('#FFF4E8'), // Warm Cream
      new THREE.Color('#FFE2B7'), // Light Golden
      new THREE.Color('#FFC588'), // Amber
      new THREE.Color('#FFA67E'), // Red-Orange
    ],
    []
  );

  // 1. Ultra-Deep Star Sphere (Massive background field)
  const [deepPositions, deepColors] = useMemo(() => {
    const pos = new Float32Array(deepCount * 3);
    const col = new Float32Array(deepCount * 3);

    for (let i = 0; i < deepCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 600 + Math.random() * 950;

      const sinPhi = Math.sin(phi);
      pos[i * 3] = r * sinPhi * Math.cos(theta);
      pos[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const color = spectralColors[Math.floor(Math.random() * spectralColors.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return [pos, col];
  }, [deepCount, spectralColors]);

  // 2. Mid-Depth Stellar Field
  const [midPositions, midColors] = useMemo(() => {
    const pos = new Float32Array(midCount * 3);
    const col = new Float32Array(midCount * 3);

    for (let i = 0; i < midCount; i++) {
      const rad = 140 + Math.random() * 460;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 360;

      pos[i * 3] = Math.cos(angle) * rad;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * rad;

      const color = spectralColors[Math.floor(Math.random() * spectralColors.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return [pos, col];
  }, [midCount, spectralColors]);

  // 3. Bright Twinkling Beacon Stars
  const [brightPositions, brightColors] = useMemo(() => {
    const pos = new Float32Array(brightCount * 3);
    const col = new Float32Array(brightCount * 3);

    for (let i = 0; i < brightCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 280 + Math.random() * 600;

      const sinPhi = Math.sin(phi);
      pos[i * 3] = r * sinPhi * Math.cos(theta);
      pos[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const color = spectralColors[Math.floor(Math.random() * spectralColors.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return [pos, col];
  }, [brightCount, spectralColors]);

  // Gentle celestial rotation and star twinkling
  useFrame((state, delta) => {
    if (deepStarsRef.current) {
      deepStarsRef.current.rotation.y += delta * 0.0003;
    }
    if (midStarsRef.current) {
      midStarsRef.current.rotation.y += delta * 0.0007;
    }
    if (brightStarsRef.current) {
      brightStarsRef.current.rotation.y += delta * 0.0005;
      const time = state.clock.getElapsedTime();
      brightStarsRef.current.material.opacity = 0.8 + Math.sin(time * 2.0) * 0.18;
    }
  });

  return (
    <group>
      {/* 1. Ultra-Deep Star Field (Round Circular Star Sprites - Zero Square Boxes) */}
      <points ref={deepStarsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[deepPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[deepColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          map={starSprite}
          size={2.4}
          vertexColors
          transparent
          opacity={0.88}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 2. Mid-Depth Stellar Field (Smooth Circular Motes) */}
      <points ref={midStarsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[midPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[midColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          map={starSprite}
          size={3.4}
          vertexColors
          transparent
          opacity={0.82}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 3. Bright Twinkling Beacon Stars with 4-Point Starlight Diffraction Spikes */}
      <points ref={brightStarsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[brightPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[brightColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          map={starFlare}
          size={8.5}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
