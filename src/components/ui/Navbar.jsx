import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, ArrowUpRight, Sun, Moon, PhoneCall, MessageSquare, User, LogOut, Lock } from 'lucide-react';

export const Navbar = ({ onContactClick, onAuthClick, onLogout, user, theme = 'light', onToggleTheme }) => {
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
    { label: 'About', href: '#intro' },
    { label: 'Directors', href: '#leadership' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Projects', href: '#projects' },
    { label: 'Impact', href: '#impact' },
  ];

  if (user) {
    navLinks.push({ label: 'Portal', href: '#admin' });
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-2.5 bg-[#050608]/90 backdrop-blur-xl border-b border-amber-500/20 shadow-xl'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-2 group flex-shrink-0">
          <Logo size={isScrolled ? "small" : "medium"} />
        </a>

        {/* Streamlined Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 glass-panel px-5 py-2 rounded-full border border-white/10 shadow-inner">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-amber-400 transition-colors relative py-0.5 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Theme Toggle Button (Light/Dark Switch) */}
          <button
            onClick={onToggleTheme}
            title={theme === 'light' ? "Switch to Dark Theme" : "Switch to Light Theme"}
            className="p-2 rounded-full bg-white/10 hover:bg-emerald-500 hover:text-black border border-white/20 text-amber-300 font-bold transition-all flex items-center justify-center shadow-md"
          >
            {theme === 'light' ? <Moon className="w-4 h-4 text-slate-800" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* User Auth Status */}
          {user ? (
            <div className="flex items-center gap-1.5">
              <a
                href="#admin"
                className="px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center gap-1.5 hover:bg-amber-500/30 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span className="max-w-[100px] truncate">{user.user_metadata?.full_name || user.name || user.email?.split('@')[0]}</span>
              </a>
              <button
                onClick={onLogout}
                title="Log Out"
                className="p-1.5 rounded-full bg-rose-500/10 hover:bg-rose-500 hover:text-white border border-rose-500/30 text-rose-400 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onAuthClick}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-amber-500 hover:text-black border border-white/15 text-slate-300 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Login</span>
            </button>
          )}

          {/* Quick WhatsApp Button */}
          <button
            onClick={openWhatsAppDirect}
            title="Chat on WhatsApp (+91 63521 84521)"
            className="p-2 rounded-full bg-emerald-500/20 hover:bg-emerald-500 hover:text-black border border-emerald-500/40 text-emerald-400 text-xs font-bold transition-colors flex items-center justify-center"
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </button>

          {/* Main Inquire CTA Button */}
          <button
            onClick={onContactClick}
            className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 rounded-full animate-pulse-glow" />
            <span className="relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#08090C] text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 group-hover:bg-opacity-90 group-hover:text-amber-300">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>Inquire</span>
            </span>
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-slate-900/80 border border-amber-500/30 text-amber-400 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Fullscreen Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[56px] bg-[#050608]/95 backdrop-blur-2xl z-40 lg:hidden flex flex-col justify-between p-6 animate-in fade-in duration-300 overflow-y-auto">
          <nav className="flex flex-col gap-3 mt-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-display font-bold text-slate-100 hover:text-amber-400 transition-colors flex items-center justify-between border-b border-white/5 pb-2"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-amber-500" />
              </a>
            ))}
          </nav>

          <div className="mt-6 flex flex-col gap-2.5">
            {user ? (
              <button
                onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                className="w-full py-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Log Out ({user.email})
              </button>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); onAuthClick(); }}
                className="w-full py-3 rounded-xl bg-amber-500 text-black font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <Lock className="w-4 h-4" />
                Portal Sign In / Register
              </button>
            )}

            <button
              onClick={openWhatsAppDirect}
              className="w-full py-3 rounded-xl bg-emerald-500 text-black font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageSquare className="w-4 h-4 fill-black" />
              Direct WhatsApp (+91 63521 84521)
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onContactClick();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg"
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


