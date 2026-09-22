import React from 'react';
import { Logo } from './Logo';
import { Mail, Phone, MapPin, Send, ArrowUp, Building, UserCheck } from 'lucide-react';

export const FooterSection = ({ onContactSubmit }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 border-t border-amber-500/20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        {/* Brand Overview & Directors */}
        <div className="lg:col-span-5 space-y-6">
          <Logo size="large" />
          <p className="text-slate-300 text-sm font-light leading-relaxed max-w-md">
            KD GLOBAL SUN ENERGY is a premier global solar energy EPC leader specializing in commercial, industrial mega-parks, utility solar projects, and smart microgrid battery storage.
          </p>

          {/* Board Directors Summary Badge */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-md space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4" /> Board of Directors
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-semibold text-white pt-1">
              <div>• Mr. Mahesh (CMD)</div>
              <div>• Mr. Dhiral Mistri</div>
              <div>• Mr. Darshil Patel</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-wider uppercase">
              Corporate HQ: GIFT City, Gandhinagar, Gujarat
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-slate-300 text-xs font-semibold">
              Powering tomorrow.
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-xs font-medium text-slate-300">
            <li><a href="#hero" className="hover:text-amber-400 transition-colors">Home</a></li>
            <li><a href="#intro" className="hover:text-amber-400 transition-colors">About KD Global</a></li>
            <li><a href="#leadership" className="hover:text-amber-400 transition-colors">Board of Directors</a></li>
            <li><a href="#solutions" className="hover:text-amber-400 transition-colors">Solar Solutions</a></li>
            <li><a href="#technology" className="hover:text-amber-400 transition-colors">Solar Tech Lab</a></li>
            <li><a href="#projects" className="hover:text-amber-400 transition-colors">Global & India Projects</a></li>
            <li><a href="#impact" className="hover:text-amber-400 transition-colors">Energy Impact Calculator</a></li>
          </ul>
        </div>

        {/* Contact Info & GIFT City Headquarters */}
        <div className="lg:col-span-4 space-y-6">
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
            Corporate Office & Contact
          </h4>
          <div className="space-y-3.5 text-xs text-slate-200">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong className="text-white block">Corporate HQ Office:</strong>
                1805–1804, Flex One, GIFT City, Gandhinagar, Gujarat, India.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <a href="tel:+916352184521" className="hover:text-amber-300 font-mono text-sm font-bold text-white transition-colors">
                +91 63521 84521
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <a href="mailto:kdglobalsunenergy@gmail.com" className="hover:text-amber-300 font-mono text-xs text-white transition-colors">
                kdglobalsunenergy@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <Building className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="text-[11px] text-slate-300">Headquarters: 1805-1804 Flex One, GIFT City</span>
            </div>
          </div>

          {/* Quick Newsletter Signup */}
          <form onSubmit={onContactSubmit} className="pt-2">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Subscribe to Solar Energy Insights
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter corporate email..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold hover:brightness-110 transition-all flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Legal & Scroll Top Bar */}
      <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p>© 2026 KD GLOBAL SUN ENERGY PRIVATE LIMITED, GIFT City, Gandhinagar, Gujarat, India. All rights reserved. Powering tomorrow.</p>

        <button
          onClick={scrollToTop}
          className="p-3 rounded-full glass-panel hover:glass-panel-gold border border-white/20 text-amber-300 transition-all flex items-center gap-2 group"
        >
          <span className="text-[10px] font-bold uppercase tracking-wider">Back to Top</span>
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
};
