const BIRDS = [
  { top: '12%', duration: 38, delay: 0, scale: 0.7, opacity: 0.4, flap: 0.42 },
  { top: '22%', duration: 46, delay: 6, scale: 0.5, opacity: 0.3, flap: 0.36 },
  { top: '8%', duration: 52, delay: 14, scale: 0.9, opacity: 0.35, flap: 0.5 },
  { top: '30%', duration: 34, delay: 20, scale: 0.4, opacity: 0.25, flap: 0.3 },
  { top: '18%', duration: 60, delay: 3, scale: 0.6, opacity: 0.32, flap: 0.4 },
  { top: '40%', duration: 44, delay: 26, scale: 0.55, opacity: 0.28, flap: 0.34 },
]

const ORBS = [
  { left: '10%', top: '20%', size: 340, duration: 22, delay: 0 },
  { left: '75%', top: '55%', size: 420, duration: 28, delay: 4 },
  { left: '40%', top: '75%', size: 300, duration: 25, delay: 8 },
]

function Bird({ top, duration, delay, scale, opacity, flap }) {
  return (
    <div
      className="ambient-bird"
      style={{
        top,
        width: 64 * scale,
        opacity,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
    >
      <svg viewBox="0 0 64 32" className="wing-flap" style={{ animationDuration: `${flap}s` }}>
        <path className="frame-open" d="M2 20 Q16 2 32 14 Q48 2 62 20 Q48 12 32 20 Q16 12 2 20 Z" fill="var(--accent)" />
        <path className="frame-closed" d="M6 18 Q18 12 32 16 Q46 12 58 18 Q46 15 32 17 Q18 15 6 18 Z" fill="var(--accent)" />
      </svg>
    </div>
  )
}

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {ORBS.map((o, i) => (
        <div
          key={i}
          className="ambient-orb"
          style={{
            left: o.left,
            top: o.top,
            width: o.size,
            height: o.size,
            animationDuration: `${o.duration}s`,
            animationDelay: `${o.delay}s`,
          }}
        />
      ))}
      {BIRDS.map((b, i) => (
        <Bird key={i} {...b} />
      ))}

      <style>{`
        .ambient-bird {
          position: absolute;
          left: -10%;
          animation-name: flyAcross;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes flyAcross {
          0% { transform: translate(0, 0); }
          50% { transform: translate(60vw, -30px); }
          100% { transform: translate(130vw, 10px); }
        }
        .wing-flap {
          display: block;
          overflow: visible;
        }
        .wing-flap .frame-open,
        .wing-flap .frame-closed {
          animation-name: flap;
          animation-timing-function: steps(1, end);
          animation-iteration-count: infinite;
          animation-duration: inherit;
        }
        .wing-flap .frame-closed {
          animation-direction: reverse;
        }
        @keyframes flap {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .ambient-orb {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,164,106,0.10), transparent 70%);
          animation-name: driftOrb;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          filter: blur(2px);
        }
        @keyframes driftOrb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(4%, -6%) scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ambient-bird, .ambient-orb, .wing-flap .frame-open, .wing-flap .frame-closed { animation: none; }
        }
      `}</style>
    </div>
  )
}
