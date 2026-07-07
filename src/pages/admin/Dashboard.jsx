import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import ProjectForm from './ProjectForm'
import ReviewsPanel from './ReviewsPanel'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('projects')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('projects').select('*').order('order_index', { ascending: true })
    setProjects(data || [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this project? This cannot be undone.')) return
    await supabase.from('projects').delete().eq('id', id)
    load()
  }

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen px-6 md:px-10 py-10 max-w-5xl mx-auto" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--signal)' }}>Admin</p>
          <h1 className="font-display text-2xl">Project dashboard</h1>
          <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Signed in as {user?.email}</p>
        </div>
        <div className="flex gap-3">
          <a href="/" className="px-4 py-2 rounded-md font-mono text-xs border" style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}>
            View site
          </a>
          <button onClick={handleLogout} className="px-4 py-2 rounded-md font-mono text-xs border" style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}>
            Sign out
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-8">
        {['projects', 'reviews'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 rounded-full font-mono text-xs tracking-widest uppercase border transition-colors"
            style={{
              borderColor: tab === t ? 'var(--accent)' : 'var(--line)',
              color: tab === t ? 'var(--accent)' : 'var(--muted)',
            }}
          >
            {t === 'projects' ? 'Projects' : 'Reviews'}
          </button>
        ))}
      </div>

      {tab === 'reviews' ? (
        <ReviewsPanel />
      ) : (
        <>
          {showForm ? (
            <ProjectForm
              existing={editing}
              onDone={() => {
                setShowForm(false)
                setEditing(null)
                load()
              }}
              onCancel={() => {
                setShowForm(false)
                setEditing(null)
              }}
            />
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="mb-8 px-5 py-2.5 rounded-md font-mono text-xs tracking-widest uppercase"
              style={{ background: 'var(--signal)', color: '#0d0c0a' }}
            >
              + Add project
            </button>
          )}

          <div className="mt-10 space-y-3">
            {loading ? (
              <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>LOADING…</p>
            ) : projects.length === 0 ? (
              <p className="text-sm" style={{ color: 'var(--muted)' }}>No projects yet. Add your first one above.</p>
            ) : (
              projects.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-4 rounded-lg border" style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}>
                  <div className="flex items-center gap-4">
                    {p.image ? (
                      <img src={p.image} alt="" className="w-12 h-12 rounded object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded flex items-center justify-center font-mono text-xs" style={{ background: 'var(--surface-2)', color: 'var(--muted)' }}>
                        {p.title?.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="font-display">{p.title}</p>
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>{p.tagline}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 font-mono text-xs">
                    <button
                      onClick={() => {
                        setEditing(p)
                        setShowForm(true)
                      }}
                      className="px-3 py-1.5 rounded border"
                      style={{ borderColor: 'var(--line)', color: 'var(--signal)' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-3 py-1.5 rounded border"
                      style={{ borderColor: 'var(--line)', color: '#f87171' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}
