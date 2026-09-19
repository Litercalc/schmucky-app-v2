import { BrowserWindow, app, ipcMain, screen } from "electron";
import path from "path"
import isDev from "./isDev.js";

const windows = {}

export default function openWindow(windowName) {
    if (windowName in windows) {
        windows[windowName].focus()
        return
    }

    const primaryDisplay = screen.getPrimaryDisplay()
    const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize
    const { x: workAreaX, y: workAreaY } = primaryDisplay.workArea

    const winWidth = 240
    const winHeight = 320
    const mainWindow = new BrowserWindow({
        width: winWidth,
        height: winHeight,
        x: workAreaX + screenWidth - winWidth - 85,
        y: workAreaY + screenHeight - winHeight - 80,
        transparent: true,
        frame: false,
        resizable: false,
        skipTaskbar: true,
        alwaysOnTop: true,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            nodeIntegrationInWorker: false,
            preload: path.join(app.getAppPath(), '/src/electron/preload.cjs')
        }
    })

    windows[windowName] = mainWindow

    mainWindow.on("closed", () => delete windows[windowName])

    if (isDev()) {
        mainWindow.loadURL(`http://localhost:5123/window?window=${windowName}`)
    } else 
    {mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'), {query: {window: windowName}})}
}