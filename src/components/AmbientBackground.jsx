const FEATHERS = [
  { left: '6%', duration: 26, delay: 0, scale: 0.8, opacity: 0.4, sway: 30 },
  { left: '18%', duration: 32, delay: 8, scale: 0.55, opacity: 0.3, sway: 45 },
  { left: '32%', duration: 22, delay: 14, scale: 0.65, opacity: 0.35, sway: 25 },
  { left: '52%', duration: 30, delay: 4, scale: 0.7, opacity: 0.3, sway: 40 },
  { left: '68%', duration: 24, delay: 18, scale: 0.5, opacity: 0.28, sway: 35 },
  { left: '82%', duration: 34, delay: 10, scale: 0.75, opacity: 0.32, sway: 28 },
  { left: '92%', duration: 27, delay: 22, scale: 0.5, opacity: 0.26, sway: 38 },
]

const ORBS = [
  { left: '10%', top: '20%', size: 340, duration: 22, delay: 0 },
  { left: '75%', top: '55%', size: 420, duration: 28, delay: 4 },
  { left: '40%', top: '75%', size: 300, duration: 25, delay: 8 },
]

function Feather({ left, duration, delay, scale, opacity, sway }) {
  return (
    <svg
      viewBox="0 0 40 90"
      className="ambient-feather"
      style={{
        left,
        width: 40 * scale,
        opacity,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        '--sway': `${sway}px`,
      }}
    >
      <path
        d="M20 2 C26 18 30 34 24 54 C34 46 38 34 36 22 C40 34 39 50 30 60 C24 76 21 84 20 88 C19 84 16 76 10 60 C1 50 0 34 4 22 C2 34 6 46 16 54 C10 34 14 18 20 2 Z"
        fill="var(--accent)"
      />
      <line x1="20" y1="10" x2="20" y2="86" stroke="var(--bg)" strokeWidth="0.6" opacity="0.5" />
    </svg>
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
      {/* {FEATHERS.map((f, i) => (
        <Feather key={i} {...f} />
      ))} */}

      <style>{`
        .ambient-feather {
          position: absolute;
          top: -8%;
          animation-name: featherFall;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes featherFall {
          0% { transform: translate(0, 0) rotate(-8deg); }
          25% { transform: translate(var(--sway), 25vh) rotate(10deg); }
          50% { transform: translate(0, 50vh) rotate(-6deg); }
          75% { transform: translate(calc(var(--sway) * -1), 75vh) rotate(12deg); }
          100% { transform: translate(0, 112vh) rotate(-8deg); }
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
          .ambient-feather, .ambient-orb { animation: none; }
        }
      `}</style>
    </div>
  )
}
