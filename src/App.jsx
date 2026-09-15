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
import { AuthModal } from './components/ui/AuthModal';
import { AdminInquiriesSection } from './components/ui/AdminInquiriesSection';
import { onAuthStateChange, signOutUser } from './lib/supabase';

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
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. Subscribe to Supabase Auth State Changes
    const { data: authListener } = onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    let lastProgress = -1;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false,
      touchMultiplier: 1.2,
    });

    lenis.on('scroll', () => {
      ScrollTrigger.update();
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const normProgress = Math.min(1, Math.max(0, window.scrollY / totalScroll));
        if (Math.abs(normProgress - lastProgress) > 0.0015) {
          lastProgress = normProgress;
          setScrollProgress(normProgress);
        }
      }
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      authListener?.subscription?.unsubscribe();
      lenis.destroy();
    };
  }, []);

  const handleLogout = async () => {
    await signOutUser();
    setUser(null);
  };

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
      { p: 0.00, top: [15, 23, 42],   bot: [251, 191, 36] },  // 01. Morning Sunrise Dawn (Golden Yellow + Coral)
      { p: 0.35, top: [12, 45, 95],   bot: [56, 189, 248] },  // 02. Midday Azure Sky (Bright Sky Blue)
      { p: 0.70, top: [67, 20, 48],   bot: [194, 65, 12]  },  // 03. Evening Sunset (Fiery Sunset Amber & Twilight)
      { p: 1.00, top: [4, 8, 20],     bot: [15, 23, 42]   }   // 04. Starry Midnight (Cosmic Night Sky)
    ];

    let topColor = 'rgb(15, 23, 42)';
    let botColor = 'rgb(251, 191, 36)';

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
      <Navbar
        onContactClick={openContactModal}
        onAuthClick={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        user={user}
        scrollProgress={scrollProgress}
      />

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

        {/* Protected Inquiries Dashboard - Only Visible When User is Authenticated */}
        {user && <AdminInquiriesSection />}

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

      {/* Auth Modal Popup (Sign Up & Login) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={(authUser) => {
          setUser(authUser);
        }}
      />
    </div>
  );
}

