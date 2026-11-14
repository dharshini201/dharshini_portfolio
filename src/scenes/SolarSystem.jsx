import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Sun from './Sun';
import Planet from './Planet';
import NebulaBackground from './NebulaBackground';
import SpaceEnvironment from './SpaceEnvironment';
import CameraRig from './CameraRig';
import { PLANETS } from '../data/planets';

export default function SolarSystem({
  activePlanetId,
  onSelectPlanet,
  isFreeInspect,
}) {
  const sunData = PLANETS[0];
  const planetsData = PLANETS.slice(1);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden bg-space-deep">
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 2500,
          position: [-15, 38, 85],
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          {/* Space Lighting, Fog & Natural Colors */}
          <SpaceEnvironment />

          {/* NASA JWST/Hubble-Inspired Cinematic Nebula Background */}
          <NebulaBackground />

          {/* Central Photorealistic Sun with Solar Flares */}
          <Sun
            radius={sunData.radius}
            onSelect={() => onSelectPlanet && onSelectPlanet(sunData)}
          />

          {/* Eight Photorealistic Planets with Orbits */}
          {planetsData.map((planet) => (
            <Planet
              key={planet.id}
              planet={planet}
              isSelected={activePlanetId === planet.id}
              onSelect={onSelectPlanet}
            />
          ))}

          {/* GSAP / Three.js Smooth Camera Rig */}
          <CameraRig
            activePlanetId={activePlanetId}
            isFreeInspect={isFreeInspect}
          />

          {/* Optional Interactive Orbit Controls */}
          {isFreeInspect && (
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              maxDistance={400}
              minDistance={4}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
