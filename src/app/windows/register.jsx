import Header from "../reusable-components/header.jsx"
import SubmitButton from "../reusable-components/submit-button.jsx"
import duckFamWalking from "../../assets/duck-family-walking.gif"

export default function register(){
    return (
        <div className="w-80 h-100 flex flex-col items-center bg-linear-to-br from-[#294d4d]/90 via-[#2e6161] to-[#294d4d]/90 overflow-hidden border-4 border-gray-900 rounded-xl">
            <Header title="Register"/>
            <hr className="border-white bg-white border-2 w-40"/>
            <table className="border-separate border-spacing-y-8">
                <tr>
                    <td className="pr-1">
                        <h2 className="text-white font-jersey text-2xl">Username:</h2>
                    </td>
                    <td className="pl-1">
                        <input type="text" id="username" className="bg-white font-jersey text-xl indent-1 border-b-[#94c9cc] border-b-6" size={15} placeholder="Enter Username..."/>
                    </td>
                </tr>
                <tr>
                    <td className="pr-1">
                        <h2 className="text-white font-jersey text-2xl">Password:</h2>
                    </td>
                    <td className="pl-1">
                        <input type="password" id="password" className="bg-white font-jersey text-xl indent-1 border-b-[#94c9cc] border-b-6" size={15} placeholder="Enter Password..."/>
                    </td>
                </tr>
            </table>
            <hr className="border-white border-2 w-40"/>
            <SubmitButton label="Register"/>
            <img src={duckFamWalking} alt="" width={100} className="animate-walk -ml-150 mt-5" draggable="true"/>
        </div>
    )
}