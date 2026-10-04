import AlarmSlot from "./alarm-slot.jsx"
import SubmitButton from "../../reusable-components/submit-button.jsx"

import useStopAlarm from "../../custom-hooks/useStopAlarm.js"

import { create } from "zustand"

export const useAlarmSlots = create((set, get) => ({
    hourCount: "12",
    minuteCount: "00",
    meridiem: "PM",
    alarmStarted: false,

    toggleAlarm: () => {
        set((state) => ({
            ["alarmStarted"] : !state["alarmStarted"]
        }))
    },

    incrementVar: (alarmVar) => {
        console.log("hi")
        const max = alarmVar === "hourCount" ? 12 : 59

        set((state) => {
            const current = Number(state[alarmVar])
            const next = current >= max ? (max === 12 ? 1 : 0) : current + 1
            return { [alarmVar]: String(next).padStart(2, '0') }
        })
    },

    setVar: (alarmVar, value) => {
        set({[alarmVar]: value} )
    },

    decrementVar: (alarmVar) => {
        const max = alarmVar === "hourCount" ? 12 : 59

        set((state) => {
            const current = Number(state[alarmVar])
            const next = current <= (max === 12 ? 1 : 0)  ? max : current - 1
            return { [alarmVar]: String(next).padStart(2, '0') }
        })
        
    },

    changeMeridiem: () =>{
        set((state) => ({
            ["meridiem"]: state["meridiem"] === "PM" ? "AM" : "PM"
        }))
    },

}))

export default function AlarmArea() {

    const hourCount = useAlarmSlots(state => state.hourCount)
    const minuteCount = useAlarmSlots(state => state.minuteCount)
    const meridiemString = useAlarmSlots(state => state.meridiem)
    const incrementVar = useAlarmSlots(state => state.incrementVar)
    const decrementVar = useAlarmSlots(state => state.decrementVar)
    const changeMeridiem = useAlarmSlots(state => state.changeMeridiem)
    const toggleAlarm = useAlarmSlots(state => state.toggleAlarm)
    const alarmStarted = useAlarmSlots(state => state.alarmStarted)

    useStopAlarm()

    const mainToggleAlarm = (e) => {
        e.preventDefault()
        toggleAlarm()
        window.electron.saveAlarm(hourCount, minuteCount, meridiemString, alarmStarted)
    }

    return (
        <form onSubmit={mainToggleAlarm} className="text-white mt-1">
            <div className="flex gap-2 items-center justify-center">
                <AlarmSlot displayVar={hourCount} upFunc={() => incrementVar("hourCount")} downFunc={() => decrementVar("hourCount")}/>
                :
                <AlarmSlot displayVar={minuteCount} upFunc={() => incrementVar("minuteCount")} downFunc={() => decrementVar("minuteCount")}/>
                :
                <AlarmSlot displayVar={meridiemString} upFunc={() => changeMeridiem()} downFunc={() => changeMeridiem()}/>
                <SubmitButton label={alarmStarted ? "✘" : '✔'}/>
            </div>
        </form>
    )
}