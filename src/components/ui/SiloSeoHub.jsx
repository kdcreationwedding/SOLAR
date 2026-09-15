import React, { useState } from 'react';
import { Sun, Shield, Award, CheckCircle2, Building2, MapPin, Zap, ArrowRight, FileText } from 'lucide-react';

export const SiloSeoHub = ({ onInquire }) => {
  const [activeTab, setActiveTab] = useState('epc');

  const siloSections = {
    epc: {
      id: 'epc',
      tag: 'Turnkey Master EPC',
      title: 'Turnkey Solar EPC Contractor & Renewable Energy Solutions in Gujarat',
      keyword: 'Solar EPC Company Gujarat',
      description: 'KD Global Sun Energy Private Limited delivers end-to-end Turnkey Engineering, Procurement, and Construction (EPC) services for high-voltage ground-mounted utility arrays and megawatt industrial solar projects from our GIFT City HQ.',
      bullets: [
        'Complete GETCO 66kV / 220kV Grid Interconnection & DISCOM Approvals',
        'Tier-1 N-Type TOPCon & Bifacial Solar PV Panel Procurement',
        '25-Year Linear Performance Guarantee & System Performance Warranties',
        'Precision Electrical CAD String Engineering & Shade Irradiance Audits'
      ]
    },
    ground: {
      id: 'ground',
      tag: 'Megawatt Utility Arrays',
      title: 'Utility-Scale Ground-Mounted Solar Power Plants in Gujarat',
      keyword: 'Ground Mounted Solar Gujarat',
      description: 'We specialize in land-based utility solar power development across Gujarat, including Patan Charanka Park, Dholera SIR, and Kutch. Our turnkey ground-mount engineering maximizes Levelized Cost of Energy (LCOE) returns.',
      bullets: [
        'Single-Axis Automated Solar Tracker & Fixed-Tilt Aluminum Structures',
        'Agricultural to Non-Agricultural (NA) Land Conversion & Clearance',
        'High-Efficiency Central Inverters & Step-Up Transformer Substations',
        '24/7 Cloud Telemetry & Automated Robotic Module Cleaning'
      ]
    },
    industrial: {
      id: 'industrial',
      tag: 'GIDC Industrial Rooftops',
      title: 'Industrial Rooftop Solar EPC Systems for Manufacturing Plants',
      keyword: 'Industrial Solar EPC Gujarat',
      description: 'Empowering textile factories, chemical complexes, and heavy manufacturing units across Sanand GIDC, Changodar, Naroda, and Hazira to achieve zero-carbon independence and eliminate monthly peak demand charges.',
      bullets: [
        'Zero Structural Damage Ballasted & Pierced Roof Mounting',
        'High-Voltage Load Shaving & Peak Demand Tariff Management',
        'Accelerated Depreciation (AD) & Substantial Tax Incentive Advisory',
        'CapEx & OpEx / RESCO Business Model Options'
      ]
    },
    ahmedabad: {
      id: 'ahmedabad',
      tag: 'Ahmedabad Region Focus',
      title: 'Leading Solar EPC Company & Solar Panel Installer in Ahmedabad',
      keyword: 'Solar EPC Company Ahmedabad',
      description: 'Headquartered at GIFT City Gandhinagar, KD Global Sun Energy is Ahmedabad’s premier solar EPC contractor, delivering high-performance commercial rooftop and industrial solar installations for enterprise clients.',
      bullets: [
        'Local Service & Rapid On-Site Engineering Response in Ahmedabad',
        'Direct Integration with UGVCL & Torrent Power Net-Metering',
        'Custom Rooftop Solar Carports with Integrated EV Charging Sockets',
        'Proven Track Record Across GIDC Sanand, Odhav, and Vatva'
      ]
    }
  };

  const activeData = siloSections[activeTab];

  return (
    <section id="silo-hub" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 border-t border-amber-500/20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
          <span className="w-8 h-[2px] bg-amber-400"></span>
          <span>08 / Specialized Industry Capabilities</span>
          <span className="w-8 h-[2px] bg-amber-400"></span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight mb-4">
          SOLAR EPC <span className="text-gradient-gold">&amp; UTILITY INFRASTRUCTURE</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base font-light">
          KD Global Sun Energy Private Limited (GIFT City, Gandhinagar) engineers turnkey utility ground-mount arrays and industrial rooftop solar systems.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setActiveTab('epc')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
            activeTab === 'epc'
              ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-lg'
              : 'glass-panel text-slate-300 hover:text-white border border-white/10'
          }`}
        >
          Solar EPC Master
        </button>
        <button
          onClick={() => setActiveTab('ground')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
            activeTab === 'ground'
              ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-lg'
              : 'glass-panel text-slate-300 hover:text-white border border-white/10'
          }`}
        >
          Ground-Mounted Solar
        </button>
        <button
          onClick={() => setActiveTab('industrial')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
            activeTab === 'industrial'
              ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-lg'
              : 'glass-panel text-slate-300 hover:text-white border border-white/10'
          }`}
        >
          Industrial Rooftop Solar
        </button>
        <button
          onClick={() => setActiveTab('ahmedabad')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
            activeTab === 'ahmedabad'
              ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-lg'
              : 'glass-panel text-slate-300 hover:text-white border border-white/10'
          }`}
        >
          Ahmedabad &amp; GIFT City
        </button>
      </div>

      {/* Dynamic Content Display */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-500/30 relative overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
            {activeData.tag}
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            Target Query: <strong className="text-amber-400">{activeData.keyword}</strong>
          </span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-4">
          {activeData.title}
        </h3>

        <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed mb-8">
          {activeData.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {activeData.bullets.map((bullet, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span className="text-xs font-semibold text-slate-200">{bullet}</span>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>HQ Office: 1805–1804, Flex One, GIFT City, Gandhinagar, Gujarat</span>
          </div>
          <button
            onClick={onInquire}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-black font-extrabold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg flex items-center gap-2"
          >
            <span>Request EPC Proposal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
