import Header from "../reusable-components/header.jsx"
import SubmitButton from "../reusable-components/submit-button.jsx"

export default function login(){
    return (
        <div className="w-80 h-100 flex flex-col items-center bg-linear-to-br from-[#294d4d]/90 via-[#2e6161] to-[#294d4d]/90 overflow-hidden border-4 border-gray-900 rounded-xl">
            <Header title="To-Do List"/>
            <hr className="border-white bg-white border-2 w-40 -mt-3"/>

            <div className="border-2 border-white w-70 h-50 mt-2">
                

            </div>

            <hr className="border-white bg-white border-2 w-40 mt-2"/>

            <div className="flex gap-3 mt-1">
                <input type="text" id="username" className="bg-white font-jersey text-xl indent-1 border-b-[#94c9cc] border-b-6 mt-3.5" size={20} placeholder="Enter Task..."/>
                <SubmitButton label="Enter"/>
            </div>
    
        </div>
    )
}