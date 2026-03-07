import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProjects } from '../lib/supabase'
import WorkCard from '../components/WorkCard'
import Footer from '../components/Footer'
import { ChevronDown } from 'lucide-react'

function StatItem({ number, label }) {
  return (
    <div className="py-10 px-6 lg:px-10 text-center border-b lg:border-b-0 lg:border-r border-white/10 last:border-r-0">
      <div className="font-serif text-4xl lg:text-5xl font-light text-cream mb-2">{number}</div>
      <div className="text-xs tracking-[0.2em] uppercase text-cream/50">{label}</div>
    </div>
  )
}

function ValueItem({ num, title, desc, index, openIndex, toggleItem }) {
  const isOpen = openIndex === index

  return (
    <div
      className="py-6 border-b border-black/10 flex gap-5 cursor-pointer"
      onClick={() => toggleItem(index)}
    >
      <span className="font-serif text-lg text-gold min-w-[28px]">{num}</span>

      <div className="w-full">
        <div className="flex justify-between items-center">
          <h3 className="font-serif text-xl font-semibold text-charcoal">
            {title}
          </h3>

          <ChevronDown
            size={18}
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 text-muted text-sm leading-relaxed ${
            isOpen ? 'max-h-96 mt-3' : 'max-h-12'
          }`}
        >
          {desc}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [openIndex, setOpenIndex] = useState(null)

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  useEffect(() => {
    window.scrollTo(0, 0)

    getProjects()
      .then(data => setProjects(data))
      .finally(() => setLoading(false))
  }, [])

  const recent = projects.slice(0, 3)

  return (
    <div>

      {/* HERO */}
      <section className="min-h-screen grid lg:grid-cols-2 pt-[80px]">

        <div className="bg-cream px-6 md:px-10 lg:px-20 py-16 flex flex-col justify-center">
          
          <div className="section-tag">
            Since 2014 · Restoring Hope. Empowering Futures.
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mt-6 text-charcoal">
            <em className="text-green not-italic">Empowering</em> Orphans,
            <br/>
            <em className="text-green not-italic">Uplifting</em> Families,
            <br/>
            <em className="text-green not-italic">Transforming</em> Communities.
          </h1>

          <p className="mt-6 text-muted max-w-md leading-relaxed">
            Lumina Foundation channels resources, ideas, and people toward the
            communities that need them most.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="btn-primary" onClick={() => navigate('/donate')}>
              Make a Donation
            </button>

            <button className="btn-outline" onClick={() => navigate('/work')}>
              See Our Work
            </button>
          </div>
        </div>

        <div className="bg-charcoal relative flex items-end">
          <div className="p-10 lg:p-16 text-cream">

            <div className="uppercase text-xs tracking-[0.2em] mb-4 text-cream/60">
              Lives touched this year
            </div>

            <div className="font-serif text-5xl lg:text-6xl font-light">
              12,400
            </div>

            <div className="text-sm mt-2 text-cream/70">
              across 6 countries & 31 communities
            </div>

          </div>
        </div>
      </section>


      {/* STATS */}
      <section className="bg-charcoal grid lg:grid-cols-3">
        <StatItem number="$4.2M" label="Funds Disbursed" />
        <StatItem number={loading ? '—' : projects.length} label="Projects Completed" />
        <StatItem number="98%" label="Donor Satisfaction" />
      </section>


      {/* MISSION */}
      <section className="grid lg:grid-cols-2">

        <div className="px-6 md:px-10 lg:px-20 py-20">
          <div className="section-tag">Our Mission</div>

          <h2 className="section-title">
            We believe every community deserves a <em>fighting chance.</em>
          </h2>

          <p className="mt-6 text-muted max-w-lg leading-relaxed">
            To empower orphans, vulnerable children, widows, and underserved families
            through structured humanitarian support, quality education,
            and skill development.
          </p>

          <button
            className="btn-outline mt-10"
            onClick={() => navigate('/about')}
          >
            Learn Our Story
          </button>
        </div>

        <div className="bg-cream px-6 md:px-10 lg:px-20 py-20">

          <ValueItem
            index={0}
            openIndex={openIndex}
            toggleItem={toggleItem}
            num="01"
            title="Distinctive"
            desc="What sets us apart is our dual focus: humanitarian care and socio-cultural unity.
We do not only provide support, we build systems of empowerment. Through our flagship program, Skill Up A Child, we go beyond charity to equip children with education and at least one practical, income-generating skill."
          />

          <ValueItem
            index={1}
            openIndex={openIndex}
            toggleItem={toggleItem}
            num="02"
            title="Why We Exist"
            desc="We exist because too many children are on the streets without hope.
We exist because vulnerable families deserve dignity, not dependency.
Our purpose is clear: to take orphans and vulnerable families off the streets and give them real reasons to live, dream, and succeed."
          />

          <ValueItem
            index={2}
            openIndex={openIndex}
            toggleItem={toggleItem}
            num="03"
            title="Aspirational Values"
            desc="We envision a society where:
Every child is educated.
Every child learns at least one skill.
No widow or vulnerable family is left without support.
Charity evolves into empowerment.
Communities become self-sustaining and progressive.
Our aspiration is not just to help, but to build a future where help is no longer needed."
          />

          <ValueItem
            index={3}
            openIndex={openIndex}
            toggleItem={toggleItem}
            num="04"
            title="Our Goals"
            desc="Through structured programs and strategic partnerships, we aim to:
Remove vulnerable children and families from street dependency.
Expand the Skill Up A Child initiative across communities.
Provide educational sponsorship and vocational training.
Build a global support network that drives sustainable humanitarian impact.
Our commitment is long-term transformation. one child, one family, one community at a time."
          />
        </div>
      </section>


      {/* PROJECTS */}
      <section className="bg-cream px-6 md:px-10 lg:px-20 py-20">

        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16">
          <div>
            <div className="section-tag">Recent Work</div>
            <h2 className="section-title">
              Projects we're <em>proud of.</em>
            </h2>
          </div>

          <button
            className="btn-outline"
            onClick={() => navigate('/work')}
          >
            View All Projects
          </button>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="skeleton h-[260px]" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recent.map(p => (
              <WorkCard key={p.id} project={p} />
            ))}
          </div>
        )}

      </section>


      {/* CTA */}
      <section className="bg-green px-6 md:px-10 lg:px-20 py-16 flex flex-col md:flex-row items-center justify-between gap-8">

        <h2 className="font-serif text-3xl text-cream max-w-xl">
          Your generosity creates change that echoes for generations.
        </h2>

        <button
          className="btn-gold"
          onClick={() => navigate('/donate')}
        >
          Donate Today
        </button>

      </section>

      <Footer />

    </div>
  )
}