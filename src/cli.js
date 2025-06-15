const FileManager = require('./fileManager');
const path = require('path');

const fm = new FileManager(path.join(__dirname, '..', 'files'));

async function main() {
    const [,, cmd, ...args] = process.argv;
    switch (cmd) {
        case 'list':
            const files = await fm.listFiles();
            console.log('Files:', files);
            break;
        case 'create':
            const filename = args[0];
            const content = args.slice(1).join(' ') || '';
            await fm.createFile(filename, content);
            break;
        case 'read':
            const fileToRead = args[0];
            const data = await fm.readFile(fileToRead);
            console.log(data);
            break;
        case 'delete':
            const fileToDelete = args[0];
            await fm.deleteFile(fileToDelete);
            break;
        default:
            console.log('Commands: list | create <file> [content] | read <file> | delete <file>');
    }
}

main();