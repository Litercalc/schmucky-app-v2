import Header from "../reusable-components/header.jsx"
import SubmitButton from "../reusable-components/submit-button.jsx"
import duckFamWalking from "../../assets/duck-family-walking.gif"
import { useMutation } from "@tanstack/react-query"
import catchError from "../utils/err-handling.js"
import Loading from "../../assets/loading.gif"




export default function Login(){

    const loginMutation = useMutation({
        mutationFn:({username, password}) => window.electron.login(username, password),
        onSuccess: () => {
            const currentWindow = document.getElementById("window")
            currentWindow.classList.remove('animate-expand', 'origin-bottom-right')
            currentWindow.classList.add('animate-close-window', 'origin-center')
            setTimeout(() => {
                window.electron.closeWindow()
            }, 150);
        },

        onError: (error) => window.electron.sendMessageToMain(catchError(error))
    })


    
   async function loginMain(e) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const username = formData.get("username")
        const password = formData.get("password")

        loginMutation.mutate({username, password})


    }

    return (
        <form onSubmit={loginMain} id="window" className=" [-webkit-app-region:drag] origin-bottom-right animate-expand w-60 h-80 flex flex-col items-center bg-linear-to-br from-[#294d4d]/90 via-[#2e6161] to-[#294d4d]/90 overflow-hidden border-4 border-gray-900 rounded-xl">
            <Header title="Login"/>
            <hr className="border-white bg-white border-2 w-40"/>
            <table className="border-separate border-spacing-y-4">
                <tr>
                    <td className="pr-1">
                        <h2 className="text-white font-jersey text-xl">Username:</h2>
                    </td>
                    <td className="pl-1">
                        <input type="text" id="username" name="username" className="relative bg-white font-jersey text-l indent-1 border-b-[#94c9cc] border-b-6 [-webkit-app-region:no-drag]" size={15} placeholder="Enter Username..."/>
                    </td>
                </tr>
                <tr>
                    <td className="pr-1">
                        <h2 className="text-white font-jersey text-xl">Password:</h2>
                    </td>
                    <td className="pl-1 relative">
                        <input type="password" id="password" name="password" className="bg-white font-jersey text-l indent-1 border-b-[#94c9cc] border-b-6 [-webkit-app-region:no-drag]" size={15} placeholder="Enter Password..."/>
                    </td>
                </tr>
            </table>
            <hr className="border-white border-2 w-40"/>
            <div className="mt-7">
                {loginMutation.isPending ? (<img src={Loading} width={27}/>) : (<SubmitButton label="Login"/>)}
            </div>
            <img src={duckFamWalking} alt="" width={80} className="animate-walk -ml-150 mt-3" draggable="true"/>
        </form>
    )
}