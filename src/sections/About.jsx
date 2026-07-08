import { motion } from 'framer-motion'
import SectionLabel from '../components/SectionLabel'
import ParallaxPanel from '../components/ParallaxPanel'
import FloatingArt from '../components/FloatingArt'

export default function About() {
  const handleImageMove = (event) => {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    card.style.setProperty('--mx', `${x * 100}%`)
    card.style.setProperty('--my', `${y * 100}%`)
    card.style.setProperty('--rx', `${(0.5 - y) * 6}deg`)
    card.style.setProperty('--ry', `${(x - 0.5) * -8}deg`)
  }

  const handleImageLeave = (event) => {
    const card = event.currentTarget

    card.style.setProperty('--mx', '50%')
    card.style.setProperty('--my', '50%')
    card.style.setProperty('--rx', '0deg')
    card.style.setProperty('--ry', '0deg')
  }

  return (
    <section id="about" className="relative py-20 md:py-28 px-6 md:px-10 max-w-6xl mx-auto overflow-hidden">
      <SectionLabel index={1} total={6} title="About" />
      <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="md:col-span-7 relative z-10"
        >
          <p className="font-display text-3xl md:text-5xl leading-[1.15] tracking-tight">
            I bridge robust engineering with compelling visual design —
            every interaction <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>considered</em>, top to bottom.
          </p>
          <p className="mt-8 text-base md:text-lg max-w-xl" style={{ color: 'var(--muted)' }}>
            I'm a versatile software developer and graphic designer working
            across Angular, React, Node.js, Spring Boot, Flutter, and PHP,
            alongside the Adobe Creative Suite. I build responsive, scalable
            applications and bring custom illustration into the interfaces
            around them — currently completing a BSc in Computer Science.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            {[
              ['Focus', 'Full-stack development'],
              ['Craft', 'UI & graphic design'],
              ['Style', 'Iterative, precise'],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: 'var(--accent)' }}>{label}</p>
                <p className="text-sm" style={{ color: 'var(--text)' }}>{value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5 h-80 md:h-[26rem] relative z-10 md:sticky md:top-24"
        >
          <div
            onMouseMove={handleImageMove}
            onMouseLeave={handleImageLeave}
            style={{
              '--mx': '50%',
              '--my': '50%',
              '--rx': '0deg',
              '--ry': '0deg',
            }}
            className="group relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] [perspective:1000px]"
          >
            <div className="absolute left-4 top-4 z-20 h-10 w-10 border-l border-t border-white/35 transition-all duration-500 group-hover:left-5 group-hover:top-5" />
            <div className="absolute bottom-4 right-4 z-20 h-10 w-10 border-b border-r border-white/35 transition-all duration-500 group-hover:bottom-5 group-hover:right-5" />
            <div className="relative z-10 h-full w-full overflow-hidden rounded-3xl transition-transform duration-300 ease-out [transform:rotateX(var(--rx))_rotateY(var(--ry))]">
              <img
                src={`${import.meta.env.BASE_URL}me.jpeg`}
                alt="Harith"
                className="block h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/24 via-transparent to-white/5 opacity-65 transition-opacity duration-500 group-hover:opacity-40" />
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.16), transparent 28%)' }} />
            </div>
            <div className="pointer-events-none absolute inset-x-4 bottom-4 z-20 flex items-center gap-3 opacity-0 transition-all duration-500 group-hover:inset-x-6 group-hover:opacity-100">
              <span className="h-px flex-1 bg-white/35" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
            </div>
          </div>
        </motion.div>
      </div>

      <FloatingArt
        src="/art/knight.png"
        width={440}
        delay={0.2}
        className="absolute -right-4 left-172 -bottom-48 md:-bottom-40 z-0 opacity-75"
      />
    </section>
  )
}
