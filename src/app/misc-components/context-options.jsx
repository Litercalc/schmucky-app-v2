

export default function ContextOption({label}) {


    return (
        <div className="pl-1  w-auto px-2 bg-[#e0d26f] border-t-[#c7856e] border-b-[#c7856e] border-b-1 border-t-1 hover:text-[#7a3232] text-[#944242] hover:bg-[#e1e674] transition-all duration-100" onClick={() => {label !== 'Logout' ? window.electron.openWindow(label) : window.electron.logout()}}>
            <h1 className="text-xs font-jersey">{label}</h1>
        </div>
    )
}