import duckIdle from "../../assets/schmucky-states/duck-IDLE.gif"
import { useRef } from "react"
import ContextMenu from "../misc-components/context-menu.jsx"

import useInteractables from "../custom-hooks/useInteractables.js"
import useContextMenu from "../custom-hooks/useContextMenu.js"
import usePetSchmucky from "../custom-hooks/usePetSchmucky.js"

import { animationStates, useStateStore } from "../utils/schmucky-state-machine.js"



export default function Schmucky() {

    const currentState = useStateStore(state => state.currentState)

    const duckArea = useRef(null)
    const contextMenu = useRef(null)

    useInteractables([duckArea, contextMenu])
    useContextMenu([duckArea, contextMenu])
    usePetSchmucky(duckArea)

    return (
        <div className="flex relative select-none" draggable="false">
            <ContextMenu ref={contextMenu}/>
            <img src={animationStates[currentState]} alt="" className="ml-auto mt-42"/>
            <div className="w-22 h-32 absolute ml-30 mt-48 cursor-grab" ref={duckArea}></div>
        </div>
    )
}