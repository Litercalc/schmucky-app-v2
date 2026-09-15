import duckIdle from "../../assets/duck-idle.gif"
import { useRef, useEffect } from "react"
import ContextMenu from "../misc-components/context-menu.jsx"

export default function Schmucky() {
    const duckArea = useRef(null)
    const contextMenu = useRef(null)

    useEffect(() => {
         const duck = duckArea.current

        duck.addEventListener("contextmenu", (e) => {
            e.preventDefault()
            window.electron.openContextMenu()
            // e.preventDefault()
            // contextMenu.current.style.display = "block"
        })

        duck.addEventListener("mouseenter", () => {
            window.electron.isOnInteractable(true)
        })

        duck.addEventListener("mouseleave", () => {
            window.electron.isOnInteractable(false)
        })

        document.addEventListener("click", () => {
            contextMenu.current.style.display = "none"
        })
    }, [])


    return (
        <div className="flex relative select-none" draggable="false">
            <ContextMenu ref={contextMenu}/>
            <img src={duckIdle} alt="" className="ml-auto mt-32"/>
            <div className="w-20 h-30 bg-black opacity-20 absolute ml-32 mt-50 cursor-grab" ref={duckArea}></div>
        </div>
    )
}