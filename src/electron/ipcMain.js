import { ipcMain, app, BrowserWindow, Menu } from "electron";
import openWindow from "./utils/openWindow.js";

export function ipcMainApp() {

    ipcMain.on("app:close", (e) => {
        BrowserWindow.fromWebContents(e.sender).close()
        
    })

    ipcMain.on("app:openContextMenu", (e) => {
        const win = BrowserWindow.fromWebContents(e.sender)
        const imageContextMenu = Menu.buildFromTemplate([
            {
                label: 'Register',
                click: () => {
                    openWindow('register')
                }
            },
            {
                label: 'Login',
                click: () => {
                    openWindow('login')
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'ToDoList',
                click: () => {
                    openWindow('todolist')
                }
            },
            {
                label: 'Schmucky AI',
                click: () => {
                    openWindow('ai')
                }
            },
            {
                label: 'Boop Someone',
                click: () => {
                    openWindow('chat')
                }
            },

        ])

        imageContextMenu.popup({window: win})
    })

    ipcMain.on("app:isOnInteractable", (e, Bool) => {

        const window = BrowserWindow.fromWebContents(e.sender)

        window.setIgnoreMouseEvents(!Bool, {forward: true})
    })
}