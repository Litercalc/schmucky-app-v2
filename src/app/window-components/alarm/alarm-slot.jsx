import { useAlarmSlots } from "../../windows/timer.jsx"

export default function AlarmSlot({displayVar, upFunc, downFunc}) {
    const alarmStarted = useAlarmSlots(state => state.alarmStarted)


    return (
        <div className=" [-webkit-app-region:no-drag] flex flex-col items-center">
            <button type="button" onClick={() => upFunc()} className={` ${alarmStarted ? 'brightness-50 cursor-not-allowed pointer-events-none' : 'transition-all duration-200 hover:text-blue-200 cursor-pointer'}`}>▲</button>
            <div className="h-12 w-11 pl-1.5 pt-1.5 bg-[#23383d] font-jersey text-3xl border-white border">{displayVar}</div>
            <button type="button" onClick={() => downFunc()} className={` ${alarmStarted ? 'brightness-50 cursor-not-allowed pointer-events-none' : 'transition-all duration-200 hover:text-blue-200 cursor-pointer'}`}>▼</button>
        </div>
    )
}