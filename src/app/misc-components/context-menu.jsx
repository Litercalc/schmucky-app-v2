import { forwardRef } from "react"
import ContextOption from "./context-options.jsx"
import { create } from "zustand"


export const useTokenStore = create((set) => ({
    hasToken: false,

    setHasToken: async () => set({hasToken: await window.electron.getStore("userId")})
}))


export default forwardRef (function ContextMenu(props, ref) {

    const hasToken = useTokenStore(state => state.hasToken)

    return (
        <div ref={ref} className="fixed ml-37 mt-15 hidden ">
            <div className={`border-2 border-b-1 border-[#944242] ${hasToken && "pointer-events-none opacity-75"}`}>
                <ContextOption label="Register"/>
                <ContextOption label="Login"/>
            </div>
            <div className={`border-2 border-t-1 border-b-1 border-[#944242] ${!hasToken && "pointer-events-none opacity-75"}`}>
                <ContextOption label="To-Do List"/>
                <ContextOption label="Note"/>
                <ContextOption label="Boop-a-Schmuck"/>
                <ContextOption label="Set Alarm"/>
            </div>
            <div className={`border-2 border-t-1 border-[#944242] ${!hasToken && "pointer-events-none opacity-75"}`}>
                <ContextOption label="Logout"/>
            </div>
        </div>
    )
})