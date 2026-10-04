import { useEffect} from "react"
import { useStateStore } from "../utils/schmucky-state-machine"



export default function useSetAnimation() {

    const setCurrentState = useStateStore(state => state.setCurrentState)

    useEffect(() => {
        const unsubscribe = window.electron.setAnimation((data) => {
            console.log(data)
            setCurrentState(data)
        })

        return unsubscribe
    }, [])
}