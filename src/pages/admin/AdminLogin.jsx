import { useState } from 'react'
import { signIn } from '../../lib/supabase'
import { useNotify } from '../../App'

export default function AdminLogin({ onSuccess }) {
  const notify = useNotify()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Please enter your email and password.'); return }
    setLoading(true)
    try {
      const { user } = await signIn(email, password)
      onSuccess(user.email)
    } catch {
      setError('Incorrect email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-5 pt-[100px] pb-10">
      <div className="bg-canvas rounded-md px-[52px] py-14 w-full max-w-[440px]">
        <div className="font-serif text-[1.8rem] font-semibold text-charcoal mb-1">
          Lumina<span className="text-green">.</span>
        </div>
        <p className="text-[0.82rem] text-muted mb-10">
          Admin access only. Sign in with your credentials.
        </p>

        <form onSubmit={handleLogin} noValidate>
          <label className="field-label !mt-0">Email</label>
          <input
            className="field-input"
            type="email"
            placeholder="admin@lumina.org"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <label className="field-label">Password</label>
          <input
            className="field-input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-500 text-[0.8rem] mt-3">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center mt-7 py-4 text-[0.82rem]"
          >
            {loading && <span className="spinner" />}
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
