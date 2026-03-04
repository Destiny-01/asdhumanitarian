import { useEffect, useState } from 'react'
import { getProjects } from '../lib/supabase'
import WorkCard from '../components/WorkCard'
import Footer from '../components/Footer'

const FILTERS = ['All', 'Education', 'Health', 'Livelihoods', 'Infrastructure']

export default function Work() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading]   = useState(true)
  const [active, setActive]     = useState('All')

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    setLoading(true)
    const cat = active === 'All' ? null : active.toLowerCase()
    getProjects(cat)
      .then(setProjects)
      .catch(() => setProjects([]))
      .finally(() => setLoading(false))
  }, [active])

  return (
    <div>
      {/* ── Hero ── */}
      <div className="bg-cream pt-[160px] pb-20 px-[60px]">
        <div className="section-tag">Our Impact</div>
        <h1 className="section-title">Every project.<br /><em>Every story.</em></h1>
        <p className="text-[1rem] text-muted leading-[1.8] mt-5 max-w-[500px]">
          A record of the work we've done, the communities we've walked with, and the impact
          we've measured together.
        </p>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap mt-12">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 text-[0.74rem] tracking-[0.12em] uppercase border rounded-sm
                          transition-all duration-200 cursor-pointer font-sans
                          ${active === f
                            ? 'bg-charcoal text-cream border-charcoal'
                            : 'bg-transparent text-muted border-[rgba(28,28,26,0.15)] hover:bg-charcoal hover:text-cream hover:border-charcoal'
                          }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="px-[60px] py-20 min-h-[400px]">
        {loading ? (
          <div className="grid grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded overflow-hidden">
                <div className="skeleton h-[220px]" />
                <div className="bg-canvas p-7 space-y-3">
                  <div className="skeleton h-3 w-16" />
                  <div className="skeleton h-5" />
                  <div className="skeleton h-3 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : projects.length ? (
          <div className="grid grid-cols-3 gap-6">
            {projects.map(p => <WorkCard key={p.id} project={p} />)}
          </div>
        ) : (
          <div className="text-center py-24 text-muted">
            <div className="font-serif text-4xl mb-3 text-green/40">✦</div>
            <p>No projects in this category yet.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
