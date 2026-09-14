import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const SolarPanelMesh = ({ scrollProgress = 0 }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Visible mainly between scroll 25% and 75%
    const p = scrollProgress;
    let opacityTarget = 0;
    let targetY = -4;

    if (p >= 0.25 && p <= 0.75) {
      opacityTarget = 1;
      targetY = -1.2 + Math.sin((p - 0.25) * Math.PI * 2) * 0.3;
    } else {
      opacityTarget = 0;
      targetY = -5;
    }

    // Dynamic tilt tracking sun angle
    const sunAngle = (p - 0.25) * Math.PI * 0.8;
    const targetRotX = -0.4 - Math.cos(sunAngle) * 0.2;
    const targetRotY = Math.sin(sunAngle) * 0.4;

    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 4, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 4, delta);
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 4, delta);
  });

  return (
    <group ref={groupRef} position={[0, -5, -2]}>
      {/* Array of 3 High-Tech Solar Panels */}
      {[-2.2, 0, 2.2].map((xOffset, idx) => (
        <group key={idx} position={[xOffset, 0, 0]}>
          {/* Panel Glass Plate */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.8, 2.4, 0.08]} />
            <meshStandardMaterial
              color="#0F172A"
              metalness={0.9}
              roughness={0.1}
              envMapIntensity={2.5}
            />
          </mesh>

          {/* Solar Grid Gridlines */}
          <mesh position={[0, 0, 0.05]}>
            <planeGeometry args={[1.7, 2.3]} />
            <meshBasicMaterial
              color="#1E293B"
              wireframe
              transparent
              opacity={0.3}
            />
          </mesh>

          {/* Solar Cell Metallic Bezel Frame */}
          <mesh position={[0, 0, -0.02]}>
            <boxGeometry args={[1.9, 2.5, 0.1]} />
            <meshStandardMaterial
              color="#FFB800"
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>

          {/* Stand Mount Column */}
          <mesh position={[0, -1.5, -0.5]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.08, 1.8, 16]} />
            <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
