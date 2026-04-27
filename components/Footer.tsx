import Link from 'next/link'
import NewsletterForm from './NewsletterForm'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#f6f3f2] mt-8">
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <div
              className="font-bold text-[#1b1c1c] text-[20px] tracking-tight"
              style={{ fontFamily: 'Epilogue, sans-serif' }}
            >
              Annamalai Dates
            </div>
            <p className="text-[#504441] leading-relaxed text-[14px] max-w-[280px]">
              Premium quality dates and dry fruits, handpicked for freshness and
              delivered straight to your door across India.
            </p>
            <div className="flex gap-4 pt-1">
              {[
                { label: 'Instagram', href: '#' },
                { label: 'YouTube', href: '#' },
                { label: 'WhatsApp', href: '#' },
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

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#1b1c1c] uppercase tracking-widest text-[11px]">Shop</h4>
            <ul className="space-y-3">
              {[
                { label: 'All Products', href: '/products' },
                { label: 'Dates', href: '/products?category=dates' },
                { label: 'Nuts & Seeds', href: '/products?category=nuts' },
                { label: 'Dried Fruits', href: '/products?category=dry-fruits' },
                { label: 'Gift Sets', href: '/products?category=gift' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[14px] text-[#504441] hover:text-[#1b1c1c] hover:underline transition-all"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#1b1c1c] uppercase tracking-widest text-[11px]">Support</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Contact Us', href: '/about' },
                { label: 'Shipping Policy', href: '/about' },
                { label: 'Returns Policy', href: '/about' },
                { label: 'Privacy Policy', href: '/about' },
                { label: 'Terms of Service', href: '/about' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[14px] text-[#504441] hover:text-[#1b1c1c] hover:underline transition-all"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#1b1c1c] uppercase tracking-widest text-[11px]">Stay Updated</h4>
            <p className="text-[14px] text-[#504441] leading-relaxed">
              Get notified about new products, offers, and seasonal specials.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#d4c3be]/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-[#827470]">
            © {year} Annamalai Dates. All rights reserved.
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
