import React, { useState, useEffect } from 'react';
import { Database, Search, MessageSquare, PhoneCall, RefreshCw, CheckCircle2, User, Mail, Calendar } from 'lucide-react';

export const AdminInquiriesSection = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5001/api/inquiries');
      const data = await res.json();
      if (data && data.inquiries) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.warn('Backend API fetch note:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const openWhatsAppReply = (inquiry) => {
    const text = `Hello ${inquiry.name}! 👋 Thank you for inquiring with KD GLOBAL SUN ENERGY regarding your ${inquiry.capacity} project. We received your request submitted on ${inquiry.submittedAt}. How can we assist you today?`;
    window.open(`https://wa.me/91${inquiry.phone.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const filteredInquiries = inquiries.filter(i =>
    i.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.phone?.includes(searchTerm) ||
    i.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.capacity?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="admin" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-500/30 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
              <Database className="w-4 h-4 text-amber-400" />
              <span>Live Inquiries Dashboard</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              CUSTOMER <span className="bg-gradient-to-r from-white via-amber-300 to-orange-500 bg-clip-text text-transparent">INQUIRIES TABLE.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchInquiries}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center gap-2 transition-colors border border-white/10"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Inquiries</span>
            </button>
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold font-mono">
              Total: {inquiries.length}
            </span>
          </div>
        </div>

        {/* Search Filter Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, phone, email, or solar capacity..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0F172A] text-slate-200 uppercase text-[10px] font-bold tracking-wider border-b border-white/10">
              <tr>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Phone Number</th>
                <th className="p-4">Email Address</th>
                <th className="p-4">Solar Capacity</th>
                <th className="p-4">Details / Notes</th>
                <th className="p-4">Submission Time</th>
                <th className="p-4 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredInquiries.length > 0 ? (
                filteredInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold text-white flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span>{inquiry.name}</span>
                    </td>
                    <td className="p-4 font-mono font-semibold text-amber-400">
                      <a href={`tel:${inquiry.phone}`} className="hover:underline">
                        {inquiry.phone}
                      </a>
                    </td>
                    <td className="p-4 font-mono text-slate-300">
                      <a href={`mailto:${inquiry.email}`} className="hover:underline flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-slate-400" />
                        {inquiry.email}
                      </a>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 font-bold text-[10px]">
                        {inquiry.capacity}
                      </span>
                    </td>
                    <td className="p-4 max-w-xs truncate text-slate-400">
                      {inquiry.details || 'No additional notes'}
                    </td>
                    <td className="p-4 font-mono text-[10px] text-slate-400">
                      {inquiry.submittedAt}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => openWhatsAppReply(inquiry)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 hover:text-black border border-emerald-500/40 text-emerald-400 font-bold text-[11px] inline-flex items-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        WhatsApp
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-400">
                    <CheckCircle2 className="w-8 h-8 text-amber-400/60 mx-auto mb-2" />
                    <span>No inquiries submitted yet. Form submissions will appear live in this table.</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
