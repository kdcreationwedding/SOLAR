import React from 'react';

export const Logo = ({ size = "medium", className = "" }) => {
  const isLarge = size === "large";
  const isSmall = size === "small";

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* User's Exact Emblem Logo SVG */}
      <div className={`relative flex items-center justify-center flex-shrink-0 ${
        isLarge ? 'w-16 h-16 sm:w-20 sm:h-20' : isSmall ? 'w-8 h-8' : 'w-10 h-10'
      }`}>
        <svg viewBox="0 0 600 600" className="w-full h-full drop-shadow-[0_0_20px_rgba(217,154,60,0.4)]">
          <defs>
            <linearGradient id="earthGradLogo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0c1218"/>
              <stop offset="55%" stopColor="#1b2833"/>
              <stop offset="100%" stopColor="#33475a"/>
            </linearGradient>
            <linearGradient id="sunGradLogo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8a5a1e"/>
              <stop offset="45%" stopColor="#d99a3c"/>
              <stop offset="100%" stopColor="#f4cf7e"/>
            </linearGradient>

            <clipPath id="leftHalfClip">
              <path d="M320,60.84 C270,160 370,240 320,300 C270,360 370,440 320,539.16 A240,240 0 1 1 320,60.84 Z"/>
            </clipPath>
            <clipPath id="rightHalfClip">
              <path d="M320,60.84 C270,160 370,240 320,300 C270,360 370,440 320,539.16 A240,240 0 0 0 320,60.84 Z"/>
            </clipPath>
            <mask id="cutoutKdMask" maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="600">
              <rect x="0" y="0" width="600" height="600" fill="#fff"/>
              <g fill="none" stroke="#000" strokeWidth="36" strokeLinecap="square" strokeLinejoin="miter">
                <line x1="222" y1="168" x2="222" y2="432"/>
                <line x1="222" y1="300" x2="334" y2="168"/>
                <line x1="222" y1="300" x2="334" y2="432"/>
                <line x1="334" y1="168" x2="334" y2="432"/>
                <path d="M334,168 C446,168 452,300 452,300 C452,300 446,432 334,432" fill="none"/>
              </g>
            </mask>
          </defs>
          <circle cx="300" cy="300" r="240" fill="#ffffff"/>
          <g mask="url(#cutoutKdMask)">
            <g clipPath="url(#leftHalfClip)">
              <rect x="0" y="0" width="600" height="600" fill="url(#earthGradLogo)"/>
              <g stroke="#4a6072" strokeWidth="1.5" fill="none" opacity="0.55">
                <ellipse cx="300" cy="300" rx="140" ry="238"/>
                <ellipse cx="300" cy="300" rx="70" ry="238"/>
                <path d="M60,220 A240,60 0 0 0 300,260"/>
                <path d="M60,380 A240,60 0 0 1 300,340"/>
              </g>
            </g>
            <g clipPath="url(#rightHalfClip)">
              <rect x="0" y="0" width="600" height="600" fill="url(#sunGradLogo)"/>
              <g stroke="#fff0d6" strokeWidth="1.5" fill="none" opacity="0.6">
                <circle cx="300" cy="300" r="70"/>
                <circle cx="300" cy="300" r="130"/>
                <line x1="380" y1="120" x2="410" y2="95"/>
                <line x1="440" y1="180" x2="475" y2="160"/>
                <line x1="460" y1="300" x2="500" y2="300"/>
                <line x1="440" y1="420" x2="475" y2="440"/>
                <line x1="380" y1="480" x2="410" y2="505"/>
              </g>
            </g>
          </g>
          <circle cx="300" cy="300" r="240" fill="none" stroke="#0c1218" strokeWidth="3"/>
        </svg>
      </div>

      {/* Brand Name Typography */}
      <div className="flex flex-col">
        <span className={`font-display font-extrabold tracking-wider text-white leading-tight ${
          isLarge ? 'text-2xl md:text-4xl' : isSmall ? 'text-sm' : 'text-lg'
        }`}>
          KD GLOBAL
        </span>
        <span className={`font-sans font-bold tracking-[0.25em] text-[#d99a3c] uppercase leading-none ${
          isLarge ? 'text-xs md:text-sm mt-1' : isSmall ? 'text-[9px]' : 'text-[11px]'
        }`}>
          SUN ENERGY
        </span>
      </div>
    </div>
  );
};
