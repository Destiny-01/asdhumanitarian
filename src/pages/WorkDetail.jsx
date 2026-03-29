import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import works from '../data/works.json'
import Footer from '../components/Footer'

const CAT_COLORS = {
  education:    '#2a4a37',
  empowerment:  '#5c4a32',
  infrastructure: '#4a3a2a',
}

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''
}

function ytThumb(embedUrl) {
  if (!embedUrl) return null
  const match = embedUrl.match(/embed\/([^?&/]+)/)
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null
}

/* ── Inline paragraph renderer (preserves \n\n as paragraph breaks) ── */
function Paragraphs({ text }) {
  return (
    <div className="space-y-5">
      {text.split('\n\n').map((para, i) => (
        <p key={i} className="text-[1rem] text-muted leading-[1.9]">
          {para}
        </p>
      ))}
    </div>
  )
}

/* ── Video embed ── */
function VideoEmbed({ src }) {
  return (
    <div className="w-full rounded overflow-hidden shadow-lg"
         style={{ aspectRatio: '16/9' }}>
      <iframe
        src={src}
        title="Project video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full border-0"
      />
    </div>
  )
}

/* ── Image grid + lightbox ── */
function ImageGallery({ images }) {
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const slides = images.map(src => ({ src }))

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="group relative overflow-hidden rounded aspect-square focus:outline-none
                       focus-visible:ring-2 focus-visible:ring-green"
            aria-label={`Open photo ${i + 1}`}
          >
            <img
              src={src}
              alt={`Photo ${i + 1}`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300
                            flex items-center justify-center">
              <svg
                width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
              >
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
                <path d="M11 8v6M8 11h6"/>
              </svg>
            </div>
            {/* index counter */}
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[0.6rem]
                            tracking-widest px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100
                            transition-opacity duration-300">
              {i + 1}/{images.length}
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        on={{ view: ({ index }) => setLightboxIndex(index) }}
        styles={{
          container: { backgroundColor: 'rgba(0,0,0,0.92)' },
        }}
      />
    </>
  )
}

/* ── Main page ── */
export default function WorkDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const project = works.find(p => p.slug === slug)

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-muted">
        <div className="font-serif text-5xl text-green/30">✦</div>
        <p className="text-[1rem]">Project not found.</p>
        <Link to="/work" className="btn-outline text-sm">← Back to Work</Link>
      </div>
    )
  }

  const {
    title, category, year, location, summary,
    coverImage, videoEmbed, images,
  } = project

  const bg = CAT_COLORS[category] || '#2a4a37'
  const heroImage = coverImage || ytThumb(videoEmbed)
  const hasVideo  = !!videoEmbed
  const cleanImages = (images ?? []).filter(Boolean)
  const hasImages = cleanImages.length > 0

  /* Related projects — same category, excluding self */
  const related = works
    .filter(p => p.slug !== slug && p.category === category)
    .slice(0, 3)

  return (
    <div>

      {/* ── HERO ── */}
      <div
        className="relative min-h-[480px] md:min-h-[560px] flex items-end pb-16 px-6 md:px-10 lg:px-[60px] pt-[140px]"
        style={{ background: bg }}
      >
        {/* Background cover image — darkened */}
        {heroImage && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${heroImage}')`,
              opacity: 0.22,
            }}
          />
        )}

        {/* Dark gradient overlay at bottom for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${bg}55 0%, ${bg}dd 60%, ${bg} 100%)`,
          }}
        />

        <div className="relative z-10 max-w-[780px]">

          {/* Back */}
          <button
            onClick={() => navigate('/work')}
            className="flex items-center gap-2 text-white/60 text-[0.74rem] tracking-[0.12em]
                       uppercase mb-10 hover:text-white transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All Projects
          </button>

          {/* Category + year + location */}
          <div className="flex flex-col gap-2 mb-5">
            <div className="flex items-center gap-3">
              <span
                className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold px-3 py-1 rounded-full text-white"
                style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}
              >
                {capitalize(category)}
              </span>
              <span className="text-white/50 text-[0.74rem]">{year}</span>
            </div>
            {location && (
              <span className="text-white/50 text-[0.74rem] flex items-center gap-1.5">
                <svg width="10" height="13" viewBox="0 0 11 14" fill="currentColor" className="opacity-60">
                  <path d="M5.5 0C2.46 0 0 2.46 0 5.5c0 4.125 5.5 8.5 5.5 8.5S11 9.625 11 5.5C11 2.46 8.54 0 5.5 0Zm0 7.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"/>
                </svg>
                {location}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-serif text-white font-light leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', letterSpacing: '-0.01em' }}>
            {title}
          </h1>

          {/* Media badges */}
          <div className="flex gap-2 mt-6">
            {hasVideo && (
              <span className="flex items-center gap-1.5 bg-white/10 text-white/70 text-[0.65rem]
                               tracking-widest uppercase px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                <svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor"><path d="M2 1.5l7 3.5-7 3.5V1.5z"/></svg>
                Video
              </span>
            )}
            {hasImages && (
              <span className="flex items-center gap-1.5 bg-white/10 text-white/70 text-[0.65rem]
                               tracking-widest uppercase px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="1" y="1" width="8" height="8" rx="1"/>
                  <circle cx="3.5" cy="3.5" r="1"/>
                  <path d="M1 7l2.5-2.5L5 6l2-2 2 3"/>
                </svg>
                {images.length} photos
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="px-6 md:px-10 lg:px-[60px] py-20 max-w-[1100px]">

        {/* Write-up */}
        <div className="max-w-[680px] mb-20 animate-fade-up">
          <div className="section-tag">About this project</div>
          <Paragraphs text={summary} />
        </div>

        {/* Video */}
        {hasVideo && (
          <div className="mb-20 animate-fade-up delay-100">
            <div className="section-tag">Watch</div>
            <VideoEmbed src={videoEmbed} />
          </div>
        )}

        {/* Gallery */}
        {hasImages && (
          <div className="animate-fade-up delay-200">
            <div className="section-tag mb-8">Photos from the field</div>
            <ImageGallery images={cleanImages} />
          </div>
        )}

      </div>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <div className="bg-cream px-6 md:px-10 lg:px-[60px] py-20">
          <div className="section-tag">More in {capitalize(category)}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {related.map(p => (
              <Link
                key={p.slug}
                to={`/work/${p.slug}`}
                className="group block no-underline"
              >
                <div className="overflow-hidden rounded mb-4 h-[180px]">
                  {(p.coverImage || ytThumb(p.videoEmbed)) ? (
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${p.coverImage || ytThumb(p.videoEmbed)}')` }}
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={{ background: CAT_COLORS[p.category] || '#2a4a37' }}
                    />
                  )}
                </div>
                <div className="text-[0.68rem] tracking-[0.18em] uppercase text-gold mb-1.5">
                  {p.year}
                  {p.location ? ` · ${p.location}` : ''}
                </div>
                <div className="font-serif text-[1.15rem] font-semibold text-charcoal leading-snug
                                group-hover:text-green transition-colors duration-200">
                  {p.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
