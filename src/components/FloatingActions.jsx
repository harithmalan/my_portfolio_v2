import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, MessageCircle } from 'lucide-react'

export default function FloatingActions() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: '-10% 0px 0px 0px' }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed z-30 bottom-6 left-6 flex items-center gap-3"
        >
          <a
            href="#contact"
            data-cursor-hover
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase px-5 py-3 rounded-full transition-transform hover:scale-105"
            style={{ background: 'var(--accent)', color: '#0d0c0a' }}
          >
            <MessageCircle size={14} /> Contact Me
          </a>
          <button
            onClick={scrollToTop}
            data-cursor-hover
            aria-label="Back to top"
            title="Back to top"
            className="w-11 h-11 rounded-full border flex items-center justify-center transition-colors hover:border-white"
            style={{ borderColor: 'var(--line)', background: 'rgba(13,12,10,0.7)', backdropFilter: 'blur(8px)', color: 'var(--text)' }}
          >
            <ArrowUp size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
