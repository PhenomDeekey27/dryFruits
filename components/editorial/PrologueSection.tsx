'use client'

import { useEffect, useRef, useState } from 'react'

export default function PrologueSection() {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.18 },
    )
    obs.observe(el)

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const p = (window.innerHeight - r.top) / (window.innerHeight + r.height)
        setScrollY(Math.max(0, Math.min(1, p)))
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
      className="relative py-24 sm:py-32 md:py-40 px-6 sm:px-10 md:px-16 overflow-hidden"
      style={{ background: 'var(--color-surface, #fcf9f8)' }}
    >
      {/* Section number — large, ghosted */}
      <div
        className="absolute top-8 left-6 sm:left-10 md:left-16 text-[12px] tracking-[0.32em] uppercase"
        style={{
          color: 'var(--color-on-surface-variant, #504441)',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
        }}
      >
        02 — Prologue
      </div>

      {/* Vertical chapter mark */}
      <div
        className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-[0.4em] rotate-90 origin-center"
        style={{ color: 'var(--color-outline, #827470)' }}
      >
        Chapter · Origin
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <span
            className="text-[11px] uppercase tracking-[0.3em] mb-4 block"
            style={{ color: 'var(--color-secondary, #775a19)' }}
          >
            On Origin & Patience
          </span>
          <h2
            className="font-extrabold leading-[0.98] tracking-[-0.025em] mb-8"
            style={{
              fontFamily: 'Epilogue, sans-serif',
              color: 'var(--color-on-surface, #1b1c1c)',
              fontSize: 'clamp(36px, 6vw, 76px)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(.2,.8,.2,1)',
            }}
          >
            From orchard<br />to <em className="italic font-light">linen</em>.
          </h2>

          {/* Decorative thin rule */}
          <div
            className="h-px w-24 mb-8"
            style={{ background: 'var(--color-on-surface, #1b1c1c)' }}
          />

          <p
            className="text-[15px] sm:text-[17px] leading-[1.7] max-w-md"
            style={{
              color: 'var(--color-on-surface-variant, #504441)',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              opacity: visible ? 0.95 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.9s cubic-bezier(.2,.8,.2,1) 0.12s',
            }}
          >
            We do not industrialize what was meant to be tended. The almonds
            arrive in burlap. The pistachios are still warm from the sun. We
            sort by hand, in small rooms, in afternoons that pass slowly.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-14">
          {[
            {
              num: 'i.',
              h: 'A single grove, named.',
              p: 'Each lot we offer can be traced to one farmer, one grove, one season — never blended into anonymity.',
            },
            {
              num: 'ii.',
              h: 'Slow drying, by sunlight.',
              p: 'No forced ovens. The fruit settles into itself the way it has for centuries, keeping its oils, its colour, its weight.',
            },
            {
              num: 'iii.',
              h: 'Sorted, never machined.',
              p: 'We discard up to a third of every harvest. What remains is what we are willing to put our name on.',
            },
            {
              num: 'iv.',
              h: 'Sealed within the day.',
              p: 'From the sorting room to the linen pouch, packaged the same afternoon — air-light, hand-tied, cool to the touch.',
            },
          ].map((item, i) => (
            <article
              key={item.num}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: `all 0.7s cubic-bezier(.2,.8,.2,1) ${0.18 + i * 0.08}s`,
              }}
            >
              <div
                className="text-[12px] mb-3 font-medium"
                style={{
                  fontFamily: 'Epilogue, sans-serif',
                  color: 'var(--color-secondary, #775a19)',
                  letterSpacing: '0.05em',
                }}
              >
                {item.num}
              </div>
              <h3
                className="text-[19px] sm:text-[22px] font-bold mb-3 leading-snug"
                style={{
                  fontFamily: 'Epilogue, sans-serif',
                  color: 'var(--color-on-surface, #1b1c1c)',
                }}
              >
                {item.h}
              </h3>
              <p
                className="text-[14px] sm:text-[15px] leading-[1.7]"
                style={{
                  color: 'var(--color-on-surface-variant, #504441)',
                }}
              >
                {item.p}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Soft ambient blob — drifts on scroll */}
      <div
        aria-hidden
        className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, var(--color-secondary-container, #fed488) 0%, transparent 70%)',
          opacity: 0.18,
          transform: `translate3d(${scrollY * -40}px, ${scrollY * -30}px, 0)`,
        }}
      />
    </section>
  )
}
