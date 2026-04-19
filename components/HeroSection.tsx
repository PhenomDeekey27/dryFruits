import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden px-6 md:px-8 py-20 bg-[#fcf9f8]">
      {/* Ambient blob */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#fed488]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#ffdbd0]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left — text */}
        <div className="lg:col-span-6 z-10 animate-fade-in">
          <span
            className="text-[#775a19] font-semibold uppercase tracking-[0.22em] text-[11px] mb-5 block"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Sourced from the heart of the Levant
          </span>

          <h1
            className="text-[38px] sm:text-[52px] md:text-[66px] lg:text-[76px] font-extrabold leading-[1.05] text-[#1b1c1c] mb-5 sm:mb-7 tracking-[-0.03em]"
            style={{ fontFamily: 'Epilogue, sans-serif' }}
          >
            Nature&apos;s<br />
            Confectionery,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#74554b] to-[#8f6d63]">
              Refined.
            </span>
          </h1>

          <p className="text-[17px] text-[#504441] max-w-[480px] mb-10 leading-relaxed">
            Experience the architectural beauty of sun-cured Medjool dates and hand-polished
            Marcona almonds. An editorial journey into the world&apos;s finest agrarian treasures.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-br from-[#74554b] to-[#8f6d63] text-white px-8 py-4 rounded-lg font-semibold text-[14px] shadow-sm hover:shadow-lg hover:from-[#5d4037] hover:to-[#74554b] transition-all duration-300 active:scale-95"
            >
              Shop the Collection
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-[#e5e2e1] text-[#1b1c1c] px-8 py-4 rounded-lg font-semibold text-[14px] hover:bg-[#eae7e7] transition-all duration-200"
            >
              Our Heritage
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#d4c3be]/30">
            {[
              { value: '10k+', label: 'Happy Customers' },
              { value: '100%', label: 'Natural' },
              { value: '50+', label: 'Varieties' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-[22px] font-bold text-[#74554b]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                  {value}
                </p>
                <p className="text-[11px] text-[#504441] uppercase tracking-widest mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — image */}
        <div className="lg:col-span-6 relative h-[300px] sm:h-[420px] lg:h-[640px] animate-scale-in stagger-2">
          <div className="absolute inset-0 bg-[#fed488]/15 rounded-[2rem] blur-3xl -z-10 transform translate-x-8 translate-y-8" />
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl lg:rotate-2 hover:rotate-0 transition-transform duration-700">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLqP28xin1AwlOz78QT42V1YHZWl6OMktnlOcn-RjDXCQH43_V5y6O6-0Bvon0GjiYi6sLO9iGPKLYnpw5GU8yojmndGumrLO2KrbUbaq9ywGynjymNiL2zwYd5yNkJxT6wQDy2ME7mf1vBdYmMyj8y62XlCv4MTOFGNK8gvKNFsLNBPynIojgxgkggXjWqDV4Ae4PQXIL5z-Temde903HF042V827IOHU1lcB_Ju07xRknLSUKlT2gCXSgJrE71Z31tWH1mycrZ5Z"
              alt="Premium Annamalai dates and walnuts on a textured limestone surface with soft morning light"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Floating badge */}
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-md">
              <p className="text-[11px] font-bold text-[#775a19] uppercase tracking-widest">Freshly Harvested</p>
              <p className="text-[13px] font-semibold text-[#1b1c1c] mt-0.5">New Season Medjool</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
