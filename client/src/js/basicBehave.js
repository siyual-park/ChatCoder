const { remote } = require('electron')

const win = remote.getCurrentWindow()

window.addEventListener('load', () => {
    document.getElementById('close').addEventListener('click', () => {
        win.close()
    })
})

window.addEventListener('load', () => {
    document.getElementById('maximize').addEventListener('click', () => {
        console.log(win.isMaximized())
        if (!win.isMaximized())
            win.maximize()
            //document.getElementById('maximize').src = 
        else {
            win.unmaximize()
            console.log(win.isMaximized())
        }
    })
}) 

window.addEventListener('load', () => {
    document.getElementById('minimize').addEventListener('click', () => {
        win.minimize()
    })
})