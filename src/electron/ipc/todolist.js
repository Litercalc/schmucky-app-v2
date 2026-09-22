import { ipcMain } from "electron";
import { fetchFunc, responseHandler } from "../utils/fetch-boiler.js";
import { main, store } from "../main.js";

export default function ipcMainToDo() {
     ipcMain.on("todolist:add", async (e, task) => {
                
        const response = await fetchFunc('auth/todolist/', "POST", store.get("token"), {task})

        await responseHandler(response)

        const data = await response.json()

        console.log(data)
    })
}