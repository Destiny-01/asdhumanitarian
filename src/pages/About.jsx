import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const matronsPatrons = [
  {
    name: "Lina Jimah",
    post: "Matron",
    image: "/mat(1).jpeg",
    description:
      "A dedicated health practitioner and humanitarian based in Fresno, California. Since 2020, she has been a strong mother figure within the foundation, offering guidance, compassion, and unwavering support to its mission. As Matron, Lina has consistently demonstrated her passion for empowering the next generation through education. Through the foundation, she has provided scholarships to numerous students and continues to sponsor many young people, ensuring they have access to quality education. Lina firmly believes that education is a right, not a privilege. Her generosity, mentorship, and commitment to humanitarian service continue to transform lives and strengthen the impact of the ASD Humanitarian Foundation.",
  },
  {
    name: "Prince Cosmos Sado",
    post: "Patron",
    image: "/pat(1).jpeg",
    description:
      "A distinguished philanthropist based in the Netherlands. A royal prince of the Okpella Kingdom, Edo State, Nigeria, he embodies leadership, compassion, and a deep commitment to humanitarian service. Since the creation of ASD in 2020, Prince Cosmos has stood firmly by the organization. He was the very first individual to provide financial support, laying a strong foundation for the growth and sustainability of the foundation. He passionately believes that every child in Africa deserves three square meals a day, and this conviction is reflected in his consistent generosity toward ASD projects. In 2020, he played a pivotal role in funding the medical bills of an orphan (Emmanuel) who underwent two heart surgeries. Beyond financial assistance, he later adopted the child, offering him not only medical recovery but a renewed life and future.",
  },
  {
    name: "Herientta Eshieshimua Lia",
    post: "Matron",
    image: "/mat(2).jpeg",
    description:
      "Herienta is one of the foundational pillars of the organization. A true philanthropist, she embodies unconditional giving and steadfast commitment to humanitarian service. Though based in Europe, far from home, her generous heart remains closely connected to our people. For the past six years, Herientta has contributed immensely to ASD projects, including consistent and impactful support for the Feed an Orphan Project. Beyond organizational initiatives, she extends personal financial assistance to members annually, helping to ease burdens such as school fees and medical bills. Her compassion, sacrifice, and unwavering generosity continue to strengthen ASD's mission and uplift countless lives.",
  },
];

const stateCoordinators = [
  {
    name: "Barr Isabella Odunayo",
    post: "State Coordinator, Abuja",
    image: "/sta(1).jpeg",
  },
  {
    name: "Mr Denise Aizeboeje Oarhe",
    post: "State Coordinator, Lagos State",
    image: "/sta(2).jpeg",
  },
  {
    name: "Mr Larry Enetomhe Ikhumetse",
    post: "State Coordinator, Edo State (Benin City)",
    image: "/sta(3).jpeg",
  },
  {
    name: "Juliet Alemoh",
    post: "State Coordinator, Edo North (Homebase)",
    image: "/sta(4).jpeg",
  },
  {
    name: "Mr Benjamin Oyobu",
    post: "State Coordinator, Kano State",
    image: "/sta(5).jpeg",
  },
  {
    name: "Dr Johnson Oshoma Esq.",
    post: "State Coordinator, Rivers State",
    image: "/sta(6).jpeg",
  },
  {
    name: "Mr. Felix Agbugui",
    post: "State Coordinator, Delta State",
    image: "/sta(7).jpeg",
  },
];

const adminTeam = [
  {
    name: "Queen Sabrina Igbokah",
    post: "Social Media Director",
    image: "/exec(1).jpeg",
  },
  {
    name: "Mike Emadomi Beloved",
    post: "Asst. Social Media Director",
    image: "/exec(2).jpeg",
  },
  { name: "Medina Lisa Yahaya", post: "Administrator", image: "/exec(4).jpeg" },
  { name: "Luminous Lucia", post: "Administrator", image: "/exec(9).jpeg" },
  {
    name: "Christiana Isomine Omomia",
    post: "Administrator",
    image: "/exec(6).jpeg",
  },
  { name: "Oroboisa Jessica", post: "Administrator", image: "/exec(7).jpeg" },
  {
    name: "Juliet Alemoh",
    post: "Administrator",
    image: "/sta(4).jpeg",
  },
  {
    name: "Momodu Abdulrazak",
    post: "Public Relations Officer",
    image: "/admin(6).jpeg",
  },
  {
    name: "Naomi Okamudu",
    post: "Administrator",
    image: "/exec(8).jpeg",
  },
  {
    name: "Princess Joan Osomiame",
    post: "Administrator",
    image: "/exec(5).jpeg",
  },
];

