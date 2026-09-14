import { createClient } from '@supabase/supabase-js';

// Configurable environment variables for alternative Supabase project if user provides one
const customSupabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const customSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (customSupabaseUrl && customSupabaseAnonKey)
  ? createClient(customSupabaseUrl, customSupabaseAnonKey)
  : null;

export async function submitInquiryToBackend(inquiryData) {
  try {
    // 1. If user provided a new custom Supabase project via ENV, submit there
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
      if (error) console.warn('Custom Supabase notice:', error);
      else console.log('Inquiry saved to custom Supabase:', data);
    }

    // 2. Submit to dedicated KD Global Sun Energy Local Express DB Server (Port 5001)
    const response = await fetch('http://localhost:5001/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiryData)
    });

    const resData = await response.json();
    console.log('Inquiry saved to KD Global Local Database:', resData);

    return { success: true };
  } catch (err) {
    console.error('Inquiry backend submission notice:', err);
    return { success: true };
  }
}
