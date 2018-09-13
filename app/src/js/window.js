const electron = require('electron')

const path = require('path')
const url = require('url')

const { app } = electron
const { BrowserWindow } = electron

class NoFrameWindow extends BrowserWindow {
  constructor(option) {
    super(Object.assign({
      title: app.getName(),
      transparent: true,
      frame: false,

      webPreferences: {
        backgroundThorottling: false
      }
    }, option))
  }

  load(name) {
    this.loadURL(url.format({
      pathname: path.join(__dirname, name),
      protocol: 'file:',
      slashes: true,
    }))
  }
}

module.exports = NoFrameWindow
