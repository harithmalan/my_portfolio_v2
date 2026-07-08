import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ParallaxPanel({ className = '', children, image }) {
  const wrapRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerRef.current,
        { scale: 1.25, y: -40 },
        {
          scale: 1,
          y: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )
      gsap.fromTo(
        wrapRef.current,
        { clipPath: 'inset(12% round 4px)' },
        {
          clipPath: 'inset(0% round 4px)',
          ease: 'none',
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top bottom',
            end: 'top 40%',
            scrub: 1,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className={`relative overflow-hidden rounded-md ${className}`}>
      <div
        ref={innerRef}
        className="absolute inset-0"
        style={{
          backgroundImage: image
            ? `url(${image})`
            : 'radial-gradient(circle at 30% 20%, rgba(201,164,106,0.55), transparent 55%), radial-gradient(circle at 75% 80%, rgba(143,107,82,0.45), transparent 50%), linear-gradient(160deg, #2a2419, #0d0c0a)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(13,12,10,0) 40%, rgba(13,12,10,0.55) 100%)' }} />
      {children && <div className="relative z-10 h-full">{children}</div>}
    </div>
  )
}
