import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { SunMesh } from './SunMesh';
import { SolarPanelMesh } from './SolarPanelMesh';
import { Particles } from './Particles';

export const SunCanvas = ({ scrollProgress = 0 }) => {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} color="#FFD066" />
        <pointLight position={[0, 0, -2]} intensity={2.0} color="#FF9900" />

        <Suspense fallback={null}>
          <SunMesh scrollProgress={scrollProgress} />
          <SolarPanelMesh scrollProgress={scrollProgress} />
          <Particles count={250} scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
};
