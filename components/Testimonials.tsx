import Image from 'next/image'

const testimonials = [
  {
    quote: 'Ordered Medjool dates for the first time and was genuinely surprised by the quality. They arrived fresh, well-packed, and tasted absolutely wonderful. Will definitely reorder.',
    name: 'Priya S.',
    role: 'Home Baker, Bangalore',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqcvZgPqOOtjgU9A84e6eyYdmM_vRtiKuCZDCHFEjzoq6ukpMUfRFcfEO785M2i_mpeAWtYyk0yXSiOFT8qbXi8ehNf0U7lXLe5qauBcDRgUdtIJ2WhjXJmeyVe4czMxEBqmzDtJME6cKnM5ijObkAyf8q1HN3nCZb2bYQmHwbXkzBXYr0VHKYTQQeV06ny4CkqwAcAtOfIV2Bjf1La9Nv4am50xI7aEtTYiiM1DSFGKqRuWp2TUQ9_Jq2t08BwuxF1vAEEucgolZK',
    stagger: 'stagger-1',
  },
  {
    quote: "Best dry fruits I've bought online. The cashews and almonds are fresh, not stale like other brands. Great value for money and fast delivery too.",
    name: 'Rahul M.',
    role: 'Fitness Enthusiast, Chennai',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8qlMpgLYmyNO5p8s-h9M6j-WH_KjW5PGKUZWhdWl1uJR28_CIXdZRR0MtUPaY9j1BWdBOWienv1wBdl0X5XEmfs1hxBgxClkYKmje3ajGK7TA5mX7ZzoSAbJNgOmgfbD-UnMvFIETCXUTCB_aDglE1qQHw2it9o3VfsO79O3Zt7FVkjm9faljvIJLR5PWdy6DaBKQDuSPF8w1c6YfzQOaa2dh-F17ZEdjgwwXPozN_4UtcA-D385GpF1OwE7_uy0s2nyu-HPAW',
    stagger: 'stagger-3',
  },
  {
    quote: "I gift Annamalai dry fruits to family during festivals. The packaging is neat and the quality is consistently excellent. My go-to for gifting and daily snacking.",
    name: 'Anitha K.',
    role: 'Teacher, Coimbatore',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCusXE0vJGbPbsklWzAkbo8D23xu6Jk1Iu1vSqmg_Ny0HUVJsSb_hXxhEz5zM-It2TTj2gIWjXt2T2bQOw19YA2JBj1Dw7JxdRXL7-BEBkfuXuZhwRrlkfUApa213retstyNUIorURzoNGZz8aEArLelH5MMJ116cO5FwhB0SzzZ3QP47g6SOb0gsL-8OXvnoNYZFwyBe8eku8k8uoEwYy7z8PF5CJ9BEDv7AuaRK0LOg9NgROggVMc6ho',
    stagger: 'stagger-5',
  },
]

function QuoteIcon() {
  return (
    <svg
      className="text-[#775a19] opacity-20 absolute -top-4 left-6"
      width="48" height="48" viewBox="0 0 24 24" fill="currentColor"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
    </svg>
  )
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#f6f3f2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-[#775a19] font-semibold uppercase tracking-[0.22em] text-[11px] mb-3 block">
            Customer Reviews
          </span>
          <h2
            className="text-[36px] md:text-[42px] font-bold tracking-tight text-[#1b1c1c] mb-4"
            style={{ fontFamily: 'Epilogue, sans-serif' }}
          >
            What Our Customers Say
          </h2>
          <p className="text-[#504441] max-w-md mx-auto text-[16px] leading-relaxed">
            Real stories from people who love our fresh dates and dry fruits.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className={`animate-fade-in ${t.stagger} relative bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(27,28,28,0.06)] hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(27,28,28,0.12)] transition-all duration-300 cursor-default`}
            >
              <QuoteIcon />

              <p className="text-[#504441] italic text-[15px] leading-relaxed mb-8 mt-4">
                &quot;{t.quote}&quot;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#ffdbd0] flex-shrink-0">
                  <Image
                    src={t.avatarUrl}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-bold text-[#1b1c1c] text-[14px]">{t.name}</p>
                  <p className="text-[12px] text-[#504441] mt-0.5">{t.role}</p>
                </div>
              </div>

              {/* Star rating */}
              <div className="flex gap-0.5 mt-5">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="#775a19" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
