import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import PlanetOrbit from './PlanetOrbit';
import {
  getMercuryTexture,
  getVenusTexture,
  getEarthTexture,
  getEarthCloudTexture,
  getMarsTexture,
  getJupiterTexture,
  getSaturnTexture,
  getSaturnRingTexture,
  getUranusTexture,
  getNeptuneTexture,
} from '../utils/textureGenerators';

export default function Planet({
  planet,
  isSelected,
  onSelect,
}) {
  const planetRef = useRef();
  const cloudsRef = useRef();
  const ringRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Retrieve procedural NASA-grade texture
  const texture = useMemo(() => {
    switch (planet.id) {
      case 'mercury':
        return getMercuryTexture();
      case 'venus':
        return getVenusTexture();
      case 'earth':
        return getEarthTexture();
      case 'mars':
        return getMarsTexture();
      case 'jupiter':
        return getJupiterTexture();
      case 'saturn':
        return getSaturnTexture();
      case 'uranus':
        return getUranusTexture();
      case 'neptune':
        return getNeptuneTexture();
      default:
        return null;
    }
  }, [planet.id]);

  const earthCloudsTexture = useMemo(() => {
    return planet.id === 'earth' ? getEarthCloudTexture() : null;
  }, [planet.id]);

  const saturnRingTexture = useMemo(() => {
    return planet.id === 'saturn' ? getSaturnRingTexture() : null;
  }, [planet.id]);

  // Frame animations (rotation on natural axis)
  useFrame((_, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * (planet.rotationSpeed || 0.01) * 2.5;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.032;
    }
  });

  const tiltRad = ((planet.axialTilt || 0) * Math.PI) / 180;

  return (
    <>
      {/* Orbital Path Line */}
      <PlanetOrbit
        radius={planet.orbitDistance}
        isActive={isSelected}
        isHovered={hovered}
      />

      {/* Planetary Group */}
      <group position={planet.position}>
        <group
          rotation={[0, 0, tiltRad]}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = 'auto';
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (onSelect) onSelect(planet);
          }}
        >
          {/* Main Planetary Body */}
          <mesh
            ref={planetRef}
            scale={hovered ? 1.06 : isSelected ? 1.03 : 1.0}
            castShadow
            receiveShadow
          >
            <sphereGeometry args={[planet.radius, 64, 64]} />
            <meshStandardMaterial
              map={texture}
              roughness={0.7}
              metalness={0.12}
            />
          </mesh>

          {/* Earth Clouds Sphere */}
          {planet.hasClouds && earthCloudsTexture && (
            <mesh ref={cloudsRef} scale={1.018}>
              <sphereGeometry args={[planet.radius, 48, 48]} />
              <meshStandardMaterial
                map={earthCloudsTexture}
                transparent
                opacity={0.65}
                blending={THREE.NormalBlending}
                depthWrite={false}
              />
            </mesh>
          )}

          {/* Soft Realistic Planetary Atmosphere */}
          <mesh scale={1.06}>
            <sphereGeometry args={[planet.radius, 32, 32]} />
            <meshBasicMaterial
              color={planet.atmosphereColor || '#42D9FF'}
              transparent
              opacity={isSelected ? 0.22 : hovered ? 0.2 : 0.08}
              blending={THREE.AdditiveBlending}
              side={THREE.BackSide}
            />
          </mesh>

          {/* Saturn Rings with Cassini Division */}
          {planet.id === 'saturn' && (
            <mesh
              ref={ringRef}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={hovered ? 1.04 : 1.0}
            >
              <ringGeometry
                args={[planet.ringInnerRadius, planet.ringOuterRadius, 96]}
              />
              <meshStandardMaterial
                map={saturnRingTexture}
                side={THREE.DoubleSide}
                transparent
                opacity={0.92}
                roughness={0.65}
              />
            </mesh>
          )}

          {/* Uranus Tilted Rings */}
          {planet.id === 'uranus' && (
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              scale={hovered ? 1.04 : 1.0}
            >
              <ringGeometry
                args={[planet.ringInnerRadius, planet.ringOuterRadius, 64]}
              />
              <meshBasicMaterial
                color="#6EE7B7"
                side={THREE.DoubleSide}
                transparent
                opacity={0.28}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          )}

          {/* Mars Dust Aura */}
          {planet.hasDust && (
            <mesh scale={1.2}>
              <sphereGeometry args={[planet.radius, 24, 24]} />
              <meshBasicMaterial
                color="#E53E3E"
                transparent
                opacity={0.05}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          )}

          {/* 3D Label on Hover or Active Selection */}
          {(hovered || isSelected) && (
            <Html
              position={[0, planet.radius * 1.45, 0]}
              center
              distanceFactor={40}
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`px-3 py-1.5 rounded-full backdrop-blur-md border text-xs font-mono tracking-wider transition-all duration-300 shadow-glass ${
                    isSelected
                      ? 'bg-space-midnight/90 border-space-cyan text-space-cyan'
                      : 'bg-space-deep/80 border-white/20 text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-space-cyan animate-ping" />
                    <span>{planet.name}</span>
                    <span className="text-white/40">|</span>
                    <span className="text-space-gold">{planet.title}</span>
                  </div>
                </div>
                <div className="w-0.5 h-3.5 bg-gradient-to-b from-space-cyan to-transparent" />
              </div>
            </Html>
          )}
        </group>
      </group>
    </>
  );
}
