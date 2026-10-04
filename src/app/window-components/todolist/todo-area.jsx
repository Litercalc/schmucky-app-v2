import { useTabStore } from "../../reusable-components/tabs.jsx"
import Loading from "../../../assets/loading.gif"
import Task from "./tasks.jsx"


export default function ToDoArea({tasks, pending}) {

    const getCurrentTab = useTabStore(state => Object.entries(state.todoTabs).find( ([key, value]) => value === true)[0] )
    const sortedTasks = tasks && [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    let allTasks = []
    sortedTasks && sortedTasks.map(e => {
        if (e.status === getCurrentTab)
            allTasks = [...allTasks, <Task taskName={e.task} key={e.id} status={e.status} id={e.id} />]
    })

    
    return (
        <div className={`border-2 overflow-y-auto max-h-40 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#e0d26f] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent border-white w-55 h-41 ${allTasks.length === 0 && "flex items-center justify-center"}`}>
            {pending ? <img src={Loading} alt="" /> : 
            allTasks.length === 0 ? <p className=" font-jersey text-white ">{`${getCurrentTab}: currently empty`}</p> : 
            allTasks}

        </div>
    )
}