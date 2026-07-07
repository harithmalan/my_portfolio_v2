import { Navigation } from 'lucide-react'
import { CONTACT } from '../lib/constants'

export default function LocationMap() {
  return (
    <a
      href={CONTACT.mapsUrl}
      target="_blank"
      rel="noreferrer"
      data-cursor-hover
      className="group relative block rounded-xl border overflow-hidden h-40 md:h-44"
      style={{ borderColor: 'var(--line)', background: 'var(--surface-2)' }}
    >
      <svg viewBox="0 0 400 180" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="180" fill="var(--surface-2)" />
        {/* abstract street grid */}
        <g stroke="var(--line)" strokeWidth="1.5" opacity="0.9">
          <path d="M0 40 H400" />
          <path d="M0 95 H400" />
          <path d="M0 150 H400" />
          <path d="M60 0 V180" />
          <path d="M150 0 V180" />
          <path d="M260 0 V180" />
          <path d="M340 0 V180" />
        </g>
        <g stroke="var(--accent)" strokeWidth="2" opacity="0.55" fill="none">
          <path d="M0 95 H150 Q165 95 165 80 V0" />
        </g>
        {/* pin */}
        <g transform="translate(178, 68)">
          <circle r="26" fill="var(--accent)" opacity="0.12" />
          <path
            d="M0 -16 C9 -16 16 -9 16 0 C16 10 0 24 0 24 C0 24 -16 10 -16 0 C-16 -9 -9 -16 0 -16 Z"
            fill="var(--accent)"
          />
          <circle r="4.5" fill="var(--bg)" />
        </g>
      </svg>

      <div
        className="absolute inset-0 transition-colors"
        style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(13,12,10,0.85) 100%)' }}
      />

      <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between">
        <div>
          <p className="font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: 'var(--accent)' }}>Based in</p>
          <p className="font-display text-sm md:text-base">{CONTACT.address}</p>
        </div>
        <div
          className="w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
          style={{ borderColor: 'var(--line)', color: 'var(--accent)', background: 'rgba(13,12,10,0.6)' }}
        >
          <Navigation size={14} />
        </div>
      </div>
    </a>
  )
}
