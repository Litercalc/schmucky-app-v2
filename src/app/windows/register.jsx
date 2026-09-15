import Header from "../reusable-components/header.jsx"
import SubmitButton from "../reusable-components/submit-button.jsx"
import duckFamWalking from "../../assets/duck-family-walking.gif"

export default function register(){
    return (
        <div className=" [-webkit-app-region:drag] origin-bottom-right animate-expand w-60 h-80 flex flex-col items-center bg-linear-to-br from-[#294d4d]/90 via-[#2e6161] to-[#294d4d]/90 overflow-hidden border-4 border-gray-900 rounded-xl">
            <Header title="Register"/>
            <hr className="border-white bg-white border-2 w-40"/>
            <table className="border-separate border-spacing-y-4">
                <tr>
                    <td className="pr-1">
                        <h2 className="text-white font-jersey text-xl">Username:</h2>
                    </td>
                    <td className="pl-1">
                        <input type="text" id="username" className="bg-white font-jersey text-l indent-1 border-b-[#94c9cc] border-b-6 [-webkit-app-region:no-drag]" size={15} placeholder="Enter Username..."/>
                    </td>
                </tr>
                <tr>
                    <td className="pr-1">
                        <h2 className="text-white font-jersey text-xl">Password:</h2>
                    </td>
                    <td className="pl-1">
                        <input type="password" id="password" className="bg-white font-jersey text-l indent-1 border-b-[#94c9cc] border-b-6 [-webkit-app-region:no-drag]" size={15} placeholder="Enter Password..."/>
                    </td>
                </tr>
            </table>
            <hr className="border-white border-2 w-40"/>
            <div className="mt-5">
                <SubmitButton label="Register"/>
            </div>
            <img src={duckFamWalking} alt="" width={80} className="animate-walk -ml-150 mt-5" draggable="true"/>
        </div>
    )
}