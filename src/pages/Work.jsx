import { useState, useMemo } from 'react'
import { useEffect } from 'react'
import works from '../data/works.json'
import WorkCard from '../components/WorkCard'
import Footer from '../components/Footer'

const FILTERS = ['All', 'Education', 'Empowerment', 'Infrastructure']

export default function Work() {
  const [active, setActive] = useState('All')

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const filtered = useMemo(() => {
    if (active === 'All') return works
    return works.filter(p => p.category.toLowerCase() === active.toLowerCase())
  }, [active])

  return (
    <div>

      {/* HERO */}
      <div className="bg-cream pt-[140px] pb-20 px-6 md:px-10 lg:px-[60px]">

        <div className="section-tag">Our Impact</div>

        <h1 className="section-title">
          Every project.<br /><em>Every story.</em>
        </h1>

        <p className="text-[1rem] text-muted leading-[1.8] mt-5 max-w-[500px]">
          A record of the work we've done, the communities we've walked with,
          and the impact we've measured together.
        </p>

        {/* FILTERS */}
        <div className="flex gap-2 flex-wrap mt-12">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 text-[0.74rem] tracking-[0.12em] uppercase border rounded-sm transition-all duration-200
              ${
                active === f
                  ? 'bg-charcoal text-cream border-charcoal'
                  : 'bg-transparent text-muted border-[rgba(28,28,26,0.15)] hover:bg-charcoal hover:text-cream hover:border-charcoal'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

      </div>

      {/* GRID */}
      <div className="px-6 md:px-10 lg:px-[60px] py-20 min-h-[400px]">

        {filtered.length ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <WorkCard key={p.slug} project={p} />
            ))}
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
