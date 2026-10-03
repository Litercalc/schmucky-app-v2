import { create } from "zustand"


export const useTabStore = create((set, get) => ({
    todoTabs: {
        TODO: true,
        DOING: false,
        COMPLETED: false
    },

    timeTabs: {
        ALARM: true,
        STOPWATCH: false
    },

    setTabs: (label, tabGroup) => {
        set(state => ({[tabGroup]: Object.fromEntries(Object.entries(state[tabGroup]).map(([key]) => [key, label === key])) }))
    },

}))

export default function tab({label, state, tabGroup}) {

    const setTabs = useTabStore(s => s.setTabs)

    return ( 
        <button type="button" className={`[-webkit-app-region:no-drag] cursor-pointer border-2 white w-auto px-4 text pl-1 border-white font-jersey ${!state ? " text-white" : " bg-[#6a9987] -mt-0.5 text-gray-100"}`} onClick={() => setTabs(label, tabGroup)}>
            <h2 className=" [-webkit-app-region:no-drag] -mt-1.5 cursor-pointer select-none">{label}</h2>
        </button>
    )
}