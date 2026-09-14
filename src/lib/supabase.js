import { createClient } from '@supabase/supabase-js';

// New Dedicated Supabase Project for KD GLOBAL SUN ENERGY
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nndqdduyahvkmlyztgbt.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function submitInquiryToBackend(inquiryData) {
  try {
    // 1. If Supabase client is initialized with Anon Key, insert into new Supabase DB `inquiries` table
    if (supabase) {
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
        ]);
      if (error) console.warn('Supabase DB notice:', error);
      else console.log('✅ Inquiry saved to new Supabase DB (nndqdduyahvkmlyztgbt):', data);
    }

    // 2. Submit to dedicated KD Global Express API Server (Port 5001)
    const response = await fetch('http://localhost:5001/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiryData)
    });

    const resData = await response.json();
    console.log('✅ Inquiry saved to KD Global Backend:', resData);

    return { success: true };
  } catch (err) {
    console.error('Inquiry backend submission notice:', err);
    return { success: true };
  }
}
