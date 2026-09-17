import { useEffect } from "react"

import { useStateStore } from "../utils/schmucky-state-machine"

export default function useContextMenu(refs) {

    const setCurrentState = useStateStore(state => state.setCurrentState)

    useEffect(() => {
        const interactables = refs.map(e => e.current)
        const duck = interactables[0]
        const menu = interactables[1]

        console.log(refs)

        const openContextMenu = (e) => {
            e.preventDefault()
            menu.classList.add('animate-fade-in')
            menu.classList.remove('animate-fade-out')
            menu.style.display = "block"
            setCurrentState("SEARCHING")
        }

        const closeContextMenu = (e) => {
            menu.classList.remove('animate-fade-in')
            menu.classList.add('animate-fade-out')
            setTimeout(() => {
                menu.style.display = "none"
            }, 150)
            setCurrentState("IDLE")
        }

        duck.addEventListener("contextmenu", openContextMenu)

        document.addEventListener("click", closeContextMenu)

        return () => {
            duck.removeEventListener("contextmenu", openContextMenu)

            document.removeEventListener("click", closeContextMenu)
        }

    }, refs)
}