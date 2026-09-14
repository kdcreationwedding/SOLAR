import { createClient } from '@supabase/supabase-js';

// Dedicated Supabase Project for KD GLOBAL SUN ENERGY
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qrljgqlisbfchspwgiwe.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFybGpncWxpc2JmY2hzcHdnaXdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5ODg2NzAsImV4cCI6MjEwMzU2NDY3MH0.kSfc6SkoyWIAjMIXg_F15CSY_ukIyNp8X2L9_Opb79I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function submitInquiryToBackend(inquiryData) {
  try {
    // 1. Insert directly into Supabase DB `inquiries` table
    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        {
          name: inquiryData.name,
          email: inquiryData.email,
          phone: inquiryData.phone,
          capacity: inquiryData.capacity || 'Not specified',
          details: inquiryData.details || '',
          status: 'new'
        }
      ])
      .select();

    if (error) {
      console.warn('Supabase DB notice:', error.message);
    } else {
      console.log('✅ Inquiry saved to Supabase Database:', data);
    }

    // 2. Backup submit to local Express API Server (Port 5001)
    try {
      const response = await fetch('http://localhost:5001/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryData)
      });
      const resData = await response.json();
      console.log('✅ Inquiry saved to local backup server:', resData);
    } catch (localErr) {
      console.log('Local backup server notice:', localErr.message);
    }

    return { success: true };
  } catch (err) {
    console.error('Inquiry submission notice:', err);
    return { success: true };
  }
}

// Authentication Helpers using Supabase Auth & Backend Sync

export async function signUpUser({ email, password, name }) {
  try {
    // 1. Supabase Auth Registration
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name
        }
      }
    });

    if (error) throw error;

    // 2. Register backup user in Express Backend
    try {
      await fetch('http://localhost:5001/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });
    } catch (e) {
      console.log('Backend signup backup notice:', e.message);
    }

    return { data, error: null };
  } catch (err) {
    console.error('Sign Up Error:', err);
    return { data: null, error: err };
  }
}

export async function signInUser({ email, password }) {
  try {
    // 1. Supabase Auth Login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      // Fallback: try Express Backend login
      const res = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const backendData = await res.json();
      if (backendData.success) {
        return { data: { user: backendData.user, session: backendData.session }, error: null };
      }
      throw error;
    }

    return { data, error: null };
  } catch (err) {
    console.error('Sign In Error:', err);
    return { data: null, error: err };
  }
}

export async function signOutUser() {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (err) {
    console.error('Sign Out Error:', err);
    return { error: err };
  }
}

export async function getCurrentUser() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (err) {
    return null;
  }
}

export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
}

