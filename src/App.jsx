import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createContext, useContext, useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Work from './pages/Work'
import WorkDetail from './pages/WorkDetail'
import Donate from './pages/Donate'
import Admin from './pages/admin/Admin'
import Notification from './components/Notification'

/* ── Notification context (app-wide toast) ── */
export const NotifyContext = createContext(null)

export function useNotify() {
  return useContext(NotifyContext)
}

export default function App() {
  const [toast, setToast] = useState({ message: '', type: 'success', visible: false })

  const notify = useCallback((message, type = 'success') => {
    setToast({ message, type, visible: true })
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 4200)
  }, [])

  return (
    <NotifyContext.Provider value={notify}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"       element={<Home />} />
          <Route path="/about"  element={<About />} />
          <Route path="/work"          element={<Work />} />
          <Route path="/work/:slug"    element={<WorkDetail />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/admin"  element={<Admin />} />
        </Routes>
        <Notification toast={toast} />
      </BrowserRouter>
    </NotifyContext.Provider>
  )
}
