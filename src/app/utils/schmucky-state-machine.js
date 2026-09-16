
import duckIdle from "../../assets/schmucky-states/duck-IDLE.gif"
import duckPet from "../../assets/schmucky-states/duck-PET.gif"
import duckSearching from "../../assets/schmucky-states/duck-SEARCHING.gif"


let currentState = 'IDLE'

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

export const animationStates = {
    'IDLE': duckIdle,
    'PET': duckPet,
    'SEARCHING': duckSearching
}

export default function schmuckyStateMachine(nextState) {

    if (states[currentState].includes(nextState)) {
        currentState = nextState
        console.log(currentState)
    }
}