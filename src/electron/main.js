import {app, BrowserWindow, screen} from "electron"
import path from "path"
import isDev from "./utils/isDev.js"

import { ipcMainApp } from "./ipcMain.js"

function startApp() {
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize
    const { x: workAreaX, y: workAreaY } = primaryDisplay.workArea

    const winWidth = 300
    const winHeight = 190

    const mainWindow = new BrowserWindow({
        width: winWidth,
        height: winHeight,
        x: workAreaX + screenWidth - winWidth,
        y: workAreaY + screenHeight - winHeight,
        transparent: true,
        frame: false,
        resizable: false,
        alwaysOnTop: true,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            nodeIntegrationInWorker: false,
            preload: path.join(app.getAppPath(), '/src/electron/preload.cjs')
        }
    })
    if (isDev()) {
        mainWindow.loadURL("http://localhost:5123")
    } else 
    {mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'))}


}

app.whenReady().then(() => {
    ipcMainApp()
    startApp()
})
