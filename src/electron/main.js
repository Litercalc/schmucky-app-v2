import {app, BrowserWindow, screen} from "electron"
import { store } from "./utils/store.js"
import path from "path"
import isDev from "./utils/isDev.js"

import { ipcMainApp, ipcMainAccount, ipcMainToDo, ipcMainChat } from "./ipc/index.js"
import { socket } from "./utils/socket.js"

export let main


function startApp() {
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize
    const { x: workAreaX, y: workAreaY } = primaryDisplay.workArea

    const winWidth = 250 //110
    const winHeight = 325 //190

    main = new BrowserWindow({
        width: winWidth,
        height: winHeight,
        x: workAreaX + screenWidth - winWidth,
        y: workAreaY + screenHeight - winHeight,
        transparent: true,
        frame: false,
        resizable: false,
        alwaysOnTop: true,
        skipTaskbar: true,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            nodeIntegrationInWorker: false,
            preload: path.join(app.getAppPath(), '/src/electron/preload.cjs')
        }
    })
    if (isDev()) {
        main.loadURL("http://localhost:5123")
    } else 
    {main.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'))}


}

app.whenReady().then(() => {
    ipcMainApp()
    ipcMainAccount()
    ipcMainToDo()
    socket.connect()
    ipcMainChat()
    startApp()
})
