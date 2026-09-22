import { ipcMain } from "electron";
import { fetchFunc, responseHandler } from "../utils/fetch-boiler.js";
import { main, store } from "../main.js";


export default function ipcMainAccount() {
    ipcMain.handle("app:register", async (e, username, password) => {
            
        const response = await fetchFunc('auth/register', "POST", null, {username, password})

        await responseHandler(response)

        const data = await response.json()

        console.log(data)

        process.nextTick(() => {

            store.set({token: data.data.token,userId: data.data.user[0], username: data.data.user[1], role: data.data.user[2]})
            
            main.webContents.send("schmucky:create-message", "Welcome, "+ data.data.user[1] + "!")
        })

        return [data.statusCode]
    })

    ipcMain.handle("app:login", async (e, username, password) => {
            
        const response = await fetchFunc('auth/login', "POST", null, {username, password})

        await responseHandler(response)

        const data = await response.json()

        console.log(data)

        process.nextTick(() => {

            store.set({token: data.data.token,userId: data.data.user[0], username: data.data.user[1], role: data.data.user[2]})
            
            main.webContents.send("schmucky:create-message", "Welcome back, "+ data.data.user[1] + "!")
        })

        return [data.statusCode]
    })

    ipcMain.on("app:logout", async() => {

        main.webContents.send("schmucky:create-message", "You have successfully logged out, "+ store.get("username") + "!")

        const token = store.get("token")

        store.clear()


        const response = await fetchFunc(`auth/logout`, "DELETE", token)

        if (!response.ok) {
            const errorBody = await response.json()
            console.log(JSON.stringify({ status: errorBody.statusCode, errors: errorBody.errors }))
        }

        
    })
    
}