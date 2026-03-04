import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'

const team = [
  { name: 'Amara Osei',     role: 'Executive Director', color: '#2a4a37', initial: 'A' },
  { name: 'James Whitfield', role: 'Programs Lead',      color: '#3d2a4a', initial: 'J' },
  { name: 'Sofia Mendes',   role: 'Operations Director', color: '#4a3d2a', initial: 'S' },
  { name: 'Raj Patel',      role: 'Finance & Compliance',color: '#2a3d4a', initial: 'R' },
]

const stats = [
  { value: '11', label: 'Years of Operation', desc: 'Building trust and programs that last since 2014.' },
  { value: '6',  label: 'Countries Active',   desc: 'Kenya, Nigeria, Guatemala, Bangladesh, Cambodia, Ethiopia.' },
  { value: '200+', label: 'Local Partners',   desc: 'On-the-ground organizations who know their communities best.' },
]

export default function About() {
  const navigate = useNavigate()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div>
      {/* ── Hero ── */}
      <div className="bg-charcoal pt-[160px] pb-[100px] px-[60px] grid grid-cols-2 gap-20 items-end">
        <h1
          className="font-serif font-light text-cream"
          style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)', lineHeight: 1.05 }}
        >
          We're not<br />just a<br />charity.
        </h1>
        <div>
          <p
            className="font-serif font-light italic text-cream/70 leading-[1.6]"
            style={{ fontSize: '1.5rem', borderLeft: '2px solid #b8943a', paddingLeft: '28px' }}
          >
            "The measure of our success is not how much we give — it's how well the communities
            we serve can sustain themselves when we step back."
          </p>
          <p className="text-[0.78rem] text-cream/40 mt-4 pl-8 tracking-[0.1em] uppercase">
            — Founding Charter, 2014
          </p>
        </div>
      </div>

      {/* ── Story ── */}
      <div className="grid grid-cols-2">
        <div className="px-[60px] py-[100px] pr-20">
          <div className="section-tag">Our Story</div>
          <h2 className="section-title">Started with a single <em>question.</em></h2>
          <p className="text-[1rem] text-muted leading-[1.9] mt-7">
            In 2014, a group of six friends sat around a table and asked: why do so many aid
            programs fail the people they claim to serve? Not from lack of funding — but from
            lack of listening.
          </p>
          <p className="text-[1rem] text-muted leading-[1.9] mt-5">
            Lumina was built on a different model. One where communities define their needs,
            where funding is transparent, and where every project is evaluated not by outputs —
            but by whether the community wants to keep it going after we leave.
          </p>
          <p className="text-[1rem] text-muted leading-[1.9] mt-5">
            Today we operate across three continents, partner with over 200 local organizations,
            and have touched more than 50,000 lives. We remain small by design — trust is built
            one community at a time.
          </p>
        </div>
        <div className="bg-cream px-[60px] py-[100px] pl-20 flex flex-col justify-center">
          <div className="section-tag">By the Numbers</div>
          <div className="mt-5">
            {stats.map(({ value, label, desc }) => (
              <div
                key={label}
                className="py-7 border-b border-[rgba(28,28,26,0.1)] first:border-t flex gap-6"
              >
                <span className="font-serif text-[2.5rem] text-green font-light min-w-[80px] leading-none pt-1">
                  {value}
                </span>
                <div>
                  <div className="font-serif text-[1.3rem] font-semibold text-charcoal mb-1.5">{label}</div>
                  <div className="text-[0.88rem] text-muted leading-[1.7]">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Team ── */}
      <div className="px-[60px] py-[100px]">
        <div className="section-tag">The Team</div>
        <h2 className="section-title">Driven by <em>purpose.</em></h2>
        <div className="grid grid-cols-4 gap-7 mt-16">
          {team.map(({ name, role, color, initial }) => (
            <div key={name} className="text-center">
              <div
                className="w-full aspect-square rounded flex items-center justify-center
                           font-serif text-[2.5rem] text-white/30 font-light mb-5"
                style={{ background: color }}
              >
                {initial}
              </div>
              <div className="font-serif text-[1.3rem] font-semibold text-charcoal mb-1">{name}</div>
              <div className="text-[0.76rem] tracking-[0.12em] uppercase text-gold">{role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-green px-[60px] py-20 grid grid-cols-[1fr_auto] gap-10 items-center">
        <h2
          className="font-serif font-light text-cream max-w-[500px]"
          style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', lineHeight: 1.2 }}
        >
          Every contribution matters. Support the work today.
        </h2>
        <button className="btn-gold" onClick={() => navigate('/donate')}>Donate Today</button>
      </div>

      <Footer />
    </div>
  )
}
