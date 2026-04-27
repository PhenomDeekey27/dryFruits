'use client'

import { useEffect, useRef, useState } from 'react'

const METRICS = [
  { v: '100%', l: 'Natural · No additives', d: 'Untouched by preservatives.' },
  { v: '14', l: 'Direct farm partners', d: 'Single-origin lots, named at source.' },
  { v: '< 24h', l: 'From sort to seal', d: 'Hand-packed within the day.' },
  { v: 'A+', l: 'Premium grade only', d: 'A third of every harvest is set aside.' },
]

export default function MetricsSection() {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

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

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 md:py-40 px-6 sm:px-10 md:px-16"
      style={{
        background: 'var(--color-inverse-surface, #303030)',
        color: 'var(--color-inverse-on-surface, #f3f0ef)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="text-[12px] uppercase tracking-[0.32em] mb-12 sm:mb-16"
          style={{ color: 'rgba(243,240,239,0.55)' }}
        >
          04 — The Standard
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
             style={{ background: 'rgba(243,240,239,0.12)' }}>
          {METRICS.map((m, i) => (
            <div
              key={m.l}
              className="relative px-2 py-12 sm:py-16"
              style={{
                background: 'var(--color-inverse-surface, #303030)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.8s cubic-bezier(.2,.8,.2,1) ${i * 0.1}s`,
              }}
            >
              <div
                className="font-extrabold leading-none mb-6 tracking-[-0.04em]"
                style={{
                  fontFamily: 'Epilogue, sans-serif',
                  fontSize: 'clamp(48px, 7vw, 96px)',
                  color: 'var(--color-secondary-fixed, #ffdea5)',
                }}
              >
                {m.v}
              </div>
              <div
                className="text-[12px] uppercase tracking-[0.26em] mb-3 font-semibold"
                style={{ color: 'rgba(243,240,239,0.95)' }}
              >
                {m.l}
              </div>
              <div
                className="text-[13px] sm:text-[14px] leading-relaxed max-w-[200px]"
                style={{ color: 'rgba(243,240,239,0.6)' }}
              >
                {m.d}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
