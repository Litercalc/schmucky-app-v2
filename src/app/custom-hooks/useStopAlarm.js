import { useEffect } from "react"
import { useAlarmSlots } from "../windows/timer"




export default function useStopAlarm() {

    const toggleAlarm = useAlarmSlots(state => state.toggleAlarm)
    const setAlarm = useAlarmSlots(state => state.setVar)
    console.log("init")

    useEffect(() => {
        const unsubscribe = window.electron.stopAlarm(() => {
            console.log("triggered")
           toggleAlarm()
        })

        async function getAlarmVars() {
            const {hour, minute, meridiem} = await window.electron.getAlarm()
            if (hour) setAlarm("hourCount", hour)
            if (minute) setAlarm("minuteCount", minute)
            if (meridiem) setAlarm("meridiem", meridiem)
        }

        getAlarmVars()

        return unsubscribe
    }, [])
}