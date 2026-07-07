import { useState } from 'react'
import { supabase } from '../../lib/supabase'

const EMPTY = {
  title: '',
  tagline: '',
  description: '',
  tech: '',
  link: '',
  repo: '',
  image: '',
  featured: false,
  order_index: 0,
}

export default function ProjectForm({ existing, onDone, onCancel }) {
  const [form, setForm] = useState(
    existing
      ? { ...existing, tech: Array.isArray(existing.tech) ? existing.tech.join(', ') : existing.tech || '' }
      : EMPTY
  )
  const [file, setFile] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const update = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [key]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      let imageUrl = form.image
      if (file) {
        const path = `${Date.now()}-${file.name}`
        const { error: uploadError } = await supabase.storage.from('projects').upload(path, file, { upsert: true })
        if (uploadError) throw uploadError
        const { data: urlData } = supabase.storage.from('projects').getPublicUrl(path)
        imageUrl = urlData.publicUrl
      }

      const payload = {
        title: form.title,
        tagline: form.tagline,
        description: form.description,
        tech: form.tech.split(',').map((t) => t.trim()).filter(Boolean),
        link: form.link,
        repo: form.repo,
        image: imageUrl,
        featured: Boolean(form.featured),
        order_index: Number(form.order_index) || 0,
      }

      if (existing?.id) {
        const { error: updateError } = await supabase.from('projects').update(payload).eq('id', existing.id)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase.from('projects').insert(payload)
        if (insertError) throw insertError
      }
      onDone()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-xl border space-y-4" style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}>
      <h3 className="font-display text-lg mb-2">{existing ? 'Edit project' : 'Add a new project'}</h3>

      <Field label="Title">
        <input required value={form.title} onChange={update('title')} className="input" />
      </Field>
      <Field label="Tagline">
        <input value={form.tagline} onChange={update('tagline')} className="input" />
      </Field>
      <Field label="Description">
        <textarea required rows={3} value={form.description} onChange={update('description')} className="input" />
      </Field>
      <Field label="Tech (comma separated)">
        <input value={form.tech} onChange={update('tech')} className="input" placeholder="React, Node.js, Supabase" />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Live link">
          <input value={form.link} onChange={update('link')} className="input" />
        </Field>
        <Field label="Repo link">
          <input value={form.repo} onChange={update('repo')} className="input" />
        </Field>
      </div>
      <Field label="Project image">
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="text-sm" style={{ color: 'var(--muted)' }} />
        {form.image && !file && <p className="mt-1 text-xs" style={{ color: 'var(--muted)' }}>Current image will be kept unless you choose a new file.</p>}
      </Field>
      <details className="pt-1">
        <summary className="font-mono text-[10px] tracking-widest uppercase cursor-pointer select-none" style={{ color: 'var(--muted)' }}>
          Advanced (order & featured)
        </summary>
        <div className="grid grid-cols-2 gap-4 items-center mt-3">
          <Field label="Display order">
            <input type="number" value={form.order_index} onChange={update('order_index')} className="input" />
          </Field>
          <label className="flex items-center gap-2 font-mono text-xs" style={{ color: 'var(--muted)' }}>
            <input type="checkbox" checked={!!form.featured} onChange={update('featured')} />
            Featured
          </label>
        </div>
      </details>

      {error && <p className="text-sm" style={{ color: '#f87171' }}>{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={busy}
          className="px-5 py-2.5 rounded-md font-mono text-xs tracking-widest uppercase disabled:opacity-50"
          style={{ background: 'var(--signal)', color: '#0d0c0a' }}
        >
          {busy ? 'Saving…' : existing ? 'Save changes' : 'Add project'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-md font-mono text-xs tracking-widest uppercase border"
          style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}
        >
          Cancel
        </button>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: transparent;
          border: 1px solid var(--line);
          border-radius: 6px;
          padding: 0.6rem 0.75rem;
          font-size: 0.875rem;
          color: var(--text);
        }
      `}</style>
    </form>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: 'var(--muted)' }}>{label}</label>
      {children}
    </div>
  )
}
