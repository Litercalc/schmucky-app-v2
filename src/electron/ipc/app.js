import { ipcMain,  BrowserWindow } from "electron";
import openWindow from "../utils/openWindow.js";

import { store, main } from "../main.js";

export default function ipcMainApp() {

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

    ipcMain.handle("app:getStore", (e, tag) => {
        if (tag === "userId")  return store.has(tag)
        console.log(store.get(tag))
        return store.get(tag)
    })

    ipcMain.on("schmucky:send-message", (e, message) => {
        console.log(message)
        main.webContents.send("schmucky:create-message", message)
    })


}