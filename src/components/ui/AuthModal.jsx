import React, { useState } from 'react';
import { X, Lock, Mail, User, Eye, EyeOff, ShieldCheck, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';
import { signInUser, signUpUser } from '../../lib/supabase';

export const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    if (isSignUp) {
      // Validate Sign Up
      if (!formData.name.trim()) {
        setErrorMsg('Please enter your full name.');
        setLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        setErrorMsg('Password must be at least 6 characters long.');
        setLoading(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMsg('Passwords do not match. Please verify.');
        setLoading(false);
        return;
      }

      const { data, error } = await signUpUser({
        email: formData.email,
        password: formData.password,
        name: formData.name
      });

      if (error) {
        setErrorMsg(error.message || 'Registration failed. Please try again.');
      } else {
        setSuccessMsg('Account created successfully! You are now logged in.');
        if (onAuthSuccess) onAuthSuccess(data?.user || { email: formData.email, name: formData.name });
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } else {
      // Validate Sign In
      const { data, error } = await signInUser({
        email: formData.email,
        password: formData.password
      });

      if (error) {
        setErrorMsg('Invalid email or password. Please check your credentials.');
      } else {
        setSuccessMsg('Welcome back! Login successful.');
        if (onAuthSuccess) onAuthSuccess(data?.user || { email: formData.email });
        setTimeout(() => {
          onClose();
        }, 1200);
      }
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-[#0B0D14] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Glow ambient effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-amber-500 hover:text-black text-slate-300 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-3 mb-6">
          <Logo size="small" className="mx-auto" />
          <div>
            <h3 className="font-display text-2xl font-extrabold text-white uppercase tracking-tight">
              {isSignUp ? 'CREATE' : 'WELCOME'} <span className="bg-gradient-to-r from-white via-amber-300 to-orange-500 bg-clip-text text-transparent">{isSignUp ? 'ACCOUNT' : 'BACK'}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {isSignUp ? 'Register to access KD Global Sun Energy Portal' : 'Sign in to access your secure admin & inquiry portal'}
            </p>
          </div>
        </div>

        {/* Auth Toggle Tabs */}
        <div className="flex p-1 rounded-2xl bg-white/5 border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => { setIsSignUp(false); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
              !isSignUp
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => { setIsSignUp(true); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
              isSignUp
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Alert Messages */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Mahesh Parmar"
                  required={isSignUp}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@kdglobalsun.com"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required={isSignUp}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-black font-extrabold uppercase text-xs tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.4)] disabled:opacity-50 mt-6"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>{isSignUp ? 'Create Account' : 'Log In to Portal'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security Footer Notice */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3 text-amber-400" />
            Protected by Supabase Auth 256-Bit SSL Encryption
          </p>
        </div>
      </div>
    </div>
  );
};
