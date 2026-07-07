import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { GithubIcon, LinkedinIcon, InstagramIcon } from './BrandIcons'
import { CV_URL, SOCIAL_LINKS } from '../lib/constants'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 inset-x-0 z-50 transition-colors duration-300"
        style={{
          background: scrolled || open ? 'rgba(13,12,10,0.85)' : 'transparent',
          backdropFilter: scrolled || open ? 'blur(10px)' : 'none',
          borderBottom: scrolled || open ? '1px solid var(--line)' : '1px solid transparent',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="#top" data-cursor-hover className="font-display font-medium tracking-wide text-base z-10">
            HARITH<span style={{ color: 'var(--accent)' }}>.</span>MALAN
          </a>

          <div className="hidden md:flex items-center gap-7 font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} data-cursor-hover className="hover:text-white transition-colors" style={{ color: 'inherit' }}>
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-3 pr-4 border-r" style={{ borderColor: 'var(--line)' }}>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" data-cursor-hover aria-label="GitHub" className="opacity-70 hover:opacity-100 transition-opacity" style={{ color: 'var(--text)' }}>
                <GithubIcon className="w-4 h-4" />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" data-cursor-hover aria-label="LinkedIn" className="opacity-70 hover:opacity-100 transition-opacity" style={{ color: 'var(--text)' }}>
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" data-cursor-hover aria-label="Instagram" className="opacity-70 hover:opacity-100 transition-opacity" style={{ color: 'var(--text)' }}>
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
            <a
              href={CV_URL}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-full border transition-colors hover:border-white"
              style={{ borderColor: 'var(--signal-dim)', color: 'var(--signal)' }}
            >
              <Download size={13} /> CV
            </a>
          </div>

          <button
            data-cursor-hover
            onClick={() => setOpen((v) => !v)}
            className="md:hidden z-10 p-2"
            style={{ color: 'var(--text)' }}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-8"
            style={{ background: 'var(--bg)' }}
          >
            {LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="font-display text-3xl"
                style={{ color: 'var(--text)' }}
              >
                {l.label}
              </motion.a>
            ))}
            <a
              href={CV_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center gap-2 font-mono text-xs px-5 py-3 rounded-full border"
              style={{ borderColor: 'var(--signal-dim)', color: 'var(--signal)' }}
            >
              <Download size={14} /> Download CV
            </a>
            <div className="flex items-center gap-6 mt-2">
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub" style={{ color: 'var(--text)' }}>
                <GithubIcon className="w-5 h-5" />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ color: 'var(--text)' }}>
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" style={{ color: 'var(--text)' }}>
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
