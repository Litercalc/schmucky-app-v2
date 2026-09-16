import { useEffect } from "react"

export default function useInteractables(refs) { 

    useEffect(() => {
        const interactables = refs.map(e => e.current)
        const onEnter = () => window.electron.isOnInteractable(true)
        const onExit = (e) => {

            window.electron.isOnInteractable(false)
        }

        interactables.forEach(element => {
            element.addEventListener("mouseenter", onEnter)
            
            element.addEventListener("mouseleave", onExit)
        })

        return () => {
            interactables.forEach(element => {
                element.removeEventListener("mouseenter", onEnter)
            
                element.removeEventListener("mouseleave", onExit)
            })
        }
    }, [])
}