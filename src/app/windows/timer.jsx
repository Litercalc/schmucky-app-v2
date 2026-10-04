import Header from "../reusable-components/header.jsx"
import Tab, { useTabStore } from "../reusable-components/tabs.jsx"
import AlarmArea from "../window-components/alarm/alarm-area.jsx"
import StopwatchArea from "../window-components/stopwatch/stopwatch-area.jsx"

export default function Timer(){
    const todoTabs = useTabStore(state => state.timeTabs)


    const tabs = Object.entries(todoTabs).map(([key, value]) =>
        <Tab label={key} key={key} state={value} tabGroup="timeTabs"/>
    )

    const currentTab = useTabStore(state => Object.entries(state.timeTabs).find(([key, value]) => value === true)[0])
    console.log(currentTab)



    return (
        <div className="[-webkit-app-region:drag] origin-bottom-right animate-expand w-60 h-55 flex flex-col items-center bg-linear-to-br from-[#294d4d]/90 via-[#2e6161] to-[#294d4d]/90 overflow-hidden border-4 border-gray-900 rounded-xl">
            <Header title="Time"/>

            <div className="flex mr-5 h-4 -mb-px [-webkit-app-region:no-drag]">
                {tabs}
            </div>

        
            <hr className="border-white bg-white border w-45 mt-1"/>
            
            {currentTab === "ALARM" ? <AlarmArea/> : <StopwatchArea/>}
    
        </div>
    )
}