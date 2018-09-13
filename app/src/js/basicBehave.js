const { remote } = require('electron')

const win = remote.getCurrentWindow()

window.addEventListener('load', () => {
    document.getElementById('close').addEventListener('click', () => {
        win.close()
    })
})

window.addEventListener('load', () => {
    document.getElementById('maximize').addEventListener('click', () => {
        win.maximize()
    })
}) 

window.addEventListener('load', () => {
    document.getElementById('minimize').addEventListener('click', () => {
        win.minimize()
    })
})