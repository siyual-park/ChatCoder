const electron = require('electron')

const path = require('path')
const url = require('url')

const { app } = electron
const { BrowserWindow } = electron

class window {
  constructor(option) {
    this.window = new BrowserWindow(Object.assign({
      title: app.getName(),
      transparent: true,
      frame: false,
  
      webPreferences: {
        backgroundThorottling: false
      }
    }, option))
  }

  load(name) {
    this.window.loadURL(url.format({
      pathname: path.join(__dirname, name),
      protocol: 'file:',
      slashes: true,
    }))
  }

  on(name, func) {
    this.window.on(name, func)
  }
}

module.exports = window
