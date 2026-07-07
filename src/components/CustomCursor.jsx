import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!isFinePointer) return

    setVisible(true)
    let ringX = 0, ringY = 0

    const onMove = (e) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
      ringX = e.clientX
      ringY = e.clientY
    }

    let raf
    const animateRing = () => {
      if (ringRef.current) {
        const current = ringRef.current._pos || { x: ringX, y: ringY }
        const nx = current.x + (ringX - current.x) * 0.18
        const ny = current.y + (ringY - current.y) * 0.18
        ringRef.current.style.transform = `translate(${nx}px, ${ny}px)`
        ringRef.current._pos = { x: nx, y: ny }
      }
      raf = requestAnimationFrame(animateRing)
    }
    animateRing()

    const onOver = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) setHovering(true)
    }
    const onOut = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) setHovering(false)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout', onOut)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!visible) return null

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'var(--accent)' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 border transition-[width,height,border-color] duration-200"
        style={{
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          borderColor: hovering ? 'var(--accent)' : 'var(--line)',
        }}
      />
    </>
  )
}
