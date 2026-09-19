

export default function WavyText({ text }) {
  return (
    <h1 className="[-webkit-app-region:drag] font-jersey text-[48px] text-white flex -mt-6 select-none" style={{ WebkitTextStroke: '2px #94c9cc' }} >
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block animate-wave"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h1>
  )
}