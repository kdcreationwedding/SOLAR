import React, { useState } from 'react';
import { ShieldCheck, Zap, Globe, Image as ImageIcon } from 'lucide-react';

export const IntroSection = () => {
  const [imgErrors, setImgErrors] = useState({});

  const handleImgError = (key) => {
    setImgErrors(prev => ({ ...prev, [key]: true }));
  };

  return (
    <section id="intro" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="glass-panel p-8 sm:p-14 md:p-16 rounded-3xl border border-amber-500/20 shadow-2xl relative overflow-hidden">
        {/* Background Subtle Solar Pattern */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-solar-radial pointer-events-none opacity-40" />

        <div className="max-w-4xl mx-auto">
          {/* Section Header Tag */}
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-8 h-[2px] bg-amber-400" />
            <span>02 / Company Vision & Infrastructure</span>
          </div>

          {/* Large Editorial Typography */}
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-8">
            At <span className="text-amber-400">KD GLOBAL SUN ENERGY</span>, we engineer high-performance renewable power infrastructures that turn endless sunlight into reliable, clean independence across India and Global Markets.
          </h2>

          <p className="text-slate-300 text-base sm:text-xl font-light leading-relaxed mb-10">
            Combining cutting-edge solar photovoltaics with smart energy management systems, we empower residential owners, commercial enterprises, and industrial mega-sites to accelerate their zero-carbon journey with maximum ROI and lifetime reliability.
          </p>

          {/* Company Facility Showcase Image Slots */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <div className="relative h-56 rounded-2xl border border-white/15 overflow-hidden bg-slate-900 group">
              {!imgErrors['office'] ? (
                <img
                  src="/images/facility-office.jpg"
                  alt="KD Global Solar Tower Headquarters"
                  onError={() => handleImgError('office')}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#0F172A] to-[#1E3A8A]">
                  <ImageIcon className="w-8 h-8 text-amber-400 mb-2 opacity-70" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Headquarters & HQ Office</span>
                  <span className="text-[10px] text-slate-400 mt-1">Image slot: public/images/facility-office.jpg</span>
                </div>
              )}
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md text-amber-300 text-xs font-bold border border-amber-400/30">
                GIFT City Global HQ
              </div>
            </div>

            <div className="relative h-56 rounded-2xl border border-white/15 overflow-hidden bg-slate-900 group">
              {!imgErrors['epc'] ? (
                <img
                  src="/images/facility-epc.jpg"
                  alt="Solar EPC On-Site Execution"
                  onError={() => handleImgError('epc')}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#0F172A] to-[#1E3A8A]">
                  <ImageIcon className="w-8 h-8 text-amber-400 mb-2 opacity-70" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">On-Site Solar EPC Operations</span>
                  <span className="text-[10px] text-slate-400 mt-1">Image slot: public/images/facility-epc.jpg</span>
                </div>
              )}
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md text-amber-300 text-xs font-bold border border-amber-400/30">
                Global Turnkey EPC Site
              </div>
            </div>
          </div>

          {/* Editorial Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Max Efficiency</h3>
                <p className="text-slate-400 text-sm">Tier-1 mono PERC and N-Type cell technology for maximum energy yield.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">25-Year Warranty</h3>
                <p className="text-slate-400 text-sm">End-to-end performance guarantees backed by engineering excellence.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Global Standards</h3>
                <p className="text-slate-400 text-sm">Turnkey EPC solutions meeting rigorous international safety and quality standards.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
