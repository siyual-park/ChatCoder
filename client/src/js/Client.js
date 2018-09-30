const NetworkManager = require('./network/networkManager');

class Client {
    constructor() {
        this.networkManager = new NetworkManager(io());
    }

    init() {

    }
}

module.exports = Client;