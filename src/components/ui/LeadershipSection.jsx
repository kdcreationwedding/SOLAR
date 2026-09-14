import React, { useState } from 'react';
import { Crown, ShieldCheck, Sparkles } from 'lucide-react';

export const directorsData = [
  {
    id: 'mahesh',
    name: 'Mr. Maheshkumar Parmar',
    role: 'Founder, Chairman & Managing Director (CMD)',
    shortRole: 'Chief Executive & Founder',
    isMain: true,
    bio: 'Chief Executive Founder and visionary leader guiding KD GLOBAL SUN ENERGY’s nationwide solar EPC growth, strategic utility expansion, and clean energy transition across India.',
    image: '/images/director-mahesh.jpg',
    initials: 'MP',
    experience: 'Founder & Main Leader',
    badge: 'Founder & CMD'
  },
  {
    id: 'dhiral',
    name: 'Mr. Dhiral Mistri',
    role: 'Co-Founder & Technical Director',
    shortRole: 'Executive Technical Partner',
    isMain: false,
    bio: 'Executive Partner directing solar PV engineering, high-voltage substation automation, and technical operations establishing Tier-1 quality benchmarks.',
    image: '/images/director-dhiral.jpg',
    initials: 'DM',
    experience: 'Technical Engineering Partner',
    badge: 'Executive Technical Director'
  },
  {
    id: 'darshil',
    name: 'Mr. Darshil Patel',
    role: 'Co-Founder & Operations Director',
    shortRole: 'Executive Operations Partner',
    isMain: false,
    bio: 'Executive Partner heading strategic project execution, commercial site logistics, supply chain optimization, and enterprise solar deployment.',
    image: '/images/director-darshil.jpg',
    initials: 'DP',
    experience: 'Operations & Logistics Partner',
    badge: 'Executive Operations Director'
  }
];

export const LeadershipSection = () => {
  const [imgErrors, setImgErrors] = useState({});

  const handleImageError = (id) => {
    setImgErrors(prev => ({ ...prev, [id]: true }));
  };

  const mainDirector = directorsData.find(d => d.isMain);
  const supportDirectors = directorsData.filter(d => !d.isMain);

  return (
    <section id="leadership" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
          <span className="w-8 h-[2px] bg-amber-400" />
          <span>Corporate Governance</span>
          <span className="w-8 h-[2px] bg-amber-400" />
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight mb-4">
          BOARD OF <span className="bg-gradient-to-r from-white via-amber-300 to-orange-500 bg-clip-text text-transparent">DIRECTORS.</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg font-light">
          Led by Founder & CMD Mr. Maheshkumar Parmar alongside Co-Founding Executive Directors driving Gujarat and India toward clean energy independence.
        </p>
      </div>

      {/* Main Leader Prominent Feature (Mr. Maheshkumar Parmar - CMD) */}
      <div className="mb-12">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border-2 border-amber-400/50 relative overflow-hidden shadow-[0_0_50px_rgba(251,191,36,0.15)] bg-gradient-to-r from-[#0F172A]/90 via-[#1E3A8A]/40 to-[#0F172A]/90">
          {/* Main Crown Founder Tag */}
          <div className="absolute top-0 right-0 px-6 py-2 rounded-bl-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-black font-extrabold text-xs uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
            <Crown className="w-4 h-4 fill-black" />
            <span>Founder & Main Leader</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 pt-4 sm:pt-0">
            {/* Main Emblem Insignia */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-amber-300 via-amber-500 to-orange-500 p-1 shadow-[0_0_30px_rgba(251,191,36,0.5)] flex-shrink-0">
              {!imgErrors[mainDirector.id] ? (
                <img
                  src={mainDirector.image}
                  alt={mainDirector.name}
                  onError={() => handleImageError(mainDirector.id)}
                  className="w-full h-full object-cover rounded-[22px]"
                />
              ) : (
                <div className="w-full h-full rounded-[22px] bg-[#0c1218] flex flex-col items-center justify-center font-display font-black text-4xl text-amber-300 tracking-wider">
                  <span>{mainDirector.initials}</span>
                  <span className="w-8 h-[2px] bg-amber-400 mt-1" />
                </div>
              )}
            </div>

            {/* Main Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{mainDirector.shortRole}</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-1">
                {mainDirector.name}
              </h3>
              <span className="text-sm font-bold uppercase tracking-wider text-amber-400 block mb-4">
                {mainDirector.role}
              </span>
              <p className="text-slate-200 text-sm font-light leading-relaxed max-w-2xl">
                {mainDirector.bio}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Supporting Co-Founding Executive Directors (Mr. Dhiral Mistri & Mr. Darshil Patel) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {supportDirectors.map((director) => (
          <div
            key={director.id}
            className="group glass-panel glass-panel-hover p-8 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 group-hover:h-1.5 transition-all duration-300" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 p-0.5 shadow-[0_0_20px_rgba(251,191,36,0.3)] overflow-hidden">
                  {!imgErrors[director.id] ? (
                    <img
                      src={director.image}
                      alt={director.name}
                      onError={() => handleImageError(director.id)}
                      className="w-full h-full object-cover rounded-[14px]"
                    />
                  ) : (
                    <div className="w-full h-full rounded-[14px] bg-[#0c1218] flex flex-col items-center justify-center font-display font-black text-2xl text-amber-400 tracking-wider">
                      <span>{director.initials}</span>
                      <span className="w-6 h-[1.5px] bg-amber-400/60 mt-0.5" />
                    </div>
                  )}
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-[11px] font-bold tracking-wider uppercase">
                  {director.badge}
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                {director.name}
              </h3>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-4">
                {director.role}
              </span>
              <p className="text-slate-300 text-xs font-light leading-relaxed mb-6">
                {director.bio}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Co-Founding Executive Partner
              </span>
              <span className="font-mono text-[11px] text-amber-400 font-bold">
                {director.experience}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
