import Link from 'next/link'
import Image from 'next/image'
import ForgotPasswordForm from './ForgotPasswordForm'

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-[#fcf9f8] flex items-center justify-center p-4">
      <div className="fixed -top-20 -right-20 w-96 h-96 bg-[#ffdbd0]/20 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="fixed -bottom-20 -left-20 w-96 h-96 bg-[#fed488]/20 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <main className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden bg-white shadow-2xl shadow-[#1b1c1c]/5">

        <section className="hidden md:block relative min-h-[580px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjSHOa7H7AdoSe0fr5twLE7o3PvzPOPHXBoWrbk5-Nl4M3814Fbx5CUYQWG4TX77NDzfaDNa54qA-P3PZvmDuJu6VDzFYq3ZUlQl-VURtNCwuz2Z09c_2-pYU_qBSX5TvlXqP72y1djJlsWCSjbqEmoDhbb565gf0m_E7UuzWttUKedJ9Wzag7Z9YpoYOD3t2LA_lb1mjNIckQ6_htAkooQ3agC6Fitjg3Tx7jeDev2iDS1bDzgl5YtUIIDeDktM1zScoVs95pteNj"
              alt="Premium dates and dry fruits"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c1c]/65 via-transparent to-transparent" />
          <div className="absolute bottom-12 left-10 right-10 text-[#fcf9f8]">
            <div className="mb-3 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffdea5" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ffdea5]">100% Natural</span>
            </div>
            <h2 className="text-[36px] font-bold leading-tight tracking-tight mb-3" style={{ fontFamily: 'Epilogue, sans-serif' }}>
              Annamalai Dates
            </h2>
            <p className="text-[15px] text-[#fcf9f8]/85 leading-relaxed max-w-sm">
              Premium dates and dry fruits, handpicked for quality and delivered fresh across India.
            </p>
          </div>
        </section>

        <section className="flex flex-col justify-center px-8 md:px-14 py-12 bg-[#fcf9f8]">
          <div className="md:hidden mb-10 flex justify-center">
            <h2 className="text-[24px] font-bold text-[#74554b]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
              Annamalai Dates
            </h2>
          </div>

          <div className="max-w-sm w-full mx-auto">
            <div className="mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#f0eded] flex items-center justify-center mb-5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#74554b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <h3 className="text-[28px] font-bold text-[#1b1c1c] tracking-tight mb-1.5" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                Forgot Password?
              </h3>
              <p className="text-[14px] text-[#504441]">
                Enter your email and we&apos;ll send you a link to reset your password.
              </p>
            </div>

            <ForgotPasswordForm />

            <p className="text-center text-[10px] uppercase tracking-[0.18em] text-[#504441]/40 font-semibold mt-10">
              © 2024 Annamalai Dates · Quality Guaranteed.
            </p>
          </div>
        </section>

      </main>
    </div>
  )
}
