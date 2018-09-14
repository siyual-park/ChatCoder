'use strict';

// Electron 모듈 
const { app } = require('electron')

const noFrameWindow = require('./window.js')

if (process.mas) app.setName('ChatCode')

// 메인 윈도우는 GC되지 않도록 글로벌 선언 
let mainWindow = null

const debug = /--debug/.test(process.argv[2])

function initialize() {
    const shouldQuit = makeSingleInstance()

    if (shouldQuit)
        return app.quit()

    app.on('ready', () => {
        mainWindow = new noFrameWindow({
            width: 1280,
            height: 720,
    
            resizable: false,
    
            titleBarStyle: 'customButtonsOnHover'
        })
    
        mainWindow.load('html/mainWindow.html')
    
        mainWindow.on('close', () => {
            mainWindow = null
        })
    
        if (debug) {
            mainWindow.webContents.openDevTools()
            mainWindow.maximize()
            require('devtron').install()
        }
    })

    // 모든 창을 닫으면 종료 
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    app.on('activate', () => {
        if (mainWindow === null) {
            createMainWindow()
        }
    })
}

function makeSingleInstance() {
    if (process.mas)
        return false

    return app.makeSingleInstance(() => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
    })
}

initialize()