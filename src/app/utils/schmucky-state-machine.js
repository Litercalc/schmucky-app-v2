
import duckIdle from "../../assets/schmucky-states/duck-IDLE.gif"
import duckPet from "../../assets/schmucky-states/duck-PET.gif"
import duckSearching from "../../assets/schmucky-states/duck-SEARCHING.gif"
import duckTalk from "../../assets/schmucky-states/duck-TALK.gif"
import duckWrite from "../../assets/schmucky-states/duck-WRITE.gif"

import { create } from "zustand"

export const useStateStore = create((set, get) => ({
    currentState: 'IDLE',

    setCurrentState: (newState) => {
        const states = {
            'IDLE' : [
                'PET',
                'SEARCHING',
                'TALK',
                'WRITE'
            ],
            'PET' : [
                'IDLE',
                'SEARCHING',
                'TALK',
                'WRITE'
            ],
            'SEARCHING': [
                'IDLE',
                'PET',
                'TALK',
                'WRITE'
            ],
            'TALK' : [
                'IDLE',
                'WRITE'
            ],
            'WRITE': [
                'IDLE',
                'TALK',
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
    'SEARCHING': duckSearching,
    'TALK': duckTalk,
    'WRITE': duckWrite
}