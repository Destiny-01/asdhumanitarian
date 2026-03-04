import { useNavigate } from 'react-router-dom'

const socials = ['f', 'in', 'tw', 'ig']

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="bg-charcoal px-[60px] pt-20 pb-10">
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-16 pb-16 border-b border-white/[0.08]">
        <div>
          <div className="font-serif text-[1.8rem] font-semibold text-cream mb-4">
            Lumina<span className="text-gold">.</span>
          </div>
          <p className="text-[0.88rem] text-cream/45 leading-[1.8] max-w-[260px]">
            Building a world where every community has the tools, resources, and dignity to thrive.
          </p>
        </div>

        <div>
          <div className="text-[0.7rem] tracking-[0.18em] uppercase text-cream/35 mb-5">Navigate</div>
          <ul className="flex flex-col gap-2.5">
            {[['/', 'Home'], ['/about', 'About Us'], ['/work', 'Our Work'], ['/donate', 'Donate']].map(([path, label]) => (
              <li key={path}>
                <span
                  onClick={() => navigate(path)}
                  className="text-[0.88rem] text-cream/55 cursor-pointer transition-colors duration-200 hover:text-cream"
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-[0.7rem] tracking-[0.18em] uppercase text-cream/35 mb-5">Contact</div>
          <ul className="flex flex-col gap-2.5 text-[0.88rem] text-cream/55">
            <li>hello@lumina.org</li>
            <li>+1 (555) 000-0000</li>
            <li>123 Charity Lane, NY</li>
          </ul>
        </div>

        <div>
          <div className="text-[0.7rem] tracking-[0.18em] uppercase text-cream/35 mb-5">Legal</div>
          <ul className="flex flex-col gap-2.5 text-[0.88rem] text-cream/55">
            <li className="cursor-pointer hover:text-cream transition-colors duration-200">Privacy Policy</li>
            <li className="cursor-pointer hover:text-cream transition-colors duration-200">Tax Exemption Info</li>
            <li
              onClick={() => navigate('/admin')}
              className="cursor-pointer hover:text-cream transition-colors duration-200"
            >
              Admin
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center pt-8">
        <p className="text-[0.78rem] text-cream/30">
          © 2025 Lumina Foundation. All rights reserved. Registered 501(c)(3).
        </p>
        <div className="flex gap-4">
          {socials.map(s => (
            <a
              key={s}
              className="w-9 h-9 border border-white/10 rounded-full flex items-center justify-center
                         text-[0.72rem] text-cream/40 cursor-pointer transition-all duration-200
                         hover:border-gold hover:text-gold"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
