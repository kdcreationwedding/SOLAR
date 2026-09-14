import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, ArrowUpRight, Sun, PhoneCall, MessageSquare } from 'lucide-react';

export const Navbar = ({ onContactClick, scrollProgress = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openWhatsAppDirect = () => {
    const text = `Hello KD GLOBAL SUN ENERGY team! ☀️ I would like to inquire about a solar project for my property.`;
    window.open(`https://wa.me/916352184521?text=${encodeURIComponent(text)}`, '_blank');
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#intro' },
    { label: 'Directors', href: '#leadership' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Technology', href: '#technology' },
    { label: 'Projects', href: '#projects' },
    { label: 'Impact', href: '#impact' },
    { label: 'Inquiries Table', href: '#admin' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 bg-[#050608]/85 backdrop-blur-xl border-b border-amber-500/20 shadow-2xl'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <Logo size={isScrolled ? "small" : "medium"} />
        </a>

        {/* Desktop Links */}
        <nav className="hidden xl:flex items-center gap-6 glass-panel px-6 py-2.5 rounded-full border border-white/10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-wider text-slate-200 hover:text-amber-400 transition-colors relative py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Buttons (Call + WhatsApp) */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={openWhatsAppDirect}
            className="px-4 py-2 rounded-full bg-emerald-500/20 hover:bg-emerald-500 hover:text-black border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            WhatsApp
          </button>

          <button
            onClick={onContactClick}
            className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 rounded-full animate-pulse-glow" />
            <span className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#08090C] text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 group-hover:bg-opacity-90 group-hover:text-amber-300">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              Inquire Now
            </span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex xl:hidden items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-full bg-slate-900/80 border border-amber-500/30 text-amber-400 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Fullscreen Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] bg-[#050608]/95 backdrop-blur-2xl z-40 xl:hidden flex flex-col justify-between p-8 animate-in fade-in duration-300 overflow-y-auto">
          <nav className="flex flex-col gap-4 mt-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-display font-bold text-slate-100 hover:text-amber-400 transition-colors flex items-center justify-between border-b border-white/5 pb-2"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-5 h-5 text-amber-500" />
              </a>
            ))}
          </nav>

          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={openWhatsAppDirect}
              className="w-full py-3.5 rounded-xl bg-emerald-500 text-black font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageSquare className="w-4 h-4 fill-black" />
              Direct WhatsApp (+91 63521 84521)
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onContactClick();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg"
            >
              <Sun className="w-4 h-4 fill-black" />
              Talk to Our Experts
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
