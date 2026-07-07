import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import StarRating from '../../components/StarRating'

export default function ReviewsPanel() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false })
    setReviews(data || [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const approve = async (id) => {
    await supabase.from('reviews').update({ approved: true }).eq('id', id)
    load()
  }

  const unapprove = async (id) => {
    await supabase.from('reviews').update({ approved: false }).eq('id', id)
    load()
  }

  const remove = async (id) => {
    if (!confirm('Delete this review permanently?')) return
    await supabase.from('reviews').delete().eq('id', id)
    load()
  }

  if (loading) return <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>LOADING…</p>
  if (reviews.length === 0) return <p className="text-sm" style={{ color: 'var(--muted)' }}>No reviews submitted yet.</p>

  const pending = reviews.filter((r) => !r.approved)
  const approved = reviews.filter((r) => r.approved)

  return (
    <div className="space-y-10">
      <Group title={`Pending (${pending.length})`} items={pending} onApprove={approve} onRemove={remove} />
      <Group title={`Published (${approved.length})`} items={approved} onUnapprove={unapprove} onRemove={remove} />
    </div>
  )
}

function Group({ title, items, onApprove, onUnapprove, onRemove }) {
  if (items.length === 0) return null
  return (
    <div>
      <p className="font-mono text-[10px] tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>{title}</p>
      <div className="space-y-3">
        {items.map((r) => (
          <div key={r.id} className="p-4 rounded-lg border" style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-display text-sm">{r.name}</p>
                  {r.role && <span className="text-xs" style={{ color: 'var(--muted)' }}>· {r.role}</span>}
                </div>
                <StarRating value={r.rating} size={12} />
                <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>{r.message}</p>
              </div>
              <div className="flex gap-2 font-mono text-xs shrink-0">
                {onApprove && (
                  <button onClick={() => onApprove(r.id)} className="px-3 py-1.5 rounded border" style={{ borderColor: 'var(--line)', color: 'var(--accent)' }}>
                    Approve
                  </button>
                )}
                {onUnapprove && (
                  <button onClick={() => onUnapprove(r.id)} className="px-3 py-1.5 rounded border" style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}>
                    Unpublish
                  </button>
                )}
                <button onClick={() => onRemove(r.id)} className="px-3 py-1.5 rounded border" style={{ borderColor: 'var(--line)', color: '#f87171' }}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
