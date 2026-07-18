const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, 'database.json');

app.use(cors());
app.use(express.json());

// Helper to read database
function readDB() {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading database file", err);
    return { services: [], projects: [], blogs: [], inquiries: [] };
  }
}

// Helper to write database
function writeDB(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error("Error writing to database file", err);
    return false;
  }
}

// ============================================================================
// SERVICES API
// ============================================================================
app.get('/api/services', (req, res) => {
  const db = readDB();
  res.json(db.services || []);
});

app.put('/api/services/:id', (req, res) => {
  const db = readDB();
  const index = db.services.findIndex(s => s.id === req.params.id);
  if (index !== -1) {
    db.services[index] = { ...db.services[index], ...req.body };
    writeDB(db);
    res.json(db.services[index]);
  } else {
    res.status(404).json({ error: "Service not found" });
  }
});

// ============================================================================
// PROJECTS API
// ============================================================================
app.get('/api/projects', (req, res) => {
  const db = readDB();
  res.json(db.projects || []);
});

app.post('/api/projects', (req, res) => {
  const db = readDB();
  const newProject = {
    id: 'proj-' + Date.now(),
    title: req.body.title || 'Untitled Project',
    brand: req.body.brand || 'KEIYAN',
    category: req.body.category || 'General',
    description: req.body.description || '',
    image: req.body.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    client: req.body.client || 'General Client',
    location: req.body.location || 'India',
    year: req.body.year || new Date().getFullYear().toString()
  };
  db.projects.push(newProject);
  writeDB(db);
  res.status(211).json(newProject);
});

app.put('/api/projects/:id', (req, res) => {
  const db = readDB();
  const index = db.projects.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    db.projects[index] = { ...db.projects[index], ...req.body };
    writeDB(db);
    res.json(db.projects[index]);
  } else {
    res.status(404).json({ error: "Project not found" });
  }
});

app.delete('/api/projects/:id', (req, res) => {
  const db = readDB();
  const filtered = db.projects.filter(p => p.id !== req.params.id);
  if (db.projects.length !== filtered.length) {
    db.projects = filtered;
    writeDB(db);
    res.json({ success: true, message: "Project deleted successfully" });
  } else {
    res.status(404).json({ error: "Project not found" });
  }
});

// ============================================================================
// BLOGS API
// ============================================================================
app.get('/api/blogs', (req, res) => {
  const db = readDB();
  res.json(db.blogs || []);
});

app.post('/api/blogs', (req, res) => {
  const db = readDB();
  const newBlog = {
    id: 'blog-' + Date.now(),
    title: req.body.title || 'New Blog Post',
    category: req.body.category || 'Trends',
    excerpt: req.body.excerpt || '',
    content: req.body.content || '',
    image: req.body.image || 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800',
    date: new Date().toISOString().split('T')[0],
    author: req.body.author || 'Ellipsis Team'
  };
  db.blogs.push(newBlog);
  writeDB(db);
  res.status(211).json(newBlog);
});

app.put('/api/blogs/:id', (req, res) => {
  const db = readDB();
  const index = db.blogs.findIndex(b => b.id === req.params.id);
  if (index !== -1) {
    db.blogs[index] = { ...db.blogs[index], ...req.body };
    writeDB(db);
    res.json(db.blogs[index]);
  } else {
    res.status(404).json({ error: "Blog post not found" });
  }
});

app.delete('/api/blogs/:id', (req, res) => {
  const db = readDB();
  const filtered = db.blogs.filter(b => b.id !== req.params.id);
  if (db.blogs.length !== filtered.length) {
    db.blogs = filtered;
    writeDB(db);
    res.json({ success: true, message: "Blog deleted successfully" });
  } else {
    res.status(404).json({ error: "Blog post not found" });
  }
});

// ============================================================================
// INQUIRIES (CRM FEEDBACKS) API
// ============================================================================
app.get('/api/inquiries', (req, res) => {
  const db = readDB();
  res.json(db.inquiries || []);
});

app.post('/api/inquiries', (req, res) => {
  const db = readDB();
  const newInquiry = {
    id: 'inq-' + Date.now(),
    name: req.body.name || 'Anonymous',
    email: req.body.email || '',
    subject: req.body.subject || 'New Contact Request',
    message: req.body.message || '',
    type: req.body.type || 'General Inquiry',
    date: new Date().toISOString(),
    status: 'New'
  };
  db.inquiries.push(newInquiry);
  writeDB(db);
  res.status(211).json(newInquiry);
});

app.put('/api/inquiries/:id', (req, res) => {
  const db = readDB();
  const index = db.inquiries.findIndex(i => i.id === req.params.id);
  if (index !== -1) {
    db.inquiries[index] = { ...db.inquiries[index], ...req.body };
    writeDB(db);
    res.json(db.inquiries[index]);
  } else {
    res.status(404).json({ error: "Inquiry not found" });
  }
});

app.delete('/api/inquiries/:id', (req, res) => {
  const db = readDB();
  const filtered = db.inquiries.filter(i => i.id !== req.params.id);
  if (db.inquiries.length !== filtered.length) {
    db.inquiries = filtered;
    writeDB(db);
    res.json({ success: true, message: "Inquiry deleted successfully" });
  } else {
    res.status(404).json({ error: "Inquiry not found" });
  }
});

// Serve frontend in production
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*all', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), (err) => {
    if (err) {
      res.status(200).send("Backend API running. Front-end server is currently running in development mode (port 5173).");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
