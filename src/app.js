const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const filesDir = path.join(__dirname, 'files');

// Ensure the files directory exists
if (!fs.existsSync(filesDir)) {
  fs.mkdirSync(filesDir);
}

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Week 1 routes
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to Week 2 File Management</h1>
    <p>Navigate to:</p>
    <button onclick="window.location.href='/about'">About</button>
    <button onclick="window.location.href='/files'">Files</button>
  `);
});
app.get('/about', (req, res) => {
  res.send('<h1>About</h1><p>This is Week 2 of File Management.</p>');
});
app.get('/data', (req, res) => {
  res.json({ name: 'Kalash', week: 2, status: 'On Track' });
});
app.get('/greet', (req, res) => {
  const name = req.query.name || 'Guest';
  res.send(`<h1>Hello, ${name}!</h1>`);
});

// File Manager endpoints (demonstrate core modules integration)
app.get('/files', (req, res) => {
  const files = fs.readdirSync(filesDir);
  const fileList = files.map(file => `
    <li>
      <a href="/files/read/${file}">${file}</a>
      <button onclick="deleteFile('${file}')">Delete</button>
      <button onclick="editFile('${file}')">Edit</button>
    </li>
  `).join('');

  res.send(`
    <h1>Files</h1>
    <button onclick="window.location.href='/files/create'">Create File</button>
    <ul>${fileList}</ul>
    <script>
      function deleteFile(filename) {
        fetch('/files/delete/' + filename, { method: 'DELETE' })
          .then(() => window.location.reload());
      }
      function editFile(filename) {
        window.location.href = '/files/edit/' + filename;
      }
    </script>
  `);
});

app.get('/files/read/:filename', (req, res) => {
  const filePath = path.join(filesDir, req.params.filename);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    res.send(`<h1>${req.params.filename}</h1><pre>${content}</pre>`);
  } else {
    res.status(404).send('File not found');
  }
});

app.get('/files/create', (req, res) => {
  res.send(`
    <h1>Create File</h1>
    <form method="POST" action="/files/create">
      <label>Filename: <input type="text" name="filename" /></label><br />
      <label>Content: <textarea name="content"></textarea></label><br />
      <button type="submit">Create</button>
    </form>
  `);
});

app.post('/files/create', (req, res) => {
  const filePath = path.join(filesDir, req.body.filename);
  fs.writeFileSync(filePath, req.body.content);
  res.redirect('/files');
});

app.delete('/files/delete/:filename', (req, res) => {
  const filePath = path.join(filesDir, req.params.filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.status(200).send('File deleted');
  } else {
    res.status(404).send('File not found');
  }
});

app.get('/files/edit/:filename', (req, res) => {
  const filePath = path.join(filesDir, req.params.filename);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    res.send(`
      <h1>Edit File: ${req.params.filename}</h1>
      <form method="POST" action="/files/edit/${req.params.filename}">
        <label>Content: <textarea name="content">${content}</textarea></label><br />
        <button type="submit">Save</button>
      </form>
    `);
  } else {
    res.status(404).send('File not found');
  }
});

app.post('/files/edit/:filename', (req, res) => {
  const filePath = path.join(filesDir, req.params.filename);
  fs.writeFileSync(filePath, req.body.content);
  res.redirect('/files');
});

// 404 Handler
app.use((req, res) => {
  res.status(404).send('<h1>404: Page Not Found</h1>');
});

app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});