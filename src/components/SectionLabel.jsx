import { motion } from 'framer-motion'

export default function SectionLabel({ index, total, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-3 mb-6"
    >
      <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--signal)' }}>
        {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
      <span className="h-px flex-1 max-w-16" style={{ background: 'var(--line)' }} />
      <h2 className="font-display text-sm md:text-base tracking-[0.25em] uppercase" style={{ color: 'var(--muted)' }}>
        {title}
      </h2>
    </motion.div>
  )
}
