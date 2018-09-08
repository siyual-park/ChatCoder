'use strict';

// Electron 모듈 
const path = require('path')
const { app, BrowserWindow } = require('electron')

const window = require('./window.js')

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
        //mainWindow.close()
        //splashWindow.close()
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
    mainWindow = new window({
        width: 1312,
        minWidth: 680,
        height: 782
    })
    mainWindow.load('/windows/modal.html')

    mainWindow.on('close', () => {
        mainWindow = null
    })

    if (debug) {
        mainWindow.webContents.openDevTools()
        mainWindow.maximize()
        require('devtron').install()
    } 
}

function createSplashWindow() {
    splashWindow = new window({
        width: 400,
        height: 400,
        resizable: false
    })
    splashWindow.load('/windows/splash.html')

    splashWindow.on('close', () => {
        splashWindow = null
    })

    if (debug) {
        splashWindow.webContents.openDevTools()
        splashWindow.maximize()
        require('devtron').install()
    } 
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