import React, { useState } from 'react';
import { Leaf, Trees, Globe, Zap, Calculator } from 'lucide-react';

export const ImpactSection = () => {
  const [systemSizeKW, setSystemSizeKW] = useState(100); // 10 kW to 500 kW slider

  // Impact formulas
  const annualKWh = Math.round(systemSizeKW * 1450); // ~1450 kWh per kW/yr
  const co2OffsetTons = (annualKWh * 0.000705).toFixed(1); // Tons of CO2
  const equivalentTrees = Math.round(co2OffsetTons * 45); // ~45 trees per ton
  const coalAvoidedLbs = Math.round(annualKWh * 0.85);

  return (
    <section id="impact" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-amber-500/20 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-8 h-[2px] bg-amber-400" />
            <span>07 / Environmental Footprint</span>
            <span className="w-8 h-[2px] bg-amber-400" />
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight mb-4">
            MEASURABLE <span className="text-gradient-gold">SOLAR IMPACT.</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light">
            Every kilowatt installed by KD GLOBAL SUN ENERGY actively displaces fossil fuels and accelerates carbon neutrality.
          </p>
        </div>

        {/* Interactive Impact Calculator Box */}
        <div className="bg-black/50 p-6 sm:p-10 rounded-2xl border border-white/10 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white uppercase text-base">
                  Interactive Impact Estimator
                </h3>
                <p className="text-xs text-slate-400">Adjust proposed solar system size to calculate annual ecological savings.</p>
              </div>
            </div>

            {/* Slider */}
            <div className="w-full md:w-72">
              <div className="flex justify-between items-center text-xs font-bold mb-2">
                <span className="text-slate-300">System Capacity:</span>
                <span className="text-amber-400 font-mono text-base">{systemSizeKW} kWp</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={systemSizeKW}
                onChange={(e) => setSystemSizeKW(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>

          {/* Result Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center flex flex-col items-center">
              <Zap className="w-8 h-8 text-amber-400 mb-3" />
              <span className="font-display font-extrabold text-3xl text-white mb-1">
                {annualKWh.toLocaleString()}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                kWh Clean Energy / Year
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center flex flex-col items-center">
              <Globe className="w-8 h-8 text-amber-400 mb-3" />
              <span className="font-display font-extrabold text-3xl text-gradient-gold mb-1">
                {co2OffsetTons}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Metric Tons CO₂ Offset
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center flex flex-col items-center">
              <Trees className="w-8 h-8 text-emerald-400 mb-3" />
              <span className="font-display font-extrabold text-3xl text-emerald-400 mb-1">
                {equivalentTrees.toLocaleString()}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Trees Planted Equivalent
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center flex flex-col items-center">
              <Leaf className="w-8 h-8 text-amber-500 mb-3" />
              <span className="font-display font-extrabold text-3xl text-white mb-1">
                {coalAvoidedLbs.toLocaleString()}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Lbs Coal Avoided
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
