import { useNavigate } from "react-router-dom";
import { Facebook } from "lucide-react";

const socials = [
	{
		icon: Facebook,
		link: "https://www.facebook.com/share/17w9Smo5QC/",
	},
];

export default function Footer() {
	const navigate = useNavigate();

	return (
		<footer className='bg-charcoal w-full px-6 md:px-10 lg:px-[60px] pt-20 pb-10'>
			{/* Top Grid */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 pb-16 border-b border-white/[0.08]'>
				{/* Brand */}
				<div>
					<div className='font-serif flex items-center text-[1.8rem] font-semibold text-cream mb-4'>
						<img src='/logo.png' alt='ASD Humanitarian' width={180} />
					</div>

					<p className='text-[0.88rem] text-cream/45 leading-[1.8] max-w-[260px]'>
						Building a world where every community has the tools, resources, and
						dignity to thrive.
					</p>
				</div>

				{/* Navigation */}
				<div>
					<div className='text-[0.7rem] tracking-[0.18em] uppercase text-cream/35 mb-5'>
						Navigate
					</div>

					<ul className='flex flex-col gap-2.5'>
						{[
							["/", "Home"],
							["/about", "About Us"],
							["/work", "Our Work"],
							["/donate", "Donate"],
						].map(([path, label]) => (
							<li key={path}>
								<span
									onClick={() => navigate(path)}
									className='text-[0.88rem] text-cream/55 cursor-pointer transition-colors duration-200 hover:text-cream'
								>
									{label}
								</span>
							</li>
						))}
					</ul>
				</div>

				{/* Contact */}
				<div>
					<div className='text-[0.7rem] tracking-[0.18em] uppercase text-cream/35 mb-5'>
						Contact
					</div>

					<ul className='flex flex-col gap-2.5 text-[0.88rem] text-cream/55'>
						<li> asdpositiveimpactfoundation@gmail.com</li>
						<li>+4917661735619</li>
						<li>+234 901 979 1356</li>
						<li>+234 706 678 6255</li>
					</ul>
				</div>

				{/* Legal */}
				<div>
					<div className='text-[0.7rem] tracking-[0.18em] uppercase text-cream/35 mb-5'>
						Legal
					</div>

					<ul className='flex flex-col gap-2.5 text-[0.88rem] text-cream/55'>
						<li className='cursor-pointer hover:text-cream transition-colors duration-200'>
							Privacy Policy
						</li>

						<li className='cursor-pointer hover:text-cream transition-colors duration-200'>
							Tax Exemption Info
						</li>

						<li
							onClick={() => navigate("/admin")}
							className='cursor-pointer hover:text-cream transition-colors duration-200'
						>
							Admin
						</li>
					</ul>
				</div>
			</div>

			{/* Bottom Row */}
			<div className='flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-center pt-8'>
				<p className='text-[0.78rem] text-cream/30 text-center md:text-left'>
					© 2025 ASD Humanitarian Foundation. All rights reserved. Registered
					501(c)(3).
				</p>

				<div className='flex gap-4'>
					{socials.map(({ icon: Icon, link }, i) => (
						<a
							key={i}
							href={link}
							target='_blank'
							rel='noopener noreferrer'
							className='w-9 h-9 border border-white/10 rounded-full flex items-center justify-center
      text-cream/40 transition-all duration-300
      hover:border-gold hover:text-gold hover:-translate-y-[2px]'
						>
							<Icon size={16} />
						</a>
					))}
				</div>
			</div>
		</footer>
	);
}