const leadershipTeam = [
  {
    name: "Mr. Victor Odogbo",
    post: "President/CEO",
    image: "/admin(1).png",
    description:
      'Mr. Victor Odogbo (also known as Boss-V) is a philanthropist, professional chef, musician, and social media influencer based in Oldenburg, Germany. A proud son of Afemai, Edo State, Nigeria, he is the President and Convener of the Afemai Sons and Daughters (ASD) Initiative Worldwide. And ASD Foundation- Positive Impact. Born on September 8, 1980, to Mr. and Mrs. Anthony Akowe Odogbo, Victor began his education at Azama Primary School, Jattu Uzairue, and Our Lady of Fatima College, Auchi. He studied Political Science at Ambrose Alli University, Ekpoma, and later specialized in Catering and Restaurant Management in Oldenburg, Germany. As a chef, he is passionate about teaching cooking in a fun and engaging way. As a humanitarian, he is deeply committed to empowering the less privileged and advocating for community development. Through the Afemai Sons and Daughters (ASD) Initiative, he promotes Afemai cultural heritage, unity, entrepreneurship, job creation, youth empowerment, and support for the marginalized. Born into a family of musicians, his love for music began in church at age 12. He released his first album "Refugee" in 2006 and his second album, "My Journey" (2024), dedicated to orphans in Afemai land. Happily married to Bridget Abena Nsiah, a Ghanaian-born German, and blessed with four children, Mr. Victor Odogbo envisions establishing an orphanage home and a skill acquisition center in Afemai land. He remains a passionate advocate for community growth and a beacon of hope to his generation.',
  },
  {
    name: "Engr Nurudeen Suleiman Abubakar",
    post: "Vice President",
    image: "/admin(2).jpeg",
    description:
      "Since his appointment in 2025, he has demonstrated remarkable commitment and dedication to the vision and mission of the organization. In his leadership role, Engr. Nurudeen works tirelessly to ensure the smooth running, coordination, and continuous progress of the foundation's activities and humanitarian initiatives. His sense of responsibility, strategic support, and passion for service have strengthened the organization's operational effectiveness. Through his leadership and commitment, he continues to contribute significantly to the growth and impact of the ASD Humanitarian Foundation.",
  },
  {
    name: "Blessing Omoaka",
    post: "General Secretary",
    image: "/admin(3).png",
    description:
      "Blessing Omoaka Serves as the General Secretary of ASD Foundation, a role she carries out with diligence, structure, and unwavering commitment. She is a dependable team member, consistently optimistic about growth and the continuous advancement of the organization. A selfless and compassionate woman who loves the Lord deeply, Blessing genuinely cares for everyone around her. Her dedication to humanitarian service has significantly contributed to ASD's achievements over the years since 2021. As a natural team builder, she fosters unity, coordination, and collective strength, qualities that continue to reinforce the foundation's impact and long-term vision.",
  },
  {
    name: "Recheal Aigbodion",
    post: "Accountant",
    image: "/admin(4).jpeg",
    description:
      "Recheal Aigbodion is a dedicated humanitarian based in Abuja, Nigeria, and a proud founding member of ASD Foundation. Since 2020, she has served with unwavering commitment, playing a vital role in the growth and stability of the organization. As one of the strong pillars of ASD, Recheal is deeply passionate about uplifting the less privileged and consistently champions initiatives that bring hope, support, and meaningful impact to vulnerable members of society. Her diligence and compassion continue to shape the foundation's mission and legacy.",
  },
  {
    name: "Medina Lisa Yahaya",
    post: "Financial Secretary",
    image: "/admin(5).jpeg",
    description:
      "Lisa she has served the organization tirelessly, demonstrating integrity, accountability, and an unwavering commitment to its mission. From 2021 to 2023, she also served as the ASD Abuja Branch Coordinator, where she provided strategic coordination and strengthened the foundation's outreach within the region. Medina is deeply compassionate and intentional about creating opportunities for vulnerable families to smile again. Her dedication, financial stewardship, and heart for service continue to reinforce the strength and credibility of ASD Foundation.",
  },
  {
    name: "Queen Sabrina Igbokah",
    post: "Social and Media Director",
    image: "/exec(1).jpeg",
    description:
      " Sabrina brings creativity, strategy, and heart to the organization's public voice. Since joining in 2021, she has served with unwavering love and passion, using media as a powerful tool to amplify the foundation's impact. Her dedication to telling meaningful stories and promoting humanitarian initiatives reflects her genuine commitment to service to humanity. Through her work, Sabrina continues to strengthen ASD's visibility, engagement, and connection with communities both online and offline.",
  },
  {
    name: "Momodu Abdulrazak",
    post: "President's Personal Assistant",
    image: "/admin(6).jpeg",
    description:
      "Momodu Abdulrazak serves as the Personal Assistant to the President of ASD Foundation, bringing loyalty, dedication, and positive energy to the leadership team. A down-to-earth and jovial personality, Abdulrazak generously gives his time and strength to support the vision and daily operations of the organization. His willingness to serve in every capacity demonstrates his deep commitment to the growth and progress of ASD. Through his reliability and proactive support, he continues to play a vital role in advancing the foundation's humanitarian mission.",
  },
  {
    name: "Comrade Famous O. Eshiobugie",
    post: "Project Coordinator",
    image: "/admin(7).jpeg",
    description:
      "Comrade Famous O. Eshiobugie is a dedicated supporter of the ASD Foundation, based in Abuja, Nigeria. Known for his strong commitment to humanitarian service, he is passionate about uplifting the less privileged and bringing hope to vulnerable members of society. Since 2023, Comrade Famous has consistently supported the foundation financially, contributing to the success and continuity of its humanitarian projects. His generosity and willingness to stand with the organization reflect his genuine desire to make a meaningful difference in the lives of those in need.",
  },
  {
    name: "Mrs. Awawu Danesi Aliyu",
    post: "Welfare",
    image: "/admin(8).jpeg",
    description:
      "Mrs. Awawu Danesi Aliyu is a dedicated health practitioner based in Lagos, Nigeria, and serves as the National Welfare Coordinator of the ASD Foundation. She is deeply passionate about the well-being of others and consistently advocates for care, support, and compassion within the community. Through her role in the foundation, Mrs. Awawu has demonstrated a strong commitment to ensuring the welfare of members and beneficiaries alike. Her dedication and supportive spirit have contributed greatly to the growth, stability, and impact of the ASD humanitarian foundation activities.",
  },
  {
    name: "Hon. Hindati Abdulkadir",
    post: "Leader",
    image: "/admin(9).jpeg",
    description:
      "Hon. Hindati Abdulkadir is a passionate woman, an advocate for the girl child. She is also a successful agricultural merchant based in Abuja, Nigeria. Hon. Hindati has been a strong and supportive figure to the ASD Humanitarian Foundation, consistently demonstrating her commitment to humanitarian service. Through her generosity and leadership, she has played a significant role in funding projects carried out by the foundation, helping to advance initiatives that support vulnerable families.",
  },
];

