import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function PlanetOrbit({
  radius = 20,
  isActive = false,
  isHovered = false,
}) {
  const geometry = useMemo(() => {
    const points = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [radius]);

  if (radius <= 0) return null;

  return (
    <line geometry={geometry}>
      <lineBasicMaterial
        color={isActive ? '#42D9FF' : isHovered ? '#FFB347' : '#2A4365'}
        transparent
        opacity={isActive ? 0.5 : isHovered ? 0.35 : 0.14}
        blending={THREE.AdditiveBlending}
      />
    </line>
  );
}

