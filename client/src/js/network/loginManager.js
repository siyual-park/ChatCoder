const Protocol = require('../../../../common/protocol.js')

class LoginManager {
  constructor (socket) {
    this.socket = socket
  }

  register (name) {
    console.log('register' + name)
    this.socket.emit(Protocol.LOGIN, {
      name: name
    })
  }
}

module.exports = LoginManager