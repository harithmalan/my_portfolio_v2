import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ASSETS_TO_PRELOAD = [
  '/models/birds.glb',
  '/models/butterfly.glb',
  '/models/ancient-book.glb',
  '/art/knight.png',
  '/art/cosmic-statue.png',
  '/art/ring-statue.png',
]

const MIN_DISPLAY_MS = 900
const MAX_WAIT_MS = 6000

function preload(url) {
  return fetch(url).then((r) => r.blob()).catch(() => null)
}

export default function PageLoader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const start = Date.now()
    let finished = false

    const finish = () => {
      if (finished) return
      finished = true
      const elapsed = Date.now() - start
      const wait = Math.max(0, MIN_DISPLAY_MS - elapsed)
      setTimeout(() => setDone(true), wait)
    }

    Promise.all(ASSETS_TO_PRELOAD.map(preload)).then(finish)
    const safety = setTimeout(finish, MAX_WAIT_MS)

    return () => clearTimeout(safety)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: 'var(--bg)' }}
        >
          <div className="loader-mark">
            <svg viewBox="0 0 100 100" width="72" height="72">
              <circle cx="50" cy="50" r="44" fill="none" stroke="var(--line)" strokeWidth="1" />
              <circle
                className="loader-ring"
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="70 210"
              />
              <polygon
                className="loader-poly"
                points="50,28 68,40 61,61 39,61 32,40"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1"
                opacity="0.6"
              />
              <circle className="loader-pulse" cx="50" cy="50" r="6" fill="var(--accent)" />
            </svg>
          </div>

          <style>{`
            .loader-mark { position: relative; }
            .loader-ring {
              transform-origin: 50px 50px;
              animation: loaderSpin 1.4s linear infinite;
            }
            .loader-poly {
              transform-origin: 50px 50px;
              animation: loaderSpinReverse 3s linear infinite;
            }
            .loader-pulse {
              animation: loaderPulse 1.2s ease-in-out infinite;
            }
            @keyframes loaderSpin {
              to { transform: rotate(360deg); }
            }
            @keyframes loaderSpinReverse {
              to { transform: rotate(-360deg); }
            }
            @keyframes loaderPulse {
              0%, 100% { opacity: 0.4; transform: scale(0.85); }
              50% { opacity: 1; transform: scale(1.1); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
