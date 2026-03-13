import { useState, useRef, useEffect, useCallback } from "react";

const CAT_COLORS = {
	education: "#2a4a37",
	health: "#5c4a32",
	livelihoods: "#2a3e5c",
	infrastructure: "#4a3a2a",
};

// Placeholder images per category using picsum with distinct seeds
const PLACEHOLDER_IMAGES = {
	education: [
		"https://picsum.photos/seed/edu1/900/600",
		"https://picsum.photos/seed/edu2/900/600",
		"https://picsum.photos/seed/edu3/900/600",
		"https://picsum.photos/seed/edu4/900/600",
	],
	health: [
		"https://picsum.photos/seed/hlt1/900/600",
		"https://picsum.photos/seed/hlt2/900/600",
		"https://picsum.photos/seed/hlt3/900/600",
		"https://picsum.photos/seed/hlt4/900/600",
	],
	livelihoods: [
		"https://picsum.photos/seed/liv1/900/600",
		"https://picsum.photos/seed/liv2/900/600",
		"https://picsum.photos/seed/liv3/900/600",
		"https://picsum.photos/seed/liv4/900/600",
	],
	infrastructure: [
		"https://picsum.photos/seed/inf1/900/600",
		"https://picsum.photos/seed/inf2/900/600",
		"https://picsum.photos/seed/inf3/900/600",
		"https://picsum.photos/seed/inf4/900/600",
	],
	default: [
		"https://picsum.photos/seed/def1/900/600",
		"https://picsum.photos/seed/def2/900/600",
		"https://picsum.photos/seed/def3/900/600",
		"https://picsum.photos/seed/def4/900/600",
	],
};

function capitalize(s) {
	return s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
}

function getImages(project) {
	if (project.images && project.images.length > 0) return project.images;
	if (project.image_url)
		return [
			project.image_url,
			...(
				PLACEHOLDER_IMAGES[project.category] || PLACEHOLDER_IMAGES.default
			).slice(1),
		];
	return PLACEHOLDER_IMAGES[project.category] || PLACEHOLDER_IMAGES.default;
}

