const EventEmitter = require('events');

class Logger extends EventEmitter {
    constructor() {
        super();
        this.on('log', (msg) => {
            const timestamp = new Date().toISOString();
            console.log(`[LOG ${timestamp}]: ${msg}`);
        });
    }
    log(msg) {
        this.emit('log', msg);
    }
}

module.exports = Logger;