const LoginManager = require('./loginManager.js')

class NetworkManager {
  constructor (socketServer) {
    this.socketServer = socketServer

    this.loginManager = new LoginManager(this.socketServer)
  }
}

module.exports = NetworkManager