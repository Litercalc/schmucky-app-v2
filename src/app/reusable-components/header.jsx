import WavyText from "../reusable-components/wavy-text.jsx"
import CloseWindow from "./close-window-button.jsx"

export default function Header({title}) {
    return(
    <>
        <CloseWindow/>
        <WavyText text={title}/>
    </>
    )
}