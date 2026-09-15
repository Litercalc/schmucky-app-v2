import { ipcMain, app, BrowserWindow, Menu } from "electron";
import openWindow from "./utils/openWindow.js";

export function ipcMainApp() {

    ipcMain.on("app:close", (e) => {

        BrowserWindow.fromWebContents(e.sender).close()
        
    })

    ipcMain.on("app:openWindow", (e, windowName) => {
        const windowNames = {
            "Register": "register",
            "Login": "login",
            "To-Do List": "todolist",
            "Ducky AI": "ai",
            "Boop Someone": "chat",
            "Set Alarm": "ai",
            "Logout": "ai"
        }
        openWindow(windowNames[windowName])
    })

    ipcMain.on("app:isOnInteractable", (e, Bool) => {

        const window = BrowserWindow.fromWebContents(e.sender)
        window.setIgnoreMouseEvents(!Bool, {forward: true})
    })
}