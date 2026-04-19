export default function SubscriptionBanner() {
  return (
    <section className="py-20 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16"
          style={{
            background: 'linear-gradient(135deg, #74554b 0%, #8f6d63 50%, #655b4c 100%)',
          }}
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#fed488]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#ffdbd0]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 transform translate-x-16 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            {/* Left */}
            <div className="flex-1">
              <span className="bg-[#ffdea5] text-[#261900] text-[10px] font-bold px-3 py-1 rounded-full mb-6 inline-block uppercase tracking-widest">
                Member Exclusive
              </span>
              <h2
                className="text-white text-[28px] sm:text-[36px] md:text-[48px] font-bold mb-4 sm:mb-5 leading-tight tracking-tight"
                style={{ fontFamily: 'Epilogue, sans-serif' }}
              >
                Subscription:<br />
                Freshness in Flow
              </h2>
              <p className="text-white/80 text-[17px] mb-10 max-w-md leading-relaxed">
                Save 15% on monthly agrarian curation. Freshly harvested, ethically sourced,
                and delivered in sustainable packaging every season.
              </p>
              <button className="bg-white text-[#74554b] px-10 py-4 rounded-xl font-bold text-[14px] hover:bg-opacity-95 hover:shadow-xl transition-all duration-200 active:scale-95">
                Start Your Journey
              </button>
            </div>

            {/* Right — glassmorphism card */}
            <div className="flex-1 w-full hidden md:block max-w-sm">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl">
                {/* Club header */}
                <div className="flex items-center gap-4 mb-7">
                  <div className="w-12 h-12 bg-[#775a19] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-bold text-[15px]">The Harvest Club</p>
                    <p className="text-white/60 text-[12px] mt-0.5">Join 10k+ agrarian members</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-4">
                  <div className="flex justify-between text-white/70 text-[12px] mb-1">
                    <span>Membership spots remaining</span>
                    <span>85%</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#e9c176] rounded-full w-[85%] transition-all duration-1000" />
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/10 my-6" />

                {/* Testimonial snippet */}
                <p className="text-white/80 text-[13px] italic leading-relaxed mb-4">
                  &quot;The quality of these dates is architectural. Truly life-changing for my cooking.&quot;
                </p>

                {/* Perks */}
                <div className="space-y-2.5 mt-4">
                  {['15% off every order', 'Priority access to rare varieties', 'Free premium packaging'].map(perk => (
                    <div key={perk} className="flex items-center gap-2.5 text-white/80 text-[13px]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e9c176" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {perk}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
