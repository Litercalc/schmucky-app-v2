

export default function WavyText({ text }) {
  return (
    <h1 className="font-jersey text-[64px] text-white flex -mt-5" style={{ WebkitTextStroke: '2px #94c9cc' }}>
      {text.split('').map((char, i) => (
        <h1
          key={i}
          className="inline-block animate-wave"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </h1>
      ))}
    </h1>
  )
}