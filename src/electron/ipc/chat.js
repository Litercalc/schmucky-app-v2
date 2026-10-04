import { ipcMain } from "electron"

import { socket } from "../utils/socket.js";

export default function ipcMainChat() {
    ipcMain.on("chat:send-message", (e, recipient, message) => {
        
        socket.emit('send-message', recipient, message)
        console.log("sent")
    })
}