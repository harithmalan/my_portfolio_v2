import { motion } from 'framer-motion'
import SectionLabel from '../components/SectionLabel'
import ParallaxPanel from '../components/ParallaxPanel'

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-40 px-6 md:px-10 max-w-6xl mx-auto">
      <SectionLabel index={1} total={6} title="About" />
      <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="md:col-span-7"
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

        <div className="md:col-span-5 h-80 md:h-[26rem]">
          <ParallaxPanel className="w-full h-full" />
        </div>
      </div>
    </section>
  )
}
