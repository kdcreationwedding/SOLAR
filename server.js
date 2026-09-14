import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const dataDir = path.join(__dirname, 'data');
const inquiriesFile = path.join(dataDir, 'inquiries.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(inquiriesFile)) {
  fs.writeFileSync(inquiriesFile, JSON.stringify([], null, 2));
}

// POST endpoint to submit inquiry for KD GLOBAL SUN ENERGY
app.post('/api/inquiry', (req, res) => {
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

    const currentData = JSON.parse(fs.readFileSync(inquiriesFile, 'utf8'));
    currentData.unshift(newInquiry);

    fs.writeFileSync(inquiriesFile, JSON.stringify(currentData, null, 2));
    console.log('✅ New KD Global Sun Energy Inquiry Saved:', newInquiry);

    res.status(200).json({ success: true, message: 'Inquiry saved to KD Global Database!', data: newInquiry });
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
  console.log(`KD GLOBAL SUN ENERGY Dedicated Backend API running on port ${PORT}`);
});
