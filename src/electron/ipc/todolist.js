import { ipcMain } from "electron";
import { fetchFunc, responseHandler } from "../utils/fetch-boiler.js";
import { store } from "../utils/store.js";

export default function ipcMainToDo() {
     ipcMain.handle("todolist:add", async (e, task) => {
                
        const response = await fetchFunc('todolist/', "POST", store.get("token"), {task})

        await responseHandler(response)

        const data = await response.json()

        console.log(data)

        return [data.statusCode]
    })

    ipcMain.handle("todolist:get", async () => {

        const response = await fetchFunc('todolist/', "GET", store.get("token"), null)

        await responseHandler(response)

        const data = await response.json()

        console.log(data)

        return [data]
    })

    ipcMain.handle("todolist:changeTaskStatus", async(e, id, newStatus) => {
        const response = await fetchFunc(`todolist/${id}/${newStatus}/toggle-status`, "PATCH", store.get("token"), null)
        await responseHandler(response)

        const data = await response.json()

        console.log(data.data.status)

        return data.data.status
    })

    ipcMain.handle("todolist:delete", async(e, id) => {
        const response = await fetchFunc(`todolist/${id}`, "DELETE", store.get("token"), null)
        await responseHandler(response)

        const data = await response.json()

        console.log(data.data.status)

        return data.data.status
    })

}