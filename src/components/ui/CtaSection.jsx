import React from 'react';
import { Sun, ArrowRight, Sparkles } from 'lucide-react';

export const CtaSection = ({ onContactClick }) => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="glass-panel-gold p-10 sm:p-16 md:p-20 rounded-3xl text-center relative overflow-hidden flex flex-col items-center justify-center border border-amber-500/40 shadow-[0_0_80px_rgba(255,184,0,0.15)]">
        {/* Glow Aura Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles className="w-4 h-4" />
          <span>Ready to Transition to Solar?</span>
        </div>

        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white uppercase tracking-tight leading-[1.08] mb-8 max-w-4xl">
          LET THE SUN <br />
          <span className="text-gradient-sunset">POWER YOUR FUTURE.</span>
        </h2>

        <p className="text-slate-200 text-base sm:text-xl font-light max-w-2xl mb-10 leading-relaxed">
          Contact KD GLOBAL SUN ENERGY today for a comprehensive solar audit, financial payback modeling, and custom engineering proposal.
        </p>

        {/* Magnetic Glow Action Button */}
        <button
          onClick={onContactClick}
          className="group relative overflow-hidden rounded-full p-[2px] transition-all duration-300 transform hover:scale-105"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 rounded-full animate-pulse-glow" />
          <span className="relative inline-flex items-center gap-4 px-10 py-5 rounded-full bg-[#08090C] text-sm sm:text-base font-extrabold uppercase tracking-widest text-white transition-colors group-hover:bg-opacity-80">
            <Sun className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span>Start Your Solar Journey</span>
            <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-2 transition-transform" />
          </span>
        </button>
      </div>
    </section>
  );
};
