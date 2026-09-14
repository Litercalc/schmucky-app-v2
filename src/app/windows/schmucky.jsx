import duckIdle from "../../assets/duck-idle.gif"
import { useRef, useEffect } from "react"

export default function Schmucky() {
    const duckImage = useRef(null)

    useEffect(() => {
         const duck = duckImage.current

        duck.addEventListener("contextmenu", () => {
            window.electron.openContextMenu()
        })
    }, [])


    return (
        <div className="flex ">
            <img src={duckIdle} alt="" className="ml-auto" ref={duckImage}/>
        </div>
    )
}