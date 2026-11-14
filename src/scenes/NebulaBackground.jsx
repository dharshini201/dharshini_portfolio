import React from 'react';
import StarField from './StarField';
import StarClusters from './StarClusters';
import NebulaClouds from './NebulaClouds';
import CosmicDust from './CosmicDust';
import SpaceParallax from './SpaceParallax';
import FloatingMoons from './FloatingMoons';
import MeteorShower from './MeteorShower';

/**
 * NebulaBackground
 * Master Deep Space Orchestrator inspired by NASA James Webb & Hubble photographs.
 * 
 * Replaced all faceted/box artifacts with:
 *  1. Millions of soft circular starlight points & diffraction flare stars (StarField)
 *  2. Dense open & globular star clusters like Pleiades & Hyades (StarClusters)
 *  3. Seamless spherical multi-layer volumetric nebula domes (NebulaClouds)
 *  4. 9 Photorealistic cratered & icy 3D Moons (FloatingMoons)
 *  5. Fine cosmic stardust particles (CosmicDust)
 *  6. Occasional subtle meteor streaks (MeteorShower)
 */
export default function NebulaBackground() {
  return (
    <group name="cinematic-nebula-background">
      {/* Layer 1: Ultra-Deep Star Sphere & Mid-Field Twinkling Stars */}
      <SpaceParallax factor={0.015} maxOffset={12}>
        <StarField deepCount={16000} midCount={4500} brightCount={380} />
      </SpaceParallax>

      {/* Layer 2: Deep-Space Star Clusters (Pleiades, Hyades, Omega Centauri) */}
      <SpaceParallax factor={0.025} maxOffset={16}>
        <StarClusters />
      </SpaceParallax>

      {/* Layer 3: NASA JWST/Hubble Volumetric Nebula Clouds & Spiral Galaxies */}
      <SpaceParallax factor={0.04} maxOffset={22}>
        <NebulaClouds />
      </SpaceParallax>

      {/* Layer 4: Photorealistic 3D Moons Suspended in Background */}
      <SpaceParallax factor={0.06} maxOffset={18}>
        <FloatingMoons />
      </SpaceParallax>

      {/* Layer 5: Fine Cosmic Dust Particles & Ionized Gas Motes */}
      <SpaceParallax factor={0.08} maxOffset={28}>
        <CosmicDust count={2400} />
      </SpaceParallax>

      {/* Occasional Deep Space Meteor Shower Streaks */}
      <MeteorShower count={5} />
    </group>
  );
}
