const express = require('express');
const morgan = require('morgan');
const FileManager = require('./fileManager');
const path = require('path');
const fs = require('fs');
const marked = require('marked');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Week 1 routes
app.get('/', (req, res) => {
  const readmePath = path.join(__dirname, '..', 'README.md');
  fs.readFile(readmePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('<h1>Error loading homepage</h1>');
    } else {
      const html = marked.parse(data);
      const links = `
        <div style="margin-bottom: 2em;">
          <a href="/about"><button>About</button></a>
          <a href="/data"><button>Data</button></a>
          <a href="/greet?name=YourName"><button>Greet</button></a>
          <a href="/files"><button>Files (List)</button></a>
          <a href="/files/example.txt"><button>Read File: example.txt</button></a>
        </div>
        <div style='margin-bottom:2em;'>
          <form action="/files" method="post" onsubmit="event.preventDefault(); fetch('/files', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({filename: this.filename.value, content: this.content.value})}).then(r=>r.json()).then(j=>alert(JSON.stringify(j))).catch(e=>alert(e));">
            <input name="filename" placeholder="Filename" required />
            <input name="content" placeholder="Content" required />
            <button type="submit">Create File</button>
          </form>
        </div>
        <div style='margin-bottom:2em;'>
          <form action="/files/delete" method="post" onsubmit="event.preventDefault(); fetch('/files/' + this.filename.value, {method: 'DELETE'}).then(r=>r.json()).then(j=>alert(JSON.stringify(j))).catch(e=>alert(e));">
            <input name="filename" placeholder="Filename to delete" required />
            <button type="submit">Delete File</button>
          </form>
        </div>
      `;
      res.send(`<!DOCTYPE html><html><head><title>Node.js File Manager App</title></head><body>${links}${html}</body></html>`);
    }
  });
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