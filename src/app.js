const express = require('express');
const morgan = require('morgan');
const FileManager = require('./fileManager');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Week 1 routes
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Node.js File Manager App</h1>');
});
app.get('/about', (req, res) => {
  res.send('<h2>Week 1: Node.js, Express, and File System!</h2>');
});
app.get('/data', (req, res) => {
  res.json({ name: 'Kalash', week: 2, status: 'On Track' });
});
app.get('/greet', (req, res) => {
  const name = req.query.name || 'Guest';
  res.send(`<h1>Hello, ${name}!</h1>`);
});

// File Manager endpoints (demonstrate core modules integration)
const fm = new FileManager(path.join(__dirname, '..', 'files'));

app.get('/files', async (req, res) => {
  const files = await fm.listFiles();
  res.json(files);
});

app.post('/files', async (req, res) => {
  const { filename, content } = req.body;
  await fm.createFile(filename, content);
  res.json({ message: 'File created', filename });
});

app.get('/files/:filename', async (req, res) => {
  try {
    const data = await fm.readFile(req.params.filename);
    res.send(data);
  } catch (e) {
    res.status(404).json({ error: 'File not found' });
  }
});

app.delete('/files/:filename', async (req, res) => {
  try {
    await fm.deleteFile(req.params.filename);
    res.json({ message: 'File deleted', filename: req.params.filename });
  } catch (e) {
    res.status(404).json({ error: 'File not found' });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).send('<h1>404: Page Not Found</h1>');
});

app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});