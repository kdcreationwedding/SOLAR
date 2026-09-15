import React from 'react';

export const Logo = ({ size = "medium", className = "" }) => {
  const isLarge = size === "large";
  const isSmall = size === "small";

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/logo.png"
        alt="KD GLOBAL SUN ENERGY PRIVATE LIMITED"
        className={`object-contain filter drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] hover:scale-105 transition-all duration-300 ${
          isLarge
            ? 'h-20 sm:h-28 max-w-[280px] sm:max-w-[460px]'
            : isSmall
            ? 'h-9 sm:h-11 max-w-[170px] sm:max-w-[240px]'
            : 'h-12 sm:h-14 max-w-[220px] sm:max-w-[300px]'
        }`}
      />
    </div>
  );
};


