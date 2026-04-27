'use client'

import { useEffect, useRef, useState } from 'react'

export default function QuoteSection() {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [scrollProg, setScrollProg] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.25 },
    )
    obs.observe(el)

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const p = (window.innerHeight - r.top) / (window.innerHeight + r.height)
        setScrollProg(Math.max(0, Math.min(1, p)))
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      obs.disconnect()
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      ref={ref}
      className="relative py-32 sm:py-40 md:py-56 px-6 sm:px-10 md:px-16 overflow-hidden"
      style={{ background: 'var(--color-tertiary-fixed, #efe0cd)' }}
    >
      {/* Massive ghost quotation mark */}
      <div
        aria-hidden
        className="absolute -top-10 left-4 sm:left-10 md:left-16 select-none pointer-events-none"
        style={{
          fontFamily: 'Epilogue, sans-serif',
          fontSize: 'clamp(220px, 38vw, 560px)',
          lineHeight: 1,
          fontWeight: 800,
          color: 'rgba(28,28,28,0.06)',
          transform: `translateY(${scrollProg * -40}px)`,
        }}
      >
        “
      </div>

      <div className="max-w-5xl mx-auto relative">
        <div
          className="text-[11px] uppercase tracking-[0.32em] mb-10 sm:mb-12"
          style={{ color: 'var(--color-on-tertiary-fixed-variant, #4f4537)' }}
        >
          05 — A Word from the Grove
        </div>

        <blockquote
          className="font-light leading-[1.15] tracking-[-0.02em] mb-12 sm:mb-16"
          style={{
            fontFamily: 'Epilogue, sans-serif',
            color: 'var(--color-on-tertiary-fixed, #221a0f)',
            fontSize: 'clamp(28px, 4.6vw, 64px)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'all 1s cubic-bezier(.2,.8,.2,1)',
          }}
        >
          <em className="italic font-light">“My grandfather</em> would say
          a tree teaches you how to wait.{' '}
          <em className="italic font-light">We have only</em> ever tried to
          listen to it.”
        </blockquote>

        <div
          className="flex items-center gap-5"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.9s cubic-bezier(.2,.8,.2,1) 0.25s',
          }}
        >
          <div
            className="w-12 h-px"
            style={{ background: 'var(--color-on-tertiary-fixed, #221a0f)' }}
          />
          <div>
            <p
              className="text-[14px] sm:text-[15px] font-semibold mb-0.5"
              style={{
                fontFamily: 'Epilogue, sans-serif',
                color: 'var(--color-on-tertiary-fixed, #221a0f)',
              }}
            >
              Imran A. — Third-generation grower
            </p>
            <p
              className="text-[12px] uppercase tracking-[0.26em]"
              style={{ color: 'var(--color-on-tertiary-fixed-variant, #4f4537)' }}
            >
              Kerman Valley · Pistachio Lot 14
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
