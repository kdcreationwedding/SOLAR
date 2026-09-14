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

