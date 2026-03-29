import { Link } from 'react-router-dom'

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

export default function WorkCard({ project }) {
  const { slug, title, category, year, location, summary, coverImage } = project
  const bg = CAT_COLORS[category] || '#2a4a37'
  const thumb = coverImage || ytThumb(project.videoEmbed)
  const hasVideo = !!project.videoEmbed
  const imageCount = project.images?.length ?? 0

  return (
    <Link
      to={`/work/${slug}`}
      className="work-card group block no-underline"
    >
      {/* Cover image */}
      <div className="h-[220px] overflow-hidden relative">
        {thumb ? (
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url('${thumb}')` }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center font-serif text-6xl
                       text-white/20 transition-transform duration-500 group-hover:scale-105"
            style={{ background: bg }}
          >
            ✦
          </div>
        )}

        {/* Media badges */}
        <div className="absolute bottom-3 left-3 flex gap-1.5 z-10">
          {hasVideo && (
            <span className="flex items-center gap-1 bg-black/60 text-white text-[0.62rem] tracking-widest uppercase px-2.5 py-1 rounded-full backdrop-blur-sm">
              <svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor">
                <path d="M2 1.5l7 3.5-7 3.5V1.5z"/>
              </svg>
              Video
            </span>
          )}
          {imageCount > 0 && (
            <span className="flex items-center gap-1 bg-black/60 text-white text-[0.62rem] tracking-widest uppercase px-2.5 py-1 rounded-full backdrop-blur-sm">
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="1" width="8" height="8" rx="1"/>
                <circle cx="3.5" cy="3.5" r="1"/>
                <path d="M1 7l2.5-2.5L5 6l2-2 2 3"/>
              </svg>
              {imageCount}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-7">
        <div className="text-[0.68rem] tracking-[0.18em] uppercase text-gold mb-2.5">
          {capitalize(category)}
        </div>
        <div className="font-serif text-[1.35rem] font-semibold text-charcoal leading-snug mb-2.5">
          {title}
        </div>
        <p className="text-[0.84rem] text-muted leading-[1.7] line-clamp-3">
          {summary}
        </p>
      </div>

      {/* Footer */}
      <div className="px-7 py-4 border-t border-[rgba(28,28,26,0.1)] flex justify-between items-center">
        <span className="text-[0.74rem] text-muted">
          {year}{location ? ` · ${location}` : ''}
        </span>
        <span className="text-[0.74rem] text-green flex items-center gap-1.5 transition-[gap] duration-200 group-hover:gap-3">
          View project →
        </span>
      </div>
    </Link>
  )
}
