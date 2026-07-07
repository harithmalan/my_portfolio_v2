import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, useScroll, useTransform } from 'framer-motion'
import SignalCore from '../components/three/SignalCore'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <section id="top" ref={ref} className="relative h-screen w-full overflow-hidden bg-grid">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} dpr={[1, 1.5]}>
          <SignalCore scrollProgress={scrollYProgress} />
        </Canvas>
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(circle at 50% 45%, transparent 0%, var(--bg) 78%)' }}
      />

      <motion.div style={{ opacity, y }} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-mono text-[11px] md:text-xs tracking-[0.4em] uppercase mb-8"
          style={{ color: 'var(--accent)' }}
        >
          Software Developer — Graphic Designer
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-medium text-6xl md:text-8xl lg:text-[9rem] leading-[0.92] tracking-tight"
        >
          Harith Malan
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-6 max-w-xl text-base md:text-lg"
          style={{ color: 'var(--muted)' }}
        >
          I build interfaces and systems that feel considered — full‑stack
          products, custom illustration, and everything in the space between.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-10 flex items-center gap-4"
        >
          <a
            href="#projects"
            className="font-mono text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-transform hover:scale-105"
            style={{ background: 'var(--signal)', color: '#0a0e14' }}
          >
            View Work
          </a>
          <a
            href="#contact"
            className="font-mono text-xs tracking-widest uppercase px-6 py-3 rounded-full border transition-colors hover:border-white"
            style={{ borderColor: 'var(--line)' }}
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="font-mono text-[10px] tracking-widest" style={{ color: 'var(--muted)' }}>SCROLL</span>
        <div className="w-px h-8" style={{ background: 'linear-gradient(var(--signal), transparent)' }} />
      </motion.div>
    </section>
  )
}

