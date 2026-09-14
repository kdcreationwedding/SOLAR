import React, { useState } from 'react';
import { Sun, Zap, Sliders, Layers, Activity } from 'lucide-react';

export const TechSection = () => {
  const [sunAngle, setSunAngle] = useState(45); // 0 to 90 degrees
  const [cellTech, setCellTech] = useState('TOPCon'); // 'PERC', 'TOPCon', 'Bifacial'

  // Calculate live energy output based on interactive parameters
  const getTechSpecs = () => {
    const angleRad = (sunAngle * Math.PI) / 180;
    const angleFactor = Math.sin(angleRad); // Peak efficiency at 90 deg

    let baseEff = 22.5;
    let basePower = 580;
    let tempCoeff = "-0.30%/°C";

    if (cellTech === 'TOPCon') {
      baseEff = 24.2;
      basePower = 620;
      tempCoeff = "-0.28%/°C";
    } else if (cellTech === 'Bifacial') {
      baseEff = 25.8;
      basePower = 670;
      tempCoeff = "-0.26%/°C";
    }

    const currentEff = (baseEff * (0.4 + 0.6 * angleFactor)).toFixed(1);
    const currentPower = Math.round(basePower * (0.3 + 0.7 * angleFactor));

    return { currentEff, currentPower, baseEff, tempCoeff };
  };

  const specs = getTechSpecs();

  return (
    <section id="technology" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="glass-panel p-8 sm:p-12 md:p-16 rounded-3xl border border-amber-500/20 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-8 h-[2px] bg-amber-400" />
              <span>05 / Interactive Technology Lab</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
              ADVANCED <span className="text-gradient-gold">PHOTOVOLTAICS.</span>
            </h2>
          </div>
          <p className="text-slate-300 max-w-md text-sm sm:text-base">
            Explore how solar irradiance angle and next-generation N-Type silicon cell physics maximize real-time kilowatt-hour generation.
          </p>
        </div>

        {/* Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-8 glass-panel p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Sliders className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-white uppercase text-sm tracking-wider">
                Simulation Controls
              </h3>
            </div>

            {/* Cell Technology Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                Select Solar Cell Architecture:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'PERC', name: 'Mono PERC' },
                  { id: 'TOPCon', name: 'N-Type TOPCon' },
                  { id: 'Bifacial', name: 'Bifacial Glass' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setCellTech(t.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                      cellTech === t.id
                        ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(255,184,0,0.4)]'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sun Angle Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-400" />
                  Sun Incident Angle:
                </label>
                <span className="font-mono text-sm font-bold text-amber-400">{sunAngle}°</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                value={sunAngle}
                onChange={(e) => setSunAngle(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>10° Low Horizon</span>
                <span>45° Midday</span>
                <span>90° Direct Overhead</span>
              </div>
            </div>

            {/* Live Metrics readout */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Module Efficiency</span>
                <span className="font-display font-extrabold text-2xl text-amber-400">{specs.currentEff}%</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Power Output</span>
                <span className="font-display font-extrabold text-2xl text-white">{specs.currentPower} W/m²</span>
              </div>
            </div>
          </div>

          {/* Visual Energy Flow Diagram */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-2xl border border-white/10 flex flex-col items-center justify-center relative min-h-[360px]">
            {/* Dynamic Solar Ray Visualization */}
            <div className="relative w-full h-64 flex items-center justify-center">
              {/* Sun Light Vector */}
              <div
                className="absolute top-4 transition-all duration-500 flex flex-col items-center"
                style={{
                  transform: `translateX(${(sunAngle - 50) * 2}px)`
                }}
              >
                <div className="w-14 h-14 rounded-full bg-amber-400 shadow-[0_0_40px_rgba(255,184,0,0.8)] flex items-center justify-center text-black font-extrabold">
                  <Sun className="w-8 h-8 animate-spin-slow" />
                </div>
                {/* Ray Beams */}
                <div
                  className="w-1 h-32 bg-gradient-to-b from-amber-400/80 to-transparent transition-all duration-500"
                  style={{
                    transform: `rotate(${90 - sunAngle}deg)`,
                    transformOrigin: 'top center'
                  }}
                />
              </div>

              {/* Solar Panel Module Surface */}
              <div className="absolute bottom-6 w-full max-w-md h-20 rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-2 border-amber-500/50 shadow-2xl flex items-center justify-around px-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="w-12 h-14 rounded bg-blue-950/60 border border-blue-500/30 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-amber-400 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Energy Flow Bar */}
            <div className="w-full mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                Live Inverter Feed: Pure Sinewave
              </span>
              <span className="font-mono text-amber-400 font-bold">
                Grid Frequency: 50.00 Hz
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
