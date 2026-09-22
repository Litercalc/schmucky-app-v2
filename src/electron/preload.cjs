const electron = require('electron')

electron.contextBridge.exposeInMainWorld("electron", {
    closeWindow: () => electron.ipcRenderer.send("app:close"),
    openWindow: (windowName) => electron.ipcRenderer.send("app:openWindow", windowName), 
    isOnInteractable: (Bool) => electron.ipcRenderer.send("app:isOnInteractable", Bool),
    getStore: (tag) => electron.ipcRenderer.invoke("app:getStore", tag),
    createMessage: (callback) => {
        const listener = (e, data) => callback(data)
        electron.ipcRenderer.on("schmucky:create-message", listener)
        return () => electron.ipcRenderer.removeListener("schmucky:create-message", listener)
    },
    sendMessageToMain: (message) => electron.ipcRenderer.send("schmucky:send-message", message),

    register: (username, password) => electron.ipcRenderer.invoke("app:register", username, password),
    login: (username, password) => electron.ipcRenderer.invoke("app:login", username, password),
    logout: () => electron.ipcRenderer.send("app:logout")
})