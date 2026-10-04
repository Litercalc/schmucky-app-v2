import { ipcMain,  BrowserWindow } from "electron";
import openWindow from "../utils/openWindow.js";

import { main } from "../main.js";
import { store } from "../utils/store.js";

export default function ipcMainApp() {

    ipcMain.on("app:close", (e) => {

        BrowserWindow.fromWebContents(e.sender).close()
        
    })

    ipcMain.on("app:openWindow", (e, windowName) => {
        const windowNames = {
            "Register": "register",
            "Login": "login",
            "To-Do List": "todolist",
            "Note": "note",
            "Boop-a-Schmuck": "chat",
            "Time": "time",
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

    ipcMain.on("schmucky:set-animation-to-main", (e, newState) => {
        console.log(newState)
        main.webContents.send("schmucky:set-animation", newState)
    })


}