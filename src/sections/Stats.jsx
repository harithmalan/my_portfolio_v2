import useCountUp from '../lib/useCountUp'

const STATS = [
  { label: 'Years building', value: 5, suffix: '+' },
  { label: 'Projects shipped', value: 20, suffix: '+' },
  { label: 'Disciplines', value: 3, suffix: '' },
  { label: 'Cups of coffee', value: 1200, suffix: '+' },
]

function Stat({ label, value, suffix }) {
  const [ref, count] = useCountUp(value)
  return (
    <div ref={ref} className="text-center md:text-left">
      <p className="font-display text-4xl md:text-5xl" style={{ color: 'var(--accent)' }}>
        {count}
        {suffix}
      </p>
      <p className="font-mono text-[10px] tracking-widest uppercase mt-2" style={{ color: 'var(--muted)' }}>
        {label}
      </p>
    </div>
  )
}

export default function Stats() {
  return (
    <section className="relative py-16 md:py-20 px-6 md:px-10 max-w-6xl mx-auto border-t border-b" style={{ borderColor: 'var(--line)' }}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        {STATS.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
    </section>
  )
}
