import React from 'react';
import { Award, Cpu, ShieldCheck, TrendingUp, Leaf, CheckCircle2 } from 'lucide-react';

export const WhyUsSection = () => {
  const advantages = [
    {
      title: 'Premium Engineering',
      desc: 'Precision CAD site layouts, shade analysis, and high-efficiency electrical string design tailored for maximum irradiance.',
      icon: Award,
      stat: '99.8%',
      statLabel: 'System Efficiency'
    },
    {
      title: 'Smart Technology',
      desc: 'IoT-enabled microinverters, cloud telemetry, and automated solar tracker control systems.',
      icon: Cpu,
      stat: '24/7',
      statLabel: 'AI Telemetry'
    },
    {
      title: 'Reliable Installation',
      desc: 'Certified master technicians adhering to ISO safety standards and local grid code compliance.',
      icon: ShieldCheck,
      stat: '500+ MW',
      statLabel: 'Installed Global Capacity'
    },
    {
      title: 'Long-Term Performance',
      desc: 'Linear performance warranty guaranteeing >85% power output after 25 full operational years.',
      icon: TrendingUp,
      stat: '25 Yrs',
      statLabel: 'Performance Warranty'
    },
    {
      title: 'Sustainable Energy',
      desc: '100% clean, renewable power generation reducing gigatons of carbon emissions across urban infrastructure.',
      icon: Leaf,
      stat: '100%',
      statLabel: 'Clean Zero Carbon'
    }
  ];

  return (
    <section id="why-us" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
          <span className="w-8 h-[2px] bg-amber-400" />
          <span>04 / Comparative Advantage</span>
          <span className="w-8 h-[2px] bg-amber-400" />
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight mb-6">
          WHY <span className="text-gradient-gold">KD GLOBAL SUN ENERGY.</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg font-light">
          We set the gold standard in modern solar EPC through relentless technical perfection, bankable guarantees, and state-of-the-art engineering.
        </p>
      </div>

      {/* Grid of Advantages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {advantages.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div
              key={idx}
              className="glass-panel glass-panel-hover p-8 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Metric Display */}
                <div className="flex items-baseline justify-between mb-6 pb-6 border-b border-white/10">
                  <div>
                    <span className="font-display font-extrabold text-4xl sm:text-5xl text-gradient-gold">
                      {item.stat}
                    </span>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                      {item.statLabel}
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <IconComp className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-amber-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>KD Global Quality Standard</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
