import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProjects } from '../lib/supabase'
import WorkCard from '../components/WorkCard'
import Footer from '../components/Footer'

function StatItem({ number, label }) {
  return (
    <div className="py-11 px-[60px] border-r border-white/[0.08] last:border-r-0 text-center">
      <div className="font-serif text-[3.2rem] font-light text-cream leading-none mb-2">{number}</div>
      <div className="text-[0.72rem] tracking-[0.15em] uppercase text-cream/45">{label}</div>
    </div>
  )
}

function ValueItem({ num, title, desc }) {
  return (
    <div className="py-7 border-b border-[rgba(28,28,26,0.1)] first:border-t first:border-[rgba(28,28,26,0.1)] flex gap-6">
      <span className="font-serif text-[1.1rem] font-semibold text-gold min-w-[32px] pt-0.5">{num}</span>
      <div>
        <div className="font-serif text-[1.3rem] font-semibold text-charcoal mb-1.5">{title}</div>
        <div className="text-[0.88rem] text-muted leading-[1.7]">{desc}</div>
      </div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    getProjects()
      .then(data => setProjects(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const recent = projects.slice(0, 3)

  return (
    <div>
      {/* ── Hero ── */}
      <div className="min-h-screen grid grid-cols-2 pt-[81px]">
        <div className="bg-cream px-[60px] py-20 flex flex-col justify-center">
          <div className="section-tag opacity-0 animate-fade-up delay-100">Since 2014 · Making Change Real</div>
          <h1
            className="font-serif font-light text-charcoal mb-8 opacity-0 animate-fade-up delay-200"
            style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: 1.08, letterSpacing: '-0.01em' }}
          >
            Where <em className="text-green not-italic" style={{ fontStyle: 'italic' }}>compassion</em><br />
            meets action.
          </h1>
          <p className="text-[1rem] text-muted max-w-[420px] leading-[1.8] mb-11 opacity-0 animate-fade-up delay-300">
            Lumina Foundation channels resources, ideas, and people toward the communities that
            need them most. Every dollar. Every project. Every life changed.
          </p>
          <div className="flex gap-4 flex-wrap opacity-0 animate-fade-up delay-400">
            <button className="btn-primary" onClick={() => navigate('/donate')}>Make a Donation</button>
            <button className="btn-outline" onClick={() => navigate('/work')}>See Our Work</button>
          </div>
        </div>

        <div className="bg-charcoal relative overflow-hidden">
          <div
            className="w-full h-full flex flex-col justify-end p-[60px] relative"
            style={{
              background: 'linear-gradient(160deg, #2a3d2e 0%, #1c2e22 40%, #0f1a12 100%)',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 30% 70%, rgba(42,82,64,0.6) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(184,148,58,0.15) 0%, transparent 40%)',
              }}
            />
            <div className="relative z-10">
              <div className="text-[0.7rem] tracking-[0.2em] uppercase text-cream/50 mb-4">Lives touched this year</div>
              <div className="font-serif text-[5rem] font-light text-cream leading-none mb-2">12,400</div>
              <div className="text-[0.85rem] text-cream/60">across 6 countries &amp; 31 communities</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="grid grid-cols-3 bg-charcoal">
        <StatItem number="$4.2M" label="Funds Disbursed" />
        <StatItem number={loading ? '—' : projects.length} label="Projects Completed" />
        <StatItem number="98%" label="Donor Satisfaction" />
      </div>

      {/* ── Mission ── */}
      <div className="grid grid-cols-2">
        <div className="px-[60px] py-[100px] pr-20">
          <div className="section-tag">Our Mission</div>
          <h2 className="section-title">
            We believe every community deserves a{' '}
            <em>fighting chance.</em>
          </h2>
          <p className="text-[1.05rem] text-muted leading-[1.9] mt-7 max-w-[480px]">
            Lumina Foundation works at the intersection of education, health, and economic
            opportunity — building programs that outlast our involvement and empower the people
            we serve to lead their own change.
          </p>
          <div className="mt-11">
            <button className="btn-outline" onClick={() => navigate('/about')}>Learn Our Story</button>
          </div>
        </div>
        <div className="bg-cream px-[60px] py-[100px] pl-20 flex flex-col justify-center">
          <ValueItem num="01" title="Transparency First" desc="Every project, every dollar — reported openly. Our annual impact reports are public record." />
          <ValueItem num="02" title="Community-Led" desc="We don't impose solutions. We fund and amplify what communities tell us they need." />
          <ValueItem num="03" title="Long-term Thinking" desc="Quick wins matter, but we invest in structural change that sustains itself for generations." />
        </div>
      </div>

      {/* ── Recent Work ── */}
      <div className="bg-cream px-[60px] py-[100px]">
        <div className="flex justify-between items-end mb-16">
          <div>
            <div className="section-tag">Recent Work</div>
            <h2 className="section-title">Projects we're<br /><em>proud of.</em></h2>
          </div>
          <button className="btn-outline" onClick={() => navigate('/work')}>View All Projects</button>
        </div>

        {loading ? (
          <div className="grid grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
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
        ) : recent.length ? (
          <div className="grid grid-cols-3 gap-6">
            {recent.map(p => <WorkCard key={p.id} project={p} />)}
          </div>
        ) : (
          <p className="text-center text-muted py-20">No projects yet. Add some via the admin panel.</p>
        )}
      </div>

      {/* ── CTA Band ── */}
      <div className="bg-green px-[60px] py-20 grid grid-cols-[1fr_auto] gap-10 items-center">
        <h2
          className="font-serif font-light text-cream max-w-[500px]"
          style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', lineHeight: 1.2 }}
        >
          Your generosity creates change that echoes for generations.
        </h2>
        <button className="btn-gold" onClick={() => navigate('/donate')}>Donate Today</button>
      </div>

      <Footer />
    </div>
  )
}
