import { forwardRef } from "react"
import ContextOption from "./context-options.jsx"


export default forwardRef (function ContextMenu(props, ref) {


    return (
        <div ref={ref} className="fixed ml-11 hidden ">
            <div className="border-2 border-b-1 border-[#944242]">
                <ContextOption label="Register"/>
                <ContextOption label="Login"/>
            </div>
            <div className="border-2 border-t-1 border-[#944242]">
                <ContextOption label="To-Do List"/>
                <ContextOption label="Ducky AI"/>
                <ContextOption label="Boop Someone"/>
                <ContextOption label="Set Alarm"/>
                <ContextOption label="Logout"/>
            </div>
        </div>
    )
})