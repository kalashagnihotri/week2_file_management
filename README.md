# 🌟 Node.js File Management Tool & Express Web App

---

## 📚 Overview

This project is a **Node.js File Management Tool** and **Web Application** built with Express.  
It demonstrates the use of Node.js core modules, NPM fundamentals, REST APIs, and a CLI for practical file operations.

- **Week 1:** Node.js basics, modules, Express server, routing, and NPM scripts.
- **Week 2:** Core modules (`fs`, `path`, `events`, `util`, `http`), file management, and package management.

---

## ✨ Features

- **📁 File Management:** Create, list, read, edit, and delete text files via web UI and CLI.
- **💾 Persistent Storage:** Files created/edited via the web UI are stored on the server; files managed via CLI are stored in the `/files` directory.
- **📝 Custom Logging:** Uses an EventEmitter-based logger for file operations.
- **🔌 Core Modules:** Utilizes `fs`, `path`, `events`, and `util`.
- **🌐 Express Web UI:** Clean HTML interface for file operations in your browser.
- **🛠️ REST Endpoints:** API for file CRUD operations.
- **💻 CLI Tool:** Manage files directly from your terminal.
- **⚙️ NPM Scripts:** Start, develop, and manage with simple commands.
- **🔒 Environment Variables:** Configure the app with `.env` (e.g., server port).
- **🚫 404 Handling:** Custom error page for unknown routes.

---

## 📂 Directory Structure

```
week2_file_management/
├── files/               # Directory for files managed via CLI
├── src/
│   ├── app.js           # Express server and web routes
│   ├── cli.js           # Command-line interface for file management
│   ├── fileManager.js   # File management logic using core modules
│   └── logger.js        # Custom logger using events
├── .env                 # Environment variables
├── .gitignore           # Files/directories to be ignored by git
├── package.json         # Project metadata and scripts
├── package-lock.json    # NPM lock file
└── README.md            # This documentation
```

---

## ⚡️ Setup

1. **Install Dependencies**

    ```bash
    npm install
    ```

2. **Environment Setup**

    Create a `.env` file (optional):

    ```
    PORT=3000
    ```

    If omitted, the server defaults to port 3000.

3. **Files Storage**

    - **CLI:** Files you create, edit, or delete with the CLI are stored in the `/files` directory in the project root.
    - **Web UI:** Files managed from the web UI are stored on the server (in the same `/files` directory, accessible via web endpoints).

---

## 🚀 Usage

### 🌐 Web Interface (Express)

- **Start the server:**

    ```bash
    npm start
    ```
    or for development:
    ```bash
    npm run dev
    ```

- **Open in your browser:**  
  [http://localhost:3000/](http://localhost:3000/)

#### Main Routes

| Route                       | Description                                   |
|-----------------------------|-----------------------------------------------|
| `/`                         | Homepage with navigation and features         |
| `/about`                    | About the project and context                 |
| `/data`                     | Project metadata in JSON                      |
| `/greet?name=YourName`      | Personalized greeting                         |
| `/files`                    | List all files, with read/edit/delete options |
| `/files/read/:filename`     | View content of a specific file               |
| `/files/create`             | Form to create a new file                     |
| `/files/edit/:filename`     | Edit an existing file                         |
| `/files/delete/:filename`   | Delete a file (DELETE request)                |

> **Note:**  
> The UI displays and manages files stored only in the server’s local `/files` directory.

---

### 💻 Command-Line Interface (CLI)

- **Run commands from the terminal:**

    ```bash
    node src/cli.js <command> [arguments]
    ```

#### CLI Commands

| Command                        | Description                                   |
|--------------------------------|-----------------------------------------------|
| `list`                         | List all files in `/files/`                   |
| `create <filename> [content]`  | Create a new file with optional content       |
| `read <filename>`              | Display content of a file                     |
| `delete <filename>`            | Delete a specific file                        |

**Examples:**

```bash
node src/cli.js list
node src/cli.js create hello.txt "Sample content"
node src/cli.js read hello.txt
node src/cli.js delete hello.txt
```

---

## 🛠️ NPM Scripts

| Script   | Description                        |
|----------|------------------------------------|
| `start`  | Launch the Express web server      |
| `dev`    | Launch with nodemon (dev mode)     |

---

## 🏗️ Implementation Details

- **File Management:**  
  All logic is in `src/fileManager.js`, using the Node.js core modules.

- **Logging:**  
  Operations are logged via a custom EventEmitter (`src/logger.js`).

- **Web UI:**  
  Express routes serve navigation, file management, and HTML forms.

- **Files Directory:**  
  All files are stored as plain text in the `/files` directory.

- **Storage Behavior:**  
  - Files created/edited from the CLI are stored in `/files` and can be accessed through the web UI.
  - Files created/edited from the web UI are stored on the server (also in `/files`) and are visible to both the web UI and CLI.

---

## ❌ 404 and Error Handling

- Unknown routes return a custom 404 HTML page.
- File operations handle missing files and invalid input gracefully.

---

## 📜 .gitignore

The `.gitignore` file is set to ignore:

- `node_modules/`
- `.env`
- `logs/`, `*.log`
- `coverage/`, `*.lcov`
- `.DS_Store`, `Thumbs.db`
- `files/` (local files managed by the app)

---
