import { useEffect } from "react"
import { useAlarmSlots } from "../window-components/alarm/alarm-area.jsx"




export default function useStopAlarm(alarmSoundRef) {
    const setAlarm = useAlarmSlots(state => state.setVar)

    useEffect(() => {
        const unsubscribe = window.electron.stopAlarm(() => {
            console.log("triggered")
           window.electron.setAnimationToMain('SOUND')
           alarmSoundRef.current.loop = true
           alarmSoundRef.current.play()

        })

        async function getAlarmVars() {
            const {hour, minute, meridiem, alarmStarted} = await window.electron.getAlarm()
            if (hour) setAlarm("hourCount", hour)
            if (minute) setAlarm("minuteCount", minute)
            if (meridiem) setAlarm("meridiem", meridiem)
            if(alarmStarted) setAlarm("alarmStarted", alarmStarted)
        }

        getAlarmVars()

        return unsubscribe
    }, [])
}