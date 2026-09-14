import React from 'react';
import { Home, Building2, Factory, Sun, Wrench, BatteryCharging, ArrowUpRight } from 'lucide-react';

export const solutionsData = [
  {
    id: 'residential',
    title: 'Residential Solar',
    subtitle: 'Clean Energy for Modern Homes',
    description: 'Custom rooftop solar installations paired with smart home battery storage to eliminate utility bills and provide 24/7 backup power.',
    icon: Home,
    specs: ['3 kW – 20 kW Capacity', 'Smart Battery Backup', 'Mobile App Monitoring', 'Net Metering Ready'],
    bgGradient: 'from-amber-500/20 to-orange-500/10'
  },
  {
    id: 'commercial',
    title: 'Commercial Solar',
    subtitle: 'Optimize Corporate Energy Costs',
    description: 'High-yield photovoltaic systems tailored for office complexes, retail centers, and commercial properties with massive tax incentives.',
    icon: Building2,
    specs: ['50 kW – 500 kW System', 'Rapid ROI (< 3 Years)', 'ESG Sustainability Compliance', 'Zero Capital Expenditure Options'],
    bgGradient: 'from-yellow-500/20 to-amber-600/10'
  },
  {
    id: 'industrial',
    title: 'Industrial Solar',
    subtitle: 'Heavy Power for Manufacturing',
    description: 'Utility-scale megawatt arrays designed for industrial parks, manufacturing plants, and heavy machinery operations.',
    icon: Factory,
    specs: ['1 MW – 50 MW+ Scale', 'High-Voltage Grid Integration', 'Load Shaving & Peak Management', '24/7 Remote Telemetry'],
    bgGradient: 'from-orange-500/20 to-red-500/10'
  },
  {
    id: 'rooftop',
    title: 'Rooftop Solar',
    subtitle: 'Maximize Unused Surface Area',
    description: 'Lightweight, ultra-durable solar mounting architectures engineered to transform roof spaces into revenue-generating solar generators.',
    icon: Sun,
    specs: ['Zero Structural Damage', 'Aerodynamic Ballasted Mounting', 'BIPVs Available', 'Storm Resistant Build'],
    bgGradient: 'from-amber-400/20 to-yellow-500/10'
  },
  {
    id: 'epc',
    title: 'Solar EPC',
    subtitle: 'Turnkey Engineering & Construction',
    description: 'End-to-end Engineering, Procurement, and Construction services covering site feasibility, grid approval, procurement & commissioning.',
    icon: Wrench,
    specs: ['Complete Turnkey EPC', 'Tier-1 Module Procurement', 'Regulatory & Grid Approvals', 'Strict Quality Audits'],
    bgGradient: 'from-yellow-600/20 to-amber-500/10'
  },
  {
    id: 'solutions',
    title: 'Solar Energy Solutions',
    subtitle: 'Microgrids & Battery Energy Storage',
    description: 'Advanced BESS (Battery Energy Storage Systems) and hybrid microgrid infrastructures for uninterrupted continuous zero-carbon energy.',
    icon: BatteryCharging,
    specs: ['LiFePO4 & Flow Batteries', 'Island & Off-Grid Operation', 'AI Load Forecasting', 'Peak Shaving Algorithm'],
    bgGradient: 'from-amber-500/20 to-yellow-400/10'
  }
];

export const SolutionsSection = ({ onSelectSolution }) => {
  return (
    <section id="solutions" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-8 h-[2px] bg-amber-400" />
            <span>03 / Core Capabilities</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
            SOLAR <span className="text-gradient-gold">SOLUTIONS.</span>
          </h2>
        </div>
        <p className="text-slate-400 max-w-md text-sm sm:text-base">
          Tailored engineering solutions designed for maximum energy harvesting, longevity, and seamless energy storage.
        </p>
      </div>

      {/* Grid of 6 Interactive Solution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {solutionsData.map((item) => {
          const IconComp = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onSelectSolution(item)}
              className="group cursor-pointer glass-panel glass-panel-hover p-8 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Top Card Gradient Highlight */}
              <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${item.bgGradient} rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

              <div>
                {/* Icon Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-400">
                    <IconComp className="w-8 h-8" />
                  </div>
                  <div className="p-2 rounded-full border border-white/10 text-slate-400 group-hover:border-amber-400 group-hover:text-amber-400 transition-colors">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-400/90 mb-4">
                  {item.subtitle}
                </p>
                <p className="text-slate-300 text-sm font-light leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Specs Pills */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                {item.specs.slice(0, 2).map((spec, i) => (
                  <span key={i} className="text-[11px] font-medium px-3 py-1 rounded-full bg-white/5 text-slate-300 border border-white/5">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
