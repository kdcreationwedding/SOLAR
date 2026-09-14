import * as THREE from 'three';

export const SunShader = {
  uniforms: {
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uColorCore: { value: new THREE.Color("#FFFFFF") },
    uColorGlow: { value: new THREE.Color("#FFC72C") },
    uColorRim: { value: new THREE.Color("#F97316") },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    uniform float uTime;
    uniform float uProgress;
    uniform vec3 uColorCore;
    uniform vec3 uColorGlow;
    uniform vec3 uColorRim;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);

      // Smooth Fresnel edge lighting for volumetric sun feel
      float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.0);

      // Sun surface radial intensity
      float centerDist = length(vUv - vec2(0.5));
      float coreGlow = smoothstep(0.5, 0.0, centerDist);

      vec3 color = mix(uColorGlow, uColorCore, coreGlow * 0.9);
      color = mix(color, uColorRim, fresnel * 0.7);

      // Add gentle atmospheric rim flare
      color += uColorGlow * fresnel * 0.85;

      gl_FragColor = vec4(color, 1.0);
    }
  `
};
