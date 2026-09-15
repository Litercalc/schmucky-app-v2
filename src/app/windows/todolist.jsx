import Header from "../reusable-components/header.jsx"
import SubmitButton from "../reusable-components/submit-button.jsx"

export default function ToDoList(){
    return (
        <div className="[-webkit-app-region:drag] origin-bottom-right animate-expand w-60 h-80 flex flex-col items-center bg-linear-to-br from-[#294d4d]/90 via-[#2e6161] to-[#294d4d]/90 overflow-hidden border-4 border-gray-900 rounded-xl">
            <Header title="To-Do List"/>
            <hr className="border-white bg-white border-2 w-40 -mt-3"/>

            <div className="border-2 border-white w-55 h-40 mt-2">
                

            </div>
            <hr className="border-white bg-white border-2 w-40 mt-2"/>

            <div className="flex gap-2 mt-3 items-center justify-center">
                <input type="text" id="task" className="bg-white font-jersey text-l indent-1 border-b-[#94c9cc] border-b-6 [-webkit-app-region:no-drag] " size={20} placeholder="Enter Task..."/>
                <SubmitButton label="Enter"/>
            </div>
    
        </div>
    )
}