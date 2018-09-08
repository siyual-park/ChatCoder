'use strict';

// Electron 모듈 
const path = require('path')
const { app, BrowserWindow } = require('electron')

if (process.mas) app.setName('ChatCode')

// 메인 윈도우는 GC되지 않도록 글로벌 선언 
let mainWindow = null
let splashWindow = null

const debug = /--debug/.test(process.argv[2])

function initialize() {
    const shouldQuit = makeSingleInstance()
    if (shouldQuit) return app.quit()

    app.on('ready', () => {
        createSplashWindow()
        createMainWindow()
        mainWindow.close()
        splashWindow.close()
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

function createMainWindow() {
    const windowOptions = {
        width: 1312,
        minWidth: 680,
        height: 782,
        title: app.getName(),
        transparent: true,
        frame: false,

        webPreferences: {
            backgroundThorottling: false
        }
    }

    mainWindow = new BrowserWindow(windowOptions)
    mainWindow.loadURL(path.join('file://', __dirname, '/windows/modal.html'))

    // Launch fullscreen with DevTools open, usage: npm run debug
    if (debug) {
        mainWindow.webContents.openDevTools()
        mainWindow.maximize()
        require('devtron').install()
    }

    mainWindow.on('close', () => {
        mainWindow = null
    })
}

function createSplashWindow() {
    const windowOptions = {
        width: 400,
        minWidth: 400,
        height: 400,
        minheight: 400,
        title: app.getName(),
        transparent: true,
        frame: false,

        webPreferences: {
            backgroundThorottling: false
        }
    }

    splashWindow = new BrowserWindow(windowOptions)
    splashWindow.loadURL(path.join('file://', __dirname, '/windows/splash.html'))

    // Launch fullscreen with DevTools open, usage: npm run debug
    if (debug) {
        splashWindow.webContents.openDevTools()
        splashWindow.maximize()
        require('devtron').install()
    } 

    splashWindow.on('close', () => {
        splashWindow = null
    })
}

function makeSingleInstance() {
    if (process.mas) return false

    return app.makeSingleInstance(() => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
    })
}

initialize()