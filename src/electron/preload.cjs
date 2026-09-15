const electron = require('electron')

electron.contextBridge.exposeInMainWorld("electron", {
    closeWindow: () => electron.ipcRenderer.send("app:close"),
    openWindow: (windowName) => electron.ipcRenderer.send("app:openWindow", windowName), 
    isOnInteractable: (Bool) => electron.ipcRenderer.send("app:isOnInteractable", Bool)
})