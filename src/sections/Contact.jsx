import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Send, Phone } from 'lucide-react'
import SectionLabel from '../components/SectionLabel'
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../components/BrandIcons'
import LocationMap from '../components/LocationMap'
import { CV_URL, SOCIAL_LINKS, CONTACT } from '../lib/constants'

const SOCIALS = [
  { icon: GithubIcon, label: 'GitHub', href: SOCIAL_LINKS.github },
  { icon: LinkedinIcon, label: 'LinkedIn', href: SOCIAL_LINKS.linkedin },
  { icon: InstagramIcon, label: 'Instagram', href: SOCIAL_LINKS.instagram },
]

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.5 14.4c-.3-.15-1.8-.9-2.1-1-.28-.1-.48-.15-.68.15-.2.3-.78 1-.96 1.2-.18.2-.35.23-.65.08-.3-.15-1.28-.47-2.43-1.5-.9-.8-1.5-1.8-1.68-2.1-.18-.3-.02-.46.13-.6.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.65-.94-2.25-.25-.6-.5-.5-.68-.5h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.1 3.2 5.1 4.5.7.3 1.28.5 1.7.63.72.23 1.37.2 1.9.12.58-.08 1.8-.73 2.05-1.45.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z" />
      <path d="M12.02 2C6.5 2 2 6.5 2 12c0 1.9.5 3.65 1.4 5.18L2 22l4.95-1.3A9.94 9.94 0 0 0 12.02 22C17.53 22 22 17.5 22 12S17.53 2 12.02 2Zm0 18.1a8.06 8.06 0 0 1-4.13-1.13l-.3-.18-2.94.77.78-2.87-.2-.3A8.1 8.1 0 1 1 20.1 12a8.09 8.09 0 0 1-8.08 8.1Z" />
    </svg>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || 'a visitor'}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${SOCIAL_LINKS.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="relative py-28 md:py-40 px-6 md:px-10 max-w-6xl mx-auto">
      <SectionLabel index={6} total={6} title="Contact" />

      <div className="grid md:grid-cols-12 gap-10 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="md:col-span-5 flex flex-col gap-8"
        >
          <div>
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--accent)' }}>
              Open to work
            </p>
            <h3 className="font-display text-4xl md:text-5xl tracking-tight mb-6 leading-[1.05]">
              Let's build something worth shipping.
            </h3>
            <p className="max-w-sm text-sm md:text-base mb-8" style={{ color: 'var(--muted)' }}>
              Have a project, role, or idea in mind? Send a note, call, or grab
              my CV for the full picture.
            </p>
            <div className="flex flex-wrap gap-3 mb-2">
              <a
                href={CV_URL}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-6 py-3.5 rounded-full transition-transform hover:scale-105"
                style={{ background: 'var(--accent)', color: '#0d0c0a' }}
              >
                <Download size={14} /> Download CV
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-6 py-3.5 rounded-full border transition-colors hover:border-white"
                style={{ borderColor: 'var(--line)', color: 'var(--text)' }}
              >
                <WhatsAppIcon className="w-3.5 h-3.5" /> WhatsApp
              </a>
            </div>
          </div>

          <a href={CONTACT.phoneHref} data-cursor-hover className="inline-flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
            <Phone size={14} style={{ color: 'var(--accent)' }} /> {CONTACT.phone}
          </a>

          <LocationMap />

          <div>
            <p className="font-mono text-[10px] tracking-widest uppercase mb-4" style={{ color: 'var(--muted)' }}>
              Find me elsewhere
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  aria-label={s.label}
                  className="group w-12 h-12 rounded-full border flex items-center justify-center transition-all hover:-translate-y-1"
                  style={{ borderColor: 'var(--line)', color: 'var(--text)' }}
                >
                  <s.icon className="w-[18px] h-[18px] transition-colors" style={{ color: 'inherit' }} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-7 rounded-2xl border p-8 md:p-10 relative overflow-hidden"
          style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{ background: 'radial-gradient(circle at 90% 0%, rgba(201,164,106,0.10), transparent 60%)' }}
          />
          <div className="relative grid sm:grid-cols-2 gap-5 mb-5">
            <FormField label="Name">
              <input required value={form.name} onChange={update('name')} className="contact-input" placeholder="Your name" />
            </FormField>
            <FormField label="Email">
              <input required type="email" value={form.email} onChange={update('email')} className="contact-input" placeholder="you@email.com" />
            </FormField>
          </div>
          <FormField label="Message" className="relative mb-6">
            <textarea required rows={5} value={form.message} onChange={update('message')} className="contact-input" placeholder="Tell me about the project…" />
          </FormField>
          <button
            type="submit"
            data-cursor-hover
            className="relative inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-7 py-3.5 rounded-full transition-transform hover:scale-105"
            style={{ background: 'var(--accent)', color: '#0d0c0a' }}
          >
            Send Message <Send size={13} />
          </button>

          <style>{`
            .contact-input {
              width: 100%;
              background: var(--surface-2);
              border: 1px solid var(--line);
              border-radius: 8px;
              padding: 0.75rem 1rem;
              font-size: 0.875rem;
              color: var(--text);
              transition: border-color 0.2s;
            }
            .contact-input:focus {
              border-color: var(--accent);
              outline: none;
            }
          `}</style>
        </motion.form>
      </div>

      <footer className="mt-24 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px]" style={{ color: 'var(--muted)' }}>
        <span>© {new Date().getFullYear()} Harith Malan. All rights reserved.</span>
        <span>Built with React · Three.js · Supabase</span>
      </footer>
    </section>
  )
}

function FormField({ label, children, className = '' }) {
  return (
    <div className={className}>
      <label className="block font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--muted)' }}>{label}</label>
      {children}
    </div>
  )
}
