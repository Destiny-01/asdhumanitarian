import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass = ({ isActive }) =>
    `text-[0.82rem] tracking-[0.08em] uppercase transition-colors duration-200 cursor-pointer
     relative after:absolute after:bottom-[-3px] after:left-0 after:right-0 after:h-px
     after:bg-green after:transition-transform after:duration-200 after:origin-left no-underline
     ${isActive
       ? 'text-charcoal after:scale-x-100'
       : 'text-muted hover:text-charcoal after:scale-x-0 hover:after:scale-x-100'}`

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between
        bg-canvas border-b border-[rgba(28,28,26,0.1)]
        transition-all duration-300 w-screen
        ${scrolled
          ? 'px-6 md:px-10 lg:px-[60px] py-3'
          : 'px-6 md:px-10 lg:px-[60px] py-4'
        }`}
      >
        <span
          className="font-serif text-xl md:text-2xl font-semibold text-charcoal cursor-pointer tracking-wide"
          onClick={() => navigate('/')}
        >
          Lumina<span className="text-green">.</span>
        </span>

        <div className="hidden md:flex items-center gap-8 lg:gap-9">
          <NavLink to="/" className={linkClass} end>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/work" className={linkClass}>Our Work</NavLink>

          <NavLink
            to="/donate"
            className="bg-green text-cream px-6 py-2.5 text-[0.78rem]
            tracking-[0.1em] uppercase rounded-sm transition-colors
            duration-200 no-underline hover:bg-green-light"
          >
            Donate
          </NavLink>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-[2px] bg-charcoal"></span>
          <span className="w-6 h-[2px] bg-charcoal"></span>
          <span className="w-6 h-[2px] bg-charcoal"></span>
        </button>
      </nav>

      <div
        className={`fixed top-[70px] left-0 right-0 bg-canvas border-b
        border-[rgba(28,28,26,0.1)] md:hidden
        transition-all duration-300
        ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <div className="flex flex-col px-6 py-6 gap-5">

          <NavLink
            to="/"
            className="text-[0.9rem] uppercase tracking-[0.08em] text-charcoal no-underline"
            onClick={() => setMenuOpen(false)}
            end
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className="text-[0.9rem] uppercase tracking-[0.08em] text-charcoal no-underline"
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>

          <NavLink
            to="/work"
            className="text-[0.9rem] uppercase tracking-[0.08em] text-charcoal no-underline"
            onClick={() => setMenuOpen(false)}
          >
            Our Work
          </NavLink>

          <button
            onClick={() => {
              setMenuOpen(false)
              navigate('/donate')
            }}
            className="bg-green text-cream py-3 text-[0.85rem]
            tracking-[0.1em] uppercase rounded-sm"
          >
            Donate
          </button>

        </div>
      </div>
    </>
  )
}