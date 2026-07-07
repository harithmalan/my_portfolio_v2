import { useRef } from 'react'
import { motion, useMotionValue } from 'framer-motion'

export default function HorizontalGallery({ children }) {
  const trackRef = useRef(null)
  const containerRef = useRef(null)
  const x = useMotionValue(0)

  const handleWheel = (e) => {
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return // let native horizontal wheel behave normally
    const track = trackRef.current
    const container = containerRef.current
    if (!track || !container) return
    const maxScroll = track.scrollWidth - container.offsetWidth
    if (maxScroll <= 0) return
    e.preventDefault()
    const next = Math.min(0, Math.max(-maxScroll, x.get() - e.deltaY))
    x.set(next)
  }

  return (
    <div ref={containerRef} className="overflow-hidden -mx-6 md:-mx-10 px-6 md:px-10" onWheel={handleWheel}>
      <motion.div
        ref={trackRef}
        className="flex gap-6 md:gap-8 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={containerRef}
        style={{ x }}
        whileTap={{ cursor: 'grabbing' }}
      >
        {children}
      </motion.div>
    </div>
  )
}
