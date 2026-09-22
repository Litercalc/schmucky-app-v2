import { useEffect, useState } from "react"
import { useStateStore } from "../utils/schmucky-state-machine"

import { create } from "zustand"

export const useMessageStore = create((set) => ({
    message: null,

    setMessage: (newMessage) => {console.log(newMessage); set({message: newMessage})}
}))



export default function useCreateMessage() {

    const setCurrentState = useStateStore(state => state.setCurrentState)
    const setMessage = useMessageStore(state => state.setMessage)

    useEffect(() => {
        const unsubscribe = window.electron.createMessage((data) => {
            setMessage(data)
            setCurrentState('TALK')
            setTimeout(() => {
                setMessage(null)
                setCurrentState('IDLE')
            }, 5000)
        })

        return unsubscribe
    }, [])
}