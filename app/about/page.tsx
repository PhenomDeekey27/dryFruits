import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'About Us — Annamalai Dates',
  description: 'Learn about Annamalai Dates — our story, mission, and commitment to quality dry fruits delivered fresh across India.',
}

const values = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title: 'Handpicked Quality',
    description: 'Every batch is carefully selected for size, texture, and freshness. We never compromise on quality.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
      </svg>
    ),
    title: 'Quality Assured',
    description: 'Each product is tested for purity and freshness before it reaches your door. No additives, no preservatives.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    ),
    title: 'Fast Delivery',
    description: 'We ship across India with care. Your order is packed fresh and delivered quickly to your home.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Customer First',
    description: 'We stand behind every order. If you\'re not satisfied, we make it right — no questions asked.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: '#fcf9f8', color: '#1b1c1c' }}>
      <Navbar />
      <main className="pt-20">

        {/* Hero */}
        <section className="px-6 md:px-8 py-20 bg-[#fcf9f8]">
          <div className="max-w-4xl mx-auto text-center">
            <span
              className="text-[#775a19] font-semibold uppercase tracking-[0.22em] text-[11px] mb-5 block"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Our Story
            </span>
            <h1
              className="text-[42px] sm:text-[56px] md:text-[68px] font-extrabold leading-[1.05] text-[#1b1c1c] mb-6 tracking-[-0.03em]"
              style={{ fontFamily: 'Epilogue, sans-serif' }}
            >
              About{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#74554b] to-[#8f6d63]">
                Annamalai Dates
              </span>
            </h1>
            <p className="text-[18px] text-[#504441] max-w-2xl mx-auto leading-relaxed">
              We started with one simple belief — everyone deserves access to truly fresh,
              high-quality dates and dry fruits without overpaying or settling for stale products.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="px-6 md:px-8 py-16 bg-[#f6f3f2]">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <h2
                className="text-[32px] md:text-[38px] font-bold tracking-tight text-[#1b1c1c]"
                style={{ fontFamily: 'Epilogue, sans-serif' }}
              >
                Where It All Began
              </h2>
              <p className="text-[16px] text-[#504441] leading-relaxed">
                Annamalai Dates was born out of a passion for natural, wholesome foods.
                We noticed that most dry fruits available in local markets were either
                over-processed, stale, or priced beyond reach.
              </p>
              <p className="text-[16px] text-[#504441] leading-relaxed">
                So we went directly to the source — building relationships with trusted
                farmers and suppliers who share our commitment to quality. Today, we source
                premium Medjool dates, California almonds, Iranian pistachios, and more,
                bringing them directly to Indian homes at fair prices.
              </p>
              <p className="text-[16px] text-[#504441] leading-relaxed">
                Every product on our shelf passes our freshness check. If it doesn&apos;t
                meet our standard, it doesn&apos;t reach you.
              </p>
            </div>
            <div className="bg-[#e9ddd9] rounded-2xl h-[340px] flex items-center justify-center">
              <div className="text-center space-y-3 px-8">
                <p
                  className="text-[64px] font-extrabold text-[#74554b]"
                  style={{ fontFamily: 'Epilogue, sans-serif' }}
                >
                  10k+
                </p>
                <p className="text-[16px] font-semibold text-[#1b1c1c]">Happy Customers Across India</p>
                <p className="text-[14px] text-[#504441]">
                  From home bakers to fitness enthusiasts, thousands trust Annamalai Dates every month.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="px-6 md:px-8 py-16 bg-[#fcf9f8]">
          <div className="max-w-5xl mx-auto text-center">
            <span className="text-[#775a19] font-semibold uppercase tracking-[0.22em] text-[11px] mb-4 block">
              Our Mission
            </span>
            <h2
              className="text-[32px] md:text-[40px] font-bold tracking-tight text-[#1b1c1c] mb-6"
              style={{ fontFamily: 'Epilogue, sans-serif' }}
            >
              Freshness. Quality. Trust.
            </h2>
            <p className="text-[17px] text-[#504441] max-w-2xl mx-auto leading-relaxed">
              We are committed to delivering the freshest dry fruits at honest prices,
              with transparency about sourcing and a guarantee you can rely on.
              No gimmicks. Just great products.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="px-6 md:px-8 py-16 bg-[#f6f3f2]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[#775a19] font-semibold uppercase tracking-[0.22em] text-[11px] mb-3 block">
                Why Us
              </span>
              <h2
                className="text-[32px] md:text-[40px] font-bold tracking-tight text-[#1b1c1c]"
                style={{ fontFamily: 'Epilogue, sans-serif' }}
              >
                Why Choose Annamalai Dates
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map(({ icon, title, description }) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl p-7 shadow-[0_4px_24px_rgba(27,28,28,0.05)] space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#fef0eb] flex items-center justify-center text-[#74554b]">
                    {icon}
                  </div>
                  <h3
                    className="text-[17px] font-bold text-[#1b1c1c]"
                    style={{ fontFamily: 'Epilogue, sans-serif' }}
                  >
                    {title}
                  </h3>
                  <p className="text-[14px] text-[#504441] leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-8 py-20 bg-[#fcf9f8]">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-[32px] md:text-[40px] font-bold tracking-tight text-[#1b1c1c] mb-5"
              style={{ fontFamily: 'Epilogue, sans-serif' }}
            >
              Ready to taste the difference?
            </h2>
            <p className="text-[17px] text-[#504441] mb-8 leading-relaxed">
              Browse our full range of premium dates, nuts, and dry fruits — and experience
              freshness you can actually taste.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-br from-[#74554b] to-[#8f6d63] text-white px-10 py-4 rounded-xl font-semibold text-[15px] shadow-sm hover:shadow-lg hover:from-[#5d4037] hover:to-[#74554b] transition-all duration-300 active:scale-95"
            >
              Shop Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
