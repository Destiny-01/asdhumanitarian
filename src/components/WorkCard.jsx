const CAT_COLORS = {
  education:      '#2a4a37',
  health:         '#5c4a32',
  livelihoods:    '#2a3e5c',
  infrastructure: '#4a3a2a',
}

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''
}

export default function WorkCard({ project }) {
  const { title, category, year, description, location, image_url, color } = project
  const bg = color || CAT_COLORS[category] || '#2a4a37'

  return (
    <div className="work-card group">
      {/* Image */}
      <div className="h-[220px] overflow-hidden">
        {image_url ? (
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url('${image_url}')` }}
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
      </div>

      {/* Body */}
      <div className="p-7">
        <div className="text-[0.68rem] tracking-[0.18em] uppercase text-gold mb-2.5">
          {capitalize(category)}
        </div>
        <div className="font-serif text-[1.35rem] font-semibold text-charcoal leading-snug mb-2.5">
          {title}
        </div>
        <p className="text-[0.84rem] text-muted leading-[1.7]">{description}</p>
      </div>

      {/* Footer */}
      <div className="px-7 py-4 border-t border-[rgba(28,28,26,0.1)] flex justify-between items-center">
        <span className="text-[0.74rem] text-muted">
          {year}{location ? ` · ${location}` : ''}
        </span>
        <span className="text-[0.74rem] text-green flex items-center gap-1.5 transition-[gap] duration-200 group-hover:gap-3">
          Read more →
        </span>
      </div>
    </div>
  )
}
