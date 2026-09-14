import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { SunCanvas } from './components/canvas/SunCanvas';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/ui/HeroSection';
import { IntroSection } from './components/ui/IntroSection';
import { LeadershipSection } from './components/ui/LeadershipSection';
import { SolutionsSection } from './components/ui/SolutionsSection';
import { WhyUsSection } from './components/ui/WhyUsSection';
import { TechSection } from './components/ui/TechSection';
import { ProjectsSection } from './components/ui/ProjectsSection';
import { ImpactSection } from './components/ui/ImpactSection';
import { CtaSection } from './components/ui/CtaSection';
import { FooterSection } from './components/ui/FooterSection';
import { Modal } from './components/ui/Modal';

gsap.registerPlugin(ScrollTrigger);

function lerpColor(c1, c2, factor) {
  const r = Math.round(c1[0] + (c2[0] - c1[0]) * factor);
  const g = Math.round(c1[1] + (c2[1] - c1[1]) * factor);
  const b = Math.round(c1[2] + (c2[2] - c1[2]) * factor);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [modalState, setModalState] = useState({ isOpen: false, data: null, type: 'solution' });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: true,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', () => {
      ScrollTrigger.update();
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const normProgress = Math.min(1, Math.max(0, window.scrollY / totalScroll));
        setScrollProgress(normProgress);
      }
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const normProgress = Math.min(1, Math.max(0, window.scrollY / totalScroll));
        setScrollProgress(normProgress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const openContactModal = () => {
    setModalState({ isOpen: true, data: null, type: 'contact' });
  };

  const openItemModal = (item, type = 'solution') => {
    setModalState({ isOpen: true, data: item, type });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, data: null, type: 'solution' });
  };

  const scrollToSolutions = () => {
    const el = document.getElementById('solutions');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const getSkyBackground = () => {
    const p = Math.min(1, Math.max(0, scrollProgress));

    const stops = [
      { p: 0.0,  top: [11, 18, 30],   bot: [31, 51, 84] },   // Sunrise Dawn
      { p: 0.45, top: [11, 25, 46],   bot: [30, 58, 138] },  // Midday Azure Blue
      { p: 0.75, top: [30, 27, 75],   bot: [194, 65, 12] },  // Golden Hour Amber
      { p: 1.00, top: [69, 26, 3],    bot: [23, 37, 84] }    // Deep Sunset Footer
    ];

    let topColor = 'rgb(11, 18, 30)';
    let botColor = 'rgb(31, 51, 84)';

    if (p <= stops[1].p) {
      const t = p / stops[1].p;
      topColor = lerpColor(stops[0].top, stops[1].top, t);
      botColor = lerpColor(stops[0].bot, stops[1].bot, t);
    } else if (p <= stops[2].p) {
      const t = (p - stops[1].p) / (stops[2].p - stops[1].p);
      topColor = lerpColor(stops[1].top, stops[2].top, t);
      botColor = lerpColor(stops[1].bot, stops[2].bot, t);
    } else {
      const t = (p - stops[2].p) / (stops[3].p - stops[2].p);
      topColor = lerpColor(stops[2].top, stops[3].top, t);
      botColor = lerpColor(stops[2].bot, stops[3].bot, t);
    }

    return `linear-gradient(to bottom, ${topColor} 0%, ${botColor} 100%)`;
  };

  return (
    <div
      className="relative min-h-screen text-slate-100 transition-[background] duration-500 ease-out overflow-x-hidden selection:bg-amber-400 selection:text-black"
      style={{ background: getSkyBackground() }}
    >
      {/* 3D WebGL Background Canvas */}
      <SunCanvas scrollProgress={scrollProgress} />

      {/* Soft Sunset Radial Aura */}
      <div
        className="fixed inset-0 pointer-events-none transition-opacity duration-1000 ease-out z-0"
        style={{
          opacity: Math.max(0, (scrollProgress - 0.6) * 2.5),
          background: 'radial-gradient(ellipse at bottom, rgba(249, 115, 22, 0.3) 0%, rgba(255, 199, 44, 0.12) 50%, transparent 80%)'
        }}
      />

      {/* Navbar Header */}
      <Navbar onContactClick={openContactModal} scrollProgress={scrollProgress} />

      {/* Main Page Sections */}
      <main className="relative z-10">
        <HeroSection
          onExploreClick={scrollToSolutions}
          onContactClick={openContactModal}
        />

        <IntroSection />

        <LeadershipSection />

        <SolutionsSection
          onSelectSolution={(item) => openItemModal(item, 'solution')}
        />

        <WhyUsSection />

        <TechSection />

        <ProjectsSection
          onSelectProject={(proj) => openItemModal(proj, 'project')}
        />

        <ImpactSection />

        <CtaSection onContactClick={openContactModal} />
      </main>

      {/* Footer / Sunset Section */}
      <FooterSection onContactSubmit={(e) => {
        e.preventDefault();
        openContactModal();
      }} />

      {/* Detail & Contact Modal Popup */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        data={modalState.data}
        type={modalState.type}
      />
    </div>
  );
}
