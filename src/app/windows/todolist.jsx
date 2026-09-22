import Header from "../reusable-components/header.jsx"
import SubmitButton from "../reusable-components/submit-button.jsx"

import Tab from "../reusable-components/tabs.jsx"
import ToDoArea from "../window-components/todo-area.jsx"
import { useTabStore } from "../reusable-components/tabs.jsx"

export default function ToDoList(){

    const todoTabs = useTabStore(state => state.todoTabs)

    const tabs = Object.entries(todoTabs).map(([key, value]) =>
        <Tab label={key} key={key} state={value} tabGroup="todoTabs"/>
    )

    return (
        <div className="origin-bottom-right animate-expand w-60 h-80 flex flex-col items-center bg-linear-to-br from-[#294d4d]/90 via-[#2e6161] to-[#294d4d]/90 overflow-hidden border-4 border-gray-900 rounded-xl">
            <Header title="To-Do List"/>

            <div className="flex mr-5  h-4 -mb-px [-webkit-app-region:no-drag]">
                {tabs}
            </div>

            <ToDoArea/>
        
            <hr className="border-white bg-white border w-40 mt-1"/>

            <div className="flex gap-2 mt-1 items-center justify-center">
                <input type="text" id="task" className="bg-white font-jersey text-l indent-1 border-b-[#94c9cc] border-b-6 [-webkit-app-region:no-drag] " size={20} placeholder="Enter Task..."/>
                <SubmitButton label="Enter"/>
            </div>
    
        </div>
    )
}