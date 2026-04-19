import NewsletterForm from './NewsletterForm'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#f6f3f2] mt-8">
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1 space-y-5">
            <div
              className="font-bold text-[#1b1c1c] text-[20px] tracking-tight"
              style={{ fontFamily: 'Epilogue, sans-serif' }}
            >
              Annamalai Dates
            </div>
            <p className="text-[#504441] leading-relaxed text-[14px]">
              Cultivating the art of nature&apos;s sweetest treasures through heritage sourcing
              and modern editorial curation.
            </p>
            <div className="flex gap-4 pt-1">
              {[
                { label: 'Instagram', href: '#' },
                { label: 'Pinterest', href: '#' },
                { label: 'YouTube', href: '#' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-[12px] font-semibold text-[#74554b] opacity-70 hover:opacity-100 transition-opacity"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-5">
            <h4 className="font-bold text-[#1b1c1c] uppercase tracking-widest text-[11px]">Explore</h4>
            <ul className="space-y-3">
              {['Sustainability', 'Wholesale', 'Shipping Policy', 'Privacy Policy', 'Terms of Use'].map(item => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[14px] text-[#504441] hover:text-[#1b1c1c] hover:underline transition-all"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-5">
            <h4 className="font-bold text-[#1b1c1c] uppercase tracking-widest text-[11px]">Categories</h4>
            <ul className="space-y-3">
              {['Royal Dates', 'Premium Nuts', 'Heirloom Seeds', 'Dried Fruits', 'Gift Sets'].map(item => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[14px] text-[#504441] hover:text-[#1b1c1c] hover:underline transition-all"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-5">
            <h4 className="font-bold text-[#1b1c1c] uppercase tracking-widest text-[11px]">Agrarian Journal</h4>
            <p className="text-[14px] text-[#504441] leading-relaxed">
              Join our list for seasonal harvest updates and private releases.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#d4c3be]/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-[#827470]">
            © {year} Annamalai Dates. Elevated Dry Fruits & Premium Dates.
          </p>
          <div className="flex items-center gap-2 text-[12px] text-[#827470]">
            <span>Made with care in India</span>
            <span className="text-[#74554b]">♥</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
