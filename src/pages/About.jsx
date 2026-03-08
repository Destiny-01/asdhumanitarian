import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'

const team = [
  { name: 'Amara Osei', role: 'Executive Director', image: '/exec(1).jpeg' },
  { name: 'James Whitfield', role: 'Programs Lead', image: '/exec(2).jpeg' },
  { name: 'Sofia Mendes', role: 'Operations Director', image: '/exec(3).jpeg' },
  { name: 'Raj Patel', role: 'Finance & Compliance', image: '/exec(4).jpeg' },
]

const stats = [
  { value: '11', label: 'Years of Operation', desc: 'Building trust and programs that last since 2014.' },
  { value: '6', label: 'Countries Active', desc: 'Kenya, Nigeria, Guatemala, Bangladesh, Cambodia, Ethiopia.' },
  { value: '200+', label: 'Local Partners', desc: 'On-the-ground organizations who know their communities best.' },
]

export default function About() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      {/* ── Hero ── */}
      <div className="bg-charcoal pt-[140px] md:pt-[160px] pb-[80px] md:pb-[100px] 
      px-6 md:px-10 lg:px-[60px] grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-end">

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
      <div className="grid grid-cols-1 lg:grid-cols-2">

        <div className="px-6 md:px-10 lg:px-[60px] py-[80px] md:py-[100px] lg:pr-20">
          <div className="section-tag">Our Story</div>

          <h2 className="section-title">
            Started with a single <em>question.</em>
          </h2>

          <p className="text-[1rem] text-muted leading-[1.9] mt-7">
            Founded on April 29, 2020, by its visionary President, Mr. Victor Odogbo,
            the Afemai Sons and Daughters Initiative was established as a Foundation
            response to the urgent needs of orphans, vulnerable children, widows,
            and underserved families.
          </p>

          <p className="text-[1rem] text-muted leading-[1.9] mt-5">
            What began as a compassionate outreach has grown into a globally
            connected humanitarian and socio-cultural movement.
          </p>

          <p className="text-[1rem] text-muted leading-[1.9] mt-5">
            Driven by collective commitment and structured empowerment, the
            Initiative continues to stand as a symbol of hope, unity, and
            purposeful service to humanity.
          </p>
        </div>

        <div className="bg-cream px-6 md:px-10 lg:px-[60px] py-[80px] md:py-[100px] lg:pl-20 flex flex-col justify-center">
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
                  <div className="font-serif text-[1.3rem] font-semibold text-charcoal mb-1.5">
                    {label}
                  </div>

                  <div className="text-[0.88rem] text-muted leading-[1.7]">
                    {desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Team ── */}
      <div className="px-6 md:px-10 lg:px-[60px] py-[80px] md:py-[100px]">
        <div className="section-tag">The Team</div>

        <h2 className="section-title">
          Driven by <em>purpose.</em>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mt-16">
          {team.map(({ name, role, image }) => (
            <div key={name} className="text-center">
              <img
                src={image}
                alt={name}
                className="w-full aspect-square object-cover object-top rounded mb-5"
              />

              <div className="font-serif text-[1.3rem] font-semibold text-charcoal mb-1">
                {name}
              </div>

              <div className="text-[0.76rem] tracking-[0.12em] uppercase text-gold">
                {role}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-green px-6 md:px-10 lg:px-[60px] py-16 md:py-20 
      grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">

        <h2
          className="font-serif font-light text-cream max-w-[500px]"
          style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', lineHeight: 1.2 }}
        >
          Every contribution matters. Support the work today.
        </h2>

        <button
          className="btn-gold w-full md:w-auto"
          onClick={() => navigate('/donate')}
        >
          Donate Today
        </button>
      </div>

      <Footer />
    </div>
  )
}