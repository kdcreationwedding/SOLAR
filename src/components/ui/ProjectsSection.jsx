import React, { useState } from 'react';
import { MapPin, Zap, ArrowUpRight, Filter } from 'lucide-react';

export const projectsData = [
  {
    id: 'p1',
    name: 'Charanka Ultra Solar Park',
    category: 'Industrial',
    location: 'Patan, Gujarat, India',
    capacity: '120 MW',
    type: 'Utility-Scale Ground Mount EPC',
    year: '2025',
    image: '/images/project1.svg',
    description: 'Flagship mega-scale utility park in Charanka generating 185 GWh annually, featuring single-axis automated solar trackers and high-voltage grid substations.',
    metrics: { co2Saved: '145,000 Tons/Yr', homesPowered: '98,000', panels: '245,000 Units' }
  },
  {
    id: 'p2',
    name: 'Dholera SIR Mega Solar Complex',
    category: 'Industrial',
    location: 'Dholera SIR, Gujarat, India',
    capacity: '85 MW',
    type: 'Industrial Captive Power Plant',
    year: '2025',
    image: '/images/project2.svg',
    description: 'Special Investment Region captive solar installation powering green industrial manufacturing with high-voltage 220kV grid connection.',
    metrics: { co2Saved: '102,000 Tons/Yr', homesPowered: '65,000', panels: '170,000 Units' }
  },
  {
    id: 'p3',
    name: 'Sanand Automotive Commercial Hub',
    category: 'Commercial',
    location: 'Sanand, Ahmedabad, Gujarat, India',
    capacity: '18.5 MW',
    type: 'Rooftop Solar & Carport BESS',
    year: '2025',
    image: '/images/project3.svg',
    description: 'High-yield commercial rooftop array covering 150,000 sq ft across manufacturing roofs with integrated 10 MWh lithium battery storage.',
    metrics: { co2Saved: '22,400 Tons/Yr', homesPowered: '14,500', panels: '37,000 Units' }
  },
  {
    id: 'p4',
    name: 'Hazira Heavy Engineering EPC',
    category: 'Industrial',
    location: 'Hazira, Surat, Gujarat, India',
    capacity: '45 MW',
    type: 'Coastal High-Wind Load Solar EPC',
    year: '2026',
    image: '/images/project4.svg',
    description: 'Heavy industrial solar facility engineered with anti-corrosive marine coatings and 180 km/h hurricane wind load resistance.',
    metrics: { co2Saved: '56,000 Tons/Yr', homesPowered: '36,000', panels: '90,000 Units' }
  },
  {
    id: 'p5',
    name: 'GIFT City Financial Hub Rooftops',
    category: 'Commercial',
    location: 'GIFT City, Gandhinagar, Gujarat, India',
    capacity: '12.5 MW',
    type: 'Smart Urban Commercial Microgrid',
    year: '2025',
    image: '/images/project5.svg',
    description: 'Ultra-modern rooftop integration across international financial towers with real-time AI cloud monitoring and net-metering.',
    metrics: { co2Saved: '15,200 Tons/Yr', homesPowered: '9,800', panels: '25,000 Units' }
  },
  {
    id: 'p6',
    name: 'Kutch Sun Valley Eco Township',
    category: 'Residential',
    location: 'Bhuj, Kutch, Gujarat, India',
    capacity: '6.8 MW',
    type: 'Smart Community Solar & Storage',
    year: '2026',
    image: '/images/project6.svg',
    description: 'Zero-emission solar residential estate equipped with integrated solar roof tiles, EV fast chargers, and smart microgrid battery backup.',
    metrics: { co2Saved: '8,400 Tons/Yr', homesPowered: '5,200', panels: '13,500 Units' }
  }
];

export const ProjectsSection = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Industrial', 'Commercial', 'Residential'];

  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-8 h-[2px] bg-amber-400" />
            <span>06 / Gujarat & India Portfolio</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
            FEATURED <span className="bg-gradient-to-r from-white via-amber-300 to-orange-500 bg-clip-text text-transparent">GUJARAT PROJECTS.</span>
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-amber-400 mr-2 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex-shrink-0 ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-[0_0_15px_rgba(249,115,22,0.4)]'
                  : 'glass-panel text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="group cursor-pointer glass-panel glass-panel-hover rounded-3xl border border-white/10 overflow-hidden relative flex flex-col justify-between"
          >
            {/* Project Image Banner with Local High-Res Vector Image */}
            <div className="relative h-64 w-full overflow-hidden bg-slate-950">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                onError={(e) => {
                  // Fallback to stylized SVG placeholder if loading fails
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/20 to-transparent" />

              {/* Capacity Badge */}
              <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full glass-panel-gold border border-amber-400/40 text-amber-300 font-display font-extrabold text-xs flex items-center gap-1.5 shadow-xl">
                <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {project.capacity}
              </div>

              {/* Location Tag (Gujarat, India) */}
              <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-amber-400/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {project.location}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block mb-2">
                  {project.type} • {project.year}
                </span>
                <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {project.name}
                </h3>
                <p className="text-slate-300 text-xs font-light leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Bottom Specs Bar */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">
                  CO₂ Offset: <strong className="text-amber-400">{project.metrics.co2Saved}</strong>
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>View Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
