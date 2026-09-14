import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();
const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const dataDir = path.join(__dirname, 'data');
const inquiriesFile = path.join(dataDir, 'inquiries.json');

// Ensure local data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(inquiriesFile)) {
  fs.writeFileSync(inquiriesFile, JSON.stringify([], null, 2));
}

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://qrljgqlisbfchspwgiwe.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFybGpncWxpc2JmY2hzcHdnaXdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5ODg2NzAsImV4cCI6MjEwMzU2NDY3MH0.kSfc6SkoyWIAjMIXg_F15CSY_ukIyNp8X2L9_Opb79I';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// PostgreSQL Pool (optional direct connection)
const dbUrl = process.env.DATABASE_URL || '';
let pgPool = null;
if (dbUrl && !dbUrl.includes('[YOUR-PASSWORD]')) {
  pgPool = new Pool({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false }
  });
  console.log('🔗 PostgreSQL Pool connected to Supabase');
}

// POST endpoint to submit inquiry for KD GLOBAL SUN ENERGY
app.post('/api/inquiry', async (req, res) => {
  try {
    const { name, email, phone, capacity, details } = req.body;
    
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required.' });
    }

    const newInquiry = {
      id: 'INQ_' + Date.now(),
      name,
      email,
      phone,
      capacity: capacity || 'Not specified',
      details: details || '',
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    // 1. Save to local JSON backup
    const currentData = JSON.parse(fs.readFileSync(inquiriesFile, 'utf8'));
    currentData.unshift(newInquiry);
    fs.writeFileSync(inquiriesFile, JSON.stringify(currentData, null, 2));

    // 2. Save directly to Supabase DB inquiries table
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert([
          {
            name,
            email,
            phone,
            capacity: capacity || 'Not specified',
            details: details || '',
            status: 'new'
          }
        ]);
      if (error) console.warn('Supabase DB insertion notice:', error.message);
      else console.log('✅ Inquiry saved to Supabase DB!');
    } catch (sbErr) {
      console.warn('Supabase error:', sbErr.message);
    }

    console.log('✅ KD Global Sun Energy Inquiry Saved:', newInquiry);

    res.status(200).json({
      success: true,
      message: 'Inquiry saved successfully to KD Global Database!',
      data: newInquiry
    });
  } catch (err) {
    console.error('Error saving inquiry:', err);
    res.status(500).json({ error: 'Failed to save inquiry.' });
  }
});

// GET endpoint to view all inquiries
app.get('/api/inquiries', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(inquiriesFile, 'utf8'));
    res.status(200).json({ count: data.length, inquiries: data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inquiries.' });
  }
});

app.listen(PORT, () => {
  console.log(`KD GLOBAL SUN ENERGY Backend API Server running on port ${PORT}`);
});
