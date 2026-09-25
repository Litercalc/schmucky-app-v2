import { io } from "socket.io-client";
import { store } from "./store.js";
import { main } from "../main.js";

export const socket = io('http://localhost:8080', {
    autoConnect: false,
    auth: (cb) => {
        cb({token: store.has('token') ? store.get('token') : null})
    }
})

socket.on('connect', () => {
        console.log(socket.id)
    })

socket.on("recieve-message", message => {
    main.webContents.send("schmucky:create-message", message)
})

socket.on("error", data=>{
    main.webContents.send("schmucky:create-message", data.reason)
})