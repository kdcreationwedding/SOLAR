import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';


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

const usersFile = path.join(dataDir, 'users.json');
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, JSON.stringify([], null, 2));
}

// Password Hashing Helper (SHA-256 with Salt)
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password + 'KD_SUN_SALT_2026').digest('hex');
};

// POST endpoint for user Sign Up
app.post('/api/auth/signup', (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (existing) {
      return res.status(400).json({ error: 'User already exists with this email address.' });
    }

    const newUser = {
      id: 'USR_' + Date.now(),
      name: name || email.split('@')[0],
      email: email.toLowerCase(),
      passwordHash: hashPassword(password),
      role: email.includes('admin') || email.includes('kd') ? 'admin' : 'user',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    console.log('✅ User registered successfully:', newUser.email);

    res.status(200).json({
      success: true,
      message: 'User registered successfully!',
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to complete signup.' });
  }
});

// POST endpoint for user Login
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    const targetHash = hashPassword(password);

    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === targetHash);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = 'JWT_TOKEN_' + Buffer.from(`${user.id}:${Date.now()}`).toString('base64');

    console.log('✅ User authenticated successfully:', user.email);

    res.status(200).json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      session: { access_token: token }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to authenticate user.' });
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

