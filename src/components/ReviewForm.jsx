import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase, supabaseEnabled } from '../lib/supabase'
import StarRating from './StarRating'

export default function ReviewForm({ onDone }) {
  const [form, setForm] = useState({ name: '', role: '', message: '', rating: 5 })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!supabaseEnabled) {
      setError('Reviews are temporarily unavailable — the site backend isn\'t connected yet.')
      return
    }
    setBusy(true)
    setError('')
    const { error: insertError } = await supabase.from('reviews').insert({
      name: form.name,
      role: form.role,
      message: form.message,
      rating: Number(form.rating),
      approved: false,
    })
    setBusy(false)
    if (insertError) {
      setError('Something went wrong submitting your review. Please try again.')
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 rounded-xl border text-center"
        style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}
      >
        <p className="font-display text-xl mb-2" style={{ color: 'var(--accent)' }}>Thank you!</p>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          Your review has been submitted and will appear here once approved.
        </p>
        <button onClick={onDone} data-cursor-hover className="mt-5 font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
          Close
        </button>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="p-6 md:p-8 rounded-xl border space-y-4"
      style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--muted)' }}>Name</label>
          <input required value={form.name} onChange={update('name')} className="contact-input" placeholder="Your name" />
        </div>
        <div>
          <label className="block font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--muted)' }}>Role / Company (optional)</label>
          <input value={form.role} onChange={update('role')} className="contact-input" placeholder="e.g. Product Manager" />
        </div>
      </div>
      <div>
        <label className="block font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--muted)' }}>Rating</label>
        <StarRating value={Number(form.rating)} onChange={(v) => setForm((f) => ({ ...f, rating: v }))} size={20} />
      </div>
      <div>
        <label className="block font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--muted)' }}>Your review</label>
        <textarea required rows={4} value={form.message} onChange={update('message')} className="contact-input" placeholder="What was it like working together?" />
      </div>

      {error && <p className="text-sm" style={{ color: '#f87171' }}>{error}</p>}

      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          disabled={busy}
          data-cursor-hover
          className="px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase disabled:opacity-50 transition-transform hover:scale-105"
          style={{ background: 'var(--accent)', color: '#0d0c0a' }}
        >
          {busy ? 'Submitting…' : 'Submit Review'}
        </button>
        <button
          type="button"
          onClick={onDone}
          data-cursor-hover
          className="px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase border"
          style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}
        >
          Cancel
        </button>
      </div>

      <style>{`
        .contact-input {
          width: 100%;
          background: var(--surface-2);
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 0.7rem 1rem;
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
  )
}
