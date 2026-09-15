import duckIdle from "../../assets/duck-idle.gif"
import { useRef, useEffect } from "react"
import ContextMenu from "../misc-components/context-menu.jsx"

export default function Schmucky() {
    const duckArea = useRef(null)
    const contextMenu = useRef(null)

    useEffect(() => {
         const duck = duckArea.current
         const menu = contextMenu.current
         const interactables = [duck, menu]


        duck.addEventListener("contextmenu", (e) => {
            e.preventDefault()
            menu.classList.add('animate-fade-in')
            menu.classList.remove('animate-fade-out')
            menu.style.display = "block"
        })

        interactables.forEach(element => {
            element.addEventListener("mouseenter", () => {
                window.electron.isOnInteractable(true)
            })
            
            element.addEventListener("mouseleave", () => {
                console.log("mouse left")
                window.electron.isOnInteractable(false)
            })
        })

        document.addEventListener("click", () => {
            menu.classList.remove('animate-fade-in')
            menu.classList.add('animate-fade-out')
            setTimeout(() => {
                menu.style.display = "none"
            }, 150)

        })

        menu.addEventListener("click", () => {

            window.electron.isOnInteractable(false)
            
        })

    }, [])

    return (
        <div className="flex relative select-none" draggable="false">
            <ContextMenu ref={contextMenu}/>
            <img src={duckIdle} alt="" className="ml-auto mt-32"/>
            <div className="w-22 h-32 bg-black opacity-20 absolute ml-30 mt-48 cursor-grab" ref={duckArea}></div>
        </div>
    )
}