

export default function SubmitButton({label, func}) {
    return <button type="button" className="text-black bg-[#f0e734] mt-5 font-jersey w-24 h-8 text-2xl border-b-[#e6be2f] border-b-6 hover:brightness-90 transition-all duration-300 cursor-pointer hover:-translate-y-0.5" onClick={() => func}>{label}</button>
}