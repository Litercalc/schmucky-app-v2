import { useRef } from "react"


export default function CloseWindowButton() {
    function closeWindow() {
    const parent = child.current.parentElement
    parent.classList.remove('animate-expand', 'origin-bottom-right')
    parent.classList.add('animate-close-window', 'origin-center')
    console.log(parent.classList)
    setTimeout(() => {
        window.electron.closeWindow()
    }, 150);
}

    const child = useRef(null)

    return (
        <button ref={child} id="close" type="button" className="[-webkit-app-region:no-drag] text-[#f0e734] font-jersey h-9 w-8 text-3xl mr-auto hover:brightness-90 transition-all duration-300 cursor-pointer hover:-translate-y-0.5" onClick={() => closeWindow()}>
            x
        </button>
    )
    
}