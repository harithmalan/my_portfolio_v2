import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const AUTO_SCROLL_INTERVAL = 3800
const RESUME_DELAY = 5000

export default function HorizontalGallery({ children }) {
  const trackRef = useRef(null)
  const resumeTimer = useRef(null)
  const autoTimer = useRef(null)
  const [paused, setPaused] = useState(false)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const cardStep = () => {
    const track = trackRef.current
    if (!track) return 400
    const firstCard = track.firstElementChild
    return firstCard ? firstCard.getBoundingClientRect().width + 24 : 400
  }

  const scrollByAmount = (dir) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: dir * cardStep(), behavior: 'smooth' })
    pauseAutoplay()
  }

  const pauseAutoplay = () => {
    setPaused(true)
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => setPaused(false), RESUME_DELAY)
  }

  const updateEdges = () => {
    const track = trackRef.current
    if (!track) return
    const maxScroll = track.scrollWidth - track.clientWidth
    setAtStart(track.scrollLeft <= 4)
    setAtEnd(track.scrollLeft >= maxScroll - 4)
  }

  // auto-scroll loop
  useEffect(() => {
    autoTimer.current = setInterval(() => {
      const track = trackRef.current
      if (!track || paused) return
      const maxScroll = track.scrollWidth - track.clientWidth
      if (maxScroll <= 0) return
      const next = track.scrollLeft >= maxScroll - 4 ? 0 : track.scrollLeft + cardStep()
      track.scrollTo({ left: next, behavior: 'smooth' })
    }, AUTO_SCROLL_INTERVAL)
    return () => clearInterval(autoTimer.current)
  }, [paused])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    updateEdges()
    track.addEventListener('scroll', updateEdges, { passive: true })
    return () => track.removeEventListener('scroll', updateEdges)
  }, [])

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onPointerDown={pauseAutoplay}
        onWheel={pauseAutoplay}
        className="gallery-track flex gap-6 md:gap-8 overflow-x-auto -mx-6 md:-mx-10 px-6 md:px-10 pb-4"
      >
        {children}
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => scrollByAmount(-1)}
          disabled={atStart}
          data-cursor-hover
          aria-label="Previous project"
          className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors disabled:opacity-30 hover:border-white"
          style={{ borderColor: 'var(--line)', color: 'var(--text)' }}
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => scrollByAmount(1)}
          disabled={atEnd}
          data-cursor-hover
          aria-label="Next project"
          className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors disabled:opacity-30 hover:border-white"
          style={{ borderColor: 'var(--line)', color: 'var(--text)' }}
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <style>{`
        .gallery-track {
          scroll-snap-type: x proximity;
          scrollbar-width: thin;
          scrollbar-color: var(--line) transparent;
          -webkit-overflow-scrolling: touch;
        }
        .gallery-track > * {
          scroll-snap-align: start;
        }
        .gallery-track::-webkit-scrollbar {
          height: 6px;
        }
        .gallery-track::-webkit-scrollbar-thumb {
          background: var(--line);
          border-radius: 3px;
        }
      `}</style>
    </div>
  )
}
