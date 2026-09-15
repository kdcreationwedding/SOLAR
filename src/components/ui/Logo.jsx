import React from 'react';

export const Logo = ({ size = "medium", className = "", showText = true }) => {
  const isLarge = size === "large";
  const isSmall = size === "small";

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official KD Global Sun Energy 3D Logo Emblem */}
      <div className={`relative flex items-center justify-center flex-shrink-0 ${
        isLarge ? 'w-16 h-16 sm:w-24 sm:h-24' : isSmall ? 'w-9 h-9' : 'w-12 h-12'
      }`}>
        <img
          src="/logo.png"
          alt="KD GLOBAL SUN ENERGY Logo"
          className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,184,0,0.45)] hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Brand Name Typography */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-display font-extrabold tracking-wider text-white leading-tight ${
            isLarge ? 'text-2xl md:text-4xl' : isSmall ? 'text-sm' : 'text-lg'
          }`}>
            KD GLOBAL
          </span>
          <span className={`font-sans font-bold tracking-[0.25em] text-[#FFB800] uppercase leading-none ${
            isLarge ? 'text-xs md:text-sm mt-1' : isSmall ? 'text-[9px]' : 'text-[11px]'
          }`}>
            SUN ENERGY
          </span>
        </div>
      )}
    </div>
  );
};

