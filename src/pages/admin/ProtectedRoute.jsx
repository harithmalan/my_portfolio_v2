import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabaseEnabled } from '../../lib/supabase'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (!supabaseEnabled) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <div className="max-w-md">
          <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--amber)' }}>Supabase not configured</p>
          <p style={{ color: 'var(--muted)' }}>
            Add your Supabase project URL and anon key to <code className="font-mono">.env</code> (see
            <code className="font-mono"> .env.example</code>) to enable the admin panel.
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>AUTHENTICATING…</p>
      </div>
    )
  }

  if (!user) return <Navigate to="/admin/login" replace />

  return children
}
