import { motion } from 'framer-motion'

export default function FloatingArt({ src, className = '', width = 260, flip = false, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 0.9, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1, delay }}
      className={`hidden lg:block pointer-events-none select-none ${className}`}
      style={{ width }}
    >
      <motion.img
        src={src}
        alt=""
        aria-hidden="true"
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="w-full h-auto"
        style={{
          transform: flip ? 'scaleX(-1)' : undefined,
          filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0)) drop-shadow(0 0 30px rgba(201, 165, 106, 0))',
          opacity: 0.85,
          mixBlendMode: 'luminosity',
          maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
        }}
      />
    </motion.div>
  )
}
