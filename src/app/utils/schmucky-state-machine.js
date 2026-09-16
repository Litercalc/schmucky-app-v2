
let currentState = 'IDLE'

export default function schmuckyStateMachine(nextState) {

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

    if (states[currentState].includes(nextState)) {
        currentState = nextState
        console.log(currentState)
    }
}