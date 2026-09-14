import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SunShader } from './SunShader';

// Pre-allocated static Color Stops (Zero Garbage Collection during animation)
const c0Core = new THREE.Color("#FFFFFF");
const c0Glow = new THREE.Color("#FFC72C");
const c0Rim = new THREE.Color("#F97316");

const c1Core = new THREE.Color("#FFFFFF");
const c1Glow = new THREE.Color("#FDE047");
const c1Rim = new THREE.Color("#60A5FA");

const c2Core = new THREE.Color("#FEF08A");
const c2Glow = new THREE.Color("#F97316");
const c2Rim = new THREE.Color("#EA580C");

const c3Core = new THREE.Color("#FFC72C");
const c3Glow = new THREE.Color("#EA580C");
const c3Rim = new THREE.Color("#DC2626");

const targetCore = new THREE.Color();
const targetGlow = new THREE.Color();
const targetRim = new THREE.Color();

export const SunMesh = ({ scrollProgress = 0 }) => {
  const sunRef = useRef();
  const auraRef = useRef();
  const shaderMatRef = useRef();

  useFrame((state, delta) => {
    if (!sunRef.current || !shaderMatRef.current) return;

    shaderMatRef.current.uniforms.uTime.value += delta;
    shaderMatRef.current.uniforms.uProgress.value = scrollProgress;

    const p = Math.min(1, Math.max(0, scrollProgress));

    let targetX = 0;
    let targetY = 0;
    let targetZ = -4.0;
    let targetScale = 1.5;

    if (p <= 0.4) {
      const t = p / 0.4;
      targetX = THREE.MathUtils.lerp(0, 0.4, t);
      targetY = THREE.MathUtils.lerp(0.1, 3.2, t);
      targetZ = THREE.MathUtils.lerp(-3.6, -5.5, t);
      targetScale = THREE.MathUtils.lerp(1.4, 2.3, t);

      targetCore.copy(c0Core).lerp(c1Core, t);
      targetGlow.copy(c0Glow).lerp(c1Glow, t);
      targetRim.copy(c0Rim).lerp(c1Rim, t);
    } else if (p <= 0.75) {
      const t = (p - 0.4) / 0.35;
      targetX = THREE.MathUtils.lerp(0.4, 1.8, t);
      targetY = THREE.MathUtils.lerp(3.2, 0.5, t);
      targetZ = THREE.MathUtils.lerp(-5.5, -4.2, t);
      targetScale = THREE.MathUtils.lerp(2.3, 1.8, t);

      targetCore.copy(c1Core).lerp(c2Core, t);
      targetGlow.copy(c1Glow).lerp(c2Glow, t);
      targetRim.copy(c1Rim).lerp(c2Rim, t);
    } else {
      const t = (p - 0.75) / 0.25;
      targetX = THREE.MathUtils.lerp(1.8, 0, t);
      targetY = THREE.MathUtils.lerp(0.5, -2.7, t);
      targetZ = THREE.MathUtils.lerp(-4.2, -3.6, t);
      targetScale = THREE.MathUtils.lerp(1.8, 1.3, t);

      targetCore.copy(c2Core).lerp(c3Core, t);
      targetGlow.copy(c2Glow).lerp(c3Glow, t);
      targetRim.copy(c2Rim).lerp(c3Rim, t);
    }

    sunRef.current.position.x = THREE.MathUtils.damp(sunRef.current.position.x, targetX, 3.5, delta);
    sunRef.current.position.y = THREE.MathUtils.damp(sunRef.current.position.y, targetY, 3.5, delta);
    sunRef.current.position.z = THREE.MathUtils.damp(sunRef.current.position.z, targetZ, 3.5, delta);

    const s = THREE.MathUtils.damp(sunRef.current.scale.x, targetScale, 3.5, delta);
    sunRef.current.scale.set(s, s, s);

    shaderMatRef.current.uniforms.uColorCore.value.lerp(targetCore, delta * 2.5);
    shaderMatRef.current.uniforms.uColorGlow.value.lerp(targetGlow, delta * 2.5);
    shaderMatRef.current.uniforms.uColorRim.value.lerp(targetRim, delta * 2.5);

    if (auraRef.current) {
      auraRef.current.position.copy(sunRef.current.position);
      const auraScale = s * 1.6;
      auraRef.current.scale.set(auraScale, auraScale, auraScale);
    }
  });

  return (
    <group>
      {/* 3D Sun Sphere */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[1, 48, 48]} />
        <shaderMaterial
          ref={shaderMatRef}
          args={[SunShader]}
          transparent={false}
        />
      </mesh>

      {/* Atmospheric Halo */}
      <mesh ref={auraRef}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial
          color="#F97316"
          transparent
          opacity={0.16}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

