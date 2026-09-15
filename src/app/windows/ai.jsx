import Header from "../reusable-components/header.jsx"
import SubmitButton from "../reusable-components/submit-button.jsx"

export default function SchmuckyAI(){
    return (
        <div className=" origin-bottom-right animate-expand [-webkit-app-region:drag] w-60 h-80 flex flex-col items-center bg-linear-to-br from-[#294d4d]/90 via-[#2e6161] to-[#294d4d]/90 overflow-hidden border-4 border-gray-900 rounded-xl">
            
            <Header title="Ducky AI"/>

            <div className="border-2 border-white w-55 h-44  bg-black">
                

            </div>


            <div className="flex gap-2 mt-3 items-center justify-center">
                <input type="text" id="prompt" className="[-webkit-app-region:no-drag] bg-white font-jersey text-l indent-1 border-b-[#94c9cc] border-b-6 " size={18} placeholder="Enter Prompt..."/>
                <SubmitButton label="⏎"/>
                <SubmitButton label="⎘"/>
            </div>
    
        </div>
    )
}