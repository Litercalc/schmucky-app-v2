import { useEffect } from "react"

import schmuckyStateMachine from "../utils/schmucky-state-machine.js"

export default function useContextMenu(refs) {

    useEffect(() => {
        const interactables = refs.map(e => e.current)
        const duck = interactables[0]
        const menu = interactables[1]

        const openContextMenu = (e) => {
            e.preventDefault()
            menu.classList.add('animate-fade-in')
            menu.classList.remove('animate-fade-out')
            menu.style.display = "block"
            schmuckyStateMachine("SEARCHING")
        }

        const closeContextMenu = (e) => {
            menu.classList.remove('animate-fade-in')
            menu.classList.add('animate-fade-out')
            setTimeout(() => {
                menu.style.display = "none"
            }, 150)
            schmuckyStateMachine("IDLE")
        }

        duck.addEventListener("contextmenu", openContextMenu)

        document.addEventListener("click", closeContextMenu)

        return () => {
            duck.removeEventListener("contextmenu", openContextMenu)

            document.removeEventListener("click", closeContextMenu)
        }

    }, refs)
}