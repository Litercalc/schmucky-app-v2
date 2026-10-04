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

    setAnimation: (callback) => {
        const listener = (e, data) => callback(data)
        electron.ipcRenderer.on("schmucky:set-animation", listener)
        return () => electron.ipcRenderer.removeListener("schmucky:set-animation", listener)
    },

    setAnimationToMain: (newState) => electron.ipcRenderer.send("schmucky:set-animation-to-main", newState),

    register: (username, password) => electron.ipcRenderer.invoke("app:register", username, password),
    login: (username, password) => electron.ipcRenderer.invoke("app:login", username, password),
    logout: () => electron.ipcRenderer.send("app:logout"),

    addTask: (task) => electron.ipcRenderer.invoke("todolist:add", task),
    getTasks: () => electron.ipcRenderer.invoke("todolist:get"),
    changeTaskStatus: (id, newStatus) => electron.ipcRenderer.invoke("todolist:changeTaskStatus", id, newStatus),
    deleteTask: (id) => electron.ipcRenderer.invoke("todolist:delete", id),

    sendMessage: (recipient, message) => electron.ipcRenderer.send("chat:send-message", recipient, message),

    getNote: () => electron.ipcRenderer.invoke("note:get"),
    saveNote: (noteJSON) => electron.ipcRenderer.invoke("note:save", noteJSON),

    saveAlarm: (hour, minute, meridiem, alarmStarted) => electron.ipcRenderer.send("alarm:save", hour, minute, meridiem, alarmStarted),
    stopAlarm: (callback) => {
        const listener = (e) => callback()
        electron.ipcRenderer.on("alarm:stop", listener)
        return () => electron.ipcRenderer.removeListener("alarm:stop", listener)
    },
    getAlarm: () => electron.ipcRenderer.invoke("alarm:get"),

})