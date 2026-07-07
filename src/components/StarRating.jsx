import { Star } from 'lucide-react'

export default function StarRating({ value, onChange, size = 16 }) {
  const interactive = typeof onChange === 'function'
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < value
        return (
          <button
            key={i}
            type={interactive ? 'button' : undefined}
            onClick={interactive ? () => onChange(i + 1) : undefined}
            data-cursor-hover={interactive || undefined}
            className={interactive ? 'transition-transform hover:scale-110' : ''}
            style={{ cursor: interactive ? 'pointer' : 'default', lineHeight: 0 }}
            aria-label={interactive ? `Rate ${i + 1} star${i === 0 ? '' : 's'}` : undefined}
          >
            <Star
              size={size}
              strokeWidth={1.5}
              fill={filled ? 'var(--accent)' : 'none'}
              style={{ color: filled ? 'var(--accent)' : 'var(--muted)' }}
            />
          </button>
        )
      })}
    </div>
  )
}
