import { useEffect, useState } from 'react'
import { getSession, signOut } from '../../lib/supabase'
import AdminLogin from './AdminLogin'
import AdminPanel from './AdminPanel'

export default function Admin() {
  const [userEmail, setUserEmail] = useState(null)
  const [checking, setChecking]   = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    getSession()
      .then(session => {
        if (session) setUserEmail(session.user.email)
      })
      .catch(() => {})
      .finally(() => setChecking(false))
  }, [])

  async function handleLogout() {
    try { await signOut() } catch { /* ignore */ }
    setUserEmail(null)
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center pt-20">
        <span className="spinner text-cream" />
      </div>
    )
  }

  return userEmail
    ? <AdminPanel email={userEmail} onLogout={handleLogout} />
    : <AdminLogin onSuccess={setUserEmail} />
}
