import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getStarSpriteTexture, getStarFlareTexture, getRadialNebulaTexture } from '../utils/textureGenerators';

/**
 * StarClusters
 * Photorealistic open & globular star clusters (e.g. Pleiades, Hyades, Omega Centauri)
 * 100% spherical geometry and circular soft starlight sprites.
 */
export default function StarClusters() {
  const clusterGroupRef = useRef();
  const starSprite = useMemo(() => getStarSpriteTexture(), []);
  const starFlare = useMemo(() => getStarFlareTexture(), []);
  const pleiadesGlow = useMemo(() => getRadialNebulaTexture('#42D9FF'), []);
  const hyadesGlow = useMemo(() => getRadialNebulaTexture('#FFB347'), []);

  // Generate 3 Distinct Deep-Space Star Clusters
  const [clusterPositions, clusterColors, clusterSizes] = useMemo(() => {
    const clusters = [
      // 1. Pleiades (Seven Sisters) - Blue Reflection Cluster
      {
        center: [150, 95, -310],
        count: 550,
        radius: 38,
        colors: ['#FFFFFF', '#D0EBFF', '#A6D5FA', '#74B9FF'],
      },
      // 2. Hyades Open Cluster - Golden Stellar Cluster
      {
        center: [-145, 80, -290],
        count: 420,
        radius: 32,
        colors: ['#FFFFFF', '#FFEAA7', '#FDCB6E', '#FFA770'],
      },
      // 3. Omega Centauri - Dense Globular Star Swarm
      {
        center: [-75, -70, -340],
        count: 650,
        radius: 28,
        colors: ['#FFFFFF', '#E8F4FD', '#DFF9FB', '#FFF0DF'],
      },
    ];

    const totalCount = clusters.reduce((acc, c) => acc + c.count, 0);
    const pos = new Float32Array(totalCount * 3);
    const col = new Float32Array(totalCount * 3);
    const siz = new Float32Array(totalCount);

    let offset = 0;

    clusters.forEach((cluster) => {
      for (let i = 0; i < cluster.count; i++) {
        // Gaussian distribution towards center for realistic core concentration
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = Math.pow(Math.random(), 2.2) * cluster.radius;

        const x = cluster.center[0] + r * Math.sin(phi) * Math.cos(theta);
        const y = cluster.center[1] + r * Math.sin(phi) * Math.sin(theta);
        const z = cluster.center[2] + r * Math.cos(phi);

        const idx = offset + i;
        pos[idx * 3] = x;
        pos[idx * 3 + 1] = y;
        pos[idx * 3 + 2] = z;

        const hex = cluster.colors[Math.floor(Math.random() * cluster.colors.length)];
        const c = new THREE.Color(hex);
        col[idx * 3] = c.r;
        col[idx * 3 + 1] = c.g;
        col[idx * 3 + 2] = c.b;

        // Core stars are brighter and slightly larger
        const distFromCenter = r / cluster.radius;
        siz[idx] = (1 - distFromCenter * 0.5) * (2.8 + Math.random() * 2.5);
      }
      offset += cluster.count;
    });

    return [pos, col, siz];
  }, []);

  // Prominent Beacon Stars within Clusters (Major Stars of Pleiades: Alcyone, Maia, Electra, etc.)
  const majorStars = useMemo(() => [
    { pos: [148, 96, -308], color: '#FFFFFF', size: 12 },
    { pos: [154, 98, -312], color: '#E0F2FE', size: 10 },
    { pos: [144, 92, -306], color: '#BAE6FD', size: 11 },
    { pos: [158, 94, -315], color: '#7DD3FC', size: 9 },
    { pos: [142, 99, -310], color: '#E0F2FE', size: 10 },
    { pos: [-142, 82, -288], color: '#FEF08A', size: 12 }, // Aldebaran neighbor
    { pos: [-148, 77, -292], color: '#FDE047', size: 10 },
  ], []);

  useFrame((state, delta) => {
    if (clusterGroupRef.current) {
      clusterGroupRef.current.rotation.y += delta * 0.0004;
    }
  });

  return (
    <group ref={clusterGroupRef} name="deep-space-star-clusters">
      {/* 1. Pleiades Soft Blue Reflection Nebulosity (Circular Geometry) */}
      <mesh position={[150, 95, -312]} rotation={[0.2, -0.3, 0]}>
        <circleGeometry args={[42, 48]} />
        <meshBasicMaterial
          map={pleiadesGlow}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 2. Hyades Soft Warm Glow */}
      <mesh position={[-145, 80, -292]} rotation={[-0.1, 0.4, 0]}>
        <circleGeometry args={[36, 48]} />
        <meshBasicMaterial
          map={hyadesGlow}
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 3. Densely Concentrated Cluster Star Points (Round Sprites) */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[clusterPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[clusterColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          map={starSprite}
          size={3.2}
          vertexColors
          transparent
          opacity={0.92}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 4. Bright Major Star Beacons with 4-Point Flares */}
      {majorStars.map((s, idx) => (
        <sprite key={idx} position={s.pos} scale={[s.size, s.size, 1]}>
          <spriteMaterial
            map={starFlare}
            color={s.color}
            transparent
            opacity={0.95}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
  );
}

