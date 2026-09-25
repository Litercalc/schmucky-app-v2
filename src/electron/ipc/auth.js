import { ipcMain } from "electron";
import { fetchFunc, responseHandler } from "../utils/fetch-boiler.js";
import { main } from "../main.js";
import { socket } from "../utils/socket.js";
import { store } from "../utils/store.js";


export default function ipcMainAccount() {
    ipcMain.handle("app:register", async (e, username, password) => {
            
        const response = await fetchFunc('auth/register', "POST", null, {username, password})

        await responseHandler(response)

        const data = await response.json()

        console.log(data)
        try {
               
            return [data.statusCode]
        }
        finally {

            store.set({token: data.data.token,userId: data.data.user[0], username: data.data.user[1], role: data.data.user[2]})
            socket.connect()
            main.webContents.send("schmucky:create-message", "Welcome, "+ data.data.user[1] + "!")
        }
    })

    ipcMain.handle("app:login", async (e, username, password) => {

        const response = await fetchFunc('auth/login', "POST", null, {username, password})

        await responseHandler(response)

        const data = await response.json()

        console.log(data)

        try {

            return [data.statusCode]

        } finally {
            store.set({token: data.data.token,userId: data.data.user[0], username: data.data.user[1], role: data.data.user[2]})
            
            socket.connect()

            main.webContents.send("schmucky:create-message", "Welcome back, "+ data.data.user[1] + "!")
        }
    })

    ipcMain.on("app:logout", async() => {

        main.webContents.send("schmucky:create-message", "You have successfully logged out, "+ store.get("username") + "!")

        const token = store.get("token")

        store.clear()


        const response = await fetchFunc(`auth/logout`, "DELETE", token)

        await responseHandler(response)

        socket.disconnect()
        
    })
    
}