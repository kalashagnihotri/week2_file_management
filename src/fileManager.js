const fs = require('fs');
const path = require('path');
const util = require('util');
const EventEmitter = require('events');
const Logger = require('./logger');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);

class FileManager {
    constructor(baseDir) {
        this.baseDir = baseDir;
        this.logger = new Logger();
    }

    async listFiles() {
        const files = await readdir(this.baseDir);
        this.logger.log('Listed files');
        return files;
    }

    async createFile(filename, content = "") {
        const filePath = path.join(this.baseDir, filename);
        await writeFile(filePath, content);
        this.logger.log(`Created file: ${filename}`);
        return filename;
    }

    async readFile(filename) {
        const filePath = path.join(this.baseDir, filename);
        const data = await readFile(filePath, 'utf-8');
        this.logger.log(`Read file: ${filename}`);
        return data;
    }

    async deleteFile(filename) {
        const filePath = path.join(this.baseDir, filename);
        await unlink(filePath);
        this.logger.log(`Deleted file: ${filename}`);
        return filename;
    }
}

module.exports = FileManager;