import { useEffect, useRef } from "react"
import schmuckyStateMachine from "../utils/schmucky-state-machine"

export default function usePetSchmucky(duckRef) { 

    const isMouseDown = useRef(false)

    console.log(duckRef)

    useEffect(() => {

        const duck = duckRef.current

        const onMouseDown = () => isMouseDown.current = true
        const onMouseUp = () => isMouseDown.current = false
        const onMouseMove = () => {
            if (isMouseDown.current === true) schmuckyStateMachine("PET")
        }

        const onMouseLeave = () => isMouseDown.current = false
    

        duck.addEventListener("mousedown", onMouseDown)
        duck.addEventListener("mouseup", onMouseUp)
        duck.addEventListener("mousemove", onMouseMove)
        duck.addEventListener("mouseleave", onMouseLeave)

        return () => {
            duck.removeEventListener("mousedown", onMouseDown)
            duck.removeEventListener("mouseup", onMouseUp)
            duck.removeEventListener("mousemove", onMouseMove)
            duck.removeEventListener("mouseleave", onMouseLeave)
        }
        
    }, duckRef)
}