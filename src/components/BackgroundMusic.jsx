import { useEffect, useRef, useState } from 'react'

// YouTube video ID from the link provided — played via YouTube's own
// embedded IFrame Player API. This only embeds YouTube's player (which is
// what embedding is designed for); it does not download or rehost the
// track anywhere, so there's no audio file being copied.
const VIDEO_ID = 'tzBEpdfCRqw'

let apiLoadPromise = null
function loadYouTubeAPI() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT)
  if (apiLoadPromise) return apiLoadPromise
  apiLoadPromise = new Promise((resolve) => {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)
    window.onYouTubeIframeAPIReady = () => resolve(window.YT)
  })
  return apiLoadPromise
}

export default function BackgroundMusic() {
  const playerRef = useRef(null)
  const containerId = useRef(`yt-bg-player-${Math.random().toString(36).slice(2)}`)
  const [ready, setReady] = useState(false)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    let cancelled = false
    loadYouTubeAPI().then((YT) => {
      if (cancelled) return
      playerRef.current = new YT.Player(containerId.current, {
        videoId: VIDEO_ID,
        width: '1',
        height: '1',
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: VIDEO_ID,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: (e) => {
            e.target.playVideo()
            setReady(true)
          },
        },
      })
    })
    return () => {
      cancelled = true
      playerRef.current?.destroy?.()
    }
  }, [])

  const toggleMute = () => {
    const player = playerRef.current
    if (!player) return
    if (muted) {
      player.unMute()
      player.setVolume(35)
      player.playVideo()
    } else {
      player.mute()
    }
    setMuted(!muted)
  }

  return (
    <>
      <div
        id={containerId.current}
        style={{ position: 'fixed', left: -9999, top: -9999, width: 1, height: 1 }}
        aria-hidden="true"
      />
      <button
        onClick={toggleMute}
        disabled={!ready}
        data-cursor-hover
        aria-label={muted ? 'Unmute background music' : 'Mute background music'}
        title={muted ? 'Unmute background music' : 'Mute background music'}
        className="fixed z-30 bottom-6 right-6 w-11 h-11 rounded-full border flex items-center justify-center transition-all disabled:opacity-40"
        style={{ borderColor: 'var(--line)', background: 'rgba(13,12,10,0.7)', backdropFilter: 'blur(8px)', color: muted ? 'var(--muted)' : 'var(--accent)' }}
      >
        <MuteIcon muted={muted} />
      </button>
    </>
  )
}

function MuteIcon({ muted }) {
  // inline to avoid an extra import chain; matches lucide's stroke style
  return muted ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  )
}
