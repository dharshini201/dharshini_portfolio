import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function MeteorShower({ count = 5 }) {
  const meteorsRef = useRef([]);

  // Generate initial meteor trajectories
  const meteorConfigs = useMemo(() => {
    return Array.from({ length: count }, (_, idx) => ({
      id: idx,
      length: 18 + Math.random() * 26,
      speed: 120 + Math.random() * 140,
      active: false,
      timer: Math.random() * 5 + idx * 2.5, // Staggered start times
      startPos: new THREE.Vector3(),
      dir: new THREE.Vector3(),
      progress: 0,
    }));
  }, [count]);

  const geometry = useMemo(() => {
    // Slender tapered cone mesh for realistic shooting star tail (smooth 16 segments)
    const geo = new THREE.CylinderGeometry(0.02, 0.35, 22, 16);
    geo.rotateX(Math.PI / 2); // Point along Z axis
    return geo;
  }, []);

  useFrame((state, delta) => {
    meteorConfigs.forEach((m, idx) => {
      const mesh = meteorsRef.current[idx];
      if (!mesh) return;

      if (!m.active) {
        m.timer -= delta;
        if (m.timer <= 0) {
          // Spawn new meteor in deep space
          m.active = true;
          m.progress = 0;

          // Random starting point in distant sky
          const startX = (Math.random() - 0.5) * 350 + 50;
          const startY = 80 + Math.random() * 120;
          const startZ = -180 - Math.random() * 220;

          m.startPos.set(startX, startY, startZ);

          // Downward diagonal trajectory
          const angle = (Math.random() * 0.4 - 0.2) + Math.PI * 0.75;
          m.dir.set(Math.cos(angle), -0.65 - Math.random() * 0.35, Math.sin(angle) * 0.3).normalize();

          mesh.position.copy(m.startPos);
          mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), m.dir);
          mesh.visible = true;
        } else {
          mesh.visible = false;
        }
      } else {
        // Active streak movement
        m.progress += (delta * m.speed) / m.length;
        const currentPos = m.startPos.clone().addScaledVector(m.dir, m.progress * m.length);
        mesh.position.copy(currentPos);

        // Alpha fade in and out curve
        const opacity = Math.sin(m.progress * Math.PI) * 0.85;
        if (mesh.material) {
          mesh.material.opacity = Math.max(0, opacity);
        }

        if (m.progress >= 1) {
          // Finished streak, reset and wait
          m.active = false;
          m.timer = 4 + Math.random() * 8; // Wait 4-12 seconds
          mesh.visible = false;
        }
      }
    });
  });

  return (
    <group>
      {meteorConfigs.map((m, idx) => (
        <mesh
          key={m.id}
          ref={(el) => (meteorsRef.current[idx] = el)}
          geometry={geometry}
          visible={false}
        >
          <meshBasicMaterial
            color={idx % 2 === 0 ? '#42D9FF' : '#FFF5E0'}
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

