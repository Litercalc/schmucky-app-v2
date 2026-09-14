import { ipcMain, app, BrowserWindow, Menu } from "electron";
import openWindow from "./utils/openWindow.js";

export function ipcMainApp() {
    ipcMain.on("app:close", (e) => BrowserWindow.fromWebContents(e.sender).close())

    
    
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
            }

        ])

        imageContextMenu.popup({window: win})
    })
}