import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../lib/supabase";
import WorkCard from "../components/WorkCard";
import Footer from "../components/Footer";
import { ChevronDown } from "lucide-react";

function ValueItem({ num, title, desc, index, openIndex, toggleItem }) {
  const isOpen = openIndex === index;

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
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 text-muted text-sm leading-relaxed ${
            isOpen ? "max-h-96 mt-3" : "max-h-12"
          }`}
        >
          {desc}
        </div>
      </div>
    </div>
  );
}

const PARTNER_WHATSAPP = "+4917661735619";
const PARTNER_EMAIL = "asdpositiveimpactfoundation@gmail.com";

function PartnerPopup({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-cream rounded-lg w-[90vw] max-w-sm p-8 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-charcoal/40 hover:text-charcoal text-lg leading-none"
        >
          ✕
        </button>

        <p className="text-[0.7rem] tracking-[0.18em] uppercase text-gold mb-2">
          Become a Partner
        </p>

        <h3 className="font-serif text-[1.5rem] text-charcoal leading-snug mb-2">
          Let's connect.
        </h3>

        <p className="text-[0.88rem] text-muted leading-relaxed mb-7">
          Reach out to us directly — we'd love to explore how we can work
          together.
        </p>

        <div className="flex flex-col gap-3">
          <a
            href={`https://wa.me/${PARTNER_WHATSAPP.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full py-3 px-5 bg-[#25D366] text-white text-[0.88rem] font-semibold rounded hover:opacity-90 transition-opacity"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 shrink-0"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.118 1.528 5.855L.057 23.617a.5.5 0 0 0 .611.61l5.88-1.542A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.875 9.875 0 0 1-5.031-1.376l-.36-.214-3.733.979.995-3.638-.235-.374A9.862 9.862 0 0 1 2.1 12C2.1 6.533 6.533 2.1 12 2.1S21.9 6.533 21.9 12 17.467 21.9 12 21.9z" />
            </svg>
            Message us on WhatsApp
          </a>

          <a
            href={`mailto:${PARTNER_EMAIL}?subject=Partnership%20Enquiry`}
            target="_blank"
            className="flex items-center gap-3 w-full py-3 px-5 bg-charcoal text-cream text-[0.88rem] font-semibold rounded hover:opacity-90 transition-opacity"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5 shrink-0"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M2 7l10 7 10-7" />
            </svg>
            Send us an Email
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);
  const [showPartnerPopup, setShowPartnerPopup] = useState(false);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    getProjects()
      .then((data) => setProjects(data))
      .finally(() => setLoading(false));
  }, []);

  const recent = projects.slice(0, 3);

  return (
    <div>
      {showPartnerPopup && (
        <PartnerPopup onClose={() => setShowPartnerPopup(false)} />
      )}

      {/* HERO */}
      <section className="min-h-screen grid lg:grid-cols-2 pt-[80px]">
        <div className="bg-cream px-6 md:px-10 lg:px-20 py-16 flex flex-col justify-center">
          <div className="section-tag">
            Since 2020 · Restoring Hope. Empowering Futures.
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mt-6 text-charcoal">
            <em className="text-green not-italic">Empowering</em> Orphans,
            <br />
            <em className="text-green not-italic">Widows,</em> and
            <br />
            <em className="text-green not-italic">Vulnerable</em> Families.
          </h1>

          <p className="mt-6 text-muted max-w-md leading-relaxed">
            Supporting orphans, widows, and vulnerable families through shelter,
            food, and education.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="btn-primary" onClick={() => navigate("/donate")}>
              Donate Now
            </button>

            <button
              className="btn-outline"
              onClick={() => setShowPartnerPopup(true)}
            >
              Become a Partner
            </button>
          </div>
        </div>

        <div className="bg-charcoal relative flex items-end">
          <div className="p-10 lg:p-16 text-cream">
            <div className="uppercase text-xs tracking-[0.2em] mb-4 text-cream/60">
              Children empowered since 2020
            </div>

            <div className="font-serif text-5xl lg:text-6xl font-light">
              100<span className="text-gold">+</span>
            </div>

            <div className="text-sm mt-2 text-cream/70">
              each one given education, care, and a reason to believe
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="grid lg:grid-cols-2">
        <div className="px-6 md:px-10 lg:px-20 py-20">
          <div className="section-tag">Our Mission</div>

          <h2 className="section-title">
            We believe every Every child, Family deserves a{" "}
            <em>fighting chance.</em>
          </h2>

          <p className="mt-6 text-muted max-w-lg leading-relaxed">
            To restore dignity, hope, and opportunity to orphans, vulnerable
            children, widows, and underserved families through humanitarian
            intervention, education support, skill acquisition, and sustainable
            community development. We exist to transform lives, not through
            temporary relief, but through structured empowerment that creates
            long-term stability and generational progress.
          </p>

          <button
            className="btn-outline mt-10"
            onClick={() => navigate("/about")}
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

          <button className="btn-outline" onClick={() => navigate("/work")}>
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
            {recent.map((p) => (
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

        <button className="btn-gold" onClick={() => navigate("/donate")}>
          Donate Today
        </button>
      </section>

      <Footer />
    </div>
  );
}
