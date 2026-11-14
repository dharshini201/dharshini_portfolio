import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { PLANETS } from '../data/planets';

export default function CameraRig({
  activePlanetId,
  isFreeInspect = false,
}) {
  const { camera, pointer } = useThree();

  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetCameraPos = useRef(new THREE.Vector3(0, 4.5, 26));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const mouseParallax = useRef(new THREE.Vector2(0, 0));

  // Update target coordinates whenever active planet changes
  useEffect(() => {
    const planet = PLANETS.find((p) => p.id === activePlanetId) || PLANETS[0];
    const [cx, cy, cz] = planet.cameraPosition;
    const [tx, ty, tz] = planet.cameraTarget;

    targetCameraPos.current.set(cx, cy, cz);
    targetLookAt.current.set(tx, ty, tz);
  }, [activePlanetId]);

  useFrame((_, delta) => {
    if (isFreeInspect) return;

    // Smooth delta clamping to prevent jumps on tab refocus
    const dt = Math.min(delta, 0.1);

    // Subtle responsive mouse parallax
    mouseParallax.current.x = THREE.MathUtils.lerp(
      mouseParallax.current.x,
      pointer.x * 1.8,
      dt * 2.5
    );
    mouseParallax.current.y = THREE.MathUtils.lerp(
      mouseParallax.current.y,
      pointer.y * 1.2,
      dt * 2.5
    );

    // Desired camera position with parallax offset
    const desiredPos = new THREE.Vector3(
      targetCameraPos.current.x + mouseParallax.current.x,
      targetCameraPos.current.y + mouseParallax.current.y,
      targetCameraPos.current.z
    );

    // Smooth cinematic lerp (swoop speed)
    camera.position.lerp(desiredPos, dt * 2.8);

    // Smooth lookAt target lerp
    currentLookAt.current.lerp(targetLookAt.current, dt * 3.4);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

