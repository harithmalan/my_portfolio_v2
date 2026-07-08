import { useEffect, useRef, Suspense } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GraduationCap, Camera, Swords, Newspaper } from 'lucide-react'
import SectionLabel from '../components/SectionLabel'
import BookModel from '../components/three/BookModel'
import AssetErrorBoundary from '../components/AssetErrorBoundary'
import FloatingArt from '../components/FloatingArt'


gsap.registerPlugin(ScrollTrigger)

const EDUCATION = [
  {
    period: 'Present',
    title: 'BSc in Computer Science',
    body: 'University of Bedfordshire',
  },
  {
    period: '2025',
    title: 'Higher National Diploma in IT',
    body: 'SLIIT City University',
  },
  {
    period: '2023',
    title: 'Foundation Certificate Course',
    body: 'SLIIT City University',
  },
  {
    period: '2021 (2022)',
    title: 'GCE Ordinary Level',
    body: 'G/Neluwa National School — Results: 5A 4B',
  },
]

const ACHIEVEMENTS = [
  { icon: Camera, title: 'All-Island 1st Place', body: 'News photography competition' },
  { icon: Swords, title: 'All-Island 3rd Place', body: 'Karate competition (Kumite)' },
  { icon: Swords, title: 'All-Island 3rd Place', body: 'Karate competition (Katha)' },
  { icon: Newspaper, title: 'Best Journalist, 2020', body: 'School-wise recognition' },
]

export default function Education() {
  const trackRef = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fillRef.current,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 65%',
            end: 'bottom 65%',
            scrub: 0.6,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="education" className="relative py-20 md:py-28 px-6 md:px-10 max-w-6xl mx-auto">
      <SectionLabel index={4} total={6} title="Education & Achievements" />

      <div className="lg:flex lg:gap-10 items-start">
        <div ref={trackRef} className="relative pl-14 md:pl-20 mb-14 lg:flex-1">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px" style={{ background: 'var(--line)' }} />
          <div ref={fillRef} className="absolute left-4 md:left-8 top-0 w-px" style={{ background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }} />

          <div className="flex flex-col gap-14 md:gap-16">
            {EDUCATION.map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.55 }}
                className="relative group"
                data-cursor-hover
              >
                <div
                  className="absolute -left-[3.15rem] md:-left-[4.65rem] top-0 w-8 h-8 md:w-9 md:h-9 rounded-full border flex items-center justify-center transition-colors duration-300"
                  style={{ borderColor: 'var(--line)', background: 'var(--bg)', color: 'var(--accent)' }}
                >
                  <GraduationCap size={15} strokeWidth={1.7} />
                </div>
                <p className="font-mono text-xs tracking-widest mb-1" style={{ color: 'var(--accent)' }}>{item.period}</p>
                <h4 className="font-display text-xl md:text-2xl mb-2 transition-transform duration-300 group-hover:translate-x-1">
                  {item.title}
                </h4>
                <p className="max-w-xl text-sm md:text-base" style={{ color: 'var(--muted)' }}>{item.body}</p>
            </motion.div>
          ))}
          </div>
        </div>

        <FloatingArt
                src="/art/face.png"
                width={350}
                delay={0.2}
                className="absolute -right-1.5 -top-0.9 -bottom-0.9 z-0 opacity-75"
              />
      </div>

      <p className="font-mono text-[10px] tracking-widest uppercase mb-6" style={{ color: 'var(--muted)' }}>
        Achievements &amp; Awards
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ACHIEVEMENTS.map((a, i) => (
          <motion.div
            key={a.title + i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="p-5 rounded-xl border"
            style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
              style={{ background: 'var(--surface-2)', color: 'var(--accent)' }}
            >
              <a.icon size={18} strokeWidth={1.6} />
            </div>
            <p className="font-display text-base mb-1">{a.title}</p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>{a.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
