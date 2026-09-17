
import duckIdle from "../../assets/schmucky-states/duck-IDLE.gif"
import duckPet from "../../assets/schmucky-states/duck-PET.gif"
import duckSearching from "../../assets/schmucky-states/duck-SEARCHING.gif"

import { create } from "zustand"

export const useStateStore = create((set, get) => ({
    currentState: 'IDLE',

    setCurrentState: (newState) => {
        const states = {
            'IDLE' : [
                'PET',
                'SEARCHING'
            ],
            'PET' : [
                'IDLE',
                'SEARCHING'
            ],
            'SEARCHING': [
                'IDLE',
                'PET'
            ]
        }

        if (states[get().currentState].includes(newState)) {
            set({currentState: newState})
            console.log(get().currentState)
        }
    }
}))


export const animationStates = {
    'IDLE': duckIdle,
    'PET': duckPet,
    'SEARCHING': duckSearching
}