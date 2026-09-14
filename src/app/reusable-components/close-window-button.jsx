


export default function CloseWindow() {
    return (
        <button type="button" className="[-webkit-app-region:no-drag] text-[#f0e734] font-jersey h-9 w-8 text-3xl mr-auto hover:brightness-90 transition-all duration-300 cursor-pointer hover:-translate-y-0.5" onClick={() => window.electron.closeWindow()}>
            x
        </button>
    )
    
}