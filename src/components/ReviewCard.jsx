import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import StarRating from './StarRating'

export default function ReviewCard({ review, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="relative p-6 md:p-7 rounded-xl border h-full flex flex-col"
      style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}
    >
      <Quote size={22} style={{ color: 'var(--accent)', opacity: 0.5 }} className="mb-3" />
      <p className="text-sm md:text-base leading-relaxed mb-6 flex-1" style={{ color: 'var(--text)' }}>
        "{review.message}"
      </p>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-sm">{review.name}</p>
          {review.role && <p className="font-mono text-[10px] tracking-wide" style={{ color: 'var(--muted)' }}>{review.role}</p>}
        </div>
        <StarRating value={review.rating} size={13} />
      </div>
    </motion.div>
  )
}
