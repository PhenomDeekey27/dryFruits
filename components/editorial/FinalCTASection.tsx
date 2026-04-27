'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function FinalCTASection() {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const onMouse = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setMouse({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    })
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMouse}
      className="relative py-32 sm:py-40 md:py-56 px-6 sm:px-10 md:px-16 overflow-hidden"
      style={{
        background: 'var(--color-on-background, #1b1c1c)',
        color: 'var(--color-surface, #fcf9f8)',
      }}
    >
      {/* Soft moving gradients */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + mouse.x * 8}% ${
            45 + mouse.y * 8
          }%, var(--color-primary-container, #8f6d63) 0%, transparent 55%)`,
          opacity: 0.32,
          transition: 'background 200ms linear',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${30 - mouse.x * 6}% ${
            70 - mouse.y * 6
          }%, var(--color-secondary, #775a19) 0%, transparent 60%)`,
          opacity: 0.22,
        }}
      />

      <div className="max-w-5xl mx-auto relative text-center">
        <div
          className="text-[11px] uppercase tracking-[0.32em] mb-8 sm:mb-10"
          style={{ color: 'rgba(252,249,248,0.55)' }}
        >
          07 — The Invitation
        </div>

        <h2
          className="font-extrabold leading-[0.95] tracking-[-0.025em] mb-10 sm:mb-12"
          style={{
            fontFamily: 'Epilogue, sans-serif',
            fontSize: 'clamp(40px, 8vw, 116px)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'all 1s cubic-bezier(.2,.8,.2,1)',
          }}
        >
          Begin a quieter<br />
          <em className="italic font-light">pantry</em>.
        </h2>

        <p
          className="max-w-xl mx-auto text-[15px] sm:text-[17px] leading-relaxed mb-12 sm:mb-14"
          style={{
            color: 'rgba(252,249,248,0.7)',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1s 0.2s',
          }}
        >
          Choose a single lot, or commission a full edition. Every order is
          packed, sealed, and dispatched within a working day.
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 1s cubic-bezier(.2,.8,.2,1) 0.35s',
          }}
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full text-[13px] sm:text-[14px] font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: 'var(--color-surface, #fcf9f8)',
              color: 'var(--color-on-surface, #1b1c1c)',
              fontFamily: 'Epilogue, sans-serif',
            }}
          >
            Shop Premium Dry Fruits
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          <Link
            href="/collections"
            className="inline-flex items-center gap-2 px-7 sm:px-8 py-4 sm:py-5 rounded-full text-[13px] sm:text-[14px] font-semibold border transition-all duration-300 hover:bg-white/10"
            style={{
              borderColor: 'rgba(252,249,248,0.3)',
              color: 'var(--color-surface, #fcf9f8)',
              fontFamily: 'Epilogue, sans-serif',
            }}
          >
            Explore the Collection
          </Link>
        </div>
      </div>
    </section>
  )
}
