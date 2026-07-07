import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabaseEnabled } from '../../lib/supabase'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    const { error: authError } = await login(email, password)
    setBusy(false)
    if (authError) {
      setError('Invalid credentials. Check your email and password.')
      return
    }
    navigate('/admin')
  }

  if (!supabaseEnabled) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <div className="max-w-md">
          <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--amber)' }}>Supabase not configured</p>
          <p style={{ color: 'var(--muted)' }}>Add your Supabase project URL and anon key to your environment variables to enable login.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-grid" style={{ background: 'var(--bg)' }}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 rounded-xl border"
        style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}
      >
        <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--signal)' }}>Admin Access</p>
        <h1 className="font-display text-2xl mb-6" style={{ color: 'var(--text)' }}>Sign in</h1>

        <label className="block font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: 'var(--muted)' }}>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-3 py-2.5 rounded-md border bg-transparent text-sm"
          style={{ borderColor: 'var(--line)', color: 'var(--text)' }}
        />

        <label className="block font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: 'var(--muted)' }}>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-3 py-2.5 rounded-md border bg-transparent text-sm"
          style={{ borderColor: 'var(--line)', color: 'var(--text)' }}
        />

        {error && <p className="mb-4 text-sm" style={{ color: '#f87171' }}>{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="w-full py-3 rounded-md font-mono text-xs tracking-widest uppercase transition-opacity disabled:opacity-50"
          style={{ background: 'var(--signal)', color: '#0d0c0a' }}
        >
          {busy ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