const stats = [
  {
    value: "6",
    label: "Years of Operation",
    desc: "Building trust and programs that last since 2020.",
  },
  {
    value: "100+",
    label: "Kids Supported",
    desc: "Children empowered through education, mentorship, and humanitarian support.",
  },
];

// Reusable slider component
function TeamSlider({ members, onSelect }) {
  return (
    <div className="flex gap-7 overflow-x-auto pb-4">
      {members.map((member) => (
        <div
          key={member.name + member.post}
          className="min-w-[260px] max-w-[260px] text-center flex-shrink-0 flex flex-col"
        >
          <img
            src={member.image}
            alt={member.name}
            className="w-full aspect-square object-cover object-top rounded mb-5"
          />
          <div className="font-serif text-[1.3rem] font-semibold text-charcoal mb-1">
            {member.name}
          </div>
          <div className="text-[0.76rem] tracking-[0.12em] uppercase text-gold mb-4">
            {member.post}
          </div>
          {onSelect && member.description && (
            <button
              onClick={() => onSelect(member)}
              className="mt-auto w-full py-2.5 px-4 bg-green text-cream text-[0.82rem] tracking-[0.1em] uppercase font-semibold rounded hover:opacity-90 transition-opacity"
            >
              Read Bio
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default function About() {
  const navigate = useNavigate();
  const [selectedLeader, setSelectedLeader] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const closeModal = () => setSelectedLeader(null);

  return (
    <div>
      {/* ── Hero ── */}
      <div
        className="bg-charcoal pt-[140px] md:pt-[160px] pb-[80px] md:pb-[100px] 
      px-6 md:px-10 lg:px-[60px] grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-end"
      >
        <h1
          className="font-serif font-light text-cream"
          style={{ fontSize: "clamp(3rem, 5vw, 5.5rem)", lineHeight: 1.05 }}
        >
          We're not
          <br />
          just a charity.
        </h1>

        <div>
          <p
            className="font-serif font-light italic text-cream/70 leading-[1.6]"
            style={{
              fontSize: "1.5rem",
              borderLeft: "2px solid #b8943a",
              paddingLeft: "28px",
            }}
          >
            "We exist to transform lives — not through temporary relief, but
            through structured empowerment that creates long-term stability and
            generational progress."
          </p>

          <p className="text-[0.78rem] text-cream/40 mt-4 pl-8 tracking-[0.1em] uppercase">
            — Mr. Victor Odogbo, Founder ASD Foundation
          </p>
        </div>
      </div>

      {/* ── Story ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="px-6 md:px-10 lg:px-[60px] py-[80px] md:py-[100px] lg:pr-20">
          <div className="section-tag">Our Story</div>

          <h2 className="section-title">
            A compassionate outreach that became a <em>movement.</em>
          </h2>

          <p className="text-[1rem] text-muted leading-[1.9] mt-7">
            Founded on April 29, 2020, by its visionary President, Mr. Victor
            Odogbo, the Afemai Sons and Daughters Initiative was established as
            a Foundation response to the urgent needs of orphans, vulnerable
            children, widows, and underserved families.
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

      {/* ── Teams ── */}
      <div className="px-6 md:px-10 lg:px-[60px] py-[80px] md:py-[100px]">
        <div className="section-tag">Our People</div>

        <h2 className="section-title">
          Driven by <em>purpose.</em>
        </h2>

        {/* 1. Leadership Team */}
        <div className="mt-10">
          <h3 className="font-serif text-[1.6rem] text-charcoal mb-8">
            Leadership Team
          </h3>
          <TeamSlider members={leadershipTeam} onSelect={setSelectedLeader} />
        </div>

        {/* 2. Matrons & Patrons */}
        <div className="mt-16">
          <h3 className="font-serif text-[1.6rem] text-charcoal mb-8">
            Matrons &amp; Patrons
          </h3>
          <TeamSlider members={matronsPatrons} onSelect={setSelectedLeader} />
        </div>

        {/* 3. State Coordinators */}
        <div className="mt-16">
          <h3 className="font-serif text-[1.6rem] text-charcoal mb-8">
            State Coordinators
          </h3>
          <TeamSlider members={stateCoordinators} />
        </div>

        {/* 4. Administrative Team */}
        <div className="mt-16">
          <h3 className="font-serif text-[1.6rem] text-charcoal mb-8">
            Administrative Team
          </h3>
          <TeamSlider members={adminTeam} />
        </div>
      </div>

      {/* Modal */}
      {selectedLeader && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-3/4 w-3/4 max-h-[75vh] flex flex-col overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute bg-white rounded-full px-3 py-2 top-4 right-4 text-[1.2rem] font-bold"
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row h-full min-h-0 flex-1">
              <div className="w-full md:w-1/2 h-[275px] md:h-full flex-shrink-0">
                <img
                  src={selectedLeader.image}
                  alt={selectedLeader.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="md:w-1/2 p-4 overflow-y-auto min-h-0 flex flex-col">
                <h3 className="font-serif text-[1.6rem] text-charcoal mb-2">
                  {selectedLeader.name}
                </h3>

                <p className="text-gold text-[0.85rem] uppercase tracking-[0.12em] mb-4">
                  {selectedLeader.post}
                </p>

                <p className="text-muted leading-[1.8] text-[0.95rem]">
                  {selectedLeader.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CTA ── */}
      <div
        className="bg-green px-6 md:px-10 lg:px-[60px] py-16 md:py-20 
      grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center"
      >
        <h2
          className="font-serif font-light text-cream max-w-[500px]"
          style={{ fontSize: "clamp(2rem, 3vw, 3rem)", lineHeight: 1.2 }}
        >
          Every contribution matters. Support the work today.
        </h2>

        <button
          className="btn-gold w-full md:w-auto"
          onClick={() => navigate("/donate")}
        >
          Donate Today
        </button>
      </div>

      <Footer />
    </div>
  );
}
