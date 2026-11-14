import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Sun from './Sun';
import Planet from './Planet';
import StarField from './StarField';
import CameraRig from './CameraRig';
import { PLANETS } from '../data/planets';

export default function SolarSystemCanvas({
  activePlanetId,
  onSelectPlanet,
  isFreeInspect,
}) {
  const sunData = PLANETS[0];
  const planetsData = PLANETS.slice(1);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden bg-space-deep">
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 2000,
          position: [0, 4.5, 26],
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          {/* Deep Space Ambient Lighting */}
          <ambientLight color="#07152D" intensity={0.9} />
          {/* Gentle celestial fill light */}
          <directionalLight
            color="#42D9FF"
            position={[50, 100, 50]}
            intensity={0.4}
          />
          {/* Subtle rim light for planet silhouette definition */}
          <directionalLight
            color="#6C45A8"
            position={[-50, -50, -50]}
            intensity={0.25}
          />

          {/* Background Stars & Dust */}
          <StarField count={8500} dustCount={1000} />

          {/* Central Sun */}
          <Sun
            radius={sunData.radius}
            onSelect={() => onSelectPlanet && onSelectPlanet(sunData)}
          />

          {/* 8 Orbiting Planets */}
          {planetsData.map((planet) => (
            <Planet
              key={planet.id}
              planet={planet}
              isSelected={activePlanetId === planet.id}
              onSelect={onSelectPlanet}
            />
          ))}

          {/* Camera Controller */}
          <CameraRig
            activePlanetId={activePlanetId}
            isFreeInspect={isFreeInspect}
          />

          {/* Optional Free Inspect Controls */}
          {isFreeInspect && (
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              maxDistance={350}
              minDistance={3}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

