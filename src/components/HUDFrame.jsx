export default function HUDFrame() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 hidden md:block">
      <div className="absolute top-6 left-6 w-8 h-8 border-t border-l" style={{ borderColor: 'var(--line)' }} />
      <div className="absolute top-6 right-6 w-8 h-8 border-t border-r" style={{ borderColor: 'var(--line)' }} />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l" style={{ borderColor: 'var(--line)' }} />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r" style={{ borderColor: 'var(--line)' }} />
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em]"
        style={{ color: 'var(--muted)' }}
      >
        SIGNAL: STABLE
      </div>
    </div>
  )
}
