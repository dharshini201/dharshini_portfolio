import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getAsteroidTexture } from '../utils/textureGenerators';

export default function AsteroidField({ count = 380 }) {
  const meshRef = useRef();
  const asteroidTex = useMemo(() => getAsteroidTexture(), []);

  // Geometry: Dodecahedron with detail 1 creates faceted, rocky asteroid shapes
  const geometry = useMemo(() => {
    const geo = new THREE.DodecahedronGeometry(0.8, 1);
    // Perturb vertices slightly for organic irregular boulder shapes
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vy = pos.getY(i);
      const vz = pos.getZ(i);
      const noise = 1 + (Math.sin(vx * 4) + Math.cos(vy * 4) + Math.sin(vz * 4)) * 0.12;
      pos.setXYZ(i, vx * noise, vy * noise, vz * noise);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Pre-generate orbital parameters for all 380 asteroids
  const asteroidData = useMemo(() => {
    const data = [];
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      // Main Asteroid Belt: between Mars (90) and Jupiter (118)
      // Radius distribution between 96 and 114
      const isOuterBelt = Math.random() < 0.15;
      const radius = isOuterBelt
        ? 215 + Math.random() * 45 // Kuiper belt debris
        : 97 + Math.random() * 16;  // Main asteroid belt

      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * (isOuterBelt ? 30 : 14);

      // Non-uniform scales for varied irregular space rocks
      const scaleX = 0.25 + Math.random() * 0.9;
      const scaleY = 0.22 + Math.random() * 0.8;
      const scaleZ = 0.25 + Math.random() * 0.9;

      // Orbit speed (Keplerian: farther is slower)
      const orbitSpeed = (0.012 / Math.sqrt(radius)) * (0.8 + Math.random() * 0.4);

      // Individual tumbling speeds
      const rotSpeedX = (Math.random() - 0.5) * 0.8;
      const rotSpeedY = (Math.random() - 0.5) * 0.8;
      const rotSpeedZ = (Math.random() - 0.5) * 0.8;

      data.push({
        radius,
        angle,
        height,
        scale: [scaleX, scaleY, scaleZ],
        orbitSpeed,
        rotSpeed: [rotSpeedX, rotSpeedY, rotSpeedZ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      });
    }
    return data;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Set initial transformation matrices
  useEffect(() => {
    if (!meshRef.current) return;
    asteroidData.forEach((ast, i) => {
      dummy.position.set(
        Math.cos(ast.angle) * ast.radius,
        ast.height,
        Math.sin(ast.angle) * ast.radius
      );
      dummy.rotation.set(...ast.rotation);
      dummy.scale.set(...ast.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [asteroidData, dummy]);

  // Orbit & tumble animation
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    asteroidData.forEach((ast, i) => {
      // Orbiting around Sun
      const currentAngle = ast.angle + time * ast.orbitSpeed;
      const x = Math.cos(currentAngle) * ast.radius;
      const z = Math.sin(currentAngle) * ast.radius;

      dummy.position.set(x, ast.height, z);

      // Tumbling
      dummy.rotation.x = ast.rotation[0] + time * ast.rotSpeed[0];
      dummy.rotation.y = ast.rotation[1] + time * ast.rotSpeed[1];
      dummy.rotation.z = ast.rotation[2] + time * ast.rotSpeed[2];

      dummy.scale.set(...ast.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, null, count]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        map={asteroidTex}
        roughness={0.88}
        metalness={0.15}
        color="#D4D4D8"
      />
    </instancedMesh>
  );
}

