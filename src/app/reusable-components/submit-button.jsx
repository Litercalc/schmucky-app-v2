

export default function SubmitButton({label, func}) {
    return <button type="button" className="[-webkit-app-region:no-drag] text-black bg-[#f0e734] font-jersey w-24 h-7 text-xl border-b-[#e6be2f] border-b-6 hover:brightness-90 transition-all duration-300 cursor-pointer hover:-translate-y-0.5" onClick={() => func}>{label}</button>
}