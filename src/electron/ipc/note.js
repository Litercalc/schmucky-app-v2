import { ipcMain } from "electron";
import { fetchFunc, responseHandler } from "../utils/fetch-boiler.js";
import { store } from "../utils/store.js";

export default async function ipcMainNote() {

    ipcMain.handle("note:get", async () => {
    
        const response = await fetchFunc('note/', "GET", store.get("token"), null)

        await responseHandler(response)

        const data = await response.json()

        console.log(data)

        return data.data.text
    })

    ipcMain.handle("note:save", async (e, noteJSON) => {
        console.log("hi")
        const response = await fetchFunc('note/', "PATCH", store.get("token"), {noteJSON})

        await responseHandler(response)

        const data = await response.json()

        return [data]
    })
}