import Header from "../reusable-components/header.jsx"
import SubmitButton from "../reusable-components/submit-button.jsx"

export default function Chat(){

    async function chatMain(e) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const recipient = formData.get("recipient")
        const message = formData.get("message")
        window.electron.sendMessage(recipient, message)

        e.currentTarget.reset()


    }

    return (
        <form onSubmit={chatMain} className="origin-bottom-right animate-expand [-webkit-app-region:drag] w-60 h-55 flex flex-col items-center bg-linear-to-br from-[#294d4d]/90 via-[#2e6161] to-[#294d4d]/90 overflow-hidden border-4 border-gray-900 rounded-xl mt-25">
            
            <Header title="Boop"/>



            <div className="flex flex-col gap-2 items-center justify-center">
                <input name="recipient" type="text" id="recipient" className="bg-white font-jersey text-l indent-1 border-b-[#94c9cc] border-b-6 [-webkit-app-region:no-drag]" size={25} placeholder="Enter Recipient..."/>
                <input name="message" type="text" id="message" className="bg-white font-jersey text-l indent-1 border-b-[#94c9cc] border-b-6 [-webkit-app-region:no-drag] " size={25} placeholder="Enter Message..."/>
                <SubmitButton label="Send"/>
            </div>
    
        </form>
    )
}