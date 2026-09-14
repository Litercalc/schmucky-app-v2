const electron = require('electron')

electron.contextBridge.exposeInMainWorld("electron", {
    closeWindow: () => electron.ipcRenderer.send("app:close"),
    openContextMenu: () => electron.ipcRenderer.send("app:openContextMenu"),
})