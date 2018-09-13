const { remote } = require('electron')

const win = remote.getCurrentWindow()

window.addEventListener('load', () => {
  document.getElementById('close').addEventListener('click', () => {
    win.close()
  })
})