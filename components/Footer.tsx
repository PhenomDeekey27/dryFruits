export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#f6f3f2] mt-8">
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-16 pb-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Left: Brand */}
          <div className="space-y-4 max-w-xs">
            <div
              className="font-bold text-[#1b1c1c] text-[24px] tracking-tight"
              style={{ fontFamily: 'Epilogue, sans-serif' }}
            >
              Annamalai Dates
            </div>
            <p className="text-[#504441] leading-relaxed text-[14px]">
              Premium quality dates and dry fruits, handpicked for freshness and
              delivered straight to your door across India.
            </p>
          </div>

          {/* Right: Static content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Info */}
            <div className="space-y-3">
              <h4 className="font-bold text-[#1b1c1c] uppercase tracking-widest text-[11px]">Contact</h4>
              <div className="space-y-2 text-[14px] text-[#504441]">
                <p>Email: support@annmalaaidates.com</p>
                <p>Phone: +91 9876543210</p>
                <p>Business Hours: Mon - Sat, 9am - 6pm IST</p>
              </div>
            </div>

            {/* Headquarters */}
            <div className="space-y-3">
              <h4 className="font-bold text-[#1b1c1c] uppercase tracking-widest text-[11px]">Location</h4>
              <div className="space-y-2 text-[14px] text-[#504441]">
                <p>Annamalai Dates HQ</p>
                <p>Chennai, Tamil Nadu</p>
                <p>India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#d4c3be]/30 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
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
