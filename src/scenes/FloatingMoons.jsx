import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  getMoonTexture,
  getIcyMoonTexture,
  getTitanTexture,
  getCallistoTexture,
  getIoTexture,
} from '../utils/textureGenerators';

/**
 * FloatingMoons
 * Photorealistic 3D Moons suspended in the deep-space cosmic background.
 * True spherical geometry (64x64 segments - ZERO square edges or box artifacts).
 * Naturally illuminated by the central Sun with realistic crescent phases and craters.
 */
export default function FloatingMoons() {
  const moonGroupRef = useRef();
  const moonMeshRefs = useRef([]);

  // High-Resolution Procedural Moon Textures
  const lunaTex = useMemo(() => getMoonTexture(), []);
  const icyTex = useMemo(() => getIcyMoonTexture(), []);
  const titanTex = useMemo(() => getTitanTexture(), []);
  const callistoTex = useMemo(() => getCallistoTexture(), []);
  const ioTex = useMemo(() => getIoTexture(), []);

  // 9 Majestic Moons Distributed across the Deep-Space Background
  const moons = useMemo(
    () => [
      // 1. Earth's Moon (Luna) - Upper Mid-Space
      {
        id: 'luna',
        name: 'The Moon (Luna)',
        basePos: [88, 30, -95],
        radius: 3.4,
        texture: lunaTex,
        roughness: 0.88,
        metalness: 0.05,
        color: '#E2E8F0',
        rotSpeed: 0.015,
        driftSpeed: 0.018,
        driftRadius: 3.5,
        hasAtmosphere: false,
      },
      // 2. Europa (Jupiter's Ice Moon) - Lower Right Space
      {
        id: 'europa',
        name: 'Europa',
        basePos: [138, -26, -115],
        radius: 2.8,
        texture: icyTex,
        roughness: 0.35,
        metalness: 0.15,
        color: '#F0F9FF',
        rotSpeed: 0.02,
        driftSpeed: 0.014,
        driftRadius: 4.0,
        hasAtmosphere: false,
      },
      // 3. Ganymede (Largest Moon in Solar System) - Deep Upper Right
      {
        id: 'ganymede',
        name: 'Ganymede',
        basePos: [168, 36, -150],
        radius: 4.4,
        texture: lunaTex,
        roughness: 0.8,
        metalness: 0.1,
        color: '#CBD5E1',
        rotSpeed: 0.012,
        driftSpeed: 0.01,
        driftRadius: 5.0,
        hasAtmosphere: false,
      },
      // 4. Titan (Saturn's Golden Giant) - Mid-Right Background
      {
        id: 'titan',
        name: 'Titan',
        basePos: [186, -18, -135],
        radius: 3.8,
        texture: titanTex,
        roughness: 0.65,
        metalness: 0.08,
        color: '#FBBF24',
        rotSpeed: 0.016,
        driftSpeed: 0.012,
        driftRadius: 4.2,
        hasAtmosphere: true,
        atmoColor: '#F59E0B',
      },
      // 5. Callisto (Ancient Multi-Cratered Ice/Rock World) - Deep Cosmic Depth
      {
        id: 'callisto',
        name: 'Callisto',
        basePos: [114, 44, -175],
        radius: 3.6,
        texture: callistoTex,
        roughness: 0.85,
        metalness: 0.05,
        color: '#94A3B8',
        rotSpeed: 0.014,
        driftSpeed: 0.015,
        driftRadius: 3.8,
        hasAtmosphere: false,
      },
      // 6. Io (Jupiter's Volcanic Moon) - Vibrant Sulfur Caldeiras
      {
        id: 'io',
        name: 'Io',
        basePos: [128, -36, -85],
        radius: 2.9,
        texture: ioTex,
        roughness: 0.75,
        metalness: 0.12,
        color: '#FDE047',
        rotSpeed: 0.024,
        driftSpeed: 0.02,
        driftRadius: 3.2,
        hasAtmosphere: false,
      },
      // 7. Enceladus (Gleaming Ice World) - Distant Saturnian Satellite
      {
        id: 'enceladus',
        name: 'Enceladus',
        basePos: [208, 28, -110],
        radius: 2.3,
        texture: icyTex,
        roughness: 0.25,
        metalness: 0.2,
        color: '#FFFFFF',
        rotSpeed: 0.028,
        driftSpeed: 0.016,
        driftRadius: 3.0,
        hasAtmosphere: false,
      },
      // 8. Triton (Neptune's Retrograde Ice Moon) - Deep Outer Edge
      {
        id: 'triton',
        name: 'Triton',
        basePos: [238, -16, -165],
        radius: 3.2,
        texture: icyTex,
        roughness: 0.45,
        metalness: 0.1,
        color: '#BAE6FD',
        rotSpeed: -0.018,
        driftSpeed: -0.012,
        driftRadius: 4.5,
        hasAtmosphere: false,
      },
      // 9. Celestial Moonlet - Left Deep Space (Balances Composition)
      {
        id: 'moonlet-left',
        name: 'Selene-IX',
        basePos: [-96, 36, -160],
        radius: 3.0,
        texture: lunaTex,
        roughness: 0.85,
        metalness: 0.05,
        color: '#E2E8F0',
        rotSpeed: 0.015,
        driftSpeed: 0.014,
        driftRadius: 3.6,
        hasAtmosphere: false,
      },
    ],
    [lunaTex, icyTex, titanTex, callistoTex, ioTex]
  );

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    moons.forEach((m, idx) => {
      const mesh = moonMeshRefs.current[idx];
      if (!mesh) return;

      // Slow, majestic background orbital drift
      const angle = time * m.driftSpeed + idx * 1.8;
      const x = m.basePos[0] + Math.cos(angle) * m.driftRadius;
      const y = m.basePos[1] + Math.sin(angle * 1.1) * (m.driftRadius * 0.4);
      const z = m.basePos[2] + Math.sin(angle) * (m.driftRadius * 0.6);

      mesh.position.set(x, y, z);
      // Gentle axial rotation revealing cratered topography
      mesh.rotation.y += delta * m.rotSpeed;
    });
  });

  return (
    <group ref={moonGroupRef} name="floating-background-moons">
      {moons.map((m, idx) => (
        <group key={m.id} ref={(el) => (moonMeshRefs.current[idx] = el)}>
          {/* Main 100% Spherical Moon Mesh (64x64 segments - no square edges) */}
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[m.radius, 64, 64]} />
            <meshStandardMaterial
              map={m.texture}
              color={m.color}
              roughness={m.roughness}
              metalness={m.metalness}
            />
          </mesh>

          {/* Soft Atmospheric Rim Glow (for atmospheric moons like Titan) */}
          {m.hasAtmosphere && (
            <mesh scale={1.08}>
              <sphereGeometry args={[m.radius, 32, 32]} />
              <meshBasicMaterial
                color={m.atmoColor || '#F59E0B'}
                transparent
                opacity={0.22}
                blending={THREE.AdditiveBlending}
                side={THREE.BackSide}
              />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}
