import Header from "../reusable-components/header.jsx"
import SubmitButton from "../reusable-components/submit-button.jsx"

import Tab from "../reusable-components/tabs.jsx"
import ToDoArea from "../window-components/todolist/todo-area.jsx"
import { useTabStore } from "../reusable-components/tabs.jsx"
import catchError from "../utils/err-handling.js"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import Loading from "../../assets/loading.gif"
import { useStateStore } from "../utils/schmucky-state-machine.js"

export default function ToDoList(){
    const queryClient = useQueryClient()
    const todoTabs = useTabStore(state => state.todoTabs)
    const setCurrentState = useStateStore(state => state.setCurrentState)

    const todolistMutation = useMutation({
        mutationFn:({task}) => window.electron.addTask(task),

        
        onSuccess: () => {window.electron.sendMessageToMain("Added new task!"); queryClient.invalidateQueries({queryKey: ['todos']})},

        onError: (error) => window.electron.sendMessageToMain(catchError(error))
    })

    const todolistQuery = useQuery({
        queryKey: ['todos'],
        queryFn: () => window.electron.getTasks()
    })

    

    const tabs = Object.entries(todoTabs).map(([key, value]) =>
        <Tab label={key} key={key} state={value} tabGroup="todoTabs"/>
    )

    async function todolistMain(e) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const task = formData.get("task")

        todolistMutation.mutate({task})

        e.currentTarget.reset()


    }

    if (todolistMutation.isPending) {
        window.electron.setAnimationToMain('WRITE')
    }

    return (
        <form onSubmit={todolistMain} className="origin-bottom-right animate-expand w-60 h-80 flex flex-col items-center bg-linear-to-br from-[#294d4d]/90 via-[#2e6161] to-[#294d4d]/90 overflow-hidden border-4 border-gray-900 rounded-xl">
            <Header title="To-Do List"/>

            <div className="flex mr-5  h-4 -mb-px [-webkit-app-region:no-drag]">
                {tabs}
            </div>

            <ToDoArea pending={todolistQuery.isPending} tasks={todolistQuery.isSuccess && todolistQuery.data[0].data}/>
        
            <hr className="border-white bg-white border w-40 mt-1"/>

            <div className="flex gap-2 mt-1 items-center justify-center">
                <input type="text" name="task" id="task" className="bg-white font-jersey text-l indent-1 border-b-[#94c9cc] border-b-6 [-webkit-app-region:no-drag] " size={20} placeholder="Enter Task..."/>
                {todolistMutation.isPending ? (<img src={Loading} width={27}/>) : (<SubmitButton label="Enter"/>)}
            </div>
    
        </form>
    )
}