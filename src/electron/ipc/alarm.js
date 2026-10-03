import { ipcMain } from "electron";
import { store } from "../utils/store.js";
import { main } from "../main.js";
import { windows } from "../utils/openWindow.js";
let alarm

export default async function ipcMainAlarm() {

    ipcMain.on("alarm:save", (e, hour, minute, meridiem, alarmStarted) => {
        store.set({hour, minute, meridiem})

        const alarmWindow = windows["time"]
        console.log(alarmWindow)

        if (!alarmStarted) {
            let parsedHour = parseInt(hour, 10)
            let parsedMinute = parseInt(minute, 10)
            if (meridiem === "PM" && parsedHour < 12) parsedHour += 12
            if (meridiem === "AM" && parsedHour === 12) parsedHour = 0

            console.log(parsedHour, parsedMinute)

            const alarmObj = new Date()
            const nowObj = new Date()
            alarmObj.setHours(parsedHour, parsedMinute, 0, 0) 

            if(alarmObj <= nowObj) alarmObj.setDate(alarmObj.getDate() + 1)

            const timer = alarmObj.getTime() - nowObj.getTime()

            alarm = setTimeout(() => {
                main.webContents.send("schmucky:create-message", "TIME !!")
                alarmWindow.webContents.send("alarm:stop")
                console.log("timed")
                clearTimeout(alarm)
            }, timer)

            return
        }

        clearTimeout(alarm)

        
    })

    ipcMain.handle("alarm:get", () => {
        console.log("hi")
        return {
            hour: store.get("hour"),
            minute: store.get("minute"),
            meridiem: store.get("meridiem")
        }
    })

    
}