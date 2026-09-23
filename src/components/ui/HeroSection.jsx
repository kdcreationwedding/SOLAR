import React from 'react';
import { Logo } from './Logo';
import { Sun, Sparkles, ChevronRight } from 'lucide-react';

export const HeroSection = ({ onExploreClick, onContactClick }) => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Top Natural Sky & Eco Energy Atmosphere Tag */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/40 text-emerald-300 text-xs font-semibold uppercase tracking-widest animate-bounce shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Eco-Smart Solar Energy Architecture</span>
        </div>
      </div>

      {/* Main Content Hero Center */}
      <div className="flex flex-col items-center text-center my-auto max-w-4xl mx-auto">
        {/* Brand Logo Focal Point */}
        <div className="mb-8 transform hover:scale-105 transition-transform duration-500">
          <Logo size="large" />
        </div>

        {/* Ultra-Vibrant Solar Gold & Electric Cyber Neon Headline Colors */}
        <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight uppercase leading-[1.08] mb-5 drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]">
          <span className="text-slate-50 drop-shadow-[0_4px_16px_rgba(251,191,36,0.6)]">POWERING A</span> <br />
          <span className="bg-gradient-to-r from-[#FFEA00] via-[#FF9100] to-[#FF3D00] bg-clip-text text-transparent drop-shadow-[0_0_45px_rgba(255,145,0,0.9)]">
            BRIGHTER
          </span>{' '}
          <span className="bg-gradient-to-r from-[#00F5FF] via-[#00FFC8] to-[#00E676] bg-clip-text text-transparent drop-shadow-[0_0_45px_rgba(0,255,200,0.9)]">
            TOMORROW.
          </span>
        </h1>

        {/* Primary Semantic Keyword Badge for Search Engines */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/25 via-orange-500/25 to-amber-500/25 border-2 border-amber-400/60 text-amber-300 text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-6 backdrop-blur-md shadow-[0_0_30px_rgba(251,191,36,0.35)]">
          <span>KD Global Sun Energy | Turnkey Solar EPC Company in Gujarat &amp; Ahmedabad</span>
        </div>

        {/* Subheadline */}
        <p className="text-lg sm:text-2xl text-slate-100 max-w-3xl font-light tracking-wide mb-10 leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
          Smart Solar EPC Solutions • Ground-Mounted Power Plants • Industrial Rooftop PV
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-emerald-500 to-amber-500 text-white font-extrabold uppercase text-xs sm:text-sm tracking-widest hover:brightness-110 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-3 group"
          >
            <span>Explore Solar Solutions</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onContactClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel hover:border-emerald-400/50 border border-white/30 text-white font-bold uppercase text-xs sm:text-sm tracking-widest transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Sun className="w-4 h-4 text-amber-400" />
            <span>Talk to Our Experts</span>
          </button>
        </div>
      </div>

      {/* Bottom Scroll Prompt Indicator */}
      <div className="flex flex-col items-center justify-center gap-2 pt-8 text-slate-300">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-300">
          Scroll to Witness Sun Rise & Sunset Journey
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-amber-400/40 flex items-start justify-center p-1 bg-black/30 backdrop-blur-md">
          <div className="w-1.5 h-3 bg-amber-400 rounded-full animate-bounce mt-1 shadow-[0_0_10px_#FBBF24]" />
        </div>
      </div>
    </section>
  );
};
