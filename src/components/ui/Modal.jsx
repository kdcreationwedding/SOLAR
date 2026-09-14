import React, { useState } from 'react';
import { X, CheckCircle2, PhoneCall, Zap, Shield, MapPin, Mail, Phone, Loader2, MessageSquare } from 'lucide-react';
import { Logo } from './Logo';
import { submitInquiryToBackend } from '../../lib/supabase';

export const Modal = ({ isOpen, onClose, data, type = 'solution' }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    capacity: 'Commercial Rooftop (50 - 500 kW)',
    details: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSend = () => {
    const text = `Hello KD GLOBAL SUN ENERGY Team! ☀️\n\nI would like to inquire about a solar energy project:\n\n👤 Name: ${formData.name || 'Customer'}\n📞 Phone: ${formData.phone || 'Not provided'}\n📧 Email: ${formData.email || 'Not provided'}\n⚡ System Capacity: ${formData.capacity}\n📝 Details: ${formData.details || 'General Solar Inquiry'}\n\nSent from KD GLOBAL SUN ENERGY Website.`;
    
    window.open(`https://wa.me/916352184521?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Submit to Supabase DB & Local Express API
    await submitInquiryToBackend(formData);

    // 2. Open Direct WhatsApp Message
    handleWhatsAppSend();

    setLoading(false);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-[#0B0D14] border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-amber-500 hover:text-black text-slate-300 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {formSubmitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white">Inquiry Received & WhatsApp Opened!</h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              Thank you <strong className="text-amber-400">{formData.name}</strong>! Your inquiry has been saved to the database table and sent to our WhatsApp line (<strong className="text-amber-400">+91 63521 84521</strong>).
            </p>
          </div>
        ) : type === 'contact' ? (
          /* Contact Form Modal */
          <div className="space-y-6">
            <Logo size="small" />
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                TALK TO OUR <span className="bg-gradient-to-r from-white via-amber-300 to-orange-500 bg-clip-text text-transparent">SOLAR EXPERTS</span>
              </h3>
              <p className="text-slate-300 text-xs mt-1">
                Schedule a technical consultation or request ROI payback models for your solar project.
              </p>
            </div>

            {/* Corporate Info Header Badge */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span><strong>Corporate Office:</strong> 1805–1804, Flex One, GIFT City, Gandhinagar, Gujarat, India.</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
                <a href="tel:+916352184521" className="flex items-center gap-1.5 text-amber-400 font-bold hover:underline">
                  <Phone className="w-3.5 h-3.5" /> +91 63521 84521
                </a>
                <a href="mailto:kdglobalsunenergy@gmail.com" className="flex items-center gap-1.5 text-slate-200 hover:text-amber-300">
                  <Mail className="w-3.5 h-3.5 text-amber-400" /> kdglobalsunenergy@gmail.com
                </a>
                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 hover:text-black border border-emerald-500/40 text-emerald-400 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Direct WhatsApp
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Corporate Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter email address..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Phone Number (WhatsApp)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 63521 84521"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Estimated Capacity</label>
                  <select
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#121520] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                  >
                    <option value="Residential Rooftop (5 - 20 kW)">Residential Rooftop (5 - 20 kW)</option>
                    <option value="Commercial Rooftop (50 - 500 kW)">Commercial Rooftop (50 - 500 kW)</option>
                    <option value="Industrial Utility (Over 1 MW)">Industrial Utility (Over 1 MW)</option>
                    <option value="Solar EPC & Microgrid Storage">Solar EPC & Microgrid Storage</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Project Details / Location</label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe roof area, current utility bill, or specific EPC requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-black font-extrabold uppercase text-xs tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.4)] disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving Inquiry...
                    </>
                  ) : (
                    <>
                      <PhoneCall className="w-4 h-4" />
                      Submit & Open WhatsApp
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold uppercase text-xs tracking-wider transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Direct
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Detail Modal for Solutions or Projects */
          data && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                <span>KD Global Technical Brief</span>
              </div>

              <h3 className="font-display text-3xl font-extrabold text-white">
                {data.title || data.name}
              </h3>
              <p className="text-slate-300 text-sm font-light leading-relaxed">
                {data.description}
              </p>

              {data.specs && (
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Technical Specifications
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {data.specs.map((spec, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 flex items-center justify-end gap-4 border-t border-white/10">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl glass-panel text-xs font-bold uppercase text-slate-300 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
