const electron = require('electron')

const path = require('path')
const url = require('url')

const { app, BrowserWindow } = electron

class NoFrameWindow extends BrowserWindow {
  constructor(option) {
    super(Object.assign({
      title: app.getName(),
      //transparent: true,
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

let createMainWindow = () => {
  let mainWindow = new NoFrameWindow({
      width: 1280,
      height: 720,

      resizable: false,

      titleBarStyle: 'customButtonsOnHover'
  })

  mainWindow.load('../html/mainWindow.html')
  
  mainWindow.on('close', () => {
      mainWindow = null
  })
  
  return mainWindow
}

let createLoginWindow = () => {
  let loginWindow = new NoFrameWindow({
      width: 540,
      height: 720,

      resizable: false,

      titleBarStyle: 'customButtonsOnHover'
  })

  loginWindow.load('../html/loginWindow.html')
  
  loginWindow.on('close', () => {
      mainWindow = null
  })

  return loginWindow
}

module.exports = {
  createMainWindow: createMainWindow,
  createLoginWindow :createLoginWindow
}