/* ── Image Slider ── */
function ImageSlider({ images }) {
	const [current, setCurrent] = useState(0);
	const [dragging, setDragging] = useState(false);
	const dragStart = useRef(null);
	const total = images.length;

	const prev = useCallback(
		() => setCurrent((i) => (i - 1 + total) % total),
		[total],
	);
	const next = useCallback(() => setCurrent((i) => (i + 1) % total), [total]);

	// keyboard
	useEffect(() => {
		const handler = (e) => {
			if (e.key === "ArrowLeft") prev();
			if (e.key === "ArrowRight") next();
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [prev, next]);

	// touch / drag
	const onPointerDown = (e) => {
		dragStart.current = e.clientX;
		setDragging(true);
	};
	const onPointerUp = (e) => {
		if (!dragging) return;
		const diff = e.clientX - dragStart.current;
		if (diff < -40) next();
		else if (diff > 40) prev();
		setDragging(false);
		dragStart.current = null;
	};

	return (
		<div
			className='relative w-full h-full select-none overflow-hidden'
			onPointerDown={onPointerDown}
			onPointerUp={onPointerUp}
			onPointerLeave={() => setDragging(false)}
		>
			{/* Slides */}
			<div
				className='flex h-full transition-transform duration-500 ease-in-out'
				style={{
					transform: `translateX(-${current * 100}%)`,
					width: `${total * 100}%`,
				}}
			>
				{images.map((src, i) => (
					<div
						key={i}
						className='h-full flex-shrink-0'
						style={{ width: `${100 / total}%` }}
					>
						<img
							src={src}
							alt={`slide-${i + 1}`}
							draggable={false}
							className='w-full h-full object-cover'
						/>
					</div>
				))}
			</div>

			{/* Prev / Next arrows */}
			{total > 1 && (
				<>
					<button
						onClick={prev}
						className='absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
                       bg-black/50 text-white flex items-center justify-center
                       hover:bg-black/75 transition-colors text-lg leading-none z-10'
						aria-label='Previous image'
					>
						‹
					</button>
					<button
						onClick={next}
						className='absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
                       bg-black/50 text-white flex items-center justify-center
                       hover:bg-black/75 transition-colors text-lg leading-none z-10'
						aria-label='Next image'
					>
						›
					</button>
				</>
			)}

			{/* Dot indicators */}
			{total > 1 && (
				<div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10'>
					{images.map((_, i) => (
						<button
							key={i}
							onClick={() => setCurrent(i)}
							className={`rounded-full transition-all duration-300 ${
								i === current ? "bg-white w-5 h-1.5" : "bg-white/50 w-1.5 h-1.5"
							}`}
							aria-label={`Go to image ${i + 1}`}
						/>
					))}
				</div>
			)}

			{/* Counter */}
			<div
				className='absolute top-3 right-3 bg-black/50 text-white text-[0.7rem]
                      tracking-widest px-2.5 py-1 rounded-full z-10'
			>
				{current + 1} / {total}
			</div>
		</div>
	);
}

/* ── Modal ── */
function WorkModal({ project, onClose }) {
	const { title, category, year, description, location, color } = project;
	const bg = color || CAT_COLORS[category] || "#2a4a37";
	const images = getImages(project);

	// lock body scroll
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, []);

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8'
			style={{
				backdropFilter: "blur(8px)",
				backgroundColor: "rgba(0,0,0,0.55)",
			}}
			onClick={onClose}
		>
			<div
				className='bg-white rounded-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl'
				style={{
					animation: "modalIn 0.28s cubic-bezier(0.34,1.56,0.64,1) both",
				}}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Image slider — fixed height */}
				<div
					className='relative h-[260px] md:h-[340px] flex-shrink-0'
					style={{ background: bg }}
				>
					<ImageSlider images={images} />

					{/* Close button over the image */}
					<button
						onClick={onClose}
						className='absolute top-3 left-3 z-20 w-9 h-9 rounded-full bg-black/50
                       text-white flex items-center justify-center hover:bg-black/75
                       transition-colors text-[1.1rem] leading-none'
						aria-label='Close'
					>
						✕
					</button>

					{/* Category pill */}
					<div
						className='absolute bottom-3 left-4 z-20 text-[0.65rem] tracking-[0.18em]
                          uppercase font-semibold px-3 py-1 rounded-full text-white'
						style={{ background: bg + "cc" }}
					>
						{capitalize(category)}
					</div>
				</div>

				{/* Content — scrollable */}
				<div className='flex-1 overflow-y-auto p-6 md:p-8'>
					{/* Meta row */}
					<div className='flex items-center gap-3 text-[0.74rem] text-muted mb-4'>
						<span className='font-semibold tracking-wide'>{year}</span>
						{location && (
							<>
								<span className='text-[#ccc]'>·</span>
								<span className='flex items-center gap-1'>
									<svg
										width='11'
										height='14'
										viewBox='0 0 11 14'
										fill='none'
										className='opacity-50'
									>
										<path
											d='M5.5 0C2.46 0 0 2.46 0 5.5c0 4.125 5.5 8.5 5.5 8.5S11 9.625 11 5.5C11 2.46 8.54 0 5.5 0Zm0 7.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z'
											fill='currentColor'
										/>
									</svg>
									{location}
								</span>
							</>
						)}
					</div>

					{/* Title */}
					<h2 className='font-serif text-[1.7rem] md:text-[2rem] font-semibold text-charcoal leading-tight mb-5'>
						{title}
					</h2>

					{/* Divider */}
					<div className='w-12 h-0.5 mb-5' style={{ background: bg }} />

					{/* Description */}
					<p className='text-[0.95rem] text-muted leading-[1.85]'>
						{description}
					</p>
				</div>
			</div>

			<style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.93) translateY(16px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);     }
        }
      `}</style>
		</div>
	);
}

/* ── WorkCard ── */
export default function WorkCard({ project }) {
	const [open, setOpen] = useState(false);
	const { title, category, year, description, location, image_url, color } =
		project;
	const bg = color || CAT_COLORS[category] || "#2a4a37";

	return (
		<>
			<div
				className='work-card group cursor-pointer'
				onClick={() => setOpen(true)}
			>
				{/* Image */}
				<div className='h-[220px] overflow-hidden'>
					{image_url ? (
						<div
							className='w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105'
							style={{ backgroundImage: `url('${image_url}')` }}
						/>
					) : (
						<div
							className='w-full h-full flex items-center justify-center font-serif text-6xl
                         text-white/20 transition-transform duration-500 group-hover:scale-105'
							style={{ background: bg }}
						>
							✦
						</div>
					)}
				</div>

				{/* Body */}
				<div className='p-7'>
					<div className='text-[0.68rem] tracking-[0.18em] uppercase text-gold mb-2.5'>
						{capitalize(category)}
					</div>
					<div className='font-serif text-[1.35rem] font-semibold text-charcoal leading-snug mb-2.5'>
						{title}
					</div>
					<p className='text-[0.84rem] text-muted leading-[1.7] line-clamp-3'>
						{description}
					</p>
				</div>

				{/* Footer */}
				<div className='px-7 py-4 border-t border-[rgba(28,28,26,0.1)] flex justify-between items-center'>
					<span className='text-[0.74rem] text-muted'>
						{year}
						{location ? ` · ${location}` : ""}
					</span>
					<span className='text-[0.74rem] text-green flex items-center gap-1.5 transition-[gap] duration-200 group-hover:gap-3'>
						Read more →
					</span>
				</div>
			</div>

			{open && <WorkModal project={project} onClose={() => setOpen(false)} />}
		</>
	);
}
