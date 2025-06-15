# Node.js File Management Tool & Express Web App

## Overview

This project covers:
- Week 1: Node.js basics, modules, Express server, routing, package.json, and NPM scripts.
- Week 2: Node.js core modules (`fs`, `path`, `http`, `events`, `util`), NPM packages and scripts.

## Features

- List, create, read, and delete files using both CLI and REST API.
- Logging with custom event emitter.
- Modular code.
- Express server with Week 1 demo routes.
- NPM scripts for convenience.

## Usage

### 1. Install dependencies

```bash
npm install
```

### 2. Run the Express server

```bash
npm start
```

Visit:  
- `/` for homepage  
- `/about` for Week 1 summary  
- `/files` for listing files (GET), creating files (POST), reading (`/files/:filename`), and deleting files

### 3. Use the CLI tool

```bash
npm run cli:list
npm run cli:create
npm run cli:read
npm run cli:delete
```
Or:
```bash
node src/cli.js list
node src/cli.js create test.txt "Hello world"
node src/cli.js read test.txt
node src/cli.js delete test.txt
```

### 4. NPM Scripts

- `start`: Start Express app
- `dev`: Start with nodemon
- `cli`: Run CLI tool with arguments
- `cli:list`, `cli:create`, `cli:read`, `cli:delete`: Examples

### 5. Add a `.env` file

```
PORT=3000
```

## Directory Structure

```
node-file-manager/
├── src/
│   ├── cli.js
│   ├── fileManager.js
│   ├── app.js
│   └── logger.js
├── files/          # (create this for storing files)
├── package.json
├── .env
└── README.md
```