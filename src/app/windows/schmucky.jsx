import duckIdle from "../../assets/duck-idle.gif"
import { useRef } from "react"
import ContextMenu from "../misc-components/context-menu.jsx"

import useInteractables from "../custom-hooks/useInteractables.js"
import useContextMenu from "../custom-hooks/useContextMenu.js"



export default function Schmucky() {
    const duckArea = useRef(null)
    const contextMenu = useRef(null)

    useInteractables([duckArea, contextMenu])
    useContextMenu([duckArea, contextMenu])

    return (
        <div className="flex relative select-none" draggable="false">
            <ContextMenu ref={contextMenu}/>
            <img src={duckIdle} alt="" className="ml-auto mt-32"/>
            <div className="w-22 h-32 bg-black opacity-20 absolute ml-30 mt-48 cursor-grab" ref={duckArea}></div>
        </div>
    )
}