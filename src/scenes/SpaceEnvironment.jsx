import React from 'react';
import * as THREE from 'three';

/**
 * SpaceEnvironment
 * Ambient deep space lighting and directional cosmic illumination.
 * Pure lighting without low-poly geometry to prevent any polygon faceting.
 */
export default function SpaceEnvironment() {
  return (
    <group>
      {/* Deep Space Ambient Lighting */}
      <ambientLight color="#0B132B" intensity={0.9} />

      {/* Gentle Cosmic Rim & Fill Lights */}
      <directionalLight
        color="#42D9FF"
        position={[60, 120, 60]}
        intensity={0.4}
      />
      <directionalLight
        color="#6C45A8"
        position={[-80, -60, -60]}
        intensity={0.3}
      />
      <directionalLight
        color="#FFB347"
        position={[0, -80, 50]}
        intensity={0.15}
      />
    </group>
  );
}
