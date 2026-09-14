import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
import dotenv from 'dotenv';

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

// PostgreSQL Pool for new Supabase project: nndqdduyahvkmlyztgbt
const dbUrl = process.env.DATABASE_URL || 'postgresql://postgres:[YOUR-PASSWORD]@db.nndqdduyahvkmlyztgbt.supabase.co:5432/postgres';
let pgPool = null;

if (dbUrl && !dbUrl.includes('[YOUR-PASSWORD]')) {
  pgPool = new Pool({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false }
  });
  console.log('🔗 PostgreSQL Pool connected to db.nndqdduyahvkmlyztgbt.supabase.co');
} else {
  console.log('⚡ PostgreSQL ready for db.nndqdduyahvkmlyztgbt.supabase.co (Set database password in .env to activate direct SQL queries)');
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

    // 2. If PostgreSQL Pool is active, save directly to Supabase Postgres database
    if (pgPool) {
      try {
        await pgPool.query(
          `INSERT INTO inquiries (id, name, email, phone, capacity, details, status) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [newInquiry.id, name, email, phone, capacity || '', details || '', 'new']
        );
        console.log('✅ Inquiry saved to Supabase PostgreSQL Database!');
      } catch (pgErr) {
        console.warn('PostgreSQL query note:', pgErr.message);
      }
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
