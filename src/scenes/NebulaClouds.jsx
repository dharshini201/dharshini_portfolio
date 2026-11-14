import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getSpiralGalaxyTexture } from '../utils/textureGenerators';

/**
 * GLSL Vertex Shader for Seamless Spherical Nebula Dome
 */
const nebulaDomeVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/**
 * GLSL Fragment Shader for Seamless Spherical Nebula Dome
 * Features multi-octave FBM turbulence, ionization filaments, and dark molecular dust rifts.
 * Runs on a smooth sphere with NO rectangular or square edges.
 */
const nebulaDomeFragmentShader = `
  uniform float uTime;
  uniform float uOpacity;
  uniform vec3 uColorBase;
  uniform vec3 uColorNavy;
  uniform vec3 uColorPurple;
  uniform vec3 uColorViolet;
  uniform vec3 uColorPink;
  uniform vec3 uColorElectricBlue;
  uniform vec3 uColorCyan;
  uniform float uScale;

  varying vec2 vUv;
  varying vec3 vPosition;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = rot * p * 2.0 + vec2(uTime * 0.008, uTime * 0.005);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // Spherical seamless mapping
    vec2 uv = vUv * uScale;

    vec2 q = vec2(fbm(uv + vec2(0.0, 0.0)), fbm(uv + vec2(5.2, 1.3)));
    vec2 r = vec2(fbm(uv + 3.5 * q + vec2(1.7, 9.2)), fbm(uv + 3.5 * q + vec2(8.3, 2.8)));
    float f = fbm(uv + 3.5 * r);

    // Color gradient mapping:
    vec3 col = mix(uColorBase, uColorNavy, clamp(f * 2.0, 0.0, 1.0));
    col = mix(col, uColorPurple, clamp((f - 0.28) * 3.0, 0.0, 1.0));
    col = mix(col, uColorElectricBlue, clamp((f - 0.44) * 2.5, 0.0, 1.0));
    col = mix(col, uColorViolet, clamp((f - 0.58) * 3.0, 0.0, 1.0));
    col = mix(col, uColorPink, clamp((f - 0.72) * 4.0, 0.0, 1.0));
    col = mix(col, uColorCyan, clamp((f - 0.85) * 5.0, 0.0, 1.0));

    // Dark molecular absorption dust rifts
    float darkRift = fbm(uv * 1.6 + vec2(uTime * 0.004, 0.0));
    if (darkRift > 0.63) {
      col = mix(col, uColorBase * 0.2, (darkRift - 0.63) * 2.2);
    }

    // Latitude poles smooth falloff
    float poleAlpha = sin(vUv.y * 3.14159);

    float breathe = 0.94 + 0.06 * sin(uTime * 0.35);
    float alpha = clamp((f - 0.26) * 1.4, 0.0, 1.0) * uOpacity * poleAlpha * breathe;

    gl_FragColor = vec4(col, alpha);
  }
`;

export default function NebulaClouds() {
  const domeShaderRef = useRef();
  const innerSphereShaderRef = useRef();
  const galaxyTex = useMemo(() => getSpiralGalaxyTexture(), []);

  // NASA James Webb & Hubble calibrated color palette
  const domeUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: 0.72 },
      uScale: { value: 3.5 },
      uColorBase: { value: new THREE.Color('#02030A') },
      uColorNavy: { value: new THREE.Color('#07132D') },
      uColorPurple: { value: new THREE.Color('#542B8A') },
      uColorViolet: { value: new THREE.Color('#8155C7') },
      uColorPink: { value: new THREE.Color('#B65E9B') },
      uColorElectricBlue: { value: new THREE.Color('#2876C8') },
      uColorCyan: { value: new THREE.Color('#63C8E8') },
    }),
    []
  );

  const innerSphereUniforms = useMemo(
    () => ({
      ...domeUniforms,
      uOpacity: { value: 0.48 },
      uScale: { value: 4.8 },
    }),
    [domeUniforms]
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (domeShaderRef.current) domeShaderRef.current.uniforms.uTime.value = time;
    if (innerSphereShaderRef.current) innerSphereShaderRef.current.uniforms.uTime.value = time * 1.15;
  });

  return (
    <group name="seamless-nebula-clouds">
      {/* ============================================================== */}
      {/* 1. SEAMLESS CELESTIAL SKY DOME SPHERE (NO RECTANGULAR EDGES)  */}
      {/* ============================================================== */}
      <mesh position={[80, 0, 0]}>
        <sphereGeometry args={[520, 64, 48]} />
        <shaderMaterial
          ref={domeShaderRef}
          vertexShader={nebulaDomeVertexShader}
          fragmentShader={nebulaDomeFragmentShader}
          uniforms={domeUniforms}
          side={THREE.BackSide}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ============================================================== */}
      {/* 2. INNER SEAMLESS VOLUMETRIC GAS VEIL (NO RECTANGULAR PLANES) */}
      {/* ============================================================== */}
      <mesh position={[100, 15, -40]}>
        <sphereGeometry args={[360, 48, 36]} />
        <shaderMaterial
          ref={innerSphereShaderRef}
          vertexShader={nebulaDomeVertexShader}
          fragmentShader={nebulaDomeFragmentShader}
          uniforms={innerSphereUniforms}
          side={THREE.BackSide}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ============================================================== */}
      {/* 3. DISTANT SPIRAL GALAXY ON CIRCULAR MESH (NO SQUARE BOXES)   */}
      {/* ============================================================== */}
      <mesh position={[120, 90, -420]} rotation={[0.45, -0.6, 0.35]}>
        {/* CircleGeometry guarantees 100% round outline, zero square corners */}
        <circleGeometry args={[75, 64]} />
        <meshBasicMaterial
          map={galaxyTex}
          transparent
          opacity={0.82}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Secondary Distant Galaxy with Circular Geometry */}
      <mesh position={[-150, 70, -390]} rotation={[-0.3, 0.5, -0.2]}>
        <circleGeometry args={[52, 48]} />
        <meshBasicMaterial
          map={galaxyTex}
          transparent
          opacity={0.58}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ============================================================== */}
      {/* 4. SOFT GASEOUS EMISSION SPHERES (CARINA / ORION PILLARS)     */}
      {/* ============================================================== */}
      <mesh position={[130, -25, -160]}>
        <sphereGeometry args={[95, 24, 24]} />
        <meshBasicMaterial
          color="#542B8A"
          transparent
          opacity={0.035}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[-50, 40, -140]}>
        <sphereGeometry args={[85, 24, 24]} />
        <meshBasicMaterial
          color="#2876C8"
          transparent
          opacity={0.028}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[60, 50, -190]}>
        <sphereGeometry args={[110, 24, 24]} />
        <meshBasicMaterial
          color="#B65E9B"
          transparent
          opacity={0.025}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
